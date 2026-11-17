# Kit-72 Plan v2: Modern Emergency Preparedness Hub

**Document Version:** 2.0
**Created:** December 2025
**Status:** Planning

---

## 1. Product Vision for the Hub

### The Homepage Promise (One Sentence)
**"Kit-72 te guía paso a paso para prepararte ante emergencias en menos de 10 minutos."**

### The 3 Primary User Journeys

#### Journey 1: New Visitor ("I don't know where to start")
```
Landing → Scenario Quiz (30 sec) → Personalized Path → First Checklist → Bookmark/Save
```
- **Entry:** "Elige tu situación" quick selector
- **Goal:** Get them a tangible first action within 60 seconds
- **Success metric:** Time to first checklist < 2 minutes
- **Retention hook:** "Save progress" prompt before leaving

#### Journey 2: Scenario Visitor ("I heard there's a heat wave coming")
```
Scenario Card → Guided Flow (Before/During/After) → Checklist → Calculator → Purchase
```
- **Entry:** Direct scenario page or scenario selector
- **Goal:** Feel prepared with specific actions for their immediate concern
- **Success metric:** Complete checklist or use calculator
- **Retention hook:** "Other scenarios you should prepare for"

#### Journey 3: Returning Visitor ("I started my kit, what's next?")
```
Resume Progress → Continue Checklist → See Remaining Items → Complete Category
```
- **Entry:** Homepage shows "Continue where you left off"
- **Goal:** Make incremental progress on their preparedness
- **Success metric:** Checklist completion rate
- **Retention hook:** Progress visualization + achievement unlocks

### The Key Retention Loop
```
Quick Win → Save Progress → Reminder of What's Left → Return → Next Quick Win
```

**Why they come back:**
1. **Progress persistence:** Their checklists remember what they've done
2. **Clear next steps:** Always show "Tu próximo paso"
3. **Scenario relevance:** Weather/season-based nudges ("Ola de calor en 3 días")
4. **Low friction:** Resume in 1 tap, complete one item in 30 seconds

---

## 2. Information Architecture and Navigation Redesign

### Current Problems
1. Too many top-level categories (Guías, Escenarios, Componentes, Herramientas)
2. No clear entry point for beginners
3. Scenario pages are articles, not flows
4. Users get lost in content rabbit holes
5. No persistent state or progress tracking

### Proposed Hub Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        HOMEPAGE                                 │
├─────────────────────────────────────────────────────────────────┤
│  [Hero: "Prepárate en 10 minutos"]                             │
│  [Scenario Quick Selector - 4 cards, always visible]            │
│  [Continue Your Progress - if returning user]                   │
│  [Tools Spotlight - Kit Builder as primary]                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    MOBILE BOTTOM NAV (5 items)                  │
├─────────────────────────────────────────────────────────────────┤
│  Inicio | Escenarios | Mi Kit | Buscar | Más                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    DESKTOP TOP NAV                              │
├─────────────────────────────────────────────────────────────────┤
│  Logo | Escenarios ▾ | Mi Kit | Guías ▾ | [Search] | [CTA]     │
└─────────────────────────────────────────────────────────────────┘
```

### New URL Structure

```
/es/                           → Homepage with quick scenario selector
/es/empezar/                   → NEW: Guided onboarding flow (quiz → path)
/es/mi-kit/                    → NEW: Personal kit dashboard (saved progress)

/es/escenarios/
  /apagon/                     → Guided flow, not article
  /ola-calor/
  /corte-agua/
  /evacuacion/

/es/guias/
  /kit-72-horas/               → Moved here, reference content
  /kit-emergencia/             → Moved here, reference content
  /almacenamiento-agua/
  /almacenamiento-comida/
  /energia-comunicacion/
  /botiquin/

/es/productos/                  → Renamed from "componentes" (clearer)
  /linternas/
  /powerbanks/
  /etc.

/es/herramientas/
  /configurador/               → Primary tool, simplified URL
  /calculadora-agua/
  /calculadora-energia/
```

### Navigation Components Redesign

#### Mobile Bottom Nav (Simplified)
| Icon | Label | Destination | Purpose |
|------|-------|-------------|---------|
| Home | Inicio | /es/ | Return to hub |
| Alert | Escenarios | Bottom sheet with 4 scenarios | Quick access to scenarios |
| Checklist | Mi Kit | /es/mi-kit/ | Personal progress dashboard |
| Search | Buscar | Search overlay | Find anything |
| Menu | Más | Bottom sheet | Guías, Productos, Legal |

**Key change:** "Herramientas" is not a nav item; tools are surfaced contextually.

#### Desktop Top Nav
- **Escenarios** dropdown: 4 scenarios with icons, no descriptions (faster)
- **Mi Kit** direct link: Opens personal dashboard
- **Guías** dropdown: Reference guides grouped logically
- **Search** icon: Opens search overlay
- **CTA button:** "Empezar" (changes to "Continuar" for returning users)

### Clear "Start Here" Entry Point

**New component: ScenarioQuickPicker**
- Always visible on homepage (above the fold on mobile)
- 4 cards, horizontal scroll on mobile
- One tap = immediate entry into that scenario flow
- Visual: Large touch targets (min 80px height), clear icons

**New page: /es/empezar/ (Guided Onboarding)**
```
Step 1: "¿Cuántas personas?"
  → [1] [2] [3] [4+]

Step 2: "¿Mascotas?"
  → [No] [Sí, perro] [Sí, gato] [Ambos]

Step 3: "¿Qué te preocupa más?"
  → [Apagón] [Ola calor] [Corte agua] [Evacuación]

Step 4: "Tu Kit Personalizado"
  → [Ver mi checklist]
```
Total time: 30 seconds. Result: Personalized checklist ready.

### Scenarios as Guided Flows, Not Articles

**Current problem:** Scenario pages are 400+ lines of content. Too much to scan.

**New structure for each scenario page:**
```
┌─────────────────────────────────────┐
│ Header: Scenario name + icon        │
│ Quick Stats: 3 key numbers          │
│ [Tab: Antes | Durante | Después]    │
├─────────────────────────────────────┤
│ Phase content (collapsed by default)│
│ - Step 1 (expandable)               │
│ - Step 2 (expandable)               │
│ - Step 3 (expandable)               │
├─────────────────────────────────────┤
│ Sticky CTA: "Ver Checklist →"       │
└─────────────────────────────────────┘
```

Each step: Title + 1-line summary + [Expand for details]

### Rules for Cross-Linking (No Rabbit Holes)

1. **Maximum 2 internal links per section** (not counting nav)
2. **Every link must be a logical next step**, not a tangent
3. **Use "Related" blocks at page end**, not inline links
4. **Calculators link to purchasing guides**, not more reading
5. **Checklists link to product pages**, not other guides
6. **"Más info" links open in drawer/modal**, not new page

### On-Site Search Plan

**What it searches:**
- Scenario titles and key terms
- Guide titles and section headings
- Product names and features
- Tool names
- FAQ questions

**What it does NOT index:**
- Full article body text (too noisy)
- Legal pages
- Image alt text

**Search Results Layout:**
```
┌─────────────────────────────────────┐
│ 🔍 "agua"                           │
├─────────────────────────────────────┤
│ ESCENARIOS                          │
│ • Corte de Agua                     │
│                                     │
│ HERRAMIENTAS                        │
│ • Calculadora de Agua               │
│                                     │
│ GUÍAS                               │
│ • Almacenamiento de Agua            │
│                                     │
│ PRODUCTOS                           │
│ • Bidones de Agua                   │
│ • Pastillas potabilizadoras         │
└─────────────────────────────────────┘
```

Search results grouped by category, 3 max per category, keyboard navigable.

---

## 3. Page Templates (Not Wikipedia)

### Template 1: Homepage

**Purpose:** Orient, guide, convert to first action

**Mobile Section Order:**
1. **Hero** (always visible)
   - Headline: "Prepárate para emergencias"
   - Subheadline: One sentence
   - CTA: "Empezar ahora" → /es/empezar/
   - Secondary: "Ya tengo kit" → /es/mi-kit/

2. **Returning User Block** (conditional, if localStorage has progress)
   - "Continúa donde lo dejaste"
   - Progress ring + category
   - Direct resume button

3. **Scenario Quick Picker** (always visible)
   - 4 cards, horizontal scroll
   - Icon + title + "X min" estimate
   - No descriptions (too long for mobile)

4. **Trust Stats** (visible)
   - 3 numbers: "72h autonomía", "3L/día", "15 items"

5. **Featured Tool** (visible)
   - Kit Configurador spotlight
   - Screenshot/preview
   - Single CTA

6. **Social Proof / Sources** (collapsed)
   - "Basado en Protección Civil y Cruz Roja"
   - Expandable for detail

**Collapsible:** Social proof
**Always visible:** Hero, scenarios, stats, tool
**Primary CTA:** "Empezar ahora"

---

### Template 2: Scenario Page (Guided Checklist Flow)

**Purpose:** Walk user through preparation phases with actionable steps

**Mobile Section Order:**
1. **Scenario Header**
   - Icon + title + difficulty badge
   - "X min" read time
   - No description (too much text)

2. **TL;DR Card** (always visible)
   - 3-line summary max
   - Key number (e.g., "Prepara para 72h")

3. **Phase Tabs** (sticky when scrolling)
   - [Antes] [Durante] [Después]
   - Visual indicator of current phase

4. **Phase Content** (progressive disclosure)
   - Steps as collapsed cards
   - Number + title + expand icon
   - Expanded: 2-3 sentences + bullet points

5. **Quick Checklist** (collapsible, default collapsed)
   - Category-grouped items
   - Checkboxes (saved to localStorage)
   - Priority indicators

6. **Warning Box** (if critical, always visible)
   - Red border
   - Icon + short text

7. **Sticky Bottom CTA**
   - "Abrir Checklist Completo" → Kit Builder with scenario preset

**Collapsible:** Steps, full checklist, FAQs
**Always visible:** TL;DR, phase tabs, sticky CTA
**Primary CTA:** "Ver mi Checklist"

---

### Template 3: Kit Guide (Step-by-Step Build)

**Purpose:** Reference guide for building complete kit

**Mobile Section Order:**
1. **Header**
   - Title + breadcrumb
   - Last updated + read time

2. **Budget Selector** (interactive, always visible)
   - [Básico ~200€] [Estándar ~400€] [Premium ~600€]
   - Updates recommendations below

3. **Category Navigation** (sticky horizontal scroll)
   - [Agua] [Comida] [Luz] [Energía] [Botiquín] [Docs]
   - Scroll-to-section on tap

4. **Category Sections** (collapsed by default)
   - Category icon + title + item count
   - Expand: Item cards with:
     - Name + quantity + priority
     - Amazon link button
     - Notes (collapsed)

5. **Total Summary Card** (always visible)
   - Total items: X
   - Estimated cost: ~XXX€
   - "Añadir todo a mi kit" button

6. **Print/Export Section**
   - PDF download
   - Copy to clipboard
   - Share link

**Collapsible:** Category sections, item notes
**Always visible:** Budget selector, category nav, total summary
**Primary CTA:** "Añadir a mi Kit" (saves to localStorage)

---

### Template 4: Component Page (What to Buy)

**Purpose:** Help user make a purchase decision quickly

**Mobile Section Order:**
1. **Header**
   - Product type + icon
   - "X productos comparados"

2. **Quick Answer Card** (always visible, highlighted)
   - "Nuestra recomendación:"
   - Product name + price + Amazon link
   - 1-line reason why

3. **Comparison Criteria** (collapsed, expand on tap)
   - [Capacidad] [Precio] [Durabilidad] [Portabilidad]
   - Each criterion: What it means + what to look for

4. **Product Grid** (visible, 3 max above fold)
   - Cards: Image placeholder + name + price + rating
   - Badge: "Mejor precio" / "Mejor calidad" / "Recomendado"
   - Amazon button per card

5. **Buying Guide Checklist** (collapsed)
   - "Qué buscar al comprar"
   - Bullet points with checkboxes

6. **Related Tools Link**
   - "Calcula cuántos necesitas →"

**Collapsible:** Criteria explanation, buying guide
**Always visible:** Quick answer, product grid
**Primary CTA:** Amazon button on recommended product

---

### Template 5: Tool Page (Calculator/Builder)

**Purpose:** Interactive utility, results-focused

**Mobile Section Order:**
1. **Tool Header**
   - Tool name + icon
   - 1-line description

2. **Input Section** (always visible)
   - Minimal inputs (5 max visible at once)
   - Big touch targets
   - Real-time calculation

3. **Results Section** (visible after first input)
   - Primary number (large)
   - Secondary breakdown (collapsed)
   - Visual representation (progress ring/bar)

4. **Recommendation Card** (visible)
   - "Basado en tus datos, necesitas:"
   - Product suggestion with Amazon link

5. **Save/Export Bar** (sticky bottom)
   - "Guardar" → localStorage
   - "Imprimir" → PDF
   - "Compartir" → URL with params

**Collapsible:** Detailed breakdown, methodology explanation
**Always visible:** Inputs, primary result, recommendation
**Primary CTA:** "Guardar mis cálculos" + product link

---

## 4. Page-by-Page Audit with Hub Rewrite Plan

### Homepage (/es/)

**Current state:** Hero + scenarios grid + tools grid + trust section + CTA
**Current problems:**
- Too much content before user can act
- Scenarios have descriptions (too long on mobile)
- No returning user recognition
- Tools section is generic

**Hub rewrite:**
| Section | Change |
|---------|--------|
| Hero | Simplify to 1 headline + 1 subheadline + 1 CTA |
| Badge | Remove "Guías actualizadas 2025" - feels generic |
| Scenarios | Remove descriptions, icon + title + "X min" only |
| Returning user | Add conditional block if localStorage has data |
| Tools | Spotlight only Kit Configurador, remove others |
| Trust section | Collapse by default, show 1 line summary |
| Stats | Keep, move closer to hero |
| Final CTA | Change to "¿No sabes por dónde empezar? →" |

**New elements needed:**
- [ ] Returning user recognition component
- [ ] Simplified scenario cards (compact variant)
- [ ] Tool spotlight component

---

### Scenario: Apagón (/es/escenarios/prepararse-apagon/)

**Current state:** 477 lines, full article with TOC, checklists, FAQs
**Current problems:**
- Wall of text on mobile
- TOC sidebar not mobile-friendly
- Checklist is not interactive
- No clear "what to do NOW" action

**Hub rewrite:**
| Section | Change |
|---------|--------|
| TOC | Remove sidebar, use sticky phase tabs instead |
| TL;DR box | Keep, move to top, make more prominent |
| "Tipos de apagón" | Collapse into expandable section |
| Phases | Convert to tabs: Antes/Durante/Después |
| Phase content | Each step becomes collapsible card |
| Checklist | Make interactive with checkboxes, save to localStorage |
| Special situations | Collapse into FAQ-style accordion |
| FAQs | Keep as accordion, move to bottom |
| Sources | Collapse into "Ver fuentes" link |
| CTA | Add sticky bottom bar "Ver mi Checklist →" |

**New section order:**
1. Header + TL;DR
2. Phase tabs (sticky)
3. Phase content (collapsible steps)
4. Warning box (if applicable)
5. Interactive checklist (collapsed)
6. FAQs (collapsed)
7. Related scenarios
8. Sticky CTA

---

### Scenario: Ola de Calor (/es/escenarios/prepararse-ola-calor/)

**Apply same transformation as Apagón:**
- Phase tabs
- Collapsible steps
- Interactive checklist
- Sticky CTA
- Remove inline TOC

---

### Scenario: Corte de Agua (/es/escenarios/prepararse-corte-agua/)

**Apply same transformation as Apagón:**
- Emphasize Water Calculator in CTA
- Link to water storage guide in "Related"

---

### Scenario: Evacuación (/es/escenarios/kit-evacuacion/)

**Apply same transformation, plus:**
- Add "Grab & Go" checklist variant (15-minute version)
- Prominent "Documents checklist" section
- Map integration placeholder (evacuation routes)

---

### Guide: Kit de Emergencia (/es/kit-de-emergencia/)

**Current state:** Comprehensive reference article
**Hub rewrite:**
- Move to /es/guias/kit-emergencia/
- Convert to Budget Tier format
- Add interactive total calculator
- Link heavily to component pages
- Remove inline product recommendations (move to component pages)

---

### Guide: Kit 72 Horas (/es/kit-72-horas/)

**Current state:** Detailed kit breakdown
**Hub rewrite:**
- Move to /es/guias/kit-72-horas/
- Merge overlapping content with Kit de Emergencia
- Make this the "printable checklist" version
- Add "Add all to my kit" button

---

### Guides Hub (/es/guias/)

**Current state:** Card grid with learning path
**Hub rewrite:**
- Simplify to just cards (remove learning path section)
- Add filter: [Todos] [Agua] [Comida] [Energía] [Salud]
- Remove intro box (redundant)
- Quick stats section: keep but simplify

---

### Component Pages (/es/componentes/*)

**Current state:** Article format with inline products
**Hub rewrite for all component pages:**
- Rename section to "Productos"
- Lead with "Nuestra recomendación" card
- Product grid: max 6 products
- Remove article-style paragraphs
- Add comparison table (collapsed)
- Buying guide as checklist
- Prominent Amazon buttons

**Specific page changes:**

| Page | Key Change |
|------|------------|
| /linternas/ | Add lumen comparison chart |
| /powerbanks/ | Link to Energy Calculator |
| /radios-emergencia/ | Simplify, fewer options |
| /bidones-agua/ | Link to Water Calculator |
| /comida-emergencia/ | Add calorie calculator |
| /botiquin-basico/ | Make checklist interactive |
| /mochilas/ | Add capacity guide visual |

---

### Components Hub (/es/componentes/)

**Current state:** Grid + priority order + budget
**Hub rewrite:**
- Rename to /es/productos/
- Keep budget overview (simplified)
- Remove priority order section (move to Kit Configurador)
- Grid only, no extra content
- Add category filter tabs

---

### Tools Hub (/es/herramientas/)

**Current state:** 3-card grid with benefits
**Hub rewrite:**
- Remove benefits section (obvious)
- Feature Kit Configurador prominently (larger card)
- Calculators as secondary row
- Add "Coming soon" placeholder for future tools
- Remove breadcrumb (not needed)

---

### Kit Configurador (/es/herramientas/configurador-kit/)

**Current state:** Complex multi-step builder
**Hub rewrite:**
- Simplify initial selection (fewer options upfront)
- Add scenario presets as quick start
- Progress persistence to localStorage
- Clearer progress indicator
- "Export to PDF" more prominent
- Amazon links per item (already added)

---

### Calculators (Water/Energy)

**Current state:** Well-designed interactive tools
**Hub rewrite:**
- Add "Save to my kit" integration
- Add product recommendations based on results
- Simplify input groupings
- More prominent share/print

---

### Legal Pages (Privacy, Cookies, Editorial, Affiliates)

**Keep as-is.** These are compliant and don't need hub treatment.
- Ensure all have consistent PolicyLayout
- Add "Back to home" link at bottom

---

## 5. UX Features to Prevent Overwhelm

### 5.1 "You Are Here" Breadcrumb + Progress States

**Breadcrumb redesign:**
```
Current:  Inicio / Escenarios / Prepararse para un Apagón
New:      ← Escenarios  ·  Apagón  ·  Fase 2 de 3
```
- Back arrow for primary navigation
- Current page title
- Progress indicator when applicable

**Progress states for scenario flows:**
```
┌────────────────────────────────────┐
│ [●] Antes  [◐] Durante  [○] Después │
│  ▲ current                          │
└────────────────────────────────────┘
```
- Filled = completed sections read
- Half-filled = current section
- Empty = not started

### 5.2 Sticky "Next Action" Bar on Mobile

**Component: StickyActionBar**
```
┌────────────────────────────────────┐
│ Tu próximo paso:                   │
│ [Ver Checklist de Apagón →]        │
└────────────────────────────────────┘
```
- Appears after scrolling past hero
- Contextual based on page type
- Dismissible (remembers dismissal)
- Can show progress: "3 de 15 items completados"

### 5.3 Quick Scenario Selector (Persistent Entry)

**Component: ScenarioQuickAccess**
- FAB (floating action button) on bottom right
- Opens scenario selector overlay
- Available on all pages except scenario pages themselves
- Icon: Lightning bolt or compass

**Alternative: Add to bottom nav**
- "Escenarios" in bottom nav opens bottom sheet with 4 scenarios
- No need for FAB

### 5.4 "Save My Progress" Local Persistence

**What gets saved (localStorage):**
```javascript
{
  "kit72_progress": {
    "lastVisit": "2025-12-15T10:30:00Z",
    "scenarios": {
      "apagon": { "sectionsRead": ["antes", "durante"], "checklistDone": 5 }
    },
    "checklist": {
      "items": { "linterna-led": true, "powerbank": false, ... },
      "lastCategory": "iluminacion"
    },
    "calculators": {
      "water": { "people": 2, "days": 3, "result": 18 },
      "power": { "devices": ["smartphone", "lantern"], "result": 15000 }
    },
    "preferences": {
      "people": 2,
      "pets": { "dogs": 1, "cats": 0 },
      "scenario": "apagon"
    }
  }
}
```

**UI for saved progress:**
- Homepage: "Continúa donde lo dejaste" block
- Checklist pages: Checkboxes pre-filled
- Calculators: Last inputs pre-filled
- "Borrar mis datos" in settings/footer

### 5.5 Read Time and "Last Updated" Trust Markers

**Display format:**
```
┌────────────────────────────────────┐
│ Actualizado: dic 2025 · 8 min      │
│ Fuentes: Protección Civil, AEMET  │
└────────────────────────────────────┘
```
- Show on all guide/scenario pages
- "Last updated" as relative date on mobile
- Sources as collapsed list
- Add schema.org markup for SEO

### 5.6 Print and Offline Options

**Print button placement:**
- Top right of checklist sections
- In sticky action bar
- Icon: Printer

**Print stylesheet requirements:**
- Remove navigation, footer, non-essential UI
- Expand all collapsed sections
- Checkboxes as empty squares
- Include QR code back to page
- Page breaks between categories

**Offline capability (PWA enhancement):**
- Cache all scenario and guide pages
- Show "Available offline" badge
- Sync checklist progress when online

---

## 6. Visual System Direction

### 6.1 Icon System

**Decision: Continue with Lucide icons (already implemented)**

**Rules:**
- Use icons only for: navigation, categories, actions, status
- Never use icons as decoration
- Maximum 1 icon per card/button
- Consistent size per context: 16px (inline), 20px (buttons), 24px (cards), 32px (features)
- Color: Use accent color for active/interactive, muted for passive

**Icon mapping:**
| Concept | Icon | Usage |
|---------|------|-------|
| Apagón | Zap | Scenario card |
| Ola calor | Sun | Scenario card |
| Corte agua | Droplet | Scenario card |
| Evacuación | Car | Scenario card |
| Checklist | CheckSquare | Navigation |
| Calculator | Calculator | Tool cards |
| Print | Printer | Action button |
| Save | Save | Action button |
| External link | ExternalLink | Amazon buttons |
| Warning | AlertTriangle | Warning boxes |
| Critical | AlertCircle | Priority badge |
| Success | CheckCircle | Completion state |

### 6.2 Typography and Spacing Rules

**Font stack (keep current):**
- Display: DM Serif Display (headings)
- Body: Source Sans 3 (text)
- Mono: JetBrains Mono (numbers, data)

**Spacing for scannability:**
- Minimum line-height: 1.5 for body text
- Paragraph spacing: 1.5em between paragraphs
- Section spacing: 3rem (48px) between major sections
- Card padding: 1.5rem (24px) minimum
- List item spacing: 0.75rem (12px)

**Typography scale:**
| Element | Mobile | Desktop |
|---------|--------|---------|
| H1 | 1.75rem / 28px | 2.5rem / 40px |
| H2 | 1.5rem / 24px | 2rem / 32px |
| H3 | 1.25rem / 20px | 1.5rem / 24px |
| Body | 1rem / 16px | 1.125rem / 18px |
| Small | 0.875rem / 14px | 0.875rem / 14px |
| Caption | 0.75rem / 12px | 0.75rem / 12px |

### 6.3 Card System and Callouts

**Card variants:**

1. **Standard Card** (current .card class)
   - Use for: content containers, product cards
   - Background: bg-secondary with subtle border
   - Hover: lift effect + border accent

2. **Interactive Card** (.card-interactive)
   - Use for: clickable cards, scenario cards
   - Same as standard + cursor pointer
   - Hover: more pronounced lift

3. **Highlight Card** (.card-highlight)
   - Use for: recommendations, TL;DR blocks
   - Left border accent (4px)
   - Subtle accent background tint

**Callout types:**

| Type | Left Border | Icon | Use Case |
|------|-------------|------|----------|
| Tip | Green | Lightbulb | Helpful advice |
| Warning | Amber | AlertTriangle | Caution needed |
| Critical | Red | AlertCircle | Safety critical |
| Info | Blue | Info | Additional context |

**Callout format:**
```
┌─[Icon] Title (optional)─────────────┐
│ Content text, 2 lines max           │
│ for scannability.                   │
└────────────────────────────────────┘
```

### 6.4 Dark Mode vs Light Mode Strategy

**Decision: Dark mode only (current state)**

**Rationale:**
- Emergency content often consumed at night
- Reduces eye strain for extended reading
- Premium, modern feel
- Simpler to maintain

**If light mode requested later:**
- Use CSS custom properties (already set up)
- Add prefers-color-scheme detection
- Add manual toggle in footer/settings
- Test all components in both modes

### 6.5 Imagery Plan

**Current state:** No images, icon-based UI

**Recommended approach:**
1. **No stock photos** - they feel generic and reduce trust
2. **Product images from Amazon** - only on product pages, lazy loaded
3. **Simple illustrations** - consider for empty states, onboarding
4. **Diagrams** - for complex concepts (e.g., water storage setup)
5. **Screenshots** - for tool previews

**Image specifications:**
- Format: WebP with JPEG fallback
- Max width: 400px for inline, 800px for full-width
- Lazy loading: Always
- Alt text: Descriptive, in Spanish

**Illustration style (if added):**
- Line art, single accent color
- Minimal, not cartoonish
- Consistent stroke weight
- Used sparingly (onboarding, 404, empty states)

---

## 7. Content Rules (Anti-AI-Slop)

### 7.1 Paragraph and Text Rules

**Maximum paragraph length:** 3 sentences or 60 words, whichever is shorter

**Bullet usage:**
- Use bullets for 3+ items in a list
- Maximum 7 bullets per list
- Each bullet: 1 line preferred, 2 lines max
- Start bullets with action verbs when listing steps

**Spacing:**
- Empty line between paragraphs
- Section breaks: horizontal rule or extra spacing
- No walls of text ever

### 7.2 TL;DR Blocks

**Required on:** All scenario pages, all guide pages over 500 words

**Format:**
```
┌─ En resumen ───────────────────────┐
│ [2-3 sentences max]                │
│ [Key number or fact highlighted]   │
└────────────────────────────────────┘
```

**Example:**
```
En resumen: Un apagón puede durar minutos o días. Prepara iluminación
(linternas), energía (powerbanks) y comida sin cocinar. 72 horas de
autonomía te cubre la mayoría de escenarios.
```

### 7.3 "Do This Now" Action Blocks

**Component: ActionBlock**
```
┌─ Hazlo ahora ──────────────────────┐
│ ☐ Localiza tu linterna principal   │
│ ☐ Comprueba que las pilas funcionan│
│ ☐ Guarda este número: 900 XXX XXX  │
│                                     │
│        [Marcar como hecho]          │
└────────────────────────────────────┘
```

**Usage:**
- At the end of each "Antes" phase section
- Interactive checkboxes (saved to localStorage)
- 3-5 actions max
- Immediate, concrete actions only

### 7.4 Content Deduplication Rules

**No repetition across pages:**
- Each concept explained once, in one place
- Other pages link to the canonical explanation
- If duplicating, use components (not copy-paste)

**Cross-reference format:**
```
Para más detalles sobre almacenamiento, consulta nuestra
[guía de almacenamiento de agua →](/es/guias/almacenamiento-agua/)
```
Never: Repeat the same 3 paragraphs on multiple pages.

### 7.5 Tone and Voice

**Language:** Spanish (Spain), tuteo (tú form)

**Tone:**
- Calm and competent (not alarmist)
- Practical (not theoretical)
- Direct (not hedging)
- Helpful (not preachy)

**Word choice:**
| Avoid | Use instead |
|-------|-------------|
| "Deberías considerar..." | "Haz esto:" |
| "Es importante destacar que..." | (just say the thing) |
| "En caso de que ocurra..." | "Si ocurre..." |
| "Potencialmente" | (delete) |
| "Básicamente" | (delete) |
| "Por supuesto" | (delete) |

**No dramatic language:**
- Never: "catástrofe", "apocalipsis", "supervivencia extrema"
- Use: "emergencia", "corte de suministro", "situación"

---

## 8. Implementation Roadmap

### Sprint A: Navigation + Templates + Design System
**Duration:** 1-2 weeks
**Focus:** Foundation for hub experience

**Deliverables:**
1. [ ] New mobile bottom nav with "Mi Kit" instead of "Herramientas"
2. [ ] Scenario quick selector component
3. [ ] Sticky action bar component
4. [ ] Phase tabs component for scenarios
5. [ ] Collapsible section component (if not exists)
6. [ ] Updated homepage with new layout
7. [ ] Breadcrumb redesign with progress indicators
8. [ ] Card system variants (highlight, interactive)

**Acceptance criteria:**
- Homepage loads in <2 seconds on 3G
- Scenario selector visible above fold on iPhone SE
- All new components pass accessibility audit
- localStorage schema defined and documented

**Dependencies:** None

---

### Sprint B: Scenario Flows + Checklist Persistence
**Duration:** 1-2 weeks
**Focus:** Transform scenarios from articles to guided flows

**Deliverables:**
1. [ ] Convert Apagón page to new template
2. [ ] Convert Ola de Calor page
3. [ ] Convert Corte de Agua page
4. [ ] Convert Evacuación page
5. [ ] Interactive checklist component with localStorage
6. [ ] "Save progress" system implementation
7. [ ] Returning user recognition on homepage
8. [ ] TL;DR block component

**Acceptance criteria:**
- Each scenario completable in <5 minutes
- Checklist state persists across sessions
- Homepage shows "Continue" for returning users
- Phase tabs work smoothly on mobile

**Dependencies:** Sprint A completed

---

### Sprint C: Kit Builder UX Overhaul
**Duration:** 1 week
**Focus:** Simplify and enhance the Kit Configurador

**Deliverables:**
1. [ ] Scenario preset quick starts
2. [ ] Simplified initial flow (reduce steps)
3. [ ] Integration with localStorage progress system
4. [ ] Enhanced PDF export with QR code
5. [ ] "Add to my kit" from any product page
6. [ ] Progress sync across tools

**Acceptance criteria:**
- Time to first checklist <60 seconds
- PDF export includes all selected items
- Preset selection reduces inputs needed by 50%

**Dependencies:** Sprint B completed

---

### Sprint D: Product Pages + Buying Guides
**Duration:** 1 week
**Focus:** Convert component pages to purchasing-focused guides

**Deliverables:**
1. [ ] New product page template
2. [ ] "Quick recommendation" card component
3. [ ] Comparison table component
4. [ ] Update all 7 component pages to new format
5. [ ] Rename section to "Productos" in nav
6. [ ] Connect products to calculator results

**Acceptance criteria:**
- Primary recommendation visible without scrolling
- Amazon buttons have clear calls to action
- Comparison tables collapse properly on mobile

**Dependencies:** None (can parallel with B/C)

---

### Sprint E: Polish, Accessibility, Performance, SEO
**Duration:** 1 week
**Focus:** Quality and discoverability

**Deliverables:**
1. [ ] Full accessibility audit and fixes
2. [ ] Performance optimization (Core Web Vitals)
3. [ ] Schema.org structured data for all pages
4. [ ] Print stylesheet implementation
5. [ ] Search implementation (basic)
6. [ ] 404 page improvement
7. [ ] Final content review for AI slop

**Acceptance criteria:**
- Lighthouse scores: Performance >90, Accessibility 100
- All pages have valid schema.org markup
- Print output is clean and usable
- Search returns relevant results for top 20 queries

**Dependencies:** All previous sprints

---

### Future Sprints (Backlog)

**Sprint F: PWA Enhancement**
- Full offline support
- Push notifications for weather alerts
- Install prompt optimization

**Sprint G: Advanced Search**
- Full-text search
- Filters by category
- Recent searches

**Sprint H: Personalization**
- User profiles (optional account)
- Personalized recommendations
- Reminders system

**Sprint I: Community Features**
- User-submitted tips
- Local resource mapping
- Neighbor network concept

---

## Appendix: Component Inventory for Hub

### New Components Needed

| Component | Priority | Sprint |
|-----------|----------|--------|
| ScenarioQuickPicker | High | A |
| StickyActionBar | High | A |
| PhaseTabs | High | A |
| CollapsibleSection | High | A |
| InteractiveChecklist | High | B |
| TLDRBlock | Medium | B |
| ActionBlock | Medium | B |
| QuickRecommendation | Medium | D |
| ComparisonTable | Medium | D |
| ProgressRing (small) | Medium | B |
| SaveProgressPrompt | Medium | B |
| SearchOverlay | Low | E |
| PrintButton | Low | E |

### Existing Components to Modify

| Component | Modification | Sprint |
|-----------|--------------|--------|
| BottomNav.tsx | Change "Herramientas" to "Mi Kit" | A |
| Header.astro | Simplify nav, add progress state | A |
| ScenarioCard.astro | Compact variant without description | A |
| ProductCard.astro | Add "Add to kit" button | C |
| KitBuilder.tsx | Add presets, simplify flow | C |

---

## Appendix: Content Migration Checklist

### Pages to Redirect

| Old URL | New URL |
|---------|---------|
| /es/kit-de-emergencia/ | /es/guias/kit-emergencia/ |
| /es/kit-72-horas/ | /es/guias/kit-72-horas/ |
| /es/componentes/* | /es/productos/* |

### Pages to Create

| New URL | Purpose |
|---------|---------|
| /es/empezar/ | Guided onboarding flow |
| /es/mi-kit/ | Personal progress dashboard |

### Pages to Merge

Consider merging:
- kit-de-emergencia + kit-72-horas → Single comprehensive kit guide
- Individual calculators → Single "Calculators" page with tabs

---

*End of Plan v2 Document*
