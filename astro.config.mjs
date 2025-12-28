// @ts-nocheck - Astro types have false positives with sitemap serialize and preview config
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.kit-72.com',

  // Static output for Caddy serving
  output: 'static',

  // Build to dist folder
  outDir: './dist',

  // Dev server config
  server: {
    port: 3031,
    host: true
  },

  // Preview server (production-like)
  preview: {
    port: 3031,
    host: true
  },

  // Enable prefetching for faster navigation
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport'
  },

  // Build optimizations
  build: {
    // Inline small CSS files
    inlineStylesheets: 'auto',
  },

  // Compress HTML output
  compressHTML: true,

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Minify CSS
      cssMinify: true,
      // Rollup options for better chunking
      rollupOptions: {
        output: {
          // Manual chunks for better caching
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      // Filter out certain legal pages from sitemap
      filter: (page) => {
        // Filter out cookie and privacy policy pages (low SEO value)
        if (page.includes('/cookies/') || page.includes('/privacidad/') || page.includes('/privacy/') || page.includes('/datenschutz/')) {
          return false;
        }
        // Filter out affiliate disclosure pages
        if (page.includes('/afiliados/') || page.includes('/affiliate-disclaimer/') || page.includes('/affiliate-hinweis/')) {
          return false;
        }
        return true;
      },
      // Custom sitemap serialization for better SEO
      serialize: (item) => {
        // Set priorities based on page importance
        let priority = 0.5;
        let changefreq = 'monthly';

        const url = item.url;

        // Language hub (x-default)
        if (url === 'https://www.kit-72.com/') {
          priority = 0.3; // Lower priority - it's just a language selector
          changefreq = 'monthly';
        }
        // Homepage for each locale
        else if (url.match(/^https:\/\/www\.kit-72\.com\/(es|nl|de)\/$/)) {
          priority = 1.0;
          changefreq = 'weekly';
        }
        // Pillar content (ES)
        else if (url.includes('/kit-de-emergencia/') || url.includes('/kit-72-horas/')) {
          priority = 0.9;
          changefreq = 'weekly';
        }
        // Pillar content (NL)
        else if (url.includes('/noodpakket-samenstellen/') || url.includes('/noodpakket-72-uur/')) {
          priority = 0.9;
          changefreq = 'weekly';
        }
        // Pillar content (DE)
        else if (url.includes('/notfallausruestung/') || url.includes('/notfallpaket-72-stunden/')) {
          priority = 0.9;
          changefreq = 'weekly';
        }
        // Scenario pages (ES)
        else if (url.includes('/escenarios/') && !url.endsWith('/escenarios/')) {
          priority = 0.8;
          changefreq = 'monthly';
        }
        // Scenario pages (NL)
        else if (url.includes('/scenario/') && !url.endsWith('/scenario/')) {
          priority = 0.8;
          changefreq = 'monthly';
        }
        // Scenario pages (DE)
        else if (url.includes('/szenarien/') && !url.endsWith('/szenarien/')) {
          priority = 0.8;
          changefreq = 'monthly';
        }
        // Guide pages
        else if (url.includes('/guias/') || url.includes('/gidsen/') || url.includes('/ratgeber/')) {
          priority = 0.7;
          changefreq = 'monthly';
        }
        // Component/product pages
        else if (url.includes('/componentes/') || url.includes('/producten/') || url.includes('/produkte/')) {
          priority = 0.7;
          changefreq = 'monthly';
        }
        // Tool pages
        else if (url.includes('/herramientas/') || url.includes('/tools/')) {
          priority = 0.6;
          changefreq = 'monthly';
        }

        // Add lastmod date (today's date for freshness signal)
        const today = new Date().toISOString().split('T')[0];

        return {
          ...item,
          priority,
          changefreq,
          lastmod: today,
        };
      },
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          nl: 'nl-NL',
          de: 'de-DE',
        }
      }
    })
  ]
});
