import React from "react";

export default function AgendarCita() {
  return (
    <div>
      <h1>Módulo de Citas</h1>
      <p>Agendamiento, cancelación y reprogramación de citas.</p>
      <form style={{ display: "grid", gap: 10, maxWidth: 520 }}>
        <input placeholder="Paciente ID" />
        <input placeholder="Médico ID" />
        <input placeholder="Fecha" />
        <input placeholder="Hora" />
        <input placeholder="Motivo" />
        <button type="button">Agendar cita</button>
      </form>
    </div>
  );
}
