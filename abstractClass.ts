interface AbstractClassInterface {
    firstName: string;
    lastName: string;
}

interface GetFullNameClassInterface {
    getFullName(): string;
}

abstract class AbstractClass implements AbstractClassInterface {
    firstName;
    lastName;

    constructor({ firstName, lastName }: AbstractClassInterface) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class GetFullNameClass extends AbstractClass implements GetFullNameClassInterface {
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    };
}

class SetFullNameClass<T> extends AbstractClass {
    setFullName(value: T) {
        if (value instanceof String) {
            const namesArray = value.split(" ");
            if (namesArray.length === 2) {
                [this.firstName, this.lastName] = namesArray;
            }
        }
    }
}