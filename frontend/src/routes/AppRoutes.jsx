import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import Login from "../modules/auth/Login";
/*import Home from "../modules/home/home";*/
import Home from "../modules/home/Home";
import RegistrarPaciente from "../modules/admision/RegistrarPaciente";
import Configuracion from "../modules/configuracion/Configuracion";
import AgendarCita from "../modules/citas/AgendarCita";
import HistoriaClinica from "../modules/historiaClinica/HistoriaClinica";

import GenerarFactura from "../modules/facturacion/GenerarFactura";
import ConsultaDocumentos from "../external/consultaDocumentos/ConsultaDocumentos";
import OrdenesMedicas from "../modules/ordenes/OrdenesMedicas";

const wrap = (Component, allowedRoles) => (
  <ProtectedRoute allowedRoles={allowedRoles}>
    <MainLayout>
      <Component />
    </MainLayout>
  </ProtectedRoute>
);

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={wrap(Home, [
            "Administrador",
            "Admisión",
            "Médico",
            "Facturación",
            "Facturador",
          ])}
        />

        <Route
          path="/configuracion/*"
          element={wrap(Configuracion, ["Administrador"])}
        />

        <Route
          path="/admision"
          element={wrap(RegistrarPaciente, ["Administrador", "Admisión"])}
        />

        <Route
          path="/citas"
          element={wrap(AgendarCita, [
            "Administrador",
            "Admisión",
            "Médico",
            "Facturador",
            "Facturación",
          ])}
        />

        <Route
          path="/historia-clinica"
          element={wrap(HistoriaClinica, ["Administrador", "Médico"])}
        />

        <Route
          path="/ordenes-medicas"
          element={wrap(OrdenesMedicas, ["Administrador", "Médico"])}
        />

        <Route
          path="/facturacion"
          element={wrap(GenerarFactura, [
            "Administrador",
            "Facturador",
            "Facturación",
            "Admisión",
          ])}
        />

        <Route path="/consulta-documentos" element={<ConsultaDocumentos />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
