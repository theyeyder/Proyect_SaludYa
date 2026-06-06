const service = require("./procedimiento.service");

async function crear(req, res) {
  try {
    const procedimiento = await service.crearProcedimiento(req.body);

    return res.status(201).json({
      ok: true,
      data: procedimiento,
      message: "Procedimiento creado correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
}

async function obtener(req, res) {
  try {
    const data = await service.obtenerProcedimientos();

    return res.json({
      ok: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
}

async function actualizar(req, res) {
  try {
    const actualizado = await service.actualizarProcedimiento(
      req.params.id,
      req.body
    );

    return res.json({
      ok: true,
      data: actualizado,
      message: "Procedimiento actualizado correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
}

async function cambiarEstado(req, res) {
  try {
    const actualizado = await service.cambiarEstadoProcedimiento(req.params.id);

    return res.json({
      ok: true,
      data: actualizado,
      message: actualizado.estado
        ? "Procedimiento habilitado correctamente"
        : "Procedimiento deshabilitado correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
}

module.exports = {
  crear,
  obtener,
  actualizar,
  cambiarEstado,
};