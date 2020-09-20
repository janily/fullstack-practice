import React from 'react'

class ToolBox extends React.Component {

  state = {
    searchText: ''
  }

  handleChange = e => {
    const value = e.target.value;

    this.setState({
      searchText: value
    })

    this.props.search(value)
  };

  clearSearch = () => {
    this.setState({
      searchText: ''
    })

    this.props.search('')

  }





  render() {
    return (
      <div className="tool-box">
        <div className="logo-text"></div>
        <div className="search-box">
          <div className="field has-addons">
            <div className="control">
              <input type="text"
                className="input search-input"
                value={this.state.searchText}
                onChange={this.handleChange}
                placeholder="搜索"
              />
            </div>
            <div className="control">
              <button className="button" onClick={this.clearSearch}>X</button>
            </div>
          </div>
        </div>
        <div className="cart-box">
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-num">({this.props.cartNum})</span>
        </div>
      </div>
    )
  }
}

export default ToolBox;