import React from 'react'
import ReactDom from 'react-dom'

import './index.css'

import { bookData } from './books'
import Book from './Book'

function BookList() {
  const [book, setBook ] = React.useState(bookData);
  const { id } = book;
  return <><section key={id} className='bookList'>
    {book.map((book) => {
      return (
        <Book book={book} key={id}>
          <button>removeItem</button>
        </Book>
      )
    })}
  </section><button className='' onClick={() => setBook([])}>remove</button></>
  ;
}


ReactDom.render(<BookList />, document.getElementById('root'));

