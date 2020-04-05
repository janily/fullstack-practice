import React, { useState } from "react";
function Count() {
  const [count, setCount] = useState(0); //useState是react自带的一个hook函数，它的作用是用来声明状态变量(声明、读取、使用（修改）)。
  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        click me
      </button>
    </div>
  );
}
export default Count;
