const service = require("./procedimiento.service");

async function crear(req, res) {

  try {

    const procedimiento =
      await service.crearProcedimiento(
        req.body
      );

    res.status(201).json(procedimiento);

  } catch (error) {

    res.status(400).json({
      message: error.message,
    });

  }

}

async function obtener(req, res) {

  try {

    const data =
      await service.obtenerProcedimientos();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

}

async function actualizar(req, res) {

  try {

    const actualizado =
      await service.actualizarProcedimiento(
        req.params.id,
        req.body
      );

    res.json(actualizado);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

}

module.exports = {
  crear,
  obtener,
  actualizar,
};