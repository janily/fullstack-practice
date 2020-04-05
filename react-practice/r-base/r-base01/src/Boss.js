import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";

class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true
    };
    this.toggle = this.toggle.bind(this);
  }
  render() {
    return (
      <div>
        {/* <div className={this.state.isShow ? "show" : "hide"}>Boss</div> */}
        <CSSTransition
          in={this.state.isShow} //用于判断是否出现的状态
          timeout={2000} //动画持续时间
          classNames="boss-text" //className值，防止重复
          unmountOnExit
        >
          <div>BOSS级人物-孙悟空</div>
        </CSSTransition>
        <div>
          <button onClick={this.toggle}>召唤 Boss</button>
        </div>
      </div>
    );
  }
  toggle() {
    this.setState({
      isShow: this.state.isShow ? false : true
    });
  }
}

export default Boss;
