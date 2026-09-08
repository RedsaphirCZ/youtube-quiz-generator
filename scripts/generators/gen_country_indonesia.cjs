const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 5. indonesia-geography-heritage-60
// =========================================================================
const indonesiaCycles = [
  // Cycle 1: The Ring of Fire, Krakatoa & Mount Bromo
  {
    mcqs: [
      {
        q: "What catastrophic volcanic eruption in the Sunda Strait between Java and Sumatra in August 1883 generated forty-meter tsunamis and the loudest sound ever recorded in human history?",
        correct: "Krakatoa Krakatau",
        w1: "Mount Tambora",
        w2: "Mount Merapi",
        exp: "The explosion was heard 4,800 kilometers away in Mauritius and Australia, destroying two-thirds of the island and lowering global temperatures for years."
      },
      {
        q: "Which active volcanic cinder cone in the Tengger Caldera of East Java rises from a vast volcanic Sand Sea (Segara Wedi), sacred to the Hindu Tenggerese people?",
        correct: "Mount Bromo",
        w1: "Mount Semeru",
        w2: "Mount Ijen",
        exp: "During the annual Yadnya Kasada festival, pilgrims climb the crater rim to cast rice, fruit, and livestock offerings into the boiling sulfurous crater."
      },
      {
        q: "What is the highest and most active stratovolcano on the island of Java, rising 3,676 meters in East Java, nicknamed the Great Mountain (Mahameru)?",
        correct: "Mount Semeru",
        w1: "Mount Bromo",
        w2: "Mount Slamet",
        exp: "Semeru has been in near-continuous volcanic eruption since 1967, periodically venting ash plumes every twenty to thirty minutes."
      },
      {
        q: "Which stratovolcano in East Java is world-famous for its nighttime electric-blue sulfur flames and the world largest highly acidic turquoise crater lake?",
        correct: "Kawah Ijen",
        w1: "Mount Kelud",
        w2: "Mount Galunggung",
        exp: "High-pressure sulfuric gases combust at 600°C upon contact with air, creating vivid blue flames where artisanal miners hand-carry seventy-kilogram blocks of sulfur."
      },
      {
        q: "Which volcano near Yogyakarta is considered the most active volcano in Indonesia, erupting regularly with deadly pyroclastic flows (wedhus gembel)?",
        correct: "Mount Merapi",
        w1: "Mount Lawu",
        w2: "Mount Merbabu",
        exp: "Merapi (Fire Mountain) has been recognized as a Decade Volcano, closely monitored by seismologists due to millions of people living on its fertile volcanic slopes."
      }
    ],
    number: {
      q: "In what historic year did the cataclysmic volcanic eruption of Krakatoa occur in the Sunda Strait of Indonesia?",
      target: 1883,
      unit: "year",
      imperial: "1883 AD",
      exp: "Krakatoa reached its climactic explosive eruption on August 27, 1883, triggering global tsunamis and atmospheric shockwaves."
    }
  },

  // Cycle 2: Sumatra, Lake Toba & Tropical Rainforests
  {
    mcqs: [
      {
        q: "What massive 100-kilometer volcanic lake in North Sumatra is the largest volcanic crater lake in the world, formed by a colossal supervolcano eruption 74,000 years ago?",
        correct: "Lake Toba Danau Toba",
        w1: "Lake Singkarak",
        w2: "Lake Maninjau",
        exp: "The Toba super-eruption was the largest explosive event on Earth in the last two million years, creating an inland sea containing Samosir Island."
      },
      {
        q: "Which island in the center of Lake Toba is the cultural heartland of the indigenous Batak Toba people, famous for boat-roofed wooden houses (bolon)?",
        correct: "Samosir Island",
        w1: "Nias Island",
        w2: "Mentawai Island",
        exp: "Samosir is nearly the size of Singapore, famous for traditional stone tombs of Batak kings, woodcarving in Tomok, and the Sigale Gale puppet dance."
      },
      {
        q: "Which critically endangered great ape species, characterized by long orange-red fur and facial cheek pads in mature males, is endemic to the rainforests of northern Sumatra?",
        correct: "Sumatran Orangutan Pongo abelii",
        w1: "Bornean Orangutan",
        w2: "Tapanuli Orangutan",
        exp: "Sumatran orangutans are almost strictly arboreal to avoid terrestrial predators like the Sumatran tiger, protected inside Gunung Leuser National Park."
      },
      {
        q: "What parasitic rainforest plant native to the jungles of Sumatra and Borneo produces the largest individual flower on Earth, measuring up to one meter in diameter?",
        correct: "Rafflesia arnoldii Corpse Flower",
        w1: "Titan Arum",
        w2: "Pitcher Plant",
        exp: "Rafflesia has no leaves, stems, or true roots, living entirely inside Tetrastigma vines and releasing a pungent rotting-meat scent to attract carrion flies for pollination."
      },
      {
        q: "What massive 1,700-kilometer mountain range forms the volcanic western spine of Sumatra from Aceh in the north to Lampung in the south?",
        correct: "Barisan Mountains Bukit Barisan",
        w1: "Schwaner Mountains",
        w2: "Pegunungan Muller",
        exp: "Bukit Barisan (Row of Hills) contains thirty-five active volcanoes, including Mount Kerinci (3,805 m), the highest volcano in Indonesia."
      }
    ],
    number: {
      q: "What is the maximum diameter in meters of the giant blooming flower of the Sumatran parasitic plant Rafflesia arnoldii?",
      target: 1,
      unit: "meter",
      imperial: "3.3 feet across",
      exp: "The colossal blossom of Rafflesia arnoldii can measure over one meter across and weigh up to eleven kilograms."
    }
  },

  // Cycle 3: Java, Jakarta & Borobudur Monument
  {
    mcqs: [
      {
        q: "What monumental 9th-century Mahayana Buddhist temple in Central Java, built from two million volcanic stone blocks, is the largest Buddhist temple on Earth?",
        correct: "Borobudur",
        w1: "Prambanan",
        w2: "Candi Mendut",
        exp: "Constructed under the Sailendra Dynasty, Borobudur is designed as a colossal step-pyramid mandala featuring 504 Buddha statues and 2,672 carved relief panels."
      },
      {
        q: "Which 9th-century UNESCO World Heritage temple complex in Central Java is the largest Hindu temple site in Indonesia, dedicated to the Trimurti (Shiva, Brahma, Vishnu)?",
        correct: "Prambanan Candi Roro Jonggrang",
        w1: "Candi Sewu",
        w2: "Candi Plaosan",
        exp: "Prambanan features towering pointed stone spires, with the central Shiva temple rising forty-seven meters high, adorned with stone bas-reliefs of the Ramayana."
      },
      {
        q: "What is the most populous island on Earth, home to over 150 million residents (more than half of Indonesia total national population)?",
        correct: "Java Jawa",
        w1: "Sumatra",
        w2: "Sulawesi",
        exp: "Java is the economic and political center of Indonesia, home to major cities like Jakarta, Surabaya, Bandung, and Semarang, surrounded by forty-five active volcanoes."
      },
      {
        q: "What is the current official capital city of Indonesia, a sinking coastal megacity on the northwest coast of Java whose administrative role is transitioning to Nusantara?",
        correct: "Jakarta Special Capital Region",
        w1: "Surabaya",
        w2: "Bandung",
        exp: "Historically known as Batavia under Dutch colonial rule, Jakarta faces severe land subsidence due to groundwater extraction, prompting the relocation to East Kalimantan."
      },
      {
        q: "What planned smart and green city in East Kalimantan is being constructed as the new future national capital city of the Republic of Indonesia?",
        correct: "Nusantara Ibu Kota Nusantara",
        w1: "Balikpapan",
        w2: "Samarinda",
        exp: "Inaugurated as the ceremonial venue for Indonesian Independence Day in August 2024, Nusantara is designed as a sustainable forest city powered by renewable energy."
      }
    ],
    number: {
      q: "In approximately what year CE was the construction of the monumental Borobudur Buddhist temple completed in Central Java?",
      target: 825,
      unit: "CE",
      imperial: "825 AD",
      exp: "Historical inscriptions indicate Borobudur was founded around 750 CE and completed around 825 CE during the reign of King Samaratungga."
    }
  },

  // Cycle 4: Bali, The Island of the Gods & Subak
  {
    mcqs: [
      {
        q: "What famous Indonesian island province is known as the Island of the Gods, maintaining an ancient unique Balinese Hindu majority culture?",
        correct: "Bali",
        w1: "Lombok",
        w2: "Flores",
        exp: "Bali is world-renowned for traditional gamelan orchestra music, intricately carved temple gates (candi bentar), shadow puppetry (wayang), and surf beaches."
      },
      {
        q: "What UNESCO World Heritage 1,000-year-old traditional cooperative water management and irrigation system sustains Bali terraced rice fields?",
        correct: "Subak",
        w1: "Gotong Royong",
        w2: "Adat",
        exp: "Subak is rooted in the Tri Hita Karana philosophical concept of spiritual harmony between humans, nature, and the divine, centered around water temples (Pura Tirta)."
      },
      {
        q: "What is the highest mountain and most sacred stratovolcano on the island of Bali, rising 3,031 meters, regarded as the spiritual navel of the island?",
        correct: "Mount Agung Gunung Agung",
        w1: "Mount Batur",
        w2: "Mount Batukaru",
        exp: "Perched high on the southwestern slopes of Mount Agung sits Pura Besakih (The Mother Temple of Bali), the holiest temple complex of Balinese Hinduism."
      },
      {
        q: "Which iconic Balinese sea temple perches dramatically on the edge of a sheer 70-meter limestone cliff above crashing Indian Ocean surf, famed for evening Kecak fire dances?",
        correct: "Uluwatu Temple Pura Luhur Uluwatu",
        w1: "Tanah Lot",
        w2: "Ulun Danu Beratan",
        exp: "Inhabited by troops of cheeky macaque monkeys, Uluwatu guards Bali southwestern tip from malevolent ocean spirits according to ancient lore."
      },
      {
        q: "Which famous 16th-century offshore pilgrimage temple in Bali sits atop an offshore rock formation that becomes isolated by ocean tides at high tide?",
        correct: "Tanah Lot Pura Tanah Lot",
        w1: "Pura Lempuyang",
        w2: "Tirta Empul",
        exp: "Tanah Lot (meaning 'Land in the Sea') was founded by Hindu sage Dang Hyang Nirartha, said to be guarded by poisonous sea snakes nesting at its base."
      }
    ],
    number: {
      q: "How many distinct UNESCO World Heritage cultural landscape sites are preserved under Bali historic Subak water management system?",
      target: 5,
      unit: "sites",
      imperial: "5 cultural landscape sites",
      exp: "The UNESCO inscription encompasses five distinct sites, including the Supreme Water Temple Pura Ulun Danu Batur and the Jatiluwih Rice Terraces."
    }
  },

  // Cycle 5: Komodo Dragons & The Lesser Sunda Islands
  {
    mcqs: [
      {
        q: "What is the largest living species of lizard on Earth, growing up to three meters in length and weighing over seventy kilograms, native to five Indonesian islands?",
        correct: "Komodo Dragon Varanus komodoensis",
        w1: "Perentie",
        w2: "Lace Monitor",
        exp: "Komodo dragons use venomous bite glands that induce shock and prevent blood clotting to hunt prey as large as deer, water buffalo, and wild boars."
      },
      {
        q: "Which UNESCO World Heritage National Park in East Nusa Tenggara preserves the natural rugged savanna habitat of the Komodo dragon across Komodo, Rinca, and Padar islands?",
        correct: "Komodo National Park",
        w1: "Kelimutu National Park",
        w2: "Lorentz National Park",
        exp: "Established in 1980, the park also encompasses pristine marine waters rich in manta rays, dugongs, and over one thousand species of coral reef fish."
      },
      {
        q: "What famous active volcano on the island of Flores features three distinct crater lakes that periodically change colors (from turquoise to black and red) due to mineral oxidation?",
        correct: "Mount Kelimutu",
        w1: "Mount Rinjani",
        w2: "Mount Tambora",
        exp: "Kelimutu three crater lakes (Tiwu Ata Bupu, Tiwu Ko'o Fai Nuwa Muri, and Tiwu Ata Polo) are believed by locals to be the resting place of departed souls."
      },
      {
        q: "What is the second highest volcano in Indonesia, rising 3,726 meters on the island of Lombok, famous for the crescent-shaped caldera lake Segara Anak?",
        correct: "Mount Rinjani",
        w1: "Mount Tambora",
        w2: "Mount Kerinci",
        exp: "A massive 1257 CE eruption of the Samalas volcano (predecessor of Rinjani) triggered global climate cooling and famine documented in medieval European chronicles."
      },
      {
        q: "Which Indonesian volcano on Sumbawa island produced the largest and deadliest volcanic eruption in recorded human history in April 1815, causing the 1816 'Year Without a Summer'?",
        correct: "Mount Tambora",
        w1: "Krakatoa",
        w2: "Mount Toba",
        exp: "Tambora ejected 160 cubic kilometers of debris (VEI-7), lowering its summit from 4,300 to 2,851 meters and killing over 70,000 people across the archipelago."
      }
    ],
    number: {
      q: "What maximum length in meters can an adult wild male Komodo Dragon reach?",
      target: 3,
      unit: "meters",
      imperial: "10 feet long",
      exp: "The largest verified wild Komodo dragons reach lengths of up to 3.13 meters (10.3 feet) and weigh over seventy kilograms."
    }
  },

  // Cycle 6: Borneo / Kalimantan & Orangutan Conservation
  {
    mcqs: [
      {
        q: "What is the Indonesian name for the southern two-thirds of the island of Borneo, covering 544,000 square kilometers across five provinces?",
        correct: "Kalimantan",
        w1: "Sumatra",
        w2: "Sulawesi",
        exp: "Kalimantan contains vast tropical peat-swamp forests, dense ironwood jungles, and massive river highways like the Kapuas and Mahakam."
      },
      {
        q: "Which world-famous national park in Central Kalimantan along the Sekonyer River is home to Camp Leakey, founded in 1971 by Dr. Biruté Galdikas to rehabilitate wild orangutans?",
        correct: "Tanjung Puting National Park",
        w1: "Kutai National Park",
        w2: "Betung Kerihun",
        exp: "Visitors travel upriver on traditional wooden houseboats (klotok) to observe wild Bornean orangutans, proboscis monkeys, and false gharials."
      },
      {
        q: "What is the longest river in Indonesia, flowing 1,143 kilometers across West Kalimantan from the Müller Mountains to the South China Sea at Pontianak?",
        correct: "Kapuas River",
        w1: "Mahakam River",
        w2: "Barito River",
        exp: "The Kapuas is the longest island river in the world, serving as a primary transportation artery for indigenous Dayak riverine communities."
      },
      {
        q: "Which endemic primate species with a bulbous, pendulous nose and potbelly, known locally as Bekantan, is native exclusively to the mangrove and river forests of Borneo?",
        correct: "Proboscis Monkey Nasalis larvatus",
        w1: "Silvered Leaf Monkey",
        w2: "Maroon Langur",
        exp: "Proboscis monkeys are expert swimmers with partially webbed feet, leaping from high mangrove branches into rivers to escape predators."
      },
      {
        q: "What rare, critically endangered freshwater dolphin sub-population inhabits the muddy inland waters of the Mahakam River in East Kalimantan?",
        correct: "Irrawaddy Dolphin Pesut Mahakam",
        w1: "Yangtze Finless Porpoise",
        w2: "Amazon River Dolphin",
        exp: "Fewer than one hundred Pesut Mahakam dolphins survive today, recognized as the provincial mascot and protected under strict wildlife conservation laws."
      }
    ],
    number: {
      q: "What is the approximate total land area in thousands of square kilometers of Indonesian Kalimantan (Borneo)?",
      target: 544,
      unit: "thousand square kilometers",
      imperial: "210,000 square miles",
      exp: "Kalimantan covers approximately 544,150 square kilometers, accounting for roughly seventy-three percent of the island of Borneo."
    }
  },

  // Cycle 7: Sulawesi & The Coral Triangle
  {
    mcqs: [
      {
        q: "What uniquely shaped Indonesian island resembles an orchid flower or the letter 'K', formed by four mountainous peninsulas radiating from a central core?",
        correct: "Sulawesi Celebes",
        w1: "Halmahera",
        w2: "Seram",
        exp: "Sulawesi is the eleventh largest island in the world, surrounded by deep marine trenches and famous for extreme biological endemism."
      },
      {
        q: "Which ethnic group in the rugged highlands of South Sulawesi is internationally famous for cliffside hanging graves, carved tau-tau wooden effigies, and boat-roofed houses (tongkonan)?",
        correct: "Toraja People Tana Toraja",
        w1: "Bugis",
        w2: "Minahasa",
        exp: "Toraja funeral rituals (Rambu Solo) last several days, involving the ritual slaughter of prized spotted water buffalo (tedong bonga) to guide souls to Puya (the afterlife)."
      },
      {
        q: "Which marine national park off the coast of Manado in North Sulawesi is world-famous for sheer vertical underwater coral drop-offs plunging over a thousand meters?",
        correct: "Bunaken National Marine Park",
        w1: "Wakatobi National Park",
        w2: "Taka Bonerate",
        exp: "Located in the heart of the Coral Triangle, Bunaken features exceptional water clarity and houses seventy percent of all fish species known in the Indo-Western Pacific."
      },
      {
        q: "What bizarre, prehistoric-looking wild swine species endemic to Sulawesi features males with upper canine tusks that curve upward and backward through the top of the snout?",
        correct: "Babirusa Babyrousa",
        w1: "Sulawesi Warty Pig",
        w2: "Anoa",
        exp: "Babirusa (meaning 'deer-pig' in Malay) tusks can grow so long that if unground they can curve back and pierce the animal own skull."
      },
      {
        q: "What tiny, miniature wild buffalo species, standing only seventy-five centimeters tall, is endemic to the dense undisturbed rainforests of Sulawesi?",
        correct: "Anoa Bubalus depressicornis",
        w1: "Banteng",
        w2: "Tamaraw",
        exp: "Anoa (the Midget Buffalo) is the smallest living wild cattle species on Earth, fiercely defending territory with sharp dagger-like horns."
      }
    ],
    number: {
      q: "How many large mountainous peninsulas radiate from the central core of Sulawesi to create its distinct K-shaped island geography?",
      target: 4,
      unit: "peninsulas",
      imperial: "4 main peninsulas",
      exp: "Sulawesi is formed by four primary peninsulas: Northern (Minahasa), Eastern, South-Eastern, and Southern peninsulas."
    }
  },

  // Cycle 8: Raja Ampat & Coral Reef Biodiversity
  {
    mcqs: [
      {
        q: "What remote archipelago of over 1,500 islands off the northwest tip of Papua, meaning 'The Four Kings', is recognized as the global epicenter of marine biodiversity?",
        correct: "Raja Ampat",
        w1: "Banda Islands",
        w2: "Aru Islands",
        exp: "Raja Ampat four main islands (Misool, Salawati, Batanta, Waigeo) harbor over 550 coral species (seventy-five percent of all known coral species on Earth) and 1,500 fish species."
      },
      {
        q: "Which spectacular cluster of steep, mushroom-shaped emerald karst limestone islets rising from turquoise lagoons is the postcard icon of Raja Ampat?",
        correct: "Wayag Islands",
        w1: "Pianemo Islands",
        w2: "Kri Island",
        exp: "Wayag is a protected marine sanctuary where visitors climb jagged limestone peaks for panoramic vistas across hidden atolls and baby blacktip reef shark nurseries."
      },
      {
        q: "What spectacular bird family, famous for elaborate iridescent plumage and courtship display dances, was studied in the rainforests of Raja Ampat and Papua by Alfred Russel Wallace?",
        correct: "Birds-of-Paradise Paradisaeidae",
        w1: "Bowerbirds",
        w2: "Cassowaries",
        exp: "Waigeo and Batanta islands are home to the endemic Red Bird-of-Paradise and Wilson Bird-of-Paradise, famous for its turquoise-blue bald crown and curled tail wires."
      },
      {
        q: "What massive 25,000-square-kilometer national park in Indonesian Papua is the largest national park in Southeast Asia, spanning from equatorial coral seas to snow-capped glaciers?",
        correct: "Lorentz National Park",
        w1: "Wasur National Park",
        w2: "Teluk Cenderawasih",
        exp: "Lorentz is the only protected area in the Asia-Pacific region containing an unbroken environmental transect from marine habitats, lowland swamps, and alpine glaciers."
      },
      {
        q: "What is the highest mountain peak in Indonesia and all of Oceania, rising 4,884 meters in Papua, holding one of the world rare tropical summit glaciers?",
        correct: "Puncak Jaya Carstensz Pyramid",
        w1: "Puncak Mandala",
        w2: "Puncak Trikora",
        exp: "Carstensz Pyramid is the highest island peak on Earth and one of the prestigious Seven Summits, requiring technical rock climbing on limestone slabs."
      }
    ],
    number: {
      q: "What is the surveyed summit elevation in meters above sea level of Puncak Jaya (Carstensz Pyramid) in Papua, the highest point in Oceania?",
      target: 4884,
      unit: "meters",
      imperial: "16,024 feet",
      exp: "Puncak Jaya stands at an official elevation of 4,884 meters above sea level in the Sudirman Range of Central Papua."
    }
  },

  // Cycle 9: The Maluku Spice Islands & Colonial Trade
  {
    mcqs: [
      {
        q: "What archipelago in eastern Indonesia was historically renowned across the world as The Spice Islands, the sole original source of nutmeg and cloves in antiquity?",
        correct: "Maluku Islands The Moluccas",
        w1: "Lesser Sunda Islands",
        w2: "Riau Archipelago",
        exp: "For centuries, Arab, Chinese, and European traders crossed oceans to trade for spices that were worth more than their weight in gold in medieval Europe."
      },
      {
        q: "Which tiny volcanic island group in the Maluku archipelago was the only place on Earth where the valuable tree producing nutmeg and mace (Myristica fragrans) grew naturally?",
        correct: "Banda Islands",
        w1: "Ternate",
        w2: "Tidore",
        exp: "The Dutch East India Company (VOC) enforced a brutal violent monopoly over Banda in 1621 under Jan Pieterszoon Coen, establishing walled nutmeg plantations."
      },
      {
        q: "Under the historic 1667 Treaty of Breda, the British Empire traded the remote nutmeg island of Run in the Banda Islands to the Dutch in exchange for which North American island?",
        correct: "Manhattan Island New Amsterdam",
        w1: "Jamaica",
        w2: "Bermuda",
        exp: "The Dutch considered gaining complete global monopoly control over the Banda nutmeg trade far more valuable than the swampy North American fur trading post of New Amsterdam."
      },
      {
        q: "Which two rival volcanic island sultanates in North Maluku were the original global source of aromatic cloves (Syzygium aromaticum)?",
        correct: "Ternate and Tidore",
        w1: "Ambon and Seram",
        w2: "Bacan and Morotai",
        exp: "Crowned by smoking conical volcanoes, the Sultans of Ternate and Tidore commanded fleets of kora-kora war canoes and traded directly with Magellan expedition in 1521."
      },
      {
        q: "What transitional biogeographical boundary line drawn in 1859 by naturalist Alfred Russel Wallace separates the Asian fauna of Borneo/Bali from the Australasian fauna of Sulawesi/Lombok?",
        correct: "The Wallace Line",
        w1: "The Weber Line",
        w2: "The Lydekker Line",
        exp: "Wallace noticed that deep marine trenches prevented land animals from crossing, separating placental mammals (monkeys, tigers) to the west from marsupials to the east."
      }
    ],
    number: {
      q: "In what year was the historic Treaty of Breda signed, in which the Dutch traded Manhattan (New York) for the tiny Indonesian nutmeg island of Run?",
      target: 1667,
      unit: "year",
      imperial: "1667 AD",
      exp: "The Treaty of Breda was concluded on July 31, 1667, ending the Second Anglo-Dutch War and solidifying Dutch control over the Spice Islands."
    }
  },

  // Cycle 10: Extent, 17,000 Islands & Indonesian Superlatives
  {
    mcqs: [
      {
        q: "Approximately how many total islands comprise the Republic of Indonesia, making it the largest archipelagic sovereign nation on Earth?",
        correct: "Over 17,500 Islands",
        w1: "7,000 Islands",
        w2: "25,000 Islands",
        exp: "According to official Indonesian government surveys, the archipelago consists of approximately 17,508 islands (roughly 6,000 inhabited) stretching 5,120 kilometers along the equator."
      },
      {
        q: "What ranking does Indonesia hold among the most populous countries in the world, with a national population exceeding 275 million people?",
        correct: "Fourth Most Populous Country",
        w1: "Second Most Populous",
        w2: "Seventh Most Populous",
        exp: "Indonesia is the fourth most populous nation on Earth (after India, China, and the United States) and the world most populous Muslim-majority country."
      },
      {
        q: "What is the national motto of the Republic of Indonesia, inscribed in Old Javanese on the Garuda Pancasila national emblem, meaning 'Unity in Diversity'?",
        correct: "Bhinneka Tunggal Ika",
        w1: "Pancasila",
        w2: "Merdeka atau Mati",
        exp: "Derived from a 14th-century poem by poet Mpu Tantular during the Majapahit Empire, the motto honors over three hundred distinct ethnic groups united under one republic."
      },
      {
        q: "Into how many first-level administrative provinces is the Republic of Indonesia divided today (including special autonomous regions)?",
        correct: "38 Provinces",
        w1: "34 Provinces",
        w2: "27 Provinces",
        exp: "Following the creation of four new provinces in the Papua region in 2022, Indonesia consists of thirty-eight provinces spanning three standard time zones (WIB, WITA, WIT)."
      },
      {
        q: "What 900-kilometer maritime strait between the Malay Peninsula and the Indonesian island of Sumatra is the busiest international shipping chokepoint in the world?",
        correct: "Strait of Malacca",
        w1: "Sunda Strait",
        w2: "Lombok Strait",
        exp: "Carrying over 84,000 vessels annually (roughly one-fourth of global maritime commerce and eighty percent of East Asia oil imports), the Strait of Malacca is of paramount geopolitical importance."
      }
    ],
    number: {
      q: "How many administrative provinces comprise the Republic of Indonesia following recent regional additions?",
      target: 38,
      unit: "provinces",
      imperial: "38 provinces",
      exp: "Indonesia is currently structured into thirty-eight official provinces across its vast island territory."
    }
  }
];

// Build Indonesia Quiz
buildQuiz({
  id: 'indonesia-geography-heritage-60',
  theme: 'Indonesia: Geography, Volcanoes & Spice Archipelagos',
  title: 'Indonesia: Geography, Volcanoes & Spice Archipelagos',
  description: 'A 60-question grand master assessment exploring Krakatoa & Mount Bromo, Lake Toba supervolcano, Borobudur & Java, Bali subak landscapes, Komodo dragons, Borneo orangutans, Sulawesi, Raja Ampat, and the Maluku Spice Islands.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, indonesiaCycles);

console.log('Indonesia quiz built successfully!');
