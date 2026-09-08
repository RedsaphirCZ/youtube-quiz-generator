const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 2. sweden-geography-heritage-60
// =========================================================================
const swedenCycles = [
  // Cycle 1: Stockholm Archipelago & The Royal Capital
  {
    mcqs: [
      {
        q: "What capital city of Sweden is built across fourteen islands connected by fifty-seven bridges where Lake Mälaren flows into the Baltic Sea?",
        correct: "Stockholm",
        w1: "Gothenburg",
        w2: "Malmö",
        exp: "Often called the Venice of the North, Stockholm was founded in 1252 by statesman Birger Jarl to protect Swedish waterways from foreign piracy."
      },
      {
        q: "What picturesque medieval Old Town of Stockholm features cobbled alleyways, ochre-colored townhouses, and the Stortorget square?",
        correct: "Gamla Stan",
        w1: "Södermalm",
        w2: "Östermalm",
        exp: "Gamla Stan contains the 13th-century Storkyrkan Cathedral, the Nobel Prize Museum, and the narrowest street in Stockholm (Mårten Trotzigs Gränd at 90 cm wide)."
      },
      {
        q: "What massive 600-room Italian Baroque palace in Gamla Stan is the official residence of the Swedish monarch, one of the largest royal palaces in Europe?",
        correct: "Stockholm Royal Palace Kungliga Slottet",
        w1: "Drottningholm Palace",
        w2: "Haga Palace",
        exp: "Designed by Nicodemus Tessin the Younger following the 1697 fire of the old Tre Kronor castle, it houses the Swedish Royal Armory and Treasury."
      },
      {
        q: "In which iconic brick landmark in Stockholm, designed by Ragnar Östberg with a 106-meter tower crowned by three golden crowns, is the annual Nobel Banquet held?",
        correct: "Stockholm City Hall Stockholms stadshus",
        w1: "Stockholm Concert Hall",
        w2: "Riksdag Building",
        exp: "The Nobel Banquet takes place every December 10 in the Blue Hall (Blå hallen), followed by dancing in the Golden Hall decorated with eighteen million gold glass mosaic tiles."
      },
      {
        q: "Approximately how many islands, islets, and rocky skerries comprise the vast Stockholm Archipelago stretching eighty kilometers into the Baltic Sea?",
        correct: "Over 30,000 Islands and Skerries",
        w1: "5,000 Islands",
        w2: "10,000 Islands",
        exp: "The Stockholm Archipelago is the second largest archipelago in the Baltic Sea, navigated by historic white vintage steamships (Waxholmsbolaget)."
      }
    ],
    number: {
      q: "Across how many individual islands is the central urban archipelago of Stockholm constructed?",
      target: 14,
      unit: "islands",
      imperial: "14 islands",
      exp: "Central Stockholm is built across fourteen distinct islands connected by over fifty bridges."
    }
  },

  // Cycle 2: The Vasa Warship & Maritime Salvage
  {
    mcqs: [
      {
        q: "What grand 64-gun royal Swedish warship tragically capsized and sank in Stockholm harbor on its maiden voyage on August 10, 1628, just twenty minutes after setting sail?",
        correct: "The Vasa",
        w1: "Kronan",
        w2: "Mars",
        exp: "Commissioned by King Gustavus Adolphus during the Thirty Years War, Vasa was top-heavy due to a second upper gun deck added during construction."
      },
      {
        q: "Why was the 17th-century wooden hull of the Vasa warship preserved in near-perfect condition for 333 years beneath the waters of Stockholm harbor before its 1961 salvage?",
        correct: "Low salinity and cold brackish waters of the Baltic Sea prevented wood-eating shipworms",
        w1: "Thick layers of volcanic ash",
        w2: "Chemical preserving agents in the wood",
        exp: "The shipworm Teredo navalis cannot survive in the low-salinity brackish waters of the Stockholm archipelago, preserving ninety-eight percent of the original oak timber."
      },
      {
        q: "In what historic year was the intact hull of the Vasa warship successfully raised from the seabed in a legendary maritime salvage operation led by Anders Franzén?",
        correct: "1961",
        w1: "1945",
        w2: "1980",
        exp: "On April 24, 1961, Vasa broke the surface of the water after divers spent years digging six tunnels beneath the hull to pass steel lifting cables."
      },
      {
        q: "What dedicated maritime museum on Djurgården island in Stockholm displays the fully restored 1628 Vasa warship alongside hundreds of carved wooden sculptures?",
        correct: "The Vasa Museum Vasamuseet",
        w1: "Nordic Museum",
        w2: "Maritime Museum",
        exp: "The Vasa Museum is the most visited museum in Scandinavia, featuring elaborate carved wooden lion figureheads, Roman emperors, and mermaids."
      },
      {
        q: "Which UNESCO World Heritage 17th-century royal palace on Lovön island in Lake Mälaren is the private residence of the Swedish Royal Family and home to an intact 1766 Court Theatre?",
        correct: "Drottningholm Palace",
        w1: "Gripsholm Castle",
        w2: "Kalmar Castle",
        exp: "Dubbed the Versailles of Sweden, Drottningholm Court Theatre still operates its original 18th-century wooden stage machinery, pulleys, and wind effect machines."
      }
    ],
    number: {
      q: "In what year did the 64-gun Swedish royal warship Vasa sink on its maiden voyage in Stockholm harbor?",
      target: 1628,
      unit: "year",
      imperial: "1628 AD",
      exp: "Vasa sank on August 10, 1628, after sailing less than 1,300 meters into Stockholm harbor."
    }
  },

  // Cycle 3: Swedish Lapland & Arctic Wilderness
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Sweden, rising 2,097 meters in the Scandinavian Mountains of Swedish Lapland?",
        correct: "Kebnekaise",
        w1: "Sarektjåkkå",
        w2: "Kaskasatjåkka",
        exp: "Kebnekaise has two main peaks: the melting glaciated Southern Peak (Sydtoppen) and the rocky Northern Peak (Nordtoppen), which is now the official highest point."
      },
      {
        q: "What famous 440-kilometer Arctic trekking trail, known as The King Trail, traverses Swedish Lapland from Abisko in the north to Hemavan in the south?",
        correct: "Kungsleden",
        w1: "Nordkalottleden",
        w2: "Padjelantaleden",
        exp: "Established by the Swedish Tourist Association in the early 20th century, Kungsleden passes through four national parks and reindeer grazing pastures."
      },
      {
        q: "Which national park in northern Swedish Lapland is world-famous as one of the best locations on Earth to observe the Aurora Borealis (Northern Lights) due to its dry Blue Hole microclimate?",
        correct: "Abisko National Park",
        w1: "Sarek National Park",
        w2: "Stora Sjöfallet",
        exp: "Abisko features the Aurora Sky Station at 900 meters elevation, benefiting from surrounding rain-shadow mountains that keep skies cloud-free."
      },
      {
        q: "What rugged, roadless 2,000-square-kilometer national park in Lapland is regarded as Europe last true untouched wilderness, containing over one hundred glaciers?",
        correct: "Sarek National Park",
        w1: "Muddus National Park",
        w2: "Pieljekaise National Park",
        exp: "With no marked trails, bridges, or cabins, Sarek requires advanced wilderness survival skills to traverse delta valleys like the Rapa River Valley."
      },
      {
        q: "What indigenous Arctic people of northern Scandinavia have traditionally herded semi-domesticated reindeer across Swedish Sápmi for thousands of years?",
        correct: "The Sámi People",
        w1: "The Inuits",
        w2: "The Nenets",
        exp: "Sámi culture is celebrated for joik vocal chanting, colorful gákti clothing, and duodji handicrafts made from birch wood and reindeer antler."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Kebnekaise (Nordtoppen), the highest mountain peak in Sweden?",
      target: 2097,
      unit: "meters",
      imperial: "6,880 feet",
      exp: "Kebnekaise Nordtoppen reaches an official elevation of 2,097 meters above sea level in the Arctic circle."
    }
  },

  // Cycle 4: Kiruna, The Iron Mine & The Icehotel
  {
    mcqs: [
      {
        q: "Which northern Swedish mining town is home to the largest and most technologically advanced underground iron ore mine in the world (LKAB Kiirunavaara)?",
        correct: "Kiruna",
        w1: "Gällivare",
        w2: "Luleå",
        exp: "Kiruna mine produces eighty percent of all iron ore in the European Union, extracting over twenty-six million tons of high-grade magnetite pellets annually."
      },
      {
        q: "Why is the entire city of Kiruna undergoing a multi-billion-dollar urban relocation project to move buildings and residents three kilometers to the east?",
        correct: "Subterranean iron mining caused deep ground deformation and cracks beneath the city",
        w1: "Frequent volcanic eruptions",
        w2: "Rising sea levels",
        exp: "Mining at depths over 1,300 meters causes ground subsidence, necessitating the physical relocation of historic landmarks like the 1912 Kiruna wooden church."
      },
      {
        q: "In which Lapland village along the Torne River was the world very first hotel constructed entirely of natural ice and compacted snow (snice) founded in 1989?",
        correct: "Jukkasjärvi Icehotel",
        w1: "Abisko",
        w2: "Karesuando",
        exp: "Every winter, international ice sculptors carve bespoke art suites from two-ton crystal-clear ice blocks harvested from the Torne River, which melt back into the river every spring."
      },
      {
        q: "What landmark 1912 Gothic-Revival red wooden church in Kiruna, designed by Gustaf Wickman to resemble a traditional Sámi nomadic tent (goahti), was voted Sweden Most Beautiful Building?",
        correct: "Kiruna Church Kiruna kyrka",
        w1: "Jukkasjärvi Church",
        w2: "Uppsala Cathedral",
        exp: "The church will be moved intact on giant motorized flatbed trailer transporters to its new city center location to protect it from mining subsidence."
      },
      {
        q: "What space center near Kiruna in the Arctic Circle is Europe premier sounding rocket launch range and satellite tracking ground station?",
        correct: "Esrange Space Center",
        w1: "Andøya Space",
        w2: "Plesetsk",
        exp: "Esrange launches sounding rockets and stratospheric research balloons into unpopulated Arctic wilderness, tracking Earth observation satellites."
      }
    ],
    number: {
      q: "In what year was the world first Icehotel founded in Jukkasjärvi, Sweden, pioneering winter ice architecture?",
      target: 1989,
      unit: "year",
      imperial: "1989 AD",
      exp: "The Icehotel in Jukkasjärvi was first created in the winter of 1989 by founder Yngve Bergqvist."
    }
  },

  // Cycle 5: Allemansrätten, Lakes & Swedish Nature
  {
    mcqs: [
      {
        q: "What ancient Swedish constitutional customary right (Right of Public Access) grants all people the legal freedom to roam, hike, forage wild berries, and camp on public and private land?",
        correct: "Allemansrätten",
        w1: "Lagom",
        w2: "Jantelagen",
        exp: "Under the golden rule of 'Do not disturb, do not destroy' (Inte störa, inte förstöra), citizens can pitch a tent for a night and pick wild lingonberries and chanterelles."
      },
      {
        q: "What is the largest lake in Sweden and the largest lake located within the European Union, covering 5,650 square kilometers?",
        correct: "Lake Vänern",
        w1: "Lake Vättern",
        w2: "Lake Mälaren",
        exp: "Lake Vänern contains over 22,000 islands and islets, connected to the North Sea at Gothenburg and the Baltic Sea via the historic Göta Canal."
      },
      {
        q: "What long, narrow, crystal-clear glacial lake in southern Sweden is the second largest lake in the country, famous for the historic town of Vadstena and Saint Bridget abbey?",
        correct: "Lake Vättern",
        w1: "Lake Hjälmaren",
        w2: "Lake Siljan",
        exp: "Lake Vättern is so clear and clean that water can be drunk directly from the lake, surrounded by steep cliffs and the island of Visingsö."
      },
      {
        q: "What large island in the Baltic Sea is Sweden largest island, famous for limestone sea stacks (raukar) and the UNESCO-listed medieval walled merchant town of Visby?",
        correct: "Gotland",
        w1: "Öland",
        w2: "Orust",
        exp: "Visby was a major Hanseatic League trading metropolis in the 13th century, surrounded by a 3.4-kilometer intact stone ring wall (Ringmuren) with twenty-seven defensive towers."
      },
      {
        q: "What UNESCO World Heritage coastal area in the Gulf of Bothnia features the highest post-glacial land uplift (isostatic rebound) in the world, rising 286 meters since the Ice Age?",
        correct: "The High Coast Höga Kusten",
        w1: "The Bohuslän Coast",
        w2: "Kullen Peninsula",
        exp: "Released from the weight of kilometers of glacial ice sheets, the land continues to rise at nearly one centimeter per year, transforming bays into inland lakes."
      }
    ],
    number: {
      q: "What is the approximate total surface area in thousands of square kilometers of Lake Vänern, the largest lake in the European Union?",
      target: 6,
      unit: "thousand square kilometers",
      imperial: "2,180 square miles (5,650 sq km)",
      exp: "Lake Vänern covers approximately 5,650 square kilometers (rounded to 6k sq km), ranking as the third largest lake in all of Europe."
    }
  },

  // Cycle 6: Gothenburg & The West Coast
  {
    mcqs: [
      {
        q: "What is the second largest city in Sweden and the largest seaport in the Nordic countries, situated on the Kattegat along the Göta River mouth?",
        correct: "Gothenburg Göteborg",
        w1: "Malmö",
        w2: "Uppsala",
        exp: "Founded in 1621 by King Gustavus Adolphus with the help of Dutch canal engineers, Gothenburg is famous for Liseberg amusement park and fish markets."
      },
      {
        q: "Which iconic Swedish multinational automobile manufacturer was founded in Gothenburg in 1927 by Assar Gabrielsson and Gustaf Larson with a focus on passenger safety?",
        correct: "Volvo",
        w1: "Saab",
        w2: "Scania",
        exp: "In 1959, Volvo engineer Nils Bohlin invented the three-point seatbelt, giving away the patent royalty-free to all automakers, saving millions of lives."
      },
      {
        q: "What scenic coastal province north of Gothenburg is internationally famous for smooth pink granite sea cliffs, picturesque wooden fishing villages, and seafood safaris for lobster and oysters?",
        correct: "Bohuslän",
        w1: "Halland",
        w2: "Blekinge",
        exp: "Bohuslän includes iconic coastal towns like Smögen (famous for the 600-meter Smögenbryggan wooden boardwalk), Fjällbacka, and the Weather Islands (Väderöarna)."
      },
      {
        q: "What 190-kilometer historic waterway opened in 1832, featuring fifty-eight lock gates, connects Gothenburg on the west coast to Söderköping on the Baltic Sea?",
        correct: "The Göta Canal Göta kanal",
        w1: "Dalsland Canal",
        w2: "Trollhätte Canal",
        exp: "Engineered under Baltzar von Platen with Scottish engineer Thomas Telford, the canal allowed ships to avoid Danish Sound toll taxes across the Kattegat."
      },
      {
        q: "Which island off the Bohuslän coast is Sweden sailing capital, guarded by the 17th-century stone Carlsten Fortress where famous prisoner Lasse-Maja was jailed?",
        correct: "Marstrand",
        w1: "Tjörn",
        w2: "Orust",
        exp: "Marstrand hosts the international Match Cup Sweden sailing regatta, maintaining a car-free island heritage of white clapboard merchant houses."
      }
    ],
    number: {
      q: "In what year was the famous Swedish automotive brand Volvo officially founded in the city of Gothenburg?",
      target: 1927,
      unit: "year",
      imperial: "1927 AD",
      exp: "Volvo produced its first commercial passenger car, the ÖV 4 (nicknamed Jakob), at its Lundby plant in Gothenburg on April 14, 1927."
    }
  },

  // Cycle 7: Skåne, Malmö & The Öresund Bridge
  {
    mcqs: [
      {
        q: "What 16-kilometer combined rail and four-lane road bridge-tunnel, inaugurated in July 2000, connects the Swedish city of Malmö directly to Copenhagen, Denmark?",
        correct: "The Öresund Bridge Öresundsbron",
        w1: "Great Belt Bridge",
        w2: "Little Belt Bridge",
        exp: "The link consists of an 8-kilometer cable-stayed bridge, the artificial island of Peberholm, and a 4-kilometer immersed underwater tunnel beneath the Drogden channel."
      },
      {
        q: "What 190-meter neo-futurist residential skyscraper in Malmö, designed by Spanish architect Santiago Calatrava, twists ninety degrees from base to top?",
        correct: "Turning Torso",
        w1: "The Point",
        w2: "Kronprinsen",
        exp: "Inspired by a sculpture of a twisting human spine, Turning Torso opened in 2005 as the tallest skyscraper in the Nordic countries, pioneering sustainable architecture."
      },
      {
        q: "What southernmost province of Sweden, characterized by fertile golden wheat fields, beech forests, and white sandy beaches, was historically part of the Kingdom of Denmark until 1658?",
        correct: "Skåne Scania",
        w1: "Småland",
        w2: "Östergötland",
        exp: "Acquired by Sweden under the 1658 Treaty of Roskilde, Skåne is known as the Granary of Sweden, celebrated for culinary estates and castles."
      },
      {
        q: "What historic university town in Skåne, founded around 990 CE, is home to a prestigious 1666 university and a Romanesque cathedral with an astronomical clock (Horologium Mirabile Caeleste)?",
        correct: "Lund",
        w1: "Helsingborg",
        w2: "Ystad",
        exp: "Lund Cathedral features twin 55-meter Romanesque towers and a crypt housing the mythical stone giant Finn, who according to legend helped build the cathedral."
      },
      {
        q: "What famous megalithic stone ship monument in southeastern Skåne, dating back to 600 CE, consists of fifty-nine massive sandstone boulders arranged in the outline of a 67-meter Viking ship?",
        correct: "Ales Stenar Ale Stones",
        w1: "Gumlösa Stones",
        w2: "Anundshög",
        exp: "Perched on a coastal cliff overlooking the Baltic Sea at Kåseberga, the stone ship alignment corresponds precisely with the winter and summer solstices."
      }
    ],
    number: {
      q: "In what year was the landmark Öresund Bridge officially opened, forging a direct fixed road and rail link between Sweden and Denmark?",
      target: 2000,
      unit: "year",
      imperial: "2000 AD",
      exp: "The Öresund Bridge was officially inaugurated by King Carl XVI Gustaf of Sweden and Queen Margrethe II of Denmark on July 1, 2000."
    }
  },

  // Cycle 8: Swedish Innovations & The Nobel Legacy
  {
    mcqs: [
      {
        q: "Which Swedish industrialist, chemist, and inventor of dynamite (1867) bequeathed his immense fortune in 1895 to establish the prestigious international Nobel Prizes?",
        correct: "Alfred Nobel",
        w1: "Svante Arrhenius",
        w2: "Jöns Jacob Berzelius",
        exp: "Nobel held 355 international patents, establishing prizes in Physics, Chemistry, Physiology or Medicine, Literature, and Peace (presented in Oslo)."
      },
      {
        q: "Which 18th-century Swedish botanist and physician at Uppsala University, known as the Father of Modern Taxonomy, formalized the binomial nomenclature system for naming organisms?",
        correct: "Carl Linnaeus Carl von Linné",
        w1: "Olaus Rudbeck",
        w2: "Elias Fries",
        exp: "In his landmark 1735 work Systema Naturae, Linnaeus classified the natural world into kingdoms, classes, orders, genera, and species, coining the name Homo sapiens."
      },
      {
        q: "Which 18th-century Swedish astronomer at Uppsala University proposed the 100-degree centigrade temperature scale in 1742, which was later inverted to create the modern Celsius scale?",
        correct: "Anders Celsius",
        w1: "Daniel Gabriel Fahrenheit",
        w2: "William Thomson Kelvin",
        exp: "Celsius originally set the boiling point of water at 0° and freezing point at 100°; after his death, Carl Linnaeus reversed the scale to its modern form."
      },
      {
        q: "Which Swedish wireless technology developed by telecommunications company Ericsson in 1994, named after 10th-century Viking King Harald Bluetooth, unites devices over short-range radio frequencies?",
        correct: "Bluetooth",
        w1: "Wi-Fi",
        w2: "Zigbee",
        exp: "The Bluetooth logo combines the Younger Futhark runic letters Hagall (ᚼ) and Bjarkan (ᛒ), representing Harald Bluetooth initials."
      },
      {
        q: "What historic medical device, invented by Swedish surgeon Åke Senning and engineer Rune Elmqvist in 1958 at Karolinska University Hospital in Stockholm, was the world first implantable medical device of its kind?",
        correct: "The Implantable Cardiac Pacemaker",
        w1: "The Heart-Lung Machine",
        w2: "The Artificial Kidney",
        exp: "The first patient, Arne Larsson, received the hockey-puck-sized pacemaker in October 1958, outliving both the surgeon and inventor to survive until age 86."
      }
    ],
    number: {
      q: "In what year did Alfred Nobel sign his final will and testament in Paris, legally establishing the annual Nobel Prizes?",
      target: 1895,
      unit: "year",
      imperial: "1895 AD",
      exp: "Alfred Nobel executed his famous last will on November 27, 1895, dedicating ninety-four percent of his total assets to endow the Nobel Prizes."
    }
  },

  // Cycle 9: Traditions: Fika, Midsummer & Dala Horses
  {
    mcqs: [
      {
        q: "What essential Swedish social institution and cultural ritual involves taking a relaxing break during the workday to enjoy coffee, conversation, and cinnamon buns (kanelbullar)?",
        correct: "Fika",
        w1: "Lagom",
        w2: "Fredagsmys",
        exp: "Fika is considered a daily social necessity in Swedish corporate and domestic life, where colleagues pause twice daily to connect away from computer screens."
      },
      {
        q: "What traditional hand-carved, brightly painted wooden folk horse from the province of Dalarna, decorated with kurbits floral patterns, is the national folk craft symbol of Sweden?",
        correct: "The Dala Horse Dalahäst",
        w1: "The Gotland Ram",
        w2: "The Småland Elk",
        exp: "Originating in the 17th century when foresters carved toys by the fireplace in Nusnäs, the orange-red painted horse was popularized globally at the 1939 New York World Fair."
      },
      {
        q: "What cherished national festival celebrated on the summer solstice in late June involves dancing around a flower-garlanded maypole (midsommarstång), wearing flower crowns, and eating pickled herring with new potatoes?",
        correct: "Midsummer Midsommar",
        w1: "Walpurgis Night Valborg",
        w2: "Saint Lucy Day",
        exp: "Midsummer Eve is one of the most important holidays of the year, celebrated outdoors with snaps songs, fresh Swedish strawberries, and midnight sun celebrations."
      },
      {
        q: "What festival of light celebrated across Sweden on December 13 features a procession of girls and boys in white robes, led by a maiden wearing a crown of glowing candles in her hair?",
        correct: "Saint Lucy Day Sankta Lucia",
        w1: "All Saints Day",
        w2: "Mårten Gås",
        exp: "Commemorating the 4th-century martyr Saint Lucy, the procession brings light into dark Nordic winter mornings, accompanied by saffron buns (lussekatter) and ginger snaps."
      },
      {
        q: "What notoriously pungent traditional northern Swedish culinary delicacy consists of fermented Baltic Sea herring, famously eaten outdoors wrapped in thin bread (tunnbröd) with potatoes and sour cream?",
        correct: "Surströmming",
        w1: "Gravlax",
        w2: "Janssons Frestelse",
        exp: "Fermented for months in sealed tin cans using light brine, pressurized gas causes the cans to bulge, releasing one of the most powerful food aromas in the world upon opening."
      }
    ],
    number: {
      q: "On what day in December is the national Swedish festival of Saint Lucy's Day (Sankta Lucia) celebrated every year?",
      target: 13,
      unit: "day of December",
      imperial: "December 13",
      exp: "Saint Lucy's Day is celebrated annually on December 13, marking the historical winter solstice in the Julian calendar."
    }
  },

  // Cycle 10: Extent, 21 Counties & Swedish Superlatives
  {
    mcqs: [
      {
        q: "What percentage of the total land area of Sweden is covered by dense boreal forests and woodlands (taiga), making it the second most forested nation in Europe after Finland?",
        correct: "Over 68 Percent",
        w1: "35 Percent",
        w2: "50 Percent",
        exp: "Spruce and Scots pine dominate the Swedish landscape, supporting a sustainable forestry, paper pulp, and wooden prefabricated housing export industry."
      },
      {
        q: "How does the Kingdom of Sweden rank globally for the total number of recorded coastal, marine, and lake islands within its national territory?",
        correct: "First in the world with over 267,000 islands",
        w1: "Tenth in the world",
        w2: "Fifth in the world",
        exp: "According to Statistics Sweden, the country contains 267,570 islands (of which fewer than one thousand are permanently inhabited), leading all countries globally."
      },
      {
        q: "Into how many first-level administrative counties (Län) is the Kingdom of Sweden politically structured for governmental administration?",
        correct: "21 Counties",
        w1: "15 Counties",
        w2: "25 Counties",
        exp: "The twenty-one counties (such as Stockholm, Västra Götaland, Skåne, Norrbotten, and Dalarna) exist alongside the twenty-five traditional cultural provinces (Landskap)."
      },
      {
        q: "What is the total land area of Sweden in square kilometers, ranking it as the fifth largest sovereign country in Europe?",
        correct: "450,295 Square Kilometers",
        w1: "250,000 Square Kilometers",
        w2: "600,000 Square Kilometers",
        exp: "Sweden spans 1,572 kilometers from north to south, roughly the size of the US state of California or twice the size of the United Kingdom."
      },
      {
        q: "What famous Swedish philosophical lifestyle concept, meaning 'Not too little, not too much, just the right amount', represents the Swedish cultural pursuit of balance and moderation?",
        correct: "Lagom",
        w1: "Fika",
        w2: "Hygge",
        exp: "Lagom permeates Swedish sustainable design, work-life balance, environmental consciousness, and social equality."
      }
    ],
    number: {
      q: "How many administrative counties (Län) make up the political structure of the Kingdom of Sweden?",
      target: 21,
      unit: "counties",
      imperial: "21 administrative counties (Län)",
      exp: "Sweden is divided into twenty-one administrative counties (Län), each overseen by a County Administrative Board and elected Regional Council."
    }
  }
];

// Build Sweden Quiz
buildQuiz({
  id: 'sweden-geography-heritage-60',
  theme: 'Sweden: Geography, Arctic Lapland & Maritime Heritage',
  title: 'Sweden: Geography, Arctic Lapland & Maritime Heritage',
  description: 'A 60-question grand master assessment exploring Stockholm archipelago (14 islands), the Vasa warship salvage (1628), Kebnekaise (2,097 m), Kiruna & the Icehotel (1989), Lake Vänern, the Öresund Bridge (2000), Nobel prizes (1895), and Allemansrätten.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, swedenCycles);

console.log('Sweden quiz built successfully!');
