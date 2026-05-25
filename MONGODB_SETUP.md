# MongoDB Setup - Citas Barbería

## Instalación de MongoDB

### Opción 1: MongoDB local (Windows)
1. Descarga MongoDB Community desde: https://www.mongodb.com/try/download/community
2. Instala con las opciones por defecto.
3. MongoDB correrá como servicio en `localhost:27017`.

### Opción 2: MongoDB en Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Opción 3: MongoDB Atlas (Cloud)
1. Crea una cuenta en https://www.mongodb.com/cloud/atlas
2. Crea un cluster gratuito.
3. Obtén tu `MONGODB_URI` desde el panel de conexión.

## Configuración

1. Copia `backend/.env.example` a `backend/.env`:
```bash
cp backend/.env.example backend/.env
```

2. Edita `backend/.env` y asegúrate de que `MONGODB_URI` apunte a tu MongoDB:
```
MONGODB_URI=mongodb://127.0.0.1:27017/citas-barberia
PORT=3001
```

## Ejecución del Backend

### Instalación de dependencias
```bash
pip install -r backend/requirements.txt
```

### Desarrollo (con recarga automática)
```bash
python -m uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 3001
```

### Producción
```bash
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 3001
```

La API estará disponible en `http://localhost:3001`.

## Estructura de Conexión

- **`backend/app/core/config.py`**: Gestión de variables de entorno.
- **`backend/app/core/database.py`**: Conexión async a MongoDB.
- **`backend/app/main.py`**: Endpoints de la API.

## Endpoints

- `GET /api/health` - Verificar que la API está activa.
- `GET /api/citas` - Listar todas las citas.
- `POST /api/citas` - Crear una nueva cita.
