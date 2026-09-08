const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 9. computer-science-history-code-60
// Theme: "Computer Science History: Pioneers, Silicon & Algorithms"
// Category: "Tech, Inventions & Engineering"
// =========================================================================
const csCycles = [
  // Cycle 1: Pioneers & Foundational Theory
  {
    mcqs: [
      {
        q: "Who is widely celebrated as the world first computer programmer for writing an algorithm to compute Bernoulli numbers on Charles Babbage Analytical Engine?",
        correct: "Ada Lovelace",
        w1: "Grace Hopper",
        w2: "Margaret Hamilton",
        exp: "Ada Lovelace recognized that Babbage mechanical engine could process symbols and music beyond mere arithmetic calculation."
      },
      {
        q: "Which English mathematician and polymath designed the Difference Engine and the general-purpose mechanical Analytical Engine in the nineteenth century?",
        correct: "Charles Babbage",
        w1: "George Boole",
        w2: "William Stanley Jevons",
        exp: "Charles Babbage conceptualized mechanical computing machines utilizing punch cards inspired by the Jacquard loom."
      },
      {
        q: "Which British mathematician formulated the concept of a universal computing machine and cracked German Enigma ciphers at Bletchley Park during World War II?",
        correct: "Alan Turing",
        w1: "John von Neumann",
        w2: "Alonzo Church",
        exp: "Alan Turing 1936 paper introduced the Turing Machine, formalizing the modern mathematical foundations of computation and algorithms."
      },
      {
        q: "Which Bell Labs mathematician published the landmark 1948 paper A Mathematical Theory of Communication, founding information theory?",
        correct: "Claude Shannon",
        w1: "Norbert Wiener",
        w2: "Warren Weaver",
        exp: "Claude Shannon proved that electrical switches could implement Boolean logic, introducing the bit as the fundamental unit of information."
      },
      {
        q: "What standard computer architecture stores both program instructions and working data in the same shared physical memory space?",
        correct: "Von Neumann Architecture",
        w1: "Harvard Architecture",
        w2: "Turing Architecture",
        exp: "Described by John von Neumann in 1945, this design comprises a central processing unit, control unit, memory, and input-output mechanisms."
      }
    ],
    number: {
      q: "In what year did Ada Lovelace publish her seminal translation and notes containing the first published computer algorithm?",
      target: 1843,
      unit: "year",
      imperial: "1843 AD",
      exp: "Ada Lovelace published her extensive Notes on Luigi Menabrea sketch of Babbage Analytical Engine in 1843."
    }
  },

  // Cycle 2: Early Electronic Computers & Vacuum Tubes
  {
    mcqs: [
      {
        q: "Which pioneering 1945 electronic computer built at the University of Pennsylvania utilized over 17,000 vacuum tubes for artillery ballistic calculations?",
        correct: "ENIAC",
        w1: "UNIVAC I",
        w2: "EDVAC",
        exp: "Designed by John Mauchly and J. Presper Eckert, ENIAC operated at electronic speeds a thousand times faster than electromechanical calculators."
      },
      {
        q: "What was the first commercial mass-produced electronic computer in the United States, famous for correctly predicting the 1952 presidential election on live television?",
        correct: "UNIVAC I",
        w1: "IBM 701",
        w2: "ENIAC",
        exp: "UNIVAC I was purchased by the US Census Bureau in 1951 and achieved nationwide fame when it projected Dwight Eisenhower landslide victory."
      },
      {
        q: "Which secret British electronic computer, designed by Tommy Flowers and deployed at Bletchley Park in 1943, cracked German Lorenz teleprinter ciphers?",
        correct: "Colossus",
        w1: "The Bombe",
        w2: "EDSAC",
        exp: "Colossus was the world first programmable electronic digital computer, kept strictly classified until the 1970s."
      },
      {
        q: "Which British machine built at the University of Manchester in June 1948 was the world first electronic computer to execute a stored program?",
        correct: "Manchester Baby",
        w1: "EDSAC",
        w2: "Ferranti Mark 1",
        exp: "Also known as the Small-Scale Experimental Machine, it successfully executed a program stored in Williams-Kilburn cathode-ray tube memory."
      },
      {
        q: "Which American naval officer and computer pioneer popularized the term compiler and led the development of early high-level languages like FLOW-MATIC?",
        correct: "Grace Hopper",
        w1: "Jean Bartik",
        w2: "Adele Goldstine",
        exp: "Rear Admiral Grace Hopper famously documented the first actual computer bug when a moth was extracted from a Mark II relay in 1947."
      }
    ],
    number: {
      q: "In what year was the ENIAC publicly unveiled and dedicated at the University of Pennsylvania?",
      target: 1946,
      unit: "year",
      imperial: "1946 AD",
      exp: "ENIAC was formally dedicated on February 15, 1946, hailed by the press as a Giant Brain capable of calculating trajectories in seconds."
    }
  },

  // Cycle 3: Semiconductor Revolution & Microprocessors
  {
    mcqs: [
      {
        q: "In December 1947, which Bell Labs research team invented the point-contact transistor, replacing bulky vacuum tubes with solid-state silicon?",
        correct: "John Bardeen, Walter Brattain, and William Shockley",
        w1: "Robert Noyce, Jack Kilby, and Gordon Moore",
        w2: "Ted Hoff, Federico Faggin, and Stanley Mazor",
        exp: "The invention of the transistor earned the 1956 Nobel Prize in Physics and laid the physical foundation for all modern digital electronics."
      },
      {
        q: "Which two American inventors independently developed the integrated circuit or microchip in 1958 and 1959 at Texas Instruments and Fairchild Semiconductor?",
        correct: "Jack Kilby and Robert Noyce",
        w1: "Gordon Moore and Andrew Grove",
        w2: "William Shockley and Lee de Forest",
        exp: "Jack Kilby created a hybrid germanium circuit while Robert Noyce invented the monolithic silicon planar chip with interconnected aluminum tracks."
      },
      {
        q: "What was the world first commercial single-chip microprocessor, released by Intel in November 1971 with 2,300 transistors on a 4-bit CPU?",
        correct: "Intel 4004",
        w1: "Intel 8008",
        w2: "Motorola 6800",
        exp: "Designed by Federico Faggin, Ted Hoff, Stanley Mazor, and Masatoshi Shima, the 4004 condensed a room-sized computer CPU into a silicon microchip."
      },
      {
        q: "What famous empirical observation formulated by Gordon Moore in 1965 projected that the number of transistors on a microchip would double roughly every two years?",
        correct: "Moore Law",
        w1: "Amdahl Law",
        w2: "Metcalfe Law",
        exp: "Moore Law served as the guiding technology roadmap for the global semiconductor industry for over five decades of exponential scaling."
      },
      {
        q: "Which Northern California agricultural valley was renamed in the 1970s due to the dense concentration of semiconductor and microprocessor manufacturing firms?",
        correct: "Silicon Valley",
        w1: "San Fernando Valley",
        w2: "Napa Valley",
        exp: "Journalist Don Hoefler popularized the name Silicon Valley in 1971 to describe the Santa Clara Valley boom in silicon chip startups."
      }
    ],
    number: {
      q: "How many total transistors were integrated onto the historic Intel 4004 microprocessor in 1971?",
      target: 2300,
      unit: "transistors",
      imperial: "2,300 transistors",
      exp: "The 4-bit Intel 4004 contained exactly 2,300 p-channel silicon-gate MOS transistors operating at a clock frequency of 740 kilohertz."
    }
  },

  // Cycle 4: Programming Languages Evolution
  {
    mcqs: [
      {
        q: "Which 1957 IBM programming language developed by John Backus was the first widely adopted high-level language designed for scientific computing?",
        correct: "FORTRAN",
        w1: "COBOL",
        w2: "ALGOL",
        exp: "FORTRAN, short for Formula Translation, allowed engineers to write mathematical expressions instead of raw assembly machine instructions."
      },
      {
        q: "Which high-level programming language designed in 1959 emphasized English-like syntax for business data processing and payroll accounting?",
        correct: "COBOL",
        w1: "BASIC",
        w2: "PL/I",
        exp: "COBOL, or Common Business-Oriented Language, became the backbone of banking, insurance, and federal enterprise computing systems worldwide."
      },
      {
        q: "Which functional programming language developed by John McCarthy at MIT in 1958 became the standard language for artificial intelligence research?",
        correct: "Lisp",
        w1: "Prolog",
        w2: "APL",
        exp: "Lisp introduced pioneering computer science concepts including nested lists, recursion, garbage collection, and dynamic typing."
      },
      {
        q: "Which iconic systems programming language was developed by Dennis Ritchie at Bell Labs between 1972 and 1973 to rewrite the Unix operating system?",
        correct: "C",
        w1: "B",
        w2: "Pascal",
        exp: "C provided low-level memory control with high-level portability, becoming one of the most widely used and influential languages in history."
      },
      {
        q: "Which structured programming language was developed by Swiss computer scientist Niklaus Wirth in 1970 to teach disciplined programming techniques?",
        correct: "Pascal",
        w1: "Ada",
        w2: "Simula",
        exp: "Pascal enforced strong static typing and clear control flow, serving as the basis for Turbo Pascal and the original Apple Macintosh system software."
      }
    ],
    number: {
      q: "In what year was the foundational C programming language created by Dennis Ritchie at Bell Telephone Laboratories?",
      target: 1972,
      unit: "year",
      imperial: "1972 AD",
      exp: "Dennis Ritchie developed C around 1972 at Bell Labs as an evolution of Ken Thompson B language for the DEC PDP-11."
    }
  },

  // Cycle 5: Operating Systems & The Unix Revolution
  {
    mcqs: [
      {
        q: "Which revolutionary multitasking operating system was created in 1969 at Bell Labs by Ken Thompson, Dennis Ritchie, and Brian Kernighan?",
        correct: "Unix",
        w1: "CP/M",
        w2: "VMS",
        exp: "Unix introduced modular philosophy, hierarchical file systems, pipes, and text streams, serving as the ancestor of Linux, macOS, and Android."
      },
      {
        q: "Which university developed the BSD variant of Unix in the late 1970s, introducing virtual memory paging and the TCP/IP networking stack?",
        correct: "University of California, Berkeley",
        w1: "Stanford University",
        w2: "MIT",
        exp: "Berkeley Software Distribution led by Bill Joy provided key software tools and protocols that powered the early academic Internet."
      },
      {
        q: "In August 1991, which Finnish computer science student posted a message announcing a free hobby operating system kernel named Linux?",
        correct: "Linus Torvalds",
        w1: "Richard Stallman",
        w2: "Andrew Tanenbaum",
        exp: "Linus Torvalds created the monolithic Linux kernel, pairing it with GNU userland utilities to create the dominant open-source operating system."
      },
      {
        q: "Which operating system originally purchased from Tim Paterson as QDOS was licensed by Microsoft to IBM for the 1981 IBM Personal Computer?",
        correct: "MS-DOS",
        w1: "Xenix",
        w2: "OS/2",
        exp: "Microsoft modified 86-DOS into PC DOS / MS-DOS, retaining non-exclusive licensing rights that propelled Microsoft into an industry giant."
      },
      {
        q: "Which pioneering 8-bit operating system created by Gary Kildall in 1974 became the industry standard for Intel 8080 microcomputers?",
        correct: "CP/M",
        w1: "TRS-DOS",
        w2: "Apple DOS",
        exp: "Control Program for Microcomputers established disk operating system conventions and early hardware abstraction layers."
      }
    ],
    number: {
      q: "In what year did Linus Torvalds release his famous announcement of the Linux kernel to the comp.os.minix newsgroup?",
      target: 1991,
      unit: "year",
      imperial: "1991 AD",
      exp: "Linus Torvalds posted his historic announcement on August 25, 1991, offering Linux 0.01 as a free operating system kernel."
    }
  },

  // Cycle 6: The Internet, Networking & The Web
  {
    mcqs: [
      {
        q: "On October 29, 1969, between which two California university research labs was the first packet message transmitted over ARPANET?",
        correct: "UCLA and Stanford Research Institute",
        w1: "UC Berkeley and Caltech",
        w2: "USC and UC Santa Barbara",
        exp: "Student programmer Charley Kline attempted to type LOGIN from UCLA, but the system crashed after transmitting the first two letters, LO."
      },
      {
        q: "Which two computer scientists designed the fundamental Transmission Control Protocol and Internet Protocol networking architecture?",
        correct: "Vinton Cerf and Robert Kahn",
        w1: "Tim Berners-Lee and Robert Cailliau",
        w2: "Leonard Kleinrock and Paul Baran",
        exp: "Vint Cerf and Bob Kahn established open network protocols that allowed diverse heterogeneous computer networks to interoperate seamlessly."
      },
      {
        q: "Which British scientist invented the World Wide Web at CERN in 1989 by combining hypertext, TCP/IP, and universal resource identifiers?",
        correct: "Tim Berners-Lee",
        w1: "Marc Andreessen",
        w2: "Ted Nelson",
        exp: "Tim Berners-Lee created the first web server, the first web browser named WorldWideWeb, and the HTML markup standard."
      },
      {
        q: "Which local area network technology, utilizing CSMA/CD to transmit data over coaxial cables, was invented by Robert Metcalfe at Xerox PARC in 1973?",
        correct: "Ethernet",
        w1: "Token Ring",
        w2: "ARCNET",
        exp: "Ethernet became the dominant global standard for wired computer networking, standardizing data frames and MAC addressing."
      },
      {
        q: "Which computer scientist invented the hierarchical Domain Name System in 1983, translating human-readable hostnames into IP addresses?",
        correct: "Paul Mockapetris",
        w1: "Jon Postel",
        w2: "Radia Perlman",
        exp: "Paul Mockapetris developed DNS to replace centralized text-file hostname registries with a scalable distributed database."
      }
    ],
    number: {
      q: "In what year did CERN release the World Wide Web software into the public domain on a royalty-free basis?",
      target: 1993,
      unit: "year",
      imperial: "1993 AD",
      exp: "On April 30, 1993, CERN published the statement putting World Wide Web technology in the public domain, ensuring universal open access."
    }
  },

  // Cycle 7: Algorithms, Data Structures & Complexity
  {
    mcqs: [
      {
        q: "Which Dutch computer scientist designed the classic 1956 greedy algorithm for finding the shortest path between nodes in a weighted graph?",
        correct: "Edsger W. Dijkstra",
        w1: "Tony Hoare",
        w2: "Donald Knuth",
        exp: "Dijkstra algorithm is widely used in network routing protocols like OSPF and digital GPS navigation mapping systems."
      },
      {
        q: "Which efficient divide-and-conquer sorting algorithm with an average time complexity of O n log n was invented by British scientist Tony Hoare in 1959?",
        correct: "Quicksort",
        w1: "Mergesort",
        w2: "Heapsort",
        exp: "Quicksort recursively partitions an array around a selected pivot element so smaller items precede larger items."
      },
      {
        q: "What fundamental open question in computational complexity theory asks whether every problem whose solution can be verified quickly can also be solved quickly?",
        correct: "P versus NP problem",
        w1: "Halting problem",
        w2: "Collatz conjecture",
        exp: "The P versus NP question is one of the seven Millennium Prize Problems, holding profound implications for cryptography and optimization."
      },
      {
        q: "What is the worst-case time complexity of the binary search algorithm when locating a target value inside a sorted array of N elements?",
        correct: "O log N",
        w1: "O N",
        w2: "O N log N",
        exp: "Binary search repeatedly divides the search interval in half, achieving logarithmic time complexity regardless of array size."
      },
      {
        q: "Which link-analysis algorithm created by Larry Page and Sergey Brin at Stanford in 1996 ranked webpages based on inbound hyperlink structure?",
        correct: "PageRank",
        w1: "HITS Algorithm",
        w2: "TrustRank",
        exp: "PageRank modeled web browsing as a random walk, interpreting a link from one page to another as an authoritative vote."
      }
    ],
    number: {
      q: "In what year did British computer scientist Tony Hoare develop the foundational Quicksort algorithm while in Moscow?",
      target: 1959,
      unit: "year",
      imperial: "1959 AD",
      exp: "Tony Hoare invented Quicksort in 1959 while developing machine translation software for the National Physical Laboratory."
    }
  },

  // Cycle 8: Cryptography & Security Milestones
  {
    mcqs: [
      {
        q: "Which asymmetric public-key cryptosystem developed in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman relies on the difficulty of factoring large primes?",
        correct: "RSA",
        w1: "Diffie-Hellman",
        w2: "Elliptic Curve Cryptography",
        exp: "RSA enabled secure digital communication and digital signatures over insecure public channels without prior shared secret keys."
      },
      {
        q: "Which landmark cryptographic protocol published in 1976 established a method for two parties to securely generate a shared secret key over a public channel?",
        correct: "Diffie-Hellman Key Exchange",
        w1: "RSA Encryption",
        w2: "ElGamal Protocol",
        exp: "Whitfield Diffie and Martin Hellman introduced public-key cryptography based on the computational hardness of the discrete logarithm problem."
      },
      {
        q: "What electromechanical codebreaking device designed by Alan Turing and Gordon Welchman deciphered German Enigma naval and military radio messages?",
        correct: "The Bombe",
        w1: "Colossus",
        w2: "Heath Robinson",
        exp: "The Bombe tested possible rotor wiring combinations against suspected plaintext cribs to identify daily Enigma encryption keys."
      },
      {
        q: "What principle in modern cryptography states that a cryptographic system should remain secure even if everything about the design except the key is public?",
        correct: "Kerckhoffs Principle",
        w1: "Shannon Maxim",
        w2: "Turing Theorem",
        exp: "Auguste Kerckhoffs formulated this rule in 1883, rejecting security through obscurity in favor of mathematically proven key strength."
      },
      {
        q: "What cryptographic hash algorithm family designed by the NSA in 2001 produces a fixed 256-bit digest widely used in SSL certificates and Bitcoin?",
        correct: "SHA-256",
        w1: "MD5",
        w2: "SHA-1",
        exp: "SHA-256 is a one-way cryptographic hash function engineered so that any slight input alteration generates an unpredictable output."
      }
    ],
    number: {
      q: "In what year was the RSA public-key cryptosystem publicly disclosed and submitted to the patent office?",
      target: 1977,
      unit: "year",
      imperial: "1977 AD",
      exp: "Rivest, Shamir, and Adleman published their breakthrough cryptosystem in August 1977 in an MIT technical memo and Scientific American."
    }
  },

  // Cycle 9: Personal Computing & Graphical Interfaces
  {
    mcqs: [
      {
        q: "Which research center in Palo Alto, California, invented the graphical user interface, the computer mouse, bitmapped displays, and laser printing in the 1970s?",
        correct: "Xerox PARC",
        w1: "Bell Labs",
        w2: "SRI International",
        exp: "Xerox Palo Alto Research Center developed the Xerox Alto in 1973, pioneering modern desktop visual computing."
      },
      {
        q: "What 1968 public demonstration by Douglas Engelbart at the Fall Joint Computer Conference introduced the computer mouse, hypertext, and video calling?",
        correct: "The Mother of All Demos",
        w1: "The Menlo Park Keynote",
        w2: "The Silicon Showcase",
        exp: "Douglas Engelbart and his team demonstrated collaborative real-time digital text editing, windowing systems, and a wooden three-button mouse."
      },
      {
        q: "Which mass-market personal computer designed by Steve Wozniak in 1977 featured built-in color graphics, expansion slots, and a plastic molded case?",
        correct: "Apple II",
        w1: "Commodore PET",
        w2: "TRS-80",
        exp: "The Apple II became a commercial triumph, driven into corporate offices by the first computerized spreadsheet application, VisiCalc."
      },
      {
        q: "Which personal computer released in August 1981 established open hardware architecture standards that dominated desktop computing for decades?",
        correct: "IBM Personal Computer 5150",
        w1: "Apple Macintosh",
        w2: "Amiga 1000",
        exp: "The IBM PC utilized off-the-shelf components including an Intel 8088 CPU and Microsoft MS-DOS, creating the IBM-compatible ecosystem."
      },
      {
        q: "Which 1984 Apple computer popularized the graphical user interface and desktop metaphor for everyday consumers, launched with a famous Ridley Scott commercial?",
        correct: "Macintosh",
        w1: "Lisa",
        w2: "NeXT Computer",
        exp: "The Macintosh 128K featured a 9-inch monochrome monitor, a 3.5-inch floppy drive, and bundled MacPaint and MacWrite software."
      }
    ],
    number: {
      q: "In what year did Douglas Engelbart present his landmark 90-minute Mother of All Demos in San Francisco?",
      target: 1968,
      unit: "year",
      imperial: "1968 AD",
      exp: "On December 9, 1968, Douglas Engelbart presented the interactive NLS system before a live audience of a thousand computer professionals."
    }
  },

  // Cycle 10: Databases, Version Control & Modern Paradigms
  {
    mcqs: [
      {
        q: "Which IBM researcher published the landmark 1970 paper introducing the relational model for database management, organizing data into tables?",
        correct: "Edgar F. Codd",
        w1: "Peter Chen",
        w2: "Charles Bachman",
        exp: "E. F. Codd applied first-order predicate logic to databases, providing the mathematical foundation for SQL and relational engines."
      },
      {
        q: "What distributed version control system was created in 2005 by Linus Torvalds to manage the source code development of the Linux kernel?",
        correct: "Git",
        w1: "Subversion",
        w2: "Mercurial",
        exp: "Git was designed for high performance, non-linear branching, and decentralized code management, becoming the universal industry standard."
      },
      {
        q: "What object-oriented programming language developed at Xerox PARC by Alan Kay, Dan Ingalls, and Adele Goldberg pioneered pure object message passing?",
        correct: "Smalltalk",
        w1: "C++",
        w2: "Java",
        exp: "Smalltalk treated everything as an object, profoundly shaping modern languages such as Objective-C, Python, and Ruby."
      },
      {
        q: "In quantum computing, what fundamental physical unit of quantum information can exist in a superposition of both zero and one simultaneously?",
        correct: "Qubit",
        w1: "Qutrit",
        w2: "Quon",
        exp: "Quantum bits leverage quantum mechanical superposition and entanglement to solve specific computational problems exponentially faster."
      },
      {
        q: "Which organization was founded in 1998 by Bruce Perens and Eric S. Raymond to promote and certify open-source software licenses?",
        correct: "Open Source Initiative",
        w1: "Free Software Foundation",
        w2: "Apache Software Foundation",
        exp: "The OSI established the Open Source Definition, providing legal criteria for software redistribution, source code access, and non-discrimination."
      }
    ],
    number: {
      q: "In what year did Edgar F. Codd publish his landmark paper A Relational Model of Data for Large Shared Data Banks?",
      target: 1970,
      unit: "year",
      imperial: "1970 AD",
      exp: "E. F. Codd published his paper in June 1970 in the Communications of the ACM, transforming database management forever."
    }
  }
];

buildQuiz({
  id: "computer-science-history-code-60",
  theme: "Computer Science History: Pioneers, Silicon & Algorithms",
  title: "Computer Science History: Pioneers, Silicon & Algorithms",
  description: "Comprehensive 60-question historical journey through computing pioneers, binary logic, the silicon revolution, programming languages, and foundational algorithms.",
  category: "Tech, Inventions & Engineering",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z"
}, csCycles);


// =========================================================================
// 10. aviation-flight-aircraft-60
// Theme: "Aviation History: Legendary Planes, Supersonic Jets & Aces"
// Category: "Tech, Inventions & Engineering"
// =========================================================================
const aviationCycles = [
  // Cycle 1: The Birth of Powered Flight
  {
    mcqs: [
      {
        q: "On December 17, 1903, which brothers achieved the first controlled, sustained, powered heavier-than-air human flight at Kitty Hawk, North Carolina?",
        correct: "Orville and Wilbur Wright",
        w1: "Charles and Frank Duryea",
        w2: "Auguste and Louis Lumière",
        exp: "Orville piloted the first successful 12-second flight covering 37 meters over the Kill Devil Hills sand dunes."
      },
      {
        q: "Which French aviator made the historic first airplane crossing of the English Channel in July 1909 aboard his self-designed Blériot XI monoplane?",
        correct: "Louis Blériot",
        w1: "Alberto Santos-Dumont",
        w2: "Henri Farman",
        exp: "Louis Blériot flew thirty-seven kilometers from Calais to Dover Castle in thirty-six minutes, winning the Daily Mail prize."
      },
      {
        q: "Which Brazilian aviation pioneer conducted the first public unassisted powered airplane flight in Europe aboard the 14-bis in Paris in 1906?",
        correct: "Alberto Santos-Dumont",
        w1: "Jorge Chávez",
        w2: "Bartolomeu de Gusmão",
        exp: "Santos-Dumont 14-bis took off under its own wheeled power before the French Aero Club, without the catapults used by the Wrights."
      },
      {
        q: "Which German glider pioneer known as the Flying Man made over two thousand successful glider flights before dying in an 1896 crash?",
        correct: "Otto Lilienthal",
        w1: "Percy Pilcher",
        w2: "Octave Chanute",
        exp: "Lilienthal published aerodynamic research on curved airfoils that directly inspired the Wright brothers early glider experiments."
      },
      {
        q: "Which American aviation pioneer invented wing ailerons to replace wing-warping and built the first practical seaplanes and flying boats?",
        correct: "Glenn Curtiss",
        w1: "Samuel Langley",
        w2: "Charles Manly",
        exp: "Glenn Curtiss founded the Curtiss Aeroplane and Motor Company, providing flying boats for naval aviation and early airmail routes."
      }
    ],
    number: {
      q: "What was the exact distance in meters covered by Orville Wright during the first successful powered flight on December 17, 1903?",
      target: 37,
      unit: "meters",
      imperial: "120 feet",
      exp: "Orville Wright maiden flight lasted 12 seconds and covered 36.5 meters (rounded to 37 meters) against a freezing headwind."
    }
  },

  // Cycle 2: The Golden Age of Flight & Solo Crossings
  {
    mcqs: [
      {
        q: "In May 1927, who made the historic first solo nonstop transatlantic flight from New York to Paris aboard the monoplane Spirit of St. Louis?",
        correct: "Charles Lindbergh",
        w1: "Wiley Post",
        w2: "Howard Hughes",
        exp: "Lindbergh flew 5,800 kilometers in thirty-three and a half hours, landing triumphantly at Le Bourget Field in Paris to claim the Orteig Prize."
      },
      {
        q: "Who was the first woman to fly solo nonstop across the Atlantic Ocean, completing the flight in a Lockheed Vega in May 1932?",
        correct: "Amelia Earhart",
        w1: "Bessie Coleman",
        w2: "Amy Johnson",
        exp: "Amelia Earhart took off from Newfoundland and landed in a pasture in Northern Ireland exactly five years after Lindbergh flight."
      },
      {
        q: "Which twin-engine American airliner introduced in 1935 transformed commercial aviation by making passenger transport reliably profitable without government subsidies?",
        correct: "Douglas DC-3",
        w1: "Boeing 247",
        w2: "Lockheed Electra",
        exp: "The DC-3 cruised at 330 km/h with twenty-one passengers, becoming the workhorse of civilian airlines and military transport as the C-47 Skytrain."
      },
      {
        q: "Which one-eyed American aviator made the first solo flight around the world in 1933 and pioneered early pressure suits for high-altitude flight?",
        correct: "Wiley Post",
        w1: "Roscoe Turner",
        w2: "Jimmy Doolittle",
        exp: "Wiley Post flew the Lockheed Vega Winnie Mae around the globe in seven days and nineteen hours, discovering the high-altitude jet stream."
      },
      {
        q: "Which colossal luxury flying boat operated by Pan American World Airways inaugurated scheduled transatlantic passenger service in 1939?",
        correct: "Boeing 314 Clipper",
        w1: "Martin M-130",
        w2: "Sikorsky S-42",
        exp: "The Boeing 314 Clipper featured dining salons, sleeping berths, and dressing rooms for wealthy travelers flying across the Atlantic and Pacific."
      }
    ],
    number: {
      q: "How many total hours did Charles Lindbergh spend flying solo across the Atlantic Ocean from Roosevelt Field to Paris in 1927?",
      target: 33,
      unit: "hours",
      imperial: "33.5 hours",
      exp: "Lindbergh nonstop solo flight lasted 33 hours and 30 minutes, covering approximately 5,800 kilometers across fog and ice."
    }
  },

  // Cycle 3: WWII Fighter Legends & Aces
  {
    mcqs: [
      {
        q: "Which British fighter aircraft with iconic elliptical wings designed by Reginald Mitchell played a decisive role in the 1940 Battle of Britain?",
        correct: "Supermarine Spitfire",
        w1: "Hawker Hurricane",
        w2: "Gloster Gladiator",
        exp: "Powered by the Rolls-Royce Merlin engine, the Spitfire matched the German Messerschmitt Bf 109 in climb rate and surpassed it in turning agility."
      },
      {
        q: "Which fighter aircraft served as the primary backbone of the German Luftwaffe fighter force throughout the entirety of World War II?",
        correct: "Messerschmitt Bf 109",
        w1: "Focke-Wulf Fw 190",
        w2: "Heinkel He 112",
        exp: "Designed by Willy Messerschmitt, over 33,000 Bf 109 fighters were produced, claiming more aerial victories than any other aircraft in history."
      },
      {
        q: "Which American long-range escort fighter, transformed by fitting a British Rolls-Royce Merlin engine, escorted Allied bombers deep into Germany?",
        correct: "North American P-51 Mustang",
        w1: "Republic P-47 Thunderbolt",
        w2: "Curtiss P-40 Warhawk",
        exp: "Equipped with droppable fuel tanks, the P-51 Mustang could escort B-17 bombers all the way to Berlin and back, breaking the Luftwaffe."
      },
      {
        q: "Which nimble Japanese carrier-borne fighter aircraft dominated the Pacific theater in the early years of World War II with exceptional range?",
        correct: "Mitsubishi A6M Zero",
        w1: "Nakajima Ki-43",
        w2: "Kawasaki Ki-61",
        exp: "The Zero achieved dogfighting superiority in 1941-1942 due to light weight and maneuverability, though lacking pilot armor and self-sealing fuel tanks."
      },
      {
        q: "Which German World War I fighter ace, known as the Red Baron, was credited with eighty official aerial combat victories before being shot down in 1918?",
        correct: "Manfred von Richthofen",
        w1: "Ernst Udet",
        w2: "Werner Voss",
        exp: "Richthofen led the Flying Circus squadron Jagdgeschwader 1, piloting his iconic scarlet Fokker Dr.I triplane."
      }
    ],
    number: {
      q: "How many official confirmed aerial victories was Manfred von Richthofen, the Red Baron, credited with during World War I?",
      target: 80,
      unit: "victories",
      imperial: "80 confirmed victories",
      exp: "Manfred von Richthofen was officially credited with 80 confirmed combat victories, making him the highest-scoring ace of World War I."
    }
  },

  // Cycle 4: WWII Heavy Bombers & Jet Genesis
  {
    mcqs: [
      {
        q: "Which heavily armed four-engine American heavy bomber, dubbed the Flying Fortress, flew daylight precision bombing missions over occupied Europe?",
        correct: "Boeing B-17 Flying Fortress",
        w1: "Consolidated B-24 Liberator",
        w2: "North American B-25 Mitchell",
        exp: "The B-17 carried up to thirteen 0.50-caliber machine guns and could sustain catastrophic battle damage while returning crews safely home."
      },
      {
        q: "Which four-engine American bomber introduced pressurized crew cabins and remote-controlled gun turrets, dropping the atomic bombs in 1945?",
        correct: "Boeing B-29 Superfortress",
        w1: "Convair B-36 Peacemaker",
        w2: "Boeing B-50",
        exp: "The B-29 Enola Gay and Bockscar flew the atomic strike missions against Hiroshima and Nagasaki under the command of Colonel Paul Tibbets."
      },
      {
        q: "What was the world first operational jet-powered fighter aircraft, introduced into combat by the German Luftwaffe in mid-1944?",
        correct: "Messerschmitt Me 262",
        w1: "Gloster Meteor",
        w2: "Heinkel He 162",
        exp: "Powered by twin Junkers Jumo 004 axial-flow turbojets, the Me 262 flew over 870 km/h, outrunning all contemporary Allied piston fighters."
      },
      {
        q: "Which British four-engine heavy bomber was famous for delivering Barnes Wallis bouncing bombs during the Dam Busters raid in 1943?",
        correct: "Avro Lancaster",
        w1: "Handley Page Halifax",
        w2: "Short Stirling",
        exp: "The Lancaster carried the heaviest conventional bomb loads of World War II, including the colossal 10,000-kilogram Grand Slam earthquake bomb."
      },
      {
        q: "What was the only operational Allied jet aircraft to see combat during World War II, entering Royal Air Force service in July 1944?",
        correct: "Gloster Meteor",
        w1: "de Havilland Vampire",
        w2: "Bell P-59 Airacomet",
        exp: "The Gloster Meteor was deployed to intercept German V-1 flying bombs over southern England, using wing-tipping maneuvers."
      }
    ],
    number: {
      q: "In what year did the Messerschmitt Me 262 officially enter operational combat service as the world first jet fighter?",
      target: 1944,
      unit: "year",
      imperial: "1944 AD",
      exp: "The Me 262 entered active Luftwaffe squadron service in April 1944, flying its first combat interception sorties that summer."
    }
  },

  // Cycle 5: Breaking the Sound Barrier & X-Planes
  {
    mcqs: [
      {
        q: "On October 14, 1947, which American test pilot broke the sound barrier for the first time in level flight aboard the rocket-powered Bell X-1?",
        correct: "Chuck Yeager",
        w1: "Scott Crossfield",
        w2: "Bob Hoover",
        exp: "Captain Chuck Yeager flew the orange bullet-shaped Bell X-1, nicknamed Glamorous Glennis, to Mach 1.06 over Muroc Dry Lake, California."
      },
      {
        q: "What rocket-powered experimental aircraft flew to the edge of space at altitudes over 100 kilometers and reached a record speed of Mach 6.7 in 1967?",
        correct: "North American X-15",
        w1: "Bell X-2",
        w2: "Lockheed X-7",
        exp: "The X-15 piloted by William Pete Knight achieved 7,274 km/h, providing vital aerodynamic and thermal data for the Space Shuttle program."
      },
      {
        q: "What aerodynamic term represents the ratio of an aircraft true airspeed to the local speed of sound in the surrounding atmosphere?",
        correct: "Mach Number",
        w1: "Knots Indicated",
        w2: "Reynolds Number",
        exp: "Named after Austrian physicist Ernst Mach, Mach 1 represents the speed of sound, which is roughly 1,235 km/h at sea level."
      },
      {
        q: "What fuselage design breakthrough developed by Richard Whitcomb narrows the aircraft waist like a coke bottle to reduce transonic drag?",
        correct: "Area Rule",
        w1: "Swept Wing Rule",
        w2: "Canard Configuration",
        exp: "The Whitcomb Area Rule ensures smooth cross-sectional area distribution, enabling military jets like the Convair F-102 to achieve supersonic flight."
      },
      {
        q: "Which experimental aircraft built by Bell in 1951 was the first airplane capable of altering the sweep angle of its wings while in flight?",
        correct: "Bell X-5",
        w1: "Grumman X-29",
        w2: "General Dynamics F-111",
        exp: "The X-5 tested variable-sweep wing technology derived from the German Messerschmitt P.1101, paving the way for the F-14 Tomcat and B-1 Lancer."
      }
    ],
    number: {
      q: "What was the maximum top speed in km/h achieved by the rocket-powered North American X-15, setting the world record for a crewed aircraft?",
      target: 7274,
      unit: "km/h",
      imperial: "4,520 mph (Mach 6.70)",
      exp: "Air Force pilot Pete Knight flew the X-15A-2 to a record speed of 7,274 km/h (Mach 6.70) on October 3, 1967."
    }
  },

  // Cycle 6: The Jet Age & Commercial Revolution
  {
    mcqs: [
      {
        q: "What British airliner made history in 1952 as the world first commercial jet airliner, but suffered tragic crashes due to square-window metal fatigue?",
        correct: "de Havilland Comet",
        w1: "Vickers Viscount",
        w2: "Sud Aviation Caravelle",
        exp: "The Comet square passenger windows caused stress concentrations that led to explosive cabin decompression, revolutionizing fuselage fatigue testing."
      },
      {
        q: "Which iconic four-engine jet airliner introduced by Boeing in 1958 ushered in the modern Jet Age of global commercial passenger travel?",
        correct: "Boeing 707",
        w1: "Douglas DC-8",
        w2: "Convair 880",
        exp: "The Boeing 707 flew with swept wings and podded engines at 960 km/h, slashing transatlantic travel time between New York and London in half."
      },
      {
        q: "Which tri-jet commercial airliner produced by Boeing became the world best-selling jetliner of its era, optimized for short runways and hot climates?",
        correct: "Boeing 727",
        w1: "Boeing 737",
        w2: "Douglas DC-9",
        exp: "The 727 featured sophisticated triple-slotted trailing-edge flaps and a rear airstair, operating reliably from small municipal airfields."
      },
      {
        q: "What engine innovation, directing clean bypass air around the central combustion core, dramatically reduced jet engine fuel consumption and noise?",
        correct: "High-Bypass Turbofan",
        w1: "Ramjet",
        w2: "Pulsejet",
        exp: "High-bypass turbofans like the Pratt & Whitney JT9D and General Electric CF6 made massive wide-body airliners commercially viable."
      },
      {
        q: "Which twin-engine commercial airliner first flown in 1967 grew to become the most-produced commercial jet aircraft family in history?",
        correct: "Boeing 737",
        w1: "Airbus A320",
        w2: "Douglas DC-9",
        exp: "With over eleven thousand delivered across four generations, the Boeing 737 has served as the backbone of short-to-medium haul aviation."
      }
    ],
    number: {
      q: "In what year did the Boeing 707 make its first scheduled commercial passenger flight across the Atlantic for Pan American World Airways?",
      target: 1958,
      unit: "year",
      imperial: "1958 AD",
      exp: "Pan Am inaugurated scheduled Boeing 707 jet service from New York Idlewild to Paris Le Bourget on October 26, 1958."
    }
  },

  // Cycle 7: Supersonic Transports & Reconnaissance Titans
  {
    mcqs: [
      {
        q: "Which Anglo-French supersonic passenger airliner flew commercial routes at Mach 2 from 1976 until its retirement in 2003?",
        correct: "Concorde",
        w1: "Tupolev Tu-144",
        w2: "Boeing 2707",
        exp: "Concorde crossed the Atlantic in under three and a half hours, cruising at 18,000 meters altitude with its famous ogival delta wings and droop nose."
      },
      {
        q: "What Soviet supersonic passenger airliner, nicknamed Concordski, beat Concorde into the air by two months on its maiden flight in December 1968?",
        correct: "Tupolev Tu-144",
        w1: "Ilyushin Il-62",
        w2: "Myasishchev M-50",
        exp: "The Tu-144 was the first commercial airliner to exceed Mach 2, featuring retractable canard surfaces on the forward fuselage for low-speed control."
      },
      {
        q: "Which legendary titanium strategic reconnaissance aircraft, developed by Kelly Johnson at Lockheed Skunk Works, cruised at over Mach 3.2 above 25,000 meters?",
        correct: "Lockheed SR-71 Blackbird",
        w1: "Lockheed U-2",
        w2: "North American XB-70 Valkyrie",
        exp: "The SR-71 utilized radar-absorbing black iron ferrite paint and Pratt & Whitney J58 continuous-bleed turbojet engines, never once hit by enemy missiles."
      },
      {
        q: "Which high-altitude glider-like spy plane built by Lockheed in 1955 was piloted by Francis Gary Powers when shot down over the Soviet Union in 1960?",
        correct: "Lockheed U-2 Dragon Lady",
        w1: "Lockheed SR-71",
        w2: "Martin RB-57",
        exp: "The U-2 flies at over 21,000 meters with massive high-aspect-ratio wings, remaining in active US military reconnaissance service today."
      },
      {
        q: "Why was the airframe of the supersonic SR-71 Blackbird built primarily out of heat-resistant titanium alloy rather than standard aluminum?",
        correct: "Frictional air heating at Mach 3 generated skin temperatures exceeding 300 degrees Celsius",
        w1: "Titanium provided complete radar invisibility against ground tracking",
        w2: "Titanium allowed the aircraft to flex like a glider at high altitudes",
        exp: "At speeds exceeding Mach 3, atmospheric friction heated the leading edges and canopy to extreme temperatures that would melt aluminum."
      }
    ],
    number: {
      q: "What was the standard cruising speed in km/h of Concorde across the North Atlantic at Mach 2?",
      target: 2170,
      unit: "km/h",
      imperial: "1,350 mph (Mach 2.04)",
      exp: "Concorde cruised at approximately 2,170 km/h (Mach 2.04) at 60,000 feet, allowing passengers to arrive in New York earlier local time than they departed London."
    }
  },

  // Cycle 8: Jumbo Jets & Colossal Transports
  {
    mcqs: [
      {
        q: "Which colossal wide-body airliner, known as the Queen of the Skies, debuted in 1969 with an iconic upper-deck hump designed by Joe Sutter?",
        correct: "Boeing 747",
        w1: "McDonnell Douglas DC-10",
        w2: "Lockheed L-1011 TriStar",
        exp: "The Boeing 747 was the first wide-body twin-aisle airliner, democratizing global air travel and hauling cargo across five decades."
      },
      {
        q: "What is the largest passenger airliner ever built, featuring a full-length double deck capable of seating over eight hundred passengers in high density?",
        correct: "Airbus A380",
        w1: "Boeing 777X",
        w2: "Boeing 747-8",
        exp: "The Airbus A380 has a wingspan of 79.75 meters and a maximum takeoff weight of 575 metric tons, operating primarily between major global megahubs."
      },
      {
        q: "What six-engine strategic cargo aircraft built in Soviet Ukraine in 1988 was the heaviest and largest wingspan operational aircraft until its destruction in 2022?",
        correct: "Antonov An-225 Mriya",
        w1: "Antonov An-124 Ruslan",
        w2: "Lockheed C-5 Galaxy",
        exp: "The An-225 Mriya was originally built to transport the Soviet Buran space shuttle orbiter and held 240 world aviation payload records."
      },
      {
        q: "What is the largest military transport aircraft operated by the United States Air Force, featuring nose and aft cargo doors for drive-through loading?",
        correct: "Lockheed C-5 Galaxy",
        w1: "Boeing C-17 Globemaster III",
        w2: "Lockheed C-130 Hercules",
        exp: "The C-5 Galaxy can transport combat-ready military units, including two M1 Abrams main battle tanks or six Apache helicopters anywhere on Earth."
      },
      {
        q: "Which long-range twin-engine wide-body airliner introduced in 1995 broke records by flying 21,601 kilometers nonstop from Hong Kong to London eastbound?",
        correct: "Boeing 777-200LR",
        w1: "Airbus A350-900ULR",
        w2: "Boeing 787-9",
        exp: "The Boeing 777-200LR Worldliner set the world distance record for a commercial airliner in November 2005, flying 22 hours and 42 minutes."
      }
    ],
    number: {
      q: "What is the maximum certified passenger seating capacity of the double-decker Airbus A380 in a single-class high-density layout?",
      target: 853,
      unit: "passengers",
      imperial: "853 passenger limit",
      exp: "The Airbus A380 is certified for a maximum passenger exit limit of 853 passengers, although standard three-class airline configurations seat around 525."
    }
  },

  // Cycle 9: Stealth & Fifth-Generation Aviation
  {
    mcqs: [
      {
        q: "Which ground-attack aircraft, nicknamed the Nighthawk, was the world first operational military aircraft designed entirely around stealth technology?",
        correct: "Lockheed F-117 Nighthawk",
        w1: "Northrop B-2 Spirit",
        w2: "Lockheed Martin F-22",
        exp: "The F-117 used flat faceted panels to deflect radar waves away from tracking antennas, operating with devastating precision in the 1991 Gulf War."
      },
      {
        q: "Which flying-wing stealth heavy bomber operated by the US Air Force was designed with continuous curved surfaces and radar-absorbent materials?",
        correct: "Northrop Grumman B-2 Spirit",
        w1: "Rockwell B-1B Lancer",
        w2: "Boeing B-52 Stratofortress",
        exp: "The B-2 Spirit flying wing features no vertical tail fins, minimizing its radar cross-section to that of a small bird."
      },
      {
        q: "Which American fifth-generation stealth fighter entered service in 2005, combining extreme stealth, thrust vectoring, and supersonic supercruise?",
        correct: "Lockheed Martin F-22 Raptor",
        w1: "Lockheed Martin F-35 Lightning II",
        w2: "Boeing F/A-18E Super Hornet",
        exp: "The F-22 Raptor can cruise at Mach 1.8 without using fuel-hungry afterburners, dominating beyond-visual-range aerial combat."
      },
      {
        q: "Which multi-role fifth-generation stealth aircraft family is manufactured in three variants: CTOL for the Air Force, STOVL for the Marines, and CATOBAR for the Navy?",
        correct: "Lockheed Martin F-35 Lightning II",
        w1: "Boeing F-15EX",
        w2: "Saab JAS 39 Gripen",
        exp: "The F-35 program is the most technologically advanced and expensive military procurement effort in aviation history."
      },
      {
        q: "What metric is used in stealth aircraft design to quantify how detectable an airplane is to hostile ground-based and airborne radar systems?",
        correct: "Radar Cross Section",
        w1: "Aspect Ratio",
        w2: "Aerodynamic Drag Coefficient",
        exp: "Radar Cross Section measures the equivalent reflective area of a target, reduced in modern stealth aircraft through shaping and RAM coatings."
      }
    ],
    number: {
      q: "In what year did the top-secret Lockheed F-117 Nighthawk stealth attack aircraft make its first maiden flight at Groom Lake, Nevada?",
      target: 1981,
      unit: "year",
      imperial: "1981 AD",
      exp: "The F-117 Nighthawk flew secretly for the first time on June 18, 1981, remaining highly classified until revealed to the public in 1988."
    }
  },

  // Cycle 10: Aviation Records & Experimental Aerodynamics
  {
    mcqs: [
      {
        q: "Which featherweight composite aircraft, piloted by Dick Rutan and Jeana Yeager in December 1986, made the first nonstop unrefueled flight around the world?",
        correct: "Rutan Voyager",
        w1: "Virgin Atlantic GlobalFlyer",
        w2: "Solar Impulse 2",
        exp: "Designed by Burt Rutan, Voyager carried over three times its empty weight in fuel inside wings and twin booms, flying for nine days."
      },
      {
        q: "Which pioneering solar-powered aircraft, piloted by Bertrand Piccard and André Borschberg, completed a historic round-the-world flight in 2016?",
        correct: "Solar Impulse 2",
        w1: "Helios Prototype",
        w2: "Sunseeker Duo",
        exp: "Solar Impulse 2 carried over 17,000 solar cells on a 72-meter wingspan, charging lithium batteries to sustain night flight without fuel."
      },
      {
        q: "Which unique military aircraft combines the vertical takeoff and hovering capability of a helicopter with the high-speed cruise of a turboprop airplane?",
        correct: "Bell Boeing V-22 Osprey",
        w1: "Harrier Jump Jet",
        w2: "Lockheed Martin F-35B",
        exp: "The V-22 Osprey uses tiltrotor technology, rotating its wingtip engine nacelles ninety degrees between vertical lift and horizontal flight."
      },
      {
        q: "In 2005, which American adventurer flew the single-jet Virgin Atlantic GlobalFlyer to complete the first solo nonstop unrefueled airplane flight around the world?",
        correct: "Steve Fossett",
        w1: "Richard Branson",
        w2: "Felix Baumgartner",
        exp: "Steve Fossett completed the 37,000-kilometer circumnavigation in 67 hours, powered by a single Williams FJ44 turbofan engine."
      },
      {
        q: "Which human-powered aircraft, designed by Paul MacCready and pedaled by Bryan Allen, successfully flew across the English Channel in June 1979?",
        correct: "Gossamer Albatross",
        w1: "Gossamer Condor",
        w2: "Daedalus 88",
        exp: "Bryan Allen pedaled the carbon-fiber and Mylar craft for nearly three hours across thirty-five kilometers to win the second Kremer Prize."
      }
    ],
    number: {
      q: "How many continuous days did Dick Rutan and Jeana Yeager spend aloft to complete the world first nonstop unrefueled flight in the Rutan Voyager?",
      target: 9,
      unit: "days",
      imperial: "9 days (216 hours)",
      exp: "The Rutan Voyager completed its 40,212-kilometer global circumnavigation in 9 days, 3 minutes, and 44 seconds, landing on December 23, 1986."
    }
  }
];

buildQuiz({
  id: "aviation-flight-aircraft-60",
  theme: "Aviation History: Legendary Planes, Supersonic Jets & Aces",
  title: "Aviation History: Legendary Planes, Supersonic Jets & Aces",
  description: "Comprehensive 60-question flight expedition exploring Wright Flyer origins, WWII aerial legends, sound-barrier breakthroughs, jumbo jets, and stealth bombers.",
  category: "Tech, Inventions & Engineering",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z"
}, aviationCycles);


// =========================================================================
// 11. megastructures-modern-engineering-60
// Theme: "Megastructures: Skyscrapers, Mega-Bridges & Canals"
// Category: "Tech, Inventions & Engineering"
// =========================================================================
const megaCycles = [
  // Cycle 1: World Tallest Megatall Skyscrapers
  {
    mcqs: [
      {
        q: "Rising 828 meters above Dubai, what is the tallest man-made building and freestanding structure in the world, designed by architect Adrian Smith?",
        correct: "Burj Khalifa",
        w1: "Shanghai Tower",
        w2: "Merdeka 118",
        exp: "The Burj Khalifa features a stepped Y-shaped buttressed core inspired by the desert spider lily flower Hymenocallis."
      },
      {
        q: "Which skyscraper in Kuala Lumpur, Malaysia, is the second-tallest building in the world at 678.9 meters, crowned by a 160-meter spire?",
        correct: "Merdeka 118",
        w1: "Petronas Towers",
        w2: "The Exchange 106",
        exp: "Merdeka 118 diamond-faceted glass facade commemorates the hand-raising gesture of Malaysian independence leader Tunku Abdul Rahman."
      },
      {
        q: "Which 632-meter skyscraper in Shanghai features a dramatic 120-degree twisting exterior facade engineered to reduce typhoon wind loads by 24 percent?",
        correct: "Shanghai Tower",
        w1: "Jin Mao Tower",
        w2: "Shanghai World Financial Center",
        exp: "Shanghai Tower contains a double-skin glass curtain wall and the world highest observation deck within a building."
      },
      {
        q: "What famous skyscraper in Taiwan utilizes a massive, visible 660-metric-ton tuned mass damper steel pendulum suspended between the 87th and 92nd floors?",
        correct: "Taipei 101",
        w1: "Tuntex Sky Tower",
        w2: "Lotte World Tower",
        exp: "The tuned mass damper sways to counteract dynamic vibrations caused by intense typhoons and seismic earthquakes."
      },
      {
        q: "Designed by Argentine architect César Pelli, what iconic twin skyscrapers in Kuala Lumpur held the title of world tallest buildings from 1998 to 2004?",
        correct: "Petronas Towers",
        w1: "Menara Kuala Lumpur",
        w2: "CITIC Plaza",
        exp: "The 452-meter Petronas Towers are connected on the 41st and 42nd floors by a two-story skybridge supported by arch legs."
      }
    ],
    number: {
      q: "What is the total architectural height in meters of the Burj Khalifa in Dubai to the tip of its pinnacle spire?",
      target: 828,
      unit: "meters",
      imperial: "2,717 feet",
      exp: "The Burj Khalifa reaches an official height of 828 meters (2,716.5 feet), containing 163 habitable floors."
    }
  },

  // Cycle 2: Historic Skyscraper Pioneers
  {
    mcqs: [
      {
        q: "Which 1885 ten-story building in Chicago, designed by William Le Baron Jenney, is recognized as the world first modern metal-frame skyscraper?",
        correct: "Home Insurance Building",
        w1: "Monadnock Building",
        w2: "Wainwright Building",
        exp: "The Home Insurance Building utilized load-bearing structural steel and iron columns rather than heavy masonry walls."
      },
      {
        q: "Which iconic Art Deco skyscraper in New York City was completed in just 410 days and stood as the world tallest building from 1931 to 1970?",
        correct: "Empire State Building",
        w1: "Chrysler Building",
        w2: "Woolworth Building",
        exp: "Rising 102 stories on Fifth Avenue, the Empire State Building was constructed with phenomenal speed during the Great Depression."
      },
      {
        q: "Which Art Deco skyscraper in Manhattan briefly held the tallest building title in 1930 after its architect secretly assembled a stainless steel spire inside?",
        correct: "Chrysler Building",
        w1: "40 Wall Street",
        w2: "Rockefeller Center",
        exp: "Architect William Van Alen raised the 56-meter sunburst spire through the roof in ninety minutes, surpassing 40 Wall Street."
      },
      {
        q: "What structural system invented by engineer Fazlur Rahman Khan was utilized to construct Chicago 108-story Willis Tower in 1973?",
        correct: "Bundled Tube System",
        w1: "Diagrid Truss System",
        w2: "Braced Core System",
        exp: "Khan bundled nine interconnected hollow square tubes that terminate at different heights, maximizing structural rigidity while minimizing steel."
      },
      {
        q: "Which triangular 22-story steel-framed landmark designed by Daniel Burnham in 1902 sits at the intersection of Fifth Avenue and Broadway?",
        correct: "Flatiron Building",
        w1: "Singer Building",
        w2: "Tribune Tower",
        exp: "Originally named the Fuller Building, the Flatiron Building was celebrated for its Beaux-Arts limestone facade resembling an ocean liner."
      }
    ],
    number: {
      q: "How many total floors are contained within the historic Empire State Building in Midtown Manhattan?",
      target: 102,
      unit: "floors",
      imperial: "102 stories",
      exp: "The Empire State Building contains 102 floors above ground, with the 86th and 102nd floors serving as world-famous observation decks."
    }
  },

  // Cycle 3: Colossal Suspension & Cable-Stayed Bridges
  {
    mcqs: [
      {
        q: "Which bridge spanning the Dardanelles Strait in Turkey holds the world record for the longest central suspension bridge span at 2,023 meters?",
        correct: "1915 Çanakkale Bridge",
        w1: "Akashi Kaikyo Bridge",
        w2: "Xihoumen Bridge",
        exp: "Opened in 2022, its 2,023-meter main span commemorates the centennial year of the founding of the Turkish Republic."
      },
      {
        q: "Which Japanese suspension bridge connecting Kobe with Awaji Island survived the massive 1995 Kobe earthquake during its construction?",
        correct: "Akashi Kaikyo Bridge",
        w1: "Great Seto Bridge",
        w2: "Kurushima Kaikyo Bridge",
        exp: "The earthquake shifted the bridge towers by nearly one meter, lengthening the planned central span to 1,991 meters."
      },
      {
        q: "Which breathtaking cable-stayed bridge in southern France, designed by Michel Virlogeux and Norman Foster, features bridge piers taller than the Eiffel Tower?",
        correct: "Millau Viaduct",
        w1: "Pont de Normandie",
        w2: "Vasco da Gama Bridge",
        exp: "The Millau Viaduct spans 2,460 meters across the Tarn River valley with its highest pylon rising 343 meters into the clouds."
      },
      {
        q: "Which iconic art deco suspension bridge spanning the entrance to San Francisco Bay opened in 1937 with its signature International Orange color?",
        correct: "Golden Gate Bridge",
        w1: "San Francisco-Oakland Bay Bridge",
        w2: "Mackinac Bridge",
        exp: "Chief engineer Joseph Strauss oversaw construction of the 1,280-meter main span suspended from two giant steel towers."
      },
      {
        q: "What viaduct along the Beijing-Shanghai High-Speed Railway in China is recognized as the longest bridge in the world of any type at 164.8 kilometers?",
        correct: "Danyang-Kunshan Grand Bridge",
        w1: "Tianjin Grand Bridge",
        w2: "Weinan Weihe Grand Bridge",
        exp: "The bridge carries high-speed trains across the Yangtze River Delta lowlands, canals, and Yangcheng Lake."
      }
    ],
    number: {
      q: "What is the record-breaking length in meters of the main suspension span of the 1915 Çanakkale Bridge in Turkey?",
      target: 2023,
      unit: "meters",
      imperial: "6,637 feet",
      exp: "The 1915 Çanakkale Bridge spans 2,023 meters between its twin towers, making it the longest suspension bridge span in history."
    }
  },

  // Cycle 4: Cross-Sea Megastructures & Causeways
  {
    mcqs: [
      {
        q: "What 55-kilometer bridge-tunnel sea crossing links Hong Kong, Zhuhai, and Macao across the Lingdingyang channel of the Pearl River estuary?",
        correct: "Hong Kong-Zhuhai-Macao Bridge",
        w1: "Hangzhou Bay Bridge",
        w2: "Jiaozhou Bay Bridge",
        exp: "The megastructure consists of three cable-stayed bridges, an undersea tunnel of 6.7 kilometers, and two artificial islands."
      },
      {
        q: "What parallel twin-span bridge in southern Louisiana holds the Guinness World Record as the longest continuous bridge over water in the world at 38.4 kilometers?",
        correct: "Lake Pontchartrain Causeway",
        w1: "Chesapeake Bay Bridge-Tunnel",
        w2: "Manchac Swamp Bridge",
        exp: "Supported by over nine thousand concrete pilings, motorists lose sight of land across the middle eight miles of the lake."
      },
      {
        q: "Which 25-kilometer series of bridges and causeways carries road traffic across the Gulf of Bahrain between Saudi Arabia and Bahrain?",
        correct: "King Fahd Causeway",
        w1: "Sheikh Jaber Al-Ahmad Al-Sabah Causeway",
        w2: "King Hamad Causeway",
        exp: "Inaugurated in 1986, the causeway features an artificial Middle Island passport station and tourist observation tower."
      },
      {
        q: "Which combined road and rail link across the Sound connects the Danish capital of Copenhagen with the Swedish city of Malmö?",
        correct: "Øresund Bridge",
        w1: "Storebælt Bridge",
        w2: "Fehmarn Belt Fixed Link",
        exp: "The link transitions from an eight-kilometer cable-stayed bridge to the artificial island Peberholm and a four-kilometer immersed tube tunnel."
      },
      {
        q: "What cable-stayed bridge spanning 12.3 kilometers across the Tagus River estuary in Lisbon was Europe longest bridge when completed in 1998?",
        correct: "Vasco da Gama Bridge",
        w1: "25 de Abril Bridge",
        w2: "Lezíria Bridge",
        exp: "Built for Expo 98, the bridge was engineered to withstand an earthquake four times stronger than the historic 1755 Lisbon earthquake."
      }
    ],
    number: {
      q: "What is the total overall length in kilometers of the Hong Kong-Zhuhai-Macao Bridge sea-crossing megastructure?",
      target: 55,
      unit: "km",
      imperial: "34 miles",
      exp: "The combined bridge and undersea tunnel system spans roughly 55 kilometers across the waters of the Pearl River estuary."
    }
  },

  // Cycle 5: Subsea & Mountain Tunnels
  {
    mcqs: [
      {
        q: "Which Swiss railway tunnel beneath the Alps is the longest and deepest traffic tunnel in the world, stretching 57.1 kilometers through solid granite?",
        correct: "Gotthard Base Tunnel",
        w1: "Lötschberg Base Tunnel",
        w2: "Brenner Base Tunnel",
        exp: "The Gotthard Base Tunnel provides a flat rail route beneath up to 2,450 meters of alpine rock, cutting Zurich-Milan travel times."
      },
      {
        q: "Which undersea rail tunnel opened in 1994, connecting Folkestone, England, to Coquelles, France, beneath the Strait of Dover?",
        correct: "Channel Tunnel",
        w1: "Seikan Tunnel",
        w2: "Marmaray Tunnel",
        exp: "Also known as the Chunnel, it consists of two single-track railway tubes and a central service tunnel spanning 50.4 kilometers."
      },
      {
        q: "What 53.85-kilometer railway tunnel in Japan connects the main island of Honshu with the northern island of Hokkaido beneath the Tsugaru Strait?",
        correct: "Seikan Tunnel",
        w1: "Kanmon Tunnel",
        w2: "Tokyo Bay Aqua-Line",
        exp: "The Seikan Tunnel was built through volatile undersea volcanic rock over twenty-four years, accommodating Shinkansen bullet trains."
      },
      {
        q: "What 24.5-kilometer tunnel in western Norway is the longest road tunnel in the world, featuring blue and yellow cave lighting to reduce driver fatigue?",
        correct: "Lærdal Tunnel",
        w1: "Ryfast Tunnel",
        w2: "Gudvanga Tunnel",
        exp: "The Lærdal Tunnel links Lærdal and Aurland with three large artificial illuminated rock caves that mimic a natural sunrise."
      },
      {
        q: "Which subsea rail project in Istanbul connects the European and Asian halves of the city through an immersed tube tunnel beneath the Bosphorus?",
        correct: "Marmaray Tunnel",
        w1: "Eurasia Tunnel",
        w2: "Great Istanbul Tunnel",
        exp: "The Marmaray immersed tube sits sixty meters beneath the sea surface, engineered to resist severe earthquakes along the North Anatolian Fault."
      }
    ],
    number: {
      q: "What is the total length in kilometers of the Gotthard Base Tunnel through the Swiss Alps?",
      target: 57,
      unit: "km",
      imperial: "35.5 miles",
      exp: "The Gotthard Base Tunnel measures exactly 57.1 kilometers, making it the longest and deepest operational rail tunnel on Earth."
    }
  },

  // Cycle 6: Hydroelectric Mega-Dams
  {
    mcqs: [
      {
        q: "What concrete gravity dam on the Yangtze River in Hubei Province, China, is the world largest hydroelectric power station by installed capacity?",
        correct: "Three Gorges Dam",
        w1: "Baihetan Dam",
        w2: "Xiluodu Dam",
        exp: "With thirty-two main turbines producing 22,500 megawatts, the Three Gorges Dam flooded 600 kilometers of upstream river valleys."
      },
      {
        q: "Which massive hydroelectric dam on the Paraná River between Brazil and Paraguay historically set records for total annual electrical energy generated?",
        correct: "Itaipu Dam",
        w1: "Belo Monte Dam",
        w2: "Guri Dam",
        exp: "The Itaipu Dam spans over seven kilometers and supplies roughly eighty percent of Paraguay and fifteen percent of Brazil total electricity."
      },
      {
        q: "Which massive concrete arch-gravity dam on the Colorado River was completed in 1936, creating Lake Mead to supply water to California and Nevada?",
        correct: "Hoover Dam",
        w1: "Glen Canyon Dam",
        w2: "Grand Coulee Dam",
        exp: "Originally named Boulder Dam, it was built by Six Companies Inc. using innovative refrigerated pipe networks to cool curing concrete blocks."
      },
      {
        q: "What massive concrete gravity dam on the Columbia River in Washington State is the largest electric power-producing facility in the United States?",
        correct: "Grand Coulee Dam",
        w1: "Bonneville Dam",
        w2: "Chief Joseph Dam",
        exp: "Constructed between 1933 and 1942 as part of the New Deal, Grand Coulee Dam irrigates over 670,000 acres in the Columbia Basin."
      },
      {
        q: "Which rockfill dam constructed on the Nile River in Egypt during the 1960s captured the annual Nile flood, creating Lake Nasser?",
        correct: "Aswan High Dam",
        w1: "Grand Ethiopian Renaissance Dam",
        w2: "Sennar Dam",
        exp: "The Aswan High Dam ended seasonal agricultural flooding, requiring the relocation of ancient monuments like the temples of Abu Simbel."
      }
    ],
    number: {
      q: "In what year was the historic Hoover Dam on the Colorado River officially dedicated by President Franklin D. Roosevelt?",
      target: 1935,
      unit: "year",
      imperial: "1935 AD",
      exp: "President Franklin D. Roosevelt dedicated the colossal dam on September 30, 1935, completed two years ahead of schedule."
    }
  },

  // Cycle 7: Epic Shipping Canals & Locks
  {
    mcqs: [
      {
        q: "Which artificial waterway opened in 1914 across the Isthmus of Panama, cutting 13,000 kilometers from maritime voyages between the Atlantic and Pacific?",
        correct: "Panama Canal",
        w1: "Suez Canal",
        w2: "Kiel Canal",
        exp: "The Panama Canal raises ships eighty-five feet above sea level into Gatun Lake using a three-tier system of massive gravity-fed water locks."
      },
      {
        q: "What major 2016 engineering expansion added a third set of wider lock chambers to the Panama Canal to accommodate colossal Neopanamax vessels?",
        correct: "Panama Canal Expansion Project",
        w1: "Nicaragua Grand Canal",
        w2: "Gatun Deepening Scheme",
        exp: "The expansion introduced rolling gates and water-saving recapture basins that recycle sixty percent of lockage water."
      },
      {
        q: "Which Egyptian sea-level canal connecting the Mediterranean Sea to the Red Sea underwent a major expansion in 2015 adding a second parallel shipping lane?",
        correct: "Suez Canal",
        w1: "Corinth Canal",
        w2: "El Salam Canal",
        exp: "The 35-kilometer New Suez Canal project doubled daily ship transit capacity and slashed vessel waiting times from eighteen to eleven hours."
      },
      {
        q: "Which canal through northern Germany connects the North Sea at Brunsbüttel to the Baltic Sea at Kiel, operating as the world busiest artificial waterway?",
        correct: "Kiel Canal",
        w1: "Elbe-Lübeck Canal",
        w2: "Mittelland Canal",
        exp: "The Kiel Canal opened in 1895, allowing naval and merchant ships to bypass the stormy transit around Denmark Jutland peninsula."
      },
      {
        q: "Which deep-water shipping system completed in 1959 uses fifteen locks to lift ocean freighters from the Atlantic Ocean up to Lake Superior?",
        correct: "Saint Lawrence Seaway",
        w1: "Erie Seaway",
        w2: "Welland Canal",
        exp: "The system lifts ships over 180 meters above sea level, providing direct ocean access to Great Lakes industrial ports."
      }
    ],
    number: {
      q: "How many total original lock chambers were constructed across the three lock sets of the historic 1914 Panama Canal?",
      target: 12,
      unit: "locks",
      imperial: "12 lock chambers",
      exp: "The original canal was built with 12 total lock chambers arranged in parallel pairs: 6 for up-bound and 6 for down-bound ship transits."
    }
  },

  // Cycle 8: Coastal Storm Surge Barriers & Flood Defense
  {
    mcqs: [
      {
        q: "Which massive Dutch coastal defense network constructed after the 1953 flood disaster was named one of the Seven Wonders of the Modern World?",
        correct: "Delta Works",
        w1: "Zuiderzee Works",
        w2: "Afsluitdijk",
        exp: "The Delta Works includes dams, dykes, and the 9-kilometer Oosterscheldekering storm surge barrier with sixty-two massive steel sliding gates."
      },
      {
        q: "What experimental flood barrier project in Venice utilizes seventy-eight yellow buoyant steel flap gates that rise from the seabed during high tides?",
        correct: "MOSE Project",
        w1: "Acqua Alta Shield",
        w2: "Venetian Dike System",
        exp: "Modulo Sperimentale Elettromeccanico gates fill with compressed air to isolate the Venetian Lagoon from Adriatic storm surges."
      },
      {
        q: "Which London river defense barrier across the River Thames uses ten rotating steel sector gates to protect central London from North Sea storm surges?",
        correct: "Thames Barrier",
        w1: "Woolwich Surge Gate",
        w2: "Severn Tidal Barrier",
        exp: "Operational since 1982, the barrier gates rotate upright into defensive positions when high tides threaten the capital."
      },
      {
        q: "What storm surge barrier in Rotterdam features two colossal curved steel gates, each the size of the Eiffel Tower, that swing together across the New Waterway?",
        correct: "Maeslantkering",
        w1: "Hartelkering",
        w2: "Oosterscheldekering",
        exp: "The Maeslantkering is one of the largest moving structures on Earth, resting on giant ball-and-socket joints."
      },
      {
        q: "Which 32-kilometer enclosure dam completed in 1932 dammed the Zuiderzee inlet in the Netherlands, turning it into the freshwater Lake IJssel?",
        correct: "Afsluitdijk",
        w1: "Houtribdijk",
        w2: "Brouwersdam",
        exp: "Engineered by Cornelis Lely, the Afsluitdijk paved the way for the reclamation of Flevoland, the largest artificial island on Earth."
      }
    ],
    number: {
      q: "In what year was the Thames Barrier in London officially inaugurated by Queen Elizabeth II?",
      target: 1984,
      unit: "year",
      imperial: "1984 AD",
      exp: "Queen Elizabeth II officially opened the Thames Barrier on May 8, 1984, following its first operational closure in 1982."
    }
  },

  // Cycle 9: Colossal Domes & Arenas
  {
    mcqs: [
      {
        q: "Which music and entertainment venue in Las Vegas, opened in 2023, is the largest spherical building on Earth at 112 meters tall and 157 meters wide?",
        correct: "Sphere at The Venetian Resort",
        w1: "Ericsson Globe",
        w2: "Mercedes-Benz Superdome",
        exp: "The Sphere features a 54,000-square-meter exterior LED screen and a 16K wraparound interior display with beamforming audio."
      },
      {
        q: "Which multipurpose stadium in Houston, Texas, was nicknamed the Eighth Wonder of the World when it opened in 1965 as the first domed sports stadium?",
        correct: "Astrodome",
        w1: "Kingdome",
        w2: "Metrodome",
        exp: "The Astrodome pioneered indoor baseball, air-conditioned arenas, and synthetic Astroturf when natural grass failed beneath the roof."
      },
      {
        q: "Which Atlanta stadium features a unique circular retractable roof composed of eight triangular ethylene tetrafluoroethylene petals that open like a camera aperture?",
        correct: "Mercedes-Benz Stadium",
        w1: "SoFi Stadium",
        w2: "Allegiant Stadium",
        exp: "Mercedes-Benz Stadium features a 360-degree halo board suspended beneath the mechanical roof, seating over seventy thousand fans."
      },
      {
        q: "What famous Beijing stadium constructed for the 2008 Summer Olympics was nicknamed the Bird Nest due to its intricate, exposed structural steel lattice?",
        correct: "Beijing National Stadium",
        w1: "Water Cube",
        w2: "Wukesong Arena",
        exp: "Designed by Swiss architects Herzog & de Meuron and artist Ai Weiwei, the stadium consumed over 42,000 tons of structural steel."
      },
      {
        q: "Which national stadium in Singapore holds the world record for the largest free-spanning dome structure at 310 meters in diameter?",
        correct: "Singapore National Stadium",
        w1: "AT&T Stadium",
        w2: "Tokyo Dome",
        exp: "The dome features an ultra-thin movable roof and specialized bowl cooling that circulates cool air to every seat."
      }
    ],
    number: {
      q: "What is the exterior diameter in meters of the Sphere in Las Vegas, the world largest spherical structure?",
      target: 157,
      unit: "meters",
      imperial: "516 feet",
      exp: "The Sphere measures 157 meters wide at its broadest point and rises 112 meters high, wrapped in 1.2 million programmable LED pucks."
    }
  },

  // Cycle 10: Megaprojects & Science Megastructures
  {
    mcqs: [
      {
        q: "Which particle physics facility at CERN near Geneva is the world largest and most complex scientific machine, housed in a 27-kilometer circular tunnel?",
        correct: "Large Hadron Collider",
        w1: "Tevatron",
        w2: "Relativistic Heavy Ion Collider",
        exp: "The LHC accelerates proton beams to near light-speed using superconducting niobium-titanium magnets, discovering the Higgs boson in 2012."
      },
      {
        q: "What artificial archipelago shaped like a palm tree was constructed off the coast of Dubai using 94 million cubic meters of sand and seven million tons of rock?",
        correct: "Palm Jumeirah",
        w1: "The World Islands",
        w2: "Palm Jebel Ali",
        exp: "Palm Jumeirah added seventy-eight kilometers of coastline to Dubai, stabilized by GPS satellite-guided precision dredging."
      },
      {
        q: "What major London railway megaproject, officially opened as the Elizabeth Line in 2022, bored 42 kilometers of new subterranean tunnels beneath central London?",
        correct: "Crossrail",
        w1: "Thameslink",
        w2: "High Speed 2",
        exp: "Crossrail was one of Europe largest infrastructure undertakings, seamlessly linking Berkshire, Heathrow Airport, central London, and Essex."
      },
      {
        q: "What multinational modular space laboratory, orbiting 400 kilometers above Earth since 1998, is the largest human-made structure in outer space?",
        correct: "International Space Station",
        w1: "Tiangong Space Station",
        w2: "Mir Space Station",
        exp: "The ISS spans 108 meters from end to end, assembled through dozens of Space Shuttle, Proton, and Soyuz rocket launches."
      },
      {
        q: "Which nuclear fusion megaproject under construction in Cadarache, France, will house the world largest magnetic confinement tokamak reactor?",
        correct: "ITER",
        w1: "JET",
        w2: "Wendelstein 7-X",
        exp: "ITER is funded by thirty-five nations to demonstrate net energy gain from magnetic plasma confinement at 150 million degrees Celsius."
      }
    ],
    number: {
      q: "What is the total circumference in kilometers of the underground Large Hadron Collider tunnel at CERN?",
      target: 27,
      unit: "km",
      imperial: "16.6 miles",
      exp: "The LHC circular ring measures exactly 26.7 kilometers (rounded to 27 km), straddling the border between Switzerland and France."
    }
  }
];

buildQuiz({
  id: "megastructures-modern-engineering-60",
  theme: "Megastructures: Skyscrapers, Mega-Bridges & Canals",
  title: "Megastructures: Skyscrapers, Mega-Bridges & Canals",
  description: "Comprehensive 60-question grand engineering tour of record-shattering skyscrapers, colossal suspension bridges, undersea tunnels, and mega-dams.",
  category: "Tech, Inventions & Engineering",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z"
}, megaCycles);


// =========================================================================
// 12. automotive-cars-motorsport-60
// Theme: "Automotive Heritage: Classic Engines, Supercars & F1"
// Category: "Tech, Inventions & Engineering"
// =========================================================================
const autoCycles = [
  // Cycle 1: Dawn of the Automobile & Pioneers
  {
    mcqs: [
      {
        q: "Which German engineer built the 1886 Patent-Motorwagen, widely recognized as the world first practical modern automobile powered by an internal combustion engine?",
        correct: "Karl Benz",
        w1: "Gottlieb Daimler",
        w2: "Wilhelm Maybach",
        exp: "Karl Benz obtained German patent No. 37435 for his three-wheeled motor carriage powered by a horizontal single-cylinder four-stroke engine."
      },
      {
        q: "Who completed the world first long-distance automotive road trip in August 1888, driving 106 kilometers from Mannheim to Pforzheim without her husband knowledge?",
        correct: "Bertha Benz",
        w1: "Louise Sarazin",
        w2: "Camille du Gast",
        exp: "Bertha Benz proved the practical utility of the Patent-Motorwagen, famously unclogging a fuel pipe with her hatpin and repairing brakes with leather."
      },
      {
        q: "Which American automotive industrialist revolutionized modern mass manufacturing in 1913 by introducing the moving assembly line for the Model T?",
        correct: "Henry Ford",
        w1: "Walter Chrysler",
        w2: "Ransom E. Olds",
        exp: "Ford Highland Park assembly line cut Model T production time from twelve hours to ninety-three minutes, making cars affordable to the public."
      },
      {
        q: "Which German engineer invented the compression-ignition engine in the 1890s, operating without spark plugs on heavy liquid fuels?",
        correct: "Rudolf Diesel",
        w1: "Nikolaus Otto",
        w2: "Felix Wankel",
        exp: "Rudolf Diesel designed his engine to operate on high thermal efficiency by injecting fuel into air heated purely by high-pressure cylinder compression."
      },
      {
        q: "Which pioneer developed the high-speed Grandfather Clock petrol engine in 1885 alongside Wilhelm Maybach, fitting it to the Daimler Reitwagen motorcycle?",
        correct: "Gottlieb Daimler",
        w1: "Karl Benz",
        w2: "Robert Bosch",
        exp: "Daimler and Maybach pioneered compact, lightweight high-RPM engines that could power carriages, boats, and airships."
      }
    ],
    number: {
      q: "In what year did Karl Benz receive the official patent for his gas-fueled three-wheeled Patent-Motorwagen?",
      target: 1886,
      unit: "year",
      imperial: "1886 AD",
      exp: "Karl Benz applied for the milestone patent on January 29, 1886, marking the birth of the modern automobile."
    }
  },

  // Cycle 2: The Golden Age of Classic Sports Cars
  {
    mcqs: [
      {
        q: "Which iconic 1961 British sports car, designed by aerodynamicist Malcolm Sayer, was famously hailed by Enzo Ferrari as the most beautiful car ever made?",
        correct: "Jaguar E-Type",
        w1: "Aston Martin DB5",
        w2: "Austin-Healey 3000",
        exp: "The Jaguar E-Type combined monocoque construction, disc brakes, and a 3.8-liter straight-six engine with 240 km/h top speed."
      },
      {
        q: "Which landmark 1954 German sports car featured upward-opening gullwing doors and was the first production car with direct mechanical fuel injection?",
        correct: "Mercedes-Benz 300 SL",
        w1: "BMW 507",
        w2: "Porsche 356 Speedster",
        exp: "The 300 SL Gullwing was derived from the W194 race car, requiring upward-hinged doors due to its deep tubular spaceframe chassis."
      },
      {
        q: "Which classic Ferrari homologation sports car produced from 1962 to 1964, powered by a 3.0-liter Colombo V12, is widely regarded as the most valuable collector car in the world?",
        correct: "Ferrari 250 GTO",
        w1: "Ferrari 275 GTB",
        w2: "Ferrari 250 Testa Rossa",
        exp: "Only thirty-six Ferrari 250 GTOs were ever produced to race in the FIA Group 3 Grand Touring category, commanding tens of millions at auction."
      },
      {
        q: "Which American racing driver and designer shoehorned a high-output Ford V8 engine into a lightweight British AC Ace chassis to create the Cobra in 1962?",
        correct: "Carroll Shelby",
        w1: "Dan Gurney",
        w2: "Phil Hill",
        exp: "The Shelby Cobra dominated American sports car racing and culminated in the 427 Cobra, reaching zero to sixty in under four seconds."
      },
      {
        q: "Which grand tourer, manufactured by Aston Martin in Newport Pagnell, became an enduring pop-culture icon when driven by James Bond in the 1964 film Goldfinger?",
        correct: "Aston Martin DB5",
        w1: "Aston Martin DB4 GT Zagato",
        w2: "Aston Martin DBS",
        exp: "The DB5 featured revolving license plates, smoke screen dispensers, and a passenger ejector seat, cementing its legend in cinema history."
      }
    ],
    number: {
      q: "How many total original Ferrari 250 GTO models were manufactured by Ferrari between 1962 and 1964?",
      target: 36,
      unit: "cars",
      imperial: "36 original units",
      exp: "Ferrari built exactly thirty-six 250 GTOs between 1962 and 1964, making it one of the rarest and most coveted collector automobiles."
    }
  },

  // Cycle 3: The Supercar & Mid-Engine Revolution
  {
    mcqs: [
      {
        q: "Which 1966 Italian sports car, designed by Marcello Gandini with a transverse mid-mounted 4.0-liter V12, coined the modern term supercar?",
        correct: "Lamborghini Miura",
        w1: "Ferrari 365 GTB/4 Daytona",
        w2: "Maserati Ghibli",
        exp: "The Lamborghini Miura P400 was the fastest production car in the world at launch, establishing the mid-engine blueprint for high-performance exotics."
      },
      {
        q: "Which iconic German sports car, introduced in 1964 as the successor to the 356, has maintained a distinctive rear-mounted flat-six engine layout for sixty years?",
        correct: "Porsche 911",
        w1: "Porsche 928",
        w2: "Porsche 944",
        exp: "Designed by Ferdinand Alexander Butzi Porsche, the 911 evolved through generations including the 930 Turbo, 993, and modern 992."
      },
      {
        q: "Which 1987 twin-turbocharged V8 supercar, the last car personally approved by Enzo Ferrari, was the first street-legal production car to exceed 200 mph?",
        correct: "Ferrari F40",
        w1: "Porsche 959",
        w2: "Lamborghini Countach",
        exp: "Built for Ferrari 40th anniversary, the F40 featured lightweight Kevlar and carbon fiber bodywork with zero power steering or anti-lock brakes."
      },
      {
        q: "Which three-seater British supercar designed by Gordon Murray in 1992 featured a gold-foil-lined engine bay and a central driving seat?",
        correct: "McLaren F1",
        w1: "Jaguar XJ220",
        w2: "Bugatti EB110",
        exp: "The McLaren F1 utilized a naturally aspirated 6.1-liter BMW V12, holding the record as the fastest naturally aspirated production car at 386 km/h."
      },
      {
        q: "What quad-turbocharged 16-cylinder hypercar, developed under Volkswagen Group chairman Ferdinand Piëch, shattered production top speed barriers at 407 km/h in 2005?",
        correct: "Bugatti Veyron",
        w1: "Koenigsegg CC8S",
        w2: "Pagani Zonda",
        exp: "The Bugatti Veyron 16.4 generated 1,001 metric horsepower from an 8.0-liter W16 engine cooled by ten distinct heat exchangers."
      }
    ],
    number: {
      q: "What was the top speed in km/h achieved by the naturally aspirated McLaren F1 during its record speed run at Ehra-Lessien in 1998?",
      target: 386,
      unit: "km/h",
      imperial: "240.1 mph",
      exp: "Racing driver Andy Wallace drove the XP5 prototype McLaren F1 with rev limiter disabled to an official two-way average of 386.4 km/h."
    }
  },

  // Cycle 4: Powertrain Innovations & Engine Tech
  {
    mcqs: [
      {
        q: "Which unusual internal combustion engine design utilizes a triangular rotor spinning inside an epitrochoidal chamber instead of reciprocating pistons?",
        correct: "Wankel Rotary Engine",
        w1: "Opposed-Piston Engine",
        w2: "Sterling Engine",
        exp: "Invented by Felix Wankel, the rotary engine delivers smooth power at high RPMs, famously refined by Mazda in the RX-7 and RX-8 sports cars."
      },
      {
        q: "What engine valvetrain design positions two separate camshafts inside the cylinder head to operate intake and exhaust valves directly?",
        correct: "Double Overhead Camshaft",
        w1: "Overhead Valve Pushrod",
        w2: "Flathead Side Valve",
        exp: "DOHC configurations allow multi-valve designs (typically four valves per cylinder), improving volumetric efficiency and high-RPM breathing."
      },
      {
        q: "What forced-induction device uses hot exhaust gases to spin a turbine, which in turn drives a compressor to force extra oxygen into cylinders?",
        correct: "Turbocharger",
        w1: "Supercharger",
        w2: "Intercooler",
        exp: "Turbocharging dramatically increases engine power and thermal efficiency without increasing engine displacement, pioneered in production by the 1962 Oldsmobile Jetfire."
      },
      {
        q: "Which brake technology using calipers to squeeze friction pads against a rotating metal rotor replaced drums in motorsport after Jaguar won Le Mans in 1953?",
        correct: "Disc Brakes",
        w1: "Drum Brakes",
        w2: "Regenerative Brakes",
        exp: "Dunlop disc brakes gave the Jaguar C-Type superior fade-resistant braking into corners, rapidly spreading across all production passenger automobiles."
      },
      {
        q: "Which exhaust emissions control device uses precious metals like platinum and rhodium to convert harmful carbon monoxide and hydrocarbons into carbon dioxide and water?",
        correct: "Catalytic Converter",
        w1: "Exhaust Gas Recirculation Valve",
        w2: "Diesel Particulate Filter",
        exp: "Introduced widely in 1975 to satisfy US Clean Air Act standards, catalytic converters drastically reduced toxic automotive smog."
      }
    ],
    number: {
      q: "In what year did the catalytic converter become mandatory equipment on new gasoline cars sold in the United States?",
      target: 1975,
      unit: "year",
      imperial: "1975 AD",
      exp: "The EPA mandated catalytic converters starting with 1975 model year vehicles, which also prompted the phase-out of leaded gasoline."
    }
  },

  // Cycle 5: Formula 1 Origins & Grand Prix Legends
  {
    mcqs: [
      {
        q: "On May 13, 1950, which historic British circuit hosted the inaugural World Championship Formula 1 Grand Prix race, won by Giuseppe Farina in an Alfa Romeo?",
        correct: "Silverstone Circuit",
        w1: "Monza Circuit",
        w2: "Spa-Francorchamps",
        exp: "The 1950 British Grand Prix at Silverstone was attended by King George VI and Queen Elizabeth, launching the modern F1 world championship."
      },
      {
        q: "Which legendary Argentine racing driver won five Formula 1 World Drivers Championships in the 1950s with four different constructors?",
        correct: "Juan Manuel Fangio",
        w1: "Alberto Ascari",
        w2: "Stirling Moss",
        exp: "El Maestro won titles with Alfa Romeo, Maserati, Mercedes-Benz, and Ferrari, maintaining the highest winning percentage in F1 history."
      },
      {
        q: "Which charismatic Brazilian triple world champion was renowned for sublime wet-weather mastery and won the prestigious Monaco Grand Prix a record six times?",
        correct: "Ayrton Senna",
        w1: "Nelson Piquet",
        w2: "Alain Prost",
        exp: "Senna intense rivalry with Alain Prost at McLaren-Honda produced some of the most dramatic and celebrated duels in motorsport lore."
      },
      {
        q: "Which German driver won seven Formula 1 World Drivers Championships, including five consecutive titles with Scuderia Ferrari from 2000 to 2004?",
        correct: "Michael Schumacher",
        w1: "Sebastian Vettel",
        w2: "Nico Rosberg",
        exp: "Schumacher transformed Scuderia Ferrari alongside Jean Todt and Ross Brawn, setting historic records for race wins, poles, and fastest laps."
      },
      {
        q: "Which British racing driver holds the all-time records for the most Formula 1 pole positions and race wins, sharing seven world titles with Schumacher?",
        correct: "Lewis Hamilton",
        w1: "Nigel Mansell",
        w2: "Jackie Stewart",
        exp: "Hamilton achieved his first world title with McLaren in 2008 before dominating the V6 Turbo-Hybrid era with Mercedes-AMG."
      }
    ],
    number: {
      q: "In what year was the very first official Formula 1 World Championship Grand Prix race held at Silverstone?",
      target: 1950,
      unit: "year",
      imperial: "1950 AD",
      exp: "The inaugural Formula 1 World Championship race took place on May 13, 1950, at the converted RAF Silverstone airfield in England."
    }
  },

  // Cycle 6: 24 Hours of Le Mans & Endurance Lore
  {
    mcqs: [
      {
        q: "Which legendary French 24-hour endurance sports car race has been held annually near the town of Le Mans on the Circuit de la Sarthe since 1923?",
        correct: "24 Hours of Le Mans",
        w1: "24 Hours of Spa",
        w2: "24 Hours of Daytona",
        exp: "The Grand Prix d Endurance de 24 Heures tests mechanical reliability, aerodynamics, and driver endurance over eight thousand kilometers."
      },
      {
        q: "Which American V8 race car broke Ferrari six-year winning streak at Le Mans in 1966 with a historic one-two-three podium sweep orchestrated by Henry Ford II?",
        correct: "Ford GT40",
        w1: "Chevrolet Corvette Grand Sport",
        w2: "Shelby Daytona Coupe",
        exp: "The GT40 Mk II developed by Carroll Shelby and Ken Miles won four consecutive Le Mans races from 1966 through 1969."
      },
      {
        q: "Which legendary flat-12 race car gave Porsche its first overall victory at the 24 Hours of Le Mans in 1970 and starred in Steve McQueen film Le Mans?",
        correct: "Porsche 917",
        w1: "Porsche 956",
        w2: "Porsche 936",
        exp: "The 917 reached speeds over 380 km/h along the Mulsanne Straight, driven to victory in heavy rain by Hans Herrmann and Richard Attwood."
      },
      {
        q: "Which manufacturer made history at Le Mans in 2006 by scoring the first-ever overall victory for a diesel-powered racing car with the R10 TDI?",
        correct: "Audi",
        w1: "Peugeot",
        w2: "Toyota",
        exp: "The Audi R10 TDI twin-turbo V12 diesel produced massive low-RPM torque and superior fuel mileage, dominating endurance racing for years."
      },
      {
        q: "Which Danish racing driver holds the all-time record for the most overall victories at the 24 Hours of Le Mans, earning the nickname Mr. Le Mans?",
        correct: "Tom Kristensen",
        w1: "Jacky Ickx",
        w2: "Derek Bell",
        exp: "Tom Kristensen won Le Mans nine times between 1997 and 2013, including six consecutive victories with Audi and Porsche."
      }
    ],
    number: {
      q: "How many total 24 Hours of Le Mans overall victories did Danish driver Tom Kristensen achieve throughout his career?",
      target: 9,
      unit: "victories",
      imperial: "9 overall wins",
      exp: "Tom Kristensen won 9 Le Mans titles, surpassing Jacky Ickx previous record of 6 victories."
    }
  },

  // Cycle 7: American Muscle & Rally Legends
  {
    mcqs: [
      {
        q: "Which car unveiled at the 1964 New York World Fair created the American pony car phenomenon, selling over one million units in eighteen months?",
        correct: "Ford Mustang",
        w1: "Chevrolet Camaro",
        w2: "Pontiac GTO",
        exp: "Championed by Lee Iacocca, the Mustang combined sporty styling, long-hood short-deck proportions, and affordable customization."
      },
      {
        q: "Which iconic American two-seater sports car, introduced by Chevrolet in 1953 with a lightweight fiberglass body, is celebrated as America Sports Car?",
        correct: "Chevrolet Corvette",
        w1: "Dodge Viper",
        w2: "Ford Thunderbird",
        exp: "Engineered under Zora Arkus-Duntov, the Corvette evolved from the straight-six C1 into legendary V8 muscle variants like the 1963 Split-Window Sting Ray."
      },
      {
        q: "Which German car introduced permanent all-wheel drive into the World Rally Championship in 1980, revolutionizing rally racing during the Group B era?",
        correct: "Audi Quattro",
        w1: "Lancia 037",
        w2: "Peugeot 205 T16",
        exp: "The Audi Quattro turbocharged five-cylinder engine and four-wheel traction rendered traditional rear-wheel-drive rally cars obsolete."
      },
      {
        q: "Which mid-engine Italian rally car, designed by Bertone with a Ferrari Dino V12 engine, won three consecutive World Rally Championships from 1974 to 1976?",
        correct: "Lancia Stratos HF",
        w1: "Lancia Delta Integrale",
        w2: "Fiat 131 Abarth",
        exp: "The Stratos was the first car purposefully built from the ground up for international stage rallying, renowned for extreme agility."
      },
      {
        q: "What famous hemispherical-combustion-chamber V8 engine displacement of 426 cubic inches powered classic 1960s Dodge and Plymouth muscle cars?",
        correct: "426 Hemi",
        w1: "454 Big Block",
        w2: "427 Cobra Jet",
        exp: "The 426 Hemi Elephant Engine produced an official 425 horsepower, dominating NASCAR oval racing and quarter-mile drag strips."
      }
    ],
    number: {
      q: "In what year was the original first-generation Ford Mustang introduced to the public at the New York World Fair?",
      target: 1964,
      unit: "year",
      imperial: "1964 AD",
      exp: "Ford officially debuted the 1964-and-a-half Mustang on April 17, 1964, sparking stampedes at Ford dealerships across America."
    }
  },

  // Cycle 8: Land Speed Records & Jet Cars
  {
    mcqs: [
      {
        q: "Which British twin-turbofan jet car, driven by RAF pilot Andy Green on October 15, 1997, became the first car to officially break the sound barrier on land?",
        correct: "ThrustSSC",
        w1: "Thrust2",
        w2: "Bluebird CN7",
        exp: "ThrustSSC was powered by two Rolls-Royce Spey jet engines in the Black Rock Desert of Nevada, achieving Mach 1.016 over a measured mile."
      },
      {
        q: "Which vast, pancake-flat salt flat in northwestern Utah has hosted world land speed trials since the legendary runs of Malcolm Campbell in the 1930s?",
        correct: "Bonneville Salt Flats",
        w1: "Black Rock Desert",
        w2: "El Mirage Lake",
        exp: "The Bonneville Salt Flats provide a rock-hard, perfectly level potassium-salt surface ideal for high-speed wheel-driven and rocket streamliners."
      },
      {
        q: "Which British speed king broke land and water speed records in the same year in 1964 aboard Bluebird CN7 and Bluebird K7?",
        correct: "Donald Campbell",
        w1: "Malcolm Campbell",
        w2: "John Cobb",
        exp: "Donald Campbell drove the gas-turbine Bluebird CN7 to 648 km/h at Lake Eyre, Australia, before setting the water speed record at Lake Dumbleyung."
      },
      {
        q: "What five-time land speed record holder became the first person to exceed 400, 500, and 600 miles per hour in his turbojet-powered Spirit of America streamliners?",
        correct: "Craig Breedlove",
        w1: "Art Arfons",
        w2: "Gary Gabelich",
        exp: "Breedlove engaged in a fierce 1960s jet-car duel against Art Arfons Green Monster across the Bonneville Salt Flats."
      },
      {
        q: "What natural aerodynamic phenomenon must land speed record streamliners overcome to prevent the car nose from lifting and flipping at supersonic speeds?",
        correct: "Ground Effect Aerodynamic Lift",
        w1: "Hydroplaning",
        w2: "Vortex Shedding",
        exp: "Engineers shape streamliner underbodies with diffuser tunnels and active canards to ensure negative lift or downforce at extreme speeds."
      }
    ],
    number: {
      q: "What was the official supersonic top speed in km/h achieved by ThrustSSC in the Black Rock Desert in 1997?",
      target: 1228,
      unit: "km/h",
      imperial: "763 mph (Mach 1.016)",
      exp: "ThrustSSC achieved an officially ratified speed of 1,227.985 km/h (763.035 mph), setting the world supersonic land speed record."
    }
  },

  // Cycle 9: Automotive Safety & Human Protection
  {
    mcqs: [
      {
        q: "Which Swedish Volvo engineer invented the modern three-point diagonal lap-and-shoulder seatbelt in 1959, patented with a free open license for all automakers?",
        correct: "Nils Bohlin",
        w1: "Béla Barényi",
        w2: "Gunnar Engellau",
        exp: "Volvo gave away the patent to competitors in the interest of global public safety, credited with saving over one million lives."
      },
      {
        q: "Which Austro-Hungarian engineer at Mercedes-Benz patented the crumple zone in 1951, designing vehicle ends to deform and absorb kinetic crash energy?",
        correct: "Béla Barényi",
        w1: "Ferdinand Porsche",
        w2: "Nils Bohlin",
        exp: "Barényi introduced the rigid passenger safety cell flanked by deformable front and rear crumple zones on the 1959 Mercedes-Benz W111."
      },
      {
        q: "Which active safety system, introduced commercially by Bosch and Mercedes-Benz on the 1978 S-Class, modulates brake pressure to prevent wheel lockup during hard stops?",
        correct: "Anti-lock Braking System",
        w1: "Electronic Brakeforce Distribution",
        w2: "Brake Assist",
        exp: "ABS sensors monitor wheel rotation speed, pulsing brake pressure dozens of times per second to allow drivers to steer while braking."
      },
      {
        q: "Which passive restraint safety device rapidly inflates a nylon fabric cushion with harmless nitrogen gas within thirty milliseconds of a crash impact?",
        correct: "Airbag",
        w1: "Seatbelt Pretensioner",
        w2: "Active Headrest",
        exp: "Pioneered by John Hetrick and Allen Breed, electronic pyrotechnic airbag modules became mandatory on all passenger vehicles in the 1990s."
      },
      {
        q: "Which computerized active safety system detects loss of vehicle steering control and applies individual brakes to counteract oversteer and understeer skids?",
        correct: "Electronic Stability Control",
        w1: "Traction Control System",
        w2: "Hill Descent Control",
        exp: "ESC compares steering wheel angle to vehicle yaw rate, reducing rollover crashes by more than fifty percent worldwide."
      }
    ],
    number: {
      q: "In what year did Nils Bohlin patent the three-point seatbelt while serving as safety engineer at Volvo?",
      target: 1959,
      unit: "year",
      imperial: "1959 AD",
      exp: "Nils Bohlin filed the landmark three-point seatbelt patent in 1959, installed as standard equipment on Volvo Amazon and PV544 cars."
    }
  },

  // Cycle 10: Modern Hypercars & Electric Transformation
  {
    mcqs: [
      {
        q: "Which Croatian automotive manufacturer created the Nevera, a quad-motor electric hypercar producing 1,914 horsepower and accelerating zero to sixty in 1.74 seconds?",
        correct: "Rimac Automobili",
        w1: "Koenigsegg",
        w2: "Pagani",
        exp: "Founded by Mate Rimac, the firm developed advanced battery packs, torque vectoring software, and now partners with Bugatti."
      },
      {
        q: "Which Swedish hypercar manufacturer developed the Jesko and Freevalve camless pneumatic valve actuator technology, founded by Christian von Koenigsegg?",
        correct: "Koenigsegg",
        w1: "Spyker",
        w2: "Zenvo",
        exp: "Koenigsegg engineered the Agera RS, Jesko, and Gemera, introducing carbon-fiber wheels and transmission systems without standard flywheels."
      },
      {
        q: "What all-electric single-seater motorsport championship, sanctioned by the FIA, has raced on downtown city street circuits around the world since 2014?",
        correct: "Formula E",
        w1: "Extreme E",
        w2: "Super Formula",
        exp: "Formula E serves as a testing laboratory for electric battery cooling, regenerative braking software, and power inverter efficiency."
      },
      {
        q: "In 2014, Formula 1 replaced traditional V8 engines with which highly efficient powertrain incorporating kinetic and heat motor generator units?",
        correct: "1.6-liter V6 Turbo-Hybrid",
        w1: "2.4-liter V8 Hybrid",
        w2: "3.0-liter V10 Turbo",
        exp: "The F1 turbo-hybrid power units achieve over fifty percent thermal efficiency using MGU-K and MGU-H energy recovery systems."
      },
      {
        q: "Which British racing hypercar, designed collaboratively by Red Bull Racing Adrian Newey and Aston Martin, generates over 1,000 kg of aerodynamic ground effect downforce?",
        correct: "Aston Martin Valkyrie",
        w1: "Mercedes-AMG ONE",
        w2: "Gordon Murray T.50",
        exp: "The Valkyrie utilizes an open-tunnel carbon Venturi underbody and a naturally aspirated 6.5-liter Cosworth V12 revving to 11,100 RPM."
      }
    ],
    number: {
      q: "In what year did Formula 1 introduce the 1.6-liter turbocharged V6 hybrid power unit regulations, revolutionizing automotive powertrain efficiency?",
      target: 2014,
      unit: "year",
      imperial: "2014 AD",
      exp: "Formula 1 introduced the 1.6-liter V6 Turbo-Hybrid engine formula at the start of the 2014 season in Melbourne, Australia."
    }
  }
];

buildQuiz({
  id: "automotive-cars-motorsport-60",
  theme: "Automotive Heritage: Classic Engines, Supercars & F1",
  title: "Automotive Heritage: Classic Engines, Supercars & F1",
  description: "Comprehensive 60-question automotive odyssey exploring pioneering internal combustion engines, classic supercars, Formula 1 dynasties, and land speed records.",
  category: "Tech, Inventions & Engineering",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z"
}, autoCycles);
