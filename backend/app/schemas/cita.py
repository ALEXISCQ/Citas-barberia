from enum import Enum

from pydantic import BaseModel, Field


class EstadoCita(str, Enum):
    asignada = 'asignada'
    disponible = 'disponible'
    atendida = 'atendida'


class CitaBase(BaseModel):
    nombre: str = Field(min_length=1)
    apellidos: str = Field(min_length=1)
    hora: str = Field(min_length=1)
    barbero: str = Field(min_length=1)


class CitaCreate(CitaBase):
    estado: EstadoCita = EstadoCita.asignada


class CitaUpdateEstado(BaseModel):
    estado: EstadoCita


class CitaOut(CitaCreate):
    id: str
