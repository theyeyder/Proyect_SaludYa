const service = require("./usuario.service");

async function crearUsuario(req, res) {
  try {
    const { username, password, nombre, apellido, nivelAcceso } = req.body;

    if (!username || !password || !nombre || !apellido || !nivelAcceso) {
      return res.status(400).json({
        ok: false,
        message: "Todos los campos son obligatorios",
      });
    }

    const existe = await service.buscarPorUsername(username);

    if (existe) {
      return res.status(400).json({
        ok: false,
        message: "El username ya existe",
      });
    }

    const usuario = await service.crearUsuario({
      username,
      password,
      nombre,
      apellido,
      nivelAcceso,
    });

    return res.status(201).json({
      ok: true,
      message: "Usuario creado correctamente",
      data: usuario,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error al crear usuario",
      error: error.message,
    });
  }
}

async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await service.obtenerUsuarios();

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
}

async function obtenerUsuarioPorId(req, res) {
  try {
    const usuario = await service.obtenerUsuarioPorId(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    return res.json({
      ok: true,
      data: usuario,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error al buscar usuario",
      error: error.message,
    });
  }
}

async function actualizarUsuario(req, res) {
  try {
    const usuario = await service.actualizarUsuario(req.params.id, req.body);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    return res.json({
      ok: true,
      message: "Usuario actualizado correctamente",
      data: usuario,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error al actualizar usuario",
      error: error.message,
    });
  }
}

async function eliminarUsuario(req, res) {
  try {
    const usuario = await service.eliminarUsuario(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    return res.json({
      ok: true,
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error al eliminar usuario",
      error: error.message,
    });
  }
}

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
};