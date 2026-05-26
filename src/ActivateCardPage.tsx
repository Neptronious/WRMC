import * as React from 'react';
import { useState } from 'react';

import { Container } from './components/ld/Container';
import { Card, CardContent } from './components/ld/Card';
import { Button } from './components/ld/Button';
import { LinkButton } from './components/ld/LinkButton';
import { IconButton } from './components/ld/IconButton';
import { TextField } from './components/ld/TextField';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ActivateCardPageProps {
  onDone: () => void;
  onActivated: () => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';
const BASE = import.meta.env.BASE_URL;
const CARD_LAST_FOUR = '4325';

// ── ActivateCardPage ──────────────────────────────────────────────────────────

export default function ActivateCardPage({ onDone, onActivated }: ActivateCardPageProps) {
  const [cvv, setCvv] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
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
        <IconButton a11yLabel="Refresh" variant="round" size="medium" >
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
          Activate card
        </h1>
      </div>

      {/* ── Scrollable body ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>

            <Card>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                  {/* Heading */}
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
                    Activate your card ending in {CARD_LAST_FOUR}
                  </h2>

                  {/* Description */}
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#74767c', fontFamily: FONT }}>
                    Enter the security code (CVV) of your card to activate.
                  </p>

                  {/* CVV illustration */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={`${BASE}image-assets/cvv.png`}
                      alt="CVV location on card"
                      style={{ maxWidth: '100%', maxHeight: 160, objectFit: 'contain', borderRadius: 8 }}
                    />
                  </div>

                  {/* CVV input — text type to suppress spinner arrows, numeric keyboard on mobile */}
                  <TextField
                    label="Security code (CVV)"
                    type="text"
                    value={cvv}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '').slice(0, 3);
                      setCvv(digits);
                    }}
                    textFieldProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 3, placeholder: '•••' }}
                  />

                </div>
              </CardContent>
            </Card>

          </div>
        </Container>
      </div>

      {/* ── Sticky footer ───────────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb', padding: '16px 16px 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <Button variant="primary" isFullWidth size="medium" onClick={onActivated}>
            Activate your card
          </Button>
        </div>
      </div>

    </div>
  );
}
