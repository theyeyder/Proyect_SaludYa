const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    nivelAcceso: {
      type: String,
      enum: ["Administrador", "Admisión", "Médico", "Facturación"],
      required: true,
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", UsuarioSchema);
