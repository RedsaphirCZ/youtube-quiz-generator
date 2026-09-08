const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 2. mexico-geography-heritage-60
// =========================================================================
const mexicoCycles = [
  // Cycle 1: The Sierra Madre Ranges & Pico de Orizaba
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Mexico and third highest peak in North America, an active stratovolcano rising 5,636 meters?",
        correct: "Pico de Orizaba Citlaltépetl",
        w1: "Popocatépetl",
        w2: "Iztaccíhuatl",
        exp: "Citlaltépetl (Star Mountain in Nahuatl) is located on the border of Puebla and Veracruz, supporting the high-altitude Gran Glaciar Norte."
      },
      {
        q: "What active, smoking stratovolcano located seventy kilometers southeast of Mexico City is nicknamed El Popo, standing at 5,426 meters?",
        correct: "Popocatépetl",
        w1: "Iztaccíhuatl",
        w2: "Nevado de Toluca",
        exp: "Popocatépetl (Smoking Mountain) is linked in Aztec mythology to neighboring dormant volcano Iztaccíhuatl (The Sleeping Woman)."
      },
      {
        q: "What massive volcanic belt extends across central-southern Mexico from the Pacific to the Gulf of Mexico, hosting Mexico highest volcanoes?",
        correct: "Trans-Mexican Volcanic Belt",
        w1: "Sierra Madre Oriental",
        w2: "Sierra Madre Occidental",
        exp: "The Eje Volcánico Transversal was formed by the subduction of the Cocos and Rivera plates beneath the North American Plate."
      },
      {
        q: "Which cinder cone volcano in Michoacán famously erupted out of a cornfield in February 1943, growing 424 meters tall over nine years?",
        correct: "Parícutin",
        w1: "Volcán de Colima",
        w2: "El Chichón",
        exp: "Parícutin gave volcanologists the rare opportunity to document the complete life cycle of a monogenetic volcanic eruption from birth to extinction."
      },
      {
        q: "What massive mountain system in northwestern Mexico is deeply carved by the rugged canyons of the Barrancas del Cobre (Copper Canyon)?",
        correct: "Sierra Madre Occidental",
        w1: "Sierra Madre Oriental",
        w2: "Sierra Madre del Sur",
        exp: "The Sierra Madre Occidental spans over 1,200 kilometers along the Pacific slope, ancestral home to the indigenous Rarámuri (Tarahumara) distance runners."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Pico de Orizaba (Citlaltépetl), the highest peak in Mexico?",
      target: 5636,
      unit: "meters",
      imperial: "18,491 feet",
      exp: "Pico de Orizaba stands at an official elevation of 5,636 meters, trailing only Mount Denali and Mount Logan in North America."
    }
  },

  // Cycle 2: The Valley of Mexico & Mexico City
  {
    mcqs: [
      {
        q: "On the ruins of which ancient Aztec island capital city in Lake Texcoco was modern Mexico City founded by Spanish conquistadors in 1521?",
        correct: "Tenochtitlan",
        w1: "Teotihuacan",
        w2: "Tula",
        exp: "Tenochtitlan was an engineering marvel of causeways, aqueducts, and chinampas (floating agricultural gardens) founded in 1325 CE."
      },
      {
        q: "What is the massive central historic plaza of Mexico City called, one of the largest public city squares in the world?",
        correct: "The Zócalo Plaza de la Constitución",
        w1: "Plaza Garibaldi",
        w2: "Plaza de las Tres Culturas",
        exp: "The Zócalo is bordered by the Metropolitan Cathedral, the National Palace (featuring murals by Diego Rivera), and the Templo Mayor ruins."
      },
      {
        q: "What ancient canal borough in southern Mexico City preserves pre-Hispanic chinampa farming and colorful traditional flat-bottomed boats called trajineras?",
        correct: "Xochimilco",
        w1: "Coyoacán",
        w2: "San Ángel",
        exp: "UNESCO-listed Xochimilco represents the last remaining extensive lake and canal system of the historic Valley of Mexico basin."
      },
      {
        q: "Which colossal ancient Mesoamerican archaeological city thirty miles northeast of Mexico City is centered on the Avenue of the Dead and the Pyramid of the Sun?",
        correct: "Teotihuacan",
        w1: "Cholula",
        w2: "El Tajín",
        exp: "At its peak around 450 CE, Teotihuacan had an estimated population of over 125,000 residents, boasting the third largest ancient pyramid in the world."
      },
      {
        q: "Which expansive 686-hectare urban park in Mexico City is one of the largest city parks in the Western Hemisphere, crowned by Chapultepec Castle?",
        correct: "Chapultepec Forest Bosque de Chapultepec",
        w1: "Alameda Central",
        w2: "Parque México",
        exp: "Chapultepec Castle is the only royal castle in the Americas, serving as the residence of Emperor Maximilian I and today housing the National Museum of History."
      }
    ],
    number: {
      q: "In what historic year did the Aztec capital of Tenochtitlan fall to Spanish forces led by Hernán Cortés following a brutal 93-day siege?",
      target: 1521,
      unit: "year",
      imperial: "1521 AD",
      exp: "Tenochtitlan surrendered on August 13, 1521, marking the collapse of the Aztec Empire and the founding of the Viceroyalty of New Spain."
    }
  },

  // Cycle 3: The Yucatán Peninsula & Maya Cenotes
  {
    mcqs: [
      {
        q: "What vast, flat limestone karst plateau in southeastern Mexico separates the Gulf of Mexico from the Caribbean Sea?",
        correct: "The Yucatán Peninsula",
        w1: "Baja California",
        w2: "Tehuantepec Peninsula",
        exp: "Because the porous limestone absorbs rainfall immediately, the northern Yucatán has no major surface rivers, relying on subterranean water systems."
      },
      {
        q: "What natural water-filled limestone sinkholes, sacred to the ancient Maya as portals to the underworld (Xibalba), number over 6,000 across the Yucatán?",
        correct: "Cenotes Dzonot",
        w1: "Poljes",
        w2: "Tepuis",
        exp: "Cenotes form when subterranean cave roofs collapse into groundwater aquifers, providing crystal-clear freshwater for Maya cities like Chichen Itza."
      },
      {
        q: "What monumental 30-meter step pyramid at Chichen Itza produces an optical illusion of a feathered serpent slithering down its stairs during the spring and autumn equinoxes?",
        correct: "El Castillo Temple of Kukulcán",
        w1: "Pyramid of the Magician",
        w2: "Temple of the Inscriptions",
        exp: "The pyramid has ninety-one steps on four sides plus the top platform, totaling exactly 365 steps corresponding to the days of the solar year (Haab')."
      },
      {
        q: "Which ancient Maya archaeological city is perched dramatically atop twelve-meter cliffs overlooking the turquoise waters of the Caribbean Sea in Quintana Roo?",
        correct: "Tulum",
        w1: "Cobá",
        w2: "Uxmal",
        exp: "Tulum served as a fortified seaport for the inland trade networks of the Maya city of Cobá, flourishing during the Late Postclassic period."
      },
      {
        q: "What massive 180-kilometer prehistoric impact crater centered on the northern coast of the Yucatán marks where a 10-km asteroid triggered the extinction of dinosaurs 66 million years ago?",
        correct: "Chicxulub Crater",
        w1: "Manicouagan Crater",
        w2: "Vredefort Crater",
        exp: "The Chicxulub asteroid impact created the Ring of Cenotes, a semicircular boundary of groundwater sinkholes aligning with the buried crater rim."
      }
    ],
    number: {
      q: "How many total steps (combining all four staircases plus the top platform) comprise the Temple of Kukulcán (El Castillo) at Chichen Itza?",
      target: 365,
      unit: "steps",
      imperial: "365 steps (one for each day of the solar year)",
      exp: "Each of the four stairways has 91 steps (91 x 4 = 364), plus the final summit platform step, equaling exactly 365 steps."
    }
  },

  // Cycle 4: Baja California & The Sea of Cortez
  {
    mcqs: [
      {
        q: "What 1,200-kilometer-long peninsula in northwestern Mexico separates the Pacific Ocean from the Gulf of California?",
        correct: "Baja California Peninsula",
        w1: "Yucatán Peninsula",
        w2: "Florida Peninsula",
        exp: "Baja California is one of the longest peninsulas in the world, traversed by Mexican Federal Highway 1 through desert cacti forests."
      },
      {
        q: "Which body of water between Baja California and the Mexican mainland was dubbed The World Aquarium by ocean explorer Jacques Cousteau for its marine biodiversity?",
        correct: "Gulf of California Sea of Cortez",
        w1: "Gulf of Tehuantepec",
        w2: "Bay of Campeche",
        exp: "The Sea of Cortez is a UNESCO World Heritage site home to thirty-nine percent of the world marine mammal species and the critically endangered vaquita porpoise."
      },
      {
        q: "What protected coastal lagoon in Baja California Sur is the primary winter calving nursery for migrating Pacific Gray Whales?",
        correct: "Laguna San Ignacio",
        w1: "Ojo de Liebre",
        w2: "Bahía Magdalena",
        exp: "Gray whales migrate 10,000 kilometers from the Bering Sea to give birth in the warm, buoyant hypersaline waters of San Ignacio lagoon."
      },
      {
        q: "What famous natural granite sea arch rock formation marks Land End (El Fin del Mundo) where the Pacific Ocean meets the Sea of Cortez in Cabo San Lucas?",
        correct: "El Arco de Cabo San Lucas",
        w1: "Durdle Door",
        w2: "London Arch",
        exp: "El Arco is a three-story natural rock arch that frames Lovers Beach (Playa del Amor) on the sheltered bay and Divorce Beach on the crashing Pacific side."
      },
      {
        q: "What colossal canyon network in the Sierra Tarahumara of Chihuahua is four times larger in volume and deeper than the Grand Canyon of Arizona?",
        correct: "Copper Canyon Barrancas del Cobre",
        w1: "Sumidero Canyon",
        w2: "Huasteca Canyon",
        exp: "The Copper Canyon system comprises six major river canyons, traversed by the scenic Ferrocarril Chihuahua al Pacífico (El Chepe) passenger train."
      }
    ],
    number: {
      q: "What is the approximate total length in kilometers of the Baja California Peninsula from Tijuana to Cabo San Lucas?",
      target: 1200,
      unit: "kilometers",
      imperial: "746 miles long",
      exp: "The Baja California peninsula extends for approximately 1,200 kilometers from the US-Mexico border to its southern tip at Cabo San Lucas."
    }
  },

  // Cycle 5: Central Highlands & Colonial Silver Cities
  {
    mcqs: [
      {
        q: "Which UNESCO World Heritage city in central Mexico is famed for colorful hillside baroque houses, narrow subterranean road tunnels, and the Alley of the Kiss?",
        correct: "Guanajuato",
        w1: "Zacatecas",
        w2: "San Luis Potosí",
        exp: "Guanajuato was the leading silver extraction center in the 18th century, home to the opulent Teatro Juárez and the annual Cervantino arts festival."
      },
      {
        q: "Which colonial highland town in Guanajuato state is celebrated for the neo-Gothic pink sandstone parish church of San Miguel Arcángel and historic artisan culture?",
        correct: "San Miguel de Allende",
        w1: "Dolores Hidalgo",
        w2: "Querétaro",
        exp: "Named after independence hero Ignacio Allende, the town features cobblestone streets, colonial courtyards, and a vibrant international artistic community."
      },
      {
        q: "Which historic city east of Mexico City is famous for Talavera ceramic tiles, 365 baroque churches, and culinary masterworks like Mole Poblano and Chiles en Nogada?",
        correct: "Puebla",
        w1: "Oaxaca",
        w2: "Toluca",
        exp: "Puebla historic center is a UNESCO World Heritage site, situated between four towering volcanoes: Popocatépetl, Iztaccíhuatl, La Malinche, and Pico de Orizaba."
      },
      {
        q: "Which picturesque mountain town in Guerrero is world-renowned as the Silver Capital of the World, famous for baroque Santa Prisca church and silver silversmithing?",
        correct: "Taxco de Alarcón",
        w1: "Pátzcuaro",
        w2: "Tepoztlán",
        exp: "American architect William Spratling revived traditional silver jewelry crafting in Taxco in the 1930s, turning the white-walled town into a global silversmithing hub."
      },
      {
        q: "What massive pyramid located in Puebla has the largest base footprint of any pyramid ever constructed on Earth, measuring 450 by 450 meters?",
        correct: "Great Pyramid of Cholula Tlachihualtepetl",
        w1: "Pyramid of the Sun",
        w2: "Pyramid of the Moon",
        exp: "Cholula volume is estimated at 4.45 million cubic meters (nearly double the Great Pyramid of Giza), crowned by the Spanish colonial church of Nuestra Señora de los Remedios."
      }
    ],
    number: {
      q: "How many UNESCO World Heritage Sites does Mexico host, ranking it first in the Americas and seventh globally?",
      target: 35,
      unit: "UNESCO sites",
      imperial: "35 World Heritage Sites",
      exp: "Mexico possesses 35 inscribed UNESCO World Heritage Sites, spanning ancient pre-Hispanic cities, colonial historic centers, and pristine natural biospheres."
    }
  },

  // Cycle 6: Chiapas, Oaxaca & Indigenous Heritage
  {
    mcqs: [
      {
        q: "What magnificent canyon in Chiapas features sheer 1,000-meter vertical limestone walls carved by the Grijalva River, depicted on the Chiapas state coat of arms?",
        correct: "Sumidero Canyon Cañón del Sumidero",
        w1: "Copper Canyon",
        w2: "Santa Elena Canyon",
        exp: "Sumidero Canyon national park is navigable by boat from Chiapa de Corzo, famous for the Christmas Tree waterfall formation and river crocodiles."
      },
      {
        q: "Which ancient Zapotec mountain-top capital in the Central Valleys of Oaxaca was leveled into a grand ceremonial plaza around 500 BCE?",
        correct: "Monte Albán",
        w1: "Mitla",
        w2: "Yagul",
        exp: "Monte Albán features the Building of the Danzantes carved stone reliefs, ball courts, and underground tombs of Mixtec and Zapotec nobility."
      },
      {
        q: "What natural rock formation in Oaxaca features petrified mineralized waterfall cascades created by calcified spring water bubbling over cliff edges?",
        correct: "Hierve el Agua",
        w1: "Agua Azul",
        w2: "Misol-Ha",
        exp: "Hierve el Agua (The Water Boils) features two cliff cascades and natural cliffside infinity mineral pools overlooking the Sierra Mixe mountains."
      },
      {
        q: "Which Classic Maya city in the tropical rainforest of Chiapas is famous for the Temple of the Inscriptions housing the jade-covered sarcophagus of King K'inich Janaab' Pakal?",
        correct: "Palenque Lakamha",
        w1: "Yaxchilan",
        w2: "Bonampak",
        exp: "Palenque exhibits some of the finest Maya low-relief sculpture, palace aqueducts, and the famous carved sarcophagus lid depicting Pakal descent into the underworld."
      },
      {
        q: "What sacred town near Oaxaca is the World Capital of Mezcal, where artisanal distillers roast agave hearts (piñas) in underground volcanic stone pits?",
        correct: "Santiago Matatlán",
        w1: "Tequila",
        w2: "San Bartolo Coyotepec",
        exp: "Matatlán produces traditional smoky artisanal mezcals from wild espadín and tobalá agaves, crushed with horse-drawn stone tahona wheels."
      }
    ],
    number: {
      q: "What is the maximum vertical wall height in meters reached by the limestone cliffs of Sumidero Canyon in Chiapas?",
      target: 1000,
      unit: "meters",
      imperial: "3,280 feet vertical cliffs",
      exp: "The near-vertical canyon walls of Cañón del Sumidero reach heights of up to 1,000 meters above the Grijalva River."
    }
  },

  // Cycle 7: Mexican Agriculture, Agave & The Tequila Highlands
  {
    mcqs: [
      {
        q: "Which blue succulent plant species is legally required under Mexican appellation of origin laws to produce 100% authentic Tequila?",
        correct: "Agave tequilana Weber Blue Agave",
        w1: "Agave angustifolia",
        w2: "Agave potatorum",
        exp: "Blue agave takes seven to twelve years to mature before jimadores harvest the succulent heart (piña), which is roasted to extract fermentable sugars."
      },
      {
        q: "Which Mexican state in the central-western region is the primary historical and legal producing region for Tequila, encompassing the town of Tequila?",
        correct: "Jalisco",
        w1: "Oaxaca",
        w2: "Sonora",
        exp: "The UNESCO-listed Agave Landscape and Ancient Industrial Facilities of Tequila includes the volcanic valleys and Los Altos highlands of Jalisco."
      },
      {
        q: "In which archaeological valley in Puebla was wild teosinte first domesticated into modern agricultural corn (maize) approximately 9,000 years ago?",
        correct: "Tehuacán Valley",
        w1: "Oaxaca Valley",
        w2: "Balsas River Basin",
        exp: "Corn domestication in Mesoamerica transformed human civilization, allowing complex urban societies like the Olmecs, Maya, and Aztecs to flourish."
      },
      {
        q: "Which sweet aromatic orchid seed pod spice, indigenous to the tropical forests of Papantla in Veracruz, was used by the Aztecs to flavor royal cacao drinks?",
        correct: "Vanilla",
        w1: "Cinnamon",
        w2: "Allspice",
        exp: "Totonac farmers hand-pollinated Vanilla planifolia orchid flowers, called tlilxochitl (black flower) in Nahuatl, before the spice spread globally."
      },
      {
        q: "Which central Mexican state produces over seventy-five percent of Mexico avocado crop, making Mexico the undisputed leading avocado exporter on Earth?",
        correct: "Michoacán",
        w1: "Jalisco",
        w2: "State of Mexico",
        exp: "Rich volcanic soil, year-round sunshine, and high elevation around Uruapan allow Michoacán farmers to harvest Hass avocados in four annual flowerings."
      }
    ],
    number: {
      q: "Approximately how many thousands of years ago was wild teosinte first domesticated into maize (corn) in ancient Mexico?",
      target: 9,
      unit: "thousand years ago",
      imperial: "9,000 years ago",
      exp: "Archaeobotanical evidence confirms that indigenous Mesoamericans domesticated corn around 9,000 years ago in the valleys of south-central Mexico."
    }
  },

  // Cycle 8: Marine Biomes, Coral Reefs & Wildlife Migrations
  {
    mcqs: [
      {
        q: "What is the second largest barrier coral reef system in the world, stretching over 1,000 kilometers from the northern tip of the Yucatán Peninsula down to Honduras?",
        correct: "Mesoamerican Barrier Reef System",
        w1: "Great Barrier Reef",
        w2: "New Caledonia Barrier Reef",
        exp: "The Mesoamerican Reef borders Mexico Caribbean coast (Riviera Maya, Cozumel, and Banco Chinchorro), harboring over sixty-five coral species."
      },
      {
        q: "Which Caribbean island off the coast of Playa del Carmen is internationally celebrated for legendary drift scuba diving along Palancar and Santa Rosa coral walls?",
        correct: "Cozumel",
        w1: "Isla Mujeres",
        w2: "Isla Holbox",
        exp: "Popularized by Jacques Cousteau in 1961, Cozumel features transparent water visibility exceeding sixty meters along its southern national marine park."
      },
      {
        q: "Which remote volcanic archipelago 400 kilometers off the Pacific coast of Colima is nicknamed Mexico Little Galápagos for giant manta rays and hammerhead sharks?",
        correct: "Revillagigedo Islands Socorro",
        w1: "Marietas Islands",
        w2: "Coronado Islands",
        exp: "The UNESCO World Heritage Revillagigedo Archipelago (Socorro, Clarión, San Benedicto, Roca Partida) is the largest fully protected marine reserve in North America."
      },
      {
        q: "Which shallow, sandbar island north of the Yucatán Peninsula is famous for massive seasonal summer feeding aggregations of gentle giant whale sharks?",
        correct: "Isla Holbox",
        w1: "Isla Contoy",
        w2: "Cozumel",
        exp: "Nutrient-rich upwelling where the Gulf of Mexico meets the Caribbean Sea produces dense plankton blooms that attract hundreds of whale sharks from May to September."
      },
      {
        q: "What famous forested highland reserve in Michoacán and the State of Mexico protects the winter roosting grounds of hundreds of millions of migrating Monarch butterflies?",
        correct: "Monarch Butterfly Biosphere Reserve",
        w1: "El Triunfo Reserve",
        w2: "Calakmul Biosphere",
        exp: "Monarch butterflies complete an epic 4,500-kilometer migration from Canada and the US to cluster densely on sacred oyamel fir trees from November to March."
      }
    ],
    number: {
      q: "What is the approximate total length in kilometers of the Mesoamerican Barrier Reef System along the Caribbean coast?",
      target: 1000,
      unit: "kilometers",
      imperial: "620 miles",
      exp: "The Mesoamerican Reef extends for over 1,000 kilometers along the Caribbean coastlines of Mexico, Belize, Guatemala, and Honduras."
    }
  },

  // Cycle 9: The Northern Deserts & Geological Wonders
  {
    mcqs: [
      {
        q: "What is the largest desert in North America, covering over 500,000 square kilometers across northern Mexico and the southwestern United States?",
        correct: "Chihuahuan Desert",
        w1: "Sonoran Desert",
        w2: "Mojave Desert",
        exp: "The Chihuahuan Desert is an elevated desert plateau famous for diverse endemic cacti, lechuguilla agave, and the white gypsum sands of Cuatro Ciénegas."
      },
      {
        q: "What subterranean cavern 300 meters beneath a lead-zinc mine in Chihuahua contains the largest natural selenite gypsum crystals on Earth, measuring up to 12 meters long?",
        correct: "Cave of the Crystals Cueva de los Cristales",
        w1: "Cacahuamilpa Caves",
        w2: "Grutas de García",
        exp: "Magma heat beneath the Naica Mine kept mineral-rich water at 58°C for 500,000 years, allowing giant translucent gypsum beams weighing fifty tons to crystallize."
      },
      {
        q: "What vast volcanic field and biosphere reserve in the Sonoran Desert features ten massive maar explosion craters and the highest concentration of giant saguaro cacti in Mexico?",
        correct: "El Pinacate and Gran Desierto de Altar",
        w1: "Mapimí Silent Zone",
        w2: "Sierra de San Pedro Mártir",
        exp: "The giant Elegante Crater spans 1,600 meters across, creating a lunar landscape used by NASA astronauts to train for Apollo moon landings."
      },
      {
        q: "Which international river forms 2,018 kilometers of the northern border between Mexico and the United States from Ciudad Juárez to the Gulf of Mexico?",
        correct: "Río Bravo Río Grande",
        w1: "Colorado River",
        w2: "Gila River",
        exp: "Known as the Río Bravo del Norte in Mexico and Rio Grande in the US, the river irrigates agricultural valleys and feeds the Falcon and Amistad international reservoirs."
      },
      {
        q: "What unique desert valley in Coahuila contains over two hundred turquoise mineral spring pools (pozas) hosting living stromatolite bacterial colonies?",
        correct: "Cuatro Ciénegas",
        w1: "Bolson de Mapimi",
        w2: "Laguna Madre",
        exp: "Often called an evolutionary laboratory, Cuatro Ciénegas possesses ancient microbial ecosystems that have survived isolated since the Jurassic opening of the Gulf of Mexico."
      }
    ],
    number: {
      q: "What is the maximum length in meters of the giant selenite gypsum crystal beams discovered inside the Naica Cave of the Crystals in Chihuahua?",
      target: 12,
      unit: "meters",
      imperial: "39.4 feet long (the size of a school bus)",
      exp: "The colossal selenite crystals in Naica Mine reach lengths of up to twelve meters and measure over one meter across."
    }
  },

  // Cycle 10: Extent, 31 States & Mexican Superlatives
  {
    mcqs: [
      {
        q: "Into how many sovereign federative states (plus the capital entity Mexico City) is the United Mexican States administratively divided?",
        correct: "31 States and Mexico City",
        w1: "28 States and Mexico City",
        w2: "32 States and 1 Federal District",
        exp: "Under the 1917 Mexican Constitution, Mexico is a federal republic of thirty-one free and sovereign states plus the autonomous capital city (CDMX)."
      },
      {
        q: "What is the largest state in Mexico by geographical land area, covering over 247,000 square kilometers in the northern desert frontier?",
        correct: "Chihuahua",
        w1: "Sonora",
        w2: "Coahuila",
        exp: "Chihuahua spans 12.6 percent of Mexico national territory, bordering Texas and New Mexico with capital city Chihuahua and manufacturing hub Ciudad Juárez."
      },
      {
        q: "What is the total length in kilometers of the international border between Mexico and the United States?",
        correct: "3,145 Kilometers",
        w1: "2,000 Kilometers",
        w2: "4,500 Kilometers",
        exp: "The border stretches from the Pacific Ocean at Playas de Tijuana to the Gulf of Mexico at Matamoros, the most frequently crossed international land border in the world."
      },
      {
        q: "What is the smallest state in Mexico by geographical land area, located in the central highlands east of Mexico City?",
        correct: "Tlaxcala",
        w1: "Morelos",
        w2: "Colima",
        exp: "Covering just 3,991 square kilometers, Tlaxcala was a fierce rival of the Aztec Empire that allied with Hernán Cortés during the Spanish conquest."
      },
      {
        q: "What ranking does Mexico hold among the most biodiverse countries in the world, harboring roughly twelve percent of all terrestrial species on Earth?",
        correct: "Fifth Most Biodiverse Country",
        w1: "Tenth Most Biodiverse",
        w2: "Twentieth Most Biodiverse",
        exp: "Mexico is recognized as one of seventeen megadiverse nations, ranking first globally in reptile species diversity and second in mammalian species."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the international land border shared between Mexico and the United States?",
      target: 3145,
      unit: "kilometers",
      imperial: "1,954 miles",
      exp: "The Mexico-United States border stretches for 3,145 kilometers across four US states and six Mexican states."
    }
  }
];

// Build Mexico Quiz
buildQuiz({
  id: 'mexico-geography-heritage-60',
  theme: 'Mexico: Geography, Volcanoes & Ancient Civilizations',
  title: 'Mexico: Geography, Volcanoes & Ancient Civilizations',
  description: 'A 60-question grand master assessment exploring Pico de Orizaba, Mexico City & Tenochtitlan, the Yucatán cenotes, Baja California, colonial silver cities, Chiapas & Oaxaca, agave heritage, coral reefs, and northern deserts.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, mexicoCycles);

console.log('Mexico quiz built successfully!');
