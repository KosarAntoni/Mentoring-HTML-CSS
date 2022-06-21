export type packageType = {
    weight: number;
    marks: string[];
} & Record<'toAddress' | 'fromAddress' | 'toZipCode' | 'fromZipCode', string>;

export type shipperType = {
    cost: number;
    zipCode: number[];
} & Record<'name' | 'base', string>;