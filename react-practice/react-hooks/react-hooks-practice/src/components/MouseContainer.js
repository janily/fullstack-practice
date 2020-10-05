import React, { useState } from 'react'
import HookMouse from './HookMouse'

function MouseContainer() {
  const [display, setDisplay] = useState(true)
  return (
    <div>
      <button onClick={() => setDisplay(!display)}>显示隐藏切换</button>
      {display & <HookMouse />}
    </div>
  )
}

export default MouseContainer
