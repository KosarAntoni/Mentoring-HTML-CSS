import { mock, packageTypes, shippers } from "./mocks";
import { packageType, packageTypeType, shipperType } from "./models";

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

  getShipper(packageZipCode: string): shipperType | undefined {
    return this._shippers.find(({ zipCode }) =>
      zipCode.includes(+packageZipCode.charAt(0))
    );
  }

  getCost(
    type: packageTypeType,
    packageZipCode: string,
    packageWeight: number
  ): number {
    const shipper = this.getShipper(packageZipCode);
    const costFormula = shipper?.cost.find(
      ({ name }) => name === type.name
    )?.formula;
    return shipper && costFormula ? costFormula(packageWeight) : 0;
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

  getType(): packageTypeType {
    const { weight } = this._package;
    return packageTypes.find(({ maxWeight }) => weight < maxWeight)!;
  }

  getCost(): number {
    const { weight, toZipCode } = this._package;
    const shipper = new Shipper();
    const type = this.getType();
    return shipper.getCost(type, toZipCode, weight);
  }

  ship() {
    const { fromZipCode, fromAddress, toZipCode, toAddress, marks } =
      this._package;
    const shipmentId = this.getId();
    const type = this.getType();
    const cost = this.getCost();
    const formattedMarks = marks
      .map((mark, index) =>
        index === marks.length - 1
          ? `**${mark.toUpperCase()}**`
          : `**${mark.toUpperCase()}**\n`
      )
      .join("");

    return `Shipment with the ID ${shipmentId} will be picked up from ${fromAddress} ${fromZipCode} 
        and shipped ${toAddress} ${toZipCode}
        Cost = ${cost}				
        ${formattedMarks}`;
  }
}

class Client {
  private _clientPackage: packageType;

  constructor() {
    this._clientPackage = mock;
  }

  shipPackage() {
    const shipment = new Shipment(this._clientPackage);
    return shipment.ship();
  }
}

const shipmentTest = new Client();
console.log(shipmentTest.shipPackage());
