const service = require(
  "./medicamento.service"
);

async function crear(req, res) {

  try {

    const medicamento =
      await service.crearMedicamento(
        req.body
      );

    return res.status(201).json({
      ok: true,
      data: medicamento,
      message:
        "Medicamento creado correctamente",
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

    const data =
      await service.obtenerMedicamentos();

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

    const actualizado =
      await service.actualizarMedicamento(
        req.params.id,
        req.body
      );

    return res.json({
      ok: true,
      data: actualizado,
      message:
        "Medicamento actualizado correctamente",
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

    const actualizado =
      await service.cambiarEstadoMedicamento(
        req.params.id
      );

    return res.json({
      ok: true,
      data: actualizado,

      message:
        actualizado.estado
          ? "Medicamento habilitado"
          : "Medicamento deshabilitado",
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