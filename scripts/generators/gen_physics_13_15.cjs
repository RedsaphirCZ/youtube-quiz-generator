const { buildQuiz } = require('./generate_helpers.cjs');

// -------------------------------------------------------------
// 13. geology-volcanoes-earthquakes-60
// -------------------------------------------------------------
const geologyCycles = [
  // Cycle 1: Earth Internal Structure & Core Dynamics
  {
    mcqs: [
      {
        q: "What seismic boundary discovered in 1909 separates Earth brittle crust from the underlying ductile upper mantle?",
        correct: "Mohorovicic Discontinuity Moho",
        w1: "Gutenberg Discontinuity",
        w2: "Lehmann Discontinuity",
        exp: "Andrija Mohorovicic identified that seismic P and S waves accelerate abruptly as they pass from low-density crustal rocks into dense mantle peridotite."
      },
      {
        q: "What semi-fluid, plastic layer of the upper mantle located beneath the rigid lithosphere allows tectonic plates to glide and drift across Earth?",
        correct: "Asthenosphere",
        w1: "Mesosphere",
        w2: "Outer Core",
        exp: "The asthenosphere extends from roughly 100 to 660 km depth, composed of ductile peridotite rock that deforms via solid-state convective creep."
      },
      {
        q: "What physical state of matter is Earth outer core, whose vigorous convection currents of liquid iron and nickel generate the planetary magnetic field?",
        correct: "Liquid",
        w1: "Solid",
        w2: "Supercritical Plasma",
        exp: "Shear S-waves cannot penetrate the outer core, proving it is a liquid layer of molten iron-nickel alloy at temperatures between 4,000 and 6,000 °C."
      },
      {
        q: "What sharp seismic boundary located at approximately 2,900 km depth marks the transition from the solid silicate mantle to the liquid iron core?",
        correct: "Gutenberg Discontinuity",
        w1: "Moho Boundary",
        w2: "Lehmann Boundary",
        exp: "Beno Gutenberg identified the core-mantle boundary in 1914 by analyzing the seismic P-wave shadow zone created by refraction at the liquid boundary."
      },
      {
        q: "What geophysical dynamo mechanism converts thermal convection and Coriolis rotational kinetic energy of the liquid outer core into Earth magnetic field?",
        correct: "The Geodynamo",
        w1: "Sagnac Dynamo",
        w2: "Piezoelectric Magnetism",
        exp: "Helical convective flows of conductive molten iron aligned by Earth rotation generate self-sustaining dipolar electric currents and magnetic flux."
      }
    ],
    number: {
      q: "Approximately what depth in kilometers below Earth surface does the core-mantle Gutenberg boundary lie?",
      target: 2900,
      unit: "km",
      imperial: "1,800 miles (2,900 km)",
      exp: "The core-mantle boundary (D'' layer) resides approximately 2,891 to 2,900 kilometers beneath Earth surface, separating silicate mantle rock from molten iron."
    }
  },

  // Cycle 2: Plate Tectonics & Continental Drift
  {
    mcqs: [
      {
        q: "What German meteorologist and geophysicist first formulated the comprehensive empirical theory of Continental Drift in 1912?",
        correct: "Alfred Wegener",
        w1: "Harry Hess",
        w2: "Arthur Holmes",
        exp: "Wegener cited matching continental coastlines, identical fossil taxa (Glossopteris, Mesosaurus) across oceans, and glacial striations to propose Pangea."
      },
      {
        q: "What colossal supercontinent assembled roughly 335 million years ago before rifting apart into Laurasia and Gondwana during the Jurassic?",
        correct: "Pangea",
        w1: "Rodinia",
        w2: "Columbia Nuna",
        exp: "Pangea was surrounded by the superocean Panthalassa, assembling during the late Paleozoic before breaking up roughly 175 million years ago."
      },
      {
        q: "What tectonic plate boundary occurs where two lithospheric plates slide horizontally past one another, such as the San Andreas Fault?",
        correct: "Transform Fault Boundary",
        w1: "Divergent Boundary",
        w2: "Convergent Subduction Zone",
        exp: "Transform boundaries exhibit horizontal strike-slip motion without creating or destroying crust, generating shallow, high-energy earthquakes."
      },
      {
        q: "What geological process occurs at deep ocean trenches where dense oceanic lithosphere plunges beneath lighter continental crust into the mantle?",
        correct: "Subduction",
        w1: "Seafloor Spreading",
        w2: "Continental Rifting",
        exp: "Sinking oceanic slabs pull plates behind them (slab pull), releasing water into the overlying mantle wedge to trigger flux melting and volcanic arcs."
      },
      {
        q: "What volcanic island chain in the Pacific was formed as the oceanic Pacific Plate traveled northwest over a stationary deep mantle plume hotspot?",
        correct: "Hawaiian-Emperor Seamount Chain",
        w1: "Aleutian Island Arc",
        w2: "Mariana Archipelago",
        exp: "The age of the volcanic islands increases systematically from the youngest active volcanism on Hawaii Island northwestward toward Midway Atoll."
      }
    ],
    number: {
      q: "How many centimeters per year on average do Earth major lithospheric tectonic plates typically drift across the asthenosphere?",
      target: 5,
      unit: "cm/year",
      imperial: "2 to 10 cm/year (avg 5 cm/yr)",
      exp: "GPS satellite geodesy measures tectonic plate velocities ranging from 1 to 2 cm per year for the Eurasian Plate up to 10 cm per year for the Pacific Plate (average ~5 cm/yr)."
    }
  },

  // Cycle 3: Volcanic Mechanisms & Eruption Styles
  {
    mcqs: [
      {
        q: "What chemical property of magma, determined primarily by silica (SiO2) concentration, controls its flow resistance and explosive trapping of gases?",
        correct: "Viscosity",
        w1: "Specific Gravity",
        w2: "Magnetic Susceptibility",
        exp: "Felsic rhyolitic magmas with high silica (>70%) form polymer networks that trap expanding dissolved gases, producing violent explosive eruptions."
      },
      {
        q: "What catastrophic volcanic eruption style produces colossal ash columns penetrating the stratosphere, named after Roman historian Pliny the Younger?",
        correct: "Plinian Eruption",
        w1: "Strombolian Eruption",
        w2: "Hawaiian Effusive Eruption",
        exp: "Plinian eruptions produce continuous sustained gas jets rocketing ash and pumice over 30 kilometers into the stratosphere, followed by pyroclastic collapses."
      },
      {
        q: "What fast-moving, lethal avalanche of incandescent gas, ash, and volcanic rock fragments rushes down volcanic slopes at speeds over 400 km/h?",
        correct: "Pyroclastic Flow Nuée Ardente",
        w1: "Lahar",
        w2: "Tephra Plume",
        exp: "Pyroclastic density currents reach temperatures exceeding 800 °C and destroy everything in their path via thermal incinerations and hydrodynamic blast forces."
      },
      {
        q: "What destructive volcanic hazard consists of a boiling torrential mudflow or debris flow of volcanic ash, boulders, and water rushing down river valleys?",
        correct: "Lahar",
        w1: "Jökulhlaup",
        w2: "Pumice Raft",
        exp: "Lahars are triggered when volcanic eruptions rapidly melt summit glaciers or when heavy monsoon rains mobilize loose unconsolidated pyroclastic deposits."
      },
      {
        q: "What broad, gently sloping volcano type is built layer upon layer by the successive eruption of low-viscosity basaltic lava, such as Mauna Loa?",
        correct: "Shield Volcano",
        w1: "Stratovolcano Composite Cone",
        w2: "Cinder Cone",
        exp: "Shield volcanoes resemble warrior shields lying on the ground, featuring non-explosive effusive eruptions that travel tens of kilometers before solidifying."
      }
    ],
    number: {
      q: "What is the maximum rating score on the logarithmic Volcanic Explosivity Index VEI scale used to categorize mega-colossal super-eruptions?",
      target: 8,
      unit: "VEI scale",
      imperial: "VEI 8 (Super-eruption >1,000 km3 tephra)",
      exp: "The Volcanic Explosivity Index ranges from VEI 0 (non-explosive) to VEI 8 (mega-colossal super-eruptions ejecting over 1,000 cubic kilometers of volcanic tephra)."
    }
  },

  // Cycle 4: Supervolcanoes & Historic Cataclysms
  {
    mcqs: [
      {
        q: "What supervolcano caldera in Wyoming spanning 70 by 45 kilometers last experienced a colossal VEI 8 super-eruption roughly 640,000 years ago?",
        correct: "Yellowstone Caldera",
        w1: "Long Valley Caldera",
        w2: "Valles Caldera",
        exp: "The Lava Creek eruption 640,000 years ago ejected over 1,000 cubic kilometers of material, blanketing much of North America in volcanic ash."
      },
      {
        q: "What Indonesian volcanic eruption in April 1815 was the deadliest in recorded human history, producing the global Year Without a Summer in 1816?",
        correct: "Mount Tambora",
        w1: "Krakatoa",
        w2: "Mount Toba",
        exp: "Tambora on Sumbawa Island erupted with VEI 7 explosivity, pumping 100 megatons of sulfur aerosols into the stratosphere and killing over 70,000 people."
      },
      {
        q: "What catastrophic 1883 Indonesian island eruption generated giant tsunamis and acoustic shockwaves that traveled four times around the entire globe?",
        correct: "Krakatoa",
        w1: "Mount Merapi",
        w2: "Mount Pinatubo",
        exp: "Krakatoa collapsed into the Sunda Strait on August 27, 1883, generating 40-meter tsunamis and a sound explosion heard 4,800 km away in Rodriguez Island."
      },
      {
        q: "What Roman resort towns along the Bay of Naples were completely buried and preserved under meters of pyroclastic ash and pumice in 79 CE?",
        correct: "Pompeii and Herculaneum",
        w1: "Ostia and Cumae",
        w2: "Capua and Paestum",
        exp: "Mount Vesuvius erupted in a classic Plinian sequence, freezing Roman architecture, frescoes, and plaster-cast human victims in time."
      },
      {
        q: "What massive super-eruption on the island of Sumatra roughly 74,000 years ago created the largest volcanic crater lake on Earth?",
        correct: "Lake Toba Super-Eruption",
        w1: "Lake Taupo",
        w2: "Crater Lake Mazama",
        exp: "Toba erupted roughly 2,800 cubic kilometers of magma, leaving a 100-km-long caldera lake and triggering a severe volcanic winter cooling episode."
      }
    ],
    number: {
      q: "In what year CE did Mount Tambora in Indonesia erupt in the most powerful volcanic explosion of modern recorded history?",
      target: 1815,
      unit: "CE",
      imperial: "1815 CE",
      exp: "Mount Tambora erupted catastrophically on April 10, 1815, ejecting 160 cubic kilometers of tephra and causing widespread global agricultural crop failures in 1816."
    }
  },

  // Cycle 5: Earthquakes, Seismology & Fault Mechanics
  {
    mcqs: [
      {
        q: "What subterranean point of origin along a fault plane where stored elastic strain energy first releases as an earthquake rupture is called?",
        correct: "Hypocenter Focus",
        w1: "Epicenter",
        w2: "Fault Scarp",
        exp: "The hypocenter is the 3D underground spatial origin of the rupture, located at focal depths ranging from shallow crust (0-70 km) to deep mantle (up to 700 km)."
      },
      {
        q: "What point located directly on Earth surface vertically above the subterranean earthquake focus is called?",
        correct: "Epicenter",
        w1: "Hypocenter",
        w2: "Antinode",
        exp: "Seismologists triangulate the epicenter by measuring the arrival time differential between primary P-waves and secondary S-waves at three or more stations."
      },
      {
        q: "What fastest seismic body waves are longitudinal compressional waves that travel through both solid rocks and liquid fluid layers?",
        correct: "P-Waves Primary Waves",
        w1: "S-Waves Secondary Waves",
        w2: "Rayleigh Waves",
        exp: "P-waves compress and dilate rock parallel to the direction of wave propagation, traveling through crustal rock at speeds between 5 and 8 km/s."
      },
      {
        q: "What transverse seismic body waves shear rock perpendicular to wave motion and cannot propagate through liquid fluids?",
        correct: "S-Waves Secondary Shear Waves",
        w1: "P-Waves",
        w2: "Love Surface Waves",
        exp: "Liquids have zero shear modulus; the inability of S-waves to pass through the outer core provided the definitive proof that Earth outer core is liquid."
      },
      {
        q: "What modern logarithmic earthquake magnitude scale measures total seismic energy released based on fault rupture area, rock rigidity, and average slip?",
        correct: "Moment Magnitude Scale Mw",
        w1: "Richter Scale ML",
        w2: "Modified Mercalli Scale MMI",
        exp: "Developed by Hiroo Kanamori and Thomas Hanks, the Moment Magnitude scale does not saturate for gigantic mega-thrust earthquakes above magnitude 8.0."
      }
    ],
    number: {
      q: "What was the recorded moment magnitude Mw of the 1960 Great Chilean Earthquake in Valdivia, the most powerful earthquake ever measured?",
      target: 9.5,
      unit: "magnitude",
      imperial: "Magnitude 9.5 Mw",
      exp: "On May 22, 1960, a mega-thrust subduction rupture along 1,000 km of the Chile margin produced a record magnitude 9.5 Mw earthquake and Pacific-wide tsunamis."
    }
  },

  // Cycle 6: Mineralogy, Crystal Systems & Hardness
  {
    mcqs: [
      {
        q: "What is the defining geological criterion that distinguishes a true mineral from non-mineral rocks and synthetic materials?",
        correct: "Naturally occurring, inorganic solid with a definite chemical formula and ordered crystalline atomic lattice",
        w1: "Synthetic organic solid formed under pressure",
        w2: "Amorphous non-crystalline silicate glass",
        exp: "Minerals must form naturally without human synthesis, be solid and inorganic, and possess an ordered internal repeating arrangement of atoms."
      },
      {
        q: "What empirical scratch hardness scale established in 1812 rates minerals from 1 (talc) to 10 (diamond)?",
        correct: "Mohs Hardness Scale",
        w1: "Brinell Scale",
        w2: "Vickers Scale",
        exp: "Friedrich Mohs selected ten reference minerals where each mineral can scratch any mineral below it (e.g., calcite scratches gypsum, quartz scratches feldspar)."
      },
      {
        q: "What mineral class consisting of silicon and oxygen tetrahedra (SiO4) forms over 90 percent of Earth continental and oceanic crust?",
        correct: "Silicate Minerals",
        w1: "Carbonate Minerals",
        w2: "Halide Minerals",
        exp: "Silicates include feldspars, quartz, pyroxenes, amphiboles, micas, and olivine, structured into single chains, double chains, sheets, and 3D frameworks."
      },
      {
        q: "What property describes the tendency of crystalline minerals to break smoothly along flat, parallel planes of atomic bonding weakness?",
        correct: "Cleavage",
        w1: "Conchoidal Fracture",
        w2: "Tenacity",
        exp: "Cleavage planes reflect weak chemical bonds in the crystal lattice (e.g., basal sheet cleavage in mica or rhombohedral cleavage in calcite)."
      },
      {
        q: "What variety of corundum aluminum oxide mineral colored vibrant red by trace chromium ions is prized as a precious gemstone?",
        correct: "Ruby",
        w1: "Sapphire",
        w2: "Emerald",
        exp: "Corundum ($Al_2O_3$) has a Mohs hardness of 9; red specimens with Cr3+ substitutions are rubies, while all other colors (blue, yellow, pink) are sapphires."
      }
    ],
    number: {
      q: "What rating on the Mohs hardness scale does the mineral Quartz SiO2 hold as a reference benchmark?",
      target: 7,
      unit: "Mohs hardness",
      imperial: "Mohs 7",
      exp: "Quartz ($SiO_2$) defines Mohs hardness 7, able to scratch window glass (5.5) and steel knife blades (5.5-6.5) but scratched by topaz (8) and diamond (10)."
    }
  },

  // Cycle 7: The Rock Cycle: Igneous, Sedimentary & Metamorphic
  {
    mcqs: [
      {
        q: "What dark, fine-grained extrusive igneous rock rich in plagioclase feldspar and pyroxene forms the vast majority of oceanic crust?",
        correct: "Basalt",
        w1: "Granite",
        w2: "Rhyolite",
        exp: "Basalt erupts at mid-ocean ridges and hotspots, rapidly cooling into fine crystals or pillowed structures that pave the global ocean floors."
      },
      {
        q: "What coarse-grained, light-colored intrusive igneous rock rich in quartz and potassium feldspar forms the deep foundations of continental crust?",
        correct: "Granite",
        w1: "Gabbro",
        w2: "Diorite",
        exp: "Granite cools slowly inside deep magma chambers over millions of years, allowing large macroscopic interlocking crystals of quartz, feldspar, and mica to grow."
      },
      {
        q: "What sedimentary rock composed predominantly of calcium carbonate (CaCO3) is formed from the accumulated shells of ancient marine microorganisms?",
        correct: "Limestone",
        w1: "Sandstone",
        w2: "Shale",
        exp: "Limestones originate from shallow marine reefs, coccolithophores, and foraminifera, acting as Earth largest long-term carbon reservoir."
      },
      {
        q: "What non-foliated metamorphic rock forms when sedimentary limestone undergoes intense recrystallization under subterranean heat and pressure?",
        correct: "Marble",
        w1: "Quartzite",
        w2: "Gneiss",
        exp: "Metamorphic heat causes calcite grains in limestone to recrystallize into an interlocking mosaic of coarse calcite crystals, erasing original fossils."
      },
      {
        q: "What banded, high-grade foliated metamorphic rock displays alternating light quartz-feldspar and dark ferromagnesian mineral layers?",
        correct: "Gneiss",
        w1: "Schist",
        w2: "Slate",
        exp: "Gneiss forms under extreme temperatures (>600 °C) and directed pressures during continental collisions, causing metamorphic segregation into distinct bands."
      }
    ],
    number: {
      q: "What percentage of Earth exposed continental land surface is covered by sedimentary rock strata?",
      target: 75,
      unit: "percent",
      imperial: "75% of exposed land surface",
      exp: "Although sedimentary rocks make up less than 5% of the total crustal volume, they form a thin surface blanket covering roughly 75% of all exposed continental land."
    }
  },

  // Cycle 8: Geomorphology, Canyons & Glacial Landscapes
  {
    mcqs: [
      {
        q: "What world-famous canyon in northern Arizona was carved over 6 million years by the Colorado River through nearly two billion years of rock strata?",
        correct: "The Grand Canyon",
        w1: "Bryce Canyon",
        w2: "Zion Canyon",
        exp: "The Grand Canyon exposes continuous geological strata from the 1.8-billion-year Vishnu Schist at the bottom to the Kaibab Limestone rim."
      },
      {
        q: "What deep, steep-sided coastal inlet formed by the submergence of a glacially carved U-shaped valley is common in Norway and New Zealand?",
        correct: "Fjord",
        w1: "Ria",
        w2: "Estuary",
        exp: "Glaciers gouged deep valleys far below sea level during ice ages; when glaciers retreated and sea levels rose, seawater flooded the deep trenches."
      },
      {
        q: "What landscape characterized by underground sinkholes, sinking rivers, and colossal cave systems is dissolved out of soluble limestone bedrock?",
        correct: "Karst Topography",
        w1: "Badlands",
        w2: "Mesa Terrain",
        exp: "Rainwater absorbs atmospheric CO2 to form weak carbonic acid, which slowly dissolves calcite along fractures to create Mammoth Cave and Guilin karst towers."
      },
      {
        q: "What linear ridge of unsorted glacial till and rocky debris is deposited directly along the margins or snout of an advancing glacier?",
        correct: "Moraine",
        w1: "Esker",
        w2: "Drumlin",
        exp: "Terminal and lateral moraines act like bulldozed mounds of unsorted sediment, marking the farthest historical reach of glacial ice sheets."
      },
      {
        q: "What flat-topped elevated landform with steep cliff sides common in the American Southwest is smaller than a plateau but larger than a butte?",
        correct: "Mesa",
        w1: "Butte",
        w2: "Cuesta",
        exp: "Mesas are capped by a hard, erosion-resistant caprock layer that protects the softer underlying shale and sandstone strata from weathering."
      }
    ],
    number: {
      q: "What is the maximum depth in meters of the Grand Canyon in Arizona from rim down to the Colorado riverbed?",
      target: 1828,
      unit: "meters",
      imperial: "6,000 feet (1,828 m)",
      exp: "The Grand Canyon plunges to a maximum depth of approximately 1,828 meters (6,000 feet or over one mile) beneath the North Rim."
    }
  },

  // Cycle 9: Oceanic Ridges, Trenches & Hydrothermal Systems
  {
    mcqs: [
      {
        q: "What continuous 65,000-kilometer volcanic mountain chain along divergent tectonic boundaries forms the longest mountain range on Earth?",
        correct: "Mid-Ocean Ridge System",
        w1: "Pacific Ring of Fire",
        w2: "Emperor Seamounts",
        exp: "Winding through the Atlantic, Pacific, Indian, and Arctic oceans, the mid-ocean ridge system creates new oceanic basalt crust at seafloor spreading centers."
      },
      {
        q: "What deep-sea hydrothermal mineral chimneys precipitate dark iron, copper, and zinc sulfides when superheated 400 °C acidic fluids meet icy ocean water?",
        correct: "Black Smokers",
        w1: "White Smokers",
        w2: "Cold Methane Seeps",
        exp: "Superheated seawater leaches metals from deep volcanic basalt; upon venting into 2 °C seawater, sulfide minerals precipitate instantly into smoking chimneys."
      },
      {
        q: "What deepest surveyed V-shaped oceanic subduction trench on Earth plunges nearly 11,000 meters in the western Pacific Ocean?",
        correct: "Mariana Trench",
        w1: "Puerto Rico Trench",
        w2: "Java Trench",
        exp: "Formed where the dense, old Pacific Plate subducts beneath the smaller Mariana Plate, the Mariana Trench reaches extreme hadal depths exceeding 1,000 atmospheres of pressure."
      },
      {
        q: "What flat-topped submerged volcanic seamounts that were eroded flat by wave action before subsiding below sea level are called?",
        correct: "Guyots",
        w1: "Atolls",
        w2: "Pinnacles",
        exp: "Named after Swiss geographer Arnold Guyot, guyots provide physical proof of seafloor subsidence as oceanic crust cools and moves away from spreading ridges."
      },
      {
        q: "What alternating magnetic stripes recorded in seafloor basalt parallel to mid-ocean ridges provided definitive confirmation of seafloor spreading?",
        correct: "Paleomagnetic Striping",
        w1: "Ferromagnetic Stratification",
        w2: "Magnetic Dipolar Shearing",
        exp: "As basalt cools below the Curie point, magnetite crystals align with Earth magnetic field, recording periodic geomagnetic field reversals like a tape recorder."
      }
    ],
    number: {
      q: "What is the approximate maximum surveyed depth in meters of the Challenger Deep in the Mariana Trench?",
      target: 10928,
      unit: "meters",
      imperial: "35,853 feet (10,928 m)",
      exp: "Deep-sea multibeam sonar bathymetry and submersible descents measure the Challenger Deep at approximately 10,928 to 10,935 meters below sea level."
    }
  },

  // Cycle 10: Geochronology & Earth Deep Time
  {
    mcqs: [
      {
        q: "What radiometric isotope dating method measuring the decay of U-238 and U-235 into stable lead isotopes is the benchmark for dating ancient rocks?",
        correct: "Uranium-Lead Dating",
        w1: "Radiocarbon C-14 Dating",
        w2: "Potassium-Argon Dating",
        exp: "Uranium-lead concordia dating has twin decay chains ($^{238}U \\to {}^{206}Pb$ and $^{235}U \\to {}^{207}Pb$) providing an internal cross-check for high accuracy."
      },
      {
        q: "What microscopic, resilient zirconium silicate crystals found in Western Australia Jack Hills represent the oldest known fragments of Earth crust?",
        correct: "Zircon Crystals",
        w1: "Monazite Grains",
        w2: "Diamond Xenoliths",
        exp: "Jack Hills detrital zircons date back 4.404 billion years, containing oxygen isotope ratios indicating liquid water oceans and continental crust existed early."
      },
      {
        q: "What geological eon spanning from Earth formation 4.54 billion years ago to 4.0 billion years ago is named after the Greek underworld for its fiery state?",
        correct: "Hadean Eon",
        w1: "Archean Eon",
        w2: "Proterozoic Eon",
        exp: "The Hadean was characterized by frequent asteroid bombardment, widespread magma oceans, and the formation of Earth core and early steam atmosphere."
      },
      {
        q: "What foundational stratigraphical law states that in an undisturbed sequence of sedimentary strata, older rock layers lie at the bottom and younger layers at the top?",
        correct: "Law of Superposition",
        w1: "Principle of Original Horizontality",
        w2: "Principle of Cross-Cutting Relationships",
        exp: "Formulated by Nicolas Steno in 1669, superposition provides the relative chronological basis for geological mapping and fossil succession."
      },
      {
        q: "What Scottish Enlightenment geologist is celebrated as the father of modern geology for establishing the concept of Deep Time and Uniformitarianism in 1788?",
        correct: "James Hutton",
        w1: "Charles Lyell",
        w2: "William Smith",
        exp: "Hutton realized that geological features like Siccar Point angular unconformity require immense time spans: no vestige of a beginning, no prospect of an end."
      }
    ],
    number: {
      q: "How many billion years old is planet Earth, verified by radiometric dating of primitive meteorites and Apollo lunar rocks?",
      target: 4.54,
      unit: "billion years",
      imperial: "4.54 billion years old",
      exp: "Isotope geochemical analysis of Lead-Lead isochrons in Canyon Diablo iron meteorites and Earth zircon minerals establishes Earth age at 4.54 +/- 0.05 billion years."
    }
  }
];

buildQuiz({
  id: 'geology-volcanoes-earthquakes-60',
  theme: 'Dynamic Earth: Plate Tectonics, Volcanoes & Minerals',
  title: 'Dynamic Earth: Plate Tectonics, Volcanoes & Minerals',
  description: 'A 60-question grand master assessment exploring Earth core geodynamo, plate tectonics, supervolcanoes, seismology, mineral crystal systems, and deep time geology.',
  category: 'Astronomy, Physics & Chemistry',
  difficulty: 'moderate'
}, geologyCycles);

// -------------------------------------------------------------
// 14. periodic-table-chemistry-60
// -------------------------------------------------------------
const chemistryCycles = [
  // Cycle 1: Periodic Table History & Architecture
  {
    mcqs: [
      {
        q: "What Russian chemist formulated the first Periodic Law in 1869, arranging elements by atomic mass and leaving gaps to predict undiscovered elements?",
        correct: "Dmitri Mendeleev",
        w1: "Julius Lothar Meyer",
        w2: "Antoine Lavoisier",
        exp: "Mendeleev accurately predicted the existence and physical properties of undiscovered elements including gallium (eka-aluminum) and germanium (eka-silicon)."
      },
      {
        q: "What British physicist demonstrated in 1913 using X-ray emission spectroscopy that the periodic table is fundamentally ordered by atomic number nuclear charge?",
        correct: "Henry Moseley",
        w1: "Ernest Rutherford",
        w2: "J.J. Thomson",
        exp: "Moseley Law showed that X-ray frequency is proportional to atomic number $Z$, correctly ordering elements like tellurium and iodine regardless of atomic mass."
      },
      {
        q: "What term designates the horizontal rows in the modern periodic table, corresponding directly to the principal quantum electron shell number?",
        correct: "Periods",
        w1: "Groups",
        w2: "Blocks",
        exp: "There are currently seven periods in the periodic table, ranging from period 1 (holding only H and He) to period 7 (ending at element 118, Oganesson)."
      },
      {
        q: "What term designates the 18 vertical columns in the periodic table, grouping elements with identical numbers of valence electrons?",
        correct: "Groups",
        w1: "Periods",
        w2: "Series",
        exp: "Elements in the same IUPAC group (e.g. Group 1 alkali metals, Group 17 halogens) share similar valence shell configurations and chemical reactivity."
      },
      {
        q: "What periodic trend describes the minimum energy required to remove the most loosely held valence electron from an isolated gaseous atom?",
        correct: "First Ionization Energy",
        w1: "Electron Affinity",
        w2: "Electronegativity",
        exp: "Ionization energy increases across a period from left to right due to increasing effective nuclear charge and decreases down a group due to electron shielding."
      }
    ],
    number: {
      q: "How many officially verified and IUPAC-recognized chemical elements make up the modern complete Periodic Table from Hydrogen to Oganesson?",
      target: 118,
      unit: "elements",
      imperial: "118 chemical elements",
      exp: "The modern periodic table contains exactly 118 confirmed elements, completed across all seven periods with the formal naming of elements 113, 115, 117, and 118 in 2016."
    }
  },

  // Cycle 2: Alkali & Alkaline Earth Metals
  {
    mcqs: [
      {
        q: "What Group 1 alkali metal is the least dense solid metal element at standard conditions, floating easily on water and mineral oil?",
        correct: "Lithium",
        w1: "Sodium",
        w2: "Potassium",
        exp: "Lithium has a density of only 0.534 g/cm3, roughly half the density of water, possessing the highest electrochemical reduction potential."
      },
      {
        q: "Why must pure elemental alkali metals like sodium, potassium, and cesium be stored submerged in dry mineral oil or sealed in inert argon glass ampoules?",
        correct: "They react violently and exothermically with atmospheric moisture and oxygen",
        w1: "They sublimate directly into toxic vapors",
        w2: "They are unstable radioactive isotopes",
        exp: "Alkali metals have a single $s^1$ valence electron that is readily lost, reacting exothermically with water to produce caustic metal hydroxides and flammable hydrogen gas."
      },
      {
        q: "What intense characteristic flame test emission color is produced when sodium metal or its salts are vaporized in a Bunsen burner flame?",
        correct: "Brilliant Yellow-Orange",
        w1: "Crimson Red",
        w2: "Lilac Violet",
        exp: "Thermally excited valence electrons in sodium relax from the 3p to 3s orbital, emitting iconic yellow doublet spectral lines at 589.0 and 589.6 nanometers."
      },
      {
        q: "What Group 2 alkaline earth metal with atomic number 12 burns with a blinding, brilliant white light used in maritime flares and pyrotechnics?",
        correct: "Magnesium",
        w1: "Calcium",
        w2: "Barium",
        exp: "Magnesium reacts vigorously with oxygen at high temperatures to form magnesium oxide ($MgO$), emitting intense ultraviolet and visible white light."
      },
      {
        q: "What alkali metal in period 6 has a low melting point of just 28.5 °C, melting in human hand temperature and reacting explosively with cold water?",
        correct: "Cesium",
        w1: "Rubidium",
        w2: "Francium",
        exp: "Cesium has a large atomic radius and weak metallic bonding, making it extremely soft with a melting point of 28.5 °C and the highest chemical reactivity of stable metals."
      }
    ],
    number: {
      q: "What is the atomic number of Hydrogen, the lightest element and most abundant atomic substance in the universe?",
      target: 1,
      unit: "atomic number",
      imperial: "Atomic number 1",
      exp: "Hydrogen has atomic number 1, consisting of a single proton and single electron (in protium), making up over 73 percent of the baryonic mass of the universe."
    }
  },

  // Cycle 3: Transition Metals & Metallurgy
  {
    mcqs: [
      {
        q: "What transition metal element with atomic number 26 is the most abundant element by mass in planet Earth as a whole, concentrated heavily in the core?",
        correct: "Iron",
        w1: "Nickel",
        w2: "Titanium",
        exp: "Iron constitutes approximately 32.1% of Earth total mass (mostly in the core) and forms the backbone of global steel infrastructure."
      },
      {
        q: "What transition metal element possesses the highest electrical and thermal conductivity of any metal at standard room temperature?",
        correct: "Silver",
        w1: "Copper",
        w2: "Gold",
        exp: "Silver has an electrical conductivity of $6.30 \\times 10^7$ S/m, slightly outperforming copper, though copper is more widely used due to lower cost."
      },
      {
        q: "What transition metal element has the highest melting point of any pure metal in the Periodic Table at an extraordinary 3,422 degrees Celsius?",
        correct: "Tungsten",
        w1: "Osmium",
        w2: "Platinum",
        exp: "Tungsten (Wolfram, W) has half-filled $5d$ and $6s$ valence electron states that create exceptionally strong covalent-like metallic bonds in its crystal lattice."
      },
      {
        q: "What dense transition metal is the only pure metallic element that exists in a liquid state at standard room temperature and pressure?",
        correct: "Mercury",
        w1: "Gallium",
        w2: "Bromine",
        exp: "Relativistic contraction of the 6s electron shell in mercury atoms stabilizes the closed-shell configuration, weakening metallic bonding so it melts at -38.8 °C."
      },
      {
        q: "What precious transition metal element with atomic number 79 is the most malleable and ductile metal known, able to be beaten into sheets 400 times thinner than hair?",
        correct: "Gold",
        w1: "Platinum",
        w2: "Palladium",
        exp: "A single gram of pure gold can be hammered into a one-square-meter sheet of translucent gold leaf or drawn into a wire over two kilometers long."
      }
    ],
    number: {
      q: "What is the melting point in degrees Celsius of the refractory transition metal Tungsten W, the highest melting point of any metal?",
      target: 3422,
      unit: "celsius",
      imperial: "3,422 °C (6,192 °F)",
      exp: "Tungsten possesses the highest melting point of all pure metals at 3,422 °C (3,695 Kelvin), widely used in incandescent filaments, rocket nozzles, and welding electrodes."
    }
  },

  // Cycle 4: Halogens & Noble Gases
  {
    mcqs: [
      {
        q: "What Group 17 halogen gas is the most chemically reactive and electronegative element in the entire Periodic Table?",
        correct: "Fluorine",
        w1: "Chlorine",
        w2: "Bromine",
        exp: "Fluorine has a Pauling electronegativity of 3.98, reacting aggressively with virtually all other elements (including water, glass, and noble gases like xenon)."
      },
      {
        q: "What dense, fuming reddish-brown halogen is the only non-metallic element that exists as a liquid at standard room temperature?",
        correct: "Bromine",
        w1: "Iodine",
        w2: "Chlorine",
        exp: "Bromine (Br2) boils at 58.8 °C and freezes at -7.2 °C, giving off pungent, corrosive reddish vapors that attack mucous membranes."
      },
      {
        q: "What Group 18 noble gas was first discovered by astronomers in the solar spectrum during an 1868 eclipse before being found on Earth?",
        correct: "Helium",
        w1: "Neon",
        w2: "Argon",
        exp: "Pierre Janssen and Norman Lockyer identified a yellow spectral line (D3) in solar prominences, naming the element Helium after the Greek sun god Helios."
      },
      {
        q: "What foundational chemical rule states that main-group atoms tend to gain, lose, or share electrons to attain a stable valence configuration of eight electrons?",
        correct: "The Octet Rule",
        w1: "Hund Rule",
        w2: "Aufbau Principle",
        exp: "Formulated by Gilbert Lewis, the octet rule reflects the thermodynamic stability of completely filled $s^2 p^6$ valence electron configurations like noble gases."
      },
      {
        q: "What radioactive, dense noble gas element accumulates in building basements from the natural decay chain of uranium in granite rocks and soils?",
        correct: "Radon",
        w1: "Xenon",
        w2: "Krypton",
        exp: "Radon-222 is an alpha-emitting radioactive gas with a 3.8-day half-life, representing the second leading cause of lung cancer after tobacco smoking."
      }
    ],
    number: {
      q: "What is the highest Pauling scale electronegativity value in chemistry, held by the element Fluorine?",
      target: 3.98,
      unit: "Pauling value",
      imperial: "3.98 on Pauling scale",
      exp: "Fluorine has the highest electronegativity of any element at 3.98 on the Pauling scale, defining the upper benchmark of atomic electron attraction."
    }
  },

  // Cycle 5: Carbon Chemistry & Allotropes
  {
    mcqs: [
      {
        q: "What unique chemical capability of carbon allows it to form strong, stable covalent bonds with other carbon atoms to build infinite chains and rings?",
        correct: "Catenation",
        w1: "Chelation",
        w2: "Allotropy",
        exp: "High carbon-carbon bond enthalpy (347 kJ/mol) combined with tetravalence allows carbon to build the millions of complex molecules that form organic life."
      },
      {
        q: "What carbon allotrope consists of a single atom-thick two-dimensional sheet of sp2 carbon atoms in a hexagonal honeycomb lattice, stronger than steel?",
        correct: "Graphene",
        w1: "Diamond",
        w2: "Lonsdaleite",
        exp: "Isolated in 2004 by Andre Geim and Konstantin Novoselov (2010 Nobel Prize), graphene has extraordinary electrical mobility and 200-times steel tensile strength."
      },
      {
        q: "What spherical carbon cage molecule composed of 60 carbon atoms in truncated icosahedron rings resembles a geometric soccer ball?",
        correct: "Buckminsterfullerene C60",
        w1: "Carbon Nanotube",
        w2: "Amorphous Carbon",
        exp: "Discovered by Kroto, Curl, and Smalley in 1985 (1996 Nobel Prize), fullerenes opened the field of carbon nanotechnology and supramolecular chemistry."
      },
      {
        q: "What soft, grey-black carbon allotrope consists of stacked graphene layers held together by weak van der Waals forces, making it an excellent dry lubricant?",
        correct: "Graphite",
        w1: "Diamond",
        w2: "Graphene Oxide",
        exp: "Delocalized pi electrons in graphite sheets allow it to conduct electricity, while easy sliding between adjacent layers makes it soft enough for pencil leads."
      },
      {
        q: "What major branch of chemistry is dedicated exclusively to the study of carbon-containing compounds, structures, and reaction mechanisms?",
        correct: "Organic Chemistry",
        w1: "Inorganic Chemistry",
        w2: "Physical Chemistry",
        exp: "Organic chemistry investigates the synthesis, stereochemistry, and reactivity of hydrocarbons and their functional group derivatives in biology and materials."
      }
    ],
    number: {
      q: "How many valence electrons does a neutral ground-state Carbon atom possess in its outer shell, enabling tetravalent bonding?",
      target: 4,
      unit: "valence electrons",
      imperial: "4 valence electrons (2s2 2p2)",
      exp: "Carbon (atomic number 6) has an electron configuration of $1s^2 2s^2 2p^2$, providing exactly four valence electrons that form $sp^3, sp^2$, or $sp$ hybrid orbitals."
    }
  },

  // Cycle 6: Lanthanides, Actinides & Radioactivity
  {
    mcqs: [
      {
        q: "What series of 15 f-block metallic elements spanning atomic numbers 57 to 71 is critical for neodymium super-magnets, lasers, and smartphones?",
        correct: "Lanthanides Rare Earth Elements",
        w1: "Actinides",
        w2: "Alkali Metals",
        exp: "Lanthanides fill the 4f electron subshell, exhibiting the Lanthanide Contraction which causes atomic radii to decrease smoothly across the row."
      },
      {
        q: "What naturally occurring radioactive actinide isotope is the primary fissile fuel enriched for commercial nuclear power reactors?",
        correct: "Uranium-235",
        w1: "Uranium-238",
        w2: "Thorium-232",
        exp: "Uranium-235 undergoes induced nuclear fission when struck by a thermal neutron, releasing 200 MeV of energy and 2 to 3 prompt neutrons per fission."
      },
      {
        q: "What synthetic radioactive actinide element named after the Americas was created in 1944 and is utilized in household ionization smoke detectors?",
        correct: "Americium",
        w1: "Curium",
        w2: "Californium",
        exp: "Americium-241 emits alpha particles that ionize air molecules inside a chamber; smoke particles interrupt the electric current, triggering the alarm."
      },
      {
        q: "What physical parameter defines the exact time required for one-half of the radioactive nuclei in an unstable radioisotope sample to decay?",
        correct: "Half-Life",
        w1: "Decay Constant",
        w2: "Mean Lifetime",
        exp: "Described by exponential decay law $N(t) = N_0 (1/2)^{t/t_{1/2}}$, half-lives range from fractions of a microsecond to billions of years (e.g., U-238: 4.5 billion years)."
      },
      {
        q: "Who is the only scientist in history to receive Nobel Prizes in two different scientific fields, Physics (1903) and Chemistry (1911), for discovering radium and polonium?",
        correct: "Marie Curie",
        w1: "Pierre Curie",
        w2: "Ernest Rutherford",
        exp: "Marie Sklodowska Curie coined the term radioactivity, developed mobile X-ray units during WWI, and isolated pure radium metal."
      }
    ],
    number: {
      q: "What is the atomic number of Uranium, the heaviest naturally occurring primordial chemical element on the Periodic Table?",
      target: 92,
      unit: "atomic number",
      imperial: "Atomic number 92",
      exp: "Uranium has atomic number 92; all elements with higher atomic numbers ($Z \\ge 93$) are synthetic transuranic elements created in nuclear reactors or accelerators."
    }
  },

  // Cycle 7: Chemical Bonding & Molecular Geometry
  {
    mcqs: [
      {
        q: "What type of chemical bond forms from the electrostatic attraction between oppositely charged cations and anions after electron transfer?",
        correct: "Ionic Bond",
        w1: "Covalent Bond",
        w2: "Metallic Bond",
        exp: "Ionic bonds typically form between elements with large electronegativity differences ($\Delta EN > 2.0$), such as sodium and chlorine in table salt crystals."
      },
      {
        q: "What chemical bond is formed when two non-metal atoms share pairs of valence electrons to achieve stable noble-gas electron configurations?",
        correct: "Covalent Bond",
        w1: "Ionic Bond",
        w2: "Hydrogen Bond",
        exp: "Covalent bonds involve overlapping atomic orbitals, forming sigma and pi bonding molecular orbitals that hold molecules together."
      },
      {
        q: "What chemical model predicts three-dimensional molecular geometries by minimizing electrostatic repulsion between bonding and lone electron pairs?",
        correct: "VSEPR Theory",
        w1: "Molecular Orbital Theory",
        w2: "Crystal Field Theory",
        exp: "Valence Shell Electron Pair Repulsion VSEPR predicts linear, trigonal planar, tetrahedral, trigonal bipyramidal, and octahedral molecular shapes."
      },
      {
        q: "What strong dipole-dipole intermolecular attraction occurs when hydrogen is covalently bonded to highly electronegative nitrogen, oxygen, or fluorine?",
        correct: "Hydrogen Bonding",
        w1: "London Dispersion Force",
        w2: "Dipole-Induced Dipole",
        exp: "Hydrogen bonding gives liquid water its unusually high boiling point, surface tension, and expanded density structure when freezing into ice."
      },
      {
        q: "What bond angle in degrees characterizes the perfect tetrahedral molecular geometry of a methane molecule (CH4)?",
        correct: "109.5 degrees",
        w1: "120.0 degrees",
        w2: "90.0 degrees",
        exp: "Four equivalent $sp^3$ hybrid orbital bonding pairs orient to maximize spatial separation in 3D, creating the classic 109.5-degree tetrahedral angle."
      }
    ],
    number: {
      q: "What is the measured bond angle in degrees between the two hydrogen-oxygen bonds in a bent liquid water molecule H2O?",
      target: 104.5,
      unit: "degrees",
      imperial: "104.5° bond angle",
      exp: "The two non-bonding lone pairs of electrons on the oxygen atom exert greater electrostatic repulsion than bonding pairs, compressing the tetrahedral angle from 109.5° down to 104.5°."
    }
  },

  // Cycle 8: Acids, Bases & Aqueous Equilibria
  {
    mcqs: [
      {
        q: "According to the Bronsted-Lowry acid-base theory, how is an acid fundamentally defined in chemical reactions?",
        correct: "A chemical species that donates a proton H+",
        w1: "An electron pair donor",
        w2: "A hydroxide OH- generator only",
        exp: "In the Bronsted-Lowry model, an acid is a proton donor and a base is a proton acceptor, forming conjugate acid-base pairs."
      },
      {
        q: "What logarithmic scale devised by Soren Sorensen in 1909 measures the hydrogen ion concentration ($-\\log_{10}[H^+]$) of an aqueous solution?",
        correct: "pH Scale",
        w1: "pOH Scale",
        w2: "Arrhenius Scale",
        exp: "Because the pH scale is logarithmic, each unit change represents a 10-fold change in acidity (e.g. pH 3 is ten times more acidic than pH 4)."
      },
      {
        q: "What is the exact pH value of pure neutral water at standard room temperature of 25 degrees Celsius?",
        correct: "7.0",
        w1: "0.0",
        w2: "14.0",
        exp: "At 25 °C, the autoionization constant of water $K_w = 1.0 \\times 10^{-14}$, making $[H^+] = [OH^-] = 1.0 \\times 10^{-7}$ M, which yields pH 7.0."
      },
      {
        q: "What solution containing a weak acid and its conjugate base resists changes in pH when small amounts of strong acid or base are added?",
        correct: "Buffer Solution",
        w1: "Saturated Solution",
        w2: "Supercritical Fluid",
        exp: "Buffers like the carbonic acid-bicarbonate system in human blood ($H_2CO_3 / HCO_3^-$) maintain blood pH tightly between 7.35 and 7.45."
      },
      {
        q: "What quantitative analytical laboratory method determines the unknown concentration of an acid by neutralizing it with a standardized base solution?",
        correct: "Titration",
        w1: "Chromatography",
        w2: "Fractional Distillation",
        exp: "In a titration, a buret delivers titrant into an analyte solution until a chemical indicator or pH meter detects the stoichiometric equivalence point."
      }
    ],
    number: {
      q: "What is the pH value of pure neutral distilled water at standard room temperature 25 °C?",
      target: 7,
      unit: "pH",
      imperial: "pH 7.0 neutral",
      exp: "At standard room temperature (25 °C), pure water has equal concentrations of $H^+$ and $OH^-$ ions ($10^{-7}$ M), yielding a neutral pH of exactly 7.0."
    }
  },

  // Cycle 9: Reaction Kinetics & Thermodynamics
  {
    mcqs: [
      {
        q: "What minimum energy barrier must colliding reactant molecules overcome in order to break bonds and reach the transition state in a reaction?",
        correct: "Activation Energy",
        w1: "Enthalpy of Reaction",
        w2: "Gibbs Free Energy",
        exp: "According to the Arrhenius equation $k = A e^{-E_a/RT}$, reaction rates increase exponentially with temperature as more molecules surpass activation energy."
      },
      {
        q: "What substance speeds up the rate of a chemical reaction by providing an alternative reaction pathway with lower activation energy without being consumed?",
        correct: "Catalyst",
        w1: "Inhibitor",
        w2: "Reagent",
        exp: "Catalysts increase both forward and reverse reaction rates equally without altering the chemical equilibrium position or Gibbs free energy."
      },
      {
        q: "What thermodynamic state function measures the degree of molecular disorder, randomness, or dispersal of energy microstates in a system?",
        correct: "Entropy S",
        w1: "Enthalpy H",
        w2: "Internal Energy U",
        exp: "The Second Law of Thermodynamics states that the total entropy of an isolated system always increases over time ($\Delta S_{univ} > 0$ for spontaneous processes)."
      },
      {
        q: "What chemical principle states that when a dynamic equilibrium is subjected to a change in concentration, temperature, or pressure, the system shifts to counteract it?",
        correct: "Le Chatelier Principle",
        w1: "Hess Law",
        w2: "Raoult Law",
        exp: "Discovered by Henri Le Chatelier in 1884, this principle allows chemical engineers to maximize ammonia yields in the Haber-Bosch process."
      },
      {
        q: "What type of chemical reaction releases thermal heat energy to the surroundings, exhibiting a negative enthalpy change ($\Delta H < 0$)?",
        correct: "Exothermic Reaction",
        w1: "Endothermic Reaction",
        w2: "Adiabatic Reaction",
        exp: "Exothermic reactions, like hydrocarbon combustion and acid-base neutralizations, release energy because product bonds are stronger than reactant bonds."
      }
    ],
    number: {
      q: "What is the power of 10 exponent value n in Avogadro number 6.022 x 10^n particles per mole?",
      target: 23,
      unit: "power of 10",
      imperial: "6.022 x 10^23 particles/mol",
      exp: "Avogadro constant $N_A = 6.02214076 \\times 10^{23} \\text{ mol}^{-1}$ defines the exact number of constituent particles (atoms, molecules) in one mole of substance."
    }
  },

  // Cycle 10: Synthetic Superheavy Elements & Frontiers
  {
    mcqs: [
      {
        q: "What superheavy synthetic noble gas element with atomic number 118 completes the seventh period of the Periodic Table, named after physicist Yuri Oganessian?",
        correct: "Oganesson Og",
        w1: "Tennessine Ts",
        w2: "Livermorium Lv",
        exp: "Oganesson was synthesized at the Flerov Laboratory in Dubna, Russia by bombarding Californium-249 targets with accelerated Calcium-48 ions."
      },
      {
        q: "What theoretical region of the nuclear chart predicts that certain superheavy nuclei with magic numbers of protons and neutrons may exhibit longer half-lives?",
        correct: "Island of Stability",
        w1: "Valley of Stability",
        w2: "Neutron Drip Edge",
        exp: "Glenn Seaborg predicted that closed nuclear shells around $Z=114-126$ and $N=184$ would dramatically slow alpha decay, potentially yielding longer-lived superheavy atoms."
      },
      {
        q: "What superheavy halogen element with atomic number 117 was synthesized jointly by Russian and American scientists, named after the US state of Tennessee?",
        correct: "Tennessine Ts",
        w1: "Californium",
        w2: "Moscovium",
        exp: "Tennessine was officially named in 2016 in recognition of the contributions of Oak Ridge National Laboratory, Vanderbilt University, and UT Knoxville."
      },
      {
        q: "What heavy ion particle projectile ($Z=20, A=48$) with neutron-rich magic structure is widely used in cyclotrons to synthesize superheavy elements?",
        correct: "Calcium-48",
        w1: "Iron-56",
        w2: "Carbon-12",
        exp: "Calcium-48 is a doubly-magic isotope (20 protons, 28 neutrons) that provides extra nuclear stability during fusion collisions with actinide targets."
      },
      {
        q: "What superheavy element with atomic number 115 was officially named after the Moscow Oblast region where the Joint Institute for Nuclear Research is located?",
        correct: "Moscovium Mc",
        w1: "Flerovium Fl",
        w2: "Dubnium Db",
        exp: "Element 115 was officially named Moscovium by IUPAC in 2016 to honor the ancient Russian region hosting the Dubna synthesis experiments."
      }
    ],
    number: {
      q: "What is the highest atomic number element currently synthesized, verified, and officially named on the modern Periodic Table Oganesson?",
      target: 118,
      unit: "atomic number",
      imperial: "Element 118 (Oganesson)",
      exp: "Oganesson ($Z=118$) occupies the final position in Period 7 and Group 18, representing the highest atomic number element verified to date."
    }
  }
];

buildQuiz({
  id: 'periodic-table-chemistry-60',
  theme: 'The Periodic Table, Elements & Chemical Reactions',
  title: 'The Periodic Table, Elements & Chemical Reactions',
  description: 'A 60-question grand master assessment exploring Mendeleev periodic law, alkali and transition metals, carbon allotropes, bonding, acid-base dynamics, and superheavy elements.',
  category: 'Astronomy, Physics & Chemistry',
  difficulty: 'moderate'
}, chemistryCycles);

// -------------------------------------------------------------
// 15. renewable-energy-future-power-60
// -------------------------------------------------------------
const energyCycles = [
  // Cycle 1: Solar Power & Photovoltaic Physics
  {
    mcqs: [
      {
        q: "What solid-state physics phenomenon allows semiconductor p-n junctions to convert incident solar photon energy directly into electrical current?",
        correct: "Photovoltaic Effect",
        w1: "Thermoelectric Seebeck Effect",
        w2: "Piezoelectric Effect",
        exp: "Discovered by Edmond Becquerel in 1839, photons with energy greater than the bandgap excite valence electrons into the conduction band, producing DC electricity."
      },
      {
        q: "What semiconductor chemical element is used in over 90 percent of commercial photovoltaic solar panels manufactured worldwide today?",
        correct: "Silicon",
        w1: "Germanium",
        w2: "Gallium Arsenide",
        exp: "Abundant and non-toxic, monocrystalline and polycrystalline silicon wafers dominate solar manufacturing with commercial module efficiencies exceeding 22%."
      },
      {
        q: "What theoretical thermodynamic limit formulated in 1961 dictates that a standard single-junction silicon solar cell cannot exceed 33.7% energy efficiency?",
        correct: "Shockley-Queisser Limit",
        w1: "Betz Limit",
        w2: "Carnot Thermodynamic Limit",
        exp: "William Shockley and Hans Queisser calculated maximum efficiency by accounting for unabsorbed sub-bandgap photons and thermalization loss of excess energy."
      },
      {
        q: "What promising class of synthetic crystalline mineral materials with ABX3 crystal structure has seen lab solar efficiency jump from 3% to over 26% in a decade?",
        correct: "Perovskites",
        w1: "Silicates",
        w2: "Garnet Crystals",
        exp: "Metal halide perovskites have high absorption coefficients and can be layered with silicon in tandem cells to surpass the traditional single-junction efficiency limit."
      },
      {
        q: "What concentrated solar power CSP technology uses vast arrays of computer-guided tracking mirrors called heliostats to focus sunlight onto a central tower?",
        correct: "Solar Power Tower",
        w1: "Parabolic Trough Collector",
        w2: "Linear Fresnel System",
        exp: "Heliostats track the Sun to focus thousands of suns onto a tower receiver, heating liquid molten salt to over 565 °C for thermal storage and steam turbines."
      }
    ],
    number: {
      q: "What is the maximum theoretical efficiency percentage of a single-junction silicon photovoltaic cell defined by the Shockley-Queisser limit?",
      target: 33.7,
      unit: "percent",
      imperial: "33.7% Shockley-Queisser limit",
      exp: "The Shockley-Queisser limit establishes that a single p-n junction with an optimal 1.34 eV bandgap has a theoretical maximum conversion efficiency of 33.7%."
    }
  },

  // Cycle 2: Wind Energy & Aerodynamics
  {
    mcqs: [
      {
        q: "What fundamental aerodynamic physical limit states that no wind turbine rotor can capture more than 59.3 percent of the kinetic energy in wind?",
        correct: "Betz Limit",
        w1: "Bernoulli Principle",
        w2: "Navier-Stokes Barrier",
        exp: "German physicist Albert Betz calculated in 1919 that decelerating wind completely to zero would choke airflow through the turbine rotor, setting a 16/27 (59.3%) ceiling."
      },
      {
        q: "What mechanical drive component in a horizontal-axis wind turbine steps up low-speed rotational energy from the rotor hub to high speeds for the generator?",
        correct: "Gearbox",
        w1: "Yaw Drive Motor",
        w2: "Grid Inverter",
        exp: "The gearbox steps up rotor rotation speeds from roughly 8-15 rpm up to 1,500-1,800 rpm to match standard high-speed induction and synchronous generators."
      },
      {
        q: "What control system rotates individual wind turbine blades along their longitudinal axis to optimize power capture and feather blades in gale storms?",
        correct: "Pitch Control System",
        w1: "Yaw Drive System",
        w2: "Anemometer Brake",
        exp: "Active pitch systems continuously adjust the blade angle of attack to maintain rated power output in fluctuating winds and feather blades flat to stop the turbine."
      },
      {
        q: "Why do offshore wind turbines generate significantly higher annual energy yields than onshore turbines of identical rated generator capacity?",
        correct: "Ocean winds are stronger, smoother, and more consistent without surface terrain friction",
        w1: "Ocean water directly cools the nacelle generator",
        w2: "Salt air has significantly higher molecular density",
        exp: "Lack of topographic obstacles over open oceans provides higher wind speeds and lower turbulence, yielding higher capacity factors (often >50%) for offshore wind."
      },
      {
        q: "What vertical-axis wind turbine design features curved eggbeater-shaped aerodynamic blades that rotate perpendicular to ground airflow?",
        correct: "Darrieus Turbine",
        w1: "Savonius Drag Turbine",
        w2: "Horizontal HAWT Turbine",
        exp: "Invented by Georges Darrieus in 1931, vertical-axis turbines accept wind from any compass direction without needing a yaw rotation motor to face the wind."
      }
    ],
    number: {
      q: "What is the maximum theoretical aerodynamic power extraction efficiency percentage of a wind turbine rotor according to the Betz Law?",
      target: 59.3,
      unit: "percent",
      imperial: "59.3% Betz Limit (16/27)",
      exp: "Betz Law proves that regardless of blade design, a turbine can extract at most 16/27 (59.26%) of the kinetic energy contained in the moving air column."
    }
  },

  // Cycle 3: Hydroelectric & Ocean Marine Power
  {
    mcqs: [
      {
        q: "What massive hydroelectric gravity dam on the Yangtze River in China is the world largest power plant by total installed generation capacity?",
        correct: "Three Gorges Dam",
        w1: "Itaipu Dam",
        w2: "Hoover Dam",
        exp: "The Three Gorges Dam features 32 main turbines producing an installed capacity of 22,500 megawatts (22.5 GW), generating over 100 terawatt-hours of clean electricity annually."
      },
      {
        q: "What energy storage method pumps water from a lower reservoir to a high-elevation reservoir during excess power hours, releasing it during peak demand?",
        correct: "Pumped-Storage Hydroelectricity PSH",
        w1: "Compressed Air Storage",
        w2: "Flywheel Array Storage",
        exp: "PSH accounts for over 90 percent of all grid-scale energy storage capacity worldwide, offering round-trip storage efficiencies between 75 and 85 percent."
      },
      {
        q: "What impulse water turbine design featuring double-cupped split buckets on a wheel rim is engineered for high hydraulic head and low water flow rates?",
        correct: "Pelton Wheel Turbine",
        w1: "Francis Reaction Turbine",
        w2: "Kaplan Propeller Turbine",
        exp: "Lester Pelton patented impulse turbine in 1880 converts high-pressure water jets into mechanical rotation with energy extraction efficiencies exceeding 90%."
      },
      {
        q: "What ocean energy technology harnesses the gravitational rise and fall of ocean tides across coastal barrages and lagoons to drive hydro-turbines?",
        correct: "Tidal Barrage Power",
        w1: "Ocean Thermal Energy",
        w2: "Wave Oscillating Column",
        exp: "Tidal power plants like La Rance in France and Sihwa Lake in South Korea exploit the predictable twice-daily ocean tides caused by Moon gravitational pull."
      },
      {
        q: "What marine technology exploits the 20 °C temperature differential between warm tropical surface water and freezing deep seawater to drive heat engines?",
        correct: "Ocean Thermal Energy Conversion OTEC",
        w1: "Salinity Gradient Osmotic Power",
        w2: "Marine Current Turbine",
        exp: "OTEC evaporates low-boiling-point working fluids (like ammonia) with warm surface water to drive a vapor turbine, condensing the vapor with 4 °C deep seawater."
      }
    ],
    number: {
      q: "What is the total installed electrical generation capacity in gigawatts GW of the Three Gorges Dam in China, the world largest power station?",
      target: 22.5,
      unit: "gigawatts",
      imperial: "22.5 GW (22,500 MW)",
      exp: "The Three Gorges Dam has a total installed capacity of 22.5 gigawatts (22,500 MW), consisting of 32 main Francis turbines of 700 MW each plus two 50 MW generators."
    }
  },

  // Cycle 4: Geothermal Energy & Deep Earth Heat
  {
    mcqs: [
      {
        q: "What horseshoe-shaped volcanic belt encircling the Pacific Ocean contains the majority of the world high-temperature geothermal energy resources?",
        correct: "The Pacific Ring of Fire",
        w1: "Mid-Atlantic Ridge",
        w2: "East African Rift",
        exp: "Subduction zone volcanism along the Ring of Fire creates shallow subterranean magma chambers that heat groundwater into geothermal reservoirs."
      },
      {
        q: "What island nation generates nearly 100 percent of its electricity from renewable sources, using volcanic geothermal steam for over 25% of power and 90% of heating?",
        correct: "Iceland",
        w1: "New Zealand",
        w2: "Norway",
        exp: "Located astride the Mid-Atlantic Ridge and a volcanic mantle plume, Iceland harnesses geothermal energy for district heating, greenhouse farming, and aluminum smelting."
      },
      {
        q: "What most common geothermal plant type expands high-pressure hydrothermal fluid above 180 °C into low-pressure separator flash tanks to drive steam turbines?",
        correct: "Flash Steam Power Plant",
        w1: "Dry Steam Power Plant",
        w2: "Binary Cycle Plant",
        exp: "As the deep pressurized water ascends and pressure drops, it flashes into steam that drives the turbine generator before remaining water is reinjected."
      },
      {
        q: "What advanced geothermal technology injects pressurized fluid into deep, impermeable hot dry crystalline rocks to engineer artificial permeable reservoirs?",
        correct: "Enhanced Geothermal Systems EGS",
        w1: "Hydrothermal Siphon",
        w2: "Downhole Vapor Loop",
        exp: "EGS unlocks geothermal energy virtually anywhere on Earth by drilling 3 to 5 km deep, hydraulically fracturing hot granite, and circulating water through the fractures."
      },
      {
        q: "What geothermal plant type uses a secondary organic working fluid with a lower boiling point than water (like isobutane) to extract power from moderate-heat water?",
        correct: "Binary Cycle Power Plant",
        w1: "Flash Separator",
        w2: "Open Evaporation Cycle",
        exp: "Geothermal water passes through a heat exchanger to vaporize the organic fluid in a closed loop, releasing zero atmospheric emissions."
      }
    ],
    number: {
      q: "What extreme temperature in degrees Celsius was reached by deep supercritical volcanic geothermal reservoirs tapped by the Iceland Deep Drilling Project IDDP?",
      target: 450,
      unit: "celsius",
      imperial: "450 °C (842 °F)",
      exp: "The IDDP-1 well accidentally drilled into molten rhyolite magma at 2.1 km depth, producing supercritical steam at 450 °C capable of generating 36 MW of power."
    }
  },

  // Cycle 5: Nuclear Fission: Physics & Modern Reactors
  {
    mcqs: [
      {
        q: "What naturally occurring fissile uranium isotope constitutes only 0.7 percent of natural uranium ore and is enriched to 3 to 5 percent for commercial power reactors?",
        correct: "Uranium-235",
        w1: "Uranium-238",
        w2: "Thorium-232",
        exp: "Uranium-235 is the only naturally occurring primordial isotope capable of sustaining a thermal-neutron nuclear fission chain reaction."
      },
      {
        q: "What material in a nuclear reactor core slows down fast fission neutrons into thermal neutrons so they can be captured by Uranium-235 nuclei?",
        correct: "Neutron Moderator (Light Water, Heavy Water, or Graphite)",
        w1: "Boron Control Rods",
        w2: "Zirconium Cladding",
        exp: "Elastic collisions with light atoms like hydrogen in water or carbon in graphite slow neutrons from 2 MeV down to thermal energy (0.025 eV), increasing fission cross-section."
      },
      {
        q: "What neutron-absorbing chemical elements are fabricated into movable control rods to regulate or safely shut down a nuclear reactor chain reaction?",
        correct: "Boron, Cadmium, and Hafnium",
        w1: "Zirconium and Titanium",
        w2: "Beryllium and Lead",
        exp: "Boron-10 has a massive thermal neutron capture cross-section (3,840 barns); inserting control rods absorbs neutrons and subdues the nuclear chain reaction."
      },
      {
        q: "What factory-manufactured nuclear reactor category produces power outputs under 300 MWe, featuring passive safety systems and modular deployment?",
        correct: "Small Modular Reactors SMRs",
        w1: "Pressurized Water Reactors PWR",
        w2: "Boiling Water Reactors BWR",
        exp: "SMRs offer lower upfront capital costs, containment underground, and passive gravity/convection cooling that prevents core meltdowns even during total power loss."
      },
      {
        q: "What advanced nuclear reactor design breeds more fissile material (like Plutonium-239 from Uranium-238) than it consumes, utilizing unmoderated fast neutrons?",
        correct: "Fast Breeder Reactor FBR",
        w1: "CANDU Heavy Water Reactor",
        w2: "Advanced Gas-Cooled Reactor",
        exp: "Fast breeder reactors utilize liquid sodium metal cooling to avoid neutron moderation, converting abundant fertile U-238 into fissile Pu-239 to multiply fuel reserves by 60x."
      }
    ],
    number: {
      q: "What percentage concentration of Uranium-235 is typical for low-enriched nuclear fuel used in commercial civilian light-water power reactors?",
      target: 5,
      unit: "percent",
      imperial: "3% to 5% U-235 enrichment",
      exp: "Commercial nuclear power plants typically use fuel enriched to between 3% and 5% Uranium-235, far below the 90%+ enrichment required for nuclear weapons."
    }
  },

  // Cycle 6: Nuclear Fusion: Powering the Future
  {
    mcqs: [
      {
        q: "What international mega-science nuclear fusion experiment under construction in Cadarache, France is the world largest magnetic confinement tokamak?",
        correct: "ITER International Thermonuclear Experimental Reactor",
        w1: "JET Joint European Torus",
        w2: "Wendelstein 7-X",
        exp: "ITER is designed to produce 500 megawatts of fusion power from 50 megawatts of input heating ($Q=10$), demonstrating magnetic confinement feasibility."
      },
      {
        q: "What two heavy hydrogen isotopes are the primary fuel reactants utilized for first-generation commercial magnetic confinement nuclear fusion?",
        correct: "Deuterium and Tritium",
        w1: "Protium and Deuterium",
        w2: "Helium-3 and Boron-11",
        exp: "The D-T reaction ($^2H + ^3H \\to {}^4He + n + 17.6\\text{ MeV}$) has the largest fusion cross-section at the lowest achievable plasma temperatures (~150 million °C)."
      },
      {
        q: "What donut-shaped magnetic chamber uses powerful magnetic fields generated by external coils and internal plasma current to confine superheated fusion plasma?",
        correct: "Tokamak",
        w1: "Stellarator",
        w2: "Z-Pinch Array",
        exp: "Invented by Soviet physicists Igor Tamm and Andrei Sakharov in the 1950s, tokamaks create helical magnetic field lines to prevent charged ions from drifting into walls."
      },
      {
        q: "What complex fusion reactor design utilizes twisted, computer-modeled modular superconducting magnet coils to confine plasma stably without internal current?",
        correct: "Stellarator Wendelstein 7-X",
        w1: "Spheromak",
        w2: "Magnetic Mirror",
        exp: "The Wendelstein 7-X stellarator in Germany uses 50 non-planar superconducting magnet coils to achieve steady-state plasma confinement without disruptive current disruptions."
      },
      {
        q: "What US facility achieved net fusion energy gain (target gain Q > 1) in December 2022 by focusing 192 powerful laser beams at a diamond fuel capsule?",
        correct: "National Ignition Facility NIF",
        w1: "Omega Laser Facility",
        w2: "SLAC National Accelerator",
        exp: "NIF delivered 2.05 megajoules of laser energy to compress a D-T hohlraum pellet, producing 3.15 megajoules of fusion yield in a historic ignition milestone."
      }
    ],
    number: {
      q: "What extreme core plasma temperature in million degrees Celsius is required inside a tokamak to achieve sustained Deuterium-Tritium fusion?",
      target: 150,
      unit: "million celsius",
      imperial: "150 million °C (10x Sun core)",
      exp: "Because Earth fusion reactors lack the immense gravitational pressure of the Sun, tokamak plasma must be heated to 150 million °C (10 times hotter than the Sun core)."
    }
  },

  // Cycle 7: Grid Energy Storage & Battery Chemistry
  {
    mcqs: [
      {
        q: "What dominant electrochemical battery technology powers modern electric vehicles and utility grid storage, recognized with the 2019 Nobel Prize in Chemistry?",
        correct: "Lithium-Ion Batteries",
        w1: "Lead-Acid Batteries",
        w2: "Nickel-Cadmium Batteries",
        exp: "Developed by John Goodenough, Stanley Whittingham, and Akira Yoshino, lithium intercalation between graphite anodes and metal oxide cathodes offers high energy density."
      },
      {
        q: "What stationary grid battery technology stores electrical energy in two external liquid electrolyte tanks containing dissolved vanadium ions?",
        correct: "Vanadium Redox Flow Battery VRFB",
        w1: "Sodium-Sulfur Battery",
        w2: "Nickel-Iron Edison Cell",
        exp: "Flow batteries decouple energy capacity (tank volume) from power output (membrane stack area), suffering almost zero degradation over 20,000+ charge cycles."
      },
      {
        q: "What emerging battery technology replaces flammable liquid organic electrolytes with solid ceramic, glass, or polymer ion conductors for higher safety and density?",
        correct: "Solid-State Battery",
        w1: "Metal-Air Battery",
        w2: "Molten Salt Battery",
        exp: "Solid-state batteries prevent dendrite formation, enabling the use of pure lithium metal anodes that could double electric vehicle driving ranges."
      },
      {
        q: "What mechanical energy storage system stores kinetic energy in high-speed carbon-fiber rotors spinning up to 60,000 rpm inside magnetic levitation vacuums?",
        correct: "Flywheel Energy Storage",
        w1: "Compressed Gas Cylinder",
        w2: "Gravity Rail Storage",
        exp: "Flywheels provide millisecond-fast grid frequency stabilization and instantaneous peak power balancing with millions of charge-discharge cycles."
      },
      {
        q: "What large-scale grid storage concept compresses ambient air into underground sealed salt caverns, expanding it through turbines when peak power is needed?",
        correct: "Compressed Air Energy Storage CAES",
        w1: "Pumped Thermal Storage",
        w2: "Cryogenic Liquefaction",
        exp: "CAES systems store hundreds of megawatt-hours of energy in cavernous geological salt domes, providing long-duration bulk grid balancing."
      }
    ],
    number: {
      q: "What is the typical round-trip energy efficiency percentage achieved by modern utility-scale lithium-ion battery energy storage systems?",
      target: 90,
      unit: "percent",
      imperial: "85% to 92% round-trip efficiency",
      exp: "Modern lithium-ion grid battery installations deliver round-trip AC-to-AC efficiency of approximately 85 to 92 percent (commonly referenced as ~90%)."
    }
  },

  // Cycle 8: Hydrogen Economy & Fuel Cells
  {
    mcqs: [
      {
        q: "What electrochemical process splits liquid water molecules (H2O) into pure hydrogen and oxygen gases by passing an electric current through an electrolyte?",
        correct: "Water Electrolysis",
        w1: "Steam Methane Reforming",
        w2: "Methane Pyrolysis",
        exp: "Electrolyzers like Proton Exchange Membrane (PEM) and Alkaline systems use electricity to break chemical bonds without producing carbon emissions."
      },
      {
        q: "What color code designates hydrogen gas produced via water electrolysis powered entirely by zero-carbon renewable energy sources like wind and solar?",
        correct: "Green Hydrogen",
        w1: "Blue Hydrogen",
        w2: "Grey Hydrogen",
        exp: "Green hydrogen produces zero lifecycle greenhouse gas emissions, whereas grey hydrogen is made from unabated fossil fuels and blue hydrogen uses carbon capture."
      },
      {
        q: "What electrochemical device converts the chemical energy of hydrogen fuel and oxygen directly into clean electricity, heat, and water with zero emissions?",
        correct: "Proton-Exchange Membrane Fuel Cell PEMFC",
        w1: "Internal Combustion Engine",
        w2: "Stirling Thermal Engine",
        exp: "In a PEM fuel cell, hydrogen splits into protons and electrons at the platinum anode; electrons flow through an external circuit while protons cross the membrane to form water."
      },
      {
        q: "What industrial chemical process currently accounts for approximately 95 percent of global hydrogen production, reacting natural gas with high-pressure steam?",
        correct: "Steam Methane Reforming SMR",
        w1: "Chlor-Alkali Process",
        w2: "Biomass Gasification",
        exp: "SMR reacts methane with steam at 900 °C ($CH_4 + H_2O \\to CO + 3H_2$), releasing approximately 9 to 12 tons of carbon dioxide per ton of hydrogen produced."
      },
      {
        q: "What carbon-free chemical carrier synthesized from green hydrogen and atmospheric nitrogen is emerging as a primary fuel for zero-carbon cargo shipping?",
        correct: "Green Ammonia NH3",
        w1: "E-Methanol",
        w2: "Formic Acid",
        exp: "Ammonia liquifies at -33 °C (compared to -253 °C for hydrogen), making it far easier to transport in bulk across international maritime shipping routes."
      }
    ],
    number: {
      q: "What is the specific energy density in megajoules per kilogram MJ/kg of hydrogen fuel, nearly three times higher than gasoline?",
      target: 120,
      unit: "MJ/kg",
      imperial: "120 to 142 MJ/kg",
      exp: "Hydrogen has the highest energy content by weight of any common fuel at 120 MJ/kg (lower heating value) compared to 44 MJ/kg for gasoline."
    }
  },

  // Cycle 9: Biomass, Biofuels & Thermal Solar
  {
    mcqs: [
      {
        q: "What advanced second-generation biofuel is produced from non-food agricultural waste residues like corn stover and switchgrass cellulose?",
        correct: "Cellulosic Ethanol",
        w1: "Corn Grain Ethanol",
        w2: "Palm Oil Biodiesel",
        exp: "Cellulosic ethanol utilizes enzymatic hydrolysis to break down non-edible plant cell walls into fermentable sugars, avoiding competition with human food supplies."
      },
      {
        q: "What biological decomposition process breaks down agricultural manure, sewage, and food waste in the absence of oxygen to produce renewable methane biogas?",
        correct: "Anaerobic Digestion",
        w1: "Aerobic Composting",
        w2: "Thermal Gasification",
        exp: "Methanogenic archaea inside sealed anaerobic digesters convert organic sludge into biogas (60% methane, 40% CO2), which can be upgraded to renewable natural gas."
      },
      {
        q: "What high-temperature heat storage medium is utilized in commercial concentrated solar towers to store thermal energy at 565 °C for overnight power generation?",
        correct: "Molten Nitrate Salts",
        w1: "Synthetic Hydrocarbon Oil",
        w2: "Liquid Lead-Bismuth",
        exp: "A mixture of 60% sodium nitrate and 40% potassium nitrate stores vast thermal energy in insulated tanks, allowing CSP plants to generate baseload power 24/7."
      },
      {
        q: "What thermochemical conversion process heats dry biomass in an oxygen-free reactor to produce bio-oil, synthesis gas, and carbon-sequestering biochar?",
        correct: "Pyrolysis",
        w1: "Hydrothermal Liquefaction",
        w2: "Torrefaction",
        exp: "Fast pyrolysis rapidly heats biomass to 500 °C in seconds, producing liquid bio-oil that can be refined into sustainable aviation fuels."
      },
      {
        q: "What microscopic photosynthetic aquatic organisms can produce up to 10 times more lipid fuel oil per hectare than traditional terrestrial oilseed crops?",
        correct: "Microalgae",
        w1: "Duckweed",
        w2: "Giant Kelp",
        exp: "Microalgae like Chlorella and Nannochloropsis accumulate lipids up to 50% of their dry cellular weight, growing rapidly in non-arable saline bioreactors."
      }
    ],
    number: {
      q: "How many hours of thermal energy storage can modern molten-salt concentrated solar power plants provide to dispatch electricity through the night?",
      target: 15,
      unit: "hours",
      imperial: "10 to 15 hours of storage",
      exp: "Flagship CSP projects like Cerro Dominador in Chile and Noor Energy 1 in Dubai feature molten-salt tanks providing up to 15 hours of continuous full-power generation after sunset."
    }
  },

  // Cycle 10: Smart Grids, Carbon Capture & Transmission
  {
    mcqs: [
      {
        q: "What electrical transmission technology enables efficient, bulk power transmission across thousands of kilometers with significantly lower line losses than AC lines?",
        correct: "High-Voltage Direct Current HVDC",
        w1: "High-Voltage Alternating Current HVAC",
        w2: "Superconducting Single-Phase Grid",
        exp: "HVDC eliminates reactive power losses and skin effects over long distances, connecting remote offshore wind farms and deserts directly to urban centers."
      },
      {
        q: "What atmospheric technology extracts carbon dioxide directly from ambient outdoor air using chemical sorbent filters or liquid potassium hydroxide contactors?",
        correct: "Direct Air Capture DAC",
        w1: "Flue Gas Amine Scrubber",
        w2: "Oxy-Fuel Combustion",
        exp: "Commercial DAC facilities like Orca and Mammoth in Iceland capture atmospheric CO2 and dissolve it in water to inject it into subterranean basalt where it mineralizes into stone."
      },
      {
        q: "What modern electrical grid infrastructure uses digital communications, IoT sensors, and automated switching to dynamically balance distributed intermittent renewables?",
        correct: "Smart Grid",
        w1: "Radial Grid",
        w2: "Passive Mesh Network",
        exp: "Smart grids utilize automated demand response, smart meters, and battery orchestration to manage bidirectional power flows from rooftop solar and electric vehicles."
      },
      {
        q: "What deep geological formations represent the largest global capacity for permanently sequestering millions of tons of captured supercritical CO2?",
        correct: "Deep Saline Aquifers",
        w1: "Depleted Coal Seams",
        w2: "Unmined Salt Caverns",
        exp: "Deep saline aquifers located thousands of meters underground beneath impermeable caprock offer thousands of gigatons of permanent carbon mineralization capacity."
      },
      {
        q: "What zero-resistance electrical conductors cooled by liquid nitrogen are deployed in compact urban conduits to transmit huge power loads with zero resistive heat loss?",
        correct: "High-Temperature Superconducting HTS Cables",
        w1: "Graphene Ribbon Braids",
        w2: "Carbon Nanotube Traces",
        exp: "HTS cables composed of YBCO ceramic tapes conduct five times more electrical current than copper cables of the same diameter with zero ohmic resistance."
      }
    ],
    number: {
      q: "Approximately what percentage of global electricity generation was generated from renewable sources (hydro, solar, wind, bio, geo) as of 2024?",
      target: 30,
      unit: "percent",
      imperial: "30% of global electricity",
      exp: "According to global energy think tanks like Ember and the IEA, renewable energy surpassed 30 percent of worldwide electricity generation for the first time in 2023-2024."
    }
  }
];

buildQuiz({
  id: 'renewable-energy-future-power-60',
  theme: 'Powering Civilization: Nuclear, Fusion & Renewable Energy',
  title: 'Powering Civilization: Nuclear, Fusion & Renewable Energy',
  description: 'A 60-question grand master assessment exploring solar photovoltaic limits, wind aerodynamics, geothermal, nuclear fission, tokamak fusion, and green hydrogen.',
  category: 'Astronomy, Physics & Chemistry',
  difficulty: 'moderate'
}, energyCycles);

console.log('Finished generating Quizzes 13, 14, 15!');
