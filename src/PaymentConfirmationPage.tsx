import * as React from 'react';

import { Container } from './components/ld/Container';
import { Card } from './components/ld/Card';
import { CardContent } from './components/ld/Card';
import { Button } from './components/ld/Button';
import { IconButton } from './components/ld/IconButton';
import { Divider } from './components/ld/Divider';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

// ── Types ─────────────────────────────────────────────────────────────────────

interface PaymentConfirmationPageProps {
  onBack: () => void;
  onNavSelect: (key: string) => void;
}

// ── Dummy data ────────────────────────────────────────────────────────────────

const SUMMARY = [
  { label: 'Amount',             value: '$542.30'       },
  { label: 'Date',               value: 'Apr 21, 2026'  },
  { label: 'Payment method',     value: 'Chase ••••4521' },
  { label: 'Confirmation number',value: 'WMT-PAY-284739' },
];

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── PaymentConfirmationPage ───────────────────────────────────────────────────

export default function PaymentConfirmationPage({ onBack, onNavSelect }: PaymentConfirmationPageProps) {
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
          a11yLabel="Go to credit card home"
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
          Credit card
        </h1>
      </div>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div
            style={{
              maxWidth: 600,
              margin: '0 auto',
              padding: '48px 0 40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >

            {/* ── Big green checkmark ──────────────────────────── */}
            <div style={{ color: '#2e844a', fontSize: 72, lineHeight: 1 }}>
              <LivingDesignFontIcon name="CheckCircleFill" />
            </div>

            {/* ── Heading + sub-text ───────────────────────────── */}
            <div style={{ textAlign: 'center' }}>
              <h2
                style={{
                  margin: '0 0 8px',
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#2e2f32',
                  fontFamily: FONT,
                }}
              >
                Payment completed
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  color: '#74767c',
                  fontFamily: FONT,
                }}
              >
                Your balance will be updated shortly
              </p>
            </div>

            {/* ── Payment summary card ─────────────────────────── */}
            <div style={{ width: '100%', marginTop: 8 }}>
              <Card>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {SUMMARY.map((item, index) => (
                      <React.Fragment key={item.label}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '14px 0',
                          }}
                        >
                          <span
                            style={{
                              fontSize: 14,
                              color: '#74767c',
                              fontFamily: FONT,
                            }}
                          >
                            {item.label}
                          </span>
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: '#2e2f32',
                              fontFamily: FONT,
                              textAlign: 'right',
                            }}
                          >
                            {item.value}
                          </span>
                        </div>
                        {index < SUMMARY.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sub-text below card */}
              <p
                style={{
                  margin: '12px 0 0',
                  fontSize: 13,
                  color: '#74767c',
                  lineHeight: 1.6,
                  fontFamily: FONT,
                }}
              >
                Your payment will be processed and appear in the Activity page within 48–72 hours,
                reflecting the original submission date.
              </p>
            </div>

            {/* Return button */}
            <div style={{ width: '100%', marginTop: 8 }}>
              <Button variant="primary" isFullWidth size="medium" onClick={onBack}>
                Return to credit card home
              </Button>
            </div>

          </div>
        </Container>
      </div>

    </div>
  );
}
