import * as React from 'react';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

const ITEMS = [
  { key: 'shop',     label: 'Shop',     icon: 'Home'       },
  { key: 'my-items', label: 'My Items', icon: 'Heart'      },
  { key: 'search',   label: 'Search',   icon: 'Search'     },
  { key: 'savings',  label: 'Savings',  icon: 'Tag'        },
  { key: 'account',  label: 'Account',  icon: 'UserCircle' },
];

interface HomeBottomNavProps {
  active: string;
  onSelect: (key: string) => void;
}

export default function HomeBottomNav({ active, onSelect }: HomeBottomNavProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb',
      }}
    >
      <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex' }}>
        {ITEMS.map((item) => {
          const isActive = active === item.key;
          const isSearch = item.key === 'search';
          return (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                padding: '10px 0 12px',
                border: 'none',
                borderTop: `2.5px solid ${isActive ? '#0071CE' : 'transparent'}`,
                background: 'none',
                cursor: 'pointer',
              }}
            >
              {isSearch ? (
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: isActive ? '#0071CE' : '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    color: isActive ? '#ffffff' : '#74767c',
                  }}
                >
                  <LivingDesignFontIcon name={item.icon} />
                </span>
              ) : (
                <span
                  style={{
                    fontSize: 22,
                    color: isActive ? '#0071CE' : '#74767c',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <LivingDesignFontIcon name={item.icon} />
                </span>
              )}
              <span
                style={{
                  fontSize: 11,
                  fontFamily: FONT,
                  color: isActive ? '#0071CE' : '#74767c',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
