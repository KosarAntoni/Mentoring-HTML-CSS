const NamedOne = (first, last) => {
    return {
      _firstName: first,
      _lastName: last,
      get firstName() {
        console.log(this._firstName);
      },
      set firstName(value) {
        this._firstName = value;
      },
      get lastName() {
        console.log(this._lastName);
      },
      set lastName(value) {
        this._lastName = value;
      },
      get fullName() {
        console.log(`${this._firstName} ${this._lastName}`);
      },
      set fullName(value) {
        const namesArray = value.split(" ");
        if (namesArray.length === 2) {
          [this._firstName, this._lastName] = namesArray;
        } 
      }
    };
  };
  
  var namedOne = new NamedOne("Naomi", "Wang");
  namedOne.firstName = "John";
  namedOne.lastName = "Doe";
  //	...then...
  namedOne.fullName; //	->	"John	Doe"
  //	-- And	:
  namedOne.fullName = "Bill Smith";
  //	...then...
  namedOne.firstName; //	->	"Bill"
  namedOne.lastName; //	->	"Smith"
  //	-- But	:
  namedOne.fullName = "Tom"; //	->	no	:	lastName	missing
  namedOne.fullName = "TomDonnovan"; //	->	no	:	no	space	between	first	&	last	names
  namedOne.fullName; //	->	"Bill	Smith"	(unchanged)