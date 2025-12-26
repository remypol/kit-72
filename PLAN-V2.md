# Kit-72.com — 2026 Site Redesign Plan

**Version:** 2.1
**Created:** 2025-12-13
**Updated:** 2025-12-13
**Status:** Planning Phase
**Goal:** Transform kit-72.com into a premium, mobile-first Spanish emergency preparedness reference site

## Key Design Decision: Sticky Bottom Navigation

The most important UX change is replacing the hamburger menu with a **sticky bottom navigation bar on mobile**. This ensures users:
- Always know where they are in the site
- Can navigate without hunting for menus
- Have search always one tap away
- Experience the site like a modern app (Instagram, YouTube pattern)

```
┌─────────────────────────────────────────────────────┐
│                    PAGE CONTENT                      │
├─────────────────────────────────────────────────────┤
│  🏠      📋       ⚡       🔧       🔍              │
│ Inicio  Guías  Escenarios Herram.  Buscar           │
└─────────────────────────────────────────────────────┘
```

---

## Part 1: Full Site Audit

### Global Issues Found Across All Pages

**Critical UX Issues:**
1. **Emoji icons everywhere** — Inconsistent use of emoji icons (⚡, 💧, 🔦, 🎒, etc.) that look unprofessional and childish
2. **No site search** — Users cannot search for specific content
3. **Limited mobile navigation** — Only 4 links in mobile menu, no access to Escenarios, Guías, Componentes
4. **No sticky CTA on mobile** — Primary CTA disappears after scrolling on long pages
5. **No TOC drawer on mobile** — Table of contents is inline only, not accessible while scrolling
6. **Text-only trust signals** — No visual credibility indicators (certifications, sources, last updated prominence)

**UI/Design Issues:**
1. **Mixed iconography** — Some pages use emoji, some use inline SVGs, no consistent icon system
2. **Inconsistent card styles** — Some cards have border-left accents, some don't, random badge colors
3. **No image optimization** — Pages are text-heavy with no visual relief, no product images
4. **Checkmark/list styling** — Uses SVG checkmarks inline, ✓ ✗ text symbols, and bullet points inconsistently
5. **Rating stars** — Product cards show "★★★★" as text, not proper star components
6. **Badge proliferation** — Too many badge types (Critical, Recomendado, Importante, Popular, Premium, etc.)

**Technical Issues:**
1. **Duplicate breadcrumb segments** — kit-72-horas shows "Inicio / Inicio / Kit 72 Horas"
2. **Missing schema.org** — No FAQ schema despite having FAQ sections
3. **No image lazy loading** — No images = no issue yet, but architecture missing
4. **Large React bundles** — Tools load full React for simple interactions

---

### Page-by-Page Audit

#### HOMEPAGE: /es/

**Current State:**
- Hero with stats, 4 scenario cards, 3 tool cards, trust section, final CTA
- Uses emoji icons for scenarios (⚡, ☀️, 💧, 🚗)

**Issues:**
| Issue | Severity |
|-------|----------|
| Emoji scenario icons look unprofessional | High |
| No search bar | High |
| Stats (72h, 3L, 15 items) use data-value class but no visual hierarchy | Medium |
| "Popular" badge on Apagón is orange-on-orange (hard to read) | Medium |
| Trust section icons are SVGs but scenarios use emoji | Medium |
| Mobile nav only shows 4 links | High |

**Quick Wins (1-2h):**
- Replace emoji with consistent icon set (Lucide or Phosphor)
- Fix badge color contrast
- Add more nav items to mobile menu

**Medium Lifts (0.5-2 days):**
- Add site search with command palette
- Add sticky mobile CTA bar
- Redesign scenario cards with proper icons and better visual hierarchy

**Big Upgrades (multi-day):**
- Add homepage hero image/illustration
- Add testimonials or social proof section
- Add featured content slider

**Proposed Mobile Section Order:**
1. Hero (headline + primary CTA)
2. Sticky search bar (appears on scroll)
3. Scenario quick-select cards (horizontal scroll)
4. Tools CTA strip
5. Trust indicators
6. Final CTA

**Reusable Components Needed:**
- `ScenarioCard` — consistent icon, title, description, tags, link
- `ToolCard` — icon, title, description, CTA button
- `TrustBar` — sources cited, last updated, editorial policy link
- `StickyMobileCTA` — floating action bar with primary CTA

**CTA Strategy:**
- Primary: "Crear mi kit personalizado" → /es/herramientas/configurador-kit/
- Secondary: "Ver guía completa" → /es/kit-de-emergencia/

---

#### PILLAR PAGE: /es/kit-de-emergencia/

**Current State:**
- Long-form article with TOC, essential items grid, step-by-step, scenarios, maintenance table, FAQ

**Issues:**
| Issue | Severity |
|-------|----------|
| TOC is inline card, not sticky or drawer on mobile | High |
| Essential items grid uses emoji + badge-critical/warning inconsistently | High |
| "Crítico" badge is red, "Importante" badge is yellow — confusing | Medium |
| FAQ accordions have no schema.org FAQPage markup | Medium |
| No reading progress indicator | Low |
| Inline info boxes use various styles (card p-6, card with icon) | Medium |

**Quick Wins:**
- Add FAQPage schema
- Standardize callout box styles
- Replace emoji with icons

**Medium Lifts:**
- Create mobile TOC drawer component
- Add reading progress bar
- Redesign essential items grid with proper CategoryCard component

**Big Upgrades:**
- Add interactive checklist mode
- Add "What you'll learn" summary card at top
- Add related tools sidebar

**Proposed Mobile Section Order:**
1. Breadcrumb + Title
2. Lead paragraph + meta (author, date)
3. TOC (collapsible drawer trigger)
4. "Quick stats" card (3L/day, 72h, etc.)
5. Content sections
6. FAQ
7. Related content
8. CTA bar

**Reusable Components Needed:**
- `MobileTOCDrawer` — slide-up table of contents
- `CategoryItemCard` — icon, items list, priority badge
- `CalloutBox` — tip, warning, info variants
- `FAQAccordion` — with schema.org markup
- `ReadingProgress` — thin top bar

**CTA Strategy:**
- Primary: "Configurar mi kit" (sticky on mobile)
- Secondary: "Calcular cuánta agua necesito"

---

#### PILLAR PAGE: /es/kit-72-horas/

**Current State:**
- Very similar to kit-de-emergencia but with "mochila" focus
- Long checklist sections organized by category

**Issues:**
| Issue | Severity |
|-------|----------|
| Duplicate breadcrumb: "Inicio / Inicio / Kit 72 Horas" | High |
| Inline TOC (same as above) | High |
| Category headers use emoji (💧, 🍫, 🔦, etc.) | High |
| Checklist items show priority dots but no interactive state | Medium |
| Very long page with no section breaks/visual rhythm | Medium |

**Quick Wins:**
- Fix duplicate breadcrumb
- Replace category emoji with consistent icons
- Add section dividers

**Medium Lifts:**
- Make checklist items interactive (save progress to localStorage)
- Add "Jump to section" floating pills on mobile
- Add weight estimation per category

**Big Upgrades:**
- Add "Build your bag" visual component
- Add PDF export of personalized checklist

**Proposed Mobile Section Order:**
1. Breadcrumb + Title
2. Lead + meta
3. Quick stats (items count, estimated weight, estimated cost)
4. TOC drawer trigger
5. Category checklists (collapsible)
6. Organization tips
7. FAQ
8. Related scenarios

**Reusable Components Needed:**
- `ChecklistSection` — collapsible category with items
- `ChecklistItem` — checkbox, priority dot, name, quantity, notes
- `ProgressIndicator` — items checked / total
- `QuickStats` — horizontal strip of key metrics

**CTA Strategy:**
- Primary: "Configurar mi kit personalizado"
- Secondary: "Descargar checklist PDF"

---

#### INDEX PAGE: /es/escenarios/

**Current State:**
- Grid of 4 scenario cards + 4 "coming soon" cards
- Good visual hierarchy

**Issues:**
| Issue | Severity |
|-------|----------|
| Emoji icons on scenario cards | High |
| "Coming soon" cards are 60% opacity — looks broken | Medium |
| No filtering or sorting | Low |
| Tags (Hogar, Energía, Salud) could be clickable filters | Low |

**Quick Wins:**
- Replace emoji with icons
- Improve "coming soon" visual treatment (dashed border, "En desarrollo" badge)

**Medium Lifts:**
- Add filter pills by tag
- Add scenario difficulty/time indicators

**Big Upgrades:**
- Add scenario comparison table
- Add "Which scenario should I prepare for first?" quiz

**Proposed Mobile Section Order:**
1. Breadcrumb + Title + Description
2. Filter pills (tags)
3. Scenario cards (full width, stacked)
4. Coming soon section (collapsed by default)
5. CTA to configurador

**Reusable Components Needed:**
- `ScenarioCard` (defined above)
- `FilterPills` — horizontal scrolling tag filters
- `ComingSoonCard` — distinct style for planned content

**CTA Strategy:**
- Primary: "No sé por dónde empezar → Configurador"

---

#### SCENARIO PAGES: /es/escenarios/prepararse-apagon/, prepararse-ola-calor/, prepararse-corte-agua/, kit-evacuacion/

**Current State:**
- Article format with before/during/after sections
- Checklists and tips

**Issues:**
| Issue | Severity |
|-------|----------|
| Emoji in section headers | High |
| Inconsistent callout styles | Medium |
| No quick-action summary at top | Medium |
| No related scenarios shown | Low |
| No tool CTAs inline | Medium |

**Quick Wins:**
- Replace emoji with icons
- Standardize callout boxes
- Add scenario badge/icon in header

**Medium Lifts:**
- Add "Quick Actions" summary card at top
- Add inline tool CTAs (calculator links)
- Add related scenarios at bottom

**Big Upgrades:**
- Add scenario-specific interactive checklist
- Add "Share your experience" community section (future)

**Proposed Mobile Section Order:**
1. Scenario badge + Title
2. Quick Actions summary (3-5 immediate steps)
3. Before/During/After tabs or sections
4. Detailed checklist
5. Common mistakes
6. FAQ
7. Related tools
8. Related scenarios

**Reusable Components Needed:**
- `ScenarioHeader` — icon, title, difficulty, time estimate
- `QuickActions` — numbered urgent steps
- `PhaseSection` — Before/During/After with icons
- `MistakesCard` — common errors to avoid

**CTA Strategy:**
- Primary: "Ver checklist completo en Configurador"
- Secondary: "Calcular agua/energía necesaria"

---

#### INDEX PAGE: /es/herramientas/

**Current State:**
- 3 tool cards in grid
- Simple, clean layout

**Issues:**
| Issue | Severity |
|-------|----------|
| Tool icons use emoji | High |
| No visual preview of tools | Medium |
| Cards are plain — no indication of tool complexity | Low |

**Quick Wins:**
- Replace emoji with icons

**Medium Lifts:**
- Add tool preview screenshots
- Add "Time to complete" and "Outputs" indicators

**Big Upgrades:**
- Add tool comparison section
- Add "Most popular" indicator based on usage

**Proposed Mobile Section Order:**
1. Breadcrumb + Title + Description
2. Tool cards (full width)
3. Privacy/security notice

**Reusable Components Needed:**
- `ToolCard` — icon, title, description, features list, CTA

**CTA Strategy:**
- Each tool card is its own CTA

---

#### TOOL PAGES: configurador-kit/, calculadora-agua/, calculadora-energia/

**Current State:**
- React components embedded in Astro pages
- Functional but basic UI

**Issues:**
| Issue | Severity |
|-------|----------|
| No step indicator / progress in configurador | High |
| Touch targets too small on mobile | High |
| No results summary for sharing/saving | Medium |
| Print styles exist but not prominent | Medium |
| No loading states | Low |
| Number inputs on mobile show full keyboard, not numeric | Medium |

**Quick Wins:**
- Fix input types for numeric fields
- Increase touch target sizes
- Add loading states

**Medium Lifts:**
- Add step indicator to configurador
- Add shareable results URL
- Add prominent "Save as PDF" button
- Add confetti/celebration on completion

**Big Upgrades:**
- Add results email functionality
- Add results comparison with previous calculations
- Add voice input for accessibility

**Proposed Mobile Section Order:**
1. Breadcrumb + Title
2. How it works (collapsible)
3. Tool inputs (full width, large touch targets)
4. Results section
5. Actions (Print, Share, Save)
6. Related content

**Reusable Components Needed:**
- `StepIndicator` — 1/2/3 dots or progress bar
- `NumberInput` — mobile-friendly with +/- buttons
- `ResultsCard` — highlighted output with copy/share
- `ActionButtonGroup` — Print, Share, Start Over

**CTA Strategy:**
- Primary: "Ver resultado" / "Calcular"
- Secondary: "Guardar PDF" / "Compartir"

---

#### INDEX PAGE: /es/guias/

**Current State:**
- Grid of 4 guide cards

**Issues:**
| Issue | Severity |
|-------|----------|
| Emoji icons | High |
| No guide previews or topics covered | Medium |

**Quick Wins:**
- Replace emoji with icons

**Medium Lifts:**
- Add "Topics covered" list to each card
- Add reading time estimates

**Proposed Mobile Section Order:**
1. Breadcrumb + Title + Description
2. Guide cards (full width)
3. CTA to related tools

**Reusable Components Needed:**
- `GuideCard` — icon, title, description, topics, reading time

**CTA Strategy:**
- Primary: Each guide card links to its page

---

#### GUIDE PAGES: almacenamiento-agua/, almacenamiento-comida/, energia-comunicacion/, botiquin-primeros-auxilios/

**Current State:**
- Long-form article with TOC, detailed content, tables
- Good content depth

**Issues:**
| Issue | Severity |
|-------|----------|
| Duplicate breadcrumb segment | High |
| Inline TOC not sticky | High |
| Emoji in some headers | Medium |
| Tables on mobile overflow horizontally | Medium |
| No visual breaks in long content | Medium |

**Quick Wins:**
- Fix duplicate breadcrumbs
- Replace emoji

**Medium Lifts:**
- Add mobile TOC drawer
- Make tables responsive (card view on mobile)
- Add comparison tables component

**Big Upgrades:**
- Add interactive storage calculator for water page
- Add printable quick-reference card

**Proposed Mobile Section Order:**
1. Breadcrumb + Title
2. Lead + meta
3. Key takeaway box
4. TOC drawer trigger
5. Content sections
6. Comparison tables (swipeable on mobile)
7. Related products
8. FAQ
9. Related guides

**Reusable Components Needed:**
- `KeyTakeaway` — highlighted summary box
- `ResponsiveTable` — card view on mobile
- `ComparisonTable` — swipeable columns on mobile

**CTA Strategy:**
- Primary: "Calcular cuánta agua/energía necesito"
- Secondary: "Ver productos recomendados"

---

#### INDEX PAGE: /es/componentes/

**Current State:**
- Grid of 7 component cards

**Issues:**
| Issue | Severity |
|-------|----------|
| Emoji icons | High |
| No product preview images | Medium |
| Cards are plain | Low |

**Quick Wins:**
- Replace emoji with icons

**Medium Lifts:**
- Add product category images
- Add price range indicators

**Proposed Mobile Section Order:**
1. Breadcrumb + Title + Description
2. Component cards (2 column grid)
3. Affiliate disclosure

**Reusable Components Needed:**
- `ComponentCard` — icon/image, title, price range, key features

**CTA Strategy:**
- Each card links to component page

---

#### COMPONENT PAGES: linternas/, powerbanks/, radios-emergencia/, bidones-agua/, comida-emergencia/, botiquin-basico/, mochilas/

**Current State:**
- Product guide with types, features, recommendations
- Amazon product cards at bottom

**Issues:**
| Issue | Severity |
|-------|----------|
| H1 starts with emoji (🔦 Linternas de Emergencia) | High |
| Type cards use emoji icons | High |
| Pros/cons use ✓ Pros and ✗ Contras text | High |
| Star ratings are text (★★★★) | Medium |
| Product images are placeholder 📦 emoji | Critical |
| Tables overflow on mobile | Medium |
| "Recomendado", "Premium", "Mejor relación" badges inconsistent | Medium |

**Quick Wins:**
- Remove emoji from H1
- Replace ✓ and ✗ with icon components
- Standardize product badges

**Medium Lifts:**
- Add proper product images or category illustrations
- Create proper star rating component
- Make tables responsive

**Big Upgrades:**
- Add product comparison tool
- Add price tracking/alerts
- Add user review aggregation

**Proposed Mobile Section Order:**
1. Breadcrumb + Title (no emoji)
2. Quick recommendation box
3. Type overview cards (horizontal scroll)
4. Key features grid
5. Recommendations by tier
6. Product cards
7. Battery/maintenance info
8. Suggested kit
9. Related components

**Reusable Components Needed:**
- `ProductTypeCard` — icon, name, lumens/specs, pros/cons, best for
- `ProsCons` — proper icon + list layout
- `StarRating` — visual stars, not text
- `ProductCard` — image, name, price, rating, features, affiliate CTA
- `TierBadge` — Esencial/Recomendado/Premium with consistent colors

**CTA Strategy:**
- Primary: "Ver en Amazon" (affiliate)
- Secondary: "Volver al configurador"

---

#### POLICY PAGES: politica-editorial/, afiliados/, privacidad/, cookies/

**Current State:**
- Simple text pages with proper PolicyLayout

**Issues:**
| Issue | Severity |
|-------|----------|
| Very plain, no visual structure | Low |
| No last updated date visible | Medium |

**Quick Wins:**
- Add last updated timestamp
- Add subtle section dividers

**Medium Lifts:**
- Add sidebar navigation for long policy pages

**Proposed Mobile Section Order:**
1. Title
2. Last updated
3. Content sections
4. Contact info

**Reusable Components Needed:**
- `PolicyHeader` — title, date, version

**CTA Strategy:**
- None needed

---

## Part 2: 2026 Design System Specification

### Typography Scale

```css
/* Font Families */
--font-display: 'DM Serif Display', Georgia, serif;
--font-body: 'Source Sans 3', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Type Scale (Perfect Fourth - 1.333) */
--text-xs: 0.75rem;     /* 12px - labels, captions */
--text-sm: 0.875rem;    /* 14px - secondary text */
--text-base: 1rem;      /* 16px - body */
--text-lg: 1.125rem;    /* 18px - lead text */
--text-xl: 1.333rem;    /* ~21px - h4 */
--text-2xl: 1.777rem;   /* ~28px - h3 */
--text-3xl: 2.369rem;   /* ~38px - h2 */
--text-4xl: 3.157rem;   /* ~51px - h1 */

/* Line Heights */
--leading-tight: 1.2;   /* headings */
--leading-snug: 1.4;    /* subheadings */
--leading-normal: 1.6;  /* body */
--leading-relaxed: 1.8; /* long-form */

/* Font Weights */
--weight-normal: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;

/* Letter Spacing */
--tracking-tight: -0.02em;   /* large headings */
--tracking-normal: 0;        /* body */
--tracking-wide: 0.02em;     /* labels, buttons */
--tracking-wider: 0.05em;    /* all-caps */
```

### Spacing Scale (4px base)

```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### Border Radius

```css
--radius-none: 0;
--radius-sm: 2px;     /* subtle rounding */
--radius-md: 4px;     /* buttons, inputs, small cards */
--radius-lg: 8px;     /* cards, modals */
--radius-xl: 12px;    /* featured cards */
--radius-full: 9999px; /* pills, avatars */
```

### Shadows

```css
/* Elevation system */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.2);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.2);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.25);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.3);
--shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.35);

/* Accent glow */
--shadow-glow-sm: 0 0 8px rgba(245, 158, 11, 0.2);
--shadow-glow-md: 0 0 16px rgba(245, 158, 11, 0.25);
--shadow-glow-lg: 0 0 24px rgba(245, 158, 11, 0.3);

/* Inner shadow */
--shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.2);
```

### Color Palette

```css
/* Dark Mode (Default) */
:root {
  /* Backgrounds */
  --color-bg-base: #0f1115;        /* Page background */
  --color-bg-surface: #1a1d23;     /* Cards, sections */
  --color-bg-elevated: #252931;    /* Hover, modals */
  --color-bg-overlay: #2f343d;     /* Tooltips, dropdowns */

  /* Text */
  --color-text-primary: #f3f4f6;   /* Headings, primary */
  --color-text-secondary: #9ca3af; /* Body text */
  --color-text-tertiary: #6b7280;  /* Muted, captions */
  --color-text-inverse: #0f1115;   /* On accent backgrounds */

  /* Accent (Emergency Amber) */
  --color-accent: #f59e0b;
  --color-accent-hover: #fbbf24;
  --color-accent-active: #d97706;
  --color-accent-muted: rgba(245, 158, 11, 0.15);

  /* Semantic - Priority */
  --color-critical: #ef4444;       /* Must have */
  --color-critical-bg: rgba(239, 68, 68, 0.12);
  --color-important: #f59e0b;      /* Should have */
  --color-important-bg: rgba(245, 158, 11, 0.12);
  --color-optional: #3b82f6;       /* Nice to have */
  --color-optional-bg: rgba(59, 130, 246, 0.12);

  /* Semantic - Feedback */
  --color-success: #22c55e;
  --color-success-bg: rgba(34, 197, 94, 0.12);
  --color-warning: #f59e0b;
  --color-warning-bg: rgba(245, 158, 11, 0.12);
  --color-error: #ef4444;
  --color-error-bg: rgba(239, 68, 68, 0.12);
  --color-info: #3b82f6;
  --color-info-bg: rgba(59, 130, 246, 0.12);

  /* Borders */
  --color-border: #374151;
  --color-border-subtle: #1f2937;
  --color-border-accent: rgba(245, 158, 11, 0.4);
}

/* Light Mode (Future) */
:root.light {
  --color-bg-base: #ffffff;
  --color-bg-surface: #f9fafb;
  --color-bg-elevated: #f3f4f6;
  --color-bg-overlay: #e5e7eb;

  --color-text-primary: #111827;
  --color-text-secondary: #4b5563;
  --color-text-tertiary: #9ca3af;

  --color-border: #e5e7eb;
  --color-border-subtle: #f3f4f6;
}
```

### Icon System

**Selected Library:** Lucide Icons (lucide.dev)
- Open source, MIT license
- Consistent 24x24 grid, 2px stroke
- Tree-shakeable for small bundles
- React and SVG versions available

**Icon Usage Rules:**
1. Always use Lucide icons, never emoji
2. Default size: 20px for inline, 24px for standalone
3. Stroke width: 1.5 for 16px, 2 for 20px+
4. Color: inherit from text or use accent
5. Always include aria-hidden="true" or accessible label

**Icon Categories for Kit-72:**
```
Scenarios:     Zap, Sun, Droplet, Car, Home, Waves, CloudLightning
Categories:    Package, Flashlight, Battery, Radio, Heart, FileText
Actions:       Check, X, Plus, Minus, Download, Share, Printer
Navigation:    ChevronRight, ChevronDown, Menu, X, Search
Status:        AlertCircle, CheckCircle, Info, AlertTriangle
```

### Button Styles

```css
/* Base button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  border-radius: var(--radius-md);
  transition: all 150ms ease;
  cursor: pointer;

  /* Touch target minimum 44px */
  min-height: 44px;
}

/* Variants */
.btn-primary {
  background: var(--color-accent);
  color: var(--color-text-inverse);
  border: none;
}
.btn-primary:hover {
  background: var(--color-accent-hover);
  box-shadow: var(--shadow-glow-sm);
}

.btn-secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}
.btn-secondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border: none;
}
.btn-ghost:hover {
  color: var(--color-accent);
  background: var(--color-accent-muted);
}

/* Sizes */
.btn-sm { padding: var(--space-2) var(--space-3); min-height: 36px; }
.btn-lg { padding: var(--space-4) var(--space-6); min-height: 52px; }
```

### Input Styles

```css
.input {
  display: block;
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text-primary);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color 150ms ease, box-shadow 150ms ease;

  /* Touch target */
  min-height: 48px;
}

.input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-muted);
}

.input::placeholder {
  color: var(--color-text-tertiary);
}

/* Number input with +/- buttons */
.input-number {
  display: flex;
  align-items: stretch;
}
.input-number button {
  width: 48px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
}
.input-number input {
  text-align: center;
  border-left: none;
  border-right: none;
  border-radius: 0;
  -moz-appearance: textfield;
}
```

### Card Styles

```css
/* Base card */
.card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

/* Interactive card */
.card-interactive {
  cursor: pointer;
  transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;
}
.card-interactive:hover {
  transform: translateY(-2px);
  border-color: var(--color-border-accent);
  box-shadow: var(--shadow-glow-sm);
}

/* Accent border card */
.card-accent {
  border-left: 4px solid var(--color-accent);
}

/* Status cards */
.card-critical { border-top: 4px solid var(--color-critical); }
.card-important { border-top: 4px solid var(--color-important); }
.card-success { border-top: 4px solid var(--color-success); }
```

### Content Patterns

**Pros/Cons Block:**
```html
<div class="pros-cons">
  <div class="pros">
    <h4><Icon name="check-circle" /> Ventajas</h4>
    <ul>
      <li><Icon name="check" /> Advantage 1</li>
    </ul>
  </div>
  <div class="cons">
    <h4><Icon name="x-circle" /> Inconvenientes</h4>
    <ul>
      <li><Icon name="x" /> Disadvantage 1</li>
    </ul>
  </div>
</div>
```

**Comparison Table:**
```html
<div class="comparison-table" role="table">
  <div class="comparison-header">
    <div></div>
    <div>Básico</div>
    <div>Recomendado</div>
    <div>Premium</div>
  </div>
  <div class="comparison-row">
    <div class="feature">Feature name</div>
    <div><Icon name="check" /></div>
    <div><Icon name="check" /></div>
    <div><Icon name="check" /></div>
  </div>
</div>
```

**Callout Boxes:**
```css
.callout {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border-left: 4px solid;
}
.callout-tip {
  background: var(--color-success-bg);
  border-color: var(--color-success);
}
.callout-warning {
  background: var(--color-warning-bg);
  border-color: var(--color-warning);
}
.callout-info {
  background: var(--color-info-bg);
  border-color: var(--color-info);
}
.callout-critical {
  background: var(--color-error-bg);
  border-color: var(--color-error);
}
```

**Steps/Numbered List:**
```html
<ol class="steps">
  <li class="step">
    <span class="step-number">1</span>
    <div class="step-content">
      <h4>Step title</h4>
      <p>Step description</p>
    </div>
  </li>
</ol>
```

### Accessibility Rules

**Tap Targets:**
- Minimum 44x44px for all interactive elements
- 8px minimum gap between tap targets

**Contrast:**
- Text: minimum 4.5:1 for normal text, 3:1 for large text
- UI components: minimum 3:1 against background

**Focus States:**
- 2px solid accent outline
- 2px offset
- High visibility on all backgrounds

**Motion:**
- Respect `prefers-reduced-motion`
- No animation longer than 400ms
- No flashing content

### Micro Interactions

**Hover:**
- Cards: translateY(-2px) + glow shadow
- Buttons: background darken/lighten 10%
- Links: color transition 150ms

**Press/Active:**
- Buttons: scale(0.98)
- Cards: scale(0.99)

**Transitions:**
- Fast (focus, color): 150ms ease
- Normal (position, size): 250ms ease
- Slow (page, modal): 400ms ease-out

**Loading:**
- Skeleton shimmer for content
- Spinner for actions
- Progress bar for multi-step

---

## Part 3: Component Library

### Layout Components

#### 1. Header
**Purpose:** Global site navigation (desktop) + branding (mobile)
**Where:** All pages
**Props:**
- `currentPath`: string — highlights active nav item
**Desktop Behavior:**
- Full navigation with dropdowns
- Search icon + Configurador CTA button
**Mobile Behavior:**
- Simplified: Logo only (navigation moves to BottomNav)
- Optionally show page title or back button on inner pages

#### 2. BottomNav (NEW - Mobile Only)
**Purpose:** Primary mobile navigation — always visible, thumb-friendly
**Where:** All pages (hidden on desktop)
**Props:**
- `currentPath`: string — highlights active section
**Items:**
- Inicio (Home icon) → /es/
- Guías (FileText icon) → Opens BottomSheet with guide links
- Escenarios (Zap icon) → /es/escenarios/
- Herramientas (Wrench icon) → Opens BottomSheet with tool links
- Buscar (Search icon) → Opens SearchModal
**Mobile Behavior:**
- Fixed to bottom, 56px height
- Safe area padding for iPhone home indicator
- Active item highlighted with accent color
- Subtle top border

#### 3. BottomSheet (NEW)
**Purpose:** Slide-up menu for sub-navigation
**Where:** Triggered by BottomNav items (Guías, Herramientas)
**Props:**
- `isOpen`: boolean
- `onClose`: () => void
- `title`: string
- `items`: Array<{icon, label, description, href}>
**Mobile Behavior:**
- Slides up from bottom with backdrop
- Dismisses on tap outside or swipe down
- Max height 70vh
- Rounded top corners

#### 4. Footer
**Purpose:** Secondary navigation, legal links, trust signals
**Where:** All pages
**Props:**
- `showNewsletter`: boolean — future feature
**Mobile Behavior:**
- Accordion sections for link groups

#### 3. MobileTOCDrawer
**Purpose:** Table of contents for long articles
**Where:** Pillar pages, guides, scenarios
**Props:**
- `sections`: Array<{id, title, level}>
- `activeSection`: string — current section in view
**Mobile Behavior:**
- Floating pill button "Contenido"
- Slides up from bottom
- Dismisses on tap outside

#### 4. StickyMobileCTA
**Purpose:** Persistent call to action on mobile
**Where:** Pillar pages, scenarios, guides
**Props:**
- `label`: string
- `href`: string
- `variant`: 'primary' | 'secondary'
**Mobile Behavior:**
- Fixed to bottom
- Appears after scrolling past hero
- Hides on scroll down, shows on scroll up

#### 5. Breadcrumb
**Purpose:** Navigation hierarchy
**Where:** All inner pages
**Props:**
- `items`: Array<{label, href}>
**Mobile Behavior:**
- Truncates middle items with "..."

### Content Components

#### 6. ScenarioCard
**Purpose:** Link to scenario pages
**Where:** Homepage, /es/escenarios/
**Props:**
- `icon`: LucideIconName
- `title`: string
- `description`: string
- `href`: string
- `tags`: string[]
- `difficulty`: 'basic' | 'intermediate' | 'advanced'
- `readTime`: string
- `isComingSoon`: boolean
**Mobile Behavior:**
- Full width, stacked

#### 7. ToolCard
**Purpose:** Link to tool pages
**Where:** Homepage, /es/herramientas/
**Props:**
- `icon`: LucideIconName
- `title`: string
- `description`: string
- `href`: string
- `cta`: string
**Mobile Behavior:**
- Full width

#### 8. GuideCard
**Purpose:** Link to guide pages
**Where:** /es/guias/
**Props:**
- `icon`: LucideIconName
- `title`: string
- `description`: string
- `href`: string
- `topics`: string[]
- `readTime`: string

#### 9. ComponentCard
**Purpose:** Link to component pages
**Where:** /es/componentes/
**Props:**
- `icon`: LucideIconName
- `title`: string
- `description`: string
- `href`: string
- `priceRange`: string

#### 10. ProductCard
**Purpose:** Affiliate product recommendation
**Where:** Component pages
**Props:**
- `name`: string
- `description`: string
- `image`: string
- `amazonUrl`: string
- `price`: string
- `rating`: number (1-5)
- `features`: string[]
- `badge`: 'essential' | 'recommended' | 'premium'
**Mobile Behavior:**
- Full width

#### 11. CalloutBox
**Purpose:** Highlight important information
**Where:** All content pages
**Props:**
- `variant`: 'tip' | 'warning' | 'info' | 'critical'
- `title`: string (optional)
- `children`: ReactNode
**Slots:**
- Default slot for content

#### 12. ProsCons
**Purpose:** Compare advantages and disadvantages
**Where:** Component pages, guides
**Props:**
- `pros`: string[]
- `cons`: string[]
**Mobile Behavior:**
- Stacked vertically

#### 13. StepList
**Purpose:** Numbered instructions
**Where:** Guides, pillar pages
**Props:**
- `steps`: Array<{title, description}>
**Mobile Behavior:**
- Full width, clear numbering

#### 14. FAQAccordion
**Purpose:** Expandable FAQ section
**Where:** All content pages
**Props:**
- `items`: Array<{question, answer}>
- `schema`: boolean — adds FAQPage schema.org
**Mobile Behavior:**
- Full width, large tap targets

#### 15. ComparisonTable
**Purpose:** Compare options side by side
**Where:** Component pages, guides
**Props:**
- `headers`: string[]
- `rows`: Array<{feature, values[]}>
- `highlightColumn`: number
**Mobile Behavior:**
- Horizontal scroll with sticky first column
- OR card view toggle

#### 16. ChecklistSection
**Purpose:** Interactive checklist with categories
**Where:** Pillar pages, configurador output
**Props:**
- `category`: string
- `items`: Array<{name, quantity, priority}>
- `storageKey`: string — localStorage key
**Mobile Behavior:**
- Collapsible categories
- Large checkboxes

#### 17. ProgressIndicator
**Purpose:** Show completion progress
**Where:** Pillar pages with checklists, tools
**Props:**
- `current`: number
- `total`: number
- `criticalCurrent`: number
- `criticalTotal`: number
**Mobile Behavior:**
- Compact bar with percentage

### UI Components

#### 18. Icon
**Purpose:** Consistent icon rendering
**Where:** Everywhere
**Props:**
- `name`: LucideIconName
- `size`: number (default 20)
- `strokeWidth`: number (default 2)
- `className`: string

#### 19. Button
**Purpose:** Interactive actions
**Where:** Everywhere
**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `leftIcon`: LucideIconName
- `rightIcon`: LucideIconName
- `loading`: boolean
- `disabled`: boolean
- `asChild`: boolean — for Link usage

#### 20. Badge
**Purpose:** Status and category labels
**Where:** Cards, lists
**Props:**
- `variant`: 'critical' | 'important' | 'optional' | 'success' | 'neutral'
- `children`: ReactNode

#### 21. StarRating
**Purpose:** Display product ratings
**Where:** Product cards
**Props:**
- `rating`: number (0-5, supports 0.5)
- `showNumber`: boolean
- `size`: 'sm' | 'md'

#### 22. NumberInput
**Purpose:** Mobile-friendly number input
**Where:** Calculators, configurador
**Props:**
- `value`: number
- `onChange`: (value: number) => void
- `min`: number
- `max`: number
- `step`: number
- `label`: string

#### 23. SearchCommandPalette
**Purpose:** Site-wide search
**Where:** Header (global)
**Props:**
- `isOpen`: boolean
- `onClose`: () => void
**Mobile Behavior:**
- Full screen modal
- Recent searches
- Category filters

---

## Part 4: Navigation and IA Upgrade

### Navigation Philosophy

**Problem:** Users get lost on content-heavy sites. Hamburger menus hide navigation and increase friction.

**Solution:** Sticky bottom navigation on mobile that's always visible — like Instagram, YouTube, or any modern app. This gives users constant awareness of where they are and quick access to key sections.

### Mobile Navigation: Sticky Bottom Bar

```
┌─────────────────────────────────────────────────────┐
│                    PAGE CONTENT                      │
│                                                      │
│                                                      │
├─────────────────────────────────────────────────────┤
│  🏠      📋       ⚡       🔧       🔍              │
│ Inicio  Guías  Escenarios Herram.  Buscar           │
└─────────────────────────────────────────────────────┘
```

**5 Bottom Nav Items:**
| Icon | Label | Destination | Notes |
|------|-------|-------------|-------|
| Home | Inicio | /es/ | Homepage |
| FileText | Guías | /es/guias/ | Opens submenu sheet with all guides |
| Zap | Escenarios | /es/escenarios/ | Direct link |
| Wrench | Herramientas | /es/herramientas/ | Opens submenu with 3 tools |
| Search | Buscar | — | Opens search modal |

**Behavior:**
- Always visible at bottom (fixed position)
- 56px height (iOS safe area compatible)
- Active state shows which section you're in
- Tapping "Guías" or "Herramientas" opens a bottom sheet with sub-items
- Safe area padding for iPhone notch/home indicator

**Bottom Sheet for Guías:**
```
┌─────────────────────────────────────────────────────┐
│  Guías                                         ✕    │
├─────────────────────────────────────────────────────┤
│  📖 Kit de Emergencia              Guía completa →  │
│  🎒 Kit 72 Horas                   Mochila BOB →    │
│  💧 Almacenamiento de Agua                      →   │
│  🍽️ Almacenamiento de Comida                    →   │
│  ⚡ Energía y Comunicación                      →   │
│  🩹 Botiquín de Primeros Auxilios               →   │
├─────────────────────────────────────────────────────┤
│  Ver todos los componentes →                        │
└─────────────────────────────────────────────────────┘
```

**Bottom Sheet for Herramientas:**
```
┌─────────────────────────────────────────────────────┐
│  Herramientas                                  ✕    │
├─────────────────────────────────────────────────────┤
│  ⚙️ Configurador de Kit            Crea tu lista →  │
│  💧 Calculadora de Agua            Cuánta agua →    │
│  🔋 Calculadora de Energía         Qué powerbank →  │
└─────────────────────────────────────────────────────┘
```

### Desktop Navigation: Top Bar

**Desktop (>768px):**
```
┌─────────────────────────────────────────────────────────────────────┐
│ Kit-72    Inicio  Guías▾  Escenarios▾  Componentes  Herramientas   │
│                                                    [🔍] [Configurador]│
└─────────────────────────────────────────────────────────────────────┘
```

**Guías Dropdown:**
- Kit de Emergencia
- Kit 72 Horas
- ─────────────
- Almacenamiento de Agua
- Almacenamiento de Comida
- Energía y Comunicación
- Botiquín de Primeros Auxilios

**Escenarios Dropdown:**
- Apagón
- Ola de Calor
- Corte de Agua
- Kit de Evacuación
- ─────────────
- Próximamente: Inundación, Tormenta...

**Herramientas Link:** Goes directly to /es/herramientas/ (no dropdown)

### Why This Works Better

1. **Always visible** — No hunting for hamburger menu
2. **Thumb-friendly** — Bottom of screen is easiest reach zone
3. **Clear mental model** — 5 items max, like popular apps
4. **Search prominent** — Always one tap away
5. **Section awareness** — Active state shows where you are
6. **Progressive disclosure** — Sub-items in sheets, not nested menus

### Breadcrumb Rules

1. Always show full path (no collapsing on desktop)
2. On mobile, truncate middle items if > 3 levels
3. Current page is text only, not linked
4. Use "/" separator with proper spacing
5. First item is always "Inicio" linking to /es/

**Fix Required:** Remove duplicate "Inicio" segments in current breadcrumbs

### Site Search UX

**Implementation:** Command palette style (Cmd+K or click search icon)

**Search Scope:**
- Page titles
- Page descriptions
- Section headings
- FAQ questions

**Search Results:**
- Grouped by type (Guías, Escenarios, Componentes, Herramientas)
- Show breadcrumb path
- Keyboard navigable
- Recent searches stored locally

### Cross-Linking Rules

**Scenario Pages Must Link To:**
- Parent pillar page (/es/kit-de-emergencia/ or /es/kit-72-horas/)
- Relevant component pages (3-5)
- Related scenarios (1-2)
- Relevant calculator tool

**Component Pages Must Link To:**
- Relevant scenario pages (2-4)
- Related components (2-3)
- Parent pillar page
- Configurador tool

**Guide Pages Must Link To:**
- Related component pages (2-4)
- Relevant scenarios (2-3)
- Calculators if applicable

**Tool Pages Must Link To:**
- Related guides
- Full kit guide

---

## Part 5: Performance and SEO Foundations

### Sitemap Status
✅ sitemap-index.xml exists at https://kit-72.com/sitemap-index.xml
✅ robots.txt exists and references sitemap
✅ 30 URLs indexed

### Schema.org Strategy

**All Pages:**
- `Organization` — Kit-72 details
- `WebSite` — with SearchAction
- `BreadcrumbList` — navigation path

**Pillar Pages (kit-de-emergencia, kit-72-horas):**
- `Article`
- `FAQPage` — for FAQ sections

**Scenario Pages:**
- `Article`
- `HowTo` — for step-by-step preparation
- `FAQPage`

**Guide Pages:**
- `Article`
- `HowTo` — where applicable
- `FAQPage`

**Component Pages:**
- `Article`
- `Product` — for recommendations (with affiliate disclaimer)
- `FAQPage`

**Tool Pages:**
- `WebApplication`
- `SoftwareApplication` — type: WebApplication

### Page Speed Budgets (Mobile)

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |
| Total Blocking Time | < 200ms |
| Total Page Size | < 500KB (excluding images) |
| JavaScript Bundle | < 150KB |

### Image Rules

1. **Format:** WebP with AVIF fallback for modern browsers, JPEG fallback
2. **Lazy Loading:** All images below the fold use `loading="lazy"`
3. **Dimensions:** Always specify width and height to prevent CLS
4. **Srcset:** Provide 1x, 1.5x, 2x versions
5. **Alt Text:** Descriptive, keyword-relevant when appropriate
6. **Product Images:** 400x400 minimum, square aspect ratio
7. **Hero Images:** 1200x630 for OG sharing

---

## Part 6: Phased Execution Roadmap

### Sprint A: Design System and Component Foundations
**Duration:** 3-5 days
**Complexity:** Large
**Dependencies:** None

**Deliverables:**
1. Updated global.css with full design system tokens
2. Lucide icon integration and Icon component
3. Button component (all variants)
4. Badge component (all variants)
5. Card component base styles
6. CalloutBox component
7. Input and NumberInput components
8. StarRating component

**Acceptance Criteria:**
- All tokens documented in global.css
- Components render correctly on mobile and desktop
- Accessibility audit passes for all components
- Storybook or documentation page for components

---

### Sprint B: Template Refactors + Mobile Navigation
**Duration:** 5-7 days
**Complexity:** Large
**Dependencies:** Sprint A

**Deliverables:**
1. **BottomNav component** — Sticky bottom navigation for mobile (KEY DELIVERABLE)
2. **BottomSheet component** — Slide-up submenu for Guías/Herramientas
3. Header component update (desktop dropdowns, simplified mobile)
4. BaseLayout updates (include BottomNav, add body padding for bottom bar)
5. Breadcrumb component (fix duplicates)
6. MobileTOCDrawer component
7. ScenarioCard, GuideCard, ToolCard, ComponentCard components
8. Apply templates to all index pages

**Acceptance Criteria:**
- BottomNav visible on all mobile pages, hidden on desktop
- Active section highlighted in BottomNav
- Bottom sheets work smoothly for Guías and Herramientas
- All index pages use new card components
- No emoji icons remain
- Breadcrumbs are correct on all pages
- Body content doesn't hide behind bottom nav (proper padding)

---

### Sprint C: Tools UX Upgrade
**Duration:** 4-6 days
**Complexity:** Large
**Dependencies:** Sprint A (components)

**Deliverables:**
1. NumberInput integration in all tools
2. StepIndicator for configurador
3. Results summary card with share/save actions
4. Print stylesheet improvements
5. Loading states for all tools
6. Input validation improvements
7. Mobile touch target fixes

**Acceptance Criteria:**
- All numeric inputs use NumberInput component
- Configurador shows progress (step X of Y)
- Results can be shared via URL
- PDF/print output is clean
- Touch targets >= 44px

---

### Sprint D: Content Components and Trust
**Duration:** 4-5 days
**Complexity:** Medium
**Dependencies:** Sprint A, B

**Deliverables:**
1. ProsCons component
2. ComparisonTable component
3. ChecklistSection component with localStorage
4. ProgressIndicator component
5. FAQAccordion with schema.org
6. ProductCard updates (remove emoji, add real images/placeholders)
7. TrustBar component (sources, updated date)
8. Apply to all content pages

**Acceptance Criteria:**
- No ✓ ✗ ★ text symbols remain
- All FAQ sections have schema.org
- Product cards have proper images or icons
- Checklists save state
- Tables are mobile-friendly

---

### Sprint E: Polish and Accessibility
**Duration:** 3-4 days
**Complexity:** Medium
**Dependencies:** All previous sprints

**Deliverables:**
1. Site search implementation (SearchCommandPalette)
2. Light mode support (CSS variables)
3. Full accessibility audit and fixes
4. Performance optimization (bundle splitting, image optimization)
5. Schema.org audit and completion
6. Lighthouse audit — target 90+ all categories
7. Cross-browser testing
8. Final content review

**Acceptance Criteria:**
- Search works and finds all pages
- Light mode toggle works
- WCAG 2.1 AA compliance
- Lighthouse mobile: Performance 90+, Accessibility 100, Best Practices 100, SEO 100
- No console errors
- Works in Chrome, Firefox, Safari, Edge

---

### Sprint Summary

| Sprint | Duration | Complexity | Key Output |
|--------|----------|------------|------------|
| A | 3-5 days | Large | Design system + base components |
| B | 5-7 days | Large | Navigation + templates + index pages |
| C | 4-6 days | Large | Tools UX overhaul |
| D | 4-5 days | Medium | Content components + trust signals |
| E | 3-4 days | Medium | Search + accessibility + polish |

**Total Estimated Duration:** 19-27 days

---

## Appendix: File Changes Summary

### Files to Create

**UI Components:**
- `/src/components/ui/Icon.astro` — Lucide icon wrapper
- `/src/components/ui/Button.astro` — All button variants
- `/src/components/ui/Badge.astro` — Status/category labels
- `/src/components/ui/StarRating.astro` — Visual star ratings
- `/src/components/ui/NumberInput.tsx` — Mobile-friendly +/- input

**Layout Components:**
- `/src/components/layout/BottomNav.tsx` — **KEY: Sticky mobile navigation**
- `/src/components/layout/BottomSheet.tsx` — Slide-up submenu for mobile
- `/src/components/layout/MobileTOCDrawer.tsx` — Table of contents drawer
- `/src/components/layout/Breadcrumb.astro` — Navigation path
- `/src/components/layout/SearchModal.tsx` — Site search overlay

**Content Components:**
- `/src/components/content/ScenarioCard.astro`
- `/src/components/content/GuideCard.astro`
- `/src/components/content/ToolCard.astro`
- `/src/components/content/ComponentCard.astro`
- `/src/components/content/CalloutBox.astro`
- `/src/components/content/ProsCons.astro`
- `/src/components/content/ComparisonTable.astro`
- `/src/components/content/ChecklistSection.tsx`
- `/src/components/content/FAQAccordion.astro`
- `/src/components/content/TrustBar.astro`
- `/src/components/content/StepList.astro`

**Tool Components:**
- `/src/components/tools/ProgressIndicator.tsx`
- `/src/components/tools/ResultsCard.tsx`

### Files to Update
- `/src/styles/global.css` — full design system update
- `/src/components/layout/Header.astro` — dropdown nav, search
- `/src/components/layout/Footer.astro` — accordion on mobile
- `/src/layouts/BaseLayout.astro` — schema.org base
- `/src/layouts/ArticleLayout.astro` — TOC drawer integration
- `/src/components/content/ProductCard.astro` — icon update, image support
- `/src/components/content/ProductGrid.astro` — styling update
- `/src/components/tools/KitBuilder.tsx` — NumberInput, steps, results
- `/src/components/tools/WaterCalculator.tsx` — NumberInput, results
- `/src/components/tools/PowerCalculator.tsx` — NumberInput, results
- All page files — replace emoji, use new components

---

*Plan Version: 2.0*
*Created: 2025-12-13*
*Status: Ready for Approval*
