import * as React from 'react';

import { Button } from './components/ld/Button';
import { Card } from './components/ld/Card';
import { CardContent } from './components/ld/Card';
import { Container } from './components/ld/Container';
import { Divider } from './components/ld/Divider';
import { IconButton } from './components/ld/IconButton';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ReportLostStolenConfirmationPageProps {
  onBack: () => void;
  onGoHome: () => void;
  reason?: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── ReportLostStolenConfirmationPage ──────────────────────────────────────────

export default function ReportLostStolenConfirmationPage({ onBack, onGoHome, reason }: ReportLostStolenConfirmationPageProps) {
  const SUMMARY = [
    { label: 'Status',     value: 'Card cancelled'             },
    { label: 'Reason',     value: reason ?? 'I have lost my card' },
    { label: 'Reference',  value: 'RPT-LST-847392'             },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ffffff' }}>

      {/* ── Yellow header ───────────────────────────────────────────── */}
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
          Report lost or stolen card
        </h1>
      </div>

      {/* ── Scrollable body ─────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div
            style={{
              maxWidth: 600,
              margin: '0 auto',
              padding: '48px 0 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >

            {/* ── Big green checkmark ──────────────────────────────── */}
            <div style={{ color: '#2e844a', fontSize: 72, lineHeight: 1 }}>
              <LivingDesignFontIcon name="CheckCircleFill" />
            </div>

            {/* ── Heading + sub-text ───────────────────────────────── */}
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
                Report submitted
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  color: '#74767c',
                  fontFamily: FONT,
                  lineHeight: 1.6,
                }}
              >
                Your card has been cancelled and a replacement is on its way
              </p>
            </div>

            {/* ── Summary card ─────────────────────────────────────── */}
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
                              maxWidth: '55%',
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

              {/* Delivery notice */}
              <div
                style={{
                  marginTop: 16,
                  backgroundColor: '#FFF7BF',
                  borderRadius: 12,
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                }}
              >
                <span style={{ color: '#FFC107', fontSize: 20, flexShrink: 0, marginTop: 1 }}>
                  <LivingDesignFontIcon name="Truck" />
                </span>
                <p style={{ margin: 0, fontSize: 14, color: '#2e2f32', fontFamily: FONT, lineHeight: 1.6 }}>
                  Your replacement card will be delivered to your address on file within{' '}
                  <strong>5–7 business days</strong>. You'll receive an email when it ships.
                </p>
              </div>

              {/* Sub-text below */}
              <p
                style={{
                  margin: '12px 0 0',
                  fontSize: 14,
                  color: '#74767c',
                  lineHeight: 1.6,
                  fontFamily: FONT,
                }}
              >
                If you believe your card was used fraudulently, please call us at{' '}
                <strong style={{ color: '#2e2f32' }}>1-855-925-6278</strong> and we'll open a dispute on your behalf.
              </p>
            </div>

          </div>
        </Container>
      </div>

      {/* ── Fixed footer ─────────────────────────────────────────────── */}
      <div
        style={{
          flexShrink: 0,
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e5e7eb',
          padding: '16px 16px 24px',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <Button variant="primary" isFullWidth size="medium" onClick={onGoHome}>
            Return to credit card home
          </Button>
        </div>
      </div>

    </div>
  );
}
