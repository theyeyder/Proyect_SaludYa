const mongoose = require("mongoose");

const PacienteSchema = new mongoose.Schema({
  tipoDocumento: String,
  numeroDocumento: { type: String, unique: true },
  nombre: String,
  apellido: String,
  fechaNacimiento: String,
  telefono: String,
  direccion: String,
  correo: String,
  eps: String
}, { timestamps: true });

module.exports = mongoose.model("Paciente", PacienteSchema);
