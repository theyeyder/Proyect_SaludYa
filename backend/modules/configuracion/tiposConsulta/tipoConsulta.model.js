const mongoose = require("mongoose");

const tipoConsultaSchema =
  new mongoose.Schema(
    {
      codigo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },

      nombre: {
        type: String,
        required: true,
        trim: true,
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
      collection: "tipos_consulta",
    }
  );

module.exports = mongoose.model(
  "TipoConsulta",
  tipoConsultaSchema
);