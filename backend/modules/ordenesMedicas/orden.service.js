const Orden = require("./orden.model");

exports.crear = (data) => Orden.create(data);
exports.listar = () => Orden.find();
exports.listarPorTipo = (tipo) => Orden.find({ tipo });
