const { buildQuiz } = require('./generate_helpers.cjs');

// -------------------------------------------------------------
// 7. mammals-world-wildlife-60
// -------------------------------------------------------------
const mammalCycles = [
  // Cycle 1: Mammalian Hallmarks & Monotremes/Marsupials
  {
    mcqs: [
      {
        q: "What three anatomical hallmarks uniquely define living organisms in the biological class Mammalia?",
        correct: "Mammary glands, hair or fur, three middle ear bones",
        w1: "Warm blood, feathers, hollow bones",
        w2: "Scales, amniotic egg, single middle ear columella",
        exp: "Mammals are distinguished by milk-secreting mammary glands, keratinous hair, a neocortex brain region, and three auditory ossicles: malleus, incus, and stapes."
      },
      {
        q: "What semi-aquatic Australian mammal is an egg-laying monotreme whose adult males possess venomous calcaneus spurs on their hind legs?",
        correct: "Duck-billed Platypus",
        w1: "Short-beaked Echidna",
        w2: "Sugar Glider",
        exp: "Ornithorhynchus anatinus lays soft leathery eggs and secretes venom composed of defensin-like peptides capable of causing severe pain in humans."
      },
      {
        q: "What spiny monotreme uses an electroreceptive snout to probe soil and termite mounds for ant larvae across Australia and New Guinea?",
        correct: "Short-beaked Echidna",
        w1: "Platypus",
        w2: "Numbat",
        exp: "Echidnas lack teeth, using a long sticky tongue and specialized electroreceptors in their snout to detect the electrical impulses of soil invertebrates."
      },
      {
        q: "What pouch-bearing abdominal structure characterizes marsupial mammals, inside which underdeveloped neonate joeys nurse and grow?",
        correct: "Marsupium",
        w1: "Cloaca",
        w2: "Blastocoel",
        exp: "Marsupial young are born in an embryonic altricial state, crawling through their mother fur to reach teats located inside the protective marsupium pouch."
      },
      {
        q: "What is the largest living marsupial species, capable of hopping across the Australian arid outback at speeds exceeding 50 km/h?",
        correct: "Red Kangaroo Osphranter rufus",
        w1: "Eastern Grey Kangaroo",
        w2: "Common Wombat",
        exp: "Red kangaroos use large elastic Achilles tendons that act like pogo springs, storing and releasing mechanical energy with high metabolic efficiency."
      }
    ],
    number: {
      q: "How many distinct tiny acoustic ossicle bones malleus, incus, stapes are present inside each mammalian middle ear?",
      target: 3,
      unit: "bones",
      imperial: "3 middle ear bones",
      exp: "Mammals evolved three middle ear ossicles (hammer, anvil, and stirrup) derived from ancestral reptilian jaw bones, amplifying acoustic sound waves."
    }
  },

  // Cycle 2: Safari Megafauna: Elephants, Rhinos & Hippos
  {
    mcqs: [
      {
        q: "Which elephant species is the largest living terrestrial mammal on Earth, with large adult bulls reaching weights up to 6,000 kg?",
        correct: "African Bush Elephant Loxodonta africana",
        w1: "Asian Elephant",
        w2: "African Forest Elephant",
        exp: "African bush elephants have large fan-shaped ears that dissipate heat and trunks containing over 40,000 individual muscle fascicles."
      },
      {
        q: "What structural material constitutes the horn of a rhinoceros, composed of densely compacted proteins rather than true bone?",
        correct: "Keratin",
        w1: "Calcium Phosphate",
        w2: "Dentin Enamel",
        exp: "Rhino horns are composed entirely of agglutinated keratin protein filaments, the same structural material found in hair, nails, and hooves."
      },
      {
        q: "What semi-aquatic African mammal secretes an oily reddish fluid called blood sweat that acts as a natural sunscreen and antibacterial agent?",
        correct: "Hippopotamus",
        w1: "Black Rhinoceros",
        w2: "Cape Buffalo",
        exp: "Hippos secrete hipposudoric and norhipposudoric acids, which absorb harmful ultraviolet radiation and inhibit bacterial growth in muddy river water."
      },
      {
        q: "How do African elephants communicate across distances exceeding 10 kilometers through seismic ground vibrations and airwaves?",
        correct: "Low-frequency Infrasound rumbles",
        w1: "Ultrasonic echolocation clicks",
        w2: "Stridulating tusk friction",
        exp: "Elephants produce infrasonic vocalizations below 20 Hz, detecting seismic ground waves through sensitive Pacinian corpuscles in their foot pads."
      },
      {
        q: "What is the tallest living terrestrial animal on Earth, with long necks that remarkably contain only seven cervical vertebrae like most mammals?",
        correct: "Giraffe Giraffa camelopardalis",
        w1: "Okapi",
        w2: "Dromedary Camel",
        exp: "Giraffes maintain high blood pressure with a massive 11 kg heart and specialized rete mirabile vascular networks to prevent fainting when lowering their heads."
      }
    ],
    number: {
      q: "How many months does a female African Elephant carry her developing calf, the longest gestation period of any land mammal?",
      target: 22,
      unit: "months",
      imperial: "22-month gestation",
      exp: "African elephants have an average pregnancy duration of 22 months (approx 660 days), allowing extensive fetal brain development before birth."
    }
  },

  // Cycle 3: Cetaceans: Whales, Dolphins & Porpoises
  {
    mcqs: [
      {
        q: "What marine mammal is the largest animal known to have ever lived on Earth, reaching lengths over 30 meters and masses near 200 metric tons?",
        correct: "Blue Whale Balaenoptera musculus",
        w1: "Fin Whale",
        w2: "Bowhead Whale",
        exp: "A blue whale can engulf up to 100 metric tons of water and krill in a single lunge, filtering food through fringed keratinous baleen plates."
      },
      {
        q: "What filter-feeding comb plates composed of keratin hang from the upper jaws of Mysticeti whales to sift krill from seawater?",
        correct: "Baleen Plates",
        w1: "Rostral Serrations",
        w2: "Gill Rakers",
        exp: "Baleen whales lack teeth, relying on hundreds of flexible baleen plates with inner hairy fringes to trap small plankton and schooling fish."
      },
      {
        q: "What Arctic toothed whale is famous for the spiraled ivory tusk up to 3 meters long grown by males, which is an elongated sensory canine tooth?",
        correct: "Narwhal Monodon monoceros",
        w1: "Beluga Whale",
        w2: "Bowhead Whale",
        exp: "The narwhal tusk contains millions of sensory nerve pathways that detect changes in seawater salinity, temperature, and atmospheric pressure."
      },
      {
        q: "What deep-diving Arctic whale species has the longest lifespan of any mammal, verified by stone harpoon points and eye lens amino acids to exceed 200 years?",
        correct: "Bowhead Whale Balaena mysticetus",
        w1: "Blue Whale",
        w2: "Humpback Whale",
        exp: "Bowhead whales possess unique genetic adaptations in DNA repair and cell cycle regulation that confer extreme longevity and cancer resistance."
      },
      {
        q: "What baleen whale is celebrated for breaching entirely out of water and creating complex bubble nets to corral schooling fish?",
        correct: "Humpback Whale Megaptera novaeangliae",
        w1: "Minke Whale",
        w2: "Right Whale",
        exp: "Humpback whales blow coordinated curtains of rising bubbles while ascending in spirals to trap fish before lunging upward with open mouths."
      }
    ],
    number: {
      q: "What is the estimated weight in kilograms of the massive four-chambered heart of a full-grown adult Blue Whale?",
      target: 180,
      unit: "kg",
      imperial: "400 lbs (180 kg)",
      exp: "A blue whale heart weighs approximately 180 to 200 kilograms (roughly the size of a small golf cart), pumping roughly 220 liters of blood per heartbeat."
    }
  },

  // Cycle 4: Primate Evolution & Cognitive Complexity
  {
    mcqs: [
      {
        q: "Which great ape species is our closest living genetic relative, sharing over 98 percent DNA identity and using sticks to fish for termites?",
        correct: "Chimpanzee Pan troglodytes",
        w1: "Western Gorilla",
        w2: "Bornean Orangutan",
        exp: "Chimpanzees exhibit cultural tool use, cooperative hunting of colobus monkeys, and complex political dominance hierarchies in fission-fusion groups."
      },
      {
        q: "What Southeast Asian great ape is known as the red ape, spending over 90 percent of its life in the rainforest canopy and exhibiting a largely solitary lifestyle?",
        correct: "Orangutan Pongo",
        w1: "Siamang",
        w2: "Lar Gibbon",
        exp: "Orangutans possess the longest childhood dependency of any non-human animal, with offspring nursing and learning foraging routes from mothers for up to 8 years."
      },
      {
        q: "What primitive prosimian primate clade is endemic exclusively to the island of Madagascar, having evolved into over 100 species in geographic isolation?",
        correct: "Lemurs",
        w1: "Bushbabies",
        w2: "Lorises",
        exp: "Lemur ancestors rafted to Madagascar roughly 50 to 60 million years ago, diversifying into distinct ecological niches from tiny mouse lemurs to the indri."
      },
      {
        q: "What nocturnal Madagascar lemur features an elongated, skeletal middle finger with a ball-and-socket joint used to tap wood and extract beetle grubs?",
        correct: "Aye-Aye Daubentonia madagascariensis",
        w1: "Indri",
        w2: "Verreaux Sifaka",
        exp: "The Aye-Aye fills the ecological niche of a woodpecker, using tap-foraging echolocation and continuously growing rodent-like incisors to gnaw tree bark."
      },
      {
        q: "What family of lesser apes is renowned for rapid, acrobatic brachiation through Asian canopies and singing complex mated pair duets?",
        correct: "Gibbons Hylobatidae",
        w1: "Colobus Monkeys",
        w2: "Langurs",
        exp: "Gibbons possess ball-and-socket wrist joints that allow seamless 360-degree rotation, swinging beneath branches at speeds up to 55 km/h."
      }
    ],
    number: {
      q: "Approximately how many kilograms can a mature dominant wild silverback Mountain Gorilla weigh?",
      target: 200,
      unit: "kg",
      imperial: "440 lbs (200 kg)",
      exp: "Adult male silverback mountain gorillas stand roughly 1.7 to 1.8 meters tall and weigh between 160 and 200 kilograms in the wild."
    }
  },

  // Cycle 5: Carnivora, Mustelids & Canids
  {
    mcqs: [
      {
        q: "What small desert canid native to the Sahara Desert possesses oversized ears up to 15 cm long to radiate body heat and pinpoint burrowing prey?",
        correct: "Fennec Fox Vulpes zerda",
        w1: "Bat-eared Fox",
        w2: "Blanford Fox",
        exp: "The fennec fox has fur-covered footpads to traverse burning dunes and massive vascularized ears that act as thermal radiators in extreme heat."
      },
      {
        q: "What small carnivorous mustelid undergoes a seasonal molt from reddish-brown summer fur to pure snow-white winter fur with a black tail tip?",
        correct: "Stoat Short-tailed Weasel",
        w1: "Least Weasel",
        w2: "American Mink",
        exp: "Mustela erminea in its white winter coat is known as ermine, hunting rodents beneath deep snowdrifts using its slender, flexible body."
      },
      {
        q: "What marine mustelid floats on its back and uses flat stones balanced on its chest as anvils to crack open abalone and crab shells?",
        correct: "Sea Otter Enhydra lutris",
        w1: "Giant River Otter",
        w2: "Neotropical Otter",
        exp: "Sea otters are one of the few non-primate mammals known to use stone tools, storing favorite anvil stones in loose skin pouches under their forelegs."
      },
      {
        q: "What African mustelid is famous for its thick rubbery skin, aggressive tenacity, and immunity to neurotoxic snake venom?",
        correct: "Honey Badger Mellivora capensis",
        w1: "Striped Polecat",
        w2: "African Civet",
        exp: "Mellivora capensis possesses mutated nicotinic acetylcholine receptors that prevent snake alpha-neurotoxins from binding, allowing it to shrug off cobra bites."
      },
      {
        q: "What small social mongoose species lives in cooperative underground colonies in southern Africa, using sentinel lookouts to scan for aerial raptors?",
        correct: "Meerkat Suricata suricatta",
        w1: "Banded Mongoose",
        w2: "Yellow Mongoose",
        exp: "Meerkats take turns standing on hind legs on elevated mounds, using distinct alarm barks to warn foraging pack members of approaching hawks or jackals."
      }
    ],
    number: {
      q: "How many thousand hairs per square centimeter does a Sea Otter possess, making it the densest fur of any animal on Earth?",
      target: 150,
      unit: "thousand hairs/cm2",
      imperial: "approx 1,000,000 hairs/sq in (150k/cm2)",
      exp: "Sea otters lack blubber, relying entirely on 100,000 to 150,000 hairs per square centimeter (up to one million hairs per square inch) to trap insulating air bubbles."
    }
  },

  // Cycle 6: Ungulates & Ruminant Physiology
  {
    mcqs: [
      {
        q: "What four sequential stomach chambers do true ruminant ungulates like cattle, deer, and sheep use to ferment cellulose-rich plant forage?",
        correct: "Rumen, reticulum, omasum, abomasum",
        w1: "Crop, proventriculus, gizzard, caecum",
        w2: "Cardia, fundus, body, pylorus",
        exp: "Microbial fermentation in the rumen and reticulum breaks down tough plant cellulose before cud is regurgitated, re-chewed, and passed to the omasum and true stomach."
      },
      {
        q: "What primary structural difference distinguishes cervid deer antlers from bovid cattle and antelope horns?",
        correct: "Antlers are shed and regrown annually from bone, while horns are permanent keratin sheaths over living bone cores",
        w1: "Horns are shed every spring during mating season",
        w2: "Antlers contain hollow vascular airflow chambers",
        exp: "Antlers are pure bone structures that grow rapidly covered in vascular velvet before mineralizing and shedding annually after the breeding rut."
      },
      {
        q: "What striped African equids feature unique black-and-white coat patterns that confuse biting tsetse flies and create motion dazzle for predators?",
        correct: "Zebras",
        w1: "Okapis",
        w2: "Nyala Antelopes",
        exp: "Experiments demonstrate that zebra stripe spacing polarizes light and disrupts the landing mechanisms of blood-sucking tabanid horseflies and tsetse flies."
      },
      {
        q: "What North American ungulate is the fastest land animal in the Western Hemisphere, capable of sustained galloping speeds of 88 km/h?",
        correct: "Pronghorn Antilocapra americana",
        w1: "Bighorn Sheep",
        w2: "Elk Wapiti",
        exp: "Pronghorns evolved explosive sprint and endurance capabilities with oversized trachea and lungs to outrun now-extinct American cheetahs during the Pleistocene."
      },
      {
        q: "What shaggy Arctic ungulate produces an exceptionally warm and lightweight inner wool undercoat called qiviut, eight times warmer than sheep wool?",
        correct: "Muskox Ovibos moschatus",
        w1: "Caribou Reindeer",
        w2: "Rocky Mountain Goat",
        exp: "Muskoxen survive Arctic winter temperatures dropping below -50 °C by growing dense qiviut wool under thick outer guard hairs up to 60 cm long."
      }
    ],
    number: {
      q: "How many distinct stomach compartments do true ruminant mammals possess to ferment fibrous plant matter?",
      target: 4,
      unit: "compartments",
      imperial: "4 stomach compartments",
      exp: "True ruminants possess four digestive compartments: the rumen, reticulum, omasum, and abomasum (the true glandular stomach)."
    }
  },

  // Cycle 7: Marine Pinnipeds & Sirenians
  {
    mcqs: [
      {
        q: "What massive Arctic pinniped possesses elongated ivory tusks used for hauling out onto ice floes and sensitive vibrissae whiskers to detect clams?",
        correct: "Walrus Odobenus rosmarus",
        w1: "Bearded Seal",
        w2: "Hooded Seal",
        exp: "Walruses use their muscular tongues and lips to create powerful vacuum suction that sloughs clam meat straight out of shells on muddy seafloors."
      },
      {
        q: "What colossal pinniped exhibits extreme sexual dimorphism, with dominant beachmaster bulls weighing up to 4,000 kg and sporting an inflatable proboscis?",
        correct: "Southern Elephant Seal Mirounga leonina",
        w1: "California Sea Lion",
        w2: "Steller Sea Lion",
        exp: "Southern elephant seals are the largest living carnivoran mammals, capable of holding their breath for over two hours and diving deeper than 2,000 meters."
      },
      {
        q: "What fully aquatic herbivorous marine mammals are known as sea cows, feeding peacefully on shallow coastal seagrass beds in warm tropical waters?",
        correct: "Sirenians Manatees and Dugongs",
        w1: "Phocid True Seals",
        w2: "Otariid Sea Lions",
        exp: "Sirenians are closely related to elephants and hyraxes, possessing dense pachyostotic bones that act as natural ballast for bottom grazing."
      },
      {
        q: "What anatomical feature distinguishes true seals Phocidae from eared seals Otariidae like sea lions and fur seals?",
        correct: "True seals lack external ear pinnae and propel in water using hind flippers, while eared seals swim with large front pectoral flippers",
        w1: "True seals have elongated canine tusks",
        w2: "Eared seals cannot move their hind flippers forward on land",
        exp: "Otariids (sea lions) have visible ear flaps and can rotate their hind flippers forward to gallop on land, while phocid true seals undulate on their bellies."
      },
      {
        q: "What colossal sirenian species discovered in 1741 in the Bering Sea grew over 9 meters long and was hunted to extinction within just 27 years?",
        correct: "Steller Sea Cow Hydrodamalis gigas",
        w1: "Amazonian Manatee",
        w2: "Caribbean Monk Seal",
        exp: "Hydrodamalis gigas fed on shallow kelp beds, lacking teeth and using horny keratinous plates to chew kelp before sailors hunted them to extinction by 1768."
      }
    ],
    number: {
      q: "What is the maximum recorded weight in metric tons of a massive dominant male Southern Elephant Seal Mirounga leonina?",
      target: 4,
      unit: "metric tons",
      imperial: "8,800 lbs (4.0 metric tons)",
      exp: "Exceptional male southern elephant seals can reach up to 4,000 kilograms (4 metric tons) and measure nearly 6 meters in length."
    }
  },

  // Cycle 8: Bats & Rodent Diversity
  {
    mcqs: [
      {
        q: "What mammalian order represents roughly 20 percent of all classified mammal species, being the only mammals capable of true sustained powered flight?",
        correct: "Chiroptera Bats",
        w1: "Rodentia",
        w2: "Eulipotyphla",
        exp: "Chiropterans feature wings formed by a thin leathery patagium membrane stretched over elongated finger bones, numbering over 1,400 distinct species."
      },
      {
        q: "What is the largest living rodent species on Earth, native to South American wetlands and highly gregarious in family groups?",
        correct: "Capybara Hydrochoerus hydrochaeris",
        w1: "North American Beaver",
        w2: "Nutria Coypu",
        exp: "Adult capybaras can weigh over 65 kg, featuring semi-aquatic adaptations including webbed feet, dense waterproof hair, and facial features placed high on the head."
      },
      {
        q: "What subterranean African rodent lives in eusocial underground colonies with a single breeding queen and exhibits extraordinary resistance to cancer?",
        correct: "Naked Mole-Rat Heterocephalus glaber",
        w1: "Blind Mole-Rat",
        w2: "Pocket Gopher",
        exp: "Naked mole-rats produce high-molecular-mass hyaluronan in extracellular matrices, preventing cancerous cell crowding and enabling 30-year lifespans."
      },
      {
        q: "What semi-aquatic rodent acts as an ecological ecosystem engineer by building wooden dams and lodges that create biodiverse wetland habitats?",
        correct: "North American Beaver Castor canadensis",
        w1: "Muskrat",
        w2: "Water Vole",
        exp: "Beavers use iron-fortified orange enamel incisors to fell trees, constructing deep pond reservoirs that recharge groundwater tables."
      },
      {
        q: "What tiny bat native to western Thailand and Myanmar is considered the world smallest mammal by skull size, weighing only 2 grams?",
        correct: "Kitti Hog-nosed Bat Craseonycteris thonglongyai",
        w1: "Etruscan Shrew",
        w2: "Pygmy Possum",
        exp: "Also called the bumblebee bat, this tiny limestone cave dweller measures roughly 3 cm long and feeds on insects plucked from foliage."
      }
    ],
    number: {
      q: "What is the average body weight in grams of the tiny Kitti Hog-nosed Bumblebee Bat Craseonycteris thonglongyai?",
      target: 2,
      unit: "grams",
      imperial: "0.07 oz (2 grams)",
      exp: "Weighing roughly 2 grams with a wingspan of only 15 centimeters, the bumblebee bat is tied with the Etruscan shrew as Earth smallest mammal by mass."
    }
  },

  // Cycle 9: Extreme Thermal & Physiological Adaptations
  {
    mcqs: [
      {
        q: "What dense energy store inside camel humps metabolizes into water and fuel, allowing dromedaries to traverse arid deserts for weeks without drinking?",
        correct: "Triglyceride Adipose Fat",
        w1: "Liquid Water Pockets",
        w2: "Lymphatic Plasma Reservoirs",
        exp: "Concentrating fat in dorsal humps leaves the rest of the camel body with minimal insulating subcutaneous fat, allowing efficient heat dissipation."
      },
      {
        q: "What small subarctic fox species has the warmest insulating fur of any land mammal, staying active in temperatures plunging below -50 degrees Celsius?",
        correct: "Arctic Fox Vulpes lagopus",
        w1: "Red Fox",
        w2: "Corsac Fox",
        exp: "Vulpes lagopus has dense multi-layered underfur, rounded compact ears, and counter-current heat exchangers in its paws that prevent frostbite on pack ice."
      },
      {
        q: "What armored placental mammal native to the Americas is covered in dermal bone osteoderm plates and can roll into an impenetrable sphere?",
        correct: "Three-Banded Armadillo Tolypeutes",
        w1: "Nine-Banded Armadillo",
        w2: "Giant Anteater",
        exp: "Tolypeutes is the only armadillo genus able to tuck its head and tail completely inside its interlocking carapace plates to form a seamless armored ball."
      },
      {
        q: "What solitary mammal covered in overlapping keratin scales rolls into a defensive ball, making it tragically the most poached wild mammal on Earth?",
        correct: "Pangolin Pholidota",
        w1: "Armadillo",
        w2: "Echidna",
        exp: "Pangolins have long sticky tongues anchored to the pelvis and heavy razor-sharp keratin scales, falling victim to illegal wildlife trade for traditional medicine."
      },
      {
        q: "What heavily built bovid of the Tibetan Plateau has dense woolly underfur, enlarged lungs, and high-affinity hemoglobin to thrive above 4,000 meters?",
        correct: "Wild Yak Bos mutus",
        w1: "Alpine Ibex",
        w2: "Bharal Blue Sheep",
        exp: "Yaks have red blood cells roughly half the size of cattle at three times the density, enabling efficient oxygen uptake in thin high-altitude atmospheres."
      }
    ],
    number: {
      q: "What extreme core body temperature in degrees Celsius below zero can hibernating Arctic Ground Squirrels reach during torpor without freezing?",
      target: -3,
      unit: "celsius",
      imperial: "-2.9 °C (26.8 °F)",
      exp: "Arctic ground squirrels undergo supercooling during winter hibernation, dropping body core temperatures to -2.9 °C by clearing all ice-nucleating agents."
    }
  },

  // Cycle 10: Keystone Mammals & Island Evolution
  {
    mcqs: [
      {
        q: "What ecological rule observes that warm-blooded vertebrate body sizes tend to be larger in cold polar climates than in warm tropical regions?",
        correct: "Bergmann Rule",
        w1: "Allen Rule",
        w2: "Gloger Rule",
        exp: "Larger body volumes produce lower surface-area-to-volume ratios, minimizing body heat loss to cold surroundings (e.g., polar bears vs sun bears)."
      },
      {
        q: "What evolutionary phenomenon describes how large mainland mammal species evolve significantly smaller body sizes when isolated on small islands?",
        correct: "Insular Dwarfism",
        w1: "Island Gigantism",
        w2: "Foster Shift",
        exp: "Limited island food resources and the absence of large apex predators favor smaller body sizes over generations, as seen in Pleistocene dwarf mammoths."
      },
      {
        q: "What extinct Pleistocene dwarf elephant species endemic to Sicily and Malta stood only one meter tall at the shoulder?",
        correct: "Palaeoloxodon falconeri",
        w1: "Mammuthus primigenius",
        w2: "Mammut americanum",
        exp: "Palaeoloxodon falconeri weighed only roughly 100 kg, evolving from ancestral 4-meter straight-tusked elephants trapped on Mediterranean islands."
      },
      {
        q: "What Australian marsupial feeds almost exclusively on toxic, tannin-rich eucalyptus leaves, sleeping up to 20 hours daily due to low metabolic energy?",
        correct: "Koala Phascolarctos cinereus",
        w1: "Common Wombat",
        w2: "Common Brushtail Possum",
        exp: "Koalas possess an extraordinarily long 2-meter caecum housing specialized symbiotic gut bacteria that break down toxic eucalyptus oils."
      },
      {
        q: "What specialized South American mammal has no teeth, a 60-cm sticky tongue, and consumes up to 30,000 ants and termites every single day?",
        correct: "Giant Anteater Myrmecophaga tridactyla",
        w1: "Tamandua",
        w2: "Silky Anteater",
        exp: "Giant anteaters use heavy curved claws to tear open rock-hard termite mounds, flicking their tongue up to 160 times per minute to ingest insects."
      }
    ],
    number: {
      q: "Up to how many thousand ants and termites can a single wild Giant Anteater Myrmecophaga tridactyla consume in a single day?",
      target: 30,
      unit: "thousand ants",
      imperial: "30,000 ants and termites per day",
      exp: "Giant anteaters visit dozens of termite mounds daily, spending only a minute at each to avoid soldier bites and consuming around 30,000 insects daily."
    }
  }
];

buildQuiz({
  id: 'mammals-world-wildlife-60',
  theme: 'Wild Mammals: Safari Giants, Cetaceans & Primates',
  title: 'Wild Mammals: Safari Giants, Cetaceans & Primates',
  description: 'A 60-question grand master assessment exploring mammalian biology, African megafauna, cetacean acoustics, primate cognitive behavior, and extreme survival adaptations.',
  category: 'Nature, Wildlife & Biology',
  difficulty: 'moderate'
}, mammalCycles);

// -------------------------------------------------------------
// 8. dinosaurs-prehistoric-life-60
// -------------------------------------------------------------
const dinosaurCycles = [
  // Cycle 1: Mesozoic Timeline & Dinosaur Clades
  {
    mcqs: [
      {
        q: "What three geological periods compose the Mesozoic Era, famously known as the Age of Dinosaurs?",
        correct: "Triassic, Jurassic, Cretaceous",
        w1: "Permian, Carboniferous, Devonian",
        w2: "Paleogene, Neogene, Quaternary",
        exp: "The Mesozoic spanned from 252 to 66 million years ago, beginning after the Great Dying extinction and ending with the Chicxulub asteroid impact."
      },
      {
        q: "What anatomical pelvis orientation originally divided all dinosaurs into two fundamental clades: lizard-hipped Saurischia and bird-hipped Ornithischia?",
        correct: "Orientation of the pubis bone relative to the ischium",
        w1: "Number of fused sacral vertebrae",
        w2: "Shape of the femur head",
        exp: "Harry Seeley classified dinosaurs based on whether the pubis pointed forward (saurischian) or backward parallel to the ischium (ornithischian)."
      },
      {
        q: "In which geological period did the earliest primitive dinosaurs first evolve roughly 230 million years ago from small archosaurs?",
        correct: "Triassic Period",
        w1: "Jurassic Period",
        w2: "Permian Period",
        exp: "Dinosaurs arose during the Carnian pluvial episode of the Late Triassic, rapidly diversifying following the Triassic-Jurassic extinction event."
      },
      {
        q: "Which early bipedal carnivorous dinosaur discovered in the Ischigualasto Formation of Argentina is among the oldest known primitive dinosaurs?",
        correct: "Herrerasaurus",
        w1: "Coelophysis",
        w2: "Plateosaurus",
        exp: "Herrerasaurus lived roughly 231 million years ago, featuring a flexible sliding lower jaw joint and five-toed feet with three weight-bearing digits."
      },
      {
        q: "What anatomical opening in the skull located directly in front of the eye sockets is a defining diagnostic trait of archosaurs, including all dinosaurs?",
        correct: "Antorbital Fenestra",
        w1: "Infratemporal fenestra",
        w2: "Mandibular foramen",
        exp: "The antorbital fenestra lightened the skull mass in large-headed predators and sauropods while providing space for air sinuses and jaw muscles."
      }
    ],
    number: {
      q: "How many million years ago did the Mesozoic Era begin following the devastating end-Permian mass extinction?",
      target: 252,
      unit: "million years",
      imperial: "252 million years ago",
      exp: "The Mesozoic Era began 251.9 million years ago, marking the start of the Triassic Period and the gradual evolutionary rise of archosaurs."
    }
  },

  // Cycle 2: Apex Theropods & Bipedal Carnivores
  {
    mcqs: [
      {
        q: "What massive Late Cretaceous theropod possessed forward-facing stereoscopic eyes, bone-shattering teeth, and two-clawed forelimbs?",
        correct: "Tyrannosaurus rex",
        w1: "Allosaurus fragilis",
        w2: "Carnotaurus sastrei",
        exp: "T. rex reached lengths over 12 meters and possessed thick, D-shaped serrated teeth designed to crush and puncture solid cortical bone."
      },
      {
        q: "What semi-aquatic predatory dinosaur of North Africa possessed a colossal 1.8-meter neural spine sail and elongated conical fish-catching teeth?",
        correct: "Spinosaurus aegyptiacus",
        w1: "Carcharodontosaurus",
        w2: "Suchomimus tenerensis",
        exp: "Spinosaurus grew up to 14 meters long with dense paddle-like tail bones, spending substantial time swimming in Cretaceous river systems hunting large sawfish."
      },
      {
        q: "What South American carcharodontosaurid theropod of the mid-Cretaceous rivaled T. rex in size, wielding thin blade-like slicing teeth?",
        correct: "Giganotosaurus carolinii",
        w1: "Mapusaurus roseae",
        w2: "Tyrannotitan chubutensis",
        exp: "Giganotosaurus lived roughly 98 million years ago in Argentina, possessing 20-cm serrated teeth designed to slice meat from giant titanosaur sauropods."
      },
      {
        q: "What horned abelisaurid theropod from Patagonia possessed extremely reduced, vestigial arms and long muscular legs adapted for high-speed sprinting?",
        correct: "Carnotaurus sastrei",
        w1: "Ceratosaurus nasicornis",
        w2: "Majungasaurus crenatissimus",
        exp: "Carnotaurus featured prominent brow horns, large caudofemoralis tail-leg muscles, and fossil skin impressions proving it was covered in bumpy non-overlapping scales."
      },
      {
        q: "What dromaeosaurid theropod discovered in the Gobi Desert featured an enlarged, sickle-shaped killing claw on the second toe of each foot?",
        correct: "Velociraptor mongoliensis",
        w1: "Deinonychus antirrhopus",
        w2: "Utahraptor ostrommaysi",
        exp: "Velociraptor was roughly turkey-sized (approx 15 kg) and covered in vaned feathers, using its hyperextensible foot sickle claws to pin prey."
      }
    ],
    number: {
      q: "What is the estimated bite force in Newtons exerted by the back teeth of an adult Tyrannosaurus rex, the strongest terrestrial bite force modeled?",
      target: 35000,
      unit: "Newtons",
      imperial: "35,000 to 57,000 N (approx 8,000 to 12,800 lbf)",
      exp: "Biomechanical 3D muscle modeling by Bates and Falkingham calculated T. rex bite forces between 35,000 and 57,000 Newtons, enough to pulverize bone."
    }
  },

  // Cycle 3: Colossal Sauropods & Long-Neck Giants
  {
    mcqs: [
      {
        q: "What colossal titanosaur sauropod discovered in Patagonia is estimated to be among the heaviest land animals ever, weighing up to 70 metric tons?",
        correct: "Argentinosaurus huinculensis",
        w1: "Diplodocus carnegii",
        w2: "Apatosaurus ajax",
        exp: "Individual dorsal vertebrae of Argentinosaurus measured over 1.5 meters tall, supporting an estimated total body length between 30 and 35 meters."
      },
      {
        q: "What famous Jurassic sauropod possessed longer forelimbs than hindlimbs, giving it an elevated shoulder posture to browse from high treetop canopies?",
        correct: "Brachiosaurus altithorax",
        w1: "Camarasaurus supremus",
        w2: "Diplodocus longus",
        exp: "Brachiosaurus held its head over 12 meters off the ground, using chisel-shaped teeth to strip foliage from high Jurassic conifer and ginkgo crowns."
      },
      {
        q: "What structural skeletal adaptation allowed colossal sauropods to grow long necks without exceeding biological structural mass limits?",
        correct: "Extensive pneumatic vertebral air sacs",
        w1: "Solid mineralized bone density",
        w2: "Cartilaginous vertebral shafts",
        exp: "Sauropod neck vertebrae were up to 70 percent hollow air chambers connected to an avian-style respiratory system, dramatically reducing neck mass."
      },
      {
        q: "What long-tailed diplodocid sauropod had a slender, whip-like tail tip capable of producing supersonic cracking sound waves exceeding 340 m/s?",
        correct: "Diplodocus carnegii",
        w1: "Brontosaurus excelsus",
        w2: "Barosaurus lentus",
        exp: "Diplodocus possessed over 80 caudal vertebrae tapering to thin whip-like rods, which computer simulations indicate could crack the sound barrier for defense."
      },
      {
        q: "What colossal titanosaur discovered in Chubut, Argentina in 2014 was named Patagotitan mayorum, measuring over 37 meters in length?",
        correct: "Patagotitan mayorum",
        w1: "Dreadnoughtus schrani",
        w2: "Futalognkosaurus",
        exp: "Fossils of at least six Patagotitan individuals were excavated together, representing one of the most complete titanosaurs ever recovered."
      }
    ],
    number: {
      q: "What was the estimated total body weight in metric tons of the colossal Patagonian titanosaur Argentinosaurus huinculensis?",
      target: 70,
      unit: "metric tons",
      imperial: "154,000 lbs (70 metric tons)",
      exp: "Skeletal volume reconstructions estimate Argentinosaurus weighed roughly 65 to 75 metric tons, equivalent to more than ten adult African elephants."
    }
  },

  // Cycle 4: Armored & Horned Herbivores
  {
    mcqs: [
      {
        q: "What famous Late Cretaceous ceratopsian dinosaur possessed three facial horns, a sharp beak, and a solid bone neck frill?",
        correct: "Triceratops horridus",
        w1: "Styracosaurus albertensis",
        w2: "Protoceratops andrewsi",
        exp: "Triceratops grew up to 9 meters long, using its solid parietal-squamosal neck frill for both defense against T. rex and intraspecific horn wrestling."
      },
      {
        q: "What armored stegosaurian dinosaur possessed alternating vertical bony plates along its spine and four sharp defensive spikes on its tail?",
        correct: "Stegosaurus stenops",
        w1: "Ankylosaurus magniventris",
        w2: "Kentrosaurus aethiopicus",
        exp: "Stegosaurus plates were vascularized osteoderms embedded in the skin used for thermoregulation and display, rather than attached to the spinal column."
      },
      {
        q: "What informal term coined by cartoon artist Gary Larson in 1982 was officially adopted by paleontologists to describe the four tail spikes on Stegosaurus?",
        correct: "Thagomizer",
        w1: "Clubtail",
        w2: "Pygostyle",
        exp: "In a 1982 The Far Side cartoon, a caveman named the spikes after the late Thag Simmons; paleontologists subsequently formalized thagomizer into anatomical literature."
      },
      {
        q: "What heavily armored ankylosaurid dinosaur featured fused osteoderm armor across its body, armored eyelids, and a heavy bone-crushing tail club?",
        correct: "Ankylosaurus magniventris",
        w1: "Nodosaurus textilis",
        w2: "Edmontonia rugosidens",
        exp: "Ankylosaurus tail clubs consisted of fused caudal osteoderms supported by interlocking vertebrae, capable of delivering strikes that could break theropod leg bones."
      },
      {
        q: "What bipedal ornithischian dinosaur possessed a solid, dome-shaped skull roof of solid bone up to 25 cm thick used for head-to-flank combat?",
        correct: "Pachycephalosaurus wyomingensis",
        w1: "Stygimoloch spinifer",
        w2: "Homalocephale calathocercos",
        exp: "The dense skull dome of Pachycephalosaurus was surrounded by bony knobs and spikes, adapted to withstand intense compressive impacts during courtship jousts."
      }
    ],
    number: {
      q: "How many sharp defensive bone spikes typically made up the deadly thagomizer tail weapon of Stegosaurus stenops?",
      target: 4,
      unit: "spikes",
      imperial: "4 tail spikes (2 pairs)",
      exp: "Stegosaurus stenops bore two pairs of horizontal, sharp bone spikes (four in total) measuring up to 90 cm long at the tip of its flexible tail."
    }
  },

  // Cycle 5: Pterosaurs & Aerial Archosaurs
  {
    mcqs: [
      {
        q: "What colossal azhdarchid pterosaur from the Late Cretaceous of Texas had a wingspan of 10 to 11 meters, standing as tall as a giraffe on the ground?",
        correct: "Quetzalcoatlus northropi",
        w1: "Pteranodon longiceps",
        w2: "Hatzegopteryx thambema",
        exp: "Quetzalcoatlus was a gigantic quadrupedal terrestrial stalker that used pole-vaulting launches with its muscular forelimbs to take off into flight."
      },
      {
        q: "What anatomical digit was massively elongated in pterosaurs to support the leathery wing membrane called the patagium?",
        correct: "Fourth Finger Ring Digit",
        w1: "Thumb First Digit",
        w2: "Second Index Digit",
        exp: "Unlike bats which spread wings across four elongated fingers, pterosaurs supported their entire wing membrane on a hyper-extended fourth digit."
      },
      {
        q: "What famous sea-soaring pterosaur of the North American Western Interior Seaway had a prominent cranial crest and completely toothless jaws?",
        correct: "Pteranodon longiceps",
        w1: "Rhamphorhynchus muensteri",
        w2: "Dimorphodon macronyx",
        exp: "Pteranodon had a wingspan up to 6 meters and used dynamic soaring over shallow Cretaceous seas to scoop up fish in its pelican-like beak."
      },
      {
        q: "What insulating hair-like integumentary filaments covered pterosaur bodies, proving they were warm-blooded endothermic animals?",
        correct: "Pycnofibers",
        w1: "Cartilaginous Scales",
        w2: "True Down Feathers",
        exp: "Pycnofibers were hair-like structures structurally homologous to dinosaur proto-feathers, providing thermoregulation for high-metabolism flight."
      },
      {
        q: "What massive Romanian azhdarchid pterosaur possessed heavily reinforced, thick-walled neck vertebrae, acting as an apex predator on prehistoric Hateg Island?",
        correct: "Hatzegopteryx thambema",
        w1: "Quetzalcoatlus",
        w2: "Arambourgiania",
        exp: "On the predator-deprived island of Hateg, Hatzegopteryx evolved a reinforced 3-meter skull and stout neck to hunt dwarf dinosaurs on foot."
      }
    ],
    number: {
      q: "What was the estimated wingspan in meters of the giant azhdarchid pterosaur Quetzalcoatlus northropi?",
      target: 11,
      unit: "meters",
      imperial: "36 feet (11.0 m)",
      exp: "Quetzalcoatlus northropi had a wingspan estimated between 10 and 11 meters (33 to 36 feet), making it the largest flying animal known to science."
    }
  },

  // Cycle 6: Prehistoric Marine Reptiles
  {
    mcqs: [
      {
        q: "What apex predatory marine reptile of the Late Cretaceous was a gigantic aquatic squamate closely related to modern monitor lizards and snakes?",
        correct: "Mosasaurus hoffmannii",
        w1: "Plesiosaurus dolichodeirus",
        w2: "Ichthyosaurus communis",
        exp: "Mosasaurus reached lengths up to 17 meters, featuring a double-hinged jaw with pterygoid teeth in the palate and a powerful crescent-shaped tail fluke."
      },
      {
        q: "What marine reptile clade possessed exceptionally long flexible necks, four paddle-like flippers, and compact bodies adapted for underwater flying?",
        correct: "Plesiosauria",
        w1: "Ichthyosauria",
        w2: "Thalattosuchia",
        exp: "Elasmosaurid plesiosaurs had necks containing up to 72 cervical vertebrae, using underwater wing flapping kinematics to ambush schooling fish from below."
      },
      {
        q: "What prehistoric marine reptile group evolved a streamlined body shape remarkably convergent with modern dolphins, complete with dorsal fins and live birth?",
        correct: "Ichthyosauria",
        w1: "Mosasauria",
        w2: "Placodontia",
        exp: "Ichthyosaurs evolved huge eyes with sclerotic rings for deep diving, giving live birth tail-first to avoid drowning neonates in open ocean waters."
      },
      {
        q: "What short-necked pliosaur of the Jurassic period possessed a massive 2-meter skull with teeth as large as bananas, preying on giant fish and plesiosaurs?",
        correct: "Liopleurodon ferox",
        w1: "Kronosaurus queenslandicus",
        w2: "Pliosaurus funkei",
        exp: "Liopleurodon used four large hydrofoil flippers for explosive acceleration, possessing directional stereoscopic olfaction to scent prey across ocean currents."
      },
      {
        q: "What giant Cretaceous sea turtle featured a leathery, open-frame carapace spanning over 4 meters, making it the largest sea turtle documented?",
        correct: "Archelon ischyros",
        w1: "Protostega gigas",
        w2: "Stupendemys geographicus",
        exp: "Archelon lived in the Western Interior Seaway, weighing over 2,200 kg and feeding on giant ammonites and jellyfish with powerful shearing beak jaws."
      }
    ],
    number: {
      q: "What is the maximum verified length in meters of the colossal apex marine reptile Mosasaurus hoffmannii?",
      target: 17,
      unit: "meters",
      imperial: "56 feet (17.0 m)",
      exp: "Largest verified Mosasaurus hoffmannii skeletal specimens, including fossils from Maastricht, indicate adult lengths between 15 and 17 meters."
    }
  },

  // Cycle 7: Paleozoic Monsters Before the Dinosaurs
  {
    mcqs: [
      {
        q: "What iconic sail-backed synapsid of the Early Permian was a mammal-like stem-reptile that lived 40 million years before the first dinosaur evolved?",
        correct: "Dimetrodon",
        w1: "Edaphosaurus",
        w2: "Gorgonops",
        exp: "Dimetrodon is more closely related to modern mammals than to dinosaurs, possessing differentiated incisor and canine teeth and a thermal back sail."
      },
      {
        q: "What apex predator of the Cambrian oceans featured grasping spiny frontal appendages and a circular pineapple-slice mouth to hunt trilobites?",
        correct: "Anomalocaris canadensis",
        w1: "Opabinia regalis",
        w2: "Hallucigenia sparsa",
        exp: "Discovered in the Burgess Shale, Anomalocaris grew up to one meter long with compound eyes containing 16,000 lenses, dominating early Cambrian seas."
      },
      {
        q: "What colossal millipede-like arthropod grew up to 2.5 meters long in the high-oxygen swamp forests of the Carboniferous period?",
        correct: "Arthropleura",
        w1: "Meganeura",
        w2: "Eurypterus",
        exp: "Arthropleura thrived in an atmosphere with 30 to 35 percent oxygen, making it the largest known terrestrial invertebrate in Earth history."
      },
      {
        q: "What giant Carboniferous griffinfly possessed a wingspan exceeding 70 centimeters, hunting smaller flying insects over coal swamps?",
        correct: "Meganeura monyi",
        w1: "Mazothairos",
        w2: "Titanophasma",
        exp: "Meganeura was a massive predator related to modern dragonflies, whose colossal size was made possible by hyperoxic Carboniferous atmospheric diffusion."
      },
      {
        q: "What iconic marine arthropods with three-lobed mineralized carapaces dominated Paleozoic oceans for 270 million years before going extinct?",
        correct: "Trilobites",
        w1: "Eurypterid Sea Scorpions",
        w2: "Ammonites",
        exp: "Trilobites evolved hard calcite crystal compound eyes and diverse defensive spines, surviving multiple mass extinctions before vanishing in the end-Permian."
      }
    ],
    number: {
      q: "What was the estimated wingspan in centimeters of the giant Carboniferous predatory griffinfly Meganeura monyi?",
      target: 70,
      unit: "cm",
      imperial: "27.5 inches (70 cm)",
      exp: "Meganeura fossils discovered in French coal measures exhibit verified wingspans between 65 and 71 centimeters (over 2.3 feet)."
    }
  },

  // Cycle 8: Feathered Dinosaurs & Avian Transition
  {
    mcqs: [
      {
        q: "What small theropod dinosaur discovered in Liaoning, China in 1996 provided the first definitive direct fossil evidence of filamentous proto-feathers?",
        correct: "Sinosauropteryx prima",
        w1: "Microraptor gui",
        w2: "Caudipteryx zoui",
        exp: "Sinosauropteryx possessed a fringe of dark filamentous proto-feathers along its neck, back, and tail, revealing a striped orange-and-white tail pattern."
      },
      {
        q: "What four-winged dromaeosaurid dinosaur had long asymmetrical flight feathers on both its forelimbs and hind legs, enabling arboreal gliding?",
        correct: "Microraptor gui",
        w1: "Archaeopteryx lithographica",
        w2: "Anchiornis huxleyi",
        exp: "Microraptor possessed iridescent black plumage like a starling, using its dual-wing biplane configuration to glide between Cretaceous trees in Liaoning."
      },
      {
        q: "What oviraptorid dinosaur discovered in Mongolia was preserved directly brooding over its clutch of eggs in a nesting posture identical to modern birds?",
        correct: "Citipati osmolskae",
        w1: "Oviraptor philoceratops",
        w2: "Anzu wyliei",
        exp: "Citipati was found fossilized with its feathered arms spread protective over a circle of eggs in a sandstorm, proving complex avian brooding behaviors."
      },
      {
        q: "What microscopic pigment-bearing organelles preserved inside fossilized dinosaur feathers allow scientists to determine true prehistoric plumage colors?",
        correct: "Melanosomes",
        w1: "Chloroplasts",
        w2: "Ribosomal Granules",
        exp: "Scanning electron microscopy identifies sausage-shaped eumelanosomes (black/gray) and spherical phaeomelanosomes (reddish-brown) in fossil feathers."
      },
      {
        q: "What 9-meter tyrannosauroid dinosaur discovered in China is the largest known animal with direct fossil evidence of extensive feathered plumage?",
        correct: "Yutyrannus huali",
        w1: "Dilong paradoxus",
        w2: "Guanlong wucaii",
        exp: "Yutyrannus weighed over 1,400 kg and was covered in 20-cm shaggy filamentous proto-feathers, providing thermal insulation in cold Cretaceous climates."
      }
    ],
    number: {
      q: "What was the estimated total body length in meters of the giant feathered tyrannosauroid Yutyrannus huali discovered in Liaoning, China?",
      target: 9,
      unit: "meters",
      imperial: "29.5 feet (9.0 m)",
      exp: "Yutyrannus huali measured approximately 9 meters (30 feet) in length and weighed roughly 1.4 metric tons, making it the largest documented feathered animal."
    }
  },

  // Cycle 9: Fossilization Science & Paleontology Discoveries
  {
    mcqs: [
      {
        q: "What subdiscipline of paleontology studies the complete sequence of decay, burial, mineral replacement, and preservation of organismal remains?",
        correct: "Taphonomy",
        w1: "Stratigraphy",
        w2: "Palynology",
        exp: "Taphonomy investigates biostratinomy (events between death and burial) and diagenesis (chemical and physical mineral changes within rock strata)."
      },
      {
        q: "What fossilized tree resin preserves delicate ancient insects, feathers, lizards, and flowers with microscopic three-dimensional fidelity?",
        correct: "Amber",
        w1: "Copal",
        w2: "Lignite",
        exp: "Hardened fossil resin polymerizes under heat and pressure over millions of years, acting as an airtight natural preservative for organic structures."
      },
      {
        q: "What 19th-century scientific rivalry between American paleontologists Othniel Marsh and Edward Cope resulted in the discovery of over 130 dinosaur species?",
        correct: "The Bone Wars",
        w1: "The Great Fossil Feud",
        w2: "The Morrison Expedition",
        exp: "The bitter rivalry between Marsh and Cope introduced iconic dinosaurs like Stegosaurus, Triceratops, Allosaurus, and Apatosaurus to science."
      },
      {
        q: "What scientific term describes fossilized animal dung, which provides direct biochemical evidence of prehistoric animal diets and internal parasites?",
        correct: "Coprolites",
        w1: "Gastroliths",
        w2: "Mold Fossils",
        exp: "Coined by William Buckland in 1829, coprolite analysis reveals bone fragments, fish scales, and plant seeds digested by ancient dinosaurs and reptiles."
      },
      {
        q: "What smooth, polished stones swallowed by herbivorous sauropods and modern birds helped mechanically grind fibrous plant matter inside the muscular gizzard?",
        correct: "Gastroliths",
        w1: "Bezoars",
        w2: "Geodes",
        exp: "Gastroliths found clustered in the ribcages of sauropods and plesiosaurs helped pulverize tough food in the digestive tract without chewing."
      }
    ],
    number: {
      q: "In what year CE did 12-year-old Mary Anning discover the first complete, scientifically recognized Ichthyosaurus skeleton at Lyme Regis?",
      target: 1811,
      unit: "CE",
      imperial: "1811 CE",
      exp: "In 1811, Mary Anning and her brother Joseph discovered the first articulated Ichthyosaurus fossil on England Jurassic Coast, revolutionizing paleontology."
    }
  },

  // Cycle 10: The Chicxulub Impactor & K-Pg Extinction
  {
    mcqs: [
      {
        q: "What colossal 10-kilometer asteroid struck the Yucatan Peninsula 66 million years ago, ending the Mesozoic Era and wiping out non-avian dinosaurs?",
        correct: "Chicxulub Asteroid Impactor",
        w1: "Tunguska Impactor",
        w2: "Vredefort Bolide",
        exp: "The impact released the energy of over 100 million megatons of TNT, carving a 180-kilometer crater and triggering global megatsunamis and nuclear winter."
      },
      {
        q: "What rare platinum-group element, abundant in extraterrestrial asteroids but scarce in Earth crust, forms a global spike at the K-Pg boundary layer?",
        correct: "Iridium",
        w1: "Platinum",
        w2: "Osmium",
        exp: "Walter and Luis Alvarez discovered a global iridium anomaly in 1980, providing the crucial chemical fingerprint proving an extraterrestrial asteroid strike."
      },
      {
        q: "What deformed mineral grains formed exclusively by extreme shockwave pressure are found distributed worldwide at the K-Pg boundary?",
        correct: "Shocked Quartz",
        w1: "Impact Diamonds",
        w2: "Obsidian Tektites",
        exp: "Shocked quartz contains microscopic parallel planar deformation features (PDFs) produced only by high-velocity meteorite impacts or nuclear detonations."
      },
      {
        q: "What sole dinosaurian clade survived the catastrophic Chicxulub asteroid impact and subsequent impact winter, giving rise to all modern birds?",
        correct: "Neornithes Avian Dinosaurs",
        w1: "Enantiornithes Opposite Birds",
        w2: "Pterosauria",
        exp: "Small ground-dwelling beaked neornithine birds capable of eating seeds and burrowing survived the global fires and food chain collapse."
      },
      {
        q: "What massive volcanic flood basalt province in modern India erupted over centuries around the time of the K-Pg boundary, destabilizing global climate?",
        correct: "Deccan Traps",
        w1: "Siberian Traps",
        w2: "Columbia River Basalts",
        exp: "The Deccan Traps released enormous volumes of sulfur dioxide and carbon dioxide, causing severe ocean acidification and climate swings leading up to the impact."
      }
    ],
    number: {
      q: "How many kilometers in diameter was the catastrophic Chicxulub asteroid that struck Earth 66 million years ago?",
      target: 10,
      unit: "km",
      imperial: "6.2 miles (10 km)",
      exp: "Geophysical crater modeling indicates the Chicxulub bolide was approximately 10 to 14 kilometers (6 to 9 miles) in diameter, travelling at 20 km/s."
    }
  }
];

buildQuiz({
  id: 'dinosaurs-prehistoric-life-60',
  theme: 'Dinosaurs, Fossils & Prehistoric Earth',
  title: 'Dinosaurs, Fossils & Prehistoric Earth',
  description: 'A 60-question grand master assessment exploring Mesozoic theropods, colossal sauropods, horned herbivores, marine reptiles, feathered transitions, and the K-Pg extinction.',
  category: 'Nature, Wildlife & Biology',
  difficulty: 'moderate'
}, dinosaurCycles);

// -------------------------------------------------------------
// 9. weather-meteorology-climate-60
// -------------------------------------------------------------
const weatherCycles = [
  // Cycle 1: Atmospheric Layers & Pressure Systems
  {
    mcqs: [
      {
        q: "What lowest atmospheric layer contains approximately 75 percent of total atmospheric mass and almost all clouds and active weather phenomena?",
        correct: "Troposphere",
        w1: "Stratosphere",
        w2: "Mesosphere",
        exp: "The troposphere extends from sea level up to roughly 8 km at the poles and 18 km at the equator, heated primarily from Earth surface below."
      },
      {
        q: "What boundary layer marks the sharp thermal inversion ceiling between the turbulent troposphere and the calm, ozone-rich stratosphere?",
        correct: "Tropopause",
        w1: "Stratopause",
        w2: "Mesopause",
        exp: "At the tropopause, temperature stops dropping with altitude and begins warming, creating a stable ceiling that caps tall thunderstorm updrafts into flat anvil tops."
      },
      {
        q: "What apparent rotational force caused by Earth eastward axial spin deflects moving air masses to the right in the Northern Hemisphere?",
        correct: "Coriolis Effect",
        w1: "Centrifugal Force",
        w2: "Geostrophic Shear",
        exp: "The Coriolis effect creates counter-clockwise cyclonic wind rotation in the Northern Hemisphere and clockwise rotation in the Southern Hemisphere."
      },
      {
        q: "What classical meteorological instrument invented by Evangelista Torricelli in 1643 measures atmospheric air pressure using a column of mercury?",
        correct: "Barometer",
        w1: "Anemometer",
        w2: "Hygrometer",
        exp: "Torricelli inverted a mercury-filled glass tube in a basin; atmospheric weight balanced the column height, creating the world first vacuum and barometer."
      },
      {
        q: "What international standard meteorological unit of atmospheric pressure is equal to 100 Pascals?",
        correct: "Hectopascal hPa",
        w1: "Torr",
        w2: "Atmospheric PSI",
        exp: "One hectopascal (hPa) equals exactly one millibar (mbar), serving as the standard scientific unit for surface and upper-air isobar mapping."
      }
    ],
    number: {
      q: "What is the standard average mean sea-level atmospheric pressure in hectopascals hPa / millibars?",
      target: 1013.25,
      unit: "hPa",
      imperial: "1,013.25 hPa (29.92 inHg)",
      exp: "Standard international sea-level atmospheric pressure is defined as exactly 1,013.25 hPa (101.325 kPa or 29.92 inches of mercury)."
    }
  },

  // Cycle 2: Tropical Cyclones, Typhoons & Hurricanes
  {
    mcqs: [
      {
        q: "What calm, circular low-pressure region with light winds and descending air resides at the exact geometric center of a mature tropical cyclone?",
        correct: "Eye",
        w1: "Eyewall",
        w2: "Rainband",
        exp: "The hurricane eye is formed by dry air gently subsiding from the upper troposphere, creating a cloud-free circular core typically 30 to 65 km wide."
      },
      {
        q: "What ring of towering cumulonimbus clouds surrounding the hurricane eye contains the most violent winds and heaviest torrential rainfall?",
        correct: "Eyewall",
        w1: "Central Dense Overcast",
        w2: "Outer Spiral Band",
        exp: "The eyewall exhibits the most intense pressure gradient and updrafts, generating the peak sustained surface winds of the tropical cyclone."
      },
      {
        q: "What meteorological rating scale classifies tropical cyclones into five categories based strictly on sustained 1-minute surface wind speeds?",
        correct: "Saffir-Simpson Hurricane Wind Scale",
        w1: "Enhanced Fujita Scale",
        w2: "Beaufort Wind Scale",
        exp: "Developed by Herbert Saffir and Robert Simpson in 1971, Category 1 begins at 119 km/h (74 mph) and Category 5 begins at 252 km/h (157 mph)."
      },
      {
        q: "What dangerous coastal hazard occurs when intense hurricane winds and low barometric pressure push a colossal dome of ocean water ashore?",
        correct: "Storm Surge",
        w1: "Tsunami",
        w2: "Seiche",
        exp: "Storm surge is historically responsible for the majority of hurricane-related fatalities, inundating coastlines under meters of seawater."
      },
      {
        q: "What minimum ocean sea-surface temperature in degrees Celsius is typically required to supply thermal energy to sustain tropical cyclone formation?",
        correct: "26.5 degrees Celsius",
        w1: "20.0 degrees Celsius",
        w2: "32.0 degrees Celsius",
        exp: "Warm tropical ocean water of at least 26.5 °C (80 °F) down to a depth of 50 meters provides the latent heat of evaporation that powers the storm."
      }
    ],
    number: {
      q: "What is the lowest sea-level atmospheric barometric pressure in hectopascals hPa ever recorded on Earth, measured inside Super Typhoon Tip in 1979?",
      target: 870,
      unit: "hPa",
      imperial: "870 hPa (25.69 inHg)",
      exp: "On October 12, 1979 in the western Pacific, reconnaissance aircraft recorded a world-record low barometric pressure of 870 hPa in Typhoon Tip."
    }
  },

  // Cycle 3: Tornadoes & Severe Supercells
  {
    mcqs: [
      {
        q: "What severe thunderstorm category containing a persistent, deeply rotating updraft called a mesocyclone generates the most destructive tornadoes?",
        correct: "Supercell",
        w1: "Squall Line",
        w2: "Multicell Cluster",
        exp: "Supercells possess tilted, rotating updrafts driven by vertical wind shear, producing giant hail, damaging straight-line winds, and violent tornadoes."
      },
      {
        q: "What distinctive radar reflectivity signature resembling a curved spiral appendage indicates strong mesocyclonic rotation and potential tornado formation?",
        correct: "Hook Echo",
        w1: "Bow Echo",
        w2: "Debris Ball",
        exp: "A hook echo forms as the storm rear-flank downdraft wraps precipitation around the rotating updraft, creating a classic hook shape on radar."
      },
      {
        q: "What rating scale updated in 2007 rates tornado intensity from EF0 to EF5 based on observed structural damage indicators and estimated wind speeds?",
        correct: "Enhanced Fujita Scale",
        w1: "TORRO Scale",
        w2: "Saffir-Simpson Scale",
        exp: "The EF Scale uses 28 damage indicators with degrees of damage to calibrate wind estimates, where EF5 represents wind speeds exceeding 322 km/h (200 mph)."
      },
      {
        q: "What geographic region across the central Great Plains of the United States experiences the highest global frequency of violent EF4 and EF5 tornadoes?",
        correct: "Tornado Alley",
        w1: "Great Basin Trough",
        w2: "Sonoran Corridor",
        exp: "Tornado Alley collides warm moist Gulf of Mexico air, dry Mexican plateau air, and cold Canadian air beneath a strong upper-level jet stream."
      },
      {
        q: "What sharp boundary line separating moist maritime tropical air from dry continental desert air frequently triggers Great Plains severe supercells?",
        correct: "Dryline",
        w1: "Warm Front",
        w2: "Cold Occlusion",
        exp: "Dry air is denser than moist air at the same temperature, forcing moist Gulf air rapidly upward along the advancing dryline to ignite severe storms."
      }
    ],
    number: {
      q: "What is the highest mobile Doppler radar wind speed in km/h ever recorded near ground level, measured during the 1999 Bridge Creek-Moore tornado?",
      target: 486,
      unit: "km/h",
      imperial: "302 mph (486 km/h)",
      exp: "The University of Oklahoma mobile Doppler on Wheels recorded peak wind gusts of 486 +/- 32 km/h (302 mph) roughly 32 meters above the ground."
    }
  },

  // Cycle 4: Thunderstorm Electrification & Lightning
  {
    mcqs: [
      {
        q: "What zigzagging, faintly luminous channel of ionized air descends in discrete 50-meter jumps from a storm cloud toward the ground before a flash?",
        correct: "Stepped Leader",
        w1: "Return Stroke",
        w2: "Dart Leader",
        exp: "The stepped leader ionizes a plasma path toward Earth in microsecond pulses, meeting positive upward streamers rising from trees or structures."
      },
      {
        q: "What luminous, high-current electrical surge flows upward from ground to cloud along the ionized channel, producing the blinding lightning flash?",
        correct: "Return Stroke",
        w1: "Pilot Leader",
        w2: "Corona Streamer",
        exp: "The return stroke carries tens of thousands of amperes of electrical current in microseconds, heating the plasma channel to over 30,000 Kelvin."
      },
      {
        q: "What physical process generates the booming acoustic shockwave of thunder following a lightning discharge?",
        correct: "Instantaneous thermal expansion of superheated air ionizing at 30,000 Kelvin",
        w1: "Direct mechanical collision of charged clouds",
        w2: "Sonic boom generated by falling hailstones",
        exp: "Lightning heats air channels to five times the Sun surface temperature in microseconds; the explosive thermal expansion creates a supersonic shockwave that decays into thunder."
      },
      {
        q: "What rare, mysterious luminous spherical electrical phenomenon floats horizontally near ground level during storms before silently vanishing or popping?",
        correct: "Ball Lightning",
        w1: "St. Elmo Fire",
        w2: "Corona Discharge",
        exp: "Ball lightning appears as glowing spheres 10 to 40 cm wide lasting several seconds, hypothesized to involve vaporized silica nanoparticles or trapped plasma."
      },
      {
        q: "What high-altitude transient luminous events flash reddish light above thunderstorm tops into the mesosphere up to 90 km altitude?",
        correct: "Red Sprites",
        w1: "Blue Jets",
        w2: "Elves Rings",
        exp: "Red sprites are electrical breakdown discharges triggered in the upper atmosphere by powerful positive cloud-to-ground lightning strikes below."
      }
    ],
    number: {
      q: "To what extreme peak temperature in degrees Celsius does the core plasma channel of a lightning strike heat surrounding air?",
      target: 30000,
      unit: "celsius",
      imperial: "30,000 °C (53,500 °F)",
      exp: "A lightning channel heats surrounding air to approximately 30,000 °C (53,500 °F), more than five times hotter than the surface of the Sun (5,500 °C)."
    }
  },

  // Cycle 5: Global Wind Belts & Jet Streams
  {
    mcqs: [
      {
        q: "What primary tropical atmospheric circulation cell lifts warm air at the equator and descends dry air around 30 degrees latitude?",
        correct: "Hadley Cell",
        w1: "Ferrel Cell",
        w2: "Polar Cell",
        exp: "Driven by intense equatorial solar heating, air rises along the ITCZ, flows poleward aloft, and sinks at 30° latitude to create major global desert belts."
      },
      {
        q: "What narrow meandering corridors of high-altitude fast-flowing westerly winds blow near the tropopause between 9 and 14 km altitude?",
        correct: "Jet Streams",
        w1: "Trade Winds",
        w2: "Easterly Waves",
        exp: "The Polar and Subtropical Jet Streams are driven by sharp horizontal temperature gradients between warm tropical air and cold polar air masses."
      },
      {
        q: "What equatorial belt of low atmospheric pressure where Northeast and Southeast trade winds converge is historically known by sailors as the Doldrums?",
        correct: "Intertropical Convergence Zone ITCZ",
        w1: "Horse Latitudes",
        w2: "Subtropical Ridge",
        exp: "The ITCZ features calm surface winds and intense convective thunderstorms, stranding sailing ships for weeks in maritime history."
      },
      {
        q: "What dry, calm subtropical high-pressure belts located near 30 degrees north and south latitude are historically called the Horse Latitudes?",
        correct: "Subtropical Ridges",
        w1: "Roaring Forties",
        w2: "Polar Highs",
        exp: "Subtropical ridges feature steady descending air that creates cloudless skies, high evaporation rates, and world deserts like the Sahara and Arabian deserts."
      },
      {
        q: "What warm, dry downslope wind on the eastern leeward slopes of the Rocky Mountains can raise winter air temperatures by 20 °C in a few hours?",
        correct: "Chinook Wind",
        w1: "Sirocco Wind",
        w2: "Bora Wind",
        exp: "Chinook winds warm adiabatically as they descend the mountain slope at dry adiabatic lapse rates, melting snowpack rapidly (the snow eater)."
      }
    ],
    number: {
      q: "What is the highest non-tornadic surface wind gust in km/h ever recorded on Earth, measured during Tropical Cyclone Olivia on Barrow Island in 1996?",
      target: 408,
      unit: "km/h",
      imperial: "253 mph (408 km/h)",
      exp: "On April 10, 1996, an anemometer on Barrow Island, Western Australia recorded a world-record wind gust of 408 km/h (253 mph) during Cyclone Olivia."
    }
  },

  // Cycle 6: Cloud Formations & Precipitation Records
  {
    mcqs: [
      {
        q: "What towering, anvil-topped convective clouds with powerful vertical updrafts produce torrential rain, hail, and severe lightning?",
        correct: "Cumulonimbus",
        w1: "Nimbostratus",
        w2: "Altocumulus",
        exp: "Cumulonimbus clouds can surge over 18 km high into the lower stratosphere, converting latent heat into violent updrafts exceeding 150 km/h."
      },
      {
        q: "What smooth, downward-hanging pouch-like cloud lobes often form on the underside of a cumulonimbus anvil during severe thunderstorms?",
        correct: "Mammatus Clouds",
        w1: "Lenticular Clouds",
        w2: "Asperitas Waves",
        exp: "Mammatus clouds are formed by pockets of cool, moisture-laden air sinking into drier surrounding air beneath the spreading anvil cloud."
      },
      {
        q: "What smooth, disc-shaped stationary clouds form over mountain peaks when moist air flows in standing waves across rugged topography?",
        correct: "Lenticular Clouds",
        w1: "Cirrocumulus",
        w2: "Stratocumulus",
        exp: "Altocumulus lenticularis form at crests of mountain atmospheric waves, condensing moisture as air ascends and evaporating as air descends."
      },
      {
        q: "What seasonal prevailing wind reversal brings colossal torrential monsoon rains to the Indian subcontinent from the Indian Ocean every summer?",
        correct: "Southwest Monsoon",
        w1: "Northeast Trade",
        w2: "Siberian Inversion",
        exp: "Intense solar heating of the Tibetan Plateau creates a deep thermal low that pulls moist oceanic air northward across India from June through September."
      },
      {
        q: "What concentric-layered ice pellets form when thunderstorm updrafts repeatedly cycle freezing water droplets through supercooled cloud zones?",
        correct: "Hailstones",
        w1: "Graupel",
        w2: "Sleet",
        exp: "Hailstones grow in alternating clear and milky ice layers as they collect supercooled liquid water drops in violent storm updrafts."
      }
    ],
    number: {
      q: "What was the verified weight in kilograms of the heaviest single hailstone ever recorded on Earth, which fell in Gopalganj, Bangladesh in 1986?",
      target: 1.02,
      unit: "kg",
      imperial: "2.25 lbs (1.02 kg)",
      exp: "On April 14, 1986, a catastrophic hailstorm in the Gopalganj district of Bangladesh produced verified hailstones weighing 1.02 kg (2.25 lbs)."
    }
  },

  // Cycle 7: Climate Oscillations & Ocean Currents
  {
    mcqs: [
      {
        q: "What periodic climatic phenomenon involves the abnormal warming of equatorial Pacific sea-surface temperatures, disrupting global rainfall patterns?",
        correct: "El Nino Southern Oscillation ENSO",
        w1: "North Atlantic Oscillation",
        w2: "Pacific Decadal Oscillation",
        exp: "During El Nino, trade winds weaken, allowing warm western Pacific pool waters to surge eastward toward South America, shifting global jet streams."
      },
      {
        q: "What cool counterpart phase of ENSO is characterized by unusually cold sea-surface temperatures and intensified trade winds in the equatorial Pacific?",
        correct: "La Nina",
        w1: "Indian Ocean Dipole",
        w2: "Madden-Julian Oscillation",
        exp: "La Nina enhances upwelling of cold nutrient-rich deep water off South America and increases hurricane activity in the Atlantic basin."
      },
      {
        q: "What colossal global ocean conveyor belt driven by temperature and salinity density gradients circulates heat across planet oceans?",
        correct: "Thermohaline Circulation",
        w1: "Ekman Spiral",
        w2: "Humboldt Upwelling",
        exp: "Dense cold saline water sinks in the North Atlantic and Antarctic, driving a worldwide deep-water circulation cycle taking roughly 1,000 years to complete."
      },
      {
        q: "What powerful warm western boundary ocean current transports tropical heat from Florida up the eastern US coast toward Western Europe?",
        correct: "Gulf Stream",
        w1: "Labrador Current",
        w2: "Canary Current",
        exp: "The Gulf Stream flows at roughly 2 meters per second, transporting over 30 million cubic meters of warm water per second to moderate European climates."
      },
      {
        q: "What climate index tracks pressure differences between the Azores High and Icelandic Low, governing winter storm tracks across Europe?",
        correct: "North Atlantic Oscillation NAO",
        w1: "Arctic Dipole",
        w2: "Southern Annular Mode",
        exp: "A positive NAO phase features strong pressure differences that steer wet, mild winter storms across Northern Europe while drying the Mediterranean."
      }
    ],
    number: {
      q: "Every how many years on average does an El Nino Southern Oscillation ENSO climate event typically recur in the Pacific?",
      target: 4,
      unit: "years",
      imperial: "2 to 7 years (average 4 years)",
      exp: "ENSO cycles operate irregularly, typically recurring every 2 to 7 years with an historical average cycle period of approximately 4 years."
    }
  },

  // Cycle 8: Planetary Weather Extremes & Deserts
  {
    mcqs: [
      {
        q: "What location in Death Valley, California holds the world record for the highest officially verified natural air temperature at 56.7 degrees Celsius?",
        correct: "Furnace Creek",
        w1: "Badwater Basin",
        w2: "Stovepipe Wells",
        exp: "On July 10, 1913, the Greenland Ranch weather station at Furnace Creek recorded an ambient air temperature of 56.7 °C (134.0 °F)."
      },
      {
        q: "What Antarctic research station recorded the lowest natural air temperature directly measured on Earth surface at minus 89.2 °C in 1983?",
        correct: "Vostok Station",
        w1: "Amundsen-Scott South Pole",
        w2: "Concordia Station",
        exp: "Located high on the East Antarctic ice sheet at 3,488 meters altitude, Russian station Vostok recorded -89.2 °C (-128.6 °F) on July 21, 1983."
      },
      {
        q: "What town in Meghalaya, India is recognized as the wettest inhabited place on Earth, averaging over 11,800 millimeters of rainfall annually?",
        correct: "Mawsynram",
        w1: "Cherrapunji",
        w2: "Tutunendo",
        exp: "Mawsynram sits atop the Khasi Hills, where moisture-laden southwest monsoon winds from the Bay of Bengal are forced upward to cause extreme orographic rain."
      },
      {
        q: "What massive wall of wind-blown dust and sand is kicked up by the downdraft outflow boundary of a desert thunderstorm?",
        correct: "Haboob",
        w1: "Simoom",
        w2: "Sirocco",
        exp: "Haboobs can rise over 1,500 meters high and span 100 kilometers wide, sweeping across the Sahara, Arabian Peninsula, and American Southwest."
      },
      {
        q: "What dense, gravity-driven cold winds rush down off the icy plateaus of Greenland and Antarctica at sustained hurricane speeds?",
        correct: "Katabatic Winds",
        w1: "Anabatic Winds",
        w2: "Zephyr Winds",
        exp: "Radiative cooling over high polar ice sheets creates hyper-dense surface air that cascades down coastal glaciers at speeds exceeding 250 km/h."
      }
    ],
    number: {
      q: "What is the highest officially verified natural air temperature in degrees Celsius recorded on Earth, measured at Furnace Creek in 1913?",
      target: 56.7,
      unit: "celsius",
      imperial: "134.0 °F (56.7 °C)",
      exp: "The World Meteorological Organization recognizes 56.7 °C (134.0 °F) measured at Furnace Creek, Death Valley as the highest ambient surface air temperature."
    }
  },

  // Cycle 9: Meteorological Instrumentation & Radar
  {
    mcqs: [
      {
        q: "What expendable instrument package suspended beneath a latex helium balloon transmits vertical temperature, pressure, and humidity profiles from the stratosphere?",
        correct: "Radiosonde",
        w1: "Dropsonde",
        w2: "Pyranometer",
        exp: "Meteorological agencies worldwide launch approximately 1,300 radiosondes twice daily at 00:00 and 12:00 UTC to feed computer forecasting models."
      },
      {
        q: "What specialized radar technology detects both precipitation intensity and the radial velocity of raindrops moving toward or away from the antenna?",
        correct: "Doppler Weather Radar",
        w1: "Lidar Profiler",
        w2: "Sodar Sounder",
        exp: "By measuring frequency shifts in backscattered microwave pulses, Doppler radar detects tornadic rotation, wind shear, and microbursts."
      },
      {
        q: "What meteorological instrument measures the relative humidity and water vapor moisture content of ambient atmospheric air?",
        correct: "Hygrometer",
        w1: "Anemometer",
        w2: "Pyranometer",
        exp: "Hygrometers utilize capacitance sensors, chilled mirror dew-point systems, or psychrometer dry-and-wet bulb evaporative cooling differential."
      },
      {
        q: "What scientific instrument measures broadband solar irradiance flux per unit area received from the hemispherical sky?",
        correct: "Pyranometer",
        w1: "Actinometer",
        w2: "Barograph",
        exp: "Pyranometers use thermopile sensors beneath optical glass domes to measure solar radiation in Watts per square meter for meteorology and solar power."
      },
      {
        q: "What mathematical forecasting paradigm discovered by meteorologist Edward Lorenz in 1963 revealed that small atmospheric perturbations produce chaotic divergence?",
        correct: "Chaos Theory and the Butterfly Effect",
        w1: "Linear Determinism",
        w2: "Static Equilibrium",
        exp: "Lorenz computerized convection equations showed that non-linear sensitivity to initial conditions limits precise deterministic weather prediction to about two weeks."
      }
    ],
    number: {
      q: "How many kilometers high into the stratosphere does a standard meteorological weather balloon typically ascend before bursting?",
      target: 35,
      unit: "km",
      imperial: "115,000 feet (35 km)",
      exp: "Latex weather balloons expand as atmospheric pressure drops, reaching altitudes of roughly 30 to 35 kilometers (over 100,000 feet) before popping."
    }
  },

  // Cycle 10: Atmospheric Optics & Optical Mirages
  {
    mcqs: [
      {
        q: "What atmospheric optical halo phenomenon produces bright, colorful spots of light on either side of the Sun, caused by hexagonal ice crystals in cirrus clouds?",
        correct: "Sundogs Parhelia",
        w1: "Sun Pillars",
        w2: "Solar Glories",
        exp: "Plate-shaped hexagonal ice crystals floating flat in cirrus clouds refract sunlight at a 22-degree angle, creating twin parhelia flanking the sun."
      },
      {
        q: "What complex superior mirage significantly distorts distant horizon objects like islands and ships into towering floating castles and cliffs?",
        correct: "Fata Morgana",
        w1: "Inferior Mirage",
        w2: "Brocken Spectre",
        exp: "Fata Morgana mirages require strong thermal inversions with alternating warm and cold air ducts that act like atmospheric refracting lenses."
      },
      {
        q: "What brief optical phenomenon flashes vibrant emerald light on the upper rim of the setting Sun for one or two seconds right as it dips below a clear horizon?",
        correct: "Green Flash",
        w1: "Alpenglow",
        w2: "Zodiacal Light",
        exp: "Atmospheric refraction bends blue and green light more than red light; when the red disc sets first and blue light scatters, green light is briefly visible."
      },
      {
        q: "What concentric rainbow-like colored rings centered on an observer shadow cast against mist or cloud are caused by wave diffraction of light?",
        correct: "Glory",
        w1: "Brocken Spectre",
        w2: "Corona Ring",
        exp: "Glories are formed by backward wave diffraction and wave tunneling inside microscopic cloud droplets, frequently seen from airplanes or high mountain ridges."
      },
      {
        q: "What luminous vertical columns of light beam upward from ground lights or setting suns on freezing winter nights, reflected by flat ice crystals?",
        correct: "Light Pillars",
        w1: "Crepuscular Rays",
        w2: "Antisolar Beams",
        exp: "Light pillars occur when hexagonal plate ice crystals drift horizontally near the ground, acting like millions of microscopic mirrors reflecting vertical light."
      }
    ],
    number: {
      q: "What is the angle in degrees from the antisolar point at which the primary circular atmospheric rainbow arc forms in raindrops?",
      target: 42,
      unit: "degrees",
      imperial: "42° primary rainbow angle",
      exp: "Internal reflection and two refractions within spherical raindrops concentrate exiting visible light at an angle of approximately 42 degrees from the antisolar point."
    }
  }
];

buildQuiz({
  id: 'weather-meteorology-climate-60',
  theme: 'Meteorology: Extreme Weather, Superstorms & Atmospheres',
  title: 'Meteorology: Extreme Weather, Superstorms & Atmospheres',
  description: 'A 60-question grand master assessment exploring atmospheric layers, supercell tornadoes, hurricane eyewalls, lightning physics, jet streams, and extreme planetary records.',
  category: 'Nature, Wildlife & Biology',
  difficulty: 'moderate'
}, weatherCycles);

console.log('Finished generating Quizzes 7, 8, 9!');
