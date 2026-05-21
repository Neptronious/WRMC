import * as React from 'react';

import { Container } from './components/ld/Container';
import { Button } from './components/ld/Button';
import { Card, CardContent } from './components/ld/Card';
import { Divider } from './components/ld/Divider';
import { Nudge } from './components/ld/Nudge';
import { Link } from './components/ld/Link';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ApplyCardApprovedPageProps {
  onActivateCard: () => void;
  onViewShoppingPass: () => void;
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

// ── ApplyCardApprovedPage ─────────────────────────────────────────────────────

export default function ApplyCardApprovedPage({ onActivateCard, onViewShoppingPass }: ApplyCardApprovedPageProps) {
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
        {/* Walmart logo — centered via absolute positioning */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src={`${BASE}logos/walmart.png`}
            alt="Walmart"
            style={{ height: 28, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </div>

      {/* ── Scrollable body ───────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
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
            <div style={{ margin: '0' }}>
              <Divider />
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
                        {/* Section heading with icon */}
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

                        {/* Bullet points */}
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

                {/* CTA */}
                <div style={{ margin: '16px -16px 0' }}><Divider /></div>
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                  <span style={{ '--ld-semantic-color-text-link': '#2e2f32' } as React.CSSProperties}>
                    <Link href="#" color="default">
                      Learn more in FAQs
                    </Link>
                  </span>
                </div>
              </CardContent>
            </Card>

          </div>
        </Container>
      </div>

      {/* ── Sticky footer ─────────────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb', padding: '16px 16px 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button variant="primary" isFullWidth size="medium">
            Start shopping
          </Button>
          <Button variant="secondary" isFullWidth size="medium" onClick={onViewShoppingPass}>
            View Temporary shopping pass
          </Button>
        </div>
      </div>

    </div>
  );
}
