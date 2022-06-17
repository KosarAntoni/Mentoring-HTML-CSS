import { Shape } from './Shape';

export class Triangle extends Shape {
    constructor(...args) {
        super(args);
        this.points = args;

        if (args.length !== 3) throw new Error('Triangle should contain 3 Points');
    }

    public toString(): string {
        const points = this.points.map((point, index) => `v${index + 1}=${point.toString()}`).join(",");

        return `Triangle[${points}]`;
    }

    public getType(): string {
        const a = this.points[0].distance(this.points[1]).toFixed(1);
        const b = this.points[1].distance(this.points[2]).toFixed(1);
        const c = this.points[2].distance(this.points[0]).toFixed(1);

        if (a === b && b === c) return 'equilateral triangle';
        if (a === b || b === c || c === a) return 'isosceles triangle';
        return 'scalene triangle';
    }

}
