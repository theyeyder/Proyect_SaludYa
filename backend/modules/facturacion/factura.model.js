const mongoose = require("mongoose");

const FacturaSchema = new mongoose.Schema(
  {
    numeroFactura: {
      type: String,
      unique: true,
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

    citaId: {
      type: String,
      default: "",
    },

    medicoId: {
      type: String,
      default: "",
    },

    datosPaciente: {
      nombres: String,
      apellidos: String,
      tipoDocumento: String,
      numeroDocumento: String,
      telefono: String,
      correo: String,
    },

    datosMedico: {
      nombreMedico: String,
    },

    detalle: [
      {
        tipo: String,
        codigo: String,
        descripcion: String,
        cantidad: Number,
        valorUnitario: Number,
        total: Number,
      },
    ],

    subtotal: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },

    estadoPago: {
      type: String,
      enum: ["Pendiente", "Pagada", "Anulada"],
      default: "Pendiente",
    },

    fechaEmision: {
      type: String,
      default: () => new Date().toISOString().slice(0, 10),
    },
  },
  {
    timestamps: true,
    collection: "facturas",
  }
);

module.exports = mongoose.model("Factura", FacturaSchema);