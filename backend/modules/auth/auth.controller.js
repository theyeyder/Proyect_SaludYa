const Usuario = require("../configuracion/usuario.model");
const { generarToken } = require("../../utils/jwt");

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        ok: false,
        message: "Username y password son obligatorios",
      });
    }

    const usuario = await Usuario.findOne({
      username,
      password,
      estado: true,
    });

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales inválidas",
      });
    }

    const token = generarToken(usuario);

    return res.json({
      ok: true,
      message: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario._id,
        username: usuario.username,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        nivelAcceso: usuario.nivelAcceso,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error en el inicio de sesión",
      error: error.message,
    });
  }
}

module.exports = { login };