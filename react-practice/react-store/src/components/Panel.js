// 全局组件，装载功能，按需装载子组件，子组件关闭弹出层，与调用者通讯
import React from 'react'
import { render } from 'react-dom'

class Panel extends React.Component {
  state = {
    active: false,
    comment: null,
    callback: () => { }
  }

  close = data => {
    console.log(data)
    this.setState({
      active: false
    });

    this.state.callback(data)
  }

  open = options => {
    const { component, callback } = options;
    const _key = new Date().getTime()
    const _component = React.createElement(component, { close: this.close, key: _key })
    this.setState({
      active: true,
      component: _component,
      callback: callback
    })
  }
  render() {
    const _class = {
      true: 'panel-wrapper active',
      false: 'panel-wrapper'
    }
    return (
      <div className={_class[this.state.active]}>
        <div className="over-layer" onClick={this.close}></div>
        <div className="panel">
          <div className="head">
            <span className="close" onClick={this.close}>X</span>
            <div className="has-text-contered">
              {this.state.component}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const _div = document.createElement('div')
document.body.append(_div)

const _panel = render(<Panel />, _div)

export default _panel;

