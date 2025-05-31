import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { faBank, faStore, faShoppingCart, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import type { Transaction, TransactionComponentProps } from '../types/index';
import { formatDate, formatAmount } from '../utils/formatters';

const ICON_MAP: Record<string, IconDefinition> = {
  apple: faApple,
  store: faStore,
  bank: faBank,
  'shopping-cart': faShoppingCart,
};

const DEFAULT_ICON = faStore;

/**
 * Displays a single transaction item with icon, details, and amount
 * @param transaction - The transaction data to display
 */
export const TransactionItem = ({ transaction }: TransactionComponentProps) => {
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
          <FontAwesomeIcon icon={ICON_MAP[icon] || DEFAULT_ICON} />
        </div>
        
        <div className="transaction-content">
          <div className="transaction-main-row">
            <TransactionInfo 
              name={name}
              description={description}
              isPending={isPending}
              authorizedUser={authorizedUser}
              date={date}
            />
            
            <TransactionAmount 
              amount={amount}
              type={type}
              cashbackPercent={cashbackPercent}
            />
            
            <FontAwesomeIcon 
              icon={faChevronRight} 
              className="transaction-chevron" 
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

const TransactionInfo = ({
  name,
  description,
  isPending,
  authorizedUser,
  date
}: Pick<Transaction, 'name' | 'description' | 'isPending' | 'authorizedUser' | 'date'>) => (
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
);

const TransactionAmount = ({
  amount,
  type,
  cashbackPercent
}: Pick<Transaction, 'amount' | 'type' | 'cashbackPercent'>) => (
  <div className="transaction-amount-group">
    <span className="transaction-amount">
      {formatAmount(amount, type)}
    </span>
    {cashbackPercent && <div className="cashback">{cashbackPercent}%</div>}
  </div>
);