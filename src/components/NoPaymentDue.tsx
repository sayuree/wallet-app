export const NoPaymentDue = () => {
  return (
    <div className="no-payment-due">
      <div className="no-payment-due-content">
        <h2>No Payment Due</h2>
        <p>You've paid your September balance.</p>
      </div>
      <div className="check-circle">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12.5L11 14.5L15.5 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}; 