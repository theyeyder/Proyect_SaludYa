const service = require("./documento.service");

exports.crearDocumento = async (req, res) => {
  const documento = await service.crear(req.body);
  res.status(201).json(documento);
};

exports.obtenerDocumentos = async (req, res) => {
  const documentos = await service.listar();
  res.json(documentos);
};

exports.buscarDocumentosPaciente = async (req, res) => {
  const { tipoDocumento, numeroDocumento } = req.params;
  const documentos = await service.buscarPorIdentificacion(tipoDocumento, numeroDocumento);
  res.json(documentos);
};
