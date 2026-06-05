export const API_URL_CITAS = 'http://localhost:3001/api/citas';

export const ESTADO_OPTIONS = ['asignada', 'disponible', 'atendida'];

export const ESTADO_META = {
  disponible: {
    titulo: 'Horarios disponibles',
    descripcion: 'Estos horarios estan libres y se pueden asignar.'
  },
  asignada: {
    titulo: 'Citas asignadas',
    descripcion: 'Horarios reservados para clientes.'
  },
  atendida: {
    titulo: 'Citas atendidas',
    descripcion: 'Servicios finalizados.'
  }
};

export const INITIAL_FORM = {
  nombre: '',
  apellidos: '',
  hora: '',
  barbero: '',
  estado: 'asignada'
};
