const mongoose = require("mongoose");

const medicamentoSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    concentracion: {
      type: String,
      required: true,
      trim: true,
    },

    presentacion: {
      type: String,
      required: true,
      trim: true,
    },

    cantidad: {
      type: Number,
      default: 0,
    },

    precio: {
      type: Number,
      default: 0,
    },

    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "medicamentos",
  }
);

module.exports = mongoose.model(
  "Medicamento",
  medicamentoSchema
);