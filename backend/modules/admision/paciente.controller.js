const service = require("./paciente.service");

exports.crearPaciente = async (req, res) => {
  const paciente = await service.crear(req.body);
  res.status(201).json(paciente);
};

exports.obtenerPacientes = async (req, res) => {
  const pacientes = await service.listar();
  res.json(pacientes);
};

exports.buscarPacientePorDocumento = async (req, res) => {
  const paciente = await service.buscarPorDocumento(req.params.numeroDocumento);
  res.json(paciente);
};
