const BASE_URL = "https://proyect-saludya-backend.onrender.com/api/pacientes";

export async function crearPaciente(data) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function buscarPacientePorDocumento(tipoIdentificacion, numeroIdentificacion) {
  const response = await fetch(
    `${BASE_URL}/documento/${tipoIdentificacion}/${numeroIdentificacion}`
  );

  return await response.json();
}