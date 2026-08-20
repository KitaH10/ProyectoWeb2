import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
export default function Perfil() {
  const { user } = useContext(AuthContext);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mi Perfil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <b>Nombre:</b> {user?.nombre}
        </p>
        <p>
          <b>Email:</b> {user?.email}
        </p>
        <p>
          <b>Rol:</b> {user?.rol}
        </p>
        <p>
          <b>Estado:</b> {user?.estado}
        </p>
        <p className="text-xs text-muted-foreground">
          Roles obtenidos desde API controlan permisos.
        </p>
      </CardContent>
    </Card>
  );
}
