import React, { Component } from "react";
import "antd/dist/antd.css";
import store from "./store/index";
import TodoListUi from "./TodoListUi";

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
    this.deleteItem = this.deleteItem.bind(this);
    store.subscribe(this.storeChange); //订阅Redux状态
  }
  render() {
    return (
      <TodoListUi
        inputValue={this.state.inputValue}
        list={this.state.list}
        changeInputValue={this.changeInputValue}
        clickBtn={this.clickBtn}
        deleteItem={this.deleteItem}
      />
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
