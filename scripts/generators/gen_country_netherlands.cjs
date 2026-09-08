const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 3. netherlands-geography-heritage-60
// =========================================================================
const netherlandsCycles = [
  // Cycle 1: The Low Countries & Polder Engineering
  {
    mcqs: [
      {
        q: "What percentage of the total land area of the European Netherlands sits below mean sea level, protected by thousands of kilometers of dikes, dunes, and pumping stations?",
        correct: "Over 26 Percent",
        w1: "10 Percent",
        w2: "50 Percent",
        exp: "Combined with low-lying flood-prone plains, roughly half of the country sits less than one meter above sea level, giving rise to the name Netherlands (Low Lands)."
      },
      {
        q: "What is the lowest point on land in the Netherlands, sitting 6.76 meters below sea level in the province of South Holland?",
        correct: "Zuidplaspolder",
        w1: "Haarlemmermeer",
        w2: "Prins Alexanderpolder",
        exp: "Located near Nieuwerkerk aan den IJssel, the Zuidplaspolder was drained and reclaimed from a peat-marsh lake in the 19th century."
      },
      {
        q: "Which major international hub airport in the Netherlands sits entirely inside a reclaimed lake polder at three meters below sea level?",
        correct: "Amsterdam Airport Schiphol",
        w1: "Rotterdam The Hague Airport",
        w2: "Eindhoven Airport",
        exp: "Schiphol was originally a shallow bay of the Haarlemmermeer lake (meaning 'Ship Hole' due to frequent shipwrecks during storms) before being pumped dry in 1852."
      },
      {
        q: "What ancient local government authorities in the Netherlands, established in the 13th century, are recognized as among the oldest surviving democratic institutions in the world?",
        correct: "Water Boards Waterschappen",
        w1: "Polder Councils",
        w2: "Dike Guilds",
        exp: "The water boards (Waterschappen) function independently from municipal governments with their own elections and taxes to manage dikes, drainage canals, and flood barriers."
      },
      {
        q: "What is the largest artificial island reclaimed from water in the world, established in 1986 as the twelfth province of the Netherlands?",
        correct: "Flevoland",
        w1: "Noordoostpolder",
        w2: "Wieringermeer",
        exp: "Created by draining parts of the former Zuiderzee inland sea, Flevoland covers 1,419 square kilometers of reclaimed agricultural and urban land."
      }
    ],
    number: {
      q: "How many meters below mean sea level is the lowest natural land elevation at the Zuidplaspolder in the Netherlands?",
      target: 7,
      unit: "meters below sea level",
      imperial: "22.2 feet below sea level",
      exp: "The Zuidplaspolder sits at 6.76 meters (rounded to 7 m) below Amsterdam Ordnance Datum (NAP), the lowest point in the Low Countries."
    }
  },

  // Cycle 2: The Delta Works & Coastal Defenses
  {
    mcqs: [
      {
        q: "What catastrophic North Sea storm surge on the night of January 31, 1953, breached Dutch dikes, flooded 1,600 square kilometers, and claimed 1,836 lives in Zeeland?",
        correct: "The North Sea Flood Watersnoodramp",
        w1: "The St Elizabeth Flood",
        w2: "The All Saints Flood",
        exp: "The disaster prompted the immediate passing of the Delta Act, launching the construction of the colossal Delta Works coastal flood defense megaproject."
      },
      {
        q: "What massive 9-kilometer storm surge barrier in Zeeland, featuring sixty-two steel sluice gates that close only during severe North Sea storms, was named the Eighth Wonder of the World?",
        correct: "Oosterscheldekering Eastern Scheldt Barrier",
        w1: "Haringvlietdam",
        w2: "Brouwersdam",
        exp: "Engineers designed the barrier with open sliding gates to preserve the tidal marine ecosystem and oyster fisheries of the Eastern Scheldt estuary."
      },
      {
        q: "What movable storm surge barrier at Hook of Holland consists of two colossal 210-meter floating steel sector gates that swing together to close the waterway to Rotterdam?",
        correct: "Maeslantkering",
        w1: "Hartelkering",
        w2: "Hollandsche IJssel Barrier",
        exp: "Each steel gate is as long as the Eiffel Tower is tall, operated automatically by a supercomputer that monitors ocean water levels and storm predictions."
      },
      {
        q: "What historic 32-kilometer enclosure dam completed in 1932 separated the stormy Zuiderzee saltwater bay from the North Sea, turning it into the freshwater lake IJsselmeer?",
        correct: "The Afsluitdijk",
        w1: "Houtribdijk",
        w2: "Brouwersdam",
        exp: "Engineered under Cornelis Lely, the Afsluitdijk connects North Holland with Friesland, protected by stone riprap and the Stevinsluizen drainage locks."
      },
      {
        q: "What is the massive 1,100-square-kilometer freshwater lake in central Netherlands created by the construction of the Afsluitdijk barrier dam in 1932?",
        correct: "Lake IJsselmeer",
        w1: "Markermeer",
        w2: "Waddenzee",
        exp: "IJsselmeer is fed by the IJssel River (a distributary of the Rhine), providing drinking water, agricultural irrigation, and recreational sailing."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the historic Afsluitdijk closure dam separating the IJsselmeer from the Wadden Sea?",
      target: 32,
      unit: "kilometers",
      imperial: "20 miles long",
      exp: "The Afsluitdijk stretches for thirty-two kilometers between Den Oever in North Holland and Zurich in Friesland."
    }
  },

  // Cycle 3: Amsterdam, Canals & The Golden Age
  {
    mcqs: [
      {
        q: "What 17th-century UNESCO World Heritage semicircular network of concentric canals encircles the historic city center of Amsterdam?",
        correct: "The Canal Ring Grachtengordel",
        w1: "The Singelgracht",
        w2: "The Jordaan Canals",
        exp: "The three main concentric canals (Herengracht, Keizersgracht, and Prinsengracht) were dug during the Dutch Golden Age to accommodate expanding merchant commerce."
      },
      {
        q: "Approximately how many bridges cross the 165 historic canals that thread through the city of Amsterdam?",
        correct: "Over 1,200 Bridges",
        w1: "400 Bridges",
        w2: "800 Bridges",
        exp: "Amsterdam has 1,281 bridges (more than Venice), including the famous 17th-century wooden double-drawbridge Magere Brug (Skinny Bridge) across the Amstel River."
      },
      {
        q: "Which world-famous museum on the Museumplein in Amsterdam is dedicated to Dutch Golden Age art, housing Rembrandt van Rijn colossal 1642 masterpiece The Night Watch?",
        correct: "Rijksmuseum",
        w1: "Van Gogh Museum",
        w2: "Stedelijk Museum",
        exp: "Designed by Pierre Cuypers in 1885, the Rijksmuseum also houses iconic works by Johannes Vermeer (The Milkmaid), Frans Hals, and Jan Steen."
      },
      {
        q: "Which canal house on the Prinsengracht in Amsterdam is preserved as a museum where teenager Anne Frank hid in a Secret Annex from 1942 to 1944 writing her world-famous diary?",
        correct: "The Anne Frank House Anne Frank Huis",
        w1: "Rembrandt House",
        w2: "Van Loon Museum",
        exp: "The entrance to the rear annex was concealed behind a revolving wooden bookcase, welcoming over one million international visitors annually."
      },
      {
        q: "Which charming 17th-century residential neighborhood in Amsterdam, originally built for working-class artisans, is famous for art galleries, courtyards (hofjes), and narrow canal alleys?",
        correct: "The Jordaan",
        w1: "De Pijp",
        w2: "Oud-Zuid",
        exp: "The Jordaan (derived from French jardin for garden) features streets named after flowers, vibrant flea markets on Noordermarkt, and traditional brown cafes (bruin cafés)."
      }
    ],
    number: {
      q: "How many major primary concentric 17th-century canals form the core of the UNESCO World Heritage Amsterdam Canal Ring (Herengracht, Keizersgracht, Prinsengracht)?",
      target: 3,
      unit: "grand canals",
      imperial: "3 grand concentric canals",
      exp: "The 17th-century Grachtengordel is structured around three main concentric canals: the Gentlemen's Canal (Herengracht), Emperor's Canal (Keizersgracht), and Prince's Canal (Prinsengracht)."
    }
  },

  // Cycle 4: Windmills & Kinderdijk Heritage
  {
    mcqs: [
      {
        q: "What UNESCO World Heritage site in South Holland preserves a group of nineteen 18th-century drainage windmills built to pump water out of the Alblasserwaard polder?",
        correct: "The Windmills of Kinderdijk",
        w1: "Zaanse Schans",
        w2: "Schiedam Windmills",
        exp: "Built between 1738 and 1740, the windmills use Archimedean water screws and scoop wheels to lift water into the Lek River reservoir."
      },
      {
        q: "Which open-air historic heritage village on the Zaan River in North Holland preserves functioning 18th-century industrial windmills that ground spices, mustard, oil, and paint pigments?",
        correct: "Zaanse Schans",
        w1: "Kinderdijk",
        w2: "Enkhuizen",
        exp: "The Zaan region was the world earliest industrial area, where hundreds of wind-powered sawmills cut timber for the Dutch East India Company (VOC) shipbuilding yards."
      },
      {
        q: "Which city in South Holland is home to the tallest historic traditional stone windmills in the world, measuring up to forty-three meters high to catch wind above city warehouses for distilling genever gin?",
        correct: "Schiedam",
        w1: "Delft",
        w2: "Leiden",
        exp: "The colossal Schiedam windmills (such as De Noord and De Walvisch) milled malted grain for the historic Dutch jenever distillery industry."
      },
      {
        q: "What traditional Dutch mechanical mechanism inside historic polder drainage windmills uses an inclined wooden or iron spiral screw inside a cylinder to lift water uphill?",
        correct: "Archimedes Screw Archimedesschroef",
        w1: "Water Scoop Wheel",
        w2: "Centrifugal Impeller",
        exp: "Archimedes screws allowed windmills to lift water several meters higher than traditional flat paddle wheels, enabling deeper lakes to be drained into fertile polders."
      },
      {
        q: "What traditional wooden clog shoes, hand-carved from single blocks of native willow or poplar wood, have been worn by Dutch farmers and fishermen since the Middle Ages?",
        correct: "Klompen",
        w1: "Sabots",
        w2: "Patins",
        exp: "Klompen provide safety against falling cow hooves, sharp tools, and wet muddy polder soils, certified as European safety footwear."
      }
    ],
    number: {
      q: "How many historic 18th-century drainage windmills are preserved at the UNESCO World Heritage site of Kinderdijk in South Holland?",
      target: 19,
      unit: "windmills",
      imperial: "19 historic windmills",
      exp: "Kinderdijk features nineteen intact drainage windmills (including eight round brick mills and ten thatched hollow post mills)."
    }
  },

  // Cycle 5: Tulips, Keukenhof & Floriculture
  {
    mcqs: [
      {
        q: "What famous 32-hectare botanical floral garden in Lisse is known as the Garden of Europe, planting over seven million blooming flower bulbs every spring?",
        correct: "Keukenhof",
        w1: "Hortus Botanicus",
        w2: "Appeltern Gardens",
        exp: "Open for just eight weeks from late March to mid-May, Keukenhof showcases hundreds of varieties of tulips, hyacinths, daffodils, and orchids."
      },
      {
        q: "What historic economic event during the Dutch Golden Age in February 1637 is widely regarded by economists as the first recorded speculative asset price bubble in world history?",
        correct: "Tulip Mania Tulpenmanie",
        w1: "The South Sea Bubble",
        w2: "The Mississippi Scheme",
        exp: "Prices for rare single tulip bulbs (like the flame-patterned Semper Augustus) reached more than ten times the annual income of a skilled craftsman before suddenly collapsing."
      },
      {
        q: "What massive international flower auction facility in Aalsmeer, near Amsterdam, is the largest commercial building by footprint in the world, trading over twenty million flowers daily?",
        correct: "Royal FloraHolland Aalsmeer",
        w1: "Westland Flower Auction",
        w2: "Rijnsburg Market",
        exp: "Covering 518,000 square meters (the size of seventy-five football fields), FloraHolland utilizes high-speed Dutch descending clock auctions to distribute flowers globally within twenty-four hours."
      },
      {
        q: "What coastal dune strip in South Holland and North Holland between Haarlem and Leiden is famous for endless geometric rows of blooming red, pink, and yellow tulip fields in April?",
        correct: "The Bollenstreek Bulb Region",
        w1: "The Betuwe",
        w2: "The Westland",
        exp: "Well-drained sandy limestone soils behind coastal dunes provide the perfect soil chemistry for propagating commercial flower bulbs."
      },
      {
        q: "In which century was the tulip flower first introduced to the Netherlands from the Ottoman Empire by botanist Carolus Clusius at the University of Leiden Hortus Botanicus?",
        correct: "16th Century",
        w1: "14th Century",
        w2: "18th Century",
        exp: "Clusius planted the first Dutch tulip bulbs in 1593, where a benign mosaic virus caused the exotic striped flame patterns prized by wealthy Dutch collectors."
      }
    ],
    number: {
      q: "In what year did the historic speculative financial bubble of Dutch Tulip Mania reach its peak and abruptly crash in Amsterdam?",
      target: 1637,
      unit: "year",
      imperial: "1637 AD",
      exp: "The tulip bulb market dramatically collapsed in the first week of February 1637, leaving contract buyers unable to pay inflated prices."
    }
  },

  // Cycle 6: Port of Rotterdam & Maritime Megastructures
  {
    mcqs: [
      {
        q: "What city in South Holland is home to the largest seaport in Europe, stretching forty kilometers from the city center out into the North Sea?",
        correct: "Port of Rotterdam",
        w1: "Port of Amsterdam",
        w2: "Port of Antwerp",
        exp: "Rotterdam handled over 438 million metric tons of cargo in 2023, serving as the primary commercial maritime gateway for Germany and Central Europe via the Rhine."
      },
      {
        q: "What massive 2,000-hectare deep-water port expansion project reclaimed land directly from the North Sea to accommodate the world largest 24,000-TEU container ships in Rotterdam?",
        correct: "Maasvlakte 2",
        w1: "Europoort",
        w2: "Waalhaven",
        exp: "Opened in 2013, Maasvlakte 2 features 20-meter-deep dredged ship channels and ultra-automated unmanned robotic container cranes and electric transport vehicles."
      },
      {
        q: "What iconic 802-meter asymmetric white cable-stayed bridge spanning the Nieuwe Maas river in Rotterdam is nicknamed The Swan (De Zwaan)?",
        correct: "Erasmus Bridge Erasmusbrug",
        w1: "Willemsbrug",
        w2: "Van Brienenoordbrug",
        exp: "Designed by architect Ben van Berkel in 1996, the bridge features a 139-meter angled pylon and an 89-meter bascule drawbridge, the largest in Western Europe."
      },
      {
        q: "What famous architectural landmark in Rotterdam, designed by architect Piet Blom in 1984, features thirty-eight hexagonal yellow cube houses tilted at a 45-degree angle on hexagonal pylons?",
        correct: "The Cube Houses Kubuswoningen",
        w1: "Markthal",
        w2: "De Rotterdam",
        exp: "Blom designed the tilted cube houses to represent an abstract urban forest, with each individual house symbolizing an abstract tree."
      },
      {
        q: "What monumental horseshoe-shaped covered food hall and residential building in Rotterdam features an interior arched ceiling covered in an 11,000-square-meter digital mural of fruits and flowers called The Horn of Plenty?",
        correct: "Markthal",
        w1: "Fenix Food Factory",
        w2: "Groothandelsgebouw",
        exp: "Designed by architectural firm MVRDV in 2014, the Markthal combines one hundred fresh produce stalls below with 228 apartments inside the outer arch."
      }
    ],
    number: {
      q: "In what year was the monumental Maasvlakte 2 deep-sea container port expansion officially opened into the North Sea at Rotterdam?",
      target: 2013,
      unit: "year",
      imperial: "2013 AD",
      exp: "Maasvlakte 2 was formally opened for commercial container shipping in May 2013, expanding the Port of Rotterdam by twenty percent."
    }
  },

  // Cycle 7: Dutch Cheese, Dairying & Markets
  {
    mcqs: [
      {
        q: "Which world-famous semi-hard Dutch yellow cow milk cheese, accounting for over sixty percent of all cheese produced in the Netherlands, is named after a city in South Holland?",
        correct: "Gouda Cheese Goudse Kaas",
        w1: "Edam Cheese",
        w2: "Maasdam Cheese",
        exp: "Crafted in circular wheels with a golden-yellow paraffin wax coating, Gouda is aged from four weeks (Jong) to over twelve months (Oud) on unvarnished pine wooden boards."
      },
      {
        q: "Which spherical Dutch semi-hard cheese with a distinctive red paraffin wax coating is named after a historic port town on the Markermeer in North Holland?",
        correct: "Edam Cheese Edammer",
        w1: "Leyden Cheese",
        w2: "Beemster Cheese",
        exp: "Edam low fat content and firm rind made it the world most popular cheese aboard sailing ships from the 14th to 18th centuries because it never spoiled on long voyages."
      },
      {
        q: "In which North Holland city has a traditional historic Friday cheese market been held since 1365, where costumed Guild of Cheese Porters (Kaasdragers) carry cheese barrows to the Waag weighing house?",
        correct: "Alkmaar",
        w1: "Gouda",
        w2: "Edam",
        exp: "Porters in white uniforms wear red, blue, green, or yellow straw hats representing their four distinct guild companies (vemen) while running in a synchronized trot."
      },
      {
        q: "What world-renowned black-and-white dairy cattle breed originating in the northern provinces of Friesland and North Holland is the world highest-producing dairy cow?",
        correct: "Holstein-Friesian",
        w1: "Dutch Belted Lakenvelder",
        w2: "Meuse-Rhine-Issel",
        exp: "Bred for two thousand years on lush nutrient-dense Dutch polder grasslands, Holstein-Friesians produce over 10,000 liters of milk per cow annually worldwide."
      },
      {
        q: "What famous Dutch sweet bakery treat, invented in the city of Gouda in the late 18th century, consists of two thin waffle layers filled with warm caramel cinnamon syrup?",
        correct: "Stroopwafel",
        w1: "Poffertjes",
        w2: "Oliebollen",
        exp: "Traditionally placed over a steaming cup of coffee or tea to soften the caramel center, Stroopwafels were originally created by bakers using leftover sweet dough crumbs."
      }
    ],
    number: {
      q: "How many professional guild porters (Kaasdragers) make up the historic Guild of Cheese Carriers at the Alkmaar cheese market in the Netherlands?",
      target: 30,
      unit: "guildsmen",
      imperial: "30 traditional cheese porters",
      exp: "The historic Alkmaar Cheese Porters Guild consists of thirty porters plus the 'Cheese Father' (Kaasvader), divided into four distinct color-coded companies."
    }
  },

  // Cycle 8: Dutch Art Masters & Scientific Revolution
  {
    mcqs: [
      {
        q: "Which 17th-century Dutch master painter from Delft is acclaimed for sublime mastery of natural light in interior domestic genre scenes like Girl with a Pearl Earring and The Milkmaid?",
        correct: "Johannes Vermeer",
        w1: "Rembrandt van Rijn",
        w2: "Frans Hals",
        exp: "Vermeer produced only thirty-four known surviving paintings in his lifetime, using expensive crushed lapis lazuli ultramarine pigment and optical camera obscura techniques."
      },
      {
        q: "Which post-Impressionist Dutch master painter, born in Zundert in 1853, created over 2,100 artworks including Sunflowers and Starry Night, celebrated in his dedicated museum in Amsterdam?",
        correct: "Vincent van Gogh",
        w1: "Piet Mondrian",
        w2: "M.C. Escher",
        exp: "The Van Gogh Museum in Amsterdam holds the world largest collection of his works, featuring over two hundred paintings, five hundred drawings, and seven hundred personal letters."
      },
      {
        q: "Which 17th-century Dutch scientist from Delft, known as the Father of Microbiology, was the first human to observe single-celled bacteria and protozoa under his handcrafted single-lens microscopes?",
        correct: "Antonie van Leeuwenhoek",
        w1: "Christiaan Huygens",
        w2: "Zacharias Janssen",
        exp: "Leeuwenhoek ground microscopic glass spheres that magnified objects up to 275 times, discovering spermatozoa, red blood cells, and microbial 'animalcules' in pond water."
      },
      {
        q: "Which Dutch polymath and astronomer discovered Saturn largest moon Titan in 1655, explained Saturn ring system, and invented the precision pendulum clock?",
        correct: "Christiaan Huygens",
        w1: "Simon Stevin",
        w2: "Jan Swammerdam",
        exp: "Huygens also pioneered the wave theory of light (Huygens-Fresnel principle), whose pendulum clock reduced timekeeping errors from fifteen minutes to seconds per day."
      },
      {
        q: "Which 20th-century Dutch abstract painter from Amersfoort co-founded the De Stijl art movement, famous for non-representational grid paintings of black vertical and horizontal lines with primary color blocks?",
        correct: "Piet Mondrian",
        w1: "Theo van Doesburg",
        w2: "Gerrit Rietveld",
        exp: "Mondrian Neoplasticism sought pure universal aesthetic harmony, influencing modern graphic design, architecture, and Yves Saint Laurent iconic 1965 Mondrian dress."
      }
    ],
    number: {
      q: "Approximately how many original paintings by Vincent van Gogh are permanently preserved in the Van Gogh Museum in Amsterdam?",
      target: 200,
      unit: "paintings",
      imperial: "200+ original paintings",
      exp: "The Van Gogh Museum houses the largest collection of Van Gogh artworks on Earth, including over two hundred original canvas paintings."
    }
  },

  // Cycle 9: The Hague & International Law
  {
    mcqs: [
      {
        q: "Which city on the North Sea coast serves as the administrative seat of the Dutch government, residence of the monarch, and the International City of Peace and Justice?",
        correct: "The Hague Den Haag",
        w1: "Amsterdam",
        w2: "Utrecht",
        exp: "While Amsterdam is the constitutional capital, The Hague hosts the Dutch Parliament, Supreme Court, all foreign embassies, and major international tribunals."
      },
      {
        q: "What opulent neo-Renaissance palace in The Hague, dedicated in 1913, houses the International Court of Justice (the primary judicial branch of the United Nations) and Permanent Court of Arbitration?",
        correct: "The Peace Palace Vredespaleis",
        w1: "Noordeinde Palace",
        w2: "Huis ten Bosch",
        exp: "Funded by Scottish-American steel magnate Andrew Carnegie, nations worldwide donated materials including Carrara marble, Japanese tapestries, and German stained glass."
      },
      {
        q: "What 13th-century Gothic castle complex in the center of The Hague, centered around the Knight Hall (Ridderzaal), is the oldest parliament building complex still in active use in the world?",
        correct: "The Binnenhof",
        w1: "The Mauritshuis",
        w2: "Catshuis",
        exp: "Built by the Counts of Holland, the Binnenhof houses the two chambers of the Dutch States General (Staten-Generaal) and the office of the Prime Minister (Het Torentje)."
      },
      {
        q: "Which royal picture gallery in a 17th-century palace adjacent to the Binnenhof in The Hague exhibits Vermeer Girl with a Pearl Earring and Rembrandt Anatomy Lesson?",
        correct: "The Mauritshuis",
        w1: "Gemeentemuseum",
        w2: "Museum Boijmans Van Beuningen",
        exp: "Built for Count Johan Maurits of Nassau, the museum holds a world-class collection of 854 Dutch Golden Age paintings."
      },
      {
        q: "What international treaty signed in the Dutch city of Maastricht on February 7, 1992, officially created the modern European Union and established the Euro single currency?",
        correct: "The Maastricht Treaty Treaty on European Union",
        w1: "Treaty of Rome",
        w2: "Treaty of Amsterdam",
        exp: "Negotiated under the Dutch Presidency of the European Council, the treaty integrated European foreign policy, justice, and monetary union."
      }
    ],
    number: {
      q: "In what year was the historic Peace Palace (Vredespaleis) in The Hague officially inaugurated as the home of international arbitration?",
      target: 1913,
      unit: "year",
      imperial: "1913 AD",
      exp: "The Peace Palace was formally dedicated on August 28, 1913, in the presence of Queen Wilhelmina and Andrew Carnegie."
    }
  },

  // Cycle 10: Extent, 12 Provinces & Dutch Superlatives
  {
    mcqs: [
      {
        q: "What is the highest natural point on land in the European territory of the Netherlands, rising 322.4 meters at the tri-point border with Belgium and Germany?",
        correct: "Vaalserberg",
        w1: "Mount Scenery",
        w2: "Utrechtse Heuvelrug",
        exp: "Located in the rolling limestone hills of Limburg, the Drielandenpunt (Three-Country Point) at the summit of Vaalserberg allows visitors to stand in three nations simultaneously."
      },
      {
        q: "What active stratovolcano on the Caribbean island of Saba is the highest point in the entire Kingdom of the Netherlands at 887 meters elevation?",
        correct: "Mount Scenery",
        w1: "The Quill",
        w2: "Christoffelberg",
        exp: "Since the 2010 dissolution of the Netherlands Antilles, the special Caribbean municipalities (Bonaire, Sint Eustatius, Saba) are integrated into the Dutch state."
      },
      {
        q: "Into how many administrative provinces (Provincies) is the European territory of the Netherlands divided?",
        correct: "12 Provinces",
        w1: "10 Provinces",
        w2: "16 Provinces",
        exp: "The twelve provinces (such as North Holland, South Holland, Utrecht, Gelderland, North Brabant, and Flevoland) each have an elected Provincial Council."
      },
      {
        q: "What ranking does the Netherlands hold globally among the world largest exporters of agricultural food and farm products by value, trailing only the United States?",
        correct: "Second Largest Agricultural Exporter",
        w1: "First Largest Exporter",
        w2: "Fifth Largest Exporter",
        exp: "Through hyper-efficient greenhouse robotics, precision soil-less farming, and research at Wageningen University, tiny Netherlands exports over 120 billion euros in agri-food annually."
      },
      {
        q: "How does the total bicycle population in the Netherlands compare to the human population of roughly 18 million residents?",
        correct: "Bicycles outnumber humans with over 23 million bikes",
        w1: "Bicycles equal humans exactly",
        w2: "Bicycles are half the human population",
        exp: "Supported by over 35,000 kilometers of dedicated separated cycle paths (fietspaden), roughly twenty-seven percent of all trips nationwide are made by bicycle."
      }
    ],
    number: {
      q: "How many administrative provinces comprise the European territory of the Kingdom of the Netherlands?",
      target: 12,
      unit: "provinces",
      imperial: "12 provinces",
      exp: "The European Netherlands consists of twelve official provinces, from Groningen and Friesland in the north to Zeeland and Limburg in the south."
    }
  }
];

// Build Netherlands Quiz
buildQuiz({
  id: 'netherlands-geography-heritage-60',
  theme: 'Netherlands: Geography, Polders & Dutch Masters',
  title: 'Netherlands: Geography, Polders & Dutch Masters',
  description: 'A 60-question grand master assessment exploring Low Countries polder engineering, the Delta Works & Afsluitdijk (32 km), Amsterdam canal ring (1,281 bridges), Kinderdijk windmills, Keukenhof tulips (1637 mania), Port of Rotterdam, Gouda cheese, and Vermeer.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, netherlandsCycles);

console.log('Netherlands quiz built successfully!');
