import type { PaymentStatus } from "../types/index";
import { CheckCircleIcon } from "./CheckCircleIcon";

/**
 * Displays payment status
 * @param month - The billing month (e.g. "September")
 * @param isPaid - Payment completion status
 */
export const NoPaymentDue = ({ month, isPaid }: PaymentStatus) => {
  return (
    <div className="no-payment-due">
      <div className="no-payment-due-content">
        <h2>No Payment Due</h2>
        <p>You've {isPaid ? 'paid' : 'not paid'} your {month} balance.</p>
      </div>
      <CheckCircleIcon />
    </div>
  );
}; 