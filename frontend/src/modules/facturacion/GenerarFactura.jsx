import React from "react";

export default function GenerarFactura() {
  return (
    <div>
      <h1>Módulo de Facturación</h1>
      <form style={{ display: "grid", gap: 10, maxWidth: 650 }}>
        <input placeholder="Número de factura" />
        <input placeholder="Paciente ID" />
        <input placeholder="Cita ID" />
        <input placeholder="Concepto" />
        <input placeholder="Valor" />
        <button type="button">Generar factura</button>
      </form>
    </div>
  );
}
