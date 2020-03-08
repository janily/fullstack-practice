// 数组结构赋值

// let a=0;
// let b=1;
// let c=2;

// es6  从数组中提取值，按照位置的对象关系对变量赋值。
//let  [a,b,c]=[1,2,3];

//可以简单的理解为等号左边和等号右边的形式要统一，如果不统一解构将失败。
// let [a,[b,c],d]=[1,[2,3],4];


//解构赋值是允许你使用默认值的
let [f,b="janily"]=['coding']
console.log(f+b); // 控制台会输出 "coding janily"

//undefined相当于什么都没有，b是默认值。
let [a,b="janily"]=['coding',undefined];
console.log(a+b); // coding janily

//解构不仅可以用于数组，还可以用于对象。
let {foo,bar} = {foo:'janily',bar: 'coding'};
console.log(foo+bar);

// 圆括号

let c;
({c} ={c:'janilychen'});
console.log(c);

//字符串结构
const [e,f,g,h] = 'janilychen';
console.log(e);
console.log(f);
console.log(g);
console.log(h);
