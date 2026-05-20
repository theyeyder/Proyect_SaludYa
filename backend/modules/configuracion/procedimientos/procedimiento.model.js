const mongoose = require("mongoose");

const procedimientoSchema = new mongoose.Schema(
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

    precio: {
      type: Number,
      required: true,
      default: 0,
    },

    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "procedimientos",
  }
);

module.exports = mongoose.model(
  "Procedimiento",
  procedimientoSchema
);