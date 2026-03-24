const router = require("express").Router();
const controller = require("./paciente.controller");

router.get("/", controller.obtenerPacientes);
router.get("/documento/:numeroDocumento", controller.buscarPacientePorDocumento);
router.post("/", controller.crearPaciente);

module.exports = router;
