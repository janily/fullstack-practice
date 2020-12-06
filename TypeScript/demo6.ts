// 通用接口定义数据类型
interface Person {
  //readonly name: string; //只读属性，不能赋值
  name: string; //
  age?: number; //可有可无的变量
  [propName: string]: any; // 可能有的变量
  say(): string; // 方法
}

type Person1 = string; //类型别名

// 类型接口继承，新增必须方法
interface TT extends Person {
  teach(): string;
}

interface sayHi {
  (word: string): string;
}

const;

const getPersonName = (person: Person) => {
  console.log(person.name);
};

const setPersonName = (person: Person, name: string): void => {
  person.name = name;
};

const person = {
  name: "janily",
  age: 18,
  say() {
    return "hello";
  },
};

getPersonName(person);
setPersonName(person, "janily");

// 类应用接口
class UserTeach implements Person {
  name = "janily";
  say() {
    return "hello";
  }
}
