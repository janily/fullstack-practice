import React from 'react'

const Book =(props) => {
    const {img, title, author, children} = props.book;
    return <article className='book'>
      <img src={img} alt=''/>
      <h4>{title}</h4>
      <h1>{author}</h1>
      {children}
    </article>
}

export default Book