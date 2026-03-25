function obtenerTitulo(nivelAcceso, sexo) {
  if (nivelAcceso === "Médico") return sexo === "F" ? "Dra." : "Dr.";
  if (nivelAcceso === "Administrador") return "Admin.";
  if (nivelAcceso === "Admisión") return "Lic.";
  if (nivelAcceso === "Facturación") return "Lic.";
  return "";
}

module.exports = obtenerTitulo;
