interface Comparable {
    id: number;
    name: string;
    value: number;
    weight: number;
}

interface Comparator {

}

interface ItemComparator extends Comparator {

}

abstract class Item implements Comparable {
    constructor(name: string, value: number, weight: number) {
        this.id = Item.counter;
        this.name = name;
        this.value = value;
        this.weight = weight;
        Item.counter++;
    }

    id: number;
    name: string;
    value: number;
    weight: number;

    static counter: number = 0;


    public reset() {
        Item.counter = 0;
    }

    public compareTo(other: Item) {

    }

    public toString() {
        return `${this.name} − Value: ${this.value}, Weight: ${this.weight.toFixed(2)}`;
    }
}

abstract class Consumable {

}

abstract class Weapon {

}

class ItemWeightComparator {

}