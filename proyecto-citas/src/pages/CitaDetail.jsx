import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
export default function CitaDetail() {
  const { id } = useParams();
  const [cita, setCita] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => setCita(await api.getCita(id)))();
  }, [id]);
  if (!cita) return <p>Cargando...</p>;
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Detalle Cita {cita.id} - Estado {cita.estado}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <b>Cliente:</b> {cita.clienteNombre} (ID {cita.clienteId})
          </p>
          <p>
            <b>Servicio principal:</b> {cita.servicioNombre} - ${cita.costo} -{" "}
            {cita.duracion} min - Hora fin {cita.fin}
          </p>
          <p>
            <b>Adicionales:</b> {cita.adicionales.join(", ") || "Ninguno"} -
            Costo total incluye adicionales, duración solo servicio principal
          </p>
          <p>
            <b>Empleado:</b> {cita.empleadoNombre}
          </p>
          <p>
            <b>Fecha:</b> {cita.fecha} | <b>Inicio:</b> {cita.inicio} |{" "}
            <b>Fin:</b> {cita.fin} (calculado automáticamente)
          </p>
          <p>
            <b>Costo total:</b> ${cita.costo} = precio base + suma adicionales
          </p>
          {error && (
            <p className="text-red-600 bg-red-50 p-2 rounded">{error}</p>
          )}
          <div className="flex gap-2 flex-wrap">
            {(user.rol === "Administrador" ||
              (user.rol === "Empleado" &&
                cita.empleadoNombre.includes(user.nombre.split(" ")[0]))) &&
              !["Finalizada", "Cancelada"].includes(cita.estado) && (
                <>
                  <Button onClick={() => navigate(`/citas/${cita.id}/editar`)}>
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={async () => {
                      try {
                        await api.cambiarEstado(
                          cita.id,
                          cita.estado === "Pendiente"
                            ? "Confirmada"
                            : cita.estado === "Confirmada"
                              ? "En proceso"
                              : "Finalizada",
                        );
                        setCita(await api.getCita(id));
                      } catch (e) {
                        setError(e.message);
                      }
                    }}
                  >
                    Cambiar estado
                  </Button>
                </>
              )}
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  await api.cancelarCita(cita.id, user);
                  setCita(await api.getCita(id));
                } catch (e) {
                  setError(e.message);
                }
              }}
            >
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
