import React from 'react'

class Login extends React.Component {

  // 构造函数
  constructor() {
    super()
    console.log(this);
    this.handleClick = this.handClick.bind(this);
    // this.state = {
    //   isLike: false,
    //   name : 'janily'
    // };
  }

  // 组件状态来获取值  state

  // state = {
  //   isLike: false,
  //   count: 0
  // }
  //非受控组件，状态控制不了
  //受控组件，状态控制， state 数据源，控制 state 值的改变

  state = {
    email: '',
    password: ''
  }



  /**
   *  1、命名绑定
   *  2、event
   *  3、this
   *  4、传递参数
   * 
   * 
   */

  //msg = 'ccccc';

  // handleClick(event) {
  //   console.log(event.target)
  //   event.preventDefault(); //阻止默认事件

  //   console.log(this.msg)
  // }

  //箭头函数 事件传递参数

  handClick = (msg, event) => {
    console.log(event.target)
    event.preventDefault(); //阻止默认事件

    console.log(msg)
  }

  // ref 获取 dom 元素
  emailRef = React.createRef()
  passwordRef = React.createRef()

  handleSubmit = event => {
    // 阻止默认事件

    event.preventDefault();

    //获取数据

    // console.log(this.emailRef.current.value);

    // const formData = {
    //   email: this.emailRef.current.value,
    //   password: this.passwordRef.current.value
    // }

    console.log(this.state);

    //处理逻辑

    //跳转

    this.props.history.push('./');
  }

  handleGood = () => {
    this.setState({
      isLike: !this.state.isLike,
      count: this.state.count + 1
    });

    this.setState(prevState => {
      return { count: prevState.count + this.count };
    })

    console.log(this.state.count)
  }

  handChange = e => {
    console.log(e.target.value)
    this.setState({
      // [e.target.name]: e.target.value.toUpperCase()
      [e.target.name]: e.target.value
    })
  }



  render() {
    return (
      <>
        <div className="login-wrapper">
          <form className="box login-box" onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input className="input" type="email" placeholder="Email" value={this.state.email} onChange={this.handChange} name="email" />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input className="input" type="password" placeholder="Password" value={this.state.password} onChange={this.handChange} name="password" />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                {/* <button className="button is-success" onClick={this.handClick.bind(this, 'click')}>
                  Login</button> */}
                <button className="button is-success">
                  Login</button>


              </p>
            </div>
          </form>
          <div className="control">
            <button className="button is-fullwidth is-link" onClick={this.handleGood}>
              {this.state.isLike ? 'No' : 'Good'}
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default Login;

