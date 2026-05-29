const router = require("express").Router();

const controller = require("./historia.controller");



router.get(
  "/",
  controller.obtenerHistorias
);

router.get(
  "/paciente/:pacienteId",
  controller.obtenerHistoriasPorPaciente
);

router.get(
  "/:id",
  controller.obtenerHistoriaPorId
);

router.post(
  "/",
  controller.crearHistoria
);

module.exports = router;