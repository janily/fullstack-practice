function multiplyAll(arr) {
    var product = 1;

    for(var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++){
            product *= arr[i][j];
        }
    }

    return product;
}

var product = multiplyAll([[2,3],[1,5],[7,8,9]]);

console.log(product);