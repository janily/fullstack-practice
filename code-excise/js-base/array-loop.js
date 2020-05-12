//  js 数组遍历方法练习

let cars = ["Tesla", "Ferrari", "Lamborghini", "Audi"];  //定义一个数组

// 方法1 Loop 方法取值

for (let i = 0; i < cars.length; i ++) {
    console.log(cars[i])
}

// forEach 方法

const amounts = [65,44,12,4]
let doubleAmounts = [];

amounts.forEach(item => {
    doubleAmounts.push(item * 2);
})

console.log(doubleAmounts)

//while loop 方法

let a = 0

while (a < 5) {
    console.log(a);
    a++;
}

// do while loop 方法

let i = 0;

do {
    console.log(i);
    i++;
} while (i < 5);


// map 方法

const array = [1,1,1,1];

const results = array.map(x => x * 2);

console.log(results)