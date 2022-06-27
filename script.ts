import { state, stateKeys } from "./models";

const INITIAL_VALUE = 1;
const MAX_VALUE = 1000;

const URL = "https://api.exchangerate.host/latest?base=EUR&symbols=USD,PLN,RUB";

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

const renderNumberInput = (
  id: string,
  label: string,
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

const renderRangeInput = (
  id: string,
  label: string,
  value?: string | number,
  isDisabled?: boolean,
  maxValue: number = MAX_VALUE
) => {
  const wrapperNode = document.createElement("span");

  const inputNode = document.createElement("input");
  inputNode.setAttribute("type", "range");
  inputNode.setAttribute("min", "0");
  inputNode.setAttribute("max", maxValue.toString());
  inputNode.setAttribute("id", id);
  if (isDisabled) inputNode.setAttribute("disabled", "true");
  if (value) inputNode.value = value.toString();

  const labelNode = document.createElement("label");
  labelNode.setAttribute("for", id);
  labelNode.setAttribute("data-name", label);
  labelNode.innerText = `${label}: ${inputNode.value}`;
  labelNode.style.display = "block";

  wrapperNode.appendChild(labelNode);
  wrapperNode.appendChild(inputNode);

  return wrapperNode;
};

const renderField = (
  baseRate: string,
  rate: string,
  exchangeRate: number,
  type: "number" | "range" = "number",
  maxValue?: number
) => {
  const fieldsetNode = document.createElement("fieldset");

  const legendNode = document.createElement("legend");
  legendNode.innerText = baseRate;
  fieldsetNode.appendChild(legendNode);

  const headerId = baseRate.toLowerCase();
  const headerLabel = `1 ${baseRate} is `;
  const headerNode = renderNumberInput(
    headerId,
    headerLabel,
    exchangeRate,
    true
  );
  const headerFootnoteNode = document.createElement("span");
  headerFootnoteNode.innerText = ` ${rate}`;
  headerNode.appendChild(headerFootnoteNode);
  fieldsetNode.appendChild(headerNode);

  const ratesWrapperNode = document.createElement("div");
  const isRateFieldDisabled = state.mode === "all";

  const baseRateId = `${baseRate.toLowerCase()}-${rate.toLowerCase()}`;
  const baseRateNode = (() => {
    switch (type) {
      case "number":
        return renderNumberInput(
          baseRateId,
          baseRate,
          INITIAL_VALUE,
          isRateFieldDisabled
        );
      case "range":
        return renderRangeInput(
          baseRateId,
          baseRate,
          INITIAL_VALUE,
          isRateFieldDisabled
        );
      default:
        renderNumberInput(
          baseRateId,
          baseRate,
          INITIAL_VALUE,
          isRateFieldDisabled
        );
    }
  })();
  ratesWrapperNode.appendChild(baseRateNode!);
  const baseRateInput = baseRateNode!.querySelector("input");

  const rateInitialValue = INITIAL_VALUE * exchangeRate;
  const rateId = `${rate.toLowerCase()}-${baseRate.toLowerCase()}`;

  const rateNode = (() => {
    switch (type) {
      case "number":
        return renderNumberInput(rateId, rate, rateInitialValue, true);
      case "range":
        const node = renderRangeInput(
          rateId,
          rate,
          rateInitialValue,
          true,
          maxValue
        );
        return node;
      default:
        renderNumberInput(rateId, rate, rateInitialValue, true);
    }
  })();
  const rateInput = rateNode!.querySelector("input");

  ratesWrapperNode.appendChild(rateNode!);
  baseRateInput?.addEventListener("input", (e) => {
    const target = e?.target as HTMLInputElement;

    rateInput!.value = (+target.value * exchangeRate).toString();
    (() => {
      switch (type) {
        case "range":
          const baseLabel = baseRateNode?.querySelector("label");
          baseLabel!.innerText = `${baseLabel?.dataset.name}: ${target.value}`;
          const rateLabel = rateNode!.querySelector("label");
          const labelText = `${rateLabel?.dataset.name}: ${
            +target.value * exchangeRate
          }`;
          rateLabel!.innerText = labelText;
          break;
        default:
          break;
      }
    })();
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

const renderMainTextInput = (
  baseRate: string,
  type: "number" | "range" = "number"
) => {
  state.allValue = "1";
  const fieldsetNode = document.createElement("fieldset");

  const legendNode = document.createElement("legend");
  legendNode.innerText = baseRate;
  fieldsetNode.appendChild(legendNode);

  const id = baseRate.toLowerCase();
  const headerNode = (() => {
    switch (type) {
      case "number":
        return renderNumberInput(id, baseRate, state.allValue);
      case "range":
        return renderRangeInput(id, baseRate, state.allValue);
      default:
        renderNumberInput(id, baseRate, state.allValue);
    }
  })();

  fieldsetNode.appendChild(headerNode!);

  return fieldsetNode;
};

const renderTextContent = async (node: HTMLElement) => {
  const data = await getData();
  const { rates, base } = data;

  const wrapperNode = document.createElement("div");

  Object.keys(rates).forEach((rate: string) => {
    const rateNode = renderField(base, rate, rates[rate]);
    wrapperNode.appendChild(rateNode);
  });

  if (state.mode === "all") {
    const fieldNode = renderMainTextInput(base);
    const inputNode = fieldNode.querySelector("input");
    inputNode?.addEventListener("input", (e) => {
      const target = e?.target as HTMLInputElement;

      const baseNodes = wrapperNode.querySelectorAll(
        `input[id^=${base.toLowerCase()}-]`
      ) as unknown as HTMLInputElement[];

      baseNodes.forEach((node) => {
        node.value = target.value;
      });

      const exchangeNodes = wrapperNode.querySelectorAll(
        `input[id$=-${base.toLowerCase()}]`
      ) as unknown as HTMLInputElement[];

      exchangeNodes.forEach((node) => {
        const rate = rates[node.id.slice(0, 3).toUpperCase()];
        node.value = (+target.value * rate).toString();
      });
    });
    node.appendChild(fieldNode);
  }

  node.appendChild(wrapperNode);
};

const renderSlidersContent = async (node: HTMLElement) => {
  const data = await getData();
  const { rates, base } = data;

  const wrapperNode = document.createElement("div");

  Object.keys(rates).forEach((rate: string) => {
    const maxValue = MAX_VALUE * rates[rate];
    const rateNode = renderField(base, rate, rates[rate], "range", maxValue);
    wrapperNode.appendChild(rateNode);
  });

  if (state.mode === "all") {
    const fieldNode = renderMainTextInput(base, "range");
    const inputNode = fieldNode.querySelector("input");
    inputNode?.addEventListener("input", (e) => {
      const target = e?.target as HTMLInputElement;

      const baseNodesInputs = wrapperNode.querySelectorAll(
        `input[id^=${base.toLowerCase()}-]`
      ) as unknown as HTMLInputElement[];

      baseNodesInputs.forEach((node) => {
        node.value = target.value;
      });

      const baseNodesLabels = wrapperNode.querySelectorAll(
        `label[for^=${base.toLowerCase()}-]`
      ) as unknown as HTMLInputElement[];

      baseNodesLabels.forEach((node) => {
        node.innerText = `${base}: ${target.value}`;
      });

      const exchangeNodesInputs = wrapperNode.querySelectorAll(
        `input[id$=-${base.toLowerCase()}]`
      ) as unknown as HTMLInputElement[];

      exchangeNodesInputs.forEach((node) => {
        const rate = rates[node.id.slice(0, 3).toUpperCase()];
        node.value = (+target.value * rate).toString();
      });

      const exchangeNodesLabels = wrapperNode.querySelectorAll(
        `label[for$=-${base.toLowerCase()}]`
      ) as unknown as HTMLInputElement[];

      exchangeNodesLabels.forEach((node) => {
        const rate = rates[node.dataset.name!];
        node.innerText = `${node.dataset.name}: ${+target.value * rate}`;
      });
    });
    node.appendChild(fieldNode);
  }

  node.appendChild(wrapperNode);
};

const renderContent = () => {
  const mainNode = document.querySelector("main")!;
  mainNode.innerHTML = "";

  if (state.view === "text") {
    renderTextContent(mainNode);
  }

  if (state.view === "sliders") {
    renderSlidersContent(mainNode);
  }
};

renderContent();
