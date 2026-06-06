const Historia = require("./historia.model");
const Cita = require("../citas/cita.model");

function generarNumeroHistoria(totalHistorias) {
  const consecutivo = totalHistorias + 1;

  return `HC-${String(consecutivo).padStart(6, "0")}`;
}

async function crear(data) {
  const existe = await Historia.findOne({
    citaId: data.citaId,
  });

  if (existe) {
    throw new Error("Ya existe una historia clínica para esta cita");
  }

  const historiasPaciente = await Historia.find({
    pacienteId: data.pacienteId,
  }).sort({
    createdAt: 1,
  });

  const numeroIngreso = historiasPaciente.length + 1;

  const totalHistorias = await Historia.countDocuments();

  const numeroHistoria = generarNumeroHistoria(totalHistorias);

  const historia = await Historia.create({
    ...data,
    numeroIngreso,
    numeroHistoria,
    horaAtencion:
      data.horaAtencion ||
      new Date().toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
  });

  await Cita.findByIdAndUpdate(
    data.citaId,
    {
      estado: "Finalizada",
    },
    {
      new: true,
    },
  );

  return historia;
}

async function listar() {
  return await Historia.find().sort({
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
    throw new Error("Historia clínica no encontrada");
  }

  return historia;
}
async function actualizar(id, data) {
  const historia = await Historia.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!historia) {
    throw new Error("Historia clínica no encontrada");
  }

  return historia;
}

async function finalizar(id) {
  const historia = await Historia.findByIdAndUpdate(
    id,
    {
      estadoHistoria: "Cerrada",
    },
    {
      new: true,
    },
  );

  if (!historia) {
    throw new Error("Historia clínica no encontrada");
  }

  return historia;
}

module.exports = {
  crear,
  listar,
  listarPorPaciente,
  obtenerPorId,
  actualizar,
  finalizar,
};
