from typing import Any

from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase, AsyncIOMotorCollection
from .config import settings

client: AsyncIOMotorClient | None = None
db: AsyncIOMotorDatabase | None = None
use_memory_storage = False


class MemoryInsertResult:
    def __init__(self, inserted_id: ObjectId):
        self.inserted_id = inserted_id


class MemoryCursor:
    def __init__(self, data: list[dict[str, Any]]):
        self._data = data

    def sort(self, *args, **kwargs):
        return self

    def __aiter__(self):
        self._iter = iter(self._data)
        return self

    async def __anext__(self):
        try:
            return next(self._iter)
        except StopIteration:
            raise StopAsyncIteration


class MemoryCitasCollection:
    def __init__(self):
        self._stored: list[dict[str, Any]] = []

    async def insert_one(self, document: dict[str, Any]):
        stored_document = {'_id': ObjectId(), **document}
        self._stored.append(stored_document)
        return MemoryInsertResult(stored_document['_id'])

    def find(self):
        return MemoryCursor(list(reversed(self._stored)))

    async def find_one_and_update(self, filter_doc, update_doc, return_document=None):
        for index, document in enumerate(self._stored):
            if str(document.get('_id')) != str(filter_doc.get('_id')):
                continue

            updated_document = {**document, **update_doc.get('$set', {})}
            self._stored[index] = updated_document
            return updated_document

        return None


memory_citas_collection = MemoryCitasCollection()


async def connect_to_mongo():
    """Conectar a MongoDB usando la URI cargada desde la configuración."""
    global client, db, use_memory_storage
    try:
        client = AsyncIOMotorClient(settings.mongodb_uri, serverSelectionTimeoutMS=1000)
        await client.admin.command('ping')
        db = client[settings.database_name]
        use_memory_storage = False
    except Exception:
        if client:
            client.close()
        client = None
        db = None
        use_memory_storage = True


async def close_mongo_connection():
    """Cerrar conexión a MongoDB."""
    global client, db
    if client:
        client.close()
    client = None
    db = None


def get_database() -> AsyncIOMotorDatabase:
    """Obtener instancia de la base de datos."""
    if db is None:
        raise RuntimeError("Base de datos no inicializada")
    return db


def get_citas_collection() -> AsyncIOMotorCollection:
    """Obtener la colección de citas."""
    if use_memory_storage or db is None:
        return memory_citas_collection

    database = get_database()
    return database[settings.collection_name]
