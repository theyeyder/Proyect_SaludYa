const Usuario = require("./usuario.model");

exports.crear = (data) => Usuario.create(data);

exports.listar = () => Usuario.find().sort({ createdAt: -1 });

exports.buscarPorUsername = (username) =>
  Usuario.findOne({ username: String(username).trim() });

exports.buscarPorCorreo = (correo) =>
  Usuario.findOne({ correo: String(correo).trim() });

exports.buscarPorId = (id) => Usuario.findById(id);

exports.actualizar = (id, data) =>
  Usuario.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });