import pytest
from httpx import AsyncClient
from backend.app.main import app


class DummyCollection:
    def __init__(self):
        self.stored = []

    class InsertResult:
        def __init__(self, inserted_id):
            self.inserted_id = inserted_id

    async def insert_one(self, document):
        self.stored.append(document)
        return DummyCollection.InsertResult('dummy_id')

    def find(self):
        class Cursor:
            def __init__(self, data):
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

        return Cursor(self.stored)

    async def find_one_and_update(self, filter_doc, update_doc, return_document=None):
        for index, doc in enumerate(self.stored):
            if str(doc.get('_id', 'dummy_id')) == str(filter_doc.get('_id')):
                doc['estado'] = update_doc['$set']['estado']
                self.stored[index] = doc
                return doc
        return None


@pytest.mark.asyncio
async def test_health_endpoint():
    async with AsyncClient(app=app, base_url='http://testserver') as client:
        response = await client.get('/api/health')
        assert response.status_code == 200
        assert response.json() == {'ok': True}


@pytest.mark.asyncio
async def test_create_and_list_cita(monkeypatch):
    dummy = DummyCollection()
    monkeypatch.setattr('backend.app.api.citas', 'get_citas_collection', lambda: dummy)

    async with AsyncClient(app=app, base_url='http://testserver') as client:
        response = await client.post(
            '/api/citas',
            json={
                'nombre': 'Ana',
                'apellidos': 'Pérez',
                'hora': '15:00',
                'barbero': 'Juan',
                'estado': 'asignada'
            }
        )
        assert response.status_code == 201
        data = response.json()
        assert data['nombre'] == 'Ana'
        assert data['estado'] == 'asignada'

        response = await client.get('/api/citas')
        assert response.status_code == 200
        assert any(cita['nombre'] == 'Ana' for cita in response.json())


@pytest.mark.asyncio
async def test_update_cita_estado(monkeypatch):
    dummy = DummyCollection()
    dummy.stored.append({'_id': 'dummy_id', 'nombre': 'Ana', 'apellidos': 'Pérez', 'hora': '15:00', 'barbero': 'Juan', 'estado': 'asignada'})
    monkeypatch.setattr('backend.app.api.citas', 'get_citas_collection', lambda: dummy)

    async with AsyncClient(app=app, base_url='http://testserver') as client:
        response = await client.patch(
            '/api/citas/dummy_id/estado',
            json={'estado': 'atendida'}
        )
        assert response.status_code == 200
        data = response.json()
        assert data['estado'] == 'atendida'
