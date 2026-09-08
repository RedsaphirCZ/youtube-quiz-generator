const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 1. world-capitals-megacities-60
// Theme: "World Capitals, Megacities & Urban Geography"
// Category: "Geography, Capitals & Landscapes"
// =========================================================================
const capitalsCycles = [
  // Cycle 1: Planned & Purpose-Built National Capitals
  {
    mcqs: [
      {
        q: "Which planned capital city was designed in the shape of a massive airplane by urban planner Lúcio Costa and inaugurated in 1960?",
        correct: "Brasília",
        w1: "Canberra",
        w2: "Islamabad",
        exp: "Brasília was constructed in the interior Brazilian highlands with landmark modernist administrative buildings designed by Oscar Niemeyer."
      },
      {
        q: "In 2005, which Southeast Asian nation officially transferred its administrative capital from Yangon to the purpose-built city of Naypyidaw?",
        correct: "Myanmar",
        w1: "Cambodia",
        w2: "Laos",
        exp: "Naypyidaw was developed inland as a sprawling, planned administrative center with twenty-lane boulevards and expansive ministry zones."
      },
      {
        q: "Which national capital was planned by American architect Walter Burley Griffin as a compromise between two rival cities?",
        correct: "Canberra",
        w1: "Wellington",
        w2: "Ottawa",
        exp: "Canberra was chosen and designed as the federal capital of Australia situated in a purpose-built territory between Sydney and Melbourne."
      },
      {
        q: "Which West African nation moved its official federal capital from coastal Lagos to the centrally located planned city of Abuja in 1991?",
        correct: "Nigeria",
        w1: "Ghana",
        w2: "Ivory Coast",
        exp: "Abuja was selected for its geographic centrality and neutral ethnic positioning, dominated by the colossal monolith Zuma Rock."
      },
      {
        q: "Which planned capital city replaced Karachi as the permanent seat of government in Pakistan during the 1960s?",
        correct: "Islamabad",
        w1: "Lahore",
        w2: "Rawalpindi",
        exp: "Islamabad was designed by Greek urban planner Constantinos Doxiadis in a grid-like sector layout near the Margalla Hills."
      }
    ],
    number: {
      q: "In what year was Brasília officially inaugurated as the new federal capital of Brazil?",
      target: 1960,
      unit: "year",
      imperial: "1960 AD",
      exp: "President Juscelino Kubitschek officially inaugurated Brasília on April 21, 1960, replacing Rio de Janeiro as the national seat of power."
    }
  },

  // Cycle 2: High-Altitude & Extreme Capitals
  {
    mcqs: [
      {
        q: "Which city is the highest administrative national capital in the world, sitting over 3,600 meters above sea level in an Andean canyon?",
        correct: "La Paz",
        w1: "Quito",
        w2: "Bogotá",
        exp: "La Paz serves as the seat of Bolivia executive and legislative branches, nestled within a dramatic canyon beneath Mount Illimani."
      },
      {
        q: "Which South American capital city is situated just twenty-five kilometers south of the Equator on the slopes of the active Pichincha volcano?",
        correct: "Quito",
        w1: "Lima",
        w2: "Caracas",
        exp: "Quito is the capital of Ecuador and one of the highest national capitals on Earth at roughly 2,850 meters elevation."
      },
      {
        q: "Which national capital is recognized as the coldest capital city on Earth by annual mean temperature?",
        correct: "Ulaanbaatar",
        w1: "Astana",
        w2: "Reykjavik",
        exp: "Ulaanbaatar in Mongolia experiences extreme subarctic continental winters, with average January temperatures plunging below minus twenty degrees Celsius."
      },
      {
        q: "What is the northernmost capital city of an independent sovereign nation on Earth?",
        correct: "Reykjavik",
        w1: "Helsinki",
        w2: "Oslo",
        exp: "Reykjavik in Iceland sits at approximately 64 degrees 08 minutes North latitude, making it the most northerly sovereign capital."
      },
      {
        q: "Which city holds the distinction of being the southernmost national capital in the world?",
        correct: "Wellington",
        w1: "Canberra",
        w2: "Buenos Aires",
        exp: "Wellington at the southern tip of New Zealand North Island sits at approximately 41 degrees 17 minutes South latitude."
      }
    ],
    number: {
      q: "What is the approximate elevation in meters above sea level of La Paz, the world highest administrative capital?",
      target: 3640,
      unit: "meters",
      imperial: "11,942 feet",
      exp: "La Paz sits at an average altitude of approximately 3,640 meters, while its adjoining sister city El Alto exceeds 4,000 meters."
    }
  },

  // Cycle 3: Multi-Capital Nations & Special Enclaves
  {
    mcqs: [
      {
        q: "Which country has three official capital cities dividing administrative, legislative, and judicial powers across Pretoria, Cape Town, and Bloemfontein?",
        correct: "South Africa",
        w1: "Nigeria",
        w2: "Malaysia",
        exp: "South Africa distributes national power among Pretoria as executive, Cape Town as legislative, and Bloemfontein as judicial capitals."
      },
      {
        q: "What historic city is recognized in the national constitution as the historic constitutional capital of Bolivia, where the supreme court sits?",
        correct: "Sucre",
        w1: "Cochabamba",
        w2: "Santa Cruz",
        exp: "Sucre is the constitutional and judicial capital of Bolivia, while La Paz houses the national congress and presidential palace."
      },
      {
        q: "Although Amsterdam is the constitutional capital of the Netherlands, in which city do the parliament and royal court reside?",
        correct: "The Hague",
        w1: "Rotterdam",
        w2: "Utrecht",
        exp: "The Hague has served as the actual seat of Dutch government, parliament, supreme court, and diplomatic embassies since the late sixteenth century."
      },
      {
        q: "Which sovereign microstate capital is perched dramatically on the three peaks of Mount Titano in the Apennine Mountains?",
        correct: "City of San Marino",
        w1: "Vaduz",
        w2: "Andorra la Vella",
        exp: "The City of San Marino crowns Mount Titano with its three iconic medieval fortress towers Guaita, Cesta, and Montale."
      },
      {
        q: "Which sovereign city-state is completely enclosed within the municipal boundaries of Rome?",
        correct: "Vatican City",
        w1: "Monaco",
        w2: "San Marino",
        exp: "Vatican City was established as an independent sovereign enclave inside Rome via the 1929 Lateran Treaty with Italy."
      }
    ],
    number: {
      q: "How many official capital cities does the Republic of South Africa maintain to balance power across its provinces?",
      target: 3,
      unit: "capitals",
      imperial: "3 official capitals",
      exp: "South Africa designates Pretoria for the executive branch, Cape Town for the parliament, and Bloemfontein for the judicial supreme court."
    }
  },

  // Cycle 4: Asian Megacities & Urban Densities
  {
    mcqs: [
      {
        q: "Which metropolitan area is the most populous continuous urban agglomeration in the world with over 37 million residents?",
        correct: "Greater Tokyo Area",
        w1: "Delhi NCR",
        w2: "Shanghai",
        exp: "The Greater Tokyo metropolitan region in the Kanto Plain encompasses Tokyo, Yokohama, Kawasaki, and Chiba with over 37 million people."
      },
      {
        q: "Due to land subsidence and severe flooding, which Southeast Asian nation is constructing a replacement capital named Nusantara in East Kalimantan?",
        correct: "Indonesia",
        w1: "Philippines",
        w2: "Thailand",
        exp: "Jakarta on Java is sinking rapidly due to groundwater extraction, prompting Indonesia to build the smart forest city Nusantara on Borneo."
      },
      {
        q: "Which Indian megacity, formerly known as Bombay, is the commercial capital of India built across seven interconnected islands?",
        correct: "Mumbai",
        w1: "Kolkata",
        w2: "Chennai",
        exp: "Mumbai was formed by joining seven historic islands via extensive colonial land reclamation schemes throughout the eighteenth and nineteenth centuries."
      },
      {
        q: "What sovereign island city-state is connected to the southern tip of the Malay Peninsula by the Johor-Singapore Causeway?",
        correct: "Singapore",
        w1: "Brunei",
        w2: "Bahrain",
        exp: "Singapore transformed from a British colonial trading post into one of the world wealthiest global financial hubs and maritime ports."
      },
      {
        q: "Which Asian megacity region forms the world largest continuous manufacturing and urban megaregion around the mouth of the Pearl River?",
        correct: "Guangdong-Hong Kong-Macao Greater Bay Area",
        w1: "Keihanshin Megalopolis",
        w2: "Seoul National Capital Area",
        exp: "The Pearl River Delta combines Guangzhou, Shenzhen, Dongguan, Foshan, Hong Kong, and Macao into a powerhouse urban zone."
      }
    ],
    number: {
      q: "Approximately how many million people reside within the Greater Tokyo Area, making it the most populous urban region on Earth?",
      target: 37,
      unit: "million residents",
      imperial: "37 million people",
      exp: "Demographic surveys estimate the Greater Tokyo metropolitan population at approximately 37.4 million residents."
    }
  },

  // Cycle 5: Historic Capitals & Capital Transfers
  {
    mcqs: [
      {
        q: "Which historic city served as the imperial capital and residence of the Emperor of Japan for over a thousand years before Tokyo?",
        correct: "Kyoto",
        w1: "Nara",
        w2: "Kamakura",
        exp: "Kyoto, originally named Heian-kyo, served as the formal seat of the imperial court from 794 until the Meiji Restoration in 1868."
      },
      {
        q: "Which city on the Rhine River served as the federal capital of West Germany from 1949 until German reunification?",
        correct: "Bonn",
        w1: "Frankfurt",
        w2: "Hamburg",
        exp: "Bonn was selected by Chancellor Konrad Adenauer as the provisional federal capital of the Federal Republic of Germany."
      },
      {
        q: "Which major southeastern city served as the national capital of Brazil for nearly two centuries prior to the founding of Brasília?",
        correct: "Rio de Janeiro",
        w1: "Salvador",
        w2: "São Paulo",
        exp: "Rio de Janeiro was the capital of Portuguese America and Brazil from 1763 until the federal administration relocated inland in 1960."
      },
      {
        q: "What city was the capital of Kazakhstan from its independence in 1991 until the government relocated north to Astana in 1997?",
        correct: "Almaty",
        w1: "Shymkent",
        w2: "Karaganda",
        exp: "Almaty remains Kazakhstan largest metropolis and cultural hub despite the administrative move to Astana."
      },
      {
        q: "Which ancient metropolis on the Bosporus served as the capital of the Ottoman Empire for nearly five centuries before Ankara was chosen in 1923?",
        correct: "Istanbul",
        w1: "Edirne",
        w2: "Bursa",
        exp: "Following the Turkish War of Independence, Mustafa Kemal Atatürk declared Ankara the national capital of the new Turkish Republic."
      }
    ],
    number: {
      q: "In what year did Kazakhstan officially transfer its national capital from Almaty to the northern city of Astana?",
      target: 1997,
      unit: "year",
      imperial: "1997 AD",
      exp: "President Nursultan Nazarbayev officially proclaimed Akmola, soon renamed Astana, as the national capital on December 10, 1997."
    }
  },

  // Cycle 6: Americas & Island Capitals
  {
    mcqs: [
      {
        q: "Which Canadian city on the border of Ontario and Quebec was chosen by Queen Victoria in 1857 as the national capital?",
        correct: "Ottawa",
        w1: "Montreal",
        w2: "Toronto",
        exp: "Ottawa was selected as a defensible inland compromise situated between English-speaking Upper Canada and French-speaking Lower Canada."
      },
      {
        q: "What Argentine capital city is located along the southwestern shore of the vast Río de la Plata estuary?",
        correct: "Buenos Aires",
        w1: "Montevideo",
        w2: "Rosario",
        exp: "Buenos Aires is the political and cultural capital of Argentina, famous for its historic Plaza de Mayo and colorful La Boca district."
      },
      {
        q: "Which South American capital city is situated in a central valley encircled by the towering peaks of the Andes and the Chilean Coastal Range?",
        correct: "Santiago",
        w1: "Lima",
        w2: "Asunción",
        exp: "Santiago was founded in 1541 by Pedro de Valdivia alongside the Mapocho River in the central Chilean valley."
      },
      {
        q: "Which high-altitude Andean capital city sits on the Sabana de Bogotá plateau at roughly 2,640 meters above sea level?",
        correct: "Bogotá",
        w1: "Caracas",
        w2: "Medellín",
        exp: "Bogotá is the sprawling capital of Colombia, featuring the historic colonial center La Candelaria beneath Monserrate mountain."
      },
      {
        q: "What Caribbean capital city was founded by Spanish colonists in 1521, featuring massive coastal fortifications named El Morro and San Cristóbal?",
        correct: "San Juan",
        w1: "Havana",
        w2: "Santo Domingo",
        exp: "San Juan in Puerto Rico is the oldest European-founded city under United States jurisdiction with grand colonial walls."
      }
    ],
    number: {
      q: "What is the average elevation in meters above sea level of Bogotá, the capital of Colombia?",
      target: 2640,
      unit: "meters",
      imperial: "8,660 feet",
      exp: "Bogotá sits on a high Andean plateau at roughly 2,640 meters altitude, making it the third-highest national capital in South America."
    }
  },

  // Cycle 7: European River Capitals
  {
    mcqs: [
      {
        q: "Which iconic river divides the Hungarian capital into the hilly, historic Buda district on the west bank and the flat Pest district on the east?",
        correct: "Danube River",
        w1: "Rhine River",
        w2: "Tisza River",
        exp: "Buda, Pest, and Óbuda were unified in 1873 to form modern Budapest, connected by landmark spans such as the Széchenyi Chain Bridge."
      },
      {
        q: "Which Central European capital city on the Vltava River is celebrated worldwide as the City of a Hundred Spires?",
        correct: "Prague",
        w1: "Vienna",
        w2: "Bratislava",
        exp: "Prague in the Czech Republic features the ancient Charles Bridge, the historic Astronomical Clock, and the expansive Prague Castle complex."
      },
      {
        q: "Which Nordic capital city is constructed across an archipelago of fourteen islands where Lake Mälaren flows into the Baltic Sea?",
        correct: "Stockholm",
        w1: "Copenhagen",
        w2: "Helsinki",
        exp: "Stockholm in Sweden is often called the Venice of the North, linked by over fifty bridges across scenic waterways."
      },
      {
        q: "Which European capital is located at the mouth of the Tagus River, featuring the historic Belem Tower and the steep Alfama quarter?",
        correct: "Lisbon",
        w1: "Madrid",
        w2: "Porto",
        exp: "Lisbon is the westernmost capital city in mainland Europe, built across seven steep hills overlooking the Tagus estuary."
      },
      {
        q: "Which inland capital city is situated on the Manzanares River at the exact geographic center of the Iberian Peninsula?",
        correct: "Madrid",
        w1: "Toledo",
        w2: "Seville",
        exp: "King Philip II relocated the Spanish royal court to Madrid in 1561, establishing it as the permanent political heart of Spain."
      }
    ],
    number: {
      q: "Across how many primary islands is the Swedish capital city of Stockholm built?",
      target: 14,
      unit: "islands",
      imperial: "14 islands",
      exp: "Stockholm spans 14 main islands connected by over 50 bridges where Lake Mälaren empties into the Baltic archipelago."
    }
  },

  // Cycle 8: African Metropolises & Ancient Urban Hubs
  {
    mcqs: [
      {
        q: "What megacity along the Nile River is the largest metropolitan area in Egypt and the wider Arab world?",
        correct: "Cairo",
        w1: "Alexandria",
        w2: "Khartoum",
        exp: "Cairo was founded in 969 CE by the Fatimid dynasty and sits immediately adjacent to the ancient Giza Necropolis."
      },
      {
        q: "Which sprawling Nigerian megacity situated on coastal lagoons is the largest urban center and financial engine in Sub-Saharan Africa?",
        correct: "Lagos",
        w1: "Abuja",
        w2: "Ibadan",
        exp: "Lagos expanded rapidly across Lagos Island, Victoria Island, and the mainland to house over twenty million residents."
      },
      {
        q: "Which East African capital city, known as the Green City in the Sun, is famous for hosting a wild game national park right against its city skyline?",
        correct: "Nairobi",
        w1: "Kampala",
        w2: "Dodoma",
        exp: "Nairobi National Park borders the city limits of the Kenyan capital, allowing lions and rhinos to roam against modern high-rise backdrops."
      },
      {
        q: "What high-altitude Ethiopian capital city serves as the diplomatic headquarters of the African Union?",
        correct: "Addis Ababa",
        w1: "Asmara",
        w2: "Djibouti",
        exp: "Addis Ababa was founded in 1886 by Emperor Menelik II at the foot of Mount Entoto and sits over 2,300 meters above sea level."
      },
      {
        q: "Which historic coastal capital city of Ghana was formed around seventeenth-century British, Dutch, and Danish trading forts along the Gulf of Guinea?",
        correct: "Accra",
        w1: "Kumasi",
        w2: "Takoradi",
        exp: "Accra became the capital of the British Gold Coast in 1877 and continued as the national capital following Ghanaian independence in 1957."
      }
    ],
    number: {
      q: "What is the average elevation in meters above sea level of Addis Ababa, making it one of the highest capital cities in Africa?",
      target: 2355,
      unit: "meters",
      imperial: "7,726 feet",
      exp: "Addis Ababa sits in the Ethiopian highlands at an average elevation of 2,355 meters, with northern sectors exceeding 3,000 meters."
    }
  },

  // Cycle 9: Middle Eastern & Central Asian Urban Hubs
  {
    mcqs: [
      {
        q: "Which futuristic Persian Gulf metropolis is globally renowned for architectural icons including the Burj Khalifa and the Palm Jumeirah?",
        correct: "Dubai",
        w1: "Doha",
        w2: "Manama",
        exp: "Dubai grew from a small pearl fishing creek into a premier global hub for international aviation, finance, and record-breaking architecture."
      },
      {
        q: "Which Middle Eastern capital city spreads across the southern slopes of the snow-capped Alborz mountain range beneath Mount Damavand?",
        correct: "Tehran",
        w1: "Isfahan",
        w2: "Shiraz",
        exp: "Tehran was chosen as the capital of Persia by Agha Mohammad Khan in 1786 and has grown into a metropolis of nearly ten million people."
      },
      {
        q: "Which ancient Silk Road metropolis in Uzbekistan is world-famous for its majestic turquoise-domed madrasas on the Registan square?",
        correct: "Samarkand",
        w1: "Bukhara",
        w2: "Tashkent",
        exp: "Samarkand served as the imperial capital of the Timurid Empire under conqueror Timur, celebrated for magnificent Islamic architecture."
      },
      {
        q: "Which Saudi Arabian capital city grew from an isolated desert oasis walled town into a vast modern metropolis surrounding the historic Masmak Fortress?",
        correct: "Riyadh",
        w1: "Jeddah",
        w2: "Mecca",
        exp: "Riyadh is the political and financial capital of Saudi Arabia, home to landmarks such as the Kingdom Centre and Al Faisaliah Tower."
      },
      {
        q: "Which hilly Levantine capital city was known in antiquity as Philadelphia and features a well-preserved Roman theatre in its downtown valley?",
        correct: "Amman",
        w1: "Damascus",
        w2: "Beirut",
        exp: "Amman in Jordan was originally built over seven steep limestone hills and now spans over nineteen distinct urban hills."
      }
    ],
    number: {
      q: "In what year was the United Arab Emirates officially formed, triggering the rapid modern transformation of Abu Dhabi and Dubai?",
      target: 1971,
      unit: "year",
      imperial: "1971 AD",
      exp: "Six emirates united under the leadership of Sheikh Zayed bin Sultan Al Nahyan on December 2, 1971, with Ras Al Khaimah joining in early 1972."
    }
  },

  // Cycle 10: Urban Superlatives & Boundary Extremes
  {
    mcqs: [
      {
        q: "Which Asian megacity on the Buriganga River is ranked as the most densely populated national capital city in the world?",
        correct: "Dhaka",
        w1: "Manila",
        w2: "Cairo",
        exp: "Dhaka in Bangladesh packs over twenty-three million residents into its metropolitan territory, exceeding forty thousand people per square kilometer in central wards."
      },
      {
        q: "Which two sovereign national capital cities face each other directly across the width of the Congo River as the closest pair on Earth?",
        correct: "Kinshasa and Brazzaville",
        w1: "Vienna and Bratislava",
        w2: "Rome and Vatican City",
        exp: "Kinshasa capital of the DRC and Brazzaville capital of the Republic of the Congo sit directly opposite each other on the Congo River."
      },
      {
        q: "Which South American capital city is situated closest to the terrestrial Equator, located just twenty-five kilometers south of zero latitude?",
        correct: "Quito",
        w1: "Bogotá",
        w2: "Nairobi",
        exp: "Quito is the closest national capital to the Equator, featuring the famous Middle of the World monument at zero latitude."
      },
      {
        q: "Which major European capital was physically split into two distinct ideological sectors by a fortified concrete wall from 1961 to 1989?",
        correct: "Berlin",
        w1: "Vienna",
        w2: "Prague",
        exp: "The Berlin Wall separated West Berlin from East Berlin during the Cold War until it was peacefully breached on November 9, 1989."
      },
      {
        q: "What city on the Beagle Channel in Tierra del Fuego is commonly recognized as the southernmost city on Earth?",
        correct: "Ushuaia",
        w1: "Punta Arenas",
        w2: "Puerto Williams",
        exp: "Ushuaia in Argentina is the southernmost major city with over eighty thousand residents, serving as the main gateway to Antarctica."
      }
    ],
    number: {
      q: "What is the approximate straight-line distance in kilometers separating the twin capital city centers of Kinshasa and Brazzaville across the Congo River?",
      target: 4,
      unit: "km",
      imperial: "2.5 miles",
      exp: "Kinshasa and Brazzaville sit only about four kilometers apart across the Pool Malebo expanse of the Congo River."
    }
  }
];

buildQuiz({
  id: "world-capitals-megacities-60",
  theme: "World Capitals, Megacities & Urban Geography",
  title: "World Capitals, Megacities & Urban Geography",
  description: "Comprehensive 60-question urban expedition exploring planned capitals, high-altitude metropolises, historic citadels, sprawling megacities, and demographic records.",
  category: "Geography, Capitals & Landscapes",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z"
}, capitalsCycles);


// =========================================================================
// 2. mountains-peaks-alpinism-60
// Theme: "Mountains & Peaks: The Himalayas, Andes & Alpinism"
// Category: "Geography, Capitals & Landscapes"
// =========================================================================
const mountainCycles = [
  // Cycle 1: The Seven Summits & Continental High Points
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in the Western and Southern Hemispheres, rising to 6,961 meters in the Argentine Andes?",
        correct: "Aconcagua",
        w1: "Ojos del Salado",
        w2: "Huascarán",
        exp: "Aconcagua in Mendoza Province, Argentina, is the highest summit on Earth outside the mountain ranges of Central and South Asia."
      },
      {
        q: "Which colossal Alaskan peak is the highest mountain summit in North America, formerly known as Mount McKinley?",
        correct: "Denali",
        w1: "Mount Logan",
        w2: "Mount Saint Elias",
        exp: "Denali rises 6,190 meters above sea level and features one of the greatest base-to-peak vertical land rises of any mountain on Earth."
      },
      {
        q: "What dormant stratovolcano in Tanzania is the highest freestanding mountain above surrounding terrain on Earth?",
        correct: "Mount Kilimanjaro",
        w1: "Mount Kenya",
        w2: "Mount Stanley",
        exp: "Mount Kilimanjaro rises 5,895 meters above sea level with three volcanic cones named Kibo, Mawenzi, and Shira."
      },
      {
        q: "Which twin-peaked dormant volcano in the Caucasus Mountains of Russia is the highest peak in Europe at 5,642 meters?",
        correct: "Mount Elbrus",
        w1: "Mont Blanc",
        w2: "Mount Kazbek",
        exp: "Mount Elbrus in the western Caucasus surpasses Mont Blanc by nearly a thousand meters to claim the European Seven Summit title."
      },
      {
        q: "What remote peak in the Sentinel Range is the highest mountain summit on the continent of Antarctica?",
        correct: "Mount Vinson",
        w1: "Mount Erebus",
        w2: "Mount Sidley",
        exp: "Mount Vinson rises 4,892 meters above sea level roughly 1,200 kilometers from the South Pole."
      }
    ],
    number: {
      q: "What is the official height in meters above sea level of Aconcagua, the highest mountain summit outside Asia?",
      target: 6961,
      unit: "meters",
      imperial: "22,838 feet",
      exp: "Aconcagua in the Argentine Andes stands at 6,961 meters, making it the crowning peak of the Americas."
    }
  },

  // Cycle 2: The Eight-Thousander Titans
  {
    mcqs: [
      {
        q: "Which formidable mountain on the China-Pakistan border is the second-tallest peak on Earth and known as the Savage Mountain?",
        correct: "K2",
        w1: "Kangchenjunga",
        w2: "Lhotse",
        exp: "K2 in the Karakoram Range rises 8,611 meters and is notorious for severe weather, technical difficulty, and extreme fatality rates."
      },
      {
        q: "What is the third-highest mountain in the world, situated along the sovereign border between Nepal and the Indian state of Sikkim?",
        correct: "Kangchenjunga",
        w1: "Makalu",
        w2: "Cho Oyu",
        exp: "Kangchenjunga stands at 8,586 meters and was believed to be the highest mountain on Earth until the Great Trigonometrical Survey of the 1850s."
      },
      {
        q: "Which eight-thousander peak is directly connected to Mount Everest via the famous South Col ridge at 7,986 meters?",
        correct: "Lhotse",
        w1: "Nuptse",
        w2: "Makalu",
        exp: "Lhotse is the fourth-highest mountain on Earth at 8,516 meters, sharing the standard South Col route with Mount Everest."
      },
      {
        q: "Which distinct four-sided pyramid peak located twenty kilometers east of Mount Everest is the fifth-highest mountain on Earth?",
        correct: "Makalu",
        w1: "Dhaulagiri",
        w2: "Manaslu",
        exp: "Makalu rises 8,485 meters and is recognized for its knife-edge ridges and challenging granite summit pyramid."
      },
      {
        q: "What is the only 8,000-meter peak located entirely within Chinese Tibetan territory without bordering Nepal or Pakistan?",
        correct: "Shishapangma",
        w1: "Cho Oyu",
        w2: "Gasherbrum I",
        exp: "Shishapangma rises 8,027 meters in south-central Tibet and was the final eight-thousander to be summited in 1964."
      }
    ],
    number: {
      q: "What is the exact official height in meters above sea level of K2, the Savage Mountain?",
      target: 8611,
      unit: "meters",
      imperial: "28,251 feet",
      exp: "K2 stands at exactly 8,611 meters in the Karakoram Range, second only to Mount Everest."
    }
  },

  // Cycle 3: Historic Alpinism Milestones
  {
    mcqs: [
      {
        q: "Which mountaineering duo achieved the historic first confirmed summit of Mount Everest on May 29, 1953?",
        correct: "Edmund Hillary and Tenzing Norgay",
        w1: "George Mallory and Andrew Irvine",
        w2: "Maurice Herzog and Louis Lachenal",
        exp: "New Zealander Edmund Hillary and Nepali Sherpa Tenzing Norgay climbed the South Col route as part of the ninth British Everest expedition."
      },
      {
        q: "What was the very first 8,000-meter mountain ever successfully climbed by humans, summited by a French expedition in 1950?",
        correct: "Annapurna I",
        w1: "Nanga Parbat",
        w2: "K2",
        exp: "Maurice Herzog and Louis Lachenal reached the 8,091-meter summit of Annapurna I on June 3, 1950, without bottled oxygen."
      },
      {
        q: "Which legendary Italian mountaineer became the first person to climb all fourteen 8,000-meter peaks without supplemental oxygen?",
        correct: "Reinhold Messner",
        w1: "Walter Bonatti",
        w2: "Jerzy Kukuczka",
        exp: "Reinhold Messner completed all fourteen eight-thousanders between 1970 and 1986, establishing new benchmarks in alpine-style climbing."
      },
      {
        q: "Which mountain in Pakistan earned the grim nickname Killer Mountain after thirty-one climbers died before its first ascent in 1953?",
        correct: "Nanga Parbat",
        w1: "Broad Peak",
        w2: "Gasherbrum II",
        exp: "Nanga Parbat at 8,126 meters features the Rupal Face, the highest vertical mountain face in the world rising 4,600 meters."
      },
      {
        q: "Who was the first woman in history to stand atop the summit of Mount Everest, achieving the feat in May 1975?",
        correct: "Junko Tabei",
        w1: "Wanda Rutkiewicz",
        w2: "Gerlinde Kaltenbrunner",
        exp: "Japanese mountaineer Junko Tabei reached the summit via the South Col route, leading an all-female expedition."
      }
    ],
    number: {
      q: "In what year did Maurice Herzog and Louis Lachenal reach the summit of Annapurna, completing the first ascent of an 8,000-meter peak?",
      target: 1950,
      unit: "year",
      imperial: "1950 AD",
      exp: "The French expedition stood on the summit of Annapurna on June 3, 1950, ushering in the golden age of Himalayan mountaineering."
    }
  },

  // Cycle 4: Andean Wonders & Volcanic Heights
  {
    mcqs: [
      {
        q: "Because of Earth equatorial bulge, the summit of which Ecuadorian volcano is the closest terrestrial point to the Moon and outer space?",
        correct: "Mount Chimborazo",
        w1: "Mount Cotopaxi",
        w2: "Mount Cayambe",
        exp: "Chimborazo summit sits 6,384 kilometers from Earth center, roughly two kilometers farther from the core than Mount Everest."
      },
      {
        q: "What is the highest active volcano on Earth, rising to 6,893 meters along the border between Chile and Argentina?",
        correct: "Ojos del Salado",
        w1: "Llullaillaco",
        w2: "Guallatiri",
        exp: "Ojos del Salado in the Atacama region is the highest volcano on Earth and the second-highest peak in the Western Hemisphere."
      },
      {
        q: "Which perfectly symmetrical snow-capped stratovolcano is one of the highest active volcanoes in the world, located south of Quito?",
        correct: "Cotopaxi",
        w1: "Antisana",
        w2: "Tungurahua",
        exp: "Cotopaxi stands at 5,897 meters and is sacred in indigenous Andean culture, renowned for its almost perfect cone profile."
      },
      {
        q: "What is the highest mountain summit in Peru, located in the Cordillera Blanca range of the central Andes at 6,768 meters?",
        correct: "Huascarán",
        w1: "Yerupajá",
        w2: "Coropuna",
        exp: "Mount Huascarán is the highest tropical mountain on Earth, protected inside the UNESCO-listed Huascarán National Park."
      },
      {
        q: "Which jagged granite monolith in Patagonia on the Argentina-Chile border is named after the captain of HMS Beagle?",
        correct: "Mount Fitz Roy",
        w1: "Cerro Torre",
        w2: "Torres del Paine",
        exp: "Mount Fitz Roy, also known as Chaltén, was named by explorer Francisco Moreno in honor of Captain Robert FitzRoy."
      }
    ],
    number: {
      q: "What is the official elevation in meters above sea level of Ojos del Salado, the world highest volcano?",
      target: 6893,
      unit: "meters",
      imperial: "22,615 feet",
      exp: "Nevado Ojos del Salado stands at 6,893 meters in the dry Andes, featuring a permanent crater lake near its summit."
    }
  },

  // Cycle 5: Alpine Classics & European Summits
  {
    mcqs: [
      {
        q: "What iconic pyramid-shaped peak on the Swiss-Italian border was first climbed in 1865 by an expedition led by Edward Whymper?",
        correct: "Matterhorn",
        w1: "Weisshorn",
        w2: "Dom",
        exp: "The first ascent of the 4,478-meter Matterhorn on July 14, 1865, ended in tragedy when four climbers fell to their deaths during the descent."
      },
      {
        q: "What is the highest mountain peak in the Alps and Western Europe, rising on the border between France and Italy?",
        correct: "Mont Blanc",
        w1: "Monte Rosa",
        w2: "Grand Combin",
        exp: "Mont Blanc stands at approximately 4,808 meters, first summited in 1786 by Jacques Balmat and Michel Paccard."
      },
      {
        q: "Which mountain in the Bernese Alps is notorious for its sheer, 1,800-meter-high North Face nicknamed the Nordwand or Murder Wall?",
        correct: "Eiger",
        w1: "Mönch",
        w2: "Jungfrau",
        exp: "The Eiger North Face was considered the most formidable climbing problem in the Alps until it was conquered by a four-man team in 1938."
      },
      {
        q: "What is the highest mountain peak in Austria, rising to 3,798 meters in the High Tauern range along the Grossglockner High Alpine Road?",
        correct: "Grossglockner",
        w1: "Wildspitze",
        w2: "Dachstein",
        exp: "Grossglockner is a pyramid-shaped twin peak first climbed in 1800 by a team organized by Prince-Bishop Salm-Reifferscheidt."
      },
      {
        q: "Which mountain in the Julian Alps is the highest peak and national symbol of Slovenia, featured on the Slovenian national flag?",
        correct: "Triglav",
        w1: "Špik",
        w2: "Grintovec",
        exp: "Triglav rises 2,864 meters and features three distinct crests, with the iconic Aljaž Tower erected on its summit in 1895."
      }
    ],
    number: {
      q: "What is the official measured elevation in meters of Mont Blanc, the highest summit in the Alps?",
      target: 4808,
      unit: "meters",
      imperial: "15,774 feet",
      exp: "Mont Blanc measured height fluctuates slightly with summit ice pack depth, officially recorded at approximately 4,808 meters."
    }
  },

  // Cycle 6: North American Ranges & Alaskan Giants
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Canada and second-highest in North America, located in Kluane National Park in Yukon?",
        correct: "Mount Logan",
        w1: "Mount Saint Elias",
        w2: "Mount Robson",
        exp: "Mount Logan rises 5,959 meters and boasts the largest base circumference of any non-volcanic mountain on Earth."
      },
      {
        q: "Which massive glaciated stratovolcano in Washington State is the most topographically prominent mountain in the contiguous United States?",
        correct: "Mount Rainier",
        w1: "Mount Shasta",
        w2: "Mount Hood",
        exp: "Mount Rainier rises 4,392 meters and is encased in twenty-six major glaciers, looming prominently over the Seattle metropolitan area."
      },
      {
        q: "What is the highest summit in the contiguous United States, rising to 4,421 meters in the Sierra Nevada range of California?",
        correct: "Mount Whitney",
        w1: "Mount Shasta",
        w2: "Mount Elbert",
        exp: "Mount Whitney lies just 136 kilometers west of Badwater Basin in Death Valley, the lowest point in North America."
      },
      {
        q: "What is the highest mountain peak in the Rocky Mountains system, rising to 4,401 meters in the Sawatch Range of Colorado?",
        correct: "Mount Elbert",
        w1: "Mount Massive",
        w2: "Pikes Peak",
        exp: "Mount Elbert is the highest of Colorado fifty-eight fourteeners, featuring a gentle ascent trail compared to technical peaks."
      },
      {
        q: "Which peak in Wyoming is the signature mountain of Grand Teton National Park, rising dramatically without foothills above Jackson Hole?",
        correct: "Grand Teton",
        w1: "Mount Moran",
        w2: "Gannett Peak",
        exp: "Grand Teton rises 4,199 meters as a classic glaciated horn, first officially summited in 1898 by Franklin Spalding and team."
      }
    ],
    number: {
      q: "What is the official summit elevation in meters above sea level of Denali in Alaska?",
      target: 6190,
      unit: "meters",
      imperial: "20,310 feet",
      exp: "The United States Geological Survey established the official height of Denali at 6,190 meters following high-precision GPS surveys in 2015."
    }
  },

  // Cycle 7: African & Oceanic Giants
  {
    mcqs: [
      {
        q: "What is the second-highest mountain summit in Africa, featuring dramatic twin volcanic peaks named Batian and Nelion?",
        correct: "Mount Kenya",
        w1: "Mount Stanley",
        w2: "Mount Meru",
        exp: "Mount Kenya rises 5,199 meters as an extinct stratovolcano whose glaciers feed vital water systems across central Kenya."
      },
      {
        q: "Which mountain range along the Uganda-DRC border was identified by Ptolemy as the legendary snow-capped Mountains of the Moon?",
        correct: "Rwenzori Mountains",
        w1: "Virunga Mountains",
        w2: "Drakensberg",
        exp: "The Rwenzori Mountains host Mount Stanley at 5,109 meters and are one of only three glaciated mountain ranges in Africa."
      },
      {
        q: "What is the highest island peak on Earth, rising 4,884 meters in the Sudirman Range on the island of New Guinea?",
        correct: "Puncak Jaya",
        w1: "Mount Wilhelm",
        w2: "Mauna Kea",
        exp: "Puncak Jaya, also known as Carstensz Pyramid, is the highest peak in Oceania and the highest summit between the Himalayas and the Andes."
      },
      {
        q: "What is the highest mountain summit on the mainland Australian continent, located in the Snowy Mountains of New South Wales?",
        correct: "Mount Kosciuszko",
        w1: "Mount Townsend",
        w2: "Mount Bogong",
        exp: "Mount Kosciuszko stands at 2,228 meters, named in 1840 by Polish explorer Paweł Strzelecki in honor of military hero Tadeusz Kościuszko."
      },
      {
        q: "What active stratovolcano on the island of Java is known as the highest mountain on the island, rising to 3,676 meters?",
        correct: "Mount Semeru",
        w1: "Mount Bromo",
        w2: "Mount Merapi",
        exp: "Mount Semeru is an active volcano that produces regular ash plumes and is revered in Javanese Hindu-Buddhist cosmology as Mahameru."
      }
    ],
    number: {
      q: "What is the summit elevation in meters of Mount Kilimanjaro Uhuru Peak in Tanzania?",
      target: 5895,
      unit: "meters",
      imperial: "19,341 feet",
      exp: "Uhuru Peak on the Kibo crater rim of Mount Kilimanjaro stands at exactly 5,895 meters above sea level."
    }
  },

  // Cycle 8: The Death Zone & Extreme Alpinism
  {
    mcqs: [
      {
        q: "In high-altitude mountaineering, what critical altitude threshold marks the beginning of the physiological Death Zone?",
        correct: "8,000 meters",
        w1: "7,000 meters",
        w2: "6,500 meters",
        exp: "Above 8,000 meters, atmospheric pressure drops to about one-third of sea level, preventing the human body from acclimatizing."
      },
      {
        q: "How many official mountain peaks on Earth surpass the 8,000-meter threshold above sea level?",
        correct: "14",
        w1: "12",
        w2: "16",
        exp: "All fourteen eight-thousanders are located in the Himalayan and Karakoram ranges of Central and South Asia."
      },
      {
        q: "What distinct geological limestone formation sits near the very summit of Mount Everest, proving the peak was once an ancient seafloor?",
        correct: "Qomolangma Limestone Formation",
        w1: "Tethys Dolomite Band",
        w2: "Yellow Band Siltstone",
        exp: "Marine fossils including ordovician trilobites and crinoids have been discovered embedded in the limestone near Everest summit."
      },
      {
        q: "Which technical granite summit in the Karakoram is named for its massive, one-and-a-half-kilometer-long summit ridge at 8,051 meters?",
        correct: "Broad Peak",
        w1: "Gasherbrum IV",
        w2: "Masherbrum",
        exp: "Broad Peak, originally designated K3, was first climbed in 1957 by an Austrian team using pure alpine style without supplemental oxygen."
      },
      {
        q: "What is the steep rock step on the Northeast Ridge of Mount Everest that forms the most famous technical obstacle on the Tibetan route?",
        correct: "Second Step",
        w1: "Hillary Step",
        w2: "Geneva Spur",
        exp: "The Second Step features a near-vertical thirty-meter rock wall at 8,610 meters, now equipped with a famous aluminum ladder installed in 1975."
      }
    ],
    number: {
      q: "How many mountain peaks on Earth are officially classified as Eight-Thousanders, rising above 8,000 meters in elevation?",
      target: 14,
      unit: "peaks",
      imperial: "14 eight-thousanders",
      exp: "There are precisely 14 independent summits on Earth that exceed 8,000 meters above sea level."
    }
  },

  // Cycle 9: Volcanic Superpeaks & Sacred Heights
  {
    mcqs: [
      {
        q: "When measured from its underwater base on the Pacific Ocean floor to its summit, what is the tallest mountain on Earth?",
        correct: "Mauna Kea",
        w1: "Mauna Loa",
        w2: "Haleakala",
        exp: "Mauna Kea stands 4,207 meters above sea level, but extends nearly six thousand meters beneath the ocean surface for over 10,200 meters total height."
      },
      {
        q: "Which sacred Japanese stratovolcano is celebrated as an exceptional cultural and spiritual icon, rising to 3,776 meters on Honshu?",
        correct: "Mount Fuji",
        w1: "Mount Tate",
        w2: "Mount Haku",
        exp: "Mount Fuji is the highest peak in Japan and one of Japan Three Holy Mountains, renowned for its symmetrical snow-draped volcanic cone."
      },
      {
        q: "What is the highest mountain peak in Spain, situated on the volcanic island of Tenerife in the Canary Islands?",
        correct: "Mount Teide",
        w1: "Mulhacén",
        w2: "Pico de Aneto",
        exp: "Mount Teide rises 3,715 meters above sea level and casts the world largest sea shadow across the Atlantic Ocean at sunrise."
      },
      {
        q: "Which active Antarctic volcano features a persistent convecting phonolitic lava lake in its summit caldera?",
        correct: "Mount Erebus",
        w1: "Mount Terror",
        w2: "Mount Discovery",
        exp: "Mount Erebus on Ross Island is the southernmost active volcano on Earth, discovered in 1841 by Sir James Clark Ross."
      },
      {
        q: "Which Cascade Range stratovolcano underwent a catastrophic lateral blast eruption on May 18, 1980, lowering its summit by 400 meters?",
        correct: "Mount Saint Helens",
        w1: "Mount Adams",
        w2: "Mount Baker",
        exp: "A magnitude 5.1 earthquake triggered the largest landslide in recorded history, unleashing a devastating pyroclastic blast across Washington State."
      }
    ],
    number: {
      q: "What is the total base-to-peak height in meters of Mauna Kea from the oceanic trench floor to its summit?",
      target: 10210,
      unit: "meters",
      imperial: "33,500 feet",
      exp: "From its base on the Pacific Ocean floor at roughly 6,000 meters depth to its 4,207-meter summit, Mauna Kea spans roughly 10,210 meters total height."
    }
  },

  // Cycle 10: Modern Speed Ascents & Records
  {
    mcqs: [
      {
        q: "In 2019, which Nepali mountaineer shattered the world record by summiting all fourteen 8,000-meter peaks in just six months and six days?",
        correct: "Nirmal Purja",
        w1: "Kami Rita Sherpa",
        w2: "Sanu Sherpa",
        exp: "Nirmal Nimsdai Purja completed Project Possible 14/7, smashing the previous record of seven years and eleven months."
      },
      {
        q: "Which mountain guide holds the world record for the highest number of successful summits of Mount Everest, having summited over thirty times?",
        correct: "Kami Rita Sherpa",
        w1: "Apa Sherpa",
        w2: "Phurba Tashi Sherpa",
        exp: "Kami Rita Sherpa set consecutive world records by guiding commercial and research expeditions to the summit of Everest year after year."
      },
      {
        q: "In January 2021, an all-Nepali team achieved the historic and long-sought first winter ascent of which formidable mountain?",
        correct: "K2",
        w1: "Nanga Parbat",
        w2: "Annapurna I",
        exp: "Ten Nepali mountaineers united on the final ridge to reach the summit of K2 in sub-zero winter winds on January 16, 2021."
      },
      {
        q: "Which British mountaineer famously replied 'Because it is there' when asked why he wanted to climb Mount Everest, before disappearing on the peak in 1924?",
        correct: "George Mallory",
        w1: "Edward Norton",
        w2: "Howard Somervell",
        exp: "George Mallory and Andrew Irvine vanished high on the Northeast Ridge on June 8, 1924, sparking mountaineering greatest enduring mystery."
      },
      {
        q: "What is the classic high-altitude mountain sickness caused by rapid ascent to altitudes above 2,500 meters without proper acclimatization?",
        correct: "Acute Mountain Sickness",
        w1: "High Altitude Decompression Sickness",
        w2: "Hypothermic Barotrauma",
        exp: "Acute Mountain Sickness is caused by reduced atmospheric pressure and lower oxygen saturation, which can progress to life-threatening HAPE or HACE."
      }
    ],
    number: {
      q: "In what year did Junko Tabei become the first woman in history to successfully stand on the summit of Mount Everest?",
      target: 1975,
      unit: "year",
      imperial: "1975 AD",
      exp: "Junko Tabei reached the summit of Mount Everest on May 16, 1975, via the South Col route alongside Sherpa Ang Tshering."
    }
  }
];

buildQuiz({
  id: "mountains-peaks-alpinism-60",
  theme: "Mountains & Peaks: The Himalayas, Andes & Alpinism",
  title: "Mountains & Peaks: The Himalayas, Andes & Alpinism",
  description: "Comprehensive 60-question high-altitude odyssey exploring the 14 Eight-Thousanders, the Seven Summits, iconic alpine ascents, and mountain geology.",
  category: "Geography, Capitals & Landscapes",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z"
}, mountainCycles);


// =========================================================================
// 3. rivers-lakes-waterways-60
// Theme: "Great Rivers, Majestic Waterfalls & Inland Seas"
// Category: "Geography, Capitals & Landscapes"
// =========================================================================
const riverCycles = [
  // Cycle 1: World Longest Rivers & Massive Basins
  {
    mcqs: [
      {
        q: "Which South American river system discharges more water than the next seven largest rivers combined, accounting for twenty percent of global river flow?",
        correct: "Amazon River",
        w1: "Paraná River",
        w2: "Orinoco River",
        exp: "The Amazon River discharges approximately 209,000 cubic meters of freshwater per second into the Atlantic Ocean."
      },
      {
        q: "What historic African river flows north through eleven countries before emptying into the Mediterranean Sea through an expansive delta?",
        correct: "Nile River",
        w1: "Niger River",
        w2: "Congo River",
        exp: "The Nile River is traditionally recognized as the longest river in the world, formed by the confluence of the White Nile and the Blue Nile."
      },
      {
        q: "What is the longest river located entirely within a single country, flowing over 6,300 kilometers through China?",
        correct: "Yangtze River",
        w1: "Yellow River",
        w2: "Pearl River",
        exp: "The Yangtze River originates on the Tibetan Plateau and flows eastward into the East China Sea at Shanghai."
      },
      {
        q: "Which North American river system combines to form the fourth-longest river system on Earth, emptying into the Gulf of Mexico?",
        correct: "Mississippi-Missouri River System",
        w1: "Mackenzie River System",
        w2: "Saint Lawrence River System",
        exp: "The combined Mississippi-Missouri system spans over 6,275 kilometers and drains all or parts of thirty-two US states."
      },
      {
        q: "Which African river is the deepest recorded river on Earth, reaching measured depths exceeding 220 meters?",
        correct: "Congo River",
        w1: "Zambezi River",
        w2: "Limpopo River",
        exp: "The Congo River is also the world second-largest river by discharge volume and the only major river to cross the Equator twice."
      }
    ],
    number: {
      q: "What is the generally accepted mainstream length in kilometers of the Amazon River?",
      target: 6400,
      unit: "km",
      imperial: "3,977 miles",
      exp: "Standard geographic consensus measures the Amazon River at approximately 6,400 kilometers from its Peruvian Andean headwaters to the Atlantic."
    }
  },

  // Cycle 2: European & Asian Waterways
  {
    mcqs: [
      {
        q: "Which major European river originates in the Black Forest of Germany and flows through or borders ten sovereign nations on its way to the Black Sea?",
        correct: "Danube River",
        w1: "Rhine River",
        w2: "Elbe River",
        exp: "The Danube touches Germany, Austria, Slovakia, Hungary, Croatia, Serbia, Romania, Bulgaria, Moldova, and Ukraine."
      },
      {
        q: "What is the longest river on the European continent, flowing entirely within Russia for over 3,530 kilometers into the Caspian Sea?",
        correct: "Volga River",
        w1: "Don River",
        w2: "Dnieper River",
        exp: "The Volga River basin contains eleven of the twenty largest cities in Russia, including Moscow through connecting canals."
      },
      {
        q: "Which vital European commercial artery flows from the Swiss Alps through Germany and the Netherlands before emptying into the North Sea at Rotterdam?",
        correct: "Rhine River",
        w1: "Meuse River",
        w2: "Oder River",
        exp: "The Rhine River has served as one of the most heavily navigated inland trade corridors in world history since Roman antiquity."
      },
      {
        q: "Which Southeast Asian river originates on the Tibetan Plateau and flows through six countries before forming a massive delta in southern Vietnam?",
        correct: "Mekong River",
        w1: "Irrawaddy River",
        w2: "Chao Phraya River",
        exp: "The Mekong River traverses China, Myanmar, Laos, Thailand, Cambodia, and Vietnam, supporting vital fisheries and rice agriculture."
      },
      {
        q: "Which Chinese river is known as the Cradle of Chinese Civilization despite its historic nickname Mother River of Sorrows due to devastating floods?",
        correct: "Yellow River",
        w1: "Huai River",
        w2: "Hai River",
        exp: "The Yellow River carries enormous loads of yellow-brown loess sediment from the Loess Plateau, raising its riverbed above surrounding plains."
      }
    ],
    number: {
      q: "Through how many sovereign nations does the Danube River pass or form international borders, setting a world record for any river?",
      target: 10,
      unit: "countries",
      imperial: "10 sovereign nations",
      exp: "The Danube passes through or borders 10 countries: Germany, Austria, Slovakia, Hungary, Croatia, Serbia, Romania, Bulgaria, Moldova, and Ukraine."
    }
  },

  // Cycle 3: Majestic World Waterfalls
  {
    mcqs: [
      {
        q: "Which waterfall in Venezuela is the highest uninterrupted waterfall on Earth, plunging from the Auyán-tepui tabletop mountain?",
        correct: "Angel Falls",
        w1: "Tugela Falls",
        w2: "Kaieteur Falls",
        exp: "Angel Falls drops 979 meters total with an uninterrupted plunge of 807 meters within Canaima National Park."
      },
      {
        q: "What magnificent waterfall on the Zambezi River between Zambia and Zimbabwe is known locally as Mosi-oa-Tunya or The Smoke That Thunders?",
        correct: "Victoria Falls",
        w1: "Livingstone Falls",
        w2: "Epupa Falls",
        exp: "Victoria Falls forms the largest sheet of falling water on Earth based on its combined width of 1,708 meters and height of 108 meters."
      },
      {
        q: "Which colossal waterfall system comprising 275 individual drops spans the border between Argentina and Brazil in a subtropical rainforest?",
        correct: "Iguazu Falls",
        w1: "Sete Quedas",
        w2: "Paulo Afonso Falls",
        exp: "Iguazu Falls features the dramatic Devil Throat chasm, where nearly half the river flow plunges into a roaring horseshoe canyon."
      },
      {
        q: "Which famous North American waterfall consists of three separate cataracts named Horseshoe Falls, American Falls, and Bridal Veil Falls?",
        correct: "Niagara Falls",
        w1: "Yosemite Falls",
        w2: "Shoshone Falls",
        exp: "Niagara Falls sits on the Niagara River connecting Lake Erie to Lake Ontario, renowned for massive hydroelectric power generation."
      },
      {
        q: "What waterfall in Guyana is recognized as the world largest single-drop waterfall by volume of water falling over a sheer precipice?",
        correct: "Kaieteur Falls",
        w1: "Gocta Falls",
        w2: "Yumbilla Falls",
        exp: "Kaieteur Falls plunges 226 meters from a sandstone plateau into the Potaro River gorge in the Amazonian rainforest."
      }
    ],
    number: {
      q: "What is the total height in meters of Angel Falls in Venezuela from the top of Auyán-tepui to the river base?",
      target: 979,
      unit: "meters",
      imperial: "3,212 feet",
      exp: "Angel Falls stands 979 meters high, with an unbroken single free-fall plunge of 807 meters."
    }
  },

  // Cycle 4: Deep Lakes & Inland Seas
  {
    mcqs: [
      {
        q: "What body of water is the largest enclosed inland body of water on Earth by surface area, bounded by five coastal nations?",
        correct: "Caspian Sea",
        w1: "Black Sea",
        w2: "Aral Sea",
        exp: "The Caspian Sea covers roughly 371,000 square kilometers and has salinity about one-third that of typical ocean seawater."
      },
      {
        q: "Which ancient rift lake in Russian Siberia is both the deepest lake in the world and the largest freshwater lake by water volume?",
        correct: "Lake Baikal",
        w1: "Lake Superior",
        w2: "Lake Tanganyika",
        exp: "Lake Baikal plunges to 1,642 meters depth and holds approximately twenty percent of Earth unfrozen surface fresh water."
      },
      {
        q: "What is the largest freshwater lake in the world by surface area, situated along the border between the United States and Canada?",
        correct: "Lake Superior",
        w1: "Lake Victoria",
        w2: "Lake Huron",
        exp: "Lake Superior covers 82,100 square kilometers and holds more water than all the other North American Great Lakes combined."
      },
      {
        q: "What East African rift lake is the longest freshwater lake in the world, stretching over 670 kilometers between four countries?",
        correct: "Lake Tanganyika",
        w1: "Lake Malawi",
        w2: "Lake Victoria",
        exp: "Lake Tanganyika is the second-deepest and second-largest by volume freshwater lake on Earth, plunging to 1,470 meters."
      },
      {
        q: "What hypersaline terminal lake situated between Jordan and Israel marks the lowest elevation on the surface of dry land on Earth?",
        correct: "Dead Sea",
        w1: "Lake Assal",
        w2: "Salton Sea",
        exp: "The surface and shores of the Dead Sea lie more than 430 meters below sea level, with salinity reaching roughly thirty-four percent."
      }
    ],
    number: {
      q: "What is the maximum recorded depth in meters of Lake Baikal in Siberia, making it the deepest lake on Earth?",
      target: 1642,
      unit: "meters",
      imperial: "5,387 feet",
      exp: "Lake Baikal reaches a maximum surveyed depth of 1,642 meters in its central basin, fed by more than 330 inflowing rivers."
    }
  },

  // Cycle 5: African & High-Altitude Waters
  {
    mcqs: [
      {
        q: "What is the largest tropical lake in the world and the chief reservoir source of the White Nile, shared by Uganda, Kenya, and Tanzania?",
        correct: "Lake Victoria",
        w1: "Lake Tanganyika",
        w2: "Lake Chad",
        exp: "Lake Victoria, also known as Nalubaale, covers roughly 59,940 square kilometers as the second-largest freshwater lake by surface area."
      },
      {
        q: "Which East African Great Lake is celebrated by evolutionary biologists for hosting over a thousand unique endemic species of cichlid fish?",
        correct: "Lake Malawi",
        w1: "Lake Albert",
        w2: "Lake Kivu",
        exp: "Lake Malawi, also known as Lake Nyasa, contains more distinct species of fish than any other freshwater lake on Earth."
      },
      {
        q: "Which massive lake in the Peruvian and Bolivian Andes is recognized as the highest commercially navigable body of water in the world?",
        correct: "Lake Titicaca",
        w1: "Lake Poopó",
        w2: "Lake Junín",
        exp: "Lake Titicaca sits at 3,812 meters elevation in the Altiplano, revered in Inca mythology as the birthplace of the Sun."
      },
      {
        q: "What famous caldera lake in Oregon occupies a collapsed volcanic crater formed by the catastrophic eruption of Mount Mazama?",
        correct: "Crater Lake",
        w1: "Lake Tahoe",
        w2: "Mono Lake",
        exp: "Crater Lake is the deepest lake in the United States at 594 meters, world-famous for its intense deep-blue water clarity."
      },
      {
        q: "Which shallow, alkaline lake in northern Kenya is the world largest permanent desert lake and largest alkaline lake?",
        correct: "Lake Turkana",
        w1: "Lake Naivasha",
        w2: "Lake Natron",
        exp: "Lake Turkana is known as the Jade Sea due to vibrant algae blooms, situated in the arid northern sector of the East African Rift."
      }
    ],
    number: {
      q: "What is the surface elevation in meters above sea level of Lake Titicaca in the high Andes?",
      target: 3812,
      unit: "meters",
      imperial: "12,507 feet",
      exp: "Lake Titicaca sits at 3,812 meters altitude, supporting indigenous Uros communities living on floating artificial reed islands."
    }
  },

  // Cycle 6: Strategic Maritime Canals
  {
    mcqs: [
      {
        q: "Which artificial sea-level waterway was constructed by Ferdinand de Lesseps and opened in 1869 to connect the Mediterranean to the Red Sea?",
        correct: "Suez Canal",
        w1: "Panama Canal",
        w2: "Kiel Canal",
        exp: "The Suez Canal spans 193 kilometers through Egypt, eliminating the perilous maritime voyage around the Cape of Good Hope."
      },
      {
        q: "Which engineering marvel utilizes a series of massive double-lock chambers and the artificial Gatun Lake to connect the Atlantic and Pacific Oceans?",
        correct: "Panama Canal",
        w1: "Nicaragua Canal",
        w2: "Corinth Canal",
        exp: "Opened in 1914 across the Isthmus of Panama, the canal cut ocean transit distances between the US East and West coasts by over 13,000 kilometers."
      },
      {
        q: "Which waterway through the German state of Schleswig-Holstein is the busiest artificial marine canal in the world, linking the North and Baltic Seas?",
        correct: "Kiel Canal",
        w1: "Mittelland Canal",
        w2: "Rhine-Main-Danube Canal",
        exp: "The Kiel Canal opened in 1895, saving commercial vessels hundreds of nautical miles around the stormy Jutland Peninsula."
      },
      {
        q: "Which narrow, sheer rock-walled canal cut across an isthmus in Greece in 1893 to connect the Gulf of Corinth with the Saronic Gulf?",
        correct: "Corinth Canal",
        w1: "Rhodes Canal",
        w2: "Bosphorus Passage",
        exp: "The Corinth Canal cuts through rock at sea level over six kilometers, with vertical canyon walls rising sixty-three meters high."
      },
      {
        q: "What is the longest artificial canal and oldest operating waterway in the world, beginning in Beijing and stretching 1,776 kilometers to Hangzhou?",
        correct: "Grand Canal of China",
        w1: "Erie Canal",
        w2: "Lingqu Canal",
        exp: "The Grand Canal linked the Yellow and Yangtze river basins, constructed in major sections beginning under the Sui Dynasty in the sixth century."
      }
    ],
    number: {
      q: "In what year did the Suez Canal officially open for international maritime navigation in Egypt?",
      target: 1869,
      unit: "year",
      imperial: "1869 AD",
      exp: "The Suez Canal was officially inaugurated on November 17, 1869, revolutionizing global maritime trade between Europe and Asia."
    }
  },

  // Cycle 7: Siberian & Polar Rivers
  {
    mcqs: [
      {
        q: "Which colossal Siberian river is the largest river flowing into the Arctic Ocean, rising in Mongolia and flowing north through Lake Baikal?",
        correct: "Yenisey River",
        w1: "Ob River",
        w2: "Lena River",
        exp: "The Yenisey River system discharges over 19,800 cubic meters per second into the Kara Sea of the Arctic Ocean."
      },
      {
        q: "Which eastern Siberian river is famous for its dramatic towering limestone rock pillars rising 300 meters along its riverbanks?",
        correct: "Lena River",
        w1: "Kolyma River",
        w2: "Amur River",
        exp: "The Lena River flows 4,472 kilometers from the Baikal Mountains into the Laptev Sea, forming a massive Arctic delta."
      },
      {
        q: "What major Russian river combines with the Irtysh River to form one of the longest river systems in Asia, emptying into the world longest estuary?",
        correct: "Ob River",
        w1: "Pechora River",
        w2: "Angara River",
        exp: "The Gulf of Ob in the Kara Sea extends roughly 800 kilometers in length as the longest river estuary on Earth."
      },
      {
        q: "What is the longest river system in Canada, originating in the Canadian Rockies and flowing north into the Beaufort Sea?",
        correct: "Mackenzie River",
        w1: "Yukon River",
        w2: "Fraser River",
        exp: "The Mackenzie River spans 4,241 kilometers from the head of the Finlay River, draining an area larger than Western Europe."
      },
      {
        q: "Which historic river flowing through Canada Yukon Territory and Alaska was the epicenter of the famous Klondike Gold Rush in the late 1890s?",
        correct: "Yukon River",
        w1: "Kuskokwim River",
        w2: "Copper River",
        exp: "Tens of thousands of prospectors traveled down the Yukon River after crossing the Chilkoot Pass to reach Dawson City."
      }
    ],
    number: {
      q: "What is the total navigable length in kilometers of the Panama Canal between the Atlantic and Pacific Oceans?",
      target: 82,
      unit: "km",
      imperial: "51 miles",
      exp: "The Panama Canal stretches roughly 82 kilometers from the deep-water Atlantic channel in Limon Bay to the Pacific entrance in Panama Bay."
    }
  },

  // Cycle 8: Sacred Rivers & Ancient Cradles
  {
    mcqs: [
      {
        q: "Which sacred river originates from the Gangotri Glacier in the Himalayas and is worshipped by Hindus as the goddess Ganga?",
        correct: "Ganges River",
        w1: "Yamuna River",
        w2: "Narmada River",
        exp: "The Ganges flows 2,525 kilometers across northern India and Bangladesh, forming the vast Sundarbans delta before entering the Bay of Bengal."
      },
      {
        q: "Which major river flowing through Tibet, India, and Pakistan gave its historic name to the country of India and the Indian Subcontinent?",
        correct: "Indus River",
        w1: "Jhelum River",
        w2: "Chenab River",
        exp: "The Indus River valley hosted the Bronze Age Indus Valley Civilization, one of humanity earliest urban riverine societies."
      },
      {
        q: "Which two historic rivers define the fertile river valley of Mesopotamia, flowing parallel through modern Iraq to the Persian Gulf?",
        correct: "Tigris and Euphrates",
        w1: "Nile and Jordan",
        w2: "Orontes and Litani",
        exp: "The Tigris and Euphrates rivers supported Sumer, Akkad, Babylon, and Assyria, uniting to form the Shatt al-Arab waterway."
      },
      {
        q: "What massive river flows across the Tibetan Plateau as the Yarlung Tsangpo, carving the world deepest canyon before entering India?",
        correct: "Brahmaputra River",
        w1: "Salween River",
        w2: "Irrawaddy River",
        exp: "The Yarlung Tsangpo Grand Canyon plunges over 5,300 meters from mountain peaks to riverbed, deeper than the Grand Canyon in Arizona."
      },
      {
        q: "Which biblical river rises on Mount Hermon and flows south through the Sea of Galilee before terminating in the Dead Sea?",
        correct: "Jordan River",
        w1: "Yarmouk River",
        w2: "Zarqa River",
        exp: "The Jordan River lies within the Jordan Rift Valley and is celebrated in Abrahamic religions as the site of Jesus baptism."
      }
    ],
    number: {
      q: "In what year was the Panama Canal officially opened to commercial maritime traffic?",
      target: 1914,
      unit: "year",
      imperial: "1914 AD",
      exp: "The cargo ship SS Ancon made the first official transit through the newly completed Panama Canal on August 15, 1914."
    }
  },

  // Cycle 9: Hydrological Marvels & Shrinking Basins
  {
    mcqs: [
      {
        q: "Which once-massive inland sea between Kazakhstan and Uzbekistan dramatically desiccated due to Soviet river diversion projects?",
        correct: "Aral Sea",
        w1: "Lake Balkhash",
        w2: "Caspian Sea",
        exp: "The diversion of the Amu Darya and Syr Darya rivers for cotton irrigation reduced the Aral Sea to ten percent of its original volume."
      },
      {
        q: "In which Southeast Asian country does the Tonle Sap River reverse its flow direction seasonally during the summer monsoon?",
        correct: "Cambodia",
        w1: "Thailand",
        w2: "Vietnam",
        exp: "Heavy Mekong floodwaters push water upstream into Tonle Sap Lake, expanding the lake surface area by more than five times."
      },
      {
        q: "What world-famous endorheic wetland in Botswana is formed where a major river empties onto Kalahari Desert sands without reaching any ocean?",
        correct: "Okavango Delta",
        w1: "Makgadikgadi Salt Pans",
        w2: "Etosha Pan",
        exp: "The Okavango Delta receives seasonal floods from the Angolan highlands, creating a lush wildlife oasis in the desert."
      },
      {
        q: "What tidal river phenomenon produces a towering standing wave that surges upstream against the current in estuaries like the Amazon and Qiantang?",
        correct: "Tidal Bore",
        w1: "Storm Surge",
        w2: "Rip Current",
        exp: "The Amazon Pororoca and Qiantang River tidal bore create thunderous waves several meters high that travel tens of kilometers inland."
      },
      {
        q: "Which Venezuelan coastal inlet is recognized as the lightning capital of the world due to the continuous Catatumbo lightning storms over its waters?",
        correct: "Lake Maracaibo",
        w1: "Gulf of Paria",
        w2: "Lake Valencia",
        exp: "Lake Maracaibo receives up to 260 thunderstorm days per year where warm Caribbean breezes collide with cold Andean mountain drafts."
      }
    ],
    number: {
      q: "What is the approximate total surface area in thousands of square kilometers of the Caspian Sea?",
      target: 371,
      unit: "thousand sq km",
      imperial: "143,200 sq miles",
      exp: "The Caspian Sea spans roughly 371,000 square kilometers, larger than Germany or Japan."
    }
  },

  // Cycle 10: River Records & Giant Estuaries
  {
    mcqs: [
      {
        q: "What funnel-shaped estuary formed by the confluence of the Uruguay and Paraná rivers is the widest river estuary on Earth?",
        correct: "Río de la Plata",
        w1: "Amazon Estuary",
        w2: "Saint Lawrence Estuary",
        exp: "The Río de la Plata widens to approximately 220 kilometers at its mouth between Buenos Aires, Argentina, and Punta del Este, Uruguay."
      },
      {
        q: "Which deep-water marine navigation channel and lock system connects the Great Lakes of North America directly to the Atlantic Ocean?",
        correct: "Saint Lawrence Seaway",
        w1: "Erie Seaway",
        w2: "Welland Seaway",
        exp: "Completed in 1959, the Saint Lawrence Seaway allows ocean-going freighters to travel over 3,700 kilometers inland to Duluth, Minnesota."
      },
      {
        q: "Which Canadian bay between New Brunswick and Nova Scotia records the highest tidal range on Earth, with tides exceeding sixteen meters?",
        correct: "Bay of Fundy",
        w1: "Hudson Bay",
        w2: "James Bay",
        exp: "Due to natural tidal resonance, the Bay of Fundy moves over 160 billion tons of seawater in and out twice daily."
      },
      {
        q: "What is the largest river delta in the world, formed by the convergence of the Ganges, Brahmaputra, and Meghna rivers?",
        correct: "Ganges-Brahmaputra Delta",
        w1: "Mekong Delta",
        w2: "Mississippi Delta",
        exp: "Also known as the Bengal Delta, it spans over 105,000 square kilometers across Bangladesh and the Indian state of West Bengal."
      },
      {
        q: "Which river in the American Southwest carved the colossal Grand Canyon over millions of years of tectonic uplift and water erosion?",
        correct: "Colorado River",
        w1: "Rio Grande",
        w2: "Green River",
        exp: "The Colorado River carved the 446-kilometer-long Grand Canyon into the high Colorado Plateau, exposing two billion years of geological strata."
      }
    ],
    number: {
      q: "What is the total width in meters of Victoria Falls along the border between Zambia and Zimbabwe?",
      target: 1708,
      unit: "meters",
      imperial: "5,604 feet",
      exp: "Victoria Falls spans 1,708 meters wide across the Zambezi River basalt gorge, creating the largest continuous sheet of falling water."
    }
  }
];

buildQuiz({
  id: "rivers-lakes-waterways-60",
  theme: "Great Rivers, Majestic Waterfalls & Inland Seas",
  title: "Great Rivers, Majestic Waterfalls & Inland Seas",
  description: "Comprehensive 60-question aquatic odyssey exploring world river basins, inland seas, legendary waterfalls, deep lakes, and vital maritime canals.",
  category: "Geography, Capitals & Landscapes",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z"
}, riverCycles);


// =========================================================================
// 4. deserts-arid-lands-60
// Theme: "World Deserts: Sahara, Atacama, Gobi & Arid Wonders"
// Category: "Geography, Capitals & Landscapes"
// =========================================================================
const desertCycles = [
  // Cycle 1: The Mega Deserts & Polar Arid Zones
  {
    mcqs: [
      {
        q: "By standard scientific definition of annual precipitation, what is the largest desert on the planet Earth?",
        correct: "Antarctic Desert",
        w1: "Sahara Desert",
        w2: "Arctic Desert",
        exp: "Covering 14.2 million square kilometers, Antarctica receives less than fifty millimeters of precipitation per year inland, making it a polar desert."
      },
      {
        q: "What is the largest hot desert on Earth, spanning over nine million square kilometers across eleven North African countries?",
        correct: "Sahara Desert",
        w1: "Arabian Desert",
        w2: "Kalahari Desert",
        exp: "The Sahara covers nearly one-third of the African continent, roughly equal in area to the entire United States or China."
      },
      {
        q: "What vast desert covering most of the Arabian Peninsula contains the world largest continuous sand sea named the Rub al Khali?",
        correct: "Arabian Desert",
        w1: "Syrian Desert",
        w2: "Thar Desert",
        exp: "The Rub al Khali, or Empty Quarter, encompasses over 650,000 square kilometers of towering sand dunes across four Gulf nations."
      },
      {
        q: "What is the second-largest polar desert on Earth, covering frozen islands and coastal plains across northern Canada, Greenland, and Russia?",
        correct: "Arctic Desert",
        w1: "Gobi Desert",
        w2: "Patagonian Desert",
        exp: "The Arctic Desert spans nearly fourteen million square kilometers of tundra and ice caps characterized by severe cold and low moisture."
      },
      {
        q: "What term describes a massive, shifting field of wind-blown sand dunes covering thousands of square kilometers in deserts like the Sahara?",
        correct: "Erg",
        w1: "Reg",
        w2: "Hamada",
        exp: "Ergs represent active sand seas, while regs are flat gravel-covered desert pavements and hamadas are rocky barren plateaus."
      }
    ],
    number: {
      q: "What is the approximate total area in millions of square kilometers covered by the Sahara Desert across North Africa?",
      target: 9,
      unit: "million sq km",
      imperial: "3.5 million sq miles",
      exp: "The Sahara Desert encompasses approximately 9.2 million square kilometers, stretching from the Atlantic Ocean to the Red Sea."
    }
  },

  // Cycle 2: The Driest & Most Extreme Deserts
  {
    mcqs: [
      {
        q: "Which coastal desert in northern Chile is scientifically documented as the driest non-polar desert on Earth?",
        correct: "Atacama Desert",
        w1: "Sechura Desert",
        w2: "Monte Desert",
        exp: "Shielded by the Andes on the east and cold Humboldt Current inversion on the west, some Atacama weather stations have never recorded rain."
      },
      {
        q: "Which sunken volcanic depression in northern Ethiopia is one of the hottest places on Earth year-round with active sulfur springs?",
        correct: "Danakil Depression",
        w1: "Qattara Depression",
        w2: "Turpan Depression",
        exp: "The Danakil Depression lies over 120 meters below sea level in the Afar Triangle, featuring bubbling acid pools at Dallol."
      },
      {
        q: "Which Iranian desert basin has repeatedly recorded the highest land surface skin temperatures on Earth via NASA satellite sensors?",
        correct: "Dasht-e Lut",
        w1: "Dasht-e Kavir",
        w2: "Karakum Desert",
        exp: "Satellite radiometers recorded land skin temperatures exceeding seventy degrees Celsius on the dark basalt rock plateaus of Dasht-e Lut."
      },
      {
        q: "Which coastal desert in southwestern Africa features iconic red dunes at Sossusvlei and is considered the oldest desert on Earth?",
        correct: "Namib Desert",
        w1: "Kalahari Desert",
        w2: "Karoo Desert",
        exp: "The Namib Desert has endured hyper-arid conditions for an estimated fifty-five million years, home to the fog-harvesting Welwitschia plant."
      },
      {
        q: "What low-elevation basin in California Mojave Desert holds the world record for the highest reliably recorded air temperature at 56.7 degrees Celsius?",
        correct: "Death Valley",
        w1: "Salton Sink",
        w2: "Anza-Borrego",
        exp: "Greenland Ranch in Death Valley recorded the air temperature on July 10, 1913, within a basin eighty-six meters below sea level."
      }
    ],
    number: {
      q: "What was the highest satellite-recorded land surface skin temperature in degrees Celsius measured in Iran Dasht-e Lut desert?",
      target: 71,
      unit: "degrees Celsius",
      imperial: "159 degrees Fahrenheit",
      exp: "NASA Aqua satellite MODIS sensor measured a peak ground surface temperature of 70.7 degrees Celsius in the Lut Desert in 2005."
    }
  },

  // Cycle 3: Asian & Middle Eastern Deserts
  {
    mcqs: [
      {
        q: "Which expansive cold winter desert spans southern Mongolia and northern China, famous for dinosaur fossil beds at the Flaming Cliffs?",
        correct: "Gobi Desert",
        w1: "Taklamakan Desert",
        w2: "Ordos Desert",
        exp: "The Gobi is a rain-shadow desert formed by the Himalayas, experiencing extreme seasonal temperatures ranging from minus forty to plus forty Celsius."
      },
      {
        q: "Which hyper-arid shifting sand desert in China Tarim Basin has a name translating in local lore as The Place of No Return?",
        correct: "Taklamakan Desert",
        w1: "Gurbantünggüt Desert",
        w2: "Kumtag Desert",
        exp: "The Taklamakan Desert is surrounded by the Tian Shan, Pamir, and Kunlun mountains, composed of shifting sand dunes up to 300 meters high."
      },
      {
        q: "What desert forms a natural boundary between northwestern India and southeastern Pakistan, also known as the Great Indian Desert?",
        correct: "Thar Desert",
        w1: "Cholistan Desert",
        w2: "Kharan Desert",
        exp: "The Thar Desert covers roughly 200,000 square kilometers across Rajasthan, Punjab, and Sindh, supporting vibrant cultural communities."
      },
      {
        q: "In which Central Asian desert in Turkmenistan is the famous Darvaza gas crater located, burning continuously since 1971?",
        correct: "Karakum Desert",
        w1: "Kyzylkum Desert",
        w2: "Betpak-Dala",
        exp: "The Karakum covers over seventy percent of Turkmenistan, where the Door to Hell methane crater collapsed during Soviet drilling."
      },
      {
        q: "What large salt desert plateau in central Iran is covered by treacherous mud and crusty salt marshes named kavirs?",
        correct: "Dasht-e Kavir",
        w1: "Dasht-e Lut",
        w2: "Registan Desert",
        exp: "Dasht-e Kavir occupies a central Iranian basin where intense evaporation leaves thick salt deposits over subterranean mud."
      }
    ],
    number: {
      q: "In what year was the burning Darvaza gas crater first ignited in the Karakum Desert of Turkmenistan?",
      target: 1971,
      unit: "year",
      imperial: "1971 AD",
      exp: "Soviet engineers ignited the natural gas crater in 1971 expecting the gas to burn out in weeks, but it has burned for over five decades."
    }
  },

  // Cycle 4: Australian Outback Deserts
  {
    mcqs: [
      {
        q: "What is the largest desert in Australia, covering over 348,000 square kilometers across Western Australia and South Australia?",
        correct: "Great Victoria Desert",
        w1: "Great Sandy Desert",
        w2: "Simpson Desert",
        exp: "The Great Victoria Desert was named by explorer Ernest Giles in 1875 in honor of Queen Victoria."
      },
      {
        q: "Which Australian desert is world-famous for its parallel red longitudinal sand dunes and the massive Big Red dune near Birdsville?",
        correct: "Simpson Desert",
        w1: "Gibson Desert",
        w2: "Tanami Desert",
        exp: "The Simpson Desert contains the world longest parallel sand dunes, stabilized by spinifex grasses across the Lake Eyre basin."
      },
      {
        q: "Which Australian desert in Western Australia is situated between the Great Victoria and Great Sandy deserts, named after a tragic explorer?",
        correct: "Gibson Desert",
        w1: "Little Sandy Desert",
        w2: "Strzelecki Desert",
        exp: "Ernest Giles named the Gibson Desert after his companion Alfred Gibson, who vanished while searching for water in 1874."
      },
      {
        q: "What causes the striking, vibrant red coloration characteristic of sand dunes across the Australian Outback deserts?",
        correct: "Iron oxide coatings on quartz grains",
        w1: "Volcanic basalt dust",
        w2: "Algae pigment deposits",
        exp: "A thin chemical weathering coat of hematite and goethite iron oxides encases quartz sand particles, creating the iconic red terrain."
      },
      {
        q: "Which sacred massive sandstone inselberg rises 348 meters above the central Australian desert scrubland in the Northern Territory?",
        correct: "Uluru",
        w1: "Kata Tjuta",
        w2: "Mount Connor",
        exp: "Uluru, formerly known as Ayers Rock, is sacred to the Anangu indigenous people, renowned for shifting colors at dawn and dusk."
      }
    ],
    number: {
      q: "What approximate percentage of the Australian continent landmass is classified as arid or semi-arid desert country?",
      target: 70,
      unit: "percent",
      imperial: "70 percent of land",
      exp: "Approximately seventy percent of mainland Australia receives less than 500 millimeters of rainfall annually, forming the vast Outback."
    }
  },

  // Cycle 5: North American Deserts
  {
    mcqs: [
      {
        q: "Which North American desert is famous for its iconic giant Saguaro cacti and spans parts of Arizona, California, and Mexico?",
        correct: "Sonoran Desert",
        w1: "Mojave Desert",
        w2: "Chihuahuan Desert",
        exp: "The Sonoran Desert is a subtropical desert with a bi-seasonal rainfall pattern that supports rich biodiversity."
      },
      {
        q: "Which desert is characterized by the presence of the bizarre, spiky Joshua tree and hosts Death Valley within its boundaries?",
        correct: "Mojave Desert",
        w1: "Great Basin Desert",
        w2: "Sonoran Desert",
        exp: "The Mojave Desert is a transitional desert between the hot Sonoran and cold Great Basin deserts, native habitat of Yucca brevifolia."
      },
      {
        q: "What is the largest desert in North America by total surface area, extending from west Texas and New Mexico deep into northern Mexico?",
        correct: "Chihuahuan Desert",
        w1: "Sonoran Desert",
        w2: "Mojave Desert",
        exp: "The Chihuahuan Desert covers over 500,000 square kilometers, characterized by high-elevation shrublands and agave species."
      },
      {
        q: "Which cold desert in the United States covers most of Nevada and western Utah between the Sierra Nevada and Wasatch mountains?",
        correct: "Great Basin Desert",
        w1: "Colorado Plateau Desert",
        w2: "Painted Desert",
        exp: "The Great Basin Desert is an internal drainage basin characterized by sagebrush valleys separated by north-south mountain ranges."
      },
      {
        q: "Which national park in New Mexico preserves the world largest field of bright white gypsum sand dunes covering 710 square kilometers?",
        correct: "White Sands National Park",
        w1: "Great Sand Dunes National Park",
        w2: "Guadalupe Mountains National Park",
        exp: "Unlike quartz sand, water-soluble gypsum crystals precipitated from Lake Otero during the last Ice Age to form glittering dunes."
      }
    ],
    number: {
      q: "What is the lowest elevation in meters below sea level at Badwater Basin in Death Valley National Park?",
      target: 86,
      unit: "meters below sea level",
      imperial: "282 feet below sea level",
      exp: "Badwater Basin in Death Valley sits at 86 meters below sea level, surrounded by hexagonal salt crust formations."
    }
  },

  // Cycle 6: South American & African Arid Lands
  {
    mcqs: [
      {
        q: "Which large semi-arid sandy savanna basin spans much of Botswana, eastern Namibia, and northern South Africa?",
        correct: "Kalahari Desert",
        w1: "Karoo",
        w2: "Namib Desert",
        exp: "The Kalahari is technically a semi-desert with red sand sheets that support acacia trees, meerkats, and migratory antelopes."
      },
      {
        q: "What cold winter desert in southern Argentina lies in the rain shadow of the Andes Mountains, ending in coastal Atlantic cliffs?",
        correct: "Patagonian Desert",
        w1: "Atacama Desert",
        w2: "Monte Desert",
        exp: "The Patagonian Desert is the largest desert in the Americas by area, characterized by gravel plains and strong westerly winds."
      },
      {
        q: "Which mountainous desert region in northwestern South Africa is recognized by UNESCO for its rich succulent biodiversity and Nama pastoral culture?",
        correct: "Richtersveld",
        w1: "Succulent Karoo",
        w2: "Namaqualand",
        exp: "The Richtersveld contains thousands of endemic succulent species, including the bizarre halfmens Pachypodium namaquanum tree."
      },
      {
        q: "What coastal desert strip in northern Peru between the Pacific Ocean and the Andes contains the ancient Nazca desert plains?",
        correct: "Sechura Desert",
        w1: "Monte Desert",
        w2: "Atacama Desert",
        exp: "The Peruvian coastal desert hosted pre-Columbian cultures including the Moche, Paracas, and Nazca who created the famous geoglyphs."
      },
      {
        q: "What long-lived desert plant native to the Namib Desert produces only two continuous leaves that grow throughout its thousand-year lifespan?",
        correct: "Welwitschia mirabilis",
        w1: "Baobab",
        w2: "Quiver Tree",
        exp: "Welwitschia mirabilis absorbs life-sustaining moisture from Atlantic sea fogs that blow inland across the coastal desert."
      }
    ],
    number: {
      q: "What is the estimated age in millions of years of the Namib Desert, making it widely recognized as the oldest desert on Earth?",
      target: 55,
      unit: "million years",
      imperial: "55 million years old",
      exp: "Geologists estimate the Namib Desert has experienced arid to hyper-arid conditions for at least 55 to 80 million years."
    }
  },

  // Cycle 7: Desert Landforms & Geomorphology
  {
    mcqs: [
      {
        q: "What is the name for a streamlined, wind-carved bedrock ridge sculpted into aerodynamic hull shapes in hyper-arid desert regions?",
        correct: "Yardang",
        w1: "Zeugen",
        w2: "Ventifact",
        exp: "Yardangs are carved by dual processes of wind deflation and sand abrasion, aligned parallel to prevailing wind directions."
      },
      {
        q: "What type of crescent-shaped sand dune has tips or horns pointing downwind in areas with unidirectional winds and limited sand supply?",
        correct: "Barchan dune",
        w1: "Transverse dune",
        w2: "Seif dune",
        exp: "Barchan dunes migrate steadily across desert hardpan as wind blows sand grains up the shallow windward slope and down the slip face."
      },
      {
        q: "What Arabic geographical term describes a dry river valley or ravine in desert regions that remains dry until rare, torrential flash floods occur?",
        correct: "Wadi",
        w1: "Playa",
        w2: "Arroyo",
        exp: "Wadis act as natural drainage channels during desert flash floods, while remaining bone-dry gravel beds for most of the year."
      },
      {
        q: "What is a lush, fertile green area in a desert supported by natural underground springs or artesian aquifers called?",
        correct: "Oasis",
        w1: "Playas",
        w2: "Sabkha",
        exp: "Oases formed vital trading posts along trans-Saharan and Silk Road routes, allowing date palm cultivation and reliable watering."
      },
      {
        q: "What dark, glossy manganese and iron oxide coating forms on exposed desert rock surfaces over thousands of years of microbial activity?",
        correct: "Desert Varnish",
        w1: "Caliche",
        w2: "Silcrete",
        exp: "Ancient humans scraped through dark desert varnish to reveal lighter underlying rock, creating petroglyphs and rock art."
      }
    ],
    number: {
      q: "What is the approximate maximum height in meters of Dune 7, the towering sand dune near Walvis Bay in the Namib Desert?",
      target: 388,
      unit: "meters",
      imperial: "1,273 feet",
      exp: "Dune 7 in the coastal Namib Desert rises roughly 388 meters, ranking among the tallest single sand dunes on Earth."
    }
  },

  // Cycle 8: Salt Flats & Playas
  {
    mcqs: [
      {
        q: "What colossal salt flat in southwest Bolivia is the largest salt flat on Earth, covering over 10,500 square kilometers on the Altiplano?",
        correct: "Salar de Uyuni",
        w1: "Salar de Atacama",
        w2: "Salinas Grandes",
        exp: "Salar de Uyuni is an extraordinary flat expanse containing over half the world known lithium reserves and functioning as an orbital satellite mirror."
      },
      {
        q: "Which densely packed salt pan in northwestern Utah has hosted world land speed record attempts since the early twentieth century?",
        correct: "Bonneville Salt Flats",
        w1: "Black Rock Desert",
        w2: "Alvord Desert",
        exp: "The Bonneville Salt Flats are a remnant of ancient Lake Bonneville, providing an exceptionally smooth, hard surface for rocket-car trials."
      },
      {
        q: "What immense salt pan in northern Namibia forms the centerpiece of a major national park, visible from space as a brilliant white desert expanse?",
        correct: "Etosha Pan",
        w1: "Makgadikgadi Pan",
        w2: "Sua Pan",
        exp: "Etosha Pan covers nearly 4,800 square kilometers, transforming briefly into an algae-rich breeding lake for flamingos after rare rains."
      },
      {
        q: "Which large endorheic salt lake in central Tunisia was featured as a filming location for the desert planet Tatooine in Star Wars?",
        correct: "Chott el Djerid",
        w1: "Chott Melrhir",
        w2: "Lake Karum",
        exp: "Chott el Djerid is the largest salt pan in the Sahara, spanning 7,000 square kilometers where shimmering thermal mirages are common."
      },
      {
        q: "What shallow endorheic lake in South Australia is the lowest natural point in Australia at fifteen meters below sea level when dry?",
        correct: "Lake Eyre",
        w1: "Lake Torrens",
        w2: "Lake Gairdner",
        exp: "Kati Thanda-Lake Eyre is an enormous salt sink that only fills completely with floodwaters roughly a few times per century."
      }
    ],
    number: {
      q: "What is the approximate total surface area in square kilometers of Salar de Uyuni in Bolivia?",
      target: 10582,
      unit: "sq km",
      imperial: "4,086 sq miles",
      exp: "Salar de Uyuni covers 10,582 square kilometers at an elevation of 3,656 meters above sea level."
    }
  },

  // Cycle 9: Desert Meteorology & Optical Illusions
  {
    mcqs: [
      {
        q: "What meteorological term describes a violent, towering wall of dust and sand carried on the outflow boundary of a desert thunderstorm?",
        correct: "Haboob",
        w1: "Simoom",
        w2: "Sirocco",
        exp: "Haboobs are colossal dust storms common in the Sahara, Arabian Peninsula, and American Southwest that reduce visibility to zero."
      },
      {
        q: "What optical illusion occurs when hot air near the desert surface bends light rays upward to create the appearance of reflective water on the horizon?",
        correct: "Inferior Mirage",
        w1: "Superior Mirage",
        w2: "Fata Morgana",
        exp: "An inferior mirage is produced when steep thermal gradients refract light rays upward from the heated ground, displaying inverted sky images."
      },
      {
        q: "What acoustic phenomenon occurs in certain sand dunes when moving sand grains vibrate together to produce a loud, low-frequency humming drone?",
        correct: "Singing Sand",
        w1: "Aeolian Resonance",
        w2: "Desert Whistler",
        exp: "Singing or booming sand occurs when dry, uniformly sized quartz sand grains avalanche down slip faces, producing sound waves up to 105 decibels."
      },
      {
        q: "What geographical phenomenon causes dry desert conditions on the leeward side of towering mountain ranges?",
        correct: "Rain Shadow Effect",
        w1: "Coriolis Deflection",
        w2: "Hadley Inversion",
        exp: "Moist air cools and drops rain on windward mountain slopes, leaving warm, dry descending air on the leeward side to create deserts."
      },
      {
        q: "What hot, dry, dust-laden southeasterly wind blows across North Africa from the Sahara into the Mediterranean Sea?",
        correct: "Sirocco",
        w1: "Mistral",
        w2: "Bora",
        exp: "The Sirocco, also known as Ghibli or Khamsin, carries Saharan red sand particles across the Mediterranean into southern Europe."
      }
    ],
    number: {
      q: "What is the average annual rainfall in millimeters in the hyper-arid core of the Atacama Desert in Chile?",
      target: 1,
      unit: "mm",
      imperial: "0.04 inches",
      exp: "The hyper-arid center of the Atacama receives less than one millimeter of rainfall per year on average, making it Earth driest desert."
    }
  },

  // Cycle 10: Human Adaptations & Modern Science
  {
    mcqs: [
      {
        q: "Which mountain range in the central Algerian Sahara preserves over 15,000 prehistoric rock carvings depicting green savannas, hippos, and cattle?",
        correct: "Tassili n Ajjer",
        w1: "Ahaggar Mountains",
        w2: "Tibesti Mountains",
        exp: "Tassili n Ajjer rock art documents the African Humid Period, when the Sahara was a lush grassland with lakes and abundant wildlife."
      },
      {
        q: "What nomadic Berber pastoralist group is known as the Blue People of the Sahara due to their indigo-dyed tagelmust veils?",
        correct: "Tuareg",
        w1: "Bedouin",
        w2: "San",
        exp: "The Tuareg traditionally guided trans-Saharan camel caravans across the desert, navigating vast ergs using astronomy and landmarks."
      },
      {
        q: "Why is the Atacama Desert in Chile home to premier astronomical observatories including the ALMA array and the Very Large Telescope?",
        correct: "Extremely dry air and high altitude with over 300 clear cloudless nights per year",
        w1: "Proximity to the South Pole magnetic field",
        w2: "Complete absence of seismic activity",
        exp: "The combination of high elevation, minimal atmospheric water vapor, and zero light pollution provides optimal conditions for deep space astronomy."
      },
      {
        q: "What ambitious multinational African initiative aims to restore 100 million hectares of degraded land along the southern edge of the Sahara?",
        correct: "Great Green Wall",
        w1: "Sahara Forest Project",
        w2: "Sahel Reforestation Treaty",
        exp: "The Great Green Wall stretches 8,000 kilometers across the entire width of Africa from Senegal to Djibouti to combat desertification."
      },
      {
        q: "What domesticated pack animal, nicknamed the Ship of the Desert, has specialized fat-storing humps and third eyelids for desert survival?",
        correct: "Dromedary Camel",
        w1: "Bactrian Camel",
        w2: "Guanaco",
        exp: "The single-humped Dromedary camel can travel hundreds of kilometers without water by storing energy-rich fat reserves in its hump."
      }
    ],
    number: {
      q: "In what year was the pan-African Great Green Wall initiative officially adopted by the African Union to combat Saharan desertification?",
      target: 2007,
      unit: "year",
      imperial: "2007 AD",
      exp: "The African Union officially launched the Great Green Wall of the Sahara and the Sahel Initiative in 2007."
    }
  }
];

buildQuiz({
  id: "deserts-arid-lands-60",
  theme: "World Deserts: Sahara, Atacama, Gobi & Arid Wonders",
  title: "World Deserts: Sahara, Atacama, Gobi & Arid Wonders",
  description: "Comprehensive 60-question exploration of hyper-arid landscapes, polar tundras, desert adaptations, sand seas, and salt flats.",
  category: "Geography, Capitals & Landscapes",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z"
}, desertCycles);
