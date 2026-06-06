const Cita = require("./cita.model");

exports.crear = async (data) => {
  const existe = await Cita.findOne({
    fecha: data.fecha,
    hora: data.hora,
    medicoId: data.medicoId,
    estado: { $ne: "Cancelada" },
  });

  if (existe) {
    throw new Error("Ya existe una cita en esa fecha y hora");
  }

  return Cita.create(data);
};

exports.listar = async (fecha) => {
  if (fecha) {
    return Cita.find({ fecha }).sort({ hora: 1 });
  }

  return Cita.find().sort({ createdAt: -1 });
};

exports.actualizarEstado = async (id, estado) => {
  return Cita.findByIdAndUpdate(
    id,
    { estado },
    { new: true }
  );
};

exports.reprogramar = async (id, fecha, hora) => {
  const citaActual = await Cita.findById(id);

  if (!citaActual) {
    throw new Error("Cita no encontrada");
  }

  const existe = await Cita.findOne({
    _id: { $ne: id },
    fecha,
    hora,
    medicoId: citaActual.medicoId,
    estado: { $ne: "Cancelada" },
  });

  if (existe) {
    throw new Error("Ya existe otra cita en esa fecha y hora");
  }

  return Cita.findByIdAndUpdate(
    id,
    {
      fecha,
      hora,
      estado: "Reprogramada",
    },
    { new: true }
  );
};

exports.editar = async (id, data) => {

  const existe = await Cita.findOne({
    _id: { $ne: id },
    fecha: data.fecha,
    hora: data.hora,
    medicoId: data.medicoId,
    estado: { $ne: "Cancelada" },
  });

  if (existe) {
    throw new Error(
      "Ya existe otra cita en esa fecha y hora"
    );
  }

  return Cita.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
};