// 扩展运算符 reset 运算符
// 当编写一个方法时，我们允许它传入的参数是不确定的。这时候可以使用对象扩展运算符来作参数

function janily(...arg) {
    console.log(arg[0]);
    console.log(arg[1]);
    console.log(arg[2]);
    console.log(arg[3]);
}

// janily(0,1,2,3)

//使用方法

// let arr1 = ['www','janily','io'];
// let arr2 = arr1;
// console.log(arr2)

// arr2.push('shenzhen');

// console.log(arr1);

//上面例子 声明两个数组arr1和arr2，然后我们把arr1赋值给arr2，然后改变arr2的值，会发现arr1的值也改变了，因为我们这是对内存堆栈的引用，而不是真正的赋值。

//解决方案

let arr1 = ['www','janily','io'];

let arr2 = [...arr1];

// console.log(arr2);
arr2.push('shenzhen');
// console.log(arr2);
// console.log(arr1);

//reset 运算符
function janily(first,...arg) {
    // console.log(arg.length);
    for (let val of arg) {
        console.log(val)
    }
}

janily(1,2,3,4,5,6);