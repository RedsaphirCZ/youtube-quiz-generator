const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 3. norway-geography-heritage-60
// =========================================================================
const norwayCycles = [
  // Cycle 1: The Western Fjords & Geirangerfjord
  {
    mcqs: [
      {
        q: "What is the longest and deepest fjord in Norway, stretching 205 kilometers inland and plunging to a maximum depth of 1,308 meters?",
        correct: "Sognefjord Sognefjorden",
        w1: "Geirangerfjord",
        w2: "Hardangerfjord",
        exp: "Nicknamed the King of the Fjords, Sognefjord branches into the UNESCO-listed Nærøyfjord, where cliffs tower over a thousand meters above narrow channels."
      },
      {
        q: "Which spectacular UNESCO World Heritage fjord in Sunnmøre is famed for emerald-green waters, steep rock walls, and the Seven Sisters waterfall?",
        correct: "Geirangerfjord",
        w1: "Lysefjord",
        w2: "Aurlandsfjord",
        exp: "The Seven Sisters (Sju Søstre) consists of seven separate streams plunging 250 meters over the cliff face, facing the solitary Suitor waterfall across the fjord."
      },
      {
        q: "What iconic 604-meter sheer cliff plateau in Rogaland towers vertically over the waters of Lysefjord, one of Norway most famous hiking viewpoints?",
        correct: "Preikestolen Pulpit Rock",
        w1: "Trolltunga",
        w2: "Kjeragbolten",
        exp: "Preikestolen features an almost perfectly flat twenty-five by twenty-five meter rock top formed by glacial frost wedging during the last Ice Age."
      },
      {
        q: "What legendary rock ledge in Vestland hangs horizontally 700 meters above Lake Ringedalsvatnet, named for its resemblance to a mythical monster tongue?",
        correct: "Trolltunga Troll Tongue",
        w1: "Preikestolen",
        w2: "Torghatten",
        exp: "Formed when a massive chunk of bedrock broke away during glacial retreat roughly 10,000 years ago, Trolltunga requires a rigorous 28-kilometer round-trip trek."
      },
      {
        q: "Which world-famous mountain pass road in Møre og Romsdal features eleven dramatic hairpin switchbacks climbing a sheer mountain wall beside the Stigfossen waterfall?",
        correct: "Trollstigen Troll Road",
        w1: "Aurlandsfjellet",
        w2: "Sognefjellet",
        exp: "Opened by King Haakon VII in 1936, Trollstigen is surrounded by towering mountain peaks named the King, the Queen, and the Bishop."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Sognefjord, the longest fjord in Norway?",
      target: 205,
      unit: "kilometers",
      imperial: "127 miles long",
      exp: "Sognefjord extends for 205 kilometers from the Atlantic coast near Skjolden deep into the Jotunheimen mountains."
    }
  },

  // Cycle 2: The High Mountains & Jotunheimen
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Norway and Northern Europe, rising 2,469 meters in the Jotunheimen National Park?",
        correct: "Galdhøpiggen",
        w1: "Glittertind",
        w2: "Store Skagastølstind",
        exp: "Galdhøpiggen (Piggen) was first climbed in 1850, accessible across the Styggebreen glacier from the Juvasshytta mountain lodge."
      },
      {
        q: "What mountain range in southern central Norway, meaning 'Home of the Giants' in Norse mythology, contains all of Northern Europe twenty highest peaks?",
        correct: "Jotunheimen",
        w1: "Rondane",
        w2: "Dovrefjell",
        exp: "Jotunheimen features the razor-thin Besseggen Ridge between dark-blue Lake Bessvatnet and the glacial turquoise Lake Gjende, immortalized in Ibsen Peer Gynt."
      },
      {
        q: "What is the largest mountain plateau in Europe, covering 8,000 square kilometers in southern Norway, home to Europe largest wild reindeer herd?",
        correct: "Hardangervidda",
        w1: "Dovrefjell",
        w2: "Finnmarksvidda",
        exp: "Hardangervidda averages 1,100 to 1,200 meters elevation, characterized by Arctic alpine tundra, countless glacial lakes, and the Vøringsfossen waterfall."
      },
      {
        q: "What is the largest glacier in continental mainland Europe, covering 487 square kilometers in Vestland County?",
        correct: "Jostedalsbreen",
        w1: "Svartisen",
        w2: "Folgefonna",
        exp: "Jostedalsbreen reaches an ice thickness of up to 600 meters, featuring dramatic glacier outlet arms like Nigardsbreen and Briksdalsbreen."
      },
      {
        q: "Which national park in central Norway is the only place in Europe supporting a wild, free-roaming population of prehistoric Arctic Muskoxen?",
        correct: "Dovrefjell-Sunndalsfjella National Park",
        w1: "Rondane National Park",
        w2: "Femundsmarka",
        exp: "Reintroduced from Greenland between 1947 and 1953, roughly three hundred shaggy muskoxen thrive in the subarctic tundra surrounding Mount Snøhetta."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Galdhøpiggen, the highest peak in Northern Europe?",
      target: 2469,
      unit: "meters",
      imperial: "8,100 feet",
      exp: "Galdhøpiggen stands at an official elevation of 2,469 meters above sea level in the Jotunheimen mountain range."
    }
  },

  // Cycle 3: The Lofoten & Vesterålen Archipelagos
  {
    mcqs: [
      {
        q: "What dramatic archipelago inside the Arctic Circle in northern Norway is world-famous for sheer granite peaks, sandy Arctic surf beaches, and red fishermen cabins (rorbuer)?",
        correct: "Lofoten Islands",
        w1: "Vesterålen",
        w2: "Helgeland",
        exp: "Despite lying above 68 degrees North latitude, Lofoten experiences an anomalously mild climate due to the warming waters of the Norwegian Current."
      },
      {
        q: "What traditional preserved seafood product, dried on giant outdoor wooden racks (hjell) by cold ocean winds without salt, has been exported from Lofoten since the Viking Age?",
        correct: "Stockfish Tørrfisk",
        w1: "Klippfisk",
        w2: "Gravlax",
        exp: "Spawning Arctic cod (skrei) migrate from the Barents Sea to Lofoten each winter, where optimal near-freezing temperatures dry fish without rotting or freezing."
      },
      {
        q: "Which legendary, powerful tidal whirlpool system in the open sea between the Lofoten islands of Moskenesøya and Værøy inspired stories by Edgar Allan Poe and Jules Verne?",
        correct: "Moskstraumen The Maelstrom",
        w1: "Saltstraumen",
        w2: "Rystraumen",
        exp: "Moskstraumen is one of the strongest ocean tidal current systems on Earth, where powerful tidal flows forced through shallow sounds create roaring whirlpools."
      },
      {
        q: "What picturesque postcard fishing village at the southern tip of the Lofoten archipelago perches beneath the sheer conical peak of Reinebringen?",
        correct: "Reine",
        w1: "Henningsvær",
        w2: "Svolvær",
        exp: "Reine features wooden rorbuer cabins on stilts over fjord waters, regularly voted the most beautiful village in Norway."
      },
      {
        q: "What tidal strait near Bodø produces the strongest tidal current on Earth, where 400 million cubic meters of seawater rush through a three-kilometer sound every six hours?",
        correct: "Saltstraumen",
        w1: "Moskstraumen",
        w2: "Grimsøyfjorden",
        exp: "Water speeds reach thirty-seven kilometers per hour, creating massive swirling whirlpools up to ten meters wide and five meters deep."
      }
    ],
    number: {
      q: "At approximately what degree North latitude does the Arctic Circle line cross through the territory of Norway?",
      target: 66,
      unit: "degrees North",
      imperial: "66°33'N latitude",
      exp: "The Arctic Circle crosses northern Norway at roughly 66.5 degrees North (rounded to 66°N), marked by the Arctic Circle Centre on the Saltfjellet plateau."
    }
  },

  // Cycle 4: Svalbard & The High Arctic
  {
    mcqs: [
      {
        q: "What high Arctic archipelago situated midway between the northern coast of Norway and the North Pole is governed under the 1920 international Svalbard Treaty?",
        correct: "Svalbard Spitsbergen",
        w1: "Jan Mayen",
        w2: "Bear Island",
        exp: "Svalbard covers 61,022 square kilometers (sixty percent covered by glaciers), where citizens of over forty signatory nations enjoy equal rights of residence and economic activity."
      },
      {
        q: "What secure underground backup facility carved 120 meters inside a permafrost sandstone mountain near Longyearbyen safeguards over one million global crop seed samples?",
        correct: "Svalbard Global Seed Vault",
        w1: "Arctic Gene Bank",
        w2: "Doomsday Vault",
        exp: "Maintained at minus eighteen degrees Celsius, the Seed Vault acts as an ultimate insurance policy against natural, military, or climate loss of world crop biodiversity."
      },
      {
        q: "What is the administrative capital and largest settlement in Svalbard, holding the distinction of being the northernmost town on Earth with over 1,000 residents?",
        correct: "Longyearbyen",
        w1: "Barentsburg",
        w2: "Ny-Ålesund",
        exp: "Founded in 1906 as a coal mining company town by American industrialist John Munro Longyear, Longyearbyen is home to the University Centre in Svalbard (UNIS)."
      },
      {
        q: "Which apex Arctic predator species outnumbers human residents on the archipelago of Svalbard, legally requiring travelers outside settlements to carry polar bear deterrents?",
        correct: "Polar Bear Isbjørn",
        w1: "Walrus",
        w2: "Arctic Wolf",
        exp: "Approximately 3,000 polar bears roam the Barents Sea sub-population around Svalbard and Franz Josef Land, hunting ringed seals on seasonal sea pack ice."
      },
      {
        q: "What astronomical phenomenon occurs in northern Norway during summer when the sun remains continuously above the horizon for weeks to months?",
        correct: "Midnight Sun Midnattssol",
        w1: "Polar Night",
        w2: "Equinox",
        exp: "In Longyearbyen, Svalbard, the Midnight Sun shines unbroken for 127 consecutive days from April 20 to August 23 without setting."
      }
    ],
    number: {
      q: "In what year was the Svalbard Global Seed Vault officially opened and dedicated inside the Arctic permafrost of Spitsbergen?",
      target: 2008,
      unit: "year",
      imperial: "2008 AD",
      exp: "The Svalbard Global Seed Vault was formally inaugurated on February 26, 2008, receiving initial seed deposits from global genebanks."
    }
  },

  // Cycle 5: Oslo, Maritime Heritage & The Vikings
  {
    mcqs: [
      {
        q: "What is the capital and most populous city of Norway, located at the northern head of the 100-kilometer Oslofjord?",
        correct: "Oslo",
        w1: "Bergen",
        w2: "Trondheim",
        exp: "Founded around 1040 by King Harald Hardrada, Oslo was named Christiania after King Christian IV rebuilt it in stone following a devastating 1624 fire."
      },
      {
        q: "Which 9th-century royal Viking burial ship, excavated in Vestfold in 1904, is considered one of the finest surviving artifacts from the Viking Age?",
        correct: "Oseberg Ship Osebergskipet",
        w1: "Gokstad Ship",
        w2: "Tune Ship",
        exp: "The 21-meter clinker-built oak ship served as the luxurious burial chamber for two high-status Norse women, buried with ornate carved animal head posts and a wooden cart."
      },
      {
        q: "Which museum on Oslo Bygdøy peninsula houses the historic wooden exploration vessel used by Fridtjof Nansen, Otto Sverdrup, and Roald Amundsen for Arctic and Antarctic voyages?",
        correct: "Fram Museum Frammuseet",
        w1: "Kon-Tiki Museum",
        w2: "Viking Ship Museum",
        exp: "The Fram was designed by Colin Archer with a rounded hull to withstand extreme polar pack ice pressure, reaching the farthest north and farthest south of any wooden ship in history."
      },
      {
        q: "What world-famous sculpture installation in Oslo Frogner Park contains over two hundred bronze, granite, and cast-iron sculptures created by a single artist?",
        correct: "Vigeland Sculpture Park",
        w1: "Munch Park",
        w2: "Ekebergparken",
        exp: "Created by Gustav Vigeland, the park center is crowned by the 14-meter Monolith (Monolitten), carved from a single granite block depicting 121 human figures striving upward."
      },
      {
        q: "Which striking modern waterfront landmark in Oslo, designed by architectural firm Snøhetta, features an angled white Italian Carrara marble roof that pedestrians can walk upon?",
        correct: "Oslo Opera House Operahuset",
        w1: "Munch Museum",
        w2: "National Museum",
        exp: "Opened in 2008 on the Bjørvika waterfront, the building won the European Union Prize for Contemporary Architecture (Mies van der Rohe Award)."
      }
    ],
    number: {
      q: "In which century CE was the famous Oseberg Viking longship built and buried in a royal burial mound in Vestfold, Norway?",
      target: 9,
      unit: "century CE",
      imperial: "9th century AD (circa 820-834 CE)",
      exp: "Dendrochronological timber dating shows the Oseberg ship was constructed around 820 CE and buried in 834 CE during the 9th century."
    }
  },

  // Cycle 6: Bergen & The Hanseatic Wharf
  {
    mcqs: [
      {
        q: "What historic commercial wharf in Bergen, featuring a row of colorful medieval gabled wooden merchant warehouses, is a UNESCO World Heritage site?",
        correct: "Bryggen Tyskebryggen",
        w1: "Nyhavn",
        w2: "Gamle Stavanger",
        exp: "Bryggen was the Norwegian headquarters of the Hanseatic League from the 14th to mid-16th century, controlling monopoly exports of dried cod stockfish."
      },
      {
        q: "Which coastal city surrounded by seven mountains is known as the Gateway to the Fjords and the rainiest major city in Europe, receiving over 2,200 mm of annual rainfall?",
        correct: "Bergen",
        w1: "Stavanger",
        w2: "Ålesund",
        exp: "Bergen was the capital of Norway during the 13th century, famous for the Fløibanen funicular railway climbing Mount Fløyen."
      },
      {
        q: "Which scenic 20-kilometer railway in western Norway climbs 866 meters from the Aurlandsfjord to Myrdal, one of the steepest standard-gauge adhesion railways in the world?",
        correct: "Flåm Railway Flåmsbana",
        w1: "Rauma Railway",
        w2: "Bergen Line",
        exp: "The Flåmsbana negotiates twenty tunnels with an eighteen-in-one gradient slope (5.5 percent grade), stopping for passengers to view the roaring Kjosfossen waterfall."
      },
      {
        q: "Which coastal town in Møre og Romsdal was rebuilt completely in colorful Art Nouveau (Jugendstil) stone and brick architecture following a catastrophic fire in 1904?",
        correct: "Ålesund",
        w1: "Molde",
        w2: "Kristiansund",
        exp: "German Kaiser Wilhelm II sent warships loaded with building materials to rebuild Ålesund with ornate stone towers, turrets, and dragon-motif facades."
      },
      {
        q: "Which medieval stone cathedral in Trondheim, founded in 1070 over the tomb of King Olav Haraldsson (Saint Olav), is the northernmost medieval cathedral in the world?",
        correct: "Nidaros Cathedral Nidarosdomen",
        w1: "Stavanger Cathedral",
        w2: "Bergen Cathedral",
        exp: "Nidaros Cathedral was the traditional coronation site for Norwegian monarchs and the historical terminus of the Saint Olav medieval pilgrimage ways."
      }
    ],
    number: {
      q: "What is the approximate average annual rainfall in millimeters recorded in the coastal city of Bergen, Norway?",
      target: 2250,
      unit: "millimeters",
      imperial: "88.6 inches of rain annually",
      exp: "Bergen receives an average of approximately 2,250 millimeters of precipitation per year due to Atlantic weather systems trapped against the surrounding mountains."
    }
  },

  // Cycle 7: Northern Lights & Indigenous Sami Heritage
  {
    mcqs: [
      {
        q: "Which vibrant Arctic city in northern Norway, situated on Tromsøya island at 69 degrees North, is known as the Capital of the Northern Lights and Paris of the North?",
        correct: "Tromsø",
        w1: "Bodø",
        w2: "Alta",
        exp: "Tromsø is home to the Arctic Cathedral (Ishavskatedralen), Polaria Arctic center, and world-renowned research centers for the Aurora Borealis."
      },
      {
        q: "What indigenous Finno-Ugric people have inhabited the northern Arctic regions of Norway, Sweden, Finland, and Russia (Sápmi) for thousands of years, practicing semi-nomadic reindeer herding?",
        correct: "The Sámi People",
        w1: "The Inuit",
        w2: "The Nenets",
        exp: "The Sámi have their own democratically elected parliament (Sámediggi) in Karasjok, traditional joik vocal folk music, and colorful gákti clothing."
      },
      {
        q: "What iconic 307-meter ocean cliff promontory on Magerøya island is marketed as the northernmost point of continental Europe accessible by road?",
        correct: "North Cape Nordkapp",
        w1: "Knivskjellodden",
        w2: "Cape Arkona",
        exp: "Nordkapp is crowned by a famous steel globe monument at 71 degrees 10 minutes North latitude, where visitors watch the Midnight Sun hover over the Barents Sea."
      },
      {
        q: "What spectacular atmospheric light display in the polar night sky is caused by solar wind particles colliding with oxygen and nitrogen atoms in Earth upper atmosphere?",
        correct: "Aurora Borealis Northern Lights",
        w1: "Zodiacal Light",
        w2: "Noctilucent Clouds",
        exp: "Charged particles funneled by Earth magnetic field excite oxygen atoms to emit green and red light and nitrogen to emit purple and blue curtains."
      },
      {
        q: "Which town in Finnmark is home to a UNESCO World Heritage collection of over 6,000 prehistoric rock carvings dating between 4200 and 500 BCE?",
        correct: "Alta",
        w1: "Kautokeino",
        w2: "Hammerfest",
        exp: "The petroglyphs in the Alta Fjord depict prehistoric reindeer hunting, brown bears, elk, boats with elk-head prows, and shamanic rituals."
      }
    ],
    number: {
      q: "At what degree North latitude is the iconic North Cape (Nordkapp) cliff lookout located in northern Norway?",
      target: 71,
      unit: "degrees North",
      imperial: "71°10'21\"N latitude",
      exp: "Nordkapp sits at 71 degrees 10 minutes North latitude, just 2,100 kilometers from the Geographic North Pole."
    }
  },

  // Cycle 8: Norwegian Wooden Architecture & Stave Churches
  {
    mcqs: [
      {
        q: "What distinctive style of medieval wooden Christian church architecture, supported by massive vertical timber posts (staves), is unique to Norway?",
        correct: "Stave Church Stavkirke",
        w1: "Log Church",
        w2: "Plank Church",
        exp: "During the Middle Ages, over one thousand stave churches were built across Norway using intricate timber joinery without iron nails."
      },
      {
        q: "Which UNESCO World Heritage 12th-century stave church in Sogn og Fjordane is the oldest surviving stave church in Norway, famed for Viking-style animal scroll woodcarvings?",
        correct: "Urnes Stave Church",
        w1: "Borgund Stave Church",
        w2: "Heddal Stave Church",
        exp: "Built around 1130 CE, Urnes gave its name to the Urnes style of Norse animal art, depicting interlaced snakes, dragons, and stylized four-legged beasts."
      },
      {
        q: "Which exceptionally well-preserved stave church in Lærdal is famous for its layered tiered roofs, carved dragon heads, and black protective pine tar coating?",
        correct: "Borgund Stave Church",
        w1: "Gol Stave Church",
        w2: "Lom Stave Church",
        exp: "Built around 1180 CE, Borgund has remained virtually unchanged since the Middle Ages, featuring runic inscriptions and a covered exterior ambulatory."
      },
      {
        q: "What is the largest surviving stave church in Norway, located in Telemark, nicknamed the Wooden Cathedral with three massive rising towers?",
        correct: "Heddal Stave Church",
        w1: "Fantoft Stave Church",
        w2: "Ringebu Stave Church",
        exp: "Heddal was constructed in the early 13th century and remains an active parish church, restored in the 19th century with traditional wood carvings."
      },
      {
        q: "What 24.5-kilometer road tunnel in Vestland is the longest road tunnel in the world, featuring blue and yellow illuminated mountain light caves to prevent driver fatigue?",
        correct: "Lærdal Tunnel Lærdalstunnelen",
        w1: "Gotthard Road Tunnel",
        w2: "Mont Blanc Tunnel",
        exp: "Opened in 2000 connecting Lærdal and Aurland on the E16 highway, the tunnel eliminated the treacherous winter crossing of the Aurlandsfjellet mountain pass."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Lærdal Tunnel in Norway, the longest road tunnel in the world?",
      target: 25,
      unit: "kilometers",
      imperial: "15.2 miles long",
      exp: "The Lærdal Tunnel measures exactly 24.51 kilometers (rounded to 25 km), passing deep beneath the mountains of western Norway."
    }
  },

  // Cycle 9: Atlantic Ocean Road & Petroleum Wealth
  {
    mcqs: [
      {
        q: "What spectacular 8.3-kilometer coastal highway in Møre og Romsdal hops across eight bridges connecting low rocky ocean islets over the Norwegian Sea?",
        correct: "The Atlantic Ocean Road Atlanterhavsveien",
        w1: "The Golden Route",
        w2: "Helgeland Coast Road",
        exp: "Declared Norway Construction of the Century, the road is famous for the dramatic curving cantilever Storseisundet Bridge, known as the Road to Nowhere."
      },
      {
        q: "Which giant North Sea offshore oil field discovered on Christmas Eve in 1969 launched Norway transformation into one of the world wealthiest energy exporters?",
        correct: "Ekofisk Oil Field",
        w1: "Statfjord Field",
        w2: "Troll Gas Field",
        exp: "Operated by Phillips Petroleum, Ekofisk is one of the largest offshore oil basins in the North Sea, producing hydrocarbons for over fifty years."
      },
      {
        q: "What is the massive sovereign wealth fund of Norway, valued at over 1.7 trillion dollars, created to invest surplus petroleum revenues for future generations?",
        correct: "Government Pension Fund Global Oljefondet",
        w1: "Norwegian State Fund",
        w2: "Nordic Heritage Fund",
        exp: "Oljefondet owns roughly 1.5% of all publicly listed companies on Earth across seventy countries, governed by strict ethical and environmental guidelines."
      },
      {
        q: "What percentage of Norway domestic electricity generation is produced by clean, renewable hydroelectric power from mountain dams and waterfalls?",
        correct: "Over 90 Percent",
        w1: "50 Percent",
        w2: "70 Percent",
        exp: "Abundant mountain precipitation, steep valleys, and natural glacier lakes allow Norway to generate over ninety percent of its electricity from hydropower."
      },
      {
        q: "Which industry in Norway coastal fjords makes the country the undisputed world leading producer and exporter of farmed Atlantic Salmon (Salmo salar)?",
        correct: "Aquaculture Salmon Farming",
        w1: "Herring Trawling",
        w2: "King Crab Harvesting",
        exp: "Norwegian salmon farming pioneered modern floating net-pens in the 1970s, exporting over 1.3 million metric tons of fresh salmon annually across the globe."
      }
    ],
    number: {
      q: "In what year was the historic Ekofisk offshore oil field discovered in the Norwegian sector of the North Sea?",
      target: 1969,
      unit: "year",
      imperial: "1969 AD",
      exp: "The Ocean Viking drilling rig struck giant commercial oil reserves at Ekofisk on December 23, 1969, transforming the Norwegian economy."
    }
  },

  // Cycle 10: Extent, Coastline & Norwegian Superlatives
  {
    mcqs: [
      {
        q: "When including all indented fjord shorelines, bays, and roughly 239,000 coastal islands, what is the estimated total coastline length of Norway?",
        correct: "Over 100,000 Kilometers",
        w1: "25,000 Kilometers",
        w2: "50,000 Kilometers",
        exp: "According to Statistics Norway, the intricate fractured fractal coastline measures over 104,000 kilometers, the second longest in the world after Canada."
      },
      {
        q: "What uninhabited Norwegian volcanic island in the South Atlantic Ocean is recognized as the most geographically isolated uninhabited island on Earth?",
        correct: "Bouvet Island Bouvetøya",
        w1: "Peter I Island",
        w2: "Jan Mayen",
        exp: "Bouvet Island lies over 1,700 kilometers from the coast of Queen Maud Land in Antarctica, covered ninety-three percent by glaciers."
      },
      {
        q: "How many regional administrative counties (Fylker) comprise the Kingdom of Norway following the regional administrative adjustments of 2024?",
        correct: "15 Counties",
        w1: "11 Counties",
        w2: "19 Counties",
        exp: "Norway is divided into fifteen counties (such as Oslo, Rogaland, Vestland, Møre og Romsdal, Trøndelag, Nordland, Troms, and Finnmark)."
      },
      {
        q: "Which deep Arctic coal-mining settlement in Svalbard is home to the world northernmost commercial brewery (Svalbard Bryggeri)?",
        correct: "Longyearbyen",
        w1: "Barentsburg",
        w2: "Pyramiden",
        exp: "Svalbard Bryggeri brews craft beers using 2,000-year-old glacial meltwater from the Bogerbreen glacier on the 78th parallel north."
      },
      {
        q: "What ranking does Norway consistently hold on the United Nations Human Development Index (HDI), reflecting exceptional longevity, education, and standard of living?",
        correct: "Top 2 in the World",
        w1: "Top 20",
        w2: "Top 50",
        exp: "Norway has ranked first or second globally on the UN Human Development Index for over two decades, driven by strong social welfare and egalitarian institutions."
      }
    ],
    number: {
      q: "How many first-level administrative counties (Fylker) make up the Kingdom of Norway?",
      target: 15,
      unit: "counties",
      imperial: "15 Fylker",
      exp: "Following the regional demerger reforms effective January 1, 2024, Norway is structured into fifteen official counties."
    }
  }
];

// Build Norway Quiz
buildQuiz({
  id: 'norway-geography-heritage-60',
  theme: 'Norway: Geography, Fjords & Arctic Wilderness',
  title: 'Norway: Geography, Fjords & Arctic Wilderness',
  description: 'A 60-question grand master assessment exploring Sognefjord & Geirangerfjord, Galdhøpiggen & Jotunheimen, the Lofoten Islands, Svalbard & Seed Vault, Oslo & Viking ships, Bergen, Aurora Borealis, stave churches, and North Sea oil.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, norwayCycles);

console.log('Norway quiz built successfully!');
