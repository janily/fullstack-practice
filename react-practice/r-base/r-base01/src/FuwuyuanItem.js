import React, { Component } from "react";
import PropTypes from "prop-types";
class FuwuyuanItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  //凡是组件都有生命周期函数，所以子组件也是有的，并且子组件接收了props，这时候函数就可以被执行了。
  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
  }

  //当组件从页面中删除的时候执行
  componentWillUnmount() {
    console.log("child - componentWillUnmount");
  }

  // 优化性能
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.content !== this.props.content) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    console.log("child-render");
    return (
      <div onClick={this.handleClick}>
        {this.props.avaname}为你服务-{this.props.content}
      </div>
    );
  }

  handleClick() {
    console.log("事件");
    console.log(this.props.index);
    this.props.deleteItem(this.props.index);
  }
}

// 对相关数据进行效验
FuwuyuanItem.propTypes = {
  content: PropTypes.string,
  deleteItem: PropTypes.func,
  index: PropTypes.number,
  avaname: PropTypes.string.isRequired
};

FuwuyuanItem.defaultProps = {
  avaname: "松岛枫"
};

export default FuwuyuanItem;
