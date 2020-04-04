## React 组件

属性（props） + 状态（state）实现一个视图（view）从而实现一个组件

创建组件需要考虑 3 点：

1、创建静态 UI
2、考虑组件的状态组成
3、考虑组件的交互方式

### 单一职责原则

每个组件只做一件事
组件复杂，拆分小组件

### 数据状态管理：DRY 原则

能计算到的状态不需要单独存储
组件尽量无状态，使用 prop 来管理属性

### 自定义组件以大写字母开头

JSX 可以直接使用属性语法，JSX 是 JavaScript 的一种语法糖

## 生命周期

### constructor

用于初始化内部状态，很少使用
唯一可以直接修改 state 的地方

### getDerivedStateFormProps

1、当 state 需要从 props 初始化时使用
2、尽量不实用：增加复杂度
3、每次 render 都会调用
4、典型场景：表单控件获取默认值

### componentDidMount

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
