import CitaItem from './CitaItem';
import { ESTADO_META } from '../constants/citas';

function CitasList({ citas, onCambiarEstado, estadoOptions, styles }) {
  const citasPorEstado = estadoOptions.map((estado) => ({
    estado,
    citas: citas.filter((cita) => cita.estado === estado)
  }));

  return (
    <section style={styles.listSection}>
      <h2 style={styles.sectionTitle}>Citas programadas</h2>
      <p style={styles.sectionDescription}>
        Listado agrupado por estado para distinguir horarios disponibles, asignados y atendidos.
      </p>
      {citas.length === 0 ? (
        <p style={styles.emptyMessage}>No hay citas registradas aun.</p>
      ) : (
        <div style={styles.statusGroups}>
          {citasPorEstado.map((grupo) => (
            <section key={grupo.estado} style={styles.statusGroup}>
              <div style={styles.statusHeader}>
                <h3 style={styles.statusTitle}>{ESTADO_META[grupo.estado].titulo}</h3>
                <span style={{ ...styles.countBadge, ...styles['status_' + grupo.estado] }}>
                  {grupo.citas.length}
                </span>
              </div>
              <p style={styles.statusDescription}>{ESTADO_META[grupo.estado].descripcion}</p>

              {grupo.citas.length === 0 ? (
                <p style={styles.emptyByStatus}>Sin citas en este estado.</p>
              ) : (
                <div style={styles.list}>
                  {grupo.citas.map((cita) => (
                    <CitaItem
                      key={cita.id}
                      cita={cita}
                      onCambiarEstado={onCambiarEstado}
                      estadoOptions={estadoOptions}
                      styles={styles}
                    />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </section>
  );
}

export default CitasList;
