import { Item } from "./item";
import { Pages } from "./pages";

export abstract class PagesFactory extends Item {
    private _title: string;
    private _author: string;
    pages: Pages;

    constructor(title: string, author: string, pages: Pages) {
        super()

        this._title = title;
        this._author = author;
        this.pages = pages;
    }


    set title(value: string) {
        this._title = value;
    }
    get title() {
        return this._title;
    }


    set author(value: string) {
        this._author = value;
    }
    get author() {
        return this._author;
    }

    abstract toString(): string
}


