# Agents

## Claude Code Agent

- **Name:** Claude Code Agent
- **Purpose:** Proveer instrucciones y prompts reutilizables para que Claude Code (o herramientas compatibles) actúe como agente asistente en este repositorio. Facilita tareas como scaffolding, generación de endpoints, y creación de issues.
- **Location:** `AGENTS.md` (este archivo) y `CLAUDE.md` (contexto del proyecto).

### Capabilities
- Proponer cambios de código y parches.
- Generar issues y tareas priorizadas.
- Sugerir estructuras de ficheros y plantillas (frontend/backend).

### How to use
1. Copia el contenido relevante de `CLAUDE.md` y `AGENTS.md` a la interfaz de Claude Code o a la herramienta compatible que uses.
2. Pide a Claude Code que actúe siguiendo las reglas de trabajo indicadas en `CLAUDE.md`.
3. Para ejecutar modificaciones automáticas, usa el entorno local (VS Code) y aplica los parches que el agente proponga.

### Example prompt
"Actúa como un agente para el repositorio 'Citas-barberia'. Lee `CLAUDE.md` y `AGENTS.md`. Crea un endpoint adicional `PATCH /api/citas/{id}/estado` para actualizar el estado de una cita. Explica los cambios y genera un patch aplicable." 

### Notes
- Este agente es documental: no incluye credenciales ni automatismos que conecten a servicios externos. Para integraciones automáticas (CI/CD), habilitar las acciones GitHub con tokens seguros y revisar permisos.