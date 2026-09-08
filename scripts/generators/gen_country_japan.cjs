const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 1. japan-geography-heritage-60
// =========================================================================
const japanCycles = [
  // Cycle 1: Major Islands, Honshu & Mount Fuji
  {
    mcqs: [
      {
        q: "Which of the four main islands of Japan is the largest and most populous, hosting Tokyo, Osaka, and Mount Fuji?",
        correct: "Honshu",
        w1: "Hokkaido",
        w2: "Kyushu",
        exp: "Honshu accounts for roughly sixty percent of Japan total land area and is home to more than one hundred million residents."
      },
      {
        q: "What is the highest mountain peak in Japan, an active stratovolcano rising 3,776 meters on Honshu?",
        correct: "Mount Fuji",
        w1: "Mount Kita",
        w2: "Mount Hotaka",
        exp: "Mount Fuji is an iconic snow-capped volcano and sacred pilgrimage site that last erupted in the historic Hoei Eruption of 1707."
      },
      {
        q: "Which northernmost main island of Japan is famous for its powder snow, volcanic caldera lakes, and capital city Sapporo?",
        correct: "Hokkaido",
        w1: "Shikoku",
        w2: "Okinawa",
        exp: "Hokkaido features expansive national parks like Daisetsuzan, distinct four-season agriculture, and the historic Snow Festival in Sapporo."
      },
      {
        q: "Which is the smallest and least populous of the four main islands of Japan, famous for the 88 Temple Buddhist Pilgrimage?",
        correct: "Shikoku",
        w1: "Kyushu",
        w2: "Honshu",
        exp: "Shikoku is separated from Honshu by the Seto Inland Sea and is known for its rugged mountain interior and ancient Kobo Daishi pilgrimage route."
      },
      {
        q: "Which southwestern main island of Japan is known for subtropical climate, active volcano Mount Aso, and historic port city Nagasaki?",
        correct: "Kyushu",
        w1: "Hokkaido",
        w2: "Sado",
        exp: "Kyushu is a geothermal hotspot featuring Mount Aso, one of the world largest volcanic calderas, and the hot spring city of Beppu."
      }
    ],
    number: {
      q: "What is the elevation in meters above sea level of Mount Fuji, the highest peak in Japan?",
      target: 3776,
      unit: "meters",
      imperial: "12,389 feet",
      exp: "Mount Fuji stands at exactly 3,776 meters elevation on the border between Shizuoka and Yamanashi prefectures."
    }
  },

  // Cycle 2: Administrative Geography, Prefectures & Megacities
  {
    mcqs: [
      {
        q: "Into how many administrative first-level prefectures is the nation of Japan divided?",
        correct: "47 Prefectures",
        w1: "42 Prefectures",
        w2: "50 Prefectures",
        exp: "The system consists of one metropolis (Tokyo), one circuit (Hokkaido), two urban prefectures (Osaka and Kyoto), and forty-three rural prefectures."
      },
      {
        q: "What is the most populous metropolitan area in the world, with a continuous urban population exceeding 37 million people?",
        correct: "Greater Tokyo Area",
        w1: "Keihanshin Region",
        w2: "Chukyo Region",
        exp: "The Greater Tokyo Area encompasses Tokyo, Kanagawa, Saitama, and Chiba prefectures across the fertile Kanto Plain."
      },
      {
        q: "Which ancient imperial capital of Japan served as the emperor seat for over a thousand years from 794 to 1868 CE?",
        correct: "Kyoto",
        w1: "Nara",
        w2: "Kamakura",
        exp: "Originally named Heian-kyo, Kyoto was spared from bombing in World War II, preserving thousands of classical wooden temples and shrines."
      },
      {
        q: "Which ancient capital city south of Kyoto was Japan first permanent imperial capital from 710 to 784 CE, home to Todai-ji?",
        correct: "Nara",
        w1: "Kobe",
        w2: "Yokohama",
        exp: "Known as Heijo-kyo, Nara is celebrated for Todai-ji temple housing the world largest bronze Buddha statue and hundreds of free-roaming sacred deer."
      },
      {
        q: "Which massive plain is the largest lowland plain in Japan, surrounding Tokyo Bay and providing the economic heart of the nation?",
        correct: "Kanto Plain",
        w1: "Nobi Plain",
        w2: "Ishikari Plain",
        exp: "The Kanto Plain covers roughly 17,000 square kilometers, bordered by the Japanese Alps to the west and the Pacific Ocean to the east."
      }
    ],
    number: {
      q: "How many total administrative prefectures comprise the nation of Japan?",
      target: 47,
      unit: "prefectures",
      imperial: "47 prefectures",
      exp: "Japan is divided into 47 prefectures organized under the local autonomy framework established in 1871 during the Meiji Restoration."
    }
  },

  // Cycle 3: Inland Seas, Straits & Tunnel Engineering
  {
    mcqs: [
      {
        q: "What picturesque shallow body of water separates Honshu, Shikoku, and Kyushu, renowned for thousands of small islands and mild climate?",
        correct: "Seto Inland Sea",
        w1: "Sea of Japan",
        w2: "East China Sea",
        exp: "The Seto Inland Sea is a tranquil maritime highway connecting Osaka and Kobe with international Pacific shipping routes."
      },
      {
        q: "Which 53.8-kilometer undersea railway tunnel connects the main islands of Honshu and Hokkaido beneath the Tsugaru Strait?",
        correct: "Seikan Tunnel",
        w1: "Kanmon Tunnel",
        w2: "Tokyo Bay Aqua-Line",
        exp: "Opened in 1988, the Seikan Tunnel includes a 23.3-kilometer undersea section, accommodating both freight trains and high-speed Shinkansen."
      },
      {
        q: "Which strait separates the main islands of Honshu and Kyushu, crossed by road and rail tunnels at Shimonoseki and Kitakyushu?",
        correct: "Kanmon Strait",
        w1: "Tsushima Strait",
        w2: "Bungo Channel",
        exp: "The Kanmon Strait is a narrow, fast-flowing tidal waterway where the historic naval Battle of Dan-no-ura occurred in 1185."
      },
      {
        q: "What high-speed bullet train railway network began operation between Tokyo and Osaka in 1964 for the Tokyo Olympic Games?",
        correct: "Tokaido Shinkansen",
        w1: "Tohoku Shinkansen",
        w2: "Hokuriku Shinkansen",
        exp: "The 0 Series Shinkansen traveled at 210 km/h on dedicated standard-gauge tracks, revolutionizing modern intercity rail transit worldwide."
      },
      {
        q: "Which bridge system connects Honshu and Shikoku across the Seto Inland Sea, forming the longest two-tiered bridge complex in the world?",
        correct: "Great Seto Bridge",
        w1: "Akashi Kaikyo Bridge",
        w2: "Kurushima-Kaikyo Bridge",
        exp: "The Seto-Ohashi opened in 1988 with a series of six double-decked bridges carrying both highway traffic and the JR Seto-Ohashi rail line."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the undersea Seikan Railway Tunnel linking Honshu and Hokkaido?",
      target: 54,
      unit: "kilometers",
      imperial: "33.5 miles",
      exp: "The Seikan Tunnel stretches 53.85 kilometers, with 23.3 kilometers bored deep beneath the seabed of the Tsugaru Strait."
    }
  },

  // Cycle 4: Subtropical Ryukyu Islands, Okinawa & Coral Reefs
  {
    mcqs: [
      {
        q: "Which southwestern island chain stretching between Kyushu and Taiwan was once the independent maritime trading Kingdom of Ryukyu?",
        correct: "Ryukyu Islands",
        w1: "Izu Islands",
        w2: "Ogasawara Islands",
        exp: "The Ryukyu Kingdom flourished from the 15th to 19th centuries as an international trading hub between China, Japan, and Southeast Asia."
      },
      {
        q: "What is the largest island in the Ryukyu archipelago, celebrated for its unique indigenous culture, longevity, and capital Naha?",
        correct: "Okinawa Island",
        w1: "Amami Oshima",
        w2: "Ishigaki",
        exp: "Okinawa is famous for Shuri Castle, karate martial arts origins, and a subtropical climate ringed by pristine coral reefs."
      },
      {
        q: "Which remote volcanic archipelago over 1,000 kilometers south of Tokyo is known as the Galápagos of the Orient for its endemic biodiversity?",
        correct: "Ogasawara Islands Bonin",
        w1: "Daito Islands",
        w2: "Goto Islands",
        exp: "The UNESCO World Heritage Ogasawara Islands were never connected to any continent, producing unique evolutionary flora and fauna."
      },
      {
        q: "Which warm western boundary ocean current flows northeastward past Taiwan and the southern coast of Japan, warming the coastal climate?",
        correct: "Kuroshio Current",
        w1: "Oyashio Current",
        w2: "Tsushima Current",
        exp: "The Kuroshio (Black Current) brings warm tropical Pacific water that supports coral reefs around Okinawa and influences southern Japanese rainfall."
      },
      {
        q: "Which cold subarctic ocean current flows southward past the Kuril Islands and eastern Hokkaido, supporting exceptionally rich fishing grounds?",
        correct: "Oyashio Current",
        w1: "Kuroshio Current",
        w2: "Limiman Current",
        exp: "The nutrient-rich Oyashio (Parent Current) mixes with the Kuroshio off the Sanriku coast to create one of the most productive marine fisheries on Earth."
      }
    ],
    number: {
      q: "In what year was the historic Ryukyu Kingdom officially annexed by the Empire of Japan and renamed Okinawa Prefecture?",
      target: 1879,
      unit: "year",
      imperial: "1879 AD",
      exp: "The Meiji government officially dethroned King Sho Tai in March 1879, establishing Okinawa as Japan 47th prefecture."
    }
  },

  // Cycle 5: Japanese Alps, Volcanic Hot Springs & Natural Hazards
  {
    mcqs: [
      {
        q: "What series of three rugged mountain ranges (Hida, Kiso, and Akaishi) spans the center of Honshu, dubbed the Roof of Japan?",
        correct: "Japanese Alps",
        w1: "Chugoku Mountains",
        w2: "Ou Mountains",
        exp: "English missionary Walter Weston popularized mountaineering in the Japanese Alps in the late 19th century, climbing peaks over 3,000 meters."
      },
      {
        q: "What Japanese term describes natural geothermal hot springs and bathing facilities ubiquitous across the volcanic archipelago?",
        correct: "Onsen",
        w1: "Sento",
        w2: "Rotenburo",
        exp: "Japan has over three thousand onsen resort areas heated by subterranean volcanic activity, renowned for mineral-rich therapeutic waters."
      },
      {
        q: "Which tectonic plate intersection makes Japan one of the most seismically active countries on Earth, situated along four major plates?",
        correct: "Pacific, Eurasian, North American and Philippine Sea Plates",
        w1: "Indo-Australian, Antarctic and Pacific Plates",
        w2: "Cocos, Nazca, Caribbean and South American Plates",
        exp: "The subduction of the Pacific and Philippine Sea plates beneath the North American and Eurasian plates generates continuous earthquakes and volcanoes."
      },
      {
        q: "What catastrophic natural disaster struck the Tohoku region of northeastern Japan on March 11, 2011, triggering a massive tsunami?",
        correct: "Great East Japan Earthquake",
        w1: "Great Kanto Earthquake",
        w2: "Great Hanshin Earthquake",
        exp: "The magnitude 9.1 megathrust earthquake generated tsunami waves over forty meters high, damaging the Fukushima Daiichi nuclear power plant."
      },
      {
        q: "What deep oceanic trench off the eastern coast of Honshu reaches depths exceeding 8,400 meters where the Pacific Plate subducts?",
        correct: "Japan Trench",
        w1: "Izu-Ogasawara Trench",
        w2: "Ryukyu Trench",
        exp: "The Japan Trench extends for eight hundred kilometers along the floor of the western Pacific Ocean parallel to the Honshu coastline."
      }
    ],
    number: {
      q: "In what year did the Great Kanto Earthquake devastate Tokyo and Yokohama, measuring magnitude 7.9?",
      target: 1923,
      unit: "year",
      imperial: "1923 AD",
      exp: "On September 1, 1923, the Great Kanto Earthquake struck the Tokyo basin, causing catastrophic urban fires that claimed over 140,000 lives."
    }
  },

  // Cycle 6: Cultural Landscapes, Castles & Historic Sites
  {
    mcqs: [
      {
        q: "Which spectacular 17th-century white plaster castle in Hyogo Prefecture is nicknamed the White Heron Castle for its soaring aesthetic beauty?",
        correct: "Himeji Castle",
        w1: "Matsumoto Castle",
        w2: "Osaka Castle",
        exp: "Himeji Castle is Japan finest surviving example of feudal castle architecture, featuring eighty-three buildings with advanced defensive spiral moats."
      },
      {
        q: "Which historic castle in Nagano Prefecture is nicknamed the Crow Castle because of its striking black wooden exterior walls?",
        correct: "Matsumoto Castle",
        w1: "Kumamoto Castle",
        w2: "Nagoya Castle",
        exp: "Built in the late 16th century, Matsumoto Castle is one of Japan twelve remaining original castle keeps, featuring a distinctive five-tier main tower."
      },
      {
        q: "Which UNESCO World Heritage mountain village in Gifu Prefecture is famous for steep thatched-roof farmhouses built in the Gassho-zukuri style?",
        correct: "Shirakawa-go",
        w1: "Takayama",
        w2: "Tsumago-juku",
        exp: "Gassho-zukuri (constructed like hands in prayer) roofs are angled at sixty degrees to withstand heavy winter snowfall while insulating silkworm attics."
      },
      {
        q: "What famous Shinto shrine on the island of Itsukushima (Miyajima) in Hiroshima Bay features a massive vermilion torii gate that appears to float at high tide?",
        correct: "Itsukushima Shrine",
        w1: "Fushimi Inari Shrine",
        w2: "Ise Grand Shrine",
        exp: "Constructed on piers over the water in the 12th century under Taira no Kiyomori, the shrine honors sea deities without disturbing sacred island soil."
      },
      {
        q: "Which sacred Shinto shrine in Mie Prefecture dedicated to the sun goddess Amaterasu is ritually dismantled and rebuilt every twenty years?",
        correct: "Ise Grand Shrine",
        w1: "Izumo Taisha",
        w2: "Meiji Shrine",
        exp: "The Shikinen Sengu reconstruction ritual has preserved ancient unpainted Japanese cypress architecture and sacred craftsmanship for over 1,300 years."
      }
    ],
    number: {
      q: "Every how many years is the sacred inner shrine at Ise Grand Shrine ritually rebuilt from pristine cypress timber?",
      target: 20,
      unit: "years",
      imperial: "Every 20 years",
      exp: "The Shikinen Sengu rebuilding ceremony at Ise has taken place every twenty years since the reign of Emperor Tenmu in 690 CE."
    }
  },

  // Cycle 7: Lakes, Rivers & Hydrology of Japan
  {
    mcqs: [
      {
        q: "What is the largest freshwater lake in Japan, located in Shiga Prefecture northeast of Kyoto?",
        correct: "Lake Biwa",
        w1: "Lake Kasumigaura",
        w2: "Lake Towada",
        exp: "Lake Biwa is an ancient tectonic rift lake over four million years old, supplying drinking water to fourteen million residents in the Kansai region."
      },
      {
        q: "What is the longest river in Japan, flowing 367 kilometers from the Japanese Alps through Niigata into the Sea of Japan?",
        correct: "Shinano River",
        w1: "Tone River",
        w2: "Ishikari River",
        exp: "The Shinano River (called the Chikuma River in Nagano) irrigates the fertile Echigo plains, famous for premium Koshihikari rice production."
      },
      {
        q: "Which river has the largest drainage basin in Japan, flowing across the Kanto Plain to empty into the Pacific Ocean at Choshi?",
        correct: "Tone River",
        w1: "Shinano River",
        w2: "Tenryu River",
        exp: "Nicknamed Bando Taro, the Tone River basin covers nearly 17,000 square kilometers and was historically redirected to protect Edo from flooding."
      },
      {
        q: "Which scenic caldera lake in Towada-Hachimantai National Park is famous for crystal-clear blue waters and the vibrant autumn foliage of the Oirase Stream?",
        correct: "Lake Towada",
        w1: "Lake Ashi",
        w2: "Lake Shikotsu",
        exp: "Lake Towada occupies a double-crater volcanic caldera on the border of Aomori and Akita prefectures in northern Tohoku."
      },
      {
        q: "Which scenic crater lake in Hakone offers iconic postcard views of Mount Fuji reflected across its surface behind floating red torii gates?",
        correct: "Lake Ashi",
        w1: "Lake Kawaguchi",
        w2: "Lake Yamanaka",
        exp: "Lake Ashi formed in the caldera of Mount Hakone three thousand years ago following a volcanic eruption, navigated today by pirate sightseeing ships."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Shinano River, the longest river in Japan?",
      target: 367,
      unit: "kilometers",
      imperial: "228 miles",
      exp: "The Shinano River flows for 367 kilometers from its source on Mount Kobushi in Nagano Prefecture to its mouth on the Sea of Japan at Niigata."
    }
  },

  // Cycle 8: Climate, Snow Country & Seasonal Phenomena
  {
    mcqs: [
      {
        q: "What geographic region along the Sea of Japan coast is famous for some of the heaviest seasonal snowfall accumulations on Earth?",
        correct: "Snow Country Yukiguni",
        w1: "Setouchi Region",
        w2: "Tokai Region",
        exp: "Cold Siberian winter winds absorb moisture over the warm Sea of Japan, dumping meters of snow as they rise over the central mountain spine."
      },
      {
        q: "What national spring blossom forecasting ritual tracks the northward progression of cherry blossoms across Japan from March to May?",
        correct: "Sakura Zensen Cherry Blossom Front",
        w1: "Momijigari Front",
        w2: "Koyo Tracking",
        exp: "The Japan Meteorological Corporation publishes daily maps tracking the opening of Yoshino cherry blossoms, prompting nationwide hanami picnics."
      },
      {
        q: "What early summer rainy season in Japan typically lasts from early June to mid-July, caused by a stationary frontal boundary?",
        correct: "Tsuyu Baiu",
        w1: "Shurin",
        w2: "Haru Ichiban",
        exp: "Tsuyu (plum rain) coincides with the ripening of Japanese plums, delivering vital precipitation to rice paddies before the hot summer."
      },
      {
        q: "Which massive alpine road route in Toyama and Nagano cuts through snowbanks forming snow corridors with vertical walls up to twenty meters high?",
        correct: "Tateyama Kurobe Alpine Route",
        w1: "Norikura Skyline",
        w2: "Bandai-Azuma Skyline",
        exp: "The Yuki-no-Otani (Great Snow Wall) on Mount Tateyama is carved annually by specialized rotary snowplows from April to June."
      },
      {
        q: "What natural hazard in late summer and autumn brings torrential rains and hurricane-force winds to southern and eastern Japan from the tropical Pacific?",
        correct: "Typhoons",
        w1: "Monsoons",
        w2: "Derechos",
        exp: "Japan experiences approximately twenty to thirty typhoons annually in the northwest Pacific basin, with an average of three making direct landfall."
      }
    ],
    number: {
      q: "What peak height in meters can the snow walls of Yuki-no-Otani reach along the Tateyama Kurobe Alpine Route in spring?",
      target: 20,
      unit: "meters",
      imperial: "65.6 feet tall",
      exp: "Accumulated winter snow drifts along the Tateyama alpine highway routinely create vertical snow canyons reaching twenty meters in height."
    }
  },

  // Cycle 9: Biodiversity, Wildlife & Forest Ecology
  {
    mcqs: [
      {
        q: "Which northern primate species, native to Japan, is celebrated for bathing in thermal volcanic hot springs during freezing winter snows?",
        correct: "Japanese Macaque Snow Monkey",
        w1: "Golden Snub-Nosed Monkey",
        w2: "Rhesus Macaque",
        exp: "Troops of Macaca fuscata in Jigokudani Monkey Park in Nagano learned to soak in geothermal hot spring baths to stay warm in sub-zero alpine winters."
      },
      {
        q: "Which ancient, moss-covered subtropical cedar forest island south of Kyushu contains ancient Yakusugi trees over 2,000 years old?",
        correct: "Yakushima",
        w1: "Tanegashima",
        w2: "Amami Oshima",
        exp: "Yakushima UNESCO World Heritage primeval forest receives immense rainfall, inspiring the animated forest landscapes in Hayao Miyazaki Princess Mononoke."
      },
      {
        q: "Which massive salamander species endemic to clear mountain streams in southwestern Japan grows up to 1.5 meters long?",
        correct: "Japanese Giant Salamander",
        w1: "Chinese Giant Salamander",
        w2: "Hellbender",
        exp: "Andrias japonicus is a living fossil with skin folds that absorb dissolved oxygen from fast-flowing, cold river rapids."
      },
      {
        q: "Which iconic red-crowned crane species performs elaborate courtship dances in the snowy marshes of Kushiro Wetlands in Hokkaido?",
        correct: "Japanese Crane Tancho",
        w1: "Hooded Crane",
        w2: "White-Naped Crane",
        exp: "The Tancho crane is a symbol of longevity and marital fidelity in Japanese art, rescued from near-extinction through protected feeding reserves."
      },
      {
        q: "What percentage of Japan total land area is covered by mountainous forests, making it one of the most heavily forested industrialized nations?",
        correct: "67 Percent",
        w1: "45 Percent",
        w2: "85 Percent",
        exp: "Roughly two-thirds of Japan is covered by dense temperate and boreal forests of cedar (sugi), cypress (hinoki), oak, and beech."
      }
    ],
    number: {
      q: "What percentage of Japan total land area is covered by natural and managed forests?",
      target: 67,
      unit: "percent",
      imperial: "67% of land area",
      exp: "Approximately 67 percent of Japan's territory is covered in lush mountainous forests, among the highest forest coverage rates in the OECD."
    }
  },

  // Cycle 10: Industry, Maritime Economy & Modern Infrastructure
  {
    mcqs: [
      {
        q: "Which city in Aichi Prefecture is the global headquarters and industrial manufacturing center for the world largest automobile manufacturer?",
        correct: "Toyota City",
        w1: "Nagoya",
        w2: "Hamamatsu",
        exp: "Formerly named Koromo, the city was renamed Toyota City in 1959 in honor of Toyota Motor Corporation founder Kiichiro Toyoda."
      },
      {
        q: "Which international airport serving Osaka was constructed entirely on a colossal artificial island in Osaka Bay, opening in 1994?",
        correct: "Kansai International Airport",
        w1: "Chubu Centrair Airport",
        w2: "Haneda Airport",
        exp: "Engineered by Renzo Piano, Kansai Airport utilizes hydraulic computer-controlled jacks beneath pillar foundations to compensate for soft clay seabed settlement."
      },
      {
        q: "Which major Japanese industrial port city on Tokyo Bay is the second most populous municipality in Japan after Tokyo?",
        correct: "Yokohama",
        w1: "Kawasaki",
        w2: "Chiba",
        exp: "Yokohama developed rapidly after Commodore Matthew Perry opening of Japan in 1854, transforming from a fishing village into a metropolis of nearly four million people."
      },
      {
        q: "Which international space launch facility operated by JAXA on an island south of Kyushu is famed for dramatic cliffside ocean rocket launches?",
        correct: "Tanegashima Space Center",
        w1: "Uchinoura Space Center",
        w2: "Kagoshima Launch Complex",
        exp: "Tanegashima launches Japan flagship H-IIA and H3 orbital rockets, situated at thirty degrees North latitude to maximize Earth rotational velocity boost."
      },
      {
        q: "What famous commercial fish market in Tokyo relocated in 2018 to a modern facility at Toyosu after operating for eighty-three years?",
        correct: "Tsukiji Fish Market",
        w1: "Ota Market",
        w2: "Adachi Market",
        exp: "Tsukiji was the world largest seafood wholesale market, legendary for its pre-dawn bluefin tuna auctions and bustling outer sushi markets."
      }
    ],
    number: {
      q: "In what year did the first commercial Shinkansen high-speed rail line (Tokaido Shinkansen) open between Tokyo and Shin-Osaka?",
      target: 1964,
      unit: "year",
      imperial: "1964 AD",
      exp: "The Tokaido Shinkansen officially inaugurated service on October 1, 1964, just nine days before the opening ceremony of the Tokyo Summer Olympics."
    }
  }
];

// Build Japan Quiz
buildQuiz({
  id: 'japan-geography-heritage-60',
  theme: 'Japan: Geography, Islands & Cultural Heritage',
  title: 'Japan: Geography, Islands & Cultural Heritage',
  description: 'A 60-question comprehensive master assessment exploring the four main islands, Mount Fuji, 47 prefectures, the Seikan Tunnel, Shinkansen, Ryukyu archipelago, Japanese Alps, feudal castles, hot springs, and biodiversity.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, japanCycles);

console.log('Japan quiz built successfully!');
