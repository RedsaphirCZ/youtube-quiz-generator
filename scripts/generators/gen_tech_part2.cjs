const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 13. naval-ships-maritime-history-60
// Theme: "Historic Ships, Submarines & Naval Engineering"
// Category: "Tech, Inventions & Engineering"
// =========================================================================
const navalCycles = [
  // Cycle 1: Age of Sail & Wooden Warships
  {
    mcqs: [
      {
        q: "Which 104-gun first-rate ship of the line served as Vice-Admiral Lord Nelson flagship at the Battle of Trafalgar in 1805?",
        correct: "HMS Victory",
        w1: "HMS Dreadnought",
        w2: "HMS Temeraire",
        exp: "HMS Victory is the world oldest naval vessel still in commission, preserved in dry dock at Portsmouth Historic Dockyard."
      },
      {
        q: "Which three-masted American heavy frigate earned the nickname Old Ironsides during the War of 1812 when cannonballs bounced off its resilient live oak hull?",
        correct: "USS Constitution",
        w1: "USS Constellation",
        w2: "USS United States",
        exp: "Launched in 1797, USS Constitution defeated five British warships including HMS Guerriere, remaining the world oldest commissioned naval vessel afloat."
      },
      {
        q: "Which grand 64-gun Swedish warship capsized and sank in Stockholm harbor just twenty minutes into its maiden voyage in August 1628?",
        correct: "Vasa",
        w1: "Kronan",
        w2: "Svärdet",
        exp: "Vasa was built with excessive upper-deck weight and an inadequate ballast keel, salvaged largely intact in 1961 after 333 years underwater."
      },
      {
        q: "Which Tudor flagship of King Henry VIII sank in the Solent in 1545 and was raised in a famous maritime salvage operation in 1982?",
        correct: "Mary Rose",
        w1: "Great Harry",
        w2: "Peter Pomegranate",
        exp: "The Mary Rose yielded thousands of well-preserved Tudor artifacts, including longbows, personal weapons, and musical instruments."
      },
      {
        q: "Which English galleon, captained by Sir Francis Drake, completed a historic global circumnavigation between 1577 and 1580?",
        correct: "Golden Hind",
        w1: "Pelican",
        w2: "Revenge",
        exp: "Originally named Pelican, Drake renamed the vessel Golden Hind during the expedition, capturing immense Spanish treasure across the Pacific."
      }
    ],
    number: {
      q: "In what year did Lord Nelson defeat the combined French and Spanish fleets at the pivotal Battle of Trafalgar?",
      target: 1805,
      unit: "year",
      imperial: "1805 AD",
      exp: "The Battle of Trafalgar was fought on October 21, 1805, establishing British naval supremacy across the world oceans for a century."
    }
  },

  // Cycle 2: Steam Propulsion & The Ironclad Dawn
  {
    mcqs: [
      {
        q: "Which revolutionary passenger ship designed by Isambard Kingdom Brunel in 1843 was the world first iron-hulled, screw-propeller-driven transatlantic steamship?",
        correct: "SS Great Britain",
        w1: "SS Great Western",
        w2: "SS Great Eastern",
        exp: "The SS Great Britain combined an iron hull with a thousand-horsepower steam engine and a six-bladed screw propeller, now restored in Bristol."
      },
      {
        q: "What historic 1862 American Civil War clash marked the first battle between ironclad armored warships in world history?",
        correct: "Battle of Hampton Roads",
        w1: "Battle of Mobile Bay",
        w2: "Battle of Fort Sumter",
        exp: "The Union USS Monitor with its revolving turret fought the Confederate CSS Virginia to a tactical draw, rendering wooden fleets obsolete overnight."
      },
      {
        q: "Which 1860 British warship was the first iron-hulled, armor-plated, steam-powered ocean-going ironclad battleship ever commissioned?",
        correct: "HMS Warrior",
        w1: "HMS Black Prince",
        w2: "HMS Inflexible",
        exp: "HMS Warrior combined ten-centimeter wrought-iron armor plates with heavy rifled guns, rendering all contemporary French and wooden warships obsolete."
      },
      {
        q: "Which American inventor developed the steamboat Clermont, inaugurating regular commercial passenger steamboat service on the Hudson River in 1807?",
        correct: "Robert Fulton",
        w1: "John Fitch",
        w2: "John Ericsson",
        exp: "Fulton North River Steamboat demonstrated that steam-driven paddle wheels provided dependable, schedule-bound commercial river transportation."
      },
      {
        q: "Which Swedish-American engineer invented the revolving armored gun turret used on USS Monitor and perfected the naval screw propeller?",
        correct: "John Ericsson",
        w1: "Robert Fulton",
        w2: "Benjamin Isherwood",
        exp: "John Ericsson steam and propeller innovations transformed nineteenth-century naval architecture and warship design worldwide."
      }
    ],
    number: {
      q: "In what year did the historic ironclad duel between USS Monitor and CSS Virginia take place at Hampton Roads?",
      target: 1862,
      unit: "year",
      imperial: "1862 AD",
      exp: "The two ironclads clashed on March 9, 1862, off the coast of Virginia, initiating a revolution in global armored naval warfare."
    }
  },

  // Cycle 3: The Dreadnought Era & Pre-WWI Naval Arms Race
  {
    mcqs: [
      {
        q: "Which revolutionary British battleship, commissioned in 1906 with an all-big-gun uniform battery and steam turbine propulsion, gave its name to an entire warship class?",
        correct: "HMS Dreadnought",
        w1: "HMS Iron Duke",
        w2: "HMS Warspite",
        exp: "HMS Dreadnought mounted ten 12-inch main guns and cruised at twenty-one knots, instantly rendering every pre-dreadnought battleship obsolete."
      },
      {
        q: "Which 1916 naval clash in the North Sea was the largest direct battle between dreadnought battleship fleets in world history?",
        correct: "Battle of Jutland",
        w1: "Battle of Dogger Bank",
        w2: "Battle of Heligoland Bight",
        exp: "The British Grand Fleet and the Imperial German High Seas Fleet engaged 250 ships, with Britain retaining strategic control of the North Sea."
      },
      {
        q: "In June 1919, where did the Imperial German High Seas Fleet deliberately scuttle fifty-two of its interned warships to prevent Allied seizure?",
        correct: "Scapa Flow",
        w1: "Kiel Harbor",
        w2: "Wilhelmshaven",
        exp: "Admiral Ludwig von Reuter ordered the coordinated scuttling in the Orkney Islands, sinking over 400,000 tons of battleships and cruisers."
      },
      {
        q: "Which 1912 American warship preserved in Houston is the only surviving dreadnought-era battleship in the world to have served in both World Wars?",
        correct: "USS Texas",
        w1: "USS Massachusetts",
        w2: "USS North Carolina",
        exp: "USS Texas BB-35 participated in D-Day shore bombardments at Omaha Beach and Pacific invasions at Iwo Jima and Okinawa."
      },
      {
        q: "What fast, maneuverable small naval warship class was developed in the late nineteenth century to defend battle fleets against swift torpedo boats?",
        correct: "Torpedo Boat Destroyer",
        w1: "Corvette",
        w2: "Frigate",
        exp: "Originally named torpedo boat destroyers, the class shortened to destroyer, equipped with rapid-fire guns, torpedoes, and depth charges."
      }
    ],
    number: {
      q: "In what year was the revolutionary all-big-gun battleship HMS Dreadnought officially commissioned into the Royal Navy?",
      target: 1906,
      unit: "year",
      imperial: "1906 AD",
      exp: "HMS Dreadnought was completed in an astonishingly rapid four months of trials and commissioned on December 3, 1906."
    }
  },

  // Cycle 4: Tragic Ocean Liners & The Golden Age of Steam
  {
    mcqs: [
      {
        q: "Which British Olympic-class luxury ocean liner struck an iceberg on the night of April 14, 1912, sinking into the North Atlantic with the loss of over 1,500 lives?",
        correct: "RMS Titanic",
        w1: "RMS Olympic",
        w2: "RMS Britannic",
        exp: "Operated by the White Star Line, Titanic sank on its maiden voyage from Southampton to New York, leading to strict international maritime safety regulations."
      },
      {
        q: "Which British passenger ocean liner was torpedoed and sunk by German submarine U-20 off the coast of Ireland in May 1915, killing 1,198 passengers?",
        correct: "RMS Lusitania",
        w1: "RMS Mauretania",
        w2: "RMS Aquitania",
        exp: "The sinking of the Lusitania contributed heavily to turning American public sentiment against Germany, influencing US entry into World War I."
      },
      {
        q: "Which grand French Art Deco speedliner won the Blue Riband in 1935 with an innovative bulbous bow hull, before tragically catching fire in New York in 1942?",
        correct: "SS Normandie",
        w1: "SS France",
        w2: "SS Île de France",
        exp: "Normandie featured a breathtaking Art Deco grand dining salon and revolutionary turbo-electric propulsion generating over 160,000 horsepower."
      },
      {
        q: "Which Cunard ocean liner served as a high-speed troopship nicknamed the Grey Ghost in World War II, ferrying over 800,000 soldiers across oceans?",
        correct: "RMS Queen Mary",
        w1: "RMS Queen Elizabeth",
        w2: "SS United States",
        exp: "Queen Mary sustained speeds over thirty knots, outrunning enemy U-boats and carrying up to 16,000 troops per crossing."
      },
      {
        q: "Which American ocean liner, introduced in 1952 with secret defense funding, holds the unbroken Blue Riband record for the fastest transatlantic crossing?",
        correct: "SS United States",
        w1: "SS America",
        w2: "SS Independence",
        exp: "Engineered by William Francis Gibbs, the SS United States crossed the Atlantic at an average speed of 35.59 knots (over 65 km/h)."
      }
    ],
    number: {
      q: "In what year did the British luxury liner RMS Titanic sink after striking an iceberg in the North Atlantic?",
      target: 1912,
      unit: "year",
      imperial: "1912 AD",
      exp: "RMS Titanic foundered in the early morning hours of April 15, 1912, at 41 degrees 43 minutes North latitude."
    }
  },

  // Cycle 5: WWII Super-Battleships & Final Gun Duels
  {
    mcqs: [
      {
        q: "What Imperial Japanese Navy flagship was the heaviest and most powerfully armed battleship ever built, mounting nine massive 460 mm main guns?",
        correct: "Battleship Yamato",
        w1: "Battleship Musashi",
        w2: "Battleship Nagato",
        exp: "Displacing over 72,000 metric tons fully loaded, Yamato was sunk by hundreds of American carrier-based dive bombers and torpedo planes in April 1945."
      },
      {
        q: "Which German battleship was hunted down and sunk in the North Atlantic in May 1941 after sinking the British battlecruiser HMS Hood?",
        correct: "Bismarck",
        w1: "Tirpitz",
        w2: "Scharnhorst",
        exp: "A Fairey Swordfish biplane torpedo crippled Bismarck rudder, allowing British battleships King George V and Rodney to close and destroy it."
      },
      {
        q: "On the teak deck of which American Iowa-class battleship in Tokyo Bay did Japan sign the formal surrender documents ending World War II on September 2, 1945?",
        correct: "USS Missouri",
        w1: "USS Iowa",
        w2: "USS New Jersey",
        exp: "General Douglas MacArthur presided over the historic signing ceremony aboard Big Mo in Tokyo Bay."
      },
      {
        q: "Which German pocket battleship was scuttled by its captain outside Montevideo harbor following the 1939 Battle of the River Plate?",
        correct: "Admiral Graf Spee",
        w1: "Admiral Scheer",
        w2: "Deutschland",
        exp: "Captain Hans Langsdorff scuttled the ship believing a superior British force awaited outside the neutral Uruguayan port."
      },
      {
        q: "What was the caliber in inches of the colossal main battery guns mounted on the American Iowa-class fast battleships?",
        correct: "16 inches",
        w1: "14 inches",
        w2: "18 inches",
        exp: "The nine 16-inch 50-caliber Mark 7 guns fired armor-piercing shells weighing up to 1,225 kilograms over a range of thirty-eight kilometers."
      }
    ],
    number: {
      q: "What was the caliber in millimeters of the colossal primary battery guns mounted on the Japanese battleship Yamato?",
      target: 460,
      unit: "mm",
      imperial: "18.1 inches",
      exp: "Yamato mounted nine 460 mm (18.1-inch) Type 94 naval rifles, the largest naval guns ever fitted to any warship in history."
    }
  },

  // Cycle 6: The Aircraft Carrier Revolution
  {
    mcqs: [
      {
        q: "Which Yorktown-class aircraft carrier, nicknamed the Big E, was the most decorated American warship of World War II, earning twenty battle stars?",
        correct: "USS Enterprise",
        w1: "USS Yorktown",
        w2: "USS Hornet",
        exp: "USS Enterprise CV-6 survived the Pearl Harbor raid, fought at Midway, Guadalcanal, and Leyte Gulf, surviving repeated Japanese claims of sinking."
      },
      {
        q: "Which decisive June 1942 naval clash in the central Pacific resulted in the sinking of four Japanese fleet aircraft carriers, turning the tide of the war?",
        correct: "Battle of Midway",
        w1: "Battle of the Coral Sea",
        w2: "Battle of Leyte Gulf",
        exp: "American SBD Dauntless dive bombers struck Akagi, Kaga, Soryu, and Hiryu in catastrophic strikes that crippled Imperial Japanese naval aviation."
      },
      {
        q: "What British aircraft carrier, commissioned in 1924, was the world first ship designed from the keel up as an aircraft carrier?",
        correct: "HMS Hermes",
        w1: "HMS Furious",
        w2: "HMS Ark Royal",
        exp: "HMS Hermes featured an offset island superstructure and a full-length flight deck, setting the standard configuration for all future aircraft carriers."
      },
      {
        q: "Which May 1942 battle was the first naval engagement in history where opposing surface warships never saw or fired directly upon one another?",
        correct: "Battle of the Coral Sea",
        w1: "Battle of Midway",
        w2: "Battle of the Philippine Sea",
        exp: "The entire battle was fought by carrier-based aircraft, halting the Japanese naval advance toward Port Moresby, Papua New Guinea."
      },
      {
        q: "Which British deck innovation, canting the landing strip eight degrees away from the centerline, allowed carriers to launch and recover aircraft simultaneously?",
        correct: "Angled Flight Deck",
        w1: "Optical Landing Mirror",
        w2: "Steam Catapult",
        exp: "The angled deck prevented landing aircraft that missed arrestor wires from crashing into parked planes spotted on the forward deck."
      }
    ],
    number: {
      q: "How many Japanese fleet aircraft carriers were sunk by American naval aviators at the Battle of Midway in 1942?",
      target: 4,
      unit: "aircraft carriers",
      imperial: "4 fleet carriers",
      exp: "All four participating Japanese fleet carriers—Akagi, Kaga, Soryu, and Hiryu—were sunk during the historic battle."
    }
  },

  // Cycle 7: Submarine Genesis & Early Submersibles
  {
    mcqs: [
      {
        q: "Which hand-cranked, egg-shaped wooden submersible, built by David Bushnell in 1776, made the first recorded submarine attack on an enemy warship?",
        correct: "Turtle",
        w1: "Nautilus",
        w2: "Plongeur",
        exp: "Piloted by Ezra Lee, the Turtle attempted to attach a gunpowder time bomb to the hull of British flagship HMS Eagle in New York Harbor."
      },
      {
        q: "Which Confederate hand-cranked submarine in February 1864 became the first submarine in military history to successfully sink an enemy warship in combat?",
        correct: "CSS H. L. Hunley",
        w1: "Pioneer",
        w2: "David",
        exp: "The Hunley detonated a spar torpedo against USS Housatonic off Charleston, South Carolina, but sank during its return voyage."
      },
      {
        q: "Which Irish-American engineer built the Holland 6, purchased by the US Navy in 1900 as its first practical submarine with dual petrol and electric propulsion?",
        correct: "John Philip Holland",
        w1: "Simon Lake",
        w2: "David Bushnell",
        exp: "Holland design combined gasoline combustion engines for surface cruising and electric storage batteries for underwater propulsion."
      },
      {
        q: "What optical periscope system device allows submerged submarine crews to visually scan surface waters while remaining concealed beneath the waves?",
        correct: "Periscope",
        w1: "Bathometer",
        w2: "Sextant",
        exp: "Developed using prisms and optical lenses, periscopes allow visual, electronic, and infrared observation from periscope depth."
      },
      {
        q: "What German term, short for Unterseeboot, became the universal name for the submarine fleet that waged devastating commerce warfare in both World Wars?",
        correct: "U-boat",
        w1: "Schnellboot",
        w2: "Torpedoboot",
        exp: "German U-boats, organized into Wolfpacks under Admiral Karl Dönitz, sank millions of tons of Allied merchant shipping in the Battle of the Atlantic."
      }
    ],
    number: {
      q: "In what year did the Confederate submarine CSS H. L. Hunley sink the USS Housatonic in Charleston Harbor?",
      target: 1864,
      unit: "year",
      imperial: "1864 AD",
      exp: "The CSS H. L. Hunley carried out its historic attack on February 17, 1864, marking the first combat submarine victory."
    }
  },

  // Cycle 8: The Nuclear Submarine Revolution
  {
    mcqs: [
      {
        q: "Which American submarine, commissioned in 1954 under the leadership of Admiral Hyman G. Rickover, was the world first nuclear-powered vessel?",
        correct: "USS Nautilus",
        w1: "USS Seawolf",
        w2: "USS Skate",
        exp: "USS Nautilus famously transmitted Underway on nuclear power in 1955, and in 1958 became the first vessel to cross under the North Pole ice cap."
      },
      {
        q: "Which nuclear submarine made history in 1960 by completing the first submerged circumnavigation of the Earth, following Ferdinand Magellan historic route?",
        correct: "USS Triton",
        w1: "USS Nautilus",
        w2: "USS George Washington",
        exp: "Operation Sandblast covered over 49,000 kilometers in eighty-three days without surfacing, powered by twin nuclear reactors."
      },
      {
        q: "Which Soviet ballistic missile submarine class, known in Russia as Project 941 Akula, was the largest submarine class ever constructed?",
        correct: "Typhoon class",
        w1: "Oscar class",
        w2: "Delta class",
        exp: "Displacing over 48,000 tons submerged, Typhoon-class submarines featured multiple pressure hulls, twenty nuclear ballistic missiles, and an indoor swimming pool."
      },
      {
        q: "Which first-generation submarine-launched ballistic missile system deployed aboard USS George Washington in 1960 established the submarine nuclear deterrent?",
        correct: "Polaris",
        w1: "Poseidon",
        w2: "Trident",
        exp: "Polaris solid-fuel missiles could be launched while submerged, creating an invulnerable second-strike nuclear deterrent during the Cold War."
      },
      {
        q: "The tragic loss of which American nuclear attack submarine in April 1963 with all 129 personnel led directly to the rigorous SUBSAFE quality assurance program?",
        correct: "USS Thresher",
        w1: "USS Scorpion",
        w2: "USS Guitarro",
        exp: "Thresher suffered a piping failure during deep-test diving off Cape Cod, prompting strict structural certifications that prevented subsequent losses."
      }
    ],
    number: {
      q: "In what year was the world first nuclear-powered submarine, USS Nautilus, commissioned into the United States Navy?",
      target: 1954,
      unit: "year",
      imperial: "1954 AD",
      exp: "USS Nautilus SSN-571 was commissioned on September 30, 1954, revolutionizing naval warfare with unlimited underwater endurance."
    }
  },

  // Cycle 9: Modern Supercarriers & Nuclear Surface Fleets
  {
    mcqs: [
      {
        q: "Which class of ten nuclear-powered American aircraft carriers, led by CVN-68 commissioned in 1975, displaces roughly 100,000 metric tons?",
        correct: "Nimitz class",
        w1: "Gerald R. Ford class",
        w2: "Kitty Hawk class",
        exp: "Powered by twin A4W nuclear reactors, Nimitz-class supercarriers operate over eighty combat aircraft with continuous fifty-year lifespans."
      },
      {
        q: "Which new American supercarrier class introduced the Electromagnetic Aircraft Launch System to replace traditional steam-driven catapults?",
        correct: "Gerald R. Ford class",
        w1: "Nimitz class",
        w2: "America class",
        exp: "EMALS uses linear induction motors to accelerate aircraft smoothly, reducing airframe stress and supporting diverse unmanned aerial drones."
      },
      {
        q: "Which flagship aircraft carrier of the French Navy, commissioned in 2001, is the only nuclear-powered aircraft carrier built outside the United States?",
        correct: "Charles de Gaulle",
        w1: "Clemenceau",
        w2: "Foch",
        exp: "The Charles de Gaulle utilizes CATOBAR catapult operations with Rafale M fighters, powered by twin K15 pressurized water nuclear reactors."
      },
      {
        q: "What curved ramp structure on the bow of European and Asian aircraft carriers allows short takeoff combat jets to launch without catapults?",
        correct: "Ski-jump ramp",
        w1: "Catapult track",
        w2: "Arresting gear",
        exp: "Ski-jump ramps convert forward speed into vertical velocity, used on British Queen Elizabeth-class and Indian INS Vikrant carriers."
      },
      {
        q: "What heavy steel wire cables strung across an aircraft carrier flight deck catch an incoming jet tailhook to bring it to a complete halt in two seconds?",
        correct: "Arresting wires",
        w1: "Snubbing cables",
        w2: "Barricade nets",
        exp: "Hydraulic engines beneath the deck absorb the massive kinetic energy of a 250 km/h landing fighter in less than one hundred meters."
      }
    ],
    number: {
      q: "What is the approximate full-load displacement in thousands of metric tons of a US Navy Nimitz-class nuclear supercarrier?",
      target: 100,
      unit: "thousand metric tons",
      imperial: "100,000 tons",
      exp: "A fully loaded Nimitz-class aircraft carrier displaces approximately 100,000 to 104,000 metric tons, spanning 333 meters in length."
    }
  },

  // Cycle 10: Special Naval Vessels & Covert Operations
  {
    mcqs: [
      {
        q: "Which advanced integrated naval weapons system uses phased-array radars and computers to track and destroy hundreds of incoming aerial threats simultaneously?",
        correct: "Aegis Combat System",
        w1: "Phalanx CIWS",
        w2: "Sea Sparrow System",
        exp: "Developed by RCA and the US Navy, Aegis equips Ticonderoga cruisers and Arleigh Burke destroyers with automated fleet defense."
      },
      {
        q: "What specialized deep-sea drillship was secretly constructed by Howard Hughes in 1974 for the CIA to salvage the sunken Soviet submarine K-129?",
        correct: "Hughes Glomar Explorer",
        w1: "Deepsea Challenger",
        w2: "Challenger 2",
        exp: "Project Azorian used a colossal mechanical claw named Clementine to lift sections of the sunken submarine from 5,000 meters depth in the Pacific."
      },
      {
        q: "Which large commercial hovercraft operated regular high-speed passenger and car ferry service across the English Channel from 1968 to 2000?",
        correct: "SR.N4 Mountbatten class",
        w1: "LCAC",
        w2: "Vosper Thornycroft Hovercraft",
        exp: "The British Hovercraft Corporation SR.N4 rode on a cushion of air powered by four gas turbine engines, crossing from Dover to Calais in thirty minutes."
      },
      {
        q: "What type of high-speed marine vessel uses underwater wing-like foils that lift the boat hull completely out of the water at speed to reduce drag?",
        correct: "Hydrofoil",
        w1: "Hovercraft",
        w2: "SWATH vessel",
        exp: "Hydrofoils generate hydrodynamic lift as forward velocity increases, allowing swift passenger travel across choppy coastal waters."
      },
      {
        q: "What modern naval acronym designates remote-controlled or autonomous unmanned surface drone boats used for reconnaissance and maritime strikes?",
        correct: "USV",
        w1: "UAV",
        w2: "UUV",
        exp: "Unmanned Surface Vessels have transformed modern littoral warfare with low visual signatures and satellite remote targeting capabilities."
      }
    ],
    number: {
      q: "In what year did the CIA conduct the covert Project Azorian salvage operation aboard Hughes Glomar Explorer in the central Pacific?",
      target: 1974,
      unit: "year",
      imperial: "1974 AD",
      exp: "Project Azorian executed its deep-sea recovery operation in July and August 1974, recovering portions of the sunken Soviet submarine K-129."
    }
  }
];

buildQuiz({
  id: "naval-ships-maritime-history-60",
  theme: "Historic Ships, Submarines & Naval Engineering",
  title: "Historic Ships, Submarines & Naval Engineering",
  description: "Comprehensive 60-question naval odyssey exploring Age of Sail flagships, ironclad clashes, tragic ocean liners, super-battleships, and nuclear submarines.",
  category: "Tech, Inventions & Engineering",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z"
}, navalCycles);


// =========================================================================
// 14. artificial-intelligence-robotics-60
// Theme: "AI & Robotics: Neural Networks, Humanoids & Automation"
// Category: "Tech, Inventions & Engineering"
// =========================================================================
const aiCycles = [
  // Cycle 1: Foundations & Symbolic AI
  {
    mcqs: [
      {
        q: "At which 1956 summer research workshop at Dartmouth College was the formal term Artificial Intelligence first coined by computer scientist John McCarthy?",
        correct: "Dartmouth Workshop",
        w1: "Macy Conferences",
        w2: "Bletchley Colloquium",
        exp: "Organized by John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon, the workshop founded AI as an academic discipline."
      },
      {
        q: "In his landmark 1950 paper Computing Machinery and Intelligence, which British mathematician proposed the Imitation Game test of machine intelligence?",
        correct: "Alan Turing",
        w1: "Claude Shannon",
        w2: "Norbert Wiener",
        exp: "The Turing Test assesses whether a human interrogator can distinguish conversational text responses of a machine from those of a human."
      },
      {
        q: "Which 1956 computer program, written by Allen Newell, Herbert Simon, and Cliff Shaw, proved mathematical theorems and is celebrated as the first AI program?",
        correct: "Logic Theorist",
        w1: "General Problem Solver",
        w2: "ELIZA",
        exp: "Logic Theorist proved thirty-eight of the first fifty-two theorems in Whitehead and Russell Principia Mathematica using heuristic search."
      },
      {
        q: "Which early 1966 natural language processing chatbot created by Joseph Weizenbaum at MIT simulated a Rogerian psychotherapist?",
        correct: "ELIZA",
        w1: "SHRDLU",
        w2: "PARRY",
        exp: "ELIZA used pattern-matching and script substitution to reflect user statements as questions, creating the illusion of understanding."
      },
      {
        q: "Which 1970s Stanford expert system used a rule-based knowledge engine of 600 rules to identify bacterial blood infections and recommend antibiotics?",
        correct: "MYCIN",
        w1: "DENDRAL",
        w2: "PROSPECTOR",
        exp: "MYCIN demonstrated that symbolic rule-based systems could rival human clinical specialists in narrow diagnostic domains."
      }
    ],
    number: {
      q: "In what year was the historic Dartmouth Summer Research Project on Artificial Intelligence convened in New Hampshire?",
      target: 1956,
      unit: "year",
      imperial: "1956 AD",
      exp: "The Dartmouth workshop was held in July and August 1956, initiating the modern field of artificial intelligence."
    }
  },

  // Cycle 2: Neural Networks & The Perceptron Era
  {
    mcqs: [
      {
        q: "Which American psychologist invented the Perceptron in 1958 at Cornell Aeronautical Laboratory, creating the earliest electronic neural network model?",
        correct: "Frank Rosenblatt",
        w1: "Warren McCulloch",
        w2: "Walter Pitts",
        exp: "Rosenblatt Mark I Perceptron used optical photo-cells and motorized potentiometers to learn pattern recognition."
      },
      {
        q: "Which 1969 book by Marvin Minsky and Seymour Papert proved that single-layer perceptrons could not compute the exclusive-or function, triggering the first AI Winter?",
        correct: "Perceptrons",
        w1: "The Society of Mind",
        w2: "Cybernetics",
        exp: "The mathematical proof that single-layer networks could not solve non-linear XOR problems caused government funding for neural networks to evaporate for a decade."
      },
      {
        q: "Which foundational learning algorithm for training multi-layer neural networks was popularized in a landmark 1986 Nature paper by Rumelhart, Hinton, and Williams?",
        correct: "Backpropagation",
        w1: "Hebbian Learning",
        w2: "Genetic Algorithm",
        exp: "Backpropagation efficiently calculates the gradient of the loss function using the calculus chain rule to update synaptic weights."
      },
      {
        q: "Which recurrent artificial neural network model, invented by physicist John Hopfield in 1982, serves as an associative content-addressable memory system?",
        correct: "Hopfield Network",
        w1: "Boltzmann Machine",
        w2: "Kohonen Map",
        exp: "Hopfield networks guaranteed convergence to local energy minima, bridging statistical physics and computational neuroscience."
      },
      {
        q: "What non-linear mathematical function, such as ReLU or Sigmoid, is applied to a neuron weighted sum to determine whether it should fire?",
        correct: "Activation Function",
        w1: "Loss Function",
        w2: "Cost Matrix",
        exp: "Activation functions introduce non-linearity into neural networks, enabling them to approximate complex multi-dimensional mathematical relationships."
      }
    ],
    number: {
      q: "In what year did David Rumelhart, Geoffrey Hinton, and Ronald Williams publish their seminal Nature paper on the backpropagation algorithm?",
      target: 1986,
      unit: "year",
      imperial: "1986 AD",
      exp: "The landmark paper Learning representations by back-propagating errors was published in Nature on October 9, 1986."
    }
  },

  // Cycle 3: Grandmaster AI Game Milestones
  {
    mcqs: [
      {
        q: "In May 1997, which IBM supercomputer made history by becoming the first computer system to defeat a reigning world chess champion in a standard match?",
        correct: "Deep Blue",
        w1: "Deep Thought",
        w2: "Watson",
        exp: "Deep Blue defeated Garry Kasparov 3.5 to 2.5 in a six-game rematch in New York using custom chess VLSI chips evaluating 200 million positions per second."
      },
      {
        q: "In March 2016, which Google DeepMind AI program defeated legendary 18-time world Go champion Lee Sedol in Seoul, South Korea?",
        correct: "AlphaGo",
        w1: "AlphaZero",
        w2: "AlphaStar",
        exp: "AlphaGo combined deep convolutional policy networks with Monte Carlo Tree Search, famously playing creative Move 37 in Game Two."
      },
      {
        q: "Which IBM question-answering computer system defeated legendary champions Ken Jennings and Brad Rutter on the quiz show Jeopardy in February 2011?",
        correct: "IBM Watson",
        w1: "Deep Blue",
        w2: "DeepQA",
        exp: "Watson analyzed natural language clues, evaluated evidence across four terabytes of structured text, and buzzed in using a robotic finger."
      },
      {
        q: "Which reinforcement learning backgammon program, developed by Gerald Tesauro at IBM in 1992, played at near-master level through self-play?",
        correct: "TD-Gammon",
        w1: "Chinook",
        w2: "Stockfish",
        exp: "TD-Gammon used temporal difference learning to train a neural network without human expert rules, discovering novel opening strategies."
      },
      {
        q: "Which DeepMind system mastered chess, shogi, and Go entirely from scratch in just twenty-four hours using pure reinforcement learning without any human games?",
        correct: "AlphaZero",
        w1: "AlphaGo Zero",
        w2: "AlphaFold",
        exp: "AlphaZero learned exclusively by playing millions of games against itself from raw board rules, convincingly defeating champion engines Stockfish and Elmo."
      }
    ],
    number: {
      q: "In what year did IBM Deep Blue defeat world chess champion Garry Kasparov in their historic six-game match in New York City?",
      target: 1997,
      unit: "year",
      imperial: "1997 AD",
      exp: "Deep Blue defeated Garry Kasparov on May 11, 1997, marking a monumental milestone in artificial intelligence history."
    }
  },

  // Cycle 4: Computer Vision & Convolutional Networks
  {
    mcqs: [
      {
        q: "Which French computer scientist developed the pioneering LeNet-5 convolutional neural network in 1998, reading handwritten zip codes on checks?",
        correct: "Yann LeCun",
        w1: "Geoffrey Hinton",
        w2: "Yoshua Bengio",
        exp: "Yann LeCun utilized spatial weight sharing, convolutional filters, and subsampling pooling layers to recognize characters."
      },
      {
        q: "Which massive visual database of over fourteen million annotated images, organized by Stanford professor Fei-Fei Li in 2009, accelerated modern deep vision?",
        correct: "ImageNet",
        w1: "COCO",
        w2: "MNIST",
        exp: "The annual ImageNet Large Scale Visual Recognition Challenge served as the global benchmark proving ground for modern deep neural network architectures."
      },
      {
        q: "Which deep convolutional network architecture, developed by Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton, crushed the 2012 ImageNet challenge?",
        correct: "AlexNet",
        w1: "VGGNet",
        w2: "GoogLeNet",
        exp: "AlexNet utilized twin Nvidia GPUs, ReLU non-linearities, and dropout regularization, slashing image classification error rates from twenty-six to fifteen percent."
      },
      {
        q: "Which 152-layer deep neural network architecture introduced skip residual connections in 2015, solving the vanishing gradient problem in ultra-deep models?",
        correct: "ResNet",
        w1: "DenseNet",
        w2: "MobileNet",
        exp: "Invented by Kaiming He and Microsoft researchers, ResNet enabled networks over one hundred layers deep to surpass human visual accuracy."
      },
      {
        q: "Which popular real-time object detection algorithm, created by Joseph Redmon in 2015, frames object detection as a single regression problem from full image pixels?",
        correct: "YOLO",
        w1: "Faster R-CNN",
        w2: "SSD",
        exp: "YOLO, short for You Only Look Once, processes images in a single evaluation pass, enabling high-frame-rate real-time video object detection."
      }
    ],
    number: {
      q: "In what year did AlexNet win the ImageNet competition, widely cited as the catalyst for the modern deep learning boom?",
      target: 2012,
      unit: "year",
      imperial: "2012 AD",
      exp: "AlexNet won the ImageNet Large Scale Visual Recognition Challenge in September 2012 by an astonishing 10.8 percentage point margin."
    }
  },

  // Cycle 5: Natural Language Processing & Transformers
  {
    mcqs: [
      {
        q: "Which breakthrough 2017 research paper by Google Brain and Google Research introduced the Transformer architecture based purely on self-attention?",
        correct: "Attention Is All You Need",
        w1: "Deep Residual Learning",
        w2: "Language Models are Few-Shot Learners",
        exp: "Authors Ashish Vaswani, Noam Shazeer, and team replaced recurrent networks with parallel multi-head self-attention mechanisms."
      },
      {
        q: "What attention mechanism in transformers enables the model to weigh the contextual importance of all other words in a sentence when encoding a given word?",
        correct: "Self-Attention",
        w1: "Cross-Entropy",
        w2: "Max Pooling",
        exp: "Self-attention computes query, key, and value dot products across token sequences, capturing distant semantic dependencies across paragraphs."
      },
      {
        q: "Which Google 2018 natural language model used bidirectional transformer encoders to pre-train deep contextualized representations on unlabeled text?",
        correct: "BERT",
        w1: "ELMo",
        w2: "Word2Vec",
        exp: "BERT, short for Bidirectional Encoder Representations from Transformers, set state-of-the-art records across eleven major NLP benchmarks."
      },
      {
        q: "Which 2013 technique developed by Tomas Mikolov at Google mapped words into continuous multi-dimensional vector spaces where semantic relationships are algebraic?",
        correct: "Word2Vec",
        w1: "GloVe",
        w2: "FastText",
        exp: "Word2Vec famously captured semantic analogies in vector space, such as vector King minus vector Man plus vector Woman equaling vector Queen."
      },
      {
        q: "What generative artificial intelligence model family uses autoregressive transformer decoders pre-trained on internet-scale text to generate coherent human text?",
        correct: "GPT",
        w1: "BERT",
        w2: "T5",
        exp: "Generative Pre-trained Transformers predict next-token probabilities sequentially across context windows, demonstrating few-shot learning."
      }
    ],
    number: {
      q: "In what year was the foundational Attention Is All You Need paper published by Google researchers at NeurIPS?",
      target: 2017,
      unit: "year",
      imperial: "2017 AD",
      exp: "The Transformer architecture was published in December 2017, becoming the architectural foundation for all modern large language models."
    }
  },

  // Cycle 6: Pioneers of Robotics & Industrial Automation
  {
    mcqs: [
      {
        q: "Which two American inventors created the Unimate, the world first industrial robotic arm installed at a General Motors factory in 1961?",
        correct: "George Devol and Joseph Engelberger",
        w1: "Victor Scheinman and Marvin Minsky",
        w2: "Rodney Brooks and Marc Raibert",
        exp: "Devol patented the programmable robotic transfer mechanism, while Engelberger founded Unimation, earning the title Father of Robotics."
      },
      {
        q: "Which pioneering mobile robot developed at Stanford Research Institute from 1966 to 1972 was the first robot to integrate vision, navigation, and problem-solving?",
        correct: "Shakey the Robot",
        w1: "Stanford Cart",
        w2: "Freddy II",
        exp: "Shakey used the A-star search algorithm, Hough transforms, and the STRIPS automated planner to navigate rooms and push blocks."
      },
      {
        q: "Which all-electric six-axis articulated robotic arm, designed by Victor Scheinman at Stanford in 1969, established the kinematic design of modern industrial robots?",
        correct: "Stanford Arm",
        w1: "PUMA Arm",
        w2: "SCARA Arm",
        exp: "The Stanford Arm featured six rotary joints driven by electric DC motors, allowing computer control of dexterous assembly tasks."
      },
      {
        q: "Which popular assembly robot design, invented by Hiroshi Makino in 1978, features rigid vertical motion with selective horizontal joint compliance?",
        correct: "SCARA Robot",
        w1: "Delta Robot",
        w2: "Cartesian Gantry Robot",
        exp: "Selective Compliance Assembly Robot Arms are widely used in high-speed electronics assembly for precise pick-and-place insertion."
      },
      {
        q: "Which legendary science fiction author formulated the famous Three Laws of Robotics in his 1942 short story Runaround?",
        correct: "Isaac Asimov",
        w1: "Arthur C. Clarke",
        w2: "Philip K. Dick",
        exp: "Asimov laws dictated that a robot may not injure a human, must obey human orders, and must protect its own existence unless in conflict with the first two laws."
      }
    ],
    number: {
      q: "In what year was the first Unimate industrial robotic arm deployed on an active assembly line at General Motors in Ewing, New Jersey?",
      target: 1961,
      unit: "year",
      imperial: "1961 AD",
      exp: "The hydraulic Unimate arm was installed in 1961 to lift red-hot die-cast door handles and weld them onto auto bodies."
    }
  },

  // Cycle 7: Humanoid Robots & Dynamic Balance
  {
    mcqs: [
      {
        q: "Which iconic white humanoid robot was introduced by Honda in 2000, capable of fluid walking, running, climbing stairs, and greeting dignitaries?",
        correct: "ASIMO",
        w1: "WABOT-1",
        w2: "QRIO",
        exp: "ASIMO, short for Advanced Step in Innovative Mobility, pioneered Zero Moment Point dynamic trajectory balancing during bipedal gait."
      },
      {
        q: "Which Massachusetts engineering robotics company developed the Atlas bipedal humanoid robot and the four-legged Spot quadruped robot?",
        correct: "Boston Dynamics",
        w1: "iRobot",
        w2: "Rethink Robotics",
        exp: "Founded by Marc Raibert as an MIT spinoff, Boston Dynamics achieved breakthroughs in real-time dynamic balance, parkour, and hydraulic control."
      },
      {
        q: "What 1973 robotic project at Waseda University in Japan was the world first full-scale anthropomorphic humanoid robot with limb control and vision?",
        correct: "WABOT-1",
        w1: "HRP-2",
        w2: "E0",
        exp: "WABOT-1 had artificial ears, mouth, and eyes, able to converse in Japanese and walk slowly with two artificial legs."
      },
      {
        q: "What bipedal walking principle, pioneered by Miomir Vukobratović, ensures that dynamic ground reaction forces prevent a robot from tipping over?",
        correct: "Zero Moment Point",
        w1: "Center of Gravity Inversion",
        w2: "Inverted Pendulum Vector",
        exp: "ZMP balance algorithms ensure that the net horizontal inertia and gravity moments around the contact support polygon equal zero."
      },
      {
        q: "What robotic quadruped created by Boston Dynamics for DARPA in 2005 was nicknamed BigDog for carrying heavy military loads across rough terrain?",
        correct: "BigDog",
        w1: "WildCat",
        w2: "Cheetah",
        exp: "BigDog utilized a small go-kart engine and hydraulic actuators, famously recovering its footing on ice when kicked."
      }
    ],
    number: {
      q: "In what year did Honda officially introduce the ASIMO humanoid robot to the public in Tokyo?",
      target: 2000,
      unit: "year",
      imperial: "2000 AD",
      exp: "Honda unveiled ASIMO on November 20, 2000, following fourteen years of secret bipedal humanoid robotics research."
    }
  },

  // Cycle 8: Planetary Rovers & Autonomous Vehicles
  {
    mcqs: [
      {
        q: "Which microwave-oven-sized robotic rover deployed by NASA Mars Pathfinder on July 4, 1997, was the first wheeled vehicle on Mars?",
        correct: "Sojourner",
        w1: "Spirit",
        w2: "Opportunity",
        exp: "Sojourner operated for eighty-three days on the Martian surface, using a rocker-bogie suspension to analyze rock compositions."
      },
      {
        q: "Which one-ton car-sized NASA rover landed in Mars Gale Crater in August 2012 using an audacious rocket-powered sky crane descent stage?",
        correct: "Curiosity",
        w1: "Perseverance",
        w2: "Opportunity",
        exp: "Curiosity discovered chemical evidence of ancient habitable freshwater lakes and organic carbon molecules on early Mars."
      },
      {
        q: "What small robotic coaxial helicopter deployed by NASA Perseverance rover achieved the first powered controlled flight on another planet in 2021?",
        correct: "Ingenuity",
        w1: "Dragonfly",
        w2: "Vinci",
        exp: "Ingenuity completed seventy-two successful flights through the thin Martian atmosphere over nearly three years of operations."
      },
      {
        q: "Which 2005 autonomous vehicle competition organized by DARPA was won by Stanford University robotic Volkswagen Touareg named Stanley?",
        correct: "DARPA Grand Challenge",
        w1: "DARPA Urban Challenge",
        w2: "Indy Autonomous Challenge",
        exp: "Led by Sebastian Thrun, Stanley navigated 212 kilometers of rugged Mojave Desert terrain in under seven hours with zero human intervention."
      },
      {
        q: "What optical remote sensing sensor uses pulsed laser beams to generate precise three-dimensional point clouds of surrounding environments for self-driving cars?",
        correct: "LiDAR",
        w1: "Sonar",
        w2: "Radar",
        exp: "Light Detection and Ranging measures the time-of-flight of millions of laser reflections per second to create high-definition 3D maps."
      }
    ],
    number: {
      q: "In what year did Stanford autonomous car Stanley win the historic DARPA Grand Challenge across the Mojave Desert?",
      target: 2005,
      unit: "year",
      imperial: "2005 AD",
      exp: "Stanley won the DARPA Grand Challenge on October 8, 2005, claiming the two-million-dollar prize and igniting the modern autonomous vehicle industry."
    }
  },

  // Cycle 9: Deep Reinforcement Learning
  {
    mcqs: [
      {
        q: "In machine learning, what framework models an autonomous agent making sequential decisions by interacting with an environment to maximize cumulative reward?",
        correct: "Reinforcement Learning",
        w1: "Supervised Learning",
        w2: "Unsupervised Clustering",
        exp: "Reinforcement learning optimizes policy functions through trial and error, balancing exploration of new strategies with exploitation of known rewards."
      },
      {
        q: "Which mathematical framework forms the formal foundation for reinforcement learning, defined by states, actions, transition probabilities, and rewards?",
        correct: "Markov Decision Process",
        w1: "Bayesian Network",
        w2: "Hidden Markov Model",
        exp: "MDPs assume the Markov property, where future states depend solely on the current state and action rather than historical paths."
      },
      {
        q: "Which model-free reinforcement learning algorithm developed by Chris Watkins in 1989 learns the expected utility of taking a given action in a given state?",
        correct: "Q-Learning",
        w1: "SARSA",
        w2: "Policy Gradient",
        exp: "Q-learning iteratively updates a table or network of Q-values using the Bellman equation to derive optimal action-selection policies."
      },
      {
        q: "Which DeepMind system published in Nature in 2015 learned to play forty-nine Atari 2600 video games at super-human levels using raw pixels as input?",
        correct: "Deep Q-Network",
        w1: "AlphaGo",
        w2: "AlphaStar",
        exp: "DQN combined Q-learning with deep convolutional neural networks and experience replay memory buffers to achieve stable training."
      },
      {
        q: "Which OpenAI system comprising five neural networks defeated world champion esports team OG in the complex video game Dota 2 in 2019?",
        correct: "OpenAI Five",
        w1: "AlphaStar",
        w2: "OpenAI Gym",
        exp: "OpenAI Five played tens of thousands of years of simulated game experience each day using scaled proximal policy optimization algorithms."
      }
    ],
    number: {
      q: "In what year did DeepMind publish its landmark Nature paper Human-level control through deep reinforcement learning demonstrating DQN on Atari?",
      target: 2015,
      unit: "year",
      imperial: "2015 AD",
      exp: "DeepMind published the historic paper on February 26, 2015, featured on the cover of Nature."
    }
  },

  // Cycle 10: AI Paradigms, Safety & Generative Models
  {
    mcqs: [
      {
        q: "What counterintuitive observation in AI states that high-level abstract reasoning is easy for computers, while low-level sensory-motor skills are extremely difficult?",
        correct: "Moravec Paradox",
        w1: "Polanyi Paradox",
        w2: "Amara Law",
        exp: "Hans Moravec noted that a four-year-old child easily perceives faces and walks across a room, skills that require enormous engineering for robots."
      },
      {
        q: "What statistical problem occurs when a machine learning model fits training data too closely, capturing random noise and failing to generalize to new data?",
        correct: "Overfitting",
        w1: "Underfitting",
        w2: "Data Leakage",
        exp: "Overfitting is mitigated using techniques such as dropout, weight decay L2 regularization, cross-validation, and larger training datasets."
      },
      {
        q: "What phenomenon describes when a generative large language model produces convincing, authoritative-sounding text that is completely factually false?",
        correct: "Hallucination",
        w1: "Catastrophic Forgetting",
        w2: "Mode Collapse",
        exp: "Hallucinations occur because probabilistic language models generate statistically likely next tokens without explicit internal ground-truth verification."
      },
      {
        q: "What generative model architecture generates high-fidelity images by learning to reverse a gradual process of adding Gaussian noise to training images?",
        correct: "Diffusion Model",
        w1: "Generative Adversarial Network",
        w2: "Variational Autoencoder",
        exp: "Denoising diffusion probabilistic models underpin modern image generators such as Stable Diffusion, Midjourney, and DALL-E."
      },
      {
        q: "What AI safety challenge seeks to ensure that artificial intelligence systems reliably adhere to human intentions, values, and ethical principles?",
        correct: "AI Alignment Problem",
        w1: "Symbol Grounding Problem",
        w2: "Frame Problem",
        exp: "Alignment research uses methods like Reinforcement Learning from Human Feedback to prevent models from exhibiting deceptive or harmful behaviors."
      }
    ],
    number: {
      q: "In what year did Alan Turing publish Computing Machinery and Intelligence introducing the Imitation Game test in the philosophical journal Mind?",
      target: 1950,
      unit: "year",
      imperial: "1950 AD",
      exp: "Alan Turing published his seminal paper in October 1950, opening with the famous question: Can machines think?"
    }
  }
];

buildQuiz({
  id: "artificial-intelligence-robotics-60",
  theme: "AI & Robotics: Neural Networks, Humanoids & Automation",
  title: "AI & Robotics: Neural Networks, Humanoids & Automation",
  description: "Comprehensive 60-question assessment exploring the Dartmouth workshop, neural network milestones, chess and Go triumphs, computer vision, and robotics history.",
  category: "Tech, Inventions & Engineering",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z"
}, aiCycles);


// =========================================================================
// 15. inventions-that-changed-the-world-60
// Theme: "Revolutionary Inventions That Transformed Humanity"
// Category: "Tech, Inventions & Engineering"
// =========================================================================
const inventionsCycles = [
  // Cycle 1: Ancient & Medieval Revolutions
  {
    mcqs: [
      {
        q: "Which German goldsmith invented the movable metal type printing press in Mainz around 1440, triggering the European printing revolution?",
        correct: "Johannes Gutenberg",
        w1: "Bi Sheng",
        w2: "Peter Schöffer",
        exp: "Gutenberg developed durable lead-tin-antimony alloy type, oil-based ink, and a wooden screw press, printing the famous Gutenberg Bible."
      },
      {
        q: "Which Han Dynasty court official in China is traditionally credited with inventing paper in 105 CE using mulberry bark, rags, and fishing nets?",
        correct: "Cai Lun",
        w1: "Zhang Heng",
        w2: "Shen Kuo",
        exp: "Cai Lun papermaking process spread along the Silk Road to the Islamic world and Europe, replacing bulky bamboo strips and expensive parchment."
      },
      {
        q: "Which essential maritime navigation instrument utilizing a magnetized lodestone needle was first invented in ancient China during the Han Dynasty?",
        correct: "Magnetic Compass",
        w1: "Astrolabe",
        w2: "Sextant",
        exp: "Originally used for geomancy and feng shui, the magnetic compass was adapted for open-ocean maritime navigation by the eleventh century."
      },
      {
        q: "Which explosive chemical mixture of sulfur, charcoal, and potassium nitrate was accidentally discovered by Chinese alchemists in the ninth century?",
        correct: "Gunpowder",
        w1: "Greek Fire",
        w2: "Nitroglycerin",
        exp: "Known in China as huo yao or fire medicine, gunpowder revolutionized siegecraft, rocketry, and global military warfare."
      },
      {
        q: "Which wearable optical device using convex glass lenses to correct presbyopia was invented in Northern Italy in the late thirteenth century?",
        correct: "Eyeglasses",
        w1: "Monocle",
        w2: "Binoculars",
        exp: "Eyeglasses extended the productive working lives of craftsmen, scholars, and copyists, laying the groundwork for microscope and telescope optics."
      }
    ],
    number: {
      q: "In what approximate year did Johannes Gutenberg introduce his movable metal type printing press in Mainz, Germany?",
      target: 1440,
      unit: "year",
      imperial: "c. 1440 AD",
      exp: "Historians date Gutenberg perfection of movable lead alloy type and oil-based ink to roughly 1440, completing the 42-Line Bible by 1455."
    }
  },

  // Cycle 2: The Scientific Revolution & Optical Instruments
  {
    mcqs: [
      {
        q: "Which Dutch lens grinder is celebrated alongside Zacharias Janssen for constructing early compound microscopes and discovering microscopic bacteria?",
        correct: "Antonie van Leeuwenhoek",
        w1: "Robert Hooke",
        w2: "Christiaan Huygens",
        exp: "Antonie van Leeuwenhoek ground single high-power spherical lenses to observe living single-celled organisms, naming them animalcules."
      },
      {
        q: "Which Italian polymath constructed his own astronomical telescope in 1609, discovering four large moons orbiting Jupiter and lunar craters?",
        correct: "Galileo Galilei",
        w1: "Hans Lippershey",
        w2: "Johannes Kepler",
        exp: "Galileo telescope observations provided decisive observational evidence supporting the Copernican heliocentric model of the solar system."
      },
      {
        q: "Which Italian physicist and mathematician invented the mercury barometer in 1643, demonstrating that atmospheric air exerts measurable weight?",
        correct: "Evangelista Torricelli",
        w1: "Blaise Pascal",
        w2: "Otto von Guericke",
        exp: "Torricelli inverted a tube of mercury into a dish, observing that atmospheric pressure supported a column roughly 760 millimeters high."
      },
      {
        q: "Which Dutch scientist patented the first pendulum clock in 1656, dramatically improving timekeeping precision from minutes to seconds per day?",
        correct: "Christiaan Huygens",
        w1: "Robert Boyle",
        w2: "Isaac Newton",
        exp: "Huygens applied Galileo discovery of isochronism to create the first highly accurate mechanical clocks for science and navigation."
      },
      {
        q: "Which English physicist designed the first practical reflecting telescope in 1668, utilizing a curved mirror instead of lenses to eliminate chromatic aberration?",
        correct: "Sir Isaac Newton",
        w1: "James Gregory",
        w2: "John Dollond",
        exp: "The Newtonian telescope utilized a concave parabolic primary mirror and a flat diagonal secondary mirror, the prototype for modern giant observatories."
      }
    ],
    number: {
      q: "In what year did Galileo Galilei first construct his astronomical telescope and turn it toward the night sky?",
      target: 1609,
      unit: "year",
      imperial: "1609 AD",
      exp: "In the autumn of 1609, Galileo built a 20-power telescope and made groundbreaking astronomical discoveries published in Sidereus Nuncius in 1610."
    }
  },

  // Cycle 3: The Steam Age & Industrial Power
  {
    mcqs: [
      {
        q: "Which Scottish engineer revolutionized the steam engine in 1769 by adding a separate condenser chamber to prevent cylinder heat loss?",
        correct: "James Watt",
        w1: "Thomas Newcomen",
        w2: "Thomas Savery",
        exp: "Watt separate condenser reduced coal consumption by seventy-five percent, transforming steam engines from mine pumps into universal factory drives."
      },
      {
        q: "Which English ironmonger built the world first practical commercial atmospheric steam engine in 1712 to pump water out of flooded coal mines?",
        correct: "Thomas Newcomen",
        w1: "James Watt",
        w2: "Matthew Boulton",
        exp: "The Newcomen engine used atmospheric pressure acting on a vacuum created by condensing steam within the main cylinder."
      },
      {
        q: "Which British steam locomotive built by George and Robert Stephenson won the 1829 Rainhill Trials, setting the standard for railway transport?",
        correct: "Stephenson Rocket",
        w1: "Locomotion No 1",
        w2: "Puffing Billy",
        exp: "The Rocket utilized a multi-tubular boiler and direct blast pipe, achieving a top speed of 47 km/h on the Liverpool and Manchester Railway."
      },
      {
        q: "Which American inventor patented the mechanical cotton gin in 1793, dramatically accelerating the separation of cotton fibers from seeds?",
        correct: "Eli Whitney",
        w1: "Cyrus McCormick",
        w2: "Samuel Slater",
        exp: "Whitney cotton gin could clean fifty times more cotton per day than hand labor, unintentionally expanding plantation slavery across the American South."
      },
      {
        q: "Which multi-spindle spinning frame, invented by James Hargreaves in 1764, mechanized yarn production at the dawn of the Industrial Revolution?",
        correct: "Spinning Jenny",
        w1: "Water Frame",
        w2: "Spinning Mule",
        exp: "The Spinning Jenny allowed a single worker to spin eight or more spools of cotton thread simultaneously, revolutionizing textile mills."
      }
    ],
    number: {
      q: "In what year did James Watt receive his foundational patent for the separate condenser steam engine?",
      target: 1769,
      unit: "year",
      imperial: "1769 AD",
      exp: "Watt was granted British Patent No. 913 in January 1769 for A New Invented Method of Lessening the Consumption of Steam and Fuel in Fire Engines."
    }
  },

  // Cycle 4: The Electrical Dawn & Power
  {
    mcqs: [
      {
        q: "Which Italian physicist invented the voltaic pile in 1800, creating the world first chemical battery capable of delivering a continuous electrical current?",
        correct: "Alessandro Volta",
        w1: "Luigi Galvani",
        w2: "André-Marie Ampère",
        exp: "Volta stacked alternating zinc and copper discs separated by brine-soaked cloth, disproving Galvani animal electricity theory."
      },
      {
        q: "Which English scientist discovered electromagnetic induction in 1831, proving that moving a magnet through a wire coil generates electric current?",
        correct: "Michael Faraday",
        w1: "James Clerk Maxwell",
        w2: "Hans Christian Ørsted",
        exp: "Faraday discovery provided the fundamental physical principle for all modern electric power generators, dynamos, and electric motors."
      },
      {
        q: "Which American inventor developed a commercially viable long-lasting incandescent light bulb in 1879 using a carbonized bamboo filament?",
        correct: "Thomas Edison",
        w1: "Nikola Tesla",
        w2: "Alexander Lodygin",
        exp: "Edison Menlo Park laboratory created an evacuated glass bulb that burned for over 1,200 hours, pairing it with a centralized DC power grid."
      },
      {
        q: "Which Serbian-American visionary invented the alternating current induction motor and polyphase power transmission system in 1887?",
        correct: "Nikola Tesla",
        w1: "George Westinghouse",
        w2: "Thomas Edison",
        exp: "Tesla licensed his AC patents to George Westinghouse, defeating Edison direct current system in the historic War of the Currents."
      },
      {
        q: "Which electrical device invented by William Stanley in 1885 stepped AC voltage up for efficient long-distance transmission and down for safe domestic use?",
        correct: "Electrical Transformer",
        w1: "Capacitor",
        w2: "Rotary Converter",
        exp: "Transformers enabled power stations at Niagara Falls to transmit alternating current electricity across hundreds of kilometers with minimal line losses."
      }
    ],
    number: {
      q: "In what year did Alessandro Volta invent the voltaic pile, the world first chemical electric battery?",
      target: 1800,
      unit: "year",
      imperial: "1800 AD",
      exp: "Alessandro Volta described his breakthrough battery in a letter to the Royal Society of London in March 1800."
    }
  },

  // Cycle 5: Long-Distance Telecommunication
  {
    mcqs: [
      {
        q: "Which American portrait painter and inventor developed the commercial single-wire electric telegraph and a universal dot-and-dash signaling code in the 1830s?",
        correct: "Samuel Morse",
        w1: "William Fothergill Cooke",
        w2: "Charles Wheatstone",
        exp: "Morse transmitted the famous first telegraph message What hath God wrought from Washington to Baltimore on May 24, 1844."
      },
      {
        q: "Which Scottish-born inventor was granted US Patent No. 174,465 in March 1876 for the electric telephone, transmitting speech over wire?",
        correct: "Alexander Graham Bell",
        w1: "Elisha Gray",
        w2: "Antonio Meucci",
        exp: "Bell transmitted the first intelligible voice transmission to assistant Thomas Watson with the words: Mr. Watson, come here, I want to see you."
      },
      {
        q: "Which American financier and British engineers completed the first enduring transatlantic telegraph cable across the ocean floor in 1866?",
        correct: "Cyrus West Field",
        w1: "Lord Kelvin",
        w2: "Isambard Kingdom Brunel",
        exp: "Brunel giant steamship SS Great Eastern successfully laid 3,000 kilometers of telegraph cable between Ireland and Newfoundland."
      },
      {
        q: "Which Italian electrical engineer developed practical wireless radio telegraphy, transmitting the first transatlantic radio signal across the Atlantic in 1901?",
        correct: "Guglielmo Marconi",
        w1: "Heinrich Hertz",
        w2: "Nikola Tesla",
        exp: "Marconi transmitted the Morse code letter S across 3,500 kilometers from Poldhu, Cornwall, to Signal Hill in St. John, Newfoundland."
      },
      {
        q: "What electro-mechanical typewriter machine connected to telegraph lines allowed direct text communication between offices across the global Telex network?",
        correct: "Teleprinter",
        w1: "Mimeograph",
        w2: "Dictaphone",
        exp: "Teleprinters automated commercial communications and news wire services from the 1920s until the advent of email and computerized networks."
      }
    ],
    number: {
      q: "In what year was Alexander Graham Bell granted the US patent for the electric telephone?",
      target: 1876,
      unit: "year",
      imperial: "1876 AD",
      exp: "Bell was awarded US Patent No. 174,465 on March 7, 1876, often called the most valuable patent in history."
    }
  },

  // Cycle 6: Medical Transformations & Life Savers
  {
    mcqs: [
      {
        q: "Which English country physician developed the smallpox vaccine in 1796 using cowpox blister fluid, creating the first vaccine in human history?",
        correct: "Edward Jenner",
        w1: "Louis Pasteur",
        w2: "Robert Koch",
        exp: "Jenner inoculated eight-year-old James Phipps with cowpox, demonstrating immunity to smallpox and leading to global eradication in 1980."
      },
      {
        q: "Which Scottish bacteriologist discovered penicillin in September 1928 when mold contaminated a Staphylococcus culture plate at St. Mary Hospital?",
        correct: "Alexander Fleming",
        w1: "Howard Florey",
        w2: "Ernst Chain",
        exp: "Fleming observed that Penicillium notatum mold secreted a substance that dissolved surrounding bacteria, launching the antibiotic era."
      },
      {
        q: "Which German mechanical engineer and physicist discovered invisible penetrating electromagnetic radiation in 1895, naming them X-rays?",
        correct: "Wilhelm Conrad Röntgen",
        w1: "Henri Becquerel",
        w2: "Marie Curie",
        exp: "Röntgen produced the first medical X-ray radiograph of his wife Anna Bertha hand, winning the inaugural Nobel Prize in Physics in 1901."
      },
      {
        q: "Which British surgeon introduced carbolic acid antiseptics in 1867 to clean surgical wounds and instruments, dramatically reducing hospital gangrene?",
        correct: "Joseph Lister",
        w1: "Ignaz Semmelweis",
        w2: "John Snow",
        exp: "Applying Louis Pasteur germ theory, Lister antiseptic surgical protocols transformed surgery from a deadly gamble into a safe medical specialty."
      },
      {
        q: "Which American dentist performed the first successful public demonstration of diethyl ether surgical anesthesia in October 1846 in Boston?",
        correct: "William T. G. Morton",
        w1: "Horace Wells",
        w2: "Crawford Long",
        exp: "Morton demonstrated painless tumor excision in the Ether Dome at Massachusetts General Hospital, ending centuries of agony during operations."
      }
    ],
    number: {
      q: "In what year did Alexander Fleming make his serendipitous discovery of penicillin at St. Mary Hospital in London?",
      target: 1928,
      unit: "year",
      imperial: "1928 AD",
      exp: "Fleming noticed the antibiotic halo around Penicillium mold on September 28, 1928, later sharing the 1945 Nobel Prize with Florey and Chain."
    }
  },

  // Cycle 7: Chemical Revolutions & Modern Metallurgy
  {
    mcqs: [
      {
        q: "Which English engineer patented an industrial process in 1856 to mass-produce cheap steel by blasting air through molten pig iron to burn off carbon?",
        correct: "Henry Bessemer",
        w1: "William Siemens",
        w2: "Andrew Carnegie",
        exp: "The Bessemer Process dropped steel manufacturing costs by eighty percent, enabling the rapid construction of skyscrapers, bridges, and railways."
      },
      {
        q: "Which chemical breakthrough developed in Germany by Fritz Haber and Carl Bosch in 1909 synthesizes ammonia fertilizer directly from atmospheric nitrogen?",
        correct: "Haber-Bosch Process",
        w1: "Ostwald Process",
        w2: "Solvay Process",
        exp: "The Haber-Bosch process provides synthetic agricultural nitrogen fertilizer that sustains nearly half of the modern global human population."
      },
      {
        q: "Which American self-taught chemist discovered how to vulcanize rubber in 1839 by heating natural latex with sulfur, making it stable in heat and cold?",
        correct: "Charles Goodyear",
        w1: "Thomas Hancock",
        w2: "John Dunlop",
        exp: "Goodyear vulcanization process transformed sticky natural sap into a tough, waterproof elastic material essential for pneumatic vehicle tires."
      },
      {
        q: "Which Belgian-American chemist invented Bakelite in 1907, the world first fully synthetic thermosetting plastic formed from phenol and formaldehyde?",
        correct: "Leo Baekeland",
        w1: "Wallace Carothers",
        w2: "Stephanie Kwolek",
        exp: "Bakelite was non-conductive, heat-resistant, and easily molded, used in early telephones, radio casings, and electrical insulators."
      },
      {
        q: "Which Swedish chemist invented dynamite in 1867 by absorbing volatile liquid nitroglycerin into porous diatomaceous earth?",
        correct: "Alfred Nobel",
        w1: "Ascanio Sobrero",
        w2: "Jöns Jacob Berzelius",
        exp: "Nobel dynamite provided a safe, malleable blasting explosive that revolutionized tunnel engineering, later using his fortune to fund the Nobel Prizes."
      }
    ],
    number: {
      q: "In what year did Alfred Nobel patent dynamite as a safe blasting explosive in Sweden and Great Britain?",
      target: 1867,
      unit: "year",
      imperial: "1867 AD",
      exp: "Alfred Nobel was granted the British patent for dynamite in May 1867, manufacturing millions of sticks for worldwide infrastructure blasting."
    }
  },

  // Cycle 8: Sound, Cinema & Broadcasting
  {
    mcqs: [
      {
        q: "Which 1877 invention by Thomas Edison was the first device capable of both recording and reproducing human speech using embossed tin foil cylinders?",
        correct: "Phonograph",
        w1: "Gramophone",
        w2: "Graphophone",
        exp: "Edison recorded the nursery rhyme Mary had a little lamb, opening the door to the global commercial music recording industry."
      },
      {
        q: "Which French brothers patented the Cinématographe in 1895, hosting the world first commercial projected motion picture screening in Paris?",
        correct: "Auguste and Louis Lumière",
        w1: "Thomas Edison and W. K. L. Dickson",
        w2: "Georges Méliès and Alice Guy-Blaché",
        exp: "The Lumière brothers projected short films including Workers Leaving the Lumière Factory at the Grand Café in Paris in December 1895."
      },
      {
        q: "Which American teenage prodigy conceived the image dissector tube in 1921 and transmitted the first all-electronic television image in September 1927?",
        correct: "Philo Farnsworth",
        w1: "Vladimir Zworykin",
        w2: "John Logie Baird",
        exp: "Philo Farnsworth transmitted a moving image of a straight line, successfully defending his seminal television patents against RCA."
      },
      {
        q: "Which Danish engineer invented magnetic wire recording in 1898, which evolved into magnetic tape recording used in cassettes and computer storage?",
        correct: "Valdemar Poulsen",
        w1: "Fritz Pfleumer",
        w2: "Jack Mullin",
        exp: "Poulsen Telegraphone recorded sound magnetically on steel wire, refined by German chemical firm BASF into iron-oxide-coated plastic tape."
      },
      {
        q: "Which German physicist invented the cathode-ray tube oscilloscope in 1897, which became the fundamental display screen for twentieth-century televisions?",
        correct: "Karl Ferdinand Braun",
        w1: "Heinrich Hertz",
        w2: "Wilhelm Röntgen",
        exp: "Braun focused an electron beam onto a fluorescent phosphor screen, sharing the 1909 Nobel Prize in Physics with Guglielmo Marconi."
      }
    ],
    number: {
      q: "In what year did Philo Farnsworth successfully transmit the world first all-electronic television image in his San Francisco laboratory?",
      target: 1927,
      unit: "year",
      imperial: "1927 AD",
      exp: "Philo Farnsworth transmitted the electronic line image on September 7, 1927, at his laboratory on Green Street in San Francisco."
    }
  },

  // Cycle 9: Modern Household & Everyday Inventions
  {
    mcqs: [
      {
        q: "Which German engineer developed the industrial vapor-compression ammonia refrigeration machine in 1876, revolutionizing food preservation?",
        correct: "Carl von Linde",
        w1: "Ferdinand Carré",
        w2: "Willis Carrier",
        exp: "Linde mechanical refrigeration ended reliance on harvested natural lake ice, enabling refrigerated railway cars and domestic refrigerators."
      },
      {
        q: "Which Raytheon engineer accidentally discovered microwave cooking in 1945 when an active radar magnetron tube melted a chocolate bar in his pocket?",
        correct: "Percy Spencer",
        w1: "Robert Watson-Watt",
        w2: "John Randall",
        exp: "Spencer tested his discovery on popcorn kernels and an egg, leading Raytheon to introduce the bulky commercial Radarange oven in 1947."
      },
      {
        q: "Which Hungarian journalist patented the modern ballpoint pen in 1938, using quick-drying printer ink and a tiny rotating ball bearing in the socket tip?",
        correct: "László Bíró",
        w1: "John J. Loud",
        w2: "Marcel Bich",
        exp: "The Bíró pen did not leak or smudge at high altitudes, adopted widely by British Royal Air Force pilots during World War II."
      },
      {
        q: "Which Swedish-American electrical engineer designed the modern interlocking metal-tooth zipper in 1913, patented as the Hookless Fastener?",
        correct: "Gideon Sundback",
        w1: "Whitcomb Judson",
        w2: "Elias Howe",
        exp: "Sundback doubled the teeth per inch and created nesting scoops, adopted on military boots and popularized by B.F. Goodrich rubber galoshes."
      },
      {
        q: "Which American traveling salesman invented the safety razor with inexpensive disposable stamped steel double-edge blades in 1901?",
        correct: "King Camp Gillette",
        w1: "William Nickerson",
        w2: "Jacob Schick",
        exp: "Gillette partnered with machinist William Nickerson to mass-produce razor-sharp sheet steel blades, pioneering the razor-and-blades business model."
      }
    ],
    number: {
      q: "In what year did Percy Spencer patent the radar-derived microwave cooking oven after his serendipitous magnetron discovery?",
      target: 1945,
      unit: "year",
      imperial: "1945 AD",
      exp: "Percy Spencer filed the patent for treating foodstuffs with high-frequency radar microwaves on October 8, 1945."
    }
  },

  // Cycle 10: Digital, Optical & Energy Milestones
  {
    mcqs: [
      {
        q: "Which three scientists were awarded the 2019 Nobel Prize in Chemistry for developing the rechargeable lithium-ion battery that powers laptops and electric vehicles?",
        correct: "John Goodenough, Stanley Whittingham, and Akira Yoshino",
        w1: "Robert Noyce, Jack Kilby, and Gordon Moore",
        w2: "Paul Lauterbur, Peter Mansfield, and Raymond Damadian",
        exp: "Whittingham created the first functional lithium battery, Goodenough developed high-voltage cobalt cathodes, and Yoshino made it safe with petroleum coke anodes."
      },
      {
        q: "In 1954, which research team at Bell Labs constructed the first practical silicon photovoltaic solar cell capable of converting sunlight into electricity?",
        correct: "Daryl Chapin, Calvin Fuller, and Gerald Pearson",
        w1: "John Bardeen, Walter Brattain, and William Shockley",
        w2: "Russell Ohl, Charles Fritts, and Edmond Becquerel",
        exp: "The Bell Solar Battery achieved six percent efficiency using p-n junction silicon wafers, powering Vanguard 1 satellite in 1958."
      },
      {
        q: "Which Hughes Research Laboratories physicist built the world first operating laser in May 1960 using a synthetic ruby crystal and a flashbulb?",
        correct: "Theodore Maiman",
        w1: "Charles Townes",
        w2: "Arthur Schawlow",
        exp: "Maiman ruby laser emitted a concentrated beam of coherent red light at 694.3 nanometers, opening optics to telecommunications and surgery."
      },
      {
        q: "What supermarket item, scanned at a Marsh Supermarket in Troy, Ohio, on June 26, 1974, was the first product ever purchased using a Universal Product Code barcode?",
        correct: "Pack of Wrigley Chewing Gum",
        w1: "Can of Campbell Soup",
        w2: "Box of Kellogg Corn Flakes",
        exp: "Invented by Norman Joseph Woodland and engineered by George Laurer at IBM, UPC barcodes transformed retail inventory and checkout automation."
      },
      {
        q: "What satellite-based radio navigation system, developed by the US Department of Defense and initiated in 1973, provides precise global positioning to civilian devices?",
        correct: "Global Positioning System",
        w1: "GLONASS",
        w2: "Galileo",
        exp: "GPS utilizes a constellation of at least twenty-four satellites with onboard atomic clocks, calculating user location through trilateration."
      }
    ],
    number: {
      q: "In what year was the first commercial rechargeable lithium-ion battery released onto the consumer market by Sony and Asahi Kasei?",
      target: 1991,
      unit: "year",
      imperial: "1991 AD",
      exp: "Sony commercialized Akira Yoshino safe lithium-ion battery in 1991, powering portable camcorders, mobile phones, and laptops."
    }
  }
];

buildQuiz({
  id: "inventions-that-changed-the-world-60",
  theme: "Revolutionary Inventions That Transformed Humanity",
  title: "Revolutionary Inventions That Transformed Humanity",
  description: "Comprehensive 60-question chronological exploration of epoch-defining human breakthroughs from the printing press and steam engine to antibiotics and the transistor.",
  category: "Tech, Inventions & Engineering",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z"
}, inventionsCycles);


// =========================================================================
// 16. spacecraft-rockets-missions-60
// Theme: "Spacecraft & Rocket Engineering: Apollo to Artemis"
// Category: "Tech, Inventions & Engineering"
// =========================================================================
const spaceCycles = [
  // Cycle 1: Rocketry Pioneers & Theoretical Roots
  {
    mcqs: [
      {
        q: "Which Russian schoolteacher and scientist formulated the ideal rocket equation in 1903 and proposed multi-stage liquid-fueled space exploration?",
        correct: "Konstantin Tsiolkovsky",
        w1: "Robert Goddard",
        w2: "Hermann Oberth",
        exp: "Tsiolkovsky famously wrote: Earth is the cradle of humanity, but mankind cannot stay in the cradle forever."
      },
      {
        q: "Which American physicist launched the world first liquid-fueled rocket from an orchard in Auburn, Massachusetts, on March 16, 1926?",
        correct: "Robert H. Goddard",
        w1: "Konstantin Tsiolkovsky",
        w2: "Theodore von Kármán",
        exp: "Goddard rocket burned liquid oxygen and gasoline, flying 12.5 meters high over 2.5 seconds, proving liquid propulsion was feasible."
      },
      {
        q: "Which Austro-Hungarian born German rocketry pioneer published The Rocket into Planetary Space in 1923 and mentored Wernher von Braun?",
        correct: "Hermann Oberth",
        w1: "Eugen Sänger",
        w2: "Max Valier",
        exp: "Oberth established the mathematical and thermodynamic feasibility of human spaceflight and served as scientific advisor on Fritz Lang film Woman in the Moon."
      },
      {
        q: "Which German aerospace engineer directed the development of the V-2 ballistic rocket at Peenemünde and later designed the Saturn V Moon rocket for NASA?",
        correct: "Wernher von Braun",
        w1: "Walter Dornberger",
        w2: "Hermann Oberth",
        exp: "Von Braun surrendered to American forces in 1945 under Operation Paperclip, becoming the first director of NASA Marshall Space Flight Center."
      },
      {
        q: "What fundamental aerospace metric measured in seconds represents the thrust produced per unit weight of propellant consumed per second by a rocket engine?",
        correct: "Specific Impulse",
        w1: "Thrust-to-Weight Ratio",
        w2: "Delta-V",
        exp: "Specific impulse Isp measures engine fuel efficiency; hydrolox engines achieve around 450 seconds compared to 310 seconds for kerolox engines."
      }
    ],
    number: {
      q: "In what year did Robert H. Goddard launch the world first liquid-fueled rocket in Massachusetts?",
      target: 1926,
      unit: "year",
      imperial: "1926 AD",
      exp: "Goddard launched the ten-foot liquid oxygen and gasoline rocket on March 16, 1926, establishing the birth of modern liquid rocketry."
    }
  },

  // Cycle 2: Dawn of the Space Age
  {
    mcqs: [
      {
        q: "On October 4, 1957, which polished aluminum sphere launched by the Soviet Union became the first artificial satellite to orbit Earth?",
        correct: "Sputnik 1",
        w1: "Sputnik 2",
        w2: "Vanguard 1",
        exp: "Sputnik 1 beeped radio signals on 20 and 40 MHz for twenty-one days, sparking the Cold War Space Race and the creation of NASA."
      },
      {
        q: "Which first successful American satellite, launched in January 1958 aboard a Juno I rocket, discovered the magnetic radiation belts encircling Earth?",
        correct: "Explorer 1",
        w1: "Vanguard 1",
        w2: "Score",
        exp: "Designed under William Pickering and James Van Allen, Explorer 1 cosmic ray detector identified the Van Allen radiation belts."
      },
      {
        q: "Which Soviet cosmonaut made history on April 12, 1961, by becoming the first human in space, completing a single 108-minute orbit aboard Vostok 1?",
        correct: "Yuri Gagarin",
        w1: "Gherman Titov",
        w2: "Alexei Leonov",
        exp: "Gagarin uttered his famous exclamation Poyekhali (Let us go!) as his Vostok rocket lifted off from Baikonur Cosmodrome."
      },
      {
        q: "Who became the first American in space on May 5, 1961, completing a 15-minute suborbital flight aboard the Mercury capsule Freedom 7?",
        correct: "Alan Shepard",
        w1: "John Glenn",
        w2: "Gus Grissom",
        exp: "Alan Shepard launched on a Redstone rocket to an altitude of 187 kilometers, later walking on the Moon as commander of Apollo 14 in 1971."
      },
      {
        q: "Which astronaut became the first American to orbit the Earth, circling the globe three times aboard Friendship 7 on February 20, 1962?",
        correct: "John Glenn",
        w1: "Scott Carpenter",
        w2: "Wally Schirra",
        exp: "John Glenn flight restored American parity in the Space Race, verified by mathematician Katherine Johnson orbital trajectory calculations."
      }
    ],
    number: {
      q: "In what year did the Soviet Union launch Sputnik 1 into orbit, inaugurating the Space Age?",
      target: 1957,
      unit: "year",
      imperial: "1957 AD",
      exp: "Sputnik 1 was launched from Site No. 1 at Baikonur Cosmodrome on October 4, 1957."
    }
  },

  // Cycle 3: Project Apollo & The Lunar Landings
  {
    mcqs: [
      {
        q: "What colossal three-stage 111-meter rocket developed by NASA generated 7.5 million pounds of liftoff thrust to propel Apollo astronauts to the Moon?",
        correct: "Saturn V",
        w1: "Titan IIIC",
        w2: "Nova",
        exp: "The Saturn V remains the only rocket to carry humans beyond low Earth orbit, achieving thirteen successful launches with zero flight losses."
      },
      {
        q: "On July 20, 1969, which two Apollo 11 astronauts landed the Lunar Module Eagle on the Moon at the Sea of Tranquility?",
        correct: "Neil Armstrong and Buzz Aldrin",
        w1: "Neil Armstrong and Michael Collins",
        w2: "Buzz Aldrin and Pete Conrad",
        exp: "Neil Armstrong proclaimed: That is one small step for man, one giant leap for mankind, as he stepped onto the lunar regolith."
      },
      {
        q: "Which Apollo mission in December 1968 was the first crewed spacecraft to leave Earth orbit and orbit the Moon, capturing the famous Earthrise photograph?",
        correct: "Apollo 8",
        w1: "Apollo 7",
        w2: "Apollo 9",
        exp: "Astronauts Frank Borman, Jim Lovell, and Bill Anders orbited the Moon ten times on Christmas Eve 1968, reading from the Book of Genesis."
      },
      {
        q: "Which Apollo spacecraft component, built by Grumman on Long Island, consisted of a descent stage that remained on the lunar surface and an ascent stage to return crew to orbit?",
        correct: "Lunar Module",
        w1: "Command Module",
        w2: "Service Module",
        exp: "The fragile, un-aerodynamic Lunar Module operated exclusively in the vacuum of space, landing twelve astronauts on the Moon."
      },
      {
        q: "Which dramatic 1970 lunar mission suffered an oxygen tank explosion en route to the Moon, returning its crew safely using the Lunar Module as a lifeboat?",
        correct: "Apollo 13",
        w1: "Apollo 12",
        w2: "Apollo 14",
        exp: "Commander Jim Lovell, Jack Swigert, and Fred Haise survived through brilliant improvisations by NASA Mission Control in Houston."
      }
    ],
    number: {
      q: "In what year did Neil Armstrong and Buzz Aldrin make history by landing on the surface of the Moon during the Apollo 11 mission?",
      target: 1969,
      unit: "year",
      imperial: "1969 AD",
      exp: "The Apollo 11 Lunar Module Eagle touched down on the lunar surface on July 20, 1969, at 20:17 UTC."
    }
  },

  // Cycle 4: Lunar Hardware & Apollo Science
  {
    mcqs: [
      {
        q: "What battery-powered electric vehicle, built by Boeing and General Motors, was driven across the lunar surface on Apollo 15, 16, and 17?",
        correct: "Lunar Roving Vehicle",
        w1: "Lunar Prospector",
        w2: "Moon Buggy Mark II",
        exp: "The Lunar Rover allowed astronauts to traverse tens of kilometers across craters and mountain rilles, with woven piano-wire mesh tires."
      },
      {
        q: "What colossal rocket engine, five of which powered the Saturn V first stage, produced 1.5 million pounds of thrust each using liquid oxygen and kerosene?",
        correct: "Rocketdyne F-1",
        w1: "Rocketdyne J-2",
        w2: "Aerojet AJ-10",
        exp: "The F-1 engine remains the most powerful single-combustion-chamber liquid-propellant rocket engine ever flown."
      },
      {
        q: "Which conical Apollo spacecraft module was the only component equipped with a heat shield and parachutes to return the three astronauts through Earth atmosphere?",
        correct: "Command Module",
        w1: "Service Module",
        w2: "Lunar Module Ascent Stage",
        exp: "The Command Module entered Earth atmosphere at 40,000 km/h, protected by an ablative AVCOAT heat shield reaching 2,760 degrees Celsius."
      },
      {
        q: "Who was the Apollo 17 commander who in December 1972 became the last human being to walk on the surface of the Moon?",
        correct: "Eugene Cernan",
        w1: "Harrison Schmitt",
        w2: "Alan Bean",
        exp: "Eugene Cernan left his daughter initials in the lunar dust before stepping onto the ladder, concluding the Apollo lunar landings."
      },
      {
        q: "How many total American astronauts have walked on the surface of the Moon across the six successful Apollo lunar landing missions?",
        correct: "12",
        w1: "10",
        w2: "14",
        exp: "Two astronauts walked on the Moon on each of Apollo 11, 12, 14, 15, 16, and 17, totaling twelve moonwalkers."
      }
    ],
    number: {
      q: "How many total human beings have walked on the surface of the Moon in all of human history?",
      target: 12,
      unit: "astronauts",
      imperial: "12 moonwalkers",
      exp: "Exactly 12 NASA astronauts walked on the Moon between July 1969 and December 1972 during the Apollo program."
    }
  },

  // Cycle 5: Space Shuttle Era & Reusable Flight
  {
    mcqs: [
      {
        q: "Which orbiter flew the historic maiden flight of the NASA Space Shuttle program, STS-1, on April 12, 1981, piloted by John Young and Bob Crippen?",
        correct: "Space Shuttle Columbia",
        w1: "Space Shuttle Challenger",
        w2: "Space Shuttle Discovery",
        exp: "STS-1 was the first time in history that a brand-new crewed spacecraft was launched on its maiden orbital flight without prior uncrewed orbital tests."
      },
      {
        q: "What reusable solid-propellant rockets flanking the Space Shuttle external tank provided seventy percent of liftoff thrust before parachuting into the ocean?",
        correct: "Solid Rocket Boosters",
        w1: "Liquid Fuel Boosters",
        w2: "Auxiliary Thrust Pods",
        exp: "The twin SRBs burned ammonium perchlorate composite propellant for two minutes, recovered by retrieval ships for refurbishment and reuse."
      },
      {
        q: "What thermal protection system material, composed of over twenty-four thousand silica ceramic tiles, shielded the Space Shuttle from 1,650 degrees reentry heat?",
        correct: "Silica Ceramic Tiles",
        w1: "Ablative Cork Resin",
        w2: "Titanium Honeycomb",
        exp: "The black High-Temperature Reusable Surface Insulation tiles dissipated orbital kinetic heat so efficiently they could be picked up bare-handed seconds after heating."
      },
      {
        q: "Which 15-meter robotic arm developed by Canada was mounted in the Shuttle payload bay to deploy, repair, and capture satellites and ISS modules?",
        correct: "Canadarm",
        w1: "Dextre",
        w2: "Robonaut",
        exp: "Built by SPAR Aerospace, the Canadarm operated on ninety Space Shuttle missions, famously capturing the Hubble Space Telescope during servicing missions."
      },
      {
        q: "Which Space Shuttle orbiter holds the record for the most spaceflights in history, completing thirty-nine successful missions between 1984 and 2011?",
        correct: "Space Shuttle Discovery",
        w1: "Space Shuttle Atlantis",
        w2: "Space Shuttle Endeavour",
        exp: "Discovery deployed the Hubble Space Telescope, carried John Glenn back to space in 1998, and flew both Return to Flight recovery missions."
      }
    ],
    number: {
      q: "In what year did the Space Shuttle program make its first orbital launch with the STS-1 mission of Columbia?",
      target: 1981,
      unit: "year",
      imperial: "1981 AD",
      exp: "Space Shuttle Columbia launched on STS-1 on April 12, 1981, exactly twenty years to the day after Yuri Gagarin flight."
    }
  },

  // Cycle 6: Deep Space Robotic Probes
  {
    mcqs: [
      {
        q: "Launched in 1977, which NASA deep-space probe became the farthest human-made object from Earth, entering interstellar space in August 2012?",
        correct: "Voyager 1",
        w1: "Voyager 2",
        w2: "Pioneer 10",
        exp: "Voyager 1 carries the Golden Record with Earth sounds and images, now cruising over twenty-four billion kilometers from the Sun."
      },
      {
        q: "Which sister probe to Voyager 1 is the only spacecraft in history to visit all four outer gas and ice giants: Jupiter, Saturn, Uranus, and Neptune?",
        correct: "Voyager 2",
        w1: "Pioneer 11",
        w2: "New Horizons",
        exp: "Voyager 2 took advantage of a rare planetary alignment that occurs only once every 175 years to execute gravity-assist flybys."
      },
      {
        q: "Which joint NASA, ESA, and Italian Space Agency mission orbited Saturn for thirteen years, sending the Huygens probe to land on the moon Titan in 2005?",
        correct: "Cassini-Huygens",
        w1: "Galileo",
        w2: "Juno",
        exp: "Cassini discovered water vapor geysers erupting from the subsurface ocean of Enceladus and methane rain lakes on Titan."
      },
      {
        q: "Which NASA interplanetary probe flew past the dwarf planet Pluto in July 2015, capturing high-resolution photos of its nitrogen-ice heart Tombaugh Regio?",
        correct: "New Horizons",
        w1: "Dawn",
        w2: "Deep Impact",
        exp: "Launched in 2006, New Horizons later flew past Kuiper Belt object Arrokoth in 2019 at forty-three astronomical units from the Sun."
      },
      {
        q: "Which NASA probe launched in 1989 was the first spacecraft to enter orbit around Jupiter, studying its atmosphere and volcanic moon Io?",
        correct: "Galileo",
        w1: "Juno",
        w2: "Pioneer 10",
        exp: "Galileo deployed an atmospheric descent probe into Jupiter clouds and confirmed evidence of a subsurface saltwater ocean beneath Europa icy crust."
      }
    ],
    number: {
      q: "In what year were the twin Voyager 1 and Voyager 2 interstellar space probes launched by NASA?",
      target: 1977,
      unit: "year",
      imperial: "1977 AD",
      exp: "Voyager 2 was launched on August 20, 1977, and Voyager 1 followed on September 5, 1977, aboard Titan IIIE-Centaur rockets."
    }
  },

  // Cycle 7: Great Space Telescopes
  {
    mcqs: [
      {
        q: "Which famous space telescope was deployed by Space Shuttle Discovery in 1990 and famously repaired in 1993 to correct spherical mirror aberration?",
        correct: "Hubble Space Telescope",
        w1: "James Webb Space Telescope",
        w2: "Spitzer Space Telescope",
        exp: "The installation of COSTAR optics during STS-61 allowed Hubble to capture razor-sharp images, determining the Hubble constant and age of the universe."
      },
      {
        q: "Which infrared space observatory launched on Christmas Day 2021 features a 6.5-meter gold-plated segmented beryllium mirror at the Sun-Earth L2 Lagrange point?",
        correct: "James Webb Space Telescope",
        w1: "Nancy Grace Roman Telescope",
        w2: "Herschel Space Observatory",
        exp: "JWST observes the earliest galaxies formed after the Big Bang, operating behind a five-layer tennis-court-sized Kapton sunshield."
      },
      {
        q: "Which NASA Great Observatory launched in 1999 uses grazing-incidence mirrors to observe high-energy X-rays from black holes and supernova remnants?",
        correct: "Chandra X-ray Observatory",
        w1: "Compton Gamma Ray Observatory",
        w2: "Spitzer Space Telescope",
        exp: "Named after astrophysicist Subrahmanyan Chandrasekhar, Chandra maps million-degree gas clouds across colliding galaxy clusters."
      },
      {
        q: "Which NASA planet-hunting space telescope launched in 2009 discovered over 2,600 confirmed exoplanets using the transit photometry method?",
        correct: "Kepler Space Telescope",
        w1: "TESS",
        w2: "CoRoT",
        exp: "Kepler monitored 150,000 stars simultaneously for minuscule dips in brightness caused by planets passing across their host stars."
      },
      {
        q: "Which cryogenic infrared space telescope launched in 2003 observed cold interstellar dust clouds, protoplanetary disks, and brown dwarfs in Earth-trailing orbit?",
        correct: "Spitzer Space Telescope",
        w1: "WISE",
        w2: "Planck",
        exp: "Spitzer cooled its primary detectors with liquid helium to minus 268 degrees Celsius, discovering the colossal Phoebe ring around Saturn."
      }
    ],
    number: {
      q: "What is the approximate distance in millions of kilometers from Earth to the Second Lagrange Point L2 where the James Webb Space Telescope operates?",
      target: 1.5,
      unit: "million km",
      imperial: "1 million miles",
      exp: "JWST operates in a halo orbit around the Sun-Earth L2 Lagrange point, approximately 1.5 million kilometers directly away from the Sun."
    }
  },

  // Cycle 8: Space Stations in Low Earth Orbit
  {
    mcqs: [
      {
        q: "Which multinational microgravity laboratory, assembled in orbit since 1998, has maintained continuous human presence in space since November 2000?",
        correct: "International Space Station",
        w1: "Mir Space Station",
        w2: "Tiangong Space Station",
        exp: "The ISS represents collaboration among NASA, Roscosmos, ESA, JAXA, and CSA, orbiting Earth every ninety minutes at 28,000 km/h."
      },
      {
        q: "What was the world first crewed space station, launched into orbit by the Soviet Union on a Proton rocket in April 1971?",
        correct: "Salyut 1",
        w1: "Skylab",
        w2: "Almaz",
        exp: "Salyut 1 hosted the Soyuz 11 crew for twenty-three days of experiments before the cosmonauts tragically died during reentry depressurization."
      },
      {
        q: "Which first American space station, built from a modified Saturn V third stage, hosted three astronaut crews in 1973 and 1974?",
        correct: "Skylab",
        w1: "Freedom",
        w2: "Spacelab",
        exp: "Skylab astronauts repaired a damaged thermal micrometeoroid shield and conducted extensive solar astronomy with the Apollo Telescope Mount."
      },
      {
        q: "Which modular Soviet and Russian space station operated in low Earth orbit for fifteen years from 1986 until it was deorbited over the South Pacific in 2001?",
        correct: "Mir",
        w1: "Salyut 7",
        w2: "Zvezda",
        exp: "Mir hosted cosmonaut Valeri Polyakov for a record 437 consecutive days in space and served as the testing ground for Shuttle-Mir joint missions."
      },
      {
        q: "What is the name of the modern modular Chinese space station completed in low Earth orbit in 2022, comprising the Tianhe, Wentian, and Mengtian modules?",
        correct: "Tiangong",
        w1: "Shenzhou",
        w2: "Chang e",
        exp: "Tiangong, meaning Heavenly Palace, operates with a permanent three-person crew conducting microgravity physics, biology, and astronomy."
      }
    ],
    number: {
      q: "In what year was the first foundational module, Zarya, of the International Space Station launched into orbit?",
      target: 1998,
      unit: "year",
      imperial: "1998 AD",
      exp: "The Russian-built, American-financed Zarya Functional Cargo Block module was launched from Baikonur on November 20, 1998."
    }
  },

  // Cycle 9: Commercial Space & Reusable Rocketry
  {
    mcqs: [
      {
        q: "Which two-stage rocket developed by SpaceX became the world first orbital-class rocket capable of vertically landing and reusing its first-stage booster in 2015?",
        correct: "Falcon 9",
        w1: "Falcon 1",
        w2: "Falcon Heavy",
        exp: "Falcon 9 uses grid fins, cold-gas thrusters, and landing legs to touch down on autonomous spaceport drone ships and landing zones."
      },
      {
        q: "Which heavy-lift rocket made its debut in 2018 with two synchronized booster landings at Cape Canaveral and launched Elon Musk Tesla Roadster into solar orbit?",
        correct: "Falcon Heavy",
        w1: "Delta IV Heavy",
        w2: "Vulcan Centaur",
        exp: "Falcon Heavy utilizes three Falcon 9 core stages with twenty-seven Merlin 1D engines producing over five million pounds of thrust."
      },
      {
        q: "Which commercial spacecraft made history on May 30, 2020, by carrying NASA astronauts Bob Behnken and Doug Hurley to the ISS on the Demo-2 mission?",
        correct: "Crew Dragon",
        w1: "Boeing Starliner",
        w2: "Dream Chaser",
        exp: "SpaceX Crew Dragon restored American domestic human orbital launch capability for the first time since the Space Shuttle retired in 2011."
      },
      {
        q: "What colossal 120-meter-tall stainless steel launch system, powered by methane-fueled Raptor engines, is designed to be fully and rapidly reusable?",
        correct: "Starship",
        w1: "New Glenn",
        w2: "Terran R",
        exp: "Composed of the Super Heavy booster and the Starship upper stage, it is engineered for orbital refilling and missions to the Moon and Mars."
      },
      {
        q: "What rocket engine cycle used in the SpaceX Raptor engine combusts all propellant in separate pre-burners before entering the main combustion chamber for maximum efficiency?",
        correct: "Full-Flow Staged Combustion",
        w1: "Gas Generator Cycle",
        w2: "Expander Cycle",
        exp: "Full-flow staged combustion eliminates inter-propellant seals and achieves record-breaking chamber pressures exceeding 350 bar."
      }
    ],
    number: {
      q: "In what year did SpaceX achieve the historic first successful vertical ground landing of an orbital Falcon 9 first-stage booster at Cape Canaveral?",
      target: 2015,
      unit: "year",
      imperial: "2015 AD",
      exp: "On December 21, 2015, Falcon 9 flight 20 landed vertically at Landing Zone 1 following an orbital satellite deployment."
    }
  },

  // Cycle 10: Artemis & The New Deep-Space Era
  {
    mcqs: [
      {
        q: "What massive NASA rocket, powered by four RS-25 liquid engines and twin five-segment solid boosters, launched the uncrewed Artemis I lunar mission in 2022?",
        correct: "Space Launch System",
        w1: "Saturn V",
        w2: "Ares I",
        exp: "The SLS Block 1 produces 8.8 million pounds of peak thrust, making it the most powerful operational rocket ever flown by NASA."
      },
      {
        q: "Which next-generation deep-space crew exploration capsule, built by Lockheed Martin with a European Service Module, completed the Artemis I lunar flight?",
        correct: "Orion",
        w1: "Dragon",
        w2: "Starliner",
        exp: "Orion flew 432,000 kilometers beyond Earth, farther than any spacecraft designed for humans has ever traveled."
      },
      {
        q: "What planned international crewed space station will orbit the Moon in a Near-Rectilinear Halo Orbit to support lunar surface Artemis landings?",
        correct: "Lunar Gateway",
        w1: "Lunar Base Alpha",
        w2: "Artemis Station",
        exp: "The Gateway will provide docking, power, communications, and scientific airlocks for astronauts transferring between Orion and lunar landers."
      },
      {
        q: "What high-temperature ablative composite material covers the five-meter heat shield of the Orion spacecraft to survive 40,000 km/h lunar reentry?",
        correct: "AVCOAT",
        w1: "PICA-X",
        w2: "Carbon-Carbon Composite",
        exp: "AVCOAT slowly burns away in a controlled chemical ablation process, insulating the crew cabin against plasma temperatures exceeding 2,800 degrees Celsius."
      },
      {
        q: "Which NASA program, named after the Greek goddess of the Moon and twin sister of Apollo, aims to land the first woman and first person of color on the Moon?",
        correct: "Artemis Program",
        w1: "Constellation Program",
        w2: "Mercury Program",
        exp: "The Artemis campaign includes commercial human landing systems, international surface rovers, and permanent scientific lunar infrastructure."
      }
    ],
    number: {
      q: "In what year did the Artemis I mission successfully complete its maiden 25-day uncrewed flight test around the Moon?",
      target: 2022,
      unit: "year",
      imperial: "2022 AD",
      exp: "Artemis I launched on November 16, 2022, and splashed down successfully in the Pacific Ocean on December 11, 2022."
    }
  }
];

buildQuiz({
  id: "spacecraft-rockets-missions-60",
  theme: "Spacecraft & Rocket Engineering: Apollo to Artemis",
  title: "Spacecraft & Rocket Engineering: Apollo to Artemis",
  description: "Comprehensive 60-question aerospace odyssey exploring the pioneers of rocketry, Apollo lunar landings, deep-space probes, space stations, and the Artemis era.",
  category: "Tech, Inventions & Engineering",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z"
}, spaceCycles);
