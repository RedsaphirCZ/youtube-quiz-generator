const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// Volume 14: general-knowledge-vol14-60
// Theme: "General Knowledge Vol 14: Deep Earth Secrets, Cosmic Mysteries & Master Inventions"
// Category: "Sports, Records & General Knowledge"
// =========================================================================
const vol14Cycles = [
  // Cycle 1: Pulsars, Neutron Stars & Cosmic Clocks
  {
    mcqs: [
      {
        q: "Which Northern Irish astrophysicist discovered the first radio pulsar (LGM-1) in 1967 as a graduate student at Cambridge using a radio telescope array?",
        correct: "Jocelyn Bell Burnell",
        w1: "Vera Rubin",
        w2: "Margaret Burbidge",
        exp: "Bell Burnell identified rapid, ultra-precise periodic radio pulses every 1.33 seconds, originating from a rapidly spinning magnetized neutron star."
      },
      {
        q: "What maximum mass limit, calculated by Subrahmanyan Chandrasekhar as approximately 1.4 solar masses, prevents a white dwarf from collapsing into a neutron star?",
        correct: "Chandrasekhar Limit",
        w1: "Tolman-Oppenheimer-Volkoff Limit",
        w2: "Eddington Limit",
        exp: "Above 1.4 solar masses, electron degeneracy pressure fails to overcome gravity, triggering a Type Ia supernova or core-collapse neutron star formation."
      },
      {
        q: "What type of extreme neutron star possesses an ultra-intense magnetic field exceeding one hundred billion teslas, capable of producing massive gamma-ray flares?",
        correct: "Magnetar",
        w1: "Quark Star",
        w2: "Microquasar",
        exp: "Magnetar starquakes crack the crust of the neutron star, releasing catastrophic bursts of soft gamma repeaters and X-ray radiation across the galaxy."
      },
      {
        q: "Which iconic supernova remnant in Taurus, recorded by Chinese and Arab astronomers in 1054 CE, harbors a pulsating neutron star spinning thirty times per second?",
        correct: "Crab Nebula",
        w1: "Veil Nebula",
        w2: "Cassiopeia A",
        exp: "The Crab Pulsar emits synchronized pulses across the electromagnetic spectrum from radio to high-energy gamma rays, powering the surrounding nebula."
      },
      {
        q: "Which laser interferometer observatory made the historic first direct detection of gravitational waves in September 2015 from colliding black holes?",
        correct: "LIGO",
        w1: "VIRGO",
        w2: "KAGRA",
        exp: "LIGO detected space-time ripples stretching and compressing four-kilometer laser arms by less than one-ten-thousandth the diameter of a proton."
      }
    ],
    number: {
      q: "What is the approximate maximum mass in solar masses defined by the Chandrasekhar Limit for a stable white dwarf?",
      target: 1.4,
      unit: "solar masses",
      imperial: "1.4 Solar Masses",
      exp: "Calculated by 19-year-old Subrahmanyan Chandrasekhar in 1930, the maximum limit is approximately 1.44 times the mass of the Sun."
    }
  },

  // Cycle 2: Medieval Castle Architecture & Siege Warfare
  {
    mcqs: [
      {
        q: "What sophisticated castle layout features multiple concentric rings of curtain walls, where the inner wall is higher than the outer wall to allow layered archery?",
        correct: "Concentric Castle",
        w1: "Motte-and-Bailey",
        w2: "Keep Castle",
        exp: "Pioneered in Crusader fortresses like Krak des Chevaliers and King Edward I Welsh castles like Beaumaris and Caerphilly, concentric rings eliminated single weak points."
      },
      {
        q: "Which gravity-powered medieval siege engine used a massive counterweight to hurl 100-kilogram boulders over hundreds of meters against fortress walls?",
        correct: "Counterweight Trebuchet",
        w1: "Mangonel",
        w2: "Ballista",
        exp: "Emerging in the 12th century, trebuchets like Edward I Warwolf could demolish thick stone curtain walls with devastating kinetic energy."
      },
      {
        q: "What architectural floor openings in projecting parapets allowed castle defenders to drop stones, boiling liquids, and projectiles directly onto attackers below?",
        correct: "Machicolations",
        w1: "Arrow Slits",
        w2: "Embrasures",
        exp: "Machicolations were cantilevered stone galleries supported by corbels atop towers and gatehouses, protecting vulnerable blind spots at the base of walls."
      },
      {
        q: "What heavy latticed wooden or iron sliding grille was lowered vertically down stone grooves to seal the main gateway of a medieval castle fortress?",
        correct: "Portcullis",
        w1: "Drawbridge",
        w2: "Barbican",
        exp: "Portcullises were winched from murder-hole chambers above gatehouses, frequently used in pairs to trap attacking soldiers in a fortified killing zone."
      },
      {
        q: "What narrow vertical openings in castle stone walls allowed archers and crossbowmen to shoot outward while presenting minimal target area to enemy return fire?",
        correct: "Arrowslits Loops",
        w1: "Merlons",
        w2: "Crenels",
        exp: "Cross-shaped arrow slits allowed archers to adjust horizontal and vertical firing angles while remaining shielded behind thick stone masonry."
      }
    ],
    number: {
      q: "In what century CE did the revolutionary counterweight trebuchet first appear in European and Mediterranean siege warfare?",
      target: 12,
      unit: "century CE",
      imperial: "12th Century AD (1100s)",
      exp: "Counterweight trebuchets emerged in the late 12th century in both Mediterranean Christian and Islamic siege armies, replacing traction trebuchets."
    }
  },

  // Cycle 3: Thermodynamics, Heat Engines & Carnot Cycle
  {
    mcqs: [
      {
        q: "Which French military engineer published Réflexions sur la puissance motrice du feu in 1824, establishing the theoretical maximum efficiency for heat engines?",
        correct: "Nicolas Léonard Sadi Carnot",
        w1: "Rudolf Clausius",
        w2: "Lord Kelvin",
        exp: "Carnot proved that the maximum thermal efficiency of any heat engine depends strictly on the temperature difference between its hot and cold reservoirs."
      },
      {
        q: "Which German physicist and mathematician formulated the Second Law of Thermodynamics in 1850 and introduced the fundamental concept of Entropy in 1865?",
        correct: "Rudolf Clausius",
        w1: "Ludwig Boltzmann",
        w2: "James Clerk Maxwell",
        exp: "Clausius established that heat cannot spontaneously flow from a colder to a hotter body, and that the entropy of an isolated system always increases over time."
      },
      {
        q: "Which Scottish inventor patented the separate steam condenser in 1769, dramatically improving steam engine efficiency and driving the Industrial Revolution?",
        correct: "James Watt",
        w1: "Thomas Newcomen",
        w2: "Richard Trevithick",
        exp: "Watt prevented the main cylinder from repeatedly heating and cooling, reducing coal consumption by seventy-five percent compared to Newcomen atmospheric engines."
      },
      {
        q: "Which fundamental law of thermodynamics states that if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other?",
        correct: "Zeroth Law of Thermodynamics",
        w1: "First Law of Thermodynamics",
        w2: "Third Law of Thermodynamics",
        exp: "Formulated by Ralph H. Fowler in 1935, the Zeroth Law provides the rigorous logical basis for defining and measuring temperature using thermometers."
      },
      {
        q: "What thermodynamic measure of unavailable thermal energy and molecular disorder reaches zero in a perfect crystal at absolute zero according to the Third Law?",
        correct: "Entropy",
        w1: "Enthalpy",
        w2: "Gibbs Free Energy",
        exp: "Walther Nernst formulated the Third Law (Heat Theorem) in 1906, showing that system entropy approaches a minimum constant value as temperature reaches zero kelvins."
      }
    ],
    number: {
      q: "In what year did Sadi Carnot publish his foundational treatise on heat engines and thermal efficiency in Paris?",
      target: 1824,
      unit: "year",
      imperial: "1824 AD",
      exp: "Sadi Carnot published his single masterwork in 1824 at age twenty-seven, founding the modern science of thermodynamics."
    }
  },

  // Cycle 4: Deep Earth Mantle, Kimberlites & Diamonds
  {
    mcqs: [
      {
        q: "What deep volcanic rock pipes formed by violent supersonic gas eruptions transport natural diamonds from the upper mantle up to Earth surface?",
        correct: "Kimberlite Pipes",
        w1: "Basalt Columns",
        w2: "Pegmatite Veins",
        exp: "Named after Kimberley in South Africa, kimberlite magma originates from depths exceeding 150 kilometers, ascending rapidly before diamonds can convert to graphite."
      },
      {
        q: "What is the minimum depth in kilometers within Earth upper mantle where extreme pressure and temperature crystallize carbon into diamond?",
        correct: "150 Kilometers",
        w1: "50 Kilometers",
        w2: "300 Kilometers",
        exp: "Natural diamonds form in the diamond stability zone at depths of 150 to 250 kilometers under pressures exceeding 45,000 atmospheres and temperatures above 1,000°C."
      },
      {
        q: "What ductile, semi-fluid upper layer of the mantle immediately beneath the lithosphere facilitates tectonic plate movement through mantle convection?",
        correct: "Asthenosphere",
        w1: "Lithosphere",
        w2: "Mesosphere",
        exp: "The asthenosphere extends from roughly 100 to 410 kilometers below the surface, consisting of solid peridotite that deforms plastically under high shear stress."
      },
      {
        q: "What localized upwellings of abnormally hot mantle material rise from the core-mantle boundary to create volcanic chains like Hawaii and Iceland?",
        correct: "Mantle Plumes Hotspots",
        w1: "Subduction Slabs",
        w2: "Mid-Ocean Rifts",
        exp: "Geophysicist J. Tuzo Wilson proposed the hotspot theory in 1963 to explain why volcanic island chains form in the interior of moving oceanic plates."
      },
      {
        q: "What seismic boundary layer roughly 200 kilometers thick sits at the base of the lower mantle immediately above Earth molten outer core?",
        correct: "D Double Prime Layer",
        w1: "Gutenberg Boundary",
        w2: "Lehmann Layer",
        exp: "The D'' layer is characterized by extreme thermal gradients, subducted slab graveyards, and ultra-low velocity zones that feed mantle plume generation."
      }
    ],
    number: {
      q: "What is the minimum depth in kilometers inside Earth mantle where natural diamonds crystallize under extreme pressure?",
      target: 150,
      unit: "kilometers",
      imperial: "93 miles deep",
      exp: "Carbon atoms crystallize into the tetrahedral diamond lattice in the mantle stability field starting at roughly 150 kilometers depth."
    }
  },

  // Cycle 5: Global Circumpolar Winds, Jet Streams & Atmospheric Dynamics
  {
    mcqs: [
      {
        q: "What fast-flowing, narrow meandering air currents flow from west to east near the tropopause at altitudes of 9 to 16 kilometers?",
        correct: "Jet Streams",
        w1: "Trade Winds",
        w2: "Katabatic Winds",
        exp: "Driven by temperature contrasts between polar and tropical air masses, polar and subtropical jet streams can reach wind speeds exceeding 400 kilometers per hour."
      },
      {
        q: "What apparent force caused by Earth rotation deflects moving air and ocean currents to the right in the Northern Hemisphere and left in the Southern Hemisphere?",
        correct: "Coriolis Effect",
        w1: "Centrifugal Force",
        w2: "Pressure Gradient Force",
        exp: "Described mathematically by Gustave-Gaspard Coriolis in 1835, this inertial force dictates the counterclockwise rotation of northern hurricanes and clockwise rotation of southern cyclones."
      },
      {
        q: "What nautical term designates the stormy, strong westerly winds found in the Southern Hemisphere between latitudes 40 degrees and 50 degrees South?",
        correct: "The Roaring Forties",
        w1: "The Furious Fifties",
        w2: "The Screaming Sixties",
        exp: "With few landmasses in the southern oceans to break their momentum, these circumpolar winds provided rapid passage for clipper ships sailing the Brouwer Route."
      },
      {
        q: "What calm, low-pressure circular area sits at the center of a mature tropical cyclone, surrounded by the towering wall of intense thunderstorm eyewalls?",
        correct: "Eye of the Storm",
        w1: "Eyewall Vortex",
        w2: "Feeder Band",
        exp: "Inside the cyclone eye, descending dry air suppresses cloud formation, creating calm winds, clear skies, and lowest barometric pressures."
      },
      {
        q: "What type of intense, blinding dust storm is kicked up along the leading edge of a thunderstorm downdraft in arid regions like the Sahara and Arizona?",
        correct: "Haboob",
        w1: "Sirocco",
        w2: "Harmattan",
        exp: "Haboobs form towering walls of swirling sediment reaching thousands of meters into the atmosphere as rain-cooled cold air surges across desert ground."
      }
    ],
    number: {
      q: "What latitude degree south marks the northern boundary of the famous Roaring Forties westerly gale winds?",
      target: 40,
      unit: "degrees South",
      imperial: "40°S latitude",
      exp: "The Roaring Forties blow steadily across the open southern oceans between 40 degrees and 50 degrees South latitude."
    }
  },

  // Cycle 6: Ancient Greek Mathematics & Geometric Proofs
  {
    mcqs: [
      {
        q: "Which Greek mathematician wrote the Elements in Alexandria around 300 BCE, compiling thirteen books of axiomatic geometry and number theory?",
        correct: "Euclid of Alexandria",
        w1: "Apollonius of Perga",
        w2: "Pythagoras of Samos",
        exp: "Euclid deduced hundreds of geometric theorems from five foundational postulates, creating the most influential textbook in mathematical history."
      },
      {
        q: "Which Greek scholar calculated the circumference of Earth with remarkable accuracy in 240 BCE by comparing solar shadow angles in Alexandria and Syene?",
        correct: "Eratosthenes of Cyrene",
        w1: "Aristarchus",
        w2: "Claudius Ptolemy",
        exp: "Eratosthenes noted that at the summer solstice, the Sun shone directly down a well in Syene while casting a 7.2-degree shadow in Alexandria, calculating Earth circumference as 252,000 stadia."
      },
      {
        q: "Which Syracusan mathematician discovered the law of buoyancy while in a public bath, shouting 'Eureka!' as he realized water displacement measures volume?",
        correct: "Archimedes of Syracuse",
        w1: "Hero of Alexandria",
        w2: "Democritus",
        exp: "Archimedes principle states that the upward buoyant force on an immersed body equals the weight of the displaced fluid, solving King Hiero crown purity test."
      },
      {
        q: "Which ancient geometric theorem states that in any right-angled triangle, the area of the square on the hypotenuse equals the sum of the squares on the other two sides?",
        correct: "Pythagorean Theorem",
        w1: "Thales Theorem",
        w2: "Pappus Theorem",
        exp: "Known algebraically as a squared plus b squared equals c squared, this fundamental geometric relation was known in Mesopotamia and India before Pythagoras."
      },
      {
        q: "Which ancient rotating machine invented by Archimedes lifts water efficiently along a revolving helical screw enclosed within a cylinder?",
        correct: "Archimedes Screw",
        w1: "Ctesibius Pump",
        w2: "Hydraulic Ram",
        exp: "The screw pump continues to be used worldwide in wastewater treatment plants, drainage irrigation, and storm water flood management."
      }
    ],
    number: {
      q: "Approximately how many thousand kilometers is the equatorial circumference of Earth, matching the close calculation made by Eratosthenes in 240 BCE?",
      target: 40,
      unit: "thousand kilometers",
      imperial: "24,901 miles (40,075 km)",
      exp: "Earth's actual equatorial circumference is 40,075 kilometers, remarkably close to Eratosthenes' estimate of ~40,000 km."
    }
  },

  // Cycle 7: Deep Sea Cephalopods & Marine Mollusks
  {
    mcqs: [
      {
        q: "Which ancient cephalopod genus retains an external coiled multi-chambered shell, adjusting gas and liquid in its phragmocone chambers to control buoyancy?",
        correct: "Chambered Nautilus",
        w1: "Ammonite",
        w2: "Spirula",
        exp: "Nautiluses have survived for 500 million years, utilizing a thin siphuncle tube to pump fluid out of older shell chambers, leaving buoyant nitrogen gas."
      },
      {
        q: "Which small venomous octopus native to Indo-Pacific tide pools carries enough lethal tetrodotoxin in its saliva to paralyze twenty-six adult humans?",
        correct: "Blue-Ringed Octopus",
        w1: "Mimic Octopus",
        w2: "Flamboyant Cuttlefish",
        exp: "When threatened, Hapalochlaena flashes iridescent blue rings produced by structural iridophores to warn predators of its deadly neurotoxin."
      },
      {
        q: "What specialized pigment-filled cells in cuttlefish and octopus skin expand and contract under neuromuscular control to produce instantaneous color change?",
        correct: "Chromatophores",
        w1: "Iridophores",
        w2: "Photophores",
        exp: "Surrounded by radial muscle fibers controlled directly by the central nervous system, chromatophores allow cephalopods to mimic textured coral and sand within milliseconds."
      },
      {
        q: "What is the largest living species of bivalve mollusk on Earth, growing over 1.2 meters across and weighing up to 200 kilograms on Indo-Pacific coral reefs?",
        correct: "Giant Clam Tridacna gigas",
        w1: "Geoduck Clam",
        w2: "Atlantic Ocean Quahog",
        exp: "Giant clams host millions of symbiotic zooxanthellae dinoflagellates in their colorful fleshy mantles, deriving most of their nutrition from photosynthetic sunlight."
      },
      {
        q: "Which deep-sea octopus named after a Disney flying elephant possesses ear-like fins protruding from its mantle to glide gracefully along the abyssal seafloor?",
        correct: "Dumbo Octopus Grimpoteuthis",
        w1: "Glass Octopus",
        w2: "Blanket Octopus",
        exp: "Dumbo octopuses live at extreme depths from 3,000 to 7,000 meters, swallowing polychaete worms and crustaceans whole without radular chewing."
      }
    ],
    number: {
      q: "What is the maximum recorded weight in kilograms reached by large adult specimens of the Giant Clam (Tridacna gigas)?",
      target: 200,
      unit: "kilograms",
      imperial: "440 pounds",
      exp: "Giant clams can exceed 120 centimeters in shell length and weigh over 200 kilograms (440 lbs) on shallow tropical coral reefs."
    }
  },

  // Cycle 8: Renaissance Print Culture, Aldus Manutius & Typography
  {
    mcqs: [
      {
        q: "Which Venetian printer and humanist publisher invented the portable pocket book format (octavo) and introduced italic typeface in 1501?",
        correct: "Aldus Manutius",
        w1: "Nicolas Jenson",
        w2: "William Caxton",
        exp: "Manutius established the Aldine Press in Venice, editing pristine Greek and Latin classics in pocket-sized editions that democratized scholarly reading."
      },
      {
        q: "Which English merchant introduced the printing press into England in 1476, establishing his press at Westminster and printing Chaucer Canterbury Tales?",
        correct: "William Caxton",
        w1: "Wynkyn de Worde",
        w2: "John Day",
        exp: "Caxton translated and printed over one hundred titles, standardizing the London English dialect as the standard literary form across the British Isles."
      },
      {
        q: "What term designates books and broadsheets printed in Europe using movable type prior to January 1, 1501, during the infancy of printing?",
        correct: "Incunabula",
        w1: "Folios",
        w2: "Palimpsests",
        exp: "Derived from the Latin for cradle or swaddling clothes, approximately thirty thousand distinct incunabula editions have survived to the modern era."
      },
      {
        q: "Which French punchcutter and printer developed the elegant roman typeface in Venice in 1470 that became the basis for modern Western typographic letterforms?",
        correct: "Nicolas Jenson",
        w1: "Claude Garamond",
        w2: "Giambattista Bodoni",
        exp: "Jenson combined the legibility of humanistic minuscules with Roman monumental capitals, creating a harmonious typeface praised for its visual clarity."
      },
      {
        q: "What typographic feature describes the small decorative projections or finishing strokes attached to the ends of letter strokes in traditional typefaces?",
        correct: "Serifs",
        w1: "Ascenders",
        w2: "Ligatures",
        exp: "Serif typefaces like Times New Roman and Garamond aid reading flow on printed pages, contrasting with modern sans-serif typefaces like Helvetica."
      }
    ],
    number: {
      q: "What cutoff year marks the boundary for defining early printed European books known as Incunabula?",
      target: 1501,
      unit: "year",
      imperial: "1501 AD",
      exp: "By bibliographic convention, any book, pamphlet, or broadside printed in Europe before January 1, 1501, is classified as an incunabulum."
    }
  },

  // Cycle 9: Evolution of the Atmosphere, Great Oxidation & Ozone
  {
    mcqs: [
      {
        q: "What catastrophic event roughly 2.4 billion years ago saw biological oxygen accumulation in Earth atmosphere due to early photosynthetic cyanobacteria?",
        correct: "Great Oxidation Event",
        w1: "Cambrian Radiation",
        w2: "Huronian Glaciation",
        exp: "Cyanobacteria produced oxygen that precipitated vast iron oceans into banded iron formations before venting into the atmosphere, causing mass extinction of anaerobic microbes."
      },
      {
        q: "What stratospheric atmospheric layer composed of triatomic oxygen molecules (O3) shields Earth surface from harmful solar ultraviolet-B radiation?",
        correct: "Ozone Layer",
        w1: "Ionosphere",
        w2: "Mesosphere",
        exp: "The ozone layer is maintained by the Chapman cycle, where high-energy solar UV photons split O2 into reactive oxygen radicals that bond with O2 to form O3."
      },
      {
        q: "Which Irish physicist demonstrated in 1859 that carbon dioxide and water vapor absorb radiant infrared heat, proving the atmospheric greenhouse effect?",
        correct: "John Tyndall",
        w1: "Svante Arrhenius",
        w2: "Joseph Fourier",
        exp: "Tyndall used a ratio spectrophotometer tube to measure infrared absorption across various gases, establishing the physical foundation of climate science."
      },
      {
        q: "What is the most abundant chemical element in Earth modern atmosphere, comprising approximately 78 percent of dry air by volume?",
        correct: "Nitrogen Gas N2",
        w1: "Oxygen Gas O2",
        w2: "Argon Gas Ar",
        exp: "Diatomic nitrogen is relatively unreactive due to its strong covalent triple bond, providing an inert atmospheric blanket that buffers chemical reactions."
      },
      {
        q: "What massive sedimentary rock formations of alternating iron oxide (hematite/magnetite) and chert bands formed when early oceanic oxygen bound to dissolved iron?",
        correct: "Banded Iron Formations",
        w1: "Stromatolite Reefs",
        w2: "Oolite Limestones",
        exp: "Banded Iron Formations (BIFs) laid down between 2.6 and 1.8 billion years ago provide the primary iron ore mined for modern global steel manufacturing."
      }
    ],
    number: {
      q: "What percentage of dry air in Earth atmosphere is composed of Nitrogen gas (N2)?",
      target: 78,
      unit: "percent",
      imperial: "78.08% Nitrogen",
      exp: "Nitrogen makes up approximately 78.08 percent of Earth dry atmospheric volume, followed by Oxygen at 20.95% and Argon at 0.93%."
    }
  },

  // Cycle 10: Iconic World Canals & Inland Maritime Engineering
  {
    mcqs: [
      {
        q: "What is the longest artificial canal or river in the world, spanning over 1,700 kilometers in China between Beijing and Hangzhou?",
        correct: "Grand Canal of China",
        w1: "Lingqu Canal",
        w2: "Dujiangyan System",
        exp: "Constructed largely during the Sui Dynasty in the 6th and 7th centuries CE, the Grand Canal unified grain transport between the Yellow and Yangtze river basins."
      },
      {
        q: "Which narrow Greek canal completed in 1893 cuts four miles through a solid rock isthmus, separating the Peloponnese peninsula from the Greek mainland?",
        correct: "Corinth Canal",
        w1: "Kiel Canal",
        w2: "Gota Canal",
        exp: "With vertical limestone walls towering over sixty meters high and a channel width of only twenty-four meters, the Corinth Canal saves ships a 400-mile detour."
      },
      {
        q: "Which 98-kilometer canal in northern Germany opened in 1895, linking the North Sea at Brunsbüttel to the Baltic Sea at Kiel?",
        correct: "Kiel Canal",
        w1: "Mittelland Canal",
        w2: "Dortmund-Ems Canal",
        exp: "The Kiel Canal is the world busiest artificial waterway by vessel transits, avoiding the stormy navigation around Denmark Jutland peninsula."
      },
      {
        q: "Which 584-kilometer waterway opened in New York State in 1825, connecting the Hudson River at Albany to Lake Erie at Buffalo?",
        correct: "Erie Canal",
        w1: "Chesapeake and Ohio Canal",
        w2: "Illinois and Michigan Canal",
        exp: "Dubbed Clinton Ditch, the Erie Canal reduced shipping costs by ninety-five percent and transformed New York City into the premier commercial port in North America."
      },
      {
        q: "Which Canadian canal system in Ontario uses eight lock chambers to allow ocean cargo ships to bypass the impassable cataracts of Niagara Falls?",
        correct: "Welland Canal",
        w1: "Rideau Canal",
        w2: "Trent-Severn Waterway",
        exp: "Part of the St. Lawrence Seaway, the Welland Canal lifts ships ninety-nine meters between Lake Ontario and Lake Erie."
      }
    ],
    number: {
      q: "What is the approximate total length in kilometers of the Grand Canal of China between Beijing and Hangzhou?",
      target: 1776,
      unit: "kilometers",
      imperial: "1,104 miles",
      exp: "The UNESCO World Heritage Grand Canal of China stretches approximately 1,776 kilometers, making it the longest canal on Earth."
    }
  }
];

// Build Quiz 14
buildQuiz({
  id: 'general-knowledge-vol14-60',
  theme: 'General Knowledge Vol 14: Deep Earth Secrets, Cosmic Mysteries & Master Inventions',
  title: 'General Knowledge Vol 14: Deep Earth Secrets, Cosmic Mysteries & Master Inventions',
  description: 'A 60-question grand master assessment exploring pulsars, medieval castles, thermodynamics, deep mantle diamonds, atmospheric dynamics, Greek geometry, cephalopods, Renaissance printing, atmospheric evolution, and world canal engineering.',
  category: 'Sports, Records & General Knowledge',
  difficulty: 'moderate'
}, vol14Cycles);

console.log('Vol 14 successfully built!');
