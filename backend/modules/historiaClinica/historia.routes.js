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
router.put(
  "/:id",
  controller.actualizarHistoria
);

router.patch(
  "/:id/finalizar",
  controller.finalizarHistoria
);

module.exports = router;