const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 2. peru-geography-heritage-60
// =========================================================================
const peruCycles = [
  // Cycle 1: Machu Picchu & Sacred Valley of the Incas
  {
    mcqs: [
      {
        q: "What iconic 15th-century Inca citadel estate perches on a 2,430-meter mountain ridge above the Urubamba River valley in the Cusco region?",
        correct: "Machu Picchu",
        w1: "Choquequirao",
        w2: "Ollantaytambo",
        exp: "Built under Emperor Pachacuti around 1450 CE using ashlar polished dry-stone walls, Machu Picchu is one of the New 7 Wonders of the World."
      },
      {
        q: "In what year did American explorer Hiram Bingham bring international scientific attention to the overgrown ruins of Machu Picchu?",
        correct: "1911",
        w1: "1898",
        w2: "1924",
        exp: "Guided by local Quechua farmer Melchor Arteaga, Bingham photographed and cleared the ruins on a Yale University expedition on July 24, 1911."
      },
      {
        q: "What prominent mountain peak towers directly behind the ruins of Machu Picchu, offering aerial views of the Inca citadel?",
        correct: "Huayna Picchu Wayna Picchu",
        w1: "Mount Salkantay",
        w2: "Mount Veronica",
        exp: "Huayna Picchu (Young Peak) features steep Inca stairs and the Temple of the Moon carved into a natural granite cave."
      },
      {
        q: "What sacred carved granite stone at the highest point of Machu Picchu is known as the Hitching Post of the Sun?",
        correct: "Intihuatana",
        w1: "Torreón",
        w2: "Temple of the Three Windows",
        exp: "Inca astronomers used the Intihuatana as an astronomical clock and solar calendar to predict the exact moment of the winter solstice (Inti Raymi)."
      },
      {
        q: "Which fortress town in the Sacred Valley of the Incas is considered the only remaining living Inca town, maintaining its original urban grid plan?",
        correct: "Ollantaytambo",
        w1: "Pisac",
        w2: "Chinchero",
        exp: "Ollantaytambo was the royal estate of Emperor Pachacuti and site of Manco Inca historic victory over Spanish forces in 1537."
      }
    ],
    number: {
      q: "In what year did Hiram Bingham bring Machu Picchu to global attention during his Yale archaeological expedition?",
      target: 1911,
      unit: "year",
      imperial: "1911 AD",
      exp: "Hiram Bingham reached Machu Picchu on July 24, 1911, publishing his findings in a landmark 1913 National Geographic issue."
    }
  },

  // Cycle 2: Lake Titicaca & The Uros Reed Islands
  {
    mcqs: [
      {
        q: "What massive 8,372-square-kilometer lake on the border of Peru and Bolivia is the highest commercially navigable lake in the world at 3,812 meters elevation?",
        correct: "Lake Titicaca Lago Titicaca",
        w1: "Lake Junín",
        w2: "Lake Poopó",
        exp: "In Inca mythology, the creator god Viracocha arose from Lake Titicaca and brought forth the sun, moon, and the first Inca ancestors (Manco Cápac and Mama Ocllo)."
      },
      {
        q: "What unique indigenous floating islands in Lake Titicaca are hand-crafted from dense woven layers of native totora reeds?",
        correct: "The Uros Floating Islands",
        w1: "Taquile Islands",
        w2: "Amantaní Islands",
        exp: "The pre-Incan Uros people originally built the floating reed islands as a defensive retreat to escape aggressive Inca and Colla expansions."
      },
      {
        q: "Which island in Lake Titicaca is world-famous for its traditional male textile handweaving culture, inscribed on the UNESCO Intangible Cultural Heritage list?",
        correct: "Taquile Island",
        w1: "Amantaní Island",
        w2: "Suasi Island",
        exp: "On Taquile, men learn to knit intricate woolen chullo hats and calendar waistbands from childhood, with hat colors indicating their marital and social status."
      },
      {
        q: "Which city on the shores of Lake Titicaca is renowned as the Folkloric Capital of Peru, famous for the colossal festival of the Virgen de la Candelaria?",
        correct: "Puno",
        w1: "Juliaca",
        w2: "Arequipa",
        exp: "Held every February, the festival features 40,000 costumed dancers performing the dramatic Diablada (Dance of the Devils) alongside thousands of brass musicians."
      },
      {
        q: "What unique, giant flightless grebe bird species, endemic exclusively to Lake Titicaca, dives deep to hunt native killifish (killi)?",
        correct: "Titicaca Flightless Grebe Rollandia microptera",
        w1: "Andean Goose",
        w2: "Puna Ibis",
        exp: "Having lost the ability to fly due to lack of natural island predators, the grebe uses strong webbed feet to swim through thick submerged macrophyte beds."
      }
    ],
    number: {
      q: "What is the surface elevation in meters above sea level of Lake Titicaca, the highest navigable lake on Earth?",
      target: 3812,
      unit: "meters",
      imperial: "12,507 feet above sea level",
      exp: "Lake Titicaca sits at an official mean surface elevation of 3,812 meters above sea level in the high Andean Altiplano."
    }
  },

  // Cycle 3: The Nazca Lines & Coastal Desert
  {
    mcqs: [
      {
        q: "What enigmatic collection of over three hundred colossal geometric figures and zoomorphic geoglyphs was scratched into the arid desert plateau of southern Peru between 500 BCE and 500 CE?",
        correct: "The Nazca Lines Líneas de Nazca",
        w1: "The Paracas Candelabra",
        w2: "The Sajama Lines",
        exp: "Created by the Nazca culture by removing reddish iron-oxide pebbles to expose white gypsum subsoil, they include figures like the Hummingbird, Spider, Monkey, and Condor."
      },
      {
        q: "Which German-born mathematician and archaeologist dedicated over fifty years of her life to measuring, protecting, and interpreting the Nazca Lines?",
        correct: "Maria Reiche",
        w1: "Toribio Mejía Xesspe",
        w2: "Paul Kosok",
        exp: "Known locally as the Lady of the Lines, Reiche proposed that the geoglyphs served as a giant astronomical calendar and celestial observatory."
      },
      {
        q: "What giant 180-meter-tall prehistoric geoglyph is carved into the ocean-facing sand cliff on the Paracas Peninsula, visible twelve miles out to sea?",
        correct: "The Paracas Candelabra El Candelabro",
        w1: "The Nazca Astronaut",
        w2: "The Chauchilla Icon",
        exp: "Dated to roughly 200 BCE, the trident-shaped carving is linked to the Paracas culture and served as a navigational beacon for ancient coastal sailors."
      },
      {
        q: "Which picturesque natural desert oasis lagoon surrounded by colossal 100-meter sand dunes in Ica is a world hub for sandboarding and dune buggy tours?",
        correct: "Huacachina",
        w1: "La Huaca",
        w2: "Chilca",
        exp: "Built around a natural palm-fringed emerald oasis pool, local legend claims the lagoon was formed from the tears of a mourning Incan maiden."
      },
      {
        q: "Which coastal desert in Peru and Chile, bounded by the Andes and the cold Pacific Humboldt Current, is one of the driest non-polar deserts on Earth?",
        correct: "Sechura Desert Peruvian Coastal Desert",
        w1: "Monte Desert",
        w2: "Patagonian Desert",
        exp: "The rain shadow of the Andes combined with cold upwelling oceanic water prevents rainfall, creating dense winter coastal sea fogs known as garúa."
      }
    ],
    number: {
      q: "Approximately how many distinct major animal, plant, and humanoid geoglyphs are depicted across the desert floor of the Nazca Lines in Peru?",
      target: 70,
      unit: "biomorphic figures",
      imperial: "70 zoomorphic geoglyphs",
      exp: "Along with over 10,000 geometric lines and trapezoids, the Nazca plateau features approximately seventy distinct plant, animal, and humanoid figures."
    }
  },

  // Cycle 4: Colca Canyon & Andean Canyons
  {
    mcqs: [
      {
        q: "What colossal river canyon in southern Peru reaches depths of 3,270 meters, more than double the depth of the Grand Canyon in the United States?",
        correct: "Colca Canyon Cañón del Colca",
        w1: "Cotahuasi Canyon",
        w2: "Apurímac Canyon",
        exp: "Carved by the Colca River through the volcanic Andes, the canyon is famous for pre-Incan agricultural terraces and thermal springs."
      },
      {
        q: "What famous natural cliff viewpoint in the Colca Canyon is internationally celebrated for morning sightings of massive Andean Condors soaring on thermal updrafts?",
        correct: "Cruz del Cóndor Cross of the Condor",
        w1: "Mirador de Tapay",
        w2: "Mirador de Antahuilque",
        exp: "Visitors gather at dawn to watch condors with three-meter wingspans rise effortlessly from canyon nesting ledges on warm rising air currents."
      },
      {
        q: "What is the massive wingspan in meters of the Andean Condor (Vultur gryphus), the heaviest flying bird of prey in the world?",
        correct: "Over 3 Meters",
        w1: "1.5 Meters",
        w2: "2 Meters",
        exp: "Weighing up to fifteen kilograms with a wingspan reaching 3.3 meters, the Andean Condor was venerated in Inca cosmology as the messenger of the upper celestial world (Hanan Pacha)."
      },
      {
        q: "Which remote canyon in Arequipa, plunging to a depth of 3,354 meters, rivals Colca as one of the deepest river canyons on the planet Earth?",
        correct: "Cotahuasi Canyon",
        w1: "Marañón Canyon",
        w2: "Urubamba Canyon",
        exp: "Formed by the Cotahuasi River between the Coropuna (6,425 m) and Solimana volcanoes, it features the 150-meter Sipia waterfall."
      },
      {
        q: "What volcanic white city is the second most populous metropolitan area in Peru, built almost entirely from white volcanic ignimbrite stone called sillar?",
        correct: "Arequipa",
        w1: "Cusco",
        w2: "Trujillo",
        exp: "Framed by the symmetrical cone of the 5,822-meter El Misti volcano, Arequipa UNESCO historic center houses the sprawling Santa Catalina Monastery citadel."
      }
    ],
    number: {
      q: "What is the maximum depth in meters of the Colca Canyon in southern Peru?",
      target: 3270,
      unit: "meters deep",
      imperial: "10,728 feet deep (twice as deep as the Grand Canyon)",
      exp: "Colca Canyon reaches a maximum depth of approximately 3,270 meters from the surrounding mountain rims to the Colca River bed."
    }
  },

  // Cycle 5: High Andes: Huascarán & Cordillera Blanca
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Peru and the highest peak in the entire global Tropics, rising 6,768 meters in the Cordillera Blanca?",
        correct: "Mount Huascarán Nevado Huascarán",
        w1: "Yerupajá",
        w2: "Alpamayo",
        exp: "Huascarán is a twin-peaked mountain (Huascarán Sur at 6,768 m and Huascarán Norte at 6,655 m), protected inside the UNESCO-inscribed Huascarán National Park."
      },
      {
        q: "What 200-kilometer mountain range in Ancash is the highest and most extensively glaciated tropical mountain range in the world, containing over seven hundred glaciers?",
        correct: "Cordillera Blanca White Range",
        w1: "Cordillera Huayhuash",
        w2: "Cordillera Vilcanota",
        exp: "The Cordillera Blanca features sixteen peaks exceeding 6,000 meters, separating the Callejón de Huaylas from the Marañón river basin."
      },
      {
        q: "Which pyramid-shaped ice mountain in the Cordillera Blanca was voted the Most Beautiful Mountain in the World in a 1966 international scenic survey in Munich?",
        correct: "Alpamayo Nevado Alpamayo",
        w1: "Artesonraju",
        w2: "Chacraraju",
        exp: "Rising 5,947 meters, Alpamayo southwest face features a fifty-degree fluted ice wall of exceptional aesthetic geometric symmetry."
      },
      {
        q: "What famous turquoise-blue alpine glacial lake at 4,600 meters in Huascarán National Park is flanked by the towering ice walls of Chacraraju and Huascarán?",
        correct: "Laguna 69",
        w1: "Laguna Parón",
        w2: "Laguna Llanganuco",
        exp: "Fed by glacial waterfalls cascading directly off Chacraraju, Laguna 69 is one of the most popular high-altitude day treks in the Peruvian Andes."
      },
      {
        q: "What is the second highest mountain peak in Peru, rising 6,635 meters in the rugged Cordillera Huayhuash, famous for extreme mountaineering epics?",
        correct: "Yerupajá",
        w1: "Siula Grande",
        w2: "Coropuna",
        exp: "Nearby Siula Grande was the site of the miraculous survival story of Joe Simpson and Simon Yates, chronicled in the book and film Touching the Void."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Mount Huascarán (Nevado Huascarán Sur), the highest mountain in Peru?",
      target: 6768,
      unit: "meters",
      imperial: "22,205 feet",
      exp: "Nevado Huascarán Sur stands at an official elevation of 6,768 meters in the Department of Ancash."
    }
  },

  // Cycle 6: Cusco & Inca Megalithic Masonry
  {
    mcqs: [
      {
        q: "Which historic Andean city at 3,400 meters elevation was the imperial capital and navel of the Inca Empire (Tawantinsuyu)?",
        correct: "Cusco Cuzco",
        w1: "Cajamarca",
        w2: "Huánuco",
        exp: "Inca Cusco was laid out in the shape of a sacred puma, with the fortress of Sacsayhuamán forming the head and the Coricancha temple at the center."
      },
      {
        q: "What massive citadel complex above Cusco features three tiered zigzag megalithic limestone walls fitted together so tightly without mortar that a sheet of paper cannot fit between stones?",
        correct: "Sacsayhuamán",
        w1: "Qenqo",
        w2: "Puka Pukara",
        exp: "The largest limestone block at Sacsayhuamán weighs an estimated 128 tons, dragged from quarries miles away using ropes, rollers, and human manpower."
      },
      {
        q: "What was the most sacred temple in the Inca Empire, dedicated to the Sun God Inti, whose walls were originally covered in solid sheets of pure gold?",
        correct: "Coricancha Qorikancha",
        w1: "Acllahuasi",
        w2: "Tambomachay",
        exp: "Following the conquest, Spanish conquistadors stripped hundreds of pounds of gold plates and erected the Church and Convent of Santo Domingo atop its polished stone foundations."
      },
      {
        q: "What famous carved green diorite stone in the exterior wall of the Archbishop Palace in Cusco features twelve perfectly interlocking carved angles?",
        correct: "Twelve-Angled Stone Piedra de los Doce Ángulos",
        w1: "Intihuatana Stone",
        w2: "Sayhuite Monolith",
        exp: "The twelve-angled stone is an iconic masterpiece of Inca masonry, fitting seamlessly into neighboring blocks without any adhesive or mortar."
      },
      {
        q: "What world-famous 42-kilometer high-altitude stone trail connects the Sacred Valley with the Sun Gate (Inti Punku) overlooking Machu Picchu?",
        correct: "The Classic Inca Trail Camino Inca",
        w1: "Salkantay Trek",
        w2: "Lares Trek",
        exp: "The trail crosses the 4,215-meter Dead Woman Pass (Warmiwañusqa), traversing cloud forests and Inca ruins like Runkurakay, Sayacmarca, and Wiñay Wayna."
      }
    ],
    number: {
      q: "What is the estimated weight in tons of the single largest megalithic limestone block fitted into the lower wall of Sacsayhuamán in Cusco?",
      target: 128,
      unit: "tons",
      imperial: "128 tons (over 280,000 pounds)",
      exp: "The largest stone block in the zigzag defensive perimeter of Sacsayhuamán measures over eight meters in height and weighs approximately 128 tons."
    }
  },

  // Cycle 7: The Peruvian Amazon & Rainforests
  {
    mcqs: [
      {
        q: "Which two major Andean rivers in Peru converge near Nauta to form the main stem of the colossal Amazon River?",
        correct: "Marañón and Ucayali Rivers",
        w1: "Huallaga and Urubamba",
        w2: "Madre de Dios and Tambopata",
        exp: "The Amazon River begins its 6,400-kilometer journey to the Atlantic Ocean in Peru, holding roughly twenty percent of the world river freshwater discharge."
      },
      {
        q: "What is the largest city in the world that cannot be reached by road, accessible only by riverboat or airplane along the Amazon River in Loreto?",
        correct: "Iquitos",
        w1: "Pucallpa",
        w2: "Puerto Maldonado",
        exp: "Iquitos boomed during the 19th-century Amazon Rubber Boom, home to the Iron House (Casa de Fierro) designed by Gustave Eiffel and the floating district of Belén."
      },
      {
        q: "What massive 17,000-square-kilometer UNESCO Biosphere Reserve in Madre de Dios and Cusco preserves the highest biodiversity of any national park on Earth?",
        correct: "Manú National Park Parque Nacional del Manu",
        w1: "Tambopata National Reserve",
        w2: "Bahuaja-Sonene",
        exp: "Spanning from 4,000-meter Andean grasslands down to lowland Amazon rainforests, Manú harbors over 1,000 bird species and 15,000 plant species."
      },
      {
        q: "What natural mineral clay lick cliffs (colpas) along the Tambopata River attract hundreds of colorful macaws and parrots daily to neutralize dietary plant toxins?",
        correct: "Macaw Clay Licks Colpa Colorado",
        w1: "Sandovall Clay Lick",
        w2: "Heath Clay Lick",
        exp: "Flocks of Scarlet, Red-and-Green, and Blue-and-Gold macaws congregate at sunrise to ingest mineral sodium and clay that binds to alkaloids in unripe rainforest seeds."
      },
      {
        q: "What is the national bird of Peru, a vibrant Andean cotinga species where males display bright crimson-orange plumage, a bulbous crest, and lek courtship dances?",
        correct: "Andean Cock-of-the-Rock Tunqui",
        w1: "Hoatzin",
        w2: "Harpy Eagle",
        exp: "Rupicola peruvianus nests in secluded rocky ravines and misty cloud forests (ceja de selva) between 500 and 2,400 meters altitude."
      }
    ],
    number: {
      q: "What is the approximate total area in thousands of square kilometers of the UNESCO World Heritage Manú National Park in the Peruvian Amazon?",
      target: 17,
      unit: "thousand square kilometers",
      imperial: "6,600 square miles",
      exp: "Manú National Park covers approximately 17,163 square kilometers (rounded to 17k sq km), protecting an entire pristine river basin."
    }
  },

  // Cycle 8: Rainbow Mountain & Geological Wonders
  {
    mcqs: [
      {
        q: "What 5,200-meter mountain in the Vilcanota Range of Cusco, known in Quechua as Vinicunca, is internationally famous for its natural turquoise, gold, and magenta mineral stripes?",
        correct: "Rainbow Mountain Montaña de Siete Colores",
        w1: "Palccoyo Mountain",
        w2: "Ausangate",
        exp: "Uncovered by melting snowpacks around 2015, the vibrant stripes were formed over millions of years by weathering of iron oxides, copper, sulfur, and phyllite clays."
      },
      {
        q: "What is the highest mountain peak in the Cusco region, a sacred 6,384-meter glaciated peak revered in Andean cosmovision as the most powerful Apus (mountain spirit deity)?",
        correct: "Mount Ausangate",
        w1: "Salkantay",
        w2: "Veronica",
        exp: "Every year, tens of thousands of indigenous Quechua pilgrims trek to the foot of Ausangate for the ancient syncretic Qoyllur Rit'i (Snow Star) festival."
      },
      {
        q: "What stunning emerald-turquoise glacial lake at 4,200 meters sits at the foot of Mount Humantay and Salkantay, a sacred site for Pachamama offerings?",
        correct: "Humantay Lake Laguna Humantay",
        w1: "Laguna Sibinacocha",
        w2: "Laguna Huacarpay",
        exp: "Visitors hike up from Soraypampa, placing stone cairns (apachetas) along the trail to thank Mother Earth (Pachamama) and the mountain spirits."
      },
      {
        q: "What ancient terraced salt extraction pans near Maras in the Sacred Valley have been harvested since pre-Inca times by evaporating subterranean hyper-saline spring water?",
        correct: "Maras Salt Mines Salineras de Maras",
        w1: "Salinas Grandes",
        w2: "Moray Terraces",
        exp: "Over 3,000 terraced salt pans cascade down the canyon slopes of Mount Qaqawiñay, owned and hand-harvested communally by local families."
      },
      {
        q: "What extraordinary Inca archaeological site near Maras consists of four massive concentric circular agricultural depression terraces with microclimate temperature differences of up to 15°C?",
        correct: "Moray",
        w1: "Tipón",
        w2: "Pikillacta",
        exp: "Moray served as an Inca agricultural research laboratory, where scientists acclimatized wild high-altitude and lowland crops, including domesticating dozens of potato and corn varieties."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Vinicunca (Rainbow Mountain) in the Cusco Andes?",
      target: 5200,
      unit: "meters",
      imperial: "17,060 feet",
      exp: "The viewpoint ridge of Vinicunca (Rainbow Mountain) sits at an altitude of approximately 5,200 meters above sea level."
    }
  },

  // Cycle 9: Peruvian Agriculture, Superfoods & Gastronomy
  {
    mcqs: [
      {
        q: "How many native varieties of edible potatoes (papa nativa), ranging in colors from purple and red to black and gold, are indigenous to the high Andes of Peru?",
        correct: "Over 4,000 Varieties",
        w1: "500 Varieties",
        w2: "1,500 Varieties",
        exp: "First domesticated around Lake Titicaca 8,000 years ago, Peru is the genetic cradle of the world potato, preserved at the International Potato Center (CIP) in Lima."
      },
      {
        q: "What world-famous national dish and cultural heritage of Peru consists of fresh raw fish cured in freshly squeezed lime juice, spiced with ají peppers, red onion, and served with sweet potato and choclo corn?",
        correct: "Ceviche Cebiche",
        w1: "Tiradito",
        w2: "Causa Rellena",
        exp: "In 2023, UNESCO inscribed the traditional preparation and consumption of Peruvian Ceviche on the Representative List of the Intangible Cultural Heritage of Humanity."
      },
      {
        q: "What clear grape brandy produced in the coastal valleys of Peru since the 16th century is the key ingredient in Peru national cocktail, the Pisco Sour?",
        correct: "Pisco",
        w1: "Singani",
        w2: "Cachaça",
        exp: "Invented in Lima in the 1920s by American bartender Victor Morris, the Pisco Sour blends pisco, fresh lime juice, simple syrup, egg whites, and Angostura bitters."
      },
      {
        q: "What sacred Andean ancient grain, known scientifically as Chenopodium quinoa, was revered by the Incas as the Mother Grain (Chisaya Mama)?",
        correct: "Quinoa Quinua",
        w1: "Kiwicha Amaranth",
        w2: "Kaniwa",
        exp: "Quinoa is a complete protein containing all nine essential amino acids, grown in the high Altiplano where harsh frost and drought prevent other crops from growing."
      },
      {
        q: "What traditional Andean communal culinary feast involves burying marinated guinea pig (cuy), alpaca, potatoes, fava beans, and sweet corn under red-hot river stones in an earthen pit?",
        correct: "Pachamanca",
        w1: "Huatia",
        w2: "Seco de Cabrito",
        exp: "Covered with wild chincho herbs and banana leaves, Pachamanca (Earth Pot in Quechua) is prepared for harvest celebrations honoring the earth."
      }
    ],
    number: {
      q: "Approximately how many native cultivated varieties of potatoes (papa) originated in the Peruvian Andes?",
      target: 4000,
      unit: "potato varieties",
      imperial: "4,000+ native potato varieties",
      exp: "Peru is the biodiversity cradle of the potato, cultivating more than 4,000 distinct varieties adapted to diverse Andean altitudes and microclimates."
    }
  },

  // Cycle 10: Extent, 25 Regions & Peruvian Superlatives
  {
    mcqs: [
      {
        q: "What ancient sacred city in the Supe Valley, dating back to 3000 BCE, is recognized by UNESCO as the oldest verified urban civilization in the Americas?",
        correct: "Sacred City of Caral-Supe",
        w1: "Chavín de Huántar",
        w2: "Chan Chan",
        exp: "Contemporary with the Pyramids of Egypt, Caral developed monumental stone pyramid platforms, sunken circular plazas, and quipu record-keeping without warfare."
      },
      {
        q: "Into what three distinct traditional geographical natural regions (geographic regions) is Peru divided from west to east?",
        correct: "Costa, Sierra and Selva",
        w1: "Pampa, Puna and Montaña",
        w2: "Litoral, Altiplano and Hylea",
        exp: "Peru spans the arid Pacific coastline (Costa), the glaciated Andean mountain highlands (Sierra), and the vast Amazonian rainforest basin (Selva)."
      },
      {
        q: "What is the largest adobe mudbrick ancient city in the Americas and capital of the Chimú Empire, covering twenty square kilometers near modern Trujillo?",
        correct: "Chan Chan",
        w1: "Huacas del Sol y de la Luna",
        w2: "Pachacamac",
        exp: "Built around 850 CE, Chan Chan housed an estimated 60,000 people inside nine walled royal palatial compounds adorned with carved geometric friezes of fish and pelicans."
      },
      {
        q: "What is the capital and largest metropolitan city of Peru, founded in 1535 by Spanish conquistador Francisco Pizarro as the City of Kings (Ciudad de los Reyes)?",
        correct: "Lima",
        w1: "Arequipa",
        w2: "Trujillo",
        exp: "Home to over ten million residents along the Pacific coast, Lima was the seat of the Spanish Viceroyalty of Peru, today renowned as the Gastronomic Capital of the Americas."
      },
      {
        q: "What cold, nutrient-rich oceanic current flowing northward along the coast of Peru supports one of the world most productive marine ecosystems and anchoveta fisheries?",
        correct: "The Humboldt Current Peru Current",
        w1: "The El Niño Current",
        w2: "The South Equatorial Current",
        exp: "Strong wind-driven upwelling brings deep Antarctic nutrients to the sunlit surface, feeding immense populations of anchoveta, sardines, sea lions, and guano seabirds."
      }
    ],
    number: {
      q: "Approximately how many years BCE was the monumental Sacred City of Caral-Supe, the oldest civilization in the Americas, first established in Peru?",
      target: 3000,
      unit: "BCE",
      imperial: "3000 BC (5,000 years ago)",
      exp: "Radiocarbon dating confirms Caral-Supe was constructed around 3000 BCE, thriving as the oldest urban center in the Western Hemisphere."
    }
  }
];

// Build Peru Quiz
buildQuiz({
  id: 'peru-geography-heritage-60',
  theme: 'Peru: Geography, The Incas & The Amazon Headwaters',
  title: 'Peru: Geography, The Incas & The Amazon Headwaters',
  description: 'A 60-question grand master assessment exploring Machu Picchu (1911), Lake Titicaca & Uros reed islands (3,812 m), the Nazca Lines, Colca Canyon (3,270 m), Mount Huascarán (6,768 m), Cusco megaliths, the Peruvian Amazon, Vinicunca, and 4,000 potato varieties.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, peruCycles);

console.log('Peru quiz built successfully!');
