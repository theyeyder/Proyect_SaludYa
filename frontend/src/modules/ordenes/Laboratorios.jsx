import React from "react";

export default function Laboratorios() {
  return (
    <div>
      <h1>Laboratorios</h1>
      <form style={{ display: "grid", gap: 10, maxWidth: 650 }}>
        <input placeholder="Paciente ID" />
        <input placeholder="Historia clínica ID" />
        <input placeholder="Tipo de examen" />
        <textarea placeholder="Indicaciones" rows="4" />
        <button type="button">Guardar orden de laboratorio</button>
      </form>
    </div>
  );
}
