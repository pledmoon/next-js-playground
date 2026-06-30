import { useAppSelector } from '@/app/_store/store'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

function BalanceDisplay() {
  /**
   * useDispatch and useSelector are modern way of using redux
   * before it we should use connect api
   */
  const { balance } = useAppSelector((state) => state.account)

  return <div className="balance">{formatCurrency(balance)}</div>
}

export default BalanceDisplay
