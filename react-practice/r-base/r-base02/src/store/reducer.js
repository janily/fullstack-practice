import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM, GET_LIST } from "./actionTypes"; // 统一管理 action type

const defaultState = {
  inputValue: "新建任务",
  // list: ["早上起床跑步半小时", "吃完早餐学习半小时"]
  list: []
}; //默认数据
export default (state = defaultState, action) => {
  //函数方法
  // console.log(state, action);
  // Reducer 里只能接收 state，不能改变 state
  if (action.type === CHANGE_INPUT) {
    let newState = JSON.parse(JSON.stringify(state)); // 深度拷贝 state
    newState.inputValue = action.value;
    return newState;
  }

  if (action.type === ADD_ITEM) {
    // 根据type值，编写业务逻辑
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue); //push 新内容到列表中去
    newState.inputValue = "";
    return newState;
  }

  // state值只能传递，不能使用
  if (action.type === DELETE_ITEM) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1); //删除对应的值 push 新内容到列表中去
    return newState;
  }

  if (action.type === GET_LIST) {
    //根据type值，编写业务逻辑
    let newState = JSON.parse(JSON.stringify(state));
    newState.list = action.data.data.list; //复制 list 数组进去
    return newState;
  }
  return state;
};
