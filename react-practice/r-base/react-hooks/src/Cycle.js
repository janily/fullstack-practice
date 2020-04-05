import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Cycle() {
  const [count, setCount] = useState(0);

  // 生命周期
  useEffect(() => {
    console.log(`useEffect=>You clicked ${count} times`);
  });

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
      <Router>
        <ul>
          <li>
            {" "}
            <Link to="/">首页</Link>{" "}
          </li>
          <li>
            <Link to="/list/">列表</Link>{" "}
          </li>
        </ul>
        <Route path="/" exact component={Index} />
        <Route path="/list/" component={List} />
      </Router>
    </div>
  );
}

function Index() {
  useEffect(() => {
    console.log("useEffect=>hey,index");
    return () => {
      console.log("hey,index leave");
    };
  }, []); //那到底要如何实现类似componentWillUnmount的效果那?这就需要请出useEffect的第二个参数，它是一个数组，数组中可以写入很多状态对应的变量，意思是当状态值发生变化时，我们才进行解绑。但是当传空数组[]时，就是当组件将被销毁时才进行解绑，这也就实现了componentWillUnmount的生命周期函数。
  return <h2>Janily</h2>;
}

function List() {
  useEffect(() => {
    console.log("useEffect=>hey,list");
  });
  return <h2>Practice</h2>;
}

export default Cycle;
