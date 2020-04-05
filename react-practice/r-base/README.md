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
