import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./configuracion.css";

const API_URL = "http://localhost:4000/api/usuarios";
const API_PROCEDIMIENTOS = "http://localhost:4000/api/procedimientos";

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

const initialPasswordForm = {
  passwordAnterior: "",
  nuevaPassword: "",
  repetirPassword: "",
};

const initialProcedimientoForm = {
  codigo: "",
  nombre: "",
  precio: "",
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
  const location = useLocation();

  const obtenerTabDesdeRuta = () => {
    if (location.pathname.includes("procedimientos")) return "procedimientos";
    if (location.pathname.includes("consultas")) return "consultas";
    if (location.pathname.includes("laboratorios")) return "laboratorios";
    if (location.pathname.includes("medicamentos")) return "medicamentos";
    return "usuarios";
  };

  const tabActiva = obtenerTabDesdeRuta();

  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("info");

  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm);
  const [filtro, setFiltro] = useState("");

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [modoEditarDatos, setModoEditarDatos] = useState(false);

  const [procedimientos, setProcedimientos] = useState([]);
  const [procedimientoForm, setProcedimientoForm] = useState(
    initialProcedimientoForm
  );
  const [procedimientoSeleccionado, setProcedimientoSeleccionado] =
    useState(null);
  const [filtroProcedimiento, setFiltroProcedimiento] = useState("");

  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    obtenerUsuarios();
    obtenerProcedimientos();
  }, []);

  useEffect(() => {
    const moverModal = (e) => {
      if (!dragging) return;

      setModalPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const detenerArrastre = () => setDragging(false);

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

  const obtenerProcedimientos = async () => {
    try {
      const res = await fetch(API_PROCEDIMIENTOS);
      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible obtener procedimientos");
        setTipoMensaje("error");
        return;
      }

      setProcedimientos(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error(error);
      setMensaje("Error al obtener procedimientos");
      setTipoMensaje("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProcedimientoChange = (e) => {
    const { name, value } = e.target;

    setProcedimientoForm((prev) => ({
      ...prev,
      [name]: name === "estado" ? value === "true" : value,
    }));
  };

  const limpiarFormulario = () => {
    setForm(initialForm);
    setMensaje("");
    setUsuarioSeleccionado(null);
    setModoEdicion(false);
    setModoEditarDatos(false);
  };

  const limpiarProcedimiento = () => {
    setProcedimientoForm(initialProcedimientoForm);
    setProcedimientoSeleccionado(null);
    setFiltroProcedimiento("");
  };

  const abrirModal = () => {
    setModalPosition({ x: 0, y: 0 });
    setShowModal(true);
  };

  const abrirPasswordModal = () => {
    setPasswordForm(initialPasswordForm);
    setShowPasswordModal(true);
  };

  const iniciarArrastre = (e) => {
    if (e.target.closest(".close-btn")) return;

    setDragging(true);
    setDragOffset({
      x: e.clientX - modalPosition.x,
      y: e.clientY - modalPosition.y,
    });
  };

  const seleccionarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModoEdicion(true);
    setModoEditarDatos(false);

    setForm({
      username: usuario.username || "",
      correo: usuario.correo || "",
      telefono: usuario.telefono || "",
      nombre: usuario.nombre || "",
      apellido: usuario.apellido || "",
      password: "",
      repetirPassword: "",
      sexo: usuario.sexo || "M",
      nivelAcceso: usuario.nivelAcceso || "Admisión",
      estado: usuario.estado ?? true,
    });

    setShowModal(false);
    setMensaje("Usuario cargado correctamente");
    setTipoMensaje("info");
  };

  const seleccionarProcedimiento = (procedimiento) => {
    setProcedimientoSeleccionado(procedimiento);

    setProcedimientoForm({
      codigo: procedimiento.codigo || "",
      nombre: procedimiento.nombre || "",
      precio: procedimiento.precio || "",
      estado: procedimiento.estado ?? true,
    });

    setMensaje("Procedimiento cargado correctamente");
    setTipoMensaje("info");
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

  const guardarProcedimiento = async () => {
    try {
      setMensaje("");

      if (
        !procedimientoForm.codigo.trim() ||
        !procedimientoForm.nombre.trim() ||
        procedimientoForm.precio === ""
      ) {
        setMensaje("Complete código, nombre y precio del procedimiento");
        setTipoMensaje("error");
        return;
      }

      const payload = {
        ...procedimientoForm,
        codigo: procedimientoForm.codigo.trim(),
        nombre: procedimientoForm.nombre.trim(),
        precio: Number(procedimientoForm.precio),
      };

      const url = procedimientoSeleccionado?._id
        ? `${API_PROCEDIMIENTOS}/${procedimientoSeleccionado._id}`
        : API_PROCEDIMIENTOS;

      const method = procedimientoSeleccionado?._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible guardar el procedimiento");
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        procedimientoSeleccionado?._id
          ? "Procedimiento actualizado correctamente"
          : "Procedimiento creado correctamente"
      );

      setTipoMensaje("success");
      limpiarProcedimiento();
      obtenerProcedimientos();
    } catch (error) {
      console.error(error);
      setMensaje("Error al guardar procedimiento");
      setTipoMensaje("error");
    }
  };

  const guardarCambioPassword = async () => {
    if (!usuarioSeleccionado?._id) return;

    if (
      !passwordForm.passwordAnterior.trim() ||
      !passwordForm.nuevaPassword.trim() ||
      !passwordForm.repetirPassword.trim()
    ) {
      setMensaje("Complete todos los campos de contraseña");
      setTipoMensaje("error");
      return;
    }

    if (passwordForm.nuevaPassword !== passwordForm.repetirPassword) {
      setMensaje("La nueva contraseña no coincide");
      setTipoMensaje("error");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${usuarioSeleccionado._id}/password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passwordAnterior: passwordForm.passwordAnterior,
          password: passwordForm.nuevaPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible cambiar la contraseña");
        setTipoMensaje("error");
        return;
      }

      setMensaje("Contraseña actualizada correctamente");
      setTipoMensaje("success");
      setPasswordForm(initialPasswordForm);
      setShowPasswordModal(false);
    } catch (error) {
      console.error(error);
      setMensaje("Error al cambiar contraseña");
      setTipoMensaje("error");
    }
  };

  const resetPasswordUsuario = async () => {
    try {
      if (!usuarioSeleccionado?._id) {
        setMensaje("Seleccione un usuario");
        setTipoMensaje("error");
        return;
      }

      const confirmar = window.confirm(
        "¿Desea restablecer la contraseña del usuario a 123?"
      );

      if (!confirmar) return;

      const res = await fetch(
        `${API_URL}/${usuarioSeleccionado._id}/reset-password`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible restablecer la contraseña");
        setTipoMensaje("error");
        return;
      }

      setMensaje("Contraseña restablecida correctamente. Nueva contraseña: 123");
      setTipoMensaje("success");
    } catch (error) {
      console.error(error);
      setMensaje("Error al restablecer contraseña");
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

      if (usuarioSeleccionado?._id === id) {
        setUsuarioSeleccionado(data.data);
        setForm((prev) => ({
          ...prev,
          estado: data.data.estado,
        }));
      }

      obtenerUsuarios();
    } catch (error) {
      console.error(error);
      setMensaje("Error al cambiar estado");
      setTipoMensaje("error");
    }
  };

  const usuariosFiltrados = usuarios.filter((u) => {
    const texto = `${u.username} ${u.nombre} ${u.apellido} ${u.correo}`.toLowerCase();
    return texto.includes(filtro.toLowerCase());
  });

  const procedimientosFiltrados = procedimientos.filter((p) => {
    const texto = `${p.codigo} ${p.nombre} ${p.precio}`.toLowerCase();
    return texto.includes(filtroProcedimiento.toLowerCase());
  });

  return (
    <div className="configuracion-page">
      {mensaje && (
        <div className={`config-alert config-alert--${tipoMensaje}`}>
          {mensaje}
        </div>
      )}

      {tabActiva === "usuarios" && (
        <section className="config-card usuario-card">
          <div className="usuario-title-bar">
            <span className="usuario-title-icon">
              <IconImg name="usuario" alt="Usuario" />
            </span>

            <h2>{modoEdicion ? "Usuario seleccionado" : "Crear Usuarios"}</h2>

            <div className="usuario-title-actions">
              {modoEdicion && usuarioSeleccionado && (
                <>
                  <button
                    type="button"
                    onClick={() => setModoEditarDatos(true)}
                    title="Editar usuario"
                  >
                    <IconImg name="editar" alt="Editar" />
                  </button>

                  <button
                    type="button"
                    onClick={abrirPasswordModal}
                    title="Cambiar contraseña"
                  >
                    <IconImg name="password" alt="Cambiar contraseña" />
                  </button>

                  <button
                    type="button"
                    onClick={() => cambiarEstado(usuarioSeleccionado._id)}
                    title={
                      usuarioSeleccionado.estado
                        ? "Bloquear usuario"
                        : "Desbloquear usuario"
                    }
                  >
                    {usuarioSeleccionado.estado ? (
                      <IconImg name="bloquear" alt="Bloquear" />
                    ) : (
                      <IconImg name="desbloquear" alt="Desbloquear" />
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn-reset-password"
                    onClick={resetPasswordUsuario}
                    title="Reset Password"
                  >
                    <IconImg name="reset-password" alt="Reset Password" />
                  </button>
                </>
              )}

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
              disabled={modoEdicion && !modoEditarDatos}
            />
          </div>

          <div className="usuario-form-line">
            <label>Nombres</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombres"
              disabled={modoEdicion && !modoEditarDatos}
            />
          </div>

          <div className="usuario-form-line">
            <label>Apellidos</label>
            <input
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              placeholder="Apellidos"
              disabled={modoEdicion && !modoEditarDatos}
            />
          </div>

          <div className="usuario-form-line">
            <label>Teléfono</label>
            <input
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Teléfono"
              disabled={modoEdicion && !modoEditarDatos}
            />
          </div>

          <div className="usuario-form-line">
            <label>Nombre Usuario</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Usuario"
              disabled={modoEdicion && !modoEditarDatos}
            />
          </div>

          <div className="usuario-form-line">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={
                modoEdicion
                  ? "Se cambia desde el botón de contraseña"
                  : "Contraseña"
              }
              disabled={modoEdicion}
            />
          </div>

          <div className="usuario-form-line">
            <label>Repetir Password</label>
            <input
              type="password"
              name="repetirPassword"
              value={form.repetirPassword}
              onChange={handleChange}
              placeholder={
                modoEdicion
                  ? "Se cambia desde el botón de contraseña"
                  : "Repetir contraseña"
              }
              disabled={modoEdicion}
            />
          </div>

          <div className="usuario-form-line">
            <label>Sexo</label>
            <select
              name="sexo"
              value={form.sexo}
              onChange={handleChange}
              disabled={modoEdicion && !modoEditarDatos}
            >
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
              disabled={modoEdicion && !modoEditarDatos}
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
              disabled={modoEdicion}
            >
              <option value="true">Activa</option>
              <option value="false">Desactivada</option>
            </select>
          </div>
        </section>
      )}

      {tabActiva === "procedimientos" && (
        <section className="config-card">
          <div className="usuario-title-bar">
            <span className="usuario-title-icon">
              <IconImg name="procedimiento" alt="Procedimien" />
            </span>

            <h2>
              {procedimientoSeleccionado
                ? "Procedimiento seleccionado"
                : "Crear Procedimiento"}
            </h2>

            <div className="usuario-title-actions">
              <button
                type="button"
                onClick={limpiarProcedimiento}
                title="Nuevo procedimiento"
              >
                <IconImg name="nuevo" alt="Nuevo" />
              </button>

              <button
                type="button"
                onClick={guardarProcedimiento}
                title="Guardar procedimiento"
              >
                <IconImg name="guardar" alt="Guardar" />
              </button>
            </div>
          </div>

          <div className="config-form-grid">
            <div className="config-field">
              <label>Código</label>
              <input
                type="text"
                name="codigo"
                value={procedimientoForm.codigo}
                onChange={handleProcedimientoChange}
                placeholder="Ej: PROC001"
              />
            </div>

            <div className="config-field">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={procedimientoForm.nombre}
                onChange={handleProcedimientoChange}
                placeholder="Nombre del procedimiento"
              />
            </div>

            <div className="config-field">
              <label>Precio</label>
              <input
                type="number"
                name="precio"
                value={procedimientoForm.precio}
                onChange={handleProcedimientoChange}
                placeholder="Precio"
              />
            </div>

            <div className="config-field">
              <label>Estado</label>
              <select
                name="estado"
                value={procedimientoForm.estado ? "true" : "false"}
                onChange={handleProcedimientoChange}
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="modal-search">
            <select>
              <option>Nombre</option>
              <option>Código</option>
              <option>Precio</option>
            </select>

            <input
              placeholder="Buscar procedimiento..."
              value={filtroProcedimiento}
              onChange={(e) => setFiltroProcedimiento(e.target.value)}
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
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Seleccionar</th>
                </tr>
              </thead>

              <tbody>
                {procedimientosFiltrados.length > 0 ? (
                  procedimientosFiltrados.map((p) => (
                    <tr
                      key={p._id}
                      className="modal-row-select"
                      onClick={() => seleccionarProcedimiento(p)}
                    >
                      <td>{p.codigo}</td>
                      <td>{p.nombre}</td>
                      <td>${Number(p.precio || 0).toLocaleString("es-CO")}</td>
                      <td>{p.estado ? "Activo" : "Inactivo"}</td>
                      <td>Seleccionar</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No hay procedimientos registrados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tabActiva === "laboratorios" && (
        <section className="config-card">
          <div className="config-card-header">
            <h2>Laboratorios</h2>
            <span>Este catálogo será desarrollado en el siguiente paso.</span>
          </div>
        </section>
      )}

      {tabActiva === "medicamentos" && (
        <section className="config-card">
          <div className="config-card-header">
            <h2>Medicamentos</h2>
            <span>Este catálogo será desarrollado en el siguiente paso.</span>
          </div>
        </section>
      )}

      {tabActiva === "consultas" && (
        <section className="config-card">
          <div className="config-card-header">
            <h2>Tipos de consulta</h2>
            <span>Este catálogo será desarrollado en el siguiente paso.</span>
          </div>
        </section>
      )}

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
                <option>Username</option>
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
                    <th>Seleccionar</th>
                  </tr>
                </thead>

                <tbody>
                  {usuariosFiltrados.length > 0 ? (
                    usuariosFiltrados.map((u) => (
                      <tr
                        key={u._id}
                        className="modal-row-select"
                        onClick={() => seleccionarUsuario(u)}
                      >
                        <td>{u.username}</td>
                        <td>
                          {u.nombre} {u.apellido}
                        </td>
                        <td>{u.correo || "-"}</td>
                        <td>{u.nivelAcceso}</td>
                        <td>{u.estado ? "Activo" : "Bloqueado"}</td>
                        <td>Seleccionar</td>
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

      {showPasswordModal && (
        <div className="password-modal-overlay">
          <div className="password-modal">
            <div className="password-modal-header">
              <h3>Cambiar contraseña</h3>

              <button
                type="button"
                className="close-btn"
                onClick={() => setShowPasswordModal(false)}
                title="Cerrar"
              >
                <IconImg name="cerrar" alt="Cerrar" />
              </button>
            </div>

            <div className="password-modal-body">
              <div className="usuario-form-line">
                <label>Contraseña antigua</label>
                <input
                  type="password"
                  name="passwordAnterior"
                  value={passwordForm.passwordAnterior}
                  onChange={handlePasswordChange}
                  placeholder="Contraseña antigua"
                />
              </div>

              <div className="usuario-form-line">
                <label>Nueva contraseña</label>
                <input
                  type="password"
                  name="nuevaPassword"
                  value={passwordForm.nuevaPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nueva contraseña"
                />
              </div>

              <div className="usuario-form-line">
                <label>Repetir contraseña</label>
                <input
                  type="password"
                  name="repetirPassword"
                  value={passwordForm.repetirPassword}
                  onChange={handlePasswordChange}
                  placeholder="Repetir contraseña"
                />
              </div>
            </div>

            <div className="password-modal-actions">
              <button
                type="button"
                className="usuario-action-icon-btn"
                onClick={guardarCambioPassword}
                title="Guardar"
              >
                <IconImg name="guardar" alt="Guardar" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}