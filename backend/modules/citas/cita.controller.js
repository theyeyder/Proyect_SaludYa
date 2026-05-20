const service = require("./cita.service");

exports.crearCita = async (req, res) => {
  try {
    const cita = await service.crear(req.body);

    res.status(201).json({
      ok: true,
      cita,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

exports.obtenerCitas = async (req, res) => {
  try {
    const { fecha } = req.query;

    const citas = await service.listar(fecha);

    res.json({
      ok: true,
      citas,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

exports.actualizarEstado = async (req, res) => {
  try {
    const cita = await service.actualizarEstado(
      req.params.id,
      req.body.estado
    );

    res.json({
      ok: true,
      cita,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

exports.reprogramarCita = async (req, res) => {
  try {
    const cita = await service.reprogramar(
      req.params.id,
      req.body.fecha,
      req.body.hora
    );

    res.json({
      ok: true,
      cita,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

exports.editarCita = async (req, res) => {

  try {

    const cita = await service.editar(
      req.params.id,
      req.body
    );

    res.json({
      ok: true,
      cita,
    });

  } catch (error) {

    res.status(400).json({
      ok: false,
      message: error.message,
    });

  }
};