import * as React from 'react';
import { useState, useEffect } from 'react';

import { Alert } from './components/ld/Alert';
import { BottomSheet } from './components/ld/BottomSheet';
import { Button } from './components/ld/Button';
import { Checkbox } from './components/ld/Checkbox';
import { Divider } from './components/ld/Divider';
import { IconButton } from './components/ld/IconButton';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';
import { GROUPED_TRANSACTIONS, TransactionGroup } from './data/transactions';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ActivityPageProps {
  onBack: () => void;
  onNavSelect: (key: string) => void;
}

// ── Dummy data ────────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── Brand logo URLs ──────────────────────────────────────────────
const BASE = import.meta.env.BASE_URL;
const BRAND_LOGOS: Record<string, string> = {
  'Avenue Mart': `${BASE}logos/avenuemart.png`,
  'Netflix':     `${BASE}logos/netflix.png`,
  'Spotify':     `${BASE}logos/spotify.png`,
  'Starbucks':   `${BASE}logos/starbucks.png`,
  'Apple':       `${BASE}logos/apple.png`,
  'Shell Gas':   `${BASE}logos/shell.png`,
  'Uber':        `${BASE}logos/uber.png`,
  'Amazon':      `${BASE}logos/amazon.png`,
  'Tim Hortons': `${BASE}logos/timhortons.png`,
  "McDonald's":  `${BASE}logos/mcdonalds.png`,
  'Home Depot':  `${BASE}logos/homedepot.png`,
  'Best Buy':    `${BASE}logos/bestbuy.png`,
};

// ── Statement data ────────────────────────────────────────────────────────────

interface Statement {
  id: string;
  label: string;
}

interface StatementGroup {
  year: number;
  statements: Statement[];
}

const STATEMENT_GROUPS: StatementGroup[] = [
  {
    year: 2026,
    statements: [
      { id: 'stmt-2026-04', label: 'Apr 15 – May 14' },
      { id: 'stmt-2026-03', label: 'Mar 15 – Apr 14' },
      { id: 'stmt-2026-02', label: 'Feb 15 – Mar 14' },
      { id: 'stmt-2026-01', label: 'Jan 15 – Feb 14' },
    ],
  },
  {
    year: 2025,
    statements: [
      { id: 'stmt-2025-12', label: 'Dec 15 – Jan 14' },
      { id: 'stmt-2025-11', label: 'Nov 15 – Dec 14' },
      { id: 'stmt-2025-10', label: 'Oct 15 – Nov 14' },
      { id: 'stmt-2025-09', label: 'Sep 15 – Oct 14' },
      { id: 'stmt-2025-08', label: 'Aug 15 – Sep 14' },
      { id: 'stmt-2025-07', label: 'Jul 15 – Aug 14' },
      { id: 'stmt-2025-06', label: 'Jun 15 – Jul 14' },
      { id: 'stmt-2025-05', label: 'May 15 – Jun 14' },
      { id: 'stmt-2025-04', label: 'Apr 15 – May 14' },
    ],
  },
];

// ── Filter options ────────────────────────────────────────────────────────────

const CATEGORY_OPTIONS = ['Dining out', 'Electronics', 'Entertainment', 'Gas & fuel', 'Groceries', 'Healthcare & wellness', 'Shopping', 'Subscriptions', 'Travel', 'Utilities'];
const TYPE_OPTIONS     = ['Purchase', 'Refund'];
const DATE_OPTIONS     = ['Last 7 days', 'Last 30 days', 'Last 3 months', 'Last 6 months'];

type FilterKey = 'Category' | 'Type' | 'Date range';

const FILTER_OPTIONS: Record<FilterKey, string[]> = {
  'Category':   CATEGORY_OPTIONS,
  'Type':       TYPE_OPTIONS,
  'Date range': DATE_OPTIONS,
};

// ── Date helpers ──────────────────────────────────────────────────────────────

function parseGroupDate(dateStr: string): Date {
  return new Date(dateStr);
}

function getDateCutoff(range: string): Date {
  const d = new Date();
  if (range === 'Last 7 days')   { d.setDate(d.getDate() - 7);    return d; }
  if (range === 'Last 30 days')  { d.setDate(d.getDate() - 30);   return d; }
  if (range === 'Last 3 months') { d.setMonth(d.getMonth() - 3);  return d; }
  if (range === 'Last 6 months') { d.setMonth(d.getMonth() - 6);  return d; }
  return new Date(0);
}

// ── ActivityPage ──────────────────────────────────────────────────────────────

export default function ActivityPage({ onBack, onNavSelect }: ActivityPageProps) {
  const [activeTab, setActiveTab] = useState<'transactions' | 'statements'>('transactions');
  const [search, setSearch] = useState('');

  // ── Applied filter selections ──────────────────────────────────
  const [categories, setCategories]   = useState<string[]>([]);
  const [types, setTypes]             = useState<string[]>([]);
  const [dateRanges, setDateRanges]   = useState<string[]>([]);

  // ── Statement sheet ────────────────────────────────────────────
  const [selectedStatement, setSelectedStatement] = useState<Statement | null>(null);

  // ── Success toast ───────────────────────────────────────────────
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  useEffect(() => {
    if (!successMsg) return;
    const t = setTimeout(() => setSuccessMsg(null), 3500);
    return () => clearTimeout(t);
  }, [successMsg]);

  // ── Pending selections while a bottom sheet is open ────────────
  const [openFilter, setOpenFilter]           = useState<FilterKey | null>(null);
  const [pendingCategories, setPendingCategories] = useState<string[]>([]);
  const [pendingTypes, setPendingTypes]           = useState<string[]>([]);
  const [pendingDateRanges, setPendingDateRanges] = useState<string[]>([]);

  // ── Derived ────────────────────────────────────────────────────
  const anyFilterActive = categories.length > 0 || types.length > 0 || dateRanges.length > 0;

  // ── Sheet helpers ──────────────────────────────────────────────

  const openSheet = (filter: FilterKey) => {
    setPendingCategories([...categories]);
    setPendingTypes([...types]);
    setPendingDateRanges([...dateRanges]);
    setOpenFilter(filter);
  };

  const closeSheet = () => setOpenFilter(null);

  const handleViewResults = () => {
    setCategories(pendingCategories);
    setTypes(pendingTypes);
    setDateRanges(pendingDateRanges);
    setOpenFilter(null);
  };

  const handleClearSheet = () => {
    if (openFilter === 'Category')   setPendingCategories([]);
    if (openFilter === 'Type')       setPendingTypes([]);
    if (openFilter === 'Date range') setPendingDateRanges([]);
  };

  const handleClearAll = () => {
    setCategories([]);
    setTypes([]);
    setDateRanges([]);
  };

  // ── Pending checkbox toggle ────────────────────────────────────

  const togglePending = (filter: FilterKey, option: string) => {
    const toggle = (prev: string[]) =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option];

    if (filter === 'Category')   setPendingCategories(toggle);
    if (filter === 'Type')       setPendingTypes(toggle);
    if (filter === 'Date range') setPendingDateRanges(toggle);
  };

  const getPendingForFilter = (filter: FilterKey): string[] => {
    if (filter === 'Category')   return pendingCategories;
    if (filter === 'Type')       return pendingTypes;
    if (filter === 'Date range') return pendingDateRanges;
    return [];
  };

  // ── Filtering logic ────────────────────────────────────────────

  const filteredGroups: TransactionGroup[] = GROUPED_TRANSACTIONS
    .map(group => {
      let txns = group.transactions;

      // Search
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        txns = txns.filter(tx =>
          tx.brand.toLowerCase().includes(q) || tx.id.toLowerCase().includes(q)
        );
      }

      // Category
      if (categories.length > 0) {
        txns = txns.filter(tx => categories.includes(tx.category));
      }

      // Type filter
      if (types.length > 0) {
        txns = txns.filter(tx => {
          if (tx.status === 'refund') return types.includes('Refund');
          return types.includes('Purchase');
        });
      }

      return { ...group, transactions: txns };
    })
    .filter(group => {
      if (group.transactions.length === 0) return false;

      // Date range
      if (dateRanges.length > 0) {
        const groupDate = parseGroupDate(group.date);
        const cutoffs   = dateRanges.map(getDateCutoff);
        const earliest  = new Date(Math.min(...cutoffs.map(d => d.getTime())));
        if (groupDate < earliest) return false;
      }

      return true;
    });

  // ── Render ─────────────────────────────────────────────────────

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ffffff' }}>

      {/* ── Blue header ─────────────────────────────────────────── */}
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
          Activity
        </h1>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────── */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#ffffff',
        }}
      >
        {(['transactions', 'statements'] as const).map((tab) => {
          const isActive = activeTab === tab;
          const label = tab === 'transactions' ? 'Transactions' : 'Statements';
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '14px 0',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: isActive ? 700 : 400,
                color: isActive ? '#2e2f32' : '#74767c',
                fontFamily: FONT,
                borderBottom: isActive ? '2px solid #FFC107' : '2px solid transparent',
                marginBottom: -1,
              }}
              aria-selected={isActive}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Scrollable body ─────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>

        {activeTab === 'transactions' && (
          <>
            {/* ── Search bar (pill-shaped) ───────────────────────── */}
            <div style={{ padding: '16px 16px 0' }}>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#74767c',
                    display: 'flex',
                    alignItems: 'center',
                    pointerEvents: 'none',
                    fontSize: 16,
                  }}
                >
                  <LivingDesignFontIcon name="Search" />
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search transactions…"
                  style={{
                    width: '100%',
                    padding: '10px 16px 10px 40px',
                    border: '1.5px solid #d1d5db',
                    borderRadius: 9999,
                    fontSize: 14,
                    fontFamily: FONT,
                    color: '#2e2f32',
                    backgroundColor: '#ffffff',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* ── Filters row ───────────────────────────────────── */}
            <div
              className="activity-filters"
              style={{
                display: 'flex',
                gap: 8,
                padding: '12px 16px',
                overflowX: 'auto',
                flexShrink: 0,
                alignItems: 'center',
              }}
            >
              {(['Category', 'Type', 'Date range'] as FilterKey[]).map((filter) => {
                const count =
                  filter === 'Category'   ? categories.length :
                  filter === 'Type'       ? types.length :
                  dateRanges.length;
                const isActive = count > 0;
                return (
                  <button
                    key={filter}
                    onClick={() => openSheet(filter)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 12px',
                      borderRadius: 9999,
                      border: `1.5px solid ${isActive ? '#FFC107' : '#d1d5db'}`,
                      backgroundColor: isActive ? '#FFF7BF' : '#ffffff',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      fontFamily: FONT,
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 400,
                      color: '#2e2f32',
                    }}
                  >
                    {filter}
                    {count > 0 && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          backgroundColor: '#2e2f32',
                          color: '#FFC107',
                          fontSize: 11,
                          fontWeight: 700,
                          lineHeight: 1,
                          flexShrink: 0,
                        }}
                      >
                        {count}
                      </span>
                    )}
                    <span style={{ color: '#74767c', fontSize: 14, display: 'flex', alignItems: 'center' }}>
                      <LivingDesignFontIcon name="ChevronDown" />
                    </span>
                  </button>
                );
              })}

              {anyFilterActive && (
                <button
                  onClick={handleClearAll}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    fontSize: 13,
                    color: '#2e2f32',
                    fontFamily: FONT,
                    textDecoration: 'underline',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  Clear all
                </button>
              )}
            </div>

            {/* ── Transaction list ──────────────────────────────── */}
            <div>
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
                  No transactions match your filters
                </div>
              ) : (
                filteredGroups.map((group, groupIndex) => (
                  <div key={group.date}>
                    {/* Date header */}
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
                        {group.date}
                      </span>
                    </div>

                    {/* Transactions */}
                    <div style={{ backgroundColor: '#ffffff' }}>
                      {group.transactions.map((tx, txIndex) => {
                        const rewards = (tx.amount * 0.03).toFixed(2);
                        const isFailed = tx.status === 'failed';
                        const isRefund = tx.status === 'refund';
                        return (
                          <React.Fragment key={tx.id}>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                padding: '14px 16px',
                              }}
                            >
                              {/* Brand logo */}
                              <div
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  overflow: 'hidden',
                                  backgroundColor: 'transparent',
                                  opacity: isFailed ? 0.4 : 1,
                                }}
                              >
                                {BRAND_LOGOS[tx.brand] ? (
                                  <img
                                    src={BRAND_LOGOS[tx.brand]}
                                    alt={tx.brand}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }}
                                  />
                                ) : (
                                  <span style={{ fontSize: 12, fontWeight: 700, color: '#74767c' }}>
                                    {tx.brand.slice(0, 1)}
                                  </span>
                                )}
                              </div>

                              {/* Brand name + reference */}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p
                                  style={{
                                    margin: '0 0 2px',
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: isFailed ? '#74767c' : '#2e2f32',
                                    fontFamily: FONT,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}
                                >
                                  {tx.brand}
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: 12,
                                    color: '#74767c',
                                    fontFamily: FONT,
                                  }}
                                >
                                  #{tx.id}
                                </p>
                              </div>

                              {/* Amount + rewards / status */}
                              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <p
                                  style={{
                                    margin: '0 0 2px',
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: isRefund ? '#2e844a' : isFailed ? '#74767c' : '#2e2f32',
                                    fontFamily: FONT,
                                    textDecoration: isFailed ? 'line-through' : 'none',
                                  }}
                                >
                                  {isRefund ? '+' : ''}${tx.amount.toFixed(2)}
                                </p>
                                {isFailed ? (
                                  <span
                                    style={{
                                      display: 'inline-block',
                                      fontSize: 11,
                                      fontWeight: 700,
                                      color: '#d72c0d',
                                      fontFamily: FONT,
                                      backgroundColor: '#ffd5d2',
                                      borderRadius: 4,
                                      padding: '1px 6px',
                                    }}
                                  >
                                    Failed
                                  </span>
                                ) : isRefund ? (
                                  <p
                                    style={{
                                      margin: 0,
                                      fontSize: 12,
                                      color: '#74767c',
                                      fontFamily: FONT,
                                    }}
                                  >
                                    -${rewards} adjusted for refund
                                  </p>
                                ) : (
                                  <p
                                    style={{
                                      margin: 0,
                                      fontSize: 12,
                                      color: '#2e844a',
                                      fontFamily: FONT,
                                    }}
                                  >
                                    +${rewards} rewards
                                  </p>
                                )}
                              </div>
                            </div>

                            {txIndex < group.transactions.length - 1 && (
                              <div style={{ margin: '0 16px' }}>
                                <Divider />
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === 'statements' && (
          <div>
            {STATEMENT_GROUPS.map((group) => (
              <div key={group.year}>

                {/* ── Year header ──────────────────────────────── */}
                <div
                  style={{
                    padding: '14px 16px 8px',
                    backgroundColor: '#f5f6f7',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#74767c',
                      fontFamily: FONT,
                      letterSpacing: '0.4px',
                    }}
                  >
                    {group.year}
                  </span>
                </div>

                {/* ── Statement rows ───────────────────────────── */}
                <div style={{ backgroundColor: '#ffffff' }}>
                  {group.statements.map((stmt, stmtIndex) => (
                    <React.Fragment key={stmt.id}>
                      <button
                        onClick={() => setSelectedStatement(stmt)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '16px',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 15,
                            fontWeight: 500,
                            color: '#2e2f32',
                            fontFamily: FONT,
                          }}
                        >
                          {stmt.label}
                        </span>
                        <span style={{ color: '#74767c', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                          <LivingDesignFontIcon name="ChevronRight" />
                        </span>
                      </button>
                      {stmtIndex < group.statements.length - 1 && (
                        <div style={{ margin: '0 16px' }}>
                          <Divider />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── Filter bottom sheets ─────────────────────────────────── */}
      {(['Category', 'Type', 'Date range'] as FilterKey[]).map((filter) => (
        <BottomSheet
          key={filter}
          isOpen={openFilter === filter}
          onClose={closeSheet}
          title={
            <div
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 700,
                color: '#2e2f32',
                fontFamily: FONT,
                marginRight: '-40px',
              }}
            >
              {filter}
            </div>
          }
          actions={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handleClearSheet}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 14,
                    color: '#2e2f32',
                    fontFamily: FONT,
                    textDecoration: 'underline',
                    padding: '4px 8px',
                  }}
                >
                  Clear
                </button>
              </div>
              <Button
                variant="primary"
                isFullWidth
                size="medium"
                onClick={handleViewResults}
              >
                View results
              </Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '8px 0' }}>
            {FILTER_OPTIONS[filter].map((option) => {
              const pending = getPendingForFilter(filter);
              return (
                <div
                  key={option}
                  style={{
                    padding: '10px 0',
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  <Checkbox
                    label={
                      <span style={{ fontFamily: FONT, fontSize: 15, color: '#2e2f32' }}>
                        {option}
                      </span>
                    }
                    name={`filter-${filter}`}
                    value={option}
                    checked={pending.includes(option)}
                    onChange={() => togglePending(filter, option)}
                  />
                </div>
              );
            })}
          </div>
        </BottomSheet>
      ))}

      {/* ── Statement bottom sheet ──────────────────────────────── */}
      <BottomSheet
        isOpen={selectedStatement !== null}
        onClose={() => setSelectedStatement(null)}
        title={
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 700,
              color: '#2e2f32',
              fontFamily: FONT,
              marginRight: '-40px',
            }}
          >
            {selectedStatement?.label ?? ''}
          </div>
        }
        actions={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <Button
              variant="primary"
              isFullWidth
              size="medium"
              onClick={() => { setSelectedStatement(null); setSuccessMsg('Your statement PDF is downloading.'); }}
            >
              Download PDF
            </Button>
            <Button
              variant="secondary"
              isFullWidth
              size="medium"
              onClick={() => { setSelectedStatement(null); setSuccessMsg('Statement sent to your email on file.'); }}
            >
              Email
            </Button>
          </div>
        }
      >
        <p
          style={{
            margin: '8px 0 16px',
            fontSize: 15,
            color: '#74767c',
            fontFamily: FONT,
            lineHeight: 1.5,
          }}
        >
          How would you like to receive your statement?
        </p>
      </BottomSheet>

      {/* ── Success alert overlay — floats below header ─────────── */}
      {successMsg && (
        <div
          style={{
            position: 'fixed',
            top: 56,
            left: 0,
            right: 0,
            padding: '0 16px',
            zIndex: 9999,
          }}
          role="alert"
          aria-live="polite"
        >
          <Alert variant="success">{successMsg}</Alert>
        </div>
      )}

    </div>
  );
}
