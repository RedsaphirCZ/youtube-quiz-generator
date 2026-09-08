const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 1. argentina-geography-heritage-60
// =========================================================================
const argentinaCycles = [
  // Cycle 1: The Andes & Aconcagua
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in both the Western and Southern Hemispheres, rising 6,961 meters in the Argentine Andes of Mendoza?",
        correct: "Mount Aconcagua",
        w1: "Mount Ojos del Salado",
        w2: "Mount Mercedario",
        exp: "Aconcagua is the highest mountain outside Asia and the second most topographically prominent peak on Earth after Mount Everest."
      },
      {
        q: "Which iconic, jagged granite spire in Los Glaciares National Park on the border of Argentina and Chile is known in Tehuelche as Chaltén (Smoking Mountain)?",
        correct: "Mount Fitz Roy",
        w1: "Cerro Torre",
        w2: "Mount Tronador",
        exp: "First ascended in 1952 by French climbers Lionel Terray and Guido Magnone, Fitz Roy inspired the silhouette logo of the Patagonia clothing brand."
      },
      {
        q: "Which major Argentine wine-growing province at the foot of the Andes produces seventy percent of the country wine, famous for high-altitude Malbec?",
        correct: "Mendoza",
        w1: "San Juan",
        w2: "La Rioja",
        exp: "Mendoza uses an ancient canal irrigation network originally engineered by the indigenous Huarpe people, fed by melting Andean snowpack."
      },
      {
        q: "What massive advancing glacier in southern Patagonia is world-famous for its dramatic 60-meter ice cliff ruptures into Lake Argentino?",
        correct: "Perito Moreno Glacier",
        w1: "Upsala Glacier",
        w2: "Viedma Glacier",
        exp: "Unlike most glaciers retreating due to global climate change, Perito Moreno remains in dynamic equilibrium, forming ice dams that periodically burst."
      },
      {
        q: "Which mountain resort city on the shores of glacial Lake Nahuel Huapi in Río Negro is known as the Switzerland of South America for its alpine architecture and artisanal chocolate?",
        correct: "San Carlos de Bariloche",
        w1: "San Martín de los Andes",
        w2: "El Bolsón",
        exp: "Bariloche is the gateway to Nahuel Huapi National Park (Argentina oldest, created in 1934) and premier South American ski resort Cerro Catedral."
      }
    ],
    number: {
      q: "What is the official summit elevation in meters above sea level of Mount Aconcagua, the highest point in the Americas?",
      target: 6961,
      unit: "meters",
      imperial: "22,838 feet",
      exp: "Mount Aconcagua in Mendoza Province stands at an official elevation of 6,961 meters above sea level."
    }
  },

  // Cycle 2: Buenos Aires & The Río de la Plata
  {
    mcqs: [
      {
        q: "What is the widest river estuary in the world, measuring up to 220 kilometers across where it empties into the Atlantic Ocean between Argentina and Uruguay?",
        correct: "Río de la Plata River Plate",
        w1: "Amazon Estuary",
        w2: "Paraná Estuary",
        exp: "Formed by the confluence of the Paraná and Uruguay rivers, the muddy gold Río de la Plata is the maritime gateway to Buenos Aires and Montevideo."
      },
      {
        q: "What is the national capital and largest metropolitan city of Argentina, famously dubbed the Paris of South America for its Belle Époque architecture?",
        correct: "Buenos Aires",
        w1: "Córdoba",
        w2: "Rosario",
        exp: "Buenos Aires is an autonomous federal district containing forty-eight distinct barrios, including historic San Telmo, vibrant Palermo, and Puerto Madero."
      },
      {
        q: "What iconic baby-pink executive mansion and presidential office building in Buenos Aires overlooks the historic Plaza de Mayo?",
        correct: "Casa Rosada Pink House",
        w1: "Palacio Barolo",
        w2: "Cabildo",
        exp: "Legend holds the pink color originated from 19th-century whitewash mixed with oxblood, from whose balconies Eva Perón and Juan Perón addressed crowds."
      },
      {
        q: "Which colorful portside neighborhood of Buenos Aires, founded by Italian immigrants from Genoa, is famous for zinc-walled conventillos and street tango on Caminito?",
        correct: "La Boca",
        w1: "San Telmo",
        w2: "Recoleta",
        exp: "La Boca is home to the world-renowned Boca Juniors football club and their iconic stadium, La Bombonera (The Chocolate Box)."
      },
      {
        q: "What aristocratic cemetery in Buenos Aires is world-renowned for ornate Art Nouveau and neo-Classical marble mausoleums, containing the tomb of Eva Perón?",
        correct: "La Recoleta Cemetery",
        w1: "Chacarita Cemetery",
        w2: "Flores Cemetery",
        exp: "Declared a National Historic Monument, Recoleta holds Argentine presidents, Nobel laureates, and military heroes across sixty-four thousand square meters."
      }
    ],
    number: {
      q: "What is the maximum outer width in kilometers of the Río de la Plata estuary at its mouth on the Atlantic Ocean?",
      target: 220,
      unit: "kilometers",
      imperial: "137 miles wide",
      exp: "The Río de la Plata expands to a maximum width of approximately 220 kilometers between Punta del Este in Uruguay and Cabo San Antonio in Argentina."
    }
  },

  // Cycle 3: The Pampas & Gaucho Heartland
  {
    mcqs: [
      {
        q: "What vast, fertile temperate grassland plain covering 750,000 square kilometers forms the agricultural and cattle-ranching heartland of Argentina?",
        correct: "The Pampas Las Pampas",
        w1: "The Gran Chaco",
        w2: "Patagonia",
        exp: "With nutrient-rich black prairie soils (mollisols), the Pampas produce immense annual yields of soybeans, wheat, corn, and world-renowned Argentine beef."
      },
      {
        q: "What iconic nomadic horseman and folk hero of the Argentine Pampas is celebrated as a cultural symbol of rugged individualism and freedom?",
        correct: "The Gaucho",
        w1: "The Vaquero",
        w2: "The Huaso",
        exp: "Gauchos are celebrated in José Hernández epic 1872 poem Martín Fierro, famous for skills with leather boleadoras, facón knives, and bombachas trousers."
      },
      {
        q: "What traditional South American caffeine-rich herbal infusion made from the leaves of Ilex paraguariensis is drunk through a silver straw (bombilla) from a dried gourd?",
        correct: "Yerba Mate",
        w1: "Guaraná",
        w2: "Horchata",
        exp: "Mate is the national beverage and cultural ritual of Argentina, shared ceremonially in social circles where a designated cebador prepares and passes the gourd."
      },
      {
        q: "What traditional Argentine communal culinary barbecue feast involves slow-roasting beef ribs, chorizo, and morcilla over glowing charcoal or wood embers?",
        correct: "Asado",
        w1: "Churrasco",
        w2: "Parrillada",
        exp: "The asador (barbecue master) cooks cuts like tira de asado, vacío, and bife de chorizo over iron grills, traditionally served with herbaceous chimichurri sauce."
      },
      {
        q: "What extensive semi-arid alluvial lowland forest in northern Argentina, shared with Paraguay and Bolivia, is South America second largest forest biome after the Amazon?",
        correct: "The Gran Chaco",
        w1: "The Pantanal",
        w2: "The Cerrado",
        exp: "The Gran Chaco is dominated by dense hardwood quebracho trees (ax-breakers), providing high-tannin timber and habitat for giant anteaters and armadillos."
      }
    ],
    number: {
      q: "What is the approximate total surface area in thousands of square kilometers of the Argentine Pampas grassland plain?",
      target: 750,
      unit: "thousand square kilometers",
      imperial: "290,000 square miles",
      exp: "The Argentine Pampas cover approximately 750,000 square kilometers, spanning Buenos Aires, La Pampa, Santa Fe, Entre Ríos, and Córdoba provinces."
    }
  },

  // Cycle 4: Iguazu Falls & Misiones Rainforest
  {
    mcqs: [
      {
        q: "What colossal semi-circular waterfall system on the border of Argentina and Brazil features 275 individual cataracts spanning 2.7 kilometers?",
        correct: "Iguazu Falls Cataratas del Iguazú",
        w1: "Angel Falls",
        w2: "Victoria Falls",
        exp: "Surrounded by lush subtropical Atlantic Rainforest, Iguazu Falls drops up to eighty-two meters, carrying more water volume during flood than Niagara."
      },
      {
        q: "What is the largest and most spectacular 82-meter U-shaped chasm at Iguazu Falls, carrying roughly half of the entire river flow into a roaring mist basin?",
        correct: "The Devil Throat Garganta del Diablo",
        w1: "San Martín Cataract",
        w2: "Bossetti Fall",
        exp: "A 1.1-kilometer walkway across the Iguazu River leads directly to the observation platform on the brink of the Garganta del Diablo."
      },
      {
        q: "What red-soil northeastern province of Argentina borders Brazil and Paraguay, named after the 17th-century autonomous Jesuit missionary settlements?",
        correct: "Misiones Province",
        w1: "Corrientes",
        w2: "Formosa",
        exp: "Misiones contains the UNESCO-listed ruins of San Ignacio Miní, built in 1632 to protect indigenous Guaraní converts from Brazilian slave raiders (bandeirantes)."
      },
      {
        q: "What distinctive bird species, famous for nest-building inside waterfall rock crevices behind the thundering water curtains of Iguazu, is the park emblem?",
        correct: "Great Dusky Swift",
        w1: "Toco Toucan",
        w2: "Harpy Eagle",
        exp: "Flocks of thousands of Great Dusky Swifts (Cypseloides senex) dive directly through the rushing water curtain to roost safely on the wet vertical basalt cliffs."
      },
      {
        q: "What vast 12,000-square-kilometer subtropical freshwater wetland marsh in Corrientes Province is the second largest wetland on Earth after the Pantanal?",
        correct: "Iberá Wetlands Esteros del Iberá",
        w1: "Bañado la Estrella",
        w2: "Jaaukanigás",
        exp: "Esteros del Iberá contains floating vegetation islands (embalsados), harboring marsh deer, capybaras, yacare caimans, and reintroduced giant otters and jaguars."
      }
    ],
    number: {
      q: "Approximately how many distinct individual waterfall cataracts make up the Iguazu Falls system across the Argentine and Brazilian border?",
      target: 275,
      unit: "cataracts",
      imperial: "275 separate waterfalls",
      exp: "Iguazu Falls consists of approximately 275 individual cataracts along a 2.7-kilometer crescent brink, with roughly 80% located on the Argentine side."
    }
  },

  // Cycle 5: Patagonia & Tierra del Fuego
  {
    mcqs: [
      {
        q: "What windswept city in Tierra del Fuego on the shore of the Beagle Channel is internationally recognized as the Southernmost City in the World (El Fin del Mundo)?",
        correct: "Ushuaia",
        w1: "Punta Arenas",
        w2: "Río Gallegos",
        exp: "Ushuaia is the primary global maritime departure port for expedition cruises to Antarctica, framed by the Martial Glacier and Mount Olivia."
      },
      {
        q: "What 570-kilometer natural navigable sea passage discovered in 1520 cuts between mainland South America and the Tierra del Fuego archipelago?",
        correct: "Strait of Magellan Estrecho de Magallanes",
        w1: "Drake Passage",
        w2: "Beagle Channel",
        exp: "Portuguese explorer Ferdinand Magellan navigated the stormy passage during the first global circumnavigation, naming the Pacific Ocean for its calm waters upon exit."
      },
      {
        q: "What UNESCO World Heritage archaeological cave site in Santa Cruz preserves thousands of stenciled human handprints painted by indigenous hunter-gatherers 9,000 years ago?",
        correct: "Cueva de las Manos Cave of the Hands",
        w1: "Los Toldos",
        w2: "Piedra Museo",
        exp: "Located in the Pinturas River canyon, hunter-gatherers used bone blowout pipes with mineral pigments to create layered stencils of hands, guanacos, and hunting scenes."
      },
      {
        q: "What protected peninsula in Chubut is world-renowned for coastal nursery breeding grounds of Southern Right Whales and beach-hunting orcas?",
        correct: "Valdés Peninsula Península Valdés",
        w1: "Punta Tombo",
        w2: "Cabo Dos Bahías",
        exp: "Valdés Peninsula features unique predatory behavior where transient killer whales intentionally beach themselves on pebbled shallows to capture sea lion pups."
      },
      {
        q: "What is the longest national highway in Argentina, spanning 5,194 kilometers parallel to the Andes mountains from La Quiaca on the Bolivian border to Cabo Vírgenes?",
        correct: "National Route 40 Ruta 40",
        w1: "National Route 3",
        w2: "National Route 7",
        exp: "Ruta 40 crosses eleven provinces, twenty national parks, twenty-seven high mountain passes, and eighteen major rivers, reaching 5,000 meters at Abra del Acay."
      }
    ],
    number: {
      q: "In what historic year did Portuguese navigator Ferdinand Magellan discover and navigate the Strait of Magellan across southern South America?",
      target: 1520,
      unit: "year",
      imperial: "1520 AD",
      exp: "Magellan entered the Atlantic mouth of the strait on October 21, 1520, exiting into the Pacific Ocean on November 28, 1520."
    }
  },

  // Cycle 6: The Northwest: Salta, Jujuy & The High Puna
  {
    mcqs: [
      {
        q: "What UNESCO World Heritage 155-kilometer mountain canyon in Jujuy Province follows the Rio Grande, celebrated for indigenous Quechua culture and colorful mineral strata?",
        correct: "Quebrada de Humahuaca",
        w1: "Quebrada de las Conchas",
        w2: "Quebrada de las Flechas",
        exp: "Humahuaca has served as a major Andean trade corridor for 10,000 years, connecting the high altiplano with the fertile valleys of northwest Argentina."
      },
      {
        q: "Which picturesque mountain village in the Quebrada de Humahuaca is famed for the Hill of Seven Colors (Cerro de los Siete Colores), displaying vivid geological bands?",
        correct: "Purmamarca",
        w1: "Tilcara",
        w2: "Humahuaca",
        exp: "The seven distinct color bands were formed over 600 million years by sea, lake, and river sedimentations containing copper, manganese, iron, and clay oxides."
      },
      {
        q: "What massive 212-square-kilometer white salt flat sitting at 3,450 meters elevation in Jujuy and Salta is one of the largest salt deserts in Argentina?",
        correct: "Salinas Grandes",
        w1: "Salar de Arizaro",
        w2: "Salar de Pocitos",
        exp: "Local salt miners dig turquoise rectangular extraction pools where pure mineral sodium chloride crusts are cut into blocks and artisanal salt handicrafts."
      },
      {
        q: "What famous tourist heritage railway in Salta climbs into the Andes, crossing the dramatic 63-meter-high curved steel La Polvorilla Viaduct at 4,220 meters altitude?",
        correct: "Tren a las Nubes Train to the Clouds",
        w1: "Old Patagonian Express",
        w2: "Tren del Fin del Mundo",
        exp: "Engineered by American civil engineer Richard Maury without cogwheels or racks, the railway uses zigzags and loops to climb into the high Puna plateau."
      },
      {
        q: "Which high-altitude wine valley in Salta, located at 1,700 to 3,000 meters elevation around Cafayate, is famous for crisp, floral Torrontés white wine?",
        correct: "Calchaquí Valleys",
        w1: "Uco Valley",
        w2: "Pedernal Valley",
        exp: "Extreme diurnal temperature swings and intense ultraviolet sunlight create thick grape skins, producing highly aromatic and fruity Torrontés Riojano wines."
      }
    ],
    number: {
      q: "What is the altitude in meters above sea level of the La Polvorilla steel railway viaduct on the Tren a las Nubes in Salta?",
      target: 4220,
      unit: "meters",
      imperial: "13,845 feet altitude",
      exp: "La Polvorilla viaduct sits at 4,220 meters above sea level, one of the highest railway crossings in the world."
    }
  },

  // Cycle 7: Argentine Paleontology & Giant Dinosaurs
  {
    mcqs: [
      {
        q: "What colossal titanosaurian sauropod dinosaur discovered in Neuquén Province in 1987 is estimated at 35 to 40 meters in length and over seventy tons in weight?",
        correct: "Argentinosaurus huinculensis",
        w1: "Patagotitan mayorum",
        w2: "Giganotosaurus",
        exp: "A single fossilized vertebra of Argentinosaurus measures over 1.5 meters tall, representing one of the largest land animals ever to walk on Earth."
      },
      {
        q: "What massive 37-meter titanosaur dinosaur skeleton discovered in Chubut in 2014 was described as the most complete giant sauropod ever unearthed?",
        correct: "Patagotitan mayorum",
        w1: "Dreadnoughtus",
        w2: "Saltasaurus",
        exp: "Discovered by a farmhand in the Patagonian desert, Patagotitan cast is now displayed at the American Museum of Natural History and MEF in Trelew."
      },
      {
        q: "Which giant carnivorous theropod dinosaur discovered in the Candeleros Formation of Patagonia was even larger than Tyrannosaurus rex, measuring thirteen meters long?",
        correct: "Giganotosaurus carolinii",
        w1: "Carnotaurus",
        w2: "Mapusaurus",
        exp: "Giganotosaurus possessed an eight-ton body, a 1.6-meter skull with serrated dagger teeth, and hunted giant titanosaurs in the Cretaceous floodplains."
      },
      {
        q: "Which UNESCO World Heritage desert park in San Juan Province, nicknamed the Valley of the Moon (Valle de la Luna), preserves a complete record of the Triassic Period?",
        correct: "Ischigualasto Provincial Park",
        w1: "Talampaya National Park",
        w2: "Sierra de las Quijadas",
        exp: "Ischigualasto contains the world earliest known dinosaur fossils (Herrerasaurus and Eoraptor, 230 Ma) alongside bizarre eroded rock formations like The Submarine."
      },
      {
        q: "What famous horned predatory theropod dinosaur discovered in Chubut possessed prominent bull-like horns above its eyes and extremely reduced vestigial forelimbs?",
        correct: "Carnotaurus sastrei",
        w1: "Abelisaurus",
        w2: "Megaraptor",
        exp: "Meaning 'meat-eating bull', Carnotaurus is known from a single remarkably complete skeleton that preserved extensive fossilized skin impressions showing pebbled scales."
      }
    ],
    number: {
      q: "What is the estimated maximum total body length in meters of the colossal Argentine sauropod dinosaur Argentinosaurus?",
      target: 35,
      unit: "meters",
      imperial: "115 feet long",
      exp: "Paleontological reconstructions estimate Argentinosaurus measured approximately 35 to 40 meters from head to tail."
    }
  },

  // Cycle 8: Lakes, Fjords & Nahuel Huapi
  {
    mcqs: [
      {
        q: "What is the oldest national park in Argentina, established in 1934 surrounding a 530-square-kilometer glacial lake in northern Patagonia?",
        correct: "Nahuel Huapi National Park",
        w1: "Los Glaciares National Park",
        w2: "Lanín National Park",
        exp: "Originally founded on land donated in 1903 by explorer Francisco Pascasio Moreno (Perito Moreno), the park preserves temperate Valdivian rainforests."
      },
      {
        q: "What iconic conical snow-capped volcano on the border of Neuquén Province and Chile rises 3,776 meters in Lanín National Park, sacred to the Mapuche people?",
        correct: "Lanín Volcano",
        w1: "Mount Tronador",
        w2: "Domuyo Volcano",
        exp: "Lanín is an extinct or dormant stratovolcano surrounded by forests of prehistoric Monkey Puzzle trees (Araucaria araucana)."
      },
      {
        q: "What is the largest lake in Argentina, covering 1,466 square kilometers in Santa Cruz Province, fed by the meltwater of Los Glaciares National Park?",
        correct: "Lake Argentino Lago Argentino",
        w1: "Lake Viedma",
        w2: "Lake Buenos Aires",
        exp: "Lake Argentino has an average depth of 150 meters and reaches a maximum depth of 500 meters, famous for floating turquoise icebergs calved from Perito Moreno."
      },
      {
        q: "What unique, slow-growing conifer tree with reddish-orange bark, native to the temperate rainforests of Arrayanes National Park near Villa La Angostura, forms pure forest stands?",
        correct: "Arrayán Luma apiculata",
        w1: "Alerce Fitzroya",
        w2: "Coihue",
        exp: "The Bosque de Arrayanes on the Quetrihué Peninsula is one of the few pure arrayán forests on Earth, with 300-year-old trees displaying distinctive cinnamon-colored trunks."
      },
      {
        q: "What massive glacial lake shared between Santa Cruz in Argentina and Aysén in Chile is the second largest lake in South America after Lake Titicaca?",
        correct: "Lake Buenos Aires Lake General Carrera",
        w1: "Lake San Martín",
        w2: "Lake Fagnano",
        exp: "Covering 1,850 square kilometers, the lake drains into the Pacific Ocean via the Baker River and is famous for the sculpted Marble Caves (Capillas de Mármol)."
      }
    ],
    number: {
      q: "In what year was Nahuel Huapi National Park officially created as Argentina first national park?",
      target: 1934,
      unit: "year",
      imperial: "1934 AD",
      exp: "Nahuel Huapi was formally established under National Law 12,103 on October 9, 1934, pioneering South American national park conservation."
    }
  },

  // Cycle 9: Atlantic Coastline, Wildlife & Marine Reserves
  {
    mcqs: [
      {
        q: "Which coastal nature reserve in Chubut Province hosts the largest continental nesting colony of Magellanic penguins on Earth, exceeding 500,000 birds?",
        correct: "Punta Tombo",
        w1: "Cabo Dos Bahías",
        w2: "Monte León",
        exp: "Magellanic penguins arrive each September to mate and lay eggs in sandy burrows, protected along a three-kilometer coastal gravel spit."
      },
      {
        q: "What major coastal resort city on the Atlantic coast of Buenos Aires Province is Argentina premier summer beach vacation destination?",
        correct: "Mar del Plata",
        w1: "Pinamar",
        w2: "Villa Gesell",
        exp: "Known as La Ciudad Feliz (The Happy City), Mar del Plata is famous for its massive Central Casino, iconic sea lion bronze statues, and seafood port."
      },
      {
        q: "What massive cold marine ocean current flows northward along the Argentine continental shelf, bringing nutrient-rich Antarctic waters that feed vast squid and hake fisheries?",
        correct: "Malvinas Current Falkland Current",
        w1: "Brazil Current",
        w2: "Humboldt Current",
        exp: "The convergence of the cold Malvinas Current and the warm Brazil Current creates one of the most productive marine biodiversity mixing zones on Earth."
      },
      {
        q: "What semi-aquatic rodent species, the largest living rodent on Earth, weighing up to sixty-five kilograms, lives in family groups across Argentine riverbanks?",
        correct: "Capybara Carpincho",
        w1: "Nutria Coypu",
        w2: "Mara Patagonian Hare",
        exp: "Capybaras (Hydrochoerus hydrochaeris) are widespread in the Esteros del Iberá, feeding on aquatic plants and swimming with webbed feet."
      },
      {
        q: "Which unique, long-legged rodent species endemic to the arid open brushlands of Patagonia resembles a small deer or hare, monogamous for life?",
        correct: "Patagonian Mara Dolichotis patagonum",
        w1: "Chinchilla",
        w2: "Vizcacha",
        exp: "Patagonian maras live in communal underground dens (warrens) where several pairs nurse their young together, capable of running up to 45 km/h."
      }
    ],
    number: {
      q: "What is the approximate population in thousands of Magellanic penguins that congregate to nest annually at Punta Tombo in Chubut?",
      target: 500,
      unit: "thousand penguins",
      imperial: "500,000 Magellanic penguins",
      exp: "Punta Tombo hosts over 500,000 nesting Magellanic penguins (Spheniscus magellanicus) during the peak breeding season between September and April."
    }
  },

  // Cycle 10: Extent, 23 Provinces & Argentine Superlatives
  {
    mcqs: [
      {
        q: "Into how many first-level federal provinces (plus the Autonomous City of Buenos Aires) is the Argentine Republic administratively divided?",
        correct: "23 Provinces and 1 Autonomous City",
        w1: "20 Provinces and 1 Federal District",
        w2: "25 Provinces and 2 Autonomous Cities",
        exp: "Argentina is a federal republic comprising twenty-three provinces (from Jujuy in the north to Tierra del Fuego in the south) and the capital city CABA."
      },
      {
        q: "What ranking does the Argentine Republic hold among the largest sovereign countries in the world by geographical land area (2.78 million sq km)?",
        correct: "Eighth Largest Country",
        w1: "Fifth Largest Country",
        w2: "Twelfth Largest Country",
        exp: "Argentina is the second largest country in South America (after Brazil) and the eighth largest in the world, spanning thirty-three degrees of latitude."
      },
      {
        q: "What is the lowest natural point on land in both South America and the entire Western and Southern Hemispheres, a salt endorheic depression sitting 105 meters below sea level?",
        correct: "Laguna del Carbón",
        w1: "Valdés Salt Pan",
        w2: "Salina Grande de Hidalgo",
        exp: "Located in the Gran Bajo de San Julián in Santa Cruz Province, Laguna del Carbón is the seventh lowest point on Earth."
      },
      {
        q: "What is the largest province in Argentina by geographical land area and population, home to nearly forty percent of the country total population?",
        correct: "Buenos Aires Province",
        w1: "Córdoba Province",
        w2: "Santa Fe Province",
        exp: "Buenos Aires Province covers 307,571 square kilometers (excluding the autonomous federal capital city), with its provincial capital at La Plata."
      },
      {
        q: "Which vast southern region of Argentina and Chile, south of the Colorado River, derives its name from Ferdinand Magellan describing indigenous Tehuelche giants (Patagones)?",
        correct: "Patagonia",
        w1: "The Pampas",
        w2: "Cuyo",
        exp: "Magellan encountered tall Tehuelche hunters wearing guanaco-fur moccasins, naming them Patagones (big feet), which gave the legendary southern territory its name."
      }
    ],
    number: {
      q: "How many meters below mean sea level is Laguna del Carbón in Santa Cruz, the lowest point in South America and the Western Hemisphere?",
      target: 105,
      unit: "meters below sea level",
      imperial: "344 feet below sea level",
      exp: "Laguna del Carbón in the San Julián Great Depression of Santa Cruz Province sits at exactly 105 meters below sea level."
    }
  }
];

// Build Argentina Quiz
buildQuiz({
  id: 'argentina-geography-heritage-60',
  theme: 'Argentina: Geography, The Andes & Patagonian Glaciers',
  title: 'Argentina: Geography, The Andes & Patagonian Glaciers',
  description: 'A 60-question grand master assessment exploring Mount Aconcagua, Buenos Aires & the River Plate, the Pampas & gaucho heritage, Iguazu Falls (275 cataracts), Ushuaia & Tierra del Fuego, Quebrada de Humahuaca, giant dinosaurs, and Patagonia.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, argentinaCycles);

console.log('Argentina quiz built successfully!');
