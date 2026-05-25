import React from 'react';
import ReactDOM from 'react-dom/client';

const apiUrl = 'http://localhost:3001/api/citas';
const estadoOptions = ['asignada', 'disponible', 'atendida'];

function App() {
  const [form, setForm] = React.useState({
    nombre: '',
    apellidos: '',
    hora: '',
    barbero: '',
    estado: 'asignada'
  });
  const [citas, setCitas] = React.useState([]);
  const [mensaje, setMensaje] = React.useState('');

  const cargarCitas = React.useCallback(async () => {
    const response = await fetch(apiUrl);
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

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      setMensaje('No se pudo crear la cita.');
      return;
    }

    setForm({ nombre: '', apellidos: '', hora: '', barbero: '' });
    await cargarCitas();
    setMensaje('Cita creada correctamente.');
  }

  return (
    <div style={styles.page}>
      <main style={styles.card}>
        <h1 style={styles.title}>Citas de Barbería</h1>
        <p style={styles.subtitle}>Asignación de citas con MongoDB y API</p>

        <form onSubmit={manejarSubmit} style={styles.form}>
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={manejarCambio} style={styles.input} />
          <input name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={manejarCambio} style={styles.input} />
          <input name="hora" placeholder="Hora de la cita" value={form.hora} onChange={manejarCambio} style={styles.input} />
          <input name="barbero" placeholder="Nombre del barbero" value={form.barbero} onChange={manejarCambio} style={styles.input} />
          <select name="estado" value={form.estado} onChange={manejarCambio} style={styles.input}>
            {estadoOptions.map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
          <button type="submit" style={styles.button}>Asignar cita</button>
        </form>

        {mensaje ? <p style={styles.message}>{mensaje}</p> : null}

        <section style={styles.listSection}>
          <h2 style={styles.sectionTitle}>Citas programadas</h2>
          <div style={styles.list}>
            {citas.map((cita) => (
              <article key={cita.id} style={styles.item}>
                <strong>{cita.nombre} {cita.apellidos}</strong>
                <span>Hora: {cita.hora}</span>
                <span style={{ ...styles.badge, ...styles["status_" + cita.estado] }}>Estado: {cita.estado}</span>
                <span>Barbero: {cita.barbero}</span>
                <select
                  value={cita.estado}
                  onChange={async (event) => {
                    const nuevoEstado = event.target.value;
                    const response = await fetch(`${apiUrl}/${cita.id}/estado`, {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ estado: nuevoEstado })
                    });

                    if (response.ok) {
                      await cargarCitas();
                    } else {
                      setMensaje('No se pudo actualizar el estado.');
                    }
                  }}
                  style={styles.input}
                >
                  {estadoOptions.map((estadoOption) => (
                    <option key={estadoOption} value={estadoOption}>{estadoOption}</option>
                  ))}
                </select>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg, #1f2937, #111827)'
  },
  card: {
    width: 'min(900px, 92vw)',
    background: '#ffffff',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25)'
  },
  title: { margin: 0, fontSize: '2rem' },
  subtitle: { marginTop: '8px', color: '#4b5563' },
  form: {
    display: 'grid',
    gap: '12px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    marginTop: '24px'
  },
  input: {
    padding: '12px 14px',
    borderRadius: '12px',
    border: '1px solid #d1d5db'
  },
  button: {
    gridColumn: '1 / -1',
    padding: '14px 18px',
    border: 'none',
    borderRadius: '12px',
    background: '#111827',
    color: '#ffffff',
    cursor: 'pointer'
  },
  message: { marginTop: '16px', color: '#065f46' },
  listSection: { marginTop: '28px' },
  sectionTitle: { marginBottom: '16px' },
  list: {
    display: 'grid',
    gap: '12px'
  },
  item: {
    display: 'grid',
    gap: '10px',
    padding: '16px',
    borderRadius: '16px',
    background: '#f9fafb',
    border: '1px solid #e5e7eb'
  },
  badge: {
    display: 'inline-flex',
    padding: '6px 10px',
    borderRadius: '999px',
    color: '#111827',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  status_asignada: {
    background: '#fde68a'
  },
  status_disponible: {
    background: '#bfdbfe'
  },
  status_atendida: {
    background: '#bbf7d0'
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);