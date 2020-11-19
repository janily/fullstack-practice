import React, { useEffect, useState } from 'react'

function HookMouse() {

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const logMousePosition = e => {
    console.log('mouse event')
    setX(e.clientX)
    setY(e.clientY)
  }

  useEffect(() => {
    console.log('useEffect is call')
    window.addEventListener('mousemove', logMousePosition)

    return () => {
      console.log('删除监听')
      window.removeEventListener('mousemove', logMousePosition)
    }
  }, [])

  return (
    <div>
      Hooks X - {x} Y - {y}
    </div>
  )
}

export default HookMouse
