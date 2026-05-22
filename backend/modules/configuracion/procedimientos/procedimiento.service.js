const Procedimiento = require("./procedimiento.model");

async function crearProcedimiento(data) {

  const existe =
    await Procedimiento.findOne({
      codigo: data.codigo,
    });

  if (existe) {
    throw new Error(
      "El código ya existe"
    );
  }

  return await Procedimiento.create(
    data
  );
}

async function obtenerProcedimientos() {

  return await Procedimiento.find()
    .sort({
      createdAt: -1,
    });

}

async function actualizarProcedimiento(
  id,
  data
) {

  const procedimiento =
    await Procedimiento.findById(id);

  if (!procedimiento) {
    throw new Error(
      "Procedimiento no encontrado"
    );
  }

  const existeCodigo =
    await Procedimiento.findOne({
      codigo: data.codigo,
      _id: { $ne: id },
    });

  if (existeCodigo) {
    throw new Error(
      "Ya existe otro procedimiento con ese código"
    );
  }

  procedimiento.codigo =
    data.codigo;

  procedimiento.nombre =
    data.nombre;

  procedimiento.precio =
    data.precio;

  procedimiento.estado =
    data.estado;

  await procedimiento.save();

  return procedimiento;

}

async function cambiarEstadoProcedimiento(
  id
) {

  const procedimiento =
    await Procedimiento.findById(id);

  if (!procedimiento) {
    throw new Error(
      "Procedimiento no encontrado"
    );
  }

  procedimiento.estado =
    !procedimiento.estado;

  await procedimiento.save();

  return procedimiento;

}

module.exports = {
  crearProcedimiento,
  obtenerProcedimientos,
  actualizarProcedimiento,
  cambiarEstadoProcedimiento,
};