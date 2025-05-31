export interface Transaction {
  id: number;
  type: 'Credit' | 'Payment';
  amount: number;
  currency: string;
  name: string;
  description: string;
  date: string;
  isPending: boolean;
  authorizedUser?: string;
  icon: string;
  cashbackPercent?: number;
  paymentMethod?: string;
}

export type PaymentStatus = {
  month: string;
  isPaid: boolean;
}

export interface WalletData {
  paymentStatus: PaymentStatus;
  transactions: Transaction[];
}

export interface TransactionComponentProps {
    transaction: Transaction;
}

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type SeasonInfo = {
  name: Season;
  start: [number, number]; // [month, day]
  end: [number, number];
};