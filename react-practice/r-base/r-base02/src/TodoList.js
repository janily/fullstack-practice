import React, { Component } from "react";
import "antd/dist/antd.css";
import { Input, Button, List } from "antd";
import store from "./store/index";
// import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from "./store/actionTypes";
import {
  changeInputAction,
  addItemAction,
  deleteItemAction
} from "./store/actionCreatores";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.changeInputValue = this.changeInputValue.bind(this);
    // console.log(this.state);
    this.storeChange = this.storeChange.bind(this); //转变this指向
    this.clickBtn = this.clickBtn.bind(this); //转变this指向
    store.subscribe(this.storeChange); //订阅Redux状态
  }
  render() {
    return (
      <div style={{ margin: "10px" }}>
        <div>
          <Input
            placeholder="janily"
            style={{ width: "250px", marginRight: "10px" }}
            onChange={this.changeInputValue}
            value={this.state.inputValue}
          />
          <Button type="primary" onClick={this.clickBtn}>
            增加
          </Button>
        </div>
        <div style={{ margin: "10px 0 0 0", width: "300px" }}>
          <List
            bordered
            dataSource={this.state.list}
            renderItem={(item, index) => (
              <List.Item onClick={this.deleteItem.bind(this, index)}>
                {item}
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }

  changeInputValue(e) {
    // console.log(e.target.value);
    // const action = {
    //   type: CHANGE_INPUT,
    //   value: e.target.value
    // };

    const action = changeInputAction(e.target.value);
    store.dispatch(action);
  }

  storeChange() {
    console.log("store changed");
    this.setState(store.getState());
  }

  clickBtn() {
    // console.log("done");
    // const action = {
    //   type: ADD_ITEM
    // };
    const action = addItemAction();
    store.dispatch(action); //注入 store
  }

  deleteItem(index) {
    // console.log(index)
    // const action = {
    //   type: DELETE_ITEM,
    //   index
    // };
    const action = deleteItemAction(index);
    store.dispatch(action);
  }
}

export default TodoList;
