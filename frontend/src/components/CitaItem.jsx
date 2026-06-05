function CitaItem({ cita, onCambiarEstado, estadoOptions, styles }) {
  return (
    <article style={styles.item}>
      <strong>{cita.nombre} {cita.apellidos}</strong>
      <span>Hora: {cita.hora}</span>
      <span style={{ ...styles.badge, ...styles['status_' + cita.estado] }}>Estado: {cita.estado}</span>
      <span>Barbero: {cita.barbero}</span>
      <select
        value={cita.estado}
        onChange={(event) => onCambiarEstado(cita.id, event.target.value)}
        style={styles.input}
      >
        {estadoOptions.map((estadoOption) => (
          <option key={estadoOption} value={estadoOption}>{estadoOption}</option>
        ))}
      </select>
    </article>
  );
}

export default CitaItem;
