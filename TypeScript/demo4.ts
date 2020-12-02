const add = function (firstN: number, secondN: number): number {
  return firstN + secondN;
};

// 函数不应该有返回值 void
function sayhello(): void {
  console.log("hello");
}

// never 函数永远不可能完全执行完
function errorEmitter(): never {
  throw new Error();
  console.log("object");
}

// 函数参数接收结构类型，解构赋值

function ob({ first, second }: { first: number; second: number }): number {
  return first + second;
}

const totalOb = ob({ first: 1, second: 2 });

function getNum({ first }: { first: number }) {
  return first;
}

const countM = getNum({ first: 1 });
