const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 1. south-korea-geography-heritage-60
// =========================================================================
const southKoreaCycles = [
  // Cycle 1: Seoul, The Han River & Joseon Palaces
  {
    mcqs: [
      {
        q: "What is the capital and largest metropolis of South Korea, bisected by the Han River and surrounded by four guardian mountain peaks?",
        correct: "Seoul",
        w1: "Busan",
        w2: "Incheon",
        exp: "Seoul has served as the capital of Korea since the founding of the Joseon Dynasty in 1394, home to roughly half the national population in its metropolitan area."
      },
      {
        q: "What is the largest and main royal palace of the Joseon Dynasty in Seoul, originally constructed in 1395, featuring the monumental Gwanghwamun gate?",
        correct: "Gyeongbokgung Palace",
        w1: "Changdeokgung Palace",
        w2: "Deoksugung Palace",
        exp: "Gyeongbokgung (Palace Greatly Blessed by Heaven) houses the Geunjeongjeon royal throne hall and the Gyeonghoeru royal pavilion on a lotus pond."
      },
      {
        q: "Which Joseon royal palace in Seoul is inscribed on the UNESCO World Heritage list, world-famous for its masterfully preserved Secret Garden (Huwon)?",
        correct: "Changdeokgung Palace",
        w1: "Gyeongbokgung",
        w2: "Changgyeonggung",
        exp: "Changdeokgung was designed to blend seamlessly with surrounding natural topography, where royal gardens feature century-old trees and lotus pavilions."
      },
      {
        q: "What iconic 236-meter communications and observation tower perches atop Mount Namsan in the center of Seoul, famous for lovers padlock fences?",
        correct: "N Seoul Tower Namsan Tower",
        w1: "Lotte World Tower",
        w2: "63 Building",
        exp: "Illuminated at night in blue, green, yellow, or red to indicate atmospheric air quality, N Seoul Tower offers panoramic views across the Han River basin."
      },
      {
        q: "What historic residential neighborhood in central Seoul between Gyeongbokgung and Changdeokgung preserves hundreds of traditional Korean wooden courtyard houses (hanok)?",
        correct: "Bukchon Hanok Village",
        w1: "Insadong",
        w2: "Ikseon-dong",
        exp: "Dating back 600 years to the Joseon Dynasty, Bukchon was historically home to high-ranking royal officials and nobility (yangban)."
      }
    ],
    number: {
      q: "In what year CE was the monumental Gyeongbokgung Palace first constructed in Seoul by King Taejo, the founder of the Joseon Dynasty?",
      target: 1395,
      unit: "CE",
      imperial: "1395 AD",
      exp: "Gyeongbokgung Palace was founded in 1395 CE, three years after the establishment of the Joseon Dynasty."
    }
  },

  // Cycle 2: Jeju Island & Volcanic Wonders
  {
    mcqs: [
      {
        q: "What volcanic island off the southern coast of the Korean Peninsula is South Korea largest island and a UNESCO World Natural Heritage site?",
        correct: "Jeju Island Jeju-do",
        w1: "Ulleungdo",
        w2: "Dokdo",
        exp: "Jeju is celebrated for basalt stone grandfather statues (Dol Hareubang), black pork BBQ, Hallabong citrus, and dramatic volcanic landforms."
      },
      {
        q: "What is the highest mountain peak in South Korea, a shield volcano rising 1,947 meters in the center of Jeju Island with a crater lake called Baengnokdam?",
        correct: "Hallasan Mount Halla",
        w1: "Jirisan",
        w2: "Seoraksan",
        exp: "Hallasan is an active volcano containing a vertical ecosystem spanning subtropical coastal plants to alpine tundra at its crater rim."
      },
      {
        q: "What massive 7.4-kilometer volcanic lava tube on Jeju Island is one of the finest and longest lava caves in the world, featuring a 7.6-meter stone lava column?",
        correct: "Manjanggul Cave Manjanggul Lava Tube",
        w1: "Gimnyeonggul",
        w2: "Bengdwi Cave",
        exp: "Formed thousands of years ago as molten basalt lava flowed beneath a hardened crust, Manjanggul houses rare cave wildlife and massive lava stalagmites."
      },
      {
        q: "What dramatic 182-meter tuff cone crater rising abruptly from the eastern sea of Jeju Island is world-renowned for sunrise vistas over the ocean?",
        correct: "Seongsan Ilchulbong Sunrise Peak",
        w1: "Sanbangsan",
        w2: "Songaksan",
        exp: "Formed by hydrovolcanic eruptions when rising magma interacted with shallow ocean water, the crown-shaped crater is surrounded by ninety-nine sharp rock peaks."
      },
      {
        q: "What celebrated traditional community of indigenous women on Jeju Island free-dives up to twenty meters into freezing ocean waters without oxygen gear to harvest seafood?",
        correct: "Haenyeo Female Divers",
        w1: "Ama",
        w2: "Mudang",
        exp: "Inscribed on the UNESCO Intangible Cultural Heritage list in 2016, many Haenyeo continue free-diving into their seventies and eighties, singing traditional sumbisori breathing songs."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Mount Hallasan on Jeju Island, the highest mountain peak in South Korea?",
      target: 1947,
      unit: "meters",
      imperial: "6,388 feet",
      exp: "Mount Hallasan reaches an official summit elevation of 1,947 meters above sea level in the center of Jeju-do."
    }
  },

  // Cycle 3: Gyeongju & The Ancient Silla Kingdom
  {
    mcqs: [
      {
        q: "Which southeastern city, known as the Museum Without Walls, was the royal capital of the ancient Silla Kingdom for nearly a millennium (57 BCE to 935 CE)?",
        correct: "Gyeongju",
        w1: "Gongju",
        w2: "Buyeo",
        exp: "Gyeongju contains hundreds of royal burial mounds (Tumuli), stone pagodas, and ancient palace ruins designated as a UNESCO World Heritage site."
      },
      {
        q: "Which monumental 8th-century Buddhist temple in Gyeongju features stone bridges (Cheongungyo and Baegungyo) and two historic stone pagodas (Dabotap and Seokgatap)?",
        correct: "Bulguksa Temple",
        w1: "Haeinsa Temple",
        w2: "Tongdosa Temple",
        exp: "Constructed under Prime Minister Gim Daeseong in 751 CE, Bulguksa is an architectural representation of the Buddhist Pure Land paradise on Earth."
      },
      {
        q: "What 8th-century artificial granite cave grotto on Mount Toham above Bulguksa houses a monumental 3.5-meter seated white granite Buddha gazing toward the East Sea?",
        correct: "Seokguram Grotto",
        w1: "Golgulsa",
        w2: "Girimsa",
        exp: "Seokguram is an engineering masterpiece of interlocking granite dome blocks with sophisticated natural ventilation shafts preventing condensation and mold."
      },
      {
        q: "What 7th-century bottle-shaped stone tower in Gyeongju, constructed under Queen Seondeok in 632 CE, is the oldest surviving astronomical observatory in Asia?",
        correct: "Cheomseongdae",
        w1: "Angbuilgu",
        w2: "Honcheonui",
        exp: "Built from 362 granite stones (representing the days in a lunar year) across twenty-seven stone layers, it was used by royal astronomers to observe constellations."
      },
      {
        q: "What historic royal pond and banquet garden in Gyeongju, built in 674 CE, reflected illuminated Silla royal pavilions and pleasure boats?",
        correct: "Donggung Palace and Wolji Pond Anapji",
        w1: "Hyangwonjeong",
        w2: "Buyongji",
        exp: "Excavations of the pond mud uncovered over 30,000 precious Silla relics, including gilt-bronze Buddha figurines, wooden gaming dice, and royal calligraphy."
      }
    ],
    number: {
      q: "In what year CE was the Cheomseongdae astronomical observatory completed in Gyeongju during the reign of Queen Seondeok of Silla?",
      target: 632,
      unit: "CE",
      imperial: "632 AD (Asia oldest observatory)",
      exp: "Historical records date the construction of the Cheomseongdae observatory to approximately 632 CE during Queen Seondeok reign."
    }
  },

  // Cycle 4: The Korean Demilitarized Zone (DMZ)
  {
    mcqs: [
      {
        q: "What 250-kilometer-long and 4-kilometer-wide buffer zone established along the 38th parallel in July 1953 divides the Korean Peninsula into North and South Korea?",
        correct: "The Korean Demilitarized Zone DMZ",
        w1: "The Military Demarcation Line",
        w2: "The Northern Limit Line",
        exp: "Established by the 1953 Korean Armistice Agreement, the heavily fortified strip has inadvertently become an untouched ecological wildlife sanctuary."
      },
      {
        q: "What famous village inside the DMZ contains the Joint Security Area (JSA), where North and South Korean soldiers stand face-to-face across blue conference buildings?",
        correct: "Panmunjom",
        w1: "Daeseong-dong",
        w2: "Kijong-dong",
        exp: "Panmunjom is the historic site where the 1953 armistice was signed and the venue for inter-Korean diplomatic summit meetings."
      },
      {
        q: "How many major secret subterranean infiltration tunnels dug by North Korean forces beneath the DMZ have been discovered by South Korean and UN military forces since 1974?",
        correct: "4 Infiltration Tunnels",
        w1: "2 Tunnels",
        w2: "8 Tunnels",
        exp: "The Third Tunnel of Aggression, discovered in 1978 just forty-four kilometers from Seoul, could move 30,000 soldiers per hour into the south."
      },
      {
        q: "What rare, critically endangered avian species winters in the peaceful, undisturbed agricultural wetlands and marshes of the Korean DMZ?",
        correct: "Red-Crowned Crane Grus japonensis",
        w1: "Oriental Stork",
        w2: "Black-Faced Spoonbill",
        exp: "The DMZ provides a haven for over one hundred endangered species, including red-crowned and white-naped cranes, Asiatic black bears, and Siberian musk deer."
      },
      {
        q: "In what year was the Korean War Armistice Agreement signed at Panmunjom, establishing the DMZ and halting active combat operations?",
        correct: "1953",
        w1: "1950",
        w2: "1955",
        exp: "Signed on July 27, 1953, by commanders of the UN Command, North Korean People Army, and Chinese People Volunteers, no formal peace treaty was ever concluded."
      }
    ],
    number: {
      q: "In what year was the Korean Armistice Agreement signed at Panmunjom, establishing the Korean Demilitarized Zone (DMZ)?",
      target: 1953,
      unit: "year",
      imperial: "1953 AD",
      exp: "The armistice halting the Korean War was signed on July 27, 1953."
    }
  },

  // Cycle 5: Busan & The Southern Coast
  {
    mcqs: [
      {
        q: "What is the second largest city in South Korea and its primary seaport, located on the southeastern coast overlooking the Korea Strait?",
        correct: "Busan Pusan",
        w1: "Daegu",
        w2: "Ulsan",
        exp: "Busan is the sixth busiest container port in the world, famous for the Busan International Film Festival (BIFF), Haeundae Beach, and Gwangan Diamond Bridge."
      },
      {
        q: "Which colorful hillside neighborhood in Busan, nicknamed the Machu Picchu of Busan and Santorini of the East, is covered in pastel-painted houses and public art murals?",
        correct: "Gamcheon Culture Village",
        w1: "Huindeoul Culture Village",
        w2: "Choryang Village",
        exp: "Originally built as a refuge for displaced refugees during the Korean War in the 1950s, the terraced neighborhood was regenerated into an arts and tourism community."
      },
      {
        q: "What is the largest authentic seafood market in South Korea, located along Busan harbor, famous for live octopus (san-nakji) and fishmonger women called Jagalchi Ajumma?",
        correct: "Jagalchi Fish Market",
        w1: "Noryangjin Market",
        w2: "Gukje Market",
        exp: "Customers select fresh live fish, abalone, king crab, and sea squirts from ground-floor tanks to be sliced immediately into sashimi (hoe) on the second floor."
      },
      {
        q: "What rare, scenic 14th-century Buddhist temple in Busan is built directly on granite rock cliffs crashing against the open East Sea surf?",
        correct: "Haedong Yonggungsa Temple",
        w1: "Beomeosa Temple",
        w2: "Tongdosa Temple",
        exp: "Unlike most Korean temples nestled deep in mountain forests, Haedong Yonggungsa (Dragon Palace Temple) was constructed in 1376 facing the morning sunrise over the ocean."
      },
      {
        q: "What 7.4-kilometer suspension and truss bridge spanning Suyeong Bay in Busan is famous for nighttime LED light shows synchronized to music?",
        correct: "Gwangandaegyo Gwangan Diamond Bridge",
        w1: "Busanhangdaegyo",
        w2: "Incheon Bridge",
        exp: "Gwangan Bridge is the second longest bridge in South Korea, providing the backdrop for the annual Busan International Fireworks Festival drawing over one million spectators."
      }
    ],
    number: {
      q: "In what year was the coastal Haedong Yonggungsa Buddhist temple first founded on the seaside cliffs of Busan by the great monk Naong?",
      target: 1376,
      unit: "year",
      imperial: "1376 AD",
      exp: "Haedong Yonggungsa Temple was established in 1376 during the Goryeo Dynasty."
    }
  },

  // Cycle 6: Hangeul, Sejong the Great & Cultural Heritage
  {
    mcqs: [
      {
        q: "In what year CE did King Sejong the Great promulgate the native Korean scientific phonetic alphabet (Hangeul) to allow common citizens to read and write easily?",
        correct: "1446 CE",
        w1: "1392 CE",
        w2: "1592 CE",
        exp: "Published in the landmark manuscript Hunminjeongeum (Correct Sounds for the Instruction of the People), Hangeul consonant shapes mimic the shape of vocal speech organs."
      },
      {
        q: "How many letters (fourteen consonants and ten basic vowels) comprise the modern standard Korean Hangeul alphabet script?",
        correct: "24 Letters",
        w1: "26 Letters",
        w2: "32 Letters",
        exp: "Linguists consider Hangeul one of the most logically designed and phonetically efficient writing systems in the world, celebrated with a national holiday on October 9."
      },
      {
        q: "What complete set of 81,258 wooden printing blocks of the Buddhist canon, carved in the 13th century without a single typographical error, is preserved at Haeinsa Temple?",
        correct: "Tripitaka Koreana Palman Daejanggyeong",
        w1: "Jikji",
        w2: "Samguk Yusa",
        exp: "Carved between 1236 and 1251 to invoke Buddhist divine protection against Mongol invasions, the birchwood blocks are housed in the UNESCO-listed Janggyeong Panjeon halls."
      },
      {
        q: "What traditional Korean martial art, meaning 'The Way of Kicking and Punching', evolved from ancient Taekkyeon into an official Olympic medal sport in 2000?",
        correct: "Taekwondo",
        w1: "Hapkido",
        w2: "Ssireum",
        exp: "Governed by World Taekwondo with headquarters at the Kukkiwon in Seoul, Taekwondo is practiced in over two hundred countries worldwide."
      },
      {
        q: "What historic Korean naval commander defeated the Imperial Japanese invasion fleet in 1592 by deploying revolutionary iron-clad Turtle Ships (Geobukseon)?",
        correct: "Admiral Yi Sun-sin",
        w1: "General Eulji Mundeok",
        w2: "General Kim Yu-sin",
        exp: "Admiral Yi achieved legendary victories including the 1597 Battle of Myeongnyang (defeating 133 Japanese warships with just thirteen panokseon vessels) without losing a single ship."
      }
    ],
    number: {
      q: "In what year CE did King Sejong the Great officially publish and promulgate the Hunminjeongeum, introducing the Hangeul alphabet to Korea?",
      target: 1446,
      unit: "CE",
      imperial: "1446 AD",
      exp: "The Hunminjeongeum was officially proclaimed in October 1446 (having been completed in late 1443)."
    }
  },

  // Cycle 7: Kimchi, Fermentation & Korean Gastronomy
  {
    mcqs: [
      {
        q: "What UNESCO-inscribed collective traditional practice involves entire families and communities making and sharing hundreds of kilograms of fermented Kimchi before winter?",
        correct: "Kimjang",
        w1: "Chuseok",
        w2: "Seollal",
        exp: "Inscribed in 2013, Kimjang reaffirms Korean family solidarity and generational knowledge of fermenting napa cabbage with chili pepper flake (gochugaru), garlic, ginger, and salted fish."
      },
      {
        q: "What traditional dark, porous earthenware fermentation jars (onggi) have been used in Korea for thousands of years to ferment kimchi, gochujang, and soy sauce?",
        correct: "Onggi Pots",
        w1: "Celadon Jars",
        w2: "Buncheong Pots",
        exp: "Onggi jars feature microscopic pores that allow air to circulate ('breathing pottery') while keeping rain and dust out, facilitating healthy lactic acid bacterial fermentation."
      },
      {
        q: "What iconic Korean rice bowl dish, meaning 'Mixed Rice', is served in a sizzling hot stone pot (Dolsot) topped with sautéed seasoned vegetables, marinated beef, egg, and spicy gochujang?",
        correct: "Bibimbap",
        w1: "Bulgogi",
        w2: "Tteokbokki",
        exp: "Jeonju Bibimbap is celebrated across Korea for using thirty distinct seasonal ingredients including bean sprouts, gosari fern shoots, and seasoned raw beef."
      },
      {
        q: "What clear, distilled alcoholic beverage made from fermented rice and grains, packaged in iconic green glass bottles, is South Korea national spirit and the world best-selling spirit brand?",
        correct: "Soju",
        w1: "Makgeolli",
        w2: "Cheongju",
        exp: "With roots dating back to 13th-century Mongol distillation techniques in Goryeo, soju is the quintessential social beverage consumed with Korean BBQ and street food."
      },
      {
        q: "What sweet and savory Korean barbecue dish consists of thinly sliced beef ribeye or sirloin marinated in soy sauce, sesame oil, garlic, brown sugar, and grated Korean pear?",
        correct: "Bulgogi",
        w1: "Samgyeopsal",
        w2: "Galbi",
        exp: "Bulgogi (literally 'Fire Meat') is grilled over charcoal tables and wrapped in fresh lettuce or perilla leaves with garlic and ssamjang paste."
      }
    ],
    number: {
      q: "How many total letters (14 consonants and 10 basic vowels) make up the standard modern Korean Hangeul alphabet?",
      target: 24,
      unit: "letters",
      imperial: "24 standard letters",
      exp: "The modern Hangeul alphabet comprises twenty-four basic letters (fourteen consonants and ten vowels), combined into phonetic syllabic blocks."
    }
  },

  // Cycle 8: Seoraksan, Mountains & National Parks
  {
    mcqs: [
      {
        q: "What majestic national park in Gangwon Province in northeastern South Korea is famous for jagged granite peaks like Ulsanbawi Rock and spectacular autumn foliage?",
        correct: "Seoraksan National Park",
        w1: "Odaesan National Park",
        w2: "Bukhansan National Park",
        exp: "Daecheongbong (1,708 m) is the highest peak in Seoraksan, home to the Bronze Great Unification Buddha at Sinheungsa Temple."
      },
      {
        q: "What colossal six-peaked granite rock formation in Seoraksan towers over the forest, requiring climbers to ascend an 800-step steel stairway bolted to the cliff face?",
        correct: "Ulsanbawi Rock",
        w1: "Gwongeumseong",
        w2: "Biseondae",
        exp: "Legend holds that the rock walked from Ulsan in the south hoping to become part of the Diamond Mountains (Geumgangsan) in the north, but arrived too late and settled in Seoraksan."
      },
      {
        q: "What is the largest terrestrial national park on mainland South Korea, encompassing the second highest mountain peak on the mainland (Cheonwangbong at 1,915 m)?",
        correct: "Jirisan National Park",
        w1: "Seoraksan",
        w2: "Songnisan",
        exp: "Designated in 1967 as South Korea very first national park, Jirisan is a major habitat for the re-introduced endangered Asiatic black bear."
      },
      {
        q: "What mountain national park situated directly on the northern border of Seoul holds the Guinness World Record for the Most Visited National Park per Unit Area?",
        correct: "Bukhansan National Park",
        w1: "Gwanaksan",
        w2: "Dobongsan",
        exp: "Welcoming over five million hikers each year, Bukhansan features the 836-meter Baegundae granite peak and the 18th-century Bukhansanseong fortress wall."
      },
      {
        q: "What dramatic tidal mudflat wetland systems along the western and southern coasts of South Korea (Getbol) are inscribed as UNESCO World Natural Heritage?",
        correct: "Korean Getbol Tidal Flats",
        w1: "Suncheon Bay",
        w2: "Taeanhaean",
        exp: "The Getbol features extreme ten-meter tidal ranges, supporting 2,150 species of flora and fauna, including mudskippers, mud crabs, and migratory shorebirds on the East Asian-Australasian Flyway."
      }
    ],
    number: {
      q: "What is the summit elevation in meters of Daecheongbong, the highest granite peak in Seoraksan National Park?",
      target: 1708,
      unit: "meters",
      imperial: "5,604 feet",
      exp: "Daecheongbong peak in Seoraksan stands at an official elevation of 1,708 meters above sea level."
    }
  },

  // Cycle 9: Modern Megastructures & Technology
  {
    mcqs: [
      {
        q: "What 555-meter, 123-story supertall skyscraper in the Songpa district of Seoul is the tallest building in South Korea and sixth tallest in the world?",
        correct: "Lotte World Tower",
        w1: "Parc1 Tower",
        w2: "Northeast Asia Trade Tower",
        exp: "Opened in 2017 with an architectural design inspired by traditional Korean ceramic porcelain and calligraphy brushes, it features the Seoul Sky glass observation deck."
      },
      {
        q: "What world-leading high-speed bullet train network in South Korea, operating at speeds of 305 km/h since 2004, connects Seoul to Busan in just two hours and fifteen minutes?",
        correct: "KTX Korea Train eXpress",
        w1: "SRT",
        w2: "ITX-Cheongchun",
        exp: "The KTX transformed South Korea into a half-day travel zone, carrying over one billion cumulative passengers across the Gyeongbu and Honam lines."
      },
      {
        q: "What massive 21.4-kilometer cable-stayed bridge connects Incheon International Airport on Yeongjong Island directly to the international business district of Songdo?",
        correct: "Incheon Bridge Incheondaegyo",
        w1: "Yeongjong Bridge",
        w2: "Seohae Bridge",
        exp: "Opened in 2009, Incheon Bridge is designed to withstand Category 5 typhoon winds and magnitude 7 earthquakes, spanning deep maritime shipping channels."
      },
      {
        q: "What futuristic neo-futuristic curved aluminum building in Seoul, designed by British-Iraqi architect Zaha Hadid, is a major global hub for fashion, design, and exhibitions?",
        correct: "Dongdaemun Design Plaza DDP",
        w1: "Leeum Museum",
        w2: "Seoul City Hall",
        exp: "Built on the site of the former Dongdaemun Stadium, DDP features 45,000 curved aluminum exterior panels with no straight lines in its undulating structural frame."
      },
      {
        q: "What 33.9-kilometer sea dike in North Jeolla Province, completed in 2010, is the longest man-made sea wall in the world, reclaiming 400 square kilometers of agricultural and industrial land?",
        correct: "Saemangeum Seawall",
        w1: "Sihwa Seawall",
        w2: "Afsluitdijk",
        exp: "Surpassing the Dutch Afsluitdijk by nearly two kilometers in length, the Saemangeum project reclaimed a coastal area equivalent to two-thirds the size of Seoul."
      }
    ],
    number: {
      q: "What is the structural height in meters of the Lotte World Tower in Seoul, the tallest building in South Korea?",
      target: 555,
      unit: "meters",
      imperial: "1,821 feet tall (123 stories)",
      exp: "Lotte World Tower rises to a structural height of 555 meters, dominating the Seoul skyline."
    }
  },

  // Cycle 10: Extent, 9 Provinces & Korean Superlatives
  {
    mcqs: [
      {
        q: "What is the total land area of the Republic of Korea (South Korea) in square kilometers, making it roughly the size of Portugal or the US state of Indiana?",
        correct: "100,410 Square Kilometers",
        w1: "55,000 Square Kilometers",
        w2: "150,000 Square Kilometers",
        exp: "Despite its compact land area, South Korea is seventy percent mountainous, supporting a dense, highly urbanized population of over fifty-one million people."
      },
      {
        q: "How many first-level administrative provinces (plus special cities including Seoul, Busan, Daegu, Incheon, Gwangju, Daejeon, Ulsan, and Sejong) comprise South Korea?",
        correct: "9 Provinces and 8 Special Metropolises",
        w1: "6 Provinces and 4 Metropolises",
        w2: "12 Provinces and 2 Metropolises",
        exp: "The provinces include Gyeonggi, Gangwon, North/South Chungcheong, North/South Jeolla, North/South Gyeongsang, and Jeju Special Self-Governing Province."
      },
      {
        q: "What planned smart city in Chungcheong Province, inaugurated in 2012, serves as the de facto administrative capital hosting over thirty national ministries and government agencies?",
        correct: "Sejong Special Self-Governing City",
        w1: "Songdo",
        w2: "Pangyo",
        exp: "Named after King Sejong the Great, Sejong was built to reduce urban congestion in Seoul and promote balanced national regional economic growth."
      },
      {
        q: "What isolated volcanic rock islets in the East Sea, known as Dokdo in Korea and Liancourt Rocks internationally, are guarded by South Korea as its easternmost territory?",
        correct: "Dokdo",
        w1: "Ulleungdo",
        w2: "Marado",
        exp: "Dokdo consists of two main volcanic islets (Dongdo and Seodo) surrounded by eighty-nine smaller reefs, rich in marine fisheries and hydrate energy reserves."
      },
      {
        q: "What small rocky island eleven kilometers off the southern coast of Jeju Island is the southernmost point of sovereign territory of the Republic of Korea?",
        correct: "Marado",
        w1: "Gapado",
        w2: "Ieodo",
        exp: "Marado covers just 0.3 square kilometers, marked by the Southernmost Point of Korea stone monument, a white lighthouse, and famous seafood jajangmyeon restaurants."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Saemangeum Seawall in South Korea, the longest man-made ocean dike in the world?",
      target: 34,
      unit: "kilometers",
      imperial: "21 miles long (33.9 km)",
      exp: "The Saemangeum Seawall measures exactly 33.9 kilometers (rounded to 34 km), certified by Guinness as the longest ocean dike ever constructed."
    }
  }
];

// Build South Korea Quiz
buildQuiz({
  id: 'south-korea-geography-heritage-60',
  theme: 'South Korea: Geography, Volcanic Islands & Joseon Dynasties',
  title: 'South Korea: Geography, Volcanic Islands & Joseon Dynasties',
  description: 'A 60-question grand master assessment exploring Seoul & Gyeongbokgung (1395), Jeju Island & Hallasan (1,947 m), Gyeongju & Bulguksa (632 CE), the DMZ (1953), Busan harbor, Hangeul & King Sejong (1446), Kimjang, and Lotte World Tower (555 m).',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, southKoreaCycles);

console.log('South Korea quiz built successfully!');
