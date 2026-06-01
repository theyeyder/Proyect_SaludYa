const mongoose = require("mongoose");

const OrdenSchema = new mongoose.Schema(
  {
    tipo: {
      type: String,
      enum: ["formula", "procedimiento", "laboratorio", "incapacidad"],
      required: true,
    },

    pacienteId: {
      type: String,
      required: true,
    },

    historiaId: {
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
      edad: String,
      sexo: String,
      telefono: String,
    },

    datosMedico: {
      nombreMedico: String,
    },

    items: [
      {
        itemId: String,
        codigo: String,
        nombre: String,
        descripcion: String,
        concentracion: String,
        presentacion: String,
        cantidad: String,
        dosis: String,
        frecuencia: String,
        duracion: String,
        viaAdministracion: String,
        observacion: String,
        precio: Number,
      },
    ],

    incapacidad: {
      dias: String,
      fechaInicio: String,
      fechaFin: String,
      motivo: String,
      observacion: String,
    },

    diagnostico: {
      type: String,
      default: "",
    },

    observaciones: {
      type: String,
      default: "",
    },

    estado: {
      type: String,
      enum: ["Activa", "Anulada"],
      default: "Activa",
    },

    fecha: {
      type: String,
      default: () => new Date().toISOString().slice(0, 10),
    },
  },
  {
    timestamps: true,
    collection: "ordenes_medicas",
  },
);

module.exports = mongoose.model("OrdenMedica", OrdenSchema);
