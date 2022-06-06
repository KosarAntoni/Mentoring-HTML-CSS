
class MyPromise {
    constructor(callback) {
        this._callbacksArray = [];

        callback(this._resolve.bind(this));
        setTimeout(() => this._resolve(), 0);
        return this;
    }

    _resolve() {
        this._callbacksArray.forEach(callback => {
            callback()
        })
    }

    then(func) {
        this._callbacksArray.push(func);

        return this;
    }

    synchThen(func) {
        func();

        return this;
    }
}

let promise = new MyPromise((resolve) => {
    console.log(1);
    resolve();
})
    .synchThen(() => {
        console.log(2);
    })
    .then(() => {
        console.log(3);
    })
console.log(4);
  //1,	2,	4,	3
