/**
 * Shared labels for the Dutch sourced explainers in this folder.
 *
 * Rules for these pages (same as src/data/ai-grid.ts):
 *   - a claim needs a source in the page's SOURCES and a {id} reference
 *   - the source is the deep page that says it, read on CHECKED
 *   - where the official sources say nothing, the text says so
 */
import type { Explainer, Source } from '../../components/growth/ExplainerPage.astro';

export const CHECKED = '2026-11-18';
export const READ = 'gelezen 18 nov. 2026';

export const labels = {
  checkedLabel: 'Bronnen gecontroleerd op',
  policy: { label: 'Hoe wij werken', href: '/nl/redactioneel-beleid/' },
  shortTitle: 'Kort antwoord',
  faqTitle: 'Veelgestelde vragen',
  sourcesTitle: 'Bronnen',
  sourcesNote: 'Elke bewering hierboven komt van een van deze pagina’s. Kit-72 is geen overheidssite; bij een noodsituatie gaan de aanwijzingen van de overheid en de hulpdiensten voor.',
} satisfies Partial<Explainer>;

export interface Page {
  content: Explainer;
  sources: Source[];
  checked: string;
  published: string;
}
