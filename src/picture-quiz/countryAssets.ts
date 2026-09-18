import countries from './countries.json';

export const countryCatalog = countries;
export function findCountry(value: string) {
  const normalized = value.trim().toLowerCase();
  return countries.find(country => [country.iso2, country.iso3, country.name, ...country.aliases]
    .some(alias => alias.toLowerCase() === normalized));
}

export function countryAssetPath(code: string, category: string): string {
  const country = findCountry(code);
  if (!country || !['flags', 'country-shapes'].includes(category)) return '';
  return `picture-assets/${category === 'flags' ? 'flags' : 'silhouettes'}/${country.iso2}.png`;
}
