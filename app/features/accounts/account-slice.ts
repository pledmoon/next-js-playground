import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch } from '@/app/_store/store'

export type Currency = 'USD' | 'EUR' | 'GBP'

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action: PayloadAction<number>) {
      state.balance += action.payload
      state.isLoading = false
    },

    withdraw(state, action: PayloadAction<number>) {
      state.balance -= action.payload
    },

    requestLoan: {
      prepare(amount: number, purpose: string) {
        return {
          payload: {
            amount,
            purpose,
          },
        }
      },

      reducer(state, action: PayloadAction<{ amount: number; purpose: string }>) {
        if (state.loan > 0) return

        state.loan = action.payload.amount
        state.loanPurpose = action.payload.purpose
        state.balance = state.balance + action.payload.amount
      },
    },

    payLoan(state) {
      state.balance -= state.loan
      state.loan = 0
      state.loanPurpose = ''
    },

    convertingCurrency(state) {
      state.isLoading = true
    },
  },
})

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
    dispatch({ type: 'account/deposit', payload: parseFloat(converted) })
  }
}

export const { withdraw, requestLoan, payLoan } = accountSlice.actions

export default accountSlice.reducer

async function convert(base: Currency, quote: Currency, amount: number) {
  const api = 'https://api.frankfurter.dev'

  const r = await fetch(`${api}/v2/rate/${base}/${quote}`)
  const d = await r.json()

  return (amount * d.rate).toFixed(2)
}
