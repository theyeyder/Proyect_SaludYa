import { useEffect, useRef, useState } from "react";
import "./facturacion.css";

const API_PACIENTES = "http://localhost:4000/api/pacientes";
const API_ORDENES = "http://localhost:4000/api/ordenes";
const API_FACTURAS = "http://localhost:4000/api/facturas";
const API_CITAS = "http://localhost:4000/api/citas";

const fechaHoy = () => new Date().toISOString().slice(0, 10);

const formatoMoneda = (valor) =>
  `$${Number(valor || 0).toLocaleString("es-CO")}`;

export default function GenerarFactura() {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState(null);
  const [ordenes, setOrdenes] = useState([]);
  const [detalle, setDetalle] = useState([]);

  const [mensaje, setMensaje] = useState("");
  const [mostrarBuscar, setMostrarBuscar] = useState(false);
  const [textoBuscar, setTextoBuscar] = useState("");

  const [tipoConsulta, setTipoConsulta] = useState("");
  const [valorConsulta, setValorConsulta] = useState("");
  const [consultaDetalle, setConsultaDetalle] = useState(null);
  const [nombreMedico, setNombreMedico] = useState("");
  const [numeroFacturaVista, setNumeroFacturaVista] = useState("FAC-000001");

  const [posBuscar, setPosBuscar] = useState({ x: 0, y: 0 });
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
  });

  useEffect(() => {
    cargarPacientes();
  }, []);

  const cargarPacientes = async () => {
    try {
      const res = await fetch(API_PACIENTES);
      const data = await res.json();

      setPacientes(data.data || []);
    } catch (error) {
      console.error(error);
      setMensaje("Error al cargar pacientes");
    }
  };

  const cargarCitaPaciente = async (pacienteId) => {
    try {
      const res = await fetch(API_CITAS);
      const data = await res.json();

      const citas = data.citas || data.data || [];

      const cita = citas
        .filter((c) => c.pacienteId === pacienteId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

      if (!cita) {
        setTipoConsulta("");
        setNombreMedico("");
        return null;
      }

      setTipoConsulta(cita.tipoConsulta || "");
      setNombreMedico(cita.nombreMedico || "");

      return cita;
    } catch (error) {
      console.error(error);
      setTipoConsulta("");
      setNombreMedico("");
      return null;
    }
  };

  const iniciarArrastre = (e) => {
    dragRef.current = {
      active: true,
      startX: e.clientX - posBuscar.x,
      startY: e.clientY - posBuscar.y,
    };

    document.addEventListener("mousemove", moverVentana);
    document.addEventListener("mouseup", soltarVentana);
  };

  const moverVentana = (e) => {
    if (!dragRef.current.active) return;

    setPosBuscar({
      x: e.clientX - dragRef.current.startX,
      y: e.clientY - dragRef.current.startY,
    });
  };

  const soltarVentana = () => {
    dragRef.current.active = false;

    document.removeEventListener("mousemove", moverVentana);
    document.removeEventListener("mouseup", soltarVentana);
  };

  const seleccionarPaciente = async (p) => {
    setPaciente(p);
    setMostrarBuscar(false);
    setConsultaDetalle(null);
    setValorConsulta("");
    setMensaje("");

    await cargarCitaPaciente(p._id);
    await cargarOrdenesPaciente(p._id);
  };

  const cargarOrdenesPaciente = async (pacienteId) => {
    try {
      const res = await fetch(`${API_ORDENES}/paciente/${pacienteId}`);
      const data = await res.json();

      const ordenesPaciente = data.data || [];
      setOrdenes(ordenesPaciente);

      const detalleFactura = [];

      ordenesPaciente
        .filter(
          (orden) =>
            orden.estado === "Activa" &&
            (orden.tipo === "procedimiento" || orden.tipo === "laboratorio"),
        )
        .forEach((orden) => {
          orden.items?.forEach((item) => {
            const cantidad = Number(item.cantidad || 1);
            const valorUnitario = Number(item.precio || 0);

            detalleFactura.push({
              tipo: orden.tipo,
              codigo: item.codigo || "",
              descripcion: item.nombre || item.descripcion || "",
              cantidad,
              valorUnitario,
              total: cantidad * valorUnitario,
            });
          });
        });

      setDetalle(detalleFactura);
    } catch (error) {
      console.error(error);
      setMensaje("Error al cargar órdenes médicas");
    }
  };

  const cargarConsulta = () => {
    if (!tipoConsulta) {
      setMensaje("No hay tipo de consulta para cargar");
      return;
    }

    if (!valorConsulta || Number(valorConsulta) <= 0) {
      setMensaje("Digite el valor de la consulta");
      return;
    }

    setConsultaDetalle({
      tipo: "Consulta",
      nombre: tipoConsulta,
      valor: Number(valorConsulta || 0),
    });

    setMensaje("Consulta cargada correctamente");
  };

  const eliminarConsulta = () => {
    setConsultaDetalle(null);
    setValorConsulta("");
  };

  const limpiarFactura = () => {
    setPaciente(null);
    setOrdenes([]);
    setDetalle([]);
    setTipoConsulta("");
    setValorConsulta("");
    setConsultaDetalle(null);
    setNombreMedico("");
    setMensaje("");
    setTextoBuscar("");
    setNumeroFacturaVista("FAC-000001");
  };

  const totalProcedimientosLaboratorios = detalle.reduce(
    (acc, item) => acc + Number(item.total || 0),
    0,
  );

  const totalConsulta = consultaDetalle?.valor || 0;
  const subtotal = totalProcedimientosLaboratorios + totalConsulta;
  const total = subtotal;

  const detalleParaGuardar = [
    ...detalle,
    ...(consultaDetalle
      ? [
          {
            tipo: "consulta",
            codigo: "CONSULTA",
            descripcion: consultaDetalle.nombre,
            cantidad: 1,
            valorUnitario: consultaDetalle.valor,
            total: consultaDetalle.valor,
          },
        ]
      : []),
  ];

  const guardarFactura = async () => {
    try {
      if (!paciente) {
        setMensaje("Seleccione un paciente");
        return;
      }

      if (detalleParaGuardar.length === 0) {
        setMensaje("No hay detalle para facturar");
        return;
      }

      const primeraOrden = ordenes[0];

      const payload = {
        pacienteId: paciente._id,
        historiaId: primeraOrden?.historiaId || "",
        citaId: "",
        medicoId: primeraOrden?.medicoId || "",

        datosPaciente: {
          nombres: paciente.nombres || "",
          apellidos: paciente.apellidos || "",
          tipoDocumento: paciente.tipoIdentificacion || "",
          numeroDocumento: paciente.numeroIdentificacion || "",
          fechaNacimiento: paciente.fechaNacimiento || "",
          telefono: paciente.telefono || "",
          correo: paciente.correo || "",
        },

        datosMedico: {
          nombreMedico:
            nombreMedico || primeraOrden?.datosMedico?.nombreMedico || "",
        },

        tipoConsulta,
        valorConsulta: Number(consultaDetalle?.valor || 0),

        detalle: detalleParaGuardar,
        subtotal,
        total,
        estadoPago: "Pendiente",
        fechaEmision: fechaHoy(),
      };

      const res = await fetch(API_FACTURAS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "Error al guardar factura");
        return;
      }

      setNumeroFacturaVista(data.data?.numeroFactura || numeroFacturaVista);

      setMensaje(
        `Factura ${
          data.data?.numeroFactura || ""
        } creada correctamente. El PDF quedó disponible en Documentos.`,
      );
    } catch (error) {
      console.error(error);
      setMensaje("Error al guardar factura");
    }
  };

  const pacientesFiltrados = pacientes.filter((p) => {
    const texto = `
      ${p.nombres || ""}
      ${p.tipoIdentificacion || ""}
      ${p.numeroIdentificacion || ""}
      ${p.fechaNacimiento || ""}
      ${p.telefono || ""}
      ${p.correo || ""}
    `.toLowerCase();

    return texto.includes(textoBuscar.toLowerCase());
  });

  return (
    <div className="fact-page">
      {mensaje && <div className="fact-alert">{mensaje}</div>}

      <section className="fact-card">
        <div className="fact-title-bar fact-title-gradient">
          <div className="fact-title-left">
            <img
              src="/img/icon/factura.png"
              alt="Facturación"
              className="fact-title-icon"
            />

            <h2>Facturación</h2>
          </div>

          <div className="fact-title-actions">
            <button
              type="button"
              className="fact-main-btn fact-btn-guardar"
              onClick={() => setMostrarBuscar(true)}
              title="Buscar paciente"
            >
              <img
                src="/img/icon/buscar.png"
                alt="Buscar"
                className="fact-action-icon"
              />
            </button>

            <button
              type="button"
              className="fact-main-btn fact-btn-buscar"
              onClick={guardarFactura}
              title="Guardar factura"
            >
              <img
                src="/img/icon/guardar.png"
                alt="Guardar"
                className="fact-action-icon"
              />
            </button>

            <button
              type="button"
              className="fact-main-btn fact-btn-limpiar"
              onClick={limpiarFactura}
              title="Limpiar"
            >
              <img
                src="/img/icon/limpiar.png"
                alt="Limpiar"
                className="fact-action-icon"
              />
            </button>
          </div>
        </div>

        <div className="fact-section">
          <h3>Datos del paciente</h3>

          <div className="fact-data-grid">
            <p>
              <span>Paciente:</span>
              <b>{paciente?.nombres || "-"}</b>
            </p>

            <p>
              <span>Documento:</span>
              <b>
                {paciente
                  ? `${paciente.tipoIdentificacion} ${paciente.numeroIdentificacion}`
                  : "-"}
              </b>
            </p>

            <p>
              <span>Fecha nacimiento:</span>
              <b>{paciente?.fechaNacimiento || "-"}</b>
            </p>

            <p>
              <span>Fecha factura:</span>
              <b>{fechaHoy()}</b>
            </p>

            <p>
              <span>Médico:</span>
              <b>{nombreMedico || "-"}</b>
            </p>

            <p>
              <span>N.° Factura:</span>
              <b>{numeroFacturaVista}</b>
            </p>

            <p>
              <span>Estado:</span>
              <b>Pendiente</b>
            </p>
          </div>
        </div>

        <div className="fact-section">
          <h3>Detalle de factura</h3>

          <div className="fact-table">
            <table>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Valor unitario</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {detalle.length > 0 ? (
                  detalle.map((item, index) => (
                    <tr key={index}>
                      <td>{item.tipo}</td>
                      <td>{item.codigo}</td>
                      <td>{item.descripcion}</td>
                      <td>{item.cantidad}</td>
                      <td>{formatoMoneda(item.valorUnitario)}</td>
                      <td>{formatoMoneda(item.total)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      No hay procedimientos o laboratorios cargados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="fact-subtotal-line">
            <b>Subtotal procedimientos y laboratorios:</b>{" "}
            {formatoMoneda(totalProcedimientosLaboratorios)}
          </div>

          <div className="fact-consulta-card">
            <div className="fact-consulta-form">
              <label>Tipo Consulta:</label>

              <input
                value={tipoConsulta}
                onChange={(e) => setTipoConsulta(e.target.value)}
                placeholder="Escribir consulta"
              />

              <label>Valor Consulta:</label>

              <input
                type="number"
                value={valorConsulta}
                onChange={(e) => setValorConsulta(e.target.value)}
                placeholder="Digite el valor"
              />

              <button
                type="button"
                className="fact-load-consulta-btn"
                onClick={cargarConsulta}
              >
                +<span>Cargar Consulta</span>
              </button>
            </div>

            <div className="fact-consulta-resumen">
              <div className="fact-consulta-detalle">
                <h3>Detalle consulta</h3>

                <div className="fact-table fact-consulta-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Tipo</th>
                        <th>Nombre</th>
                        <th>Valor</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {consultaDetalle ? (
                        <tr>
                          <td>Consulta</td>
                          <td>{consultaDetalle.nombre}</td>
                          <td>{formatoMoneda(consultaDetalle.valor)}</td>
                          <td>
                            <button
                              type="button"
                              className="fact-delete-btn"
                              onClick={eliminarConsulta}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan="4">
                            No se ha cargado la consulta médica.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="fact-total-box">
                <p>
                  <span>Subtotal procedimientos y laboratorios:</span>
                  <b>{formatoMoneda(totalProcedimientosLaboratorios)}</b>
                </p>

                <p>
                  <span>Consulta médica:</span>
                  <b>{formatoMoneda(totalConsulta)}</b>
                </p>

                <div className="fact-total-final">
                  <span>Total:</span>
                  <b>{formatoMoneda(total)}</b>
                </div>
              </div>
            </div>
          </div>

          <div className="fact-info-box">
            <strong>i</strong>
            <span>
              Al guardar la factura se generará en PDF y quedará disponible en
              el módulo de Documentos.
            </span>
          </div>
        </div>
      </section>

      {mostrarBuscar && (
        <div className="fact-modal-overlay">
          <div
            className="fact-modal-card"
            style={{
              transform: `translate(${posBuscar.x}px, ${posBuscar.y}px)`,
            }}
          >
            <div className="fact-modal-header" onMouseDown={iniciarArrastre}>
              <h3>Buscar paciente</h3>

              <button
                type="button"
                className="fact-action-btn"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => setMostrarBuscar(false)}
                title="Cerrar"
              >
                <img
                  src="/img/icon/cerrar.png"
                  alt="Cerrar"
                  className="fact-action-icon"
                />
              </button>
            </div>

            <div className="fact-modal-body">
              <div className="fact-search">
                <input
                  placeholder="Buscar por nombre, documento, fecha nacimiento, teléfono o correo"
                  value={textoBuscar}
                  onChange={(e) => setTextoBuscar(e.target.value)}
                />

                <button type="button" className="fact-action-btn">
                  <img
                    src="/img/icon/buscar.png"
                    alt="Buscar"
                    className="fact-action-icon"
                  />
                </button>
              </div>

              <div className="fact-table">
                <table>
                  <thead>
                    <tr>
                      <th>Documento</th>
                      <th>Paciente</th>
                      <th>Fecha nacimiento</th>
                      <th>Teléfono</th>
                      <th>Correo</th>
                    </tr>
                  </thead>

                  <tbody>
                    {pacientesFiltrados.length > 0 ? (
                      pacientesFiltrados.map((p) => (
                        <tr
                          key={p._id}
                          className="fact-row-select"
                          onClick={() => seleccionarPaciente(p)}
                          title="Seleccionar paciente"
                        >
                          <td>
                            {p.tipoIdentificacion} {p.numeroIdentificacion}
                          </td>
                          <td>{p.nombres}</td>
                          <td>{p.fechaNacimiento}</td>
                          <td>{p.telefono}</td>
                          <td>{p.correo}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No hay pacientes</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
