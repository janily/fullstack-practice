// 数组
const numberArr: number[] = [1, 2, 3]; // 数字数组
const stringArr: string[] = ["1", "2", "3"]; // 只能是字符串的数组
const arr: (number | string)[] = [1, "2", 3]; // 数字或者是字符串的数组

// 存储对象内容的数组 type alias 类型注解

class Teacher {
  name: string;
  age: number;
}

type User = { name: string; age: number };
const objectArr: User[] = [
  {
    name: "janily",
    age: 30,
  },
];

const TeacherArr: Teacher[] = [
  new Teacher(),
  {
    name: "janily",
    age: 30,
  },
];

//元组 tuple 定义类型来约束（数字长度和类型固定，使用元组来约束类型）应用在 CSV、
const teacherInfo: [string, string, number] = ["janily", "male", 18];

const teacherList: [string, string, number][] = [
  ["janily", "male", 18],
  ["janily", "male", 18],
];
