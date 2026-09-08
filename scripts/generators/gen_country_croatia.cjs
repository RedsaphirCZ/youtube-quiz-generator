const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 2. croatia-geography-heritage-60
// =========================================================================
const croatiaCycles = [
  // Cycle 1: Plitvice Lakes & Travertine Cascades
  {
    mcqs: [
      {
        q: "What world-famous UNESCO World Heritage national park in central Croatia features sixteen terraced turquoise lakes interconnected by ninety cascading waterfalls?",
        correct: "Plitvice Lakes National Park Plitvička jezera",
        w1: "Krka National Park",
        w2: "Paklenica National Park",
        exp: "Plitvice is the oldest and largest national park in Croatia (founded in 1949), famous for wooden boardwalk footpaths hovering directly over crystal-clear waters."
      },
      {
        q: "What natural biological and geological process creates the dynamic, growing rock barriers that separate the sixteen cascading lakes of Plitvice?",
        correct: "Travertine tufa deposition by mosses, algae, and calcium carbonate precipitation",
        w1: "Volcanic basalt lava flows",
        w2: "Glacial moraine bulldozing",
        exp: "Endemic bryophyte mosses and micro-organisms encrust with dissolved calcium carbonate, growing living limestone dams at rates of roughly one centimeter per year."
      },
      {
        q: "What is the tallest single waterfall in Plitvice Lakes National Park and all of Croatia, plunging seventy-eight meters into the Korana River canyon?",
        correct: "Veliki Slap The Great Waterfall",
        w1: "Galovački Buk",
        w2: "Milanovački Slap",
        exp: "Fed by the Plitvica stream cascading over a sheer limestone cliff, Veliki Slap forms the dramatic centerpiece of the Lower Lakes (Donja jezera)."
      },
      {
        q: "What pristine deep-forest predator mammal, strictly protected in the old-growth beech and fir forests of Plitvice (Čorkova Uvala), is the symbol of the national park?",
        correct: "The Eurasian Brown Bear Ursus arctos",
        w1: "The Golden Jackal",
        w2: "The Wild Boar",
        exp: "Plitvice contains some of the highest densities of wild brown bears, gray wolves, and Eurasian lynx in Southeastern Europe."
      },
      {
        q: "What is the largest and deepest of the sixteen lakes in Plitvice Lakes National Park, covering eighty-one hectares and crossed by silent electric passenger boats?",
        correct: "Lake Kozjak",
        w1: "Lake Prošćansko",
        w2: "Lake Kaluđerovac",
        exp: "Lake Kozjak reaches depths of forty-six meters, featuring the small green Stephanie Island named after Crown Princess Stéphanie of Belgium who visited in 1888."
      }
    ],
    number: {
      q: "What is the vertical drop height in meters of Veliki Slap (The Great Waterfall), the highest waterfall in Croatia, located in Plitvice Lakes?",
      target: 78,
      unit: "meters",
      imperial: "256 feet drop",
      exp: "Veliki Slap plunges a sheer seventy-eight meters down the limestone canyon wall into the Lower Lakes."
    }
  },

  // Cycle 2: Dubrovnik & The Pearl of the Adriatic
  {
    mcqs: [
      {
        q: "What legendary UNESCO World Heritage fortified seaport city in southern Dalmatia, known as the Pearl of the Adriatic, was the maritime capital of the historic Republic of Ragusa?",
        correct: "Dubrovnik",
        w1: "Split",
        w2: "Zadar",
        exp: "Ragusa was a wealthy maritime merchant republic (1358-1808) whose motto was 'Non bene pro toto libertas venditur auro' (Liberty is not well sold for all the gold in the world)."
      },
      {
        q: "What is the total length in meters of the continuous, remarkably intact medieval stone city walls and bastions that completely encircle the Old Town of Dubrovnik?",
        correct: "1,940 Meters",
        w1: "800 Meters",
        w2: "3,200 Meters",
        exp: "Reaching heights of twenty-five meters with walls up to six meters thick, the perimeter includes the Minčeta Tower, Bokar Fortress, and Revelin Fortress."
      },
      {
        q: "What famous polished limestone pedestrian main street traverses the heart of Dubrovnik Old Town, connecting the Pile Gate to Luža Square?",
        correct: "The Stradun Placa",
        w1: "Riva",
        w2: "Kalelarga",
        exp: "Paved with gleaming white limestone flags that shine like glass after rain, Stradun features uniform 17th-century Baroque facades built after the 1667 earthquake."
      },
      {
        q: "Which detached 16th-century fortress on a 37-meter sea cliff outside Dubrovnik western walls, known as Dubrovnik Gibraltar, was featured as the Red Keep in Game of Thrones?",
        correct: "Fort Lovrijenac St. Lawrence Fortress",
        w1: "Fort Revelin",
        w2: "Fort St. John",
        exp: "Lovrijenac was constructed in just three months in the 11th century to pre-empt a Venetian military occupation, famous for summer performances of Shakespeare Hamlet."
      },
      {
        q: "What historic 15th-century public fountain inside the Pile Gate of Dubrovnik, designed by Italian architect Onofrio della Cava, supplied mountain spring water via a 12-kilometer aqueduct?",
        correct: "Large Onofrio Fountain Velika Onofrijeva česma",
        w1: "Small Onofrio Fountain",
        w2: "Orlando Column",
        exp: "The 16-sided polygon stone fountain is decorated with sixteen carved stone mascaron spouts, still providing refreshing drinking water to visitors."
      }
    ],
    number: {
      q: "What is the total continuous perimeter length in meters of the historic medieval defensive city walls encircling Old Town Dubrovnik?",
      target: 1940,
      unit: "meters",
      imperial: "6,365 feet (1.2 miles around)",
      exp: "The stone walls of Dubrovnik measure exactly 1,940 meters in total perimeter length."
    }
  },

  // Cycle 3: Split & Diocletian's Palace
  {
    mcqs: [
      {
        q: "What monumental 4th-century Roman palace complex on the Dalmatian coast, covering 30,000 square meters, forms the living historic city center of modern-day Split?",
        correct: "Diocletian Palace Dioklecijanova palača",
        w1: "Palace of Galerius",
        w2: "Villa Romana del Casale",
        exp: "Roman Emperor Diocletian built the fortress-palace between 295 and 305 CE to retire and grow cabbages, today housing three thousand residents inside its ancient walls."
      },
      {
        q: "In what year CE did Roman Emperor Diocletian officially complete his palace in Split and become the only Roman Emperor to voluntarily abdicate his imperial throne?",
        correct: "305 CE",
        w1: "476 CE",
        w2: "284 CE",
        exp: "Diocletian abdicated on May 1, 305 CE, living in his seaside Split residence until his death in 311 CE."
      },
      {
        q: "What central peristyle colonnaded Roman courtyard in Diocletian Palace, flanked by red granite Egyptian sphinxes from the era of Pharaoh Thutmose III, serves as the city public square?",
        correct: "The Peristyle Peristil",
        w1: "The Cardo",
        w2: "The Decumanus",
        exp: "The Emperor appeared to the public at the Prothyron balcony above the Peristyle, today a vibrant open-air venue with acoustic acoustic performances."
      },
      {
        q: "What octagonal 4th-century imperial mausoleum of Emperor Diocletian was consecrated in the 7th century, making it the oldest Catholic cathedral in the world in its original structure?",
        correct: "Cathedral of Saint Domnius Katedrala sv. Dujma",
        w1: "St. Mark Cathedral",
        w2: "St. James Cathedral",
        exp: "Paradoxically dedicated to Saint Domnius (a Christian bishop martyred by Diocletian), it features 13th-century carved walnut doors by Andrija Buvina and a 57-meter Romanesque bell tower."
      },
      {
        q: "What colossal 8.5-meter bronze statue by sculptor Ivan Meštrović outside the Golden Gate of Split is famous for visitors rubbing its shiny big toe for good luck?",
        correct: "Gregory of Nin Grgur Ninski",
        w1: "King Tomislav",
        w2: "Marko Marulić",
        exp: "Bishop Gregory of Nin famously advocated in 926 CE for conducting church services in the Old Church Slavonic language and Glagolitic script rather than Latin."
      }
    ],
    number: {
      q: "In what year CE did Roman Emperor Diocletian complete his colossal retirement palace in Split, Croatia?",
      target: 305,
      unit: "CE",
      imperial: "305 AD",
      exp: "Diocletian's Palace was completed around 305 CE when Diocletian abdicated the throne."
    }
  },

  // Cycle 4: Dalmatian Islands: Hvar, Brač & Korčula
  {
    mcqs: [
      {
        q: "What famous island in central Dalmatia holds the record as the sunniest island in Europe, averaging over 2,700 hours of Mediterranean sunshine annually, renowned for purple lavender fields?",
        correct: "Hvar",
        w1: "Brač",
        w2: "Korčula",
        exp: "Hvar Town features the oldest municipal public theater in Europe (founded in 1612), the 16th-century Spanish Fortress (Fortica), and a Venetian harbor."
      },
      {
        q: "What world-famous 500-meter white pebble beach on the island of Brač near Bol extends like a narrow tongue into the Adriatic, shifting its tip with changing ocean currents and wind?",
        correct: "Zlatni Rat Golden Horn",
        w1: "Stiniva Beach",
        w2: "Sakarun Beach",
        exp: "Framed by green pine groves beneath the 778-meter Vidova Gora (the highest peak of the Adriatic islands), Zlatni Rat is a protected geomorphological monument."
      },
      {
        q: "Which fortified island town in southern Dalmatia, famous for narrow herringbone-pattern stone alleys and Moreška sword dances, is celebrated as the traditional birthplace of explorer Marco Polo?",
        correct: "Korčula",
        w1: "Hvar",
        w2: "Mljet",
        exp: "Local tradition holds that Marco Polo was born in Korčula in 1254 (then under Venetian rule), captured here by the Genoese in the 1298 Battle of Curzola."
      },
      {
        q: "What famous sea cave on the tiny island of Biševo near Vis is world-renowned for glowing with an ethereal aquamarine-blue light as midday sunlight passes through a submerged underwater arch?",
        correct: "The Blue Cave Modra špilja",
        w1: "The Green Cave",
        w2: "Odysseus Cave",
        exp: "Discovered to the world by Baron Eugen von Ransonnet in 1884, small rowboats enter through a natural crack to view illuminated underwater white limestone."
      },
      {
        q: "What lush, green island in southern Dalmatia is a National Park featuring two saltwater glacial lakes (Veliko and Malo Jezero) and a 12th-century Benedictine monastery on Saint Mary Island?",
        correct: "Mljet Melita",
        w1: "Lastovo",
        w2: "Šolta",
        exp: "Legend associates Mljet with Ogygia, the mythical island where the nymph Calypso held Odysseus captive for seven years in Homer Odyssey."
      }
    ],
    number: {
      q: "Approximately how many hours of sunshine does the Dalmatian island of Hvar receive per year, making it the sunniest island in Europe?",
      target: 2700,
      unit: "sunshine hours",
      imperial: "2,700+ annual sunshine hours",
      exp: "Hvar averages approximately 2,724 hours of sunshine per year (over 7.5 hours of pure sunshine daily)."
    }
  },

  // Cycle 5: Zadar, The Sea Organ & Roman Forums
  {
    mcqs: [
      {
        q: "What ingenious architectural sound art installation on the marble waterfront of Zadar, created by architect Nikola Bašić in 2005, plays hypnotic musical chords powered entirely by ocean waves?",
        correct: "The Sea Organ Morske orgulje",
        w1: "Monument to the Sun",
        w2: "The Wave Pavilion",
        exp: "Thirty-five organ pipes embedded in white stone stairs connect to underwater plastic tubes; crashing waves push air through the pipes, creating spontaneous polyphonic music."
      },
      {
        q: "How many tuned musical organ pipes of varying lengths and diameters are installed underneath the marble stairs of the Zadar Sea Organ?",
        correct: "35 Organ Pipes",
        w1: "12 Pipes",
        w2: "50 Pipes",
        exp: "Arranged in seven distinct five-pipe musical chords, the pipes are tuned to two traditional Dalmatian klapa music harmonic scales."
      },
      {
        q: "What adjacent solar art monument in Zadar consists of a 22-meter glass circle of three hundred multi-layered solar plates that stores daylight solar energy to produce animated light shows at dusk?",
        correct: "Greeting to the Sun Monument to the Sun (Pozdrav suncu)",
        w1: "The Sea Organ",
        w2: "Solar Disc",
        exp: "Symbolizing the planets of the solar system, film director Alfred Hitchcock famously declared in 1964: 'Zadar has the most beautiful sunset in the world.'"
      },
      {
        q: "What monumental 9th-century circular pre-Romanesque rotunda church in Zadar, built on the pavement of the ancient Roman Forum, is the largest pre-Romanesque building in Croatia?",
        correct: "Church of St. Donatus Crkva sv. Donata",
        w1: "Cathedral of St. Anastasia",
        w2: "St. Chrysogonus Church",
        exp: "Standing twenty-seven meters tall, the rotunda was constructed using salvaged Roman marble columns, capitals, and inscribed sacrificial altars."
      },
      {
        q: "What clear, bittersweet cherry liqueur, produced in Zadar since 1821 from distilled native sour Marasca cherries, was a favorite drink of European royal courts and Napoleon Bonaparte?",
        correct: "Maraschino Maraskino",
        w1: "Pelinkovac",
        w2: "Travarica",
        exp: "Originally distilled by 16th-century Dominican monks, authentic Maraschino is wrapped in hand-woven straw basket casings."
      }
    ],
    number: {
      q: "How many individual tuned musical organ pipes make up the subterranean acoustic system of the Zadar Sea Organ in Croatia?",
      target: 35,
      unit: "pipes",
      imperial: "35 tuned organ pipes",
      exp: "The Sea Organ utilizes thirty-five separate organ pipes divided into seven five-pipe chords playing continuous maritime music."
    }
  },

  // Cycle 6: Pula Arena & The Istrian Peninsula
  {
    mcqs: [
      {
        q: "What exceptionally preserved 1st-century Roman amphitheater in the coastal city of Pula is the only remaining Roman amphitheater in the world with all four side towers completely intact?",
        correct: "Pula Arena Pulska Arena",
        w1: "Verona Arena",
        w2: "Colosseum of Rome",
        exp: "Constructed from local white limestone under Emperor Vespasian between 27 BCE and 68 CE, the Arena seated 23,000 gladiatorial spectators, today hosting the Pula Film Festival."
      },
      {
        q: "In which century CE was the monumental outer stone ring of the Pula Arena completed during the Flavian Dynasty?",
        correct: "1st Century CE",
        w1: "3rd Century CE",
        w2: "2nd Century BCE",
        exp: "The amphitheater was completed during the 1st century CE under Emperor Titus and Emperor Domitian."
      },
      {
        q: "What heart-shaped peninsula in northwestern Croatia, shared with Slovenia and Italy, is internationally celebrated as the Gourmet Capital of Croatia for white truffles, olive oil, and Malvazija wine?",
        correct: "Istria Istra",
        w1: "Pelješac Peninsula",
        w2: "Konavle",
        exp: "Istria features medieval hilltop stone villages like Motovun and Grožnjan, and dense oak forests along the Mirna River where trained dogs unearth valuable white truffles (Tuber magnatum)."
      },
      {
        q: "Which picturesque fishing port on the west coast of Istria, crowned by the 60-meter bell tower of St. Euphemia church, was an important Venetian trading outpost for five centuries?",
        correct: "Rovinj Rovigno",
        w1: "Poreč",
        w2: "Umag",
        exp: "Originally an offshore island before its narrow channel was filled in 1763, Rovinj features pastel Venetian-Gothic townhouses and traditional batana wooden fishing boats."
      },
      {
        q: "What 6th-century UNESCO World Heritage Byzantine basilica complex in Poreč is celebrated worldwide for glittering gold mosaics depicting Christ, the Apostles, and Bishop Euphrasius?",
        correct: "Euphrasian Basilica Eufrazijeva bazilika",
        w1: "St. Euphemia Basilica",
        w2: "St. Donatus",
        exp: "The basilica is one of the purest surviving masterpieces of early Byzantine art in the Mediterranean, featuring mother-of-pearl, marble inlays, and a 6th-century ciborium altar canopy."
      }
    ],
    number: {
      q: "In which century CE was the construction of the monumental Roman amphitheater (Pula Arena) completed in Pula, Croatia?",
      target: 1,
      unit: "century CE",
      imperial: "1st Century AD (Flavian Dynasty)",
      exp: "Pula Arena was constructed during the 1st century CE, standing today as one of the six largest surviving Roman arenas."
    }
  },

  // Cycle 7: Krka Waterfalls & Dalmatian Traditions
  {
    mcqs: [
      {
        q: "What stunning national park in central Dalmatia encompasses a 73-kilometer river canyon featuring seven travertine waterfall cascades, including the 400-meter Skradinski Buk?",
        correct: "Krka National Park Nacionalni park Krka",
        w1: "Plitvice Lakes",
        w2: "Paklenica",
        exp: "Skradinski Buk features seventeen cascading steps of travertine limestone where the world second oldest alternating-current hydroelectric plant (Jaruga Power Plant) opened in 1895."
      },
      {
        q: "What picturesque island in the middle of Visovac Lake along the Krka River has hosted a Franciscan monastery and church surrounded by tall cypress trees since 1445?",
        correct: "Visovac Island",
        w1: "Košljun Island",
        w2: "Gospa od Škrpjela",
        exp: "The monastery library holds rare incunabula, an illustrated 15th-century copy of Aesop Fables, and a sword belonging to legendary hero Vuk Mandušić."
      },
      {
        q: "What famous spotted, medium-sized dog breed with an athletic build and white coat dotted with black or liver spots originated in the historic coastal region of Dalmatia?",
        correct: "The Dalmatian Dog Dalmatinac",
        w1: "The Posavac Hound",
        w2: "The Tornjak",
        exp: "First depicted in 16th-century church paintings in Zaostrog, Dalmatians were historically used as carriage dogs, guard dogs, and maritime companions."
      },
      {
        q: "What UNESCO-inscribed traditional Dalmatian multipart a cappella singing tradition features small groups of tenors and basses performing harmonious acoustic love and sea songs?",
        correct: "Klapa Singing",
        w1: "Ojkanje",
        w2: "Bećarac",
        exp: "Klapa (meaning 'group of friends') singing is celebrated at the annual Festival of Dalmatian Klapas in Omiš, sung without instrumental accompaniment in stone courtyards."
      },
      {
        q: "What traditional equestrian knight tournament, held annually in the town of Sinj since 1715, sees galloping horsemen attempt to spear a small suspended metal ring (alka) with their lances?",
        correct: "The Sinjska Alka",
        w1: "Moreška",
        w2: "Kumpanija",
        exp: "Inscribed on the UNESCO Intangible Cultural Heritage list, the tournament commemorates the miraculous 1715 victory of 700 local defenders over 60,000 Ottoman besiegers."
      }
    ],
    number: {
      q: "In what year was the historic Sinjska Alka equestrian knight tournament first established in Sinj to commemorate victory over Ottoman forces?",
      target: 1715,
      unit: "year",
      imperial: "1715 AD (over 300-year unbroken tradition)",
      exp: "The Sinjska Alka has been held annually in Sinj every August since 1715."
    }
  },

  // Cycle 8: Zagreb & Continental Croatia
  {
    mcqs: [
      {
        q: "What is the capital and largest city of Croatia, situated along the Sava River at the southern slopes of Mount Medvednica?",
        correct: "Zagreb",
        w1: "Split",
        w2: "Rijeka",
        exp: "Zagreb is divided into the medieval Upper Town (Gornji Grad - Gradec and Kaptol) and the 19th-century Austro-Hungarian Lower Town (Donji Grad)."
      },
      {
        q: "What famous 13th-century parish church on St. Mark Square in Upper Town Zagreb is celebrated for its colorful glazed roof tiles depicting the historical coats of arms of Croatia, Dalmatia, Slavonia, and Zagreb?",
        correct: "St. Mark Church Crkva sv. Marka",
        w1: "Zagreb Cathedral",
        w2: "St. Catherine Church",
        exp: "Built in 1880 by Friedrich von Schmidt and Herman Bollé, the vibrant tiled roof sits between the Croatian Parliament (Sabor) and the Prime Minister office (Banski Dvori)."
      },
      {
        q: "What cannon inside the 13th-century Lotrščak Tower in Zagreb has been fired punctually every single day at exactly 12:00 noon since January 1, 1877, to synchronize church bells?",
        correct: "The Grič Cannon Grički top",
        w1: "The Ban Jelačić Cannon",
        w2: "The Gradec Cannon",
        exp: "The daily noon blast echoes across both the Upper and Lower towns, where tourists gather outside the tower to watch the smoke puff from the fourth-floor window."
      },
      {
        q: "What 66-meter historic funicular railway in Zagreb, operating since 1890, connects the Lower Town (Ilica street) to the Upper Town in just sixty-four seconds, the shortest public transport funicular in the world?",
        correct: "The Zagreb Funicular Zagrebačka uspinjača",
        w1: "The Budavári Sikló",
        w2: "The Fløibanen",
        exp: "Known affectionately as the 'Old Lady of Zagreb', the twin blue passenger cars retain their original 19th-century exterior appearance and track gauge."
      },
      {
        q: "What quirky, internationally acclaimed museum in Upper Town Zagreb displays crowdsourced personal memorabilia, mementos, and heartfelt emotional stories left behind from failed romantic relationships?",
        correct: "Museum of Broken Relationships Muzej prekinutih veza",
        w1: "Museum of Illusions",
        w2: "Mimara Museum",
        exp: "Founded in 2010 by Olinka Vištica and Dražen Grubišić, the museum won the Kenneth Hudson European Museum of the Year Award."
      }
    ],
    number: {
      q: "In what year did the daily noon firing of the Grič Cannon (Grički top) from the Lotrščak Tower begin in Zagreb, Croatia?",
      target: 1877,
      unit: "year",
      imperial: "1877 AD",
      exp: "The Grič Cannon was first fired on New Year's Day, January 1, 1877."
    }
  },

  // Cycle 9: Inventions, The Necktie & Nikola Tesla
  {
    mcqs: [
      {
        q: "What universal formal menswear fashion accessory originated in the 17th century when Croatian mercenary horsemen in French service wore distinctive knotted silk neck scarves (cravates)?",
        correct: "The Necktie Cravat (La Cravate)",
        w1: "The Bow Tie",
        w2: "The Ascot",
        exp: "King Louis XIV was so enamored with the stylish Croatian neckerchiefs that he created a royal regiment of Royal-Cravates, making the necktie a global fashion staple."
      },
      {
        q: "Which revolutionary electrical engineer, inventor of alternating current (AC) electricity and the induction motor, was born in the village of Smiljan in the Lika region of Croatia in 1856?",
        correct: "Nikola Tesla",
        w1: "Slavoljub Penkala",
        w2: "Faust Vrančić",
        exp: "Tesla birthplace and his father Serbian Orthodox church are preserved at the Nikola Tesla Memorial Centre in Smiljan."
      },
      {
        q: "Which 16th-century Renaissance polymath from Šibenik, known as the Croatian Leonardo da Vinci, designed and tested the world first functional parachute (Homo Volans) in 1617?",
        correct: "Faust Vrančić Fausto Veranzio",
        w1: "Ruđer Bošković",
        w2: "Marin Getaldić",
        exp: "In his landmark 1615 engineering book Machinae Novae, Vrančić illustrated the parachute, suspension bridges, and advanced tide-mills."
      },
      {
        q: "What traditional Croatian method of slow-cooking lamb, octopus, veal, and potatoes involves baking under a heavy domed bell-shaped iron or clay lid (peka) covered in glowing hot wood embers?",
        correct: "Ispod črike Peka Under the Bell",
        w1: "Gulaš",
        w2: "Brodet",
        exp: "Cooking under the peka seals in natural juices and aromas, creating tender meat and caramelized potatoes infused with rosemary and white wine."
      },
      {
        q: "What hard, distinctively salty sheep milk cheese from the arid, windswept island of Pag is aged for months, rubbed in olive oil and ash, and recognized as one of the world finest cheeses?",
        correct: "Paški sir Pag Cheese",
        w1: "Škripavac",
        w2: "Turoš",
        exp: "Strong Bura winter winds spray seawater across the island, dusting wild sage and thyme grasses with sea salt that imparts a unique herbal flavor to the sheep milk."
      }
    ],
    number: {
      q: "In what year was the visionary electrical engineer and inventor Nikola Tesla born in the village of Smiljan in Croatia?",
      target: 1856,
      unit: "year",
      imperial: "1856 AD",
      exp: "Nikola Tesla was born during a midnight lightning storm on July 10, 1856, in Smiljan."
    }
  },

  // Cycle 10: Extent, 20 Counties & Croatian Superlatives
  {
    mcqs: [
      {
        q: "What is the total combined coastline length in kilometers of the Republic of Croatia, including its mainland coast (1,777 km) and its 1,244 islands, islets, and reefs (4,058 km)?",
        correct: "5,835 Kilometers",
        w1: "2,500 Kilometers",
        w2: "8,000 Kilometers",
        exp: "Croatia possesses the most indented and island-rich coastline on the Mediterranean Sea after Greece, forming an extraordinary nautical sailing destination."
      },
      {
        q: "Into how many first-level administrative counties (Županije), plus the City of Zagreb with dual county status, is the Republic of Croatia politically organized?",
        correct: "20 Counties and the City of Zagreb",
        w1: "15 Counties",
        w2: "25 Counties",
        exp: "The twenty counties (such as Split-Dalmatia, Dubrovnik-Neretva, Istria, Primorje-Gorski Kotar, and Zadar) are headed by elected county prefects (Župans)."
      },
      {
        q: "What is the highest mountain peak in the Republic of Croatia, rising 1,831 meters on the Dinara mountain massif along the border with Bosnia and Herzegovina?",
        correct: "Sinjal Dinara Peak",
        w1: "Sveti Jure",
        w2: "Vaganski Vrh",
        exp: "The Dinaric Alps (Dinarides) give their name to the entire limestone karst mountain chain spanning the Western Balkans."
      },
      {
        q: "What massive 2.4-kilometer multi-span cable-stayed bridge, opened in July 2022, connects the southern exclave of Dubrovnik directly to the mainland of Croatia, bypassing the border crossing through Bosnia and Herzegovina?",
        correct: "The Pelješac Bridge Pelješki most",
        w1: "Krk Bridge",
        w2: "Franjo Tuđman Bridge",
        exp: "Spanning the Mali Ston Bay to the Pelješac Peninsula, the bridge united Croatian sovereign territory without requiring motorists to cross through the Neum Corridor."
      },
      {
        q: "What historic milestone was achieved by the Republic of Croatia on January 1, 2023, fully integrating the nation into the core European economic framework?",
        correct: "Simultaneously adopted the Euro currency and joined the borderless Schengen Area",
        w1: "Joined the European Union",
        w2: "Adopted the Kuna",
        exp: "Croatia became the 20th member of the Eurozone and 27th member of the border-free Schengen Area on the same day."
      }
    ],
    number: {
      q: "How many total islands, islets, and rocky reefs make up the archipelago along the Adriatic coastline of Croatia?",
      target: 1244,
      unit: "islands and reefs",
      imperial: "1,244 Adriatic islands (48 permanently inhabited)",
      exp: "Croatia's coastal territory encompasses exactly 1,244 natural islands, islets, and reefs, of which forty-eight are permanently inhabited."
    }
  }
];

// Build Croatia Quiz
buildQuiz({
  id: 'croatia-geography-heritage-60',
  theme: 'Croatia: Geography, Plitvice Cascades & The Dalmatian Coast',
  title: 'Croatia: Geography, Plitvice Cascades & The Dalmatian Coast',
  description: 'A 60-question grand master assessment exploring Plitvice Lakes (78 m Veliki Slap), Dubrovnik city walls (1,940 m), Diocletian Palace in Split (305 CE), Hvar sunshine (2,700 hrs), Zadar Sea Organ (35 pipes), Pula Arena (1st c.), Sinjska Alka (1715), and Nikola Tesla (1856).',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, croatiaCycles);

console.log('Croatia quiz built successfully!');
