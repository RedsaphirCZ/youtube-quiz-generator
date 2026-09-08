const { buildQuiz } = require('./generate_helpers.cjs');

// -------------------------------------------------------------
// 16. astrophysics-stars-nebulae-60
// -------------------------------------------------------------
const astrophysicsCycles = [
  // Cycle 1: Stellar Birth & Molecular Clouds
  {
    mcqs: [
      {
        q: "What dense, cold interstellar clouds of gas and dust serve as the stellar nurseries where new stars are born?",
        correct: "Giant Molecular Clouds",
        w1: "Planetary Nebulae",
        w2: "Supernova Remnants",
        exp: "Giant molecular clouds are cold (10-20 K) concentrations of molecular hydrogen ($H_2$) spanning hundreds of light-years that collapse to form star clusters."
      },
      {
        q: "What critical physical condition established by Sir James Jeans dictates when a gas cloud gravitational attraction overcomes internal thermal pressure to trigger collapse?",
        correct: "Jeans Instability Criterion",
        w1: "Chandrasekhar Mass Limit",
        w2: "Eddington Luminosity",
        exp: "When a gas cloud exceeds the Jeans mass $M_J$, self-gravitational forces overwhelm internal kinetic pressure, initiating gravitational fragmentation and collapse."
      },
      {
        q: "What early evolutionary stage describes a dense collapsing core that is accreting mass from an infalling envelope before sustained nuclear fusion begins?",
        correct: "Protostar",
        w1: "White Dwarf",
        w2: "Red Giant",
        exp: "A protostar radiates energy produced by gravitational contraction and Kelvin-Helmholtz heating, surrounded by a circumstellar accretion disc."
      },
      {
        q: "What class of young pre-main-sequence variable stars in stellar nurseries shows optical brightness fluctuations and strong collimated stellar winds?",
        correct: "T Tauri Stars",
        w1: "Wolf-Rayet Stars",
        w2: "Cepheid Variables",
        exp: "T Tauri stars are young low-mass stars under 10 million years old that exhibit Herbig-Haro bipolar plasma jets and protoplanetary discs."
      },
      {
        q: "What sub-stellar objects with masses between 13 and 80 Jupiter masses are too small to sustain core hydrogen fusion, known as failed stars?",
        correct: "Brown Dwarfs",
        w1: "Red Dwarfs",
        w2: "White Dwarfs",
        exp: "Brown dwarfs fuse deuterium (and lithium if $>65 M_J$) but lack sufficient central mass to reach the 3-million-Kelvin threshold for stable hydrogen fusion."
      }
    ],
    number: {
      q: "What is the minimum mass in Jupiter masses required for a celestial body to fuse deuterium, defining the lower boundary of a Brown Dwarf?",
      target: 13,
      unit: "Jupiter masses",
      imperial: "13 Jupiter masses (approx 0.012 Solar masses)",
      exp: "At approximately 13 Jupiter masses ($M_J$), core pressure and temperature become sufficient to ignite transient deuterium fusion, distinguishing brown dwarfs from gas planets."
    }
  },

  // Cycle 2: Nuclear Fusion in Stars & Hydrostatic Balance
  {
    mcqs: [
      {
        q: "What state of physical balance exists in a stable star where inward gravitational crushing force is balanced by outward thermal gas and radiation pressure?",
        correct: "Hydrostatic Equilibrium",
        w1: "Thermal Inversion",
        w2: "Convective Stability",
        exp: "Stars spend 90 percent of their lifetimes in hydrostatic equilibrium on the main sequence, self-regulating core temperature and fusion rates."
      },
      {
        q: "In stars more massive than 1.3 solar masses, what catalytic nuclear fusion cycle dominates over the p-p chain to fuse hydrogen into helium?",
        correct: "CNO Cycle Carbon-Nitrogen-Oxygen",
        w1: "Triple-Alpha Process",
        w2: "Alpha Ladder Process",
        exp: "Discovered by Hans Bethe and Carl Friedrich von Weizsäcker, the CNO cycle uses carbon, nitrogen, and oxygen nuclei as nuclear catalysts to fuse four protons into helium."
      },
      {
        q: "What nuclear fusion reaction fuses three helium-4 alpha particles into a single carbon-12 nucleus in red giant cores at 100 million Kelvin?",
        correct: "Triple-Alpha Process",
        w1: "Proton-Proton Chain",
        w2: "Neon Burning Cycle",
        exp: "Predicted by Fred Hoyle via an excited resonance state in Carbon-12, the triple-alpha process produces carbon and oxygen in post-main-sequence stars."
      },
      {
        q: "What chemical element is the ultimate nuclear dead end of stellar fusion in massive stars, because fusing it consumes energy rather than releasing it?",
        correct: "Iron-56",
        w1: "Nickel-62",
        w2: "Lead-208",
        exp: "Iron-56 has one of the highest nuclear binding energies per nucleon; fusing elements heavier than iron is endothermic, triggering immediate core collapse."
      },
      {
        q: "What maximum theoretical limit on stellar radiation luminosity prevents excessive outward radiation pressure from blowing off a star outer atmosphere?",
        correct: "Eddington Luminosity Limit",
        w1: "Chandrasekhar Limit",
        w2: "Tolman-Oppenheimer-Volkoff Limit",
        exp: "When a star luminosity exceeds the Eddington limit ($L_{Edd} \\propto M$), outward radiation pressure on free electrons overwhelms gravity, driving massive stellar mass loss."
      }
    ],
    number: {
      q: "How many million Kelvin core temperature is required to trigger the Triple-Alpha helium fusion process in Red Giant stars?",
      target: 100,
      unit: "million Kelvin",
      imperial: "100 million K (approx 100M °C)",
      exp: "Overcoming the Coulomb repulsion barrier between two positively charged helium alpha nuclei requires core temperatures of roughly 100 million Kelvin."
    }
  },

  // Cycle 3: The Hertzsprung-Russell H-R Diagram
  {
    mcqs: [
      {
        q: "What iconic scatter plot in astrophysics plots stellar absolute luminosity against stellar surface effective temperature or spectral classification?",
        correct: "Hertzsprung-Russell Diagram",
        w1: "Hubble Diagram",
        w2: "Light Curve Plot",
        exp: "Independently developed by Ejnar Hertzsprung and Henry Norris Russell around 1910, the H-R diagram revolutionized understanding of stellar evolution."
      },
      {
        q: "What broad diagonal band on the H-R diagram contains roughly 90 percent of all stars in the universe undergoing steady core hydrogen fusion?",
        correct: "The Main Sequence",
        w1: "Red Giant Branch",
        w2: "White Dwarf Track",
        exp: "Stars spend the vast majority of their active lifetimes along the main sequence line, running from luminous hot blue stars down to cool dim red dwarfs."
      },
      {
        q: "What standard Harvard stellar spectral classification sequence orders stars from hottest (blue) to coolest (red)?",
        correct: "O B A F G K M",
        w1: "M K G F A B O",
        w2: "A B C D E F G",
        exp: "Devised by Annie Jump Cannon and classified by surface temperature: O (>30,000 K, blue) down to M (<3,700 K, red), remembered by Oh Be A Fine Guy/Girl Kiss Me."
      },
      {
        q: "To what stellar spectral class does our Sun belong, defined as a main-sequence yellow dwarf star with a surface temperature of 5,778 K?",
        correct: "G-type G2V",
        w1: "K-type K1V",
        w2: "F-type F5V",
        exp: "The Sun is a G2V star: class G indicates yellow surface color, subclass 2 denotes temperature (5,778 K), and luminosity class V denotes a main-sequence dwarf."
      },
      {
        q: "What stellar spectral class includes the hottest, rarest, and most luminous massive stars with surface temperatures exceeding 30,000 Kelvin?",
        correct: "O-Type Stars",
        w1: "B-Type Stars",
        w2: "M-Type Stars",
        exp: "O-type stars are blue hyper-luminous giants with masses over 15 to 90 solar masses that burn furiously and live short lifespans of only a few million years."
      }
    ],
    number: {
      q: "What is the surface effective temperature in Kelvin of an O-type main sequence star at the hottest end of the Harvard spectral sequence?",
      target: 30000,
      unit: "Kelvin",
      imperial: "30,000 to 50,000 K",
      exp: "Spectral class O stars have effective surface temperatures ranging from 30,000 Kelvin up to over 50,000 Kelvin, radiating predominantly in ionizing ultraviolet."
    }
  },

  // Cycle 4: Supernovae & Core Collapse
  {
    mcqs: [
      {
        q: "What type of core-collapse supernova occurs when a massive star (above 8 solar masses) exhausts its fuel, collapsing its iron core into a neutron star in milliseconds?",
        correct: "Type II Supernova",
        w1: "Type Ia Supernova",
        w2: "Classical Nova",
        exp: "When the iron core collapses, electrons and protons merge into neutrons, creating an incompressible core that bounces and drives a catastrophic shockwave through the star."
      },
      {
        q: "What fundamental astrophysical mass limit of roughly 1.44 solar masses defines the maximum mass an electron-degenerate white dwarf can support?",
        correct: "Chandrasekhar Limit",
        w1: "Schwarzschild Limit",
        w2: "Roche Limit",
        exp: "Calculated by 19-year-old Subrahmanyan Chandrasekhar in 1930 (1983 Nobel Prize), exceeding 1.44 solar masses causes relativistic collapse."
      },
      {
        q: "What elusive subatomic particles carry away over 99 percent of the total gravitational binding energy released during a core-collapse supernova?",
        correct: "Neutrinos",
        w1: "Photons",
        w2: "Gravitons",
        exp: "During core collapse, electron capture ($e^- + p \\to n + \\nu_e$) produces a colossal burst of $10^{58}$ neutrinos that escape in seconds, driving the shock explosion."
      },
      {
        q: "What rapid neutron-capture nucleosynthetic process occurring in supernovae and neutron star mergers forges elements heavier than iron like gold and platinum?",
        correct: "The r-Process",
        w1: "The s-Process",
        w2: "The p-Process",
        exp: "In the r-process (rapid neutron capture), atomic nuclei capture neutrons much faster than they beta decay, building up super-heavy actinides and precious metals."
      },
      {
        q: "What famous historical supernova discovered in February 1987 occurred in the nearby Large Magellanic Cloud, providing direct neutrino confirmation of core collapse?",
        correct: "Supernova 1987A",
        w1: "SN 1054",
        w2: "Tycho Supernova SN 1572",
        exp: "Kamiokande II and IMB underground detectors recorded 25 neutrinos hours before optical light arrived, confirming theoretical models of stellar core collapse."
      }
    ],
    number: {
      q: "What is the exact theoretical value in Solar Masses of the Chandrasekhar Limit, above which electron degeneracy pressure fails?",
      target: 1.44,
      unit: "Solar Masses",
      imperial: "1.44 Solar Masses (approx 2.86 x 10^30 kg)",
      exp: "The Chandrasekhar limit is precisely calculated as approximately 1.44 solar masses ($M_\\odot$), the maximum possible mass of a stable, non-rotating white dwarf star."
    }
  },

  // Cycle 5: Neutron Stars & Pulsars
  {
    mcqs: [
      {
        q: "What city-sized stellar remnant containing up to two solar masses packed into a 20-km diameter sphere is supported by neutron degeneracy pressure?",
        correct: "Neutron Star",
        w1: "White Dwarf",
        w2: "Quark Star",
        exp: "Neutron stars have densities of $10^{17}$ kg/m3 (a single teaspoon would weigh 6 billion tons on Earth), surrounded by a solid iron crystal crust."
      },
      {
        q: "What rapidly spinning, highly magnetized neutron star beams lighthouse-like cones of radio waves and X-rays along its magnetic poles?",
        correct: "Pulsar",
        w1: "Quasar",
        w2: "Blazar",
        exp: "As the magnetic axis sweeps past Earth line of sight, radio telescopes detect regular clock-like pulses with millisecond precision."
      },
      {
        q: "What British astrophysicist discovered the first radio pulsar CP 1919 in 1967 as a Cambridge graduate student analyzing radio telescope charts?",
        correct: "Jocelyn Bell Burnell",
        w1: "Vera Rubin",
        w2: "Cecilia Payne-Gaposchkin",
        exp: "Jocelyn Bell observed regular pulses recurring every 1.33 seconds (initially nicknamed LGM-1 for Little Green Men), discovering the first neutron star."
      },
      {
        q: "What fast-spinning class of pulsars rotates hundreds of times per second, spun up by accreting mass and angular momentum from a binary companion star?",
        correct: "Millisecond Pulsars",
        w1: "Magnetars",
        w2: "Anomalous X-ray Pulsars",
        exp: "The fastest known millisecond pulsar, PSR J1748-2446ad, spins at an astonishing 716 rotations per second (42,960 rpm), its equator traveling at 24% light speed."
      },
      {
        q: "What maximum theoretical mass limit of roughly 2.1 solar masses marks the threshold where neutron degeneracy fails and a neutron star collapses into a black hole?",
        correct: "Tolman-Oppenheimer-Volkoff TOV Limit",
        w1: "Chandrasekhar Limit",
        w2: "Jeans Mass",
        exp: "Calculated from general relativity and nuclear physics, the TOV limit dictates that no stable neutron star can exceed approximately 2.1 to 2.3 solar masses."
      }
    ],
    number: {
      q: "What is the typical diameter in kilometers of a dense neutron star containing the mass of one to two Suns?",
      target: 20,
      unit: "km",
      imperial: "12.4 miles (20 km)",
      exp: "A typical neutron star packs 1.4 to 2.1 solar masses into a sphere only 20 kilometers (12 miles) in diameter, roughly the size of Manhattan Island."
    }
  },

  // Cycle 6: Magnetars & Cosmic Magnetic Extremes
  {
    mcqs: [
      {
        q: "What type of extreme neutron star possesses the strongest magnetic fields in the universe, reaching up to 100 billion Tesla?",
        correct: "Magnetar",
        w1: "Millisecond Pulsar",
        w2: "Accreting X-ray Binary",
        exp: "Magnetars possess magnetic field strengths of $10^{14}$ to $10^{15}$ Gauss ($10^{10}$ to $10^{11}$ Tesla), trillions of times stronger than Earth magnetic field."
      },
      {
        q: "What violent fracture in the rigid outer crust of a magnetar caused by magnetic stress releases colossal bursts of gamma rays and X-rays?",
        correct: "Starquake",
        w1: "Plasma Flare",
        w2: "Coronal Burst",
        exp: "A starquake shifting a magnetar iron crust by a fraction of a millimeter twists external magnetic field lines, triggering an explosive gamma-ray flash."
      },
      {
        q: "What quantum electrodynamic QED effect occurs in the extreme magnetic field of a magnetar, causing single gamma-ray photons to split into two lower-energy photons?",
        correct: "Photon Splitting",
        w1: "Vacuum Polarization Birefringence",
        w2: "Magnetic Reconnection",
        exp: "In magnetic fields exceeding the Schwinger limit ($4.4 \\times 10^9$ Tesla), the quantum vacuum becomes non-linear, allowing photons to interact directly with the field."
      },
      {
        q: "What millisecond-duration high-energy cosmic radio flashes originating billions of light-years away are widely linked to active magnetar outbursts?",
        correct: "Fast Radio Bursts FRBs",
        w1: "Gamma-Ray Bursts",
        w2: "Soft Gamma Repeaters",
        exp: "In 2020, astronomers detected a simultaneous FRB and X-ray burst from Galactic magnetar SGR 1935+2154, confirming magnetars as FRB engines."
      },
      {
        q: "What December 2004 giant gamma-ray flare from the magnetar SGR 1806 source physically ionized Earth upper atmosphere despite originating 50,000 light-years away?",
        correct: "Giant Magnetar Flare",
        w1: "Hypernova Pulse",
        w2: "Superburst",
        exp: "In a tenth of a second, SGR 1806-20 released more energy than our Sun emits in 250,000 years, saturating all space satellite detectors and expanding Earth ionosphere."
      }
    ],
    number: {
      q: "What is the magnetic field strength in billion Tesla achieved by extreme magnetar neutron stars?",
      target: 100,
      unit: "billion Tesla",
      imperial: "10^11 Tesla (100 billion T)",
      exp: "Peak magnetar surface magnetic fields reach up to $10^{11}$ Tesla (100 billion Tesla or $10^{15}$ Gauss), enough to distort atomic electron orbitals into needle shapes."
    }
  },

  // Cycle 7: Planetary Nebulae & White Dwarfs
  {
    mcqs: [
      {
        q: "What glowing expanding shell of ionized gas is ejected by an intermediate-mass red giant star as it sheds its outer layers at the end of its life?",
        correct: "Planetary Nebula",
        w1: "Supernova Remnant",
        w2: "Reflection Nebula",
        exp: "Despite their historical name given by William Herschel due to round planet-like appearances, planetary nebulae represent the gentle deaths of stars under 8 solar masses."
      },
      {
        q: "What quantum mechanical pressure resulting from the Pauli exclusion principle supports a white dwarf star against gravitational collapse?",
        correct: "Electron Degeneracy Pressure",
        w1: "Radiation Pressure",
        w2: "Thermal Kinetic Pressure",
        exp: "Electrons packed into degenerate states cannot occupy identical quantum states, creating a non-thermal outward pressure independent of temperature."
      },
      {
        q: "What dense, Earth-sized stellar core composed of carbon and oxygen remains at the center of a planetary nebula after a Sun-like star dies?",
        correct: "White Dwarf",
        w1: "Neutron Star",
        w2: "Brown Dwarf",
        exp: "The exposed degenerate core of our Sun will become a white dwarf with half its original mass packed into a sphere the size of Earth, cooling over billions of years."
      },
      {
        q: "What famous planetary nebula in the constellation Lyra resembles a colorful smoke ring, illuminated by a 100,000 K central white dwarf?",
        correct: "The Ring Nebula Messier 57",
        w1: "Helix Nebula",
        w2: "Cat Eye Nebula",
        exp: "M57 is a barrel-shaped cylinder of expanding gas viewed nearly pole-on, with outer red hydrogen emission and inner blue-green doubly ionized oxygen [O III]."
      },
      {
        q: "What theoretical cold, inert crystal sphere of carbon and oxygen will a white dwarf eventually become once it radiates away all its thermal energy over quadrillions of years?",
        correct: "Black Dwarf",
        w1: "Brown Dwarf",
        w2: "Iron Star",
        exp: "Because the universe is only 13.8 billion years old and white dwarfs take over $10^{15}$ years to cool to near absolute zero, no black dwarfs exist yet in the universe."
      }
    ],
    number: {
      q: "What is the approximate diameter in kilometers of a typical carbon-oxygen White Dwarf star, roughly equal to the diameter of Earth?",
      target: 12742,
      unit: "km",
      imperial: "7,917 miles (approx 12,742 km)",
      exp: "A typical white dwarf of 0.6 to 1.0 solar masses has a diameter of roughly 10,000 to 13,000 kilometers, almost identical to Earth equatorial diameter of 12,742 km."
    }
  },

  // Cycle 8: Massive & Hypergiant Stars
  {
    mcqs: [
      {
        q: "What luminous red supergiant star in the constellation Orion is so colossal that if placed at our Sun location, it would engulf Mars and Jupiter orbit?",
        correct: "Betelgeuse Alpha Orionis",
        w1: "Rigel Beta Orionis",
        w2: "Aldebaran",
        exp: "Betelgeuse has a radius roughly 700 to 1,000 times that of the Sun and will end its life in a spectacular core-collapse supernova visible in daylight within 100,000 years."
      },
      {
        q: "What unstable hypergiant binary star system in the Carina Nebula underwent the Great Eruption in 1843, creating the bipolar Homunculus Nebula?",
        correct: "Eta Carinae",
        w1: "VY Canis Majoris",
        w2: "UY Scuti",
        exp: "Eta Carinae primary star has a mass over 100 solar masses and shines with 5 million times the Sun luminosity, teetering at the brink of pair-instability supernova."
      },
      {
        q: "What evolved massive stars have shed their outer hydrogen layers, displaying intense broad emission lines from supersonic stellar winds exceeding 2,000 km/s?",
        correct: "Wolf-Rayet Stars",
        w1: "Luminous Blue Variables",
        w2: "Carbon Stars",
        exp: "Wolf-Rayet stars expose bare helium and nitrogen (WN) or carbon and oxygen (WC) cores, shedding mass at rates of $10^{-5}$ solar masses per year."
      },
      {
        q: "What theoretical supernova occurs in massive stars between 130 and 250 solar masses when gamma-ray photons turn into electron-positron pairs, leaving no remnant?",
        correct: "Pair-Instability Supernova",
        w1: "Electron-Capture Supernova",
        w2: "Photodisintegration Supernova",
        exp: "Pair production drops core thermal pressure, triggering a runaway thermonuclear explosion that completely obliterates the star without leaving a central black hole."
      },
      {
        q: "What hypergiant star in the constellation Scutum is among the largest known stars by physical volume, with a radius over 1,700 times that of our Sun?",
        correct: "UY Scuti",
        w1: "Stephenson 2-18",
        w2: "Betelgeuse",
        exp: "UY Scuti has a pulsating radius of roughly 1,700 solar radii (approx 1.2 billion kilometers), extending out past the orbit of Jupiter."
      }
    ],
    number: {
      q: "How many times the radius of our Sun is the estimated radius of the hypergiant star UY Scuti?",
      target: 1700,
      unit: "solar radii",
      imperial: "1,700 Solar Radii (1.2 billion km)",
      exp: "Direct interferometric angular diameter measurements estimate UY Scuti maximum pulsating radius at approximately 1,700 times the radius of our Sun."
    }
  },

  // Cycle 9: Variable Stars & Cosmic Distance Ladders
  {
    mcqs: [
      {
        q: "What pulsating yellow supergiant variable stars exhibit a direct mathematical relationship between their pulsation period and intrinsic luminosity?",
        correct: "Classical Cepheid Variables",
        w1: "RR Lyrae Stars",
        w2: "Mira Variables",
        exp: "Because longer-period Cepheids are intrinsically more luminous, measuring their pulsation period allows astronomers to calculate true distance across millions of light-years."
      },
      {
        q: "What American astronomer discovered the Period-Luminosity relation for Cepheid variable stars in 1908, providing the key to measuring intergalactic distances?",
        correct: "Henrietta Swan Leavitt",
        w1: "Annie Jump Cannon",
        w2: "Maria Mitchell",
        exp: "Leavitt identified 1,777 variable stars in the Magellanic Clouds, realizing that because they were at the same distance, brighter Cepheids had longer periods."
      },
      {
        q: "What periodic expansion and contraction mechanism driven by changing opacity of doubly ionized helium gas powers Cepheid variable pulsations?",
        correct: "The Kappa Mechanism",
        w1: "Kelvin-Helmholtz Contraction",
        w2: "Dynamo Instability",
        exp: "As helium ionizes, its opacity increases, trapping heat and building pressure that expands the star; cooling allows recombination and contraction, repeating the cycle."
      },
      {
        q: "What old, low-mass horizontal-branch pulsating variable stars with periods under one day are used as standard candles for globular cluster distances?",
        correct: "RR Lyrae Variables",
        w1: "Delta Scuti Stars",
        w2: "SX Phoenicis Stars",
        exp: "RR Lyrae stars have nearly constant absolute magnitude ($M_V \\approx +0.6$), making them excellent cosmic standard yardsticks within the Milky Way and Local Group."
      },
      {
        q: "What pulsating red giant variable star in the constellation Cetus was the first non-supernova variable star discovered in 1596, named from the Latin for wonderful?",
        correct: "Mira Omicron Ceti",
        w1: "Algol Beta Persei",
        w2: "Polaris",
        exp: "Discovered by David Fabricius, Mira varies in brightness by over 1,500 times across a 332-day period, shedding a massive 13-light-year comet-like tail of gas."
      }
    ],
    number: {
      q: "In what year CE did Henrietta Swan Leavitt publish her foundational discovery of the Cepheid Period-Luminosity relation in the Harvard Annals?",
      target: 1908,
      unit: "CE",
      imperial: "1908 CE",
      exp: "Henrietta Leavitt published 1777 Variables in the Magellanic Clouds in the Annals of Harvard College Observatory in 1908, unlocking modern observational cosmology."
    }
  },

  // Cycle 10: Cosmic Nebulae & Star Nurseries
  {
    mcqs: [
      {
        q: "What iconic star-forming elephant trunks of cold interstellar hydrogen gas and dust in the Eagle Nebula M16 were imaged by Hubble and James Webb?",
        correct: "Pillars of Creation",
        w1: "Mystic Mountain",
        w2: "Keyhole Nebula",
        exp: "The Pillars of Creation span roughly 4 to 5 light-years long, where intense ultraviolet radiation from newborn O-type stars erodes gas into evaporating gaseous globules."
      },
      {
        q: "What famous emission nebula in the constellation Taurus is the expanding supernova remnant of the SN 1054 guest star recorded by ancient astronomers?",
        correct: "The Crab Nebula Messier 1",
        w1: "The Orion Nebula M42",
        w2: "The Veil Nebula",
        exp: "The Crab Nebula contains a central pulsar spinning 30 times per second, energizing a synchrotron nebula across 11 light-years with magnetic plasma winds."
      },
      {
        q: "What nearby diffuse emission-reflection nebula located in the sword of Orion is the closest massive star-forming nursery to Earth at 1,344 light-years?",
        correct: "The Orion Nebula Messier 42",
        w1: "Lagoon Nebula M8",
        w2: "Rosette Nebula",
        exp: "Visible to the naked eye, M42 is illuminated by the Trapezium star cluster (Theta1 Orionis), containing over 700 young stars in various stages of formation."
      },
      {
        q: "What type of nebula does not emit its own light but reflects light from nearby stars, glowing with a characteristic blue hue due to Rayleigh scattering?",
        correct: "Reflection Nebula",
        w1: "Emission Nebula",
        w2: "Dark Nebula",
        exp: "Reflection nebulae like the Pleiades nebulosity (Merope Nebula) contain fine interstellar dust grains that scatter blue starlight more efficiently than red."
      },
      {
        q: "What dense, opaque clouds of interstellar microscopic carbon and silicate dust grains block background optical starlight, appearing as dark silhouettes?",
        correct: "Dark Absorption Nebulae",
        w1: "Planetary Nebulae",
        w2: "Herbig-Haro Objects",
        exp: "Classic dark nebulae include the Horsehead Nebula in Orion and the Coalsack Nebula in Crux, hiding embryonic protostars detectable in infrared."
      }
    ],
    number: {
      q: "What is the surveyed distance in light-years from Earth to the active stellar nursery of the Great Orion Nebula Messier 42?",
      target: 1344,
      unit: "light-years",
      imperial: "1,344 light-years (approx 412 parsecs)",
      exp: "Very Long Baseline Array (VLBA) trigonometric parallax measurements established the distance to the Orion Nebula cluster at 1,344 +/- 20 light-years."
    }
  }
];

buildQuiz({
  id: 'astrophysics-stars-nebulae-60',
  theme: 'Astrophysics: Supernovae, Pulsars & Stellar Evolution',
  title: 'Astrophysics: Supernovae, Pulsars & Stellar Evolution',
  description: 'A 60-question grand master assessment exploring giant molecular clouds, H-R diagram classifications, core-collapse supernovae, pulsars, magnetars, and stellar nucleosynthesis.',
  category: 'Astronomy, Physics & Chemistry',
  difficulty: 'moderate'
}, astrophysicsCycles);

// -------------------------------------------------------------
// 17. optics-light-electromagnetism-60
// -------------------------------------------------------------
const opticsCycles = [
  // Cycle 1: The Electromagnetic Spectrum & Photon Energy
  {
    mcqs: [
      {
        q: "What continuous physical spectrum encompasses radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, and gamma rays?",
        correct: "The Electromagnetic Spectrum",
        w1: "The Acoustic Spectrum",
        w2: "The Balmer Continuum",
        exp: "Electromagnetic radiation consists of synchronized oscillations of electric and magnetic fields traveling through vacuum at the speed of light."
      },
      {
        q: "What fundamental quantum formula calculates the energy E of a single photon in terms of its frequency f and Planck constant h?",
        correct: "E equals h times f",
        w1: "E equals m times c",
        w2: "E equals half m v squared",
        exp: "The Planck-Einstein relation $E = hf = \\frac{hc}{\\lambda}$ proves that photon energy is directly proportional to frequency and inversely proportional to wavelength."
      },
      {
        q: "What band of the electromagnetic spectrum possesses the shortest wavelengths, highest frequencies, and highest photon energies?",
        correct: "Gamma Rays",
        w1: "Hard X-Rays",
        w2: "Vacuum Ultraviolet",
        exp: "Gamma rays have wavelengths shorter than 10 picometers and photon energies exceeding 100 keV, produced in nuclear reactions and astronomical kilonovae."
      },
      {
        q: "What electromagnetic radiation frequency band is utilized for domestic microwave ovens and Wi-Fi telecommunication networks around 2.4 GHz?",
        correct: "Microwaves",
        w1: "Long Radio Waves",
        w2: "Far Infrared",
        exp: "Microwaves at 2.45 GHz match the dielectric heating resonance of polar water molecules in food, rapidly transferring thermal kinetic energy."
      },
      {
        q: "What narrow portion of the electromagnetic spectrum spanning wavelengths from approximately 380 to 750 nanometers can be detected by human eyes?",
        correct: "Visible Light Spectrum",
        w1: "Near Infrared",
        w2: "UVA Ultraviolet",
        exp: "Visible light occupies only a tiny fraction of the electromagnetic spectrum, corresponding to photon energies between 1.65 and 3.2 electronvolts (eV)."
      }
    ],
    number: {
      q: "What is the approximate wavelength in nanometers nm of deep red light at the long-wavelength edge of the human visual spectrum?",
      target: 700,
      unit: "nm",
      imperial: "700 nm (0.7 micrometers)",
      exp: "The visible light spectrum ranges from violet at approximately 380-400 nm to deep red at approximately 700-750 nm."
    }
  },

  // Cycle 2: Reflection, Refraction & Snell Law
  {
    mcqs: [
      {
        q: "What fundamental optical law relates the angles of incidence and refraction to the refractive indices of two adjacent media ($n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2$)?",
        correct: "Snell Law",
        w1: "Brewster Law",
        w2: "Malus Law",
        exp: "Formulated by Willebrord Snellius in 1621, Snell law describes how light bends toward the normal when entering an optically denser medium with higher index of refraction."
      },
      {
        q: "What dimensionless optical ratio defines the refractive index n of a medium relative to the speed of light in vacuum ($n = c / v$)?",
        correct: "Index of Refraction",
        w1: "Dielectric Permittivity",
        w2: "Optical Dispersion Quotient",
        exp: "Light travels slower in dense optical media (e.g. $n = 1.33$ in water, $n = 1.52$ in crown glass, $n = 2.42$ in diamond) due to electromagnetic phase delays."
      },
      {
        q: "What optical phenomenon occurs when light traveling in a dense medium strikes a boundary at an angle greater than the critical angle, reflecting 100% of light?",
        correct: "Total Internal Reflection",
        w1: "Specular Reflection",
        w2: "Diffuse Scattering",
        exp: "Total internal reflection occurs without any transmission losses, enabling light guidance through fiber optic cables and diamond brilliance."
      },
      {
        q: "What fundamental optical law states that for specular reflection off a smooth mirror surface, the angle of incidence exactly equals the angle of reflection?",
        correct: "Law of Reflection",
        w1: "Fermat Principle of Least Time",
        w2: "Huygens Wavelet Principle",
        exp: "The incident ray, normal line, and reflected ray lie in the same plane, with $\\theta_i = \\theta_r$ relative to the surface normal."
      },
      {
        q: "What optical transmission technology uses total internal reflection along ultra-pure silica glass cores to transmit data over thousands of kilometers?",
        correct: "Fiber Optic Cables",
        w1: "Metallic Waveguides",
        w2: "Coaxial Cable Lines",
        exp: "Light pulses bounce within a higher-index core ($n_1$) surrounded by a lower-index cladding ($n_2$), achieving minimal signal attenuation over intercontinental undersea lines."
      }
    ],
    number: {
      q: "What is the refractive index n of a pure physical vacuum by fundamental optical definition?",
      target: 1.0,
      unit: "refractive index",
      imperial: "n = 1.00000 (exact)",
      exp: "By definition, the refractive index of vacuum is exactly $n = 1.0$, while dry air at sea level has an index of approximately 1.000293."
    }
  },

  // Cycle 3: Wave Optics: Interference & Diffraction
  {
    mcqs: [
      {
        q: "What landmark 1801 optical experiment by Thomas Young conclusively demonstrated the wave nature of light via alternating bright and dark fringes?",
        correct: "Double-Slit Interference Experiment",
        w1: "Fizeau Toothed-Wheel Experiment",
        w2: "Cavendish Torsion Balance",
        exp: "Young passed sunlight through two coherent pinholes, producing constructive and destructive wave interference bands on a screen that disproved Newton corpuscular theory."
      },
      {
        q: "What optical component consisting of thousands of closely spaced parallel micro-slits disperses polychromatic light into its spectral colors via diffraction?",
        correct: "Diffraction Grating",
        w1: "Achromatic Doublet",
        w2: "Linear Polarizer",
        exp: "Diffraction gratings create sharp spectral lines governed by the grating equation $d \\sin\\theta = m\\lambda$, widely used in astronomical spectrometers."
      },
      {
        q: "What wave propagation principle states that every point on a propagating wavefront can be considered a source of secondary spherical wavelets?",
        correct: "Huygens-Fresnel Principle",
        w1: "Fermat Principle of Least Time",
        w2: "Babinet Principle",
        exp: "Christiaan Huygens principle explains wave bending around edges and diffraction through narrow apertures as the superposition of secondary wavelets."
      },
      {
        q: "What optical imaging technique creates three-dimensional image recordings by capturing the wave interference pattern between reference and object laser beams?",
        correct: "Holography",
        w1: "Photolithography",
        w2: "Interferometric Profilometry",
        exp: "Invented by Dennis Gabor in 1947 (1971 Nobel Prize), holograms record both the phase and amplitude of light waves on photographic film."
      },
      {
        q: "What physical resolution criterion states that two point sources are just resolved when the central diffraction maximum of one coincides with the first minimum of the other?",
        correct: "Rayleigh Criterion",
        w1: "Abbe Diffraction Limit",
        w2: "Nyquist Sampling Limit",
        exp: "Lord Rayleigh criterion ($\\theta = 1.22 \\lambda / D$) sets the fundamental diffraction-limited angular resolution limit of optical telescopes and camera lenses."
      }
    ],
    number: {
      q: "In what year CE did Thomas Young present his historic Double-Slit wave interference experiment to the Royal Society of London?",
      target: 1801,
      unit: "CE",
      imperial: "1801 CE",
      exp: "Thomas Young demonstrated the double-slit wave interference of light in November 1801, providing foundational evidence for the wave theory of light."
    }
  },

  // Cycle 4: Polarization & Optical Anisotropy
  {
    mcqs: [
      {
        q: "What fundamental property of transverse electromagnetic waves describes the geometric spatial orientation of the oscillating electric field vector?",
        correct: "Polarization",
        w1: "Optical Coherence",
        w2: "Monochromaticity",
        exp: "Light can be linearly polarized (electric field vibrates in a single plane), circularly polarized (vector rotates in a circle), or unpolarized."
      },
      {
        q: "What specific angle of incidence produces 100% linearly polarized reflected light when the reflected ray is perpendicular to the refracted ray?",
        correct: "Brewster Angle",
        w1: "Critical Angle",
        w2: "Glancing Angle",
        exp: "Named after Sir David Brewster, $\\tan\\theta_B = n_2/n_1$; at this angle, p-polarized light cannot reflect because dipole oscillators have zero transverse emission."
      },
      {
        q: "What optical law calculates the transmitted light intensity through an analyzing polarizer as proportional to the square of the cosine of the relative angle ($I = I_0 \\cos^2\\theta$)?",
        correct: "Malus Law",
        w1: "Beer-Lambert Law",
        w2: "Stefan-Boltzmann Law",
        exp: "Discovered by Etienne-Louis Malus in 1809, this law governs light transmission through crossed polarizing filters in polarimeters and sunglasses."
      },
      {
        q: "What optical phenomenon exhibited by anisotropic calcite crystals splits an unpolarized incident light ray into two orthogonally polarized refracted rays?",
        correct: "Birefringence Double Refraction",
        w1: "Optical Dichroism",
        w2: "Photoelastic Stress",
        exp: "Birefringent materials possess two distinct refractive indices ($n_o$ ordinary and $n_e$ extraordinary), creating twin offset images of text placed beneath a crystal."
      },
      {
        q: "What common flat-panel display technology modulates polarized light passing through nematic liquid crystal molecules twisted by electric voltage?",
        correct: "Liquid Crystal Display LCD",
        w1: "OLED Display",
        w2: "Plasma Display",
        exp: "Applying an electric field uncoils the liquid crystal molecules, controlling whether polarized light rotates to pass through crossed polarizers to form pixels."
      }
    ],
    number: {
      q: "What is the angle in degrees between the reflected ray and refracted ray when unpolarized light strikes a dielectric boundary at the Brewster angle?",
      target: 90,
      unit: "degrees",
      imperial: "90° perpendicular angle",
      exp: "At Brewster angle of incidence, the angle between the reflected beam and refracted beam is exactly 90 degrees (perpendicular)."
    }
  },

  // Cycle 5: Lasers & Stimulated Emission
  {
    mcqs: [
      {
        q: "What does the technological acronym LASER stand for in optical physics?",
        correct: "Light Amplification by Stimulated Emission of Radiation",
        w1: "Linear Acceleration by Stimulated Electromagnetic Resonance",
        w2: "Laser Assisted Solid Emission Ray",
        exp: "The acronym was coined in 1957 by Gordon Gould, describing coherent optical amplification based on Einstein quantum principle of stimulated emission."
      },
      {
        q: "What quantum process predicted by Albert Einstein in 1917 occurs when an incoming photon stimulates an excited electron to drop an energy level and emit an identical twin photon?",
        correct: "Stimulated Emission",
        w1: "Spontaneous Emission",
        w2: "Photoelectric Absorption",
        exp: "The newly emitted photon has the exact same wavelength, phase, direction, and polarization as the stimulating photon, enabling coherent laser amplification."
      },
      {
        q: "What non-equilibrium condition inside a laser gain medium must be achieved where more atoms occupy an excited energy state than the lower ground state?",
        correct: "Population Inversion",
        w1: "Thermal Equilibrium",
        w2: "Quantum Degeneracy",
        exp: "Optical or electrical pumping creates a population inversion, ensuring that stimulated emission dominates over spontaneous absorption of photons."
      },
      {
        q: "What American physicist built and operated the world first functioning optical laser in May 1960 using a synthetic pink ruby rod and flashlamp?",
        correct: "Theodore Maiman",
        w1: "Charles Townes",
        w2: "Arthur Schawlow",
        exp: "Working at Hughes Research Laboratories in Malibu, Theodore Maiman produced pulsed deep red laser light at 694.3 nanometers using a ruby crystal."
      },
      {
        q: "What fundamental property of laser light means that all emitted photons oscillate in perfect spatial and temporal phase synchronization with one another?",
        correct: "Coherence",
        w1: "Collimation",
        w2: "Monochromaticity",
        exp: "Temporal coherence defines a stable phase over time (narrow linewidth), while spatial coherence allows laser beams to stay tightly focused over astronomical distances."
      }
    ],
    number: {
      q: "In what year CE was the world first functioning ruby optical laser successfully operated by Theodore Maiman at Hughes Research Laboratories?",
      target: 1960,
      unit: "CE",
      imperial: "1960 CE",
      exp: "Theodore Maiman successfully operated the first optical ruby laser on May 16, 1960, ushering in the modern era of photonics and laser technology."
    }
  },

  // Cycle 6: Telescopes, Microscopes & Optical Instruments
  {
    mcqs: [
      {
        q: "What optical telescope design invented by Sir Isaac Newton in 1668 uses a concave parabolic primary mirror instead of glass lenses to eliminate color fringing?",
        correct: "Reflecting Telescope",
        w1: "Refracting Telescope",
        w2: "Catadioptric Telescope",
        exp: "Newtonian reflectors use a curved primary mirror and flat secondary mirror to focus light, bypassing the chromatic aberration inherent in refractor lenses."
      },
      {
        q: "What optical lens defect occurs because different wavelengths of light refract at slightly different angles through glass, causing blurry colored edges around images?",
        correct: "Chromatic Aberration",
        w1: "Spherical Aberration",
        w2: "Astigmatism",
        exp: "Because glass refractive index varies with wavelength (dispersion), blue light focuses closer to the lens than red light, corrected using achromatic doublet lenses."
      },
      {
        q: "What central bright circular disc surrounded by faint diffraction rings represents the best possible diffraction-limited focal image of a point star?",
        correct: "Airy Disc",
        w1: "Fresnel Zone",
        w2: "Poisson Spot",
        exp: "Named after George Biddell Airy in 1835, the size of the Airy disc is inversely proportional to telescope aperture diameter, setting the limit on image sharpness."
      },
      {
        q: "What compound telescope design combines both refracting glass corrector plates and reflecting curved mirrors, such as Schmidt-Cassegrain systems?",
        correct: "Catadioptric Telescope",
        w1: "Keplerian Refractor",
        w2: "Gregorian Reflector",
        exp: "Catadioptric systems use thin aspheric corrector lenses to cancel out the spherical aberration of spherical primary mirrors in compact optical tubes."
      },
      {
        q: "What astronomical technology dynamically deforms thin telescope mirrors hundreds of times per second using actuators to cancel out atmospheric turbulence?",
        correct: "Adaptive Optics AO",
        w1: "Active Mirror Collimation",
        w2: "Speckle Masking",
        exp: "Using a sodium laser guide star to measure atmospheric wavefront distortions, adaptive optics allows ground telescopes to match or exceed Hubble image resolution."
      }
    ],
    number: {
      q: "What is the primary mirror diameter in meters of the James Webb Space Telescope JWST, composed of 18 gold-coated beryllium hexagonal segments?",
      target: 6.5,
      unit: "meters",
      imperial: "21.3 feet (6.5 m)",
      exp: "JWST primary mirror has a diameter of 6.5 meters (21.3 feet), offering over six times the light-collecting area of the 2.4-meter Hubble Space Telescope."
    }
  },

  // Cycle 7: Electromagnetism & Maxwell Equations
  {
    mcqs: [
      {
        q: "What Scottish physicist unified electricity, magnetism, and light into a single comprehensive mathematical framework of four field equations in 1865?",
        correct: "James Clerk Maxwell",
        w1: "Michael Faraday",
        w2: "Andre-Marie Ampere",
        exp: "Maxwell added the displacement current term to Ampere Law, demonstrating that self-propagating electromagnetic waves travel at the speed of light: $c = 1/\\sqrt{\\mu_0 \\varepsilon_0}$."
      },
      {
        q: "What fundamental law of electromagnetism states that a time-varying magnetic flux through a closed loop induces an electromotive force (EMF) and electric field?",
        correct: "Faraday Law of Induction",
        w1: "Gauss Law for Magnetism",
        w2: "Coulomb Electrostatic Law",
        exp: "Discovered by Michael Faraday in 1831 ($\\mathcal{E} = -\\frac{d\\Phi_B}{dt}$), electromagnetic induction provides the working principle for electrical generators and transformers."
      },
      {
        q: "What German physicist first experimentally proved the existence of Maxwell electromagnetic radio waves in 1887 using spark-gap transmitters?",
        correct: "Heinrich Hertz",
        w1: "Wilhelm Rontgen",
        w2: "Guglielmo Marconi",
        exp: "Hertz generated ultra-high-frequency radio waves in his laboratory, proving they exhibit the same reflection, refraction, and velocity properties as visible light."
      },
      {
        q: "What mathematical vector in classical electrodynamics represents the directional energy flux density (power per unit area) of an electromagnetic wave?",
        correct: "Poynting Vector",
        w1: "Lorentz Force Vector",
        w2: "Laplace Potential Vector",
        exp: "Defined as $\\mathbf{S} = \\frac{1}{\\mu_0} (\\mathbf{E} \\times \\mathbf{B})$, the Poynting vector points in the direction of energy propagation in Watts per square meter."
      },
      {
        q: "What electromagnetic law states that an induced electric current always flows in such a direction that its magnetic field opposes the change in flux that produced it?",
        correct: "Lenz Law",
        w1: "Biot-Savart Law",
        w2: "Ampere Circuital Law",
        exp: "Expressed by the minus sign in Faraday law, Heinrich Lenz principle enforces conservation of energy in electromagnetic systems and eddy-current braking."
      }
    ],
    number: {
      q: "How many fundamental partial differential equations make up Maxwell complete classical system of electrodynamics?",
      target: 4,
      unit: "equations",
      imperial: "4 Maxwell equations",
      exp: "Maxwell equations consist of four laws: Gauss Law for electricity, Gauss Law for magnetism, Faraday Law of induction, and Ampere Law with Maxwell displacement current."
    }
  },

  // Cycle 8: Color Science, Dispersion & Human Vision
  {
    mcqs: [
      {
        q: "What triangular glass optical element did Isaac Newton use in 1666 to prove that white sunlight is a composite mixture of all spectral rainbow colors?",
        correct: "Optical Prism",
        w1: "Plano-Convex Lens",
        w2: "Concave Parabolic Mirror",
        exp: "Newton Experimentum Crucis passed refracted colored beams through a second prism, proving that prisms do not colorize light but separate pre-existing wavelengths."
      },
      {
        q: "What photoreceptor cells in the human retina are responsible for photopic daylight color vision, classified into S, M, and L spectral types?",
        correct: "Cone Cells",
        w1: "Rod Cells",
        w2: "Retinal Ganglion Cells",
        exp: "Cones contain photopsin pigments sensitive to short (blue, ~420 nm), medium (green, ~530 nm), and long (red, ~560 nm) wavelengths, enabling trichromatic vision."
      },
      {
        q: "What primary colors are combined in additive color mixing (such as electronic RGB displays and phone screens) to produce white light?",
        correct: "Red, Green, and Blue RGB",
        w1: "Cyan, Magenta, and Yellow CMY",
        w2: "Red, Yellow, and Blue RYB",
        exp: "Additive color synthesis adds light wavelengths directly: combining red, green, and blue light stimulating all three human cone types produces the perception of white."
      },
      {
        q: "What optical scattering phenomenon causes Earth daytime sky to appear blue because short blue wavelengths scatter far more off atmospheric molecules?",
        correct: "Rayleigh Scattering",
        w1: "Mie Scattering",
        w2: "Raman Scattering",
        exp: "Rayleigh scattering intensity is inversely proportional to the fourth power of wavelength ($I \\propto 1/\\lambda^4$), scattering blue light (400 nm) nearly ten times more than red (700 nm)."
      },
      {
        q: "What optical scattering occurs when light strikes atmospheric particles comparable to or larger than the wavelength (like cloud water droplets), scattering all colors equally to appear white?",
        correct: "Mie Scattering",
        w1: "Rayleigh Scattering",
        w2: "Brillouin Scattering",
        exp: "Gustav Mie theory explains why dense clouds, fog, and milk appear white: larger water droplets scatter all visible wavelengths equally without color bias."
      }
    ],
    number: {
      q: "How many distinct types of color-sensing Cone photoreceptor cells S-cones, M-cones, L-cones exist in standard human trichromatic retinas?",
      target: 3,
      unit: "cone types",
      imperial: "3 types of cone photoreceptors",
      exp: "Human daylight color vision is trichromatic, relying on three distinct cone classes: S-cones (blue), M-cones (green), and L-cones (red)."
    }
  },

  // Cycle 9: Quantum Optics & Non-Linear Crystals
  {
    mcqs: [
      {
        q: "What quantum optics process inside a non-linear crystal (such as BBO) splits an incoming ultraviolet pump photon into a pair of entangled lower-energy photons?",
        correct: "Spontaneous Parametric Down-Conversion SPDC",
        w1: "Second Harmonic Generation",
        w2: "Stimulated Raman Scattering",
        exp: "SPDC obeys energy conservation ($\\omega_p = \\omega_s + \\omega_i$) and phase matching, serving as the standard laboratory source of polarization-entangled photon pairs."
      },
      {
        q: "What non-linear optical process doubles the frequency of an incident laser beam, converting infrared 1,064 nm laser light into green 532 nm light?",
        correct: "Second-Harmonic Generation SHG",
        w1: "Optical Parametric Amplification",
        w2: "Pockels Electro-Optic Shift",
        exp: "In non-centrosymmetric crystals like KTP or lithium niobate, intense electric fields drive non-linear polarization, generating waves at twice the fundamental frequency."
      },
      {
        q: "What quantum cryptography protocol uses single-photon quantum polarization states to establish mathematically unbreakable encryption keys between two users?",
        correct: "Quantum Key Distribution QKD BB84",
        w1: "RSA Public Key Encryption",
        w2: "Diffie-Hellman Key Exchange",
        exp: "Because eavesdropping alters quantum states via wavefunction collapse (no-cloning theorem), sender and receiver immediately detect any interception attempts."
      },
      {
        q: "What non-linear electro-optic effect alters the refractive index of an optical material in direct proportion to the square of an applied electric field?",
        correct: "Kerr Electro-Optic Effect",
        w1: "Pockels Effect",
        w2: "Faraday Magneto-Optic Effect",
        exp: "The Kerr effect induces birefringence quadratic in electric field intensity, utilized in ultra-fast Kerr-lens mode-locking for femtosecond pulse lasers."
      },
      {
        q: "What non-classical state of light exhibits quantum uncertainty in one observable variable (like amplitude or phase) squeezed below the standard quantum shot-noise limit?",
        correct: "Squeezed Light",
        w1: "Thermal Light",
        w2: "Coherent Laser Beam",
        exp: "Squeezed vacuum states are injected into Advanced LIGO laser arms to reduce quantum shot noise, boosting gravitational wave detection sensitivity by 50%."
      }
    ],
    number: {
      q: "In the BB84 protocol for Quantum Key Distribution, how many non-orthogonal quantum polarization states are utilized across two measurement bases?",
      target: 4,
      unit: "polarization states",
      imperial: "4 quantum states (0°, 90°, 45°, 135°)",
      exp: "The Bennett-Brassard 1984 (BB84) protocol uses four polarization states across rectilinear ($0^\\circ, 90^\\circ$) and diagonal ($45^\\circ, 135^\\circ$) bases to ensure security."
    }
  },

  // Cycle 10: Fiber Optics & Integrated Photonics
  {
    mcqs: [
      {
        q: "What rare-earth optical dopant added to silica fiber cores amplifies optical signals directly using infrared pump lasers without converting to electrical signals?",
        correct: "Erbium-Doped Fiber Amplifier EDFA",
        w1: "Neodymium",
        w2: "Ytterbium",
        exp: "Developed by David Payne in 1987, EDFAs revolutionized the global internet by amplifying C-band 1,550 nm light optically every 80 km along undersea cables."
      },
      {
        q: "What telecommunications multiplexing technology transmits dozens of distinct data channels simultaneously through a single optical fiber strand on separate wavelengths?",
        correct: "Dense Wavelength-Division Multiplexing DWDM",
        w1: "Time-Division Multiplexing TDM",
        w2: "Frequency-Shift Keying",
        exp: "DWDM combines up to 96 separate optical channels spaced at 50 GHz intervals onto a single hair-thin fiber strand, achieving multi-terabit transmission rates."
      },
      {
        q: "What optical dispersion occurs in multi-mode fiber because light rays traveling along different zig-zag reflection paths arrive at slightly different transit times?",
        correct: "Modal Dispersion",
        w1: "Chromatic Dispersion",
        w2: "Polarization Mode Dispersion",
        exp: "Modal dispersion causes light pulses to spread out and overlap, which is why long-haul telecommunications strictly use single-mode fiber with tiny 9-micron cores."
      },
      {
        q: "What technology fabricates micro-scale lasers, modulators, and optical waveguides directly onto silicon semiconductor microchips to accelerate computer data buses?",
        correct: "Silicon Photonics",
        w1: "Quantum Lithography",
        w2: "Optoelectronic Spintronics",
        exp: "Silicon photonics replaces copper wire interconnects inside data centers with on-chip laser waveguides, slashing electrical power consumption and latency."
      },
      {
        q: "What advanced optical fibers contain hollow air cores or periodic micro-capillary air holes to guide light with ultra-low latency and higher damage thresholds?",
        correct: "Hollow-Core Photonic Crystal Fibers",
        w1: "Graded-Index Multi-Mode Fibers",
        w2: "Step-Index Polymer Fibers",
        exp: "Hollow-core fibers guide light through air rather than glass, transmitting optical data at 99.7% of the speed of light in vacuum with 30% lower latency."
      }
    ],
    number: {
      q: "What is the standard infrared laser optical wavelength in nanometers nm used for long-distance low-loss fiber optic communications in the C-band?",
      target: 1550,
      unit: "nm",
      imperial: "1,550 nm (1.55 micrometers)",
      exp: "Silica glass fiber exhibits its absolute minimum optical attenuation (approx 0.15 to 0.2 dB/km) at 1,550 nanometers, defining the global telecom C-band."
    }
  }
];

buildQuiz({
  id: 'optics-light-electromagnetism-60',
  theme: 'Light, Lasers & Electromagnetic Spectrum',
  title: 'Light, Lasers & Electromagnetic Spectrum',
  description: 'A 60-question grand master assessment exploring electromagnetic waves, Snell refraction, Young interference, lasers, Maxwell equations, and fiber optics.',
  category: 'Astronomy, Physics & Chemistry',
  difficulty: 'moderate'
}, opticsCycles);

console.log('Finished generating Quizzes 16, 17!');
