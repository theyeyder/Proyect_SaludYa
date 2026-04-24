import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";

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
  const isConfigActive = location.pathname.startsWith("/configuracion");

  const icon = (name) => (
    <img src={`/img/icon/${name}.png`} alt={name} />
  );

  return (
    <aside className={`sidebar-pro ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          type="button"
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
          <div className="sidebar-group">
            <button
              className={`sidebar-link sidebar-button ${
                isConfigActive ? "active" : ""
              }`}
              onClick={() => toggleMenu("configuracion")}
              type="button"
            >
              <span className="sidebar-icon">{icon("configuracion")}</span>

              {!collapsed && (
                <>
                  <span>Configuración</span>
                  <span className={`sidebar-arrow ${openMenu === "configuracion" ? "open" : ""}`}>
                    ▾
                  </span>
                </>
              )}
            </button>

            {!collapsed && openMenu === "configuracion" && (
              <div className="sidebar-submenu">
                <Link to="/configuracion" className="sidebar-sublink">
                  <span className="submenu-dot">○</span> Usuario
                </Link>

                <Link to="/configuracion" className="sidebar-sublink">
                  <span className="submenu-dot">○</span> Procedimientos
                </Link>

                <Link to="/configuracion" className="sidebar-sublink">
                  <span className="submenu-dot">○</span> Consultas
                </Link>

                <Link to="/configuracion" className="sidebar-sublink">
                  <span className="submenu-dot">○</span> Laboratorios
                </Link>

                <Link to="/configuracion" className="sidebar-sublink">
                  <span className="submenu-dot">○</span> Medicamentos
                </Link>
              </div>
            )}
          </div>
        )}

        {puedeVer.admision && (
          <Link className={`sidebar-link ${isActive("/admision") ? "active" : ""}`} to="/admision">
            <span className="sidebar-icon">{icon("admision")}</span>
            {!collapsed && <span>Admisión</span>}
          </Link>
        )}

        {puedeVer.citas && (
          <Link className={`sidebar-link ${isActive("/citas") ? "active" : ""}`} to="/citas">
            <span className="sidebar-icon">{icon("citas")}</span>
            {!collapsed && <span>Citas</span>}
          </Link>
        )}

        {puedeVer.historiaClinica && (
          <div className="sidebar-group">
            <button
              className={`sidebar-link sidebar-button ${
                location.pathname.startsWith("/historia-clinica") ||
                location.pathname.startsWith("/ordenes")
                  ? "active"
                  : ""
              }`}
              onClick={() => toggleMenu("historia")}
              type="button"
            >
              <span className="sidebar-icon">{icon("historia")}</span>

              {!collapsed && (
                <>
                  <span>Historia Clínica</span>
                  <span className={`sidebar-arrow ${openMenu === "historia" ? "open" : ""}`}>
                    ▾
                  </span>
                </>
              )}
            </button>

            {!collapsed && openMenu === "historia" && (
              <div className="sidebar-submenu">
                <Link to="/historia-clinica" className="sidebar-sublink">
                  <span className="submenu-dot">○</span> Historia
                </Link>

                <Link to="/ordenes/formula-medica" className="sidebar-sublink">
                  <span className="submenu-dot">○</span> Fórmula médica
                </Link>

                <Link to="/ordenes/incapacidades" className="sidebar-sublink">
                  <span className="submenu-dot">○</span> Incapacidades
                </Link>
              </div>
            )}
          </div>
        )}

        {puedeVer.facturacion && (
          <Link className={`sidebar-link ${isActive("/facturacion") ? "active" : ""}`} to="/facturacion">
            <span className="sidebar-icon">{icon("facturacion")}</span>
            {!collapsed && <span>Facturación</span>}
          </Link>
        )}

        {puedeVer.documentos && (
          <Link
            className={`sidebar-link ${isActive("/consulta-documentos") ? "active" : ""}`}
            to="/consulta-documentos"
          >
            <span className="sidebar-icon">{icon("documentos")}</span>
            {!collapsed && <span>Documentos</span>}
          </Link>
        )}
      </nav>
    </aside>
  );
}