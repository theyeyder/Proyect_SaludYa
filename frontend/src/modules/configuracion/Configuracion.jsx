import React from "react";

export default function Configuracion() {
  return (
    <div>
      <h1>Módulo de Configuración</h1>
      <p>Gestión de usuarios internos, contraseñas y niveles de acceso del sistema.</p>

      <form style={{ display: "grid", gap: 10, maxWidth: 520 }}>
        <input placeholder="Username" />
        <input placeholder="Password" type="password" />
        <input placeholder="Nombre" />
        <input placeholder="Apellido" />
        <select defaultValue="">
          <option value="" disabled>Seleccione sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
        <select defaultValue="">
          <option value="" disabled>Seleccione nivel de acceso</option>
          <option>Administrador</option>
          <option>Admisión</option>
          <option>Médico</option>
          <option>Facturación</option>
        </select>
        <button type="button">Crear usuario</button>
      </form>
    </div>
  );
}
