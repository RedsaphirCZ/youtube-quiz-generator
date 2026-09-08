const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 3. austria-geography-heritage-60
// =========================================================================
const austriaCycles = [
  // Cycle 1: The Danube & Vienna Imperial Heritage
  {
    mcqs: [
      {
        q: "What capital city of Austria along the Danube River was the imperial seat of the Habsburg Monarchy for over six centuries, renowned as the City of Music?",
        correct: "Vienna Wien",
        w1: "Salzburg",
        w2: "Graz",
        exp: "Vienna was home to Mozart, Beethoven, and Freud, regularly ranked as having the highest quality of living among world metropolises."
      },
      {
        q: "What colossal 1,441-room Baroque summer residence of the Habsburg emperors in Vienna features the Gloriette colonnade, Maze, and Tiergarten (world oldest zoo)?",
        correct: "Schönbrunn Palace Schloss Schönbrunn",
        w1: "Hofburg Palace",
        w2: "Belvedere Palace",
        exp: "Schönbrunn was the residence of Empress Maria Theresa and Emperor Franz Joseph, where six-year-old Mozart performed for the imperial court in 1762."
      },
      {
        q: "What massive imperial palace complex in central Vienna served as the winter residence of the Habsburgs and now houses the Austrian National Library and Spanish Riding School?",
        correct: "The Hofburg Imperial Palace",
        w1: "Belvedere Palace",
        w2: "Liechtenstein City Palace",
        exp: "The Hofburg spans twenty-four hectares across eighteen wings and nineteen courtyards, housing the Imperial Treasury (Kaisergruft) and Sisi Museum."
      },
      {
        q: "What iconic 12th-century Gothic cathedral in the heart of Vienna features a 136-meter South Tower (Steffl) and a colorful zigzag glazed ceramic tiled roof?",
        correct: "St. Stephen Cathedral Stephansdom",
        w1: "Karlskirche",
        w2: "Votive Church",
        exp: "Stephansdom tiled roof features 230,000 colored tiles depicting the double-headed imperial eagle of the Habsburg Empire and coats of arms of Vienna and Austria."
      },
      {
        q: "What grand 5.3-kilometer circular boulevard in Vienna, commissioned by Emperor Franz Joseph in 1857 to replace medieval fortifications, is lined with historicist monumental buildings?",
        correct: "The Ringstrasse Ring Road",
        w1: "Kärntner Strasse",
        w2: "Graben",
        exp: "The Ringstrasse is lined with the Austrian Parliament (neo-Attic), City Hall (neo-Gothic), State Opera, University of Vienna, and the Kunsthistorisches Museum."
      }
    ],
    number: {
      q: "How many total rooms are contained within the magnificent imperial Schönbrunn Palace in Vienna?",
      target: 1441,
      unit: "rooms",
      imperial: "1,441 imperial rooms",
      exp: "Schönbrunn Palace contains exactly 1,441 rooms, of which forty-five imperial state apartments are open to the public."
    }
  },

  // Cycle 2: Salzburg, Mozart & The Sound of Music
  {
    mcqs: [
      {
        q: "Which UNESCO World Heritage alpine city along the Salzach River was the birthplace of musical prodigy Wolfgang Amadeus Mozart in 1756?",
        correct: "Salzburg",
        w1: "Innsbruck",
        w2: "Linz",
        exp: "Mozart Birthplace (Hagenauer Haus) on Getreidegasse street is one of the most visited musical museums in the world."
      },
      {
        q: "What massive 11th-century cliff-top fortress towers directly above the city of Salzburg, one of the largest intact medieval castles in Central Europe?",
        correct: "Hohensalzburg Fortress",
        w1: "Hohenwerfen Castle",
        w2: "Burg Kreuzenstein",
        exp: "Built in 1077 by the Prince-Archbishops of Salzburg, the fortress was never once captured by foreign invading armies during its entire history."
      },
      {
        q: "Which 17th-century Baroque palace and garden in Salzburg, built by Prince-Archbishop Wolf Dietrich for Salome Alt, was famously featured in the 1965 film The Sound of Music?",
        correct: "Mirabell Palace and Gardens",
        w1: "Hellbrunn Palace",
        w2: "Leopoldskron Palace",
        exp: "The Pegasus Fountain, Rose Garden, and Dwarf Garden at Mirabell were the primary filming backdrop for the children singing Do-Re-Mi in the film."
      },
      {
        q: "What spectacular early 17th-century Renaissance pleasure palace in Salzburg is famous for its ingenious mechanical hidden water trick fountains (Wasserspiele)?",
        correct: "Hellbrunn Palace Schloss Hellbrunn",
        w1: "Mirabell Palace",
        w2: "Klessheim Palace",
        exp: "Prince-Archbishop Markus Sittikus installed hidden water jets in dining stone benches, grottoes, and a water-powered mechanical mechanical theater with 200 moving figures."
      },
      {
        q: "What breathtaking lake district region east of Salzburg features seventy-six glittering alpine lakes surrounded by limestone peaks of the Dachstein?",
        correct: "The Salzkammergut",
        w1: "The Zillertal",
        w2: "The Bregenzerwald",
        exp: "Derived from 'Salt Chamber Estate', the region includes Lake Wolfgang (Wolfgangsee), Lake Traun, and Lake Hallstatt, renowned for Emperor Franz Joseph summer villa in Bad Ischl."
      }
    ],
    number: {
      q: "In what year was the legendary classical composer Wolfgang Amadeus Mozart born in Salzburg, Austria?",
      target: 1756,
      unit: "year",
      imperial: "1756 AD",
      exp: "Mozart was born on January 27, 1756, on Getreidegasse in the city of Salzburg."
    }
  },

  // Cycle 3: The Austrian Alps & Grossglockner
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Austria, a pyramid-shaped peak rising 3,798 meters in the High Tauern range of the Central Eastern Alps?",
        correct: "Grossglockner Grossglockner",
        w1: "Wildspitze",
        w2: "Grossvenediger",
        exp: "First climbed in July 1800 by Martin Reicher and Mathias Hautzendorfer, Grossglockner features the Glocknerwand ridge and the Pasterze Glacier."
      },
      {
        q: "What is the longest and largest glacier in Austria and the Eastern Alps, stretching over eight kilometers at the foot of the Grossglockner?",
        correct: "The Pasterze Glacier",
        w1: "Hintertux Glacier",
        w2: "Stubai Glacier",
        exp: "The Pasterze covers seventeen square kilometers, accessible via a funicular from the Kaiser-Franz-Josefs-Höhe visitor center."
      },
      {
        q: "What world-famous 48-kilometer high-altitude panoramic alpine toll road, opened in 1935, crosses thirty-six hairpin curves to connect Salzburg and Carinthia?",
        correct: "Grossglockner High Alpine Road",
        w1: "Silvretta High Alpine Road",
        w2: "Timmelsjoch High Alpine Road",
        exp: "Rising to 2,504 meters at the Hochtor Pass, the engineering masterpiece was built during the Great Depression, attracting millions of motorists annually."
      },
      {
        q: "What is the largest national park in Central Europe and the Alps, covering 1,856 square kilometers across Carinthia, Salzburg, and Tirol?",
        correct: "High Tauern National Park Nationalpark Hohe Tauern",
        w1: "Kalkalpen National Park",
        w2: "Gesäuse National Park",
        exp: "The park contains over three hundred peaks exceeding 3,000 meters, 342 glaciers, and habitats for golden eagles, alpine ibex, and bearded vultures."
      },
      {
        q: "What tiered 380-meter waterfall in the High Tauern is the highest waterfall in Austria and the fifth highest in Europe?",
        correct: "Krimml Waterfalls Krimmler Wasserfälle",
        w1: "Golling Waterfall",
        w2: "Grawa Waterfall",
        exp: "Fed by glacial meltwaters of the Krimmler Ache, the falls plunge in three distinct massive tiers (top tier 140 m, middle 100 m, lowest 140 m)."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of the Grossglockner, the highest mountain peak in Austria?",
      target: 3798,
      unit: "meters",
      imperial: "12,461 feet",
      exp: "Grossglockner stands at an official elevation of 3,798 meters above sea level in the High Tauern range."
    }
  },

  // Cycle 4: Hallstatt & The World's Oldest Salt Mine
  {
    mcqs: [
      {
        q: "What picture-postcard UNESCO World Heritage alpine village in the Salzkammergut clings between the steep slopes of the Plassen mountain and Lake Hallstatt?",
        correct: "Hallstatt",
        w1: "St. Gilgen",
        w2: "Alpbach",
        exp: "Hallstatt is so famous for wooden 16th-century houses and scenic church spires that a full-scale architectural replica of the village was constructed in Guangdong, China."
      },
      {
        q: "Which subterranean mine above the village of Hallstatt is recognized as the oldest active commercial salt mine in the world, with over 7,000 years of continuous mining?",
        correct: "Salzwelten Hallstatt",
        w1: "Hallein Salt Mine",
        w2: "Altaussee Salt Mine",
        exp: "Prehistoric miners used bronze picks to extract rock salt (White Gold), preserving ancient wooden staircases, textile fragments, and miners' tools in the dry salt chambers."
      },
      {
        q: "What major early European archaeological Iron Age culture (800 to 450 BCE) was named after the extensive prehistoric burial grounds excavated in Hallstatt?",
        correct: "The Hallstatt Culture",
        w1: "The La Tène Culture",
        w2: "The Unetice Culture",
        exp: "Rich grave goods from over 2,000 excavated graves proved prehistoric Hallstatt traded salt across the continent in exchange for amber from the Baltic and glass from the Mediterranean."
      },
      {
        q: "What famous small bone chapel (Beinhaus) inside Saint Michael Chapel in Hallstatt displays over six hundred artistically hand-painted human skulls decorated with floral motifs?",
        correct: "Hallstatt Charnel House",
        w1: "Eggenburg Charnel House",
        w2: "Sedlec Charnel House",
        exp: "Due to space constraints in the tiny alpine churchyard cemetery, graves were reopened after ten to fifteen years; bones were bleached in the sun and skulls painted with family names and wreaths."
      },
      {
        q: "What dramatic triangular metal viewing platform in the Dachstein mountains, projecting over a 400-meter sheer vertical abyss, offers views across Lake Hallstatt?",
        correct: "5 Fingers Viewing Platform",
        w1: "Skywalk Dachstein",
        w2: "Top of Salzburg",
        exp: "Shaped like a giant hand with five individual protruding steel fingers, each walkway features unique elements including glass floors and panoramic telescope periscopes."
      }
    ],
    number: {
      q: "For approximately how many thousands of years has salt been continuously extracted from the prehistoric salt mines of Hallstatt, Austria?",
      target: 7000,
      unit: "years",
      imperial: "7,000+ years of continuous mining",
      exp: "Archaeological evidence confirms salt production at Hallstatt began around 5000 BCE, making it the oldest salt mine on Earth."
    }
  },

  // Cycle 5: Eisriesenwelt & Underground Ice Caves
  {
    mcqs: [
      {
        q: "What colossal 42-kilometer subterranean limestone cave system inside the Hochkogel mountain near Werfen is the largest natural ice cave on planet Earth?",
        correct: "Eisriesenwelt World of the Ice Giants",
        w1: "Dachstein Giant Ice Cave",
        w2: "Hundalm Ice Cave",
        exp: "Discovered in 1879 by Salzburg naturalist Anton Posselt, winter chimney-effect air currents freeze spring meltwaters into monumental ice towers, frozen waterfalls, and ice cathedrals."
      },
      {
        q: "What natural phenomenon preserves the massive perennial ice formations inside the first kilometer of the Eisriesenwelt cave throughout warm summer months?",
        correct: "Chimney draft effect trapping freezing winter air inside the limestone mountain",
        w1: "Artificial refrigeration units",
        w2: "Subterranean glaciers flowing from the surface",
        exp: "In winter, cold dense outside air sinks into the lower cave passages; in summer, cold internal air blows outward, keeping interior cave temperatures below 0°C."
      },
      {
        q: "What massive 100-meter-deep cave chamber in the Dachstein Giant Ice Cave near Obertraun is renowned for King Arthur Cathedral and dramatic acoustic music light shows?",
        correct: "Dachstein Giant Ice Cave Dachstein Eishöhle",
        w1: "Eisriesenwelt",
        w2: "Mammuthöhle",
        exp: "Visitors descend into subterranean chambers where ice masses over 500 years old form frozen curtains and stalagmites up to twenty meters tall."
      },
      {
        q: "What southern Austrian federal state is famous for over 1,200 warm, crystal-clear swimming lakes, including Lake Wörthersee, nestled between the Alps and Karawanks?",
        correct: "Carinthia Kärnten",
        w1: "Styria",
        w2: "Burgenland",
        exp: "Due to Mediterranean air influences, Lake Wörthersee summer water temperatures reach 28°C, famous for the lakeside town of Velden and the Pyramidenkogel wooden observation tower."
      },
      {
        q: "What 100-meter-tall spiraling wooden observation tower overlooking Lake Wörthersee in Carinthia is the highest wooden viewing tower in the world?",
        correct: "Pyramidenkogel Tower",
        w1: "Dachstein Skywalk",
        w2: "Kitzsteinhorn Tower",
        exp: "Built from laminated timber and steel, visitors can descend from the top observation deck via a 120-meter indoor spiraling tube slide reaching speeds of 25 km/h."
      }
    ],
    number: {
      q: "What is the total explored passage length in kilometers of the Eisriesenwelt cave system, the largest ice cave in the world?",
      target: 42,
      unit: "kilometers",
      imperial: "26 miles long",
      exp: "Eisriesenwelt extends for forty-two kilometers through the limestone interior of the Tennengebirge mountains."
    }
  },

  // Cycle 6: Tirol, Innsbruck & Alpine Winter Sports
  {
    mcqs: [
      {
        q: "What alpine city along the Inn River, surrounded by the towering Nordkette mountain range, is the capital of the federal state of Tirol?",
        correct: "Innsbruck",
        w1: "Kitzbühel",
        w2: "Lienz",
        exp: "Innsbruck hosted the Winter Olympic Games twice (in 1964 and 1976), renowned for the Hungerburg funicular and Nordkette cable cars rising directly from downtown."
      },
      {
        q: "What landmark 15th-century Gothic oriel balcony in Innsbruck old town, built for Holy Roman Emperor Maximilian I, is covered in 2,657 fire-gilded copper roof tiles?",
        correct: "The Golden Roof Goldenes Dachl",
        w1: "Helbling House",
        w2: "Hofburg Innsbruck",
        exp: "Completed in 1500, Emperor Maximilian used the balcony to observe jousting tournaments and festivals in the square below, adorned with relief carvings of his two wives."
      },
      {
        q: "Which world-famous futuristic ski jumping hill in Innsbruck, overlooking the city, was designed by Iraqi-British architect Zaha Hadid in 2002?",
        correct: "Bergisel Ski Jump Bergiselschanze",
        w1: "Paul-Ausserleitner-Schanze",
        w2: "Kulm Ski Flying Hill",
        exp: "Bergisel features a 50-meter tower with a panoramic restaurant and viewing platform, serving as a core venue for the annual Four Hills Tournament (Vierschanzentournee)."
      },
      {
        q: "Which legendary ski resort village in Tirol is world-famous for the annual Hahnenkamm Downhill Race on the terrifying Streif slope, the most dangerous downhill race in alpine skiing?",
        correct: "Kitzbühel",
        w1: "St. Anton am Arlberg",
        w2: "Sölden",
        exp: "Skiers reach speeds of 145 km/h and launch eighty-meter jumps on slopes with an eighty-five percent gradient (the Mausefalle)."
      },
      {
        q: "Which mountain village in the Arlberg region of western Austria is revered as the Cradle of Modern Alpine Skiing, where Hannes Schneider developed the Arlberg stem-turn technique?",
        correct: "St. Anton am Arlberg",
        w1: "Ischgl",
        w2: "Mayrhofen",
        exp: "St. Anton founded the world first ski school in 1921, pioneering downhill skiing techniques that replaced traditional telemark skiing."
      }
    ],
    number: {
      q: "How many individual fire-gilded copper tiles cover the historic Golden Roof (Goldenes Dachl) in the old town of Innsbruck, Austria?",
      target: 2657,
      unit: "tiles",
      imperial: "2,657 gilded copper tiles",
      exp: "The Golden Roof features exactly 2,657 individual fire-gilded copper tiles reflecting the alpine sunlight."
    }
  },

  // Cycle 7: Classical Music & The Golden Hall
  {
    mcqs: [
      {
        q: "What world-famous opulent neoclassical concert hall in Vienna, celebrated for unmatched acoustics and gold caryatids, is the home venue of the Vienna Philharmonic New Year Concert?",
        correct: "The Golden Hall of the Musikverein Großer Saal",
        w1: "Vienna Konzerthaus",
        w2: "Vienna State Opera",
        exp: "Broadcast to over ninety countries every January 1, the New Year Concert concludes traditionally with Johann Strauss Sr Radetzky March and Johann Strauss Jr Blue Danube Waltz."
      },
      {
        q: "Which German-born classical composer lived in Vienna for over thirty-five years, composing his Fifth and Ninth Symphonies while battling progressive deafness?",
        correct: "Ludwig van Beethoven",
        w1: "Johannes Brahms",
        w2: "Franz Liszt",
        exp: "Beethoven wrote his famous 1802 Heiligenstadt Testament in Vienna, celebrated today with monuments at Beethovenplatz and his residence in the Pasqualati House."
      },
      {
        q: "What iconic 1867 orchestral waltz by Austrian composer Johann Strauss II, titled 'An der schönen blauen Donau', is revered as the unofficial second national anthem of Austria?",
        correct: "The Blue Danube Waltz",
        w1: "Tales from the Vienna Woods",
        w2: "Radetzky March",
        exp: "Premiered by the Vienna Men Choral Association in 1867, The Blue Danube is played on Austrian television and radio at the stroke of midnight every New Year Eve."
      },
      {
        q: "What magnificent neo-Renaissance opera house on the Vienna Ringstrasse, opened in May 1869 with Mozart opera Don Giovanni, is one of the premier opera companies in the world?",
        correct: "Vienna State Opera Wiener Staatsoper",
        w1: "Vienna Volksoper",
        w2: "Theater an der Wien",
        exp: "Every February, the seating auditorium is converted into a colossal ballroom floor to host the prestigious Vienna Opera Ball (Opernball) for 5,000 debutantes and dignitaries."
      },
      {
        q: "Which Austrian romantic composer, born in Vienna in 1797, composed over six hundred German lieder (art songs), the Trout Quintet, and the Unfinished Symphony before dying at age thirty-one?",
        correct: "Franz Schubert",
        w1: "Anton Bruckner",
        w2: "Gustav Mahler",
        exp: "Schubert intimate musical gatherings with friends and poets became known as Schubertiades, celebrated in Austrian musical history."
      }
    ],
    number: {
      q: "In what year was the historic Vienna State Opera (Wiener Staatsoper) officially opened on the Ringstrasse with Mozart's Don Giovanni?",
      target: 1869,
      unit: "year",
      imperial: "1869 AD",
      exp: "The Vienna Court Opera (now State Opera) was formally opened on May 25, 1869, in the presence of Emperor Franz Joseph and Empress Elisabeth."
    }
  },

  // Cycle 8: Viennese Coffee House Culture & Gastronomy
  {
    mcqs: [
      {
        q: "What UNESCO-inscribed cultural institution, established in Vienna in the late 17th century, is famous for marble tables, Thonet bentwood chairs, international newspapers, and lingering for hours over a single coffee?",
        correct: "Viennese Coffee House Culture Wiener Kaffeehauskultur",
        w1: "Kaffee und Kuchen",
        w2: "Aperitivo",
        exp: "Described as a place 'where time and space are consumed, but only the coffee is found on the bill', legendary cafes include Café Central, Café Sacher, and Café Sperl."
      },
      {
        q: "What famous Viennese chocolate sponge cake, invented in 1832 by apprentice chef Franz Sacher for Prince Metternich, features a thin layer of apricot jam beneath a dark chocolate glaze?",
        correct: "Sachertorte Original Sacher-Torte",
        w1: "Linzer Torte",
        w2: "Esterházy Torte",
        exp: "Served with a generous dollop of unsweetened whipped cream (Schlagobers), the recipe remains a closely guarded secret at the Hotel Sacher."
      },
      {
        q: "What traditional Austrian national culinary dish consists of a thin, tenderized veal cutlet coated in flour, beaten egg, and breadcrumbs, pan-fried in clarified butter until golden and crispy?",
        correct: "Wiener Schnitzel",
        w1: "Tafelspitz",
        w2: "Zwiebelrostbraten",
        exp: "Protected under Austrian food law, authentic Wiener Schnitzel must be made exclusively from veal (calf), served with a lemon wedge and warm Austrian potato salad (Erdäpfelsalat)."
      },
      {
        q: "What classic Austrian layered pastry dessert features paper-thin pulled strudel dough rolled around spiced tart apples, sweet raisins, and butter-toasted breadcrumbs?",
        correct: "Apfelstrudel Viennese Apple Strudel",
        w1: "Kaiserschmarrn",
        w2: "Topfenstrudel",
        exp: "Traditional bakers pull the elastic dough by hand over a linen cloth until it is translucent enough that a newspaper can be read through it."
      },
      {
        q: "What fluffy shredded sweet pancake dessert, caramelized with raisins and dusted with powdered sugar, was named in honor of Austrian Emperor Franz Joseph I?",
        correct: "Kaiserschmarrn",
        w1: "Palatschinken",
        w2: "Germknödel",
        exp: "Kaiserschmarrn (Emperor Mess) is traditionally served hot in a cast-iron skillet accompanied by sweet plum compote (Zwetschkenröster)."
      }
    ],
    number: {
      q: "In what year did apprentice confectioner Franz Sacher first create the legendary Sachertorte in Vienna?",
      target: 1832,
      unit: "year",
      imperial: "1832 AD",
      exp: "Sixteen-year-old Franz Sacher invented the Sachertorte in 1832 when the court head chef fell ill."
    }
  },

  // Cycle 9: The Wachau Valley & Benedictine Abbeys
  {
    mcqs: [
      {
        q: "What 36-kilometer UNESCO World Heritage stretch of the Danube River valley between Melk and Krems is famous for terraced vineyards, ruined castles, and apricot orchards?",
        correct: "The Wachau Valley Wachau",
        w1: "The Strudengau",
        w2: "The Nibelungengau",
        exp: "The Wachau produces world-class dry white wines from Grüner Veltliner and Riesling grapes, and the sweet Wachauer Marille (Wachau apricot)."
      },
      {
        q: "What colossal canary-yellow Baroque Benedictine abbey, perched on a 60-meter rock bluff overlooking the Danube in the Wachau, was founded in 1089?",
        correct: "Melk Abbey Stift Melk",
        w1: "Göttweig Abbey",
        w2: "Klosterneuburg Monastery",
        exp: "Designed by Jakob Prandtauer between 1702 and 1736, Melk Abbey features a magnificent library holding 100,000 historic volumes and ceilings painted by Paul Troger."
      },
      {
        q: "At which ruined hilltop castle above the Danube in the Wachau was King Richard the Lionheart of England captured and held prisoner by Duke Leopold V of Austria in 1192?",
        correct: "Dürnstein Castle Burgruine Dürnstein",
        w1: "Aggstein Castle",
        w2: "Burg Kreuzenstein",
        exp: "According to romantic medieval legend, Richard faithful troubadour Blondel traveled across Europe singing the king favorite song outside castles until hearing Richard sing the second verse."
      },
      {
        q: "What world-famous 29,500-year-old prehistoric limestone figurine of a woman, discovered in the Wachau Valley in 1908, is one of the earliest masterpieces of human art?",
        correct: "The Venus of Willendorf",
        w1: "The Venus of Dolní Věstonice",
        w2: "The Venus of Brassempouy",
        exp: "Carved from oolitic limestone tinted with red ochre, the eleven-centimeter Ice Age figurine is exhibited in the Natural History Museum in Vienna."
      },
      {
        q: "Which Benedictine abbey in Styria, founded in 1074, houses the largest monastic library in the world, renowned for its late-Baroque white-and-gold hall and ceiling frescoes by Bartolomeo Altomonte?",
        correct: "Admont Abbey Stift Admont",
        w1: "St. Florian Abbey",
        w2: "Kremsmünster Abbey",
        exp: "Completed in 1776, Admont Abbey Library contains 70,000 restored volumes and the famous wooden sculpture The Four Last Things by Josef Stammel."
      }
    ],
    number: {
      q: "In what year was King Richard the Lionheart captured near Vienna and imprisoned at Dürnstein Castle in Austria upon returning from the Third Crusade?",
      target: 1192,
      unit: "year",
      imperial: "1192 AD",
      exp: "Richard the Lionheart was captured in December 1192 and held for an enormous ransom paid in twenty-three tons of silver."
    }
  },

  // Cycle 10: Extent, 9 Federal States & Austrian Superlatives
  {
    mcqs: [
      {
        q: "Into how many sovereign federal states (Bundesländer) is the Republic of Austria politically organized?",
        correct: "9 Federal States",
        w1: "7 Federal States",
        w2: "12 Federal States",
        exp: "The nine federal states are Vienna, Lower Austria, Upper Austria, Styria, Carinthia, Salzburg, Tirol, Vorarlberg, and Burgenland."
      },
      {
        q: "What percentage of the total sovereign land area of the Republic of Austria is covered by the Alps, making it one of the most mountainous nations in Europe?",
        correct: "Over 62 Percent",
        w1: "30 Percent",
        w2: "45 Percent",
        exp: "Austria terrain is sixty-two percent mountainous, dominated by the Central Eastern Alps, Northern Limestone Alps, and Southern Limestone Alps."
      },
      {
        q: "What is the largest shallow steppe lake in Central Europe, shared between Austria (Burgenland) and Hungary, protected as a UNESCO World Heritage transboundary park?",
        correct: "Lake Neusiedl Neusiedler See",
        w1: "Lake Constance",
        w2: "Lake Traun",
        exp: "Lake Neusiedl has an average depth of just one meter, surrounded by extensive reed beds that provide vital nesting grounds for over three hundred migratory bird species."
      },
      {
        q: "In what year did the Austrian Parliament pass the Federal Constitutional Law on Permanent Neutrality, following the withdrawal of Allied occupation forces?",
        correct: "1955",
        w1: "1945",
        w2: "1989",
        exp: "Following the Austrian State Treaty signed on May 15, 1955, Parliament declared permanent armed neutrality on October 26, 1955 (celebrated today as Austrian National Day)."
      },
      {
        q: "How many sovereign nations share a direct terrestrial land border with landlocked Austria (Germany, Czechia, Slovakia, Hungary, Slovenia, Italy, Switzerland, and Liechtenstein)?",
        correct: "8 Bordering Countries",
        w1: "6 Countries",
        w2: "10 Countries",
        exp: "Austria borders stretch 2,562 kilometers through the geographical center of Europe, serving as a historic bridge between Western and Eastern Europe."
      }
    ],
    number: {
      q: "How many federal states (Bundesländer) comprise the Republic of Austria?",
      target: 9,
      unit: "federal states",
      imperial: "9 Bundesländer",
      exp: "Austria is a federal republic comprising nine Bundesländer, with Vienna functioning as both a city municipality and federal state."
    }
  }
];

// Build Austria Quiz
buildQuiz({
  id: 'austria-geography-heritage-60',
  theme: 'Austria: Geography, Alpine Peaks & Habsburg Palaces',
  title: 'Austria: Geography, Alpine Peaks & Habsburg Palaces',
  description: 'A 60-question grand master assessment exploring Vienna & Schönbrunn (1,441 rooms), Salzburg & Mozart (1756), Grossglockner (3,798 m), Hallstatt salt mines (7,000 yrs), Eisriesenwelt (42 km), Tirol & Golden Roof (2,657 tiles), Sachertorte, and 1955 neutrality.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, austriaCycles);

console.log('Austria quiz built successfully!');
