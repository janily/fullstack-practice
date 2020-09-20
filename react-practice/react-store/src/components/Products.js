import React from 'react';
import ToolBox from './ToolBox'
import Product from './Product'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import axios from 'axios'
import Panel from './Panel'
import AddStore from './AddStore'

class Products extends React.Component {

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
        if (data) {
          this.add(data);
        }
      }
    });
  };

  add = product => {
    const _products = [...this.state.products];
    _products.push(product);
    const _sProducts = [...this.state.sourceProducts];
    _sProducts.push(product);

    this.setState({
      products: _products,
      sourceProducts: _sProducts
    });
  };

  update = product => {
    const _products = [...this.state.products];
    const _index = _products.findIndex(p => p.id === product.id)
    _products.splice(_index, 1, product)

    const _sProducts = [...this.state.sourceProducts];
    const _sIndex = _products.findIndex(p => p.id === product.id)
    _sProducts.splice(_sIndex, 1, product)

    this.setState({
      products: _products,
      sourceProducts: _sProducts
    });
  }

  delete = id => {
    const _products = this.state.products.filter(p => p.id !== id);
    const _sProducts = this.state.sourceProducts.filter(p => p.id !== id);
    this.setState({
      products: _products,
      sourceProducts: _sProducts
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
                        <Product product={p} update={this.update} delete={this.delete} />
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