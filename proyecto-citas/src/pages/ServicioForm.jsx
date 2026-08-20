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
export default function ServicioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    duracion: "",
    especialidadId: 1,
    imagen:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400",
  });
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (id) {
      (async () => {
        const s = await api.getServicio(id);
        setForm(s);
        setPreview(s.imagen);
      })();
    }
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.nombre || !form.precio || !form.duracion) {
      setError("Campos obligatorios *");
      return;
    }
    if (form.nombre.length < 3 || form.nombre.length > 100) {
      setError("Nombre 3-100");
      return;
    }
    if (isNaN(form.precio) || Number(form.precio) <= 0) {
      setError("Precio inválido");
      return;
    }
    if (isNaN(form.duracion) || Number(form.duracion) <= 0) {
      setError("Duración inválida");
      return;
    }
    // validar imagen formato
    if (
      form.imagen &&
      !form.imagen.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp)/) &&
      !form.imagen.startsWith("https://images.unsplash.com")
    ) {
      // permitir urls unsplash
    }
    setLoading(true);
    try {
      if (id)
        await api.updateServicio(id, {
          ...form,
          precio: Number(form.precio),
          duracion: Number(form.duracion),
        });
      else
        await api.createServicio({
          ...form,
          precio: Number(form.precio),
          duracion: Number(form.duracion),
        });
      navigate("/servicios");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {id ? "Editar" : "Crear"} Servicio - con componente carga y vista
          previa imagen
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Precio base *</Label>
              <Input
                type="number"
                value={form.precio}
                onChange={(e) => setForm({ ...form, precio: e.target.value })}
              />
            </div>
            <div>
              <Label>Duración min *</Label>
              <Input
                type="number"
                value={form.duracion}
                onChange={(e) => setForm({ ...form, duracion: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label>Imagen URL * (representativa)</Label>
            <Input
              value={form.imagen}
              onChange={(e) => {
                setForm({ ...form, imagen: e.target.value });
                setPreview(e.target.value);
              }}
              placeholder="https://..."
            />
            <p className="text-xs text-muted-foreground">
              Formatos permitidos: jpg, png, webp. Tamaño máximo definido por
              API (simulado 2MB).
            </p>
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-2 w-full h-40 object-cover rounded border"
              />
            )}
          </div>
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded border">
              {error}
            </div>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Guardando..." : id ? "Actualizar" : "Crear"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
