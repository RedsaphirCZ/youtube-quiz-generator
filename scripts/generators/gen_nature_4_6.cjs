const { buildQuiz } = require('./generate_helpers.cjs');

// -------------------------------------------------------------
// 4. insects-arachnids-micro-monsters-60
// -------------------------------------------------------------
const insectCycles = [
  // Cycle 1: Insect Anatomy & Metamorphosis
  {
    mcqs: [
      {
        q: "What tough, nitrogenous polysaccharide forms the primary structural matrix of arthropod exoskeletons?",
        correct: "Chitin",
        w1: "Keratin",
        w2: "Cellulose",
        exp: "Chitin is a long-chain polymer of N-acetylglucosamine that combines with sclerotin proteins to form a rigid, protective cuticle."
      },
      {
        q: "Through what microscopic lateral body valves do insects breathe atmospheric air directly into internal tracheal tubes?",
        correct: "Spiracles",
        w1: "Ostia",
        w2: "Malpighian pores",
        exp: "Spiracles are muscularly gated pores along the insect thorax and abdomen that control gas exchange while minimizing water loss."
      },
      {
        q: "What developmental process describes complete four-stage metamorphosis encompassing egg, larva, pupa, and winged adult?",
        correct: "Holometabolism",
        w1: "Hemimetabolism",
        w2: "Ametabolism",
        exp: "Holometabolous insects, such as beetles, butterflies, flies, and wasps, undergo complete structural reorganization inside a pupal cocoon."
      },
      {
        q: "What fluid serves as the blood analog in insects, transporting nutrients and hormones through an open circulatory system?",
        correct: "Hemolymph",
        w1: "Myoglobin",
        w2: "Hemocyanin",
        exp: "Hemolymph bathes internal organs directly in a hemocoel cavity, pumped forward by a dorsal vessel heart without closed capillaries."
      },
      {
        q: "What excretory organs in insects extract nitrogenous waste from hemolymph and empty uric acid directly into the hindgut?",
        correct: "Malpighian Tubules",
        w1: "Nephridia",
        w2: "Flame cells",
        exp: "Malpighian tubules absorb uric acid and salts from body fluids, recycling water to produce dry waste pellets that conserve moisture."
      }
    ],
    number: {
      q: "How many jointed walking legs do all adult insects possess across their three thoracic body segments?",
      target: 6,
      unit: "legs",
      imperial: "6 jointed legs",
      exp: "All hexapods (insects) are defined by having exactly six jointed legs attached in pairs to the prothorax, mesothorax, and metathorax."
    }
  },

  // Cycle 2: Arachnid Biology & Silk Engineering
  {
    mcqs: [
      {
        q: "How many distinct body tagmata do spiders and scorpions possess, namely the cephalothorax and abdomen?",
        correct: "Two",
        w1: "Three",
        w2: "Four",
        exp: "Arachnids have two body segments: the prosoma (cephalothorax) housing legs and mouthparts, and the opisthosoma (abdomen)."
      },
      {
        q: "What pair of fang-bearing appendages do spiders use to deliver venom and grasp prey?",
        correct: "Chelicerae",
        w1: "Pedipalps",
        w2: "Maxillae",
        exp: "Chelicerae consist of a basal segment and a sharp articulating fang containing a venom duct pore at its tip."
      },
      {
        q: "What respiratory organs composed of stacked, vascularized tissue plates inside an abdominal cavity are used by most spiders?",
        correct: "Book Lungs",
        w1: "Tracheal spiracles",
        w2: "Ctenidia",
        exp: "Book lungs contain dozens of thin leaf-like lamellae bathed in hemolymph that exchange gases directly with air entering via spiracles."
      },
      {
        q: "Pound for pound, spider major ampullate dragline silk possesses higher tensile strength than what structural material?",
        correct: "High-grade Steel",
        w1: "Aluminum",
        w2: "Copper alloy",
        exp: "Spider dragline silk has a tensile strength of roughly 1.3 to 1.6 GPa, exceeding high-tensile structural steel while remaining five times more elastic."
      },
      {
        q: "What specialized abdominal appendages extrude liquid protein solution that polymerizes into strong spider silk strands?",
        correct: "Spinnerets",
        w1: "Coxal glands",
        w2: "Stridulatory organs",
        exp: "Spinnerets contain hundreds of microscopic spigots connected to specialized silk glands that shear liquid fibroin into solid protein fibrils."
      }
    ],
    number: {
      q: "How many eyes do the vast majority of spider species possess arranged in patterns across the front of the carapace?",
      target: 8,
      unit: "eyes",
      imperial: "8 eyes",
      exp: "Most spiders possess eight simple eyes (ocelli), typically arranged in two rows of four to provide wide-angle peripheral vision."
    }
  },

  // Cycle 3: Superorganism Societies (Ants & Termites)
  {
    mcqs: [
      {
        q: "In an ant colony, what biological term describes non-reproductive female workers performing specialized labor tasks?",
        correct: "Castes",
        w1: "Drones",
        w2: "Gynes",
        exp: "Ant colonies exhibit division of labor across morphological castes, including minor foragers, brood nurses, and large-headed major soldiers."
      },
      {
        q: "What chemical communication molecules do worker ants deposit on the ground to mark foraging trails for their nestmates?",
        correct: "Pheromones",
        w1: "Alkaloids",
        w2: "Kairomones",
        exp: "Trail pheromones secreted from venom glands or abdominal Dufour glands guide nestmates along the most efficient path to food sources."
      },
      {
        q: "What aggressive nomadic ant genus does not construct permanent nests, marching across tropical forest floors in massive predatory swarm raids?",
        correct: "Army Ants",
        w1: "Carpenter Ants",
        w2: "Harvester Ants",
        exp: "Eciton army ant colonies form living bivouac nests from their own interlocking bodies, consuming thousands of invertebrates daily during raids."
      },
      {
        q: "What taxonomic insect order do termites belong to, sharing close evolutionary ancestry with wood-eating cockroaches?",
        correct: "Blattodea",
        w1: "Hymenoptera",
        w2: "Hemiptera",
        exp: "Molecular phylogenetics placed termites within the cockroach order Blattodea, evolving sociality through shared gut wood-digesting microbes."
      },
      {
        q: "What specialized soldier caste in nasute termites features an elongated snout that squirts sticky defensive terpenes at attacking ants?",
        correct: "Nasute Soldiers",
        w1: "Phragmotic defenders",
        w2: "Major workers",
        exp: "Nasute termite soldiers have nozzle-like head projections capable of shooting irritating chemical glue up to several centimeters."
      }
    ],
    number: {
      q: "How many eggs per day can a mature African driver ant queen Dorylus lay during her peak reproductive egg-laying phase?",
      target: 40000,
      unit: "eggs/day",
      imperial: "40,000 eggs per day",
      exp: "Physogastric driver ant queens can lay up to 40,000 eggs per day, producing millions of eggs across a single monthly breeding cycle."
    }
  },

  // Cycle 4: Venomous Micro-Weapons & Chemical Warfare
  {
    mcqs: [
      {
        q: "What beetle defends itself by mixing hydroquinones and hydrogen peroxide inside an abdominal chamber to fire boiling chemical pulses at 100 degrees Celsius?",
        correct: "Bombardier Beetle",
        w1: "Blister Beetle",
        w2: "Tiger Beetle",
        exp: "Brachininae beetles trigger an explosive exothermic reaction with catalase and peroxidase enzymes, firing pulsed jets at 500 pulses per second."
      },
      {
        q: "What Central American ant delivers the most painful sting on the Schmidt Sting Pain Index, described as like walking over flaming charcoal with a rusty nail?",
        correct: "Bullet Ant Paraponera clavata",
        w1: "Red Harvester Ant",
        w2: "Velvet Ant",
        exp: "Poneratoxin, a neurotoxic peptide in bullet ant venom, causes excruciating waves of burning pain and muscular contractions lasting up to 24 hours."
      },
      {
        q: "What Australian spider burrows under rocks and logs in New South Wales and possesses atracotoxin venom capable of fatal human envenomation?",
        correct: "Sydney Funnel-Web Spider",
        w1: "Redback Spider",
        w2: "Huntsman Spider",
        exp: "Atrax robustus produces delta-atracotoxins that overstimulate sodium channels, causing profound autonomic storm and respiratory collapse in primates."
      },
      {
        q: "What hairy caterpillar native to North America hides venomous spines among its dense fur, delivering excruciating burning pain upon contact?",
        correct: "Puss Caterpillar",
        w1: "Saddleback Caterpillar",
        w2: "Io Moth Caterpillar",
        exp: "Megalopyge opercularis larvae resemble tufts of cotton or Persian kittens but conceal venomous hollow spines that inject hemolytic toxins."
      },
      {
        q: "What family of brightly colored wingless parasitic wasps is colloquially nicknamed cow killers due to their intensely painful defensive stings?",
        correct: "Mutillidae Velvet Ants",
        w1: "Pompilidae",
        w2: "Sphecidae",
        exp: "Velvet ants are female wasps with tough exoskeletons that can withstand immense crushing force while administering an agonising sting."
      }
    ],
    number: {
      q: "What is the maximum rating score achieved by the Bullet Ant Paraponera clavata on the Schmidt Sting Pain Index?",
      target: 4,
      unit: "rating",
      imperial: "4.0 on Schmidt Index",
      exp: "Justin Schmidt established the index from 1.0 to 4.0, with the bullet ant and warrior wasp occupying the absolute maximum 4.0 pain tier."
    }
  },

  // Cycle 5: Extreme Micro-Predators
  {
    mcqs: [
      {
        q: "What predatory insect can swivel its triangular head 180 degrees and uses folded, spiny raptorial forelegs to snatch live prey?",
        correct: "Praying Mantis",
        w1: "Robber Fly",
        w2: "Neuropteran",
        exp: "Mantises possess stereo vision with compound eyes containing a mobile pseudopupil and strike in less than 50 milliseconds to impale prey."
      },
      {
        q: "What insect order features compound eyes containing up to 30,000 ommatidia and holds the highest hunting success rate of any aerial predator at roughly 95%?",
        correct: "Odonata Dragonflies",
        w1: "Diptera Flies",
        w2: "Lepidoptera",
        exp: "Dragonflies calculate prey trajectory and interception angles in mid-air, successfully catching target insects in roughly 95 percent of attempted attacks."
      },
      {
        q: "What larval neuropteran insect excavates conical pitfall traps in dry sand to trap ants, flicking sand grains to cause avalanches?",
        correct: "Antlion",
        w1: "Dobsonfly larva",
        w2: "Tiger beetle larva",
        exp: "Myrmeleontidae larvae sit buried at the bottom of steep sandy pits, seizing slipping insects with large, sickle-shaped hollow jaws."
      },
      {
        q: "What large aquatic true bug uses a needle-like piercing rostrum to inject digestive saliva into small fish, tadpoles, and frogs?",
        correct: "Giant Water Bug",
        w1: "Water Strider",
        w2: "Water Scorpion",
        exp: "Belostomatidae grasp prey with hook-like front legs and inject enzymes that liquefy internal organs before sucking out the digested fluids."
      },
      {
        q: "What predatory beetle runs so fast that its eyes cannot process photons quickly enough, forcing it to stop periodically to re-locate prey?",
        correct: "Tiger Beetle",
        w1: "Click Beetle",
        w2: "Rove Beetle",
        exp: "Cicindelinae can sprint at 2.5 meters per second (over 120 body lengths per second), temporarily blinding itself during high-speed dashes."
      }
    ],
    number: {
      q: "What is the hunting capture success percentage of a dragonfly in flight, the highest recorded in the entire animal kingdom?",
      target: 95,
      unit: "percent",
      imperial: "95% catch success rate",
      exp: "Harvard flight studies demonstrated that dragonflies capture up to 95 percent of targeted prey through predictive optical interception."
    }
  },

  // Cycle 6: Pollinators & Honeybee Intelligence
  {
    mcqs: [
      {
        q: "What figure-eight dance do honeybee scout foragers perform inside the dark hive to communicate the exact direction and distance of rich flowers?",
        correct: "Waggle Dance",
        w1: "Round Dance",
        w2: "Tremble Dance",
        exp: "Discovered by Karl von Frisch, the waggle angle relative to gravity indicates solar compass direction while duration indicates flight distance."
      },
      {
        q: "What pollen-carrying structures located on the hind tibia of worker honeybees and bumblebees are used to transport pollen pellets?",
        correct: "Corbiculae Pollen Baskets",
        w1: "Arolia",
        w2: "Empodia",
        exp: "The corbicula is a smooth, concave depression on the outer surface of the hind tibia bordered by stiff hairs that secure packed pollen."
      },
      {
        q: "What mutualistic coevolutionary partnership occurs between tiny wasps and tropical trees where wasps pollinate inverted flowers inside a syconium?",
        correct: "Fig Wasps and Figs",
        w1: "Yucca Moths and Yuccas",
        w2: "Orchid Bees and Orchids",
        exp: "Agaonidae wasps crawl inside hollow fig syconia to lay eggs, pollinating internal female flowers in an obligate partnership millions of years old."
      },
      {
        q: "What solitary bee genus nests in pre-existing hollow reeds and mud cells, serving as exceptionally efficient spring orchard pollinators?",
        correct: "Mason Bee Osmia",
        w1: "Carpenter Bee",
        w2: "Mining Bee",
        exp: "Osmia bees carry dry pollen on abdominal scopa hairs, pollinating hundreds of fruit blossoms per day with far higher efficiency than honeybees."
      },
      {
        q: "What glandular secretion fed exclusively to selected larvae triggers epigenetic shifts in gene expression that develop a fertile queen bee?",
        correct: "Royal Jelly",
        w1: "Beebread",
        w2: "Propolis",
        exp: "Royalactin protein and fatty acids in royal jelly downregulate DNA methyltransferase, allowing queen-specific developmental genes to express."
      }
    ],
    number: {
      q: "How many kilometers per hour can an unladen worker honeybee fly when traveling between floral feeding sites and the hive?",
      target: 24,
      unit: "km/h",
      imperial: "15 mph (24 km/h)",
      exp: "Honeybees cruise at approximately 24 km/h (15 mph) when flying empty and slow to about 18 km/h when loaded with nectar and pollen."
    }
  },

  // Cycle 7: Microscopic Marvels & Extremophiles
  {
    mcqs: [
      {
        q: "What microscopic eight-legged water bears can survive extreme outer space vacuum, boiling temperatures, and ionizing radiation by entering cryptobiosis?",
        correct: "Tardigrades",
        w1: "Rotifers",
        w2: "Nematodes",
        exp: "Tardigrades produce unique intrinsically disordered Dsup proteins that shield their DNA from ionizing radiation and oxidative breakdown."
      },
      {
        q: "What desiccated, near-metabolic-zero state allows tardigrades to lose over 99 percent of cellular water and survive decades without food?",
        correct: "Anhydrobiosis",
        w1: "Diapause",
        w2: "Estivation",
        exp: "During anhydrobiosis, tardigrades contract into a compact tun structure, replacing water with protective glass-like biopolymer matrices."
      },
      {
        q: "What microscopic mite lives harmlessly inside human facial hair follicles and sebaceous glands, consuming excess skin oils?",
        correct: "Demodex Mite",
        w1: "Dust Mite",
        w2: "Chigger Mite",
        exp: "Demodex folliculorum and Demodex brevis are microscopic commensal arachnids inhabiting eyelashes, noses, and foreheads across nearly all human adults."
      },
      {
        q: "What primitive wingless hexapods catapult themselves hundreds of times their body length using a spring-loaded abdominal fork called a furcula?",
        correct: "Springtails Collembola",
        w1: "Silverfish",
        w2: "Bristletails",
        exp: "Collembolans latch a furcula under an abdominal retinaculum catch, releasing it to launch into the air away from predators in milliseconds."
      },
      {
        q: "What simple freshwater cnidarian polyp possesses stem cells that continuously self-renew, showing no biological aging or senescence under laboratory conditions?",
        correct: "Hydra",
        w1: "Planaria",
        w2: "Daphnia",
        exp: "Hydra vulgaris continuously expresses FoxO transcription factors in its interstitial stem cells, allowing constant cellular turnover and apparent biological immortality."
      }
    ],
    number: {
      q: "What extreme temperature in degrees Celsius below zero have tardigrades survived in laboratory cryogenic exposure tests?",
      target: -272,
      unit: "celsius",
      imperial: "-272 °C (-458 °F)",
      exp: "Tardigrades in the desiccated tun state have survived immersion in liquid helium at -272 °C (one degree above absolute zero) for several minutes."
    }
  },

  // Cycle 8: Beetles (Coleoptera) & Diversity Records
  {
    mcqs: [
      {
        q: "What hardened, shell-like forewings characteristic of beetles shield the delicate membranous flight wings folded underneath?",
        correct: "Elytra",
        w1: "Halteres",
        w2: "Tegmina",
        exp: "Elytra are heavily sclerotized modified front wings that protect the beetle dorsal abdomen when closed and lift during flight."
      },
      {
        q: "What order of insects represents the largest biological order in the animal kingdom, containing over 400,000 described species?",
        correct: "Coleoptera",
        w1: "Lepidoptera",
        w2: "Diptera",
        exp: "Beetles represent nearly 40 percent of all described insect species and approximately 25 percent of all documented animal life forms on Earth."
      },
      {
        q: "What massive Neotropical beetle features an enormous thoracic pincer horn that allows adult males to reach lengths up to 17 centimeters?",
        correct: "Hercules Beetle Dynastes hercules",
        w1: "Titan Beetle",
        w2: "Goliath Beetle",
        exp: "Male Hercules beetles use their large opposing cephalic and thoracic horns to grapple rival males in territorial canopy wrestling matches."
      },
      {
        q: "What heavy African scarab beetle species is among the bulkiest flying insects in the world, with larvae weighing over 100 grams?",
        correct: "Goliath Beetle Goliathus",
        w1: "Rhinoceros Beetle",
        w2: "Dung Beetle",
        exp: "Goliath beetles feed on high-protein fruit and tree sap in tropical African forests, producing massive larvae that pupate in hard sandy cocoons."
      },
      {
        q: "What horned dung beetle is recognized as the world strongest animal relative to body weight, capable of pulling 1,141 times its own mass?",
        correct: "Onthophagus taurus",
        w1: "Hercules Beetle",
        w2: "Leafcutter Ant",
        exp: "Testing demonstrated that male Onthophagus taurus beetles can pull loads equivalent to a 70 kg human pulling six full double-decker buses."
      }
    ],
    number: {
      q: "Approximately how many thousand described species belong to the beetle order Coleoptera?",
      target: 400,
      unit: "thousand species",
      imperial: "400,000 species",
      exp: "Entomologists have cataloged approximately 400,000 species of beetles, with estimates suggesting millions more remain undiscovered in tropical canopies."
    }
  },

  // Cycle 9: Camouflage, Acoustic Marvels & Bioluminescence
  {
    mcqs: [
      {
        q: "What enzymatic reaction involving luciferin substrate, luciferase enzyme, and ATP produces cold light without heat in fireflies?",
        correct: "Bioluminescence",
        w1: "Phosphorescence",
        w2: "Chemiluminescence",
        exp: "Firefly lanterns combine luciferin with oxygen and ATP in the presence of luciferase and magnesium to emit light with nearly 100 percent optical efficiency."
      },
      {
        q: "What order of insects contains the longest insects on Earth, featuring bodies and legs that precisely mimic twigs and foliage?",
        correct: "Phasmatodea Stick Insects",
        w1: "Mantophasmatodea",
        w2: "Orthoptera",
        exp: "Phasmids exhibit catalepsy (feigning death for hours) and produce sway movements that mimic tree branches blowing in gentle breezes."
      },
      {
        q: "What acoustic organs consisting of ribbed cuticular membranes driven by powerful thoracic muscles allow male cicadas to produce 100-decibel songs?",
        correct: "Timbals",
        w1: "Stridulating files",
        w2: "Pectines",
        exp: "Cicadas deform their convex timbal membranes inward and outward hundreds of times per second, resonating sound through an enlarged abdominal air sac."
      },
      {
        q: "What subterranean insect nymphs feed on root xylem sap for prime-numbered intervals of 13 or 17 years before emerging en masse?",
        correct: "Periodical Cicadas Magicicada",
        w1: "Mayflies",
        w2: "June Beetles",
        exp: "Emerging in synchronized broods of billions, periodical cicadas overwhelm local predators through predator satiation based on prime-year lifecycles."
      },
      {
        q: "What beetle larvae produce bioluminescent green light along their bodies and red light from lanterns on their heads, earning the name railroad worms?",
        correct: "Phengodidae Beetle Larvae",
        w1: "Click Beetles",
        w2: "Glowworms",
        exp: "Phrixothrix larvae possess dual luciferase enzymes that emit distinct red light from the head and green-yellow light from 11 pairs of abdominal ports."
      }
    ],
    number: {
      q: "What is the maximum recorded body length in centimeters of the world longest stick insect specimen Phryganistria chinensis?",
      target: 64,
      unit: "cm",
      imperial: "25.2 inches (64 cm)",
      exp: "A cultivated specimen of the Chinese giant stick insect Phryganistria chinensis measured 64 cm (25.2 inches) with its legs fully extended."
    }
  },

  // Cycle 10: Parasitoids & Fungal Puppet Masters
  {
    mcqs: [
      {
        q: "What parasitic fungus infects carpenter ants, hijacking their nervous system to compel them to bite into leaf veins 25 cm above ground before dying?",
        correct: "Ophiocordyceps unilateralis",
        w1: "Aspergillus flavus",
        w2: "Claviceps purpurea",
        exp: "The fungus secretes neurochemicals that compel the ant to lock its mandibles into a north-facing leaf vein at optimal temperature and humidity for spore release."
      },
      {
        q: "What solitary wasp delivers two precise brain stings to an American cockroach, paralyzing its escape reflex so it can be led to a burrow like a dog on a leash?",
        correct: "Emerald Jewel Wasp Ampulex compressa",
        w1: "Cicada Killer",
        w2: "Tarantula Hawk",
        exp: "The wasp injects dopamine and GABA blockers directly into the subesophageal ganglion, eliminating voluntary motor walking without paralyzing muscles."
      },
      {
        q: "What giant desert wasp attacks tarantulas in their burrows, paralyzing the spider with a sting to serve as fresh food for a single larva?",
        correct: "Tarantula Hawk Pepsis",
        w1: "Mud Dauber",
        w2: "Velvet Ant",
        exp: "Pepsis wasps possess a massive sting that inflicts instant, debilitating pain to deter predators while paralyzing large theraphosid spiders."
      },
      {
        q: "What biological term describes parasites whose larvae develop inside or on a host organism and inevitably kill the host upon completing development?",
        correct: "Parasitoids",
        w1: "Obligate Mutualists",
        w2: "Commensals",
        exp: "Unlike true parasites that keep their host alive, parasitoid wasps, flies, and nematodes consume vital host tissues, killing the host upon pupation."
      },
      {
        q: "What insect order contains true flies, characterized by possessing only a single pair of flight wings and miniature gyroscopic balancing organs called halteres?",
        correct: "Diptera",
        w1: "Hymenoptera",
        w2: "Hemiptera",
        exp: "Dipterans include houseflies, mosquitoes, and hoverflies, using oscillating drumstick-shaped halteres that detect Coriolis rotational forces during flight."
      }
    ],
    number: {
      q: "How many years do the longest-cycle periodical cicadas spend underground before emerging in synchronized broods of billions?",
      target: 17,
      unit: "years",
      imperial: "17-year underground development",
      exp: "Magicicada septendecim and related 17-year species spend 17 years underground undergoing five juvenile instar stages before synchronizing mass emergence."
    }
  }
];

buildQuiz({
  id: 'insects-arachnids-micro-monsters-60',
  theme: 'Insects, Arachnids & The Miniature World',
  title: 'Insects, Arachnids & The Miniature World',
  description: 'A 60-question grand master assessment exploring insect physiology, spider silk mechanics, superorganisms, venoms, microscopic tardigrades, and parasitoids.',
  category: 'Nature, Wildlife & Biology',
  difficulty: 'moderate'
}, insectCycles);

// -------------------------------------------------------------
// 5. plant-kingdom-botany-trees-60
// -------------------------------------------------------------
const botanyCycles = [
  // Cycle 1: Plant Cell Biology & Photosynthesis
  {
    mcqs: [
      {
        q: "What cellular organelle containing chlorophyll pigments and stacked thylakoid membranes is the site of photosynthesis in green plants?",
        correct: "Chloroplast",
        w1: "Mitochondrion",
        w2: "Central Vacuole",
        exp: "Chloroplasts contain thylakoid discs organized into grana, capturing solar photons to generate ATP and NADPH for carbohydrate synthesis."
      },
      {
        q: "What light-independent biochemical cycle inside chloroplast stroma uses RuBisCO enzymes to convert atmospheric carbon dioxide into glucose?",
        correct: "Calvin Cycle",
        w1: "Krebs Cycle",
        w2: "Glycolysis",
        exp: "The Calvin cycle fixes inorganic CO2 onto ribulose-1,5-bisphosphate, producing glyceraldehyde-3-phosphate molecules that form sucrose and starch."
      },
      {
        q: "What microscopic leaf pores flanked by specialized guard cells open and close to regulate gas exchange and transpiration water loss?",
        correct: "Stomata",
        w1: "Lenticels",
        w2: "Hydathodes",
        exp: "Guard cells swell with potassium ions and water to open stomata for CO2 uptake, deflating to seal pores during heat stress and drought."
      },
      {
        q: "What vascular plant tissue transports water and dissolved mineral ions upward from root systems to canopy leaves through negative pressure tension?",
        correct: "Xylem",
        w1: "Phloem",
        w2: "Vascular Cambium",
        exp: "Xylem consists of dead, hollow tracheids and vessel elements that conduct sap upward via water cohesion and leaf transpiration pull."
      },
      {
        q: "What complex aromatic organic polymer reinforces cellulose cell walls in woody vascular plants, enabling trees to stand upright against gravity?",
        correct: "Lignin",
        w1: "Suberin",
        w2: "Pectin",
        exp: "Lignin cross-links plant polysaccharides, providing compressive strength, water impermeability to xylem walls, and resistance to fungal rot."
      }
    ],
    number: {
      q: "Approximately what percentage of global atmospheric oxygen is produced by marine photosynthetic phytoplankton rather than terrestrial land plants?",
      target: 50,
      unit: "percent",
      imperial: "50% to 70% of planetary oxygen",
      exp: "Oceanic phytoplankton, including diatoms and cyanobacteria like Prochlorococcus, generate between 50 and 70 percent of Earth atmospheric oxygen."
    }
  },

  // Cycle 2: Giant Trees & Ancient Methuselahs
  {
    mcqs: [
      {
        q: "What is the tallest living individual tree species on Earth, reaching heights over 115 meters along the coastal fog belts of California?",
        correct: "Coast Redwood Sequoia sempervirens",
        w1: "Mountain Ash Eucalyptus regnans",
        w2: "Coast Douglas Fir",
        exp: "Coast redwoods absorb up to 40 percent of their summer water intake directly from coastal maritime fog through needle stomata."
      },
      {
        q: "What tree species native to California Sierra Nevada slopes is the largest single-stem tree by total wood volume on Earth?",
        correct: "Giant Sequoia Sequoiadendron giganteum",
        w1: "Coast Redwood",
        w2: "African Baobab",
        exp: "The General Sherman tree contains approximately 1,487 cubic meters of wood volume, with a base trunk circumference of over 31 meters."
      },
      {
        q: "What Great Basin Bristlecone Pine in California White Mountains is verified as one of the oldest living non-clonal individual trees at over 4,850 years?",
        correct: "Methuselah",
        w1: "Prometheus",
        w2: "Hyperion",
        exp: "Pinus longaeva survives in harsh subalpine dolomite soils with extremely dense resinous wood that resists rot, fungi, and insect attack for millennia."
      },
      {
        q: "What massive clonal quaking aspen forest in Utah shares a single interconnected subterranean root system weighing over 6,000 metric tons?",
        correct: "Pando",
        w1: "Jurupa Oak",
        w2: "Old Tjikko",
        exp: "Pando consists of over 40,000 genetically identical aspen stems connected to a massive root network estimated to be thousands of years old."
      },
      {
        q: "What iconic African tree features an enormous bottle-shaped trunk that can store up to 120,000 liters of water to survive arid dry seasons?",
        correct: "Baobab Adansonia",
        w1: "Umbrella Thorn Acacia",
        w2: "Mopane Tree",
        exp: "Baobab wood is fibrous and spongy, swelling during rainy periods to store thousands of gallons of water that support local wildlife during droughts."
      }
    ],
    number: {
      q: "What is the surveyed height in meters of Hyperion, the tallest verified living Coast Redwood tree on Earth?",
      target: 115.9,
      unit: "meters",
      imperial: "380.3 feet (115.9 m)",
      exp: "Hyperion in Redwood National Park was officially measured at 115.92 meters (380.3 ft) in height, approaching the theoretical physical hydraulic limit of tree growth."
    }
  },

  // Cycle 3: Carnivorous Plants & Traps
  {
    mcqs: [
      {
        q: "What mechanism triggers the rapid closure of a Venus Flytrap when sensory trigger hairs are contacted twice within 20 seconds?",
        correct: "Rapid Turgor Acid Growth Movement",
        w1: "Sticky adhesive mucilage",
        w2: "Pitfall slide lubrication",
        exp: "Bending trigger hairs fires action potentials that trigger calcium influx, rapidly pumping protons into cell walls to snap the leaf lobes convex in 100 milliseconds."
      },
      {
        q: "What carnivorous plant family produces deep tubular leaf pitchers containing digestive enzymes and slippery waxy zones to drown insects?",
        correct: "Nepenthaceae and Sarraceniaceae",
        w1: "Droseraceae",
        w2: "Lentibulariaceae",
        exp: "Pitcher plants lure insects with nectar secretions along the peristome rim; insects lose footing on microscopic wax crystals and fall into acidic digestive pools."
      },
      {
        q: "What carnivorous plant genus uses glandular leaf tentacles tipped with glistening drops of sticky digestive mucilage to entrap insects?",
        correct: "Sundew Drosera",
        w1: "Butterwort Pinguicula",
        w2: "Bladderwort Utricularia",
        exp: "Drosera tentacles slowly curl around struggling insects via thigmonastic movement, secreting proteases, nucleases, and phosphatases to dissolve prey."
      },
      {
        q: "What aquatic carnivorous plant uses vacuum-pressurized underwater bladders that swallow swimming prey in under a millisecond?",
        correct: "Bladderwort Utricularia",
        w1: "Waterwheel Aldrovanda",
        w2: "Cephalotus",
        exp: "Utricularia traps pump out water to create internal negative pressure; when tiny trigger hairs are touched, a hinged trapdoor swings inward instantly."
      },
      {
        q: "What colossal pitcher plant species native to Mount Kinabalu in Borneo produces urns holding up to 3.5 liters of fluid that can trap small vertebrates?",
        correct: "Nepenthes rajah",
        w1: "Nepenthes rafflesiana",
        w2: "Nepenthes ampullaria",
        exp: "Nepenthes rajah produces massive pitchers known to catch frogs, lizards, and small mammals, forming a mutualism with tree shrews that defecate into pitchers."
      }
    ],
    number: {
      q: "How many milliseconds does it take for an underwater Utricularia bladderwort trapdoor to suck in swimming prey?",
      target: 1,
      unit: "millisecond",
      imperial: "0.5 to 1.0 ms",
      exp: "High-speed filming shows Utricularia bladderworts swallow prey via hydraulic suction in 0.5 to 1.0 milliseconds, the fastest mechanical motion in the plant kingdom."
    }
  },

  // Cycle 4: Floral Evolution & Pollination
  {
    mcqs: [
      {
        q: "What dominant division of seed plants produces flowers and encloses its seeds within protective ovary fruits, comprising 80% of all land plants?",
        correct: "Angiosperms",
        w1: "Gymnosperms",
        w2: "Bryophytes",
        exp: "Angiosperms evolved double fertilization and versatile floral structures that drove massive coevolutionary diversification with insect pollinators."
      },
      {
        q: "What Indonesian rainforest plant produces a massive unbranched spadix inflorescence up to 3 meters tall that heats up and emits a rotting corpse stench?",
        correct: "Titan Arum Amorphophallus titanum",
        w1: "Rafflesia arnoldii",
        w2: "Hydnora africana",
        exp: "The Titan Arum uses thermogenesis to heat its central spadix above 37 °C, volatilizing dimethyl sulfides to attract carrion beetles and flesh flies."
      },
      {
        q: "What Australian orchid genus produces flowers that visually and pheromonally mimic female thynnid wasps to induce males into pseudocopulation?",
        correct: "Hammer Orchids Drakaea",
        w1: "Cattleya",
        w2: "Phalaenopsis",
        exp: "Drakaea flowers release synthesized female sex pheromones; when male wasps grab the decoy labellum, a hinged column flips the wasp into the pollen packet."
      },
      {
        q: "What evolutionary process describes how flowering plants and animal pollinators exert mutual selective pressures that drive reciprocal adaptations?",
        correct: "Coevolution",
        w1: "Convergent Evolution",
        w2: "Adaptive Radiation",
        exp: "Coevolution led to long flower spurs matching moth proboscises, specialized nectar chemistries, and ultraviolet floral guide patterns visible to bees."
      },
      {
        q: "What nocturnal flying mammals with elongated brush-tipped tongues serve as vital pollinators for desert saguaro cacti and wild agave plants?",
        correct: "Nectar-feeding Bats",
        w1: "Flying Squirrels",
        w2: "Sugar Gliders",
        exp: "Leptonycteris bats fly thousands of miles along nectar corridors, pollinating nocturnal white flowers of columnar cacti and century plants."
      }
    ],
    number: {
      q: "What is the maximum recorded height in meters of the giant flowering inflorescence of the Titan Arum Amorphophallus titanum?",
      target: 3.1,
      unit: "meters",
      imperial: "10.2 feet (3.1 m)",
      exp: "In cultivation at botanical gardens, record Titan Arum inflorescences have grown to measured heights of 3.1 meters (over 10 feet) before opening."
    }
  },

  // Cycle 5: Fungal Alliances & Underground Networks
  {
    mcqs: [
      {
        q: "What subterranean symbiotic network formed between mycorrhizal fungi and tree roots allows forests to exchange carbon, water, and warning signals?",
        correct: "Wood Wide Web Mycorrhizal Network",
        w1: "Rhizosphere Strata",
        w2: "Humic Matrix",
        exp: "Mycorrhizal mycelia connect multiple trees across species lines, transferring sugars from sunny canopy trees to shaded saplings and relaying pest alerts."
      },
      {
        q: "What composite dual organism consists of a photosynthetic alga or cyanobacterium living symbiotically inside a fungal mycelium structure?",
        correct: "Lichen",
        w1: "Clubmoss",
        w2: "Liverwort",
        exp: "Lichens represent mutualistic symbioses between mycobiont fungi providing structure and moisture, and photobionts producing carbohydrates."
      },
      {
        q: "What type of mycorrhizae forms a dense mantle sheath around root tips and grows between cortical cells without penetrating inside cell walls?",
        correct: "Ectomycorrhizae",
        w1: "Arbuscular Mycorrhizae",
        w2: "Ericoid Mycorrhizae",
        exp: "Ectomycorrhizae form a Hartig net between outer root cells and are predominant in temperate forest trees like oaks, pines, birches, and beeches."
      },
      {
        q: "What non-photosynthetic translucent plant lacks chlorophyll, obtaining all nutrients by parasitizing mycorrhizal fungi connected to nearby trees?",
        correct: "Ghost Pipe Monotropa uniflora",
        w1: "Snow Plant",
        w2: "Coralroot Orchid",
        exp: "Monotropa uniflora is a mycoheterotroph that taps into Russula and Lactarius mycorrhizal fungi, siphoning carbon originally fixed by photosynthetic trees."
      },
      {
        q: "What microscopic tubular fungal filaments collectively branch through soil to form the vast underground vegetative mycelium body?",
        correct: "Hyphae",
        w1: "Conidia",
        w2: "Basidiospores",
        exp: "Hyphae have thin cell walls made of chitin and secrete extracellular digestive enzymes to mine mineral ions and break down organic matter."
      }
    ],
    number: {
      q: "What percentage of all land vascular plant species form mutually beneficial symbiotic mycorrhizal associations with root fungi?",
      target: 90,
      unit: "percent",
      imperial: "90% of all land plants",
      exp: "Over 90 percent of terrestrial vascular plant species rely on mycorrhizal fungal partnerships for essential phosphorus, nitrogen, and drought resilience."
    }
  },

  // Cycle 6: Plant Defense & Chemical Weaponry
  {
    mcqs: [
      {
        q: "What bitter, astringent secondary metabolite polyphenols in tree bark, tea leaves, and acorns bind to digestive proteins to deter insect herbivores?",
        correct: "Tannins",
        w1: "Terpenoids",
        w2: "Alkaloids",
        exp: "Tannins precipitate proteins in the digestive tracts of herbivores, reducing amino acid absorption and imparting an unpleasant astringent mouthfeel."
      },
      {
        q: "What chemical alkaloid in chili peppers binds specifically to mammalian TRPV1 pain and heat receptors, causing a fiery burning sensation?",
        correct: "Capsaicin",
        w1: "Piperine",
        w2: "Allicin",
        exp: "Capsaicin deters mammalian granivores that destroy seeds through chewing, while birds lack capsaicin-sensitive receptors and disperse seeds intact."
      },
      {
        q: "What systemic defense occurs when an insect damages a plant leaf, triggering the release of jasmonate hormones to induce protease inhibitor production?",
        correct: "Induced Chemical Defense",
        w1: "Phototropism",
        w2: "Thigmonasty",
        exp: "Herbivore saliva triggers methyl jasmonate signaling throughout the plant vascular system, activating defense genes and releasing volatile attractants for parasitoid wasps."
      },
      {
        q: "What sharp botanical defense structures are anatomically modified stem shoots found on hawthorns, citrus, and honey locusts?",
        correct: "Thorns",
        w1: "Spines",
        w2: "Prickles",
        exp: "Thorns are modified branch stems arising from axillary buds, whereas spines are modified leaves (like in cacti) and prickles are outgrowths of bark."
      },
      {
        q: "What Australian rainforest shrub is covered in hollow silica stinging hairs that inject moroidin peptides, producing excruciating long-lasting agony?",
        correct: "Gympie-Gympie Dendrocnide moroides",
        w1: "Giant Stinging Tree",
        w2: "Cape Nettle",
        exp: "Dendrocnide moroides hairs act like microscopic hypodermic needles that lodge in skin, releasing neurotoxins causing debilitating pain that can recur for months."
      }
    ],
    number: {
      q: "How many Scoville Heat Units SHU does pure crystallized capsaicin chemical compound measure on the pungency scale?",
      target: 16000000,
      unit: "SHU",
      imperial: "16,000,000 Scoville Heat Units",
      exp: "Pure capsaicin crystal defines the maximum standard rating of 16 million Scoville Heat Units (16,000,000 SHU) on the chemical spiciness scale."
    }
  },

  // Cycle 7: Desert & Aquatic Adaptations
  {
    mcqs: [
      {
        q: "What photosynthetic pathway allows desert succulents to open stomata only at night to fix CO2 into malate, minimizing daytime water evaporation?",
        correct: "Crassulacean Acid Metabolism CAM",
        w1: "C4 Photosynthesis",
        w2: "C3 Photosynthesis",
        exp: "CAM plants store nocturnal CO2 as four-carbon malic acid in vacuoles, releasing it during the sunny day to Calvin cycle enzymes while keeping stomata tightly closed."
      },
      {
        q: "What specialized aerial root structures on mangrove trees project upward out of coastal mud to take in oxygen for submerged roots through lenticels?",
        correct: "Pneumatophores",
        w1: "Prop roots",
        w2: "Haustoria",
        exp: "Pneumatophores contain spongy aerenchyma tissue that channels oxygen down into anoxic, waterlogged tidal sediment root systems."
      },
      {
        q: "What massive Sonoran Desert cactus can live over 150 years and expand like an accordion to absorb several tons of water during flash rains?",
        correct: "Saguaro Carnegiea gigantea",
        w1: "Mexican Cardon",
        w2: "Organ Pipe Cactus",
        exp: "A mature Saguaro can weigh over six tons when fully hydrated, expanding its pleated longitudinal accordion ribs to store water for long droughts."
      },
      {
        q: "What biological adaptation allows coastal halophyte plants to thrive in high-salinity marine environments by expelling excess sodium crystals onto leaves?",
        correct: "Salt Excretion Glands",
        w1: "Root Suberin barriers",
        w2: "Osmotic inversion",
        exp: "Halophytes like saltbush and black mangroves pump toxic sodium and chloride ions out through specialized epidermal salt bladders."
      },
      {
        q: "What desert resurrection plant can survive losing over 95 percent of cellular water, reviving and turning green within hours of rainfall?",
        correct: "Selaginella lepidophylla",
        w1: "Welwitschia mirabilis",
        w2: "Ephedra viridis",
        exp: "Also known as the Rose of Jericho, Selaginella uses trehalose sugars to stabilize cell membranes and proteins during complete dehydration."
      }
    ],
    number: {
      q: "How many kilograms of water can a mature Saguaro cactus Carnegiea gigantea absorb and store inside its pleated stem tissues after heavy rainfall?",
      target: 3000,
      unit: "kg",
      imperial: "6,600 lbs (3,000 kg)",
      exp: "A fully grown Saguaro cactus can soak up over 3,000 kilograms (approx 800 gallons) of water in a few days following torrential desert rainstorms."
    }
  },

  // Cycle 8: Seed Dispersal & Cryptic Reproduction
  {
    mcqs: [
      {
        q: "What seed dispersal strategy relies on fibrous, buoyant air-filled husks capable of floating across ocean currents for thousands of kilometers?",
        correct: "Hydrochory",
        w1: "Zoochory",
        w2: "Anemochory",
        exp: "Coconuts and sea beans feature waterproof epicarp coatings and spongy mesocarp air pockets that allow seeds to remain viable after months at sea."
      },
      {
        q: "What mechanical seed dispersal method involves the violent, explosive splitting of dry seed pods driven by differential cell wall drying tensions?",
        correct: "Ballochory Explosive Dehiscence",
        w1: "Epizoochory",
        w2: "Endozoochory",
        exp: "Plants like touch-me-nots and sandbox trees build hydrostatic or drying strain in pod walls until they snap open, flinging seeds up to 40 meters away."
      },
      {
        q: "What lipid- and protein-rich fleshy appendages on bloodroot and violet seeds encourage foraging ants to carry seeds into nutrient-rich underground nests?",
        correct: "Elaiosomes",
        w1: "Arils",
        w2: "Pappus bristles",
        exp: "In myrmecochory, ants take seeds underground to eat the nutritious elaiosome, leaving the intact seed buried in a protected organic compost pile."
      },
      {
        q: "What is the largest and heaviest single seed in the plant kingdom, weighing up to 25 kg, produced by a palm tree endemic to the Seychelles?",
        correct: "Coco de Mer Lodoicea maldivica",
        w1: "Coconut",
        w2: "Avocado Seed",
        exp: "The Coco de Mer or double coconut palm produces a colossal two-lobed nut that takes up to seven years to mature on the tree."
      },
      {
        q: "What microscopic, dust-like seeds lack endosperm reserves entirely and require symbiotic infection by mycorrhizal fungi to obtain energy for germination?",
        correct: "Orchid Seeds",
        w1: "Fern Spores",
        w2: "Moss Capsules",
        exp: "A single orchid seed capsule can release millions of microscopic seeds that must encounter specific Rhizoctonia-like fungi to germinate."
      }
    ],
    number: {
      q: "What is the maximum recorded weight in kilograms of a single giant Coco de Mer seed Lodoicea maldivica?",
      target: 25,
      unit: "kg",
      imperial: "55 lbs (25 kg)",
      exp: "The Coco de Mer produces the heaviest seed in the plant kingdom, with verified individual specimens weighing up to 20 to 25 kilograms."
    }
  },

  // Cycle 9: Gymnosperms, Ferns & Deep Time Flora
  {
    mcqs: [
      {
        q: "What ancient gymnosperm tree with distinct fan-shaped leaves is the sole surviving species of a plant division that thrived during the Mesozoic era?",
        correct: "Ginkgo biloba",
        w1: "Cycas revoluta",
        w2: "Ephedra distachya",
        exp: "Ginkgo biloba is a living fossil with motile swimming sperm cells and leaves identical to fossils dating back over 200 million years to the Jurassic."
      },
      {
        q: "What primitive vascular plants reproduce via spores released from clusters of sporangia called sori situated beneath mature fronds?",
        correct: "Ferns Polypodiopsida",
        w1: "Mosses",
        w2: "Hornworts",
        exp: "Ferns exhibit alternation of generations with a dominant diploid sporophyte and an independent photosynthetic haploid gametophyte prothallus."
      },
      {
        q: "What non-vascular bryophyte plants lack true roots and vascular tissues, absorbing moisture and nutrients directly across small cellular leaves?",
        correct: "Mosses Bryophyta",
        w1: "Clubmosses",
        w2: "Horsetails",
        exp: "Bryophytes lack xylem and phloem, relying on rhizoids for substrate anchoring and capillary water absorption across simple gametophore tissues."
      },
      {
        q: "What bizarre gymnosperm endemic to the Namib Desert produces only two strap-like leaves that grow continuously throughout its thousand-year lifespan?",
        correct: "Welwitschia mirabilis",
        w1: "Gnetum gnemon",
        w2: "Ephedra trifurca",
        exp: "Welwitschia survives on coastal sea fog in southwestern Africa, with its two basal meristem leaves splitting into tangled ribbons over centuries."
      },
      {
        q: "What giant scale trees dominated swamp forests of the Carboniferous period 300 million years ago, eventually forming global coal deposits?",
        correct: "Lepidodendron",
        w1: "Sigillaria",
        w2: "Calamites",
        exp: "Lepidodendron grew over 30 meters tall using green photosynthetic bark and diamond-shaped leaf cushions, falling into anoxic swamps to form coal seams."
      }
    ],
    number: {
      q: "How many million years old are the oldest fossil records of the living fossil tree genus Ginkgo?",
      target: 200,
      unit: "million years",
      imperial: "200 million years old",
      exp: "Ginkgo leaves from the Early Jurassic (approx 200 million years ago) display venation and cellular morphology virtually indistinguishable from modern Ginkgo biloba."
    }
  },

  // Cycle 10: Ethnobotany & Agricultural Milestones
  {
    mcqs: [
      {
        q: "What cereal crop domesticated from wild teosinte grass in Mesoamerica over 9,000 years ago is today the most produced grain crop by weight globally?",
        correct: "Maize Corn",
        w1: "Wheat",
        w2: "Rice",
        exp: "Selective breeding by ancient indigenous farmers transformed small teosinte spikes with hard kernels into massive, multi-rowed modern maize cobs."
      },
      {
        q: "What gaseous plant hormone regulates fruit ripening, leaf abscission, and flower wilting, causing stored fruits to ripen in response to proximity?",
        correct: "Ethylene",
        w1: "Auxin",
        w2: "Gibberellin",
        exp: "Ethylene gas diffuses between fruits, triggering cellulase and pectinase enzymes that soften cell walls and convert starches to simple sugars."
      },
      {
        q: "What compound found in willow bark Salix was used for millennia as a pain reliever and provided the chemical foundation for modern aspirin?",
        correct: "Salicin",
        w1: "Quinine",
        w2: "Digitoxin",
        exp: "Salicin metabolizes into salicylic acid; in 1897, Bayer chemist Felix Hoffmann synthesized acetylsalicylic acid to create less stomach-irritating aspirin."
      },
      {
        q: "What horticultural technique joins a scion branch containing desirable fruit genetics onto a hardy rootstock root system to form a single growing tree?",
        correct: "Grafting",
        w1: "Layering",
        w2: "Stratification",
        exp: "Grafting aligns the vascular cambium layers of scion and rootstock, allowing commercial apple and citrus varieties to be cloned identically for centuries."
      },
      {
        q: "What agricultural cultivation method grows crops entirely in recirculating mineral nutrient water solutions without any soil substrate?",
        correct: "Hydroponics",
        w1: "Aeroponics",
        w2: "Permaculture",
        exp: "Hydroponic systems deliver dissolved nitrogen, phosphorus, and trace minerals directly to exposed plant roots, using up to 90 percent less water than soil farming."
      }
    ],
    number: {
      q: "What is the verified age in years of Methuselah, the ancient Great Basin Bristlecone Pine in California White Mountains?",
      target: 4850,
      unit: "years",
      imperial: "4,850+ years old",
      exp: "Core samples dated by dendrochronologists show Methuselah germinated around 2832 BCE, making it over 4,850 years old."
    }
  }
];

buildQuiz({
  id: 'plant-kingdom-botany-trees-60',
  theme: 'Botany: Giant Trees, Carnivorous Plants & Flora',
  title: 'Botany: Giant Trees, Carnivorous Plants & Flora',
  description: 'A 60-question grand master assessment exploring photosynthesis biochemistry, champion trees, carnivorous traps, pollination, and deep time paleobotany.',
  category: 'Nature, Wildlife & Biology',
  difficulty: 'moderate'
}, botanyCycles);

// -------------------------------------------------------------
// 6. genetics-dna-evolution-60
// -------------------------------------------------------------
const geneticsCycles = [
  // Cycle 1: DNA Molecular Architecture
  {
    mcqs: [
      {
        q: "What three chemical components compose a single monomeric nucleotide unit of DNA?",
        correct: "Deoxyribose sugar, phosphate group, nitrogenous base",
        w1: "Ribose sugar, fatty acid, amine group",
        w2: "Amino acid, glycerol, phosphate group",
        exp: "A nucleotide consists of a 5-carbon deoxyribose sugar ring bonded to a phosphate group at the 5-prime carbon and a nitrogenous base at the 1-prime carbon."
      },
      {
        q: "In double-stranded DNA, what nitrogenous pyrimidine base always pairs with the purine adenine via two hydrogen bonds?",
        correct: "Thymine",
        w1: "Cytosine",
        w2: "Guanine",
        exp: "According to Chargaff rules, adenine pairs exclusively with thymine (A=T via two hydrogen bonds), while guanine pairs with cytosine (G=C via three bonds)."
      },
      {
        q: "Who produced Photo 51 in 1952, the iconic X-ray diffraction image that revealed the B-form double-helical structure of DNA?",
        correct: "Rosalind Franklin",
        w1: "James Watson",
        w2: "Francis Crick",
        exp: "Working at King College London with Raymond Gosling, Rosalind Franklin captured the high-resolution X-ray diffraction photograph confirming the DNA helical lattice."
      },
      {
        q: "What covalent chemical bond links adjacent nucleotides together along the continuous sugar-phosphate backbone of a nucleic acid strand?",
        correct: "Phosphodiester Bond",
        w1: "Peptide bond",
        w2: "Glycosidic bond",
        exp: "A phosphodiester bond connects the 3-prime hydroxyl group of one deoxyribose sugar to the 5-prime phosphate group of the neighboring nucleotide."
      },
      {
        q: "In single-stranded RNA molecules, what nitrogenous base replaces thymine to pair complementarily with adenine?",
        correct: "Uracil",
        w1: "Cytosine",
        w2: "Inosine",
        exp: "RNA uses uracil instead of thymine; uracil lacks the methyl group present on carbon-5 of thymine and requires less cellular energy to produce."
      }
    ],
    number: {
      q: "How many hydrogen bonds form specifically between a guanine and cytosine G-C base pair in double-stranded DNA?",
      target: 3,
      unit: "hydrogen bonds",
      imperial: "3 hydrogen bonds",
      exp: "G-C base pairs share three hydrogen bonds compared to two in A-T pairs, making DNA regions with high G-C content thermally more stable."
    }
  },

  // Cycle 2: Transcription, Translation & Protein Synthesis
  {
    mcqs: [
      {
        q: "What primary enzyme transcribes a complementary messenger RNA strand from a DNA template strand during gene transcription?",
        correct: "RNA Polymerase",
        w1: "DNA Ligase",
        w2: "DNA Helicase",
        exp: "RNA Polymerase unwinds the double helix and synthesizes an RNA transcript in the 5-prime to 3-prime direction using ribose nucleotides."
      },
      {
        q: "What three-nucleotide sequence on a messenger RNA molecule specifies a single amino acid or translation stop signal?",
        correct: "Codon",
        w1: "Anticodon",
        w2: "Intron",
        exp: "Each mRNA triplet codon corresponds to a specific amino acid delivered by a transfer RNA molecule bearing the complementary anticodon."
      },
      {
        q: "What cellular ribonucleoprotein complex translates mRNA codons into a growing polypeptide chain of amino acids?",
        correct: "Ribosome",
        w1: "Spliceosome",
        w2: "Proteasome",
        exp: "Ribosomes consist of large and small subunits composed of ribosomal RNA and proteins that catalyze peptide bond formation at aminoacyl and peptidyl sites."
      },
      {
        q: "What non-coding nucleotide segments are spliced out of eukaryotic pre-mRNA transcripts by spliceosomes before translation?",
        correct: "Introns",
        w1: "Exons",
        w2: "Promoters",
        exp: "Introns are intervening non-coding regions removed during RNA splicing, allowing alternative splicing of exons to generate multiple protein variants from one gene."
      },
      {
        q: "What universal start codon in messenger RNA signals the beginning of translation and codes for the amino acid methionine?",
        correct: "AUG",
        w1: "UAA",
        w2: "UGA",
        exp: "AUG is the universal start codon in all domains of life, recognized by initiator tRNA charged with methionine (or formylmethionine in bacteria)."
      }
    ],
    number: {
      q: "How many possible distinct triplet codons exist in the standard universal genetic code table composed of four RNA bases?",
      target: 64,
      unit: "codons",
      imperial: "64 triplet codons (4^3)",
      exp: "Four nucleotides arranged in groups of three yield 64 possible codons (4x4x4): 61 codons specifying 20 amino acids and 3 termination stop codons."
    }
  },

  // Cycle 3: Mendelian Genetics & Inheritance
  {
    mcqs: [
      {
        q: "Who is celebrated as the father of genetics for discovering foundational laws of inheritance through breeding experiments on garden pea plants?",
        correct: "Gregor Mendel",
        w1: "Thomas Hunt Morgan",
        w2: "Jean-Baptiste Lamarck",
        exp: "Mendel, an Augustinian friar in Brno, tracked seven discrete traits in Pisum sativum, publishing his laws of inheritance in 1866."
      },
      {
        q: "What Mendelian principle states that two alleles for a heritable trait segregate during gamete formation so each gamete carries only one allele?",
        correct: "Law of Segregation",
        w1: "Law of Independent Assortment",
        w2: "Law of Dominance",
        exp: "Mendel First Law states that homologous chromosome separation during meiosis ensures haploid gametes receive only a single copy of each gene."
      },
      {
        q: "What genetic grid diagram is used to predict the phenotypic and genotypic probability ratios of offspring resulting from parental crosses?",
        correct: "Punnett Square",
        w1: "Pedigree chart",
        w2: "Karyotype plot",
        exp: "Devised by British geneticist Reginald Punnett in 1905, the square visualizes all possible combinations of maternal and paternal alleles."
      },
      {
        q: "What non-Mendelian inheritance pattern occurs when both alleles in a heterozygous individual are simultaneously and fully expressed in the phenotype?",
        correct: "Codominance",
        w1: "Incomplete Dominance",
        w2: "Polygenic Inheritance",
        exp: "In human AB blood type, both A and B glycosyltransferase enzymes are expressed equally, producing both A and B antigens on red blood cell surfaces."
      },
      {
        q: "What term describes a genetic phenomenon where a single gene locus influences multiple distinct, seemingly unrelated phenotypic traits?",
        correct: "Pleiotropy",
        w1: "Epistasis",
        w2: "Polygeny",
        exp: "Sickle cell anemia is a classic pleiotropic mutation: a single point mutation in beta-globin causes anemia, organ damage, and malaria resistance."
      }
    ],
    number: {
      q: "In a classic Mendelian monohybrid cross between two heterozygous parents (Bb x Bb), what percentage of offspring exhibit the dominant phenotype?",
      target: 75,
      unit: "percent",
      imperial: "75% dominant phenotype (3:1 ratio)",
      exp: "The monohybrid cross yields a genotypic ratio of 1 BB : 2 Bb : 1 bb, resulting in 75 percent dominant phenotype and 25 percent recessive phenotype."
    }
  },

  // Cycle 4: Chromosomes, Meiosis & Karyotypes
  {
    mcqs: [
      {
        q: "How many homologous pairs of chromosomes are present in somatic cell nuclei of a typical human?",
        correct: "23 pairs",
        w1: "46 pairs",
        w2: "12 pairs",
        exp: "Humans possess 22 pairs of autosomes and one pair of sex chromosomes (XX in females, XY in males), totaling 46 chromosomes per diploid cell."
      },
      {
        q: "What repetitive non-coding DNA caps on chromosome ends protect genetic data from degradation, shortening with each somatic cell division?",
        correct: "Telomeres",
        w1: "Centromeres",
        w2: "Kinetochores",
        exp: "Human telomeres consist of tandem TTAGGG hexanucleotide repeats protected by shelterin protein complexes that prevent end-to-end chromosome fusion."
      },
      {
        q: "During what stage of meiosis do non-sister chromatids of homologous chromosomes exchange genetic segments via crossing over at chiasmata?",
        correct: "Prophase I",
        w1: "Metaphase II",
        w2: "Anaphase I",
        exp: "Synaptonemal complexes align homologous pairs during Prophase I, facilitating homologous recombination that generates novel allele combinations."
      },
      {
        q: "What constricted chromosomal region holds sister chromatids together and serves as the assembly site for spindle microtubule kinetochores?",
        correct: "Centromere",
        w1: "Telomere",
        w2: "Chromatid arm",
        exp: "Centromeres contain specialized CENP-A histone variants that anchor the kinetochore protein complex to pull chromatids apart during anaphase."
      },
      {
        q: "What human chromosomal condition is caused by non-disjunction producing trisomy of chromosome 21?",
        correct: "Down Syndrome",
        w1: "Turner Syndrome",
        w2: "Klinefelter Syndrome",
        exp: "Trisomy 21 results from the presence of three copies of chromosome 21 instead of two, causing developmental differences and characteristic facial features."
      }
    ],
    number: {
      q: "How many total chromosomes are contained inside a normal human diploid somatic cell nucleus?",
      target: 46,
      unit: "chromosomes",
      imperial: "46 chromosomes (23 pairs)",
      exp: "Human somatic cells contain exactly 46 chromosomes (2n = 46), with 23 inherited from each parent via haploid gametes."
    }
  },

  // Cycle 5: Mechanisms of Evolution & Natural Selection
  {
    mcqs: [
      {
        q: "Who independently conceived the theory of evolution by natural selection in the Malay Archipelago, prompting joint publication with Charles Darwin in 1858?",
        correct: "Alfred Russel Wallace",
        w1: "Thomas Henry Huxley",
        w2: "Charles Lyell",
        exp: "Wallace sent his essay on natural selection to Darwin from Indonesia in 1858, leading to joint presentation at the Linnean Society of London."
      },
      {
        q: "What evolutionary mechanism causes random, non-adaptive fluctuations in allele frequencies within small populations due to chance sampling events?",
        correct: "Genetic Drift",
        w1: "Gene Flow",
        w2: "Directional Selection",
        exp: "Genetic drift, including founder events and population bottlenecks, can cause neutral or slightly deleterious alleles to become fixed purely by chance."
      },
      {
        q: "What mode of natural selection simultaneously favors phenotypic extremes at both ends of a distribution curve over intermediate phenotypes?",
        correct: "Disruptive Selection",
        w1: "Directional Selection",
        w2: "Stabilizing Selection",
        exp: "Disruptive selection occurs when environmental niches favor two distinct morphs, such as small-billed and large-billed seedcrackers, driving divergence."
      },
      {
        q: "What phenomenon occurs when a severe catastrophe dramatically reduces population size, eliminating vast amounts of genetic diversity?",
        correct: "Population Bottleneck",
        w1: "Founder Effect",
        w2: "Adaptive Radiance",
        exp: "Cheetahs underwent a severe Pleistocene bottleneck roughly 10,000 years ago, resulting in near-identical genetic homogeneity and high graft tolerance today."
      },
      {
        q: "What rapid evolutionary process occurs when a single ancestral species diversifies into multiple ecologically specialized species filling diverse niches?",
        correct: "Adaptive Radiation",
        w1: "Convergent Evolution",
        w2: "Parallel Evolution",
        exp: "Classic examples of adaptive radiation include Darwin finches on the Galapagos Islands, Hawaiian silverswords, and African Rift Lake cichlids."
      }
    ],
    number: {
      q: "In what year CE did Charles Darwin publish his landmark scientific treatise On the Origin of Species?",
      target: 1859,
      unit: "CE",
      imperial: "1859 CE",
      exp: "Charles Darwin published On the Origin of Species on November 24, 1859, laying out comprehensive evidence for common descent and natural selection."
    }
  },

  // Cycle 6: Speciation & Evidence for Evolution
  {
    mcqs: [
      {
        q: "What mode of speciation occurs when a physical geographic barrier like a mountain range or ocean separates a population into isolated groups?",
        correct: "Allopatric Speciation",
        w1: "Sympatric Speciation",
        w2: "Parapatric Speciation",
        exp: "Geographic isolation halts gene flow between populations, allowing genetic drift and local natural selection to accumulate reproductive barriers over time."
      },
      {
        q: "What anatomical structures share a common evolutionary ancestral skeletal blueprint despite performing completely different functions today?",
        correct: "Homologous Structures",
        w1: "Analogous Structures",
        w2: "Vestigial Remnants",
        exp: "The pentadactyl limb framework found in human arms, bat wings, whale flippers, and mole paws illustrates divergent evolution from a common tetrapod ancestor."
      },
      {
        q: "What term describes reduced, non-functional anatomical remnants of ancestral organs, such as the pelvic bone remnants in baleen whales?",
        correct: "Vestigial Structures",
        w1: "Atavisms",
        w2: "Homoplasies",
        exp: "Vestigial features reflect evolutionary history where structural changes made ancestral organs obsolete, such as flightless cormorant wings or human coccyx bones."
      },
      {
        q: "What branching diagram illustrates hypothesized evolutionary relationships and shared ancestry among distinct biological clades?",
        correct: "Phylogenetic Tree",
        w1: "Punnett Diagram",
        w2: "Karyotype Map",
        exp: "Phylogenetic trees use molecular sequencing and synapomorphies to map nodes of divergence and trace evolutionary lineage back to common ancestors."
      },
      {
        q: "What famous transitional fossil discovered on Ellesmere Island in 2004 revealed wrist bones, scales, and neck joints bridging fish and tetrapods?",
        correct: "Tiktaalik roseae",
        w1: "Ichthyostega",
        w2: "Acanthostega",
        exp: "Tiktaalik lived 375 million years ago in the Late Devonian, possessing fish gills and scales alongside tetrapod-like wrist joints, ribs, and a mobile neck."
      }
    ],
    number: {
      q: "How many million years old is the transitional tetrapodomorph fish fossil Tiktaalik roseae from the Late Devonian?",
      target: 375,
      unit: "million years",
      imperial: "375 million years old",
      exp: "Tiktaalik fossils discovered in Nunavut, Canada date precisely to 375 million years ago, capturing the transitional evolution of land-walking limbs."
    }
  },

  // Cycle 7: The Human Genome & Comparative Genomics
  {
    mcqs: [
      {
        q: "Approximately what percentage of DNA sequence identity do modern humans share with chimpanzees Pan troglodytes across alignable bases?",
        correct: "98.8 percent",
        w1: "85 percent",
        w2: "92 percent",
        exp: "Whole-genome comparisons between humans and chimpanzees show roughly 98.8 percent nucleotide identity in directly alignable DNA sequences."
      },
      {
        q: "In what year was the first working draft sequence of the complete Human Genome officially announced by international consortia?",
        correct: "2001",
        w1: "1990",
        w2: "2012",
        exp: "The International Human Genome Sequencing Consortium and Celera Genomics published concurrent landmark drafts in Nature and Science in February 2001."
      },
      {
        q: "Approximately what percentage of the 3.2 billion base pairs in the human nuclear genome directly codes for functional protein amino acid sequences?",
        correct: "1.5 percent",
        w1: "25 percent",
        w2: "60 percent",
        exp: "Only about 1.5 percent of the human genome consists of protein-coding exons; the remainder consists of introns, regulatory switches, retrotransposons, and structural elements."
      },
      {
        q: "What non-recombining circular DNA is inherited exclusively through the maternal lineage, allowing geneticists to trace maternal human ancestry?",
        correct: "Mitochondrial DNA mtDNA",
        w1: "Nuclear Chromosome 21",
        w2: "Plasmid DNA",
        exp: "Mitochondrial DNA is passed down strictly from mothers in egg cytoplasm, enabling scientists to reconstruct prehistoric maternal human migrations back to Mitochondrial Eve."
      },
      {
        q: "Approximately what percentage of nuclear DNA in contemporary non-African human populations originates from ancient interbreeding with Neanderthals?",
        correct: "1 to 2 percent",
        w1: "10 to 15 percent",
        w2: "25 percent",
        exp: "Genomic sequencing reveals modern Eurasians retain roughly 1 to 2 percent Neanderthal DNA, influencing skin keratins, immune receptors, and metabolic traits."
      }
    ],
    number: {
      q: "Approximately how many billion base pairs make up a single haploid copy of the human nuclear genome?",
      target: 3.2,
      unit: "billion base pairs",
      imperial: "3.2 billion base pairs (approx 3.2 Gb)",
      exp: "The human haploid genome contains roughly 3.05 to 3.2 billion base pairs distributed across 23 chromosomes."
    }
  },

  // Cycle 8: Epigenetics, Gene Regulation & CRISPR
  {
    mcqs: [
      {
        q: "What primary biochemical epigenetic modification adds methyl groups to cytosine bases in CpG islands to silence gene transcription?",
        correct: "DNA Methylation",
        w1: "Histone Acetylation",
        w2: "RNA Interference",
        exp: "DNA methyltransferases transfer methyl groups to cytosine, blocking transcription factor binding and recruiting repressor proteins to silence genes."
      },
      {
        q: "What revolutionary targeted gene editing technology adapted from bacterial adaptive immunity uses a guide RNA and nuclease to edit DNA sequences?",
        correct: "CRISPR-Cas9",
        w1: "Zinc Finger Nuclease",
        w2: "TALENs",
        exp: "The Cas9 endonuclease binds a synthetic single guide RNA (sgRNA) that directs it to make precise double-strand breaks at complementary genomic targets."
      },
      {
        q: "What alkaline protein octamers package and wrap nuclear DNA strands into fundamental repeating chromatin beads called nucleosomes?",
        correct: "Histones",
        w1: "Tubulins",
        w2: "Actins",
        exp: "DNA wraps roughly 1.65 times around an octamer of core histone proteins (H2A, H2B, H3, H4), with histone tail acetylation loosening chromatin for gene expression."
      },
      {
        q: "What field of genetics studies heritable changes in gene expression and cellular phenotype that occur without changing the underlying DNA sequence?",
        correct: "Epigenetics",
        w1: "Epistasis",
        w2: "Transversion",
        exp: "Epigenetics investigates chromatin remodeling, DNA methylation, and non-coding RNA pathways that regulate cell differentiation throughout life."
      },
      {
        q: "What French biochemist was awarded the 2020 Nobel Prize in Chemistry alongside Jennifer Doudna for the development of CRISPR-Cas9 genome editing?",
        correct: "Emmanuelle Charpentier",
        w1: "Katalin Kariko",
        w2: "Barbara McClintock",
        exp: "Charpentier discovered the essential tracrRNA component in Streptococcus pyogenes before collaborating with Doudna to engineer the programmable two-component CRISPR system."
      }
    ],
    number: {
      q: "In what year CE was the Nobel Prize in Chemistry awarded to Emmanuelle Charpentier and Jennifer Doudna for CRISPR-Cas9?",
      target: 2020,
      unit: "CE",
      imperial: "2020 CE",
      exp: "The Nobel Prize in Chemistry 2020 was awarded jointly to Emmanuelle Charpentier and Jennifer A. Doudna for developing a method for genome editing."
    }
  },

  // Cycle 9: Deep Evolutionary Milestones
  {
    mcqs: [
      {
        q: "What evolutionary theory championed by Lynn Margulis explains that eukaryotic mitochondria and chloroplasts originated from engulfed free-living prokaryotes?",
        correct: "Endosymbiotic Theory",
        w1: "Panspermia Theory",
        w2: "Spontaneous Generation",
        exp: "Mitochondria evolved from engulfed aerobic alphaproteobacteria, evidenced by their own circular DNA, double membranes, and bacterial 70S ribosomes."
      },
      {
        q: "What geological event roughly 541 million years ago saw the rapid evolutionary explosion of nearly all modern animal phyla in the fossil record?",
        correct: "Cambrian Explosion",
        w1: "Avalon Explosion",
        w2: "Great Oxidation Event",
        exp: "During the Cambrian period, complex bilateral body plans, mineralized exoskeletons, compound eyes, and predatory niches emerged rapidly over roughly 25 million years."
      },
      {
        q: "What catastrophic Great Dying mass extinction event 252 million years ago wiped out over 90 percent of marine species and 70 percent of land vertebrates?",
        correct: "Permian-Triassic Extinction",
        w1: "Cretaceous-Paleogene Extinction",
        w2: "Late Devonian Extinction",
        exp: "Massive volcanic outpourings from the Siberian Traps released trillions of tons of greenhouse gases, triggering catastrophic ocean anoxia and global warming."
      },
      {
        q: "What biological milestone 2.4 billion years ago driven by cyanobacterial photosynthesis permanently filled Earth atmosphere with free oxygen gas?",
        correct: "Great Oxidation Event",
        w1: "Snowball Earth",
        w2: "Cryogenian Freeze",
        exp: "Cyanobacteria utilizing oxygenic photosynthesis saturated oceanic dissolved iron to deposit banded iron formations before oxygen accumulated in the air."
      },
      {
        q: "What layered sedimentary rock structures formed by ancient colonies of photosynthetic cyanobacteria provide the oldest fossil records of life on Earth?",
        correct: "Stromatolites",
        w1: "Oolites",
        w2: "Septarian Nodules",
        exp: "Stromatolite fossils from Western Australia and Greenland date back over 3.5 billion years, formed by cyanobacterial mats trapping and cementing sediment."
      }
    ],
    number: {
      q: "How many million years ago did the Cambrian Explosion begin, marking the start of the Phanerozoic Eon?",
      target: 541,
      unit: "million years",
      imperial: "541 million years ago",
      exp: "The Cambrian explosion began approximately 541 million years ago at the base of the Fortunian stage, defining the boundary of the Cambrian period."
    }
  },

  // Cycle 10: Modern Biotechnology, PCR & Cloning
  {
    mcqs: [
      {
        q: "What molecular biology technique invented by Kary Mullis in 1983 uses thermal cycling to exponentially amplify specific target DNA sequences?",
        correct: "Polymerase Chain Reaction PCR",
        w1: "Gel Electrophoresis",
        w2: "Western Blotting",
        exp: "PCR uses cycles of denaturation (95 °C), primer annealing (55 °C), and extension (72 °C) to generate billions of exact DNA copies within hours."
      },
      {
        q: "What heat-stable DNA polymerase enzyme isolated from Yellowstone extremophile bacteria Thermus aquaticus makes automated PCR cycling possible?",
        correct: "Taq Polymerase",
        w1: "Pfu Polymerase",
        w2: "DNA Polymerase I",
        exp: "Taq polymerase withstands repeated 95 °C denaturation cycles without denaturing, eliminating the need to manually add fresh enzyme after every PCR cycle."
      },
      {
        q: "In 1996, what mammal became the first cloned animal produced from an adult somatic cell using somatic cell nuclear transfer at the Roslin Institute?",
        correct: "Dolly the Sheep",
        w1: "CC the Cat",
        w2: "Cumulina the Mouse",
        exp: "Ian Wilmut and Keith Campbell transferred the nucleus of an adult Finn-Dorset mammary cell into an enucleated egg cell, proving adult cells remain pluripotency-capable."
      },
      {
        q: "What analytical technique uses an electric field to separate negatively charged DNA fragments across an agarose gel matrix by molecular length?",
        correct: "Gel Electrophoresis",
        w1: "Thin Layer Chromatography",
        w2: "Density Centrifugation",
        exp: "Phosphate backbones give DNA a uniform negative charge; smaller fragments migrate faster toward the positive anode through the porous agarose mesh."
      },
      {
        q: "What high-throughput DNA sequencing technology sequences millions of DNA fragments simultaneously in parallel, revolutionizing personalized genomics?",
        correct: "Next-Generation Sequencing NGS",
        w1: "Sanger Chain Termination",
        w2: "Southern Blotting",
        exp: "NGS platforms, such as Illumina sequencing-by-synthesis, slashed the cost of sequencing a whole human genome from 100 million dollars to under 300 dollars."
      }
    ],
    number: {
      q: "In what year CE was Dolly the Sheep born after being cloned from an adult somatic cell at the Roslin Institute in Scotland?",
      target: 1996,
      unit: "CE",
      imperial: "1996 CE",
      exp: "Dolly the sheep was born on July 5, 1996 at the Roslin Institute, marking a historic breakthrough in mammalian somatic cell cloning."
    }
  }
];

buildQuiz({
  id: 'genetics-dna-evolution-60',
  theme: 'Genetics, DNA & The Tree of Evolution',
  title: 'Genetics, DNA & The Tree of Evolution',
  description: 'A 60-question grand master assessment exploring DNA double-helix architecture, protein synthesis, Mendelian inheritance, natural selection, CRISPR, and deep time genomics.',
  category: 'Nature, Wildlife & Biology',
  difficulty: 'moderate'
}, geneticsCycles);

console.log('Finished generating Quizzes 4, 5, 6!');
