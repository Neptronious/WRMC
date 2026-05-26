import * as React from 'react';
import { useState } from 'react';

import { Container } from './components/ld/Container';
import { Button } from './components/ld/Button';
import { LinkButton } from './components/ld/LinkButton';
import { IconButton } from './components/ld/IconButton';
import { Checkbox } from './components/ld/Checkbox';
import { Divider } from './components/ld/Divider';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';
import { Link } from './components/ld/Link';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ApplyCardPrivacyPageProps {
  onDone: () => void;
  onContinue: () => void;
}

// ── Font constant ─────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── ApplyCardPrivacyPage ──────────────────────────────────────────────────────

export default function ApplyCardPrivacyPage({ onDone, onContinue }: ApplyCardPrivacyPageProps) {
  const [consentUse, setConsentUse] = useState(false);
  const [consentShare, setConsentShare] = useState(false);

  const canContinue = consentUse && consentShare;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#FFC107',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <LinkButton type="button" size="medium" onClick={onDone}>
          Done
        </LinkButton>
        <IconButton a11yLabel="Refresh application" variant="round" size="medium" >
          <LivingDesignFontIcon name="Refresh" />
        </IconButton>
      </div>

      {/* ── Blue title bar ───────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#FFC107',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 56,
          flexShrink: 0,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#2e2f32', fontFamily: FONT, whiteSpace: 'nowrap' }}>
          Card Application
        </h1>
      </div>

      {/* ── Scrollable body ───────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>

            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
              We're protecting your privacy
            </h2>

            {/* Privacy content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              <div>
                <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                  Collection and Use of Personal Information
                </h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: '#4a4b4d', fontFamily: FONT }}>
                  Avenue Mart Financial Corp. and President's Choice Bank (together, "we", "us", "our") collect your personal
                  information to process your credit card application, manage your account, and provide you with products
                  and services. This includes your name, address, date of birth, Social Insurance Number (where
                  permitted), income information, and credit history obtained from credit bureaus.
                </p>
              </div>

              <div>
                <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                  How We Use Your Information
                </h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: '#4a4b4d', fontFamily: FONT }}>
                  We use your personal information to: evaluate your credit application; open and administer your
                  account; verify your identity; detect and prevent fraud; comply with legal and regulatory requirements;
                  and communicate with you about your account, rewards, and relevant promotions. We may use automated
                  decision-making processes in evaluating your application, and you have the right to request human
                  review of any automated decision.
                </p>
              </div>

              <div>
                <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                  Sharing Your Personal Information
                </h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: '#4a4b4d', fontFamily: FONT }}>
                  We may share your personal information with: credit bureaus and reporting agencies; service providers
                  who assist us in delivering products and services; government and regulatory authorities as required by
                  law; and Avenue Mart affiliated companies for the purpose of improving your experience and offering
                  relevant rewards and promotions. We do not sell your personal information to third parties.
                </p>
              </div>

              <div>
                <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                  Your Rights and Choices
                </h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: '#4a4b4d', fontFamily: FONT }}>
                  You have the right to access, correct, and in certain circumstances request the deletion of your
                  personal information. You may withdraw consent for marketing communications at any time, subject to
                  legal and contractual restrictions. To exercise your privacy rights or for questions about how we
                  handle your information, please contact our Privacy Officer at{' '}
                  <span style={{ '--ld-semantic-color-text-link': '#2e2f32' } as React.CSSProperties}><Link href="#" color="default">privacy@avenuemart.ca</Link></span>.
                </p>
              </div>

            </div>

            {/* Divider */}
            <div style={{ margin: '0' }}>
              <Divider />
            </div>

            {/* Consent checkboxes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Checkbox
                checked={consentUse}
                onChange={(e) => setConsentUse(e.target.checked)}
                label="I consent to the use of my personal information as stated above."
              />
              <Checkbox
                checked={consentShare}
                onChange={(e) => setConsentShare(e.target.checked)}
                label="I consent to the sharing of my personal information as stated above."
              />
            </div>

          </div>
        </Container>
      </div>

      {/* ── Sticky footer ─────────────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb', padding: '16px 16px 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button variant="primary" isFullWidth size="medium" onClick={onContinue}>
            Accept &amp; continue
          </Button>
          <p style={{ margin: 0, fontSize: 12, color: '#74767c', lineHeight: 1.6, textAlign: 'center', fontFamily: FONT }}>
            By clicking "Accept &amp; continue", I have read and agreed to the{' '}
            <span style={{ '--ld-semantic-color-text-link': '#2e2f32' } as React.CSSProperties}><Link href="#" color="default">Avenue Mart Rewards Mastercard Privacy Statement</Link></span>
          </p>
        </div>
      </div>

    </div>
  );
}
