import { useEffect, useState } from "react";
import "./configuracion.css";

const API_URL = "http://localhost:4000/api/usuarios";

const initialForm = {
  username: "",
  correo: "",
  telefono: "",
  nombre: "",
  apellido: "",
  password: "",
  repetirPassword: "",
  sexo: "M",
  nivelAcceso: "Admisión",
  estado: true,
};

const IconImg = ({ name, alt }) => (
  <img
    src={`/img/icon/${name}.png`}
    alt={alt || name}
    className="usuario-icon-img"
  />
);

export default function Configuracion() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("info");
  const [showModal, setShowModal] = useState(false);
  const [filtro, setFiltro] = useState("");

  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  useEffect(() => {
    const moverModal = (e) => {
      if (!dragging) return;

      setModalPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const detenerArrastre = () => {
      setDragging(false);
    };

    window.addEventListener("mousemove", moverModal);
    window.addEventListener("mouseup", detenerArrastre);

    return () => {
      window.removeEventListener("mousemove", moverModal);
      window.removeEventListener("mouseup", detenerArrastre);
    };
  }, [dragging, dragOffset]);

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible obtener usuarios");
        setTipoMensaje("error");
        return;
      }

      setUsuarios(data.data || []);
    } catch (error) {
      console.error(error);
      setMensaje("Error al obtener usuarios");
      setTipoMensaje("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const limpiarFormulario = () => {
    setForm(initialForm);
    setMensaje("");
  };

  const abrirModal = () => {
    setModalPosition({ x: 0, y: 0 });
    setShowModal(true);
  };

  const iniciarArrastre = (e) => {
    if (e.target.closest(".close-btn")) return;

    setDragging(true);
    setDragOffset({
      x: e.clientX - modalPosition.x,
      y: e.clientY - modalPosition.y,
    });
  };

  const crearUsuario = async () => {
    try {
      setMensaje("");

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible crear el usuario");
        setTipoMensaje("error");
        return;
      }

      setMensaje("Usuario creado correctamente");
      setTipoMensaje("success");
      limpiarFormulario();
      obtenerUsuarios();
    } catch (error) {
      console.error(error);
      setMensaje("Error al crear usuario");
      setTipoMensaje("error");
    }
  };

  const cambiarEstado = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/estado`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible cambiar el estado");
        setTipoMensaje("error");
        return;
      }

      setMensaje(data.message);
      setTipoMensaje("success");
      obtenerUsuarios();
    } catch (error) {
      console.error(error);
      setMensaje("Error al cambiar estado");
      setTipoMensaje("error");
    }
  };

  const cambiarPassword = async (id) => {
    const nueva = prompt("Ingrese la nueva contraseña:");
    if (!nueva || !nueva.trim()) return;

    try {
      const res = await fetch(`${API_URL}/${id}/password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: nueva }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible cambiar la contraseña");
        setTipoMensaje("error");
        return;
      }

      setMensaje("Contraseña actualizada correctamente");
      setTipoMensaje("success");
    } catch (error) {
      console.error(error);
      setMensaje("Error al cambiar contraseña");
      setTipoMensaje("error");
    }
  };

  const usuariosFiltrados = usuarios.filter((u) => {
    const texto = `${u.username} ${u.nombre} ${u.apellido} ${u.correo}`.toLowerCase();
    return texto.includes(filtro.toLowerCase());
  });

  return (
    <div className="configuracion-page">
      <div className="configuracion-header">
        
      </div>

      {mensaje && (
        <div className={`config-alert config-alert--${tipoMensaje}`}>
          {mensaje}
        </div>
      )}

      <section className="config-card usuario-card">
        <div className="usuario-title-bar">
          <span className="usuario-title-icon">
            <IconImg name="Crear Usuarios" alt="Usuario" />
          </span>

          <h2>Crear Usuarios</h2>

          <div className="usuario-title-actions">
            <button type="button" onClick={limpiarFormulario} title="Nuevo">
              <IconImg name="nuevo" alt="Nuevo" />
            </button>

            <button type="button" onClick={crearUsuario} title="Guardar">
              <IconImg name="guardar" alt="Guardar" />
            </button>

            <button type="button" onClick={abrirModal} title="Buscar usuario">
              <IconImg name="buscar" alt="Buscar" />
            </button>
          </div>
        </div>

        <div className="usuario-form-line">
          <label>Correo</label>
          <input
            name="correo"
            value={form.correo}
            onChange={handleChange}
            placeholder="correo@saludya.com"
          />
        </div>

        <div className="usuario-form-line">
          <label>Nombres</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombres"
          />
        </div>

        <div className="usuario-form-line">
          <label>Apellidos</label>
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            placeholder="Apellidos"
          />
        </div>

        <div className="usuario-form-line">
          <label>Teléfono</label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
          />
        </div>

        <div className="usuario-form-line">
          <label>Nombre Usuario</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Usuario"
          />
        </div>

        <div className="usuario-form-line">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña"
          />
        </div>

        <div className="usuario-form-line">
          <label>Repetir Password</label>
          <input
            type="password"
            name="repetirPassword"
            value={form.repetirPassword}
            onChange={handleChange}
            placeholder="Repetir contraseña"
          />
        </div>

        <div className="usuario-form-line">
          <label>Sexo</label>
          <select name="sexo" value={form.sexo} onChange={handleChange}>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>

        <div className="usuario-form-line">
          <label>Rol</label>
          <select
            name="nivelAcceso"
            value={form.nivelAcceso}
            onChange={handleChange}
          >
            <option value="Administrador">Administrador</option>
            <option value="Admisión">Admisión</option>
            <option value="Médico">Médico</option>
            <option value="Facturación">Facturación</option>
          </select>
        </div>

        <div className="usuario-form-line">
          <label>Estado de la Cuenta</label>
          <select
            value={form.estado ? "true" : "false"}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                estado: e.target.value === "true",
              }))
            }
          >
            <option value="true">Activa</option>
            <option value="false">Desactivada</option>
          </select>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            style={{
              left: `calc(50% + ${modalPosition.x}px)`,
              top: `calc(50% + ${modalPosition.y}px)`,
            }}
          >
            <div
              className="modal-header modal-header-draggable"
              onMouseDown={iniciarArrastre}
            >
              <h3>Usuarios</h3>

              <button
                type="button"
                className="close-btn"
                onClick={() => setShowModal(false)}
                title="Cerrar"
              >
                <IconImg name="cerrar" alt="Cerrar" />
              </button>
            </div>

            <div className="modal-search">
              <select>
                <option>Nombre</option>
                <option>Usuario</option>
                <option>Correo</option>
              </select>

              <input
                placeholder="Buscar..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />

              <button type="button" className="config-btn config-btn--secondary">
                <IconImg name="buscar" alt="Buscar" />
                BUSCAR
              </button>
            </div>

            <div className="modal-table">
              <table>
                <thead>
                  <tr>
                    <th>UserName</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {usuariosFiltrados.length > 0 ? (
                    usuariosFiltrados.map((u) => (
                      <tr key={u._id}>
                        <td>{u.username}</td>
                        <td>
                          {u.nombre} {u.apellido}
                        </td>
                        <td>{u.correo || "-"}</td>
                        <td>{u.nivelAcceso}</td>
                        <td>{u.estado ? "Activo" : "Bloqueado"}</td>
                        <td>
                          <button
                            type="button"
                            className="config-btn config-btn--small"
                            onClick={() => cambiarEstado(u._id)}
                          >
                            {u.estado ? "Bloquear" : "Activar"}
                          </button>

                          <button
                            type="button"
                            className="config-btn config-btn--small config-btn--secondary"
                            onClick={() => cambiarPassword(u._id)}
                          >
                            Password
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No hay usuarios registrados</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}