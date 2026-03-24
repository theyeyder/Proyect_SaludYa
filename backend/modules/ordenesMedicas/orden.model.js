const mongoose = require("mongoose");

const OrdenSchema = new mongoose.Schema({
  tipo: { type: String, enum: ["formula", "incapacidad", "procedimiento", "laboratorio"] },
  pacienteId: String,
  historiaId: String,
  medicoId: String,
  descripcion: String,
  fecha: String
}, { timestamps: true });

module.exports = mongoose.model("OrdenMedica", OrdenSchema);
