const router = require("express").Router();
const controller = require("./cita.controller");

router.get("/", controller.obtenerCitas);
router.post("/", controller.crearCita);

module.exports = router;
