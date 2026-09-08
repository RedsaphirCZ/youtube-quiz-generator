const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
const dirs = fs.readdirSync(quizzesDir).filter(d => fs.statSync(path.join(quizzesDir, d)).isDirectory()).sort();

let fixMap = {
  "Lake Neusiedl Neusiedler See": "Lake Neusiedl",
  "Fischer Random Chess Chess960": "Fischer Random Chess",
  "Mogao Caves Caves of the Thousand Buddhas": "Mogao Caves",
  "Mount Song Songshan": "Mount Song",
  "Chinese Alligator Alligator sinensis": "Chinese Alligator",
  "Reindeer Rangifer tarandus tarandus": "Reindeer",
  "The Maastricht Treaty Treaty on European Union": "The Maastricht Treaty",
  "Sognefjord Sognefjorden": "Sognefjord",
  "Giant Sequoia Sequoiadendron giganteum": "Giant Sequoia",
  "King Protea Protea cynaroides": "King Protea",
  "Muay Thai Thai Boxing": "Muay Thai",
  "Temple of Artemis Artemision": "Temple of Artemis",
  "Mount Nemrut Nemrut Dağı": "Mount Nemrut",
  "O N": "O(N)",
  "O N log N": "O(N log N)",
  "Bernardo O Higgins National Park": "Bernardo O'Higgins National Park",
  "Ais Kacang ABC": "Ais Kacang",
  "The Shúka": "The Shúkà"
};

let cleaned = 0;

dirs.forEach(d => {
  const p = path.join(quizzesDir, d, 'dataset.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  data.questions.forEach((q, idx) => {
    if (q.type === 'mcq') {
      q.options = q.options.map(opt => {
        if (fixMap[opt]) {
          cleaned++;
          return fixMap[opt];
        }
        return opt;
      });
    }
  });

  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
});

console.log(`Applied additional fixes to ${cleaned} options across datasets.`);
