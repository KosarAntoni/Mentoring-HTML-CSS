
class ReversePromise {
    constructor(callback) {
        this._callbacksArray = [];

        callback(this._resolve.bind(this));
        setTimeout(() => this._resolve(), 0)
        return this;
    }

    _resolve() {
        this._callbacksArray.reverse().forEach(callback => {
            callback()
        })

    }

    then(func) {
        this._callbacksArray.push(func);

        return this;
    }
}

let promise = new ReversePromise((resolve) => {
    console.log(1);
    resolve();
})
    .then(() => console.log(2))
    .then(() => console.log(3))
    .then(() => console.log(4))
  //1,	4,	3,	2
