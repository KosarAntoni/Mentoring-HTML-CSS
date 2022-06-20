import { PagesFactory } from "./pagesFactory";

export class Book extends PagesFactory {
    toString(): string {
        return `Book: ${this.title} by ${this.author} with number of pages: ${this.pages.pages.length}`;
    }

}


