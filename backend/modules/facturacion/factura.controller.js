const service = require("./factura.service");

exports.crearFactura = async (req, res) => {
  const factura = await service.crear(req.body);
  res.status(201).json(factura);
};

exports.obtenerFacturas = async (req, res) => {
  const facturas = await service.listar();
  res.json(facturas);
};
