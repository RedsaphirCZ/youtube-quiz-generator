const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 3. iceland-geography-heritage-60
// =========================================================================
const icelandCycles = [
  // Cycle 1: The Mid-Atlantic Ridge & Volcanoes
  {
    mcqs: [
      {
        q: "What underwater tectonic plate boundary is uniquely exposed above sea level across the volcanic landscapes of Iceland?",
        correct: "The Mid-Atlantic Ridge",
        w1: "The Pacific Ring of Fire",
        w2: "The East African Rift",
        exp: "The North American and Eurasian tectonic plates diverge at roughly two centimeters per year, creating Iceland geothermal activity and rift valleys."
      },
      {
        q: "Which subglacial volcano in southern Iceland famously erupted in April 2010, ejecting an immense volcanic ash plume that grounded over 100,000 European flights?",
        correct: "Eyjafjallajökull",
        w1: "Katla",
        w2: "Grimsvötn",
        exp: "Meltwater from the summit glacier rapidly cooled volcanic glass particles, creating fine, abrasive abrasive ash clouds that posed severe risks to jet aircraft engines."
      },
      {
        q: "Which highly active stratovolcano in southern Iceland was feared throughout the Middle Ages as the literal Gateway to Hell and Prison of Judas?",
        correct: "Mount Hekla",
        w1: "Askja",
        w2: "Krafla",
        exp: "Hekla has erupted over twenty times since 1104 CE, capable of producing both explosive rhyolitic ash and basaltic lava flows."
      },
      {
        q: "Which volcanic system on the Reykjanes Peninsula erupted in March 2021 at Geldingadalir, marking the first volcanic eruption on the peninsula in over 800 years?",
        correct: "Fagradalsfjall",
        w1: "Sundhnukagigar",
        w2: "Svartsengi",
        exp: "The effusive basaltic eruption created spectacular lava fountains and rivers easily accessible to researchers and tourists near Grindavík."
      },
      {
        q: "What massive 25-kilometer volcanic fissure in 1783 erupted fourteen cubic kilometers of basalt lava, releasing toxic fluorine and sulfur gases that caused global famine?",
        correct: "Laki Lakagígar",
        w1: "Eldgjá",
        w2: "Bárðarbunga",
        exp: "The Laki eruption killed eighty percent of Iceland livestock, resulting in a famine (Móðuharðindin) that killed one-fourth of the island human population."
      }
    ],
    number: {
      q: "In what year did the subglacial eruption of Eyjafjallajökull disrupt global air travel across Europe?",
      target: 2010,
      unit: "year",
      imperial: "2010 AD",
      exp: "Eyjafjallajökull erupted explosively on April 14, 2010, causing the largest peacetime shutdown of European airspace in aviation history."
    }
  },

  // Cycle 2: Glaciers & Ice Caps
  {
    mcqs: [
      {
        q: "What is the largest ice cap in Iceland and the largest glacier by volume in Europe, covering 7,900 square kilometers?",
        correct: "Vatnajökull",
        w1: "Langjökull",
        w2: "Hofsjökull",
        exp: "Vatnajökull covers roughly eight percent of Iceland total landmass with an average ice thickness of 400 meters, concealing active subglacial volcanoes like Grímsvötn."
      },
      {
        q: "What world-famous glacial lagoon at the edge of Vatnajökull is filled with luminous blue icebergs that calve into the water and drift out to sea?",
        correct: "Jökulsárlón",
        w1: "Fjallsárlón",
        w2: "Hvítárvatn",
        exp: "Jökulsárlón is the deepest lake in Iceland (248 meters deep), featured in James Bond films A View to a Kill and Die Another Day."
      },
      {
        q: "What famous black volcanic sand beach opposite Jökulsárlón is littered with glittering translucent chunks of glacial ice washed ashore by Atlantic waves?",
        correct: "Diamond Beach Breiðamerkursandur",
        w1: "Reynisfjara",
        w2: "Djúpalónssandur",
        exp: "Polished smooth by ocean surf, ancient glacial ice blocks sparkling on jet-black basalt sand resemble colossal cut diamonds."
      },
      {
        q: "What is the highest mountain peak in Iceland, rising 2,110 meters on the southern edge of the Vatnajökull glacier in Öræfajökull?",
        correct: "Hvannadalshnúkur",
        w1: "Bárðarbunga",
        w2: "Kverkfjöll",
        exp: "Hvannadalshnúkur is a glaciated volcanic pyramid peak situated on the crater rim of the massive Öræfajökull stratovolcano."
      },
      {
        q: "Which easily accessible outlet glacier of Mýrdalsjökull near Vík is popular for guided glacier hikes and exploring blue subglacial ice caves?",
        correct: "Sólheimajökull",
        w1: "Falljökull",
        w2: "Svínafellsjökull",
        exp: "Sólheimajökull displays striking contrasting layers of white ice and black volcanic ash (tephra) from historic eruptions of the nearby Katla volcano."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Hvannadalshnúkur, the highest mountain peak in Iceland?",
      target: 2110,
      unit: "meters",
      imperial: "6,923 feet",
      exp: "Hvannadalshnúkur stands at an official elevation of 2,110 meters above sea level on the Vatnajökull ice cap."
    }
  },

  // Cycle 3: The Golden Circle & Geothermal Wonders
  {
    mcqs: [
      {
        q: "What famous 300-kilometer tourist sightseeing circuit in southwestern Iceland loops between Thingvellir, Gullfoss waterfall, and the Haukadalur geysers?",
        correct: "The Golden Circle Gullni hringurinn",
        w1: "The Diamond Circle",
        w2: "The Ring Road",
        exp: "The Golden Circle is Iceland most popular day-trip excursion route, starting and ending in the capital city of Reykjavík."
      },
      {
        q: "What iconic tiered waterfall on the Hvítá River plunges thirty-two meters into a rugged canyon in two dramatic angled cascades, known as the Golden Falls?",
        correct: "Gullfoss",
        w1: "Godafoss",
        w2: "Dettifoss",
        exp: "Saved from hydroelectric dam development in the early 20th century by pioneer conservationist Sigríður Tómasdóttir, Gullfoss is a national protected monument."
      },
      {
        q: "Which active geyser in the Haukadalur geothermal area erupts reliably every six to ten minutes, shooting boiling water up to thirty meters into the air?",
        correct: "Strokkur",
        w1: "The Great Geysir",
        w2: "Litli Geysir",
        exp: "While the eponymous Great Geysir is mostly dormant today, neighboring Strokkur (The Churn) provides thrilling eruptions for spectators."
      },
      {
        q: "From which Icelandic word for an erupting hot spring, derived from the Old Norse verb geysa (to gush), do all global geysers get their name?",
        correct: "Geysir",
        w1: "Fumarole",
        w2: "Solfatara",
        exp: "The Great Geysir in Haukadalur was the first erupting hot spring described in European printed literature, giving the English language the word geyser."
      },
      {
        q: "What 3,000-year-old volcanic explosion crater along the Golden Circle contains a vivid aquamarine mineral lake framed by red volcanic scoria rock?",
        correct: "Kerið Crater",
        w1: "Viti Crater",
        w2: "Hverfjall",
        exp: "Kerið caldera is roughly fifty-five meters deep, boasting exceptional acoustic resonance that has hosted concerts performed on floating lake rafts."
      }
    ],
    number: {
      q: "Approximately how many minutes elapse on average between natural boiling water eruptions of the Strokkur geyser in Iceland?",
      target: 8,
      unit: "minutes",
      imperial: "6 to 10 minutes (average 8 min)",
      exp: "Strokkur erupts consistently every 6 to 10 minutes (averaging approximately 8 minutes), propelled by subterranean steam trapped in its conduit."
    }
  },

  // Cycle 4: Thingvellir & The World's Oldest Parliament
  {
    mcqs: [
      {
        q: "In what year CE was the national parliament of Iceland (the Althing / Alþingi) established at Thingvellir, making it the oldest continuous parliament on Earth?",
        correct: "930 CE",
        w1: "1000 CE",
        w2: "1262 CE",
        exp: "Viking chieftains convened annually at the Law Rock (Lögberg) to recite the legal code, resolve blood feuds, and pass national legislation."
      },
      {
        q: "What geological feature makes Thingvellir (Þingvellir) National Park unique, allowing visitors to walk directly inside the tectonic chasm of the Mid-Atlantic Ridge?",
        correct: "Almannagjá Rift Canyon",
        w1: "Eldgjá Canyon",
        w2: "Jökulsárgljúfur",
        exp: "Almannagjá is a massive tectonic fault fissure where the North American plate wall towers over the sinking graben valley floor."
      },
      {
        q: "What crystal-clear freshwater fissure in Thingvellir National Park allows scuba divers and snorkelers to swim with 100-meter visibility directly between continental plates?",
        correct: "Silfra Fissure",
        w1: "Davíðsgjá",
        w2: "Nesgjá",
        exp: "Glacial meltwater from Langjökull is filtered through underground porous basalt lava rock for fifty years, emerging into Silfra at 2°C with absolute optical purity."
      },
      {
        q: "In what historic year did the Althing assembly at Thingvellir peacefully vote to adopt Christianity as the official national religion of Iceland under lawspeaker Thorgeir Thorkelsson?",
        correct: "1000 CE",
        w1: "930 CE",
        w2: "1066 CE",
        exp: "Following a day and night contemplating beneath a fur cloak, Thorgeir threw his pagan Norse idol statues into Godafoss (Waterfall of the Gods) to seal the decision."
      },
      {
        q: "What is the largest natural lake in Iceland, covering eighty-four square kilometers immediately south of Thingvellir National Park?",
        correct: "Lake Thingvallavatn Þingvallavatn",
        w1: "Lake Mývatn",
        w2: "Lake Lagarfljót",
        exp: "Thingvallavatn is home to four distinct endemic morphs of Arctic char that evolved specialized feeding niches within the same lake over the last 10,000 years."
      }
    ],
    number: {
      q: "In what year CE was the historic Althing (Alþingi) parliamentary assembly founded at Thingvellir in Iceland?",
      target: 930,
      unit: "CE",
      imperial: "930 AD",
      exp: "The Althing was established in 930 CE, operating as an open-air commonwealth assembly for centuries before moving to modern Reykjavík."
    }
  },

  // Cycle 5: Waterfalls & Black Sand Beaches
  {
    mcqs: [
      {
        q: "What monstrous waterfall in Vatnajökull National Park in northeast Iceland is recognized as the most powerful waterfall in Europe by water discharge volume?",
        correct: "Dettifoss",
        w1: "Gullfoss",
        w2: "Skógafoss",
        exp: "Fed by the Jökulsá á Fjöllum glacial river, Dettifoss plunges forty-four meters across a 100-meter-wide basalt brink at an average flow of 200 cubic meters per second."
      },
      {
        q: "Which 60-meter waterfall along the southern Ring Road is famous because visitors can walk entirely behind the thundering water veil into a natural cave?",
        correct: "Seljalandsfoss",
        w1: "Skógafoss",
        w2: "Kvernufoss",
        exp: "Originating from the Eyjafjallajökull glacier, Seljalandsfoss cascades over former sea cliffs that marked the coastline during the last Ice Age."
      },
      {
        q: "What monumental 60-meter-tall and 25-meter-wide waterfall in southern Iceland frequently produces brilliant single and double rainbows in its mist?",
        correct: "Skógafoss",
        w1: "Dynjandi",
        w2: "Hengifoss",
        exp: "Legend holds that the first Viking settler in Skógar, Þrasi Þórólfsson, buried an enchanted treasure chest behind the roaring water curtain."
      },
      {
        q: "What world-famous black basalt sand beach near Vík í Mýrdal features dramatic hexagonal basalt column cliffs and the Reynisdrangar offshore sea stacks?",
        correct: "Reynisfjara Beach",
        w1: "Diamond Beach",
        w2: "Rauðasandur",
        exp: "Reynisfjara is renowned for the Hálsanefshellir basalt column cave and dangerous, sudden sneaker waves that surge far up the steep pebble shoreline."
      },
      {
        q: "What picturesque semicircular waterfall in northern Iceland, meaning Waterfall of the Gods, is where pagan idols were cast into the waters around 1000 CE?",
        correct: "Goðafoss",
        w1: "Aldeyjarfoss",
        w2: "Hrafnabjargafoss",
        exp: "Located along the Skjálfandafljót river, Goðafoss drops twelve meters along a 30-meter curving horseshoe crest of dark basalt."
      }
    ],
    number: {
      q: "What is the total drop height in meters of the iconic Skógafoss waterfall in southern Iceland?",
      target: 60,
      unit: "meters",
      imperial: "197 feet drop",
      exp: "Skógafoss drops a sheer sixty meters over former coastal sea cliffs, with a staircase leading to an upper viewing platform."
    }
  },

  // Cycle 6: Geothermal Energy & The Blue Lagoon
  {
    mcqs: [
      {
        q: "What world-famous geothermal mineral spa in the Reykjanes lava fields near Grindavík features 38°C milky-blue mineral waters rich in silica and sulfur?",
        correct: "The Blue Lagoon Bláa Lónið",
        w1: "Sky Lagoon",
        w2: "Myvatn Nature Baths",
        exp: "Formed as byproduct water from the neighboring Svartsengi geothermal power plant, the silica-rich water is renowned for treating psoriasis and skin conditions."
      },
      {
        q: "What percentage of domestic home space heating in Iceland is supplied directly by clean, natural geothermal district heating systems?",
        correct: "Over 85 Percent",
        w1: "40 Percent",
        w2: "60 Percent",
        exp: "Pioneered in the 1930s in Reykjavík, geothermal pipelines heat roughly nine out of ten homes in Iceland, eliminating fossil fuel dependence for heating."
      },
      {
        q: "What innovative climate engineering technology developed by Carbfix at the Hellisheiði geothermal plant dissolves captured carbon dioxide in water and injects it into basalt rock, turning it into stone within two years?",
        correct: "Mineral Carbonation Carbfix",
        w1: "Direct Ocean Sequestration",
        w2: "Biochar Pyrolysis",
        exp: "CO2 reacts chemically with basaltic calcium, magnesium, and iron to form solid white carbonate minerals (calcite) permanently underground."
      },
      {
        q: "Which agricultural greenhouse center in Hveragerði and Friðheimar uses geothermal heating and artificial grow lights to cultivate year-round fresh tomatoes in subarctic winters?",
        correct: "Geothermal Greenhouses",
        w1: "Hydroponic Caves",
        w2: "Thermal Domes",
        exp: "Friðheimar produces over one ton of vine-ripened tomatoes per day, heated by natural borehole steam and pollinated by imported Dutch bumblebees."
      },
      {
        q: "What percentage of Iceland total electricity production is generated entirely from renewable energy sources (hydropower and geothermal)?",
        correct: "100 Percent Renewable Electricity",
        w1: "75 Percent",
        w2: "50 Percent",
        exp: "Iceland generates seventy-three percent of its electricity from mountain hydropower dams and twenty-seven percent from geothermal power stations."
      }
    ],
    number: {
      q: "What percentage of residential space heating across all homes in Iceland is powered directly by geothermal district water systems?",
      target: 85,
      unit: "percent",
      imperial: "85%+ of domestic heating",
      exp: "More than 85 percent (roughly 90% today) of all domestic home heating in Iceland is supplied by clean geothermal hot water networks."
    }
  },

  // Cycle 7: Reykjavík, Culture & The Icelandic Horse
  {
    mcqs: [
      {
        q: "What is the national capital of Iceland, holding the distinction of being the northernmost capital city of a sovereign nation in the world at 64 degrees North latitude?",
        correct: "Reykjavík",
        w1: "Akureyri",
        w2: "Keflavík",
        exp: "Reykjavík (Smoky Bay) was named by its first permanent Norse settler, Ingólfr Arnarson, in 874 CE after the rising steam of coastal geothermal hot springs."
      },
      {
        q: "What iconic 74.5-meter Lutheran church in Reykjavík, designed by Guðjón Samúelsson, features an expressionist facade inspired by natural hexagonal basalt lava columns?",
        correct: "Hallgrímskirkja",
        w1: "Fríkirkjan",
        w2: "Landakotskirkja",
        exp: "Completed in 1986, the church is fronted by a bronze statue of Norse explorer Leif Erikson, gifted by the United States in 1930."
      },
      {
        q: "How many distinct gaits does the purebred Icelandic Horse possess, including the unique smooth four-beat lateral gait known as the tölt?",
        correct: "5 Gaits",
        w1: "3 Gaits",
        w2: "4 Gaits",
        exp: "Along with walk, trot, and canter, the Icelandic horse performs the tölt (smooth amble where rider remains stationary) and the high-speed flying pace (skeið)."
      },
      {
        q: "To protect the pure genetic lineage and prevent foreign equine diseases, what strict law regarding horses has been enforced in Iceland since 982 CE?",
        correct: "No horse that leaves Iceland can ever return",
        w1: "Horses cannot be ridden on Sundays",
        w2: "All horses must be chestnut colored",
        exp: "Importing any horses from abroad is strictly prohibited, ensuring the Icelandic horse remains a pure Viking breed isolated for over a millennium."
      },
      {
        q: "What striking modern glass concert hall and conference center on the Reykjavík harbor, designed with artist Ólafur Elíasson, features a geometric basalt-inspired glass honeycomb facade?",
        correct: "Harpa Concert Hall",
        w1: "Perlan",
        w2: "Höfði House",
        exp: "Harpa won the 2013 Mies van der Rohe Award, illuminated at night with dynamic LED color displays reflecting off the Atlantic harbor."
      }
    ],
    number: {
      q: "How many natural gaits can the purebred Icelandic horse perform (walk, trot, canter, tölt, and flying pace)?",
      target: 5,
      unit: "gaits",
      imperial: "5 distinct gaits",
      exp: "The Icelandic horse is a five-gaited breed (fimmganga), unique in the equine world for its natural ability to perform the tölt and flying pace."
    }
  },

  // Cycle 8: The Ring Road & Remote Westfjords
  {
    mcqs: [
      {
        q: "What is the total length of Route 1 (The Ring Road / Hringvegurinn), the primary national highway encircling the entire island of Iceland?",
        correct: "1,322 Kilometers",
        w1: "850 Kilometers",
        w2: "2,100 Kilometers",
        exp: "Completed in 1974 with the opening of the long bridge across the Skeiðarársandur glacial outwash plain, Route 1 connects all major coastal towns."
      },
      {
        q: "What remote, peninsula region in northwestern Iceland is characterized by ancient flat-topped basalt table mountains, deep deserted fjords, and the Dynjandi waterfall?",
        correct: "The Westfjords Vestfirðir",
        w1: "The Eastfjords",
        w2: "Tröllaskagi",
        exp: "The Westfjords contain the Látrabjarg bird cliffs (the westernmost point in Europe) and Hornstrandir nature reserve, where motorized vehicles are strictly banned."
      },
      {
        q: "What tiered waterfall in the Westfjords, known as the Jewel of the Westfjords, cascades 100 meters in a trapezoidal shape resembling a bridal veil?",
        correct: "Dynjandi Fjallfoss",
        w1: "Glymur",
        w2: "Hengifoss",
        exp: "Dynjandi measures thirty meters wide at the top and widens to sixty meters at the bottom, accompanied by six smaller cascading waterfalls below."
      },
      {
        q: "Which picturesque fishing village in the Eastfjords, nestled at the head of a dramatic fjord, is famous for its colorful Rainbow Street leading to the Blue Church?",
        correct: "Seyðisfjörður",
        w1: "Neskaupstaður",
        w2: "Eskifjörður",
        exp: "Seyðisfjörður is the eastern ferry terminal for the Smyril Line car ferry MS Norröna, connecting Iceland directly to the Faroe Islands and Denmark."
      },
      {
        q: "What volcanic lake area in northern Iceland is famous for surreal pseudocraters at Skútustaðir, steaming solfataras at Hverir, and the Dimmuborgir lava field?",
        correct: "Lake Mývatn",
        w1: "Lake Öskjuvatn",
        w2: "Lake Hóp",
        exp: "Dimmuborgir (Dark Castles) features labyrinthine volcanic arches and rock towers formed when a prehistoric lava lake crust collapsed."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Route 1 Ring Road encircling the island of Iceland?",
      target: 1322,
      unit: "kilometers",
      imperial: "821 miles",
      exp: "Route 1 (The Ring Road) extends for exactly 1,322 kilometers around the coastline of Iceland."
    }
  },

  // Cycle 9: Arctic Wildlife & Avian Sanctuaries
  {
    mcqs: [
      {
        q: "What percentage of the world entire breeding population of Atlantic Puffins (Fratercula arctica), nicknamed the Clowns of the Sea, nests along the coastal cliffs of Iceland?",
        correct: "60 Percent",
        w1: "30 Percent",
        w2: "90 Percent",
        exp: "Over eight to ten million puffins arrive in Iceland between April and August to dig burrows on sheer cliffs like Látrabjarg and the Westman Islands (Vestmannaeyjar)."
      },
      {
        q: "What is the only native terrestrial land mammal in Iceland that inhabited the island prior to the arrival of Norse Viking settlers in the 9th century?",
        correct: "The Arctic Fox Vulpes lagopus",
        w1: "The Reindeer",
        w2: "The Field Mouse",
        exp: "Arctic foxes crossed frozen sea pack ice during the last Ice Age, developing thick winter coats (white or coastal blue-morph) to hunt seabirds and scavenge shores."
      },
      {
        q: "Which northern coastal town on Skjálfandi Bay is internationally recognized as the Whale Watching Capital of Europe, home to feeding humpbacks and blue whales?",
        correct: "Húsavík",
        w1: "Akureyri",
        w2: "Dalvík",
        exp: "Nutrient-rich plankton blooms in the bay attract eleven whale species during summer, sailed by traditional oak schooner boats from Húsavík harbor."
      },
      {
        q: "What massive, fourteen-kilometer bird cliff in the Westfjords is the largest seabird nesting cliff in Europe, rising 440 meters sheer above the crashing Atlantic surf?",
        correct: "Látrabjarg",
        w1: "Krísuvíkurberg",
        w2: "Hafnarberg",
        exp: "Látrabjarg hosts millions of razorbills, guillemots, fulmars, and puffins, which show no fear of humans because predatory foxes cannot scale the vertical rock walls."
      },
      {
        q: "What wild ungulate herd animal was introduced to eastern Iceland from Norway in the late 18th century, now roaming wild across the Eastfjords plateaus?",
        correct: "Reindeer Rangifer tarandus",
        w1: "Muskox",
        w2: "Elk",
        exp: "Roughly 6,000 wild reindeer inhabit the highlands around Mount Snæfell, migrating down into coastal valleys during harsh winter blizzards."
      }
    ],
    number: {
      q: "What percentage of the global population of Atlantic Puffins (Fratercula arctica) gathers to nest annually in Iceland?",
      target: 60,
      unit: "percent",
      imperial: "60% of world puffin population",
      exp: "Iceland is the puffin capital of the world, hosting approximately 60 percent of the entire global Atlantic puffin population."
    }
  },

  // Cycle 10: Extent, Volcanic Superlatives & Modern Iceland
  {
    mcqs: [
      {
        q: "What pristine volcanic island thirty kilometers off the southern coast of Iceland was created from the seabed by a submarine volcanic eruption between 1963 and 1967?",
        correct: "Surtsey",
        w1: "Heimaey",
        w2: "Grímsey",
        exp: "Named after fire giant Surtr, UNESCO-inscribed Surtsey is a strict scientific nature reserve where biologists study how pioneering plant and animal life colonizes barren volcanic rock."
      },
      {
        q: "Which volcanic island in the Westman archipelago was devastated in January 1973 when the Eldfell volcano erupted within the town limits, creating a heroic effort by locals to spray seawater to stop lava?",
        correct: "Heimaey",
        w1: "Surtsey",
        w2: "Grímsey",
        exp: "Townspeople pumped millions of gallons of cold seawater onto advancing lava flows, successfully solidifying the lava and saving the strategic harbor."
      },
      {
        q: "What small inhabited island forty kilometers north of the mainland is the only territory of Iceland crossed by the Arctic Circle (66.5 degrees North)?",
        correct: "Grímsey Island",
        w1: "Hrísey",
        w2: "Flatey",
        exp: "Marked by a massive concrete Orbis et Globus sphere monument, visitors to Grímsey receive a formal certificate for crossing the Arctic Circle on foot."
      },
      {
        q: "What is the total land area of the island nation of Iceland in square kilometers, ranking it as the eighteenth largest island in the world?",
        correct: "103,000 Square Kilometers",
        w1: "55,000 Square Kilometers",
        w2: "180,000 Square Kilometers",
        exp: "Covering 103,000 square kilometers (roughly the size of Ireland or South Korea), Iceland has the lowest population density in Europe at roughly 3.8 people per square kilometer."
      },
      {
        q: "What famous historic white timber house in Reykjavík hosted the historic October 1986 summit meeting between Ronald Reagan and Mikhail Gorbachev that paved the way to ending the Cold War?",
        correct: "Höfði House Höfði",
        w1: "Bessastaðir",
        w2: "Alþingishúsið",
        exp: "Built in 1909 as the French consulate, Höfði was chosen for the 1986 Reykjavík Summit due to Iceland neutral Nordic geopolitical positioning."
      }
    ],
    number: {
      q: "In what year did the new volcanic island of Surtsey emerge from the Atlantic Ocean during a submarine eruption off the southern coast of Iceland?",
      target: 1963,
      unit: "year",
      imperial: "1963 AD",
      exp: "The submarine volcanic eruption of Surtsey began on November 14, 1963, continuing to erupt and build land until June 1967."
    }
  }
];

// Build Iceland Quiz
buildQuiz({
  id: 'iceland-geography-heritage-60',
  theme: 'Iceland: Geography, Volcanoes & Glacial Lagoons',
  title: 'Iceland: Geography, Volcanoes & Glacial Lagoons',
  description: 'A 60-question grand master assessment exploring the Mid-Atlantic Ridge, Eyjafjallajökull (2010), Vatnajökull & Jökulsárlón, the Golden Circle, the Althing at Thingvellir (930 CE), Skógafoss, the Blue Lagoon, Ring Road (1,322 km), and Atlantic puffins.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, icelandCycles);

console.log('Iceland quiz built successfully!');
