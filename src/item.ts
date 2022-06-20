import { PagesIterable } from "./pages";

export abstract class ItemBase {
    abstract toString(): string;
}

export class Item extends PagesIterable(ItemBase) { };