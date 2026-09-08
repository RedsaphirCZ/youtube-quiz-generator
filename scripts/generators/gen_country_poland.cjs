const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 1. poland-geography-heritage-60
// =========================================================================
const polandCycles = [
  // Cycle 1: The Vistula & Warsaw Reborn
  {
    mcqs: [
      {
        q: "What is the longest and largest river in Poland, flowing 1,047 kilometers from the Silesian Beskids through Kraków and Warsaw to the Baltic Sea?",
        correct: "Vistula River Wisła",
        w1: "Oder River",
        w2: "Warta River",
        exp: "The Vistula drainage basin covers over fifty-four percent of Poland national territory, serving as the historical spine of Polish trade."
      },
      {
        q: "What capital city of Poland, situated on the Vistula River, meticulously reconstructed its historic Old Town after eighty-five percent was destroyed in World War II?",
        correct: "Warsaw Warszawa",
        w1: "Kraków",
        w2: "Wrocław",
        exp: "Warsaw Old Town was awarded UNESCO World Heritage status in 1980 as an unprecedented example of near-total historical urban reconstruction."
      },
      {
        q: "What monumental 237-meter high-rise skyscraper in central Warsaw, gifted by the Soviet Union in 1955, is the second tallest building in Poland?",
        correct: "Palace of Culture and Science Pałac Kultury i Nauki",
        w1: "Varso Tower",
        w2: "Złota 44",
        exp: "Designed by Lev Rudnev in the Stalinist socialist realist style with Polish Renaissance touches, it houses theaters, cinemas, and a 30th-floor observation terrace."
      },
      {
        q: "What 310-meter skyscraper in Warsaw, completed in 2022, is officially the tallest building in the European Union?",
        correct: "Varso Tower",
        w1: "Palace of Culture and Science",
        w2: "Commerzbank Tower",
        exp: "Designed by British firm Foster + Partners, Varso Tower features an 80-meter architectural spire and an observation deck 230 meters above the capital."
      },
      {
        q: "Which world-famous 19th-century Polish-French composer and virtuoso pianist, born in Żelazowa Wola, requested that his heart be entombed in the Church of the Holy Cross in Warsaw?",
        correct: "Frédéric Chopin",
        w1: "Ignacy Jan Paderewski",
        w2: "Henryk Wieniawski",
        exp: "Chopin heart is sealed inside a pillar in Warsaw, commemorated with open-air summer piano concerts at the Chopin Monument in Łazienki Park."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Vistula River (Wisła), the longest river in Poland?",
      target: 1047,
      unit: "kilometers",
      imperial: "651 miles",
      exp: "The Vistula River flows for exactly 1,047 kilometers from southern Poland to Gdańsk Bay on the Baltic Sea."
    }
  },

  // Cycle 2: Kraków & Wawel Royal Castle
  {
    mcqs: [
      {
        q: "Which historic city on the Vistula River in southern Poland was the royal capital of Poland from 1038 until 1596, escaping major destruction during World War II?",
        correct: "Kraków Cracow",
        w1: "Warsaw",
        w2: "Poznań",
        exp: "Kraków historic center was among the very first sites inscribed on the UNESCO World Heritage list in 1978, centered on Europe largest medieval town square."
      },
      {
        q: "What fortified limestone hill complex overlooking the Vistula in Kraków houses the Royal Castle and the coronation cathedral of Polish kings?",
        correct: "Wawel Hill Wzgórze Wawelskie",
        w1: "Jasna Góra",
        w2: "Gubałówka",
        exp: "Wawel Cathedral houses the royal crypts of Polish monarchs and national heroes (such as Tadeusz Kościuszko and Adam Mickiewicz) and the Sigismund Bell."
      },
      {
        q: "What massive 40,000-square-meter town square in Kraków is the largest medieval market square in Europe, dating back to 1257?",
        correct: "Main Market Square Rynek Główny",
        w1: "Plac Zamkowy",
        w2: "Rynek Solny",
        exp: "Centered around the Renaissance Cloth Hall (Sukiennice) and the twin-towered St. Mary Basilica, where a bugle call (Hejnał mariacki) is played hourly."
      },
      {
        q: "According to ancient Polish mythology, what fire-breathing beast terrorized the citizens of Kraków from its cave beneath Wawel Castle before being defeated by a clever cobbler?",
        correct: "The Wawel Dragon Smok Wawelski",
        w1: "The Basilisk",
        w2: "The Griffin",
        exp: "Cobbler Skuba tricked the dragon into eating a sulfur-stuffed sheep, causing the dragon to drink half the Vistula until it burst, commemorated by a fire-breathing bronze statue."
      },
      {
        q: "Which historic Jewish quarter in Kraków, founded by King Casimir III in 1335, is internationally famous for historic synagogues, klezmer music, and Schindler List filming locations?",
        correct: "Kazimierz",
        w1: "Podgórze",
        w2: "Stare Miasto",
        exp: "Kazimierz features the 15th-century Old Synagogue, Remah Cemetery, and the former enamel factory of Oskar Schindler in nearby Podgórze."
      }
    ],
    number: {
      q: "In what year was the historic city center of Kraków inscribed as one of the original charter sites on the UNESCO World Heritage list?",
      target: 1978,
      unit: "year",
      imperial: "1978 AD",
      exp: "Kraków was inscribed in the inaugural 1978 UNESCO World Heritage session alongside the Galápagos Islands and Yellowstone."
    }
  },

  // Cycle 3: Wieliczka Salt Mine & Underground Wonders
  {
    mcqs: [
      {
        q: "What 13th-century subterranean rock salt mine near Kraków features over 287 kilometers of underground tunnels, saline lakes, and four subterranean chapels carved from solid salt?",
        correct: "Wieliczka Salt Mine Kopalnia soli Wieliczka",
        w1: "Bochnia Salt Mine",
        w2: "Kłodawa Salt Mine",
        exp: "Commercial mining operated continuously from the 13th century until 2007, visited by historical luminaries including Copernicus, Goethe, and Chopin."
      },
      {
        q: "What colossal underground cathedral chamber 101 meters beneath the surface in Wieliczka is carved entirely from rock salt, including salt-crystal chandeliers and bas-relief murals?",
        correct: "Chapel of St. Kinga Kaplica św. Kingi",
        w1: "St. Anthony Chapel",
        w2: "St. John Chapel",
        exp: "Miner-sculptors carved a full-scale replica of Leonardo da Vinci The Last Supper and an altar from translucent halite rock salt blocks."
      },
      {
        q: "What is the maximum depth in meters reached by the nine subterranean levels of the historic Wieliczka Salt Mine?",
        correct: "327 Meters Deep",
        w1: "150 Meters",
        w2: "500 Meters",
        exp: "The mine features 2,040 underground chambers across nine distinct levels, containing a subterranean sanatorium where patients breathe allergen-free microclimate salt air."
      },
      {
        q: "Which neighboring Polish salt mine in Lesser Poland, founded in 1248, is the oldest commercial salt mine in Poland and part of the joint UNESCO World Heritage inscription?",
        correct: "Bochnia Salt Mine",
        w1: "Wieliczka",
        w2: "Inowrocław Salt Mine",
        exp: "Bochnia features the August Passage (a three-kilometer subterranean railway haulage tunnel) and the underground St. Kinga chamber with multi-media historical exhibits."
      },
      {
        q: "In Polish folklore, which Hungarian princess and Queen of Poland dropped her engagement ring into a Hungarian salt mine, miraculously causing salt deposits to appear in Wieliczka?",
        correct: "Saint Kinga Cunegunda",
        w1: "Queen Jadwiga",
        w2: "Bona Sforza",
        exp: "When miners in Wieliczka dug their first exploratory shaft, they discovered the princess golden ring encased in a block of salt."
      }
    ],
    number: {
      q: "What is the maximum depth in meters reached by the deepest underground mining shafts in the Wieliczka Salt Mine?",
      target: 327,
      unit: "meters deep",
      imperial: "1,073 feet deep (9 levels)",
      exp: "The subterranean labyrinth of Wieliczka descends to a maximum depth of 327 meters beneath the surface."
    }
  },

  // Cycle 4: The Tatra Mountains & Rysy
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Poland, rising 2,499 meters in the High Tatras on the international border with Slovakia?",
        correct: "Rysy Northwestern Peak",
        w1: "Kasprowy Wierch",
        w2: "Giewont",
        exp: "Rysy has three distinct summit peaks; the 2,499-meter northwestern peak lies in Poland, while the slightly higher 2,501-meter central peak lies in Slovakia."
      },
      {
        q: "What spectacular glaciated alpine lake at 1,395 meters elevation in the High Tatras, meaning 'Eye of the Sea', was named by The Wall Street Journal as one of the world five most beautiful lakes?",
        correct: "Morskie Oko",
        w1: "Wielki Staw Polski",
        w2: "Czarny Staw",
        exp: "Covering thirty-four hectares and surrounded by sheer granite peaks including Rysy and Mengusovské, an ancient legend claimed the lake was connected underground to the Adriatic Sea."
      },
      {
        q: "Which resort town at the foot of the Tatra Mountains is celebrated as the Winter Capital of Poland and the cultural center of the indigenous Goral highlanders?",
        correct: "Zakopane",
        w1: "Szczawnica",
        w2: "Krynica-Zdrój",
        exp: "Zakopane is famous for its unique wooden Zakopane architectural style (designed by Stanisław Witkiewicz), Krupówki pedestrian avenue, and Great Krokiew ski jump."
      },
      {
        q: "What prominent 1,895-meter mountain ridge towering over Zakopane resembles the silhouette of a sleeping warrior, crowned by a 15-meter steel cross erected in 1901?",
        correct: "Mount Giewont",
        w1: "Kasprowy Wierch",
        w2: "Świnica",
        exp: "According to local Goral folklore, the Sleeping Knight will awaken to defend Poland when the nation faces its greatest peril."
      },
      {
        q: "What traditional smoked salted sheep milk cheese, crafted in decorative wooden spindle molds by shepherds in mountain huts (bacówka), is protected under European PDO law?",
        correct: "Oscypek",
        w1: "Bryndza Podhalańska",
        w2: "Bundy",
        exp: "Made from Polish Mountain Sheep milk using at least sixty percent ewe milk, Oscypek is smoked over glowing pine and spruce embers for several days."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of the highest point in Poland on Mount Rysy?",
      target: 2499,
      unit: "meters",
      imperial: "8,199 feet",
      exp: "The northwestern summit of Mount Rysy reaches an official elevation of 2,499 meters above sea level in the High Tatras."
    }
  },

  // Cycle 5: Białowieża Primeval Forest & The European Bison
  {
    mcqs: [
      {
        q: "What massive UNESCO World Heritage transboundary ancient forest straddling the border of Poland and Belarus is the last surviving remnant of the primeval lowland forest that once covered the European Plain?",
        correct: "Białowieża Forest Puszcza Białowieska",
        w1: "Kampinos Forest",
        w2: "Bory Tucholskie",
        exp: "Preserved for centuries as a private royal hunting reserve for Polish kings and Russian tsars, it contains 500-year-old oak trees and undisturbed natural ecological processes."
      },
      {
        q: "What heaviest surviving wild land mammal in Europe, which went extinct in the wild in 1919 and was successfully resurrected from twelve zoo individuals in Białowieża, roams freely in the forest?",
        correct: "European Bison Żubr",
        w1: "Eurasian Elk",
        w2: "Wild Boar",
        exp: "Białowieża is home to the world largest free-roaming herd of over eight hundred European bison (Bison bonasus), which weigh up to 900 kilograms."
      },
      {
        q: "What traditional Polish herbal vodka, flavored with a blade of wild aromatic bison grass (Hierochloe odorata) harvested from the Białowieża forest, has been produced since the 16th century?",
        correct: "Żubrówka Bison Grass Vodka",
        w1: "Chopin Vodka",
        w2: "Belvedere Vodka",
        exp: "Coumarin compounds in the grass impart a delicate herbal vanilla, woodruff, and almond flavor, traditionally served mixed with cloudy apple juice (Szarlotka cocktail)."
      },
      {
        q: "What 400-square-kilometer national park on the outskirts of Warsaw preserves ancient inland sand dunes, pine forests, and wetland marshes where elk and beavers thrive?",
        correct: "Kampinos National Park Kampinoski Park Narodowy",
        w1: "Roztocze National Park",
        w2: "Biebrza National Park",
        exp: "Designated as a UNESCO Biosphere Reserve, Kampinos is one of only a handful of national parks in the world bordering a national capital city."
      },
      {
        q: "What massive wetland river valley in northeastern Poland is the largest national park in the country, recognized as Europe premier sanctuary for migratory wetland birds and European elk?",
        correct: "Biebrza National Park Biebrzański Park Narodowy",
        w1: "Narew National Park",
        w2: "Wigry National Park",
        exp: "Covering 592 square kilometers of undisturbed peat bogs and marshes along the meandering Biebrza River, it is known as the Polish Amazon."
      }
    ],
    number: {
      q: "In what year did the European Bison (Żubr) briefly go extinct in the wild before being successfully reintroduced into the Białowieża Forest?",
      target: 1919,
      unit: "year",
      imperial: "1919 AD",
      exp: "The last wild lowland European bison in Białowieża was shot by poachers in April 1919, launching international captive-breeding conservation programs."
    }
  },

  // Cycle 6: Malbork Castle & Teutonic Fortress Heritage
  {
    mcqs: [
      {
        q: "What colossal 13th-century fortified brick fortress on the Nogat River, built by the Teutonic Order, is the largest castle in the world by land surface area?",
        correct: "Castle of the Teutonic Order in Malbork",
        w1: "Książ Castle",
        w2: "Czocha Castle",
        exp: "Covering over fifty-two acres (21 hectares) and constructed from thirty million hand-made red clay bricks, Malbork served as the capital of the Monastic State of the Teutonic Knights."
      },
      {
        q: "What famous historic port city on the Baltic Sea, home to the Long Market (Długi Targ) and Neptune Fountain, was the birthplace of the Solidarity (Solidarność) trade union movement in 1980?",
        correct: "Gdańsk Danzig",
        w1: "Gdynia",
        w2: "Szczecin",
        exp: "Led by shipyard electrician Lech Wałęsa at the Lenin Shipyard, Solidarity became the first independent trade union in the Soviet bloc, playing a central role in the collapse of communism in Europe."
      },
      {
        q: "What iconic 15th-century wooden harbor crane in Gdańsk, the largest medieval port crane in Europe, was powered by men walking inside giant six-meter wooden treadwheels?",
        correct: "The Gdańsk Crane Żuraw w Gdańsku",
        w1: "Green Gate",
        w2: "Golden Gate",
        exp: "Built into a double-towered brick gate, the crane lifted ship cargo up to four tons and installed towering wooden masts on Baltic trading caravels."
      },
      {
        q: "What fossilized organic tree resin, washed ashore along the Baltic beaches of northern Poland for thousands of years, is celebrated as Baltic Amber (Gold of the North)?",
        correct: "Baltic Amber Bursztyn",
        w1: "Copal",
        w2: "Jet",
        exp: "Gdańsk is the World Capital of Amber, where artisans have carved jewelry, religious reliquaries, and decorative boxes since the ancient Roman Amber Road."
      },
      {
        q: "What famous battle fought near Olsztyn in July 1410 was one of the largest cavalry battles in medieval Europe, where a joint Polish-Lithuanian army crushed the Teutonic Knights?",
        correct: "Battle of Grunwald First Battle of Tannenberg",
        w1: "Battle of Vienna",
        w2: "Battle of Kircholm",
        exp: "King Władysław II Jagiełło and Grand Duke Vytautas commanded 39,000 allied troops, permanently breaking the military dominance of the Teutonic Order in the Baltic."
      }
    ],
    number: {
      q: "In what historic year did the Allied Polish-Lithuanian forces defeat the Teutonic Knights at the monumental Battle of Grunwald?",
      target: 1410,
      unit: "year",
      imperial: "1410 AD",
      exp: "The Battle of Grunwald took place on July 15, 1410, shifting the balance of power in Central Europe."
    }
  },

  // Cycle 7: Copernicus, Toruń & Scientific Heritage
  {
    mcqs: [
      {
        q: "Which medieval brick-Gothic city on the Vistula River, celebrated for gingerbread cookies (Pierniki Toruńskie), was the birthplace of astronomer Nicolaus Copernicus in 1473?",
        correct: "Toruń",
        w1: "Bydgoszcz",
        w2: "Olsztyn",
        exp: "Toruń UNESCO-listed Old Town retains its original 13th-century street grid, town hall, and the Gothic House where Copernicus was born."
      },
      {
        q: "In what historic year was Nicolaus Copernicus groundbreaking treatise De revolutionibus orbium coelestium published, demonstrating that the Earth and planets revolve around the Sun (Heliocentrism)?",
        correct: "1543",
        w1: "1517",
        w2: "1582",
        exp: "Published on his deathbed in Frombork in May 1543, Copernicus mathematical model sparked the Scientific Revolution by overturning geocentric Ptolemaic astronomy."
      },
      {
        q: "Which Polish-born physicist and chemist, born in Warsaw in 1867, was the first woman to win a Nobel Prize and the only person to win Nobel Prizes in two different scientific fields (Physics and Chemistry)?",
        correct: "Marie Curie Maria Skłodowska-Curie",
        w1: "Lise Meitner",
        w2: "Maria Goeppert Mayer",
        exp: "Curie discovered the radioactive elements Polonium (named after her homeland Poland) and Radium, pioneering the field of radioactivity."
      },
      {
        q: "What famous historic university in Kraków, founded in 1364 by King Casimir the Great, is the oldest university in Poland and second oldest in Central Europe after Charles University?",
        correct: "Jagiellonian University Uniwersytet Jagielloński",
        w1: "University of Warsaw",
        w2: "University of Wrocław",
        exp: "Copernicus, Pope John Paul II (Karol Wojtyła), and writer Stanisław Lem studied at the Jagiellonian University, centered around the Gothic Collegium Maius courtyard."
      },
      {
        q: "What world-famous traditional spiced honey gingerbread cookie has been baked in Toruń since the 14th century using wooden carved pear-wood molds?",
        correct: "Toruń Gingerbread Pierniki Toruńskie",
        w1: "Lebkuchen",
        w2: "Pączki",
        exp: "Enriched with cinnamon, ginger, cloves, nutmeg, and regional linden honey, famous shapes include the heart-shaped Katarzynki (Saint Catherine cookies)."
      }
    ],
    number: {
      q: "In what year was Nicolaus Copernicus landmark astronomical treatise 'On the Revolutions of the Heavenly Spheres' officially published in Frombork?",
      target: 1543,
      unit: "year",
      imperial: "1543 AD",
      exp: "Copernicus masterpiece De revolutionibus orbium coelestium was printed and published in 1543."
    }
  },

  // Cycle 8: Masurian Lakes & Waterways
  {
    mcqs: [
      {
        q: "What post-glacial lake district in northeastern Poland, known as the Land of a Thousand Lakes, contains over 2,000 freshwater lakes connected by canals and rivers?",
        correct: "The Masurian Lake District Pojezierze Mazurskie",
        w1: "Kashubian Lake District",
        w2: "Pomeranian Lake District",
        exp: "Masuria is a world-class sailing and kayaking paradise, finalists in the New7Wonders of Nature campaign, featuring Lake Śniardwy and Lake Mamry."
      },
      {
        q: "What is the largest lake in Poland by surface area, covering 113.8 square kilometers in the heart of the Masurian Lake District?",
        correct: "Lake Śniardwy Jezioro Śniardwy",
        w1: "Lake Mamry",
        w2: "Lake Łebsko",
        exp: "Known as the Masurian Sea, Śniardwy has an average depth of 6.5 meters and features eight islands and eight-meter sailing yachts."
      },
      {
        q: "What 80-kilometer 19th-century technological engineering wonder in northern Poland transports canal boats across dry land over rolling grass hills using water-powered rail sledges?",
        correct: "The Elbląg Canal Kanał Elbląski",
        w1: "The Augustów Canal",
        w2: "The Bydgoszcz Canal",
        exp: "Designed by engineer Georg Steenke in 1844, five inclined slipway rail cradles use water wheels to lift boats 100 meters in elevation without electricity."
      },
      {
        q: "What national park along the Baltic coast of northern Poland is famous for monumental 40-meter shifting sand dunes (Ruchome wydmy) that swallow surrounding pine forests?",
        correct: "Słowiński National Park",
        w1: "Wolin National Park",
        w2: "Bory Tucholskie",
        exp: "Strong Baltic winds move the dunes at rates of up to ten meters per year, creating a surreal desert landscape between the Baltic Sea and Lake Łebsko."
      },
      {
        q: "What picturesque western Polish city, built across twelve islands on the Oder River connected by over one hundred bridges, is famous for over six hundred whimsical bronze dwarf statues (krasnale)?",
        correct: "Wrocław",
        w1: "Poznań",
        w2: "Szczecin",
        exp: "The dwarfs originated in the 1980s as a peaceful anti-communist protest symbol by the Orange Alternative movement, now forming a popular city scavenger hunt."
      }
    ],
    number: {
      q: "What is the total surface area in square kilometers of Lake Śniardwy, the largest lake in Poland?",
      target: 114,
      unit: "square kilometers",
      imperial: "44 square miles (113.8 sq km)",
      exp: "Lake Śniardwy spans 113.8 square kilometers (rounded to 114 sq km) in the Warmian-Masurian Voivodeship."
    }
  },

  // Cycle 9: Polish Pierogi, Soups & Gastronomy
  {
    mcqs: [
      {
        q: "What world-famous traditional Polish half-moon filled dumplings, boiled and pan-fried with crispy onions and butter, are Poland undisputed national comfort food?",
        correct: "Pierogi",
        w1: "Pelmeni",
        w2: "Varenyky",
        exp: "Popular fillings include potato and curd cheese (Pierogi Ruskie), minced pork, sauerkraut with forest mushrooms, and sweet summer blueberries with sweet cream."
      },
      {
        q: "What traditional sour rye soup, fermented from sourdough starter (zakwas) and cooked with smoked kiełbasa sausage, marjoram, and boiled eggs, is traditionally served in a hollowed sourdough bread bowl at Easter?",
        correct: "Żurek Żur",
        w1: "Barszcz Czerwony",
        w2: "Kapuśniak",
        exp: "The natural fermentation of rye flour gives Żurek its distinct tart flavor and velvety texture, seasoned with crushed garlic and horseradish."
      },
      {
        q: "What hearty traditional Polish hunter stew, considered a national dish, is slow-simmered for days with sauerkraut, shredded fresh cabbage, pork, smoked kiełbasa, wild dried ceps, and prunes?",
        correct: "Bigos",
        w1: "Gołąbki",
        w2: "Kotlet Schabowy",
        exp: "According to tradition, Bigos improves in flavor each time it is reheated, historically carried in barrels by Polish nobility on winter horse-hunting expeditions."
      },
      {
        q: "What traditional Polish cabbage rolls, stuffed with a seasoned mixture of minced pork or beef and rice, are baked in a rich savory tomato or wild mushroom sauce?",
        correct: "Gołąbki Little Pigeons",
        w1: "Pyzy",
        w2: "Kopytka",
        exp: "Named Gołąbki (meaning 'Little Pigeons') after their rolled shape, they are served as a beloved Sunday family feast across all regions of Poland."
      },
      {
        q: "What famous deep-fried Polish yeast dough doughnuts, filled with sweet rose petal jam or plum powidła and covered in sugar glaze and candied orange peel, are eaten by the millions on Fat Thursday (Tłusty Czwartek)?",
        correct: "Pączki",
        w1: "Faworki",
        w2: "Makowiec",
        exp: "On Fat Thursday (the last Thursday before Lent), Poles consume an estimated one hundred million pączki across the country."
      }
    ],
    number: {
      q: "In what year did the historic Polish trade union and social movement Solidarity (Solidarność) form at the Gdańsk shipyard under Lech Wałęsa?",
      target: 1980,
      unit: "year",
      imperial: "1980 AD",
      exp: "Solidarity was founded on September 17, 1980, following the historic August strikes in the Gdańsk shipyards."
    }
  },

  // Cycle 10: Extent, 16 Voivodeships & Polish Superlatives
  {
    mcqs: [
      {
        q: "Into how many first-level administrative provinces (Voivodeships / Województwa) is the Republic of Poland politically organized?",
        correct: "16 Voivodeships",
        w1: "12 Voivodeships",
        w2: "20 Voivodeships",
        exp: "Created in the 1999 administrative reform, the sixteen voivodeships (such as Masovian, Lesser Poland, Lower Silesia, and Pomeranian) are led by provincial marshals and voivodes."
      },
      {
        q: "What is the largest voivodeship in Poland by both land area and population, covering 35,558 square kilometers surrounding the capital city of Warsaw?",
        correct: "Masovian Voivodeship Województwo mazowieckie",
        w1: "Greater Poland",
        w2: "Lesser Poland",
        exp: "Masovia is the economic center of Poland, generating over twenty-two percent of national GDP."
      },
      {
        q: "What is the total land area of the Republic of Poland in square kilometers, ranking it as the ninth largest sovereign nation in Europe?",
        correct: "312,696 Square Kilometers",
        w1: "210,000 Square Kilometers",
        w2: "450,000 Square Kilometers",
        exp: "Poland spans over 312,000 square kilometers, bordered by seven nations (Germany, Czechia, Slovakia, Ukraine, Belarus, Lithuania, and Russia) and the Baltic Sea."
      },
      {
        q: "What monumental historic monastery complex atop a limestone hill in Częstochowa is the spiritual heart of Poland, housing the revered Black Madonna icon (Our Lady of Częstochowa)?",
        correct: "Jasna Góra Monastery",
        w1: "Kalwaria Zebrzydowska",
        w2: "Święta Lipka",
        exp: "Jasna Góra famously resisted a forty-day siege by Swedish forces during the 1655 Deluge, drawing over four million annual walking pilgrims."
      },
      {
        q: "What massive medieval brick Gothic fortified church in Gdańsk, completed in 1502, is the largest brick church building in the world, accommodating 25,000 people?",
        correct: "St. Mary Church Bazylika Mariacka",
        w1: "Wawel Cathedral",
        w2: "Gniezno Cathedral",
        exp: "St. Mary features a 78-meter bell tower and an intricate 1470 astronomical clock by Hans Düringer displaying days, lunar phases, and zodiac constellations."
      }
    ],
    number: {
      q: "How many administrative Voivodeships (Województwa) make up the territorial structure of the Republic of Poland?",
      target: 16,
      unit: "voivodeships",
      imperial: "16 voivodeships",
      exp: "Poland is divided into sixteen official voivodeships under the local government system."
    }
  }
];

// Build Poland Quiz
buildQuiz({
  id: 'poland-geography-heritage-60',
  theme: 'Poland: Geography, Royal Castles & Primeval Forests',
  title: 'Poland: Geography, Royal Castles & Primeval Forests',
  description: 'A 60-question grand master assessment exploring the Vistula River (1,047 km), Warsaw rebirth, Kraków & Wawel (1978), Wieliczka Salt Mine (327 m), Mount Rysy (2,499 m), Białowieża European bison (1919), Malbork Castle (1410), Copernicus (1543), and Masurian Lakes.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, polandCycles);

console.log('Poland quiz built successfully!');
