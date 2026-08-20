// Script datos iniciales requeridos - coherentes con dominio barbería/salón
export const datosInicialesSQL = `
-- Roles (3)
INSERT INTO roles (nombre) VALUES ('Administrador'), ('Empleado'), ('Cliente');
-- Estados (5)
INSERT INTO estados_cita (nombre, bloquea_disponibilidad, permite_edicion, permite_cancelacion_cliente) VALUES
('Pendiente', 1, 1, 1),('Confirmada', 1, 1, 0),('En proceso', 1, 0, 0),('Finalizada', 0, 0, 0),('Cancelada', 0, 0, 0);
-- Días semana (7)
INSERT INTO dias_semana (nombre) VALUES ('Lunes'),('Martes'),('Miércoles'),('Jueves'),('Viernes'),('Sábado'),('Domingo');
-- Tipos restricción (4)
INSERT INTO tipos_restriccion (nombre) VALUES ('General del establecimiento'),('Específica de empleado'),('Parcial por horas'),('Día completo');
-- Especialidades (5 - mínimo 3 + General)
INSERT INTO especialidades (nombre) VALUES ('General'),('Barbería'),('Coloración'),('Estética'),('Masajes');
-- Usuarios (1 admin + 3 empleados + 2 clientes = 6)
INSERT INTO usuarios (nombre, email, password, rol_id) VALUES
('Admin Sistema', 'admin@citas.com', 'Admin12345', 1),
('Carlos Empleado', 'empleado1@citas.com', 'Emp12345', 2),
('Laura Empleado', 'empleado2@citas.com', 'Emp12345', 2),
('Miguel Empleado', 'empleado3@citas.com', 'Emp12345', 2),
('Ana Cliente', 'cliente1@citas.com', 'Cliente123', 3),
('Jorge Cliente', 'cliente2@citas.com', 'Cliente123', 3);
-- Servicios (5 - cumple mínimo 3 y máximo 5 por empleado)
INSERT INTO servicios (nombre, descripcion, precio, duracion, especialidad_id, imagen, estado) VALUES
('Corte Clásico','Corte tradicional',15,30,2,'corte.jpg','activo'),
('Tinte Completo','Coloración',40,90,3,'tinte.jpg','activo'),
('Arreglo Barba','Perfilado barba',12,20,2,'barba.jpg','activo'),
('Masaje Relajante','Masaje 60min',35,60,5,'masaje.jpg','activo'),
('Limpieza Facial','Limpieza profunda',30,45,4,'facial.jpg','activo');
-- Adicionales (8 - mínimo requerido)
INSERT INTO servicios_adicionales (nombre, descripcion, precio, estado) VALUES
('Lavado Premium','Lavado premium',5,'activo'),('Secado y Peinado','Secado profesional',8,'activo'),
('Keratina','Tratamiento keratina',20,'activo'),('Mascarilla Capilar','Mascarilla',10,'activo'),
('Aromaterapia','Aceites esenciales',7,'activo'),('Exfoliación','Exfoliación facial',12,'activo'),
('Cera Fría','Depilación',15,'activo'),('Manicure Express','Manicure rápido',10,'activo');
-- Empleados (3 - mínimo, cada uno con 3 servicios)
INSERT INTO empleados (codigo, usuario_id, especialidad_id, estado) VALUES ('EMP-001',2,2,'activo'),('EMP-002',3,3,'activo'),('EMP-003',4,5,'activo');
INSERT INTO empleado_servicio (empleado_id, servicio_id) VALUES (1,1),(1,3),(1,2),(2,2),(2,1),(2,5),(3,4),(3,5),(3,3);
-- Horarios (7 días - todos los días de atención)
INSERT INTO horarios (dia_semana, hora_inicio, hora_fin, activo) VALUES
('Lunes','08:00','17:00',1),('Martes','08:00','17:00',1),('Miércoles','08:00','17:00',1),
('Jueves','08:00','17:00',1),('Viernes','08:00','17:00',1),('Sábado','08:00','13:00',1),('Domingo','00:00','00:00',0);
-- Restricciones (8 - 2 general, 3 empleado, 2 parcial, 1 día completo)
INSERT INTO restricciones (tipo, fecha, hora_inicio, hora_fin, aplica_a, empleado_id, motivo, estado) VALUES
('General del establecimiento','2026-09-15','00:00','23:59','Establecimiento',NULL,'Feriado nacional','activo'),
('General del establecimiento','2026-12-24','12:00','17:00','Establecimiento',NULL,'Cierre especial','activo'),
('Específica de empleado','2026-09-18','09:00','11:00','Empleado 1',1,'Capacitación','activo'),
('Específica de empleado','2026-09-19','13:00','15:00','Empleado 2',2,'Cita médica','activo'),
('Específica de empleado','2026-09-20','08:00','10:00','Empleado 3',3,'Reunión interna','activo'),
('Parcial por horas','2026-09-21','12:00','13:00','Establecimiento',NULL,'Almuerzo personal','activo'),
('Parcial por horas','2026-09-22','15:00','16:00','Empleado 1',1,'Inventario','activo'),
('Día completo','2026-10-01','00:00','23:59','Establecimiento',NULL,'Mantenimiento','activo');
-- Citas (13 - 4 pendientes, 4 confirmadas, 3 finalizadas, 2 canceladas distribuidas)
INSERT INTO citas (cliente_id, servicio_id, empleado_id, fecha, hora_inicio, hora_fin, costo, duracion, estado) VALUES
(5,1,1,'2026-08-15','09:00','09:30',20,30,'Pendiente'),(6,2,2,'2026-08-15','10:00','11:30',60,90,'Pendiente'),
(5,3,1,'2026-08-16','08:00','08:20',12,20,'Pendiente'),(6,4,3,'2026-08-16','14:00','15:00',42,60,'Pendiente'),
(5,5,3,'2026-08-14','09:00','09:45',42,45,'Confirmada'),(6,1,1,'2026-08-14','10:00','10:30',28,30,'Confirmada'),
(5,2,2,'2026-08-14','11:00','12:30',40,90,'Confirmada'),(6,3,1,'2026-08-14','13:00','13:20',12,20,'Confirmada'),
(5,4,3,'2026-08-13','08:00','09:00',35,60,'Finalizada'),(6,5,2,'2026-08-13','09:30','10:15',30,45,'Finalizada'),
(5,1,1,'2026-08-12','08:00','08:30',15,30,'Finalizada'),
(6,2,2,'2026-08-12','14:00','15:30',45,90,'Cancelada'),(5,3,3,'2026-08-12','16:00','16:20',12,20,'Cancelada');
`;
