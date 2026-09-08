const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// Volume 10: general-knowledge-vol10-60
// Theme: "General Knowledge Vol 10: Unsolved Enigmas, Cosmic Frontiers & Earth Lore"
// Category: "Sports, Records & General Knowledge"
// =========================================================================
const vol10Cycles = [
  // Cycle 1: Moons of the Solar System & Ocean Worlds
  {
    mcqs: [
      {
        q: "Which moon of Saturn spews plumes of water vapor and organic molecules into space from hydrothermal fractures dubbed Tiger Stripes?",
        correct: "Enceladus",
        w1: "Mimas",
        w2: "Iapetus",
        exp: "Cassini flybys confirmed a global liquid ocean under Enceladus icy crust, heated by tidal flexing and geothermal vents."
      },
      {
        q: "Which moon of Saturn is the only celestial body in the solar system besides Earth with stable liquid lakes and seas on its surface?",
        correct: "Titan",
        w1: "Rhea",
        w2: "Dione",
        exp: "Titan possesses a dense nitrogen atmosphere and rivers, lakes, and seas filled with liquid methane and ethane like Kraken Mare."
      },
      {
        q: "Which Jovian moon is the most volcanically active body in the solar system, with over 400 active silicate volcanoes?",
        correct: "Io",
        w1: "Europa",
        w2: "Ganymede",
        exp: "Tidal friction from gravitational tug-of-war between Jupiter, Europa, and Ganymede generates continuous volcanic eruptions on Io."
      },
      {
        q: "What is the largest moon in the solar system, exceeding the planet Mercury in physical diameter?",
        correct: "Ganymede",
        w1: "Titan",
        w2: "Callisto",
        exp: "Ganymede orbits Jupiter and is the only moon in the solar system known to possess its own internally generated magnetic field."
      },
      {
        q: "Which large moon of Neptune orbits in a retrograde direction opposite to its planet rotation, indicating it is a captured Kuiper Belt object?",
        correct: "Triton",
        w1: "Proteus",
        w2: "Nereid",
        exp: "Triton features nitrogen cryovolcanoes that erupt geysers of liquid nitrogen up to eight kilometers above its frozen crust."
      }
    ],
    number: {
      q: "What is the equatorial diameter in kilometers of Ganymede, the largest moon in the solar system?",
      target: 5268,
      unit: "kilometers",
      imperial: "3,273 miles",
      exp: "Ganymede measures 5,268 kilometers across, making it roughly eight percent larger than the planet Mercury."
    }
  },

  // Cycle 2: Ancient Metallurgy, Damascus Steel & Bronze Age Alloys
  {
    mcqs: [
      {
        q: "Which legendary crucible steel developed in southern India produced distinctive swirling water patterns and resilient sharp blades in the ancient Middle East?",
        correct: "Damascus Steel Wootz",
        w1: "Toledo Steel",
        w2: "Damascene Inlay",
        exp: "Wootz crucible steel contained carbon nanotubes and carbide-forming micro-alloys, creating ultra-durable swords traded across the Silk Road."
      },
      {
        q: "Which two primary metals are melted together to produce bronze, the foundational alloy of early human civilizations?",
        correct: "Copper and Tin",
        w1: "Copper and Zinc",
        w2: "Iron and Nickel",
        exp: "Classic bronze typically consists of approximately eighty-eight percent copper and twelve percent tin, providing superior hardness over pure copper."
      },
      {
        q: "Which ancient metal casting technique uses a wax model encased in clay to cast intricate hollow bronze statues?",
        correct: "Lost-Wax Casting",
        w1: "Sand Casting",
        w2: "Die Forging",
        exp: "The cire-perdue method allowed ancient Greeks, Romans, and Chola dynasty artisans to cast lifelike bronze masterpieces."
      },
      {
        q: "What metal dagger found in the tomb of Pharaoh Tutankhamun was determined by spectrometry to be forged from an iron meteorite?",
        correct: "Tutankhamun Meteorite Dagger",
        w1: "Cleopatra Scepter",
        w2: "Khufu Blade",
        exp: "High nickel and cobalt concentrations confirmed the blade was hammered from an extraterrestrial iron-nickel meteorite before smelting was invented."
      },
      {
        q: "Which ancient civilization in East Asia developed high-temperature blast furnaces to produce cast iron as early as the 5th century BCE?",
        correct: "Ancient China",
        w1: "Ancient Egypt",
        w2: "Vedic India",
        exp: "Chinese metallurgists utilized phosphorus-rich iron ore and water-powered bellows to liquefy iron for cast agricultural plows and weapons."
      }
    ],
    number: {
      q: "What is the typical percentage of copper in standard historical bronze alloy?",
      target: 88,
      unit: "percent",
      imperial: "88% copper",
      exp: "Historical bronze commonly consists of approximately 88 percent copper and 12 percent tin by weight."
    }
  },

  // Cycle 3: Bioluminescence, Abyssal Fauna & Deep Ocean Ecology
  {
    mcqs: [
      {
        q: "What enzyme catalyzes the oxidation of the pigment luciferin to produce cold biological light with almost zero heat loss?",
        correct: "Luciferase",
        w1: "Phosphorylase",
        w2: "Oxidoreductase",
        exp: "Luciferase-mediated bioluminescence is utilized by deep-sea organisms and fireflies for mate attraction, counterillumination, and prey capture."
      },
      {
        q: "Which female deep-sea fish uses a bioluminescent lure (esca) dangling from a modified dorsal fin ray to attract prey in the bathypelagic zone?",
        correct: "Anglerfish",
        w1: "Viperfish",
        w2: "Fangtooth",
        exp: "The anglerfish lure glows due to symbiotic bioluminescent bacteria Photobacterium living inside the bulbous tip."
      },
      {
        q: "Which transparent gelatinous marine invertebrates produce shimmering rainbow patterns along eight rows of beating locomotory cilia?",
        correct: "Comb Jellies Ctenophores",
        w1: "Cnidarian Medusae",
        w2: "Salps",
        exp: "The rainbow colors of comb jellies are caused by the diffraction of light hitting coordinated beating hair-like cilia."
      },
      {
        q: "What deep-sea cephalopod, whose scientific name translates to Vampire Squid from Hell, can invert its webbed arms to display spiky cirri?",
        correct: "Vampyroteuthis infernalis",
        w1: "Nautilus pompilius",
        w2: "Architeuthis dux",
        exp: "Vampire squids inhabit oxygen minimum zones, feeding on drifting marine snow using two thin retractable sensory filaments."
      },
      {
        q: "What translucent scaleless fish has been filmed living in oceanic trenches at depths exceeding 8,000 meters below the surface?",
        correct: "Hadal Snailfish",
        w1: "Gulper Eel",
        w2: "Barreleye Fish",
        exp: "Pseudoliparis swirei survives extreme pressures exceeding 1,000 atmospheres through high cellular concentrations of trimethylamine N-oxide."
      }
    ],
    number: {
      q: "What is the approximate maximum depth in meters where living Hadal snailfish have been observed in oceanic trenches?",
      target: 8000,
      unit: "meters",
      imperial: "26,247 feet",
      exp: "Hadal snailfish hold the record for the deepest living vertebrate, thriving in trenches between 6,000 and over 8,000 meters depth."
    }
  },

  // Cycle 4: Historical Cryptography, Ciphers & Secret Codes
  {
    mcqs: [
      {
        q: "Which German electro-mechanical rotor cipher machine was famously broken by Alan Turing and codebreakers at Bletchley Park during World War II?",
        correct: "Enigma Machine",
        w1: "Lorenz SZ42",
        w2: "Typex",
        exp: "Turing designed the electromechanical Bombe machine to decipher German military messages encrypted with daily changing Enigma rotor settings."
      },
      {
        q: "Which classical monoalphabetic substitution cipher shifted each letter in the alphabet by a fixed number of positions, used in ancient Rome?",
        correct: "Caesar Cipher",
        w1: "Polybius Square",
        w2: "Scytale Cipher",
        exp: "Julius Caesar encrypted private military communications by shifting letters forward three places in the Latin alphabet."
      },
      {
        q: "Which 16th-century polyalphabetic cipher used a repeated keyword and a tabula recta grid, deemed unbreakable for over two centuries?",
        correct: "Vigenère Cipher",
        w1: "Playfair Cipher",
        w2: "Beaufort Cipher",
        exp: "Known as le chiffre indéchiffrable, it withstood cryptanalysis until Charles Babbage and Friedrich Kasiski developed frequency cracking methods."
      },
      {
        q: "Which Indigenous American military group used their unwritten complex native language to transmit unbreakable battlefield communications in the Pacific theater?",
        correct: "Navajo Code Talkers",
        w1: "Choctaw Code Talkers",
        w2: "Cherokee Communicators",
        exp: "The Navajo Code Talkers developed a bilingual military dictionary that Japanese cryptanalysts were entirely unable to decipher throughout World War II."
      },
      {
        q: "Which 1977 public-key cryptosystem named after Rivest, Shamir, and Adleman relies on the computational difficulty of factoring large prime numbers?",
        correct: "RSA Cryptosystem",
        w1: "Diffie-Hellman Key Exchange",
        w2: "Elliptic Curve Cryptography",
        exp: "RSA enables secure digital signatures and encrypted communications across the internet using asymmetric public and private key pairs."
      }
    ],
    number: {
      q: "In what year was the revolutionary RSA public-key cryptographic algorithm first publicly published by Rivest, Shamir, and Adleman?",
      target: 1977,
      unit: "year",
      imperial: "1977 AD",
      exp: "The RSA encryption algorithm was invented at MIT in 1977 and officially published in Communications of the ACM in February 1978."
    }
  },

  // Cycle 5: Prehistoric Climates, Ice Ages & Glacial Geology
  {
    mcqs: [
      {
        q: "Which astronomical cycles describe cyclical changes in Earth orbital eccentricity, axial tilt, and precession that drive ice age cycles?",
        correct: "Milankovitch Cycles",
        w1: "Maunder Minimums",
        w2: "Bond Cycles",
        exp: "Serbian geophysicist Milutin Milanković calculated how variations in solar radiation distribution trigger glacial and interglacial climate transitions."
      },
      {
        q: "What period of abrupt, severe cooling 12,900 years ago temporarily returned the Northern Hemisphere to near-glacial conditions?",
        correct: "Younger Dryas",
        w1: "Little Ice Age",
        w2: "Oldest Dryas",
        exp: "Named after the alpine flower Dryas octopetala, the cooling was likely triggered by massive meltwater disrupting North Atlantic ocean currents."
      },
      {
        q: "What elongated, streamlined tear-drop hill of compacted glacial till indicates the direction of past continental ice sheet movement?",
        correct: "Drumlin",
        w1: "Esker",
        w2: "Kame",
        exp: "Drumlins form under moving glacial ice with a steep stoss side facing the upstream ice flow and a tapered lee side downstream."
      },
      {
        q: "What period roughly 20,000 years ago marked the greatest extent of ice sheets during the last glacial period?",
        correct: "Last Glacial Maximum",
        w1: "Eemian Interglacial",
        w2: "Holocene Optimum",
        exp: "During the Last Glacial Maximum (LGM), vast Laurentide and Fennoscandian ice sheets lowered global sea levels by approximately 120 meters."
      },
      {
        q: "What hypothesis proposes that Earth was completely or nearly completely covered in ice from poles to the equator during the Cryogenian period?",
        correct: "Snowball Earth",
        w1: "Slushball Theory",
        w2: "Cryo-Glaciation",
        exp: "Albedo feedback loops cooled the planet roughly 700 million years ago until volcanic carbon dioxide accumulation initiated a super-greenhouse thaw."
      }
    ],
    number: {
      q: "Approximately how many thousands of years ago did the Last Glacial Maximum reach its peak global ice extent?",
      target: 20,
      unit: "thousand years ago",
      imperial: "20,000 years ago",
      exp: "The Last Glacial Maximum peaked roughly 20,000 years ago when ice covered large portions of North America, northern Europe, and Asia."
    }
  },

  // Cycle 6: Botany, Carnivorous Plants & Ancient Flora
  {
    mcqs: [
      {
        q: "Which carnivorous plant native only to coastal bogs in the Carolinas snaps its hinged leaves shut in under a tenth of a second when trigger hairs are brushed?",
        correct: "Venus Flytrap",
        w1: "Sundew",
        w2: "Butterwort",
        exp: "Dionaea muscipula requires two distinct trigger hair touches within twenty seconds to generate an electrical action potential that closes the leaf."
      },
      {
        q: "Which giant tropical pitcher plant endemic to Mount Kinabalu in Borneo has pitchers holding up to three liters of fluid that can trap small vertebrates?",
        correct: "Nepenthes rajah",
        w1: "Nepenthes alata",
        w2: "Sarracenia purpurea",
        exp: "Nepenthes rajah produces pitchers large enough to trap tree shrews and summit rats, extracting nitrogen from their droppings and prey."
      },
      {
        q: "What Great Basin bristlecone pine in California White Mountains is verified as one of the oldest living non-clonal individual trees on Earth?",
        correct: "Methuselah",
        w1: "General Sherman",
        w2: "Hyperion",
        exp: "Methuselah (Pinus longaeva) has survived for over 4,850 years in harsh alpine conditions through slow growth and resinous rot-resistant wood."
      },
      {
        q: "What coastal redwood tree in Redwood National Park, California, is recognized as the tallest living tree on Earth at over 115 meters high?",
        correct: "Hyperion",
        w1: "Helios",
        w2: "Icarus",
        exp: "Hyperion (Sequoia sempervirens) was discovered in 2006, reaching 115.92 meters and protected by keeping its exact grove location confidential."
      },
      {
        q: "Which desert plant endemic to the Namib Desert grows only two continuous leaves throughout its entire lifespan of over a thousand years?",
        correct: "Welwitschia mirabilis",
        w1: "Baobab",
        w2: "Joshua Tree",
        exp: "Welwitschia leaves grow from a basal meristem, becoming shredded and frayed by harsh desert winds while absorbing coastal morning fog."
      }
    ],
    number: {
      q: "What is the approximate verified age in years of the Methuselah bristlecone pine in California?",
      target: 4850,
      unit: "years",
      imperial: "4,850 years old",
      exp: "Dendrochronological core sampling confirms the Methuselah tree germinated approximately 4,850 years ago around 2832 BCE."
    }
  },

  // Cycle 7: World Monoliths, Megalithic Circles & Geoglyphs
  {
    mcqs: [
      {
        q: "Which prehistoric monument in Wiltshire, England, consists of an outer ring of standing sarsen stones topped by connecting lintels dating back to 2500 BCE?",
        correct: "Stonehenge",
        w1: "Avebury Circle",
        w2: "Callanish Stones",
        exp: "Stonehenge was aligned precisely with the summer solstice sunrise and winter solstice sunset, constructed using sarsens and Welsh bluestones."
      },
      {
        q: "What colossal ancient geoglyphs etched into the desert plateau of southern Peru depict hummingbirds, monkeys, spiders, and geometric lines?",
        correct: "Nazca Lines",
        w1: "Paracas Candelabra",
        w2: "Atacama Giant",
        exp: "Created by the Nazca culture between 500 BCE and 500 CE, the lines were made by removing iron-oxide pebbles to expose pale subsoil."
      },
      {
        q: "What monolithic human figures carved from volcanic tuff by the Rapa Nui people between 1250 and 1500 CE stand watch across Easter Island?",
        correct: "Moai Statues",
        w1: "Tiki Totems",
        w2: "Inuksuit Cairns",
        exp: "Nearly nine hundred Moai statues were carved at the Rano Raraku quarry and transported onto coastal stone platforms called ahu."
      },
      {
        q: "Which 11,500-year-old archaeological site in southeastern Turkey features massive T-shaped megalithic limestone pillars carved with wild animals?",
        correct: "Göbekli Tepe",
        w1: "Çatalhöyük",
        w2: "Karahan Tepe",
        exp: "Göbekli Tepe predates pottery, metallurgy, and agriculture, showing hunter-gatherers organized complex monument construction."
      },
      {
        q: "Which prehistoric site in Brittany, France, features over 3,000 standing menhirs erected in straight parallel alignments stretching across kilometers?",
        correct: "Carnac Stones",
        w1: "Newgrange",
        w2: "Skara Brae",
        exp: "The Carnac alignments were erected during the Neolithic period around 3300 BCE, representing the largest collection of megaliths in the world."
      }
    ],
    number: {
      q: "Approximately how many years BCE was the monumental temple complex of Göbekli Tepe in Turkey first constructed?",
      target: 9500,
      unit: "BCE",
      imperial: "9500 BC (11,500 years ago)",
      exp: "Radiocarbon dating indicates Göbekli Tepe was built around 9500 BCE, making it roughly 6,000 years older than Stonehenge."
    }
  },

  // Cycle 8: Nuclear Physics, Radioactivity & Isotope Geology
  {
    mcqs: [
      {
        q: "Which Polish-French physicist won two Nobel Prizes in two different sciences (Physics and Chemistry) for pioneering research on radioactivity and discovering radium?",
        correct: "Marie Curie",
        w1: "Lise Meitner",
        w2: "Irène Joliot-Curie",
        exp: "Marie Curie coined the term radioactivity, isolated radium and polonium, and developed mobile X-ray radiography units during World War I."
      },
      {
        q: "Which New Zealand-born physicist discovered the atomic nucleus in 1911 by bombarding thin gold foil with alpha particles?",
        correct: "Ernest Rutherford",
        w1: "J.J. Thomson",
        w2: "Niels Bohr",
        exp: "Rutherford observed that rare alpha particles deflected backward, proving atomic positive charge and mass are concentrated in a tiny central nucleus."
      },
      {
        q: "Which American physical chemist invented radiocarbon dating in 1949, winning the 1960 Nobel Prize in Chemistry?",
        correct: "Willard Libby",
        w1: "Harold Urey",
        w2: "Linus Pauling",
        exp: "Libby recognized that unstable Carbon-14 decays into Nitrogen-14 at a constant half-life rate once an organism dies, dating organic materials."
      },
      {
        q: "Which Austrian-Swedish physicist, working alongside Otto Hahn, provided the theoretical explanation of nuclear fission in uranium in 1938?",
        correct: "Lise Meitner",
        w1: "Chien-Shiung Wu",
        w2: "Maria Goeppert Mayer",
        exp: "Meitner and Otto Frisch calculated that splitting a uranium nucleus into barium and krypton releases approximately two hundred million electron volts of energy."
      },
      {
        q: "What is the half-life in years of Carbon-14 used to date archaeological wood, bones, and charcoal up to roughly 50,000 years old?",
        correct: "5,730 Years",
        w1: "1,600 Years",
        w2: "10,500 Years",
        exp: "Carbon-14 has a standardized half-life of 5,730 years, after which half of the radioactive carbon atoms have decayed back into nitrogen."
      }
    ],
    number: {
      q: "What is the half-life in years of the radioisotope Carbon-14 used in archaeological dating?",
      target: 5730,
      unit: "years",
      imperial: "5,730-year half-life",
      exp: "The internationally accepted Cambridge half-life of Carbon-14 is 5,730 years."
    }
  },

  // Cycle 9: World Languages, Isolates & Linguistic Puzzles
  {
    mcqs: [
      {
        q: "Which language spoken in the Pyrenees region between Spain and France is a complete language isolate with no known relationship to any other language?",
        correct: "Basque Euskara",
        w1: "Catalan",
        w2: "Galician",
        exp: "Basque is the sole surviving pre-Indo-European language in Western Europe, maintaining unique ergative-absolutive grammar for millennia."
      },
      {
        q: "Which Korean monarch created the highly scientific Hangul phonetic writing system in 1443 to increase literacy among the common people?",
        correct: "King Sejong the Great",
        w1: "King Taejo",
        w2: "King Yeongjo",
        exp: "King Sejong promulgated the Hunminjeongeum, designing Hangul letter shapes to mimic the physical position of the tongue, teeth, and mouth during pronunciation."
      },
      {
        q: "Which ancient Aegean writing system used by the Minoan civilization on Crete remains completely undeciphered to this day?",
        correct: "Linear A",
        w1: "Linear B",
        w2: "Cypriot Syllabary",
        exp: "Unlike Mycenaean Linear B, Linear A represents an unknown pre-Hellenic language that has resisted all decipherment attempts."
      },
      {
        q: "Which language, dormant as a spoken vernacular for nearly two millennia, was resurrected into a modern national language by Eliezer Ben-Yehuda?",
        correct: "Modern Hebrew",
        w1: "Aramaic",
        w2: "Classical Latin",
        exp: "Ben-Yehuda coined modern vocabulary from root words, making Hebrew the only successful case of a sacred literary tongue becoming a modern mother tongue."
      },
      {
        q: "What unique whistled language developed on the steep volcanic island of La Gomera in the Canary Islands to communicate across deep ravines?",
        correct: "Silbo Gomero",
        w1: "Kusköy Whistle",
        w2: "Mazateco Whistle",
        exp: "Silbo Gomero translates Spanish vowels and consonants into varied pitch frequencies that can travel over five kilometers across steep mountain canyons."
      }
    ],
    number: {
      q: "In what year did King Sejong the Great create the Korean Hangul alphabet system?",
      target: 1443,
      unit: "year",
      imperial: "1443 AD",
      exp: "King Sejong completed the design of Hangul in December 1443, officially publishing it in 1446."
    }
  },

  // Cycle 10: Space Probes, Interstellar Missions & Deep Space Relays
  {
    mcqs: [
      {
        q: "Which NASA space probe launched in 1977 became the first human-made object to cross the heliopause and enter interstellar space in 2012?",
        correct: "Voyager 1",
        w1: "Pioneer 10",
        w2: "New Horizons",
        exp: "Voyager 1 crossed into interstellar space at roughly 121 astronomical units from the Sun, carrying the Golden Record of Earth sounds and images."
      },
      {
        q: "Which robotic spacecraft performed the first historic flyby of Pluto and its moon Charon in July 2015, capturing high-resolution images of heart-shaped nitrogen plains?",
        correct: "New Horizons",
        w1: "Dawn",
        w2: "Juno",
        exp: "New Horizons sped past Pluto at fourteen kilometers per second, revealing active ice geysers and towering water-ice mountain ranges."
      },
      {
        q: "Which space telescope launched on Christmas Day 2021 operates at the Sun-Earth Lagrange Point 2 (L2) with a 6.5-meter gold-coated beryllium mirror?",
        correct: "James Webb Space Telescope",
        w1: "Hubble Space Telescope",
        w2: "Spitzer Space Telescope",
        exp: "JWST observes in the infrared spectrum to photograph the earliest galaxies formed after the Big Bang and analyze exoplanet atmospheres."
      },
      {
        q: "Which NASA space probe entered orbit around Saturn in 2004, concluding its mission in 2017 with a planned death dive into Saturn atmosphere?",
        correct: "Cassini-Huygens",
        w1: "Galileo",
        w2: "MESSENGER",
        exp: "The Cassini mission discovered ocean geysers on Enceladus, methane seas on Titan, and executed twenty-two daring Grand Finale dives inside Saturn rings."
      },
      {
        q: "Which solar probe launched in 2018 became the fastest human-made object in history, repeatedly diving directly through the Sun outer corona?",
        correct: "Parker Solar Probe",
        w1: "Solar Orbiter",
        w2: "Helios 2",
        exp: "Parker Solar Probe reaches speeds over 600,000 kilometers per hour, protected by an eleven-centimeter-thick carbon-composite heat shield."
      }
    ],
    number: {
      q: "In what year did the Voyager 1 spacecraft officially cross the heliopause into interstellar space?",
      target: 2012,
      unit: "year",
      imperial: "2012 AD",
      exp: "On August 25, 2012, Voyager 1 recorded an abrupt drop in solar wind ions and a surge in galactic cosmic rays, confirming entry into interstellar space."
    }
  }
];

// Build Quiz 10
buildQuiz({
  id: 'general-knowledge-vol10-60',
  theme: 'General Knowledge Vol 10: Unsolved Enigmas, Cosmic Frontiers & Earth Lore',
  title: 'General Knowledge Vol 10: Unsolved Enigmas, Cosmic Frontiers & Earth Lore',
  description: 'A 60-question grand master assessment exploring ocean moons, ancient metallurgy, deep-sea bioluminescence, cryptography, glacial ice ages, carnivorous plants, megaliths, nuclear physics, language isolates, and interstellar space probes.',
  category: 'Sports, Records & General Knowledge',
  difficulty: 'moderate'
}, vol10Cycles);

console.log('Vol 10 successfully built!');
