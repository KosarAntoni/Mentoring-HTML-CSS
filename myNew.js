const myNew = (constructor, ...rest) => {
    const templateObject = {
        ...constructor.prototype,
    };

    constructor.call(templateObject, ...rest);

    return templateObject;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.introduce = function () {
    return "My name is " + this.name + " and I am " + this.age;
};

var jack = new Person("Jack", 40);
var john = new Person('John', 30);	// - should	work	the	same	as:
console.log(jack.introduce()); //	My	name	is	Jack	and	I	am	40
console.log(john.introduce()); //	My	name	is	John	and	I	am	30

var jack = myNew(Person, "Jack", 40);
var john = myNew(Person, 'John', 30);	// - should	work	the	same	as:
console.log(jack.introduce()); //	My	name	is	Jack	and	I	am	40
console.log(john.introduce()); //	My	name	is	John	and	I	am	30
