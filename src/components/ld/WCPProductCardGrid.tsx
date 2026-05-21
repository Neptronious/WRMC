// @refresh reset

/**
 * @module WCPProductCardGrid
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
import { Button } from './Button';
import { QuantityStepper } from './QuantityStepper';
import { WCPFlag, type WCPFlagVariant } from './WCPFlag';
import { WCPRatingDisplay } from './WCPRatingDisplay';
import { WCPHeartView } from './WCPHeartView';

export interface ProductCardGridProps {
  image: string;
  name: string;
  price: string;
  cents: string;
  wasPrice?: string;
  flag?: string;
  flagVariant?: WCPFlagVariant;
  rating: number;
  ratingCount: string;
  pickup?: string;
  onAddToCart?: () => void;
  hearted?: boolean;
  onHeartChange?: (hearted: boolean) => void;
  cartQty?: number;
  onCartQtyChange?: (qty: number) => void;
}

export function WCPProductCardGrid({
  image,
  name,
  price,
  cents,
  wasPrice,
  flag,
  flagVariant = 'brand-subtle',
  rating,
  ratingCount,
  pickup,
  onAddToCart,
  hearted,
  onHeartChange,
  cartQty,
  onCartQtyChange,
}: ProductCardGridProps) {
  const hasSavings = !!wasPrice;

  return (
    <div className="ld-wcp-product-card-grid-root">
      {/* Image area — responsive square like production */}
      <div className="ld-wcp-product-card-grid-image-area">
        {/* Flag badge */}
        {flag && (
          <div className="ld-wcp-product-card-grid-flag-wrap">
            <WCPFlag label={flag} variant={flagVariant} />
          </div>
        )}

        {/* Favorite heart toggle */}
        <div className="ld-wcp-product-card-grid-heart-wrap">
          <WCPHeartView
            size="small"
            {...(hearted !== undefined ? {activated: hearted, onChange: onHeartChange} : {})}
          />
        </div>

        <img
          src={image}
          alt={name}
          className="ld-wcp-product-card-grid-image"
        />
      </div>

      {/* Content */}
      <div className="ld-wcp-product-card-grid-content">
        {/* Price row */}
        <div className="ld-wcp-product-card-grid-price-row">
          {hasSavings ? (
            <>
              <span className="ld-wcp-product-card-grid-price-super ld-wcp-product-card-grid-price-positive">
                Now $
              </span>
              <span className="ld-wcp-product-card-grid-price-positive">
                {price}
              </span>
              <span className="ld-wcp-product-card-grid-price-super ld-wcp-product-card-grid-price-positive">
                {cents}
              </span>{' '}
              <span className="ld-wcp-product-card-grid-was-price">
                {wasPrice}
              </span>
            </>
          ) : (
            <>
              <span className="ld-wcp-product-card-grid-price-super">
                $
              </span>
              {price}
              <span className="ld-wcp-product-card-grid-price-super">
                {cents}
              </span>
            </>
          )}
        </div>

        {/* Product name */}
        <p className="ld-wcp-product-card-grid-name">
          {name}
        </p>

        {/* Rating */}
        <WCPRatingDisplay
          value={rating}
          count={ratingCount}
          size="small"
        />

        {/* Pickup */}
        {pickup && (
          <p className="ld-wcp-product-card-grid-pickup">
            Pickup{' '}
            <span className="ld-wcp-product-card-grid-pickup-time">{pickup}</span>
          </p>
        )}

        {/* Add to cart */}
        <div className="ld-wcp-product-card-grid-cart-wrap">
          {cartQty !== undefined ? (
            <QuantityStepper variant="primary" size="small" cartLabel="Add to cart" count={cartQty} onChange={onCartQtyChange} />
          ) : (
            <Button
              variant="primary"
              size="small"
              isFullWidth
              onClick={onAddToCart}
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
WCPProductCardGrid.displayName = 'WCPProductCardGrid';
