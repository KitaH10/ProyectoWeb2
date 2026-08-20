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
export default function RestriccionesList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => setList(await api.getRestricciones()))();
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">
        Restricciones de Horario - Solo lectura, valida automáticamente en citas
      </h1>
      <p className="text-sm text-muted-foreground">
        2 general, 3 empleado, 2 parcial, 1 día completo - mínimo requerido
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        {list.map((r) => (
          <Card key={r.id}>
            <CardHeader>
              <CardTitle className="text-sm">{r.tipo}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-1">
              <p>
                <b>Fecha:</b> {r.fecha}
              </p>
              <p>
                <b>Horario:</b> {r.inicio}-{r.fin}
              </p>
              <p>
                <b>Aplica a:</b> {r.aplicaA}
              </p>
              <p>
                <b>Motivo:</b> {r.motivo}
              </p>
              <p>
                <b>Estado:</b> {r.estado}
              </p>
              <Link to={`/restricciones/${r.id}`}>
                <Button size="sm" variant="outline">
                  Detalle
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
