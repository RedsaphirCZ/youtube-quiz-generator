const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 4. thailand-geography-heritage-60
// =========================================================================
const thailandCycles = [
  // Cycle 1: The Chao Phraya River & Bangkok
  {
    mcqs: [
      {
        q: "What major 372-kilometer river, revered as the River of Kings, flows through Bangkok before emptying into the Gulf of Thailand?",
        correct: "Chao Phraya River",
        w1: "Mekong River",
        w2: "Ping River",
        exp: "Formed by the confluence of the Ping and Nan rivers at Nakhon Sawan, the Chao Phraya is the fertile alluvial lifeblood of central Thailand."
      },
      {
        q: "What is the ceremonial and official residence of the Kings of Siam and Thailand in Bangkok, established in 1782 by King Rama I?",
        correct: "The Grand Palace Phra Borom Maha Ratcha Wang",
        w1: "Dusit Palace",
        w2: "Vimanmek Mansion",
        exp: "The Grand Palace complex covers 218,000 square meters, featuring gold-leaf tiered stupas, mythical Yaksha demon guardians, and throne halls."
      },
      {
        q: "Which sacred temple inside the Grand Palace complex in Bangkok houses the highly venerated 66-centimeter palladium-carved Emerald Buddha (Phra Kaeo)?",
        correct: "Wat Phra Kaew",
        w1: "Wat Pho",
        w2: "Wat Arun",
        exp: "Carved from a single block of translucent green jasper or jade, the King of Thailand personally changes the statue gold vestments three times a year to mark seasonal shifts."
      },
      {
        q: "Which landmark riverside temple on the west bank of the Chao Phraya is celebrated for its 82-meter central prang spire decorated with colorful porcelain mosaics?",
        correct: "Wat Arun Temple of Dawn",
        w1: "Wat Saket",
        w2: "Wat Traimit",
        exp: "Wat Arun reflects morning sunlight along the river, encrusted with discarded Chinese porcelain plates and seashells used as ballast in ancient trading ships."
      },
      {
        q: "Which temple complex in Bangkok is home to a colossal 46-meter-long gold-plated Reclining Buddha and serves as the historic national headquarters for traditional Thai Massage?",
        correct: "Wat Pho Wat Phra Chetuphon",
        w1: "Wat Benchamabophit",
        w2: "Wat Suthat",
        exp: "The Reclining Buddha depicts the Buddha entering final Parinirvana, featuring soles of the feet inlaid with mother-of-pearl illustrating 108 auspicious laksanas (symbols)."
      }
    ],
    number: {
      q: "What is the total length in meters of the monumental gold-plated Reclining Buddha statue inside Wat Pho in Bangkok?",
      target: 46,
      unit: "meters",
      imperial: "151 feet long",
      exp: "The giant Reclining Buddha measures forty-six meters long and fifteen meters tall, filling the entire interior of the ordination vihara."
    }
  },

  // Cycle 2: Chiang Mai & The Northern Highlands
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Thailand, rising 2,565 meters in the Thanon Thong Chai Range of Chiang Mai Province, nicknamed the Roof of Thailand?",
        correct: "Doi Inthanon",
        w1: "Doi Chiang Dao",
        w2: "Doi Suthep",
        exp: "Doi Inthanon was named after King Inthawichayanon of Chiang Mai, crowned by twin royal stupas (naphamaythanidon) amid misty high-altitude mossy cloud forests."
      },
      {
        q: "Which historic northern city on the Ping River was founded in 1296 by King Mangrai as the new capital of the ancient Lanna Kingdom?",
        correct: "Chiang Mai",
        w1: "Chiang Rai",
        w2: "Lampang",
        exp: "Chiang Mai (meaning 'New City') retains its historic moated brick city walls, night bazaars, and over three hundred ornate Buddhist temples."
      },
      {
        q: "What sacred mountain temple overlooking Chiang Mai from a 1,053-meter ridge features a golden gilded chedi reached by a 306-step naga serpent staircase?",
        correct: "Wat Phra That Doi Suthep",
        w1: "Wat Umong",
        w2: "Wat Phra Singh",
        exp: "According to legend, a sacred white elephant carrying a holy relic of the Buddha climbed the mountain, trumpeted three times, and knelt, marking where the temple should be built."
      },
      {
        q: "What famous geopolitical region in northern Chiang Rai Province marks the confluence of the Ruak and Mekong rivers where Thailand, Laos, and Myanmar meet?",
        correct: "The Golden Triangle",
        w1: "The Emerald Triangle",
        w2: "The Three Pagodas Pass",
        exp: "Historically infamous for opium cultivation, the Golden Triangle is now an agricultural center promoting highland tea, Arabica coffee, and Royal Project crops."
      },
      {
        q: "Which striking contemporary white Buddhist temple in Chiang Rai, designed by visual artist Chalermchai Kositpipat, features an ornate bridge spanning a sea of reaching sculpted hands?",
        correct: "Wat Rong Khun The White Temple",
        w1: "Wat Rong Suea Ten Blue Temple",
        w2: "Baan Dam Black House",
        exp: "Built using white plaster inlaid with mirrored glass chips, the temple combines traditional Thai Buddhist architecture with surrealist pop-culture murals."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Doi Inthanon, the highest mountain peak in Thailand?",
      target: 2565,
      unit: "meters",
      imperial: "8,415 feet",
      exp: "Doi Inthanon stands at an official elevation of 2,565 meters above sea level in northern Thailand."
    }
  },

  // Cycle 3: The Andaman Sea Karst & Phang Nga Bay
  {
    mcqs: [
      {
        q: "What spectacular bay in the Andaman Sea is world-famous for emerald-green waters and over forty vertical limestone karst towers rising sheer out of the sea?",
        correct: "Phang Nga Bay Ao Phang Nga",
        w1: "Krabi Bay",
        w2: "Chalong Bay",
        exp: "Phang Nga Bay was flooded by sea level rise following the last Ice Age, creating sheltered sea caves, mangrove forests, and collapsed cave lagoons (hongs)."
      },
      {
        q: "Which 20-meter needle-shaped limestone karst islet in Phang Nga Bay (Ko Ta Pu) became an international tourist icon after appearing in the 1974 James Bond film The Man with the Golden Gun?",
        correct: "James Bond Island Ko Ta Pu",
        w1: "Ko Panyi",
        w2: "Ko Yao Noi",
        exp: "Ko Ta Pu (meaning 'Nail Island') sits adjacent to Khao Phing Kan, where villain Francisco Scaramanga solar laser weapon was hidden in the film."
      },
      {
        q: "What stunning archipelago in Krabi Province, home to the enclosed limestone cove Maya Bay, was featured as the idyllic paradise in the 2000 film The Beach?",
        correct: "Phi Phi Islands Koh Phi Phi",
        w1: "Similan Islands",
        w2: "Surin Islands",
        exp: "Comprising Koh Phi Phi Don and Koh Phi Phi Leh, the islands feature transparent waters, Viking Cave bird nest harvesting, and vibrant coral reefs."
      },
      {
        q: "What world-famous peninsula in Krabi, accessible only by longtail boat due to towering limestone cliffs, is recognized as a global capital for rock climbing?",
        correct: "Railay Beach Rai Leh",
        w1: "Ao Nang",
        w2: "Karon Beach",
        exp: "Railay features over seven hundred bolted climbing routes across sheer stalactite-covered limestone overhangs overlooking Phra Nang Beach."
      },
      {
        q: "What unique Muslim fishing village in Phang Nga Bay is built entirely on wooden stilts over the ocean against the base of a towering vertical limestone rock face?",
        correct: "Ko Panyi Koh Panyee",
        w1: "Ko Lanta",
        w2: "Ko Muk",
        exp: "Founded in the late 18th century by nomadic Indonesian fishermen, Ko Panyi features a mosque, school, seafood restaurants, and a famous floating wooden football pitch."
      }
    ],
    number: {
      q: "In what year was the James Bond film The Man with the Golden Gun released, propelling Thailand's Ko Ta Pu into a global tourist attraction?",
      target: 1974,
      unit: "year",
      imperial: "1974 AD",
      exp: "The Man with the Golden Gun hit theaters in December 1974, starring Roger Moore as 007."
    }
  },

  // Cycle 4: Gulf of Thailand Islands & Marine Reserves
  {
    mcqs: [
      {
        q: "What is the second largest island in Thailand, located in the Gulf of Thailand, famous for coconut palm plantations, luxury beach resorts, and the 12-meter Big Buddha statue?",
        correct: "Koh Samui",
        w1: "Phuket",
        w2: "Koh Chang",
        exp: "Koh Samui was historically an isolated coconut farming community until backpackers discovered its white sand beaches like Chaweng and Lamai in the 1970s."
      },
      {
        q: "Which island in the Gulf of Thailand is internationally famous for its monthly Full Moon Party, drawing tens of thousands of revellers to Haad Rin beach?",
        correct: "Koh Phangan",
        w1: "Koh Tao",
        w2: "Koh Samet",
        exp: "Started in the mid-1980s as an impromptu wooden beach celebration, the Full Moon Party features neon body paint, fire dancers, and electronic music."
      },
      {
        q: "Which small rocky island in the Gulf of Thailand, meaning 'Turtle Island', is world-renowned as the primary scuba diving training and certification capital of Southeast Asia?",
        correct: "Koh Tao",
        w1: "Koh Lipe",
        w2: "Koh Mak",
        exp: "Calm warm waters, abundant coral reefs, and resident whale sharks make Koh Tao the second highest certifier of PADI scuba divers in the world."
      },
      {
        q: "What stunning marine national park in the Gulf of Thailand consists of an archipelago of forty-two emerald limestone islands surrounding the emerald marine lake Talay Nai?",
        correct: "Mu Ko Ang Thong National Marine Park",
        w1: "Mu Ko Chang",
        w2: "Mu Ko Chumphon",
        exp: "Ang Thong (meaning 'Golden Basin') was the real-life geographical inspiration for Alex Garland bestselling novel The Beach."
      },
      {
        q: "What is the largest island in Thailand, located in the Andaman Sea off the southwest coast, connected to the mainland by the Sarasin Bridge?",
        correct: "Phuket",
        w1: "Koh Samui",
        w2: "Koh Chang",
        exp: "Phuket grew wealthy from 19th-century tin mining, featuring Sino-Portuguese colonial shophouses in Old Phuket Town and the 45-meter marble Big Buddha."
      }
    ],
    number: {
      q: "How many emerald limestone islands comprise the protected archipelago of the Mu Ko Ang Thong National Marine Park in the Gulf of Thailand?",
      target: 42,
      unit: "islands",
      imperial: "42 islands",
      exp: "Ang Thong Marine National Park spans 102 square kilometers across forty-two uninhabited limestone islets."
    }
  },

  // Cycle 5: Ancient Capitals: Ayutthaya & Sukhothai
  {
    mcqs: [
      {
        q: "Which monumental ancient Siamese capital along the Chao Phraya River, founded in 1350, was one of the largest and wealthiest cosmopolitan cities on Earth before its destruction in 1767?",
        correct: "Historic City of Ayutthaya",
        w1: "Sukhothai",
        w2: "Thonburi",
        exp: "At its peak, the Kingdom of Ayutthaya traded with Dutch, Portuguese, French, and Japanese merchants across hundreds of gold-spired temples."
      },
      {
        q: "What famous, iconic Buddhist artifact in the ruins of Wat Mahathat in Ayutthaya features a stone Buddha head embraced by the intertwined roots of an ancient banyan tree?",
        correct: "Buddha Head in Tree Roots",
        w1: "Emerald Buddha",
        w2: "Golden Buddha",
        exp: "When Burmese forces destroyed Ayutthaya in 1767, severed statues were abandoned, and a growing sacred banyan fig tree lifted the sandstone Buddha head."
      },
      {
        q: "Which 13th-century kingdom in lower northern Thailand is revered as the first unified Thai kingdom and the cradle of Thai civilization, art, and language?",
        correct: "Sukhothai Kingdom",
        w1: "Lanna Kingdom",
        w2: "Dvaravati Kingdom",
        exp: "Sukhothai (meaning 'Dawn of Happiness') developed classic Thai walking Buddha bronze sculptures and the pioneering Ram Khamhaeng legal code."
      },
      {
        q: "In what year CE did King Ram Khamhaeng the Great officially invent the Thai alphabet script, recorded on the historic Ram Khamhaeng Stele in Sukhothai?",
        correct: "1283 CE",
        w1: "1350 CE",
        w2: "1782 CE",
        exp: "King Ram Khamhaeng adapted Old Khmer scripts to create the unique Thai writing system with forty-four consonants and sixteen vowel symbols."
      },
      {
        q: "Which central Thai city, famous for the 13th-century Khmer three-spired prang temple Phra Prang Sam Yot, hosts an annual grand banquet feast for thousands of wild crab-eating macaques?",
        correct: "Lopburi",
        w1: "Nakhon Pathom",
        w2: "Suphan Buri",
        exp: "The annual Monkey Buffet Festival in November honors the sacred monkeys associated with the Hindu monkey deity Hanuman, serving tables of fresh tropical fruits."
      }
    ],
    number: {
      q: "In what year CE did King Ram Khamhaeng the Great create the original Thai written alphabet in the Kingdom of Sukhothai?",
      target: 1283,
      unit: "CE",
      imperial: "1283 AD",
      exp: "King Ram Khamhaeng inscribed the invention of the Thai script on stone stele No. 1 in the year 1283 CE."
    }
  },

  // Cycle 6: Waterways, Floating Markets & The River Kwai
  {
    mcqs: [
      {
        q: "Which world-famous floating market in Ratchaburi Province features hundreds of wooden sampan boats piled with tropical fruits, noodles, and coconut pancakes along narrow canals?",
        correct: "Damnoen Saduak Floating Market",
        w1: "Amphawa Floating Market",
        w2: "Taling Chan Market",
        exp: "Constructed under King Rama IV in 1866, the 32-kilometer canal connected the Tha Chin and Mae Klong rivers to facilitate rural agricultural transport."
      },
      {
        q: "What famous market in Samut Songkhram is situated directly on active railway tracks, where vendors retract their awnings and vegetable baskets seconds before passenger trains pass through?",
        correct: "Maeklong Railway Market Talad Rom Hub",
        w1: "Chatuchak Weekend Market",
        w2: "Pak Khlong Talat",
        exp: "Known locally as the Umbrella Pull-Down Market, trains sound their horns eight times daily as produce baskets sit mere millimeters beneath the train carriages."
      },
      {
        q: "Which historic bridge in Kanchanaburi Province, part of the World War II Death Railway built by Allied prisoners of war and Asian laborers, was immortalized in an Oscar-winning 1957 film?",
        correct: "Bridge on the River Kwai Bridge 277",
        w1: "Hellfire Pass",
        w2: "Tham Krasae Bridge",
        exp: "Built in 1943 by the Imperial Japanese Army to supply their Burma campaign, over 100,000 conscripted laborers and 12,000 Allied POWs perished during railway construction."
      },
      {
        q: "What spectacular seven-tiered emerald waterfall in Kanchanaburi National Park is named after the three-headed white elephant of Hindu mythology?",
        correct: "Erawan Falls",
        w1: "Sai Yok Waterfall",
        w2: "Thi Lo Su Waterfall",
        exp: "The top seventh tier of Erawan Falls is believed to resemble the multi-headed elephant god Airavata (Erawan), featuring travertine limestone pools where doctor fish nibble swimmers' skin."
      },
      {
        q: "What traditional name was given to Bangkok by 19th-century European travelers due to its intricate network of river canals (khlongs) serving as primary transportation thoroughfares?",
        correct: "The Venice of the East",
        w1: "The Pearl of the Orient",
        w2: "The Paris of Asia",
        exp: "Before modern roadways were paved, life in Bangkok was lived almost entirely on water, with floating markets, houseboats, and longtail water taxis."
      }
    ],
    number: {
      q: "In what year during World War II was the famous Bridge on the River Kwai constructed across the Mae Klong (Khwae Yai) River in Kanchanaburi?",
      target: 1943,
      unit: "year",
      imperial: "1943 AD",
      exp: "The railway bridge across the River Kwai was constructed by Allied POWs under Japanese command in early 1943."
    }
  },

  // Cycle 7: Thai Wildlife & National Parks
  {
    mcqs: [
      {
        q: "What revered animal species, deeply intertwined with royal history and Buddhism, is the official national animal and cultural symbol of the Kingdom of Thailand?",
        correct: "The Asian Elephant Chang",
        w1: "The Indochinese Tiger",
        w2: "The King Cobra",
        exp: "Historically depicted on the Siamese national flag, sacred White Elephants (Chang Samkhan) belong by law to the reigning monarch as a sign of royal prosperity."
      },
      {
        q: "What was the very first national park established in Thailand in 1962, covering 2,000 square kilometers of tropical rainforest and home to wild elephants and hornbills?",
        correct: "Khao Yai National Park",
        w1: "Doi Inthanon National Park",
        w2: "Kaeng Krachan National Park",
        exp: "Part of the UNESCO-inscribed Dong Phayayen-Khao Yai Forest Complex, it features the Haew Suwat waterfall seen in the film The Beach."
      },
      {
        q: "What ancient 160-million-year-old tropical evergreen rainforest in Surat Thani surrounds the artificial emerald Cheow Lan Lake and limestone karst spires?",
        correct: "Khao Sok National Park",
        w1: "Khao Lak",
        w2: "Khao Sam Roi Yot",
        exp: "Khao Sok is older and more biodiverse than the Amazon rainforest, famous for floating raft houses, wild tapirs, clouded leopards, and giant Rafflesia kerrii flowers."
      },
      {
        q: "Which vibrant, aggressive freshwater fish species native to the standing waters of the Chao Phraya basin was officially declared Thailand National Aquatic Animal in 2019?",
        correct: "Siamese Fighting Fish Betta splendens",
        w1: "Mekong Giant Catfish",
        w2: "Giant Pangasius",
        exp: "Bred for over six centuries in Siam for territorial fighting behavior, Bettas breathe atmospheric air through a specialized labyrinth organ."
      },
      {
        q: "What critically endangered giant freshwater fish endemic to the Mekong River can grow up to three meters long and weigh over 300 kilograms?",
        correct: "Mekong Giant Catfish Pangasianodon gigas",
        w1: "Giant Barb",
        w2: "Chao Phraya Giant Stingray",
        exp: "The Mekong giant catfish is the largest scale-less freshwater fish on Earth, heavily threatened by upstream hydroelectric dam construction."
      }
    ],
    number: {
      q: "In what year was Khao Yai National Park established as Thailand first official national park?",
      target: 1962,
      unit: "year",
      imperial: "1962 AD",
      exp: "Khao Yai National Park was formally established under the National Parks Act on September 18, 1962."
    }
  },

  // Cycle 8: Thai Agriculture, Jasmine Rice & Tropical Fruits
  {
    mcqs: [
      {
        q: "Which premium fragrant, long-grain rice variety, known locally as Hom Mali, is cultivated on the semi-arid Khorat Plateau of northeastern Thailand (Isan)?",
        correct: "Thai Jasmine Rice Khao Dawk Mali 105",
        w1: "Basmati Rice",
        w2: "Sticky Glutinous Rice",
        exp: "Jasmine rice naturally releases a delicate pandan and floral aroma (2-acetyl-1-pyrroline), making Thailand one of the top three global rice exporters."
      },
      {
        q: "Which spiky, pungent tropical fruit with rich custard-like yellow flesh is celebrated as the King of Fruits, heavily cultivated in Rayong and Chanthaburi?",
        correct: "Durian Durio zibethinus",
        w1: "Jackfruit",
        w2: "Breadfruit",
        exp: "Thailand is the world leading exporter of fresh and frozen durian (especially the Monthong or Golden Pillow cultivar), though its strong odor leads to bans in hotels and subways."
      },
      {
        q: "What famous traditional Thai street food dessert combines warm sweet coconut-infused sticky rice with freshly sliced sweet yellow ripe mangoes and roasted mung beans?",
        correct: "Mango Sticky Rice Khao Niew Mamuang",
        w1: "Tub Tim Krob",
        w2: "Khanom Krok",
        exp: "A national culinary treasure, the dessert highlights sweet Nam Dok Mai mangoes drizzled with salted coconut cream syrup."
      },
      {
        q: "What purple, thick-skinned tropical fruit with sweet, tangy white segmented segments is revered across Southeast Asia as the Queen of Fruits?",
        correct: "Mangosteen Garcinia mangostana",
        w1: "Rambutan",
        w2: "Longan",
        exp: "In traditional Thai medicine, mangosteen is considered a cooling fruit to balance the heating properties of rich durian."
      },
      {
        q: "What percentage of the world natural rubber supply is tapped from the vast Hevea brasiliensis tree plantations of southern Thailand?",
        correct: "35 Percent",
        w1: "15 Percent",
        w2: "50 Percent",
        exp: "Thailand is the world largest producer and exporter of natural rubber, harvesting over 4.7 million metric tons of latex annually."
      }
    ],
    number: {
      q: "What percentage of the global supply of natural raw rubber is produced annually by plantations in Thailand?",
      target: 35,
      unit: "percent",
      imperial: "35% of world natural rubber",
      exp: "Thailand produces approximately 35 percent of the entire global supply of natural rubber, leading global latex exports."
    }
  },

  // Cycle 9: Festivals, Muay Thai & Cultural Heritage
  {
    mcqs: [
      {
        q: "What world-famous three-day Thai New Year festival, celebrated nationwide every April 13 to 15, is celebrated with joyful mass public water fights and temple cleansing rites?",
        correct: "Songkran",
        w1: "Loy Krathong",
        w2: "Yi Peng",
        exp: "Inscribed on the UNESCO Intangible Cultural Heritage list in 2023, water splashing symbolizes washing away bad luck and sins from the previous year."
      },
      {
        q: "What enchanting festival of lights, celebrated on the full moon of the twelfth lunar month in November, sees millions of floating decorated banana-leaf baskets (krathongs) released onto waterways?",
        correct: "Loy Krathong",
        w1: "Songkran",
        w2: "Boon Bang Fai",
        exp: "Loy Krathong thanks the Water Goddess Phra Mae Khongkha for her bountiful waters and asks forgiveness for polluting rivers."
      },
      {
        q: "What traditional martial art and national combat sport of Thailand is known as the Art of Eight Limbs for its use of fists, elbows, knees, and shins?",
        correct: "Muay Thai Thai Boxing",
        w1: "Krabi Krabong",
        w2: "Silat",
        exp: "Muay Thai bouts begin with the Wai Kru Ram Muay ritual dance to pay respect to teachers, accompanied by live traditional sarama percussion and reed pipe music."
      },
      {
        q: "What traditional Thai respectful greeting involves pressing both palms together in front of the chest or face while executing a slight bow?",
        correct: "The Wai",
        w1: "The Bow",
        w2: "The Namaste",
        exp: "The height of the hands relative to the face and the depth of the bow reflect the degree of social status, age, and spiritual reverence shown to the recipient."
      },
      {
        q: "What percentage of the population of Thailand adheres to Theravada Buddhism, which serves as the cornerstone of Thai national culture and morality?",
        correct: "Over 93 Percent",
        w1: "60 Percent",
        w2: "75 Percent",
        exp: "There are over 40,000 active Buddhist temples (wats) and 300,000 saffron-robed monks across Thailand, where young men traditionally ordain for a temporary monastic period."
      }
    ],
    number: {
      q: "How many bodily striking contact points (limbs) are utilized in the traditional martial art of Muay Thai (fists, elbows, knees, shins)?",
      target: 8,
      unit: "limbs",
      imperial: "8 limbs (Art of Eight Limbs)",
      exp: "Muay Thai is called the Art of Eight Limbs because combatants use eight contact surfaces: two fists, two elbows, two knees, and two shins."
    }
  },

  // Cycle 10: Extent, 76 Provinces & Thai Superlatives
  {
    mcqs: [
      {
        q: "What distinctive historical distinction does Thailand hold among all sovereign nations in Southeast Asia during the colonial era of the 19th and 20th centuries?",
        correct: "Only nation never colonized by European powers",
        w1: "First nation to establish an empire",
        w2: "Only nation with a queen",
        exp: "Through skilled diplomacy under King Chulalongkorn (Rama V) and King Mongkut (Rama IV), Siam served as a neutral buffer state between British Burma/Malaya and French Indochina."
      },
      {
        q: "What is the narrowest point of the Malay Peninsula in southern Thailand, measuring just forty-four kilometers wide between the Gulf of Thailand and the Andaman Sea?",
        correct: "The Isthmus of Kra",
        w1: "Malacca Strait",
        w2: "Phuket Neck",
        exp: "The Isthmus of Kra has been the proposed site for a maritime shipping canal (the Kra Canal or Thai Canal) to bypass the crowded Strait of Malacca since 1677."
      },
      {
        q: "Into how many administrative provinces (Changwat), plus the special administrative area of the capital Bangkok, is the Kingdom of Thailand divided?",
        correct: "76 Provinces",
        w1: "60 Provinces",
        w2: "85 Provinces",
        exp: "The seventy-six provinces are grouped into four traditional regions: Northern, Northeastern (Isan), Central, and Southern Thailand."
      },
      {
        q: "What is the largest province in Thailand by geographical land area, covering over 20,000 square kilometers on the Khorat Plateau?",
        correct: "Nakhon Ratchasima Korat",
        w1: "Chiang Mai",
        w2: "Kanchanaburi",
        exp: "Nakhon Ratchasima is the gateway to the northeastern Isan region, famous for the Phimai Historical Park with its 11th-century Khmer temple complex."
      },
      {
        q: "What is the total geographical area of Thailand in square kilometers, ranking it as the 50th largest country in the world (roughly the size of Spain or California)?",
        correct: "513,120 Square Kilometers",
        w1: "250,000 Square Kilometers",
        w2: "750,000 Square Kilometers",
        exp: "Thailand spans over 513,000 square kilometers, shaped like an elephant head with the southern Malay peninsula forming its trunk."
      }
    ],
    number: {
      q: "What is the minimum width in kilometers of the Isthmus of Kra, the narrowest point of the Malay Peninsula in southern Thailand?",
      target: 44,
      unit: "kilometers",
      imperial: "27 miles narrow",
      exp: "The Isthmus of Kra measures just forty-four kilometers across at its narrowest point between Chumphon and Ranong."
    }
  }
];

// Build Thailand Quiz
buildQuiz({
  id: 'thailand-geography-heritage-60',
  theme: 'Thailand: Geography, Sacred Temples & Tropical Islands',
  title: 'Thailand: Geography, Sacred Temples & Tropical Islands',
  description: 'A 60-question grand master assessment exploring the Chao Phraya River & Wat Pho, Chiang Mai & Doi Inthanon, Phang Nga Bay & James Bond Island (1974), Koh Samui, Ayutthaya & Sukhothai (1283), the Bridge on the River Kwai (1943), elephants, and Songkran.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, thailandCycles);

console.log('Thailand quiz built successfully!');
