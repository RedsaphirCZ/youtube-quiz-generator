const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// Volume 13: general-knowledge-vol13-60
// Theme: "General Knowledge Vol 13: Microscopic Worlds, Global Voyages & Celestial Mechanics"
// Category: "Sports, Records & General Knowledge"
// =========================================================================
const vol13Cycles = [
  // Cycle 1: Microbiology, Viruses & The Microscopic Frontier
  {
    mcqs: [
      {
        q: "Which English natural philosopher coined the biological term 'cell' in his 1665 treatise Micrographia after observing cork tissue under a microscope?",
        correct: "Robert Hooke",
        w1: "Robert Boyle",
        w2: "Antonie van Leeuwenhoek",
        exp: "Hooke observed porous rectangular cavities in cork slices that reminded him of the small bare rooms (cellulae) inhabited by Christian monks."
      },
      {
        q: "What specialized viruses exclusively infect, replicate inside, and destroy bacterial cells?",
        correct: "Bacteriophages",
        w1: "Retroviruses",
        w2: "Adenoviruses",
        exp: "Bacteriophages inject their genetic payload directly through bacterial cell walls, utilized today in phage therapy to treat antibiotic-resistant infections."
      },
      {
        q: "Which Danish bacteriologist developed the Gram stain technique in 1884 to classify bacteria based on the chemical structure of their cell walls?",
        correct: "Hans Christian Gram",
        w1: "Robert Koch",
        w2: "Ferdinand Cohn",
        exp: "Gram-positive bacteria retain crystal violet dye due to a thick peptidoglycan wall, while Gram-negative bacteria have a thinner wall that stains pink."
      },
      {
        q: "What four systematic criteria formulated by Robert Koch establish whether a specific microorganism is the causal agent of a disease?",
        correct: "Koch Postulates",
        w1: "Pasteur Principles",
        w2: "Ehrlich Hypotheses",
        exp: "Koch proved that Bacillus anthracis causes anthrax and Mycobacterium tuberculosis causes tuberculosis, setting the benchmark for infectious disease research."
      },
      {
        q: "What protein shell encloses and protects the viral nucleic acid genome (RNA or DNA) of a virus particle?",
        correct: "Capsid",
        w1: "Envelope",
        w2: "Peptidoglycan",
        exp: "Capsids are constructed from repeating protein subunits called capsomeres, arranged in icosahedral, helical, or complex architectural geometries."
      }
    ],
    number: {
      q: "In what year was Robert Hooke landmark illustrated microscope study Micrographia published by the Royal Society?",
      target: 1665,
      unit: "year",
      imperial: "1665 AD",
      exp: "Micrographia was published in London in 1665, featuring detailed fold-out copperplate engravings of fleas, lice, and cork cells."
    }
  },

  // Cycle 2: Global Circumnavigations & Historic Sea Voyages
  {
    mcqs: [
      {
        q: "Which Spanish navigator completed the first successful global circumnavigation aboard the Victoria in 1522 after Magellan died in the Philippines?",
        correct: "Juan Sebastián Elcano",
        w1: "Hernán Cortés",
        w2: "Vasco da Gama",
        exp: "Elcano brought the battered carrack Victoria and eighteen surviving crew members back to Seville after crossing the uncharted Indian and Atlantic oceans."
      },
      {
        q: "Which English privateer completed the second global circumnavigation between 1577 and 1580 aboard his flagship Golden Hind?",
        correct: "Sir Francis Drake",
        w1: "Sir Walter Raleigh",
        w2: "Martin Frobisher",
        exp: "Drake raided Spanish ports along the Pacific coast of the Americas, claimed New Albion in California for Queen Elizabeth I, and sailed across the Pacific."
      },
      {
        q: "Which Canadian-American sailor became the first person to sail solo around the world between 1895 and 1898 aboard the rebuilt oyster sloop Spray?",
        correct: "Joshua Slocum",
        w1: "Francis Chichester",
        w2: "Robin Knox-Johnston",
        exp: "Slocum sailed over 74,000 kilometers without a chronometer, navigating purely by dead reckoning and lunar observations, chronicled in Sailing Alone Around the World."
      },
      {
        q: "Which British Royal Navy expedition between 1872 and 1876 laid the foundation of modern oceanography by sounding oceanic trenches worldwide?",
        correct: "HMS Challenger Expedition",
        w1: "HMS Beagle Expedition",
        w2: "HMS Discovery Expedition",
        exp: "The Challenger expedition traveled 127,500 kilometers, recording sea temperatures, discovering 4,700 new species, and discovering the Mariana Trench."
      },
      {
        q: "Which English explorer made three epic Pacific voyages aboard HMS Endeavour and Resolution, mapping New Zealand, eastern Australia, and Hawaii?",
        correct: "Captain James Cook",
        w1: "William Bligh",
        w2: "George Vancouver",
        exp: "Cook observed the 1769 transit of Venus in Tahiti, prevented scurvy with fresh sauerkraut and citrus, and disproved the existence of a temperate Terra Australis."
      }
    ],
    number: {
      q: "How many surviving crew members successfully returned to Spain aboard the Victoria in 1522 out of the original 270 men who departed with Magellan?",
      target: 18,
      unit: "survivors",
      imperial: "18 men out of 270",
      exp: "Only 18 malnourished men under the command of Juan Sebastián Elcano completed the three-year circumnavigation on the single surviving ship Victoria."
    }
  },

  // Cycle 3: Celestial Mechanics, Orbital Speeds & Escape Velocity
  {
    mcqs: [
      {
        q: "What is the minimum velocity in kilometers per second required for an unpowered projectile to break completely free from Earth gravitational field?",
        correct: "11.2 Kilometers per Second",
        w1: "7.9 Kilometers per Second",
        w2: "16.7 Kilometers per Second",
        exp: "Escape velocity from Earth surface is approximately 11.2 km/s (roughly 40,320 km/h), derived from Earth mass and planetary radius."
      },
      {
        q: "What five gravitational equilibrium positions in space allow a small mass to maintain a fixed relative position between two large orbiting bodies?",
        correct: "Lagrange Points",
        w1: "Kepler Nodes",
        w2: "Euler Coordinates",
        exp: "Named after Joseph-Louis Lagrange, points L1 through L5 balance combined gravitational pulls and centrifugal forces, used to park space observatories like JWST."
      },
      {
        q: "What elliptic orbital trajectory is the most fuel-efficient method for transferring a spacecraft between two circular planetary orbits?",
        correct: "Hohmann Transfer Orbit",
        w1: "Bi-elliptic Transfer",
        w2: "Hyperbolic Insertion",
        exp: "Walter Hohmann calculated in 1925 that using two instantaneous engine burns at opposite apsides provides the minimum energy interplanetary path."
      },
      {
        q: "What is the circular orbital altitude above Earth equator where a satellite orbital period matches Earth 24-hour rotation rate?",
        correct: "Geostationary Orbit 35,786 Kilometers",
        w1: "Low Earth Orbit 400 Kilometers",
        w2: "Medium Earth Orbit 20,200 Kilometers",
        exp: "At exactly 35,786 kilometers altitude, satellites hover permanently over the same geographical coordinate, ideal for weather monitoring and direct satellite TV."
      },
      {
        q: "What gravitational boundary distance dictates when a celestial body held together only by self-gravity will disintegrate due to tidal forces from a larger body?",
        correct: "Roche Limit",
        w1: "Schwarzschild Radius",
        w2: "Hill Sphere",
        exp: "Formulated by Édouard Roche, comets or moons passing inside this limit are torn apart by differential tidal gravity, forming planetary rings like Saturn."
      }
    ],
    number: {
      q: "What is the altitude in kilometers above Earth equator of a satellite in Geostationary Orbit?",
      target: 35786,
      unit: "kilometers",
      imperial: "22,236 miles",
      exp: "At exactly 35,786 kilometers above mean sea level, a satellite completes one orbit in twenty-three hours, fifty-six minutes, and four seconds (one sidereal day)."
    }
  },

  // Cycle 4: Ancient Law Codes, Jurisprudence & Civic Treaties
  {
    mcqs: [
      {
        q: "Which ancient Babylonian law code carved onto a basalt diorite stele around 1750 BCE established the legal principle of eye for an eye (lex talionis)?",
        correct: "Code of Hammurabi",
        w1: "Code of Ur-Nammu",
        w2: "Laws of Eshnunna",
        exp: "Hammurabi 282 legal edicts regulated commerce, agriculture, slavery, marital property, and scaled penal retaliations across the Babylonian Empire."
      },
      {
        q: "Which landmark English royal charter signed by King John at Runnymede in 1215 established that the sovereign was subject to the rule of law?",
        correct: "Magna Carta",
        w1: "Bill of Rights 1689",
        w2: "Petition of Right",
        exp: "Clause 39 of Magna Carta guaranteed that no free man could be imprisoned or stripped of rights except by the lawful judgment of his equals."
      },
      {
        q: "Which monumental compilation of Roman law ordered by Byzantine Emperor Justinian I in 529 CE formed the basis of continental European Civil Law?",
        correct: "Corpus Juris Civilis",
        w1: "Twelve Tables",
        w2: "Theodosian Code",
        exp: "The Justinian Code codified centuries of Roman statutes, imperial edicts, and jurisprudence digests, preserved by legal scholars at the University of Bologna."
      },
      {
        q: "Which comprehensive civil legal code established under Napoleon Bonaparte in 1804 eliminated feudal privileges and instituted equality under the law?",
        correct: "Napoleonic Code",
        w1: "Prussian General Code",
        w2: "Austrian Civil Code",
        exp: "The Code Civil des Français established freedom of religion, secular contract law, and equal inheritance rights, influencing modern legal systems globally."
      },
      {
        q: "What foundational bronze tablet legislation inscribed around 450 BCE formed the centerpiece of the ancient Roman Republic constitution?",
        correct: "Twelve Tables",
        w1: "Lex Aquilia",
        w2: "Lex Hortensia",
        exp: "The Law of the Twelve Tables was posted in the Roman Forum so plebeians and patricians could equally read the written laws governing civil disputes."
      }
    ],
    number: {
      q: "In what year did King John of England grant and affix his great seal to Magna Carta at Runnymede?",
      target: 1215,
      unit: "year",
      imperial: "1215 AD",
      exp: "Magna Carta was sealed on June 15, 1215, establishing fundamental limits on royal authority and arbitrary detention."
    }
  },

  // Cycle 5: Astronomical Spectroscopy, Dark Lines & Stellar Classes
  {
    mcqs: [
      {
        q: "Which British-American astronomer proved in her 1925 doctoral thesis that stars are composed overwhelmingly of hydrogen and helium?",
        correct: "Cecilia Payne-Gaposchkin",
        w1: "Annie Jump Cannon",
        w2: "Henrietta Swan Leavitt",
        exp: "Payne applied thermal ionization equations to solar absorption spectra, overturning the contemporary assumption that stars had the same elemental composition as Earth."
      },
      {
        q: "Which German optical instrument maker discovered hundreds of dark absorption lines in the solar spectrum in 1814, mapping stellar chemical fingerprints?",
        correct: "Joseph von Fraunhofer",
        w1: "Robert Bunsen",
        w2: "Gustav Kirchhoff",
        exp: "Fraunhofer lines occur when cooler gas elements in the outer solar atmosphere absorb specific frequencies of continuous light from the hotter solar interior."
      },
      {
        q: "Which deaf American astronomer manually classified over 350,000 stellar spectra into the Harvard spectral classification system (O, B, A, F, G, K, M)?",
        correct: "Annie Jump Cannon",
        w1: "Williamina Fleming",
        w2: "Antonia Maury",
        exp: "Cannon organized stars by spectral temperature from hottest blue O-type stars (over 30,000 K) down to coolest red M-type dwarfs (under 3,500 K)."
      },
      {
        q: "What phenomenon shifts the spectral absorption lines of celestial objects toward shorter blue wavelengths when they move toward an observer?",
        correct: "Blueshift",
        w1: "Redshift",
        w2: "Zeeman Splitting",
        exp: "Optical Doppler shift causes approaching galaxies like Andromeda to exhibit blueshifted spectral lines, indicating radial velocity toward the Milky Way."
      },
      {
        q: "Which German chemist and physicist team demonstrated in 1859 that every chemical element produces unique, identifying spectral emission lines when heated?",
        correct: "Robert Bunsen and Gustav Kirchhoff",
        w1: "Dmitri Mendeleev and Lothar Meyer",
        w2: "Michael Faraday and John Tyndall",
        exp: "Bunsen and Kirchhoff used a prism spectroscope on burner flames to identify new elements like cesium and rubidium from their glowing atomic spectra."
      }
    ],
    number: {
      q: "In what year did Cecilia Payne-Gaposchkin submit her revolutionary Radcliffe dissertation proving stars are composed primarily of hydrogen?",
      target: 1925,
      unit: "year",
      imperial: "1925 AD",
      exp: "Astronomer Otto Struve described Payne 1925 PhD thesis as undoubtedly the most brilliant Ph.D. thesis ever written in astronomy."
    }
  },

  // Cycle 6: Mycology, Fungal Networks & Spore Ecology
  {
    mcqs: [
      {
        q: "What extensive subterranean network of thread-like fungal hyphae connects forest plant roots, facilitating nutrient and warning chemical exchanges?",
        correct: "Mycelium Mycorrhizal Network",
        w1: "Rhizoid Web",
        w2: "Haustorium Net",
        exp: "Often dubbed the Wood Wide Web, mycorrhizal fungi exchange soil phosphorus and nitrogen for photosynthetic sugars produced by tree canopies."
      },
      {
        q: "Which honey fungus in Malheur National Forest, Oregon, is recognized as one of the largest and oldest single living organisms by land area on Earth?",
        correct: "Armillaria ostoyae",
        w1: "Calvatia gigantea",
        w2: "Fomes fomentarius",
        exp: "Covering over 2,385 acres (9.6 square kilometers) underground, this single fungal clone is estimated to be between 2,400 and 8,600 years old."
      },
      {
        q: "What symbiotic composite organism forms from a mutualistic partnership between a filamentous fungus and a photosynthetic green alga or cyanobacterium?",
        correct: "Lichen",
        w1: "Bryophyte",
        w2: "Myxomycete",
        exp: "The mycobiont fungus provides physical protection and mineral absorption, while the photobiont alga synthesizes organic carbohydrates via photosynthesis."
      },
      {
        q: "What fungal plant pathogen infecting rye grain produces psychoactive ergot alkaloids that caused widespread medieval outbreaks of Saint Anthony Fire?",
        correct: "Claviceps purpurea",
        w1: "Aspergillus flavus",
        w2: "Fusarium oxysporum",
        exp: "Ergot poisoning caused severe vasoconstriction, gangrene, and hallucinations, and served as the precursor compound from which Albert Hofmann synthesized LSD."
      },
      {
        q: "What tough structural nitrogenous polysaccharide makes up the cell walls of fungi and the exoskeletons of arthropods like crabs and insects?",
        correct: "Chitin",
        w1: "Cellulose",
        w2: "Lignin",
        exp: "Unlike plant cell walls made of cellulose, fungal cell walls are reinforced with chitin polymers, demonstrating closer evolutionary kinship to animals than plants."
      }
    ],
    number: {
      q: "What is the approximate land area in acres covered by the giant Armillaria ostoyae fungal organism in Oregon?",
      target: 2385,
      unit: "acres",
      imperial: "2,385 acres (3.7 square miles)",
      exp: "The Malheur National Forest humongous fungus specimen spans approximately 2,385 acres beneath the forest floor."
    }
  },

  // Cycle 7: Famous Mountain Passes & Strategic Geography
  {
    mcqs: [
      {
        q: "Which historic mountain pass through the Spin Ghar mountains connects northwestern Pakistan with Afghanistan, traversed by Silk Road caravans and conquerors?",
        correct: "Khyber Pass",
        w1: "Bolan Pass",
        w2: "Wakhan Corridor",
        exp: "The Khyber Pass served as a strategic military invasion gateway between Central Asia and the Indian subcontinent for Alexander, Babur, and the British Empire."
      },
      {
        q: "Which lowest and most heavily traversed mountain pass through the Central Alps links Innsbruck, Austria, with Bolzano, Italy?",
        correct: "Brenner Pass",
        w1: "St. Gotthard Pass",
        w2: "Simplon Pass",
        exp: "At an elevation of only 1,370 meters, the Brenner Pass has served as a vital trade conduit connecting northern and southern Europe since Roman antiquity."
      },
      {
        q: "Which high-altitude mountain pass in the Ladakh region of India sits at an elevation of 5,359 meters, serving as a gateway to the Nubra Valley?",
        correct: "Khardung La",
        w1: "Nathu La",
        w2: "Rohtang Pass",
        exp: "Khardung La is historically celebrated as one of the highest motorable mountain passes on Earth, traversed by trans-Himalayan trade caravans."
      },
      {
        q: "Which Alpine pass between France and Italy was famously traversed by Carthaginian general Hannibal Barca with war elephants in 218 BCE?",
        correct: "Little St Bernard Pass",
        w1: "Stelvio Pass",
        w2: "Col du Galibier",
        exp: "Hannibal led tens of thousands of infantry and cavalry across high snowy Alpine passes to launch his surprise invasion of the Roman Republic."
      },
      {
        q: "Which strategic pass through the Hindu Kush mountains of Afghanistan features a 2.7-kilometer tunnel built by Soviet engineers in 1964?",
        correct: "Salang Pass",
        w1: "Hajigak Pass",
        w2: "Anjuman Pass",
        exp: "The Salang Pass links Kabul and southern Afghanistan to the northern plains at an altitude of nearly 3,400 meters."
      }
    ],
    number: {
      q: "What is the approximate elevation in meters above sea level of the Khardung La mountain pass in Ladakh, India?",
      target: 5359,
      unit: "meters",
      imperial: "17,582 feet",
      exp: "Khardung La in the Karakoram range stands at an official elevation of 5,359 meters above sea level."
    }
  },

  // Cycle 8: Medieval Universities & Scholastic Revival
  {
    mcqs: [
      {
        q: "Which Italian institution founded in 1088 is recognized as the oldest continuously operating degree-granting university in the world?",
        correct: "University of Bologna",
        w1: "University of Padua",
        w2: "University of Naples",
        exp: "Bologna pioneered the student guild system (universitas scholarium), specializing in Roman civil and canon law."
      },
      {
        q: "Which English university, the oldest in the English-speaking world, began rapid expansion around 1167 when Henry II banned students from attending Paris?",
        correct: "University of Oxford",
        w1: "University of Cambridge",
        w2: "University of St Andrews",
        exp: "Oxford established colleges like University College, Balliol, and Merton in the 13th century, becoming a center for natural philosophy and theology."
      },
      {
        q: "Which legendary 9th-century Abbasid academy in Baghdad translated Greek, Persian, and Indian scientific texts into Arabic under Caliph al-Ma'mun?",
        correct: "House of Wisdom Bayt al-Hikma",
        w1: "Al-Azhar University",
        w2: "Nizamiyya Academy",
        exp: "Scholars like al-Khwarizmi, al-Kindi, and Hunayn ibn Ishaq translated works of Aristotle, Euclid, and Galen, catalyzing the Islamic Golden Age."
      },
      {
        q: "Which ancient Buddhist monastic university in Bihar, India, flourished from the 5th century CE as a global center of higher learning with nine million texts?",
        correct: "Nalanda University",
        w1: "Taxila Academy",
        w2: "Vikramashila",
        exp: "Nalanda hosted over ten thousand students from China, Korea, and Tibet before being sacked by Bakhtiyar Khilji in 1193 CE."
      },
      {
        q: "Which Dominican friar and philosopher reconciled Aristotelian philosophy with Christian theology in his masterwork Summa Theologiae at the University of Paris?",
        correct: "Thomas Aquinas",
        w1: "Peter Abelard",
        w2: "William of Ockham",
        exp: "Aquinas developed Thomism, asserting that natural human reason and divine revelation are complementary paths to the apprehension of truth."
      }
    ],
    number: {
      q: "In what year was the University of Bologna in Italy founded, making it the oldest continuous university in the world?",
      target: 1088,
      unit: "year",
      imperial: "1088 AD",
      exp: "The date of 1088 was established by a committee of historians led by Giosuè Carducci as the founding year of the University of Bologna."
    }
  },

  // Cycle 9: Acoustics, Sound Waves & Infrasound
  {
    mcqs: [
      {
        q: "What is the speed of sound through dry air at a standard room temperature of 20 degrees Celsius at sea level?",
        correct: "343 Meters per Second",
        w1: "300 Meters per Second",
        w2: "410 Meters per Second",
        exp: "Sound travels as longitudinal pressure waves through air at approximately 343 m/s (1,235 km/h or 767 mph), accelerating in denser water (1,480 m/s) and steel (5,100 m/s)."
      },
      {
        q: "What term describes sound frequencies below 20 hertz, below the normal lower limit of human hearing, used by elephants to communicate over miles?",
        correct: "Infrasound",
        w1: "Ultrasound",
        w2: "Hypersound",
        exp: "Infrasonic acoustic waves travel long distances with minimal atmospheric attenuation, produced by earthquakes, ocean surf, volcanic eruptions, and megafauna."
      },
      {
        q: "Which Austrian physicist proposed in 1842 that the observed frequency of a wave depends on the relative speed of the source and observer?",
        correct: "Christian Doppler",
        w1: "Ernst Mach",
        w2: "Heinrich Hertz",
        exp: "The Doppler effect explains why an approaching siren sounds higher in pitch (compressed frequency) and drops to a lower pitch as it speeds away."
      },
      {
        q: "What logarithmic acoustic unit named after the inventor of the telephone measures relative sound pressure level and signal intensity?",
        correct: "Decibel",
        w1: "Phon",
        w2: "Sone",
        exp: "Every increase of ten decibels represents a tenfold increase in acoustic sound energy, with human hearing ranging from 0 dB to 140 dB threshold of pain."
      },
      {
        q: "What phenomenon occurs when the driving frequency of a sound wave matches the natural resonance frequency of a crystal wine glass, causing it to shatter?",
        correct: "Acoustic Resonance",
        w1: "Acoustic Levitation",
        w2: "Diffraction Interference",
        exp: "Resonant amplification causes constructive standing wave oscillations to exceed the material elastic shear limit, fracturing brittle crystalline lattices."
      }
    ],
    number: {
      q: "What is the speed of sound in dry air at 20 degrees Celsius in meters per second?",
      target: 343,
      unit: "meters per second",
      imperial: "767 miles per hour",
      exp: "At 20 degrees Celsius (68 degrees Fahrenheit), sound waves propagate through dry air at exactly 343 meters per second."
    }
  },

  // Cycle 10: Iconic World Bridges, Spans & Structural Feats
  {
    mcqs: [
      {
        q: "Which pioneering hybrid suspension and cable-stayed bridge in New York City opened in 1883 with neo-Gothic stone towers, completed under chief engineer Emily Roebling?",
        correct: "Brooklyn Bridge",
        w1: "Manhattan Bridge",
        w2: "Williamsburg Bridge",
        exp: "John and Washington Roebling designed galvanized steel wire cables spun across the East River, with Emily Roebling directing field construction for over a decade."
      },
      {
        q: "Which massive red steel cantilever railway bridge across the Firth of Forth in Scotland opened in 1890, pioneering tubular structural steel engineering?",
        correct: "Forth Bridge",
        w1: "Tay Bridge",
        w2: "Humber Bridge",
        exp: "Engineered by Sir John Fowler and Sir Benjamin Baker, the UNESCO World Heritage Forth Bridge uses 53,000 tons of steel held by 6.5 million rivets."
      },
      {
        q: "Which Japanese suspension bridge connecting Kobe to Awaji Island held the world longest central suspension span of 1,991 meters from 1998 to 2022?",
        correct: "Akashi Kaikyo Bridge",
        w1: "Great Belt Bridge",
        w2: "1915 Çanakkale Bridge",
        exp: "The Akashi Kaikyo Bridge was designed to withstand earthquakes of magnitude 8.5 and typhoon wind gusts up to 286 kilometers per hour in the Akashi Strait."
      },
      {
        q: "Which iconic steel through-arch bridge in Sydney, Australia, nicknamed The Coathanger, opened in 1932, spanning 503 meters across Port Jackson?",
        correct: "Sydney Harbour Bridge",
        w1: "Story Bridge",
        w2: "Tyne Bridge",
        exp: "Designed by British firm Dorman Long, the arch contains 52,800 tons of steel and required 272,000 liters of paint for its initial three protective coats."
      },
      {
        q: "Which suspension bridge opened in 1973 was the first bridge in modern history to connect the European and Asian continents directly across the Bosphorus Strait in Istanbul?",
        correct: "Bosphorus Bridge 15 July Martyrs",
        w1: "Fatih Sultan Mehmet Bridge",
        w2: "Yavuz Sultan Selim Bridge",
        exp: "Spanning 1,560 meters between Ortaköy in Europe and Beylerbeyi in Asia, it was the first permanent crossing between the two continents since Persian boat bridges."
      }
    ],
    number: {
      q: "In what year did the historic Brooklyn Bridge officially open to traffic connecting Brooklyn and Manhattan?",
      target: 1883,
      unit: "year",
      imperial: "1883 AD",
      exp: "The Brooklyn Bridge opened on May 24, 1883, with thousands of citizens and President Chester A. Arthur attending the opening celebration."
    }
  }
];

// Build Quiz 13
buildQuiz({
  id: 'general-knowledge-vol13-60',
  theme: 'General Knowledge Vol 13: Microscopic Worlds, Global Voyages & Celestial Mechanics',
  title: 'General Knowledge Vol 13: Microscopic Worlds, Global Voyages & Celestial Mechanics',
  description: 'A 60-question grand master assessment exploring microbiology, global circumnavigations, orbital mechanics, ancient law codes, stellar spectroscopy, mycology, mountain passes, medieval universities, acoustics, and iconic bridges.',
  category: 'Sports, Records & General Knowledge',
  difficulty: 'moderate'
}, vol13Cycles);

console.log('Vol 13 successfully built!');
