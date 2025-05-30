import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { faBank, faStore, faShoppingCart, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import type { Transaction } from '../types';

const iconMap: Record<string, IconDefinition> = {
  apple: faApple,
  store: faStore,
  bank: faBank,
  'shopping-cart': faShoppingCart,
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  
  // Reset hours to compare just dates
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  // Calculate difference in days
  const diffTime = today.getTime() - compareDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays <= 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }
  
  // For older dates
  return date.toLocaleDateString('en-US', { 
    month: 'numeric', 
    day: 'numeric', 
    year: '2-digit'
  });
};

const formatAmount = (amount: number, type: 'Credit' | 'Payment') => {
  return `${type === 'Payment' ? '+' : ''}$${amount.toFixed(2)}`;
};

export const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const {
    id,
    type,
    amount,
    name,
    description,
    date,
    isPending,
    authorizedUser,
    icon,
    cashbackPercent,
  } = transaction;

  return (
    <Link to={`/transaction/${id}`} className="transaction-link">
      <div className="transaction-item">
        <div className="transaction-icon">
          <FontAwesomeIcon icon={iconMap[icon] || faStore} />
        </div>
        <div className="transaction-content">
          <div className="transaction-main-row">
            <div className="transaction-info">
              <div className="transaction-name">{name}</div>
              <div className="transaction-secondary">
                {isPending && <span className="pending">Pending - </span>}
                {description}
              </div>
              <div className="transaction-meta">
                {authorizedUser && <span className="authorized-user">{authorizedUser} – </span>}
                <span className="transaction-date">{formatDate(date)}</span>
              </div>
            </div>
            <div className="transaction-amount-group">
              <span className="transaction-amount">
                {formatAmount(amount, type)}
              </span>
              {cashbackPercent && <div className="cashback">{cashbackPercent}%</div>}
            </div>
            <FontAwesomeIcon icon={faChevronRight} className="transaction-chevron" />
          </div>
        </div>
      </div>
    </Link>
  );
}; 