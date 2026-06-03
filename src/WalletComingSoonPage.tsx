import * as React from 'react';
import { Button } from './components/ld/Button';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';
import { IconButton } from './components/ld/IconButton';

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

interface WalletComingSoonPageProps {
  onBack: () => void;
}

export default function WalletComingSoonPage({ onBack }: WalletComingSoonPageProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── Header ─────────────────────────────────────────────── */}
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
          Wallet
        </h1>
      </div>

      {/* ── Body ──────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          gap: 16,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            backgroundColor: '#FFF7BF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            color: '#FFC107',
            marginBottom: 8,
          }}
        >
          <LivingDesignFontIcon name="Wallet" />
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 700,
            color: '#2e2f32',
            fontFamily: FONT,
            textAlign: 'center',
          }}
        >
          We're building something great
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: 15,
            color: '#74767c',
            fontFamily: FONT,
            textAlign: 'center',
            lineHeight: 1.5,
            maxWidth: 300,
          }}
        >
          Your wallet feature is currently being built. Check back soon!
        </p>

        <div style={{ marginTop: 8 }}>
          <Button variant="primary" size="medium" onClick={onBack}>
            Go back
          </Button>
        </div>
      </div>

    </div>
  );
}
