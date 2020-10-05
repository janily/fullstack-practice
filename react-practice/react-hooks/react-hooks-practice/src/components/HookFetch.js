import React, { useState, useEffect } from 'react'
import axios from 'axios'

function HookFetch() {

  // const [posts, setPosts] = useState([])
  const [posts, setPost] = useState({})

  const [id, setId] = useState(1)

  const [idClick, setIdClick] = useState(1)

  // useEffect(() => {
  //   axios.get(`http://jsonplaceholder.typicode.com/posts/`)
  //     .then(res => {
  //       console.log(res)
  //       setPosts(res.data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }, [])

  const handClick = () => {
    setIdClick(id)
  }

  useEffect(() => {
    axios.get(`http://jsonplaceholder.typicode.com/posts/${idClick}`)
      .then(res => {
        console.log(res)
        setPost(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [idClick])
  return (
    <div>
      <input type="text" value={id} onChange={e => setId(e.target.value)} />
      <button type="button" onClick={handClick}>获取数据</button>
      <div>{posts.title}</div>
      {/* <ul>
        {
          posts.map(post => <li key={post.id}>{post.title}</li>)
        }
      </ul> */}
    </div>
  )
}

export default HookFetch
