const runningAverage = () => {
    let numbersArray = [];
    const setNumbersArray = (newNumber) => numbersArray = [...numbersArray, newNumber];

    return (number) => {
        if (number) {
            setNumbersArray(number);
            const sumOfNumbers = numbersArray.reduce((acc, n) => acc + n, 0);
            const averageNumber = sumOfNumbers / numbersArray.length;

            return averageNumber.toFixed(1);
        }
        return  null;
    };
};

const rAvg = runningAverage();
console.log(rAvg(10)) // 10.0;
console.log(rAvg(11)) // 10.5;
console.log(rAvg(12)) // 11.0;