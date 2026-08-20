import { useEffect, useState } from "react";
import { api } from "../services/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
export default function HorariosList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => setList(await api.getHorarios()))();
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">
        Horarios de Atención - Solo lectura (no crear/editar/eliminar)
      </h1>
      <div className="grid md:grid-cols-3 gap-3">
        {list.map((h) => (
          <Card key={h.id}>
            <CardHeader>
              <CardTitle className="text-base">{h.dia}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {h.inicio} - {h.fin}
              </p>
              <p
                className={`text-xs ${h.activo ? "text-green-600" : "text-red-600"}`}
              >
                {h.activo ? "Activo" : "Inactivo - no se pueden crear citas"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
