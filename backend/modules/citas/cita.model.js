const mongoose = require("mongoose");

const CitaSchema = new mongoose.Schema(
  {
    pacienteId: {
      type: String,
      required: true,
    },

    nombrePaciente: {
      type: String,
      required: true,
    },

    tipoDocumento: {
      type: String,
      required: true,
    },

    numeroDocumento: {
      type: String,
      required: true,
    },

    medicoId: {
      type: String,
      required: true,
    },

    nombreMedico: {
      type: String,
      required: true,
    },

    tipoConsulta: {
      type: String,
      required: true,
    },

    fecha: {
      type: String,
      required: true,
    },

    hora: {
      type: String,
      required: true,
    },

    motivo: {
      type: String,
      default: "",
    },

    observaciones: {
      type: String,
      default: "",
    },

    estado: {
      type: String,
      enum: ["Agendada", "Confirmada", "Cancelada", "Finalizada"],
      default: "Agendada",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cita", CitaSchema);