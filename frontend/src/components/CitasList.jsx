import CitaItem from './CitaItem';

function CitasList({ citas, onCambiarEstado, estadoOptions, styles }) {
  return (
    <section style={styles.listSection}>
      <h2 style={styles.sectionTitle}>Citas programadas</h2>
      <p style={styles.sectionDescription}>
        Listado visible de las citas registradas con nombre completo, hora, estado y barbero.
      </p>
      <div style={styles.list}>
        {citas.length === 0 ? (
          <p style={styles.emptyMessage}>No hay citas registradas aun.</p>
        ) : (
          citas.map((cita) => (
            <CitaItem
              key={cita.id}
              cita={cita}
              onCambiarEstado={onCambiarEstado}
              estadoOptions={estadoOptions}
              styles={styles}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default CitasList;
