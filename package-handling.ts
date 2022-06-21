type packageType = {
    marks: string[];
} & Record<'toAddress' | 'fromAddress' | 'toZipCode' | 'fromZipCode', string>
    & Record<'shipmentId' | 'weight', number>;

const mock: packageType = {
    shipmentId: 17263,
    weight: 20,
    fromZipCode: '92021',
    fromAddress: '12292 4th Ave SE, Bellevue, Wa',
    toZipCode: '67721',
    toAddress: '1313 Mockingbird Lane, Tulsa, OK',
    marks: ['MARK FRAGILE', 'MARK DO NOT LEAVE IF ADDRESS NOT AT HOME', 'MARK RETURN RECEIPT REQUESTED'],
};

class Shipment {
    private _package: packageType;

    constructor(clientPackage: packageType) {
        this._package = clientPackage;
    }

    getCost(): number {
        return this._package.weight * 0.39;
    }

    ship() {
        const { shipmentId, fromZipCode, fromAddress, toZipCode, toAddress, marks } = this._package;
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