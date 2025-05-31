import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { WalletData } from '../types';
import { CardBalance } from '../components/CardBalance';
import { NoPaymentDue } from '../components/NoPaymentDue';
import { DailyPoints } from '../components/DailyPoints';
import { TransactionItem } from '../components/TransactionItem';
import transactionsData from '../data/transactions.json';

export const TransactionsList = () => {
  const [data, setData] = useState<WalletData | null>(null);

  useEffect(() => {
    // Since we're importing the JSON directly, we can use it immediately
    setData(transactionsData as WalletData);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="transactions-list">
      <div className="top-blocks">
        <CardBalance />
        <NoPaymentDue month={data.paymentStatus.month} isPaid={data.paymentStatus.isPaid} />
        <DailyPoints/>
      </div>

      <h2 className="transactions-title">Latest Transactions</h2>
      <div className="transactions-section">
        <div className="transactions">
          {data.transactions.slice(0, 10).map((transaction) => (
            <Link 
              key={transaction.id} 
              to={`/transaction/${transaction.id}`}
              className="transaction-link"
            >
              <TransactionItem transaction={transaction} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}; 