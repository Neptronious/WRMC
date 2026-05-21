import * as React from 'react';
import { useState, useRef, useCallback } from 'react';

import { Container } from './components/ld/Container';
import { Button } from './components/ld/Button';
import { Link } from './components/ld/Link';
import { IconButton } from './components/ld/IconButton';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

// ── Types ─────────────────────────────────────────────────────────────────────

interface VerifyPhonePageProps {
  onBack: () => void;
  onContinue: () => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const DUMMY_PHONE = '+1 (555) 867-5309';
const OTP_LENGTH = 6;

// ── VerifyPhonePage ───────────────────────────────────────────────────────────

export default function VerifyPhonePage({ onBack, onContinue }: VerifyPhonePageProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(OTP_LENGTH).fill(null));

  // ── OTP handlers ────────────────────────────────────────────
  const handleChange = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/\D/g, '').slice(-1);
      const next = [...otp];
      next[index] = val;
      setOtp(next);
      if (val && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
      const next = Array(OTP_LENGTH).fill('');
      pasted.split('').forEach((ch, i) => { next[i] = ch; });
      setOtp(next);
      const lastFilled = Math.min(pasted.length, OTP_LENGTH - 1);
      inputRefs.current[lastFilled]?.focus();
    },
    [],
  );

  const handleContinue = () => {
    // No-op: next page not yet built
    onContinue();
  };

  // ── Render ──────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── Blue header ─────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#0053e2',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          minHeight: 56,
          position: 'relative',
        }}
      >
        <IconButton
          a11yLabel="Go back"
          variant="round"
          size="medium"
          color="white"
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
            color: '#ffffff',
            fontFamily: 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)',
            whiteSpace: 'nowrap',
          }}
        >
          Link your card
        </h1>
      </div>

      {/* ── Page body ───────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div
            style={{
              maxWidth: 600,
              margin: '32px auto 0',
              display: 'flex',
              flexDirection: 'column',
              gap: 32,
            }}
          >

            {/* ── Heading & subtitle ───────────────────────── */}
            <div>
              <h2
                style={{
                  margin: '0 0 8px',
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#2e2f32',
                  fontFamily: 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)',
                }}
              >
                Let's connect your card
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  color: '#74767c',
                  fontFamily: 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)',
                }}
              >
                Please enter the verification number sent to{' '}
                <span style={{ color: '#2e2f32', fontWeight: 600 }}>{DUMMY_PHONE}</span>
              </p>
            </div>

            {/* ── OTP input boxes ──────────────────────────── */}
            <div>
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  justifyContent: 'flex-start',
                }}
              >
                {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
                    style={{
                      width: 48,
                      height: 56,
                      textAlign: 'center',
                      fontSize: 22,
                      fontWeight: 700,
                      color: '#2e2f32',
                      border: otp[index] ? '2px solid #0053e2' : '2px solid #c4c6cc',
                      borderRadius: 8,
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      fontFamily: 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)',
                      caretColor: '#0053e2',
                      transition: 'border-color 0.15s ease',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#0053e2'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = otp[index] ? '#0053e2' : '#c4c6cc'; }}
                  />
                ))}
              </div>

              {/* Helper text */}
              <p
                style={{
                  margin: '12px 0 0',
                  fontSize: 14,
                  color: '#74767c',
                  fontFamily: 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)',
                }}
              >
                Didn't receive code?{' '}
                <Link href="#" color="default">Text me</Link>
                {' '}or{' '}
                <Link href="#" color="default">call me</Link>
              </p>
            </div>

          </div>
        </Container>
      </div>

      {/* ── Sticky footer: button + disclaimer ──────────────── */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e5e7eb',
          padding: '16px 24px 24px',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Button
            variant="primary"
            isFullWidth
            size="medium"
            onClick={handleContinue}
          >
            Continue
          </Button>

          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: '#74767c',
              lineHeight: 1.6,
              textAlign: 'center',
              fontFamily: 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)',
            }}
          >
            By clicking continue, you acknowledge that you have read and agreed to our{' '}
            <Link href="#" color="default">Terms of Use</Link>
            {' '}and{' '}
            <Link href="#" color="default">Privacy Center</Link>
          </p>
        </div>
      </div>

    </div>
  );
}
