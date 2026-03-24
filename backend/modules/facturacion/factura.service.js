const Factura = require("./factura.model");

exports.crear = (data) => Factura.create(data);
exports.listar = () => Factura.find();
