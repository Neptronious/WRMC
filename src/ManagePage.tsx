import * as React from 'react';

import { Card } from './components/ld/Card';
import { CardContent } from './components/ld/Card';
import { Container } from './components/ld/Container';
import { Divider } from './components/ld/Divider';
import { IconButton } from './components/ld/IconButton';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ManagePageProps {
  onBack: () => void;
  onNavSelect: (key: string) => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── Menu data ─────────────────────────────────────────────────────────────────

type IconName =
  | 'DollarCircle' | 'UserPlus'
  | 'Lock' | 'Flag'
  | 'Email' | 'Bell' | 'User'
  | 'Chat' | 'Phone';

interface MenuItem {
  icon: IconName;
  title: string;
  subtitle: string;
}

interface MenuSection {
  heading: string;
  items: MenuItem[];
}

const SECTIONS: MenuSection[] = [
  {
    heading: 'Card requests',
    items: [
      {
        icon: 'DollarCircle',
        title: 'Increase credit limit',
        subtitle: 'Request higher spending limit',
      },
      {
        icon: 'UserPlus',
        title: 'Add supplementary card',
        subtitle: 'Provide card for family',
      },
    ],
  },
  {
    heading: 'Security and access',
    items: [
      {
        icon: 'Lock',
        title: 'Freeze card',
        subtitle: 'Temporarily pause card usage',
      },
      {
        icon: 'Flag',
        title: 'Report lost or stolen',
        subtitle: 'Secure card from misuse',
      },
    ],
  },
  {
    heading: 'Preferences',
    items: [
      {
        icon: 'Email',
        title: 'Email preferences',
        subtitle: 'Manage email communications',
      },
      {
        icon: 'Bell',
        title: 'Alerts and notifications',
        subtitle: 'Control transaction alerts',
      },
      {
        icon: 'User',
        title: 'Contact information',
        subtitle: 'Update personal contact details',
      },
    ],
  },
  {
    heading: 'Support',
    items: [
      {
        icon: 'Chat',
        title: 'Chat with us',
        subtitle: 'Immediate assistance',
      },
      {
        icon: 'Phone',
        title: 'Call us',
        subtitle: '5–10 mins resolution time',
      },
    ],
  },
];

// ── Icon background colours ───────────────────────────────────────────────────

function iconBg(_icon: IconName): string {
  return '#eff6ff';
}

function iconColor(_icon: IconName): string {
  return '#0053e2';
}

// ── ManagePage ────────────────────────────────────────────────────────────────

export default function ManagePage({ onBack, onNavSelect }: ManagePageProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ffffff' }}>

      {/* ── Blue header ─────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#0053e2',
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
            fontFamily: FONT,
            whiteSpace: 'nowrap',
          }}
        >
          Manage card
        </h1>
      </div>

      {/* ── Scrollable body ─────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 0 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>

            {SECTIONS.map((section) => (
              <Card key={section.heading}>
                <CardContent>

                  {/* Section heading */}
                  <p
                    style={{
                      margin: 0,
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#2e2f32',
                      fontFamily: FONT,
                    }}
                  >
                    {section.heading}
                  </p>
                  <div style={{ margin: '12px -16px' }}><Divider /></div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {section.items.map((item, idx) => (
                      <React.Fragment key={item.title}>
                        <button
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14,
                            padding: `${idx === 0 ? 0 : 14}px 0 14px`,
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            width: '100%',
                          }}
                        >
                          {/* Leading icon */}
                          <div
                            style={{
                              width: 42,
                              height: 42,
                              borderRadius: '50%',
                              backgroundColor: iconBg(item.icon),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <span style={{ color: iconColor(item.icon), fontSize: 18 }}>
                              <LivingDesignFontIcon name={item.icon} />
                            </span>
                          </div>

                          {/* Title + subtitle */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p
                              style={{
                                margin: '0 0 3px',
                                fontSize: 15,
                                fontWeight: 600,
                                color: '#2e2f32',
                                fontFamily: FONT,
                              }}
                            >
                              {item.title}
                            </p>
                            <p
                              style={{
                                margin: 0,
                                fontSize: 13,
                                color: '#74767c',
                                fontFamily: FONT,
                              }}
                            >
                              {item.subtitle}
                            </p>
                          </div>

                          {/* Trailing external link icon */}
                          <span style={{ color: '#74767c', flexShrink: 0 }}>
                            <LivingDesignFontIcon name="LinkExternal" />
                          </span>
                        </button>

                        {idx < section.items.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </div>

                </CardContent>
              </Card>
            ))}

          </div>
        </Container>
      </div>

    </div>
  );
}
