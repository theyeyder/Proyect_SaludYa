const router = require("express").Router();
const controller = require("./historia.controller");

router.get("/", controller.obtenerHistorias);
router.post("/", controller.crearHistoria);

module.exports = router;
