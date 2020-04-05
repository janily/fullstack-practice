import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <h2>List Page</h2>;
  }
  componentDidMount() {
    console.log(this.props.match); //传递的相关参数
    let tempId = this.props.match.params.tempId;
    this.setState({ id: tempId });
  }
}

export default List;
