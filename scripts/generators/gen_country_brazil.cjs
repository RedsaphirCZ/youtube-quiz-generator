const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 3. brazil-geography-heritage-60
// =========================================================================
const brazilCycles = [
  // Cycle 1: Amazon River, Rainforest & Northern Basin
  {
    mcqs: [
      {
        q: "What is the largest river in the world by discharge volume, discharging roughly twenty percent of all global river flow into the Atlantic Ocean?",
        correct: "Amazon River",
        w1: "Paraná River",
        w2: "São Francisco River",
        exp: "The Amazon River discharges approximately 209,000 cubic meters of water per second, greater than the next seven largest rivers combined."
      },
      {
        q: "What natural phenomenon near Manaus occurs where the dark, acidic Rio Negro and the pale, sandy Rio Solimões flow side-by-side without mixing for six kilometers?",
        correct: "Meeting of the Waters Encontro das Águas",
        w1: "Pororoca Tidal Bore",
        w2: "Iguazu Confluence",
        exp: "Differences in water temperature, flow speed, and sediment density prevent the two major rivers from blending immediately."
      },
      {
        q: "What is the largest fluvial-marine island in the world, situated in the mouth of the Amazon River in the northern state of Pará?",
        correct: "Marajó Island",
        w1: "Bananal Island",
        w2: "Tupinambarana Island",
        exp: "Covering over 40,000 square kilometers (larger than Switzerland), Marajó is famous for wild water buffalo herds and ancient Marajoara ceramic cultures."
      },
      {
        q: "What tidal bore phenomenon on the lower Amazon River produces a surging wall of ocean water up to four meters high traveling upstream?",
        correct: "Pororoca",
        w1: "Aguagem",
        w2: "Repiquete",
        exp: "During spring new and full moons, the Atlantic tide rushes into the Amazon river mouth, creating a roaring wave that surfers ride for miles."
      },
      {
        q: "Which major inland Brazilian city on the Rio Negro grew into a wealthy metropolis during the Amazon Rubber Boom, building the opulent Teatro Amazonas opera house?",
        correct: "Manaus",
        w1: "Belém",
        w2: "Santarém",
        exp: "Manaus is the capital of Amazonas state and a free economic trade zone surrounded by millions of square kilometers of dense rainforest."
      }
    ],
    number: {
      q: "What is the approximate total length in kilometers of the Amazon River from its Peruvian Andean sources to the Atlantic Ocean?",
      target: 6400,
      unit: "kilometers",
      imperial: "3,977 miles",
      exp: "The Amazon River measures approximately 6,400 kilometers in length, flowing eastward across South America."
    }
  },

  // Cycle 2: The Pantanal Wetlands & Wildlife Sanctuaries
  {
    mcqs: [
      {
        q: "What is the world largest tropical wetland ecosystem, spanning roughly 150,000 square kilometers across Mato Grosso and Mato Grosso do Sul?",
        correct: "The Pantanal",
        w1: "The Everglades",
        w2: "The Llanos",
        exp: "The Pantanal is a vast tectonic depression flooded annually by the Paraguay River basin, hosting the highest concentration of wildlife in South America."
      },
      {
        q: "Which apex predator felid, the largest cat in the Americas, has its highest global population density along the riverbanks of the Pantanal?",
        correct: "Jaguar Onça Pintada",
        w1: "Puma Cougar",
        w2: "Ocelot",
        exp: "Pantanal jaguars are the largest in the world, weighing up to 130 kilograms and preying heavily on yacare caiman and capybaras."
      },
      {
        q: "What is the largest rodent in the world, a semi-aquatic herbivore found in abundance across Brazilian rivers, wetlands, and city parks?",
        correct: "Capybara",
        w1: "Nutria",
        w2: "Agouti",
        exp: "Capybaras can weigh over sixty kilograms, living in social family groups along riverbanks and wetland marshes."
      },
      {
        q: "What large crocodilian species, with an estimated population of over ten million individuals, thrives across the waters of the Pantanal?",
        correct: "Yacare Caiman",
        w1: "Black Caiman",
        w2: "Spectacled Caiman",
        exp: "Yacare caimans gather by the hundreds in shrinking waterholes during the dry season, feeding on piranhas, crabs, and fish."
      },
      {
        q: "What iconic, brilliant blue parrot species endemic to the Pantanal and Cerrado is the longest parrot in the world?",
        correct: "Hyacinth Macaw",
        w1: "Scarlet Macaw",
        w2: "Spix Macaw",
        exp: "With a wingspan of over 1.2 meters, the Hyacinth Macaw has a powerful beak designed to crack open hard acuri and bocaiuva palm nuts."
      }
    ],
    number: {
      q: "Approximately how many thousands of square kilometers are covered by the vast Pantanal wetland basin in Brazil?",
      target: 150,
      unit: "thousand square kilometers",
      imperial: "58,000 square miles",
      exp: "The Brazilian portion of the Pantanal spans approximately 150,000 square kilometers, extending also into Bolivia and Paraguay."
    }
  },

  // Cycle 3: The Brazilian Highlands & Planned Capital Brasília
  {
    mcqs: [
      {
        q: "Which planned federal capital city in the central Brazilian highlands was inaugurated in 1960, laid out in the shape of a giant airplane?",
        correct: "Brasília",
        w1: "Goiânia",
        w2: "Belo Horizonte",
        exp: "Designed by urban planner Lúcio Costa and architect Oscar Niemeyer, Brasília moved the national capital inland from coastal Rio de Janeiro."
      },
      {
        q: "Which visionary Brazilian president championed the construction of Brasília under the political slogan Fifty Years of Progress in Five?",
        correct: "Juscelino Kubitschek",
        w1: "Getúlio Vargas",
        w2: "João Goulart",
        exp: "President Kubitschek initiated construction in 1956 in the interior Federal District, dedicating the modernist capital on April 21, 1960."
      },
      {
        q: "Which world-renowned Brazilian architect designed the iconic modernist public monuments of Brasília, including the Cathedral of Brasília and Congress?",
        correct: "Oscar Niemeyer",
        w1: "Roberto Burle Marx",
        w2: "Lina Bo Bardi",
        exp: "Niemeyer utilized curved reinforced concrete to create soaring sculptural civic architecture, winning the 1988 Pritzker Architecture Prize."
      },
      {
        q: "What large artificial lake was created in Brasília by damming the Paranoá River to increase humidity and provide recreation for the dry highland city?",
        correct: "Lake Paranoá",
        w1: "Lake Furnas",
        w2: "Lake Sobradinho",
        exp: "Lake Paranoá covers forty square kilometers, bordered by embassies, the presidential residence (Palácio da Alvorada), and water sports clubs."
      },
      {
        q: "What expansive geological plateau region covers roughly half of Brazil land area, forming the watershed for South America major river basins?",
        correct: "Brazilian Highlands Planalto Central",
        w1: "Guiana Shield",
        w2: "Patagonian Plateau",
        exp: "The Brazilian Highlands average roughly 1,000 meters elevation, supporting diverse biomes and major agriculture in central and southeastern Brazil."
      }
    ],
    number: {
      q: "In what year was Brasília officially inaugurated as the new federal capital of Brazil?",
      target: 1960,
      unit: "year",
      imperial: "1960 AD",
      exp: "President Juscelino Kubitschek officially inaugurated Brasília on April 21, 1960, transferring federal power from Rio de Janeiro."
    }
  },

  // Cycle 4: Rio de Janeiro, Guanabara Bay & Coastal Landmarks
  {
    mcqs: [
      {
        q: "Which colossal 30-meter Art Deco statue of Jesus Christ stands atop the 710-meter Corcovado mountain overlooking Rio de Janeiro?",
        correct: "Christ the Redeemer Cristo Redentor",
        w1: "Christ of the Ozarks",
        w2: "Christ the King",
        exp: "Constructed between 1922 and 1931 from reinforced concrete and millions of soapstone mosaic tiles, it is one of the New Seven Wonders of the World."
      },
      {
        q: "What iconic 396-meter granite monolith peak rises directly from the mouth of Guanabara Bay in Rio de Janeiro, accessible by cable car?",
        correct: "Sugarloaf Mountain Pão de Açúcar",
        w1: "Pedra da Gávea",
        w2: "Two Brothers Hill",
        exp: "The Sugarloaf cable car (Bondinho) opened in 1912, providing panoramic views across Copacabana beach, Niteroi, and the Atlantic Ocean."
      },
      {
        q: "What famous coastal bay in Rio de Janeiro was named River of January by Portuguese navigators who mistakenly believed it was a river mouth in 1502?",
        correct: "Guanabara Bay",
        w1: "Todos os Santos Bay",
        w2: "Paranaguá Bay",
        exp: "Guanabara Bay is the second largest bay in Brazil, crossed by the 13.2-kilometer Rio-Niterói Bridge connecting Rio with Niterói."
      },
      {
        q: "What lush tropical national park inside the city limits of Rio de Janeiro is recognized as one of the world largest urban rainforests?",
        correct: "Tijuca National Park",
        w1: "Serra dos Órgãos",
        w2: "Itatiaia National Park",
        exp: "Emperor Pedro II ordered the reforestation of Tijuca in the 1860s to protect the municipal water supply after coffee plantations caused severe deforestation."
      },
      {
        q: "Which world-famous crescent-shaped beach in Rio de Janeiro stretches for four kilometers with a distinctive wave-patterned Portuguese stone promenade?",
        correct: "Copacabana Beach",
        w1: "Ipanema Beach",
        w2: "Barra da Tijuca",
        exp: "Copacabana is flanked by the historic Copacabana Fort and hosts the world largest New Year Eve fireworks celebration, drawing millions of revelers."
      }
    ],
    number: {
      q: "In what year was the iconic Christ the Redeemer statue officially dedicated atop Corcovado in Rio de Janeiro?",
      target: 1931,
      unit: "year",
      imperial: "1931 AD",
      exp: "Christ the Redeemer was officially inaugurated on October 12, 1931, after nine years of collaborative Franco-Brazilian construction."
    }
  },

  // Cycle 5: São Paulo, Economic Powerhouse & The Megacity
  {
    mcqs: [
      {
        q: "What is the most populous city in Brazil, the Americas, and the entire Southern Hemisphere, with an urban population over twelve million?",
        correct: "São Paulo",
        w1: "Rio de Janeiro",
        w2: "Belo Horizonte",
        exp: "São Paulo is the financial capital of Latin America, generating more than ten percent of Brazil entire national Gross Domestic Product."
      },
      {
        q: "Which iconic 2.8-kilometer avenue in São Paulo is the financial and cultural axis of the city, lined with corporate skyscrapers and the MASP art museum?",
        correct: "Avenida Paulista",
        w1: "Avenida Faria Lima",
        w2: "Avenida Rio Branco",
        exp: "Avenida Paulista sits on the highest ridge in the city, home to the São Paulo Museum of Art (MASP) designed by architect Lina Bo Bardi."
      },
      {
        q: "Which coastal port city in São Paulo state is the largest and busiest container port in Latin America, historically exporting Brazil coffee?",
        correct: "Santos",
        w1: "Paranaguá",
        w2: "Rio Grande",
        exp: "The Port of Santos handles over one hundred million tons of cargo annually, connecting the industrial heart of São Paulo to international shipping routes."
      },
      {
        q: "Which neighborhood in central São Paulo hosts the largest ethnic Japanese diaspora community outside of Japan, marked by red torii gates and lantern streetlights?",
        correct: "Liberdade",
        w1: "Bixiga",
        w2: "Bom Retiro",
        exp: "Japanese immigration to Brazil began aboard the Kasato Maru in 1908, with over 1.5 million people of Japanese descent living in Brazil today."
      },
      {
        q: "What is the largest university in Brazil and Latin America, based in São Paulo and consistently ranked among the top research universities in the Global South?",
        correct: "University of São Paulo USP",
        w1: "Federal University of Rio de Janeiro",
        w2: "UNICAMP",
        exp: "USP accounts for more than twenty percent of all scientific research papers published in Brazil, founded in 1934."
      }
    ],
    number: {
      q: "In what year did the first Japanese immigrant ship, Kasato Maru, arrive in the Port of Santos, Brazil?",
      target: 1908,
      unit: "year",
      imperial: "1908 AD",
      exp: "On June 18, 1908, the Kasato Maru docked in Santos carrying the first 781 Japanese agricultural emigrants contracted for coffee plantations."
    }
  },

  // Cycle 6: The Northeast, Caatinga & Historic Salvador
  {
    mcqs: [
      {
        q: "Which coastal city in Bahia was founded in 1549 as the first colonial capital of Brazil, famous for its Afro-Brazilian culture and historic Pelourinho district?",
        correct: "Salvador da Bahia",
        w1: "Recife",
        w2: "Fortaleza",
        exp: "Salvador was the center of the transatlantic sugar trade and Portuguese colonial administration until the capital moved to Rio de Janeiro in 1763."
      },
      {
        q: "What unique, semi-arid thorny scrubland biome covers roughly ten percent of Brazil in the dry interior Northeast, meaning 'white forest' in Tupi?",
        correct: "Caatinga",
        w1: "Cerrado",
        w2: "Pampas",
        exp: "The Caatinga is characterized by drought-adapted succulent cacti, spiny deciduous shrubs, and the endangered Lear macaw."
      },
      {
        q: "What spectacular national park in Maranhão features thousands of undulating white silica sand dunes filled with crystal-clear seasonal rainwater lagoons?",
        correct: "Lençóis Maranhenses",
        w1: "Chapada Diamantina",
        w2: "Serra da Capivara",
        exp: "Seasonal tropical rains trapped by impermeable underground rock create turquoise and green freshwater lagoons among sweeping desert-like dunes."
      },
      {
        q: "Which volcanic archipelago of twenty-one islands off the northeastern coast of Brazil is a protected marine national park famed for spinner dolphins?",
        correct: "Fernando de Noronha",
        w1: "Abrolhos Archipelago",
        w2: "Trindade Island",
        exp: "Fernando de Noronha is a UNESCO World Heritage marine sanctuary with strictly controlled visitor numbers to preserve sea turtles and coral reefs."
      },
      {
        q: "Which major coastal city in Pernambuco is nicknamed the Brazilian Venice due to its numerous rivers, canals, and bridges connecting coastal islands?",
        correct: "Recife",
        w1: "Natal",
        w2: "João Pessoa",
        exp: "Recife is famous for its neighboring colonial sister city Olinda, frevo dance culture, and 17th-century Dutch colonial rule under Johan Maurits."
      }
    ],
    number: {
      q: "In what year was Salvador da Bahia officially founded by Tomé de Sousa as the first capital of colonial Brazil?",
      target: 1549,
      unit: "year",
      imperial: "1549 AD",
      exp: "King John III of Portugal appointed Governor-General Tomé de Sousa to establish Salvador as the capital on March 29, 1549."
    }
  },

  // Cycle 7: The South, Iguazu Falls & Hydroelectric Giants
  {
    mcqs: [
      {
        q: "Which spectacular waterfall complex on the border between Brazil and Argentina features 275 individual cataracts spanning nearly three kilometers?",
        correct: "Iguazu Falls",
        w1: "Guaíra Falls",
        w2: "Paulo Afonso Falls",
        exp: "Iguazu Falls is surrounded by lush subtropical rainforests, centered on the semicircular Devil Throat (Garganta do Diabo) chasm."
      },
      {
        q: "Which colossal binational hydroelectric dam on the Paraná River between Brazil and Paraguay was the world largest energy-producing dam for decades?",
        correct: "Itaipu Dam",
        w1: "Belo Monte Dam",
        w2: "Tucuruí Dam",
        exp: "Itaipu generated over 103 million megawatt-hours in a single year, supplying substantial electricity to both Brazil and Paraguay."
      },
      {
        q: "What temperate grassland and prairie biome in the southernmost state of Rio Grande do Sul is the traditional heartland of the Gaúcho culture?",
        correct: "Pampas Campos Sulinos",
        w1: "Cerrado",
        w2: "Chaco",
        exp: "The Brazilian Pampas support extensive beef cattle ranching, mate tea (chimarrão) drinking traditions, and fertile soybean agriculture."
      },
      {
        q: "Which capital city of Paraná is internationally recognized as a pioneer in sustainable urban planning, dedicated bus rapid transit (BRT), and green recycling?",
        correct: "Curitiba",
        w1: "Porto Alegre",
        w2: "Florianópolis",
        exp: "Under urban planner and mayor Jaime Lerner, Curitiba created pedestrian-only boulevards, integrated public transit, and extensive municipal parks."
      },
      {
        q: "Which mountainous national park in Paraná and Rio Grande do Sul features the gigantic Itaimbezinho and Fortaleza canyons with vertical 700-meter cliffs?",
        correct: "Aparados da Serra National Park",
        w1: "Serra da Canastra",
        w2: "Serra do Cipó",
        exp: "The canyons expose ancient basaltic lava flows that cooled during the opening of the Atlantic Ocean, draped in native Paraná pine trees."
      }
    ],
    number: {
      q: "How many individual waterfalls and cataracts comprise the Iguazu Falls waterfall system on the Brazil-Argentina border?",
      target: 275,
      unit: "cataracts",
      imperial: "275 distinct waterfalls",
      exp: "Depending on water flow volume, Iguazu Falls consists of approximately 275 individual waterfalls plunging over basalt ledges."
    }
  },

  // Cycle 8: Biomes of Brazil: Cerrado & Atlantic Forest
  {
    mcqs: [
      {
        q: "What vast tropical savanna biome covering over twenty percent of Brazil is considered the most biologically rich savanna in the world?",
        correct: "Cerrado",
        w1: "Caatinga",
        w2: "Pampas",
        exp: "The Cerrado contains over 10,000 plant species, acting as the water cradle of Brazil by feeding the Amazon, São Francisco, and Paraná river basins."
      },
      {
        q: "What highly endangered coastal tropical biome stretching along the Atlantic coast has lost over eighty-five percent of its original forest cover?",
        correct: "Atlantic Forest Mata Atlântica",
        w1: "Amazon Forest",
        w2: "Araucaria Forest",
        exp: "Despite massive fragmentation by urban centers and agriculture, the Atlantic Forest harbors thousands of endemic species like the golden lion tamarin."
      },
      {
        q: "Which critically endangered small primate with a brilliant flame-orange mane is the flagship conservation species of the Rio de Janeiro Atlantic Forest?",
        correct: "Golden Lion Tamarin",
        w1: "Pied Tamarin",
        w2: "Emperor Tamarin",
        exp: "Intensive captive breeding and forest corridor reconnection programs helped increase the wild golden lion tamarin population back to several thousand."
      },
      {
        q: "Which distinctive evergreen conifer tree with candelabra-shaped crown branches dominates the subtropical highland forests of southern Brazil?",
        correct: "Paraná Pine Araucaria angustifolia",
        w1: "Brazil Nut Tree",
        w2: "Pau-Brasil",
        exp: "Araucaria trees produce edible pinhão pine nuts that sustain indigenous communities and wildlife like the azure jay across southern highlands."
      },
      {
        q: "What valuable tropical hardwood tree yielding rich red dye gave the nation of Brazil its modern name during early colonial Portuguese trade?",
        correct: "Pau-Brasil Brazilwood",
        w1: "Jacarandá",
        w2: "Ipê",
        exp: "Paubrasilia echinata was harvested intensively for its valuable red textile dye (brasil, meaning glowing red like an ember) throughout the 16th century."
      }
    ],
    number: {
      q: "What percentage of Brazil total land area is occupied by the biodiverse Cerrado tropical savanna biome?",
      target: 22,
      unit: "percent",
      imperial: "22% of national land area",
      exp: "The Cerrado encompasses roughly 22 percent of Brazil territory (over two million square kilometers) across the central highlands."
    }
  },

  // Cycle 9: River Networks: São Francisco & Paraná
  {
    mcqs: [
      {
        q: "Which major 2,900-kilometer river flowing entirely within Brazilian territory is known as the River of National Unity (O Velho Chico)?",
        correct: "São Francisco River",
        w1: "Tocantins River",
        w2: "Araguaia River",
        exp: "Originating in Minas Gerais, the São Francisco flows north through the arid Northeast before turning east to empty into the Atlantic between Alagoas and Sergipe."
      },
      {
        q: "What is the longest river island in the world, formed by the split of the Araguaia River in the central state of Tocantins?",
        correct: "Bananal Island",
        w1: "Marajó Island",
        w2: "Tupinambarana",
        exp: "Covering 19,162 square kilometers, Bananal Island is an indigenous sanctuary inhabited by the Karajá and Javaé peoples and a national park."
      },
      {
        q: "Which immense river basin in central-northern Brazil drains into the Atlantic near Belém, entirely separate from the Amazon drainage system?",
        correct: "Tocantins-Araguaia Basin",
        w1: "Paraná Basin",
        w2: "Parnaíba Basin",
        exp: "The Tocantins River flows northward for 2,450 kilometers, powering the massive 8,370-megawatt Tucuruí hydroelectric dam."
      },
      {
        q: "What massive multi-billion-dollar engineering project diverted water from the São Francisco River via 700 kilometers of concrete canals to drought-prone states?",
        correct: "São Francisco River Transposition Project",
        w1: "Ceará Canal Project",
        w2: "Northeastern Aqueduct",
        exp: "Completed in the 2010s and 2020s, the east and north canal axes supply fresh drinking water to twelve million people in Pernambuco, Ceará, Paraíba, and Rio Grande do Norte."
      },
      {
        q: "Which tributary of the Amazon River in western Brazil is the longest tributary on Earth, flowing over 3,250 kilometers from the Andes into the Amazon?",
        correct: "Madeira River",
        w1: "Purus River",
        w2: "Tapajós River",
        exp: "The Madeira River carries immense silt volume, named Rio Madeira (Wood River) by Portuguese explorers due to massive floating tree trunks during floods."
      }
    ],
    number: {
      q: "What is the approximate total length in kilometers of the São Francisco River (O Velho Chico)?",
      target: 2914,
      unit: "kilometers",
      imperial: "1,811 miles",
      exp: "The São Francisco River stretches approximately 2,914 kilometers from the Serra da Canastra in Minas Gerais to the Atlantic Ocean."
    }
  },

  // Cycle 10: Extent, Borders & Geographic Superlatives
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Brazil, standing at 2,995 meters near the Venezuelan border in the Serra do Imeri?",
        correct: "Pico da Neblina",
        w1: "Pico 31 de Março",
        w2: "Pico da Bandeira",
        exp: "Located in the remote Amazonian highlands of Amazonas state, Pico da Neblina (Mist Peak) is enveloped in dense clouds nearly year-round."
      },
      {
        q: "How many sovereign South American countries share a land border with Brazil, encompassing all South American nations except Chile and Ecuador?",
        correct: "10 Countries",
        w1: "8 Countries",
        w2: "12 Countries",
        exp: "Brazil borders French Guiana, Suriname, Guyana, Venezuela, Colombia, Peru, Bolivia, Paraguay, Argentina, and Uruguay across 16,885 kilometers of frontier."
      },
      {
        q: "What dramatic flat-topped sandstone tepui mountain marks the triple border junction of Brazil, Venezuela, and Guyana?",
        correct: "Mount Roraima",
        w1: "Auyán-tepui",
        w2: "Autana Tepui",
        exp: "Mount Roraima sheer 400-meter vertical cliffs and unique endemic summit flora inspired Sir Arthur Conan Doyle 1912 novel The Lost World."
      },
      {
        q: "What is the smallest state in Brazil by geographical area, located in the Northeast region along the Atlantic coast?",
        correct: "Sergipe",
        w1: "Alagoas",
        w2: "Espírito Santo",
        exp: "Covering just 21,915 square kilometers, Sergipe capital is Aracaju, situated between the states of Bahia and Alagoas."
      },
      {
        q: "Into how many federative units (states plus one Federal District) is the Federative Republic of Brazil divided?",
        correct: "26 States and 1 Federal District",
        w1: "24 States and 1 Federal District",
        w2: "28 States and 1 Federal District",
        exp: "Brazil consists of 26 autonomous states grouped into five official geopolitical regions (North, Northeast, Central-West, Southeast, and South) plus Brasília."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Pico da Neblina, the highest mountain in Brazil?",
      target: 2995,
      unit: "meters",
      imperial: "9,826 feet",
      exp: "Pico da Neblina stands at 2,995 meters elevation inside Pico da Neblina National Park in northern Amazonas state."
    }
  }
];

// Build Brazil Quiz
buildQuiz({
  id: 'brazil-geography-heritage-60',
  theme: 'Brazil: Geography, Amazon & Cultural Heritage',
  title: 'Brazil: Geography, Amazon & Cultural Heritage',
  description: 'A 60-question grand master assessment exploring the Amazon River and basin, Pantanal wetlands, Brasília architecture, Rio de Janeiro, São Paulo, Caatinga, Iguazu Falls, Cerrado, and Pico da Neblina.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, brazilCycles);

console.log('Brazil quiz built successfully!');
