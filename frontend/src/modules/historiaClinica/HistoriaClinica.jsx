import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HistoriaClinica() {
  const [mostrarOrdenes, setMostrarOrdenes] = useState(false);

  return (
    <div>
      <h1>Módulo de Historia Clínica</h1>
      <p>Registro de diagnóstico, tratamiento y observaciones del paciente.</p>

      <form style={{ display: "grid", gap: 10, maxWidth: 700, marginBottom: 20 }}>
        <input placeholder="Paciente ID" />
        <input placeholder="Cita ID" />
        <input placeholder="Médico ID" />
        <input placeholder="Fecha de consulta" />
        <textarea placeholder="Diagnóstico" rows="3" />
        <textarea placeholder="Tratamiento" rows="3" />
        <textarea placeholder="Observaciones" rows="3" />
        <button type="button">Guardar historia clínica</button>
      </form>

      <button onClick={() => setMostrarOrdenes(!mostrarOrdenes)} style={{ padding: "10px 16px" }}>
        Ordenes
      </button>

      {mostrarOrdenes && (
        <div style={{ display: "grid", gap: 8, marginTop: 14, maxWidth: 300 }}>
          <Link to="/ordenes/formula-medica">Fórmula médica</Link>
          <Link to="/ordenes/incapacidades">Incapacidades</Link>
          <Link to="/ordenes/procedimientos">Procedimientos</Link>
          <Link to="/ordenes/laboratorios">Laboratorios</Link>
        </div>
      )}
    </div>
  );
}
