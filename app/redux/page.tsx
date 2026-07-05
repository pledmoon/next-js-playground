import { ReduxBank } from '@/app/redux/redux-bank'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Redux Bank',
}

export default function ReduxPage() {
  return <ReduxBank />
}
