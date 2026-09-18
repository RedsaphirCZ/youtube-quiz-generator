import assert from 'node:assert/strict';
import fs from 'node:fs';
import { countryCatalog, countryAssetPath, findCountry } from '../src/picture-quiz/countryAssets';
import { parsePictureQuizResponse } from '../src/picture-quiz/pictureQuiz';
fs.mkdirSync('output/playwright', { recursive: true });
fs.writeFileSync('output/playwright/not-an-image.png', 'Not an image');
assert.equal(countryCatalog.length, 195);
assert.equal(new Set(countryCatalog.map(c => c.iso2)).size, 195);
for (const country of countryCatalog) {
  assert.equal(findCountry(country.iso3)?.iso2, country.iso2);
  for (const category of ['flags', 'country-shapes']) {
    const asset = countryAssetPath(country.iso2.toUpperCase(), category);
    const bytes = fs.readFileSync(`public/${asset}`);
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.ok(bytes.readUInt32BE(16) > 0 && bytes.readUInt32BE(20) > 0);
    const pack = parsePictureQuizResponse(JSON.stringify({title:'Asset QA',category,questions:[{type:'picture_mcq',question:'Which country?',image:{countryCode:country.iso2},options:[country.name, country.iso2 === 'jp' ? 'Canada' : 'Japan'],correctIndex:0,explanation:'Country recognition.'}]}));
    assert.equal(pack.questions[0].image.src,asset);
    assert.equal(pack.questions[0].image.countryCode,country.iso2);
  }
}
assert.equal(countryAssetPath('../secret','flags'),'');
assert.equal(countryAssetPath('JP','objects'),'');
console.log('PASS: 195 country mappings and 390 bundled PNG assets, dimensions, parser resolution and invalid paths.');
