
export const ROLES = [{ id: 1, nombre: 'Administrador' },{ id: 2, nombre: 'Empleado' },{ id: 3, nombre: 'Cliente' }]
export const ESTADOS_CITA = [
  { id: 1, nombre: 'Pendiente', color: 'bg-yellow-100 text-yellow-800 border-yellow-300', bloquea: true, permiteEditar: true, permiteCancelarCliente: true },
  { id: 2, nombre: 'Confirmada', color: 'bg-blue-100 text-blue-800 border-blue-300', bloquea: true, permiteEditar: true, permiteCancelarCliente: false },
  { id: 3, nombre: 'En proceso', color: 'bg-purple-100 text-purple-800 border-purple-300', bloquea: true, permiteEditar: false, permiteCancelarCliente: false },
  { id: 4, nombre: 'Finalizada', color: 'bg-green-100 text-green-800 border-green-300', bloquea: false, permiteEditar: false, permiteCancelarCliente: false },
  { id: 5, nombre: 'Cancelada', color: 'bg-red-100 text-red-800 border-red-300', bloquea: false, permiteEditar: false, permiteCancelarCliente: false },
]
export const DIAS_SEMANA = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']
export const TIPOS_RESTRICCION = [{ id: 1, nombre: 'General del establecimiento' },{ id: 2, nombre: 'Específica de empleado' },{ id: 3, nombre: 'Parcial por horas' },{ id: 4, nombre: 'Día completo' }]
export const ESPECIALIDADES_INICIAL = [{ id: 1, nombre: 'General' },{ id: 2, nombre: 'Barbería' },{ id: 3, nombre: 'Coloración' },{ id: 4, nombre: 'Estética' },{ id: 5, nombre: 'Masajes' }]
export const SERVICIOS_INICIAL = [
  { id: 1, nombre: 'Corte Clásico', descripcion: 'Corte tradicional con acabado profesional', precio: 15, duracion: 30, especialidadId: 2, estado: 'activo', imagen: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400' },
  { id: 2, nombre: 'Tinte Completo', descripcion: 'Coloración completa premium', precio: 40, duracion: 90, especialidadId: 3, estado: 'activo', imagen: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400' },
  { id: 3, nombre: 'Arreglo de Barba', descripcion: 'Perfilado y arreglo de barba', precio: 12, duracion: 20, especialidadId: 2, estado: 'activo', imagen: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400' },
  { id: 4, nombre: 'Masaje Relajante', descripcion: 'Masaje 60min relajación total', precio: 35, duracion: 60, especialidadId: 5, estado: 'activo', imagen: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400' },
  { id: 5, nombre: 'Limpieza Facial', descripcion: 'Limpieza profunda e hidratación', precio: 30, duracion: 45, especialidadId: 4, estado: 'activo', imagen: 'https://images.unsplash.com/photo-1570172619644-dfd03ed1350b?w=400' },
]
export const ADICIONALES_INICIAL = [
  { id: 1, nombre: 'Lavado Premium', descripcion: 'Lavado shampoo premium', precio: 5, estado: 'activo' },
  { id: 2, nombre: 'Secado y Peinado', descripcion: 'Secado profesional', precio: 8, estado: 'activo' },
  { id: 3, nombre: 'Tratamiento Keratina', descripcion: 'Keratina hidratante', precio: 20, estado: 'activo' },
  { id: 4, nombre: 'Mascarilla Capilar', descripcion: 'Mascarilla nutritiva', precio: 10, estado: 'activo' },
  { id: 5, nombre: 'Aromaterapia', descripcion: 'Aceites esenciales', precio: 7, estado: 'activo' },
  { id: 6, nombre: 'Exfoliación', descripcion: 'Exfoliación facial', precio: 12, estado: 'activo' },
  { id: 7, nombre: 'Cera Fría', descripcion: 'Depilación cera', precio: 15, estado: 'activo' },
  { id: 8, nombre: 'Manicure Express', descripcion: 'Manicure rápido', precio: 10, estado: 'activo' },
]
export const USUARIOS_INICIAL = [
  { id: 1, nombre: 'Admin Sistema', email: 'admin@citas.com', password: 'Admin12345', rol: 'Administrador', estado: 'activo' },
  { id: 2, nombre: 'Carlos Empleado', email: 'empleado1@citas.com', password: 'Emp12345', rol: 'Empleado', estado: 'activo' },
  { id: 3, nombre: 'Laura Empleado', email: 'empleado2@citas.com', password: 'Emp12345', rol: 'Empleado', estado: 'activo' },
  { id: 4, nombre: 'Miguel Empleado', email: 'empleado3@citas.com', password: 'Emp12345', rol: 'Empleado', estado: 'activo' },
  { id: 5, nombre: 'Ana Cliente', email: 'cliente1@citas.com', password: 'Cliente123', rol: 'Cliente', estado: 'activo' },
  { id: 6, nombre: 'Jorge Cliente', email: 'cliente2@citas.com', password: 'Cliente123', rol: 'Cliente', estado: 'activo' },
]
export const EMPLEADOS_INICIAL = [
  { id: 1, codigo: 'EMP-001', usuarioId: 2, nombre: 'Carlos Empleado', especialidadId: 2, servicios: [1,3,2], estado: 'activo', citasAsignadas: 0 },
  { id: 2, codigo: 'EMP-002', usuarioId: 3, nombre: 'Laura Empleado', especialidadId: 3, servicios: [2,1,5], estado: 'activo', citasAsignadas: 0 },
  { id: 3, codigo: 'EMP-003', usuarioId: 4, nombre: 'Miguel Empleado', especialidadId: 5, servicios: [4,5,3], estado: 'activo', citasAsignadas: 0 },
]
export const HORARIOS_INICIAL = [
  { id: 1, dia: 'Lunes', inicio: '08:00', fin: '17:00', activo: true },
  { id: 2, dia: 'Martes', inicio: '08:00', fin: '17:00', activo: true },
  { id: 3, dia: 'Miércoles', inicio: '08:00', fin: '17:00', activo: true },
  { id: 4, dia: 'Jueves', inicio: '08:00', fin: '17:00', activo: true },
  { id: 5, dia: 'Viernes', inicio: '08:00', fin: '17:00', activo: true },
  { id: 6, dia: 'Sábado', inicio: '08:00', fin: '13:00', activo: true },
  { id: 7, dia: 'Domingo', inicio: '00:00', fin: '00:00', activo: false },
]
export const RESTRICCIONES_INICIAL = [
  { id: 1, tipo: 'General del establecimiento', fecha: '2026-09-15', inicio: '00:00', fin: '23:59', aplicaA: 'Establecimiento', motivo: 'Feriado nacional', estado: 'activo' },
  { id: 2, tipo: 'General del establecimiento', fecha: '2026-12-24', inicio: '12:00', fin: '17:00', aplicaA: 'Establecimiento', motivo: 'Cierre especial navidad', estado: 'activo' },
  { id: 3, tipo: 'Específica de empleado', fecha: '2026-09-18', inicio: '09:00', fin: '11:00', aplicaA: 'Empleado 1 - Carlos', empleadoId: 1, motivo: 'Capacitación', estado: 'activo' },
  { id: 4, tipo: 'Específica de empleado', fecha: '2026-09-19', inicio: '13:00', fin: '15:00', aplicaA: 'Empleado 2 - Laura', empleadoId: 2, motivo: 'Cita médica', estado: 'activo' },
  { id: 5, tipo: 'Específica de empleado', fecha: '2026-09-20', inicio: '08:00', fin: '10:00', aplicaA: 'Empleado 3 - Miguel', empleadoId: 3, motivo: 'Reunión interna', estado: 'activo' },
  { id: 6, tipo: 'Parcial por horas', fecha: '2026-09-21', inicio: '12:00', fin: '13:00', aplicaA: 'Establecimiento', motivo: 'Almuerzo del personal', estado: 'activo' },
  { id: 7, tipo: 'Parcial por horas', fecha: '2026-09-22', inicio: '15:00', fin: '16:00', aplicaA: 'Empleado 1 - Carlos', empleadoId: 1, motivo: 'Inventario', estado: 'activo' },
  { id: 8, tipo: 'Día completo', fecha: '2026-10-01', inicio: '00:00', fin: '23:59', aplicaA: 'Establecimiento', motivo: 'Mantenimiento instalaciones', estado: 'activo' },
]
export const CITAS_INICIAL = [
  { id: 1, clienteId: 5, clienteNombre: 'Ana Cliente', servicioId: 1, servicioNombre: 'Corte Clásico', adicionales: [1], costo: 20, duracion: 30, empleadoId: 1, empleadoNombre: 'Carlos Empleado', fecha: '2026-08-15', inicio: '09:00', fin: '09:30', estado: 'Pendiente' },
  { id: 2, clienteId: 6, clienteNombre: 'Jorge Cliente', servicioId: 2, servicioNombre: 'Tinte Completo', adicionales: [3], costo: 60, duracion: 90, empleadoId: 2, empleadoNombre: 'Laura Empleado', fecha: '2026-08-15', inicio: '10:00', fin: '11:30', estado: 'Pendiente' },
  { id: 3, clienteId: 5, clienteNombre: 'Ana Cliente', servicioId: 3, servicioNombre: 'Arreglo de Barba', adicionales: [], costo: 12, duracion: 20, empleadoId: 1, empleadoNombre: 'Carlos Empleado', fecha: '2026-08-16', inicio: '08:00', fin: '08:20', estado: 'Pendiente' },
  { id: 4, clienteId: 6, clienteNombre: 'Jorge Cliente', servicioId: 4, servicioNombre: 'Masaje Relajante', adicionales: [5], costo: 42, duracion: 60, empleadoId: 3, empleadoNombre: 'Miguel Empleado', fecha: '2026-08-16', inicio: '14:00', fin: '15:00', estado: 'Pendiente' },
  { id: 5, clienteId: 5, clienteNombre: 'Ana Cliente', servicioId: 5, servicioNombre: 'Limpieza Facial', adicionales: [6], costo: 42, duracion: 45, empleadoId: 3, empleadoNombre: 'Miguel Empleado', fecha: '2026-08-14', inicio: '09:00', fin: '09:45', estado: 'Confirmada' },
  { id: 6, clienteId: 6, clienteNombre: 'Jorge Cliente', servicioId: 1, servicioNombre: 'Corte Clásico', adicionales: [1,2], costo: 28, duracion: 30, empleadoId: 1, empleadoNombre: 'Carlos Empleado', fecha: '2026-08-14', inicio: '10:00', fin: '10:30', estado: 'Confirmada' },
  { id: 7, clienteId: 5, clienteNombre: 'Ana Cliente', servicioId: 2, servicioNombre: 'Tinte Completo', adicionales: [], costo: 40, duracion: 90, empleadoId: 2, empleadoNombre: 'Laura Empleado', fecha: '2026-08-14', inicio: '11:00', fin: '12:30', estado: 'Confirmada' },
  { id: 8, clienteId: 6, clienteNombre: 'Jorge Cliente', servicioId: 3, servicioNombre: 'Arreglo de Barba', adicionales: [], costo: 12, duracion: 20, empleadoId: 1, empleadoNombre: 'Carlos Empleado', fecha: '2026-08-14', inicio: '13:00', fin: '13:20', estado: 'Confirmada' },
  { id: 9, clienteId: 5, clienteNombre: 'Ana Cliente', servicioId: 4, servicioNombre: 'Masaje Relajante', adicionales: [], costo: 35, duracion: 60, empleadoId: 3, empleadoNombre: 'Miguel Empleado', fecha: '2026-08-13', inicio: '08:00', fin: '09:00', estado: 'Finalizada' },
  { id: 10, clienteId: 6, clienteNombre: 'Jorge Cliente', servicioId: 5, servicioNombre: 'Limpieza Facial', adicionales: [], costo: 30, duracion: 45, empleadoId: 2, empleadoNombre: 'Laura Empleado', fecha: '2026-08-13', inicio: '09:30', fin: '10:15', estado: 'Finalizada' },
  { id: 11, clienteId: 5, clienteNombre: 'Ana Cliente', servicioId: 1, servicioNombre: 'Corte Clásico', adicionales: [], costo: 15, duracion: 30, empleadoId: 1, empleadoNombre: 'Carlos Empleado', fecha: '2026-08-12', inicio: '08:00', fin: '08:30', estado: 'Finalizada' },
  { id: 12, clienteId: 6, clienteNombre: 'Jorge Cliente', servicioId: 2, servicioNombre: 'Tinte Completo', adicionales: [1], costo: 45, duracion: 90, empleadoId: 2, empleadoNombre: 'Laura Empleado', fecha: '2026-08-12', inicio: '14:00', fin: '15:30', estado: 'Cancelada' },
  { id: 13, clienteId: 5, clienteNombre: 'Ana Cliente', servicioId: 3, servicioNombre: 'Arreglo de Barba', adicionales: [], costo: 12, duracion: 20, empleadoId: 3, empleadoNombre: 'Miguel Empleado', fecha: '2026-08-12', inicio: '16:00', fin: '16:20', estado: 'Cancelada' },
]
