const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 2. chile-geography-heritage-60
// =========================================================================
const chileCycles = [
  // Cycle 1: Geography, Extreme Dimensions & The Andes
  {
    mcqs: [
      {
        q: "What ribbon-shaped South American nation is the longest north-to-south country in the world, extending 4,300 kilometers while averaging only 177 kilometers in width?",
        correct: "Chile",
        w1: "Argentina",
        w2: "Peru",
        exp: "Stretching across thirty-eight degrees of latitude from the tropics to subantarctic ice, Chile is bounded by the high Andes to the east and the Pacific Ocean to the west."
      },
      {
        q: "What is the highest active volcano in the world and second highest peak in the Western Hemisphere, rising 6,893 meters on the border of Chile and Argentina?",
        correct: "Ojos del Salado Nevado Ojos del Salado",
        w1: "Mount Llullaillaco",
        w2: "Mount Guallatiri",
        exp: "Ojos del Salado is located in the Atacama region, home to the world highest permanent crater lake at an altitude of 6,390 meters."
      },
      {
        q: "What is the capital and largest city of Chile, situated in the central valley at 570 meters elevation beneath the snow-capped wall of the Andes?",
        correct: "Santiago Santiago de Chile",
        w1: "Valparaíso",
        w2: "Concepción",
        exp: "Founded in 1541 by Spanish conquistador Pedro de Valdivia on the Mapocho River, Santiago is home to over seven million residents (forty percent of Chile population)."
      },
      {
        q: "What 300-meter skyscraper in the Providencia district of Santiago is the tallest building in South America and second tallest in Latin America?",
        correct: "Gran Torre Santiago Costanera Center",
        w1: "Titanium La Portada",
        w2: "Torre Telefónica",
        exp: "Designed by Argentine-American architect César Pelli, the 64-story tower features the Sky Costanera observation deck offering 360-degree views of the Andes."
      },
      {
        q: "Which colorful, bohemian Pacific seaport city in Chile, built across forty-two steep hills with funicular elevators, is a UNESCO World Heritage site?",
        correct: "Valparaíso",
        w1: "Viña del Mar",
        w2: "La Serena",
        exp: "Known as the Jewel of the Pacific, Valparaíso was the primary Pacific stop for sailing ships rounding Cape Horn, home to Nobel poet Pablo Neruda house La Sebastiana."
      }
    ],
    number: {
      q: "What is the average east-to-west width in kilometers of mainland Chile between the Andes crest and the Pacific Ocean?",
      target: 177,
      unit: "kilometers",
      imperial: "110 miles wide",
      exp: "While extending over 4,300 kilometers from north to south, Chile has an average east-west width of just 177 kilometers (ranging from 64 to 350 km)."
    }
  },

  // Cycle 2: The Atacama Desert & Stargazing Capital
  {
    mcqs: [
      {
        q: "What 1,000-kilometer plateau desert in northern Chile is recognized as the driest non-polar desert on Earth, where some weather stations have never recorded rain?",
        correct: "Atacama Desert Desierto de Atacama",
        w1: "Sechura Desert",
        w2: "Monte Desert",
        exp: "Wedged between the coastal Cordillera de la Costa and the Andes, the Pacific cold Humboldt Current prevents cloud formation, creating hyper-arid conditions."
      },
      {
        q: "What percentage of the world total ground-based astronomical observation capacity is concentrated in the high, cloudless Atacama Desert observatories?",
        correct: "70 Percent",
        w1: "35 Percent",
        w2: "90 Percent",
        exp: "Over three hundred clear nights per year, extreme dryness, and high altitude make the Atacama the premier global astronomical observatory hub (ALMA, VLT, ELT)."
      },
      {
        q: "What revolutionary radio telescope array of sixty-six high-precision parabolic antennas sits on the 5,000-meter Chajnantor Plateau in the Atacama Desert?",
        correct: "ALMA Atacama Large Millimeter Array",
        w1: "Very Large Telescope VLT",
        w2: "Extremely Large Telescope ELT",
        exp: "ALMA studies cosmic dust clouds, planet formation, and distant early galaxies, operated internationally by ESO, the US National Science Foundation, and Japan."
      },
      {
        q: "What surreal geological depression in the Atacama Desert near San Pedro de Atacama features wind-sculpted salt, gypsum, and clay ridges resembling lunar terrain?",
        correct: "Valle de la Luna Moon Valley",
        w1: "Valle de la Muerte Death Valley",
        w2: "Salar de Tara",
        exp: "Due to its extreme dryness and mineral soil resemblance to Mars, NASA and ESA scientists use Valle de la Luna to field-test Mars planetary rovers."
      },
      {
        q: "What high-altitude geothermal geyser field at 4,320 meters in the Atacama Desert is the largest geyser field in the Southern Hemisphere with over eighty active geysers?",
        correct: "El Tatio Geysers",
        w1: "Sol de Mañana",
        w2: "Puchuldiza",
        exp: "Visitors arrive at dawn in freezing sub-zero temperatures to watch steam plumes rise thirty meters from bubbling fumaroles against glowing volcanic peaks."
      }
    ],
    number: {
      q: "What percentage of the world total ground-based optical and radio astronomical observation infrastructure is situated in the Atacama Desert of Chile?",
      target: 70,
      unit: "percent",
      imperial: "70% of global astronomy",
      exp: "Chile hosts approximately 70 percent of global ground-based astronomical capacity due to the world driest and clearest high-altitude skies."
    }
  },

  // Cycle 3: Torres del Paine & Patagonian Peaks
  {
    mcqs: [
      {
        q: "What world-renowned UNESCO Biosphere Reserve national park in Chilean Patagonia is famous for three iconic 2,500-meter granite monoliths and turquoise glacial lakes?",
        correct: "Torres del Paine National Park",
        w1: "Bernardo O Higgins Park",
        w2: "Laguna San Rafael Park",
        exp: "The park features the Paine Massif, where granite laccolith towers are capped by dark sedimentary rocks, framed by the Southern Patagonian Ice Field."
      },
      {
        q: "What famous 70-kilometer multi-day hiking circuit in Torres del Paine winds through the French Valley, Grey Glacier, and the base of the granite towers?",
        correct: "The W Trek",
        w1: "The O Circuit",
        w2: "The Q Circuit",
        exp: "Named for the shape of the hiking route connecting three northern valleys, the W Trek is one of the most celebrated wilderness walks in the world."
      },
      {
        q: "What massive 270-square-kilometer glacier in Torres del Paine calves blue icebergs directly into a deep glacial lake at the southern tip of the Southern Patagonian Ice Field?",
        correct: "Grey Glacier Glaciar Grey",
        w1: "Tyndall Glacier",
        w2: "Dickson Glacier",
        exp: "Grey Glacier features twin terminal ice tongues divided by an island nunatak, accessible via boat tours navigating between floating turquoise ice floes."
      },
      {
        q: "What wild, long-necked South American camelid species related to the llama roams in large social herds across the open steppes of Torres del Paine?",
        correct: "Guanaco Lama guanicoe",
        w1: "Vicuña",
        w2: "Alpaca",
        exp: "Guanacos are the primary prey of Patagonian pumas (mountain lions), capable of running up to 56 km/h across rugged thorny scrublands."
      },
      {
        q: "What rare, endangered South American deer species, depicted on the national coat of arms of Chile alongside the Andean Condor, lives in dense Patagonian mountain forests?",
        correct: "South Andean Huemul Hippocamelus bisulcus",
        w1: "Pudú",
        w2: "Taruca",
        exp: "With fewer than 1,500 individuals surviving in the wild, the Huemul is strictly protected as a national natural monument across Chilean national parks."
      }
    ],
    number: {
      q: "What is the summit elevation in meters of the Central Tower (Torre Central), the tallest of the three granite towers of Paine in Chilean Patagonia?",
      target: 2460,
      unit: "meters",
      imperial: "8,071 feet sheer granite spire",
      exp: "The Torre Central of Paine rises to an elevation of approximately 2,460 meters above sea level in the heart of the national park."
    }
  },

  // Cycle 4: Rapa Nui / Easter Island & The Moai
  {
    mcqs: [
      {
        q: "What isolated Chilean Polynesian volcanic island, located 3,700 kilometers west of the mainland in the Pacific Ocean, is world-famous for monumental stone statues called Moai?",
        correct: "Rapa Nui Easter Island Isla de Pascua",
        w1: "Juan Fernández Islands",
        w2: "Desventuradas Islands",
        exp: "Dutch navigator Jacob Roggeveen named it Easter Island upon landing on Easter Sunday, April 5, 1722, home to the indigenous Rapa Nui Polynesian civilization."
      },
      {
        q: "Approximately how many monumental carved monolithic stone Moai statues have been inventoried across Rapa Nui?",
        correct: "Over 1,000 Moai Statues",
        w1: "250 Statues",
        w2: "500 Statues",
        exp: "Nearly half of all Moai remain in the volcanic crater quarry of Rano Raraku, representing deified ancestral chiefs carved from consolidated volcanic tuff."
      },
      {
        q: "What is the largest ceremonial stone platform (Ahu) on Rapa Nui, featuring fifteen restored giant standing Moai statues facing inland with their backs to the Pacific Ocean?",
        correct: "Ahu Tongariki",
        w1: "Ahu Akivi",
        w2: "Ahu Nau Nau",
        exp: "Restored in the 1990s after a 1960 tsunami swept them inland, Ahu Tongariki spans 220 meters, aligned precisely with the summer solstice sunrise."
      },
      {
        q: "Which extinct volcanic crater on Rapa Nui served as the primary open-air quarry and carving workshop for ninety-five percent of all carved Moai on the island?",
        correct: "Rano Raraku",
        w1: "Rano Kau",
        w2: "Terevaka",
        exp: "Carvers used hard basalt picks (toki) to chisel giant figures out of the crater walls, including the unfinished 21-meter giant Moai named Te Tokanga."
      },
      {
        q: "What ceremonial stone village perched atop the cliff rim of the Rano Kau caldera was the center of the annual Birdman (Tangata Manu) egg-retrieval competition?",
        correct: "Orongo",
        w1: "Anakena",
        w2: "Hanga Roa",
        exp: "Competitors scaled sheer 300-meter cliffs and swam through shark-infested waters on reed floats to Motu Nui islet to retrieve the first sooty tern egg of the season."
      }
    ],
    number: {
      q: "Approximately how many monumental monolithic stone Moai statues were carved by the ancient Rapa Nui people on Easter Island?",
      target: 1000,
      unit: "statues",
      imperial: "1,000+ carved Moai",
      exp: "Archaeologists have cataloged approximately 1,043 complete and partially carved Moai statues across Rapa Nui."
    }
  },

  // Cycle 5: Chilean Wine & The Central Valley
  {
    mcqs: [
      {
        q: "Which classic red Bordeaux grape variety, thought to be entirely extinct after the 19th-century European phylloxera blight, was rediscovered thriving in Chilean vineyards in 1994?",
        correct: "Carménère",
        w1: "Malbec",
        w2: "Syrah",
        exp: "French ampelographer Jean-Michel Boursiquot identified that Chilean vines previously labeled as Merlot were actually ancient Carménère, now Chile signature red grape."
      },
      {
        q: "Why are Chilean vineyards unique in the global wine industry for growing on original un-grafted European rootstocks without threat of the phylloxera root louse?",
        correct: "Natural barriers of the Andes, Atacama, Pacific and Antarctic oceans",
        w1: "Extreme chemical pesticides",
        w2: "Genetic modification",
        exp: "Natural geographical barriers (the hyper-arid Atacama to the north, frozen ice to the south, the Andes to the east, and the Pacific to the west) completely isolate Chilean soils."
      },
      {
        q: "Which prestigious wine-growing valley immediately south of Santiago along the Maipo River is world-renowned for iconic, structured Cabernet Sauvignon?",
        correct: "Maipo Valley",
        w1: "Colchagua Valley",
        w2: "Casablanca Valley",
        exp: "Home to historic 19th-century estates like Concha y Toro and Santa Rita, the Maipo Valley benefits from alluvial gravel soils and cool nighttime Andean breezes."
      },
      {
        q: "In what year was the historic French Carménère grape variety scientifically identified and resurrected in the vineyards of the Maipo Valley in Chile?",
        correct: "1994",
        w1: "1982",
        w2: "2001",
        exp: "On November 24, 1994, French ampelographer Jean-Michel Boursiquot confirmed the discovery at Viña Carmen during the 6th International Congress of Viticulture."
      },
      {
        q: "Which coastal valley in Chile, cooled by morning maritime sea fogs from the Pacific Ocean, is world-acclaimed for crisp Sauvignon Blanc and cool-climate Chardonnay?",
        correct: "Casablanca Valley",
        w1: "Leyda Valley",
        w2: "Limarí Valley",
        exp: "Pioneered in the 1980s, the Casablanca Valley was Chile first cool-climate coastal wine valley, where morning fogs slow grape ripening to preserve vibrant acidity."
      }
    ],
    number: {
      q: "In what year was the lost Bordeaux grape variety Carménère officially rediscovered in Chilean vineyards?",
      target: 1994,
      unit: "year",
      imperial: "1994 AD",
      exp: "Carménère was officially identified in Chile on November 24, 1994, revitalizing a heritage grape lost to Europe."
    }
  },

  // Cycle 6: Lake District, Volcanoes & The 1960 Earthquake
  {
    mcqs: [
      {
        q: "What is the largest earthquake ever recorded in modern seismological history, striking near the city of Valdivia in southern Chile on May 22, 1960?",
        correct: "Great Chilean Earthquake Valdivia Earthquake (Magnitude 9.5)",
        w1: "1906 San Francisco Earthquake",
        w2: "2004 Indian Ocean Earthquake",
        exp: "The magnitude 9.5 megathrust earthquake ruptured an 800-kilometer fault zone, triggering twenty-five-meter tsunamis that crossed the entire Pacific to Japan and Hawaii."
      },
      {
        q: "What perfectly symmetrical conical snow-capped stratovolcano on the shore of Lake Llanquihue in the Chilean Lake District is called the Mount Fuji of South America?",
        correct: "Osorno Volcano Volcán Osorno",
        w1: "Villarrica Volcano",
        w2: "Calbuco Volcano",
        exp: "Rising 2,652 meters, Osorno features the Petrohué Waterfalls (Saltos del Petrohué) where emerald waters rush through chutes of black basalt lava rock."
      },
      {
        q: "Which highly active stratovolcano near Pucón is one of only a handful of volcanoes on Earth containing a permanent, glowing open lava lake within its summit crater?",
        correct: "Villarrica Volcano Rucapillán",
        w1: "Llaima Volcano",
        w2: "Lonquimay Volcano",
        exp: "Known in Mapuche as Rucapillán (House of the Spirits), Villarrica rises 2,847 meters, surrounded by natural geothermal hot spring pools (Termas Geométricas)."
      },
      {
        q: "What is the largest lake located entirely within Chilean territory, covering 860 square kilometers in the Los Lagos region overlooking three volcanoes?",
        correct: "Lake Llanquihue Lago Llanquihue",
        w1: "Lake Ranco",
        w2: "Lake Villarrica",
        exp: "Llanquihue was settled by German immigrants in the 1850s, famous for lakeside towns Puerto Varas and Frutillar with their German wooden architecture and kuchen cakes."
      },
      {
        q: "What indigenous Native American people of south-central Chile fiercely resisted Incan expansion and successfully maintained sovereign independence against the Spanish Empire for three centuries?",
        correct: "The Mapuche People Araucanians",
        w1: "The Aymara",
        w2: "The Tehuelche",
        exp: "Led by legendary military leaders Lautaro and Caupolicán during the Arauco War, the Mapuche signed treaties with the Spanish Crown recognizing the Bío Bío River as their frontier."
      }
    ],
    number: {
      q: "What was the moment magnitude (Mw) of the historic 1960 Valdivia Earthquake in southern Chile, the strongest earthquake ever recorded on Earth?",
      target: 10,
      unit: "magnitude",
      imperial: "9.5 Moment Magnitude (rounded to 10)",
      exp: "The Great Chilean Earthquake reached an unprecedented magnitude of 9.5 (rounded to 10), releasing immense tectonic energy along the Peru-Chile Trench."
    }
  },

  // Cycle 7: Marble Caves, Carretera Austral & Fjords
  {
    mcqs: [
      {
        q: "What spectacular geological wonder on the shores of glacial Lake General Carrera in Aysén features natural cavern chambers sculpted from solid calcium carbonate marble?",
        correct: "Marble Caves Capillas de Mármol",
        w1: "Cueva del Milodón",
        w2: "Cueva de las Manos",
        exp: "Over 6,000 years of glacial wave erosion carved smooth swirling blue-and-white marble pillars that reflect the turquoise meltwater of the lake."
      },
      {
        q: "What legendary 1,240-kilometer gravel highway in southern Chile, begun under Augusto Pinochet in 1976, traverses pristine Patagonian fjords, glaciers, and temperate rainforests?",
        correct: "Carretera Austral Route 7",
        w1: "Ruta 40",
        w2: "Pan-American Highway",
        exp: "Running from Puerto Montt to Villa O Higgins, the Carretera Austral requires multiple ferry crossings through remote fjords and national parks."
      },
      {
        q: "Which national park along the Carretera Austral is famous for its massive Hanging Glacier (Ventisquero Colgante) suspended 200 meters above a glacial lagoon?",
        correct: "Queulat National Park",
        w1: "Pumalín Park",
        w2: "Corcovado Park",
        exp: "The glacier perches on the edge of a sheer cliff, feeding twin waterfalls that plunge into the milky-green Laguna Témpanos below."
      },
      {
        q: "What massive 4,000-square-kilometer temperate rainforest park, created by American philanthropist Douglas Tompkins and donated to the Chilean state, is a model of private conservation?",
        correct: "Pumalín Douglas Tompkins National Park",
        w1: "Patagonia National Park",
        w2: "Hornopirén National Park",
        exp: "Tompkins (founder of The North Face and Esprit) purchased and rewilded vast tracts of ancient Alerce forests, creating one of South America largest nature reserves."
      },
      {
        q: "What ancient conifer tree species native to the temperate rainforests of southern Chile, known scientifically as Fitzroya cupressoides, can live for over 3,600 years?",
        correct: "Alerce Lahuán",
        w1: "Monkey Puzzle Araucaria",
        w2: "Coihue",
        exp: "The Gran Abuelo (Great Grandfather) alerce tree in Alerce Costero National Park is estimated to be over 5,000 years old, rivaling the California bristlecone pine as Earth oldest living tree."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Carretera Austral (Route 7) traversing Chilean northern Patagonia from Puerto Montt to Villa O'Higgins?",
      target: 1240,
      unit: "kilometers",
      imperial: "770 miles",
      exp: "The Carretera Austral spans 1,240 kilometers through remote Patagonian wilderness and glacier fjords."
    }
  },

  // Cycle 8: Chiloé Island, Wooden Churches & Palafitos
  {
    mcqs: [
      {
        q: "What large mystical island in southern Chile is world-famous for sixteen UNESCO-listed wooden churches built entirely with native timber and wooden pegs (without iron nails)?",
        correct: "Chiloé Island Isla Grande de Chiloé",
        w1: "Mocha Island",
        w2: "Magdalena Island",
        exp: "Jesuit and Franciscan missionaries combined European ecclesiastical architecture with indigenous Chilote boatbuilding craftsmanship using alerce and ciprés wood."
      },
      {
        q: "What distinctive traditional wooden stilt houses in Castro and Ancud on Chiloé Island are built elevated over tidal harbors to accommodate six-meter ocean tides?",
        correct: "Palafitos",
        w1: "Rucas",
        w2: "Favelas",
        exp: "Clad in native wooden shingles (tejuelas), palafitos allow fishermen to moor their boats directly underneath their kitchens at high tide."
      },
      {
        q: "What traditional Chilote communal feast involves steaming shellfish, smoked pork, chicken, and potato cakes (milcao and chapalele) over red-hot stones in an earth pit covered with wild nalca leaves?",
        correct: "Curanto al Hoyo",
        w1: "Pachamanca",
        w2: "Asado",
        exp: "Curanto is prepared for the minga, a traditional communal practice where neighbors help each other move entire wooden houses across land and water using teams of oxen."
      },
      {
        q: "In Chilote folklore, what mythical glowing ghost ship is said to sail nocturnal waters around the archipelago, crewed by the spirits of drowned sailors?",
        correct: "The Caleuche",
        w1: "The Flying Dutchman",
        w2: "The Mary Celeste",
        exp: "Legend holds the Caleuche appears as a magnificent three-masted schooner surrounded by festive party music, capable of submerging instantly beneath the waves."
      },
      {
        q: "What tiny, miniature deer species endemic to the dense Valdivian temperate rainforests of Chiloé and southern Chile is the second smallest deer in the world, standing only thirty-five centimeters tall?",
        correct: "Southern Pudú Pudu puda",
        w1: "Huemul",
        w2: "Pampas Deer",
        exp: "The solitary, stocky pudú feeds on ferns and berries, barking when alarmed and zig-zagging through dense bamboo thickets to evade foxes and pumas."
      }
    ],
    number: {
      q: "How many historic wooden churches on the Chiloé archipelago are inscribed collectively on the UNESCO World Heritage list?",
      target: 16,
      unit: "churches",
      imperial: "16 UNESCO wooden churches",
      exp: "The Churches of Chiloé UNESCO World Heritage designation protects sixteen representative wooden churches built between the 18th and early 20th centuries."
    }
  },

  // Cycle 9: Cape Horn & The Deep South
  {
    mcqs: [
      {
        q: "What rocky headland at 55 degrees 58 minutes South latitude on Hornos Island in the Hermite Islands is recognized as the southernmost headland of the Americas?",
        correct: "Cape Horn Cabo de Hornos",
        w1: "Cape of Good Hope",
        w2: "Cape Agulhas",
        exp: "First rounded in 1616 by Dutch navigator Willem Schouten and named after the Dutch town of Hoorn, Cape Horn was the most hazardous sea passage on Earth for clipper ships."
      },
      {
        q: "What wide, stormy 800-kilometer body of water between Cape Horn and the South Shetland Islands of Antarctica has the roughest open seas on Earth?",
        correct: "Drake Passage Pasaje de Drake",
        w1: "Beagle Channel",
        w2: "Strait of Magellan",
        exp: "Unimpeded by any landmass around the globe, Antarctic Circumpolar Current westerly winds produce colossal thirty-meter rogue storm waves."
      },
      {
        q: "What is the southernmost city in Chile, located on the Brunswick Peninsula along the Strait of Magellan, which boomed during the 19th-century sheep ranching and gold rush era?",
        correct: "Punta Arenas",
        w1: "Puerto Williams",
        w2: "Porvenir",
        exp: "Punta Arenas features the Sara Braun mansion, the historic Cementerio Municipal, and a bronze statue of Magellan on the Plaza Muñoz Gamero whose toe visitors rub for luck."
      },
      {
        q: "What small Chilean naval and scientific settlement on Navarino Island on the Beagle Channel is the southernmost permanently inhabited civilian settlement on Earth?",
        correct: "Puerto Williams",
        w1: "Ushuaia",
        w2: "Puerto Toro",
        exp: "Puerto Williams is the capital of the Chilean Antarctic Province, gateway to the Dientes de Navarino trekking circuit and the Cape Horn Biosphere Reserve."
      },
      {
        q: "What protected reserve in Bahía Inútil on the Chilean side of Tierra del Fuego hosts the only permanent continental breeding colony of King Penguins outside the Subantarctic islands?",
        correct: "Parque Pingüino Rey",
        w1: "Isla Magdalena",
        w2: "Seno Otway",
        exp: "Established in 2011, the reserve protects a resident colony of around one hundred King Penguins (Aptenodytes patagonicus) that return annually to breed."
      }
    ],
    number: {
      q: "At what degree South latitude is the hazardous navigational landmark of Cape Horn (Cabo de Hornos) located?",
      target: 56,
      unit: "degrees South",
      imperial: "55°58'48\"S latitude",
      exp: "Cape Horn sits at approximately 56 degrees South latitude (55°58'S), marking the northern boundary of the Drake Passage."
    }
  },

  // Cycle 10: Extent, Copper & Chilean Superlatives
  {
    mcqs: [
      {
        q: "Which massive open-pit mine in the Atacama Desert is the largest copper mine in the world by annual metal production, yielding over one million tons of copper each year?",
        correct: "Escondida Copper Mine",
        w1: "Chuquicamata",
        w2: "El Teniente",
        exp: "Operated by BHP, Escondida accounts for roughly five percent of total global copper supply, utilizing seawater piped 170 kilometers from the Pacific coast."
      },
      {
        q: "What is the largest underground copper mine in the world, featuring over 3,000 kilometers of subterranean tunnels carved into the Andes near Rancagua?",
        correct: "El Teniente",
        w1: "Chuquicamata",
        w2: "Collahuasi",
        exp: "Operated by state copper corporation Codelco, El Teniente has been mined for over a century, containing an underground mining city and railway network."
      },
      {
        q: "What percentage of the world total commercial lithium reserves is contained in the subterranean hyper-saline brines beneath the Salar de Atacama in northern Chile?",
        correct: "Over 35 Percent",
        w1: "15 Percent",
        w2: "60 Percent",
        exp: "Part of the South American Lithium Triangle (with Argentina and Bolivia), the Salar de Atacama produces battery-grade lithium carbonate via solar evaporation ponds."
      },
      {
        q: "Into how many administrative regions (Regiones) is the Republic of Chile politically structured from Arica y Parinacota in the north to Magallanes in the south?",
        correct: "16 Regions",
        w1: "13 Regions",
        w2: "20 Regions",
        exp: "Chile consists of sixteen regions led by elected regional governors and presidential delegates, including the Santiago Metropolitan Region (RM)."
      },
      {
        q: "Which Chilean poet won the 1971 Nobel Prize in Literature, renowned for his Twenty Love Poems and a Song of Despair and his houses in Isla Negra, Valparaíso, and Santiago?",
        correct: "Pablo Neruda",
        w1: "Gabriela Mistral",
        w2: "Vicente Huidobro",
        exp: "Neruda was Chile second Nobel laureate after educator-poet Gabriela Mistral won in 1945, both celebrating Chilean natural landscapes and indigenous identity."
      }
    ],
    number: {
      q: "How many administrative regions (Regiones) comprise the Republic of Chile?",
      target: 16,
      unit: "regions",
      imperial: "16 administrative regions",
      exp: "Chile is structured into sixteen official regions following the addition of the Ñuble Region in 2018."
    }
  }
];

// Build Chile Quiz
buildQuiz({
  id: 'chile-geography-heritage-60',
  theme: 'Chile: Geography, The Atacama & Patagonian Fjords',
  title: 'Chile: Geography, The Atacama & Patagonian Fjords',
  description: 'A 60-question grand master assessment exploring the 4,300 km Andean ribbon, the Atacama Desert & ALMA (70% world astronomy), Torres del Paine, Rapa Nui Moai (1,000+ statues), Carménère wine (1994), 1960 Valdivia Earthquake, Marble Caves, and Cape Horn (56°S).',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, chileCycles);

console.log('Chile quiz built successfully!');
