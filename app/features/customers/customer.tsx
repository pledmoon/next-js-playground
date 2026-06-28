import { useAppSelector } from '@/app/_store/store'

function Customer() {
  const { fullName } = useAppSelector((state) => state.customer)

  return <h2>👋 Welcome, {fullName}</h2>
}

export default Customer
