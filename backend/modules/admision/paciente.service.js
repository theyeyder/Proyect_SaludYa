const Paciente = require("./paciente.model");

exports.crear = (data) => Paciente.create(data);
exports.listar = () => Paciente.find();
exports.buscarPorDocumento = (numeroDocumento) => Paciente.findOne({ numeroDocumento });
