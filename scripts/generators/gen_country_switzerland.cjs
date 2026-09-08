const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 1. switzerland-geography-heritage-60
// =========================================================================
const switzerlandCycles = [
  // Cycle 1: The Swiss Alps & The Matterhorn
  {
    mcqs: [
      {
        q: "What iconic 4,478-meter pyramid-shaped mountain peak on the Swiss-Italian border near Zermatt is the universal symbol of the Swiss Alps?",
        correct: "The Matterhorn Mount Cervin",
        w1: "Monte Rosa",
        w2: "The Eiger",
        exp: "First summited by Edward Whymper in July 1865, the Matterhorn four distinct triangular faces face the cardinal directions."
      },
      {
        q: "What is the highest mountain peak in Switzerland, rising 4,634 meters in the Pennine Alps on the border with Italy?",
        correct: "Dufourspitze Monte Rosa",
        w1: "Dom",
        w2: "Matterhorn",
        exp: "Named in honor of Swiss military general and cartographer Guillaume-Henri Dufour, the peak is crowned by the Monte Rosa glacier massif."
      },
      {
        q: "Which notorious 1,800-meter vertical limestone and ice mountain wall in the Bernese Alps is nicknamed the Murder Wall (Mordwand)?",
        correct: "Eiger North Face Eiger Nordwand",
        w1: "Jungfrau Wall",
        w2: "Mönch Face",
        exp: "First successfully climbed in 1938 by Heinrich Harrer, Anderl Heckmair, Fritz Kasparek, and Ludwig Vörg, the Eiger North Face is an extreme mountaineering challenge."
      },
      {
        q: "What high-altitude railway station in the Bernese Alps at 3,454 meters is marketed as the Top of Europe, the highest railway station on the continent?",
        correct: "Jungfraujoch",
        w1: "Gornergrat",
        w2: "Klein Matterhorn",
        exp: "The Jungfrau Railway travels through an eight-kilometer tunnel bored through the Eiger and Mönch mountains, arriving at the Sphinx Observatory."
      },
      {
        q: "What is the largest and longest glacier in the European Alps, stretching twenty-three kilometers through the Valais region?",
        correct: "Great Aletsch Glacier Grosser Aletschgletscher",
        w1: "Gorner Glacier",
        w2: "Rhône Glacier",
        exp: "The UNESCO-listed Aletsch Glacier contains twenty-seven billion tons of ice, covering eighty-six square kilometers."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of the Matterhorn in the Swiss Alps?",
      target: 4478,
      unit: "meters",
      imperial: "14,692 feet",
      exp: "The Matterhorn reaches an official elevation of 4,478 meters above sea level overlooking Zermatt."
    }
  },

  // Cycle 2: Swiss Lakes, Geneva & The Jet d'Eau
  {
    mcqs: [
      {
        q: "What is the largest crescent-shaped alpine lake in Central Europe by volume, shared between Switzerland and France?",
        correct: "Lake Geneva Lac Léman",
        w1: "Lake Zurich",
        w2: "Lake Lucerne",
        exp: "Covering 580 square kilometers, Lac Léman is fed and drained by the Rhône River, home to the cities of Geneva, Lausanne, and Montreux."
      },
      {
        q: "What famous 140-meter-high water fountain monument shoots 500 liters of water per second into the air on the Geneva harbor waterfront?",
        correct: "Jet d Eau",
        w1: "Fontaine de la Gare",
        w2: "Grand Cascade",
        exp: "Originally installed in 1886 as a safety relief valve for a hydraulic power network, the Jet d'Eau became the official symbol of Geneva in 1891."
      },
      {
        q: "Which historic covered wooden footbridge in Lucerne, built in 1333, is the oldest surviving wooden truss bridge in Europe?",
        correct: "Chapel Bridge Kapellbrücke",
        w1: "Spreuer Bridge",
        w2: "Rathaus Bridge",
        exp: "The Kapellbrücke spans the Reuss River obliquely, decorated with triangular 17th-century paintings depicting Swiss history and guarded by the octagonal Water Tower."
      },
      {
        q: "What is the largest lake located entirely within the territorial boundaries of Switzerland?",
        correct: "Lake Neuchâtel",
        w1: "Lake Lucerne",
        w2: "Lake Zurich",
        exp: "Lake Neuchâtel covers 218 square kilometers in the French-speaking Romandy region at the foot of the Jura Mountains."
      },
      {
        q: "Which Italian-speaking Swiss canton in the south is famed for palm-fringed sub-Mediterranean glacial lakes, including Lake Lugano and Lake Maggiore?",
        correct: "Ticino Tessin",
        w1: "Valais",
        w2: "Grisons",
        exp: "Ticino enjoys more sunshine than the rest of Switzerland, home to Bellinzona three medieval UNESCO-listed castles and the lakeside town of Ascona."
      }
    ],
    number: {
      q: "What is the total height in meters reached by the water plume of the iconic Jet d'Eau in Geneva?",
      target: 140,
      unit: "meters",
      imperial: "460 feet high",
      exp: "The Jet d'Eau propels water 140 meters into the air at a velocity of 200 kilometers per hour using two 500-kilowatt pumps."
    }
  },

  // Cycle 3: Engineering, Tunnels & The Gotthard Base Tunnel
  {
    mcqs: [
      {
        q: "What 57.1-kilometer railway tunnel beneath the Swiss Alps, opened in June 2016, is the longest and deepest traffic tunnel in the world?",
        correct: "Gotthard Base Tunnel",
        w1: "Seikan Tunnel",
        w2: "Channel Tunnel",
        exp: "Drilled under 2,300 meters of solid Alpine rock, the Gotthard Base Tunnel allows high-speed passenger and freight trains to cross the Alps at flat grade."
      },
      {
        q: "What world-famous red luxury panoramic tourist train crosses 291 bridges and ninety-one tunnels between Zermatt and Saint Moritz in eight hours?",
        correct: "The Glacier Express",
        w1: "The Bernina Express",
        w2: "The GoldenPass Line",
        exp: "Dubbed the Slowest Express Train in the World, the Glacier Express crosses the 2,033-meter Oberalp Pass and the dramatic Landwasser Viaduct."
      },
      {
        q: "What iconic 65-meter-high curved limestone railway viaduct on the Albula Railway line plunges trains directly into a mountain tunnel cliff face?",
        correct: "Landwasser Viaduct",
        w1: "Wiesen Viaduct",
        w2: "Solr Viaduct",
        exp: "Built between 1901 and 1903 without scaffolding by the Rhaetian Railway, the Landwasser Viaduct is a UNESCO World Heritage engineering masterwork."
      },
      {
        q: "What innovative high-altitude hydroelectric dam at the head of the Dixence River in Valais is the tallest concrete gravity dam in the world at 285 meters?",
        correct: "Grande Dixence Dam",
        w1: "Mauvoisin Dam",
        w2: "Verzasca Dam",
        exp: "The Grande Dixence dam collects meltwater from thirty-five Valaisian glaciers, weighing fifteen million tons (heavier than the Great Pyramid of Giza)."
      },
      {
        q: "Which 220-meter arch dam in Ticino was famously featured in the opening bungee jump stunt of the 1995 James Bond film GoldenEye?",
        correct: "Verzasca Dam Contra Dam",
        w1: "Grande Dixence",
        w2: "Emosson Dam",
        exp: "Stuntman Wayne Michaels set a world record for the highest commercial bungee jump from a structure, leaping 220 meters into the narrow Verzasca gorge."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Gotthard Base Tunnel, the longest railway tunnel on Earth?",
      target: 57,
      unit: "kilometers",
      imperial: "35.5 miles",
      exp: "The Gotthard Base Tunnel measures exactly 57.09 kilometers (rounded to 57 km) between Erstfeld and Bodio."
    }
  },

  // Cycle 4: Major Cities & National Capitals
  {
    mcqs: [
      {
        q: "What historic UNESCO-listed medieval city along the Aare River serves as the de facto federal capital (Federal City / Bundesstadt) of Switzerland?",
        correct: "Bern",
        w1: "Zurich",
        w2: "Geneva",
        exp: "Founded in 1191 by Duke Berthold V of Zähringen, Bern is celebrated for its six kilometers of covered sandstone shopping arcades (Lauben) and the Zytglogge clock tower."
      },
      {
        q: "What is the largest city in Switzerland by population and its premier global banking and financial center, located on the Limmat River?",
        correct: "Zurich Zürich",
        w1: "Basel",
        w2: "Geneva",
        exp: "Zurich is home to the prestigious ETH Zurich university (where Albert Einstein studied), Bahnhofstrasse luxury avenue, and Fraumünster Chagall stained glass."
      },
      {
        q: "Which international diplomatic hub at the western tip of Lake Geneva hosts the European headquarters of the United Nations and the International Committee of the Red Cross?",
        correct: "Geneva Genève",
        w1: "Lausanne",
        w2: "Basel",
        exp: "Geneva was the theological cradle of John Calvin Protestant Reformation, known as the Peace Capital for hosting over thirty-five international organizations."
      },
      {
        q: "Which cultural city on the Rhine River where the borders of Switzerland, France, and Germany meet is the center of the Swiss chemical and pharmaceutical industry?",
        correct: "Basel Bâle",
        w1: "St. Gallen",
        w2: "Winterthur",
        exp: "Basel features forty museums, the historic red sandstone Basel Minster, and hosts the premier international contemporary art fair, Art Basel."
      },
      {
        q: "Which hillside city on the northern shore of Lake Geneva is known as the Olympic Capital, serving as the headquarters of the International Olympic Committee (IOC) since 1915?",
        correct: "Lausanne",
        w1: "Montreux",
        w2: "Vevey",
        exp: "Lausanne is home to the Olympic Museum, the Court of Arbitration for Sport (CAS), and the gothic Lausanne Cathedral overlooking terraced Lavaux vineyards."
      }
    ],
    number: {
      q: "In what year did the International Olympic Committee (IOC) officially establish its global headquarters in Lausanne, Switzerland?",
      target: 1915,
      unit: "year",
      imperial: "1915 AD",
      exp: "Baron Pierre de Coubertin relocated the IOC headquarters to neutral Switzerland in April 1915 during World War I."
    }
  },

  // Cycle 5: The 26 Cantons & Direct Democracy
  {
    mcqs: [
      {
        q: "Into how many sovereign federative cantons and half-cantons is the Swiss Confederation politically divided?",
        correct: "26 Cantons",
        w1: "20 Cantons",
        w2: "30 Cantons",
        exp: "Under the Swiss Federal Constitution, all twenty-six cantons exercise equal sovereignty, from tiny Appenzell Innerrhoden to massive Grisons."
      },
      {
        q: "What is the largest canton in Switzerland by geographical land area, covering over 7,100 square kilometers of high alpine valleys in the east?",
        correct: "Grisons Graubünden",
        w1: "Bern",
        w2: "Valais",
        exp: "Grisons is the only trilingual canton in Switzerland (German, Romansh, Italian), home to Saint Moritz, Davos, and the Swiss National Park."
      },
      {
        q: "What traditional open-air public assembly of direct democracy, where citizens vote on laws by raising their hands, is still practiced annually in Appenzell Innerrhoden and Glarus?",
        correct: "Landsgemeinde",
        w1: "Ständerat",
        w2: "Gemeindeversammlung",
        exp: "Originating in the 13th century, the Landsgemeinde represents one of the oldest surviving forms of direct citizen democracy in the world."
      },
      {
        q: "Which mountain meadow above Lake Lucerne is revered as the historic birthplace of the Swiss Confederation, where three cantons swore the Federal Charter in August 1291?",
        correct: "Rütli Meadow Rütliwiese",
        w1: "Altdorf",
        w2: "Morgarten",
        exp: "Representatives from Uri, Schwyz, and Unterwalden swore the Rütli Oath (Rütlischwur) to defend their mutual independence against the Habsburg dynasty."
      },
      {
        q: "How many official national languages are recognized by the Swiss Federal Constitution (German, French, Italian, and Romansh)?",
        correct: "4 Official Languages",
        w1: "3 Official Languages",
        w2: "2 Official Languages",
        exp: "German is spoken by roughly sixty-two percent of citizens, French by twenty-three percent, Italian by eight percent, and Romansh by less than one percent."
      }
    ],
    number: {
      q: "How many sovereign cantons comprise the Swiss Confederation?",
      target: 26,
      unit: "cantons",
      imperial: "26 Cantons",
      exp: "Switzerland is a federal republic consisting of twenty-six cantons (twenty full cantons and six half-cantons)."
    }
  },

  // Cycle 6: Swiss Watchmaking, Jura & Precision Industries
  {
    mcqs: [
      {
        q: "What limestone mountain range along the northwestern Swiss-French border gives its name to the Jurassic geological period and the Swiss luxury horology valley?",
        correct: "The Jura Mountains",
        w1: "The Vosges",
        w2: "The Alps",
        exp: "The Jura mountain valleys (Watch Valley) became the world epicenter of high-precision mechanical watchmaking in the 18th and 19th centuries."
      },
      {
        q: "Which high-altitude watchmaking valley in the canton of Vaud is home to prestigious haute horlogerie manufactures like Audemars Piguet, Jaeger-LeCoultre, and Blancpain?",
        correct: "Vallée de Joux",
        w1: "Val-de-Travers",
        w2: "Val de Ruz",
        exp: "During long, freezing alpine winters when farming was impossible, mountain farmers developed intricate micro-mechanical escapements and tourbillons."
      },
      {
        q: "Which twin watchmaking towns in Neuchâtel were planned specifically around natural light for watchmakers workshops, designated a UNESCO World Heritage site?",
        correct: "La Chaux-de-Fonds and Le Locle",
        w1: "Biel and Solothurn",
        w2: "Saint-Imier and Porrentruy",
        exp: "Birthplace of modernist architect Le Corbusier and luxury watch brands like Breitling and Tissot, the towns feature wide grid streets designed for watch craft efficiency."
      },
      {
        q: "What famous multi-tool red pocket knife, manufactured since 1891 by Victorinox in Ibach, is officially issued to the Swiss Armed Forces?",
        correct: "Swiss Army Knife Schweizer Offiziersmesser",
        w1: "Opinel",
        w2: "Leatherman",
        exp: "Emblazoned with the white Swiss cross on a red shield, the knife features stainless steel blades, screwdrivers, can openers, and corkscrews."
      },
      {
        q: "Which particle physics laboratory near Geneva operates the 27-kilometer underground ring of the Large Hadron Collider (LHC), discovering the Higgs Boson in 2012?",
        correct: "CERN European Organization for Nuclear Research",
        w1: "ITER",
        w2: "ESA",
        exp: "Founded in 1954 across the Swiss-French border, CERN was also the birthplace of the World Wide Web, invented by British scientist Tim Berners-Lee in 1989."
      }
    ],
    number: {
      q: "In what year did British scientist Tim Berners-Lee invent the World Wide Web while working at CERN in Geneva, Switzerland?",
      target: 1989,
      unit: "year",
      imperial: "1989 AD",
      exp: "Tim Berners-Lee submitted his landmark proposal 'Information Management: A Proposal' at CERN in March 1989."
    }
  },

  // Cycle 7: Swiss Cheese, Chocolate & Gastronomy
  {
    mcqs: [
      {
        q: "Which hard yellow Swiss raw cow milk cheese, originating in the canton of Fribourg, is famous for its smooth melting qualities in traditional Swiss fondue?",
        correct: "Gruyère Le Gruyère AOP",
        w1: "Emmental",
        w2: "Appenzeller",
        exp: "Crafted in copper vats since 1115 CE around the medieval town of Gruyères, authentic Gruyère has a complex nutty, earthy flavor without holes."
      },
      {
        q: "Which iconic Swiss raw cow milk cheese from the Emme river valley in the canton of Bern is famous worldwide for its characteristic large fermentation eyes (holes)?",
        correct: "Emmentaler AOP",
        w1: "Tête de Moine",
        w2: "Sbrinz",
        exp: "Propionic acid bacteria (Propionibacterium freudenreichii) consume lactic acid and release carbon dioxide bubbles trapped inside the cheese wheel during ripening."
      },
      {
        q: "Which Swiss cylindrical raw-milk cheese, invented by monks in the Jura 800 years ago, is traditionally pared into delicate floral rosettes using a rotating Girolle scraper blade?",
        correct: "Tête de Moine Monk Head",
        w1: "Vacherin Mont d Or",
        w2: "Raclette du Valais",
        exp: "Scraping aerates the cheese surface, releasing volatile flavor compounds of alpine pastures harvested around Bellelay Abbey."
      },
      {
        q: "In which Swiss city in 1875 did chocolatier Daniel Peter, working with baby-food chemist Henri Nestlé, invent the world first solid Milk Chocolate?",
        correct: "Vevey",
        w1: "Zurich",
        w2: "Bern",
        exp: "Peter combined condensed milk powder with cocoa mass to overcome excess water content, transforming the global confectionery industry."
      },
      {
        q: "Which famous triangular chocolate bar with honey and almond nougat, created by Theodor Tobler in Bern in 1908, was inspired by the shape of the Matterhorn?",
        correct: "Toblerone",
        w1: "Lindt Excellence",
        w2: "Cailler",
        exp: "The Toblerone logo famously contains a hidden silhouette of a bear, the heraldic animal and symbol of the city of Bern."
      }
    ],
    number: {
      q: "In what year did Swiss confectioner Daniel Peter successfully invent solid milk chocolate in Vevey, Switzerland?",
      target: 1875,
      unit: "year",
      imperial: "1875 AD",
      exp: "Daniel Peter perfected the recipe for solid milk chocolate in 1875 after eight years of experimentation using condensed milk."
    }
  },

  // Cycle 8: Headwaters of Europe & Hydrology
  {
    mcqs: [
      {
        q: "Which lake in the Gotthard Massif at 2,345 meters elevation is revered as the official geographical source of the Rhine River?",
        correct: "Lake Toma Lai da Tuma",
        w1: "Lake Constance",
        w2: "Lake Sils",
        exp: "The Rein da Tuma flows into the Vorderrhein before traveling 1,233 kilometers through six nations to the North Sea."
      },
      {
        q: "From which melting alpine glacier in the eastern Valais does the Rhône River originate before flowing through Lake Geneva and southern France into the Mediterranean Sea?",
        correct: "Rhône Glacier Rhonegletscher",
        w1: "Aletsch Glacier",
        w2: "Tiefen Glacier",
        exp: "The glacier features an ice grotto carved fresh each summer, covered in protective white fleece thermal blankets to slow summer ice melt."
      },
      {
        q: "At which mountain pass in the Gotthard Massif can a raindrop drain into four different seas (North Sea, Mediterranean, Adriatic, and Black Sea)?",
        correct: "Gotthard Massif Water Castle of Europe",
        w1: "Simplon Pass",
        w2: "Great Saint Bernard Pass",
        exp: "The Gotthard Massif contains the headwaters of the Rhine, Rhône, Reuss, and Ticino (Po basin) rivers, making Switzerland the Water Tower of Europe."
      },
      {
        q: "What spectacular 150-meter-wide waterfall on the High Rhine near Schaffhausen is the most powerful waterfall in mainland Europe?",
        correct: "Rhine Falls Rheinfall",
        w1: "Staubbach Falls",
        w2: "Giessbach Falls",
        exp: "Formed 15,000 years ago during the last Ice Age, the Rhine Falls drop twenty-three meters over limestone bedrock, discharging up to 600,000 liters per second."
      },
      {
        q: "What deep glacial valley in the Bernese Oberland, featuring seventy-two waterfalls plunging from sheer limestone cliffs, inspired J.R.R. Tolkien valley of Rivendell?",
        correct: "Lauterbrunnen Valley",
        w1: "Grindelwald Valley",
        w2: "Kandersteg Valley",
        exp: "Lauterbrunnen features the 297-meter Staubbach Falls (visited by Goethe) and the subterranean Trümmelbach Falls draining ten glacier gorges."
      }
    ],
    number: {
      q: "How many vertical waterfall cascades plunge into the famous glacial canyon of the Lauterbrunnen Valley in the Bernese Oberland?",
      target: 72,
      unit: "waterfalls",
      imperial: "72 waterfalls",
      exp: "Lauterbrunnen Valley is known as the Valley of 72 Waterfalls, plunging over vertical limestone cliffs up to 300 meters high."
    }
  },

  // Cycle 9: The Lavaux Vineyards & UNESCO Landscapes
  {
    mcqs: [
      {
        q: "What 800-hectare UNESCO World Heritage terraced wine region stretches for thirty kilometers along the northern shores of Lake Geneva between Lausanne and Montreux?",
        correct: "Lavaux Vineyard Terraces",
        w1: "Valais Terraces",
        w2: "Bündner Herrschaft",
        exp: "Constructed by 11th-century Benedictine and Cistercian monks, Lavaux stone terraces benefit from 'three suns': direct sunlight, lake reflection, and stone wall stored heat."
      },
      {
        q: "Which white grape variety, known in Switzerland as Fendant in Valais, is the signature grape of the Lavaux terraces and Lake Geneva wine culture?",
        correct: "Chasselas",
        w1: "Petite Arvine",
        w2: "Müller-Thurgau",
        exp: "Chasselas produces delicate, dry, mineral-forward white wines that pair exceptionally well with Swiss fondue and Lake Geneva perch fillets (filets de perche)."
      },
      {
        q: "What romantic 12th-century oval stone castle on a small rocky island in Lake Geneva was immortalized in Lord Byron 1816 poem The Prisoner of Chillon?",
        correct: "Château de Chillon",
        w1: "Château de Grandson",
        w2: "Château de Gruyères",
        exp: "Chillon was the fortified toll residence of the Counts of Savoy, commanding the strategic trade road between the Alps and Lake Geneva."
      },
      {
        q: "What high mountain pass between Martigny in Switzerland and Aosta in Italy is famous for the medieval hospice founded in 1049 and Saint Bernard rescue dogs?",
        correct: "Great Saint Bernard Pass",
        w1: "Simplon Pass",
        w2: "San Bernardino Pass",
        exp: "Augustinian monks bred the large Saint Bernard dogs to locate lost travelers buried in winter avalanches across the 2,469-meter pass."
      },
      {
        q: "What is the only official National Park in Switzerland, founded in the Engadine valley of Grisons in 1914 as a strict untouched nature reserve?",
        correct: "Swiss National Park Parc Naziunal Svizzer",
        w1: "Biosfera Val Müstair",
        w2: "Parc Ela",
        exp: "Covering 170 square kilometers of pristine alpine wilderness, visitors must stay on marked paths to allow ibex, chamois, golden eagles, and bearded vultures to thrive undisturbed."
      }
    ],
    number: {
      q: "In what year was the Swiss National Park established in the Engadine, the oldest national park in the Alps and Central Europe?",
      target: 1914,
      unit: "year",
      imperial: "1914 AD",
      exp: "The Swiss National Park was officially founded on Swiss National Day, August 1, 1914."
    }
  },

  // Cycle 10: Extent, Neutrality & Swiss Superlatives
  {
    mcqs: [
      {
        q: "In what year was Switzerland permanent armed neutrality officially recognized by European great powers at the historic Congress of Vienna?",
        correct: "1815",
        w1: "1648",
        w2: "1919",
        exp: "The 1815 Treaty of Paris established Switzerland sovereign neutrality, allowing the country to avoid foreign wars and military alliances for over two centuries."
      },
      {
        q: "What humanitarian international organization, symbolized by the inverse colors of the Swiss flag, was founded in Geneva in 1863 by Swiss businessman Henry Dunant?",
        correct: "International Committee of the Red Cross ICRC",
        w1: "Amnesty International",
        w2: "Doctors Without Borders",
        exp: "Witnessing the horrors of the 1859 Battle of Solferino, Dunant created the Red Cross, winning the very first Nobel Peace Prize in 1901."
      },
      {
        q: "What is the total land area of Switzerland in square kilometers, making it roughly the size of the Netherlands or US state of Maryland?",
        correct: "41,285 Square Kilometers",
        w1: "25,000 Square Kilometers",
        w2: "65,000 Square Kilometers",
        exp: "Despite its compact size, seventy percent of Switzerland territory is covered by mountains (the Alps and the Jura)."
      },
      {
        q: "How many sovereign nations share a direct terrestrial land border with Switzerland (Germany, France, Italy, Austria, and Liechtenstein)?",
        correct: "5 Countries",
        w1: "4 Countries",
        w2: "6 Countries",
        exp: "Switzerland land borders stretch 1,852 kilometers through the heart of Western Europe, completely surrounded by European Union member states."
      },
      {
        q: "What famous 2.1-meter-high open-air sculpture carved directly into a sandstone cliff in Lucerne commemorates the Swiss Guards massacred during the French Revolution in 1792?",
        correct: "Lion Monument Löwendenkmal",
        w1: "William Tell Monument",
        w2: "Helvetia Statue",
        exp: "Designed by Danish sculptor Bertel Thorvaldsen, Mark Twain described the dying lion as the most mournful and that piece of stone in the world."
      }
    ],
    number: {
      q: "In what year was Swiss armed neutrality formally ratified in international law at the Congress of Vienna?",
      target: 1815,
      unit: "year",
      imperial: "1815 AD",
      exp: "On November 20, 1815, the Treaty of Paris formally recognized the permanent neutrality of Switzerland within the international system."
    }
  }
];

// Build Switzerland Quiz
buildQuiz({
  id: 'switzerland-geography-heritage-60',
  theme: 'Switzerland: Geography, Alpine Peaks & Precision Engineering',
  title: 'Switzerland: Geography, Alpine Peaks & Precision Engineering',
  description: 'A 60-question grand master assessment exploring the Matterhorn & Jungfraujoch, Lake Geneva & Jet d Eau, Gotthard Base Tunnel (57 km), Bern capital, 26 cantons, Jura watchmaking, Swiss cheese & chocolate, headwaters of Europe, and 1815 neutrality.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, switzerlandCycles);

console.log('Switzerland quiz built successfully!');
