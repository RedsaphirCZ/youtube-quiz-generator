const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 10. egypt-geography-heritage-60
// =========================================================================
const egyptCycles = [
  // Cycle 1: The Nile River Valley & Delta
  {
    mcqs: [
      {
        q: "What percentage of Egypt modern population of over 105 million people lives crammed along the fertile green ribbon of the Nile River valley and delta?",
        correct: "Over 95 Percent",
        w1: "70 Percent",
        w2: "50 Percent",
        exp: "Described by Greek historian Herodotus as the Gift of the Nile, Egypt population is concentrated on only four percent of its total land area."
      },
      {
        q: "What broad triangular river delta fan in northern Egypt stretches 240 kilometers along the Mediterranean coast from Alexandria to Port Said?",
        correct: "The Nile Delta Lower Egypt",
        w1: "The Fayum Oasis",
        w2: "The Qattara Basin",
        exp: "The Nile Delta divides into two primary distributary branches: the Rosetta branch in the west and the Damietta branch in the east."
      },
      {
        q: "What is the capital and largest metropolitan city of Egypt and the Arab world, located on the Nile immediately south of the Delta?",
        correct: "Cairo Al-Qahirah",
        w1: "Alexandria",
        w2: "Giza",
        exp: "Founded in 969 CE by the Fatimid dynasty, Cairo is known as the City of a Thousand Minarets, famous for the historic Khan el-Khalili bazaar."
      },
      {
        q: "Which ancient seaport on the western branch of the Nile Delta is famous for the 1799 discovery of the trilingual Rosetta Stone?",
        correct: "Rashid Rosetta",
        w1: "Damietta",
        w2: "Marsa Matruh",
        exp: "French army captain Pierre-François Bouchard discovered the basalt stele inscribed with Egyptian hieroglyphs, Demotic, and Greek at Fort Julien in Rosetta."
      },
      {
        q: "What circular depression and lake oasis south of Cairo is irrigated by the ancient Bahr Yussef canal branching from the Nile River?",
        correct: "Faiyum Oasis",
        w1: "Siwa Oasis",
        w2: "Bahariya Oasis",
        exp: "Faiyum is home to Lake Moeris (Birket Qarun) and the UNESCO World Heritage site Wadi Al-Hitan (Valley of the Whales), preserving early whale fossils."
      }
    ],
    number: {
      q: "What percentage of Egypt population lives within the fertile Nile River Valley and Nile Delta?",
      target: 95,
      unit: "percent",
      imperial: "95% of national population",
      exp: "More than 95 percent of Egypt's population resides along the narrow Nile corridor and delta, leaving 96% of the country as uninhabited desert."
    }
  },

  // Cycle 2: The Giza Plateau & Old Kingdom Pyramids
  {
    mcqs: [
      {
        q: "What monumental tomb on the Giza Plateau was the tallest human-made structure on Earth for over 3,800 years, built for Pharaoh Khufu around 2560 BCE?",
        correct: "The Great Pyramid of Giza",
        w1: "Pyramid of Khafre",
        w2: "Pyramid of Menkaure",
        exp: "Constructed from 2.3 million limestone blocks weighing an average of 2.5 tons each, the Great Pyramid is the only surviving Wonder of the Ancient World."
      },
      {
        q: "What colossal monolithic limestone statue on the Giza Plateau depicts a mythical creature with the body of a lion and the head of Pharaoh Khafre?",
        correct: "The Great Sphinx of Giza",
        w1: "Colossi of Memnon",
        w2: "Avenue of Sphinxes",
        exp: "Carved directly from the natural limestone bedrock of the Mokattam Formation, the Great Sphinx stands seventy-three meters long and twenty meters high."
      },
      {
        q: "Which ancient necropolis south of Cairo features the Step Pyramid of Djoser, engineered by royal architect Imhotep as the world first colossal stone building?",
        correct: "Saqqara",
        w1: "Dahshur",
        w2: "Meidum",
        exp: "Built in the 27th century BCE, the Step Pyramid consists of six receding mastaba platforms rising sixty-two meters above subterranean funerary galleries."
      },
      {
        q: "Which royal pyramid field in Dahshur features the Bent Pyramid (with a sudden angle shift from 54 to 43 degrees) and the world first true smooth-sided Red Pyramid?",
        correct: "Dahshur Necropolis",
        w1: "Abusir",
        w2: "Hawara",
        exp: "Pharaoh Sneferu (father of Khufu) built both pyramids, perfecting structural engineering to transition from stepped to smooth pyramid architecture."
      },
      {
        q: "What newly opened colossal museum near the Giza Pyramids is the largest archaeological museum complex in the world dedicated to a single civilization?",
        correct: "Grand Egyptian Museum GEM",
        w1: "Museum of Egyptian Antiquities",
        w2: "National Museum of Egyptian Civilization",
        exp: "The GEM houses over 100,000 ancient artifacts, displaying the complete 5,000-piece treasure collection of King Tutankhamun for the first time."
      }
    ],
    number: {
      q: "What was the original height in meters of the Great Pyramid of Giza when completed with its polished white Tura limestone casing stones?",
      target: 147,
      unit: "meters",
      imperial: "481 feet tall",
      exp: "The Great Pyramid originally stood 146.6 meters (rounded to 147 m) tall before the erosion and theft of its outer casing and capstone (pyramidion)."
    }
  },

  // Cycle 3: The Sinai Peninsula & Mount Sinai
  {
    mcqs: [
      {
        q: "What triangular desert peninsula between the Mediterranean Sea and Red Sea forms the only part of Egyptian territory located geographically in Asia?",
        correct: "Sinai Peninsula",
        w1: "Eastern Desert",
        w2: "Western Desert",
        exp: "Covering 60,000 square kilometers, the Sinai acts as a geopolitical land bridge between Africa and Asia, bounded by the Gulf of Suez and Gulf of Aqaba."
      },
      {
        q: "What sacred 2,285-meter granite mountain peak in the southern Sinai is venerated in Abrahamic religions as the biblical site where Moses received the Ten Commandments?",
        correct: "Mount Sinai Jabal Musa",
        w1: "Mount Catherine",
        w2: "Mount Serbal",
        exp: "Pilgrims ascend the 3,750 Steps of Penitence carved by monks to reach the summit chapel and mosque for sunrise across the rugged granite peaks."
      },
      {
        q: "What is the highest mountain peak in all of Egypt, rising 2,629 meters in the southern Sinai highlands near Saint Catherine?",
        correct: "Mount Catherine Jabal Katrinah",
        w1: "Mount Sinai",
        w2: "Jabal Umm Shumar",
        exp: "Named after Christian martyr Saint Catherine of Alexandria, the peak receives seasonal winter snowfall and commands views over both the Gulf of Suez and Aqaba."
      },
      {
        q: "Which UNESCO World Heritage 6th-century Greek Orthodox monastery at the foot of Mount Sinai is the oldest continuously functioning Christian monastery in the world?",
        correct: "Saint Catherine Monastery",
        w1: "Monastery of Saint Anthony",
        w2: "Monastery of Saint Paul",
        exp: "Built by Byzantine Emperor Justinian I between 548 and 565 CE, the monastery houses the traditional Burning Bush and the Codex Sinaiticus history."
      },
      {
        q: "Which major international resort city on the southern tip of the Sinai Peninsula is world-famous for coral reef diving along the Strait of Tiran?",
        correct: "Sharm El Sheikh",
        w1: "Hurghada",
        w2: "Dahab",
        exp: "Sharm El Sheikh is home to Ras Mohammed National Park, featuring vertical underwater coral reef walls that plunge over eight hundred meters into the Red Sea."
      }
    ],
    number: {
      q: "What is the summit elevation in meters of Mount Catherine (Jabal Katrinah), the highest mountain in Egypt?",
      target: 2629,
      unit: "meters",
      imperial: "8,625 feet",
      exp: "Mount Catherine in the southern Sinai Peninsula stands at an official elevation of 2,629 meters above sea level."
    }
  },

  // Cycle 4: The Suez Canal & Maritime Geopolitics
  {
    mcqs: [
      {
        q: "What 193-kilometer sea-level artificial waterway in Egypt opened in November 1869, connecting the Mediterranean Sea directly to the Red Sea?",
        correct: "Suez Canal",
        w1: "Panama Canal",
        w2: "Corinth Canal",
        exp: "Engineered under French diplomat Ferdinand de Lesseps, the Suez Canal eliminated the 7,000-kilometer voyage around Africa Cape of Good Hope."
      },
      {
        q: "Which Egyptian president famously nationalized the Suez Canal Company on July 26, 1956, triggering the international Suez Crisis (Tripartite Aggression)?",
        correct: "Gamal Abdel Nasser",
        w1: "Anwar Sadat",
        w2: "Hosni Mubarak",
        exp: "Nasser used canal transit toll revenues to finance the construction of the Aswan High Dam following the withdrawal of Western development funding."
      },
      {
        q: "Which northern terminus port city at the Mediterranean entrance to the Suez Canal was founded in 1859 during the canal excavation?",
        correct: "Port Said",
        w1: "Ismailia",
        w2: "Suez",
        exp: "Port Said features colonial elevated arcades and served as the international refueling coaling station for steamships transiting to Asia and Australia."
      },
      {
        q: "What massive 400-meter container ship ran aground and blocked all maritime traffic through the Suez Canal for six days in March 2021?",
        correct: "Ever Given",
        w1: "Ever Forward",
        w2: "Emma Maersk",
        exp: "The blockage halted an estimated nine billion dollars of global trade per day, requiring specialized dredgers and tugboats to refloat the giant vessel."
      },
      {
        q: "What 35-kilometer parallel waterway project opened in August 2015, doubling daily shipping capacity and allowing simultaneous two-way traffic in the canal?",
        correct: "The New Suez Canal",
        w1: "The Great Bitter Bypass",
        w2: "The Ismailia Extension",
        exp: "Constructed in just twelve months under President Abdel Fattah el-Sisi, the expansion reduced average transit waiting times from eighteen to eleven hours."
      }
    ],
    number: {
      q: "In what year did the Suez Canal officially open for international maritime navigation with a lavish royal ceremony?",
      target: 1869,
      unit: "year",
      imperial: "1869 AD",
      exp: "The Suez Canal was formally dedicated on November 17, 1869, attended by European monarchs including French Empress Eugénie."
    }
  },

  // Cycle 5: The Western Desert & Historic Oases
  {
    mcqs: [
      {
        q: "Which isolated oasis in the Western Desert near the Libyan border is famous for freshwater springs, date palm groves, and the ancient Oracle of Amun?",
        correct: "Siwa Oasis",
        w1: "Bahariya Oasis",
        w2: "Farafra Oasis",
        exp: "Alexander the Great trekked 500 kilometers across the desert to Siwa in 331 BCE, where the oracle proclaimed him the divine son of the god Amun (Zeus-Ammon)."
      },
      {
        q: "What surreal national park near Farafra Oasis in the Western Desert is famous for dramatic mushroom-shaped white chalk rock formations sculpted by desert sandstorms?",
        correct: "The White Desert Sahara el Beyda",
        w1: "The Black Desert",
        w2: "The Crystal Mountain",
        exp: "The chalk formations are eroded ventifacts of ancient Cretaceous marine seafloor deposits, glowing ghost-white under full moonlight."
      },
      {
        q: "What is the vast hyper-arid desert region west of the Nile River that covers two-thirds of Egypt, forming the eastern section of the Sahara?",
        correct: "The Western Desert Libyan Desert",
        w1: "The Eastern Desert",
        w2: "The Nubian Desert",
        exp: "The Western Desert spans 680,000 square kilometers, containing the Great Sand Sea, five major oases, and deep endorheic basins."
      },
      {
        q: "Which desert oasis in the New Valley Governorate is home to the Temple of Hibis, the only major standing Persian-era temple in Egypt?",
        correct: "Kharga Oasis",
        w1: "Dakhla Oasis",
        w2: "Farafra Oasis",
        exp: "Kharga was a major trading station on the ancient Forty Days Road (Darb al-Arbain) camel caravan route connecting the Nile with Darfur in Sudan."
      },
      {
        q: "What striking volcanic desert region near Bahariya Oasis features hundreds of volcanic cone hills capped with black basalt and iron stones?",
        correct: "The Black Desert",
        w1: "The White Desert",
        w2: "The Red Valley",
        exp: "The black hills contrast with orange desert sands, formed by weathered dolerite and basalt sills from ancient Jurassic volcanic eruptions."
      }
    ],
    number: {
      q: "In what year BCE did Alexander the Great trek across the Western Desert to consult the sacred Oracle of Amun at Siwa Oasis?",
      target: 331,
      unit: "BCE",
      imperial: "331 BC",
      exp: "Alexander made his famous pilgrimage to the Siwa Oracle in early 331 BCE, confirming his legitimacy as Pharaoh of Egypt."
    }
  },

  // Cycle 6: Upper Egypt, Luxor & The Valley of the Kings
  {
    mcqs: [
      {
        q: "Which city in Upper Egypt along the Nile, built on the site of the ancient New Kingdom capital of Thebes, is called the World Greatest Open-Air Museum?",
        correct: "Luxor",
        w1: "Aswan",
        w2: "Edfu",
        exp: "Luxor encompasses the grand Luxor Temple, the monumental Karnak complex on the East Bank, and the royal tombs on the West Bank."
      },
      {
        q: "What is the largest ancient religious temple complex ever constructed on Earth, dedicated to the Theban Triad of Amun, Mut, and Khonsu?",
        correct: "Karnak Temple Complex",
        w1: "Luxor Temple",
        w2: "Temple of Edfu",
        exp: "Karnak was expanded over two thousand years by thirty successive pharaohs, featuring the Great Hypostyle Hall with 134 colossal sandstone papyrus columns."
      },
      {
        q: "In which royal rock-cut burial valley on the West Bank of Luxor did British archaeologist Howard Carter discover the intact tomb of King Tutankhamun (KV62) in 1922?",
        correct: "Valley of the Kings Wadi al-Muluk",
        w1: "Valley of the Queens",
        w2: "Valley of the Nobles",
        exp: "KV62 contained over 5,000 priceless burial treasures, including Tutankhamun iconic solid gold funerary mask inlaid with lapis lazuli and carnelian."
      },
      {
        q: "Which monumental mortuary temple carved into the sheer limestone cliffs of Deir el-Bahari was built for Egypt greatest female pharaoh?",
        correct: "Temple of Hatshepsut",
        w1: "The Ramesseum",
        w2: "Medinet Habu",
        exp: "Designed by royal architect Senenmut with three colonnaded terraces, the temple depicts Hatshepsut divine birth and the famous trade expedition to Punt."
      },
      {
        q: "What two colossal 18-meter stone statues of Pharaoh Amenhotep III stand solitary on the West Bank of Luxor, known for making musical sounds at sunrise in Roman times?",
        correct: "Colossi of Memnon",
        w1: "Statues of Ramses",
        w2: "Avenue of Rams",
        exp: "Roman tourists flocked to hear the northern statue sing at dawn, caused by acoustic thermal expansion of cracked quartzite stone until repaired by Septimius Severus."
      }
    ],
    number: {
      q: "In what year did British archaeologist Howard Carter discover the sealed, intact tomb of Pharaoh Tutankhamun in the Valley of the Kings?",
      target: 1922,
      unit: "year",
      imperial: "1922 AD",
      exp: "Howard Carter entered the tomb of Tutankhamun on November 26, 1922, famously declaring he saw wonderful things."
    }
  },

  // Cycle 7: Aswan, Lake Nasser & Nubian Relocations
  {
    mcqs: [
      {
        q: "Which massive rock-fill embankment dam across the Nile River, completed in 1970, ended annual Nile flooding and created the colossal reservoir Lake Nasser?",
        correct: "Aswan High Dam As-Sadd al-Aali",
        w1: "Aswan Low Dam",
        w2: "Grand Renaissance Dam",
        exp: "The dam generated half of Egypt national electricity upon opening, containing seventeen times more material volume than the Great Pyramid of Giza."
      },
      {
        q: "What colossal twin rock-cut temples in southern Egypt, built by Pharaoh Ramses II for himself and Queen Nefertari, were dismantled and relocated block by block by UNESCO in 1968?",
        correct: "Abu Simbel Temples",
        w1: "Philae Temples",
        w2: "Kalabsha Temple",
        exp: "To save the temples from the rising waters of Lake Nasser, engineers cut the mountain into 20-ton blocks and reassembled them inside a hollow artificial concrete mountain."
      },
      {
        q: "What is the name of the massive 500-kilometer artificial reservoir lake created behind the Aswan High Dam, extending across the border into Sudan?",
        correct: "Lake Nasser",
        w1: "Lake Moeris",
        w2: "Lake Nubia",
        exp: "Lake Nasser covers over 5,200 square kilometers, named after President Gamal Abdel Nasser and supporting an inland freshwater Nile perch fishery."
      },
      {
        q: "Which island temple complex dedicated to the goddess Isis in Aswan was submerged by earlier damming and moved to nearby Agilkia Island in a 1970s UNESCO rescue?",
        correct: "Temple of Philae",
        w1: "Temple of Kom Ombo",
        w2: "Temple of Esna",
        exp: "Philae was the last surviving active temple of ancient Egyptian religion, where the final known hieroglyphic inscription was carved on August 24, 394 CE."
      },
      {
        q: "What ancient stone quarry in Aswan contains a 42-meter unfinished granite monument that cracked during carving and remains attached to the bedrock?",
        correct: "The Unfinished Obelisk",
        w1: "The Red Granite Quarry",
        w2: "The Gebel el-Silsila Quarry",
        exp: "If completed, the obelisk would have weighed roughly 1,200 tons (the heaviest single piece of stone ever quarried by ancient Egyptians), demonstrating stone carving techniques with diorite pounding balls."
      }
    ],
    number: {
      q: "In what year was the construction of the Aswan High Dam officially completed across the Nile River in southern Egypt?",
      target: 1970,
      unit: "year",
      imperial: "1970 AD",
      exp: "Construction of the Aswan High Dam was completed on July 21, 1970, and formally inaugurated in January 1971."
    }
  },

  // Cycle 8: Alexandria & The Mediterranean Coast
  {
    mcqs: [
      {
        q: "Which historic port city on the Mediterranean coast of Egypt was founded in 331 BCE by Alexander the Great, becoming the Hellenistic capital of the Ptolemaic Kingdom?",
        correct: "Alexandria",
        w1: "Port Said",
        w2: "Damietta",
        exp: "Alexandria was the intellectual capital of the classical world, home to the Great Library, Mouseion academy, and Queen Cleopatra VII palace."
      },
      {
        q: "What towering 100-meter ancient stone lighthouse on the island of Pharos in Alexandria was one of the Seven Wonders of the Ancient World?",
        correct: "Lighthouse of Alexandria Pharos",
        w1: "Colossus of Rhodes",
        w2: "Temple of Artemis",
        exp: "Built by Sostratus of Cnidus around 280 BCE, the lighthouse guided ships with a massive bronze mirror reflecting firelight until destroyed by medieval earthquakes."
      },
      {
        q: "What 15th-century defensive fortress on the Mediterranean coast of Alexandria was built by Mamluk Sultan Qaitbay on the exact foundations of the destroyed Pharos Lighthouse?",
        correct: "Citadel of Qaitbay",
        w1: "Cairo Citadel",
        w2: "Fort Julien",
        exp: "Sultan Al-Ashraf Qaitbay incorporated fallen limestone and granite blocks from the collapsed ancient lighthouse directly into the fortress walls."
      },
      {
        q: "What modern eleven-story disc-shaped library opened on the Mediterranean waterfront of Alexandria in 2002 to commemorate the ancient Great Library?",
        correct: "Bibliotheca Alexandrina",
        w1: "National Library of Egypt",
        w2: "Arab League Library",
        exp: "Designed by Norwegian architectural firm Snøhetta, the granite exterior wall is carved with characters from 120 different world human writing scripts."
      },
      {
        q: "Which subterranean Roman necropolis in Alexandria features three levels of rock-cut burial chambers blending ancient Egyptian, Greek, and Roman sculptural motifs?",
        correct: "Catacombs of Kom El Shoqafa",
        w1: "Shatby Necropolis",
        w2: "Anfushi Tombs",
        exp: "Discovered accidentally in 1900 when a donkey fell into an access shaft, the catacombs contain statues wearing Roman togas alongside Egyptian jackal god Anubis."
      }
    ],
    number: {
      q: "In what year BCE was the city of Alexandria officially founded on the Mediterranean coast of Egypt by Alexander the Great?",
      target: 331,
      unit: "BCE",
      imperial: "331 BC",
      exp: "Alexander the Great founded Alexandria in April 331 BCE, designed by Greek architect Dinocrates of Rhodes."
    }
  },

  // Cycle 9: The Red Sea, Eastern Desert & Coral Reefs
  {
    mcqs: [
      {
        q: "What famous, deep marine sinkhole on the coast of Dahab in the Sinai plunges over one hundred meters, dubbed the Diver Cemetery for extreme technical diving?",
        correct: "The Blue Hole",
        w1: "The Arch Cave",
        w2: "Ras Um Sid",
        exp: "The Blue Hole features a 26-meter underwater tunnel archway opening to the open Red Sea at a depth of fifty-six meters, prone to nitrogen narcosis."
      },
      {
        q: "What tectonic rift body of water between Africa and the Arabian Peninsula has some of the highest marine biodiversity and heat-resilient coral reefs in the world?",
        correct: "The Red Sea",
        w1: "The Persian Gulf",
        w2: "The Gulf of Oman",
        exp: "Red Sea corals exhibit exceptional genetic tolerance to high water temperatures and salinity, studied globally for coral reef climate change resilience."
      },
      {
        q: "What mountain range in the Eastern Desert parallel to the Red Sea coast was heavily quarried by Roman emperors for rare imperial purple porphyry stone?",
        correct: "Red Sea Hills Mons Porphyrites",
        w1: "Sinai Mountains",
        w2: "Gilf Kebir",
        exp: "Mons Porphyrites was the only known quarry on Earth for imperial porphyry, used exclusively for Roman imperial statues, sarcophagi, and the Pantheon floor."
      },
      {
        q: "Which marine national park at the southern tip of the Sinai Peninsula features legendary coral reefs like Shark Reef and Yolanda Reef?",
        correct: "Ras Mohammed National Park",
        w1: "Wadi El Gemal",
        w2: "Zaranik Protectorate",
        exp: "Established in 1983 as Egypt first national park, Ras Mohammed is home to over 220 species of coral and 1,000 species of marine fish."
      },
      {
        q: "Which gentle, herbivorous marine mammal species (sea cow) grazes on shallow seagrass beds in protected Red Sea bays like Abu Dabbab?",
        correct: "Dugong Dugong dugon",
        w1: "Manatee",
        w2: "Harbor Seal",
        exp: "Dugongs in the Red Sea are closely monitored by marine biologists, coexisting alongside green sea turtles and guitarfish in coastal lagoons."
      }
    ],
    number: {
      q: "What is the maximum depth in meters of the famous vertical Blue Hole marine sinkhole in Dahab along the Red Sea?",
      target: 120,
      unit: "meters",
      imperial: "394 feet deep",
      exp: "The Blue Hole sinkhole plunges to a maximum depth of approximately 120 meters (394 feet) inside a coastal coral reef shelf."
    }
  },

  // Cycle 10: Geographic Depressions, Borders & Egyptian Superlatives
  {
    mcqs: [
      {
        q: "What massive desert depression in northwestern Egypt sinks to 133 meters below sea level, the second lowest point in Africa after Lake Assal?",
        correct: "Qattara Depression",
        w1: "Danakil Depression",
        w2: "Faiyum Depression",
        exp: "Covering 19,605 square kilometers (the size of New Jersey or Slovenia), the Qattara Depression contains vast salt pans, barchan dunes, and clay marshes."
      },
      {
        q: "What massive multi-billion-dollar reclamation project in southern Egypt pumps water from Lake Nasser into the Western Desert to create farmland around artificial lakes?",
        correct: "Toshka Project New Valley Project",
        w1: "Peace Canal Project",
        w2: "Suez Irrigation Corridor",
        exp: "The Sheikh Zayed Canal transports five billion cubic meters of water annually from the colossal Mubarak Pumping Station to reclaim thousands of desert acres."
      },
      {
        q: "How many administrative governorates (Muhafazat) comprise the Arab Republic of Egypt?",
        correct: "27 Governorates",
        w1: "20 Governorates",
        w2: "32 Governorates",
        exp: "Egypt is divided into twenty-seven governorates, ranging from dense urban governorates like Cairo and Alexandria to vast frontier desert governorates like New Valley and Matrouh."
      },
      {
        q: "What disputed 20,600-square-kilometer border area along the Red Sea between Egypt and Sudan has been administered under de facto Egyptian control since 2000?",
        correct: "Hala ib Triangle",
        w1: "Bir Tawil",
        w2: "Wadi Halfa Salient",
        exp: "The dispute stems from divergent 1899 political boundary and 1902 administrative boundary lines, leaving adjacent Bir Tawil as terra nullius claimed by neither nation."
      },
      {
        q: "What is the total geographical area of Egypt in square kilometers, ranking it as the 29th largest country in the world?",
        correct: "1,000,000 Square Kilometers",
        w1: "500,000 Square Kilometers",
        w2: "2,000,000 Square Kilometers",
        exp: "Egypt encompasses approximately 1.01 million square kilometers (roughly the size of Texas and New Mexico combined), spanning Northeast Africa and Southwest Asia."
      }
    ],
    number: {
      q: "What is the lowest elevation in meters below sea level reached by the Qattara Depression in Egypt Western Desert?",
      target: 133,
      unit: "meters below sea level",
      imperial: "436 feet below sea level",
      exp: "The lowest point of the Qattara Depression lies 133 meters below mean Mediterranean sea level."
    }
  }
];

// Build Egypt Quiz
buildQuiz({
  id: 'egypt-geography-heritage-60',
  theme: 'Egypt: Geography, The Nile & Ancient Monuments',
  title: 'Egypt: Geography, The Nile & Ancient Monuments',
  description: 'A 60-question grand master assessment exploring the Nile Valley and Delta, Giza Pyramids & Sphinx, Sinai Peninsula & Mount Sinai, the Suez Canal, Western Desert oases, Luxor & Valley of the Kings, Aswan Dam, Alexandria, and the Qattara Depression.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, egyptCycles);

console.log('Egypt quiz built successfully!');
