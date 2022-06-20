import { Item } from "./item";
import { Pages } from "./pages";

export abstract class PagesFactory extends Item {
    private _title: string;
    pages: Pages;

    constructor(title: string, pages: Pages) {
        super()

        this._title = title;
        this.pages = pages;
    }

    set title(value: string) {
        this._title = value;
    }
    get title() {
        return this._title;
    }


    abstract toString(): string
}


