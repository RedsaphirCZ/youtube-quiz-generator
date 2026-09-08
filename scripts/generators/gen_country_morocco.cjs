const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 5. morocco-geography-heritage-60
// =========================================================================
const moroccoCycles = [
  // Cycle 1: The Atlas Mountains & Mount Toubkal
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Morocco and the entire geographical region of North Africa, rising 4,167 meters in the High Atlas range?",
        correct: "Mount Toubkal Jbel Toubkal",
        w1: "Mount M Goun",
        w2: "Jbel Ouanoukrim",
        exp: "First recorded climbed in June 1923 by French marquis René de Segonzac, Toubkal is accessible on a two-day trek from the Berber village of Imlil."
      },
      {
        q: "What massive mountain system stretches 2,500 kilometers across Morocco, Algeria, and Tunisia, dividing the Mediterranean/Atlantic coastlines from the Sahara Desert?",
        correct: "The Atlas Mountains",
        w1: "The Rif Mountains",
        w2: "The Ahaggar Mountains",
        exp: "In Morocco, the Atlas is divided into three distinct parallel ranges: the Middle Atlas (cedar forests), High Atlas (snow peaks), and Anti-Atlas (arid granites)."
      },
      {
        q: "Which high-altitude resort village in the High Atlas at 2,600 meters is the highest ski resort on the continent of Africa?",
        correct: "Oukaïmeden",
        w1: "Ifrane",
        w2: "Michlifen",
        exp: "Oukaïmeden features Africa highest ski chairlift rising to 3,258 meters on Jbel Atta, operating during winter months alongside ancient prehistoric petroglyphs."
      },
      {
        q: "What dramatic 300-meter vertical limestone cliff gorge in the eastern High Atlas is one of the premier rock climbing destinations in North Africa?",
        correct: "Todra Gorge Todgha",
        w1: "Dades Gorge",
        w2: "Ziz Gorge",
        exp: "Carved by the Todra River, the canyon narrows to just ten meters wide at its base, flanked by sheer orange and red limestone canyon walls."
      },
      {
        q: "What scenic route in southern Morocco, winding between Ouarzazate and Tinghir, is famously known as the Valley of a Thousand Kasbahs?",
        correct: "The Dadès Valley",
        w1: "The Draa Valley",
        w2: "The Souss Valley",
        exp: "The Dadès Valley features twisting cliff roads (Tisdrine hairpin curves), fortified clay mudbrick villages, and bizarre rounded rock formations called Monkey Fingers."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Mount Toubkal (Jbel Toubkal) in the High Atlas of Morocco?",
      target: 4167,
      unit: "meters",
      imperial: "13,671 feet",
      exp: "Mount Toubkal reaches an official elevation of 4,167 meters above sea level, the highest peak in the Arab world and North Africa."
    }
  },

  // Cycle 2: The Sahara Desert & Merzouga Dunes
  {
    mcqs: [
      {
        q: "What spectacular 28-kilometer field of wind-blown orange star sand dunes near Merzouga reaches heights of up to 150 meters in the Moroccan Sahara?",
        correct: "Erg Chebbi",
        w1: "Erg Chigaga",
        w2: "Erg Chech",
        exp: "Erg Chebbi is celebrated for its shifting apricot-colored sand dunes, camel trek caravans, and luxury desert nomad camp tents under dark starry skies."
      },
      {
        q: "What is the longest river in Morocco, flowing 1,100 kilometers from the High Atlas through vast date palm oases toward the Atlantic Ocean?",
        correct: "Drâa River Oued Drâa",
        w1: "Moulouya River",
        w2: "Sebou River",
        exp: "The Drâa Valley contains over one million date palm trees (particularly Medjool dates), historically linking trans-Saharan camel caravan trade with Marrakech."
      },
      {
        q: "What remote oasis desert frontier town in the Drâa Valley is famous for the historic hand-painted road sign reading 'Timbuktu 52 Days' by camel?",
        correct: "Zagora",
        w1: "Mhamid El Ghizlane",
        w2: "Rissani",
        exp: "Zagora was the traditional departure assembly point for massive gold, salt, and feather trans-Saharan trading caravans heading across the desert to Mali."
      },
      {
        q: "What largest and most remote sand dune sea (erg) in Morocco stretches forty kilometers across the desert near M'Hamid El Ghizlane, accessible only by off-road vehicle or camel?",
        correct: "Erg Chigaga Erg Chegaga",
        w1: "Erg Chebbi",
        w2: "Erg Iguidi",
        exp: "Reaching heights of 300 meters, Erg Chigaga remains wild and untouched by paved roads, retaining authentic Sahrawi nomadic pastoralist culture."
      },
      {
        q: "What seasonal arid hot desert wind blows from the Sahara Desert across Morocco toward the Atlantic, bringing sudden heat and blinding red dust storms?",
        correct: "The Chergui Sharqi",
        w1: "The Sirocco",
        w2: "The Harmattan",
        exp: "Meaning 'Easterly' in Arabic, the Chergui wind can elevate temperatures above 45°C in minutes, parching crops and blowing fine Saharan sand over cities."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Drâa River (Oued Drâa), the longest river in Morocco?",
      target: 1100,
      unit: "kilometers",
      imperial: "684 miles",
      exp: "The Drâa River flows for 1,100 kilometers from the High Atlas mountains across southern Morocco to the Atlantic coast at Tan-Tan."
    }
  },

  // Cycle 3: The Four Imperial Cities
  {
    mcqs: [
      {
        q: "What famous historic city, known as the Red City (Al-Hamra) for its beaten red clay walls, is centered on the bustling Jemaa el-Fnaa square?",
        correct: "Marrakech",
        w1: "Fes",
        w2: "Rabat",
        exp: "Founded in 1070 by Almoravid leader Abu Bakr ibn Umar, Marrakech features the 77-meter Koutoubia Mosque, Bahia Palace, and Yves Saint Laurent Majorelle Garden."
      },
      {
        q: "What is the monumental 77-meter minaret in Marrakech that served as the architectural prototype for the Giralda in Seville and the Hassan Tower in Rabat?",
        correct: "Koutoubia Mosque Minaret",
        w1: "Hassan II Minaret",
        w2: "Al-Qarawiyyin Minaret",
        exp: "Completed under Almohad Caliph Yaqub al-Mansur in 1195, the Koutoubia is crowned by copper orbs that local legend claims were originally pure solid gold."
      },
      {
        q: "Which four historic cities of Morocco (Marrakech, Fes, Meknes, and Rabat) are collectively designated as the Four Imperial Cities of the Kingdom?",
        correct: "The Four Imperial Cities",
        w1: "The Royal Quadrilateral",
        w2: "The Maghrebi Capitals",
        exp: "Each of the four cities served as the sovereign seat and capital of one of Morocco major ruling dynasties (Almoravids, Almohads, Marinids, and Alaouites)."
      },
      {
        q: "What massive 17th-century monumental horseshoe gate in Meknes, decorated with green zellige tiles and Roman marble columns, was built by Sultan Moulay Ismail?",
        correct: "Bab El-Mansour",
        w1: "Bab Bou Jeloud",
        w2: "Bab Agnaou",
        exp: "Bab El-Mansour (Gate of the Victorious) was completed in 1732, guarding the grand parade grounds of Sultan Moulay Ismail colossal imperial palace complex."
      },
      {
        q: "What is the modern political capital of the Kingdom of Morocco, located on the Atlantic coast along the mouth of the Bou Regreg River?",
        correct: "Rabat",
        w1: "Casablanca",
        w2: "Tangier",
        exp: "Rabat is a UNESCO World Heritage modern capital and historic city, home to the Royal Palace (Dar al-Makhzen), Kasbah of the Udayas, and Mohammed V Mausoleum."
      }
    ],
    number: {
      q: "What is the height in meters of the landmark 12th-century Koutoubia Mosque minaret in Marrakech?",
      target: 77,
      unit: "meters",
      imperial: "253 feet tall",
      exp: "The Koutoubia Mosque minaret stands at seventy-seven meters tall to the top of its spire, dominating the Marrakech city skyline."
    }
  },

  // Cycle 4: Fes el-Bali & Ancient Medinas
  {
    mcqs: [
      {
        q: "What UNESCO World Heritage ancient walled medina in Fes, containing over 9,000 narrow pedestrian alleys, is the largest contiguous car-free urban area in the world?",
        correct: "Fes el-Bali Old Fes",
        w1: "Fes Jdid",
        w2: "Marrakech Medina",
        exp: "Founded by Idris I in 789 CE, goods in Fes el-Bali are transported entirely by donkeys, handcarts, and mules through its maze of souks and artisan quarters."
      },
      {
        q: "Which university in Fes, founded in 859 CE by Tunisian-born scholar Fatima al-Fihri, is recognized by UNESCO and Guinness as the oldest continuously operating university in the world?",
        correct: "University of al-Qarawiyyin",
        w1: "Al-Azhar University",
        w2: "University of Bologna",
        exp: "Al-Qarawiyyin was a premier intellectual center of the medieval Islamic world, where scholars like philosopher Averroes, geographer al-Idrisi, and Maimonides studied."
      },
      {
        q: "What 11th-century open-air leather tannery in Fes el-Bali is world-famous for dozens of stone vats filled with pigeon droppings, cow urine, and natural saffron and indigo dyes?",
        correct: "Chouara Tannery",
        w1: "Sidi Moussa Tannery",
        w2: "Ain Azliten Tannery",
        exp: "Tanners work knee-deep in stone vats using traditional methods unchanged since the Middle Ages to cure and dye goat, sheep, and cow hides into soft Moroccan leather."
      },
      {
        q: "What grand monumental triple-arched gate, decorated with blue zellige tiles on the outside and green tiles on the inside, is the main entrance into Fes el-Bali?",
        correct: "Bab Bou Jeloud The Blue Gate",
        w1: "Bab Rcif",
        w2: "Bab Guissa",
        exp: "Built in 1913 under French Protectorate administration in Moorish Revival style, the gate frames the twin minarets of the Bou Inania Madrasa."
      },
      {
        q: "Which 14th-century Marinid Islamic theological college in Fes is acclaimed as a masterpiece of Islamic architecture, featuring carved cedar wood, stucco lace, and zellige mosaics?",
        correct: "Bou Inania Madrasa",
        w1: "Al-Attarine Madrasa",
        w2: "Cherratine Madrasa",
        exp: "Commissioned by Sultan Abu Inan Faris in 1351, it is the only madrasa in Fes that also functioned as a full congregational Friday mosque with its own minaret."
      }
    ],
    number: {
      q: "In what year CE was the University of al-Qarawiyyin, the oldest continuous degree-granting higher learning institution on Earth, founded in Fes?",
      target: 859,
      unit: "CE",
      imperial: "859 AD",
      exp: "Fatima al-Fihri founded the al-Qarawiyyin mosque and university in 859 CE using her inherited merchant family wealth."
    }
  },

  // Cycle 5: Chefchaouen & The Rif Mountains
  {
    mcqs: [
      {
        q: "Which picturesque mountain town in the Rif Mountains of northwestern Morocco is world-famous for its medina buildings washed in brilliant shades of powder-blue?",
        correct: "Chefchaouen Chaouen",
        w1: "Tetouan",
        w2: "Asilah",
        exp: "Founded in 1471 as a fortress (kasbah) against Portuguese invaders, Sephardic Jewish refugees who arrived in the 1930s painted houses blue to mirror the sky and heaven."
      },
      {
        q: "What rugged, crescent-shaped mountain range in northern Morocco runs parallel to the Mediterranean coast, home to the indigenous Jebala and Riffian Berber peoples?",
        correct: "The Rif Mountains",
        w1: "The High Atlas",
        w2: "The Anti-Atlas",
        exp: "The Rif Mountains feature Mount Tidighin (2,456 m) and Talassemtane National Park, home to the endangered Barbary macaque and rare Spanish fir forests."
      },
      {
        q: "Which UNESCO World Heritage city in northern Morocco was rebuilt in the 15th century by Andalusian refugees, featuring distinct Spanish-Moorish whitewashed architecture?",
        correct: "Tétouan",
        w1: "Tangier",
        w2: "Chefchaouen",
        exp: "Tétouan (meaning 'The Eyes' in Berber) served as the capital of the Spanish Protectorate in Morocco from 1913 to 1956, celebrated for Andalusian classical music."
      },
      {
        q: "What natural freshwater mountain spring waterfall on the edge of Chefchaouen medina is where locals gather to wash laundry and socialize in riverside cafes?",
        correct: "Ras El Maa Spring",
        w1: "Ouzoud Falls",
        w2: "Akchour Falls",
        exp: "The icy mountain spring water flows down from the limestone peaks into the river, powering small historic stone grain watermills."
      },
      {
        q: "What natural limestone rock arch bridge in Talassemtane National Park near Akchour spans a rushing emerald mountain river, known as the Bridge of God?",
        correct: "Pont de Dieu God Bridge",
        w1: "Imi n Ifri",
        w2: "Garganta del Chorro",
        exp: "Standing twenty-five meters above the Akchour river gorge, the natural stone bridge was formed by millions of years of river erosion through limestone strata."
      }
    ],
    number: {
      q: "How many historical Imperial Cities (Marrakech, Fes, Meknes, and Rabat) are recognized in the kingdom history of Morocco?",
      target: 4,
      unit: "Imperial Cities",
      imperial: "4 Imperial Cities",
      exp: "Morocco possesses four historic Imperial Cities: Fes, Marrakech, Meknes, and the current capital Rabat."
    }
  },

  // Cycle 6: Aït Benhaddou & Ouarzazate Film Heritage
  {
    mcqs: [
      {
        q: "What UNESCO World Heritage fortified mudbrick village (ksar) along the ancient caravan route in the High Atlas is one of the most famous cinematic filming locations in Africa?",
        correct: "Ksar of Aït Benhaddou",
        w1: "Kasbah Taourirt",
        w2: "Kasbah Telouet",
        exp: "Built from rammed earth and clay along the Ounila River, Aït Benhaddou was featured in Gladiator, Lawrence of Arabia, The Mummy, and Game of Thrones (Yunkai)."
      },
      {
        q: "Which city in southern Morocco, nicknamed the Hollywood of Morocco and Gateway to the Sahara, is the center of the Moroccan international film industry?",
        correct: "Ouarzazate",
        w1: "Errachidia",
        w2: "Taroudant",
        exp: "Home to Atlas Film Studios and CLA Studios, Ouarzazate massive desert studio sets recreate ancient Egypt, Rome, Tibet, and biblical Jerusalem."
      },
      {
        q: "What massive 510-megawatt solar power complex near Ouarzazate is one of the largest concentrated solar power (CSP) thermal plants in the world?",
        correct: "Noor Ouarzazate Solar Complex",
        w1: "Benban Solar Park",
        w2: "Bhadla Solar Park",
        exp: "Noor uses thousands of parabolic curved mirrors and a 243-meter solar tower with molten salt heat storage to generate clean electricity even after sunset."
      },
      {
        q: "What three-tiered 110-meter waterfall in the Middle Atlas near Azilal is the most visited and tallest natural waterfall in North Africa?",
        correct: "Ouzoud Waterfalls Cascades d Ouzoud",
        w1: "Ourika Waterfalls",
        w2: "Akchour Falls",
        exp: "Surrounded by ancient olive groves (ouzoud means 'grinding grain' in Berber), the falls cascade into natural swimming basins home to wild Barbary macaque troops."
      },
      {
        q: "What ruined palatial fortress in the High Atlas was the palatial residence of the powerful warlord Thami El Glaoui, Pasha of Marrakech, until 1956?",
        correct: "Kasbah Telouet",
        w1: "Kasbah Taourirt",
        w2: "Kasbah Amridil",
        exp: "Hidden behind crumbling clay exterior walls lie opulent reception halls decorated with Italian marble, carved cedar ceilings, and geometric zellige tilework."
      }
    ],
    number: {
      q: "What is the total power generation capacity in megawatts (MW) of the Noor Ouarzazate Concentrated Solar Power Complex in Morocco?",
      target: 510,
      unit: "megawatts",
      imperial: "510 MW clean solar capacity",
      exp: "The Noor Ouarzazate solar complex possesses an installed capacity of 510 megawatts across four operational solar thermal phases."
    }
  },

  // Cycle 7: Argan Forests & Coastal Atlantic Biosphere
  {
    mcqs: [
      {
        q: "Which rare, thorny evergreen tree species, endemic exclusively to the arid Souss Valley of southwestern Morocco, produces the valuable cosmetic and culinary Liquid Gold oil?",
        correct: "Argan Tree Argania spinosa",
        w1: "Atlas Cedar",
        w2: "Barbary Fig",
        exp: "Argan trees live up to 200 years in harsh desert droughts, protected inside the 2.5-million-hectare UNESCO Arganeraie Biosphere Reserve."
      },
      {
        q: "What famous, humorous wildlife phenomenon occurs in the argan groves of southwestern Morocco where domestic animals climb directly into tree canopies to eat fruit?",
        correct: "Tree-Climbing Goats",
        w1: "Tree-Climbing Camels",
        w2: "Tree-Climbing Sheep",
        exp: "Agile local goats balance precariously on gnarled argan tree branches up to ten meters above the ground to feast on fleshy argan berries and leaves."
      },
      {
        q: "What UNESCO-listed fortified Atlantic port city, historically called Mogador by Portuguese mariners, is famous for whitewashed ramparts, blue fishing boats, and Gnaoua music?",
        correct: "Essaouira",
        w1: "Agadir",
        w2: "Safi",
        exp: "Designed in 1760 by French military engineer Théodore Cornut for Sultan Mohammed III, Essaouira is swept by the Alizé trade winds, known as the Wind City of Africa."
      },
      {
        q: "What traditional Moroccan spiritual music and healing ritual trance tradition, practiced by descendants of enslaved Sub-Saharan Africans, is celebrated at the annual Essaouira festival?",
        correct: "Gnaoua Music Gnawa",
        w1: "Rai",
        w2: "Chaabi",
        exp: "Inscribed by UNESCO in 2019, Gnaoua music is driven by the low-pitched three-stringed guembri lute, metallic qraqeb castanets, and rhythmic spiritual chanting."
      },
      {
        q: "Which major coastal resort city in southwestern Morocco was completely destroyed by a catastrophic 1960 earthquake and rebuilt into Morocco premier modern beach destination?",
        correct: "Agadir",
        w1: "Mirleft",
        w2: "Taghazout",
        exp: "Rebuilt with wide boulevards and modern earthquake-resistant hotels, nearby Taghazout has evolved into the premier world-class surfing capital of North Africa."
      }
    ],
    number: {
      q: "What is the approximate total area in thousands of square kilometers covered by the UNESCO Arganeraie Biosphere Reserve in Morocco?",
      target: 25,
      unit: "thousand square kilometers",
      imperial: "9,650 square miles",
      exp: "The Arganeraie Biosphere Reserve covers approximately 25,000 square kilometers across the Souss-Massa and Marrakech-Safi regions."
    }
  },

  // Cycle 8: Casablanca & The Hassan II Mosque
  {
    mcqs: [
      {
        q: "What monumental mosque in Casablanca, completed in 1993, features a 210-meter minaret and a glass floor extending directly over the Atlantic Ocean?",
        correct: "Hassan II Mosque Mosquée Hassan II",
        w1: "Koutoubia Mosque",
        w2: "Tinmal Mosque",
        exp: "Designed by French architect Michel Pinseau, the mosque accommodates 105,000 worshippers, featuring a retractable roof and a laser beam directed toward Mecca."
      },
      {
        q: "What is the largest city in Morocco by population and its premier economic, commercial, and shipping powerhouse, located on the Atlantic coast?",
        correct: "Casablanca Dar al-Bayda",
        w1: "Rabat",
        w2: "Tangier",
        exp: "Casablanca is home to nearly four million people, famous for French Mauresque art deco architecture, the Casablanca Stock Exchange, and the 1942 Humphrey Bogart film."
      },
      {
        q: "What massive deepwater container port complex near Tangier on the Strait of Gibraltar is the largest seaport on the Mediterranean Sea and all of Africa?",
        correct: "Tanger Med Port",
        w1: "Port of Casablanca",
        w2: "Port of Safi",
        exp: "Tanger Med handles over eight million shipping containers annually, connecting international trade routes between Europe, Africa, the Americas, and Asia."
      },
      {
        q: "Which cosmopolitan port city in northern Morocco on the Strait of Gibraltar was an international diplomatic and cultural zone between 1924 and 1956, attracting writers of the Beat Generation?",
        correct: "Tangier Tanger",
        w1: "Tétouan",
        w2: "Larache",
        exp: "Tangier was home to international expatriate writers like Paul Bowles, William S. Burroughs, and Jack Kerouac, famous for the historic Grand Socco and Kasbah Museum."
      },
      {
        q: "What iconic sea cave promontory near Tangier features an ocean entrance opening that resembles a reversed geographical map of the African continent?",
        correct: "Caves of Hercules Grottes d Hercule",
        w1: "Caves of Friouato",
        w2: "Caves of Win-Timdouine",
        exp: "According to Greek mythology, the hero Hercules rested inside these caves before completing his eleventh labor of stealing the Golden Apples of the Hesperides."
      }
    ],
    number: {
      q: "What is the total height in meters of the minaret of the Hassan II Mosque in Casablanca, one of the tallest minarets in the world?",
      target: 210,
      unit: "meters",
      imperial: "689 feet tall (60 stories)",
      exp: "The marble minaret of the Hassan II Mosque reaches an architectural height of 210 meters above the Atlantic Ocean."
    }
  },

  // Cycle 9: Moroccan Agriculture, Saffron & Gastronomy
  {
    mcqs: [
      {
        q: "What iconic conical earthenware cooking vessel, named after the savory slow-cooked stew of meat and vegetables prepared inside it, is the symbol of Moroccan cuisine?",
        correct: "The Tagine Tajine",
        w1: "Couscoussier",
        w2: "Tanjia",
        exp: "The conical lid traps rising steam, condensing moisture back down onto the meat and spices, tenderizing tough cuts with minimal water over charcoal embers."
      },
      {
        q: "What steamed semolina grain dish, traditionally served with seven vegetables and slow-cooked meat every Friday after midday communal prayer, is Morocco national dish?",
        correct: "Couscous Kseksu",
        w1: "Bulgur",
        w2: "Pastilla",
        exp: "In 2020, UNESCO inscribed Couscous culinary knowledge and cultural practices onto the Intangible Cultural Heritage list on behalf of Maghreb nations."
      },
      {
        q: "Which mountain town in the Anti-Atlas range is known as the Saffron Capital of Africa, producing ninety percent of Morocco organic red saffron stigmas?",
        correct: "Taliouine",
        w1: "Kalaat M Gouna",
        w2: "Taroudant",
        exp: "Over one thousand tons of purple Crocus sativus flowers are harvested at dawn each October by local Berber women cooperatives across the volcanic Sirwa plateau."
      },
      {
        q: "What sweet and savory Andalusian-Moroccan layered pie, made of delicate paper-thin warqa pastry stuffed with shredded pigeon or chicken, almonds, cinnamon, and sugar, is served at royal feasts?",
        correct: "Pastilla Bastilla",
        w1: "Briouat",
        w2: "Harira",
        exp: "Pastilla originated among Moorish refugees from Andalusia who settled in Fes, masterfully balancing crispy sweet icing sugar and cinnamon with rich savory poultry."
      },
      {
        q: "How many traditional glasses of fresh spearmint green tea (Moroccan Mint Tea / Maghrebi Whiskey) are served to guests as a sacred ritual of Moroccan hospitality?",
        correct: "3 Glasses of Tea",
        w1: "1 Glass",
        w2: "5 Glasses",
        exp: "According to the famous Moroccan proverb: 'The first glass is as gentle as life, the second is as strong as love, the third is as bitter as death.'"
      }
    ],
    number: {
      q: "How many ceremonial glasses of mint tea are traditionally poured from high above for guests in the Moroccan hospitality ritual?",
      target: 3,
      unit: "glasses",
      imperial: "3 glasses of mint tea",
      exp: "Traditional Moroccan hospitality prescribes serving three glasses of brewed mint tea poured from a height to create a frothy crown (regga)."
    }
  },

  // Cycle 10: Extent, 12 Regions & Modern Morocco
  {
    mcqs: [
      {
        q: "What 323-kilometer high-speed railway line between Tangier and Casablanca, inaugurated in November 2018, is the first high-speed bullet train operating in Africa?",
        correct: "Al Boraq",
        w1: "Gautrain",
        w2: "Haramain Express",
        exp: "Named after the mythical celestial steed in Islamic tradition, Al Boraq trains travel at commercial speeds of 320 km/h, reducing travel time from five hours to two hours."
      },
      {
        q: "Into how many first-level administrative regions is the Kingdom of Morocco divided under the territorial decentralization framework of 2015?",
        correct: "12 Administrative Regions",
        w1: "16 Regions",
        w2: "8 Regions",
        exp: "The twelve regions (such as Casablanca-Settat, Marrakech-Safi, Fès-Meknès, and Souss-Massa) are led by regional governors (Walīs) and elected regional councils."
      },
      {
        q: "Which UNESCO World Heritage ancient Roman archaeological city near Meknes features exceptionally preserved triumphal arches, basilicas, and in situ mythological mosaics?",
        correct: "Volubilis Walili",
        w1: "Lixus",
        w2: "Chellah",
        exp: "Volubilis was the capital of the Roman province of Mauretania Tingitana, producing grain and olive oil for Rome until its abandonment in the 11th century."
      },
      {
        q: "What distinct geographical feature makes Morocco unique among all sovereign nations on the African continent?",
        correct: "Only African country with both Atlantic and Mediterranean coastlines",
        w1: "Only country with no desert",
        w2: "Only country with three mountain ranges",
        exp: "Morocco possesses 3,500 kilometers of coastline spanning both the North Atlantic Ocean and the Mediterranean Sea across the Strait of Gibraltar."
      },
      {
        q: "What top commercial operating speed in kilometers per hour is achieved by Morocco Al Boraq high-speed train on the Tangier-Kenitra dedicated high-speed line?",
        correct: "320 Kilometers per Hour",
        w1: "200 km/h",
        w2: "250 km/h",
        exp: "Al Boraq operates at a maximum commercial speed of 320 km/h (200 mph), making it the fastest railway service on the entire African continent."
      }
    ],
    number: {
      q: "What is the maximum operational service speed in km/h of Morocco Al Boraq high-speed bullet train, the fastest train in Africa?",
      target: 320,
      unit: "km/h",
      imperial: "200 mph",
      exp: "Al Boraq operates at speeds of up to 320 kilometers per hour (200 mph) on the high-speed line between Tangier and Kenitra."
    }
  }
];

// Build Morocco Quiz
buildQuiz({
  id: 'morocco-geography-heritage-60',
  theme: 'Morocco: Geography, The Atlas & Imperial Medinas',
  title: 'Morocco: Geography, The Atlas & Imperial Medinas',
  description: 'A 60-question grand master assessment exploring Mount Toubkal & High Atlas, Erg Chebbi Sahara dunes, the 4 Imperial Cities (Marrakech, Fes, Meknes, Rabat), Fes el-Bali & al-Qarawiyyin (859 CE), Chefchaouen, Aït Benhaddou, argan oil, and Hassan II Mosque.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, moroccoCycles);

console.log('Morocco quiz built successfully!');
