const service = require("./historia.service");

exports.crearHistoria = async (req, res) => {
  const historia = await service.crear(req.body);
  res.status(201).json(historia);
};

exports.obtenerHistorias = async (req, res) => {
  const historias = await service.listar();
  res.json(historias);
};
