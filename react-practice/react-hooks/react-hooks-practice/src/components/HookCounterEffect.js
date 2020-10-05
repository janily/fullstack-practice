import React, { useState, useEffect } from 'react'

function HookCounterEffect() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  useEffect(() => {
    console.log('useEffect - 更新数据')
    document.title = `你点击了 ${count} 次`
  }, [count])
  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>Click {count}</button>
    </div>
  )
}

export default HookCounterEffect
