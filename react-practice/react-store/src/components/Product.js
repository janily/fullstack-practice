import React from 'react'

class Product extends React.Component {
  formatPrice = cents => {
    return (cents / 100).toLocaleString('zh', {
      style: 'currency',
      currency: 'CNY'
    })
  }
  render() {
    const { name, image, tags, price, status } = this.props.product
    const _pClass = {
      available: 'product',
      unavailable: 'product out-stock'
    }
    return (
      <div className={_pClass[status]}>
        <div className="p-content">
          <div className="img-wrapper">
            <div className="out-stock-text">Out of Stock</div>
            <figure className="image is-4by3">
              <img src={image} alt="" />
            </figure>

          </div>
          <p className="p-tags">{tags}</p>
          <p className="p-name">{name}</p>
        </div>
        <div className="p-footer">
          <p className="price">{this.formatPrice(price)}</p>
          <button className="add-cart" disabled={status === 'unavailable'}>
            <i className="fas fa-shopping-cart"></i>
            <i className="fas fa-exclamation"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Product;