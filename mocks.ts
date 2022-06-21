import { packageType, shipperType } from "./models";

export const mock: packageType = {
    weight: 20,
    fromZipCode: '92021',
    fromAddress: '12292 4th Ave SE, Bellevue, Wa',
    toZipCode: '67721',
    toAddress: '1313 Mockingbird Lane, Tulsa, OK',
    marks: ['MARK FRAGILE', 'MARK DO NOT LEAVE IF ADDRESS NOT AT HOME', 'MARK RETURN RECEIPT REQUESTED'],
};

export const shippers: shipperType[] = [
    {
        zipCode: [1, 2, 3],
        name: 'Air East',
        base: 'Atlanta',
        cost: 39
    },
    {
        zipCode: [4, 5, 6],
        name: 'Chicago Sprint',
        base: 'a suburb of Chicago',
        cost: 42

    },
    {
        zipCode: [7, 8, 9],
        name: 'Pacific Parcel',
        base: 'San Diego',
        cost: 51
    },
]