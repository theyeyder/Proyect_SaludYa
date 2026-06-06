const { generarToken } = require("../../utils/jwt");
const Usuario = require("../configuracion/usuario.model");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const usuario = await Usuario.findOne({ username, password, estado: true });

  if (!usuario) {
    return res.status(401).json({
      ok: false,
      message: "Credenciales inválidas"
    });
  }

  const token = generarToken(usuario);

  res.json({
    ok: true,
    message: "Inicio de sesión exitoso",
    token,
    usuario: {
      id: usuario._id,
      titulo: usuario.titulo,
      username: usuario.username,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      nivelAcceso: usuario.nivelAcceso
    }
  });
};
