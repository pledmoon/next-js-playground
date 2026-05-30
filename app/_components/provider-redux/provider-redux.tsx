'use client'

import { Provider } from 'react-redux'
import { type ReactNode, useRef } from 'react'
import { type AppStore, makeStore } from '@/app/_store/store'

export const ProviderRedux = ({ children }: { children: Readonly<ReactNode> }) => {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
