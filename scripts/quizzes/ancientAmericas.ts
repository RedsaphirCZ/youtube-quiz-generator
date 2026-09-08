import { QuizDataset } from '../../src/types';

export const ancientAmericasQuiz: QuizDataset = {
  id: "ancient-americas-maya-inca-aztec-60",
  theme: "Ancient Americas: Maya, Aztec & Inca Civilizations",
  title: "Ancient Americas: Maya, Aztec & Inca Civilizations",
  description: "A 60-question grand master assessment on the Maya calendar and pyramids, Aztec Tenochtitlan and mythology, Inca engineering at Machu Picchu, and pre-Columbian achievements.",
  category: "Ancient Civilizations & Empires",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z",
  questions: [
    // Cycle 1
    {
      type: "mcq",
      question: "Which Mesoamerican civilization, flourishing along the Gulf Coast of Mexico from 1500 to 400 BCE, is known as the mother culture of Mesoamerica?",
      options: ["Olmec", "Zapotec", "Toltec"],
      correctIndex: 0,
      explanation: "The Olmecs established monumental earth platforms, jade carving, early glyphic symbolism, and ritual ballcourts that influenced subsequent cultures."
    },
    {
      type: "mcq",
      question: "What distinct massive volcanic basalt sculptures were carved by the Olmecs to represent their rulers and shamans?",
      options: ["Feathered serpents", "Colossal stone heads", "Sun calendar disks"],
      correctIndex: 1,
      explanation: "Seventeen Olmec colossal stone heads weighing up to dozens of tons each have been unearthed at San Lorenzo and La Venta."
    },
    {
      type: "mcq",
      question: "What sacred Mesoamerican ballgame was played across Central America with a solid rubber ball in I-shaped masonry courts?",
      options: ["Patolli", "Volador", "Ulama"],
      correctIndex: 2,
      explanation: "The ritual ballgame carried cosmic symbolism representing the movement of the sun and underworld battles."
    },
    {
      type: "mcq",
      question: "Which colossal pre-Columbian city in the Valley of Mexico featured the massive Pyramid of the Sun and the Avenue of the Dead?",
      options: ["Teotihuacan", "Monte Alban", "El Tajin"],
      correctIndex: 0,
      explanation: "Teotihuacan peaked between 100 BCE and 650 CE with over 100,000 residents, remaining a revered sacred site for the later Aztecs."
    },
    {
      type: "mcq",
      question: "What natural volcanic glass was extensively mined and knapped across Mesoamerica to produce razor-sharp blades, weapons, and mirrors?",
      options: ["Flint", "Obsidian", "Jadeite"],
      correctIndex: 1,
      explanation: "Obsidian blades could fracture to molecular sharpness, making green and black obsidian a vital commodity for surgery and warfare."
    },
    {
      type: "number",
      question: "What was the weight in metric tons of the largest Olmec colossal stone head excavated at La Cobata?",
      target: 40,
      metricUnit: "tons",
      imperialDisplay: "40 metric tons (44 US tons)",
      explanation: "The La Cobata colossal head measures over 3.4 meters tall and weighs approximately 40 metric tons of solid basalt."
    },

    // Cycle 2
    {
      type: "mcq",
      question: "What towering Maya city-state in modern Guatemala featured monumental limestone temple pyramids rising above the Peten rainforest canopy?",
      options: ["Copan", "Palenque", "Tikal"],
      correctIndex: 2,
      explanation: "Tikal was a dominant superpower of the Classic Maya period, famous for its steep Temple I and Temple IV pyramids."
    },
    {
      type: "mcq",
      question: "Which famous Maya ruler of Palenque ascended the throne at age twelve and was buried in the Temple of the Inscriptions beneath an iconic jade death mask?",
      options: ["Kinich Janaab Pakal", "Yax Nuun Ahiin", "Jasaw Chan Kawiil"],
      correctIndex: 0,
      explanation: "Pakal the Great ruled Palenque for 68 years from 615 to 683 CE, orchestrating a golden age of architecture and hieroglyphic art."
    },
    {
      type: "mcq",
      question: "What architectural feature made of overlapping stone slabs allowed the Maya to construct vaulted roofs without a true keystone arch?",
      options: ["Groin vault", "Corbel arch", "Barrel vault"],
      correctIndex: 1,
      explanation: "The Maya corbel arch layered stones progressively inward until they met at the peak with a single capping stone."
    },
    {
      type: "mcq",
      question: "Which southern Maya city in Honduras was celebrated for its elaborately carved portrait stelae and the longest Hieroglyphic Stairway in the Americas?",
      options: ["Calakmul", "Yaxchilan", "Copan"],
      correctIndex: 2,
      explanation: "Copan's Hieroglyphic Stairway contains over 1,800 individual glyphs recording the dynastic history of its sixteen kings."
    },
    {
      type: "mcq",
      question: "What major rival superpower city-state fought a series of brutal hegemonic wars against Tikal during the Classic period?",
      options: ["Calakmul", "Uxmal", "Bonampak"],
      correctIndex: 0,
      explanation: "Calakmul built a network of alliances that encircled and besieged Tikal during the 6th and 7th centuries."
    },
    {
      type: "number",
      question: "What is the approximate height in meters of Temple IV at Tikal, making it one of the tallest pre-Columbian pyramids in Mesoamerica?",
      target: 65,
      metricUnit: "meters",
      imperialDisplay: "213 feet (65 m)",
      explanation: "Temple IV at Tikal rises roughly 65 meters above the jungle floor, built around 741 CE by King Yik'in Chan K'awiil."
    },

    // Cycle 3
    {
      type: "mcq",
      question: "What mathematical concept did the Maya independently discover and use in their base-20 numerical system represented by a shell glyph?",
      options: ["Pi", "Zero", "Negative numbers"],
      correctIndex: 1,
      explanation: "The Maya used a positional base-20 numbering system using shells for zero, dots for ones, and bars for fives centuries before Europe."
    },
    {
      type: "mcq",
      question: "How many days made up the Maya Tzolkin sacred ritual calendar cycle?",
      options: ["365 days", "180 days", "260 days"],
      correctIndex: 2,
      explanation: "The Tzolkin combined 20 day names with 13 numbers to produce a 260-day divination and agricultural cycle."
    },
    {
      type: "mcq",
      question: "What 365-day solar calendar, composed of 18 months of 20 days plus 5 unlucky epagomenal days called Wayeb, did the Maya use?",
      options: ["Haab", "Xiuhpohualli", "Tonalpohualli"],
      correctIndex: 0,
      explanation: "The Haab tracked the astronomical solar year, interlocking with the Tzolkin to form a 52-year Calendar Round."
    },
    {
      type: "mcq",
      question: "What folding screen bark paper books, mostly burned by Spanish bishop Diego de Landa in 1562, preserved Maya astronomical records?",
      options: ["Scrolls", "Codices", "Stelae"],
      correctIndex: 1,
      explanation: "Only four authentic Maya codices survive today, detailing planetary tables, eclipse cycles, and religious ceremonies."
    },
    {
      type: "mcq",
      question: "What famous Highland Maya mythological epic preserved in Kiche language recounts the creation of humans from maize and the Hero Twins?",
      options: ["Chilam Balam", "Rabinal Achi", "Popol Vuh"],
      correctIndex: 2,
      explanation: "The Popol Vuh recounts how the Hero Twins Hunahpu and Xbalanque journeyed into Xibalba to defeat the underworld lords of death."
    },
    {
      type: "number",
      question: "How many days comprise the interlocking Calendar Round cycle, after which the Tzolkin and Haab align to the exact same day date?",
      target: 18980,
      metricUnit: "days",
      imperialDisplay: "18,980 days (52 years)",
      explanation: "Every 18,980 days (roughly 52 solar years), the combined ritual and solar dates repeat their full synchronization."
    },

    // Cycle 4
    {
      type: "mcq",
      question: "What famous step-pyramid temple dedicated to the feathered serpent deity Kukulcan stands at the center of Chichen Itza?",
      options: ["El Castillo", "Pyramid of the Magician", "Temple of the Frescoes"],
      correctIndex: 0,
      explanation: "El Castillo creates an illusion of a slithering serpent descending its balustrade during the spring and autumn equinoxes."
    },
    {
      type: "mcq",
      question: "What natural water-filled sinkholes in limestone terrain were used by the Maya for freshwater supply and ceremonial sacrificial offerings?",
      options: ["Arroyos", "Cenotes", "Calderas"],
      correctIndex: 1,
      explanation: "The Sacred Cenote at Chichen Itza yielded gold ornaments, carved jade, and human offerings dedicated to the rain god Chaac."
    },
    {
      type: "mcq",
      question: "What circular astronomical observatory building at Chichen Itza allowed Maya astronomers to track the movements of Venus and the equinoxes?",
      options: ["The Nunnery", "Akab Dzib", "El Caracol"],
      correctIndex: 2,
      explanation: "El Caracol features observation slits precisely aligned with the northernmost and southernmost extremes of Venus."
    },
    {
      type: "mcq",
      question: "Which coastal walled Maya trading city in Quintana Roo overlooked the turquoise Caribbean Sea and remained inhabited until Spanish arrival?",
      options: ["Tulum", "Coba", "Mayapan"],
      correctIndex: 0,
      explanation: "Tulum served as a major maritime trade seaport protected by thick limestone defense walls on three sides and sea cliffs on the fourth."
    },
    {
      type: "mcq",
      question: "Which central Mexican civilization, centered at Tula, heavily influenced the late architecture, skull racks, and warrior art of Chichen Itza?",
      options: ["Mixtec", "Toltec", "Huastec"],
      correctIndex: 1,
      explanation: "The Toltecs introduced reclining Chacmool sacrificial figures, warrior columns, and feathered serpent iconography to Yucatan."
    },
    {
      type: "number",
      question: "Counting all 91 steps on each of the four sides plus the top platform, how many total steps comprise the El Castillo pyramid at Chichen Itza?",
      target: 365,
      metricUnit: "steps",
      imperialDisplay: "365 steps",
      explanation: "El Castillo embodies the solar year with 4 sides times 91 steps (364) plus the top summit platform, totaling 365 steps."
    },

    // Cycle 5
    {
      type: "mcq",
      question: "What mythical northern homeland was the legendary ancestral origin of the Mexica Aztec people before their southern migration?",
      options: ["Tamoanchan", "Chicomoztoc", "Aztlan"],
      correctIndex: 2,
      explanation: "Aztlan was the mythical island homeland from which the seven Nahua tribes began their legendary southward migration."
    },
    {
      type: "mcq",
      question: "What prophetic sign did the Mexica look for to indicate where they should build their capital city, as instructed by Huitzilopochtli?",
      options: ["An eagle perched on a nopal cactus devouring a snake", "A jaguar resting beside a burning volcano", "A double rainbow touching a mountain spring"],
      correctIndex: 0,
      explanation: "This sacred prophecy guided the Mexica to an island in Lake Texcoco in 1325, a symbol commemorated today on the national flag of Mexico."
    },
    {
      type: "mcq",
      question: "What grand island capital city was founded by the Mexica in Lake Texcoco, which grew into one of the world largest cities by 1500?",
      options: ["Tetzcoco", "Tenochtitlan", "Tlaxcala"],
      correctIndex: 1,
      explanation: "Tenochtitlan was engineered with raised causeways, drawbridges, canals, and freshwater aqueducts from Chapultepec."
    },
    {
      type: "mcq",
      question: "What innovative artificial agricultural islands built in shallow lake beds allowed the Aztecs to produce up to seven crops per year?",
      options: ["Milpas", "Andenes", "Chinampas"],
      correctIndex: 2,
      explanation: "Chinampas were constructed by weaving reed fences and layering mud, lake sediment, and decomposing organic matter."
    },
    {
      type: "mcq",
      question: "What language, still spoken today by over 1.5 million indigenous people in central Mexico, was the imperial language of the Aztec Empire?",
      options: ["Nahuatl", "Kiche", "Otomi"],
      correctIndex: 0,
      explanation: "Nahuatl contributed numerous loanwords to world languages, including chocolate, tomato, avocado, coyote, and chili."
    },
    {
      type: "number",
      question: "In what year CE was the Aztec capital of Tenochtitlan officially founded on an island in Lake Texcoco?",
      target: 1325,
      metricUnit: "year CE",
      imperialDisplay: "1325 CE",
      explanation: "Founded in 1325 CE, Tenochtitlan grew over two centuries into a thriving urban metropolis of over 200,000 inhabitants."
    },

    // Cycle 6
    {
      type: "mcq",
      question: "Which Triple Alliance of three city-states in the Valley of Mexico formed the core of the Aztec Empire in 1428?",
      options: ["Tenochtitlan, Tlaxcala, Cholula", "Tenochtitlan, Texcoco, Tlacopan", "Tenochtitlan, Chalco, Xochimilco"],
      correctIndex: 1,
      explanation: "The Triple Alliance defeated the rival Tepanecs of Azcapotzalco, establishing an empire that eventually collected tribute from hundreds of towns."
    },
    {
      type: "mcq",
      question: "What monumental double pyramid at the sacred heart of Tenochtitlan was dedicated to Huitzilopochtli and the rain god Tlaloc?",
      options: ["Temple of the Sun", "Pyramid of Cholula", "Templo Mayor"],
      correctIndex: 2,
      explanation: "The Templo Mayor was rebuilt seven times in concentric layers, crowned by twin shrines to war/sun and rain/fertility."
    },
    {
      type: "mcq",
      question: "Which supreme Aztec solar and war deity was believed to require nourishment from human blood to keep the sun rising each morning?",
      options: ["Huitzilopochtli", "Quetzalcoatl", "Tezcatlipoca"],
      correctIndex: 0,
      explanation: "Huitzilopochtli was the patron deity of the Mexica, celebrated during major monthly festivals through heart sacrifices."
    },
    {
      type: "mcq",
      question: "What feathered serpent deity was worshipped across Mesoamerica as the patron of priesthood, wind, learning, and dawn?",
      options: ["Xipe Totec", "Quetzalcoatl", "Mictlantecuhtli"],
      correctIndex: 1,
      explanation: "Quetzalcoatl was revered across Mesoamerica for bringing maize, calendars, and arts to humankind."
    },
    {
      type: "mcq",
      question: "What deadly weapon, consisting of a flat wooden club embedded with razor-sharp obsidian prism blades, was used by Aztec warriors?",
      options: ["Atlatl", "Tepoztopilli", "Macuahuitl"],
      correctIndex: 2,
      explanation: "The macuahuitl was capable of delivering devastating cutting wounds, as recorded with astonishment by Spanish conquistadors."
    },
    {
      type: "number",
      question: "What was the estimated population of Tenochtitlan at the time of Spanish arrival in 1519, making it larger than contemporary London or Paris?",
      target: 200000,
      metricUnit: "people",
      imperialDisplay: "200,000 residents",
      explanation: "Estimates range from 200,000 to 250,000 inhabitants, making Tenochtitlan one of the most densely populated cities on the planet."
    },

    // Cycle 7
    {
      type: "mcq",
      question: "What prestigious elite Aztec military brotherhoods wore feathered animal suits and served as the vanguard of imperial conquests?",
      options: ["Eagle and Jaguar warriors", "Cougar and Falcon knights", "Serpent and Wolf veterans"],
      correctIndex: 0,
      explanation: "Warriors who captured four or more enemy combatants for ritual sacrifice earned induction into the Eagle or Jaguar orders."
    },
    {
      type: "mcq",
      question: "What ritualized staged conflicts were fought against independent states like Tlaxcala specifically to capture prisoners for sacrifice?",
      options: ["Reconquista", "Flower Wars", "Holy Crusade"],
      correctIndex: 1,
      explanation: "Flower Wars were pre-arranged ceremonial battles designed to test martial prowess and acquire sacrificial captives."
    },
    {
      type: "mcq",
      question: "Which Aztec emperor ruled Tenochtitlan when Hernan Cortes and the Spanish conquistadors first arrived in 1519?",
      options: ["Cuauhtemoc", "Cuitlahuac", "Moctezuma II"],
      correctIndex: 2,
      explanation: "Moctezuma II received Cortes in Tenochtitlan before being taken hostage in his own palace and dying during the uprising."
    },
    {
      type: "mcq",
      question: "Who was the brave last Aztec emperor who defended Tenochtitlan during its brutal 1521 siege before being captured by Cortes?",
      options: ["Cuauhtemoc", "Ahuitzotl", "Itzcoatl"],
      correctIndex: 0,
      explanation: "Cuauhtemoc led desperate final resistance as smallpox and siege warfare devastated the city, revered today as a Mexican national hero."
    },
    {
      type: "mcq",
      question: "What massive 24-ton carved basalt monolith discovered in Mexico City depicts the sun god Tonatiuh and the four previous cosmic creations?",
      options: ["Coyolxauhqui Stone", "Aztec Sun Stone", "Tizoc Stone"],
      correctIndex: 1,
      explanation: "The Aztec Sun Stone measures 3.6 meters across, detailing the five cosmological sun eras of Nahua belief."
    },
    {
      type: "number",
      question: "What was the approximate weight in metric tons of the Aztec Sun Stone carved during the reign of Moctezuma II?",
      target: 24,
      metricUnit: "tons",
      imperialDisplay: "24 metric tons",
      explanation: "Discovered buried in Mexico City Zocalo in 1790, the circular basalt Sun Stone weighs roughly 24 metric tons."
    },

    // Cycle 8
    {
      type: "mcq",
      question: "What was the official Quechua name of the Inca Empire, meaning the Realm of the Four United Regions?",
      options: ["Tiwanaku", "Wari", "Tawantinsuyu"],
      correctIndex: 2,
      explanation: "Tawantinsuyu divided the empire into four suyus, all radiating outwards from the imperial capital at Cusco."
    },
    {
      type: "mcq",
      question: "Which transformative Inca ruler rebuilt Cusco, expanded the empire across the Andes, and commissioned Machu Picchu?",
      options: ["Pachacuti", "Atahualpa", "Huascar"],
      correctIndex: 0,
      explanation: "Pachacuti Inca Yupanqui transformed the small Kingdom of Cusco into an imperial realm spanning 4,000 kilometers along the Andes."
    },
    {
      type: "mcq",
      question: "What was the imperial capital of the Inca Empire, designed in the symbolic shape of a sacred puma?",
      options: ["Cajamarca", "Cusco", "Quito"],
      correctIndex: 1,
      explanation: "Cusco featured the Coricancha at the puma heart and the massive fortress complex of Sacsayhuaman at its head."
    },
    {
      type: "mcq",
      question: "What supreme Inca solar deity was revered as the divine ancestor of the Sapa Inca dynasty?",
      options: ["Viracocha", "Pachamama", "Inti"],
      correctIndex: 2,
      explanation: "Inti was honoured during the winter solstice Inti Raymi festival, with temple walls lined in solid gold plates reflecting his light."
    },
    {
      type: "mcq",
      question: "What massive paved road network of over 40,000 kilometers linked coastal deserts, high Andean valleys, and rainforests?",
      options: ["Qhapaq Nan", "Royal Way of the Sun", "Inca Camino Real"],
      correctIndex: 0,
      explanation: "The Qhapaq Nan featured suspension bridges made of woven ichu grass, paved stone stairways, and mountain tunnels."
    },
    {
      type: "number",
      question: "What was the approximate total length in kilometers of the Qhapaq Nan Inca highway and communication network?",
      target: 40000,
      metricUnit: "km",
      imperialDisplay: "25,000 miles (40,000 km)",
      explanation: "The Inca road system spanned over 40,000 kilometers, connecting modern Peru, Ecuador, Bolivia, Colombia, Chile, and Argentina."
    },

    // Cycle 9
    {
      type: "mcq",
      question: "What relay runners ran in shifts along the Qhapaq Nan, capable of delivering messages and fresh fish 2,000 km across the Andes in days?",
      options: ["Mita", "Chasquis", "Curacas"],
      correctIndex: 1,
      explanation: "Chasquis carried verbal messages, small parcels, and quipus, blowing pututu conch shell horns to announce their arrival at tambo stations."
    },
    {
      type: "mcq",
      question: "What complex recording system of knotted colored cotton strings was used by the Inca to track census data, taxes, and grain stores?",
      options: ["Cuneiform", "Hieroglyphs", "Quipu"],
      correctIndex: 2,
      explanation: "Quipu accountants recorded numerical and administrative data using cord colors, knot types, and cluster spacings."
    },
    {
      type: "mcq",
      question: "What stepped stone agricultural terraces carved into steep Andean mountain slopes prevented erosion and created microclimates?",
      options: ["Andenes", "Chinampas", "Milpas"],
      correctIndex: 0,
      explanation: "Andenes retained heat from the sun during cold mountain nights, allowing the cultivation of maize, quinoa, and hundreds of potato varieties."
    },
    {
      type: "mcq",
      question: "What mountain estate perched on a narrow ridge 2,430 meters above sea level was built for Pachacuti and never discovered by Spanish conquistadors?",
      options: ["Ollantaytambo", "Machu Picchu", "Choquequirao"],
      correctIndex: 1,
      explanation: "Machu Picchu was brought to global renown by Hiram Bingham in 1911, celebrated for its ashlar stonework and Intihuatana sun stone."
    },
    {
      type: "mcq",
      question: "What mandatory public labor tax system required Inca citizens to work on roads, terraces, state farms, and military service for a portion of each year?",
      options: ["Encomienda", "Ayni", "Mita"],
      correctIndex: 2,
      explanation: "The Mita labor tax sustained state building projects and disaster relief granaries without using monetary currency."
    },
    {
      type: "number",
      question: "At what altitude in meters above sea level does the royal Inca sanctuary of Machu Picchu sit in the Peruvian Andes?",
      target: 2430,
      metricUnit: "meters",
      imperialDisplay: "7,970 feet (2,430 m)",
      explanation: "Machu Picchu is situated at an elevation of 2,430 meters (7,970 ft) between the peaks of Machu Picchu and Huayna Picchu."
    },

    // Cycle 10
    {
      type: "mcq",
      question: "What engineering technique did Inca stonemasons use to join massive polygonal granite blocks together so tightly without mortar that a knife blade cannot enter?",
      options: ["Ashlar masonry", "Dry-stone rubble", "Adobe interlocking"],
      correctIndex: 0,
      explanation: "Inca masonry utilized precision stone shaping with bronze chisels and sand abrasives, engineered to shift and settle safely during earthquakes."
    },
    {
      type: "mcq",
      question: "What colossal zigzag-walled fortress overlooking Cusco features cyclopean limestone blocks weighing over 100 metric tons?",
      options: ["Pisac", "Sacsayhuaman", "Moray"],
      correctIndex: 1,
      explanation: "Sacsayhuaman three tiers of zigzagging stone battlements protected the northern approach to Cusco and served as a ceremonial center."
    },
    {
      type: "mcq",
      question: "Which Sapa Inca was captured at the Battle of Cajamarca in 1532 by Francisco Pizarro despite filling a room with gold and silver for his ransom?",
      options: ["Huascar", "Manco Inca", "Atahualpa"],
      correctIndex: 2,
      explanation: "Atahualpa offered a room filled once with gold and twice with silver to secure his freedom, but was executed by Pizarro in 1533."
    },
    {
      type: "mcq",
      question: "Which famous circular sunken agricultural laboratory of concentric terraces was engineered by the Inca to experiment with different microclimates?",
      options: ["Moray", "Tipon", "Tambomachay"],
      correctIndex: 0,
      explanation: "Moray terraced depressions create temperature variations of up to 15 degrees Celsius between the top rim and bottom circle."
    },
    {
      type: "mcq",
      question: "What Spanish conquistador led the expedition of 168 men that conquered the Inca Empire in the 1530s?",
      options: ["Hernan Cortes", "Francisco Pizarro", "Vasco Nunez de Balboa"],
      correctIndex: 1,
      explanation: "Pizarro capitalized on a devastating smallpox epidemic and an Inca succession civil war between brothers Huascar and Atahualpa."
    },
    {
      type: "number",
      question: "What was the weight in metric tons of the largest single megalithic limestone block fitted into the lower ramparts of Sacsayhuaman?",
      target: 128,
      metricUnit: "tons",
      imperialDisplay: "128 metric tons",
      explanation: "The largest stone at Sacsayhuaman stands over 8 meters high and weighs an estimated 128 metric tons, quarried kilometers away."
    }
  ]
};
