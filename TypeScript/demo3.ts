// type annotation 类型注解，主动告诉 ts 变量是什么类型
// type interface 类型推断，ts 会自动去尝试分析变量类型
//如果 ts 能自动分析类型，就不需要做什么；如果不能分析，则使用类型注解

let countNum1: number; // 类型注解

countNum1 = 123;

let countInference = 456; // 类型推断

// let firstNumber = 1;
// let secondNumber = 2;

//const total = firstNumber + secondNumber;

function getTotalNum(firstNumber: number, secondNumber: number) {
  return firstNumber + secondNumber;
}

const total = getTotalNum(1, 2);
