type pageType = 'with text' | 'with article' | 'with images' | 'with some content';
type pageMaterial = 'simple paper' | 'glossy paper' | 'paper';

export class Page {
    pageNumber: number;
    pageType: pageType;
    pageMaterial: pageMaterial;

    constructor(pageNumber: number,
        pageType: pageType,
        pageMaterial: pageMaterial) {

        this.pageNumber = pageNumber;
        this.pageType = pageType;
        this.pageMaterial = pageMaterial;
    }

    toString(): string {
        return `here is page ${this.pageType} #${this.pageNumber} and it\'s material is ${this.pageMaterial}`;
    }
};