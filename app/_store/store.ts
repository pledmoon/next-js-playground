import { createStore } from 'redux'

/**
 * Base state
 */
type State = {
  balance: number
  loan: number
  loanPurpose: string
}

/**
 * Set of actions
 */
type DepositAction = {
  type: 'account/deposit'
  payload: number
}

type WithdrawAction = {
  type: 'account/withdraw'
  payload: number
}

type RequestLoanAction = {
  type: 'account/requestLoan'
  payload: {
    amount: number
    purpose: string
  }
}

type PayLoanAction = {
  type: 'account/payLoan'
}

type Action = DepositAction | WithdrawAction | RequestLoanAction | PayLoanAction

/**
 * Advanced
 */
/*const actions = {
  deposit: (amount: number) => ({
    type: 'account/deposit',
    payload: amount,
  }),
  withdraw: (amount: number) => ({
    type: 'account/withdraw',
    payload: amount,
  }),
} as const

type Action = ReturnType<(typeof actions)[keyof typeof actions]>*/

/**
 * Synchronously sends an action to the store's reducer, along with the previous state
 * returned by the store, to mutate the state. Returns the action it was passed.
 */
type BaseDispatch = (a: Action) => Action

/**
 * A store is an object that holds the application's state tree. There should only be a
 * single store in a Redux app. Instead of multiple stores, you can compose reducers.
 */
type Store = {
  // Dispatches an action. This is the only way to trigger a state change.
  dispatch: BaseDispatch

  // Return the current state.
  getState: () => State
}

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
}

/**
 * Reducers must be pure functions, without API calls
 * For an unrecognized action, it should return the state unmodified (to be compatible with `combineReducers`)
 * If the given state is undefined, it should return an initial state that is not undefined.
 */
const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload }

    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload }

    case 'account/requestLoan':
      if (state.loan > 0) return state
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      }

    case 'account/payLoan':
      return { ...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan }

    default:
      return state
  }
}

const store: Store = createStore(reducer)

/*
store.dispatch({ type: 'account/deposit', payload: 100 })

console.log(store.getState())

store.dispatch({
  type: 'account/requestLoan',
  payload: {
    amount: 1000,
    purpose: 'Buy a car',
  },
})

console.log(store.getState())

store.dispatch({ type: 'account/payLoan' })

console.log(store.getState())
*/

/**
 * Actions creators - это соглашение, работать можно и без них,
 * это функции, возвращающие actions
 * для каждого action, создаем свой action creator
 * возвращает action, а action это объект
 */
function deposit(amount: number): DepositAction {
  return { type: 'account/deposit', payload: amount }
}

function withdraw(amount: number): WithdrawAction {
  return { type: 'account/withdraw', payload: amount }
}

function requestLoan(amount: number, purpose: string) {
  return {
    type: 'account/requestLoan',
    payload: {
      amount,
      purpose,
    },
  } as const
}

function payLoan() {
  return { type: 'account/payLoan' } as const
}

store.dispatch(deposit(500))
store.dispatch(withdraw(200))
store.dispatch(requestLoan(1000, 'Buy a cheap car'))

console.log(store.getState())

store.dispatch(payLoan())

console.log(store.getState())
