import * as React from 'react';
import { useState } from 'react';

import { Button } from './components/ld/Button';
import { IconButton } from './components/ld/IconButton';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ReportLostStolenPageProps {
  onBack: () => void;
  onContinue: (reason: string, description: string) => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

const REASONS = [
  'I have lost my card',
  'My card was stolen',
  'My card was damaged',
  'I never received my card',
  'Other',
];

// ── ReportLostStolenPage ──────────────────────────────────────────────────────

export default function ReportLostStolenPage({ onBack, onContinue }: ReportLostStolenPageProps) {
  const [reason, setReason] = useState(REASONS[0]);
  const [description, setDescription] = useState('');

  const handleContinue = () => {
    onContinue(reason, description);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ffffff' }}>

      {/* ── Yellow header ───────────────────────────────────────────── */}
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
        <IconButton
          a11yLabel="Go back"
          variant="round"
          size="medium"
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
            color: '#2e2f32',
            fontFamily: FONT,
            whiteSpace: 'nowrap',
          }}
        >
          Report lost or stolen card
        </h1>
      </div>

      {/* ── Scrollable body ─────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 16px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Description */}
          <div
            style={{
              backgroundColor: '#FFF7BF',
              borderRadius: 12,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
            }}
          >
            <span style={{ color: '#FFC107', fontSize: 20, flexShrink: 0, marginTop: 1 }}>
              <LivingDesignFontIcon name="Flag" />
            </span>
            <p style={{ margin: 0, fontSize: 14, color: '#2e2f32', fontFamily: FONT, lineHeight: 1.6 }}>
              Reporting a lost or stolen card will <strong>automatically cancel your card</strong> and
              a replacement card will be mailed to you within 5–7 business days.
            </p>
          </div>

          {/* Reason dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label
              htmlFor="reason-select"
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#2e2f32',
                fontFamily: FONT,
              }}
            >
              Reason
            </label>
            <div style={{ position: 'relative' }}>
              <select
                id="reason-select"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={{
                  width: '100%',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #2e2f32',
                  borderRadius: 8,
                  padding: '12px 42px 12px 14px',
                  fontSize: 15,
                  fontFamily: FONT,
                  color: '#2e2f32',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {REASONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              {/* Custom chevron */}
              <span
                style={{
                  position: 'absolute',
                  right: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: '#2e2f32',
                  fontSize: 16,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <LivingDesignFontIcon name="ChevronDown" />
              </span>
            </div>
          </div>

          {/* Additional description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label
              htmlFor="description-input"
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#2e2f32',
                fontFamily: FONT,
              }}
            >
              Additional details <span style={{ fontWeight: 400, color: '#74767c' }}>(optional)</span>
            </label>
            <textarea
              id="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe when or where this happened…"
              rows={4}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                backgroundColor: '#ffffff',
                border: '1.5px solid #d1d5db',
                borderRadius: 8,
                padding: '12px 14px',
                fontSize: 15,
                fontFamily: FONT,
                color: '#2e2f32',
                resize: 'vertical',
                outline: 'none',
                lineHeight: 1.5,
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#2e2f32'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; }}
            />
          </div>

        </div>
      </div>

      {/* ── Sticky footer ───────────────────────────────────────────── */}
      <div
        style={{
          flexShrink: 0,
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e5e7eb',
          padding: '16px 16px 24px',
        }}
      >
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <Button variant="primary" isFullWidth size="medium" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>

    </div>
  );
}
