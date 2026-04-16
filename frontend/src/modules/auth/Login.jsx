import { useState, useEffect } from "react";
import { login } from "../../api/authApi";
import "./Login.css";

export default function Login() {
  // Estados
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [recordar, setRecordar] = useState(false);

  // Cargar usuario recordado
  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberedUsername");
    if (savedUsername) {
      setForm((prev) => ({ ...prev, username: savedUsername }));
      setRecordar(true);
    }
  }, []);

  // Manejar cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (mensaje) setMensaje("");
  };

  // Validación
  const validarFormulario = () => {
    if (!form.username.trim()) {
      setMensaje("Por favor ingrese el usuario");
      return false;
    }
    if (!form.password.trim()) {
      setMensaje("Por favor ingrese la contraseña");
      return false;
    }
    return true;
  };

  // Login
  const iniciarSesion = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setCargando(true);
    setMensaje("");

    try {
      const data = await login(form);

      if (data.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        if (recordar) {
          localStorage.setItem("rememberedUsername", form.username);
        } else {
          localStorage.removeItem("rememberedUsername");
        }

        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else {
        setMensaje(data.mensaje || "Credenciales incorrectas");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-card">
          {/* LOADING */}
          {cargando && (
            <div className="login-loading">
              <div className="spinner"></div>
            </div>
          )}

          {/* LOGO */}
          <div className="login-logo-container">
            <img src="/img/Logo.png" alt="SaludYa" />

            <p>Ingrese sus credenciales</p>
          </div>

          {/* FORM */}
          <form onSubmit={iniciarSesion} className="login-form">
            {/* USUARIO */}
            <div className="login-field">
              <label>
                <span className="field-icon">
                  <img src="/img/icon/user.png" alt="usuario" />
                </span>
                Usuario
              </label>

              <input
                type="text"
                name="username"
                placeholder="Ingresar usuario"
                value={form.username}
                onChange={handleChange}
                disabled={cargando}
              />
            </div>

            {/* CONTRASEÑA */}
            <div className="login-field">
              <label>
                <span className="field-icon">
                  <img src="/img/icon/lock.png" alt="contraseña" />
                </span>
                Contraseña
              </label>

              <div className="password-wrapper">
                <input
                  type={mostrarPassword ? "text" : "password"}
                  name="password"
                  placeholder="Escribir Contraseña"
                  value={form.password}
                  onChange={handleChange}
                  disabled={cargando}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                >
                  <img
                    src={
                      mostrarPassword
                        ? "/img/icon/eye-off.png"
                        : "/img/icon/eye.png"
                    }
                    alt="ver contraseña"
                  />
                </button>
              </div>
            </div>

            {/* RECORDAR USUARIO */}
            <div className="login-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={recordar}
                  onChange={(e) => setRecordar(e.target.checked)}
                  disabled={cargando}
                />
                <span>Recordar usuario</span>
              </label>
            </div>

            {/* ERROR */}
            {mensaje && (
              <div className="login-error">
                <span className="error-icon">⚠️</span>
                {mensaje}
              </div>
            )}

            {/* BOTÓN */}
            <button className="login-button" type="submit" disabled={cargando}>
              {cargando ? "Verificando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}