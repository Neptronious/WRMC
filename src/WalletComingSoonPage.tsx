import * as React from 'react';
import { Button } from './components/ld/Button';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';
import HomeBottomNav from './HomeBottomNav';

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

interface WalletComingSoonPageProps {
  onBack: () => void;
  onNavSelect?: (key: string) => void;
}

export default function WalletComingSoonPage({ onBack, onNavSelect }: WalletComingSoonPageProps) {
  const [query, setQuery] = React.useState('');

  const handleNavSelect = (key: string) => {
    if (onNavSelect) onNavSelect(key);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── Header — same as SearchPage ─────────────────────────── */}
      <div style={{ backgroundColor: '#FFC107', flexShrink: 0 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '10px 16px 12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: 9999,
              padding: '8px 14px',
              gap: 8,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', color: '#74767c', flexShrink: 0, fontSize: 18 }}>
              <LivingDesignFontIcon name="Search" />
            </span>
            <input
              type="text"
              placeholder="Search everything"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontFamily: FONT,
                fontSize: 14,
                color: '#2e2f32',
                lineHeight: 1.4,
              }}
            />
            {query.length > 0 && (
              <button
                onClick={() => setQuery('')}
                style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#74767c', fontSize: 18 }}
              >
                <LivingDesignFontIcon name="Close" />
              </button>
            )}
            <span style={{ display: 'flex', alignItems: 'center', color: '#74767c', flexShrink: 0, fontSize: 18 }}>
              <LivingDesignFontIcon name="Barcode" />
            </span>
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          gap: 16,
          paddingBottom: 80,
        }}
      >
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

        <div style={{ marginTop: 8 }}>
          <Button variant="primary" size="medium" onClick={onBack}>
            Go to home
          </Button>
        </div>
      </div>

      <HomeBottomNav active="savings" onSelect={handleNavSelect} />
    </div>
  );
}
