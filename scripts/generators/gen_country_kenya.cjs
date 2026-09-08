const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 4. kenya-geography-heritage-60
// =========================================================================
const kenyaCycles = [
  // Cycle 1: The Great Rift Valley & Mount Kenya
  {
    mcqs: [
      {
        q: "What massive 6,000-kilometer geological fault system, visible from space, cuts vertically through central Kenya from north to south?",
        correct: "The Great Rift Valley Gregory Rift",
        w1: "The Albertine Rift",
        w2: "The Mid-Atlantic Rift",
        exp: "Formed by tectonic stretching of the African continental plate, the Kenyan Rift features sheer escarpments, dormant volcanoes, and soda lakes."
      },
      {
        q: "What is the highest mountain peak in Kenya and second highest in Africa, an extinct stratovolcano rising 5,199 meters directly on the equator?",
        correct: "Mount Kenya Kirinyaga",
        w1: "Mount Kilimanjaro",
        w2: "Mount Elgon",
        exp: "Mount Kenya features three main rocky summit peaks: Batian (5,199 m), Nelion (5,188 m), and Point Lenana (4,985 m), sacred in Kikuyu cosmology as the home of the creator god Ngai."
      },
      {
        q: "Which national park in the Great Rift Valley south of Lake Naivasha allows visitors to hike and bicycle past geothermal steam vents and towering volcanic plug cliffs?",
        correct: "Hell Gate National Park",
        w1: "Mount Longonot National Park",
        w2: "Aberdare National Park",
        exp: "Named for a narrow cliff break, Hell Gate features Fischer Tower, volcanic obsidian caves, and served as the visual scenery inspiration for Disney The Lion King."
      },
      {
        q: "What young, dormant stratovolcano in the Great Rift Valley features a scenic three-kilometer rim trail circling a 100-meter-deep forested caldera floor?",
        correct: "Mount Longonot",
        w1: "Mount Suswa",
        w2: "Menengai Crater",
        exp: "Longonot (derived from the Maasai word Oloonong'ot meaning 'mountain of many spurs') last erupted in the 1860s, offering views of Lake Naivasha."
      },
      {
        q: "What alkaline soda lake in Baringo County is world-famous for over two hundred active boiling geothermal geysers and hot springs jetting water along its shoreline?",
        correct: "Lake Bogoria",
        w1: "Lake Elementaita",
        w2: "Lake Magadi",
        exp: "Lake Bogoria is a Ramsar wetland and home to one of the world largest populations of lesser flamingos feeding on blue-green spirulina algae."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Batian, the highest point of Mount Kenya?",
      target: 5199,
      unit: "meters",
      imperial: "17,057 feet",
      exp: "Mount Kenya Batian peak stands at an official elevation of 5,199 meters above sea level."
    }
  },

  // Cycle 2: Maasai Mara & The Great Migration
  {
    mcqs: [
      {
        q: "What world-famous wildlife conservation reserve in southwestern Kenya along the Tanzanian border is contiguous with the Serengeti National Park?",
        correct: "Maasai Mara National Reserve",
        w1: "Tsavo National Park",
        w2: "Amboseli National Park",
        exp: "Named in honor of the ancestral Maasai people and their description of the acacia-dotted savanna as 'Mara' (Spotted), the reserve hosts the Big Five animals."
      },
      {
        q: "Approximately how many blue wildebeest, zebras, and Thomson gazelles undertake the epic annual Great Migration across the crocodile-filled Mara River into Kenya each July?",
        correct: "Over 1.5 Million Animals",
        w1: "500,000 Animals",
        w2: "3 Million Animals",
        exp: "Recognized as one of the Seven Natural Wonders of Africa, the herds follow seasonal rainfall clockwise across 30,000 square kilometers in search of fresh green grass."
      },
      {
        q: "Which river crossing in the Maasai Mara is the dramatic climax of the Great Migration, where migrating herds brave giant Nile crocodiles and stalking lions?",
        correct: "The Mara River",
        w1: "The Talek River",
        w2: "The Sand River",
        exp: "Documented in wildlife films worldwide, thousands of wildebeest plunge down steep riverbanks into raging currents while Nile crocodiles lie in wait."
      },
      {
        q: "What traditional rhythmic jumping dance performed by young Maasai warriors (morans), showcasing stamina and physical prowess, is known as the Adumu?",
        correct: "The Maasai Jumping Dance Adumu",
        w1: "The Haka",
        w2: "The Gumboot Dance",
        exp: "Forming a circle, warriors take turns entering the center to jump straight into the air without letting their heels touch the ground, accompanied by deep polyphonic chanting."
      },
      {
        q: "What distinctive traditional red-and-blue checked fabric shawl is worn by the semi-nomadic Maasai pastoralists of Kenya and Tanzania?",
        correct: "The Shúkà Shuka",
        w1: "The Kanga",
        w2: "The Kitenge",
        exp: "Made from durable cotton, the vibrant red color of the Shúkà is traditionally believed to ward off lions while symbolizing warrior courage and cattle blood."
      }
    ],
    number: {
      q: "Approximately how many millions of wildebeest participate annually in the circular Great Migration between the Serengeti and Maasai Mara?",
      target: 2,
      unit: "million animals",
      imperial: "1.5 to 2 million wildebeest",
      exp: "Over 1.5 million wildebeest (rounded to 2 million with accompanying zebras and gazelles) undertake the perilous annual migration across the Mara River."
    }
  },

  // Cycle 3: Rift Valley Soda Lakes & Cradle of Humankind
  {
    mcqs: [
      {
        q: "What famous national park in the Great Rift Valley encloses an alkaline lake that famously supports up to two million feeding pink lesser flamingos and black rhinos?",
        correct: "Lake Nakuru National Park",
        w1: "Lake Naivasha",
        w2: "Lake Elementaita",
        exp: "Alkaline waters rich in Arthrospira platensis spirulina algae nourish massive flamingo flocks, alongside the baboon cliff overlook and Rothschild giraffe sanctuary."
      },
      {
        q: "What massive 6,400-square-kilometer desert lake in northern Kenya, known as the Jade Sea for its turquoise color, is the largest permanent desert lake on Earth?",
        correct: "Lake Turkana Lake Rudolf",
        w1: "Lake Victoria",
        w2: "Lake Baringo",
        exp: "Fed by the Omo River, Lake Turkana is the world largest alkaline lake, supporting the world largest population of Nile crocodiles breeding on Central Island."
      },
      {
        q: "What famous 1.6-million-year-old nearly complete fossilized skeleton of an early Homo erectus youth was discovered near Lake Turkana in 1984 by Kamoya Kimeu and Richard Leakey?",
        correct: "Turkana Boy Nariokotome Boy",
        w1: "Lucy",
        w2: "Taung Child",
        exp: "Turkana Boy is the most complete early human skeleton ever discovered, cementing the Lake Turkana basin as the Cradle of Humankind."
      },
      {
        q: "What high-altitude freshwater lake in the Rift Valley at 1,884 meters is surrounded by yellow-barked fever tree forests and home to over 1,500 hippos?",
        correct: "Lake Naivasha",
        w1: "Lake Nakuru",
        w2: "Lake Magadi",
        exp: "Naivasha (from Maasai Nai'posha meaning 'rough water' due to sudden afternoon storms) is Kenya primary center for commercial greenhouse rose and carnation floriculture."
      },
      {
        q: "What unique crescent-shaped peninsula sanctuary inside Lake Naivasha allows visitors to walk on foot freely alongside wild giraffes, zebras, and waterbucks with no predators?",
        correct: "Crescent Island Game Sanctuary",
        w1: "Crater Lake Sanctuary",
        w2: "Ostrich Island",
        exp: "Crescent Island was used as a primary filming location for the 1985 Academy Award-winning movie Out of Africa starring Meryl Streep and Robert Redford."
      }
    ],
    number: {
      q: "What is the approximate total surface area in thousands of square kilometers of Lake Turkana (the Jade Sea), the largest permanent desert lake on Earth?",
      target: 6,
      unit: "thousand square kilometers",
      imperial: "2,470 square miles (6,405 sq km)",
      exp: "Lake Turkana covers approximately 6,405 square kilometers (rounded to 6k sq km) in northern Kenya."
    }
  },

  // Cycle 4: Amboseli & Giant Tuskers
  {
    mcqs: [
      {
        q: "What iconic national park in southern Kenya is internationally famous for offering postcard vistas of free-roaming elephant herds with snow-capped Mount Kilimanjaro in the background?",
        correct: "Amboseli National Park",
        w1: "Tsavo West",
        w2: "Chyulu Hills",
        exp: "Fed by subterranean melting snows from Kilimanjaro, Amboseli permanent freshwater swamps (Enkongo Narok and Olokenya) sustain wildlife during dry seasons."
      },
      {
        q: "Which pioneering American wildlife researcher founded the Amboseli Elephant Research Project in 1972, the longest continuous behavioral study of wild elephants in the world?",
        correct: "Dr. Cynthia Moss",
        w1: "Jane Goodall",
        w2: "Dian Fossey",
        exp: "Moss cataloged and followed generations of over 3,000 elephants in Amboseli, documenting matriarchal leadership, emotional grief, and complex acoustic vocalizations."
      },
      {
        q: "What rare category of wild African bull elephants with massive genetic ivory tusks so long that they scrape the ground (each tusk weighing over 100 pounds) is protected in Amboseli and Tsavo?",
        correct: "Super Tuskers",
        w1: "Grand Matriarchs",
        w2: "Crown Bulls",
        exp: "Fewer than thirty Super Tuskers survive in all of Africa today, protected by 24/7 dedicated armed ranger tracking units and aerial surveillance."
      },
      {
        q: "What prominent volcanic hill in the center of Amboseli National Park offers panoramic 360-degree views across swamps, dust devils, and Mount Kilimanjaro?",
        correct: "Observation Hill Noomotio",
        w1: "Poacher Lookout",
        w2: "Lion Rock",
        exp: "Observation Hill is one of the few designated areas in Amboseli where visitors are permitted to exit safari vehicles and climb the stone stairway to the top."
      },
      {
        q: "What scenic volcanic mountain range of rolling green volcanic cinder cones between Amboseli and Tsavo was described by Ernest Hemingway in Green Hills of Africa?",
        correct: "The Chyulu Hills",
        w1: "Taita Hills",
        w2: "Ngong Hills",
        exp: "The Chyulu Hills contain the Leviathan Cave (one of the longest lava tubes in the world at 11.5 km), formed by young volcanic eruptions just 500 years ago."
      }
    ],
    number: {
      q: "In what year did Dr. Cynthia Moss establish the Amboseli Elephant Research Project in Kenya, the world longest continuous study of wild elephants?",
      target: 1972,
      unit: "year",
      imperial: "1972 AD",
      exp: "Cynthia Moss established the Amboseli Elephant Research Project in 1972, studying the famed matriarch Echo and her family."
    }
  },

  // Cycle 5: Nairobi, The Green City & Wildlife Sanctuaries
  {
    mcqs: [
      {
        q: "What capital city of Kenya, known as the Green City in the Sun, originated in 1899 as a simple rail depot along the Uganda Railway?",
        correct: "Nairobi",
        w1: "Mombasa",
        w2: "Kisumu",
        exp: "Derived from the Maasai phrase Enkare Nyrobi (meaning 'place of cool waters'), Nairobi is the largest metropolis in East Africa and a global United Nations headquarters."
      },
      {
        q: "What unique 117-square-kilometer national park established in 1946 is the only national park in the world located within the municipal boundary of a national capital city?",
        correct: "Nairobi National Park",
        w1: "Karura Forest",
        w2: "Ol Donyo Sabuk",
        exp: "Visitors photograph wild black rhinos, lions, and giraffes grazing across open savanna with the skyscrapers of downtown Nairobi forming the dramatic urban backdrop."
      },
      {
        q: "What world-renowned wildlife orphanage and rehabilitation center in Nairobi National Park rescues, raises, and successfully rewilds orphaned baby elephants and rhinos?",
        correct: "Sheldrick Wildlife Trust",
        w1: "Giraffe Centre",
        w2: "Animal Orphanage",
        exp: "Founded in 1977 by Dame Daphne Sheldrick in memory of warden David Sheldrick, keepers bottle-feed infant calves with a specialized milk formula twenty-four hours a day."
      },
      {
        q: "What sanctuary in the Lang'ata suburb of Nairobi, operated by the African Fund for Endangered Wildlife (AFEW), is dedicated to breeding and conserving endangered Rothschild giraffes?",
        correct: "The Giraffe Centre",
        w1: "Nairobi Safari Walk",
        w2: "Mamba Village",
        exp: "Visitors feed tall Rothschild giraffes by hand from raised wooden observation platforms, adjacent to the famous boutique hotel Giraffe Manor."
      },
      {
        q: "Which Danish author lived on a 4,500-acre coffee farm at the foot of the Ngong Hills in Nairobi from 1914 to 1931, chronicling her life in the memoir Out of Africa under the pen name Isak Dinesen?",
        correct: "Karen Blixen",
        w1: "Beryl Markham",
        w2: "Joy Adamson",
        exp: "Her historic farmhouse is preserved as the Karen Blixen Museum in the modern Nairobi suburb of Karen, named in her honor."
      }
    ],
    number: {
      q: "How many kilometers from the downtown central business district of Nairobi is the entrance of Nairobi National Park?",
      target: 7,
      unit: "kilometers",
      imperial: "4.3 miles from downtown",
      exp: "Nairobi National Park is located just seven kilometers south of Nairobi city center, separated only by an electric fence."
    }
  },

  // Cycle 6: The Swahili Coast & Fort Jesus
  {
    mcqs: [
      {
        q: "What is the oldest and second largest city in Kenya, a major Indian Ocean seaport located on an island connected to the mainland by bridges and the Likoni Ferry?",
        correct: "Mombasa",
        w1: "Malindi",
        w2: "Lamu",
        exp: "Mombasa is an ancient maritime trading hub mentioned in 12th-century Arab chronicles by al-Idrisi, famous for Old Town spice markets and giant aluminum elephant tusk arches (Moi Avenue)."
      },
      {
        q: "What monumental 16th-century Portuguese coastal fortress in Mombasa, designed by Italian architect Giovanni Battista Cairati in the shape of a human, is a UNESCO World Heritage site?",
        correct: "Fort Jesus Forte Jesus de Mombaça",
        w1: "Fort St. Joseph",
        w2: "Gedi Ruins",
        exp: "Built between 1593 and 1596 by order of King Philip I of Portugal to protect the trade route to India, the fortress changed hands nine times between the Portuguese, Omani Arabs, and British."
      },
      {
        q: "What pristine 25-kilometer white-sand beach south of Mombasa, fringed by coral reefs and coconut palms, is repeatedly voted the best beach destination in Africa?",
        correct: "Diani Beach",
        w1: "Nyali Beach",
        w2: "Watamu Beach",
        exp: "Diani features warm turquoise waters ideal for kitesurfing, deep-sea fishing, and diving alongside migrating whale sharks and green sea turtles."
      },
      {
        q: "What historic coral stone settlement ruins in a coastal forest near Malindi, dating from the 13th to 17th centuries, reveal an advanced medieval Swahili city with indoor plumbing?",
        correct: "Gedi Ruins Gede",
        w1: "Jumba la Mtwana",
        w2: "Mnarani Ruins",
        exp: "Excavations uncovered Ming Dynasty Chinese porcelain, Venetian glass beads, and Spanish scissors, demonstrating the global trade networks of the Swahili civilization."
      },
      {
        q: "What traditional single-masted wooden sailing vessels with lateen triangular sails have navigated Indian Ocean monsoon trade winds along the Kenyan coast for centuries?",
        correct: "Dhows Dhow Boats",
        w1: "Proas",
        w2: "Junks",
        exp: "Crafted by hand from mahogany and mangrove wood, dhows carried frankincense, spices, mangrove timber, and silk between East Africa, Arabia, and India."
      }
    ],
    number: {
      q: "In what year did Portuguese colonial forces begin construction of the historic Fort Jesus fortress in Mombasa?",
      target: 1593,
      unit: "year",
      imperial: "1593 AD",
      exp: "Construction of Fort Jesus in Mombasa commenced in 1593 and was completed in 1596."
    }
  },

  // Cycle 7: Lamu Island & Swahili Stone Architecture
  {
    mcqs: [
      {
        q: "What ancient island settlement in the Lamu Archipelago is recognized by UNESCO as the oldest and best-preserved continuous Swahili settlement in East Africa?",
        correct: "Lamu Old Town",
        w1: "Pate Island",
        w2: "Manda Island",
        exp: "Built from coral rag stone and mangrove timber, Lamu features narrow pedestrian alleyways, inner courtyards, and intricately hand-carved wooden brass-studded doors."
      },
      {
        q: "Because narrow winding streets in Lamu Old Town cannot accommodate motor vehicles, what traditional animals are used as the primary mode of transportation and cargo haulage across the island?",
        correct: "Donkeys",
        w1: "Camels",
        w2: "Horses",
        exp: "Lamu is home to over 3,000 working donkeys, served by the dedicated Lamu Donkey Sanctuary providing veterinary care on the island."
      },
      {
        q: "What famous architectural element of traditional Lamu Swahili houses displays the social status and wealth of the homeowner through intricate geometric rosettes and Quranic calligraphy?",
        correct: "Carved Swahili Wooden Doors",
        w1: "Cast-Iron Balconies",
        w2: "Stained Glass Domes",
        exp: "Carved from dense local teak or mvule wood by master craftsmen, doors feature symbolic carved chains (security) and lotus flowers (prosperity)."
      },
      {
        q: "What major Islamic cultural festival, celebrated annually in Lamu since the 19th century, draws tens of thousands of pilgrims for Quranic recitations and dhow races?",
        correct: "Maulidi Festival",
        w1: "Eid al-Adha",
        w2: "Lamu Cultural Festival",
        exp: "Centered around the historic Riyadha Mosque (founded by Habib Saleh in the late 19th century), the week-long festival includes traditional bao board game contests and donkey races."
      },
      {
        q: "What idyllic car-free village three kilometers south of Lamu Old Town along the Shela Channel is renowned for pristine sand dunes, restored Swahili villas, and sunset dhow cruises?",
        correct: "Shela Village",
        w1: "Matondoni",
        w2: "Kipungani",
        exp: "Shela features twelve kilometers of deserted white sand beaches, famous for its historic white 19th-century minaret mosque."
      }
    ],
    number: {
      q: "How many motorized passenger cars are permitted to drive through the historic narrow streets of Lamu Old Town?",
      target: 0,
      unit: "cars",
      imperial: "0 cars (strictly car-free island)",
      exp: "Lamu Old Town is completely car-free, with zero private motor vehicles permitted in its narrow stone alleys (only a medical ambulance and administrative tractor exist on the island)."
    }
  },

  // Cycle 8: Tsavo National Parks & Red Elephants
  {
    mcqs: [
      {
        q: "What massive protected conservation complex, divided by the Nairobi-Mombasa highway and railway into East and West, is the largest national park in Kenya, covering nearly 22,000 square kilometers?",
        correct: "Tsavo National Park Tsavo East and Tsavo West",
        w1: "Maasai Mara",
        w2: "Aberdare National Park",
        exp: "Tsavo covers four percent of Kenya total land area, larger than the nation of Israel or the US state of New Jersey."
      },
      {
        q: "Why do the famous wild African elephants of Tsavo East National Park appear to have a distinctive, glowing red-colored skin?",
        correct: "They dust-bathe in the fine, iron-rich volcanic red soils of the park",
        w1: "Natural genetic red skin pigment",
        w2: "Algae blooms in watering holes",
        exp: "Elephants spray fine red dust over their wet skin after bathing to protect against intense equatorial sunshine and biting insects."
      },
      {
        q: "What legendary pair of maneless male lions killed and devoured over thirty-five Indian railway construction workers along the Tsavo River in 1898 before being shot by Lt. Col. John Henry Patterson?",
        correct: "The Man-Eaters of Tsavo",
        w1: "The Ghost and the Darkness",
        w2: "The Lions of Njaro",
        exp: "Their mounted skins are preserved at the Field Museum of Natural History in Chicago, chronicled in the Hollywood film The Ghost and the Darkness."
      },
      {
        q: "What lush oasis in Tsavo West National Park gushes fifty million gallons of crystal-clear spring water daily from the Chyulu Hills, featuring an underwater glass viewing chamber to observe hippos?",
        correct: "Mzima Springs",
        w1: "Lugard Falls",
        w2: "Aruba Dam",
        exp: "Filtered through porous volcanic ash, the clear pools allow visitors to watch hippos gracefully 'walking' on the riverbed among shoals of barbel fish."
      },
      {
        q: "What massive 1.6-kilometer-long natural red inselberg rock whaleback in Tsavo East acts as a natural water catchment feeding a dam where hundreds of elephants gather during dry seasons?",
        correct: "Mudanda Rock",
        w1: "Yatta Plateau",
        w2: "Roaring Rocks",
        exp: "Visitors can climb to the top of Mudanda Rock on foot to watch hundreds of elephants, buffaloes, and oryx drinking at the waterhole below."
      }
    ],
    number: {
      q: "What is the approximate total combined area in thousands of square kilometers of the Tsavo National Parks (Tsavo East and Tsavo West)?",
      target: 22,
      unit: "thousand square kilometers",
      imperial: "8,400 square miles",
      exp: "Tsavo East (13,747 sq km) and Tsavo West (9,065 sq km) combine to cover approximately 22,812 square kilometers (rounded to 22k sq km)."
    }
  },

  // Cycle 9: Kenyan Athletics, Tea & Agriculture
  {
    mcqs: [
      {
        q: "Which high-altitude town at 2,400 meters in Elgeyo-Marakwet County is internationally renowned as the Home of Champions, producing dozens of Olympic and World Champion distance runners?",
        correct: "Iten",
        w1: "Eldoret",
        w2: "Kapsabet",
        exp: "Elite athletes worldwide travel to train in Iten high-altitude thin air and red-clay dirt roads alongside local Kalenjin runners."
      },
      {
        q: "Which legendary Kenyan marathon runner won back-to-back Olympic gold medals (2016, 2020) and became the first human in history to run a marathon in under two hours (1:59:40 in Vienna in 2019)?",
        correct: "Eliud Kipchoge",
        w1: "Kelvin Kiptum",
        w2: "Paul Tergat",
        exp: "Kipchoge motto 'No human is limited' inspired millions, training at the Kaptagat camp in the Great Rift Valley."
      },
      {
        q: "What agricultural crop, cultivated on vast lush green highland estates in Kericho and Nandi Hills, makes Kenya the world largest exporter of black tea?",
        correct: "Black Tea Camellia sinensis",
        w1: "Coffee",
        w2: "Pyrethrum",
        exp: "Hand-picked throughout the year on volcanic highland soils with abundant rainfall, Kenyan tea is prized for its bright amber color, rich aroma, and brisk flavor."
      },
      {
        q: "What cut flower variety, cultivated in immense modern computerized greenhouse farms around Lake Naivasha, accounts for over thirty percent of all cut flowers sold in the European Union?",
        correct: "Roses Cut Roses",
        w1: "Tulips",
        w2: "Orchids",
        exp: "Transported via temperature-controlled air freight from Nairobi Jomo Kenyatta Airport to the flower auctions of the Netherlands within twenty-four hours of cutting."
      },
      {
        q: "What revolutionary mobile phone-based money transfer, financing, and microfinancing service, launched in Kenya in 2007 by Safaricom, transformed financial inclusion across the developing world?",
        correct: "M-Pesa M-PESA",
        w1: "Airtel Money",
        w2: "T-Kash",
        exp: "Allowing users to deposit, send, and withdraw cash using basic SMS text messaging without a bank account, M-Pesa processes over half of Kenya total GDP annually."
      }
    ],
    number: {
      q: "In what year was the revolutionary mobile money transfer service M-Pesa first launched in Kenya by Safaricom?",
      target: 2007,
      unit: "year",
      imperial: "2007 AD",
      exp: "M-Pesa was pioneered in Kenya in March 2007, becoming the world's most successful mobile financial platform."
    }
  },

  // Cycle 10: Extent, 47 Counties & Kenyan Superlatives
  {
    mcqs: [
      {
        q: "Into how many devolved administrative counties (such as Nairobi, Mombasa, Kiambu, Turkana, Nakuru, and Kisumu) is the Republic of Kenya politically divided under the 2010 Constitution?",
        correct: "47 Counties",
        w1: "35 Counties",
        w2: "52 Counties",
        exp: "The 2010 Constitution abolished the eight historic colonial provinces, creating forty-seven semi-autonomous counties led by elected governors."
      },
      {
        q: "What is the largest administrative county in Kenya by geographical land area, covering over 68,000 square kilometers of arid northern plains?",
        correct: "Turkana County",
        w1: "Marsabit County",
        w2: "Garissa County",
        exp: "Turkana borders South Sudan, Uganda, and Ethiopia, home to the pastoralist Turkana people and major oil discoveries in the South Lokichar Basin."
      },
      {
        q: "What massive 68,800-square-kilometer tropical lake, the largest lake in Africa and source of the White Nile, is shared between Kenya, Uganda, and Tanzania?",
        correct: "Lake Victoria Victoria Nyanza",
        w1: "Lake Tanganyika",
        w2: "Lake Malawi",
        exp: "Kenya port city of Kisumu sits on the shores of Winam Gulf, supporting commercial Nile perch (mbuta) fisheries and ferry commerce."
      },
      {
        q: "What are the two official national languages of the Republic of Kenya, uniting over forty distinct indigenous ethnolinguistic groups?",
        correct: "Swahili Kiswahili and English",
        w1: "English and Kikuyu",
        w2: "Swahili and Arabic",
        exp: "Swahili serves as the national unifying lingua franca (with popular urban slang Sheng), while English is used in government, legal courts, and higher education."
      },
      {
        q: "What modern 472-kilometer standard-gauge railway line, completed in 2017, connects the port city of Mombasa to the capital city of Nairobi in under five hours?",
        correct: "The Madaraka Express SGR",
        w1: "The Lunatic Express",
        w2: "The Rift Valley Railway",
        exp: "Built on elevated viaducts through Tsavo National Park allowing wildlife to pass safely underneath, it replaced the historic 19th-century colonial railway line."
      }
    ],
    number: {
      q: "How many administrative counties make up the devolved governance structure of the Republic of Kenya?",
      target: 47,
      unit: "counties",
      imperial: "47 counties",
      exp: "Kenya is structured into forty-seven official counties, with county governments responsible for local infrastructure, healthcare, and agriculture."
    }
  }
];

// Build Kenya Quiz
buildQuiz({
  id: 'kenya-geography-heritage-60',
  theme: 'Kenya: Geography, Safari Wilderness & The Great Rift Valley',
  title: 'Kenya: Geography, Safari Wilderness & The Great Rift Valley',
  description: 'A 60-question grand master assessment exploring the Great Rift Valley, Mount Kenya (5,199 m), the Maasai Mara Great Migration (1.5M animals), Lake Nakuru & Turkana, Amboseli elephants (1972), Nairobi National Park (7 km), Fort Jesus (1593), and M-Pesa (2007).',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, kenyaCycles);

console.log('Kenya quiz built successfully!');
