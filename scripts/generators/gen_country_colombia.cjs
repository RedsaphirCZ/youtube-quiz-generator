const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 5. colombia-geography-heritage-60
// =========================================================================
const colombiaCycles = [
  // Cycle 1: Two Oceans & The Three Andean Cordilleras
  {
    mcqs: [
      {
        q: "What distinct geographical feature makes Colombia unique among all sovereign nations in South America?",
        correct: "Only nation with coastlines on both the Pacific Ocean and Caribbean Sea",
        w1: "Only nation with no deserts",
        w2: "Only nation crossed by four mountain ranges",
        exp: "Colombia possesses 1,760 kilometers of Caribbean coastline and 1,448 kilometers of Pacific coastline, flanking the Isthmus of Panama."
      },
      {
        q: "Into how many distinct parallel mountain ranges (Cordillera Occidental, Central, and Oriental) does the Andes split upon entering Colombia from the south?",
        correct: "3 Parallel Cordilleras",
        w1: "2 Cordilleras",
        w2: "4 Cordilleras",
        exp: "Divided by the deep fertile river valleys of the Magdalena and Cauca rivers, the triple Andean cordillera shapes Colombia diverse regional cultures and climates."
      },
      {
        q: "What is the primary commercial and historical river artery of Colombia, flowing 1,528 kilometers northward between the Central and Eastern cordilleras to the Caribbean at Barranquilla?",
        correct: "Magdalena River Río Magdalena",
        w1: "Cauca River",
        w2: "Atrato River",
        exp: "Steamboats navigated the Magdalena for centuries to transport coffee, gold, and passengers from the Andean interior to Caribbean seaports."
      },
      {
        q: "Which highly active glaciated stratovolcano in the Cordillera Central erupted in November 1985, triggering a catastrophic volcanic mudflow (lahar) that destroyed the town of Armero?",
        correct: "Nevado del Ruiz",
        w1: "Nevado del Huila",
        w2: "Galeras",
        exp: "Rising 5,321 meters, the eruption melted ten percent of the summit glacier cap, causing the deadliest volcanic disaster in South American history."
      },
      {
        q: "What striking 330-square-kilometer semi-arid tropical dry forest and badland canyon in Huila Department features sculpted red and grey clay labyrinths (Cuzco and Los Hoyos)?",
        correct: "Tatacoa Desert Desierto de la Tatacoa",
        w1: "La Guajira Desert",
        w2: "Candelaria Desert",
        exp: "Tatacoa is an internationally certified Starlight astronomical reserve, rich in Miocene fossils of giant ground sloths, turtles, and prehistoric crocodilians."
      }
    ],
    number: {
      q: "How many distinct parallel mountain ranges (Cordilleras) form the Andean system across Colombia?",
      target: 3,
      unit: "cordilleras",
      imperial: "3 Andean mountain ranges (Occidental, Central, Oriental)",
      exp: "The Andes mountain chain branches into three separate cordilleras in Colombia: the Western, Central, and Eastern ranges."
    }
  },

  // Cycle 2: Bogotá & The Andean Highlands
  {
    mcqs: [
      {
        q: "What is the capital of Colombia, situated on a high-altitude Andean savanna plateau at 2,640 meters elevation, the third highest capital city in South America?",
        correct: "Bogotá",
        w1: "Medellín",
        w2: "Cali",
        exp: "Founded in 1538 by Gonzalo Jiménez de Quesada as Santa Fe de Bogotá, the metropolis is home to eight million residents, vibrant ciclovía cycling, and Monserrate mountain."
      },
      {
        q: "What world-famous museum in the historic center of Bogotá houses the largest collection of pre-Hispanic gold artifacts in the world, including the golden Muisca Raft?",
        correct: "The Gold Museum Museo del Oro",
        w1: "National Museum of Colombia",
        w2: "Botero Museum",
        exp: "Holding over 55,000 gold and alloy (tumbaga) objects, the Muisca Raft depicts the indigenous ceremony that inspired the Spanish legend of El Dorado at Lake Guatavita."
      },
      {
        q: "What sacred circular crater lake high in the Andes near Bogotá is the historical origin of the El Dorado legend, where indigenous Muisca zipa rulers coated themselves in gold dust?",
        correct: "Lake Guatavita Laguna de Guatavita",
        w1: "Lake Tota",
        w2: "Lake Iguaque",
        exp: "During coronation ceremonies, the new Muisca ruler offered gold figurines and emeralds to the water goddess by diving from a ceremonial wooden reed raft."
      },
      {
        q: "What monumental Roman Catholic church, carved entirely out of the subterranean halite rock chambers of an active salt mine 200 meters underground, is located near Bogotá?",
        correct: "Salt Cathedral of Zipaquirá",
        w1: "Las Lajas Sanctuary",
        w2: "Monserrate Sanctuary",
        exp: "Voted the First Wonder of Colombia, the underground cathedral features a 16-meter carved illuminated cross and fourteen subterranean Stations of the Cross chapels."
      },
      {
        q: "What dramatic Gothic Revival basilica in southern Colombia is built directly on a 50-meter-tall bridge spanning a sheer canyon of the Guáitara River near Ipiales?",
        correct: "Las Lajas Sanctuary Santuario de Las Lajas",
        w1: "Zipaquirá Cathedral",
        w2: "Buga Basilica",
        exp: "Built between 1916 and 1949, the church encloses a miraculous natural rock cliff image of the Virgin Mary appearing to an indigenous woman in 1754."
      }
    ],
    number: {
      q: "What is the mean elevation in meters above sea level of the Colombian capital city of Bogotá?",
      target: 2640,
      unit: "meters",
      imperial: "8,660 feet above sea level",
      exp: "Bogotá sits at an official altitude of 2,640 meters on the high Andean plateau (Sabana de Bogotá)."
    }
  },

  // Cycle 3: The Coffee Cultural Landscape & Cocora Valley
  {
    mcqs: [
      {
        q: "What UNESCO World Heritage region in the central Andes (encompassing Caldas, Quindío, and Risaralda) is renowned for cultivating the world highest-quality washed Arabica coffee?",
        correct: "The Coffee Cultural Landscape Eje Cafetero",
        w1: "The Llanos",
        w2: "The Altiplano Cundiboyacense",
        exp: "Smallholder coffee farmers (cafeteros) cultivate shade-grown Arabica on steep Andean slopes, hand-picking bright red coffee cherries during two annual harvest peaks."
      },
      {
        q: "What magnificent palm tree species, the official national tree of Colombia, grows up to sixty meters tall in the misty cloud forest pastures of the Cocora Valley?",
        correct: "Quindío Wax Palm Ceroxylon quindiuense",
        w1: "Moriche Palm",
        w2: "Royal Palm",
        exp: "The Quindío Wax Palm is the tallest monocot and palm tree in the world, living up to 200 years and providing nesting habitat for the endangered Yellow-eared Parrot."
      },
      {
        q: "What picturesque heritage town in Quindío, famous for colorful wooden balconied houses, craft shops, and trout restaurants, is the primary gateway to the Cocora Valley?",
        correct: "Salento",
        w1: "Filandia",
        w2: "Pijao",
        exp: "Salento was founded in 1842 along the historic Camino Nacional trail, famous for the Calle Real shopping street and scenic Alto de la Cruz mountain viewpoint."
      },
      {
        q: "What iconic rustic, colorful wooden open-air mountain buses, painted in geometric patterns and equipped with heavy-duty ladders on top, are the symbol of rural transport in the coffee region?",
        correct: "Chivas Chiva Buses Escaleras",
        w1: "Colectivos",
        w2: "Guaguas",
        exp: "Chivas transport farmers, milk cans, sacks of coffee, and livestock over steep unpaved Andean dirt roads, complete with lively vallenato and cumbia music."
      },
      {
        q: "What fictional character and brand icon, depicted with his mule Conchita wearing a traditional ruana poncho and sombrero vueltiao, was created in 1959 to represent 100% Colombian Coffee?",
        correct: "Juan Valdez",
        w1: "Don Pedro",
        w2: "Carlos Vives",
        exp: "Created by the National Federation of Coffee Growers of Colombia (FNC), the Juan Valdez emblem certifies that coffee beans are 100% hand-picked Colombian Arabica."
      }
    ],
    number: {
      q: "What maximum height in meters can the towering Quindío Wax Palm (Ceroxylon quindiuense) reach in the Cocora Valley of Colombia?",
      target: 60,
      unit: "meters",
      imperial: "200 feet tall (world tallest palm)",
      exp: "The Quindío Wax Palm can reach heights of up to sixty meters, making it the tallest recorded palm tree species on Earth."
    }
  },

  // Cycle 4: Cartagena de Indias & Caribbean Fortresses
  {
    mcqs: [
      {
        q: "What legendary UNESCO World Heritage walled port city on the Caribbean coast of Colombia was founded in 1533 by Spanish conquistador Pedro de Heredia?",
        correct: "Cartagena de Indias",
        w1: "Santa Marta",
        w2: "Barranquilla",
        exp: "Cartagena was the primary Spanish Caribbean storehouse for gold and silver plundered across South America before treasure fleets sailed for Spain."
      },
      {
        q: "What colossal 17th-century Spanish stone fortress on San Lázaro hill in Cartagena is the largest and strongest colonial military fortress ever built in the Americas?",
        correct: "Castillo San Felipe de Barajas",
        w1: "Castillo de San Fernando",
        w2: "Batería de San José",
        exp: "Constructed with a triangular geometry and an intricate maze of underground acoustic tunnels, it famously withstood a massive British siege by Admiral Edward Vernon in 1741."
      },
      {
        q: "Which vibrant colonial neighborhood in Cartagena, historically inhabited by artisans and free Afro-descendants, is celebrated for street art murals, umbrellas, and nightlife on Plaza Trinidad?",
        correct: "Getsemaní",
        w1: "San Diego",
        w2: "Bocagrande",
        exp: "Getsemaní was the cradle of Cartagena declaration of absolute independence from the Spanish Empire on November 11, 1811."
      },
      {
        q: "What archipelago of twenty-seven coral islands forty-five kilometers off the coast of Cartagena is a protected National Natural Park famous for turquoise waters and mangroves?",
        correct: "Rosario Islands Islas del Rosario",
        w1: "San Bernardo Islands",
        w2: "Barú Peninsula",
        exp: "The park protects the most extensive coral reefs on the continental Caribbean coast of Colombia, home to bioluminescent plankton in Laguna Encantada."
      },
      {
        q: "Which Nobel Prize-winning Colombian author, who set novels like Love in the Time of Cholera in Cartagena, is the father of literary Magical Realism?",
        correct: "Gabriel García Márquez Gabo",
        w1: "Álvaro Mutis",
        w2: "Jorge Isaacs",
        exp: "Born in the coastal town of Aracataca (the inspiration for Macondo in One Hundred Years of Solitude), his ashes are entombed at the Cloister of La Merced in Cartagena."
      }
    ],
    number: {
      q: "In what year was the historic Caribbean colonial fortress city of Cartagena de Indias founded by Pedro de Heredia?",
      target: 1533,
      unit: "year",
      imperial: "1533 AD",
      exp: "Cartagena de Indias was formally founded on June 1, 1533, quickly becoming the premier treasure port of the Spanish Empire."
    }
  },

  // Cycle 5: Sierra Nevada de Santa Marta & The Lost City
  {
    mcqs: [
      {
        q: "What unique isolated coastal mountain range rising directly from the Caribbean Sea to 5,730 meters is the highest coastal mountain range in the world?",
        correct: "Sierra Nevada de Santa Marta",
        w1: "Serranía del Baudó",
        w2: "Cordillera Occidental",
        exp: "In just forty-two kilometers from sandy Caribbean beaches, the mountains rise to equatorial glaciers, containing all global climatic life zones."
      },
      {
        q: "What are the twin highest mountain peaks in Colombia, rising 5,730 meters in the glaciated massif of the Sierra Nevada de Santa Marta?",
        correct: "Pico Cristóbal Colón and Pico Simón Bolívar",
        w1: "Nevado del Huila",
        w2: "Ritacuba Blanco",
        exp: "Named after Christopher Columbus and the Liberator Simón Bolívar, these twin summit peaks are sacred to indigenous elder brothers (the Kogui, Wiwa, Arhuaco, and Kankuamo)."
      },
      {
        q: "What ancient archaeological stone city in the dense jungle of the Sierra Nevada, built around 800 CE by the Tayrona civilization (650 years before Machu Picchu), is known as Teyuna?",
        correct: "The Lost City Ciudad Perdida",
        w1: "San Agustín",
        w2: "Tierradentro",
        exp: "Rediscovered in 1972 by grave robbers (huaqueros), Ciudad Perdida features 169 carved stone terraces, paved roads, and circular residential plazas reached by 1,200 stone steps."
      },
      {
        q: "What pristine National Natural Park on the Caribbean coast beneath the Sierra Nevada features golden granite boulder beaches, coconut palm groves, and coral bays?",
        correct: "Tayrona National Natural Park Parque Tayrona",
        w1: "Corales del Rosario",
        w2: "Utría National Park",
        exp: "Famous for scenic coves like Cabo San Juan del Guía, La Piscina, and Arrecifes, visitors hike through lush tropical coastal jungles home to cotton-top tamarin monkeys."
      },
      {
        q: "What is the oldest continuously inhabited European-founded city in Colombia and second oldest in South America, founded in 1525 by Rodrigo de Bastidas?",
        correct: "Santa Marta",
        w1: "Cartagena",
        w2: "Riohacha",
        exp: "Santa Marta is where South American Liberator Simón Bolívar died in December 1830 at the historic sugar plantation estate Quinta de San Pedro Alejandrino."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Pico Cristóbal Colón, the highest mountain peak in Colombia?",
      target: 5730,
      unit: "meters",
      imperial: "18,799 feet",
      exp: "Pico Cristóbal Colón stands at an official elevation of 5,730 meters above sea level in the Sierra Nevada de Santa Marta."
    }
  },

  // Cycle 6: Medellín, Innovation & Eternal Spring
  {
    mcqs: [
      {
        q: "What second largest city in Colombia, situated in the Aburrá Valley of Antioquia, is world-famous as the City of Eternal Spring for its year-round 22°C temperate climate?",
        correct: "Medellín",
        w1: "Cali",
        w2: "Bucaramanga",
        exp: "Once plagued by cartel violence in the late 20th century, Medellín underwent an internationally acclaimed transformation through innovative social urbanism and public transit."
      },
      {
        q: "What pioneering urban public transportation system in Medellín, integrated with the metro in 2004, uses aerial cable cars (gondolas) to connect steep mountainside informal settlements to city centers?",
        correct: "Metrocable",
        w1: "TransMilenio",
        w2: "Miocable",
        exp: "The Metrocable dramatically reduced crime, commute times, and social isolation in hillside comunas, serving as a global benchmark for urban transit integration."
      },
      {
        q: "Which mountainside neighborhood in Medellín, once one of the most dangerous urban areas in Latin America, was transformed into an open-air art and hip-hop cultural center with giant outdoor electric escalators?",
        correct: "Comuna 13 San Javier",
        w1: "Comuna 1 Popular",
        w2: "El Poblado",
        exp: "The 384-meter covered outdoor electric escalators (escaleras eléctricas) replaced 350 vertical concrete steps, attracting thousands of daily international street-art tourists."
      },
      {
        q: "What world-famous annual festival held every August in Medellín features a grand parade where rural flower farmers carry elaborate 100-kilogram floral arrangements (silletas) on their wooden backpack frames?",
        correct: "Feria de las Flores Flower Festival",
        w1: "Carnaval de Barranquilla",
        w2: "Feria de Cali",
        exp: "The Silleteros parade from the mountain village of Santa Elena honors over a century of traditional flower cultivation across the Paisa region."
      },
      {
        q: "Which world-famous Colombian sculptor and painter from Medellín, celebrated for his signature artistic style of depicting humans and animals in exaggerated volumetric proportions (Boterismo), donated twenty-three giant bronze sculptures to Plaza Botero?",
        correct: "Fernando Botero",
        w1: "Alejandro Obregón",
        w2: "Enrique Grau",
        exp: "Plaza Botero and the Museum of Antioquia house one of the most comprehensive collections of his paintings and sculptures in the world."
      }
    ],
    number: {
      q: "In what year was the first official Flower Festival (Feria de las Flores) celebrated in the city of Medellín?",
      target: 1957,
      unit: "year",
      imperial: "1957 AD",
      exp: "The first Feria de las Flores was organized in Medellín on May 1, 1957, lasting five days with an initial parade of forty silleteros."
    }
  },

  // Cycle 7: Caño Cristales & The River of Five Colors
  {
    mcqs: [
      {
        q: "What spectacular crystal-clear river in the Serranía de la Macarena National Park of Meta Department is world-famous as the River of Five Colors and the Liquid Rainbow?",
        correct: "Caño Cristales",
        w1: "Caño Canoas",
        w2: "Río Güejar",
        exp: "From July to November, the riverbed explodes into brilliant shades of fuchsia red, bright yellow, green, blue, and black across giant natural travertine plunge pools."
      },
      {
        q: "What unique endemic species of freshwater aquatic plant clings to the Precambrian quartzite riverbed of Caño Cristales, turning brilliant magenta-red when exposed to seasonal tropical sunlight?",
        correct: "Macarenia clavigera",
        w1: "Victoria amazonica",
        w2: "Eichhornia crassipes",
        exp: "The plant requires precise water levels and sunlight; during the rainy season the water is too deep, while in dry months the plants dry out."
      },
      {
        q: "What ancient isolated mountain plateau system, older than the Andes and dating back 1.2 billion years to the Guiana Shield, is where Caño Cristales and Chiribiquete are located?",
        correct: "The Guiana Shield Serranía de la Macarena",
        w1: "The Brazilian Shield",
        w2: "The Patagonia Craton",
        exp: "Serranía de la Macarena is a biological convergence point where the ecosystems of the Andes, Amazon rainforest, and Orinoco savannas meet."
      },
      {
        q: "What gigantic 200-meter-high granite monolith rock near Guatapé in Antioquia features 740 wooden and concrete zigzag stairs built into a natural vertical fissure to reach its 360-degree observation tower?",
        correct: "The Rock of Guatapé El Peñol",
        w1: "Piedra del Marquetalia",
        w2: "Cerro de Monserrate",
        exp: "Climbers reach the top of the monolith for panoramic views over the scenic emerald artificial reservoir islands of Guatapé."
      },
      {
        q: "Which colonial Andean town in Boyacá features the massive 14,000-square-meter Plaza Mayor, the largest completely cobblestoned town square in South America?",
        correct: "Villa de Leyva",
        w1: "Barichara",
        w2: "Monguí",
        exp: "Founded in 1572 and declared a National Monument, Villa de Leyva is famous for white-washed adobe mansions and the Kronosaurus 115-million-year-old marine reptile fossil."
      }
    ],
    number: {
      q: "For how many months of the year (July through November) does the aquatic plant Macarenia clavigera bloom in brilliant red colors in Caño Cristales?",
      target: 5,
      unit: "months",
      imperial: "5 months (July to November)",
      exp: "Caño Cristales displays its vibrant five-color palette for approximately five months annually during the transitional water-level season between July and November."
    }
  },

  // Cycle 8: The Amazon, Llanos & Chiribiquete
  {
    mcqs: [
      {
        q: "What massive 43,000-square-kilometer national park in the Colombian Amazon is the largest protected tropical rainforest national park in the world, renowned for sheer tabletop mountains (tepuis)?",
        correct: "Serranía de Chiribiquete National Natural Park",
        w1: "Amacayacu National Park",
        w2: "Cahuinarí National Park",
        exp: "Inscribed by UNESCO in 2018 as a mixed natural and cultural heritage site, Chiribiquete is known as the Sistine Chapel of the Amazon for over 75,000 prehistoric rock paintings."
      },
      {
        q: "Approximately how many thousand years old are the earliest prehistoric ochre rock art paintings discovered on the vertical cliff faces of tepuis in Chiribiquete and La Lindosa?",
        correct: "Over 12,000 to 20,000 Years Old",
        w1: "2,000 Years Old",
        w2: "5,000 Years Old",
        exp: "Indigenous Ice Age hunter-gatherers painted megafauna like giant ground sloths, mastodons, and horses using red ochre pigment, representing some of the earliest art in the Americas."
      },
      {
        q: "What vast 250,000-square-kilometer tropical savanna plain in eastern Colombia and western Venezuela is famous for its rich Llanero cattle-ranching cowboy culture and biodiversity?",
        correct: "Los Llanos The Eastern Plains",
        w1: "The Chaco",
        w2: "The Pampas",
        exp: "Los Llanos undergoes dramatic seasonal cycles of vast wet-season flooding and dry-season savanna droughts, home to joropo music played on harps and maracas."
      },
      {
        q: "What is the largest living rodent species on Earth, weighing up to sixty-five kilograms, which thrives in immense semi-aquatic herds across the flooded grasslands of Los Llanos in Colombia?",
        correct: "Capybara Chigüiro",
        w1: "Nutria",
        w2: "Paca",
        exp: "Capybaras (known locally as chigüiros) graze on aquatic grasses alongside giant anacondas, spectacled caimans, and jabiru storks."
      },
      {
        q: "What is the southernmost city in Colombia, situated on the banks of the Amazon River at the international tri-border with Brazil (Tabatinga) and Peru (Santa Rosa)?",
        correct: "Leticia",
        w1: "Puerto Carreño",
        w2: "Mitú",
        exp: "Leticia is Colombia gateway to the Amazon Basin, famous for the nightly spectacle of thousands of parakeets roosting in the trees of Santander Park."
      }
    ],
    number: {
      q: "What is the approximate total area in thousands of square kilometers of the UNESCO-listed Serranía de Chiribiquete National Park, the largest tropical rainforest park on Earth?",
      target: 43,
      unit: "thousand square kilometers",
      imperial: "16,600 square miles",
      exp: "Chiribiquete National Natural Park spans approximately 43,000 square kilometers across the departments of Caquetá and Guaviare."
    }
  },

  // Cycle 9: Colombian Emeralds & Biodiversity
  {
    mcqs: [
      {
        q: "What percentage of the global commercial market for premium gem-quality green emeralds is mined from the hydrothermal sedimentary deposits of Boyacá (Muzo, Chivor, and Coscuez) in Colombia?",
        correct: "Over 60 Percent",
        w1: "20 Percent",
        w2: "90 Percent",
        exp: "Colombian emeralds are prized worldwide for their intense velvety warm-green hue (caused by high chromium and low iron content in sedimentary shale host rock)."
      },
      {
        q: "What global biodiversity ranking does the Republic of Colombia hold, recognized as the most biodiverse country per square kilometer on Earth and second overall after Brazil?",
        correct: "Second Most Biodiverse Country",
        w1: "First Most Biodiverse",
        w2: "Fifth Most Biodiverse",
        exp: "Colombia ranks first in the world for bird species (over 1,950 species) and orchid species (over 4,000 species), and second in plants, amphibians, and butterflies."
      },
      {
        q: "What magnificent purple and yellow cattleya orchid species, named after Colombian botanist José Jerónimo Triana, is the official National Flower of Colombia?",
        correct: "Cattleya trianae Flor de Mayo",
        w1: "Orchis mascula",
        w2: "Vanda coerulea",
        exp: "Chosen in 1936, the flower displays the yellow, blue, and red colors of the Colombian national flag within its ruffled petals and lip."
      },
      {
        q: "What tiny, bright yellow amphibian endemic to the Pacific rainforests of Chocó, measuring only five centimeters, is recognized as the most poisonous vertebrate animal on Earth?",
        correct: "Golden Poison Frog Phyllobates terribilis",
        w1: "Blue Poison Dart Frog",
        w2: "Strawberry Poison Frog",
        exp: "A single wild golden poison frog carries enough batrachotoxin alkaloid in its skin secretions to kill ten to twenty adult humans, used by indigenous Emberá hunters for blowgun darts."
      },
      {
        q: "What traditional circular flatbread made from ground maize corn dough, cooked on a griddle and stuffed with melted cheese (Arepa de Queso) or eggs (Arepa de Huevo), is Colombia national culinary staple?",
        correct: "Arepa",
        w1: "Empanada",
        w2: "Pandebono",
        exp: "Eaten for breakfast and dinner across all thirty-two departments, each region has its own variation, from sweet Arepa de Chócolo to the egg-stuffed coastal arepa."
      }
    ],
    number: {
      q: "What percentage of the world highest-quality gem emeralds originates from the historic mining deposits of Colombia?",
      target: 60,
      unit: "percent",
      imperial: "60%+ of world fine emeralds",
      exp: "Colombia accounts for approximately 60 to 70 percent of the global supply of fine gem-quality emeralds."
    }
  },

  // Cycle 10: Extent, 32 Departments & Colombian Superlatives
  {
    mcqs: [
      {
        q: "Into how many first-level administrative departments (Departamentos), plus the Capital District of Bogotá, is the Republic of Colombia politically organized?",
        correct: "32 Departments and 1 Capital District",
        w1: "24 Departments and 2 Districts",
        w2: "40 Departments and 1 District",
        exp: "The thirty-two departments (such as Antioquia, Valle del Cauca, Cundinamarca, Bolívar, and Santander) are headed by popularly elected departmental governors."
      },
      {
        q: "What Caribbean coral archipelago and department of Colombia, located 775 kilometers northwest of the mainland off the coast of Nicaragua, is famed for the Sea of Seven Colors?",
        correct: "San Andrés and Providencia",
        w1: "Rosario Islands",
        w2: "San Bernardo Islands",
        exp: "San Andrés is home to the Raizal Creole Afro-Caribbean ethnic minority who speak San Andrés-Providencia Creole English alongside Spanish."
      },
      {
        q: "Which Pacific coastal bay in Chocó Department is a protected international nursery sanctuary where hundreds of Antarctic humpback whales migrate annually to give birth between July and October?",
        correct: "Bahía Solano and Ensenada de Utría",
        w1: "Tumaco Bay",
        w2: "Buenaventura Bay",
        exp: "Utría National Natural Park provides warm, sheltered calm waters where mother humpback whales nurse their newborn calves within meters of the rocky shoreline."
      },
      {
        q: "What is the second largest city in the Caribbean region of Colombia, world-famous for hosting the four-day UNESCO-inscribed Carnival of Barranquilla every February?",
        correct: "Barranquilla",
        w1: "Cartagena",
        w2: "Santa Marta",
        exp: "Famous as the birthplace of singer Shakira and Nobel literature Gabo, the Carnival slogan proclaims: 'Quien lo vive es quien lo goza' (Those who live it are those who enjoy it)."
      },
      {
        q: "What is the total geographical land area of the Republic of Colombia in square kilometers, ranking it as the fourth largest country in South America?",
        correct: "1,141,748 Square Kilometers",
        w1: "650,000 Square Kilometers",
        w2: "2,200,000 Square Kilometers",
        exp: "Covering 1.14 million square kilometers, Colombia is roughly twice the size of France or Texas, holding a national population exceeding fifty-two million people."
      }
    ],
    number: {
      q: "How many administrative Departments (Departamentos) comprise the Republic of Colombia?",
      target: 32,
      unit: "departments",
      imperial: "32 departments",
      exp: "The Republic of Colombia is composed of thirty-two sovereign administrative departments plus the Capital District of Bogotá."
    }
  }
];

// Build Colombia Quiz
buildQuiz({
  id: 'colombia-geography-heritage-60',
  theme: 'Colombia: Geography, The Andes & The Coffee Cultural Landscape',
  title: 'Colombia: Geography, The Andes & The Coffee Cultural Landscape',
  description: 'A 60-question grand master assessment exploring two oceans & triple Andes, Bogotá & El Dorado gold, the Coffee Cultural Landscape & Cocora wax palms (60 m), Cartagena de Indias (1533), Sierra Nevada & Lost City (5,730 m), Medellín, and Caño Cristales.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, colombiaCycles);

console.log('Colombia quiz built successfully!');
