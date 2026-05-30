const Orden = require("./orden.model");

async function crear(data) {
  return await Orden.create(data);
}

async function listar() {
  return await Orden.find().sort({
    createdAt: -1,
  });
}

async function listarPorTipo(tipo) {
  return await Orden.find({
    tipo,
  }).sort({
    createdAt: -1,
  });
}

async function listarPorHistoria(historiaId) {
  return await Orden.find({
    historiaId,
  }).sort({
    createdAt: -1,
  });
}

async function listarPorPaciente(pacienteId) {
  return await Orden.find({
    pacienteId,
  }).sort({
    createdAt: -1,
  });
}

async function obtenerPorId(id) {
  const orden = await Orden.findById(id);

  if (!orden) {
    throw new Error("Orden médica no encontrada");
  }

  return orden;
}

async function anular(id) {
  const orden = await Orden.findByIdAndUpdate(
    id,
    {
      estado: "Anulada",
    },
    {
      new: true,
    }
  );

  if (!orden) {
    throw new Error("Orden médica no encontrada");
  }

  return orden;
}

module.exports = {
  crear,
  listar,
  listarPorTipo,
  listarPorHistoria,
  listarPorPaciente,
  obtenerPorId,
  anular,
};