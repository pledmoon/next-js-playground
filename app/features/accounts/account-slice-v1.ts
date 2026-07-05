import { type AppDispatch } from '@/app/_store/store'

/**
 * Types
 */
// initial state
type AccountState = {
  balance: number
  loan: number
  loanPurpose: string
  isLoading: boolean
}

export type Currency = 'USD' | 'EUR' | 'GBP'

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

type ConvertingCurrencyAction = {
  type: 'account/convertingCurrency'
}

type AccountAction =
  | DepositAction
  | WithdrawAction
  | RequestLoanAction
  | PayLoanAction
  | ConvertingCurrencyAction

/**
 * Initial State
 */
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
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
      return { ...state, balance: state.balance + action.payload, isLoading: false }

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

    case 'account/convertingCurrency':
      return { ...state, isLoading: true }

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
export function deposit(amount: number, currency: Currency) {
  if (currency === 'USD') {
    return { type: 'account/deposit', payload: amount }
  }

  // thunk middleware
  return async (dispatch: AppDispatch) => {
    dispatch({ type: 'account/convertingCurrency' })

    // API call
    const converted = await convert(currency, 'USD', amount)

    // delay to check whether isLoading state working
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // return action
    dispatch({ type: 'account/deposit', payload: converted })
  }
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

async function convert(base: Currency, quote: Currency, amount: number) {
  const api = 'https://api.frankfurter.dev'

  const r = await fetch(`${api}/v2/rate/${base}/${quote}`)
  const d = await r.json()

  return (amount * d.rate).toFixed(2)
}
