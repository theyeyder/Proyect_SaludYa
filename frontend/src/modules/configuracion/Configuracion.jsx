<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./configuracion.css";

const API_URL = "https://proyect-saludya-backend.onrender.com/api/usuarios";
const API_PROCEDIMIENTOS = "https://proyect-saludya-backend.onrender.com/api/procedimientos";
const API_TIPOS_CONSULTA = "https://proyect-saludya-backend.onrender.com/api/tipos-consulta";
const API_LABORATORIOS = "https://proyect-saludya-backend.onrender.com/api/laboratorios";
const API_MEDICAMENTOS = "https://proyect-saludya-backend.onrender.com/api/medicamentos";

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

const initialConsultaForm = {
  codigo: "",
  nombre: "",
  precio: "",
  estado: true,
};

const initialLaboratorioForm = {
  codigo: "",
  nombre: "",
  precio: "",
  estado: true,
};

const initialMedicamentoForm = {
  codigo: "",
  nombre: "",
  concentracion: "",
  presentacion: "",
  cantidad: "",
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
    initialProcedimientoForm,
  );
  const [procedimientoSeleccionado, setProcedimientoSeleccionado] =
    useState(null);
  const [filtroProcedimiento, setFiltroProcedimiento] = useState("");

  const [consultas, setConsultas] = useState([]);
  const [consultaForm, setConsultaForm] = useState(initialConsultaForm);
  const [consultaSeleccionada, setConsultaSeleccionada] = useState(null);
  const [filtroConsulta, setFiltroConsulta] = useState("");

  const [laboratorios, setLaboratorios] = useState([]);
  const [laboratorioForm, setLaboratorioForm] = useState(
    initialLaboratorioForm,
  );
  const [laboratorioSeleccionado, setLaboratorioSeleccionado] = useState(null);
  const [filtroLaboratorio, setFiltroLaboratorio] = useState("");

  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [medicamentos, setMedicamentos] = useState([]);
  const [medicamentoForm, setMedicamentoForm] = useState(
    initialMedicamentoForm,
  );
  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);
  const [filtroMedicamento, setFiltroMedicamento] = useState("");

  useEffect(() => {
    obtenerUsuarios();
    obtenerProcedimientos();
    obtenerConsultas();
    obtenerLaboratorios();
    obtenerMedicamentos();
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

  const obtenerConsultas = async () => {
    try {
      const res = await fetch(API_TIPOS_CONSULTA);
      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible obtener tipos de consulta");
        setTipoMensaje("error");
        return;
      }

      setConsultas(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error(error);
      setMensaje("Error al obtener tipos de consulta");
      setTipoMensaje("error");
    }
  };

  const obtenerLaboratorios = async () => {
    try {
      const res = await fetch(API_LABORATORIOS);
      const data = await res.json();

      setLaboratorios(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerMedicamentos = async () => {
    try {
      const res = await fetch(API_MEDICAMENTOS);
      const data = await res.json();

      setMedicamentos(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error(error);
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

  const limpiarFormulario = () => {
    setForm(initialForm);
    setMensaje("");
    setUsuarioSeleccionado(null);
    setModoEdicion(false);
    setModoEditarDatos(false);
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
    const actualizarUsuario = async () => {
      try {
        if (!usuarioSeleccionado?._id) {
          setMensaje("Seleccione un usuario");
          setTipoMensaje("error");
          return;
        }

        const res = await fetch(`${API_URL}/${usuarioSeleccionado._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: form.username,
            correo: form.correo,
            telefono: form.telefono,
            nombre: form.nombre,
            apellido: form.apellido,
            sexo: form.sexo,
            nivelAcceso: form.nivelAcceso,
            estado: form.estado,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setMensaje(data.message || "No fue posible actualizar el usuario");
          setTipoMensaje("error");
          return;
        }

        setMensaje("Usuario actualizado correctamente");
        setTipoMensaje("success");

        setUsuarioSeleccionado(data.data);

        obtenerUsuarios();

        setModoEditarDatos(false);
      } catch (error) {
        console.error(error);

        setMensaje("Error al actualizar usuario");
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
      const res = await fetch(
        `${API_URL}/${usuarioSeleccionado._id}/password`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            passwordAnterior: passwordForm.passwordAnterior,
            password: passwordForm.nuevaPassword,
          }),
        },
      );

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
        "¿Desea restablecer la contraseña del usuario a 123?",
      );

      if (!confirmar) return;

      const res = await fetch(
        `${API_URL}/${usuarioSeleccionado._id}/reset-password`,
        {
          method: "PATCH",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible restablecer la contraseña");
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        "Contraseña restablecida correctamente. Nueva contraseña: 123",
      );
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

  const handleProcedimientoChange = (e) => {
    const { name, value } = e.target;

    setProcedimientoForm((prev) => ({
      ...prev,
      [name]: name === "estado" ? value === "true" : value,
    }));
  };

  const limpiarProcedimiento = () => {
    setProcedimientoForm(initialProcedimientoForm);
    setProcedimientoSeleccionado(null);
    setFiltroProcedimiento("");
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

  const guardarProcedimiento = async () => {
    try {
      setMensaje("");

      if (
        !procedimientoForm.codigo.trim() ||
        !procedimientoForm.nombre.trim() ||
        procedimientoForm.precio === ""
      ) {
        setMensaje("Complete código, nombre y precio");
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
          : "Procedimiento creado correctamente",
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

  const cambiarEstadoProcedimiento = async (procedimiento) => {
    try {
      const res = await fetch(
        `${API_PROCEDIMIENTOS}/${procedimiento._id}/estado`,
        {
          method: "PATCH",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setMensaje(
          data.message || "No fue posible actualizar el procedimiento",
        );
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        procedimiento.estado
          ? "Procedimiento deshabilitado"
          : "Procedimiento habilitado",
      );
      setTipoMensaje("success");

      obtenerProcedimientos();
    } catch (error) {
      console.error(error);
      setMensaje("Error al cambiar estado del procedimiento");
      setTipoMensaje("error");
    }
  };

  const handleConsultaChange = (e) => {
    const { name, value } = e.target;

    setConsultaForm((prev) => ({
      ...prev,
      [name]: name === "estado" ? value === "true" : value,
    }));
  };

  const limpiarConsulta = () => {
    setConsultaForm(initialConsultaForm);
    setConsultaSeleccionada(null);
    setFiltroConsulta("");
  };

  const seleccionarConsulta = (consulta) => {
    setConsultaSeleccionada(consulta);

    setConsultaForm({
      codigo: consulta.codigo || "",
      nombre: consulta.nombre || "",
      precio: consulta.precio || "",
      estado: consulta.estado ?? true,
    });

    setMensaje("Tipo de consulta cargado correctamente");
    setTipoMensaje("info");
  };

  const guardarConsulta = async () => {
    try {
      setMensaje("");

      if (
        !consultaForm.codigo.trim() ||
        !consultaForm.nombre.trim() ||
        consultaForm.precio === ""
      ) {
        setMensaje("Complete código, nombre y precio");
        setTipoMensaje("error");
        return;
      }

      const payload = {
        ...consultaForm,
        codigo: consultaForm.codigo.trim(),
        nombre: consultaForm.nombre.trim(),
        precio: Number(consultaForm.precio),
      };

      const url = consultaSeleccionada?._id
        ? `${API_TIPOS_CONSULTA}/${consultaSeleccionada._id}`
        : API_TIPOS_CONSULTA;

      const method = consultaSeleccionada?._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(
          data.message || "No fue posible guardar el tipo de consulta",
        );
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        consultaSeleccionada?._id
          ? "Tipo de consulta actualizado correctamente"
          : "Tipo de consulta creado correctamente",
      );
      setTipoMensaje("success");

      limpiarConsulta();
      obtenerConsultas();
    } catch (error) {
      console.error(error);
      setMensaje("Error al guardar tipo de consulta");
      setTipoMensaje("error");
    }
  };

  const cambiarEstadoConsulta = async (consulta) => {
    try {
      const res = await fetch(`${API_TIPOS_CONSULTA}/${consulta._id}/estado`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible actualizar el estado");
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        consulta.estado
          ? "Tipo de consulta deshabilitado"
          : "Tipo de consulta habilitado",
      );
      setTipoMensaje("success");

      obtenerConsultas();
    } catch (error) {
      console.error(error);
      setMensaje("Error al cambiar estado del tipo de consulta");
      setTipoMensaje("error");
    }
  };

  // Funciones para Laboratorios
  const handleLaboratorioChange = (e) => {
    const { name, value } = e.target;

    setLaboratorioForm((prev) => ({
      ...prev,
      [name]: name === "estado" ? value === "true" : value,
    }));
  };

  const limpiarLaboratorio = () => {
    setLaboratorioForm(initialLaboratorioForm);
    setLaboratorioSeleccionado(null);
    setFiltroLaboratorio("");
  };

  const seleccionarLaboratorio = (laboratorio) => {
    setLaboratorioSeleccionado(laboratorio);

    setLaboratorioForm({
      codigo: laboratorio.codigo || "",
      nombre: laboratorio.nombre || "",
      precio: laboratorio.precio || "",
      estado: laboratorio.estado ?? true,
    });

    setMensaje("Laboratorio cargado correctamente");
    setTipoMensaje("info");
  };

  const guardarLaboratorio = async () => {
    try {
      if (
        !laboratorioForm.codigo.trim() ||
        !laboratorioForm.nombre.trim() ||
        laboratorioForm.precio === ""
      ) {
        setMensaje("Complete código, nombre y precio");
        setTipoMensaje("error");
        return;
      }

      const payload = {
        ...laboratorioForm,
        codigo: laboratorioForm.codigo.trim(),
        nombre: laboratorioForm.nombre.trim(),
        precio: Number(laboratorioForm.precio),
      };

      const url = laboratorioSeleccionado?._id
        ? `${API_LABORATORIOS}/${laboratorioSeleccionado._id}`
        : API_LABORATORIOS;

      const method = laboratorioSeleccionado?._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible guardar el laboratorio");
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        laboratorioSeleccionado?._id
          ? "Laboratorio actualizado correctamente"
          : "Laboratorio creado correctamente",
      );

      setTipoMensaje("success");

      limpiarLaboratorio();
      obtenerLaboratorios();
    } catch (error) {
      console.error(error);
      setMensaje("Error al guardar laboratorio");
      setTipoMensaje("error");
    }
  };

  const cambiarEstadoLaboratorio = async (laboratorio) => {
    try {
      const res = await fetch(`${API_LABORATORIOS}/${laboratorio._id}/estado`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible actualizar el estado");
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        laboratorio.estado
          ? "Laboratorio deshabilitado"
          : "Laboratorio habilitado",
      );

      setTipoMensaje("success");

      obtenerLaboratorios();
    } catch (error) {
      console.error(error);
    }
  };

  // Funciones para Medicamentos
  const handleMedicamentoChange = (e) => {
    const { name, value } = e.target;

    setMedicamentoForm((prev) => ({
      ...prev,
      [name]: name === "estado" ? value === "true" : value,
    }));
  };

  const limpiarMedicamento = () => {
    setMedicamentoForm(initialMedicamentoForm);
    setMedicamentoSeleccionado(null);
    setFiltroMedicamento("");
  };

  const seleccionarMedicamento = (medicamento) => {
    setMedicamentoSeleccionado(medicamento);

    setMedicamentoForm({
      codigo: medicamento.codigo || "",
      nombre: medicamento.nombre || "",
      concentracion: medicamento.concentracion || "",
      presentacion: medicamento.presentacion || "",
      cantidad: medicamento.cantidad || "",
      precio: medicamento.precio || "",
      estado: medicamento.estado ?? true,
    });

    setMensaje("Medicamento cargado correctamente");
    setTipoMensaje("info");
  };

  const guardarMedicamento = async () => {
    try {
      if (
        !medicamentoForm.codigo.trim() ||
        !medicamentoForm.nombre.trim() ||
        !medicamentoForm.concentracion.trim() ||
        !medicamentoForm.presentacion.trim()
      ) {
        setMensaje("Complete código, nombre, concentración y presentación");
        setTipoMensaje("error");
        return;
      }

      const payload = {
        ...medicamentoForm,
        codigo: medicamentoForm.codigo.trim(),
        nombre: medicamentoForm.nombre.trim(),
        concentracion: medicamentoForm.concentracion.trim(),
        presentacion: medicamentoForm.presentacion.trim(),
        cantidad: Number(medicamentoForm.cantidad || 0),
        precio: Number(medicamentoForm.precio || 0),
      };

      const url = medicamentoSeleccionado?._id
        ? `${API_MEDICAMENTOS}/${medicamentoSeleccionado._id}`
        : API_MEDICAMENTOS;

      const method = medicamentoSeleccionado?._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible guardar el medicamento");
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        medicamentoSeleccionado?._id
          ? "Medicamento actualizado correctamente"
          : "Medicamento creado correctamente",
      );

      setTipoMensaje("success");

      limpiarMedicamento();
      obtenerMedicamentos();
    } catch (error) {
      console.error(error);
      setMensaje("Error al guardar medicamento");
      setTipoMensaje("error");
    }
  };

  const cambiarEstadoMedicamento = async (medicamento) => {
    try {
      const res = await fetch(`${API_MEDICAMENTOS}/${medicamento._id}/estado`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible actualizar el estado");
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        medicamento.estado
          ? "Medicamento deshabilitado"
          : "Medicamento habilitado",
      );

      setTipoMensaje("success");

      obtenerMedicamentos();
    } catch (error) {
      console.error(error);
    }
  };

  const usuariosFiltrados = usuarios.filter((u) => {
    const texto =
      `${u.username} ${u.nombre} ${u.apellido} ${u.correo}`.toLowerCase();
    return texto.includes(filtro.toLowerCase());
  });

  const procedimientosFiltrados = procedimientos.filter((p) => {
    const texto =
      `${p.codigo || ""} ${p.nombre || ""} ${p.precio || ""}`.toLowerCase();
    return texto.includes(filtroProcedimiento.toLowerCase());
  });

  const consultasFiltradas = consultas.filter((c) => {
    const texto =
      `${c.codigo || ""} ${c.nombre || ""} ${c.precio || ""}`.toLowerCase();
    return texto.includes(filtroConsulta.toLowerCase());
  });

  const laboratoriosFiltrados = laboratorios.filter((l) => {
    const texto = `
      ${l.codigo || ""}
      ${l.nombre || ""}
      ${l.precio || ""}
    `.toLowerCase();

    return texto.includes(filtroLaboratorio.toLowerCase());
  });

  const medicamentosFiltrados = medicamentos.filter((m) => {
    const texto = `
      ${m.codigo || ""}
      ${m.nombre || ""}
      ${m.concentracion || ""}
      ${m.presentacion || ""}
      ${m.cantidad || ""}
      ${m.precio || ""}
    `.toLowerCase();

    return texto.includes(filtroMedicamento.toLowerCase());
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

              <button
                type="button"
                onClick={modoEditarDatos ? actualizarUsuario : crearUsuario}
                title="Guardar"
              >
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
        <section className="proc-card">
          <div className="proc-title-bar">
            <span className="usuario-title-icon">
              <IconImg name="procedimiento" alt="Procedimiento" />
            </span>

            <h2>
              {procedimientoSeleccionado
                ? "Editar Procedimiento"
                : "Crear Procedimiento"}
            </h2>

            <div className="proc-title-actions">
              <button
                type="button"
                onClick={limpiarProcedimiento}
                title="Nuevo"
              >
                <IconImg name="nuevo" alt="Nuevo" />
              </button>

              <button
                type="button"
                onClick={guardarProcedimiento}
                title="Guardar"
              >
                <IconImg name="guardar" alt="Guardar" />
              </button>
            </div>
          </div>

          <div className="proc-form-grid">
            <div className="proc-field">
              <label>Código / CUPS</label>
              <input
                type="text"
                name="codigo"
                value={procedimientoForm.codigo}
                onChange={handleProcedimientoChange}
                placeholder="Ej: 890201"
              />
            </div>

            <div className="proc-field">
              <label>Descripción</label>
              <input
                type="text"
                name="nombre"
                value={procedimientoForm.nombre}
                onChange={handleProcedimientoChange}
                placeholder="Descripción del procedimiento"
              />
            </div>

            <div className="proc-field">
              <label>Precio</label>
              <input
                type="number"
                name="precio"
                value={procedimientoForm.precio}
                onChange={handleProcedimientoChange}
                placeholder="Precio"
              />
            </div>

            <div className="proc-field">
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

          <div className="proc-search">
            <input
              placeholder="Buscar por CUPS o descripción..."
              value={filtroProcedimiento}
              onChange={(e) => setFiltroProcedimiento(e.target.value)}
            />
          </div>

          <div className="proc-table">
            <table>
              <thead>
                <tr>
                  <th>CUPS</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {procedimientosFiltrados.length > 0 ? (
                  procedimientosFiltrados.map((p) => (
                    <tr key={p._id}>
                      <td>{p.codigo}</td>
                      <td>{p.nombre}</td>
                      <td>${Number(p.precio || 0).toLocaleString("es-CO")}</td>
                      <td>{p.estado ? "Activo" : "Inactivo"}</td>
                      <td>
                        <div className="proc-table-actions">
                          <button
                            type="button"
                            className="proc-btn-edit"
                            onClick={() => seleccionarProcedimiento(p)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className={
                              p.estado ? "proc-btn-disable" : "proc-btn-enable"
                            }
                            onClick={() => cambiarEstadoProcedimiento(p)}
                          >
                            {p.estado ? "Deshabilitar" : "Habilitar"}
                          </button>
                        </div>
                      </td>
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

      {tabActiva === "consultas" && (
        <section className="consulta-card">
          <div className="consulta-title-bar">
            <span className="usuario-title-icon">
              <IconImg name="iconconsultas" alt="Consultas" />
            </span>

            <h2>
              {consultaSeleccionada
                ? "Editar Tipo de Consulta"
                : "Crear Tipo de Consulta"}
            </h2>

            <div className="consulta-title-actions">
              <button
                type="button"
                className="consulta-header-btn"
                onClick={limpiarConsulta}
                title="Nuevo"
              >
                <IconImg name="nuevo" alt="Nuevo" />
              </button>

              <button
                type="button"
                className="consulta-header-btn"
                onClick={guardarConsulta}
                title="Guardar"
              >
                <IconImg name="guardar" alt="Guardar" />
              </button>
            </div>
          </div>

          <div className="consulta-form-grid">
            <div className="consulta-field">
              <label>Código</label>
              <input
                type="text"
                name="codigo"
                value={consultaForm.codigo}
                onChange={handleConsultaChange}
                placeholder="Ej: CG001"
              />
            </div>

            <div className="consulta-field">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={consultaForm.nombre}
                onChange={handleConsultaChange}
                placeholder="Ej: Consulta General"
              />
            </div>

            <div className="consulta-field">
              <label>Precio</label>
              <input
                type="number"
                name="precio"
                value={consultaForm.precio}
                onChange={handleConsultaChange}
                placeholder="Precio"
              />
            </div>

            <div className="consulta-field">
              <label>Estado</label>
              <select
                name="estado"
                value={consultaForm.estado ? "true" : "false"}
                onChange={handleConsultaChange}
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="consulta-search">
            <input
              placeholder="Buscar por código, nombre o precio..."
              value={filtroConsulta}
              onChange={(e) => setFiltroConsulta(e.target.value)}
            />
          </div>

          <div className="consulta-table">
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {consultasFiltradas.length > 0 ? (
                  consultasFiltradas.map((c) => (
                    <tr key={c._id}>
                      <td>{c.codigo}</td>
                      <td>{c.nombre}</td>
                      <td>${Number(c.precio || 0).toLocaleString("es-CO")}</td>
                      <td>{c.estado ? "Activo" : "Inactivo"}</td>
                      <td>
                        <div className="consulta-table-actions">
                          <button
                            type="button"
                            className="consulta-btn-edit"
                            onClick={() => seleccionarConsulta(c)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className={
                              c.estado
                                ? "consulta-btn-disable"
                                : "consulta-btn-enable"
                            }
                            onClick={() => cambiarEstadoConsulta(c)}
                          >
                            {c.estado ? "Deshabilitar" : "Habilitar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No hay tipos de consulta registrados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tabActiva === "laboratorios" && (
        <section className="lab-card">
          <div className="lab-title-bar">
            <span className="usuario-title-icon">
              <IconImg name="laboratorio" alt="Laboratorio" />
            </span>

            <h2>
              {laboratorioSeleccionado
                ? "Editar Laboratorio"
                : "Crear Laboratorio"}
            </h2>

            <div className="lab-title-actions">
              <button type="button" onClick={limpiarLaboratorio} title="Nuevo">
                <IconImg name="nuevo" alt="Nuevo" />
              </button>

              <button
                type="button"
                onClick={guardarLaboratorio}
                title="Guardar"
              >
                <IconImg name="guardar" alt="Guardar" />
              </button>
            </div>
          </div>

          <div className="lab-form-grid">
            <div className="lab-field">
              <label>Código</label>
              <input
                type="text"
                name="codigo"
                value={laboratorioForm.codigo}
                onChange={handleLaboratorioChange}
                placeholder=" LAB001"
              />
            </div>

            <div className="lab-field">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={laboratorioForm.nombre}
                onChange={handleLaboratorioChange}
                placeholder=" Hemograma"
              />
            </div>

            <div className="lab-field">
              <label>Precio</label>
              <input
                type="number"
                name="precio"
                value={laboratorioForm.precio}
                onChange={handleLaboratorioChange}
                placeholder="Precio"
              />
            </div>

            <div className="lab-field">
              <label>Estado</label>
              <select
                name="estado"
                value={laboratorioForm.estado ? "true" : "false"}
                onChange={handleLaboratorioChange}
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="lab-search">
            <input
              placeholder="Buscar por código, nombre o precio..."
              value={filtroLaboratorio}
              onChange={(e) => setFiltroLaboratorio(e.target.value)}
            />
          </div>

          <div className="lab-table">
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {laboratoriosFiltrados.length > 0 ? (
                  laboratoriosFiltrados.map((l) => (
                    <tr key={l._id}>
                      <td>{l.codigo}</td>
                      <td>{l.nombre}</td>
                      <td>${Number(l.precio || 0).toLocaleString("es-CO")}</td>
                      <td>{l.estado ? "Activo" : "Inactivo"}</td>
                      <td>
                        <div className="lab-table-actions">
                          <button
                            type="button"
                            className="lab-btn-edit"
                            onClick={() => seleccionarLaboratorio(l)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className={
                              l.estado ? "lab-btn-disable" : "lab-btn-enable"
                            }
                            onClick={() => cambiarEstadoLaboratorio(l)}
                          >
                            {l.estado ? "Deshabilitar" : "Habilitar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No hay laboratorios registrados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tabActiva === "medicamentos" && (
        <section className="med-card">
          <div className="med-title-bar">
            <span className="usuario-title-icon">
              <IconImg name="medicamento" alt="Medicamento" />
            </span>

            <h2>
              {medicamentoSeleccionado
                ? "Editar Medicamento"
                : "Crear Medicamento"}
            </h2>

            <div className="med-title-actions">
              <button type="button" onClick={limpiarMedicamento} title="Nuevo">
                <IconImg name="nuevo" alt="Nuevo" />
              </button>

              <button
                type="button"
                onClick={guardarMedicamento}
                title="Guardar"
              >
                <IconImg name="guardar" alt="Guardar" />
              </button>
            </div>
          </div>

          <div className="med-form-grid">
            <div className="med-field">
              <label>Código</label>
              <input
                type="text"
                name="codigo"
                value={medicamentoForm.codigo}
                onChange={handleMedicamentoChange}
                placeholder="Ej: MED001"
              />
            </div>

            <div className="med-field">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={medicamentoForm.nombre}
                onChange={handleMedicamentoChange}
                placeholder="Ej: Acetaminofén"
              />
            </div>

            <div className="med-field">
              <label>Concentración</label>
              <select
                name="concentracion"
                value={medicamentoForm.concentracion}
                onChange={handleMedicamentoChange}
              >
                <option value="">Seleccione concentración</option>
                <option value="5 mg">5 mg</option>
                <option value="10 mg">10 mg</option>
                <option value="25 mg">25 mg</option>
                <option value="50 mg">50 mg</option>
                <option value="100 mg">100 mg</option>
                <option value="250 mg">250 mg</option>
                <option value="500 mg">500 mg</option>
                <option value="1 g">1 g</option>
                <option value="5 ml">5 ml</option>
                <option value="10 ml">10 ml</option>
                <option value="100 ml">100 ml</option>
                <option value="250 ml">250 ml</option>
                <option value="500 ml">500 ml</option>
                <option value="1%">1%</option>
                <option value="2%">2%</option>
                <option value="5%">5%</option>
                <option value="10%">10%</option>
              </select>
            </div>

            <div className="med-field">
              <label>Presentación</label>
              <select
                name="presentacion"
                value={medicamentoForm.presentacion}
                onChange={handleMedicamentoChange}
              >
                <option value="">Seleccione presentación</option>
                <option value="Tableta">Tableta</option>
                <option value="Cápsula">Cápsula</option>
                <option value="Jarabe">Jarabe</option>
                <option value="Suspensión">Suspensión</option>
                <option value="Gotas">Gotas</option>
                <option value="Ampolla">Ampolla</option>
                <option value="Inyectable">Inyectable</option>
                <option value="Crema">Crema</option>
                <option value="Ungüento">Ungüento</option>
                <option value="Gel">Gel</option>
                <option value="Solución oral">Solución oral</option>
                <option value="Solución inyectable">Solución inyectable</option>
                <option value="Polvo">Polvo</option>
                <option value="Sobre">Sobre</option>
                <option value="Supositorio">Supositorio</option>
                <option value="Aerosol">Aerosol</option>
                <option value="Parche">Parche</option>
              </select>
            </div>

            <div className="med-field">
              <label>Cantidad</label>
              <input
                type="number"
                name="cantidad"
                value={medicamentoForm.cantidad}
                onChange={handleMedicamentoChange}
                placeholder="Cantidad"
              />
            </div>

            <div className="med-field">
              <label>Precio</label>
              <input
                type="number"
                name="precio"
                value={medicamentoForm.precio}
                onChange={handleMedicamentoChange}
                placeholder="Precio"
              />
            </div>

            <div className="med-field">
              <label>Estado</label>
              <select
                name="estado"
                value={medicamentoForm.estado ? "true" : "false"}
                onChange={handleMedicamentoChange}
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="med-search">
            <input
              placeholder="Buscar por código, nombre, concentración, presentación o precio..."
              value={filtroMedicamento}
              onChange={(e) => setFiltroMedicamento(e.target.value)}
            />
          </div>

          <div className="med-table">
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Concentración</th>
                  <th>Presentación</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {medicamentosFiltrados.length > 0 ? (
                  medicamentosFiltrados.map((m) => (
                    <tr key={m._id}>
                      <td>{m.codigo}</td>
                      <td>{m.nombre}</td>
                      <td>{m.concentracion}</td>
                      <td>{m.presentacion}</td>
                      <td>{m.cantidad}</td>
                      <td>${Number(m.precio || 0).toLocaleString("es-CO")}</td>
                      <td>{m.estado ? "Activo" : "Inactivo"}</td>
                      <td>
                        <div className="med-table-actions">
                          <button
                            type="button"
                            className="med-btn-edit"
                            onClick={() => seleccionarMedicamento(m)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className={
                              m.estado ? "med-btn-disable" : "med-btn-enable"
                            }
                            onClick={() => cambiarEstadoMedicamento(m)}
                          >
                            {m.estado ? "Deshabilitar" : "Habilitar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No hay medicamentos registrados</td>
                  </tr>
                )}
              </tbody>
            </table>
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

              <button
                type="button"
                className="config-btn config-btn--secondary"
              >
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
=======
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./configuracion.css";

const API_URL = "https://proyect-saludya-backend.onrender.com/api/usuarios";
const API_PROCEDIMIENTOS = "https://proyect-saludya-backend.onrender.com/api/procedimientos";
const API_TIPOS_CONSULTA = "https://proyect-saludya-backend.onrender.com/api/tipos-consulta";
const API_LABORATORIOS = "https://proyect-saludya-backend.onrender.com/api/laboratorios";
const API_MEDICAMENTOS = "https://proyect-saludya-backend.onrender.com/api/medicamentos";

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

const initialConsultaForm = {
  codigo: "",
  nombre: "",
  precio: "",
  estado: true,
};

const initialLaboratorioForm = {
  codigo: "",
  nombre: "",
  precio: "",
  estado: true,
};

const initialMedicamentoForm = {
  codigo: "",
  nombre: "",
  concentracion: "",
  presentacion: "",
  cantidad: "",
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
    initialProcedimientoForm,
  );
  const [procedimientoSeleccionado, setProcedimientoSeleccionado] =
    useState(null);
  const [filtroProcedimiento, setFiltroProcedimiento] = useState("");

  const [consultas, setConsultas] = useState([]);
  const [consultaForm, setConsultaForm] = useState(initialConsultaForm);
  const [consultaSeleccionada, setConsultaSeleccionada] = useState(null);
  const [filtroConsulta, setFiltroConsulta] = useState("");

  const [laboratorios, setLaboratorios] = useState([]);
  const [laboratorioForm, setLaboratorioForm] = useState(
    initialLaboratorioForm,
  );
  const [laboratorioSeleccionado, setLaboratorioSeleccionado] = useState(null);
  const [filtroLaboratorio, setFiltroLaboratorio] = useState("");

  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [medicamentos, setMedicamentos] = useState([]);
  const [medicamentoForm, setMedicamentoForm] = useState(
    initialMedicamentoForm,
  );
  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);
  const [filtroMedicamento, setFiltroMedicamento] = useState("");

  useEffect(() => {
    obtenerUsuarios();
    obtenerProcedimientos();
    obtenerConsultas();
    obtenerLaboratorios();
    obtenerMedicamentos();
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

  const obtenerConsultas = async () => {
    try {
      const res = await fetch(API_TIPOS_CONSULTA);
      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible obtener tipos de consulta");
        setTipoMensaje("error");
        return;
      }

      setConsultas(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error(error);
      setMensaje("Error al obtener tipos de consulta");
      setTipoMensaje("error");
    }
  };

  const obtenerLaboratorios = async () => {
    try {
      const res = await fetch(API_LABORATORIOS);
      const data = await res.json();

      setLaboratorios(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerMedicamentos = async () => {
    try {
      const res = await fetch(API_MEDICAMENTOS);
      const data = await res.json();

      setMedicamentos(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error(error);
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

  const limpiarFormulario = () => {
    setForm(initialForm);
    setMensaje("");
    setUsuarioSeleccionado(null);
    setModoEdicion(false);
    setModoEditarDatos(false);
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
    const actualizarUsuario = async () => {
      try {
        if (!usuarioSeleccionado?._id) {
          setMensaje("Seleccione un usuario");
          setTipoMensaje("error");
          return;
        }

        const res = await fetch(`${API_URL}/${usuarioSeleccionado._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: form.username,
            correo: form.correo,
            telefono: form.telefono,
            nombre: form.nombre,
            apellido: form.apellido,
            sexo: form.sexo,
            nivelAcceso: form.nivelAcceso,
            estado: form.estado,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setMensaje(data.message || "No fue posible actualizar el usuario");
          setTipoMensaje("error");
          return;
        }

        setMensaje("Usuario actualizado correctamente");
        setTipoMensaje("success");

        setUsuarioSeleccionado(data.data);

        obtenerUsuarios();

        setModoEditarDatos(false);
      } catch (error) {
        console.error(error);

        setMensaje("Error al actualizar usuario");
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
      const res = await fetch(
        `${API_URL}/${usuarioSeleccionado._id}/password`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            passwordAnterior: passwordForm.passwordAnterior,
            password: passwordForm.nuevaPassword,
          }),
        },
      );

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
        "¿Desea restablecer la contraseña del usuario a 123?",
      );

      if (!confirmar) return;

      const res = await fetch(
        `${API_URL}/${usuarioSeleccionado._id}/reset-password`,
        {
          method: "PATCH",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible restablecer la contraseña");
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        "Contraseña restablecida correctamente. Nueva contraseña: 123",
      );
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

  const handleProcedimientoChange = (e) => {
    const { name, value } = e.target;

    setProcedimientoForm((prev) => ({
      ...prev,
      [name]: name === "estado" ? value === "true" : value,
    }));
  };

  const limpiarProcedimiento = () => {
    setProcedimientoForm(initialProcedimientoForm);
    setProcedimientoSeleccionado(null);
    setFiltroProcedimiento("");
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

  const guardarProcedimiento = async () => {
    try {
      setMensaje("");

      if (
        !procedimientoForm.codigo.trim() ||
        !procedimientoForm.nombre.trim() ||
        procedimientoForm.precio === ""
      ) {
        setMensaje("Complete código, nombre y precio");
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
          : "Procedimiento creado correctamente",
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

  const cambiarEstadoProcedimiento = async (procedimiento) => {
    try {
      const res = await fetch(
        `${API_PROCEDIMIENTOS}/${procedimiento._id}/estado`,
        {
          method: "PATCH",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setMensaje(
          data.message || "No fue posible actualizar el procedimiento",
        );
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        procedimiento.estado
          ? "Procedimiento deshabilitado"
          : "Procedimiento habilitado",
      );
      setTipoMensaje("success");

      obtenerProcedimientos();
    } catch (error) {
      console.error(error);
      setMensaje("Error al cambiar estado del procedimiento");
      setTipoMensaje("error");
    }
  };

  const handleConsultaChange = (e) => {
    const { name, value } = e.target;

    setConsultaForm((prev) => ({
      ...prev,
      [name]: name === "estado" ? value === "true" : value,
    }));
  };

  const limpiarConsulta = () => {
    setConsultaForm(initialConsultaForm);
    setConsultaSeleccionada(null);
    setFiltroConsulta("");
  };

  const seleccionarConsulta = (consulta) => {
    setConsultaSeleccionada(consulta);

    setConsultaForm({
      codigo: consulta.codigo || "",
      nombre: consulta.nombre || "",
      precio: consulta.precio || "",
      estado: consulta.estado ?? true,
    });

    setMensaje("Tipo de consulta cargado correctamente");
    setTipoMensaje("info");
  };

  const guardarConsulta = async () => {
    try {
      setMensaje("");

      if (
        !consultaForm.codigo.trim() ||
        !consultaForm.nombre.trim() ||
        consultaForm.precio === ""
      ) {
        setMensaje("Complete código, nombre y precio");
        setTipoMensaje("error");
        return;
      }

      const payload = {
        ...consultaForm,
        codigo: consultaForm.codigo.trim(),
        nombre: consultaForm.nombre.trim(),
        precio: Number(consultaForm.precio),
      };

      const url = consultaSeleccionada?._id
        ? `${API_TIPOS_CONSULTA}/${consultaSeleccionada._id}`
        : API_TIPOS_CONSULTA;

      const method = consultaSeleccionada?._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(
          data.message || "No fue posible guardar el tipo de consulta",
        );
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        consultaSeleccionada?._id
          ? "Tipo de consulta actualizado correctamente"
          : "Tipo de consulta creado correctamente",
      );
      setTipoMensaje("success");

      limpiarConsulta();
      obtenerConsultas();
    } catch (error) {
      console.error(error);
      setMensaje("Error al guardar tipo de consulta");
      setTipoMensaje("error");
    }
  };

  const cambiarEstadoConsulta = async (consulta) => {
    try {
      const res = await fetch(`${API_TIPOS_CONSULTA}/${consulta._id}/estado`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible actualizar el estado");
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        consulta.estado
          ? "Tipo de consulta deshabilitado"
          : "Tipo de consulta habilitado",
      );
      setTipoMensaje("success");

      obtenerConsultas();
    } catch (error) {
      console.error(error);
      setMensaje("Error al cambiar estado del tipo de consulta");
      setTipoMensaje("error");
    }
  };

  // Funciones para Laboratorios
  const handleLaboratorioChange = (e) => {
    const { name, value } = e.target;

    setLaboratorioForm((prev) => ({
      ...prev,
      [name]: name === "estado" ? value === "true" : value,
    }));
  };

  const limpiarLaboratorio = () => {
    setLaboratorioForm(initialLaboratorioForm);
    setLaboratorioSeleccionado(null);
    setFiltroLaboratorio("");
  };

  const seleccionarLaboratorio = (laboratorio) => {
    setLaboratorioSeleccionado(laboratorio);

    setLaboratorioForm({
      codigo: laboratorio.codigo || "",
      nombre: laboratorio.nombre || "",
      precio: laboratorio.precio || "",
      estado: laboratorio.estado ?? true,
    });

    setMensaje("Laboratorio cargado correctamente");
    setTipoMensaje("info");
  };

  const guardarLaboratorio = async () => {
    try {
      if (
        !laboratorioForm.codigo.trim() ||
        !laboratorioForm.nombre.trim() ||
        laboratorioForm.precio === ""
      ) {
        setMensaje("Complete código, nombre y precio");
        setTipoMensaje("error");
        return;
      }

      const payload = {
        ...laboratorioForm,
        codigo: laboratorioForm.codigo.trim(),
        nombre: laboratorioForm.nombre.trim(),
        precio: Number(laboratorioForm.precio),
      };

      const url = laboratorioSeleccionado?._id
        ? `${API_LABORATORIOS}/${laboratorioSeleccionado._id}`
        : API_LABORATORIOS;

      const method = laboratorioSeleccionado?._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible guardar el laboratorio");
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        laboratorioSeleccionado?._id
          ? "Laboratorio actualizado correctamente"
          : "Laboratorio creado correctamente",
      );

      setTipoMensaje("success");

      limpiarLaboratorio();
      obtenerLaboratorios();
    } catch (error) {
      console.error(error);
      setMensaje("Error al guardar laboratorio");
      setTipoMensaje("error");
    }
  };

  const cambiarEstadoLaboratorio = async (laboratorio) => {
    try {
      const res = await fetch(`${API_LABORATORIOS}/${laboratorio._id}/estado`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible actualizar el estado");
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        laboratorio.estado
          ? "Laboratorio deshabilitado"
          : "Laboratorio habilitado",
      );

      setTipoMensaje("success");

      obtenerLaboratorios();
    } catch (error) {
      console.error(error);
    }
  };

  // Funciones para Medicamentos
  const handleMedicamentoChange = (e) => {
    const { name, value } = e.target;

    setMedicamentoForm((prev) => ({
      ...prev,
      [name]: name === "estado" ? value === "true" : value,
    }));
  };

  const limpiarMedicamento = () => {
    setMedicamentoForm(initialMedicamentoForm);
    setMedicamentoSeleccionado(null);
    setFiltroMedicamento("");
  };

  const seleccionarMedicamento = (medicamento) => {
    setMedicamentoSeleccionado(medicamento);

    setMedicamentoForm({
      codigo: medicamento.codigo || "",
      nombre: medicamento.nombre || "",
      concentracion: medicamento.concentracion || "",
      presentacion: medicamento.presentacion || "",
      cantidad: medicamento.cantidad || "",
      precio: medicamento.precio || "",
      estado: medicamento.estado ?? true,
    });

    setMensaje("Medicamento cargado correctamente");
    setTipoMensaje("info");
  };

  const guardarMedicamento = async () => {
    try {
      if (
        !medicamentoForm.codigo.trim() ||
        !medicamentoForm.nombre.trim() ||
        !medicamentoForm.concentracion.trim() ||
        !medicamentoForm.presentacion.trim()
      ) {
        setMensaje("Complete código, nombre, concentración y presentación");
        setTipoMensaje("error");
        return;
      }

      const payload = {
        ...medicamentoForm,
        codigo: medicamentoForm.codigo.trim(),
        nombre: medicamentoForm.nombre.trim(),
        concentracion: medicamentoForm.concentracion.trim(),
        presentacion: medicamentoForm.presentacion.trim(),
        cantidad: Number(medicamentoForm.cantidad || 0),
        precio: Number(medicamentoForm.precio || 0),
      };

      const url = medicamentoSeleccionado?._id
        ? `${API_MEDICAMENTOS}/${medicamentoSeleccionado._id}`
        : API_MEDICAMENTOS;

      const method = medicamentoSeleccionado?._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible guardar el medicamento");
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        medicamentoSeleccionado?._id
          ? "Medicamento actualizado correctamente"
          : "Medicamento creado correctamente",
      );

      setTipoMensaje("success");

      limpiarMedicamento();
      obtenerMedicamentos();
    } catch (error) {
      console.error(error);
      setMensaje("Error al guardar medicamento");
      setTipoMensaje("error");
    }
  };

  const cambiarEstadoMedicamento = async (medicamento) => {
    try {
      const res = await fetch(`${API_MEDICAMENTOS}/${medicamento._id}/estado`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible actualizar el estado");
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        medicamento.estado
          ? "Medicamento deshabilitado"
          : "Medicamento habilitado",
      );

      setTipoMensaje("success");

      obtenerMedicamentos();
    } catch (error) {
      console.error(error);
    }
  };

  const usuariosFiltrados = usuarios.filter((u) => {
    const texto =
      `${u.username} ${u.nombre} ${u.apellido} ${u.correo}`.toLowerCase();
    return texto.includes(filtro.toLowerCase());
  });

  const procedimientosFiltrados = procedimientos.filter((p) => {
    const texto =
      `${p.codigo || ""} ${p.nombre || ""} ${p.precio || ""}`.toLowerCase();
    return texto.includes(filtroProcedimiento.toLowerCase());
  });

  const consultasFiltradas = consultas.filter((c) => {
    const texto =
      `${c.codigo || ""} ${c.nombre || ""} ${c.precio || ""}`.toLowerCase();
    return texto.includes(filtroConsulta.toLowerCase());
  });

  const laboratoriosFiltrados = laboratorios.filter((l) => {
    const texto = `
      ${l.codigo || ""}
      ${l.nombre || ""}
      ${l.precio || ""}
    `.toLowerCase();

    return texto.includes(filtroLaboratorio.toLowerCase());
  });

  const medicamentosFiltrados = medicamentos.filter((m) => {
    const texto = `
      ${m.codigo || ""}
      ${m.nombre || ""}
      ${m.concentracion || ""}
      ${m.presentacion || ""}
      ${m.cantidad || ""}
      ${m.precio || ""}
    `.toLowerCase();

    return texto.includes(filtroMedicamento.toLowerCase());
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

              <button
                type="button"
                onClick={modoEditarDatos ? actualizarUsuario : crearUsuario}
                title="Guardar"
              >
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
        <section className="proc-card">
          <div className="proc-title-bar">
            <span className="usuario-title-icon">
              <IconImg name="procedimiento" alt="Procedimiento" />
            </span>

            <h2>
              {procedimientoSeleccionado
                ? "Editar Procedimiento"
                : "Crear Procedimiento"}
            </h2>

            <div className="proc-title-actions">
              <button
                type="button"
                onClick={limpiarProcedimiento}
                title="Nuevo"
              >
                <IconImg name="nuevo" alt="Nuevo" />
              </button>

              <button
                type="button"
                onClick={guardarProcedimiento}
                title="Guardar"
              >
                <IconImg name="guardar" alt="Guardar" />
              </button>
            </div>
          </div>

          <div className="proc-form-grid">
            <div className="proc-field">
              <label>Código / CUPS</label>
              <input
                type="text"
                name="codigo"
                value={procedimientoForm.codigo}
                onChange={handleProcedimientoChange}
                placeholder="Ej: 890201"
              />
            </div>

            <div className="proc-field">
              <label>Descripción</label>
              <input
                type="text"
                name="nombre"
                value={procedimientoForm.nombre}
                onChange={handleProcedimientoChange}
                placeholder="Descripción del procedimiento"
              />
            </div>

            <div className="proc-field">
              <label>Precio</label>
              <input
                type="number"
                name="precio"
                value={procedimientoForm.precio}
                onChange={handleProcedimientoChange}
                placeholder="Precio"
              />
            </div>

            <div className="proc-field">
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

          <div className="proc-search">
            <input
              placeholder="Buscar por CUPS o descripción..."
              value={filtroProcedimiento}
              onChange={(e) => setFiltroProcedimiento(e.target.value)}
            />
          </div>

          <div className="proc-table">
            <table>
              <thead>
                <tr>
                  <th>CUPS</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {procedimientosFiltrados.length > 0 ? (
                  procedimientosFiltrados.map((p) => (
                    <tr key={p._id}>
                      <td>{p.codigo}</td>
                      <td>{p.nombre}</td>
                      <td>${Number(p.precio || 0).toLocaleString("es-CO")}</td>
                      <td>{p.estado ? "Activo" : "Inactivo"}</td>
                      <td>
                        <div className="proc-table-actions">
                          <button
                            type="button"
                            className="proc-btn-edit"
                            onClick={() => seleccionarProcedimiento(p)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className={
                              p.estado ? "proc-btn-disable" : "proc-btn-enable"
                            }
                            onClick={() => cambiarEstadoProcedimiento(p)}
                          >
                            {p.estado ? "Deshabilitar" : "Habilitar"}
                          </button>
                        </div>
                      </td>
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

      {tabActiva === "consultas" && (
        <section className="consulta-card">
          <div className="consulta-title-bar">
            <span className="usuario-title-icon">
              <IconImg name="iconconsultas" alt="Consultas" />
            </span>

            <h2>
              {consultaSeleccionada
                ? "Editar Tipo de Consulta"
                : "Crear Tipo de Consulta"}
            </h2>

            <div className="consulta-title-actions">
              <button
                type="button"
                className="consulta-header-btn"
                onClick={limpiarConsulta}
                title="Nuevo"
              >
                <IconImg name="nuevo" alt="Nuevo" />
              </button>

              <button
                type="button"
                className="consulta-header-btn"
                onClick={guardarConsulta}
                title="Guardar"
              >
                <IconImg name="guardar" alt="Guardar" />
              </button>
            </div>
          </div>

          <div className="consulta-form-grid">
            <div className="consulta-field">
              <label>Código</label>
              <input
                type="text"
                name="codigo"
                value={consultaForm.codigo}
                onChange={handleConsultaChange}
                placeholder="Ej: CG001"
              />
            </div>

            <div className="consulta-field">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={consultaForm.nombre}
                onChange={handleConsultaChange}
                placeholder="Ej: Consulta General"
              />
            </div>

            <div className="consulta-field">
              <label>Precio</label>
              <input
                type="number"
                name="precio"
                value={consultaForm.precio}
                onChange={handleConsultaChange}
                placeholder="Precio"
              />
            </div>

            <div className="consulta-field">
              <label>Estado</label>
              <select
                name="estado"
                value={consultaForm.estado ? "true" : "false"}
                onChange={handleConsultaChange}
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="consulta-search">
            <input
              placeholder="Buscar por código, nombre o precio..."
              value={filtroConsulta}
              onChange={(e) => setFiltroConsulta(e.target.value)}
            />
          </div>

          <div className="consulta-table">
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {consultasFiltradas.length > 0 ? (
                  consultasFiltradas.map((c) => (
                    <tr key={c._id}>
                      <td>{c.codigo}</td>
                      <td>{c.nombre}</td>
                      <td>${Number(c.precio || 0).toLocaleString("es-CO")}</td>
                      <td>{c.estado ? "Activo" : "Inactivo"}</td>
                      <td>
                        <div className="consulta-table-actions">
                          <button
                            type="button"
                            className="consulta-btn-edit"
                            onClick={() => seleccionarConsulta(c)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className={
                              c.estado
                                ? "consulta-btn-disable"
                                : "consulta-btn-enable"
                            }
                            onClick={() => cambiarEstadoConsulta(c)}
                          >
                            {c.estado ? "Deshabilitar" : "Habilitar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No hay tipos de consulta registrados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tabActiva === "laboratorios" && (
        <section className="lab-card">
          <div className="lab-title-bar">
            <span className="usuario-title-icon">
              <IconImg name="laboratorio" alt="Laboratorio" />
            </span>

            <h2>
              {laboratorioSeleccionado
                ? "Editar Laboratorio"
                : "Crear Laboratorio"}
            </h2>

            <div className="lab-title-actions">
              <button type="button" onClick={limpiarLaboratorio} title="Nuevo">
                <IconImg name="nuevo" alt="Nuevo" />
              </button>

              <button
                type="button"
                onClick={guardarLaboratorio}
                title="Guardar"
              >
                <IconImg name="guardar" alt="Guardar" />
              </button>
            </div>
          </div>

          <div className="lab-form-grid">
            <div className="lab-field">
              <label>Código</label>
              <input
                type="text"
                name="codigo"
                value={laboratorioForm.codigo}
                onChange={handleLaboratorioChange}
                placeholder=" LAB001"
              />
            </div>

            <div className="lab-field">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={laboratorioForm.nombre}
                onChange={handleLaboratorioChange}
                placeholder=" Hemograma"
              />
            </div>

            <div className="lab-field">
              <label>Precio</label>
              <input
                type="number"
                name="precio"
                value={laboratorioForm.precio}
                onChange={handleLaboratorioChange}
                placeholder="Precio"
              />
            </div>

            <div className="lab-field">
              <label>Estado</label>
              <select
                name="estado"
                value={laboratorioForm.estado ? "true" : "false"}
                onChange={handleLaboratorioChange}
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="lab-search">
            <input
              placeholder="Buscar por código, nombre o precio..."
              value={filtroLaboratorio}
              onChange={(e) => setFiltroLaboratorio(e.target.value)}
            />
          </div>

          <div className="lab-table">
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {laboratoriosFiltrados.length > 0 ? (
                  laboratoriosFiltrados.map((l) => (
                    <tr key={l._id}>
                      <td>{l.codigo}</td>
                      <td>{l.nombre}</td>
                      <td>${Number(l.precio || 0).toLocaleString("es-CO")}</td>
                      <td>{l.estado ? "Activo" : "Inactivo"}</td>
                      <td>
                        <div className="lab-table-actions">
                          <button
                            type="button"
                            className="lab-btn-edit"
                            onClick={() => seleccionarLaboratorio(l)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className={
                              l.estado ? "lab-btn-disable" : "lab-btn-enable"
                            }
                            onClick={() => cambiarEstadoLaboratorio(l)}
                          >
                            {l.estado ? "Deshabilitar" : "Habilitar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No hay laboratorios registrados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tabActiva === "medicamentos" && (
        <section className="med-card">
          <div className="med-title-bar">
            <span className="usuario-title-icon">
              <IconImg name="medicamento" alt="Medicamento" />
            </span>

            <h2>
              {medicamentoSeleccionado
                ? "Editar Medicamento"
                : "Crear Medicamento"}
            </h2>

            <div className="med-title-actions">
              <button type="button" onClick={limpiarMedicamento} title="Nuevo">
                <IconImg name="nuevo" alt="Nuevo" />
              </button>

              <button
                type="button"
                onClick={guardarMedicamento}
                title="Guardar"
              >
                <IconImg name="guardar" alt="Guardar" />
              </button>
            </div>
          </div>

          <div className="med-form-grid">
            <div className="med-field">
              <label>Código</label>
              <input
                type="text"
                name="codigo"
                value={medicamentoForm.codigo}
                onChange={handleMedicamentoChange}
                placeholder="Ej: MED001"
              />
            </div>

            <div className="med-field">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={medicamentoForm.nombre}
                onChange={handleMedicamentoChange}
                placeholder="Ej: Acetaminofén"
              />
            </div>

            <div className="med-field">
              <label>Concentración</label>
              <select
                name="concentracion"
                value={medicamentoForm.concentracion}
                onChange={handleMedicamentoChange}
              >
                <option value="">Seleccione concentración</option>
                <option value="5 mg">5 mg</option>
                <option value="10 mg">10 mg</option>
                <option value="25 mg">25 mg</option>
                <option value="50 mg">50 mg</option>
                <option value="100 mg">100 mg</option>
                <option value="250 mg">250 mg</option>
                <option value="500 mg">500 mg</option>
                <option value="1 g">1 g</option>
                <option value="5 ml">5 ml</option>
                <option value="10 ml">10 ml</option>
                <option value="100 ml">100 ml</option>
                <option value="250 ml">250 ml</option>
                <option value="500 ml">500 ml</option>
                <option value="1%">1%</option>
                <option value="2%">2%</option>
                <option value="5%">5%</option>
                <option value="10%">10%</option>
              </select>
            </div>

            <div className="med-field">
              <label>Presentación</label>
              <select
                name="presentacion"
                value={medicamentoForm.presentacion}
                onChange={handleMedicamentoChange}
              >
                <option value="">Seleccione presentación</option>
                <option value="Tableta">Tableta</option>
                <option value="Cápsula">Cápsula</option>
                <option value="Jarabe">Jarabe</option>
                <option value="Suspensión">Suspensión</option>
                <option value="Gotas">Gotas</option>
                <option value="Ampolla">Ampolla</option>
                <option value="Inyectable">Inyectable</option>
                <option value="Crema">Crema</option>
                <option value="Ungüento">Ungüento</option>
                <option value="Gel">Gel</option>
                <option value="Solución oral">Solución oral</option>
                <option value="Solución inyectable">Solución inyectable</option>
                <option value="Polvo">Polvo</option>
                <option value="Sobre">Sobre</option>
                <option value="Supositorio">Supositorio</option>
                <option value="Aerosol">Aerosol</option>
                <option value="Parche">Parche</option>
              </select>
            </div>

            <div className="med-field">
              <label>Cantidad</label>
              <input
                type="number"
                name="cantidad"
                value={medicamentoForm.cantidad}
                onChange={handleMedicamentoChange}
                placeholder="Cantidad"
              />
            </div>

            <div className="med-field">
              <label>Precio</label>
              <input
                type="number"
                name="precio"
                value={medicamentoForm.precio}
                onChange={handleMedicamentoChange}
                placeholder="Precio"
              />
            </div>

            <div className="med-field">
              <label>Estado</label>
              <select
                name="estado"
                value={medicamentoForm.estado ? "true" : "false"}
                onChange={handleMedicamentoChange}
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="med-search">
            <input
              placeholder="Buscar por código, nombre, concentración, presentación o precio..."
              value={filtroMedicamento}
              onChange={(e) => setFiltroMedicamento(e.target.value)}
            />
          </div>

          <div className="med-table">
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Concentración</th>
                  <th>Presentación</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {medicamentosFiltrados.length > 0 ? (
                  medicamentosFiltrados.map((m) => (
                    <tr key={m._id}>
                      <td>{m.codigo}</td>
                      <td>{m.nombre}</td>
                      <td>{m.concentracion}</td>
                      <td>{m.presentacion}</td>
                      <td>{m.cantidad}</td>
                      <td>${Number(m.precio || 0).toLocaleString("es-CO")}</td>
                      <td>{m.estado ? "Activo" : "Inactivo"}</td>
                      <td>
                        <div className="med-table-actions">
                          <button
                            type="button"
                            className="med-btn-edit"
                            onClick={() => seleccionarMedicamento(m)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className={
                              m.estado ? "med-btn-disable" : "med-btn-enable"
                            }
                            onClick={() => cambiarEstadoMedicamento(m)}
                          >
                            {m.estado ? "Deshabilitar" : "Habilitar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No hay medicamentos registrados</td>
                  </tr>
                )}
              </tbody>
            </table>
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

              <button
                type="button"
                className="config-btn config-btn--secondary"
              >
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
>>>>>>> 0594392932fa2e9c645c4fdceda86a09ba7e2d6e
