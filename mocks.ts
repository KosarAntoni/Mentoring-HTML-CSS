import { packageType, packageTypeType, shipperType } from "./models";

export const packageTypes: packageTypeType[] = [
  {
    maxWeight: 15,
    name: "Letter",
  },
  {
    maxWeight: 160,
    name: "Package",
  },
  {
    maxWeight: Infinity,
    name: "Oversized",
  },
];

export const mock: packageType = {
  weight: 180,
  fromZipCode: "92021",
  fromAddress: "12292 4th Ave SE, Bellevue, Wa",
  toZipCode: "67721",
  toAddress: "1313 Mockingbird Lane, Tulsa, OK",
  marks: [
    "MARK FRAGILE",
    "MARK DO NOT LEAVE IF ADDRESS NOT AT HOME",
    "MARK RETURN RECEIPT REQUESTED",
  ],
};

export const shippers: shipperType[] = [
  {
    zipCode: [1, 2, 3],
    name: "Air East",
    base: "Atlanta",
    cost: [
      {
        formula: (weight: number) => weight * 0.39,
        name: "Letter",
      },
      {
        formula: (weight: number) => weight * 0.25,
        name: "Package",
      },
      {
        formula: (weight: number) => 10 + weight * 0.25,
        name: "Oversized",
      },
    ],
  },
  {
    zipCode: [4, 5, 6],
    name: "Chicago Sprint",
    base: "a suburb of Chicago",
    cost: [
      {
        formula: (weight: number) => weight * 0.42,
        name: "Letter",
      },
      {
        formula: (weight: number) => weight * 0.2,
        name: "Package",
      },
      {
        formula: (weight: number) => weight * 0.2,
        name: "Oversized",
      },
    ],
  },
  {
    zipCode: [7, 8, 9],
    name: "Pacific Parcel",
    base: "San Diego",
    cost: [
      {
        formula: (weight: number) => weight * 0.51,
        name: "Letter",
      },
      {
        formula: (weight: number) => weight * 0.19,
        name: "Package",
      },
      {
        formula: (weight: number) => weight * 0.21,
        name: "Oversized",
      },
    ],
  },
];
