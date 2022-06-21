type packageType = {
    weight: number;
    marks: string[];
} & Record<'toAddress' | 'fromAddress' | 'toZipCode' | 'fromZipCode', string>;

type shipperType = {
    cost: number;
    zipCode: number[];
} & Record<'name' | 'base', string>;

const mock: packageType = {
    weight: 20,
    fromZipCode: '92021',
    fromAddress: '12292 4th Ave SE, Bellevue, Wa',
    toZipCode: '67721',
    toAddress: '1313 Mockingbird Lane, Tulsa, OK',
    marks: ['MARK FRAGILE', 'MARK DO NOT LEAVE IF ADDRESS NOT AT HOME', 'MARK RETURN RECEIPT REQUESTED'],
};

const shippers: shipperType[] = [
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

class ShipmentId {
    static id: number = 0;

    getShipmentID(): number {
        const value = ShipmentId.id;
        ShipmentId.id++;
        return value;
    }

    reset(): void {
        ShipmentId.id = 0;
    }
}

class Shipper {
    private _shippers: shipperType[];


    constructor() {
        this._shippers = shippers;
    }

    getShipper(packageZipCode: string): shipperType {
        return this._shippers.filter(({ zipCode }) => zipCode.includes(+packageZipCode.charAt(0)))[0];
    }

    getCost(packageWeight: number, packageZipCode: string): number {
        const shipper = this.getShipper(packageZipCode);
        return shipper.cost * packageWeight;
    }
}

class Shipment {
    private _package: packageType;

    constructor(clientPackage: packageType) {
        this._package = clientPackage;
    }

    getId(): number {
        const idGenerator = new ShipmentId();
        return idGenerator.getShipmentID();
    }

    getCost(): number {
        const { weight, toZipCode } = this._package;
        const shipper = new Shipper();
        return shipper.getCost(weight, toZipCode)
    }

    ship() {
        const { fromZipCode, fromAddress, toZipCode, toAddress, marks } = this._package;
        const shipmentId = this.getId();
        const cost = this.getCost();
        const formattedMarks = marks
            .map((mark, index) => index === marks.length - 1 ? `**${mark.toUpperCase()}**` : `**${mark.toUpperCase()}**\n`)
            .join('');

        return `Shipment with the ID ${shipmentId} will be picked up from ${fromAddress} ${fromZipCode} 
        and shipped ${toAddress} ${toZipCode}
        Cost = ${cost}				
        ${formattedMarks}`;
    }
};

class Client {
    private _clientPackage: packageType;

    constructor() {
        this._clientPackage = mock;
    }

    shipPackage() {
        const shipment = new Shipment(this._clientPackage);
        return shipment.ship();
    }
};

const shipmentTest = new Client();
console.log(shipmentTest.shipPackage());