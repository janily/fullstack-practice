// 基础类型 null, undefined, symbol, boolean, void
const countNum: number = 123;
const nick: string = "janily";

// 对象类型
class Person {}
const teacher: {
  name: string;
  age: number;
} = {
  name: "janily",
  age: 18,
};

const numbers: number[] = [1, 2, 3]; //数组类型

const janily: Person = new Person(); //对象类型

const getTotal: () => number = () => {
  return 123;
}; // 函数类型
