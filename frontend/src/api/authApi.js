/*
const BASE_URL = "http://localhost:4000/api/auth";

export async function login(data) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
}
  */
 const BASE_URL = "http://localhost:4000/api/auth";

export async function login(data) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}