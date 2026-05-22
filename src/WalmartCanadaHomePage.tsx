import * as React from 'react';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

interface WalmartCanadaHomePageProps {
  onNavSelect?: (key: string) => void;
  onPromoClick: () => void;
}

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

const NAV_LINKS = [
  { label: 'Departments',          bold: true,  key: 'departments' },
  { label: 'Flyers',               bold: false, key: 'flyers' },
  { label: 'Grocery',              bold: false, key: 'grocery' },
  { label: 'My items',             bold: false, key: 'my-items' },
  { label: 'Toys',                 bold: false, key: 'toys' },
  { label: 'Get it fast',          bold: false, key: 'get-it-fast' },
  { label: 'Everyday low prices',  bold: false, key: 'everyday-low-prices' },
  { label: 'Credit card',          bold: false, key: 'credit-card' },
  { label: 'Electronics',          bold: false, key: 'electronics' },
  { label: 'Flash deals',          bold: false, key: 'flash-deals' },
  { label: 'Outdoor living',       bold: false, key: 'outdoor-living' },
  { label: 'New & Trending',       bold: false, key: 'new-trending' },
];

export default function WalmartCanadaHomePage({ onNavSelect, onPromoClick }: WalmartCanadaHomePageProps) {
  const [activeNav, setActiveNav] = React.useState('shop');
  const [searchQuery, setSearchQuery] = React.useState('');

  const PROMO_KEYWORDS = [
    'credit card',
    'walmart rewards',
    'walmart rewards master card',
    'walmart rewards mastercard',
    'walmart rewards credit card',
    'walmart credit card',
  ];

  const handleSearch = (query: string) => {
    if (PROMO_KEYWORDS.includes(query.trim().toLowerCase())) {
      onPromoClick();
    }
  };

  const handleNavClick = (key: string) => {
    setActiveNav(key);
    if (onNavSelect) {
      onNavSelect(key);
    }
  };

  // Image paths from public/walmart-canada folder
  const BASE = import.meta.env.BASE_URL;
  const images = {
    header: `${BASE}walmart-canada/header.png`,
    promotional: `${BASE}walmart-canada/promotional.png`,
    rewards: `${BASE}walmart-canada/rewards.png`,
    navbar: `${BASE}walmart-canada/navbar.png`,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* ── Top header bar ──────────────────────────────────────────────────── */}
      <div style={{ width: '100%', flexShrink: 0 }}>
        <div
          style={{
            maxWidth: 600,
            margin: '0 auto',
            backgroundColor: '#0053E2',
            padding: '0 16px',
            height: 52,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left — Profile icon + Sign in */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#ffffff', fontSize: 22, display: 'flex', alignItems: 'center' }}>
              <LivingDesignFontIcon name="UserCircle" />
            </span>
            <span
              style={{
                color: '#ffffff',
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Sign in
            </span>
          </div>

          {/* Center — Walmart spark logo */}
          <img
            src={`${BASE}logos/walmart.png`}
            alt="Walmart"
            style={{ width: 32, height: 32, objectFit: 'contain' }}
          />

          {/* Right — Cart icon */}
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="#ffffff" d="M12 24a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm13 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM5.702 4a1.4 1.4 0 0 1 1.341.998L7.343 6h21.259a1.4 1.4 0 0 1 1.366 1.704l-1.83 8.233a1.4 1.4 0 0 1-1.211 1.088l-16.308 1.813A.583.583 0 0 0 10.684 20H27v2H10.684a2.583 2.583 0 0 1-.286-5.15l15.881-1.765L27.854 8H7.944l2.014 6.713-1.916.574L5.256 6H2V4h3.702Z" />
          </svg>
        </div>
      </div>

      {/* ── Search bar ──────────────────────────────────────────────────────── */}
      <div style={{ width: '100%', flexShrink: 0 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', backgroundColor: '#0053E2', padding: '10px 16px' }}>
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
            {/* Leading search icon */}
            <span
              style={{ display: 'flex', alignItems: 'center', color: '#74767c', flexShrink: 0, fontSize: 18, cursor: 'pointer' }}
              onClick={() => handleSearch(searchQuery)}
            >
              <LivingDesignFontIcon name="Search" />
            </span>

            {/* Input */}
            <input
              type="text"
              placeholder="Search Walmart"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch(searchQuery);
              }}
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

            {/* Trailing barcode/scanner icon */}
            <span style={{ display: 'flex', alignItems: 'center', color: '#74767c', flexShrink: 0, fontSize: 18 }}>
              <LivingDesignFontIcon name="Barcode" />
            </span>
          </div>
        </div>
      </div>

      {/* ── Horizontal scrollable nav bar ───────────────────────────────────── */}
      <div style={{ width: '100%', flexShrink: 0 }}>
        <div
          style={{
            maxWidth: 600,
            margin: '0 auto',
            backgroundColor: '#002E99',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 'max-content',
              padding: '0 16px',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <React.Fragment key={link.key}>
                {/* Vertical separator after Departments */}
                {i === 1 && (
                  <div style={{ width: 1, height: 16, backgroundColor: 'rgba(255,255,255,0.4)', flexShrink: 0, margin: '0 4px' }} />
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (link.key === 'credit-card') onPromoClick();
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 10px',
                    color: '#ffffff',
                    fontFamily: FONT,
                    fontSize: 14,
                    fontWeight: link.bold ? 700 : 400,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    lineHeight: 1.4,
                  }}
                >
                  {link.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scrollable Content Area ─────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80, paddingTop: 24 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Rewards image — shown first */}
          <div style={{ width: '100%', paddingLeft: 16, paddingRight: 16 }}>
            <img
              src={images.rewards}
              alt="Rewards Content"
              style={{ width: '100%', display: 'block', height: 'auto' }}
            />
          </div>

          {/* Promotional Cards Image (WRMC) — shown second, clickable */}
          <div
            style={{ width: '100%', paddingLeft: 16, paddingRight: 16, cursor: 'pointer' }}
            onClick={onPromoClick}
            role="button"
            aria-label="View credit card promotion"
          >
            <img
              src={images.promotional}
              alt="Promotional Cards"
              style={{ width: '100%', display: 'block', height: 'auto' }}
            />
          </div>

        </div>
      </div>

      {/* ── Sticky Bottom Navigation Bar Image ───────────────────────────────── */}
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
    </div>
  );
}
