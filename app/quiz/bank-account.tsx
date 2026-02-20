'use client'

import { useReducer } from 'react'

interface BankAccountState {
  balance: number
  loan: number
  isActive: boolean
}

type Action = {
  type: 'openAccount' | 'deposit' | 'withdraw' | 'requestLoan' | 'payLoan' | 'closeAccount'
  payload?: number
}

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
}

const reducer = (state: BankAccountState, action: Action) => {
  // не можем полагаться только на ui (disabled), нужна защита
  // может кто-то не на клике попытается обновить, а на useEffect
  if (!state.isActive && action.type !== 'openAccount') return state

  switch (action.type) {
    case 'openAccount':
      return { ...state, balance: 500, isActive: true }
    case 'deposit':
      return { ...state, balance: action.payload ? state.balance + action.payload : state.balance }
    case 'withdraw':
      return {
        ...state,
        balance: action.payload ? Math.max(state.balance - action.payload, 0) : state.balance,
      }
    case 'requestLoan':
      if (!!state.loan || !action.payload) return state

      return {
        ...state,
        balance: state.balance + action.payload,
        loan: action.payload,
      }
    case 'payLoan':
      return { ...state, balance: state.balance - state.loan, loan: 0 }
    case 'closeAccount':
      if (state.balance !== 0 || state.loan > 0) return state

      return initialState
    default:
      throw new Error('Action not recognized: ' + action.type + '.')
  }
}

export const BankAccount = () => {
  const [{ balance, loan, isActive }, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="app acc">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: 'openAccount' })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: 'deposit', payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: 'withdraw', payload: 50 })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: 'requestLoan', payload: 5000 })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: 'payLoan' })}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: 'closeAccount' })}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  )
}
