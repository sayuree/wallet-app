export type Transaction = {
  id: number;
  type: 'Credit' | 'Payment';
  amount: number;
  name: string;
  description: string;
  date: string;
  currency: string;
  isPending: boolean;
  authorizedUser?: string;
  icon: string;
  cashbackPercent?: number;
  paymentMethod: string;
}; 