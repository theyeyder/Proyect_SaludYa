const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  titulo: String,
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  nombre: String,
  apellido: String,
  sexo: { type: String, enum: ["M", "F"], required: true },
  nivelAcceso: {
    type: String,
    enum: ["Administrador", "Admisión", "Médico", "Facturación"],
    default: "Admisión"
  },
  estado: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Usuario", UsuarioSchema);
