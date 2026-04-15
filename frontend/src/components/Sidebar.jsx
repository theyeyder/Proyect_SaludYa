import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  const rol = usuario?.nivelAcceso;
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState("");

  const puedeVer = {
    configuracion: rol === "Administrador",
    admision: rol === "Administrador" || rol === "Admisión",
    citas: true,
    historiaClinica: rol === "Administrador" || rol === "Médico",
    facturacion: true,
    documentos: true,
  };

  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? "" : menuName));
  };

  const isActive = (path) => location.pathname === path;

  const icon = (name) => (
    <img src={`public/img/icon/${name}.png`} alt={name} />
  );

  return (
    <aside className={`sidebar-pro ${collapsed ? "collapsed" : ""}`}>
      
      <div className="sidebar-top">
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          ☰
        </button>
      </div>

      <nav className="sidebar-nav">

        <Link className={`sidebar-link ${isActive("/") ? "active" : ""}`} to="/">
          <span className="sidebar-icon">{icon("home")}</span>
          {!collapsed && <span>Inicio</span>}
        </Link>

        {puedeVer.configuracion && (
          <Link className="sidebar-link" to="/configuracion">
            <span className="sidebar-icon">{icon("configuracion")}</span>
            {!collapsed && <span>Configuración</span>}
          </Link>
        )}

        {puedeVer.admision && (
          <Link className="sidebar-link" to="/admision">
            <span className="sidebar-icon">{icon("admision")}</span>
            {!collapsed && <span>Admisión</span>}
          </Link>
        )}

        {puedeVer.citas && (
          <Link className="sidebar-link" to="/citas">
            <span className="sidebar-icon">{icon("citas")}</span>
            {!collapsed && <span>Citas</span>}
          </Link>
        )}

        {puedeVer.historiaClinica && (
          <div className="sidebar-group">
            <button
              className="sidebar-link sidebar-button"
              onClick={() => toggleMenu("historia")}
            >
              <span className="sidebar-icon">{icon("historia")}</span>
              {!collapsed && <span>Historia Clínica</span>}
            </button>

            {!collapsed && openMenu === "historia" && (
              <div className="sidebar-submenu">
                <Link to="/historia-clinica" className="sidebar-sublink">
                  Historia
                </Link>
                <Link to="/ordenes/formula-medica" className="sidebar-sublink">
                  Fórmula médica
                </Link>
                <Link to="/ordenes/incapacidades" className="sidebar-sublink">
                  Incapacidades
                </Link>
              </div>
            )}
          </div>
        )}

        {puedeVer.facturacion && (
          <Link className="sidebar-link" to="/facturacion">
            <span className="sidebar-icon">{icon("facturacion")}</span>
            {!collapsed && <span>Facturación</span>}
          </Link>
        )}

        {puedeVer.documentos && (
          <Link className="sidebar-link" to="/consulta-documentos">
            <span className="sidebar-icon">{icon("documentos")}</span>
            {!collapsed && <span>Documentos</span>}
          </Link>
        )}
      </nav>
    </aside>
  );
}