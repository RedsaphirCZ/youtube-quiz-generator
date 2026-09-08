const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// Volume 12: general-knowledge-vol12-60
// Theme: "General Knowledge Vol 12: Lost Civilizations, Deep Time & Modern Technology"
// Category: "Sports, Records & General Knowledge"
// =========================================================================
const vol12Cycles = [
  // Cycle 1: Ancient Astronomy, Maya Calendars & Ancient Instruments
  {
    mcqs: [
      {
        q: "What ancient Greek analog computer recovered from a shipwreck in 1901 used bronze gear trains to calculate planetary positions and eclipses?",
        correct: "Antikythera Mechanism",
        w1: "Archimedes Sphere",
        w2: "Ptolemaic Astrolabe",
        exp: "Dated to roughly 150 to 100 BCE, the Antikythera mechanism used over thirty interlocking bronze gears to track the Metonic and Saros cycles."
      },
      {
        q: "Which ancient Mesoamerican civilization developed the sophisticated Long Count calendar system tracking time in cycles of 144,000 days (b'ak'tuns)?",
        correct: "Maya Civilization",
        w1: "Aztec Empire",
        w2: "Zapotec Culture",
        exp: "The Maya recorded astronomical solar, lunar, and Venusian synodic cycles on stone stelae and codices with exceptional mathematical accuracy."
      },
      {
        q: "Which ancient Greek astronomer of Samos was the first known scholar to propose a comprehensive heliocentric model of the solar system around 270 BCE?",
        correct: "Aristarchus of Samos",
        w1: "Eratosthenes",
        w2: "Hipparchus",
        exp: "Aristarchus calculated relative distances and sizes of the Sun and Moon, deducing that the immense Sun must sit at the center of planetary orbits."
      },
      {
        q: "Which ancient Mesopotamian clay cuneiform tablet records detailed astronomical observations of the planet Venus during the reign of King Ammisaduqa?",
        correct: "Venus Tablet of Ammisaduqa",
        w1: "Enuma Anu Enlil",
        w2: "Mul Apin Compendium",
        exp: "The tablet recorded first and last risings of Venus over twenty-one years, providing modern historians with critical chronological anchors for Babylon."
      },
      {
        q: "Which ancient Greek astronomer invented trigonometry, created the first comprehensive star catalog, and discovered the precession of the equinoxes?",
        correct: "Hipparchus of Nicaea",
        w1: "Claudius Ptolemy",
        w2: "Apollonius of Perga",
        exp: "Hipparchus compared star positions with records made 150 years earlier by Timocharis, noting stars had shifted eastward by approximately one degree per century."
      }
    ],
    number: {
      q: "How many days comprised the solar agricultural year (Haab') in the ancient Maya calendar system?",
      target: 365,
      unit: "days",
      imperial: "365 days (18 months of 20 days plus 5 Wayeb days)",
      exp: "The Maya Haab' calendar consisted of eighteen named months of twenty days each, plus a final unlucky period of five days called Wayeb'."
    }
  },

  // Cycle 2: Deep Sea Geomorphology, Seafloor Spreading & Ocean Trenches
  {
    mcqs: [
      {
        q: "Which American geologist and naval officer proposed the theory of Seafloor Spreading in 1960, showing new oceanic crust forms at mid-ocean ridges?",
        correct: "Harry Hess",
        w1: "Alfred Wegener",
        w2: "John Tuzo Wilson",
        exp: "Hess used sonar sounding data to show that magma wells up at mid-ocean ridges and spreads laterally, conveyor-belting ocean crust toward trenches."
      },
      {
        q: "What is the longest mountain range on Earth, a continuous volcanic ridge system stretching over 65,000 kilometers across the global ocean floor?",
        correct: "Mid-Ocean Ridge System",
        w1: "Andes Mountain Chain",
        w2: "East Pacific Rise",
        exp: "The Mid-Ocean Ridge winds through the Atlantic, Indian, and Pacific Oceans, forming new oceanic basaltic lithosphere at divergent boundaries."
      },
      {
        q: "What term describes flat-topped underwater volcanic seamounts that were eroded by wave action at sea level before subsiding into the abyss?",
        correct: "Guyots Tablemounts",
        w1: "Atolls",
        w2: "Sea Knolls",
        exp: "Harry Hess named these flat-topped underwater mountains guyots after Swiss-American geographer Arnold Henry Guyot."
      },
      {
        q: "What geological process occurs where dense oceanic plates sink beneath lighter continental or younger oceanic plates into the mantle?",
        correct: "Subduction",
        w1: "Obduction",
        w2: "Rifting",
        exp: "Subduction zones produce the world deepest ocean trenches, powerful megathrust earthquakes, and volcanic island arcs."
      },
      {
        q: "What deep oceanic trench in the northwestern Pacific off Kamchatka and the Kuril Islands reaches depths exceeding 10,500 meters?",
        correct: "Kuril-Kamchatka Trench",
        w1: "Philippine Trench",
        w2: "Tonga Trench",
        exp: "Formed where the Pacific Plate subducts under the Okhotsk Plate, the Kuril-Kamchatka Trench is among the deepest ocean chasms on Earth."
      }
    ],
    number: {
      q: "What is the approximate total length in kilometers of the global Mid-Ocean Ridge mountain system across the ocean basins?",
      target: 65000,
      unit: "kilometers",
      imperial: "40,389 miles",
      exp: "The interconnected mid-ocean ridge system spans approximately 65,000 kilometers across Earth ocean basins."
    }
  },

  // Cycle 3: Renaissance Anatomy, Andreas Vesalius & Blood Circulation
  {
    mcqs: [
      {
        q: "Which Flemish anatomist published the landmark masterwork De humani corporis fabrica in 1543, revolutionizing medicine with accurate human dissections?",
        correct: "Andreas Vesalius",
        w1: "Galen of Pergamon",
        w2: "Hieronymus Fabricius",
        exp: "Vesalius conducted direct human dissections in Padua, correcting over two hundred anatomical errors taught for centuries from Galen animal dissections."
      },
      {
        q: "Which English physician published De Motu Cordis in 1628, providing the first complete description of the systemic circulation of blood pumped by the heart?",
        correct: "William Harvey",
        w1: "Thomas Willis",
        w2: "Edward Jenner",
        exp: "Harvey calculated that the heart pumps more blood in an hour than the body weight, proving blood must circulate continuously through a closed arterial-venous loop."
      },
      {
        q: "Which Italian physician and biologist used a microscope in 1661 to discover microscopic capillaries, bridging Harvey arteries and veins?",
        correct: "Marcello Malpighi",
        w1: "Antonie van Leeuwenhoek",
        w2: "Robert Hooke",
        exp: "Malpighi examined frog lungs under magnification, identifying the tiny capillary vessels where oxygen and nutrient gas exchange takes place."
      },
      {
        q: "Which Italian Renaissance polymath created hundreds of exceptionally detailed anatomical sketches based on thirty human dissections between 1500 and 1515?",
        correct: "Leonardo da Vinci",
        w1: "Michelangelo Buonarroti",
        w2: "Albrecht Dürer",
        exp: "Leonardo collaborated with anatomist Marcantonio della Torre, illustrating the aortic valve, coronary vessels, and biomechanics with unprecedented precision."
      },
      {
        q: "Which Dutch cloth merchant and microscopist first observed living single-celled bacteria and protozoa, calling them animalcules in 1676?",
        correct: "Antonie van Leeuwenhoek",
        w1: "Robert Hooke",
        w2: "Jan Swammerdam",
        exp: "Leeuwenhoek ground high-power single-sphere glass lenses achieving over 200x magnification, discovering spermatozoa, red blood cells, and oral microbes."
      }
    ],
    number: {
      q: "In what year did Andreas Vesalius publish his revolutionary anatomical treatise De humani corporis fabrica in Basel?",
      target: 1543,
      unit: "year",
      imperial: "1543 AD",
      exp: "Published in 1543 (the same year as Copernicus De revolutionibus), Vesalius work transformed medicine into an empirical observational science."
    }
  },

  // Cycle 4: Geological Eras, Mass Extinctions & Fossil Formations
  {
    mcqs: [
      {
        q: "Which catastrophic mass extinction event 252 million years ago wiped out roughly 96 percent of all marine species and 70 percent of terrestrial vertebrates?",
        correct: "Permian-Triassic Extinction The Great Dying",
        w1: "Ordovician-Silurian Extinction",
        w2: "Late Devonian Extinction",
        exp: "Massive volcanic eruptions from the Siberian Traps released trillions of tons of carbon dioxide, triggering extreme ocean acidification and anoxia."
      },
      {
        q: "Which fossil-rich Canadian Rocky Mountain shale formation preserved soft-bodied marine organisms from the Cambrian Explosion 508 million years ago?",
        correct: "Burgess Shale",
        w1: "Mazon Creek",
        w2: "Solnhofen Limestone",
        exp: "Discovered by Charles Walcott in 1909, the Burgess Shale revealed bizarre stem-group arthropods like Anomalocaris, Opabinia, and Hallucigenia."
      },
      {
        q: "What famous natural asphalt seep in Los Angeles, California, has preserved hundreds of thousands of Ice Age mammal fossils like smilodons and mammoths?",
        correct: "La Brea Tar Pits",
        w1: "Wieliczka Deposits",
        w2: "Messel Pit",
        exp: "Naturally bubbling crude oil formed sticky asphalt traps over fifty thousand years, preserving the dense skeletal remains of dire wolves and saber-toothed cats."
      },
      {
        q: "During which geological period 359 to 299 million years ago did massive lycopsid tree swamps accumulate, forming most of Earth coal beds?",
        correct: "Carboniferous Period",
        w1: "Devonian Period",
        w2: "Permian Period",
        exp: "Lignin-rich trees grew in vast wetlands with few fungi capable of decomposing them, burying organic carbon and elevating atmospheric oxygen to thirty-five percent."
      },
      {
        q: "What geological era, spanning from 541 million years ago to the present, is characterized by abundant macroscopic, multicellular fossil life?",
        correct: "Phanerozoic Eon",
        w1: "Proterozoic Eon",
        w2: "Archean Eon",
        exp: "The Phanerozoic (meaning visible life) comprises the Paleozoic, Mesozoic, and Cenozoic eras, marked by the emergence of hard shells and bones."
      }
    ],
    number: {
      q: "What percentage of marine species were wiped out during the Permian-Triassic mass extinction (The Great Dying)?",
      target: 96,
      unit: "percent",
      imperial: "96% of marine species",
      exp: "The Permian-Triassic extinction event was the deadliest in Earth history, destroying an estimated 96 percent of all marine species."
    }
  },

  // Cycle 5: Modern Computing Architecture, Microprocessors & Silicon
  {
    mcqs: [
      {
        q: "Which four-bit microprocessor released by Intel in 1971, designed by Federico Faggin and Ted Hoff, was the world first commercial single-chip CPU?",
        correct: "Intel 4004",
        w1: "Intel 8008",
        w2: "MOS 6502",
        exp: "The Intel 4004 contained 2,300 transistors on a single silicon die, designed originally for the Japanese Busicom electronic desktop printing calculator."
      },
      {
        q: "Which computer architecture design, formulated by John von Neumann in 1945, stores both program instructions and data in the same shared memory space?",
        correct: "Von Neumann Architecture",
        w1: "Harvard Architecture",
        w2: "Turing Machine Architecture",
        exp: "Von Neumann architecture forms the foundation of modern general-purpose computers, utilizing a central processor, arithmetic logic unit, registers, and unified memory."
      },
      {
        q: "Which British mathematician introduced the theoretical concept of a universal computing machine with a tape and read-write head in 1936?",
        correct: "Alan Turing",
        w1: "Charles Babbage",
        w2: "Claude Shannon",
        exp: "Turing landmark paper On Computable Numbers proved fundamental limits on algorithmic computability and founded theoretical computer science."
      },
      {
        q: "Which American computer scientist and US Navy Rear Admiral developed the first compiler in 1952 and helped develop the COBOL programming language?",
        correct: "Grace Hopper",
        w1: "Ada Lovelace",
        w2: "Margaret Hamilton",
        exp: "Grace Hopper coined the term compiler for translating English-like programming language statements into machine code, pioneering user-friendly software."
      },
      {
        q: "Which solid-state device invented in 1959 at Bell Labs by Mohamed Atalla and Dawon Kahng became the most widely manufactured device in human history?",
        correct: "MOSFET Transistor",
        w1: "Bipolar Junction Transistor",
        w2: "Vacuum Triode",
        exp: "The Metal-Oxide-Semiconductor Field-Effect Transistor (MOSFET) is the basic switching element in modern microprocessors, with trillions built daily."
      }
    ],
    number: {
      q: "In what year did Intel release the 4004, the world first commercial single-chip microprocessor?",
      target: 1971,
      unit: "year",
      imperial: "1971 AD",
      exp: "Intel officially advertised the 4004 in Electronic News on November 15, 1971, launching the microcomputer revolution."
    }
  },

  // Cycle 6: World Deserts & Arid Ecosystems
  {
    mcqs: [
      {
        q: "Which cold winter desert in northern China and southern Mongolia is famous for the 1920s discovery of the first fossilized dinosaur eggs by Roy Chapman Andrews?",
        correct: "Gobi Desert",
        w1: "Taklamakan Desert",
        w2: "Karakum Desert",
        exp: "The Gobi Desert Flaming Cliffs (Bayanzag) yielded Protoceratops skulls, Velociraptor skeletons, and the first confirmed dinosaur nests in paleontology."
      },
      {
        q: "What immense sand sea covering roughly 650,000 square kilometers on the southern Arabian Peninsula is known as the Empty Quarter?",
        correct: "Rub al Khali",
        w1: "An Nafud",
        w2: "Dasht-e Kavir",
        exp: "The Rub' al Khali is the world largest continuous sand desert, featuring barchan and longitudinal dunes rising over 250 meters high."
      },
      {
        q: "Which large semi-arid sandy savanna in southern Africa spanning Botswana, Namibia, and South Africa is the ancestral homeland of the San people?",
        correct: "Kalahari Desert",
        w1: "Namib Desert",
        w2: "Karoo Basin",
        exp: "The Kalahari is technically a semi-desert with seasonal rainfall, supporting diverse wildlife like meerkats, gemsbok, and black-maned Kalahari lions."
      },
      {
        q: "What is the largest hot desert in the world, covering approximately 9.2 million square kilometers across North Africa?",
        correct: "Sahara Desert",
        w1: "Arabian Desert",
        w2: "Gobi Desert",
        exp: "The Sahara encompasses vast rocky plateaus (hamada), gravel plains (reg), and undulating sand seas (erg), spanning from the Atlantic Ocean to the Red Sea."
      },
      {
        q: "Which desert spanning the northwestern Indian state of Rajasthan and eastern Pakistan is the most densely populated desert on Earth?",
        correct: "Thar Desert",
        w1: "Cholistan Desert",
        w2: "Kyzylkum Desert",
        exp: "The Great Indian Desert has an average population density of eighty-three people per square kilometer, home to rich cultural traditions and vibrant camel fairs."
      }
    ],
    number: {
      q: "What is the approximate total area in millions of square kilometers covered by the Sahara Desert across North Africa?",
      target: 9,
      unit: "million square kilometers",
      imperial: "3.55 million square miles",
      exp: "The Sahara Desert covers roughly 9.2 million square kilometers, an area comparable in size to the entire United States or China."
    }
  },

  // Cycle 7: Renaissance Masters, Perspective & Fresco Techniques
  {
    mcqs: [
      {
        q: "Which Italian master painted the monumental ceiling frescoes of the Sistine Chapel in Rome between 1508 and 1512 under the patronage of Pope Julius II?",
        correct: "Michelangelo Buonarroti",
        w1: "Raphael Sanzio",
        w2: "Sandro Botticelli",
        exp: "Michelangelo spent four years painting while standing upright on custom wooden scaffolding, completing iconic scenes like The Creation of Adam."
      },
      {
        q: "Which Florentine architect demonstrated the mathematical principles of linear perspective around 1415 using mirrors and the Florence Baptistery?",
        correct: "Filippo Brunelleschi",
        w1: "Leon Battista Alberti",
        w2: "Donatello",
        exp: "Brunelleschi showed how orthogonal lines converge at a single vanishing point on the horizon line, creating a convincing illusion of 3D depth on a flat surface."
      },
      {
        q: "Which High Renaissance master painted The School of Athens in the Vatican Papal Palace, depicting Plato, Aristotle, and classical philosophers in an ideal hall?",
        correct: "Raphael Sanzio",
        w1: "Leonardo da Vinci",
        w2: "Titian",
        exp: "Raphael incorporated portraits of contemporary Renaissance rivals into ancient philosophers, modeling Plato on Leonardo da Vinci and Heraclitus on Michelangelo."
      },
      {
        q: "Which late Renaissance and Baroque master revolutionized European oil painting with dramatic theatrical contrast between bright light and dark shadows (chiaroscuro)?",
        correct: "Caravaggio",
        w1: "Peter Paul Rubens",
        w2: "Artemisia Gentileschi",
        exp: "Caravaggio used extreme dark backgrounds (tenebrism) and raw realism in works like The Calling of Saint Matthew and The Incredulity of Saint Thomas."
      },
      {
        q: "On the refectory wall of which Dominican convent in Milan did Leonardo da Vinci paint his famous mural The Last Supper between 1495 and 1498?",
        correct: "Santa Maria delle Grazie",
        w1: "Santa Maria Novella",
        w2: "San Francesco d Assisi",
        exp: "Leonardo used experimental tempera on dry gesso rather than true wet buon fresco, creating a luminous masterpiece that began deteriorating during his lifetime."
      }
    ],
    number: {
      q: "In what year did Michelangelo complete and unveil the painted ceiling of the Sistine Chapel in Rome?",
      target: 1512,
      unit: "year",
      imperial: "1512 AD",
      exp: "Pope Julius II held an inaugural Mass under Michelangelo newly completed ceiling on All Saints Day, November 1, 1512."
    }
  },

  // Cycle 8: Fluid Dynamics, Aerodynamics & Bernoulli Principles
  {
    mcqs: [
      {
        q: "Which Swiss mathematician and physicist published Hydrodynamica in 1738, formulating the principle that fluid pressure decreases as flow velocity increases?",
        correct: "Daniel Bernoulli",
        w1: "Leonhard Euler",
        w2: "Blaise Pascal",
        exp: "Bernoulli principle explains pressure differentials that contribute to aerodynamic lift, carburetor fuel intake, and venturi flowmeters."
      },
      {
        q: "What dimensionless quantity in fluid mechanics predicts whether fluid flow will be smooth and laminar or chaotic and turbulent?",
        correct: "Reynolds Number",
        w1: "Froude Number",
        w2: "Mach Number",
        exp: "Named after Osborne Reynolds, it calculates the ratio of inertial forces to viscous forces within a moving fluid."
      },
      {
        q: "Which Austrian physicist and philosopher gave his name to the ratio of an object speed through a fluid medium to the local speed of sound?",
        correct: "Ernst Mach",
        w1: "Ludwig Boltzmann",
        w2: "Christian Doppler",
        exp: "Mach 1 represents local sonic velocity, Mach numbers above one are supersonic, and speeds above Mach 5 are classified as hypersonic."
      },
      {
        q: "What aerodynamic phenomenon causes a moving fluid jet to stay attached to a convex curved surface rather than traveling in a straight line?",
        correct: "Coandă Effect",
        w1: "Magnus Effect",
        w2: "Venturi Effect",
        exp: "Discovered by Romanian aerodynamicist Henri Coandă in 1910, this effect is utilized in lift-enhancing aircraft flaps and high-lift airfoils."
      },
      {
        q: "What physical effect causes a spinning ball or cylinder moving through air to curve away from its initial trajectory due to pressure differences?",
        correct: "Magnus Effect",
        w1: "Coriolis Effect",
        w2: "Doppler Effect",
        exp: "Heinrich Gustav Magnus described how boundary layer friction on the advancing side of a spinning sphere accelerates airflow, generating lateral deflection."
      }
    ],
    number: {
      q: "In what year did Daniel Bernoulli publish his foundational treatise Hydrodynamica in Strasbourg?",
      target: 1738,
      unit: "year",
      imperial: "1738 AD",
      exp: "Daniel Bernoulli formulated conservation of energy for flowing fluids in Hydrodynamica, published in 1738."
    }
  },

  // Cycle 9: Writing Systems, Epigraphy & Historic Scripts
  {
    mcqs: [
      {
        q: "What ancient wedge-shaped script developed in Sumer around 3400 BCE was pressed into wet clay tablets with a reed stylus?",
        correct: "Cuneiform",
        w1: "Hieratic",
        w2: "Demotic",
        exp: "Cuneiform evolved from pictographic accounting tokens into a logo-syllabic script used across Mesopotamia for over three thousand years."
      },
      {
        q: "Which ancient maritime trading civilization developed the first widespread consonantal alphabet (abjad) around 1050 BCE, ancestor to Greek and Latin?",
        correct: "Phoenicians",
        w1: "Minoans",
        w2: "Hittites",
        exp: "The Phoenician alphabet of twenty-two consonants simplified writing by representing phonetic sounds rather than thousands of complex logograms."
      },
      {
        q: "Which Cherokee polymath and silversmith independently created a complete eighty-five-character syllabary for the Cherokee language in 1821?",
        correct: "Sequoyah",
        w1: "Black Hawk",
        w2: "Tecumseh",
        exp: "Sequoyah achievement enabled the Cherokee Nation to achieve over ninety percent literacy within years and publish the bilingual Cherokee Phoenix newspaper."
      },
      {
        q: "What mysterious glyphic writing system etched onto wooden rongo-rongo tablets on Easter Island remains undeciphered by modern linguists?",
        correct: "Rongorongo",
        w1: "Voynich Script",
        w2: "Phaistos Script",
        exp: "Rongorongo tablets use reverse boustrophedon reading order, where lines alternate orientation, requiring the tablet to be rotated 180 degrees every line."
      },
      {
        q: "Which Bronze Age writing system used in the Indus River Valley cities of Mohenjo-daro and Harappa remains undeciphered due to lack of bilingual inscriptions?",
        correct: "Indus Script",
        w1: "Proto-Elamite",
        w2: "Brahmi Script",
        exp: "Found on thousands of small steatite stamp seals, Indus script consists of over four hundred distinct signs with typical inscriptions averaging only five symbols."
      }
    ],
    number: {
      q: "How many total phonetic characters made up the Cherokee syllabary created by Sequoyah in 1821?",
      target: 85,
      unit: "characters",
      imperial: "85 syllabary characters",
      exp: "Sequoyah's Cherokee syllabary consists of 85 distinct characters representing every consonant-vowel syllable in the spoken Cherokee tongue."
    }
  },

  // Cycle 10: Interplanetary Missions, Mars Exploration & Sample Returns
  {
    mcqs: [
      {
        q: "Which robotic NASA spacecraft achieved the first successful Mars soft landing by an American probe on July 20, 1976, returning the first color panoramas?",
        correct: "Viking 1",
        w1: "Mariner 9",
        w2: "Pathfinder",
        exp: "Viking 1 operated on Chryse Planitia for over six years, conducting biological soil tests, atmospheric measurements, and weather tracking."
      },
      {
        q: "Which SUV-sized NASA rover landed inside Gale Crater on Mars in August 2012 using an innovative rocket-powered Sky Crane descent stage?",
        correct: "Curiosity Rover",
        w1: "Opportunity Rover",
        w2: "Spirit Rover",
        exp: "Curiosity discovered mudstones deposited in ancient freshwater lakebeds, confirming Mars had environmental conditions capable of supporting microbial life."
      },
      {
        q: "Which small robotic coaxial helicopter achieved the first powered controlled flight on another planet inside Jezero Crater on Mars in April 2021?",
        correct: "Ingenuity Helicopter",
        w1: "Dragonfly",
        w2: "Sojourner",
        exp: "Ingenuity completed seventy-two successful flights over three years, serving as an aerial scout for the Perseverance rover across Martian terrain."
      },
      {
        q: "Which Japanese robotic spacecraft returned the first subsurface samples from a carbonaceous near-Earth asteroid (Ryugu) to Earth in 2020?",
        correct: "Hayabusa2",
        w1: "OSIRIS-REx",
        w2: "Akatsuki",
        exp: "JAXA Hayabusa2 fired a tantalum impactor into Ryugu to collect pristine subsurface rubble containing amino acids and organic compounds."
      },
      {
        q: "Which European Space Agency mission became the first spacecraft to rendezvous with and orbit a comet (67P/Churyumov-Gerasimenko) in 2014?",
        correct: "Rosetta Mission",
        w1: "Giotto",
        w2: "Stardust",
        exp: "Rosetta deployed the Philae lander onto the comet surface and accompanied the comet through perihelion, analyzing organic gases and ice composition."
      }
    ],
    number: {
      q: "In what year did the Viking 1 lander touch down on the surface of Mars?",
      target: 1976,
      unit: "year",
      imperial: "1976 AD",
      exp: "Viking 1 touched down safely on Mars on July 20, 1976, transmitting the first close-up surface photographs from another planet."
    }
  }
];

// Build Quiz 12
buildQuiz({
  id: 'general-knowledge-vol12-60',
  theme: 'General Knowledge Vol 12: Lost Civilizations, Deep Time & Modern Technology',
  title: 'General Knowledge Vol 12: Lost Civilizations, Deep Time & Modern Technology',
  description: 'A 60-question grand master assessment exploring ancient astronomy, seafloor spreading, Renaissance anatomy, mass extinctions, microprocessors, world deserts, perspective art, fluid mechanics, writing systems, and Mars exploration.',
  category: 'Sports, Records & General Knowledge',
  difficulty: 'moderate'
}, vol12Cycles);

console.log('Vol 12 successfully built!');
