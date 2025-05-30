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

export interface WalletData {
  cardLimit: number;
  cardBalance: number;
  currency: string;
  dailyPoints: number;
  transactions: Transaction[];
} 