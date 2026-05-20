const router = require("express").Router();

const controller = require(
  "./procedimiento.controller"
);

router.get(
  "/",
  controller.obtener
);

router.post(
  "/",
  controller.crear
);

router.put(
  "/:id",
  controller.actualizar
);

module.exports = router;