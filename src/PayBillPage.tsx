import * as React from 'react';
import { useState } from 'react';

import { Container } from './components/ld/Container';
import { Card } from './components/ld/Card';
import { CardContent } from './components/ld/Card';
import { Button } from './components/ld/Button';
import { IconButton } from './components/ld/IconButton';
import { Radio } from './components/ld/Radio';
import { TextField } from './components/ld/TextField';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';
import { Divider } from './components/ld/Divider';

// ── Types ─────────────────────────────────────────────────────────────────────

interface PayBillPageProps {
  onBack: () => void;
  onContinue: (amount: string, date: string) => void;
}

// ── Dummy data ────────────────────────────────────────────────────────────────

const TOTAL_BALANCE  = 1284.75;
const STATEMENT_BAL  = 542.30;
const MINIMUM_BAL    = parseFloat((TOTAL_BALANCE * 0.10).toFixed(2)); // 128.48

const fmt = (n: number) => `$${n.toFixed(2)}`;

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';
const BASE = import.meta.env.BASE_URL;

type AmountOption = 'minimum' | 'statement' | 'total' | 'other';

// ── Helpers ───────────────────────────────────────────────────────────────────

function toInputValue(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function fromInputValue(s: string): Date {
  // Parse yyyy-MM-dd without timezone shift
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatDisplayDate(d: Date): string {
  return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
}

// ── PayBillPage ───────────────────────────────────────────────────────────────

export default function PayBillPage({ onBack, onContinue }: PayBillPageProps) {
  // ── Amount to pay state ──────────────────────────────────────
  const [selectedAmount, setSelectedAmount] = useState<AmountOption>('statement');
  const [otherAmount, setOtherAmount] = useState('');

  // ── Payment date state ───────────────────────────────────────
  const [paymentDate, setPaymentDate] = useState<Date>(new Date());

  // ── Handlers ────────────────────────────────────────────────
  const handleOtherAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    setOtherAmount(raw);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    setPaymentDate(fromInputValue(e.target.value));
  };

  // ── Render ──────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ffffff' }}>

      {/* ── Blue header ─────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#0053e2',
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
          color="white"
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
            color: '#ffffff',
            fontFamily: FONT,
            whiteSpace: 'nowrap',
          }}
        >
          Pay bill
        </h1>
      </div>

      {/* ── Scrollable body ─────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 0 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* ── Card 1: Amount to pay ────────────────────────── */}
            <Card>
              <CardContent>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                  Amount to pay
                </p>
                <div style={{ margin: '12px -16px 16px' }}><Divider /></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                  <Radio
                    name="amount"
                    value="minimum"
                    label={
                      <span style={{ fontFamily: FONT, fontSize: 14, color: '#2e2f32' }}>
                        Minimum balance:{' '}
                        <span style={{ fontWeight: 700 }}>{fmt(MINIMUM_BAL)}</span>
                      </span>
                    }
                    checked={selectedAmount === 'minimum'}
                    onChange={() => setSelectedAmount('minimum')}
                  />

                  <Radio
                    name="amount"
                    value="statement"
                    label={
                      <span style={{ fontFamily: FONT, fontSize: 14, color: '#2e2f32' }}>
                        Statement balance:{' '}
                        <span style={{ fontWeight: 700 }}>{fmt(STATEMENT_BAL)}</span>
                      </span>
                    }
                    checked={selectedAmount === 'statement'}
                    onChange={() => setSelectedAmount('statement')}
                  />

                  <Radio
                    name="amount"
                    value="total"
                    label={
                      <span style={{ fontFamily: FONT, fontSize: 14, color: '#2e2f32' }}>
                        Total balance:{' '}
                        <span style={{ fontWeight: 700 }}>{fmt(TOTAL_BALANCE)}</span>
                      </span>
                    }
                    checked={selectedAmount === 'total'}
                    onChange={() => setSelectedAmount('total')}
                  />

                  <Radio
                    name="amount"
                    value="other"
                    label={
                      <span style={{ fontFamily: FONT, fontSize: 14, color: '#2e2f32' }}>
                        Other amount
                      </span>
                    }
                    checked={selectedAmount === 'other'}
                    onChange={() => setSelectedAmount('other')}
                  />

                  {selectedAmount === 'other' && (
                    <div style={{ marginLeft: 28 }}>
                      <TextField
                        label="Enter amount"
                        value={otherAmount}
                        onChange={handleOtherAmountChange}
                        textFieldProps={{
                          inputMode: 'decimal',
                          placeholder: '0.00',
                          autoFocus: true,
                        }}
                        leadingIcon={
                          <span style={{ color: '#74767c', display: 'flex', alignItems: 'center' }}>
                            <LivingDesignFontIcon name="Dollar" />
                          </span>
                        }
                      />
                    </div>
                  )}

                </div>
              </CardContent>
            </Card>

            {/* ── Card 2: Payment date ─────────────────────────── */}
            <Card>
              <CardContent>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                  Payment date
                </p>
                <div style={{ margin: '12px -16px 16px' }}><Divider /></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label
                    htmlFor="payment-date"
                    style={{ fontSize: 13, color: '#74767c', fontFamily: FONT }}
                  >
                    Select date
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input
                      id="payment-date"
                      type="date"
                      value={toInputValue(paymentDate)}
                      min={toInputValue(new Date())}
                      onChange={handleDateChange}
                      style={{
                        flex: 1,
                        border: '1px solid #d1d5db',
                        borderRadius: 6,
                        padding: '10px 12px',
                        fontSize: 15,
                        color: '#2e2f32',
                        fontFamily: FONT,
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: '#74767c', fontFamily: FONT }}>
                    Selected: <strong>{formatDisplayDate(paymentDate)}</strong>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* ── Card 3: Payment method ───────────────────────── */}
            <Card>
              <CardContent>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                  Payment method
                </p>
                <div style={{ margin: '12px -16px 16px' }}><Divider /></div>

                {/* Default payment method row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 0',
                  }}
                >
                  {/* Chase Bank logo */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={`${BASE}logos/chase.png`}
                      alt="Chase Bank"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  {/* Account info */}
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 2px', fontSize: 15, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                      Chase ••••4521
                    </p>
                    <p style={{ margin: 0, fontSize: 13, color: '#74767c', fontFamily: FONT }}>
                      Checking account
                    </p>
                  </div>
                </div>

                {/* Add payment method row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 8,
                  }}
                >
                  {/* Plus icon + link text */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
                    <span style={{ color: '#2e2f32', display: 'flex', alignItems: 'center' }}>
                      <LivingDesignFontIcon name="Plus" />
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        color: '#2e2f32',
                        fontFamily: FONT,
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      Add payment method
                    </span>
                  </div>

                  {/* Change button — flush right */}
                  <Button variant="secondary" size="small" onClick={() => {}}>
                    Change
                  </Button>
                </div>

              </CardContent>
            </Card>

          </div>
        </Container>
      </div>

      {/* ── Sticky footer: Continue button ───────────────────────── */}
      <div
        style={{
          flexShrink: 0,
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e5e7eb',
          padding: '16px 16px 24px',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <Button
            variant="primary"
            isFullWidth
            size="medium"
            onClick={() => {
              const resolvedAmount =
                selectedAmount === 'minimum' ? fmt(MINIMUM_BAL) :
                selectedAmount === 'statement' ? fmt(STATEMENT_BAL) :
                selectedAmount === 'total' ? fmt(TOTAL_BALANCE) :
                otherAmount ? `$${parseFloat(otherAmount).toFixed(2)}` : '$0.00';
              onContinue(resolvedAmount, formatDisplayDate(paymentDate));
            }}
          >
            Continue
          </Button>
        </div>
      </div>

    </div>
  );
}
