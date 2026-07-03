import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux'
import { thunk } from 'redux-thunk'
import { accountReducer } from '@/app/features/accounts/account-slice'
import { customerReducer } from '@/app/features/customers/customer-slice'
import { useDispatch, useSelector } from 'react-redux'

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

// redux devtools
const composeEnhancers =
  typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose

export const makeStore = () => {
  const _store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

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
