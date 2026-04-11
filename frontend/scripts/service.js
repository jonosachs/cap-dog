import { getAll, getCountry } from "./fetch.js";

export async function getCountryFromInput(name) {
  const data = await getCountry(name);
  if (!data) {
    return "Could not find country data";
  }
  return data;
}

export async function getSuggestions(input) {
  const all = await getAll();
  const filtered = all.filter((c) =>
    c.country.toLowerCase().startsWith(input.toLowerCase()),
  );
  if (filtered.length == 0) return null;
  return filtered;
}
