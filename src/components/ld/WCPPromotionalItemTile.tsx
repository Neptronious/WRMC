// @refresh reset

/**
 * @module WCPPromotionalItemTile
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
import { Button } from './Button';
import { QuantityStepper } from './QuantityStepper';
export interface PromotionalItemTileProps {
  image: string;
  price: string;
  cents: string;
  onAddToCart?: () => void;
  cartQty?: number;
  onCartQtyChange?: (qty: number) => void;
}

export function WCPPromotionalItemTile({ image, price, cents, onAddToCart, cartQty, onCartQtyChange }: PromotionalItemTileProps) {
  return (
    <div className="ld-wcp-promotional-item-tile-root">
      {/* Image */}
      <div className="ld-wcp-promotional-item-tile-image-wrap">
        <img
          src={image}
          alt="Product"
          className="ld-wcp-promotional-item-tile-image"
        />
      </div>

      {/* Footer: price + add button */}
      <div className="ld-wcp-promotional-item-tile-footer">
        {/* Price row */}
        <div className="ld-wcp-promotional-item-tile-price-row">
          <span className="ld-wcp-promotional-item-tile-currency">
            $
          </span>
          <span className="ld-wcp-promotional-item-tile-dollars">
            {price}
          </span>
          <span className="ld-wcp-promotional-item-tile-cents">
            {cents}
          </span>
        </div>

        {/* Add to cart */}
        <div className="ld-wcp-promotional-item-tile-add-btn">
          {cartQty !== undefined ? (
            <QuantityStepper variant="tertiary" size="small" showAddLabel={false} count={cartQty} onChange={(qty) => { emit('ui:promo-tile:add', {price, cents}); onCartQtyChange?.(qty); }} />
          ) : (
            <Button variant="tertiary" size="small" onClick={() => { emit('ui:promo-tile:add', {price, cents}); onAddToCart?.(); }}>
              + Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
WCPPromotionalItemTile.displayName = 'WCPPromotionalItemTile';
