const dogName = "Qunincy"   //常量，只读

let quote;  //变量

// const dogName = "Beau";

function dogTalk() {
    "use strict";

    dogName = "Olover";
    quote = dogName + "says Meow";
}

// dogTalk();

// 作用域

function checkScope() {
    "use strict";

    var i = "function scope";  // let i = "function scope";

    if(true) {
        var i = "block scope"; // let i = "block scope";
        console.log("Block scope i is: ", i);
    }

    console.log("function scope i is", i);
    return i;
}

// checkScope();

// function

var magic = () => {
    return new Date();
}

const myConcat = (arr1, arr2) => arr1.concat(arr2);

// console.log(myConcat([1,2], [3,4,5]));

const realNumber = [4,5,6,-5,-6,-7,3,4];

const squarelist = (arr) => {
    const squaredIntegers = arr.filter(num => Number.isInteger(num) && num > 0).map(x => x * x);
    return squaredIntegers;
}

const squaredIntegers = squarelist(realNumber);
// console.log(squaredIntegers);

const sum = (function(){
    return function sum(...args) {
        // const args = [x,y,z];
        return args.reduce((a,b) => a + b, 0)
    };
})();

// console.log(sum(1,2,3));

const arr1 = ['janily','reicky','chen'];

let arr2;

(function(){
    arr2 = [...arr1];
    arr1[0] = 'jacky';
})();

// console.log(arr2);

const source = [1,2,3,4,5,6];

function removeFirstTwo(list) {
    const [, , ...arr] = list;

    return arr;
}

const arr = removeFirstTwo(source);
// console.log(arr);
// console.log(source);

const stats = {
    max: 56.78,
    standard_deviation: 4.34,
    median: 34.54,
    mode: 23.87,
    min: -0.75,
    average: 35.85
  };
  const half = (function() {
  
    return function half(stats) {
      return (stats.max + stats.min) / 2.0;
    };
  
  })();
//   console.log(stats); 
//   console.log(half(stats)); 

// string template

const person = {
    name: "Zodiac Hasbro",
    age: 56
  };
  
  // Template literal with multi-line and string interpolation
  const greeting = `Hello, my name is ${person.name}!
  I am ${person.age} years old.`;
  
  console.log(greeting); 
  
  
  
  
  const result = {
    success: ["max-length", "no-amd", "prefer-arrow-functions"],
    failure: ["no-var", "var-on-top", "linebreak"],
    skipped: ["id-blacklist", "no-dup-keys"]
  };
//   function makeList(arr) {
//     const resultDisplayArray = null;
  
//     return resultDisplayArray;
//   }

  function makeList(arr) {
    const resultDisplayArray = [];

    for(let i = 0; i < arr.length; i++) {
        resultDisplayArray.push(`<li class="text-warning">${arr[i]}</li>`)
    }
  
    return resultDisplayArray;
  }
  /**
   * makeList(result.failure) should return:
   * [ `<li class="text-warning">no-var</li>`,
   *   `<li class="text-warning">var-on-top</li>`, 
   *   `<li class="text-warning">linebreak</li>` ]
   **/
  const resultDisplayArray = makeList(result.failure);

//   const createPerson = (name, age, gender) => {
//       return {
//           name:name,
//           age:age,
//           gender:gender
//       };
//   };

const createPerson = (name, age, gender) => ({name, age, gender});
// console.log(createPerson('janily',32,'male'));


const bicycle = {
    gear: 2,
    setGear(newGear) {
        "use strict";
        this.gear = newGear;
    }
};

bicycle.setGear(3);
// console.log(bicycle.gear);

// var SpaceShuttle = function(targetPlanet) {
//     this.targetPlanet = targetPlanet;
// }

// var zeus = new SpaceShuttle('Jupiter');

// console.log(zeus.targetPlanet);

class SpaceShuttle {
    constructor(targetPlanet) {
        this.targetPlanet = targetPlanet;
    }
}

var zeus = new SpaceShuttle('Jupiter');

// console.log(zeus.targetPlanet);

function makeClass() {
    class Vegetable {
        constructor(name) {
            this.name = name;
        }
    }

    return Vegetable;
}

const Vegetable = makeClass();
const carrot = new Vegetable('carrot');
// console.log(carrot.name); 

// getter setter 
class Book {
    constructor(author) {
      this._author = author;
    }
    // getter
    get writer(){
      return this._author;
    }
    // setter
    set writer(updatedAuthor){
      this._author = updatedAuthor;
    }
  }
  
  function makeClass() {
    
    class Thermostat {
        constructor(temp) {
            this._temp = 5/9 * (temp - 32);
        }

        get temperature() {
            return this._temp;
        }

        set temperature(updatedTemp) {
            this._temp = updatedTemp;
        }
    }
    return Thermostat;
  }
  
  const Thermostat = makeClass();
  const thermos = new Thermostat(76); 
  let temp = thermos.temperature; 
  thermos.temperature = 26;
  temp = thermos.temperature; 
//   console.log(temp);

import { capitalizeString } from "./string_function"

const cap = capitalizeString("hello!");

// console.log(cap);

//export 

const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// import * as capitalizeString from 'capitalize_strings';

export { capitalizeString };
  
export const foo = "bar";
export const bar = "foo";

// export default function subtract(x,y) {return x - y;}

// import subtract from "math_functions" 

subtract(7,5)