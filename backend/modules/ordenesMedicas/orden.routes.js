const router = require("express").Router();

const controller = require("./orden.controller");

router.get("/", controller.obtenerOrdenes);

router.get("/tipo/:tipo", controller.obtenerOrdenesPorTipo);

router.get("/historia/:historiaId", controller.obtenerOrdenesPorHistoria);

router.get("/paciente/:pacienteId", controller.obtenerOrdenesPorPaciente);

router.get("/:id", controller.obtenerOrdenPorId);

router.post("/", controller.crearOrden);

router.patch("/:id/anular", controller.anularOrden);

module.exports = router;