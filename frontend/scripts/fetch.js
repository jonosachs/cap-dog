export async function getCountry(country) {
  const encodedCountry = encodeURIComponent(country.trim());
  const response = await fetch(
    `http://localhost:8080/countries/${encodedCountry}`,
  );

  if (!response.ok) {
    throw new Error(response.message);
  }

  const jsonResponse = await response.json();
  return jsonResponse;
}

export async function getAll() {
  const response = await fetch(`http://localhost:8080/countries`);

  if (!response.ok) {
    throw new Error(response.message);
  }

  const jsonResponse = await response.json();
  return jsonResponse;
}
