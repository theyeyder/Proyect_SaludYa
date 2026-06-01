import { useEffect, useState } from "react";
import "./historia.css";
import OrdenesMedicas from "../ordenes/OrdenesMedicas";

const API_CITAS = "http://localhost:4000/api/citas";
const API_HISTORIAS = "http://localhost:4000/api/historias";
const API_PACIENTES = "http://localhost:4000/api/pacientes";

const initialHistoria = {
  peso: "",
  talla: "",
  temperatura: "",
  presionArterial: "",
  frecuenciaCardiaca: "",
  saturacion: "",
  imc: "",
  clasificacionPeso: "",
  motivoConsulta: "",
  enfermedadActual: "",
  antecedentesPersonales: "",
  antecedentesFamiliares: "",
  alergias: "",
  diagnostico: "",
  conducta: "",
  tratamiento: "",
  observaciones: "",
};

export default function HistoriaClinica() {
  const [citasConfirmadas, setCitasConfirmadas] = useState([]);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [historia, setHistoria] = useState(initialHistoria);
  const [historiaAbierta, setHistoriaAbierta] = useState(null);
  const [historialPaciente, setHistorialPaciente] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [mostrarOrdenes, setMostrarOrdenes] = useState(false);
  
  const [fechaInicial, setFechaInicial] = useState(
  new Date().toISOString().split("T")[0]
);

const [fechaFinal, setFechaFinal] = useState(
  new Date().toISOString().split("T")[0]
);

const [vistaHistorias, setVistaHistorias] =
  useState("pendientes");

const [mostrarMenuVista, setMostrarMenuVista] =
  useState(false);

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("info");

  useEffect(() => {
    obtenerCitasConfirmadas();
  }, []);

  const obtenerCitasConfirmadas = async () => {
    try {
      const res = await fetch(API_CITAS);
      const data = await res.json();

      const citas = data.citas || data.data || [];
      const confirmadas = citas.filter((cita) => cita.estado === "Confirmada");

      setCitasConfirmadas(confirmadas);
    } catch (error) {
      console.error(error);
      setMensaje("Error al cargar citas confirmadas");
      setTipoMensaje("error");
    }
  };

  const buscarPaciente = async (cita) => {
    try {
      const url =
        `${API_PACIENTES}/documento/` +
        `${cita.tipoDocumento}/` +
        `${cita.numeroDocumento}`;

      const res = await fetch(url);
      const data = await res.json();

      setPaciente(data.data || null);
    } catch (error) {
      console.error(error);

      setPaciente({
        nombres: cita.nombrePaciente,
        tipoIdentificacion: cita.tipoDocumento,
        numeroIdentificacion: cita.numeroDocumento,
      });
    }
  };

  const cargarHistorialPaciente = async (pacienteId) => {
    try {
      const res = await fetch(`${API_HISTORIAS}/paciente/${pacienteId}`);
      const data = await res.json();

      setHistorialPaciente(data.data || []);
    } catch (error) {
      console.error(error);
      setHistorialPaciente([]);
    }
  };

  const llenarHistoria = async (cita) => {
    setCitaSeleccionada(cita);
    setHistoria(initialHistoria);
    setHistoriaAbierta(null);
    setMostrarHistorial(false);

    await buscarPaciente(cita);

    if (cita.pacienteId) {
      await cargarHistorialPaciente(cita.pacienteId);
    }
  };

  const abrirHistoria = async (id) => {
    try {
      const res = await fetch(`${API_HISTORIAS}/${id}`);
      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible abrir la historia clínica");
        setTipoMensaje("error");
        return;
      }

      const hc = data.data;

      setHistoriaAbierta(hc);

      setHistoria({
        peso: hc.signosVitales?.peso || "",
        talla: hc.signosVitales?.talla || "",
        temperatura: hc.signosVitales?.temperatura || "",
        presionArterial: hc.signosVitales?.presionArterial || "",
        frecuenciaCardiaca: hc.signosVitales?.frecuenciaCardiaca || "",
        saturacion: hc.signosVitales?.saturacion || "",
        imc: hc.signosVitales?.imc || "",
        clasificacionPeso: hc.signosVitales?.clasificacionPeso || "",
        motivoConsulta: hc.motivoConsulta || "",
        enfermedadActual: hc.enfermedadActual || "",
        antecedentesPersonales: hc.antecedentesPersonales || "",
        antecedentesFamiliares: hc.antecedentesFamiliares || "",
        alergias: hc.alergias || "",
        diagnostico: hc.diagnostico || "",
        conducta: hc.conducta || "",
        tratamiento: hc.tratamiento || "",
        observaciones: hc.observaciones || "",
      });

      setMensaje(`Historia ${hc.numeroHistoria || ""} abierta correctamente`);
      setTipoMensaje("info");
    } catch (error) {
      console.error(error);
      setMensaje("Error al abrir historia clínica");
      setTipoMensaje("error");
    }
  };

  const calcularIMC = (peso, talla) => {
    const pesoNum = Number(peso);
    const tallaNum = Number(talla);

    if (!pesoNum || !tallaNum) {
      return { imc: "", clasificacion: "" };
    }

    const tallaMetros = tallaNum / 100;
    const imc = (pesoNum / (tallaMetros * tallaMetros)).toFixed(1);

    let clasificacion = "";

    if (imc < 18.5) clasificacion = "Bajo peso";
    else if (imc < 25) clasificacion = "Peso normal";
    else if (imc < 30) clasificacion = "Sobrepeso";
    else clasificacion = "Obesidad";

    return { imc, clasificacion };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const nuevo = {
      ...historia,
      [name]: value,
    };

    if (name === "peso" || name === "talla") {
      const resultado = calcularIMC(nuevo.peso, nuevo.talla);
      nuevo.imc = resultado.imc;
      nuevo.clasificacionPeso = resultado.clasificacion;
    }

    setHistoria(nuevo);
  };

  const construirPayload = () => ({
    pacienteId: citaSeleccionada.pacienteId,
    citaId: citaSeleccionada._id,
    medicoId: citaSeleccionada.medicoId,

    horaAtencion:
      historiaAbierta?.horaAtencion ||
      new Date().toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),

    datosPaciente: {
      nombres:
        paciente?.nombres || paciente?.nombre || citaSeleccionada.nombrePaciente,
      apellidos: paciente?.apellidos || paciente?.apellido || "",
      tipoDocumento:
        paciente?.tipoIdentificacion || citaSeleccionada.tipoDocumento,
      numeroDocumento:
        paciente?.numeroIdentificacion || citaSeleccionada.numeroDocumento,
      telefono: paciente?.telefono || "",
      direccion: paciente?.direccion || "",
      ciudad: paciente?.ciudad || "",
      correo: paciente?.correo || "",
      edad: paciente?.edad || "",
      sexo: paciente?.sexo || "",
      fechaNacimiento: paciente?.fechaNacimiento || "",
      tipoSangre: paciente?.tipoSangre || "",
      razaEtnia: paciente?.razaEtnia || "",
    },

    datosCita: {
      nombreMedico: citaSeleccionada.nombreMedico,
      tipoConsulta: citaSeleccionada.tipoConsulta,
      fecha: citaSeleccionada.fecha,
      hora: citaSeleccionada.hora,
      motivo: citaSeleccionada.motivo,
    },

    signosVitales: {
      peso: historia.peso,
      talla: historia.talla,
      temperatura: historia.temperatura,
      presionArterial: historia.presionArterial,
      frecuenciaCardiaca: historia.frecuenciaCardiaca,
      saturacion: historia.saturacion,
      imc: historia.imc,
      clasificacionPeso: historia.clasificacionPeso,
    },

    motivoConsulta: historia.motivoConsulta,
    enfermedadActual: historia.enfermedadActual,
    antecedentesPersonales: historia.antecedentesPersonales,
    antecedentesFamiliares: historia.antecedentesFamiliares,
    alergias: historia.alergias,
    diagnostico: historia.diagnostico,
    conducta: historia.conducta,
    tratamiento: historia.tratamiento,
    observaciones: historia.observaciones,
  });

  const guardarHistoria = async () => {
    try {
      if (!citaSeleccionada) {
        setMensaje("Seleccione una cita confirmada");
        setTipoMensaje("error");
        return null;
      }

      if (!historia.motivoConsulta || !historia.diagnostico) {
        setMensaje("Complete motivo de consulta y diagnóstico");
        setTipoMensaje("error");
        return null;
      }

      const payload = construirPayload();

      const url = historiaAbierta?._id
        ? `${API_HISTORIAS}/${historiaAbierta._id}`
        : API_HISTORIAS;

      const method = historiaAbierta?._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible guardar la historia clínica");
        setTipoMensaje("error");
        return null;
      }

      setHistoriaAbierta(data.data);
      setMensaje(
        historiaAbierta?._id
          ? "Historia clínica actualizada correctamente"
          : "Historia clínica guardada correctamente"
      );
      setTipoMensaje("success");

      if (citaSeleccionada?.pacienteId) {
        await cargarHistorialPaciente(citaSeleccionada.pacienteId);
      }

      return data.data;
    } catch (error) {
      console.error(error);
      setMensaje("Error al guardar historia clínica");
      setTipoMensaje("error");
      return null;
    }
  };

  const finalizarHistoria = async () => {
    try {
      let historiaParaFinalizar = historiaAbierta;

      if (!historiaParaFinalizar?._id) {
        historiaParaFinalizar = await guardarHistoria();
      }

      if (!historiaParaFinalizar?._id) return;

      const res = await fetch(
        `${API_HISTORIAS}/${historiaParaFinalizar._id}/finalizar`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "No fue posible finalizar la historia");
        setTipoMensaje("error");
        return;
      }

      setHistoriaAbierta(data.data);
      setMensaje("Historia clínica finalizada correctamente");
      setTipoMensaje("success");

      if (citaSeleccionada?.pacienteId) {
        await cargarHistorialPaciente(citaSeleccionada.pacienteId);
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al finalizar historia clínica");
      setTipoMensaje("error");
    }
  };

  const cerrarFormulario = () => {
    setCitaSeleccionada(null);
    setPaciente(null);
    setHistoria(initialHistoria);
    setHistoriaAbierta(null);
    setHistorialPaciente([]);
    setMostrarHistorial(false);
    obtenerCitasConfirmadas();
  };

  return (
    <div className="historia-page">
      {mensaje && (
        <div className={`historia-alert historia-alert--${tipoMensaje}`}>
          {mensaje}
        </div>
      )}

      {!citaSeleccionada && (
        <section className="hc-card">
          <div className="hc-title-bar">
            <h2>Pacientes pendientes por Historia Clínica</h2>
          </div>

          <div className="hc-table">
            <table>
              <thead>
                <tr>
                  <th>Documento</th>
                  <th>Paciente</th>
                  <th>Médico</th>
                  <th>Tipo consulta</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>
                {citasConfirmadas.length > 0 ? (
                  citasConfirmadas.map((cita) => (
                    <tr key={cita._id}>
                      <td>
                        {cita.tipoDocumento} {cita.numeroDocumento}
                      </td>
                      <td>{cita.nombrePaciente}</td>
                      <td>{cita.nombreMedico}</td>
                      <td>{cita.tipoConsulta}</td>
                      <td>{cita.fecha}</td>
                      <td>{cita.hora}</td>
                      <td>
                        <button
                          type="button"
                          className="hc-action-btn"
                          onClick={() => llenarHistoria(cita)}
                          title="Llenar Historia Clínica"
                        >
                          <img
                            src="/img/icon/Llenar.png"
                            alt="Llenar"
                            className="hc-action-icon"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">
                      No hay pacientes confirmados para atención.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
      

      {citaSeleccionada && (
        <section className="hc-card">
          <div className="hc-title-bar">
            <h2>Historia Clínica</h2>

            <div className="hc-title-actions">
              <button
                type="button"
                className="hc-action-btn"
                onClick={cerrarFormulario}
                title="Volver al listado de pacientes"
              >
                <img
                  src="/img/icon/Volver.png"
                  alt="Volver"
                  className="hc-action-icon"
                />
              </button>
            </div>
          </div>

          <div className="hc-section">
            <h3>Datos del paciente</h3>

            <div className="hc-top-layout">
              <div className="hc-paciente-panel">
                <div className="hc-data-grid">
                  <p>
                    <b>Paciente:</b>{" "}
                    {paciente?.nombres || citaSeleccionada.nombrePaciente}{" "}
                    {paciente?.apellidos || ""}
                  </p>

                  <p>
                    <b>Documento:</b> {citaSeleccionada.tipoDocumento}{" "}
                    {citaSeleccionada.numeroDocumento}
                  </p>

                  <p>
                    <b>Teléfono:</b> {paciente?.telefono || "-"}
                  </p>

                  <p>
                    <b>Dirección:</b> {paciente?.direccion || "-"}
                  </p>

                  <p>
                    <b>Ciudad:</b> {paciente?.ciudad || "-"}
                  </p>

                  <p>
                    <b>Edad:</b> {paciente?.edad || "-"}
                  </p>

                  <p>
                    <b>Sexo:</b> {paciente?.sexo || "-"}
                  </p>

                  <p>
                    <b>Fecha nacimiento:</b> {paciente?.fechaNacimiento || "-"}
                  </p>

                  <p>
                    <b>Correo:</b> {paciente?.correo || "-"}
                  </p>

                  <p>
                    <b>Médico:</b> {citaSeleccionada.nombreMedico}
                  </p>

                  <p>
                    <b>Tipo consulta:</b> {citaSeleccionada.tipoConsulta}
                  </p>

                  <p>
                    <b>Hora cita:</b> {citaSeleccionada.hora}
                  </p>

                  <p>
                    <b>Ingreso actual:</b>{" "}
                    {historiaAbierta?.numeroIngreso ||
                      historialPaciente.length + 1}
                  </p>

                  <p>
                    <b>Historia clínica:</b>{" "}
                    {historiaAbierta?.numeroHistoria || "Pendiente por guardar"}
                  </p>

                  <p>
                    <b>Hora atención:</b>{" "}
                    {historiaAbierta?.horaAtencion || "Pendiente por guardar"}
                  </p>

                  <p>
                    <b>Estado HC:</b>{" "}
                    {historiaAbierta?.estadoHistoria || "Abierta"}
                  </p>
                </div>
              </div>

              <aside className="hc-side-history">
                <div className="hc-side-header">Historial Clínico</div>

                {historialPaciente.length === 0 ? (
                  <p className="hc-historial-empty">
                    No existen historias clínicas anteriores.
                  </p>
                ) : (
                  historialPaciente.map((item) => (
                    <button
                      key={item._id}
                      type="button"
                      className="hc-side-link"
                      onClick={() => abrirHistoria(item._id)}
                      title="Abrir historia clínica"
                    >
                      <span>Ingreso #{item.numeroIngreso || "-"}</span>
                      <strong>{item.numeroHistoria || "HC sin número"}</strong>
                    </button>
                  ))
                )}
              </aside>
            </div>
          </div>

          <div className="hc-section">
            <h3>Signos vitales</h3>

            <div className="hc-form-grid">
              <input
                name="peso"
                placeholder="Peso"
                value={historia.peso}
                onChange={handleChange}
              />

              <input
                name="talla"
                placeholder="Talla"
                value={historia.talla}
                onChange={handleChange}
              />

              <input
                name="temperatura"
                placeholder="Temperatura"
                value={historia.temperatura}
                onChange={handleChange}
              />

              <input
                name="presionArterial"
                placeholder="Presión arterial"
                value={historia.presionArterial}
                onChange={handleChange}
              />

              <input
                name="frecuenciaCardiaca"
                placeholder="Frecuencia cardiaca"
                value={historia.frecuenciaCardiaca}
                onChange={handleChange}
              />

              <input
                name="saturacion"
                placeholder="Saturación"
                value={historia.saturacion}
                onChange={handleChange}
              />
            </div>

            <div className="hc-imc-box">
              <p>
                <strong>IMC:</strong> {historia.imc || "-"}
              </p>

              <p>
                <strong>Estado:</strong> {historia.clasificacionPeso || "-"}
              </p>
            </div>
          </div>

          <div className="hc-section">
            <h3>Consulta médica</h3>

            <textarea
              name="motivoConsulta"
              placeholder="Motivo de consulta"
              value={historia.motivoConsulta}
              onChange={handleChange}
            />

            <h3>Enfermedad actual</h3>
            <textarea
              name="enfermedadActual"
              placeholder="Enfermedad actual"
              value={historia.enfermedadActual}
              onChange={handleChange}
            />

            <h3>Antecedentes personales</h3>
            <textarea
              name="antecedentesPersonales"
              placeholder="Antecedentes personales"
              value={historia.antecedentesPersonales}
              onChange={handleChange}
            />

            <h3>Antecedentes familiares</h3>
            <textarea
              name="antecedentesFamiliares"
              placeholder="Antecedentes familiares"
              value={historia.antecedentesFamiliares}
              onChange={handleChange}
            />

            <h3>Alergias</h3>
            <textarea
              name="alergias"
              placeholder="Alergias"
              value={historia.alergias}
              onChange={handleChange}
            />

            <h3>Diagnóstico</h3>
            <textarea
              name="diagnostico"
              placeholder="Diagnóstico"
              value={historia.diagnostico}
              onChange={handleChange}
            />

            <h3>Conducta médica</h3>
            <textarea
              name="conducta"
              placeholder="Conducta médica"
              value={historia.conducta}
              onChange={handleChange}
            />

            <h3>Tratamiento</h3>
            <textarea
              name="tratamiento"
              placeholder="Tratamiento"
              value={historia.tratamiento}
              onChange={handleChange}
            />

            <h3>Observaciones</h3>
            <textarea
              name="observaciones"
              placeholder="Observaciones"
              value={historia.observaciones}
              onChange={handleChange}
            />
          </div>

          <div className="hc-actions">
            <button
              type="button"
              className="hc-btn-primary"
              onClick={guardarHistoria}
            >
              {historiaAbierta?._id ? "Actualizar HC" : "Guardar HC"}
            </button>

            <button
              type="button"
              className="hc-btn-secondary"
              onClick={finalizarHistoria}
            >
              Finalizar HC
            </button>

            <button
              type="button"
              className="hc-btn-secondary"
              onClick={() => setMostrarOrdenes(true)}
            >
              Órdenes
            </button>
          </div>
        </section>
      )}

      {mostrarOrdenes && (
        <OrdenesMedicas
          historia={historiaAbierta}
          paciente={paciente}
          cita={citaSeleccionada}
          onClose={() => setMostrarOrdenes(false)}
        />
      )}
    </div>
  );
}
