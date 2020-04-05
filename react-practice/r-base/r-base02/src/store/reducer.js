import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from "./actionTypes"; // 统一管理 action type

const defaultState = {
  inputValue: "新建任务",
  list: ["早上起床跑步半小时", "吃完早餐学习半小时"]
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
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue);
    newState.inputValue = "";
    return newState;
  }

  if (action.type === DELETE_ITEM) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1); //删除对应的值
    return newState;
  }
  return state;
};
