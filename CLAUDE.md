# Citas-barberia

## Proyecto
Repositorio base para una aplicación de citas para barbería.

## Estructura
- `frontend/`: interfaz de usuario.
- `backend/`: API y lógica del servidor.

## Reglas de trabajo
- Mantener frontend y backend separados.
- Antes de asumir un stack, revisar lo que exista en cada carpeta.
- Si se agregan comandos de ejecución, documentarlos en este archivo y en `README.md`.
- Preferir cambios pequeños y consistentes con la estructura del proyecto.

## Estado actual
El proyecto aún no tiene código fuente ni configuración de build. Cuando se agreguen dependencias o frameworks, aquí se deben registrar:
- Comando para instalar dependencias.
- Comando para ejecutar frontend.
- Comando para ejecutar backend.
- Comando para pruebas.

## Nota para Claude Code
Usar este archivo como referencia principal del contexto del proyecto antes de proponer o aplicar cambios.

### Claude Code Agent
Se añadió un agente de referencia en `AGENTS.md` que contiene prompts, capacidades y ejemplos de uso para Claude Code. Consulta `AGENTS.md` para instrucciones sobre cómo invocar el agente y ejemplos de prompts.

## Client Brief
Quiero que la aplicación se conecte con MongoDB y que tenga una API para gestionar citas de barbería.

La parte frontend debe permitir asignar citas solicitando estos datos:
- Nombre
- Apellidos
- Hora de la cita

La aplicación también debe mostrar la disponibilidad de las citas programadas con estos estados:
- Asignada
- Disponible
- Atendida

Además, cada cita debe mostrar el nombre del barbero asociado.

## Alcance funcional esperado
- Crear citas desde el frontend.
- Consultar citas programadas.
- Visualizar el estado de cada cita.
- Ver la disponibilidad de horarios.
- Guardar y leer la información desde MongoDB mediante una API.

## Estructura técnica actual
- Frontend en React/Vite.
- Backend en Python/FastAPI.
- Persistencia en MongoDB.
- El backend debe leer su configuración desde `backend/.env`.