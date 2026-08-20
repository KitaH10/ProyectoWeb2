import { useState, useEffect, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
export default function MiAgenda() {
  const { user } = useContext(AuthContext);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [data, setData] = useState({ citas: [], restricciones: [] });
  useEffect(() => {
    (async () => {
      const emp = api.data.empleados.find(
        (e) =>
          e.usuarioId === user.id ||
          e.nombre.includes(user.nombre.split(" ")[0]),
      );
      if (emp) {
        setData(await api.getAgendaEmpleado(emp.id, fecha));
      }
    })();
  }, [fecha, user]);
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Mi Agenda - Solo propias</h1>
      <Input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="w-60"
      />
      <Card>
        <CardHeader>
          <CardTitle>Citas del día</CardTitle>
        </CardHeader>
        <CardContent>
          {data.citas.length === 0
            ? "Sin citas"
            : data.citas.map((c) => (
                <p key={c.id} className="text-xs border p-2 rounded mb-1">
                  {c.inicio}-{c.fin} {c.clienteNombre} - {c.servicioNombre} -{" "}
                  {c.estado} - ${c.costo}
                </p>
              ))}
        </CardContent>
      </Card>
    </div>
  );
}
