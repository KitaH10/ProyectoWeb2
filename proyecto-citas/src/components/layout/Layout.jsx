import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
const menuByRole = {
  Administrador: [
    { label: "Inicio", path: "/" },
    { label: "Servicios", path: "/servicios" },
    { label: "Adicionales", path: "/adicionales" },
    { label: "Empleados", path: "/empleados" },
    { label: "Horarios", path: "/horarios" },
    { label: "Restricciones", path: "/restricciones" },
    { label: "Citas", path: "/citas" },
    { label: "Agenda Diaria", path: "/agenda-diaria" },
    { label: "Perfil", path: "/perfil" },
  ],
  Empleado: [
    { label: "Inicio", path: "/" },
    { label: "Servicios", path: "/servicios" },
    { label: "Adicionales", path: "/adicionales" },
    { label: "Empleados", path: "/empleados" },
    { label: "Horarios", path: "/horarios" },
    { label: "Restricciones", path: "/restricciones" },
    { label: "Citas", path: "/citas" },
    { label: "Mi Agenda", path: "/mi-agenda" },
    { label: "Perfil", path: "/perfil" },
  ],
  Cliente: [
    { label: "Inicio", path: "/" },
    { label: "Servicios", path: "/servicios" },
    { label: "Adicionales", path: "/adicionales" },
    { label: "Horarios", path: "/horarios" },
    { label: "Mis Citas", path: "/citas" },
    { label: "Perfil", path: "/perfil" },
  ],
};
export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const menu = menuByRole[user?.rol] || [];
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r bg-slate-50 p-4 hidden md:flex flex-col">
        <h1 className="font-bold text-lg text-[#0c4a6e] mb-6">
          Citas - {user?.rol}
        </h1>
        <nav className="flex flex-col gap-1 flex-1">
          {menu.map((m) => (
            <Link
              key={m.path}
              to={m.path}
              className={`px-3 py-2 rounded-md text-sm ${location.pathname === m.path ? "bg-[#0c4a6e] text-white" : "hover:bg-slate-200"}`}
            >
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="border-t pt-4">
          <p className="text-xs text-muted-foreground mb-2">
            {user?.nombre}
            <br />
            {user?.email}
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Cerrar sesión
          </Button>
        </div>
      </aside>
      <main className="flex-1 bg-white">
        <div className="border-b p-3 md:hidden flex justify-between items-center">
          <span className="font-bold">Citas</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Salir
          </Button>
        </div>
        <div className="md:hidden p-2 flex gap-2 overflow-x-auto border-b bg-slate-50">
          {menu.map((m) => (
            <Link
              key={m.path}
              to={m.path}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs border ${location.pathname === m.path ? "bg-[#0c4a6e] text-white" : "bg-white"}`}
            >
              {m.label}
            </Link>
          ))}
        </div>
        <div className="p-4 md:p-6">
          <div className="text-xs text-muted-foreground mb-4">
            Inicio / {location.pathname}
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
