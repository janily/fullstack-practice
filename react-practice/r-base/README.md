# React 组件

属性（props） + 状态（state）实现一个视图（view）从而实现一个组件

创建组件需要考虑 3 点：

1、创建静态 UI
2、考虑组件的状态组成
3、考虑组件的交互方式

## 单一职责原则

每个组件只做一件事
组件复杂，拆分小组件

## 数据状态管理：DRY 原则

能计算到的状态不需要单独存储。
组件尽量无状态，使用 prop 来管理属性。

## 自定义组件以大写字母开头

JSX 可以直接使用属性语法，JSX 是 JavaScript 的一种语法糖.
写一个组件的时候，组件的最外层都需要有一个包裹。

## 生命周期

生命周期函数指在某一个时刻组件会自动调用执行的函数。

### constructor

constructor 我们叫构造函数，它是 ES6 的基本语法。虽然它和生命周期函数的性质一样，但不能认为是生命周期函数。

但是你要心里把它当成一个生命周期函数，我个人把它看成 React 的 Initialization 阶段，定义属性（props）和状态(state)。

用于初始化内部状态，很少使用。
唯一可以直接修改 state 的地方。

### getDerivedStateFormProps

1、当 state 需要从 props 初始化时使用
2、尽量不实用：增加复杂度
3、每次 render 都会调用
4、典型场景：表单控件获取默认值

### componentWillMount

在组件即将被挂载到页面的时刻执行。

### render

页面 state 或 props 发生变化时执行。

### componentDidMount

组件挂载完成时被执行。

1、UI 渲染完后调用
2、只执行一次
3、典型场景：获取外部资源

### componentWillUnmount

1、组件移除时调用
2、典型场景：资源释放

### getSnapshopBeforeUpdate

1、页面 render 之前调用，state 已更新
2、典型场景：获取 render 之前的 dom 状态

### componentDidUpdate

1、UI 每次更新调用
2、典型场景：页面需要根据 props 变化重新获取数据

### shouldComponentUpdate

1、决定 virtual DOM 是否需要重绘
2、典型场景：性能优化

安装 React Developer Tools。

有了这个浏览器插件，就可以在控制台中找到 React 标签，然后在右边点开设置，选 highlight Updates。

这时候就可以在浏览器看到子组件的 render 的情况。

shouldComponentUpdate 有两个参数：

nextProps:变化后的属性;
nextState:变化后的状态;

```javascript
shouldComponentUpdate(nextProps,nextState){
    if(nextProps.content !== this.props.content){
        return true
    }else{
        return false
    }

}
```

完美解决了子组件的渲染性能问题

## 脚手架

1、create-react-app
2、Rekit
3、codesandbox.io

## Redux(单向数据流)

状态管理，统一由一个 Store 管理

state + action = new state

纯函数更新 Store

1 getState()
2 dispatch(action)
3 subscribe(listener)

action (描述行为的数据结构)

reducer (更新数据)

Store - Actions - Reducer - View

### combineReducers

接受多个 reducers,组合在一起

### bindActionCreators

把 action 绑定到组件上，组件就可以访问 store 里到所有 action

## JSX 语法

就是你自定义的组件必须首写字母要进行大写，而 JSX 是小写字母开头的。

### vs 插件 Simple React Snippets

1、快速进行引入 import，使用 imrc

`import React, { Component } from 'react';`

生成常用的 import 代码

2、快速生成 class，使用 cc

```javascript
class  extends Component {
    state = {  }
    render() {
        return (  );
    }
}

export default ;
```

## 组件传值

使用组件属性的形式父组件给子组件传值，具体代码查看 r-base01 这个实例。

子组件不能操作父组件里的数据，需要借助父组件的方法，来修改父组件的内容。

### 子组件调用父组件的方法

如果子组件要调用父组件方法，其实和传递数据差不多，只要在组件调用时，把方法传递给子组件就可以了,记得这里也要进行 this 的绑定，如果不绑定子组件是没办法找到这个父组件的方法的。

### 数据效验

`import PropTypes from 'prop-types'`

### ref 的使用方法

在编写组件中的方法时，经常会遇到语义化很模糊的代码，这对于团队开发是一个很大的问题。所以我们必须重视 react 代码当中的语义化。ref 是个不错的工具。

## 数据请求

使用 Axios 进行数据交互。

EasyMock 来模拟数据。

## 动画

使用 react-transition-group 来做 UI 动画效果

## 状态管理

Redux 来进行状态管理

React Component(组件，借书者) - Action Creators(图书管理员) - Store(图书馆) - Reducers(图书管理软件)
Store(图书馆) - React Component(组件，借书者)

![](https://tva1.sinaimg.cn/large/00831rSTgy1gdiv0gbhlaj30dc0a0t9a.jpg)

state: 指的是原始仓库里的状态。
action: 指的是 action 新传递的状态。

store 必须是唯一的，多个 store 是坚决不允许，只能有一个 store 空间

只有 store 能改变自己的内容，Reducer 不能改变

Reducer 必须是纯函数

## 拆分 UI 组件

可以看到 r-base02 这个实例中的 TodoList.js 组件是 UI 和业务逻辑完全耦合在一起的，这时候在 src 目录下新建一个文件叫 TodoListUI.js,快速生成页面的基本结构。

### 无状态组件

完全没有业务逻辑只有 UI 的组件叫无状态组件，一个标准函数或者是箭头函数，具体查看 r-base02 这个实例中的 TodoListUi.js 文件。
性能比普通组件要好

## Redux-thunk

在 Dispatch 一个 Action 之后，到达 reducer 之前，进行一些额外的操作，就需要用到 middleware（中间件）。在实际工作中你可以使用中间件来进行日志记录、创建崩溃报告，调用异步接口或者路由。 这个中间件可以使用是 Redux-thunk 来进行增强。

## React Hooks

React Hooks 就是用函数的形式代替原来的继承类的形式，并且使用预函数的形式管理 state，有 Hooks 可以不再使用类的形式定义组件了。

Hooks 本质上就是一类特殊的函数，他们可以为你的函数型组件（function component）注入一些特殊的功能。

```javascript
const [count, setCount] = useState(0); // es6 数组结构语法
```

相当于：

```javascript
let _useState = userState(0);
let count = _useState[0];
let setCount = _useState[1];
```

useState 这个函数接收的参数是状态的初始值(Initial state)，它返回一个数组，这个数组的第 0 位是当前的状态值，第 1 位是可以改变状态值的方法函数。 所以上面的代码的意思就是声明了一个状态变量为 count，并把它的初始值设为 0，同时提供了一个可以改变 count 的状态值的方法函数。

就是 React Hooks 不能出现在条件判断语句中，因为它必须有完全一样的渲染顺序。

useEffect 来代替生命周期方法。

React 首次渲染和之后的每次渲染都会调用一遍 useEffect 函数，而之前我们要用两个生命周期函数分别表示首次渲染(componentDidMonut)和更新导致的重新渲染(componentDidUpdate)。

useEffect 中定义的函数的执行不会阻碍浏览器更新视图，也就是说这些函数时异步执行的，而 componentDidMonut 和 componentDidUpdate 中的代码都是同步执行的。这个有好处也有坏处吧，比如要根据页面的大小，然后绘制当前弹出窗口的大小，如果时异步的就不好操作了。
