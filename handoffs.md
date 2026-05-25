# Bitácora de Transferencia

## Resumen de Contexto Limpio
- Frontend: React/Vite con formulario y listado de citas.
- Backend: FastAPI con `GET /api/health`, `GET /api/citas`, `POST /api/citas` y conexión a MongoDB.
- Arquitectura: separación clara de UI, API y DB; `backend/app/core` maneja configuración y conexión.
- Entregables en el repo: `CLAUDE.md`, `AGENTS.md`, `GITHUB_ISSUES.md`, `HANDOFF.md`, `MONGODB_SETUP.md`.

## Decisiones Consolidadas
- Usar variables de entorno para `MONGODB_URI` y `PORT`.
- Mantener el seam como UI React → API FastAPI → MongoDB.
- Modularizar el backend en `app/main.py`, `app/api/citas.py` y `app/schemas/cita.py`.
- Añadir pruebas básicas para el API en `backend/tests/test_api.py`.

## Pendientes Exactos
- Implementar el cambio de estado de citas (`asignada`, `disponible`, `atendida`).
- Añadir pruebas de integración del seam completo.
- Mejorar errores y validación en frontend y backend.
- Crear scripts de arranque conjunto y CI/QA si procede.
- Formalizar los bloqueos y dependencias en los issues.

## Notas de Handoff
- Este archivo debe usarse como contexto limpio para la próxima sesión.
- No considerar el historial de chat antiguo; empezar desde aquí y desde `HANDOFF.md`.
- La siguiente prioridad lógica es el issue #6: `Gestionar estados de cita`.
