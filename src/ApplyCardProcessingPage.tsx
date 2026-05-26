import * as React from 'react';

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
      {/* ── Circle loader ────────────────────────────────────────────────────── */}
      <style>{`@keyframes am-spin { to { transform: rotate(360deg); } }`}</style>
      <div
        role="status"
        aria-label="Processing your application"
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: '5px solid #f3f4f6',
          borderTopColor: '#FFC107',
          animation: 'am-spin 0.85s linear infinite',
        }}
      />

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
