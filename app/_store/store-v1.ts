import { combineReducers, createStore } from 'redux'

/**
 * Base state
 */
type AccountState = {
  balance: number
  loan: number
  loanPurpose: string
}

type CustomerState = {
  fullName: string
  nationalID: string
  createdAt: string
}

/**
 * Set of actions
 */
type DepositAction = {
  type: 'accounts/deposit'
  payload: number
}

type WithdrawAction = {
  type: 'accounts/withdraw'
  payload: number
}

type RequestLoanAction = {
  type: 'accounts/requestLoan'
  payload: {
    amount: number
    purpose: string
  }
}

type PayLoanAction = {
  type: 'accounts/payLoan'
}

type AccountAction = DepositAction | WithdrawAction | RequestLoanAction | PayLoanAction

type CreateCustomerAction = {
  type: 'customer/createCustomer'
  payload: CustomerState
}

type UpdateNameAction = {
  type: 'customer/updateName'
  payload: string
}

type CustomerAction = CreateCustomerAction | UpdateNameAction

/**
 * Advanced
 */
/*const actions = {
  deposit: (amount: number) => ({
    type: 'accounts/deposit',
    payload: amount,
  }),
  withdraw: (amount: number) => ({
    type: 'accounts/withdraw',
    payload: amount,
  }),
} as const

type Action = ReturnType<(typeof actions)[keyof typeof actions]>*/

/**
 * Synchronously sends an action to the store's reducer, along with the previous state
 * returned by the store, to mutate the state. Returns the action it was passed.
 */
type BaseDispatch = <A extends AccountAction | CustomerAction>(a: A) => A

/**
 * A store is an object that holds the application's state tree. There should only be a
 * single store in a Redux app. Instead of multiple stores, you can compose reducers.
 */
type Store = {
  // Dispatches an action. This is the only way to trigger a state change.
  dispatch: BaseDispatch

  // Return the current state.
  getState: () => {
    account: AccountState
    customer: CustomerState
  }
}

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
}

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
}

/**
 * Reducers must be pure functions, without API calls
 * For an unrecognized action, it should return the state unmodified (to be compatible with `combineReducers`)
 * If the given state is undefined, it should return an initial state that is not undefined.
 */
const accountReducer = (state: AccountState = initialStateAccount, action: AccountAction) => {
  switch (action.type) {
    case 'accounts/deposit':
      return { ...state, balance: state.balance + action.payload }

    case 'accounts/withdraw':
      return { ...state, balance: state.balance - action.payload }

    case 'accounts/requestLoan':
      if (state.loan > 0) return state
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      }

    case 'accounts/payLoan':
      return { ...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan }

    default:
      return state
  }
}

function customerReducer(state: CustomerState = initialStateCustomer, action: CustomerAction) {
  switch (action.type) {
    case 'customer/createCustomer':
      return { ...state, ...action.payload }

    case 'customer/updateName':
      return { ...state, fullName: action.payload }

    default:
      return state
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})

const store: Store = createStore(rootReducer)

/*
store.dispatch({ type: 'accounts/deposit', payload: 100 })

console.log(store.getState())

store.dispatch({
  type: 'accounts/requestLoan',
  payload: {
    amount: 1000,
    purpose: 'Buy a car',
  },
})

console.log(store.getState())

store.dispatch({ type: 'accounts/payLoan' })

console.log(store.getState())
*/

/**
 * Actions creators - это соглашение, работать можно и без них,
 * это функции, возвращающие actions
 * для каждого action, создаем свой action creator
 * возвращает action, а action это объект
 */
function deposit(amount: number): DepositAction {
  return { type: 'accounts/deposit', payload: amount }
}

function withdraw(amount: number): WithdrawAction {
  return { type: 'accounts/withdraw', payload: amount }
}

function requestLoan(amount: number, purpose: string) {
  return {
    type: 'accounts/requestLoan',
    payload: {
      amount,
      purpose,
    },
  } as const
}

function payLoan() {
  return { type: 'accounts/payLoan' } as const
}

store.dispatch(deposit(500))
store.dispatch(withdraw(200))
store.dispatch(requestLoan(1000, 'Buy a cheap car'))

console.log(store.getState())

store.dispatch(payLoan())

console.log(store.getState())

function createCustomer(fullName: string, nationalID: string): CreateCustomerAction {
  return {
    type: 'customer/createCustomer',
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  }
}

function updateName(fullName: string) {
  return {
    type: 'customer/updateName',
    payload: fullName,
  } as const
}

store.dispatch(createCustomer('John Smith', '1234567890'))

console.log(store.getState())

store.dispatch(updateName('Robert Lewis'))

console.log(store.getState())
