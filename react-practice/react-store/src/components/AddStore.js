import React from 'react'

class AddStore extends React.Component {
  render() {
    return (
      <>
        <div className="inventory">
          <p className="title has-text-centered">Inventory</p>
          <br />
          <div className="control">
            <button className="button" onClick={() => { this.props.close('add store data') }}>取消</button>
          </div>
        </div>
      </>
    );
  }
}

export default AddStore