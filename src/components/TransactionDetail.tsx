import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import type { Transaction } from '../types';

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  });
};

const formatAmount = (amount: number, type: 'Credit' | 'Payment') => {
  return `${type === 'Payment' ? '+' : ''}$${amount.toFixed(2)}`;
};

export const TransactionDetail = ({ transaction }: { transaction: Transaction }) => {
  const navigate = useNavigate();
  const { amount, name, date, type, isPending } = transaction;

  return (
    <div className="transaction-detail-page">
      <button onClick={() => navigate(-1)} className="back-button">
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
          <div className="detail-payment-method">RBC Bank Debit Card</div>
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