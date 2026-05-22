const TipoConsulta = require(
  "./tipoConsulta.model"
);

async function crearTipoConsulta(
  data
) {

  const existe =
    await TipoConsulta.findOne({
      codigo: data.codigo,
    });

  if (existe) {
    throw new Error(
      "El código ya existe"
    );
  }

  return await TipoConsulta.create(
    data
  );
}

async function obtenerTiposConsulta() {

  return await TipoConsulta.find()
    .sort({
      createdAt: -1,
    });

}

async function actualizarTipoConsulta(
  id,
  data
) {

  const consulta =
    await TipoConsulta.findById(id);

  if (!consulta) {
    throw new Error(
      "Tipo de consulta no encontrado"
    );
  }

  const existeCodigo =
    await TipoConsulta.findOne({
      codigo: data.codigo,
      _id: { $ne: id },
    });

  if (existeCodigo) {
    throw new Error(
      "Ya existe otro tipo de consulta con ese código"
    );
  }

  consulta.codigo =
    data.codigo;

  consulta.nombre =
    data.nombre;

  consulta.precio =
    data.precio;

  consulta.estado =
    data.estado;

  await consulta.save();

  return consulta;

}

async function cambiarEstadoTipoConsulta(
  id
) {

  const consulta =
    await TipoConsulta.findById(id);

  if (!consulta) {
    throw new Error(
      "Tipo de consulta no encontrado"
    );
  }

  consulta.estado =
    !consulta.estado;

  await consulta.save();

  return consulta;

}

module.exports = {
  crearTipoConsulta,
  obtenerTiposConsulta,
  actualizarTipoConsulta,
  cambiarEstadoTipoConsulta,
};