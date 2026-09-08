const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 5. islands-archipelagos-atolls-60
// Theme: "Isolated Islands, Archipelagos & Coral Atolls"
// Category: "Geography, Capitals & Landscapes"
// =========================================================================
const islandCycles = [
  // Cycle 1: World Largest Islands
  {
    mcqs: [
      {
        q: "What is the largest non-continental island on Earth by surface area, covering over 2.1 million square kilometers?",
        correct: "Greenland",
        w1: "New Guinea",
        w2: "Borneo",
        exp: "Greenland is an autonomous territory within the Kingdom of Denmark, covered largely by a massive permanent ice sheet."
      },
      {
        q: "What is the second-largest island in the world, divided between Papua New Guinea and Indonesia?",
        correct: "New Guinea",
        w1: "Borneo",
        w2: "Madagascar",
        exp: "New Guinea covers roughly 785,753 square kilometers and is renowned for extreme biological diversity and linguistic variety."
      },
      {
        q: "Which Southeast Asian island is the third-largest on Earth and the only island shared by three sovereign nations?",
        correct: "Borneo",
        w1: "Sumatra",
        w2: "Sulawesi",
        exp: "Borneo is divided among Indonesia Kalimantan, the Malaysian states of Sabah and Sarawak, and the sovereign Sultanate of Brunei."
      },
      {
        q: "What island off the southeastern coast of Africa is the fourth-largest island on Earth, isolated for over eighty million years?",
        correct: "Madagascar",
        w1: "Mauritius",
        w2: "Reunion",
        exp: "Madagascar split from the Indian landmass millions of years ago, evolving unique wildlife such as lemurs and baobab trees."
      },
      {
        q: "What is the largest island in Canada and the fifth-largest island in the world, located in the northern territory of Nunavut?",
        correct: "Baffin Island",
        w1: "Victoria Island",
        w2: "Ellesmere Island",
        exp: "Baffin Island covers over 507,000 square kilometers, named after English navigator William Baffin who explored the Arctic waterway."
      }
    ],
    number: {
      q: "What is the approximate total surface area in thousands of square kilometers of Greenland?",
      target: 2166,
      unit: "thousand sq km",
      imperial: "836,330 sq miles",
      exp: "Greenland encompasses roughly 2,166,086 square kilometers, making it more than three times the size of Texas."
    }
  },

  // Cycle 2: Great Sovereign Archipelagos
  {
    mcqs: [
      {
        q: "Which nation is the world largest archipelagic state, comprising over seventeen thousand islands across five thousand kilometers?",
        correct: "Indonesia",
        w1: "Philippines",
        w2: "Japan",
        exp: "Indonesia spans from Sumatra in the west to Papua in the east, encompassing major islands including Java, Kalimantan, and Sulawesi."
      },
      {
        q: "Which Pacific island nation consists of an archipelago of over 7,600 islands categorized into Luzon, Visayas, and Mindanao?",
        correct: "Philippines",
        w1: "Solomon Islands",
        w2: "Vanuatu",
        exp: "The Philippine archipelago sits along the Pacific Ring of Fire, featuring rich coral reefs and deep oceanic trenches."
      },
      {
        q: "What is the largest and most populous of the four main home islands that make up the Japanese archipelago?",
        correct: "Honshu",
        w1: "Hokkaido",
        w2: "Kyushu",
        exp: "Honshu contains Tokyo, Osaka, Kyoto, and Mount Fuji, housing over eighty percent of the total Japanese population."
      },
      {
        q: "Which Indian Ocean nation comprises twenty-six natural coral atolls and has the lowest average ground elevation on Earth at 1.5 meters?",
        correct: "Maldives",
        w1: "Seychelles",
        w2: "Comoros",
        exp: "The Maldives consists of nearly 1,200 coral islands dispersed across 90,000 square kilometers of equatorial Indian Ocean."
      },
      {
        q: "Which archipelago nation in the western Indian Ocean is unique for containing the world only oceanic islands formed of ancient continental granite?",
        correct: "Seychelles",
        w1: "Mauritius",
        w2: "Cabo Verde",
        exp: "The granitic Inner Seychelles islands are fragments of the ancient supercontinent Gondwana that remained above sea level."
      }
    ],
    number: {
      q: "What is the officially recorded total count of registered islands making up the Indonesian archipelago?",
      target: 17508,
      unit: "islands",
      imperial: "17,508 islands",
      exp: "Geospatial surveys by the Indonesian government have cataloged approximately 17,508 islands, of which around 6,000 are inhabited."
    }
  },

  // Cycle 3: Most Isolated Outposts on Earth
  {
    mcqs: [
      {
        q: "What volcanic archipelago in the South Atlantic is recognized as the most remote permanently inhabited archipelago on Earth?",
        correct: "Tristan da Cunha",
        w1: "Saint Helena",
        w2: "Falkland Islands",
        exp: "Tristan da Cunha lies over 2,400 kilometers from the nearest inhabited land of Saint Helena and 2,800 kilometers from South Africa."
      },
      {
        q: "What isolated Polynesian volcanic island in the southeastern Pacific is famous for nearly one thousand monumental stone statues named Moai?",
        correct: "Easter Island",
        w1: "Pitcairn Island",
        w2: "Tahiti",
        exp: "Rapa Nui or Easter Island was settled by Polynesian voyagers who carved monolithic volcanic tuff statues between 1250 and 1500 CE."
      },
      {
        q: "Which glacier-covered uninhabited volcanic island in the South Atlantic is recognized as the single most remote point of land on Earth?",
        correct: "Bouvet Island",
        w1: "Peter I Island",
        w2: "Heard Island",
        exp: "Bouvet Island is a Norwegian dependency located over 1,600 kilometers from Antarctica and 2,200 kilometers from Gough Island."
      },
      {
        q: "Which tiny South Pacific volcanic island became the permanent refuge for the historic HMS Bounty mutineers led by Fletcher Christian in 1790?",
        correct: "Pitcairn Island",
        w1: "Norfolk Island",
        w2: "Henderson Island",
        exp: "Pitcairn Island remains the smallest and least populous sovereign British Overseas Territory with roughly fifty residents."
      },
      {
        q: "On which isolated British volcanic island in the South Atlantic did French Emperor Napoleon Bonaparte live in exile until his death in 1821?",
        correct: "Saint Helena",
        w1: "Ascension Island",
        w2: "Tristan da Cunha",
        exp: "Napoleon was imprisoned at Longwood House on Saint Helena following his final defeat at the Battle of Waterloo in 1815."
      }
    ],
    number: {
      q: "What is the approximate straight-line distance in kilometers from Tristan da Cunha to the nearest continental mainland in South Africa?",
      target: 2816,
      unit: "km",
      imperial: "1,750 miles",
      exp: "Tristan da Cunha lies approximately 2,816 kilometers west of Cape Town, South Africa, accessible only by a six-day boat voyage."
    }
  },

  // Cycle 4: Coral Atolls & Reef Systems
  {
    mcqs: [
      {
        q: "What is the world largest coral reef system, stretching over 2,300 kilometers off the northeastern coast of Queensland, Australia?",
        correct: "Great Barrier Reef",
        w1: "Belize Barrier Reef",
        w2: "New Caledonia Barrier Reef",
        exp: "The Great Barrier Reef comprises nearly 3,000 individual reefs and 900 islands, visible from Earth orbit."
      },
      {
        q: "Which remote raised coral atoll in the Seychelles is the second-largest atoll on Earth and home to the world largest giant tortoise colony?",
        correct: "Aldabra Atoll",
        w1: "Farquhar Atoll",
        w2: "Cosmoledo Atoll",
        exp: "Aldabra hosts over 100,000 endemic Aldabra giant tortoises, protected as a pristine UNESCO World Heritage natural site."
      },
      {
        q: "Which coral atoll in the Marshall Islands features the largest enclosed lagoon in the world by surface area, covering over 2,170 square kilometers?",
        correct: "Kwajalein Atoll",
        w1: "Rangiroa Atoll",
        w2: "Majuro Atoll",
        exp: "Kwajalein Atoll surrounds an enormous lagoon with nearly one hundred islets, serving as a key missile testing range."
      },
      {
        q: "Which Micronesian atoll in the Marshall Islands was the site of twenty-three nuclear weapons tests conducted by the United States between 1946 and 1958?",
        correct: "Bikini Atoll",
        w1: "Enewetak Atoll",
        w2: "Mururoa Atoll",
        exp: "Bikini Atoll was the site of Castle Bravo in 1954, the largest thermonuclear explosion ever detonated by the United States."
      },
      {
        q: "What famous French Polynesian island in the Leeward Society Islands is formed of an extinct volcano surrounded by a turquoise barrier lagoon?",
        correct: "Bora Bora",
        w1: "Moorea",
        w2: "Raiatea",
        exp: "Bora Bora is crowned by the basalt peaks of Mount Otemanu and Mount Pahia, surrounded by an outer ring of coral motus."
      }
    ],
    number: {
      q: "What is the approximate total length in kilometers of the Great Barrier Reef along the Australian coast?",
      target: 2300,
      unit: "km",
      imperial: "1,430 miles",
      exp: "The Great Barrier Reef extends approximately 2,300 kilometers along the continental shelf of Queensland."
    }
  },

  // Cycle 5: Sub-Antarctic & Arctic Frozen Isles
  {
    mcqs: [
      {
        q: "Which Norwegian Arctic archipelago halfway between Norway and the North Pole hosts the Global Seed Vault inside permafrost rock?",
        correct: "Svalbard",
        w1: "Jan Mayen",
        w2: "Franz Josef Land",
        exp: "The Svalbard Global Seed Vault on the island of Spitsbergen preserves millions of backup crop seed samples deep in frozen sandstone."
      },
      {
        q: "On which glaciated sub-Antarctic island is legendary polar explorer Sir Ernest Shackleton buried at the former whaling station of Grytviken?",
        correct: "South Georgia",
        w1: "Falkland Islands",
        w2: "South Shetland Islands",
        exp: "Shackleton died aboard the Quest in 1922 and was laid to rest in the Grytviken cemetery on mountainous South Georgia."
      },
      {
        q: "Which remote French southern territory in the southern Indian Ocean is known as the Desolation Islands due to gale winds and barren terrain?",
        correct: "Kerguelen Islands",
        w1: "Crozet Islands",
        w2: "Amsterdam Island",
        exp: "The Kerguelen archipelago is an isolated volcanic plateau populated only by French researchers, elephant seals, and king penguins."
      },
      {
        q: "What is the northernmost major island in the Canadian Arctic Archipelago, separated from Greenland only by the narrow Nares Strait?",
        correct: "Ellesmere Island",
        w1: "Devon Island",
        w2: "Axel Heiberg Island",
        exp: "Ellesmere Island hosts Cape Columbia, the northernmost point of land in Canada, and the year-round military research station Alert."
      },
      {
        q: "Which Arctic archipelago belonging to Russia served as the testing ground for the Tsar Bomba, the largest nuclear detonation in human history?",
        correct: "Novaya Zemlya",
        w1: "Severnaya Zemlya",
        w2: "New Siberian Islands",
        exp: "Novaya Zemlya is a mountainous Arctic island chain dividing the Barents and Kara seas, used as a major Soviet nuclear test range."
      }
    ],
    number: {
      q: "In what year did the Svalbard Global Seed Vault officially open in the Norwegian Arctic?",
      target: 2008,
      unit: "year",
      imperial: "2008 AD",
      exp: "The Svalbard Global Seed Vault was officially opened on February 26, 2008, to provide permanent insurance against global agricultural loss."
    }
  },

  // Cycle 6: Volcanic Hotspot Chains
  {
    mcqs: [
      {
        q: "Which oceanic archipelago was formed over millions of years as the Pacific tectonic plate migrated northwest across a stationary mantle plume?",
        correct: "Hawaiian Islands",
        w1: "Mariana Islands",
        w2: "Aleutian Islands",
        exp: "The Hawaiian-Emperor seamount chain stretches over 6,000 kilometers, with active shield volcanoes Kilauea and Mauna Loa on Hawaii Island."
      },
      {
        q: "Which Pacific volcanic archipelago located on the Equator inspired Charles Darwin theory of natural selection during his 1835 visit?",
        correct: "Galápagos Islands",
        w1: "Revillagigedo Islands",
        w2: "Juan Fernández Islands",
        exp: "Darwin studied the distinct adaptive beak morphologies of finches and carapaces of giant tortoises across different Galápagos islands."
      },
      {
        q: "Which North Atlantic island nation sits directly astride both the divergent Mid-Atlantic Ridge and a deep thermal mantle plume?",
        correct: "Iceland",
        w1: "Faroe Islands",
        w2: "Azores",
        exp: "Iceland rifts apart along the North American and Eurasian plates, resulting in extensive volcanism, geysers, and geothermal energy."
      },
      {
        q: "Which autonomous Spanish archipelago off the coast of northwest Africa is crowned by the 3,715-meter volcanic peak of Mount Teide?",
        correct: "Canary Islands",
        w1: "Balearic Islands",
        w2: "Madeira",
        exp: "The Canary Islands comprise seven main volcanic islands including Tenerife, Gran Canaria, Lanzarote, and Fuerteventura."
      },
      {
        q: "Which Portuguese volcanic archipelago in the mid-Atlantic consists of nine islands spread across three distinct tectonic groups?",
        correct: "Azores",
        w1: "Madeira",
        w2: "Cabo Verde",
        exp: "The Azores lie near the triple junction where the North American, Eurasian, and African tectonic plates meet."
      }
    ],
    number: {
      q: "In what year did English naturalist Charles Darwin visit the Galápagos Islands aboard HMS Beagle?",
      target: 1835,
      unit: "year",
      imperial: "1835 AD",
      exp: "Charles Darwin arrived in the Galápagos archipelago in September 1835, collecting zoological specimens that shaped On the Origin of Species."
    }
  },

  // Cycle 7: Mediterranean & European Isles
  {
    mcqs: [
      {
        q: "What is the largest island in the Mediterranean Sea, separated from the Italian mainland by the narrow Strait of Messina?",
        correct: "Sicily",
        w1: "Sardinia",
        w2: "Corsica",
        exp: "Sicily spans over 25,700 square kilometers, dominated by the active volcano Mount Etna and historic Greco-Roman temples."
      },
      {
        q: "What is the largest and most populous of the Greek islands, famous for the ancient Minoan Bronze Age palace of Knossos?",
        correct: "Crete",
        w1: "Rhodes",
        w2: "Corfu",
        exp: "Crete was the center of Europe earliest advanced civilization, the Minoans, who flourished from roughly 2700 to 1420 BCE."
      },
      {
        q: "Which Mediterranean island nation is geographically in Western Asia but politically integrated into the European Union?",
        correct: "Cyprus",
        w1: "Malta",
        w2: "Rhodes",
        exp: "Cyprus is divided by a UN buffer zone known as the Green Line separating the Republic of Cyprus from Northern Cyprus."
      },
      {
        q: "Which mountainous French Mediterranean island located north of Sardinia is celebrated as the birthplace of Napoleon Bonaparte?",
        correct: "Corsica",
        w1: "Elba",
        w2: "Capri",
        exp: "Napoleon was born in Ajaccio, Corsica, in 1769, shortly after the Republic of Genoa ceded the island to France."
      },
      {
        q: "What is the largest island on the European continent and the ninth-largest island in the world by surface area?",
        correct: "Great Britain",
        w1: "Ireland",
        w2: "Iceland",
        exp: "Great Britain covers over 209,000 square kilometers and comprises England, Scotland, and Wales."
      }
    ],
    number: {
      q: "What is the total surface area in square kilometers of Sicily, the largest island in the Mediterranean?",
      target: 25711,
      unit: "sq km",
      imperial: "9,927 sq miles",
      exp: "Sicily encompasses 25,711 square kilometers of diverse agricultural plains, coastal cliffs, and volcanic highlands."
    }
  },

  // Cycle 8: Shared & Split Sovereign Islands
  {
    mcqs: [
      {
        q: "Which Caribbean island is shared by two sovereign nations: Haiti occupying the western third and the Dominican Republic the eastern two-thirds?",
        correct: "Hispaniola",
        w1: "Cuba",
        w2: "Jamaica",
        exp: "Hispaniola was the site of the first permanent European settlement in the Americas founded by Christopher Columbus in 1492."
      },
      {
        q: "Which European island in the North Atlantic is politically divided between the independent Republic of Ireland and Northern Ireland?",
        correct: "Ireland",
        w1: "Great Britain",
        w2: "Isle of Man",
        exp: "The island of Ireland was partitioned in 1921 under the Government of Ireland Act, creating six northern counties within the UK."
      },
      {
        q: "What small Caribbean island is divided between a northern French overseas collectivity and a southern Dutch constituent country?",
        correct: "Saint Martin",
        w1: "Saint Lucia",
        w2: "Saint Thomas",
        exp: "Saint Martin / Sint Maarten is the smallest inhabited island in the world divided between two sovereign nations, partitioned in 1648."
      },
      {
        q: "Which archipelago at the southern tip of South America is divided between Chile and Argentina by the Beagle Channel and meridian lines?",
        correct: "Tierra del Fuego",
        w1: "Falkland Islands",
        w2: "Chiloé Archipelago",
        exp: "Isla Grande de Tierra del Fuego is partitioned with western fjords belonging to Chile and eastern plains belonging to Argentina."
      },
      {
        q: "How many sovereign nations share territory on the Southeast Asian island of Borneo?",
        correct: "3",
        w1: "2",
        w2: "4",
        exp: "Borneo is uniquely shared by three sovereign countries: Brunei, Malaysia, and Indonesia."
      }
    ],
    number: {
      q: "How many sovereign nations have territorial sovereignty over parts of the island of Borneo?",
      target: 3,
      unit: "countries",
      imperial: "3 sovereign nations",
      exp: "Borneo is divided among Indonesia (approx 73%), Malaysia (approx 26%), and the Sultanate of Brunei (approx 1%)."
    }
  },

  // Cycle 9: Unique Island Biogeography
  {
    mcqs: [
      {
        q: "What percentage of floral species found on the island of Madagascar are completely endemic, occurring nowhere else on Earth?",
        correct: "90 percent",
        w1: "60 percent",
        w2: "40 percent",
        exp: "Over 11,000 plant species in Madagascar are strictly endemic, including six of the world eight distinct baobab tree species."
      },
      {
        q: "Which Indonesian island is the primary natural habitat of the Komodo dragon, the heaviest living lizard species on Earth?",
        correct: "Komodo Island",
        w1: "Sulawesi",
        w2: "Sumatra",
        exp: "Varanus komodoensis thrives in the dry savannas of Komodo, Rinca, and Flores islands within Komodo National Park."
      },
      {
        q: "Which Yemeni island in the Arabian Sea is famous for bizarre endemic flora including the umbrella-shaped Dragon Blood Tree?",
        correct: "Socotra",
        w1: "Zanzibar",
        w2: "Pemba",
        exp: "Socotra is described as the most alien-looking place on Earth, with one-third of its plant species found nowhere else."
      },
      {
        q: "Which Australian island state south of Bass Strait is the exclusive wild habitat of the carnivorous marsupial the Tasmanian devil?",
        correct: "Tasmania",
        w1: "Kangaroo Island",
        w2: "Flinders Island",
        exp: "Tasmania served as a natural refuge for marsupials extinct on the mainland, including the Tasmanian devil and the extinct thylacine."
      },
      {
        q: "Which flightless, nocturnal ratite bird with hair-like feathers and nostrils at the tip of its beak is the national emblem of New Zealand?",
        correct: "Kiwi",
        w1: "Kākāpō",
        w2: "Takahe",
        exp: "The kiwi evolved in the absence of native terrestrial mammalian predators on the isolated islands of New Zealand."
      }
    ],
    number: {
      q: "What approximate percentage of the native flora of Madagascar is entirely endemic to the island?",
      target: 90,
      unit: "percent",
      imperial: "90 percent endemic",
      exp: "Botanists estimate that roughly ninety percent of Madagascar twelve thousand plant species grow nowhere else naturally."
    }
  },

  // Cycle 10: Island Superlatives & Emerging Lands
  {
    mcqs: [
      {
        q: "What Indonesian island is the most populous island on Earth, home to over 150 million residents and more than half the national population?",
        correct: "Java",
        w1: "Honshu",
        w2: "Great Britain",
        exp: "Java is one of the most densely settled major islands in the world, hosting Jakarta, Surabaya, Bandung, and numerous active volcanoes."
      },
      {
        q: "What island off the coast of Queensland, Australia, is recognized as the largest sand island in the world, known traditionally as K gari?",
        correct: "Fraser Island",
        w1: "Moreton Island",
        w2: "Stradbroke Island",
        exp: "K gari spans over 1,840 square kilometers of massive parabolic sand dunes, perched freshwater dune lakes, and rainforest growing in sand."
      },
      {
        q: "Which volcanic island emerged from the North Atlantic Ocean near Iceland during a continuous submarine eruption from 1963 to 1967?",
        correct: "Surtsey",
        w1: "Heimaey",
        w2: "Eldey",
        exp: "Surtsey is a pristine natural laboratory protected from human interference to study primary biological colonization on new land."
      },
      {
        q: "According to Guinness World Records, what tiny rock ledge in the Isles of Scilly holds the title of the smallest island with a building on it?",
        correct: "Bishop Rock",
        w1: "Just Room Enough Island",
        w2: "Fastnet Rock",
        exp: "Bishop Rock is capped entirely by a forty-nine-meter-tall granite Victorian lighthouse built to guide ships entering the English Channel."
      },
      {
        q: "Which low-lying Pacific atoll nation comprising nine coral islands is one of the most vulnerable nations on Earth to rising sea levels?",
        correct: "Tuvalu",
        w1: "Nauru",
        w2: "Palau",
        exp: "Tuvalu has a maximum elevation of less than five meters above sea level, pioneering digital nationhood initiatives."
      }
    ],
    number: {
      q: "In what year did the volcanic island of Surtsey first emerge above sea level off the southern coast of Iceland?",
      target: 1963,
      unit: "year",
      imperial: "1963 AD",
      exp: "Surtsey broke through the ocean surface on November 14, 1963, creating an island of 2.7 square kilometers."
    }
  }
];

buildQuiz({
  id: "islands-archipelagos-atolls-60",
  theme: "Isolated Islands, Archipelagos & Coral Atolls",
  title: "Isolated Islands, Archipelagos & Coral Atolls",
  description: "Comprehensive 60-question maritime odyssey exploring continental giants, volcanic hotspots, remote ocean outposts, and coral atolls.",
  category: "Geography, Capitals & Landscapes",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z"
}, islandCycles);


// =========================================================================
// 6. european-geography-heritage-60
// Theme: "European Geography, Borders, Flags & Landscapes"
// Category: "Geography, Capitals & Landscapes"
// =========================================================================
const europeanCycles = [
  // Cycle 1: Major European Peninsulas & Landmasses
  {
    mcqs: [
      {
        q: "Which southwestern European peninsula is occupied primarily by Spain and Portugal, separated from France by the Pyrenees?",
        correct: "Iberian Peninsula",
        w1: "Balkan Peninsula",
        w2: "Apennine Peninsula",
        exp: "The Iberian Peninsula encompasses approximately 582,000 square kilometers, bounded by the Atlantic Ocean and the Mediterranean Sea."
      },
      {
        q: "Which northern European peninsula is shared between Norway and Sweden, bordered by the Arctic Ocean, Baltic Sea, and North Sea?",
        correct: "Scandinavian Peninsula",
        w1: "Jutland Peninsula",
        w2: "Kola Peninsula",
        exp: "The Scandinavian Peninsula is the largest peninsula in Europe by area, traversed by the ancient Scandinavian Mountains."
      },
      {
        q: "Which peninsula in southeastern Europe is bounded by the Adriatic, Ionian, Aegean, and Black Seas?",
        correct: "Balkan Peninsula",
        w1: "Peloponnese",
        w2: "Crimean Peninsula",
        exp: "The Balkans encompass Greece, Albania, Bulgaria, Romania, and the republics of former Yugoslavia, rich in ethnic and linguistic diversity."
      },
      {
        q: "What boot-shaped peninsula extends south into the central Mediterranean Sea, forming the core landmass of Italy?",
        correct: "Apennine Peninsula",
        w1: "Iberian Peninsula",
        w2: "Jutland Peninsula",
        exp: "The Apennine Peninsula is dominated by the Apennine mountain spine and bordered by the Adriatic, Tyrrhenian, and Ionian seas."
      },
      {
        q: "Which peninsula comprises the mainland continental territory of Denmark and the northernmost German state of Schleswig-Holstein?",
        correct: "Jutland Peninsula",
        w1: "Fennoscandian Peninsula",
        w2: "Brittany Peninsula",
        exp: "Jutland separates the North Sea from the Kattegat and Baltic Sea, characterized by flat agricultural plains and sand dunes."
      }
    ],
    number: {
      q: "How many sovereign nations are situated entirely or partially on the Iberian Peninsula in southwestern Europe?",
      target: 3,
      unit: "countries",
      imperial: "3 sovereign nations",
      exp: "The Iberian Peninsula hosts 3 sovereign states: Spain, Portugal, and Andorra, alongside the British Overseas Territory of Gibraltar."
    }
  },

  // Cycle 2: Enclaves, Microstates & Border Anomalies
  {
    mcqs: [
      {
        q: "Which mountainous microstate located entirely inside central Italy claims to be the oldest surviving sovereign republic in the world?",
        correct: "San Marino",
        w1: "Vatican City",
        w2: "Monaco",
        exp: "Tradition holds that San Marino was founded in 301 CE by Saint Marinus as a refuge on Mount Titano."
      },
      {
        q: "What sovereign city-state is the smallest recognized independent state in the world by both area and population?",
        correct: "Vatican City",
        w1: "Monaco",
        w2: "Liechtenstein",
        exp: "Vatican City covers roughly 49 hectares entirely within Rome, ruled by the Bishop of Rome as the sovereign pontiff."
      },
      {
        q: "Which town on the Belgian-Dutch border is famous for one of the most complex border enclave networks in the world?",
        correct: "Baarle-Nassau and Baarle-Hertog",
        w1: "Busingen",
        w2: "Campione d Italia",
        exp: "The border weaves through cafes, houses, and sidewalks, consisting of twenty-two Belgian exclaves inside the Netherlands."
      },
      {
        q: "Which Italian municipal exclave is completely surrounded by the Swiss canton of Ticino along Lake Lugano?",
        correct: "Campione d Italia",
        w1: "Livigno",
        w2: "Busingen am Hochrhein",
        exp: "Campione d Italia is an Italian territory separated from mainland Italy by Swiss mountains and water, famous for its casino."
      },
      {
        q: "Which sovereign principality is located high in the eastern Pyrenees between France and Spain, co-ruled by two co-princes?",
        correct: "Andorra",
        w1: "Monaco",
        w2: "Liechtenstein",
        exp: "Andorra is unique for its diarchy, with the Bishop of Urgell and the President of France serving jointly as ceremonial heads of state."
      }
    ],
    number: {
      q: "What is the total area of Vatican City in hectares, making it the smallest independent sovereign state on Earth?",
      target: 49,
      unit: "hectares",
      imperial: "121 acres (0.19 sq miles)",
      exp: "Vatican City spans approximately 49 hectares enclosed by defensive Renaissance and medieval stone walls."
    }
  },

  // Cycle 3: European Mountain Systems
  {
    mcqs: [
      {
        q: "Which mountain range forms a formidable natural barrier along the border between France and Spain from the Atlantic to the Mediterranean?",
        correct: "Pyrenees",
        w1: "Alps",
        w2: "Carpathians",
        exp: "The Pyrenees stretch 430 kilometers, with Pico de Aneto rising as the highest summit at 3,404 meters."
      },
      {
        q: "Which major mountain arc curves through Central and Eastern Europe across Slovakia, Poland, Ukraine, and Romania?",
        correct: "Carpathian Mountains",
        w1: "Dinaric Alps",
        w2: "Balkan Mountains",
        exp: "The Carpathians form a 1,500-kilometer arc home to Europe largest virgin forests and brown bear populations."
      },
      {
        q: "Which mountain range forms the central geological backbone of the Italian peninsula, running roughly 1,200 kilometers north to south?",
        correct: "Apennine Mountains",
        w1: "Dolomites",
        w2: "Maritime Alps",
        exp: "The Apennines culminate at Corno Grande in the Gran Sasso massif at 2,912 meters elevation."
      },
      {
        q: "Which rugged limestone mountain range stretches along the eastern coast of the Adriatic Sea across Slovenia, Croatia, Bosnia, and Montenegro?",
        correct: "Dinaric Alps",
        w1: "Pindus Mountains",
        w2: "Rhodope Mountains",
        exp: "The Dinaric Alps are world-renowned for extensive karst topography, dramatic limestone canyons, and deep cave systems."
      },
      {
        q: "What mountain range separates the Iberian central meseta from the southern Mediterranean coast of Andalusia, hosting Mulhacén peak?",
        correct: "Sierra Nevada",
        w1: "Cantabrian Mountains",
        w2: "Sierra Morena",
        exp: "The Spanish Sierra Nevada contains Mulhacén at 3,478 meters, the highest point in continental mainland Spain."
      }
    ],
    number: {
      q: "What is the summit elevation in meters of Pico de Aneto, the highest mountain peak in the Pyrenees?",
      target: 3404,
      unit: "meters",
      imperial: "11,168 feet",
      exp: "Pico de Aneto in the Spanish province of Huesca stands at 3,404 meters, featuring the largest glacier in the Pyrenees."
    }
  },

  // Cycle 4: Major Rivers & Drainage Basins
  {
    mcqs: [
      {
        q: "Which major European river originates in the Swiss Alps, forms part of the Franco-German border, and empties into the North Sea at Rotterdam?",
        correct: "Rhine River",
        w1: "Elbe River",
        w2: "Meuse River",
        exp: "The Rhine flows 1,230 kilometers through industrial hearts including the Ruhr Valley, functioning as Europe busiest river route."
      },
      {
        q: "Which iconic French river flows 777 kilometers through the heart of Paris before emptying into the English Channel at Le Havre?",
        correct: "Seine River",
        w1: "Loire River",
        w2: "Rhône River",
        exp: "The Seine passes beneath thirty-seven bridges in Paris, including the historic Pont Neuf and Pont Alexandre III."
      },
      {
        q: "What is the longest river located entirely within the Iberian Peninsula, flowing west through Spain and Portugal into the Atlantic at Lisbon?",
        correct: "Tagus River",
        w1: "Douro River",
        w2: "Ebro River",
        exp: "The Tagus or Tejo stretches 1,007 kilometers, supplying vital hydroelectric power and irrigating agricultural plains."
      },
      {
        q: "Which major river rises in the Giant Mountains of Czechia and flows northwest through Dresden and Hamburg into the North Sea?",
        correct: "Elbe River",
        w1: "Oder River",
        w2: "Vistula River",
        exp: "The Elbe was historically significant during the Cold War as a key demarcation section between East and West Germany."
      },
      {
        q: "What is the longest river in Poland, flowing 1,047 kilometers through Krakow and Warsaw before emptying into the Baltic Sea?",
        correct: "Vistula River",
        w1: "Oder River",
        w2: "Warta River",
        exp: "The Vistula drains over half the territory of Poland and has served as the historic cultural lifeline of the Polish nation."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Rhine River from its Swiss Alpine source to the North Sea?",
      target: 1230,
      unit: "km",
      imperial: "764 miles",
      exp: "The Rhine River measures approximately 1,230 kilometers, flowing through Switzerland, Liechtenstein, Austria, Germany, France, and the Netherlands."
    }
  },

  // Cycle 5: Nordic Landscapes, Fjords & Baltic Seas
  {
    mcqs: [
      {
        q: "Which deep, narrow coastal inlet carved by glacial erosion is world-famous in western Norway, including Geirangerfjord and Nærøyfjord?",
        correct: "Fjord",
        w1: "Ria",
        w2: "Loch",
        exp: "Norwegian fjords are steep-sided U-shaped valleys flooded by the sea, formed by glacier carving during Pleistocene Ice Ages."
      },
      {
        q: "What semi-enclosed brackish sea in Northern Europe is bordered by Scandinavia, Finland, the Baltic States, Poland, and Germany?",
        correct: "Baltic Sea",
        w1: "North Sea",
        w2: "Norwegian Sea",
        exp: "The Baltic Sea has very low salinity due to limited exchange with the North Sea and abundant freshwater river inflow."
      },
      {
        q: "What is the largest lake located entirely within the European continent, situated in northwestern Russia near Saint Petersburg?",
        correct: "Lake Ladoga",
        w1: "Lake Onega",
        w2: "Lake Vänern",
        exp: "Lake Ladoga spans over 17,700 square kilometers, draining into the Gulf of Finland via the Neva River."
      },
      {
        q: "Which Scandinavian nation is widely celebrated as the Land of a Thousand Lakes, actually containing over 180,000 recorded lakes?",
        correct: "Finland",
        w1: "Sweden",
        w2: "Norway",
        exp: "Glacial scouring left Finland covered in dense interconnected lake networks, including Lake Saimaa, home to the rare ringed seal."
      },
      {
        q: "What crescent-shaped Alpine lake is shared between Switzerland and France, bordered by Geneva, Lausanne, and Montreux?",
        correct: "Lake Geneva",
        w1: "Lake Constance",
        w2: "Lake Lucerne",
        exp: "Lake Geneva, or Lac Léman, is one of the largest lakes in Western Europe, fed and drained by the Rhône River."
      }
    ],
    number: {
      q: "Approximately how many recorded lakes with an area greater than 500 square meters are found in Finland?",
      target: 188000,
      unit: "lakes",
      imperial: "188,000 lakes",
      exp: "Official geographic surveys identify approximately 187,888 distinct lakes in Finland, earning its famous national epithet."
    }
  },

  // Cycle 6: European Straits & Maritime Passages
  {
    mcqs: [
      {
        q: "Which narrow strait separates the southern tip of the Iberian Peninsula from Morocco, connecting the Atlantic Ocean to the Mediterranean Sea?",
        correct: "Strait of Gibraltar",
        w1: "Strait of Messina",
        w2: "Strait of Bonifacio",
        exp: "The Strait of Gibraltar narrows to just fourteen kilometers between Point Marroquí in Spain and Point Cires in Morocco."
      },
      {
        q: "Which body of water separates southern England from northern France, connected to the North Sea by the Strait of Dover?",
        correct: "English Channel",
        w1: "Irish Sea",
        w2: "Celtic Sea",
        exp: "Known as La Manche in French, the English Channel is one of the busiest maritime shipping corridors on the globe."
      },
      {
        q: "Which narrow strait in Turkey connects the Black Sea to the Sea of Marmara, dividing the European and Asian halves of Istanbul?",
        correct: "Bosporus Strait",
        w1: "Dardanelles Strait",
        w2: "Kerch Strait",
        exp: "The Bosporus is a vital strategic chokepoint governed by the 1936 Montreux Convention, spanned by three massive suspension bridges."
      },
      {
        q: "Which sound separates the Danish island of Zealand from the Swedish province of Scania, bridged by the iconic Øresund Bridge?",
        correct: "Øresund",
        w1: "Great Belt",
        w2: "Little Belt",
        exp: "The Øresund Bridge opened in 2000 as a combined road and rail link creating the unified metropolitan Øresund Region."
      },
      {
        q: "Which strait connects the Aegean Sea to the Sea of Marmara, historically known as the Hellespont in classical antiquity?",
        correct: "Dardanelles Strait",
        w1: "Bosporus",
        w2: "Corinth Strait",
        exp: "The Dardanelles was the site of the ancient Persian pontoon crossings of Xerxes and the WWI Gallipoli Campaign."
      }
    ],
    number: {
      q: "What is the minimum width in kilometers of the Strait of Gibraltar at its narrowest point between Europe and Africa?",
      target: 14,
      unit: "km",
      imperial: "8.9 miles",
      exp: "At its narrowest point between Spain and Morocco, the Strait of Gibraltar measures approximately 14.3 kilometers."
    }
  },

  // Cycle 7: Sovereign Flags & National Heritage
  {
    mcqs: [
      {
        q: "Which Nordic national flag, known as the Dannebrog, holds the Guinness World Record as the oldest continuously used national flag?",
        correct: "Flag of Denmark",
        w1: "Flag of Sweden",
        w2: "Flag of Norway",
        exp: "According to legend, the red flag with a white Scandinavian cross fell from the heavens during the Battle of Lyndanisse in 1219."
      },
      {
        q: "Which two European sovereign nations feature an unusual square-proportioned national flag rather than a rectangular one?",
        correct: "Switzerland and Vatican City",
        w1: "Monaco and San Marino",
        w2: "Liechtenstein and Andorra",
        exp: "Switzerland white cross on red and Vatican City yellow-and-white papal standard are the only two square sovereign flags in the world."
      },
      {
        q: "The Union Jack of the United Kingdom combines the heraldic crosses of which three patron saints?",
        correct: "Saint George, Saint Andrew, and Saint Patrick",
        w1: "Saint George, Saint David, and Saint Patrick",
        w2: "Saint Andrew, Saint David, and Saint George",
        exp: "The flag merges the red cross of England, the white saltire of Scotland, and the red saltire of Ireland."
      },
      {
        q: "What distinctive geometric design is shared across the national flags of Denmark, Sweden, Norway, Finland, and Iceland?",
        correct: "Nordic Cross",
        w1: "Bicolor Triband",
        w2: "Diagonal Saltire",
        exp: "The Nordic Cross pattern represents Christianity, with the vertical cross bar shifted toward the hoist side of the flag."
      },
      {
        q: "Which sovereign principality added a golden princely coronet to its blue and red flag in 1937 after discovering its flag was identical to Haiti?",
        correct: "Liechtenstein",
        w1: "Monaco",
        w2: "Luxembourg",
        exp: "At the 1936 Berlin Summer Olympics, Liechtenstein realized its flag was identical to Haiti, prompting the addition of the crown in 1937."
      }
    ],
    number: {
      q: "In what year did the Danish flag Dannebrog traditionally originate at the Battle of Lyndanisse in modern Estonia?",
      target: 1219,
      unit: "year",
      imperial: "1219 AD",
      exp: "The historic Battle of Lyndanisse took place on June 15, 1219, establishing the Dannebrog as the world oldest national flag."
    }
  },

  // Cycle 8: Central & Eastern European Geography
  {
    mcqs: [
      {
        q: "What vast primeval forest along the border of Poland and Belarus is the last remaining old-growth lowland forest in Europe, home to European bison?",
        correct: "Białowieża Forest",
        w1: "Bohemian Forest",
        w2: "Black Forest",
        exp: "Białowieża Forest is a UNESCO World Heritage site harboring the largest wild population of the European bison or wisent."
      },
      {
        q: "Which vast, flat grassland biome in eastern Hungary along the Tisza River is famed for traditional csikós horsemen and grey cattle?",
        correct: "Puszta",
        w1: "Steppe of Dobruja",
        w2: "Valdai Plains",
        exp: "The Hungarian Puszta within Hortobágy National Park preserves centuries of pastoral traditions and iconic draw wells."
      },
      {
        q: "How many sovereign countries share an international land border with Germany, tying with Russia for the highest number in Europe?",
        correct: "9",
        w1: "7",
        w2: "11",
        exp: "Germany borders Denmark, Poland, Czechia, Austria, Switzerland, France, Luxembourg, Belgium, and the Netherlands."
      },
      {
        q: "Which historic plateau region in western Romania is encircled on three sides by the curved ridges of the Carpathian Mountains?",
        correct: "Transylvania",
        w1: "Wallachia",
        w2: "Moldavia",
        exp: "Transylvania is a high plateau region dotted with medieval Saxon fortified churches and the famous Bran Castle."
      },
      {
        q: "Which diamond-shaped basin in Central Europe is surrounded on all sides by mountain ranges including the Krkonoše and Šumava?",
        correct: "Bohemian Basin",
        w1: "Pannonian Basin",
        w2: "Po Valley",
        exp: "The Bohemian Basin contains Prague and is drained northward by the Vltava and Labe rivers through the Elbe Sandstone Mountains."
      }
    ],
    number: {
      q: "How many sovereign nations share a direct land border with the Federal Republic of Germany?",
      target: 9,
      unit: "countries",
      imperial: "9 bordering nations",
      exp: "Germany shares land borders with 9 neighboring countries across Western and Central Europe."
    }
  },

  // Cycle 9: Mediterranean Coasts & Island Heritage
  {
    mcqs: [
      {
        q: "Which dramatic coastal stretch along the Gulf of Salerno in southern Italy is renowned for pastel cliffside villages such as Positano?",
        correct: "Amalfi Coast",
        w1: "Cinque Terre",
        w2: "Costa Smeralda",
        exp: "The Costiera Amalfitana is a UNESCO World Heritage cultural landscape of sheer cliffs, lemon terraces, and medieval sea villas."
      },
      {
        q: "Which Mediterranean coastal region in southeastern France encompasses glamourous destinations including Nice, Cannes, Saint-Tropez, and Monaco?",
        correct: "French Riviera",
        w1: "Costa Brava",
        w2: "Costa del Sol",
        exp: "The Côte d Azur enjoys a mild Mediterranean microclimate sheltered by the Maritime Alps, popular since Victorian times."
      },
      {
        q: "Which rugged island archipelago in the central Aegean Sea is world-famous for whitewashed cube houses and blue church domes on Santorini?",
        correct: "Cyclades",
        w1: "Dodecanese",
        w2: "Ionian Islands",
        exp: "The Cyclades form a circle of islands around the sacred ancient sanctuary island of Delos in Greek mythology."
      },
      {
        q: "Which Spanish archipelago in the western Mediterranean comprises Mallorca, Menorca, Ibiza, and Formentera?",
        correct: "Balearic Islands",
        w1: "Canary Islands",
        w2: "Columbretes Islands",
        exp: "The Balearic Islands are an autonomous community of Spain, celebrated for turquoise coves, Serra de Tramuntana mountains, and salt pans."
      },
      {
        q: "Which indented Adriatic coastal region in Croatia features hundreds of karst islands, walled cities like Dubrovnik, and Diocletian Palace in Split?",
        correct: "Dalmatian Coast",
        w1: "Istrian Peninsula",
        w2: "Kvarner Gulf",
        exp: "Dalmatia boasts a sunken coastline where parallel mountain ridges formed over a thousand elongated Adriatic islands."
      }
    ],
    number: {
      q: "Approximately how many inhabited islands are part of the sovereign Hellenic Republic of Greece?",
      target: 227,
      unit: "inhabited islands",
      imperial: "227 inhabited islands",
      exp: "While Greece contains several thousand islands and islets, approximately 227 support permanent year-round human populations."
    }
  },

  // Cycle 10: Geographic Extremes & European Records
  {
    mcqs: [
      {
        q: "What windswept granite cape in Portugal marks the westernmost point of the continental mainland of Europe?",
        correct: "Cabo da Roca",
        w1: "Cape Saint Vincent",
        w2: "Cape Finisterre",
        exp: "Portuguese poet Luís de Camões famously described Cabo da Roca as where the land ends and the sea begins."
      },
      {
        q: "What famous coastal cliff promontory on Magerøya island in northern Norway is celebrated as the northernmost point of Europe accessible by car?",
        correct: "North Cape",
        w1: "Kinnarodden",
        w2: "Lindesnes",
        exp: "The North Cape or Nordkapp features a 307-meter cliff overlooking the Arctic Barents Sea under the Midnight Sun."
      },
      {
        q: "Which colossal active stratovolcano on the eastern coast of Sicily is the tallest active volcano in Europe outside the Caucasus?",
        correct: "Mount Etna",
        w1: "Mount Vesuvius",
        w2: "Stromboli",
        exp: "Mount Etna stands over 3,350 meters high with near-constant summit eruptions, generating fertile volcanic soil for vineyards."
      },
      {
        q: "What shallow freshwater lake in western Hungary is the largest lake in Central Europe, known as the Hungarian Sea?",
        correct: "Lake Balaton",
        w1: "Lake Neusiedl",
        w2: "Lake Constance",
        exp: "Lake Balaton covers roughly 592 square kilometers with an average depth of only three meters, famed for summer resorts."
      },
      {
        q: "What Russian exclave on the Baltic Sea between Poland and Lithuania is home to the Baltic Fleet headquarters and the amber coast?",
        correct: "Kaliningrad Oblast",
        w1: "Karelia",
        w2: "Pskov",
        exp: "Formerly the historic Prussian city of Königsberg, Kaliningrad became Soviet territory following the Potsdam Conference in 1945."
      }
    ],
    number: {
      q: "What is the approximate summit elevation in meters of Mount Etna in Sicily, Europe most active volcano?",
      target: 3357,
      unit: "meters",
      imperial: "11,014 feet",
      exp: "Mount Etna summit height changes with ongoing eruptions and crater collapses, measured at approximately 3,357 meters in recent surveys."
    }
  }
];

buildQuiz({
  id: "european-geography-heritage-60",
  theme: "European Geography, Borders, Flags & Landscapes",
  title: "European Geography, Borders, Flags & Landscapes",
  description: "Comprehensive 60-question exploration of European peninsulas, mountain ranges, enclave borders, iconic flags, and heritage landmarks.",
  category: "Geography, Capitals & Landscapes",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z"
}, europeanCycles);


// =========================================================================
// 7. asian-geography-landmarks-60
// Theme: "Asian Geography: Rivers, Steppes & Natural Wonders"
// Category: "Geography, Capitals & Landscapes"
// =========================================================================
const asianCycles = [
  // Cycle 1: The Roof of the World & High Plateaus
  {
    mcqs: [
      {
        q: "What vast elevated plateau in Central and East Asia is celebrated as the Roof of the World and the Third Pole for its immense glacial ice reserves?",
        correct: "Tibetan Plateau",
        w1: "Deccan Plateau",
        w2: "Mongolian Plateau",
        exp: "Covering 2.5 million square kilometers at an average elevation of 4,500 meters, it feeds the ten greatest river systems of Asia."
      },
      {
        q: "Which complex high-mountain junction where the Himalayas, Karakoram, Hindu Kush, and Tian Shan converge is known as the Pamir Knot?",
        correct: "Pamir Mountains",
        w1: "Altai Mountains",
        w2: "Kunlun Mountains",
        exp: "The Pamir Knot forms a formidable high-altitude mountain nexus in Tajikistan, Afghanistan, China, and Kyrgyzstan."
      },
      {
        q: "What massive triangular volcanic basalt plateau covers much of southern and central India between the Western and Eastern Ghats?",
        correct: "Deccan Plateau",
        w1: "Chota Nagpur Plateau",
        w2: "Malwa Plateau",
        exp: "The Deccan Traps were formed by massive flood basalt eruptions 66 million years ago around the Cretaceous-Paleogene boundary."
      },
      {
        q: "Which expansive high plateau forms the central geographical core of modern Turkey between the Pontic and Taurus mountain ranges?",
        correct: "Anatolian Plateau",
        w1: "Iranian Plateau",
        w2: "Armenian Highland",
        exp: "The Anatolian Plateau is an arid steppe basin featuring dramatic volcanic fairy chimneys in Cappadocia and salt lakes."
      },
      {
        q: "What is the largest dry steppe region in the world, stretching over 800,000 square kilometers across northern Kazakhstan?",
        correct: "Kazakh Steppe",
        w1: "Pontic-Caspian Steppe",
        w2: "Baraba Steppe",
        exp: "The Kazakh Steppe is an enormous expanse of open grassland with extreme continental temperatures, home to the saiga antelope."
      }
    ],
    number: {
      q: "What is the average elevation in meters above sea level across the vast expanse of the Tibetan Plateau?",
      target: 4500,
      unit: "meters",
      imperial: "14,764 feet",
      exp: "The Tibetan Plateau sits at an average altitude exceeding 4,500 meters, making it the highest and largest plateau on Earth."
    }
  },

  // Cycle 2: Great Asian Rivers & Canyons
  {
    mcqs: [
      {
        q: "What is the longest river in Asia and the third-longest river in the world, flowing over 6,300 kilometers across China?",
        correct: "Yangtze River",
        w1: "Yellow River",
        w2: "Mekong River",
        exp: "The Yangtze, or Chang Jiang, drains one-fifth of China land area and generates immense power at the Three Gorges Dam."
      },
      {
        q: "Which major river flowing through China is nicknamed the Yellow River because of the enormous volume of yellow loess sediment it carries?",
        correct: "Huang He",
        w1: "Huai He",
        w2: "Hai He",
        exp: "The Yellow River carries over one billion tons of silt annually from the Loess Plateau, causing historical riverbed elevations."
      },
      {
        q: "Which major river system in Pakistan and northwestern India originates near Lake Manasarovar in Tibet and empties into the Arabian Sea?",
        correct: "Indus River",
        w1: "Ganges River",
        w2: "Brahmaputra River",
        exp: "The Indus River is the key water source for agriculture in Pakistan, supporting the extensive Indus Basin Irrigation System."
      },
      {
        q: "What dramatic river canyon on the Tibetan Plateau is recognized as the deepest canyon on Earth, plunging over 5,300 meters?",
        correct: "Yarlung Tsangpo Grand Canyon",
        w1: "Tiger Leaping Gorge",
        w2: "Kali Gandaki Gorge",
        exp: "The Yarlung Tsangpo loops around Mount Namcha Barwa in Tibet before cascading south into India as the Brahmaputra River."
      },
      {
        q: "Which river forms the primary domestic and commercial waterway through central Thailand, flowing through Bangkok into the Gulf of Thailand?",
        correct: "Chao Phraya River",
        w1: "Mekong River",
        w2: "Salween River",
        exp: "The Chao Phraya is formed by the confluence of the Ping and Nan rivers, renowned for iconic floating markets and historic temples."
      }
    ],
    number: {
      q: "What is the total official length in kilometers of the Yangtze River in China?",
      target: 6300,
      unit: "km",
      imperial: "3,915 miles",
      exp: "The Yangtze River measures approximately 6,300 kilometers from its source in the Tanggula Mountains to the East China Sea."
    }
  },

  // Cycle 3: Natural Wonders & Geological Marvels
  {
    mcqs: [
      {
        q: "Which UNESCO World Heritage bay in northern Vietnam features thousands of towering limestone karsts and emerald waters?",
        correct: "Ha Long Bay",
        w1: "Nha Trang Bay",
        w2: "Phang Nga Bay",
        exp: "Ha Long Bay contains nearly two thousand limestone islets and sunken caves sculpted over five hundred million years of tropical karst evolution."
      },
      {
        q: "Which unique geological formation on Bohol Island in the Philippines consists of over 1,700 cone-shaped limestone hills that turn brown in the dry season?",
        correct: "Chocolate Hills",
        w1: "Pinnacles",
        w2: "Tsingy",
        exp: "The Chocolate Hills are symmetrical grass-covered karst mounds that turn cocoa-brown during the dry season from February to May."
      },
      {
        q: "Which valley in northern Sichuan, China, is celebrated for its multi-tiered waterfalls and vivid turquoise and jade crystal lakes?",
        correct: "Jiuzhaigou",
        w1: "Huanglong",
        w2: "Wulingyuan",
        exp: "Jiuzhaigou or Valley of Nine Fortified Villages sits on the edge of the Tibetan Plateau, famous for high-clarity mineral lakes."
      },
      {
        q: "What famous national geological park in Zhangye, Gansu Province, China, is renowned for vibrant rainbow-striped rock formations?",
        correct: "Zhangye Danxia",
        w1: "Shilin Stone Forest",
        w2: "Karst of Guilin",
        exp: "Zhangye Danxia landforms were formed by layers of red sandstone and mineral deposits compressed and uplifted over 24 million years."
      },
      {
        q: "Which scenic area in Hunan Province, China, features thousands of quartzite sandstone pillars that inspired the floating Hallelujah Mountains in Avatar?",
        correct: "Zhangjiajie",
        w1: "Mount Huangshan",
        w2: "Mount Emei",
        exp: "Wulingyuan in Zhangjiajie preserves more than 3,000 sheer sandstone pillars rising hundreds of meters above dense misty forests."
      }
    ],
    number: {
      q: "Approximately how many limestone islands and islets make up the dramatic seascape of Ha Long Bay in Vietnam?",
      target: 1969,
      unit: "islands",
      imperial: "1,969 islands",
      exp: "Official UNESCO documentation records 1,969 limestone karst islands and islets scattered across Ha Long Bay."
    }
  },

  // Cycle 4: Asian Inland Seas & Salt Depressions
  {
    mcqs: [
      {
        q: "What hypersaline terminal lake situated between Israel, Jordan, and the West Bank marks the lowest land elevation on Earth?",
        correct: "Dead Sea",
        w1: "Lake Assal",
        w2: "Sea of Galilee",
        exp: "The Dead Sea shore sits roughly 430 meters below sea level with salinity exceeding thirty-four percent, allowing bathers to float effortlessly."
      },
      {
        q: "What freshwater lake in Galilee in northern Israel is the lowest freshwater lake on Earth, sitting roughly 210 meters below sea level?",
        correct: "Sea of Galilee",
        w1: "Lake Hula",
        w2: "Dead Sea",
        exp: "The Sea of Galilee, or Lake Kinneret, is fed by the Jordan River and serves as a major freshwater reservoir and biblical pilgrimage site."
      },
      {
        q: "Which crescent-shaped tectonic rift lake in eastern Siberia is estimated to be twenty-five million years old, making it the oldest lake on Earth?",
        correct: "Lake Baikal",
        w1: "Lake Balkhash",
        w2: "Lake Khövsgöl",
        exp: "Lake Baikal holds roughly 23,600 cubic kilometers of fresh water, home to the endemic Baikal seal or nerpa."
      },
      {
        q: "Which large lake in southeastern Kazakhstan is unusual for being fresh water in its western half and saline in its eastern half?",
        correct: "Lake Balkhash",
        w1: "Lake Zaysan",
        w2: "Lake Alakol",
        exp: "Lake Balkhash is divided by a narrow strait, with the freshwater western basin fed by the glacial Ili River."
      },
      {
        q: "What major depression in Xinjiang, China, is the second-lowest land depression in the world at 154 meters below sea level?",
        correct: "Turpan Depression",
        w1: "Qattara Depression",
        w2: "Danakil Depression",
        exp: "The Turpan Depression experiences blistering summer heat, utilizing ancient subterranean karez canal systems for grape irrigation."
      }
    ],
    number: {
      q: "What is the lowest land elevation in meters below sea level at the shore of the Dead Sea?",
      target: 430,
      unit: "meters below sea level",
      imperial: "1,411 feet below sea level",
      exp: "The surface of the Dead Sea lies approximately 430 meters below global mean sea level, dropping slowly due to water diversion."
    }
  },

  // Cycle 5: Sacred Asian Peaks & Volcanism
  {
    mcqs: [
      {
        q: "Which iconic snow-draped stratovolcano on Honshu Island is the highest mountain in Japan and a sacred cultural landmark?",
        correct: "Mount Fuji",
        w1: "Mount Ontake",
        w2: "Mount Aso",
        exp: "Mount Fuji stands 3,776 meters high, surrounded by the Fuji Five Lakes and immortalized in Hokusai Thirty-Six Views of Mount Fuji."
      },
      {
        q: "Which sacred volcanic mountain on the border of North Korea and China holds the colossal crater lake named Heaven Lake at its summit?",
        correct: "Mount Paektu",
        w1: "Mount Kumgang",
        w2: "Mount Myohyang",
        exp: "Mount Paektu or Changbai Mountain erupted cataclysmically in 946 CE in one of the most powerful volcanic eruptions in recorded history."
      },
      {
        q: "Which active volcano in East Java sits inside the massive Tengger Caldera, renowned for dramatic sunrises across the Sea of Sand?",
        correct: "Mount Bromo",
        w1: "Mount Merapi",
        w2: "Mount Kelud",
        exp: "Mount Bromo stands 2,329 meters high within Bromo Tengger Semeru National Park, sacred in local Tenggerese Hindu rituals."
      },
      {
        q: "What is the highest mountain on the island of Borneo and in Malaysia, rising 4,095 meters in Sabah?",
        correct: "Mount Kinabalu",
        w1: "Mount Trusmadi",
        w2: "Mount Tambuyukon",
        exp: "Mount Kinabalu is a granitic pluton recognized for rich botanical diversity, including hundreds of endemic orchid and pitcher plant species."
      },
      {
        q: "What is the highest peak and highest volcano in Iran and the Middle East, rising 5,610 meters in the Alborz Mountains?",
        correct: "Mount Damavand",
        w1: "Mount Sabalan",
        w2: "Mount Sahand",
        exp: "Mount Damavand is a dormant stratovolcano holding a prominent place in Persian mythology and epic poetry as a symbol of resistance."
      }
    ],
    number: {
      q: "What is the official summit elevation in meters above sea level of Mount Fuji in Japan?",
      target: 3776,
      unit: "meters",
      imperial: "12,389 feet",
      exp: "Mount Fuji summit stands at exactly 3,776 meters above sea level, last erupting during the Hoei eruption in 1707."
    }
  },

  // Cycle 6: Deserts, Steppes & The Siberian Taiga
  {
    mcqs: [
      {
        q: "What is the largest forested region on Earth, stretching across thousands of kilometers of northern Russia and Siberia?",
        correct: "Siberian Taiga",
        w1: "Valdai Forest",
        w2: "Ussuri Taiga",
        exp: "The Siberian Taiga is a massive biome dominated by coniferous larch, pine, spruce, and fir adapted to long, freezing winters."
      },
      {
        q: "Which cold desert spanning parts of southern Mongolia and northern China is the source of frequent springtime yellow dust storms across East Asia?",
        correct: "Gobi Desert",
        w1: "Taklamakan Desert",
        w2: "Karakum Desert",
        exp: "The Gobi Desert covers 1.3 million square kilometers, bordered by the Altai Mountains and the grassy Mongolian steppes."
      },
      {
        q: "Which vast red sand desert in Uzbekistan and Kazakhstan lies between the Amu Darya and Syr Darya river basins?",
        correct: "Kyzylkum Desert",
        w1: "Karakum Desert",
        w2: "Betpak-Dala",
        exp: "Kyzylkum means Red Sand in Turkic languages, covering roughly 300,000 square kilometers of mineral-rich arid plains."
      },
      {
        q: "What desert in the Indian state of Rajasthan and southeastern Pakistan is one of the most densely populated deserts in the world?",
        correct: "Thar Desert",
        w1: "Cholistan Desert",
        w2: "Rann of Kutch",
        exp: "The Thar Desert supports over eighty people per square kilometer through traditional rainwater harvesting and camel pastoralism."
      },
      {
        q: "What extensive salt marsh desert in the Indian state of Gujarat transforms into a seasonal shallow wetland during the summer monsoon?",
        correct: "Rann of Kutch",
        w1: "Thar Basin",
        w2: "Deccan Salina",
        exp: "The Great Rann of Kutch covers 7,500 square kilometers of blinding white salt crust, famous for the Rann Utsav cultural festival."
      }
    ],
    number: {
      q: "What is the approximate total area in millions of square kilometers covered by the Siberian Taiga forest belt?",
      target: 12,
      unit: "million sq km",
      imperial: "4.6 million sq miles",
      exp: "The Siberian Taiga spans approximately 12 million square kilometers, representing over a quarter of the world total forested area."
    }
  },

  // Cycle 7: Strategic Maritime Gateways & Gulfs
  {
    mcqs: [
      {
        q: "Which narrow 900-kilometer strait between the Malay Peninsula and Sumatra is the busiest maritime shipping chokepoint in the world?",
        correct: "Strait of Malacca",
        w1: "Sunda Strait",
        w2: "Lombok Strait",
        exp: "Over 85,000 commercial vessels transit the Strait of Malacca each year, carrying one-quarter of all global traded goods."
      },
      {
        q: "Which narrow strait connects the Persian Gulf to the Gulf of Oman, carrying approximately one-fifth of the world total petroleum consumption?",
        correct: "Strait of Hormuz",
        w1: "Bab-el-Mandeb",
        w2: "Strait of Malacca",
        exp: "The Strait of Hormuz is bordered by Iran and Oman, with navigation channels only three kilometers wide in each direction."
      },
      {
        q: "Which strait connects the Red Sea to the Gulf of Aden between Yemen and Djibouti, with a name translating to Gate of Tears?",
        correct: "Bab-el-Mandeb",
        w1: "Strait of Tiran",
        w2: "Suez Passage",
        exp: "Bab-el-Mandeb acts as the strategic southern maritime gateway to the Red Sea and the Suez Canal route to Europe."
      },
      {
        q: "Which shallow strait separates the easternmost point of Asia at Cape Dezhnev from the westernmost point of North America at Cape Prince of Wales?",
        correct: "Bering Strait",
        w1: "Tartary Strait",
        w2: "La Pérouse Strait",
        exp: "The Bering Strait is approximately eighty-two kilometers wide, linking the Arctic Chukchi Sea with the Pacific Bering Sea."
      },
      {
        q: "Which strait separates the Indonesian islands of Java and Sumatra, connecting the Java Sea to the Indian Ocean?",
        correct: "Sunda Strait",
        w1: "Lombok Strait",
        w2: "Makassar Strait",
        exp: "The Sunda Strait is famous for hosting the volcanic island of Krakatoa, which erupted cataclysmically in 1883."
      }
    ],
    number: {
      q: "What is the approximate total length in kilometers of the Strait of Malacca between the Malay Peninsula and Sumatra?",
      target: 900,
      unit: "km",
      imperial: "560 miles",
      exp: "The Strait of Malacca stretches roughly 900 kilometers from the Andaman Sea in the north to Singapore in the south."
    }
  },

  // Cycle 8: Southeast Asian Archipelagos & Rainforests
  {
    mcqs: [
      {
        q: "What is the largest continuous mangrove forest in the world, spanning the delta of the Ganges and Brahmaputra across Bangladesh and India?",
        correct: "Sundarbans",
        w1: "Pichavaram",
        w2: "Bhitarkanika",
        exp: "The Sundarbans covers 10,000 square kilometers of tidal halophytic mangrove forest, home to the endangered Royal Bengal tiger."
      },
      {
        q: "Which island in the Sunda Strait experienced one of the deadliest and loudest volcanic eruptions in recorded history on August 27, 1883?",
        correct: "Krakatoa",
        w1: "Tambora",
        w2: "Kelud",
        exp: "Krakatoa explosion generated tsunamis over thirty meters high and was heard nearly 4,800 kilometers away on Rodrigues Island."
      },
      {
        q: "Which island province of the Philippines is celebrated for its 8.2-kilometer navigable Underground River flowing through a karst cave into the sea?",
        correct: "Palawan",
        w1: "Cebu",
        w2: "Bohol",
        exp: "Puerto Princesa Subterranean River National Park is a UNESCO World Heritage site featuring dramatic stalactites and cathedral chambers."
      },
      {
        q: "What vast, biodiversity-rich rainforest on Borneo is estimated to be 140 million years old, older than the Amazon rainforest?",
        correct: "Borneo Lowland Rainforest",
        w1: "Taman Negara",
        w2: "Harapan Rainforest",
        exp: "Borneo ancient dipterocarp rainforests harbor over 15,000 plant species, Bornean orangutans, and pygmy elephants."
      },
      {
        q: "Which Indonesian island is known as the Island of the Gods, celebrated for terraced rice paddies and volcanic temples around Mount Agung?",
        correct: "Bali",
        w1: "Lombok",
        w2: "Flores",
        exp: "Bali is world-renowned for its Subak cooperative irrigation water temple system dating back to the ninth century."
      }
    ],
    number: {
      q: "In what year did the catastrophic eruption of Krakatoa occur in the Sunda Strait, generating global shockwaves?",
      target: 1883,
      unit: "year",
      imperial: "1883 AD",
      exp: "Krakatoa erupted cataclysmically on August 26-27, 1883, killing over 36,000 people primarily through massive tsunamis."
    }
  },

  // Cycle 9: The Indian Subcontinent & Himalayan Frontiers
  {
    mcqs: [
      {
        q: "Which mountain range along the western coast of India is recognized as one of the world eight hottest biodiversity hotspots?",
        correct: "Western Ghats",
        w1: "Eastern Ghats",
        w2: "Aravalli Range",
        exp: "The Western Ghats, or Sahyadri, intercept the southwest monsoon, harboring thousands of endemic flowering plants, amphibians, and mammals."
      },
      {
        q: "What is the oldest mountain range in India, stretching from Gujarat through Rajasthan to Delhi?",
        correct: "Aravalli Range",
        w1: "Vindhya Range",
        w2: "Satpura Range",
        exp: "The Aravalli Range is an ancient eroded fold mountain belt dating back over two billion years to the Proterozoic Eon."
      },
      {
        q: "What vast alluvial plain covers northern India and Bangladesh, formed by rich silt deposits from the Indus, Ganges, and Brahmaputra rivers?",
        correct: "Indo-Gangetic Plain",
        w1: "Deccan Basin",
        w2: "Malabar Plain",
        exp: "The Indo-Gangetic Plain is one of the most fertile and densely populated agricultural regions on Earth, home to over 400 million people."
      },
      {
        q: "What glacier in the eastern Karakoram Range is the longest glacier in the Karakoram and the second-longest non-polar glacier in the world?",
        correct: "Siachen Glacier",
        w1: "Biafo Glacier",
        w2: "Baltoro Glacier",
        exp: "The Siachen Glacier spans seventy-six kilometers, known geopolitically as the highest battleground on Earth."
      },
      {
        q: "What famous tea-growing hill station in West Bengal, India, sits in the Mahabharat Range of the Himalayas at over 2,000 meters altitude?",
        correct: "Darjeeling",
        w1: "Shimla",
        w2: "Ooty",
        exp: "Darjeeling is world-famous for its high-grown black tea and the historic UNESCO-listed Darjeeling Himalayan Toy Train railway."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Siachen Glacier in the Karakoram Range?",
      target: 76,
      unit: "km",
      imperial: "47 miles",
      exp: "The Siachen Glacier measures approximately 76 kilometers from its source at Indira Col to its snout at 3,620 meters altitude."
    }
  },

  // Cycle 10: East Asian Landscapes & Ancient Basins
  {
    mcqs: [
      {
        q: "What is the largest freshwater lake in Japan, located in Shiga Prefecture northeast of Kyoto?",
        correct: "Lake Biwa",
        w1: "Lake Kasumigaura",
        w2: "Lake Ashi",
        exp: "Lake Biwa is an ancient lake over four million years old, supporting unique endemic species including the Biwa trout."
      },
      {
        q: "What large endorheic basin in Xinjiang, northwestern China, is encircled by mountains and filled by the Taklamakan Desert?",
        correct: "Tarim Basin",
        w1: "Junggar Basin",
        w2: "Sichuan Basin",
        exp: "The Tarim Basin is fed by the glacial Tarim River, historically traversed along northern and southern Silk Road oasis tracks."
      },
      {
        q: "Which high-density agricultural basin in southwestern China is nicknamed the Red Basin or Land of Abundance due to its fertile purple soils?",
        correct: "Sichuan Basin",
        w1: "Tarim Basin",
        w2: "Songliao Basin",
        exp: "The Sichuan Basin is encircled by mountains and watered by the ancient Dujiangyan irrigation system dating to 256 BCE."
      },
      {
        q: "What famous sandstone fossil site in the Mongolian Gobi Desert was where American explorer Roy Chapman Andrews discovered the first fossilized dinosaur eggs?",
        correct: "Flaming Cliffs",
        w1: "Nemegt Basin",
        w2: "Tugriken Shireh",
        exp: "Known locally as Bayanzag, the Flaming Cliffs yielded groundbreaking discoveries of Protoceratops and Oviraptor nests in the 1920s."
      },
      {
        q: "What series of dramatic gorges along the middle reaches of the Yangtze River was transformed by the construction of the world largest hydroelectric dam?",
        correct: "Three Gorges",
        w1: "Tiger Leaping Gorge",
        w2: "Taroko Gorge",
        exp: "The Qutang, Wu, and Xiling gorges span nearly two hundred kilometers of steep limestone cliffs along the Yangtze."
      }
    ],
    number: {
      q: "In what year did Roy Chapman Andrews expeditions discover the first confirmed dinosaur eggs at the Flaming Cliffs in the Gobi Desert?",
      target: 1923,
      unit: "year",
      imperial: "1923 AD",
      exp: "The Central Asiatic Expedition of the American Museum of Natural History uncovered the famous dinosaur nests in July 1923."
    }
  }
];

buildQuiz({
  id: "asian-geography-landmarks-60",
  theme: "Asian Geography: Rivers, Steppes & Natural Wonders",
  title: "Asian Geography: Rivers, Steppes & Natural Wonders",
  description: "Comprehensive 60-question master assessment exploring the Tibetan Plateau, Siberian taiga, ancient steppes, sacred rivers, and natural wonders of Asia.",
  category: "Geography, Capitals & Landscapes",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z"
}, asianCycles);


// =========================================================================
// 8. african-geography-safari-60
// Theme: "African Geography: Rift Valley, Sahara & Diverse Biomes"
// Category: "Geography, Capitals & Landscapes"
// =========================================================================
const africanCycles = [
  // Cycle 1: The Great Rift Valley & Tectonic Marvels
  {
    mcqs: [
      {
        q: "What massive continuous tectonic trench system stretches over six thousand kilometers from Lebanon to Mozambique, splitting the African continent?",
        correct: "East African Rift System",
        w1: "Mid-African Trench",
        w2: "Trans-Saharan Fault",
        exp: "The rift is slowly pulling the Somali tectonic plate away from the Nubian plate, forming volcanic mountains and deep rift lakes."
      },
      {
        q: "Which volcano in northern Tanzania is the only active volcano on Earth known to erupt black natrocarbonatite lava rather than silicate lava?",
        correct: "Ol Doinyo Lengai",
        w1: "Mount Meru",
        w2: "Mount Nyiragongo",
        exp: "Ol Doinyo Lengai or Mountain of God erupts low-temperature carbonate lava that turns white upon exposure to atmospheric moisture."
      },
      {
        q: "What is the largest unbroken, unflooded volcanic caldera on Earth, located in northern Tanzania and hosting over twenty-five thousand large mammals?",
        correct: "Ngorongoro Crater",
        w1: "Empakaai Crater",
        w2: "Menengai Crater",
        exp: "Ngorongoro formed when a giant volcano exploded and collapsed on itself roughly two to three million years ago, creating a 600-meter-deep haven."
      },
      {
        q: "Which active stratovolcano in Virunga National Park in the DRC is infamous for hosting the world largest persistent churning lava lake?",
        correct: "Mount Nyiragongo",
        w1: "Nyamuragira",
        w2: "Mount Karisimbi",
        exp: "Mount Nyiragongo lava has extremely low silica content, allowing it to flow down mountain slopes at lethal speeds up to 100 km/h."
      },
      {
        q: "Which low-lying geological depression in northeastern Ethiopia sits at the junction of three tectonic plates, featuring vibrant yellow sulfur springs?",
        correct: "Danakil Depression",
        w1: "Qattara Depression",
        w2: "Afar Triple Basin",
        exp: "The Danakil Depression lies in the Afar Triangle where the African, Somali, and Arabian plates are rifting apart."
      }
    ],
    number: {
      q: "What is the approximate diameter in kilometers of the unbroken Ngorongoro volcanic crater in Tanzania?",
      target: 20,
      unit: "km",
      imperial: "12 miles",
      exp: "The Ngorongoro caldera spans approximately 20 kilometers in diameter, enclosing 260 square kilometers of grassland and soda lakes."
    }
  },

  // Cycle 2: African Great Lakes & Water Systems
  {
    mcqs: [
      {
        q: "What is the largest lake in Africa by surface area, shared by Tanzania, Uganda, and Kenya, and acting as the chief source of the White Nile?",
        correct: "Lake Victoria",
        w1: "Lake Tanganyika",
        w2: "Lake Malawi",
        exp: "Lake Victoria covers approximately 59,940 square kilometers, making it the second-largest freshwater lake in the world."
      },
      {
        q: "Which East African Great Lake is the second-deepest lake in the world, plunging to 1,470 meters along the Western Rift?",
        correct: "Lake Tanganyika",
        w1: "Lake Malawi",
        w2: "Lake Kivu",
        exp: "Lake Tanganyika holds nearly eighteen percent of the world surface freshwater, shared by Tanzania, DRC, Burundi, and Zambia."
      },
      {
        q: "Which Great Lake in southern Africa is famed among evolutionary biologists for harboring over one thousand unique endemic species of cichlid fish?",
        correct: "Lake Malawi",
        w1: "Lake Albert",
        w2: "Lake Edward",
        exp: "Lake Malawi, also known as Lake Nyasa, features crystal-clear waters and has evolved more fish species than any other lake."
      },
      {
        q: "Which shallow, alkaline desert lake in northern Kenya is known as the Jade Sea due to vibrant blue-green algae blooms?",
        correct: "Lake Turkana",
        w1: "Lake Baringo",
        w2: "Lake Bogoria",
        exp: "Lake Turkana is the world largest permanent desert lake, famous for hominid fossil discoveries at Koobi Fora by Richard Leakey."
      },
      {
        q: "Which Great Lake situated between Rwanda and the DRC contains massive quantities of dissolved methane and carbon dioxide in its deep waters?",
        correct: "Lake Kivu",
        w1: "Lake Albert",
        w2: "Lake George",
        exp: "Lake Kivu is a meromictic lake undergoing commercial methane extraction projects to generate electrical power."
      }
    ],
    number: {
      q: "What is the maximum recorded water depth in meters of Lake Tanganyika in the East African Rift?",
      target: 1470,
      unit: "meters",
      imperial: "4,823 feet",
      exp: "Lake Tanganyika reaches a maximum depth of 1,470 meters in its northern basin, second only to Lake Baikal in depth."
    }
  },

  // Cycle 3: Iconic Savannas & Migration Corridors
  {
    mcqs: [
      {
        q: "Which national park in northern Tanzania is world-famous for hosting the annual Great Migration of over 1.5 million blue wildebeest and zebras?",
        correct: "Serengeti National Park",
        w1: "Tarangire National Park",
        w2: "Ruaha National Park",
        exp: "The Serengeti ecosystem spans 30,000 square kilometers, where herds traverse circular migration routes across the Mara River."
      },
      {
        q: "Which national reserve in southwestern Kenya forms the northern continuation of the Serengeti plains across the Mara River?",
        correct: "Maasai Mara National Reserve",
        w1: "Amboseli National Park",
        w2: "Tsavo National Park",
        exp: "The Maasai Mara is famous for its dense predator populations of lions, leopards, and cheetahs following migrating ungulate herds."
      },
      {
        q: "Which Kenyan national park is famous for spectacular views of Mount Kilimanjaro towering across the border behind free-ranging elephant herds?",
        correct: "Amboseli National Park",
        w1: "Samburu National Reserve",
        w2: "Meru National Park",
        exp: "Amboseli features observation hills and underground springs fed by melting Kilimanjaro snowpack, supporting massive bull elephants."
      },
      {
        q: "What is the largest national park in South Africa, covering nearly twenty thousand square kilometers along the Mozambique border?",
        correct: "Kruger National Park",
        w1: "Kgalagadi Transfrontier Park",
        w2: "Addo Elephant National Park",
        exp: "Established in 1898 as the Sabie Game Reserve, Kruger is a flagship African wildlife sanctuary supporting all the Big Five mammals."
      },
      {
        q: "Which massive national park complex in southeastern Kenya is divided into East and West sectors, famous for red elephants rolling in volcanic dust?",
        correct: "Tsavo National Park",
        w1: "Aberdare National Park",
        w2: "Mount Kenya National Park",
        exp: "Tsavo is Kenya largest national park, spanning 22,000 square kilometers of semi-arid scrub, the Yatta Plateau, and Mzima Springs."
      }
    ],
    number: {
      q: "Approximately how many blue wildebeest participate in the annual Great Migration across the Serengeti-Mara ecosystem?",
      target: 1500000,
      unit: "wildebeest",
      imperial: "1.5 million animals",
      exp: "An estimated 1.5 million wildebeest, accompanied by 200,000 zebras and 300,000 gazelles, make the continuous 800-kilometer circuit."
    }
  },

  // Cycle 4: Great African Rivers & Waterfalls
  {
    mcqs: [
      {
        q: "What is the longest river in Africa and traditionally recognized as the longest river in the world, stretching over 6,650 kilometers?",
        correct: "Nile River",
        w1: "Congo River",
        w2: "Niger River",
        exp: "The Nile River is formed by the convergence of the White Nile from Lake Victoria and the Blue Nile from Lake Tana in Ethiopia at Khartoum."
      },
      {
        q: "Which African river is the second-longest on the continent and carries the second-largest water discharge volume in the world after the Amazon?",
        correct: "Congo River",
        w1: "Zambezi River",
        w2: "Orange River",
        exp: "The Congo River drains an expansive equatorial rainforest basin of 3.7 million square kilometers, flowing through Malebo Pool to the Atlantic."
      },
      {
        q: "What major southern African river rises in Zambia, flows over Victoria Falls, and empties into the Indian Ocean in Mozambique?",
        correct: "Zambezi River",
        w1: "Limpopo River",
        w2: "Okavango River",
        exp: "The Zambezi spans 2,574 kilometers, supplying major hydroelectric projects at the Kariba Dam and Cahora Bassa Dam."
      },
      {
        q: "Which major river in West Africa follows an unusual crescent boomerang course, flowing north toward the Sahara before curving south to the Gulf of Guinea?",
        correct: "Niger River",
        w1: "Senegal River",
        w2: "Volta River",
        exp: "The Niger River flows 4,180 kilometers through Guinea, Mali, Niger, Benin, and Nigeria, creating the fertile Inner Niger Delta in Mali."
      },
      {
        q: "What is the longest river located entirely within South Africa, rising in the Drakensberg Mountains and flowing west to the Atlantic Ocean?",
        correct: "Orange River",
        w1: "Vaal River",
        w2: "Tugela River",
        exp: "The Orange River, or Gariep, flows 2,200 kilometers, defining borders between South Africa, Lesotho, and Namibia."
      }
    ],
    number: {
      q: "What is the maximum recorded depth in meters of the Congo River, making it the deepest known river in the world?",
      target: 220,
      unit: "meters",
      imperial: "720 feet",
      exp: "Deep canyon sections along the lower Congo River rapids plunge past 220 meters, preventing cross-river fish gene flow."
    }
  },

  // Cycle 5: African Deserts & Arid Wonders
  {
    mcqs: [
      {
        q: "What is the largest hot desert on Earth, covering over nine million square kilometers across the northern third of Africa?",
        correct: "Sahara Desert",
        w1: "Namib Desert",
        w2: "Kalahari Desert",
        exp: "The Sahara encompasses ergs, regs, and mountain massifs such as the Tibesti and Ahaggar, stretching from the Atlantic to the Red Sea."
      },
      {
        q: "Which coastal desert in southwestern Africa features the towering red sand dunes of Sossusvlei and the stark dead camel thorn trees of Deadvlei?",
        correct: "Namib Desert",
        w1: "Kalahari Desert",
        w2: "Karoo Desert",
        exp: "The Namib is directly cooled by the offshore Benguela Current, producing regular sea fogs that sustain desert beetles and plants."
      },
      {
        q: "What large semi-arid sandy savanna basin covers most of Botswana and parts of Namibia and South Africa?",
        correct: "Kalahari Desert",
        w1: "Danakil Desert",
        w2: "Nubian Desert",
        exp: "The Kalahari is covered in red Kalahari sands but receives more rainfall than a true desert, supporting acacias and San hunter-gatherers."
      },
      {
        q: "What barren hyper-arid sand sea in north-central Niger is famous as the Tenere, which once contained the world most isolated solitary tree?",
        correct: "Ténéré Desert",
        w1: "Libyan Desert",
        w2: "Bayuda Desert",
        exp: "The Tree of Ténéré was an acacia that stood as the only tree for over 400 kilometers around until struck by a truck in 1973."
      },
      {
        q: "What massive seasonal salt pan network in northeastern Botswana is the remnant of the ancient super-lake Lake Makgadikgadi?",
        correct: "Makgadikgadi Pan",
        w1: "Etosha Pan",
        w2: "Salar Pan",
        exp: "The Makgadikgadi Pans cover 16,000 square kilometers, hosting massive zebra migrations and breeding flamingo flocks during wet seasons."
      }
    ],
    number: {
      q: "What is the estimated geological age in millions of years of the hyper-arid Namib Desert?",
      target: 55,
      unit: "million years",
      imperial: "55 million years old",
      exp: "Geologists estimate the Namib Desert has experienced continuous arid or hyper-arid conditions for at least 55 million years."
    }
  },

  // Cycle 6: The Congo Basin Rainforest & Biomes
  {
    mcqs: [
      {
        q: "What is the second-largest contiguous tropical rainforest in the world after the Amazon, covering 3.7 million square kilometers in Central Africa?",
        correct: "Congo Basin Rainforest",
        w1: "Upper Guinean Forest",
        w2: "Madagascar Rainforest",
        exp: "The Congo Basin spans six nations, storing eight percent of global forest carbon and acting as the green heart of Africa."
      },
      {
        q: "Which dense rainforest in northeastern DRC is the primary native habitat of the elusive okapi, a forest giraffe with zebra-striped legs?",
        correct: "Ituri Rainforest",
        w1: "Nyungwe Forest",
        w2: "Taï Forest",
        exp: "The Ituri Forest is also the ancestral home of the indigenous Mbuti pygmy hunter-gatherers living along the Epulu River."
      },
      {
        q: "Which national park in the Democratic Republic of the Congo was Africa first national park, established in 1925 to protect mountain gorillas?",
        correct: "Virunga National Park",
        w1: "Kahuzi-Biega National Park",
        w2: "Garamba National Park",
        exp: "Virunga National Park encompasses the Rwenzori glaciers, Mount Nyiragongo lava lake, and endangered mountain gorilla sectors."
      },
      {
        q: "Which UNESCO World Heritage national park in southwestern Uganda is named for its dense, mist-shrouded jungle canopy harboring mountain gorillas?",
        correct: "Bwindi Impenetrable National Park",
        w1: "Queen Elizabeth National Park",
        w2: "Murchison Falls National Park",
        exp: "Bwindi Impenetrable Forest contains nearly half of the world remaining wild mountain gorilla population."
      },
      {
        q: "What transition zone of semi-arid savanna and grasslands separates the hyper-arid Sahara Desert from the humid tropical savannas to the south?",
        correct: "Sahel",
        w1: "Miombo",
        w2: "Bushveld",
        exp: "The Sahel stretches 5,400 kilometers from the Atlantic Ocean to the Red Sea across Senegal, Mali, Burkina Faso, Niger, Chad, and Sudan."
      }
    ],
    number: {
      q: "What is the approximate total land area in millions of square kilometers of the Congo Basin drainage and rainforest region?",
      target: 3.7,
      unit: "million sq km",
      imperial: "1.4 million sq miles",
      exp: "The Congo Basin covers approximately 3.7 million square kilometers, encompassing equatorial forests across central Africa."
    }
  },

  // Cycle 7: Wetlands & Endorheic Oases
  {
    mcqs: [
      {
        q: "What world-famous endorheic wetland in Botswana is formed where the Okavango River empties onto the sands of the Kalahari Desert basin?",
        correct: "Okavango Delta",
        w1: "Chobe Wetland",
        w2: "Linyanti Swamp",
        exp: "The Okavango Delta floods annually during the dry winter season, transforming desert plains into an oasis for wildlife."
      },
      {
        q: "What is the name of the colossal swamp in South Sudan formed by the White Nile, representing one of the largest freshwater wetlands in the world?",
        correct: "Sudd",
        w1: "Bangweulu Swamps",
        w2: "Lorna Marshes",
        exp: "The Sudd covers over 30,000 square kilometers of papyrus and floating aquatic vegetation, evaporating over half the White Nile water."
      },
      {
        q: "Which mineral-rich, bright red alkaline lake in northern Tanzania is the primary breeding ground for over 2.5 million Lesser Flamingos?",
        correct: "Lake Natron",
        w1: "Lake Manyara",
        w2: "Lake Magadi",
        exp: "Lake Natron caustic water reaches pH levels above 10.5, with halophilic spirulina cyanobacteria providing food and pink plumage to flamingos."
      },
      {
        q: "Which scenic river canyon in Mpumalanga, South Africa, is recognized as one of the largest green canyons on Earth, featuring the Three Rondavels?",
        correct: "Blyde River Canyon",
        w1: "Fish River Canyon",
        w2: "Oribi Gorge",
        exp: "Blyde River Canyon plunges 800 meters through lush subtropical foliage and red sandstone cliffs along the Drakensberg escarpment."
      },
      {
        q: "Which massive canyon in southern Namibia is the second-largest canyon in the world after the Grand Canyon, carved by ancient flash floods?",
        correct: "Fish River Canyon",
        w1: "Kuiseb Canyon",
        w2: "Sesriem Canyon",
        exp: "Fish River Canyon stretches 160 kilometers long, up to 27 kilometers wide, and plunges 550 meters deep into barren desert rock."
      }
    ],
    number: {
      q: "In what year was the Okavango Delta in Botswana officially inscribed as the milestone 1,000th UNESCO World Heritage Site?",
      target: 2014,
      unit: "year",
      imperial: "2014 AD",
      exp: "The World Heritage Committee officially inscribed the Okavango Delta as the 1,000th World Heritage Site on June 22, 2014."
    }
  },

  // Cycle 8: African Mountain Ranges & Peaks
  {
    mcqs: [
      {
        q: "What major mountain range stretches across Morocco, Algeria, and Tunisia, separating the Mediterranean coastline from the Sahara Desert?",
        correct: "Atlas Mountains",
        w1: "Rif Mountains",
        w2: "Ahaggar Mountains",
        exp: "The Atlas Mountains span 2,500 kilometers, crowned by Toubkal peak at 4,167 meters in the High Atlas of southwestern Morocco."
      },
      {
        q: "What is the highest mountain peak in the Atlas Mountains and the highest summit in North Africa, located in Morocco?",
        correct: "Toubkal",
        w1: "M Goun",
        w2: "Ouanoukrim",
        exp: "Jbel Toubkal stands at 4,167 meters in Toubkal National Park, first climbed by European mountaineers in 1923."
      },
      {
        q: "What is the highest mountain range in Southern Africa, forming an imposing basalt escarpment and the border between South Africa and Lesotho?",
        correct: "Drakensberg",
        w1: "Cederberg",
        w2: "Swartberg",
        exp: "Known as uKhahlamba or Barrier of Spears in Zulu, the Drakensberg rises to 3,482 meters at Thabana Ntlenyana in Lesotho."
      },
      {
        q: "Which rugged volcanic mountain plateau in northern Ethiopia is nicknamed the Chess Pieces of the Gods and hosts endemic Gelada baboons?",
        correct: "Simien Mountains",
        w1: "Bale Mountains",
        w2: "Danakil Alps",
        exp: "The Simien Mountains feature Ras Dashen at 4,550 meters, characterized by massive sheer precipices and Walia ibex."
      },
      {
        q: "What active stratovolcano near the coast of the Gulf of Guinea is the highest peak in West and Central Africa at 4,040 meters?",
        correct: "Mount Cameroon",
        w1: "Mount Oku",
        w2: "Pico Basilé",
        exp: "Known locally as Fako, Mount Cameroon rises directly near the Atlantic ocean shore and last erupted in February 2000."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Toubkal, the highest peak in North Africa?",
      target: 4167,
      unit: "meters",
      imperial: "13,671 feet",
      exp: "Jbel Toubkal in the High Atlas of Morocco reaches a summit elevation of 4,167 meters above sea level."
    }
  },

  // Cycle 9: Capes, Horns & Continental Extremes
  {
    mcqs: [
      {
        q: "What rocky promontory at the southern tip of the Cape Peninsula is famous in maritime lore as the Cape of Storms?",
        correct: "Cape of Good Hope",
        w1: "Cape Agulhas",
        w2: "Cape Point",
        exp: "Portuguese explorer Bartolomeu Dias rounded the cape in 1488, renamed Cabo da Boa Esperança by King John II of Portugal."
      },
      {
        q: "What geographical headland in South Africa is the true southernmost point of the African continent and official boundary between the Atlantic and Indian oceans?",
        correct: "Cape Agulhas",
        w1: "Cape of Good Hope",
        w2: "Cape Saint Blaize",
        exp: "Cape Agulhas lies roughly 150 kilometers southeast of the Cape of Good Hope at latitude 34 degrees 50 minutes South."
      },
      {
        q: "What promontory in northern Tunisia near Bizerte marks the northernmost point of the continental African mainland?",
        correct: "Ras ben Sakka",
        w1: "Cape Angela",
        w2: "Cape Bon",
        exp: "Ras ben Sakka sits at latitude 37 degrees 21 minutes North, extending just slightly further north than neighboring Cape Angela."
      },
      {
        q: "What major peninsula in East Africa projects hundreds of kilometers into the Arabian Sea, commonly known as the Horn of Africa?",
        correct: "Somali Peninsula",
        w1: "Sinai Peninsula",
        w2: "Bakassi Peninsula",
        exp: "The Horn of Africa encompasses Somalia, Ethiopia, Eritrea, and Djibouti along the strategic Gulf of Aden."
      },
      {
        q: "How many sovereign African nations are intersected directly by the terrestrial Equator line?",
        correct: "7",
        w1: "5",
        w2: "9",
        exp: "The Equator crosses Gabon, Republic of the Congo, DRC, Uganda, Kenya, Somalia, and the island nation of São Tomé and Príncipe."
      }
    ],
    number: {
      q: "How many sovereign African nations are directly crossed by the line of the terrestrial Equator?",
      target: 7,
      unit: "countries",
      imperial: "7 African nations",
      exp: "Seven African nations lie on the Equator: São Tomé and Príncipe, Gabon, Republic of the Congo, DRC, Uganda, Kenya, and Somalia."
    }
  },

  // Cycle 10: Island Sanctuaries & Coastal Marvels
  {
    mcqs: [
      {
        q: "Which large island nation in the Indian Ocean is famous for its Avenue of the Baobabs and over one hundred distinct species of lemurs?",
        correct: "Madagascar",
        w1: "Mauritius",
        w2: "Comoros",
        exp: "Madagascar broke away from India roughly eighty-eight million years ago, allowing plants and animals to evolve in near-complete isolation."
      },
      {
        q: "Which semi-autonomous Tanzanian archipelago in the Indian Ocean is celebrated historically as the Spice Island, famous for cloves and Stone Town?",
        correct: "Zanzibar",
        w1: "Mafia Island",
        w2: "Pemba Island",
        exp: "Zanzibar, or Unguja, was a major historical hub of the Omani sultanate and Indian Ocean spice and dhow trade."
      },
      {
        q: "Which volcanic island in the Mascarene archipelago east of Madagascar was the only historical home of the extinct flightless Dodo bird?",
        correct: "Mauritius",
        w1: "Réunion",
        w2: "Rodrigues",
        exp: "The dodo Raphus cucullatus became extinct around the 1660s following Dutch settlement and the introduction of invasive predators."
      },
      {
        q: "What famous flat-topped sandstone mountain overlooks Cape Town, flanked by Devil Peak and Lion Head?",
        correct: "Table Mountain",
        w1: "Twelve Apostles",
        w2: "Signal Hill",
        exp: "Table Mountain stands 1,086 meters high, often covered by a dramatic orographic cloud layer known as the Tablecloth."
      },
      {
        q: "Which triangular peninsula in Egypt links the African continent to Asia, bordered by the Gulf of Suez and the Gulf of Aqaba?",
        correct: "Sinai Peninsula",
        w1: "Arabian Peninsula",
        w2: "Ras Muhammad Peninsula",
        exp: "The Sinai Peninsula serves as a continental land bridge, hosting Mount Catherine at 2,629 meters and Saint Catherine Monastery."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Mount Cameroon near the Atlantic coast?",
      target: 4040,
      unit: "meters",
      imperial: "13,255 feet",
      exp: "Mount Cameroon stands at 4,040 meters above sea level, rising steeply from tropical coastal lowlands."
    }
  }
];

buildQuiz({
  id: "african-geography-safari-60",
  theme: "African Geography: Rift Valley, Sahara & Diverse Biomes",
  title: "African Geography: Rift Valley, Sahara & Diverse Biomes",
  description: "Comprehensive 60-question safari through the Great Rift Valley, the Sahara, the Congo rainforest, vast savannas, and iconic wildlife sanctuaries.",
  category: "Geography, Capitals & Landscapes",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z"
}, africanCycles);
