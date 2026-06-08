/**
 * Registra un nuevo paciente en la base de datos.
 *
 * @async
 * @function crearPaciente
 * @param {Object} datosPaciente Información del paciente.
 * @returns {Promise<Object>} Paciente creado.
 */

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
};