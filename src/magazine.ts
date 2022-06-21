import { Pages } from "./pages";
import { PagesFactory } from "./pagesFactory";

export class Magazine extends PagesFactory {
    toString(): string {
        return `Magazine: ${this.title} with number of pages: ${this.pages.pages.length}`;
    }
}
