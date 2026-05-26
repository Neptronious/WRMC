import * as React from 'react';
import { useState } from 'react';

import { TextField } from './components/ld/TextField';
import { Button } from './components/ld/Button';
import { IconButton } from './components/ld/IconButton';
import { LinkButton } from './components/ld/LinkButton';
import { Divider } from './components/ld/Divider';
import { Radio } from './components/ld/Radio';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

const BASE = import.meta.env.BASE_URL;

// ── Types ─────────────────────────────────────────────────────────────────────

type SignInMethod = 'sms' | 'email' | 'password';

interface AuthPasswordSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  email?: string;
}

// ── Constant ──────────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── AuthPasswordSheet ─────────────────────────────────────────────────────────

export default function AuthPasswordSheet({
  isOpen,
  onClose,
  onContinue,
  email = 'jean122@gmail.com',
}: AuthPasswordSheetProps) {
  const [method, setMethod] = useState<SignInMethod>('password');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
              gap: 20,
            }}
          >


            {/* ── "Welcome back!" heading ───────────────────────────────── */}
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
              Welcome back!
            </h2>

            {/* ── Account info ─────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#74767c',
                  fontFamily: FONT,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Email
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#2e2f32',
                    fontFamily: FONT,
                  }}
                >
                  {email}
                </p>
                <LinkButton type="button" size="small" color="default" onClick={() => {}}>
                  Change
                </LinkButton>
              </div>
            </div>

            {/* ── Divider ──────────────────────────────────────────────── */}
            <Divider />

            {/* ── Sign-in method selection ──────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#2e2f32',
                  fontFamily: FONT,
                }}
              >
                Please choose a sign in method
              </p>

              {/* Option 1 — SMS */}
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => setMethod('sms')}
              >
                <Radio
                  name="sign-in-method"
                  value="sms"
                  checked={method === 'sms'}
                  onChange={() => setMethod('sms')}
                  label="Send verification code to"
                />
                <p
                  style={{
                    margin: '2px 0 0 28px',
                    fontSize: 13,
                    color: '#74767c',
                    fontFamily: FONT,
                  }}
                >
                  +1 (xxx) xxx-7423
                </p>
              </div>

              {/* Option 2 — Email */}
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => setMethod('email')}
              >
                <Radio
                  name="sign-in-method"
                  value="email"
                  checked={method === 'email'}
                  onChange={() => setMethod('email')}
                  label="Email verification code"
                />
                <p
                  style={{
                    margin: '2px 0 0 28px',
                    fontSize: 13,
                    color: '#74767c',
                    fontFamily: FONT,
                  }}
                >
                  {email}
                </p>
              </div>

              {/* Option 3 — Password (default selected) */}
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => setMethod('password')}
              >
                <Radio
                  name="sign-in-method"
                  value="password"
                  checked={method === 'password'}
                  onChange={() => setMethod('password')}
                  label="Enter your password"
                />
              </div>
            </div>

            {/* ── Password field (visible only when password is selected) ── */}
            {method === 'password' && (
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                trailing={
                  <IconButton
                    a11yLabel={showPassword ? 'Hide password' : 'Show password'}
                    variant="full"
                    size="small"
                    color="default"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    <LivingDesignFontIcon name={showPassword ? 'EyeSlash' : 'Eye'} />
                  </IconButton>
                }
              />
            )}

            {/* ── CTA ──────────────────────────────────────────────────── */}
            <Button
              variant="primary"
              isFullWidth
              size="medium"
              onClick={onContinue}
            >
              Continue
            </Button>

          </div>
        </div>
      </div>
    </>
  );
}
