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
export default function AdicionalesList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => setList(await api.getAdicionales()))();
  }, []);
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Servicios Adicionales (8 mínimo)</h1>
        <Link to="/adicionales/nuevo">
          <Button>Crear adicional</Button>
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {list.map((a) => (
          <Card key={a.id}>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="text-base">{a.nombre}</CardTitle>
                <Badge variant={a.estado === "activo" ? "success" : "outline"}>
                  {a.estado}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{a.descripcion}</p>
              <p className="text-sm font-bold">${a.precio}</p>
              <div className="flex gap-2 mt-2">
                <Link to={`/adicionales/${a.id}/editar`}>
                  <Button size="sm" variant="outline">
                    Editar
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    await api.toggleAdicional(a.id);
                    setList(await api.getAdicionales());
                  }}
                >
                  {a.estado === "activo" ? "Desactivar" : "Activar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
