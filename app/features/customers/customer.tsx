import { useAppSelector } from '@/app/_store/store'

export const Customer = () => {
  const { fullName, nationalID, createdAt } = useAppSelector((store) => store.customer)
  console.log(fullName)

  return <h2>👋 Welcome, %NAME%</h2>
}
