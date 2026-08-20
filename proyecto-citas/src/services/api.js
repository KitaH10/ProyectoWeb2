import {
  ROLES,
  ESTADOS_CITA,
  DIAS_SEMANA,
  TIPOS_RESTRICCION,
  ESPECIALIDADES_INICIAL,
  SERVICIOS_INICIAL,
  ADICIONALES_INICIAL,
  USUARIOS_INICIAL,
  EMPLEADOS_INICIAL,
  HORARIOS_INICIAL,
  RESTRICCIONES_INICIAL,
  CITAS_INICIAL,
} from "./mockData";
const STORAGE_KEY = "citas_system_v1";
class ApiService {
  constructor() {
    this.load();
  }
  load() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      this.data = JSON.parse(stored);
    } else {
      this.data = {
        roles: ROLES,
        estados: ESTADOS_CITA,
        dias: DIAS_SEMANA,
        tiposRestriccion: TIPOS_RESTRICCION,
        especialidades: ESPECIALIDADES_INICIAL,
        servicios: SERVICIOS_INICIAL,
        adicionales: ADICIONALES_INICIAL,
        usuarios: USUARIOS_INICIAL,
        empleados: EMPLEADOS_INICIAL,
        horarios: HORARIOS_INICIAL,
        restricciones: RESTRICCIONES_INICIAL,
        citas: CITAS_INICIAL,
      };
      this.save();
    }
  }
  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }
  async login(email, password) {
    await this.delay(300);
    const user = this.data.usuarios.find(
      (u) =>
        u.email === email && u.password === password && u.estado === "activo",
    );
    if (!user) throw new Error("Credenciales inválidas");
    return { user, token: "mock-token-" + user.id };
  }
  async register({ nombre, email, password }) {
    await this.delay(300);
    if (!nombre || !email || !password) throw new Error("Campos obligatorios");
    if (this.data.usuarios.find((u) => u.email === email))
      throw new Error("Email ya registrado");
    if (password.length < 8) throw new Error("Contraseña mínimo 8");
    const nuevo = {
      id: Date.now(),
      nombre,
      email,
      password,
      rol: "Cliente",
      estado: "activo",
    };
    this.data.usuarios.push(nuevo);
    this.save();
    return nuevo;
  }
  async getRoles() {
    return this.data.roles;
  }
  async getEspecialidades() {
    return this.data.especialidades;
  }
  async getEstados() {
    return this.data.estados;
  }
  async getServicios() {
    return this.data.servicios;
  }
  async getServicio(id) {
    return this.data.servicios.find((s) => s.id === Number(id));
  }
  async createServicio(payload) {
    if (!payload.nombre || !payload.precio || !payload.duracion)
      throw new Error("Campos obligatorios");
    const nuevo = { id: Date.now(), ...payload, estado: "activo" };
    this.data.servicios.push(nuevo);
    this.save();
    return nuevo;
  }
  async updateServicio(id, payload) {
    const idx = this.data.servicios.findIndex((s) => s.id === Number(id));
    this.data.servicios[idx] = { ...this.data.servicios[idx], ...payload };
    this.save();
    return this.data.servicios[idx];
  }
  async toggleServicio(id) {
    const servicio = await this.getServicio(id);
    const citasActivas = this.data.citas.filter(
      (c) =>
        c.servicioId === Number(id) &&
        ["Pendiente", "Confirmada", "En proceso"].includes(c.estado),
    );
    if (servicio.estado === "activo" && citasActivas.length > 0)
      throw new Error(
        "No se puede desactivar: tiene citas pendientes/confirmadas",
      );
    servicio.estado = servicio.estado === "activo" ? "inactivo" : "activo";
    this.save();
    return servicio;
  }
  async getAdicionales() {
    return this.data.adicionales;
  }
  async createAdicional(payload) {
    if (!payload.nombre || payload.precio == null)
      throw new Error("Campos obligatorios");
    const nuevo = { id: Date.now(), ...payload, estado: "activo" };
    this.data.adicionales.push(nuevo);
    this.save();
    return nuevo;
  }
  async updateAdicional(id, payload) {
    const idx = this.data.adicionales.findIndex((a) => a.id === Number(id));
    this.data.adicionales[idx] = { ...this.data.adicionales[idx], ...payload };
    this.save();
    return this.data.adicionales[idx];
  }
  async toggleAdicional(id) {
    const ad = this.data.adicionales.find((a) => a.id === Number(id));
    ad.estado = ad.estado === "activo" ? "inactivo" : "activo";
    this.save();
    return ad;
  }
  async getEmpleados() {
    return this.data.empleados;
  }
  async getEmpleado(id) {
    return this.data.empleados.find((e) => e.id === Number(id));
  }
  async createEmpleado(payload) {
    if (!payload.codigo || !payload.usuarioId)
      throw new Error("Código y usuario obligatorios");
    if (!/^[A-Za-z0-9-_]+$/.test(payload.codigo))
      throw new Error("Código solo letras, números, guiones y guion bajo");
    if (
      this.data.empleados.find((e) => e.usuarioId === Number(payload.usuarioId))
    )
      throw new Error("Usuario ya asociado");
    const usuario = this.data.usuarios.find(
      (u) => u.id === Number(payload.usuarioId),
    );
    const nuevo = {
      id: Date.now(),
      ...payload,
      usuarioId: Number(payload.usuarioId),
      nombre: usuario?.nombre || payload.nombre,
      servicios: payload.servicios || [],
      estado: "activo",
      citasAsignadas: 0,
    };
    this.data.empleados.push(nuevo);
    this.save();
    return nuevo;
  }
  async updateEmpleado(id, payload) {
    const idx = this.data.empleados.findIndex((e) => e.id === Number(id));
    if (payload.codigo && !/^[A-Za-z0-9-_]+$/.test(payload.codigo))
      throw new Error("Código inválido");
    this.data.empleados[idx] = { ...this.data.empleados[idx], ...payload };
    this.save();
    return this.data.empleados[idx];
  }
  async toggleEmpleado(id) {
    const emp = this.data.empleados.find((e) => e.id === Number(id));
    const citasActivas = this.data.citas.filter(
      (c) =>
        c.empleadoId === Number(id) &&
        ["Pendiente", "Confirmada", "En proceso"].includes(c.estado),
    );
    if (emp.estado === "activo" && citasActivas.length > 0)
      throw new Error("No se puede desactivar: tiene citas pendientes");
    emp.estado = emp.estado === "activo" ? "inactivo" : "activo";
    this.save();
    return emp;
  }
  async getHorarios() {
    return this.data.horarios;
  }
  async getRestricciones() {
    return this.data.restricciones;
  }
  async getCitas() {
    return this.data.citas;
  }
  async getCita(id) {
    return this.data.citas.find((c) => c.id === Number(id));
  }
  verificarDisponibilidad({ empleadoId, fecha, inicio, fin, citaIdExcluir }) {
    const diaSemana = new Date(fecha + "T00:00:00").toLocaleDateString(
      "es-ES",
      { weekday: "long" },
    );
    const mapa = {
      lunes: "Lunes",
      martes: "Martes",
      miércoles: "Miércoles",
      jueves: "Jueves",
      viernes: "Viernes",
      sábado: "Sábado",
      domingo: "Domingo",
    };
    const diaNorm = mapa[diaSemana.toLowerCase()] || "Lunes";
    const horario = this.data.horarios.find((h) => h.dia === diaNorm);
    if (!horario || !horario.activo)
      return {
        disponible: false,
        motivo: `Establecimiento cerrado los ${diaNorm}`,
      };
    if (inicio < horario.inicio || fin > horario.fin)
      return {
        disponible: false,
        motivo: `Fuera del horario (${horario.inicio}-${horario.fin})`,
      };
    const restricciones = this.data.restricciones.filter(
      (r) => r.fecha === fecha && r.estado === "activo",
    );
    for (const rest of restricciones) {
      const esGeneral = !rest.empleadoId;
      const esDeEmpleado = rest.empleadoId === Number(empleadoId);
      if (esGeneral || esDeEmpleado) {
        if (this.hayTraslape(inicio, fin, rest.inicio, rest.fin)) {
          return {
            disponible: false,
            motivo: `Conflicto restricción: ${rest.motivo} (${rest.inicio}-${rest.fin})`,
          };
        }
      }
    }
    const citasEmpleado = this.data.citas.filter(
      (c) =>
        c.empleadoId === Number(empleadoId) &&
        c.fecha === fecha &&
        c.id !== citaIdExcluir &&
        ["Pendiente", "Confirmada", "En proceso"].includes(c.estado),
    );
    for (const cita of citasEmpleado) {
      if (this.hayTraslape(inicio, fin, cita.inicio, cita.fin)) {
        return {
          disponible: false,
          motivo: `Traslape con cita ${cita.id} (${cita.inicio}-${cita.fin})`,
        };
      }
    }
    return { disponible: true };
  }
  hayTraslape(i1, f1, i2, f2) {
    return i1 < f2 && i2 < f1;
  }
  calcularFin(inicio, duracionMin) {
    const [h, m] = inicio.split(":").map(Number);
    const total = h * 60 + m + Number(duracionMin);
    return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
  }
  async createCita(payload) {
    if (!payload.clienteId) throw new Error("Cliente obligatorio");
    if (!payload.servicioId) throw new Error("Servicio obligatorio");
    if (!payload.empleadoId) throw new Error("Empleado obligatorio");
    if (!payload.fecha) throw new Error("Fecha obligatoria");
    if (!payload.inicio) throw new Error("Hora inicio obligatoria");
    if (
      new Date(payload.fecha) < new Date(new Date().toISOString().split("T")[0])
    )
      throw new Error("No se permiten fechas pasadas");
    const servicio = this.data.servicios.find(
      (s) => s.id === Number(payload.servicioId),
    );
    if (!servicio || servicio.estado !== "activo")
      throw new Error("Servicio inactivo");
    const empleado = this.data.empleados.find(
      (e) => e.id === Number(payload.empleadoId),
    );
    if (!empleado || empleado.estado !== "activo")
      throw new Error("Empleado inactivo");
    if (!empleado.servicios.includes(Number(payload.servicioId)))
      throw new Error("Empleado no puede realizar este servicio");
    if (payload.adicionales) {
      const unicos = new Set(payload.adicionales);
      if (unicos.size !== payload.adicionales.length)
        throw new Error("Adicionales duplicados");
      for (const adId of payload.adicionales) {
        const ad = this.data.adicionales.find((a) => a.id === Number(adId));
        if (!ad || ad.estado !== "activo")
          throw new Error("Adicional inactivo");
      }
    }
    const fin = this.calcularFin(payload.inicio, servicio.duracion);
    const disp = this.verificarDisponibilidad({
      empleadoId: payload.empleadoId,
      fecha: payload.fecha,
      inicio: payload.inicio,
      fin,
      citaIdExcluir: null,
    });
    if (!disp.disponible) throw new Error(disp.motivo);
    const adicionalesCosto = (payload.adicionales || []).reduce((sum, id) => {
      const ad = this.data.adicionales.find((a) => a.id === Number(id));
      return sum + (ad?.precio || 0);
    }, 0);
    const costo = servicio.precio + adicionalesCosto;
    const cliente = this.data.usuarios.find(
      (u) => u.id === Number(payload.clienteId),
    );
    const nueva = {
      id: Date.now(),
      clienteId: Number(payload.clienteId),
      clienteNombre: cliente?.nombre || "Cliente",
      servicioId: Number(payload.servicioId),
      servicioNombre: servicio.nombre,
      adicionales: payload.adicionales || [],
      costo,
      duracion: servicio.duracion,
      empleadoId: Number(payload.empleadoId),
      empleadoNombre: empleado.nombre,
      fecha: payload.fecha,
      inicio: payload.inicio,
      fin,
      estado: "Pendiente",
    };
    this.data.citas.push(nueva);
    this.save();
    return nueva;
  }
  async updateCita(id, payload) {
    const idx = this.data.citas.findIndex((c) => c.id === Number(id));
    if (idx === -1) throw new Error("No encontrada");
    const actual = this.data.citas[idx];
    if (["Finalizada", "Cancelada"].includes(actual.estado))
      throw new Error("No se puede editar finalizada/cancelada");
    const nuevoEmpleadoId = payload.empleadoId ?? actual.empleadoId;
    const nuevaFecha = payload.fecha ?? actual.fecha;
    const nuevoInicio = payload.inicio ?? actual.inicio;
    const nuevoServicioId = payload.servicioId ?? actual.servicioId;
    const servicio = this.data.servicios.find(
      (s) => s.id === Number(nuevoServicioId),
    );
    const fin = this.calcularFin(nuevoInicio, servicio.duracion);
    const disp = this.verificarDisponibilidad({
      empleadoId: nuevoEmpleadoId,
      fecha: nuevaFecha,
      inicio: nuevoInicio,
      fin,
      citaIdExcluir: Number(id),
    });
    if (!disp.disponible) throw new Error(disp.motivo);
    let nuevosAdicionales = payload.adicionales ?? actual.adicionales;
    const adicionalesCosto = (nuevosAdicionales || []).reduce((sum, adId) => {
      const ad = this.data.adicionales.find((a) => a.id === Number(adId));
      return sum + (ad?.precio || 0);
    }, 0);
    const nuevoCosto = servicio.precio + adicionalesCosto;
    const empleado = this.data.empleados.find(
      (e) => e.id === Number(nuevoEmpleadoId),
    );
    const cliente = this.data.usuarios.find(
      (u) => u.id === Number(payload.clienteId ?? actual.clienteId),
    );
    this.data.citas[idx] = {
      ...actual,
      ...payload,
      clienteId: Number(payload.clienteId ?? actual.clienteId),
      clienteNombre: cliente?.nombre || actual.clienteNombre,
      servicioId: Number(nuevoServicioId),
      servicioNombre: servicio.nombre,
      adicionales: nuevosAdicionales,
      costo: nuevoCosto,
      duracion: servicio.duracion,
      empleadoId: Number(nuevoEmpleadoId),
      empleadoNombre: empleado?.nombre || actual.empleadoNombre,
      fecha: nuevaFecha,
      inicio: nuevoInicio,
      fin,
    };
    this.save();
    return this.data.citas[idx];
  }
  async cancelarCita(id, user) {
    const cita = this.data.citas.find((c) => c.id === Number(id));
    if (!cita) throw new Error("No encontrada");
    if (cita.estado === "Finalizada" || cita.estado === "Cancelada")
      throw new Error("No se puede cancelar");
    if (user.rol === "Cliente" && cita.clienteId !== user.id)
      throw new Error("Solo propias");
    if (user.rol === "Cliente" && cita.estado !== "Pendiente")
      throw new Error("Clientes solo pendientes");
    cita.estado = "Cancelada";
    this.save();
    return cita;
  }
  async cambiarEstado(id, nuevoEstado) {
    const cita = this.data.citas.find((c) => c.id === Number(id));
    if (!cita) throw new Error("No encontrada");
    if (["Finalizada", "Cancelada"].includes(cita.estado))
      throw new Error("No se puede cambiar estado final");
    cita.estado = nuevoEstado;
    this.save();
    return cita;
  }
  async getAgendaEmpleado(empleadoId, fecha) {
    const citas = this.data.citas
      .filter((c) => c.empleadoId === Number(empleadoId) && c.fecha === fecha)
      .sort((a, b) => a.inicio.localeCompare(b.inicio));
    const restricciones = this.data.restricciones.filter(
      (r) =>
        (r.empleadoId === Number(empleadoId) || !r.empleadoId) &&
        r.fecha === fecha,
    );
    return { citas, restricciones };
  }
  async getAgendaDiaria(fecha) {
    const empleadosActivos = this.data.empleados.filter(
      (e) => e.estado === "activo",
    );
    const citas = this.data.citas
      .filter((c) => c.fecha === fecha)
      .sort((a, b) => a.inicio.localeCompare(b.inicio));
    const restricciones = this.data.restricciones.filter(
      (r) => r.fecha === fecha,
    );
    const horario = this.data.horarios.find((h) => {
      const dia = new Date(fecha + "T00:00:00").toLocaleDateString("es-ES", {
        weekday: "long",
      });
      const mapa = {
        lunes: "Lunes",
        martes: "Martes",
        miércoles: "Miércoles",
        jueves: "Jueves",
        viernes: "Viernes",
        sábado: "Sábado",
        domingo: "Domingo",
      };
      return h.dia === mapa[dia.toLowerCase()];
    });
    return { empleados: empleadosActivos, citas, restricciones, horario };
  }
  delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
}
export const api = new ApiService();
