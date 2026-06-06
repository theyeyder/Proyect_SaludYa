const router = require("express").Router();

const controller = require("./factura.controller");

router.get("/", controller.obtenerFacturas);

router.get("/:id", controller.obtenerFacturaPorId);

router.get(
  "/paciente/:pacienteId",
  controller.obtenerFacturasPorPaciente
);

router.post("/", controller.crearFactura);

router.patch(
  "/:id/estado",
  controller.cambiarEstadoFactura
);

module.exports = router;