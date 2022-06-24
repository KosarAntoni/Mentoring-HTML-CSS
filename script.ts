import { state, stateKeys } from "./models";

const URL = "./rates.json";
// const URL = "https://api.exchangerate.host/latest?base=EUR&symbols=USD,PLN,RUB";

const getData = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

const state: state = {};

const setInitialValue = (value: stateKeys) => {
  const node: HTMLInputElement | null = document.querySelector(
    `input[name="${value}"]:checked`
  );
  state[value] = node?.value;
};

const handleRadioClick = (e: Event) => {
  const target = e?.target as HTMLInputElement;
  if (target.name && target.value) {
    const key = target.name as stateKeys;
    state[key] = target.value;
    console.log(state);
  }
};

const renderTextFields = () => {};

if (!state.mode) {
  setInitialValue("mode");
}

if (!state.view) {
  setInitialValue("view");
}

const radioNodes = document.querySelectorAll('input[type="radio"]');
radioNodes.forEach((node) =>
  node.addEventListener("mousedown", handleRadioClick)
);
