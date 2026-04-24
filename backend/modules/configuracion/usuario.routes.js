const router = require("express").Router();
const controller = require("./usuario.controller");

router.get("/", controller.obtenerUsuarios);
router.post("/", controller.crearUsuario);

router.patch("/:id/estado", controller.cambiarEstadoUsuario);
router.patch("/:id/password", controller.cambiarPassword);

module.exports = router;