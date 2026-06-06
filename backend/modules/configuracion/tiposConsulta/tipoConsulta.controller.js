const service = require(
  "./tipoConsulta.service"
);

async function crear(
  req,
  res
) {

  try {

    const consulta =
      await service.crearTipoConsulta(
        req.body
      );

    return res.status(201).json({
      ok: true,
      data: consulta,
      message:
        "Tipo de consulta creado correctamente",
    });

  } catch (error) {

    return res.status(400).json({
      ok: false,
      message: error.message,
    });

  }

}

async function obtener(
  req,
  res
) {

  try {

    const data =
      await service.obtenerTiposConsulta();

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

async function actualizar(
  req,
  res
) {

  try {

    const actualizado =
      await service.actualizarTipoConsulta(
        req.params.id,
        req.body
      );

    return res.json({
      ok: true,
      data: actualizado,
      message:
        "Tipo de consulta actualizado correctamente",
    });

  } catch (error) {

    return res.status(400).json({
      ok: false,
      message: error.message,
    });

  }

}

async function cambiarEstado(
  req,
  res
) {

  try {

    const actualizado =
      await service.cambiarEstadoTipoConsulta(
        req.params.id
      );

    return res.json({
      ok: true,
      data: actualizado,

      message:
        actualizado.estado
          ? "Tipo de consulta habilitado"
          : "Tipo de consulta deshabilitado",
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