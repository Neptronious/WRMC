import * as React from 'react';
import { useState, useEffect } from 'react';

import { Container } from './components/ld/Container';
import { Card } from './components/ld/Card';
import { CardContent } from './components/ld/Card';
import { Alert } from './components/ld/Alert';
import { Divider } from './components/ld/Divider';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

// ── Types ─────────────────────────────────────────────────────────────────────

interface FreshCreditCardHomePageProps {
  onNavSelect: (key: string) => void;
  onGoToHome: () => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

const DUMMY = {
  userName: 'Jean',
  cardLastFour: '4325',
};

// Next bill date: 30 days from today
const NEXT_BILL_DATE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// ── FreshCreditCardHomePage ───────────────────────────────────────────────────

export default function FreshCreditCardHomePage({ onNavSelect, onGoToHome }: FreshCreditCardHomePageProps) {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowAlert(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ffffff' }}>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#FFC107',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 56,
          flexShrink: 0,
        }}
      >
        <h1
          style={{
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

      {/* ── Activation success alert ────────────────────────────────── */}
      {showAlert && (
        <div
          style={{ padding: '12px 16px 0', flexShrink: 0 }}
          role="alert"
          aria-live="polite"
        >
          <Alert variant="success">Your card has been activated successfully!</Alert>
        </div>
      )}

      {/* ── Scrollable body ─────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 0 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* ── User greeting + card info ─────────────────────────── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between' }}>

              {/* Mastercard logo */}
              <div
                style={{
                  width: 56, height: 56, borderRadius: '50%',
                  backgroundColor: 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, overflow: 'hidden', padding: 8,
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
                    margin: '0 0 4px', fontSize: 22, fontWeight: 700,
                    color: '#2e2f32', fontFamily: FONT,
                  }}
                >
                  Hi {DUMMY.userName}
                </h2>
                <p style={{ margin: 0, fontSize: 14, color: '#74767c', fontFamily: FONT }}>
                  Card ending in {DUMMY.cardLastFour}
                </p>
              </div>

              {/* Manage card */}
              <button
                onClick={() => onNavSelect('manage')}
                style={{
                  all: 'unset', display: 'flex', alignItems: 'center', gap: 4,
                  cursor: 'pointer', fontSize: 14, color: '#2e2f32',
                  fontFamily: FONT, flexShrink: 0,
                }}
              >
                <LivingDesignFontIcon name="Gear" />
                <span style={{ textDecoration: 'underline' }}>Manage card</span>
              </button>
            </div>

            {/* ── Credit card summary card (clickable → main home) ──── */}
            <button
              onClick={onGoToHome}
              style={{ all: 'unset', display: 'block', width: '100%', cursor: 'pointer', borderRadius: 8 }}
            >
              <div
                style={{
                  borderRadius: 8,
                  overflow: 'hidden',
                  boxShadow: '0 0.0625rem 0.125rem 0.0625rem rgba(0,0,0,0.149), 0 -0.0625rem 0.125rem 0 rgba(0,0,0,0.102)',
                }}
              >
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
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 4px', fontSize: 13, color: '#2e2f32', fontFamily: FONT }}>
                      Statement balance
                    </p>
                    <h3
                      style={{
                        margin: '0 0 4px', fontSize: 28, fontWeight: 700,
                        color: '#2e2f32', fontFamily: FONT,
                      }}
                    >
                      $0.00
                    </h3>
                    <p style={{ margin: 0, fontSize: 13, color: '#2e2f32', fontFamily: FONT }}>
                      Total balance: <strong>$0.00</strong>
                    </p>
                  </div>
                </div>

                {/* Lower half — white */}
                <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', display: 'flex', gap: 32 }}>
                  <div>
                    <p style={{ margin: '0 0 4px', fontSize: 13, color: '#74767c', fontFamily: FONT }}>
                      Next bill on
                    </p>
                    <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#2e2f32', fontFamily: FONT }}>
                      {NEXT_BILL_DATE}
                    </p>
                  </div>
                  <div style={{ marginLeft: 'auto', width: '50%' }}>
                    <p style={{ margin: '0 0 4px', fontSize: 13, color: '#74767c', fontFamily: FONT }}>
                      Available credit
                    </p>
                    <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#2e2f32', fontFamily: FONT }}>
                      $3,000.00
                    </p>
                  </div>
                </div>
              </div>
            </button>

            {/* ── Rewards dollars card ──────────────────────────────── */}
            <Card>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: '50%',
                      backgroundColor: '#FFF7BF',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: '#2e2f32' }}>
                      <LivingDesignFontIcon name="Star" />
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 2px', fontSize: 15, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                      Rewards dollars
                    </p>
                    <p style={{ margin: 0, fontSize: 13, color: '#74767c', fontFamily: FONT }}>
                      Balance: $0.00
                    </p>
                  </div>
                  <span style={{ color: '#74767c' }}>
                    <LivingDesignFontIcon name="ChevronRight" />
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* ── Recent activity — empty state ─────────────────────── */}
            <Card>
              <CardContent>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                  Recent activity
                </p>
                <div style={{ margin: '12px -16px 16px' }}>
                  <Divider />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '28px 0',
                    gap: 6,
                  }}
                >
                  {/* Empty state icon placeholder */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: '#f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ color: '#9ca3af', fontSize: 20 }}>
                      <LivingDesignFontIcon name="ArrowRight" />
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#2e2f32', fontFamily: FONT }}>
                    No transactions yet
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: '#74767c', fontFamily: FONT, textAlign: 'center' }}>
                    Your recent purchases will appear here
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </Container>
      </div>

    </div>
  );
}
