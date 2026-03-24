const mongoose = require("mongoose");

const HistoriaSchema = new mongoose.Schema({
  pacienteId: String,
  citaId: String,
  medicoId: String,
  fechaConsulta: String,
  diagnostico: String,
  tratamiento: String,
  observaciones: String
}, { timestamps: true });

module.exports = mongoose.model("HistoriaClinica", HistoriaSchema);
