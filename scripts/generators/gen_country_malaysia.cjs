const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 3. malaysia-geography-heritage-60
// =========================================================================
const malaysiaCycles = [
  // Cycle 1: Kuala Lumpur & The Petronas Twin Towers
  {
    mcqs: [
      {
        q: "What capital city of Malaysia, whose name translates from Malay as 'Muddy Confluence', originated in 1857 as a tin-mining settlement at the meeting of the Klang and Gombak rivers?",
        correct: "Kuala Lumpur KL",
        w1: "George Town",
        w2: "Johor Bahru",
        exp: "Kuala Lumpur grew from a swampy tin outpost into a global metropolis, centered around Merdeka Square where Malaysian independence was declared in 1957."
      },
      {
        q: "What iconic 451.9-meter 88-story twin skyscrapers in Kuala Lumpur, designed by Argentine-American architect César Pelli, were the tallest buildings in the world from 1998 to 2004?",
        correct: "Petronas Twin Towers Menara Berkembar Petronas",
        w1: "Menara Kuala Lumpur",
        w2: "The Exchange 106",
        exp: "Inspired by traditional Islamic geometric eight-pointed star patterns (Rub el Hizb), the towers remain the tallest twin buildings on Earth."
      },
      {
        q: "What double-decker connecting skybridge links the Petronas Twin Towers at the 41st and 42nd floors, suspended 170 meters above the ground?",
        correct: "The Skybridge",
        w1: "The Horizon Walkway",
        w2: "The Crescent Bridge",
        exp: "The 58-meter skybridge is not rigidly attached to either tower; instead, it is designed to slide in and out of the towers to accommodate wind sway."
      },
      {
        q: "What 678.9-meter megatall skyscraper in Kuala Lumpur, completed in 2023, is officially the second tallest building in the world after Dubai Burj Khalifa?",
        correct: "Merdeka 118 PNB 118",
        w1: "Petronas Towers",
        w2: "Four Seasons Place KL",
        exp: "The silhouette of Merdeka 118 was inspired by the iconic raised-arm posture of Prime Minister Tunku Abdul Rahman shouting 'Merdeka!' (Independence) in 1957."
      },
      {
        q: "What historic 19th-century landmark in Kuala Lumpur, facing Merdeka Square, features distinctive copper domes and a 41-meter clock tower in the Indo-Saracenic Mughal architectural style?",
        correct: "Sultan Abdul Samad Building",
        w1: "Kuala Lumpur Railway Station",
        w2: "National Mosque",
        exp: "Designed by British architect A.C. Norman in 1897 to house the British colonial administration, it now houses the Ministry of Communications and Digital."
      }
    ],
    number: {
      q: "What is the architectural structural height in meters of the world-famous Petronas Twin Towers in Kuala Lumpur?",
      target: 452,
      unit: "meters",
      imperial: "1,483 feet tall (88 stories)",
      exp: "The Petronas Twin Towers stand at an official architectural height of 451.9 meters (rounded to 452 m)."
    }
  },

  // Cycle 2: Batu Caves & Hindu Sanctuaries
  {
    mcqs: [
      {
        q: "What massive 400-million-year-old limestone hill complex in Gombak, Selangor, north of Kuala Lumpur, is one of the most famous Hindu religious shrines outside India?",
        correct: "Batu Caves",
        w1: "Gua Tempurung",
        w2: "Gua Charas",
        exp: "Dedicated to the Hindu deity Lord Murugan, Batu Caves features massive cavern chambers, stalactites, and sacred troops of long-tailed macaque monkeys."
      },
      {
        q: "What colossal 42.7-meter (140-foot) gold-painted statue, the tallest statue of a Hindu deity in Malaysia, guards the base of the entrance stairway at Batu Caves?",
        correct: "Statue of Lord Murugan",
        w1: "Statue of Lord Shiva",
        w2: "Statue of Lord Ganesha",
        exp: "Constructed in 2006 using 350 tons of steel and 300 liters of gold paint imported from Thailand, it is the third tallest statue of Lord Murugan in the world."
      },
      {
        q: "How many steep, colorful concrete stairs painted in vibrant rainbow colors must pilgrims and visitors climb to reach the entrance of the main Cathedral Cave at Batu Caves?",
        correct: "272 Stairs",
        w1: "108 Stairs",
        w2: "365 Stairs",
        exp: "In 2018, the 272 steps were painted in vibrant rainbow gradients, creating an international photographic sensation leading up to the limestone cavern."
      },
      {
        q: "What spectacular annual Tamil Hindu festival celebrated at Batu Caves in January or February attracts over one million devotees carrying heavy physical burden offerings (Kavadi)?",
        correct: "Thaipusam",
        w1: "Deepavali",
        w2: "Pongal",
        exp: "Devotees carry ornate wooden canopies decorated with peacock feathers or pierce their cheeks and torsos with metal skewers (vel) in acts of penance and thanksgiving."
      },
      {
        q: "What ecological cave system below the main temple at Batu Caves protects the critically endangered, prehistoric Trapdoor Spider (Liphistius batuensis)?",
        correct: "The Dark Cave Gua Gelap",
        w1: "Cathedral Cave",
        w2: "Ramayana Cave",
        exp: "The Dark Cave is a protected biological conservation area featuring two kilometers of undisturbed passages supporting rare cave bats, snails, and blind cave crickets."
      }
    ],
    number: {
      q: "How many steep painted stairs must visitors climb to reach the upper Cathedral Cave at Batu Caves in Malaysia?",
      target: 272,
      unit: "stairs",
      imperial: "272 rainbow steps",
      exp: "Batu Caves features exactly 272 stairs climbing up the sheer face of the limestone karst cliff."
    }
  },

  // Cycle 3: Mount Kinabalu & Malaysian Borneo
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Malaysia and the island of Borneo, rising 4,095 meters in Sabah as a UNESCO World Heritage site?",
        correct: "Mount Kinabalu Gunung Kinabalu",
        w1: "Mount Trusmadi",
        w2: "Mount Murud",
        exp: "Kinabalu is a young granite pluton dome rising above the Crocker Range, revered in local Kadazan-Dusun indigenous culture as the sacred resting place of departed spirits (Aki Nabalu)."
      },
      {
        q: "What is the highest point of Mount Kinabalu, named after the British colonial administrator and naturalist who made the first recorded ascent in 1851?",
        correct: "Low Peak",
        w1: "St. John Peak",
        w2: "South Peak",
        exp: "Sir Hugh Low made the first recorded partial ascent in March 1851, with the summit peak standing at 4,095.2 meters above sea level."
      },
      {
        q: "What giant carnivorous pitcher plant species, endemic exclusively to the slopes of Mount Kinabalu, produces pitchers holding up to 3.5 liters of liquid capable of trapping small vertebrates?",
        correct: "Nepenthes rajah King of Pitcher Plants",
        w1: "Nepenthes lowii",
        w2: "Nepenthes villosa",
        exp: "Nepenthes rajah has evolved a mutualistic relationship with mountain tree shrews and summit rats, which defecate into the pitcher bowl while feeding on nectar on the lid."
      },
      {
        q: "What extreme mountaineering route on Mount Kinabalu, beginning at 3,200 meters, is certified by Guinness as the Highest Via Ferrata (Iron Path) in the world?",
        correct: "Mountain Torq Via Ferrata",
        w1: "Low Gully Via Ferrata",
        w2: "Kinabalu Traverse",
        exp: "Climbers traverse sheer granite cliff walls secured to steel cables, rungs, and suspension rope bridges with panoramic views above the clouds."
      },
      {
        q: "What unique geological feature forms the dramatic jagged silhouettes atop the granite summit plateau of Mount Kinabalu, including Donkey Ears Peak and South Peak?",
        correct: "Glacial freeze-thaw erosion of granodiorite rock during the last Ice Age",
        w1: "Active volcanic calderas",
        w2: "Meteorite impact craters",
        exp: "Ice sheets covered the summit plateau 10,000 years ago, scouring smooth granite slabs and carving sharp spires that rise starkly above surrounding tropical rainforests."
      }
    ],
    number: {
      q: "What is the official surveyed summit elevation in meters above sea level of Mount Kinabalu in Sabah, Malaysia?",
      target: 4095,
      unit: "meters",
      imperial: "13,435 feet",
      exp: "Mount Kinabalu reaches an official elevation of 4,095.2 meters above sea level in Kinabalu National Park."
    }
  },

  // Cycle 4: Taman Negara & Ancient Rainforests
  {
    mcqs: [
      {
        q: "What massive 4,343-square-kilometer national park in Peninsular Malaysia encompasses one of the oldest deciduous rainforests on Earth, dating back over 130 million years?",
        correct: "Taman Negara National Park",
        w1: "Endau-Rompin National Park",
        w2: "Royal Belum State Park",
        exp: "Older than the Amazon or Congo rainforests, Taman Negara (meaning 'National Park' in Malay) evolved undisturbed by Ice Age glaciations, home to immense biological richness."
      },
      {
        q: "What famous 530-meter suspended aerial walkway in Taman Negara, suspended forty meters above the jungle floor between giant tualang trees, is one of the longest canopy walkways in the world?",
        correct: "Taman Negara Canopy Walkway",
        w1: "Tree Top Walk",
        w2: "Sedim River Canopy Walk",
        exp: "The rope and wooden plank walkway allows visitors to observe arboreal bird species, flying squirrels, and orchids flourishing in the high forest canopy layer."
      },
      {
        q: "What critically endangered, nocturnal odd-toed ungulate species native to the rainforests of Taman Negara features distinctive black-and-white color-blocked camouflage patterning?",
        correct: "Malayan Tapir Tapirus indicus",
        w1: "Sumatran Rhinoceros",
        w2: "Asian Elephant",
        exp: "The largest of the four tapir species on Earth, the Malayan tapir has a flexible proboscis snout used to strip leaves, twigs, and fruits from low forest shrubs."
      },
      {
        q: "What indigenous hunter-gatherer group (Orang Asli) inhabiting the deep interior jungles of Taman Negara is renowned for hunting small game using long bamboo blowpipes with poison darts?",
        correct: "The Batek People",
        w1: "The Semai",
        w2: "The Jakun",
        exp: "Batek blowpipes (sumpit) fire darts coated with natural sap extracted from the toxic Ipoh tree (Antiaris toxicaria), paralyzing monkeys and birds in high tree canopies."
      },
      {
        q: "What is the tallest tropical tree species in the world, growing up to eighty-eight meters high in the rainforests of Malaysia, providing nesting sites for wild giant Asian honeybees?",
        correct: "Tualang Tree Koompassia excelsa",
        w1: "Meranti Tree",
        w2: "Chengal Tree",
        exp: "Tualang trees possess smooth slippery white bark that prevents sun bears from climbing, where wild honey collectors scale ropes at night to harvest wild honey combs."
      }
    ],
    number: {
      q: "What is the total length in meters of the suspended canopy walkway in Taman Negara National Park, Malaysia?",
      target: 530,
      unit: "meters",
      imperial: "1,740 feet long (40 meters high)",
      exp: "The Taman Negara canopy walkway stretches for 530 meters across nine interconnected suspension spans."
    }
  },

  // Cycle 5: Historic Straits Cities: George Town & Melaka
  {
    mcqs: [
      {
        q: "Which two historic port cities along the Strait of Malacca were jointly inscribed on the UNESCO World Heritage list in 2008 as living testaments to 500 years of multicultural maritime trading?",
        correct: "George Town (Penang) and Melaka",
        w1: "Kuala Lumpur and Ipoh",
        w2: "Kuching and Kota Kinabalu",
        exp: "Both cities preserve distinctive shophouse architecture reflecting Portuguese, Dutch, British, Chinese, Malay, and Indian mercantile convergence."
      },
      {
        q: "What unique cultural community in Melaka and Penang, also known as Peranakan, arose from the intermarriage of early 15th-century Chinese merchants with local Malay women?",
        correct: "Baba-Nyonya Straits Chinese",
        w1: "Chitty",
        w2: "Kristang",
        exp: "Baba-Nyonya culture is celebrated for Nyonya cuisine (blending Chinese ingredients with Malay spices and coconut milk), ornate beadwork shoes, and vibrant kebaya dresses."
      },
      {
        q: "In what historic year did Portuguese naval forces under Afonso de Albuquerque capture the wealthy Sultanate of Melaka, establishing the first European colonial fortress in Southeast Asia?",
        correct: "1511",
        w1: "1492",
        w2: "1588",
        exp: "The conquest gave Portugal strategic control over the vital spice trade chokepoint between India and the Spice Islands, commemorated by the ruined stone gate of A Famosa."
      },
      {
        q: "What famous historic blue-walled mansion in George Town, Penang, built with thirty-eight rooms and seven courtyards according to strict Feng Shui principles, belonged to a 19th-century Chinese tycoon?",
        correct: "Cheong Fatt Tze Mansion The Blue Mansion",
        w1: "Pinang Peranakan Mansion",
        w2: "Khoo Kongsi",
        exp: "Winner of the UNESCO Most Excellent Project Award, the mansion features Scottish cast-iron balustrades, English Art Nouveau stained glass, and indigo-limewash walls."
      },
      {
        q: "What terracotta-red 18th-century Dutch colonial square in Melaka, featuring the Stadthuys (oldest Dutch building in the East) and Christ Church, reflects over a century of Dutch rule?",
        correct: "Dutch Square Red Square",
        w1: "St. Paul Hill",
        w2: "Jonker Square",
        exp: "Built by the Dutch East India Company (VOC) using red bricks shipped directly from Zeeland, the square features the Queen Victoria Diamond Jubilee Fountain."
      }
    ],
    number: {
      q: "In what year did Portuguese naval commander Afonso de Albuquerque conquer the Sultanate of Melaka, launching European colonial presence in Malaysia?",
      target: 1511,
      unit: "year",
      imperial: "1511 AD",
      exp: "Portuguese forces captured Melaka in August 1511, building the fortress of A Famosa."
    }
  },

  // Cycle 6: Wildlife of Sabah & Sarawak
  {
    mcqs: [
      {
        q: "What world-famous wildlife sanctuary in Sabah, founded in 1964, was the first official center in the world dedicated to rescuing and rehabilitating orphaned Bornean orangutans?",
        correct: "Sepilok Orangutan Rehabilitation Centre",
        w1: "Semenggoh Wildlife Centre",
        w2: "Matang Wildlife Centre",
        exp: "Covering 43 square kilometers of Kabili-Sepilok Forest Reserve, visitors observe rescued orangutans (Pongo pygmaeus) learning survival skills at outdoor feeding platforms."
      },
      {
        q: "What massive underground cave chamber in Gunung Mulu National Park in Sarawak is the largest enclosed subterranean cavern room on Earth by surface area?",
        correct: "The Sarawak Chamber Gua Nasib Bagus",
        w1: "Deer Cave",
        w2: "Clearwater Cave",
        exp: "Measuring 600 meters long, 415 meters wide, and 80 meters high, the Sarawak Chamber could comfortably accommodate forty Boeing 747 aircraft inside its single open space."
      },
      {
        q: "What colossal cave in Gunung Mulu National Park features the world largest natural cave entrance passage, where three million wrinkle-lipped bats emerge in swirling ribbons every evening?",
        correct: "Deer Cave Gua Rusa",
        w1: "Lang Cave",
        w2: "Wind Cave",
        exp: "The colossal entrance measures 146 meters wide and 122 meters high, featuring a natural silhouette rock formation in the entrance resembling Abraham Lincoln profile."
      },
      {
        q: "What major 560-kilometer river in eastern Sabah is famous for incredible biodiversity, where boat safaris spot wild pygmy elephants, proboscis monkeys, and saltwater crocodiles?",
        correct: "Kinabatangan River Sungai Kinabatangan",
        w1: "Rajang River",
        w2: "Baram River",
        exp: "The Lower Kinabatangan Wildlife Sanctuary is one of only two places on Earth where ten distinct primate species live in the same forest."
      },
      {
        q: "What miniature, round-eared elephant subspecies, standing only two to 2.5 meters tall with oversized ears and long tails, is native exclusively to the island of Borneo?",
        correct: "Borneo Pygmy Elephant Elephas maximus borneensis",
        w1: "Sumatran Elephant",
        w2: "Indian Elephant",
        exp: "With fewer than 1,500 individuals remaining in the wild, genetic evidence shows they diverged from Asian mainland elephants roughly 300,000 years ago."
      }
    ],
    number: {
      q: "In what year was the Sepilok Orangutan Rehabilitation Centre officially established in Sabah, Malaysian Borneo?",
      target: 1964,
      unit: "year",
      imperial: "1964 AD",
      exp: "Sepilok was founded in 1964 by the Sabah Wildlife Department to care for displaced infant orangutans."
    }
  },

  // Cycle 7: Langkawi & Marine Archipelagos
  {
    mcqs: [
      {
        q: "What tropical archipelago of ninety-nine islands in the Andaman Sea off the northwest coast of Peninsular Malaysia was declared Southeast Asia very first UNESCO Global Geopark in 2007?",
        correct: "Langkawi Archipelago",
        w1: "Perhentian Islands",
        w2: "Redang Island",
        exp: "Known as the Jewel of Kedah, Langkawi is famous for ancient Cambrian sandstone rock formations, mangrove boat safaris in Kilim Geoforest Park, and duty-free status."
      },
      {
        q: "What spectacular 125-meter curved pedestrian cable-stayed bridge in Langkawi hangs from a single 82-meter inclined pylon 660 meters above sea level over Mount Mat Cincang?",
        correct: "Langkawi Sky Bridge",
        w1: "Penang Bridge",
        w2: "Jambatan Sultan Abdul Halim",
        exp: "Accessible via the Langkawi Cable Car (SkyCab), the curved bridge features glass-bottom viewing panels offering views across the Andaman Sea to southern Thailand."
      },
      {
        q: "What small oceanic island in eastern Sabah, rising 600 meters from a deep seabed off Semporna, is internationally acclaimed by scuba divers for massive schools of barracuda and sea turtles?",
        correct: "Sipadan Island Pulau Sipadan",
        w1: "Mabul Island",
        w2: "Kapalai Island",
        exp: "Formed by living corals growing over an extinct volcanic cone, ocean legend Jacques Cousteau described Sipadan as an 'untouched piece of art'."
      },
      {
        q: "What famous pair of coral-fringed islands off the northeastern coast of Terengganu (Pulau Perhentian Besar and Kecil) are famous for transparent waters, snorkeling with reef sharks, and backpacker beaches?",
        correct: "The Perhentian Islands",
        w1: "Tioman Island",
        w2: "Tenggol Island",
        exp: "Meaning 'Stopping Point' in Malay (from their historic role as trading waypoints between Malaya and Bangkok), the islands are protected marine conservation parks."
      },
      {
        q: "What 13.5-kilometer road bridge opened in 1985, connecting the island of Penang across the South Channel to Seberang Perai on the mainland?",
        correct: "The First Penang Bridge Jambatan Pulau Pinang",
        w1: "Sultan Abdul Halim Muadzam Shah Bridge",
        w2: "Johor-Singapore Causeway",
        exp: "When opened, it was the third longest bridge in the world, supplemented in 2014 by the 24-kilometer Second Penang Bridge, the longest bridge in Southeast Asia."
      }
    ],
    number: {
      q: "What is the total curved length in meters of the famous Langkawi Sky Bridge suspended above Mount Mat Cincang in Malaysia?",
      target: 125,
      unit: "meters",
      imperial: "410 feet curved span",
      exp: "The Langkawi Sky Bridge measures exactly 125 meters in curved walking length, suspended 660 meters above sea level."
    }
  },

  // Cycle 8: Malaysian Gastronomy: Nasi Lemak & Durian
  {
    mcqs: [
      {
        q: "What is the undisputed national dish of Malaysia, consisting of fragrant rice cooked in coconut milk and pandan leaves, served with spicy chili sambal, crispy anchovies (ikan bilis), toasted peanuts, cucumber, and hard-boiled egg?",
        correct: "Nasi Lemak",
        w1: "Nasi Goreng",
        w2: "Nasi Kerabu",
        exp: "Traditionally wrapped in a triangular banana-leaf parcel (bungkus), Nasi Lemak is eaten for breakfast, lunch, and dinner at street food stalls and luxury restaurants alike."
      },
      {
        q: "Which premium, world-renowned cultivar of durian, originating in Raub, Pahang, is famous for bright golden-yellow buttery flesh, rich bittersweet flavor, and small flat seeds?",
        correct: "Musang King Mao Shan Wang (D197)",
        w1: "Black Thorn",
        w2: "D24",
        exp: "Musang King (King of the Civet Cat) commands premium prices across Asia, celebrated as the Gold Standard of tropical durian fruits."
      },
      {
        q: "What iconic Malaysian street food flatbread, influenced by Indian immigrants and expertly flipped and spun in the air by Mamak stall cooks until paper-thin and crispy, is served with dhal and curry?",
        correct: "Roti Canai Roti Prata",
        w1: "Murtabak",
        w2: "Naan",
        exp: "Voted repeatedly among the world best street foods by global food guides, Roti Canai is kneaded with clarified butter (ghee) and cooked on a flat griddle."
      },
      {
        q: "What famous spicy, sour fish-based noodle soup from Penang features thick rice noodles in a rich mackerel broth flavored with tamarind (asam), lemongrass, galangal, mint, and torch ginger flower?",
        correct: "Penang Assam Laksa",
        w1: "Curry Laksa",
        w2: "Sarawak Laksa",
        exp: "Assam Laksa was ranked by CNN Travel as one of the ten most delicious foods in the world, topped with sweet dark shrimp paste (hae ko)."
      },
      {
        q: "What popular Malaysian shaved ice dessert is topped with sweet red beans, green pandan rice flour jelly noodles (cendol), sweet corn, grass jelly, evaporated milk, and rich palm sugar syrup (Gula Melaka)?",
        correct: "Ais Kacang ABC (Air Batu Campur)",
        w1: "Cendol",
        w2: "Bubur Cha Cha",
        exp: "A colorful mountain of shaved ice, ABC is the quintessential refreshing street food dessert to beat the tropical Malaysian heat."
      }
    ],
    number: {
      q: "How many core traditional side accompaniments (sambal, ikan bilis anchovies, peanuts, cucumber slices) accompany the coconut rice in classic Malaysian Nasi Lemak?",
      target: 4,
      unit: "core accompaniments",
      imperial: "4 traditional side elements",
      exp: "Authentic Malaysian Nasi Lemak is traditionally served with four essential side components: spicy sambal, fried anchovies with peanuts, fresh cucumber, and egg."
    }
  },

  // Cycle 9: Tea Plantations & Cameron Highlands
  {
    mcqs: [
      {
        q: "What scenic highland hill station in Pahang, situated at 1,500 meters elevation in the Titiwangsa Mountains, is famous for emerald tea plantations, strawberry farms, and cool 18°C temperatures?",
        correct: "Cameron Highlands",
        w1: "Genting Highlands",
        w2: "Fraser Hill",
        exp: "Named after British surveyor William Cameron who mapped the plateau in 1885, it served as a cool highland health retreat for British colonial administrators."
      },
      {
        q: "What largest black tea producer in Malaysia, founded in the Cameron Highlands in 1929 by British businessman J.A. Russell, operates the scenic Sungei Palas Tea Garden?",
        correct: "BOH Tea Best of Highlands",
        w1: "Bharat Tea Cameronian",
        w2: "Sabah Tea",
        exp: "BOH produces millions of cups of tea daily from 8,000 acres of terraced mountain tea bushes, home to an iconic cantilevered glass viewing cafe."
      },
      {
        q: "What ancient high-altitude cloud forest on Mount Brinchang in the Cameron Highlands is covered in thick green moss, hanging lichens, pitcher plants, and wild mountain orchids?",
        correct: "The Mossy Forest Gunung Brinchang",
        w1: "Taman Negara",
        w2: "Kabili Forest",
        exp: "Low-hanging clouds and perpetual mist wrap the stunted trees in thick blankets of spongy moss, often compared to the fantasy setting of Lord of the Rings."
      },
      {
        q: "Which American businessman and former OSS officer, credited with reviving the Thai silk industry, mysteriously vanished without a trace while walking in the Cameron Highlands in March 1967?",
        correct: "Jim Thompson",
        w1: "Howard Hughes",
        w2: "Michael Rockefeller",
        exp: "Thompson went for an afternoon walk from the Moonlight Bungalow and was never seen again, sparking one of the most famous unsolved mysteries in Southeast Asian history."
      },
      {
        q: "What vibrant entertainment resort city atop Mount Ulu Kali at 1,800 meters elevation in the Titiwangsa Mountains features Malaysia only legal land-based casino and indoor theme parks?",
        correct: "Genting Highlands Resorts World Genting",
        w1: "Bukit Tinggi",
        w2: "Fraser Hill",
        exp: "Founded in 1965 by entrepreneur Lim Goh Tong, visitors ascend to the summit resorts via the 3.4-kilometer Awana SkyWay gondola cable car."
      }
    ],
    number: {
      q: "In what year did British entrepreneur J.A. Russell establish the historic BOH Tea Plantation in the Cameron Highlands of Malaysia?",
      target: 1929,
      unit: "year",
      imperial: "1929 AD",
      exp: "BOH Plantations was founded in 1929, pioneering commercial highland tea cultivation in Malaya."
    }
  },

  // Cycle 10: Extent, 13 States & Malaysian Superlatives
  {
    mcqs: [
      {
        q: "Into how many sovereign federated states (plus three Federal Territories of Kuala Lumpur, Putrajaya, and Labuan) is the Federation of Malaysia politically structured?",
        correct: "13 States and 3 Federal Territories",
        w1: "10 States and 2 Territories",
        w2: "15 States and 1 Territory",
        exp: "Eleven states are located in Peninsular Malaysia (e.g. Selangor, Perak, Penang, Johor, Pahang) and two states (Sabah and Sarawak) on the island of Borneo."
      },
      {
        q: "What is the largest state in Malaysia by geographical land area, covering over 124,000 square kilometers on the northwestern coast of Borneo?",
        correct: "Sarawak The Land of the Hornbills",
        w1: "Sabah",
        w2: "Pahang",
        exp: "Sarawak is roughly the size of Peninsular Malaysia, featuring the 563-kilometer Rajang River, vast peat swamp forests, and indigenous Dayak longhouses."
      },
      {
        q: "What unique constitutional monarchical system exists in Malaysia, where the Head of State (Yang di-Pertuan Agong / King) is elected for a 5-year term from among the hereditary royal rulers?",
        correct: "Elective Rotational Monarchy among the 9 Malay Royal Sultans",
        w1: "Direct Public Presidential Election",
        w2: "Hereditary Primogeniture Succession",
        exp: "The Conference of Rulers elects the King every five years from the hereditary royal rulers of the nine Malay states (Johor, Kedah, Kelantan, Negeri Sembilan, Pahang, Perak, Perlis, Selangor, Terengganu)."
      },
      {
        q: "What planned smart city and federal administrative centre, established in 1995 twenty-five kilometers south of Kuala Lumpur, houses the official residence and offices of the Prime Minister (Perdana Putra)?",
        correct: "Putrajaya",
        w1: "Cyberjaya",
        w2: "Iskandar Puteri",
        exp: "Named after Malaysia first Prime Minister Tunku Abdul Rahman Putra, Putrajaya features the pink granite dome of the Putra Mosque and the Putrajaya Lake."
      },
      {
        q: "What is the total geographical land area of Malaysia in square kilometers, separated by the South China Sea into two distinct geographical landmasses?",
        correct: "330,803 Square Kilometers",
        w1: "180,000 Square Kilometers",
        w2: "500,000 Square Kilometers",
        exp: "Malaysia spans 330,803 square kilometers, home to over thirty-four million people united under the national motto 'Bersekutu Bertambah Mutu' (Unity is Strength)."
      }
    ],
    number: {
      q: "How many sovereign administrative States comprise the Federation of Malaysia?",
      target: 13,
      unit: "states",
      imperial: "13 states",
      exp: "The Federation of Malaysia consists of thirteen member states alongside the three Federal Territories."
    }
  }
];

// Build Malaysia Quiz
buildQuiz({
  id: 'malaysia-geography-heritage-60',
  theme: 'Malaysia: Geography, The Petronas Towers & Ancient Rainforests',
  title: 'Malaysia: Geography, The Petronas Towers & Ancient Rainforests',
  description: 'A 60-question grand master assessment exploring Kuala Lumpur & Petronas Towers (452 m), Batu Caves (272 steps), Mount Kinabalu (4,095 m), Taman Negara 130-million-year rainforest (530 m walkway), George Town & Melaka (1511), Sepilok orangutans (1964), Langkawi, and Nasi Lemak.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, malaysiaCycles);

console.log('Malaysia quiz built successfully!');
