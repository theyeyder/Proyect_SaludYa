const router = require("express").Router();
const controller = require("./paciente.controller");

router.post("/", controller.crearPaciente);
router.get("/", controller.obtenerPacientes);
router.get("/documento/:numeroIdentificacion", controller.buscarPacientePorDocumento);

module.exports = router;
