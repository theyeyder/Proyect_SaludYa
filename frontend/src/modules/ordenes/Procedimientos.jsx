import React from "react";

export default function Procedimientos() {
  return (
    <div>
      <h1>Procedimientos</h1>
      <form style={{ display: "grid", gap: 10, maxWidth: 650 }}>
        <input placeholder="Paciente ID" />
        <input placeholder="Historia clínica ID" />
        <input placeholder="Nombre del procedimiento" />
        <textarea placeholder="Descripción" rows="4" />
        <button type="button">Guardar procedimiento</button>
      </form>
    </div>
  );
}
