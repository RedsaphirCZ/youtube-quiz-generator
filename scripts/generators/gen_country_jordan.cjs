const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 3. jordan-geography-heritage-60
// =========================================================================
const jordanCycles = [
  // Cycle 1: Petra & The Nabataean Kingdom
  {
    mcqs: [
      {
        q: "What ancient UNESCO World Heritage city in southern Jordan, hand-carved directly into rose-red sandstone canyon cliffs, was the capital of the Nabataean Kingdom?",
        correct: "Petra Raqmu",
        w1: "Jerash",
        w2: "Palmyra",
        exp: "Voted one of the New 7 Wonders of the World, Petra controlled ancient frankincense, myrrh, and silk trade routes between Arabia, Egypt, and the Mediterranean."
      },
      {
        q: "What iconic 40-meter-high Hellenistic rock-cut tomb facade in Petra appears dramatically at the end of the narrow Siq gorge?",
        correct: "The Treasury Al-Khazneh",
        w1: "The Monastery Ad Deir",
        w2: "The Urn Tomb",
        exp: "Built in the 1st century CE as a mausoleum for Nabataean King Aretas IV, Bedouin legend claimed an Egyptian pharaoh hid gold inside the top stone urn."
      },
      {
        q: "What narrow, dramatic 1.2-kilometer sandstone canyon chasm, flanked by sheer cliffs rising eighty meters high, serves as the main ceremonial entrance into Petra?",
        correct: "The Siq Al-Siq",
        w1: "Wadi Mujib",
        w2: "Wadi Rum",
        exp: "The Nabataeans channeled drinking water along the Siq using terracotta water pipes and carved drainage channels cut into the canyon walls."
      },
      {
        q: "What colossal rock-carved monument in Petra, reached by climbing eight hundred stone steps up a mountain canyon, is even larger than the Treasury at forty-eight meters wide?",
        correct: "The Monastery Ad Deir",
        w1: "The Palace Tomb",
        w2: "The Corinthian Tomb",
        exp: "Ad Deir was repurposed as a Christian chapel during the Byzantine era, featuring crosses carved into its interior rear chamber walls."
      },
      {
        q: "What sophisticated ancient engineering technology allowed the Nabataeans to sustain a thriving city of 30,000 residents in the hyper-arid desert of Petra?",
        correct: "Water harvesting with subterranean cisterns, dams, and terracotta aqueducts",
        w1: "Deep mechanical artesian boreholes",
        w2: "Solar desalinization plants",
        exp: "Nabataean engineers captured seasonal flash floods in waterproof subterranean cisterns, ensuring year-round water security in the desert."
      }
    ],
    number: {
      q: "What is the architectural height in meters of the magnificent rock-carved Treasury (Al-Khazneh) facade in Petra?",
      target: 40,
      unit: "meters",
      imperial: "131 feet high",
      exp: "The Treasury facade measures forty meters high and twenty-five meters wide, sculpted from a single solid sandstone cliff."
    }
  },

  // Cycle 2: The Dead Sea & Rift Depressions
  {
    mcqs: [
      {
        q: "What terminal hypersaline lake in the Jordan Rift Valley on the border of Jordan and the West Bank is the lowest exposed land elevation on planet Earth?",
        correct: "The Dead Sea",
        w1: "Lake Assal",
        w2: "Sea of Galilee",
        exp: "Sitting at 430 meters below mean sea level, the Dead Sea shoreline is the lowest point on the terrestrial surface of the Earth."
      },
      {
        q: "What is the salinity percentage of the Dead Sea, making it roughly ten times saltier than normal ocean water and allowing swimmers to float effortlessly?",
        correct: "34 Percent Salinity",
        w1: "12 Percent",
        w2: "20 Percent",
        exp: "High concentrations of dissolved magnesium, sodium, potassium, and calcium salts create extreme water density (1.24 kg/L) preventing humans from sinking."
      },
      {
        q: "What natural therapeutic cosmetic resource found along the shores of the Dead Sea is rich in twenty-six minerals prized worldwide for skin health and arthritis treatment?",
        correct: "Dead Sea Black Mineral Mud",
        w1: "Sulfur Clay",
        w2: "Alum Silt",
        exp: "Visitors coat their bodies in mineral-rich black alluvial mud before floating in the buoyant saline waters, a natural spa frequented since Queen Cleopatra."
      },
      {
        q: "What spectacular sandstone river gorge in Jordan, nicknamed the Grand Canyon of Jordan, features an aquatic river trek entering the Dead Sea from 400 meters below sea level?",
        correct: "Wadi Mujib River Arnon",
        w1: "Wadi Zarqa",
        w2: "Wadi Dana",
        exp: "The Mujib Biosphere Reserve is the lowest nature reserve in the world, where hikers wade and swim through slot canyons past waterfalls to reach the Dead Sea."
      },
      {
        q: "What famous natural pillar of crystallised rock salt overlooking the Dead Sea is associated in biblical tradition with the wife of Lot who looked back at Sodom?",
        correct: "Lot Wife Salt Pillar",
        w1: "Moses Pillar",
        w2: "Jethro Rock",
        exp: "According to the Book of Genesis, Lot wife was turned into a pillar of salt for looking back at the destruction of Sodom and Gomorrah."
      }
    ],
    number: {
      q: "How many meters below mean sea level is the natural shoreline of the Dead Sea in Jordan, the lowest dry land on Earth?",
      target: 430,
      unit: "meters below sea level",
      imperial: "1,410 feet below sea level",
      exp: "The water surface of the Dead Sea sits at approximately 430 meters below sea level."
    }
  },

  // Cycle 3: Wadi Rum & The Valley of the Moon
  {
    mcqs: [
      {
        q: "What vast 720-square-kilometer UNESCO World Heritage desert wilderness in southern Jordan features dramatic red sandstone mountains and granite canyons, known as the Valley of the Moon?",
        correct: "Wadi Rum",
        w1: "Wadi Dana",
        w2: "Wadi Araba",
        exp: "Wadi Rum was the desert operational base for British officer T.E. Lawrence and Prince Faisal during the Arab Revolt of 1917 to 1918."
      },
      {
        q: "What famous 1962 Academy Award-winning historical epic film directed by David Lean was filmed on location across the red dunes of Wadi Rum?",
        correct: "Lawrence of Arabia",
        w1: "Dune",
        w2: "The Martian",
        exp: "Starring Peter O'Toole as T.E. Lawrence, Wadi Rum also served as the surface of the Red Planet in The Martian (2015) and Arrakis in Dune (2021)."
      },
      {
        q: "What spectacular natural rock arch in Wadi Rum spans thirty-five meters across a granite mountain cliff at a height of 300 meters above the desert floor?",
        correct: "Burdah Rock Bridge",
        w1: "Umm Fruth Rock Bridge",
        w2: "Little Rock Bridge",
        exp: "Burdah Rock Bridge is one of the highest natural stone arches in the world, reached via a steep scrambling route guided by local Bedouin mountaineers."
      },
      {
        q: "What semi-nomadic indigenous desert dwellers have inhabited the canyons of Wadi Rum for generations, famous for hospitality, camel treks, and desert camps?",
        correct: "The Zalabieh Bedouin",
        w1: "The Tuareg",
        w2: "The Berbers",
        exp: "The Bedouin share traditional sweet sage tea brewed over acacia wood embers, and slow-cook lamb feasts (Zarb) underground in desert sand ovens."
      },
      {
        q: "What is the highest mountain peak in Jordan, rising 1,854 meters in the southern desert near the border with Saudi Arabia?",
        correct: "Jabal Umm ad Dami",
        w1: "Jabal Ram",
        w2: "Jabal Harun",
        exp: "Climbers to the summit of Umm ad Dami can see across the desert to the Red Sea at Aqaba and the mountains of Saudi Arabia."
      }
    ],
    number: {
      q: "What is the span length in meters of the iconic Burdah Rock Bridge natural arch perched high in the mountains of Wadi Rum?",
      target: 35,
      unit: "meters",
      imperial: "115 feet arch span",
      exp: "The Burdah Rock Bridge spans approximately thirty-five meters across a deep mountain crevasse in Wadi Rum."
    }
  },

  // Cycle 4: Amman, The Seven Hills & Roman Decapolis
  {
    mcqs: [
      {
        q: "What is the capital and largest city of Jordan, built across nineteen hills (originally seven hills) and known in antiquity as Philadelphia?",
        correct: "Amman",
        w1: "Zarqa",
        w2: "Irbid",
        exp: "Amman is one of the oldest continuously inhabited cities on Earth, dating back to the Neolithic settlement of 'Ain Ghazal (7250 BCE)."
      },
      {
        q: "What historic archaeological hill in central Amman (Jabal al-Qal'a) preserves the Roman Temple of Hercules, a Byzantine basilica, and the 8th-century Umayyad Palace?",
        correct: "The Amman Citadel",
        w1: "Mount Nebo",
        w2: "Jabal Luweibdeh",
        exp: "Excavations at the Temple of Hercules revealed colossal carved marble fingers from a thirty-foot-tall lost statue of Hercules."
      },
      {
        q: "What monumental 2nd-century Roman Theater in downtown Amman, cut directly into the northern slope of a hill, seated six thousand spectators?",
        correct: "The Roman Theatre of Amman",
        w1: "The Odeon",
        w2: "The Nymphaeum",
        exp: "Built during the reign of Emperor Antoninus Pius around 160 CE, the theater possesses acoustic design allowing a whisper on stage to be heard in the top tier."
      },
      {
        q: "Which vibrant cultural street in the historic Jabal Amman district is famous for art galleries, heritage cafes, rooftop lounges, and the Souk Jara Friday flea market?",
        correct: "Rainbow Street",
        w1: "Al-Rainbow",
        w2: "King Faisal Street",
        exp: "Rainbow Street preserves 1920s limestone villas, including the home of British diplomat Glubb Pasha and modern Jordanian culinary spots."
      },
      {
        q: "What 7250 BCE Neolithic archaeological site in Amman uncovered the 'Ain Ghazal Statues, the oldest large-scale human statues ever discovered in world history?",
        correct: "Ain Ghazal",
        w1: "Beidha",
        w2: "Basta",
        exp: "Made from lime plaster modeled over reed bundles with bitumen-inlaid eyes, the fifteen statues date back nearly ten thousand years."
      }
    ],
    number: {
      q: "What was the spectator seating capacity of the ancient 2nd-century Roman Theatre in downtown Amman, Jordan?",
      target: 6000,
      unit: "spectators",
      imperial: "6,000 spectators",
      exp: "The Roman Theatre in Amman seated six thousand citizens across three horizontal tiers (cavea)."
    }
  },

  // Cycle 5: Jerash & The Roman Decapolis
  {
    mcqs: [
      {
        q: "Which ancient Greco-Roman city in northern Jordan, known as the Pompeii of the Middle East, is recognized as the best-preserved provincial Roman city on Earth?",
        correct: "Jerash Gerasa",
        w1: "Gadara Umm Qais",
        w2: "Pella",
        exp: "Buried for centuries beneath desert sand dunes, Jerash features paved colonnaded streets, hilltop temples, two theaters, and monumental public fountains."
      },
      {
        q: "What unique 90-meter-wide oval public plaza in Jerash is encircled by fifty-six elegant Ionic limestone columns, connecting the Cardo to the Temple of Zeus?",
        correct: "The Oval Forum Oval Plaza",
        w1: "The Decumanus",
        w2: "The Agora",
        exp: "The Oval Forum is an asymmetrical limestone plaza paved with concentric flagstones, designed to join two conflicting town street axes."
      },
      {
        q: "What monumental 800-meter paved colonnaded main avenue in Jerash still retains its original Roman stone pavement, underground drainage manholes, and chariot wheel ruts?",
        correct: "The Cardo Maximus",
        w1: "The Via Recta",
        w2: "The Decumanus Maximus",
        exp: "Lined with hundreds of Corinthian columns, the Cardo connected the North Gate to the Oval Forum, passing the ornate 2nd-century Nymphaeum public fountain."
      },
      {
        q: "What monumental triple-arched stone gateway in southern Jerash was constructed in 129 CE to commemorate the imperial visit of Roman Emperor Hadrian?",
        correct: "The Arch of Hadrian Hadrian Gate",
        w1: "The South Gate",
        w2: "The North Gate",
        exp: "Standing eleven meters tall, the triumphal arch was originally planned as the new southern entrance gate for an intended expansion of the city."
      },
      {
        q: "What Greco-Roman Decapolis city in northwestern Jordan overlooking the Sea of Galilee and the Golan Heights was ancient Gadara, where Jesus performed the Miracle of the Swine?",
        correct: "Umm Qais Gadara",
        w1: "Pella",
        w2: "Abila",
        exp: "Umm Qais features a black basalt Roman theater, a colonnaded street, and a terrace with panoramic views across Jordan, Israel, and Syria."
      }
    ],
    number: {
      q: "In what year CE was the monumental Arch of Hadrian constructed in Jerash to celebrate the visit of Emperor Hadrian?",
      target: 129,
      unit: "CE",
      imperial: "129 AD",
      exp: "Hadrian's Arch in Jerash was built during Emperor Hadrian's winter visit to Gerasa in 129 to 130 CE."
    }
  },

  // Cycle 6: Biblical Jordan: Mount Nebo & Bethany
  {
    mcqs: [
      {
        q: "What 710-meter holy mountain ridge overlooking the Jordan Valley and Dead Sea is revered as the place where the Prophet Moses viewed the Promised Land and died?",
        correct: "Mount Nebo Jabal Nibu",
        w1: "Mount Hor",
        w2: "Mount Hermon",
        exp: "According to the Book of Deuteronomy, Moses climbed Mount Nebo from the plains of Moab, commemorated today by the Franciscan Moses Memorial Church."
      },
      {
        q: "What famous 6th-century Byzantine mosaic floor inside Saint George Church in Madaba is the oldest surviving cartographic map of the Holy Land and Jerusalem?",
        correct: "The Madaba Mosaic Map",
        w1: "The Nebo Map",
        w2: "The Umm ar-Rasas Mosaic",
        exp: "Created around 560 CE using over two million colored stone cubes (tesserae), the map accurately depicts fifty-four biblical sites across the Middle East."
      },
      {
        q: "What UNESCO World Heritage archaeological site on the east bank of the Jordan River is venerated as the authentic location of the Baptism of Jesus by John the Baptist?",
        correct: "Bethany Beyond the Jordan Al-Maghtas",
        w1: "Qasr al-Yahud",
        w2: "En Gedi",
        exp: "Excavations revealed 1st-century Roman baptismal pools, a cruciform baptistery, and hermit caves visited by early Christian pilgrims along the Jordan River."
      },
      {
        q: "What dramatic hilltop palace fortress in Jordan overlooking the Dead Sea was the stronghold of King Herod Antipas where John the Baptist was imprisoned and beheaded?",
        correct: "Machaerus Mukawir",
        w1: "Kerak",
        w2: "Masada",
        exp: "According to historian Flavius Josephus, Salome performed her fateful dance at Machaerus, leading Herod to execute John the Baptist."
      },
      {
        q: "What UNESCO World Heritage archaeological site near Madaba contains sixteen Byzantine and Umayyad churches with the largest preserved mosaic floor in Jordan (Church of St. Stephen)?",
        correct: "Umm ar-Rasas Kastrom Mefa a",
        w1: "Rabba",
        w2: "Dhiban",
        exp: "The 8th-century mosaic floor depicts illustrations of twenty-four major cities in Jordan, Palestine, and Egypt, along with a 15-meter square stylized stylite monastic tower."
      }
    ],
    number: {
      q: "Approximately how many millions of colored stone cubes (tesserae) were used to create the 6th-century Madaba Mosaic Map in Jordan?",
      target: 2,
      unit: "million stone cubes",
      imperial: "2+ million mosaic tesserae",
      exp: "The original Madaba Mosaic Map measured 21 by 7 meters, composed of more than two million individual cut stone tesserae."
    }
  },

  // Cycle 7: Desert Castles & Crusader Fortresses
  {
    mcqs: [
      {
        q: "What 8th-century early Islamic desert hunting lodge in eastern Jordan, built under Umayyad Caliph Walid II, is a UNESCO World Heritage site famous for figurative wall frescoes and a celestial zodiac dome?",
        correct: "Qasr Amra",
        w1: "Qasr al-Kharana",
        w2: "Qasr al-Azraq",
        exp: "The bathhouse frescoes depict hunting scenes, musicians, dancing women, and the Six Kings of the World, representing rare surviving early Islamic secular figurative art."
      },
      {
        q: "What colossal 12th-century Crusader castle perched on a 900-meter limestone ridge in southern Jordan was the stronghold of the notorious Crusader lord Raynald of Châtillon?",
        correct: "Kerak Castle Karak Castle",
        w1: "Shobak Castle",
        w2: "Ajloun Castle",
        exp: "Kerak withstood two sieges by Saladin (Salah ad-Din) before falling in 1188, featuring dark vaulted subterranean stables, barrack halls, and torture chambers."
      },
      {
        q: "Which fortress in the desert oasis of Azraq, constructed from dark black basalt stone blocks, served as the winter headquarters for T.E. Lawrence in 1917 during the Arab Revolt?",
        correct: "Qasr al-Azraq Black Castle",
        w1: "Qasr Hallabat",
        w2: "Qasr Mushatta",
        exp: "Lawrence occupied the room directly above the southern entrance gate, which features massive one-ton single-slab stone doors that pivot smoothly on basalt hinges."
      },
      {
        q: "What 12th-century Muslim fortress in northern Jordan, built by Saladin nephew Izz al-Din Usama on Mount Auf, guarded trade routes and iron mines against Crusader incursions?",
        correct: "Ajloun Castle Qal at ar-Rabad",
        w1: "Kerak Castle",
        w2: "Shobak Castle",
        exp: "Ajloun commanded sweeping views over the Jordan Valley, utilizing a network of homing pigeons and optical smoke beacons to transmit messages to Damascus in eight hours."
      },
      {
        q: "What dramatic Crusader castle in southern Jordan, originally named Mons Realis (Royal Mountain) by King Baldwin I of Jerusalem in 1115, perches on a conical mountain?",
        correct: "Shobak Castle Montreal",
        w1: "Kerak Castle",
        w2: "Aqaba Fort",
        exp: "Shobak features a secret 375-step subterranean escape staircase cut deep into the limestone bedrock leading to an underground water well."
      }
    ],
    number: {
      q: "In what year did Crusader knight Payen le Bouteiller begin construction of the massive fortress of Kerak Castle in Jordan?",
      target: 1142,
      unit: "year",
      imperial: "1142 AD",
      exp: "Construction of Kerak Castle commenced in 1142, becoming the center of the Crusader Lordship of Oultrejordain."
    }
  },

  // Cycle 8: The Red Sea, Gulf of Aqaba & Marine Reserves
  {
    mcqs: [
      {
        q: "What is the only coastal seaport city in the Hashemite Kingdom of Jordan, located at the northern tip of the Gulf of Aqaba on the Red Sea?",
        correct: "Aqaba",
        w1: "Dhahab",
        w2: "Eilat",
        exp: "Captured by Lawrence of Arabia and Arab forces in a daring 1917 surprise desert assault from behind, Aqaba is a duty-free special economic zone."
      },
      {
        q: "How many kilometers of total marine coastline does Jordan possess along the Gulf of Aqaba, making it Jordan only access to open ocean trade?",
        correct: "26 Kilometers",
        w1: "15 Kilometers",
        w2: "50 Kilometers",
        exp: "In 1965, King Hussein signed a historic land swap treaty with Saudi Arabia, trading 6,000 square kilometers of inland desert for twelve kilometers of extra coastline."
      },
      {
        q: "What famous Lebanese freighter shipwreck was scuttled in 1985 in the Aqaba Marine Park by order of King Abdullah II (then Prince) to create a thriving artificial coral reef for scuba divers?",
        correct: "The Cedar Pride",
        w1: "The Thistlegorm",
        w2: "The Zenobia",
        exp: "Lying on its port side across two coral reefs at depths from twelve to thirty meters, the 74-meter ship is encrusted with soft corals and inhabited by sea turtles."
      },
      {
        q: "What unique underwater military museum was created in Aqaba in 2019, featuring nineteen sunken combat vehicles including tanks, troop carriers, and a combat attack helicopter?",
        correct: "Aqaba Underwater Military Museum",
        w1: "Red Sea Submarine Park",
        w2: "Neptune Memorial Reef",
        exp: "Placed in tactical battle formation along the seabed, the vehicles allow divers and glass-bottom boats to observe corals colonizing decommissioned military hardware."
      },
      {
        q: "Why are the coral reefs in the Gulf of Aqaba scientifically celebrated worldwide by marine biologists as a Thermal Refuge for coral survival?",
        correct: "Corals in the northern Red Sea possess genetic thermal resistance to high water temperatures and ocean warming",
        w1: "Cold freshwater rivers cool the bay",
        w2: "Artificial shading domes cover the reef",
        exp: "Having evolved through warm post-glacial bottlenecks, Gulf of Aqaba corals can tolerate sea temperatures up to 5°C above current summer maximums without bleaching."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the national maritime coastline of Jordan on the Gulf of Aqaba?",
      target: 26,
      unit: "kilometers",
      imperial: "16 miles of coastline",
      exp: "Jordan has exactly twenty-six kilometers of coastline along the Red Sea, connecting the nation to global maritime shipping."
    }
  },

  // Cycle 9: Jordanian Hospitality, Mansaf & Cuisine
  {
    mcqs: [
      {
        q: "What is the official national dish of Jordan, consisting of tender lamb cooked in a rich fermented dried goat yogurt broth (Jameed), served over turmeric rice and shrak flatbread topped with toasted pine nuts and almonds?",
        correct: "Mansaf",
        w1: "Maqluba",
        w2: "Musakhan",
        exp: "Inscribed on the UNESCO Intangible Cultural Heritage list in 2022, Mansaf is served on a large communal platter (sidr) and traditionally eaten with the right hand."
      },
      {
        q: "What hard, stone-like sun-dried fermented goat milk yogurt balls from the southern desert of Jordan are rehydrated to create the savory broth for authentic Mansaf?",
        correct: "Jameed",
        w1: "Labneh",
        w2: "Kashk",
        exp: "Bedouin women in Karak churn ewe and goat milk in goatskin bags (shikwah), boiling the buttermilk and shaping salted balls dried in the hot desert sun."
      },
      {
        q: "How many small cups of cardamom-infused black Arabic coffee (Qahwa Sadah) are traditionally served to a guest in Bedouin hospitality before the guest shakes the cup to indicate they are satisfied?",
        correct: "3 Cups (Guest, Sword, and Mood)",
        w1: "1 Cup",
        w2: "5 Cups",
        exp: "The first cup (Finjan al-Dayf) honors the guest, the second (Finjan al-Sayf) signifies courage and friendship, and the third (Finjan al-Kayf) is for relaxation."
      },
      {
        q: "What popular Middle Eastern upside-down layered dish of fried cauliflower, eggplant, potatoes, and spiced chicken or lamb cooked under seasoned rice is flipped dramatically onto a serving tray?",
        correct: "Maqluba Maqloubeh",
        w1: "Mansaf",
        w2: "Sayadieh",
        exp: "Meaning 'Upside Down' in Arabic, the pot is turned over onto a large platter to reveal a cake-like tower of caramelized vegetables and meat."
      },
      {
        q: "What famous warm Levant dessert, perfected at Habibah Sweets in downtown Amman, features stretchy melted white Nabulsi cheese topped with crispy shredded kataifi pastry and orange blossom syrup?",
        correct: "Knafeh Kanafeh",
        w1: "Baklava",
        w2: "Basbousa",
        exp: "Lines stretch down the alleyways of downtown Amman nightly as customers enjoy steaming hot plates of Knafeh sprinkled with crushed green pistachios."
      }
    ],
    number: {
      q: "How many ceremonial cups of cardamom coffee are traditionally offered to an honored guest in Bedouin hospitality customs in Jordan?",
      target: 3,
      unit: "cups",
      imperial: "3 cups of Bedouin coffee",
      exp: "Bedouin custom prescribes serving up to three cups of coffee: the cup of the guest, the cup of the sword, and the cup of pleasure."
    }
  },

  // Cycle 10: Extent, 12 Governorates & Jordanian Superlatives
  {
    mcqs: [
      {
        q: "Into how many first-level administrative governorates (Muhafazat) is the Hashemite Kingdom of Jordan politically organized?",
        correct: "12 Governorates",
        w1: "8 Governorates",
        w2: "16 Governorates",
        exp: "The twelve governorates are grouped into three geographical regions: Northern (e.g. Irbid, Jerash, Ajloun), Central (Amman, Zarqa, Balqa, Madaba), and Southern (Karak, Tafilah, Ma'an, Aqaba)."
      },
      {
        q: "What is the largest governorate in Jordan by geographical land area, covering over thirty-six percent of the national territory in the southern desert?",
        correct: "Ma an Governorate",
        w1: "Amman Governorate",
        w2: "Mafraq Governorate",
        exp: "Ma'an covers 32,832 square kilometers, home to Petra, Wadi Rum, and the Desert Highway connecting Amman to the port of Aqaba."
      },
      {
        q: "What ancient 5,000-year-old trade highway winds through the central highlands of Jordan, connecting Amman to Petra and Aqaba past biblical towns and Crusader castles?",
        correct: "The King Highway Tariq as-Sultani",
        w1: "The Desert Highway",
        w2: "The Silk Road",
        exp: "Mentioned in the Book of Numbers, the King's Highway was traveled by Moses, the Nabataeans, Roman legions (Via Nova Traiana), and Muslim pilgrims on the Hajj to Mecca."
      },
      {
        q: "What royal dynasty has ruled the Hashemite Kingdom of Jordan since its founding in 1921 under King Abdullah I, tracing its direct ancestral lineage to the Prophet Muhammad?",
        correct: "The Hashemite Dynasty House of Hashim",
        w1: "The Umayyad Dynasty",
        w2: "The Abbasid Dynasty",
        exp: "King Abdullah II is the 41st-generation direct descendant of the Prophet Muhammad through his daughter Fatimah and grandson Hasan ibn Ali."
      },
      {
        q: "What 650-kilometer long-distance hiking trail, inaugurated in 2015, crosses the entire length of Jordan from Um Qais in the green north to Aqaba on the Red Sea?",
        correct: "The Jordan Trail",
        w1: "The Abraham Path",
        w2: "The Trans-Jordan Route",
        exp: "Named by National Geographic as one of the world best long-distance hikes, the 40-day trail crosses seventy-five villages, rolling olive groves, Petra, and desert canyons."
      }
    ],
    number: {
      q: "How many administrative Governorates (Muhafazat) comprise the territorial structure of the Hashemite Kingdom of Jordan?",
      target: 12,
      unit: "governorates",
      imperial: "12 governorates",
      exp: "Jordan is divided into twelve administrative governorates, each led by a governor appointed by the King."
    }
  }
];

// Build Jordan Quiz
buildQuiz({
  id: 'jordan-geography-heritage-60',
  theme: 'Jordan: Geography, Petra & The Dead Sea Rift',
  title: 'Jordan: Geography, Petra & The Dead Sea Rift',
  description: 'A 60-question grand master assessment exploring Petra & The Treasury (40 m), the Dead Sea lowest land point (-430 m), Wadi Rum & Burdah Rock Bridge (35 m), Amman Citadel & Roman Theater (6,000 seats), Jerash (129 CE), Mount Nebo (2M tile map), Kerak (1142), and Mansaf.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, jordanCycles);

console.log('Jordan quiz built successfully!');
