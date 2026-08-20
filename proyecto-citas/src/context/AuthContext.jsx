import { createContext, useState } from "react";
import { api } from "../services/api";
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem("auth_user");
    return s ? JSON.parse(s) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("auth_token"));
  const [loading, setLoading] = useState(false);
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { user: u, token: t } = await api.login(email, password);
      setUser(u);
      setToken(t);
      localStorage.setItem("auth_user", JSON.stringify(u));
      localStorage.setItem("auth_token", t);
      return u;
    } finally {
      setLoading(false);
    }
  };
  const register = async (data) => {
    setLoading(true);
    try {
      const nuevo = await api.register(data);
      return nuevo;
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
  };
  const hasPermission = (modulo, accion) => {
    if (!user) return false;
    if (user.rol === "Administrador") return true;
    const permisos = {
      Empleado: {
        servicios: ["listar", "ver"],
        adicionales: ["listar", "ver"],
        empleados: ["listar", "ver"],
        horarios: ["listar"],
        restricciones: ["listar", "ver"],
        citas: [
          "listar",
          "ver",
          "crear",
          "editar",
          "cancelar",
          "cambiar_estado",
        ],
        agenda_empleado: ["consultar"],
        disponibilidad: ["consultar"],
      },
      Cliente: {
        servicios: ["listar", "ver"],
        adicionales: ["listar", "ver"],
        horarios: ["listar"],
        citas: ["listar", "ver", "cancelar"],
      },
    };
    return permisos[user.rol]?.[modulo]?.includes(accion) || false;
  };
  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, hasPermission }}
    >
      {children}
    </AuthContext.Provider>
  );
}
