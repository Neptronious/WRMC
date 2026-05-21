import * as React from 'react';
import { Spinner } from './components/ld/Spinner';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ApplyCardProcessingPageProps {
  onComplete: () => void;
}

// ── Font constant ─────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── ApplyCardProcessingPage ───────────────────────────────────────────────────

export default function ApplyCardProcessingPage({ onComplete }: ApplyCardProcessingPageProps) {
  // Auto-advance to approved screen after 3 seconds
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        padding: '0 32px',
      }}
    >
      {/* ── Spinner ──────────────────────────────────────────────────────────── */}
      <Spinner a11yLabel="Processing your application" size="large" color="neutral" />

      {/* ── Text ─────────────────────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
          We are reviewing your application
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: '#74767c', fontFamily: FONT }}>
          This usually takes less than a minute
        </p>
      </div>
    </div>
  );
}
