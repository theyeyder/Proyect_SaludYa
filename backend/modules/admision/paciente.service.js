const Paciente = require("./paciente.model");

async function crearPaciente(data) {
  return await Paciente.create(data);
}

async function obtenerPacientes() {
  return await Paciente.find().sort({ createdAt: -1 });
}

async function buscarPacientePorDocumento(tipoIdentificacion, numeroIdentificacion) {
  return await Paciente.findOne({
    tipoIdentificacion: String(tipoIdentificacion).trim(),
    numeroIdentificacion: String(numeroIdentificacion).trim(),
  });
}

module.exports = {
  crearPaciente,
  obtenerPacientes,
  buscarPacientePorDocumento,
};