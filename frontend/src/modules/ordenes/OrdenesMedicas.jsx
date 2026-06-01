import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ordenes.css";

const API_ORDENES = "http://localhost:4000/api/ordenes";
const API_MEDICAMENTOS = "http://localhost:4000/api/medicamentos";
const API_PROCEDIMIENTOS = "http://localhost:4000/api/procedimientos";
const API_LABORATORIOS = "http://localhost:4000/api/laboratorios";

export default function OrdenesMedicas({ historia, paciente, cita, onClose }) {
  const navigate = useNavigate();

  const [tab, setTab] = useState("formula");
  const [medicamentos, setMedicamentos] = useState([]);
  const [procedimientos, setProcedimientos] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
  const [tipoBusqueda, setTipoBusqueda] = useState("");
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [onSeleccionar, setOnSeleccionar] = useState(null);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragRef = useRef({ active: false, startX: 0, startY: 0 });

  const [posBusqueda, setPosBusqueda] = useState({ x: 0, y: 0 });
  const dragBusquedaRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cerrarOrdenes = () => {
    if (typeof onClose === "function") {
      onClose();
      return;
    }

    navigate("/historia-clinica");
  };

  const iniciarArrastre = (e) => {
    dragRef.current = {
      active: true,
      startX: e.clientX - pos.x,
      startY: e.clientY - pos.y,
    };

    document.addEventListener("mousemove", moverVentana);
    document.addEventListener("mouseup", soltarVentana);
  };

  const moverVentana = (e) => {
    if (!dragRef.current.active) return;

    setPos({
      x: e.clientX - dragRef.current.startX,
      y: e.clientY - dragRef.current.startY,
    });
  };

  const soltarVentana = () => {
    dragRef.current.active = false;
    document.removeEventListener("mousemove", moverVentana);
    document.removeEventListener("mouseup", soltarVentana);
  };

  const iniciarArrastreBusqueda = (e) => {
    dragBusquedaRef.current = {
      active: true,
      startX: e.clientX - posBusqueda.x,
      startY: e.clientY - posBusqueda.y,
    };

    document.addEventListener("mousemove", moverVentanaBusqueda);
    document.addEventListener("mouseup", soltarVentanaBusqueda);
  };

  const moverVentanaBusqueda = (e) => {
    if (!dragBusquedaRef.current.active) return;

    setPosBusqueda({
      x: e.clientX - dragBusquedaRef.current.startX,
      y: e.clientY - dragBusquedaRef.current.startY,
    });
  };

  const soltarVentanaBusqueda = () => {
    dragBusquedaRef.current.active = false;
    document.removeEventListener("mousemove", moverVentanaBusqueda);
    document.removeEventListener("mouseup", soltarVentanaBusqueda);
  };

  const cargarDatos = async () => {
    try {
      const meds = await fetch(API_MEDICAMENTOS).then((r) => r.json());
      const procs = await fetch(API_PROCEDIMIENTOS).then((r) => r.json());
      const labs = await fetch(API_LABORATORIOS).then((r) => r.json());

      setMedicamentos(meds.data || []);
      setProcedimientos(procs.data || []);
      setLaboratorios(labs.data || []);
    } catch (error) {
      console.error(error);
      setMensaje("Error al cargar datos de órdenes médicas");
    }
  };

  const abrirBusqueda = (tipo, callback) => {
    setTipoBusqueda(tipo);
    setTextoBusqueda("");
    setOnSeleccionar(() => callback);
    setPosBusqueda({ x: 0, y: 0 });
    setMostrarBusqueda(true);
  };

  const obtenerDatosBusqueda = () => {
    if (tipoBusqueda === "medicamento") return medicamentos;
    if (tipoBusqueda === "procedimiento") return procedimientos;
    if (tipoBusqueda === "laboratorio") return laboratorios;
    return [];
  };

  const tituloBusqueda = () => {
    if (tipoBusqueda === "medicamento") return "Buscar Medicamento";
    if (tipoBusqueda === "procedimiento") return "Buscar Procedimiento";
    if (tipoBusqueda === "laboratorio") return "Buscar Laboratorio";
    return "Buscar";
  };

  const datosFiltrados = obtenerDatosBusqueda().filter((item) => {
    const texto = `
      ${item.codigo || ""}
      ${item.nombre || ""}
      ${item.descripcion || ""}
      ${item.concentracion || ""}
      ${item.presentacion || ""}
    `.toLowerCase();

    return texto.includes(textoBusqueda.toLowerCase());
  });

  const seleccionarItemBusqueda = (item) => {
    if (typeof onSeleccionar === "function") {
      onSeleccionar(item);
    }

    setMostrarBusqueda(false);
  };

  const guardarOrden = async (tipo, items = [], incapacidad = null) => {
    try {
      if (!cita) {
        setMensaje("Debe abrir las órdenes desde una historia clínica");
        return;
      }

      if (!cita.pacienteId) {
        setMensaje("No se encontró el paciente de la cita");
        return;
      }

      if (!cita.medicoId) {
        setMensaje("No se encontró el médico de la cita");
        return;
      }

      if (!historia?._id) {
        setMensaje(
          "Primero debe guardar la historia clínica antes de generar órdenes",
        );
        return;
      }

      if (
        tipo !== "incapacidad" &&
        (!Array.isArray(items) || items.length === 0)
      ) {
        setMensaje("Debe agregar al menos un ítem a la orden");
        return;
      }

      const payload = {
        tipo,
        pacienteId: cita.pacienteId,
        historiaId: historia._id,
        medicoId: cita.medicoId,

        datosPaciente: {
          nombres: paciente?.nombres || cita.nombrePaciente || "",
          apellidos: paciente?.apellidos || "",
          tipoDocumento: cita.tipoDocumento || "",
          numeroDocumento: cita.numeroDocumento || "",
          edad: paciente?.edad || "",
          sexo: paciente?.sexo || "",
          telefono: paciente?.telefono || "",
        },

        datosMedico: {
          nombreMedico: cita.nombreMedico || "",
        },

        items,
        incapacidad,
        diagnostico: historia?.diagnostico || "",
        observaciones: "",
      };

      console.log("ORDEN PAYLOAD", payload);

      const res = await fetch(API_ORDENES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("ERROR AL GUARDAR ORDEN:", data);

        setMensaje(data.message || "Error al guardar la orden médica");

        return;
      }

      setMensaje(data.message || "Orden médica guardada correctamente");
    } catch (error) {
      console.error("ERROR FETCH ORDEN:", error);
      setMensaje("Error de conexión al guardar la orden médica");
    }
  };

  return (
    <div className="orden-modal">
      <div
        className="orden-card"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
        }}
      >
        <div className="orden-header" onMouseDown={iniciarArrastre}>
          <h2>Órdenes Médicas</h2>

          <button
            type="button"
            className="orden-action-btn"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={cerrarOrdenes}
            title="Cerrar"
          >
            <img
              src="/img/icon/cerrar.png"
              alt="Cerrar"
              className="orden-action-icon"
            />
          </button>
        </div>

        {mensaje && <div className="orden-alert">{mensaje}</div>}

        <div className="orden-tabs">
          <button type="button" onClick={() => setTab("formula")}>
            Fórmula
          </button>

          <button type="button" onClick={() => setTab("procedimiento")}>
            Procedimientos
          </button>

          <button type="button" onClick={() => setTab("laboratorio")}>
            Laboratorios
          </button>

          <button type="button" onClick={() => setTab("incapacidad")}>
            Incapacidad
          </button>
        </div>

        {tab === "formula" && (
          <FormulaTab
            abrirBusqueda={abrirBusqueda}
            guardarOrden={guardarOrden}
          />
        )}

        {tab === "procedimiento" && (
          <ProcedimientoTab
            abrirBusqueda={abrirBusqueda}
            guardarOrden={guardarOrden}
          />
        )}

        {tab === "laboratorio" && (
          <LaboratorioTab
            abrirBusqueda={abrirBusqueda}
            guardarOrden={guardarOrden}
          />
        )}

        {tab === "incapacidad" && (
          <IncapacidadTab guardarOrden={guardarOrden} />
        )}
      </div>

      {mostrarBusqueda && (
        <div className="orden-busqueda-overlay">
          <div
            className="orden-busqueda-card"
            style={{
              transform: `translate(${posBusqueda.x}px, ${posBusqueda.y}px)`,
            }}
          >
            <div
              className="orden-busqueda-header"
              onMouseDown={iniciarArrastreBusqueda}
            >
              <h3>{tituloBusqueda()}</h3>

              <button
                type="button"
                className="orden-action-btn"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => setMostrarBusqueda(false)}
                title="Cerrar"
              >
                <img
                  src="/img/icon/cerrar.png"
                  alt="Cerrar"
                  className="orden-action-icon"
                />
              </button>
            </div>

            <div className="orden-busqueda-body">
              <div className="orden-busqueda-filtro">
                <input
                  placeholder="Buscar por código, nombre o descripción"
                  value={textoBusqueda}
                  onChange={(e) => setTextoBusqueda(e.target.value)}
                />

                <button
                  type="button"
                  className="orden-action-btn"
                  title="Buscar"
                >
                  <img
                    src="/img/icon/buscar.png"
                    alt="Buscar"
                    className="orden-action-icon"
                  />
                </button>
              </div>

              <div className="orden-busqueda-tabla">
                <table>
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                    </tr>
                  </thead>

                  <tbody>
                    {datosFiltrados.length > 0 ? (
                      datosFiltrados.map((item) => (
                        <tr
                          key={item._id}
                          className="orden-row-select"
                          onClick={() => seleccionarItemBusqueda(item)}
                          title="Seleccionar"
                        >
                          <td>{item.codigo}</td>
                          <td>{item.nombre}</td>
                          <td>
                            {tipoBusqueda === "medicamento"
                              ? `${item.concentracion || ""} ${
                                  item.presentacion || ""
                                }`
                              : item.descripcion || item.nombre || "-"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">No hay resultados</td>
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

function FormulaTab({ abrirBusqueda, guardarOrden }) {
  const [medSeleccionado, setMedSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [dosis, setDosis] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [duracion, setDuracion] = useState("");
  const [viaAdministracion, setViaAdministracion] = useState("");
  const [observacion, setObservacion] = useState("");
  const [items, setItems] = useState([]);

  const limpiarCampos = () => {
    setMedSeleccionado(null);
    setCantidad("");
    setDosis("");
    setFrecuencia("");
    setDuracion("");
    setViaAdministracion("");
    setObservacion("");
  };

  const agregarMedicamento = () => {
    if (!medSeleccionado) return;

    const item = {
      itemId: medSeleccionado._id,
      codigo: medSeleccionado.codigo,
      nombre: medSeleccionado.nombre,
      concentracion: medSeleccionado.concentracion,
      presentacion: medSeleccionado.presentacion,
      cantidad,
      precio: medSeleccionado.precio,
      dosis,
      frecuencia,
      duracion,
      viaAdministracion,
      observacion,
    };

    setItems((prev) => [...prev, item]);
    limpiarCampos();
  };

  const quitarItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const guardar = () => {
    guardarOrden("formula", items);
  };

  return (
    <div className="orden-form">
      <div className="orden-search">
        <input
          readOnly
          value={
            medSeleccionado
              ? `${medSeleccionado.codigo} - ${medSeleccionado.nombre}`
              : ""
          }
          placeholder="Seleccione medicamento"
        />

        <button
          type="button"
          className="orden-action-btn"
          title="Buscar medicamento"
          onClick={() => abrirBusqueda("medicamento", setMedSeleccionado)}
        >
          <img
            src="/img/icon/buscar.png"
            alt="Buscar"
            className="orden-action-icon"
          />
        </button>
      </div>

      {medSeleccionado && (
        <div className="orden-selected">
          <b>Seleccionado:</b> {medSeleccionado.codigo} -{" "}
          {medSeleccionado.nombre} / {medSeleccionado.concentracion} /{" "}
          {medSeleccionado.presentacion}
        </div>
      )}

      <input
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />

      <input
        placeholder="Dosis"
        value={dosis}
        onChange={(e) => setDosis(e.target.value)}
      />

      <input
        placeholder="Frecuencia"
        value={frecuencia}
        onChange={(e) => setFrecuencia(e.target.value)}
      />

      <input
        placeholder="Duración"
        value={duracion}
        onChange={(e) => setDuracion(e.target.value)}
      />

      <select
        value={viaAdministracion}
        onChange={(e) => setViaAdministracion(e.target.value)}
      >
        <option value="">Seleccione vía de administración</option>
        <option value="Oral">Oral</option>
        <option value="Intramuscular">Intramuscular</option>
        <option value="Intravenosa">Intravenosa</option>
        <option value="Subcutánea">Subcutánea</option>
        <option value="Tópica">Tópica</option>
        <option value="Oftálmica">Oftálmica</option>
        <option value="Ótica">Ótica</option>
        <option value="Nasal">Nasal</option>
        <option value="Rectal">Rectal</option>
        <option value="Vaginal">Vaginal</option>
        <option value="Inhalada">Inhalada</option>
      </select>

      <textarea
        placeholder="Observación"
        value={observacion}
        onChange={(e) => setObservacion(e.target.value)}
      />

      <div className="orden-add-container">
        <button
          type="button"
          className="orden-action-btn orden-add-btn"
          onClick={agregarMedicamento}
          title="Agregar medicamento"
        >
          <img
            src="/img/icon/agregar.png"
            alt="Agregar"
            className="orden-action-icon"
          />
        </button>
      </div>

      <ListaItemsOrden items={items} onRemove={quitarItem} />

      <button type="button" className="orden-save-btn" onClick={guardar}>
        <img
          src="/img/icon/guardar.png"
          alt="Guardar"
          className="orden-action-icon"
        />
        Guardar fórmula
      </button>
    </div>
  );
}

function ProcedimientoTab({ abrirBusqueda, guardarOrden }) {
  const [seleccionado, setSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [observacion, setObservacion] = useState("");
  const [items, setItems] = useState([]);

  const limpiarCampos = () => {
    setSeleccionado(null);
    setCantidad("");
    setObservacion("");
  };

  const agregarProcedimiento = () => {
    if (!seleccionado) return;

    const item = {
      itemId: seleccionado._id,
      codigo: seleccionado.codigo,
      nombre: seleccionado.nombre,
      descripcion: seleccionado.descripcion || seleccionado.nombre,
      precio: seleccionado.precio,
      cantidad,
      observacion,
    };

    setItems((prev) => [...prev, item]);
    limpiarCampos();
  };

  const quitarItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const guardar = () => {
    guardarOrden("procedimiento", items);
  };

  return (
    <div className="orden-form">
      <div className="orden-search">
        <input
          readOnly
          value={
            seleccionado
              ? `${seleccionado.codigo} - ${seleccionado.nombre}`
              : ""
          }
          placeholder="Seleccione procedimiento"
        />

        <button
          type="button"
          className="orden-action-btn"
          title="Buscar procedimiento"
          onClick={() => abrirBusqueda("procedimiento", setSeleccionado)}
        >
          <img
            src="/img/icon/buscar.png"
            alt="Buscar"
            className="orden-action-icon"
          />
        </button>
      </div>

      {seleccionado && (
        <div className="orden-selected">
          <b>Seleccionado:</b> {seleccionado.codigo} - {seleccionado.nombre}
        </div>
      )}

      <input
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />

      <textarea
        placeholder="Observación"
        value={observacion}
        onChange={(e) => setObservacion(e.target.value)}
      />
        <div className="orden-add-container">
      <button
        type="button"
        className="orden-action-btn orden-add-btn"
        onClick={agregarProcedimiento}
        title="Agregar procedimiento"
      >
        <img
          src="/img/icon/agregar.png"
          alt="Agregar procedimiento"
          className="orden-action-icon"
        />
      </button>
      </div>
      <ListaItemsOrden items={items} onRemove={quitarItem} />

      <button type="button" className="orden-save-btn" onClick={guardar}>
        <img
          src="/img/icon/guardar.png"
          alt="Guardar"
          className="orden-action-icon"
        />
        Guardar procedimientos
      </button>
    </div>
  );
}

function LaboratorioTab({ abrirBusqueda, guardarOrden }) {
  const [seleccionado, setSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [observacion, setObservacion] = useState("");
  const [items, setItems] = useState([]);

  const limpiarCampos = () => {
    setSeleccionado(null);
    setCantidad("");
    setObservacion("");
  };

  const agregarLaboratorio = () => {
    if (!seleccionado) return;

    const item = {
      itemId: seleccionado._id,
      codigo: seleccionado.codigo,
      nombre: seleccionado.nombre,
      descripcion: seleccionado.descripcion || seleccionado.nombre,
      precio: seleccionado.precio,
      cantidad,
      observacion,
    };

    setItems((prev) => [...prev, item]);
    limpiarCampos();
  };

  const quitarItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const guardar = () => {
    guardarOrden("laboratorio", items);
  };

  return (
    <div className="orden-form">
      <div className="orden-search">
        <input
          readOnly
          value={
            seleccionado
              ? `${seleccionado.codigo} - ${seleccionado.nombre}`
              : ""
          }
          placeholder="Seleccione laboratorio"
        />

        <button
          type="button"
          className="orden-action-btn"
          title="Buscar laboratorio"
          onClick={() => abrirBusqueda("laboratorio", setSeleccionado)}
        >
          <img
            src="/img/icon/buscar.png"
            alt="Buscar"
            className="orden-action-icon"
          />
        </button>
      </div>

      {seleccionado && (
        <div className="orden-selected">
          <b>Seleccionado:</b> {seleccionado.codigo} - {seleccionado.nombre}
        </div>
      )}

      <input
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />

      <textarea
        placeholder="Observación"
        value={observacion}
        onChange={(e) => setObservacion(e.target.value)}
      />

      <div className="orden-add-container">
      <button
        type="button"
        className="orden-action-btn orden-add-btn"
        onClick={agregarLaboratorio}
        title="Agregar laboratorio"
      >
        <img
          src="/img/icon/agregar.png"
          alt="Agregar laboratorio"
          className="orden-action-icon"
        />
      </button>
      </div>

      <ListaItemsOrden items={items} onRemove={quitarItem} />

      <button type="button" className="orden-save-btn" onClick={guardar}>
        <img
          src="/img/icon/guardar.png"
          alt="Guardar"
          className="orden-action-icon"
        />
        Guardar laboratorios
      </button>
    </div>
  );
}

function numeroALetras(num) {
  const unidades = [
    "",
    "uno",
    "dos",
    "tres",
    "cuatro",
    "cinco",
    "seis",
    "siete",
    "ocho",
    "nueve",
    "diez",
    "once",
    "doce",
    "trece",
    "catorce",
    "quince",
    "dieciséis",
    "diecisiete",
    "dieciocho",
    "diecinueve",
    "veinte",
    "veintiuno",
    "veintidós",
    "veintitrés",
    "veinticuatro",
    "veinticinco",
    "veintiséis",
    "veintisiete",
    "veintiocho",
    "veintinueve",
    "treinta",
  ];

  return unidades[num] || String(num);
}

function calcularDias(fechaInicio, fechaFin) {
  if (!fechaInicio || !fechaFin) return "";

  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);

  const diferencia = fin - inicio;

  if (diferencia < 0) return "";

  return Math.floor(diferencia / (1000 * 60 * 60 * 24)) + 1;
}

function IncapacidadTab({ guardarOrden }) {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [motivo, setMotivo] = useState("");

  const dias = calcularDias(fechaInicio, fechaFin);
  const diasLetras = dias ? numeroALetras(dias) : "";

  const guardar = () => {
    guardarOrden("incapacidad", [], {
      dias: String(dias || ""),
      diasLetras,
      fechaInicio,
      fechaFin,
      motivo,
    });
  };

  return (
    <div className="orden-form">
      <div className="orden-fechas-grid">
        <label>
          Fecha inicio
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </label>

        <label>
          Fecha final
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </label>
      </div>

      <input
        readOnly
        value={
          dias
            ? `${dias} días (${diasLetras} días)`
            : ""
        }
        placeholder="Días calculados"
      />

      <textarea
        placeholder="Motivo"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
      />

      <button
        type="button"
        className="orden-save-btn"
        onClick={guardar}
      >
        <img
          src="/img/icon/guardar.png"
          alt="Guardar"
          className="orden-action-icon"
        />
        Guardar incapacidad
      </button>
    </div>
  );
}

function ListaItemsOrden({ items, onRemove }) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="orden-items-list">
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Detalle</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={`${item.itemId}-${index}`}>
              <td>{item.codigo}</td>
              <td>{item.nombre}</td>
              <td>{item.cantidad || "-"}</td>
              <td>
                {item.viaAdministracion
                  ? `Vía: ${item.viaAdministracion}. `
                  : ""}
                {item.dosis ? `Dosis: ${item.dosis}. ` : ""}
                {item.frecuencia ? `Frecuencia: ${item.frecuencia}. ` : ""}
                {item.duracion ? `Duración: ${item.duracion}. ` : ""}
                {item.observacion || ""}
              </td>
              <td>
                <button
                  type="button"
                  className="orden-remove-btn"
                  onClick={() => onRemove(index)}
                  title="Quitar"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
