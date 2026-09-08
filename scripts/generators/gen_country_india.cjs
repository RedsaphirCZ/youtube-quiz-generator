const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 9. india-geography-heritage-60
// =========================================================================
const indiaCycles = [
  // Cycle 1: The Himalayas, Karakoram & Northern Frontiers
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in India and third highest on Earth, rising 8,586 meters on the border between Sikkim and Nepal?",
        correct: "Kangchenjunga",
        w1: "Nanda Devi",
        w2: "Kamet",
        exp: "Sacred to the Sikkimese people, mountaineering expeditions traditionally stop short of the actual summit to respect religious beliefs."
      },
      {
        q: "What is the highest mountain peak located entirely within Indian national borders, rising 7,816 meters in the Garhwal Himalayas of Uttarakhand?",
        correct: "Nanda Devi",
        w1: "Kamet",
        w2: "Trisul",
        exp: "Nanda Devi is encircled by a protective ring of high glaciated peaks forming the UNESCO-inscribed Nanda Devi and Valley of Flowers National Parks."
      },
      {
        q: "What 76-kilometer glacier in the Karakoram range is the longest glacier in the non-polar world and the world highest military battlefield?",
        correct: "Siachen Glacier",
        w1: "Gangotri Glacier",
        w2: "Baltoro Glacier",
        exp: "The Siachen Glacier sits at an average altitude of 5,400 meters, where Indian and Pakistani military outposts endure winter temperatures below minus fifty degrees."
      },
      {
        q: "Which high-altitude cold desert plateau in northern India is famed for its stark lunar landscapes, Pangong Tso lake, and Buddhist gompas?",
        correct: "Ladakh",
        w1: "Spiti Valley",
        w2: "Zanskar",
        exp: "Bordered by the Karakoram and Great Himalaya ranges, Ladakh capital Leh sits at 3,500 meters, connected via the dramatic Khardung La pass."
      },
      {
        q: "What high-altitude national park in Uttarakhand is renowned for alpine meadows carpeted with thousands of endemic wild floral species?",
        correct: "Valley of Flowers",
        w1: "Great Himalayan National Park",
        w2: "Hemis National Park",
        exp: "Discovered by British mountaineer Frank Smythe in 1931, the Valley of Flowers blooms with vibrant blue poppies, orchids, and primulas after monsoon rains."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Kangchenjunga, the highest peak in India?",
      target: 8586,
      unit: "meters",
      imperial: "28,169 feet",
      exp: "Kangchenjunga stands at an official elevation of 8,586 meters, the third highest mountain peak on Earth."
    }
  },

  // Cycle 2: The Indo-Gangetic Plain & Sacred Rivers
  {
    mcqs: [
      {
        q: "What is the longest river flowing through India, stretching 2,525 kilometers from the Gangotri Glacier in Uttarakhand to the Bay of Bengal?",
        correct: "Ganges Ganga",
        w1: "Brahmaputra",
        w2: "Godavari",
        exp: "Formed by the confluence of the Bhagirathi and Alaknanda at Devprayag, the holy Ganges basin supports over four hundred million people."
      },
      {
        q: "Which ancient city in Uttar Pradesh along the crescent bend of the Ganges is revered as one of the oldest continuously inhabited sacred cities on Earth?",
        correct: "Varanasi Benares",
        w1: "Haridwar",
        w2: "Rishikesh",
        exp: "Varanasi features eighty-four stone ghats along the riverbanks where pilgrims perform purification rituals, cremation rites, and evening Ganga Aarti ceremonies."
      },
      {
        q: "What is the sacred confluence of the Ganges, Yamuna, and mythical underground Saraswati rivers at Prayagraj called, host to the Kumbh Mela?",
        correct: "Triveni Sangam",
        w1: "Devprayag",
        w2: "Rudraprayag",
        exp: "The Maha Kumbh Mela held at Triveni Sangam every twelve years is the largest gathering of humanity on Earth, drawing tens of millions of pilgrims."
      },
      {
        q: "Which major tributary of the Ganges flows 1,376 kilometers past Delhi and Agra, where the 17th-century white marble Taj Mahal stands on its southern bank?",
        correct: "Yamuna River",
        w1: "Ghaghara River",
        w2: "Gomti River",
        exp: "Originating from the Yamunotri glacier in the Himalayas, the Yamuna is India longest tributary river before merging with the Ganges at Prayagraj."
      },
      {
        q: "What is the longest river in peninsular South India, flowing 1,465 kilometers across Maharashtra and Andhra Pradesh, often called Dakshin Ganga?",
        correct: "Godavari River",
        w1: "Krishna River",
        w2: "Kaveri River",
        exp: "The Godavari originates at Trimbakeshwar in the Western Ghats and has the second largest river basin in India after the Ganges."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the sacred Ganges River from the Himalayas to the Bay of Bengal?",
      target: 2525,
      unit: "kilometers",
      imperial: "1,569 miles",
      exp: "The Ganges flows for exactly 2,525 kilometers across northern India and Bangladesh."
    }
  },

  // Cycle 3: The Thar Desert & Royal Rajasthan
  {
    mcqs: [
      {
        q: "What is the seventh largest desert in the world, covering roughly 200,000 square kilometers across the northwestern state of Rajasthan?",
        correct: "Thar Desert Great Indian Desert",
        w1: "Cholistan Desert",
        w2: "Rann of Kutch",
        exp: "The Thar Desert is bounded by the Aravalli Range to the east and the Indus River plain to the west, famous for camel caravans and colorful folk culture."
      },
      {
        q: "Which fortress city in the Thar Desert is known as the Golden City due to its magnificent yellow sandstone fort rising from the sand dunes?",
        correct: "Jaisalmer",
        w1: "Jodhpur",
        w2: "Bikaner",
        exp: "Jaisalmer Fort (Sonar Qila) was built in 1156 CE by Rajput ruler Rawal Jaisal, containing living residential quarters, palaces, and carved Jain temples."
      },
      {
        q: "Which historic city in Rajasthan is known as the Blue City for its sea of indigo-blue painted houses surrounding the imposing Mehrangarh Fort?",
        correct: "Jodhpur",
        w1: "Jaipur",
        w2: "Udaipur",
        exp: "Mehrangarh Fort sits atop a 122-meter perpendicular cliff, founded in 1459 by Rao Jodha with walls retaining scars of historic cannonball sieges."
      },
      {
        q: "What is the capital city of Rajasthan, famously known as the Pink City after its buildings were painted terracotta pink to welcome the Prince of Wales in 1876?",
        correct: "Jaipur",
        w1: "Udaipur",
        w2: "Kota",
        exp: "Planned by Maharaja Jai Singh II on Vastu Shastra principles, Jaipur is home to the honeycomb Hawa Mahal and the Jantar Mantar astronomical observatory."
      },
      {
        q: "What vast seasonal salt marsh in Gujarat transforms into an expanse of white salt crust during winter, hosting the Rann Utsav festival?",
        correct: "Great Rann of Kutch",
        w1: "Little Rann of Kutch",
        w2: "Sambhar Salt Lake",
        exp: "During the monsoon, the Rann floods with sea and river water, drying in winter into a white salt desert that provides habitat for the Indian wild ass."
      }
    ],
    number: {
      q: "What is the approximate total area in thousands of square kilometers covered by the Thar Desert in India and Pakistan?",
      target: 200,
      unit: "thousand square kilometers",
      imperial: "77,000 square miles",
      exp: "The Thar Desert encompasses approximately 200,000 square kilometers across northwestern India and eastern Pakistan."
    }
  },

  // Cycle 4: Western & Eastern Ghats & The Deccan Plateau
  {
    mcqs: [
      {
        q: "What 1,600-kilometer mountain range parallel to India western coast is one of the world eight hottest biological diversity hotspots?",
        correct: "Western Ghats Sahyadri",
        w1: "Eastern Ghats",
        w2: "Vindhya Range",
        exp: "The Western Ghats block southwest monsoon winds, generating heavy orographic rainfall and sheltering endangered species like the lion-tailed macaque."
      },
      {
        q: "What is the highest mountain peak in southern peninsular India, rising 2,695 meters in the Anaimalai Hills of Kerala?",
        correct: "Anamudi",
        w1: "Doddabetta",
        w2: "Kudremukh",
        exp: "Located inside Eravikulam National Park, Anamudi (Elephant Head) is surrounded by montane shola-grassland ecosystems that bloom with blue Neelakurinji flowers."
      },
      {
        q: "What vast elevated triangular plateau covering most of southern central India was formed by colossal Cretaceous flood basalt lava flows 66 million years ago?",
        correct: "Deccan Plateau Deccan Traps",
        w1: "Malwa Plateau",
        w2: "Chota Nagpur Plateau",
        exp: "The Deccan Traps volcanic eruptions released millions of cubic kilometers of basalt, coinciding with the K-Pg dinosaur mass extinction event."
      },
      {
        q: "Which mountain range in Tamil Nadu, meaning Blue Mountains, is famous for colonial hill stations like Ooty and the Nilgiri Mountain Railway?",
        correct: "Nilgiri Mountains",
        w1: "Palani Hills",
        w2: "Cardamom Hills",
        exp: "The Nilgiri Biosphere Reserve was the first biosphere reserve established in India in 1986, where the Western and Eastern Ghats converge."
      },
      {
        q: "What spectacular four-tiered segmented waterfall on the Sharavathi River in Karnataka plunges 253 meters in a single cataract?",
        correct: "Jog Falls Gerosoppa",
        w1: "Dudhsagar Falls",
        w2: "Athirappilly Falls",
        exp: "Jog Falls consists of four distinct plunges named Raja, Roarer, Rocket, and Rani, harnessing immense hydroelectric power at the Mahatma Gandhi power station."
      }
    ],
    number: {
      q: "What is the summit elevation in meters of Anamudi, the highest peak in South India?",
      target: 2695,
      unit: "meters",
      imperial: "8,842 feet",
      exp: "Anamudi in Idukki district, Kerala, stands at 2,695 meters, making it the highest elevation in peninsular India."
    }
  },

  // Cycle 5: Coastal Peninsulas, Backwaters & The Malabar Coast
  {
    mcqs: [
      {
        q: "What intricate 900-kilometer network of interconnected brackish lagoons, lakes, and canals runs parallel to the Arabian Sea coast in Kerala?",
        correct: "Kerala Backwaters",
        w1: "Chilika Lagoon",
        w2: "Pulicat Lake",
        exp: "Traditional thatched rice barges (kettuvallam) have been converted into eco-friendly houseboats navigating between Alappuzha, Kumarakom, and Kollam."
      },
      {
        q: "Which coastal region in southwestern India was the historic center of the global spice trade where Portuguese navigator Vasco da Gama landed in 1498?",
        correct: "Malabar Coast",
        w1: "Coromandel Coast",
        w2: "Konkan Coast",
        exp: "Vasco da Gama arrived at Kappad near Calicut (Kozhikode), opening direct maritime spice routes for black pepper, cardamom, and cinnamon to Europe."
      },
      {
        q: "What is the southernmost mainland point of the Indian subcontinent in Tamil Nadu, where the Arabian Sea, Bay of Bengal, and Indian Ocean meet?",
        correct: "Kanyakumari Cape Comorin",
        w1: "Indira Point",
        w2: "Dhanushkodi",
        exp: "Kanyakumari is famous for sunrise and sunset over the ocean from the same spot, hosting the Vivekananda Rock Memorial and 41-meter Thiruvalluvar Statue."
      },
      {
        q: "What is the longest natural urban beach in India, stretching for twelve kilometers along the Bay of Bengal coast in Chennai?",
        correct: "Marina Beach",
        w1: "Juhu Beach",
        w2: "Calangute Beach",
        exp: "Marina Beach is lined with iconic colonial administrative buildings, historic promenade statues, and bustling evening seafood stalls."
      },
      {
        q: "Which former Portuguese enclave on the Konkan coast is renowned for sandy palm-fringed beaches, spice plantations, and baroque UNESCO churches in Old Goa?",
        correct: "Goa",
        w1: "Daman",
        w2: "Diu",
        exp: "Ruled by Portugal for 451 years from 1510 until liberated by the Indian Armed Forces in December 1961, Goa blends Latin and Indian cultural traditions."
      }
    ],
    number: {
      q: "In what year did Portuguese explorer Vasco da Gama land at Calicut on the Malabar Coast of India?",
      target: 1498,
      unit: "year",
      imperial: "1498 AD",
      exp: "Vasco da Gama reached the shores of Calicut on May 20, 1498, completing the first sea voyage from Europe to India via the Cape of Good Hope."
    }
  },

  // Cycle 6: The Sundarbans, Brahmaputra & Wettest Places
  {
    mcqs: [
      {
        q: "What is the largest continuous mangrove delta forest in the world, spanning the delta of the Ganges and Brahmaputra rivers in India and Bangladesh?",
        correct: "The Sundarbans",
        w1: "Pichavaram Mangroves",
        w2: "Bhitarkanika",
        exp: "Named after the sundari mangrove tree (Heritiera fomes), the Sundarbans is a UNESCO World Heritage site and sanctuary for swimming Royal Bengal tigers."
      },
      {
        q: "Which village in the East Khasi Hills of Meghalaya holds the world record for the highest average annual rainfall on Earth at nearly 12,000 millimeters?",
        correct: "Mawsynram",
        w1: "Cherrapunji Sohra",
        w2: "Agumbe",
        exp: "Funneled by the Khasi Hills, moisture-laden Bay of Bengal monsoon winds rise rapidly, producing torrential downpours that nourish living root bridges."
      },
      {
        q: "What unique bio-engineering marvels in the subtropical forests of Meghalaya are trained across fast-flowing rivers from the aerial roots of rubber fig trees?",
        correct: "Living Root Bridges Jingkieng Jri",
        w1: "Bamboo Suspension Bridges",
        w2: "Cane Walkways",
        exp: "Indigenous Khasi and Jaintia communities guide Ficus elastica roots through hollowed betel nut trunks over decades to grow living bridges that strengthen over centuries."
      },
      {
        q: "What is the largest river island in the world, located in the Brahmaputra River in the northeastern state of Assam?",
        correct: "Majuli Island",
        w1: "Umananda Island",
        w2: "Srirangam Island",
        exp: "Majuli is the cultural heartland of Neo-Vaishnavite culture established by saint Srimanta Sankardev in the 16th century, famous for its monastic sattras."
      },
      {
        q: "Which transboundary river originates on the Tibetan Plateau as the Yarlung Tsangpo, carving the world deepest canyon before entering Assam?",
        correct: "Brahmaputra River",
        w1: "Indus River",
        w2: "Mekong River",
        exp: "The Brahmaputra flows into the Bay of Bengal, known for massive annual monsoon floods that replenish nutrient-rich soils across the Assam Valley."
      }
    ],
    number: {
      q: "What is the approximate average annual rainfall in millimeters recorded in Mawsynram, Meghalaya, the wettest place on Earth?",
      target: 11872,
      unit: "millimeters",
      imperial: "467.4 inches of rain annually",
      exp: "Mawsynram receives an average of 11,872 millimeters (nearly 12 meters or 39 feet) of rain each year during the summer monsoon."
    }
  },

  // Cycle 7: Major Megacities & Economic Corridors
  {
    mcqs: [
      {
        q: "What is the financial, commercial, and entertainment capital of India, located on Salsette Island on the Arabian Sea coast?",
        correct: "Mumbai Bombay",
        w1: "New Delhi",
        w2: "Kolkata",
        exp: "Mumbai is home to the Bombay Stock Exchange, Reserve Bank of India, Bollywood film industry, and the historic 1924 Gateway of India monument."
      },
      {
        q: "Which planned administrative district in New Delhi, designed by British architect Edwin Lutyens, features Rashtrapati Bhavan and India Gate?",
        correct: "Lutyens Delhi",
        w1: "Old Delhi",
        w2: "Connaught Place",
        exp: "Inaugurated as the imperial capital in 1931, the broad tree-lined avenues of Lutyens' Delhi house India central government ministries and Supreme Court."
      },
      {
        q: "Which major southern metropolis in Karnataka is internationally recognized as the Silicon Valley of India for its leading information technology sector?",
        correct: "Bengaluru Bangalore",
        w1: "Hyderabad",
        w2: "Pune",
        exp: "Bengaluru hosts over thirty-five percent of India two-hundred-billion-dollar IT exports, home to ISRO headquarters and prestigious scientific institutions."
      },
      {
        q: "Which grand colonial capital along the Hooghly River in West Bengal served as the capital of British India until 1911, home to the Victoria Memorial?",
        correct: "Kolkata Calcutta",
        w1: "Chennai",
        w2: "Patna",
        exp: "Kolkata is the cultural and literary capital of India, celebrated for the Howrah cantilever bridge, Nobel laureate Rabindranath Tagore, and Durga Puja."
      },
      {
        q: "Which southern coastal metropolis in Tamil Nadu is known as the Detroit of India for producing more than one-third of India automobile manufacturing?",
        correct: "Chennai Madras",
        w1: "Coimbatore",
        w2: "Madurai",
        exp: "Chennai is a major maritime port and industrial powerhouse, famous for classical Carnatic music, Bharatanatyam dance, and ancient Dravidian temples."
      }
    ],
    number: {
      q: "In what year did British Viceroy Lord Hardinge officially transfer the capital of British India from Calcutta to New Delhi?",
      target: 1911,
      unit: "year",
      imperial: "1911 AD",
      exp: "King George V announced the relocation of the imperial capital to Delhi during the grand Delhi Durbar on December 12, 1911."
    }
  },

  // Cycle 8: Islands & Maritime Territories
  {
    mcqs: [
      {
        q: "Which island in the Andaman Sea is home to the only active volcano in South Asia, which last erupted in recent decades?",
        correct: "Barren Island",
        w1: "Narcondam Island",
        w2: "Havelock Island",
        exp: "Barren Island is a volcanic cinder cone rising from a three-kilometer caldera, surrounded by nutrient-rich waters popular for advanced scuba diving."
      },
      {
        q: "What is the southernmost geographical point of the Republic of India, located at 6 degrees 45 minutes North on Great Nicobar Island?",
        correct: "Indira Point",
        w1: "Kanyakumari",
        w2: "Cape Comorin",
        exp: "Formerly called Pygmalion Point, Indira Point features a lighthouse that was partially submerged during the devastating 2004 Indian Ocean tsunami."
      },
      {
        q: "Which isolated island in the Andaman archipelago is home to an uncontacted indigenous hunter-gatherer tribe that strictly resists all outside contact?",
        correct: "North Sentinel Island",
        w1: "Little Andaman",
        w2: "Car Nicobar",
        exp: "The Sentinelese people have lived on the densely forested 60-square-kilometer island for thousands of years, legally protected by a strict exclusion zone."
      },
      {
        q: "Which Union Territory of India consists of an archipelago of thirty-six tropical coral atolls and sandbanks in the Arabian Sea off the coast of Kerala?",
        correct: "Lakshadweep",
        w1: "Andaman Islands",
        w2: "Nicobar Islands",
        exp: "Covering just thirty-two square kilometers of land, Lakshadweep (meaning 'a hundred thousand islands' in Sanskrit) is famed for pristine coral lagoons."
      },
      {
        q: "What chain of limestone shoals and sandbanks stretching between Rameswaram Island in India and Mannar Island in Sri Lanka is mentioned in the Ramayana epic?",
        correct: "Rama Setu Adam Bridge",
        w1: "Palk Strait Reef",
        w2: "Gulf of Mannar Shoals",
        exp: "Geological studies show Rama Setu was once a passable dry land bridge across the Palk Strait before breaches by a cyclone in 1480 CE."
      }
    ],
    number: {
      q: "At what degree North latitude is Indira Point, the southernmost point of Indian territory on Great Nicobar Island, situated?",
      target: 6,
      unit: "degrees North",
      imperial: "6°45'N latitude",
      exp: "Indira Point sits at 6 degrees 45 minutes North latitude, just 150 kilometers north of Sumatra, Indonesia."
    }
  },

  // Cycle 9: Indian Wildlife Sanctuaries & Megafauna
  {
    mcqs: [
      {
        q: "Which iconic national park in Assam hosts two-thirds of the world entire population of the endangered Great Indian One-Horned Rhinoceros?",
        correct: "Kaziranga National Park",
        w1: "Manas National Park",
        w2: "Jim Corbett National Park",
        exp: "Kaziranga fertile Brahmaputra alluvial grasslands also support high densities of Royal Bengal tigers, wild water buffalo, and Asian elephants."
      },
      {
        q: "What is the only natural wild habitat in the world for the endangered Asiatic Lion (Panthera leo persica), located in Gujarat?",
        correct: "Gir National Park",
        w1: "Ranthambore National Park",
        w2: "Bandhavgarh National Park",
        exp: "Protected by the Nawab of Junagadh when fewer than twenty survived in 1900, the Gir population has recovered to over seven hundred wild lions."
      },
      {
        q: "What was the very first national park established in India in 1936, located in Uttarakhand to protect endangered Bengal tigers?",
        correct: "Jim Corbett National Park",
        w1: "Kanha National Park",
        w2: "Sundarbans National Park",
        exp: "Originally named Hailey National Park, it was renamed in 1956 in honor of legendary hunter-turned-conservationist Jim Corbett."
      },
      {
        q: "What pioneering conservation initiative was launched by Prime Minister Indira Gandhi in 1973 to save Bengal tigers from imminent extinction?",
        correct: "Project Tiger",
        w1: "Project Elephant",
        w2: "Project Rhino",
        exp: "Project Tiger created dedicated tiger reserves across India, helping India wild tiger population grow to over 3,600 (seventy-five percent of the global wild total)."
      },
      {
        q: "Which national park in Madhya Pradesh inspired the Indian jungle landscapes in Rudyard Kipling classic collection The Jungle Book?",
        correct: "Kanha National Park",
        w1: "Pench National Park",
        w2: "Panna National Park",
        exp: "Kanha is renowned for saving the hardground swamp deer (barasingha) from extinction, featuring vast sal forests and open grassland meadows."
      }
    ],
    number: {
      q: "In what year was India landmark national tiger conservation program, Project Tiger, officially launched at Corbett National Park?",
      target: 1973,
      unit: "year",
      imperial: "1973 AD",
      exp: "Project Tiger was officially launched on April 1, 1973, establishing nine initial protected tiger reserves across India."
    }
  },

  // Cycle 10: Extent, States & Indian Superlatives
  {
    mcqs: [
      {
        q: "Into how many States and Union Territories is the Republic of India administratively divided today?",
        correct: "28 States and 8 Union Territories",
        w1: "29 States and 7 Union Territories",
        w2: "25 States and 9 Union Territories",
        exp: "India states are organized primarily on linguistic lines, complemented by eight federally administered Union Territories including Delhi (NCT)."
      },
      {
        q: "What is the longest international land border shared between India and any neighboring country, stretching for 4,096 kilometers?",
        correct: "India-Bangladesh Border",
        w1: "India-China Line of Actual Control",
        w2: "India-Pakistan Border",
        exp: "The border is the fifth longest land border in the world, passing through rivers, agricultural fields, hills, and the Sundarbans mangroves."
      },
      {
        q: "What is the largest state in the Republic of India by total geographical land area, covering over 342,000 square kilometers in the northwest?",
        correct: "Rajasthan",
        w1: "Madhya Pradesh",
        w2: "Maharashtra",
        exp: "Rajasthan covers 10.4 percent of India total area, characterized by the Thar Desert, Aravalli Mountains, and rich royal heritage."
      },
      {
        q: "What is the most populous state in India, home to over 240 million residents (which would rank as the world fifth most populous nation if independent)?",
        correct: "Uttar Pradesh",
        w1: "Maharashtra",
        w2: "Bihar",
        exp: "Located in the fertile heart of the Ganges river plain, Uttar Pradesh capital is Lucknow, containing historic cultural centers like Agra and Varanasi."
      },
      {
        q: "What is the smallest state in India by geographical land area, covering just 3,702 square kilometers along the Arabian Sea?",
        correct: "Goa",
        w1: "Sikkim",
        w2: "Tripura",
        exp: "Goa has the highest GDP per capita among all Indian states, renowned for its tourism, mining, iron ore exports, and Konkani culture."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the international land border between India and Bangladesh?",
      target: 4096,
      unit: "kilometers",
      imperial: "2,545 miles",
      exp: "The India-Bangladesh land frontier measures 4,096 kilometers, making it India longest international border."
    }
  }
];

// Build India Quiz
buildQuiz({
  id: 'india-geography-heritage-60',
  theme: 'India: Geography, Sacred Rivers & Biodiversity Heritage',
  title: 'India: Geography, Sacred Rivers & Biodiversity Heritage',
  description: 'A 60-question grand master assessment exploring the Himalayas & Kangchenjunga, the Ganges & Yamuna, the Thar Desert, Western Ghats, Kerala Backwaters, the Sundarbans, megacities, wildlife sanctuaries, and 28 states.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, indiaCycles);

console.log('India quiz built successfully!');
