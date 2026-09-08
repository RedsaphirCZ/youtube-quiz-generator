const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 4. south-africa-geography-heritage-60
// =========================================================================
const saCycles = [
  // Cycle 1: Table Mountain & The Cape Peninsula
  {
    mcqs: [
      {
        q: "What iconic 1,086-meter flat-topped sandstone mountain overlooks Cape Town and Table Bay, one of the New 7 Wonders of Nature?",
        correct: "Table Mountain",
        w1: "Lion Head",
        w2: "Devil Peak",
        exp: "Table Mountain is frequently enveloped in a thick white orographic cloud layer known locally as the Tablecloth, formed by moist southeasterly winds."
      },
      {
        q: "What famous rocky promontory at the southern tip of the Cape Peninsula was historically named the Cape of Storms by Portuguese navigator Bartolomeu Dias in 1488?",
        correct: "Cape of Good Hope",
        w1: "Cape Agulhas",
        w2: "Cape St Francis",
        exp: "King John II of Portugal renamed it Cabo da Boa Esperança (Cape of Good Hope) to reflect the great optimism of discovering a sea route to India."
      },
      {
        q: "Which sheltered white-sand beach near Simon Town on the Cape Peninsula is famous for a land-based colony of endangered African penguins?",
        correct: "Boulders Beach",
        w1: "Camps Bay",
        w2: "Muizenberg",
        exp: "Boulders Beach features granite boulders that protect calm inlets where over two thousand wild African (jackass) penguins nest and swim."
      },
      {
        q: "What world-renowned botanical garden on the eastern slopes of Table Mountain was the first botanical garden in the world dedicated exclusively to native indigenous flora?",
        correct: "Kirstenbosch National Botanical Garden",
        w1: "Company Garden",
        w2: "Walter Sisulu Garden",
        exp: "Established in 1913, Kirstenbosch features the Centenary Tree Canopy Walkway (The Boomslang), showcasing the unique biodiversity of the Cape fynbos."
      },
      {
        q: "Which historic island in Table Bay, nine kilometers off the coast of Cape Town, served as a maximum-security prison where Nelson Mandela was incarcerated for eighteen years?",
        correct: "Robben Island",
        w1: "Dassen Island",
        w2: "Seal Island",
        exp: "Now a UNESCO World Heritage site and museum, Robben Island symbolizes the triumph of human spirit and democratic freedom over the apartheid regime."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Table Mountain overlooking Cape Town?",
      target: 1086,
      unit: "meters",
      imperial: "3,563 feet",
      exp: "Table Mountain stands at an official elevation of 1,086 meters at Maclear's Beacon on the eastern end of the plateau."
    }
  },

  // Cycle 2: The Drakensberg & High Escarpment
  {
    mcqs: [
      {
        q: "What is the highest mountain range in Southern Africa, stretching over 1,000 kilometers along the eastern edge of the Great Escarpment?",
        correct: "The Drakensberg uKhahlamba",
        w1: "The Swartberg",
        w2: "The Cederberg",
        exp: "Known in Zulu as uKhahlamba (Barrier of Spears) and Afrikaans as Drakensberg (Dragon Mountains), the range forms the eastern border of Lesotho."
      },
      {
        q: "What spectacular five-tiered waterfall in Royal Natal National Park in the Drakensberg is recognized as the second tallest waterfall on Earth, plunging 983 meters?",
        correct: "Tugela Falls",
        w1: "Augrabies Falls",
        w2: "Howick Falls",
        exp: "Tugela Falls drops in five distinct cascades over the basalt face of the Amphitheatre, originating from Mont-aux-Sources in the High Drakensberg."
      },
      {
        q: "What massive, semicircular basalt cliff face in the Northern Drakensberg stretches for five kilometers, rising 1,200 meters vertically?",
        correct: "The Amphitheatre",
        w1: "Giant Castle",
        w2: "Cathkin Peak",
        exp: "The Amphitheatre is one of the most impressive cliff walls on Earth, flanking the Tugela Gorge and accessible via chain ladders to the summit plateau."
      },
      {
        q: "What is the highest mountain peak in South Africa, rising 3,450 meters on the international border with the Kingdom of Lesotho?",
        correct: "Mafadi",
        w1: "Thabana Ntlenyana",
        w2: "Champagne Castle",
        exp: "Mafadi is located in the Central Drakensberg, while neighboring Thabana Ntlenyana (3,482 m) inside Lesotho is the highest peak in Southern Africa."
      },
      {
        q: "Which ancient hunter-gatherer people created over 35,000 individual rock art paintings depicting eland and shamanic rituals across the caves of the Drakensberg?",
        correct: "San People Bushmen",
        w1: "Khoikhoi",
        w2: "Bantu",
        exp: "The UNESCO-inscribed Maloti-Drakensberg Park preserves thousands of years of spiritual San rock art painted with natural iron oxides and animal blood."
      }
    ],
    number: {
      q: "What is the total combined height in meters of the five cascades of Tugela Falls in the Drakensberg?",
      target: 983,
      unit: "meters",
      imperial: "3,225 feet tall",
      exp: "Tugela Falls drops a total vertical distance of 983 meters from the summit plateau of the Amphitheatre."
    }
  },

  // Cycle 3: Kruger National Park & The Lowveld
  {
    mcqs: [
      {
        q: "What is the largest and most famous game reserve in South Africa, covering nearly 20,000 square kilometers across Limpopo and Mpumalanga?",
        correct: "Kruger National Park",
        w1: "Hluhluwe-iMfolozi Park",
        w2: "Addo Elephant National Park",
        exp: "Spanning 360 kilometers from north to south (roughly the size of Israel or Slovenia), Kruger is home to over 147 mammal species."
      },
      {
        q: "Which legendary group of five African safari wildlife animals comprises the lion, leopard, rhinoceros, African elephant, and Cape buffalo?",
        correct: "The Big Five",
        w1: "The Dangerous Seven",
        w2: "The Grand Giants",
        exp: "Originally coined by 19th-century big-game hunters for the five most dangerous animals to hunt on foot, the Big Five are depicted on South African Rand banknotes."
      },
      {
        q: "What low-altitude subtropical savanna biome in northeastern South Africa encompasses Kruger National Park and private reserves like Sabi Sand?",
        correct: "The Lowveld",
        w1: "The Highveld",
        w2: "The Karoo",
        exp: "The Lowveld is characterized by marula trees, mopane shrublands, umbrella thorn acacias, and major rivers like the Sabie and Olifants."
      },
      {
        q: "Which national park in the Eastern Cape was founded in 1931 when only eleven wild elephants remained, now home to over six hundred elephants?",
        correct: "Addo Elephant National Park",
        w1: "Pilanesberg National Park",
        w2: "Marakele National Park",
        exp: "Addo preserves the dense, spiny spekboom succulent thicket, an exceptional carbon-absorbing plant that provides nutritious fodder for megafauna."
      },
      {
        q: "Which reserve in KwaZulu-Natal established in 1895 is the oldest proclaimed nature reserve in Africa, famous for Operation Rhino that saved the southern white rhino?",
        correct: "Hluhluwe-iMfolozi Park",
        w1: "Kruger National Park",
        w2: "Ithala Game Reserve",
        exp: "Conservationist Ian Player led the capture and translocation of white rhinos in the 1960s, rebuilding global populations from fewer than one hundred surviving animals."
      }
    ],
    number: {
      q: "What is the approximate total land area in thousands of square kilometers of Kruger National Park in South Africa?",
      target: 19,
      unit: "thousand square kilometers",
      imperial: "7,523 square miles",
      exp: "Kruger National Park encompasses 19,485 square kilometers (rounded to 19k sq km) of protected African wilderness."
    }
  },

  // Cycle 4: Major Cities & Three Capitals
  {
    mcqs: [
      {
        q: "How many official national capital cities does the Republic of South Africa possess to divide governmental powers among its three branches?",
        correct: "3 Capitals",
        w1: "1 Capital",
        w2: "2 Capitals",
        exp: "South Africa has three capitals: Pretoria (executive administration), Cape Town (legislative parliament), and Bloemfontein (judicial Supreme Court)."
      },
      {
        q: "What is the largest city in South Africa by population and the economic powerhouse of the African continent, nicknamed eGoli (City of Gold)?",
        correct: "Johannesburg",
        w1: "Cape Town",
        w2: "Durban",
        exp: "Johannesburg was founded in 1886 following the discovery of the world richest gold reef on the Witwatersrand, home to the Carlton Centre and Sandton."
      },
      {
        q: "Which city serves as the executive administrative capital of South Africa, famous for its purple jacaranda blossoms and the Union Buildings?",
        correct: "Pretoria Tshwane",
        w1: "Johannesburg",
        w2: "Bloemfontein",
        exp: "The historic sandstone Union Buildings, designed by Sir Herbert Baker in 1913, house the office of the President, fronted by a nine-meter bronze statue of Nelson Mandela."
      },
      {
        q: "Which major coastal port city in KwaZulu-Natal on the Indian Ocean is the busiest container port in Sub-Saharan Africa, famous for its Golden Mile beachfront?",
        correct: "Durban eThekwini",
        w1: "Port Elizabeth Gqeberha",
        w2: "East London",
        exp: "Durban is home to the largest population of Indian descent outside of India, famous for spicy Bunny Chow street food and warm subtropical surf breaks."
      },
      {
        q: "Which famous historic street in Soweto (South Western Townships), Johannesburg, is the only street in the world where two Nobel Peace Prize laureates lived?",
        correct: "Vilakazi Street",
        w1: "Mandela Way",
        w2: "Tutu Avenue",
        exp: "Both Nelson Mandela and Archbishop Desmond Tutu lived on Vilakazi Street in Orlando West, today a major historical pilgrimage site."
      }
    ],
    number: {
      q: "How many official national capital cities share governmental administration in the Republic of South Africa?",
      target: 3,
      unit: "capital cities",
      imperial: "3 official capitals (Pretoria, Cape Town, Bloemfontein)",
      exp: "South Africa divides its governance across three constitutional capitals: Pretoria (executive), Cape Town (legislative), and Bloemfontein (judicial)."
    }
  },

  // Cycle 5: The Cape Floral Kingdom & Fynbos
  {
    mcqs: [
      {
        q: "What is the smallest yet most species-dense of the world six recognized floral kingdoms, located entirely within the Western and Eastern Cape of South Africa?",
        correct: "Cape Floristic Region",
        w1: "Boreal Floral Kingdom",
        w2: "Paleotropical Kingdom",
        exp: "Covering less than 0.5% of Africa, the Cape Floral Kingdom contains over 9,000 vascular plant species, sixty-nine percent of which are found nowhere else on Earth."
      },
      {
        q: "What distinctive, fire-adapted evergreen Mediterranean shrubland vegetation, meaning 'fine bush' in Afrikaans, dominates the Cape Floral Kingdom?",
        correct: "Fynbos",
        w1: "Renosterveld",
        w2: "Succulent Karoo",
        exp: "Fynbos consists primarily of four distinct plant families: proteas (sugarbushes), ericas (heaths), restios (reed-like grasses), and geophytes (bulbs)."
      },
      {
        q: "What magnificent flowering plant, characterized by large artichoke-like flower heads with pink petal-like bracts, is the national flower of South Africa?",
        correct: "King Protea Protea cynaroides",
        w1: "Strelitzia Bird of Paradise",
        w2: "Arum Lily",
        exp: "The King Protea has a thick underground stem containing dormant buds that allow it to regenerate rapidly after natural wildfire cycles in the fynbos."
      },
      {
        q: "Which endemic shrub grown in the Cederberg mountains of the Western Cape produces the naturally caffeine-free herbal red tea exported globally?",
        correct: "Rooibos Aspalathus linearis",
        w1: "Honeybush",
        w2: "Buchu",
        exp: "Indigenous Khoisan people harvested wild rooibos for centuries, which undergoes oxidation to develop its sweet, woody, mahogany-red infusion."
      },
      {
        q: "How many distinct major Floral Kingdoms (Phytochoria) are recognized by botanists across the entire planet Earth?",
        correct: "6 Floral Kingdoms",
        w1: "4 Floral Kingdoms",
        w2: "8 Floral Kingdoms",
        exp: "The six global floral kingdoms are Holarctic, Paleotropical, Neotropical, Cape, Australian, and Antarctic."
      }
    ],
    number: {
      q: "How many distinct primary Floral Kingdoms of the world are recognized by global biogeographers?",
      target: 6,
      unit: "floral kingdoms",
      imperial: "6 Floral Kingdoms globally",
      exp: "The world is divided into six floral kingdoms, with South Africa's Cape Floral Kingdom being the smallest and richest by area."
    }
  },

  // Cycle 6: The Garden Route, Karoo & Coastal Wonders
  {
    mcqs: [
      {
        q: "What famous 300-kilometer scenic coastal driving route stretches along the southwestern coast of South Africa between Mossel Bay and Storms River?",
        correct: "The Garden Route",
        w1: "The Panorama Route",
        w2: "The Wild Coast",
        exp: "The Garden Route winds past ancient temperate yellowwood forests, coastal lagoons in Knysna, dramatic sea cliffs, and world-class golf resorts."
      },
      {
        q: "Which coastal town on the Garden Route is famous for two towering sandstone headlands (The Heads) guarding the entrance to a tidal lagoon and oyster festival?",
        correct: "Knysna",
        w1: "Plettenberg Bay",
        w2: "George",
        exp: "Knysna was historically a major timber logging port, famous for the elusive Knysna elephants roaming deep inside the indigenous milkwood forests."
      },
      {
        q: "What arch bridge over the Bloukrans River on the Garden Route is home to the world highest commercial bungee jump from an arch bridge at 216 meters?",
        correct: "Bloukrans Bridge",
        w1: "Gouritz Bridge",
        w2: "Storms River Bridge",
        exp: "Jumpers experience five seconds of freefall at 120 km/h toward the Bloukrans River gorge, operated by Face Adrenalin since 1997."
      },
      {
        q: "What vast, arid semi-desert plateau in the interior of South Africa is known for sheep farming, star-gazing telescopes in Sutherland, and fossil deposits?",
        correct: "The Karoo Great and Little Karoo",
        w1: "The Highveld",
        w2: "The Bushveld",
        exp: "Covering over 400,000 square kilometers, the Karoo is home to the South African Astronomical Observatory (SALT) and the Square Kilometre Array (SKA) radio telescope."
      },
      {
        q: "Which spectacular 20-million-year-old limestone cave system in the Swartberg foothills near Oudtshoorn features monumental dripstone stalactites and caverns?",
        correct: "Cango Caves",
        w1: "Sterkfontein Caves",
        w2: "Sudwala Caves",
        exp: "Cango Caves extends for over four kilometers into the Precambrian limestone ridge, discovered by local farmer Jacobus van Zyl in 1780."
      }
    ],
    number: {
      q: "What is the height in meters of the commercial bungee jump platform on the Bloukrans Bridge along the Garden Route?",
      target: 216,
      unit: "meters",
      imperial: "709 feet freefall",
      exp: "The Bloukrans Bridge bungee jump drops 216 meters into the river gorge below, the highest bridge bungee jump in the world."
    }
  },

  // Cycle 7: Blyde River Canyon & The Panorama Route
  {
    mcqs: [
      {
        q: "What 26-kilometer canyon in Mpumalanga is recognized as the third largest canyon on Earth and the largest green vegetated canyon in the world?",
        correct: "Blyde River Canyon Motlatse Canyon",
        w1: "Fish River Canyon",
        w2: "Copper Canyon",
        exp: "Carved into red sandstone and quartzite cliffs of the Drakensberg escarpment, the canyon reaches depths of eight hundred meters, covered in lush subtropical foliage."
      },
      {
        q: "What iconic geological viewpoint in the Blyde River Canyon features three massive rounded quartzite rock peaks resembling traditional thatched African round huts?",
        correct: "The Three Rondavels Three Sisters",
        w1: "God Window",
        w2: "Pinnacle Rock",
        exp: "The Three Rondavels rise seven hundred meters above the surrounding river basin, named after the three wives of 19th-century Bapedi Chief Maripi Mashile."
      },
      {
        q: "What remarkable geological formation at the confluence of the Blyde and Treur rivers features cylindrical rock potholes carved by swirling river pebbles?",
        correct: "Bourke Luck Potholes",
        w1: "Mac-Mac Potholes",
        w2: "Lisbon Potholes",
        exp: "Named after gold prospector Tom Bourke, thousands of years of water vortex action carved smooth deep yellow and red sandstone plunge pools."
      },
      {
        q: "What famous escarpment cliff lookout on the Panorama Route offers panoramic views plunging 700 meters straight down into the Lowveld savanna below?",
        correct: "God Window",
        w1: "Wonder View",
        w2: "Devil Window",
        exp: "On clear days, visitors looking out from God's Window can see past the Kruger National Park plains all the way to the Lebombo Mountains on the Mozambique border."
      },
      {
        q: "What 65-meter twin waterfall near Sabie was declared a national monument after miners blasted the cliff with dynamite in 1873 to split the gold-bearing stream?",
        correct: "Mac-Mac Falls",
        w1: "Lisbon Falls",
        w2: "Berlin Falls",
        exp: "President Thomas Burgers named the area Mac-Mac because so many Scottish gold diggers who joined the gold rush had names starting with Mac."
      }
    ],
    number: {
      q: "What is the approximate maximum depth in meters of the Blyde River Canyon in Mpumalanga?",
      target: 800,
      unit: "meters",
      imperial: "2,625 feet deep",
      exp: "The lushly vegetated sandstone cliffs of the Blyde River Canyon drop up to 800 meters from the escarpment to the river floor."
    }
  },

  // Cycle 8: Diamond & Gold Mining Heritage
  {
    mcqs: [
      {
        q: "What colossal 215-meter-deep hand-dug diamond mine crater in Kimberley was excavated by 50,000 miners using picks and shovels between 1871 and 1914?",
        correct: "The Big Hole Kimberley Mine",
        w1: "Premier Mine",
        w2: "Jagersfontein Mine",
        exp: "Miners removed 22.5 million tons of earth to yield 2,722 kilograms (14.5 million carats) of diamonds, founding the De Beers consolidated diamond empire."
      },
      {
        q: "What is the largest gem-quality rough diamond ever found in human history, discovered at the Premier No. 2 mine in Cullinan in 1905, weighing 3,106 carats?",
        correct: "Cullinan Diamond",
        w1: "Koh-i-Noor",
        w2: "Hope Diamond",
        exp: "Cut by Joseph Asscher into nine major gems, Cullinan I (Great Star of Africa, 530 carats) and Cullinan II are set into the British Crown Jewels."
      },
      {
        q: "What geological basin in Gauteng and the Free State produced more than forty percent of all the gold ever mined in recorded human history?",
        correct: "Witwatersrand Basin The Rand",
        w1: "Barberton Greenstone Belt",
        w2: "Pilgrim Rest Basin",
        exp: "Formed 2.7 billion years ago, the gold-bearing quartz pebble conglomerates of the Witwatersrand led to deep-level underground mines reaching four kilometers depth."
      },
      {
        q: "Which UNESCO World Heritage paleoanthropological site northwest of Johannesburg contains the Sterkfontein Caves, where hominid fossils like Mrs. Ples were discovered?",
        correct: "Cradle of Humankind",
        w1: "Makapansgat",
        w2: "Taung Skull Site",
        exp: "The Cradle of Humankind has yielded more than one-third of all early hominid fossils ever found on Earth, including Australopithecus africanus specimens."
      },
      {
        q: "What 2.02-billion-year-old meteorite impact structure in the Free State is the oldest and largest verified impact crater on Earth, measuring 300 km across?",
        correct: "Vredefort Dome",
        w1: "Chicxulub Crater",
        w2: "Sudbury Basin",
        exp: "A 10-15 kilometer asteroid struck Earth, releasing immense energy that overturned granite strata and preserved the gold-bearing Witwatersrand basin from erosion."
      }
    ],
    number: {
      q: "What was the raw weight in carats of the monumental Cullinan Diamond discovered in South Africa in 1905?",
      target: 3106,
      unit: "carats",
      imperial: "1.37 pounds (3,106 carats)",
      exp: "The Cullinan Diamond weighed 3,106 carats (621.35 grams), discovered by Frederick Wells at the Premier Mine on January 26, 1905."
    }
  },

  // Cycle 9: The Kalahari, Orange River & Atlantic Desert
  {
    mcqs: [
      {
        q: "What is the longest river in South Africa, flowing 2,200 kilometers westward from the Drakensberg mountains of Lesotho into the Atlantic Ocean at Alexander Bay?",
        correct: "Orange River Gariep",
        w1: "Vaal River",
        w2: "Limpopo River",
        exp: "Named in honor of the Dutch House of Orange, the Gariep provides vital irrigation for green vineyard oases across the arid Northern Cape."
      },
      {
        q: "What spectacular 56-meter waterfall on the Orange River in the Northern Cape plunges into a rugged eighteen-kilometer granite gorge, named from a Khoi word meaning 'place of great noise'?",
        correct: "Augrabies Falls",
        w1: "Tugela Falls",
        w2: "Elands River Falls",
        exp: "During seasonal high floods, Augrabies Falls discharges over 400 million gallons of water per minute through its roaring granite chasm."
      },
      {
        q: "What massive 38,000-square-kilometer transfrontier conservation park spanning South Africa and Botswana is famous for red sand dunes and black-maned Kalahari lions?",
        correct: "Kgalagadi Transfrontier Park",
        w1: "Richtersveld Park",
        w2: "Gondwana Reserve",
        exp: "Formed in 2000 as Africa first peace park, the Kgalagadi allows wildlife and seasonal herds of gemsbok, springbok, and eland to roam freely across national borders."
      },
      {
        q: "What mountainous desert national park in the extreme northwest bend of the Northern Cape preserves the ancient nomadic pastoralist culture of the Nama people?",
        correct: "Richtersveld Cultural and Botanical Landscape",
        w1: "Tankwa Karoo",
        w2: "Namaqua National Park",
        exp: "The UNESCO World Heritage Richtersveld features extreme volcanic mountains and bizarre succulent trees like the halfmens (Pachypodium namaquanum) and quiver trees."
      },
      {
        q: "Which arid region along the Atlantic coast of the Northern Cape transforms for a few weeks in August and September into a dazzling carpet of millions of blooming orange and purple wildflowers?",
        correct: "Namaqualand",
        w1: "The Overberg",
        w2: "The Swartland",
        exp: "Following brief winter rains, dormant seeds of thousands of endemic daisy species burst into synchronized bloom, drawing botanists from around the world."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Orange River (Gariep), the longest river in South Africa?",
      target: 2200,
      unit: "kilometers",
      imperial: "1,367 miles",
      exp: "The Orange River flows for approximately 2,200 kilometers across Southern Africa to the Atlantic Ocean."
    }
  },

  // Cycle 10: Extent, 9 Provinces & Constitutional Superlatives
  {
    mcqs: [
      {
        q: "What is the official southernmost geographical point of the African continent and the exact dividing point between the Atlantic and Indian Oceans?",
        correct: "Cape Agulhas Cabo das Agulhas",
        w1: "Cape of Good Hope",
        w2: "Cape Point",
        exp: "Located at 34 degrees 50 minutes South, Cape Agulhas (Cape of Needles) was named by Portuguese mariners because magnetic north and true north coincided here in 1500."
      },
      {
        q: "Which independent sovereign kingdom is completely enclaved and surrounded entirely on all sides by the territory of South Africa?",
        correct: "Kingdom of Lesotho",
        w1: "Kingdom of Eswatini",
        w2: "Botswana",
        exp: "Known as the Mountain Kingdom, Lesotho is the only independent state in the world that lies entirely above 1,000 meters in elevation."
      },
      {
        q: "Into how many administrative provinces is the Republic of South Africa divided following the end of apartheid in 1994?",
        correct: "9 Provinces",
        w1: "4 Provinces",
        w2: "11 Provinces",
        exp: "The nine provinces are Gauteng, Western Cape, KwaZulu-Natal, Eastern Cape, Limpopo, Mpumalanga, Free State, North West, and Northern Cape."
      },
      {
        q: "How many official languages are constitutionally recognized in South Africa, following the formal addition of South African Sign Language in 2023?",
        correct: "12 Official Languages",
        w1: "11 Official Languages",
        w2: "9 Official Languages",
        exp: "The languages include Zulu, Xhosa, Afrikaans, English, Northern Sotho, Tswana, Sotho, Tsonga, Swazi, Venda, Ndebele, and South African Sign Language (SASL)."
      },
      {
        q: "What is the largest province in South Africa by geographical land area, covering over thirty percent of the national territory despite being the least populated?",
        correct: "Northern Cape",
        w1: "Eastern Cape",
        w2: "Free State",
        exp: "Covering 372,889 square kilometers (larger than Germany), the arid Northern Cape encompasses the Kalahari, Great Karoo, and Namaqualand with capital Kimberley."
      }
    ],
    number: {
      q: "How many official national languages are legally recognized in the Constitution of South Africa?",
      target: 12,
      unit: "official languages",
      imperial: "12 official languages",
      exp: "In July 2023, South African Sign Language became the 12th official language of South Africa, celebrating the country's Rainbow Nation diversity."
    }
  }
];

// Build South Africa Quiz
buildQuiz({
  id: 'south-africa-geography-heritage-60',
  theme: 'South Africa: Geography, Safari Wilderness & Rainbow Nation',
  title: 'South Africa: Geography, Safari Wilderness & Rainbow Nation',
  description: 'A 60-question grand master assessment exploring Table Mountain, the Drakensberg & Tugela Falls, Kruger National Park, 3 national capitals, the Cape Floral Kingdom & fynbos, Garden Route, Blyde River Canyon, diamond mines, and 12 official languages.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, saCycles);

console.log('South Africa quiz built successfully!');
