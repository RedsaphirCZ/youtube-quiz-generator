const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 5. czech-republic-geography-heritage-60
// =========================================================================
const czechCycles = [
  // Cycle 1: The Vltava & Prague (City of a Hundred Spires)
  {
    mcqs: [
      {
        q: "What capital city of the Czech Republic, situated along the Vltava River, is internationally celebrated as the City of a Hundred Spires and the Golden City?",
        correct: "Prague Praha",
        w1: "Brno",
        w2: "Ostrava",
        exp: "Spared major destruction during WWII, Prague historic center is a UNESCO World Heritage masterwork of Romanesque, Gothic, Renaissance, and Baroque architecture."
      },
      {
        q: "What iconic 14th-century Gothic stone arch bridge spanning the Vltava in Prague is decorated with thirty baroque statues of saints?",
        correct: "Charles Bridge Karlův most",
        w1: "Mánes Bridge",
        w2: "Čech Bridge",
        exp: "Commissioned by Holy Roman Emperor Charles IV in 1357, legend holds that medieval masons mixed raw egg yolks into the mortar to strengthen the stone piers."
      },
      {
        q: "What massive 9th-century hilltop fortification complex in Prague is recognized by Guinness as the largest ancient castle complex in the world, covering nearly seventy thousand square meters?",
        correct: "Prague Castle Pražský hrad",
        w1: "Karlštejn Castle",
        w2: "Křivoklát Castle",
        exp: "Prague Castle encompasses the Gothic St. Vitus Cathedral, the Old Royal Palace, St. George Basilica, and the tiny colorful cottages of Golden Lane."
      },
      {
        q: "What monumental Gothic cathedral inside Prague Castle, founded in 1344 by Charles IV and completed in 1929, houses the Czech Crown Jewels and St. Wenceslas Chapel?",
        correct: "St. Vitus Cathedral Katedrála svatého Víta",
        w1: "Church of Our Lady before Týn",
        w2: "St. Nicholas Church",
        exp: "St. Vitus features stained-glass windows designed by Art Nouveau master Alphonse Mucha and the silver tomb of Saint John of Nepomuk."
      },
      {
        q: "What picturesque narrow cobblestone lane inside Prague Castle is named after 16th-century goldsmiths and legendary royal alchemists searching for the Philosopher Stone?",
        correct: "Golden Lane Zlatá ulička",
        w1: "Nerudova Street",
        w2: "Celetná Street",
        exp: "House No. 22 along the colorful lane was rented by author Franz Kafka in 1916 to write short stories in quiet contemplation."
      }
    ],
    number: {
      q: "In what year did Holy Roman Emperor Charles IV officially lay the foundation stone for the construction of the Charles Bridge in Prague?",
      target: 1357,
      unit: "year",
      imperial: "1357 AD",
      exp: "According to astrological calculations, Emperor Charles IV laid the cornerstone on July 9, 1357, at 5:31 AM (a palindrome sequence: 1357-9-7-5:31)."
    }
  },

  // Cycle 2: Prague Astronomical Clock (Orloj) & Old Town
  {
    mcqs: [
      {
        q: "What famous medieval astronomical clock mounted on the Old Town City Hall in Prague, installed in 1410, is the oldest astronomical clock still operating in the world?",
        correct: "Prague Astronomical Clock Pražský orloj",
        w1: "Olomouc Astronomical Clock",
        w2: "Strasbourg Clock",
        exp: "The clock displays Babylonian time, Old Czech time, solar time, astronomical positions of the Sun and Moon, and the current zodiac constellation."
      },
      {
        q: "What mechanical spectacle occurs at the top of every hour as crowds gather below the Prague Astronomical Clock?",
        correct: "The Walk of the Apostles animated statues appear in upper windows while a skeleton strikes the hour chime",
        w1: "A firework shoots from the spire",
        w2: "A brass carillon plays the national anthem",
        exp: "The mechanical figures of the Twelve Apostles rotate through the upper windows while Death (represented as a skeleton holding an hourglass) nods and rings his bell."
      },
      {
        q: "What iconic Gothic twin-towered church, with 80-meter pointed spires nicknamed Adam and Eve, dominates the skyline of Prague Old Town Square?",
        correct: "Church of Our Lady before Týn",
        w1: "St. Nicholas Church",
        w2: "Bethlehem Chapel",
        exp: "Týn Church contains the marble tomb of Danish Renaissance astronomer Tycho Brahe, who served as imperial court astronomer to Emperor Rudolf II in Prague."
      },
      {
        q: "What prominent bronze monument in the center of Prague Old Town Square commemorates the 15th-century religious reformer who was burned at the stake for heresy in 1415?",
        correct: "Jan Hus Monument",
        w1: "King Charles IV Statue",
        w2: "Saint Wenceslas Statue",
        exp: "Jan Hus preached in the Czech language at the nearby Bethlehem Chapel, sparking the Hussite Wars and early Protestant reform movements."
      },
      {
        q: "According to dark Prague folklore, what did the city council do to master clockmaker Hanuš to prevent him from ever building a more magnificent astronomical clock for another city?",
        correct: "They blinded him with hot iron rods",
        w1: "They banished him to Bohemia",
        w2: "They threw him from the tower",
        exp: "Legend holds that in revenge, the dying Hanuš placed his hand into the clock gears, disabling the complex mechanism for over a century."
      }
    ],
    number: {
      q: "In what year was the core mechanical movement of the Prague Astronomical Clock (Orloj) first installed by clockmaker Mikuláš of Kadaň?",
      target: 1410,
      unit: "year",
      imperial: "1410 AD",
      exp: "The Prague Orloj was installed on the Old Town Hall tower in October 1410."
    }
  },

  // Cycle 3: Český Krumlov & South Bohemia
  {
    mcqs: [
      {
        q: "What fairy-tale UNESCO World Heritage medieval town in South Bohemia is nestled inside a tight horseshoe meander of the Vltava River, overlooked by a massive pastel castle?",
        correct: "Český Krumlov",
        w1: "Telč",
        w2: "Třeboň",
        exp: "Preserved in its 16th-century Renaissance layout under the Rožmberk (Rosenberg) noble family, it is the second most visited tourist destination in the Czech Republic."
      },
      {
        q: "What unique theatrical treasure inside Český Krumlov Castle is one of only two preserved 18th-century Baroque theatres in the world with original wooden stage machinery, scenery flats, and costumes intact?",
        correct: "The Baroque Castle Theatre",
        w1: "The Estates Theatre",
        w2: "The National Theatre",
        exp: "Completed in 1766, hand-operated winches and ropes shift perspective stage flats in seconds, creating wind, thunder, and wave illusion effects."
      },
      {
        q: "What animal species has been kept in the castle moat (Medvědí příkop) of Český Krumlov Castle continuously since 1707, honoring the noble Orsini family heraldry?",
        correct: "Brown Bears",
        w1: "Gray Wolves",
        w2: "Wild Boars",
        exp: "The Rosenberg family traced their ancestry to the noble Italian Orsini family (derived from orso meaning bear), continuing the centuries-old moat bear tradition."
      },
      {
        q: "What romantic 19th-century white neo-Gothic castle in South Bohemia, modeled after Windsor Castle in England, features 140 opulent rooms and eleven towers?",
        correct: "Hluboká Castle Zámek Hluboká",
        w1: "Konopiště Castle",
        w2: "Bouzov Castle",
        exp: "Rebuilt by Prince Jan Adolf II of Schwarzenberg and his wife Eleonore, Hluboká features intricately carved wooden ceilings, tapestries, and crystal chandeliers."
      },
      {
        q: "What scenic South Bohemian town is celebrated as the Carp Capital of the Czech Republic, famous for its 500-year-old network of artificial fish ponds and traditional Christmas carp harvesting?",
        correct: "Třeboň",
        w1: "Jindřichův Hradec",
        w2: "Písek",
        exp: "Engineered in the 16th century by master water builder Jakub Krčín, the Rožmberk Pond covers 489 hectares, producing golden carp served at traditional Czech Christmas Eve dinner."
      }
    ],
    number: {
      q: "In what year did the tradition of keeping live brown bears in the castle moat of Český Krumlov Castle officially begin?",
      target: 1707,
      unit: "year",
      imperial: "1707 AD (over 300 years of tradition)",
      exp: "Official castle records confirm brown bears have been maintained in the Český Krumlov castle moat since the year 1707."
    }
  },

  // Cycle 4: Kutná Hora & The Sedlec Bone Church
  {
    mcqs: [
      {
        q: "What historic town in Central Bohemia boomed in the 13th century due to immense silver ore deposits, rivaling Prague in wealth and prestige?",
        correct: "Kutná Hora",
        w1: "Příbram",
        w2: "Jáchymov",
        exp: "Kutná Hora produced one-third of all European silver in the 14th century, home to the Royal Mint at the Italian Court (Vlašský dvůr) which struck Prague Groschen coins."
      },
      {
        q: "What world-famous small Roman Catholic chapel under the All Saints Cemetery Church in Sedlec near Kutná Hora is decorated with the artistic arrangement of 40,000 human skeletons?",
        correct: "Sedlec Ossuary The Bone Church",
        w1: "Capuchin Crypt",
        w2: "Mělník Ossuary",
        exp: "In 1870, woodcarver František Rint was hired by the Schwarzenberg family to organize the bones, creating a giant bone chandelier and the Schwarzenberg coat of arms."
      },
      {
        q: "What centerpiece decorative element inside the Sedlec Ossuary is made from every single bone found in the human body, hanging from the ceiling vault?",
        correct: "The Great Bone Chandelier",
        w1: "The Bone Altar",
        w2: "The Bone Monstrance",
        exp: "The massive chandelier incorporates human skulls, leg bones, ribs, and pelvises, crowned by seven candle arms representing eternal light."
      },
      {
        q: "What magnificent five-naved Late Gothic cathedral in Kutná Hora, dedicated to the patron saint of miners, features dramatic tent-like triple-curved rood roofs?",
        correct: "St. Barbara Church Chrám svaté Barbory",
        w1: "St. Vitus Cathedral",
        w2: "Cathedral of the Assumption",
        exp: "Commissioned by wealthy silver miners in 1388 to demonstrate their independence from Prague, it features medieval frescoes depicting minting and coin-hammering."
      },
      {
        q: "What famous silver coin minted in the Bohemian mining town of Jáchymov (Joachimsthal) in the 16th century gave its name to the international currency word 'Dollar'?",
        correct: "Joachimsthaler Thaler",
        w1: "Prague Groschen",
        w2: "Ducat",
        exp: "The high silver purity of the Joachimsthaler made it a universal trade currency across Europe, linguistically evolving into daalder, daler, and the US dollar."
      }
    ],
    number: {
      q: "Approximately how many thousands of human skeletons were utilized to create the macabre decorative bone art inside the Sedlec Ossuary in Kutná Hora?",
      target: 40,
      unit: "thousand skeletons",
      imperial: "40,000 to 70,000 human skeletons",
      exp: "The bones of an estimated 40,000 to 70,000 individuals, victims of the 1318 Black Death and 15th-century Hussite Wars, were organized into artistic bone structures."
    }
  },

  // Cycle 5: Bohemian Paradise & Rock Labyrinths
  {
    mcqs: [
      {
        q: "What was the very first protected nature reserve established in the Czech Republic in 1955, world-famous for picturesque sandstone rock cities (Skalní města) and castles?",
        correct: "Bohemian Paradise Český ráj",
        w1: "Bohemian Switzerland",
        w2: "Šumava National Park",
        exp: "A UNESCO Global Geopark, Bohemian Paradise features towering weathered sandstone pillars, narrow pine-scented rock gorges, and Hrubá Skála Castle."
      },
      {
        q: "What famous rock city in Bohemian Paradise features hundreds of dramatic sandstone pinnacles, narrow crevices, and scenic lookouts overlooking green pine valleys?",
        correct: "Prachov Rocks Prachovské skály",
        w1: "Adršpach-Teplice Rocks",
        w2: "Tiské Stěny",
        exp: "Formed over sixty million years ago by the erosion of Cretaceous sea sand deposits, the rocks feature narrow one-person passages like the Emperor Passage (Císařská chodba)."
      },
      {
        q: "What monumental natural sandstone rock bridge in Bohemian Switzerland National Park is the largest natural sandstone rock arch on the European continent?",
        correct: "Pravčická brána Prebischtor",
        w1: "Adršpach Gate",
        w2: "Bastei Bridge",
        exp: "Spanning twenty-six meters across and rising sixteen meters high, the arch was visited by fairy-tale writer Hans Christian Andersen and featured in The Chronicles of Narnia."
      },
      {
        q: "What iconic ruined 14th-century Gothic castle in Bohemian Paradise perches atop two distinct volcanic basalt plug towers named Baba (Old Woman) and Panna (Maiden)?",
        correct: "Trosky Castle Hrad Trosky",
        w1: "Kost Castle",
        w2: "Valdštejn Castle",
        exp: "The twin volcanic towers provide a dramatic landmark visible across the entire Bohemian Paradise region, with the lower tower Baba and taller tower Panna."
      },
      {
        q: "What 14th-century Gothic fortress built by Emperor Charles IV on a limestone cliff above the Berounka River was designed to safely house the imperial crown jewels and holy relics?",
        correct: "Karlštejn Castle Hrad Karlštejn",
        w1: "Křivoklát Castle",
        w2: "Pernštejn Castle",
        exp: "Karlštejn features the Chapel of the Holy Cross, where 129 gilded panel paintings by Master Theodoric line walls encrusted with semi-precious Bohemian jasper and amethyst."
      }
    ],
    number: {
      q: "What is the total clear span length in meters of the Pravčická brána sandstone rock arch in Bohemian Switzerland, the largest in Europe?",
      target: 26,
      unit: "meters",
      imperial: "87 feet arch span",
      exp: "Pravčická brána spans 26.5 meters at its base and rises sixteen meters high above the forest floor."
    }
  },

  // Cycle 6: Bohemian Spas & Glassmaking
  {
    mcqs: [
      {
        q: "Which world-famous spa town in western Bohemia, founded in 1370 by Emperor Charles IV, features thirteen major thermal mineral hot springs, elegant colonnades, and the Grandhotel Pupp?",
        correct: "Karlovy Vary Carlsbad",
        w1: "Mariánské Lázně",
        w2: "Františkovy Lázně",
        exp: "Part of the UNESCO Great Spa Towns of Europe, historical spa guests included Peter the Great, Goethe, Chopin, and Beethoven, who drank spring water from traditional porcelain spa cups."
      },
      {
        q: "What is the temperature in degrees Celsius of the famous Vřídlo mineral hot spring geyser in Karlovy Vary, shooting water up to twelve meters into the air?",
        correct: "72 Degrees Celsius",
        w1: "45 Degrees Celsius",
        w2: "95 Degrees Celsius",
        exp: "Vřídlo discharges 2,000 liters of mineral-rich 72°C water every minute, used for thermal drinking cures, bathing, and petrifying souvenir paper rosebuds."
      },
      {
        q: "What famous traditional bitter herbal liqueur, crafted in Karlovy Vary since 1807 from a secret recipe of twenty herbs and spices, is nicknamed the 13th Spring of Carlsbad?",
        correct: "Becherovka",
        w1: "Fernet Stock",
        w2: "Slivovice",
        exp: "Created by pharmacist Josef Vitus Becher as a stomach remedy, Becherovka is aged in oak casks, popularly mixed with tonic water to make the 'Beton' cocktail."
      },
      {
        q: "What world-renowned luxury lead-free crystal glass manufacturer, founded in Karlovy Vary in 1857 by Ludwig Moser, is known as the Glass of Kings for supplying royal courts?",
        correct: "Moser Glass",
        w1: "Preciosa",
        w2: "Bohemia Crystal",
        exp: "Moser crystal is famous for flawless optical clarity, vibrant gemstone colors, and intricate intaglio engraving, supplied to the British Royal Court, Vatican, and Persian Shahs."
      },
      {
        q: "Which elegant spa town in western Bohemia features the 119-meter cast-iron Neo-Baroque Colonnade and the famous Singing Fountain playing classical music every odd hour?",
        correct: "Mariánské Lázně Marienbad",
        w1: "Františkovy Lázně",
        w2: "Jáchymov",
        exp: "Mariánské Lázně was frequented by King Edward VII of Britain and Mark Twain, renowned for cold mineral acidulous springs (Cross Spring and Rudolph Spring)."
      }
    ],
    number: {
      q: "What is the natural spring temperature in degrees Celsius of the famous Vřídlo thermal geyser in Karlovy Vary, Czech Republic?",
      target: 72,
      unit: "degrees Celsius",
      imperial: "162°F hot mineral water",
      exp: "The Vřídlo geyser in Karlovy Vary discharges natural thermal mineral water at a temperature of exactly 72°C."
    }
  },

  // Cycle 7: Birthplace of Pilsner Beer & Brewing Heritage
  {
    mcqs: [
      {
        q: "What ranking does the Czech Republic consistently hold globally for the highest annual per capita consumption of beer in the world (roughly 140 to 180 liters per person)?",
        correct: "First in the world",
        w1: "Second in the world",
        w2: "Fifth in the world",
        exp: "Czechs have led global per capita beer consumption for over thirty consecutive years, driven by deep cultural brewing heritage and affordable world-class lagers."
      },
      {
        q: "In which western Bohemian city on October 5, 1842, did Bavarian brewmaster Josef Groll brew the world very first golden bottom-fermented clear blond lager beer (Pilsner Urquell)?",
        correct: "Plzeň Pilsen",
        w1: "České Budějovice",
        w2: "Prague",
        exp: "By combining soft local water, pale Bohemian malt, and noble Saaz hops, Groll created the Pilsner style that today accounts for over seventy percent of all beer brewed on Earth."
      },
      {
        q: "What historic hop-growing town in northwestern Bohemia, surrounded by fertile red clay fields, produces the world-renowned noble Saaz hops (Žatecký poloraný červeňák)?",
        correct: "Žatec Saaz",
        w1: "Louny",
        w2: "Rakovník",
        exp: "Inscribed on the UNESCO World Heritage list in 2023, Žatec aroma hops give Czech pilsners their signature delicate spicy herbal bitterness."
      },
      {
        q: "What famous historic brewery in České Budějovice (Budweis), founded in 1895, has been locked in century-long international trademark disputes with American brewer Anheuser-Busch?",
        correct: "Budweiser Budvar Budějovický Budvar",
        w1: "Staropramen",
        w2: "Radegast",
        exp: "State-owned Budweiser Budvar is brewed exclusively from whole-cone Saaz hops, Moravian malt, and artesian well water, aged in cellars for ninety days."
      },
      {
        q: "What historic pub in Prague, operating continuously since 1499, is the oldest microbrewery in the city, famous for dark 13-degree Flek lager and traditional accordion songs?",
        correct: "U Fleků",
        w1: "U Zlatého Tygra",
        w2: "Lokál Dlouhá",
        exp: "U Fleků features eight historic drinking halls and an open-air beer garden, where waiters circulate continuously carrying trays of fresh dark beer."
      }
    ],
    number: {
      q: "In what year was the world first golden Pilsner lager (Pilsner Urquell) brewed by Josef Groll in the city of Plzeň, Bohemia?",
      target: 1842,
      unit: "year",
      imperial: "1842 AD",
      exp: "Pilsner Urquell was first brewed on October 5, 1842, revolutionizing global beer brewing."
    }
  },

  // Cycle 8: Moravia, Wine Landscapes & Brno
  {
    mcqs: [
      {
        q: "What massive 283-square-kilometer UNESCO World Heritage landscape in South Moravia, created by the Princes of Liechtenstein, is the largest artificial landscape in Europe?",
        correct: "Lednice-Valtice Cultural Landscape",
        w1: "Podyjí National Park",
        w2: "White Carpathians",
        exp: "Connecting the Neo-Gothic Lednice Chateau to the Baroque Valtice Palace, the parkland features tree-lined avenues, romantic ruins, and a 60-meter Moorish Minaret."
      },
      {
        q: "What is the second largest city in the Czech Republic, the historical capital of Moravia, home to the Gothic Cathedral of St. Peter and Paul and Špilberk Castle?",
        correct: "Brno",
        w1: "Ostrava",
        w2: "Olomouc",
        exp: "Brno was the home of Gregor Mendel, who discovered the laws of genetic inheritance in the garden of the Augustinian Abbey in the 1860s."
      },
      {
        q: "What masterpiece of modern Functionalist architecture in Brno, designed by German-American architect Ludwig Mies van der Rohe in 1930, features a transparent glass wall and onyx partition?",
        correct: "Villa Tugendhat",
        w1: "Villa Müller",
        w2: "Villa Stiassni",
        exp: "A UNESCO World Heritage icon, Villa Tugendhat pioneered open-plan spatial design and steel-frame domestic construction, where the 1992 division of Czechoslovakia was negotiated."
      },
      {
        q: "What massive limestone gorge in the Moravian Karst plunges to a depth of 138.5 meters, where visitors ride electric boats along the subterranean Punkva River?",
        correct: "Macocha Abyss Propast Macocha",
        w1: "Hranice Abyss",
        w2: "Sloup-Šošůvka Caves",
        exp: "Macocha (Step-Mother Abyss) was formed by the collapse of a colossal subterranean cave roof, connecting to the Punkva Cave chambers."
      },
      {
        q: "What flooded limestone cave in the Olomouc Region is the deepest verified flooded underwater freshwater cave system in the world, explored past 450 meters depth by robotic ROVs?",
        correct: "Hranice Abyss Hranická propast",
        w1: "Macocha Abyss",
        w2: "Zbrašov Aragonite Caves",
        exp: "Explored by Polish cave diver Krzysztof Starnawski and underwater ROVs, seismic evidence suggests the warm mineral-corroded fissure may extend over one kilometer deep."
      }
    ],
    number: {
      q: "What is the vertical depth in meters of the Macocha Abyss sinkhole gorge in the Moravian Karst of the Czech Republic?",
      target: 138,
      unit: "meters deep",
      imperial: "454 feet deep",
      exp: "The Macocha Abyss measures 138.5 meters (rounded to 138 m) from its upper rim down to the lake surface at its base."
    }
  },

  // Cycle 9: Literature, Art & The Origin of the Word Robot
  {
    mcqs: [
      {
        q: "Which German-language modernist author, born in Prague in 1883, created surrealist psychological masterworks including The Metamorphosis and The Trial?",
        correct: "Franz Kafka",
        w1: "Milan Kundera",
        w2: "Bohumil Hrabal",
        exp: "Kafka spent his entire life in Prague, describing the city as 'this little mother has claws; she won't let go', honored by the Franz Kafka Museum and David Černý rotating metal head statue."
      },
      {
        q: "In which 1920 Czech science-fiction theatre play, written by Karel Čapek, was the word 'Robot' (derived from the Slavic word robota, meaning forced labor) coined and introduced to the world?",
        correct: "R.U.R. Rossum Universal Robots",
        w1: "The Absolute at Large",
        w2: "War with the Newts",
        exp: "Karel Čapek credited his brother, the painter Josef Čapek, with inventing the word 'robot' to describe artificial organic factory workers who eventually revolt against humanity."
      },
      {
        q: "Which world-famous Czech Art Nouveau decorative painter and graphic artist created iconic theatrical posters for French actress Sarah Bernhardt and the monumental twenty-canvas Slav Epic?",
        correct: "Alphonse Mucha Alfons Mucha",
        w1: "František Kupka",
        w2: "Josef Mánes",
        exp: "Mucha devoted eighteen years to painting The Slav Epic (Slovanská epopej), depicting the mythology and historical triumphs of the Slavic peoples."
      },
      {
        q: "Which legendary 19th-century Czech Romantic classical composer composed the world-famous Symphony No. 9 'From the New World' and the Slavonic Dances?",
        correct: "Antonín Dvořák",
        w1: "Bedřich Smetana",
        w2: "Leoš Janáček",
        exp: "Dvořák composed the New World Symphony in 1893 while directing the National Conservatory of Music in New York, incorporating African American spirituals and Native American rhythms."
      },
      {
        q: "What traditional Czech performance folk art, inscribed on the UNESCO Intangible Cultural Heritage list in 2016, uses hand-carved wooden string puppets to enact folk tales and satirical plays?",
        correct: "Puppetry and Marionette Theater",
        w1: "Shadow Theatre",
        w2: "Pantomime",
        exp: "Originating in the 18th century with traveling puppeteers who preserved the banned Czech language, iconic characters include Spejbl and Hurvínek."
      }
    ],
    number: {
      q: "In what year did Czech playwright Karel Čapek publish the landmark play R.U.R., giving the global English language the word 'robot'?",
      target: 1920,
      unit: "year",
      imperial: "1920 AD",
      exp: "Karel Čapek published his play R.U.R. in 1920, premiering on stage in Hradec Králové in January 1921."
    }
  },

  // Cycle 10: Extent, 14 Regions & Czech Superlatives
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in the Czech Republic, rising 1,603 meters in the Krkonoše (Giant Mountains) along the international border with Poland?",
        correct: "Sněžka Snow Mountain",
        w1: "Praděd",
        w2: "Lysá hora",
        exp: "Sněžka is crowned by a 19th-century chapel of St. Lawrence, a modern futuristic Polish meteorological observatory, and a cable car from Pec pod Sněžkou."
      },
      {
        q: "What dark-red, pyrope semi-precious gemstone mined in the Bohemian Central Uplands since the 16th century is world-famous for its blood-red brilliance and resistance to heat?",
        correct: "Bohemian Garnet Český granát",
        w1: "Moldavite",
        w2: "Bohemian Topaz",
        exp: "Bohemian garnets are set into gold and silver antique jewelry, protected under authentic certified geographical indications."
      },
      {
        q: "What rare, translucent green bottle-glass tektite gemstone found exclusively in southern Bohemia was formed fifteen million years ago by a meteorite impact in southern Germany?",
        correct: "Moldavite Vltavín",
        w1: "Bohemian Garnet",
        w2: "Desert Glass",
        exp: "Named after the Vltava (Moldau) River where it was first discovered, Moldavite features sculpted aerodynamic pitted surfaces caused by molten meteoric glass cooling in flight."
      },
      {
        q: "Into how many administrative regions (Kraje), plus the Capital City of Prague, is the Czech Republic politically organized?",
        correct: "14 Regions",
        w1: "10 Regions",
        w2: "16 Regions",
        exp: "The fourteen regions (such as Central Bohemia, South Moravia, Plzeň, Karlovy Vary, and Moravian-Silesian) each feature an elected regional assembly and governor (Hejtman)."
      },
      {
        q: "What non-violent peaceful revolution in November and December 1989 led by playwright Václav Havel and the Civic Forum brought an end to 41 years of one-party communist rule in Czechoslovakia?",
        correct: "The Velvet Revolution Sametová revoluce",
        w1: "The Prague Spring",
        w2: "The Singing Revolution",
        exp: "Sparked by student demonstrations on Národní třída, millions jangled keys in Wenceslas Square, leading Václav Havel to be elected President in December 1989."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Mount Sněžka, the highest mountain peak in the Czech Republic?",
      target: 1603,
      unit: "meters",
      imperial: "5,259 feet",
      exp: "Mount Sněžka reaches an official surveyed elevation of 1,603 meters above sea level on the Czech-Polish border."
    }
  }
];

// Build Czech Republic Quiz
buildQuiz({
  id: 'czech-republic-geography-heritage-60',
  theme: 'Czech Republic: Geography, Gothic Spires & Bohemian Wonders',
  title: 'Czech Republic: Geography, Gothic Spires & Bohemian Wonders',
  description: 'A 60-question grand master assessment exploring Prague & Charles Bridge (1357), the Astronomical Clock (1410), Český Krumlov (1707 bears), Kutná Hora bone church (40k skeletons), Pravčická brána (26 m), Karlovy Vary (72°C), Pilsner beer (1842), and Mount Sněžka (1,603 m).',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, czechCycles);

console.log('Czech Republic quiz built successfully!');
