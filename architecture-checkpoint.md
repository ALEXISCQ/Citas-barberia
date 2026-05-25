# Revisión de Control Arquitectónico

## Diagnóstico inicial de /improve-codebase-architecture
- El backend y el frontend estaban separados, pero la lógica del API estaba parcialmente acoplada en `backend/app/main.py`.
- El manejo de la conexión a MongoDB estaba presente, pero no estaba aislado del resto del enrutamiento.
- No existía una estructura clara de esquemas de datos ni una separación de las rutas de la API.
- No había pruebas de integración o contrato API en el repositorio.

## Candidatos de profundización identificados
1. `backend/app/main.py`: mezcla de lifecycle, lógica de endpoint y configuración.
2. Ausencia de un módulo de schemas (Pydantic) independiente para el modelo de cita.
3. Backlog de pruebas inexistente para el seam frontend/API.

## Propuestas de interfaz de los sub-agentes

### Propuesta A: Router + servicios
- `main.py` solo define la app y el lifecycle.
- `api/citas.py` gestiona rutas con `APIRouter`.
- `services/citas.py` encapsula operaciones sobre MongoDB.
- Ventaja: muy baja dependencia entre enrutamiento y datos.

### Propuesta B: Esquemas y repositorio
- `schemas/cita.py` define DTOs y validaciones.
- `repository/citas.py` define acceso a la colección Mongo.
- `api/citas.py` transforma entre DTOs y repositorio.
- Ventaja: buena claridad de responsabilidad y testabilidad.

### Propuesta C: Dominio minimalista + API
- `domain/cita.py` define reglas de negocio para estados.
- `api/citas.py` consume el dominio y valida transiciones.
- `main.py` solo inyecta dependencia de repositorio.
- Ventaja: prepara el código para crecimiento sin repetir lógica.

## Solución híbrida implementada
- Se tomó lo mejor de Propuesta B y C:
  - `main.py` quedó reducido al app y lifecycle.
  - `api/citas.py` maneja rutas y traduce datos.
  - `schemas/cita.py` encapsula los modelos Pydantic.
  - `core/database.py` maneja la conexión MongoDB.
- Esto evita acoplamientos innecesarios y mantiene la puerta abierta para un `repository/citas.py` o `domain/cita.py` en el siguiente paso.

## Justificación técnica
- Separar rutas de esquemas reduce la dificultad de pruebas unitarias y revisión del código.
- Mantener la conexión MongoDB en `core/database.py` evita que la lógica de negocio dependa de la infraestructura.
- La arquitectura es suficientemente profunda para soportar nuevos estados y transiciones sin reescribir el enrutamiento.
- Esta solución permite introducir pruebas de contrato y de seam sin reestructurar nuevamente el backend.

## Recomendaciones siguientes
- Convertir `api/citas.py` en cliente de un repo `repository/citas.py` en el próximo ciclo.
- Agregar tests de contrato adicionales para `GET /api/citas` y `POST /api/citas`.
- Formalizar las dependencias de issue block en `GITHUB_ISSUES.md`.
