import React, { useEffect, useState } from "react";
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

  const cargarPacientes = async () => {
    const data = await obtenerPacientes();
    if (data.ok) {
      setPacientes(data.data);
    }
  };

  useEffect(() => {
    cargarPacientes();
  }, []);

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

  const guardarPaciente = async () => {
    const data = await crearPaciente(form);

    if (data.ok) {
      alert(data.message);
      limpiarFormulario();
      cargarPacientes();
    } else {
      alert(data.message || "No fue posible guardar el paciente");
    }
  };

  const buscarPaciente = async () => {
    if (!busqueda) {
      cargarPacientes();
      return;
    }

    const data = await buscarPacientePorDocumento(busqueda);

    if (data.ok) {
      setPacientes([data.data]);
    } else {
      alert(data.message || "Paciente no encontrado");
      setPacientes([]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Módulo de Admisión</h1>
      <p>Registro y consulta de pacientes</p>

      <div style={{ display: "grid", gap: "12px", maxWidth: "700px", marginBottom: "30px" }}>
        <input
          type="text"
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
          type="text"
          name="numeroIdentificacion"
          placeholder="Número de identificación"
          value={form.numeroIdentificacion}
          onChange={handleChange}
        />

        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
          value={form.ciudad}
          onChange={handleChange}
        />

        <input
          type="text"
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
          <div>
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

            <label style={{ marginLeft: "15px" }}>
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

        <input
          type="text"
          name="acompanante"
          placeholder="Acompañante"
          value={form.acompanante}
          onChange={handleChange}
        />

        <select
          name="sexo"
          value={form.sexo}
          onChange={handleChange}
        >
          <option value="">Sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" onClick={guardarPaciente}>
            Guardar
          </button>
          <button type="button" onClick={limpiarFormulario}>
            Limpiar
          </button>
        </div>
      </div>

      <hr />

      <h2>Buscar paciente</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Número de identificación"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button onClick={buscarPaciente}>Buscar</button>
        <button onClick={cargarPacientes}>Ver todos</button>
      </div>

      <h2>Listado de pacientes</h2>
      <div style={{ overflowX: "auto" }}>
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", background: "#fff" }}>
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Tipo ID</th>
              <th>Número ID</th>
              <th>Ciudad</th>
              <th>Dirección</th>
              <th>Fecha nacimiento</th>
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
  );
}