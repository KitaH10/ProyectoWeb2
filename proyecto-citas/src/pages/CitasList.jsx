import { useEffect, useState, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
const colorEstado = {
  Pendiente: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Confirmada: "bg-blue-100 text-blue-800 border-blue-300",
  "En proceso": "bg-purple-100 text-purple-800 border-purple-300",
  Finalizada: "bg-green-100 text-green-800 border-green-300",
  Cancelada: "bg-red-100 text-red-800 border-red-300",
};
export default function CitasList() {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [filtro, setFiltro] = useState("Todas");
  useEffect(() => {
    (async () => {
      let citas = await api.getCitas();
      if (user.rol === "Empleado") {
        citas = citas.filter(
          (c) =>
            c.empleadoId === user.id ||
            c.empleadoNombre.includes(user.nombre.split(" ")[0]),
        );
      }
      if (user.rol === "Cliente") {
        citas = citas.filter((c) => c.clienteId === user.id);
      }
      setList(citas);
    })();
  }, [user]);
  const filtradas =
    filtro === "Todas" ? list : list.filter((c) => c.estado === filtro);
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">
          Citas ({user.rol}) - Listar, detalle, crear, editar, cancelar, cambiar
          estado, disponibilidad
        </h1>
        {(user.rol === "Administrador" || user.rol === "Empleado") && (
          <Link to="/citas/nueva">
            <Button>Nueva cita</Button>
          </Link>
        )}
      </div>
      <div className="flex gap-2 flex-wrap">
        {[
          "Todas",
          "Pendiente",
          "Confirmada",
          "En proceso",
          "Finalizada",
          "Cancelada",
        ].map((e) => (
          <Button
            key={e}
            size="sm"
            variant={filtro === e ? "default" : "outline"}
            onClick={() => setFiltro(e)}
          >
            {e}
          </Button>
        ))}
      </div>
      <div className="grid gap-3">
        {filtradas.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Sin citas en este filtro - estado vacío
            </CardContent>
          </Card>
        )}
        {filtradas
          .sort((a, b) => b.fecha.localeCompare(a.fecha))
          .map((c) => (
            <Card key={c.id}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {c.servicioNombre} - {c.clienteNombre}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {c.fecha} {c.inicio}-{c.fin} | {c.empleadoNombre} | $
                    {c.costo} | {c.duracion}min | Adicionales:{" "}
                    {c.adicionales.length}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${colorEstado[c.estado]}`}
                  >
                    {c.estado}
                  </span>
                  <Link to={`/citas/${c.id}`}>
                    <Button size="sm" variant="outline">
                      Detalle
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
