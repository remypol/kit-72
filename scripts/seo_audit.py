#!/usr/bin/env python3
"""
Checks the built site (dist/) for the things that are easy to get wrong:
title and description length, one H1 per page, thin pages, pages with few
internal links pointing at them, and hreflang links that are not returned.

    npm run build && python3 scripts/seo_audit.py
"""
import collections, glob, html, os, re, sys

SITE = 'https://www.kit-72.com'
rows = []
for f in sorted(glob.glob('dist/**/index.html', recursive=True)):
    s = open(f, encoding='utf8').read()
    url = '/' + os.path.relpath(f, 'dist').replace('index.html', '')
    url = '/' if url == '/./' else url
    g = lambda p: (re.search(p, s, re.S) or [None, ''])[1]
    main = re.search(r'<main.*?</main>', s, re.S)
    text = re.sub(r'<script.*?</script>|<style.*?</style>|<[^>]+>', ' ', main.group(0) if main else '', flags=re.S)
    rows.append(dict(
        url=url,
        title=html.unescape(g(r'<title>(.*?)</title>')),
        desc=html.unescape(g(r'<meta name="description" content="([^"]*)"')),
        h1=len(re.findall(r'<h1[\s>]', s)),
        robots=g(r'<meta name="robots" content="([^"]*)"'),
        hre=dict(re.findall(r'<link rel="alternate" hreflang="([^"]*)" href="([^"]*)"', s)),
        words=len(text.split()),
        links=set(re.findall(r'href="(/[a-z]{2}/[^"#?]*)"', s)),
    ))

idx = [r for r in rows if 'noindex' not in r['robots']]
urls = {r['url']: r for r in rows}
inbound = collections.Counter(l for r in rows for l in r['links'] if l != r['url'])
problems = 0

def section(name, items):
    global problems
    print(f'\n{name}: {len(items)}')
    for i in items[:25]:
        print('   ', i)
    problems += len(items)

print(f'{len(rows)} pages, {len(idx)} indexable')
section('Title longer than 60 characters', [f"{len(r['title'])} {r['url']}  {r['title']}" for r in idx if len(r['title']) > 60])
section('Description shorter than 70 or longer than 160', [f"{len(r['desc'])} {r['url']}" for r in idx if not 70 <= len(r['desc']) <= 160])
section('Not exactly one H1', [r['url'] for r in idx if r['h1'] != 1])
dup = collections.Counter(r['title'] for r in idx)
section('Duplicate titles', [t for t, c in dup.items() if c > 1])
section('Fewer than 2 internal links pointing at the page', [f"{inbound[r['url']]} {r['url']}" for r in idx if inbound[r['url']] < 2 and r['url'] != '/'])
bad = []
for r in idx:
    for lang, href in r['hre'].items():
        p = href.replace(SITE, '')
        if p not in urls:
            bad.append(f"{r['url']} -> {p} ({lang}): target missing")
        elif lang != 'x-default' and r['url'] not in [h.replace(SITE, '') for h in urls[p]['hre'].values()]:
            bad.append(f"{r['url']} -> {p} ({lang}): not returned")
section('hreflang problems', bad)
print('\nThin pages (under 250 words in <main>), for information:')
for r in sorted(idx, key=lambda r: r['words']):
    if r['words'] < 250:
        print('   ', r['words'], r['url'])
sys.exit(1 if problems else 0)
