interface CardBalanceProps {
  balance: number;
  limit: number;
  currency: string;
}

export const CardBalance = ({ balance, limit, currency }: CardBalanceProps) => {
  const available = limit - balance;

  return (
    <div className="card-balance">
      <h2>Card Balance</h2>
      <div className="balance">{currency}{balance.toFixed(2)}</div>
      <div className="available">{currency}{available.toFixed(2)} Available</div>
    </div>
  );
}; 