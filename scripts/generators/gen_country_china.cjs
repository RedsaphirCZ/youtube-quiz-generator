const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 3. china-geography-heritage-60
// =========================================================================
const chinaCycles = [
  // Cycle 1: The Tibetan Plateau & The Roof of the World
  {
    mcqs: [
      {
        q: "What massive, high-altitude plateau in southwestern China covering 2.5 million square kilometers is called the Roof of the World and the Third Pole?",
        correct: "Qinghai-Tibet Plateau",
        w1: "Yunnan-Guizhou Plateau",
        w2: "Loess Plateau",
        exp: "With an average elevation exceeding 4,500 meters, the Tibetan Plateau is the world highest and largest plateau, containing the largest concentration of ice outside the polar caps."
      },
      {
        q: "What is the highest mountain peak in the world, rising 8,848.86 meters on the international border between China (Tibet) and Nepal?",
        correct: "Mount Everest Mount Qomolangma",
        w1: "K2",
        w2: "Lhotse",
        exp: "Known in Tibetan as Qomolangma (Holy Mother), the summit represents the highest elevation on Earth, formed by the ongoing collision of the Indian and Eurasian plates."
      },
      {
        q: "Which national nature reserve on the Tibetan Plateau protects the headwaters of Asia three greatest rivers: the Yangtze, Yellow, and Lancang (Mekong)?",
        correct: "Sanjiangyuan Three Rivers Source",
        w1: "Hoh Xil Reserve",
        w2: "Qomolangma Reserve",
        exp: "Sanjiangyuan is China largest national park, providing crucial freshwater for nearly one billion people downstream and protecting the endangered Tibetan antelope (chiru)."
      },
      {
        q: "What is the deepest and longest terrestrial canyon on Earth, carved by the Yarlung Tsangpo River as it cuts around Mount Namcha Barwa in Tibet?",
        correct: "Yarlung Tsangpo Grand Canyon",
        w1: "Tiger Leaping Gorge",
        w2: "Three Gorges",
        exp: "Reaching a maximum depth of 6,009 meters and stretching 504 kilometers, the Yarlung Tsangpo Grand Canyon is more than three times deeper than the US Grand Canyon."
      },
      {
        q: "What monumental 13-story fortress-palace in Lhasa served as the winter residence of the Dalai Lamas from 1649 to 1959, perched atop Red Hill at 3,700 meters?",
        correct: "Potala Palace",
        w1: "Jokhang Temple",
        w2: "Norbulingka",
        exp: "Constructed by the 5th Dalai Lama, the Potala Palace contains over 1,000 rooms and the gold-encrusted stupa tombs of eight past Dalai Lamas."
      }
    ],
    number: {
      q: "What is the official joint surveyed summit elevation in meters above sea level of Mount Everest (Mount Qomolangma)?",
      target: 8849,
      unit: "meters",
      imperial: "29,031.7 feet",
      exp: "In December 2020, Chinese and Nepalese surveying authorities jointly announced the official elevation of Mount Everest as 8,848.86 meters (rounded to 8,849 m)."
    }
  },

  // Cycle 2: The Yangtze River & Three Gorges
  {
    mcqs: [
      {
        q: "What is the longest river in Asia and third longest on Earth, flowing 6,300 kilometers from the glaciers of Tibet into the East China Sea at Shanghai?",
        correct: "Yangtze River Chang Jiang",
        w1: "Yellow River",
        w2: "Pearl River",
        exp: "The Yangtze (Long River) drains one-fifth of China land area, generating roughly forty percent of the country total Gross Domestic Product."
      },
      {
        q: "What is the world largest hydroelectric power station by installed electrical capacity (22,500 megawatts), built across the Yangtze in Hubei Province?",
        correct: "Three Gorges Dam",
        w1: "Baihetan Dam",
        w2: "Xiluodu Dam",
        exp: "The concrete gravity dam spans 2.3 kilometers across the river, creating a 660-kilometer reservoir that raised river navigation to Chongqing."
      },
      {
        q: "What three famous scenic river gorges on the upper Yangtze stretch for 120 miles between Chongqing and Yichang?",
        correct: "Qutang, Wu and Xiling Gorges",
        w1: "Tiger, Dragon and Phoenix Gorges",
        w2: "Guan, Ba and Emei Gorges",
        exp: "The Three Gorges are flanked by sheer thousand-meter limestone cliffs, celebrated in Chinese classical poetry and ink-wash landscape paintings for dynasties."
      },
      {
        q: "What fertile, mineral-rich lowland basin in southwestern China surrounded by high mountains is nicknamed the Red Basin or Land of Abundance?",
        correct: "Sichuan Basin",
        w1: "Tarim Basin",
        w2: "Junggar Basin",
        exp: "The Sichuan Basin is home to over one hundred million people, watered by the ancient 3rd-century BCE Dujiangyan irrigation system near Chengdu."
      },
      {
        q: "What is the busiest container seaport in the world, located at the mouth of the Yangtze River on Hangzhou Bay in eastern China?",
        correct: "Port of Shanghai",
        w1: "Port of Ningbo-Zhoushan",
        w2: "Port of Shenzhen",
        exp: "Shanghai Yangshan Deep-Water Port is connected to the mainland by the 32.5-kilometer Donghai Bridge, handling over forty-seven million shipping containers annually."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Yangtze River (Chang Jiang), the longest river in Asia?",
      target: 6300,
      unit: "kilometers",
      imperial: "3,915 miles",
      exp: "The Yangtze River stretches for approximately 6,300 kilometers from the Tanggula Mountains in Qinghai to the East China Sea."
    }
  },

  // Cycle 3: The Yellow River & Loess Plateau
  {
    mcqs: [
      {
        q: "What 5,464-kilometer river is revered as the Cradle of Chinese Civilization, named for the heavy load of yellow silt it carries across northern China?",
        correct: "Yellow River Huang He",
        w1: "Huai River",
        w2: "Hai River",
        exp: "The Yellow River carries over 1.6 billion tons of silt annually from the Loess Plateau, giving the Yellow Sea its distinctive muddy golden coloration."
      },
      {
        q: "What massive 640,000-square-kilometer plateau in northern China is covered by deep windblown deposits of fine, highly fertile yellow dust (loess)?",
        correct: "Loess Plateau Huangtu Gaoyuan",
        w1: "Inner Mongolian Plateau",
        w2: "Ordos Plateau",
        exp: "The Loess Plateau was the heartland of early Chinese agriculture, where millions of people traditionally lived in cave dwellings carved into cliffs (yaodong)."
      },
      {
        q: "What is the largest waterfall on the Yellow River, where the river narrows dramatically into a 20-meter canyon of golden, boiling yellow rapids?",
        correct: "Hukou Waterfall",
        w1: "Huangguoshu Waterfall",
        w2: "Detian Waterfall",
        exp: "Hukou (Teapot Spout) Waterfall changes in height and character with seasonal river flows, famous for yellow mists depicted on the Chinese 50-yuan currency note."
      },
      {
        q: "Which ancient imperial capital of Shaanxi was the starting point of the Silk Road and site of the 8,000-statue Terracotta Army of Emperor Qin Shi Huang?",
        correct: "Xi an Chang an",
        w1: "Luoyang",
        w2: "Kaifeng",
        exp: "Xi'an was the capital for thirteen dynasties over a millennium, protected by the world most complete surviving ancient city wall spanning fourteen kilometers."
      },
      {
        q: "What massive northern U-shaped bend of the Yellow River loops through Inner Mongolia, enclosing the Ordos desert plateau?",
        correct: "Ordos Loop Great Bend",
        w1: "Hexi Corridor",
        w2: "Gansu Loop",
        exp: "The Ordos Loop was a strategic frontier boundary between Chinese agrarian civilization and nomadic steppe confederations like the Xiongnu and Mongols."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Yellow River (Huang He), the second longest river in China?",
      target: 5464,
      unit: "kilometers",
      imperial: "3,395 miles",
      exp: "The Yellow River flows for 5,464 kilometers from the Bayan Har Mountains in Qinghai to the Bohai Sea in Shandong."
    }
  },

  // Cycle 4: The Great Wall & Northern Frontiers
  {
    mcqs: [
      {
        q: "According to official comprehensive archaeological surveys by China State Administration of Cultural Heritage, what is the total length of all Great Wall sections built across dynasties?",
        correct: "21,196 Kilometers",
        w1: "6,700 Kilometers",
        w2: "12,500 Kilometers",
        exp: "This survey encompasses walls, trenches, watchtowers, and natural defensive barriers constructed by the Qin, Han, Tang, and Ming dynasties across fifteen provinces."
      },
      {
        q: "Which iconic, well-preserved section of the Ming Dynasty Great Wall seventy kilometers northwest of Beijing was the first section opened to tourists in 1957?",
        correct: "Badaling",
        w1: "Mutianyu",
        w2: "Simatai",
        exp: "Badaling features massive stone watchtowers and crenellated battlements guarding the strategic Juyongguan Pass into the Beijing plain."
      },
      {
        q: "What fortress at the western terminus of the Ming Dynasty Great Wall in Gansu is known as the First and Greatest Pass Under Heaven?",
        correct: "Jiayuguan Pass",
        w1: "Shanhaiguan Pass",
        w2: "Yumenguan Pass",
        exp: "Built in 1372 along the Hexi Corridor, Jiayuguan guarded the narrow desert passage between the snow-capped Qilian Mountains and the Black Mountain."
      },
      {
        q: "What fortress at the eastern coastal terminus of the Ming Great Wall in Hebei is where the wall meets the Bohai Sea at Old Dragon Head (Laolongtou)?",
        correct: "Shanhaiguan Pass",
        w1: "Jiayuguan Pass",
        w2: "Gubeikou",
        exp: "In 1644, Ming general Wu Sangui opened the gates of Shanhaiguan to the invading Manchu army, leading directly to the establishment of the Qing Dynasty in Beijing."
      },
      {
        q: "Which UNESCO World Heritage complex of 492 rock-cut cave temples near Dunhuang on the ancient Silk Road preserves a millennium of Buddhist murals and manuscripts?",
        correct: "Mogao Caves Caves of the Thousand Buddhas",
        w1: "Longmen Grottoes",
        w2: "Yungang Grottoes",
        exp: "Discovered in 1900 by Daoist priest Wang Yuanlu, Cave 17 (the Library Cave) contained over 50,000 ancient manuscripts, textiles, and the 868 CE Diamond Sutra."
      }
    ],
    number: {
      q: "What is the total official surveyed length in thousands of kilometers of all Great Wall structures built throughout Chinese history?",
      target: 21,
      unit: "thousand kilometers",
      imperial: "13,171 miles",
      exp: "Official surveys confirm the total combined length of all historical wall sections is 21,196 kilometers (rounded to 21k km)."
    }
  },

  // Cycle 5: Karst Landscapes, Guilin & Zhangjiajie
  {
    mcqs: [
      {
        q: "What world-famous picturesque river in Guangxi winds eighty-three kilometers past towering cone karst limestone peaks between Guilin and Yangshuo?",
        correct: "Li River Li Jiang",
        w1: "Yulong River",
        w2: "Wujiang River",
        exp: "The reflection of the karst peaks in the crystal waters of the Li River is depicted on the reverse side of the Chinese 20-yuan banknote."
      },
      {
        q: "Which national forest park in Hunan Province features over 3,000 quartz-sandstone pillars that served as the visual prototype for the floating Hallelujah Mountains in Avatar?",
        correct: "Zhangjiajie National Forest Park",
        w1: "Wuyi Mountains",
        w2: "Sanqingshan",
        exp: "Located in the Wulingyuan Scenic Area, the Southern Sky Column was officially renamed Avatar Hallelujah Mountain following the blockbuster film release."
      },
      {
        q: "What is the tallest outdoor glass sightseeing elevator in the world, built into the cliff face of a 326-meter sandstone precipice in Zhangjiajie?",
        correct: "Bailong Elevator Hundred Dragons Elevator",
        w1: "Skyview Elevator",
        w2: "Hunan Cliff Lift",
        exp: "The glass double-decker elevator ascends the vertical sandstone cliff in just sixty-six seconds, carrying up to fifty passengers per cabin."
      },
      {
        q: "What spectacular geological stone forest in Yunnan Province covers 400 square kilometers of towering eroded limestone pillars resembling a petrified forest?",
        correct: "Shilin Stone Forest",
        w1: "Danxia Landforms",
        w2: "Xingyi Karst Forest",
        exp: "Formed 270 million years ago from ancient seabed dissolution, Shilin is celebrated in the traditional Ashima folklore of the indigenous Yi (Sani) people."
      },
      {
        q: "What is the largest waterfall in China and East Asia, plunging seventy-eight meters across a limestone cliff on the Baishui River in Guizhou?",
        correct: "Huangguoshu Waterfall",
        w1: "Detian Waterfall",
        w2: "Hukou Waterfall",
        exp: "Behind the rushing torrent of Huangguoshu lies the 134-meter Shuiliandong (Water Curtain Cave), allowing visitors to walk directly behind the roaring cataract."
      }
    ],
    number: {
      q: "What is the total height in meters of the Bailong outdoor glass cliff elevator in Zhangjiajie National Forest Park?",
      target: 326,
      unit: "meters",
      imperial: "1,070 feet tall",
      exp: "The Bailong Elevator holds the Guinness World Record for the tallest outdoor glass elevator on Earth at 326 meters."
    }
  },

  // Cycle 6: Major Megacities & Economic Corridors
  {
    mcqs: [
      {
        q: "What is the national capital of the People Republic of China, centered on Tiananmen Square and the 9,999-room Forbidden City imperial palace?",
        correct: "Beijing",
        w1: "Shanghai",
        w2: "Nanjing",
        exp: "Beijing was the capital of the Ming and Qing dynasties and modern China, home to the Summer Palace, Temple of Heaven, and 2008/2022 Olympic venues."
      },
      {
        q: "Which ultramodern financial and commercial skyscraper district in Shanghai sits directly across the Huangpu River from the historic colonial Bund?",
        correct: "Lujiazui Pudong",
        w1: "Puxi",
        w2: "Xintiandi",
        exp: "Lujiazui features iconic megatall architecture including the 632-meter Shanghai Tower (second tallest building on Earth), the Oriental Pearl Tower, and Jin Mao Tower."
      },
      {
        q: "What massive urban megalopolis in Guangdong Province encompassing Shenzhen, Guangzhou, Hong Kong, and Macau is the world largest continuous urban agglomeration?",
        correct: "Guangdong-Hong Kong-Macao Greater Bay Area",
        w1: "Yangtze River Delta",
        w2: "Jing-Jin-Ji Megalopolis",
        exp: "Home to over eighty-six million people, the Greater Bay Area generates a regional GDP exceeding 1.9 trillion dollars, leading global high-tech and hardware manufacturing."
      },
      {
        q: "Which directly administered municipality in southwest China on the upper Yangtze is the largest municipal city in the world by administrative area and population?",
        correct: "Chongqing",
        w1: "Chengdu",
        w2: "Wuhan",
        exp: "Spanning 82,400 square kilometers (roughly the size of Austria) with thirty-two million residents, mountainous Chongqing is famous for spicy Sichuan hot pot."
      },
      {
        q: "What 55-kilometer bridge-tunnel sea crossing opened in 2018 is the longest open-sea fixed link in the world, connecting Hong Kong, Zhuhai, and Macau across the Pearl River estuary?",
        correct: "Hong Kong-Zhuhai-Macao Bridge",
        w1: "Hangzhou Bay Bridge",
        w2: "Jiaozhou Bay Bridge",
        exp: "The crossing includes three cable-stayed bridges, an undersea tunnel, and four artificial islands designed to withstand magnitude 8.0 earthquakes and super typhoons."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Hong Kong-Zhuhai-Macao sea-bridge and tunnel crossing across the Pearl River estuary?",
      target: 55,
      unit: "kilometers",
      imperial: "34 miles",
      exp: "The Hong Kong-Zhuhai-Macao Bridge spans 55 kilometers, making it the longest sea-crossing bridge-tunnel system in the world."
    }
  },

  // Cycle 7: Deserts, Taklamakan & Silk Road Oases
  {
    mcqs: [
      {
        q: "What immense 337,000-square-kilometer shifting sand desert in Xinjiang is nicknamed the Sea of Death or Place of No Return?",
        correct: "Taklamakan Desert",
        w1: "Gobi Desert",
        w2: "Badain Jaran Desert",
        exp: "Surrounded by the Tian Shan, Pamir, and Kunlun mountains, the Taklamakan is traversed by the modern Tarim Desert Highway built on top of shifting barchan dunes."
      },
      {
        q: "What is the lowest natural point on land in China, an endorheic salt lake in Xinjiang that sits 154 meters below sea level?",
        correct: "Ayding Lake Turpan Depression",
        w1: "Qaidam Basin",
        w2: "Lop Nur",
        exp: "The Turpan Depression is one of the hottest and driest places on Earth, famous for the Flaming Mountains and subterranean Karez water channel systems."
      },
      {
        q: "Which ancient Silk Road oasis city in western Xinjiang near the Pamir Mountains is celebrated for its historic mudbrick Old City and bustling Sunday Livestock Market?",
        correct: "Kashgar Kashi",
        w1: "Hotan",
        w2: "Turpan",
        exp: "Kashgar was the central junction where northern and southern branches of the Silk Road converged before caravans crossed high passes into Persia and India."
      },
      {
        q: "What desert in Inner Mongolia contains the tallest stationary sand dunes on Earth, rising up to 500 meters high alongside over one hundred mysterious spring-fed lakes?",
        correct: "Badain Jaran Desert",
        w1: "Tengger Desert",
        w2: "Kumtag Desert",
        exp: "Bilutu Peak in the Badain Jaran Desert rises 460 meters above its base (1,611 m elevation), often called the Mount Everest of Sand Dunes."
      },
      {
        q: "Which dried-up nuclear test site basin and salt lake in southeastern Xinjiang was the former location of the mysterious wandering Lake Lop Nur and ancient Loulan Kingdom?",
        correct: "Lop Nur",
        w1: "Ebinur Lake",
        w2: "Ulungur Lake",
        exp: "Lop Nur is famous for its Ear of the Earth satellite appearance and the discovery of the remarkably preserved 3,800-year-old Caucasian Loulan Beauty mummy."
      }
    ],
    number: {
      q: "How many meters below mean sea level is Ayding Lake in the Turpan Depression, the lowest point in China?",
      target: 154,
      unit: "meters below sea level",
      imperial: "505 feet below sea level",
      exp: "Ayding Lake sits at 154 meters below sea level, the fourth lowest exposed dry land point on Earth after the Dead Sea, Lake Assal, and Sea of Galilee."
    }
  },

  // Cycle 8: Sacred Mountains: Five Great Mountains & Buddhist Peaks
  {
    mcqs: [
      {
        q: "Which sacred peak in Shandong Province is revered as the Eastern Peak and foremost of the Five Great Mountains of China (Wuyue), climbed by seventy-two Chinese emperors?",
        correct: "Mount Tai Taishan",
        w1: "Mount Hua Huashan",
        w2: "Mount Heng",
        exp: "Mount Tai has 6,660 stone steps ascending to the Jade Emperor Peak, where imperial sovereigns performed the sacred Feng and Shan sacrifice rituals."
      },
      {
        q: "Which sheer granite mountain in Shaanxi Province, known as the Western Peak, is famous for having one of the world most thrilling cliffside plank walks?",
        correct: "Mount Hua Huashan",
        w1: "Mount Song Songshan",
        w2: "Mount Tai",
        exp: "Mount Hua features five distinct peaks shaped like a five-petaled lotus flower, famous for Taoist monasteries and vertical chain-assisted rock stairways."
      },
      {
        q: "Which UNESCO World Heritage mountain range in Anhui Province is celebrated for granite peaks, twisted Huangshan pine trees, hot springs, and a perpetual Sea of Clouds?",
        correct: "Huangshan Yellow Mountain",
        w1: "Mount Lu Lushan",
        w2: "Mount Sanqingshan",
        exp: "Huangshan has inspired classic Chinese landscape painting (shan shui) for over a thousand years, featuring peaks like the Lotus Peak and Bright Summit."
      },
      {
        q: "Which sacred Buddhist mountain in Sichuan Province is home to the 71-meter Leshan Giant Buddha carved directly out of a sandstone river cliff in the 8th century?",
        correct: "Mount Emei",
        w1: "Mount Wutai",
        w2: "Mount Jiuhua",
        exp: "Mount Emei is the sacred seat of Bodhisattva Samantabhadra, while the nearby Leshan Buddha is the largest pre-modern carved stone Buddha in the world."
      },
      {
        q: "Which mountain in Henan Province is home to the legendary Shaolin Monastery, the historical cradle of Chinese Chan (Zen) Buddhism and Shaolin Kung Fu?",
        correct: "Mount Song Songshan",
        w1: "Mount Tai",
        w2: "Mount Wudang",
        exp: "Founded in 495 CE, the Shaolin Temple on Mount Song features the Pagoda Forest, a cemetery containing over 240 ancient stone brick stupas of Buddhist masters."
      }
    ],
    number: {
      q: "How many sacred Taoist mountains comprise the historic Five Great Mountains of China (Wuyue: Tai, Hua, Heng-Hunan, Heng-Shanxi, Song)?",
      target: 5,
      unit: "sacred mountains",
      imperial: "5 Great Mountains (Wuyue)",
      exp: "The Five Great Mountains of China correspond to the cardinal directions and center of traditional Chinese cosmology."
    }
  },

  // Cycle 9: Wildlife Sanctuaries & Endemic Megafauna
  {
    mcqs: [
      {
        q: "Which global conservation icon and endemic Chinese mammal species inhabits the high-altitude misty bamboo forests of Sichuan, Shaanxi, and Gansu?",
        correct: "Giant Panda Ailuropoda melanoleuca",
        w1: "Red Panda",
        w2: "Sun Bear",
        exp: "Giant pandas feed almost exclusively on bamboo, eating up to thirty-eight kilograms daily, protected in China Giant Panda National Park."
      },
      {
        q: "What percentage of the world remaining wild giant pandas live within the protected mountain bamboo reserves of Sichuan Province?",
        correct: "75 Percent",
        w1: "50 Percent",
        w2: "95 Percent",
        exp: "Over 1,400 wild giant pandas (roughly three-quarters of the total wild population of 1,860) live in the Minshan and Qionglai mountain ranges of Sichuan."
      },
      {
        q: "Which endangered primate species with striking golden-orange fur and blue-tinted faces lives in troops in the snowy temperate forests of the Qinling Mountains?",
        correct: "Golden Snub-Nosed Monkey",
        w1: "Tibetan Macaque",
        w2: "White-Headed Langur",
        exp: "Rhinopithecus roxellana survives harsh sub-zero winter temperatures by huddling together in large social family groups high in the forest canopy."
      },
      {
        q: "What elusive big cat species, known as the Ghost of the Mountains, has sixty percent of its global wild population residing across the Tibetan Plateau in China?",
        correct: "Snow Leopard Panthera uncia",
        w1: "Clouded Leopard",
        w2: "Amur Leopard",
        exp: "Sanjiangyuan and Qomolangma national parks contain vast rocky alpine habitats where snow leopards hunt blue sheep (bharal) and ibex."
      },
      {
        q: "What critically endangered, near-extinct crocodilian species native to the lower Yangtze River basin is one of only two alligator species on Earth?",
        correct: "Chinese Alligator Alligator sinensis",
        w1: "Saltwater Crocodile",
        w2: "Gharial",
        exp: "The Chinese alligator (mud dragon) grows up to two meters long, spending winter in underground burrows, heavily protected by breeding centers in Anhui."
      }
    ],
    number: {
      q: "What percentage of the world wild giant panda population inhabits the mountain forests of Sichuan Province in China?",
      target: 75,
      unit: "percent",
      imperial: "75% of wild giant pandas",
      exp: "Approximately 75 percent of all wild giant pandas live across the protected bamboo reserves of Sichuan."
    }
  },

  // Cycle 10: Extent, Provinces & Geographic Superlatives
  {
    mcqs: [
      {
        q: "Tying with the Russian Federation for the world record, how many sovereign countries share a direct terrestrial land border with the People Republic of China?",
        correct: "14 Countries",
        w1: "10 Countries",
        w2: "18 Countries",
        exp: "China borders North Korea, Russia, Mongolia, Kazakhstan, Kyrgyzstan, Tajikistan, Afghanistan, Pakistan, India, Nepal, Bhutan, Myanmar, Laos, and Vietnam."
      },
      {
        q: "What is the largest provincial-level administrative division in China by geographical land area, covering over 1.66 million square kilometers in the northwest?",
        correct: "Xinjiang Uygur Autonomous Region",
        w1: "Tibet Autonomous Region",
        w2: "Inner Mongolia Autonomous Region",
        exp: "Xinjiang accounts for one-sixth of China entire territory (larger than France, Germany, Spain, and the UK combined), bordering eight foreign nations."
      },
      {
        q: "What is the most populous province in China, home to over 126 million residents and the manufacturing hub of the Pearl River Delta?",
        correct: "Guangdong",
        w1: "Shandong",
        w2: "Henan",
        exp: "Guangdong has been China economic powerhouse since the 1980s opening of Special Economic Zones like Shenzhen, generating over thirteen percent of China GDP."
      },
      {
        q: "How many official direct-administered municipalities (equivalent to provinces) exist in China: Beijing, Shanghai, Tianjin, and Chongqing?",
        correct: "4 Municipalities",
        w1: "2 Municipalities",
        w2: "6 Municipalities",
        exp: "These four megacities report directly to the central government in Beijing, holding provincial-level administrative status."
      },
      {
        q: "What is the total geographical area of China in square kilometers, ranking it as the third or fourth largest country in the world?",
        correct: "9.6 Million Square Kilometers",
        w1: "7.5 Million Square Kilometers",
        w2: "12.0 Million Square Kilometers",
        exp: "China encompasses approximately 9.6 million square kilometers, spanning five geographical time zones (though unified under single Beijing Time UTC+8)."
      }
    ],
    number: {
      q: "How many sovereign foreign nations share a terrestrial land border with the People Republic of China, tying the world record?",
      target: 14,
      unit: "neighboring countries",
      imperial: "14 bordering countries",
      exp: "China shares land borders with fourteen sovereign nations, spanning over 22,000 kilometers of land frontier."
    }
  }
];

// Build China Quiz
buildQuiz({
  id: 'china-geography-heritage-60',
  theme: 'China: Geography, Sacred Mountains & Megacities',
  title: 'China: Geography, Sacred Mountains & Megacities',
  description: 'A 60-question grand master assessment exploring the Tibetan Plateau & Everest, the Yangtze & Three Gorges, the Yellow River, the Great Wall (21,196 km), Guilin & Zhangjiajie, megacities, the Taklamakan Desert, sacred mountains, and giant pandas.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, chinaCycles);

console.log('China quiz built successfully!');
