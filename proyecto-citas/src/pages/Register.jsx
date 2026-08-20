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
export default function Register() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const { register, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handle = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    if (!form.nombre || !form.email || !form.password) {
      setError("Todos los campos obligatorios *");
      return;
    }
    if (form.nombre.length < 3 || form.nombre.length > 50) {
      setError("Nombre 3-50 caracteres");
      return;
    }
    if (form.password.length < 8) {
      setError("Contraseña mínimo 8");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Email inválido");
      return;
    }
    try {
      await register(form);
      setOk("Cliente registrado correctamente");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Registro público - Solo Clientes</CardTitle>
          <p className="text-sm text-muted-foreground">
            El registro público únicamente permite crear clientes.
            Administradores y empleados son datos iniciales.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handle} className="space-y-4">
            <div>
              <Label>Nombre completo *</Label>
              <Input
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </div>
            <div>
              <Label>Correo *</Label>
              <Input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <Label>Contraseña * (mín 8)</Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded border">
                {error}
              </div>
            )}
            {ok && (
              <div className="text-green-700 text-sm bg-green-50 p-2 rounded border">
                {ok}
              </div>
            )}
            <Button disabled={loading} className="w-full">
              Registrar cliente
            </Button>
            <Link
              to="/login"
              className="text-sm text-primary underline block text-center"
            >
              Volver a login
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
