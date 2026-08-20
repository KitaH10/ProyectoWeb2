import { useState, useEffect } from "react";
import { api } from "../services/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
export default function AgendaDiaria() {
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [data, setData] = useState({
    empleados: [],
    citas: [],
    restricciones: [],
    horario: null,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      setData(await api.getAgendaDiaria(fecha));
      setLoading(false);
    })();
  }, [fecha]);
  if (loading) return <p>Cargando agenda...</p>;
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">
        Agenda Diaria del Establecimiento - Solo Administrador
      </h1>
      <Input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="w-60"
      />
      {data.horario && (
        <p className="text-sm">
          Horario general: {data.horario.dia} {data.horario.inicio}-
          {data.horario.fin} {data.horario.activo ? "Activo" : "Inactivo"}
        </p>
      )}
      <div className="overflow-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-2 border">Hora</th>
              {data.empleados.map((emp) => (
                <th key={emp.id} className="p-2 border">
                  {emp.nombre}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              "08:00",
              "09:00",
              "10:00",
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
            ].map((hora) => (
              <tr key={hora}>
                <td className="p-2 border font-medium">{hora}</td>
                {data.empleados.map((emp) => {
                  const cita = data.citas.find(
                    (c) => c.empleadoId === emp.id && c.inicio === hora,
                  );
                  const rest = data.restricciones.find(
                    (r) =>
                      (r.empleadoId === emp.id || !r.empleadoId) &&
                      r.inicio <= hora &&
                      r.fin > hora,
                  );
                  if (rest)
                    return (
                      <td
                        key={emp.id}
                        className="p-2 border bg-red-50 text-red-700 text-xs"
                      >
                        {rest.motivo} ({rest.inicio}-{rest.fin})
                      </td>
                    );
                  if (cita)
                    return (
                      <td key={emp.id} className="p-2 border bg-blue-50">
                        <Link to={`/citas/${cita.id}`} className="text-xs">
                          <b>{cita.clienteNombre}</b>
                          <br />
                          {cita.servicioNombre}
                          <br />
                          {cita.inicio}-{cita.fin}
                          <br />
                          <span className="px-1 rounded bg-yellow-100">
                            {cita.estado}
                          </span>
                        </Link>
                      </td>
                    );
                  return (
                    <td
                      key={emp.id}
                      className="p-2 border bg-green-50 text-xs text-green-700"
                    >
                      Disponible
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            Restricciones del día - Requerimiento visual mínimo
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.restricciones.length === 0
            ? "Sin restricciones"
            : data.restricciones.map((r) => (
                <p key={r.id} className="text-xs">
                  {r.fecha} {r.inicio}-{r.fin} {r.aplicaA} - {r.motivo}
                </p>
              ))}
        </CardContent>
      </Card>
    </div>
  );
}
