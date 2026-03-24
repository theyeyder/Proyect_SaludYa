const mongoose = require("mongoose");

const FacturaSchema = new mongoose.Schema({
  numeroFactura: String,
  pacienteId: String,
  citaId: String,
  concepto: String,
  valor: Number,
  estadoPago: { type: String, default: "Pendiente" },
  fechaEmision: String
}, { timestamps: true });

module.exports = mongoose.model("Factura", FacturaSchema);
