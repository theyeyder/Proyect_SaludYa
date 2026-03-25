const service = require("./usuario.service");
const obtenerTitulo = require("../../utils/tituloUsuario");

exports.crearUsuario = async (req, res) => {
  try {
    const { username, password, nombre, apellido, nivelAcceso, sexo } = req.body;
    if (!username || !password || !nombre || !apellido || !nivelAcceso || !sexo) {
      return res.status(400).json({ ok: false, message: "Todos los campos son obligatorios" });
    }
    const existe = await service.buscarPorUsername(username);
    if (existe) {
      return res.status(400).json({ ok: false, message: "El username ya existe" });
    }
    const titulo = obtenerTitulo(nivelAcceso, sexo);
    const usuario = await service.crear({
      username, password, nombre, apellido, nivelAcceso, sexo, titulo
    });
    res.status(201).json({ ok: true, message: "Usuario creado correctamente", data: usuario });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al crear usuario", error: error.message });
  }
};

exports.obtenerUsuarios = async (req, res) => {
  const usuarios = await service.listar();
  res.json({ ok: true, data: usuarios });
};
