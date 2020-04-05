import React, { Component, Fragment } from "react"; // es6 解构语法
import "./style.css";
import FuwuyuanItem from "./FuwuyuanItem";
import Boss from "./Boss";
import axios from "axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class Fuwuyuan extends Component {
  // 生命周期，某一时刻，可以自动执行的函数
  // 构造函数传递数据
  constructor(props) {
    super(props); // 调用父类的构造函数
    this.state = {
      inputValue: "帝王服务", //input的值
      list: [] //服务列表
    };
  }

  componentWillMount() {
    console.log("组件将要挂载到页面");
  }

  componentDidMount() {
    console.log("组件挂载完成");
    axios
      .get(
        "https://www.easy-mock.com/mock/5e894e0e2dfdc814967a527a/rbase01/fuwuproject"
      )
      .then(res => {
        console.log("axios 获取数据成功:" + JSON.stringify(res));
        this.setState({
          list: res.data.data
        });
      })
      .catch(error => {
        console.log("axios 获取数据失败" + error);
      });
  }

  shouldComponentUpdate() {
    console.log("shouldComponentUpdate---组件发生改变前执行");
    return true;
  }

  //shouldComponentUpdate返回true才会被执行。
  componentWillUpdate() {
    console.log(
      "componentWillUpdate---组件更新前，shouldComponentUpdate函数之后执行"
    );
  }

  componentDidUpdate() {
    console.log("componentDidUpdate----组件更新之后执行");
  }

  render() {
    console.log("render --- 组件挂载中");
    return (
      // 加上最外层的DIV，组件就是完全正常的，但是你的布局就偏不需要这个最外层的标签怎么办?比如我们在作Flex布局的时候,外层还真的不能有包裹元素。这种矛盾其实React16已经有所考虑了，为我们准备了<Fragment>标签。
      <Fragment>
        <div>
          <label htmlFor="janily">加入服务</label>
          <input
            id="janily"
            className="red"
            value={this.state.inputValue}
            onChange={this.inputChange.bind(this)}
            ref={input => {
              this.input = input;
            }}
          />
          <button onClick={this.addList.bind(this)}> 增加服务 </button>
        </div>
        <ul
          ref={ul => {
            this.ul = ul;
          }}
        >
          <TransitionGroup>
            {this.state.list.map((item, index) => {
              return (
                /* 
              <li
                key={index + item}
                onClick={this.deleteItem.bind(this, index)}
              >
                {item}
              </li>
              */
                <CSSTransition
                  timeout={1000}
                  classNames="boss-text"
                  unmountOnExit
                  appear={true}
                  key={index + item}
                >
                  <FuwuyuanItem
                    // key={index + item}
                    content={item}
                    index={index}
                    // avaname="波多野结衣"
                    deleteItem={this.deleteItem.bind(this)}
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </ul>
        <Boss />
      </Fragment>
    );
  }
  // inputChange(e) {
  //   console.log(e.target.value);
  //   // this.state.inputValue = e.target.value;
  //   this.setState({
  //     inputValue: e.target.value
  //   });
  // }

  inputChange() {
    this.setState({
      inputValue: this.input.value
    });
  }
  // 增加服务
  addList() {
    this.setState(
      {
        list: [...this.state.list, this.state.inputValue], // ... es6 语法，叫做扩展运算符。意思就是把list数组进行了分解，形成了新的数组，然后再进行组合。这种写法更简单和直观，所以推荐这种写法。
        inputValue: ""
      },
      () => {
        console.log(this.ul.querySelectorAll("div").length);
      }
    );
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
