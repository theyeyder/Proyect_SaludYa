const router = require("express").Router();

const controller = require("./laboratorio.controller");

router.get("/", controller.obtener);

router.post("/", controller.crear);

router.put("/:id", controller.actualizar);

router.patch("/:id/estado", controller.cambiarEstado);


module.exports = router;