export type packageTypeType = {
  maxWeight: number;
  name: "Letter" | "Package" | "Oversized";
};

export type packageShipmentCost = {
  formula(number): number;
} & Pick<packageTypeType, "name">;

export type packageType = {
  weight: number;
  marks: string[];
} & Record<"toAddress" | "fromAddress" | "toZipCode" | "fromZipCode", string>;

export type shipperType = {
  cost: packageShipmentCost[];
  zipCode: number[];
} & Record<"name" | "base", string>;
