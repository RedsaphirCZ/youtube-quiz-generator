const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 5. canada-geography-heritage-60
// =========================================================================
const canadaCycles = [
  // Cycle 1: The Canadian Shield & Geological Foundation
  {
    mcqs: [
      {
        q: "What massive geological foundation of ancient Precambrian igneous and metamorphic rock covers nearly half of Canada total land area?",
        correct: "The Canadian Shield Laurentian Plateau",
        w1: "The Interior Plains",
        w2: "The Appalachian Highlands",
        exp: "The Canadian Shield encircles Hudson Bay across eight million square kilometers, scraped bare by Pleistocene ice sheets to leave thin soils, rocky outcrops, and millions of lakes."
      },
      {
        q: "What vast subarctic coniferous forest biome covers over five million square kilometers across the Canadian Shield from the Yukon to Newfoundland?",
        correct: "Boreal Forest Taiga",
        w1: "Temperate Deciduous Forest",
        w2: "Tundra",
        exp: "The Canadian boreal forest contains twenty-five percent of the world remaining intact forest, dominated by black spruce, jack pine, tamarack, and trembling aspen."
      },
      {
        q: "Which city in northern Ontario located inside a 1.85-billion-year-old meteor impact basin is one of the world leading nickel and copper mining centers?",
        correct: "Sudbury",
        w1: "Timmins",
        w2: "Thunder Bay",
        exp: "The Sudbury Basin impact melted deep mantle crust, concentrating immense deposits of nickel, copper, platinum, and palladium mined for over a century."
      },
      {
        q: "What percentage of the world natural freshwater lakes are estimated to be located within the borders of Canada?",
        correct: "Over 60 Percent",
        w1: "30 Percent",
        w2: "45 Percent",
        exp: "Canada has more lake area than any other country on Earth, with over two million freshwater lakes covering nine percent of the national surface area."
      },
      {
        q: "Which vast inland subarctic sea in northern Manitoba and Ontario is the second largest bay on Earth after the Bay of Bengal?",
        correct: "Hudson Bay",
        w1: "Baffin Bay",
        w2: "James Bay",
        exp: "Hudson Bay covers 1.23 million square kilometers with an extensive drainage basin that encompasses over one-third of Canada entire land area."
      }
    ],
    number: {
      q: "What percentage of Canada total national land area is covered by the Canadian Shield geological formation?",
      target: 48,
      unit: "percent",
      imperial: "48% of Canada land area",
      exp: "The Canadian Shield covers approximately 48 percent of Canada land surface, spanning eight provinces and territories."
    }
  },

  // Cycle 2: The Canadian Rockies & Western Cordillera
  {
    mcqs: [
      {
        q: "What is the oldest national park in Canada, established in 1885 in the Rocky Mountains around natural sulfur hot springs in Alberta?",
        correct: "Banff National Park",
        w1: "Jasper National Park",
        w2: "Yoho National Park",
        exp: "Banff was created following the discovery of Cave and Basin hot springs during construction of the Canadian Pacific Railway, famous for Lake Louise."
      },
      {
        q: "What gives glacial alpine lakes like Lake Louise and Moraine Lake in Banff National Park their vivid turquoise-blue coloration?",
        correct: "Glacial Rock Flour Silt",
        w1: "High Dissolved Copper Compounds",
        w2: "Microscopic Blue-Green Algae",
        exp: "Glaciers grind bedrock into fine rock flour that remains suspended in lake water, scattering light in the blue and green spectrum."
      },
      {
        q: "What is the highest mountain peak in the Canadian Rocky Mountains, rising 3,954 meters on the Continental Divide in British Columbia?",
        correct: "Mount Robson",
        w1: "Mount Columbia",
        w2: "Mount Assiniboine",
        exp: "Mount Robson towers over the Yellowhead Pass with its sheer Emperor Face, a formidable objective for high-altitude mountaineers."
      },
      {
        q: "What massive 325-square-kilometer icefield in the Canadian Rockies feeds glaciers that drain into three different oceans (Arctic, Atlantic, Pacific)?",
        correct: "Columbia Icefield",
        w1: "Peyto Glacier",
        w2: "Wapta Icefield",
        exp: "The Columbia Icefield spans the Continental Divide between Banff and Jasper, easily visited via all-terrain Ice Explorer buses on the Athabasca Glacier."
      },
      {
        q: "Which pyramid-shaped peak on the Alberta-British Columbia border is known as the Matterhorn of the Rockies for its striking glacial horn geometry?",
        correct: "Mount Assiniboine",
        w1: "Mount Edith Cavell",
        w2: "Mount Temple",
        exp: "Mount Assiniboine rises 3,618 meters, carved into a sheer pyramidal peak by four distinct cirque glaciers eroding opposing mountain faces."
      }
    ],
    number: {
      q: "In what year was Banff National Park officially established as Canada first national park?",
      target: 1885,
      unit: "year",
      imperial: "1885 AD",
      exp: "Banff was established on November 25, 1885, under the Rocky Mountains Park Act, making it the third national park created in the world."
    }
  },

  // Cycle 3: The Great Lakes, St. Lawrence Seaway & Niagara Falls
  {
    mcqs: [
      {
        q: "What is the largest freshwater lake in the world by surface area, shared by the province of Ontario and the United States?",
        correct: "Lake Superior",
        w1: "Lake Huron",
        w2: "Lake Michigan",
        exp: "Lake Superior covers 82,100 square kilometers, holding enough water to submerge all of North and South America under thirty centimeters of water."
      },
      {
        q: "Which deep waterway system opened in 1959, allowing ocean-going container and grain ships to travel 3,700 kilometers into the heart of North America?",
        correct: "St. Lawrence Seaway",
        w1: "Erie Canal",
        w2: "Trent-Severn Waterway",
        exp: "The Seaway utilizes fifteen lock chambers along the St. Lawrence River and Welland Canal to lift ships 183 meters above sea level to Lake Superior."
      },
      {
        q: "What is the name of the largest of the three waterfalls comprising Niagara Falls, carrying roughly ninety percent of the total river volume over the Canadian brink?",
        correct: "Horseshoe Falls Canadian Falls",
        w1: "American Falls",
        w2: "Bridal Veil Falls",
        exp: "Horseshoe Falls drops fifty-seven meters along a 790-meter curving crest line, generating massive hydroelectric power and mist rainbows."
      },
      {
        q: "What percentage of the world entire liquid surface freshwater is contained in the Laurentian Great Lakes of North America?",
        correct: "21 Percent",
        w1: "10 Percent",
        w2: "35 Percent",
        exp: "The five Great Lakes (Superior, Huron, Michigan, Erie, Ontario) contain over 22,000 cubic kilometers of fresh water, roughly one-fifth of global surface freshwater."
      },
      {
        q: "What picturesque archipelago of 1,864 islands straddles the Canada-US border in the St. Lawrence River near Kingston, Ontario?",
        correct: "Thousand Islands",
        w1: "Gulf Islands",
        w2: "Magdalen Islands",
        exp: "The Thousand Islands region features historic granite islands, ornate Gilded Age castles like Boldt Castle, and gave its name to Thousand Island salad dressing."
      }
    ],
    number: {
      q: "What percentage of the world total liquid surface freshwater is held within the Laurentian Great Lakes system?",
      target: 21,
      unit: "percent",
      imperial: "21% of world surface freshwater",
      exp: "The Great Lakes hold approximately 21 percent of the world's non-frozen surface freshwater supply."
    }
  },

  // Cycle 4: Hudson Bay, Arctic Archipelago & Northern Territories
  {
    mcqs: [
      {
        q: "What vast northern territory was officially created on April 1, 1999, separating from the Northwest Territories as a self-governed homeland for the Inuit?",
        correct: "Nunavut",
        w1: "Yukon",
        w2: "Northwest Territories",
        exp: "Nunavut covers over two million square kilometers (one-fifth of Canada total area), with its territorial capital located in Iqaluit on Baffin Island."
      },
      {
        q: "What is the largest island in Canada and the fifth largest island in the world, located in the territory of Nunavut?",
        correct: "Baffin Island",
        w1: "Victoria Island",
        w2: "Ellesmere Island",
        exp: "Baffin Island spans 507,451 square kilometers, famous for Auyuittuq National Park, Mount Thor vertical cliff, and traditional Inuit printmaking in Kinngait."
      },
      {
        q: "Which subarctic port town on the western shore of Hudson Bay in Manitoba is internationally renowned as the Polar Bear Capital of the World?",
        correct: "Churchill",
        w1: "Rankin Inlet",
        w2: "Moosonee",
        exp: "In autumn, hundreds of polar bears congregate around Churchill waiting for Hudson Bay to freeze so they can hunt ringed seals on winter pack ice."
      },
      {
        q: "What mountain in Auyuittuq National Park on Baffin Island features the greatest pure vertical cliff drop on Earth, plunging 1,250 meters at an average 105-degree angle?",
        correct: "Mount Thor",
        w1: "Mount Asgard",
        w2: "Mount Logan",
        exp: "Mount Thor is a sheer granite cliff face carved by glacial erosion, drawing elite extreme big-wall rock climbers from around the globe."
      },
      {
        q: "What is the northernmost permanently inhabited human settlement on Earth, located at 82.5 degrees North latitude on Ellesmere Island in Nunavut?",
        correct: "Alert",
        w1: "Grise Fiord",
        w2: "Resolute",
        exp: "Alert hosts a Canadian Armed Forces signals intelligence station and Global Atmosphere Watch weather observatory, just 817 kilometers from the North Pole."
      }
    ],
    number: {
      q: "In what year was the territory of Nunavut officially established following the historic Nunavut Land Claims Agreement?",
      target: 1999,
      unit: "year",
      imperial: "1999 AD",
      exp: "Nunavut was officially inaugurated as Canada third territory on April 1, 1999, with celebrations held in the new capital Iqaluit."
    }
  },

  // Cycle 5: Atlantic Maritime Provinces & The Bay of Fundy
  {
    mcqs: [
      {
        q: "Which funnel-shaped body of water between Nova Scotia and New Brunswick experiences the highest tidal range on Earth, rising up to sixteen meters twice daily?",
        correct: "Bay of Fundy",
        w1: "Gulf of St. Lawrence",
        w2: "Northumberland Strait",
        exp: "Due to a unique tidal resonance matching the natural sloshing frequency of the bay, 160 billion tons of seawater rush in and out during every tidal cycle."
      },
      {
        q: "What famous flowerpot rock stacks in New Brunswick are sculpted by the powerful tides of the Bay of Fundy, allowing visitors to walk on the ocean floor at low tide?",
        correct: "Hopewell Rocks",
        w1: "Percé Rock",
        w2: "Three Sisters Rocks",
        exp: "Tidal erosion hollows out the base of conglomerate sandstone cliffs, creating standalone rock pillars topped by green spruce trees."
      },
      {
        q: "Which is the smallest province in Canada by both land area and population, famous for red sandstone cliffs and Lucy Maud Montgomery novel Anne of Green Gables?",
        correct: "Prince Edward Island",
        w1: "Nova Scotia",
        w2: "New Brunswick",
        exp: "PEI was the birthplace of Canadian Confederation at the 1864 Charlottetown Conference, connected to the mainland by the 12.9-kilometer Confederation Bridge."
      },
      {
        q: "What famous 298-kilometer scenic coastal highway loops around the northern tip of Cape Breton Island in Nova Scotia, overlooking the Gulf of St. Lawrence?",
        correct: "Cabot Trail",
        w1: "Viking Trail",
        w2: "Trans-Taiga Road",
        exp: "The Cabot Trail traverses Cape Breton Highlands National Park, famous for dramatic ocean lookouts, Celtic fiddle music, and Acadian French culture."
      },
      {
        q: "Which rich submerged underwater plateau off the coast of Newfoundland was historically one of the world most productive Atlantic cod fishing grounds?",
        correct: "Grand Banks of Newfoundland",
        w1: "Georges Bank",
        w2: "Flemish Cap",
        exp: "The mixing of the cold Labrador Current and the warm Gulf Stream creates dense fog and nutrient-rich upwelling that sustained European cod fleets for centuries."
      }
    ],
    number: {
      q: "What maximum tidal range in meters can be recorded in the upper basins of the Bay of Fundy during spring tides?",
      target: 16,
      unit: "meters",
      imperial: "53 feet (equivalent to a 5-story building)",
      exp: "During extreme spring tides at Burntcoat Head in Minas Basin, the Bay of Fundy tidal range reaches sixteen meters."
    }
  },

  // Cycle 6: The Prairie Provinces & Boreal Transition
  {
    mcqs: [
      {
        q: "Which three Canadian provinces (Alberta, Saskatchewan, and Manitoba) comprise the vast agricultural grain-growing heartland known as the Canadian Prairies?",
        correct: "Prairie Provinces",
        w1: "Maritime Provinces",
        w2: "Territorial Provinces",
        exp: "The Prairies are characterized by flat to undulating sedimentary plains, fertile chernozemic black soils, and continental climates ideal for wheat and canola."
      },
      {
        q: "Which badlands town in the Red Deer River valley of Alberta is world-famous as the Dinosaur Capital of Canada and home of the Royal Tyrrell Museum?",
        correct: "Drumheller",
        w1: "Brooks",
        w2: "Medicine Hat",
        exp: "Dinosaur Provincial Park nearby has yielded hundreds of intact dinosaur skeletons, including Albertosaurus, Centrosaurus, and Corythosaurus."
      },
      {
        q: "What massive freshwater lake in central Manitoba is the tenth largest freshwater lake in the world by surface area, covering 24,500 square kilometers?",
        correct: "Lake Winnipeg",
        w1: "Lake Manitoba",
        w2: "Lake Athabasca",
        exp: "Lake Winnipeg is a remnant of glacial Lake Agassiz, draining a vast watershed from the Rockies to Ontario before emptying via the Nelson River into Hudson Bay."
      },
      {
        q: "Which city is the capital and largest metropolitan city of Manitoba, located at the historic confluence of the Red and Assiniboine rivers?",
        correct: "Winnipeg",
        w1: "Regina",
        w2: "Saskatoon",
        exp: "Winnipeg is home to the Canadian Museum for Human Rights, historic Exchange District architecture, and the Red River Floodway diversion canal."
      },
      {
        q: "What vast deposits of heavy crude bitumen in northeastern Alberta around Fort McMurray represent one of the world largest proven petroleum reserves?",
        correct: "Athabasca Oil Sands",
        w1: "Bakken Formation",
        w2: "Peace River Deposits",
        exp: "The oil sands contain an estimated 165 billion barrels of recoverable bitumen, extracted using surface open-pit mining and steam-assisted gravity drainage (SAGD)."
      }
    ],
    number: {
      q: "What is the approximate surface area in thousands of square kilometers of Lake Winnipeg in Manitoba?",
      target: 25,
      unit: "thousand square kilometers",
      imperial: "9,460 square miles",
      exp: "Lake Winnipeg covers approximately 24,514 square kilometers (rounded to 25k sq km), making it the largest lake in southern Canada."
    }
  },

  // Cycle 7: Major Cities & National Capitals
  {
    mcqs: [
      {
        q: "What is the national capital of Canada, chosen by Queen Victoria in 1857 on the border of Ontario and Quebec along the Ottawa River?",
        correct: "Ottawa",
        w1: "Montreal",
        w2: "Toronto",
        exp: "Ottawa features the Parliament Buildings on Parliament Hill and the historic 202-kilometer Rideau Canal, which transforms into the world largest ice skating rink in winter."
      },
      {
        q: "What is the largest city in Canada by population, located on the northwestern shore of Lake Ontario, dominated by the 553-meter CN Tower?",
        correct: "Toronto",
        w1: "Montreal",
        w2: "Calgary",
        exp: "Toronto is the financial capital of Canada and one of the most multicultural cities on Earth, with more than half of its residents born outside of Canada."
      },
      {
        q: "Which island city in Quebec along the St. Lawrence River is the second most populous primarily French-speaking city in the developed world after Paris?",
        correct: "Montreal",
        w1: "Quebec City",
        w2: "Gatineau",
        exp: "Named after Mount Royal at its center, Montreal is famous for Old Montreal cobblestone squares, the Notre-Dame Basilica, and vibrant culinary arts."
      },
      {
        q: "Which historic provincial capital is the only remaining fortified walled city in North America north of Mexico, founded by Samuel de Champlain in 1608?",
        correct: "Quebec City",
        w1: "Halifax",
        w2: "St. John",
        exp: "The UNESCO World Heritage Historic District of Old Quebec is crowned by the iconic castle-like Château Frontenac hotel overlooking the St. Lawrence River."
      },
      {
        q: "Which major Pacific coastal city in British Columbia is Canada busiest seaport and gateway to Asia, framed by the North Shore Mountains?",
        correct: "Vancouver",
        w1: "Victoria",
        w2: "Kelowna",
        exp: "Vancouver is consistently ranked among the world most livable cities, renowned for Stanley Park, Granville Island, and mild coastal rainforest climates."
      }
    ],
    number: {
      q: "What is the total architectural height in meters of the CN Tower in downtown Toronto?",
      target: 553,
      unit: "meters",
      imperial: "1,815 feet",
      exp: "Completed in 1976, the CN Tower stood as the world tallest freestanding structure for over thirty-one years at 553.3 meters."
    }
  },

  // Cycle 8: Canadian Arctic Ecology & Wildlife
  {
    mcqs: [
      {
        q: "What apex marine mammal of the Arctic, known scientifically as Ursus maritimus, depends on winter sea ice platforms to hunt ringed and bearded seals?",
        correct: "Polar Bear",
        w1: "Grizzly Bear",
        w2: "Kermode Spirit Bear",
        exp: "Roughly two-thirds of the world estimated 26,000 wild polar bears live across the Canadian Arctic archipelago and Hudson Bay coastline."
      },
      {
        q: "What Arctic whale species is nicknamed the Unicorn of the Sea due to the long, spiral ivory tusk that erupts from the upper left jaw of males?",
        correct: "Narwhal Monodon monoceros",
        w1: "Beluga Whale",
        w2: "Bowhead Whale",
        exp: "The sensory tusk can grow up to three meters long, containing millions of nerve endings used to detect ocean salinity, temperature, and pressure."
      },
      {
        q: "Which stocky, shaggy-coated Arctic ungulate has survived since the Pleistocene Ice Age, protected by an underwool coat called qiviut?",
        correct: "Muskox Ovibos moschatus",
        w1: "Caribou",
        w2: "Bison",
        exp: "Qiviut is eight times warmer than sheep wool by weight, allowing muskoxen to withstand howling minus-fifty-degree blizzards on the Arctic tundra."
      },
      {
        q: "Which rare white-furred black bear subspecies, considered sacred in First Nations oral traditions, inhabits the Great Bear Rainforest of British Columbia?",
        correct: "Kermode Spirit Bear",
        w1: "Albino Black Bear",
        w2: "Polar-Grizzly Hybrid",
        exp: "The white coat is caused by a recessive genetic mutation (mcr1 gene), providing camouflage when fishing for migrating Pacific salmon in sparkling river rapids."
      },
      {
        q: "What migratory deer species (reindeer) undertakes epic seasonal migrations of over one thousand kilometers across the tundra of northern Canada and Alaska?",
        correct: "Barren-Ground Caribou",
        w1: "Moose",
        w2: "Elk Wapiti",
        exp: "The Porcupine and Qamanirjuaq caribou herds provide vital subsistence food, clothing, and cultural heritage to northern Dene and Inuit communities."
      }
    ],
    number: {
      q: "What maximum length in meters can the straight helical tusk of an adult male Narwhal reach?",
      target: 3,
      unit: "meters",
      imperial: "9.8 feet long",
      exp: "Male narwhal tusks are modified canine teeth that can grow up to three meters in length and weigh up to ten kilograms."
    }
  },

  // Cycle 9: Coastlines, Fjords & Vancouver Island
  {
    mcqs: [
      {
        q: "Which country in the world possesses the longest total coastline of any nation, measuring 243,042 kilometers across three oceans?",
        correct: "Canada",
        w1: "Norway",
        w2: "Indonesia",
        exp: "Canada coastline borders the Pacific, Arctic, and Atlantic Oceans, with over 52,000 islands contributing to its immense perimeter."
      },
      {
        q: "What is the highest mountain peak in Canada, rising 5,959 meters in the Saint Elias Mountains of Kluane National Park in the Yukon?",
        correct: "Mount Logan",
        w1: "Mount Saint Elias",
        w2: "Mount Lucania",
        exp: "Mount Logan has the largest base circumference of any non-volcanic mountain on Earth, supporting massive alpine glaciers and sub-zero summit temperatures."
      },
      {
        q: "What large Pacific island in southwestern British Columbia is home to the provincial capital Victoria and the rugged West Coast Trail?",
        correct: "Vancouver Island",
        w1: "Haida Gwaii",
        w2: "Salt Spring Island",
        exp: "Vancouver Island spans 31,285 square kilometers, containing ancient temperate rainforests with giant Douglas firs and western red cedars in Cathedral Grove."
      },
      {
        q: "Which remote archipelago off the northern coast of British Columbia is the ancestral homeland of the Haida Nation, famous for ancient cedar totem poles?",
        correct: "Haida Gwaii Queen Charlotte Islands",
        w1: "Discovery Islands",
        w2: "Gulf Islands",
        exp: "SGang Gwaay (Anthony Island) is a UNESCO World Heritage site featuring surviving 19th-century carved cedar mortuary poles and longhouses."
      },
      {
        q: "What protected coastal marine navigation route weaves through island channels between Washington State, British Columbia, and Alaska?",
        correct: "The Inside Passage",
        w1: "The Northwest Passage",
        w2: "The Strait of Georgia",
        exp: "The Inside Passage provides sheltered, calm waters for ferries, freighters, and cruise ships passing fjords and glacier-carved channels."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Mount Logan, the highest mountain peak in Canada?",
      target: 5959,
      unit: "meters",
      imperial: "19,551 feet",
      exp: "Mount Logan in Kluane National Park, Yukon, stands at an official elevation of 5,959 meters above sea level."
    }
  },

  // Cycle 10: Extent, Provinces & Canadian Geographic Superlatives
  {
    mcqs: [
      {
        q: "Into how many total provinces and territories is the nation of Canada divided?",
        correct: "10 Provinces and 3 Territories",
        w1: "12 Provinces and 2 Territories",
        w2: "9 Provinces and 4 Territories",
        exp: "Canada consists of ten provinces exercising constitutional authority and three northern territories (Yukon, NWT, Nunavut) delegated powers by the federal parliament."
      },
      {
        q: "What is the total length of the Canada-United States border, making it the longest undefended international land border in the world?",
        correct: "8,891 Kilometers",
        w1: "6,500 Kilometers",
        w2: "11,200 Kilometers",
        exp: "The border encompasses 6,416 kilometers along the southern border (much along the 49th parallel) and 2,475 kilometers bordering Alaska."
      },
      {
        q: "What is the longest national highway in the world, spanning 7,821 kilometers across all ten Canadian provinces from Victoria to St. John?",
        correct: "Trans-Canada Highway",
        w1: "Yellowhead Highway",
        w2: "Alaska Highway",
        exp: "Inaugurated in 1962, the Trans-Canada Highway (Highway 1) connects Pacific and Atlantic ferry terminals, marked by white-on-green maple leaf shields."
      },
      {
        q: "What ranking does Canada hold among the largest countries in the world by total geographical area (encompassing land and freshwater)?",
        correct: "Second Largest Country",
        w1: "Largest Country",
        w2: "Third Largest Country",
        exp: "Covering 9.98 million square kilometers, Canada is second in total area only to the Russian Federation."
      },
      {
        q: "Across how many standard time zones does the country of Canada span from Newfoundland in the east to the Yukon in the west?",
        correct: "6 Time Zones",
        w1: "4 Time Zones",
        w2: "8 Time Zones",
        exp: "Canada spans Pacific, Mountain, Central, Eastern, Atlantic, and the unique Newfoundland Time Zone (which is thirty minutes ahead of Atlantic Time)."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Canada-United States international border?",
      target: 8891,
      unit: "kilometers",
      imperial: "5,525 miles",
      exp: "The international boundary between Canada and the United States stretches for 8,891 kilometers (5,525 miles)."
    }
  }
];

// Build Canada Quiz
buildQuiz({
  id: 'canada-geography-heritage-60',
  theme: 'Canada: Geography, Wilderness & Great Lakes',
  title: 'Canada: Geography, Wilderness & Great Lakes',
  description: 'A 60-question grand master assessment exploring the Canadian Shield, Banff & the Rockies, the Great Lakes & Niagara, Nunavut & Arctic islands, Bay of Fundy tides, Prairies, major cities, Arctic wildlife, and Mount Logan.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, canadaCycles);

console.log('Canada quiz built successfully!');
