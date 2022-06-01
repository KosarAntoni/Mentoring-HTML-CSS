const runningAverage = () => {
    const numbersArray = [];

    return (number) => {
        if (typeof number === "number") {
            numbersArray.push(number);
        }
        const sumOfNumbers = numbersArray.reduce((acc, n) => acc + n, 0);
        const averageNumber = sumOfNumbers / numbersArray.length;

        return averageNumber.toFixed(1);
    };
};

const rAvg = runningAverage();
console.log(rAvg(10)); // 10.0;
console.log(rAvg(11)); // 10.5;
console.log(rAvg(12)); // 11.0;
console.log(rAvg(0)); // 8.3;
console.log(rAvg("banana")); // 8.3
console.log(rAvg()); // 8.3
