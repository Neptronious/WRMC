// @refresh reset

/**
 * @module WCPFlashDealsCarousel
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
import {ChevronRightIcon, PRODUCT_IMAGES} from './common';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from './Button';
/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface FlashDealItem {
  sku: string;
  image: string;
  name: string;
  priceCents: number;
  price: string;
  cents: string;
  originalPrice: string;
  pricePrefix: string;
  badge?: { label: string; color: string };
  optionsText?: string;
  actionType: 'add' | 'options';
}

type LdKitItemsApi = {
  addToCart?: (sku: string, name: string, priceCents: number, qty?: number) => void;
};

function addFlashDealToCart(item: FlashDealItem): void {
  if (typeof window === 'undefined' || item.actionType !== 'add') return;
  const itemsApi = (window as any).ldKit?.items as LdKitItemsApi | undefined;
  if (typeof itemsApi?.addToCart === 'function') {
    itemsApi.addToCart(item.sku, item.name, item.priceCents, 1);
  }
}

const FLASH_DEALS: FlashDealItem[] = [
  {
    sku: 'flash-earrings-1',
    image: PRODUCT_IMAGES.flashEarrings,
    name: 'Cate & Chloe McKenzie 18k White Gold Plated Drop Dangle Earrings w...',
    priceCents: 1628,
    price: '16',
    cents: '28',
    originalPrice: '$39.99',
    pricePrefix: 'Now',
    actionType: 'add',
  },
  {
    sku: 'flash-shampoo-1',
    image: PRODUCT_IMAGES.flashShampoo,
    name: 'Botanic Hearth Tea Tree Shampoo and Conditioner Set for Itchy and Dr...',
    priceCents: 1200,
    price: '12',
    cents: '00',
    originalPrice: '$24.50',
    pricePrefix: 'Now',
    optionsText: 'More options from $15.00',
    actionType: 'options',
  },
  {
    sku: 'flash-humidifier-1',
    image: PRODUCT_IMAGES.flashHumidifier,
    name: 'ALROCKET 6.5L Large Humidifiers Top Fill Cool Mist Humidifier for...',
    priceCents: 4399,
    price: '43',
    cents: '99',
    originalPrice: '$135.99',
    pricePrefix: 'Now',
    badge: { label: 'Clearance', color: '#F57224' },
    actionType: 'add',
  },
  {
    sku: 'flash-tanktops-1',
    image: PRODUCT_IMAGES.flashTankTops,
    name: 'NELEUS Womens Tight Fitting Base Layer Dry Fit Tank Top 3 Pack,Black...',
    priceCents: 1999,
    price: '19',
    cents: '99',
    originalPrice: '$48.00',
    pricePrefix: 'Now',
    optionsText: 'More options from $19.99',
    actionType: 'options',
  },
  {
    sku: 'flash-laptop-1',
    image: PRODUCT_IMAGES.flashLaptop,
    name: 'AEEZO 15.6 inch Laptop, 16GB RAM 512GB ROM, Intel Celeron Quad-Cor...',
    priceCents: 23999,
    price: '239',
    cents: '99',
    originalPrice: '$299.99',
    pricePrefix: 'Now',
    actionType: 'add',
  },
  {
    sku: 'flash-exercise-bike-1',
    image: PRODUCT_IMAGES.flashExerciseBike,
    name: 'MERACH Stationary Exercise bike with Exclusive Free APP, Indoor Cyc...',
    priceCents: 15999,
    price: '159',
    cents: '99',
    originalPrice: '$299.99',
    pricePrefix: 'Now',
    actionType: 'add',
  },
  {
    sku: 'flash-headphones-1',
    image: PRODUCT_IMAGES.headphones,
    name: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones...',
    priceCents: 24800,
    price: '248',
    cents: '00',
    originalPrice: '$399.99',
    pricePrefix: 'Now',
    badge: { label: 'Clearance', color: '#F57224' },
    actionType: 'add',
  },
  {
    sku: 'flash-air-fryer-1',
    image: PRODUCT_IMAGES.airFryer,
    name: 'Ninja AF101 4-Quart Air Fryer with Ceramic Coated Nonstick Basket...',
    priceCents: 6999,
    price: '69',
    cents: '99',
    originalPrice: '$129.99',
    pricePrefix: 'Now',
    actionType: 'add',
  },
  {
    sku: 'flash-roomba-1',
    image: PRODUCT_IMAGES.roomba1,
    name: 'iRobot Roomba j7+ Self-Emptying Robot Vacuum Identifies and Avoids...',
    priceCents: 29999,
    price: '299',
    cents: '99',
    originalPrice: '$599.99',
    pricePrefix: 'Now',
    badge: { label: 'Clearance', color: '#F57224' },
    actionType: 'add',
  },
  {
    sku: 'flash-tablet-1',
    image: PRODUCT_IMAGES.tablet,
    name: 'Samsung Galaxy Tab A9+ 11" Tablet 64GB Wi-Fi with S Pen Included...',
    priceCents: 17900,
    price: '179',
    cents: '00',
    originalPrice: '$279.99',
    pricePrefix: 'Now',
    optionsText: 'More options from $159.00',
    actionType: 'options',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function WCPFlashDealsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - el.offsetLeft);
      setScrollLeft(el.scrollLeft);
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
    };
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX) * 2;
    };
    const onUp = () => {
      setIsDragging(false);
      el.style.cursor = 'grab';
      el.style.userSelect = 'auto';
    };
    const onLeave = () => {
      if (isDragging) {
        setIsDragging(false);
        el.style.cursor = 'grab';
        el.style.userSelect = 'auto';
      }
    };

    el.addEventListener('mousedown', onDown);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mouseleave', onLeave);
    el.style.cursor = 'grab';

    return () => {
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseup', onUp);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [isDragging, startX, scrollLeft]);

  const scrollRight = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: 400, behavior: 'smooth' });
  }, []);

  return (
    <section className="ld-wcp-flash-deals-carousel-root">
      {/* Header */}
      <div className="ld-wcp-flash-deals-carousel-header">
        <h2 className="ld-wcp-flash-deals-carousel-title">
          Flash Deals
        </h2>
        <a href="#" className="ld-wcp-flash-deals-carousel-viewall">
          View all
        </a>
      </div>
      <p className="ld-wcp-flash-deals-carousel-subtitle">
        Up to 65% off
      </p>

      {/* Scroll wrapper */}
      <div className="ld-wcp-flash-deals-carousel-scroll-wrapper">
        <div
          ref={scrollRef}
          className="ld-wcp-flash-deals-carousel-scroll"
        >
          {FLASH_DEALS.map((item, idx) => (
            <div key={idx} className="ld-wcp-flash-deals-carousel-card">
              {/* Image */}
              <div className="ld-wcp-flash-deals-carousel-image-wrapper">
                <img
                  src={item.image}
                  alt={item.name}
                  className="ld-wcp-flash-deals-carousel-image"
                />
                {item.badge && (
                  <span
                    className="ld-wcp-flash-deals-carousel-badge"
                    style={{ backgroundColor: item.badge.color }}
                  >
                    {item.badge.label}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="ld-wcp-flash-deals-carousel-body">
                {/* Price */}
                <div className="ld-wcp-flash-deals-carousel-price-row">
                  <span className="ld-wcp-flash-deals-carousel-price-prefix">
                    {item.pricePrefix}{' '}
                  </span>
                  <span className="ld-wcp-flash-deals-carousel-price-dollar">$</span>
                  <span className="ld-wcp-flash-deals-carousel-price-main">
                    {item.price}
                  </span>
                  <span className="ld-wcp-flash-deals-carousel-price-cents">
                    {item.cents}
                  </span>
                </div>

                {/* Was price */}
                <div className="ld-wcp-flash-deals-carousel-was-price">
                  {item.originalPrice}
                </div>

                {/* Options text */}
                {item.optionsText && (
                  <div className="ld-wcp-flash-deals-carousel-options-text">
                    {item.optionsText}
                  </div>
                )}

                {/* Name */}
                <p className="ld-wcp-flash-deals-carousel-name">
                  {item.name}
                </p>

                {/* Action button */}
                <div>
                  <Button
                    variant="primary"
                    size="small"
                    isFullWidth
                    onClick={() => {
                      if (item.actionType === 'add') {
                        addFlashDealToCart(item);
                      }
                    }}
                  >
                    {item.actionType === 'add' ? '+ Add' : 'Options'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chevron scroll button */}
        <button
          type="button"
          aria-label="Scroll right"
          onClick={scrollRight}
          className="ld-wcp-flash-deals-carousel-chevron"
        >
          <ChevronRightIcon size="medium" />
        </button>
      </div>
    </section>
  );
}
WCPFlashDealsCarousel.displayName = 'WCPFlashDealsCarousel';
