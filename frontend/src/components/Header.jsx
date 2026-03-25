import React from "react";

export default function Header() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  return (
    <div style={{
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      padding:"12px 20px",
      background:"#ffffff",
      borderBottom:"1px solid #ddd"
    }}>
      <strong>SaludYa</strong>
      <strong>
        {usuario ? `${usuario.titulo} ${usuario.nombre} ${usuario.apellido}` : "Sin sesión"}
      </strong>
    </div>
  );
}
