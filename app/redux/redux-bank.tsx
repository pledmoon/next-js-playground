'use client'

import { store } from '@/app/_store/store'

export const ReduxBank = () => {
  // нужен react-redux, таким образом нельзя использовать, потому что теряется реактивность
  store.dispatch({ type: 'account/deposit', payload: 100 })
  console.log(store.getState())

  return <h1>BANKE</h1>
}
