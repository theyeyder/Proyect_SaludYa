import { useState } from "react";
import "./consultaDocumentos.css";

const API_DOCUMENTOS = "http://localhost:4000/api/documentos";
const API_PACIENTES = "http://localhost:4000/api/pacientes";

export default function ConsultaDocumentos() {
  const [tipoDocumento, setTipoDocumento] = useState("CC");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [paciente, setPaciente] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const buscarDocumentos = async () => {
    try {
      if (!numeroDocumento.trim()) {
        setMensaje("Digite el número de documento");
        setPaciente(null);
        setDocumentos([]);
        return;
      }

      setCargando(true);
      setMensaje("");

      const resPaciente = await fetch(
        `${API_PACIENTES}/documento/${tipoDocumento}/${numeroDocumento}`
      );

      const dataPaciente = await resPaciente.json();

      if (resPaciente.ok) {
        setPaciente(dataPaciente.data);
      } else {
        setPaciente(null);
      }

      const resDocs = await fetch(
        `${API_DOCUMENTOS}/${tipoDocumento}/${numeroDocumento}`
      );

      const dataDocs = await resDocs.json();

      setDocumentos(Array.isArray(dataDocs) ? dataDocs : dataDocs.data || []);
    } catch (error) {
      console.error(error);
      setMensaje("Error al consultar documentos");
    } finally {
      setCargando(false);
    }
  };

  const obtenerUrlDocumento = (archivoUrl) => {
    if (!archivoUrl) return "";

    return archivoUrl.startsWith("http")
      ? archivoUrl
      : `http://localhost:4000${archivoUrl}`;
  };

  const abrirDocumento = (archivoUrl) => {
    const url = obtenerUrlDocumento(archivoUrl);
    if (!url) return;

    window.open(url, "_blank");
  };

  const imprimirDocumento = (archivoUrl) => {
    const url = obtenerUrlDocumento(archivoUrl);
    if (!url) return;

    const ventana = window.open(url, "_blank");

    if (ventana) {
      ventana.onload = () => {
        ventana.focus();
        ventana.print();
      };
    }
  };

  const limpiarBusqueda = () => {
    setNumeroDocumento("");
    setPaciente(null);
    setDocumentos([]);
    setMensaje("");
  };

  return (
    <div className="doc-page">
      <div className="doc-card">
        <div className="doc-header">
          <div className="doc-header-left">
            <div className="doc-logo">
              <div className="doc-logo-icon">
                <img
                  src="/img/icon/logo.png"
                  alt="SaludYa"
                  className="doc-logo-img"
                />
              </div>

              <div className="doc-logo-text">
                <span className="doc-logo-title">SaludYa</span>
                <span className="doc-logo-subtitle">
                  Sistema de Gestión Clínica
                </span>
              </div>
            </div>

            <div className="doc-header-title">
              <h1>Consulta de Documentos Médicos</h1>
              <p>
                Busque documentos por tipo y número de identificación del
                paciente
              </p>
            </div>
          </div>

          <button
            type="button"
            className="doc-header-btn"
            title="Regresar"
            onClick={() => window.history.back()}
          >
            <img
              src="/img/icon/volver.png"
              alt="Volver"
              className="doc-header-icon"
            />
          </button>
        </div>

        <div className="doc-search">
          <div className="doc-search-group">
            <label className="doc-search-label">Tipo de documento</label>

            <select
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
              className="doc-search-select"
            >
              <option value="CC">Cédula de Ciudadanía (CC)</option>
              <option value="TI">Tarjeta de Identidad (TI)</option>
              <option value="CE">Cédula de Extranjería (CE)</option>
              <option value="PA">Pasaporte (PA)</option>
            </select>
          </div>

          <div className="doc-search-group">
            <label className="doc-search-label">Número de documento</label>

            <input
              type="text"
              placeholder="Ej: 123456789"
              value={numeroDocumento}
              onChange={(e) => setNumeroDocumento(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  buscarDocumentos();
                }
              }}
              className="doc-search-input"
            />
          </div>

          <div className="doc-actions">
            <button
              type="button"
              className="doc-icon-btn doc-btn-search"
              onClick={buscarDocumentos}
              disabled={cargando}
              title="Buscar"
            >
              {cargando ? (
                <span className="doc-spinner"></span>
              ) : (
                <img
                  src="/img/icon/buscar.png"
                  alt="Buscar"
                  className="doc-action-icon"
                />
              )}
            </button>

            {numeroDocumento && (
              <button
                type="button"
                className="doc-icon-btn doc-btn-clear"
                onClick={limpiarBusqueda}
                title="Limpiar"
              >
                <img
                  src="/img/icon/limpiar.png"
                  alt="Limpiar"
                  className="doc-action-icon"
                />
              </button>
            )}
          </div>
        </div>

        {mensaje && (
          <div
            className={`doc-message ${
              mensaje.includes("Error")
                ? "doc-message-error"
                : "doc-message-info"
            }`}
          >
            {mensaje}
          </div>
        )}

        {paciente && (
          <div className="doc-paciente-card">
            <div className="doc-paciente-header">
              <div className="doc-paciente-avatar">
                <img
                  src="/img/icon/paciente.png"
                  alt="Paciente"
                  className="doc-paciente-icon"
                />
              </div>

              <div className="doc-paciente-info">
                <h3>
                  {paciente.nombres} {paciente.apellidos || ""}
                </h3>

                <div className="doc-paciente-details">
                  <span className="doc-paciente-badge">
                    {paciente.tipoIdentificacion}{" "}
                    {paciente.numeroIdentificacion}
                  </span>

                  <span className="doc-paciente-badge">
                    Fecha nacimiento:{" "}
                    {paciente.fechaNacimiento || "No registrada"}
                  </span>

                  {paciente.edad && (
                    <span className="doc-paciente-badge">
                      Edad: {paciente.edad} años
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="doc-list">
          <div className="doc-list-header">
            <h3>Documentos disponibles</h3>

            {documentos.length > 0 && (
              <span className="doc-list-count">
                {documentos.length} documento(s)
              </span>
            )}
          </div>

          {documentos.length > 0 ? (
            <div className="doc-grid">
              {documentos.map((doc) => (
                <div key={doc._id} className="doc-item">
                  <div className="doc-item-icon">
                    <img
                      src="/img/icon/pdf.png"
                      alt="PDF"
                      className="doc-file-icon"
                    />
                  </div>

                  <div className="doc-item-content">
                    <div className="doc-title">
                      <img
                        src="/img/icon/factura.png"
                        alt="Documento"
                        className="doc-title-icon"
                      />

                      <span>{doc.titulo}</span>
                    </div>

                    {doc.fecha && <div className="doc-date">{doc.fecha}</div>}

                    {doc.descripcion && (
                      <div className="doc-desc">{doc.descripcion}</div>
                    )}
                  </div>

                  <div className="doc-item-actions">
                    <button
                      type="button"
                      className="doc-icon-action doc-print"
                      onClick={() => imprimirDocumento(doc.archivoUrl)}
                      title="Imprimir PDF"
                    >
                      <img
                        src="/img/icon/imprimir.png"
                        alt="Imprimir"
                        className="doc-action-icon"
                      />
                    </button>

                    <button
                      type="button"
                      className="doc-icon-action doc-view"
                      onClick={() => abrirDocumento(doc.archivoUrl)}
                      title="Ver PDF"
                    >
                      <img
                        src="/img/icon/ver.png"
                        alt="Ver"
                        className="doc-action-icon"
                      />
                    </button>

                    <a
                      className="doc-icon-action doc-download-icon"
                      href={obtenerUrlDocumento(doc.archivoUrl)}
                      download
                      title="Descargar PDF"
                    >
                      <img
                        src="/img/icon/descargarpdf.png"
                        alt="Descargarpdf"
                        className="doc-action-icon"
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !cargando && (
              <div className="doc-empty">
                <img
                  src="/img/icon/sindocumento.png"
                  alt="Sin documentos"
                  className="doc-empty-icon"
                />

                <p>No hay documentos para mostrar</p>

                <span>
                  Realice una búsqueda para encontrar documentos médicos
                  asociados al paciente
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}