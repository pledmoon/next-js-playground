import accountReducer from '@/app/features/accounts/account-slice'
import customerReducer from '@/app/features/customers/customer-slice'
import { useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
  const _store = configureStore({
    reducer: {
      account: accountReducer,
      customer: customerReducer,
    },
  })

  if (typeof window !== 'undefined') {
    store = _store
  }

  return _store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export let store: AppStore

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
