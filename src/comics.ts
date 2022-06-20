import { Pages } from "./pages";
import { PagesFactory } from "./pagesFactory";

export class Comics extends PagesFactory {
    _author: string;
    _artist: string;

    constructor(title: string, author: string, artist: string, pages: Pages) {
        super(title, pages);

        this._author = author;
        this._artist = artist;
    }

    set author(value: string) {
        this._author = value;
    }
    get author() {
        return this._author;
    }

    set artist(value: string) {
        this._artist = value;
    }
    get artist() {
        return this._artist;
    }

    toString(): string {
        return `Comics: ${this.title} by ${this.author}, the artist is ${this.artist}, number of pages: ${this.pages.pages.length}`;
    }
}
