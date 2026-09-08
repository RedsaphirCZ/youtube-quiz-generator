const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 4. new-zealand-geography-heritage-60
// =========================================================================
const nzCycles = [
  // Cycle 1: North & South Islands & The Southern Alps
  {
    mcqs: [
      {
        q: "What 22-kilometer body of water separates the North Island and South Island of New Zealand, connecting the Tasman Sea to the South Pacific Ocean?",
        correct: "Cook Strait",
        w1: "Foveaux Strait",
        w2: "Bass Strait",
        exp: "Named after British navigator Captain James Cook who sailed through it in 1770, Cook Strait is known for powerful tidal currents and inter-island ferry crossings."
      },
      {
        q: "What is the highest mountain peak in New Zealand, rising 3,724 meters in the Southern Alps of the South Island?",
        correct: "Aoraki Mount Cook",
        w1: "Mount Tasman",
        w2: "Mount Aspiring",
        exp: "Sacred to the South Island Ngāi Tahu iwi, Aoraki was the training ground where Sir Edmund Hillary developed his high-altitude mountaineering skills."
      },
      {
        q: "What massive 500-kilometer mountain spine dominates the South Island, formed by the active tectonic collision along the Alpine Fault?",
        correct: "The Southern Alps Kā Tiritiri o te Moana",
        w1: "Kaweka Range",
        w2: "Tararua Range",
        exp: "The Southern Alps contain over three thousand glaciers and twenty-four peaks exceeding 3,000 meters, creating a dramatic rain shadow on the Canterbury Plains."
      },
      {
        q: "What stunning alpine lake in the Mackenzie Basin is world-famous for its luminous turquoise-blue color caused by finely ground glacial rock flour?",
        correct: "Lake Pukaki",
        w1: "Lake Tekapo",
        w2: "Lake Wakatipu",
        exp: "Fed by the Tasman River from the Hooker and Tasman glaciers, Lake Pukaki offers postcard views framing the snow-capped peak of Aoraki Mount Cook."
      },
      {
        q: "What iconic pyramid-shaped mountain in Mount Aspiring National Park at 3,033 meters is nicknamed the Matterhorn of the South?",
        correct: "Mount Aspiring Tititea",
        w1: "Mount Tutoko",
        w2: "Mount Sefton",
        exp: "Known in Māori as Tititea (Glistening Peak), Mount Aspiring is one of the most climbed alpine peaks in New Zealand, rising above the Matukituki Valley."
      }
    ],
    number: {
      q: "What is the surveyed summit elevation in meters above sea level of Aoraki Mount Cook in New Zealand?",
      target: 3724,
      unit: "meters",
      imperial: "12,218 feet",
      exp: "Following a massive 1991 rock avalanche that removed ten meters of rock, Aoraki Mount Cook stands at an official elevation of 3,724 meters."
    }
  },

  // Cycle 2: Fiordland & Milford Sound
  {
    mcqs: [
      {
        q: "Which spectacular 15-kilometer fjord in the southwest of the South Island was famously described by British author Rudyard Kipling as the Eighth Wonder of the World?",
        correct: "Milford Sound Piopiotahi",
        w1: "Doubtful Sound",
        w2: "Dusky Sound",
        exp: "Milford Sound features sheer vertical rock walls rising 1,200 meters from dark waters, carved by massive glaciers and drenched in seven meters of rain annually."
      },
      {
        q: "What iconic 1,692-meter pyramidal mountain peak rises almost vertically straight out of the waters of Milford Sound, forming its most famous silhouette?",
        correct: "Mitre Peak Rahotu",
        w1: "The Lion",
        w2: "The Elephant",
        exp: "Mitre Peak was named by Captain John Lort Stokes of HMS Acheron for its resemblance to a Christian bishop mitre hat."
      },
      {
        q: "What is the tallest waterfall in New Zealand, dropping 580 meters in three cascading leaps from Lake Quill in Fiordland National Park?",
        correct: "Sutherland Falls",
        w1: "Stirling Falls",
        w2: "Bowen Falls",
        exp: "Discovered by Scottish prospector Donald Sutherland in 1880, the falls are a highlight along the world-renowned 53-kilometer Milford Track hiking route."
      },
      {
        q: "What massive, deep fjord in Fiordland, three times longer and with a surface area ten times larger than Milford Sound, was named by Captain Cook in 1770?",
        correct: "Doubtful Sound Patea",
        w1: "Breaksea Sound",
        w2: "George Sound",
        exp: "Cook named it Doubtful Harbour because he doubted whether his sailing ship Endeavour could navigate back out through the narrow entrance against prevailing winds."
      },
      {
        q: "What rare, endemic marine black coral species grows abundantly at unusually shallow depths of ten meters in Fiordland due to a dark, tannin-stained freshwater surface layer?",
        correct: "Antipathella fiordensis",
        w1: "Tubipora musica",
        w2: "Corallium rubrum",
        exp: "Heavy mountain runoff creates a dark tea-colored freshwater surface layer that filters out sunlight, tricking deep-sea black coral into thriving near the surface."
      }
    ],
    number: {
      q: "What is the summit elevation in meters of Mitre Peak, rising directly from the sea floor of Milford Sound?",
      target: 1692,
      unit: "meters",
      imperial: "5,551 feet direct sea-to-summit rise",
      exp: "Mitre Peak rises 1,692 meters directly out of Milford Sound, one of the highest sheer sea cliff ascents on Earth."
    }
  },

  // Cycle 3: Geothermal Wonders: Rotorua & Lake Taupo
  {
    mcqs: [
      {
        q: "What is the largest lake in New Zealand, a massive 616-square-kilometer freshwater lake occupying the caldera of a colossal dormant supervolcano?",
        correct: "Lake Taupo Taupō-nui-a-Tia",
        w1: "Lake Rotorua",
        w2: "Lake Wakatipu",
        exp: "Lake Taupo super-eruption around 230 CE (the Hatepe eruption) was the most violent volcanic eruption on Earth in the past 5,000 years, ejecting 120 cubic kilometers of pumice."
      },
      {
        q: "Which city in the central North Island is internationally famous for intense geothermal activity, natural boiling mud pools, geysers, and traditional Te Arawa Māori culture?",
        correct: "Rotorua",
        w1: "Taupo",
        w2: "Palmerston North",
        exp: "Rotorua is known as Sulfur City for the scent of hydrogen sulfide gas emitted from geothermal vents at Whakarewarewa and Kuirau Park."
      },
      {
        q: "What famous, colorful geothermal feature at Wai-O-Tapu thermal wonderland is renowned for its 65-meter bubbling pool bordered by brilliant orange antimony-rich margins?",
        correct: "Champagne Pool",
        w1: "Devil Bath",
        w2: "Artist Palette",
        exp: "Formed 900 years ago by a hydrothermal eruption, the Champagne Pool maintains a constant temperature of 74°C, releasing constant effervescent carbon dioxide bubbles."
      },
      {
        q: "Which active conical stratovolcano in Tongariro National Park famously served as the cinematic stand-in for Mount Doom in Peter Jackson The Lord of the Rings film trilogy?",
        correct: "Mount Ngauruhoe",
        w1: "Mount Ruapehu",
        w2: "Mount Tongariro",
        exp: "Ngauruhoe rises 2,291 meters as a secondary volcanic cone of the Tongariro complex, first erupting roughly 2,500 years ago."
      },
      {
        q: "What is the highest mountain peak on the North Island of New Zealand, an active stratovolcano rising 2,797 meters with a warm, acidic crater lake at its summit?",
        correct: "Mount Ruapehu",
        w1: "Mount Taranaki",
        w2: "Mount Ngauruhoe",
        exp: "Ruapehu is the largest active volcano in New Zealand and home to the North Island only commercial ski fields (Whakapapa and Tūroa)."
      }
    ],
    number: {
      q: "In approximately what year CE did the catastrophic Hatepe super-eruption of the Taupo volcano take place in New Zealand?",
      target: 230,
      unit: "CE",
      imperial: "230 AD",
      exp: "Radiocarbon tree-ring dating places the colossal Taupo Hatepe eruption around 230-232 CE, turning skies red across ancient Rome and Han Dynasty China."
    }
  },

  // Cycle 4: Major Cities & Adventure Tourism
  {
    mcqs: [
      {
        q: "What is the national capital of New Zealand, holding the distinction of being the southernmost national capital city in the world at 41 degrees South latitude?",
        correct: "Wellington Te Whanganui-a-Tara",
        w1: "Auckland",
        w2: "Christchurch",
        exp: "Known as Windy Wellington for gale-force winds channeled through Cook Strait, the city houses the distinctive Beehive executive parliament building and Te Papa museum."
      },
      {
        q: "What is the largest city in New Zealand by population, built across fifty-three dormant volcanic cones between the Waitematā and Manukau harbors, nicknamed the City of Sails?",
        correct: "Auckland Tāmaki Makaurau",
        w1: "Wellington",
        w2: "Hamilton",
        exp: "Home to 1.7 million people (one-third of New Zealand population), Auckland is dominated by the 328-meter Sky Tower and volcanic cones like Mount Eden (Maungawhau)."
      },
      {
        q: "Which resort town in Otago on the shores of Lake Wakatipu is internationally recognized as the Adventure Tourism Capital of the World?",
        correct: "Queenstown",
        w1: "Wanaka",
        w2: "Te Anau",
        exp: "Queenstown pioneered commercial bungee jumping, jet boating through the narrow Shotover River canyons, skydiving, and skiing in the Remarkables."
      },
      {
        q: "On which historic suspension bridge near Queenstown did entrepreneur A.J. Hackett launch the world first permanent commercial bungee jumping operation in 1988?",
        correct: "Kawarau Gorge Suspension Bridge",
        w1: "Nevis Highwire Bridge",
        w2: "Edith Cavell Bridge",
        exp: "Hackett jumped forty-three meters over the turquoise Kawarau River using latex rubber cords inspired by the land-diving rituals of Vanuatu."
      },
      {
        q: "Which residential street in the city of Dunedin holds the Guinness World Record for the steepest residential street in the world, with a maximum gradient of 34.8 percent?",
        correct: "Baldwin Street",
        w1: "Lombard Street",
        w2: "Vale Street",
        exp: "Paved in concrete rather than asphalt to prevent tar from melting and sliding down the hill in summer, Baldwin Street hosts an annual charity Cadbury Jaffa roll."
      }
    ],
    number: {
      q: "In what year was the world first permanent commercial bungee jumping business opened at the Kawarau Bridge in Queenstown?",
      target: 1988,
      unit: "year",
      imperial: "1988 AD",
      exp: "AJ Hackett Bungy began commercial operations at the historic Kawarau Gorge Suspension Bridge on November 12, 1988."
    }
  },

  // Cycle 5: Māori Culture & The Treaty of Waitangi
  {
    mcqs: [
      {
        q: "What founding constitutional document of modern New Zealand was signed on February 6, 1840, between representatives of the British Crown and over five hundred Māori chiefs?",
        correct: "Treaty of Waitangi Te Tiriti o Waitangi",
        w1: "Declaration of Independence",
        w2: "Constitution Act",
        exp: "Signed at the Treaty Grounds in the Bay of Islands, differing translations of 'sovereignty' (kāwanatanga vs tino rangatiratanga) remain a cornerstone of national jurisprudence."
      },
      {
        q: "What traditional Māori ceremonial war dance, characterized by vigorous foot-stamping, chest-slapping, and rhythmic tongue protrusion, is performed by the All Blacks rugby team?",
        correct: "The Haka",
        w1: "The Waiata",
        w2: "The Poi",
        exp: "The All Blacks perform Ka Mate (composed around 1820 by Ngāti Toa chief Te Rauparaha) and Kapa o Pango before international rugby test matches."
      },
      {
        q: "What highly prized green nephrite jade mineral found only in riverbeds on the South Island (Te Wai Pounamu) is carved into sacred hei-tiki pendants and heirloom weapons?",
        correct: "Pounamu Greenstone",
        w1: "Obsidian",
        w2: "Serpentine",
        exp: "Pounamu is considered tapu (sacred) in Māori tradition, carrying the mana (spiritual power) of its ancestors and gifted rather than purchased for oneself."
      },
      {
        q: "What is the traditional Māori communal meeting ground complex called, centered around a carved ancestral meeting house (Wharenui)?",
        correct: "Marae",
        w1: "Pa",
        w2: "Hangi",
        exp: "The wharenui represents the physical body of an ancestor, with the carved tekoteko figure on the roof, the maihi bargeboards as arms, and the tāhū ridge beam as the spine."
      },
      {
        q: "What traditional Māori earth-oven cooking method involves placing baskets of meat, kumara (sweet potato), and root vegetables over volcanic stones heated in a pit?",
        correct: "Hāngī",
        w1: "Lovo",
        w2: "Imu",
        exp: "Covered with wet burlap sacks and mounds of earth, the food slow-steams for three to four hours, imparting a distinct smoky, earthy flavor."
      }
    ],
    number: {
      q: "In what historic year was the Treaty of Waitangi (Te Tiriti o Waitangi) signed in the Bay of Islands, New Zealand?",
      target: 1840,
      unit: "year",
      imperial: "1840 AD",
      exp: "The Treaty of Waitangi was first signed on February 6, 1840, now commemorated annually as New Zealand national holiday, Waitangi Day."
    }
  },

  // Cycle 6: Endemic Wildlife & Flightless Birds
  {
    mcqs: [
      {
        q: "What iconic, nocturnal flightless bird with hair-like feathers, vestigial wings, and nostrils at the tip of its long bill is the national symbol of New Zealand?",
        correct: "The Kiwi Apteryx",
        w1: "The Kakapo",
        w2: "The Weka",
        exp: "Kiwi lay colossal eggs that weigh up to twenty percent of the female body weight (the largest egg-to-body ratio of any bird in the world)."
      },
      {
        q: "What critically endangered, heavy flightless green parrot, the only nocturnal and lek-breeding parrot on Earth, is protected on predator-free offshore islands?",
        correct: "Kākāpō Strigops habroptilus",
        w1: "Kākā",
        w2: "Kea",
        exp: "Kākāpō freeze when threatened and emit a sweet herbal fragrance, saved from extinction by intensive conservation efforts with roughly 250 individuals alive today."
      },
      {
        q: "What inquisitive, olive-green parrot native to the Southern Alps is recognized as the world only true alpine parrot, famed for high intelligence and rubber-chewing curiosity?",
        correct: "Kea Nestor notabilis",
        w1: "Kākā",
        w2: "Kākāriki",
        exp: "Kea possess problem-solving intelligence comparable to primates, famous for dismantling windshield wipers and ski equipment in mountain car parks."
      },
      {
        q: "What ancient endemic reptile of New Zealand, the sole surviving member of the prehistoric order Sphenodontia that roamed with early dinosaurs 200 million years ago, possesses a parietal third eye?",
        correct: "Tuatara Sphenodon punctatus",
        w1: "Gecko",
        w2: "Skink",
        exp: "Tuatara have a slow metabolism, live for over one hundred years, and retain primitive brain structures virtually unchanged since the Mesozoic Era."
      },
      {
        q: "What massive flightless ratite bird, reaching heights of 3.6 meters and weighing 230 kilograms, was the dominant herbivore in New Zealand until hunted to extinction in the 1400s?",
        correct: "Giant Moa Dinornis",
        w1: "Elephant Bird",
        w2: "Emu",
        exp: "Moa had no wing bones whatsoever, hunted in the wild by the apex aerial predator Haast Eagle (Hieraaetus moorei), the largest eagle ever to exist."
      }
    ],
    number: {
      q: "What was the approximate standing height in meters of an adult female South Island Giant Moa (Dinornis robustus)?",
      target: 4,
      unit: "meters",
      imperial: "12 feet tall",
      exp: "Female South Island Giant Moa stood up to 3.6 meters (rounded to 4 m) tall with an extended neck, making them the tallest birds ever to live."
    }
  },

  // Cycle 7: Glaciers, Caves & Coastal Formations
  {
    mcqs: [
      {
        q: "Which two famous glaciers on the West Coast of the South Island are unique for descending through temperate rainforest to within 300 meters of sea level?",
        correct: "Franz Josef and Fox Glaciers",
        w1: "Tasman and Hooker Glaciers",
        w2: "Rob Roy and Mueller Glaciers",
        exp: "Fed by massive snowfall in the high Southern Alps, Kā Roimata o Hine Hukatere (Franz Josef) and Te Moeka o Tuawe (Fox) terminate amid lush tree ferns."
      },
      {
        q: "What world-famous limestone cave system in the King Country of the North Island is illuminated by thousands of bioluminescent fungus gnat larvae (Arachnocampa luminosa)?",
        correct: "Waitomo Glowworm Caves",
        w1: "Te Anau Caves",
        w2: "Ruakuri Cave",
        exp: "Visitors take silent boat rides beneath glittering subterranean glowworm ceilings, where larvae dangle sticky silk threads to ensnare flying insects."
      },
      {
        q: "What geological wonder at Punakaiki on the West Coast consists of heavily layered limestone strata sculpted into stacks resembling stacks of breakfast pancakes?",
        correct: "Pancake Rocks and Blowholes",
        w1: "Moeraki Boulders",
        w2: "Cathedral Rocks",
        exp: "Formed 30 million years ago by alternating layers of marine mud and shell fragments, crashing Tasman Sea waves force water through vertical blowholes."
      },
      {
        q: "What famous coastal landmark on the Coromandel Peninsula features a massive natural white limestone archway framing a secluded sandy cove, featured in The Chronicles of Narnia?",
        correct: "Cathedral Cove Te Whanganui-A-Hei",
        w1: "Hot Water Beach",
        w2: "Tunnel Beach",
        exp: "Accessible by coastal track or kayak, Cathedral Cove is located in a marine reserve known for crystal clear waters, sea caves, and volcanic rock pillars."
      },
      {
        q: "What collection of unusually large, perfectly spherical septarian concretions up to two meters wide lie scattered across Koekohe Beach in Otago?",
        correct: "Moeraki Boulders Kaihinaki",
        w1: "Koutu Boulders",
        w2: "Punakaiki Boulders",
        exp: "Formed on the ancient Paleocene seabed 60 million years ago by calcite precipitation around organic nuclei, Māori legend depicts them as food baskets from the wrecked Arai-te-uru voyaging canoe."
      }
    ],
    number: {
      q: "Approximately how many large spherical septarian boulders lie exposed on Koekohe Beach at the Moeraki Boulders site in Otago?",
      target: 50,
      unit: "boulders",
      imperial: "50 spherical boulders",
      exp: "Approximately fifty large spherical concretions (ranging from 0.5 to 2.2 meters in diameter) are exposed along the beach."
    }
  },

  // Cycle 8: New Zealand Wine Regions & Agriculture
  {
    mcqs: [
      {
        q: "Which wine region at the northeastern tip of the South Island produces over seventy-five percent of New Zealand wine, world-renowned for vibrant, aromatic Sauvignon Blanc?",
        correct: "Marlborough",
        w1: "Hawke Bay",
        w2: "Central Otago",
        exp: "The Wairau and Awatere valleys feature stony alluvial soils and long sunny days with cool nights, producing pungent notes of passionfruit and gooseberry."
      },
      {
        q: "Which inland alpine wine region in the South Island is recognized as the southernmost commercial wine-growing region in the world, acclaimed for world-class Pinot Noir?",
        correct: "Central Otago",
        w1: "Waitaki Valley",
        w2: "Nelson",
        exp: "Framed by snow-capped mountains around Gibbston and Bannockburn, Central Otago is New Zealand only wine region with a true semi-continental climate."
      },
      {
        q: "What high-value medicinal and culinary honey with potent antibacterial methylglyoxal (MGO) properties is produced by bees foraging on native mānuka tea trees (Leptospermum scoparium)?",
        correct: "Mānuka Honey",
        w1: "Rātā Honey",
        w2: "Kāmahi Honey",
        exp: "Regulated under strict Unique Mānuka Factor (UMF) scientific grading systems, authentic New Zealand mānuka honey commands premium prices globally."
      },
      {
        q: "What agricultural export industry is the single largest merchandise export earner for New Zealand, managed primarily by the dairy cooperative Fonterra?",
        correct: "Dairy Farming Milk Powder",
        w1: "Wool Production",
        w2: "Kiwifruit Orchards",
        exp: "New Zealand is the world largest exporter of whole milk powder and butter, utilizing pasture-fed dairy herds in regions like the Waikato, Taranaki, and Canterbury."
      },
      {
        q: "Which agricultural region around the Bay of Plenty (Te Puke) is the self-proclaimed Kiwifruit Capital of the World, growing green Hayward and gold SunGold kiwifruit?",
        correct: "Bay of Plenty",
        w1: "Gisborne",
        w2: "Northland",
        exp: "Originally known as Chinese Gooseberry, New Zealand growers rebranded the fruit as Kiwifruit in 1959 after the national bird to market it internationally."
      }
    ],
    number: {
      q: "What percentage of New Zealand total national wine production is grown and harvested in the Marlborough wine region?",
      target: 75,
      unit: "percent",
      imperial: "75% of New Zealand wine",
      exp: "Marlborough accounts for approximately 75 to 80 percent of all wine produced in New Zealand, dominating its billion-dollar export market."
    }
  },

  // Cycle 9: Subantarctic Islands & Avian Sanctuaries
  {
    mcqs: [
      {
        q: "What headland on the Otago Peninsula near Dunedin is home to the only mainland breeding colony of Northern Royal Albatross in the Southern Hemisphere?",
        correct: "Taiaroa Head Pukekura",
        w1: "Cape Kidnappers",
        w2: "Farewell Spit",
        exp: "Royal albatrosses have a three-meter wingspan, nesting on the grassy headland where conservationists monitor chicks with live webcams."
      },
      {
        q: "What rare, endangered penguin species with distinctive pale yellow eyes and a bright yellow feather headband, known in Māori as Hoiho, is endemic to New Zealand?",
        correct: "Yellow-Eyed Penguin Hoiho",
        w1: "Little Blue Penguin",
        w2: "Fiordland Crested Penguin",
        exp: "Featured on the New Zealand five-dollar banknote, the Hoiho (Noise Shouter) nests in coastal forests along the Otago and Catlins coast and subantarctic islands."
      },
      {
        q: "What remote archipelago 800 kilometers east of the South Island was the ancestral homeland of the indigenous Moriori people, who practiced non-violent pacifism?",
        correct: "Chatham Islands Rēkohu",
        w1: "Auckland Islands",
        w2: "Campbell Island",
        exp: "Under their law of Nunuku-whenua, the Moriori forbade warfare and murder for centuries until devastated by invading mainland Māori tribes in 1835."
      },
      {
        q: "What 35-kilometer curved sand spit at the northernmost tip of the South Island is the longest natural sandspit in New Zealand, an internationally protected wetland for migrating godwits?",
        correct: "Farewell Spit Onetahua",
        w1: "Ninety Mile Beach",
        w2: "Matakana Island",
        exp: "Bar-tailed godwits depart Farewell Spit each autumn on an epic 11,000-kilometer non-stop flight across the Pacific Ocean to their Arctic breeding grounds in Alaska."
      },
      {
        q: "What tiny flightless penguin species, measuring just thirty centimeters tall and weighing one kilogram, is the smallest penguin species on Earth?",
        correct: "Little Blue Penguin Kororā",
        w1: "Rockhopper Penguin",
        w2: "Magellanic Penguin",
        exp: "Kororā nest in burrows and under boardwalks along coastal harbors like Oamaru, swimming out at dawn to catch anchovies and returning in rafts at dusk."
      }
    ],
    number: {
      q: "What is the maximum wingspan in meters of an adult Southern Royal Albatross soaring over the southern oceans of New Zealand?",
      target: 3,
      unit: "meters",
      imperial: "10 feet wingspan",
      exp: "The Royal Albatross possesses one of the largest wingspans of any living bird, measuring up to three to 3.5 meters from wingtip to wingtip."
    }
  },

  // Cycle 10: Extent, Zealandia & Constitutional Superlatives
  {
    mcqs: [
      {
        q: "What mostly submerged 4.9-million-square-kilometer continental landmass, of which New Zealand and New Caledonia comprise the visible six percent, is recognized by geologists as Earth eighth continent?",
        correct: "Zealandia Te Riu-a-Māui",
        w1: "Sundaland",
        w2: "Sahul",
        exp: "Zealandia broke away from the ancient supercontinent Gondwana 80 million years ago, submerging 94 percent underwater beneath the South Pacific Ocean."
      },
      {
        q: "In what historic year did New Zealand become the very first self-governing nation in world history to grant all adult women the universal right to vote in parliamentary elections?",
        correct: "1893",
        w1: "1902",
        w2: "1919",
        exp: "Led by suffragist Kate Sheppard (depicted on the New Zealand 10-dollar bill), the Electoral Act was signed into law on September 19, 1893."
      },
      {
        q: "What is the official name of the southernmost point of the South Island of New Zealand, famous for rugged ocean vistas looking out toward Stewart Island?",
        correct: "Slope Point",
        w1: "Cape Reinga",
        w2: "Puysegur Point",
        exp: "Slope Point is marked by solitary wind-warped macrocarpa trees that grow permanently bent sideways due to unrelenting, fierce Antarctic gales."
      },
      {
        q: "What spiritual cape at the northwestern tip of the North Island is venerated in Māori tradition as the departing place of spirits (Te Rerenga Wairua) leaping into the underworld?",
        correct: "Cape Reinga",
        w1: "North Cape",
        w2: "Cape Brett",
        exp: "At Cape Reinga, the turbulent Tasman Sea crashes directly into the Pacific Ocean above an ancient 800-year-old pōhutukawa tree clinging to the rocky ridge."
      },
      {
        q: "How many regional administrative councils (plus unitary authorities) comprise the local government system of New Zealand?",
        correct: "16 Regions",
        w1: "12 Regions",
        w2: "20 Regions",
        exp: "New Zealand is organized into sixteen local government regions (such as Northland, Auckland, Waikato, Bay of Plenty, Canterbury, Otago, and Southland)."
      }
    ],
    number: {
      q: "In what year did New Zealand make global history by becoming the first self-governing country to grant women the right to vote?",
      target: 1893,
      unit: "year",
      imperial: "1893 AD",
      exp: "On September 19, 1893, New Zealand enacted universal women's suffrage, leading the global democratic movement."
    }
  }
];

// Build New Zealand Quiz
buildQuiz({
  id: 'new-zealand-geography-heritage-60',
  theme: 'New Zealand: Geography, Fiords & Māori Heritage',
  title: 'New Zealand: Geography, Fiords & Māori Heritage',
  description: 'A 60-question grand master assessment exploring Cook Strait & Aoraki Mount Cook, Milford Sound & Mitre Peak, Lake Taupo supervolcano & Rotorua, Queenstown, the Treaty of Waitangi (1840), Kiwi & Kea, Marlborough wines, and Zealandia.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, nzCycles);

console.log('New Zealand quiz built successfully!');
