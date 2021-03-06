import React from 'react'
import Panel from './Panel'
import EditStore from './EditStore'
import axios from 'axios'
import { toast } from 'react-toastify'

class Product extends React.Component {
  toEdit = () => {
    Panel.open({
      component: EditStore,
      props: {
        product: this.props.product,
        deleteProduct: this.props.delete
      },
      callback: data => {
        if (data) {
          this.props.update(data)
        }

      }
    })
  }
  formatPrice = cents => {
    return (cents / 100).toLocaleString('zh', {
      style: 'currency',
      currency: 'CNY'
    })
  }

  addCart = async () => {
    const { id, name, image, price } = this.props.product;

    const res = await axios.get(`http://localhost:3003/carts?productId=${id}`);

    const carts = res.data

    console.log(carts)

    if (carts && carts.length > 0) {
      const cart = carts[0]
      cart.mount += 1
      await axios.put(`http://localhost:3003/carts/${cart.id}`, cart)
    } else {
      const cart = {
        productId: id,
        name,
        image,
        price,
        mount: 1
      }

      await axios.post('http://localhost:3003/carts', cart).then(res => {
        console.log(res.data);
      })
    }

    toast.success('添加购物成功')
    this.props.updatedCartNum();

  };








  render() {
    const { name, image, tags, price, status } = this.props.product
    const _pClass = {
      available: 'product',
      unavailable: 'product out-stock'
    }
    return (
      <div className={_pClass[status]}>
        <div className="p-content">
          <div className="p-head has-text-right" onClick={this.toEdit}>
            <span className="icon edit-btn">
              <i className="fas fa-sliders-h"></i>
            </span>
          </div>
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
          <button className="add-cart" disabled={status === 'unavailable'} onClick={this.addCart}>
            <i className="fas fa-shopping-cart"></i>
            <i className="fas fa-exclamation"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Product;