import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
  display: "block",
  padding: "10px 12px",
  textDecoration: "none",
  color: "#fff",
  borderRadius: "8px",
  marginBottom: "6px",
  background: "rgba(255,255,255,0.08)"
};

export default function Sidebar() {
  return (
    <aside style={{ width: 260, background: "#153b50", color: "#fff", padding: 20 }}>
      <h2 style={{ marginTop: 0 }}>SaludYa</h2>
      <Link style={linkStyle} to="/">Inicio</Link>
      <Link style={linkStyle} to="/configuracion">Configuración</Link>
      <Link style={linkStyle} to="/admision">Admisión</Link>
      <Link style={linkStyle} to="/citas">Citas</Link>
      <Link style={linkStyle} to="/historia-clinica">Historia Clínica</Link>
      <Link style={linkStyle} to="/facturacion">Facturación</Link>
      <Link style={linkStyle} to="/consulta-documentos">Consulta Documentos</Link>
    </aside>
  );
}
