const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
const dirs = fs.readdirSync(quizzesDir).filter(d => fs.statSync(path.join(quizzesDir, d)).isDirectory()).sort();

let totalFixed = 0;
let fixLog = [];

// Helper to clean an option string from glued binomial names, translations, or trailing aliases
function cleanOptionString(opt) {
  let s = opt.trim();

  // 1. Binomial scientific names glued to end:
  // e.g. "Steller Sea Cow Hydrodamalis gigas" -> "Steller Sea Cow"
  // e.g. "Capybara Hydrochoerus hydrochaeris" -> "Capybara"
  // e.g. "Naked Mole-Rat Heterocephalus glaber" -> "Naked Mole-Rat"
  // e.g. "North American Beaver Castor canadensis" -> "North American Beaver"
  // e.g. "Arctic Fox Vulpes lagopus" -> "Arctic Fox"
  // e.g. "Giant Anteater Myrmecophaga tridactyla" -> "Giant Anteater"
  // e.g. "Giant Tube Worm Riftia pachyptila" -> "Giant Tube Worm"
  // e.g. "Pompeii Worm Alvinella pompejana" -> "Pompeii Worm"
  // e.g. "Colossal Squid Mesonychoteuthis hamiltoni" -> "Colossal Squid"
  // e.g. "Giant Isopod Bathynomus giganteus" -> "Giant Isopod"
  // e.g. "Sperm Whale Physeter macrocephalus" -> "Sperm Whale"
  // e.g. "Mariana Snailfish Pseudoliparis swirei" -> "Mariana Snailfish"
  // e.g. "Humpback Whale Megaptera novaeangliae" -> "Humpback Whale"
  // e.g. "Sea Otter Enhydra lutris" -> "Sea Otter"
  // e.g. "Geography Cone Snail Conus geographus" -> "Geography Cone Snail"
  // e.g. "Sea Wasp Chironex fleckeri" -> "Sea Wasp"
  // e.g. "Reef Stonefish Synanceia verrucosa" -> "Reef Stonefish"
  // e.g. "Titan Arum Amorphophallus titanum" -> "Titan Arum"
  // e.g. "Ghost Pipe Monotropa uniflora" -> "Ghost Pipe"
  // e.g. "Gympie-Gympie Dendrocnide moroides" -> "Gympie-Gympie"
  // e.g. "Coco de Mer Lodoicea maldivica" -> "Coco de Mer"
  // e.g. "Kitti Hog-nosed Bat Craseonycteris thonglongyai" -> "Kitti Hog-nosed Bat"

  // Regex pattern for capitalized Genus + lowercase species at the end of a multi-word string
  // e.g. " [A-Z][a-z]+ [a-z]+$"
  const binomialMatch = s.match(/^(.+?)\s+([A-Z][a-z]+)\s+([a-z]{3,})$/);
  if (binomialMatch) {
    const prefix = binomialMatch[1];
    const genus = binomialMatch[2];
    const species = binomialMatch[3];
    // Check if prefix itself is a full name
    const commonPrefixes = ['Bear', 'Fox', 'Wolf', 'Whale', 'Rat', 'Bat', 'Beaver', 'Otter', 'Cow', 'Squid', 'Octopus', 'Worm', 'Fish', 'Snail', 'Tree', 'Plant', 'Pipe', 'Arum', 'Seal', 'Armadillo', 'Anteater', 'Isopod', 'Jellyfish', 'Orchid', 'Spider', 'Beetle', 'Ant', 'Crab', 'Eagle', 'Falcon', 'Frog', 'Toad', 'Snake', 'Viper', 'Lizard', 'Tortoise', 'Shark', 'Ray', 'Grass', 'Moss', 'Fern', 'Pine', 'Cedar', 'Oak', 'Palm', 'Lily', 'Rose', 'Mushroom', 'Fungus', 'Flea', 'Fly', 'Mite', 'Moth', 'Bug', 'Duck', 'Owl', 'Penguin', 'Albatross', 'Parrot', 'Crow', 'Macaw', 'Toucan', 'Leopard', 'Tiger', 'Lion', 'Jaguar', 'Cheetah', 'Elephant', 'Rhino', 'Hippo', 'Giraffe', 'Zebra', 'Camel', 'Llama', 'Alpaca', 'Deer', 'Elk', 'Moose', 'Bison', 'Buffalo', 'Dolphin', 'Porpoise', 'Manatee', 'Dugong', 'Walrus', 'Capybara', 'Koala', 'Kangaroo', 'Wallaby', 'Wombat', 'Opossum', 'Possum', 'Platypus', 'Echidna', 'Sloth', 'Pangolin', 'Aardvark', 'Meerkat', 'Badger', 'Weasel', 'Marten', 'Ferret', 'Mink', 'Skunk', 'Raccoon', 'Panda', 'Hyena', 'Jackal', 'Coyote', 'Dingo', 'Chimpanzee', 'Bonobo', 'Gorilla', 'Orangutan', 'Gibbon', 'Baboon', 'Macaque', 'Lemur', 'Tarsier', 'Mongoose', 'Porcupine', 'Hedgehog', 'Mole', 'Shrew', 'Hare', 'Rabbit', 'Pika'];

    const hasCommonNoun = commonPrefixes.some(n => prefix.endsWith(n) || prefix.includes(n + ' '));
    if (hasCommonNoun || prefix.split(' ').length >= 2) {
      // It's a common name + binomial
      s = prefix;
    }
  }

  // Single genus at end: e.g. "Three-Banded Armadillo Tolypeutes" -> "Three-Banded Armadillo", "Blue-Ringed Octopus Hapalochlaena" -> "Blue-Ringed Octopus", "Hammer Orchids Drakaea" -> "Hammer Orchid", "Ferns Polypodiopsida" -> "Ferns"
  const singleGenusMatch = s.match(/^(.+?)\s+([A-Z][a-z]{4,})$/);
  if (singleGenusMatch) {
    const prefix = singleGenusMatch[1];
    const singleWord = singleGenusMatch[2];
    const commonPrefixes = ['Armadillo', 'Octopus', 'Orchids', 'Ferns', 'Jellyfish', 'Viper', 'Bat', 'Mole-Rat', 'Falcon', 'Eagle', 'Moth', 'Beetle', 'Ant', 'Frog', 'Snake', 'Moss', 'Tree', 'Fish', 'Worm'];
    if (commonPrefixes.some(n => prefix.endsWith(n) || prefix.includes(n + ' '))) {
      s = prefix;
    }
  }

  // 2. Glued Spanish / Portuguese / French / German local names:
  // e.g. "Río de la Plata River Plate" -> "Río de la Plata"
  // e.g. "Iguazu Falls Cataratas del Iguazú" -> "Iguazu Falls"
  // e.g. "The Devil Throat Garganta del Diablo" -> "Devil's Throat"
  // e.g. "Iberá Wetlands Esteros del Iberá" -> "Iberá Wetlands"
  // e.g. "Strait of Magellan Estrecho de Magallanes" -> "Strait of Magellan"
  // e.g. "Cueva de las Manos Cave of the Hands" -> "Cueva de las Manos"
  // e.g. "Valdés Peninsula Península Valdés" -> "Valdés Peninsula"
  // e.g. "Lake Argentino Lago Argentino" -> "Lake Argentino"
  // e.g. "Lake Buenos Aires Lake General Carrera" -> "Lake Buenos Aires"
  // e.g. "Malvinas Current Falkland Current" -> "Malvinas Current"
  // e.g. "Perito Moreno Glacier Glaciar Perito Moreno" -> "Perito Moreno Glacier"
  // e.g. "Mount Fitz Roy Cerro Chaltén" -> "Mount Fitz Roy"
  // e.g. "Beagle Channel Canal Beagle" -> "Beagle Channel"
  // e.g. "Lanín National Park Parque Nacional Lanín" -> "Lanín National Park"
  // e.g. "Los Glaciares National Park Parque Nacional Los Glaciares" -> "Los Glaciares National Park"
  // e.g. "Quebrada de Humahuaca Humahuaca Gorge" -> "Quebrada de Humahuaca"
  // e.g. "Talampaya National Park Parque Nacional Talampaya" -> "Talampaya National Park"
  // e.g. "Ischigualasto Provincial Park Valle de la Luna" -> "Ischigualasto (Valle de la Luna)"
  // e.g. "Nahuel Huapi Lake Lago Nahuel Huapi" -> "Lake Nahuel Huapi"
  // e.g. "Tierra del Fuego National Park Parque Nacional Tierra del Fuego" -> "Tierra del Fuego National Park"
  // e.g. "Bariloche San Carlos de Bariloche" -> "Bariloche"
  // e.g. "Ushuaia The End of the World" -> "Ushuaia"

  const specificReplacements = {
    "Río de la Plata River Plate": "Río de la Plata",
    "Iguazu Falls Cataratas del Iguazú": "Iguazu Falls",
    "The Devil Throat Garganta del Diablo": "Devil's Throat",
    "Iberá Wetlands Esteros del Iberá": "Iberá Wetlands",
    "Strait of Magellan Estrecho de Magallanes": "Strait of Magellan",
    "Cueva de las Manos Cave of the Hands": "Cueva de las Manos",
    "Valdés Peninsula Península Valdés": "Valdés Peninsula",
    "Lake Argentino Lago Argentino": "Lake Argentino",
    "Lake Buenos Aires Lake General Carrera": "Lake Buenos Aires",
    "Malvinas Current Falkland Current": "Malvinas Current",
    "Perito Moreno Glacier Glaciar Perito Moreno": "Perito Moreno Glacier",
    "Mount Fitz Roy Cerro Chaltén": "Mount Fitz Roy",
    "Beagle Channel Canal Beagle": "Beagle Channel",
    "Lanín National Park Parque Nacional Lanín": "Lanín National Park",
    "Los Glaciares National Park Parque Nacional Los Glaciares": "Los Glaciares National Park",
    "Quebrada de Humahuaca Humahuaca Gorge": "Quebrada de Humahuaca",
    "Talampaya National Park Parque Nacional Talampaya": "Talampaya National Park",
    "Ischigualasto Provincial Park Valle de la Luna": "Ischigualasto Provincial Park",
    "Nahuel Huapi Lake Lago Nahuel Huapi": "Lake Nahuel Huapi",
    "Tierra del Fuego National Park Parque Nacional Tierra del Fuego": "Tierra del Fuego National Park",
    "Bariloche San Carlos de Bariloche": "Bariloche",
    "Ushuaia The End of the World": "Ushuaia",
    "Punta Tombo Penguin Colony": "Punta Tombo",
    "Salinas Grandes Salt Flats": "Salinas Grandes",
    "Aconcagua Sentinel of Stone": "Aconcagua",
    "Pampas Grasslands Las Pampas": "Las Pampas",
    "Mount Tronador El Tronador": "Mount Tronador",
    "Cerro Torre Tower Mountain": "Cerro Torre",
    "Mount San Valentín San Valentín": "Mount San Valentín",
    "San Rafael Glacier Ventisquero San Rafael": "San Rafael Glacier",
    "Marble Caves Capillas de Mármol": "Marble Caves",
    "Lauca National Park Parque Nacional Lauca": "Lauca National Park",
    "Chiloé Churches Iglesias de Chiloé": "Chiloé Churches",
    "El Tatio Geysers Geiseres del Tatio": "El Tatio Geysers",
    "Valle de la Muerte Death Valley": "Valle de la Muerte",
    "Valle de la Luna Moon Valley": "Valle de la Luna",
    "Salar de Atacama Atacama Salt Flat": "Salar de Atacama",
    "Laguna Miscanti Miscanti Lake": "Laguna Miscanti",
    "Humberstone and Santa Laura Saltpeter Works": "Humberstone Saltpeter Works",
    "Sewell Mining Town Ciudad de las Escaleras": "Sewell Mining Town",
    "Conguillío National Park Los Paraguas": "Conguillío National Park",
    "Puyehue National Park Parque Nacional Puyehue": "Puyehue National Park",
    "Vicente Pérez Rosales National Park": "Vicente Pérez Rosales National Park",
    "Moai Statues of Rapa Nui": "Moai Statues",
    "Rano Kau Crater Volcano": "Rano Kau Crater",
    "Rano Raraku Moai Quarry": "Rano Raraku",
    "Ahu Tongariki 15 Moai Platform": "Ahu Tongariki",
    "Tapati Rapa Nui Festival": "Tapati Festival",
    "Central Valley Valle Central": "Central Valley",
    "Colchagua Valley Valle de Colchagua": "Colchagua Valley",
    "Maipo Valley Valle del Maipo": "Maipo Valley",
    "Casablanca Valley Valle de Casablanca": "Casablanca Valley",
    "Elqui Valley Valle de Elqui": "Elqui Valley",
    "Limarí Valley Valle del Limarí": "Limarí Valley",
    "Biobío River Río Biobío": "Biobío River",
    "Baker River Río Baker": "Baker River",
    "Calle-Calle River Río Calle-Calle": "Calle-Calle River",
    "Futaleufú River Río Futaleufú": "Futaleufú River",
    "Palena River Río Palena": "Palena River",
    "Petrohué Waterfalls Saltos del Petrohué": "Petrohué Waterfalls",
    "Llanquihue Lake Lago Llanquihue": "Lake Llanquihue",
    "Villarrica Lake Lago Villarrica": "Lake Villarrica",
    "Todos los Santos Lake Lake of All Saints": "Lake Todos los Santos",
    "Ranco Lake Lago Ranco": "Lake Ranco",
    "Rupanco Lake Lago Rupanco": "Lake Rupanco",
    "Puyehue Lake Lago Puyehue": "Lake Puyehue",
    "Calbuco Volcano Volcán Calbuco": "Calbuco Volcano",
    "Osorno Volcano Volcán Osorno": "Osorno Volcano",
    "Villarrica Volcano Volcán Villarrica": "Villarrica Volcano",
    "Llaima Volcano Volcán Llaima": "Llaima Volcano",
    "Lonquimay Volcano Volcán Lonquimay": "Lonquimay Volcano",
    "Lascar Volcano Volcán Láscar": "Lascar Volcano",
    "Guallatiri Volcano Volcán Guallatiri": "Guallatiri Volcano",
    "Parinacota Volcano Volcán Parinacota": "Parinacota Volcano",
    "Pomerape Volcano Volcán Pomerape": "Pomerape Volcano",
    "Licancabur Volcano Volcán Licancabur": "Licancabur Volcano",
    "San Pedro Volcano Volcán San Pedro": "San Pedro Volcano",
    "San Pablo Volcano Volcán San Pablo": "San Pablo Volcano",
    "Putana Volcano Volcán Putana": "Putana Volcano",
    "Isluga Volcano Volcán Isluga": "Isluga Volcano",
    "Olca Volcano Volcán Olca": "Olca Volcano",
    "Paruma Volcano Volcán Paruma": "Paruma Volcano",
    "Irruputuncu Volcano Volcán Irruputuncu": "Irruputuncu Volcano",
    "Alitar Volcano Volcán Alitar": "Alitar Volcano",
    "Pular Volcano Volcán Pular": "Pular Volcano",
    "Pajonales Volcano Volcán Pajonales": "Pajonales Volcano",
    "Socompa Volcano Volcán Socompa": "Socompa Volcano",
    "Llullaillaco Volcano Volcán Llullaillaco": "Llullaillaco Volcano",
    "Lastarria Volcano Volcán Lastarria": "Lastarria Volcano",
    "Cordón del Azufre Sulfur Ridge": "Cordón del Azufre",
    "San Félix Island Isla San Félix": "San Félix Island",
    "San Ambrosio Island Isla San Ambrosio": "San Ambrosio Island",
    "Alejandro Selkirk Island Masafuera": "Alejandro Selkirk Island",
    "Robinson Crusoe Island Más a Tierra": "Robinson Crusoe Island",
    "Santa Clara Island Isla Santa Clara": "Santa Clara Island",
    "Easter Island Isla de Pascua": "Easter Island",
    "Salas y Gómez Island Isla Salas y Gómez": "Salas y Gómez Island",
    "Navarino Island Isla Navarino": "Navarino Island",
    "Hoste Island Isla Hoste": "Hoste Island",
    "Dawson Island Isla Dawson": "Dawson Island",
    "Capitan Aracena Island Isla Capitán Aracena": "Capitán Aracena Island",
    "Clarence Island Isla Clarence": "Clarence Island",
    "Santa Inés Island Isla Santa Inés": "Santa Inés Island",
    "Riesco Island Isla Riesco": "Riesco Island",
    "Wellington Island Isla Wellington": "Wellington Island",
    "Campana Island Isla Campana": "Campana Island",
    "Patricio Lynch Island Isla Patricio Lynch": "Patricio Lynch Island",
    "Mornington Island Isla Mornington": "Mornington Island",
    "Madre de Dios Island Isla Madre de Dios": "Madre de Dios Island",
    "Duque de York Island Isla Duque de York": "Duque de York Island",
    "Chatham Island Isla Chatham": "Chatham Island",
    "Hanover Island Isla Hanover": "Hanover Island",
    "Jorge Montt Glacier Glaciar Jorge Montt": "Jorge Montt Glacier",
    "O'Higgins Glacier Glaciar O'Higgins": "O'Higgins Glacier",
    "Viedma Glacier Glaciar Viedma": "Viedma Glacier",
    "Upsala Glacier Glaciar Upsala": "Upsala Glacier",
    "Spegazzini Glacier Glaciar Spegazzini": "Spegazzini Glacier",
    "Mayo Glacier Glaciar Mayo": "Mayo Glacier",
    "Ameghino Glacier Glaciar Ameghino": "Ameghino Glacier",
    "Agassiz Glacier Glaciar Agassiz": "Agassiz Glacier",
    "Onelli Glacier Glaciar Onelli": "Onelli Glacier",
    "Bolados Glacier Glaciar Bolados": "Bolados Glacier",
    "Dickson Glacier Glaciar Dickson": "Dickson Glacier",
    "Grey Glacier Glaciar Grey": "Grey Glacier",
    "Tyndall Glacier Glaciar Tyndall": "Tyndall Glacier",
    "Geikie Glacier Glaciar Geikie": "Geikie Glacier",
    "Balmaceda Glacier Glaciar Balmaceda": "Balmaceda Glacier",
    "Serrano Glacier Glaciar Serrano": "Serrano Glacier",
    "Pía Glacier Glaciar Pía": "Pía Glacier",
    "Garibaldi Glacier Glaciar Garibaldi": "Garibaldi Glacier",
    "Águila Glacier Glaciar Águila": "Águila Glacier",
    "España Glacier Glaciar España": "España Glacier",
    "Holanda Glacier Glaciar Holanda": "Holanda Glacier",
    "Italia Glacier Glaciar Italia": "Italia Glacier",
    "Francia Glacier Glaciar Francia": "Francia Glacier",
    "Alemania Glacier Glaciar Alemania": "Alemania Glacier",
    "Romanche Glacier Glaciar Romanche": "Romanche Glacier",
    "Stoppani Glacier Glaciar Stoppani": "Stoppani Glacier",
    "Marinelli Glacier Glaciar Marinelli": "Marinelli Glacier",

    // Colombia
    "Caño Cristales River of Five Colors": "Caño Cristales",
    "Cocora Valley Valle de Cocora": "Cocora Valley",
    "Tatacoa Desert Desierto de la Tatacoa": "Tatacoa Desert",
    "Lost City Ciudad Perdida": "Lost City",
    "Salt Cathedral of Zipaquirá Catedral de Sal": "Salt Cathedral of Zipaquirá",
    "San Agustín Archaeological Park": "San Agustín Archaeological Park",
    "Tierradentro Archaeological Park": "Tierradentro Archaeological Park",
    "Chiribiquete National Park": "Chiribiquete National Park",
    "Tayrona National Park Parque Nacional Tayrona": "Tayrona National Park",
    "Los Nevados National Park Parque Nacional Los Nevados": "Los Nevados National Park",
    "Nevado del Ruiz Volcano Volcán Nevado del Ruiz": "Nevado del Ruiz",
    "Nevado del Huila Volcano Volcán Nevado del Huila": "Nevado del Huila",
    "Nevado del Tolima Volcano Volcán Nevado del Tolima": "Nevado del Tolima",
    "Nevado de Santa Isabel Volcano": "Nevado de Santa Isabel",
    "Puracé Volcano Volcán Puracé": "Puracé Volcano",
    "Galeras Volcano Volcán Galeras": "Galeras Volcano",
    "Doña Juana Volcano Volcán Doña Juana": "Doña Juana Volcano",
    "Cumbal Volcano Volcán Cumbal": "Cumbal Volcano",
    "Azufral Volcano Volcán Azufral": "Azufral Volcano",
    "Chiles Volcano Volcán Chiles": "Chiles Volcano",
    "Cerro Machín Volcano Volcán Cerro Machín": "Cerro Machín Volcano",
    "Romeral Volcano Volcán Romeral": "Romeral Volcano",
    "Paramillo Volcano Volcán Paramillo": "Paramillo Volcano",
    "Guatavita Lake Laguna de Guatavita": "Lake Guatavita",
    "Tota Lake Laguna de Tota": "Lake Tota",
    "La Cocha Lake Laguna de la Cocha": "Lake La Cocha",
    "Igualaque Lake Laguna de Iguaque": "Lake Iguaque",
    "Fúquene Lake Laguna de Fúquene": "Lake Fúquene",
    "Suesca Lake Laguna de Suesca": "Lake Suesca",
    "Chingaza National Park Parque Nacional Chingaza": "Chingaza National Park",
    "Sumapaz Páramo Páramo de Sumapaz": "Sumapaz Páramo",
    "Rabanal Páramo Páramo de Rabanal": "Rabanal Páramo",
    "Pisba National Park Parque Nacional Pisba": "Pisba National Park",
    "Cocuy National Park Parque Nacional El Cocuy": "El Cocuy National Park",
    "Sierra Nevada del Cocuy Güicán": "Sierra Nevada del Cocuy",
    "Ritacuba Blanco Peak": "Ritacuba Blanco",
    "San Cristóbal Hill Cerro de San Cristóbal": "San Cristóbal Hill",
    "Monserrate Hill Cerro de Monserrate": "Monserrate Hill",
    "Guadalupe Hill Cerro de Guadalupe": "Guadalupe Hill",
    "La Candelaria Historic District": "La Candelaria",
    "Gold Museum Museo del Oro": "Gold Museum",
    "Botero Museum Museo Botero": "Botero Museum",
    "National Museum of Colombia Museo Nacional": "National Museum of Colombia",
    "San Felipe de Barajas Castle Castillo San Felipe": "San Felipe de Barajas Castle",
    "Las Lajas Sanctuary Santuario de Las Lajas": "Las Lajas Sanctuary",

    // Science & Tech cleanups
    "Magnetic floating needle compass": "Magnetic compass",
    "First Continental Congress in Philadelphia": "Philadelphia",
    "Baron Friedrich Wilhelm von Steuben": "Friedrich von Steuben",
    "Confucian bureaucratic opposition and northern frontier threats": "Bureaucratic opposition and northern border defense",
    "Wood Wide Web Mycorrhizal Network": "Wood Wide Web",
    "Ballochory Explosive Dehiscence": "Ballochory",
    "Crassulacean Acid Metabolism CAM": "CAM Photosynthesis",
    "Induced Chemical Defense": "Systemic Induced Defense"
  };

  if (specificReplacements[s]) {
    s = specificReplacements[s];
  }

  return s;
}

// Clean all datasets
dirs.forEach(d => {
  const p = path.join(quizzesDir, d, 'dataset.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  data.questions.forEach((q, idx) => {
    if (q.type === 'mcq') {
      q.options = q.options.map(opt => {
        const cleaned = cleanOptionString(opt);
        if (cleaned !== opt) {
          totalFixed++;
          fixLog.push({ pack: d, q: idx + 1, before: opt, after: cleaned });
          return cleaned;
        }
        return opt;
      });
    }
  });

  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
});

console.log(`Cleaned and balanced ${totalFixed} option flaws across all quiz datasets.`);
console.log('Sample fixes:\n', JSON.stringify(fixLog.slice(0, 25), null, 2));
