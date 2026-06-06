const Laboratorio = require("./laboratorio.model");

async function crearLaboratorio(data) {
  const existe = await Laboratorio.findOne({
    codigo: data.codigo,
  });

  if (existe) {
    throw new Error("El código ya existe");
  }

  return await Laboratorio.create(data);
}

async function obtenerLaboratorios() {
  return await Laboratorio.find().sort({
    createdAt: -1,
  });
}

async function actualizarLaboratorio(id, data) {
  const laboratorio = await Laboratorio.findById(id);

  if (!laboratorio) {
    throw new Error("Laboratorio no encontrado");
  }

  const existeCodigo = await Laboratorio.findOne({
    codigo: data.codigo,
    _id: { $ne: id },
  });

  if (existeCodigo) {
    throw new Error("Ya existe otro laboratorio con ese código");
  }

  laboratorio.codigo = data.codigo;
  laboratorio.nombre = data.nombre;
  laboratorio.precio = data.precio;
  laboratorio.estado = data.estado;

  await laboratorio.save();

  return laboratorio;
}

async function cambiarEstadoLaboratorio(id) {
  const laboratorio = await Laboratorio.findById(id);

  if (!laboratorio) {
    throw new Error("Laboratorio no encontrado");
  }

  laboratorio.estado = !laboratorio.estado;

  await laboratorio.save();

  return laboratorio;
}

module.exports = {
  crearLaboratorio,
  obtenerLaboratorios,
  actualizarLaboratorio,
  cambiarEstadoLaboratorio,
};