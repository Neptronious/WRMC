import * as React from 'react';

import { Container } from './components/ld/Container';
import { Card, CardContent } from './components/ld/Card';
import { Divider } from './components/ld/Divider';
import { Alert } from './components/ld/Alert';
import { Button } from './components/ld/Button';
import { IconButton } from './components/ld/IconButton';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

// ── Types ─────────────────────────────────────────────────────────────────────

interface TemporaryShoppingPassPageProps {
  onBack: () => void;
  onActivateCard: () => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';
const BASE = import.meta.env.BASE_URL;

// ── Dummy barcode ─────────────────────────────────────────────────────────────

function DummyBarcode() {
  const widths = [2,1,3,1,2,3,1,2,1,3,2,1,1,2,3,1,2,1,3,2,1,2,3,1,1,3,2,1,3,1,2,1,2,3,1,2,1,3,2,1,2,1];
  const segments: { x: number; w: number }[] = [];
  let cx = 0;
  for (let i = 0; i < widths.length; i++) {
    const w = widths[i] * 2;
    if (i % 2 === 0) segments.push({ x: cx, w });
    cx += w;
  }
  return (
    <svg width="100%" height={56} viewBox={`0 0 ${cx} 56`} preserveAspectRatio="none">
      {segments.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={56} fill="#1a1a2e" />
      ))}
    </svg>
  );
}

// ── TemporaryShoppingPassPage ─────────────────────────────────────────────────

export default function TemporaryShoppingPassPage({ onBack, onActivateCard }: TemporaryShoppingPassPageProps) {
  const validThrough = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── Blue header ───────────────────────────────────────────────────────── */}
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
          Credit card
        </h1>
      </div>

      {/* ── Scrollable body ───────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 0 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* ── Received card? ────────────────────────────────────────────────── */}
            <Card>
              <CardContent>
                <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                  Received card?
                </p>
                <div style={{ margin: '0 -16px 12px' }}>
                  <Divider />
                </div>
                <p style={{ margin: '0 0 16px', fontSize: 14, lineHeight: 1.6, color: '#4a4b4d', fontFamily: FONT }}>
                  Activate it and start enjoying the benefits
                </p>
                <Button variant="primary" isFullWidth size="medium" onClick={onActivateCard}>
                  Activate card
                </Button>
              </CardContent>
            </Card>

            {/* ── Section divider ───────────────────────────────────────────────── */}
            <div style={{ margin: '0' }}>
              <Divider />
            </div>

            {/* ── Temporary shopping pass heading ──────────────────────────────── */}
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
              Temporary shopping pass
            </h2>

            {/* ── Success alert ─────────────────────────────────────────────────── */}
            <Alert variant="success">
              Temporary shopping pass has been added to your Walmart wallet
            </Alert>

            {/* ── Shopping pass card ────────────────────────────────────────────── */}
            <div
              style={{
                backgroundColor: '#f5f6f7',
                borderRadius: 16,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <img
                  src={`${BASE}logos/walmart.png`}
                  alt="Walmart"
                  style={{ height: 24, objectFit: 'contain', display: 'block' }}
                />
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{ fontSize: 10, color: '#74767c', fontFamily: FONT, display: 'block' }}>
                    Valid through
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#2e2f32', fontFamily: FONT, display: 'block' }}>
                    {validThrough}
                  </span>
                </div>
              </div>
              <div style={{ padding: '4px 0' }}>
                <DummyBarcode />
              </div>
              <p
                style={{
                  margin: 0,
                  textAlign: 'center',
                  fontSize: 13,
                  letterSpacing: '0.08em',
                  color: '#2e2f32',
                  fontFamily: 'monospace',
                }}
              >
                0 43257 89123 4
              </p>
              <p style={{ margin: 0, textAlign: 'center', fontSize: 11, color: '#74767c', fontFamily: FONT }}>
                For use at Walmart only
              </p>
            </div>

            {/* ── Used balance & available credit ───────────────────────────────── */}
            <div
              style={{
                borderRadius: 8,
                overflow: 'hidden',
                boxShadow: '0 0.0625rem 0.125rem 0.0625rem rgba(0,0,0,0.149), 0 -0.0625rem 0.125rem 0 rgba(0,0,0,0.102)',
                backgroundColor: '#ffffff',
                padding: '16px 20px',
                display: 'flex',
                gap: 32,
              }}
            >
              <div>
                <p style={{ margin: '0 0 4px', fontSize: 13, color: '#74767c', fontFamily: FONT }}>
                  Used balance
                </p>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#2e2f32', fontFamily: FONT }}>
                  $0.00
                </p>
              </div>
              <div style={{ marginLeft: 'auto', width: '50%' }}>
                <p style={{ margin: '0 0 4px', fontSize: 13, color: '#74767c', fontFamily: FONT }}>
                  Available credit
                </p>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#2e2f32', fontFamily: FONT }}>
                  $500.00
                </p>
              </div>
            </div>

            {/* ── Rewards dollars card ─────────────────────────────────────────── */}
            <Card>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: '#f0f4ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: '#0053e2' }}>
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

          </div>
        </Container>
      </div>


    </div>
  );
}
