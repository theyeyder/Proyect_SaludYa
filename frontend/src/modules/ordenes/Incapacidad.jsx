import React from "react";

export default function Incapacidad() {
  return (
    <div>
      <h1>Incapacidades</h1>
      <form style={{ display: "grid", gap: 10, maxWidth: 650 }}>
        <input placeholder="Paciente ID" />
        <input placeholder="Historia clínica ID" />
        <input placeholder="Días de incapacidad" />
        <input placeholder="Fecha inicio" />
        <input placeholder="Fecha fin" />
        <textarea placeholder="Observaciones" rows="4" />
        <button type="button">Guardar incapacidad</button>
      </form>
    </div>
  );
}
