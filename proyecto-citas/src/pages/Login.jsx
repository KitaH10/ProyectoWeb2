import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Input, Label } from "../components/ui/input";
import { Button } from "../components/ui/button";
export default function Login() {
  const [email, setEmail] = useState("admin@citas.com");
  const [password, setPassword] = useState("Admin12345");
  const [error, setError] = useState("");
  const { login, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handle = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Campos obligatorios *");
      return;
    }
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Iniciar sesión</CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            admin@citas.com / Admin12345
            <br />
            empleado1@citas.com / Emp12345
            <br />
            cliente1@citas.com / Cliente123
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handle} className="space-y-4">
            <div>
              <Label>Correo electrónico *</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label>Contraseña *</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded border">
                {error}
              </div>
            )}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Cargando..." : "Iniciar sesión"}
            </Button>
            <p className="text-center text-sm">
              ¿No tienes cuenta?{" "}
              <Link to="/register" className="text-primary underline">
                Registrar cliente
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
