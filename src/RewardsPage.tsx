import * as React from 'react';

import { Card } from './components/ld/Card';
import { CardContent } from './components/ld/Card';
import { Container } from './components/ld/Container';
import { Divider } from './components/ld/Divider';
import { IconButton } from './components/ld/IconButton';
import { Link } from './components/ld/Link';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';
// Note: Link is still used for "Learn more in FAQs"

// ── Types ─────────────────────────────────────────────────────────────────────

interface RewardsPageProps {
  onBack: () => void;
  onNavSelect: (key: string) => void;
  onViewAll: () => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── Dummy data ────────────────────────────────────────────────────────────────

const REWARDS_BALANCE  = 24.50;
const NEXT_CYCLE_EST   = 12.30;

type RewardType = 'earned' | 'redeemed' | 'adjusted';

interface RewardActivity {
  id: string;
  type: RewardType;
  title: string;
  subtitle: string;
  amount: number; // positive = credit, negative = debit
}

const RECENT_REWARDS: RewardActivity[] = [
  {
    id: 'rw-001',
    type: 'earned',
    title: 'March rewards earned',
    subtitle: 'Apr 1, 2026',
    amount: +18.42,
  },
  {
    id: 'rw-002',
    type: 'redeemed',
    title: 'Redeemed at Walmart',
    subtitle: 'Mar 22, 2026',
    amount: -10.00,
  },
  {
    id: 'rw-003',
    type: 'adjusted',
    title: 'Adjusted',
    subtitle: 'Mar 18, 2026 · Shell Gas refund',
    amount: -1.56,
  },
  {
    id: 'rw-004',
    type: 'earned',
    title: 'February rewards earned',
    subtitle: 'Mar 1, 2026',
    amount: +21.87,
  },
  {
    id: 'rw-005',
    type: 'redeemed',
    title: 'Redeemed at Walmart.ca',
    subtitle: 'Feb 15, 2026',
    amount: -5.00,
  },
];

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

interface MonthlyEarning {
  label: string;
  amount: number;
  partial?: boolean;
}

const MONTHLY_EARNINGS: MonthlyEarning[] = [
  { label: 'Nov', amount: 14.20 },
  { label: 'Dec', amount: 22.80 },
  { label: 'Jan', amount: 16.50 },
  { label: 'Feb', amount: 21.87 },
  { label: 'Mar', amount: 18.42 },
  { label: 'Apr', amount: 6.75, partial: true },
];

// ── Reward icon helper ────────────────────────────────────────────────────────

function rewardIcon(type: RewardType) {
  if (type === 'earned')   return <LivingDesignFontIcon name="StarFill" />;
  if (type === 'redeemed') return <LivingDesignFontIcon name="Wallet" />;
  return <LivingDesignFontIcon name="Returns" />;
}

function rewardIconColor(_type: RewardType): string {
  return '#0053e2';
}

function rewardIconBg(_type: RewardType): string {
  return '#eff6ff';
}

// ── RewardsPage ───────────────────────────────────────────────────────────────

export default function RewardsPage({ onBack, onNavSelect, onViewAll }: RewardsPageProps) {
  const maxEarning = Math.max(...MONTHLY_EARNINGS.map(m => m.amount));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ffffff' }}>

      {/* ── Blue header ─────────────────────────────────────────────── */}
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
          size="small"
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
          Rewards
        </h1>
      </div>

      {/* ── Scrollable body ─────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 0 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* ── 1. Rewards summary card ───────────────────────────── */}
            <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 0.0625rem 0.125rem 0.0625rem rgba(0,0,0,0.149), 0 -0.0625rem 0.125rem 0 rgba(0,0,0,0.102)' }}>

              {/* Upper half — light blue */}
              <div
                style={{
                  backgroundColor: '#dbeafe',
                  padding: '24px 24px 24px',
                  textAlign: 'center',
                }}
              >
                <p style={{ margin: '0 0 6px', fontSize: 13, color: '#2e2f32', fontFamily: FONT }}>
                  Rewards balance
                </p>
                <h2
                  style={{
                    margin: '0 0 6px',
                    fontSize: 36,
                    fontWeight: 700,
                    color: '#2e2f32',
                    fontFamily: FONT,
                    lineHeight: 1.1,
                  }}
                >
                  ${REWARDS_BALANCE.toFixed(2)}
                </h2>
                <p style={{ margin: 0, fontSize: 13, color: '#2e2f32', fontFamily: FONT }}>
                  ready to use at Walmart
                </p>
              </div>

              {/* Lower half — white */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '24px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <p style={{ margin: 0, fontSize: 14, color: '#74767c', fontFamily: FONT }}>
                  Estimated next billing cycle
                </p>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                  +${NEXT_CYCLE_EST.toFixed(2)}
                </p>
              </div>
            </div>

            {/* ── 2. Recent rewards activity card ──────────────────── */}
            <Card>
              <CardContent>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                  Recent rewards activity
                </p>
                <div style={{ margin: '12px -16px 16px' }}><Divider /></div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {RECENT_REWARDS.map((rw, index) => (
                    <React.Fragment key={rw.id}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          paddingTop: index === 0 ? 0 : 12,
                          paddingBottom: 12,
                        }}
                      >
                        {/* Title + subtitle */}
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
                            {rw.title}
                          </p>
                          <p style={{ margin: 0, fontSize: 12, color: '#74767c', fontFamily: FONT }}>
                            {rw.subtitle}
                          </p>
                        </div>

                        {/* Amount */}
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                            fontWeight: 700,
                            color: rw.amount > 0 ? '#2e844a' : '#2e2f32',
                            fontFamily: FONT,
                            flexShrink: 0,
                          }}
                        >
                          {rw.amount > 0 ? '+' : ''}${Math.abs(rw.amount).toFixed(2)}
                        </p>
                      </div>

                      {index < RECENT_REWARDS.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </div>

                {/* View all link */}
                <div style={{ margin: '4px -16px 0' }}><Divider /></div>
                <div style={{ marginTop: 12, textAlign: 'center' }}>
                  <button
                    onClick={onViewAll}
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
                    View all
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* ── 3. How to earn rewards card ───────────────────────── */}
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

            {/* ── 4. How to redeem rewards card ────────────────────── */}
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
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
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
                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
                  <span style={{ '--ld-semantic-color-text-link': '#2e2f32' } as React.CSSProperties}>
                    <Link href="#" color="default">
                      Learn more in FAQs
                    </Link>
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* ── 5. Earn in last 6 months card ────────────────────── */}
            <Card>
              <CardContent>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                  Earned in the last 6 months
                </p>
                <div style={{ margin: '12px -16px 20px' }}><Divider /></div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 8,
                    height: 120,
                  }}
                >
                  {MONTHLY_EARNINGS.map((m) => {
                    const barHeight = Math.max(8, Math.round((m.amount / maxEarning) * 80));
                    return (
                      <div
                        key={m.label}
                        style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 6,
                          height: '100%',
                          justifyContent: 'flex-end',
                        }}
                      >
                        {/* Amount label */}
                        <p
                          style={{
                            margin: 0,
                            fontSize: 10,
                            color: m.partial ? '#74767c' : '#0053e2',
                            fontFamily: FONT,
                            fontWeight: 600,
                          }}
                        >
                          ${m.amount.toFixed(0)}
                        </p>

                        {/* Bar */}
                        <div
                          style={{
                            width: '100%',
                            height: barHeight,
                            borderRadius: '4px 4px 0 0',
                            backgroundColor: m.partial ? '#bfdbfe' : '#0053e2',
                          }}
                        />

                        {/* Month label */}
                        <p
                          style={{
                            margin: 0,
                            fontSize: 11,
                            color: '#74767c',
                            fontFamily: FONT,
                          }}
                        >
                          {m.label}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <p style={{ margin: '12px 0 0', fontSize: 11, color: '#9ca3af', fontFamily: FONT, textAlign: 'center' }}>
                  Apr is a partial month
                </p>
              </CardContent>
            </Card>

          </div>
        </Container>
      </div>

    </div>
  );
}
