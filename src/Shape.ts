import { Point } from "./Point";

export abstract class Shape {
    protected color: string;
    protected filled: boolean;
    public points: Point[];

    constructor(points: Point[], color: string = 'green', filled: boolean = true) {
        this.points = points;
        this.color = color;
        this.filled = filled;

        if (points.length < 3) throw new Error('Shape should contain at least 3 Points');
    }

    public toString(): string {
        const points = this.points.map(point => point.toString()).join(", ");
        const filled = this.filled ? "" : "not "
        return `A Shape with color of ${this.color} and ${filled}filled. Points: ${points}.`;
    }

    public getPerimeter(): number {
        return this.points.reduce((accumulator, point, index) => {
            const distance: number = this.points[index + 1] ? point.distance(this.points[index + 1]) : point.distance(this.points[0])
            return accumulator + distance;
        }, 0)
    }

    abstract getType(): string;
}
