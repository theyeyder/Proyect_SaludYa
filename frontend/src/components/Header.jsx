import "./header.css";

export default function Header() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  };

  return (
    <header className="header">
      {/* IZQUIERDA */}
      <div className="header-left">
        <div className="logo-box">
          <img src="/img/Logo.png" />
        </div>

        <div className="header-title">
         
          {/* 
          <span className="app-subtitle">
            Sistema clínico y administrativo
          </span> */}
        </div>
      </div>

      {/* DERECHA */}
      <div className="header-right">
        <div className="user-card">
          <div className="user-name">
            {usuario
              ? `${usuario.titulo} ${usuario.nombre} ${usuario.apellido}`
              : "Sin sesión"}
          </div>
          <div className="user-role">{usuario?.nivelAcceso || ""}</div>
        </div>

        {usuario && (
          <button className="logout-btn" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        )}
      </div>
    </header>
  );
}