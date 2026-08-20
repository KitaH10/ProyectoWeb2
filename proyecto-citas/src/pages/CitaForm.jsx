import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Input, Label } from "../components/ui/input";
import { Button } from "../components/ui/button";
export default function CitaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [adicionales, setAdicionales] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [agenda, setAgenda] = useState({ citas: [], restricciones: [] });
  const [form, setForm] = useState({
    clienteId: "",
    servicioId: "",
    adicionales: [],
    empleadoId: "",
    fecha: new Date().toISOString().split("T")[0],
    inicio: "09:00",
  });
  const [costo, setCosto] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [fin, setFin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setClientes(api.data.usuarios.filter((u) => u.rol === "Cliente"));
      setServicios(
        (await api.getServicios()).filter((s) => s.estado === "activo"),
      );
      setAdicionales(
        (await api.getAdicionales()).filter((a) => a.estado === "activo"),
      );
      setEmpleados(
        (await api.getEmpleados()).filter((e) => e.estado === "activo"),
      );
      if (id) {
        const c = await api.getCita(id);
        setForm({
          clienteId: c.clienteId,
          servicioId: c.servicioId,
          adicionales: c.adicionales,
          empleadoId: c.empleadoId,
          fecha: c.fecha,
          inicio: c.inicio,
        });
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      // calcular costo y duración
      const serv = servicios.find((s) => s.id === Number(form.servicioId));
      if (serv) {
        const costoAd = form.adicionales.reduce((sum, adId) => {
          const ad = adicionales.find((a) => a.id === Number(adId));
          return sum + (ad?.precio || 0);
        }, 0);
        setCosto(serv.precio + costoAd);
        setDuracion(serv.duracion);
        setFin(api.calcularFin(form.inicio, serv.duracion));
      }
      // filtrar empleados por servicio
      // consultar agenda
      if (form.empleadoId && form.fecha) {
        setAgenda(await api.getAgendaEmpleado(form.empleadoId, form.fecha));
      }
    })();
  }, [form, servicios, adicionales]);

  const empleadosFiltrados = form.servicioId
    ? empleados.filter((e) => e.servicios.includes(Number(form.servicioId)))
    : empleados;

  const toggleAdicional = (adId) => {
    setForm((f) => {
      const has = f.adicionales.includes(adId);
      return {
        ...f,
        adicionales: has
          ? f.adicionales.filter((x) => x !== adId)
          : [...f.adicionales, adId],
      };
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (
      !form.clienteId ||
      !form.servicioId ||
      !form.empleadoId ||
      !form.fecha ||
      !form.inicio
    ) {
      setError(
        "Campos obligatorios: cliente, servicio, empleado, fecha, hora inicio *",
      );
      return;
    }
    setLoading(true);
    try {
      if (id) await api.updateCita(id, form);
      else await api.createCita(form);
      navigate("/citas");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>
            {id ? "Editar" : "Crear"} Cita - Proceso principal con validación
            completa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label>Cliente *</Label>
              <select
                value={form.clienteId}
                onChange={(e) =>
                  setForm({ ...form, clienteId: e.target.value })
                }
                className="w-full border rounded h-10 px-3"
              >
                <option value="">Seleccione cliente</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre} - {c.email}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Servicio principal * (solo activos)</Label>
              <select
                value={form.servicioId}
                onChange={(e) =>
                  setForm({ ...form, servicioId: e.target.value })
                }
                className="w-full border rounded h-10 px-3"
              >
                <option value="">Seleccione servicio</option>
                {servicios.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nombre} - ${s.precio} - {s.duracion}min
                  </option>
                ))}
              </select>
              {form.servicioId && (
                <p className="text-xs text-muted-foreground">
                  Precio base y duración se muestran automáticamente
                </p>
              )}
            </div>
            <div>
              <Label>
                Adicionales (solo activos, no duplicados) - cada uno incrementa
                costo
              </Label>
              <div className="border rounded p-2 grid grid-cols-2 gap-1 max-h-32 overflow-auto">
                {adicionales.map((a) => (
                  <label key={a.id} className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={form.adicionales.includes(a.id)}
                      onChange={() => toggleAdicional(a.id)}
                    />
                    {a.nombre} +${a.precio}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Label>
                Empleado * (solo activos que pueden realizar servicio
                seleccionado)
              </Label>
              <select
                value={form.empleadoId}
                onChange={(e) =>
                  setForm({ ...form, empleadoId: e.target.value })
                }
                className="w-full border rounded h-10 px-3"
              >
                <option value="">Seleccione empleado</option>
                {empleadosFiltrados.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nombre} - {e.codigo} - servicios {e.servicios.length}
                  </option>
                ))}
              </select>
              {form.servicioId && empleadosFiltrados.length === 0 && (
                <p className="text-xs text-red-600">
                  Ningún empleado puede realizar este servicio
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Fecha * (no pasada)</Label>
                <Input
                  type="date"
                  value={form.fecha}
                  onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                />
              </div>
              <div>
                <Label>Hora inicio *</Label>
                <Input
                  type="time"
                  value={form.inicio}
                  onChange={(e) => setForm({ ...form, inicio: e.target.value })}
                />
              </div>
            </div>
            <div className="bg-slate-50 border rounded p-3 text-sm space-y-1">
              <p>
                <b>Duración total:</b> {duracion} min (solo servicio principal,
                adicionales no modifican duración)
              </p>
              <p>
                <b>Hora finalización automática:</b> {fin}
              </p>
              <p>
                <b>Costo total:</b> ${costo} = precio base + suma adicionales
              </p>
            </div>
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded border">
                {error}
              </div>
            )}
            <Button type="submit" disabled={loading} className="w-full">
              {loading
                ? "Validando disponibilidad..."
                : id
                  ? "Actualizar cita"
                  : "Registrar cita - valida horario, restricciones, traslapes"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              Agenda empleado {form.fecha}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-1">
            <p>
              <b>Horario establecimiento:</b>{" "}
              {api.data.horarios.find((h) => {
                const dia = new Date(
                  form.fecha + "T00:00:00",
                ).toLocaleDateString("es-ES", { weekday: "long" });
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
              })?.inicio || "08:00"}
              -
              {api.data.horarios.find((h) => {
                const dia = new Date(
                  form.fecha + "T00:00:00",
                ).toLocaleDateString("es-ES", { weekday: "long" });
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
              })?.fin || "17:00"}
            </p>
            <p className="font-bold">Citas existentes:</p>
            {agenda.citas.map((c) => (
              <p key={c.id} className="border p-1 rounded bg-blue-50">
                {c.inicio}-{c.fin} {c.clienteNombre} {c.servicioNombre}
              </p>
            ))}
            {agenda.citas.length === 0 && (
              <p className="text-green-600">Sin citas - horarios disponibles</p>
            )}
            <p className="font-bold mt-2">Restricciones:</p>
            {agenda.restricciones.map((r) => (
              <p
                key={r.id}
                className="border p-1 rounded bg-red-50 text-red-700"
              >
                {r.inicio}-{r.fin} {r.motivo}
              </p>
            ))}
            {agenda.restricciones.length === 0 && (
              <p className="text-green-600">Sin restricciones</p>
            )}
            <p className="font-bold mt-2">Validaciones:</p>
            <ul className="list-disc ml-4">
              <li>Horario general</li>
              <li>Restricciones generales y empleado</li>
              <li>Servicios asignados</li>
              <li>Traslapes intervalo completo</li>
              <li>Canceladas no bloquean</li>
              <li>Pendientes/Confirmadas/En proceso sí bloquean</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
