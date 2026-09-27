export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// These pairs are too similar to make fair flag-only multiple-choice questions.
const flagFamilies = [['id', 'mc'], ['ro', 'td']];
export function makeRounds(countries, { mode, region, count }, random = Math.random) {
  const pool = countries.filter(country => region === 'all' || country.continent === region);
  if (pool.length < 4) throw new Error('Choose a region with at least four countries.');
  const length = count === 'all' ? pool.length : Math.min(Number(count), pool.length);
  return shuffle(pool, random).slice(0, length).map(country => {
    const family = mode === 'flag' ? flagFamilies.find(group => group.includes(country.iso2)) || [] : [];
    const alternatives = shuffle(pool.filter(item => item.iso2 !== country.iso2 && !family.includes(item.iso2)), random);
    // Nearby choices keep each question interesting without repeating the target.
    const nearby = alternatives.filter(item => item.continent === country.continent);
    const others = alternatives.filter(item => item.continent !== country.continent);
    return { country, choices: shuffle([country, ...[...nearby, ...others].slice(0, 3)], random) };
  });
}
