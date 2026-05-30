const service = require("./orden.service");

async function crearOrden(req, res) {
  try {
    const orden = await service.crear(req.body);

    return res.status(201).json({
      ok: true,
      data: orden,
      message: "Orden médica creada correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
}

async function obtenerOrdenes(req, res) {
  try {
    const ordenes = await service.listar();

    return res.json({
      ok: true,
      data: ordenes,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
}

async function obtenerOrdenesPorTipo(req, res) {
  try {
    const ordenes = await service.listarPorTipo(req.params.tipo);

    return res.json({
      ok: true,
      data: ordenes,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
}

async function obtenerOrdenesPorHistoria(req, res) {
  try {
    const ordenes = await service.listarPorHistoria(req.params.historiaId);

    return res.json({
      ok: true,
      data: ordenes,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
}

async function obtenerOrdenesPorPaciente(req, res) {
  try {
    const ordenes = await service.listarPorPaciente(req.params.pacienteId);

    return res.json({
      ok: true,
      data: ordenes,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
}

async function obtenerOrdenPorId(req, res) {
  try {
    const orden = await service.obtenerPorId(req.params.id);

    return res.json({
      ok: true,
      data: orden,
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      message: error.message,
    });
  }
}

async function anularOrden(req, res) {
  try {
    const orden = await service.anular(req.params.id);

    return res.json({
      ok: true,
      data: orden,
      message: "Orden médica anulada correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
}

module.exports = {
  crearOrden,
  obtenerOrdenes,
  obtenerOrdenesPorTipo,
  obtenerOrdenesPorHistoria,
  obtenerOrdenesPorPaciente,
  obtenerOrdenPorId,
  anularOrden,
};