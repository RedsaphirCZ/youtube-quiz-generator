const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// Volume 9: general-knowledge-vol9-60
// Theme: "General Knowledge Vol 9: Global Heritage, Human Feats & Natural Phenomena"
// Category: "Sports, Records & General Knowledge"
// =========================================================================
const vol9Cycles = [
  // Cycle 1: Atmospheric Optics & Meteorological Wonders
  {
    mcqs: [
      {
        q: "What luminous atmospheric phenomenon is caused by solar wind charged particles colliding with oxygen and nitrogen in the upper atmosphere?",
        correct: "Aurora Borealis and Australis",
        w1: "Airglow Emission",
        w2: "Zodiacal Glow",
        exp: "Charged particles funneled by Earth magnetic field excite atmospheric atoms, releasing green light from oxygen and red-purple light from nitrogen."
      },
      {
        q: "What rare optical phenomenon occurs immediately after sunset or before sunrise when atmospheric refraction splits sunlight, showing a momentary emerald hue?",
        correct: "Green Flash",
        w1: "Brocken Spectre",
        w2: "Alpenglow",
        exp: "Atmospheric dispersion bends shorter wavelengths of light more strongly, allowing green light to remain visible for one to two seconds after the solar disc sinks."
      },
      {
        q: "What optical effect creates bright mock sun spots on either side of the real Sun due to sunlight refracting through hexagonal ice crystals in cirrus clouds?",
        correct: "Sun Dogs Parhelia",
        w1: "Crepuscular Rays",
        w2: "Glory Corona",
        exp: "Parhelia form at exactly twenty-two degrees azimuth on either side of the Sun when plate-shaped ice crystals drift horizontally."
      },
      {
        q: "What weather phenomenon produces a continuous glow of luminous plasma on pointed objects during electrical storms, named after the patron saint of sailors?",
        correct: "St. Elmo Fire",
        w1: "Ball Lightning",
        w2: "Sprite Discharge",
        exp: "St. Elmo Fire is a coronal discharge that occurs when a sharp conductor creates an intense localized electrical field in storm conditions."
      },
      {
        q: "What colossal transient luminous events flash red for milliseconds high above thunderstorm clouds in the mesosphere up to 90 kilometers altitude?",
        correct: "Red Sprites",
        w1: "Blue Jets",
        w2: "Elves",
        exp: "Red sprites are large-scale electrical discharges triggered by positive cloud-to-ground lightning strikes below, exciting nitrogen molecules."
      }
    ],
    number: {
      q: "What is the approximate peak temperature in kelvins reached inside a return stroke lightning channel?",
      target: 30000,
      unit: "kelvins",
      imperial: "53,540 degrees Fahrenheit",
      exp: "A lightning channel heats surrounding air to approximately 30,000 kelvins in microseconds, roughly five times hotter than the surface of the Sun."
    }
  },

  // Cycle 2: Ancient Silk Road, Spice Routes & Historic Trade
  {
    mcqs: [
      {
        q: "Which Han dynasty diplomat and explorer was dispatched to Central Asia in 138 BCE, initiating the formal opening of the Silk Road?",
        correct: "Zhang Qian",
        w1: "Ban Chao",
        w2: "Faxian",
        exp: "Zhang Qian traveled west to form alliances with the Yuezhi, returning with valuable geographical intelligence, heavenly horses, and trade connections."
      },
      {
        q: "Which strategic maritime strait between the Malay Peninsula and Sumatra served as the central maritime choke point connecting Indian and Chinese trade?",
        correct: "Strait of Malacca",
        w1: "Sunda Strait",
        w2: "Lombok Strait",
        exp: "The Strait of Malacca funneled cloves, nutmeg, silk, and porcelain between East Asia, India, and the Islamic world for over a thousand years."
      },
      {
        q: "Which medieval confederation of merchant guilds and market towns dominated maritime trade along the Baltic and North Sea coasts from the 12th to 17th century?",
        correct: "Hanseatic League",
        w1: "Venetian Guilds",
        w2: "Swabian League",
        exp: "Headquartered in Lübeck, the Hanseatic League protected merchant privileges and maintained trade outposts from London to Novgorod."
      },
      {
        q: "Which aromatic tree resin harvested in southern Arabia and the Horn of Africa was transported along ancient caravan routes to Mediterranean temples?",
        correct: "Frankincense",
        w1: "Myrrh",
        w2: "Amber",
        exp: "Boswellia tree resin was transported along the Incense Route through Petra and the Nabataean kingdom, commanding prices equal to gold."
      },
      {
        q: "Which ancient trade route transported fossilized tree resin from the Baltic Sea coast across Central Europe to the Mediterranean civilizations?",
        correct: "Amber Road",
        w1: "Salt Route",
        w2: "Tin Highway",
        exp: "Baltic amber was prized by Roman emperors, Greeks, and Egyptians for its warm golden luster and static electrical properties."
      }
    ],
    number: {
      q: "In what year BCE was Han envoy Zhang Qian first dispatched westward, initiating the development of the Silk Road?",
      target: 138,
      unit: "BCE",
      imperial: "138 BC",
      exp: "Emperor Wu of Han sent Zhang Qian westward in 138 BCE to establish contact with Central Asian kingdoms."
    }
  },

  // Cycle 3: Immunology, Vaccines & Medical Revolutions
  {
    mcqs: [
      {
        q: "Which English physician developed the world first successful vaccine in 1796 using cowpox to confer immunity against deadly smallpox?",
        correct: "Edward Jenner",
        w1: "John Snow",
        w2: "Joseph Lister",
        exp: "Jenner inoculated eight-year-old James Phipps with cowpox lesions, laying the foundation of modern immunology."
      },
      {
        q: "Which Scottish physician discovered the antibacterial properties of Penicillium notatum mold in 1928, discovering the first true antibiotic?",
        correct: "Alexander Fleming",
        w1: "Howard Florey",
        w2: "Ernst Chain",
        exp: "Fleming noticed a halo of inhibited Staphylococcus growth around an accidental mold contaminant in his St. Mary Hospital laboratory."
      },
      {
        q: "Which French microbiologist developed rabies and anthrax vaccines and formulated the germ theory of disease alongside Robert Koch?",
        correct: "Louis Pasteur",
        w1: "Robert Koch",
        w2: "Paul Ehrlich",
        exp: "Pasteur introduced pasteurization to eliminate microbes in liquids and successfully treated nine-year-old Joseph Meister for rabies in 1885."
      },
      {
        q: "Which American virologist developed the first effective inactivated polio vaccine in 1953, famously refusing to patent it?",
        correct: "Jonas Salk",
        w1: "Albert Sabin",
        w2: "Maurice Hilleman",
        exp: "When asked who owned the patent on the polio vaccine, Salk famously answered: Well, the people, I would say. There is no patent. Could you patent the Sun?"
      },
      {
        q: "Which white blood cells mature in the thymus gland and coordinate cell-mediated immune responses against viral infections and tumors?",
        correct: "T Lymphocytes T Cells",
        w1: "B Lymphocytes",
        w2: "Neutrophils",
        exp: "T cells include cytotoxic killer cells and helper T cells, which recognize foreign antigens presented by major histocompatibility complexes."
      }
    ],
    number: {
      q: "In what year did Edward Jenner successfully administer the world first smallpox vaccination using cowpox fluid?",
      target: 1796,
      unit: "year",
      imperial: "1796 AD",
      exp: "Edward Jenner conducted his groundbreaking vaccination experiment in Berkeley, England, on May 14, 1796."
    }
  },

  // Cycle 4: Tropical Rainforests, Canopy Ecology & Mega-Biodiversity
  {
    mcqs: [
      {
        q: "Which parasitic plant native to Southeast Asian rainforests produces the largest individual flower on Earth, spanning up to 100 centimeters?",
        correct: "Rafflesia arnoldii",
        w1: "Titan Arum",
        w2: "Nepenthes rajah",
        exp: "Rafflesia arnoldii has no leaves, roots, or stem, emitting a rotting corpse stench to attract pollinating carrion flies in Sumatran rainforests."
      },
      {
        q: "Which South American river basin contains the world largest tropical rainforest, producing roughly twenty percent of the river water entering Earth oceans?",
        correct: "Amazon Basin",
        w1: "Congo Basin",
        w2: "Orinoco Basin",
        exp: "The Amazon basin encompasses over six million square kilometers across nine nations, harboring one in ten known species on Earth."
      },
      {
        q: "What non-parasitic plants grow harmlessly on other trees in the rainforest canopy to reach sunlight, absorbing moisture directly from air and rain?",
        correct: "Epiphytes",
        w1: "Saprophytes",
        w2: "Mycorrhizae",
        exp: "Epiphytes such as bromeliads, orchids, and ferns create intricate aerial micro-ecosystems high in the tropical canopy."
      },
      {
        q: "Which brightly colored neotropical amphibians sequester toxic batrachotoxins from their diet of wild ants and mites to deter predators?",
        correct: "Poison Dart Frogs",
        w1: "Tree Frogs",
        w2: "Glass Frogs",
        exp: "Indigenous hunters in Colombia used the skin secretions of the golden poison frog Phyllobates terribilis to coat blowgun hunting darts."
      },
      {
        q: "What social insect species cultivate underground fungal gardens using fresh green foliage harvested from rainforest canopies?",
        correct: "Leafcutter Ants",
        w1: "Army Ants",
        w2: "Driver Ants",
        exp: "Leafcutter ants of the genera Atta and Acromyrmex cut leaves and carry them underground to farm specialized Leucoagaricus fungi for colony food."
      }
    ],
    number: {
      q: "What is the maximum flower diameter in centimeters reached by the giant rainforest blossom Rafflesia arnoldii?",
      target: 100,
      unit: "centimeters",
      imperial: "39.4 inches (over 3 feet)",
      exp: "Specimens of Rafflesia arnoldii can measure up to 100 centimeters in diameter and weigh as much as ten kilograms."
    }
  },

  // Cycle 5: Cartography, Prime Meridians & Historic Navigation
  {
    mcqs: [
      {
        q: "Which 1569 cylindrical map projection represents lines of constant compass course as straight rhumb lines, revolutionizing sea navigation?",
        correct: "Mercator Projection",
        w1: "Peters Projection",
        w2: "Robinson Projection",
        exp: "Flemish cartographer Gerardus Mercator preserved local angles and shapes, though it increasingly distorts land area toward the polar regions."
      },
      {
        q: "In which city observatory was the international Prime Meridian (Zero Degrees Longitude) officially established during an 1884 conference?",
        correct: "Greenwich London",
        w1: "Paris Observatory",
        w2: "Washington D.C.",
        exp: "The International Meridian Conference in Washington D.C. selected the transit instrument at the Royal Observatory Greenwich as the universal zero meridian."
      },
      {
        q: "Which English carpenter and self-taught clockmaker solved the Longitude Problem by creating the ultra-precise H4 marine chronometer in 1761?",
        correct: "John Harrison",
        w1: "Thomas Mudge",
        w2: "George Graham",
        exp: "Harrison marine watch kept time at sea within fractions of a second over transatlantic voyages, allowing navigators to calculate longitude accurately."
      },
      {
        q: "Which 1507 world map created by German cartographer Martin Waldseemüller was the first map in history to use the name America?",
        correct: "Universalis Cosmographia",
        w1: "Cantino Planisphere",
        w2: "Fra Mauro Map",
        exp: "Waldseemüller honored explorer Amerigo Vespucci by applying America to the southern continent on his monumental twelve-panel woodcut wall map."
      },
      {
        q: "What ancient navigational instrument used by mariners and astronomers calculated latitude by measuring the altitude of the Sun or North Star?",
        correct: "Astrolabe",
        w1: "Chronometer",
        w2: "Cross-staff",
        exp: "The mariner astrolabe was a heavy brass ring designed to swing plumb in sea breezes while navigators sighted celestial bodies through a rotating alidade."
      }
    ],
    number: {
      q: "In what year did the International Meridian Conference officially adopt the Greenwich Meridian as the international Prime Meridian?",
      target: 1884,
      unit: "year",
      imperial: "1884 AD",
      exp: "Representatives from twenty-five nations convened in October 1884 to establish Greenwich as the global standard for longitude and universal time."
    }
  },

  // Cycle 6: Superconductors, Cryogenics & Quantum States
  {
    mcqs: [
      {
        q: "Which Dutch physicist discovered superconductivity in 1911 by cooling liquid mercury down to 4.2 kelvins with liquid helium?",
        correct: "Heike Kamerlingh Onnes",
        w1: "Johannes van der Waals",
        w2: "Hendrik Lorentz",
        exp: "Kamerlingh Onnes observed electrical resistance in mercury drop to absolute zero at cryogenic temperatures, earning the 1913 Nobel Prize in Physics."
      },
      {
        q: "What phenomenon describes the complete expulsion of magnetic fields from the interior of a superconductor during its transition to the superconducting state?",
        correct: "Meissner Effect",
        w1: "Zeeman Effect",
        w2: "Kondo Effect",
        exp: "Discovered by Walther Meissner and Robert Ochsenfeld in 1933, this perfect diamagnetism allows high-temperature superconductors to levitate above magnets."
      },
      {
        q: "What state of matter formed near absolute zero causes separate atoms to coalesce into a single macroscopic quantum wave?",
        correct: "Bose-Einstein Condensate",
        w1: "Degenerate Plasma",
        w2: "Quark-Gluon Plasma",
        exp: "Predicted by Satyendra Nath Bose and Albert Einstein, the first gaseous condensate was synthesized in 1995 using rubidium atoms by Cornell and Wieman."
      },
      {
        q: "What is the theoretical temperature of Absolute Zero in degrees Celsius, at which all classical thermodynamic motion ceases?",
        correct: "Minus 273.15 Degrees Celsius",
        w1: "Minus 250.00 Degrees Celsius",
        w2: "Minus 300.00 Degrees Celsius",
        exp: "Absolute zero corresponds to zero kelvins, where the thermodynamic enthalpy and entropy of a cooled ideal gas reach minimum zero-point values."
      },
      {
        q: "Which ceramic materials discovered by Bednorz and Müller in 1986 exhibit superconductivity above the boiling point of liquid nitrogen (77 K)?",
        correct: "Cuprates",
        w1: "Silicides",
        w2: "Borides",
        exp: "High-temperature copper-oxide superconductors like YBCO revolutionized cryogenic engineering by operating with inexpensive liquid nitrogen."
      }
    ],
    number: {
      q: "In what year did Heike Kamerlingh Onnes first discover the phenomenon of superconductivity in mercury?",
      target: 1911,
      unit: "year",
      imperial: "1911 AD",
      exp: "Kamerlingh Onnes made his historic discovery on April 8, 1911, at the University of Leiden in the Netherlands."
    }
  },

  // Cycle 7: Legendary Bridges, Canals & Megastructure Engineering
  {
    mcqs: [
      {
        q: "Which 82-kilometer artificial waterway opened in 1914, connecting the Atlantic and Pacific Oceans across the Isthmus of Panama?",
        correct: "Panama Canal",
        w1: "Suez Canal",
        w2: "Kiel Canal",
        exp: "The Panama Canal utilizes a series of gravity-fed lock chambers that raise and lower container ships twenty-six meters over Lake Gatun."
      },
      {
        q: "Which iconic suspension bridge in San Francisco engineered by Joseph Strauss opened in 1937 with towering International Orange towers?",
        correct: "Golden Gate Bridge",
        w1: "Bay Bridge",
        w2: "Brooklyn Bridge",
        exp: "The Golden Gate Bridge spans 2,737 meters across the strait, designed to endure powerful Pacific gale winds and seismic shocks."
      },
      {
        q: "Which cable-stayed bridge in southern France designed by Norman Foster spans the Tarn River valley, standing as the tallest bridge structure on Earth?",
        correct: "Millau Viaduct",
        w1: "Vasco da Gama Bridge",
        w2: "Øresund Bridge",
        exp: "The Millau Viaduct reaches an architectural mast height of 343 meters, slightly taller than the Eiffel Tower."
      },
      {
        q: "What is the longest bridge in the world, a 164-kilometer high-speed railway viaduct in eastern China between Shanghai and Nanjing?",
        correct: "Danyang-Kunshan Grand Bridge",
        w1: "Changhua-Kaohsiung Viaduct",
        w2: "Lake Pontchartrain Causeway",
        exp: "Completed in 2010 on the Beijing-Shanghai High-Speed Railway, the bridge spans rivers, canals, lakes, and rice paddies on nine-meter pillars."
      },
      {
        q: "Which sea-level canal in Egypt opened in 1869, eliminating the need for ships to navigate around Africa Cape of Good Hope?",
        correct: "Suez Canal",
        w1: "Corinth Canal",
        w2: "Grand Canal",
        exp: "Engineered under Ferdinand de Lesseps, the 193-kilometer Suez Canal links the Mediterranean Sea to the Red Sea."
      }
    ],
    number: {
      q: "What is the approximate total length in kilometers of the Panama Canal waterway?",
      target: 82,
      unit: "kilometers",
      imperial: "51 miles",
      exp: "The Panama Canal stretches roughly 82 kilometers from shoreline to shoreline across the narrow Central American isthmus."
    }
  },

  // Cycle 8: Ethology, Animal Intelligence & Social Behavior
  {
    mcqs: [
      {
        q: "Which British primatologist revolutionized anthropology in 1960 by documenting wild chimpanzees modifying twigs to fish for termites in Gombe, Tanzania?",
        correct: "Jane Goodall",
        w1: "Dian Fossey",
        w2: "Birutė Galdikas",
        exp: "Jane Goodall discovery shattered the long-held belief that humans were the only tool-making species on Earth, leading Louis Leakey to redefine man."
      },
      {
        q: "Which Austrian ethologist decoded the waggle dance of honeybees, showing how bees communicate distance and direction to food sources?",
        correct: "Karl von Frisch",
        w1: "Konrad Lorenz",
        w2: "Nikolaas Tinbergen",
        exp: "Von Frisch shared the 1973 Nobel Prize in Physiology for demonstrating that the angle of the bee waggle relative to gravity indicates the Sun angle."
      },
      {
        q: "Which famous African Grey parrot studied by Dr. Irene Pepperberg demonstrated understanding of colors, shapes, quantities, and abstract concepts like none?",
        correct: "Alex",
        w1: "Koko",
        w2: "Washoe",
        exp: "Alex (Avian Language EXperiment) mastered over one hundred English words and could count items up to six with high conceptual accuracy."
      },
      {
        q: "Which bird family, including crows, ravens, and New Caledonian jays, is renowned for complex multi-step tool manufacture and causal reasoning?",
        correct: "Corvidae",
        w1: "Psittacidae",
        w2: "Falconidae",
        exp: "New Caledonian crows bend wires into hooks to retrieve food and demonstrate cognitive planning comparable to great apes."
      },
      {
        q: "What biological sensory system allows toothed whales and microbats to map their dark environment by emitting ultrasonic clicks and processing the echoes?",
        correct: "Echolocation",
        w1: "Magnetoreception",
        w2: "Thermoreception",
        exp: "Dolphins focus ultrasonic click trains through a lipid-filled acoustic melon in their forehead to detect fish burrows in ocean sediment."
      }
    ],
    number: {
      q: "In what year did Jane Goodall begin her pioneering field research on chimpanzees at Gombe Stream National Park in Tanzania?",
      target: 1960,
      unit: "year",
      imperial: "1960 AD",
      exp: "Jane Goodall arrived at the shores of Lake Tanganyika on July 14, 1960, beginning decades of groundbreaking primatological discoveries."
    }
  },

  // Cycle 9: Archaeology, Lost Inscriptions & Ancient Decipherment
  {
    mcqs: [
      {
        q: "Which granodiorite stele discovered in Egypt in 1799 provided the bilingual key that enabled Jean-François Champollion to decipher Egyptian hieroglyphs?",
        correct: "Rosetta Stone",
        w1: "Palermo Stone",
        w2: "Merneptah Stele",
        exp: "The Rosetta Stone contained a decree written in three scripts: Ancient Egyptian hieroglyphs, Demotic Egyptian, and Ancient Greek."
      },
      {
        q: "Which massive rock relief on Mount Behistun in Iran carved by Darius the Great provided the trilingual key to deciphering ancient cuneiform script?",
        correct: "Behistun Inscription",
        w1: "Narme Plate",
        w2: "Cyrus Cylinder",
        exp: "Sir Henry Rawlinson copied and translated the Old Persian, Elamite, and Babylonian texts carved on a high cliff face in the Zagros Mountains."
      },
      {
        q: "Which ancient Aegean script discovered at Knossos, Crete, was deciphered in 1952 by English architect Michael Ventris as an early form of Greek?",
        correct: "Linear B",
        w1: "Linear A",
        w2: "Phaistos Script",
        exp: "Ventris proved that Mycenaean Linear B was an archaic syllabic Greek dialect spoken five centuries before Homer epics."
      },
      {
        q: "Which collection of ancient Jewish religious manuscripts was discovered in eleven caves near Qumran on the Dead Sea between 1946 and 1956?",
        correct: "Dead Sea Scrolls",
        w1: "Nag Hammadi Library",
        w2: "Elephantine Papyri",
        exp: "The scrolls included biblical manuscripts, sectarian regulations, and apocrypha dating from the third century BCE to the first century CE."
      },
      {
        q: "Which sensational 1939 archaeological discovery in Suffolk, England, revealed an undisturbed 7th-century Anglo-Saxon ship burial containing rich treasures?",
        correct: "Sutton Hoo",
        w1: "Vindolanda",
        w2: "Star Carr",
        exp: "The Sutton Hoo burial included an iconic ceremonial iron helmet, gold cloisonné belt buckles, and Byzantine silver attributed to King Rædwald."
      }
    ],
    number: {
      q: "In what year did French scholar Jean-François Champollion announce his breakthrough decipherment of Egyptian hieroglyphs?",
      target: 1822,
      unit: "year",
      imperial: "1822 AD",
      exp: "Champollion presented his Lettre à M. Dacier to the Académie des Inscriptions et Belles-Lettres in Paris on September 27, 1822."
    }
  },

  // Cycle 10: Human Extremes, High Altitude Physiology & Survival Feats
  {
    mcqs: [
      {
        q: "In mountaineering physiology, what term designates the altitude above 8,000 meters where atmospheric oxygen is insufficient to sustain human life long-term?",
        correct: "The Death Zone",
        w1: "The Hypoxic Verge",
        w2: "The Cryosphere Line",
        exp: "Above 8,000 meters, human cellular metabolism deteriorates faster than the body can replenish oxygen, risking cerebral and pulmonary edema."
      },
      {
        q: "Which Italian mountaineer made the historic first ascent of Mount Everest without supplemental oxygen alongside Peter Habeler in 1978?",
        correct: "Reinhold Messner",
        w1: "Walter Bonatti",
        w2: "Edmund Hillary",
        exp: "Messner proved humans could survive the summit of Everest purely on acclimatization, and later became the first to climb all fourteen 8,000-meter peaks."
      },
      {
        q: "Which Serbian flight attendant survived a catastrophic 10,160-meter fall without a parachute after JAT Flight 367 exploded in 1972?",
        correct: "Vesna Vulović",
        w1: "Juliane Koepcke",
        w2: "Larisa Savitskaya",
        exp: "Vulović was pinned by a food cart in the tail section, which crash-landed onto snowy pine trees on a steep Czech mountainside."
      },
      {
        q: "What physiological response in humans and marine mammals lowers heart rate and redirects blood to vital organs when the face contacts cold water?",
        correct: "Mammalian Dive Reflex",
        w1: "Vasomotor Flush",
        w2: "Hypothermic Reset",
        exp: "The dive reflex triggers bradycardia and peripheral vasoconstriction, conserving oxygen stores for deep freediving."
      },
      {
        q: "How many mountains on Earth have summits exceeding the lethal 8,000-meter elevation threshold, all located in the Himalaya and Karakoram?",
        correct: "14 Peaks",
        w1: "10 Peaks",
        w2: "18 Peaks",
        exp: "The fourteen eight-thousanders include Everest, K2, Kangchenjunga, Lhotse, Makalu, Cho Oyu, Dhaulagiri, Manaslu, Nanga Parbat, Annapurna, and Gasherbrum."
      }
    ],
    number: {
      q: "What is the threshold elevation in meters above sea level that defines the mountaineering Death Zone?",
      target: 8000,
      unit: "meters",
      imperial: "26,247 feet",
      exp: "At 8,000 meters elevation, the atmospheric pressure is only about one-third of sea level pressure, preventing long-term human survival."
    }
  }
];

// Build Quiz 9
buildQuiz({
  id: 'general-knowledge-vol9-60',
  theme: 'General Knowledge Vol 9: Global Heritage, Human Feats & Natural Phenomena',
  title: 'General Knowledge Vol 9: Global Heritage, Human Feats & Natural Phenomena',
  description: 'A 60-question grand master assessment spanning atmospheric optics, ancient Silk Road trade, immunology breakthroughs, tropical rainforests, cartography, superconductors, megastructure engineering, animal intelligence, archaeological decipherment, and high-altitude physiology.',
  category: 'Sports, Records & General Knowledge',
  difficulty: 'moderate'
}, vol9Cycles);

console.log('Vol 9 successfully built!');
