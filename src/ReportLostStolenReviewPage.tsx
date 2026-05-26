import * as React from 'react';

import { Button } from './components/ld/Button';
import { Card } from './components/ld/Card';
import { CardContent } from './components/ld/Card';
import { Divider } from './components/ld/Divider';
import { IconButton } from './components/ld/IconButton';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';
import { getLatestTransactions } from './data/transactions';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ReportLostStolenReviewPageProps {
  onBack: () => void;
  onRecognize: () => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';
const BASE = import.meta.env.BASE_URL;

const BRAND_LOGOS: Record<string, string> = {
  'Avenue Mart':  `${BASE}logos/avenuemart.png`,
  'Netflix':      `${BASE}logos/netflix.png`,
  'Best Buy':     `${BASE}logos/bestbuy.png`,
  'Amazon':       `${BASE}logos/amazon.png`,
  'Spotify':      `${BASE}logos/spotify.png`,
  'Starbucks':    `${BASE}logos/starbucks.png`,
  'Apple':        `${BASE}logos/apple.png`,
  'Shell Gas':    `${BASE}logos/shell.png`,
  'Uber':         `${BASE}logos/uber.png`,
  'Tim Hortons':  `${BASE}logos/timhortons.png`,
  "McDonald's":   `${BASE}logos/mcdonalds.png`,
  'Home Depot':   `${BASE}logos/homedepot.png`,
  'Chase':        `${BASE}logos/chase.png`,
};

// ── ReportLostStolenReviewPage ────────────────────────────────────────────────

export default function ReportLostStolenReviewPage({ onBack, onRecognize }: ReportLostStolenReviewPageProps) {
  const recentTx = getLatestTransactions(5);

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
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 16px 120px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Intro text */}
          <div>
            <h2
              style={{
                margin: '0 0 8px',
                fontSize: 20,
                fontWeight: 700,
                color: '#2e2f32',
                fontFamily: FONT,
              }}
            >
              Review transactions
            </h2>
            <p style={{ margin: 0, fontSize: 14, color: '#74767c', fontFamily: FONT, lineHeight: 1.6 }}>
              Do you recognize all of your recent transactions? If you notice anything unusual, let us know so we can investigate.
            </p>
          </div>

          {/* Recent transactions card */}
          <Card>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {recentTx.map((tx, idx) => {
                  const logoSrc = BRAND_LOGOS[tx.brand];
                  const isFailed = tx.status === 'failed';
                  const isRefund = tx.status === 'refund';

                  return (
                    <React.Fragment key={tx.id}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '14px 0',
                          opacity: isFailed ? 0.5 : 1,
                        }}
                      >
                        {/* Logo */}
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            backgroundColor: '#f5f6f7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            overflow: 'hidden',
                          }}
                        >
                          {logoSrc ? (
                            <img src={logoSrc} alt={tx.brand} style={{ width: 28, height: 28, objectFit: 'contain' }} />
                          ) : (
                            <span style={{ fontSize: 18, color: '#74767c' }}>
                              <LivingDesignFontIcon name="Tag" />
                            </span>
                          )}
                        </div>

                        {/* Brand + category */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              margin: '0 0 2px',
                              fontSize: 14,
                              fontWeight: 600,
                              color: isFailed ? '#74767c' : '#2e2f32',
                              fontFamily: FONT,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {tx.brand}
                          </p>
                          <p style={{ margin: 0, fontSize: 12, color: '#74767c', fontFamily: FONT }}>
                            {tx.category}
                          </p>
                        </div>

                        {/* Amount */}
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <p
                            style={{
                              margin: 0,
                              fontSize: 14,
                              fontWeight: 700,
                              color: isRefund ? '#2e844a' : isFailed ? '#74767c' : '#2e2f32',
                              fontFamily: FONT,
                              textDecoration: isFailed ? 'line-through' : 'none',
                            }}
                          >
                            {isRefund ? `+$${tx.amount.toFixed(2)}` : `$${tx.amount.toFixed(2)}`}
                          </p>
                          {isFailed && (
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 600,
                                color: '#d72c0d',
                                backgroundColor: '#ffd5d2',
                                borderRadius: 4,
                                padding: '1px 5px',
                                fontFamily: FONT,
                              }}
                            >
                              Failed
                            </span>
                          )}
                        </div>
                      </div>
                      {idx < recentTx.length - 1 && <Divider />}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* View all link */}
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#0071ce',
                    fontFamily: FONT,
                    padding: '4px 0',
                    textDecoration: 'underline',
                  }}
                >
                  View all transactions
                </button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* ── Sticky two-button footer ─────────────────────────────────── */}
      <div
        style={{
          flexShrink: 0,
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e5e7eb',
          padding: '16px 16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div style={{ maxWidth: 560, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Button variant="primary" isFullWidth size="medium" onClick={onRecognize}>
            Yes, I recognize all transactions
          </Button>
          <Button variant="secondary" isFullWidth size="medium">
            No, I don't recognize some transactions
          </Button>
        </div>
      </div>

    </div>
  );
}
