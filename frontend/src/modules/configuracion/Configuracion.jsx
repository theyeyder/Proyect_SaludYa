import { useState } from "react";
import { crearUsuario } from "../../api/usuariosApi";

export default function Configuracion() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    nombre: "",
    apellido: "",
    sexo: "",
    nivelAcceso: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const guardarUsuario = async () => {
    const data = await crearUsuario(form);
    alert(data.message || "Proceso realizado");
  };

  return (
    <div>
      <h1>Módulo de Configuración</h1>
      <p>Gestión de usuarios internos.</p>

      <div style={{ display: "grid", gap: 10, maxWidth: 500 }}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />

        <select name="sexo" value={form.sexo} onChange={handleChange}>
          <option value="">Seleccione sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>

        <select name="nivelAcceso" value={form.nivelAcceso} onChange={handleChange}>
          <option value="">Seleccione nivel de acceso</option>
          <option value="Administrador">Administrador</option>
          <option value="Admisión">Admisión</option>
          <option value="Médico">Médico</option>
          <option value="Facturación">Facturación</option>
        </select>

        <button onClick={guardarUsuario}>Crear usuario</button>
      </div>
    </div>
  );
}
