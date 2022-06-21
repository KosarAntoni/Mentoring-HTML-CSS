import { Pages } from "./pages";
import { PagesFactory } from "./pagesFactory";

export class Book extends PagesFactory {
    _author: string;

    constructor(title: string, author: string, pages: Pages) {
        super(title, pages);

        this._author = author;
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
