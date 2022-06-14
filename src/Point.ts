export class Point {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x}, ${this.y})`
    }

    distance(...args: (number | Point)[]) {
        if (!args.length) {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        }

        if (args.length === 1) {
            const [point] = args;
            if (!(point instanceof Point)) return null

            return Math.sqrt(Math.pow((this.x - point.x), 2) + Math.pow((this.y - point.y), 2));
        }

        if (args.length === 2) {
            const [x, y] = args;
            const isNumber = (value: number | object): boolean => (!(typeof value === "object") && !isNaN(value));
            if (!isNumber(x) && !isNumber(y)) return null;

            return Math.sqrt(Math.pow((this.x - +x), 2) + Math.pow((this.y - +y), 2));
        }
        return null
    }
}
