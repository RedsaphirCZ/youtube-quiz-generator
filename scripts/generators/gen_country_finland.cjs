const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 1. finland-geography-heritage-60
// =========================================================================
const finlandCycles = [
  // Cycle 1: Land of a Thousand Lakes & Saimaa
  {
    mcqs: [
      {
        q: "Approximately how many natural freshwater lakes larger than 500 square meters are scattered across the territory of Finland, earning its title as the Land of a Thousand Lakes?",
        correct: "Over 188,000 Lakes",
        w1: "50,000 Lakes",
        w2: "100,000 Lakes",
        exp: "According to the Finnish Environment Institute, Finland contains 187,888 surveyed lakes and 178,947 islands."
      },
      {
        q: "What is the largest lake in Finland and fourth largest natural freshwater lake in Europe, covering 4,400 square kilometers in southeastern Finland?",
        correct: "Lake Saimaa",
        w1: "Lake Inari",
        w2: "Lake Päijänne",
        exp: "Formed after the retreat of Ice Age glaciers, Saimaa features 14,000 islands and a labyrinthine shoreline longer than that of France or Greece."
      },
      {
        q: "What critically endangered, ultra-rare freshwater seal subspecies (with fewer than 450 surviving individuals) is endemic exclusively to Lake Saimaa in Finland?",
        correct: "Saimaa Ringed Seal Pusa hispida saimensis",
        w1: "Baikal Seal",
        w2: "Ladoga Ringed Seal",
        exp: "Trapped in Lake Saimaa when land uplift cut off access to the Baltic Sea 9,500 years ago, volunteers build man-made snowdrifts to help pups survive warmer winters."
      },
      {
        q: "What massive 120-kilometer underground rock water pipeline tunnels fresh drinking water from Lake Päijänne to the metropolitan area of Helsinki?",
        correct: "Päijänne Water Tunnel",
        w1: "Saimaa Canal",
        w2: "Vantaa Aqueduct",
        exp: "It is the second longest continuous rock tunnel in the world, gravity-feeding 100 meters underground through solid Precambrian granite bedrock."
      },
      {
        q: "What 43-kilometer international waterway connects Lake Saimaa directly to the Gulf of Finland on the Baltic Sea, featuring eight lock gates?",
        correct: "The Saimaa Canal",
        w1: "Göta Canal",
        w2: "Kiel Canal",
        exp: "Opened in 1856, the Saimaa Canal allows timber freighters and tourist passenger ships to sail from inland lake ports directly into open sea."
      }
    ],
    number: {
      q: "What is the approximate total number of surveyed natural freshwater lakes in thousands across the country of Finland?",
      target: 188,
      unit: "thousand lakes",
      imperial: "188,000+ natural lakes",
      exp: "Finland contains approximately 188,000 official lakes (specifically 187,888 lakes larger than 500 square meters)."
    }
  },

  // Cycle 2: Helsinki, Suomenlinna & The Rock Church
  {
    mcqs: [
      {
        q: "What capital city of Finland, situated on a peninsula in the Gulf of Finland, is celebrated for neoclassical and functionalist architecture, and the Esplanadi boulevard?",
        correct: "Helsinki Helsingfors",
        w1: "Tampere",
        w2: "Turku",
        exp: "Founded in 1550 by Swedish King Gustav I, Helsinki was redesigned in the 1810s by Carl Ludvig Engel around Senate Square and Helsinki Cathedral."
      },
      {
        q: "What monumental 18th-century sea fortress built across six islands in Helsinki harbor, originally named Sveaborg by Sweden, is a UNESCO World Heritage site?",
        correct: "Suomenlinna Fortress of Finland",
        w1: "Olavinlinna",
        w2: "Turku Castle",
        exp: "Constructed in 1748 under Augustin Ehrensvärd to defend against Russian imperial expansion, Suomenlinna features six kilometers of defensive granite walls and 100 cannons."
      },
      {
        q: "What unique modernist Lutheran church in the Töölö neighborhood of Helsinki, completed in 1969 by Timo and Tuomo Suomalainen, was quarried directly into solid granite bedrock?",
        correct: "Temppeliaukio Rock Church",
        w1: "Kamppi Chapel of Silence",
        w2: "Helsinki Cathedral",
        exp: "Covered by a copper dome suspended by 180 glass skylights, the exposed raw granite walls provide sublime acoustic resonance for classical music concerts."
      },
      {
        q: "What award-winning central public library in Helsinki, opened in December 2018 for the centenary of Finnish independence, features a swooping curved spruce wood facade?",
        correct: "Helsinki Central Library Oodi",
        w1: "Kiasma",
        w2: "Ateneum",
        exp: "Designed by ALA Architects, Oodi functions as an open civic living room featuring 3D-printing workshops, recording studios, gaming rooms, and book trees."
      },
      {
        q: "What is the oldest city in Finland and its former capital until 1812, situated on the Aura River in the southwest?",
        correct: "Turku Åbo",
        w1: "Tampere",
        w2: "Oulu",
        exp: "Founded in the 13th century, Turku features the medieval Turku Castle (1280), Turku Cathedral, and annually proclaims the national Christmas Peace of Finland."
      }
    ],
    number: {
      q: "In what year was the famous subterranean Temppeliaukio Rock Church officially completed and consecrated in Helsinki, Finland?",
      target: 1969,
      unit: "year",
      imperial: "1969 AD",
      exp: "Temppeliaukio Church was completed in 1969, welcoming nearly one million visitors annually."
    }
  },

  // Cycle 3: Finnish Lapland, Rovaniemi & The Arctic Circle
  {
    mcqs: [
      {
        q: "What is the northernmost geographical region of Finland, covering one-third of the country territory within the Arctic Circle, known for northern lights and reindeer?",
        correct: "Finnish Lapland Lappi",
        w1: "Kainuu",
        w2: "Ostrobothnia",
        exp: "Lapland experiences the Polar Night (Kaamos) with weeks of permanent twilight in winter, and the Midnight Sun with 24-hour continuous daylight in summer."
      },
      {
        q: "Which official capital of Finnish Lapland, situated at the confluence of the Kemijoki and Ounasjoki rivers on the Arctic Circle (66.5°N), is celebrated worldwide as the Official Hometown of Santa Claus?",
        correct: "Rovaniemi",
        w1: "Ivalo",
        w2: "Inari",
        exp: "Santa Claus Village in Rovaniemi straddles the Arctic Circle line, where visitors cross the painted boundary line and send postcards stamped with the Arctic Circle postmark."
      },
      {
        q: "What is the highest mountain peak in Finland, rising 1,324 meters on the slopes of the Scandinavian Mountains in the far northwestern Enontekiö arm?",
        correct: "Halti Mount Halti",
        w1: "Saana",
        w2: "Ylläs",
        exp: "The true summit of Halti (1,365 m) lies in Norway; the highest point on Finnish sovereign soil is a rocky mountain ridge called Hálditšohkka at 1,324 meters."
      },
      {
        q: "What sacred flat-topped table mountain (fjell) above Kilpisjärvi in Finnish Lapland rises 1,029 meters, sacred to the indigenous Sámi people for millennia?",
        correct: "Saana Fjell",
        w1: "Levi",
        w2: "Ruka",
        exp: "Saana was formed during the Caledonian mountain-building period, surrounded by Arctic-alpine tundra and the Three-Country Cairn where Finland, Sweden, and Norway meet."
      },
      {
        q: "What large subarctic lake in northern Lapland is the sacred cultural heart of the Finnish Sámi people, home to the Ukonkivi sacred sacrifice island?",
        correct: "Lake Inari Inarijärvi",
        w1: "Lake Oulujärvi",
        w2: "Lake Pielinen",
        exp: "Lake Inari contains over 3,300 islands and freezes from November to June, home to the Sámi Parliament of Finland (Sámediggi) in the village of Inari."
      }
    ],
    number: {
      q: "At what degree North latitude is the Arctic Circle line located as it crosses through the city of Rovaniemi in Finnish Lapland?",
      target: 66,
      unit: "degrees North",
      imperial: "66.5°N latitude",
      exp: "The Arctic Circle crosses Rovaniemi at approximately 66.5 degrees North latitude (rounded to 66°N)."
    }
  },

  // Cycle 4: Sauna Culture & The Philosophy of Sisu
  {
    mcqs: [
      {
        q: "What UNESCO-inscribed cornerstone of Finnish national identity and daily wellbeing is so ubiquitous that Finland has over 3.3 million of them for a population of 5.5 million people?",
        correct: "The Finnish Sauna Culture",
        w1: "Ice Swimming Avanto",
        w2: "Mökki Summer Cottages",
        exp: "Sauna is a sacred ritual of physical purification and mental relaxation, where water (löyly) is cast onto hot stones in wood-fired or electric stoves."
      },
      {
        q: "What traditional bundle of fresh, fragrant birch twigs is used in Finnish saunas to gently whisk the skin, stimulating blood circulation and releasing birch oils?",
        correct: "Vihta Vasta",
        w1: "Löyly",
        w2: "Kiukaus",
        exp: "Harvested in early summer when birch leaves are rich in natural essential oils, vihtas are soaked in warm water before being tapped across shoulders and back."
      },
      {
        q: "What unique, untranslatable Finnish cultural concept and psychological trait represents stoic determination, gritty perseverance, courage, and relentless willpower in the face of adversity?",
        correct: "Sisu",
        w1: "Lagom",
        w2: "Hygge",
        exp: "Sisu is considered the core national character trait that enabled Finland to withstand harsh subarctic winters and achieve independence during the 1939 Winter War."
      },
      {
        q: "What popular Finnish winter wellness practice involves cutting a hole in frozen lake or sea ice (avanto) to take a therapeutic dip in freezing water immediately after heating up in a hot sauna?",
        correct: "Avanto Ice Swimming Avantouinti",
        w1: "Hiihdä",
        w2: "Mökkielämä",
        exp: "The extreme contrast between 90°C sauna heat and 1°C freezing lake water triggers endorphin releases, improving circulation and reducing inflammation."
      },
      {
        q: "What is the oldest public public sauna still operating in Finland, built in 1906 in the Pispala district of Tampere (the Sauna Capital of the World)?",
        correct: "Rajaportti Sauna Rajaportin sauna",
        w1: "Löyly Helsinki",
        w2: "Kotiharjun Sauna",
        exp: "Rajaportti uses a massive one-ton wood-fired brick masonry stove, maintaining original 20th-century communal bathing traditions in Tampere."
      }
    ],
    number: {
      q: "Approximately how many millions of saunas exist across the country of Finland for its national population of 5.5 million residents?",
      target: 3,
      unit: "million saunas",
      imperial: "3.3 million saunas (nearly one per household)",
      exp: "Finland has an estimated 3.3 million saunas (rounded to 3 million), located in private apartments, lakeside summer cottages, and even corporate boardrooms."
    }
  },

  // Cycle 5: Olavinlinna Castle & The Saimaa Archipelago
  {
    mcqs: [
      {
        q: "What magnificent 15th-century three-towered stone castle on a rocky islet in Savonlinna is the northernmost medieval stone fortress still standing in the world?",
        correct: "Olavinlinna Castle St. Olaf Castle",
        w1: "Turku Castle",
        w2: "Häme Castle",
        exp: "Founded in 1475 by Danish knight Erik Axelsson Tott to guard the eastern Swedish-Russian frontier, it hosts the world-famous annual Savonlinna Opera Festival."
      },
      {
        q: "What world-renowned month-long classical music festival, held every July inside the grand stone courtyard of Olavinlinna Castle, was founded by soprano Aino Ackté in 1912?",
        correct: "Savonlinna Opera Festival",
        w1: "Helsinki Festival",
        w2: "Kuhmo Chamber Music",
        exp: "The castle courtyard is roofed with an acoustic canvas tent, welcoming 70,000 international opera aficionados annually to enjoy world-class staging."
      },
      {
        q: "What famous national park in eastern Finland, featuring scenic Koli Hill (Ukko-Koli) rising 347 meters above Lake Pielinen, is recognized as the National Landscape of Finland?",
        correct: "Koli National Park",
        w1: "Oulanka National Park",
        w2: "Repovesi National Park",
        exp: "The quartzite cliffs of Koli inspired composer Jean Sibelius, painter Eero Järnefelt, and author Juhani Aho to create quintessential Finnish Romantic nationalist masterworks."
      },
      {
        q: "What autonomous, demilitarized Swedish-speaking archipelago of over 6,700 islands sits at the entrance to the Gulf of Bothnia between Finland and Sweden?",
        correct: "The Åland Islands Ahvenanmaa",
        w1: "Turku Archipelago",
        w2: "Kvarken Archipelago",
        exp: "Settled under a 1921 League of Nations treaty, Åland has its own parliament, flag, postage stamps, and is entirely Swedish-speaking within the Republic of Finland."
      },
      {
        q: "What UNESCO World Heritage archipelago in the Gulf of Bothnia features unique De Geer moraine ridges created by melting continental glaciers, rising out of the sea via post-glacial land uplift?",
        correct: "The Kvarken Archipelago Merenkurkku",
        w1: "Åland Archipelago",
        w2: "Turku Archipelago",
        exp: "Rising at nearly one centimeter per year, roughly one square kilometer of new land emerges from the sea annually, linked jointly with Sweden High Coast."
      }
    ],
    number: {
      q: "In what year did Danish-Swedish knight Erik Axelsson Tott begin construction of the historic stone fortress of Olavinlinna in Savonlinna, Finland?",
      target: 1475,
      unit: "year",
      imperial: "1475 AD",
      exp: "Construction of Olavinlinna Castle commenced in 1475, dedicated to Saint Olaf."
    }
  },

  // Cycle 6: Technology, Nokia & Scientific Innovations
  {
    mcqs: [
      {
        q: "Which Finnish telecommunications company, founded in 1865 as a wood-pulp paper mill along the Nokianvirta river, became the world largest manufacturer of mobile phones from 1998 to 2011?",
        correct: "Nokia",
        w1: "Ericsson",
        w2: "Vaisala",
        exp: "Nokia iconic models like the 3310 (famed for indestructibility and the game Snake) and the Nokia Tune ringtone shaped early global mobile communications."
      },
      {
        q: "Which Finnish-American computer software engineer created the open-source Linux operating system kernel in 1991 while a student at the University of Helsinki?",
        correct: "Linus Torvalds",
        w1: "Esa-Pekka Salonen",
        w2: "Teemu Selänne",
        exp: "Torvalds posted his hobby project on a Usenet newsgroup in August 1991; today Linux powers Android smartphones, supercomputers, and global internet servers."
      },
      {
        q: "What world-famous puzzle mobile video game featuring wingless birds launched by slingshots at green pigs was created in 2009 by Finnish game developer Rovio Entertainment in Espoo?",
        correct: "Angry Birds",
        w1: "Clash of Clans",
        w2: "Hay Day",
        exp: "Angry Birds became the first mobile game to reach one billion downloads, spawning an international entertainment franchise of movies, merchandise, and theme parks."
      },
      {
        q: "What revolutionary deep geological repository on Olkiluoto island, the world first permanent underground repository for spent nuclear fuel, will seal high-level waste in copper canisters 450 meters underground?",
        correct: "Onkalo Spent Nuclear Fuel Repository",
        w1: "Loviisa Repository",
        w2: "Forsmark Facility",
        exp: "Engineered to isolate radioactive nuclear waste for 100,000 years within two-billion-year-old stable crystalline granite bedrock without requiring human maintenance."
      },
      {
        q: "What iconic Finnish designer and architect, famous for organic modernist furniture and the Savoy glass vase, designed the Paimio Sanatorium and Finlandia Hall in Helsinki?",
        correct: "Alvar Aalto",
        w1: "Eero Saarinen",
        w2: "Eliel Saarinen",
        exp: "Aalto pioneered bent plywood birch furniture for his design company Artek, creating ergonomic chairs and timeless Scandinavian organic modern architecture."
      }
    ],
    number: {
      q: "In what year did University of Helsinki student Linus Torvalds first release the open-source Linux operating system kernel?",
      target: 1991,
      unit: "year",
      imperial: "1991 AD",
      exp: "Linus Torvalds announced Linux version 0.01 in September 1991."
    }
  },

  // Cycle 7: Finnish Gastronomy, Rye & Salmiakki
  {
    mcqs: [
      {
        q: "What salty, pungent black licorice confection flavored with ammonium chloride (salmiak) is a cherished national obsession across Finland?",
        correct: "Salmiakki Salty Licorice",
        w1: "Fazer Blue",
        w2: "Mämmi",
        exp: "Ammonium chloride imparts a sharp, astringent salty and tongue-numbing taste, flavored in chocolate, ice cream, pastries, and Salmiakkikossu vodka liqueur."
      },
      {
        q: "What traditional Finnish rye pastry, originating in North Karelia, consists of a thin oval rye crust filled with creamy rice porridge, served warm with egg butter (munavoi)?",
        correct: "Karelian Pasty Karjalanpiirakka",
        w1: "Ruisleipä",
        w2: "Kalakukko",
        exp: "Protected under European Traditional Speciality Guaranteed (TSG) status, Karelian pasties are crimped by hand around the edges and baked at high temperatures."
      },
      {
        q: "What dense, 100% whole-grain sourdough dark rye bread is celebrated as the official National Food of Finland, baked into round loaves with a hole in the center (reikäleipä)?",
        correct: "Ruisleipä Rye Bread",
        w1: "Pulla",
        w2: "Näkkileipä",
        exp: "High in dietary fiber and essential minerals, loaves were historically dried on wooden poles suspended from cottage ceilings to last through long winter months."
      },
      {
        q: "What traditional eastern Finnish culinary delicacy from Kuopio in Savonia consists of a round rye bread crust stuffed with vendace fish (muikku) and pork belly, baked for hours?",
        correct: "Kalakukko Fish Rooster",
        w1: "Karjalanpiirakka",
        w2: "Lohikeitto",
        exp: "Kalakukko served as a self-contained portable lunchbox for lumberjacks and miners, eaten by slicing through the crust like a cake to reveal the tender steamed fish inside."
      },
      {
        q: "What comforting traditional Finnish creamy soup is made with fresh Atlantic salmon chunks, cubed potatoes, leeks, heavy cream, and generous sprigs of fresh green dill?",
        correct: "Lohikeitto Salmon Soup",
        w1: "Hernekeitto Pea Soup",
        w2: "Siskonmakkarakeitto",
        exp: "Lohikeitto is served with buttered dark rye bread in market halls (Kauppahalli) across coastal Finland and at harbor fish markets."
      }
    ],
    number: {
      q: "For how many consecutive years (as of 2024) has Finland been officially ranked as the Happiest Country in the World by the UN World Happiness Report?",
      target: 7,
      unit: "consecutive years",
      imperial: "7 consecutive years (#1 happiest nation)",
      exp: "Finland has earned the #1 ranking in the UN World Happiness Report for seven consecutive years (2018 through 2024)."
    }
  },

  // Cycle 8: Jean Sibelius, The Kalevala & Music
  {
    mcqs: [
      {
        q: "Which world-famous Finnish late-Romantic classical composer composed the patriotic symphonic tone poem Finlandia and the Karelia Suite?",
        correct: "Jean Sibelius",
        w1: "Einojuhani Rautavaara",
        w2: "Kaija Saariaho",
        exp: "Composed in 1899 as a covert musical protest against Russian imperial censorship, Finlandia became a rallying symbol of Finnish national independence."
      },
      {
        q: "What striking monument in Töölö, Helsinki, designed by Eila Hiltunen in 1967, features over six hundred welded stainless steel organ pipes resembling an abstract sound wave?",
        correct: "The Sibelius Monument Passio Musicae",
        w1: "Mannerheim Monument",
        w2: "Alexander II Monument",
        exp: "Weighing twenty-four metric tons, wind blowing through the polished hollow steel pipes creates subtle musical resonance in the surrounding park."
      },
      {
        q: "What 19th-century epic compilation of traditional Finnish folk poetry, compiled by Elias Lönnrot from rural Karelian oral runes, is the National Epic of Finland?",
        correct: "The Kalevala",
        w1: "The Kanteletar",
        w2: "The Edda",
        exp: "Recounting the magical adventures of shaman-hero Väinämöinen and the creation of the magical prosperity-mill Sampo, it was a primary inspiration for J.R.R. Tolkien Middle-earth mythology."
      },
      {
        q: "What ancient traditional Finnish stringed folk instrument, plucked with fingers like a zither or psaltery, is played by mythical hero Väinämöinen in the Kalevala?",
        correct: "The Kantele",
        w1: "The Jouhikko",
        w2: "The Nyckelharpa",
        exp: "According to the epic, the first kantele was carved from the jawbone of a giant pike fish with strings spun from the hair of a maiden."
      },
      {
        q: "What whimsical fictional family of round, white, hippo-like troll characters was created by Swedish-speaking Finnish author and illustrator Tove Jansson in 1945?",
        correct: "The Moomins Muumit",
        w1: "The Smurfs",
        w2: "The Barbapapas",
        exp: "Living peaceful philosophical adventures in Moominvalley alongside Snufkin and Little My, the books have been translated into over fifty languages with a theme park in Naantali."
      }
    ],
    number: {
      q: "How many hollow stainless steel organ pipes are welded together in the monumental Sibelius Monument in Helsinki, Finland?",
      target: 600,
      unit: "steel pipes",
      imperial: "600+ welded organ pipes",
      exp: "The Sibelius Monument consists of over six hundred individual stainless steel pipes sculpted into an abstract musical wave."
    }
  },

  // Cycle 9: Wildlife, Brown Bears & Taiga Forests
  {
    mcqs: [
      {
        q: "What powerful apex predator, revered in ancient pagan Finnish mythology as the sacred King of the Forest (Otso / Karhu), is the official National Animal of Finland?",
        correct: "The Eurasian Brown Bear Ursus arctos",
        w1: "The Gray Wolf",
        w2: "The Eurasian Lynx",
        exp: "Because saying the bear true name was taboo in ancient times, Finns invented over two hundred euphemisms including Mesikämmen (Honey-Paw) and Kontio."
      },
      {
        q: "What magnificent, graceful pure-white bird species, whose return in spring marks the arrival of warmth, is the official National Bird of Finland?",
        correct: "The Whooper Swan Cygnus cygnus",
        w1: "The Willow Grouse",
        w2: "The Black Grouse",
        exp: "Depicted on the Finnish 1-euro coin and the Nordic Swan eco-label, Whooper swans mate for life, nesting on secluded subarctic lake islands."
      },
      {
        q: "What percentage of the total sovereign land territory of Finland is covered by dense boreal forests (taiga), making it the most forested country in Europe?",
        correct: "Over 75 Percent",
        w1: "45 Percent",
        w2: "60 Percent",
        exp: "Covering 23 million hectares, pine, spruce, and birch trees dominate the landscape under the sustainable forestry principle of planting three trees for every tree harvested."
      },
      {
        q: "What semi-domesticated Arctic deer species, herded by roughly 4,000 herders in the Lapland reindeer husbandry area, outnumbers the human population in northern Lapland?",
        correct: "Reindeer Rangifer tarandus tarandus",
        w1: "Eurasian Elk",
        w2: "White-Tailed Deer",
        exp: "Lapland is home to roughly 200,000 reindeer, tagged with reflective collar collars to reduce road accidents during dark winter months."
      },
      {
        q: "What golden-orange Arctic wild berry, growing in remote pristine peat bogs in Lapland, is prized as the Arctic Gold for its high Vitamin C content?",
        correct: "Cloudberry Hilla / Lakka (Rubus chamaemorus)",
        w1: "Lingonberry",
        w2: "Bilberry",
        exp: "Cloudberries ripen for just two to three weeks in July, celebrated with Cloudberry Fairs in Ranua and traditionally served with squeaky bread cheese (Leipäjuusto)."
      }
    ],
    number: {
      q: "What percentage of the total land area of Finland is covered by productive boreal forests (taiga), the highest proportion in Europe?",
      target: 75,
      unit: "percent",
      imperial: "75%+ forest cover",
      exp: "More than 75 percent of Finland's land area is carpeted in dense pine, spruce, and birch forests."
    }
  },

  // Cycle 10: Extent, 19 Regions & Finnish Superlatives
  {
    mcqs: [
      {
        q: "Into how many administrative regions (Maakunnat), plus the autonomous island region of Åland, is the Republic of Finland politically organized?",
        correct: "19 Regions",
        w1: "12 Regions",
        w2: "24 Regions",
        exp: "The nineteen regions (such as Uusimaa, Pirkanmaa, Southwest Finland, North Karelia, and Lapland) are responsible for regional economic planning and health services."
      },
      {
        q: "What is the total geographical land area of the Republic of Finland in square kilometers, ranking it as the eighth largest sovereign country in Europe?",
        correct: "338,455 Square Kilometers",
        w1: "210,000 Square Kilometers",
        w2: "450,000 Square Kilometers",
        exp: "Finland covers 338,455 square kilometers with a population of 5.5 million people, resulting in one of the lowest population densities in the EU (18 people/sq km)."
      },
      {
        q: "In what historic year did Finland declare sovereign independence from the collapsing Russian Empire under the leadership of Pehr Evind Svinhufvud?",
        correct: "1917",
        w1: "1905",
        w2: "1945",
        exp: "The Senate of Finland issued the Declaration of Independence on December 6, 1917, celebrated annually as Finnish Independence Day."
      },
      {
        q: "In 1906, Finland (then an autonomous Grand Duchy) became the first country in Europe to grant women what fundamental political right?",
        correct: "The full right to vote and stand as candidates in national parliamentary elections",
        w1: "The right to own land",
        w2: "The right to attend university",
        exp: "In the 1907 elections, nineteen women were elected to the Finnish Parliament (Eduskunta), the first female members of parliament in modern world history."
      },
      {
        q: "What eccentric, world-famous summer championship sporting event has been held annually in the town of Sonkajärvi since 1992, where male competitors race through an obstacle course carrying a female teammate?",
        correct: "Wife-Carrying World Championships Eukonkanto",
        w1: "Swamp Soccer",
        w2: "Boot Throwing",
        exp: "Competitors navigate deep sand tracks and a one-meter-deep water pool, with the winning prize traditionally being the wife weight in beer."
      }
    ],
    number: {
      q: "In what historic year did Finland officially proclaim its sovereign national independence?",
      target: 1917,
      unit: "year",
      imperial: "1917 AD",
      exp: "Finland declared independence on December 6, 1917, recognized by the Bolshevik Soviet government shortly thereafter."
    }
  }
];

// Build Finland Quiz
buildQuiz({
  id: 'finland-geography-heritage-60',
  theme: 'Finland: Geography, A Thousand Lakes & Lapland Wilderness',
  title: 'Finland: Geography, A Thousand Lakes & Lapland Wilderness',
  description: 'A 60-question grand master assessment exploring the 188,000 lakes & Saimaa seals, Helsinki & Rock Church (1969), Rovaniemi Arctic Circle (66°N), Sauna culture (3.3M saunas) & Sisu, Olavinlinna (1475), Linux & Nokia (1991), and 1917 independence.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, finlandCycles);

console.log('Finland quiz built successfully!');
