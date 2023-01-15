import React from 'react'

const Book =(props) => {
    const {id, img, title, author, children} = props.book;
    return <article className='book' key={id}>
      <img src={img} alt=''/>
      <h4>{title}</h4>
      <h1>{author}</h1>
      {children}
    </article>
}

export default Book