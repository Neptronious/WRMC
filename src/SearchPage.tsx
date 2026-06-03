import * as React from 'react';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';
import HomeBottomNav from './HomeBottomNav';

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

interface SearchPageProps {
  onNavSelect: (key: string) => void;
  onPromoClick: () => void;
}

// ── Category data ─────────────────────────────────────────────────────────────

interface Category {
  label: string;
  bg: string;
  icon?: string;
  onTap?: 'promo';
}

const CATEGORIES: Category[] = [
  { label: 'Grocery',                     bg: '#dce9f9', icon: 'Facility'     },
  { label: 'Weekly flyer',                bg: '#dce9f9', icon: 'DocumentLine' },
  { label: 'Rollbacks & more',            bg: '#dce9f9', icon: 'Tag'          },
  { label: "Father's day",                bg: '#c5dfc5', icon: 'Gift'         },
  { label: 'Sports',                      bg: '#dce9f9', icon: 'Star'         },
  { label: 'New & trending',              bg: '#e8dec8', icon: 'Flash'        },
  { label: 'Get it fast',                 bg: '#dce9f9', icon: 'Truck'        },
  { label: 'Everyday low prices',         bg: '#dce9f9', icon: 'TagFill'      },
  { label: 'Cool Savings',               bg: '#dce9f9', icon: 'Bookmark'     },
  { label: 'Clothing, shoes & accessories', bg: '#dce9f9', icon: 'Star'      },
  { label: 'Electronics',                bg: '#dce9f9', icon: 'Barcode'      },
  { label: 'Toys',                        bg: '#dce9f9', icon: 'Gift'         },
  { label: 'Baby',                        bg: '#dce9f9', icon: 'Heart'        },
  { label: 'Personal care',               bg: '#dce9f9', icon: 'User'         },
  { label: 'Home',                        bg: '#dce9f9', icon: 'Home'         },
  { label: 'Household supplies & pantry', bg: '#dce9f9', icon: 'Box'          },
  { label: 'Furniture',                   bg: '#dce9f9', icon: 'Facility'     },
  { label: 'Appliances',                  bg: '#dce9f9', icon: 'Wrench'       },
  { label: 'Beauty',                      bg: '#dce9f9', icon: 'Star'         },
  { label: 'Sports & rec',                bg: '#dce9f9', icon: 'Star'         },
  { label: 'Health',                      bg: '#dce9f9', icon: 'Heart'        },
  { label: 'Pets',                        bg: '#dce9f9', icon: 'HeartFill'    },
  { label: 'Pharmacy',                    bg: '#dce9f9', icon: 'Services'     },
  { label: 'Gifts & seasonal',            bg: '#dce9f9', icon: 'GiftFill'     },
  { label: 'Home improvement',            bg: '#dce9f9', icon: 'Wrench'       },
  { label: 'Video games',                 bg: '#dce9f9', icon: 'Play'         },
  { label: 'Office & school supplies',    bg: '#dce9f9', icon: 'Notebook'     },
  { label: 'Automotive',                  bg: '#dce9f9', icon: 'Car'          },
  { label: 'Jewellery & watches',         bg: '#dce9f9', icon: 'Star'         },
  { label: 'Financial Services',          bg: '#dce9f9', icon: 'Wallet',      onTap: 'promo' },
  { label: 'Arts & crafts',               bg: '#dce9f9', icon: 'Write'        },
  { label: 'Books',                       bg: '#dce9f9', icon: 'Notebook'     },
  { label: 'Movies and music',            bg: '#dce9f9', icon: 'Play'         },
  { label: 'Outdoor living',              bg: '#c5dfc5', icon: 'Globe'        },
  { label: 'Gift cards',                  bg: '#dce9f9', icon: 'Card'         },
  { label: 'Coupon Centre',               bg: '#b8d4f0', icon: 'BookmarkFill' },
];

// ── SearchPage ────────────────────────────────────────────────────────────────

export default function SearchPage({ onNavSelect, onPromoClick }: SearchPageProps) {
  const [query, setQuery] = React.useState('');

  const PROMO_KEYWORDS = [
    'credit card', 'rewards credit card', 'rewards card',
    'walmart rewards', 'walmart credit card', 'walmart rewards card',
    'avenue mart card', 'avenue mart credit card', 'avenue mart rewards',
    'avenuemart card', 'avenuemart credit card', 'avenuemart rewards',
    'financial services',
  ];

  const handleSearch = (q: string) => {
    if (PROMO_KEYWORDS.includes(q.trim().toLowerCase())) {
      onPromoClick();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── Header with search bar ─────────────────────────────── */}
      <div style={{ backgroundColor: '#FFC107', flexShrink: 0 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '10px 16px 12px' }}>
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
            <span
              style={{ display: 'flex', alignItems: 'center', color: '#74767c', flexShrink: 0, fontSize: 18, cursor: 'pointer' }}
              onClick={() => handleSearch(query)}
            >
              <LivingDesignFontIcon name="Search" />
            </span>
            <input
              type="text"
              placeholder="Search everything"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(query); }}
              autoFocus
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
            {query.length > 0 && (
              <button
                onClick={() => setQuery('')}
                style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#74767c', fontSize: 18 }}
              >
                <LivingDesignFontIcon name="Close" />
              </button>
            )}
            <span style={{ display: 'flex', alignItems: 'center', color: '#74767c', flexShrink: 0, fontSize: 18 }}>
              <LivingDesignFontIcon name="Barcode" />
            </span>
          </div>
        </div>
      </div>

      {/* ── Scrollable body ─────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px 12px 12px' }}>

          <h2
            style={{
              margin: '0 0 16px 4px',
              fontSize: 18,
              fontWeight: 700,
              color: '#2e2f32',
              fontFamily: FONT,
            }}
          >
            Shopping, savings &amp; more
          </h2>

          {/* ── 3-column category grid ────────────────────────── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8,
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => {
                  if (cat.onTap === 'promo') onPromoClick();
                }}
                style={{
                  all: 'unset',
                  display: 'block',
                  height: 100,
                  backgroundColor: cat.bg,
                  borderRadius: 10,
                  padding: '10px 8px 8px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#0071CE',
                    fontFamily: FONT,
                    lineHeight: 1.3,
                  }}
                >
                  {cat.label}
                </span>
                {cat.icon && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 6,
                      right: 6,
                      fontSize: 30,
                      color: '#0071CE',
                      opacity: 0.25,
                      display: 'flex',
                      alignItems: 'center',
                      lineHeight: 1,
                    }}
                  >
                    <LivingDesignFontIcon name={cat.icon} />
                  </span>
                )}
              </button>
            ))}
          </div>

        </div>
      </div>

      <HomeBottomNav active="search" onSelect={onNavSelect} />
    </div>
  );
}
