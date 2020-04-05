import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { uid: 1, title: "持续练习" },
        { uid: 2, title: "持续精进" },
        { uid: 3, title: "持续行动" }
      ]
    };

    //this.props.history.push("/home/");   // 编程重定向和下面的 redirect 方法类似
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.list.map((item, index) => {
            return (
              <li key={index}>
                <Link to={"/list/" + item.uid}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
        <Redirect to="/home/" />
      </div>
    );
  }
}

export default Index;
