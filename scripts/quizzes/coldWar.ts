import { QuizDataset } from '../../src/types';

export const coldWarQuiz: QuizDataset = {
  id: "cold-war-space-race-espionage-60",
  theme: "The Cold War: Iron Curtain, Espionage & Space Race",
  title: "The Cold War: Iron Curtain, Espionage & Space Race",
  description: "A 60-question grand master assessment on the Berlin Wall, Cuban Missile Crisis, Apollo 11, Sputnik, KGB and CIA espionage, the Iron Curtain, and the collapse of the Soviet Union.",
  category: "Modern History & Landmark Wars",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z",
  questions: [
    // Cycle 1
    {
      type: "mcq",
      question: "Which British statesman delivered the famous 1946 Sinews of Peace speech in Fulton Missouri, declaring that an iron curtain has descended across the continent?",
      options: ["Winston Churchill", "Clement Attlee", "Anthony Eden"],
      correctIndex: 0,
      explanation: "Churchill speech popularized the term Iron Curtain to describe the geopolitical division between Soviet-dominated Eastern Europe and the West."
    },
    {
      type: "mcq",
      question: "What US foreign policy initiative announced by President Harry S. Truman in 1947 pledged economic and military aid to nations resisting communist subjugation?",
      options: ["Monroe Doctrine", "Truman Doctrine", "Eisenhower Doctrine"],
      correctIndex: 1,
      explanation: "The Truman Doctrine initially provided 400 million dollars in aid to Greece and Turkey, establishing containment as Americas Cold War doctrine."
    },
    {
      type: "mcq",
      question: "What massive American economic aid program, officially named the European Recovery Program, provided over 13 billion dollars to rebuild Western Europe?",
      options: ["Lend-Lease Act", "Dawes Plan", "Marshall Plan"],
      correctIndex: 2,
      explanation: "Named after Secretary of State George C. Marshall, the Marshall Plan revitalized European industrial economies and staved off communist electoral gains."
    },
    {
      type: "mcq",
      question: "Which American diplomat formulated the policy of containment in his anonymous 1947 Long Telegram signed by X?",
      options: ["George F. Kennan", "John Foster Dulles", "Dean Acheson"],
      correctIndex: 0,
      explanation: "Kennan argued that Soviet power was inherently expansionist and recommended long-term, patient but firm containment of Russian expansive tendencies."
    },
    {
      type: "mcq",
      question: "Into how many occupation zones was Germany and the city of Berlin divided among the Allied powers following the 1945 Potsdam Conference?",
      options: ["Three zones", "Four zones", "Two zones"],
      correctIndex: 1,
      explanation: "Germany and Berlin were partitioned into American, British, French, and Soviet zones of occupation."
    },
    {
      type: "number",
      question: "In what year CE did Winston Churchill deliver his iconic Iron Curtain address at Westminster College in Fulton, Missouri?",
      target: 1946,
      metricUnit: "year CE",
      imperialDisplay: "1946 CE",
      explanation: "On March 5, 1946, Churchill warned that an Iron Curtain had divided Europe from Stettin in the Baltic to Trieste in the Adriatic."
    },

    // Cycle 2
    {
      type: "mcq",
      question: "How did Western Allies bypass the 1948 to 1949 Soviet land blockade of West Berlin to keep two million citizens supplied with food and coal?",
      options: ["Armed tank convoys", "Underground rail tunnels", "Berlin Airlift"],
      correctIndex: 2,
      explanation: "Operation Vittles flew over 278,000 supply flights into Tempelhof and Gatow airports, delivering up to 13,000 tons of supplies daily."
    },
    {
      type: "mcq",
      question: "Which American pilot became famous during the Berlin Airlift as the Candy Bomber for dropping miniature parachutes with chewing gum and chocolates to children?",
      options: ["Gail Halvorsen", "Chuck Yeager", "Curtis LeMay"],
      correctIndex: 0,
      explanation: "Lieutenant Gail Halvorsen Operation Little Vittles became an enduring symbol of American humanitarian goodwill during the Cold War."
    },
    {
      type: "mcq",
      question: "What collective defense alliance was founded in Washington D.C. in April 1949 by twelve Western nations under the principle that an attack on one is an attack on all?",
      options: ["SEATO", "NATO", "CENTO"],
      correctIndex: 1,
      explanation: "The North Atlantic Treaty Organization created a unified military command to deter Soviet aggression in Europe."
    },
    {
      type: "mcq",
      question: "What mutual defense treaty was established in 1955 by the Soviet Union and seven Eastern European satellite states in response to West Germany joining NATO?",
      options: ["Comecon", "Cominform", "Warsaw Pact"],
      correctIndex: 2,
      explanation: "The Warsaw Pact bound Albania, Bulgaria, Czechoslovakia, East Germany, Hungary, Poland, Romania, and the USSR in a military alliance."
    },
    {
      type: "mcq",
      question: "In what year did the Soviet Union successfully test its first atomic bomb ending the American nuclear monopoly?",
      options: ["1949", "1953", "1945"],
      correctIndex: 0,
      explanation: "Detonated at Semipalatinsk on August 29, 1949, the Soviet atomic bomb test shocked Western intelligence agencies and accelerated the nuclear arms race."
    },
    {
      type: "number",
      question: "Approximately how many total metric tons of food, fuel, and supplies were flown into West Berlin during the Berlin Airlift from 1948 to 1949?",
      target: 2334000,
      metricUnit: "tons",
      imperialDisplay: "2,334,000 metric tons",
      explanation: "Allied aircrews transported 2,334,374 metric tons of supplies on 278,228 flights over the course of the 15-month operation."
    },

    // Cycle 3
    {
      type: "mcq",
      question: "Along which latitude line was the Korean peninsula divided into Soviet and American zones of influence in 1945 and contested during the Korean War?",
      options: ["17th Parallel", "38th Parallel", "49th Parallel"],
      correctIndex: 1,
      explanation: "The 38th parallel north served as the border before the June 1950 North Korean invasion and remains near the Demilitarized Zone today."
    },
    {
      type: "mcq",
      question: "Which American general led the daring amphibious landing behind enemy lines at Inchon in September 1950 before being dismissed by Truman in 1951?",
      options: ["Dwight D. Eisenhower", "Matthew Ridgway", "Douglas MacArthur"],
      correctIndex: 2,
      explanation: "MacArthur Inchon landing reversed the war momentum, but his public disputes with Truman over expanding the war into China led to his dismissal."
    },
    {
      type: "mcq",
      question: "What was the world first artificial satellite, launched into low Earth orbit by the Soviet Union on October 4, 1957, triggering the Space Race?",
      options: ["Sputnik 1", "Vostok 1", "Explorer 1"],
      correctIndex: 0,
      explanation: "Sputnik 1 orbited Earth for three weeks transmitting a steady radio beep, alarming the American public and leading to the creation of NASA."
    },
    {
      type: "mcq",
      question: "What stray Moscow street dog became the first living animal to orbit Earth aboard Soviet Sputnik 2 in November 1957?",
      options: ["Belka", "Laika", "Strelka"],
      correctIndex: 1,
      explanation: "Laika historic flight proved that living mammals could survive launch into orbit and weightlessness, though she died hours into the mission."
    },
    {
      type: "mcq",
      question: "Who was the Chief Designer behind the early Soviet space program, whose identity was kept a closely guarded state secret until his death in 1966?",
      options: ["Valentin Glushko", "Mikhail Yangel", "Sergei Korolev"],
      correctIndex: 2,
      explanation: "Sergei Korolev directed the development of the R-7 rocket, Sputnik, Laika, Yuri Gagarin flight, and the first spacewalk."
    },
    {
      type: "number",
      question: "At what degree of north latitude was the Korean Demilitarized Zone established following the 1953 armistice?",
      target: 38,
      metricUnit: "degrees north",
      imperialDisplay: "38 degrees north latitude",
      explanation: "The border approximates the 38th parallel north, extending roughly 250 km across the peninsula as a heavily fortified buffer zone."
    },

    // Cycle 4
    {
      type: "mcq",
      question: "Who became the first human in space and first to orbit Earth aboard Vostok 1 on April 12 1961, famously exclaiming Poyekhali?",
      options: ["Yuri Gagarin", "Gherman Titov", "Alexei Leonov"],
      correctIndex: 0,
      explanation: "Soviet cosmonaut Yuri Gagarin completed a single 108-minute orbit around Earth, becoming a global hero and cementing Soviet space prestige."
    },
    {
      type: "mcq",
      question: "Which American astronaut became the first American in space during a 15-minute suborbital Mercury flight aboard Freedom 7 in May 1961?",
      options: ["John Glenn", "Alan Shepard", "Neil Armstrong"],
      correctIndex: 1,
      explanation: "Alan Shepard piloted the Mercury-Redstone 3 capsule to an altitude of 187 kilometers, later walking on the Moon on Apollo 14."
    },
    {
      type: "mcq",
      question: "In which famous May 1961 address to Congress did President John F. Kennedy challenge the United States to land a man on the Moon before the decade was out?",
      options: ["Inaugural Address", "Berlin Speech", "Special Message on Urgent National Needs"],
      correctIndex: 2,
      explanation: "Kennedy committed the nation to landing an astronaut on the Moon and returning him safely before 1970, initiating the Apollo program."
    },
    {
      type: "mcq",
      question: "Who became the first American astronaut to successfully orbit Earth aboard Friendship 7 in February 1962?",
      options: ["John Glenn", "Gus Grissom", "Gordon Cooper"],
      correctIndex: 0,
      explanation: "John Glenn completed three orbits around Earth in five hours, restoring American confidence in the Space Race against the USSR."
    },
    {
      type: "mcq",
      question: "Who was the Soviet cosmonaut who performed the world first spacewalk outside Voskhod 2 in March 1965?",
      options: ["Yuri Gagarin", "Alexei Leonov", "Vladimir Komarov"],
      correctIndex: 1,
      explanation: "Leonov spent twelve minutes floating in open space tethered to Voskhod 2, experiencing a tense spacewalk as his spacesuit stiffened in vacuum."
    },
    {
      type: "number",
      question: "How many minutes did Yuri Gagarin historic first orbital flight aboard Vostok 1 last from launch to landing on April 12, 1961?",
      target: 108,
      metricUnit: "minutes",
      imperialDisplay: "108 minutes",
      explanation: "Gagarin completed one full orbit of Earth in 108 minutes, reaching a maximum orbital altitude of 327 kilometers."
    },

    // Cycle 5
    {
      type: "mcq",
      question: "What ultra-high-altitude reconnaissance spy plane designed by Clarence Kelly Johnson at Lockheed Skunk Works flew missions over the USSR?",
      options: ["SR-71 Blackbird", "XB-70 Valkyrie", "U-2 Dragon Lady"],
      correctIndex: 2,
      explanation: "The U-2 operated at altitudes above 70,000 feet, carrying high-resolution cameras to photograph Soviet missile installations and airbases."
    },
    {
      type: "mcq",
      question: "Which American CIA pilot was shot down over Sverdlovsk in a U-2 spy plane on May 1 1960, sparking a major international crisis?",
      options: ["Francis Gary Powers", "Rudolf Anderson", "Gary Powers Jr."],
      correctIndex: 0,
      explanation: "Powers was captured alive along with his reconnaissance equipment, forcing President Eisenhower to admit American espionage flights."
    },
    {
      type: "mcq",
      question: "Which notorious Soviet spy ring in Britain passed top-secret atomic and diplomatic intelligence to the KGB from the 1930s through the 1950s?",
      options: ["Portland Spy Ring", "Cambridge Five", "Red Orchestra"],
      correctIndex: 1,
      explanation: "Recruited at Cambridge University, members including Kim Philby, Guy Burgess, Donald Maclean, Anthony Blunt, and John Cairncross infiltrated British MI6."
    },
    {
      type: "mcq",
      question: "What famous bridge connecting West Berlin to Potsdam was used repeatedly during the Cold War to exchange captured spies?",
      options: ["Oberbaum Bridge", "Tiergarten Bridge", "Glienicke Bridge"],
      correctIndex: 2,
      explanation: "Nicknamed the Bridge of Spies, Glienicke Bridge was the site of the 1962 swap of U-2 pilot Francis Gary Powers for Soviet spy Rudolf Abel."
    },
    {
      type: "mcq",
      question: "What was the primary foreign intelligence and secret police agency of the Soviet Union from 1954 until its dissolution in 1991?",
      options: ["KGB", "GRU", "NKVD"],
      correctIndex: 0,
      explanation: "The Committee for State Security directed foreign espionage, counter-intelligence, border guards, and internal political suppression."
    },
    {
      type: "number",
      question: "At what altitude in meters was Francis Gary Powers U-2 reconnaissance aircraft flying when struck by a Soviet surface-to-air missile in 1960?",
      target: 21300,
      metricUnit: "meters",
      imperialDisplay: "70,500 feet (21,300 m)",
      explanation: "Powers was cruising at roughly 21,300 meters (70,500 feet) when an S-75 Dvina missile exploded behind his plane, severing its tail."
    },

    // Cycle 6
    {
      type: "mcq",
      question: "In what month and year did the East German government erect the Berlin Wall to stop the flight of skilled workers to the West?",
      options: ["June 1953", "August 1961", "November 1963"],
      correctIndex: 1,
      explanation: "Begun on August 13, 1961, the wall sealed the border, eventually featuring concrete slabs, watchtowers, and the Death Strip."
    },
    {
      type: "mcq",
      question: "What famous Cold War border crossing checkpoint on Friedrichstrasse in Berlin was the site of a tense 1961 standoff between US and Soviet tanks?",
      options: ["Checkpoint Alpha", "Checkpoint Bravo", "Checkpoint Charlie"],
      correctIndex: 2,
      explanation: "In October 1961, American and Soviet tanks faced off at point-blank range for sixteen hours over diplomatic transit access."
    },
    {
      type: "mcq",
      question: "What failed April 1961 CIA-backed invasion by Cuban exiles attempted to overthrow Fidel Castro communist regime in Cuba?",
      options: ["Bay of Pigs Invasion", "Operation Mongoose", "Operation Northwoods"],
      correctIndex: 0,
      explanation: "Brigade 2506 landed at the Bay of Pigs but was defeated in three days after President Kennedy withheld direct American air support."
    },
    {
      type: "mcq",
      question: "What high-stakes 13-day confrontation in October 1962 brought the US and USSR to the brink of full-scale thermonuclear war?",
      options: ["Suez Crisis", "Cuban Missile Crisis", "Taiwan Strait Crisis"],
      correctIndex: 1,
      explanation: "US U-2 spy photos revealed Soviet nuclear ballistic missile launch sites under construction in Cuba, 90 miles from Florida."
    },
    {
      type: "mcq",
      question: "What military action did President Kennedy choose to take instead of an immediate airstrike to prevent further Soviet missile shipments to Cuba?",
      options: ["Total land invasion", "Full economic embargo", "Naval quarantine"],
      correctIndex: 2,
      explanation: "Kennedy declared a naval quarantine encircling Cuba with US warships to prevent further offensive military shipments."
    },
    {
      type: "number",
      question: "How many days did the perilous Cuban Missile Crisis standoff last between October 16 and October 28, 1962?",
      target: 13,
      metricUnit: "days",
      imperialDisplay: "13 days",
      explanation: "The 13-day crisis ended when Nikita Khrushchev agreed to dismantle Cuban missiles in exchange for US promises not to invade Cuba and remove Jupiter missiles from Turkey."
    },

    // Cycle 7
    {
      type: "mcq",
      question: "What colossal three-stage liquid-fueled rocket engineered by Wernher von Braun propelled the Apollo spacecraft to the Moon?",
      options: ["Saturn V", "Titan II", "Atlas-Centaur"],
      correctIndex: 0,
      explanation: "Standing 111 meters tall and generating 7.5 million pounds of thrust, the Saturn V remains the most powerful rocket successfully flown in history."
    },
    {
      type: "mcq",
      question: "On July 20 1969, who became the first human to step onto the lunar surface, declaring that it was one small step for man, one giant leap for mankind?",
      options: ["Buzz Aldrin", "Neil Armstrong", "Michael Collins"],
      correctIndex: 1,
      explanation: "Neil Armstrong commander of Apollo 11 stepped onto the Sea of Tranquility, followed minutes later by Lunar Module Pilot Buzz Aldrin."
    },
    {
      type: "mcq",
      question: "Which astronaut remained in lunar orbit aboard the Command Module Columbia while Armstrong and Aldrin explored the lunar surface?",
      options: ["Pete Conrad", "Jim Lovell", "Michael Collins"],
      correctIndex: 2,
      explanation: "Michael Collins orbited the Moon alone for over 21 hours, maintaining communication relays and orbital navigation."
    },
    {
      type: "mcq",
      question: "What famous callsign did the Apollo 11 Lunar Module use after safely touching down on the lunar surface on July 20 1969?",
      options: ["Eagle", "Falcon", "Aquarius"],
      correctIndex: 0,
      explanation: "Armstrong radioed Mission Control in Houston that Tranquility Base had reported the Eagle had landed."
    },
    {
      type: "mcq",
      question: "What joint 1975 spaceflight saw American and Soviet spacecraft dock together in orbit, symbolizing Cold War detente?",
      options: ["Gemini-Vostok", "Apollo-Soyuz Test Project", "Shuttle-Mir Program"],
      correctIndex: 1,
      explanation: "Commanders Thomas Stafford and Alexei Leonov opened the orbital docking hatch and shook hands in space on July 17, 1975."
    },
    {
      type: "number",
      question: "In what year CE did the Apollo 11 mission successfully land the first humans on the Moon?",
      target: 1969,
      metricUnit: "year CE",
      imperialDisplay: "1969 CE",
      explanation: "On July 20, 1969, American astronauts landed on the Moon, fulfilling Kennedy's national goal before the decade expired."
    },

    // Cycle 8
    {
      type: "mcq",
      question: "What military doctrine posited that the full-scale deployment of nuclear weapons by two opposing sides would result in the complete annihilation of both?",
      options: ["Flexible Response", "Massive Retaliation", "Mutually Assured Destruction"],
      correctIndex: 2,
      explanation: "Mutually Assured Destruction theorized that neither superpower would launch a first strike knowing that second-strike retaliations would ensure mutual destruction."
    },
    {
      type: "mcq",
      question: "What massive 50-megaton thermonuclear bomb detonated by the Soviet Union over Novaya Zemlya in 1961 remains the most powerful explosive device ever tested?",
      options: ["Tsar Bomba", "Castle Bravo", "Ivy Mike"],
      correctIndex: 0,
      explanation: "The Tsar Bomba created a fireball 8 kilometers wide and a mushroom cloud reaching 67 kilometers into the stratosphere."
    },
    {
      type: "mcq",
      question: "What direct telecommunications link was established in 1963 between the White House and the Kremlin following the Cuban Missile Crisis?",
      options: ["The Red Phone", "Moscow-Washington Hotline", "Command Link Alpha"],
      correctIndex: 1,
      explanation: "Utilizing teletype and secure enciphered cable links, the hotline enabled rapid crisis communication between heads of state."
    },
    {
      type: "mcq",
      question: "What groundbreaking 1972 bilateral arms control treaty signed by Nixon and Brezhnev limited anti-ballistic missile defense systems?",
      options: ["START I", "INF Treaty", "ABM Treaty"],
      correctIndex: 2,
      explanation: "The Anti-Ballistic Missile Treaty ensured that both superpowers remained vulnerable to retaliatory strikes, preserving strategic deterrence."
    },
    {
      type: "mcq",
      question: "What was the strategic triad that formed the three prongs of Cold War nuclear deterrence for the United States and USSR?",
      options: ["Land-based ICBMs, submarine-launched SLBMs, and strategic bombers", "Chemical weapons, biological warheads, and artillery", "Naval destroyers, spy satellites, and aircraft carriers"],
      correctIndex: 0,
      explanation: "The nuclear triad ensured that even if one leg was destroyed in a surprise first strike, the remaining two prongs could deliver a devastating response."
    },
    {
      type: "number",
      question: "What was the explosive yield in megatons of TNT of the Soviet Tsar Bomba detonated on October 30, 1961?",
      target: 50,
      metricUnit: "megatons",
      imperialDisplay: "50 megatons of TNT",
      explanation: "Yielding 50 megatons (equivalent to 3,800 Hiroshima bombs), the blast broke window panes over 900 kilometers away."
    },

    // Cycle 9
    {
      type: "mcq",
      question: "What theory proposed by President Eisenhower held that if one country fell to communism, neighboring nations would quickly follow like a row of falling dominos?",
      options: ["Containment Theory", "Domino Theory", "Rollback Theory"],
      correctIndex: 1,
      explanation: "The Domino Theory heavily influenced American military intervention in Southeast Asia, particularly in Vietnam, Laos, and Cambodia."
    },
    {
      type: "mcq",
      question: "What January 1968 countrywide coordinated surprise offensive launched by the Viet Cong and North Vietnamese Army eroded American public support for the Vietnam War?",
      options: ["Easter Offensive", "Gulf of Tonkin Incident", "Tet Offensive"],
      correctIndex: 2,
      explanation: "Striking more than 100 cities during the Lunar New Year holiday, the Tet Offensive shattered official claims that the war was near an end."
    },
    {
      type: "mcq",
      question: "In what year did the capital of South Vietnam, Saigon, fall to North Vietnamese forces, officially ending the Vietnam War?",
      options: ["1975", "1973", "1979"],
      correctIndex: 0,
      explanation: "Saigon fell on April 30, 1975, followed by the evacuation of remaining American personnel in Operation Frequent Wind and national reunification."
    },
    {
      type: "mcq",
      question: "What major Soviet military intervention began in December 1979 to prop up a communist regime, becoming known as the Soviet Union Vietnam?",
      options: ["Invasion of Hungary", "Soviet-Afghan War", "Prague Spring Intervention"],
      correctIndex: 1,
      explanation: "The decade-long Afghan War cost thousands of Soviet lives and billions of rubles against Mujahideen fighters, severely straining the Soviet economy."
    },
    {
      type: "mcq",
      question: "What period of easing geopolitical tensions between the US, USSR, and China during the 1970s was championed by Richard Nixon and Henry Kissinger?",
      options: ["Perestroika", "Ostpolitik", "Detente"],
      correctIndex: 2,
      explanation: "Detente included Nixon historic 1972 visit to Beijing, the Moscow Summit, and the signing of the Strategic Arms Limitation Talks."
    },
    {
      type: "number",
      question: "In what year CE did the Vietnam War conclude with the fall of Saigon and the complete withdrawal of foreign personnel?",
      target: 1975,
      metricUnit: "year CE",
      imperialDisplay: "1975 CE",
      explanation: "On April 30, 1975, North Vietnamese tanks crashed through the gates of the Independence Palace in Saigon."
    },

    // Cycle 10
    {
      type: "mcq",
      question: "Which reformist Soviet leader introduced the policies of Glasnost and Perestroika in the mid-1980s?",
      options: ["Mikhail Gorbachev", "Leonid Brezhnev", "Yuri Andropov"],
      correctIndex: 0,
      explanation: "Gorbachev sought to revitalize the stagnant Soviet economy and political system, unintentionally setting off forces that dissolved the USSR."
    },
    {
      type: "mcq",
      question: "What speech did President Ronald Reagan deliver at the Brandenburg Gate in June 1987, challenging the Soviet leader to tear down the Berlin Wall?",
      options: ["Evil Empire Speech", "Tear Down This Wall Speech", "Star Wars Address"],
      correctIndex: 1,
      explanation: "Reagan proclaimed directly to General Secretary Gorbachev that if he sought peace and prosperity he should tear down the wall."
    },
    {
      type: "mcq",
      question: "What independent Polish trade union led by shipyard electrician Lech Walesa played a central role in toppling communist rule in Poland in 1989?",
      options: ["Civic Forum", "Charter 77", "Solidarity"],
      correctIndex: 2,
      explanation: "Solidarity mobilized millions of workers with support from Pope John Paul II, leading to free elections in Poland in 1989."
    },
    {
      type: "mcq",
      question: "On what historic date did jubilant East and West Berliners begin dismantling the Berlin Wall after border restrictions were mistakenly lifted?",
      options: ["November 9 1989", "October 3 1990", "December 25 1991"],
      correctIndex: 0,
      explanation: "Following a botched press announcement, thousands swarmed checkpoints, dancing atop the wall in a euphoric celebration."
    },
    {
      type: "mcq",
      question: "On Christmas Day in what year did Mikhail Gorbachev resign as Soviet president, with the hammer-and-sickle flag lowered over the Kremlin for the last time?",
      options: ["1989", "1991", "1993"],
      correctIndex: 1,
      explanation: "On December 25, 1991, the Soviet Union formally ceased to exist, splintering into fifteen independent republics and ending the Cold War."
    },
    {
      type: "number",
      question: "In what year CE did the Soviet Union officially dissolve, formally marking the end of the Cold War?",
      target: 1991,
      metricUnit: "year CE",
      imperialDisplay: "1991 CE",
      explanation: "On December 26, 1991, the Supreme Soviet dissolved the USSR, bringing a peaceful conclusion to the 45-year global Cold War."
    }
  ]
};
