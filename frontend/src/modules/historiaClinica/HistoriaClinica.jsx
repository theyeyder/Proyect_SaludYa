import { useState } from "react";
import { Link } from "react-router-dom";

export default function HistoriaClinica() {
  const [mostrarOrdenes, setMostrarOrdenes] = useState(false);

  return (
    <div>
      <h1>Módulo de Historia Clínica</h1>
      <p>Registro clínico del paciente.</p>

      <button onClick={() => setMostrarOrdenes(!mostrarOrdenes)}>
        Ordenes
      </button>

      {mostrarOrdenes && (
        <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
          <Link to="/ordenes/formula-medica">Fórmula médica</Link>
          <Link to="/ordenes/incapacidades">Incapacidades</Link>
          <Link to="/ordenes/procedimientos">Procedimientos</Link>
          <Link to="/ordenes/laboratorios">Laboratorios</Link>
        </div>
      )}
    </div>
  );
}
