<<<<<<< HEAD
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

=======
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

>>>>>>> 0594392932fa2e9c645c4fdceda86a09ba7e2d6e
module.exports = router;