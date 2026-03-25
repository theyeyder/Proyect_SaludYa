import React, { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const iniciarSesion = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        alert(`Bienvenido ${data.usuario.titulo} ${data.usuario.nombre} ${data.usuario.apellido}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Ingreso a SaludYa</h1>
      <p>Acceso exclusivo para usuarios internos del sistema.</p>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 10 }} />
      <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 10 }} />
      <button onClick={iniciarSesion} style={{ padding: "10px 16px" }}>Ingresar</button>
      <p style={{ marginTop: 16, color: "#555" }}>
        Los pacientes no ingresan aquí. La consulta de documentos se realiza desde el portal externo por tipo y número de identificación.
      </p>
    </div>
  );
}
