const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
const dirs = fs.readdirSync(quizzesDir).filter(d => fs.statSync(path.join(quizzesDir, d)).isDirectory()).sort();

let remainingSuspects = [];

dirs.forEach(d => {
  const p = path.join(quizzesDir, d, 'dataset.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  data.questions.forEach((q, idx) => {
    if (q.type === 'mcq') {
      const qNum = idx + 1;
      q.options.forEach((opt, oIdx) => {
        // Pattern: Option contains an English noun followed by foreign word or second full title
        // e.g. "Serra da Estrela Star Mountain Range", "Torre de Belém Belém Tower", "Peneda-Gerês National Park Parque Nacional da Peneda-Gerês"
        if (
          /\b(Park|Palace|Castle|Tower|Bridge|Cathedral|Monastery|Sanctuary|Fortress|Arch|Statue|Square|Street|Avenue|Beach|Bay|Gulf|Strait|Channel|River|Lake|Waterfall|Waterfalls|Canyon|Gorge|Valley|Desert|Forest|Island|Islands|Mountain|Mountains|Peak|Volcano|Glacier|Plateau|Plains|Cave|Caves)\s+(Parque|Schloss|Château|Castillo|Castelo|Palacio|Palácio|Palais|Torre|Tour|Turm|Ponte|Pont|Brücke|Most|Catedral|Duomo|Dom|Münster|Mosteiro|Monasterio|Abbaye|Kloster|Santuario|Santuário|Fortaleza|Festung|Arco|Arc|Estátua|Statue|Praça|Plaza|Place|Platz|Rua|Calle|Rue|Straße|Praia|Playa|Plage|Strand|Baía|Bahía|Baie|Bucht|Golfo|Golfe|Golf|Estreito|Estrecho|Détroit|Straße|Canal|Rio|Río|Fleuve|Rivière|Fluss|Reka|Lago|Lac|See|Jezioro|Sjø|Cataratas|Cascadas|Chutes|Cascades|Wasserfälle|Cañón|Garganta|Gorge|Schlucht|Valle|Vallée|Tal|Dolina|Desierto|Désert|Wüste|Pustynia|Floresta|Bosque|Forêt|Wald|Las|Ilha|Isla|Île|Insel|Wyspa|Ilhas|Islas|Îles|Inseln|Wyspy|Montanha|Montaña|Montagne|Berg|Góra|Pico|Pic|Spitze|Szczyt|Vulcão|Volcán|Vulkan|Glaciar|Glacier|Gletscher|Planalto|Meseta|Plateau|Planície|Llanura|Plaine|Ebene|Gruta|Grotte|Höhle|Jaskinia)\b/i.test(opt)
        ) {
          remainingSuspects.push({ pack: d, qNum, optIdx: oIdx, opt, isCorrect: oIdx === q.correctIndex });
        }
      });
    }
  });
});

console.log(`Found ${remainingSuspects.length} remaining compound bilingual options across the entire library:`);
console.log(JSON.stringify(remainingSuspects, null, 2));
