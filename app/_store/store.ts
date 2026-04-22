import { combineReducers, createStore } from 'redux'
import { accountReducer } from '@/app/features/accounts/accountSlice'
import { customerReducer } from '@/app/features/customers/customerSlice'

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})

export const store = createStore(rootReducer)

/**
 * Автоматический вывод типов
 */
// 1. RootState — это тип всего состояния приложения.
// TypeScript сам посмотрит на rootReducer и поймет, что там есть account и customer
export type RootState = ReturnType<typeof store.getState>

// 2. AppDispatch — это тип функции dispatch.
// Он будет знать обо всех экшенах, которые принимают ваши редюсеры.
export type AppDispatch = typeof store.dispatch
