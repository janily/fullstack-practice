import React, { useContext } from 'react'
import ComponentF from './HookComponentF'
import { UserContext, ChannelContext } from '../App'

function HookComponentE() {

  const user = useContext(UserContext)
  const channel = useContext(ChannelContext)
  return (
    <div>
      {/* <ComponentF /> */}
      {user} - {channel}
    </div>
  )
}

export default HookComponentE
