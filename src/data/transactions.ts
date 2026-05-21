// ── Transaction data shared between pages ────────────────────────────

export interface Transaction {
  id: string;
  brand: string;
  category: string;
  amount: number;
}

export interface TransactionGroup {
  date: string;
  transactions: Transaction[];
}

export const GROUPED_TRANSACTIONS: TransactionGroup[] = [
  {
    date: 'Apr 21, 2026',
    transactions: [
      { id: 'WMT-3021', brand: 'Walmart',   category: 'Groceries',          amount: 67.23  },
      { id: 'NET-1847', brand: 'Netflix',   category: 'Subscriptions',      amount: 15.99  },
    ],
  },
  {
    date: 'Apr 18, 2026',
    transactions: [
      { id: 'WMT-2847', brand: 'Walmart',   category: 'Shopping',           amount: 87.43  },
      { id: 'SPT-9182', brand: 'Spotify',   category: 'Entertainment',      amount: 14.99  },
    ],
  },
  {
    date: 'Apr 15, 2026',
    transactions: [
      { id: 'SBX-3319', brand: 'Starbucks', category: 'Dining out',         amount: 6.75   },
      { id: 'APL-7741', brand: 'Apple',     category: 'Subscriptions',      amount: 9.99   },
    ],
  },
  {
    date: 'Apr 12, 2026',
    transactions: [
      { id: 'SHL-4471', brand: 'Shell Gas', category: 'Gas & fuel',         amount: 52.18  },
    ],
  },
  {
    date: 'Apr 10, 2026',
    transactions: [
      { id: 'SPT-7823', brand: 'Spotify',   category: 'Entertainment',      amount: 14.99  },
      { id: 'UBR-2291', brand: 'Uber',      category: 'Travel',             amount: 18.50  },
    ],
  },
  {
    date: 'Apr 07, 2026',
    transactions: [
      { id: 'WMT-1983', brand: 'Walmart',   category: 'Groceries',          amount: 112.34 },
    ],
  },
];

// Get the latest 5 transactions flattened from all groups
export function getLatestTransactions(count: number = 5): Transaction[] {
  const allTransactions: Transaction[] = [];
  for (const group of GROUPED_TRANSACTIONS) {
    allTransactions.push(...group.transactions);
  }
  return allTransactions.slice(0, count);
}
