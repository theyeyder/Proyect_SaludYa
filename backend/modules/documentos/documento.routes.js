const router = require("express").Router();
const controller = require("./documento.controller");

router.get("/", controller.obtenerDocumentos);
router.get("/:tipoDocumento/:numeroDocumento", controller.buscarDocumentosPaciente);
router.post("/", controller.crearDocumento);

module.exports = router;
