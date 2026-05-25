from bson import ObjectId
from fastapi import APIRouter, HTTPException
from pymongo import ReturnDocument

from ..core.database import get_citas_collection
from ..schemas.cita import CitaCreate, CitaOut, CitaUpdateEstado, EstadoCita

router = APIRouter(prefix='/api/citas', tags=['citas'])


@router.get('', response_model=list[CitaOut])
async def listar_citas() -> list[CitaOut]:
    collection = get_citas_collection()
    citas = []
    async for cita in collection.find().sort('_id', -1):
        citas.append(
            CitaOut(
                id=str(cita['_id']),
                nombre=cita['nombre'],
                apellidos=cita['apellidos'],
                hora=cita['hora'],
                estado=cita['estado'],
                barbero=cita['barbero']
            )
        )
    return citas


@router.post('', response_model=CitaOut, status_code=201)
async def crear_cita(payload: CitaCreate) -> CitaOut:
    document = payload.model_dump()
    collection = get_citas_collection()
    result = await collection.insert_one(document)
    return CitaOut(id=str(result.inserted_id), **document)


@router.patch('/{cita_id}/estado', response_model=CitaOut)
async def actualizar_estado(cita_id: str, payload: CitaUpdateEstado) -> CitaOut:
    if not ObjectId.is_valid(cita_id):
        raise HTTPException(status_code=400, detail='ID inválido')

    collection = get_citas_collection()
    result = await collection.find_one_and_update(
        {'_id': ObjectId(cita_id)},
        {'$set': {'estado': payload.estado.value}},
        return_document=ReturnDocument.AFTER
    )

    if result is None:
        raise HTTPException(status_code=404, detail='Cita no encontrada')

    return CitaOut(
        id=str(result['_id']),
        nombre=result['nombre'],
        apellidos=result['apellidos'],
        hora=result['hora'],
        estado=result['estado'],
        barbero=result['barbero']
    )
