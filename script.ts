import { state, stateKeys } from "./models";

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

if (!state.mode) {
  setInitialValue("mode");
}

if (!state.view) {
  setInitialValue("view");
}

const modeNodes = document.querySelectorAll('input[type="radio"]');
modeNodes.forEach((node) =>
  node.addEventListener("mousedown", handleRadioClick)
);
