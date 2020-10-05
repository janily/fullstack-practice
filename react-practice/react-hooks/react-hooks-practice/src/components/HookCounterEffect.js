import React, { useState, useEffect } from 'react'

function HookCounterEffect() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `你点击了 ${count} 次`
  })
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click {count}</button>
    </div>
  )
}

export default HookCounterEffect
