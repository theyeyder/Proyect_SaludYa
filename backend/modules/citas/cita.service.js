const Cita = require("./cita.model");

exports.crear = (data) => Cita.create(data);
exports.listar = () => Cita.find();
