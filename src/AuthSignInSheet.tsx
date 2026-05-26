import * as React from 'react';
import { useState } from 'react';

import { TextField } from './components/ld/TextField';
import { Button } from './components/ld/Button';
import { IconButton } from './components/ld/IconButton';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

const BASE = import.meta.env.BASE_URL;

// ── Types ─────────────────────────────────────────────────────────────────────

interface AuthSignInSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (value: string) => void;
}

// ── Constant ──────────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── AuthSignInSheet ───────────────────────────────────────────────────────────

export default function AuthSignInSheet({ isOpen, onClose, onContinue }: AuthSignInSheetProps) {
  const [value, setValue] = useState('');

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes authSlideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>

      {/* ── Backdrop ──────────────────────────────────────────────────────── */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.48)',
          zIndex: 1000,
        }}
      />

      {/* ── Sheet ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          top: 24,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#ffffff',
          borderRadius: '20px 20px 0 0',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          animation: 'authSlideUp 0.36s cubic-bezier(0.32,0.72,0,1)',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.18)',
        }}
      >
        {/* Close button */}
        <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 1 }}>
          <IconButton
            a11yLabel="Close sign-in sheet"
            variant="round"
            size="medium"
            color="default"
            onClick={onClose}
          >
            <LivingDesignFontIcon name="Close" />
          </IconButton>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '40px 24px 48px' }}>
          <div
            style={{
              maxWidth: 480,
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >


            {/* ── Heading ──────────────────────────────────────────────── */}
            <h2
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                color: '#2e2f32',
                fontFamily: FONT,
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              Sign in or create your account
            </h2>

            {/* ── Subtext ──────────────────────────────────────────────── */}
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: '#74767c',
                fontFamily: FONT,
                textAlign: 'center',
                lineHeight: 1.6,
              }}
            >
              Not sure if you have an account? Enter your phone number or email
              and we'll check for you.
            </p>

            {/* ── Form ─────────────────────────────────────────────────── */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                marginTop: 8,
              }}
            >
              <TextField
                label="Phone number or email"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />

              <Button
                variant="primary"
                isFullWidth
                size="medium"
                onClick={() => onContinue(value)}
              >
                Continue
              </Button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
