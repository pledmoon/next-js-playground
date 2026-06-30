import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/_store/store'
import { deposit, payLoan, requestLoan, withdraw } from '@/app/features/accounts/account-slice'

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState<string>('')
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>('')
  const [loanAmount, setLoanAmount] = useState<string>('')
  const [loanPurpose, setLoanPurpose] = useState<string>('')
  const [currency, setCurrency] = useState<string>('USD')

  const dispatch = useAppDispatch()
  const {
    balance,
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
  } = useAppSelector((state) => state.account)

  const account = useAppSelector((state) => state.account)
  console.log(account)

  function handleDeposit() {
    if (!depositAmount && +depositAmount) return

    dispatch(deposit(+depositAmount))
    setDepositAmount('')
  }

  function handleWithdrawal() {
    if (!withdrawalAmount && +withdrawalAmount) return

    if (+withdrawalAmount > balance) return

    dispatch(withdraw(+withdrawalAmount))
    setWithdrawalAmount('')
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return

    dispatch(requestLoan(+loanAmount, loanPurpose))
    setLoanAmount('')
    setLoanPurpose('')
  }

  function handlePayLoan() {
    dispatch(payLoan())
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit}>Deposit {depositAmount}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
          />
          <button onClick={handleWithdrawal}>Withdraw {withdrawalAmount}</button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {currentLoan > 0 && (
          <div>
            <span>
              Pay back ${currentLoan} {currentLoanPurpose && `(${currentLoanPurpose})`}
            </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountOperations
