export class Point {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    toString(): string {
        return `(${this.x}, ${this.y})`
    }

    distance(...args: (number | Point)[]): number {
        const getDistance = (x1: number, x2: number, y1: number, y2: number) => Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
        const isNumber = (value: number | object): boolean => (!(typeof value === "object") && !isNaN(value));

        if (!args.length) {
            return getDistance(this.x, 0, this.y, 0);
        }

        if (args.length === 1) {
            const [point] = args;
            if (!(point instanceof Point)) throw new Error("Value should be a Point");

            return getDistance(this.x, point.x, this.y, point.y);
        }

        if (args.length === 2) {
            const [x, y] = args;
            if (!isNumber(x) && !isNumber(y)) throw new Error("Values should be a numbers");

            return getDistance(this.x, +x, this.y, +y);
        }

        throw new Error("Arguments dont match");
    }
}
