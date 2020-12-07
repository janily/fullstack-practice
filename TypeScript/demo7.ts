class Person {
  name = "janily";
  getName() {
    return this.name;
  }
}

class Teach extends Person {
  getTeachName() {
    return "reicky";
  }

  getName() {
    return super.getName() + "hhh"; // super 子类覆盖父类方法，调用父类的方法
  }
}

const person1 = new Person();
const teach1 = new Teach();

console.log(teach1.getTeachName());

console.log(person1.getName());
