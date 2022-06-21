const MODIFIER_CHANGE_RATE = 0.1;
const MAX_DAMAGE_MULTIPLIER = 0.25;

const compare = (a: string | number, b: string | number) => a > b ? 1 : -1;
const setPolish = (modifier: number, maxValue: number) => {
    if (modifier < maxValue) {
        const newValue = modifier + MODIFIER_CHANGE_RATE;
        modifier = newValue > maxValue ? maxValue : newValue;
    }
}

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

        if (this.value === other.value) return compare(this.name.toLowerCase(), other.name.toLowerCase());

        return compare(this.value, other.value);
    }

    public toString(): string {
        return `${this.name} − Value: ${this.value}, Weight: ${this.weight.toFixed(2)}`;
    }
}

abstract class Consumable extends Item {
    isConsumed: boolean;
    isSpoiled: boolean;

    constructor(name: string, value: number, weight: number, isSpoiled: boolean) {
        super(name, value, weight)
        this.isSpoiled = isSpoiled;
        this.isConsumed = false;
    }

    eat(): string {
        if (this.isConsumed) return `There is nothing left of the ${this.name} to consume.`;

        this.isConsumed = true;
        return `You eat the ${this.name}.`;
    }

    use(): string {
        const spoiledText = this.isSpoiled ? ' You feel sick.' : '';

        return `${this.eat()}${spoiledText}`;
    }
}

abstract class Weapon extends Item {
    baseDamage: number;
    damageModifier: number;
    baseDurability: number;
    durabilityModifier: number;
    isBroken: boolean;

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

        return `${this.name} − Value: ${this.value}, Weight: ${this.weight}, Damage: ${damage}, Durability: ${durability}%`
    }

    public use(): string {
        if (this.isBroken) return `You can't use the ${this.name}, it is broken.`

        this.baseDurability = this.baseDurability - MODIFIER_CHANGE_RATE;

        if (this.baseDurability <= 0) this.isBroken = true;
        const damage = this.getDamage().toFixed(2);
        const brokenText = this.isBroken ? ` The ${this.name} breaks.` : '';

        return `You use the ${this.name}, dealing ${damage} points of damage.${brokenText}`;
    }
}

class ItemWeightComparator implements ItemComparator {
    compare(first: Item, second: Item) {
        if (!first || !second) throw new Error('Items required!')

        if (first.weight === second.weight) return first.compareTo(second)

        return compare(first.weight, second.weight);
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
        super('sword', value, weight, baseDamage, damageModifier, baseDurability, durabilityModifier);
    }

    public polish() {
        const maxValue = this.baseDamage * MAX_DAMAGE_MULTIPLIER;

        setPolish(this.damageModifier, maxValue);
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

        setPolish(this.durabilityModifier, maxValue);
    }
}

class Pizza extends Consumable {
    slices: number;

    constructor(value: number, weight: number, isSpoiled: boolean) {
        super('pizza', value, weight, isSpoiled);

        this.slices = 6;
    }

    eat(): string {
        if (this.isConsumed) return `There is nothing left of the ${this.name} to consume.`;

        this.slices--;
        if (this.slices <= 0) this.isConsumed = true;
        const consumedText = this.isConsumed ? ` No more left` : '';

        return `You eat slice of ${this.name}.${consumedText}`;
    }
}

class Inventory {
    items: Item[];

    constructor(items: Item[]) {
        this.items = items;
    }

    sort(comparator?: ItemComparator): void {
        if (comparator) {
            this.items.sort((a, b) => comparator.compare(a, b));
            return;
        }

        this.items.sort((a, b) => a.compareTo(b));
    }

    toString(): string {
        const itemsDescriptions = this.items.map(item => item.toString());
        return itemsDescriptions.join(", ");
    }
}
