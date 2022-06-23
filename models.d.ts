export type stateKeys = "view" | "mode";

export type state = {
  mode?: "all" | "idependent" | string;
  view?: "text" | "sliders" | string;
};
