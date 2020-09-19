import React from 'react';
import ToolBox from './ToolBox'
import Product from './Product'

class Products extends React.Component {


  products = [
    {
      id: 1,
      name: 'air jordan',
      image: 'images/1.jpg',
      tags: '45 colors',
      price: '5600',
      status: 'available'
    },
    {
      id: 2,
      name: 'air jordan',
      image: 'images/1.jpg',
      tags: '45 colors',
      price: '5600',
      status: 'available'
    },
    {
      id: 3,
      name: 'air jordan',
      image: 'images/1.jpg',
      tags: '45 colors',
      price: '5600',
      status: 'available'
    },
    {
      id: 4,
      name: 'air jordan',
      image: 'images/1.jpg',
      tags: '45 colors',
      price: '5600',
      status: 'available'
    },
    {
      id: 5,
      name: 'air jordan',
      image: 'images/1.jpg',
      tags: '45 colors',
      price: '5600',
      status: 'unavailable'
    },
    {
      id: 6,
      name: 'air jordan',
      image: 'images/1.jpg',
      tags: '45 colors',
      price: '5600',
      status: 'available'
    }

  ]
  render() {
    return (
      <div>

        <ToolBox />
        <div className="products">
          <div className="columns is-multiline is-desktop">
            {
              this.products.map(p => {
                return (
                  <div className="column is-3" key={p.id}>
                    <Product product={p} />
                  </div>
                )
              })
            }

            {/* <div className="column is-3">
              <Product />
            </div>
            <div className="column is-3">
              <Product />
            </div>
            <div className="column is-3">
              <Product />
            </div>
            <div className="column is-3">
              <Product />
            </div>
            <div className="column is-3">
              <Product />
            </div>
            <div className="column is-3">
              <Product />
            </div>
            <div className="column is-3">
              <Product />
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Products;