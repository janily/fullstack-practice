// private protected public 访问类型
// public 允许在类的内外被调用，类默认是 public 类型
// private 允许在类内被调用
// protected 允许在类内及继承的子类中使用

class PersonT {
  name: string;
  sayHi() {
    this.name;
    console.log("hi");
  }
}

const personT = new PersonT();

personT.name = "janily";

// 构造函数 construct，初始化在构造器里给属性赋值
// class TT {
//   public name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }

// 简化写法
class TT {
  // public name: string;
  constructor(public name: string) {
    this.name = name;
  }
}

const tt = new TT("janily");
console.log(tt.name);

class TTT {
  constructor(public name: string) {}
}

// 子类调用父类，需要手动调用父类的构造函数  super()
class TTTT extends TTT {
  constructor(public age: number) {
    super("janily"); // 调用父类的构造函数
  }
  sayHi() {
    this.name;
  }
}

const ttt = new TTTT(28);
ttt.age;
