import { useState } from "react";

const API_URL = "http://localhost:4000/api/pacientes";

const initialForm = {
  nombres: "",
  tipoIdentificacion: "CC",
  numeroIdentificacion: "",
  ciudad: "",
  direccion: "",
  fechaNacimiento: "",
  edad: 0,
  telefono: "",
  correo: "",
  razaEtnia: "",
  tipoSangre: "",
  sintomas: "",
  alergico: "No",
  detalleAlergia: "",
  acompanante: "",
  sexo: "Masculino",
  estado: true,
};

export default function RegistrarPaciente() {
  const [form, setForm] = useState(initialForm);

  const [busqueda, setBusqueda] = useState({
    tipoIdentificacion: "CC",
    numeroIdentificacion: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [pacienteId, setPacienteId] = useState(null);

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 0;

    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (
      mes < 0 ||
      (mes === 0 && hoy.getDate() < nacimiento.getDate())
    ) {
      edad--;
    }

    return edad >= 0 ? edad : 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nuevoValor = type === "checkbox" ? checked : value;

    setForm((prev) => {
      const actualizado = {
        ...prev,
        [name]: nuevoValor,
      };

      if (name === "fechaNacimiento") {
        actualizado.edad = calcularEdad(value);
      }

      if (name === "alergico" && value === "No") {
        actualizado.detalleAlergia = "";
      }

      return actualizado;
    });
  };

  const handleBusquedaChange = (e) => {
    const { name, value } = e.target;
    setBusqueda((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const limpiarFormulario = () => {
    setForm({
      ...initialForm,
      tipoIdentificacion: busqueda.tipoIdentificacion || "CC",
      numeroIdentificacion: busqueda.numeroIdentificacion || "",
    });
    setModoEdicion(false);
    setPacienteId(null);
    setMensaje("");
  };

  const buscarPaciente = async () => {
    setMensaje("");

    try {
      if (!busqueda.numeroIdentificacion.trim()) {
        setMensaje("Ingrese un número de documento para buscar");
        return;
      }

      const res = await fetch(
        `${API_URL}/documento/${busqueda.tipoIdentificacion}/${busqueda.numeroIdentificacion}`
      );

      const data = await res.json();

      if (!res.ok) {
        setForm({
          ...initialForm,
          tipoIdentificacion: busqueda.tipoIdentificacion,
          numeroIdentificacion: busqueda.numeroIdentificacion,
        });
        setModoEdicion(false);
        setPacienteId(null);
        setMensaje("Paciente no encontrado. Puede registrarlo.");
        return;
      }

      const paciente = data.data;

      setForm({
        nombres: paciente.nombres || "",
        tipoIdentificacion: paciente.tipoIdentificacion || "CC",
        numeroIdentificacion: paciente.numeroIdentificacion || "",
        ciudad: paciente.ciudad || "",
        direccion: paciente.direccion || "",
        fechaNacimiento: paciente.fechaNacimiento || "",
        edad: paciente.edad || 0,
        telefono: paciente.telefono || "",
        correo: paciente.correo || "",
        razaEtnia: paciente.razaEtnia || "",
        tipoSangre: paciente.tipoSangre || "",
        sintomas: paciente.sintomas || "",
        alergico: paciente.alergico || "No",
        detalleAlergia: paciente.detalleAlergia || "",
        acompanante: paciente.acompanante || "",
        sexo: paciente.sexo || "Masculino",
        estado:
          typeof paciente.estado === "boolean" ? paciente.estado : true,
      });

      setModoEdicion(true);
      setPacienteId(paciente._id);
      setMensaje("Paciente encontrado y cargado en el formulario");
    } catch (error) {
      console.error("Error al buscar paciente:", error);
      setMensaje("Error en búsqueda");
    }
  };

  const guardarPaciente = async () => {
    setMensaje("");

    try {
      const dataToSend = {
        ...form,
        edad: calcularEdad(form.fechaNacimiento),
        alergico: form.alergico || "No",
        detalleAlergia:
          form.alergico === "Si" ? form.detalleAlergia || "" : "",
        sexo: form.sexo || "Masculino",
      };

      const url = modoEdicion ? `${API_URL}/${pacienteId}` : API_URL;
      const method = modoEdicion ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible guardar el paciente");
        return;
      }

      setMensaje(
        modoEdicion
          ? "Paciente actualizado correctamente"
          : "Paciente registrado correctamente"
      );

      if (!modoEdicion && data.data?._id) {
        setPacienteId(data.data._id);
        setModoEdicion(true);
      }
    } catch (error) {
      console.error("Error al guardar paciente:", error);
      setMensaje("Error al guardar paciente");
    }
  };

  return (
    <div className="admision-page">
      {mensaje && <div className="admision-alert">{mensaje}</div>}

      <div className="admision-grid">
        <section className="card">
          <div className="card-header">
            <h2>{modoEdicion ? "Editar paciente" : "Registrar paciente"}</h2>
            <span>
              {modoEdicion
                ? "Actualice la información del paciente"
                : "Complete la información del paciente"}
            </span>
          </div>

          <div className="form-grid">
            <div className="form-group full">
              <label>Nombres</label>
              <input
                name="nombres"
                placeholder="Ingrese los nombres"
                value={form.nombres}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Tipo de identificación</label>
              <select
                name="tipoIdentificacion"
                value={form.tipoIdentificacion}
                onChange={handleChange}
              >
                <option value="CC">Cédula de ciudadanía</option>
                <option value="TI">Tarjeta de identidad</option>
                <option value="CE">Cédula de extranjería</option>
                <option value="RC">Registro civil</option>
                <option value="PA">Pasaporte</option>
              </select>
            </div>

            <div className="form-group">
              <label>Número de identificación</label>
              <input
                name="numeroIdentificacion"
                placeholder="Ingrese el número"
                value={form.numeroIdentificacion}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Ciudad</label>
              <input
                name="ciudad"
                placeholder="Ingrese la ciudad"
                value={form.ciudad}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Dirección</label>
              <input
                name="direccion"
                placeholder="Ingrese la dirección"
                value={form.direccion}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Fecha de nacimiento</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={form.fechaNacimiento}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Edad</label>
              <input
                name="edad"
                value={form.edad}
                readOnly
                placeholder="Edad automática"
              />
            </div>

            <div className="form-group">
              <label>Sexo</label>
              <select name="sexo" value={form.sexo} onChange={handleChange}>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input
                name="telefono"
                placeholder="Ingrese el teléfono"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Correo</label>
              <input
                type="email"
                name="correo"
                placeholder="Ingrese el correo"
                value={form.correo}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Raza / Etnia</label>
              <select
                name="razaEtnia"
                value={form.razaEtnia}
                onChange={handleChange}
              >
                <option value="">Seleccione</option>
                <option value="Ninguna">Ninguna</option>
                <option value="Indigena">Indígena</option>
                <option value="Afrocolombiano">Afrocolombiano</option>
                <option value="Rrom">Pueblo Rrom (Gitano)</option>
                <option value="Mestizo">Mestizo</option>
                <option value="Blanco">Blanco</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tipo de sangre</label>
              <select
                name="tipoSangre"
                value={form.tipoSangre}
                onChange={handleChange}
              >
                <option value="">Seleccione</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="form-group full">
              <label>Síntomas</label>
              <textarea
                name="sintomas"
                placeholder="Describa los síntomas"
                value={form.sintomas}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>¿Alérgico?</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="alergico"
                    value="Si"
                    checked={form.alergico === "Si"}
                    onChange={handleChange}
                  />
                  Sí
                </label>
                <label>
                  <input
                    type="radio"
                    name="alergico"
                    value="No"
                    checked={form.alergico === "No"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>

            {form.alergico === "Si" && (
              <div className="form-group">
                <label>Detalle de alergia</label>
                <input
                  name="detalleAlergia"
                  placeholder="Ej: Penicilina"
                  value={form.detalleAlergia}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="form-group">
              <label>Acompañante</label>
              <input
                name="acompanante"
                placeholder="Nombre del acompañante"
                value={form.acompanante}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="actions">
            <button
              className="btn btn-primary"
              type="button"
              onClick={guardarPaciente}
            >
              {modoEdicion ? "Actualizar paciente" : "Guardar paciente"}
            </button>

            <button
              className="btn btn-secondary"
              type="button"
              onClick={limpiarFormulario}
            >
              Limpiar
            </button>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <h2>Búsqueda rápida</h2>
            <span>Busque por tipo y número de identificación</span>
          </div>

          <div className="search-box">
            <select
              name="tipoIdentificacion"
              value={busqueda.tipoIdentificacion}
              onChange={handleBusquedaChange}
            >
              <option value="CC">CC</option>
              <option value="TI">TI</option>
              <option value="CE">CE</option>
              <option value="RC">RC</option>
              <option value="PA">PA</option>
            </select>

            <input
              name="numeroIdentificacion"
              placeholder="Número de identificación"
              value={busqueda.numeroIdentificacion}
              onChange={handleBusquedaChange}
            />

            <button
              className="btn btn-primary"
              type="button"
              onClick={buscarPaciente}
            >
              Buscar
            </button>

            <button
              className="btn btn-secondary"
              type="button"
              onClick={limpiarFormulario}
            >
              Nuevo
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}