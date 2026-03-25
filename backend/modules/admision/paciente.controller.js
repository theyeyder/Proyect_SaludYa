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

    const existe = await service.buscarPacientePorDocumento(numeroIdentificacion);

    if (existe) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe un paciente con ese número de identificación",
      });
    }

    const paciente = await service.crearPaciente({
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
    });

    return res.status(201).json({
      ok: true,
      message: "Paciente registrado correctamente",
      data: paciente,
    });
  } catch (error) {
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
    return res.status(500).json({
      ok: false,
      message: "Error al obtener pacientes",
      error: error.message,
    });
  }
}

async function buscarPacientePorDocumento(req, res) {
  try {
    const paciente = await service.buscarPacientePorDocumento(
      req.params.numeroIdentificacion
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
    return res.status(500).json({
      ok: false,
      message: "Error al buscar paciente",
      error: error.message,
    });
  }
}

async function obtenerPacientePorId(req, res) {
  try {
    const paciente = await service.obtenerPacientePorId(req.params.id);

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
    return res.status(500).json({
      ok: false,
      message: "Error al obtener paciente",
      error: error.message,
    });
  }
}

async function actualizarPaciente(req, res) {
  try {
    const paciente = await service.actualizarPaciente(req.params.id, req.body);

    if (!paciente) {
      return res.status(404).json({
        ok: false,
        message: "Paciente no encontrado",
      });
    }

    return res.json({
      ok: true,
      message: "Paciente actualizado correctamente",
      data: paciente,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error al actualizar paciente",
      error: error.message,
    });
  }
}

module.exports = {
  crearPaciente,
  obtenerPacientes,
  buscarPacientePorDocumento,
  obtenerPacientePorId,
  actualizarPaciente,
};