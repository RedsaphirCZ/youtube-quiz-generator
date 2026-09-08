const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 2. turkey-geography-heritage-60
// =========================================================================
const turkeyCycles = [
  // Cycle 1: The Bosphorus, Istanbul & Transcontinental Geography
  {
    mcqs: [
      {
        q: "What strategic 31-kilometer strait bisects the city of Istanbul, forming the continental boundary separating Europe from Asia?",
        correct: "The Bosphorus Strait",
        w1: "The Dardanelles Strait",
        w2: "The Strait of Kerch",
        exp: "The Bosphorus connects the Black Sea to the Sea of Marmara, making Istanbul the only major metropolis in the world situated on two continents."
      },
      {
        q: "Which monumental 6th-century Byzantine cathedral in Istanbul, built by Emperor Justinian I, was the largest cathedral on Earth for nearly a thousand years?",
        correct: "Hagia Sophia Ayasofya",
        w1: "Blue Mosque",
        w2: "Süleymaniye Mosque",
        exp: "Consecrated in 537 CE, Hagia Sophia features a massive 31-meter dome resting on pendentive arches, later converted to an Ottoman imperial mosque."
      },
      {
        q: "What historic 17th-century imperial mosque in Istanbul, officially the Sultan Ahmed Mosque, is nicknamed after the 20,000 hand-painted blue İznik ceramic tiles lining its interior?",
        correct: "The Blue Mosque",
        w1: "Süleymaniye Mosque",
        w2: "Fatih Mosque",
        exp: "Commissioned by Sultan Ahmed I and built by architect Sedefkâr Mehmed Ağa, it is renowned for its six soaring minarets and cascading domes."
      },
      {
        q: "What ancient scythe-shaped drowned river estuary off the Bosphorus divides the historic European peninsula of Istanbul from modern Galata?",
        correct: "The Golden Horn Haliç",
        w1: "Bosphorus Cove",
        w2: "Marmara Inlet",
        exp: "The Golden Horn served as the historic primary naval harbor of Byzantine Constantinople, historically defended by a giant iron harbor chain."
      },
      {
        q: "Which massive covered market in Istanbul, founded in 1461 under Sultan Mehmed the Conqueror, is one of the oldest and largest covered bazaars on Earth with over 4,000 shops?",
        correct: "The Grand Bazaar Kapalıçarşı",
        w1: "The Spice Bazaar",
        w2: "Arasta Bazaar",
        exp: "The Grand Bazaar covers sixty-one covered streets across 30,700 square meters, welcoming hundreds of thousands of daily visitors."
      }
    ],
    number: {
      q: "In what year CE was the monumental Byzantine cathedral of Hagia Sophia officially consecrated in Constantinople?",
      target: 537,
      unit: "CE",
      imperial: "537 AD",
      exp: "Emperor Justinian I dedicated Hagia Sophia on December 27, 537 CE, famously exclaiming 'Solomon, I have surpassed thee!'"
    }
  },

  // Cycle 2: Cappadocia, Fairy Chimneys & Underground Cities
  {
    mcqs: [
      {
        q: "What surreal historical region in Central Anatolia is famous for bizarre volcanic tuff rock spires known as Fairy Chimneys (Peri Bacaları)?",
        correct: "Cappadocia Kapadokya",
        w1: "Pamukkale",
        w2: "Phrygia",
        exp: "Eruptions from ancient Mount Erciyes and Mount Hasan deposited soft volcanic ash (tuff) that eroded over millions of years into conical rock towers."
      },
      {
        q: "Which ancient multi-level subterranean city in Cappadocia was carved eight levels deep into volcanic rock, capable of sheltering 20,000 people and livestock from invading armies?",
        correct: "Derinkuyu Underground City",
        w1: "Kaymakli Underground City",
        w2: "Özkonak Underground City",
        exp: "Derinkuyu reaches a depth of eighty-five meters, complete with ventilation shafts, freshwater wells, chapels, stables, and massive rolling stone security doors."
      },
      {
        q: "Which UNESCO World Heritage valley in Cappadocia preserves dozens of rock-hewn Byzantine churches decorated with vivid 10th-century Christian frescoes?",
        correct: "Göreme Open-Air Museum",
        w1: "Ihlara Valley",
        w2: "Zelve Valley",
        exp: "Göreme features rock-cut monasteries like the Dark Church (Karanlık Kilise) and Apple Church (Elmalı Kilise), carved by early Christian monastic communities."
      },
      {
        q: "What popular early-morning adventure activity in Cappadocia sees hundreds of colorful balloons drift over love valleys and fairy chimneys at sunrise?",
        correct: "Hot Air Ballooning",
        w1: "Paragliding",
        w2: "Hang Gliding",
        exp: "Calm morning winds and dramatic topography make Cappadocia the hot air ballooning capital of the world, flying over 500,000 passengers annually."
      },
      {
        q: "What 14-kilometer canyon in Cappadocia features a rushing river flanked by steep hundred-meter cliffs containing over one hundred rock-cut churches?",
        correct: "Ihlara Valley",
        w1: "Rose Valley",
        w2: "Pigeon Valley",
        exp: "Carved by the Melendiz River between Mount Hasan and Mount Melendiz, the Ihlara Valley provided secluded refuge for early Christian monks and hermits."
      }
    ],
    number: {
      q: "What is the maximum depth in meters reached by the ancient subterranean Derinkuyu Underground City in Cappadocia?",
      target: 85,
      unit: "meters deep",
      imperial: "279 feet deep (equivalent to an 8-story underground building)",
      exp: "Derinkuyu descends approximately eighty-five meters beneath the surface across eight excavated subterranean levels."
    }
  },

  // Cycle 3: Pamukkale, Travertines & Aegean Antiquities
  {
    mcqs: [
      {
        q: "What natural wonder in southwestern Turkey, meaning 'Cotton Castle' in Turkish, features dazzling white terraced basins formed by mineral-rich thermal waters?",
        correct: "Pamukkale",
        w1: "Hierapolis",
        w2: "Karahayıt",
        exp: "Geothermal springs saturated with calcium carbonate cascade down a 200-meter cliff, depositing pure white travertine limestone terraces over millennia."
      },
      {
        q: "Which ancient Greco-Roman spa city founded by the kings of Pergamon sits directly atop the white travertine terraces of Pamukkale?",
        correct: "Hierapolis",
        w1: "Aphrodisias",
        w2: "Laodicea",
        exp: "Hierapolis features ancient thermal baths, an exceptionally preserved Roman theatre, a massive necropolis, and Cleopatra Antique Pool where tourists swim over submerged Roman marble columns."
      },
      {
        q: "Which major Ionian city in western Turkey near Selçuk is home to the majestic two-story Library of Celsus and the Great Theatre where Saint Paul preached?",
        correct: "Ephesus Efes",
        w1: "Miletus",
        w2: "Pergamon",
        exp: "Ephesus was the second largest city in the Roman Empire after Rome, featuring marble-paved Curetes Street, public latrines, and the House of the Virgin Mary."
      },
      {
        q: "Which colossal temple in Ephesus was four times larger than the Parthenon and stood as one of the Seven Wonders of the Ancient World?",
        correct: "Temple of Artemis Artemision",
        w1: "Temple of Apollo at Didyma",
        w2: "Temple of Hadrian",
        exp: "Supported by 127 marble columns standing eighteen meters high, the temple was rebuilt three times before being burned down by Herostratus in 356 BCE."
      },
      {
        q: "Which UNESCO-inscribed ancient Carian city in southwestern Turkey was dedicated to the goddess of love, renowned for its supreme marble sculpting school and 30,000-seat stadium?",
        correct: "Aphrodisias",
        w1: "Sagalassos",
        w2: "Halicarnassus",
        exp: "Located near rich white and gray marble quarries on Mount Baba Dağ, Aphrodisias features the monumental Sebasteion imperial cult temple and an intact Roman stadium."
      }
    ],
    number: {
      q: "How many monumental marble columns supported the ancient Temple of Artemis in Ephesus, one of the Seven Wonders of the Ancient World?",
      target: 127,
      unit: "columns",
      imperial: "127 marble columns",
      exp: "Ancient accounts confirm the Temple of Artemis was supported by 127 ionic marble columns, each standing eighteen meters tall."
    }
  },

  // Cycle 4: Mount Ararat, Lake Van & Eastern Anatolia
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Turkey, a massive dormant snow-capped volcano rising 5,137 meters in the Armenian Highlands, biblical landing site of Noah Ark?",
        correct: "Mount Ararat Ağrı Dağı",
        w1: "Mount Süphan",
        w2: "Mount Erciyes",
        exp: "Mount Ararat is a compound stratovolcano comprising Greater Ararat (5,137 m) and Little Ararat (3,896 m), towering over the borders of Turkey, Armenia, and Iran."
      },
      {
        q: "What is the largest lake in Turkey, a massive 3,755-square-kilometer endorheic soda lake located at an elevation of 1,640 meters in Eastern Anatolia?",
        correct: "Lake Van Van Gölü",
        w1: "Lake Tuz",
        w2: "Lake Beyşehir",
        exp: "Lake Van is highly alkaline (saline and rich in sodium carbonate), where only one fish species, the endemic Pearl Mullet (İnci Kefali), can survive."
      },
      {
        q: "Which island in Lake Van is home to the 10th-century Armenian Holy Cross Cathedral, celebrated for elaborate external stone relief carvings of biblical stories?",
        correct: "Akdamar Island Aghtamar",
        w1: "Kuş Island",
        w2: "Çarpanak Island",
        exp: "Built by King Gagik I of the Artsruni Dynasty between 915 and 921 CE, the cathedral features stone carvings of Jonah and the Whale and David and Goliath."
      },
      {
        q: "What ruined medieval Armenian capital near Kars on the Turkish-Armenian border is called the City of 1,001 Churches for its preserved stone architectural ruins?",
        correct: "Ani",
        w1: "Kars Citadel",
        w2: "Doğubayazıt",
        exp: "Located on a triangular promontory above the Akhurian River gorge, UNESCO-listed Ani was a flourishing Silk Road metropolis of over 100,000 people in the 11th century."
      },
      {
        q: "Which spectacular 18th-century cliffside palace complex in Doğubayazıt near Mount Ararat blends Ottoman, Persian, and Armenian architectural styles?",
        correct: "Ishak Pasha Palace İshak Paşa Sarayı",
        w1: "Topkapı Palace",
        w2: "Dolmabahçe Palace",
        exp: "Built over ninety-nine years on a Silk Road pass, the palace was legendary for having one of the earliest central heating and sewer systems in the region."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Mount Ararat (Ağrı Dağı), the highest mountain in Turkey?",
      target: 5137,
      unit: "meters",
      imperial: "16,854 feet",
      exp: "Mount Ararat in eastern Turkey stands at an official elevation of 5,137 meters above sea level."
    }
  },

  // Cycle 5: The Mediterranean Turquoise Coast & Lycian Way
  {
    mcqs: [
      {
        q: "What famous 540-kilometer scenic waymarked long-distance hiking trail follows the coastal cliffs of ancient Lycia between Fethiye and Antalya?",
        correct: "The Lycian Way Likya Yolu",
        w1: "The Carian Trail",
        w2: "The Saint Paul Trail",
        exp: "Pioneered in 1999 by British-Turkish trekker Kate Clow, the Lycian Way passes ancient ruins, secluded turquoise coves, and the eternal flames of the Chimaera."
      },
      {
        q: "Which sheltered turquoise beach and lagoon near Fethiye is famous as a world capital for tandem paragliding flights launching from the 1,969-meter summit of Mount Babadağ?",
        correct: "Ölüdeniz Blue Lagoon",
        w1: "Kaputaş Beach",
        w2: "İztuzu Beach",
        exp: "Ölüdeniz (meaning 'Dead Sea' for its calm waters) is protected as a national nature reserve, where paragliders soar over the white sand spit."
      },
      {
        q: "Which 18-kilometer white sand beach near Kalkan is one of the longest continuous sandy beaches in the Mediterranean and the birthplace of Saint Nicholas (Santa Claus)?",
        correct: "Patara Beach",
        w1: "Cleopatra Beach",
        w2: "Lara Beach",
        exp: "Patara was the maritime capital of the ancient Lycian League, home to the world oldest intact parliament building (Bouleuterion) and Loggerhead sea turtle nesting dunes."
      },
      {
        q: "What dramatic 4th-century BCE Lycian monumental rock-cut temple tombs are carved high into the vertical limestone river cliffs overlooking the town of Dalyan?",
        correct: "Rock Tombs of Kaunos",
        w1: "Myra Tombs",
        w2: "Tlos Tombs",
        exp: "Carved into the cliff face with Hellenistic temple facades, Lycians believed winged mythological creatures transported the souls of the dead to the afterlife."
      },
      {
        q: "Which sunken ancient Lycian city on the island of Kekova can be seen through crystal-clear turquoise waters following an earthquake in the 2nd century CE?",
        correct: "Sunken City of Simena Kekova",
        w1: "Phaselis",
        w2: "Arycanda",
        exp: "Protected from swimming to preserve the archaeological ruins, boaters and kayakers can observe submerged stone stairs, amphorae, and foundations underwater."
      }
    ],
    number: {
      q: "What is the approximate total distance in kilometers of the historic Lycian Way coastal trekking trail in southwestern Turkey?",
      target: 540,
      unit: "kilometers",
      imperial: "335 miles",
      exp: "The Lycian Way footpath covers roughly 540 kilometers from Fethiye to Geyikbayırı near Antalya."
    }
  },

  // Cycle 6: The Black Sea Coast, Pontic Alps & Tea Highlands
  {
    mcqs: [
      {
        q: "Which iconic 4th-century Greek Orthodox monastery in Trabzon perches precariously on a sheer 300-meter cliff above the Altındere Valley in the Pontic Mountains?",
        correct: "Sumela Monastery Panagia Soumela",
        w1: "Vazelon Monastery",
        w2: "Kuştul Monastery",
        exp: "Sumela was founded by monks Barnabas and Sophronios, famous for its Rock Church decorated with vibrant Byzantine frescoes depicting the Dormition of the Virgin."
      },
      {
        q: "Which province on the eastern Black Sea coast of Turkey produces nearly all of the country tea, making Turkey the world highest per-capita consumer of tea (çay)?",
        correct: "Rize",
        w1: "Trabzon",
        w2: "Artvin",
        exp: "Turkish tea cultivation was pioneered in Rize in the 1930s under agriculturalist Zihni Derin, where steep misty hillsides are terraced with Camellia sinensis bushes."
      },
      {
        q: "What high mountain range parallel to the Black Sea coast of northern Turkey features Mount Kaçkar (3,937 m) and lush alpine pastures (yaylas)?",
        correct: "Pontic Mountains Kaçkar Mountains",
        w1: "Taurus Mountains",
        w2: "Zagros Mountains",
        exp: "The Kaçkar Mountains feature glaciated alpine lakes, rhododendron forests, and traditional wooden chalets where locals celebrate summer highland festivals (yaylas)."
      },
      {
        q: "Which serene mountain lake surrounded by dense evergreen pine forests and mist-covered peaks is a major ecotourism icon in Trabzon Province?",
        correct: "Uzungöl Long Lake",
        w1: "Lake Abant",
        w2: "Lake Borçka Karagöl",
        exp: "Uzungöl was formed when a landslide dammed the Haldizen river stream in the Pontic Alps, crowned by a picturesque white minaret mosque at its shore."
      },
      {
        q: "Which coastal region in Turkey has a humid subtropical oceanic climate characterized by high year-round precipitation and dense temperate rainforests?",
        correct: "Black Sea Region Karadeniz",
        w1: "Aegean Region",
        w2: "Mediterranean Region",
        exp: "Karadeniz receives up to 2,500 mm of annual rainfall, producing ninety percent of Turkey hazelnuts and sustaining lush mountain vegetation."
      }
    ],
    number: {
      q: "What is the approximate elevation in meters above sea level of the historic Sumela Monastery clinging to the cliff in Trabzon?",
      target: 1200,
      unit: "meters",
      imperial: "3,937 feet above sea level",
      exp: "Sumela Monastery sits at approximately 1,200 meters above sea level on the steep cliff face of the Zigana Mountain range."
    }
  },

  // Cycle 7: Southeastern Anatolia, Göbekli Tepe & Headwaters
  {
    mcqs: [
      {
        q: "Which UNESCO World Heritage archaeological site near Şanlıurfa contains monumental T-shaped carved limestone pillars dating back to 9500 BCE, recognized as the world oldest known temple complex?",
        correct: "Göbekli Tepe",
        w1: "Karahan Tepe",
        w2: "Çatalhöyük",
        exp: "Predating Stonehenge by 6,000 years, Göbekli Tepe was built by hunter-gatherers and features intricate bas-relief animal carvings of lions, bulls, foxes, and vultures."
      },
      {
        q: "Which 2,134-meter mountain in Adıyaman Province features a colossal 1st-century BCE royal tomb sanctuary surrounded by eight-meter-tall stone statues of Greek and Persian gods?",
        correct: "Mount Nemrut Nemrut Dağı",
        w1: "Mount Hasan",
        w2: "Mount Cudi",
        exp: "Built by King Antiochus I of Commagene, the summit tumulus is flanked by terrace statues of Zeus, Apollo, Heracles, and Antiochus whose giant stone heads sit on the ground."
      },
      {
        q: "Which two historic rivers, the lifeblood of ancient Mesopotamia, originate in the high mountains of Eastern and Southeastern Turkey before flowing into Iraq and Syria?",
        correct: "Tigris and Euphrates",
        w1: "Jordan and Litani",
        w2: "Nile and Atbara",
        exp: "The Euphrates (Fırat) and Tigris (Dicle) are harnessed in Turkey by the massive Southeastern Anatolia Project (GAP), including the colossal Atatürk Dam."
      },
      {
        q: "Which ancient Neolithic settlement in Konya Province, inhabited between 7100 and 5700 BCE, is famous for dense mudbrick houses entered exclusively through roof ladders?",
        correct: "Çatalhöyük",
        w1: "Hacılar",
        w2: "Aşıklı Höyük",
        exp: "Çatalhöyük is one of the world earliest proto-cities, renowned for plaster wall murals, bull skull shrines (bucrania), and clay figurines of the Seated Mother Goddess."
      },
      {
        q: "Which historic city in southeastern Turkey overlooking the Mesopotamian plains is world-renowned for terraced golden limestone houses, Syriac Orthodox monasteries, and madrasas?",
        correct: "Mardin",
        w1: "Diyarbakır",
        w2: "Gaziantep",
        exp: "Mardin is a cultural mosaic of Turkish, Kurdish, Arab, and Assyrian heritage, home to the 5th-century Deyrulzafaran (Saffron) Monastery."
      }
    ],
    number: {
      q: "Approximately how many years BCE was the world oldest megalithic temple sanctuary, Göbekli Tepe, constructed in southeastern Turkey?",
      target: 9500,
      unit: "BCE",
      imperial: "9500 BC (over 11,500 years ago)",
      exp: "Archaeological excavations led by Klaus Schmidt confirm Göbekli Tepe was constructed around 9500 BCE during the Pre-Pottery Neolithic A period."
    }
  },

  // Cycle 8: Central Anatolia, Ankara & Hittite Capital
  {
    mcqs: [
      {
        q: "Which planned city in Central Anatolia became the national capital of the modern Republic of Turkey in 1923, replacing Istanbul?",
        correct: "Ankara",
        w1: "İzmir",
        w2: "Bursa",
        exp: "Chosen by Mustafa Kemal Atatürk for its secure central location, Ankara grew from an ancient citadel town (Ancyra) into a metropolis of six million residents."
      },
      {
        q: "What monumental neoclassical and Seljuk-inspired complex in Ankara is the mausoleum of Mustafa Kemal Atatürk, founder and first President of Turkey?",
        correct: "Anıtkabir",
        w1: "Çankaya Mansion",
        w2: "Kocatepe",
        exp: "Completed in 1953, Anıtkabir features the 262-meter Road of Lions, ceremonial courtyards, and a 42-ton marble sarcophagus honoring Atatürk."
      },
      {
        q: "Which ancient city in Çorum Province was the capital of the Bronze Age Hittite Empire, famous for the monumental Lion Gate and the cuneiform Treaty of Kadesh?",
        correct: "Hattusa Hattusha",
        w1: "Kanesh",
        w2: "Gordion",
        exp: "UNESCO-inscribed Hattusa was enclosed by six kilometers of massive stone fortifications, home to the Yazılıkaya open-air rock sanctuary of sixty Hittite deities."
      },
      {
        q: "What massive 1,665-square-kilometer endorheic lake in Central Anatolia is the second largest lake in Turkey, drying in summer into a brilliant pink-and-white salt crust?",
        correct: "Lake Tuz Tuz Gölü",
        w1: "Lake Beyşehir",
        w2: "Lake Eğirdir",
        exp: "Lake Tuz supplies sixty percent of Turkey industrial salt, hosting large breeding colonies of greater flamingos that feed on pink algae in the hypersaline brine."
      },
      {
        q: "Which historic city in Central Anatolia was the capital of the Seljuk Sultanate of Rum and the resting place of 13th-century Sufi mystic poet Jalal al-Din Rumi (Mevlana)?",
        correct: "Konya",
        w1: "Kayseri",
        w2: "Sivas",
        exp: "Konya is the spiritual home of the Mevlevi Order and the UNESCO-inscribed Whirling Dervishes (Sema ceremony), who spin into transcendent spiritual ecstasy."
      }
    ],
    number: {
      q: "In what year was the city of Ankara officially declared the capital of the newly established Republic of Turkey?",
      target: 1923,
      unit: "year",
      imperial: "1923 AD",
      exp: "The Grand National Assembly officially proclaimed Ankara as the capital of Turkey on October 13, 1923, preceding the formal declaration of the Republic."
    }
  },

  // Cycle 9: Turkish Agriculture, Hazelnuts & Gastronomy
  {
    mcqs: [
      {
        q: "What percentage of the world total commercial hazelnut supply is produced along the steep, rainy Black Sea coastal slopes of Turkey (around Giresun and Ordu)?",
        correct: "70 Percent",
        w1: "45 Percent",
        w2: "90 Percent",
        exp: "Turkey is the undisputed global leader in hazelnut farming, supplying confectioneries worldwide including Nutella and Ferrero Rocher."
      },
      {
        q: "Which southeastern Turkish city is recognized as the culinary capital of Turkish pistachio cultivation (Antep fıstığı) and masterwork 40-layer butter baklava?",
        correct: "Gaziantep Antep",
        w1: "Adana",
        w2: "Urfa",
        exp: "Designated a UNESCO Creative City of Gastronomy, Gaziantep uses thin hand-rolled phyllo dough, emerald green pistachios, and hot sugar syrup to craft legendary baklava."
      },
      {
        q: "What traditional Turkish starch-and-sugar confection, known locally as Lokum, is flavored with rosewater, mastic, bergamot, or pistachios and dusted with powdered sugar?",
        correct: "Turkish Delight Lokum",
        w1: "Halva",
        w2: "Künefe",
        exp: "Created in Istanbul in the late 18th century by confectioner Hacı Bekir, Turkish Delight became a favorite sweet of Ottoman sultans and European travelers."
      },
      {
        q: "Which Aegean province in western Turkey is the world largest producer and exporter of sweet sun-dried Smyrna figs (Sarılop variety)?",
        correct: "Aydın",
        w1: "Muğla",
        w2: "Manisa",
        exp: "The fertile Büyük Menderes River valley in Aydın provides optimal Mediterranean sunshine and breezes to dry thin-skinned honeyed figs naturally on orchards."
      },
      {
        q: "What rich, layered sweet dessert made of spun shredded kadayıf pastry soaked in sweet syrup and filled with melted stretchy unsalted cheese is a specialty of Hatay?",
        correct: "Künefe Knafeh",
        w1: "Baklava",
        w2: "Revani",
        exp: "Baked in shallow copper plates over charcoal embers and topped with crushed pistachios, Antakya Künefe holds European Union Protected Geographical Indication (PGI) status."
      }
    ],
    number: {
      q: "What percentage of the world entire commercial hazelnut production is grown along the Black Sea coast of Turkey?",
      target: 70,
      unit: "percent",
      imperial: "70% of global hazelnuts",
      exp: "Turkey produces approximately 70 percent of the world's commercial hazelnuts, harvesting over 600,000 metric tons annually."
    }
  },

  // Cycle 10: Extent, 81 Provinces & Geopolitical Superlatives
  {
    mcqs: [
      {
        q: "What 4.6-kilometer suspension bridge across the Dardanelles Strait opened in 2022, holding the world record for the longest central suspension bridge span at 2,023 meters?",
        correct: "1915 Çanakkale Bridge",
        w1: "Akashi Kaikyo Bridge",
        w2: "Bosphorus Bridge",
        exp: "The span length of 2,023 meters commemorates the centenary of the founding of the Turkish Republic in 1923, linking European Thrace with Asian Anatolia."
      },
      {
        q: "Into how many administrative provinces (İller) is the Republic of Turkey divided?",
        correct: "81 Provinces",
        w1: "67 Provinces",
        w2: "90 Provinces",
        exp: "Turkey consists of eighty-one provinces grouped into seven traditional geographical regions: Marmara, Aegean, Mediterranean, Central Anatolia, Black Sea, East, and Southeast."
      },
      {
        q: "How many sovereign nations share a direct terrestrial land border with Turkey (Greece, Bulgaria, Georgia, Armenia, Azerbaijan, Iran, Iraq, Syria)?",
        correct: "8 Countries",
        w1: "6 Countries",
        w2: "10 Countries",
        exp: "Turkey land borders stretch 2,648 kilometers across three regions: Southeast Europe, the South Caucasus, and the Middle East."
      },
      {
        q: "What percentage of Turkey total geographical landmass is situated in Asia (Anatolia/Asia Minor), with the remaining three percent in Europe (East Thrace)?",
        correct: "97 Percent in Asia",
        w1: "80 Percent in Asia",
        w2: "50 Percent in Asia",
        exp: "Anatolia forms ninety-seven percent of Turkey (755,688 sq km), while East Thrace in southeastern Europe covers 23,764 square kilometers."
      },
      {
        q: "What 61-kilometer narrow natural waterway connects the Aegean Sea to the Sea of Marmara, site of the historic World War I 1915 Gallipoli Campaign?",
        correct: "The Dardanelles Strait Çanakkale Boğazı",
        w1: "The Bosphorus",
        w2: "The Corinth Strait",
        exp: "Known as the Hellespont in classical antiquity where Leander swam to Hero, the Dardanelles was contested during the epic 1915 naval and land battles of Gallipoli."
      }
    ],
    number: {
      q: "What is the central main suspension span in meters of the 1915 Çanakkale Bridge, the longest suspension bridge span in the world?",
      target: 2023,
      unit: "meters",
      imperial: "6,637 feet central span",
      exp: "The 1915 Çanakkale Bridge features a world-record central span of exactly 2,023 meters, surpassing Japan's Akashi Kaikyo Bridge."
    }
  }
];

// Build Turkey Quiz
buildQuiz({
  id: 'turkey-geography-heritage-60',
  theme: 'Turkey: Geography, The Bosphorus & Ancient Anatolia',
  title: 'Turkey: Geography, The Bosphorus & Ancient Anatolia',
  description: 'A 60-question grand master assessment exploring the Bosphorus & Hagia Sophia, Cappadocia fairy chimneys, Pamukkale & Ephesus, Mount Ararat (5,137 m), the Lycian Way, Sumela Monastery, Göbekli Tepe (9500 BCE), Ankara, and the Dardanelles.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, turkeyCycles);

console.log('Turkey quiz built successfully!');
