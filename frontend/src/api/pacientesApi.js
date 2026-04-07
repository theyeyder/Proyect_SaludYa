/*const BASE_URL = "http://localhost:4000/api/pacientes";

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

export async function obtenerPacientes() {
  const response = await fetch(BASE_URL);
  return await response.json();
}

export async function buscarPacientePorDocumento(numeroIdentificacion) {
  const response = await fetch(`${BASE_URL}/documento/${numeroIdentificacion}`);
  return await response.json();
}
  */

const BASE_URL = "http://localhost:4000/api/pacientes";

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

export async function obtenerPacientes() {
  const response = await fetch(BASE_URL);
  return await response.json();
}

export async function buscarPacientePorDocumento(numeroIdentificacion) {
  const response = await fetch(`${BASE_URL}/documento/${numeroIdentificacion}`);
  return await response.json();
}
