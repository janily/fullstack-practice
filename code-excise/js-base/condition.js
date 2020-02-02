// condition ? statement-if-true : statement-if-false;  三元操作符

function checkEqual(a, b) {
    return a === b ? true : false;

    // return a === b; 
}

function checkSign(num) {
    return num > 0 ? "postitive" : num < 0 ? "negative" : "zero";
}

console.log(checkSign(0));
