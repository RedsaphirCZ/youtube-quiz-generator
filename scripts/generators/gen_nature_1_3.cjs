const { buildQuiz } = require('./generate_helpers.cjs');

// -------------------------------------------------------------
// 1. animal-kingdom-super-predators-60
// -------------------------------------------------------------
const predatorCycles = [
  // Cycle 1: Big Cats (Panthera)
  {
    mcqs: [
      {
        q: "Which big cat is the largest wild feline species by body mass on Earth?",
        correct: "Tiger",
        w1: "Lion",
        w2: "Jaguar",
        exp: "Adult male Siberian and Bengal tigers can exceed 300 kilograms, making Panthera tigris the heaviest wild feline species."
      },
      {
        q: "What anatomical structure allows lions, tigers, jaguars, and leopards to roar rather than purr?",
        correct: "Incompletely ossified flexible hyoid bone",
        w1: "Elongated trachea",
        w2: "Enlarged nasal resonating chambers",
        exp: "A flexible cartilage ligament in the hyoid apparatus combined with specialized vocal cord pads enables big cats in the genus Panthera to produce deep, low-frequency roars."
      },
      {
        q: "Which big cat possesses the strongest bite force relative to body size of any feline, capable of piercing turtle shells and caiman skulls?",
        correct: "Jaguar",
        w1: "Cougar",
        w2: "Snow Leopard",
        exp: "Jaguars employ an unusual killing bite that pierces directly through temporal bones of mammalian skulls or reptile shells into the brain."
      },
      {
        q: "What is the only big cat that regularly lives and hunts in organized social family groups called prides?",
        correct: "Lion",
        w1: "Cheetah",
        w2: "Leopard",
        exp: "Lions are unique among felids for their social pride structure, typically consisting of related females, their offspring, and a coalition of resident males."
      },
      {
        q: "Which high-altitude big cat native to Central Asia has wide paws functioning as natural snowshoes and an extra-long tail for thermal wrapping?",
        correct: "Snow Leopard",
        w1: "Clouded Leopard",
        w2: "Eurasian Lynx",
        exp: "The snow leopard Panthera uncia is specially adapted to rugged Himalayan peaks with dense fur, wide footpads, and a thick tail used for balance and warmth."
      }
    ],
    number: {
      q: "What is the top sprinting speed in km/h achieved by a cheetah during short bursts across open savannah?",
      target: 112,
      unit: "km/h",
      imperial: "70 mph (112 km/h)",
      exp: "Cheetahs can accelerate from zero to 97 km/h in under three seconds, reaching peak recorded sprint speeds between 105 and 112 km/h."
    }
  },

  // Cycle 2: Bear & Arctic Apex Giants
  {
    mcqs: [
      {
        q: "Which bear species is classified as the largest extant terrestrial mammalian predator on Earth?",
        correct: "Polar Bear",
        w1: "Grizzly Bear",
        w2: "Spectacled Bear",
        exp: "Ursus maritimus is classified as a marine mammal and terrestrial carnivore, with large males reaching over 2.5 meters in length."
      },
      {
        q: "What color is the actual skin beneath a polar bear dense fur coat?",
        correct: "Black",
        w1: "Pink",
        w2: "White",
        exp: "Polar bear skin is black to absorb heat from solar radiation, while their hollow guard hairs are pigmentless and reflect visible light."
      },
      {
        q: "What marine mammal species is the primary staple prey item of polar bears hunting on Arctic sea ice?",
        correct: "Ringed Seal",
        w1: "Walrus",
        w2: "Beluga Whale",
        exp: "Ringed seals provide the high-fat blubber diet essential for polar bears to survive long fasting periods on the Arctic ice."
      },
      {
        q: "What coastal brown bear subspecies native to southwest Alaskan islands rivals the polar bear in total body mass?",
        correct: "Kodiak Bear",
        w1: "Eurasian Brown Bear",
        w2: "Tibetan Blue Bear",
        exp: "Kodiak bears Ursus arctos middendorffi thrive on abundant salmon runs and nutrient-dense vegetation, allowing males to reach massive weights."
      },
      {
        q: "What state of metabolic dormancy allows bears to survive winter without eating, drinking, or excreting waste for months?",
        correct: "Torpor",
        w1: "Obligate Diapause",
        w2: "Estivation",
        exp: "Unlike true deep hibernators, bears enter winter torpor where body temperature drops only slightly while heart rate slows dramatically, allowing quick arousal if threatened."
      }
    ],
    number: {
      q: "What is the maximum recorded weight in kilograms for a colossal adult male Polar Bear in the wild?",
      target: 800,
      unit: "kg",
      imperial: "1,764 lbs (800 kg)",
      exp: "While average adult males weigh 400 to 600 kg, exceptional male polar bears have been documented weighing up to 800 to 1,000 kg."
    }
  },

  // Cycle 3: Ocean Apex Hunters
  {
    mcqs: [
      {
        q: "Which marine apex predator is known to hunt blue whales, great white sharks, and sea lions in highly coordinated matrilineal pods?",
        correct: "Orca Killer Whale",
        w1: "Sperm Whale",
        w2: "Shortfin Mako Shark",
        exp: "Orcinus orca is the largest member of the oceanic dolphin family, employing sophisticated dialect-specific cultural hunting strategies across world oceans."
      },
      {
        q: "What specialized electroreceptive organs allow sharks to detect the faint electrical fields generated by prey muscle contractions?",
        correct: "Ampullae of Lorenzini",
        w1: "Lateral line canals",
        w2: "Otolith organs",
        exp: "Ampullae of Lorenzini are jelly-filled pores covering shark snouts that can detect electrical gradients as minute as a few nanovolts per centimeter."
      },
      {
        q: "Which shark species is recognized as the fastest swimmer in the ocean, capable of burst speeds exceeding 70 km/h?",
        correct: "Shortfin Mako Shark",
        w1: "Great White Shark",
        w2: "Tiger Shark",
        exp: "The shortfin mako Isurus oxyrinchus features an extremely streamlined hydrodynamic body and endothermic heat exchange system enabling explosive swimming speeds."
      },
      {
        q: "What deep-diving toothed whale is the primary predator of giant and colossal squids in the oceanic mesopelagic and bathypelagic zones?",
        correct: "Sperm Whale",
        w1: "Baird Beaked Whale",
        w2: "Humpback Whale",
        exp: "Sperm whales Physeter macrocephalus dive deeper than 2,000 meters for over an hour to hunt deep-sea cephalopods using powerful acoustic clicks."
      },
      {
        q: "What waxy lipid-filled organ located in the head of a sperm whale plays a crucial role in focusing echolocation clicks?",
        correct: "Spermaceti Organ",
        w1: "Melon bulb",
        w2: "Gular sac",
        exp: "The spermaceti organ holds hundreds of gallons of spermaceti oil, acting as an acoustic lens that concentrates high-intensity echolocation beam pulses."
      }
    ],
    number: {
      q: "What is the maximum verified length in meters of a large adult female Great White Shark Carcharodon carcharias?",
      target: 6,
      unit: "meters",
      imperial: "20 feet (6.0 m)",
      exp: "The largest verified female great white sharks, such as Deep Blue off Guadalupe Island, measure approximately 6.0 to 6.1 meters in total length."
    }
  },

  // Cycle 4: Prehistoric Apex Beasts
  {
    mcqs: [
      {
        q: "What colossal prehistoric shark grew up to 18 meters long and preyed upon ancient whales during the Neogene period?",
        correct: "Otodus Megalodon",
        w1: "Dunkleosteus",
        w2: "Helicoprion",
        exp: "Megalodon was an apex marine predator that dominated global oceans from roughly 23 million to 3.6 million years ago with serrated teeth over 18 cm long."
      },
      {
        q: "What iconic genus of saber-toothed cats roamed the Americas during the Pleistocene with canine teeth reaching 28 cm?",
        correct: "Smilodon",
        w1: "Machairodus",
        w2: "Homotherium",
        exp: "Smilodon fatalis and Smilodon populator used their massive, flattened upper canines to sever throat arteries and windpipes of megafauna."
      },
      {
        q: "What massive extinct snake discovered in fossil deposits of Colombia grew up to 13 meters long during the Paleocene epoch?",
        correct: "Titanoboa",
        w1: "Gigantophis",
        w2: "Wonambi",
        exp: "Titanoboa cerrejonensis lived roughly 60 million years ago in hot equatorial rainforests, weighing over 1,100 kg and hunting prehistoric crocodilians."
      },
      {
        q: "What family of flightless carnivorous terror birds dominated South America with massive hooked beaks after the extinction of non-avian dinosaurs?",
        correct: "Phorusrhacidae",
        w1: "Gastornithidae",
        w2: "Dromornithidae",
        exp: "Phorusrhacids were apex pursuit predators standing up to 3 meters tall that struck prey with downward hatchet-like blows of their heavy beaks."
      },
      {
        q: "What massive placoderm fish of the Late Devonian possessed bony armor plates forming sharp shearing jaw blades instead of true teeth?",
        correct: "Dunkleosteus",
        w1: "Leedsichthys",
        w2: "Xiphactinus",
        exp: "Dunkleosteus terrelli was a 9-meter apex predator capable of snapping its jaws shut in 20 milliseconds with a bite force exceeding 5,000 Newtons."
      }
    ],
    number: {
      q: "How many million years ago did the gigantic apex shark Otodus megalodon go extinct from the fossil record?",
      target: 3.6,
      unit: "million years",
      imperial: "3.6 million years ago",
      exp: "Fossil evidence indicates Megalodon went extinct approximately 3.6 million years ago during the Pliocene epoch, likely due to ocean cooling and competition with ancestors of orcas."
    }
  },

  // Cycle 5: Aerial Super Predators
  {
    mcqs: [
      {
        q: "What bird of prey is recorded as the fastest animal in the world, exceeding 320 km/h during high-speed hunting dives called stoops?",
        correct: "Peregrine Falcon",
        w1: "Golden Eagle",
        w2: "Gyrfalcon",
        exp: "Falco peregrinus dives steeply from great heights, striking airborne prey with clenched talons at speeds that can surpass 380 km/h."
      },
      {
        q: "What massive rainforest eagle native to Central and South America possesses rear talons comparable in size to grizzly bear claws?",
        correct: "Harpy Eagle",
        w1: "Martial Eagle",
        w2: "Crowned Eagle",
        exp: "The Harpy Eagle Harpia harpyja snatches tree sloths and monkeys directly from the canopy with talons measuring up to 13 centimeters."
      },
      {
        q: "What is the largest eagle species in Africa, known to prey on small antelopes, baboons, and monitor lizards?",
        correct: "Martial Eagle",
        w1: "Verreaux Eagle",
        w2: "Bateleur",
        exp: "The Martial Eagle Polemaetus bellicosus has a wingspan up to 2.6 meters and can spot prey from over 5 kilometers away."
      },
      {
        q: "What anatomical modification on owl flight feathers enables near-silent flight during nocturnal ambushes?",
        correct: "Serrated comb-like leading edge fluting",
        w1: "Hollow quill chambers",
        w2: "Elongated alula feathers",
        exp: "The leading-edge comb-like serrations break up air turbulence into micro-vortices, muffling sound so prey cannot hear the owl approach."
      },
      {
        q: "What vulture species specializes in dropping large mammalian bones from high altitudes onto rocks to access nutrient-rich marrow?",
        correct: "Bearded Vulture",
        w1: "Cinereous Vulture",
        w2: "Egyptian Vulture",
        exp: "The Bearded Vulture Gypaetus barbatus consumes a diet that is up to 85 to 90 percent bone, utilizing extremely acidic gastric secretions to dissolve calcium phosphate."
      }
    ],
    number: {
      q: "What is the highest verified diving speed in km/h ever recorded for a hunting Peregrine Falcon?",
      target: 389,
      unit: "km/h",
      imperial: "242 mph (389 km/h)",
      exp: "National Geographic flight experiments recorded a dive stoop of 389 km/h (242 mph) for a trained peregrine falcon named Frightful."
    }
  },

  // Cycle 6: Reptilian Kings
  {
    mcqs: [
      {
        q: "Which reptile is the largest living crocodilian and heaviest extant reptile species on Earth?",
        correct: "Saltwater Crocodile",
        w1: "Nile Crocodile",
        w2: "American Alligator",
        exp: "Crocodylus porosus can exceed 6 meters in length and over 1,000 kg, inhabiting coastal brackish estuaries and rivers across the Indo-Pacific."
      },
      {
        q: "What Indonesian island monitor lizard is the largest living lizard species, using anticoagulant venom and serrated teeth to hunt deer?",
        correct: "Komodo Dragon",
        w1: "Perentie",
        w2: "Lace Monitor",
        exp: "Varanus komodoensis possesses complex mandibular venom glands that secrete anticoagulant proteins and toxins inducing shock and hypothermia in bitten prey."
      },
      {
        q: "What is the longest venomous snake species in the world, capable of reaching lengths exceeding 5.5 meters?",
        correct: "King Cobra",
        w1: "Black Mamba",
        w2: "Inland Taipan",
        exp: "Ophiophagus hannah feeds predominantly on other snakes and can deliver up to 500 to 1,000 milligrams of neurotoxic venom in a single bite."
      },
      {
        q: "What African venomous snake is famous for its coffin-shaped head and inky-black mouth interior displayed when threatened?",
        correct: "Black Mamba",
        w1: "Boomslang",
        w2: "Puff Adder",
        exp: "Dendroaspis polylepis is one of the fastest land snakes in Africa, delivering fast-acting dendrotoxin neurotoxins that paralyze the nervous system."
      },
      {
        q: "Which Australian snake possesses the most potent venom of any terrestrial snake species based on murine median lethal dose LD50 testing?",
        correct: "Inland Taipan",
        w1: "Coastal Taipan",
        w2: "Eastern Brown Snake",
        exp: "Oxyuranus microlepidotus venom contains potent paradoxin neurotoxins; a single yield contains enough toxin to kill an estimated 100 adult humans."
      }
    ],
    number: {
      q: "What is the approximate maximum bite force in pounds per square inch PSI measured in adult Saltwater Crocodiles?",
      target: 3700,
      unit: "PSI",
      imperial: "3,700 PSI (16,460 N)",
      exp: "Laboratory testing led by Dr. Gregory Erickson recorded a direct bite force of 3,700 PSI (16,460 Newtons) in a 5.2-meter saltwater crocodile."
    }
  },

  // Cycle 7: Solitary & Pack Hunters
  {
    mcqs: [
      {
        q: "What African carnivore lives in matriarchal clans led by dominant alpha females and possesses jaw bone-cracking power?",
        correct: "Spotted Hyena",
        w1: "Striped Hyena",
        w2: "Aardwolf",
        exp: "Crocuta crocuta hunts in coordinated packs for over 70 percent of its food, with females possessing masculine genitalia driven by high prenatal androgen exposure."
      },
      {
        q: "What canid species hunts in structured family packs and has the widest natural geographic native range of any wild land mammal?",
        correct: "Grey Wolf",
        w1: "Dhole",
        w2: "Dingo",
        exp: "Canis lupus historically spanned North America, Europe, and Asia, relying on pack stamina to wear down large ungulates like moose and elk."
      },
      {
        q: "What endangered African canid features multicolored mottled fur and achieves one of the highest hunting success rates in the animal kingdom?",
        correct: "African Wild Dog",
        w1: "Black-backed Jackal",
        w2: "Bat-eared Fox",
        exp: "Lycaon pictus hunts by relentless endurance coursing at 60 km/h across plains, successfully taking down prey in over 80 percent of chases."
      },
      {
        q: "What Asian wild canid, also known as the Asiatic red dog, hunts in packs capable of defending territory against tigers and leopards?",
        correct: "Dhole",
        w1: "Golden Jackal",
        w2: "Raccoon Dog",
        exp: "Cuon alpinus communicates using complex whistle vocalizations and packs can overpower large prey such as sambar deer and water buffalo."
      },
      {
        q: "What solitary mustelid of the boreal forest is celebrated for extreme strength and ferocity, taking down prey much larger than itself?",
        correct: "Wolverine",
        w1: "Honey Badger",
        w2: "Fisher",
        exp: "Gulo gulo possesses powerful jaws with a special molar adapted to shear through frozen meat and bones in subarctic snowscapes."
      }
    ],
    number: {
      q: "What percentage of targeted hunts are successfully concluded by an African Wild Dog pack?",
      target: 80,
      unit: "percent",
      imperial: "80% hunting success",
      exp: "African wild dogs achieve an extraordinary 70 to 85 percent hunting success rate through coordinated relay chasing and team communication."
    }
  },

  // Cycle 8: Sensory Superpowers of Predators
  {
    mcqs: [
      {
        q: "What specialized chemosensory organ located in the roof of a snake mouth analyzes chemical scent particles gathered by the forked tongue?",
        correct: "Jacobson Organ",
        w1: "Loreal pit",
        w2: "Scleral ring",
        exp: "The vomeronasal or Jacobson organ processes airborne pheromones and prey scents delivered directly by the retracting forked tongue tips."
      },
      {
        q: "What reflective tissue layer situated behind the retina increases night vision sensitivity in nocturnal mammalian predators?",
        correct: "Tapetum Lucidum",
        w1: "Fovea centralis",
        w2: "Ciliary body",
        exp: "The tapetum lucidum reflects unabsorbed photons back through the photoreceptors a second time, producing the characteristic glowing eyeshine of night hunters."
      },
      {
        q: "What sensory structures on pit vipers detect infrared radiation, allowing them to strike warm-blooded prey in complete darkness?",
        correct: "Loreal Pits",
        w1: "Ampullary pores",
        w2: "Weberian apparatus",
        exp: "Loreal pits contain a thin heat-sensitive membrane with thousands of nerve endings capable of detecting temperature fluctuations as small as 0.003 degrees Celsius."
      },
      {
        q: "What active acoustic navigation and hunting system is used by odontocete whales and microbats to map surroundings and locate prey?",
        correct: "Echolocation",
        w1: "Magnetoreception",
        w2: "Optogenetics",
        exp: "Predators emit high-frequency ultrasonic clicks and listen to returning echoes to calculate the exact distance, speed, size, and internal density of prey."
      },
      {
        q: "What South American freshwater knifefish can generate electric discharges up to 860 volts to stun prey and deter predators?",
        correct: "Electric Eel",
        w1: "Electric Ray",
        w2: "Stargazer",
        exp: "Electrophorus voltai contains thousands of specialized disc-shaped electrocytes arranged in series like batteries, discharging high-voltage pulses on demand."
      }
    ],
    number: {
      q: "What is the maximum discharge voltage recorded in the electric knifefish Electrophorus voltai in the Amazon basin?",
      target: 860,
      unit: "volts",
      imperial: "860 Volts",
      exp: "Research in 2019 identified Electrophorus voltai as capable of delivering an electric shock of up to 860 volts, the highest bioelectric discharge known in animals."
    }
  },

  // Cycle 9: Mechanical Strikes & Venom Weaponry
  {
    mcqs: [
      {
        q: "What marine crustacean strikes prey with dactyl clubs accelerating as fast as a bullet, generating cavitation bubbles that produce flash temperatures?",
        correct: "Peacock Mantis Shrimp",
        w1: "Pistol Shrimp",
        w2: "Ghost Crab",
        exp: "Odontodactylus scyllarus swings its raptorial appendages at 80 km/h with 10,000 g acceleration, producing shockwaves that shatter crab shells and aquarium glass."
      },
      {
        q: "What predatory sea snail uses a hollow, venomous harpoon-like tooth modified from a radula to paralyze fast-swimming fish instantly?",
        correct: "Geography Cone Snail",
        w1: "Flamingo Tongue",
        w2: "Crown Conch",
        exp: "Conus geographus shoots a radular dart loaded with complex conotoxins that rapidly block calcium and sodium ion channels, causing motor arrest."
      },
      {
        q: "What small cephalopod native to tide pools in the Pacific delivers deadly tetrodotoxin through painless bites, causing rapid respiratory paralysis?",
        correct: "Blue-Ringed Octopus",
        w1: "Flamboyant Cuttlefish",
        w2: "Mimic Octopus",
        exp: "Hapalochlaena species harbor symbiotic bacteria in their salivary glands producing tetrodotoxin, enough to paralyze dozens of humans within minutes."
      },
      {
        q: "What predatory freshwater fish native to South American rivers features interlocking triangular teeth adapted for rapid flesh tearing?",
        correct: "Red-bellied Piranha",
        w1: "Payara Vampire Fish",
        w2: "Arapaima",
        exp: "Pygocentrus nattereri has razor-sharp, closely fitted teeth driven by massive jaw adductor muscles capable of cutting clean bites out of prey."
      },
      {
        q: "What aquatic insect nymph shoots out an elongated, hinged lower labium called a mask to seize passing fish and tadpoles?",
        correct: "Dragonfly Nymph",
        w1: "Water Strider",
        w2: "Giant Water Bug",
        exp: "Dragonfly nymphs project their extendable prehensile labial mask forward via hydraulic pressure in fractions of a second to grab prey."
      }
    ],
    number: {
      q: "How many milliseconds does it take for a chameleon tongue to reach and strike prey after launching from the mouth?",
      target: 20,
      unit: "milliseconds",
      imperial: "20 ms (0.02 s)",
      exp: "Chameleons use elastic collagen tissue in their hyoid apparatus to catapult their sticky tongue pad forward in as little as 20 milliseconds."
    }
  },

  // Cycle 10: Keystone Predators & Ecology
  {
    mcqs: [
      {
        q: "The reintroduction of grey wolves to Yellowstone National Park in 1995 triggered what ecological phenomenon that transformed riverbanks and plant life?",
        correct: "Trophic Cascade",
        w1: "Competitive Exclusion",
        w2: "Ecological Succession",
        exp: "Wolves reduced overgrazing by elk herds, allowing aspens and willows to recover, which stabilized riverbanks and provided habitat for beavers and songbirds."
      },
      {
        q: "What coastal marine mammal is a celebrated keystone predator that prevents sea urchins from destroying kelp forest ecosystems?",
        correct: "Sea Otter",
        w1: "Harbor Seal",
        w2: "California Sea Lion",
        exp: "Enhydra lutris consumes herbivorous sea urchins; without otters, urchin barrens form and decimate complex underwater kelp forests."
      },
      {
        q: "What term describes a predatory species that resides at the apex of an ecosystem food web with no natural predators of its own?",
        correct: "Apex Predator",
        w1: "Mesopredator",
        w2: "Detritivore",
        exp: "Apex predators play crucial roles in regulating prey populations, suppressing mesopredator outbreaks, and maintaining biodiversity across trophic levels."
      },
      {
        q: "What carnivorous marsupial native to an Australian island state has the strongest bite force relative to body mass of any living mammalian carnivore?",
        correct: "Tasmanian Devil",
        w1: "Spotted-tail Quoll",
        w2: "Numbat",
        exp: "Sarcophilus harrisii possesses a massive head and powerful jaw muscles capable of exerting a bite force quotient exceeding 180, crushing bone easily."
      },
      {
        q: "What semi-aquatic mustelid native to South America can grow up to 1.8 meters long and hunts in family groups, preying on caimans and anacondas?",
        correct: "Giant River Otter",
        w1: "Neotropical Otter",
        w2: "Sea Mink",
        exp: "Pteronura brasiliensis is known as the river wolf, cooperating in vocal family packs to dominate South American river ecosystems."
      }
    ],
    number: {
      q: "In what year CE were wild Grey Wolves officially reintroduced into Yellowstone National Park, starting a landmark restoration project?",
      target: 1995,
      unit: "CE",
      imperial: "1995 CE",
      exp: "In 1995, Canadian wolves were released into Yellowstone, successfully restoring an apex predator absent from the park for over seven decades."
    }
  }
];

buildQuiz({
  id: 'animal-kingdom-super-predators-60',
  theme: 'Apex Predators & Big Cats of the Animal Kingdom',
  title: 'Apex Predators & Big Cats of the Animal Kingdom',
  description: 'A 60-question grand master assessment exploring apex predators, big cat biology, bite forces, specialized hunting tactics, and extreme wildlife records.',
  category: 'Nature, Wildlife & Biology',
  difficulty: 'moderate'
}, predatorCycles);

// -------------------------------------------------------------
// 2. birds-avian-world-flight-60
// -------------------------------------------------------------
const birdCycles = [
  // Cycle 1: Flight Anatomy & Biomechanics
  {
    mcqs: [
      {
        q: "What fused collarbone in birds acts like an elastic spring during wingbeats to absorb and release aerodynamic shock?",
        correct: "Furcula",
        w1: "Coracoid",
        w2: "Scapula",
        exp: "The furcula or wishbone is formed by the fusion of the two clavicles, flexing and rebounding during each wing stroke to aid respiration and wing recovery."
      },
      {
        q: "What prominent keel-like ridge on the avian sternum provides the anchor surface for powerful flight muscles?",
        correct: "Carina Keel",
        w1: "Synsacrum",
        w2: "Pygostyle",
        exp: "The carina is an extension of the sternum that anchors the pectoralis major and supracoracoideus muscles which power downstrokes and upstrokes."
      },
      {
        q: "What internal respiratory structures allow birds to maintain unidirectional airflow through their lungs for continuous oxygen uptake?",
        correct: "Air Sacs",
        w1: "Alveolar sacs",
        w2: "Spiracles",
        exp: "Birds possess a system of non-vascular air sacs that pump air through rigid parabronchial lungs continuously during both inhalation and exhalation."
      },
      {
        q: "What internal structural adaptation makes bird skeletal bones exceptionally strong yet lightweight for flight?",
        correct: "Pneumatization with internal strut trabeculae",
        w1: "Solid marrow mineral density",
        w2: "Cartilaginous shaft fusion",
        exp: "Pneumatic bones contain hollow air spaces reinforced by crisscrossing internal struts called trabeculae, maximizing strength while minimizing flight mass."
      },
      {
        q: "What flight muscle elevates the wing between power strokes by pulling a tendon through the triosseal canal like a rope and pulley?",
        correct: "Supracoracoideus",
        w1: "Pectoralis major",
        w2: "Latissimus dorsi",
        exp: "Located deep below the pectoralis major on the sternum, the supracoracoideus pulls its tendon upward through the shoulder joint to lift the wing."
      }
    ],
    number: {
      q: "How many distinct air sacs typically make up the unidirectional respiratory system in most flying birds?",
      target: 9,
      unit: "air sacs",
      imperial: "9 air sacs (4 paired, 1 single)",
      exp: "Most flying birds have nine air sacs: one interclavicular, two cervical, two anterior thoracic, two posterior thoracic, and two abdominal air sacs."
    }
  },

  // Cycle 2: Birds of Prey & Nocturnal Hunters
  {
    mcqs: [
      {
        q: "What circular feather structure on barn owls funnels faint high-frequency rustling sounds into asymmetrical ear openings?",
        correct: "Facial Disc",
        w1: "Cere ring",
        w2: "Nictitating membrane",
        exp: "The heart-shaped facial disc acts like a satellite dish, focusing sounds so precisely that barn owls can strike rodents in pitch blackness."
      },
      {
        q: "What North American sea eagle is recognized by its pure white head plumage and massive yellow hooked bill?",
        correct: "Bald Eagle",
        w1: "Golden Eagle",
        w2: "Steller Sea Eagle",
        exp: "Haliaeetus leucocephalus feeds primarily on fish, snatching prey from water surfaces with sharp talons covered in rough spicules."
      },
      {
        q: "What specialized raptor feeds almost exclusively on live fish, possessing reversible outer toes and barbed foot pads?",
        correct: "Osprey",
        w1: "Red-tailed Hawk",
        w2: "Cooper Hawk",
        exp: "Pandion haliaetus can plunge feet-first beneath water surfaces, rotating its outer toe backward to grip slippery fish securely with two toes forward and two back."
      },
      {
        q: "What tall, long-legged African bird of prey hunts snakes across open savannahs by delivering lethal stomping kicks?",
        correct: "Secretarybird",
        w1: "Martial Eagle",
        w2: "Bateleur",
        exp: "Sagittarius serpentarius strikes venomous snakes with kick forces up to five times its own body weight delivered in just 15 milliseconds."
      },
      {
        q: "What colossal vulture species is the largest flying bird in South America, soaring over high Andean cliffs with a 3.3-meter wingspan?",
        correct: "Andean Condor",
        w1: "King Vulture",
        w2: "Black Vulture",
        exp: "Vultur gryphus uses thermal updrafts to soar for hours without flapping, weighing up to 15 kg and living over 70 years."
      }
    ],
    number: {
      q: "What is the maximum recorded wingspan in meters of the Andean Condor Vultur gryphus?",
      target: 3.3,
      unit: "meters",
      imperial: "10.8 feet (3.3 m)",
      exp: "The Andean Condor has one of the largest wingspans of any flying land bird, reliably measured up to 3.3 meters (10 feet 10 inches)."
    }
  },

  // Cycle 3: Epic Transcontinental Migrations
  {
    mcqs: [
      {
        q: "Which bird completes the longest annual migration on Earth, traveling between the Arctic and Antarctic and back each year?",
        correct: "Arctic Tern",
        w1: "Sooty Shearwater",
        w2: "Red Knot",
        exp: "Sterna paradisaea travels over 70,000 to 90,000 kilometers annually, experiencing two summers a year and more daylight than any other creature."
      },
      {
        q: "Which shorebird holds the world record for the longest non-stop migratory flight, flying over 11,000 km across the Pacific Ocean without feeding?",
        correct: "Bar-tailed Godwit",
        w1: "Whimbrel",
        w2: "Dunlin",
        exp: "Limosa lapponica flies non-stop from Alaska to New Zealand over 11 days, consuming half its body weight in stored fat to fuel continuous wing flapping."
      },
      {
        q: "What biological sensory mechanism allows migratory birds to detect Earth magnetic field lines using cryptochrome proteins in their eyes?",
        correct: "Magnetoreception",
        w1: "Thermoreception",
        w2: "Electroreception",
        exp: "Light-sensitive cryptochrome 4 proteins in avian retinas undergo quantum spin reactions that allow birds to perceive magnetic field inclination visually."
      },
      {
        q: "What tiny hummingbird species undertakes an 800-kilometer non-stop flight directly across the Gulf of Mexico during autumn migration?",
        correct: "Ruby-throated Hummingbird",
        w1: "Anna Hummingbird",
        w2: "Calliope Hummingbird",
        exp: "Archilochus colubris doubles its body mass by feeding on nectar and insects before undertaking a 20-hour non-stop flight over open water."
      },
      {
        q: "What high-flying goose species regularly migrates directly over the high peaks of the Himalayas at altitudes exceeding 7,000 meters?",
        correct: "Bar-headed Goose",
        w1: "Snow Goose",
        w2: "Greylag Goose",
        exp: "Anser indicus possesses hemoglobin with exceptionally high oxygen affinity and hyper-vascularized flight muscles allowing extreme high-altitude flapping."
      }
    ],
    number: {
      q: "Approximately how many thousand kilometers does an Arctic Tern fly during its complete annual pole-to-pole round trip?",
      target: 70,
      unit: "thousand km",
      imperial: "43,500 miles (70,000 km)",
      exp: "Geolocator tracking studies show Arctic terns average roughly 70,000 to 90,000 km per year along meandering zig-zag oceanic flight routes."
    }
  },

  // Cycle 4: Flightless Giants & Extremophiles
  {
    mcqs: [
      {
        q: "What is the largest and heaviest living bird species on Earth, capable of sprinting at speeds over 70 km/h?",
        correct: "Common Ostrich",
        w1: "Southern Cassowary",
        w2: "Emu",
        exp: "Struthio camelus stands up to 2.8 meters tall and weighs up to 150 kg, possessing powerful two-toed legs adapted for endurance running."
      },
      {
        q: "What rainforest ratite of New Guinea carries a dagger-like inner claw up to 12 cm long used for defensive kicks?",
        correct: "Southern Cassowary",
        w1: "Emu",
        w2: "Kiwi",
        exp: "Casuarius casuarius has a keratinous helmet casque on its head and can jump 1.5 meters into the air to strike with lethal inner toe claws."
      },
      {
        q: "What Antarctic penguin species incubates a single egg through dark sub-zero polar winter blizzards on its feet beneath a warm brood pouch?",
        correct: "Emperor Penguin",
        w1: "King Penguin",
        w2: "Adelie Penguin",
        exp: "Aptenodytes forsteri males fast for over 100 days while huddling in giant collective colonies to survive temperatures plunging below -40 degrees Celsius."
      },
      {
        q: "What nocturnal flightless bird native to New Zealand has nostrils positioned uniquely at the very tip of its long bill to sniff for earthworms?",
        correct: "Kiwi",
        w1: "Kakapo",
        w2: "Takahe",
        exp: "Apteryx species have highly developed olfactory bulbs and whiskers, laying eggs that account for up to 20 percent of the female total body weight."
      },
      {
        q: "What critically endangered nocturnal flightless parrot of New Zealand is the heaviest parrot species in the world?",
        correct: "Kakapo",
        w1: "Kea",
        w2: "Kaka",
        exp: "Strigops habroptilus is a solitary herbivorous parrot that uses a lek breeding system where males emit booming calls from excavated earth bowls."
      }
    ],
    number: {
      q: "What is the maximum sprinting speed in km/h of a Common Ostrich Struthio camelus across open terrain?",
      target: 70,
      unit: "km/h",
      imperial: "43.5 mph (70 km/h)",
      exp: "Ostriches can sprint at burst speeds of 70 km/h (43.5 mph) and sustain cruising speeds of 50 km/h for several kilometers."
    }
  },

  // Cycle 5: Songbirds & Vocalization
  {
    mcqs: [
      {
        q: "What specialized vocal organ located at the bifurcation of a bird trachea allows songbirds to produce two independent harmonic tones simultaneously?",
        correct: "Syrinx",
        w1: "Larynx",
        w2: "Pharynx",
        exp: "The syrinx contains dual tympaniform membranes controlled by delicate muscle pairs, enabling intricate two-voice vocal mastery in oscine songbirds."
      },
      {
        q: "What Australian songbird is famous for its astonishingly accurate mimicry of chainsaws, camera shutters, and dozens of other bird songs?",
        correct: "Superb Lyrebird",
        w1: "Australian Magpie",
        w2: "Satin Bowerbird",
        exp: "Menura novaehollandiae possesses one of the most acoustically versatile syrinxes in the animal kingdom, used during elaborate courtship displays on dirt mounds."
      },
      {
        q: "What European songbird is renowned for its rich, melodic nocturnal singing performed by unpaired males on spring nights?",
        correct: "Common Nightingale",
        w1: "European Robin",
        w2: "Song Thrush",
        exp: "Luscinia megarhynchos produces over 200 distinct song types with extraordinary acoustic range, singing throughout the night to attract migrating females."
      },
      {
        q: "What avian order represents more than half of all living bird species, characterized by feet adapted with three forward toes and one backward toe for perching?",
        correct: "Passeriformes",
        w1: "Anseriformes",
        w2: "Columbiformes",
        exp: "Passerines or perching birds encompass over 6,500 species, including finches, warblers, crows, sparrows, and starlings."
      },
      {
        q: "What small parrot species holds the Guinness World Record for the largest documented vocabulary of any individual animal, knowing over 1,700 words?",
        correct: "Budgerigar",
        w1: "African Grey Parrot",
        w2: "Cockatiel",
        exp: "A pet budgerigar named Puck was documented with a vocabulary of 1,728 words, demonstrating exceptional mimicry and cognitive articulation."
      }
    ],
    number: {
      q: "Approximately how many living bird species belong to the order Passeriformes perching songbirds?",
      target: 6500,
      unit: "species",
      imperial: "6,500 species",
      exp: "With over 6,500 documented species, Passeriformes is by far the largest and most diverse biological order of birds, representing roughly 60% of all avian life."
    }
  },

  // Cycle 6: Oceanic Wanderers & Pelagic Life
  {
    mcqs: [
      {
        q: "Which pelagic seabird possesses the largest wingspan of any living bird, allowing dynamic soaring across southern oceans without flapping for hours?",
        correct: "Wandering Albatross",
        w1: "Royal Albatross",
        w2: "Southern Giant Petrel",
        exp: "Diomedea exulans has a wingspan reaching up to 3.7 meters and uses dynamic soaring through wind velocity gradients above ocean wave crests."
      },
      {
        q: "What tropical oceanic bird can remain airborne continuously for months by soaring on thermals and taking micro-sleep naps while flying?",
        correct: "Great Frigatebird",
        w1: "Red-billed Tropicbird",
        w2: "Masked Booby",
        exp: "Fregata minor lacks waterproof plumage and cannot land on water, relying on dynamic soaring and mid-air naps lasting seconds at high altitudes."
      },
      {
        q: "What large seabird plunge-dives vertically into ocean waters from heights of 30 meters at speeds up to 100 km/h to catch schooling fish?",
        correct: "Northern Gannet",
        w1: "Atlantic Puffin",
        w2: "Blue-footed Booby",
        exp: "Morus bassanus features air sacs beneath facial skin that cushion impact, along with binocular vision and nostrils located inside the mouth."
      },
      {
        q: "What tube-nosed seabird defends its nesting burrow by regurgitating a foul-smelling, sticky orange stomach oil at intruders?",
        correct: "Northern Fulmar",
        w1: "Manx Shearwater",
        w2: "Leach Storm Petrel",
        exp: "Fulmarus glacialis uses nutrient-rich proventricular stomach oil as an energy store for long foraging flights and as a defensive spray that matts predator feathers."
      },
      {
        q: "What seabird of the North Atlantic develops a brightly colored, laterally flattened bill plate during the summer breeding season?",
        correct: "Atlantic Puffin",
        w1: "Razorbill",
        w2: "Black Guillemot",
        exp: "Fratercula arctica can carry dozens of small sand eels crosswise in its bill at one time thanks to specialized backward-facing spines on its tongue and palate."
      }
    ],
    number: {
      q: "What is the maximum verified wingspan in meters of the Wandering Albatross Diomedea exulans?",
      target: 3.7,
      unit: "meters",
      imperial: "12.1 feet (3.7 m)",
      exp: "The largest verified Wandering Albatross specimen had a wingspan of 3.7 meters (12 feet 2 inches), the longest wingspan of any living bird."
    }
  },

  // Cycle 7: Avian Intelligence & Tool Use
  {
    mcqs: [
      {
        q: "What crow species native to the South Pacific crafts stepped leaf tools and hooked twigs to extract wood-boring beetle grubs?",
        correct: "New Caledonian Crow",
        w1: "Carrion Crow",
        w2: "American Crow",
        exp: "Corvus moneduloides demonstrates sophisticated meta-tool use, cultural transmission of tool design, and an understanding of displacement physics."
      },
      {
        q: "What alpine parrot native to New Zealand is known for solving multi-step mechanical puzzles and dismantling rubber car gaskets?",
        correct: "Kea",
        w1: "Kaka",
        w2: "Kakapo",
        exp: "Nestor notabilis is a highly inquisitive alpine omnivore with problem-solving intelligence comparable to higher primates."
      },
      {
        q: "What famous African Grey parrot demonstrated advanced conceptual understanding of shapes, colors, counts, and zero in Harvard laboratory research?",
        correct: "Alex",
        w1: "Einstein",
        w2: "Griffin",
        exp: "Studied for 30 years by Dr. Irene Pepperberg, Alex proved that parrots possess cognitive abilities including categorization, quantification, and syntax."
      },
      {
        q: "What mountain corvid can cache up to 33,000 conifer seeds across hundreds of square kilometers and accurately relocate them months later?",
        correct: "Clark Nutcracker",
        w1: "Pinyon Jay",
        w2: "Eurasian Jay",
        exp: "Nucifraga columbiana possesses an enlarged hippocampus providing extraordinary spatial memory crucial for finding hidden seed stores beneath deep winter snow."
      },
      {
        q: "What corvid bird is the first non-mammalian animal scientifically demonstrated to pass the mirror self-recognition mark test?",
        correct: "Eurasian Magpie",
        w1: "Common Raven",
        w2: "Western Scrub-Jay",
        exp: "Pica pica attempted to scratch colored stickers placed on its neck only when viewing its reflection in a mirror, proving self-awareness."
      }
    ],
    number: {
      q: "Up to how many thousand seeds can a single Clark Nutcracker store and remember across a single autumn season?",
      target: 33,
      unit: "thousand seeds",
      imperial: "33,000 seeds",
      exp: "A single Clark nutcracker caches between 22,000 and 33,000 seeds across thousands of separate hiding spots each autumn with over 90% retrieval accuracy."
    }
  },

  // Cycle 8: Plumage, Coloration & Courtship
  {
    mcqs: [
      {
        q: "What optical phenomenon produces the metallic glittering colors on hummingbird gorgets and peacock train covert feathers?",
        correct: "Structural Iridescence",
        w1: "Bioluminescence",
        w2: "Pigmentary phosphorescence",
        exp: "Microscopic guanine crystals and keratin melanin layers in feather barbules cause optical thin-film wave interference that shifts color with viewing angle."
      },
      {
        q: "What male bird in eastern Australia constructs an elaborate avenue of sticks decorated with blue plastic, glass, and flowers to court females?",
        correct: "Satin Bowerbird",
        w1: "Regent Bowerbird",
        w2: "Spotted Bowerbird",
        exp: "Ptilonorhynchus violaceus paints bower walls with chewed charcoal saliva and meticulously arranges blue ornaments matching its eye color."
      },
      {
        q: "What dietary pigment molecules absorbed from algae and brine shrimp give flamingos their vibrant pink and crimson plumage?",
        correct: "Carotenoids",
        w1: "Melanins",
        w2: "Porphyrins",
        exp: "Liver enzymes break down beta-carotene and astaxanthin from food into canthaxanthin pigments that deposit directly into growing feather follicles."
      },
      {
        q: "What endemic bird family of New Guinea features males that transform their plumage into jet-black geometric capes during courtship displays?",
        correct: "Birds of Paradise",
        w1: "Honeyeaters",
        w2: "Fairywrens",
        exp: "Male Vogelkop Superb Birds-of-Paradise have super-black feathers that absorb 99.95% of light, creating an intense contrast with glowing turquoise breast shields."
      },
      {
        q: "What specialized oil gland near the base of a bird tail secretes waxes and antimicrobials applied to plumage during preening?",
        correct: "Uropygial Gland",
        w1: "Preen bulb",
        w2: "Gland of Harder",
        exp: "The uropygial or preen gland produces an oily emulsion containing aliphatic wax esters that maintain feather flexibility, waterproofing, and bacterial defense."
      }
    ],
    number: {
      q: "What is the maximum wingbeat rate in flaps per second recorded in hummingbirds during hovering flight?",
      target: 80,
      unit: "flaps/sec",
      imperial: "80 wingbeats/second",
      exp: "Smaller hummingbird species, such as the Bee Hummingbird and Ruby-throated Hummingbird, flap their wings 50 to 80 times per second during hovering."
    }
  },

  // Cycle 9: Beaks & Foraging Adaptations
  {
    mcqs: [
      {
        q: "What famous archipelago bird radiation helped Charles Darwin develop the theory of natural selection through variations in beak geometry?",
        correct: "Darwin Finches",
        w1: "Galapagos Mockingbirds",
        w2: "Lava Gulls",
        exp: "The 18 species of Galapagos finches evolved distinct beak morphologies from a common ancestor to exploit seeds, insects, cactus nectar, and blood."
      },
      {
        q: "What tropical bird possesses a massive, lightweight bill composed of keratin and sponge-like bony trabeculae used for heat dissipation?",
        correct: "Toco Toucan",
        w1: "Resplendent Quetzal",
        w2: "Keel-billed Toucan",
        exp: "Ramphastos toco uses its enormous bill as a thermal radiator, expanding blood vessels in the bill to shed up to 60% of excess body heat into the air."
      },
      {
        q: "What tall African wetland bird features a massive, shoe-shaped bill with a razor-sharp nail tip capable of decapitating lungfish?",
        correct: "Shoebill Stork",
        w1: "Marabou Stork",
        w2: "Saddle-billed Stork",
        exp: "Balaeniceps rex stands motionless for hours in papyrus swamps before collapsing forward in a violent strike to catch armored bichirs and catfish."
      },
      {
        q: "What aquatic songbird walks along rocky mountain riverbeds completely submerged underwater to forage for insect larvae?",
        correct: "White-throated Dipper",
        w1: "Torrent Duck",
        w2: "Water Pipit",
        exp: "Cinclus cinclus uses heavy solid bones, dense downy plumage, and wing angling to fly underwater against fierce rushing river currents."
      },
      {
        q: "What specialized finch features crossed bill tips that allow it to pry open tightly sealed conifer cone scales to extract seeds?",
        correct: "Red Crossbill",
        w1: "Hawfinch",
        w2: "Pine Grosbeak",
        exp: "Loxia curvirostra uses lateral jaw motion to wedge its crossed upper and lower mandibles into cone scales, popping them open with its tongue."
      }
    ],
    number: {
      q: "What is the record length in centimeters of the massive bill of the Australian Pelican Pelecanus conspicillatus?",
      target: 50,
      unit: "cm",
      imperial: "19.7 inches (50 cm)",
      exp: "The Australian Pelican holds the record for the longest bill of any living bird, with large males developing bills up to 47 to 50 centimeters in length."
    }
  },

  // Cycle 10: Avian Evolution & Paleontology
  {
    mcqs: [
      {
        q: "What iconic Late Jurassic fossil discovered in Solnhofen limestone provided the first evidence of transitional traits between dinosaurs and birds?",
        correct: "Archaeopteryx",
        w1: "Confuciusornis",
        w2: "Hesperornis",
        exp: "Archaeopteryx lithographica exhibited reptilian teeth, clawed wing fingers, and a long bony tail alongside modern asymmetrical flight feathers."
      },
      {
        q: "What taxonomic clade of bipedal carnivorous theropod dinosaurs directly includes all modern birds as living surviving members?",
        correct: "Avialae",
        w1: "Sauropoda",
        w2: "Ornithischia",
        exp: "Cladistically, modern birds are living avian dinosaurs within the theropod clade, having survived the Cretaceous-Paleogene extinction 66 million years ago."
      },
      {
        q: "What gigantic flightless ratite of New Zealand standing over 3.6 meters tall was hunted to extinction around 1445 CE by early Maori settlers?",
        correct: "Moa",
        w1: "Elephant Bird",
        w2: "Gastornis",
        exp: "Dinornis robustus was the tallest bird that ever lived, completely lacking any vestigial wing bones and browsing on forest sub-canopy vegetation."
      },
      {
        q: "What flightless pigeon relative endemic to Mauritius vanished in the late 17th century following human settlement and invasive animals?",
        correct: "Dodo",
        w1: "Rodrigues Solitaire",
        w2: "Great Auk",
        exp: "Raphus cucullatus evolved on an isolated island without mammalian predators, leaving it flightless and vulnerable to hunting and nest predation by pigs and rats."
      },
      {
        q: "What massive extinct raptor of New Zealand was the top apex predator of giant moas before its extinction around 1400 CE?",
        correct: "Haast Eagle",
        w1: "Teratorn",
        w2: "Titanohierax",
        exp: "Hieraaetus moorei weighed up to 15 kg with talons equal to tiger claws, diving at 80 km/h to crush the pelvis or neck of giant moa prey."
      }
    ],
    number: {
      q: "What was the estimated weight in kilograms of the colossal extinct Madagascar Elephant Bird Aepyornis maximus?",
      target: 730,
      unit: "kg",
      imperial: "1,600 lbs (730 kg)",
      exp: "Vorombe titan and Aepyornis maximus of Madagascar reached masses between 650 and 730 kilograms, making them the heaviest birds known to science."
    }
  }
];

buildQuiz({
  id: 'birds-avian-world-flight-60',
  theme: 'The Avian World: Birds of Prey, Migration & Songbirds',
  title: 'The Avian World: Birds of Prey, Migration & Songbirds',
  description: 'A 60-question grand master assessment on bird flight aerodynamics, raptors, global migrations, birdsong syrinx mechanics, and living dinosaur evolution.',
  category: 'Nature, Wildlife & Biology',
  difficulty: 'moderate'
}, birdCycles);

// -------------------------------------------------------------
// 3. rainforests-biodiversity-jungles-60
// -------------------------------------------------------------
const rainforestCycles = [
  // Cycle 1: Rainforest Stratification
  {
    mcqs: [
      {
        q: "What highest vertical layer of the tropical rainforest consists of giant trees poking far above the general forest canopy ceiling?",
        correct: "Emergent Layer",
        w1: "Canopy Layer",
        w2: "Understory Layer",
        exp: "Emergent trees like the kapok and Brazil nut rise up to 60 to 70 meters tall, enduring intense direct solar radiation and strong tropical winds."
      },
      {
        q: "What continuous leafy ceiling of the rainforest houses approximately 70 to 90 percent of all rainforest organisms?",
        correct: "Canopy",
        w1: "Understory",
        w2: "Shrub layer",
        exp: "The canopy forms a 10-meter thick leafy roof between 30 and 45 meters above ground, acting as the primary solar energy harvesting factory of the jungle."
      },
      {
        q: "What dark, humid layer of the rainforest receives only 2 to 15 percent of total sunlight, home to broad-leaved shrubs and jaguars?",
        correct: "Understory",
        w1: "Emergent layer",
        w2: "Sub-canopy crown",
        exp: "The understory is a sheltered microclimate characterized by high humidity, still air, and large broad leaves adapted to capture dim, filtered sunflecks."
      },
      {
        q: "What percentage of total sunlight reaching the rainforest canopy actually penetrates down to the forest floor?",
        correct: "2 percent",
        w1: "25 percent",
        w2: "50 percent",
        exp: "Less than 2 percent of incident solar radiation reaches the dark rainforest floor, severely limiting herb layer growth except where treefall gaps occur."
      },
      {
        q: "What wide, flaring wooden trunk buttresses provide structural support to giant rainforest trees growing in shallow tropical soils?",
        correct: "Buttress Roots",
        w1: "Pneumatophores",
        w2: "Taproots",
        exp: "Buttress roots extend outwards several meters from tree trunks to prevent tall trees from toppling in nutrient-poor topsoil without deep taproots."
      }
    ],
    number: {
      q: "What percentage of global terrestrial plant and animal species are estimated to live within tropical rainforests despite covering only 6% of Earth land area?",
      target: 50,
      unit: "percent",
      imperial: "50% of terrestrial biodiversity",
      exp: "Tropical rainforests harbor over 50 percent of the world plant and animal species, making them the most biologically diverse terrestrial biomes on Earth."
    }
  },

  // Cycle 2: The Amazon Basin
  {
    mcqs: [
      {
        q: "What river is the largest in the world by water discharge volume, draining the vastest tropical rainforest basin on Earth?",
        correct: "Amazon River",
        w1: "Congo River",
        w2: "Mekong River",
        exp: "The Amazon accounts for roughly 20 percent of total global river discharge into world oceans, flowing across South America from the Andes to the Atlantic."
      },
      {
        q: "What pink-colored freshwater cetacean navigates the flooded forests of the Amazon and Orinoco rivers using acoustic echolocation?",
        correct: "Amazon River Dolphin Boto",
        w1: "Tucuxi",
        w2: "Irrawaddy Dolphin",
        exp: "Inia geoffrensis possesses unfused cervical vertebrae allowing 90-degree neck flexibility to maneuver through submerged tree trunks and branches."
      },
      {
        q: "What colossal Amazonian freshwater fish can breathe atmospheric air using a modified vascular swim bladder and exceed 3 meters in length?",
        correct: "Arapaima Pirarucu",
        w1: "Payara",
        w2: "Giant Wolf Fish",
        exp: "Arapaima gigas must surface every 5 to 15 minutes to gulp atmospheric air, allowing it to thrive in oxygen-depleted oxbow lakes and swamps."
      },
      {
        q: "What giant water lily native to the Amazon basin features buoyant circular pads up to 3 meters in diameter that can support over 30 kg?",
        correct: "Victoria amazonica",
        w1: "Nymphaea lotus",
        w2: "Nelumbo nucifera",
        exp: "Victoria amazonica leaves feature upturned rims and sharp defensive spines underneath with air-filled structural support ribs for maximum buoyancy."
      },
      {
        q: "What term describes the seasonally flooded freshwater swamp forests of the Amazon basin that submerge under meters of river water annually?",
        correct: "Varzea",
        w1: "Terra Firme",
        w2: "Pantanal",
        exp: "Varzea forests are inundated by sediment-rich white-water rivers during flood stage, providing seasonal feeding grounds for fruit-eating fish."
      }
    ],
    number: {
      q: "Approximately how many thousand cubic meters of freshwater per second does the Amazon River discharge into the Atlantic Ocean?",
      target: 209,
      unit: "thousand m3/s",
      imperial: "209,000 m3/s (7.4M cu ft/s)",
      exp: "The Amazon discharges an average of 209,000 cubic meters of freshwater every second, more than the next seven largest rivers combined."
    }
  },

  // Cycle 3: Canopy Creatures & Arboreal Mammals
  {
    mcqs: [
      {
        q: "What slow-moving arboreal mammal spends nearly its entire life suspended upside down in the rainforest canopy, growing green algae in its grooved fur?",
        correct: "Three-Toed Sloth",
        w1: "Silky Anteater",
        w2: "Tamandua",
        exp: "Bradypus sloths possess specialized Trichophilus green algae in specialized hair grooves that provide camouflage and supplementary nutrients."
      },
      {
        q: "What Amazonian primate produces deep roaring vocalizations that can carry over 5 kilometers through dense jungle canopy?",
        correct: "Howler Monkey",
        w1: "Spider Monkey",
        w2: "Capuchin Monkey",
        exp: "Alouatta monkeys possess an enlarged, hollow hyoid bone that acts as a resonating chamber to amplify vocal territorial warnings."
      },
      {
        q: "What arboreal mammal of the raccoon family has a fully prehensile tail and feeds primarily on fruit and flower nectar in Neotropical canopies?",
        correct: "Kinkajou",
        w1: "South American Coati",
        w2: "Olinguito",
        exp: "Potos flavus uses its 13-cm extrudable tongue to sip nectar and extract fruit pulp, acting as an important nocturnal seed disperser and pollinator."
      },
      {
        q: "What agile New World primate swings rapidly through the upper canopy using long limbs and a prehensile tail acting as a fifth hand?",
        correct: "Spider Monkey",
        w1: "Saki Monkey",
        w2: "Common Marmoset",
        exp: "Ateles species have reduced or absent thumbs to create hook-like hands optimal for rapid brachiation through high canopy branches."
      },
      {
        q: "What South American primate is the only truly nocturnal monkey genus in the entire world, possessing large light-gathering eyes?",
        correct: "Night Monkey Owl Monkey",
        w1: "Titi Monkey",
        w2: "Squirrel Monkey",
        exp: "Aotus monkeys forage at night to avoid diurnal raptors and resource competition, utilizing monochromat vision adapted to moonlit canopy foraging."
      }
    ],
    number: {
      q: "How many hours per day does a wild Three-Toed Sloth typically sleep in the canopy according to modern tracking studies?",
      target: 10,
      unit: "hours",
      imperial: "9.6 to 10 hours per day",
      exp: "While captive sloths sleep up to 16 hours, EEG tracking of wild three-toed sloths revealed they sleep only about 9.6 to 10 hours per day."
    }
  },

  // Cycle 4: Poisonous & Cryptic Jungle Wildlife
  {
    mcqs: [
      {
        q: "What brightly colored amphibian family secretes lethal batrachotoxin alkaloids through skin glands, used by indigenous groups on blowgun darts?",
        correct: "Poison Dart Frog",
        w1: "Red-eyed Tree Frog",
        w2: "Glass Frog",
        exp: "Dendrobatidae accumulate toxic alkaloids from consuming formicine ants, mites, and millipedes in the rainforest leaf litter."
      },
      {
        q: "What translucent Neotropical frog features transparent ventral skin that makes its beating heart, liver, and digestive tract plainly visible?",
        correct: "Glass Frog",
        w1: "Poison Dart Frog",
        w2: "Cane Toad",
        exp: "Centrolenidae frogs use abdominal transparency for edge-diffusion camouflage, disrupting their silhouette against green translucent leaves."
      },
      {
        q: "What is the longest venomous pit viper in the Western Hemisphere, reaching lengths up to 3.6 meters in primary rainforest leaf litter?",
        correct: "South American Bushmaster",
        w1: "Fer-de-lance",
        w2: "Eyelash Viper",
        exp: "Lachesis muta is an elusive egg-laying viper that delivers large yields of hemotoxic and proteolytic venom during ambush strikes."
      },
      {
        q: "What arboreal pit viper features bristling spine-like scales above its eyes and displays vibrant yellow, green, and red color morphs?",
        correct: "Eyelash Palm Pit Viper",
        w1: "Emerald Tree Boa",
        w2: "Green Vine Snake",
        exp: "Bothriechis schlegelii uses prehensile tail grips and keeled superciliary scales to blend into mossy branches and bromeliads while waiting for hummingbirds."
      },
      {
        q: "What massive non-venomous constrictor snake native to South American river basins is recognized as the heaviest snake species on Earth?",
        correct: "Green Anaconda",
        w1: "Reticulated Python",
        w2: "Burmese Python",
        exp: "Eunectes murinus can weigh over 200 kg with a girth exceeding 30 cm, hunting tapirs, deer, and caimans from aquatic ambush positions."
      }
    ],
    number: {
      q: "What is the maximum verified weight in kilograms recorded for an exceptional female Green Anaconda Eunectes murinus?",
      target: 250,
      unit: "kg",
      imperial: "550 lbs (250 kg)",
      exp: "While average large females weigh 100 to 150 kg, record wild green anacondas have been documented reaching masses between 200 and 250 kilograms."
    }
  },

  // Cycle 5: Epiphytes & Botanical Marvels
  {
    mcqs: [
      {
        q: "What botanical term describes non-parasitic plants that grow harmlessly upon the branches of larger trees to access canopy sunlight?",
        correct: "Epiphytes",
        w1: "Hemiparasites",
        w2: "Saprophytes",
        exp: "Epiphytes such as orchids, bromeliads, and ferns derive moisture and nutrients from air, rainfall, and organic debris rather than the host tree."
      },
      {
        q: "What plant family forms overlapping leaf rosettes that hold water to create miniature arboreal aquatic ponds supporting frogs and insects?",
        correct: "Bromeliaceae",
        w1: "Orchidaceae",
        w2: "Araceae",
        exp: "Tank bromeliads catch rainwater and detritus in central leaf cups, forming phytotelm micro-ecosystems inhabited by crab larvae, frogs, and damselflies."
      },
      {
        q: "What rainforest fig species begins life as an epiphyte in the high canopy before sending down roots that encase and kill the host tree?",
        correct: "Strangler Fig",
        w1: "Banyan Tree",
        w2: "Rubber Fig",
        exp: "Ficus species germinate in branch forks, dropping aerial roots to the soil that thicken into a lattice around the host tree, outcompeting it for light."
      },
      {
        q: "What giant emergent tree native to the Amazon produces hard wooden capsules containing dozens of edible triangular nuts?",
        correct: "Brazil Nut Tree",
        w1: "Mahogany Tree",
        w2: "Kapok Tree",
        exp: "Bertholletia excelsa relies exclusively on large euglossine orchid bees for pollination and agoutis to gnaw open its rock-hard seed pods."
      },
      {
        q: "What botanical term describes the thick, woody climbing vines that drape across canopy branches to physically link rainforest trees together?",
        correct: "Lianas",
        w1: "Bryophytes",
        w2: "Pteridophytes",
        exp: "Lianas represent up to 25 percent of woody plant diversity in tropical forests, using host trees as structural ladders to reach canopy light."
      }
    ],
    number: {
      q: "Up to how many liters of rainwater can a large tank bromeliad hold inside its central leaf urn in the rainforest canopy?",
      target: 45,
      unit: "liters",
      imperial: "45 liters (approx 12 gallons)",
      exp: "Giant tank bromeliads such as Glomeropitcairnia can hold up to 45 liters (12 gallons) of water, creating significant arboreal freshwater reservoirs."
    }
  },

  // Cycle 6: The Congo Basin & African Jungles
  {
    mcqs: [
      {
        q: "What is the second-largest continuous tropical rainforest block on Earth, spanning six Central African countries?",
        correct: "Congo Basin",
        w1: "Sundaland Rainforest",
        w2: "Guinean Forest",
        exp: "Covering roughly 2 million square kilometers, the Congo Basin tropical forest acts as Africa largest carbon sink and regulates continental weather patterns."
      },
      {
        q: "What critically endangered great ape subspecies inhabiting the Virunga volcanic slopes is the largest living primate on Earth?",
        correct: "Mountain Gorilla",
        w1: "Western Lowland Gorilla",
        w2: "Eastern Chimpanzee",
        exp: "Gorilla beringei beringei features long, dense black fur adapted to cold high-altitude cloud forests, living in family groups led by a silverback."
      },
      {
        q: "What elusive rainforest ungulate with striped zebra-like hindquarters is the only living relative of the giraffe, native to the Ituri Forest?",
        correct: "Okapi",
        w1: "Bongo",
        w2: "Water Chevrotain",
        exp: "Okapia johnstoni possesses a 45-cm prehensile blue tongue to strip leaves, remaining undiscovered by Western science until 1901."
      },
      {
        q: "What peaceful great ape species native exclusively to the southern bank of the Congo River uses sociosexual behaviors to diffuse social tensions?",
        correct: "Bonobo",
        w1: "Chimpanzee",
        w2: "Gorilla",
        exp: "Pan paniscus lives in female-dominated egalitarian societies where peaceful sexual interactions maintain social cohesion and eliminate deadly inter-group warfare."
      },
      {
        q: "What shy forest antelope of the Congo basin has a rich chestnut coat with white vertical stripes and long spiraled lyre-shaped horns?",
        correct: "Bongo",
        w1: "Bushbuck",
        w2: "Sitatunga",
        exp: "Tragelaphus eurycerus tilts its horns back against its spine when fleeing through dense bamboo thickets to avoid getting entangled."
      }
    ],
    number: {
      q: "How many million hectares does the intact primary tropical rainforest of the Congo Basin cover across Central Africa?",
      target: 180,
      unit: "million hectares",
      imperial: "180 million hectares (445M acres)",
      exp: "The Congo Basin contains approximately 180 to 200 million hectares of dense tropical forest, making it the world second largest green lung."
    }
  },

  // Cycle 7: Southeast Asian & Australasian Jungles
  {
    mcqs: [
      {
        q: "What arboreal great ape, whose name means person of the forest in Malay, is native exclusively to the rainforests of Borneo and Sumatra?",
        correct: "Orangutan",
        w1: "Siamang",
        w2: "Lar Gibbon",
        exp: "Pongo pygmaeus and Pongo abelii spend over 90 percent of their lives in the canopy, building complex sleeping nests from branches every evening."
      },
      {
        q: "What parasitic plant native to Southeast Asian jungles produces the largest individual flower on Earth, emitting a stench of rotting flesh?",
        correct: "Rafflesia arnoldii",
        w1: "Titan Arum",
        w2: "Hydnora africana",
        exp: "Rafflesia has no roots, stems, or leaves, growing entirely inside Tetrastigma vines until its five-lobed reddish flower blooms up to one meter wide."
      },
      {
        q: "What endemic primate of Borneo is famous for the extraordinarily large, bulbous pendulous nose developed by dominant adult males?",
        correct: "Proboscis Monkey",
        w1: "Silvered Leaf Monkey",
        w2: "Maroon Langur",
        exp: "Nasalis larvatus lives in coastal mangrove and riverine forests, using its large fleshy nose as an acoustic resonator to amplify mating calls."
      },
      {
        q: "What family of canopy birds in Southeast Asian and African rainforests features large hollow casques atop their curved bills?",
        correct: "Hornbills",
        w1: "Toucans",
        w2: "Aracaris",
        exp: "Bucerotidae females seal themselves inside tree hollows with mud during nesting, relying on males to pass fruit and lizards through a narrow slit."
      },
      {
        q: "What tiny nocturnal primate of Southeast Asian islands can rotate its head 180 degrees in either direction and has eyes larger than its brain?",
        correct: "Tarsier",
        w1: "Slow Loris",
        w2: "Pygmy Bushbaby",
        exp: "Carlito syrichta cannot rotate its massive immobile eyes inside their sockets, compensating with specialized neck vertebrae to scan for insect prey."
      }
    ],
    number: {
      q: "What is the maximum flower diameter in centimeters of the giant parasitic blossom Rafflesia arnoldii?",
      target: 100,
      unit: "cm",
      imperial: "39.4 inches (100 cm)",
      exp: "Rafflesia arnoldii produces the world largest solitary flower, measuring up to 100 centimeters (1 meter) in diameter and weighing over 10 kg."
    }
  },

  // Cycle 8: Soil Ecology & Nutrient Cycling
  {
    mcqs: [
      {
        q: "Why are most tropical rainforest soils naturally nutrient-poor, acidic oxisols despite supporting lush, dense plant growth?",
        correct: "Heavy torrential rainfall rapidly leaches minerals while warm temperatures drive rapid recycling",
        w1: "Permafrost prevents mineral weathering",
        w2: "Absence of soil microorganisms",
        exp: "Rainforest nutrients are held directly in living biomass rather than soil; torrential rains leach soluble ions while fungi instantly reabsorb decomposing matter."
      },
      {
        q: "What beneficial fungal networks associate symbiotically with rainforest tree roots to scavenge scarce phosphorus and nitrogen?",
        correct: "Mycorrhizae",
        w1: "Rhizobia",
        w2: "Lichens",
        exp: "Mycorrhizal fungi extend the root surface area by hundreds of times, trading mined soil minerals for photosynthetic carbohydrates from the tree."
      },
      {
        q: "What prolific social insects process vast amounts of fallen wood and leaf litter on the rainforest floor, serving as primary decomposers?",
        correct: "Termites",
        w1: "Dung beetles",
        w2: "Centipedes",
        exp: "Termites harbor symbiotic gut protozoa and bacteria that break down stubborn cellulose and lignin, recycling locked carbon back into soil nutrients."
      },
      {
        q: "What dark, fertile anthropogenic soil found throughout the Amazon basin was created by ancient pre-Columbian societies using biochar?",
        correct: "Terra Preta",
        w1: "Laterite",
        w2: "Podzol",
        exp: "Terra Preta de Indio contains high concentrations of charcoal, bone fragments, and compost that retain nutrients and soil moisture for centuries."
      },
      {
        q: "What agricultural ants cut living leaves into fragments to cultivate subterranean fungal gardens as their sole dietary food source?",
        correct: "Leafcutter Ants",
        w1: "Army Ants",
        w2: "Weaver Ants",
        exp: "Atta and Acromyrmex ants harvest tons of vegetation to feed Leucocoprinus fungus, which produces specialized nutrient-rich food structures called gongylidia."
      }
    ],
    number: {
      q: "How many million ants can live in a single mature underground nest colony of Atta leafcutter ants?",
      target: 8,
      unit: "million ants",
      imperial: "8 million ants",
      exp: "A mature Atta cephalotes leafcutter ant colony can house up to 8 million individual workers excavated across hundreds of underground chambers."
    }
  },

  // Cycle 9: Camouflage, Mimicry & Jungle Armor
  {
    mcqs: [
      {
        q: "What mantis family includes species that display flattened, vein-like bodies that perfectly mimic dried dead leaves on forest floors?",
        correct: "Dead-Leaf Mantises",
        w1: "Flower Mantises",
        w2: "Shield Mantises",
        exp: "Deroplatys mantises feature crinkled, leaf-like thoracic expansions and dull brown coloration with simulated mold spots to evade predators."
      },
      {
        q: "What Neotropical butterfly flashes dazzling metallic blue light on its dorsal wings, while keeping dull brown cryptic eyespots underneath?",
        correct: "Blue Morpho",
        w1: "Heliconius",
        w2: "Postman Butterfly",
        exp: "Morpho peleides creates dazzling blue flashes in flight to confuse predators, vanishing instantly against tree trunks when snapping its wings closed."
      },
      {
        q: "What Central American rainforest butterfly features completely transparent wings lacking colored scales, rendering it nearly invisible in flight?",
        correct: "Glasswing Butterfly",
        w1: "Clearwing Hawkmoth",
        w2: "Owl Butterfly",
        exp: "Greta oto has wing membranes with nanopillar structures that eliminate optical reflection, allowing light to pass straight through without glare."
      },
      {
        q: "What nocturnal gecko found in Madagascar rainforests has fringed dermal flaps that flatten completely against tree bark to eliminate cast shadows?",
        correct: "Mossy Leaf-tailed Gecko",
        w1: "Panther Chameleon",
        w2: "Day Gecko",
        exp: "Uroplatus sikorae possesses moss-like skin coloration and lateral dermal flaps that disrupt its body outline against lichen-covered trunks."
      },
      {
        q: "What Amazonian hawkmoth caterpillar can inflate its anterior body segments to mimic the head and staring eyes of a venomous pit viper?",
        correct: "Hemeroplanes triptolemus Caterpillar",
        w1: "Swallowtail Caterpillar",
        w2: "Monarch Caterpillar",
        exp: "When threatened, this caterpillar expands its thorax into a triangular snake-like head and strikes defensively toward approaching birds."
      }
    ],
    number: {
      q: "What is the maximum recorded wingspan in centimeters of the giant Neotropical White Witch Moth Thysania agrippina?",
      target: 30,
      unit: "cm",
      imperial: "11.8 inches (30 cm)",
      exp: "The White Witch Moth Thysania agrippina of Central and South American rainforests has the largest wingspan of any insect, measuring up to 30 cm (12 in)."
    }
  },

  // Cycle 10: Global Climate & Conservation
  {
    mcqs: [
      {
        q: "The Amazon rainforest generates much of its own regional rainfall through what biological process of water vapor release from tree leaves?",
        correct: "Evapotranspiration",
        w1: "Sublimation",
        w2: "Guttation",
        exp: "A single large rainforest tree can pump hundreds of liters of water daily into the atmosphere, creating clouds that re-precipitate over the basin multiple times."
      },
      {
        q: "What meteorological term describes the colossal atmospheric corridors of water vapor pumped by the Amazon across South America?",
        correct: "Flying Rivers",
        w1: "Hadley Jet",
        w2: "Equatorial Trough",
        exp: "Flying rivers carry an estimated 20 billion metric tons of moisture daily, supplying critical rainfall to agriculture in southern Brazil, Paraguay, and Argentina."
      },
      {
        q: "What primary agricultural commodity has historically been the leading driver of large-scale tropical rainforest loss in Southeast Asia?",
        correct: "Oil Palm Plantations",
        w1: "Soybean monoculture",
        w2: "Coffee cultivation",
        exp: "Expansion of oil palm plantations in Malaysia and Indonesia has replaced vast tracts of peat swamp and lowland dipterocarp rainforest."
      },
      {
        q: "What antimalarial compound was originally extracted from the bark of the Cinchona tree native to the Andean mountain rainforests?",
        correct: "Quinine",
        w1: "Curare",
        w2: "Digitalis",
        exp: "Quinine was isolated in 1820 from Cinchona bark, serving as the world first widely effective pharmaceutical treatment for malaria."
      },
      {
        q: "What percentage of modern prescription pharmaceutical compounds are derived from bioactive molecules originally discovered in tropical rainforest plants?",
        correct: "25 percent",
        w1: "75 percent",
        w2: "5 percent",
        exp: "Over a quarter of all modern medicines originate from rainforest flora, even though less than one percent of rainforest plant species have been biochemically tested."
      }
    ],
    number: {
      q: "What percentage of modern pharmaceutical drugs are derived from bioactive compounds originally discovered in tropical rainforest flora?",
      target: 25,
      unit: "percent",
      imperial: "25% of modern prescription drugs",
      exp: "Approximately 25 percent of all modern Western pharmaceutical medicines originate from compounds discovered in tropical rainforest ecosystems."
    }
  }
];

buildQuiz({
  id: 'rainforests-biodiversity-jungles-60',
  theme: 'Tropical Rainforests: Amazon, Biodiversity & Canopy Life',
  title: 'Tropical Rainforests: Amazon, Biodiversity & Canopy Life',
  description: 'A 60-question grand master assessment exploring rainforest canopy layers, Amazon hydrology, unique arboreal fauna, soil ecology, and climate regulation.',
  category: 'Nature, Wildlife & Biology',
  difficulty: 'moderate'
}, rainforestCycles);

console.log('Finished generating Quizzes 1, 2, 3!');
