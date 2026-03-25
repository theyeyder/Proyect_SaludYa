import { Link } from "react-router-dom";

const linkStyle = {
  display: "block",
  padding: "10px 12px",
  color: "#fff",
  background: "rgba(255,255,255,0.08)",
  borderRadius: 8,
  marginBottom: 8,
};

export default function Sidebar() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  const rol = usuario?.nivelAcceso;

  const puedeVer = {
    configuracion: rol === "Administrador",
    admision: rol === "Administrador" || rol === "Admisión",
    citas: rol === "Administrador" || rol === "Admisión" || rol === "Médico",
    historiaClinica: rol === "Administrador" || rol === "Médico",
    facturacion: rol === "Administrador" || rol === "Facturación",
  };

  return (
    <aside
      style={{
        width: 260,
        background: "#0f3d56",
        color: "#fff",
        padding: 20,
        minHeight: "100vh",
      }}
    >
      <h2 style={{ marginTop: 0 }}>SaludYa</h2>

      <Link style={linkStyle} to="/">
        Inicio
      </Link>

      {puedeVer.configuracion && (
        <Link style={linkStyle} to="/configuracion">
          Configuración
        </Link>
      )}

      {puedeVer.admision && (
        <Link style={linkStyle} to="/admision">
          Admisión
        </Link>
      )}

      {puedeVer.citas && (
        <Link style={linkStyle} to="/citas">
          Citas
        </Link>
      )}

      {puedeVer.historiaClinica && (
        <Link style={linkStyle} to="/historia-clinica">
          Historia Clínica
        </Link>
      )}

      {puedeVer.facturacion && (
        <Link style={linkStyle} to="/facturacion">
          Facturación
        </Link>
      )}

      <Link style={linkStyle} to="/consulta-documentos">
        Consulta Documentos
      </Link>
    </aside>
  );
}