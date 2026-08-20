import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
export default function EmpleadosList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => setList(await api.getEmpleados()))();
  }, []);
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">
          Empleados (mínimo 3, cada uno 3+ servicios)
        </h1>
        <Link to="/empleados/nuevo">
          <Button>Crear empleado</Button>
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {list.map((e) => (
          <Card key={e.id}>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="text-base">{e.nombre}</CardTitle>
                <Badge variant={e.estado === "activo" ? "success" : "outline"}>
                  {e.estado}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Código: {e.codigo} | UsuarioId: {e.usuarioId}
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs">
                Servicios asignados: {e.servicios.length} -{" "}
                {e.servicios.join(", ")}
              </p>
              <p className="text-xs">
                Citas asignadas: {e.citasAsignadas || 0}
              </p>
              <div className="flex gap-2">
                <Link to={`/empleados/${e.id}`}>
                  <Button size="sm" variant="outline">
                    Detalle
                  </Button>
                </Link>
                <Link to={`/empleados/${e.id}/editar`}>
                  <Button size="sm" variant="outline">
                    Editar
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
