const service = require("./paciente.service");

function calcularEdad(fecha) {
  if (!fecha) return 0;

  const hoy = new Date();
  const nacimiento = new Date(fecha);

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad >= 0 ? edad : 0;
}

async function crearPaciente(req, res) {
  try {
    const data = { ...req.body };

    if (
      !data.nombres ||
      !data.tipoIdentificacion ||
      !data.numeroIdentificacion ||
      !data.ciudad ||
      !data.direccion ||
      !data.fechaNacimiento ||
      !data.sexo
    ) {
      return res.status(400).json({
        ok: false,
        message: "Todos los campos obligatorios deben estar completos",
      });
    }

    const existe = await service.buscarPacientePorDocumento(
      data.tipoIdentificacion,
      data.numeroIdentificacion
    );

    if (existe) {
      return res.status(400).json({
        ok: false,
        message: "Paciente ya existe",
      });
    }

    data.edad = calcularEdad(data.fechaNacimiento);

    if (data.alergico === "No") {
      data.detalleAlergia = "";
    }

    const paciente = await service.crearPaciente(data);

    return res.json({
      ok: true,
      message: "Paciente registrado correctamente",
      data: paciente,
    });
  } catch (error) {
    console.error("ERROR AL CREAR PACIENTE:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe un paciente con ese tipo y número de identificación",
      });
    }

    return res.status(500).json({
      ok: false,
      message: "Error al registrar paciente",
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

    return res.json({ ok: true, data: paciente });
  } catch (error) {
    console.error("ERROR AL BUSCAR PACIENTE:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al buscar paciente",
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

async function actualizarPaciente(req, res) {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (
      !data.nombres ||
      !data.tipoIdentificacion ||
      !data.numeroIdentificacion ||
      !data.ciudad ||
      !data.direccion ||
      !data.fechaNacimiento ||
      !data.sexo
    ) {
      return res.status(400).json({
        ok: false,
        message: "Todos los campos obligatorios deben estar completos",
      });
    }

    if (data.fechaNacimiento) {
      data.edad = calcularEdad(data.fechaNacimiento);
    }

    if (data.alergico === "No") {
      data.detalleAlergia = "";
    }

    // Validar duplicado al editar tipo/número de identificación
    const existente = await service.buscarPacientePorDocumento(
      data.tipoIdentificacion,
      data.numeroIdentificacion
    );

    if (existente && String(existente._id) !== String(id)) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe otro paciente con ese tipo y número de identificación",
      });
    }

    const paciente = await service.actualizarPaciente(id, data);

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
    console.error("ERROR AL ACTUALIZAR PACIENTE:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe otro paciente con ese tipo y número de identificación",
      });
    }

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
  actualizarPaciente,
};