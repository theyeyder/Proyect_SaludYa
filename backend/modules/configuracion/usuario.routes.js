const router = require("express").Router();
const controller = require("./usuario.controller");

router.get("/", controller.obtenerUsuarios);
router.post("/", controller.crearUsuario);
router.get("/medicos", controller.obtenerMedicos);

router.patch("/:id/estado", controller.cambiarEstadoUsuario);
router.patch("/:id/password", controller.cambiarPassword);

router.patch(
  "/:id/reset-password",
  controller.resetPassword
);

module.exports = router;