const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 5. denmark-geography-heritage-60
// =========================================================================
const denmarkCycles = [
  // Cycle 1: Copenhagen, Nyhavn & The Little Mermaid
  {
    mcqs: [
      {
        q: "What capital and largest city of Denmark, situated on the eastern coast of the island of Zealand, translates from Old Danish as 'Merchants Harbour'?",
        correct: "Copenhagen København",
        w1: "Aarhus",
        w2: "Odense",
        exp: "Founded as a fishing village in the 10th century and fortified by Bishop Absalon in 1167, Copenhagen is consistently rated among the world most livable cities."
      },
      {
        q: "What picturesque 17th-century waterfront canal in Copenhagen is world-famous for its colorful gabled 300-year-old townhouses, historic wooden ships, and outdoor cafes?",
        correct: "Nyhavn New Harbour",
        w1: "Christianshavn",
        w2: "Slotsholmen",
        exp: "Dug by Swedish prisoners of war between 1670 and 1673, fairy-tale author Hans Christian Andersen lived at numbers 18, 20, and 67 along Nyhavn."
      },
      {
        q: "What iconic 1.25-meter bronze statue perched on a granite boulder along the Langelinie promenade in Copenhagen was sculpted in 1913 by Edvard Eriksen, inspired by Hans Christian Andersen fairy tale?",
        correct: "The Little Mermaid Den Lille Havfrue",
        w1: "Gefion Fountain",
        w2: "Ianto Fountain",
        exp: "Commissioned by Carl Jacobsen of Carlsberg Brewery, the statue face was modeled after ballerina Ellen Price and her body after the sculptor wife Eline Eriksen."
      },
      {
        q: "What 18th-century rococo palace complex in Copenhagen, consisting of four identical palaces around an octagonal courtyard, serves as the winter residence of the Danish royal family?",
        correct: "Amalienborg Palace",
        w1: "Christiansborg Palace",
        w2: "Rosenborg Castle",
        exp: "Guarded by the Royal Life Guards (Den Kongelige Livgarde) with tall bearskin hats, a daily changing of the guard ceremony takes place at 12:00 noon."
      },
      {
        q: "What famous 1.1-kilometer car-free pedestrian shopping thoroughfare in central Copenhagen is one of the longest and oldest pedestrian shopping streets in Europe?",
        correct: "Strøget",
        w1: "Vesterbrogade",
        w2: "Købmagergade",
        exp: "Pedestrianized in 1962 despite initial public skepticism, Strøget connects City Hall Square (Rådhuspladsen) to Kongens Nytorv, sparking global urban pedestrianization."
      }
    ],
    number: {
      q: "In what year was the famous bronze statue of The Little Mermaid officially unveiled on the waterfront promenade of Copenhagen?",
      target: 1913,
      unit: "year",
      imperial: "1913 AD",
      exp: "The Little Mermaid statue was unveiled to the public on August 23, 1913."
    }
  },

  // Cycle 2: Tivoli Gardens & Cycling Culture
  {
    mcqs: [
      {
        q: "What world-famous amusement park and pleasure garden in downtown Copenhagen, opened in August 1843 by Georg Carstensen, is the second oldest operating amusement park in the world?",
        correct: "Tivoli Gardens Kjøbenhavns Sommer-Tivoli",
        w1: "Dyrehavsbakken Bakken",
        w2: "Legoland",
        exp: "Carstensen famously convinced King Christian VIII by saying: 'When people are amusing themselves, they do not think about politics.' Walt Disney visited Tivoli to find inspiration for Disneyland."
      },
      {
        q: "What historic 1914 wooden roller coaster in Tivoli Gardens, one of the oldest wooden coasters still operating on Earth, is still controlled by an onboard human brakeman on every ride?",
        correct: "Rutschebanen The Mountain Coaster",
        w1: "Dæmonen",
        w2: "Odin Express",
        exp: "The brakeman manually applies hand brakes on sharp downhill curves, navigating 720 meters of track through artificial mountain scenery."
      },
      {
        q: "What percentage of all daily commuter trips to work and school in the city of Copenhagen are made by bicycle, making it the Cycling Capital of the World?",
        correct: "Over 60 Percent",
        w1: "25 Percent",
        w2: "40 Percent",
        exp: "With 382 kilometers of dedicated cycle tracks separated from road traffic and Cycle Superhighways (Cykelsuperstier), bikes outnumber cars in central Copenhagen."
      },
      {
        q: "What famous bicycle bridge in Copenhagen, connecting Nørrebro to the city center across the lakes, is one of the busiest bicycle corridors in the world with over 40,000 daily cyclists?",
        correct: "Dronning Louises Bro Queen Louise Bridge",
        w1: "Cykelslangen The Bicycle Snake",
        w2: "Inderhavnsbroen",
        exp: "Equipped with digital bike counters and green waves (traffic lights synchronized to average cycling speeds of 20 km/h), cyclists can ride without stopping at red lights."
      },
      {
        q: "What is the oldest continuously operating amusement park in the world, founded in 1583 in Klampenborg north of Copenhagen near the royal deer park?",
        correct: "Dyrehavsbakken Bakken",
        w1: "Tivoli Gardens",
        w2: "Liseberg",
        exp: "Originating when Kirsten Piil discovered a natural spring in the woods, Bakken features the 1932 wooden roller coaster and traditional white clown Pierrot."
      }
    ],
    number: {
      q: "In what year did the historic Tivoli Gardens amusement park first open its gates to the public in Copenhagen, Denmark?",
      target: 1843,
      unit: "year",
      imperial: "1843 AD",
      exp: "Tivoli Gardens opened on August 15, 1843, remaining one of Europe's most beloved amusement parks."
    }
  },

  // Cycle 3: The Danish Realm: Greenland & The Faroe Islands
  {
    mcqs: [
      {
        q: "What constitutional arrangement, meaning the Unity of the Realm, unites the European country of Denmark with its two self-governing autonomous Atlantic overseas territories: Greenland and the Faroe Islands?",
        correct: "Rigsfællesskabet The Danish Realm",
        w1: "The Nordic Union",
        w2: "The Scandinavian Commonwealth",
        exp: "Greenland and the Faroe Islands each have their own parliaments, prime ministers, and home-rule governments, while sending two elected representatives each to the Danish Folketing."
      },
      {
        q: "What autonomous island in the Danish Realm is the largest island in the world (excluding continental landmasses), covering 2.16 million square kilometers, eighty percent of which is covered by an ice sheet?",
        correct: "Greenland Kalaallit Nunaat",
        w1: "Baffin Island",
        w2: "New Guinea",
        exp: "Greenland contains the Ilulissat Icefjord (a UNESCO World Heritage site fed by Sermeq Kujalleq, the most productive glacier in the Northern Hemisphere)."
      },
      {
        q: "What self-governing volcanic archipelago in the North Atlantic, comprising eighteen rugged islands between Iceland and Norway, is famous for puffin colonies and grass-roofed cottages?",
        correct: "The Faroe Islands Føroyar",
        w1: "The Shetland Islands",
        w2: "The Hebrides",
        exp: "The Faroes feature the famous Múlafossur Waterfall in Gásadalur, sheer sea cliffs (Enniberg), and the world first underwater roundabout in the Eysturoyartunnilin."
      },
      {
        q: "What UNESCO World Heritage fjord on the west coast of Greenland discharges thirty-five billion tons of icebergs annually into Disko Bay?",
        correct: "Ilulissat Icefjord Kangia",
        w1: "Scoresby Sound",
        w2: "Tasermiut Fjord",
        exp: "Calving from the Jakobshavn Glacier (Sermeq Kujalleq) at rates of forty meters per day, icebergs drifting into the Atlantic are believed to include the iceberg that struck the Titanic."
      },
      {
        q: "What capital city of Greenland, situated on the southwest coast along Nuup Kangerlua fjord, is the northernmost capital of the Danish Realm with twenty thousand residents?",
        correct: "Nuuk Godthåb",
        w1: "Ilulissat",
        w2: "Sisimiut",
        exp: "Founded in 1728 by Norwegian-Danish missionary Hans Egede, Nuuk features the Greenland National Museum exhibiting the 500-year-old Qilakitsoq Inughuit mummies."
      }
    ],
    number: {
      q: "What is the approximate total geographical land surface area in millions of square kilometers of Greenland, the world largest island within the Danish Realm?",
      target: 2,
      unit: "million square kilometers",
      imperial: "836,330 square miles (2.16M sq km)",
      exp: "Greenland covers 2.16 million square kilometers (rounded to 2 million), of which 1.7 million sq km is covered by the Greenland Ice Sheet."
    }
  },

  // Cycle 4: Lego & The Danish Toy Revolution
  {
    mcqs: [
      {
        q: "What world-famous global toy company, founded in 1932 in the small town of Billund, Denmark, by carpenter Ole Kirk Christiansen, takes its name from the Danish phrase 'leg godt' (play well)?",
        correct: "The Lego Group Lego",
        w1: "Playmobil",
        w2: "Meccano",
        exp: "Beginning as a modest workshop making wooden pull-along ducks, Lego introduced its revolutionary patented plastic interlocking automatic binding bricks in the 1950s."
      },
      {
        q: "In what landmark year was the modern interlocking plastic Lego brick design, with its patented internal hollow tube and stud coupling system, officially patented in Copenhagen?",
        correct: "1958",
        w1: "1949",
        w2: "1968",
        exp: "Patented on January 28, 1958, by Godtfred Kirk Christiansen, any Lego brick made in 1958 still interconnects perfectly with bricks manufactured today."
      },
      {
        q: "What world-famous original theme park, opened in Billund in June 1968 next to the Lego factory, features Miniland displaying miniature world landmarks made from forty million Lego bricks?",
        correct: "Legoland Billund",
        w1: "Legoland Windsor",
        w2: "Legoland Deutschland",
        exp: "Legoland Billund welcomes two million visitors annually, complemented by the 2017 Lego House (Home of the Brick) designed by Danish architect Bjarke Ingels (BIG)."
      },
      {
        q: "What world record does the Lego Group hold continuously as the largest manufacturer on planet Earth, producing over 300 million small rubber units annually for its toy sets?",
        correct: "World largest manufacturer of vehicle tires",
        w1: "World largest producer of plastic cups",
        w2: "World largest producer of miniature glass",
        exp: "Recognized by Guinness World Records in 2012, Lego manufactures over 318 million miniature rubber tires every year, surpassing Bridgestone and Michelin."
      },
      {
        q: "What famous Danish toy company innovation, introduced in 1978, added articulated yellow-skinned human characters with movable arms, legs, and interchangeable hair pieces to Lego sets?",
        correct: "The Lego Minifigure",
        w1: "The Lego Duplo",
        w2: "The Lego Technic",
        exp: "Over four billion Minifigures have been produced since 1978; if placed together, their population would represent the largest artificial demographic group on Earth."
      }
    ],
    number: {
      q: "In what historic year did Godtfred Kirk Christiansen officially patent the iconic interlocking stud-and-tube design of the modern Lego plastic brick?",
      target: 1958,
      unit: "year",
      imperial: "1958 AD",
      exp: "The foundational Lego brick patent was granted on January 28, 1958."
    }
  },

  // Cycle 5: Hans Christian Andersen & Literary Heritage
  {
    mcqs: [
      {
        q: "Which world-famous Danish author, born into poverty in Odense on the island of Funen in 1805, penned 156 globally beloved fairy tales translated into over 125 languages?",
        correct: "Hans Christian Andersen H.C. Andersen",
        w1: "Søren Kierkegaard",
        w2: "Ludvig Holberg",
        exp: "Andersen masterworks include The Little Mermaid, The Ugly Duckling, The Emperor New Clothes, The Princess and the Pea, and The Snow Queen."
      },
      {
        q: "In what historic year was master storyteller Hans Christian Andersen born in a humble cobbler house in Odense, Denmark?",
        correct: "1805",
        w1: "1789",
        w2: "1848",
        exp: "Andersen was born on April 2, 1805, commemorated globally every year on his birthday as International Children Book Day."
      },
      {
        q: "Which Danish 19th-century philosopher and theologian, born in Copenhagen in 1813, is recognized as the Father of Christian Existentialism (author of Either/Or and Fear and Trembling)?",
        correct: "Søren Kierkegaard",
        w1: "N.F.S. Grundtvig",
        w2: "Georg Brandes",
        exp: "Kierkegaard wrote extensively under pseudonyms, exploring individual angst, subjectivity, and the radical 'leap of faith' required for spiritual authentic existence."
      },
      {
        q: "Which Danish noblewoman and author lived on a coffee plantation in British Kenya from 1914 to 1931, writing the internationally acclaimed memoir Out of Africa under the pen name Isak Dinesen?",
        correct: "Karen Blixen",
        w1: "Tove Ditlevsen",
        w2: "Agnes Henningsen",
        exp: "Her ancestral manor house at Rungstedlund north of Copenhagen is preserved as the Karen Blixen Museum, where she wrote Seven Gothic Tales."
      },
      {
        q: "What famous Hans Christian Andersen fairy tale, about an icy monarch who kidnaps little boy Kai to her frozen palace in Spitsbergen, was the direct narrative inspiration for Disney animated blockbuster Frozen?",
        correct: "The Snow Queen Snedronningen",
        w1: "The Wild Swans",
        w2: "The Steadfast Tin Soldier",
        exp: "Published in December 1844, The Snow Queen tells the epic journey of young Gerda who travels to the far north to rescue her childhood companion Kai."
      }
    ],
    number: {
      q: "In what year was the world-famous Danish fairy tale author Hans Christian Andersen born in Odense, Denmark?",
      target: 1805,
      unit: "year",
      imperial: "1805 AD",
      exp: "Hans Christian Andersen was born on April 2, 1805."
    }
  },

  // Cycle 6: Kronborg Castle (Hamlet's Elsinore) & Viking Heritage
  {
    mcqs: [
      {
        q: "What monumental Renaissance coastal fortress in Helsingør, guarding the narrow four-kilometer Øresund sound chokepoint between Denmark and Sweden, was immortalized by William Shakespeare as Elsinore Castle in Hamlet?",
        correct: "Kronborg Castle Kronborg Slot",
        w1: "Frederiksborg Castle",
        w2: "Rosenborg Castle",
        exp: "Rebuilt by King Frederick II in 1574, Kronborg generated immense wealth by collecting the Sound Dues (Øresundstolden) from every merchant ship entering the Baltic Sea."
      },
      {
        q: "According to Danish folklore, what legendary warrior and king sleeps in the dark underground casemates of Kronborg Castle, prophesied to awaken to defend Denmark when the nation is in peril?",
        correct: "Holger the Dane Holger Danske (Ogier the Dane)",
        w1: "Ragnar Lothbrok",
        w2: "Gorm the Old",
        exp: "A famous bronze-and-concrete statue of Holger Danske with a long white beard and drawn sword sits in the subterranean vaulted tunnels of Kronborg."
      },
      {
        q: "What famous 10th-century runic monuments in Jylland, erected by King Harald Bluetooth around 965 CE, are celebrated as the Birth Certificate of Denmark for uniting the Danish nation and adopting Christianity?",
        correct: "The Jelling Stones Jellingstenene",
        w1: "The Rök Stone",
        w2: "The Karlevi Stone",
        exp: "The Great Jelling Stone features the oldest depiction of Christ in Scandinavia, proclaiming that Harald 'won for himself all of Denmark and Norway and made the Danes Christian'."
      },
      {
        q: "What world-renowned maritime museum on Roskilde Fjord houses five intact 11th-century Viking ships (Skuldelev ships) scuttled in 1070 to block naval channels to the ancient royal capital?",
        correct: "Viking Ship Museum Vikingeskibsmuseet",
        w1: "National Museum of Denmark",
        w2: "Moesgaard Museum",
        exp: "The museum operates a traditional working boatyard that reconstructs exact seaworthy replicas using authentic Viking axes, pine tar, and hand-woven wool sails."
      },
      {
        q: "What monumental Gothic brick cathedral in Roskilde, built in the 12th and 13th centuries, has been the primary royal mausoleum for forty-four Danish monarchs since the 15th century?",
        correct: "Roskilde Cathedral Roskilde Domkirke",
        w1: "Ribe Cathedral",
        w2: "Viborg Cathedral",
        exp: "The UNESCO-listed twin-spired cathedral contains the opulent marble sarcophagi of Queen Margrethe I, King Christian IV, and all Danish kings and queens."
      }
    ],
    number: {
      q: "In approximately what year CE did King Harald Bluetooth erect the Great Jelling Stone, officially recognized as the Birth Certificate of the Danish nation?",
      target: 965,
      unit: "CE",
      imperial: "965 AD",
      exp: "The Great Jelling Stone was carved around 965 CE, commemorating Harald Bluetooth's unification of Denmark."
    }
  },

  // Cycle 7: The Øresund Bridge & Engineering Wonders
  {
    mcqs: [
      {
        q: "What monumental 16-kilometer combined road-and-rail fixed link, completed in 2000, connects the Danish capital of Copenhagen directly to the Swedish coastal city of Malmö?",
        correct: "The Øresund Bridge Øresundsforbindelsen",
        w1: "The Great Belt Fixed Link",
        w2: "The Fehmarnbelt Tunnel",
        exp: "The link consists of a 7.8-kilometer cable-stayed bridge, the 4-kilometer artificial island of Peberholm, and the 4-kilometer Drogden submerged concrete tunnel."
      },
      {
        q: "In what year was the international Øresund Bridge between Denmark and Sweden officially opened to motor and train traffic by Queen Margrethe II and King Carl XVI Gustaf?",
        correct: "2000",
        w1: "1995",
        w2: "2008",
        exp: "The bridge opened on July 1, 2000, creating the unified transnational Øresund metropolitan region of 4.1 million residents."
      },
      {
        q: "What massive 18-kilometer fixed transport link across the Great Belt waterway connects the Danish islands of Zealand and Funen, featuring the third longest suspension bridge span in the world (6.8 km)?",
        correct: "The Great Belt Fixed Link Storebæltsforbindelsen",
        w1: "The Little Belt Bridge",
        w2: "The Storstrøm Bridge",
        exp: "Opened in 1998, the East Bridge suspension towers stand 254 meters tall, eliminating ferry crossings between eastern and western Denmark."
      },
      {
        q: "What colossal 18-kilometer immersed road-and-rail tunnel currently under construction beneath the Baltic Sea will connect the Danish island of Lolland directly to the German island of Fehmarn in seven minutes?",
        correct: "The Fehmarnbelt Fixed Link Femern Bælt-forbindelsen",
        w1: "The Channel Tunnel",
        w2: "The Rogfast Tunnel",
        exp: "Scheduled for completion in 2029, it will be the longest immersed combined road and rail tunnel in the world, reducing travel time between Copenhagen and Hamburg to 2.5 hours."
      },
      {
        q: "What futuristic waste-to-energy power plant in Copenhagen, designed by architect Bjarke Ingels, features a year-round artificial ski slope and the world tallest climbing wall (85 m) on its sloping roof?",
        correct: "CopenHill Amager Bakke",
        w1: "Sydhavn Plant",
        w2: "Vestforbrænding",
        exp: "CopenHill burns municipal waste cleanly to provide electricity for 30,000 households and district heating for 72,000 homes, topped with hiking trails and a rooftop bar."
      }
    ],
    number: {
      q: "In what year did the landmark Øresund Bridge connecting Denmark and Sweden officially open to vehicular and rail transit?",
      target: 2000,
      unit: "year",
      imperial: "2000 AD",
      exp: "The Øresund Bridge was officially inaugurated and opened on July 1, 2000."
    }
  },

  // Cycle 8: Wind Power & Renewable Innovations
  {
    mcqs: [
      {
        q: "What world-leading Danish wind turbine manufacturer, founded in Lem in 1945, is the largest manufacturer and installer of wind turbines in global history?",
        correct: "Vestas Wind Systems",
        w1: "Siemens Gamesa",
        w2: "Goldwind",
        exp: "Vestas has installed over 88,000 wind turbines in eighty-eight countries, pioneering industrial-scale wind turbine blades and composite materials."
      },
      {
        q: "In what historic year did Denmark install the world very first offshore wind farm (Vindeby Offshore Wind Farm), consisting of eleven 450 kW turbines off the coast of Lolland?",
        correct: "1991",
        w1: "1980",
        w2: "2002",
        exp: "Vindeby operated successfully for twenty-five years before being decommissioned in 2017, proving that offshore ocean wind power was commercially viable."
      },
      {
        q: "What percentage of the total domestic electricity consumption of Denmark is generated from clean renewable wind and solar power, ranking highest among OECD nations?",
        correct: "Over 50 Percent",
        w1: "20 Percent",
        w2: "35 Percent",
        exp: "On windy days, Denmark wind turbines generate more than 100 percent of national electrical demand, exporting excess clean electricity to Germany, Norway, and Sweden."
      },
      {
        q: "What massive green energy infrastructure project planned by Denmark in the North Sea eighty kilometers offshore will create an artificial artificial island acting as a clean energy hub for 200 giant wind turbines?",
        correct: "The North Sea Energy Island Vindø",
        w1: "Dogger Bank Hub",
        w2: "Baltic Energy Island Bornholm",
        exp: "Covering 120,000 square meters, the energy island will generate up to 10 GW of electricity and produce green hydrogen fuel (Power-to-X) for heavy transport."
      },
      {
        q: "What global renewable energy enterprise, formerly known as DONG Energy (Danish Oil and Natural Gas), completely divested its fossil fuels to become the world largest developer of offshore wind farms?",
        correct: "Ørsted",
        w1: "Vattenfall",
        w2: "Equinor",
        exp: "Named in honor of Danish physicist Hans Christian Ørsted (who discovered electromagnetism in 1820), the company completed the world largest offshore wind farms."
      }
    ],
    number: {
      q: "In what year did Denmark install the world very first offshore wind farm (the historic Vindeby project) in the waters off Lolland?",
      target: 1991,
      unit: "year",
      imperial: "1991 AD",
      exp: "Vindeby Offshore Wind Farm began generating clean marine electricity in 1991."
    }
  },

  // Cycle 9: Hygge, Danish Gastronomy & Smørrebrød
  {
    mcqs: [
      {
        q: "What world-famous untranslatable Danish cultural concept embodies a feeling of cozy contentment, warmth, relaxed conviviality, and enjoying life simple pleasures with loved ones?",
        correct: "Hygge",
        w1: "Lagom",
        w2: "Sisu",
        exp: "Associated with glowing candlelight, warm wool socks, steaming cups of coffee, and cozy firesides during dark winter months, hygge is central to Danish happiness."
      },
      {
        q: "What traditional Danish open-faced sandwich, built on a buttered slice of dense dark sourdough rye bread (rugbrød) with artistic layers of pickled herring, roast beef, or cold-water shrimp, is a lunchtime staple?",
        correct: "Smørrebrød",
        w1: "Smörgåsbord",
        w2: "Pølser",
        exp: "Smørrebrød is traditionally eaten with knife and fork, paired with cold lager beer and a glass of caraway-spiced aquavit (snaps)."
      },
      {
        q: "What famous multi-layered laminated puff pastry, known in Denmark as Wienerbrød (Viennese Bread), was introduced to Denmark in the 1850s by Austrian bakers during a Danish bakery strike?",
        correct: "Danish Pastry Wienerbrød",
        w1: "Kanelsnegl",
        w2: "Spandauer",
        exp: "Danish bakers adapted the Austrian plundeldeig technique by adding extra eggs and butter, creating iconic custard-filled Spandauer and cinnamon swirls."
      },
      {
        q: "What world-famous brewery founded in Copenhagen in 1847 by J.C. Jacobsen pioneered the revolutionary isolation of the world first pure lager yeast culture (Saccharomyces carlsbergensis) in 1883?",
        correct: "Carlsberg Brewery",
        w1: "Tuborg",
        w2: "Mikkeller",
        exp: "Jacobsen shared his pure yeast culture freely with breweries worldwide without patenting it, revolutionizing consistent quality in beer brewing across the globe."
      },
      {
        q: "What iconic red-skinned boiled pork hot dog sausage, served from street food carts (Pølsevogn) across Denmark with remoulade, fried onions, and sweet pickled cucumber, is a beloved national street food?",
        correct: "Rød Pølse Red Sausage",
        w1: "Medisterpølse",
        w2: "Frikadeller",
        exp: "Originally dipped in red food dye in the 1920s to mark day-old discount sausages, the bright red skin became a permanent hallmark of Danish street food."
      }
    ],
    number: {
      q: "In what year was the historic Carlsberg Brewery founded in Copenhagen by industrialist J.C. Jacobsen?",
      target: 1847,
      unit: "year",
      imperial: "1847 AD",
      exp: "Carlsberg was founded on November 10, 1847, named after Jacobsen's son Carl and the Valby hill (bjerg)."
    }
  },

  // Cycle 10: Extent, 5 Regions & Danish Superlatives
  {
    mcqs: [
      {
        q: "What is the highest natural ground elevation point in European Denmark, rising to a modest 170.86 meters above sea level in the Ejerbjerge hills of eastern Jutland?",
        correct: "Møllehøj Mill Hill",
        w1: "Himmelbjerget",
        w2: "Yding Skovhøj",
        exp: "Marked by a millstone from the former 19th-century windmill, Møllehøj narrowly edges out neighboring Yding Skovhøj and Ejer Bavnehøj as Denmark highest natural point."
      },
      {
        q: "What spectacular six-kilometer stretch of sheer 128-meter-tall white chalk cliffs along the eastern coast of the island of Møn drops directly into the turquoise Baltic Sea?",
        correct: "Møns Klint",
        w1: "Stevns Klint",
        w2: "Bulbjerg",
        exp: "Formed from microscopic calcium coccolith shells deposited seventy million years ago during the Cretaceous period, the cliffs are rich in fossilized sea urchins and belemnites."
      },
      {
        q: "Into how many administrative regions (Regioner), established in the 2007 territorial reform, is the sovereign country of Denmark politically divided?",
        correct: "5 Regions",
        w1: "10 Regions",
        w2: "14 Regions",
        exp: "The five regions are the Capital Region of Denmark, Region Zealand, Region of Southern Denmark, Central Denmark Region, and North Denmark Region."
      },
      {
        q: "What isolated, rocky Danish island in the Baltic Sea, situated south of Sweden, is renowned for round fortified medieval churches (Rundkirker), smokehouses for smoked herring, and Hammershus Castle ruins?",
        correct: "Bornholm",
        w1: "Lolland",
        w2: "Langeland",
        exp: "Bornholm features sunny microclimates where fig trees and mulberries grow, alongside the medieval round churches like Østerlars Church."
      },
      {
        q: "What unique distinction does the Danish Monarchy hold as one of the oldest continuous royal dynasties on Earth, tracing its lineage back to King Gorm the Old in what century CE?",
        correct: "10th Century CE (c. 936 CE)",
        w1: "13th Century CE",
        w2: "8th Century BCE",
        exp: "King Frederik X ascended the Danish throne in January 2024 following the abdication of Queen Margrethe II, continuing over 1,100 years of unbroken royal heritage."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Møllehøj, the highest natural terrain elevation point in Denmark?",
      target: 171,
      unit: "meters",
      imperial: "561 feet",
      exp: "Møllehøj in the Central Denmark Region stands at an official surveyed elevation of 170.86 meters (rounded to 171 m) above sea level."
    }
  }
];

// Build Denmark Quiz
buildQuiz({
  id: 'denmark-geography-heritage-60',
  theme: 'Denmark: Geography, Viking Fortresses & Nordic Innovations',
  title: 'Denmark: Geography, Viking Fortresses & Nordic Innovations',
  description: 'A 60-question grand master assessment exploring Copenhagen & The Little Mermaid (1913), Tivoli Gardens (1843), Greenland (2M sq km), Lego (1958 patent), Hans Christian Andersen (1805), Jelling Stones (965 CE), Øresund Bridge (2000), offshore wind (1991), and Møllehøj (171 m).',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, denmarkCycles);

console.log('Denmark quiz built successfully!');
