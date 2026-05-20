const router = require("express").Router();

const controller = require("./cita.controller");

router.post("/", controller.crearCita);

router.get("/", controller.obtenerCitas);

router.put("/:id/estado", controller.actualizarEstado);

router.put("/:id/reprogramar", controller.reprogramarCita);
router.put("/:id", controller.editarCita);
module.exports = router;
