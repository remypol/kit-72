/**
 * Where-to-buy links for the product category pages (NL and DE; the ES pages
 * carry their own product grid). Plain shop URLs: partner IDs are added at
 * build time by src/lib/affiliate.ts.
 */
type Link = { label: string; url: string };

const bol = (q: string): Link => ({ label: 'bol', url: `https://www.bol.com/nl/nl/s/?searchtext=${encodeURIComponent(q).replace(/%20/g, '+')}` });
const amazon = (tld: 'nl' | 'de', q: string): Link => ({ label: `Amazon.${tld}`, url: `https://www.amazon.${tld}/s?k=${encodeURIComponent(q).replace(/%20/g, '+')}` });

export const shopCopy = {
  nl: { title: 'Direct naar het aanbod', note: 'Lees hieronder eerst waar je op let. Via deze links kunnen wij een vergoeding krijgen; jij betaalt hetzelfde.', at: 'Bekijk bij' },
  de: { title: 'Direkt zum Angebot', note: 'Lies unten zuerst, worauf es ankommt. Über diese Links können wir eine Provision erhalten; du zahlst dasselbe.', at: 'Ansehen bei' },
} as const;

export const shopLinks: Record<'nl' | 'de', Record<string, { what: string; links: Link[] }[]>> = {
  nl: {
    wateropslag: [
      { what: 'Jerrycan 10 liter, voedselveilig', links: [bol('jerrycan drinkwater 10 liter'), amazon('nl', 'jerrycan drinkwater 10 liter')] },
      { what: 'Waterzuiveringstabletten', links: [bol('waterzuiveringstabletten'), amazon('nl', 'waterzuiveringstabletten')] },
    ],
    noodvoedsel: [
      { what: 'Noodrantsoen, lang houdbaar', links: [bol('noodrantsoen lang houdbaar'), amazon('nl', 'noodrantsoen')] },
      { what: 'Gevriesdroogde maaltijden', links: [bol('gevriesdroogde maaltijd'), amazon('nl', 'gevriesdroogde maaltijd')] },
    ],
    zaklampen: [
      { what: 'Led-zaklamp, oplaadbaar', links: [bol('led zaklamp oplaadbaar'), amazon('nl', 'led zaklamp oplaadbaar')] },
      { what: 'Hoofdlamp', links: [bol('hoofdlamp led'), amazon('nl', 'hoofdlamp led')] },
    ],
    noodradio: [{ what: 'Noodradio met slinger en zonnepaneel', links: [bol('noodradio dynamo solar'), amazon('nl', 'noodradio dynamo solar')] }],
    powerbanks: [
      { what: 'Powerbank 20.000 mAh', links: [bol('powerbank 20000mah'), amazon('nl', 'powerbank 20000mah')] },
      { what: 'Powerbank 10.000 mAh', links: [bol('powerbank 10000mah'), amazon('nl', 'powerbank 10000mah')] },
    ],
    'ehbo-doos': [{ what: 'Complete EHBO-doos', links: [bol('ehbo doos compleet'), amazon('nl', 'ehbo doos compleet')] }],
    noodtassen: [{ what: 'Rugzak 40 liter, waterdicht', links: [bol('rugzak 40 liter waterdicht'), amazon('nl', 'rugzak 40 liter waterdicht')] }],
  },
  de: {
    wasserspeicher: [
      { what: 'Wasserkanister 10 Liter, lebensmittelecht', links: [amazon('de', 'wasserkanister lebensmittelecht 10l')] },
      { what: 'Wasserentkeimungstabletten', links: [amazon('de', 'wasserentkeimungstabletten')] },
    ],
    notnahrung: [
      { what: 'Notvorrat 5 Tage, 10 Jahre haltbar', links: [{ label: 'ration1', url: 'https://ration1.de/produkt/notvorrat-5-tage-paket-klassik-10-jahre-haltbar/' }] },
      { what: 'Notnahrung, lange haltbar', links: [amazon('de', 'notnahrung langzeit')] },
    ],
    taschenlampen: [
      { what: 'LED-Taschenlampe, aufladbar', links: [amazon('de', 'led taschenlampe aufladbar')] },
      { what: 'Stirnlampe', links: [amazon('de', 'stirnlampe led')] },
    ],
    notfallradio: [{ what: 'Kurbelradio mit Solar', links: [amazon('de', 'kurbelradio solar notfallradio')] }],
    powerbanks: [
      { what: 'Powerbank 20.000 mAh', links: [amazon('de', 'powerbank 20000mah')] },
      { what: 'Powerbank 10.000 mAh', links: [amazon('de', 'powerbank 10000mah')] },
    ],
    'erste-hilfe-kasten': [{ what: 'Erste-Hilfe-Kasten nach DIN 13157', links: [amazon('de', 'erste hilfe kasten din 13157')] }],
    notfallrucksack: [
      { what: 'Wanderrucksack 40 Liter', links: [amazon('de', 'wanderrucksack 40 liter')] },
      { what: 'Stromausfall-Paket', links: [{ label: 'ration1', url: 'https://ration1.de/produkt/stromausfall-paket-klassik-ration1/' }] },
    ],
  },
};
