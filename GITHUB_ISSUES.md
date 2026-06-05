# Backlog de Issues - Citas Barbería

Este documento agrupa los issues necesarios para llevar el proyecto a una primera versión funcional y publicable en GitHub.

## 1. Configurar backend FastAPI con MongoDB
**Prioridad:** Alta  
**Tipo:** Backend / Infraestructura

**Descripción:**
Preparar la base del backend en Python con FastAPI, conexión a MongoDB y carga de variables de entorno desde `.env`.

**Criterios de aceptación:**
- El backend arranca sin errores.
- Existe conexión a MongoDB usando `MONGODB_URI`.
- El endpoint de salud responde correctamente.
- La configuración queda documentada.

## 2. Crear modelo de cita en MongoDB
**Prioridad:** Alta  
**Tipo:** Backend / Datos

**Descripción:**
Definir la estructura de una cita con campos para nombre, apellidos, hora, estado y barbero.

**Criterios de aceptación:**
- La cita guarda `nombre`.
- La cita guarda `apellidos`.
- La cita guarda `hora`.
- La cita guarda `estado` con valores permitidos.
- La cita guarda `barbero`.

## 3. Crear API para citas
**Prioridad:** Alta  
**Tipo:** Backend / API

**Descripción:**
Implementar endpoints para crear y listar citas desde el frontend.

**Criterios de aceptación:**
- Existe `GET /api/citas`.
- Existe `POST /api/citas`.
- La API devuelve datos en JSON.
- La API valida entradas básicas.

## 4. Permitir asignar citas desde el frontend
**Prioridad:** Alta  
**Tipo:** Frontend / Funcionalidad

**Descripción:**
Crear un formulario en el frontend para registrar una cita con nombre, apellidos, hora y barbero.

**Criterios de aceptación:**
- El formulario solicita nombre.
- El formulario solicita apellidos.
- El formulario solicita hora de la cita.
- El formulario solicita nombre del barbero.
- Al enviar, la cita se guarda en la API.

## 5. Mostrar citas programadas en el frontend
**Prioridad:** Alta  
**Tipo:** Frontend / Visualización

**Descripción:**
Agregar un listado visible de las citas registradas.

**Criterios de aceptación:**
- Se muestran las citas creadas.
- Cada cita muestra el nombre completo.
- Cada cita muestra la hora.
- Cada cita muestra el estado.
- Cada cita muestra el barbero.

## 6. Gestionar estados de cita
**Prioridad:** Media  
**Tipo:** Backend / Negocio

**Descripción:**
Permitir que una cita tenga estado asignada, disponible o atendida.

**Criterios de aceptación:**
- Los estados permitidos están definidos.
- No se aceptan estados inválidos.
- El frontend puede ver el estado actual.

## 7. Mostrar disponibilidad de citas
**Prioridad:** Media  
**Tipo:** Frontend / Experiencia de usuario

**Descripción:**
Visualizar si una cita está disponible, asignada o atendida con una presentación clara.

**Criterios de aceptación:**
- Las citas se distinguen visualmente por estado.
- El usuario entiende cuáles horarios están libres.
- El listado no mezcla estados sin indicación visual.

## 8. Configurar variables de entorno y documentación
**Prioridad:** Alta  
**Tipo:** Documentación / DevOps

**Descripción:**
Dejar documentada la instalación, variables de entorno y comandos de ejecución del proyecto.

**Criterios de aceptación:**
- Existe documentación de instalación.
- Se documenta `MONGODB_URI`.
- Se documentan comandos del frontend y backend.
- El repositorio indica la estructura del proyecto.

## 9. Agregar validación y manejo de errores
**Prioridad:** Media  
**Tipo:** Calidad / Robustez

**Descripción:**
Mejorar el manejo de errores en frontend y backend para evitar fallos silenciosos.

**Criterios de aceptación:**
- El backend responde con errores claros.
- El frontend muestra mensajes si falla la API.
- Los campos vacíos no se aceptan.

## 10. Preparar pruebas básicas
**Prioridad:** Media  
**Tipo:** Testing

**Descripción:**
Agregar pruebas mínimas para validar la API o al menos la lógica principal del proyecto.

**Criterios de aceptación:**
- Existe una estrategia de pruebas.
- Se pueden validar endpoints principales.
- Se documenta cómo ejecutar las pruebas.

## 11. Revisar estructura final para publicación en GitHub
**Prioridad:** Baja  
**Tipo:** Limpieza / Entrega

**Descripción:**
Hacer una revisión final del repositorio antes de subirlo a GitHub.

**Criterios de aceptación:**
- No hay archivos temporales innecesarios.
- La estructura está ordenada.
- El README y CLAUDE.md están actualizados.
- El proyecto se entiende al abrir el repositorio.

## 12 Crear componente `BarberosTable`
**Prioridad:** Alta  
**Tipo:** Frontend / UI

**Descripción:**
Crear un componente React separado `BarberosTable` que muestre la lista de barberos desde la API. Permitir acciones básicas: crear, editar y eliminar barberos.

**Criterios de aceptación:**
- El componente está en `frontend/src/components/BarberosTable.jsx`.
- Consume `GET /api/barberos` y renderiza una tabla.
- Tiene botones para agregar/editar/eliminar (las acciones pueden abrir formularios modal).

## 13 Crear componente `AgendaBarbero`
**Prioridad:** Alta  
**Tipo:** Frontend / UI

**Descripción:**
Crear un componente `AgendaBarbero` donde cada barbero pueda programar su agenda (fechas/horarios disponibles). Debe integrarse con la tabla de barberos y permitir gestionar franjas horarias.

**Criterios de aceptación:**
- El componente está en `frontend/src/components/AgendaBarbero.jsx`.
- Permite seleccionar un barbero y añadir/quitar franjas horarias.
- Guarda los cambios mediante `POST/PUT /api/agendas`.

## 14 Backend: añadir colección `barberos` y `agendas`
**Prioridad:** Alta  
**Tipo:** Backend / Datos

**Descripción:**
Añadir dos colecciones en MongoDB: `barberos` (datos del barbero) y `agendas` (franjas disponibles por barbero). Crear modelos/esquemas y migraciones si aplica.

**Criterios de aceptación:**
- Existe ruta para CRUD de `barberos` y `agendas` en `backend/app/api/`.
- Los esquemas pydantic para `Barbero` y `Agenda` están definidos en `backend/app/schemas/`.

### 15 Endpoint: obtener agendas disponibles para asignación
**Prioridad:** Alta  
**Tipo:** Backend / API

**Descripción:**
Implementar un endpoint `GET /api/agendas/disponibles?barbero_id=&fecha=` que devuelva sólo las franjas horarias libres (no asignadas) para la pantalla de asignación de citas.

**Criterios de aceptación:**
- El endpoint filtra correctamente por `barbero_id` y `fecha`.
- Devuelve únicamente franjas no reservadas.

### 16 Integrar frontend: cargar solo agendas disponibles en pantalla `Asignar`
**Prioridad:** Alta  
**Tipo:** Frontend / Integración

**Descripción:**
Modificar la pantalla de asignación de citas para que consulte el nuevo endpoint y muestre únicamente las franjas disponibles al momento de crear una cita.

**Criterios de aceptación:**
- La pantalla `Asignar` usa `GET /api/agendas/disponibles` antes de mostrar horas.
- No aparecen franjas ya reservadas.

