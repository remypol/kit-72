/**
 * Astro Content Collections Configuration
 *
 * Defines schemas for structured content types:
 * - guides: Educational emergency preparation guides
 * - scenarios: Emergency scenario response guides
 * - products: Product recommendation pages
 */

import { defineCollection, z } from 'astro:content';

// Supported locales
const localeEnum = z.enum(['es', 'nl', 'de']);

// Common FAQ item schema
const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

// Common breadcrumb schema
const breadcrumbSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
});

// Priority levels for checklist items
const priorityEnum = z.enum(['critical', 'recommended', 'optional']);

// ============================================================
// GUIDES COLLECTION
// Educational content like water storage, food storage, etc.
// ============================================================

const guidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Required metadata
    title: z.string(),
    description: z.string(),
    locale: localeEnum,

    // SEO & dates
    datePublished: z.string().optional(),
    dateModified: z.string().optional(),
    author: z.string().optional(),

    // Navigation
    breadcrumbs: z.array(breadcrumbSchema).optional(),

    // Content metadata
    readTime: z.string().optional(),
    schemaType: z.enum(['Article', 'FAQPage', 'HowTo']).default('Article'),

    // Table of contents (optional - auto-generated from headings if not provided)
    toc: z.array(z.object({
      id: z.string(),
      label: z.string(),
    })).optional(),

    // FAQ section
    faqs: z.array(faqItemSchema).optional(),

    // Related content links
    relatedGuides: z.array(z.string()).optional(),
    relatedScenarios: z.array(z.string()).optional(),
    relatedProducts: z.array(z.string()).optional(),

    // CTA configuration
    ctaTitle: z.string().optional(),
    ctaDescription: z.string().optional(),
    ctaPrimaryUrl: z.string().optional(),
    ctaPrimaryText: z.string().optional(),
    ctaSecondaryUrl: z.string().optional(),
    ctaSecondaryText: z.string().optional(),

    // Sources/references
    sources: z.array(z.object({
      title: z.string(),
      url: z.string(),
    })).optional(),

    // Draft status
    draft: z.boolean().default(false),
  }),
});

// ============================================================
// SCENARIOS COLLECTION
// Emergency response guides (blackout, flood, heatwave, etc.)
// ============================================================

// Phase step schema for before/during/after sections
const phaseStepSchema = z.object({
  title: z.string(),
  detail: z.string(),
  tip: z.string().nullable().optional(),
});

// Checklist item schema
const checklistItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.string().optional(),
  priority: priorityEnum,
  notes: z.string().optional(),
});

// Checklist category schema
const checklistCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  items: z.array(checklistItemSchema),
});

// Special situation schema
const specialSituationSchema = z.object({
  title: z.string(),
  icon: z.string(),
  content: z.string(),
});

const scenariosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Required metadata
    title: z.string(),
    description: z.string(),
    locale: localeEnum,
    scenarioKey: z.string(), // e.g., 'apagon', 'stromausfall', 'stroomstoring'

    // SEO & dates
    datePublished: z.string().optional(),
    dateModified: z.string().optional(),

    // Visual
    icon: z.string(), // Lucide icon name
    iconColor: z.string().optional(), // e.g., 'amber', 'blue', 'red'
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),

    // Content metadata
    readTime: z.string().optional(),

    // TL;DR block
    tldrSummary: z.string(),
    tldrKeyStat: z.string().optional(),
    tldrKeyStatLabel: z.string().optional(),

    // Phase content (before/during/after)
    phases: z.object({
      before: z.array(phaseStepSchema),
      during: z.array(phaseStepSchema),
      after: z.array(phaseStepSchema),
    }),

    // Phase labels (localized)
    phaseLabels: z.object({
      before: z.object({ title: z.string(), subtitle: z.string() }),
      during: z.object({ title: z.string(), subtitle: z.string() }),
      after: z.object({ title: z.string(), subtitle: z.string() }),
    }).optional(),

    // Warning box content (shown in "during" phase)
    warningBox: z.object({
      title: z.string(),
      items: z.array(z.string()),
    }).optional(),

    // Interactive checklist
    checklistTitle: z.string().optional(),
    checklistIntro: z.string().optional(),
    checklistCategories: z.array(checklistCategorySchema).optional(),

    // Special situations grid
    specialSituations: z.array(specialSituationSchema).optional(),

    // FAQs
    faqs: z.array(faqItemSchema).optional(),

    // Sources
    sources: z.array(z.object({
      title: z.string(),
      url: z.string(),
    })).optional(),

    // Related products (links to product pages)
    relatedProducts: z.array(z.object({
      slug: z.string(),
      label: z.string(),
      icon: z.string(),
      color: z.string().optional(),
    })).optional(),

    // Related scenarios
    relatedScenarios: z.array(z.object({
      slug: z.string(),
      label: z.string(),
      icon: z.string(),
      color: z.string().optional(),
    })).optional(),

    // Sticky action bar config
    actionBarText: z.string().optional(),
    actionBarUrl: z.string().optional(),
    actionBarLabel: z.string().optional(),

    // Schema.org data
    schemaSteps: z.array(z.object({
      name: z.string(),
      text: z.string(),
    })).optional(),
    schemaTotalTime: z.string().optional(),
    schemaEstimatedCost: z.object({
      currency: z.string(),
      value: z.string(),
    }).optional(),

    // Draft status
    draft: z.boolean().default(false),
  }),
});

// ============================================================
// PRODUCTS COLLECTION
// Product recommendation pages (first aid kit, flashlights, etc.)
// ============================================================

// Amazon product schema
const amazonProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  amazonUrl: z.string(),
  price: z.string(),
  rating: z.number().optional(),
  features: z.array(z.string()).optional(),
  badge: z.enum(['recommended', 'best-value', 'premium']).optional(),
});

// Product type/category schema
const productTypeSchema = z.object({
  name: z.string(),
  description: z.string(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  bestFor: z.string(),
  items: z.string().optional(), // e.g., "25-30 artículos"
  icon: z.string().optional(),
});

// Content table item schema
const contentItemSchema = z.object({
  item: z.string(),
  qty: z.union([z.string(), z.number()]),
  notes: z.string().optional(),
  priority: priorityEnum.optional(),
});

const productsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Required metadata
    title: z.string(),
    description: z.string(),
    locale: localeEnum,

    // SEO & dates
    datePublished: z.string().optional(),
    dateModified: z.string().optional(),

    // Visual
    icon: z.string().optional(),

    // Navigation
    breadcrumbs: z.array(breadcrumbSchema).optional(),

    // Quick recommendation box
    quickRecommendation: z.string().optional(),

    // Warning text
    warningText: z.string().optional(),

    // Product types/categories
    productTypes: z.array(productTypeSchema).optional(),

    // Amazon products
    amazonProducts: z.array(amazonProductSchema).optional(),

    // Content sections (flexible structure for different product pages)
    contentSections: z.record(z.string(), z.array(contentItemSchema)).optional(),

    // Medications (for first aid kit pages)
    medications: z.array(z.object({
      name: z.string(),
      use: z.string(),
      qty: z.string(),
      notes: z.string().optional(),
    })).optional(),

    // Special additions (for first aid kit pages)
    specialAdditions: z.array(z.object({
      group: z.string(),
      items: z.array(z.string()),
    })).optional(),

    // Maintenance schedule
    maintenanceSchedule: z.array(z.object({
      task: z.string(),
      freq: z.string(),
      notes: z.string().optional(),
    })).optional(),

    // Storage locations
    storageLocations: z.array(z.object({
      location: z.string(),
      access: z.string().optional(),
      notes: z.string().optional(),
    })).optional(),

    // Common mistakes
    commonMistakes: z.array(z.string()).optional(),

    // Suggested kit contents
    suggestedKit: z.array(z.object({
      item: z.string(),
      qty: z.union([z.string(), z.number()]),
      notes: z.string().optional(),
    })).optional(),

    // Emergency numbers (country-specific)
    emergencyNumbers: z.array(z.object({
      number: z.string(),
      label: z.string(),
    })).optional(),

    // Related links
    relatedGuideUrl: z.string().optional(),
    relatedGuideText: z.string().optional(),
    relatedToolUrl: z.string().optional(),
    relatedToolText: z.string().optional(),

    // Schema.org data
    schemaType: z.enum(['Article', 'Product', 'ItemList']).default('Article'),

    // Draft status
    draft: z.boolean().default(false),
  }),
});

// Export collections
export const collections = {
  guides: guidesCollection,
  scenarios: scenariosCollection,
  products: productsCollection,
};
