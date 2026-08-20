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
export default function ServiciosList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orden, setOrden] = useState("nombre");
  useEffect(() => {
    (async () => {
      setLoading(true);
      setList(await api.getServicios());
      setLoading(false);
    })();
  }, []);
  const sorted = [...list].sort((a, b) => (a[orden] > b[orden] ? 1 : -1));
  if (loading) return <p>Cargando servicios...</p>;
  if (sorted.length === 0) return <p>Sin servicios - estado vacío</p>;
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Servicios</h1>
        <Link to="/servicios/nuevo">
          <Button>Crear servicio</Button>
        </Link>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setOrden("nombre")}>
          Ordenar nombre
        </Button>
        <Button variant="outline" size="sm" onClick={() => setOrden("precio")}>
          Por precio
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {sorted.map((s) => (
          <Card key={s.id}>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="text-base">{s.nombre}</CardTitle>
                <Badge variant={s.estado === "activo" ? "success" : "outline"}>
                  {s.estado}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <img
                src={s.imagen}
                alt={s.nombre}
                className="w-full h-32 object-cover rounded-md border"
              />
              <p className="text-sm text-muted-foreground line-clamp-2">
                {s.descripcion}
              </p>
              <p className="text-sm">
                <b>${s.precio}</b> - {s.duracion} min
              </p>
              <div className="flex gap-2">
                <Link to={`/servicios/${s.id}`}>
                  <Button size="sm" variant="outline">
                    Detalle
                  </Button>
                </Link>
                <Link to={`/servicios/${s.id}/editar`}>
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
