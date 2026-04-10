import { getCountryFromInput, getSuggestions } from "./service.js";

export function setupListeners() {
  const submit = document.getElementById("submit-btn");
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  input.addEventListener("input", handleInput);
  submit.addEventListener("click", handleClick);
}

async function handleInput() {
  const userInput = input.value;
  clearOutput();
  if (!userInput) return;
  try {
    const suggestions = await getSuggestions(userInput);
    if (suggestions) {
      const container = buildSuggestions(suggestions);
      show(container);
    } else {
      show("No results.");
    }
  } catch (err) {
    console.error(err);
  }
}

async function handleClick() {
  const userInput = input.value;
  try {
    clearOutput();
    if (!userInput) return;
    const countryJson = await getCountryFromInput(userInput);
    // const countryStr = JSON.stringify(countryJson);
    const output = buildCountryOuput(countryJson);
    show(output);
  } catch (err) {
    console.error(err);
  }
}

function clearOutput() {
  output.textContent = "";
}

function show(item) {
  if (item instanceof Node) {
    output.replaceChildren(item);
    return;
  }

  output.textContent = item;
}

function buildCountryOuput(country) {
  const container = document.createElement("div");

  for (const key in country) {
    const field = document.createElement("div");
    field.textContent = `${key}: ${country[key]}`;
    container.appendChild(field);
  }

  return container;
}

function buildSuggestions(countries) {
  console.log(countries);
  const container = document.createElement("div");

  countries.forEach((f) => {
    const field = document.createElement("div");
    field.textContent = f.country;
    field.className = "suggestions";

    //make suggestions clickable
    field.addEventListener("click", async (event) => {
      const target = event.currentTarget;

      if (target && target.textContent) {
        document.getElementById("input").value = target.textContent;
        container.replaceChildren("");
      }
    });
    container.appendChild(field);
  });
  return container;
}
