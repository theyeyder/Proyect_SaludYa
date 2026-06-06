const mongoose = require("mongoose");

const PacienteSchema = new mongoose.Schema(
  {
    nombres: { type: String, required: true, trim: true },

    tipoIdentificacion: { type: String, required: true, trim: true },
    numeroIdentificacion: { type: String, required: true, trim: true },

    sexo: {
      type: String,
      enum: ["Masculino", "Femenino", "Otro"],
      required: true,
    },

    fechaNacimiento: { type: String, required: true },
    edad: { type: Number, default: 0 },

    ciudad: { type: String, required: true, trim: true },
    direccion: { type: String, required: true, trim: true },

    telefono: { type: String, default: "", trim: true },
    correo: { type: String, default: "", trim: true },

    razaEtnia: {
      type: String,
      enum: [
        "Ninguna",
        "Indigena",
        "Afrocolombiano",
        "Rrom",
        "Mestizo",
        "Blanco",
        "",
      ],
      default: "",
    },

    tipoSangre: { type: String, default: "", trim: true },

    alergico: {
      type: String,
      enum: ["Si", "No"],
      default: "No",
    },

    detalleAlergia: { type: String, default: "", trim: true },

    sintomas: { type: String, default: "", trim: true },
    acompanante: { type: String, default: "", trim: true },

    estado: { type: Boolean, default: true },
  },
  { timestamps: true }
);

PacienteSchema.index(
  { tipoIdentificacion: 1, numeroIdentificacion: 1 },
  { unique: true }
);

module.exports = mongoose.model("Paciente", PacienteSchema);