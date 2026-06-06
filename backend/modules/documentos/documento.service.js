const Documento = require("./documento.model");

exports.crear = (data) => Documento.create(data);
exports.listar = () => Documento.find();
exports.buscarPorIdentificacion = (tipoDocumento, numeroDocumento) =>
  Documento.find({ tipoDocumento, numeroDocumento });
