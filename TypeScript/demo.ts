// 静态类型
let b: number = 123;
b = 456;

interface Point {
  x: number;
  y: number;
}

// 静态类型，快速发现潜在问题
// 更好的代码提示
// 代码更清晰易懂
function tsDemo(data: Point) {
  console.log("Janily");
  return Math.sqrt(data.x ** 2 + data.y ** 2);
}

//tsDemo({ x: 1, y: 123 });

const count: number = 2020;

interface Point {
  x: number;
  y: number;
}

const point: Point = {
  x: 3,
  y: 4,
};
