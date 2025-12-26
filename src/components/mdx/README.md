# MDX Components for Kit-72

This directory contains reusable components for MDX content files.

## Available Components

### Callout

Highlighted boxes for tips, warnings, and important information.

```mdx
import Callout from '../../../components/mdx/Callout.astro';

<Callout type="info">
This is an informational message.
</Callout>

<Callout type="tip" title="Pro Tip">
A helpful suggestion with a custom title.
</Callout>

<Callout type="warning" title="Warning">
Something to be careful about.
</Callout>

<Callout type="danger" title="Danger">
Critical safety information.
</Callout>
```

**Props:**
- `type`: 'info' | 'tip' | 'warning' | 'danger' (default: 'info')
- `title`: Optional title text

---

### ChecklistItem

Interactive checklist item with localStorage persistence.

```mdx
import ChecklistItem from '../../../components/mdx/ChecklistItem.astro';

<ChecklistItem
  id="linterna-led"
  label="Linterna LED potente"
  quantity="1-2 unidades"
  notes="Evita linternas de bombilla"
  priority="critical"
  storageKey="my-checklist"
/>
```

**Props:**
- `id`: Unique identifier (required)
- `label`: Item text (required)
- `quantity`: Recommended quantity
- `notes`: Additional notes
- `priority`: 'critical' | 'recommended' | 'optional' (default: 'recommended')
- `storageKey`: localStorage key prefix (default: 'mdx-checklist')

---

### ProductCard

Embedded product recommendation with affiliate link.

```mdx
import ProductCard from '../../../components/mdx/ProductCard.astro';

<ProductCard
  name="Botiquín Completo 120 Piezas"
  description="Kit de primeros auxilios completo"
  price="~25€"
  rating={4.5}
  features={['120 piezas', 'Bolsa organizadora']}
  amazonUrl="https://www.amazon.es/s?k=botiquin"
  badge="recommended"
/>
```

**Props:**
- `name`: Product name (required)
- `amazonUrl`: Amazon affiliate link (required)
- `description`: Short description
- `price`: Price string
- `rating`: Star rating (0-5)
- `features`: Array of feature strings
- `badge`: 'recommended' | 'best-value' | 'premium'
- `image`: Product image URL

---

### ComparisonCard

Pros/cons comparison card for options.

```mdx
import ComparisonCard from '../../../components/mdx/ComparisonCard.astro';

<ComparisonCard
  title="Botellas comerciales (1.5-2L)"
  icon="🍶"
  capacity="1.5-2L"
  duration="1-2 años"
  pros={['Ya potabilizada', 'Fácil rotación']}
  cons={['Coste alto', 'Mucho plástico']}
  bestFor="Agua de bebida, kit de evacuación"
/>
```

**Props:**
- `title`: Card title (required)
- `pros`: Array of advantages (required)
- `cons`: Array of disadvantages (required)
- `bestFor`: Best use case (required)
- `icon`: Emoji or icon
- `capacity`: Capacity string
- `duration`: Duration/lifespan string

---

### DataTable

Styled table wrapper with responsive scrolling.

```mdx
import DataTable from '../../../components/mdx/DataTable.astro';

<DataTable>
  | Column 1 | Column 2 |
  |----------|----------|
  | Value 1  | Value 2  |
</DataTable>
```

Or use standard Markdown tables directly - they're styled automatically.

---

### Calculator

Embed the water or power calculator.

```mdx
import Calculator from '../../../components/mdx/Calculator.astro';

<Calculator type="water" locale="es" />

<Calculator type="power" locale="es" compact />
```

**Props:**
- `type`: 'water' | 'power' (required)
- `locale`: 'es' | 'nl' | 'de' (default: 'es')
- `compact`: Boolean for smaller layout

---

## Usage in Content Collections

When creating MDX files in `src/content/`, import components at the top of the file:

```mdx
---
title: My Guide
locale: es
# ... other frontmatter
---

import Callout from '../../../components/mdx/Callout.astro';
import ChecklistItem from '../../../components/mdx/ChecklistItem.astro';

# My Guide Content

<Callout type="tip">
This is a helpful tip!
</Callout>

## Checklist

<ChecklistItem id="item-1" label="First item" priority="critical" />
<ChecklistItem id="item-2" label="Second item" priority="recommended" />
```

## Styling Notes

- All components use CSS custom properties for theming
- Components are designed to work within prose contexts
- Use `not-prose` class to escape typography styles when needed
- Components are mobile-responsive by default
