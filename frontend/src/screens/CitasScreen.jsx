import React from 'react';
import CitaForm from '../components/CitaForm';
import CitasList from '../components/CitasList';
import { API_URL_CITAS, ESTADO_OPTIONS, INITIAL_FORM } from '../constants/citas';
import { styles } from '../styles';

function CitasScreen() {
  const [form, setForm] = React.useState(INITIAL_FORM);
  const [citas, setCitas] = React.useState([]);
  const [mensaje, setMensaje] = React.useState('');

  const cargarCitas = React.useCallback(async () => {
    const response = await fetch(API_URL_CITAS);
    const data = await response.json();
    setCitas(data);
  }, []);

  React.useEffect(() => {
    cargarCitas().catch(() => setMensaje('No se pudieron cargar las citas.'));
  }, [cargarCitas]);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setForm((actual) => ({ ...actual, [name]: value }));
  }

  async function manejarSubmit(evento) {
    evento.preventDefault();
    setMensaje('');

    const response = await fetch(API_URL_CITAS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      setMensaje('No se pudo crear la cita.');
      return;
    }

    setForm(INITIAL_FORM);
    await cargarCitas();
    setMensaje('Cita creada correctamente.');
  }

  async function manejarCambioEstado(citaId, nuevoEstado) {
    const response = await fetch(`${API_URL_CITAS}/${citaId}/estado`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado })
    });

    if (response.ok) {
      await cargarCitas();
    } else {
      setMensaje('No se pudo actualizar el estado.');
    }
  }

  return (
    <div style={styles.page}>
      <main style={styles.card}>
        <h1 style={styles.title}>Citas de Barberia</h1>
        <p style={styles.subtitle}>Asignacion de citas con MongoDB y API</p>

        <CitaForm
          form={form}
          onChange={manejarCambio}
          onSubmit={manejarSubmit}
          estadoOptions={ESTADO_OPTIONS}
          styles={styles}
        />

        {mensaje ? <p style={styles.message}>{mensaje}</p> : null}

        <CitasList
          citas={citas}
          onCambiarEstado={manejarCambioEstado}
          estadoOptions={ESTADO_OPTIONS}
          styles={styles}
        />
      </main>
    </div>
  );
}

export default CitasScreen;
