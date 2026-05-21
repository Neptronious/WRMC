import * as React from 'react';

import { Container } from './components/ld/Container';
import { Button } from './components/ld/Button';
import { LinkButton } from './components/ld/LinkButton';
import { IconButton } from './components/ld/IconButton';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ApplyCardLegalPageProps {
  onDone: () => void;
  onSubmit: () => void;
}

// ── Font constant ─────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── Legal sections (titles used in footer helper text) ────────────────────────

const LEGAL_SECTIONS = [
  {
    title: 'Consent to Credit Check',
    body: `By submitting this application, you authorize Walmart Canada Corp. and President's Choice Bank to obtain your
    credit report and credit score from one or more credit reporting agencies. This authorization remains valid for
    the duration of your account relationship with us. Credit checks may be conducted periodically to review your
    creditworthiness and determine your eligibility for credit limit increases or other account adjustments. A record
    of this inquiry may appear on your credit report.`,
  },
  {
    title: 'Truth-in-Lending Disclosure',
    body: `The credit card account is issued by President's Choice Bank under licence from Mastercard International
    Incorporated. The annual percentage rate (APR) for purchases is 19.99%. The APR for cash advances is 22.99%.
    These rates are variable and may change. The minimum finance charge is $1.00 per billing period. The grace
    period for repayment of purchases is 21 days from the statement date. There is no annual fee for this card.`,
  },
  {
    title: 'Electronic Communications Agreement',
    body: `You agree to receive account statements, notices, and other communications related to your account
    electronically. Electronic communications will be provided via the email address you have provided or through
    the Walmart app or website. You have the right to request paper copies of any communication at no cost by
    contacting us at 1-888-537-5089. You may withdraw consent to electronic communications at any time, although
    doing so may affect your ability to use certain account features.`,
  },
  {
    title: 'Arbitration Agreement',
    body: `Any dispute arising out of or relating to this agreement or your account shall first be subject to informal
    resolution through our customer service. If informal resolution is unsuccessful, disputes will be resolved
    through binding arbitration administered under the rules of the ADR Institute of Canada. This agreement limits
    your ability to bring disputes in court or participate in class actions. You may opt out of this arbitration
    agreement within 30 days of account opening by written notice to our legal department.`,
  },
  {
    title: 'Governing Law and Jurisdiction',
    body: `This agreement is governed by the laws of the Province of Ontario and the federal laws of Canada applicable
    therein, without regard to conflict of law principles. You irrevocably submit to the exclusive jurisdiction
    of the courts of the Province of Ontario for any dispute arising out of or relating to this agreement or your
    account, except as otherwise provided in the Arbitration Agreement above.`,
  },
];

// ── ApplyCardLegalPage ────────────────────────────────────────────────────────

export default function ApplyCardLegalPage({ onDone, onSubmit }: ApplyCardLegalPageProps) {
  const sectionTitles = LEGAL_SECTIONS.map((s) => s.title);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
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
        <LinkButton type="button" size="medium" color="white" onClick={onDone}>
          Done
        </LinkButton>
        <IconButton a11yLabel="Refresh application" variant="round" size="medium" color="white">
          <LivingDesignFontIcon name="Refresh" />
        </IconButton>
      </div>

      {/* ── Blue title bar ───────────────────────────────────────────────────── */}
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
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#ffffff', fontFamily: FONT, whiteSpace: 'nowrap' }}>
          Card Application
        </h1>
      </div>

      {/* ── Scrollable body ───────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>

            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
              Let's take a moment to review the legal stuff
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {LEGAL_SECTIONS.map((section) => (
                <div key={section.title}>
                  <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                    {section.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: '#4a4b4d', fontFamily: FONT }}>
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </Container>
      </div>

      {/* ── Sticky footer ─────────────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb', padding: '16px 16px 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button variant="primary" isFullWidth size="medium" onClick={onSubmit}>
            Submit application
          </Button>
          <p style={{ margin: 0, fontSize: 12, color: '#74767c', lineHeight: 1.6, textAlign: 'center', fontFamily: FONT }}>
            By clicking "Submit application", I have read and agreed to the{' '}
            {sectionTitles.map((title, i) => (
              <React.Fragment key={title}>
                <span
                  style={{
                    textDecoration: 'underline',
                    color: '#2e2f32',
                    cursor: 'pointer',
                    fontFamily: FONT,
                  }}
                >
                  {title}
                </span>
                {i < sectionTitles.length - 1 ? ', ' : ''}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>

    </div>
  );
}
