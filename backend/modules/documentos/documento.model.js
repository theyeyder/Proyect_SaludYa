const mongoose = require("mongoose");

const DocumentoSchema = new mongoose.Schema({
  pacienteId: String,
  tipoDocumento: String,
  numeroDocumento: String,
  titulo: String,
  descripcion: String,
  archivoUrl: String,
  fecha: String
}, { timestamps: true });

module.exports = mongoose.model("DocumentoMedico", DocumentoSchema);
