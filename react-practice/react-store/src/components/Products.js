import React from 'react';
import ToolBox from './ToolBox'
import Product from './Product'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import axios from 'axios'
import Panel from './Panel'
import AddStore from './AddStore'

class Products extends React.Component {


  // products = [
  //   {
  //     id: 1,
  //     name: 'air jordan',
  //     image: 'images/1.jpg',
  //     tags: '45 colors',
  //     price: '5600',
  //     status: 'available'
  //   },
  //   {
  //     id: 2,
  //     name: 'air jordan',
  //     image: 'images/1.jpg',
  //     tags: '45 colors',
  //     price: '5600',
  //     status: 'available'
  //   },
  //   {
  //     id: 3,
  //     name: 'air jordan',
  //     image: 'images/1.jpg',
  //     tags: '45 colors',
  //     price: '5600',
  //     status: 'available'
  //   },
  //   {
  //     id: 4,
  //     name: 'air jordan',
  //     image: 'images/1.jpg',
  //     tags: '45 colors',
  //     price: '5600',
  //     status: 'available'
  //   },
  //   {
  //     id: 5,
  //     name: 'air jordan',
  //     image: 'images/1.jpg',
  //     tags: '45 colors',
  //     price: '5600',
  //     status: 'unavailable'
  //   },
  //   {
  //     id: 6,
  //     name: 'air jordan',
  //     image: 'images/1.jpg',
  //     tags: '45 colors',
  //     price: '5600',
  //     status: 'available'
  //   }

  // ]

  state = {
    products: [],
    sourceProducts: []
  }

  componentDidMount() {
    console.log('---------开始')
    // fetch('http://localhost:3003/products')
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({
    //       products: data
    //     })
    //   })

    axios.get('http://localhost:3003/products').then(response => {
      this.setState({
        products: response.data,
        sourceProducts: response.data
      })
    })
  }

  search = text => {
    console.log('object')
    // 1、获取新数组
    let _products = [...this.state.sourceProducts]

    // 过滤

    _products = _products.filter(p => {
      const matchProducts = p.name.match(new RegExp(text, 'gi'))
      return matchProducts !== null
    })


    // 改变数组， UI 重新渲染

    this.setState({
      products: _products
    })
  }

  toAdd = () => {
    Panel.open({
      component: AddStore,
      callback: data => {
        console.log(data)
      }
    })
  }
  render() {
    return (
      <div>

        <ToolBox search={this.search} />
        <div className="products">
          <div className="columns is-multiline is-desktop">
            <TransitionGroup component={null}>
              {
                this.state.products.map(p => {
                  return (
                    <CSSTransition classNames="product-fade" timeout={300} key={p.id}>
                      <div className="column is-3" key={p.id}>
                        <Product product={p} />
                      </div>
                    </CSSTransition>
                  )
                })
              }
            </TransitionGroup>
          </div>
          <button className="button is-primary add-btn" onClick={this.toAdd}>添加</button>
        </div>
      </div>
    )
  }
}

export default Products;