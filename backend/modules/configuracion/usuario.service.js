const Usuario = require("./usuario.model");

exports.crear = (data) => Usuario.create(data);
exports.listar = () => Usuario.find().sort({ createdAt: -1 });
exports.buscarPorUsername = (username) => Usuario.findOne({ username });
