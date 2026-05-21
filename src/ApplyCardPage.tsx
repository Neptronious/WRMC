import * as React from 'react';
import { useState } from 'react';

import { Container } from './components/ld/Container';
import { Button } from './components/ld/Button';
import { LinkButton } from './components/ld/LinkButton';
import { IconButton } from './components/ld/IconButton';
import { Checkbox } from './components/ld/Checkbox';
import { Divider } from './components/ld/Divider';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ApplyCardPageProps {
  onDone: () => void;
  onContinue: () => void;
}

// ── Font constant ─────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── ApplyCardPage ─────────────────────────────────────────────────────────────

export default function ApplyCardPage({ onDone, onContinue }: ApplyCardPageProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── Top bar: Done (left) + Refresh icon (right), no center text ──────── */}
      <div
        style={{
          backgroundColor: '#0053e2',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <LinkButton
          type="button"
          size="medium"
          color="white"
          onClick={onDone}
        >
          Done
        </LinkButton>

        <IconButton
          a11yLabel="Refresh application"
          variant="round"
          size="medium"
          color="white"
        >
          <LivingDesignFontIcon name="Refresh" />
        </IconButton>
      </div>

      {/* ── Blue header bar: centred title, no back button ────────────────────── */}
      <div
        style={{
          backgroundColor: '#0053e2',
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
            color: '#ffffff',
            fontFamily: FONT,
            whiteSpace: 'nowrap',
          }}
        >
          Card Application
        </h1>
      </div>

      {/* ── Scrollable body ───────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div
            style={{
              maxWidth: 600,
              margin: '0 auto',
              padding: '24px 0 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >

            {/* ── Page heading ─────────────────────────────────────────────── */}
            <h2
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                color: '#2e2f32',
                fontFamily: FONT,
              }}
            >
              Terms &amp; conditions
            </h2>

            {/* ── Terms content ────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Section 1 */}
              <div>
                <h3
                  style={{
                    margin: '0 0 8px',
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#2e2f32',
                    fontFamily: FONT,
                  }}
                >
                  1. Interest Rates and Charges
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: '#4a4b4d',
                    fontFamily: FONT,
                  }}
                >
                  The annual interest rate for purchases made with the Walmart Rewards™ Mastercard® is 19.99%. Cash
                  advances and balance transfers are subject to an annual interest rate of 22.99%. Interest is
                  calculated daily on the outstanding balance and charged monthly. A minimum interest charge of $1.00
                  applies if interest is owing. The interest-free grace period on purchases is 21 days from the
                  statement date, provided the previous month's balance is paid in full by the due date.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h3
                  style={{
                    margin: '0 0 8px',
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#2e2f32',
                    fontFamily: FONT,
                  }}
                >
                  2. Fees and Charges
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: '#4a4b4d',
                    fontFamily: FONT,
                  }}
                >
                  There is no annual fee for the Walmart Rewards™ Mastercard®. A cash advance fee of 3% of the
                  transaction amount (minimum $3.50) applies to each cash advance. Foreign currency transactions are
                  subject to a conversion fee of 2.5% of the transaction amount converted to Canadian dollars.
                  Returned payment fees of $25.00 apply for any payment that is not honoured by your financial
                  institution. Over-limit fees may apply at the card issuer's discretion.
                </p>
              </div>

              {/* Section 3 */}
              <div>
                <h3
                  style={{
                    margin: '0 0 8px',
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#2e2f32',
                    fontFamily: FONT,
                  }}
                >
                  3. Rewards Program
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: '#4a4b4d',
                    fontFamily: FONT,
                  }}
                >
                  Cardholders earn Walmart Reward Dollars on eligible purchases. You earn 3% on purchases made at
                  Walmart Canada stores and on walmart.ca, and 1.25% on all other eligible purchases made anywhere
                  Mastercard is accepted. Rewards are credited to your account monthly and may be redeemed in
                  increments of $5.00 toward future purchases at Walmart Canada. Rewards have no expiry date while
                  the account remains open and in good standing. Rewards have no cash value and cannot be redeemed
                  for cash.
                </p>
              </div>

              {/* Section 4 */}
              <div>
                <h3
                  style={{
                    margin: '0 0 8px',
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#2e2f32',
                    fontFamily: FONT,
                  }}
                >
                  4. Credit Limit and Account Management
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: '#4a4b4d',
                    fontFamily: FONT,
                  }}
                >
                  Your credit limit will be determined by the card issuer based on your creditworthiness at the time
                  of application. The minimum credit limit is $300. You may request a credit limit increase after
                  six months of account history in good standing. The card issuer reserves the right to decrease
                  your credit limit at any time without prior notice. You are responsible for ensuring your balance
                  does not exceed your approved credit limit.
                </p>
              </div>

              {/* Section 5 */}
              <div>
                <h3
                  style={{
                    margin: '0 0 8px',
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#2e2f32',
                    fontFamily: FONT,
                  }}
                >
                  5. Payment Terms
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: '#4a4b4d',
                    fontFamily: FONT,
                  }}
                >
                  A minimum monthly payment is required by the payment due date shown on your statement. The minimum
                  payment is the greater of $10.00 or 2% of the outstanding balance, plus any past-due or over-limit
                  amounts. Payments received after 5:00 PM ET on the due date will be credited the following
                  business day. The card issuer may report late or missed payments to Canadian credit bureaus, which
                  may negatively affect your credit score. You may pay more than the minimum at any time without
                  penalty.
                </p>
              </div>

            </div>

            {/* ── Divider ──────────────────────────────────────────────────── */}
            <div style={{ margin: '0' }}>
              <Divider />
            </div>

            {/* ── Agreement checkbox ───────────────────────────────────────── */}
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              label='I have read and agree to the Credit Terms, the Electronic Statement Terms and Conditions, confirming my acceptance to receive communications electronically, and the Application Disclosures, all set forth below. Selecting "Accept & Submit" constitutes my electronic signature.'
            />

          </div>
        </Container>
      </div>

      {/* ── Sticky footer: Accept & Continue + Cancel ────────────────────────── */}
      <div
        style={{
          flexShrink: 0,
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e5e7eb',
          padding: '16px 16px 24px',
        }}
      >
        <div
          style={{
            maxWidth: 600,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Button
            variant="primary"
            isFullWidth
            size="medium"
            onClick={onContinue}
          >
            Accept &amp; Continue
          </Button>

          <LinkButton
            type="button"
            size="medium"
            color="default"
            onClick={onDone}
          >
            Cancel
          </LinkButton>
        </div>
      </div>

    </div>
  );
}
