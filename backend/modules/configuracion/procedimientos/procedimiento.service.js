const Procedimiento = require("./procedimiento.model");

async function crearProcedimiento(data) {

  const existe = await Procedimiento.findOne({
    codigo: data.codigo,
  });

  if (existe) {
    throw new Error(
      "El código ya existe"
    );
  }

  return await Procedimiento.create(data);
}

async function obtenerProcedimientos() {

  return await Procedimiento.find()
    .sort({ createdAt: -1 });

}

async function actualizarProcedimiento(
  id,
  data
) {

  return await Procedimiento.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

}

module.exports = {
  crearProcedimiento,
  obtenerProcedimientos,
  actualizarProcedimiento,
};