import React, { Component } from "react";
import "antd/dist/antd.css";
import store from "./store/index";
import TodoListUi from "./TodoListUi";
import axios from "axios";

// import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from "./store/actionTypes";
import {
  changeInputAction,
  addItemAction,
  deleteItemAction,
  getListAction
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

  componentDidMount() {
    axios
      .get(
        "https://www.easy-mock.com/mock/5e894e0e2dfdc814967a527a/rbase01/fuwuproject"
      )
      .then(res => {
        console.log(res);
        const data = res.data;
        const action = getListAction(data);
        store.dispatch(action); // 传递给 store
      });
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
