const router = require("express").Router();
const controller = require("./factura.controller");

router.get("/", controller.obtenerFacturas);
router.post("/", controller.crearFactura);

module.exports = router;
