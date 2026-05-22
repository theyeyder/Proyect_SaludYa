import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./configuracion.css";

const API_URL = "http://localhost:4000/api/usuarios";
const API_PROCEDIMIENTOS =
  "http://localhost:4000/api/procedimientos";
const API_TIPOS_CONSULTA =
  "http://localhost:4000/api/tipos-consulta";

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

    if (
      location.pathname.includes(
        "procedimientos"
      )
    ) {
      return "procedimientos";
    }

    if (
      location.pathname.includes(
        "consultas"
      )
    ) {
      return "consultas";
    }

    if (
      location.pathname.includes(
        "laboratorios"
      )
    ) {
      return "laboratorios";
    }

    if (
      location.pathname.includes(
        "medicamentos"
      )
    ) {
      return "medicamentos";
    }

    return "usuarios";
  };

  const tabActiva =
    obtenerTabDesdeRuta();

  const [usuarios, setUsuarios] =
    useState([]);

  const [form, setForm] =
    useState(initialForm);

  const [mensaje, setMensaje] =
    useState("");

  const [tipoMensaje, setTipoMensaje] =
    useState("info");

  const [procedimientos, setProcedimientos] =
    useState([]);

  const [
    procedimientoForm,
    setProcedimientoForm,
  ] = useState(
    initialProcedimientoForm
  );

  const [
    procedimientoSeleccionado,
    setProcedimientoSeleccionado,
  ] = useState(null);

  const [
    filtroProcedimiento,
    setFiltroProcedimiento,
  ] = useState("");

  const [consultas, setConsultas] = useState([]);

  const [consultaForm, setConsultaForm] = useState(
    initialConsultaForm
  );

  const [
    consultaSeleccionada,
    setConsultaSeleccionada,
  ] = useState(null);

  const [filtroConsulta, setFiltroConsulta] = useState("");

  useEffect(() => {

    obtenerUsuarios();

    obtenerProcedimientos();

    obtenerConsultas();

  }, []);

  const obtenerUsuarios =
    async () => {

      try {

        const res =
          await fetch(API_URL);

        const data =
          await res.json();

        setUsuarios(
          data.data || []
        );

      } catch (error) {

        console.error(error);

      }

    };

  const obtenerProcedimientos =
    async () => {

      try {

        const res =
          await fetch(
            API_PROCEDIMIENTOS
          );

        const data =
          await res.json();

        setProcedimientos(
          Array.isArray(data)
            ? data
            : data.data || []
        );

      } catch (error) {

        console.error(error);

      }

    };

  const obtenerConsultas = async () => {
    try {
      const res = await fetch(API_TIPOS_CONSULTA);
      const data = await res.json();

      setConsultas(
        Array.isArray(data)
          ? data
          : data.data || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleProcedimientoChange =
    (e) => {

      const {
        name,
        value,
      } = e.target;

      setProcedimientoForm(
        (prev) => ({
          ...prev,

          [name]:
            name === "estado"
              ? value === "true"
              : value,
        })
      );

    };

  const limpiarProcedimiento =
    () => {

      setProcedimientoForm(
        initialProcedimientoForm
      );

      setProcedimientoSeleccionado(
        null
      );

      setFiltroProcedimiento("");

    };

  const seleccionarProcedimiento =
    (procedimiento) => {

      setProcedimientoSeleccionado(
        procedimiento
      );

      setProcedimientoForm({
        codigo:
          procedimiento.codigo || "",

        nombre:
          procedimiento.nombre || "",

        precio:
          procedimiento.precio || "",

        estado:
          procedimiento.estado ?? true,
      });

      setMensaje(
        "Procedimiento cargado correctamente"
      );

      setTipoMensaje("info");

    };

  const guardarProcedimiento =
    async () => {

      try {

        if (
          !procedimientoForm.codigo.trim() ||
          !procedimientoForm.nombre.trim() ||
          procedimientoForm.precio === ""
        ) {

          setMensaje(
            "Complete código, nombre y precio"
          );

          setTipoMensaje("error");

          return;
        }

        const payload = {
          ...procedimientoForm,

          codigo:
            procedimientoForm.codigo.trim(),

          nombre:
            procedimientoForm.nombre.trim(),

          precio: Number(
            procedimientoForm.precio
          ),
        };

        const url =
          procedimientoSeleccionado?._id

            ? `${API_PROCEDIMIENTOS}/${procedimientoSeleccionado._id}`

            : API_PROCEDIMIENTOS;

        const method =
          procedimientoSeleccionado?._id
            ? "PUT"
            : "POST";

        const res =
          await fetch(url, {
            method,

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              payload
            ),
          });

        const data =
          await res.json();

        if (!res.ok) {

          setMensaje(
            data.message ||
              "No fue posible guardar"
          );

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

        setMensaje(
          "Error al guardar procedimiento"
        );

        setTipoMensaje("error");

      }

    };

  const cambiarEstadoProcedimiento =
    async (
      procedimiento
    ) => {

      try {

        const res =
          await fetch(
            `${API_PROCEDIMIENTOS}/${procedimiento._id}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                ...procedimiento,

                estado:
                  !procedimiento.estado,
              }),
            }
          );

        const data =
          await res.json();

        if (!res.ok) {

          setMensaje(
            data.message ||
              "No fue posible actualizar"
          );

          setTipoMensaje("error");

          return;
        }

        setMensaje(
          procedimiento.estado
            ? "Procedimiento deshabilitado"
            : "Procedimiento habilitado"
        );

        setTipoMensaje("success");

        obtenerProcedimientos();

      } catch (error) {

        console.error(error);

      }

    };

  const procedimientosFiltrados =
    procedimientos.filter((p) => {

      const texto = `
        ${p.codigo}
        ${p.nombre}
        ${p.precio}
      `.toLowerCase();

      return texto.includes(
        filtroProcedimiento.toLowerCase()
      );

    });

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(
          data.message || "No fue posible guardar el tipo de consulta"
        );
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        consultaSeleccionada?._id
          ? "Tipo de consulta actualizado correctamente"
          : "Tipo de consulta creado correctamente"
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
      const res = await fetch(
        `${API_TIPOS_CONSULTA}/${consulta._id}/estado`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMensaje(
          data.message || "No fue posible actualizar el estado"
        );
        setTipoMensaje("error");
        return;
      }

      setMensaje(
        consulta.estado
          ? "Tipo de consulta deshabilitado"
          : "Tipo de consulta habilitado"
      );

      setTipoMensaje("success");

      obtenerConsultas();
    } catch (error) {
      console.error(error);
    }
  };

  const consultasFiltradas = consultas.filter((c) => {
    const texto = `
      ${c.codigo || ""}
      ${c.nombre || ""}
      ${c.precio || ""}
    `.toLowerCase();

    return texto.includes(filtroConsulta.toLowerCase());
  });

  return (

    <div className="configuracion-page">

      {
        mensaje && (
          <div
            className={`config-alert config-alert--${tipoMensaje}`}
          >
            {mensaje}
          </div>
        )
      }

      {
        tabActiva === "usuarios" && (

          <section className="config-card usuario-card">

            <div className="usuario-title-bar">

              <span className="usuario-title-icon">

                <IconImg
                  name="usuario"
                  alt="Usuario"
                />

              </span>

              <h2>
                Crear Usuarios
              </h2>

            </div>

          </section>

        )
      }

      {
        tabActiva === "procedimientos" && (

          <section className="proc-card">

            <div className="proc-title-bar">

              <span className="usuario-title-icon">

                <IconImg
                  name="procedimiento"
                  alt="Procedimiento"
                />

              </span>

              <h2>

                {
                  procedimientoSeleccionado
                    ? "Procedimiento seleccionado"
                    : "Crear Procedimiento"
                }

              </h2>

              <div className="proc-title-actions">

                <button
                  type="button"
                  onClick={
                    limpiarProcedimiento
                  }
                  title="Nuevo"
                >

                  <IconImg
                    name="nuevo"
                    alt="Nuevo"
                  />

                </button>

                <button
                  type="button"
                  onClick={
                    guardarProcedimiento
                  }
                  title="Guardar"
                >

                  <IconImg
                    name="guardar"
                    alt="Guardar"
                  />

                </button>

              </div>

            </div>

            <div className="proc-form-grid">

              <div className="proc-field">

                <label>
                  Código
                </label>

                <input
                  type="text"
                  name="codigo"
                  value={
                    procedimientoForm.codigo
                  }
                  onChange={
                    handleProcedimientoChange
                  }
                />

              </div>

              <div className="proc-field">

                <label>
                  Nombre
                </label>

                <input
                  type="text"
                  name="nombre"
                  value={
                    procedimientoForm.nombre
                  }
                  onChange={
                    handleProcedimientoChange
                  }
                />

              </div>

              <div className="proc-field">

                <label>
                  Precio
                </label>

                <input
                  type="number"
                  name="precio"
                  value={
                    procedimientoForm.precio
                  }
                  onChange={
                    handleProcedimientoChange
                  }
                />

              </div>

              <div className="proc-field">

                <label>
                  Estado
                </label>

                <select
                  name="estado"
                  value={
                    procedimientoForm.estado
                      ? "true"
                      : "false"
                  }
                  onChange={
                    handleProcedimientoChange
                  }
                >

                  <option value="true">
                    Activo
                  </option>

                  <option value="false">
                    Inactivo
                  </option>

                </select>

              </div>

            </div>

            <div className="proc-search">

              <input
                placeholder="Buscar procedimiento..."
                value={
                  filtroProcedimiento
                }
                onChange={(e) =>
                  setFiltroProcedimiento(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="proc-table">

              <table>

                <thead>

                  <tr>

                    <th>
                      Código
                    </th>

                    <th>
                      Nombre
                    </th>

                    <th>
                      Precio
                    </th>

                    <th>
                      Estado
                    </th>

                    <th>
                      Acciones
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    procedimientosFiltrados
                      .length > 0

                      ? (
                        procedimientosFiltrados.map(
                          (p) => (

                            <tr
                              key={p._id}
                            >

                              <td>
                                {p.codigo}
                              </td>

                              <td>
                                {p.nombre}
                              </td>

                              <td>

                                $
                                {
                                  Number(
                                    p.precio || 0
                                  ).toLocaleString(
                                    "es-CO"
                                  )
                                }

                              </td>

                              <td>

                                {
                                  p.estado
                                    ? "Activo"
                                    : "Inactivo"
                                }

                              </td>

                              <td>

                                <div className="proc-table-actions">

                                  <button
                                    type="button"
                                    className="proc-btn-edit"
                                    onClick={() =>
                                      seleccionarProcedimiento(
                                        p
                                      )
                                    }
                                  >
                                    Editar
                                  </button>

                                  <button
                                    type="button"
                                    className={
                                      p.estado
                                        ? "proc-btn-disable"
                                        : "proc-btn-enable"
                                    }
                                    onClick={() =>
                                      cambiarEstadoProcedimiento(
                                        p
                                      )
                                    }
                                  >

                                    {
                                      p.estado
                                        ? "Deshabilitar"
                                        : "Habilitar"
                                    }

                                  </button>

                                </div>

                              </td>

                            </tr>

                          )
                        )
                      )

                      : (

                        <tr>

                          <td colSpan="5">

                            No hay procedimientos registrados

                          </td>

                        </tr>

                      )
                  }

                </tbody>

              </table>

            </div>

          </section>

        )
      }

      {tabActiva === "consultas" && (
        <section className="consulta-card">
          <div className="consulta-title-bar">
            <span className="usuario-title-icon">
              <IconImg
                name="iconconsultas" alt="iconconsultas" />
            </span>

            <h2>
              {consultaSeleccionada
                ? "Editar Tipo de Consulta"
                : "Crear Tipo de Consulta"}
            </h2>

            <div className="consulta-title-actions">
              <button
                type="button"
                onClick={limpiarConsulta}
                title="Nuevo"
              >
                <IconImg name="nuevo" alt="Nuevo" />
              </button>

              <buttons
                type="button"
                onClick={guardarConsulta}
                title="Guardar"
              >
                <IconImg name="guardar" alt="Guardar" />
              </buttons>
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
                      <td>
                        $
                        {Number(c.precio || 0).toLocaleString(
                          "es-CO"
                        )}
                      </td>
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
                    <td colSpan="5">
                      No hay tipos de consulta registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

    </div>

  );

}