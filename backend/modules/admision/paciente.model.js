const mongoose = require("mongoose");

const PacienteSchema = new mongoose.Schema(
  {
    nombres: { type: String, required: true },
    tipoIdentificacion: { type: String, required: true },
    numeroIdentificacion: { type: String, required: true, unique: true },
    ciudad: { type: String, required: true },
    direccion: { type: String, required: true },
    fechaNacimiento: { type: String, required: true },
    sintomas: { type: String, default: "" },
    alergico: { type: String, enum: ["Si", "No"], default: "No" },
    acompanante: { type: String, default: "" },
    sexo: {
      type: String,
      enum: ["Masculino", "Femenino", "Otro"],
      required: true,
    },
    estado: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Paciente", PacienteSchema);
