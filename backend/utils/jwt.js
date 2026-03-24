const jwt = require("jsonwebtoken");

function generarToken(usuario) {
  return jwt.sign(
    {
      id: usuario._id,
      username: usuario.username,
      nivelAcceso: usuario.nivelAcceso,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

module.exports = { generarToken };