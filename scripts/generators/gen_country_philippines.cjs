const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 4. philippines-geography-heritage-60
// =========================================================================
const philippinesCycles = [
  // Cycle 1: The Philippine Archipelago & 7,641 Islands
  {
    mcqs: [
      {
        q: "According to official nationwide hydrographic maritime mapping surveys by NAMRIA, exactly how many natural islands comprise the Philippine archipelago?",
        correct: "7,641 Islands",
        w1: "7,107 Islands",
        w2: "6,500 Islands",
        exp: "In 2016, high-resolution satellite radar mapping discovered 534 previously uncounted islands and islets, raising the official count from 7,107 to 7,641."
      },
      {
        q: "Into which three major geographical island groups is the Philippine archipelago traditionally divided from north to south?",
        correct: "Luzon, Visayas, and Mindanao",
        w1: "Luzon, Palawan, and Sulu",
        w2: "Mindanao, Panay, and Samar",
        exp: "Represented by the three golden five-pointed stars on the national flag of the Philippines, Luzon is the largest, Visayas is the central group, and Mindanao is the south."
      },
      {
        q: "What massive marine ecosystem region surrounding the Philippines, Indonesia, and Malaysia contains over seventy-five percent of all known coral species on Earth?",
        correct: "The Coral Triangle",
        w1: "The Great Barrier Reef",
        w2: "The Mesoamerican Reef",
        exp: "The Verde Island Passage between Luzon and Mindoro is described by marine biologists as the 'Center of the Center of Marine Shorefish Biodiversity on Earth'."
      },
      {
        q: "What poetic title for the Philippine archipelago was popularized by national hero and martyr José Rizal in his patriotic farewell poem Mi último adiós?",
        correct: "Pearl of the Orient Seas Perla del Mar de Oriente",
        w1: "Emerald of the Equator",
        w2: "Isles of Gold",
        exp: "Rizal wrote the 14-stanza poem on the eve of his execution at Bagumbayan (Luneta) on December 30, 1896, celebrating his homeland beauty."
      },
      {
        q: "What is the total combined coastline length of the Philippine archipelago in kilometers, making it the fifth longest coastline in the world?",
        correct: "Over 36,289 Kilometers",
        w1: "15,000 Kilometers",
        w2: "22,000 Kilometers",
        exp: "With 7,641 islands, the intricate bays, coves, and coral beaches of the Philippines give it more coastline than the entire contiguous United States."
      }
    ],
    number: {
      q: "What is the official total number of surveyed natural islands that comprise the Philippine archipelago?",
      target: 7641,
      unit: "islands",
      imperial: "7,641 islands (over 2,000 inhabited)",
      exp: "The Philippine archipelago officially consists of 7,641 islands covering 300,000 square kilometers."
    }
  },

  // Cycle 2: Manila, Intramuros & Colonial Heritage
  {
    mcqs: [
      {
        q: "What capital city of the Philippines, situated on the eastern shore of Manila Bay at the mouth of the Pasig River, was founded by Miguel López de Legazpi in 1571?",
        correct: "Manila Maynila",
        w1: "Quezon City",
        w2: "Cebu City",
        exp: "Derived from the Tagalog phrase May-nilad (meaning 'where indigo-flowered mangrove trees thrive'), Metro Manila is one of the most densely populated urban regions on Earth."
      },
      {
        q: "What 0.67-square-kilometer historic Spanish fortified walled city in Manila, meaning 'Within the Walls', served as the seat of the Spanish East Indies for over three centuries?",
        correct: "Intramuros",
        w1: "Binondo",
        w2: "Quiapo",
        exp: "Protected by thick stone ramparts, drawbridges, and moats, Intramuros houses Manila Cathedral, Casa Manila, and the historic citadel Fort Santiago."
      },
      {
        q: "What monumental stone church inside Intramuros, completed in 1607, is the oldest stone church in the Philippines and a UNESCO World Heritage Baroque Church?",
        correct: "San Agustin Church",
        w1: "Manila Cathedral",
        w2: "Quiapo Church",
        exp: "San Agustin survived seven major earthquakes and the 1945 Battle of Manila, featuring trompe-l'œil ceiling frescoes and the tomb of Miguel López de Legazpi."
      },
      {
        q: "What 250-year historic trans-Pacific trade route (1565 to 1815) used massive wooden sailing ships to exchange Chinese silks, porcelain, and spices in Manila for Mexican silver in Acapulco?",
        correct: "The Manila-Acapulco Galleon Trade",
        w1: "The Spice Route",
        w2: "The Silk Road",
        exp: "Connecting Asia, the Americas, and Europe for two and a half centuries, the galleons represented the very first true global trade network in human history."
      },
      {
        q: "What historic neighborhood in Manila, established in 1594 by Spanish Governor Gómez Pérez Dasmariñas for Catholic Chinese immigrants, is the oldest Chinatown in the world?",
        correct: "Binondo",
        w1: "Tondo",
        w2: "San Nicolas",
        exp: "Binondo is famous for authentic Chinese-Filipino bakeries selling hopia pastries, herbal apothecaries, and the minor basilica of Saint Lorenzo Ruiz."
      }
    ],
    number: {
      q: "In what year did Spanish conquistador Miguel López de Legazpi formally establish Manila as the colonial capital of the Philippines?",
      target: 1571,
      unit: "year",
      imperial: "1571 AD",
      exp: "Legazpi proclaimed Manila the capital of the Spanish East Indies on June 24, 1571."
    }
  },

  // Cycle 3: Banaue Rice Terraces & The Cordilleras
  {
    mcqs: [
      {
        q: "What monumental 2,000-year-old agricultural wonders in the Cordillera Central mountains of northern Luzon were hand-carved into sheer mountain slopes by the indigenous Ifugao people?",
        correct: "The Banaue Rice Terraces Hagdan-hagdang Palayan ng Banawe",
        w1: "Batad Rice Terraces",
        w2: "Mayoyao Terraces",
        exp: "Celebrated as the Eighth Wonder of the World, the stone and mud-walled terraces climb up to 1,500 meters altitude, fed by ancient mountain rainforest gravity irrigation streams."
      },
      {
        q: "Approximately how many thousands of years ago did the ancestors of the Ifugao people begin constructing the spectacular mountain rice terraces in Ifugao Province?",
        correct: "2,000 Years Ago",
        w1: "500 Years Ago",
        w2: "1,000 Years Ago",
        exp: "Built largely with bare hands and stone tools before the arrival of Europeans, the interconnected terraces if placed end-to-end would circle halfway around the globe."
      },
      {
        q: "Which specific UNESCO World Heritage rice terrace cluster in Ifugao is famous for forming a colossal, breathtaking natural amphitheater of emerald-green terraces surrounding a village?",
        correct: "Batad Rice Terraces",
        w1: "Bangaan Terraces",
        w2: "Hungduan Terraces",
        exp: "Batad requires a steep mountain hike down to the amphitheater basin, celebrated for the roaring Tappiya Waterfall plunging into a deep jungle pool."
      },
      {
        q: "What sacred carved wooden humanoid figures, representing ancestral rice gods, are placed by Ifugao shamans in rice granaries to ensure bountiful harvest and protection against pests?",
        correct: "Bulul Bul-ul",
        w1: "Manunggul",
        w2: "Lingling-o",
        exp: "Carved from narra or ipil hardwood and consecrated through animal sacrifices, Bulul statues are paired male and female figures seated with arms crossed over knees."
      },
      {
        q: "What mountain town in Sagada, Mountain Province, is famous for the ancient Igorot funeral tradition of hanging wooden coffins high on sheer limestone canyon cliffs?",
        correct: "The Hanging Coffins of Sagada",
        w1: "Kabayan Mummies",
        w2: "Bontoc Caves",
        exp: "The Igorot believed that placing deceased elders high up on cliffs brought their spirits closer to their ancestral gods and protected bodies from floods and wild animals."
      }
    ],
    number: {
      q: "Approximately how many thousands of years old are the historic mountain rice terraces hand-carved by the Ifugao people in the Cordilleras of the Philippines?",
      target: 2,
      unit: "thousand years old",
      imperial: "2,000+ years old",
      exp: "Archaeological and cultural records confirm the Ifugao rice terraces have been continuously cultivated for over 2,000 years."
    }
  },

  // Cycle 4: Chocolate Hills & Bohol's Wonders
  {
    mcqs: [
      {
        q: "What extraordinary geological formation in Bohol Province features over 1,770 symmetrical, conical karst limestone hills that turn a uniform cocoa-brown color during the dry season?",
        correct: "The Chocolate Hills Mga Tsokolateng Burol",
        w1: "The Haycock Hills",
        w2: "The Osmeña Peak",
        exp: "Ranging from thirty to fifty meters in height across fifty square kilometers, the hills were formed by the weathering of marine coral limestone uplifted from the ocean floor."
      },
      {
        q: "How many conical limestone dome hills are estimated to cover the landscape across the municipalities of Carmen, Batuan, and Sagbayan in Bohol?",
        correct: "Over 1,770 Hills",
        w1: "500 Hills",
        w2: "1,000 Hills",
        exp: "Declared the country third National Geological Monument, government surveys have counted between 1,776 and 1,790 individual hills."
      },
      {
        q: "What tiny, nocturnal primate species endemic to the southern Philippines (measuring just twelve centimeters with giant eyes larger than its brain) is protected in Bohol sanctuaries?",
        correct: "Philippine Tarsier Carlito syrichta (Mawmag)",
        w1: "Slow Loris",
        w2: "Pygmy Marmoset",
        exp: "Tarsiers can rotate their heads 180 degrees in either direction and leap up to five meters between trees, highly sensitive to noise and light."
      },
      {
        q: "What scenic river cruise in Bohol takes visitors aboard motorized floating catamaran restaurants through lush coconut palm valleys while enjoying local buffets and folk music?",
        correct: "Loboc River Cruise",
        w1: "Abatan River",
        w2: "Inabanga River",
        exp: "The cruise passes Busay Falls, stopping at floating riverside platforms where local villagers perform traditional Tinikling bamboo dances."
      },
      {
        q: "What famous karst limestone cave on Panglao Island in Bohol features a naturally illuminated subterranean freshwater pool beneath hanging stalactites?",
        correct: "Hinagdanan Cave",
        w1: "Calbiga Cave",
        w2: "Sohoton Cave",
        exp: "Hinagdanan (meaning 'Laddered' in Cebuano) was discovered accidentally by a local farmer clearing land, featuring sunlight streaming through holes in the cave ceiling."
      }
    ],
    number: {
      q: "What is the approximate total number of conical limestone hills comprising the Chocolate Hills geological monument in Bohol, Philippines?",
      target: 1770,
      unit: "hills",
      imperial: "1,770+ symmetrical hills",
      exp: "Geologists have mapped at least 1,776 individual conical karst hills across Bohol."
    }
  },

  // Cycle 5: Subterranean River & Palawan Paradise
  {
    mcqs: [
      {
        q: "What UNESCO World Heritage and New 7 Wonders of Nature site in Palawan features an 8.2-kilometer navigable underground river flowing through massive karst limestone caverns directly into the South China Sea?",
        correct: "Puerto Princesa Subterranean River",
        w1: "Underground River of Coron",
        w2: "Hinatuan Enchanted River",
        exp: "Featuring dramatic stalactites, bats, and a 360-meter Italian chamber (one of the largest cave rooms in the world), paddle boats guide visitors along the first 4.3 kilometers."
      },
      {
        q: "What is the total navigable length in kilometers of the Puerto Princesa Subterranean River flowing beneath Saint Paul Mountain in Palawan?",
        correct: "8.2 Kilometers",
        w1: "4.5 Kilometers",
        w2: "15.0 Kilometers",
        exp: "Until the 2007 discovery of Mexico subterranean river in Yucatán, Puerto Princesa was recognized as the longest underground river on Earth."
      },
      {
        q: "What world-famous tropical resort municipality on the northern tip of Palawan is renowned for towering black limestone karst cliffs, hidden beaches, and the Bacuit Archipelago lagoons?",
        correct: "El Nido",
        w1: "San Vicente",
        w2: "Coron",
        exp: "El Nido (meaning 'The Nest' in Spanish) is named for the edible nests of swiftlets (collocalia) harvested from sheer limestone cliff crevices for bird nest soup."
      },
      {
        q: "Which island municipality in the Calamian Islands of Palawan is world-renowned among scuba divers for twelve exceptionally preserved sunken Japanese naval supply shipwrecks from a 1944 WWII US air strike?",
        correct: "Coron Busuanga",
        w1: "Cuyo",
        w2: "Culion",
        exp: "Coron Bay shipwrecks (such as the 140-meter Akitsushima and Irako) lie at recreational dive depths surrounded by coral reefs and Kayangan Lake (cleanest lake in Asia)."
      },
      {
        q: "What pristine UNESCO World Heritage marine sanctuary in the middle of the Sulu Sea covers 97,030 hectares of pristine coral atolls hosting hammerhead sharks and manta rays?",
        correct: "Tubbataha Reefs Natural Park",
        w1: "Apo Reef",
        w2: "Dauin Marine Sanctuary",
        exp: "Tubbataha comprises two massive coral atolls (North and South) and Jessie Beazley Reef, accessible to liveaboard dive vessels only between March and June."
      }
    ],
    number: {
      q: "What is the total surveyed length in kilometers of the Puerto Princesa Subterranean River in Palawan, Philippines?",
      target: 8,
      unit: "kilometers",
      imperial: "5.1 miles (8.2 km long)",
      exp: "The underground river measures 8.2 kilometers (rounded to 8 km) from its mountain source to the sea."
    }
  },

  // Cycle 6: Mayon Volcano & Active Stratovolcanoes
  {
    mcqs: [
      {
        q: "What world-famous active stratovolcano in Albay Province, rising 2,463 meters above the Bicol Region, is celebrated worldwide for its extraordinarily perfect symmetrical conical shape?",
        correct: "Mayon Volcano Bulkang Mayon",
        w1: "Mount Pinatubo",
        w2: "Taal Volcano",
        exp: "Revered in Bicolano mythology as the burial mound of the tragic maiden Daragang Magayon (Beautiful Lady), Mayon is the most active volcano in the Philippines with over fifty recorded eruptions."
      },
      {
        q: "In what catastrophic year did Mayon Volcano unleash its deadliest recorded eruption, burying the entire town of Cagsawa under pyroclastic flows and leaving only the stone Franciscan church belfry standing?",
        correct: "1814",
        w1: "1897",
        w2: "1993",
        exp: "On February 1, 1814, volcanic tephra and lahar killed over 1,200 people, leaving the iconic Cagsawa Ruins belfry framed against the conical volcano."
      },
      {
        q: "What complex volcano in Batangas Province, situated on an island within Lake Taal, is the second most active volcano in the Philippines and historically famous for having an island within a lake on an island within a lake?",
        correct: "Taal Volcano Bulkang Taal",
        w1: "Mount Bulusan",
        w2: "Mount Kanlaon",
        exp: "Taal Crater Lake contained Vulcan Point (a tiny rock islet), forming a nested island-lake geological phenomenon before the massive January 2020 explosive eruption."
      },
      {
        q: "Which volcano in Zambales, Luzon, erupted on June 15, 1991, in the second largest terrestrial volcanic eruption of the 20th century, ejecting ten billion tons of magma into the stratosphere?",
        correct: "Mount Pinatubo",
        w1: "Mayon Volcano",
        w2: "Mount Hibok-Hibok",
        exp: "Pinatubo sulfur dioxide aerosol cloud cooled global surface temperatures by 0.5°C for two years, transforming its summit into a turquoise crater lake."
      },
      {
        q: "What active stratovolcano on Negros Island, rising 2,465 meters, is the highest mountain in the Visayas and the center of Mount Kanlaon Natural Park?",
        correct: "Mount Kanlaon Canlaon",
        w1: "Mount Talinis",
        w2: "Mount Madjaas",
        exp: "Kanlaon is a holy mountain in Visayan mythology, sacred to the supreme deity Kan-Laon, featuring hot mineral springs like Mambucal Springs."
      }
    ],
    number: {
      q: "In what historic year did Mayon Volcano unleash the catastrophic eruption that buried the town of Cagsawa, creating the iconic Cagsawa Ruins?",
      target: 1814,
      unit: "year",
      imperial: "1814 AD",
      exp: "Mayon's most violent recorded eruption occurred on February 1, 1814."
    }
  },

  // Cycle 7: Jeepneys, Filipino Culture & Bayanihan
  {
    mcqs: [
      {
        q: "What colorful, flamboyant public transit vehicles, known as the King of the Road, were originally created after World War II by converting surplus US military Willys Jeeps?",
        correct: "Jeepneys Dyip",
        w1: "Tricycles",
        w2: "Habal-Habal",
        exp: "Crafted by coachbuilders like Sarao Motors, jeepneys feature elongated rear bench seats, chrome hood horses, airbrushed religious murals, and neon dashboard lights."
      },
      {
        q: "In which decade following the end of World War II were the first surplus American military jeeps converted into passenger Jeepneys in Manila?",
        correct: "1940s",
        w1: "1960s",
        w2: "1970s",
        exp: "When American forces left hundreds of surplus military Jeeps in the Philippines in 1945, ingenious Filipino mechanics transformed them into cheap mass public transportation."
      },
      {
        q: "What traditional Filipino cultural spirit of communal unity and mutual cooperation is famously depicted by villagers collectively lifting and carrying a neighbor bamboo nipa hut (bahay kubo) on their shoulders?",
        correct: "Bayanihan",
        w1: "Pakikisama",
        w2: "Utang na Loob",
        exp: "Derived from bayan (town/nation), Bayanihan represents community members coming together voluntarily to help neighbors in need without expecting monetary payment."
      },
      {
        q: "What traditional Filipino military-style communal feast involves piling mountains of garlic rice, grilled pork belly (liempo), seafood, and fruits directly onto fresh banana leaves to be eaten by hand (kamayan)?",
        correct: "Boodle Fight",
        w1: "Fiesta",
        w2: "Kusina",
        exp: "Originating in the Philippine Armed Forces as a symbol of camaraderie, diners stand side-by-side eating without plates or utensils in a joyful free-for-all."
      },
      {
        q: "What famous and polarizing Filipino street food delicacy consists of a fertilized developing duck egg embryo (incubated for fourteen to eighteen days), boiled and eaten straight from the shell with salt and chili vinegar?",
        correct: "Balut",
        w1: "Penoy",
        w2: "Kwek-Kwek",
        exp: "Sold nightly by street hawkers shouting 'Baluuuut!', eaters sip the warm savory broth from the cracked shell before seasoning the embryo and yolk."
      }
    ],
    number: {
      q: "In which decade did Filipino mechanics first begin converting surplus US military Willys jeeps into iconic passenger Jeepneys?",
      target: 1940,
      unit: "decade",
      imperial: "1940s (1945 post-WWII)",
      exp: "The Jeepney was born in the late 1940s (around 1945) immediately following the liberation of the Philippines."
    }
  },

  // Cycle 8: Filipino Gastronomy: Adobo & Lechon
  {
    mcqs: [
      {
        q: "What is widely regarded as the unofficial National Dish of the Philippines, consisting of pork or chicken braised in a savory marinade of cane vinegar, soy sauce, garlic, bay leaves, and black peppercorns?",
        correct: "Philippine Adobo",
        w1: "Sinigang",
        w2: "Kare-Kare",
        exp: "Derived from the Spanish adobar (to marinate), the indigenous cooking method using acidic cane vinegar was used by early Filipinos to preserve meat in tropical climates."
      },
      {
        q: "What celebratory Philippine centerpiece dish, praised by chef Anthony Bourdain as 'the best pig ever', consists of an entire whole pig slow-roasted over charcoal on a bamboo spit until the skin is glassy crisp?",
        correct: "Lechón Cebu Lechon",
        w1: "Crispy Pata",
        w2: "Sisig",
        exp: "Cebu lechon is stuffed with aromatic lemongrass (tanglad), crushed garlic, scallions, and star anise, requiring no dipping sauce because the meat is deeply seasoned."
      },
      {
        q: "What beloved sour soup broth dish, voted repeatedly as the world best soup by TasteAtlas, is flavored with sour tamarind (sampalok) and packed with pork, kangkong (water spinach), radish, and eggplant?",
        correct: "Sinigang",
        w1: "Bulalo",
        w2: "Tinola",
        exp: "Sinigang characteristic refreshing sourness stimulates the palate in tropical heat, customizable with souring agents like green mango, kamias, or guava."
      },
      {
        q: "What famous colorful Filipino shaved ice dessert, meaning 'Mix-Mix', layers sweetened red beans, nata de coco, macapuno coconut, leche flan, purple yam (ube) jam, evaporated milk, and ube ice cream?",
        correct: "Halo-Halo",
        w1: "Mais con Yelo",
        w2: "Buko Pandan",
        exp: "Diners mix all the layered sweet ingredients together with a long spoon before eating, the ultimate multi-textured dessert."
      },
      {
        q: "Which island province in the Western Visayas produces the Carabao Mango, certified by Guinness as the sweetest mango variety in the entire world?",
        correct: "Guimaras",
        w1: "Cebu",
        w2: "Davao",
        exp: "Guimaras mangoes are strictly protected; bringing any foreign mangoes or mango seeds onto the island is banned by law to safeguard the disease-free genetic strain."
      }
    ],
    number: {
      q: "How many core seasoning ingredients (cane vinegar, soy sauce, garlic, bay leaves, and whole black peppercorns) define classic Philippine Adobo?",
      target: 5,
      unit: "core ingredients",
      imperial: "5 essential marinade ingredients",
      exp: "Classic Philippine Adobo relies on five fundamental pantry ingredients: vinegar, soy sauce, garlic, bay leaf, and black peppercorns."
    }
  },

  // Cycle 9: Cebu, Magellan's Cross & Sinulog
  {
    mcqs: [
      {
        q: "What oldest Spanish settlement and first capital of the Philippines, known as the Queen City of the South, was founded in 1565 on the island of Cebu?",
        correct: "Cebu City Sugbo",
        w1: "Iloilo City",
        w2: "Bacolod",
        exp: "Cebu features Fort San Pedro (the oldest triangular stone bastion fort in the Philippines) and the Colon Street (oldest national street in the country)."
      },
      {
        q: "What historic Christian wooden cross, housed in an octagonal stone kiosk next to the Basilica Minore del Santo Niño in Cebu, was planted on April 21, 1521, by Portuguese explorer Ferdinand Magellan?",
        correct: "Magellan Cross",
        w1: "Cross of Mactan",
        w2: "Holy Cross of Agno",
        exp: "Magellan planted the cross upon baptizing Rajah Humabon and Queen Juana, marking the arrival of Roman Catholicism in the Philippines."
      },
      {
        q: "What famous battle fought on April 27, 1521, on the shores of Mactan Island saw indigenous chieftain Lapulapu defeat Spanish forces and kill Ferdinand Magellan?",
        correct: "Battle of Mactan",
        w1: "Battle of Manila Bay",
        w2: "Battle of Tirad Pass",
        exp: "Lapulapu is venerated as the First Filipino Hero for successfully resisting European foreign conquest, commemorated by a 20-meter bronze statue on Mactan."
      },
      {
        q: "What 16th-century Flemish wooden statue of the infant Jesus, gifted by Magellan to Queen Juana in 1521, is the oldest surviving religious relic in the Philippines?",
        correct: "Santo Niño de Cebú",
        w1: "Black Nazarene",
        w2: "Our Lady of Peñafrancia",
        exp: "Rediscovered unharmed inside a wooden pine box in a burned hut during Legazpi 1565 expedition, it is enshrined in the Basilica Minore del Santo Niño."
      },
      {
        q: "What massive cultural and religious dance festival, celebrated in Cebu every third Sunday of January, honors the Santo Niño with a distinctive two-steps-forward-one-step-backward street dance to the beat of drums?",
        correct: "Sinulog Festival",
        w1: "Ati-Atihan Festival",
        w2: "Dinagyang Festival",
        exp: "Millions chant 'Pit Señor! Viva Santo Niño!' while holding statues of the Christ child aloft, moving in rhythm mimicking the gentle current (sulog) of the Pahina River."
      }
    ],
    number: {
      q: "In what year did Ferdinand Magellan and his Spanish expedition arrive in the Philippines, planting Magellan's Cross in Cebu?",
      target: 1521,
      unit: "year",
      imperial: "1521 AD",
      exp: "Magellan made landfall in the Philippines on March 16, 1521, planting the historic cross in Cebu on April 21, 1521."
    }
  },

  // Cycle 10: Extent, 17 Regions & Philippine Superlatives
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in the Philippines, rising 2,954 meters as a dormant stratovolcano on the island of Mindanao?",
        correct: "Mount Apo Apo Sandawa",
        w1: "Mount Dulang-dulang",
        w2: "Mount Pulag",
        exp: "Mount Apo (meaning 'Grandfather of all mountains') is crowned by three rocky peaks, a 500-meter sulfur vent geothermal field, and ancient mossy cloud forests."
      },
      {
        q: "What critically endangered apex bird of prey, also known as the Monkey-Eating Eagle with a massive two-meter wingspan, is the official National Bird of the Philippines?",
        correct: "The Philippine Eagle Pithecophaga jefferyi",
        w1: "Brahminy Kite",
        w2: "Philippine Hawk-Eagle",
        exp: "With fewer than 400 pairs surviving in old-growth primary rainforests, killing a Philippine eagle carries a twelve-year prison sentence under wildlife protection laws."
      },
      {
        q: "Into how many administrative regions (such as Ilocos, Bicol, Central Visayas, and BARMM) is the Republic of the Philippines politically organized across its eighty-two provinces?",
        correct: "17 Administrative Regions",
        w1: "12 Regions",
        w2: "22 Regions",
        exp: "The seventeen regions group the eighty-two provinces and 149 cities for administrative coordination and economic development."
      },
      {
        q: "What are the two official national languages of the Republic of the Philippines under the 1987 Constitution, spoken alongside 180 indigenous Philippine languages?",
        correct: "Filipino (Tagalog) and English",
        w1: "Tagalog and Spanish",
        w2: "Cebuano and English",
        exp: "The Philippines is the third largest English-speaking nation in the world by population, utilizing Filipino as the national lingua franca."
      },
      {
        q: "What 2,928-meter mountain in Benguet, Luzon, the third highest peak in the country, is celebrated for its breathtaking 'Sea of Clouds' sunrise vista over rolling mountain ridges?",
        correct: "Mount Pulag",
        w1: "Mount Kitanglad",
        w2: "Mount Halcon",
        exp: "Sacred to the Ibaloi and Kalanguya indigenous tribes, Mount Pulag is home to rare dwarf bamboo grasslands and the ancient Kabayan burial mummies."
      }
    ],
    number: {
      q: "What is the official summit elevation in meters above sea level of Mount Apo on the island of Mindanao, the highest mountain peak in the Philippines?",
      target: 2954,
      unit: "meters",
      imperial: "9,692 feet",
      exp: "Mount Apo reaches an official summit elevation of 2,954 meters above sea level."
    }
  }
];

// Build Philippines Quiz
buildQuiz({
  id: 'philippines-geography-heritage-60',
  theme: 'Philippines: Geography, 7,641 Islands & Natural Wonders',
  title: 'Philippines: Geography, 7,641 Islands & Natural Wonders',
  description: 'A 60-question grand master assessment exploring the 7,641 islands, Manila & Intramuros (1571), Banaue Rice Terraces (2,000 yrs), Chocolate Hills (1,770 hills), Puerto Princesa underground river (8.2 km), Mayon volcano (1814), Jeepneys, Magellan (1521), and Mount Apo (2,954 m).',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, philippinesCycles);

console.log('Philippines quiz built successfully!');
