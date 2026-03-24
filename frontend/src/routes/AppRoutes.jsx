import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../modules/auth/Login";
import Configuracion from "../modules/configuracion/Configuracion";
import RegistrarPaciente from "../modules/admision/RegistrarPaciente";
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
    <MainLayout>
      <h1>Bienvenido a SaludYa</h1>
      <p>Sistema base para la gestión clínica y administrativa.</p>
    </MainLayout>
  );
}

const wrap = (Component) => (
  <MainLayout>
    <Component />
  </MainLayout>
);

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/configuracion" element={wrap(Configuracion)} />
        <Route path="/admision" element={wrap(RegistrarPaciente)} />
        <Route path="/citas" element={wrap(AgendarCita)} />
        <Route path="/historia-clinica" element={wrap(HistoriaClinica)} />
        <Route path="/ordenes/formula-medica" element={wrap(FormulaMedica)} />
        <Route path="/ordenes/incapacidades" element={wrap(Incapacidad)} />
        <Route path="/ordenes/procedimientos" element={wrap(Procedimientos)} />
        <Route path="/ordenes/laboratorios" element={wrap(Laboratorios)} />
        <Route path="/facturacion" element={wrap(GenerarFactura)} />
        <Route path="/consulta-documentos" element={<ConsultaDocumentos />} />
      </Routes>
    </BrowserRouter>
  );
}
