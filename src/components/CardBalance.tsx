import { CARD_CONFIG } from "../utils/constants";

/**
 * Displays card balance information with available spending limit
 * Generates random balance on each render to demonstrate the UI
 */
export const CardBalance = () => {
  const balance = generateRandomBalance();
  const available = calculateAvailableBalance(balance);

  return (
    <div className="card-balance">
      <h2>Card Balance</h2>
      <div className="balance">{formatCurrency(balance, CARD_CONFIG.CURRENCY)}</div>
      <div className="available">{formatCurrency(available, CARD_CONFIG.CURRENCY)} Available</div>
    </div>
  );
}; 

// Generates random balance up to card limit (mock banking data)
const generateRandomBalance = (): number => {
    return parseFloat((Math.random() * CARD_CONFIG.LIMIT).toFixed(2));
};
  
const calculateAvailableBalance = (balance: number): number => {
    return CARD_CONFIG.LIMIT - balance;
};

const formatCurrency = (amount: number, currency: string): string => {
    return `${currency}${amount.toFixed(2)}`;
};