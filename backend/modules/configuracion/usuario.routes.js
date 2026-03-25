const router = require("express").Router();
const controller = require("./usuario.controller");

router.get("/", controller.obtenerUsuarios);
router.post("/", controller.crearUsuario);

module.exports = router;
