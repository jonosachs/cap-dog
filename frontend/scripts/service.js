import { getAll, getCountry } from "./fetch.js";

export async function getCountryFromInput(name) {
  try {
    const data = await getCountry(name);
    if (!data) {
      return "Could not find country data";
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getSuggestions(input) {
  try {
    const all = await getAll();
    const filtered = all.filter((c) =>
      c.country.toLowerCase().startsWith(input.toLowerCase()),
    );
    if (filtered.length == 0) return null;
    return filtered;
  } catch (error) {
    throw new Error(error.message);
  }
}
