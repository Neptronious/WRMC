import * as React from 'react';
import { useState } from 'react';

import { Container } from './components/ld/Container';
import { Button } from './components/ld/Button';
import { LinkButton } from './components/ld/LinkButton';
import { IconButton } from './components/ld/IconButton';
import { TextField } from './components/ld/TextField';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';
import { Link } from './components/ld/Link';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ApplyCardEmailPageProps {
  onDone: () => void;
  onBack?: () => void;
  onContinue: (email: string) => void;
}

// ── Font constant ─────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── ApplyCardEmailPage ────────────────────────────────────────────────────────

export default function ApplyCardEmailPage({ onDone, onBack, onContinue }: ApplyCardEmailPageProps) {
  const [email, setEmail] = useState('jean122@gmail.com');
  const [emailError] = useState('');

  const handleContinue = () => {
    onContinue(email);
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
              Where can we reach you?
            </h2>

            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#74767c', fontFamily: FONT }}>
              This is where we will send you information about your application and other communications.
            </p>

            <TextField
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              textFieldProps={{ placeholder: 'example@email.com', autoComplete: 'email' }}
            />

          </div>
        </Container>
      </div>

      {/* ── Sticky footer ─────────────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb', padding: '16px 16px 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button variant="primary" isFullWidth size="medium" onClick={handleContinue}>
            Continue
          </Button>
          <p style={{ margin: 0, fontSize: 12, color: '#74767c', lineHeight: 1.6, textAlign: 'center', fontFamily: FONT }}>
            By clicking "Continue", you have read and agreed to the{' '}
            <span style={{ '--ld-semantic-color-text-link': '#2e2f32' } as React.CSSProperties}><Link href="#" color="default">Rewards Mastercard Privacy Statement</Link></span>
          </p>
        </div>
      </div>

    </div>
  );
}
