/**
 * Dutch government geo services (PDOK): address lookup, ground elevation
 * (AHN), flood-risk area (EU Floods Directive zones, Rijkswaterstaat) and
 * safety region (CBS). All free, no key.
 */
import { getJson } from './http.mjs';

const point = (wkt) => {
  const [lon, lat] = wkt.match(/-?\d+\.\d+/g).map(Number);
  return { lat, lon };
};

export async function geocode(query) {
  const url = `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?rows=1&fq=type:adres&q=${encodeURIComponent(query)}`;
  const doc = (await getJson(url)).response.docs[0];
  if (!doc) throw new Error(`Adres niet gevonden: ${query}`);
  return fromDoc(doc);
}

/** WMS GetFeatureInfo for a single point: a 100 m box with the point in the middle. */
export async function featureInfo(base, layer, { lat, lon }) {
  const d = 0.0005;
  const params = new URLSearchParams({
    SERVICE: 'WMS', VERSION: '1.3.0', REQUEST: 'GetFeatureInfo', LAYERS: layer, QUERY_LAYERS: layer,
    CRS: 'EPSG:4326', BBOX: `${lat - d},${lon - d},${lat + d},${lon + d}`, WIDTH: '101', HEIGHT: '101',
    I: '50', J: '50', INFO_FORMAT: 'application/json', FEATURE_COUNT: '10',
  });
  return (await getJson(`${base}?${params}`, { timeoutMs: 8000 })).features ?? [];
}

/** Ground level at one point in metres relative to NAP; null on buildings, water or no data. */
export async function elevationAt(p) {
  const f = await featureInfo('https://service.pdok.nl/rws/ahn/wms/v1_0', 'dtm_05m', p).catch(() => []);
  const v = Number(f[0]?.properties?.value_list);
  return Number.isFinite(v) && Math.abs(v) < 1000 ? v : null;
}

/**
 * Exact lookup for the public form: postcode and house number must match a
 * real address. PDOK's free search matches loosely and would silently return
 * a neighbour, so the result is checked. Returns null when there is no match.
 */
export async function geocodeExact(postcode, number, suffix = '') {
  const pc = String(postcode).replace(/\s+/g, '').toUpperCase();
  const nr = String(number).trim();
  if (!/^\d{4}[A-Z]{2}$/.test(pc) || !/^\d{1,5}$/.test(nr)) return null;
  const url = `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?rows=20&fq=type:adres&fq=postcode:${pc}&fq=huisnummer:${nr}&q=${pc}%20${nr}`;
  const docs = (await getJson(url)).response.docs.filter((d) => d.postcode === pc && String(d.huisnummer) === nr);
  if (!docs.length) return null;
  const want = String(suffix).replace(/[^a-z0-9]/gi, '').toUpperCase();
  const tail = (d) => `${d.huisletter ?? ''}${d.huisnummertoevoeging ?? ''}`.toUpperCase();
  const doc = docs.find((d) => tail(d) === want) ?? docs.find((d) => tail(d) === '') ?? docs[0];
  return fromDoc(doc);
}

const fromDoc = (doc) => ({
  label: doc.weergavenaam,
  ...point(doc.centroide_ll),
  municipality: doc.gemeentenaam,
  province: doc.provincienaam,
  waterBoard: doc.waterschapsnaam,
  place: doc.woonplaatsnaam,
  postcode: doc.postcode,
  houseNumber: doc.huisnummer ?? null,
});

/**
 * Ground level around the house in metres relative to NAP (AHN terrain model,
 * 0.5 m grid). The terrain model has no value under buildings, and an address
 * point sits on the building, so this samples two rings of points 15 and 30 m out
 * and returns the median of the ones that have a value. null if none do.
 */
export async function elevation(p) {
  const mLat = 1 / 111320;
  const mLon = 1 / (111320 * Math.cos((p.lat * Math.PI) / 180));
  const points = [p];
  for (const r of [15, 30]) for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    points.push({ lat: p.lat + Math.sin(a) * r * mLat, lon: p.lon + Math.cos(a) * r * mLon });
  }
  const values = (await Promise.all(points.map(elevationAt))).filter((v) => v != null);
  if (!values.length) return null;
  values.sort((a, b) => a - b);
  return values[Math.floor(values.length / 2)];
}

/**
 * Is the point inside an "Area of Potential Significant Flood Risk"?
 * Types (Rijkswaterstaat): A unprotected along the main water system,
 * B protected along the main system, C protected along regional water,
 * D unprotected along regional water. Says nothing about water depth.
 */
export async function floodRisk(p) {
  const f = await featureInfo('https://service.pdok.nl/rws/overstromingen-risicogebied/wms/v1_0', 'NZ.RiskZone', p);
  return f.map((x) => x.properties.description).filter(Boolean);
}

export async function safetyRegion(p) {
  const f = await featureInfo('https://service.pdok.nl/cbs/gebiedsindelingen/2025/wms/v1_0', 'veiligheidsregio_gegeneraliseerd', p);
  return f[0]?.properties?.statnaam ?? null;
}
