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
  }
  renderContent();
};

const renderTextInput = (
  id: string,
  label: string,
  element: string,
  value?: string | number,
  isDisabled?: boolean
) => {
  const wrapperNode = document.createElement("span");

  const labelNode = document.createElement("label");
  labelNode.setAttribute("for", id);
  labelNode.innerText = label;
  wrapperNode.appendChild(labelNode);

  const inputNode = document.createElement("input");
  inputNode.setAttribute("type", "number");
  inputNode.setAttribute("id", id);
  if (isDisabled) inputNode.setAttribute("disabled", "true");
  if (value) inputNode.value = value.toString();
  wrapperNode.appendChild(inputNode);

  return wrapperNode;
};

const renderTextField = (
  baseRate: string,
  rate: string,
  exchangeRate: number
) => {
  const fieldsetNode = document.createElement("fieldset");

  const legendNode = document.createElement("legend");
  legendNode.innerText = baseRate;
  fieldsetNode.appendChild(legendNode);

  const headerId = baseRate.toLowerCase();
  const headerLabel = `1 ${baseRate} is `;
  const headerNode = renderTextInput(
    headerId,
    headerLabel,
    "div",
    exchangeRate,
    true
  );
  const headerFootnoteNode = document.createElement("span");
  headerFootnoteNode.innerText = ` ${rate}`;
  headerNode.appendChild(headerFootnoteNode);
  fieldsetNode.appendChild(headerNode);

  const ratesWrapperNode = document.createElement("div");
  const isRateFieldDisabled = state.mode === "all";

  const baseRateId = `${baseRate.toLowerCase()} - ${rate.toLowerCase()}`;
  const baseRateNode = renderTextInput(
    baseRateId,
    baseRate,
    "span",
    "1",
    isRateFieldDisabled
  );
  ratesWrapperNode.appendChild(baseRateNode);
  const baseRateInput = baseRateNode.querySelector("input");

  const rateId = `${rate.toLowerCase()} - ${baseRate.toLowerCase()}`;
  const rateNode = renderTextInput(
    rateId,
    rate,
    "span",
    exchangeRate,
    isRateFieldDisabled
  );
  const rateInput = rateNode.querySelector("input");

  ratesWrapperNode.appendChild(rateNode);
  baseRateInput?.addEventListener("input", (e) => {
    const target = e?.target as HTMLInputElement;

    rateInput!.value = (+target.value * exchangeRate).toString();
  });

  fieldsetNode.appendChild(ratesWrapperNode);

  return fieldsetNode;
};

if (!state.mode) {
  setInitialValue("mode");
}

if (!state.view) {
  setInitialValue("view");
}

const radioNodes = document.querySelectorAll('input[type="radio"]');
radioNodes.forEach((node) => node.addEventListener("input", handleRadioClick));

const renderMainTextInput = (baseRate: string) => {
  const fieldsetNode = document.createElement("fieldset");

  const legendNode = document.createElement("legend");
  legendNode.innerText = baseRate;
  fieldsetNode.appendChild(legendNode);

  const id = baseRate.toLowerCase();
  const headerNode = renderTextInput(id, baseRate, "div", "1");

  fieldsetNode.appendChild(headerNode);

  return fieldsetNode;
};

const renderTextContent = async (node: HTMLElement) => {
  const data = await getData();
  const { rates, base } = data;

  if (state.mode === "all") {
    const inputNode = renderMainTextInput(base);
    node.appendChild(inputNode);
  }

  Object.keys(rates).forEach((rate) => {
    const rateNode = renderTextField(base, rate, rates[rate]);
    node.appendChild(rateNode);
  });
};

const renderContent = () => {
  const mainNode = document.querySelector("main")!;
  mainNode.innerHTML = "";

  if (state.view === "text") {
    renderTextContent(mainNode);
  }
};

renderContent();
