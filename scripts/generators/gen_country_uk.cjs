const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 8. uk-geography-heritage-60
// =========================================================================
const ukCycles = [
  // Cycle 1: The Four Nations & British Geography
  {
    mcqs: [
      {
        q: "What four constituent nations comprise the sovereign country known officially as the United Kingdom of Great Britain and Northern Ireland?",
        correct: "England, Scotland, Wales and Northern Ireland",
        w1: "England, Scotland, Ireland and Wales",
        w2: "England, Scotland, Wales and Cornwall",
        exp: "Great Britain refers to the main island containing England, Scotland, and Wales, which unites politically with Northern Ireland."
      },
      {
        q: "What is the largest island in Europe by geographical area, spanning over 209,000 square kilometers?",
        correct: "Great Britain",
        w1: "Ireland",
        w2: "Iceland",
        exp: "Great Britain is the ninth largest island on Earth, separated from mainland Europe by the English Channel and the North Sea."
      },
      {
        q: "What is the narrowest point of the English Channel, spanning thirty-three kilometers between the White Cliffs of Dover and Cap Gris-Nez in France?",
        correct: "Strait of Dover",
        w1: "St George Channel",
        w2: "North Channel",
        exp: "The Strait of Dover is crossed beneath the seabed by the 50.4-kilometer Channel Tunnel (Eurotunnel), which opened in May 1994."
      },
      {
        q: "Which ancient 117-kilometer stone wall fortification was constructed across northern England by Roman Emperor Hadrian beginning in 122 CE?",
        correct: "Hadrian Wall",
        w1: "Antonine Wall",
        w2: "Offa Dyke",
        exp: "Hadrian Wall stretched from the River Tyne on the North Sea to the Solway Firth on the Irish Sea, marking the northern border of Roman Britannia."
      },
      {
        q: "What 290-kilometer earthwork bank and ditch was constructed in the 8th century by King Offa of Mercia to demarcate the border with Wales?",
        correct: "Offa Dyke",
        w1: "Hadrian Dyke",
        w2: "Devil Dyke",
        exp: "Offa's Dyke roughly aligns with the modern Anglo-Welsh border, traversed today by the popular 285-kilometer National Trail footpath."
      }
    ],
    number: {
      q: "What is the minimum width in kilometers of the Strait of Dover between Dover in England and the French coast?",
      target: 33,
      unit: "kilometers",
      imperial: "20.7 miles",
      exp: "The Strait of Dover is the narrowest section of the English Channel, measuring approximately thirty-three kilometers across."
    }
  },

  // Cycle 2: Scottish Highlands, Ben Nevis & The Great Glen
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in the United Kingdom and British Isles, rising 1,345 meters in the Grampian Mountains near Fort William?",
        correct: "Ben Nevis",
        w1: "Ben Macdui",
        w2: "Cairn Gorm",
        exp: "Ben Nevis was an active volcano that collapsed inward millions of years ago, famous for its sheer 700-meter north face cliffs and summit observatory ruins."
      },
      {
        q: "What voluminous Scottish freshwater lake holds more water than all the lakes and reservoirs in England and Wales combined, famed for monster folklore?",
        correct: "Loch Ness",
        w1: "Loch Lomond",
        w2: "Loch Morar",
        exp: "Loch Ness reaches a depth of 230 meters along the Great Glen Fault, containing 7.4 billion cubic meters of dark, peat-stained water."
      },
      {
        q: "What major 100-kilometer geological strike-slip fault line cuts across northern Scotland from Inverness on the Moray Firth to Fort William on Loch Linnhe?",
        correct: "The Great Glen Fault",
        w1: "Highland Boundary Fault",
        w2: "Southern Uplands Fault",
        exp: "The Great Glen is followed by Thomas Telford 1822 Caledonian Canal, which connects Loch Ness, Loch Oich, and Loch Lochy across Scotland."
      },
      {
        q: "What iconic 21-arch curved concrete railway viaduct in the Scottish Highlands was featured in the Harry Potter film series carrying the Hogwarts Express?",
        correct: "Glenfinnan Viaduct",
        w1: "Forth Bridge",
        w2: "Tay Viaduct",
        exp: "Built by Sir Robert McAlpine between 1897 and 1901 using unreinforced mass concrete, the viaduct overlooks Loch Shiel and the Glenfinnan Monument."
      },
      {
        q: "What famous island in the Inner Hebrides is renowned for the dramatic jagged Black Cuillin mountains, Fairy Pools, and Old Man of Storr pinnacle?",
        correct: "Isle of Skye",
        w1: "Isle of Mull",
        w2: "Isle of Islay",
        exp: "The Isle of Skye is connected to the Scottish mainland by the Skye Bridge, famous for Dunvegan Castle and Gaelic cultural traditions."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Ben Nevis in the Scottish Highlands?",
      target: 1345,
      unit: "meters",
      imperial: "4,413 feet",
      exp: "Ben Nevis stands at an official Ordnance Survey elevation of 1,345 meters above sea level."
    }
  },

  // Cycle 3: Wales, Snowdonia & Castle Country
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Wales, rising 1,085 meters in the heart of Eryri (Snowdonia) National Park?",
        correct: "Snowdon Yr Wyddfa",
        w1: "Cader Idris",
        w2: "Pen y Fan",
        exp: "Yr Wyddfa is accessible by the historic Snowdon Mountain Railway, the only rack-and-pinion passenger steam railway in the United Kingdom, operating since 1896."
      },
      {
        q: "What dramatic red sandstone mountain range in southern Wales forms the centerpiece of the Brecon Beacons (Bannau Brycheiniog) National Park?",
        correct: "Brecon Beacons Bannau Brycheiniog",
        w1: "Cambrian Mountains",
        w2: "Black Mountain",
        exp: "The highest peak is Pen y Fan (886 m), characterized by sweeping glacial cirques used for British Special Forces (SAS) endurance selection treks."
      },
      {
        q: "Which imposing 13th-century stone fortress with polygonal towers in North Wales was built by King Edward I, site of royal Prince of Wales investitures?",
        correct: "Caernarfon Castle",
        w1: "Conwy Castle",
        w2: "Harlech Castle",
        exp: "Caernarfon Castle is part of the UNESCO World Heritage Castles of King Edward I, modeled after the imperial Roman walls of Constantinople."
      },
      {
        q: "What is the capital and largest city of Wales, located on the Bristol Channel, home to the Millennium Stadium and National Assembly (Senedd)?",
        correct: "Cardiff",
        w1: "Swansea",
        w2: "Newport",
        exp: "Cardiff expanded dramatically in the 19th century as the world premier coal-exporting port, shipping Welsh anthracite from the South Wales Valleys."
      },
      {
        q: "What scenic 299-kilometer coastal walking trail in southwestern Wales traverses dramatic cliffs, sandy coves, and puffin colonies on Skomer Island?",
        correct: "Pembrokeshire Coast Path",
        w1: "Anglesey Coastal Path",
        w2: "Gower Way",
        exp: "The Pembrokeshire Coast is the only national park in the UK designated primarily for its spectacular wild maritime coastline."
      }
    ],
    number: {
      q: "What is the elevation in meters of Snowdon (Yr Wyddfa), the highest mountain peak in Wales?",
      target: 1085,
      unit: "meters",
      imperial: "3,560 feet",
      exp: "Yr Wyddfa (Snowdon) stands at 1,085 meters above sea level in Gwynedd, North Wales."
    }
  },

  // Cycle 4: Northern Ireland, Giant's Causeway & Lough Neagh
  {
    mcqs: [
      {
        q: "What UNESCO World Heritage geological wonder in County Antrim consists of 40,000 interlocking hexagonal basalt columns formed by cooling volcanic lava?",
        correct: "Giant Causeway",
        w1: "Fingal Cave",
        w2: "Devil Causeway",
        exp: "Folklore attributes the causeway to mythological Irish giant Finn McCool building a stone bridge across the Irish Sea to challenge Scottish giant Benandonner."
      },
      {
        q: "What is the largest freshwater lake by surface area in the British Isles, covering 392 square kilometers in central Northern Ireland?",
        correct: "Lough Neagh",
        w1: "Lough Erne",
        w2: "Loch Lomond",
        exp: "Lough Neagh supplies forty percent of Northern Ireland drinking water and hosts the largest commercial European eel fishery in Europe."
      },
      {
        q: "Which granite mountain range in County Down features Slieve Donard (850 m) plunging into the Irish Sea, inspiring C.S. Lewis Chronicles of Narnia?",
        correct: "Mourne Mountains",
        w1: "Sperrin Mountains",
        w2: "Antrim Hills",
        exp: "The 35-kilometer Mourne Wall traverses fifteen mountain peaks, constructed between 1904 and 1922 to enclose the Silent Valley water reservoir."
      },
      {
        q: "Which city is the capital and largest city of Northern Ireland, located at the mouth of the River Lagan, where the RMS Titanic was built in 1911?",
        correct: "Belfast",
        w1: "Derry Londonderry",
        w2: "Armagh",
        exp: "Belfast was a global powerhouse of shipbuilding and linen manufacturing, featuring the Harland and Wolff shipyard Samson and Goliath gantry cranes."
      },
      {
        q: "Which historic walled city on the River Foyle in Northern Ireland is the only remaining completely intact walled city in Ireland?",
        correct: "Derry Londonderry",
        w1: "Ballymena",
        w2: "Coleraine",
        exp: "The Derry city walls were built between 1613 and 1618 by the Irish Society, famous for withstanding the 105-day Siege of Derry in 1689."
      }
    ],
    number: {
      q: "Approximately how many interlocking polygonal basalt columns make up the geological formation at the Giant's Causeway in Northern Ireland?",
      target: 40000,
      unit: "columns",
      imperial: "40,000 basalt columns",
      exp: "The Giant's Causeway consists of roughly 40,000 predominantly hexagonal basalt columns formed 60 million years ago during the Paleocene Epoch."
    }
  },

  // Cycle 5: London, The Thames & Metropolitan Geography
  {
    mcqs: [
      {
        q: "What is the longest river located entirely within England, flowing 346 kilometers from Thames Head in Gloucestershire through London to the North Sea?",
        correct: "River Thames",
        w1: "River Severn",
        w2: "River Trent",
        exp: "The Thames is tidal in London, subject to seven-meter tides that required the construction of modern embankments and the Thames Barrier."
      },
      {
        q: "What massive movable flood defense system across the Thames at Woolwich Reach protects London from storm surges originating in the North Sea?",
        correct: "Thames Barrier",
        w1: "London Floodgate",
        w2: "Greenwich Surge Gate",
        exp: "Opened in 1984, the barrier consists of ten rotating steel radial gates spanning 520 meters across the river, raised over two hundred times."
      },
      {
        q: "Which iconic Victorian bascule and suspension bridge in London opened in 1894 with twin neo-Gothic towers adjacent to the Tower of London?",
        correct: "Tower Bridge",
        w1: "London Bridge",
        w2: "Westminster Bridge",
        exp: "Tower Bridge uses hydraulic steam engines (now converted to electro-hydraulic drives) to raise its twin 1,000-ton bascules for tall ship navigation."
      },
      {
        q: "At which London royal observatory is the historical baseline for world time zones and the International Prime Meridian (Zero Longitude) located?",
        correct: "Royal Observatory Greenwich",
        w1: "Kew Observatory",
        w2: "Southwark Observatory",
        exp: "Founded by King Charles II in 1675, Greenwich was chosen internationally in 1884 as the official Prime Meridian and basis for Greenwich Mean Time (GMT)."
      },
      {
        q: "What is the official name of the clock tower of the Palace of Westminster in London, commonly referred to by the nickname of its great bell Big Ben?",
        correct: "Elizabeth Tower",
        w1: "Victoria Tower",
        w2: "St Stephen Tower",
        exp: "Renamed Elizabeth Tower in 2012 for Queen Elizabeth II Diamond Jubilee, Big Ben specifically refers to the 13.7-ton Great Bell inside."
      }
    ],
    number: {
      q: "In what year was the massive movable Thames Barrier flood protection gate system officially inaugurated by Queen Elizabeth II?",
      target: 1984,
      unit: "year",
      imperial: "1984 AD",
      exp: "The Thames Barrier was officially opened on May 8, 1984, safeguarding London from catastrophic North Sea storm surge flooding."
    }
  },

  // Cycle 6: The Lake District & Northern England
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in England, rising 978 meters in the Lake District National Park in Cumbria?",
        correct: "Scafell Pike",
        w1: "Helvellyn",
        w2: "Skiddaw",
        exp: "Scafell Pike is composed of hard volcanic tuff, crowned by a massive summit war memorial cairn gifted to the National Trust in 1919."
      },
      {
        q: "What is the largest natural lake in England by surface area and length, stretching over 18 kilometers in the southern Lake District?",
        correct: "Windermere",
        w1: "Ullswater",
        w2: "Derwentwater",
        exp: "Windermere covers 14.7 square kilometers in a glacial ribbon valley, celebrated in the romantic poetry of William Wordsworth and Beatrix Potter books."
      },
      {
        q: "Which picturesque national park in northern England is renowned for dramatic limestone pavements at Malham Cove, drystone walls, and the Three Peaks?",
        correct: "Yorkshire Dales",
        w1: "North York Moors",
        w2: "Peak District",
        exp: "The Yorkshire Dales feature extensive subterranean cave networks and the famous Three Peaks challenge: Pen-y-ghent, Whernside, and Ingleborough."
      },
      {
        q: "What scenic mountain range running north-to-south through northern England is often called the Backbone of England?",
        correct: "The Pennines",
        w1: "The Cumbrian Mountains",
        w2: "The Cheviot Hills",
        exp: "The Pennines separate North West England from Yorkshire, traversed by the 431-kilometer Pennine Way, Britain first National Trail."
      },
      {
        q: "Which deep glacial lake in the Lake District is the deepest lake in England, plunging to a depth of seventy-nine meters?",
        correct: "Wastwater",
        w1: "Coniston Water",
        w2: "Crummock Water",
        exp: "Surrounded by the steep red screes of the Wasdale valley, Wastwater was voted Britain Favorite View in a national television poll."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Scafell Pike, the highest peak in England?",
      target: 978,
      unit: "meters",
      imperial: "3,209 feet",
      exp: "Scafell Pike in Cumbria stands at exactly 978 meters above sea level, making it the highest point in England."
    }
  },

  // Cycle 7: Southern England, Chalk Cliffs & Jurassic Coast
  {
    mcqs: [
      {
        q: "What iconic 110-meter white Cretaceous chalk cliffs on the English Channel coast symbolize the defensive frontier and homecoming of Britain?",
        correct: "White Cliffs of Dover",
        w1: "Beachy Head",
        w2: "Seven Sisters",
        exp: "The cliffs are composed of pure microscopic calcite plates from coccolithophore algae deposited during the Cretaceous period roughly 90 million years ago."
      },
      {
        q: "What UNESCO World Heritage 154-kilometer coastline in Dorset and East Devon preserves 185 million years of continuous Triassic, Jurassic, and Cretaceous geology?",
        correct: "The Jurassic Coast",
        w1: "The Heritage Coast",
        w2: "The Gower Peninsula",
        exp: "Famous for natural limestone arches like Durdle Door, the Jurassic Coast is where paleontologist Mary Anning discovered complete ichthyosaur and plesiosaur fossils."
      },
      {
        q: "What ancient royal hunting forest in Hampshire, created by William the Conqueror in 1079, is famous for free-roaming ponies and ancient oak pastures?",
        correct: "The New Forest",
        w1: "Sherwood Forest",
        w2: "Forest of Dean",
        exp: "Designated a National Park in 2005, the New Forest maintains ancient commoning rights allowing local commoners to graze cattle, pigs, and ponies."
      },
      {
        q: "What is the westernmost point of the mainland of England and Great Britain, located on the granite peninsula of Cornwall?",
        correct: "Land End",
        w1: "Lizard Point",
        w2: "Cape Cornwall",
        exp: "Land's End is the traditional starting point for the legendary 1,407-kilometer traverse across Britain to John o' Groats in northeastern Scotland."
      },
      {
        q: "What is the southernmost point of the mainland of Great Britain, renowned for rare serpentine rock formations and coastal lighthouses?",
        correct: "Lizard Point",
        w1: "Land End",
        w2: "Start Point",
        exp: "Lizard Point sits at 49 degrees 57 minutes North latitude, marking where Guglielmo Marconi received the first transatlantic wireless radio signals."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the UNESCO World Heritage Jurassic Coast in southern England?",
      target: 154,
      unit: "kilometers",
      imperial: "96 miles",
      exp: "The Jurassic Coast stretches 154 kilometers from Exmouth in East Devon to Studland Bay in Dorset."
    }
  },

  // Cycle 8: Islands: Hebrides, Orkney & Channel Islands
  {
    mcqs: [
      {
        q: "What exceptionally preserved Neolithic stone-built village in the Orkney Islands dates back to 3180 BCE, predating both Stonehenge and the Great Pyramids?",
        correct: "Skara Brae",
        w1: "Jarlshof",
        w2: "Maeshowe",
        exp: "Uncovered by an 1850 sandstorm, Skara Brae consists of eight connected circular stone dwellings with stone beds, hearths, dressers, and covered drainage tunnels."
      },
      {
        q: "Which sea cave on the uninhabited island of Staffa in the Inner Hebrides is famous for hexagonal basalt columns and inspired Felix Mendelssohn Hebrides Overture?",
        correct: "Fingal Cave",
        w1: "Smoo Cave",
        w2: "Saint Columba Cave",
        exp: "Fingal Cave features a natural cathedral-like acoustics and arched basalt columns formed by the same Tertiary volcanic activity that created the Giant's Causeway."
      },
      {
        q: "Which archipelago of Crown Dependencies in the English Channel near the French coast of Normandy includes the bailiwicks of Jersey and Guernsey?",
        correct: "The Channel Islands",
        w1: "The Scilly Isles",
        w2: "The Hebrides",
        exp: "The Channel Islands were the only British territories occupied by German armed forces during World War II, maintaining distinct self-governing legal jurisdictions."
      },
      {
        q: "Which self-governing Crown Dependency island in the Irish Sea possesses the world oldest continuous parliamentary assembly (Tynwald), founded in 979 CE?",
        correct: "Isle of Man",
        w1: "Isle of Wight",
        w2: "Anglesey",
        exp: "The Isle of Man is famous for the tail-less Manx cat, the annual Isle of Man TT motorcycle races, and the ancient triskelion three-legs symbol."
      },
      {
        q: "Which island group off the southwestern tip of Cornwall enjoys a mild subtropical microclimate where palm trees and exotic plants thrive at Tresco Abbey Garden?",
        correct: "Isles of Scilly",
        w1: "Lundy Island",
        w2: "Farne Islands",
        exp: "The Isles of Scilly encompass over 140 islands (five inhabited), surrounded by turquoise waters warmed by the North Atlantic Current."
      }
    ],
    number: {
      q: "Approximately how many years BCE was the Neolithic stone settlement of Skara Brae in Orkney first inhabited by ancient farmers?",
      target: 3180,
      unit: "BCE",
      imperial: "3180 BC (over 5,000 years ago)",
      exp: "Radiocarbon dating confirms Skara Brae was occupied between roughly 3180 BCE and 2500 BCE, older than Stonehenge."
    }
  },

  // Cycle 9: Canals, Railways & Industrial Heritage
  {
    mcqs: [
      {
        q: "Which Shropshire gorge along the River Severn is celebrated as the Birthplace of the Industrial Revolution, home to the world first cast-iron bridge opened in 1779?",
        correct: "Ironbridge Gorge",
        w1: "Derwent Valley",
        w2: "Saltaire Gorge",
        exp: "Abraham Darby developed coke smelting of iron ore at Coalbrookdale in 1709, leading to the construction of the iconic 30-meter single-span Iron Bridge in 1779."
      },
      {
        q: "Which navigable canal aqueduct carrying the Llangollen Canal 38 meters above the River Dee in Wales was designed by civil engineer Thomas Telford in 1805?",
        correct: "Pontcysyllte Aqueduct",
        w1: "Chirk Aqueduct",
        w2: "Barton Swing Aqueduct",
        exp: "The UNESCO World Heritage Pontcysyllte Aqueduct uses a cast-iron water trough supported by nineteen slender stone masonry pillars without mortar."
      },
      {
        q: "What pioneer railway in northeastern England became the world first public railway to use steam locomotives in September 1825, engineered by George Stephenson?",
        correct: "Stockton and Darlington Railway",
        w1: "Liverpool and Manchester Railway",
        w2: "Great Western Railway",
        exp: "Locomotion No. 1 hauled wagons of coal and passengers, demonstrating the commercial viability of steam traction and launching the Railway Age."
      },
      {
        q: "Which underground rapid transit railway network in London opened in January 1863 between Paddington and Farringdon as the first subway in world history?",
        correct: "London Underground The Tube",
        w1: "Glasgow Subway",
        w2: "Tyne and Wear Metro",
        exp: "Originally operated with gas-lit wooden carriages hauled by steam locomotives, the London Underground network today spans 402 kilometers across 272 stations."
      },
      {
        q: "Which 58-kilometer ship canal opened in 1894, allowing ocean-going cargo vessels to bypass the Port of Liverpool and navigate directly into the heart of Manchester?",
        correct: "Manchester Ship Canal",
        w1: "Grand Union Canal",
        w2: "Bridgewater Canal",
        exp: "The Manchester Ship Canal transformed landlocked industrial Manchester into Britain third busiest port, featuring the historic Barton Swing Aqueduct."
      }
    ],
    number: {
      q: "In what year did the London Underground, the world first subterranean passenger railway, open for service?",
      target: 1863,
      unit: "year",
      imperial: "1863 AD",
      exp: "The Metropolitan Railway began commercial passenger service on January 10, 1863, carrying 38,000 passengers on its opening day."
    }
  },

  // Cycle 10: Extent, Borders & Geographic Superlatives
  {
    mcqs: [
      {
        q: "What is the longest river in the United Kingdom, flowing 354 kilometers from Plynlimon in the Cambrian Mountains of Wales into the Bristol Channel?",
        correct: "River Severn",
        w1: "River Thames",
        w2: "River Trent",
        exp: "The River Severn experiences the famous Severn Bore, a tidal wave that travels upstream at up to twenty kilometers per hour during spring tides."
      },
      {
        q: "What was the very first national park designated in the United Kingdom, established in 1951 across Derbyshire and neighboring northern counties?",
        correct: "Peak District National Park",
        w1: "Lake District National Park",
        w2: "Dartmoor National Park",
        exp: "Following the historic 1932 Mass Trespass on Kinder Scout, the Peak District was created to secure public access to open countryside for industrial city dwellers."
      },
      {
        q: "How many overseas territories does the United Kingdom retain sovereignty over around the globe, including Bermuda, Gibraltar, and the Falkland Islands?",
        correct: "14 British Overseas Territories",
        w1: "8 Territories",
        w2: "20 Territories",
        exp: "The fourteen overseas territories span the Caribbean, South Atlantic, Indian Ocean, Pacific Ocean, and Mediterranean, with a combined population of roughly 270,000."
      },
      {
        q: "What is the only land border shared between the United Kingdom and another sovereign European nation, stretching for 499 kilometers?",
        correct: "United Kingdom-Republic of Ireland Border",
        w1: "UK-France Border",
        w2: "UK-Spain Border",
        exp: "Established in 1921 following the partition of Ireland, the border is completely open under the Common Travel Area and protected by the Good Friday Agreement."
      },
      {
        q: "What tidal phenomenon on the estuary of the River Severn produces a solitary breaking wave that surges upstream against the river current?",
        correct: "The Severn Bore",
        w1: "The Mersey Surge",
        w2: "The Solway Wave",
        exp: "The Severn estuary has the second highest tidal range in the world (up to fifteen meters), funneled into a narrowing funnel that forces the water into a surfable wave."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the River Severn, the longest river in the United Kingdom?",
      target: 354,
      unit: "kilometers",
      imperial: "220 miles",
      exp: "The River Severn flows for 354 kilometers from mid-Wales through Shropshire, Worcestershire, and Gloucestershire to the Bristol Channel."
    }
  }
];

// Build UK Quiz
buildQuiz({
  id: 'uk-geography-heritage-60',
  theme: 'United Kingdom: Geography, Highlands & Historic Landscapes',
  title: 'United Kingdom: Geography, Highlands & Historic Landscapes',
  description: 'A 60-question grand master assessment exploring the Four Nations, Ben Nevis & Scottish Highlands, Snowdonia, Giant Causeway, River Thames, Lake District, Jurassic Coast, prehistoric Orkney, and industrial waterways.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, ukCycles);

console.log('UK quiz built successfully!');
