const router = require("express").Router();
const controller = require("./paciente.controller");

// Crear paciente
router.post("/", controller.crearPaciente);

// Obtener todos los pacientes
router.get("/", controller.obtenerPacientes);

// Buscar paciente por tipo y número de identificación
router.get(
  "/documento/:tipoIdentificacion/:numeroIdentificacion",
  controller.buscarPacientePorDocumento
);

module.exports = router;