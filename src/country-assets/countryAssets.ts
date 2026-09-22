import { strToU8, zipSync } from 'fflate';

export interface CountryAssetRecord {
  iso2: string;
  iso3: string;
  ccn3: string;
  name: string;
  aliases: string[];
  flag: string;
  silhouette: string;
  lat: number;
  lng: number;
  continent: string;
  subregion: string;
  capital: string;
  population: number;
  areaKm2: number;
  landlocked: boolean;
  borders: string[];
  languages: string[];
  currencies: string[];
}

interface CountryCatalogResponse {
  schema: string;
  source: string;
  sourceFetchedAt: string;
  countryCount: number;
  countries: CountryAssetRecord[];
}

export interface DownloadableCountryAsset {
  id: 'flag' | 'silhouette' | 'data';
  title: string;
  description: string;
  filename: string;
  url?: string;
}

export function publicAssetUrl(path: string): string {
  return new URL(path.replace(/^\.\.\//, ''), document.baseURI).href;
}

export async function loadCountryAssetCatalog(): Promise<CountryCatalogResponse> {
  const response = await fetch(new URL('flag-card-studio/data/countries.json', document.baseURI));
  if (!response.ok) throw new Error(`Country catalog could not be loaded (${response.status}).`);
  const catalog = await response.json() as CountryCatalogResponse;
  if (!Array.isArray(catalog.countries) || catalog.countries.length === 0) throw new Error('Country catalog is empty.');
  return catalog;
}

export function assetsForCountry(country: CountryAssetRecord): DownloadableCountryAsset[] {
  const slug = country.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return [
    { id: 'flag', title: 'National flag', description: 'Bundled PNG from flag-icons / FlagCDN.', filename: `${slug}-flag.png`, url: publicAssetUrl(country.flag) },
    { id: 'silhouette', title: 'Country silhouette', description: 'Transparent Natural Earth map silhouette PNG.', filename: `${slug}-silhouette.png`, url: publicAssetUrl(country.silhouette) },
    { id: 'data', title: 'Country data', description: 'All facts and identifiers shown in this hub.', filename: `${slug}-data.json` },
  ];
}

function saveBlob(blob: Blob, filename: string) {
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}

export async function downloadCountryAsset(country: CountryAssetRecord, asset: DownloadableCountryAsset): Promise<void> {
  if (asset.id === 'data') {
    saveBlob(new Blob([JSON.stringify(country, null, 2)], { type: 'application/json' }), asset.filename);
    return;
  }
  const response = await fetch(asset.url!);
  if (!response.ok) throw new Error(`${asset.title} could not be downloaded (${response.status}).`);
  saveBlob(await response.blob(), asset.filename);
}

export async function downloadCountryBundle(country: CountryAssetRecord): Promise<void> {
  const assets = assetsForCountry(country);
  const [flagResponse, silhouetteResponse] = await Promise.all([
    fetch(assets[0].url!),
    fetch(assets[1].url!),
  ]);
  if (!flagResponse.ok || !silhouetteResponse.ok) throw new Error('One or more country images could not be added to the ZIP.');
  const metadata = JSON.stringify(country, null, 2);
  const readme = `${country.name} country asset bundle\n\nIncluded:\n- ${assets[0].filename}\n- ${assets[1].filename}\n- ${assets[2].filename}\n\nSources:\nFlag: flag-icons / FlagCDN (MIT)\nSilhouette: Natural Earth (public domain; not an authoritative boundary map)\nData: REST Countries v5 local snapshot\n`;
  const zip = zipSync({
    [assets[0].filename]: new Uint8Array(await flagResponse.arrayBuffer()),
    [assets[1].filename]: new Uint8Array(await silhouetteResponse.arrayBuffer()),
    [assets[2].filename]: strToU8(metadata),
    'README.txt': strToU8(readme),
  });
  const slug = country.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  saveBlob(new Blob([zip as BlobPart], { type: 'application/zip' }), `${slug}-asset-bundle.zip`);
}
