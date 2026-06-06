<<<<<<< HEAD
const Paciente = require("./paciente.model");

const crearPaciente = (data) => Paciente.create(data);

const obtenerPacientes = () =>
  Paciente.find().sort({ createdAt: -1 });

const buscarPacientePorDocumento = (tipo, numero) =>
  Paciente.findOne({
    tipoIdentificacion: String(tipo).trim(),
    numeroIdentificacion: String(numero).trim(),
  });

const actualizarPaciente = (id, data) =>
  Paciente.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

module.exports = {
  crearPaciente,
  obtenerPacientes,
  buscarPacientePorDocumento,
  actualizarPaciente,
=======
const Paciente = require("./paciente.model");

const crearPaciente = (data) => Paciente.create(data);

const obtenerPacientes = () =>
  Paciente.find().sort({ createdAt: -1 });

const buscarPacientePorDocumento = (tipo, numero) =>
  Paciente.findOne({
    tipoIdentificacion: String(tipo).trim(),
    numeroIdentificacion: String(numero).trim(),
  });

const actualizarPaciente = (id, data) =>
  Paciente.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

module.exports = {
  crearPaciente,
  obtenerPacientes,
  buscarPacientePorDocumento,
  actualizarPaciente,
>>>>>>> 0594392932fa2e9c645c4fdceda86a09ba7e2d6e
};