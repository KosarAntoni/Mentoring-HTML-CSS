import { Page, pageMaterial, pageType } from "./page";

export class Pages {
    pages: Page[]

    constructor(pages: Page[]) {
        this.pages = pages;
    }
};

class IterablePage extends Page {
    bookDescription: string;
    pageDescription: string;
    constructor(pageNumber: number, pageType: pageType, pageMaterial: pageMaterial, bookDescription: string, pageDescription: string) {
        super(pageNumber, pageType, pageMaterial);

        this.bookDescription = bookDescription;
        this.pageDescription = pageDescription;
    }

    toString(): string {
        return `${this.bookDescription}, ${this.pageDescription}`
    }
}

export const PagesIterable = (superclass: any) => class extends superclass {
    *[Symbol.iterator]() {
        for (let page of this.pages.pages) {

            const { pageNumber, pageType, pageMaterial, toString } = page;

            yield new IterablePage(pageNumber, pageType, pageMaterial, this.toString(), page.toString());
        };
    }

};
