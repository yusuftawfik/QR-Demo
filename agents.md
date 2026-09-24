# AGENTS.md — QR Table-Ordering Demo

## Purpose
A **sales demo**, not (yet) the production app — built to go door to door
and win contracts. Goal: show a smooth, responsive, working prototype of a
QR-code table-ordering experience, hosted on a free Vercel domain so it can
be pulled up on any phone or laptop during a pitch.

**Target clients:** internet cafes, cafes, restaurants — keep placeholder
content and category choices generic enough to read naturally across all
three, not restaurant-specific.

**Fidelity rule: carbon copy of the Figma wireframe's layout/structure.**
Stay fully grayscale throughout — but do NOT copy the wireframe's exact
gray values; use our own grayscale palette (tokens below). No brand colors
anywhere, no real photography — the owner should be picturing their own
branding on top of this. Interactivity and motion are where this demo earns
its keep, not color.

## Stack
- **Next.js (App Router), plain JavaScript** — file-based routing gives real
  multi-page URLs (`/menu`, `/cart`, `/rate`, `/receipt`) with no manual
  router setup.
- **Hosting: Vercel** (free tier). Deploy = git push.
- **Font: Inter via `next/font/google`** — self-hosted at build time, so it
  matches the wireframe exactly with no runtime dependency on an external
  font CDN.
- **Cart state: React Context at the layout level** (not localStorage) —
  `next/link` does client-side transitions between pages without a full
  reload, so context state persists as the user moves through the flow.
- **Icons: `lucide-react`** — free, no attribution required, components
  default to `currentColor` so they inherit grayscale styling with zero
  asset management. Used for nav icons, payment-method icons, category
  icons, and as the generic in-a-box placeholder art for dish/drink photos
  (real photography is out of scope for this demo).

## Source of truth
Figma file: `MnSMMOL4me8NVUaTycwQ9e` ("Untitled"), single page (`0:1`).

| Screen | Route | Node ID | Contents |
|---|---|---|---|
| Home / Menu | `/` | `2:2` | Profile avatar + name/points, table badge ("Table #05"), search bar, horizontal cuisine-category row, "Highly Rated" 2-col dish grid, bottom nav (3 icons) |
| Cuisine detail | `/menu/[category]` | `2:96` | Cuisine title, "Highly Rated" 2-col dish grid, bottom nav |
| Your Order / Cart | `/cart` | `2:150` | Line items (photo, name, desc, price, qty stepper), payment method row (Visa / Apple Pay / Cash), "Place Order" button |
| Rate us | `/rate` | `2:203` | 5-star rating, "Any Recommends" textarea, points-reward tiers (100/200/300 pts → 10/15/20% off), "Submit & Claim Points" button |
| E-Receipt | `/receipt` | `2:249` | Order items, order/customer/payment detail table, "Keep it green" / "Print" actions |
| Table QR card | — | `38:23` | Print-only "scan here" card — reference only, not an app route |

Re-pull any screen with `get_design_context` (skill: `figma-design-to-code`)
using the fileKey/nodeId above if something looks off — don't guess.

## Design tokens (from the wireframe — grayscale only, no exceptions)
- Background: `#ffffff` · Text: `#000000` · Neutral fill/border: `#d9d9d9`
- Font: `Inter` (Regular 400 / Semi Bold 600)
- Radii: dish cards `14px` · search bar `28px` · icon/qty buttons `15px`
  (pill) · bottom-nav pill `24px`
- Card border: `3px solid #d9d9d9` (outer), `1px solid #d9d9d9` (inner
  divider/price bar)
- Dish photo placeholder: plain gray block/circle with "Photo of the dish"
  label — do not substitute real images or icons
- No accent color exists in the source file. Any "selected" state (e.g.
  chosen payment method, filled star) uses a darker/lighter shade of
  `#d9d9d9` or pure black — never an introduced color.

## Per-frame scope (this build pass)
- **Frame 1 — Home (`/`):** exactly 3 category pills — Hot Drinks, Cold
  Drinks, Appetizers. "Highly Rated" grid below shows food/drink
  placeholders. Add-to-cart works directly from this grid.
- **Frame 2 — Category detail (`/menu/[category]`):** reached by tapping a
  category on Frame 1. Grid shows placeholders relevant to that specific
  category only (e.g. Hot Drinks → coffee/tea items). Add-to-cart works
  here too, same as Frame 1.
- **Frame 3 — Cart (`/cart`):** shows only what's actually been added via
  Frames 1/2 (live from CartContext, qty editable) — never static sample
  items. Payment method selection lives here.
- **Frame 4 — Receipt (`/receipt`):** shown after a payment method is
  picked. **No real payment processing exists or is simulated as
  happening** — the selected method (e.g. Visa) is purely a note for staff,
  so the waiter knows which card machine to bring to the table.
- **Frame 5 — Rate us:** out of scope for this pass. Do not build.

## Screen flow (this pass)
Home → tap category or dish → Category detail → add items (qty stepper) →
floating "Your Order" bar → Cart → select payment method (staff signal
only) → Place Order → Receipt. (Rate-us step skipped until Frame 5 is back
in scope.)

## Constraints
- Genuinely responsive (phone width primary, holds up on a laptop screen
  when presenting) with real CSS transitions between pages — that's the
  point of the demo.
- Cart, quantity steppers, payment selection, star rating, and the receipt
  must be functionally wired, not static mockup.
- One reusable `DishCard` component shared across Home, Cuisine detail, and
  Cart rather than duplicated markup per page.

## Placeholder copy
Use common/generic real-world names ("Cappuccino", "Iced Latte",
"Bruschetta"), not the wireframe's literal placeholder labels.

## Branding
Generic, matching the Figma wireframe's own placeholders (e.g. "Table #05",
generic profile initials) — no real business name or logo. Keeps the same
demo usable across any cafe/restaurant/internet cafe pitch.

## Animation & loading
- **Library: `motion` (`motion/react`)** — successor to Framer Motion.
- **Page transitions:** `components/PageTransition.js` wraps `{children}` in
  `app/layout.js` with `AnimatePresence` (mode `wait`), keyed on pathname.
  Short cross-fade + 8px vertical drift, ~0.22s, on every route change.
- **Scroll reveal:** `components/Reveal.js` wraps each `DishCard` in the
  Home and Category grids — fade + 10px lift via `whileInView`, `once: true`,
  small index-based stagger capped at 0.2s delay. Deliberately kept as a
  wrapper (not animating `DishCard`'s own root) so it doesn't leave an
  inline `transform` that would fight the card's CSS `:active` press effect.
- Both are intentionally restrained per spec — short durations, small
  offsets, no bounce/spring, nothing that draws attention to itself.
- **Loading states:** standard Next.js `loading.js` per route segment
  (`app/loading.js`, `app/menu/[category]/loading.js`, `app/cart/loading.js`,
  `app/receipt/loading.js`), each rendering shapes from
  `components/Skeleton.js` matching that page's real layout. Shimmer is a
  gentle CSS opacity pulse (`.skel` in `globals.css`), respects
  `prefers-reduced-motion`.
