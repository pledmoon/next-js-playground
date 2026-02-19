'use client'

import { useReducer } from 'react'

interface CounterState {
  count: number
  step: number
}

type CounterAction =
  | { type: 'increase' }
  | { type: 'decrease' }
  | { type: 'setCount'; payload: number }
  | { type: 'setStep'; payload: number }
  | { type: 'reset' }

const reducer = (state: CounterState, action: CounterAction): CounterState => {
  const { step, count } = state

  switch (action.type) {
    case 'decrease':
      return { ...state, count: count - step }
    case 'increase':
      return { ...state, count: count + step }
    case 'setCount':
      return { ...state, count: action.payload }
    case 'setStep':
      return { ...state, step: action.payload }
    case 'reset':
      return initialState
    default:
      // return state
      throw new Error('Unknown action type')
  }
}

const initialState: CounterState = {
  count: 0,
  step: 1,
}

function DateCounter() {
  // const [count, setCount] = useState(0)
  // const [step, setStep] = useState(1)
  const [state, dispatch] = useReducer(reducer, initialState)
  const { count, step } = state

  // This mutates the date object.
  // const date = new Date('june 21 2027')
  const date = new Date()
  date.setDate(date.getDate() + count)

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step)
    dispatch({ type: 'decrease' })
  }

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step)
    dispatch({ type: 'increase' })
  }

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    // setCount(Number(e.target.value))
    dispatch({ type: 'setCount', payload: Number(e.target.value) })
  }

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    // setStep(Number(e.target.value))
    dispatch({ type: 'setStep', payload: Number(e.target.value) })
  }

  const reset = function () {
    // setCount(0)
    // setStep(1)
    dispatch({ type: 'reset' })
  }

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input
          value={count}
          onChange={defineCount}
        />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
export default DateCounter
