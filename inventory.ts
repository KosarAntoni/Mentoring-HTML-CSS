interface Comparable {
    name: string;
    value: number;

    compareTo(other: Item): -1 | 1;
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
        if (!other) throw new Error('Item required!')

        if (this.value !== other.value) return this.value > other.value ? 1 : -1;

        return this.name.toLowerCase() < other.name.toLowerCase() ? 1 : -1;

    }

    public toString() {
        return `${this.name} − Value: ${this.value}, Weight: ${this.weight.toFixed(2)}`;
    }
}

abstract class Consumable {

}

abstract class Weapon {

}

class ItemWeightComparator implements ItemComparator {

}

class Ring extends Item {
    constructor(name = "ring", value = 3000, weight = 0.013) {
        super(name, value, weight);
    }
}

const ring = new Ring('golden ring a', 20);
const ring2 = new Ring('golden ring b', 30);

console.log(ring.toString(), ring.id)
console.log(ring2.toString(), ring2.id)

console.log(ring.compareTo(ring2));