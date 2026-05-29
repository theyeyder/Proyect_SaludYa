import { useEffect, useState } from "react";
import "./historia.css";

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
  motivoConsulta: "",
  enfermedadActual: "",
  antecedentesPersonales: "",
  antecedentesFamiliares: "",
  alergias: "",
  diagnostico: "",
  conducta: "",
  tratamiento: "",
  observaciones: "",
  imc: "", // Agregado
  clasificacionPeso: "", // Agregado
};

export default function HistoriaClinica() {
  const [citasConfirmadas, setCitasConfirmadas] = useState([]);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [historia, setHistoria] = useState(initialHistoria);
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
      const url = `${API_PACIENTES}/buscar?tipoIdentificacion=${cita.tipoDocumento}&numeroIdentificacion=${cita.numeroDocumento}`;

      const res = await fetch(url);
      const data = await res.json();

      const pacienteEncontrado = data.paciente || data.data || data || null;

      setPaciente(pacienteEncontrado);
    } catch (error) {
      console.error(error);

      setPaciente({
        nombres: cita.nombrePaciente,
        apellidos: "",
        tipoIdentificacion: cita.tipoDocumento,
        numeroIdentificacion: cita.numeroDocumento,
      });
    }
  };

  const llenarHistoria = async (cita) => {
    setCitaSeleccionada(cita);
    setHistoria(initialHistoria);
    await buscarPaciente(cita);
  };

  // Función para calcular IMC
  const calcularIMC = (peso, talla) => {
    const pesoNum = Number(peso);
    const tallaNum = Number(talla);

    if (!pesoNum || !tallaNum) {
      return {
        imc: "",
        clasificacion: "",
      };
    }

    const tallaMetros = tallaNum / 100;

    const imc = (
      pesoNum /
      (tallaMetros * tallaMetros)
    ).toFixed(1);

    let clasificacion = "";

    if (imc < 18.5) {
      clasificacion = "Bajo peso";
    } else if (imc < 25) {
      clasificacion = "Peso normal";
    } else if (imc < 30) {
      clasificacion = "Sobrepeso";
    } else {
      clasificacion = "Obesidad";
    }

    return {
      imc,
      clasificacion,
    };
  };

  // handleChange modificado
  const handleChange = (e) => {
    const { name, value } = e.target;

    const nuevo = {
      ...historia,
      [name]: value,
    };

    if (name === "peso" || name === "talla") {
      const resultado = calcularIMC(
        nuevo.peso,
        nuevo.talla
      );

      nuevo.imc = resultado.imc;
      nuevo.clasificacionPeso = resultado.clasificacion;
    }

    setHistoria(nuevo);
  };

  const guardarHistoria = async () => {
    try {
      if (!citaSeleccionada) {
        setMensaje("Seleccione una cita confirmada");
        setTipoMensaje("error");
        return;
      }

      if (!historia.motivoConsulta || !historia.diagnostico) {
        setMensaje("Complete motivo de consulta y diagnóstico");
        setTipoMensaje("error");
        return;
      }

      const payload = {
        pacienteId: citaSeleccionada.pacienteId,
        citaId: citaSeleccionada._id,
        medicoId: citaSeleccionada.medicoId,

        datosPaciente: {
          nombres:
            paciente?.nombres ||
            paciente?.nombre ||
            citaSeleccionada.nombrePaciente,
          apellidos: paciente?.apellidos || paciente?.apellido || "",
          tipoDocumento:
            paciente?.tipoIdentificacion || citaSeleccionada.tipoDocumento,
          numeroDocumento:
            paciente?.numeroIdentificacion || citaSeleccionada.numeroDocumento,
          telefono: paciente?.telefono || "",
          correo: paciente?.correo || "",
          edad: paciente?.edad || "",
          sexo: paciente?.sexo || "",
          fechaNacimiento: paciente?.fechaNacimiento || "",
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
      };

      const res = await fetch(API_HISTORIAS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(
          data.message || "No fue posible guardar la historia clínica",
        );
        setTipoMensaje("error");
        return;
      }

      setMensaje("Historia clínica guardada correctamente");
      setTipoMensaje("success");

      setCitaSeleccionada(null);
      setPaciente(null);
      setHistoria(initialHistoria);
      obtenerCitasConfirmadas();
    } catch (error) {
      console.error(error);
      setMensaje("Error al guardar historia clínica");
      setTipoMensaje("error");
    }
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

            <button
              type="button"
              className="hc-action-btn"
              onClick={() => {
                setCitaSeleccionada(null);
                setPaciente(null);
              }}
              title="Volver al listado de pacientes"
            >
              <img
                src="/img/icon/Volver.png"
                alt="Volver"
                className="hc-action-icon"
              />
            </button>
          </div>

          <div className="hc-section">
            <h3>Datos del paciente</h3>

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

            {/* Mostrar resultado del IMC */}
            <div className="hc-imc-box">
              <p>
                <strong>IMC:</strong>{" "}
                {historia.imc || "-"}
              </p>
              <p>
                <strong>Estado:</strong>{" "}
                {historia.clasificacionPeso || "-"}
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
            <button className="hc-btn-primary" onClick={guardarHistoria}>
              Guardar HC
            </button>

            <button className="hc-btn-secondary">Órdenes</button>
          </div>
        </section>
      )}
    </div>
  );
}