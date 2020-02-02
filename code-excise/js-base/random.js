function randomNumber() {
    return Math.random();
}

var randomNumberBetween0and19 = Math.floor(Math.random() * 20);

// console.log(randomNumber());
// console.log(randomNumberBetween0and19);

function randomWholeNum() {
    return Math.floor(Math.random() * 10);
}

function rangeRandom(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRange(myMin, myMax) {
    return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;
}

// rangeRandom(1,9);

// console.log(rangeRandom(1,9))

console.log(randomRange(5,9))

// console.log(randomWholeNum());