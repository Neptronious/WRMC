// ── Transaction data shared between pages ────────────────────────────

export interface Transaction {
  id: string;
  brand: string;
  category: string;
  amount: number;
  status?: 'failed' | 'refund';
}

export interface TransactionGroup {
  date: string;
  transactions: Transaction[];
}

export const GROUPED_TRANSACTIONS: TransactionGroup[] = [
  // ── April 2026 ────────────────────────────────────────────────────────────────
  {
    date: 'Apr 21, 2026',
    transactions: [
      { id: 'CK-3021',  brand: 'Circle K',    category: 'Groceries',       amount: 67.23  },
      { id: 'NET-1847', brand: 'Netflix',      category: 'Subscriptions',   amount: 15.99  },
      { id: 'BBY-3022', brand: 'Best Buy',     category: 'Electronics',     amount: 399.99, status: 'failed' },
    ],
  },
  {
    date: 'Apr 19, 2026',
    transactions: [
      { id: 'AMZ-3019', brand: 'Amazon',       category: 'Shopping',        amount: 54.99,  status: 'refund' },
    ],
  },
  {
    date: 'Apr 18, 2026',
    transactions: [
      { id: 'CK-2847',  brand: 'Circle K',    category: 'Shopping',        amount: 87.43  },
      { id: 'SPT-9182', brand: 'Spotify',      category: 'Entertainment',   amount: 14.99  },
    ],
  },
  {
    date: 'Apr 15, 2026',
    transactions: [
      { id: 'SBX-3319', brand: 'Starbucks',   category: 'Dining out',      amount: 6.75   },
      { id: 'APL-7741', brand: 'Apple',        category: 'Subscriptions',   amount: 9.99   },
    ],
  },
  {
    date: 'Apr 12, 2026',
    transactions: [
      { id: 'SHL-4471', brand: 'Shell Gas',   category: 'Gas & fuel',      amount: 52.18  },
    ],
  },
  {
    date: 'Apr 10, 2026',
    transactions: [
      { id: 'SPT-7823', brand: 'Spotify',      category: 'Entertainment',   amount: 14.99  },
      { id: 'UBR-2291', brand: 'Uber',         category: 'Travel',          amount: 18.50  },
    ],
  },
  {
    date: 'Apr 7, 2026',
    transactions: [
      { id: 'CK-1983',  brand: 'Circle K',    category: 'Groceries',       amount: 112.34 },
    ],
  },

  // ── March 2026 ────────────────────────────────────────────────────────────────
  {
    date: 'Mar 28, 2026',
    transactions: [
      { id: 'CK-2201',  brand: 'Circle K',    category: 'Groceries',       amount: 78.34  },
    ],
  },
  {
    date: 'Mar 25, 2026',
    transactions: [
      { id: 'NET-2202', brand: 'Netflix',      category: 'Subscriptions',   amount: 15.99  },
      { id: 'AMZ-2203', brand: 'Amazon',       category: 'Shopping',        amount: 123.45 },
    ],
  },
  {
    date: 'Mar 22, 2026',
    transactions: [
      { id: 'UBR-2204', brand: 'Uber',         category: 'Travel',          amount: 16.25  },
    ],
  },
  {
    date: 'Mar 18, 2026',
    transactions: [
      { id: 'SHL-2205', brand: 'Shell Gas',   category: 'Gas & fuel',      amount: 58.90  },
    ],
  },
  {
    date: 'Mar 15, 2026',
    transactions: [
      { id: 'SPT-2206', brand: 'Spotify',      category: 'Entertainment',   amount: 14.99  },
      { id: 'APL-2207', brand: 'Apple',        category: 'Subscriptions',   amount: 9.99   },
    ],
  },
  {
    date: 'Mar 12, 2026',
    transactions: [
      { id: 'SBX-2208', brand: 'Starbucks',   category: 'Dining out',      amount: 11.50  },
      { id: 'THN-2209', brand: 'Tim Hortons', category: 'Dining out',      amount: 8.75   },
    ],
  },
  {
    date: 'Mar 8, 2026',
    transactions: [
      { id: 'CK-2210',  brand: 'Circle K',    category: 'Shopping',        amount: 67.23  },
    ],
  },
  {
    date: 'Mar 5, 2026',
    transactions: [
      { id: 'HDP-2211', brand: 'Home Depot',  category: 'Shopping',        amount: 89.40  },
    ],
  },
  {
    date: 'Mar 2, 2026',
    transactions: [
      { id: 'MCD-2212', brand: "McDonald's",  category: 'Dining out',      amount: 14.50  },
    ],
  },

  // ── February 2026 ─────────────────────────────────────────────────────────────
  {
    date: 'Feb 26, 2026',
    transactions: [
      { id: 'CK-2101',  brand: 'Circle K',    category: 'Groceries',       amount: 94.67  },
    ],
  },
  {
    date: 'Feb 22, 2026',
    transactions: [
      { id: 'AMZ-2102', brand: 'Amazon',       category: 'Shopping',        amount: 34.99  },
    ],
  },
  {
    date: 'Feb 19, 2026',
    transactions: [
      { id: 'NET-2103', brand: 'Netflix',      category: 'Subscriptions',   amount: 15.99  },
    ],
  },
  {
    date: 'Feb 15, 2026',
    transactions: [
      { id: 'SHL-2104', brand: 'Shell Gas',   category: 'Gas & fuel',      amount: 50.25  },
      { id: 'UBR-2105', brand: 'Uber',         category: 'Travel',          amount: 21.00  },
    ],
  },
  {
    date: 'Feb 12, 2026',
    transactions: [
      { id: 'SPT-2106', brand: 'Spotify',      category: 'Entertainment',   amount: 14.99  },
      { id: 'APL-2107', brand: 'Apple',        category: 'Subscriptions',   amount: 9.99   },
    ],
  },
  {
    date: 'Feb 8, 2026',
    transactions: [
      { id: 'SBX-2108', brand: 'Starbucks',   category: 'Dining out',      amount: 8.25   },
      { id: 'MCD-2109', brand: "McDonald's",  category: 'Dining out',      amount: 9.75   },
    ],
  },
  {
    date: 'Feb 5, 2026',
    transactions: [
      { id: 'CK-2110',  brand: 'Circle K',    category: 'Shopping',        amount: 45.88  },
    ],
  },
  {
    date: 'Feb 1, 2026',
    transactions: [
      { id: 'BBY-2111', brand: 'Best Buy',    category: 'Electronics',     amount: 159.99 },
    ],
  },

  // ── January 2026 ──────────────────────────────────────────────────────────────
  {
    date: 'Jan 28, 2026',
    transactions: [
      { id: 'CK-2001',  brand: 'Circle K',    category: 'Groceries',       amount: 89.12  },
    ],
  },
  {
    date: 'Jan 24, 2026',
    transactions: [
      { id: 'NET-2002', brand: 'Netflix',      category: 'Subscriptions',   amount: 15.99  },
      { id: 'AMZ-2003', brand: 'Amazon',       category: 'Shopping',        amount: 45.20  },
    ],
  },
  {
    date: 'Jan 20, 2026',
    transactions: [
      { id: 'UBR-2004', brand: 'Uber',         category: 'Travel',          amount: 18.75  },
    ],
  },
  {
    date: 'Jan 16, 2026',
    transactions: [
      { id: 'SHL-2005', brand: 'Shell Gas',   category: 'Gas & fuel',      amount: 44.80  },
    ],
  },
  {
    date: 'Jan 12, 2026',
    transactions: [
      { id: 'SPT-2006', brand: 'Spotify',      category: 'Entertainment',   amount: 14.99  },
      { id: 'SBX-2007', brand: 'Starbucks',   category: 'Dining out',      amount: 6.50   },
    ],
  },
  {
    date: 'Jan 8, 2026',
    transactions: [
      { id: 'APL-2008', brand: 'Apple',        category: 'Subscriptions',   amount: 9.99   },
    ],
  },
  {
    date: 'Jan 5, 2026',
    transactions: [
      { id: 'THN-2009', brand: 'Tim Hortons', category: 'Dining out',      amount: 7.25   },
    ],
  },
  {
    date: 'Jan 2, 2026',
    transactions: [
      { id: 'CK-2010',  brand: 'Circle K',    category: 'Shopping',        amount: 62.45  },
    ],
  },

  // ── December 2025 ─────────────────────────────────────────────────────────────
  {
    date: 'Dec 24, 2025',
    transactions: [
      { id: 'CK-1901',  brand: 'Circle K',    category: 'Groceries',       amount: 156.78 },
      { id: 'AMZ-1902', brand: 'Amazon',       category: 'Shopping',        amount: 89.45  },
    ],
  },
  {
    date: 'Dec 20, 2025',
    transactions: [
      { id: 'HDP-1903', brand: 'Home Depot',  category: 'Shopping',        amount: 67.30  },
    ],
  },
  {
    date: 'Dec 16, 2025',
    transactions: [
      { id: 'NET-1904', brand: 'Netflix',      category: 'Subscriptions',   amount: 15.99  },
      { id: 'SPT-1905', brand: 'Spotify',      category: 'Entertainment',   amount: 14.99  },
    ],
  },
  {
    date: 'Dec 12, 2025',
    transactions: [
      { id: 'SHL-1906', brand: 'Shell Gas',   category: 'Gas & fuel',      amount: 52.40  },
    ],
  },
  {
    date: 'Dec 8, 2025',
    transactions: [
      { id: 'SBX-1907', brand: 'Starbucks',   category: 'Dining out',      amount: 15.25  },
    ],
  },
  {
    date: 'Dec 5, 2025',
    transactions: [
      { id: 'APL-1908', brand: 'Apple',        category: 'Subscriptions',   amount: 9.99   },
    ],
  },
  {
    date: 'Dec 2, 2025',
    transactions: [
      { id: 'CK-1909',  brand: 'Circle K',    category: 'Shopping',        amount: 78.34  },
    ],
  },

  // ── November 2025 ─────────────────────────────────────────────────────────────
  {
    date: 'Nov 28, 2025',
    transactions: [
      { id: 'CK-1801',  brand: 'Circle K',    category: 'Groceries',       amount: 45.23  },
      { id: 'NET-1802', brand: 'Netflix',      category: 'Subscriptions',   amount: 15.99  },
    ],
  },
  {
    date: 'Nov 25, 2025',
    transactions: [
      { id: 'THN-1803', brand: 'Tim Hortons', category: 'Dining out',      amount: 8.45   },
      { id: 'AMZ-1804', brand: 'Amazon',       category: 'Shopping',        amount: 67.99  },
    ],
  },
  {
    date: 'Nov 22, 2025',
    transactions: [
      { id: 'SHL-1805', brand: 'Shell Gas',   category: 'Gas & fuel',      amount: 48.30  },
    ],
  },
  {
    date: 'Nov 18, 2025',
    transactions: [
      { id: 'SPT-1806', brand: 'Spotify',      category: 'Entertainment',   amount: 14.99  },
      { id: 'SBX-1807', brand: 'Starbucks',   category: 'Dining out',      amount: 6.75   },
    ],
  },
  {
    date: 'Nov 15, 2025',
    transactions: [
      { id: 'CK-1808',  brand: 'Circle K',    category: 'Shopping',        amount: 112.50 },
    ],
  },
  {
    date: 'Nov 12, 2025',
    transactions: [
      { id: 'BBY-1809', brand: 'Best Buy',    category: 'Electronics',     amount: 249.99 },
    ],
  },
  {
    date: 'Nov 8, 2025',
    transactions: [
      { id: 'UBR-1810', brand: 'Uber',         category: 'Travel',          amount: 22.50  },
    ],
  },
  {
    date: 'Nov 5, 2025',
    transactions: [
      { id: 'APL-1811', brand: 'Apple',        category: 'Subscriptions',   amount: 9.99   },
      { id: 'MCD-1812', brand: "McDonald's",  category: 'Dining out',      amount: 12.35  },
    ],
  },
];

// Get the latest N transactions flattened from all groups
export function getLatestTransactions(count: number = 5): Transaction[] {
  const allTransactions: Transaction[] = [];
  for (const group of GROUPED_TRANSACTIONS) {
    allTransactions.push(...group.transactions);
  }
  return allTransactions.slice(0, count);
}
