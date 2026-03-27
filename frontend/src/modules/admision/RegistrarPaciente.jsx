import { useEffect, useState } from "react";
import {
  crearPaciente,
  obtenerPacientes,
  buscarPacientePorDocumento,
} from "../../api/pacientesApi";

export default function RegistrarPaciente() {
  const [form, setForm] = useState({
    nombres: "",
    tipoIdentificacion: "",
    numeroIdentificacion: "",
    ciudad: "",
    direccion: "",
    fechaNacimiento: "",
    sintomas: "",
    alergico: "",
    acompanante: "",
    sexo: "",
  });

  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      nombres: "",
      tipoIdentificacion: "",
      numeroIdentificacion: "",
      ciudad: "",
      direccion: "",
      fechaNacimiento: "",
      sintomas: "",
      alergico: "",
      acompanante: "",
      sexo: "",
    });
  };

  const cargarPacientes = async () => {
    try {
      const data = await obtenerPacientes();
      if (data.ok) {
        setPacientes(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarPacientes();
  }, []);

  const guardarPaciente = async () => {
    setMensaje("");

    try {
      const data = await crearPaciente(form);

      if (data.ok) {
        setMensaje(data.message);
        limpiarFormulario();
        cargarPacientes();
      } else {
        setMensaje(data.message || "No fue posible guardar el paciente");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al guardar paciente");
    }
  };

  const buscarPaciente = async () => {
    setMensaje("");

    try {
      if (!busqueda.trim()) {
        cargarPacientes();
        return;
      }

      const data = await buscarPacientePorDocumento(busqueda);

      if (data.ok) {
        setPacientes([data.data]);
      } else {
        setPacientes([]);
        setMensaje(data.message || "Paciente no encontrado");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al buscar paciente");
    }
  };

  return (
    <div>
      <h1>Módulo de Admisión</h1>
      <p>Registro y consulta de pacientes</p>

      {mensaje && (
        <div
          style={{
            marginBottom: 16,
            padding: 12,
            background: "#eef6ff",
            border: "1px solid #b7d3f2",
            borderRadius: 8,
          }}
        >
          {mensaje}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gap: 12,
          maxWidth: 700,
          marginBottom: 30,
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          border: "1px solid #ddd",
        }}
      >
        <input
          name="nombres"
          placeholder="Nombres"
          value={form.nombres}
          onChange={handleChange}
        />

        <select
          name="tipoIdentificacion"
          value={form.tipoIdentificacion}
          onChange={handleChange}
        >
          <option value="">Tipo de identificación</option>
          <option value="CC">Cédula de ciudadanía</option>
          <option value="TI">Tarjeta de identidad</option>
          <option value="CE">Cédula de extranjería</option>
          <option value="RC">Registro civil</option>
          <option value="PA">Pasaporte</option>
        </select>

        <input
          name="numeroIdentificacion"
          placeholder="Número de identificación"
          value={form.numeroIdentificacion}
          onChange={handleChange}
        />

        <input
          name="ciudad"
          placeholder="Ciudad"
          value={form.ciudad}
          onChange={handleChange}
        />

        <input
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
        />

        <input
          type="date"
          name="fechaNacimiento"
          value={form.fechaNacimiento}
          onChange={handleChange}
        />

        <textarea
          name="sintomas"
          placeholder="Síntomas"
          value={form.sintomas}
          onChange={handleChange}
          rows="3"
        />

        <div>
          <label>¿Alérgico?</label>
          <div style={{ marginTop: 8 }}>
            <label>
              <input
                type="radio"
                name="alergico"
                value="Si"
                checked={form.alergico === "Si"}
                onChange={handleChange}
              />
              {" "}Sí
            </label>

            <label style={{ marginLeft: 16 }}>
              <input
                type="radio"
                name="alergico"
                value="No"
                checked={form.alergico === "No"}
                onChange={handleChange}
              />
              {" "}No
            </label>
          </div>
        </div>

        <input
          name="acompanante"
          placeholder="Acompañante"
          value={form.acompanante}
          onChange={handleChange}
        />

        <select name="sexo" value={form.sexo} onChange={handleChange}>
          <option value="">Sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={guardarPaciente}>Guardar</button>
          <button onClick={limpiarFormulario}>Limpiar</button>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          border: "1px solid #ddd",
        }}
      >
        <h2>Buscar paciente</h2>

        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <input
            placeholder="Número de identificación"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button onClick={buscarPaciente}>Buscar</button>
          <button onClick={cargarPacientes}>Ver todos</button>
        </div>

        <h2>Listado de pacientes</h2>

        <div style={{ overflowX: "auto" }}>
          <table
            border="1"
            cellPadding="8"
            cellSpacing="0"
            style={{ width: "100%", background: "#fff" }}
          >
            <thead>
              <tr>
                <th>Nombres</th>
                <th>Tipo ID</th>
                <th>Número ID</th>
                <th>Ciudad</th>
                <th>Dirección</th>
                <th>Fecha Nacimiento</th>
                <th>Alérgico</th>
                <th>Acompañante</th>
                <th>Sexo</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.length > 0 ? (
                pacientes.map((paciente) => (
                  <tr key={paciente._id}>
                    <td>{paciente.nombres}</td>
                    <td>{paciente.tipoIdentificacion}</td>
                    <td>{paciente.numeroIdentificacion}</td>
                    <td>{paciente.ciudad}</td>
                    <td>{paciente.direccion}</td>
                    <td>{paciente.fechaNacimiento}</td>
                    <td>{paciente.alergico}</td>
                    <td>{paciente.acompanante}</td>
                    <td>{paciente.sexo}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    No hay pacientes registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
