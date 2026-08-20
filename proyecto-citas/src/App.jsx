import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import ServiciosList from "./pages/ServiciosList";
import ServicioDetail from "./pages/ServicioDetail";
import ServicioForm from "./pages/ServicioForm";
import AdicionalesList from "./pages/AdicionalesList";
import AdicionalForm from "./pages/AdicionalForm";
import EmpleadosList from "./pages/EmpleadosList";
import EmpleadoDetail from "./pages/EmpleadoDetail";
import EmpleadoForm from "./pages/EmpleadoForm";
import HorariosList from "./pages/HorariosList";
import RestriccionesList from "./pages/RestriccionesList";
import RestriccionDetail from "./pages/RestriccionDetail";
import CitasList from "./pages/CitasList";
import CitaDetail from "./pages/CitaDetail";
import CitaForm from "./pages/CitaForm";
import AgendaDiaria from "./pages/AgendaDiaria";
import MiAgenda from "./pages/MiAgenda";
function Protected({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
}
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/perfil"
            element={
              <Protected>
                <Perfil />
              </Protected>
            }
          />
          <Route
            path="/servicios"
            element={
              <Protected>
                <ServiciosList />
              </Protected>
            }
          />
          <Route
            path="/servicios/nuevo"
            element={
              <Protected>
                <ServicioForm />
              </Protected>
            }
          />
          <Route
            path="/servicios/:id"
            element={
              <Protected>
                <ServicioDetail />
              </Protected>
            }
          />
          <Route
            path="/servicios/:id/editar"
            element={
              <Protected>
                <ServicioForm />
              </Protected>
            }
          />
          <Route
            path="/adicionales"
            element={
              <Protected>
                <AdicionalesList />
              </Protected>
            }
          />
          <Route
            path="/adicionales/nuevo"
            element={
              <Protected>
                <AdicionalForm />
              </Protected>
            }
          />
          <Route
            path="/adicionales/:id/editar"
            element={
              <Protected>
                <AdicionalForm />
              </Protected>
            }
          />
          <Route
            path="/empleados"
            element={
              <Protected>
                <EmpleadosList />
              </Protected>
            }
          />
          <Route
            path="/empleados/nuevo"
            element={
              <Protected>
                <EmpleadoForm />
              </Protected>
            }
          />
          <Route
            path="/empleados/:id"
            element={
              <Protected>
                <EmpleadoDetail />
              </Protected>
            }
          />
          <Route
            path="/empleados/:id/editar"
            element={
              <Protected>
                <EmpleadoForm />
              </Protected>
            }
          />
          <Route
            path="/horarios"
            element={
              <Protected>
                <HorariosList />
              </Protected>
            }
          />
          <Route
            path="/restricciones"
            element={
              <Protected>
                <RestriccionesList />
              </Protected>
            }
          />
          <Route
            path="/restricciones/:id"
            element={
              <Protected>
                <RestriccionDetail />
              </Protected>
            }
          />
          <Route
            path="/citas"
            element={
              <Protected>
                <CitasList />
              </Protected>
            }
          />
          <Route
            path="/citas/nueva"
            element={
              <Protected>
                <CitaForm />
              </Protected>
            }
          />
          <Route
            path="/citas/:id"
            element={
              <Protected>
                <CitaDetail />
              </Protected>
            }
          />
          <Route
            path="/citas/:id/editar"
            element={
              <Protected>
                <CitaForm />
              </Protected>
            }
          />
          <Route
            path="/agenda-diaria"
            element={
              <Protected>
                <AgendaDiaria />
              </Protected>
            }
          />
          <Route
            path="/mi-agenda"
            element={
              <Protected>
                <MiAgenda />
              </Protected>
            }
          />
          <Route
            path="*"
            element={
              <div className="p-10 text-center">
                <h1 className="text-3xl font-bold">404 - No encontrada</h1>
                <p className="text-muted-foreground">
                  La página que busca no existe
                </p>
                <a href="/" className="text-primary underline">
                  Volver al inicio
                </a>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
