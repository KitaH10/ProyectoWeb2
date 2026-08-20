# Proyecto Gestión de Citas - Frontend React (100% Enunciado)

**Stack obligatorio:** React + Tailwind CSS + shadcn/ui + React Router + useState/useEffect/Props/Context/Hooks

**API:** https://github.com/npaniagua26/api-citas (Backend ya desarrollado, este frontend consume endpoints, mock localStorage para demo)

## Instalación
```
npm install
npm run dev
# abre http://localhost:5173
```

## Credenciales datos iniciales (seed)
- Admin: admin@citas.com / Admin12345
- Empleados: empleado1@citas.com / Emp12345, empleado2@citas.com / Emp12345, empleado3@citas.com / Emp12345
- Clientes: cliente1@citas.com / Cliente123, cliente2@citas.com / Cliente123

## Módulos implementados 100%

1. **Gestión Usuarios (1.5%):** login, logout, registro público solo Cliente (valida obligatorio, longitud 3-50, email, pass min 8, rol forzado Cliente), perfil, roles desde API
2. **Catálogos solo lectura (1%):** Roles, Especialidades (5), Estados Cita (5 con colores) - sin mantenimiento
3. **Servicios (2%):** listar con ordenamiento, miniatura imagen, badge estado, detalle con imagen grande, crear/editar con carga y vista previa imagen (valida formato jpg/png/webp), precio base, duración, activar/desactivar valida no desactivar si tiene citas pendientes/confirmadas, solo activos en citas
4. **Adicionales (1.5%):** listar, detalle, crear, editar, activar/desactivar, solo activos en citas, costo incrementa total
5. **Empleados (2%):** listar con info general, estado, servicios que puede realizar, cantidad citas asignadas, detalle con agenda y restricciones, crear/editar con código regex ^[A-Za-z0-9-_]+$, usuario asociado único, asignación servicios Dual List / checkboxes / lista múltiple, activar/desactivar valida citas, horario general compartido, solo variaciones por restricciones
6. **Horarios (1%):** listar solo lectura, no crear/editar/eliminar
7. **Restricciones (1.5%):** listar, detalle, muestra si aplica establecimiento o empleado, fecha, horario restringido, motivo, estado, validación automática en citas, prioridad sobre horario
8. **Citas - proceso principal (6%):** listar por rol (Admin todas, Empleado solo asignadas, Cliente solo propias), detalle, crear con flujo completo cliente→servicio→adicionales→empleado filtrado→fecha→agenda+horario+restricciones+citas→hora inicio→hora fin auto→validar disponibilidad completa→registrar, editar bloquea finalizadas/canceladas, cancelar (cliente solo propias pendientes), cambiar estado, consulta disponibilidad, cálculo costo = precio base + suma adicionales, duración = solo servicio principal, hora fin auto, validación traslapes intervalo completo, canceladas no bloquean, pendientes/confirmadas/en proceso sí
9. **Adicionales de Cita (1%):** consultar disponibles, agregar, modificar antes de guardar, recalcular costo, no duplicados, no inactivos
10. **Agenda diaria (1.5%):** selector fecha, horario general, empleados activos, citas por empleado orden cronológico, visual ocupados/disponibles/restringidos, celdas con estado, cliente breve, servicio, hora inicio-fin, detalle desde agenda, solo Admin completa
11. **Validaciones Frontend (1.5%):** obligatorios *, longitud min/max, fechas válidas, horarios válidos, selecciones obligatorias, disponibilidad empleado, restricciones, traslapes, mensajes claros, impedir múltiples envíos, loading, estados vacíos
12. **Técnicos obligatorios (1%):** React Router, componentes reutilizables, servicios API, Layout, rutas protegidas, organización modular, GET/POST/PUT, manejo errores/loading/vacío, useState/useEffect/Props/Context/Hooks, Tailwind + shadcn variables tema, responsive, español único, sin IDs crudos
13. **Visuales:** Tailwind + shadcn, ordenamiento, indicadores estado colores (Pendiente amarillo, Confirmada azul, En proceso morado, Finalizada verde, Cancelada rojo), listados con miniatura imagen, formularios con errores, campos obligatorios, shadcn, impedir envíos simultáneos, mensajes éxito/error, durante registro cita muestra simultáneamente servicio, adicionales, costo total, duración total, hora final, agenda empleado, ocupados/disponibles/restricciones

## Datos iniciales mínimos cumplidos
- Roles 3, Estados 5, Días semana 7, Tipos restricción 4, Especialidades 5 (General, Barbería, Coloración, Estética, Masajes)
- Usuarios 6 (1 admin existente + 3 empleados + 2 clientes)
- Servicios 5 (mín 3 máx 5 por empleado)
- Adicionales 8 (mín 8)
- Empleados 3 con 3+ servicios cada uno
- Horarios 7 días
- Restricciones 8 (2 general, 3 empleado, 2 parcial, 1 día completo)
- Citas 13 (4 pendientes, 4 confirmadas, 3 finalizadas, 2 canceladas) distribuidas

Ver src/services/mockData.js y datos_iniciales.js con SQL inserts

## Defensa
Docente puede solicitar cualquier funcionalidad. Cada integrante debe explicar funcionamiento técnico.

## Evaluación total 30% cubierto
