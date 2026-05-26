import * as React from 'react';
import { useState, useEffect } from 'react';

import { Container } from './components/ld/Container';
import { Card } from './components/ld/Card';
import { CardContent } from './components/ld/Card';
import { Alert } from './components/ld/Alert';
import { Button } from './components/ld/Button';
import { LinkButton } from './components/ld/LinkButton';
import { IconButton } from './components/ld/IconButton';
import { Divider } from './components/ld/Divider';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';
import { getLatestTransactions } from './data/transactions';

// ── Types ─────────────────────────────────────────────────────────────────────

interface CreditCardHomePageProps {
  onBack: () => void;
  onContinue: () => void;
  onPayNow: () => void;
  onNavSelect: (key: string) => void;
  paymentMade?: boolean;
  showActivationSuccess?: boolean;
}

// ── Dummy data ────────────────────────────────────────────────────────────────

const STATEMENT_PAID  = 542.30;
const TOTAL_BALANCE   = 1284.75;
const AVAILABLE_CREDIT = 2715.25;

const DUMMY = {
  userName: 'Jean',
  cardLastFour: '4325',
  rewardsBalance: '$24.50',
};

// Dynamic due date: 5 days from today
const DUE_DATE = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
  .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// Values before payment
const PRE_PAYMENT = {
  statementBalance: '$542.30',
  totalBalance: '$1,284.75',
  dueDate: DUE_DATE,
  availableCredit: '$2,715.25',
};

// Values after payment
const POST_PAYMENT = {
  statementBalance: 'Paid',
  totalBalance: `$${(TOTAL_BALANCE - STATEMENT_PAID).toFixed(2)}`,
  dueDate: DUE_DATE,
  availableCredit: `$${(AVAILABLE_CREDIT + STATEMENT_PAID).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
};

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

// Get latest 5 transactions for display
const RECENT_TRANSACTIONS = getLatestTransactions(5);

// ── Shared style helpers ───────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── CreditCardHomePage ────────────────────────────────────────────────────────

export default function CreditCardHomePage({ onBack, onContinue: _onContinue, onPayNow, onNavSelect, paymentMade = false, showActivationSuccess = false }: CreditCardHomePageProps) {
  const summary = paymentMade ? POST_PAYMENT : PRE_PAYMENT;

  const [activationBanner, setActivationBanner] = useState(showActivationSuccess);
  useEffect(() => {
    if (!showActivationSuccess) return;
    setActivationBanner(true);
    const t = setTimeout(() => setActivationBanner(false), 5000);
    return () => clearTimeout(t);
  }, [showActivationSuccess]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ffffff' }}>

      {/* ── Header ─────────────────────────────────────────────── */}
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
          Credit card
        </h1>
      </div>

      {/* ── Activation success banner ───────────────────────────── */}
      {activationBanner && (
        <div style={{ flexShrink: 0, padding: '12px 16px 0' }}>
          <Alert variant="success">
            Your card has been activated successfully — start spending!
          </Alert>
        </div>
      )}

      {/* ── Scrollable body ─────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 0 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* ── User greeting + card info ────────────────────── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between' }}>

              {/* Rewards Mastercard icon */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  overflow: 'hidden',
                  padding: 8,
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="Rewards Mastercard"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              {/* Name + card number */}
              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    margin: '0 0 4px',
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#2e2f32',
                    fontFamily: FONT,
                  }}
                >
                  Hi {DUMMY.userName}
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    color: '#74767c',
                    fontFamily: FONT,
                  }}
                >
                  Card ending in {DUMMY.cardLastFour}
                </p>
              </div>

              {/* Trailing: Manage card button — icon separate so it is not underlined */}
              <button
                onClick={() => onNavSelect('manage')}
                style={{
                  all: 'unset',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  cursor: 'pointer',
                  fontSize: 14,
                  color: '#2e2f32',
                  fontFamily: FONT,
                  flexShrink: 0,
                }}
              >
                <LivingDesignFontIcon name="Gear" />
                <span style={{ textDecoration: 'underline' }}>Manage card</span>
              </button>

            </div>

            {/* ── Credit card summary card ─────────────────────── */}
            <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 0.0625rem 0.125rem 0.0625rem rgba(0,0,0,0.149), 0 -0.0625rem 0.125rem 0 rgba(0,0,0,0.102)' }}>

              {/* Upper half — light yellow */}
              <div
                style={{
                  backgroundColor: '#FFF7BF',
                  padding: '20px 20px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                {/* Left: text content */}
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 4px', fontSize: 13, color: '#2e2f32', fontFamily: FONT }}>
                    Statement balance
                  </p>
                  <h3
                    style={{
                      margin: '0 0 4px',
                      fontSize: 28,
                      fontWeight: 700,
                      color: paymentMade ? '#2e844a' : '#2e2f32',
                      fontFamily: FONT,
                    }}
                  >
                    {summary.statementBalance}
                  </h3>
                  <p style={{ margin: 0, fontSize: 13, color: '#2e2f32', fontFamily: FONT }}>
                    Total balance: <strong>{summary.totalBalance}</strong>
                  </p>
                </div>

                {/* Right: Pay now button */}
                {!paymentMade && (
                  <div style={{ flexShrink: 0 }}>
                    <Button variant="primary" size="medium" onClick={onPayNow}>
                      Pay now
                    </Button>
                  </div>
                )}
              </div>

              {/* Lower half — white */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '16px 20px',
                  display: 'flex',
                  gap: 32,
                }}
              >
                {/* Due date */}
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: 13, color: '#74767c', fontFamily: FONT }}>
                    {paymentMade ? 'Next bill on' : 'Due date'}
                  </p>
                  <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#2e2f32', fontFamily: FONT }}>
                    {summary.dueDate}
                  </p>
                </div>

                {/* Available credit — starts at 50% of the card */}
                <div style={{ marginLeft: 'auto', width: '50%' }}>
                  <p style={{ margin: '0 0 4px', fontSize: 13, color: '#74767c', fontFamily: FONT }}>
                    Available credit
                  </p>
                  <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#2e2f32', fontFamily: FONT }}>
                    {summary.availableCredit}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Rewards dollars card ─────────────────────────── */}
            <button
              onClick={() => onNavSelect('rewards')}
              style={{ all: 'unset', display: 'block', width: '100%', cursor: 'pointer', borderRadius: 8 }}
            >
            <Card>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

                  {/* Leading placeholder icon */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: '#FFF7BF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: '#2e2f32' }}>
                      <LivingDesignFontIcon name="Star" />
                    </span>
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 2px', fontSize: 15, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                      Rewards dollars
                    </p>
                    <p style={{ margin: 0, fontSize: 13, color: '#74767c', fontFamily: FONT }}>
                      Balance: {DUMMY.rewardsBalance}
                    </p>
                  </div>

                  {/* Trailing chevron */}
                  <span style={{ color: '#74767c' }}>
                    <LivingDesignFontIcon name="ChevronRight" />
                  </span>
                </div>
              </CardContent>
            </Card>
            </button>

            {/* ── Recent activity card ─────────────────────────── */}
            <Card>
              <CardContent>
                <p
                  style={{
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#2e2f32',
                    fontFamily: FONT,
                  }}
                >
                  Recent activity
                </p>
                <div style={{ margin: '12px -16px 16px' }}>
                  <Divider />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {RECENT_TRANSACTIONS.map((tx, index) => {
                    const rewards = (tx.amount * 0.03).toFixed(2);
                    const isFailed = tx.status === 'failed';
                    const isRefund = tx.status === 'refund';
                    return (
                      <React.Fragment key={tx.id}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: index === 0 ? 0 : 12, paddingBottom: 12 }}>

                          {/* Brand logo */}
                          <div
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              backgroundColor: 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              overflow: 'hidden',
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

                          {/* Brand + category + ref */}
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

                        {index < RECENT_TRANSACTIONS.length - 1 && (
                          <div style={{ margin: '0' }}>
                            <Divider />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                <div style={{ margin: '12px -16px -4px', borderTop: '1px solid #e5e7eb', paddingTop: 12, textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => onNavSelect('activity')}
                    style={{
                      all: 'unset',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      cursor: 'pointer',
                      fontSize: 14,
                      color: '#2e2f32',
                      fontFamily: FONT,
                    }}
                  >
                    <span style={{ textDecoration: 'underline' }}>View transactions &amp; statements</span>
                    <LivingDesignFontIcon name="ArrowRight" />
                  </button>
                </div>
              </CardContent>
            </Card>

          </div>
        </Container>
      </div>

    </div>
  );
}
