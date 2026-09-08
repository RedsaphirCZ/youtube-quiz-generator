const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 4. australia-geography-heritage-60
// =========================================================================
const australiaCycles = [
  // Cycle 1: The Great Barrier Reef & Coral Seas
  {
    mcqs: [
      {
        q: "What is the largest living coral reef system on Earth, stretching for over 2,300 kilometers off the northeastern coast of Queensland?",
        correct: "Great Barrier Reef",
        w1: "Ningaloo Reef",
        w2: "Lord Howe Reef",
        exp: "The Great Barrier Reef comprises nearly 3,000 individual reefs and 900 islands, visible from space and home to 1,500 species of marine fish."
      },
      {
        q: "Which coastal Queensland city is the primary international tourism gateway to the northern Great Barrier Reef and Daintree Rainforest?",
        correct: "Cairns",
        w1: "Townsville",
        w2: "Mackay",
        exp: "Cairns provides high-speed catamaran access to outer reef pontoons and the scenic Kuranda Scenic Railway into tropical tablelands."
      },
      {
        q: "What marine threat occurs when prolonged elevated sea temperatures cause coral polyps to expel their symbiotic photosynthetic zooxanthellae algae?",
        correct: "Coral Bleaching",
        w1: "Crown-of-Thorns Predation",
        w2: "Reef Acidification",
        exp: "Without zooxanthellae to provide food and vibrant coloration, the transparent coral tissue exposes the white calcium carbonate skeleton beneath."
      },
      {
        q: "Which large predatory sea star feeds voraciously on living coral polyps, causing periodic destructive population outbreaks on the reef?",
        correct: "Crown-of-Thorns Starfish",
        w1: "Blue Sea Star",
        w2: "Chocolate Chip Star",
        exp: "Acanthaster planci can consume up to ten square meters of living coral tissue per year, controlled by conservation culling teams."
      },
      {
        q: "Which marginal sea of the South Pacific Ocean lies between the northeastern coast of Australia, Papua New Guinea, and the Solomon Islands?",
        correct: "Coral Sea",
        w1: "Tasman Sea",
        w2: "Arafura Sea",
        exp: "The Coral Sea was the site of the historic May 1942 naval battle, the first in history where opposing aircraft carriers fought without visual surface contact."
      }
    ],
    number: {
      q: "What is the approximate total length in kilometers of the Great Barrier Reef system along the Queensland coast?",
      target: 2300,
      unit: "kilometers",
      imperial: "1,429 miles",
      exp: "The Great Barrier Reef stretches roughly 2,300 kilometers along Australia northeastern continental shelf."
    }
  },

  // Cycle 2: The Red Centre, Uluru & The Outback
  {
    mcqs: [
      {
        q: "What colossal sacred sandstone inselberg monolith in the Red Centre of the Northern Territory rises 348 meters above the desert plain?",
        correct: "Uluru Ayers Rock",
        w1: "Kata Tjuta",
        w2: "Mount Augustus",
        exp: "Uluru is an arkose sandstone formation sacred to the indigenous Anangu people, glowing radiant crimson at sunset due to iron mineral oxidation."
      },
      {
        q: "What group of thirty-six rounded domed rock formations located twenty-five kilometers west of Uluru means 'many heads' in the local Pitjantjatjara language?",
        correct: "Kata Tjuta The Olgas",
        w1: "Bungle Bungles",
        w2: "Devils Marbles",
        exp: "Kata Tjuta consists of coarse sedimentary conglomerate and granite boulders rising up to 546 meters above the desert floor at Mount Olga."
      },
      {
        q: "Which famous town serves as the primary regional transport and tourism hub of the Australian Red Centre, located midway between Darwin and Adelaide?",
        correct: "Alice Springs",
        w1: "Tennant Creek",
        w2: "Katherine",
        exp: "Alice Springs developed around the historic 1872 Australian Overland Telegraph Line repeater station near the gap in the MacDonnell Ranges."
      },
      {
        q: "What dramatic canyon in Watarrka National Park, southwest of Alice Springs, features vertical 100-meter sandstone canyon walls and the lush Garden of Eden waterhole?",
        correct: "Kings Canyon",
        w1: "Standley Chasm",
        w2: "Ormiston Gorge",
        exp: "The Kings Canyon Rim Walk traverses weathered honeycomb sandstone domes dubbed the Lost City before descending into a protected cycad oasis."
      },
      {
        q: "What spiky, dome-forming perennial grass species covers extensive desert sand dunes and stony plains across the Australian Outback?",
        correct: "Spinifex Triodia",
        w1: "Mitchell Grass",
        w2: "Kangaroo Grass",
        exp: "Spinifex produces flammable resin-coated needles that resist extreme heat and drought, binding sand dunes across seventy percent of the continent."
      }
    ],
    number: {
      q: "What is the height in meters of Uluru (Ayers Rock) above the surrounding flat desert plain?",
      target: 348,
      unit: "meters",
      imperial: "1,142 feet",
      exp: "Uluru rises 348 meters above the surrounding arid plain, with a summit elevation of 863 meters above sea level."
    }
  },

  // Cycle 3: The Great Dividing Range & Australian Alps
  {
    mcqs: [
      {
        q: "What is the highest mountain peak on the Australian mainland, rising 2,228 meters in the Snowy Mountains of New South Wales?",
        correct: "Mount Kosciuszko",
        w1: "Mount Bogong",
        w2: "Mount Townsend",
        exp: "Polish explorer Paweł Edmund Strzelecki named the peak in 1840 after Polish democratic hero General Tadeusz Kościuszko due to its resemblance to the mound in Kraków."
      },
      {
        q: "What massive 3,500-kilometer mountain system extends along the entire eastern coastline of Australia from Cape York down to Victoria?",
        correct: "Great Dividing Range",
        w1: "Flinders Ranges",
        w2: "Darling Range",
        exp: "The Great Dividing Range separates coastal drainage river systems flowing into the Pacific Ocean from the interior Murray-Darling River basin."
      },
      {
        q: "What world-famous coastal highway in Victoria winds 243 kilometers along the rugged Southern Ocean coast past the limestone Twelve Apostles sea stacks?",
        correct: "Great Ocean Road",
        w1: "Captain Cook Highway",
        w2: "Stuart Highway",
        exp: "Built by returned soldiers between 1919 and 1932, the Great Ocean Road is the world largest war memorial, carved through coastal cliffs."
      },
      {
        q: "Why do the Blue Mountains west of Sydney exhibit their distinctive blue atmospheric haze when viewed from distance?",
        correct: "Refraction through volatile eucalyptus oil droplets",
        w1: "Natural blue limestone dust in the wind",
        w2: "Reflections from underground copper deposits",
        exp: "Vast eucalyptus forests release volatile terpene oil droplets into the atmosphere that scatter blue wavelengths of sunlight (Rayleigh scattering)."
      },
      {
        q: "What massive post-war engineering scheme in the Snowy Mountains diverted alpine river waters through tunnels to generate hydroelectricity and irrigate the Murray Basin?",
        correct: "Snowy Mountains Scheme",
        w1: "Ord River Scheme",
        w2: "Burdekin Dam Project",
        exp: "Constructed between 1949 and 1974 by over 100,000 migrant workers from thirty nations, it encompasses sixteen dams and 145 kilometers of trans-mountain tunnels."
      }
    ],
    number: {
      q: "What is the summit elevation in meters of Mount Kosciuszko, the highest peak on the Australian mainland?",
      target: 2228,
      unit: "meters",
      imperial: "7,310 feet",
      exp: "Mount Kosciuszko stands at 2,228 meters above sea level in Kosciuszko National Park in the Snowy Mountains."
    }
  },

  // Cycle 4: Major Cities & Coastal Gateways
  {
    mcqs: [
      {
        q: "Which Danish architect designed the iconic Sydney Opera House with its interlocking sail-like precast concrete roof shells, opening in 1973?",
        correct: "Jørn Utzon",
        w1: "Eero Saarinen",
        w2: "Norman Foster",
        exp: "Utzon won an international design competition in 1957, solving the roof geometry through spherical cut segments covered with over one million Swedish ceramic tiles."
      },
      {
        q: "What is the capital city of Australia, selected in 1908 as a purpose-built compromise capital located between rival cities Sydney and Melbourne?",
        correct: "Canberra",
        w1: "Adelaide",
        w2: "Brisbane",
        exp: "Canberra was planned by American architects Walter Burley Griffin and Marion Mahony Griffin around an artificial central lake (Lake Burley Griffin)."
      },
      {
        q: "Which state capital in Western Australia on the Swan River is often recognized as one of the most geographically isolated major metropolitan cities on Earth?",
        correct: "Perth",
        w1: "Adelaide",
        w2: "Darwin",
        exp: "Perth is closer to Jakarta, Indonesia, than to the Australian national capital Canberra, bounded by the Indian Ocean to the west and the Nullarbor desert to the east."
      },
      {
        q: "Which Victorian capital city on Port Phillip Bay is famous for its labyrinth of cobblestone street art laneways, historic trams, and coffee culture?",
        correct: "Melbourne",
        w1: "Sydney",
        w2: "Hobart",
        exp: "Founded on the Yarra River in 1835, Melbourne grew into one of the world wealthiest cities during the Victorian Gold Rush of the 1850s."
      },
      {
        q: "Which planned capital city of South Australia was designed on a grid layout surrounded entirely by a continuous green belt of municipal parklands by Colonel William Light?",
        correct: "Adelaide",
        w1: "Perth",
        w2: "Brisbane",
        exp: "Known as the City of Churches and Festival City, Adelaide was founded in 1836 as a planned colony for free British settlers without convict transportation."
      }
    ],
    number: {
      q: "In what year was the Sydney Opera House officially opened to the public by Queen Elizabeth II?",
      target: 1973,
      unit: "year",
      imperial: "1973 AD",
      exp: "Queen Elizabeth II opened the Sydney Opera House on October 20, 1973, following sixteen years of groundbreaking architectural engineering."
    }
  },

  // Cycle 5: Tasmania, Bass Strait & Southern Wilderness
  {
    mcqs: [
      {
        q: "What shallow, stormy body of water separates the island state of Tasmania from the southeastern Australian mainland of Victoria?",
        correct: "Bass Strait",
        w1: "Torres Strait",
        w2: "Cook Strait",
        exp: "Named after explorer George Bass who circumnavigated Tasmania with Matthew Flinders in 1798, Bass Strait averages only sixty meters in depth."
      },
      {
        q: "Which carnivorous marsupial endemic to Tasmania has been severely threatened by a contagious transmissible cancer called Devil Facial Tumor Disease?",
        correct: "Tasmanian Devil",
        w1: "Thylacine Tasmanian Tiger",
        w2: "Quoll",
        exp: "Sarcophilus harrisii possesses the strongest bite force relative to body mass of any living mammalian carnivore, feeding on carrion and bones."
      },
      {
        q: "What iconic, jagged dolerite mountain peak in the Tasmanian Wilderness World Heritage Area towers over the glacially carved Dove Lake?",
        correct: "Cradle Mountain",
        w1: "Mount Wellington",
        w2: "Barn Bluff",
        exp: "Cradle Mountain is the northern trailhead of the legendary 65-kilometer Overland Track traversing alpine button grass plains and ancient rainforests."
      },
      {
        q: "What is the capital city of Tasmania, nestled at the foot of Mount Wellington on the deep-water estuary of the Derwent River?",
        correct: "Hobart",
        w1: "Launceston",
        w2: "Devonport",
        exp: "Founded in 1804 as a penal colony, Hobart is Australia second oldest capital city, home to the historic Salamanca Market and the avant-garde MONA museum."
      },
      {
        q: "Which ancient, slow-growing conifer endemic to the temperate rainforests of western Tasmania can live for over 3,000 years, producing rot-resistant golden timber?",
        correct: "Huon Pine Lagarostrobos franklinii",
        w1: "Kauri Pine",
        w2: "Bunya Pine",
        exp: "Huon pine contains natural aromatic methyl eugenol oils that prevent rot and marine borers, making it prized by 19th-century convict shipwrights."
      }
    ],
    number: {
      q: "What is the approximate average width in kilometers of the Bass Strait separating Victoria and Tasmania?",
      target: 240,
      unit: "kilometers",
      imperial: "150 miles",
      exp: "Bass Strait is approximately 240 kilometers wide and 500 kilometers long between the southern mainland and northern Tasmania."
    }
  },

  // Cycle 6: The Murray-Darling River Basin & Hydrology
  {
    mcqs: [
      {
        q: "What is the longest river in Australia, flowing 2,508 kilometers from the Australian Alps to empty into Lake Alexandrina in South Australia?",
        correct: "Murray River",
        w1: "Darling River",
        w2: "Murrumbidgee River",
        exp: "The Murray River forms most of the border between New South Wales and Victoria, navigated in the 19th century by historic paddle steamers."
      },
      {
        q: "What massive river basin covering one million square kilometers across four states is recognized as Australia primary agricultural food bowl?",
        correct: "Murray-Darling Basin",
        w1: "Lake Eyre Basin",
        w2: "Fitzroy Basin",
        exp: "The Murray-Darling Basin produces more than a third of Australia national food supply, including citrus, rice, cotton, wine grapes, and dairy."
      },
      {
        q: "What is the lowest natural point in Australia, an immense endorheic salt lake in South Australia that sits fifteen meters below sea level?",
        correct: "Lake Eyre Kati Thanda",
        w1: "Lake Torrens",
        w2: "Lake Gairdner",
        exp: "Kati Thanda-Lake Eyre covers up to 9,500 square kilometers, filling completely only a few times per century when tropical monsoon floodwaters drain south."
      },
      {
        q: "What massive underground freshwater reservoir underlying roughly twenty-two percent of Australia is the largest and deepest artesian basin in the world?",
        correct: "Great Artesian Basin",
        w1: "Canning Basin",
        w2: "Perth Basin",
        exp: "The Great Artesian Basin holds an estimated 65,000 cubic kilometers of groundwater, tapped by thousands of pastoral boreholes to water Outback cattle."
      },
      {
        q: "Which major tributary of the Murray River flows 1,545 kilometers from the Great Dividing Range in Queensland across the Outback plains of New South Wales?",
        correct: "Darling River",
        w1: "Lachlan River",
        w2: "Warrego River",
        exp: "The Darling River joins the Murray at Wentworth, characterized by variable arid flow regimes and sacred Aboriginal fish traps at Brewarrina."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Murray River, the longest river in Australia?",
      target: 2508,
      unit: "kilometers",
      imperial: "1,558 miles",
      exp: "The Murray River flows for 2,508 kilometers from the Snowy Mountains to the Southern Ocean at Goolwa."
    }
  },

  // Cycle 7: Western Australia, Ningaloo Reef & The Kimberley
  {
    mcqs: [
      {
        q: "What UNESCO World Heritage 260-kilometer fringing coral reef in Western Australia allows visitors to swim with gentle giant whale sharks directly from the beach?",
        correct: "Ningaloo Reef",
        w1: "Great Barrier Reef",
        w2: "Rowley Shoals",
        exp: "Unlike the Great Barrier Reef which sits miles offshore, Ningaloo is a fringing reef accessible by wading directly from the white sand shoreline."
      },
      {
        q: "Which rugged tropical wilderness region in northern Western Australia features ancient sandstone gorges, the Bungle Bungle Range, and King George Falls?",
        correct: "The Kimberley",
        w1: "The Pilbara",
        w2: "The Gascoyne",
        exp: "Spanning over 420,000 square kilometers, the Kimberley is traversed by the 660-kilometer unpaved Gibb River Road through boab tree savannas."
      },
      {
        q: "What striking black-and-orange striped beehive-like sandstone karst domes are found in Purnululu National Park in the Kimberley?",
        correct: "Bungle Bungle Range",
        w1: "Devils Marbles",
        w2: "The Pinnacles",
        exp: "The alternating dark grey bands are caused by photosynthetic cyanobacteria growing on moist layers, while orange bands contain oxidized iron compounds."
      },
      {
        q: "What arid mineral-rich region in northwestern Western Australia contains some of the world largest and highest-grade iron ore deposits?",
        correct: "The Pilbara",
        w1: "The Goldfields",
        w2: "The Murchison",
        exp: "The Pilbara ancient 3.5-billion-year-old craton produces hundreds of millions of tons of iron ore mined in massive open pits and hauled by kilometer-long trains."
      },
      {
        q: "Which island near Perth is famous for hosting a thriving wild population of friendly, photogenic quokkas (short-tailed wallabies)?",
        correct: "Rottnest Island Wadjemup",
        w1: "Garden Island",
        w2: "Carnac Island",
        exp: "Dutch explorer Willem de Vlamingh named the island 'Rattennest' (Rat Nest) in 1696 after mistaking the smiling, friendly quokkas for giant rats."
      }
    ],
    number: {
      q: "What is the approximate total length in kilometers of the UNESCO-protected Ningaloo Coral Reef along the Western Australian coast?",
      target: 260,
      unit: "kilometers",
      imperial: "161 miles",
      exp: "Ningaloo Reef extends for 260 kilometers along the North West Cape of Western Australia, the longest fringing coral reef in the world."
    }
  },

  // Cycle 8: The Tropical North, Kakadu & Ancient Rainforests
  {
    mcqs: [
      {
        q: "What is the largest national park in Australia, renowned for 65,000 years of continuous Aboriginal rock art galleries, saltwater crocodiles, and billabongs?",
        correct: "Kakadu National Park",
        w1: "Litchfield National Park",
        w2: "Karijini National Park",
        exp: "Covering nearly 20,000 square kilometers in the Northern Territory, Kakadu is jointly managed with traditional Aboriginal owners, featuring sites like Ubirr and Nourlangie."
      },
      {
        q: "What ancient tropical rainforest in Far North Queensland is recognized as the oldest continuously surviving tropical rainforest on Earth at 180 million years?",
        correct: "Daintree Rainforest",
        w1: "Tarkine Forest",
        w2: "Gondwana Rainforests",
        exp: "The Daintree predates the Amazon rainforest by tens of millions of years, preserving primitive flowering plant families and the flightless southern cassowary."
      },
      {
        q: "Which capital city of the Northern Territory was nearly completely flattened on Christmas Eve 1974 by the catastrophic winds of Cyclone Tracy?",
        correct: "Darwin",
        w1: "Broome",
        w2: "Cairns",
        exp: "Cyclone Tracy destroyed over seventy percent of Darwin homes, leading to the largest civil evacuation and modern building code reconstruction in Australian history."
      },
      {
        q: "What large flightless rainforest bird endemic to the wet tropics of Queensland has a blue neck, a red wattle, and a protective bony helmet (casque)?",
        correct: "Southern Cassowary",
        w1: "Emu",
        w2: "Kookaburra",
        exp: "The southern cassowary is a vital keystone species that disperses the large seeds of over one hundred species of tropical rainforest trees."
      },
      {
        q: "What massive semi-enclosed shallow sea between northern Australia and New Guinea features the rare meteorological phenomenon of Morning Glory roll clouds?",
        correct: "Gulf of Carpentaria",
        w1: "Joseph Bonaparte Gulf",
        w2: "Spencer Gulf",
        exp: "During spring, solitary atmospheric wave clouds up to 1,000 kilometers long roll across the Gulf of Carpentaria near Burketown."
      }
    ],
    number: {
      q: "In what year did the devastating Category 4 Cyclone Tracy strike and flatten the city of Darwin on Christmas Eve?",
      target: 1974,
      unit: "year",
      imperial: "1974 AD",
      exp: "Cyclone Tracy tore through Darwin in the early hours of December 25, 1974, killing 66 people and destroying thousands of buildings."
    }
  },

  // Cycle 9: Deserts, Karst & The Nullarbor Plain
  {
    mcqs: [
      {
        q: "What vast, flat, arid limestone karst plateau spanning 200,000 square kilometers across southern Australia means 'no trees' in Latin?",
        correct: "Nullarbor Plain",
        w1: "Barkly Tableland",
        w2: "Cobar Plain",
        exp: "The Nullarbor sits atop ancient seafloor limestone, ending abruptly at the dramatic sixty-meter vertical Bunda Cliffs over the Great Australian Bight."
      },
      {
        q: "What world record does the Trans-Australian Railway hold as it crosses the flat limestone expanse of the Nullarbor Plain?",
        correct: "Longest straight stretch of railway track 478 kilometers",
        w1: "Highest railway viaduct",
        w2: "Fastest unpowered train line",
        exp: "The track runs completely straight without a single curve for 478 kilometers between Ooldea in South Australia and Loongana in Western Australia."
      },
      {
        q: "What is the largest desert in Australia, covering approximately 350,000 square kilometers across Western Australia and South Australia?",
        correct: "Great Victoria Desert",
        w1: "Great Sandy Desert",
        w2: "Simpson Desert",
        exp: "Explored by Ernest Giles in 1875, the Great Victoria Desert is characterized by red sand dunes, marble gum trees, and mulga shrublands."
      },
      {
        q: "Which desert spanning the borders of the Northern Territory, Queensland, and South Australia features the world longest parallel red sand dunes?",
        correct: "Simpson Desert",
        w1: "Tanami Desert",
        w2: "Gibson Desert",
        exp: "The Simpson Desert contains over 1,100 parallel sand dunes up to forty meters high, including the famous Big Red dune near Birdsville."
      },
      {
        q: "Which Outback desert town in South Australia is known as the Opal Capital of the World, where most residents live in underground dugouts to escape desert heat?",
        correct: "Coober Pedy",
        w1: "Lightning Ridge",
        w2: "White Cliffs",
        exp: "Named from the Aboriginal term kupa-piti (white man in a hole), Coober Pedy produces precious white opals and features underground homes, churches, and hotels."
      }
    ],
    number: {
      q: "What is the length in kilometers of the world longest straight stretch of railway track across the Nullarbor Plain?",
      target: 478,
      unit: "kilometers",
      imperial: "297 miles perfectly straight",
      exp: "The Trans-Australian Railway features a continuous, unbroken straight track spanning exactly 478 kilometers across the Nullarbor Plain."
    }
  },

  // Cycle 10: Australian Marsupials, Monotremes & Endemic Fauna
  {
    mcqs: [
      {
        q: "What unique group of egg-laying mammals (monotremes) is represented exclusively in Australia and New Guinea by the platypus and echidna?",
        correct: "Monotremata",
        w1: "Marsupialia",
        w2: "Placentalia",
        exp: "Monotremes lay leathery eggs and secrete milk onto their abdominal skin patches rather than nursing through nipples."
      },
      {
        q: "What is the largest living marsupial in the world, capable of bounding across the arid Outback at speeds exceeding fifty kilometers per hour?",
        correct: "Red Kangaroo Osphranter rufus",
        w1: "Eastern Grey Kangaroo",
        w2: "Western Grey Kangaroo",
        exp: "Male red kangaroos can stand nearly two meters tall and weigh over ninety kilograms, utilizing elastic tendons in their hind legs for energy-efficient hopping."
      },
      {
        q: "Which arboreal herbivorous marsupial feeds almost exclusively on toxic, fibrous eucalyptus leaves, sleeping up to twenty hours per day to conserve energy?",
        correct: "Koala Phascolarctos cinereus",
        w1: "Greater Glider",
        w2: "Brushtail Possum",
        exp: "Koalas possess a specialized two-meter-long cecum containing bacteria that detoxify eucalyptus oils and ferment cellulose."
      },
      {
        q: "What burrowing herbivorous marsupial is famous for producing unique cube-shaped feces to prevent droppings from rolling away from territorial rocks?",
        correct: "Wombat",
        w1: "Bandicoot",
        w2: "Bilby",
        exp: "Wombats have backward-facing pouches so dirt does not fill the pouch while burrowing, and hardened cartilage rear shields to crush pursuing predators against tunnel roofs."
      },
      {
        q: "Which dog-like apex predator was introduced to Australia roughly 4,000 years ago, separated from domestic dog lineages by the Dingo Fence?",
        correct: "Dingo Canis dingo",
        w1: "Tasmanian Tiger",
        w2: "Quoll",
        exp: "The 5,614-kilometer Dingo Fence was built in the 1880s to keep dingoes out of fertile sheep-grazing pastures in southeastern Australia."
      }
    ],
    number: {
      q: "What is the approximate total length in kilometers of the historic Australian Dingo Fence, the longest fence in the world?",
      target: 5614,
      unit: "kilometers",
      imperial: "3,488 miles",
      exp: "The Dingo Fence stretches for 5,614 kilometers from the Darling Downs in Queensland through New South Wales to the cliffs of the Nullarbor in South Australia."
    }
  }
];

// Build Australia Quiz
buildQuiz({
  id: 'australia-geography-heritage-60',
  theme: 'Australia: Geography, Outback & Wildlife Heritage',
  title: 'Australia: Geography, Outback & Wildlife Heritage',
  description: 'A 60-question grand master assessment exploring the Great Barrier Reef, Uluru, the Great Dividing Range, Sydney & Melbourne, Tasmania, the Murray-Darling basin, Ningaloo Reef, Kakadu, the Nullarbor, and endemic marsupials.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, australiaCycles);

console.log('Australia quiz built successfully!');
