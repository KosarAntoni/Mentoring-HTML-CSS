interface Comparable {
    name: string;
    value: number;

    compareTo(other: Item): -1 | 1;
}

interface Comparator {
}

interface ItemComparator extends Comparator {
    compare(first: Item, second: Item): -1 | 1;
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

        if (this.value === other.value) return this.name.toLowerCase() < other.name.toLowerCase() ? 1 : -1;

        return this.value > other.value ? 1 : -1;

    }

    public toString(): string {
        return `${this.name} − Value: ${this.value}, Weight: ${this.weight.toFixed(2)}`;
    }
}

abstract class Consumable {

}

abstract class Weapon extends Item {
    baseDamage: number;
    damageModifier: number;
    baseDurability: number;
    durabilityModifier: number;
    isBroken: boolean;
    MODIFIER_CHANGE_RATE: number;

    constructor(name: string,
        value: number,
        weight: number,
        baseDamage: number,
        damageModifier: number,
        baseDurability: number,
        durabilityModifier: number
    ) {
        super(name, value, weight);

        this.baseDamage = baseDamage;
        this.damageModifier = damageModifier;
        this.baseDurability = baseDurability;
        this.durabilityModifier = durabilityModifier;

        this.isBroken = false;
        this.MODIFIER_CHANGE_RATE = 0.1;
    }

    public getDamage(): number {
        return this.baseDamage + this.damageModifier;
    };

    public getDurability(): number {
        return this.baseDurability + this.durabilityModifier;
    };

    public toString(): string {
        const damage = this.getDamage().toFixed(2);
        const durability = this.getDurability().toFixed(2);

        return `${this.name} − Value: ${this.value}, Weight : ${this.weight}, Damage : ${damage}, Durability : ${durability}%`
    }

    public use(): string {
        if (this.isBroken) return `You can't use the ${this.name}, it is broken.`

        this.baseDurability = this.baseDurability - this.MODIFIER_CHANGE_RATE;

        if (this.baseDurability <= 0) this.isBroken = true;
        const damage = this.getDamage().toFixed(2);
        const brokenText = this.isBroken ? ` The ${this.name} breaks.` : '';

        return `You use the ${this.name} , dealing ${damage} points of damage.${brokenText}`;
    }
}

class ItemWeightComparator implements ItemComparator {
    compare(first: Item, second: Item) {
        if (!first || !second) throw new Error('Items required!')

        if (first.weight === second.weight) return first.compareTo(second)

        return first.weight > second.weight ? 1 : -1;
    }
}

class Ring extends Item {
    constructor(name = "ring", value = 3000, weight = 0.013) {
        super(name, value, weight);
    }
}

class Sword extends Weapon {
    constructor(value: number,
        weight: number,
        baseDamage: number,
        damageModifier: number,
        baseDurability: number,
        durabilityModifier: number
    ) {
        super('sword', value, weight, baseDamage, damageModifier, baseDurability, durabilityModifier)
    }

    public polish() {
        const maxValue = this.baseDamage * 0.25;

        if (this.damageModifier < maxValue) {
            const newValue = this.damageModifier + this.MODIFIER_CHANGE_RATE;
            this.damageModifier = newValue > maxValue ? maxValue : newValue;
        }
    }
}

class Bow extends Weapon {
    constructor(value: number,
        weight: number,
        baseDamage: number,
        damageModifier: number,
        baseDurability: number,
        durabilityModifier: number
    ) {
        super('bow', value, weight, baseDamage, damageModifier, baseDurability, durabilityModifier)
    }

    public polish() {
        const maxValue = 1;

        if (this.durabilityModifier < maxValue) {
            const newValue = this.durabilityModifier + this.MODIFIER_CHANGE_RATE;
            this.durabilityModifier = newValue > maxValue ? maxValue : newValue;
        }
    }
}
