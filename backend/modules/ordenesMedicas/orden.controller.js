const service = require("./orden.service");

exports.crearOrden = async (req, res) => {
  const orden = await service.crear(req.body);
  res.status(201).json(orden);
};

exports.obtenerOrdenes = async (req, res) => {
  const ordenes = await service.listar();
  res.json(ordenes);
};

exports.obtenerOrdenesPorTipo = async (req, res) => {
  const ordenes = await service.listarPorTipo(req.params.tipo);
  res.json(ordenes);
};
