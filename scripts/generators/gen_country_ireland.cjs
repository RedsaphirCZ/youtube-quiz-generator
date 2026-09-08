const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 5. ireland-geography-heritage-60
// =========================================================================
const irelandCycles = [
  // Cycle 1: The Cliffs of Moher & The Wild Atlantic Way
  {
    mcqs: [
      {
        q: "What iconic sheer sea cliffs in County Clare drop 214 meters into the crashing Atlantic Ocean, one of the most visited natural attractions in Ireland?",
        correct: "The Cliffs of Moher",
        w1: "Slieve League",
        w2: "Kilkee Cliffs",
        exp: "Stretching for fourteen kilometers, the cliffs of Namurian shale and sandstone host over 30,000 pairs of breeding seabirds including Atlantic puffins and razorbills."
      },
      {
        q: "What 19th-century round stone observation tower, built in 1835 by Sir Cornelius O'Brien for Victorian tourists, marks the highest point of the Cliffs of Moher?",
        correct: "O Brien Tower",
        w1: "Moher Tower",
        w2: "Doolin Tower",
        exp: "From the tower rooftop, visitors can see across Galway Bay to the Aran Islands and the Twelve Bens mountains of Connemara."
      },
      {
        q: "What spectacular 2,500-kilometer designated coastal driving and touring route winds along the entire rugged western Atlantic coastline of Ireland from Donegal to Cork?",
        correct: "The Wild Atlantic Way",
        w1: "The Causeway Coastal Route",
        w2: "The Atlantic Highway",
        exp: "Passing through nine counties and three provinces, the Wild Atlantic Way is one of the longest defined coastal touring routes in the world."
      },
      {
        q: "What group of three rocky limestone islands in Galway Bay (Inis Mór, Inis Meáin, Inis Oírr) is famous for traditional Irish Gaelic speech and cable-knit woolen sweaters?",
        correct: "The Aran Islands Oileáin Árann",
        w1: "The Blasket Islands",
        w2: "The Skellig Islands",
        exp: "Inis Mór features Dún Aonghasa, a prehistoric semi-circular drystone ringfort perched on the edge of a 100-meter sheer cliff plunging into the Atlantic."
      },
      {
        q: "What colossal sea cliffs in County Donegal plunge 601 meters into the Atlantic, nearly three times higher than the Cliffs of Moher?",
        correct: "Slieve League Sliabh Liag",
        w1: "Horn Head",
        w2: "Croaghaun",
        exp: "Slieve League features the narrow ridge path One Man Pass, considered one of the highest and most dramatic accessible sea cliffs in Europe."
      }
    ],
    number: {
      q: "What is the maximum vertical cliff height in meters above the Atlantic Ocean at the highest point of the Cliffs of Moher in County Clare?",
      target: 214,
      unit: "meters",
      imperial: "702 feet sheer vertical drop",
      exp: "The Cliffs of Moher reach their maximum elevation of 214 meters just north of O'Brien's Tower."
    }
  },

  // Cycle 2: Newgrange & Ancient Megalithic Monuments
  {
    mcqs: [
      {
        q: "What monumental 5,200-year-old Stone Age passage tomb in the Boyne Valley (Brú na Bóinne), built around 3200 BCE, is older than Stonehenge and the Great Pyramids of Giza?",
        correct: "Newgrange Dún Fhgail",
        w1: "Knowth",
        w2: "Dowth",
        exp: "Constructed during the Neolithic period by stone-age farmers, the 85-meter-wide mound is retained by a 97-curbstone perimeter of carved megalithic art."
      },
      {
        q: "What extraordinary astronomical alignment occurs inside the inner burial chamber of Newgrange for seventeen minutes at dawn on the Winter Solstice (December 21)?",
        correct: "A beam of rising sunlight illuminates the burial chamber floor through a specialized roof-box opening",
        w1: "A full moon illuminates the central altar",
        w2: "The shadows form a cross",
        exp: "Engineered with astonishing mathematical precision, sunlight travels nineteen meters down the rising stone passageway to illuminate the three-recessed cross-shaped burial chamber."
      },
      {
        q: "What famous ancient Celtic art motif, featuring three interconnected rotating spirals, is carved into the colossal entrance stone at Newgrange?",
        correct: "The Triskele Triple Spiral",
        w1: "The Celtic Cross",
        w2: "The Ogham Script",
        exp: "The triskele is believed by archaeologists to represent celestial cycles, the sun movement, or concepts of life, death, and spiritual rebirth."
      },
      {
        q: "What sacred ceremonial hill in County Meath, crowned by the Stone of Destiny (Lia Fáil), was the ancient royal seat and coronation site of the High Kings of Ireland?",
        correct: "The Hill of Tara Cnoc na Teamhrach",
        w1: "Hill of Uisneach",
        w2: "Rock of Cashel",
        exp: "According to Irish mythology, when the rightful High King placed his feet upon the Lia Fáil stone, it would roar aloud in joy across the land."
      },
      {
        q: "Which neighboring Neolithic passage tomb in the Brú na Bóinne complex contains over one-third of all known megalithic rock art in Western Europe across its kerbstones?",
        correct: "Knowth",
        w1: "Dowth",
        w2: "Loughcrew",
        exp: "Knowth consists of a massive central mound surrounded by eighteen smaller satellite tombs, containing two back-to-back interior passage chambers."
      }
    ],
    number: {
      q: "Approximately how many years BCE was the prehistoric passage tomb of Newgrange constructed in the Boyne Valley of Ireland?",
      target: 3200,
      unit: "BCE",
      imperial: "3200 BC (5,200 years ago)",
      exp: "Carbon-14 dating confirms Newgrange was built around 3200 BCE, predating Stonehenge by 500 years and the Giza pyramids by 600 years."
    }
  },

  // Cycle 3: Dublin & The River Liffey
  {
    mcqs: [
      {
        q: "What capital and largest city of the Republic of Ireland, founded as a Viking trading settlement in 841 CE, lies at the mouth of the River Liffey?",
        correct: "Dublin Baile Átha Cliath",
        w1: "Cork",
        w2: "Galway",
        exp: "Dublin (derived from Dubh Linn meaning 'Black Pool') is home to nearly fourty percent of the national population in the Greater Dublin Area."
      },
      {
        q: "What iconic 1816 cast-iron pedestrian arch bridge spanning the River Liffey in Dublin is named after the toll historically charged to cross it?",
        correct: "The Ha penny Bridge Halfpenny Bridge",
        w1: "O Connell Bridge",
        w2: "Samuel Beckett Bridge",
        exp: "Officially named the Liffey Bridge, William Walsh was granted a 100-year lease to charge pedestrian ferry passengers a half-penny toll to cross the river."
      },
      {
        q: "Which world-famous university in Dublin, founded in 1592 by Queen Elizabeth I, houses the 65-meter Long Room library and the Book of Kells?",
        correct: "Trinity College Dublin",
        w1: "University College Dublin",
        w2: "Dublin City University",
        exp: "The Long Room holds 200,000 of the library oldest books, marble busts of Western philosophers by Louis-François Roubiliac, and the 15th-century Brian Boru Harp."
      },
      {
        q: "What masterfully illuminated 9th-century Latin manuscript of the four Gospels, created by Celtic monks around 800 CE, is on permanent display at Trinity College Dublin?",
        correct: "The Book of Kells Leabhar Cheanannais",
        w1: "The Book of Durrow",
        w2: "The Book of Armagh",
        exp: "Renowned for intricate Celtic knotwork, zoomorphic calligraphy, and lavish pigments (including lapis lazuli), it is widely considered Ireland greatest national treasure."
      },
      {
        q: "In what year did Arthur Guinness sign a famous 9,000-year lease at forty-five pounds per year for the St. James Gate Brewery in Dublin to brew dry Irish stout?",
        correct: "1759",
        w1: "1801",
        w2: "1715",
        exp: "The original 9,000-year parchment lease signed on December 31, 1759, is displayed under glass in the floor of the atrium at the Guinness Storehouse."
      }
    ],
    number: {
      q: "In what year did Arthur Guinness sign the legendary 9,000-year lease on the St. James's Gate Brewery in Dublin?",
      target: 1759,
      unit: "year",
      imperial: "1759 AD",
      exp: "Arthur Guinness signed the 9,000-year lease on December 31, 1759, founding the global stout brand."
    }
  },

  // Cycle 4: The Burren & Karst Limestone
  {
    mcqs: [
      {
        q: "What unique 250-square-kilometer glaciated limestone karst landscape in County Clare features bare limestone pavements, deep fissures (grikes), and subterranean caves?",
        correct: "The Burren Boireann",
        w1: "Connemara",
        w2: "The Curragh",
        exp: "Derived from Boireann (meaning 'great rock'), Oliver Cromwell surveyor famously remarked: 'There is not water enough to drown a man, wood enough to hang one, nor earth enough to bury them.'"
      },
      {
        q: "What iconic 5,800-year-old Neolithic portal tomb dolmen in the Burren consists of a massive three-meter capstone balancing delicately on two vertical stone portal slabs?",
        correct: "Poulnabrone Dolmen",
        w1: "Brownshill Dolmen",
        w2: "Legananny Dolmen",
        exp: "Excavations beneath Poulnabrone (Hole of the Sorrows) revealed the burials of thirty-three Neolithic individuals interred between 3800 and 3200 BCE."
      },
      {
        q: "What botanical phenomenon makes the Burren unique in the world, where alpine, Arctic, and Mediterranean plant species grow together side-by-side?",
        correct: "Limestone fissures trap warm ocean moisture while bare rock stores thermal heat",
        w1: "Artificial greenhouse warming",
        w2: "Underground volcanic geysers",
        exp: "Arctic mountain avens (Dryas octopetala) and Mediterranean spring gentians flourish within centimeters of each other in deep microclimate limestone cracks (grikes)."
      },
      {
        q: "What famous show cave in the Burren, discovered in 1940 by local herdsman Jacko McGann, features an underground waterfall and frozen brown bear hibernation bones?",
        correct: "Aillwee Cave",
        w1: "Doolin Cave",
        w2: "Crag Cave",
        exp: "Nearby Doolin Cave contains the Great Stalactite, a 7.3-meter-long suspended calcite formation that is the longest free-hanging stalactite in Europe."
      },
      {
        q: "Which charming coastal village in County Clare, located on the edge of the Burren, is celebrated as the Traditional Music Capital of Ireland?",
        correct: "Doolin",
        w1: "Ballyvaughan",
        w2: "Ennis",
        exp: "Doolin three famous pubs (Gus O'Connor's, McDermott's, and McGann's) host nightly acoustic Irish folk sessions and serve as the ferry port to the Aran Islands."
      }
    ],
    number: {
      q: "Approximately how many years BCE was the Poulnabrone portal dolmen constructed on the limestone plateau of the Burren in Ireland?",
      target: 3800,
      unit: "BCE",
      imperial: "3800 BC (nearly 6,000 years ago)",
      exp: "Radiocarbon dating places the construction and earliest interments at Poulnabrone Dolmen between 3800 and 3600 BCE."
    }
  },

  // Cycle 5: The Ring of Kerry & Killarney Lakes
  {
    mcqs: [
      {
        q: "What famous 179-kilometer circular tourist scenic drive loops around the rugged Iveragh Peninsula in County Kerry, taking in coastal cliffs and mountain passes?",
        correct: "The Ring of Kerry Mórchuaird Chiarraí",
        w1: "The Dingle Peninsula Loop",
        w2: "The Ring of Beara",
        exp: "The route passes through Killorglin (home of the ancient Puck Fair), Waterville (favorite holiday retreat of Charlie Chaplin), and Sneem."
      },
      {
        q: "What was the very first National Park established in Ireland in 1932, covering 102 square kilometers of ancient oak woodlands, lakes, and mountain peaks in County Kerry?",
        correct: "Killarney National Park",
        w1: "Connemara National Park",
        w2: "Wicklow Mountains National Park",
        exp: "Originating from the donation of the Muckross Estate to the Irish state, the park is home to Ireland only surviving indigenous herd of wild Red Deer."
      },
      {
        q: "What scenic 20-meter waterfall in Killarney National Park cascades down Torc Mountain through lush mossy woodlands into the Lower Lake?",
        correct: "Torc Waterfall",
        w1: "Powerscourt Waterfall",
        w2: "Glencar Waterfall",
        exp: "Fed by the Owengarriff River draining the high Devil Punchbowl tarn on Mangerton Mountain, the waterfall is associated in folklore with an enchanted cursed man turned into a wild boar."
      },
      {
        q: "What 15th-century fortified tower house castle on the edge of Lough Leane in Killarney was the historic stronghold of the O'Donoghue Mór clan?",
        correct: "Ross Castle",
        w1: "Muckross Abbey",
        w2: "Blarney Castle",
        exp: "Ross Castle was the last stronghold in Munster to hold out against Oliver Cromwell forces during the 1652 Cromwellian conquest of Ireland."
      },
      {
        q: "What famous mountain pass viewpoint in Killarney National Park, named after Queen Victoria ladies-in-waiting who admired the vista in 1861, overlooks the Three Lakes of Killarney?",
        correct: "Ladies View",
        w1: "Molls Gap",
        w2: "Gap of Dunloe",
        exp: "Ladies View offers vistas of the Upper Lake, surrounded by Purple Mountain and the MacGillycuddy Reeks."
      }
    ],
    number: {
      q: "What is the total loop distance in kilometers of the scenic Ring of Kerry drive around the Iveragh Peninsula?",
      target: 179,
      unit: "kilometers",
      imperial: "111 miles",
      exp: "The Ring of Kerry highway covers 179 kilometers starting and finishing in the town of Killarney."
    }
  },

  // Cycle 6: MacGillycuddy's Reeks & Mountains
  {
    mcqs: [
      {
        q: "What is the highest mountain peak in Ireland, rising 1,038 meters in the MacGillycuddy Reeks range of County Kerry, crowned by a five-meter steel cross?",
        correct: "Carrauntoohil Corrán Tuathail",
        w1: "Beenkeragh",
        w2: "Caher",
        exp: "Carrauntoohil (meaning 'Tuathal Inverted Sickle') is flanked by two higher glaciated corrie lakes and the famous steep scree ascent known as the Devil Ladder."
      },
      {
        q: "What steep, narrow rocky mountain ravine in the MacGillycuddy Reeks is the traditional direct ascent route between Lough Gouragh and the col below Carrauntoohil?",
        correct: "The Devil Ladder",
        w1: "O Shea Gully",
        w2: "Brotherhood Gully",
        exp: "The Devil Ladder climbs 300 vertical meters up loose boulder scree and running water, requiring caution from hillwalkers."
      },
      {
        q: "What picturesque 6th-century early Christian monastic settlement in County Wicklow, founded by Saint Kevin, is nestled in a deep glacial valley with two lakes?",
        correct: "Glendalough Gleann Dá Loch",
        w1: "Clonmacnoise",
        w2: "Monasterboice",
        exp: "Glendalough features a 30-meter intact stone Round Tower, Saint Kevin Kitchen stone church, and served as a center of religious learning for six centuries."
      },
      {
        q: "What romantic Neo-Gothic castle abbey in the Connemara mountains was built in 1867 by wealthy English financier Mitchell Henry for his wife Margaret?",
        correct: "Kylemore Abbey",
        w1: "Ashford Castle",
        w2: "Ballynahinch Castle",
        exp: "Run by Benedictine nuns since 1920 after fleeing Belgium during WWI, Kylemore features a six-acre Victorian Walled Garden and a neo-Gothic church."
      },
      {
        q: "What conical 764-meter holy pilgrimage mountain in County Mayo is where Saint Patrick is said to have fasted for forty days in 441 CE, banishing all snakes from Ireland?",
        correct: "Croagh Patrick The Reek",
        w1: "Mount Brandon",
        w2: "Benbulbin",
        exp: "Every year on 'Reek Sunday' (the last Sunday in July), over 25,000 pilgrims climb the rocky scree slopes to the summit chapel, many walking barefoot."
      }
    ],
    number: {
      q: "What is the summit elevation in meters above sea level of Carrauntoohil, the highest mountain peak in Ireland?",
      target: 1038,
      unit: "meters",
      imperial: "3,406 feet",
      exp: "Carrauntoohil in County Kerry stands at an official elevation of 1,038 meters above sea level."
    }
  },

  // Cycle 7: Gaelic Games, Folklore & St. Patrick
  {
    mcqs: [
      {
        q: "What ancient 3,000-year-old traditional Irish field stick-and-ball sport, played with an ash wood stick (camán) and leather ball (sliotar), is celebrated as the fastest field sport on Earth?",
        correct: "Hurling Iomáint",
        w1: "Gaelic Football",
        w2: "Shinty",
        exp: "Inscribed by UNESCO as Intangible Cultural Heritage in 2018, Hurling features in Celtic mythology as the favorite combat game of warrior hero Cú Chulainn."
      },
      {
        q: "What massive 82,300-capacity stadium in Dublin is the headquarters of the Gaelic Athletic Association (GAA) and the fourth largest stadium in Europe?",
        correct: "Croke Park Páirc an Chrócaigh",
        w1: "Aviva Stadium",
        w2: "Thomond Park",
        exp: "Croke Park hosts the annual All-Ireland Senior Football and Hurling Championship finals, strictly operated as an amateur sport organization where players receive no salary."
      },
      {
        q: "What traditional green three-leaved clover plant was famously used by Saint Patrick in the 5th century as a visual metaphor to explain the Christian Holy Trinity?",
        correct: "The Shamrock Seamróg",
        w1: "Four-Leaf Clover",
        w2: "Irish Ivy",
        exp: "The shamrock is an official registered emblem of Ireland alongside the Brian Boru Celtic harp, worn globally by millions on Saint Patrick Day (March 17)."
      },
      {
        q: "What magical three-foot-tall solitary fairy shoemaker of Irish folklore is famously known for hoarding a hidden pot of gold at the end of the rainbow?",
        correct: "The Leprechaun Leipreachán",
        w1: "The Banshee",
        w2: "The Púca",
        exp: "According to Irish legend, if captured by a human, a leprechaun must grant three wishes in exchange for his freedom."
      },
      {
        q: "What famous limestone block built into the battlements of Blarney Castle in County Cork is reputed to bestow the gift of eloquent speech (the gift of the gab) to anyone who kisses it hanging upside down?",
        correct: "The Blarney Stone Stone of Eloquence",
        w1: "The Stone of Destiny",
        w2: "The Coronation Stone",
        exp: "Over 400,000 visitors climb 127 spiral steps each year to lean backward over a parapet gap supported by an iron rail to kiss the underside of the battlements."
      }
    ],
    number: {
      q: "What is the spectator seating capacity in thousands of Croke Park stadium in Dublin, the home of Gaelic games?",
      target: 82,
      unit: "thousand seats",
      imperial: "82,300 spectator capacity",
      exp: "Croke Park possesses a total matchday capacity of 82,300 spectators, the largest amateur sporting stadium on Earth."
    }
  },

  // Cycle 8: Irish Whiskey, Pubs & Gastronomy
  {
    mcqs: [
      {
        q: "What world-renowned feature distinguishes traditional Irish Whiskey from Scottish Whisky, providing its signature ultra-smooth and floral profile?",
        correct: "Triple distillation in copper pot stills",
        w1: "Single distillation in wood barrels",
        w2: "Aging in underground peat bogs",
        exp: "Irish whiskey is traditionally distilled three times (compared to two times for Scotch), spelled with an 'e' (whiskey from uisce beatha meaning 'water of life')."
      },
      {
        q: "Which historic distillery in County Antrim received the world oldest official royal license to distill whiskey in 1608 from King James I?",
        correct: "Old Bushmills Distillery",
        w1: "Midleton Distillery",
        w2: "Kilbeggan Distillery",
        exp: "Old Bushmills uses water from Saint Columb Rill flowing over basalt rock, producing single malt and blended Irish whiskies for over four centuries."
      },
      {
        q: "What world-famous hot beverage combining hot strong black coffee, Irish whiskey, brown sugar, and a thick layer of freshly whipped cream was invented in 1943 by chef Joe Sheridan at the Foynes flying boat terminal?",
        correct: "Irish Coffee Caife Gaelach",
        w1: "Hot Toddy",
        w2: "Bailey Coffee",
        exp: "Sheridan created the drink to warm cold passengers stepping off transatlantic Pan Am flying boat sea-planes stranded in winter fog in County Limerick."
      },
      {
        q: "What traditional quick bread made without yeast, using baking soda, buttermilk, flour, and salt, has been a staple in Irish farmhouse kitchens since the 1840s?",
        correct: "Irish Soda Bread",
        w1: "Barmbrack",
        w2: "Blaa",
        exp: "The top of the loaf is traditionally slashed with a deep cross before baking to let the bread rise and, in folklore, to 'let the fairies out'."
      },
      {
        q: "What hearty traditional Irish dish made of mashed potatoes blended with chopped green cabbage or kale, butter, cream, and green scallions is traditionally eaten on Halloween?",
        correct: "Colcannon Cál Ceannann",
        w1: "Champ",
        w2: "Boxty",
        exp: "Cooks historically hid charms inside the dish on Samhain (Halloween): a coin (wealth), a ring (marriage), or a button (bachelorhood)."
      }
    ],
    number: {
      q: "In what year did the Old Bushmills Distillery in County Antrim receive the world oldest official license to distill whiskey?",
      target: 1608,
      unit: "year",
      imperial: "1608 AD",
      exp: "King James I granted Sir Thomas Phillips a license to distill whiskey on April 20, 1608."
    }
  },

  // Cycle 9: Skellig Michael & Atlantic Islands
  {
    mcqs: [
      {
        q: "What UNESCO World Heritage sheer pyramid-shaped rock island twelve kilometers off the coast of Kerry is crowned by an exceptionally preserved 6th-century Christian monastery?",
        correct: "Skellig Michael Great Skellig",
        w1: "Little Skellig",
        w2: "Tory Island",
        exp: "Monks lived in ascetic contemplation in six drystone beehive huts (clocháns), perched 200 meters above the Atlantic reached by 600 hand-carved stone steps."
      },
      {
        q: "What world-famous blockbuster movie franchise filmed iconic scenes on Skellig Michael, depicting it as the planet Ahch-To and ancient birthplace of the Jedi Order?",
        correct: "Star Wars The Force Awakens and The Last Jedi",
        w1: "The Lord of the Rings",
        w2: "Harry Potter",
        exp: "Mark Hamill (Luke Skywalker) and Daisy Ridley (Rey) filmed on the ancient monastic stone terraces, introducing the island to millions of movie fans worldwide."
      },
      {
        q: "What uninhabited neighboring rocky sea stack to Skellig Michael hosts the second largest breeding colony of Northern Gannets in the world (over 27,000 pairs)?",
        correct: "Little Skellig",
        w1: "Puffin Island",
        w2: "Fastnet Rock",
        exp: "From a distance, Little Skellig appears covered in snow due to the thousands of white gannets nesting across every ledge of the sheer 134-meter cliffs."
      },
      {
        q: "What isolated 54-meter granite lighthouse tower on an isolated rock off the southwest coast of County Cork is known as Ireland Teardrop, the last sight of Ireland for millions of 19th-century emigrants sailing to America?",
        correct: "Fastnet Rock Lighthouse",
        w1: "Hook Head Lighthouse",
        w2: "Kinsale Head",
        exp: "Fastnet Rock is the southernmost point of sovereign Irish territory, renowned for the biennial Fastnet Race ocean yachting classic."
      },
      {
        q: "What 13th-century limestone lighthouse in County Wexford is the oldest operating intact lighthouse in Ireland and second oldest in the world?",
        correct: "Hook Head Lighthouse",
        w1: "Baily Lighthouse",
        w2: "Fanad Head Lighthouse",
        exp: "Built by the Norman knight William Marshal, Earl of Pembroke, monks burned beacons of wood and coal in the tower to guide ships into Waterford Harbour."
      }
    ],
    number: {
      q: "How many hand-carved stone steps must visitors climb up the sheer cliff face to reach the 6th-century monastic beehive huts on Skellig Michael?",
      target: 600,
      unit: "stone steps",
      imperial: "600 stone steps",
      exp: "Monks hand-carved approximately six hundred stone steps into the sheer rock face of Skellig Michael over 1,400 years ago."
    }
  },

  // Cycle 10: Extent, 32 Counties & The Emerald Isle
  {
    mcqs: [
      {
        q: "How many traditional historic geographical counties make up the entire island of Ireland (twenty-six in the Republic of Ireland and six in Northern Ireland)?",
        correct: "32 Counties",
        w1: "26 Counties",
        w2: "36 Counties",
        exp: "The thirty-two counties are grouped into four historic provinces: Leinster (east), Munster (south), Connacht (west), and Ulster (north)."
      },
      {
        q: "What is the longest river on the island of Ireland, flowing 360 kilometers from the Shannon Pot in Cavan into the Atlantic estuary at Limerick?",
        correct: "River Shannon An tSionainn",
        w1: "River Liffey",
        w2: "River Barrow",
        exp: "The Shannon divides the west of Ireland from the east and south, flowing through Lough Ree and Lough Derg, powering the 1929 Ardnacrusha hydroelectric scheme."
      },
      {
        q: "What historic peace agreement signed on April 10, 1998, brought an end to three decades of sectarian violence (The Troubles) in Northern Ireland and established open borders?",
        correct: "The Good Friday Agreement Belfast Agreement",
        w1: "The Anglo-Irish Treaty",
        w2: "The Sunningdale Agreement",
        exp: "Brokered under US Senator George Mitchell, the agreement created devolved power-sharing in the Northern Ireland Assembly and demilitarized the border."
      },
      {
        q: "Why is Ireland poetically nicknamed the Emerald Isle, a title popularized in 1795 by Belfast physician and poet William Drennan?",
        correct: "Lush year-round green vegetation and pastures nourished by mild Atlantic Gulf Stream rains",
        w1: "Rich deposits of emerald gemstones",
        w2: "Green volcanic rocks",
        exp: "The warm North Atlantic Drift keeps temperatures mild and frost-free, allowing emerald-green rye and fescue grasses to thrive year-round across forty shades of green."
      },
      {
        q: "What is the national musical instrument and official heraldic state emblem of Ireland, making it the only sovereign nation on Earth with a musical instrument as its national symbol?",
        correct: "The Celtic Harp Cláirseach",
        w1: "The Uilleann Pipes",
        w2: "The Fiddle",
        exp: "Depicted on Irish euro coins, presidential seals, and Guinness branding, the heraldic Trinity College Harp dates to the 14th or 15th century."
      }
    ],
    number: {
      q: "How many traditional historic counties comprise the entire geographical island of Ireland?",
      target: 32,
      unit: "counties",
      imperial: "32 traditional counties",
      exp: "The island of Ireland is traditionally divided into thirty-two historic counties (twenty-six in the Republic of Ireland and six in Northern Ireland)."
    }
  }
];

// Build Ireland Quiz
buildQuiz({
  id: 'ireland-geography-heritage-60',
  theme: 'Ireland: Geography, The Wild Atlantic Way & Megalithic Wonders',
  title: 'Ireland: Geography, The Wild Atlantic Way & Megalithic Wonders',
  description: 'A 60-question grand master assessment exploring the Cliffs of Moher (214 m), Newgrange (3200 BCE), Dublin & Book of Kells (1759 Guinness lease), the Burren & Poulnabrone, Ring of Kerry, Carrauntoohil (1,038 m), Hurling, Bushmills (1608), and Skellig Michael.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, irelandCycles);

console.log('Ireland quiz built successfully!');
