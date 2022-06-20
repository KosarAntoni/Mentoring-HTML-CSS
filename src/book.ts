import { Item } from "./item";
import { Pages, PagesIterable } from "./pages";

export class Book extends Item {
    _title: string;
    _author: string;
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

    toString(): string {
        return `Book: ${this.title} by ${this.author} with number of pages: ${this.pages.pages.length}`;
    }

}


