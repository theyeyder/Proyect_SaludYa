import React from "react";

export default function Login() {
  return (
    <div style={{ maxWidth: 420, margin: "60px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Ingreso a SaludYa</h1>
      <p>Acceso exclusivo para usuarios internos del sistema.</p>
      <input placeholder="Username" style={{ width: "100%", padding: 10, marginBottom: 10 }} />
      <input placeholder="Password" type="password" style={{ width: "100%", padding: 10, marginBottom: 10 }} />
      <button style={{ padding: "10px 16px" }}>Ingresar</button>
      <p style={{ marginTop: 16, color: "#555" }}>
        Los pacientes no ingresan aquí. La consulta de documentos se realiza desde el portal externo por tipo y número de identificación.
      </p>
    </div>
  );
}
