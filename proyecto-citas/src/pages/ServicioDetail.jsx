import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
export default function ServicioDetail() {
  const { id } = useParams();
  const [s, setS] = useState(null);
  useEffect(() => {
    (async () => {
      setS(await api.getServicio(id));
    })();
  }, [id]);
  if (!s) return <p>Cargando...</p>;
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{s.nombre}</CardTitle>
          <Badge variant={s.estado === "activo" ? "success" : "outline"}>
            {s.estado}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <img
          src={s.imagen}
          alt={s.nombre}
          className="w-full max-w-sm h-64 object-cover rounded-lg border"
        />
        <p>{s.descripcion}</p>
        <p>
          <b>Precio:</b> ${s.precio} | <b>Duración:</b> {s.duracion} min |{" "}
          <b>Especialidad:</b> {s.especialidadId}
        </p>
        <div className="flex gap-2">
          <Link to={`/servicios/${s.id}/editar`}>
            <Button>Editar</Button>
          </Link>
          <Link to="/servicios">
            <Button variant="outline">Volver</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
