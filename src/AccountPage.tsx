import * as React from 'react';
import { Divider } from './components/ld/Divider';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';
import HomeBottomNav from './HomeBottomNav';

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

interface AccountPageProps {
  onNavSelect: (key: string) => void;
  onWallet: () => void;
}

// ── QR Code ──────────────────────────────────────────────────────────────────

function QRCode() {
  // Simplified but recognizable QR code SVG
  return (
    <svg
      width="130"
      height="130"
      viewBox="0 0 210 210"
      style={{ display: 'block', border: '8px solid #000', borderRadius: 4 }}
    >
      {/* Top-left finder */}
      <rect x="10" y="10" width="60" height="60" fill="#000" />
      <rect x="20" y="20" width="40" height="40" fill="#fff" />
      <rect x="30" y="30" width="20" height="20" fill="#000" />

      {/* Top-right finder */}
      <rect x="140" y="10" width="60" height="60" fill="#000" />
      <rect x="150" y="20" width="40" height="40" fill="#fff" />
      <rect x="160" y="30" width="20" height="20" fill="#000" />

      {/* Bottom-left finder */}
      <rect x="10" y="140" width="60" height="60" fill="#000" />
      <rect x="20" y="150" width="40" height="40" fill="#fff" />
      <rect x="30" y="160" width="20" height="20" fill="#000" />

      {/* Timing / data pattern */}
      <rect x="90" y="10" width="10" height="10" fill="#000" />
      <rect x="110" y="10" width="10" height="10" fill="#000" />
      <rect x="130" y="10" width="10" height="10" fill="#000" />
      <rect x="100" y="20" width="10" height="10" fill="#000" />
      <rect x="120" y="20" width="10" height="10" fill="#000" />
      <rect x="90" y="30" width="20" height="10" fill="#000" />
      <rect x="120" y="30" width="10" height="10" fill="#000" />
      <rect x="100" y="40" width="10" height="10" fill="#000" />
      <rect x="90" y="50" width="10" height="10" fill="#000" />
      <rect x="110" y="50" width="10" height="10" fill="#000" />
      <rect x="130" y="50" width="10" height="10" fill="#000" />
      <rect x="100" y="60" width="20" height="10" fill="#000" />

      <rect x="10"  y="90" width="10" height="10" fill="#000" />
      <rect x="30"  y="90" width="10" height="10" fill="#000" />
      <rect x="50"  y="90" width="10" height="10" fill="#000" />
      <rect x="80"  y="90" width="130" height="10" fill="#000" />
      <rect x="10" y="100" width="20" height="10" fill="#000" />
      <rect x="40" y="100" width="10" height="10" fill="#000" />
      <rect x="80" y="100" width="10" height="10" fill="#000" />
      <rect x="100" y="100" width="20" height="10" fill="#000" />
      <rect x="130" y="100" width="10" height="10" fill="#000" />
      <rect x="160" y="100" width="10" height="10" fill="#000" />
      <rect x="190" y="100" width="10" height="10" fill="#000" />
      <rect x="10" y="110" width="10" height="10" fill="#000" />
      <rect x="30" y="110" width="30" height="10" fill="#000" />
      <rect x="70" y="110" width="10" height="10" fill="#000" />
      <rect x="100" y="110" width="10" height="10" fill="#000" />
      <rect x="120" y="110" width="10" height="10" fill="#000" />
      <rect x="150" y="110" width="20" height="10" fill="#000" />
      <rect x="180" y="110" width="10" height="10" fill="#000" />
      <rect x="20" y="120" width="20" height="10" fill="#000" />
      <rect x="50" y="120" width="10" height="10" fill="#000" />
      <rect x="80" y="120" width="20" height="10" fill="#000" />
      <rect x="120" y="120" width="10" height="10" fill="#000" />
      <rect x="150" y="120" width="20" height="10" fill="#000" />
      <rect x="10" y="130" width="20" height="10" fill="#000" />
      <rect x="50" y="130" width="20" height="10" fill="#000" />
      <rect x="90" y="130" width="10" height="10" fill="#000" />
      <rect x="110" y="130" width="30" height="10" fill="#000" />
      <rect x="160" y="130" width="10" height="10" fill="#000" />
      <rect x="190" y="130" width="10" height="10" fill="#000" />

      <rect x="80" y="140" width="10" height="10" fill="#000" />
      <rect x="100" y="140" width="10" height="10" fill="#000" />
      <rect x="120" y="140" width="10" height="10" fill="#000" />
      <rect x="140" y="140" width="10" height="10" fill="#000" />
      <rect x="160" y="140" width="10" height="10" fill="#000" />
      <rect x="180" y="140" width="10" height="10" fill="#000" />
      <rect x="90" y="150" width="20" height="10" fill="#000" />
      <rect x="130" y="150" width="20" height="10" fill="#000" />
      <rect x="170" y="150" width="30" height="10" fill="#000" />
      <rect x="80" y="160" width="10" height="10" fill="#000" />
      <rect x="110" y="160" width="10" height="10" fill="#000" />
      <rect x="140" y="160" width="10" height="10" fill="#000" />
      <rect x="160" y="160" width="10" height="10" fill="#000" />
      <rect x="90" y="170" width="10" height="10" fill="#000" />
      <rect x="120" y="170" width="20" height="10" fill="#000" />
      <rect x="150" y="170" width="10" height="10" fill="#000" />
      <rect x="180" y="170" width="20" height="10" fill="#000" />
      <rect x="80" y="180" width="20" height="10" fill="#000" />
      <rect x="110" y="180" width="20" height="10" fill="#000" />
      <rect x="140" y="180" width="10" height="10" fill="#000" />
      <rect x="170" y="180" width="10" height="10" fill="#000" />
      <rect x="90" y="190" width="10" height="10" fill="#000" />
      <rect x="120" y="190" width="10" height="10" fill="#000" />
      <rect x="150" y="190" width="20" height="10" fill="#000" />
    </svg>
  );
}

// ── ListItem ─────────────────────────────────────────────────────────────────

function ListItem({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        all: 'unset',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        width: '100%',
        padding: '14px 16px',
        boxSizing: 'border-box',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: 18,
          color: '#2e2f32',
        }}
      >
        <LivingDesignFontIcon name={icon} />
      </div>
      <span
        style={{
          flex: 1,
          fontSize: 15,
          color: '#2e2f32',
          fontFamily: FONT,
        }}
      >
        {label}
      </span>
      <span style={{ color: '#74767c', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <LivingDesignFontIcon name="ChevronRight" />
      </span>
    </button>
  );
}

// ── SectionCard ───────────────────────────────────────────────────────────────

function SectionCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 12,
        margin: '0 16px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}
    >
      {title && (
        <>
          <p
            style={{
              margin: 0,
              padding: '16px 16px 12px',
              fontSize: 13,
              fontWeight: 700,
              color: '#74767c',
              fontFamily: FONT,
              letterSpacing: '0.3px',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </p>
          <Divider />
        </>
      )}
      {children}
    </div>
  );
}

// ── AccountPage ───────────────────────────────────────────────────────────────

export default function AccountPage({ onNavSelect, onWallet }: AccountPageProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f6f7' }}>

      {/* ── Scrollable body ─────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* ── Greeting + QR code ─────────────────────────────── */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '40px 24px 32px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 700,
                color: '#2e2f32',
                fontFamily: FONT,
              }}
            >
              Hi Jean
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#74767c',
                  fontFamily: FONT,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Account ID
              </p>
              <QRCode />
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: '#74767c',
                  fontFamily: FONT,
                  letterSpacing: '1px',
                }}
              >
                AM-4829-3761-2084
              </p>
            </div>
          </div>

          {/* ── Purchase History ────────────────────────────────── */}
          <SectionCard>
            <ListItem icon="Receipt" label="Purchase history" />
          </SectionCard>

          {/* ── Wallet ──────────────────────────────────────────── */}
          <SectionCard>
            <ListItem icon="Wallet" label="Wallet" onClick={onWallet} />
          </SectionCard>

          {/* ── Manage Account ─────────────────────────────────── */}
          <SectionCard title="Manage account">
            <ListItem icon="User" label="Personal info" />
            <Divider />
            <ListItem icon="Lock" label="Passkey" />
            <Divider />
            <ListItem icon="Location" label="Address" />
            <Divider />
            <ListItem icon="Email" label="Communications & privacy" />
            <Divider />
            <ListItem icon="Bell" label="Notifications" />
          </SectionCard>

          {/* ── My Items ───────────────────────────────────────── */}
          <SectionCard title="My items">
            <ListItem icon="Tag" label="Coupon centre" />
            <Divider />
            <ListItem icon="Returns" label="Reorder" />
            <Divider />
            <ListItem icon="HeartFill" label="Favorites" />
            <Divider />
            <ListItem icon="Gift" label="Registries" />
          </SectionCard>

          {/* ── Sign Out ────────────────────────────────────────── */}
          <SectionCard>
            <ListItem icon="SignOut" label="Sign out" />
          </SectionCard>

          {/* Bottom spacing */}
          <div style={{ height: 8 }} />

        </div>
      </div>

      <HomeBottomNav active="account" onSelect={onNavSelect} />
    </div>
  );
}
