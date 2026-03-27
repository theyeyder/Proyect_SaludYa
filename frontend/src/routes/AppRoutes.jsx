import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import Login from "../modules/auth/Login";
import RegistrarPaciente from "../modules/admision/RegistrarPaciente";
import Configuracion from "../modules/configuracion/Configuracion";
import AgendarCita from "../modules/citas/AgendarCita";
import HistoriaClinica from "../modules/historiaClinica/HistoriaClinica";
import FormulaMedica from "../modules/ordenes/FormulaMedica";
import Incapacidad from "../modules/ordenes/Incapacidad";
import Procedimientos from "../modules/ordenes/Procedimientos";
import Laboratorios from "../modules/ordenes/Laboratorios";
import GenerarFactura from "../modules/facturacion/GenerarFactura";
import ConsultaDocumentos from "../external/consultaDocumentos/ConsultaDocumentos";

function Home() {
  return (
    <ProtectedRoute allowedRoles={["Administrador", "Admisión", "Médico", "Facturación", "Facturador"]}>
      <MainLayout>
        <h1>Bienvenido a SaludYa</h1>
        <p>Sistema base para la gestión clínica y administrativa.</p>
      </MainLayout>
    </ProtectedRoute>
  );
}

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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/configuracion"
          element={wrap(Configuracion, ["Administrador"])}
        />

        <Route
          path="/admision"
          element={wrap(RegistrarPaciente, ["Administrador", "Admisión"])}
        />

        <Route
          path="/citas"
          element={wrap(AgendarCita, ["Administrador", "Admisión", "Médico", "Facturador", "Facturación"])}
        />

        <Route
          path="/historia-clinica"
          element={wrap(HistoriaClinica, ["Administrador", "Médico"])}
        />

        <Route
          path="/ordenes/formula-medica"
          element={wrap(FormulaMedica, ["Administrador", "Médico"])}
        />

        <Route
          path="/ordenes/incapacidades"
          element={wrap(Incapacidad, ["Administrador", "Médico"])}
        />

        <Route
          path="/ordenes/procedimientos"
          element={wrap(Procedimientos, ["Administrador", "Médico"])}
        />

        <Route
          path="/ordenes/laboratorios"
          element={wrap(Laboratorios, ["Administrador", "Médico"])}
        />

        <Route
          path="/facturacion"
          element={wrap(GenerarFactura, ["Administrador", "Facturador", "Facturación", "Admisión"])}
        />

        <Route path="/consulta-documentos" element={<ConsultaDocumentos />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}