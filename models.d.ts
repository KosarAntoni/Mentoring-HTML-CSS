export type stateKeys = "view" | "mode" | "allValue";

export type state = {
  allValue?: string | number;
  mode?: "all" | "idependent" | string;
  view?: "text" | "sliders" | string;
};
