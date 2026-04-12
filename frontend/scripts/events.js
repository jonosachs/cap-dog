import { getCountryFromInput } from "./service.js";

const output = document.getElementById("output");

export function setupListeners() {
  const btn = document.getElementById("submit-btn");
  const input = document.getElementById("input");

  input.addEventListener("keydown", (e) => handleEnter(e));
  btn.addEventListener("click", handleClick);
}

function handleEnter(e) {
  if (e.key === "Enter") {
    handleClick();
  }
}

async function handleClick() {
  const userInput = input.value;
  try {
    clearOutput();
    if (!userInput) return;
    const countryJson = await getCountryFromInput(userInput);
    if (countryJson) {
      const formatted = buildCountryOuput(countryJson);
      show(formatted);
    } else {
      show("Country not found.");
    }
  } catch (err) {
    handleError(err);
  }
}

function handleError(err) {
  if (err.status === 404) {
    show(err.message);
    return;
  }
  console.error(err.status, err.message, err.stack);
  show(`Something went wrong: ${err.message}`);
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
  const table = document.createElement("table");
  table.className = "table text-start";

  const tableBody = document.createElement("tbody");

  for (const [key, value] of Object.entries(country)) {
    const tr = createTableRow(key, value);
    tableBody.appendChild(tr);
  }
  table.appendChild(tableBody);
  return table;
}

function createTableRow(key, value) {
  const tr = document.createElement("tr");
  const tdkey = document.createElement("td");
  const tdvalue = document.createElement("td");
  tr.className = key === "country" ? "table-info" : key;
  tdkey.textContent = key;
  tdvalue.textContent = value;
  tr.appendChild(tdkey);
  tr.appendChild(tdvalue);
  return tr;
}

export function buildDataList(countries) {
  const dl = document.getElementById("countries");

  // in memory container for compiling DOM elements without reflow
  const fragment = document.createDocumentFragment();

  countries.forEach((f) => {
    const o = document.createElement("option");
    o.value = f.country;
    fragment.appendChild(o);
  });

  dl.appendChild(fragment);
  return dl;
}
