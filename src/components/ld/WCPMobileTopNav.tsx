// @refresh reset

/**
 * @module WCPMobileTopNav
 *
 * # CRITICAL AGENT DIRECTIVE - HARD STOP
 * 
 * This file is read-only output. Treat it as immutable.
 * 
 * - NEVER edit this file directly.
 * - NEVER apply "quick fixes" in this file.
 * - NEVER reformat, refactor, or rewrite content in place.
 * - NEVER treat this file as the source of truth.
 * 
 * If behavior must change, modify the upstream source of this content (the canonical source), not this copy.
 * 
 * Any direct edits in this file are invalid and must be rejected.
 */

import * as React from 'react';
import {cx} from './common';
/**
 * MobileTopNav - WCP pattern helper (demo only).
 *
 * Faithful visual replica of the Walmart mobile top-nav bar (mweb variant).
 * Supports 'blue' and 'white' variants with search pill, department chips,
 * and optional delivery banner. Uses CDN assets from the original project.
 * No modals, no camera, no menu panel, no router navigation.
 */

/* ---------- CDN assets ---------- */

const GIC_ICON = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fe96ba70bf20a4d59aede84cfd5b0636c';

/* ---------- Inline SparkSvg (replaces CDN image) ---------- */

function SparkSvg({ size = 28 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path fill="#FFC220" d="M10.887.645A2.2 2.2 0 0 1 14.643 2.2c0 .532-.534 6.187-.72 6.752a1.553 1.553 0 0 1-2.96 0c-.187-.565-.72-6.22-.72-6.752a2.2 2.2 0 0 1 .644-1.555ZM3.323 6.196a2.2 2.2 0 1 0-2.2 3.81c.46.266 5.624 2.632 6.207 2.753a1.552 1.552 0 0 0 1.48-2.562c-.396-.447-5.026-3.735-5.487-4.001Zm20.437 3.807c-.459.267-5.622 2.633-6.206 2.753a1.556 1.556 0 0 1-1.876-1.684c.035-.328.174-.636.396-.88.396-.444 5.026-3.733 5.487-3.999a2.2 2.2 0 0 1 2.2 3.81Zm-6.206 5.24c.583.121 5.746 2.487 6.207 2.754A2.202 2.202 0 0 1 24.567 21a2.2 2.2 0 0 1-3.004.805c-.461-.266-5.092-3.554-5.487-4a1.552 1.552 0 0 1 1.478-2.563Zm-5.111 2.722a1.561 1.561 0 0 0-1.48 1.081c-.186.565-.72 6.22-.72 6.752a2.2 2.2 0 1 0 4.4 0c0-.532-.533-6.187-.72-6.752a1.56 1.56 0 0 0-1.48-1.081Zm-11.318.03c.46-.268 5.623-2.634 6.207-2.754a1.556 1.556 0 0 1 1.876 1.685 1.553 1.553 0 0 1-.396.879c-.396.445-5.026 3.734-5.487 4a2.2 2.2 0 1 1-2.2-3.81Z" />
    </svg>
  );
}

/* ---------- Sub-nav chip data ---------- */

const subNavLinks = [
  'Departments',
  'Services',
  'Get it Fast',
  'Rollbacks & More',
  'Easter',
  'Pharmacy',
  'New Arrivals',
  'Dinner Made Easy',
  'Walmart+',
];

/* ---------- Inline CartIcon matching original ---------- */

function CartIcon({ count = 0, price = '$0.00' }: { count?: number; price?: string }) {
  return (
    <div className="ld-wcp-mobile-top-nav-cart-wrap">
      <div className="ld-wcp-mobile-top-nav-cart-icon-wrap">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M12 24a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm13 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM5.702 4a1.4 1.4 0 0 1 1.341.998L7.343 6h21.259a1.4 1.4 0 0 1 1.366 1.704l-1.83 8.233a1.4 1.4 0 0 1-1.211 1.088l-16.308 1.813A.583.583 0 0 0 10.684 20H27v2H10.684a2.583 2.583 0 0 1-.286-5.15l15.881-1.765L27.854 8H7.944l2.014 6.713-1.916.574L5.256 6H2V4h3.702Z" />
        </svg>
        <div className="ld-wcp-mobile-top-nav-cart-badge">
          {count}
        </div>
      </div>
      <div className="ld-wcp-mobile-top-nav-cart-price">
        $0.00
      </div>
    </div>
  );
}

/* ---------- Types ---------- */

export type MobileTopNavVariant = 'blue' | 'white';

interface MobileTopNavProps {
  variant?: MobileTopNavVariant;
  showSubNav?: boolean;
  showDeliveryBanner?: boolean;
}

/* ---------- Component ---------- */

export function WCPMobileTopNav({ variant = 'blue', showSubNav = true, showDeliveryBanner = false }: MobileTopNavProps) {
  const cartCount = 0;
  const cartPrice = '$15.00';

  const variantClass = variant === 'blue'
    ? 'ld-wcp-mobile-top-nav-blue'
    : 'ld-wcp-mobile-top-nav-white';

  return (
    <div className={cx('ld-wcp-mobile-top-nav-root', variantClass)}>
      {/* Top bar */}
      <div className="ld-wcp-mobile-top-nav-topbar">
        {/* Left: hamburger + logo */}
        <div className="ld-wcp-mobile-top-nav-left">
          <button
            type="button"
            className="ld-wcp-mobile-top-nav-hamburger"
            aria-label="Menu"
            onClick={() => {}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="ld-wcp-mobile-top-nav-hamburger-icon">
              <path fill="currentColor" d="M30 24.001v2H2v-2h28Zm0-7H2v-2h28v2Zm0-9H2v-2h28v2Z"></path>
            </svg>
          </button>
          <a href="#" aria-label="Walmart Homepage" className="ld-wcp-mobile-top-nav-logo-link">
            <SparkSvg size={28} />
          </a>
        </div>

        {/* Center: search pill */}
        <div
          className="ld-wcp-mobile-top-nav-search-pill"
          role="button"
          aria-label="Search Walmart"
        >
          <span className="ld-wcp-mobile-top-nav-search-text">
            Search Walmart
          </span>
          <button className="ld-wcp-mobile-top-nav-search-btn" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="ld-wcp-mobile-top-nav-search-icon">
              <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.5"></circle>
              <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"></path>
            </svg>
          </button>
        </div>

        {/* Right: cart */}
        <CartIcon count={cartCount} price={cartPrice} />
      </div>

      {/* Delivery banner */}
      {showDeliveryBanner && (
        <div className="ld-wcp-mobile-top-nav-delivery-wrap">
          <button className="ld-wcp-mobile-top-nav-delivery-btn">
            <div className="ld-wcp-mobile-top-nav-delivery-inner">
              <img
                src={GIC_ICON}
                alt="Global Intent"
                width="24"
                height="24"
                className="ld-wcp-mobile-top-nav-gic-icon"
              />
              <span className="ld-wcp-mobile-top-nav-delivery-text">
                How do you want your items?
              </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="ld-wcp-mobile-top-nav-chevron-icon">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      )}

      {/* Sub-nav chips */}
      {showSubNav && (
        <div className="ld-wcp-mobile-top-nav-subnav">
          <div className="ld-wcp-mobile-top-nav-dropdown-wrap">
            <button className="ld-wcp-mobile-top-nav-dropdown-btn">
              Departments
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="ld-wcp-mobile-top-nav-chevron-icon">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
          <div className="ld-wcp-mobile-top-nav-dropdown-wrap">
            <button className="ld-wcp-mobile-top-nav-dropdown-btn">
              Services
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="ld-wcp-mobile-top-nav-chevron-icon">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
          {['Get it Fast', 'Rollbacks & More', 'Easter', 'Pharmacy', 'New Arrivals', 'Dinner Made Easy', 'Walmart+'].map((label) => (
            <a
              key={label}
              href="#"
              className="ld-wcp-mobile-top-nav-chip"
            >
              {label}
            </a>
          ))}
          <div className="ld-wcp-mobile-top-nav-dropdown-wrap">
            <button className="ld-wcp-mobile-top-nav-dropdown-btn">
              More
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="ld-wcp-mobile-top-nav-chevron-icon">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
WCPMobileTopNav.displayName = 'WCPMobileTopNav';
