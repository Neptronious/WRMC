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
    header:    `${BASE}credit-card-promo/header.png`,
    applyCard: `${BASE}credit-card-promo/apply-card.png`,
    content:   `${BASE}credit-card-promo/content.png`,
    navbar:    `${BASE}walmart-canada/navbar.png`,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── Header bar: back + search + cart ─────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#0053e2',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexShrink: 0,
        }}
      >
        <IconButton a11yLabel="Go back" variant="round" size="small" color="white" onClick={onBack}>
          <LivingDesignFontIcon name="ArrowLeft" />
        </IconButton>

        {/* Search bar */}
        <div style={{ flex: 1, position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#74767c',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <LivingDesignFontIcon name="Search" />
          </span>
          <input
            type="text"
            placeholder="Search everything at Walmart"
            style={{
              width: '100%',
              padding: '9px 12px 9px 34px',
              border: 'none',
              borderRadius: 4,
              fontSize: 14,
              fontFamily: FONT,
              color: '#2e2f32',
              backgroundColor: '#ffffff',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
        </div>

        <IconButton a11yLabel="Cart" variant="round" size="small" color="white" onClick={() => {}}>
          <LivingDesignFontIcon name="Cart" />
        </IconButton>
      </div>

      {/* ── Header Image ─────────────────────────────────────────────────────── */}
      <div style={{ width: '100%', flexShrink: 0 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', width: '100%' }}>
          <img
            src={images.header}
            alt="Credit Card Promo Header"
            style={{ width: '100%', display: 'block', height: 'auto' }}
          />
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
