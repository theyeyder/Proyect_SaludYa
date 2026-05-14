import { useEffect, useState } from "react";
import "./citas.css";

const API_CITAS = "http://localhost:4000/api/citas";
const API_PACIENTES = "http://localhost:4000/api/pacientes";

const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const diasSemana = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];

export default function AgendarCita() {
  const hoy = new Date();

  const [anioActual, setAnioActual] = useState(hoy.getFullYear());
  const [citas, setCitas] = useState([]);
  const [mesSeleccionado, setMesSeleccionado] = useState(hoy.getMonth());
  const [diaSeleccionado, setDiaSeleccionado] = useState(hoy.getDate());
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [mostrarReprogramar, setMostrarReprogramar] = useState(false);

  const [reprogramarForm, setReprogramarForm] = useState({
    fecha: "",
    hora: "",
  });

  const [form, setForm] = useState({
    pacienteId: "",
    nombrePaciente: "",
    tipoDocumento: "CC",
    numeroDocumento: "",
    telefono: "",
    correo: "",
    ciudad: "",
    direccion: "",
    medicoId: "medico-001",
    nombreMedico: "Dr. Eyder Arroyo",
    tipoConsulta: "",
    fecha: "",
    hora: "",
    motivo: "",
    observaciones: "",
  });

  const construirFecha = (anio, mes, dia) => {
    const mesFormateado = String(mes + 1).padStart(2, "0");
    const diaFormateado = String(dia).padStart(2, "0");
    return `${anio}-${mesFormateado}-${diaFormateado}`;
  };

  const cargarCitas = async (fecha = "") => {
    try {
      const url = fecha ? `${API_CITAS}?fecha=${fecha}` : API_CITAS;
      const response = await fetch(url);
      const data = await response.json();
      setCitas(data.citas || []);
    } catch (error) {
      console.error("Error al cargar citas:", error);
    }
  };

  useEffect(() => {
    const fechaActualizada = construirFecha(
      anioActual,
      mesSeleccionado,
      diaSeleccionado
    );

    setForm((prev) => ({
      ...prev,
      fecha: fechaActualizada,
    }));

    cargarCitas(fechaActualizada);
  }, [anioActual, mesSeleccionado, diaSeleccionado]);

  const obtenerDiasDelMes = () => {
    return new Date(anioActual, mesSeleccionado + 1, 0).getDate();
  };

  const seleccionarMes = (index) => {
    setMesSeleccionado(index);
    setDiaSeleccionado(1);
    setCitaSeleccionada(null);
  };

  const seleccionarDia = (dia) => {
    setDiaSeleccionado(dia);
    setCitaSeleccionada(null);
  };

  const cambiarMes = (direccion) => {
    let nuevoMes = mesSeleccionado + direccion;
    let nuevoAnio = anioActual;

    if (nuevoMes < 0) {
      nuevoMes = 11;
      nuevoAnio -= 1;
    }

    if (nuevoMes > 11) {
      nuevoMes = 0;
      nuevoAnio += 1;
    }

    setMesSeleccionado(nuevoMes);
    setAnioActual(nuevoAnio);
    setDiaSeleccionado(1);
    setCitaSeleccionada(null);
  };

  const buscarPaciente = async () => {
    try {
      if (!form.tipoDocumento || !form.numeroDocumento) {
        alert("Ingrese tipo y número de documento");
        return;
      }

      const response = await fetch(
        `${API_PACIENTES}/documento/${form.tipoDocumento}/${form.numeroDocumento}`
      );

      const data = await response.json();

      if (!data.ok) {
        alert(data.message || "Paciente no encontrado");
        return;
      }

      const paciente = data.data;
      setPacienteSeleccionado(paciente);

      setForm((prev) => ({
        ...prev,
        pacienteId: paciente._id,
        nombrePaciente: `${paciente.nombres || ""} ${paciente.apellidos || ""}`.trim(),
        tipoDocumento: paciente.tipoIdentificacion || prev.tipoDocumento,
        numeroDocumento: paciente.numeroIdentificacion || prev.numeroDocumento,
        telefono: paciente.telefono || "",
        correo: paciente.correo || "",
        ciudad: paciente.ciudad || "",
        direccion: paciente.direccion || "",
      }));
    } catch (error) {
      console.error("Error al buscar paciente:", error);
      alert("Error al buscar paciente");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarFormulario = () => {
    setPacienteSeleccionado(null);

    setForm({
      pacienteId: "",
      nombrePaciente: "",
      tipoDocumento: "CC",
      numeroDocumento: "",
      telefono: "",
      correo: "",
      ciudad: "",
      direccion: "",
      medicoId: "medico-001",
      nombreMedico: "Dr. Eyder Arroyo",
      tipoConsulta: "",
      fecha: construirFecha(anioActual, mesSeleccionado, diaSeleccionado),
      hora: "",
      motivo: "",
      observaciones: "",
    });
  };

  const guardarCita = async () => {
    try {
      if (!form.pacienteId || !form.nombrePaciente) {
        alert("Debe buscar y seleccionar un paciente");
        return;
      }

      if (!form.nombreMedico || !form.tipoConsulta || !form.fecha || !form.hora) {
        alert("Complete médico, tipo de consulta, fecha y hora");
        return;
      }

      const response = await fetch(API_CITAS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!data.ok) {
        alert(data.message || "No se pudo guardar la cita");
        return;
      }

      alert("Cita agendada correctamente");
      limpiarFormulario();
      setMostrarModal(false);
      cargarCitas(form.fecha);
    } catch (error) {
      console.error("Error al guardar cita:", error);
      alert("Error al guardar cita");
    }
  };

  const cambiarEstadoCita = async (estado) => {
    if (!citaSeleccionada) {
      alert("Seleccione una cita primero");
      return;
    }

    try {
      const response = await fetch(`${API_CITAS}/${citaSeleccionada._id}/estado`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado }),
      });

      const data = await response.json();

      if (!data.ok) {
        alert(data.message || "No se pudo actualizar la cita");
        return;
      }

      setCitaSeleccionada(data.cita);
      cargarCitas(form.fecha);
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      alert("Error al cambiar estado de la cita");
    }
  };

  const abrirReprogramar = () => {
    if (!citaSeleccionada) {
      alert("Seleccione una cita primero");
      return;
    }

    setReprogramarForm({
      fecha: citaSeleccionada.fecha || form.fecha,
      hora: citaSeleccionada.hora || "",
    });

    setMostrarReprogramar(true);
  };

  const guardarReprogramacion = async () => {
    if (!reprogramarForm.fecha || !reprogramarForm.hora) {
      alert("Seleccione nueva fecha y hora");
      return;
    }

    try {
      const response = await fetch(`${API_CITAS}/${citaSeleccionada._id}/reprogramar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reprogramarForm),
      });

      const data = await response.json();

      if (!data.ok) {
        alert(data.message || "No se pudo reprogramar la cita");
        return;
      }

      alert("Cita reprogramada correctamente");
      setMostrarReprogramar(false);
      setCitaSeleccionada(null);
      cargarCitas(form.fecha);
    } catch (error) {
      console.error("Error al reprogramar:", error);
      alert("Error al reprogramar la cita");
    }
  };

  return (
    <div className="citas-container">
      <div className="citas-layout">
        <section className="calendario-zona">
          <div className="calendario-hero">
            <button className="btn-nav-cal" onClick={() => cambiarMes(-1)}>
              &lt;
            </button>

            <div>
              <h2>
                {meses[mesSeleccionado]} {anioActual}
              </h2>
              <p>Seleccione un día para agendar o consultar citas</p>
            </div>

            <button className="btn-nav-cal" onClick={() => cambiarMes(1)}>
              &gt;
            </button>
          </div>

          <div className="meses-mini">
            {[-2, -1, 0, 1, 2].map((offset) => {
              let mesIndex = mesSeleccionado + offset;
              let anio = anioActual;

              if (mesIndex < 0) {
                mesIndex += 12;
                anio -= 1;
              }

              if (mesIndex > 11) {
                mesIndex -= 12;
                anio += 1;
              }

              return (
                <button
                  key={`${mesIndex}-${anio}`}
                  className={`mes-mini ${offset === 0 ? "active" : ""}`}
                  onClick={() => {
                    setMesSeleccionado(mesIndex);
                    setAnioActual(anio);
                    setDiaSeleccionado(1);
                  }}
                >
                  <strong>{meses[mesIndex]}</strong>
                  <span>{anio}</span>
                </button>
              );
            })}
          </div>

          <div className="calendario-grande">
            <div className="dias-semana">
              {diasSemana.map((dia) => (
                <div key={dia} className="dia-semana">
                  {dia}
                </div>
              ))}
            </div>

            <div className="dias-grid">
              {[...Array(obtenerDiasDelMes())].map((_, index) => {
                const dia = index + 1;

                return (
                  <div
                    key={dia}
                    className={`dia ${diaSeleccionado === dia ? "selected" : ""}`}
                    onClick={() => seleccionarDia(dia)}
                  >
                    <strong>{dia}</strong>
                    <span>{diasSemana[index % 7]}</span>
                  </div>
                );
              })}
            </div>

            <button
              className="btn-agendar-dia"
              onClick={() => setMostrarModal(true)}
            >
              + Agendar cita
            </button>
          </div>
        </section>

        <aside className="panel-citas">
          <h2>Citas del día</h2>
          <p className="fecha-panel">{form.fecha}</p>

          <div className="citas-scroll">
            {citas.length > 0 ? (
              citas.map((cita) => (
                <div
                  key={cita._id}
                  className={`card-cita ${
                    citaSeleccionada?._id === cita._id ? "selected" : ""
                  }`}
                  onClick={() => setCitaSeleccionada(cita)}
                >
                  <h3>{cita.nombrePaciente}</h3>
                  <p>
                    <strong>Documento:</strong> {cita.tipoDocumento}{" "}
                    {cita.numeroDocumento}
                  </p>
                  <p>
                    <strong>Médico:</strong> {cita.nombreMedico}
                  </p>
                  <p>
                    <strong>Consulta:</strong> {cita.tipoConsulta}
                  </p>
                  <p>
                    <strong>Hora:</strong> {cita.hora}
                  </p>
                  <span
                    className={`estado ${String(cita.estado).toLowerCase()}`}
                  >
                    {cita.estado}
                  </span>
                </div>
              ))
            ) : (
              <div className="sin-citas">
                No hay citas registradas para este día
              </div>
            )}
          </div>

          <div className="acciones-fijas">
            <button
              className="btn-cancelar"
              onClick={() => cambiarEstadoCita("Cancelada")}
            >
              Cancelar
            </button>

            <button
              className="btn-confirmar"
              onClick={() => cambiarEstadoCita("Confirmada")}
            >
              Confirmar
            </button>

            <button className="btn-reprogramar" onClick={abrirReprogramar}>
              Reprogramar
            </button>
          </div>
        </aside>
      </div>

      {mostrarModal && (
        <div className="citas-modal-overlay">
          <div className="modal-cita">
            <div className="modal-header-cita">
              <h2>Agendar cita médica</h2>
              <button
                type="button"
                className="btn-cerrar-modal"
                onClick={() => setMostrarModal(false)}
                title="Cerrar"
              >
                <img
                  src="/img/icon/cerrar.png"
                  alt="Cerrar"
                  className="icono-cerrar-modal"
                />
              </button>

              
            </div>

            <div className="buscar-paciente">
              <select
                name="tipoDocumento"
                value={form.tipoDocumento}
                onChange={handleChange}
              >
                <option value="CC">CC</option>
                <option value="TI">TI</option>
                <option value="CE">CE</option>
                <option value="RC">RC</option>
                <option value="PA">PA</option>
              </select>

              <input
                type="text"
                name="numeroDocumento"
                placeholder="Número de documento"
                value={form.numeroDocumento}
                onChange={handleChange}
              />

              <button
                type="button"
                className="btn-buscar-paciente"
                onClick={buscarPaciente}
                title="Buscar paciente"
              >
                <img
                  src="/img/icon/buscar.png"
                  alt="Buscar"
                  className="icono-buscar-img"
                />
              </button>
            </div>

            {pacienteSeleccionado && (
              <div className="info-paciente">
                <h3>Datos del paciente</h3>

                <div className="info-grid">
                  <div className="info-item">
                    <strong>Paciente:</strong> {form.nombrePaciente}
                  </div>
                  <div className="info-item">
                    <strong>Documento:</strong> {form.tipoDocumento}{" "}
                    {form.numeroDocumento}
                  </div>
                  <div className="info-item">
                    <strong>Teléfono:</strong>{" "}
                    {form.telefono || "No registrado"}
                  </div>
                  <div className="info-item">
                    <strong>Correo:</strong> {form.correo || "No registrado"}
                  </div>
                  <div className="info-item">
                    <strong>Ciudad:</strong> {form.ciudad || "No registrada"}
                  </div>
                  <div className="info-item">
                    <strong>Dirección:</strong>{" "}
                    {form.direccion || "No registrada"}
                  </div>
                </div>
              </div>
            )}

            <div className="form-grid">
              <div className="form-group">
                <label>Médico asignado</label>
                <input
                  type="text"
                  name="nombreMedico"
                  value={form.nombreMedico}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Tipo de consulta</label>
                <select
                  name="tipoConsulta"
                  value={form.tipoConsulta}
                  onChange={handleChange}
                >
                  <option value="">Seleccione</option>
                  <option value="Consulta general">Consulta general</option>
                  <option value="Consulta especializada">
                    Consulta especializada
                  </option>
                  <option value="Control médico">Control médico</option>
                  <option value="Urgencia">Urgencia</option>
                </select>
              </div>

              <div className="form-group">
                <label>Fecha seleccionada</label>
                <input
                  type="date"
                  name="fecha"
                  value={form.fecha}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Hora</label>
                <input
                  type="time"
                  name="hora"
                  value={form.hora}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Motivo de la cita</label>
              <textarea
                name="motivo"
                value={form.motivo}
                onChange={handleChange}
                placeholder="Ingrese el motivo de consulta"
              />
            </div>

            <div className="form-group">
              <label>Observaciones</label>
              <textarea
                name="observaciones"
                value={form.observaciones}
                onChange={handleChange}
                placeholder="Observaciones adicionales"
              />
            </div>

            <div className="acciones-cita">
              <button
                type="button"
                className="btn-guardar-cita"
                onClick={guardarCita}
                title="Guardar cita"
              >
                <img
                  src="/img/icon/guardar.png"
                  alt="Guardar"
                  className="icono-guardar-cita"
                />
              </button>

              
            </div>
          </div>
        </div>
      )}

      {mostrarReprogramar && (
        <div className="citas-modal-overlay">
          <div className="modal-reprogramar">
            <div className="modal-header-cita">
              <h2>Reprogramar cita</h2>
              <button onClick={() => setMostrarReprogramar(false)}>✕</button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Nueva fecha</label>
                <input
                  type="date"
                  value={reprogramarForm.fecha}
                  onChange={(e) =>
                    setReprogramarForm({
                      ...reprogramarForm,
                      fecha: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Nueva hora</label>
                <input
                  type="time"
                  value={reprogramarForm.hora}
                  onChange={(e) =>
                    setReprogramarForm({
                      ...reprogramarForm,
                      hora: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="acciones-cita">
              <button
                className="btn-limpiar"
                onClick={() => setMostrarReprogramar(false)}
              >
                Cerrar
              </button>

              <button className="btn-guardar" onClick={guardarReprogramacion}>
                Guardar reprogramación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}