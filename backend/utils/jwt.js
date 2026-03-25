const jwt = require("jsonwebtoken");

function generarToken(usuario) {
  const secret = process.env.JWT_SECRET || "saludya_secret";
  return jwt.sign(
    {
      id: usuario._id || "1",
      username: usuario.username || "admin",
      rol: usuario.nivelAcceso || "Administrador",
      titulo: usuario.titulo || "Admin.",
      nombre: usuario.nombre || "Usuario",
      apellido: usuario.apellido || "Sistema"
    },
    secret,
    { expiresIn: "1d" }
  );
}

module.exports = { generarToken };
