import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { formatDateTime, formatAmount } from '../utils/formatters';
import type { TransactionComponentProps } from '../types/index';

/**
 * Displays detailed information about a specific transaction
 * @param transaction - The transaction data to display
 */
export const TransactionDetail = ({ transaction }: TransactionComponentProps) => {
  const navigate = useNavigate();
  const { amount, name, date, type, isPending, paymentMethod } = transaction;
  const handleGoBack = () => navigate(-1);
  
  return (
    <div className="transaction-detail-page">
      <button onClick={handleGoBack} className="back-button">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div className="transaction-detail-header">
        <div className="detail-amount">
          {formatAmount(amount, type)}
        </div>
        <div className="detail-merchant">{name}</div>
        <div className="detail-date">{formatDateTime(date)}</div>
      </div>

      <div className="transaction-detail-card">
        <div className="detail-row">
          <div className="detail-status">Status: {isPending ? 'Pending' : 'Approved'} </div>
        </div>
        <div className="detail-row">
          <div className="detail-payment-method">{paymentMethod}</div>
        </div>
        <div className="detail-row total">
          <div className="detail-label">Total</div>
          <div className="detail-value">
            {formatAmount(amount, type)}
          </div>
        </div>
      </div>
    </div>
  );
}; 