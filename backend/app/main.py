from fastapi import FastAPI
from contextlib import asynccontextmanager
from .core.database import connect_to_mongo, close_mongo_connection
from .api.citas import router as citas_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()


app = FastAPI(title='Citas Barbería API', lifespan=lifespan)
app.include_router(citas_router)


@app.get('/api/health')
async def health() -> dict:
    return {'ok': True}
