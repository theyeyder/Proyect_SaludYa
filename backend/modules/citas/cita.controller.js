const service = require("./cita.service");

exports.crearCita = async (req, res) => {
  const cita = await service.crear(req.body);
  res.status(201).json(cita);
};

exports.obtenerCitas = async (req, res) => {
  const citas = await service.listar();
  res.json(citas);
};
