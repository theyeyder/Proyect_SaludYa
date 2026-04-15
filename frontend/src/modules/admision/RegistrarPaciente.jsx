import { useState } from "react";
import {
  crearPaciente,
  buscarPacientePorDocumento,
} from "../../api/pacientesApi";

export default function RegistrarPaciente() {
  const [form, setForm] = useState({
    nombres: "",
    tipoIdentificacion: "CC",
    numeroIdentificacion: "",
    ciudad: "",
    direccion: "",
    fechaNacimiento: "",
    sintomas: "",
    alergico: "No",
    acompanante: "",
    sexo: "Masculino",
  });

  const [busqueda, setBusqueda] = useState({
    tipoIdentificacion: "CC",
    numeroIdentificacion: "",
  });
 

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      nombres: "",
      tipoIdentificacion: busqueda.tipoIdentificacion || "CC",
      numeroIdentificacion: busqueda.numeroIdentificacion || "",
      ciudad: "",
      direccion: "",
      fechaNacimiento: "",
      sintomas: "",
      alergico: "No",
      acompanante: "",
      sexo: "Masculino",
    });
  };

  const buscarPaciente = async () => {
    setMensaje("");

    try {
      if (!busqueda.numeroIdentificacion.trim()) {
        setMensaje("Ingrese un número de documento para buscar");
        return;
      }

      const data = await buscarPacientePorDocumento(
        busqueda.tipoIdentificacion,
        busqueda.numeroIdentificacion
      );

      if (data.ok && data.data) {
        const paciente = data.data;

        setForm({
          nombres: paciente.nombres || "",
          tipoIdentificacion: paciente.tipoIdentificacion || "CC",
          numeroIdentificacion: paciente.numeroIdentificacion || "",
          ciudad: paciente.ciudad || "",
          direccion: paciente.direccion || "",
          fechaNacimiento: paciente.fechaNacimiento || "",
          sintomas: paciente.sintomas || "",
          alergico: paciente.alergico || "No",
          acompanante: paciente.acompanante || "",
          sexo: paciente.sexo || "Masculino",
        });

        setMensaje("Paciente encontrado y cargado en el formulario");
      } else {
        setForm({
          nombres: "",
          tipoIdentificacion: busqueda.tipoIdentificacion,
          numeroIdentificacion: busqueda.numeroIdentificacion,
          ciudad: "",
          direccion: "",
          fechaNacimiento: "",
          sintomas: "",
          alergico: "No",
          acompanante: "",
          sexo: "Masculino",
        });

        setMensaje("Paciente no encontrado. Puede registrarlo.");
      }
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
        alergico: form.alergico || "No",
        sexo: form.sexo || "Masculino",
      };

      const data = await crearPaciente(dataToSend);

      if (data.ok) {
        setMensaje(data.message || "Paciente registrado correctamente");
      } else {
        setMensaje(data.message || "No fue posible guardar el paciente");
      }
    } catch (error) {
      console.error("Error al guardar paciente:", error);
      setMensaje("Error al guardar paciente");
    }
  };

  return (
    <div className="admision-page">
      <div className="admision-header">
        
      </div>

    
      {mensaje && <div className="admision-alert">{mensaje}</div>}

      <div className="admision-grid">
        <section className="card">
          <div className="card-header">
            <h2>Registrar paciente</h2>
            <span>Complete la información del paciente</span>
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
              <label>Sexo</label>
              <select name="sexo" value={form.sexo} onChange={handleChange}>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
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
              Guardar paciente
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
          </div>
        </section>
      </div>
    </div>
  );
}