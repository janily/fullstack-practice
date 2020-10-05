import React, { useReducer } from 'react'

const initialState = {
  firstCounter: 0,
  secondCounter: 10
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, firstCounter: state.firstCounter + action.value }
    case 'increment2':
      return { ...state, secondCounter: state.secondCounter + action.value }
    case 'decrement':
      return { ...state, firstCounter: state.firstCounter - action.value }
    case 'reset':
      return initialState
    default:
      return state
  }
}

function HookReducer2() {
  const [count, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <div>count - {count.firstCounter}</div>
      <div>sCount - {count.secondCounter}</div>
      <button onClick={() => dispatch({ type: 'increment', value: 1 })}>Increment</button>
      <button onClick={() => dispatch({ type: 'increment', value: 5 })}>Increment5</button>
      <button onClick={() => dispatch({ type: 'decrement', value: 1 })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Rest</button>
      <div>
        <button onClick={() => dispatch({ type: 'increment2', value: 5 })}>counter2</button>
      </div>
    </div>
  )
}

export default HookReducer2
