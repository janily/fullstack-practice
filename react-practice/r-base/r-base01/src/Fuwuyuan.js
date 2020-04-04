import React, { Component, Fragment } from "react"; // es6 解构语法

class Fuwuyuan extends Component {
  // 构造函数传递数据
  constructor(props) {
    super(props); // 调用父类的构造函数
    this.state = {
      inputValue: "帝王服务", //input的值
      list: ["基础按摩", "精油推背"] //服务列表
    };
  }
  render() {
    return (
      // 加上最外层的DIV，组件就是完全正常的，但是你的布局就偏不需要这个最外层的标签怎么办?比如我们在作Flex布局的时候,外层还真的不能有包裹元素。这种矛盾其实React16已经有所考虑了，为我们准备了<Fragment>标签。
      <Fragment>
        <div>
          <input
            value={this.state.inputValue}
            onChange={this.inputChange.bind(this)}
          />
          <button onClick={this.addList.bind(this)}> 增加服务 </button>
        </div>
        <ul>
          {this.state.list.map((item, index) => {
            return (
              <li
                key={index + item}
                onClick={this.deleteItem.bind(this, index)}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }
  inputChange(e) {
    console.log(e.target.value);
    // this.state.inputValue = e.target.value;
    this.setState({
      inputValue: e.target.value
    });
  }
  // 增加服务
  addList() {
    this.setState({
      list: [...this.state.list, this.state.inputValue] // ... es6 语法，叫做扩展运算符。意思就是把list数组进行了分解，形成了新的数组，然后再进行组合。这种写法更简单和直观，所以推荐这种写法。
    });
  }
  // 删除服务
  deleteItem(index) {
    console.log(index);
    let list = this.state.list;
    list.splice(index, 1);
    this.setState({
      list: list
    });
  }
}

export default Fuwuyuan;
