const Medicamento = require("./medicamento.model");

async function crearMedicamento(data) {

  const existe = await Medicamento.findOne({
    codigo: data.codigo,
  });

  if (existe) {
    throw new Error("El código ya existe");
  }

  return await Medicamento.create(data);
}

async function obtenerMedicamentos() {

  return await Medicamento.find().sort({
    createdAt: -1,
  });

}

async function actualizarMedicamento(id, data) {

  const medicamento =
    await Medicamento.findById(id);

  if (!medicamento) {
    throw new Error(
      "Medicamento no encontrado"
    );
  }

  const existeCodigo =
    await Medicamento.findOne({
      codigo: data.codigo,
      _id: { $ne: id },
    });

  if (existeCodigo) {
    throw new Error(
      "Ya existe otro medicamento con ese código"
    );
  }

  medicamento.codigo =
    data.codigo;

  medicamento.nombre =
    data.nombre;

  medicamento.concentracion =
    data.concentracion;

  medicamento.presentacion =
    data.presentacion;

  medicamento.cantidad =
    data.cantidad;

  medicamento.precio =
    data.precio;

  medicamento.estado =
    data.estado;

  await medicamento.save();

  return medicamento;

}

async function cambiarEstadoMedicamento(id) {

  const medicamento =
    await Medicamento.findById(id);

  if (!medicamento) {
    throw new Error(
      "Medicamento no encontrado"
    );
  }

  medicamento.estado =
    !medicamento.estado;

  await medicamento.save();

  return medicamento;

}

module.exports = {
  crearMedicamento,
  obtenerMedicamentos,
  actualizarMedicamento,
  cambiarEstadoMedicamento,
};