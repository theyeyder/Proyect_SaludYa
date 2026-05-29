const Historia = require("./historia.model");
const Cita = require("../citas/cita.model");

async function crear(data) {
  const existe = await Historia.findOne({
    citaId: data.citaId,
  });

  if (existe) {
    throw new Error(
      "Ya existe una historia clínica para esta cita"
    );
  }

  const historia = await Historia.create(data);

  await Cita.findByIdAndUpdate(
    data.citaId,
    {
      estado: "Finalizada",
    },
    {
      new: true,
    }
  );

  return historia;
}

async function listar() {
  return await Historia.find()
    .sort({
      createdAt: -1,
    });
}

async function listarPorPaciente(pacienteId) {
  return await Historia.find({
    pacienteId,
  }).sort({
    createdAt: -1,
  });
}

async function obtenerPorId(id) {
  const historia = await Historia.findById(id);

  if (!historia) {
    throw new Error(
      "Historia clínica no encontrada"
    );
  }

  return historia;
}

module.exports = {
  crear,
  listar,
  listarPorPaciente,
  obtenerPorId,
};
