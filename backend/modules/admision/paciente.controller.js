const service = require("./paciente.service");

async function crearPaciente(req, res) {
  try {
    const {
      nombres,
      tipoIdentificacion,
      numeroIdentificacion,
      ciudad,
      direccion,
      fechaNacimiento,
      sintomas,
      alergico,
      acompanante,
      sexo,
    } = req.body;

    if (
      !nombres ||
      !tipoIdentificacion ||
      !numeroIdentificacion ||
      !ciudad ||
      !direccion ||
      !fechaNacimiento ||
      !sexo
    ) {
      return res.status(400).json({
        ok: false,
        message: "Todos los campos obligatorios deben estar completos",
      });
    }

    const existe = await service.buscarPacientePorDocumento(
      tipoIdentificacion,
      numeroIdentificacion
    );

    if (existe) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe un paciente con ese número de identificación",
      });
    }

    const paciente = await service.crearPaciente({
      nombres,
      tipoIdentificacion,
      numeroIdentificacion: String(numeroIdentificacion).trim(),
      ciudad,
      direccion,
      fechaNacimiento,
      sintomas: sintomas || "",
      alergico: alergico || "No",
      acompanante: acompanante || "",
      sexo,
    });

    return res.status(201).json({
      ok: true,
      message: "Paciente registrado correctamente",
      data: paciente,
    });
  } catch (error) {
    console.error("ERROR REAL AL REGISTRAR PACIENTE:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe un paciente con ese número de identificación",
      });
    }

    return res.status(500).json({
      ok: false,
      message: "Error al registrar paciente",
      error: error.message,
    });
  }
}

async function obtenerPacientes(req, res) {
  try {
    const pacientes = await service.obtenerPacientes();

    return res.json({
      ok: true,
      data: pacientes,
    });
  } catch (error) {
    console.error("ERROR AL OBTENER PACIENTES:", error);

    return res.status(500).json({
      ok: false,
      message: "Error al obtener pacientes",
      error: error.message,
    });
  }
}

async function buscarPacientePorDocumento(req, res) {
  try {
    const { tipoIdentificacion, numeroIdentificacion } = req.params;

    const paciente = await service.buscarPacientePorDocumento(
      tipoIdentificacion,
      numeroIdentificacion
    );

    if (!paciente) {
      return res.status(404).json({
        ok: false,
        message: "Paciente no encontrado",
      });
    }

    return res.json({
      ok: true,
      data: paciente,
    });
  } catch (error) {
    console.error("ERROR AL BUSCAR PACIENTE:", error);

    return res.status(500).json({
      ok: false,
      message: "Error al buscar paciente",
      error: error.message,
    });
  }
}

module.exports = {
  crearPaciente,
  obtenerPacientes,
  buscarPacientePorDocumento,
};