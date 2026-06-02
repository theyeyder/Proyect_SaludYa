const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./modules/auth/auth.routes");

const usuarioRoutes = require(
  "./modules/configuracion/usuario.routes"
);

const procedimientoRoutes = require(
  "./modules/configuracion/procedimientos/procedimiento.routes"
);

const tipoConsultaRoutes = require(
  "./modules/configuracion/tiposConsulta/tipoConsulta.routes"
);

const laboratorioRoutes = require(
  "./modules/configuracion/laboratorio/laboratorio.routes"
);


const medicamentoRoutes = require(
  "./modules/configuracion/medicamentos/medicamento.routes"
);

const pacienteRoutes = require(
  "./modules/admision/paciente.routes"
);

const citaRoutes = require(
  "./modules/citas/cita.routes"
);

const historiaRoutes = require(
  "./modules/historiaClinica/historia.routes"
);

const ordenRoutes = require(
  "./modules/ordenesMedicas/orden.routes"
);

const facturaRoutes = require(
  "./modules/facturacion/factura.routes"
);

const documentoRoutes = require(
  "./modules/documentos/documento.routes"
);

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.get("/", (req, res) => {
  res.json({
    message: "API SaludYa funcionando",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/usuarios", usuarioRoutes);

app.use("/api/procedimientos", procedimientoRoutes);

app.use("/api/pacientes", pacienteRoutes);

app.use("/api/citas", citaRoutes);

app.use("/api/historias", historiaRoutes);

app.use("/api/ordenes", ordenRoutes);

app.use("/api/facturas", facturaRoutes);

app.use("/api/documentos", documentoRoutes);

app.use("/api/tipos-consulta", tipoConsultaRoutes);

app.use("/api/laboratorios", laboratorioRoutes);

app.use("/api/medicamentos", medicamentoRoutes);

module.exports = app;
