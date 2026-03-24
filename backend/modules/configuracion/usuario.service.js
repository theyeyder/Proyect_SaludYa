const Usuario = require("./usuario.model");

async function crearUsuario(data) {
  return await Usuario.create(data);
}

async function obtenerUsuarios() {
  return await Usuario.find().sort({ createdAt: -1 });
}

async function obtenerUsuarioPorId(id) {
  return await Usuario.findById(id);
}

async function actualizarUsuario(id, data) {
  return await Usuario.findByIdAndUpdate(id, data, { new: true });
}

async function eliminarUsuario(id) {
  return await Usuario.findByIdAndDelete(id);
}

async function buscarPorUsername(username) {
  return await Usuario.findOne({ username });
}

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  buscarPorUsername,
};
