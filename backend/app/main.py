import os

from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field


class CitaCreate(BaseModel):
    nombre: str = Field(min_length=1)
    apellidos: str = Field(min_length=1)
    hora: str = Field(min_length=1)
    estado: str = Field(default='asignada')
    barbero: str = Field(min_length=1)


app = FastAPI(title='Citas Barbería API')

mongo_uri = os.getenv('MONGODB_URI', 'mongodb://127.0.0.1:27017/citas-barberia')
mongo_client = AsyncIOMotorClient(mongo_uri)
database = mongo_client['citas-barberia']
citas_collection = database['citas']


@app.get('/api/health')
async def health() -> dict:
    return {'ok': True}


@app.get('/api/citas')
async def listar_citas() -> list[dict]:
    citas = []
    async for cita in citas_collection.find().sort('createdAt', -1):
        citas.append({
            'id': str(cita['_id']),
            'nombre': cita['nombre'],
            'apellidos': cita['apellidos'],
            'hora': cita['hora'],
            'estado': cita['estado'],
            'barbero': cita['barbero']
        })
    return citas


@app.post('/api/citas', status_code=201)
async def crear_cita(payload: CitaCreate) -> dict:
    if payload.estado not in {'asignada', 'disponible', 'atendida'}:
        raise HTTPException(status_code=400, detail='Estado inválido')

    document = payload.model_dump()
    result = await citas_collection.insert_one(document)
    return {
        'id': str(result.inserted_id),
        **document
    }