const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
  {
    titulo: { type: String, default: "" },

    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    correo: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    telefono: {
      type: String,
      default: "",
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    apellido: {
      type: String,
      default: "",
      trim: true,
    },

    sexo: {
      type: String,
      enum: ["M", "F"],
      required: true,
    },

    nivelAcceso: {
      type: String,
      enum: ["Administrador", "Admisión", "Médico", "Facturación"],
      default: "Admisión",
    },

    estado: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", UsuarioSchema);