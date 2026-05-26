import * as React from 'react';
import { useState } from 'react';

import { Container } from './components/ld/Container';
import { Button } from './components/ld/Button';
import { LinkButton } from './components/ld/LinkButton';
import { IconButton } from './components/ld/IconButton';
import { Radio } from './components/ld/Radio';
import { Alert } from './components/ld/Alert';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ApplyCardMethodPageProps {
  onDone: () => void;
  onBack?: () => void;
  onContinue: (method: 'digital' | 'manual') => void;
}

// ── Font constant ─────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── ApplyCardMethodPage ───────────────────────────────────────────────────────

export default function ApplyCardMethodPage({ onDone, onBack, onContinue }: ApplyCardMethodPageProps) {
  const [method, setMethod] = useState<'digital' | 'manual'>('manual');
  const [showDigitalError, setShowDigitalError] = useState(false);

  const handleContinue = () => {
    if (method === 'digital') {
      setShowDigitalError(true);
      return;
    }
    setShowDigitalError(false);
    onContinue(method);
  };

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
          minHeight: 56,
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <IconButton a11yLabel="Go back" variant="round" size="medium" onClick={onBack}>
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
          Card Application
        </h1>
      </div>

      {/* ── Scrollable body ───────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>

            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
              How would you like to apply?
            </h2>

            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#74767c', fontFamily: FONT }}>
              By choosing from one of the options below, and clicking "Agree &amp; continue" you have read and agreed to
              the Digital ID Verification Terms and manual verification terms.
            </p>

            {showDigitalError && (
              <div role="alert">
                <Alert variant="error">
                  Digital ID verification is still in development and is not available yet. Please select "Enter details manually" to continue.
                </Alert>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Manual entry option — first and default */}
              <div
                onClick={() => { setMethod('manual'); setShowDigitalError(false); }}
                style={{
                  border: `2px solid ${method === 'manual' ? '#FFC107' : '#e5e7eb'}`,
                  borderRadius: 12,
                  padding: '16px 20px',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <Radio
                    name="apply-method"
                    value="manual"
                    checked={method === 'manual'}
                    onChange={() => { setMethod('manual'); setShowDigitalError(false); }}
                    label="Enter details manually"
                  />
                </div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: '#74767c', fontFamily: FONT }}>
                  If you choose this option, you'll start your application immediately and manually enter personal
                  details such as your name, date of birth, and address. Fairstone Bank of Canada uses TransUnion to
                  verify your identity, and your information is saved before submission. TransUnion protects your data
                  according to its Privacy Policy and applicable privacy laws, following Fairstone's privacy standards.
                </p>
              </div>

              {/* Digital verification option */}
              <div
                onClick={() => { setMethod('digital'); setShowDigitalError(false); }}
                style={{
                  border: `2px solid ${method === 'digital' ? '#FFC107' : '#e5e7eb'}`,
                  borderRadius: 12,
                  padding: '16px 20px',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <Radio
                    name="apply-method"
                    value="digital"
                    checked={method === 'digital'}
                    onChange={() => { setMethod('digital'); setShowDigitalError(false); }}
                    label="Apply using digital ID verification"
                  />
                </div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: '#74767c', fontFamily: FONT }}>
                  Fairstone Bank of Canada uses Onfido, a third-party service, to verify your identity when you submit
                  your ID through a mobile device. You'll be asked to take a selfie, which is compared with the photo
                  on your ID to confirm your identity and automatically fill parts of your application. Onfido keeps
                  copies of your ID and selfie for up to 35 days, then securely deletes them, while following privacy
                  laws and Fairstone's privacy standards.
                </p>
              </div>

            </div>

          </div>
        </Container>
      </div>

      {/* ── Sticky footer ─────────────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb', padding: '16px 16px 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <Button variant="primary" isFullWidth size="medium" onClick={handleContinue}>
            Agree &amp; continue
          </Button>
        </div>
      </div>

    </div>
  );
}
