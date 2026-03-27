import { useState } from "react";
import { login } from "../../api/authApi";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const data = await login(form);
      console.log("Respuesta login:", data);

      if (data?.ok || data?.usuario) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        if (data.usuario) {
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
        } else {
          localStorage.setItem(
            "usuario",
            JSON.stringify({
              titulo: "Admin.",
              nombre: "Usuario",
              apellido: "Sistema",
              nivelAcceso: "Administrador",
            })
          );
        }

        window.location.href = "/";
      } else {
        setMensaje(data?.message || "Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error login:", error);
      setMensaje("Error al iniciar sesión");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>SaludYa</h1>
          <p>Ingreso al sistema clínico</p>
        </div>

        <form className="login-form" onSubmit={iniciarSesion}>
          <label>Usuario</label>
          <input
            type="text"
            name="username"
            placeholder="Ingrese su usuario"
            value={form.username}
            onChange={handleChange}
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit">Iniciar sesión</button>

          {mensaje && <p className="login-error">{mensaje}</p>}
        </form>

        <div className="login-footer">
          <small>
            Los pacientes consultan sus documentos desde el portal externo por
            tipo y número de identificación.
          </small>
        </div>
      </div>
    </div>
  );
}