const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 1. portugal-geography-heritage-60
// =========================================================================
const portugalCycles = [
  // Cycle 1: Lisbon, The Tagus & Age of Discovery
  {
    mcqs: [
      {
        q: "What is the capital and largest city of Portugal, built across seven hills overlooking the Tagus River estuary on the Atlantic coast?",
        correct: "Lisbon Lisboa",
        w1: "Porto",
        w2: "Coimbra",
        exp: "Lisbon is one of the oldest cities in Western Europe, predating London, Paris, and Rome by centuries, founded by Phoenicians around 1200 BCE."
      },
      {
        q: "Which monumental 16th-century Manueline Gothic monastery in Belém was built to celebrate Vasco da Gama voyage to India, housing his tomb?",
        correct: "Jerónimos Monastery Mosteiro dos Jerónimos",
        w1: "Batalha Monastery",
        w2: "Alcobaça Monastery",
        exp: "Financed by the five percent royal tax on eastern spices (Vintena da Pimenta), the monastery features ornate stone maritime rope and coral carvings."
      },
      {
        q: "What historic fortified stone tower on the banks of the Tagus River in Lisbon served as both a ceremonial gateway and defensive bastion for departing Portuguese caravel ships?",
        correct: "Belém Tower Torre de Belém",
        w1: "São Jorge Castle",
        w2: "Vasco da Gama Tower",
        exp: "Constructed in 1515 under King Manuel I, Belém Tower is an iconic UNESCO World Heritage symbol of Portugal Age of Discovery."
      },
      {
        q: "In what year did a catastrophic magnitude 8.5 earthquake, tsunami, and firestorm strike Lisbon on All Saints Day, destroying eighty-five percent of the city?",
        correct: "1755",
        w1: "1531",
        w2: "1807",
        exp: "The disaster led Prime Minister Marquis of Pombal to pioneer modern earthquake-resistant urban planning, creating the symmetrical grid of Baixa Pombalina."
      },
      {
        q: "Which vintage yellow tram line in Lisbon winds through the narrow, cobblestone alleys of the historic Moorish Alfama neighborhood?",
        correct: "Tram 28 Eléctrico 28",
        w1: "Tram 15",
        w2: "Tram 12",
        exp: "Operating Remodelado streetcars built in the 1930s, Tram 28 navigates tight corners and steep gradients up to fourteen percent toward São Jorge Castle."
      }
    ],
    number: {
      q: "In what historic year did the Great Lisbon Earthquake and tsunami devastate the Portuguese capital on All Saints Day?",
      target: 1755,
      unit: "year",
      imperial: "1755 AD",
      exp: "The Great Lisbon Earthquake struck on the morning of November 1, 1755, profoundly influencing European Enlightenment philosophy."
    }
  },

  // Cycle 2: The Douro Valley & Port Wine Heritage
  {
    mcqs: [
      {
        q: "Which river valley in northern Portugal, recognized as the oldest demarcated and regulated wine region in the world (established in 1756), produces Port wine?",
        correct: "Douro Valley Alto Douro",
        w1: "Dão Valley",
        w2: "Alentejo Valley",
        exp: "Prime Minister Marquis of Pombal demarcated the schist vineyard terraces of the Douro in 1756 to guarantee the quality of fortified Port wine."
      },
      {
        q: "What second largest city in Portugal, situated on the northern bank of the Douro estuary, gave its name to both Port wine and the nation of Portugal?",
        correct: "Porto",
        w1: "Braga",
        w2: "Guimarães",
        exp: "Porto historic center (Ribeira) is a UNESCO World Heritage site, famous for six bridges across the Douro, including the double-deck iron Dom Luís I Bridge."
      },
      {
        q: "What traditional flat-bottomed wooden sailing cargo boats with long steering oars were used for centuries to transport barrels of Port wine down the Douro rapids?",
        correct: "Rabelo Boats Barcos Rabelos",
        w1: "Moliceiros",
        w2: "Caravels",
        exp: "Before modern dams tamed the river, daring sailors navigated dangerous rocky rapids from inland vineyards to the wine lodges of Vila Nova de Gaia."
      },
      {
        q: "Which northern Portuguese city is celebrated as the Birthplace of the Portuguese Nation (Berço da Nação), where first King Afonso Henriques was born?",
        correct: "Guimarães",
        w1: "Braga",
        w2: "Viseu",
        exp: "Guimarães medieval castle was the royal residence where the Kingdom of Portugal was founded following the 1128 Battle of São Mamede."
      },
      {
        q: "What crisp, slightly effervescent young wine, meaning 'Green Wine', is produced in the lush, rainy Minho province of northwestern Portugal?",
        correct: "Vinho Verde",
        w1: "Madeira Wine",
        w2: "Colares Wine",
        exp: "Vinho Verde is made primarily from Alvarinho and Loureiro grapes, harvested early to preserve high acidity and refreshing citrus notes."
      }
    ],
    number: {
      q: "In what year was the Alto Douro wine region officially demarcated by the Marquis of Pombal, making it the world oldest regulated wine appellation?",
      target: 1756,
      unit: "year",
      imperial: "1756 AD",
      exp: "On September 10, 1756, King Joseph I and the Marquis of Pombal signed the charter establishing the General Company of Agriculture of the Alto Douro."
    }
  },

  // Cycle 3: Sintra & Fairy-Tale Palaces
  {
    mcqs: [
      {
        q: "Which UNESCO World Heritage town in the forested Sintra Mountains is famous for whimsical 19th-century Romanticist palaces and royal summer residences?",
        correct: "Sintra",
        w1: "Cascais",
        w2: "Mafra",
        exp: "Lord Byron described Sintra as a Glorious Eden in his poem Childe Harold Pilgrimage, celebrating its cool microclimate and exotic gardens."
      },
      {
        q: "What vivid yellow-and-red Romanticist palace perches atop a high granite peak in Sintra, commissioned by King Ferdinand II of Portugal in the 1840s?",
        correct: "Pena Palace Palácio Nacional da Pena",
        w1: "Monserrate Palace",
        w2: "Queluz Palace",
        exp: "Pena Palace blends Neo-Gothic, Neo-Manueline, Neo-Islamic, and Neo-Renaissance architecture, surrounded by a 200-hectare park containing trees from five continents."
      },
      {
        q: "What enigmatic 27-meter subterranean spiral stone staircase at Quinta da Regaleira in Sintra is known as the Initiation Well, used for esoteric Masonic and Knights Templar rites?",
        correct: "The Initiation Well Poço Iniciático",
        w1: "The Well of Souls",
        w2: "The Alchemy Well",
        exp: "The well features nine subterranean levels representing the nine circles of Dante Inferno, connected at the base by underground labyrinthine tunnels."
      },
      {
        q: "What 8th-century stone fortification built by Muslim Moors perches along the jagged granite ridge of the Sintra hills above the town?",
        correct: "Castle of the Moors Castelo dos Mouros",
        w1: "Castle of São Jorge",
        w2: "Almourol Castle",
        exp: "Surrendered to King Afonso Henriques after the 1147 Siege of Lisbon, the stone battlements offer sweeping views of the Atlantic Ocean and Mafra National Palace."
      },
      {
        q: "What is the westernmost point of the mainland of continental Europe, marked by a stone monument and lighthouse overlooking crashing Atlantic surf?",
        correct: "Cabo da Roca",
        w1: "Cabo de São Vicente",
        w2: "Ponta de Sagres",
        exp: "Celebrated by poet Luís de Camões as 'where the land ends and the sea begins' (Onde a terra acaba e o mar começa), Cabo da Roca sits at 9°30'W longitude."
      }
    ],
    number: {
      q: "What is the total depth in meters of the subterranean spiral Initiation Well (Poço Iniciático) at Quinta da Regaleira in Sintra?",
      target: 27,
      unit: "meters deep",
      imperial: "88 feet deep (9 gallery levels)",
      exp: "The Initiation Well descends twenty-seven meters into the granite earth, featuring a spiral staircase supported by fifteen sculpted arches."
    }
  },

  // Cycle 4: The Azores & Mid-Atlantic Volcanism
  {
    mcqs: [
      {
        q: "What autonomous Portuguese archipelago of nine volcanic islands sits in the North Atlantic Ocean along the triple junction of the North American, Eurasian, and African plates?",
        correct: "The Azores Açores",
        w1: "Madeira",
        w2: "Canary Islands",
        exp: "Settled by Portuguese explorers in the 1430s, the Azores feature emerald volcanic calderas, geothermal hot springs, and hydrangea-lined roads."
      },
      {
        q: "What famous twin crater lakes in a massive caldera on São Miguel Island feature one vivid green lake and one deep blue lake, linked in folklore to the tears of a shepherd and princess?",
        correct: "Sete Cidades Lagoa das Sete Cidades",
        w1: "Lagoa do Fogo",
        w2: "Lagoa das Furnas",
        exp: "Different mineral concentrations and surrounding green forest reflections give the adjoining lakes their distinct green and blue coloration."
      },
      {
        q: "What is the highest mountain peak in all of Portugal, an active stratovolcano rising 2,351 meters from the Atlantic Ocean on Pico Island?",
        correct: "Mount Pico Montanha do Pico",
        w1: "Serra da Estrela",
        w2: "Pico Ruivo",
        exp: "Pico features the UNESCO-listed Landscape of the Pico Island Vineyard Culture, where vines grow in black basalt stone enclosures (currais) protecting them from Atlantic salt winds."
      },
      {
        q: "What traditional meat and vegetable stew is cooked underground for six hours in the Furnas geothermal fumaroles of São Miguel Island?",
        correct: "Cozido das Furnas",
        w1: "Caldo Verde",
        w2: "Feijoada",
        exp: "Pots containing beef, pork, blood sausage, cabbage, and sweet potatoes are lowered into volcanic steam vents where sulfurous heat slow-cooks the stew."
      },
      {
        q: "Which island in the Azores is Europe only commercial center for tea plantation farming, operating the historic Gorreana Tea Factory since 1883?",
        correct: "São Miguel Island",
        w1: "Terceira Island",
        w2: "Faial Island",
        exp: "Gorreana produces organic black and green tea without chemical pesticides, thriving in the mild humid oceanic microclimate of the northern coast."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Mount Pico in the Azores, the highest point in all Portuguese territory?",
      target: 2351,
      unit: "meters",
      imperial: "7,713 feet",
      exp: "Mount Pico on Pico Island stands at 2,351 meters above sea level, rising steeply from the Atlantic seabed."
    }
  },

  // Cycle 5: Madeira, The Floating Garden & Levadas
  {
    mcqs: [
      {
        q: "What subtropical autonomous volcanic archipelago of Portugal, situated off the northwest coast of Africa, is nicknamed the Island of Eternal Spring and the Pearl of the Atlantic?",
        correct: "Madeira",
        w1: "The Azores",
        w2: "Cape Verde",
        exp: "Madeira is famous for the UNESCO-listed ancient subtropical Laurisilva laurel forest, fortified Madeira wine, and wicker toboggan basket rides down Monte."
      },
      {
        q: "What intricate 2,170-kilometer network of historic stone irrigation water channels carved into mountain cliffs traverses the steep terrain of Madeira?",
        correct: "Levadas",
        w1: "Acequias",
        w2: "Aqueducts",
        exp: "Built beginning in the 15th century to transport mountain rainfall from wet northern slopes to sunny southern sugarcane and banana plantations, levadas serve as popular walking trails."
      },
      {
        q: "What is the highest mountain peak on the island of Madeira, rising 1,862 meters above a sea of clouds in the central volcanic massif?",
        correct: "Pico Ruivo",
        w1: "Pico do Arieiro",
        w2: "Pico das Torres",
        exp: "A famous, breathtaking mountain trail connects Pico do Arieiro to Pico Ruivo along razor-thin ridges, carved tunnels, and vertical cliff stairways."
      },
      {
        q: "Which fortified wine produced on Madeira is uniquely aged using artificial or solar heating (estufagem) to replicate the historical heat of long tropical ship voyages?",
        correct: "Madeira Wine Vinho da Madeira",
        w1: "Port Wine",
        w2: "Moscatel de Setúbal",
        exp: "Madeira wine is virtually indestructible to oxygen and age, with centuries-old vintage bottles (Sercial, Verdelho, Bual, Malmsey) celebrated by Thomas Jefferson for toasting the US Declaration of Independence in 1776."
      },
      {
        q: "What sheer 580-meter sea cliff in southern Madeira is one of the highest ocean cliffs in Europe, featuring a glass-bottomed skywalk viewing platform?",
        correct: "Cabo Girão",
        w1: "Ponta de São Lourenço",
        w2: "Ponta do Garajau",
        exp: "The glass skywalk projects over the cliff edge, looking directly down onto terraced vineyard plots (fajãs) farmed on the narrow strip of sea floor below."
      }
    ],
    number: {
      q: "What is the vertical cliff height in meters of Cabo Girão, one of the highest ocean cliffs in Europe, located in southern Madeira?",
      target: 580,
      unit: "meters",
      imperial: "1,903 feet sheer cliff drop",
      exp: "Cabo Girão rises 580 meters vertically above the Atlantic Ocean, featuring a glass skywalk platform."
    }
  },

  // Cycle 6: The Algarve & The Golden Coast
  {
    mcqs: [
      {
        q: "What southernmost coastal region of Portugal is world-renowned for golden sandstone sea cliffs, turquoise grottos, championship golf courses, and Mediterranean sunshine?",
        correct: "The Algarve",
        w1: "The Alentejo",
        w2: "The Ribatejo",
        exp: "Derived from Arabic Al-Gharb (The West), the Algarve was the last Moorish territory conquered by the Portuguese Crown in 1249."
      },
      {
        q: "What famous sea cave near Carvoeiro features a natural circular skylight in its dome ceiling and two arched ocean entrances over a private sandy beach?",
        correct: "Benagil Cave Grutas de Benagil",
        w1: "Ponta da Piedade Caves",
        w2: "Zorreira Cave",
        exp: "Carved by rainwater erosion and ocean waves through Miocene limestone strata, Benagil Cave (Algar de Benagil) is accessible by kayak, paddleboard, or boat."
      },
      {
        q: "Which scenic headland near Lagos in the western Algarve features dramatic twisted golden rock pillars, sea arches, and hidden turquoise grottos?",
        correct: "Ponta da Piedade",
        w1: "Cape Saint Vincent",
        w2: "Ponta da Sagres",
        exp: "Ponta da Piedade is reached via a 225-step staircase down to the water, where small fishing skiffs navigate narrow arches and natural stone cathedrals."
      },
      {
        q: "What wild, windswept promontory at the southwesternmost tip of mainland Europe was considered by ancient Romans to be the edge of the known world where the sun hissed into the ocean?",
        correct: "Cape Saint Vincent Cabo de São Vicente",
        w1: "Sagres Point",
        w2: "Ponta de Sagres",
        exp: "Guarded by one of the most powerful lighthouses in Europe (visible for forty-five kilometers), Cape Saint Vincent was the spiritual departure point for Prince Henry the Navigator."
      },
      {
        q: "What massive 60-kilometer coastal barrier island and coastal lagoon system in the eastern Algarve protects thousands of migrating flamingos and chameleons?",
        correct: "Ria Formosa Natural Park",
        w1: "Ria de Alvor",
        w2: "Sado Estuary",
        exp: "Ria Formosa is one of the Seven Natural Wonders of Portugal, supporting the world largest population of short-snouted seahorses and traditional clam aquaculture."
      }
    ],
    number: {
      q: "In what year did King Afonso III complete the Reconquista in Portugal by capturing the final Moorish stronghold of Silves in the Algarve?",
      target: 1249,
      unit: "year",
      imperial: "1249 AD",
      exp: "The Portuguese Reconquista concluded in 1249 with the conquest of Faro and the Algarve, establishing Portugal modern national boundaries."
    }
  },

  // Cycle 7: Cork Oak Forests & Alentejo Plains
  {
    mcqs: [
      {
        q: "What percentage of the world total commercial wine cork stopper production is supplied by the sustainable cork oak (Quercus suber) montado forests of Portugal?",
        correct: "Over 50 Percent",
        w1: "25 Percent",
        w2: "80 Percent",
        exp: "Portugal is the undisputed global cork leader, producing roughly thirty-five million cork stoppers per day without felling a single tree."
      },
      {
        q: "Under strict Portuguese environmental laws, how many years must elapse between successive bark harvests from a living cork oak tree (sobreiro)?",
        correct: "9 Years",
        w1: "5 Years",
        w2: "15 Years",
        exp: "Skilled descortiçadores peel the outer bark with specialized axes every nine years, leaving the red under-bark intact so the tree can regenerate over its 200-year lifespan."
      },
      {
        q: "What is the largest administrative region in Portugal by geographical land area, covering one-third of the country in rolling wheat plains and olive groves?",
        correct: "The Alentejo",
        w1: "The Ribatejo",
        w2: "Centro",
        exp: "Alentejo (Beyond the Tagus) is characterized by whitewashed villages (like Monsaraz), megalithic stone circles, marble quarries, and red wine estates."
      },
      {
        q: "Which UNESCO World Heritage museum-city in the Alentejo features an exceptionally preserved 1st-century Roman Corinthian temple and the eerie Chapel of Bones?",
        correct: "Évora",
        w1: "Beja",
        w2: "Elvas",
        exp: "The Capela dos Ossos inside the Church of Saint Francis was built by 16th-century Franciscan monks using the bones and skulls of 5,000 skeletons to symbolize human mortality."
      },
      {
        q: "What prehistoric megalithic stone complex in the Alentejo near Évora, dating back to 6000 BCE, is older than Stonehenge and the largest stone circle in Iberia?",
        correct: "Almendres Cromlech Cromeleque dos Almendres",
        w1: "Anta Grande do Zambujeiro",
        w2: "Dolmen of Lacara",
        exp: "Comprising ninety-five standing granite menhirs arranged in twin elliptical enclosures, Almendres Cromlech aligned with the winter and summer solstices."
      }
    ],
    number: {
      q: "Under Portuguese forestry regulations, what is the minimum legal number of years required between successive bark harvests on a cork oak tree?",
      target: 9,
      unit: "years",
      imperial: "9 years minimum regeneration",
      exp: "By law, cork bark can only be stripped from a mature cork oak tree once every nine years to protect tree health and longevity."
    }
  },

  // Cycle 8: Fado, Tiles (Azulejos) & Gastronomy
  {
    mcqs: [
      {
        q: "What mournful, deeply expressive traditional Portuguese urban folk music genre, characterized by themes of fate, melancholy, and longing (saudade), is accompanied by the Portuguese 12-string guitar?",
        correct: "Fado",
        w1: "Flamenco",
        w2: "Morna",
        exp: "Inscribed on the UNESCO Intangible Cultural Heritage list in 2011, Fado emerged in the 1820s in the maritime taverns of Lisbon Alfama, popularized globally by Amália Rodrigues."
      },
      {
        q: "What iconic glazed, tin-enameled ceramic tiles decorating Portuguese facades, train stations, and palaces were introduced to the Iberian Peninsula by Moorish artisans?",
        correct: "Azulejos",
        w1: "Talavera",
        w2: "Zellige",
        exp: "Derived from Arabic al-zulayj (small polished stone), blue-and-white azulejos reached their artistic peak in the 18th century, seen in the São Bento railway station in Porto."
      },
      {
        q: "What famous Portuguese creamy egg-custard tart in a flaky puff pastry shell, dusted with cinnamon and powdered sugar, was created by Catholic monks at Jerónimos Monastery before 1837?",
        correct: "Pastel de Nata Pastéis de Belém",
        w1: "Queijada",
        w2: "Travesseiro",
        exp: "Monks used egg whites to starch religious habits, creating rich egg-yolk custard pastries in secret recipes baked at over 400°C for caramelized tops."
      },
      {
        q: "What dried, salted Atlantic cod fish, known in Portuguese as Bacalhau, is celebrated as the national staple with reputed 365 different recipes (one for each day of the year)?",
        correct: "Bacalhau Salted Cod",
        w1: "Sardinhas Assadas",
        w2: "Polvo à Lagareiro",
        exp: "Portuguese fishermen have sailed to the Grand Banks of Newfoundland and Greenland to salt cod since the 1500s, featured in dishes like Bacalhau à Brás."
      },
      {
        q: "What hearty traditional Portuguese soup made with shredded dark-green couve-galega kale, puréed potatoes, olive oil, and sliced chouriço sausage is a national comfort food?",
        correct: "Caldo Verde",
        w1: "Sopa da Pedra",
        w2: "Açorda Alentejana",
        exp: "Originating in the northern Minho province, Caldo Verde is traditionally served at weddings, saint feast days, and New Year celebrations."
      }
    ],
    number: {
      q: "In what year did the historic Fábrica de Pastéis de Belém in Lisbon begin commercially baking and selling authentic Pastéis de Nata based on the secret monastic recipe?",
      target: 1837,
      unit: "year",
      imperial: "1837 AD",
      exp: "The original Pastéis de Belém bakery opened its doors in 1837 next to Jerónimos Monastery, guarding the confidential recipe in a secret room."
    }
  },

  // Cycle 9: The Serra da Estrela & Continental Heights
  {
    mcqs: [
      {
        q: "What is the highest mountain range on the mainland of Portugal, rising 1,993 meters at the summit of Torre, home to Portugal only natural ski slopes?",
        correct: "Serra da Estrela Star Mountain Range",
        w1: "Serra do Gêres",
        w2: "Serra do Marão",
        exp: "Serra da Estrela is a natural park containing the Zêzere glacial valley (one of the largest in Europe) and headwaters of the Mondego River."
      },
      {
        q: "What rich, creamy, and pungent unpasteurized sheep milk cheese, curdled using wild cardoon thistles (Cynara cardunculus), is the oldest and most famous cheese in Portugal?",
        correct: "Queijo Serra da Estrela PDO",
        w1: "Queijo de Azeitão",
        w2: "Queijo de São Jorge",
        exp: "Produced during winter from Bordaleira sheep milk, the top crust is sliced off like a lid to scoop out the runny, buttery paste with a spoon."
      },
      {
        q: "What is the only official National Park in Portugal, located in the northwestern mountains along the Spanish border, famous for wild Garrano ponies and granite peaks?",
        correct: "Peneda-Gerês National Park",
        w1: "Serra da Estrela Natural Park",
        w2: "Sintra-Cascais Natural Park",
        exp: "Established in 1971 across 702 square kilometers, Peneda-Gerês preserves ancient Roman milestones on the Geira road and wolf habitats."
      },
      {
        q: "What is the longest river located entirely within Portuguese national territory, flowing 260 kilometers from Serra da Estrela into the Atlantic at Figueira da Foz?",
        correct: "Mondego River",
        w1: "Sado River",
        w2: "Vouga River",
        exp: "The Mondego flows past the historic University of Coimbra (founded in 1290), celebrated in romantic Portuguese poetry and fado."
      },
      {
        q: "What seven-meter stone tower monument on the summit of Torre in Serra da Estrela was built in the 19th century by King John VI to artificially bring the summit elevation to exactly 2,000 meters?",
        correct: "Torre Tower",
        w1: "Pico Tower",
        w2: "Estrela Monument",
        exp: "The stone tower elevates the natural 1,993-meter bedrock summit to an even 2,000 meters above sea level."
      }
    ],
    number: {
      q: "What is the natural bedrock elevation in meters above sea level of the highest peak on mainland Portugal in the Serra da Estrela?",
      target: 1993,
      unit: "meters",
      imperial: "6,539 feet",
      exp: "The natural summit of Torre in Serra da Estrela stands at 1,993 meters (raised to 2,000 m by a stone monument)."
    }
  },

  // Cycle 10: Extent, 18 Districts & Superlatives
  {
    mcqs: [
      {
        q: "What is the total land area of Portugal in square kilometers, spanning the southwestern Iberian Peninsula plus the Atlantic archipelagos of Madeira and the Azores?",
        correct: "92,212 Square Kilometers",
        w1: "55,000 Square Kilometers",
        w2: "130,000 Square Kilometers",
        exp: "Portugal mainland covers 89,015 square kilometers, while the autonomous island regions add 3,197 square kilometers across the Atlantic."
      },
      {
        q: "Into how many administrative districts on the mainland (plus two Autonomous Regions of Azores and Madeira) is the Portuguese Republic structured?",
        correct: "18 Districts and 2 Autonomous Regions",
        w1: "12 Districts and 4 Autonomous Regions",
        w2: "20 Districts and 1 Autonomous Region",
        exp: "The eighteen districts include Lisbon, Porto, Coimbra, Faro, Braga, and Setúbal, complemented by political autonomy in the Azores and Madeira."
      },
      {
        q: "What is the oldest university in Portugal and one of the oldest in Europe, founded in 1290 by King Denis, renowned for the baroque Joanina Library?",
        correct: "University of Coimbra",
        w1: "University of Lisbon",
        w2: "University of Porto",
        exp: "Perched on a hill overlooking the Mondego River, Coimbra students wear traditional black academic capes (capa e batina) that inspired J.K. Rowling Hogwarts robes."
      },
      {
        q: "What 12.3-kilometer cable-stayed bridge spanning the Tagus River estuary in Lisbon was the longest bridge in Europe when opened in 1998 for Expo 98?",
        correct: "Vasco da Gama Bridge Ponte Vasco da Gama",
        w1: "25 de Abril Bridge",
        w2: "Dom Luís I Bridge",
        exp: "Designed to withstand an earthquake four times stronger than the 1755 disaster, the bridge curved to accommodate Earth curvature across the six-mile wide estuary."
      },
      {
        q: "What massive 516-meter pedestrian suspension bridge in Arouca Geopark, suspended 175 meters above the Paiva River, is one of the longest pedestrian suspension bridges in the world?",
        correct: "516 Arouca Bridge",
        w1: "Paiva Walkway Bridge",
        w2: "Charles Kuonen Bridge",
        exp: "Opened in 2021 near the wooden Paiva Walkways, the transparent metal-grid footbridge offers thrilling views of the Aguieiras Waterfall and granite river gorge."
      }
    ],
    number: {
      q: "How many mainland administrative districts comprise the Portuguese Republic?",
      target: 18,
      unit: "districts",
      imperial: "18 administrative districts",
      exp: "Mainland Portugal is divided into eighteen administrative districts, alongside the two Atlantic autonomous island regions of Madeira and the Azores."
    }
  }
];

// Build Portugal Quiz
buildQuiz({
  id: 'portugal-geography-heritage-60',
  theme: 'Portugal: Geography, The Douro & Maritime Heritage',
  title: 'Portugal: Geography, The Douro & Maritime Heritage',
  description: 'A 60-question grand master assessment exploring Lisbon & Belém Tower (1755 earthquake), Douro Valley port wines (1756), Sintra palaces & Cabo da Roca, the Azores & Mount Pico (2,351 m), Madeira levadas, Algarve sea caves, cork forests, and Fado.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, portugalCycles);

console.log('Portugal quiz built successfully!');
