import { useCallback, useState,useEffect } from "react"
import { fakeFetch } from "../../utils/fetch"
import { SuccessResponse } from "../../utils/types"
import { InputCheckbox } from "../InputCheckbox"
import { TransactionPaneComponent } from "./types"


export const TransactionPane: TransactionPaneComponent = ({ transaction }) => {
  const [approved, setApproved] = useState(transaction.approved)

 
  useEffect(() => {
    const savedApproval = localStorage.getItem(`transaction-approval-${transaction.id}`);
    if (savedApproval !== null) {
      setApproved(JSON.parse(savedApproval));
    }
  }, [transaction.id])
  
  const setTransactionApproval = useCallback(
    (newValue: boolean) => {
      fakeFetch<SuccessResponse>("setTransactionApproval", {
        transactionId: transaction.id,
      });
      localStorage.setItem(`transaction-approval-${transaction.id}`, JSON.stringify(newValue));
      setApproved(newValue);
    },
    [transaction.id]
  );
  

  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox id={transaction.id} checked={approved} onChange={setTransactionApproval} />
    </div>
  )
}

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
