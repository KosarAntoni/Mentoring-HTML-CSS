class Vector {
    constructor(array) {
        this.array = array;
    }
    add(value) {
        if (value.array.length === this.array.length) {
            return this.array.map((number, index) => number + value.array[index])
        };
        return 'length of arrays not equals';
    }
    subtract(value) {
        if (value.array.length === this.array.length) {
            return this.array.map((number, index) => number - value.array[index])
        };
        return 'length of arrays not equals';
    }
    dot(value) {
        if (value.array.length === this.array.length) {
            const multipliedArray = this.array.map((number, index) => number * value.array[index]);
            const sumOfArray = multipliedArray.reduce((acc, n) => acc + n, 0);
            return sumOfArray;
        };
        return 'length of arrays not equals';
    }
    norm() {
        const multipliedArray = this.array.map((number) => Math.pow(number, 2));
        const sumOfArray = multipliedArray.reduce((acc, n) => acc + n, 0);
        return sumOfArray;
    }
    toString() {
        return `(${this.array.join()})`;
    }
    equals(value) {
        return this.toString() === value.toString();
    }
};

var a = new Vector([1, 2, 3]);
var b = new Vector([3, 4, 5]);
var c = new Vector([5, 6, 7, 8]);
var d = new Vector([1, 2, 3]);
console.log(a.add(b));						//	should return	a	new	Vector([4,	6,	8])
console.log(a.subtract(b));	//	should	return	a	new	Vector([-2,	-2,	-2])
console.log(a.dot(b));						//	should	return	1*3	+	2*4	+	3*5	=	26
console.log(a.norm());						//	should	return	sqrt(1^2	+	2^2	+	3^2)	=	sqrt(14)
console.log(a.add(c));						//	throws	an	error
// If	you	try	to add,	subtract,	or	dot	two	vectors	with	different	lengths,	you	must	throw	an	error.
// Also	provide:
// a	toString	method,	so	that	using	the	vectors	from	above,	
console.log(a.toString() === '(1,2,3)')
// an	equals	method,	to	check	that	two	vectors	that	have	the	same	components	are	equal
console.log(a.equals(d));