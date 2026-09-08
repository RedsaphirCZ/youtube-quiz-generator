const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 5. greece-geography-heritage-60
// =========================================================================
const greeceCycles = [
  // Cycle 1: Mount Olympus & The Greek Mainland Spine
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Greece, rising 2,917 meters on the border of Thessaly and Macedonia, revered in antiquity as the Throne of the Twelve Olympian Gods?",
        correct: "Mount Olympus Mytikas",
        w1: "Mount Parnassus",
        w2: "Mount Smolikas",
        exp: "Mount Olympus was declared the first National Park of Greece in 1938, featuring Mytikas (the summit pinnacle) and the steep Stefani (Throne of Zeus)."
      },
      {
        q: "What massive mountain range stretching from southern Albania across northern Greece is often called the Backbone of Greece?",
        correct: "Pindus Mountains Pindos",
        w1: "Rhodope Mountains",
        w2: "Taygetos Mountains",
        exp: "The Pindus range separates Epirus from Thessaly, harboring brown bears, wolves, and the high-altitude stone villages of the Zagori region."
      },
      {
        q: "Which spectacular limestone canyon in the Pindus Mountains of Epirus is recognized by the Guinness World Records as the deepest gorge in the world relative to its width?",
        correct: "Vikos Gorge",
        w1: "Samaria Gorge",
        w2: "Lousios Gorge",
        exp: "Plunging up to 1,000 meters while narrowing to just a few meters in width at its base, the Vikos Gorge is carved by the crystal Voidomatis River."
      },
      {
        q: "Which sacred mountain in central Greece overlooking the Gulf of Corinth was home to the ancient Sanctuary of Apollo and the Delphic Oracle (Pythia)?",
        correct: "Mount Parnassus",
        w1: "Mount Cithaeron",
        w2: "Mount Helicon",
        exp: "Ancient Greeks considered the Temple of Apollo at Delphi on the slopes of Mount Parnassus to be the Omphalos (navel) and center of the entire world."
      },
      {
        q: "What picturesque mountainous region in Epirus is celebrated for forty-six traditional stone villages (Zagorohoria) and arched stone packhorse bridges?",
        correct: "Zagori",
        w1: "Mani",
        w2: "Pelion",
        exp: "Zagori stone masons built masterworks like the three-arched Plakidas Bridge and Kokkori Bridge using local gray limestone without mortar."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Mytikas, the highest peak of Mount Olympus?",
      target: 2917,
      unit: "meters",
      imperial: "9,570 feet",
      exp: "Mount Olympus reaches an official elevation of 2,917 meters at its highest peak, Mytikas."
    }
  },

  // Cycle 2: Athens, The Acropolis & Attica
  {
    mcqs: [
      {
        q: "What iconic ancient limestone citadel perches 150 meters above the modern city of Athens, crowned by the Classical Parthenon temple?",
        correct: "The Acropolis of Athens",
        w1: "The Areopagus",
        w2: "Lycabettus Hill",
        exp: "Rebuilt under statesman Pericles in the Golden Age of Athens (5th century BCE), the Acropolis is the universal symbol of classical civilization and democracy."
      },
      {
        q: "In what year BCE was the Doric white Pentelic marble Parthenon temple dedicated to the goddess Athena Parthenos on the Athenian Acropolis?",
        correct: "438 BCE",
        w1: "490 BCE",
        w2: "323 BCE",
        exp: "Designed by architects Ictinus and Callicrates under sculptor Phidias, the Parthenon was dedicated at the Panathenaic Games in 438 BCE."
      },
      {
        q: "Which Ionic temple on the Acropolis is famed for the Porch of the Maidens, where six sculpted female statues (Caryatids) serve as supporting architectural columns?",
        correct: "The Erechtheion",
        w1: "Temple of Athena Nike",
        w2: "The Propylaea",
        exp: "The Erechtheion housed ancient sacred relics including the olive tree gifted by Athena and the salt spring struck by Poseidon trident."
      },
      {
        q: "What is the tallest natural limestone hill in Athens, rising 277 meters above sea level with views of the Saronic Gulf and the Chapel of Saint George?",
        correct: "Mount Lycabettus",
        w1: "Philopappos Hill",
        w2: "Pnyx",
        exp: "Accessible by foot or funicular railway, Mount Lycabettus offers 360-degree panoramic sunset views across the entire Athenian basin to Piraeus port."
      },
      {
        q: "Which marble temple dedicated to the sea god perches dramatically on the sheer sea cliffs of Cape Sounion at the southern tip of the Attica peninsula?",
        correct: "Temple of Poseidon",
        w1: "Temple of Hephaestus",
        w2: "Temple of Apollo",
        exp: "Lord Byron carved his signature into one of the Doric marble columns in 1810, commemorating where King Aegeus leaped into the sea in Greek myth."
      }
    ],
    number: {
      q: "In what year BCE was the Parthenon temple dedicated on the Acropolis of Athens?",
      target: 438,
      unit: "BCE",
      imperial: "438 BC",
      exp: "The Parthenon was officially dedicated to the patron goddess Athena Parthenos in 438 BCE."
    }
  },

  // Cycle 3: The Peloponnese & The Corinth Canal
  {
    mcqs: [
      {
        q: "What narrow, six-kilometer artificial ship canal cut through sheer 60-meter rock walls in 1893, turning the Peloponnese into an island?",
        correct: "Corinth Canal",
        w1: "Suez Canal",
        w2: "Kiel Canal",
        exp: "First attempted by Roman Emperor Nero in 67 CE, the modern canal connects the Gulf of Corinth with the Saronic Gulf in the Aegean Sea."
      },
      {
        q: "Which ancient sanctuary in the western Peloponnese was the birthplace and quadrennial host of the ancient Olympic Games from 776 BCE to 393 CE?",
        correct: "Ancient Olympia",
        w1: "Nemea",
        w2: "Isthmia",
        exp: "Olympia housed the colossal 13-meter chryselephantine Statue of Zeus, sculpted by Phidias, which stood as one of the Seven Wonders of the Ancient World."
      },
      {
        q: "Which Late Bronze Age fortified citadel in the northeastern Peloponnese features the monumental 13th-century BCE Lion Gate and the Treasury of Atreus?",
        correct: "Mycenae",
        w1: "Tiryns",
        w2: "Sparta",
        exp: "Excavated by Heinrich Schliemann in 1876, Mycenae yielded the famous golden death mask attributed to Homeric King Agamemnon."
      },
      {
        q: "Which 4th-century BCE ancient theatre in the Argolid is world-famous for its acoustic design, allowing whispers on stage to be heard in all 14,000 stone seats?",
        correct: "Theatre of Epidaurus",
        w1: "Odeon of Herodes Atticus",
        w2: "Theatre of Dionysus",
        exp: "Designed by Polykleitos the Younger as part of the Sanctuary of Asklepios, the theatre continues to host classical Greek dramas during the Athens-Epidaurus Festival."
      },
      {
        q: "Which medieval fortified Byzantine ghost city in the Peloponnese, built on the slopes of Mount Taygetos, was the last intellectual capital of the Byzantine Empire?",
        correct: "Mystras",
        w1: "Monemvasia",
        w2: "Methoni",
        exp: "Mystras was the seat of the Despotate of the Morea, where the last Byzantine Emperor Constantine XI Palaiologos was crowned in 1449."
      }
    ],
    number: {
      q: "In what year was the deep rock-cut Corinth Canal officially completed and opened for maritime navigation across the Isthmus of Corinth?",
      target: 1893,
      unit: "year",
      imperial: "1893 AD",
      exp: "The Corinth Canal was formally inaugurated on July 25, 1893, cutting through 6.4 kilometers of solid limestone rock."
    }
  },

  // Cycle 4: Crete, The Minoan Palace & Samaria Gorge
  {
    mcqs: [
      {
        q: "What is the largest and most populous island in Greece and fifth largest in the Mediterranean Sea, the cradle of Europe earliest Minoan Bronze Age civilization?",
        correct: "Crete Kriti",
        w1: "Rhodes",
        w2: "Euboea",
        exp: "Crete spans over 8,300 square kilometers, dominated by four rugged mountain ranges: the White Mountains (Lefka Ori), Idi (Psiloritis), Dikti, and Thripti."
      },
      {
        q: "Which monumental Bronze Age Minoan palace complex near Heraklion was excavated by Sir Arthur Evans, celebrated for the Bull-Leaping fresco and Throne Room?",
        correct: "Palace of Knossos",
        w1: "Phaistos Palace",
        w2: "Malia Palace",
        exp: "Knossos is linked in Greek myth to King Minos, Daedalus, and the subterranean Labyrinth that imprisoned the monstrous Minotaur."
      },
      {
        q: "What famous sixteen-kilometer river gorge in the White Mountains of western Crete is one of the longest and most popular hiking gorges in Europe?",
        correct: "Samaria Gorge",
        w1: "Imbros Gorge",
        w2: "Aradena Gorge",
        exp: "The hike descends 1,200 meters from the Omalos plateau to the Libyan Sea at Agia Roumeli, famous for the Iron Gates (Portes) where cliffs narrow to four meters."
      },
      {
        q: "What is the highest mountain peak on the island of Crete, rising 2,456 meters in the Idi Range, home to the sacred Ideon Cave where infant Zeus was reared?",
        correct: "Mount Psiloritis Mount Ida",
        w1: "Pachnes",
        w2: "Mount Dikti",
        exp: "In mythology, the nymph Amalthea nursed Zeus with goat milk inside the cave while Kouretes warriors clashed shields to drown out the baby cries from Cronus."
      },
      {
        q: "Which protected island lagoon and beach in southwestern Crete is world-famous for its shallow turquoise waters and delicate pink coral sand?",
        correct: "Elafonisi Beach",
        w1: "Balos Lagoon",
        w2: "Preveli Beach",
        exp: "The pink hue comes from millions of crushed red and pink microscopic shells of benthic foraminifera washed ashore onto the white sand dunes."
      }
    ],
    number: {
      q: "What is the total trail hiking distance in kilometers of the Samaria Gorge national park in western Crete?",
      target: 16,
      unit: "kilometers",
      imperial: "10 miles",
      exp: "The Samaria Gorge footpath covers sixteen kilometers from the Xyloskalo trailhead down to the Libyan Sea coast."
    }
  },

  // Cycle 5: The Cyclades: Santorini & Mykonos
  {
    mcqs: [
      {
        q: "What volcanic crescent island in the Cyclades was reshaped around 1600 BCE by a colossal Bronze Age caldera explosion that devastated Minoan civilization?",
        correct: "Santorini Thira",
        w1: "Mykonos",
        w2: "Naxos",
        exp: "The Minoan eruption blasted out a 400-meter-deep sea caldera, leaving sheer cliffs topped by the whitewashed cave houses and blue-domed churches of Oia and Fira."
      },
      {
        q: "Which sacred uninhabited island in the center of the Cyclades was venerated in antiquity as the holy birthplace of twin deities Apollo and Artemis?",
        correct: "Delos",
        w1: "Rhenea",
        w2: "Paros",
        exp: "Delos was an international pan-Hellenic sanctuary and maritime banking hub, home to the famous marble Terrace of the Lions erected around 600 BCE."
      },
      {
        q: "Which Cycladic island is famous for 16th-century thatched whitewashed windmills, vibrant Little Venice waterfront balconies, and glamorous Aegean nightlife?",
        correct: "Mykonos",
        w1: "Ios",
        w2: "Syros",
        exp: "Mykonos features narrow, labyrinthine whitewashed cobblestone alleys (Chora) designed deliberately to confuse raiding pirates in medieval times."
      },
      {
        q: "Which southwestern Cycladic volcanic island is famous for the lunar-like white volcanic pumice rock formations of Sarakiniko Beach and the discovery of the Venus de Milo?",
        correct: "Milos",
        w1: "Serifos",
        w2: "Sifnos",
        exp: "A local peasant discovered the masterwork marble statue of Aphrodite (Venus de Milo, now in the Louvre) buried inside the ancient ruins of Milos in 1820."
      },
      {
        q: "What is the largest and most fertile island in the Cyclades archipelago, home to Mount Zas (the highest peak in the Cyclades at 1,004 m) and the giant Portara marble gate?",
        correct: "Naxos",
        w1: "Andros",
        w2: "Tinos",
        exp: "Naxos was famous for ancient marble quarries, producing sweet potatoes, Kitron citron liqueur, and hosting the unfinished 6th-century BCE Temple of Apollo (Portara)."
      }
    ],
    number: {
      q: "Approximately how many years BCE did the massive Minoan volcanic caldera explosion of Thera (Santorini) take place?",
      target: 1600,
      unit: "BCE",
      imperial: "1600 BC (3,600 years ago)",
      exp: "Radiocarbon and ice-core dating place the catastrophic Minoan eruption of Santorini around 1600 BCE (circa 1628-1600 BCE)."
    }
  },

  // Cycle 6: Meteora Monasteries & Thessaly
  {
    mcqs: [
      {
        q: "What UNESCO World Heritage complex in Thessaly features Eastern Orthodox monasteries perched atop sheer 400-meter natural sandstone rock pillars?",
        correct: "Meteora",
        w1: "Mount Athos",
        w2: "Hosios Loukas",
        exp: "Meteora (meaning 'suspended in the air') was founded by hermit monks in the 14th century, who hoisted building materials and visitors up in rope nets and retractable ladders."
      },
      {
        q: "What is the largest and oldest of the six functioning historic monasteries at Meteora, founded by Saint Athanasios the Meteorite in the 14th century?",
        correct: "Monastery of Great Meteoron",
        w1: "Monastery of Varlaam",
        w2: "Monastery of the Holy Trinity",
        exp: "Perched 613 meters above sea level on the Broad Rock (Platys Lithos), Great Meteoron contains priceless Byzantine frescoes, icons, and codices."
      },
      {
        q: "How many historic Byzantine monasteries at Meteora remain active and inhabited by monastic communities today?",
        correct: "6 Monasteries",
        w1: "12 Monasteries",
        w2: "24 Monasteries",
        exp: "Out of twenty-four monasteries built during the Middle Ages, six active monasteries survive today (four for monks and two for nuns)."
      },
      {
        q: "Which hook-shaped mountain peninsula in Thessaly, separating the Pagasetic Gulf from the Aegean Sea, was known in myth as the Homeland of the Centaurs?",
        correct: "Mount Pelion",
        w1: "Mount Ossa",
        w2: "Mount Pelister",
        exp: "Pelion is famous for lush apple orchards, chestnut forests, traditional slate-roofed stone villages like Tsagarada, and the historic Pelion narrow-gauge steam train."
      },
      {
        q: "What vast, fertile agricultural plain in central Greece, surrounded by mountains, is historically known as the Breadbasket of Greece?",
        correct: "Plain of Thessaly",
        w1: "Plain of Boeotia",
        w2: "Macedonian Plain",
        exp: "Drained by the Pineios River, the Plain of Thessaly produces massive wheat, cotton, and grain harvests, supporting regional cities Larissa and Trikala."
      }
    ],
    number: {
      q: "How many historic Byzantine monasteries remain active and open to visitors at Meteora today?",
      target: 6,
      unit: "monasteries",
      imperial: "6 active monasteries",
      exp: "Six functioning monasteries remain at Meteora: Great Meteoron, Varlaam, Rousanou, Holy Trinity, Saint Stephen, and Saint Nicholas Anapausas."
    }
  },

  // Cycle 7: The Ionian Islands & Navagio Beach
  {
    mcqs: [
      {
        q: "Which cove on the Ionian island of Zakynthos is one of the most photographed beaches on Earth, featuring the rusted hull of the coaster MV Panagiotis on white pebbles?",
        correct: "Navagio Beach Shipwreck Beach",
        w1: "Porto Katsiki",
        w2: "Myrtos Beach",
        exp: "Enclosed by 200-meter sheer limestone cliffs, Navagio is accessible only by boat, where the smuggling coaster ran aground during a storm in October 1980."
      },
      {
        q: "Which cosmopolitan northern Ionian island, known in Greek as Kerkyra, features a UNESCO-listed Old Town with Venetian fortresses and French Liston colonnades?",
        correct: "Corfu Kerkyra",
        w1: "Kefalonia",
        w2: "Lefkada",
        exp: "Unlike mainland Greece, Corfu was never conquered by the Ottoman Empire, remaining under the Republic of Venice for over four centuries."
      },
      {
        q: "Which subterranean cave lake on the island of Kefalonia features an open ceiling where sunlight illuminates the deep blue water, discovered when its roof collapsed?",
        correct: "Melissani Cave Lake",
        w1: "Drogarati Cave",
        w2: "Blue Grotto",
        exp: "Visitors explore Melissani on small rowboats, where ancient excavations uncovered terracotta figures of the god Pan and water nymphs."
      },
      {
        q: "What famous mountainous Ionian island is celebrated in Homer epic The Odyssey as the legendary island kingdom and long-sought home of hero Odysseus?",
        correct: "Ithaca Ithaki",
        w1: "Paxoi",
        w2: "Kythira",
        exp: "Ithaca is characterized by secluded fjord-like coves, olive groves, and the Arethusa Spring mentioned in classical Homeric literature."
      },
      {
        q: "Which Ionian island in the south is the primary nesting sanctuary in the Mediterranean Sea for endangered Loggerhead Sea Turtles (Caretta caretta)?",
        correct: "Zakynthos",
        w1: "Kefalonia",
        w2: "Corfu",
        exp: "The National Marine Park of Zakynthos in Laganas Bay strictly regulates beach access and nighttime lighting to protect female turtles laying eggs on nesting beaches."
      }
    ],
    number: {
      q: "In what year did the coaster vessel MV Panagiotis run aground on the white pebble cove of Zakynthos, creating the world-famous Navagio Shipwreck Beach?",
      target: 1980,
      unit: "year",
      imperial: "1980 AD",
      exp: "The MV Panagiotis was stranded during stormy weather on October 2, 1980, creating the iconic shipwreck landmark."
    }
  },

  // Cycle 8: The Dodecanese & Rhodes Heritage
  {
    mcqs: [
      {
        q: "Which colossal 33-meter bronze statue of the sun god Helios stood guarding the harbor of Rhodes, celebrated as one of the Seven Wonders of the Ancient World?",
        correct: "Colossus of Rhodes",
        w1: "Statue of Zeus",
        w2: "Lighthouse of Alexandria",
        exp: "Erected by Chares of Lindos in 280 BCE following the defeat of Demetrius Poliorcetes, the Colossus stood for fifty-four years before collapsing in a 226 BCE earthquake."
      },
      {
        q: "Which UNESCO World Heritage medieval walled city on the island of Rhodes was the fortified headquarters of the Knights Hospitaller of Saint John from 1309 to 1522?",
        correct: "Medieval Town of Rhodes",
        w1: "Lindos Citadel",
        w2: "Bodrum Castle",
        exp: "The city features the Palace of the Grand Master, the four-kilometer-long stone moat battlements, and the cobblestone Street of the Knights."
      },
      {
        q: "Which Dodecanese island near Kos is known as the Island of the Apocalypse, home to the Cave of the Apocalypse where Saint John wrote the Book of Revelation?",
        correct: "Patmos",
        w1: "Leros",
        w2: "Kalymnos",
        exp: "The fortified 11th-century Monastery of Saint John the Theologian crowns the hilltop of Chora on Patmos, housing priceless early Christian manuscripts."
      },
      {
        q: "Which Dodecanese island is internationally famous as the Birthplace of Hippocrates, Father of Modern Medicine, featuring the ancient Asklepieion healing sanctuary?",
        correct: "Kos",
        w1: "Rhodes",
        w2: "Karpathos",
        exp: "In the center of Kos town stands the ancient Plane Tree of Hippocrates, under whose branches the physician traditionally taught his disciples the Hippocratic Oath."
      },
      {
        q: "Which picturesque Dodecanese island near the Turkish coast is famous for pastel-colored neoclassical mansions rising like an amphitheater around Gialos harbor?",
        correct: "Symi",
        w1: "Nisyros",
        w2: "Tilos",
        exp: "Symi grew wealthy in the 19th century through traditional deep-sea sponge diving and shipbuilding, home to the Panormitis Monastery."
      }
    ],
    number: {
      q: "What was the estimated height in meters of the ancient bronze Colossus of Rhodes statue before its collapse in 226 BCE?",
      target: 33,
      unit: "meters",
      imperial: "108 feet tall",
      exp: "The Colossus of Rhodes stood approximately thirty-three meters tall on a marble pedestal, roughly the same height as the Statue of Liberty without its pedestal."
    }
  },

  // Cycle 9: Greek Olive Groves, Viticulture & Agronomy
  {
    mcqs: [
      {
        q: "Which dark-purple, almond-shaped table olive variety, protected under EU PDO laws, is grown across the sun-drenched orchards of Messenia in the southern Peloponnese?",
        correct: "Kalamata Olive",
        w1: "Amfissa Olive",
        w2: "Chalkidiki Olive",
        exp: "Kalamata olives are hand-picked when fully ripe and cured in red wine vinegar and extra virgin olive oil, renowned for rich fruity flavor."
      },
      {
        q: "According to European Union Protected Designation of Origin (PDO) laws, authentic Greek Feta cheese must contain at least what minimum percentage of sheep milk?",
        correct: "70 Percent Sheep Milk",
        w1: "50 Percent Sheep Milk",
        w2: "90 Percent Sheep Milk",
        exp: "Traditional Feta is made from pure sheep milk (or a blend with up to thirty percent goat milk), curdled and aged in wooden barrels with brine."
      },
      {
        q: "On which volcanic island are white Assyrtiko grapevines pruned into ground-hugging circular basket wreaths (kouloura) to protect grapes from ferocious summer meltemi winds?",
        correct: "Santorini",
        w1: "Crete",
        w2: "Rhodes",
        exp: "The kouloura basket traps night fog moisture and shades grapes from harsh sun, producing crisp, high-acid, mineral-driven white wines."
      },
      {
        q: "Which Aegean island in the northeastern Aegean holds the global monopoly on cultivating the aromatic resin gum mastic from Pistacia lentiscus trees in its southern Mastichochoria?",
        correct: "Chios",
        w1: "Lesbos",
        w2: "Samos",
        exp: "Mastic (Tears of Chios) has been harvested since antiquity for medicinal, culinary, and cosmetic uses, protected in medieval fortified stone villages."
      },
      {
        q: "What high-value red spice, hand-harvested from the purple crocus flowers of Kozani in northern Greece, is renowned as Greek Saffron (Krokos Kozanis)?",
        correct: "Saffron Krokos Kozanis",
        w1: "Paprika",
        w2: "Oregano",
        exp: "Cultivated in Kozani since the 17th century, Krokos Kozanis has strong antioxidant and coloring power, certified with strict PDO status in the European Union."
      }
    ],
    number: {
      q: "What minimum percentage of sheep milk is legally required under European Union PDO regulations for authentic Greek Feta cheese?",
      target: 70,
      unit: "percent",
      imperial: "70% minimum sheep milk",
      exp: "Greek Feta PDO regulations require at least 70 percent sheep milk, with up to 30 percent goat milk permitted in the brine mixture."
    }
  },

  // Cycle 10: Extent, Thousands of Islands & Superlatives
  {
    mcqs: [
      {
        q: "Approximately how many total islands and islets are estimated to exist across the Aegean and Ionian seas within Greek territory?",
        correct: "Up to 6,000 Islands and Islets",
        w1: "1,200 Islands",
        w2: "15,000 Islands",
        exp: "Depending on the definition used, Greece possesses between 1,200 and 6,000 islands and islets, of which roughly 227 are permanently inhabited."
      },
      {
        q: "What is the total length in kilometers of the coastline of Greece, ranking it as the eleventh longest national coastline in the world?",
        correct: "13,676 Kilometers",
        w1: "5,400 Kilometers",
        w2: "22,000 Kilometers",
        exp: "Despite its relatively compact land area (131,957 sq km), Greece extensive archipelagos and deep gulfs create one of the longest coastlines in the Mediterranean basin."
      },
      {
        q: "What autonomous monastic republic on the easternmost prong of the Chalkidiki peninsula is governed by twenty Eastern Orthodox monasteries, where women are strictly barred from entering?",
        correct: "Mount Athos Holy Mountain",
        w1: "Meteora",
        w2: "Patmos",
        exp: "Under the Greek Constitution and Byzantine chrysobulls, Mount Athos (Agion Oros) has maintained self-governing monastic autonomy for over a millennium."
      },
      {
        q: "Into how many administrative regions (Perifereies) is the Hellenic Republic divided?",
        correct: "13 Administrative Regions",
        w1: "9 Administrative Regions",
        w2: "18 Administrative Regions",
        exp: "The thirteen regions include Attica, Central Macedonia, Crete, South Aegean, North Aegean, Ionian Islands, Western Greece, Epirus, and the Peloponnese."
      },
      {
        q: "What is the southern point of Greece and the southernmost point of the European continent, an island situated in the Libyan Sea south of Crete?",
        correct: "Gavdos Island",
        w1: "Crete",
        w2: "Cape Matapan",
        exp: "Gavdos Cape Tripiti is marked by a giant wooden monument chair overlooking the Libyan Sea, facing the coast of Libya 300 kilometers to the south."
      }
    ],
    number: {
      q: "Approximately how many islands in Greece are permanently inhabited by human populations?",
      target: 227,
      unit: "inhabited islands",
      imperial: "227 inhabited islands",
      exp: "Of the thousands of Greek islands and rock islets, approximately 227 islands support permanent year-round residents."
    }
  }
];

// Build Greece Quiz
buildQuiz({
  id: 'greece-geography-heritage-60',
  theme: 'Greece: Geography, Aegean Islands & Classical Monuments',
  title: 'Greece: Geography, Aegean Islands & Classical Monuments',
  description: 'A 60-question grand master assessment exploring Mount Olympus & Vikos Gorge, the Acropolis of Athens, the Peloponnese & Corinth Canal, Crete & Knossos, Santorini & Delos, Meteora monasteries, Ionian islands, and Rhodes.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, greeceCycles);

console.log('Greece quiz built successfully!');
