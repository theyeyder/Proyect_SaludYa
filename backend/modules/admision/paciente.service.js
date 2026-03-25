const Paciente = require("./paciente.model");

async function crearPaciente(data) {
  return await Paciente.create(data);
}

async function obtenerPacientes() {
  return await Paciente.find().sort({ createdAt: -1 });
}

async function buscarPacientePorDocumento(numeroIdentificacion) {
  return await Paciente.findOne({ numeroIdentificacion });
}

async function obtenerPacientePorId(id) {
  return await Paciente.findById(id);
}

async function actualizarPaciente(id, data) {
  return await Paciente.findByIdAndUpdate(id, data, { new: true });
}

module.exports = {
  crearPaciente,
  obtenerPacientes,
  buscarPacientePorDocumento,
  obtenerPacientePorId,
  actualizarPaciente,
};