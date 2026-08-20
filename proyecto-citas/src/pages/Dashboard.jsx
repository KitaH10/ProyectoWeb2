import { useEffect, useState, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    servicios: 0,
    empleados: 0,
    citas: 0,
    pendientes: 0,
  });
  useEffect(() => {
    (async () => {
      const [serv, emp, citas] = await Promise.all([
        api.getServicios(),
        api.getEmpleados(),
        api.getCitas(),
      ]);
      setStats({
        servicios: serv.length,
        empleados: emp.length,
        citas: citas.length,
        pendientes: citas.filter((c) => c.estado === "Pendiente").length,
      });
    })();
  }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Bienvenido {user?.nombre} - {user?.rol}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Servicios</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.servicios}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Empleados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.empleados}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Citas Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.citas}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.pendientes}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Proceso Principal - Gestión de Citas</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            <b>Flujo:</b> Cliente → Servicio principal (precio/duración auto) →
            Adicionales (recalcula costo) → Empleado (filtrado por servicios
            asignados) → Fecha → Agenda empleado + Horario + Restricciones +
            Citas → Hora inicio → Hora fin auto → Validar disponibilidad →
            Registrar
          </p>
          <p>
            <b>Reglas:</b> Solo servicios/adicionales activos, solo empleados
            activos, costo = precio base + suma adicionales, duración = solo
            servicio principal, canceladas no bloquean,
            pendientes/confirmadas/en proceso sí, restricciones prioridad.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
