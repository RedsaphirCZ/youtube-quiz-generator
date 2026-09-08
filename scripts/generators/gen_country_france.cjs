const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 7. france-geography-heritage-60
// =========================================================================
const franceCycles = [
  // Cycle 1: Mont Blanc & The French Alps
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in the European Union, standing at 4,808 meters in the French Alps on the border with Italy?",
        correct: "Mont Blanc",
        w1: "Barre des Écrins",
        w2: "Aiguille du Midi",
        exp: "First summited in 1786 by Jacques Balmat and Michel Paccard, Mont Blanc is the pinnacle of Western European mountaineering."
      },
      {
        q: "Which world-famous French Alpine valley resort town at the foot of Mont Blanc hosted the first Olympic Winter Games in 1924?",
        correct: "Chamonix-Mont-Blanc",
        w1: "Courchevel",
        w2: "Val d Isère",
        exp: "Chamonix is the mountaineering capital of Europe, home to the Mer de Glace glacier and the soaring Aiguille du Midi cable car."
      },
      {
        q: "Which rocky needle peak in the Mont Blanc massif at 3,842 meters is accessible by the highest vertical ascent cable car in the world?",
        correct: "Aiguille du Midi",
        w1: "Grandes Jorasses",
        w2: "Dent du Géant",
        exp: "The Aiguille du Midi cable car spans 2,800 vertical meters from Chamonix, featuring the Step into the Void glass skywalk viewing box."
      },
      {
        q: "What is the highest mountain peak located entirely within French national territory, rising 4,102 meters in the Écrins National Park?",
        correct: "Barre des Écrins",
        w1: "La Meije",
        w2: "Mont Pelvoux",
        exp: "Barre des Écrins in the Dauphiné Alps was the highest point in France prior to the 1860 Treaty of Turin that annexed Savoy and Mont Blanc."
      },
      {
        q: "What dramatic pre-Alpine limestone plateau in southeastern France served as a major stronghold for the French Resistance (Maquis) during World War II?",
        correct: "Vercors Massif",
        w1: "Chartreuse Mountains",
        w2: "Bauges Massif",
        exp: "The fortress-like cliffs of the Vercors plateau provided natural defensive terrain, declared the Free Republic of Vercors in June 1944."
      }
    ],
    number: {
      q: "In what year did Chamonix-Mont-Blanc host the first ever Olympic Winter Games in history?",
      target: 1924,
      unit: "year",
      imperial: "1924 AD",
      exp: "The inaugural Winter Olympic Games took place in Chamonix from January 25 to February 5, 1924."
    }
  },

  // Cycle 2: The Seine River & Île-de-France
  {
    mcqs: [
      {
        q: "Which iconic 777-kilometer river flows through Paris before emptying into the English Channel at Le Havre?",
        correct: "The Seine",
        w1: "The Loire",
        w2: "The Marne",
        exp: "The Seine historical riverbanks in Paris are designated a UNESCO World Heritage site, spanned by thirty-seven bridges including the Pont Neuf."
      },
      {
        q: "What 330-meter wrought-iron lattice tower was built by Gustave Eiffel on the Champ de Mars as the entrance arch for the 1889 Paris World Fair?",
        correct: "Eiffel Tower Tour Eiffel",
        w1: "Montparnasse Tower",
        w2: "Arc de Triomphe",
        exp: "Constructed using 18,000 iron pieces and 2.5 million rivets, the Eiffel Tower was the tallest human-made structure on Earth for forty-one years."
      },
      {
        q: "Which former French royal palace in Paris along the Seine is the world most visited art museum, housing Leonardo da Vinci Mona Lisa?",
        correct: "The Louvre Musée du Louvre",
        w1: "Musée d Orsay",
        w2: "Centre Pompidou",
        exp: "Originally built as a medieval fortress in the 12th century under Philip II, the Louvre features I.M. Pei iconic 1989 glass pyramid entrance."
      },
      {
        q: "What natural island in the Seine River is the historic birthplace and cradle of Paris, site of the Notre-Dame Cathedral?",
        correct: "Île de la Cité",
        w1: "Île Saint-Louis",
        w2: "Île aux Cygnes",
        exp: "Inhabited since the Celtic Parisii tribe founded Lutetia in the 3rd century BCE, the island also houses the Sainte-Chapelle and Conciergerie."
      },
      {
        q: "Which opulent royal château southwest of Paris was expanded by Sun King Louis XIV into the seat of French political power in 1682?",
        correct: "Palace of Versailles",
        w1: "Château de Fontainebleau",
        w2: "Château de Saint-Germain-en-Laye",
        exp: "Versailles is famous for its 73-meter Hall of Mirrors (Galerie des Glaces) and André Le Nôtre extensive classical geometric French gardens."
      }
    ],
    number: {
      q: "What is the total height in meters of the Eiffel Tower in Paris, including its radio broadcasting antenna?",
      target: 330,
      unit: "meters",
      imperial: "1,083 feet",
      exp: "Following the installation of a new six-meter radio antenna in 2022, the Eiffel Tower stands at exactly 330 meters tall."
    }
  },

  // Cycle 3: The Loire Valley & Renaissance Châteaux
  {
    mcqs: [
      {
        q: "What is the longest river located entirely within the territory of France, flowing 1,006 kilometers into the Atlantic Ocean at Saint-Nazaire?",
        correct: "Loire River",
        w1: "Rhône River",
        w2: "Garonne River",
        exp: "The Loire is nicknamed the last wild river in France due to its natural sandbanks and seasonal floods, flowing through the historic Garden of France."
      },
      {
        q: "Which colossal French Renaissance château in the Loire Valley was constructed for King Francis I, featuring a famous double-helix stone staircase designed by Leonardo da Vinci?",
        correct: "Château de Chambord",
        w1: "Château d Amboise",
        w2: "Château de Blois",
        exp: "Chambord contains 440 rooms and a spectacular roofline of elaborate cupolas, lanterns, and chimneys resembling a stylized medieval city skyline."
      },
      {
        q: "Which graceful 16th-century château in the Loire Valley spans the River Cher on arched stone piers, nicknamed the Ladies Château (Château des Dames)?",
        correct: "Château de Chenonceau",
        w1: "Château de Cheverny",
        w2: "Château de Chaumont",
        exp: "Chenonceau was shaped by notable women throughout French history, including Diane de Poitiers, Queen Catherine de' Medici, and Louise Dupin."
      },
      {
        q: "Which Loire Valley château is internationally celebrated for having the most elaborate geometric Renaissance formal gardens and water mazes in France?",
        correct: "Château de Villandry",
        w1: "Château d Ussé",
        w2: "Château de Sully",
        exp: "Villandry features six distinct terraced gardens restored in the early 20th century, including a world-famous ornamental kitchen garden (potager)."
      },
      {
        q: "In which royal Loire château did Leonardo da Vinci spend the final three years of his life as Premier Painter and Engineer to King Francis I?",
        correct: "Château du Clos Lucé Amboise",
        w1: "Château de Langeais",
        w2: "Château de Chinon",
        exp: "Leonardo resided at Clos Lucé from 1516 until his death in May 1519, connected by an underground tunnel to the royal Château d'Amboise."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Loire River, the longest river in France?",
      target: 1006,
      unit: "kilometers",
      imperial: "625 miles",
      exp: "The Loire River flows for 1,006 kilometers from Mount Gerbier de Jonc in the Massif Central to the Atlantic Bay of Biscay."
    }
  },

  // Cycle 4: The Pyrenees & Southwestern Landscapes
  {
    mcqs: [
      {
        q: "What high mountain barrier stretches for 430 kilometers, forming the natural physical border between France and Spain?",
        correct: "The Pyrenees",
        w1: "The Alps",
        w2: "The Jura Mountains",
        exp: "The Pyrenees separate the Iberian Peninsula from continental Western Europe, home to the tiny co-principality of Andorra."
      },
      {
        q: "What colossal glacial cirque in the French Pyrenees features sheer 1,500-meter limestone walls and the 422-meter Gavarnie Falls?",
        correct: "Cirque de Gavarnie",
        w1: "Cirque d Troumouse",
        w2: "Cirque d Estaubé",
        exp: "Described by Victor Hugo as a colosseum of nature, Gavarnie is a UNESCO World Heritage natural monument on the border of Pyrenees National Park."
      },
      {
        q: "What is the tallest coastal sand dune in Europe, rising over 100 meters high on the shore of the Arcachon Bay in southwestern France?",
        correct: "Dune of Pilat",
        w1: "Dune of Bolonia",
        w2: "Dune of Corrubedo",
        exp: "The Dune of Pilat contains sixty million cubic meters of sand, continuously advancing inland into the maritime pine forest at up to five meters per year."
      },
      {
        q: "What is the highest mountain peak in the French Pyrenees, rising 3,298 meters on the Spanish frontier in the Hautes-Pyrénées?",
        correct: "Vignemale Pique Longue",
        w1: "Pic du Midi de Bigorre",
        w2: "Montcalm",
        exp: "Vignemale features the Glacier des Oulettes and the Gaube Lake, first ascended by mountaineer Count Henry Russell who carved caves near the summit."
      },
      {
        q: "Which mountain peak in the French Pyrenees at 2,877 meters is famous for its high-altitude astronomical observatory and panoramic mountain viewing terraces?",
        correct: "Pic du Midi de Bigorre",
        w1: "Pic du Canigou",
        w2: "Pic d Anie",
        exp: "Pic du Midi was established in the 1870s and was used by NASA in 1969 to map lunar landing sites for the Apollo program due to exceptional atmospheric transparency."
      }
    ],
    number: {
      q: "What is the approximate height in meters above sea level of the Dune of Pilat, the tallest sand dune in Europe?",
      target: 106,
      unit: "meters",
      imperial: "348 feet",
      exp: "The Dune of Pilat reaches an elevation of roughly 106 meters (fluctuating with seasonal Atlantic winds) on Arcachon Bay."
    }
  },

  // Cycle 5: Provence, The French Riviera & Rhône Valley
  {
    mcqs: [
      {
        q: "What famous Mediterranean coastal region in southeastern France stretches from Toulon to Menton on the Italian border, renowned for azure waters?",
        correct: "French Riviera Côte d Azur",
        w1: "Costa Brava",
        w2: "Riviera dei Fiori",
        exp: "The Côte d'Azur became a glamorous resort destination for European royalty and artists in the late 19th century, centering on Nice, Cannes, and Monaco."
      },
      {
        q: "What spectacular river canyon in Provence, reaching depths of 700 meters, is often called the Grand Canyon of Europe?",
        correct: "Gorges du Verdon",
        w1: "Gorges du Tarn",
        w2: "Gorges de l Ardèche",
        exp: "Carved by the turquoise-green Verdon River through limestone plateaus, the 25-kilometer canyon is a premier rock climbing and kayaking destination."
      },
      {
        q: "What fierce, cold, dry northwesterly wind blows down the Rhône River valley into the Gulf of Lion in southern France, creating clear blue skies?",
        correct: "The Mistral",
        w1: "The Tramontane",
        w2: "The Sirocco",
        exp: "The Mistral accelerates through the narrowing Rhône gap, reaching speeds over 100 km/h and drying out vineyards, influencing traditional house orientations."
      },
      {
        q: "What expansive limestone plateau in Provence between the Luberon and the Verdon is famous for sweeping purple lavender fields blooming from June to August?",
        correct: "Valensole Plateau",
        w1: "Albion Plateau",
        w2: "Camargue Delta",
        exp: "The Valensole plateau covers eight hundred square kilometers, supplying essential oils for the historic French perfume industry based in Grasse."
      },
      {
        q: "What vast wetland and river delta region in southern France where the Rhône enters the Mediterranean is famous for wild white horses, black bulls, and pink flamingos?",
        correct: "The Camargue",
        w1: "Crau Plain",
        w2: "Aigues-Mortes Basin",
        exp: "Covering 930 square kilometers, the Camargue is Western Europe largest river delta, celebrated for traditional gardian cowboys and fleur de sel salt harvesting."
      }
    ],
    number: {
      q: "What maximum vertical depth in meters is reached by the towering limestone cliffs of the Gorges du Verdon in Provence?",
      target: 700,
      unit: "meters",
      imperial: "2,296 feet deep",
      exp: "The Gorges du Verdon canyon plunges up to 700 meters from the surrounding limestone plateau to the turquoise riverbed below."
    }
  },

  // Cycle 6: Brittany, Normandy & Mont Saint-Michel
  {
    mcqs: [
      {
        q: "What iconic Gothic Benedictine abbey perches atop a tidal granite island in Normandy, surrounded by Europe highest and fastest tides?",
        correct: "Mont Saint-Michel",
        w1: "St Michael Mount",
        w2: "Abbey of Saint-Étienne",
        exp: "Mont Saint-Michel and its bay are a UNESCO World Heritage site, dedicated to Archangel Michael in 708 CE and holding out against English siege in the Hundred Years' War."
      },
      {
        q: "Which coastline in Normandy was the site of the historic Allied D-Day amphibious landings on June 6, 1944 (Operation Overlord)?",
        correct: "Normandy Beaches",
        w1: "Côte d Opale",
        w2: "Côte d Émeraude",
        exp: "Allied forces landed across five codenamed assault sectors: Utah, Omaha, Gold, Juno, and Sword, initiating the liberation of Western Europe."
      },
      {
        q: "What rugged, westernmost peninsula region of France is characterized by Celtic heritage, Breton language, and dramatic Atlantic granite headlands like Pointe du Raz?",
        correct: "Brittany Bretagne",
        w1: "Normandy",
        w2: "Poitou",
        exp: "Brittany has over 2,700 kilometers of jagged coastline, famous for cider, buckwheat crêpes (galettes), and ancient standing menhirs."
      },
      {
        q: "Which spectacular coastal stretch in northern Brittany is renowned for giant, rounded pink granite boulders sculpted by ocean storms?",
        correct: "Pink Granite Coast Côte de Granit Rose",
        w1: "Côte Sauvage",
        w2: "Côte d Albâtre",
        exp: "The rare pink feldspar granite formations at Ploumanac'h turn deep rose-gold in late afternoon sunlight, protected by maritime heritage conservancies."
      },
      {
        q: "Which monumental 70-meter embroidered linen cloth in Normandy depicts the events leading up to the 1066 Norman conquest of England by William the Conqueror?",
        correct: "Bayeux Tapestry",
        w1: "Apocalypse Tapestry",
        w2: "Lady and the Unicorn",
        exp: "Commissioned by Bishop Odo of Bayeux, the embroidery illustrates the Battle of Hastings, Halley Comet, and Anglo-Norman warfare with vivid medieval detail."
      }
    ],
    number: {
      q: "In what year did Allied forces launch the massive D-Day amphibious invasion along the beaches of Normandy, France?",
      target: 1944,
      unit: "year",
      imperial: "1944 AD",
      exp: "Operation Overlord commenced on June 6, 1944, with over 156,000 American, British, and Canadian troops landing in Normandy."
    }
  },

  // Cycle 7: Major Wine Regions: Bordeaux, Burgundy & Champagne
  {
    mcqs: [
      {
        q: "Which northeastern historical province of France is the only region in the world legally permitted to produce true sparkling Champagne wine?",
        correct: "Champagne",
        w1: "Alsace",
        w2: "Lorraine",
        exp: "Under Appellation d'Origine Contrôlée (AOC) laws, Champagne must be produced in chalk-cellar vineyards around Reims and Épernay using the traditional bottle-fermentation method."
      },
      {
        q: "Which world-famous wine region in southwestern France along the Garonne and Dordogne rivers established the prestigious 1855 Official Wine Classification?",
        correct: "Bordeaux",
        w1: "Burgundy",
        w2: "Rhône Valley",
        exp: "Empereur Napoleon III requested the 1855 classification for the Paris Exposition, ranking premier crus like Château Lafite Rothschild and Château Margaux."
      },
      {
        q: "Which historic wine region in eastern France is celebrated for terroir-driven single-varietal Pinot Noir and Chardonnay wines from the Côte d'Or escarpment?",
        correct: "Burgundy Bourgogne",
        w1: "Beaujolais",
        w2: "Jura",
        exp: "Burgundy UNESCO-inscribed Climats are precisely demarcated vineyard parcels cultivated for centuries by Cistercian monks in towns like Beaune and Dijon."
      },
      {
        q: "Which northeastern French region along the Rhine River on the German border is famous for aromatic white wines like Riesling and Gewürztraminer in timbered villages?",
        correct: "Alsace",
        w1: "Lorraine",
        w2: "Franche-Comté",
        exp: "Sheltered by the Vosges mountains in a warm rain shadow, Alsace features the scenic 170-kilometer Route des Vins d'Alsace and half-timbered towns like Colmar."
      },
      {
        q: "Which historic appellation in the southern Rhône Valley, named after the 14th-century summer palace of the Avignon Popes, produces rich Grenache blends?",
        correct: "Châteauneuf-du-Pape",
        w1: "Gigondas",
        w2: "Hermitage",
        exp: "Châteauneuf-du-Pape vineyards are famous for large smooth galets roulés quartzite river stones that absorb daytime solar heat and warm the vines overnight."
      }
    ],
    number: {
      q: "In what year was the historic Official Classification of Bordeaux Wine decreed for the Exposition Universelle de Paris by Napoleon III?",
      target: 1855,
      unit: "year",
      imperial: "1855 AD",
      exp: "The 1855 Bordeaux classification ranked the greatest Médoc and Graves estates, remaining the international benchmark of fine wine valuation."
    }
  },

  // Cycle 8: Corsica, The Mediterranean Island of Beauty
  {
    mcqs: [
      {
        q: "What mountainous French island in the Mediterranean Sea, nicknamed the Island of Beauty (Île de Beauté), was the birthplace of Napoleon Bonaparte?",
        correct: "Corsica Corse",
        w1: "Sardinia",
        w2: "Elba",
        exp: "Corsica was sold by the Republic of Genoa to France in the 1768 Treaty of Versailles, just one year before Napoleon was born in the capital Ajaccio in August 1769."
      },
      {
        q: "What famous 180-kilometer high-altitude mountain trekking trail traverses the rugged granite spine of Corsica from Calenzana to Conca?",
        correct: "GR20",
        w1: "Tour du Mont Blanc",
        w2: "Camino de Santiago",
        exp: "The GR20 (Grande Randonnée 20) is widely regarded as one of the toughest and most scenic long-distance alpine footpaths in Europe."
      },
      {
        q: "What stunning UNESCO World Heritage coastal landscape in western Corsica features sheer 300-meter pink-and-red volcanic porphyry rock formations over the sea?",
        correct: "Calanques de Piana",
        w1: "Scandola Reserve",
        w2: "Cap Corse",
        exp: "Eroded by wind and sea salt into bizarre sculpted tafoni cavities, the Calanques plunge vertically into the turquoise waters of the Gulf of Porto."
      },
      {
        q: "Which medieval fortified citadel town on the southern tip of Corsica perches dramatically atop 70-meter white limestone sea cliffs above the Strait of Bonifacio?",
        correct: "Bonifacio",
        w1: "Calvi",
        w2: "Bastia",
        exp: "Bonifacio overlooks the twelve-kilometer Strait of Bonifacio facing Sardinia, famous for the King of Aragon Staircase carved directly down the vertical cliff."
      },
      {
        q: "What dense, aromatic evergreen Mediterranean scrubland covering over half of Corsica releases sweet scents of myrtle, rosemary, and cistus?",
        correct: "Maquis",
        w1: "Garrigue",
        w2: "Chaparral",
        exp: "Napoleon famously declared that he could recognize his native Corsica with his eyes closed purely by the unique aromatic scent of the maquis in the sea breeze."
      }
    ],
    number: {
      q: "In what year was Napoleon Bonaparte born in the Casa Buonaparte in Ajaccio, Corsica?",
      target: 1769,
      unit: "year",
      imperial: "1769 AD",
      exp: "Napoleon Bonaparte was born on August 15, 1769, shortly after France acquired sovereignty over Corsica from Genoa."
    }
  },

  // Cycle 9: The Massif Central & Volcanoes of Auvergne
  {
    mcqs: [
      {
        q: "What ancient elevated plateau region covering roughly fifteen percent of southern central France is formed by extinct volcanoes and deep river gorges?",
        correct: "The Massif Central",
        w1: "The Jura",
        w2: "The Morvan",
        exp: "The Massif Central is France oldest mountain terrain, divided into volcanic basalt plateaus and limestone karsts like the Grands Causses."
      },
      {
        q: "What 40-kilometer tectonic fault chain in Auvergne features eighty volcanic cinder cones, lava domes, and maars that formed between 95,000 and 8,400 years ago?",
        correct: "Chaîne des Puys",
        w1: "Monts Dore",
        w2: "Monts du Cantal",
        exp: "Inscribed on the UNESCO World Heritage list in 2018, the Chaîne des Puys is dominated by the 1,465-meter lava dome of the Puy de Dôme."
      },
      {
        q: "Which cable-stayed bridge spanning the Tarn River valley near Millau is the tallest bridge structure in the world, engineered with towers standing 343 meters high?",
        correct: "Millau Viaduct",
        w1: "Pont de Normandie",
        w2: "Pont de Tancarville",
        exp: "Designed by French structural engineer Michel Virlogeux and British architect Norman Foster, the Millau Viaduct opened in 2004 carrying the A75 motorway."
      },
      {
        q: "In which natural limestone caves of Mount Combalou in the Massif Central must all authentic Roquefort blue cheese be aged according to French law?",
        correct: "Roquefort-sur-Soulzon Caves",
        w1: "Comté Caves",
        w2: "Gouffre de Padirac",
        exp: "Natural geological fissures called fleurines circulate moist cool air that fosters the microscopic blue mold Penicillium roqueforti in raw sheep milk cheeses."
      },
      {
        q: "What is the highest volcanic summit in the Massif Central, rising 1,885 meters in the Monts Dore range of Auvergne?",
        correct: "Puy de Sancy",
        w1: "Puy de Dôme",
        w2: "Plomb du Cantal",
        exp: "Puy de Sancy is an ancient stratovolcano inactive for over 200,000 years, offering alpine skiing and headwaters of the Dordogne River."
      }
    ],
    number: {
      q: "What is the maximum structural mast height in meters of the Millau Viaduct in southern France?",
      target: 343,
      unit: "meters",
      imperial: "1,125 feet tall (taller than the Eiffel Tower)",
      exp: "The Millau Viaduct reaches a structural mast height of 343 meters, making it the tallest bridge structure on Earth."
    }
  },

  // Cycle 10: Administrative Regions & Geographic Superlatives
  {
    mcqs: [
      {
        q: "What geometric nickname is commonly used to describe mainland France due to its six-sided continental geographical shape?",
        correct: "The Hexagon L Hexagone",
        w1: "The Pentagon",
        w2: "The Octagon",
        exp: "The term L'Hexagone is widely used in French journalism and politics as a geographic shorthand for metropolitan France."
      },
      {
        q: "How many total administrative regions comprise the French Republic following the major regional reform of 2016 (including five overseas regions)?",
        correct: "18 Regions",
        w1: "13 Regions",
        w2: "22 Regions",
        exp: "France consists of thirteen metropolitan regions in Europe and five overseas regions (Guadeloupe, Martinique, French Guiana, Réunion, and Mayotte)."
      },
      {
        q: "Which French overseas department in South America is home to the European Space Agency primary equatorial rocket spaceport near Kourou?",
        correct: "French Guiana Guyane",
        w1: "Guadeloupe",
        w2: "Martinique",
        exp: "The Guiana Space Centre (CSG) benefits from its proximity to the equator (five degrees North latitude), imparting maximum rotational boost to Ariane rockets."
      },
      {
        q: "Which active shield volcano on the French Indian Ocean island of Réunion is one of the most active volcanoes in the world, erupting dozens of times per decade?",
        correct: "Piton de la Fournaise",
        w1: "Piton des Neiges",
        w2: "Mount Pelée",
        exp: "Piton de la Fournaise (Peak of the Furnace) produces fluid basaltic lava flows that cascade down the Grand Brûlé caldera into the Indian Ocean."
      },
      {
        q: "Due to its scattered overseas island territories across all oceans, which country possesses the largest Exclusive Economic Zone (EEZ) on Earth, covering 11.7 million sq km?",
        correct: "France",
        w1: "United States",
        w2: "Australia",
        exp: "French maritime exclusive economic zones encompass 11.7 million square kilometers across the Pacific, Atlantic, Indian, and Southern oceans."
      }
    ],
    number: {
      q: "How many total administrative regions (metropolitan plus overseas) comprise the French Republic?",
      target: 18,
      unit: "regions",
      imperial: "18 administrative regions",
      exp: "Since January 1, 2016, France is divided into eighteen official regions (13 in metropolitan France and 5 overseas)."
    }
  }
];

// Build France Quiz
buildQuiz({
  id: 'france-geography-heritage-60',
  theme: 'France: Geography, Regions & Cultural Heritage',
  title: 'France: Geography, Regions & Cultural Heritage',
  description: 'A 60-question grand master assessment exploring Mont Blanc & the Alps, the Seine in Paris, the Loire châteaux, the Pyrenees, Provence & the French Riviera, Normandy, world wine terroirs, Corsica, the Massif Central, and overseas regions.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, franceCycles);

console.log('France quiz built successfully!');
