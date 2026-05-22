import * as React from 'react';
import { useState } from 'react';
import { Button } from './components/ld/Button';
import { IconButton } from './components/ld/IconButton';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';
import AuthSignInSheet from './AuthSignInSheet';
import AuthPasswordSheet from './AuthPasswordSheet';

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

interface CreditCardPromoPageProps {
  onBack: () => void;
  onNavSelect?: (key: string) => void;
  onLinkCard: () => void;
  onApplyCard: () => void;
}

type AuthStep = 'none' | 'sign-in' | 'password';
type AuthTarget = 'link' | 'apply' | null;

export default function CreditCardPromoPage({ onBack, onNavSelect, onLinkCard, onApplyCard }: CreditCardPromoPageProps) {
  const [authStep, setAuthStep] = useState<AuthStep>('none');
  const [authTarget, setAuthTarget] = useState<AuthTarget>(null);
  const [authEmail, setAuthEmail] = useState('');

  const handleNavClick = (key: string) => {
    if (onNavSelect) {
      onNavSelect(key);
    }
  };

  const openAuth = (target: AuthTarget) => {
    setAuthTarget(target);
    setAuthStep('sign-in');
  };

  const closeAuth = () => {
    setAuthStep('none');
    setAuthTarget(null);
    setAuthEmail('');
  };

  const handleSignInContinue = (value: string) => {
    setAuthEmail(value);
    setAuthStep('password');
  };

  const handlePasswordContinue = () => {
    closeAuth();
    if (authTarget === 'link') onLinkCard();
    else if (authTarget === 'apply') onApplyCard();
  };

  // Image paths — header/applyCard/content from credit-card-promo, navbar shared with home
  const BASE = import.meta.env.BASE_URL;
  const images = {
    applyCard: `${BASE}credit-card-promo/apply-card.png`,
    content:   `${BASE}credit-card-promo/content.png`,
    navbar:    `${BASE}walmart-canada/navbar.png`,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── Header (two rows) ─────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#0053e2', flexShrink: 0 }}>

        {/* Row 1: back + pill search + cart */}
        <div
          style={{
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <IconButton a11yLabel="Go back" variant="round" size="small" color="white" onClick={onBack}>
            <LivingDesignFontIcon name="ArrowLeft" />
          </IconButton>

          {/* Pill-shaped search bar */}
          <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
            <span
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#74767c',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
                fontSize: 16,
              }}
            >
              <LivingDesignFontIcon name="Search" />
            </span>
            <input
              type="text"
              placeholder="Search everything at Walmart"
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                border: 'none',
                borderRadius: 9999,
                fontSize: 14,
                fontFamily: FONT,
                color: '#2e2f32',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
          </div>

          {/* Cart icon — inline SVG so it always renders */}
          <button
            type="button"
            aria-label="Cart"
            onClick={() => {}}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" fill="currentColor" stroke="none" />
              <circle cx="20" cy="21" r="1" fill="currentColor" stroke="none" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </div>

        {/* Row 2: delivery / pickup selector */}
        <div
          style={{
            padding: '4px 16px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {/* Left group: text + pipe + postal code */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
            <span
              style={{
                fontSize: 14,
                color: '#ffffff',
                fontFamily: FONT,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              How would you want your items?
            </span>
            <span
              style={{
                color: 'rgba(255,255,255,0.4)',
                flexShrink: 0,
                fontSize: 16,
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              |
            </span>
            <span
              style={{
                fontSize: 14,
                color: '#ffffff',
                fontFamily: FONT,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              V6B 2Y5
            </span>
          </div>

          {/* Right: down chevron */}
          <span style={{ color: '#ffffff', display: 'flex', alignItems: 'center', flexShrink: 0, fontSize: 16 }}>
            <LivingDesignFontIcon name="ChevronDown" />
          </span>
        </div>

      </div>

      {/* ── Scrollable Content Area ──────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column' }}>

          {/* Already a member section — replaces link card image */}
          <div
            style={{
              padding: '24px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              backgroundColor: '#f5f6f7',
              borderTop: '1px solid #e5e7eb',
              borderBottom: '1px solid #e5e7eb',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 700,
                color: '#2e2f32',
                fontFamily: 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)',
                textAlign: 'center',
              }}
            >
              Already an Existing Walmart Rewards Mastercard Member?
            </h2>
            <Button variant="secondary" size="medium" onClick={() => openAuth('link')}>
              Link card
            </Button>
          </div>

          {/* Apply Card Image — clickable, opens auth flow first */}
          <div
            style={{ width: '100%', cursor: 'pointer' }}
            onClick={() => openAuth('apply')}
            role="button"
            aria-label="Apply for a card"
          >
            <img
              src={images.applyCard}
              alt="Apply Card"
              style={{ width: '100%', display: 'block', height: 'auto' }}
            />
          </div>

          {/* Content Image */}
          <div style={{ width: '100%' }}>
            <img
              src={images.content}
              alt="Credit Card Content"
              style={{ width: '100%', display: 'block', height: 'auto' }}
            />
          </div>

        </div>
      </div>

      {/* ── Sticky Bottom Navigation Bar Image (shared with home page) ───────── */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto', width: '100%' }}>
          <img
            src={images.navbar}
            alt="Navigation Bar"
            style={{ width: '100%', display: 'block', height: 'auto' }}
          />
        </div>
      </div>

      {/* ── Auth sheets ───────────────────────────────────────────────────── */}
      <AuthSignInSheet
        isOpen={authStep === 'sign-in'}
        onClose={closeAuth}
        onContinue={handleSignInContinue}
      />
      <AuthPasswordSheet
        isOpen={authStep === 'password'}
        onClose={closeAuth}
        onContinue={handlePasswordContinue}
        email={authEmail || 'jean122@gmail.com'}
      />

    </div>
  );
}
