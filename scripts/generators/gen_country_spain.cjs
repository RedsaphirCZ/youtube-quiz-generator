const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 1. spain-geography-heritage-60
// =========================================================================
const spainCycles = [
  // Cycle 1: Iberian Geography & The Meseta Central
  {
    mcqs: [
      {
        q: "What vast, high-altitude interior plateau covering over 200,000 square kilometers forms the geographical heart of the Iberian Peninsula in Spain?",
        correct: "The Meseta Central",
        w1: "The Ebro Basin",
        w2: "The Baetic Depression",
        exp: "The Meseta Central averages roughly 650 to 700 meters elevation, divided by the Sistema Central mountains into Old Castile and New Castile."
      },
      {
        q: "Which city is the national capital of Spain, holding the distinction of being the second highest national capital in Europe at 667 meters elevation?",
        correct: "Madrid",
        w1: "Toledo",
        w2: "Valladolid",
        exp: "Located in the geographic center of the Iberian Peninsula along the Manzanares River, Madrid became the permanent imperial capital under King Philip II in 1561."
      },
      {
        q: "What is the longest river flowing entirely or partially across the Iberian Peninsula, stretching 1,007 kilometers from Spain to Lisbon in Portugal?",
        correct: "Tagus River Río Tajo",
        w1: "Ebro River",
        w2: "Guadiana River",
        exp: "The Tagus originates in the Montes Universales in Aragon and flows westward through Aranjuez, Toledo, and Talavera de la Reina before entering the Atlantic."
      },
      {
        q: "What is the highest mountain peak on the mainland of Spain and the Iberian Peninsula, rising 3,479 meters in the Sierra Nevada of Andalusia?",
        correct: "Mulhacén",
        w1: "Pico Veleta",
        w2: "Aneto",
        exp: "Mulhacén is named after Abu l-Hasan Ali (Muley Hacén), the penultimate Muslim King of Granada, who was reputedly buried on its summit in 1485."
      },
      {
        q: "What mountain range forms the 430-kilometer natural physical border between northern Spain and France, stretching from the Bay of Biscay to the Mediterranean?",
        correct: "The Pyrenees Pirineos",
        w1: "Cantabrian Mountains",
        w2: "Iberian System",
        exp: "The Spanish Pyrenees feature Ordesa y Monte Perdido National Park, with limestone canyons and the highest Pyrenean peak, Pico Aneto (3,404 m)."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Mulhacén, the highest peak on the Spanish mainland?",
      target: 3479,
      unit: "meters",
      imperial: "11,414 feet",
      exp: "Mulhacén in the Sierra Nevada mountain range of Granada stands at 3,479 meters above sea level."
    }
  },

  // Cycle 2: Catalonia, Barcelona & Modernisme Architecture
  {
    mcqs: [
      {
        q: "Which iconic modernist basilica in Barcelona, designed by architect Antoni Gaudí, has been under construction since 1882 and features eighteen planned towers?",
        correct: "Basílica de la Sagrada Família",
        w1: "Barcelona Cathedral",
        w2: "Santa Maria del Mar",
        exp: "Gaudí combined Gothic and Art Nouveau organic forms, dedicating forty-three years to the basilica until his death in 1926."
      },
      {
        q: "What famous multi-peaked serrated mountain range northwest of Barcelona is home to the ancient Benedictine Santa Maria de Montserrat Abbey?",
        correct: "Montserrat",
        w1: "Montseny",
        w2: "Tibidabo",
        exp: "Montserrat (meaning 'serrated mountain') is a dramatic conglomerate rock formation that houses the Virgin of Montserrat (La Moreneta) black Madonna."
      },
      {
        q: "What rugged, picturesque coastline in northeastern Catalonia stretches from Blanes to the French border, famous for pine-fringed rocky coves?",
        correct: "Costa Brava",
        w1: "Costa Dorada",
        w2: "Costa del Sol",
        exp: "Costa Brava (Wild Coast) inspired Surrealist painter Salvador Dalí, whose home and museum are located in Cadaqués and Figueres."
      },
      {
        q: "What is the longest river located entirely within the territory of Spain, flowing 910 kilometers from Cantabria to its Mediterranean delta in Catalonia?",
        correct: "Ebro River",
        w1: "Duero River",
        w2: "Guadalquivir River",
        exp: "The Ebro Delta is one of the largest wetland regions in the western Mediterranean, producing immense rice harvests and supporting flamingos."
      },
      {
        q: "Which high-altitude Pyrenean valley in northwestern Catalonia is the only Spanish territory located on the northern Atlantic drainage slope of the Pyrenees?",
        correct: "Val d Aran",
        w1: "Cerdanya",
        w2: "Ripollès",
        exp: "Val d'Aran retains its own co-official Romance language (Aranese, a dialect of Gascon Occitan) and premier ski resort Baqueira-Beret."
      }
    ],
    number: {
      q: "In what year did construction on Antoni Gaudí masterwork, the Sagrada Família in Barcelona, officially begin?",
      target: 1882,
      unit: "year",
      imperial: "1882 AD",
      exp: "Construction of the Sagrada Família began under architect Francisco de Paula del Villar on March 19, 1882, before Gaudí took over in 1883."
    }
  },

  // Cycle 3: Andalusia, Moorish Heritage & The Guadalquivir
  {
    mcqs: [
      {
        q: "Which magnificent Moorish palace-citadel complex in Granada, constructed under the Nasrid Dynasty, was the last Islamic royal stronghold in Spain?",
        correct: "The Alhambra",
        w1: "The Alcázar of Seville",
        w2: "Medina Azahara",
        exp: "The Alhambra features the Court of the Lions, exquisite stucco arabesques, and the Generalife summer palace gardens with tiered fountains."
      },
      {
        q: "Which monumental 8th-century Islamic hypostyle mosque in Andalusia, famed for 856 jasper and marble pillars with two-tiered red-and-white arches, had a Christian cathedral built in its center?",
        correct: "Mezquita-Cathedral of Córdoba",
        w1: "Alhambra Mosque",
        w2: "Koutoubia",
        exp: "Expanded under the Umayyad Caliphs of Córdoba, it was one of the largest mosques in the medieval Islamic world before being consecrated as a cathedral in 1236."
      },
      {
        q: "What is the only major navigable commercial river in Spain, flowing through Córdoba and Seville to empty into the Gulf of Cádiz at Sanlúcar de Barrameda?",
        correct: "Guadalquivir River",
        w1: "Guadiana River",
        w2: "Genil River",
        exp: "Originating from Arabic Wadi al-Kabir (Great River), the Guadalquivir was the departure port for Ferdinand Magellan and Spanish treasure galleons."
      },
      {
        q: "Which Andalusian province is the olive oil capital of the world, containing over sixty million olive trees producing more olive oil than all of Italy combined?",
        correct: "Jaén",
        w1: "Seville",
        w2: "Málaga",
        exp: "The vast rolling Sea of Olives (Mar de Olivos) in Jaén produces high-polyphenol Picual extra virgin olive oil across picturesque limestone hills."
      },
      {
        q: "What famous, dramatic gorge in the Andalusian mountain town of Ronda is spanned by the 18th-century 98-meter-high Puente Nuevo stone bridge?",
        correct: "El Tajo Gorge",
        w1: "Garganta del Chorro",
        w2: "Despeñaperros Gorge",
        exp: "Carved by the Guadalevín River, the 120-meter canyon divides the historic Moorish old town of Ronda from its 18th-century bullfighting quarter."
      }
    ],
    number: {
      q: "In what historic year did Catholic Monarchs Ferdinand and Isabella complete the Reconquista by accepting the surrender of Granada?",
      target: 1492,
      unit: "year",
      imperial: "1492 AD",
      exp: "On January 2, 1492, Sultan Muhammad XII (Boabdil) surrendered the keys of the Alhambra and Granada, ending nearly eight centuries of Al-Andalus rule."
    }
  },

  // Cycle 4: The Canary Islands & Mount Teide
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in all of Spain and highest point in the Atlantic Ocean, an active stratovolcano rising 3,715 meters on Tenerife?",
        correct: "Mount Teide Pico del Teide",
        w1: "Roque de los Muchachos",
        w2: "Pico de las Nieves",
        exp: "Measured from its base on the Atlantic ocean floor, Teide is the third tallest volcanic structure in the world after Mauna Kea and Mauna Loa."
      },
      {
        q: "Which volcanic island in the Canary archipelago is world-famous for the fiery volcanic landscapes and geothermal restaurant barbecues of Timanfaya National Park?",
        correct: "Lanzarote",
        w1: "Fuerteventura",
        w2: "El Hierro",
        exp: "Eruptions between 1730 and 1736 covered one-fourth of Lanzarote in basaltic lava and lapilli, where local farmers dig stone semicircles (zocos) to grow vines."
      },
      {
        q: "On which steep, mountainous Canary Island is the unique whistled language Silbo Gomero used by locals to communicate across deep volcanic ravines?",
        correct: "La Gomera",
        w1: "La Palma",
        w2: "Tenerife",
        exp: "La Gomera contains Garajonay National Park, preserving an ancient Tertiary relic cloud forest of laurel trees (Laurisilva) fed by Atlantic mist."
      },
      {
        q: "Which island in the Canary Islands archipelago hosts the Roque de los Muchachos Observatory, one of the world premier astronomical telescope sites?",
        correct: "La Palma",
        w1: "Gran Canaria",
        w2: "El Hierro",
        exp: "Perched at 2,396 meters above the inversion cloud layer, La Palma hosts the Gran Telescopio Canarias, one of the world largest optical reflecting telescopes."
      },
      {
        q: "What cold ocean current flows southward past the Canary Islands and the northwest coast of Africa, moderating temperatures into year-round spring?",
        correct: "Canary Current",
        w1: "Gulf Stream",
        w2: "Benguela Current",
        exp: "The Canary Current brings cool North Atlantic water that suppresses tropical storms and keeps coastal temperatures comfortably between 18°C and 25°C."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Mount Teide on Tenerife, the highest point in all Spanish territory?",
      target: 3715,
      unit: "meters",
      imperial: "12,188 feet",
      exp: "Mount Teide on Tenerife in the Canary Islands stands at exactly 3,715 meters above sea level."
    }
  },

  // Cycle 5: The Balearic Islands & Mediterranean Coast
  {
    mcqs: [
      {
        q: "What is the largest of the Balearic Islands in the western Mediterranean, famous for the rugged Serra de Tramuntana limestone mountain range?",
        correct: "Mallorca Majorca",
        w1: "Menorca",
        w2: "Ibiza",
        exp: "Mallorca capital Palma is crowned by the Gothic Cathedral of Santa Maria (La Seu) overlooking the bay, while the Serra de Tramuntana is a UNESCO cultural landscape."
      },
      {
        q: "Which Balearic island is a designated UNESCO Biosphere Reserve, renowned for pristine turquoise coves, stone talaiot towers, and horse riding trails?",
        correct: "Menorca Minorca",
        w1: "Ibiza",
        w2: "Formentera",
        exp: "Menorca Camí de Cavalls is an ancient 185-kilometer coastal bridle path encircling the island past megalithic prehistoric T-shaped stone taulas."
      },
      {
        q: "Which Balearic island is world-renowned for electronic dance music nightlife, whitewashed architecture, and the fortified Renaissance citadel Dalt Vila?",
        correct: "Ibiza Eivissa",
        w1: "Formentera",
        w2: "Cabrera",
        exp: "Ibiza UNESCO listing honors both its biodiversity of oceanic Posidonia seagrass meadows and the ancient Phoenician archaeological settlement of Sa Caleta."
      },
      {
        q: "What coastal freshwater lagoon and national park south of Valencia is the historical cradle and agricultural origin of authentic Spanish Paella?",
        correct: "Albufera de Valencia",
        w1: "Mar Menor",
        w2: "Delta del Ebro",
        exp: "Traditional Paella Valenciana originated among rural rice farmers around Lake Albufera, cooked over orange-wood fires with bomba rice, rabbit, chicken, and green beans."
      },
      {
        q: "What is the largest saltwater lagoon in Europe, separated from the Mediterranean Sea by a 22-kilometer sand spit called La Manga in Murcia?",
        correct: "Mar Menor",
        w1: "Albufera",
        w2: "Laguna de Gallocanta",
        exp: "Mar Menor covers 170 square kilometers, known for warm shallow waters, high mineral salinity, and therapeutic mud baths at San Pedro del Pinatar."
      }
    ],
    number: {
      q: "How many main inhabited islands comprise the Balearic Islands archipelago (Mallorca, Menorca, Ibiza, and Formentera)?",
      target: 4,
      unit: "islands",
      imperial: "4 main islands",
      exp: "The Balearic Islands archipelago consists of four principal inhabited islands: Mallorca, Menorca, Ibiza, and Formentera, plus smaller uninhabited islets like Cabrera."
    }
  },

  // Cycle 6: Northern Green Spain: Galicia, Asturias & Basque Country
  {
    mcqs: [
      {
        q: "Which capital city of Galicia in northwestern Spain is the historic terminus of the Camino de Santiago pilgrimage route at its monumental Romanesque cathedral?",
        correct: "Santiago de Compostela",
        w1: "A Coruña",
        w2: "Vigo",
        exp: "According to tradition, the cathedral houses the relics of Saint James the Apostle, drawing hundreds of thousands of backpackers and pilgrims annually."
      },
      {
        q: "What dramatic limestone mountain range in Asturias, Cantabria, and León features towering peaks like Naranjo de Bulnes and the sacred Sanctuary of Covadonga?",
        correct: "Picos de Europa",
        w1: "Cantabrian Mountains",
        w2: "Sierra de Gredos",
        exp: "Created in 1918 as the National Park of the Mountain of Covadonga, it was the first national park created in Spain, famous for traditional blue Cabrales cheese."
      },
      {
        q: "Which titanium-clad contemporary art museum designed by Frank Gehry opened in 1997 on the Nervión River in Bilbao, revitalizing the Basque industrial city?",
        correct: "Guggenheim Museum Bilbao",
        w1: "Reina Sofía Museum",
        w2: "Prado Museum",
        exp: "The phenomenal economic and architectural transformation of Bilbao through cultural infrastructure became known globally as the Bilbao Effect."
      },
      {
        q: "Which coastal Basque resort city on the Bay of Biscay is celebrated for its crescent-shaped La Concha beach and having the highest concentration of Michelin stars in Europe?",
        correct: "San Sebastián Donostia",
        w1: "Bilbao",
        w2: "Vitoria-Gasteiz",
        exp: "San Sebastián is the culinary capital of Spain, legendary for its pintxos bar culture, International Film Festival, and Mount Urgull fortress."
      },
      {
        q: "What ancient Roman lighthouse in A Coruña, Galicia, built in the 1st century CE, is the oldest functioning Roman lighthouse in the world?",
        correct: "Tower of Hercules Torre de Hércules",
        w1: "Pharos of Brigantium",
        w2: "Finisterre Light",
        exp: "Rising fifty-five meters above the rocky Atlantic coast, the UNESCO World Heritage lighthouse has guided mariners for nearly two thousand years."
      }
    ],
    number: {
      q: "In what year did the landmark Frank Gehry-designed Guggenheim Museum Bilbao officially open in Spain?",
      target: 1997,
      unit: "year",
      imperial: "1997 AD",
      exp: "The Guggenheim Museum Bilbao was inaugurated on October 18, 1997, by King Juan Carlos I of Spain."
    }
  },

  // Cycle 7: Castile, La Mancha & Historic Walled Cities
  {
    mcqs: [
      {
        q: "Which UNESCO World Heritage medieval city in Castile and León is completely encircled by 2.5 kilometers of intact 11th-century granite walls with eighty-eight towers?",
        correct: "Ávila",
        w1: "Segovia",
        w2: "Salamanca",
        exp: "The medieval walls of Ávila are among the most complete city fortifications in Europe, famous as the birthplace of Christian mystic Saint Teresa of Ávila."
      },
      {
        q: "Which monumental ancient Roman granite aqueduct in central Spain was constructed around 100 CE without a single drop of mortar, spanning 800 meters across the city?",
        correct: "Aqueduct of Segovia",
        w1: "Les Ferreres Aqueduct",
        w2: "Almuñécar Aqueduct",
        exp: "The Aqueduct of Segovia consists of 167 double-tiered arches built from 20,400 dry-stacked Guadarrama granite blocks, carrying water from the Fuenfría spring."
      },
      {
        q: "Which historic city on a rocky gorge above the Tagus River was the capital of Visigothic Spain, renowned as the City of Three Cultures (Christian, Muslim, Jewish)?",
        correct: "Toledo",
        w1: "Valladolid",
        w2: "Burgos",
        exp: "Toledo was famed for its medieval Translation School and damascene steel sword manufacturing, home to Greek-Spanish painter El Greco."
      },
      {
        q: "Which group of twelve 16th-century whitewashed windmills atop the Cerro Calderico ridge in La Mancha is famously associated with Don Quixote tilting at giants?",
        correct: "Windmills of Consuegra",
        w1: "Windmills of Mota del Cuervo",
        w2: "Windmills of Valdepeñas",
        exp: "Named after characters in Cervantes novel (like Sancho and Rucio), the windmills ground wheat into flour across the arid plains of Castile-La Mancha."
      },
      {
        q: "Which fairy-tale medieval castle-palace in Segovia, shaped like the bow of a ship on a rocky crag, was a major inspiration for Walt Disney Cinderella Castle?",
        correct: "Alcázar of Segovia",
        w1: "Castillo de Coca",
        w2: "Castillo de Belmonte",
        exp: "Originally built as a Roman and Moorish fortress, the Alcázar was expanded by the Trastámara dynasty, where Isabella I was proclaimed Queen of Castile in 1474."
      }
    ],
    number: {
      q: "How many total stone arches comprise the double-tiered Roman Aqueduct of Segovia in central Spain?",
      target: 167,
      unit: "arches",
      imperial: "167 granite arches",
      exp: "The Roman Aqueduct of Segovia features exactly 167 interlocking granite arches rising up to 28.5 meters above the Plaza del Azoguejo."
    }
  },

  // Cycle 8: Spanish Wine Regions, Gastronomy & Agronomy
  {
    mcqs: [
      {
        q: "Which prestigious wine region in northern Spain along the Ebro River is world-renowned for oak-aged red wines made primarily from the Tempranillo grape?",
        correct: "La Rioja",
        w1: "Ribera del Duero",
        w2: "Priorat",
        exp: "La Rioja was the first Spanish wine region to receive the premier Denominación de Origen Calificada (DOCa) status, classified as Crianza, Reserva, and Gran Reserva."
      },
      {
        q: "What famous fortified white wine, aged through a dynamic fractional blending solera system, is produced exclusively in the Sherry Triangle around Jerez de la Frontera in Andalusia?",
        correct: "Sherry Jerez Xérès",
        w1: "Cava",
        w2: "Rueda",
        exp: "Sherry is made from Palomino, Pedro Ximénez, or Moscatel grapes grown in chalky white albariza soil, producing dry Finos under a biological yeast veil (flor)."
      },
      {
        q: "What world-renowned Spanish dry-cured ham is produced from free-range black Iberian pigs that forage on sweet acorns (bellotas) in oak dehesa forests?",
        correct: "Jamón Ibérico de Bellota",
        w1: "Jamón Serrano",
        w2: "Cecina de León",
        exp: "Cured for up to four years in mountain cellars in Jabugo and Guijuelo, the acorn diet enriches the meat with oleic acid, giving it a melt-in-the-mouth texture."
      },
      {
        q: "What percentage of the world total commercial olive oil production is supplied by the groves and mills of Spain, making it the undisputed global leader?",
        correct: "45 Percent",
        w1: "25 Percent",
        w2: "65 Percent",
        exp: "Spain produces approximately 1.3 to 1.8 million metric tons of olive oil annually, accounting for roughly forty-five percent of global olive oil output."
      },
      {
        q: "Which high-value culinary spice, hand-harvested from the purple stigmas of Crocus sativus flowers, is grown across the arid plateaus of Castile-La Mancha?",
        correct: "Saffron Azafrán",
        w1: "Paprika Pimentón",
        w2: "Turmeric",
        exp: "It requires over 150,000 hand-picked purple crocus flowers to produce one single kilogram of La Mancha saffron, the signature golden flavoring in authentic paella."
      }
    ],
    number: {
      q: "What percentage of the world total olive oil supply is produced annually by olive orchards in Spain?",
      target: 45,
      unit: "percent",
      imperial: "45% of global olive oil",
      exp: "Spain supplies roughly 45 percent of all the olive oil on Earth, centered primarily in the southern autonomous community of Andalusia."
    }
  },

  // Cycle 9: Enclaves, Straits & Maritime Passages
  {
    mcqs: [
      {
        q: "What strategic maritime strait, measuring just fourteen kilometers wide at its narrowest point, separates Spain and Europe from Morocco and the African continent?",
        correct: "Strait of Gibraltar",
        w1: "Strait of Messina",
        w2: "Strait of Bonifacio",
        exp: "The Strait of Gibraltar connects the Atlantic Ocean to the Mediterranean Sea, historically known to ancient Greeks as the Pillars of Hercules."
      },
      {
        q: "Which two autonomous Spanish cities are located as fortified enclaves directly on the North African mainland bordering Morocco?",
        correct: "Ceuta and Melilla",
        w1: "Tangier and Oran",
        w2: "Gibraltar and Algeciras",
        exp: "Ceuta and Melilla have been under Spanish sovereignty since 1580 and 1497 respectively, forming the only direct land borders of the European Union in Africa."
      },
      {
        q: "What British Overseas Territory and monolithic limestone promontory on the southern tip of the Iberian Peninsula has been under British rule since the 1713 Treaty of Utrecht?",
        correct: "Gibraltar",
        w1: "Ceuta",
        w2: "Tarifa",
        exp: "The Rock of Gibraltar rises 426 meters above the bay, home to the only wild monkey population in Europe, the free-roaming Barbary macaques."
      },
      {
        q: "What is the southernmost town on the mainland of Spain and continental Europe, located on the Strait of Gibraltar famous as a world capital for windsurfing and kitesurfing?",
        correct: "Tarifa",
        w1: "Marbella",
        w2: "Algeciras",
        exp: "Punta de Tarifa marks the exact divide between the Atlantic Ocean and Mediterranean Sea, swept by powerful Levante and Poniente winds."
      },
      {
        q: "Which volcanic nature park in Almería is the only true semi-arid hot desert climate region in mainland Europe, used as a filming location for classic Spaghetti Westerns?",
        correct: "Cabo de Gata-Níjar Natural Park",
        w1: "Tabernas Desert",
        w2: "Bardenas Reales",
        exp: "The adjacent Tabernas Desert receives less than 200 mm of annual rainfall, where director Sergio Leone filmed A Fistful of Dollars and The Good, the Bad and the Ugly."
      }
    ],
    number: {
      q: "What is the minimum width in kilometers of the Strait of Gibraltar separating Spain from North Africa?",
      target: 14,
      unit: "kilometers",
      imperial: "8.9 miles",
      exp: "At its narrowest point between Point Marroquí in Spain and Point Cires in Morocco, the Strait of Gibraltar measures approximately fourteen kilometers."
    }
  },

  // Cycle 10: Extent, 17 Autonomous Communities & Superlatives
  {
    mcqs: [
      {
        q: "Into how many first-level Autonomous Communities (Comunidades Autónomas) is the Kingdom of Spain politically divided?",
        correct: "17 Autonomous Communities",
        w1: "15 Autonomous Communities",
        w2: "20 Autonomous Communities",
        exp: "Spain consists of seventeen autonomous communities plus two autonomous cities in North Africa (Ceuta and Melilla) under the 1978 Spanish Constitution."
      },
      {
        q: "What ranking does Spain hold among the largest countries in the European Union by total geographical area (505,990 square kilometers)?",
        correct: "Second Largest in the EU",
        w1: "Largest in the EU",
        w2: "Third Largest in the EU",
        exp: "Covering over half a million square kilometers, Spain is the second largest nation in the EU after France, and fourth largest in Europe overall."
      },
      {
        q: "What massive 18th-century royal residence in Madrid, with 3,418 rooms covering 135,000 square meters, is the largest functioning royal palace by floor area in Europe?",
        correct: "Royal Palace of Madrid Palacio Real",
        w1: "Palace of Versailles",
        w2: "Buckingham Palace",
        exp: "Built on the site of a 9th-century Moorish fortress, the Palacio Real features the Royal Armoury, Stradivarius string quartet collection, and ceiling frescoes by Tiepolo."
      },
      {
        q: "Which autonomous community in central Spain is the largest autonomous community by land area in Spain, covering nearly twenty percent of national territory?",
        correct: "Castile and León Castilla y León",
        w1: "Castile-La Mancha",
        w2: "Andalusia",
        exp: "Castile and León spans 94,223 square kilometers across nine provinces, containing more UNESCO World Heritage sites than almost any administrative region in the world."
      },
      {
        q: "How many official languages are recognized in Spain (Spanish/Castilian nationwide, plus Catalan, Galician, and Basque in their respective autonomous regions)?",
        correct: "4 Official Languages",
        w1: "2 Official Languages",
        w2: "6 Official Languages",
        exp: "Article 3 of the Spanish Constitution establishes Castilian as the official state language, with Catalan/Valencian, Galician, and Basque (Euskara) co-official in their regions."
      }
    ],
    number: {
      q: "How many first-level Autonomous Communities comprise the Kingdom of Spain?",
      target: 17,
      unit: "Autonomous Communities",
      imperial: "17 Autonomous Communities",
      exp: "Spain is structured into seventeen Autonomous Communities (such as Andalusia, Catalonia, Galicia, and Madrid) plus the two autonomous cities of Ceuta and Melilla."
    }
  }
];

// Build Spain Quiz
buildQuiz({
  id: 'spain-geography-heritage-60',
  theme: 'Spain: Geography, Moorish Castles & Mediterranean Coast',
  title: 'Spain: Geography, Moorish Castles & Mediterranean Coast',
  description: 'A 60-question grand master assessment exploring the Meseta Central & Mulhacén, Gaudí & Catalonia, the Alhambra & Andalusia, Mount Teide & Canary Islands, Balearic Islands, Green Spain, Roman Segovia, and 17 Autonomous Communities.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, spainCycles);

console.log('Spain quiz built successfully!');
