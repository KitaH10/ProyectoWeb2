import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Input, Label, Textarea } from "../components/ui/input";
import { Button } from "../components/ui/button";
export default function AdicionalForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", descripcion: "", precio: "" });
  const [error, setError] = useState("");
  useEffect(() => {
    if (id) {
      (async () => {
        const list = await api.getAdicionales();
        const ad = list.find((x) => x.id === Number(id));
        if (ad) setForm(ad);
      })();
    }
  }, [id]);
  const submit = async (e) => {
    e.preventDefault();
    if (!form.nombre || form.precio === "") {
      setError("Campos obligatorios *");
      return;
    }
    try {
      if (id)
        await api.updateAdicional(id, { ...form, precio: Number(form.precio) });
      else await api.createAdicional({ ...form, precio: Number(form.precio) });
      navigate("/adicionales");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? "Editar" : "Crear"} Adicional</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4 max-w-lg">
          <div>
            <Label>Nombre *</Label>
            <Input
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
          </div>
          <div>
            <Label>Descripción *</Label>
            <Textarea
              value={form.descripcion}
              onChange={(e) =>
                setForm({ ...form, descripcion: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Precio *</Label>
            <Input
              type="number"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: e.target.value })}
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
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
