const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 2. italy-geography-heritage-60
// =========================================================================
const italyCycles = [
  // Cycle 1: Alpine Peaks, Dolomites & Northern Lakes
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Italy and Western Europe, standing at 4,808 meters on the French-Italian border?",
        correct: "Monte Bianco Mont Blanc",
        w1: "Monte Rosa",
        w2: "Gran Paradiso",
        exp: "Monte Bianco towers over the Aosta Valley in the Graian Alps, featuring vast glaciers and the 11.6-kilometer Mont Blanc Tunnel."
      },
      {
        q: "Which spectacular mountain range in northeastern Italy is famous for dramatic pale dolomite limestone pinnacles and jagged peaks?",
        correct: "The Dolomites",
        w1: "The Apennines",
        w2: "The Maritime Alps",
        exp: "The UNESCO World Heritage Dolomites turn pink and purple at sunset in a light phenomenon known locally as Enrosadira."
      },
      {
        q: "What is the largest lake in Italy, stretching across Lombardy, Veneto, and Trentino-Alto Adige?",
        correct: "Lake Garda",
        w1: "Lake Como",
        w2: "Lake Maggiore",
        exp: "Lake Garda covers 370 square kilometers, with a mild Mediterranean microclimate that allows olive and lemon groves to thrive beneath alpine cliffs."
      },
      {
        q: "Which deep, Y-shaped glacial lake in Lombardy is surrounded by dramatic mountain slopes and aristocratic historic villas like Villa Carlotta?",
        correct: "Lake Como",
        w1: "Lake Iseo",
        w2: "Lake Lugano",
        exp: "Lake Como reaches a depth of 410 meters, making it one of the deepest freshwater lakes in Europe, centered on picturesque towns like Bellagio."
      },
      {
        q: "What is the highest mountain peak located entirely within Italian territory, standing 4,061 meters high in the Graian Alps?",
        correct: "Gran Paradiso",
        w1: "Cervino",
        w2: "Ortles",
        exp: "Gran Paradiso was established as a royal hunting reserve by King Victor Emmanuel II to protect the endangered Alpine ibex, becoming Italy first national park in 1922."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Monte Bianco (Mont Blanc)?",
      target: 4808,
      unit: "meters",
      imperial: "15,774 feet",
      exp: "Monte Bianco officially measures 4,808 meters in summit elevation, the highest point in the entire Alps mountain system."
    }
  },

  // Cycle 2: The Po River Valley & Northern Industrial Heart
  {
    mcqs: [
      {
        q: "What is the longest river in Italy, flowing 652 kilometers eastward across the northern plains into the Adriatic Sea?",
        correct: "Po River",
        w1: "Adige River",
        w2: "Tiber River",
        exp: "The Po River drains the fertile Pianura Padana, providing irrigation for roughly a third of Italy agricultural produce and hydroelectric power."
      },
      {
        q: "Which city is the financial, commercial, and fashion capital of Italy, located in the central Po Valley in Lombardy?",
        correct: "Milan",
        w1: "Turin",
        w2: "Bologna",
        exp: "Milan is home to the Italian stock exchange (Borsa Italiana), the Gothic Duomo cathedral, and Leonardo da Vinci Last Supper."
      },
      {
        q: "Which northern Italian city in Piedmont on the Po River served as the first capital of unified Italy from 1861 to 1865 and home of FIAT?",
        correct: "Turin",
        w1: "Genoa",
        w2: "Verona",
        exp: "Turin was the seat of the House of Savoy, celebrated for its Baroque royal palaces, the Mole Antonelliana, and the historic Fiat Lingotto factory."
      },
      {
        q: "Which historic university city in Emilia-Romagna is nicknamed La Grassa (The Fat) for its world-famous culinary heritage of Parmigiano, ragù, and prosciutto?",
        correct: "Bologna",
        w1: "Parma",
        w2: "Modena",
        exp: "Bologna is renowned for its forty kilometers of UNESCO-listed covered porticoes, medieval twin towers, and the world oldest university."
      },
      {
        q: "What is the second longest river in Italy, flowing from the Alpine border through Verona to empty into the Adriatic Sea?",
        correct: "Adige River",
        w1: "Piave River",
        w2: "Brenta River",
        exp: "Flowing 410 kilometers through South Tyrol and the Veneto, the Adige carved the Brenner Pass transport corridor through the Alps."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Po River, the longest river in Italy?",
      target: 652,
      unit: "kilometers",
      imperial: "405 miles",
      exp: "The Po River flows for 652 kilometers from its source on Monviso in the Cottian Alps to its expansive delta on the Adriatic Sea."
    }
  },

  // Cycle 3: The Apennine Mountain Spine & Central Regions
  {
    mcqs: [
      {
        q: "What mountain range forms the 1,200-kilometer geographical backbone of the Italian peninsula, extending from Liguria down to Calabria?",
        correct: "Apennine Mountains",
        w1: "Alps",
        w2: "Maritime Alps",
        exp: "The Apennines divide Italy into Tyrrhenian and Adriatic watersheds, sheltering historic hill towns and wildlife like the Marsican brown bear."
      },
      {
        q: "What is the highest mountain peak in the Apennines, rising 2,912 meters in the Gran Sasso d'Italia massif in Abruzzo?",
        correct: "Corno Grande",
        w1: "Monte Vettore",
        w2: "Monte Cimone",
        exp: "Corno Grande hosts the Calderone Glacier, historically recognized as the southernmost glacier in Europe."
      },
      {
        q: "Which picturesque central Italian region is world-renowned for rolling cypress-lined hills, Chianti vineyards, Renaissance art, and Florence?",
        correct: "Tuscany",
        w1: "Umbria",
        w2: "Marche",
        exp: "Tuscany was the cradle of the Italian Renaissance, home to historic towns like Siena, Pisa, San Gimignano, and Lucca."
      },
      {
        q: "Which landlocked central Italian region is nicknamed The Green Heart of Italy, famous for Lake Trasimeno, Assisi, and medieval hill towns?",
        correct: "Umbria",
        w1: "Lazio",
        w2: "Molise",
        exp: "Umbria is renowned for the Basilica of Saint Francis of Assisi, the Orvieto Cathedral, and sacred pilgrimage routes through the Apennine valleys."
      },
      {
        q: "Which tiny independent enclave republic, claiming to be the world oldest surviving constitutional republic, is perched atop Mount Titano in Italy?",
        correct: "San Marino",
        w1: "Vatican City",
        w2: "Monaco",
        exp: "Founded according to tradition by Saint Marinus in 301 CE, San Marino is entirely surrounded by the Italian regions of Emilia-Romagna and Marche."
      }
    ],
    number: {
      q: "What is the elevation in meters of Corno Grande, the highest peak in the Apennine Mountains?",
      target: 2912,
      unit: "meters",
      imperial: "9,554 feet",
      exp: "Corno Grande in the Gran Sasso massif of Abruzzo stands at 2,912 meters above sea level."
    }
  },

  // Cycle 4: Rome, The Tiber & Sacred Enclaves
  {
    mcqs: [
      {
        q: "On how many historic hills was the ancient city of Rome originally founded along the Tiber River?",
        correct: "Seven Hills",
        w1: "Five Hills",
        w2: "Nine Hills",
        exp: "The Seven Hills of Rome include the Palatine, Capitoline, Aventine, Caelian, Esquiline, Viminal, and Quirinal."
      },
      {
        q: "Which historic river flows 405 kilometers through Rome to empty into the Tyrrhenian Sea at Ostia Antica?",
        correct: "Tiber River",
        w1: "Arno River",
        w2: "Aniene River",
        exp: "Known as Flavus (the blond river) for its yellow silt, the Tiber provided ancient Rome with strategic river navigation while protecting its hills."
      },
      {
        q: "What is the smallest independent sovereign state in the world by both area and population, completely enclaved within Rome?",
        correct: "Vatican City State",
        w1: "San Marino",
        w2: "Monaco",
        exp: "Established by the Lateran Treaty in 1929, Vatican City covers just 49 hectares (0.49 sq km), centered on St. Peter Basilica and the Sistine Chapel."
      },
      {
        q: "What ancient paved Roman military highway, nicknamed Regina Viarum (Queen of Roads), connected Rome to the southern port of Brundisium (Brindisi)?",
        correct: "Appian Way Via Appia",
        w1: "Via Flaminia",
        w2: "Via Aurelia",
        exp: "Begun in 312 BCE by censor Appius Claudius Caecus, the Appian Way was paved with massive fitted basalt polygonal flagstones."
      },
      {
        q: "Which iconic Roman amphitheater completed in 80 CE under Emperor Titus seated up to 50,000 spectators for gladiatorial games?",
        correct: "The Colosseum",
        w1: "Circus Maximus",
        w2: "Teatro di Marcello",
        exp: "Built of travertine limestone, volcanic tuff, and concrete, the Flavian Amphitheater remains the largest standing amphitheater ever built."
      }
    ],
    number: {
      q: "In what year CE was the monumental Colosseum in Rome officially dedicated and opened under Emperor Titus?",
      target: 80,
      unit: "CE",
      imperial: "80 AD",
      exp: "Emperor Titus inaugurated the Colosseum in 80 CE with one hundred days of gladiatorial contests and public spectacles."
    }
  },

  // Cycle 5: Campania, Mount Vesuvius & The Amalfi Coast
  {
    mcqs: [
      {
        q: "Which active stratovolcano on the Gulf of Naples famously erupted in 79 CE, burying the Roman cities of Pompeii and Herculaneum?",
        correct: "Mount Vesuvius",
        w1: "Mount Etna",
        w2: "Stromboli",
        exp: "Vesuvius is the only volcano on the European mainland to have erupted within the last hundred years, monitored closely due to dense populations in Naples."
      },
      {
        q: "Which spectacular 50-kilometer coastline in Campania south of Naples features sheer cliffs, colorful pastel villages like Positano, and terraced lemon groves?",
        correct: "Amalfi Coast",
        w1: "Cinque Terre",
        w2: "Riviera dei Fiori",
        exp: "The UNESCO World Heritage Amalfi Coast was a medieval maritime republic that pioneered the Amalfi Maritime Code regulating Mediterranean sea trade."
      },
      {
        q: "Which glamorous island in the Bay of Naples is renowned for its dramatic Faraglioni sea stacks and the sea-cave known as the Blue Grotto?",
        correct: "Isle of Capri",
        w1: "Ischia",
        w2: "Procida",
        exp: "Sunlight passing through an underwater cavity illuminates the water of the Blue Grotto with a magical cobalt-blue reflection."
      },
      {
        q: "What is the largest active volcanic caldera in Europe, located immediately west of Naples, known for geothermal fumaroles and bradyseism ground movement?",
        correct: "Campi Flegrei Phlegraean Fields",
        w1: "Monte Amiata",
        w2: "Vulcano",
        exp: "The Phlegraean Fields caldera spans thirteen kilometers across, containing twenty-four craters and the bubbling sulfur vents of Solfatara."
      },
      {
        q: "Which historic capital of Campania is the third largest municipality in Italy, famous for Spaccanapoli, Mount Vesuvius views, and inventing Neapolitan pizza?",
        correct: "Naples",
        w1: "Salerno",
        w2: "Caserta",
        exp: "Naples historical center is a UNESCO World Heritage site, home to underground Greek-Roman catacombs, Castel dell'Ovo, and the San Carlo opera house."
      }
    ],
    number: {
      q: "In what year CE did Mount Vesuvius erupt, completely burying Pompeii under meters of volcanic ash and pumice?",
      target: 79,
      unit: "CE",
      imperial: "79 AD",
      exp: "Vesuvius erupted in late August or autumn of 79 CE, as famously documented by eyewitness Pliny the Younger in letters to Tacitus."
    }
  },

  // Cycle 6: Sicily, Mount Etna & The Aeolian Islands
  {
    mcqs: [
      {
        q: "What is the largest island in the Mediterranean Sea, separated from the Italian mainland by the narrow Strait of Messina?",
        correct: "Sicily",
        w1: "Sardinia",
        w2: "Corsica",
        exp: "Sicily covers 25,711 square kilometers, bearing cultural influences from Phoenicians, Greeks, Romans, Arabs, Normans, and Spaniards."
      },
      {
        q: "What is the highest and most active volcano in Europe, rising over 3,350 meters on the eastern coast of Sicily above Catania?",
        correct: "Mount Etna",
        w1: "Mount Vesuvius",
        w2: "Stromboli",
        exp: "Mount Etna is in a state of near-continuous eruptive activity, with rich volcanic soils supporting fertile vineyards, pistachio groves, and citrus orchards."
      },
      {
        q: "Which small volcanic island in the Aeolian archipelago north of Sicily has been erupting almost continuously for over two thousand years, nicknamed the Lighthouse of the Mediterranean?",
        correct: "Stromboli",
        w1: "Vulcano",
        w2: "Lipari",
        exp: "Strombolian eruptions produce rhythmic fountain-like explosions of incandescent cinders visible to passing ships at night."
      },
      {
        q: "Which narrow, turbulent maritime channel separating Sicily from the Italian peninsula of Calabria is famous for mythical whirlpools Scylla and Charybdis?",
        correct: "Strait of Messina",
        w1: "Strait of Sicily",
        w2: "Strait of Bonifacio",
        exp: "At its narrowest point, the Strait of Messina is only 3.1 kilometers wide, characterized by strong opposing tidal currents between the Ionian and Tyrrhenian seas."
      },
      {
        q: "Which archaeological site in southern Sicily features seven monumental Doric temples built by Greek colonists in the 5th century BCE?",
        correct: "Valley of the Temples Agrigento",
        w1: "Selinunte",
        w2: "Segesta",
        exp: "The Temple of Concordia at Agrigento is one of the best-preserved classical Greek temples in existence, converted into a Christian basilica in the 6th century."
      }
    ],
    number: {
      q: "What is the approximate summit elevation in meters of Mount Etna, the highest active volcano in Europe?",
      target: 3357,
      unit: "meters",
      imperial: "11,014 feet",
      exp: "Mount Etna summit elevation fluctuates with ongoing summit cone eruptions, recently measured at approximately 3,357 meters above sea level."
    }
  },

  // Cycle 7: Sardinia, Tyrrhenian Coast & Maritime Heritage
  {
    mcqs: [
      {
        q: "What is the second largest island in the Mediterranean Sea, located west of the Italian peninsula, famous for rugged granite mountains and emerald waters?",
        correct: "Sardinia",
        w1: "Sicily",
        w2: "Corsica",
        exp: "Sardinia is an ancient geological landmass known for its distinct Sardinian language, Gennargentu mountains, and Costa Smeralda beaches."
      },
      {
        q: "What ancient megalithic stone towers built between 1900 and 730 BCE are unique to the prehistoric landscape of Sardinia?",
        correct: "Nuraghi",
        w1: "Talaiots",
        w2: "Dolmens",
        exp: "Over seven thousand stone nuraghe defensive towers and fortified villages dot the Sardinian countryside, including the UNESCO site of Su Nuraxi di Barumini."
      },
      {
        q: "Which major Ligurian port city was the capital of a powerful maritime republic for over seven centuries and the birthplace of Christopher Columbus?",
        correct: "Genoa",
        w1: "La Spezia",
        w2: "Livorno",
        exp: "The Republic of Genoa commanded extensive trade networks across the Mediterranean and Black Sea, home to the UNESCO-listed Palazzi dei Rolli."
      },
      {
        q: "Which picturesque coastal strip of five cliffside fishing villages in Liguria is famous for colorful houses perched over the sea and walking trails?",
        correct: "Cinque Terre",
        w1: "Amalfi Coast",
        w2: "Costa Smeralda",
        exp: "Cinque Terre comprises Monterosso al Mare, Vernazza, Corniglia, Manarola, and Riomaggiore, connected by the scenic Sentiero Azzurro footpaths."
      },
      {
        q: "Which island in the Tuscan Archipelago is famous as the place of Napoleon Bonaparte first exile in 1814 before his escape for the Hundred Days?",
        correct: "Elba",
        w1: "Giglio",
        w2: "Capraia",
        exp: "Napoleon ruled as sovereign of Elba for three hundred days, establishing roads, iron mines, and civic infrastructure before sailing for France."
      }
    ],
    number: {
      q: "Approximately how many ancient megalithic stone Nuraghe towers still survive across the island of Sardinia today?",
      target: 7000,
      unit: "Nuraghi",
      imperial: "Over 7,000 stone towers",
      exp: "Archaeologists estimate that more than 7,000 prehistoric Nuraghi remain standing across Sardinia from the Bronze and Iron Ages."
    }
  },

  // Cycle 8: Southern Italy, Puglia & Basilicata
  {
    mcqs: [
      {
        q: "Which southern Italian region forms the heel of the Italian boot, bordered by the Adriatic Sea to the east and the Ionian Sea to the south?",
        correct: "Puglia Apulia",
        w1: "Calabria",
        w2: "Basilicata",
        exp: "Puglia is Italy largest olive oil producer, characterized by red terra rossa soil, ancient centuries-old olive trees, and baroque cities like Lecce."
      },
      {
        q: "What unique conical, dry-stone whitewashed houses with corbelled limestone roofs are characteristic of the town of Alberobello in Puglia?",
        correct: "Trulli",
        w1: "Dammusi",
        w2: "Masi",
        exp: "Trulli were built without mortar so peasant farmers could quickly dismantle them into stone rubble when royal tax inspectors visited."
      },
      {
        q: "Which ancient city in Basilicata is world-famous for the Sassi, an entire ancient city carved directly into the soft calcarenite rock of a river ravine?",
        correct: "Matera",
        w1: "Potenza",
        w2: "Taranto",
        exp: "Matera is considered one of the oldest continuously inhabited cities on Earth, transformed from mid-20th-century poverty into a European Capital of Culture in 2019."
      },
      {
        q: "Which rugged mountainous region forms the toe of the Italian peninsula, bounded by the Tyrrhenian and Ionian seas with capital Catanzaro?",
        correct: "Calabria",
        w1: "Puglia",
        w2: "Campania",
        exp: "Calabria features dense forested highlands in the Aspromonte and Sila national parks, bergamot orange orchards, and the Riace Bronzes in Reggio Calabria."
      },
      {
        q: "Which promontory in northern Puglia projects into the Adriatic Sea, often called the Spur of the Italian boot, famous for ancient Umbra forest?",
        correct: "Gargano Peninsula",
        w1: "Salento Peninsula",
        w2: "Calabrian Horn",
        exp: "The Gargano National Park contains high white limestone sea cliffs, coastal sea caves, and the ancient pilgrimage sanctuary of Monte Sant'Angelo."
      }
    ],
    number: {
      q: "For approximately how many thousands of years has the cave-dwelling settlement of Matera (Sassi di Matera) been continuously inhabited?",
      target: 9,
      unit: "thousand years",
      imperial: "9,000 years of continuous habitation",
      exp: "Archaeological evidence shows humans have inhabited the limestone caves of Matera continuously since the Paleolithic and Neolithic eras roughly 9,000 years ago."
    }
  },

  // Cycle 9: Adriatic Coast, Po Delta & Venetian Lagoon
  {
    mcqs: [
      {
        q: "Across how many small islands in the shallow Venetian Lagoon is the historic city of Venice built, connected by over 400 bridges?",
        correct: "118 Islands",
        w1: "52 Islands",
        w2: "200 Islands",
        exp: "Venice buildings rest on millions of waterlogged oak and larch timber piles driven deep into underwater clay strata over fifteen centuries."
      },
      {
        q: "What billion-euro integrated mobile barrier system consisting of seventy-eight underwater flap gates protects Venice from high tide floods (Acqua Alta)?",
        correct: "MOSE Project",
        w1: "Delta Plan",
        w2: "Thames Barrier",
        exp: "Modulo Sperimentale Elettromeccanico gates rise from the seafloor at the three lagoon inlets (Lido, Malamocco, Chioggia) when tides exceed 110 centimeters."
      },
      {
        q: "Which historic city near the Adriatic coast in Emilia-Romagna served as the capital of the Western Roman Empire and is famed for 5th-century Byzantine mosaics?",
        correct: "Ravenna",
        w1: "Rimini",
        w2: "Ferrara",
        exp: "Ravenna contains eight UNESCO World Heritage monuments, including the Basilica of San Vitale and the Mausoleum of Galla Placidia."
      },
      {
        q: "What vast wetland nature reserve where the Po River branches into the Adriatic Sea forms the largest protected wetland area in Italy?",
        correct: "Po Delta Regional Park",
        w1: "Maremma Marshes",
        w2: "Pontine Marshes",
        exp: "The Po Delta encompasses lagoons, brackish reedbeds, and barrier islands, supporting over three hundred bird species including vast flocks of greater flamingos."
      },
      {
        q: "Which historic northeastern port city on the Gulf of Trieste near the Slovenian border was the primary seaport of the Austro-Hungarian Empire?",
        correct: "Trieste",
        w1: "Udine",
        w2: "Gorizia",
        exp: "Trieste is famous for its grand Central European neoclassical architecture, historic literary cafes frequented by James Joyce, and the Bora gale wind."
      }
    ],
    number: {
      q: "Approximately how many bridges span the network of 150 canals across the historic center of Venice?",
      target: 400,
      unit: "bridges",
      imperial: "Over 400 bridges",
      exp: "The city of Venice features approximately 400 stone, brick, and wooden pedestrian bridges connecting its 118 lagoon islands."
    }
  },

  // Cycle 10: Italian Wine, Agronomy & UNESCO Heritage Records
  {
    mcqs: [
      {
        q: "Which country holds the world record for the highest number of UNESCO World Heritage Sites, boasting sixty inscribed cultural and natural properties?",
        correct: "Italy",
        w1: "China",
        w2: "France",
        exp: "Italy leads the world in UNESCO World Heritage properties, spanning ancient Roman monuments, Renaissance historic city centers, and unique cultural landscapes."
      },
      {
        q: "What prestigious quality classification on Italian wine labels (Denominazione di Origine Controllata e Garantita) represents the highest quality tier?",
        correct: "DOCG",
        w1: "IGT",
        w2: "DOC",
        exp: "DOCG wines must meet strict yield limits, grape varietal standards, and pass mandatory chemical and sensory taste panel evaluations before bottling."
      },
      {
        q: "Which hilly subregion of Piedmont is world-renowned for producing prestigious, long-aging Barolo and Barbaresco red wines from the Nebbiolo grape?",
        correct: "Langhe",
        w1: "Chianti",
        w2: "Valpolicella",
        exp: "The UNESCO-listed vineyard landscape of Langhe-Roero and Monferrato is characterized by steep clay-limestone ridges and historic castle hilltops."
      },
      {
        q: "Which UNESCO-protected valley in southern Tuscany is celebrated for iconic Renaissance agricultural landscapes, cypress avenues, and Brunello di Montalcino wine?",
        correct: "Val d Orcia",
        w1: "Val di Chiana",
        w2: "Mugello Valley",
        exp: "The Val d'Orcia was deliberately planned and laid out in the 14th and 15th centuries to reflect utopian ideals of good Renaissance governance."
      },
      {
        q: "Which volcanic island in the Strait of Sicily south of Sicily is renowned for wind-swept zibibbo grape bush vines grown in hollows called conche?",
        correct: "Pantelleria",
        w1: "Lampedusa",
        w2: "Linosa",
        exp: "The traditional agricultural practice of cultivating the alberello bush vine on Pantelleria is recognized on UNESCO Representative List of Intangible Cultural Heritage."
      }
    ],
    number: {
      q: "How many UNESCO World Heritage Sites does Italy host, holding the world record for the most inscriptions?",
      target: 60,
      unit: "UNESCO sites",
      imperial: "60 World Heritage Sites",
      exp: "As of 2024, Italy possesses exactly 60 inscribed UNESCO World Heritage Sites, leading all nations globally."
    }
  }
];

// Build Italy Quiz
buildQuiz({
  id: 'italy-geography-heritage-60',
  theme: 'Italy: Geography, Regions & Cultural Heritage',
  title: 'Italy: Geography, Regions & Cultural Heritage',
  description: 'A 60-question grand master assessment exploring Monte Bianco, the Dolomites, Po Valley, Apennines, Rome, Mount Vesuvius, Sicily & Etna, Sardinia, Venice Lagoon, and UNESCO records.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, italyCycles);

console.log('Italy quiz built successfully!');
