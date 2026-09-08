const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 2. cuba-geography-heritage-60
// =========================================================================
const cubaCycles = [
  // Cycle 1: Havana, Habana Vieja & The Malecón
  {
    mcqs: [
      {
        q: "What capital city of Cuba, founded in 1519 by Spanish conquistador Diego Velázquez de Cuéllar on the Gulf of Mexico, is the largest city in the Caribbean?",
        correct: "Havana La Habana",
        w1: "Santiago de Cuba",
        w2: "Camagüey",
        exp: "Originally named San Cristóbal de la Habana, it was the key assembly port for the Spanish treasure fleets (Flota de Indias) before crossing the Atlantic."
      },
      {
        q: "What UNESCO World Heritage historic city center in Havana contains hundreds of preserved Spanish colonial buildings across five historic main plazas?",
        correct: "Old Havana Habana Vieja",
        w1: "Vedado",
        w2: "Miramar",
        exp: "Restored under city historian Eusebio Leal, Habana Vieja is centered around Plaza de Armas, Plaza de la Catedral, Plaza Vieja, Plaza de San Francisco, and Plaza del Cristo."
      },
      {
        q: "What famous eight-kilometer curved seawall and coastal boulevard in Havana is known as the Living Room of the City where locals gather at sunset?",
        correct: "The Malecón Avenida de Maceo",
        w1: "Paseo del Prado",
        w2: "Avenida de los Presidentes",
        exp: "Constructed in stages beginning in 1901, the Malecón connects Habana Vieja to the Vedado and Miramar districts, frequently splashed by Atlantic storm waves."
      },
      {
        q: "What monumental neoclassical building in Havana, completed in 1929 and resembling the United States Capitol in Washington, features a 92-meter dome and the Statue of the Republic?",
        correct: "El Capitolio National Capitol Building",
        w1: "Palacio de la Revolución",
        w2: "Gran Teatro de La Habana",
        exp: "El Capitolio houses a 25-carat replica diamond set into the floor marking Kilometer Zero for all highway distances across the island of Cuba."
      },
      {
        q: "What 16th-century star-shaped stone fortress overlooking Havana harbor is the oldest colonial stone fortress in the Americas, crowned by the bronze weathervane statue La Giraldilla?",
        correct: "Castillo de la Real Fuerza",
        w1: "Castillo del Morro",
        w2: "Fortaleza de San Carlos de la Cabaña",
        exp: "La Giraldilla depicts Inés de Bobadilla, the only female governor of Cuba, who spent years searching the ocean horizon for her lost husband Hernando de Soto."
      }
    ],
    number: {
      q: "In what year was the historic city of San Cristóbal de la Habana officially founded by the Spanish Crown on its current harbor site?",
      target: 1519,
      unit: "year",
      imperial: "1519 AD",
      exp: "Havana was formally established at its present location on Havana Bay on November 16, 1519."
    }
  },

  // Cycle 2: Classic Cars (Yank Tanks) & Automotive Heritage
  {
    mcqs: [
      {
        q: "What distinctive nickname is given in Cuba to the tens of thousands of vintage 1950s American automobiles that continue to cruise the streets as shared collective taxis?",
        correct: "Almendrones Yank Tanks",
        w1: "Chivas",
        w2: "Cocotaxis",
        exp: "Almendrones (derived from 'almond' for their rounded 1950s body shapes) include iconic Chevrolets, Fords, Buicks, and Cadillacs preserved through ingenious domestic repair."
      },
      {
        q: "Why did Cuba become an isolated, living rolling museum of pre-1960 classic American cars following the 1959 Cuban Revolution?",
        correct: "US trade embargo and governmental bans on importing foreign automobiles and commercial replacement parts",
        w1: "A national law mandating only vintage cars",
        w2: "Special fuel requirements only found in old engines",
        exp: "Cut off from American parts, Cuban mechanics adapted Russian boat engines, tractor carburetors, and hand-machined parts to keep 60,000 vintage vehicles running."
      },
      {
        q: "What three-wheeled, bright yellow egg-shaped motorized rickshaw scooters, resembling a hollow coconut, are popular for tourist transport across Havana?",
        correct: "Cocotaxis",
        w1: "Bicitaxis",
        w2: "Guaguas",
        exp: "Introduced in the late 1990s, Cocotaxis feature two passenger seats behind a motorcycle driver inside a fiberglass shell."
      },
      {
        q: "What traditional Spanish-Cuban word is commonly used across Cuba to refer to public city transit buses, which historically included giant converted semi-truck trailers called Camellos (Camels)?",
        correct: "Guaguas",
        w1: "Colectivos",
        w2: "Camionetas",
        exp: "The iconic Camello buses of the 1990s Special Period carried up to three hundred passengers inside a dual-humped steel semi-trailer pulled by a diesel truck."
      },
      {
        q: "Which American car brand is the most common among surviving vintage classic cars in Cuba, particularly 1955 to 1957 Bel Air models?",
        correct: "Chevrolet Chevy",
        w1: "Ford",
        w2: "Plymouth",
        exp: "The 1957 Chevrolet Bel Air with its tail fins and chrome grille is the international photographic emblem of Havana retro streetscape."
      }
    ],
    number: {
      q: "From which decade of American automotive manufacturing do the vast majority of classic vintage cars in Cuba originate?",
      target: 1950,
      unit: "decade",
      imperial: "1950s classic cars",
      exp: "Approximately 60,000 vintage vehicles from the 1950s (primarily 1950 to 1959 models) remain operational across Cuba."
    }
  },

  // Cycle 3: Viñales Valley & World-Class Tobacco
  {
    mcqs: [
      {
        q: "What stunning UNESCO World Heritage valley in Pinar del Río Province features flat agricultural floors framed by isolated steep-sided limestone hills called mogotes?",
        correct: "Viñales Valley Valle de Viñales",
        w1: "Yumurí Valley",
        w2: "Valle de los Ingenios",
        exp: "Farmers in Viñales still plow rich red soils using teams of oxen, preserving traditional methods for growing the world finest wrapper tobacco leaves."
      },
      {
        q: "What famous premium tobacco-growing region in Pinar del Río is recognized globally as the only place producing wrapper, binder, and filler leaves for authentic Habano cigars?",
        correct: "Vuelta Abajo",
        w1: "Semi Vuelta",
        w2: "Vuelta Arriba",
        exp: "A unique combination of microclimate, humidity, and iron-rich fertile red soils makes Vuelta Abajo tobacco leaves prized by brands like Cohiba and Montecristo."
      },
      {
        q: "What massive 120-meter painted rock art mural on the cliff face of Pita mogote in the Viñales Valley was commissioned in 1961 by Fidel Castro?",
        correct: "Mural of Prehistory Mural de la Prehistoria",
        w1: "Mural of the Revolution",
        w2: "Mural of the Mogotes",
        exp: "Designed by Leovigildo González Morillo, the giant outdoor mural depicts evolutionary history from prehistoric ammonites and dinosaurs to human beings."
      },
      {
        q: "What subterranean limestone cave in Viñales allows visitors to take an underground motorized boat ride along the subterranean flowing waters of the San Vicente River?",
        correct: "Cueva del Indio Indian Cave",
        w1: "Cueva de Santo Tomás",
        w2: "Gran Caverna de Palmarito",
        exp: "Rediscovered in 1920, the cave was used as a sanctuary by indigenous Guanahatabey people, featuring illuminated stalactites resembling animal shapes."
      },
      {
        q: "What traditional wooden thatched-roof curing barns, covered in royal palm fronds (guano), are used by Cuban veguero farmers to air-dry tobacco leaves?",
        correct: "Casas de Tabaco Tobacco Drying Barns",
        w1: "Bohíos",
        w2: "Secaderos",
        exp: "Tobacco leaves are hung on wooden poles (cujes) for fifty days to undergo natural fermentation and curing from green to rich amber brown."
      }
    ],
    number: {
      q: "In what year was the breathtaking agricultural landscape of the Viñales Valley officially inscribed as a UNESCO World Heritage site?",
      target: 1999,
      unit: "year",
      imperial: "1999 AD",
      exp: "Viñales Valley was designated a UNESCO World Heritage Cultural Landscape in December 1999."
    }
  },

  // Cycle 4: Trinidad & The Valley of the Sugar Mills
  {
    mcqs: [
      {
        q: "Which exceptionally preserved colonial town in central Cuba, founded in 1514, is famous for pastel-painted mansions, cobblestone streets, and red clay-tiled roofs?",
        correct: "Trinidad",
        w1: "Cienfuegos",
        w2: "Sancti Spíritus",
        exp: "Trinidad grew immensely wealthy during the 19th-century sugarcane boom, virtually frozen in time when the sugar trade declined in the late 1800s."
      },
      {
        q: "What UNESCO World Heritage valley near Trinidad contains the ruins of over seventy historic 19th-century sugar mills, slave quarters, and manor houses?",
        correct: "Valley of the Sugar Mills Valle de los Ingenios",
        w1: "Viñales Valley",
        w2: "Canímar Valley",
        exp: "At its peak in the 1830s, the valley produced thirty thousand tons of sugar annually, powered by the labor of over eleven thousand enslaved Afro-descendants."
      },
      {
        q: "What iconic 45-meter, seven-story watchtower in the Valley of the Sugar Mills was built in 1816 to oversee enslaved workers in the cane fields and sound bells for work shifts?",
        correct: "Manaca Iznaga Tower Torre de Manaca Iznaga",
        w1: "Trinidad Bell Tower",
        w2: "San Isidro Tower",
        exp: "Visitors can climb 184 wooden steps to the top of the tower for panoramic views across the sugarcane valley to the Escambray Mountains."
      },
      {
        q: "What traditional refreshing local cocktail of Trinidad combines aguardiente (raw cane rum), fresh lime juice, water, and sweet local mountain honey, served in a terracotta cup?",
        correct: "Canchánchara",
        w1: "Mojito",
        w2: "Daiquiri",
        exp: "Created by 19th-century Cuban mambí independence fighters to warm up in the trenches and fight off respiratory illnesses during the Ten Years War."
      },
      {
        q: "Which French-influenced neoclassical port city on Jagua Bay, known as the Pearl of the South, is the only city in Cuba founded by French immigrants (in 1819)?",
        correct: "Cienfuegos",
        w1: "Matanzas",
        w2: "Cárdenas",
        exp: "Cienfuegos UNESCO historic center features wide Parisian-style boulevards, the opulent Tomás Terry Theatre, and the eclectic Palacio de Valle."
      }
    ],
    number: {
      q: "What is the total height in meters of the historic Manaca Iznaga watchtower in the Valley of the Sugar Mills near Trinidad?",
      target: 45,
      unit: "meters",
      imperial: "148 feet tall (7 stories)",
      exp: "The Manaca Iznaga Tower stands forty-five meters tall, built by sugar baron Alejo Iznaga in 1816."
    }
  },

  // Cycle 5: Sierra Maestra & Pico Turquino
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Cuba, rising 1,974 meters in the rugged Sierra Maestra mountain range in southeastern Cuba?",
        correct: "Pico Turquino",
        w1: "Pico Cuba",
        w2: "Gran Piedra",
        exp: "The summit is crowned by a bronze bust of Cuban national hero and poet José Martí, sculpted by Jilma Madera and placed on the centenary of his birth in 1953."
      },
      {
        q: "What rugged, forested mountain range in southeastern Cuba served as the secret revolutionary mountain guerrilla stronghold for Fidel Castro and Che Guevara from 1956 to 1958?",
        correct: "The Sierra Maestra",
        w1: "Sierra del Escambray",
        w2: "Sierra del Rosario",
        exp: "Guerrillas established the Comandancia General de la Plata, broadcasting revolutionary news across the island on the clandestine Radio Rebelde."
      },
      {
        q: "What colossal 63,000-ton volcanic monolith boulder in the Sierra Maestra above Santiago de Cuba sits atop a mountain ridge at 1,234 meters elevation?",
        correct: "La Gran Piedra The Big Rock",
        w1: "El Yunque",
        w2: "Pan de Guajaibon",
        exp: "Recognized by Guinness as the third largest monolith in the world, visitors climb 452 stone steps to the summit, where the lights of Jamaica are visible on clear nights."
      },
      {
        q: "What flat-topped anvil-shaped limestone table mountain (tepuy) near Baracoa in eastern Cuba was described by Christopher Columbus in his 1492 maritime logbook?",
        correct: "El Yunque The Anvil",
        w1: "Pico Turquino",
        w2: "Pan de Matanzas",
        exp: "Rising 575 meters through dense tropical rainforests, El Yunque is a sacred national natural monument home to rare endemic polymorphic snails (Polymita picta)."
      },
      {
        q: "What is the oldest Spanish colonial settlement in Cuba, founded in 1511 on the eastern tip of the island, known as the First City (Ciudad Primada)?",
        correct: "Baracoa",
        w1: "Bayamo",
        w2: "Camagüey",
        exp: "Isolated by mountains until the La Farola mountain highway was built in the 1960s, Baracoa is famous for chocolate production and the Cruz de la Parra cross planted by Columbus."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Pico Turquino, the highest mountain peak in Cuba?",
      target: 1974,
      unit: "meters",
      imperial: "6,476 feet",
      exp: "Pico Turquino stands at an official elevation of 1,974 meters in the Sierra Maestra of Granma Province."
    }
  },

  // Cycle 6: Varadero, Cayos & The Zapata Wetlands
  {
    mcqs: [
      {
        q: "What world-famous resort peninsula in Matanzas Province features a continuous 20-kilometer stretch of powdery white sand beach along the turquoise Straits of Florida?",
        correct: "Varadero Hicacos Peninsula",
        w1: "Cayo Santa María",
        w2: "Playa Ancón",
        exp: "Varadero is the premier beach destination in the Caribbean, home to Josone Park, Ambrosio Cave with ancient pictographs, and Dupont Mansion (Xanadú)."
      },
      {
        q: "What massive 4,500-square-kilometer wetland biosphere reserve in southern Matanzas Province is the largest and most pristine wetland ecosystem in the entire Caribbean?",
        correct: "Zapata Peninsula Ciénaga de Zapata",
        w1: "Guanahacabibes",
        w2: "Cauto Delta",
        exp: "The Zapata Swamp is home to 900 plant species, 175 bird species (including the Zapata wren), and the Criadero de Cocodrilos crocodile breeding facility."
      },
      {
        q: "Which critically endangered, highly aggressive crocodilian species, recognizable by its bright yellowish-black pebble patterning and bony eyebrow ridges, is endemic exclusively to Cuba?",
        correct: "Cuban Crocodile Crocodylus rhombifer",
        w1: "American Crocodile",
        w2: "Morelet Crocodile",
        exp: "Possessing strong leaping abilities to catch arboreal prey, wild populations are restricted to the freshwater marshes of the Zapata Swamp and Lanier Swamp on Isla de la Juventud."
      },
      {
        q: "Which protected tropical coral archipelago off the southern coast of Cuba, named by Christopher Columbus in honor of Queen Isabella, is recognized as the most pristine marine reserve in the Caribbean?",
        correct: "Jardines de la Reina Gardens of the Queen",
        w1: "Jardines del Rey",
        w2: "Canarreos Archipelago",
        exp: "Heavily restricted to scientific researchers and limited scuba divers, the marine park harbors healthy elkhorn corals, silvertip reef sharks, and saltwater American crocodiles."
      },
      {
        q: "What famous historic inlet on the Zapata Peninsula was the site of the failed April 1961 CIA-sponsored invasion by Brigade 2506 Cuban exiles?",
        correct: "Bay of Pigs Bahía de Cochinos (Playa Girón)",
        w1: "Guantánamo Bay",
        w2: "Mariel Bay",
        exp: "The invasion was defeated within seventy-two hours, commemorated today by the Playa Girón Museum displaying captured aircraft, tanks, and historical artifacts."
      }
    ],
    number: {
      q: "What is the total continuous length in kilometers of the famous white-sand beach strip on the Hicacos Peninsula in Varadero, Cuba?",
      target: 20,
      unit: "kilometers",
      imperial: "12.4 miles of uninterrupted beach",
      exp: "Varadero features twenty kilometers of uninterrupted white sand beach along the north coast of Cuba."
    }
  },

  // Cycle 7: Cuban Music, Son & Dance
  {
    mcqs: [
      {
        q: "What foundational genre of Cuban popular music, originating in eastern rural Oriente in the late 19th century, fuses Spanish guitar decima melodies with African syncopated percussion?",
        correct: "Son Cubano",
        w1: "Danzón",
        w2: "Bolero",
        exp: "Son Cubano is the primary ancestor of modern international Salsa, played on the tres guitar, bongos, maracas, claves, and acoustic double bass."
      },
      {
        q: "What legendary ensemble of veteran Cuban musicians recorded a Grammy-winning 1997 album produced by Ry Cooder and featured in an Oscar-nominated Wim Wenders documentary?",
        correct: "Buena Vista Social Club",
        w1: "Los Van Van",
        w2: "Irakere",
        exp: "Featuring masters like Ibrahim Ferrer, Compay Segundo, Omara Portuondo, and pianist Rubén González, the project revived global love for classic Cuban son and bolero."
      },
      {
        q: "What Afro-Cuban secular music and dance tradition, inscribed on the UNESCO Intangible Cultural Heritage list in 2016, is driven by conga drums, claves, and polyrhythmic dancing?",
        correct: "Rumba",
        w1: "Mambo",
        w2: "Cha-Cha-Chá",
        exp: "Rumba developed in the docks of Havana and Matanzas, consisting of three main styles: Yambú (slow, graceful), Guaguancó (fast, courtship pursuit), and Columbia (athletic male solo)."
      },
      {
        q: "What world-famous open-air cabaret in Havana, founded in 1939 beneath towering royal palms, is celebrated for lavish feathered dancing shows and big band orchestras?",
        correct: "Tropicana Club Cabaret Tropicana",
        w1: "Club Parisien",
        w2: "El Floridita",
        exp: "Known as the Paradise Under the Stars, Tropicana hosted legendary performers including Nat King Cole, Josephine Baker, and Celia Cruz."
      },
      {
        q: "What national ballroom dance of Cuba, originating in Matanzas in the 1870s from the French contredanse, is performed in formal elegance by charanga orchestras with flutes and violins?",
        correct: "Danzón",
        w1: "Mambo",
        w2: "Cha-Cha-Chá",
        exp: "Created by composer Miguel Faílde in 1879, Danzón was officially declared the musical and dance heritage of the Cuban nation."
      }
    ],
    number: {
      q: "In what year was the historic, multi-million-selling Buena Vista Social Club album recorded in Havana and released internationally?",
      target: 1997,
      unit: "year",
      imperial: "1997 AD",
      exp: "Buena Vista Social Club was recorded in Havana in March 1996 and released in September 1997, winning the 1998 Grammy Award."
    }
  },

  // Cycle 8: Rum, Cocktails & Ernest Hemingway
  {
    mcqs: [
      {
        q: "What iconic Cuban cocktail, invented in Havana in the 16th century by privateer Sir Francis Drake as 'El Draque', combines light rum, fresh lime juice, sugar, spearmint (hierbabuena), and club soda?",
        correct: "The Mojito",
        w1: "The Daiquiri",
        w2: "Cuba Libre",
        exp: "Popularized globally at the historic tavern La Bodeguita del Medio in Old Havana, where mint leaves are gently muddled to release essential aromatic oils."
      },
      {
        q: "What classic Cuban cocktail, created in 1898 by American mining engineer Jennings Cox in the iron-mining town of Daiquirí, blends light rum, fresh lime juice, and simple syrup shaken with shaved ice?",
        correct: "The Daiquiri",
        w1: "The Mojito",
        w2: "Presidente",
        exp: "Master bartender Constantino Ribalaigua Vert perfected the Frozen Daiquiri at El Floridita bar in Havana, where a life-size bronze statue of Hemingway sits at the bar."
      },
      {
        q: "Which American Nobel laureate author lived in Cuba for over twenty years (1939 to 1960) at his estate Finca Vigía in San Francisco de Paula, writing The Old Man and the Sea?",
        correct: "Ernest Hemingway",
        w1: "Graham Greene",
        w2: "Tennessee Williams",
        exp: "Hemingway fished aboard his wooden boat Pilar from the village of Cojímar, donating his 1954 Nobel Prize medal to the people of Cuba at the Sanctuary of El Cobre."
      },
      {
        q: "What world-famous cocktail created in Havana around 1900, meaning 'Free Cuba', combines Cuban light rum, cola, and fresh lime juice on the rocks?",
        correct: "Cuba Libre",
        w1: "Mojito",
        w2: "Piña Colada",
        exp: "Invented by US Signal Corps soldiers and Cuban patriots celebrating liberation at the end of the Spanish-American War, toasted with the cry '¡Por Cuba Libre!'"
      },
      {
        q: "What world-leading Cuban rum brand, founded in Cárdenas in 1878 by José Arechabala and produced in San José de las Lajas, is aged in white oak barrels by master Maestros del Ron Cubano?",
        correct: "Havana Club",
        w1: "Bacardi",
        w2: "Santiago de Cuba",
        exp: "In 2022, the Knowledge of the Masters of Cuban Light Rum was inscribed on the UNESCO Intangible Cultural Heritage list."
      }
    ],
    number: {
      q: "In what year did Ernest Hemingway win the Nobel Prize in Literature for his Cuban fishing masterpiece The Old Man and the Sea?",
      target: 1954,
      unit: "year",
      imperial: "1954 AD",
      exp: "Ernest Hemingway received the Nobel Prize in Literature in October 1954, declaring himself a 'real Cuban'."
    }
  },

  // Cycle 9: Santiago de Cuba & Afro-Cuban Roots
  {
    mcqs: [
      {
        q: "What historic city in eastern Cuba, founded in 1515, was the first capital of Cuba and is celebrated as the Cradle of the Cuban Revolution and Capital of the Caribbean?",
        correct: "Santiago de Cuba",
        w1: "Camagüey",
        w2: "Holguín",
        exp: "Santiago is famous for Afro-Cuban carnival traditions, the Parque Céspedes, and the Casa de Diego Velázquez (the oldest residence in Cuba, built in 1522)."
      },
      {
        q: "What monumental multi-level coastal fortress on a 60-meter limestone cliff guarding the entrance to Santiago harbor, designed by Italian engineer Giovanni Battista Antonelli, is a UNESCO World Heritage site?",
        correct: "Castillo de San Pedro de la Roca Castillo del Morro",
        w1: "Castillo de la Real Fuerza",
        w2: "Castillo de Jagua",
        exp: "Constructed between 1638 and 1700, the complex features bastions, drawbridges, and gun batteries designed to repel British, French, and Dutch buccaneers."
      },
      {
        q: "What prominent cemetery in Santiago de Cuba serves as the National Pantheon of Cuba, containing the monumental mausoleums of national hero José Martí and revolutionary leader Fidel Castro?",
        correct: "Santa Ifigenia Cemetery Cementerio Santa Ifigenia",
        w1: "Colón Cemetery",
        w2: "Tomás Acea Cemetery",
        exp: "José Martí mausoleum is positioned so that sunlight strikes his wooden casket draped in the Cuban flag throughout the day, guarded by an elite honor guard."
      },
      {
        q: "What syncretic Afro-Cuban spiritual tradition, rooted in the Yoruba religion of West Africa combined with Roman Catholic saints, is widely practiced across Cuba?",
        correct: "Santería Regla de Ocha",
        w1: "Voodoo",
        w2: "Candomblé",
        exp: "Initiates (Santeros) consult the Ifá divination system and venerate divine Orishas including Changó (fire/thunder), Yemayá (ocean/motherhood), and Ochún (rivers/love)."
      },
      {
        q: "What famous Catholic basilica in the foothills of the Sierra Maestra near Santiago houses the miraculous 1612 statue of the Virgin of Charity (Our Lady of Charity of El Cobre), the Patron Saint of Cuba?",
        correct: "National Sanctuary of Our Lady of Charity of El Cobre",
        w1: "Havana Cathedral",
        w2: "Camagüey Cathedral",
        exp: "According to legend, the wooden statue was discovered floating undamaged in Nipe Bay in 1612 by two indigenous brothers and an enslaved boy known as the Three Juans."
      }
    ],
    number: {
      q: "In what year did Fidel Castro lead the historic armed assault on the Moncada Barracks in Santiago de Cuba, launching the 26th of July Movement?",
      target: 1953,
      unit: "year",
      imperial: "1953 AD",
      exp: "The attack on the Moncada Barracks occurred on July 26, 1953, celebrated as the National Day of Rebellion in Cuba."
    }
  },

  // Cycle 10: Extent, 15 Provinces & Cuban Superlatives
  {
    mcqs: [
      {
        q: "What is the smallest bird species in the world, measuring just five centimeters in total length and weighing less than two grams, endemic exclusively to the forests of Cuba?",
        correct: "Bee Hummingbird Zunzuncito (Mellisuga helenae)",
        w1: "Cuban Tody",
        w2: "Tocororo",
        exp: "Zunzuncito wings beat eighty to two hundred times per second, hovering like a miniature bumblebee to drink nectar from hibiscus and orchid flowers."
      },
      {
        q: "What colorful bird species, with red, white, and blue plumage matching the colors of the national flag, is the official National Bird of Cuba?",
        correct: "The Cuban Trogon Tocororo (Priotelus temnurus)",
        w1: "Cuban Parrot",
        w2: "Cuban Amazon",
        exp: "The Tocororo cannot survive in captivity, symbolizing the Cuban people love of freedom and independence."
      },
      {
        q: "Into how many administrative provinces (plus the special municipality of Isla de la Juventud) is the Republic of Cuba politically organized?",
        correct: "15 Provinces and 1 Special Municipality",
        w1: "12 Provinces and 2 Municipalities",
        w2: "18 Provinces and 1 Municipality",
        exp: "The fifteen provinces include Pinar del Río, Artemisa, La Habana, Mayabeque, Matanzas, Cienfuegos, Villa Clara, Sancti Spíritus, Ciego de Ávila, Camagüey, Las Tunas, Holguín, Granma, Santiago de Cuba, and Guantánamo."
      },
      {
        q: "What is the total geographical land area of the island nation of Cuba in square kilometers, making it by far the largest country in the Caribbean archipelago?",
        correct: "109,884 Square Kilometers",
        w1: "45,000 Square Kilometers",
        w2: "180,000 Square Kilometers",
        exp: "Cuba spans 1,250 kilometers from Cape San Antonio in the west to Point Maisí in the east, roughly the land area of England or the US state of Virginia."
      },
      {
        q: "What is the second largest island in the Cuban archipelago, located fifty kilometers south of the mainland in the Gulf of Batabanó, historically known as the Isle of Pines?",
        correct: "Isle of Youth Isla de la Juventud",
        w1: "Cayo Coco",
        w2: "Cayo Largo",
        exp: "Famous for black sand beaches, grapefruit orchards, and the Presidio Modelo panopticon prison where Fidel Castro was imprisoned following the Moncada assault."
      }
    ],
    number: {
      q: "What is the total body length in centimeters of the Cuban Bee Hummingbird (Zunzuncito), the smallest living bird on Earth?",
      target: 5,
      unit: "centimeters",
      imperial: "2 inches long (weighs 1.8 grams)",
      exp: "The Bee Hummingbird (Mellisuga helenae) measures approximately five centimeters from beak to tail tip."
    }
  }
];

// Build Cuba Quiz
buildQuiz({
  id: 'cuba-geography-heritage-60',
  theme: 'Cuba: Geography, Classic Havana & The Caribbean Pearl',
  title: 'Cuba: Geography, Classic Havana & The Caribbean Pearl',
  description: 'A 60-question grand master assessment exploring Havana & Habana Vieja (1519), 1950s classic cars, Viñales tobacco & mogotes (1999), Trinidad & Sugar Mills (45 m), Pico Turquino (1,974 m), Varadero (20 km), Son Cubano, Hemingway (1954), and the Bee Hummingbird (5 cm).',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, cubaCycles);

console.log('Cuba quiz built successfully!');
