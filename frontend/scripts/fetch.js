import { ApiError } from "./ApiError.js";

export async function getCountry(country) {
  const encodedCountry = encodeURIComponent(country.trim());
  const response = await fetch(
    `http://localhost:8080/countries/${encodedCountry}`,
  );

  if (!response.ok) {
    const err = await response.text();
    throw new ApiError(response.status, err);
  }

  const jsonResponse = await response.json();
  return jsonResponse;
}

export async function getAll() {
  const response = await fetch(`http://localhost:8080/countries`);

  if (!response.ok) {
    const err = await response.text();
    throw new ApiError(response.status, err);
  }

  const jsonResponse = await response.json();
  return jsonResponse;
}
