import React from "react";

export default function FormulaMedica() {
  return (
    <div>
      <h1>Fórmula Médica</h1>
      <form style={{ display: "grid", gap: 10, maxWidth: 650 }}>
        <input placeholder="Paciente ID" />
        <input placeholder="Historia clínica ID" />
        <input placeholder="Medicamento" />
        <input placeholder="Dosis" />
        <textarea placeholder="Indicaciones" rows="4" />
        <button type="button">Guardar fórmula</button>
      </form>
    </div>
  );
}
