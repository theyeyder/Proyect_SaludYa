import React from "react";

export default function RegistrarPaciente() {
  return (
    <div>
      <h1>Módulo de Admisión</h1>
      <p>Registro y consulta de pacientes.</p>
      <form style={{ display: "grid", gap: 10, maxWidth: 520 }}>
        <input placeholder="Tipo de documento" />
        <input placeholder="Número de documento" />
        <input placeholder="Nombre" />
        <input placeholder="Apellido" />
        <input placeholder="Teléfono" />
        <input placeholder="EPS" />
        <button type="button">Guardar paciente</button>
      </form>
    </div>
  );
}
