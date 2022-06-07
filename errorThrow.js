class MyError {
  constructor(message, name) {
    this.message = message;
    this.name = name;
  }
}

try {
  (() => {
    throw new MyError("Ooooops!", "Ups");
  })();
} catch (error) {
  if (error instanceof MyError) {
    console.log(error.name, " ", error.message);
  }
}
