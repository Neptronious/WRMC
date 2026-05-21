
# Living Design Skill/IDE Starter

**This project is a responsive, mobile-first web application.** All UI must adapt seamlessly from mobile (320px) through tablet (768px) to desktop (1200px+). Your primary job is to compose UI from the existing components in `src/components/ld/`. Only create net-new components when nothing in the library satisfies the requirement — and even then, build them on top of existing components.

## Required Reading — Follow These Steps IN ORDER

Before writing any code, locate and read the guideline files. They exist in one of these directories depending on your tool:

| Tool | Rules directory |
|------|----------------|
| Cursor | `.cursor/rules/` (`.mdc` files) |
| Claude Code | `.claude/rules/` (`.md` files) |
| GitHub Copilot (VS Code) | `.github/instructions/` (`.instructions.md` files) |

Read these files **in order** from the rules directory for your tool:

1. **`theming`** — Theme selection, runtime API, supported brands. Set the active theme first.
2. **`overview-components`** — Full component inventory with import paths and prop APIs.
3. **`living-design-guidelines`** — Coding directive: component selection flow, hard constraints, accessibility requirements, and anti-patterns.
4. **`component-communication`** — Component communication via Store.tsx: shared state, product bindings (`useStoreConnectedItemBindings`), header bindings (`useHeaderCartBindings`), cart/favorites/search patterns, and `addToCart` vs `setCartQty` rules.
5. **`spacing`** — Spacing + responsive layout guardrails: mobile-first breakpoints, section rhythm, grid rules, and anti-patterns like fixed-width page shells.

## Component Hierarchy (Atomic Design)

| Level | Prefix | What they are | Examples |
|-------|--------|---------------|----------|
| **Atoms** | (none) | Smallest UI primitives | `Button`, `TextField`, `Badge`, `Chip`, `Tag`, `Link` |
| **Molecules** | (none) | Small compositions of atoms | `Card`, `FormGroup`, `Alert`, `Modal`, `Menu`, `Select` |
| **Organisms** | `WCP` | Domain-specific UI sections | `WCPItemTile`, `WCPHeader`, `WCPSearchBar` |

**Always start at the highest level that fits.** If a WCP organism already does what you need, use it. Don't rebuild it from lower-level pieces.

## How to Build UI

### 1. Select from existing components (default path)

1. Look up the component and its prop API in the `overview-components` rules file.
2. Follow the component selection flow and intent router in the `living-design-guidelines` rules file.
3. Import from `src/components/ld/` using relative paths — never from `@livingdesign/react` directly.
4. Read the component file's JSDoc before first use — it has usage examples, variant semantics, and accessibility guidance.
5. Compose and wire up props.

### 2. Use WCP Organisms First (critical for pages)

Before building ANY page section, check for a WCP organism component that already handles it. These are complete, responsive, production-quality sections:

- **Headers**: `WCPHeader`
- **Footers**: `WCPDesktopFooter`, `WCPMwebFooter`
- **Product rows**: `WCPFlashDealsCarousel` (built-in flash deals row) or `Carousel` + `WCPCarouselProductCard` (custom product data)
- **Product cards**: `WCPProductCardGrid` (responsive grid), `WCPProductCardList` (list), `WCPCarouselProductCard` (carousel item)
- **Banners**: `WCPSkylineBanner`, `WCPBasicBanner`, `WCPOrderStatusBanner`
- **Navigation**: `WCPSearchBar`, `WCPSearchFilterBar`, `WCPBottomNav`

**NEVER build a custom footer, header, or product carousel when a WCP component exists.** Check the `overview-components` rules file first.

### 3. Build Responsive Layouts (Mobile-First)

**This is a responsive site.** All pages MUST render correctly across mobile, tablet, and desktop. Design mobile-first, then layer on wider breakpoints.

#### Breakpoints

| Token | Min-width | Target | Use for |
|-------|-----------|--------|---------|
| `sm`  | 0 – 599px | Mobile (phones) | Single-column stacks, full-width cards, bottom nav |
| `md`  | 600 – 1023px | Tablet | 2-column grids, side-by-side layouts |
| `lg`  | 1024px+ | Desktop | Multi-column grids (3–4 cols), expanded nav, wider containers |

#### Layout rules

- **Wrap EVERY section in `Container`** — it provides responsive max-width, centering, and horizontal padding (24px on each side). Without it, content stretches edge-to-edge with no breathing room. The ONLY exceptions are headers and footers: `WCPHeader`, `WCPDesktopFooter`, `WCPMwebFooter`. Everything else — including `WCPNewArrivalsCarousel`, carousels, banners, and card grids — MUST be inside `Container`.
- **Product sections** should use horizontal scrolling carousels (Walmart pattern), not single-column grids. Use `WCPFlashDealsCarousel` for built-in flash deals, or `Carousel` + `WCPCarouselProductCard` with Store bindings for custom product data. Do NOT invent an `items` prop on `WCPFlashDealsCarousel`.
- **For product grids** (browse pages), use `WCPProductCardGrid` in `Grid`/`GridColumn` — NOT `WCPItemTile` which has a fixed 200px max-width and won't fill grid columns.
- **Grid must use `hasGutter`** — always pass `<Grid hasGutter>`. Without it, columns have no spacing and cards stack with zero gap.
- **Grid breakpoints are required**: Always set `sm`, `md`, **and** `lg` on every `GridColumn`. Example: `<GridColumn sm={12} md={6} lg={4}>` (full-width → half → third).
- **Section spacing**: 32px between sections, 24px margin around `Divider` components (they have `margin: 0` by default).

#### Responsive anti-patterns (do NOT do these)

- **Fixed pixel widths** on page-level containers or sections — use `Container` and `Grid` instead.
- **Desktop-only layouts** that ignore `sm` — every layout must be usable at 320px.
- **Hiding content with `display: none`** at breakpoints instead of reflowing it — reflow, stack, or collapse content; don't just hide it.
- **Hardcoded column counts** without breakpoint props — always specify `sm`, `md`, and `lg` on `GridColumn`.

### 4. Create a net-new component (only when nothing fits)

1. Build a new React component **outside** `src/components/ld/` (that directory is generated/read-only).
2. **Maximize reuse** — import and compose existing components from `src/components/ld/`.
3. **Must be responsive** — every new component must work at `sm`, `md`, and `lg` breakpoints. Use `Grid`/`GridColumn` with breakpoint props or CSS media queries that follow the breakpoint table above. Test that it stacks correctly on mobile and expands on desktop.
4. Keep portable-safe imports (React + local relative files only).
5. Regenerate output with `npm run build:portable`.

### 5. Cart & Product Interaction Rules

- **ONE add-to-cart control per product** — never render both a `QuantityStepper` and a separate "Add to cart" `Button` for the same item. Use conditional rendering: show the "Add to cart" button when `cartQty === 0`, switch to `QuantityStepper` once added.
- **ALL product state from Store bindings** — use `useStoreConnectedItemBindings()` for every product on the page, including the "main" product on a PDP. NEVER create local `useState` for `qty` or `hearted` that duplicates Store state.
- **QuantityStepper onChange → `setCartQty`** — QuantityStepper passes the new absolute count. NEVER pass it to `addToCart` (which increments). Use `onCartQtyChange` from bindings or `setCartQty` directly.
- **Flash Deals caveat** — `WCPFlashDealsCarousel` is a built-in, fixed-data organism. If you need custom products, build a Store-connected `Carousel` with `WCPCarouselProductCard` + `useStoreConnectedItemBindings()`.
- **Button sizing** — use `size="medium"` for primary cart actions. `size="large"` is rarely appropriate and creates oversized controls.

## Key Constraints

- **Do not edit** files under `src/components/ld/` — they are generated output.
- **Do not recreate** an existing component with raw HTML or another UI library.
- **Do not omit** required props — read the component API first.
- Import using relative paths (`./ld/*`, `../ld/*`, `./components/ld/*`). One component per import line.
- Full constraint details and required prop/a11y invariants are in the `living-design-guidelines` rules file.

## Project Layout

- **Components**: `src/components/ld/` — generated Living Design wrappers (read-only)
- **Helpers**: `src/utils/` — shared utilities including `Theming.tsx`
- **App entry**: `src/App.tsx` — calls theme runtime, renders app
- **Guidelines**: `.claude/rules/` — agent directives and component docs

## Tech Stack

- **Package manager**: NPM
- **Frontend**: React 18 + TypeScript + Vite
- **UI library**: Living Design (`@livingdesign/react`) via local wrapper files in `src/components/ld/`
- **Theming**: `src/utils/Theming.tsx` (called from `src/App.tsx`)

## Development Commands

```bash
npm run dev                    # Build portable output, watch changes, start Vite
npm run build:portable         # Rebuild generated portable components/styles
npm run build                  # Production build (portable + app)
npm run build:context          # Rebuild context/guideline files for sync targets
```
