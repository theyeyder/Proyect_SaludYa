const mongoose = require("mongoose");

const HistoriaSchema = new mongoose.Schema(
  {
    pacienteId: {
      type: String,
      required: true,
    },

    citaId: {
      type: String,
      required: true,
    },

    medicoId: {
      type: String,
      required: true,
    },

    datosPaciente: {
      nombres: String,
      apellidos: String,
      tipoDocumento: String,
      numeroDocumento: String,
      telefono: String,
      correo: String,
      edad: String,
      sexo: String,
      fechaNacimiento: String,
    },

    datosCita: {
      nombreMedico: String,
      tipoConsulta: String,
      fecha: String,
      hora: String,
      motivo: String,
    },

    signosVitales: {
      peso: String,
      talla: String,
      temperatura: String,
      presionArterial: String,
      frecuenciaCardiaca: String,
      saturacion: String,
    },

    motivoConsulta: {
      type: String,
      default: "",
    },

    enfermedadActual: {
      type: String,
      default: "",
    },

    antecedentesPersonales: {
      type: String,
      default: "",
    },

    antecedentesFamiliares: {
      type: String,
      default: "",
    },

    alergias: {
      type: String,
      default: "",
    },

    diagnostico: {
      type: String,
      default: "",
    },

    conducta: {
      type: String,
      default: "",
    },

    tratamiento: {
      type: String,
      default: "",
    },

    observaciones: {
      type: String,
      default: "",
    },

    numeroHistoria: {
      type: String,
    },

    numeroIngreso: {
      type: Number,
    },

    horaAtencion: {
      type: String,
    },

    estadoHistoria: {
      type: String,
      enum: ["Abierta", "Cerrada"],
      default: "Abierta",
    },
  },
  {
    timestamps: true,
    collection: "historias_clinicas",
  },
);

module.exports = mongoose.model("HistoriaClinica", HistoriaSchema);
