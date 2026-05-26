import * as React from 'react';
import { useState } from 'react';

import { Divider } from './components/ld/Divider';
import { IconButton } from './components/ld/IconButton';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

// ── Types ─────────────────────────────────────────────────────────────────────

interface RewardsActivityPageProps {
  onBack: () => void;
  onNavSelect: (key: string) => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── Data ──────────────────────────────────────────────────────────────────────

type RewardType = 'earned' | 'redeemed' | 'adjusted';

type FilterType = 'all' | RewardType;

interface RewardTransaction {
  id: string;
  type: RewardType;
  title: string;
  date: string;
  amount: number;
}

interface RewardGroup {
  month: string;
  transactions: RewardTransaction[];
}

const ALL_GROUPS: RewardGroup[] = [
  {
    month: 'Apr 2026',
    transactions: [
      { id: 'rw-a01', type: 'redeemed', title: 'Redeemed at avenuemart.ca',   date: 'Apr 15, 2026', amount: -5.00  },
      { id: 'rw-a02', type: 'adjusted', title: 'Adjusted – Amazon refund', date: 'Apr 8, 2026',  amount: -2.40  },
      { id: 'rw-a03', type: 'earned',   title: 'March rewards earned',     date: 'Apr 1, 2026',  amount: +18.42 },
    ],
  },
  {
    month: 'Mar 2026',
    transactions: [
      { id: 'rw-m01', type: 'redeemed', title: 'Redeemed at Avenue Mart Store',        date: 'Mar 22, 2026', amount: -10.00 },
      { id: 'rw-m02', type: 'adjusted', title: 'Adjusted – Shell Gas refund', date: 'Mar 18, 2026', amount: -1.56  },
      { id: 'rw-m03', type: 'redeemed', title: 'Redeemed at avenuemart.ca',     date: 'Mar 9, 2026',  amount: -5.00  },
      { id: 'rw-m04', type: 'earned',   title: 'February rewards earned',    date: 'Mar 1, 2026',  amount: +21.87 },
    ],
  },
  {
    month: 'Feb 2026',
    transactions: [
      { id: 'rw-f01', type: 'adjusted', title: 'Adjusted – Target refund', date: 'Feb 28, 2026', amount: -1.30  },
      { id: 'rw-f02', type: 'redeemed', title: 'Redeemed at Avenue Mart Store',      date: 'Feb 15, 2026', amount: -5.00  },
      { id: 'rw-f03', type: 'earned',   title: 'January rewards earned',   date: 'Feb 1, 2026',  amount: +16.50 },
    ],
  },
  {
    month: 'Jan 2026',
    transactions: [
      { id: 'rw-j01', type: 'adjusted', title: 'Adjusted – Starbucks refund', date: 'Jan 20, 2026', amount: -0.20  },
      { id: 'rw-j02', type: 'redeemed', title: 'Redeemed at Avenue Mart Store',         date: 'Jan 10, 2026', amount: -10.00 },
      { id: 'rw-j03', type: 'earned',   title: 'December rewards earned',     date: 'Jan 1, 2026',  amount: +22.80 },
    ],
  },
  {
    month: 'Dec 2025',
    transactions: [
      { id: 'rw-d01', type: 'redeemed', title: 'Redeemed at Avenue Mart Store',   date: 'Dec 15, 2025', amount: -5.00  },
      { id: 'rw-d02', type: 'earned',   title: 'November rewards earned', date: 'Dec 1, 2025', amount: +14.20 },
    ],
  },
  {
    month: 'Nov 2025',
    transactions: [
      { id: 'rw-n01', type: 'adjusted', title: 'Adjusted – Avenue Mart Store refund',   date: 'Nov 22, 2025', amount: -2.07 },
      { id: 'rw-n02', type: 'redeemed', title: 'Redeemed at avenuemart.ca',    date: 'Nov 14, 2025', amount: -5.00 },
      { id: 'rw-n03', type: 'earned',   title: 'October rewards earned',    date: 'Nov 1, 2025',  amount: +14.81 },
    ],
  },
];

// ── Icon / colour helpers ─────────────────────────────────────────────────────

function txIcon(type: RewardType) {
  if (type === 'earned')   return <LivingDesignFontIcon name="StarFill" />;
  if (type === 'redeemed') return <LivingDesignFontIcon name="Wallet" />;
  return <LivingDesignFontIcon name="Returns" />;
}

function txIconColor(_type: RewardType): string {
  return '#2e2f32';
}

function txIconBg(_type: RewardType): string {
  return '#FFF7BF';
}

function txAmountColor(amount: number): string {
  return amount > 0 ? '#2e844a' : '#2e2f32';
}

function formatAmount(amount: number): string {
  return `${amount > 0 ? '+' : ''}$${Math.abs(amount).toFixed(2)}`;
}

// ── Filter labels ─────────────────────────────────────────────────────────────

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all',      label: 'All'       },
  { key: 'earned',   label: 'Earned'    },
  { key: 'redeemed', label: 'Redeemed'  },
  { key: 'adjusted', label: 'Adjusted'  },
];

// ── RewardsActivityPage ───────────────────────────────────────────────────────

export default function RewardsActivityPage({ onBack, onNavSelect }: RewardsActivityPageProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredGroups = ALL_GROUPS
    .map(group => ({
      ...group,
      transactions:
        activeFilter === 'all'
          ? group.transactions
          : group.transactions.filter(tx => tx.type === activeFilter),
    }))
    .filter(group => group.transactions.length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ffffff' }}>

      {/* ── Blue header ─────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#FFC107',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          minHeight: 56,
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <IconButton
          a11yLabel="Go back"
          variant="round"
          size="medium"
          onClick={onBack}
        >
          <LivingDesignFontIcon name="ArrowLeft" />
        </IconButton>
        <h1
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: '#2e2f32',
            fontFamily: FONT,
            whiteSpace: 'nowrap',
          }}
        >
          Rewards activity
        </h1>
      </div>

      {/* ── Filter chips ────────────────────────────────────────────── */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          gap: 8,
          padding: '12px 16px',
          overflowX: 'auto',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        {FILTERS.map(({ key, label }) => {
          const isActive = activeFilter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveFilter(key)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 16px',
                borderRadius: 9999,
                border: `1.5px solid ${isActive ? '#2e2f32' : '#d1d5db'}`,
                backgroundColor: isActive ? '#2e2f32' : '#ffffff',
                color: isActive ? '#FFC107' : '#2e2f32',
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: isActive ? 700 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Transaction list ─────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filteredGroups.length === 0 ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 200,
              color: '#74767c',
              fontSize: 15,
              fontFamily: FONT,
            }}
          >
            No rewards activity found
          </div>
        ) : (
          filteredGroups.map((group, groupIndex) => (
            <div key={group.month}>

              {/* Month header */}
              <div
                style={{
                  padding: '10px 16px 6px',
                  backgroundColor: '#f5f6f7',
                  borderTop: groupIndex === 0 ? 'none' : '1px solid #e5e7eb',
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#74767c',
                    fontFamily: FONT,
                  }}
                >
                  {group.month}
                </span>
              </div>

              {/* Transactions */}
              <div style={{ backgroundColor: '#ffffff' }}>
                {group.transactions.map((tx, txIndex) => (
                  <React.Fragment key={tx.id}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '14px 16px',
                      }}
                    >
                      {/* Title + date */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            margin: '0 0 2px',
                            fontSize: 14,
                            fontWeight: 600,
                            color: '#2e2f32',
                            fontFamily: FONT,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {tx.title}
                        </p>
                        <p style={{ margin: 0, fontSize: 12, color: '#74767c', fontFamily: FONT }}>
                          {tx.date}
                        </p>
                      </div>

                      {/* Amount */}
                      <p
                        style={{
                          margin: 0,
                          fontSize: 14,
                          fontWeight: 700,
                          color: txAmountColor(tx.amount),
                          fontFamily: FONT,
                          flexShrink: 0,
                        }}
                      >
                        {formatAmount(tx.amount)}
                      </p>
                    </div>

                    {txIndex < group.transactions.length - 1 && (
                      <div style={{ margin: '0 16px' }}>
                        <Divider />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
