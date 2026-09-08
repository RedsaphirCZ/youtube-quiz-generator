const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');

const specificCleanups = {
  "Atacama Desert Desierto de Atacama": "Atacama Desert",
  "Rapa Nui Easter Island Isla de Pascua": "Easter Island",
  "Chiloé Island Isla Grande de Chiloé": "Chiloé Island",
  "Magdalena River Río Magdalena": "Magdalena River",
  "Rosario Islands Islas del Rosario": "Rosario Islands",
  "Tayrona National Natural Park Parque Tayrona": "Tayrona National Park",
  "Eiffel Tower Tour Eiffel": "Eiffel Tower",
  "Chapultepec Forest Bosque de Chapultepec": "Chapultepec Forest",
  "Sumidero Canyon Cañón del Sumidero": "Sumidero Canyon",
  "Ouzoud Waterfalls Cascades d Ouzoud": "Ouzoud Waterfalls",
  "Colca Canyon Cañón del Colca": "Colca Canyon",
  "Manú National Park Parque Nacional del Manu": "Manú National Park",
  "Rainbow Mountain Montaña de Siete Colores": "Rainbow Mountain",
  "Jerónimos Monastery Mosteiro dos Jerónimos": "Jerónimos Monastery",
  "Belém Tower Torre de Belém": "Belém Tower",
  "Pena Palace Palácio Nacional da Pena": "Pena Palace",
  "Vasco da Gama Bridge Ponte Vasco da Gama": "Vasco da Gama Bridge",
  "Tagus River Río Tajo": "Tagus River"
};

const dirs = fs.readdirSync(quizzesDir).filter(d => fs.statSync(path.join(quizzesDir, d)).isDirectory());

dirs.forEach(d => {
  const p = path.join(quizzesDir, d, 'dataset.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  data.questions.forEach(q => {
    if (q.type === 'mcq') {
      q.options = q.options.map(opt => specificCleanups[opt] || opt);
    }
  });

  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
});

console.log('Cleaned remaining specific bilingual compound options.');
