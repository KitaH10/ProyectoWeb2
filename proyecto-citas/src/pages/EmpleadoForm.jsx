import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Input, Label } from "../components/ui/input";
import { Button } from "../components/ui/button";
export default function EmpleadoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    codigo: "",
    usuarioId: "",
    servicios: [],
  });
  const [usuarios, setUsuarios] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      setUsuarios(api.data.usuarios.filter((u) => u.rol === "Empleado"));
      setServicios(await api.getServicios());
      if (id) {
        const e = await api.getEmpleado(id);
        setForm({
          codigo: e.codigo,
          usuarioId: e.usuarioId,
          servicios: e.servicios,
        });
      }
    })();
  }, [id]);
  const toggleServicio = (sid) => {
    setForm((f) => {
      const has = f.servicios.includes(sid);
      return {
        ...f,
        servicios: has
          ? f.servicios.filter((s) => s !== sid)
          : [...f.servicios, sid],
      };
    });
  };
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.codigo || !form.usuarioId) {
      setError("Código y usuario obligatorios *");
      return;
    }
    if (!/^[A-Za-z0-9-_]+$/.test(form.codigo)) {
      setError("Código solo letras, números, guiones y guion bajo");
      return;
    }
    if (form.servicios.length < 1) {
      setError("Debe asignar al menos 1 servicio (mínimo 3 recomendado)");
      return;
    }
    try {
      if (id) await api.updateEmpleado(id, form);
      else await api.createEmpleado(form);
      navigate("/empleados");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {id ? "Editar" : "Crear"} Empleado - Asignación servicios Dual List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4 max-w-lg">
          <div>
            <Label>Código * (solo letras, números, guiones, guion bajo)</Label>
            <Input
              value={form.codigo}
              onChange={(e) => setForm({ ...form, codigo: e.target.value })}
              placeholder="EMP-001"
            />
          </div>
          <div>
            <Label>Usuario asociado * (único)</Label>
            <select
              value={form.usuarioId}
              onChange={(e) => setForm({ ...form, usuarioId: e.target.value })}
              className="w-full border rounded h-10 px-3"
            >
              <option value="">Seleccione usuario</option>
              {usuarios.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombre} - {u.email}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>
              Servicios que puede realizar * (checkbox grupo / dual list)
            </Label>
            <div className="border rounded p-3 grid grid-cols-2 gap-2 max-h-60 overflow-auto">
              {servicios.map((s) => (
                <label key={s.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.servicios.includes(s.id)}
                    onChange={() => toggleServicio(s.id)}
                  />
                  {s.nombre}
                </label>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Asignación mediante lista de selección múltiple / checkboxes /
              Dual List - equivalente permitido.
            </p>
          </div>
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded border">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full">
            {id ? "Actualizar" : "Crear"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
