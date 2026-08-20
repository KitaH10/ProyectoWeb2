import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
export default function EmpleadoDetail() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [agenda, setAgenda] = useState(null);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  useEffect(() => {
    (async () => {
      setEmp(await api.getEmpleado(id));
      setAgenda(await api.getAgendaEmpleado(id, fecha));
    })();
  }, [id, fecha]);
  if (!emp) return <p>Cargando...</p>;
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {emp.nombre} - {emp.codigo}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Estado: {emp.estado}</p>
          <p>Servicios que puede realizar: {emp.servicios.join(", ")}</p>
          <p>Cantidad citas asignadas: {agenda?.citas?.length || 0}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Agenda del empleado para {fecha}</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="border rounded p-2 mb-2"
          />
          <div className="space-y-1">
            {agenda?.citas?.map((c) => (
              <p key={c.id} className="text-xs border p-1 rounded">
                {c.inicio}-{c.fin} {c.servicioNombre} cliente {c.clienteNombre}{" "}
                estado {c.estado}
              </p>
            ))}
            {agenda?.citas?.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Sin citas - disponible
              </p>
            )}
            <p className="text-xs mt-2 font-bold">Restricciones:</p>
            {agenda?.restricciones?.map((r) => (
              <p key={r.id} className="text-xs text-red-600">
                {r.inicio}-{r.fin} {r.motivo}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
