const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// Volume 11: general-knowledge-vol11-60
// Theme: "General Knowledge Vol 11: Earth Dynamics, Ancient Wisdom & Quantum Realms"
// Category: "Sports, Records & General Knowledge"
// =========================================================================
const vol11Cycles = [
  // Cycle 1: Volcanology, Calderas & Supervolcanic Eruptions
  {
    mcqs: [
      {
        q: "Which colossal Indonesian volcanic eruption in April 1815 ejected over 100 cubic kilometers of debris and caused the Year Without a Summer in 1816?",
        correct: "Mount Tambora",
        w1: "Krakatoa",
        w2: "Mount Pinatubo",
        exp: "The Tambora eruption in Sumbawa lowered global temperatures by nearly one degree Celsius, causing widespread crop failures across Europe and North America."
      },
      {
        q: "Which volcanic island between Java and Sumatra exploded cataclysmically in August 1883, producing the loudest sound in recorded human history?",
        correct: "Krakatoa",
        w1: "Mount Merapi",
        w2: "Mount Agung",
        exp: "The Krakatoa explosion was heard nearly 4,800 kilometers away on Rodrigues Island, generating global barometric waves that circled Earth four times."
      },
      {
        q: "What fast-moving, high-density current of incandescent gas, ash, and rock fragments can rush down volcanic slopes at speeds exceeding 400 kilometers per hour?",
        correct: "Pyroclastic Flow",
        w1: "Lahar Mudflow",
        w2: "Tephra Plume",
        exp: "Pyroclastic flows reach temperatures over 800 degrees Celsius, incinerating everything in their path as seen at Pompeii and Herculaneum in 79 CE."
      },
      {
        q: "What is the largest active subaerial shield volcano on Earth by volume, rising over 4,100 meters above sea level in Hawaii?",
        correct: "Mauna Loa",
        w1: "Kilauea",
        w2: "Mount Etna",
        exp: "Mauna Loa constitutes roughly half the landmass of the Island of Hawaii, with gentle basaltic lava slopes fed by a deep mantle plume."
      },
      {
        q: "What volcanic crater feature forms when a volcano magma chamber empties rapidly during an eruption, causing the overlying ground to collapse inward?",
        correct: "Caldera",
        w1: "Crater Pit",
        w2: "Fissure Vent",
        exp: "Calderas can span dozens of kilometers across, forming massive depression basins such as the Yellowstone Caldera and Crater Lake in Oregon."
      }
    ],
    number: {
      q: "In what year did the catastrophic eruption of Mount Tambora in Indonesia take place?",
      target: 1815,
      unit: "year",
      imperial: "1815 AD",
      exp: "Mount Tambora exploded on April 10, 1815, rating a maximum VEI-7 on the Volcanic Explosivity Index."
    }
  },

  // Cycle 2: Ancient Philosophy & Socratic Dialectics
  {
    mcqs: [
      {
        q: "Which pedagogical dialogue method uses cooperative, question-and-answer inquiry to stimulate critical thinking and uncover underlying assumptions?",
        correct: "Socratic Method",
        w1: "Aristotelian Deduction",
        w2: "Scholastic Disputation",
        exp: "Socrates used the elenchus to lead dialogue partners through questions that revealed contradictions in their conventional beliefs."
      },
      {
        q: "Which famous philosophical allegory in Plato Republic describes prisoners chained inside a dark cavern watching shadows projected onto a wall?",
        correct: "Allegory of the Cave",
        w1: "Myth of Er",
        w2: "Ring of Gyges",
        exp: "Plato illustrated the difference between perceived sensory illusions and the higher intelligible realm of immutable philosophical Forms."
      },
      {
        q: "Which ancient Greek philosophical school founded by Zeno of Citium taught that virtue is the only true good and destructive emotions result from errors in judgment?",
        correct: "Stoicism",
        w1: "Epicureanism",
        w2: "Cynicism",
        exp: "Stoics like Seneca, Epictetus, and Marcus Aurelius advocated living in accordance with logos, practicing emotional resilience and duty."
      },
      {
        q: "Which ancient Greek philosopher established the Lyceum in Athens, developed formal categorical logic, and wrote the Nicomachean Ethics?",
        correct: "Aristotle",
        w1: "Plato",
        w2: "Epicurus",
        exp: "Aristotle categorized knowledge across physics, metaphysics, biology, ethics, and politics, introducing the Golden Mean as moral virtue."
      },
      {
        q: "Which Hellenistic philosophy founded by Epicurus taught that the greatest good is attaining tranquility (ataraxia) and absence of bodily pain (aponia)?",
        correct: "Epicureanism",
        w1: "Hedonism",
        w2: "Skepticism",
        exp: "Epicurus advocated living simply among friends, studying natural sciences to free the mind from fear of the gods and death."
      }
    ],
    number: {
      q: "In what year BCE was Greek philosopher Socrates tried and condemned to drink hemlock in Athens?",
      target: 399,
      unit: "BCE",
      imperial: "399 BC",
      exp: "Socrates was convicted by an Athenian jury in 399 BCE on charges of impiety and corrupting the youth."
    }
  },

  // Cycle 3: Optics, Lasers & Wave-Particle Duality
  {
    mcqs: [
      {
        q: "Which American engineer and physicist built the world first operating optical laser in 1960 using a synthetic ruby crystal?",
        correct: "Theodore Maiman",
        w1: "Charles Townes",
        w2: "Arthur Schawlow",
        exp: "Maiman produced coherent red pulses at 694 nanometers at Hughes Research Laboratories, creating the first Light Amplification by Stimulated Emission of Radiation."
      },
      {
        q: "Which English polymath demonstrated the wave nature of light in 1801 with his landmark Double-Slit Experiment showing wave interference fringes?",
        correct: "Thomas Young",
        w1: "Isaac Newton",
        w2: "Christiaan Huygens",
        exp: "Young passed sunlight through two pinholes, producing alternating dark and bright interference bands that challenged Newton corpuscular theory."
      },
      {
        q: "What optical phenomenon allows light signals to travel through flexible glass fiber optic cables over oceans without escaping through the cable walls?",
        correct: "Total Internal Reflection",
        w1: "Optical Dispersion",
        w2: "Brewster Angle Scattering",
        exp: "When light hits the boundary of a higher refractive index glass core at an angle greater than the critical angle, one hundred percent of light reflects back."
      },
      {
        q: "Which German theoretical physicist proposed the quantum hypothesis in 1900, showing that electromagnetic energy is emitted in discrete packets (quanta)?",
        correct: "Max Planck",
        w1: "Albert Einstein",
        w2: "Niels Bohr",
        exp: "Planck solved the blackbody radiation ultraviolet catastrophe by introducing Planck constant h, establishing the foundation of quantum mechanics."
      },
      {
        q: "Which Hong Kong-British physicist was awarded the 2009 Nobel Prize in Physics for pioneering low-loss silica glass fibers for long-distance telecommunications?",
        correct: "Charles K. Kao",
        w1: "Willard Boyle",
        w2: "George Smith",
        exp: "Kao recognized that purifying glass to eliminate iron impurities would enable transoceanic fiber-optic networks, enabling the modern internet."
      }
    ],
    number: {
      q: "In what year did Theodore Maiman successfully demonstrate the first functioning ruby laser?",
      target: 1960,
      unit: "year",
      imperial: "1960 AD",
      exp: "Theodore Maiman successfully operated the first synthetic ruby crystal laser on May 16, 1960."
    }
  },

  // Cycle 4: Ocean Currents, Thermohaline Circulation & Great Gyres
  {
    mcqs: [
      {
        q: "Which powerful warm western boundary Atlantic current originates in the Gulf of Mexico and keeps Western European winters relatively temperate?",
        correct: "Gulf Stream",
        w1: "Canary Current",
        w2: "Labrador Current",
        exp: "Benjamin Franklin published the first scientific chart of the Gulf Stream in 1768, showing mariners how to accelerate westbound mail packets."
      },
      {
        q: "Which massive ocean current flows clockwise from west to east entirely around Antarctica, transporting more water volume than any other current on Earth?",
        correct: "Antarctic Circumpolar Current",
        w1: "Agulhas Current",
        w2: "Humboldt Current",
        exp: "The ACC transports approximately 130 to 140 million cubic meters per second (Sverdrups) through the Drake Passage, connecting all major ocean basins."
      },
      {
        q: "What global deep-ocean conveyor belt circulation is driven by density differences created by surface water cooling and salinity variations?",
        correct: "Thermohaline Circulation",
        w1: "Ekman Transport",
        w2: "Geostrophic Flow",
        exp: "Cold, dense, hypersaline water sinks in the North Atlantic and Antarctic margins, flowing along the ocean floor and taking nearly a thousand years to complete one global loop."
      },
      {
        q: "Which unique oceanic sea in the North Atlantic is the only sea on Earth with no land boundaries, delimited entirely by four circular currents?",
        correct: "Sargasso Sea",
        w1: "Coral Sea",
        w2: "Tasman Sea",
        exp: "The Sargasso Sea is bounded by the Gulf Stream, North Atlantic Current, Canary Current, and North Atlantic Equatorial Current, filled with floating Sargassum seaweed."
      },
      {
        q: "What periodic ocean-atmosphere climate phenomenon in the equatorial Pacific involves abnormal surface water warming, disrupting global weather patterns?",
        correct: "El Niño Southern Oscillation",
        w1: "Indian Ocean Dipole",
        w2: "Madden-Julian Oscillation",
        exp: "During El Niño, weakened trade winds allow warm western Pacific pool water to surge eastward toward South America, shutting down nutrient upwelling."
      }
    ],
    number: {
      q: "How many cubic meters per second of water volume transport is represented by exactly one Sverdrup unit (Sv)?",
      target: 1000000,
      unit: "cubic meters per second",
      imperial: "1 million m³/s",
      exp: "Named after Norwegian oceanographer Harald Sverdrup, one Sverdrup equals exactly one million cubic meters per second of water flow."
    }
  },

  // Cycle 5: Cellular Biology, Mitochondria & Endosymbiosis
  {
    mcqs: [
      {
        q: "Which American evolutionary biologist proposed the Endosymbiotic Theory, proving mitochondria and chloroplasts originated as engulfed symbiotic prokaryotes?",
        correct: "Lynn Margulis",
        w1: "Barbara McClintock",
        w2: "Rosalind Franklin",
        exp: "Margulis demonstrated that mitochondria possess their own circular DNA, double membranes, and bacterial ribosomes, confirming their alphaproteobacterial ancestry."
      },
      {
        q: "What membrane-bound enzyme acts as a rotary molecular motor to synthesize ATP from ADP using a transmembrane proton gradient during cellular respiration?",
        correct: "ATP Synthase",
        w1: "Cytochrome c Oxidase",
        w2: "DNA Polymerase",
        exp: "ATP synthase mechanical rotor spins at hundreds of revolutions per second as protons flow through its inner mitochondrial membrane channel."
      },
      {
        q: "Which revolutionary gene-editing technology discovered by Jennifer Doudna and Emmanuelle Charpentier utilizes bacterial adaptive immune mechanisms to alter DNA?",
        correct: "CRISPR-Cas9",
        w1: "TALENs",
        w2: "Zinc Finger Nucleases",
        exp: "CRISPR-Cas9 uses a programmable guide RNA to locate and cut specific target DNA sequences with high precision, earning the 2020 Nobel Prize in Chemistry."
      },
      {
        q: "What cellular organelle composed of ribosomal RNA and proteins translates messenger RNA sequences into polypeptide amino acid chains?",
        correct: "Ribosome",
        w1: "Endoplasmic Reticulum",
        w2: "Golgi Apparatus",
        exp: "Ribosomes read mRNA codons in triplets and coordinate transfer RNA (tRNA) anticodons to assemble functional protein structures."
      },
      {
        q: "What repetitive DNA sequences caps the ends of linear eukaryotic chromosomes to prevent genomic degradation during cell division?",
        correct: "Telomeres",
        w1: "Centromeres",
        w2: "Histones",
        exp: "Elizabeth Blackburn, Carol Greider, and Jack Szostak won the 2009 Nobel Prize for showing how the enzyme telomerase maintains telomere length."
      }
    ],
    number: {
      q: "In what year did Jennifer Doudna and Emmanuelle Charpentier publish their landmark paper establishing CRISPR-Cas9 as a programmable genome-editing tool?",
      target: 2012,
      unit: "year",
      imperial: "2012 AD",
      exp: "Their breakthrough paper was published in Science in June 2012, revolutionizing biotechnology and modern molecular genetics."
    }
  },

  // Cycle 6: Medieval Inventions & Clockwork Horology
  {
    mcqs: [
      {
        q: "Which German craftsman introduced movable metal type printing and the mechanical printing press to Europe around 1440 in Mainz?",
        correct: "Johannes Gutenberg",
        w1: "Peter Schöffer",
        w2: "Johann Fust",
        exp: "Gutenberg developed oil-based ink, a durable lead-tin-antimony alloy, and an adjustable handheld type mold that catalyzed the European Renaissance."
      },
      {
        q: "What mechanical escapement mechanism invented in 13th-century Europe allowed mechanical clocks to keep regular time using a ticking balance wheel?",
        correct: "Verge and Foliot",
        w1: "Anchor Escapement",
        w2: "Deadbeat Escapement",
        exp: "The verge escapement converted continuous falling weight torque into periodic oscillations, powering cathedral clock towers across medieval Europe."
      },
      {
        q: "In which European region were wearable convex glass eyeglasses for correcting presbyopia (farsightedness) first invented in the late 13th century?",
        correct: "Northern Italy",
        w1: "Flanders",
        w2: "Bavaria",
        exp: "Murano glassmakers in Venice and Pisa ground biconvex glass lenses set into leather and bone frames, dramatically extending scholarly working lifespans."
      },
      {
        q: "Which navigational instrument, incorporating a magnetized needle suspended in oil or on a pivot over a compass rose, revolutionized maritime navigation?",
        correct: "Mariner Magnetic Compass",
        w1: "Sextant",
        w2: "Octant",
        exp: "Adopted in the Mediterranean during the 13th century, the dry card magnetic compass enabled round-the-year open-sea sailing regardless of cloud cover."
      },
      {
        q: "What water-lifting device developed in ancient and medieval irrigation used a large vertical wheel with attached pots driven by river currents?",
        correct: "Noria",
        w1: "Archimedes Screw",
        w2: "Shadoof",
        exp: "Giant norias, such as the famous waterwheels in Hama, Syria, raised river water over twenty meters into municipal aqueducts without human or animal labor."
      }
    ],
    number: {
      q: "In what year did Johannes Gutenberg complete the printing of his monumental 42-Line Latin Bible in Mainz?",
      target: 1455,
      unit: "year",
      imperial: "1455 AD",
      exp: "Gutenberg completed approximately 180 copies of the Latin Vulgate Bible on paper and vellum in 1455, sparking the print revolution."
    }
  },

  // Cycle 7: Polar Exploration & Heroic Age Expeditions
  {
    mcqs: [
      {
        q: "Which Norwegian polar explorer led the five-man expedition that became the first to successfully reach the geographic South Pole in December 1911?",
        correct: "Roald Amundsen",
        w1: "Robert Falcon Scott",
        w2: "Ernest Shackleton",
        exp: "Amundsen utilized expert ski techniques and Greenland sled dogs, reaching the South Pole thirty-four days ahead of the British expedition."
      },
      {
        q: "Which British explorer reached the South Pole in January 1912 only to find Amundsen tent, tragically perishing with his team on the return trek?",
        correct: "Robert Falcon Scott",
        w1: "Frank Wild",
        w2: "Edward Wilson",
        exp: "Captain Scott Terra Nova expedition encountered unseasonably severe blizzards and starvation on the Ross Ice Shelf just eleven miles from One Ton Depot."
      },
      {
        q: "Which Anglo-Irish explorer saved all twenty-seven crew members after their ship Endurance was crushed by Antarctic pack ice in the Weddell Sea in 1915?",
        correct: "Ernest Shackleton",
        w1: "Douglas Mawson",
        w2: "Apsley Cherry-Garrard",
        exp: "Shackleton completed an epic 1,300-kilometer open lifeboat voyage in the James Caird across the stormy Southern Ocean to South Georgia Island."
      },
      {
        q: "Which Norwegian scientist deliberately froze his specially designed round-hulled ship Fram into Arctic pack ice in 1893 to drift across the North Pole?",
        correct: "Fridtjof Nansen",
        w1: "Otto Sverdrup",
        w2: "Willem Barentsz",
        exp: "Nansen proved the existence of the east-west polar drift current and later received the 1922 Nobel Peace Prize for his humanitarian Nansen passport system."
      },
      {
        q: "What famous maritime sea lane connecting the Atlantic and Pacific Oceans through the Canadian Arctic Archipelago was first navigated by Roald Amundsen in 1906?",
        correct: "Northwest Passage",
        w1: "Northeast Passage",
        w2: "Northern Sea Route",
        exp: "Amundsen spent three years navigating the shallow waters of the Arctic archipelago aboard the 47-ton converted herring sloop Gjøa."
      }
    ],
    number: {
      q: "In what year did Roald Amundsen and his Norwegian team plant their flag at the South Pole?",
      target: 1911,
      unit: "year",
      imperial: "1911 AD",
      exp: "Roald Amundsen, Olav Bjaaland, Helmer Hanssen, Sverre Hassel, and Oscar Wisting reached the South Pole on December 14, 1911."
    }
  },

  // Cycle 8: Cosmology, Cosmic Microwave Background & Big Bang
  {
    mcqs: [
      {
        q: "Which two Bell Labs radio astronomers accidentally discovered the Cosmic Microwave Background (CMB) radiation in 1965 using the Holmdel Horn Antenna?",
        correct: "Arno Penzias and Robert Wilson",
        w1: "Edwin Hubble and Milton Humason",
        w2: "George Gamow and Ralph Alpher",
        exp: "Penzias and Wilson detected an isotropic microwave hiss coming from every direction in the sky, proving the thermal afterglow of the Big Bang."
      },
      {
        q: "Which Belgian Catholic priest and theoretical physicist first proposed the expansion of the universe and the Primeval Atom hypothesis in 1927?",
        correct: "Georges Lemaître",
        w1: "Alexander Friedmann",
        w2: "Willem de Sitter",
        exp: "Lemaître derived what is now called the Hubble-Lemaître Law two years before Hubble published empirical observational confirmation in 1929."
      },
      {
        q: "What cosmological theory proposed by Alan Guth in 1980 posits that the universe underwent an exponential expansion in the first fraction of a second?",
        correct: "Cosmic Inflation",
        w1: "Steady State Theory",
        w2: "Cyclic Universe Model",
        exp: "Inflation explains why the universe appears geometrically flat, homogeneous, and isotropic across regions that could never have exchanged causal thermal signals."
      },
      {
        q: "What mysterious repulsive component of the universe, discovered in 1998 via Type Ia supernovae, is driving the accelerating expansion of spacetime?",
        correct: "Dark Energy",
        w1: "Dark Matter",
        w2: "Baryonic Matter",
        exp: "Saul Perlmutter, Brian Schmidt, and Adam Riess won the 2011 Nobel Prize for demonstrating that dark energy constitutes roughly sixty-eight percent of universal mass-energy."
      },
      {
        q: "What fundamental relationship established by Edwin Hubble in 1929 shows that galaxies are receding from Earth at velocities proportional to their distance?",
        correct: "Hubble Law",
        w1: "Kepler Third Law",
        w2: "Stefan-Boltzmann Law",
        exp: "Hubble measured cosmological redshift in distant galaxy spectra using the 100-inch Hooker Telescope on Mount Wilson, confirming an expanding universe."
      }
    ],
    number: {
      q: "In what year did Arno Penzias and Robert Wilson detect the Cosmic Microwave Background radiation at Bell Labs?",
      target: 1965,
      unit: "year",
      imperial: "1965 AD",
      exp: "Penzias and Wilson published their discovery in 1965 alongside a companion theoretical interpretation by Robert Dicke and Jim Peebles."
    }
  },

  // Cycle 9: World River Basins & Hydrological Wonders
  {
    mcqs: [
      {
        q: "In which Sudanese capital city do the White Nile and Blue Nile rivers unite to form the main Nile River that flows northward through Egypt?",
        correct: "Khartoum",
        w1: "Cairo",
        w2: "Addis Ababa",
        exp: "The Blue Nile brings nutrient-rich volcanic silt from the Ethiopian highlands, meeting the steady equatorial waters of the White Nile at Khartoum."
      },
      {
        q: "Which Central African river is recognized as the deepest river on Earth, reaching measured depths exceeding 220 meters in its lower gorges?",
        correct: "Congo River",
        w1: "Zambezi River",
        w2: "Niger River",
        exp: "The Congo River is second only to the Amazon in discharge volume, cutting deep canyons through the crystal bedrock of the Mayombe mountains."
      },
      {
        q: "What world-famous waterfall on the Zambezi River between Zambia and Zimbabwe is known locally in the Lozi language as Mosi-oa-Tunya (The Smoke That Thunders)?",
        correct: "Victoria Falls",
        w1: "Iguazu Falls",
        w2: "Niagara Falls",
        exp: "Victoria Falls forms the largest sheet of falling water in the world, spanning 1,708 meters across and plunging 108 meters into a basalt gorge."
      },
      {
        q: "What is the highest uninterrupted waterfall on Earth, plunging 979 meters from the top of the Auyán-tepui plateau in Venezuela?",
        correct: "Angel Falls",
        w1: "Tugela Falls",
        w2: "Yosemite Falls",
        exp: "Named after American aviator Jimmie Angel, the waterfall drop is so immense that water vaporizes into fine mist before reaching the Churun River basin below."
      },
      {
        q: "Which ancient rift lake in Siberia contains approximately twenty percent of the world unfrozen surface freshwater, reaching a depth of 1,642 meters?",
        correct: "Lake Baikal",
        w1: "Lake Tanganyika",
        w2: "Lake Superior",
        exp: "Lake Baikal is the world oldest and deepest lake, hosting over 1,500 endemic species including the nerpa freshwater seal."
      }
    ],
    number: {
      q: "What is the total height in meters of Angel Falls in Venezuela, the tallest waterfall on Earth?",
      target: 979,
      unit: "meters",
      imperial: "3,212 feet",
      exp: "Angel Falls drops 979 meters from the edge of the Auyán-tepui mountain, with an uninterrupted plunge of 807 meters."
    }
  },

  // Cycle 10: Classical Music, Symphonies & Opera Pioneers
  {
    mcqs: [
      {
        q: "Which German composer premiered his groundbreaking Ninth Symphony in Vienna in 1824, setting Friedrich Schiller poem Ode to Joy to music while completely deaf?",
        correct: "Ludwig van Beethoven",
        w1: "Johannes Brahms",
        w2: "Wolfgang Amadeus Mozart",
        exp: "Beethoven Ninth Symphony introduced vocal soloists and chorus into a major orchestral symphony for the first time in classical music history."
      },
      {
        q: "Which Austrian musical prodigy composed over 600 masterworks before dying at age 35, leaving his famous Requiem Mass in D minor unfinished in 1791?",
        correct: "Wolfgang Amadeus Mozart",
        w1: "Franz Schubert",
        w2: "Joseph Haydn",
        exp: "Mozart composed operas like The Marriage of Figaro and Don Giovanni, with his student Franz Xaver Süssmayr completing the Requiem score after his death."
      },
      {
        q: "Which German Baroque master composed the monumental Goldberg Variations, Brandenburg Concertos, and The Well-Tempered Clavier?",
        correct: "Johann Sebastian Bach",
        w1: "George Frideric Handel",
        w2: "Georg Philipp Telemann",
        exp: "Bach mastered complex polyphony and counterpoint in Leipzig, creating foundational harmonic treatises that influenced all subsequent Western music."
      },
      {
        q: "Which Venetian Baroque composer nicknamed The Red Priest composed the famous set of four violin concertos titled The Four Seasons in 1723?",
        correct: "Antonio Vivaldi",
        w1: "Claudio Monteverdi",
        w2: "Arcangelo Corelli",
        exp: "Vivaldi scored musical sonnets representing singing birds in Spring, summer heat, hunting horns in Autumn, and icy winds in Winter."
      },
      {
        q: "Which 19th-century Italian operatic giant composed iconic masterpieces including Nabucco, Rigoletto, Il Trovatore, La Traviata, and Aida?",
        correct: "Giuseppe Verdi",
        w1: "Giacomo Puccini",
        w2: "Gioachino Rossini",
        exp: "Verdi was a towering cultural figure whose name became an acronym for Italian unification: Vittorio Emanuele Re D'Italia (V.E.R.D.I.)."
      }
    ],
    number: {
      q: "How many full numbered orchestral symphonies did Ludwig van Beethoven complete during his lifetime?",
      target: 9,
      unit: "symphonies",
      imperial: "9 symphonies",
      exp: "Beethoven completed exactly nine numbered symphonies, transforming the genre from Classical form into Romantic grandeur."
    }
  }
];

// Build Quiz 11
buildQuiz({
  id: 'general-knowledge-vol11-60',
  theme: 'General Knowledge Vol 11: Earth Dynamics, Ancient Wisdom & Quantum Realms',
  title: 'General Knowledge Vol 11: Earth Dynamics, Ancient Wisdom & Quantum Realms',
  description: 'A 60-question grand master assessment exploring volcanology, ancient philosophy, optics, ocean gyres, cellular biology, medieval inventions, polar expeditions, cosmic microwave radiation, river wonders, and classical symphonies.',
  category: 'Sports, Records & General Knowledge',
  difficulty: 'moderate'
}, vol11Cycles);

console.log('Vol 11 successfully built!');
