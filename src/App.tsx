import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransactionsList } from './pages/TransactionsList';
import { TransactionDetail } from './components/TransactionDetail';
import transactionsData from './data/transactions.json';
import type { Transaction } from './types';
import './App.css';

const TransactionDetailWrapper = () => {
  const id = window.location.pathname.split('/')[2];
  const transaction = transactionsData.transactions.find((t) => t.id.toString() === id) as Transaction;
  
  if (!transaction) {
    return <div>Transaction not found</div>;
  }

  return <TransactionDetail transaction={transaction} />;
};

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={   
              <TransactionsList/>
          } />
          <Route path="/transaction/:id" element={<TransactionDetailWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
