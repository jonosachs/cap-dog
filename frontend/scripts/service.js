import { getAll, getCountry } from "./fetch.js";

export async function getCountryFromInput(name) {
  const data = await getCountry(name);
  if (!data) {
    return "Could not find country data";
  }
  return data;
}

export async function getAllCountries() {
  const all = await getAll();
  if (all.length === 0) return null;
  return all;
}
