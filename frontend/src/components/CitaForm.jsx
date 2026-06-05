function CitaForm({ form, onChange, onSubmit, estadoOptions, styles }) {
  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={onChange} style={styles.input} />
      <input name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={onChange} style={styles.input} />
      <input name="hora" placeholder="Hora de la cita" value={form.hora} onChange={onChange} style={styles.input} />
      <input name="barbero" placeholder="Nombre del barbero" value={form.barbero} onChange={onChange} style={styles.input} />
      <select name="estado" value={form.estado} onChange={onChange} style={styles.input}>
        {estadoOptions.map((estado) => (
          <option key={estado} value={estado}>{estado}</option>
        ))}
      </select>
      <button type="submit" style={styles.button}>Asignar cita</button>
    </form>
  );
}

export default CitaForm;
