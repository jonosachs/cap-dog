import { setupListeners, buildDataList } from "./events.js";
import { getAllCountries } from "./service.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const countries = await getAllCountries();
    buildDataList(countries);
    setupListeners();
  } catch (error) {
    console.log(error);
  }
});
