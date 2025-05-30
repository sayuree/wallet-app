import type { Transaction } from './types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'Credit',
    amount: 14.01,
    currency: '$',
    name: 'Apple',
    description: 'Apple Music Subscription',
    date: '2024-02-15T09:30:00',
    icon: 'apple',
    isPending: true,
    authorizedUser: 'Diana',
    cashbackPercent: 3
  },
  {
    id: '2',
    type: 'Credit',
    amount: 85.50,
    currency: '$',
    name: 'Walmart',
    description: 'Groceries and household items',
    date: '2024-02-14T15:20:00',
    icon: 'shopping-cart',
    authorizedUser: 'John',
    cashbackPercent: 2
  },
  {
    id: '3',
    type: 'Payment',
    amount: 174.00,
    currency: '$',
    name: 'JPMorgan Chase Bank National Association',
    description: 'Monthly payment',
    date: '2024-02-13T12:00:00',
    icon: 'bank'
  }
]; 