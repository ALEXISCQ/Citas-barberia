from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase, AsyncIOMotorCollection
from .config import settings

client: AsyncIOMotorClient | None = None
db: AsyncIOMotorDatabase | None = None


async def connect_to_mongo():
    """Conectar a MongoDB."""
    global client, db
    client = AsyncIOMotorClient(settings.mongodb_uri)
    db = client[settings.database_name]
    print(f"Conectado a MongoDB: {settings.mongodb_uri}")


async def close_mongo_connection():
    """Cerrar conexión a MongoDB."""
    global client
    if client:
        client.close()
        print("Desconectado de MongoDB")


def get_database() -> AsyncIOMotorDatabase:
    """Obtener instancia de la base de datos."""
    if db is None:
        raise RuntimeError("Base de datos no inicializada")
    return db


def get_citas_collection() -> AsyncIOMotorCollection:
    """Obtener la colección de citas."""
    database = get_database()
    return database[settings.collection_name]
