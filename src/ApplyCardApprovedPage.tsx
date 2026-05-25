import * as React from 'react';

import { Container } from './components/ld/Container';
import { Alert } from './components/ld/Alert';
import { Button } from './components/ld/Button';
import { Card, CardContent } from './components/ld/Card';
import { Divider } from './components/ld/Divider';
import { Nudge } from './components/ld/Nudge';
import { Link } from './components/ld/Link';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ApplyCardApprovedPageProps {
  onActivateCard: () => void;
  onContinueShopping: () => void;
  onGoToCreditCard: () => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';
const BASE = import.meta.env.BASE_URL;

const EARN_POINTS = [
  { rate: 'Earn 3%', detail: 'when you shop in stores or online at Walmart.ca²' },
  { rate: 'Earn 1%', detail: 'when you shop outside of Walmart' },
  { rate: 'Delivery pass benefit', detail: 'enjoy up to 6 months free every year' },
];

interface RedeemSection {
  icon: 'Facility' | 'Globe' | 'Bookmark';
  title: string;
  bullets: string[];
}

const REDEEM_SECTIONS: RedeemSection[] = [
  {
    icon: 'Facility',
    title: 'Walmart store checkout',
    bullets: [
      'Swipe your physical card at the terminal.',
      'It will ask if you want to apply Reward Dollars.',
      'Choose your amount in $5 increments.',
    ],
  },
  {
    icon: 'Globe',
    title: 'Walmart.ca',
    bullets: [
      'At checkout, select "Redeem Reward Dollars".',
      'Choose your amount in $5 increments.',
    ],
  },
  {
    icon: 'Bookmark',
    title: 'Want to save up?',
    bullets: [
      'Skip anytime — rewards never expire.',
    ],
  },
];

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

// ── ApplyCardApprovedPage ─────────────────────────────────────────────────────

export default function ApplyCardApprovedPage({ onActivateCard, onContinueShopping, onGoToCreditCard }: ApplyCardApprovedPageProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── Header — matches home page, "Hi Jean" instead of "Sign in" ──────── */}
      <div style={{ width: '100%', flexShrink: 0, backgroundColor: '#0053e2' }}>
        <div
          style={{
            maxWidth: 600,
            margin: '0 auto',
            backgroundColor: '#0053E2',
            padding: '0 16px',
            height: 52,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left — Profile icon + Hi Jean */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#ffffff', fontSize: 22, display: 'flex', alignItems: 'center' }}>
              <LivingDesignFontIcon name="UserCircle" />
            </span>
            <span style={{ color: '#ffffff', fontFamily: FONT, fontSize: 14, fontWeight: 600 }}>
              Hi Jean
            </span>
          </div>

          {/* Center — Walmart spark logo */}
          <img
            src={`${BASE}logos/walmart.png`}
            alt="Walmart"
            style={{ width: 32, height: 32, objectFit: 'contain' }}
          />

          {/* Right — Cart icon */}
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="#ffffff" d="M12 24a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm13 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM5.702 4a1.4 1.4 0 0 1 1.341.998L7.343 6h21.259a1.4 1.4 0 0 1 1.366 1.704l-1.83 8.233a1.4 1.4 0 0 1-1.211 1.088l-16.308 1.813A.583.583 0 0 0 10.684 20H27v2H10.684a2.583 2.583 0 0 1-.286-5.15l15.881-1.765L27.854 8H7.944l2.014 6.713-1.916.574L5.256 6H2V4h3.702Z" />
          </svg>
        </div>
      </div>

      {/* ── Scrollable body ───────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <Container>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 0 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* ── Green checkmark ──────────────────────────────────────────────── */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 36, color: '#16a34a', display: 'flex' }}>
                  <LivingDesignFontIcon name="CheckCircleFill" />
                </span>
              </div>
            </div>

            {/* ── Approval heading + subtext ────────────────────────────────────── */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                You're approved
              </h1>
              <p style={{ margin: 0, fontSize: 15, color: '#74767c', fontFamily: FONT }}>
                Welcome to Walmart Rewards Mastercard
              </p>
            </div>

            {/* ── Nudge: card arriving soon ─────────────────────────────────────── */}
            <Nudge
              title="Card arriving soon"
              leading={
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: '#eff6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: '#0053e2', fontSize: 18, display: 'flex' }}>
                    <LivingDesignFontIcon name="Clock" />
                  </span>
                </div>
              }
            >
              Your physical card will arrive in 5–7 business days. We will notify you when it's ready to activate.
            </Nudge>

            {/* ── Section divider ───────────────────────────────────────────────── */}
            <Divider />

            {/* ── Temporary shopping pass section ──────────────────────────────── */}
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
              Temporary shopping pass
            </h2>

            {/* Success alert */}
            <Alert variant="success">
              Temporary shopping pass added to your wallet
            </Alert>

            {/* Shopping pass card */}
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <img
                  src={`${BASE}logos/walmart.png`}
                  alt="Walmart"
                  style={{ height: 24, objectFit: 'contain' }}
                />
                <span style={{ fontSize: 11, color: '#74767c', fontFamily: FONT }}>
                  For use at Walmart only
                </span>
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
              <p
                style={{
                  margin: 0,
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#2e2f32',
                  fontFamily: FONT,
                }}
              >
                Balance: $500
              </p>
            </div>

            {/* ── How to earn rewards card ──────────────────────────────────────── */}
            <Card>
              <CardContent>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                  How to earn rewards
                </p>
                <div style={{ margin: '12px -16px 16px' }}><Divider /></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {EARN_POINTS.map((pt, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <span style={{ color: '#0053e2', flexShrink: 0, marginTop: 1 }}>
                        <LivingDesignFontIcon name="CheckCircleFill" />
                      </span>
                      <p style={{ margin: 0, fontSize: 14, color: '#2e2f32', fontFamily: FONT, lineHeight: 1.5 }}>
                        <strong>{pt.rate}:</strong> {pt.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ── How to redeem rewards card ────────────────────────────────────── */}
            <Card>
              <CardContent>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                  How to redeem rewards
                </p>
                <div style={{ margin: '12px -16px 16px' }}><Divider /></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {REDEEM_SECTIONS.map((section, sIdx) => (
                    <React.Fragment key={section.title}>
                      <div style={{ paddingTop: sIdx === 0 ? 0 : 16, paddingBottom: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                          <span
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              backgroundColor: '#eff6ff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              color: '#0053e2',
                            }}
                          >
                            <LivingDesignFontIcon name={section.icon} />
                          </span>
                          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                            {section.title}
                          </p>
                        </div>
                        <div style={{ paddingLeft: 42, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {section.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                              <span
                                style={{
                                  width: 5,
                                  height: 5,
                                  borderRadius: '50%',
                                  backgroundColor: '#74767c',
                                  marginTop: 7,
                                  flexShrink: 0,
                                }}
                              />
                              <p style={{ margin: 0, fontSize: 13, color: '#4a4c51', fontFamily: FONT, lineHeight: 1.5 }}>
                                {bullet}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      {sIdx < REDEEM_SECTIONS.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </div>

                <div style={{ margin: '16px -16px 0' }}><Divider /></div>
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                  <span style={{ '--ld-semantic-color-text-link': '#2e2f32' } as React.CSSProperties}>
                    <Link href="#" color="default">Learn more in FAQs</Link>
                  </span>
                </div>
              </CardContent>
            </Card>

          </div>
        </Container>
      </div>

      {/* ── Sticky footer ─────────────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb', padding: '16px 16px 0' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button variant="primary" isFullWidth size="medium" onClick={onContinueShopping}>
            Continue shopping
          </Button>
          <Button variant="secondary" isFullWidth size="medium" onClick={onGoToCreditCard}>
            Go to credit card
          </Button>
        </div>
      </div>

      {/* ── Bottom nav bar image ──────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', width: '100%' }}>
          <img
            src={`${BASE}walmart-canada/navbar.png`}
            alt="Navigation Bar"
            style={{ width: '100%', display: 'block', height: 'auto' }}
          />
        </div>
      </div>

    </div>
  );
}
