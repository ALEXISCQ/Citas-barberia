export const styles = {
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
  sectionDescription: {
    marginTop: '-8px',
    marginBottom: '16px',
    color: '#4b5563'
  },
  list: {
    display: 'grid',
    gap: '12px'
  },
  emptyMessage: {
    margin: 0,
    padding: '16px',
    borderRadius: '12px',
    border: '1px dashed #d1d5db',
    color: '#6b7280',
    background: '#f9fafb'
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
