// @refresh reset

/**
 * @module WCPMobileHeader
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
import {emit} from './common';
import { useState } from 'react';
/**
 * MobileHeader - WCP pattern helper (demo only).
 *
 * Faithful visual replica of the Walmart mobile header.
 * Two-row layout: logo + cart on row 1, search bar on row 2.
 */

/* ---------- Inline SparkSvg (replaces CDN image) ---------- */

function SparkSvg({ size = 32 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path fill="#FFC220" d="M10.887.645A2.2 2.2 0 0 1 14.643 2.2c0 .532-.534 6.187-.72 6.752a1.553 1.553 0 0 1-2.96 0c-.187-.565-.72-6.22-.72-6.752a2.2 2.2 0 0 1 .644-1.555ZM3.323 6.196a2.2 2.2 0 1 0-2.2 3.81c.46.266 5.624 2.632 6.207 2.753a1.552 1.552 0 0 0 1.48-2.562c-.396-.447-5.026-3.735-5.487-4.001Zm20.437 3.807c-.459.267-5.622 2.633-6.206 2.753a1.556 1.556 0 0 1-1.876-1.684c.035-.328.174-.636.396-.88.396-.444 5.026-3.733 5.487-3.999a2.2 2.2 0 0 1 2.2 3.81Zm-6.206 5.24c.583.121 5.746 2.487 6.207 2.754A2.202 2.202 0 0 1 24.567 21a2.2 2.2 0 0 1-3.004.805c-.461-.266-5.092-3.554-5.487-4a1.552 1.552 0 0 1 1.478-2.563Zm-5.111 2.722a1.561 1.561 0 0 0-1.48 1.081c-.186.565-.72 6.22-.72 6.752a2.2 2.2 0 1 0 4.4 0c0-.532-.533-6.187-.72-6.752a1.56 1.56 0 0 0-1.48-1.081Zm-11.318.03c.46-.268 5.623-2.634 6.207-2.754a1.556 1.556 0 0 1 1.876 1.685 1.553 1.553 0 0 1-.396.879c-.396.445-5.026 3.734-5.487 4a2.2 2.2 0 1 1-2.2-3.81Z" />
    </svg>
  );
}

/* ---------- Inline CartIcon matching original ---------- */

function CartIcon({ count = 0, price = '$0.00', textColor = 'white' }: { count?: number; price?: string; textColor?: string }) {
  return (
    <div className="ld-wcp-mobile-header-cart-icon-wrap">
      <div className="ld-wcp-mobile-header-cart-icon-relative">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: textColor }}>
          <path fill="currentColor" d="M12 24a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm13 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM5.702 4a1.4 1.4 0 0 1 1.341.998L7.343 6h21.259a1.4 1.4 0 0 1 1.366 1.704l-1.83 8.233a1.4 1.4 0 0 1-1.211 1.088l-16.308 1.813A.583.583 0 0 0 10.684 20H27v2H10.684a2.583 2.583 0 0 1-.286-5.15l15.881-1.765L27.854 8H7.944l2.014 6.713-1.916.574L5.256 6H2V4h3.702Z" />
        </svg>
        <div className="ld-wcp-mobile-header-cart-badge">
          {count > 99 ? '99+' : count}
        </div>
      </div>
      <div className="ld-wcp-mobile-header-cart-price" style={{ color: textColor }}>
        {price}
      </div>
    </div>
  );
}

/* ---------- Component ---------- */

interface WCPMobileHeaderProps {
  cartCount?: number;
  cartPrice?: string;
}

export function WCPMobileHeader({ cartCount: cartCountProp, cartPrice: cartPriceProp }: WCPMobileHeaderProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');
  const cartCount = cartCountProp ?? 0;
  const cartPrice = cartPriceProp ?? '$0.00';

  return (
    <header className="ld-wcp-mobile-header-root">
      {/* Row 1: Logo + Cart */}
      <div className="ld-wcp-mobile-header-row1">
        <a href="#" className="ld-wcp-mobile-header-logo-link" aria-label="Walmart Homepage">
          <SparkSvg size={32} />
        </a>
        <a
          href="#"
          className="ld-wcp-mobile-header-cart-link"
          aria-label={`Cart contains ${cartCount} items`}
        >
          <CartIcon count={cartCount} price={cartPrice} textColor="var(--ld-semantic-color-text-inverse, white)" />
        </a>
      </div>

      {/* Row 2: Search bar (white pill, icon + input) matching source MobileHeader.module.css */}
      <form
        role="search"
        aria-label="Search Walmart"
        onSubmit={(e) => { e.preventDefault(); emit('ui:header:search-submit', {query: searchQuery}); }}
        className="ld-wcp-mobile-header-search-form"
      >
        <div className="ld-wcp-mobile-header-search-pill">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" className="ld-wcp-mobile-header-search-icon">
            <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
          <input
            type="search"
            placeholder="Search everything at Walmart online and in store"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search Walmart"
            className="ld-wcp-mobile-header-search-input"
          />
        </div>
      </form>
    </header>
  );
}
WCPMobileHeader.displayName = 'WCPMobileHeader';
