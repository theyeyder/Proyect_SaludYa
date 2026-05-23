const service = require("./laboratorio.service");

async function crear(req, res) {
  try {
    const laboratorio = await service.crearLaboratorio(req.body);

    return res.status(201).json({
      ok: true,
      data: laboratorio,
      message: "Laboratorio creado correctamente",
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
    const data = await service.obtenerLaboratorios();

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
    const actualizado = await service.actualizarLaboratorio(
      req.params.id,
      req.body
    );

    return res.json({
      ok: true,
      data: actualizado,
      message: "Laboratorio actualizado correctamente",
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
    const actualizado = await service.cambiarEstadoLaboratorio(req.params.id);

    return res.json({
      ok: true,
      data: actualizado,
      message: actualizado.estado
        ? "Laboratorio habilitado correctamente"
        : "Laboratorio deshabilitado correctamente",
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