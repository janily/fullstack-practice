import React, { useEffect, useRef } from 'react'

function HookRef() {

  const inputRef = useRef(null)

  useEffect(() => {
    // 聚焦

    inputRef.current.focus()

  }, [])
  return (
    <div>
      <input ref={inputRef} type="text" />
    </div>
  )
}

export default HookRef
