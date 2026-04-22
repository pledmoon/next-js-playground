/**
 * Types
 */
// initial state
type AccountState = {
  balance: number
  loan: number
  loanPurpose: string
}

// set of actions
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

type AccountAction = DepositAction | WithdrawAction | RequestLoanAction | PayLoanAction

/**
 * Initial State
 */
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
}

/**
 * Reducers must be pure functions, without API calls
 * For an unrecognized action, it should return the state unmodified (to be compatible with `combineReducers`)
 * If the given state is undefined, it should return an initial state that is not undefined.
 */
export const accountReducer = (
  state: AccountState = initialStateAccount,
  action: AccountAction,
) => {
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

/**
 * Actions creators - это соглашение, работать можно и без них,
 * это функции, возвращающие actions
 * для каждого action, создаем свой action creator
 * возвращает action, а action это объект
 */
export function deposit(amount: number): DepositAction {
  return { type: 'account/deposit', payload: amount }
}

export function withdraw(amount: number): WithdrawAction {
  return { type: 'account/withdraw', payload: amount }
}

export function requestLoan(amount: number, purpose: string) {
  return {
    type: 'account/requestLoan',
    payload: {
      amount,
      purpose,
    },
  } as const
}

export function payLoan() {
  return { type: 'account/payLoan' } as const
}

/**
 * На разбор (Advanced)
 */
/*
const actions = {
  deposit: (amount: number) => ({
    type: 'account/deposit',
    payload: amount,
  }),
  withdraw: (amount: number) => ({
    type: 'account/withdraw',
    payload: amount,
  }),
} as const

type Action = ReturnType<(typeof actions)[keyof typeof actions]>
*/
