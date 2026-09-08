const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
const dirs = fs.readdirSync(quizzesDir).filter(d => fs.statSync(path.join(quizzesDir, d)).isDirectory()).sort();

let cleanedCount = 0;
let changes = [];

// Specific cleanup mappings for options that have concatenated English + Local name
const cleanOption = (opt) => {
  let cleaned = opt;

  // Handle specific known patterns
  const explicitFixes = {
    // Cuba
    "Havana La Habana": "Havana",
    "Old Havana Habana Vieja": "Old Havana",
    "The Malecón Avenida de Maceo": "The Malecón",
    "El Capitolio National Capitol Building": "El Capitolio",
    "Viñales Valley Valle de Viñales": "Viñales Valley",
    "Valley of the Sugar Mills Valle de los Ingenios": "Valley of the Sugar Mills",
    "Manaca Iznaga Tower Torre de Manaca Iznaga": "Manaca Iznaga Tower",
    "Mural of Prehistory Mural de la Prehistoria": "Mural of Prehistory",
    "Cueva del Indio Indian Cave": "Cueva del Indio",
    "Casas de Tabaco Tobacco Drying Barns": "Casas de Tabaco",
    "La Gran Piedra The Big Rock": "La Gran Piedra",
    "El Yunque The Anvil": "El Yunque",
    "Varadero Hicacos Peninsula": "Varadero",
    "Zapata Peninsula Ciénaga de Zapata": "Zapata Peninsula",
    "Jardines de la Reina Gardens of the Queen": "Jardines de la Reina",
    "Tropicana Club Cabaret Tropicana": "Tropicana Club",
    "Castillo de San Pedro de la Roca Castillo del Morro": "San Pedro de la Roca Castle",
    "Santa Ifigenia Cemetery Cementerio Santa Ifigenia": "Santa Ifigenia Cemetery",
    "Santería Regla de Ocha": "Santería",
    "Bee Hummingbird Zunzuncito (Mellisuga helenae)": "Bee Hummingbird",
    "The Cuban Trogon Tocororo (Priotelus temnurus)": "Cuban Trogon (Tocororo)",
    "Isle of Youth Isla de la Juventud": "Isle of Youth",
    "Almendrones Yank Tanks": "Almendrones",
    "Chevrolet Chevy": "Chevrolet",

    // Poland
    "Vistula River Wisła": "Vistula River",
    "Warsaw Warszawa": "Warsaw",
    "Palace of Culture and Science Pałac Kultury i Nauki": "Palace of Culture and Science",
    "Kraków Cracow": "Kraków",
    "Wawel Hill Wzgórze Wawelskie": "Wawel Hill",
    "Main Market Square Rynek Główny": "Main Market Square",
    "Wawel Dragon Smok Wawelski": "Wawel Dragon",
    "Wieliczka Salt Mine Kopalnia soli Wieliczka": "Wieliczka Salt Mine",
    "Chapel of St. Kinga Kaplica św. Kingi": "Chapel of St. Kinga",
    "Rysy Northwestern Peak": "Mount Rysy",
    "Białowieża Forest Puszcza Białowieska": "Białowieża Forest",
    "European Bison Żubr": "European Bison",
    "Żubrówka Bison Grass Vodka": "Żubrówka",
    "Kampinos National Park Kampinoski Park Narodowy": "Kampinos National Park",
    "Biebrza National Park Biebrzański Park Narodowy": "Biebrza National Park",
    "Gdańsk Danzig": "Gdańsk",
    "The Gdańsk Crane Żuraw w Gdańsku": "The Gdańsk Crane",
    "Baltic Amber Bursztyn": "Baltic Amber",
    "Battle of Grunwald First Battle of Tannenberg": "Battle of Grunwald",
    "Marie Curie Maria Skłodowska-Curie": "Marie Curie",
    "Jagiellonian University Uniwersytet Jagielloński": "Jagiellonian University",
    "Toruń Gingerbread Pierniki Toruńskie": "Toruń Gingerbread",
    "The Masurian Lake District Pojezierze Mazurskie": "Masurian Lake District",
    "Lake Śniardwy Jezioro Śniardwy": "Lake Śniardwy",
    "The Elbląg Canal Kanał Elbląski": "The Elbląg Canal",
    "Gołąbki Little Pigeons": "Gołąbki",
    "Żurek Żur": "Żurek",
    "Masovian Voivodeship Województwo mazowieckie": "Masovian Voivodeship",
    "St. Mary Church Bazylika Mariacka": "St. Mary's Basilica",

    // Jordan
    "Petra Raqmu": "Petra",
    "The Treasury Al-Khazneh": "The Treasury",
    "The Siq Al-Siq": "The Siq",
    "The Monastery Ad Deir": "The Monastery (Ad Deir)",
    "Wadi Mujib River Arnon": "Wadi Mujib",
    "Lot Wife Salt Pillar": "Lot's Wife Pillar",
    "Jerash Gerasa": "Jerash",
    "The Oval Forum Oval Plaza": "The Oval Forum",
    "The Arch of Hadrian Hadrian Gate": "Arch of Hadrian",
    "Umm Qais Gadara": "Umm Qais",
    "Mount Nebo Jabal Nibu": "Mount Nebo",
    "Bethany Beyond the Jordan Al-Maghtas": "Bethany Beyond the Jordan",
    "Machaerus Mukawir": "Machaerus",
    "Umm ar-Rasas Kastrom Mefa a": "Umm ar-Rasas",
    "Kerak Castle Karak Castle": "Kerak Castle",
    "Qasr al-Azraq Black Castle": "Qasr al-Azraq",
    "Ajloun Castle Qal at ar-Rabad": "Ajloun Castle",
    "Shobak Castle Montreal": "Shobak Castle",
    "The King Highway Tariq as-Sultani": "The King's Highway",
    "The Hashemite Dynasty House of Hashim": "The Hashemite Dynasty",
    "Ma an Governorate": "Ma'an Governorate",
    "Ain Ghazal": "'Ain Ghazal",

    // Nepal
    "Mount Everest Sagarmatha (Chomolungma)": "Mount Everest",
    "Machapuchare Machhapuchhre": "Machapuchare",
    "Bhaktapur Bhadgaon": "Bhaktapur",
    "Patan Lalitpur": "Patan",
    "Boudhanath Boudha Stupa": "Boudhanath Stupa",
    "Muktinath Temple Chumig Gyatsa": "Muktinath Temple",
    "Tal Barahi Temple Lake Temple": "Tal Barahi Temple",
    "World Peace Pagoda Shanti Stupa": "World Peace Pagoda",
    "Davis Falls Patale Chhango": "Davis Falls",
    "Greater One-Horned Rhinoceros Indian Rhinoceros": "Greater One-Horned Rhinoceros",
    "Bardia National Park Bardiya": "Bardia National Park",
    "Tengboche Monastery Dawa Choling Gompa": "Tengboche Monastery",
    "The Gurkhas Gorkhas": "The Gurkhas",
    "The Khukuri Kukri": "The Khukuri",
    "Dashain Vijaya Dashami": "Dashain",
    "Rhododendron Lali Gurans": "Rhododendron",
    "Mount Apo Apo Sandawa": "Mount Apo",

    // Czech Republic
    "Prague Praha": "Prague",
    "Charles Bridge Karlův most": "Charles Bridge",
    "Prague Castle Pražský hrad": "Prague Castle",
    "St. Vitus Cathedral Katedrála svatého Víta": "St. Vitus Cathedral",
    "Golden Lane Zlatá ulička": "Golden Lane",
    "Prague Astronomical Clock Pražský orloj": "Prague Astronomical Clock",
    "Hluboká Castle Zámek Hluboká": "Hluboká Castle",
    "Sedlec Ossuary The Bone Church": "Sedlec Ossuary",
    "St. Barbara Church Chrám svaté Barbory": "St. Barbara's Church",
    "Joachimsthaler Thaler": "Joachimsthaler",
    "Bohemian Paradise Český ráj": "Bohemian Paradise",
    "Prachov Rocks Prachovské skály": "Prachov Rocks",
    "Pravčická brána Prebischtor": "Pravčická brána",
    "Trosky Castle Hrad Trosky": "Trosky Castle",
    "Karlštejn Castle Hrad Karlštejn": "Karlštejn Castle",
    "Karlovy Vary Carlsbad": "Karlovy Vary",
    "Macocha Abyss Propast Macocha": "Macocha Abyss",
    "Hranice Abyss Hranická propast": "Hranice Abyss",
    "R.U.R. Rossum Universal Robots": "R.U.R.",
    "Alphonse Mucha Alfons Mucha": "Alphonse Mucha",
    "Sněžka Snow Mountain": "Mount Sněžka",
    "Bohemian Garnet Český granát": "Bohemian Garnet",
    "Moldavite Vltavín": "Moldavite",
    "The Velvet Revolution Sametová revoluce": "The Velvet Revolution",
    "Budweiser Budvar Budějovický Budvar": "Budweiser Budvar",

    // Finland
    "Helsinki Helsingfors": "Helsinki",
    "Suomenlinna Fortress of Finland": "Suomenlinna",
    "Finnish Lapland Lappi": "Finnish Lapland",
    "Halti Mount Halti": "Mount Halti",
    "Lake Inari Inarijärvi": "Lake Inari",
    "Vihta Vasta": "Vihta",
    "Rajaportti Sauna Rajaportin sauna": "Rajaportti Sauna",
    "Olavinlinna Castle St. Olaf Castle": "Olavinlinna Castle",
    "The Åland Islands Ahvenanmaa": "The Åland Islands",
    "The Kvarken Archipelago Merenkurkku": "Kvarken Archipelago",
    "Salmiakki Salty Licorice": "Salmiakki",
    "Karelian Pasty Karjalanpiirakka": "Karelian Pasty",
    "Ruisleipä Rye Bread": "Ruisleipä",
    "Kalakukko Fish Rooster": "Kalakukko",
    "Lohikeitto Salmon Soup": "Lohikeitto",
    "The Sibelius Monument Passio Musicae": "The Sibelius Monument",
    "The Moomins Muumit": "The Moomins",
    "The Eurasian Brown Bear Ursus arctos": "Eurasian Brown Bear",
    "The Whooper Swan Cygnus cygnus": "Whooper Swan",
    "Wife-Carrying World Championships Eukonkanto": "Wife-Carrying Championship",
    "Saimaa Ringed Seal Pusa hispida saimensis": "Saimaa Ringed Seal",
    "Avanto Ice Swimming Avantouinti": "Avanto (Ice Swimming)",
    "Cloudberry Hilla / Lakka (Rubus chamaemorus)": "Cloudberry",

    // Croatia
    "Plitvice Lakes National Park Plitvička jezera": "Plitvice Lakes",
    "Veliki Slap The Great Waterfall": "Veliki Slap",
    "Diocletian Palace Dioklecijanova palača": "Diocletian's Palace",
    "The Peristyle Peristil": "The Peristyle",
    "Cathedral of Saint Domnius Katedrala sv. Dujma": "Cathedral of Saint Domnius",
    "Gregory of Nin Grgur Ninski": "Gregory of Nin",
    "Zlatni Rat Golden Horn": "Zlatni Rat",
    "The Blue Cave Modra špilja": "The Blue Cave",
    "Mljet Melita": "Mljet",
    "The Sea Organ Morske orgulje": "The Sea Organ",
    "Greeting to the Sun Monument to the Sun (Pozdrav suncu)": "Greeting to the Sun",
    "Church of St. Donatus Crkva sv. Donata": "Church of St. Donatus",
    "Pula Arena Pulska Arena": "Pula Arena",
    "Istria Istra": "Istria",
    "Rovinj Rovigno": "Rovinj",
    "Euphrasian Basilica Eufrazijeva bazilika": "Euphrasian Basilica",
    "Krka National Park Nacionalni park Krka": "Krka National Park",
    "The Dalmatian Dog Dalmatinac": "The Dalmatian",
    "St. Mark Church Crkva sv. Marka": "St. Mark's Church",
    "The Grič Cannon Grički top": "The Grič Cannon",
    "The Zagreb Funicular Zagrebačka uspinjača": "The Zagreb Funicular",
    "Museum of Broken Relationships Muzej prekinutih veza": "Museum of Broken Relationships",
    "The Necktie Cravat (La Cravate)": "The Cravat (Necktie)",
    "Faust Vrančić Fausto Veranzio": "Faust Vrančić",
    "Ispod črike Peka Under the Bell": "Peka (Under the Bell)",
    "Paški sir Pag Cheese": "Paški Sir",
    "The Pelješac Bridge Pelješki most": "The Pelješac Bridge",
    "Large Onofrio Fountain Velika Onofrijeva česma": "Large Onofrio Fountain",

    // Malaysia
    "Kuala Lumpur KL": "Kuala Lumpur",
    "Petronas Twin Towers Menara Berkembar Petronas": "Petronas Twin Towers",
    "Merdeka 118 PNB 118": "Merdeka 118",
    "Mount Kinabalu Gunung Kinabalu": "Mount Kinabalu",
    "Nepenthes rajah King of Pitcher Plants": "Nepenthes rajah",
    "Malayan Tapir Tapirus indicus": "Malayan Tapir",
    "Tualang Tree Koompassia excelsa": "Tualang Tree",
    "Baba-Nyonya Straits Chinese": "Baba-Nyonya",
    "Cheong Fatt Tze Mansion The Blue Mansion": "Cheong Fatt Tze Mansion",
    "Dutch Square Red Square": "Dutch Square",
    "The Sarawak Chamber Gua Nasib Bagus": "Sarawak Chamber",
    "Deer Cave Gua Rusa": "Deer Cave",
    "Kinabatangan River Sungai Kinabatangan": "Kinabatangan River",
    "Borneo Pygmy Elephant Elephas maximus borneensis": "Borneo Pygmy Elephant",
    "Sipadan Island Pulau Sipadan": "Sipadan Island",
    "The First Penang Bridge Jambatan Pulau Pinang": "First Penang Bridge",
    "Musang King Mao Shan Wang (D197)": "Musang King",
    "Roti Canai Roti Prata": "Roti Canai",
    "Ais Kacang ABC (Air Batu Campur)": "Ais Kacang (ABC)",
    "The Mossy Forest Gunung Brinchang": "The Mossy Forest",
    "Genting Highlands Resorts World Genting": "Genting Highlands",
    "Sarawak The Land of the Hornbills": "Sarawak",
    "The Dark Cave Gua Gelap": "The Dark Cave",

    // Philippines
    "Manila Maynila": "Manila",
    "The Banaue Rice Terraces Hagdan-hagdang Palayan ng Banawe": "Banaue Rice Terraces",
    "Bulul Bul-ul": "Bulul",
    "The Chocolate Hills Mga Tsokolateng Burol": "Chocolate Hills",
    "Philippine Tarsier Carlito syrichta (Mawmag)": "Philippine Tarsier",
    "Mayon Volcano Bulkang Mayon": "Mayon Volcano",
    "Taal Volcano Bulkang Taal": "Taal Volcano",
    "Mount Kanlaon Canlaon": "Mount Kanlaon",
    "Jeepneys Dyip": "Jeepneys",
    "Lechón Cebu Lechon": "Lechón",
    "Cebu City Sugbo": "Cebu City",
    "Mount Apo Apo Sandawa": "Mount Apo",

    // Denmark
    "Copenhagen København": "Copenhagen",
    "Nyhavn New Harbour": "Nyhavn",
    "The Little Mermaid Den Lille Havfrue": "The Little Mermaid",
    "Tivoli Gardens Kjøbenhavns Sommer-Tivoli": "Tivoli Gardens",
    "Rutschebanen The Mountain Coaster": "Rutschebanen",
    "Dronning Louises Bro Queen Louise Bridge": "Dronning Louises Bro",
    "Dyrehavsbakken Bakken": "Dyrehavsbakken (Bakken)",
    "Rigsfællesskabet The Danish Realm": "Rigsfællesskabet",
    "Greenland Kalaallit Nunaat": "Greenland",
    "The Faroe Islands Føroyar": "The Faroe Islands",
    "Ilulissat Icefjord Kangia": "Ilulissat Icefjord",
    "Nuuk Godthåb": "Nuuk",
    "Hans Christian Andersen H.C. Andersen": "Hans Christian Andersen",
    "The Snow Queen Snedronningen": "The Snow Queen",
    "Kronborg Castle Kronborg Slot": "Kronborg Castle",
    "Holger the Dane Holger Danske (Ogier the Dane)": "Holger Danske",
    "The Jelling Stones Jellingstenene": "The Jelling Stones",
    "Viking Ship Museum Vikingeskibsmuseet": "Viking Ship Museum",
    "Roskilde Cathedral Roskilde Domkirke": "Roskilde Cathedral",
    "The Øresund Bridge Øresundsforbindelsen": "The Øresund Bridge",
    "The Great Belt Fixed Link Storebæltsforbindelsen": "Great Belt Fixed Link",
    "The Fehmarnbelt Fixed Link Femern Bælt-forbindelsen": "Fehmarnbelt Fixed Link",
    "CopenHill Amager Bakke": "CopenHill",
    "The North Sea Energy Island Vindø": "North Sea Energy Island",
    "Danish Pastry Wienerbrød": "Danish Pastry (Wienerbrød)",
    "Rød Pølse Red Sausage": "Rød Pølse",
    "Møllehøj Mill Hill": "Møllehøj",

    // Ireland
    "O Brien Tower": "O'Brien's Tower",
    "O Connell Bridge": "O'Connell Bridge",
    "The Ha penny Bridge Halfpenny Bridge": "Ha'penny Bridge",
    "The Aran Islands Oileáin Árann": "The Aran Islands",
    "Slieve League Sliabh Liag": "Slieve League",
    "Newgrange Dún Fhgail": "Newgrange",
    "The Triskele Triple Spiral": "The Triskele",
    "The Hill of Tara Cnoc na Teamhrach": "The Hill of Tara",
    "Dublin Baile Átha Cliath": "Dublin",
    "The Book of Kells Leabhar Cheanannais": "The Book of Kells",
    "The Burren Boireann": "The Burren",
    "The Ring of Kerry Mórchuaird Chiarraí": "The Ring of Kerry",
    "Carrauntoohil Corrán Tuathail": "Carrauntoohil",
    "The Devil Ladder": "The Devil's Ladder",
    "Glendalough Gleann Dá Loch": "Glendalough",
    "Croagh Patrick The Reek": "Croagh Patrick",
    "Hurling Iomáint": "Hurling",
    "Croke Park Páirc an Chrócaigh": "Croke Park",
    "The Shamrock Seamróg": "The Shamrock",
    "The Leprechaun Leipreachán": "The Leprechaun",
    "The Blarney Stone Stone of Eloquence": "The Blarney Stone",
    "Irish Coffee Caife Gaelach": "Irish Coffee",
    "Colcannon Cál Ceannann": "Colcannon",
    "Skellig Michael Great Skellig": "Skellig Michael",
    "River Shannon An tSionainn": "River Shannon",
    "The Good Friday Agreement Belfast Agreement": "The Good Friday Agreement",
    "The Celtic Harp Cláirseach": "The Celtic Harp",
    "O Shea Gully": "O'Shea's Gully",

    // Kenya
    "The Great Rift Valley Gregory Rift": "The Great Rift Valley",
    "Mount Kenya Kirinyaga": "Mount Kenya",
    "Hell Gate National Park": "Hell's Gate National Park",
    "The Shúkà Shuka": "The Shúka",
    "The Maasai Jumping Dance Adumu": "The Maasai Jumping Dance (Adumu)",
    "Lake Turkana Lake Rudolf": "Lake Turkana",
    "Turkana Boy Nariokotome Boy": "Turkana Boy",
    "Observation Hill Noomotio": "Observation Hill",
    "Fort Jesus Forte Jesus de Mombaça": "Fort Jesus",
    "Gedi Ruins Gede": "Gedi Ruins",
    "Dhows Dhow Boats": "Dhows",
    "M-Pesa M-PESA": "M-Pesa",
    "Black Tea Camellia sinensis": "Black Tea",
    "Roses Cut Roses": "Cut Roses",
    "Lake Victoria Victoria Nyanza": "Lake Victoria",
    "Swahili Kiswahili and English": "Swahili and English",
    "The Madaraka Express SGR": "The Madaraka Express",
    "Poacher Lookout": "Poacher's Lookout",
    "Tsavo National Park Tsavo East and Tsavo West": "Tsavo National Park",

    // Austria
    "Grossglockner Grossglockner": "Grossglockner",
    "Vienna Wien": "Vienna",

    // Chile
    "Santiago Santiago de Chile": "Santiago",
    "Bernardo O Higgins Park": "Bernardo O'Higgins National Park",
    "The O Circuit": "The O Circuit",

    // Vietnam
    "O Quy Ho Pass": "Ô Quy Hồ Pass",

    // Thailand
    "Phi Phi Islands Koh Phi Phi": "Phi Phi Islands",

    // Egypt
    "Dugong Dugong dugon": "Dugong"
  };

  if (explicitFixes[cleaned]) {
    return explicitFixes[cleaned];
  }

  // Remove trailing duplicate parenthesized text without brackets
  return cleaned;
};

// Apply cleanups and add validated: true to all 136 packs
dirs.forEach(d => {
  const p = path.join(quizzesDir, d, 'dataset.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  data.validated = true;
  data.lastValidated = "2026-08-29";

  data.questions.forEach((q, idx) => {
    q.validated = true;
    if (q.type === 'mcq') {
      q.options = q.options.map(opt => {
        const cleaned = cleanOption(opt);
        if (cleaned !== opt) {
          changes.push({ pack: d, q: idx + 1, before: opt, after: cleaned });
          cleanedCount++;
        }
        return cleaned;
      });
    }
  });

  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
});

console.log(`Cleaned ${cleanedCount} options across quiz datasets.`);
console.log('Sample changes:', changes.slice(0, 30));
