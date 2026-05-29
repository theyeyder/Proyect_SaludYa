const service = require("./historia.service");

async function crearHistoria(req, res) {
  try {
    const historia = await service.crear(req.body);

    return res.status(201).json({
      ok: true,
      data: historia,
      message: "Historia clínica guardada correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
}

async function obtenerHistorias(req, res) {
  try {
    const historias = await service.listar();

    return res.json({
      ok: true,
      data: historias,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
}

async function obtenerHistoriasPorPaciente(req, res) {
  try {
    const historias = await service.listarPorPaciente(
      req.params.pacienteId
    );

    return res.json({
      ok: true,
      data: historias,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
}

async function obtenerHistoriaPorId(req, res) {
  try {
    const historia = await service.obtenerPorId(req.params.id);

    return res.json({
      ok: true,
      data: historia,
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      message: error.message,
    });
  }
}
async function actualizarHistoria(req, res) {
  try {
    const historia = await service.actualizar(
      req.params.id,
      req.body
    );

    return res.json({
      ok: true,
      data: historia,
      message: "Historia actualizada correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
}

async function finalizarHistoria(req, res) {
  try {
    const historia = await service.finalizar(
      req.params.id
    );

    return res.json({
      ok: true,
      data: historia,
      message: "Historia clínica finalizada",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
}

module.exports = {
  crearHistoria,
  obtenerHistorias,
  obtenerHistoriasPorPaciente,
  obtenerHistoriaPorId,
  actualizarHistoria,
finalizarHistoria,
};