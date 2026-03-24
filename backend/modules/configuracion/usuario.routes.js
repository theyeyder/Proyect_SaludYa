const router = require("express").Router();
const controller = require("./usuario.controller");

router.post("/", controller.crearUsuario);
router.get("/", controller.obtenerUsuarios);
router.get("/:id", controller.obtenerUsuarioPorId);
router.put("/:id", controller.actualizarUsuario);
router.delete("/:id", controller.eliminarUsuario);

module.exports = router;