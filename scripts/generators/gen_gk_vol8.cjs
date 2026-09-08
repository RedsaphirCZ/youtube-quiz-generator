const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// Volume 8: general-knowledge-vol8-60
// Theme: "General Knowledge Vol 8: Wonders, Civilizations & Scientific Breakthroughs"
// Category: "Sports, Records & General Knowledge"
// =========================================================================
const vol8Cycles = [
  // Cycle 1: Deep Ocean Trenches, Hydrothermal Vents & Marine Extremes
  {
    mcqs: [
      {
        q: "What is the deepest known oceanic depression on Earth, located in the western Pacific Ocean?",
        correct: "Mariana Trench",
        w1: "Puerto Rico Trench",
        w2: "Java Trench",
        exp: "The Mariana Trench reaches its greatest depth at the Challenger Deep, approximately eleven thousand meters below sea level."
      },
      {
        q: "What mineral-rich hydrothermal vent structures on the ocean floor spew mineral plumes reaching temperatures over 400 degrees Celsius?",
        correct: "Black Smokers",
        w1: "White Pillars",
        w2: "Basalt Chimneys",
        exp: "Black smokers precipitate iron sulfides when scalding geothermal fluid meets freezing abyssal seawater, supporting unique chemosynthetic ecosystems."
      },
      {
        q: "Which deep-sea submersible carried Jacques Piccard and Don Walsh to the bottom of the Challenger Deep in 1960?",
        correct: "Trieste",
        w1: "Alvin",
        w2: "Nautile",
        exp: "The Swiss-designed bathyscaphe Trieste withstood over one thousand atmospheres of hydrostatic pressure during its historic dive."
      },
      {
        q: "What extraordinary biological process allows deep-sea tubeworms at hydrothermal vents to survive without sunlight?",
        correct: "Chemosynthesis",
        w1: "Thermosynthesis",
        w2: "Electrosynthesis",
        exp: "Symbiotic bacteria within giant Riftia tubeworms oxidize toxic hydrogen sulfide into organic matter, forming the base of the vent food web."
      },
      {
        q: "Which massive abyssal plain occupant has the largest eyes of any living creature, measuring up to 27 centimeters across?",
        correct: "Colossal Squid",
        w1: "Giant Oarfish",
        w2: "Sperm Whale",
        exp: "The colossal squid Mesonychoteuthis hamiltoni possesses enormous eyes equipped with photophores to spot sperm whales in the Antarctic twilight zone."
      }
    ],
    number: {
      q: "In what year did Jacques Piccard and Don Walsh complete the first manned descent to Challenger Deep aboard the bathyscaphe Trieste?",
      target: 1960,
      unit: "year",
      imperial: "1960 AD",
      exp: "On January 23, 1960, the Trieste descended into the Pacific abyss, recording a depth of approximately 10,911 meters."
    }
  },

  // Cycle 2: Renaissance Astronomy & Planetary Pioneers
  {
    mcqs: [
      {
        q: "Which Polish astronomer published De revolutionibus orbium coelestium in 1543, formulating the heliocentric model of the cosmos?",
        correct: "Nicolaus Copernicus",
        w1: "Johannes Kepler",
        w2: "Tycho Brahe",
        exp: "Copernicus mathematically placed the Sun rather than the Earth at the center of the universe, initiating the Scientific Revolution."
      },
      {
        q: "Which German astronomer derived three fundamental laws of planetary motion, proving planets move in elliptical orbits?",
        correct: "Johannes Kepler",
        w1: "Christiaan Huygens",
        w2: "Galileo Galilei",
        exp: "Kepler analyzed Tycho Brahe precise observational data on Mars to discover that planetary orbits are ellipses with the Sun at one focus."
      },
      {
        q: "Which Italian scientist first turned a refracting telescope toward Jupiter in 1610, discovering its four largest moons?",
        correct: "Galileo Galilei",
        w1: "Giovanni Cassini",
        w2: "Giordano Bruno",
        exp: "Galileo observed Io, Europa, Ganymede, and Callisto, providing decisive empirical evidence that celestial bodies orbit objects other than Earth."
      },
      {
        q: "Which Danish astronomer compiled exceptionally accurate pre-telescopic planetary position catalogs on the island observatory of Uraniborg?",
        correct: "Tycho Brahe",
        w1: "Ole Romer",
        w2: "Johannes Hevelius",
        exp: "Tycho Brahe utilized giant brass sextants and quadrants to achieve positional accuracy within one arcminute without optical magnification."
      },
      {
        q: "Which Dutch polymath discovered Saturn largest moon Titan and correctly deduced that Saturn was surrounded by a solid flat ring system in 1655?",
        correct: "Christiaan Huygens",
        w1: "Giovanni Cassini",
        w2: "Edmond Halley",
        exp: "Huygens built high-magnification compound telescopes and also invented the pendulum clock to improve astronomical timekeeping."
      }
    ],
    number: {
      q: "In what year did Galileo Galilei publish Sidereus Nuncius (The Starry Messenger) detailing his revolutionary telescopic discoveries?",
      target: 1610,
      unit: "year",
      imperial: "1610 AD",
      exp: "Published in Venice in March 1610, Sidereus Nuncius revealed lunar craters, countless new stars, and the four moons of Jupiter."
    }
  },

  // Cycle 3: Ancient Engineering, Aqueducts & Monumental Masonry
  {
    mcqs: [
      {
        q: "What volcanic ash ingredient gave ancient Roman concrete its extraordinary hydraulic durability and ability to set underwater?",
        correct: "Pozzolana",
        w1: "Pumice",
        w2: "Slag",
        exp: "Pozzolanic ash from the Bay of Naples reacted with slaked lime to form crystalline calcium aluminum silicate hydrate, strengthening with age."
      },
      {
        q: "Which majestic three-tiered Roman aqueduct bridge in southern France spans the Gardon River, standing nearly 49 meters high?",
        correct: "Pont du Gard",
        w1: "Aqueduct of Segovia",
        w2: "Valens Aqueduct",
        exp: "The Pont du Gard was built without mortar in the first century CE to carry water over fifty kilometers to the colony of Nemausus."
      },
      {
        q: "Which Inca citadel in Peru features mortarless ashlar masonry where massive granite stones fit together so tightly a knife blade cannot pass?",
        correct: "Sacsayhuamán",
        w1: "Tiwanaku",
        w2: "Chan Chan",
        exp: "Sacsayhuamán overlooks Cusco with colossal zigzagging limestone blocks weighing up to 120 tons, engineered to withstand powerful Andean earthquakes."
      },
      {
        q: "What monumental tomb in Rome built by Emperor Hadrian features the world largest unreinforced concrete dome with a central oculus?",
        correct: "The Pantheon",
        w1: "Castel Sant Angelo",
        w2: "Mausoleum of Augustus",
        exp: "The Pantheon dome spans 43.3 meters and uses progressively lighter volcanic aggregate toward the nine-meter open oculus at its apex."
      },
      {
        q: "Which ancient Persian subterranean water management system transported groundwater across arid plateaus using gravity and vertical shafts?",
        correct: "Qanat",
        w1: "Norias",
        w2: "Shadoof",
        exp: "Qanats allowed Persian agriculture and desert cities like Yazd to thrive for millennia by tapping deep alluvial aquifers without evaporation loss."
      }
    ],
    number: {
      q: "What is the diameter in meters of the unreinforced concrete dome of the Pantheon in Rome?",
      target: 43,
      unit: "meters",
      imperial: "142 feet",
      exp: "The Pantheon interior dome measures exactly 43.3 meters in diameter, matching its exact floor-to-ceiling vertical height."
    }
  },

  // Cycle 4: Chemistry, Synthetic Polymers & Groundbreaking Materials
  {
    mcqs: [
      {
        q: "What revolutionary synthetic thermosetting plastic was invented by Leo Baekeland in 1907, ushering in the modern Age of Plastics?",
        correct: "Bakelite",
        w1: "Celluloid",
        w2: "Polystyrene",
        exp: "Bakelite was synthesized by condensing phenol with formaldehyde under heat and pressure, forming a non-conductive, heat-resistant polymer."
      },
      {
        q: "Which American chemist discovered Teflon (polytetrafluoroethylene) accidentally in 1938 while researching non-toxic refrigerants?",
        correct: "Roy J. Plunkett",
        w1: "Wallace Carothers",
        w2: "Stephanie Kwolek",
        exp: "Plunkett found tetrafluoroethylene gas cylinders had polymerized into a super-slick white solid with extreme chemical resistance."
      },
      {
        q: "Which DuPont chemist invented Kevlar in 1965, creating an aramid fiber five times stronger than steel on an equal weight basis?",
        correct: "Stephanie Kwolek",
        w1: "Rosalind Franklin",
        w2: "Marie Daly",
        exp: "Kwolek synthesized poly-paraphenylene terephthalamide, whose liquid crystal alignment produces immense tensile strength used in body armor."
      },
      {
        q: "What allotrope of carbon consisting of a single layer of hexagonal carbon atoms was isolated using adhesive tape in 2004?",
        correct: "Graphene",
        w1: "Fullerene",
        w2: "Lonsdaleite",
        exp: "Andre Geim and Konstantin Novoselov isolated two-dimensional graphene from graphite, winning the 2010 Nobel Prize in Physics."
      },
      {
        q: "Which synthetic polyamide fiber was developed by Wallace Carothers in 1935 and premiered publicly in women stockings at the 1939 World Fair?",
        correct: "Nylon",
        w1: "Rayon",
        w2: "Spandex",
        exp: "Nylon 66 was the first fully synthetic fiber made from petrochemicals, replacing scarce silk in parachutes during World War II."
      }
    ],
    number: {
      q: "In what year was Kevlar, the high-strength synthetic aramid fiber, first invented by Stephanie Kwolek at DuPont?",
      target: 1965,
      unit: "year",
      imperial: "1965 AD",
      exp: "Stephanie Kwolek discovered liquid-crystalline polymer solutions in 1965, leading to the commercial production of Kevlar."
    }
  },

  // Cycle 5: Evolutionary Milestones, Living Fossils & Speciation
  {
    mcqs: [
      {
        q: "Which lobe-finned fish, thought to have gone extinct 66 million years ago, was rediscovered alive off South Africa in 1938?",
        correct: "Coelacanth",
        w1: "Tiktaalik",
        w2: "Acanthostega",
        exp: "The coelacanth Latimeria chalumnae is a living fossil whose paired fins move in an alternating gait similar to four-legged land vertebrates."
      },
      {
        q: "Which unique reptile endemic to New Zealand is the sole surviving member of the ancient order Sphenodontia from the Mesozoic Era?",
        correct: "Tuatara",
        w1: "Komodo Dragon",
        w2: "Thorny Devil",
        exp: "The tuatara retains primitive diapsid skull arches and a photosensitive parietal third eye on the crown of its head."
      },
      {
        q: "Which ancient marine arthropod has blue copper-based hemocyanin blood critical for testing medical equipment for bacterial endotoxins?",
        correct: "Horseshoe Crab",
        w1: "Nautilus",
        w2: "Triops",
        exp: "Horseshoe crab blood contains Limulus Amebocyte Lysate (LAL), which clots instantaneously in the presence of minute bacterial endotoxins."
      },
      {
        q: "What primitive egg-laying mammal (monotreme) native to eastern Australia uses electroreception to hunt underwater prey?",
        correct: "Platypus",
        w1: "Echidna",
        w2: "Numbat",
        exp: "The duck-billed platypus has thousands of electroreceptors in its bill that detect electric fields generated by moving crustaceans."
      },
      {
        q: "Which gymnosperm tree species, native to China, has survived unchanged for over 200 million years with distinctive fan-shaped leaves?",
        correct: "Ginkgo biloba",
        w1: "Metasequoia",
        w2: "Welwitschia",
        exp: "Ginkgo biloba is the only living species in the division Ginkgophyta, possessing exceptional resistance to pests, pollution, and radiation."
      }
    ],
    number: {
      q: "In what year was the live coelacanth rediscovered off the coast of East London in South Africa?",
      target: 1938,
      unit: "year",
      imperial: "1938 AD",
      exp: "Museum curator Marjorie Courtenay-Latimer spotted the preserved coelacanth specimen on a trawler deck on December 22, 1938."
    }
  },

  // Cycle 6: World Deserts, Endorheic Basins & Extreme Landforms
  {
    mcqs: [
      {
        q: "What non-polar desert in South America is recognized as the driest hot desert on Earth, with some weather stations recording zero rain for decades?",
        correct: "Atacama Desert",
        w1: "Namib Desert",
        w2: "Kalahari Desert",
        exp: "The Atacama Desert in Chile is locked between the Pacific coastal range and the Andes, creating a hyper-arid rain shadow environment."
      },
      {
        q: "Which coastal desert in southwestern Africa contains Sossusvlei, home to some of the highest red sand dunes in the world?",
        correct: "Namib Desert",
        w1: "Gibson Desert",
        w2: "Taklamakan Desert",
        exp: "The Namib Desert is considered the world oldest desert, shaped by the cold Benguela Current creating dense ocean fog."
      },
      {
        q: "What vast endorheic salt flat in southwestern Bolivia covers over 10,000 square kilometers, holding the world largest lithium reserves?",
        correct: "Salar de Uyuni",
        w1: "Etosha Pan",
        w2: "Rann of Kutch",
        exp: "Salar de Uyuni sits at 3,656 meters elevation, transforming into a massive natural mirror during seasonal rainfall."
      },
      {
        q: "Which colossal desert in northwestern China is known as the Sea of Death because of its shifting sand dunes and extreme isolation?",
        correct: "Taklamakan Desert",
        w1: "Gobi Desert",
        w2: "Karakum Desert",
        exp: "The Taklamakan Desert in Xinjiang is bounded by the Tian Shan, Pamir, and Kunlun mountains, traversed historically by Silk Road branches."
      },
      {
        q: "What is the lowest point on dry land on Earth, sitting roughly 430 meters below sea level on the Jordan Rift Valley?",
        correct: "Dead Sea",
        w1: "Lake Assal",
        w2: "Qattara Depression",
        exp: "The hypersaline Dead Sea has a salinity of roughly 34 percent, making it nearly ten times saltier than the open ocean."
      }
    ],
    number: {
      q: "Approximately how many meters below sea level is the shoreline of the Dead Sea?",
      target: 430,
      unit: "meters",
      imperial: "1,411 feet",
      exp: "The surface and shores of the Dead Sea sit approximately 430 meters below mean sea level, the lowest elevation on Earth land surface."
    }
  },

  // Cycle 7: Classical Literature, Ancient Epics & Dramatists
  {
    mcqs: [
      {
        q: "Which ancient Mesopotamian epic is widely regarded as the earliest surviving great work of literature in human history?",
        correct: "Epic of Gilgamesh",
        w1: "Enuma Elish",
        w2: "Atrahasis Epic",
        exp: "The Epic of Gilgamesh recounts the King of Uruk quest for immortality following the death of his wild companion Enkidu."
      },
      {
        q: "Which ancient Greek playwright wrote the classic tragedy Oedipus Rex and Antigone as part of the Three Theban Plays?",
        correct: "Sophocles",
        w1: "Aeschylus",
        w2: "Euripides",
        exp: "Sophocles introduced a third actor to Greek dramatic productions and won twenty victories at the Dionysia festival in Athens."
      },
      {
        q: "Which 14th-century Italian poet wrote the narrative epic Divine Comedy, dividing the afterlife into Inferno, Purgatorio, and Paradiso?",
        correct: "Dante Alighieri",
        w1: "Francesco Petrarch",
        w2: "Giovanni Boccaccio",
        exp: "Dante composed the Divine Comedy in the Tuscan vernacular, establishing the linguistic foundation of modern standard Italian."
      },
      {
        q: "Which 11th-century Japanese noblewoman wrote The Tale of Genji, often celebrated as the world first novel?",
        correct: "Murasaki Shikibu",
        w1: "Sei Shonagon",
        w2: "Ono no Komachi",
        exp: "Murasaki Shikibu served as a lady-in-waiting at the Heian Imperial Court, chronicling aristocratic romance, politics, and aesthetics."
      },
      {
        q: "Which Spanish master wrote Don Quixote in two parts published in 1605 and 1615, pioneering the modern Western novel?",
        correct: "Miguel de Cervantes",
        w1: "Lope de Vega",
        w2: "Pedro Calderon",
        exp: "Cervantes satirized chivalric romances through the misadventures of the noble Alonso Quixano and his faithful squire Sancho Panza."
      }
    ],
    number: {
      q: "In what year was Part One of Miguel de Cervantes masterwork Don Quixote first published in Madrid?",
      target: 1605,
      unit: "year",
      imperial: "1605 AD",
      exp: "El ingenioso hidalgo don Quijote de la Mancha was published in 1605, becoming an instantaneous international literary sensation."
    }
  },

  // Cycle 8: Electromagnetism, Particle Accelerators & High Energy Physics
  {
    mcqs: [
      {
        q: "Which 27-kilometer underground circular particle accelerator at CERN discovered the Higgs boson in 2012?",
        correct: "Large Hadron Collider",
        w1: "Tevatron",
        w2: "Super Proton Synchrotron",
        exp: "The Large Hadron Collider (LHC) collides opposing proton beams near the speed of light to explore the fundamental building blocks of matter."
      },
      {
        q: "Which Scottish mathematical physicist unified electricity, magnetism, and light into four classical electromagnetic equations in 1865?",
        correct: "James Clerk Maxwell",
        w1: "Michael Faraday",
        w2: "Heinrich Hertz",
        exp: "Maxwell equations demonstrated that light is an electromagnetic wave, predicting radio waves and modern telecommunications."
      },
      {
        q: "Which English experimentalist discovered electromagnetic induction in 1831, enabling electrical generators and transformers?",
        correct: "Michael Faraday",
        w1: "Humphry Davy",
        w2: "James Prescott Joule",
        exp: "Faraday discovered that moving a magnetic field through a conductive coil generates an electric current, founding electrical power generation."
      },
      {
        q: "Which theoretical particle predicts how elementary particles acquire inertial mass via interactions with a universal quantum field?",
        correct: "Higgs Boson",
        w1: "Graviton",
        w2: "Gluon",
        exp: "Peter Higgs and François Englert predicted the mechanism in 1964, which was confirmed experimentally at CERN forty-eight years later."
      },
      {
        q: "What subatomic fermions combine in groups of three to form protons (two up, one down) and neutrons (one up, two down)?",
        correct: "Quarks",
        w1: "Leptons",
        w2: "Mesons",
        exp: "Murray Gell-Mann and George Zweig proposed the quark model in 1964, bound together inside hadrons by the strong nuclear force."
      }
    ],
    number: {
      q: "In what year did CERN physicists announce the groundbreaking discovery of the Higgs boson particle?",
      target: 2012,
      unit: "year",
      imperial: "2012 AD",
      exp: "On July 4, 2012, the ATLAS and CMS collaborations at CERN announced the observation of a new particle consistent with the Higgs boson."
    }
  },

  // Cycle 9: World Aviation Milestones, Supersonic Flight & Records
  {
    mcqs: [
      {
        q: "Which American pilot became the first human to officially break the sound barrier in level flight aboard the Bell X-1 in 1947?",
        correct: "Chuck Yeager",
        w1: "Bob Hoover",
        w2: "Scott Crossfield",
        exp: "Yeager flew the rocket-powered Bell X-1, nicknamed Glamorous Glennis, to Mach 1.06 over the Mojave Desert on October 14, 1947."
      },
      {
        q: "Which Anglo-French turbojet airliner operated commercial supersonic passenger flights from 1976 until 2003 at Mach 2.04?",
        correct: "Concorde",
        w1: "Tupolev Tu-144",
        w2: "Boeing 2707",
        exp: "Concorde could cross the Atlantic Ocean from London to New York in under three and a half hours, cruising at 60,000 feet."
      },
      {
        q: "Which American aviator completed the first solo, non-stop transatlantic airplane flight from New York to Paris in 1927?",
        correct: "Charles Lindbergh",
        w1: "Wiley Post",
        w2: "Howard Hughes",
        exp: "Lindbergh flew the custom monoplane Spirit of St. Louis for 33.5 hours, landing to ecstatic crowds at Le Bourget airport."
      },
      {
        q: "Which legendary twin-engine reconnaissance aircraft built by Lockheed flew at altitudes above 85,000 feet and speeds exceeding Mach 3.2?",
        correct: "SR-71 Blackbird",
        w1: "U-2 Dragon Lady",
        w2: "XB-70 Valkyrie",
        exp: "Designed by Kelly Johnson and the Skunk Works, the SR-71 utilized titanium skin and radar-absorbing materials to outrun interceptor missiles."
      },
      {
        q: "Who was the first woman to fly solo across the Atlantic Ocean, completing the flight from Newfoundland to Northern Ireland in 1932?",
        correct: "Amelia Earhart",
        w1: "Bessie Coleman",
        w2: "Amy Johnson",
        exp: "Earhart piloted a red Lockheed Vega 5B across the Atlantic in fourteen hours and fifty-six minutes, winning the Distinguished Flying Cross."
      }
    ],
    number: {
      q: "In what year did Charles Lindbergh complete his historic solo non-stop flight from New York to Paris in the Spirit of St. Louis?",
      target: 1927,
      unit: "year",
      imperial: "1927 AD",
      exp: "Charles Lindbergh departed Roosevelt Field on May 20, 1927, and touched down in Paris on May 21 after flying 5,800 kilometers."
    }
  },

  // Cycle 10: Seismology, Earth Structure & Continental Drift
  {
    mcqs: [
      {
        q: "Which German meteorologist and geophysicist first proposed the comprehensive theory of Continental Drift in 1912?",
        correct: "Alfred Wegener",
        w1: "Arthur Holmes",
        w2: "Harry Hess",
        exp: "Wegener noted the complementary fit of South America and Africa and matching fossil distributions, proposing the supercontinent Pangaea."
      },
      {
        q: "What seismic boundary separating the Earth crust from the underlying silicate mantle was discovered in 1909?",
        correct: "Mohorovičić Discontinuity",
        w1: "Gutenberg Discontinuity",
        w2: "Lehmann Discontinuity",
        exp: "Croatian seismologist Andrija Mohorovičić observed that seismic waves accelerate abruptly when passing into the denser mantle."
      },
      {
        q: "Which Danish seismologist discovered in 1936 that the Earth core consists of a solid inner core surrounded by a molten outer core?",
        correct: "Inge Lehmann",
        w1: "Beno Gutenberg",
        w2: "Charles Richter",
        exp: "Lehmann analyzed faint P-wave reflections on seismograms from New Zealand earthquakes, proving the existence of a solid inner iron-nickel core."
      },
      {
        q: "What scale developed in 1935 quantified earthquake magnitude based on the logarithm of seismic wave amplitudes?",
        correct: "Richter Scale",
        w1: "Mercalli Scale",
        w2: "Moment Magnitude Scale",
        exp: "Charles Richter and Beno Gutenberg developed the logarithmic scale at Caltech using Wood-Anderson torsion seismometers."
      },
      {
        q: "What massive geological feature encircling the Pacific Ocean basin accounts for roughly 80 percent of the world largest earthquakes?",
        correct: "Ring of Fire",
        w1: "Mid-Atlantic Ridge",
        w2: "Alpine Belt",
        exp: "The Pacific Ring of Fire is an active 40,000-kilometer horseshoe of subduction zones, volcanic arcs, and oceanic trenches."
      }
    ],
    number: {
      q: "In what year did Alfred Wegener first present his hypothesis of Continental Drift and Pangaea to the German Geological Association?",
      target: 1912,
      unit: "year",
      imperial: "1912 AD",
      exp: "Wegener delivered his landmark lecture on January 6, 1912, published fully in Die Entstehung der Kontinente und Ozeane."
    }
  }
];

// Build Quiz 8
buildQuiz({
  id: 'general-knowledge-vol8-60',
  theme: 'General Knowledge Vol 8: Wonders, Civilizations & Scientific Breakthroughs',
  title: 'General Knowledge Vol 8: Wonders, Civilizations & Scientific Breakthroughs',
  description: 'A 60-question grand master assessment exploring oceanography, Renaissance astronomy, monumental engineering, synthetic polymers, evolutionary biology, world deserts, classical literature, particle physics, aviation records, and seismology.',
  category: 'Sports, Records & General Knowledge',
  difficulty: 'moderate'
}, vol8Cycles);

console.log('Vol 8 successfully built!');
