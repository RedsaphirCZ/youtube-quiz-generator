const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
const dirs = fs.readdirSync(quizzesDir).filter(d => fs.statSync(path.join(quizzesDir, d)).isDirectory()).sort();

let cleanedCount = 0;
let cleanLog = [];

function cleanOption(opt) {
  let s = opt.trim();

  // Explicit mappings for common compound aliases
  const compoundAliases = {
    "Schönbrunn Palace Schloss Schönbrunn": "Schönbrunn Palace",
    "St. Stephen Cathedral Stephansdom": "St. Stephen's Cathedral",
    "Hellbrunn Palace Schloss Hellbrunn": "Hellbrunn Palace",
    "High Tauern National Park Nationalpark Hohe Tauern": "Hohe Tauern National Park",
    "Krimml Waterfalls Krimmler Wasserfälle": "Krimml Waterfalls",
    "Dachstein Giant Ice Cave Dachstein Eishöhle": "Dachstein Giant Ice Cave",
    "The Golden Hall of the Musikverein Großer Saal": "Musikverein Golden Hall",
    "Vienna State Opera Wiener Staatsoper": "Vienna State Opera",
    "Viennese Coffee House Culture Wiener Kaffeehauskultur": "Viennese Coffee House Culture",
    "Sachertorte Original Sacher-Torte": "Sachertorte",
    "Apfelstrudel Viennese Apple Strudel": "Apfelstrudel",
    "Tolman-Oppenheimer-Volkoff TOV Limit": "Tolman-Oppenheimer-Volkoff Limit",
    "Longest straight stretch of railway track 478 kilometers": "Longest straight railway track",
    "Fastest unpowered train line": "Fastest gravity train line",
    "Highest railway viaduct": "Highest altitude railway line",
    "Salzburg Festival Salzburger Festspiele": "Salzburg Festival",
    "Spanish Riding School Spanische Hofreitschule": "Spanish Riding School",
    "Lipizzan Horses Lipizzaner": "Lipizzan Horses",
    "Vienna Boys Choir Wiener Sängerknaben": "Vienna Boys Choir",
    "Belvedere Palace Schloss Belvedere": "Belvedere Palace",
    "Hofburg Imperial Palace": "Hofburg Palace",
    "Golden Roof Goldenes Dachl": "Golden Roof",
    "Hohensalzburg Fortress Festung Hohensalzburg": "Hohensalzburg Fortress",
    "Grossglockner High Alpine Road Großglockner Hochalpenstraße": "Grossglockner High Alpine Road",
    "Eisriesenwelt World of the Ice Giants": "Eisriesenwelt",
    "Hallstatt Salt Mine Salzwelten Hallstatt": "Hallstatt Salt Mine",
    "Wachau Valley Wachau": "Wachau Valley",
    "Melk Abbey Stift Melk": "Melk Abbey",
    "Admont Abbey Library Stift Admont": "Admont Abbey Library",
    "Graz Clock Tower Grazer Uhrturm": "Graz Clock Tower",
    "Eggenberg Palace Schloss Eggenberg": "Eggenberg Palace",
    "Innsbruck Old Town Altstadt Innsbruck": "Innsbruck Old Town",
    "Ambras Castle Schloss Ambras": "Ambras Castle",
    "Zillertal Valley Zillertal": "Zillertal Valley",
    "Kitzbühel Hahnenkamm Streif": "Kitzbühel Hahnenkamm",
    "Arlberg Cradle of Alpine Skiing": "Arlberg",
    "Bregenz Festival Bregenzer Festspiele": "Bregenz Festival",
    "Lake Constance Bodensee": "Lake Constance",
    "Wörthersee Lake Wörthersee": "Lake Wörthersee",
    "Kärnten Carinthian Lakes": "Carinthian Lakes",
    "Semmering Railway Semmeringbahn": "Semmering Railway",
    "Riesenrad Giant Ferris Wheel Wiener Riesenrad": "Vienna Giant Ferris Wheel",
    "Prater Amusement Park Wiener Prater": "Prater Amusement Park",
    "Hundertwasser House Hundertwasserhaus": "Hundertwasserhaus",
    "St. Charles Church Karlskirche": "Karlskirche",
    "St. Peter Abbey Stift Sankt Peter": "St. Peter's Abbey",
    "Mozart Birthplace Mozarts Geburtshaus": "Mozart's Birthplace",
    "Salzkammergut Lake District": "Salzkammergut",
    "Wolfgangsee Lake Wolfgang": "Lake Wolfgang",
    "Traunsee Lake Traun": "Lake Traun",
    "Hallstätter See Lake Hallstatt": "Lake Hallstatt",
    "Gosauseen Gosau Lakes": "Gosau Lakes",
    "Pasterze Glacier Pasterzengletscher": "Pasterze Glacier",
    "Kitzsteinhorn Glacier Kitzsteinhorn": "Kitzsteinhorn",
    "Hintertux Glacier Hintertuxer Gletscher": "Hintertux Glacier",
    "Stubai Glacier Stubaier Gletscher": "Stubai Glacier",
    "Kaunertal Glacier Kaunertaler Gletscher": "Kaunertal Glacier",
    "Pitztal Glacier Pitztaler Gletscher": "Pitztal Glacier",
    "Sölden Rettenbach Glacier": "Sölden Rettenbach Glacier",
    "Tirolean Grey Cattle Tiroler Grauvieh": "Tirolean Grey Cattle",
    "Pinzgauer Cattle Pinzgauer Rind": "Pinzgauer Cattle",
    "Haflinger Horse Haflinger": "Haflinger Horse",
    "Noriker Horse Noriker": "Noriker Horse",
    "Alpine Marmot Marmota marmota": "Alpine Marmot",
    "Alpine Chamois Rupicapra rupicapra": "Alpine Chamois",
    "Alpine Ibex Capra ibex": "Alpine Ibex",
    "Golden Eagle Aquila chrysaetos": "Golden Eagle",
    "Bearded Vulture Gypaetus barbatus": "Bearded Vulture",
    "Black Grouse Lyrurus tetrix": "Black Grouse",
    "Capercaillie Tetrao urogallus": "Capercaillie",
    "Edelweiss Leontopodium nivale": "Edelweiss",
    "Alpine Rose Rhododendron ferrugineum": "Alpine Rose",
    "Enzian Gentiana": "Enzian",
    "Swiss Stone Pine Pinus cembra (Zirbe)": "Swiss Stone Pine (Zirbe)",
    "European Larch Larix decidua": "European Larch",
    "Norway Spruce Picea abies": "Norway Spruce",
    "Silver Fir Abies alba": "Silver Fir",
    "Mountain Pine Pinus mugo": "Mountain Pine",
    "Almdudler Herbal Soda": "Almdudler",
    "Red Bull Energy Drink": "Red Bull",
    "Manner Wafers Manner Schnitten": "Manner Wafers",
    "Mozartkugeln Mozart Balls": "Mozartkugeln",
    "Kaiserschmarrn Emperor Pancake": "Kaiserschmarrn",
    "Tafelspitz Boiled Beef": "Tafelspitz",
    "Wiener Schnitzel Viennese Cutlet": "Wiener Schnitzel",
    "Goulash Rindsgulasch": "Goulash",
    "Krenren Kren Horseradish": "Kren (Horseradish)",
    "Kürbiskernöl Styrian Pumpkin Seed Oil": "Styrian Pumpkin Seed Oil",
    "Grüner Veltliner Green Veltliner": "Grüner Veltliner",
    "Zweigelt Blauer Zweigelt": "Zweigelt",
    "Blaufränkisch Lemberger": "Blaufränkisch",
    "St. Laurent Sankt Laurent": "St. Laurent",
    "Eiswein Ice Wine": "Eiswein",
    "Stroh Rum Austrian Spiced Rum": "Stroh Rum",
    "Schnaps Obstler Fruit Brandy": "Obstler Fruit Brandy",
    "Melange Viennese Melange": "Wiener Melange",
    "Einspänner Single Horse Carriage Coffee": "Einspänner",
    "Verlängerter Extended Espresso": "Verlängerter",
    "Kleiner Schwarzer Short Black": "Kleiner Schwarzer",
    "Kleiner Brauner Short Brown": "Kleiner Brauner",
    "Fiaker Rum Coffee": "Fiaker Coffee",
    "Biedermeier Liqueur Coffee": "Biedermeier Coffee",
    "Maria Theresia Orange Liqueur Coffee": "Maria Theresia Coffee",
    "Mozart Kaffee Mozart Liqueur Coffee": "Mozart Coffee",
    "Kapuziner Capuchin Coffee": "Kapuziner",
    "Franziskaner Franciscan Coffee": "Franziskaner",
    "Überstürzter Neumann Inverted Coffee": "Überstürzter Neumann",
    "Kaisermelange Imperial Melange": "Kaisermelange",
    "Intermezzo Short Break Coffee": "Intermezzo Coffee",
    "Kaffee Verkehrt Inverted Milk Coffee": "Kaffee Verkehrt",
    "Kosakenkaffee Cossack Coffee": "Kosakenkaffee",
    "Pharisäer Pharisee Coffee": "Pharisäer",
    "Zarenkaffee Czar Coffee": "Zarenkaffee",
    "Wiener Eiskaffee Viennese Iced Coffee": "Wiener Eiskaffee"
  };

  if (compoundAliases[s]) return compoundAliases[s];

  // Regex patterns to clean trailing duplicate names:
  // "Name Schloss Name" -> "Name"
  s = s.replace(/\s+Schloss\s+[A-ZÀ-ÿ][a-zÀ-ÿ]+/i, '');
  // "Name Stephansdom" -> "Name"
  s = s.replace(/\s+Stephansdom\b/i, '');
  // "Name Dom\b" -> "Name"
  s = s.replace(/\s+Dom\b/i, '');
  // "Name Wasserfälle\b" -> "Name"
  s = s.replace(/\s+Wasserfälle\b/i, '');
  // "Name Eishöhle\b" -> "Name"
  s = s.replace(/\s+Eishöhle\b/i, '');
  // "Name Höhle\b" -> "Name"
  s = s.replace(/\s+Höhle\b/i, '');
  // "Name Festung\b" -> "Name"
  s = s.replace(/\s+Festung\b/i, '');
  // "Name Stift\b" -> "Name"
  s = s.replace(/\s+Stift\b/i, '');
  // "Name Gletscher\b" -> "Name"
  s = s.replace(/\s+Gletscher\b/i, '');
  // "Name Rind\b" -> "Name"
  s = s.replace(/\s+Rind\b/i, '');
  // "Name Festspiele\b" -> "Name"
  s = s.replace(/\s+Festspiele\b/i, '');
  // "Name Sängerknaben\b" -> "Name"
  s = s.replace(/\s+Sängerknaben\b/i, '');
  // "Name Hofreitschule\b" -> "Name"
  s = s.replace(/\s+Hofreitschule\b/i, '');
  // "Name Kaffeehauskultur\b" -> "Name"
  s = s.replace(/\s+Kaffeehauskultur\b/i, '');
  // "Name Schnitten\b" -> "Name"
  s = s.replace(/\s+Schnitten\b/i, '');

  return s;
}

dirs.forEach(d => {
  const p = path.join(quizzesDir, d, 'dataset.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  data.questions.forEach((q, idx) => {
    if (q.type === 'mcq') {
      q.options = q.options.map(opt => {
        const cleaned = cleanOption(opt);
        if (cleaned !== opt) {
          cleanedCount++;
          cleanLog.push({ pack: d, q: idx + 1, before: opt, after: cleaned });
          return cleaned;
        }
        return opt;
      });
    }
  });

  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
});

console.log(`Master string cleaner updated ${cleanedCount} options across datasets.`);
