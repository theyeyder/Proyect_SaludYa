const router = require("express").Router();
const controller = require("./orden.controller");

router.get("/", controller.obtenerOrdenes);
router.get("/tipo/:tipo", controller.obtenerOrdenesPorTipo);
router.post("/", controller.crearOrden);

module.exports = router;
