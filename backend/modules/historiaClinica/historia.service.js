const Historia = require("./historia.model");

exports.crear = (data) => Historia.create(data);
exports.listar = () => Historia.find();
