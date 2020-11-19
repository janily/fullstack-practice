import React from 'react'
import { UserContext, ChannelContext } from '../App'

function HookComponentF() {
  return (
    <div>
      <UserContext.Consumer>
        {
          user => {
            return (
              <ChannelContext.Consumer>
                {
                  channel => {
                    return <div>user value {user}, channel value {channel}</div>
                  }
                }
              </ChannelContext.Consumer>
            )
          }
        }
      </UserContext.Consumer>
    </div>
  )
}

export default HookComponentF
