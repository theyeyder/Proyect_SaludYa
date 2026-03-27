const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const usuarioRoutes = require("./modules/configuracion/usuario.routes");
const pacienteRoutes = require("./modules/admision/paciente.routes");
const citaRoutes = require("./modules/citas/cita.routes");
const historiaRoutes = require("./modules/historiaClinica/historia.routes");
const ordenRoutes = require("./modules/ordenesMedicas/orden.routes");
const facturaRoutes = require("./modules/facturacion/factura.routes");
const documentoRoutes = require("./modules/documentos/documento.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API SaludYa funcionando" });
});

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/citas", citaRoutes);
app.use("/api/historias", historiaRoutes);
app.use("/api/ordenes", ordenRoutes);
app.use("/api/facturas", facturaRoutes);
app.use("/api/documentos", documentoRoutes);

module.exports = app;
