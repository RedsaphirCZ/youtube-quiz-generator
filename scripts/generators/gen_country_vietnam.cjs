const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 4. vietnam-geography-heritage-60
// =========================================================================
const vietnamCycles = [
  // Cycle 1: Ha Long Bay & Gulf of Tonkin Karst
  {
    mcqs: [
      {
        q: "What UNESCO World Heritage bay in the Gulf of Tonkin features over 1,600 limestone karst islands and islets rising dramatically from emerald waters?",
        correct: "Ha Long Bay Vịnh Hạ Long",
        w1: "Lan Ha Bay",
        w2: "Bai Tu Long Bay",
        exp: "Ha Long (meaning 'Descending Dragon' in Vietnamese) is linked in folklore to a celestial mother dragon spitting jade jewels that turned into islands to stop invaders."
      },
      {
        q: "What massive cavern in Ha Long Bay, discovered by French explorers in 1901, features three vast chambers adorned with stalactites lit in multicolor lights?",
        correct: "Sung Sot Cave Surprise Cave",
        w1: "Thien Cung Cave Heavenly Palace",
        w2: "Dau Go Cave",
        exp: "Surprise Cave covers 12,200 square meters inside Bo Hon Island, featuring a soaring thirty-meter-high ceiling resembling a grand theater auditorium."
      },
      {
        q: "Which island in Ha Long Bay, named after Soviet cosmonaut Gherman Titov who visited with President Ho Chi Minh in 1962, features a 400-step panoramic mountain lookout?",
        correct: "Ti Top Island",
        w1: "Cat Ba Island",
        w2: "Tuan Chau Island",
        exp: "Ti Top Island features a crescent-shaped white sand beach and a summit gazebo offering 360-degree views across the karst archipelago."
      },
      {
        q: "What is the largest island in the Ha Long Bay archipelago, home to a national park protecting the critically endangered Cat Ba langur monkey?",
        correct: "Cat Ba Island Đảo Cát Bà",
        w1: "Co To Island",
        w2: "Bach Long Vi",
        exp: "Cat Ba covers 260 square kilometers, famous for floating fishing villages, Cannon Fort, and less than seventy surviving wild Golden-headed Cat Ba langurs."
      },
      {
        q: "What geological process over 500 million years formed the towering conical karst pillars (fengcong) and isolated towers (fenglin) of Ha Long Bay?",
        correct: "Tropical limestone karst dissolution and sea level transgression",
        w1: "Volcanic basalt lava cooling",
        w2: "Glacial moraine deposition",
        exp: "Thick layers of Paleozoic limestone were dissolved by tropical rainwater and eroded by rising marine waters following the last glacial period."
      }
    ],
    number: {
      q: "Approximately how many limestone karst islands and islets comprise the UNESCO World Heritage seascape of Ha Long Bay?",
      target: 1600,
      unit: "islands",
      imperial: "1,600+ limestone islands",
      exp: "Ha Long Bay encompasses approximately 1,600 to 2,000 distinct limestone karst islands and islets across 1,553 square kilometers."
    }
  },

  // Cycle 2: Son Doong & Underground Wonders
  {
    mcqs: [
      {
        q: "What colossal cave in Phong Nha-Kẻ Bàng National Park in central Vietnam is recognized as the largest natural cave passage on Earth by cross-sectional volume?",
        correct: "Hang Son Doong Sơn Đoòng Cave",
        w1: "Hang En",
        w2: "Paradise Cave",
        exp: "Discovered in 1990 by local logger Hồ Khanh and surveyed in 2009 by the British Cave Research Association, Son Doong is over nine kilometers long."
      },
      {
        q: "What is the cavern ceiling height in meters of the largest continuous chamber in Hang Son Doong, tall enough to fit a 40-story skyscraper?",
        correct: "200 Meters",
        w1: "80 Meters",
        w2: "120 Meters",
        exp: "The main passage reaches 200 meters high and 150 meters wide, possessing its own localized microclimate, underground clouds, and subterranean river system."
      },
      {
        q: "What unique geological features inside Hang Son Doong were created by collapsed limestone cavern ceilings that allow sunlight to sustain lush underground tropical rainforests (doline jungles)?",
        correct: "Dolines Sinkholes",
        w1: "Cenotes",
        w2: "Calderas",
        exp: "Doline 1 (Watch Out for Dinosaurs) and Doline 2 (Garden of Edam) allow sunlight to nourish trees up to thirty meters tall, populated by monkeys, bats, and hornbills."
      },
      {
        q: "What spectacular 31-kilometer dry cave in Phong Nha-Kẻ Bàng is known as the Underground Royal Palace for its towering illuminated calcite stalactites?",
        correct: "Paradise Cave Động Thiên Đường",
        w1: "Phong Nha Cave",
        w2: "Tối Cave Dark Cave",
        exp: "Discovered in 2005, Paradise Cave features wooden boardwalks winding through cathedral-like chambers filled with white crystal stalagmites resembling lotus flowers."
      },
      {
        q: "What massive subterranean calcite formation at the end of Hang Son Doong stands eighty meters tall, known to explorers as the Great Wall of Vietnam?",
        correct: "The Great Wall of Vietnam",
        w1: "The Dragon Spine",
        w2: "The Colossus Wall",
        exp: "The 80-meter vertical calcite flowstone barrier blocked earlier expeditions until technical climbers bolted scaling ropes to reach the cave rear exit."
      }
    ],
    number: {
      q: "What is the maximum ceiling height in meters inside the main passage of Hang Son Doong, the largest cave in the world?",
      target: 200,
      unit: "meters high",
      imperial: "656 feet high (fits a 40-story skyscraper)",
      exp: "The largest subterranean passage in Hang Son Doong reaches an unprecedented height of 200 meters from floor to ceiling."
    }
  },

  // Cycle 3: Red River Delta & Hanoi Heritage
  {
    mcqs: [
      {
        q: "In what year CE did King Lý Thái Tổ found the imperial capital of Thăng Long (modern-day Hanoi) after seeing a vision of a golden dragon ascending over the Red River?",
        correct: "1010 CE",
        w1: "1288 CE",
        w2: "1428 CE",
        exp: "Celebrated in 2010 with its Millennium of Hanoi jubilee, Thăng Long (Ascending Dragon) became the enduring cultural and political heart of Vietnam."
      },
      {
        q: "What historic commercial quarter in Hanoi is famous for its maze of thirty-six guild streets (36 Phố Phường), each named after the specific artisan good historically traded there?",
        correct: "Hanoi Old Quarter Phố Cổ Hà Nội",
        w1: "Ba Dinh District",
        w2: "Tay Ho District",
        exp: "Streets like Hàng Bạc (Silver Street), Hàng Gai (Silk Street), and Hàng Mã (Paper Offering Street) retain narrow traditional tube houses (nhà ống)."
      },
      {
        q: "What picturesque natural freshwater lake in the center of historic Hanoi is named the Lake of the Returned Sword after the legend of King Lê Lợi golden turtle deity?",
        correct: "Hoan Kiem Lake Hồ Hoàn Kiếm",
        w1: "West Lake Hồ Tây",
        w2: "Truc Bach Lake",
        exp: "According to 15th-century lore, the Golden Turtle God (Kim Quy) reclaimed the magic sword Thuận Thiên used by King Lê Lợi to defeat the Ming invaders."
      },
      {
        q: "What 11th-century Confucian temple complex in Hanoi, founded in 1070 by Emperor Lý Thánh Tông, served as the Imperial Academy (Quốc Tử Giám), Vietnam first national university?",
        correct: "The Temple of Literature Văn Miếu",
        w1: "One Pillar Pagoda",
        w2: "Tran Quoc Pagoda",
        exp: "The temple contains eighty-two stone turtle steles inscribed with the names and birthplaces of 1,307 doctoral laureates who passed royal imperial examinations."
      },
      {
        q: "Which iconic 11th-century Buddhist wooden pagoda in Hanoi is designed to resemble a blooming lotus blossom emerging from a square pond, perched atop a single stone pillar?",
        correct: "One Pillar Pagoda Chùa Một Cột",
        w1: "Tran Quoc Pagoda",
        w2: "Perfume Pagoda",
        exp: "Built by Emperor Lý Thái Tông in 1049 after dreaming the Goddess of Mercy handed him a baby son while seated on a lotus flower."
      }
    ],
    number: {
      q: "In what year CE was the city of Hanoi (originally named Thăng Long) officially established as the imperial capital of Vietnam?",
      target: 1010,
      unit: "CE",
      imperial: "1010 AD (over 1,000 years ago)",
      exp: "King Lý Thái Tổ issued the Edict on the Transfer of the Capital to Thăng Long in autumn of the year 1010 CE."
    }
  },

  // Cycle 4: Sapa, Fansipan & Northern Terraces
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Vietnam and the entire Indochinese Peninsula, rising 3,143 meters in the Hoàng Liên Sơn range, nicknamed the Roof of Indochina?",
        correct: "Mount Fansipan Phan Xi Păng",
        w1: "Phu Si Lung",
        w2: "Pu Ta Leng",
        exp: "Fansipan is crowned by a giant bronze seated Buddha statue and summit pyramid monument, accessible on foot or via the 6.3-kilometer Sun World cable car."
      },
      {
        q: "Which mountain resort town in Lào Cai Province is internationally famous for green stepped rice terraces sculpted into the Muong Hoa Valley and vibrant ethnic minority markets?",
        correct: "Sa Pa",
        w1: "Ha Giang",
        w2: "Mai Chau",
        exp: "Established as a French colonial hill station in 1922, Sapa is home to diverse indigenous ethnic groups including the Black Hmong, Red Dao, and Tay."
      },
      {
        q: "What UNESCO National Geopark in northernmost Vietnam features dramatic limestone mountain canyons like the Tu San Abyss and the thrilling Ma Pi Leng Pass?",
        correct: "Dong Van Karst Plateau Geopark",
        w1: "Non Nuoc Cao Bang",
        w2: "Ba Be National Park",
        exp: "The Happiness Road winds along the edge of the Nho Que River canyon, celebrated as one of the most breathtaking motorcycling loop routes in Southeast Asia."
      },
      {
        q: "What spectacular multi-tiered transboundary waterfall on the Quây Sơn River straddles the international border between Vietnam (Cao Bằng) and China (Guangxi)?",
        correct: "Ban Gioc Waterfall Detian Falls",
        w1: "Silver Waterfall Thac Bac",
        w2: "Pongour Waterfall",
        exp: "Ban Gioc drops thirty meters in three stepped cascades across a 300-meter-wide limestone ledge, the fourth largest border waterfall in the world after Iguazu, Victoria, and Niagara."
      },
      {
        q: "What iconic conical hat woven from dried palm leaves, worn by Vietnamese farmers and street vendors, is an internationally recognized symbol of Vietnamese cultural identity?",
        correct: "Nón Lá",
        w1: "Áo Dài",
        w2: "Khăn Đóng",
        exp: "Nón Lá protects from blazing tropical sunshine and torrential monsoon rains, traditionally crafted in specialized artisan villages like Chuông village."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Mount Fansipan (Roof of Indochina) in northern Vietnam?",
      target: 3143,
      unit: "meters",
      imperial: "10,312 feet",
      exp: "Mount Fansipan stands at an official elevation of 3,143 meters above sea level in the Hoàng Liên Sơn mountain range."
    }
  },

  // Cycle 5: Central Vietnam: Hue & Hoi An
  {
    mcqs: [
      {
        q: "Which historic city along the Perfume River (Sông Hương) was the imperial capital of the Nguyễn Dynasty from 1802 to 1945, home to the UNESCO-listed Imperial City?",
        correct: "Huế",
        w1: "Da Nang",
        w2: "Hoi An",
        exp: "Huế features the monumental Citadel (Kinh Thành), the Forbidden Purple City (Tử Cấm Thành), and elaborate royal tombs of Emperors Khải Định, Tự Đức, and Minh Mạng."
      },
      {
        q: "What exceptionally preserved 15th-to-19th-century ancient trading port town in Quảng Nam is celebrated for silk lanterns illuminating canals, merchant shophouses, and tailor shops?",
        correct: "Hội An",
        w1: "Da Nang",
        w2: "Quy Nhon",
        exp: "Hội An was a major spice and silk international maritime hub where Japanese, Chinese, Portuguese, and Dutch merchants lived in harmonious architectural quarters."
      },
      {
        q: "What famous 16th-century covered wooden bridge in Hội An, featuring a Buddhist shrine built into its northern railing, was constructed by the local Japanese merchant community?",
        correct: "Japanese Covered Bridge Chùa Cầu",
        w1: "Dragon Bridge",
        w2: "Trang Tien Bridge",
        exp: "The bridge features carved wooden statues of a dog and a monkey at opposing entrances, symbolizing the imperial years in which construction began and ended."
      },
      {
        q: "What UNESCO World Heritage cluster of abandoned red-brick Hindu temple towers in a forested valley was the spiritual and political capital of the ancient Champa Kingdom?",
        correct: "Mỹ Sơn Sanctuary",
        w1: "Po Nagar Towers",
        w2: "Po Klong Garai",
        exp: "Constructed between the 4th and 14th centuries CE, Mỹ Sơn temples were dedicated to the worship of Shiva (Bhadresvara) built from interlocking fired bricks without mortar."
      },
      {
        q: "What famous 21-kilometer mountain pass along National Route 1 crosses the Annamite Range between Da Nang and Huế, dubbed Ocean Cloud Pass?",
        correct: "Hải Vân Pass Đèo Hải Vân",
        w1: "Ma Pi Leng Pass",
        w2: "O Quy Ho Pass",
        exp: "Rising 496 meters with panoramic views over the South China Sea and Lang Co lagoon, it was described by Top Gear host Jeremy Clarkson as a deserted ribbon of perfection."
      }
    ],
    number: {
      q: "In what year did Emperor Gia Long establish the Nguyễn Dynasty and proclaim the city of Huế as the unified imperial capital of Vietnam?",
      target: 1802,
      unit: "year",
      imperial: "1802 AD",
      exp: "The Nguyễn Dynasty unified Vietnam in 1802, ruling from the imperial palaces of Huế until the abdication of Emperor Bảo Đại in 1945."
    }
  },

  // Cycle 6: The Mekong Delta & River Life
  {
    mcqs: [
      {
        q: "What vast 40,500-square-kilometer agricultural river delta in southwestern Vietnam, known in Vietnamese as Đồng Bằng Sông Cửu Long (River of Nine Dragons), is the Rice Bowl of Vietnam?",
        correct: "The Mekong Delta",
        w1: "The Red River Delta",
        w2: "The Dong Nai Delta",
        exp: "The Mekong branches into multiple distributaries, producing over half of Vietnam total rice production and seventy percent of its commercial aquaculture fruit."
      },
      {
        q: "What is the largest and most famous wholesale floating market in the Mekong Delta, located on the Cần Thơ River, where boats advertise goods on tall bamboo poles (cây bẹo)?",
        correct: "Cái Răng Floating Market",
        w1: "Phong Dien Market",
        w2: "Cai Be Market",
        exp: "Boats assemble at dawn selling pineapples, watermelons, and mangoes, while small wooden sampan noodle boats pull alongside to serve steaming bowls of hủ tiếu soup."
      },
      {
        q: "What is the largest metropolitan city in the Mekong Delta, considered the economic and cultural heart of southwestern Vietnam?",
        correct: "Cần Thơ",
        w1: "My Tho",
        w2: "Vinh Long",
        exp: "Cần Thơ is famous for the cable-stayed Cần Thơ Bridge across the Hậu River (Bassac River) and the historic Binh Thuy ancient French-Vietnamese mansion."
      },
      {
        q: "What unique 850-hectare wetland nature reserve in An Giang Province features a submerged cajeput (melaleuca) forest carpeted in a thick green layer of floating water lettuce?",
        correct: "Trà Sư Cajuput Forest Rừng Tràm Trà Sư",
        w1: "Tram Chim National Park",
        w2: "U Minh Thuong",
        exp: "Visitors glide silently on narrow hand-paddled wooden rowboats through green carpeted waterways that shelter seventy species of waterbirds including painted storks."
      },
      {
        q: "What historic French colonial opera house and cathedral in Saigon was constructed between 1863 and 1880 entirely from red bricks imported directly from Marseille, France?",
        correct: "Notre-Dame Cathedral Basilica of Saigon",
        w1: "Tan Dinh Church",
        w2: "St Joseph Cathedral",
        exp: "Standing sixty meters tall on Paris Square, the cathedral features twin neo-Romanesque bell towers fronted by a statue of Our Lady of Peace."
      }
    ],
    number: {
      q: "How many river branches (dragons) are traditionally named in the Vietnamese title for the Mekong Delta (Đồng Bằng Sông Cửu Long - River of Nine Dragons)?",
      target: 9,
      unit: "dragons branches",
      imperial: "9 River Dragons",
      exp: "The Mekong Delta is called the River of Nine Dragons (Cửu Long) in Vietnamese folklore, representing the nine primary natural estuary mouths entering the sea."
    }
  },

  // Cycle 7: Ho Chi Minh City & Southern Metropolises
  {
    mcqs: [
      {
        q: "What is the largest city in Vietnam by population and its premier financial and commercial powerhouse, historically known as Saigon?",
        correct: "Ho Chi Minh City Thành phố Hồ Chí Minh",
        w1: "Hanoi",
        w2: "Da Nang",
        exp: "Located along the Saigon River in southern Vietnam, the metropolis is home to over nine million residents, Ben Thanh Market, and the War Remnants Museum."
      },
      {
        q: "What 461.2-meter supertall skyscraper along the Saigon River in Ho Chi Minh City is the tallest building in Vietnam and second tallest in Southeast Asia?",
        correct: "Landmark 81",
        w1: "Bitexco Financial Tower",
        w2: "Keangnam Hanoi Landmark Tower",
        exp: "Designed by British firm Atkins inspired by a traditional bundle of bamboo stalks (symbolizing Vietnamese unity and resilience), Landmark 81 opened in 2018."
      },
      {
        q: "What massive 250-kilometer network of subterranean military tunnels northwest of Ho Chi Minh City served as a guerrilla stronghold for the Viet Cong during the Vietnam War?",
        correct: "Củ Chi Tunnels Địa đạo Củ Chi",
        w1: "Vinh Moc Tunnels",
        w2: "Khe Sanh Bunkers",
        exp: "The three-tier tunnel system contained underground sleeping quarters, hospitals, weapon workshops, and smoke-dispersing kitchens (Bếp Hoàng Cầm)."
      },
      {
        q: "What historic 19th-century French colonial market in District 1 of Ho Chi Minh City, famous for its clock tower entrance, is the premier landmark for local souvenirs and street food?",
        correct: "Bến Thành Market Chợ Bến Thành",
        w1: "Binh Tay Market",
        w2: "An Dong Market",
        exp: "Constructed in 1912 by French contractor Brossard et Maupin, Ben Thanh is famous for coffee beans, silk ao dai fabrics, and crispy Vietnamese pancakes (bánh xèo)."
      },
      {
        q: "What modernist palatial building in Ho Chi Minh City, formerly the presidential palace of South Vietnam, was where North Vietnamese tanks crashed through the gates on April 30, 1975, ending the Vietnam War?",
        correct: "Independence Palace Reunification Palace",
        w1: "City Hall",
        w2: "Gia Long Palace",
        exp: "Designed by architect Ngô Viết Thụ, the palace remains preserved in its 1975 state, complete with underground war command telecommunications bunkers and map rooms."
      }
    ],
    number: {
      q: "What is the architectural height in meters of the Landmark 81 supertall skyscraper in Ho Chi Minh City, the tallest building in Vietnam?",
      target: 461,
      unit: "meters",
      imperial: "1,513 feet tall (81 stories)",
      exp: "Landmark 81 stands at an official structural height of 461.2 meters, dominating the southern Vietnamese skyline."
    }
  },

  // Cycle 8: Vietnamese Coffee & Street Food Heritage
  {
    mcqs: [
      {
        q: "What ranking does Vietnam hold globally among the world largest producers and exporters of raw coffee beans, second only to Brazil?",
        correct: "Second Largest Coffee Exporter",
        w1: "First Largest Exporter",
        w2: "Fifth Largest Exporter",
        exp: "Vietnam dominates global production of strong, high-caffeine Robusta coffee beans, grown primarily across the red basalt soil highlands of Buôn Ma Thuột in Đắk Lắk."
      },
      {
        q: "What iconic traditional Vietnamese coffee preparation uses a small stainless steel drip filter (phin) brewing directly over a layer of sweetened condensed milk with ice?",
        correct: "Cà Phê Sữa Đá",
        w1: "Cà Phê Trứng",
        w2: "Cà Phê Muối",
        exp: "Introduced by French colonists in 1857, the lack of fresh milk in tropical Indochina led to the widespread adoption of canned sweetened condensed milk."
      },
      {
        q: "What famous Hanoi specialty coffee drink, invented in 1946 by bartender Nguyễn Văn Giảng during wartime milk shortages, whips egg yolks with sugar into a creamy frothy custard over hot coffee?",
        correct: "Egg Coffee Cà Phê Trứng",
        w1: "Salt Coffee",
        w2: "Coconut Coffee",
        exp: "Giảng Cafe in Hanoi continues to serve the velvety dessert-like coffee, often described as liquid liquid tiramisu."
      },
      {
        q: "What world-famous national dish of Vietnam consists of flat rice noodles (bánh phở) in a slow-simmered aromatic bone broth infused with star anise, cinnamon, charred ginger, and fresh herbs?",
        correct: "Phở",
        w1: "Bún Bò Huế",
        w2: "Mì Quảng",
        exp: "Originating in northern Nam Định and Hanoi in the early 20th century, Pho is served with fresh lime, Thai basil, cilantro, culantro, and thinly sliced tender beef (Phở Bò)."
      },
      {
        q: "What famous Vietnamese crispy French-inspired baguette sandwich is filled with liver pâté, Vietnamese cold cuts (chả lụa), pickled daikon and carrots, cucumber, and fresh cilantro?",
        correct: "Bánh Mì",
        w1: "Gỏi Cuốn",
        w2: "Bánh Xèo",
        exp: "Bánh Mì is a masterwork of culinary fusion, combining crispy French baguettes baked with rice flour for an airy crumb with vibrant Vietnamese savory fillings."
      }
    ],
    number: {
      q: "What ranking does Vietnam hold among the largest coffee-exporting nations in the world?",
      target: 2,
      unit: "global ranking",
      imperial: "2nd largest global coffee exporter",
      exp: "Vietnam is the world's second largest exporter of coffee (and the #1 exporter of Robusta coffee beans), shipping over 1.6 million tons annually."
    }
  },

  // Cycle 9: Coastlines, Islands & Modern Landmarks
  {
    mcqs: [
      {
        q: "What is the largest island in Vietnam, located in the Gulf of Thailand off the coast of Cambodia, world-famous for white-sand beaches, black pepper, and artisanal fish sauce (nước mắm)?",
        correct: "Phú Quốc",
        w1: "Côn Đảo",
        w2: "Cát Bà",
        exp: "Phú Quốc fish sauce is protected under European Union PDO status, traditionally fermented for twelve months in giant tropical wood vats using black anchovies (cá cơm)."
      },
      {
        q: "What iconic 150-meter curved pedestrian bridge in the Ba Na Hills near Da Nang appears to be held aloft in the mountain mist by two colossal weathered stone hands?",
        correct: "The Golden Bridge Cầu Vàng",
        w1: "Dragon Bridge",
        w2: "Han River Bridge",
        exp: "Designed by TA Landscape Architecture and opened in 2018 at 1,400 meters elevation, the giant fiberglass hands symbolize the hands of mountain deities."
      },
      {
        q: "What coastal desert resort town in Bình Thuận Province is famous for dramatic Saharan-like White Sand Dunes (Đồi Cát Trắng) and flying kites over ocean surf?",
        correct: "Mũi Né",
        w1: "Nha Trang",
        w2: "Cam Ranh",
        exp: "Mũi Né features constantly shifting red and white sand dunes, the Fairy Stream (Suối Tiên) limestone canyon, and is a world capital for windsurfing."
      },
      {
        q: "What isolated 16-island archipelago in southern Vietnam, historically notorious as a French and South Vietnamese political penal colony (Tiger Cages), is now a pristine marine turtle sanctuary?",
        correct: "Côn Đảo Islands",
        w1: "Phu Quoc",
        w2: "Tho Chu",
        exp: "Côn Đảo National Park protects green sea turtle nesting beaches and rare dugong sea cow populations in pristine coral reef waters."
      },
      {
        q: "What famous fire-breathing bridge in Da Nang spans the Han River in the shape of a golden dragon, shooting real fire and water plumes from its mouth every weekend night?",
        correct: "Dragon Bridge Cầu Rồng",
        w1: "Thuan Phuoc Bridge",
        w2: "Tran Thi Ly Bridge",
        exp: "Inaugurated in 2013 on the 38th anniversary of the liberation of Da Nang, the 666-meter steel dragon bridge represents Ly Dynasty dragon mythology."
      }
    ],
    number: {
      q: "What is the total length in meters of the iconic Golden Bridge (Cầu Vàng) suspended by giant stone hands in the Ba Na Hills of Da Nang?",
      target: 150,
      unit: "meters",
      imperial: "492 feet long",
      exp: "The Golden Bridge curves gracefully for 150 meters along the mountainside, offering panoramic vistas across the coastal plains of Da Nang."
    }
  },

  // Cycle 10: Extent, 58 Provinces & Vietnamese Superlatives
  {
    mcqs: [
      {
        q: "What distinct Latin alphabetical letter shape describes the elongated, curvilinear geographical outline of the country of Vietnam extending 1,650 kilometers from north to south?",
        correct: "The Letter S",
        w1: "The Letter C",
        w2: "The Letter L",
        exp: "Vietnam spans from the northern mountain border with China at Lũng Cú down to the southern tip of the Mekong Delta at Cape Cà Mau."
      },
      {
        q: "Into how many first-level administrative provinces (plus five centrally-administered municipalities: Hanoi, Ho Chi Minh City, Da Nang, Hai Phong, and Can Tho) is Vietnam divided?",
        correct: "58 Provinces and 5 Municipalities",
        w1: "50 Provinces and 3 Municipalities",
        w2: "64 Provinces and 1 Municipality",
        exp: "The sixty-three provincial units are grouped into eight traditional geographic regions spanning the Northern Midlands, Red River Delta, Central Coast, and Mekong Delta."
      },
      {
        q: "What is the total length in kilometers of the coastline of mainland Vietnam along the Gulf of Tonkin, South China Sea (East Sea), and Gulf of Thailand?",
        correct: "3,260 Kilometers",
        w1: "1,800 Kilometers",
        w2: "5,000 Kilometers",
        exp: "Excluding islands, Vietnam mainland coastline stretches for 3,260 kilometers, giving the country extensive Exclusive Economic Zones (EEZ) and maritime ports."
      },
      {
        q: "How many sovereign nations share a direct terrestrial land border with Vietnam (China, Laos, and Cambodia)?",
        correct: "3 Countries",
        w1: "2 Countries",
        w2: "5 Countries",
        exp: "Vietnam land borders stretch 4,639 kilometers, including 2,161 km bordering Laos along the rugged Annamite Mountain spine."
      },
      {
        q: "What national population milestone was officially surpassed by the Socialist Republic of Vietnam in 2023, ranking it as the 15th most populous country in the world?",
        correct: "100 Million People",
        w1: "75 Million People",
        w2: "150 Million People",
        exp: "Vietnam is the third most populous nation in Southeast Asia after Indonesia and the Philippines, possessing a young, highly dynamic industrial workforce."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the national coastline of mainland Vietnam?",
      target: 3260,
      unit: "kilometers",
      imperial: "2,026 miles of coastline",
      exp: "Vietnam possesses an extensive coastline stretching for 3,260 kilometers from Móng Cái in the north to Hà Tiên in the southwest."
    }
  }
];

// Build Vietnam Quiz
buildQuiz({
  id: 'vietnam-geography-heritage-60',
  theme: 'Vietnam: Geography, Ha Long Bay & The Mekong Delta',
  title: 'Vietnam: Geography, Ha Long Bay & The Mekong Delta',
  description: 'A 60-question grand master assessment exploring Ha Long Bay (1,600 islands), Son Doong Cave (200 m ceiling), Hanoi (1010 CE), Mount Fansipan (3,143 m), Imperial Hue & Hoi An (1802), the Mekong Delta, Landmark 81, and coffee heritage.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, vietnamCycles);

console.log('Vietnam quiz built successfully!');
