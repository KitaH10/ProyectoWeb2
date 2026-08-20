import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
export default function RestriccionDetail() {
  const { id } = useParams();
  const [r, setR] = useState(null);
  useEffect(() => {
    (async () => {
      const list = await api.getRestricciones();
      setR(list.find((x) => x.id === Number(id)));
    })();
  }, [id]);
  if (!r) return <p>Cargando...</p>;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{r.tipo}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <b>Fecha:</b> {r.fecha}
        </p>
        <p>
          <b>Horario restringido:</b> {r.inicio}-{r.fin}
        </p>
        <p>
          <b>Aplica a:</b> {r.aplicaA}{" "}
          {r.empleadoId ? `(Empleado ${r.empleadoId})` : ""}
        </p>
        <p>
          <b>Motivo:</b> {r.motivo}
        </p>
        <p>
          <b>Estado:</b> {r.estado}
        </p>
        <p className="text-xs text-muted-foreground">
          Esta restricción bloquea automáticamente creación de citas en ese
          intervalo. Prioridad sobre horario general.
        </p>
      </CardContent>
    </Card>
  );
}
