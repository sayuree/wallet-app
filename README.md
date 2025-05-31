# Mobile Wallet App

A modern, mobile-first digital wallet application built with React and TypeScript. The app provides a clean, intuitive interface for managing transactions, viewing card balances, and tracking rewards points.

## Screenshots

### Main Dashboard
![Main Dashboard](screenshots/dashboard.png)

The main dashboard provides a comprehensive overview of your financial status:
- Current card balance with available credit
- Payment status for the current month (May)
- Daily reward points
- Latest transactions list with:
  - Transaction icons and merchant names
  - Transaction amounts and cashback percentages
  - Status indicators (Pending/Completed)
  - Dates in relative format (Yesterday, Tuesday, etc.)
  - Payment method used

### Transaction Detail
![Transaction Detail](screenshots/transaction-detail.png)

The transaction detail view shows comprehensive information about each purchase:
- Transaction amount in large, clear typography
- Merchant name and timestamp
- Transaction status (Pending/Completed)
- Payment method used (RBC Visa Credit Card)
- Total amount breakdown

## Features

- 📱 Mobile-optimized interface
- 💳 Card balance and available credit display
- 📊 Transaction history with detailed views
- ✅ Payment status indicators
- 🏆 Daily points tracking
- 💰 Cashback percentage display

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- FontAwesome Icons
- CSS3 with CSS Variables

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd wallet-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
wallet-app/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── types/             # TypeScript type definitions
│   ├── data/              # Mock data
│   ├── utils/             # Utility functions
│   │   ├── formatters.ts  # Date and amount formatting
│   │   ├── constants.ts   # App-wide constants and configurations
│   │   └── pointsCalculator.ts  # Daily points calculation
│   ├── App.tsx           # Main app component
│   └── App.css           # Global styles
├── public/               # Static assets
└── index.html           # Entry HTML file
```

## Key Components

- **TransactionsList**: Main page displaying recent transactions
- **TransactionDetail**: Detailed view of individual transactions
- **CardBalance**: Displays current balance and available credit
- **NoPaymentDue**: Shows payment status with visual indicator
- **DailyPoints**: Displays reward points
- **TransactionItem**: Individual transaction row component

## Styling

The app uses CSS variables for consistent theming:
- Primary colors
- Background colors
- Font sizes
- Border radiuses
- Spacing units

## Mobile-First Design

- Optimized for mobile devices with max-width of 430px
- Responsive layout adjustments for larger screens
- Touch-friendly interface elements
- Clear visual hierarchy

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Type Checking

```bash
npm run type-check
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
