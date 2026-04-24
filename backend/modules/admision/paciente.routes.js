const router = require("express").Router();
const controller = require("./paciente.controller");

// CREAR
router.post("/", controller.crearPaciente);

// 🔥 LISTAR TODOS (ESTO TE FALTABA)
router.get("/", controller.obtenerPacientes);

// BUSCAR POR DOCUMENTO
router.get(
  "/documento/:tipoIdentificacion/:numeroIdentificacion",
  controller.buscarPacientePorDocumento
);

// ACTUALIZAR
router.put("/:id", controller.actualizarPaciente);

module.exports = router;