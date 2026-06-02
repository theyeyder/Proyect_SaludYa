const BASE_URL = "https://proyect-saludya-backend.onrender.com/api/usuarios";

export async function crearUsuario(data) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}