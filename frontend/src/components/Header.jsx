export default function Header() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  };

  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #ddd",
        padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <strong>SaludYa</strong>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: "bold" }}>
            {usuario
              ? `${usuario.titulo} ${usuario.nombre} ${usuario.apellido}`
              : "Sin sesión"}
          </div>
          <div style={{ fontSize: 13, color: "#666" }}>
            {usuario?.nivelAcceso || ""}
          </div>
        </div>

        {usuario && (
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        )}
      </div>
    </header>
  );
}