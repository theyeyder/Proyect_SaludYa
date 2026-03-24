const mongoose = require("mongoose");

const CitaSchema = new mongoose.Schema({
  fecha: String,
  hora: String,
  motivo: String,
  estado: { type: String, default: "Programada" },
  pacienteId: String,
  medicoId: String,
  observaciones: String
}, { timestamps: true });

module.exports = mongoose.model("Cita", CitaSchema);
