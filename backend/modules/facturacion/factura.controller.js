const service = require("./factura.service");

async function crearFactura(req, res) {
  try {
    const factura = await service.crear(req.body);

    return res.status(201).json({
      ok: true,
      data: factura,
      message: "Factura creada correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
}

async function obtenerFacturas(req, res) {
  try {
    const facturas = await service.listar();

    return res.json({
      ok: true,
      data: facturas,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
}

async function obtenerFacturaPorId(req, res) {
  try {
    const factura = await service.obtenerPorId(req.params.id);

    return res.json({
      ok: true,
      data: factura,
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      message: error.message,
    });
  }
}

async function obtenerFacturasPorPaciente(req, res) {
  try {
    const facturas = await service.listarPorPaciente(req.params.pacienteId);

    return res.json({
      ok: true,
      data: facturas,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
}

async function cambiarEstadoFactura(req, res) {
  try {
    const factura = await service.cambiarEstado(
      req.params.id,
      req.body.estadoPago
    );

    return res.json({
      ok: true,
      data: factura,
      message: "Estado de factura actualizado correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
}

module.exports = {
  crearFactura,
  obtenerFacturas,
  obtenerFacturaPorId,
  obtenerFacturasPorPaciente,
  cambiarEstadoFactura,
};