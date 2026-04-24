const service = require("./usuario.service");
const obtenerTitulo = require("../../utils/tituloUsuario");

exports.crearUsuario = async (req, res) => {
  try {
    const {
      username,
      correo,
      telefono,
      password,
      repetirPassword,
      nombre,
      apellido,
      nivelAcceso,
      sexo,
      estado,
    } = req.body;

    if (
      !username ||
      !correo ||
      !password ||
      !repetirPassword ||
      !nombre ||
      !nivelAcceso ||
      !sexo
    ) {
      return res.status(400).json({
        ok: false,
        message: "Todos los campos obligatorios deben estar completos",
      });
    }

    if (password !== repetirPassword) {
      return res.status(400).json({
        ok: false,
        message: "Las contraseñas no coinciden",
      });
    }

    const existeUsername = await service.buscarPorUsername(username);

    if (existeUsername) {
      return res.status(400).json({
        ok: false,
        message: "El usuario ya existe",
      });
    }

    const existeCorreo = await service.buscarPorCorreo(correo);

    if (existeCorreo) {
      return res.status(400).json({
        ok: false,
        message: "El correo ya está registrado",
      });
    }

    const titulo = obtenerTitulo(nivelAcceso, sexo);

    const usuario = await service.crear({
      username: String(username).trim(),
      correo: String(correo).trim(),
      telefono: telefono || "",
      password: String(password).trim(),
      nombre: String(nombre).trim(),
      apellido: apellido || "",
      nivelAcceso,
      sexo,
      titulo,
      estado: estado === false ? false : true,
    });

    return res.status(201).json({
      ok: true,
      message: "Usuario creado correctamente",
      data: usuario,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        ok: false,
        message: "El usuario o correo ya existe",
      });
    }

    return res.status(500).json({
      ok: false,
      message: "Error al crear usuario",
      error: error.message,
    });
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await service.listar();

    return res.json({
      ok: true,
      data: usuarios,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
};

exports.cambiarEstadoUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await service.buscarPorId(id);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    usuario.estado = !usuario.estado;
    await usuario.save();

    return res.json({
      ok: true,
      message: usuario.estado
        ? "Usuario activado correctamente"
        : "Usuario bloqueado correctamente",
      data: usuario,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error al cambiar el estado del usuario",
      error: error.message,
    });
  }
};

exports.cambiarPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || !String(password).trim()) {
      return res.status(400).json({
        ok: false,
        message: "La nueva contraseña es obligatoria",
      });
    }

    const usuario = await service.buscarPorId(id);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    usuario.password = String(password).trim();
    await usuario.save();

    return res.json({
      ok: true,
      message: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error al cambiar la contraseña",
      error: error.message,
    });
  }
};