'use client'

import AccountOperations from '@/app/features/accounts/account-operations'
import BalanceDisplay from '@/app/features/accounts/balance-display'
import CreateCustomer from '@/app/features/customers/create-customer'
import Customer from '@/app/features/customers/customer'
import { useAppSelector } from '@/app/_store/store'

export const ReduxBank = () => {
  const { fullName } = useAppSelector((state) => state.customer)

  return (
    <div className="relative">
      <h1>🏦 The React-Redux Bank ⚛️</h1>

      {!fullName && <CreateCustomer />}

      {fullName && (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html:
            "<style>        body {\n          font-family:\n            system-ui,\n            -apple-system,\n            BlinkMacSystemFont,\n            'Segoe UI',\n            Roboto,\n            Oxygen,\n            Ubuntu,\n            Cantarell,\n            'Open Sans',\n            'Helvetica Neue',\n            sans-serif;\n          margin: 40px;\n        }\n\n        h1 {\n          font-size: 24px;\n          margin-bottom: 20px;\n        }\n\n        h2 {\n          margin: 50px 0 20px;\n        }\n\n        input,\n        select {\n         border: 1px solid #f7f7f7; border-radius: 8px; margin: 0 8px;\n          padding: 4px 8px;\n          font: inherit;\n        }\n\n        button {\n    background: #900; border-radius: 8px;     text-transform: uppercase;\n          font-weight: bold;\n          padding: 6px 8px;\n          cursor: pointer;\n        }\n\n        .inputs {\n          background-color: #222;\n          padding: 32px;\n        }\n\n        .inputs > * + * {\n          margin-top: 20px;\n        }\n\n        .balance {\n          position: absolute;\n          top: 0px;\n          right: 0px;\n          background-color: #222;\n          padding: 24px 32px;\n          font-weight: bold;\n          font-size: 32px;\n          min-width: 180px;\n          text-align: center;\n        }</style>",
        }}
      />
    </div>
  )
}
