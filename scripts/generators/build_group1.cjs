const fs = require('fs');
const path = require('path');

function createMCQ(question, correctOption, wrongOption1, wrongOption2, explanation, mcqIndex) {
  const targetSlot = mcqIndex % 3;
  const options = [];
  if (targetSlot === 0) {
    options.push(correctOption, wrongOption1, wrongOption2);
  } else if (targetSlot === 1) {
    options.push(wrongOption1, correctOption, wrongOption2);
  } else {
    options.push(wrongOption1, wrongOption2, correctOption);
  }
  const cleanOptions = options.map(o => o.replace(/[()[\]{}]/g, '').trim());
  return {
    type: 'mcq',
    question: question.trim(),
    options: cleanOptions,
    correctIndex: targetSlot,
    explanation: explanation.trim()
  };
}

function createNumber(question, target, metricUnit, imperialDisplay, explanation) {
  return {
    type: 'number',
    question: question.trim(),
    target: typeof target === 'number' ? target : parseFloat(target),
    metricUnit: metricUnit.trim(),
    imperialDisplay: imperialDisplay ? imperialDisplay.trim() : undefined,
    explanation: explanation.trim()
  };
}

// -------------------------------------------------------------
// QUIZ 1: classical-music-great-composers-60
// -------------------------------------------------------------
function getClassicalMusicQuiz() {
  let mcqIdx = 0;
  const q = [];

  // Cycle 1: Baroque Pioneers
  q.push(createMCQ("Which German Baroque master composed the monumental Brandenburg Concertos and The Well-Tempered Clavier?", "Johann Sebastian Bach", "George Frideric Handel", "Georg Philipp Telemann", "J.S. Bach composed the six Brandenburg Concertos in 1721 and served as Thomaskantor in Leipzig for over 27 years.", mcqIdx++));
  q.push(createMCQ("Which Venetian composer, known as The Red Priest, composed the famous set of four violin concertos titled The Four Seasons?", "Antonio Vivaldi", "Arcangelo Corelli", "Tomaso Albinoni", "Antonio Vivaldi was an ordained Catholic priest with reddish hair who taught and composed at the Ospedale della Pieta orphanage in Venice.", mcqIdx++));
  q.push(createMCQ("George Frideric Handel composed which world-famous 1741 English-language oratorio featuring the iconic Hallelujah Chorus?", "Messiah", "Judas Maccabaeus", "Solomon", "Handel composed Messiah in just 24 days in 1741, premiering the work in Dublin the following year.", mcqIdx++));
  q.push(createMCQ("Which English Baroque composer created the opera Dido and Aeneas, featuring the poignant aria Dido's Lament?", "Henry Purcell", "Thomas Tallis", "William Byrd", "Henry Purcell served as organist at Westminster Abbey and became one of England's greatest Baroque composers before dying at age 36.", mcqIdx++));
  q.push(createMCQ("What keyboard tuning system did J.S. Bach promote through two books of preludes and fugues in all 24 major and minor keys?", "Well-temperament", "Mean-tone temperament", "Just intonation", "The Well-Tempered Clavier demonstrated that keyboard instruments could play smoothly in every key without jarring dissonance.", mcqIdx++));
  q.push(createNumber("In what year CE did George Frideric Handel premiere his grand English oratorio Messiah in Dublin?", 1742, "CE", "April 1742", "Handel's Messiah received its historic premiere on 13 April 1742 at the Great Music Hall on Fishamble Street in Dublin."));

  // Cycle 2: Wolfgang Amadeus Mozart
  q.push(createMCQ("In which Austrian city was child prodigy Wolfgang Amadeus Mozart born in January 1756?", "Salzburg", "Vienna", "Innsbruck", "Mozart was born in Salzburg to composer Leopold Mozart and showed astonishing virtuosity on keyboard and violin from age four.", mcqIdx++));
  q.push(createMCQ("Which mysterious unfinished masterwork was Mozart composing on his deathbed in December 1791, later completed by Franz Xaver Sussmayr?", "Requiem in D minor", "Great Mass in C minor", "Coronation Mass", "Count Franz von Walsegg secretly commissioned the Requiem, which Mozart left incomplete at his death at age 35.", mcqIdx++));
  q.push(createMCQ("Which Mozart German Singspiel opera features the character Papageno the birdcatcher and the virtuoso Queen of the Night aria?", "The Magic Flute", "The Abduction from the Seraglio", "Cosi fan tutte", "The Magic Flute (Die Zauberflote) premiered in Vienna in September 1791, just two months before Mozart's death.", mcqIdx++));
  q.push(createMCQ("Which Italian librettist collaborated with Mozart on three of his greatest operas: The Marriage of Figaro, Don Giovanni, and Cosi fan tutte?", "Lorenzo Da Ponte", "Pietro Metastasio", "Arrigo Boito", "Lorenzo Da Ponte wrote the witty, incisive Italian libretti that helped establish Mozart's greatest operatic masterpieces.", mcqIdx++));
  q.push(createMCQ("What is the official cataloguing prefix used for Mozart's compositions, named after the Austrian botanist and musicologist who indexed them?", "K", "BWV", "Opus", "Ludwig von Kochel published the first chronological catalog of Mozart's works in 1862, assigning K numbers to all 626 works.", mcqIdx++));
  q.push(createNumber("How many total documented musical compositions are indexed in the Kochel catalog of Mozart's works?", 626, "compositions", "K. 1 to K. 626", "The Kochel catalog documents exactly 626 distinct compositions created by Mozart across his prolific 35-year life."));

  // Cycle 3: Ludwig van Beethoven
  q.push(createMCQ("Which Beethoven symphony, originally dedicated to Napoleon Bonaparte, marked the monumental transition from Classical to Romantic music?", "Symphony No. 3 Eroica", "Symphony No. 5", "Symphony No. 7", "Beethoven tore up the title page dedicating Symphony No. 3 to Napoleon upon learning that Bonaparte had crowned himself Emperor of the French.", mcqIdx++));
  q.push(createMCQ("In the finale of his Ninth Symphony, Beethoven set Friedrich Schiller's poem celebrating universal brotherhood, titled what?", "Ode to Joy", "Erlkonig", "Song of the Bell", "The choral finale of Symphony No. 9 introduced vocal soloists and chorus into a major symphony for the first time in classical music history.", mcqIdx++));
  q.push(createMCQ("What tragic physical ailment began afflicting Beethoven in his late twenties, leading to near-total loss by his fifties?", "Deafness", "Blindness", "Paralysis", "Despite severe hearing loss starting around 1798, Beethoven continued composing profound works using internal hearing and bone conduction.", mcqIdx++));
  q.push(createMCQ("Which famous Beethoven piano sonata in C-sharp minor was given its nocturnal nickname by poet Ludwig Rellstab in 1832?", "Moonlight Sonata", "Pathetique Sonata", "Appassionata Sonata", "Piano Sonata No. 14 was nicknamed Moonlight because Rellstab likened its first movement to moonlight shimmering on Lake Lucerne.", mcqIdx++));
  q.push(createMCQ("In which letter written to his brothers in 1802 did Beethoven express his deep despair over his worsening deafness and his devotion to art?", "Heiligenstadt Testament", "Immortal Beloved Letter", "Vienna Manifesto", "Written in Heiligenstadt near Vienna, the poignant testament revealed Beethoven's resolution to overcome despair through his musical mission.", mcqIdx++));
  q.push(createNumber("How many numbered, fully completed symphonies did Ludwig van Beethoven compose during his lifetime?", 9, "symphonies", "Symphonies 1 through 9", "Beethoven completed exactly 9 full symphonies between 1799 and 1824, fundamentally transforming the symphonic form."));

  // Cycle 4: Romantic Masters
  q.push(createMCQ("Which Polish-born virtuoso composer was hailed as the Poet of the Piano, creating celebrated nocturnes, mazurkas, and polonaises?", "Frederic Chopin", "Franz Liszt", "Robert Schumann", "Chopin settled in Paris in 1831 and dedicated almost his entire compositional output to the expressive capabilities of the solo piano.", mcqIdx++));
  q.push(createMCQ("Which Hungarian pianist and composer created the concept of the modern solo piano recital and invented the symphonic poem?", "Franz Liszt", "Bela Bartok", "Johannes Brahms", "Liszt was the 19th century's foremost piano superstar, sparking Lisztomania across Europe with his unmatched technical brilliance.", mcqIdx++));
  q.push(createMCQ("Which German composer was championed as Beethoven's true symphonic heir, composing his famous Lullaby and Academic Festival Overture?", "Johannes Brahms", "Felix Mendelssohn", "Robert Schumann", "Brahms spent over twenty years perfecting his First Symphony, which conductor Hans von Bulow famously hailed as Beethoven's Tenth.", mcqIdx++));
  q.push(createMCQ("Which early Romantic composer helped spark a 19th-century J.S. Bach revival by conducting the St. Matthew Passion in Berlin in 1829?", "Felix Mendelssohn", "Franz Schubert", "Carl Maria von Weber", "Mendelssohn's historic Berlin performance at age 20 rescued Bach's masterpiece from obscurity and reignited worldwide appreciation for Bach.", mcqIdx++));
  q.push(createMCQ("Which Austrian master composed more than 600 Lieder (art songs), including Erlkonig, before dying in Vienna at age 31?", "Franz Schubert", "Hugo Wolf", "Gustav Mahler", "Schubert established the German Lied as a supreme art form and composed masterworks such as the Unfinished Symphony and the Trout Quintet.", mcqIdx++));
  q.push(createNumber("How many solo piano Nocturnes did Frederic Chopin compose across his career?", 21, "nocturnes", "21 solo nocturnes", "Chopin composed 21 nocturnal piano pieces between 1827 and 1846, establishing them as quintessential Romantic keyboard masterworks."));

  // Cycle 5: Russian Titans & Nationalism
  q.push(createMCQ("Which Russian composer created the iconic ballets Swan Lake, The Sleeping Beauty, and The Nutcracker?", "Pyotr Ilyich Tchaikovsky", "Modest Mussorgsky", "Sergei Prokofiev", "Tchaikovsky's sweeping melodies and dramatic orchestral flair made him one of the most beloved and performed composers in global music history.", mcqIdx++));
  q.push(createMCQ("Which Russian nationalist composer wrote the dazzling orchestral suite Scheherazade based on One Thousand and One Nights?", "Nikolai Rimsky-Korsakov", "Alexander Borodin", "Cesar Cui", "Rimsky-Korsakov was a master of colorful orchestration and a leading member of the Russian group of composers known as The Five.", mcqIdx++));
  q.push(createMCQ("Which towering Russian virtuoso pianist and composer created the beloved Piano Concerto No. 2 in C minor after overcoming severe depression?", "Sergei Rachmaninoff", "Alexander Scriabin", "Anton Rubinstein", "Rachmaninoff dedicated the triumphant concerto to his hypnotherapist Nikolai Dahl, who helped him overcome creative paralysis after his First Symphony flopped.", mcqIdx++));
  q.push(createMCQ("Which 1913 Igor Stravinsky ballet caused a legendary riot at its Paris premiere due to its raw polyrhythms and avant-garde choreography?", "The Rite of Spring", "The Firebird", "Petrushka", "The Rite of Spring (Le Sacre du printemps) revolutionized 20th-century rhythm and orchestration, shocking the Parisian audience at the Theatre des Champs-Elysees.", mcqIdx++));
  q.push(createMCQ("What Russian composer created the orchestral tone poem Night on Bald Mountain and the piano suite Pictures at an Exhibition?", "Modest Mussorgsky", "Mily Balakirev", "Mikhail Glinka", "Mussorgsky drew deep inspiration from Russian folklore and history, also composing the landmark national opera Boris Godunov.", mcqIdx++));
  q.push(createNumber("In what year CE did Tchaikovsky's holiday ballet The Nutcracker premiere at the Mariinsky Theatre in Saint Petersburg?", 1892, "CE", "December 1892", "The Nutcracker premiered on 18 December 1892 in Saint Petersburg, paired on a double bill with Tchaikovsky's opera Iolanta."));

  // Cycle 6: Opera Grandeur
  q.push(createMCQ("Which Italian opera master composed Nabucco, Rigoletto, Il Trovatore, and La Traviata?", "Giuseppe Verdi", "Giacomo Puccini", "Gioachino Rossini", "Verdi was the dominant figure in Italian 19th-century opera, whose patriotic chorus Va, pensiero from Nabucco became an anthem of Italian unification.", mcqIdx++));
  q.push(createMCQ("Which Italian composer created the emotionally devastating verismo operas La Boheme, Tosca, and Madama Butterfly?", "Giacomo Puccini", "Ruggero Leoncavallo", "Pietro Mascagni", "Puccini's soaring melodies and vivid characterizations established his works as permanent cornerstones of the international operatic repertoire.", mcqIdx++));
  q.push(createMCQ("Which German composer developed the concept of the Gesamtkunstwerk (total work of art) and wrote the monumental four-opera Ring Cycle?", "Richard Wagner", "Carl Maria von Weber", "Richard Strauss", "Wagner built his own festival opera house in Bayreuth, Germany, specifically designed to stage his epic music dramas with hidden orchestra pit.", mcqIdx++));
  q.push(createMCQ("Which French composer died in 1875 shortly after the scandalous premiere of his masterpiece Carmen, never seeing its global acclaim?", "Georges Bizet", "Charles Gounod", "Camille Saint-Saens", "Bizet died of a heart attack at age 36, believing Carmen had failed; today it is one of the world's three most frequently performed operas.", mcqIdx++));
  q.push(createMCQ("Which Rossini opera features the famously rapid patter aria Largo al factotum sung by the charismatic barber Figaro?", "The Barber of Seville", "William Tell", "La Cenerentola", "Gioachino Rossini wrote The Barber of Seville in less than three weeks in 1816, establishing it as the supreme comedic bel canto opera.", mcqIdx++));
  q.push(createNumber("How many total operas comprise Richard Wagner's epic masterwork The Ring of the Nibelung (Der Ring des Nibelungen)?", 4, "operas", "4 epic music dramas", "The Ring Cycle comprises Das Rheingold, Die Walkure, Siegfried, and Gotterdammerung, performing over four consecutive festival evenings."));

  // Cycle 7: Late Romantic & Impressionism
  q.push(createMCQ("Which Bohemian-Austrian composer and conductor famously stated, The symphony must be like the world. It must embrace everything?", "Gustav Mahler", "Anton Bruckner", "Richard Strauss", "Mahler composed monumental symphonies with massive orchestrations and vocal movements, including the Resurrection Symphony and Symphony of a Thousand.", mcqIdx++));
  q.push(createMCQ("Which French Impressionist master created the shimmering orchestral prelude Prelude to the Afternoon of a Faun and the piano piece Clair de lune?", "Claude Debussy", "Maurice Ravel", "Erik Satie", "Debussy rejected rigid Germanic forms in favor of subtle tonal colors, whole-tone scales, and evocative atmospheric soundscapes.", mcqIdx++));
  q.push(createMCQ("Which French master composed the hypnotic, steadily crescendoing orchestral piece Bolero in 1928 for dancer Ida Rubinstein?", "Maurice Ravel", "Gabriel Faure", "Paul Dukas", "Bolero repeats a single two-part melody over an unchanging Spanish snare-drum rhythm while gradually adding orchestral layers until a massive climax.", mcqIdx++));
  q.push(createMCQ("Which German composer composed the tone poem Also sprach Zarathustra, whose dramatic opening sunrise fanfare became iconic in 2001: A Space Odyssey?", "Richard Strauss", "Max Reger", "Paul Hindemith", "Strauss expanded orchestral virtuosity with landmark tone poems and groundbreaking modern operas including Salome and Elektra.", mcqIdx++));
  q.push(createMCQ("Which Finnish national composer wrote the stirring patriotic tone poem Finlandia and the Karelia Suite?", "Jean Sibelius", "Edvard Grieg", "Carl Nielsen", "Sibelius's music helped rally Finnish national identity during Russian domination, earning him status as Finland's greatest cultural icon.", mcqIdx++));
  q.push(createNumber("In what year CE did Claude Debussy publish his celebrated piano masterwork Suite bergamasque containing Clair de lune?", 1905, "CE", "circa 1905", "Though composed starting in 1890, Debussy revised and officially published the complete Suite bergamasque in 1905."));

  // Cycle 8: Modern & 20th Century Pioneers
  q.push(createMCQ("Which Hungarian master traveled through Eastern European villages recording authentic peasant folk melodies with a phonograph?", "Bela Bartok", "Zoltan Kodaly", "Gyorgy Ligeti", "Bartok combined ethnomusicological field research with cutting-edge 20th-century harmony, composing the landmark Concerto for Orchestra.", mcqIdx++));
  q.push(createMCQ("Which Soviet composer wrote his triumphant Fifth Symphony in 1937, subtitled A Soviet artist's response to just criticism, to appease Stalin?", "Dmitri Shostakovich", "Sergei Prokofiev", "Aram Khachaturian", "Shostakovich lived under constant threat of Stalinist purges, embedding subtle irony and defiance throughout his 15 symphonies and 15 string quartets.", mcqIdx++));
  q.push(createMCQ("Which Austrian pioneer developed the twelve-tone technique (dodecaphony) and led the Second Viennese School?", "Arnold Schoenberg", "Alban Berg", "Anton Webern", "Schoenberg dismantled traditional Western tonality, ensuring all 12 chromatic pitches were treated with equal structural importance.", mcqIdx++));
  q.push(createMCQ("Which American composer created the distinctly American orchestral sound in ballets such as Appalachian Spring, Rodeo, and Billy the Kid?", "Aaron Copland", "Charles Ives", "Samuel Barber", "Copland used open intervals, folk melodies, and pastoral harmonies that came to define the musical landscape of the American West.", mcqIdx++));
  q.push(createMCQ("Which American composer bridged classical music and jazz in 1924 with his iconic concert piece Rhapsody in Blue?", "George Gershwin", "Cole Porter", "Leonard Bernstein", "Gershwin composed Rhapsody in Blue for Paul Whiteman's jazz band, showcasing virtuosic piano passages and famous clarinet glissando.", mcqIdx++));
  q.push(createNumber("In what year CE did George Gershwin's Rhapsody in Blue receive its historic Aeolian Hall premiere in New York?", 1924, "CE", "February 1924", "Rhapsody in Blue premiered on 12 February 1924 in New York at a concert titled An Experiment in Modern Music."));

  // Cycle 9: Instruments, Orchestration & Conducting
  q.push(createMCQ("Which Cremonese violin maker crafted the most prized and acoustically flawless stringed instruments during the golden era between 1644 and 1737?", "Antonio Stradivari", "Andrea Amati", "Giuseppe Guarneri", "Stradivari crafted over 1,100 violins, violas, and cellos, of which around 650 survive today as multi-million dollar masterpieces.", mcqIdx++));
  q.push(createMCQ("What double-reed woodwind instrument plays the tuning concert A (A440) for the entire orchestra to tune to before a concert?", "Oboe", "Flute", "Clarinet", "The oboe's bright, penetrating harmonic overtone structure makes it easily audible across all instrument sections for tuning.", mcqIdx++));
  q.push(createMCQ("Which Italian musical term indicates a very loud, powerful dynamic marking in orchestral scores?", "Fortissimo", "Pianissimo", "Mezzo forte", "Fortissimo (ff) instructs musicians to perform very loudly, contrasted with pianissimo (pp) for very soft playing.", mcqIdx++));
  q.push(createMCQ("What is the highest-pitched member of the orchestral brass family, typically playing the lead melodic lines?", "Trumpet", "French Horn", "Trombone", "The trumpet possesses the highest register among brass instruments and provides brilliant carrying power in orchestral climaxes.", mcqIdx++));
  q.push(createMCQ("Which charismatic American conductor and composer hosted the Young People's Concerts on CBS and composed West Side Story?", "Leonard Bernstein", "Arthur Fiedler", "Seiji Ozawa", "Bernstein served as music director of the New York Philharmonic and educated millions of television viewers about symphonic music.", mcqIdx++));
  q.push(createNumber("Approximately how many musicians perform together in a standard, fully staffed modern symphony orchestra?", 100, "musicians", "90 to 105 players", "A modern major symphony orchestra typically consists of 90 to 105 professional musicians spanning strings, woodwinds, brass, and percussion."));

  // Cycle 10: Iconic Masterworks & World Records
  q.push(createMCQ("Which opening four-note rhythmic motif (short-short-short-long) was famously described as Fate knocking at the door?", "Beethoven's Symphony No. 5", "Brahms's Symphony No. 1", "Tchaikovsky's Symphony No. 4", "Beethoven's Fifth Symphony opens with the iconic four-note motif that anchors the entire dramatic development across all four movements.", mcqIdx++));
  q.push(createMCQ("Which 1937 dramatic cantata by German composer Carl Orff opens and closes with the powerful chorus O Fortuna?", "Carmina Burana", "Catulli Carmina", "Trionfo di Afrodite", "Carmina Burana set 24 medieval poems found in a Bavarian monastery, celebrating the wheel of fortune and earthly pleasures.", mcqIdx++));
  q.push(createMCQ("Which English composer created the Enigma Variations in 1899, featuring the emotionally profound and beloved variation titled Nimrod?", "Edward Elgar", "Ralph Vaughan Williams", "Gustav Holst", "Sir Edward Elgar dedicated the variations to my friends pictured within, depicting his wife and close acquaintances in distinct musical portraits.", mcqIdx++));
  q.push(createMCQ("Which English composer created the epic seven-movement orchestral suite The Planets between 1914 and 1917?", "Gustav Holst", "Benjamin Britten", "William Walton", "Holst's suite depicts the astrological characters of seven planets in the solar system, opening with Mars, the Bringer of War.", mcqIdx++));
  q.push(createMCQ("What Baroque form features a short recurring bass line and chord progression over which continuous melodic variations are built?", "Passacaglia", "Fugue", "Sonata-allegro", "Passacaglias and chaconnes were popular Baroque variation forms, epitomized by J.S. Bach's monumental Passacaglia and Fugue in C minor.", mcqIdx++));
  q.push(createNumber("How many days did George Frideric Handel take to compose the complete musical score of Messiah in 1741?", 24, "days", "24 intensive days", "Handel accomplished the monumental compositional feat of writing Messiah's 260-page score in just 24 days between August and September 1741."));

  return {
    id: "classical-music-great-composers-60",
    theme: "Classical Music: Mozart, Beethoven & Symphony",
    title: "Classical Music: Mozart, Beethoven & Symphony",
    description: "A 60-question grand master assessment on the Baroque pioneers, Classical masterworks of Mozart and Beethoven, Romantic symphonies, opera grandeur, Russian titans, and modern orchestral innovations.",
    category: "Arts, Music, Literature & Philosophy",
    difficulty: "moderate",
    createdAt: "2026-08-27T00:00:00Z",
    questions: q
  };
}

// -------------------------------------------------------------
// QUIZ 2: rock-music-pop-legends-60
// -------------------------------------------------------------
function getRockPopMusicQuiz() {
  let mcqIdx = 0;
  const q = [];

  // Cycle 1: The British Invasion & The Beatles
  q.push(createMCQ("In which English city did The Beatles form in 1960 before launching the global phenomenon of Beatlemania?", "Liverpool", "Manchester", "Birmingham", "John Lennon, Paul McCartney, George Harrison, and Ringo Starr honed their sound at Liverpool's Cavern Club and in Hamburg before achieving worldwide superstardom.", mcqIdx++));
  q.push(createMCQ("Which 1967 Beatles album is widely celebrated as a transformative milestone in rock music for its studio experimentation and concept album format?", "Sgt. Pepper's Lonely Hearts Club Band", "Abbey Road", "Revolver", "Sgt. Pepper spent 27 weeks at number one in the UK and won four Grammy Awards, including the first Album of the Year for a rock record.", mcqIdx++));
  q.push(createMCQ("What famous pedestrian crossing in London was photographed for the cover of The Beatles' final recorded studio album in 1969?", "Abbey Road", "Carnaby Street", "Baker Street", "The iconic album cover shows the four Beatles walking across the zebra crossing outside EMI Studios, later renamed Abbey Road Studios.", mcqIdx++));
  q.push(createMCQ("Which record producer, often referred to as the Fifth Beatle, produced almost all of The Beatles' landmark studio recordings?", "George Martin", "Brian Epstein", "Phil Spector", "Sir George Martin's classical training and inventive orchestrations helped realize the complex musical visions of Lennon and McCartney.", mcqIdx++));
  q.push(createMCQ("On which legendary American television variety show did The Beatles make their breakthrough US live debut on 9 February 1964?", "The Ed Sullivan Show", "American Bandstand", "The Tonight Show", "An estimated 73 million viewers tuned in to watch The Beatles on Ed Sullivan, sparking the British Invasion across the United States.", mcqIdx++));
  q.push(createNumber("How many number-one hit singles did The Beatles achieve on the US Billboard Hot 100 chart, an all-time band record?", 20, "number-one hits", "20 chart-topping singles", "The Beatles hold the all-time record for the most Billboard Hot 100 number-one singles by any group, achieving 20 chart-toppers between 1964 and 1970."));

  // Cycle 2: Classic Rock Royalty
  q.push(createMCQ("Which legendary English rock band featured Robert Plant, Jimmy Page, John Paul Jones, and drummer John Bonham?", "Led Zeppelin", "Deep Purple", "Black Sabbath", "Formed in London in 1968, Led Zeppelin pioneered hard rock and heavy metal with epic tracks like Stairway to Heaven and Kashmir.", mcqIdx++));
  q.push(createMCQ("Which 1973 Pink Floyd conceptual masterpiece explored themes of greed, time, and mental illness, featuring a prism dispersing light on its cover?", "The Dark Side of the Moon", "The Wall", "Wish You Were Here", "Engineered by Alan Parsons at Abbey Road, The Dark Side of the Moon spent a record-breaking 741 consecutive weeks on the Billboard 200 chart.", mcqIdx++));
  q.push(createMCQ("Which flamboyant frontman and operatic vocalist led Queen, composing masterpieces such as Bohemian Rhapsody and We Are the Champions?", "Freddie Mercury", "Roger Daltrey", "Mick Jagger", "Freddie Mercury possessed an astonishing four-octave vocal range and captivated stadium audiences with his magnetic stage presence.", mcqIdx++));
  q.push(createMCQ("Which English rock band, fronted by Mick Jagger and guitarist Keith Richards, has performed continuously since 1962 with hits like Paint It Black?", "The Rolling Stones", "The Kinks", "The Animals", "Known as The Greatest Rock and Roll Band in the World, The Rolling Stones defined British blues-rock with albums like Sticky Fingers and Exile on Main St.", mcqIdx++));
  q.push(createMCQ("Which English band created the landmark 1969 rock opera Tommy and the stadium anthem Baba O'Riley?", "The Who", "Cream", "The Yardbirds", "The Who, featuring Pete Townshend, Roger Daltrey, John Entwistle, and Keith Moon, were renowned for high-energy concerts and instrument-smashing finales.", mcqIdx++));
  q.push(createNumber("In what year CE did Led Zeppelin release their landmark untitled fourth studio album, featuring Stairway to Heaven?", 1971, "CE", "November 1971", "Led Zeppelin IV was released on 8 November 1971, going on to sell over 37 million copies worldwide."));

  // Cycle 3: Guitar Gods & Virtuosos
  q.push(createMCQ("Which left-handed guitar wizard revolutionized electric guitar playing with his band The Jimi Hendrix Experience at Monterey and Woodstock?", "Jimi Hendrix", "Eric Clapton", "Jeff Beck", "Hendrix expanded the sonic palette of the electric guitar using controlled feedback, wah-wah pedals, and unprecedented expressive phrasing.", mcqIdx++));
  q.push(createMCQ("Which legendary guitarist was inducted into the Rock and Roll Hall of Fame three separate times: with The Yardbirds, Cream, and as a solo artist?", "Eric Clapton", "Jimmy Page", "David Gilmour", "Clapton earned the nickname Slowhand and created timeless classics including Layla, Crossroads, and Tears in Heaven.", mcqIdx++));
  q.push(createMCQ("Which virtuoso guitarist popularized two-handed tapping and revolutionized hard rock guitar technique with his 1978 instrumental Eruption?", "Eddie Van Halen", "Randy Rhoads", "Steve Vai", "Eddie Van Halen's blistering finger-tapping, custom Frankenstrat guitar, and innovative harmonic pinch squeals changed rock guitar forever.", mcqIdx++));
  q.push(createMCQ("Which Texas blues guitarist led the band Double Trouble and revitalized modern electric blues before his tragic death in 1990?", "Stevie Ray Vaughan", "Buddy Guy", "Johnny Winter", "Stevie Ray Vaughan blended searing speed with soulful blues phrasing on albums like Texas Flood and Couldn't Stand the Weather.", mcqIdx++));
  q.push(createMCQ("Which Pink Floyd lead guitarist performed the critically acclaimed emotional solos on Comfortably Numb and Shine On You Crazy Diamond?", "David Gilmour", "Syd Barrett", "Richard Wright", "David Gilmour's soaring tone, distinctive vibrato, and melodic elegance produced some of the most celebrated guitar solos in rock history.", mcqIdx++));
  q.push(createNumber("In what year CE did Jimi Hendrix perform his legendary distortion-laden rendition of The Star-Spangled Banner at the Woodstock Festival?", 1969, "CE", "August 1969", "Hendrix closed the Woodstock Festival on Monday morning, 18 August 1969, performing his radical sonic interpretation of the US national anthem."));

  // Cycle 4: Pop King & Queen
  q.push(createMCQ("Which legendary pop icon released Thriller in 1982, which became and remains the best-selling studio album in global music history?", "Michael Jackson", "Prince", "George Michael", "Produced by Quincy Jones, Thriller won eight Grammy Awards and featured smash hits Billie Jean, Beat It, and the revolutionary Thriller music video.", mcqIdx++));
  q.push(createMCQ("Which pop superstar, crowned the Queen of Pop, redefined music videos and live performance with hits like Like a Virgin and Vogue?", "Madonna", "Cyndi Lauper", "Janet Jackson", "Madonna is certified by Guinness World Records as the best-selling female recording artist of all time, with over 300 million records sold.", mcqIdx++));
  q.push(createMCQ("Which Minneapolis multi-instrumentalist genius wrote, produced, and performed the landmark 1984 film soundtrack album Purple Rain?", "Prince", "Stevie Wonder", "Rick James", "Prince played nearly all instruments on his records and effortlessly blended rock, funk, R&B, and synth-pop with flamboyant theatricality.", mcqIdx++));
  q.push(createMCQ("Which vocal powerhouse recorded the multi-platinum anthem I Will Always Love You for the 1992 film The Bodyguard?", "Whitney Houston", "Mariah Carey", "Celine Dion", "Whitney Houston's soaring performance of Dolly Parton's song spent 14 consecutive weeks at number one on the Billboard Hot 100.", mcqIdx++));
  q.push(createMCQ("Which chameleon-like British musical visionary created theatrical personas such as Ziggy Stardust, Aladdin Sane, and The Thin White Duke?", "David Bowie", "Elton John", "Marc Bolan", "David Bowie constantly reinvented his musical style across five decades, releasing groundbreaking albums like Space Oddity, Heroes, and Blackstar.", mcqIdx++));
  q.push(createNumber("Approximately how many million certified and estimated worldwide copies has Michael Jackson's Thriller album sold?", 70, "million copies", "approx. 70M sold", "Thriller remains the highest-selling album in music history, with estimated worldwide sales exceeding 70 million copies."));

  // Cycle 5: Heavy Metal & Hard Rock
  q.push(createMCQ("Which Birmingham band, featuring Ozzy Osbourne and Tony Iommi, is widely credited with inventing heavy metal with their 1970 self-titled debut?", "Black Sabbath", "Judas Priest", "Motorhead", "Tony Iommi's down-tuned, sinister guitar riffs and Sabbath's dark lyrical themes laid the foundational blueprint for all heavy metal subgenres.", mcqIdx++));
  q.push(createMCQ("Which Australian hard rock powerhouse recorded the massive-selling 1980 album Back in Black with new lead singer Brian Johnson?", "AC/DC", "INXS", "Midnight Oil", "Recorded after the tragic death of singer Bon Scott, Back in Black became one of the top three highest-selling albums in world history.", mcqIdx++));
  q.push(createMCQ("Which American band led the 1980s thrash metal movement, releasing the genre-defining 1986 album Master of Puppets?", "Metallica", "Megadeth", "Slayer", "Metallica's complex time signatures, aggressive speed, and James Hetfield's fierce vocals propelled them from underground thrash to global stadium headliners.", mcqIdx++));
  q.push(createMCQ("Which Los Angeles rock band achieved astronomical success with their 1987 debut album Appetite for Destruction, featuring Sweet Child o' Mine?", "Guns N' Roses", "Motley Crue", "Poison", "Fronted by Axl Rose with Slash on lead guitar, Appetite for Destruction sold over 30 million copies, making it the best-selling debut album in US history.", mcqIdx++));
  q.push(createMCQ("Which pioneering British heavy metal band created the iconic mascot Eddie and released anthems like The Number of the Beast and Run to the Hills?", "Iron Maiden", "Def Leppard", "Saxon", "Iron Maiden, fronted by powerhouse vocalist Bruce Dickinson, became a global touring titan renowned for intricate dual-guitar harmonies.", mcqIdx++));
  q.push(createNumber("In what year CE did Australian hard rock legends AC/DC release their landmark tribute album Back in Black?", 1980, "CE", "July 1980", "Back in Black was released on 25 July 1980, featuring timeless anthems Hells Bells, You Shook Me All Night Long, and the title track."));

  // Cycle 6: Punk & New Wave
  q.push(createMCQ("Which London punk band released the ferocious anti-establishment anthem God Save the Queen during Queen Elizabeth II's Silver Jubilee in 1977?", "Sex Pistols", "The Clash", "The Damned", "Managed by Malcolm McLaren and fronted by Johnny Rotten, the Sex Pistols ignited the British punk movement with their lone studio album.", mcqIdx++));
  q.push(createMCQ("Which politically charged British punk band blended punk with reggae, rockabilly, and ska on their landmark 1979 double album London Calling?", "The Clash", "The Jam", "Buzzcocks", "Fronted by Joe Strummer and Mick Jones, The Clash earned the nickname The Only Band That Matters for their passionate social commentary.", mcqIdx++));
  q.push(createMCQ("Which Queens, New York four-piece pioneered fast, stripped-down punk rock with three-chord anthems like Blitzkrieg Bop?", "Ramones", "Television", "Dead Boys", "Wearing leather jackets and ripped jeans, the Ramones standardized punk rock's high-tempo, no-frills formula during their 1970s CBGB performances.", mcqIdx++));
  q.push(createMCQ("Which American New Wave band, fronted by David Byrne, recorded the hit Psycho Killer and filmed the acclaimed 1984 concert movie Stop Making Sense?", "Talking Heads", "The Cars", "Devo", "Talking Heads combined art school sensibilities, post-punk rhythms, and world funk grooves under Byrne's eccentric and energetic leadership.", mcqIdx++));
  q.push(createMCQ("Which New York band fronted by Debbie Harry crossed over from punk to disco and pop stardom with hits like Heart of Glass and Call Me?", "Blondie", "The B-52's", "The Pretenders", "Blondie was a central fixture of the CBGB scene and achieved four Billboard Hot 100 number-one singles between 1979 and 1981.", mcqIdx++));
  q.push(createNumber("How many official studio albums did the English punk band Sex Pistols release before breaking up in 1978?", 1, "studio album", "1 official studio release", "The Sex Pistols released only one official studio album: Never Mind the Bollocks, Here's the Sex Pistols, issued in October 1977."));

  // Cycle 7: Grunge & 90s Alternative
  q.push(createMCQ("Which Seattle band fronted by Kurt Cobain brought grunge and alternative rock into the mainstream with their 1991 anthem Smells Like Teen Spirit?", "Nirvana", "Pearl Jam", "Soundgarden", "Nirvana's breakout album Nevermind knocked Michael Jackson's Dangerous off the top of the Billboard 200 chart in January 1992.", mcqIdx++));
  q.push(createMCQ("Which Seattle grunge band fronted by Eddie Vedder released the smash debut album Ten in 1991 featuring Alive and Jeremy?", "Pearl Jam", "Alice in Chains", "Stone Temple Pilots", "Ten remained on the Billboard charts for nearly five years, cementing Pearl Jam as one of the most resilient stadium rock bands in history.", mcqIdx++));
  q.push(createMCQ("Which British band led by Thom Yorke evolved from guitar rock on The Bends to experimental electronic art rock on OK Computer and Kid A?", "Radiohead", "Blur", "Oasis", "Radiohead's 1997 album OK Computer captured dystopian anxieties of the digital age and is frequently cited among the greatest albums ever recorded.", mcqIdx++));
  q.push(createMCQ("Which Manchester band led by brothers Liam and Noel Gallagher spearheaded Britpop with record-breaking albums Definitely Maybe and What's the Story Morning Glory?", "Oasis", "Pulp", "The Verve", "Oasis defined 1990s British youth culture, selling millions of copies and playing to 250,000 fans over two nights at Knebworth in 1996.", mcqIdx++));
  q.push(createMCQ("Which powerhouse vocalist fronted Soundgarden and Audioslave, renowned for his four-octave range and hits like Black Hole Sun?", "Chris Cornell", "Layne Staley", "Scott Weiland", "Chris Cornell was a towering figure in the Seattle grunge scene, celebrated for his raw vocal power and intricate songwriting.", mcqIdx++));
  q.push(createNumber("In what year CE did Nirvana release their game-changing multi-platinum sophomore album Nevermind?", 1991, "CE", "September 1991", "Nevermind was released on 24 September 1991 on DGC Records, igniting the global alternative rock explosion."));

  // Cycle 8: Legendary Live Concerts & Festivals
  q.push(createMCQ("Which monumental 1985 dual-venue charity concert organized by Bob Geldof raised millions for Ethiopian famine relief?", "Live Aid", "Live 8", "Farm Aid", "Held simultaneously at Wembley Stadium in London and JFK Stadium in Philadelphia, Live Aid featured historic performances by Queen, U2, and Led Zeppelin.", mcqIdx++));
  q.push(createMCQ("Which 1969 music festival in upstate New York drew over 400,000 young people under the banner of 3 Days of Peace & Music?", "Woodstock", "Monterey Pop Festival", "Altamont Free Concert", "Held on Max Yasgur's dairy farm in Bethel, New York, Woodstock became the defining countercultural event of the 1960s generation.", mcqIdx++));
  q.push(createMCQ("Which band's 20-minute set at Live Aid in July 1985 is widely voted the greatest live rock performance in television history?", "Queen", "The Who", "Dire Straits", "Freddie Mercury led the 72,000-strong Wembley crowd in synchronized vocal call-and-response during Bohemian Rhapsody and Radio Ga Ga.", mcqIdx++));
  q.push(createMCQ("Which 1967 California festival launched Jimi Hendrix and Janis Joplin to major stardom and was immortalized in song by Scott McKenzie?", "Monterey International Pop Festival", "Newport Folk Festival", "Isle of Wight Festival", "Monterey Pop set the template for modern multi-artist outdoor rock festivals and concluded with Hendrix famously setting his Stratocaster on fire.", mcqIdx++));
  q.push(createMCQ("In 1965, which folk hero caused a massive uproar at the Newport Folk Festival by performing with an electric backing band?", "Bob Dylan", "Joan Baez", "Pete Seeger", "Dylan's high-volume electric set alienated folk purists but marked a pivotal evolution that birthed the folk-rock genre.", mcqIdx++));
  q.push(createNumber("Approximately how many thousands of people attended the legendary three-day Woodstock Music & Art Fair in August 1969?", 400, "thousand people", "approx. 400K attendees", "Over 400,000 people converged on the festival grounds after organizers were forced to open the gates and declare it a free event."));

  // Cycle 9: Soul, Funk, Motown & R&B
  q.push(createMCQ("Which blind musical prodigy achieved phenomenal creative autonomy at Motown, releasing masterpieces Innervisions and Songs in the Key of Life?", "Stevie Wonder", "Ray Charles", "Marvin Gaye", "Stevie Wonder won Album of the Year Grammys for three consecutive album releases during his legendary 1970s classic period.", mcqIdx++));
  q.push(createMCQ("Which soul legend, crowned The Queen of Soul, demanded R-E-S-P-E-C-T and became the first woman inducted into the Rock and Roll Hall of Fame?", "Aretha Franklin", "Etta James", "Tina Turner", "Aretha Franklin recorded timeless gospel-infused anthems including Respect, Natural Woman, and Chain of Fools for Atlantic Records.", mcqIdx++));
  q.push(createMCQ("Which Motown icon addressed Vietnam, poverty, and ecological decay in his groundbreaking 1971 concept album What's Going On?", "Marvin Gaye", "Smokey Robinson", "Sam Cooke", "Marvin Gaye fought Motown founder Berry Gordy to release the socially conscious album, which became one of soul music's finest achievements.", mcqIdx++));
  q.push(createMCQ("Which dynamic showman, known as The Godfather of Soul, invented modern funk with grooves like Papa's Got a Brand New Bag and Get Up (I Feel Like Being a) Sex Machine?", "James Brown", "George Clinton", "Sly Stone", "James Brown's intense emphasis on the downbeat (on the one) laid the rhythmic foundations for funk, disco, and hip-hop music.", mcqIdx++));
  q.push(createMCQ("Which legendary Detroit record label was founded by Berry Gordy Jr. in 1959, known as Hitsville U.S.A.?", "Motown Records", "Stax Records", "Atlantic Records", "Motown introduced a polished soul sound that integrated Black artists into mainstream global pop charts with unparalleled success.", mcqIdx++));
  q.push(createNumber("How many competitive Grammy Awards has soul legend Stevie Wonder won throughout his illustrious career?", 25, "Grammy Awards", "25 Grammy wins", "Stevie Wonder has received 25 competitive Grammy Awards along with a Grammy Lifetime Achievement Award."));

  // Cycle 10: 21st Century Icons & Superlatives
  q.push(createMCQ("Which pop superstar broke all-time concert touring records between 2023 and 2024 with the multi-billion-dollar grossing Eras Tour?", "Taylor Swift", "Beyonce", "Adele", "Taylor Swift's career-spanning retrospective tour became the first concert tour in history to surpass one billion dollars in gross revenue.", mcqIdx++));
  q.push(createMCQ("Which British rock band, fronted by Chris Martin, became one of the biggest stadium acts of the 21st century with Yellow and Viva la Vida?", "Coldplay", "Muse", "The Killers", "Coldplay has sold over 100 million albums worldwide and pioneered immersive stadium experiences with synchronized LED wristbands.", mcqIdx++));
  q.push(createMCQ("Which Detroit rapper became the best-selling music artist of the 2000s in the US, with diamond-certified albums The Marshall Mathers LP and The Eminem Show?", "Eminem", "Jay-Z", "50 Cent", "Eminem (Marshall Mathers) achieved ten consecutive Billboard 200 number-one albums and won the Academy Award for Best Original Song for Lose Yourself.", mcqIdx++));
  q.push(createMCQ("Which artist holds the record for the most total Grammy Awards won in music history, surpassing conductor Georg Solti in 2023?", "Beyonce", "Alison Krauss", "Quincy Jones", "Beyonce has won an unprecedented 32 Grammy Awards across her solo career and her work with Destiny's Child.", mcqIdx++));
  q.push(createMCQ("Which 1975 six-minute rock opera epic by Queen became the most-streamed 20th-century song across Spotify and YouTube?", "Bohemian Rhapsody", "Stairway to Heaven", "Hotel California", "Bohemian Rhapsody features ballad, mock-operatic, and hard rock sections without a traditional chorus, surpassing billions of streams worldwide.", mcqIdx++));
  q.push(createNumber("What is the exact running duration in seconds of Queen's iconic 1975 masterwork Bohemian Rhapsody?", 354, "seconds", "5 minutes 54 seconds", "Bohemian Rhapsody runs exactly 5 minutes and 54 seconds (354 seconds), defying 1970s radio conventions that favored 3-minute singles."));

  return {
    id: "rock-music-pop-legends-60",
    theme: "Rock & Pop Music Legends: Iconic Bands & Master Albums",
    title: "Rock & Pop Music Legends: Iconic Bands & Master Albums",
    description: "A 60-question comprehensive journey through the British Invasion, Led Zeppelin, Pink Floyd, Queen, guitar virtuosos, the King of Pop, punk, grunge, Motown soul, and modern stadium record-breakers.",
    category: "Arts, Music, Literature & Philosophy",
    difficulty: "moderate",
    createdAt: "2026-08-27T00:00:00Z",
    questions: q
  };
}

// -------------------------------------------------------------
// QUIZ 3: world-literature-masterpieces-60
// -------------------------------------------------------------
function getWorldLiteratureQuiz() {
  let mcqIdx = 0;
  const q = [];

  // Cycle 1: Ancient & Classical Epics
  q.push(createMCQ("What ancient Mesopotamian epic poem carved on clay cuneiform tablets is widely regarded as human history's earliest surviving literary masterpiece?", "The Epic of Gilgamesh", "Enuma Elish", "The Descent of Inanna", "The Epic of Gilgamesh recounts the king of Uruk's quest for immortality and his friendship with the wild man Enkidu.", mcqIdx++));
  q.push(createMCQ("Which ancient Greek blind bard is credited with composing the monumental epic poems the Iliad and the Odyssey?", "Homer", "Hesiod", "Pindar", "Homer's dactylic hexameter epics chronicled the Trojan War and Odysseus's perilous ten-year journey home to Ithaca.", mcqIdx++));
  q.push(createMCQ("Which Latin poet wrote the epic Aeneid to celebrate the mythical origins of Rome through the Trojan hero Aeneas?", "Virgil", "Ovid", "Horace", "Commissioned during the reign of Augustus, Virgil's Aeneid bridged the Homeric legend of Troy with the founding of the Roman destiny.", mcqIdx++));
  q.push(createMCQ("Which colossal Sanskrit epic, containing over 100,000 verses, includes the philosophical spiritual dialogue known as the Bhagavad Gita?", "Mahabharata", "Ramayana", "Upanishads", "The Mahabharata, traditionally attributed to the sage Vyasa, is one of the longest epic poems ever composed in world literature.", mcqIdx++));
  q.push(createMCQ("In Homer's Odyssey, what was the name of Odysseus's faithful wife who wove and unwove a burial shroud to stall prospective suitors?", "Penelope", "Circe", "Calypso", "Penelope waited twenty years for Odysseus to return to Ithaca, demonstrating unmatched fidelity and cunning intelligence.", mcqIdx++));
  q.push(createNumber("How many traditional scrolls or books comprise Homer's epic poem the Iliad in classical Alexandrian editions?", 24, "books", "24 epic books", "Scholars at the Library of Alexandria divided both the Iliad and the Odyssey into exactly 24 books, corresponding to the 24 letters of the Greek alphabet."));

  // Cycle 2: Medieval & Early Modern Epics
  q.push(createMCQ("Which Florentine poet journeyed through Inferno, Purgatorio, and Paradiso guided by Virgil and Beatrice in The Divine Comedy?", "Dante Alighieri", "Giovanni Boccaccio", "Petrarch", "Dante composed The Divine Comedy in Italian vernacular using the intricate terza rima rhyme scheme between 1308 and 1320.", mcqIdx++));
  q.push(createMCQ("Which 14th-century English author wrote The Canterbury Tales, chronicling pilgrims traveling to the shrine of Thomas Becket?", "Geoffrey Chaucer", "William Langland", "John Gower", "Geoffrey Chaucer is known as the Father of English Literature for writing in Middle English rather than courtly French or Latin.", mcqIdx++));
  q.push(createMCQ("Which Spanish masterwork by Miguel de Cervantes depicts an idealistic nobleman tilting at windmills accompanied by his squire Sancho Panza?", "Don Quixote", "La Galatea", "Novelas ejemplares", "Published in two parts in 1605 and 1615, Don Quixote is widely recognized as the foundational text of the modern Western novel.", mcqIdx++));
  q.push(createMCQ("Which Italian collection of 100 novellas by Giovanni Boccaccio depicts ten young people sheltering from the Black Death in Florence?", "The Decameron", "The Heptameron", "Il Filostrato", "The Decameron provided a vivid portrait of 14th-century life and profoundly influenced later storytellers including Chaucer and Shakespeare.", mcqIdx++));
  q.push(createMCQ("Which 17th-century English poet wrote the epic blank-verse poem Paradise Lost to justify the ways of God to men?", "John Milton", "John Donne", "Andrew Marvell", "Milton dictated Paradise Lost while completely blind, portraying Lucifer's rebellion and the fall of Adam and Eve.", mcqIdx++));
  q.push(createNumber("How many total cantos make up Dante Alighieri's complete Divine Comedy across Inferno, Purgatorio, and Paradiso?", 100, "cantos", "1 introductory + 99 cantos", "The Divine Comedy comprises 1 introductory canto plus 33 cantos each in Inferno, Purgatorio, and Paradiso, totaling exactly 100 cantos."));

  // Cycle 3: William Shakespeare & Elizabethan Drama
  q.push(createMCQ("In which Shakespearean tragedy does the Prince of Denmark deliver the immortal soliloquy beginning To be, or not to be?", "Hamlet", "Macbeth", "King Lear", "Hamlet is Shakespeare's longest play, exploring themes of revenge, existential doubt, madness, and political corruption in Elsinore.", mcqIdx++));
  q.push(createMCQ("Which Scottish tragedy by Shakespeare is traditionally referred to by superstitious actors as The Scottish Play inside theaters?", "Macbeth", "Othello", "Julius Caesar", "The dark tragedy recounts the rise and bloody downfall of Lord Macbeth after hearing prophecies from three witches.", mcqIdx++));
  q.push(createMCQ("What famous Elizabethan playhouse on the south bank of the River Thames in London staged many of Shakespeare's greatest masterpieces?", "The Globe Theatre", "The Rose Theatre", "The Swan", "Built in 1599 by Shakespeare's playing company, the Lord Chamberlain's Men, the Globe burned down in 1613 and was reconstructed in 1997.", mcqIdx++));
  q.push(createMCQ("In Shakespeare's Romeo and Juliet, what are the names of the two feuding noble households in Verona?", "Capulets and Montagues", "Yorks and Lancasters", "Medicis and Pazzis", "The tragic romance explores star-crossed lovers from the rival Montague and Capulet dynasties.", mcqIdx++));
  q.push(createMCQ("Which Shakespearean tragedy depicts an aging British king who divides his realm among his three daughters based on flattery?", "King Lear", "Cymbeline", "The Winter's Tale", "King Lear is betrayed by his flattering elder daughters Goneril and Regan while banishing his genuinely devoted daughter Cordelia.", mcqIdx++));
  q.push(createNumber("How many sonnets did William Shakespeare publish in his famous 1609 collection printed by Thomas Thorpe?", 154, "sonnets", "154 numbered sonnets", "Shakespeare's 1609 quarto contained exactly 154 sonnets exploring themes of love, time, beauty, the Fair Youth, and the Dark Lady."));

  // Cycle 4: 19th Century European Giants
  q.push(createMCQ("Which French literary master wrote the epic social novel Les Miserables and the gothic romance The Hunchback of Notre-Dame?", "Victor Hugo", "Honore de Balzac", "Emile Zola", "Hugo was a towering intellectual whose Les Miserables exposed poverty and injustice in 19th-century France through the redemption of Jean Valjean.", mcqIdx++));
  q.push(createMCQ("Which Russian titan penned the monumental historical epic War and Peace and the tragic romance Anna Karenina?", "Leo Tolstoy", "Ivan Turgenev", "Nikolai Gogol", "Count Leo Tolstoy depicted the 1812 Napoleonic invasion of Russia across sweeping aristocratic panoramas and philosophical essays.", mcqIdx++));
  q.push(createMCQ("Which Russian psychological novelist wrote Crime and Punishment, exploring the moral torment of student Rodion Raskolnikov?", "Fyodor Dostoevsky", "Anton Chekhov", "Mikhail Lermontov", "Dostoevsky examined guilt, redemption, and nihilism after Raskolnikov murders a greedy pawnbroker in Saint Petersburg.", mcqIdx++));
  q.push(createMCQ("Which Victorian novelist created enduring characters including Ebenezer Scrooge, Oliver Twist, Pip, and David Copperfield?", "Charles Dickens", "William Makepeace Thackeray", "Anthony Trollope", "Dickens utilized serial publication to expose the cruel social realities of Victorian industrial London while entertaining millions of readers.", mcqIdx++));
  q.push(createMCQ("Which French realism pioneer wrote Madame Bovary in 1856, leading to a sensational obscenity trial before its widespread acclaim?", "Gustave Flaubert", "Guy de Maupassant", "Stendhal", "Flaubert spent years obsessively seeking le mot juste (the exact right word) to depict Emma Bovary's tragic romantic disillusionment.", mcqIdx++));
  q.push(createNumber("In what year CE did Leo Tolstoy complete and publish the final serialized volume of War and Peace?", 1869, "CE", "1869 publication", "War and Peace was published in its complete book form in 1869 after appearing in serial form in The Russian Messenger starting in 1865."));

  // Cycle 5: Romanticism & Gothic Masterpieces
  q.push(createMCQ("Which 19-year-old English author created the science fiction and gothic masterpiece Frankenstein during the rainy summer of 1816?", "Mary Shelley", "Jane Austen", "Charlotte Bronte", "Mary Shelley conceived Frankenstein (The Modern Prometheus) during a ghost-story writing contest at Lake Geneva with Lord Byron and Percy Bysshe Shelley.", mcqIdx++));
  q.push(createMCQ("Which Irish author published the epistolary gothic vampire novel Dracula in 1897, introducing Count Dracula and Professor Van Helsing?", "Bram Stoker", "Sheridan Le Fanu", "Oscar Wilde", "Stoker drew upon folklore and historical accounts of Vlad the Impaler to create the archetypal vampire of modern literature.", mcqIdx++));
  q.push(createMCQ("Which American master of gothic horror and detective fiction penned The Raven, The Tell-Tale Heart, and The Fall of the House of Usher?", "Edgar Allan Poe", "Nathaniel Hawthorne", "Washington Irving", "Poe is recognized as the architect of the modern short story and the inventor of the detective fiction genre with The Murders in the Rue Morgue.", mcqIdx++));
  q.push(createMCQ("Which English author, writing under the male pen name Currer Bell, published the landmark Victorian romance Jane Eyre in 1847?", "Charlotte Bronte", "Emily Bronte", "Anne Bronte", "Jane Eyre challenged Victorian conventions through its fierce, independent heroine and her stormy relationship with Mr. Rochester.", mcqIdx++));
  q.push(createMCQ("Which German polymath and literary giant wrote the two-part poetic drama Faust, depicting a scholar who trades his soul to Mephistopheles?", "Johann Wolfgang von Goethe", "Friedrich Schiller", "Heinrich Heine", "Goethe worked on Faust across six decades, creating the supreme masterpiece of German literature and Romantic philosophy.", mcqIdx++));
  q.push(createNumber("In what year CE was Mary Shelley's landmark novel Frankenstein; or, The Modern Prometheus first published anonymously in London?", 1818, "CE", "January 1818", "Frankenstein was first published anonymously on 1 January 1818 in a small print run of 500 copies by Lackington, Hughes, Harding, Mavor & Jones."));

  // Cycle 6: 20th Century Modernism
  q.push(createMCQ("Which Irish author published the monumental modernist novel Ulysses in 1922, following Leopold Bloom across Dublin on 16 June 1904?", "James Joyce", "Samuel Beckett", "W.B. Yeats", "Ulysses revolutionized stream-of-consciousness narrative technique, with 16 June now celebrated worldwide as Bloomsday.", mcqIdx++));
  q.push(createMCQ("Which French author wrote the monumental seven-volume modernist novel In Search of Lost Time, sparked by the taste of a madeleine dipped in tea?", "Marcel Proust", "Andre Gide", "Paul Valery", "Proust's In Search of Lost Time (A la recherche du temps perdu) spans over 4,200 pages exploring memory, time, art, and Parisian aristocracy.", mcqIdx++));
  q.push(createMCQ("In Franz Kafka's 1915 novella The Metamorphosis, what does traveling salesman Gregor Samsa awaken to find himself transformed into?", "A monstrous insect", "A rabid wolf", "A stone statue", "Kafka's surreal allegory opens: As Gregor Samsa awoke one morning from uneasy dreams, he found himself transformed in his bed into a monstrous insect.", mcqIdx++));
  q.push(createMCQ("Which English modernist pioneer wrote Mrs Dalloway and To the Lighthouse, pioneering feminist literary criticism in A Room of One's Own?", "Virginia Woolf", "E.M. Forster", "Katherine Mansfield", "Virginia Woolf was a central figure of the Bloomsbury Group who pioneered innovative interior monologues and temporal structures.", mcqIdx++));
  q.push(createMCQ("Which American-born British poet published the landmark 1922 modernist poem The Waste Land, opening with April is the cruellest month?", "T.S. Eliot", "Ezra Pound", "W.H. Auden", "T.S. Eliot captured post-World War I spiritual disillusionment through fragmented polyglot allusions, earning the 1948 Nobel Prize in Literature.", mcqIdx++));
  q.push(createNumber("How many distinct volumes make up Marcel Proust's masterwork In Search of Lost Time?", 7, "volumes", "7 monumental volumes", "Proust's masterpiece consists of 7 volumes published between 1913 and 1927, certified as one of the longest novels in world history."));

  // Cycle 7: American Literary Titans
  q.push(createMCQ("Which American author captured the Jazz Age and the tragic illusion of the American Dream in his 1925 novel The Great Gatsby?", "F. Scott Fitzgerald", "Ernest Hemingway", "John Dos Passos", "The Great Gatsby portrays the mysterious millionaire Jay Gatsby and his obsessive pursuit of Daisy Buchanan across Long Island Sound.", mcqIdx++));
  q.push(createMCQ("Which Nobel Prize-winning American author developed the iceberg theory of writing in works like The Old Man and the Sea and The Sun Also Rises?", "Ernest Hemingway", "William Faulkner", "John Steinbeck", "Hemingway's concise, understated prose stripped away extraneous adjectives, profoundly influencing 20th-century English writing style.", mcqIdx++));
  q.push(createMCQ("Which Mississippi author created the fictional Yoknapatawpha County for Southern Gothic masterpieces like The Sound and the Fury and As I Lay Dying?", "William Faulkner", "Flannery O'Connor", "Tennessee Williams", "Faulkner won the 1949 Nobel Prize in Literature for his intricate stream-of-consciousness explorations of Southern history and family decay.", mcqIdx++));
  q.push(createMCQ("Which 1851 Herman Melville epic novel follows Captain Ahab's monomaniacal quest for revenge against a giant white sperm whale?", "Moby-Dick", "Billy Budd", "Typee", "Opening with the famous line Call me Ishmael, Moby-Dick combines whaling documentary, Shakespearean tragedy, and metaphysical symbolism.", mcqIdx++));
  q.push(createMCQ("Which John Steinbeck masterpiece chronicled the harrowing Dust Bowl migration of the Joad family from Oklahoma to California during the Great Depression?", "The Grapes of Wrath", "East of Eden", "Of Mice and Men", "The Grapes of Wrath won the Pulitzer Prize in 1940 and galvanized national attention toward the plight of migrant farm workers.", mcqIdx++));
  q.push(createNumber("In what year CE was F. Scott Fitzgerald's celebrated novel The Great Gatsby published by Charles Scribner's Sons?", 1925, "CE", "April 1925", "The Great Gatsby was published on 10 April 1925, initially meeting modest commercial sales before achieving status as a great American classic."));

  // Cycle 8: Magic Realism & Global Giants
  q.push(createMCQ("Which Colombian Nobel laureate pioneered magic realism in his epic saga of the Buendia family in the mythical town of Macondo, One Hundred Years of Solitude?", "Gabriel Garcia Marquez", "Mario Vargas Llosa", "Carlos Fuentes", "Garcia Marquez's 1967 masterpiece One Hundred Years of Solitude became a cornerstone of the Latin American literary boom.", mcqIdx++));
  q.push(createMCQ("Which blind Argentine master wrote labyrinthine, metaphysical short stories collected in Ficciones and The Aleph?", "Jorge Luis Borges", "Julio Cortazar", "Adolfo Bioy Casares", "Borges explored philosophical paradoxes, infinity, libraries, and mirrors, exerting vast influence on postmodern literature.", mcqIdx++));
  q.push(createMCQ("Which Nigerian author wrote the landmark 1958 post-colonial African novel Things Fall Apart, portraying Okonkwo in an Igbo village?", "Chinua Achebe", "Wole Soyinka", "Ben Okri", "Things Fall Apart countered colonial stereotypes and became the most widely read book in modern African literature.", mcqIdx++));
  q.push(createMCQ("Which Japanese author blended surrealism and contemporary alienation in novels such as Norwegian Wood, Kafka on the Shore, and 1Q84?", "Haruki Murakami", "Yukio Mishima", "Kenzaburo Oe", "Murakami's evocative prose frequently incorporates jazz music, cats, parallel realities, and melancholic protagonists.", mcqIdx++));
  q.push(createMCQ("Which Egyptian author became the first Arabic-language writer to win the Nobel Prize in Literature in 1988, famous for The Cairo Trilogy?", "Naguib Mahfouz", "Taha Hussein", "Tawfiq al-Hakim", "Mahfouz chronicled the social, political, and religious shifts of Egyptian life across generations in historic Cairo neighborhoods.", mcqIdx++));
  q.push(createNumber("In what year CE did Gabriel Garcia Marquez publish his landmark novel One Hundred Years of Solitude in Buenos Aires?", 1967, "CE", "May 1967", "Cien anos de soledad was published in May 1967 by Editorial Sudamericana, selling out its initial print run of 8,000 copies in days."));

  // Cycle 9: Dystopian & Speculative Visions
  q.push(createMCQ("Which English author wrote the chilling dystopian warning 1984, introducing Big Brother, Thoughtcrime, and Newspeak?", "George Orwell", "Aldous Huxley", "Arthur Koestler", "George Orwell (Eric Arthur Blair) also wrote the political allegorical novella Animal Farm criticizing totalitarianism.", mcqIdx++));
  q.push(createMCQ("Which 1932 dystopian novel by Aldous Huxley depicted a technologically engineered society conditioned by Soma and the World State?", "Brave New World", "Island", "We", "Huxley warned of a totalitarian state that controlled populations through engineered pleasure, mass consumerism, and biological caste systems.", mcqIdx++));
  q.push(createMCQ("Which Ray Bradbury sci-fi classic depicts a future society where books are outlawed and firemen burn any that are found?", "Fahrenheit 451", "The Martian Chronicles", "Something Wicked This Way Comes", "Fahrenheit 451 follows Guy Montag, a book-burning fireman who rebels after discovering the transformative power of literature.", mcqIdx++));
  q.push(createMCQ("Which Canadian author wrote the 1985 dystopian novel The Handmaid's Tale, set in the totalitarian theocracy of the Republic of Gilead?", "Margaret Atwood", "Alice Munro", "Carol Shields", "Atwood's speculative novel explores state subjugation of women's bodies, identity, and civil liberties in a fundamentalist regime.", mcqIdx++));
  q.push(createMCQ("Which visionary sci-fi author wrote Do Androids Dream of Electric Sheep?, which inspired Ridley Scott's film Blade Runner?", "Philip K. Dick", "Isaac Asimov", "Arthur C. Clarke", "Philip K. Dick's stories questioned the nature of reality, artificial intelligence, and human empathy in cyberpunk futures.", mcqIdx++));
  q.push(createNumber("At what temperature in degrees Fahrenheit does book paper auto-ignite according to the title of Ray Bradbury's classic novel?", 451, "degrees Fahrenheit", "451 °F", "Bradbury chose the title Fahrenheit 451 based on the physical temperature at which standard book paper ignites and burns."));

  // Cycle 10: Nobel Laureates & Theatrical Giants
  q.push(createMCQ("Which French-Algerian existentialist author wrote The Stranger and The Myth of Sisyphus, winning the Nobel Prize in Literature in 1957?", "Albert Camus", "Jean-Paul Sartre", "Andre Malraux", "Camus developed the philosophy of the Absurd, illustrating human determination to find meaning in a silent universe.", mcqIdx++));
  q.push(createMCQ("Which American author won the 1993 Nobel Prize in Literature for masterworks exploring African American history, including Beloved and Song of Solomon?", "Toni Morrison", "Alice Walker", "Maya Angelou", "Toni Morrison became the first Black woman of any nationality to win the Nobel Prize in Literature for her visionary language and historical depth.", mcqIdx++));
  q.push(createMCQ("Which Irish playwright wrote the absurdist landmark Waiting for Godot, in which Vladimir and Estragon wait endlessly for an arrival?", "Samuel Beckett", "George Bernard Shaw", "Sean O'Casey", "Beckett won the 1969 Nobel Prize in Literature for minimalist dramatic works that stripped away theatrical excess to expose human vulnerability.", mcqIdx++));
  q.push(createMCQ("Which Indian polymath and poet wrote Gitanjali, becoming the first non-European to win the Nobel Prize in Literature in 1913?", "Rabindranath Tagore", "R.K. Narayan", "Sri Aurobindo", "Tagore reshaped Bengali literature and music, composing the national anthems of both India and Bangladesh.", mcqIdx++));
  q.push(createMCQ("Which Japanese author was awarded the Nobel Prize in Literature in 1968 for poetic masterworks including Snow Country and Thousand Cranes?", "Yasunari Kawabata", "Kenzaburo Oe", "Natsume Soseki", "Kawabata was praised by the Nobel Committee for his narrative mastery, which with great sensibility expresses the essence of the Japanese mind.", mcqIdx++));
  q.push(createNumber("At what young age in years did Rudyard Kipling win the Nobel Prize in Literature in 1907, remaining the youngest literature laureate in history?", 41, "years old", "41 years of age", "Rudyard Kipling was awarded the Nobel Prize in Literature at age 41 in 1907, a record for youth that remains unbroken over a century later."));

  return {
    id: "world-literature-masterpieces-60",
    theme: "World Literature: Epic Novels, Playwrights & Masterpieces",
    title: "World Literature: Epic Novels, Playwrights & Masterpieces",
    description: "A 60-question grand master assessment on ancient epics, Dante, Shakespearean tragedy, 19th-century European giants, gothic masterworks, modernism, American classics, magic realism, and Nobel laureates.",
    category: "Arts, Music, Literature & Philosophy",
    difficulty: "moderate",
    createdAt: "2026-08-27T00:00:00Z",
    questions: q
  };
}

// -------------------------------------------------------------
// QUIZ 4: world-mythology-legends-60
// -------------------------------------------------------------
function getWorldMythologyQuiz() {
  let mcqIdx = 0;
  const q = [];

  // Cycle 1: Greek Olympians & Primordials
  q.push(createMCQ("Who was the king of the Olympian gods, ruler of Mount Olympus, and wielder of the thunderbolt in Greek mythology?", "Zeus", "Poseidon", "Hades", "Zeus overthrew his father Cronus and the Titans, drawing lots with his brothers Poseidon and Hades to rule the sky and heavens.", mcqIdx++));
  q.push(createMCQ("Which Greek goddess of wisdom, warfare, and handicraft was born fully armed from the forehead of Zeus?", "Athena", "Artemis", "Aphrodite", "Athena served as the patron deity of Athens after winning a contest against Poseidon by gifting the city an olive tree.", mcqIdx++));
  q.push(createMCQ("Which Olympian god presided over the sea, earthquakes, and horses, carrying a three-pronged trident?", "Poseidon", "Ares", "Hermes", "Poseidon was known to sailors as the Earth-Shaker, capable of stirring devastating sea storms or calming violent waters.", mcqIdx++));
  q.push(createMCQ("Who was the Greek god of music, poetry, prophecy, light, and healing, whose primary oracle resided at Delphi?", "Apollo", "Dionysus", "Hephaestus", "Apollo drove his sun chariot across the sky and communicated prophecies through the Pythia priestess at Delphi.", mcqIdx++));
  q.push(createMCQ("Which Greek goddess of love, beauty, and desire was born from the white sea foam near Cyprus?", "Aphrodite", "Hera", "Demeter", "Aphrodite was wed to the blacksmith god Hephaestus but maintained a famous romantic liaison with Ares, the god of war.", mcqIdx++));
  q.push(createNumber("How many major divine beings traditionally made up the Twelve Olympians who resided atop Mount Olympus?", 12, "deities", "12 major Olympians", "The classic Greek pantheon centered on the Dodekatheon: twelve supreme gods presiding atop Mount Olympus."));

  // Cycle 2: Greek Heroes & Quests
  q.push(createMCQ("Which demigod son of Zeus was condemned to complete Twelve Labors as penance for a fit of madness induced by Hera?", "Heracles", "Perseus", "Theseus", "Heracles (Hercules) performed legendary feats including slaying the Nemean Lion, the Lernaean Hydra, and capturing Cerberus.", mcqIdx++));
  q.push(createMCQ("Which Greek hero used a mirrored bronze shield from Athena to safely slay the snake-haired Gorgon Medusa?", "Perseus", "Bellerophon", "Jason", "Perseus avoided Medusa's petrifying gaze by viewing her reflection in his polished shield, later using her head to save Andromeda.", mcqIdx++));
  q.push(createMCQ("Which Athenian hero entered the Cretan Labyrinth and defeated the half-man, half-bull Minotaur using Ariadne's thread?", "Theseus", "Achilles", "Daedalus", "Theseus navigated King Minos's labyrinth by following a ball of golden thread given to him by the Cretan princess Ariadne.", mcqIdx++));
  q.push(createMCQ("Which hero led the Argonauts aboard the ship Argo on a perilous quest to Colchis to retrieve the Golden Fleece?", "Jason", "Orpheus", "Castor", "Jason secured the Golden Fleece with the aid of the sorceress princess Medea, who fell deeply in love with him.", mcqIdx++));
  q.push(createMCQ("Which invincible Greek warrior in the Trojan War was invulnerable everywhere except his heel, where his mother held him while dipping him in the River Styx?", "Achilles", "Ajax", "Patroclus", "The sea nymph Thetis dipped infant Achilles in the River Styx, leaving his heel unprotected, where he was fatally struck by Paris's arrow.", mcqIdx++));
  q.push(createNumber("How many impossible heroic labors was the Greek demigod Heracles commanded to complete for King Eurystheus?", 12, "labors", "The Twelve Labors", "Heracles completed exactly 12 heroic labors over a twelve-year period, culminating in dragging the three-headed dog Cerberus from the Underworld."));

  // Cycle 3: Norse Gods of Asgard
  q.push(createMCQ("Who was the Allfather of the Norse gods, who sacrificed an eye at Mimir's well to gain supreme cosmic wisdom?", "Odin", "Thor", "Tyr", "Odin ruled Asgard accompanied by his ravens Huginn (Thought) and Muninn (Memory) and his wolves Geri and Freki.", mcqIdx++));
  q.push(createMCQ("Which red-bearded Norse god of thunder defended Asgard and Midgard wielding his enchanted war hammer Mjolnir?", "Thor", "Loki", "Balder", "Thor rode across the heavens in a chariot pulled by two goats, Tanngrisnir and Tanngnjostr, summoning thunder and lightning.", mcqIdx++));
  q.push(createMCQ("Which Norse trickster god was the blood-brother of Odin and the father of the monstrous wolf Fenrir and the sea serpent Jormungandr?", "Loki", "Heimdall", "Bragi", "Loki possessed shapeshifting powers and orchestrated the death of the beloved god Baldr using a dart of mistletoe.", mcqIdx++));
  q.push(createMCQ("What is the name of the colossal ash tree that supports and connects the Nine Realms in Norse cosmology?", "Yggdrasil", "Gjallarhorn", "Bifrost", "The World Tree Yggdrasil has roots extending to Niflheim, Jotunheim, and Asgard, constantly gnawed by the dragon Nidhogg.", mcqIdx++));
  q.push(createMCQ("What is the glowing rainbow bridge guarded by the watchman god Heimdall that connects Midgard (Earth) to Asgard (realm of gods)?", "Bifrost", "Valhalla", "Helheim", "Heimdall stood eternal vigil at the base of Bifrost, possessing hearing so acute he could hear grass grow and wool grow on sheep.", mcqIdx++));
  q.push(createNumber("How many distinct cosmic realms are held together by the branches and roots of the Norse World Tree Yggdrasil?", 9, "realms", "The Nine Realms", "Norse cosmology details exactly Nine Realms, including Asgard, Midgard, Jotunheim, Vanaheim, Alfheim, Svartalfheim, Helheim, Niflheim, and Muspelheim."));

  // Cycle 4: Ragnarok & Norse Superlatives
  q.push(createMCQ("In Norse mythology, what is the prophesied twilight of the gods and apocalyptic battle that results in the destruction and rebirth of the cosmos?", "Ragnarok", "Fimbulwinter", "Valhalla", "Ragnarok involves catastrophic battles between gods and monsters, the burning of the cosmos by Surtr, and subsequent renewal of the world.", mcqIdx++));
  q.push(createMCQ("Which gigantic monstrous wolf, offspring of Loki, is destined to break free from his magical fetters and swallow Odin during Ragnarok?", "Fenrir", "Skoll", "Hati", "The gods bound Fenrir using the magical silk ribbon Gleipnir, during which the god Tyr sacrificed his right hand in the wolf's jaws.", mcqIdx++));
  q.push(createMCQ("What is the name of the grand hall in Asgard where fallen warriors (Einherjar) feast with Odin until called to battle at Ragnarok?", "Valhalla", "Folkvangr", "Bilskirnir", "Valkyries flew across battlefields choosing the bravest fallen slain warriors to bring to Valhalla's 540 doors.", mcqIdx++));
  q.push(createMCQ("Which beloved, shining Norse god of light and purity was made invulnerable to all things on Earth except mistletoe?", "Baldr", "Hodr", "Vidar", "Baldr's mother Frigg extracted oaths from every creature and plant not to harm him, but overlooked humble mistletoe.", mcqIdx++));
  q.push(createMCQ("What massive midgard serpent encircles the entire world, grasping its own tail until it clashes with Thor at Ragnarok?", "Jormungandr", "Nidhogg", "Fafnir", "In their final battle at Ragnarok, Thor slays Jormungandr but takes only nine steps before collapsing from the serpent's lethal venom.", mcqIdx++));
  q.push(createNumber("How many legs did Odin's magical gray steed Sleipnir possess, allowing him to gallop across air, land, and sea?", 8, "legs", "8-legged magical steed", "Sleipnir, born of Loki, was the swiftest horse in the Nine Realms, distinguished by his eight sturdy legs and runes carved on his teeth."));

  // Cycle 5: Egyptian Pantheon & Underworld
  q.push(createMCQ("Who was the ancient Egyptian sun god who sailed through the sky by day and traversed the perilous underworld by night in a solar bark?", "Ra", "Amun", "Ptah", "Ra was revered as the supreme creator and King of the Gods, often merging with Amun as Amun-Ra in the New Kingdom.", mcqIdx++));
  q.push(createMCQ("Which Egyptian god of the underworld and resurrection was murdered and dismembered by his jealous brother Set?", "Osiris", "Horus", "Anubis", "Osiris was reconstructed by his devoted wife Isis and became the eternal Lord of the Duat and judge of departed souls.", mcqIdx++));
  q.push(createMCQ("Which jackal-headed Egyptian deity presided over mummification, embalming, and guiding souls to the Hall of Judgment?", "Anubis", "Thoth", "Sobek", "Anubis supervised the Weighing of the Heart against the Feather of Maat to determine if a deceased soul was worthy of the afterlife.", mcqIdx++));
  q.push(createMCQ("Which falcon-headed Egyptian god of kingship and the sky fought Set to avenge his father Osiris, sacrificing his left eye in the battle?", "Horus", "Khonsu", "Ra-Horakhty", "The restored Eye of Horus (Wedjat) became Egypt's most potent protective amulet symbolizing healing, wholeness, and royal power.", mcqIdx++));
  q.push(createMCQ("Which ibis-headed Egyptian deity was the god of wisdom, writing, magic, and the moon, who recorded judgment in the underworld?", "Thoth", "Ptah", "Khepri", "Thoth was credited with inventing hieroglyphs and served as the celestial scribe and mediator among the gods.", mcqIdx++));
  q.push(createNumber("In the Egyptian Hall of Two Truths, how many divine Assessors of Maat evaluated the deceased soul's negative confessions?", 42, "assessors", "42 divine judges", "The Book of the Dead specifies exactly 42 divine judges to whom the deceased had to declare innocence of 42 specific sins."));

  // Cycle 6: Mesopotamian & Sumerian Lore
  q.push(createMCQ("In the Epic of Gilgamesh, which wild man created from clay by the goddess Aruru became Gilgamesh's beloved companion?", "Enkidu", "Utnapishtim", "Dumuzi", "Enkidu lived among wild beasts until civilized by Shamhat; his eventual death prompted Gilgamesh's desperate quest for immortality.", mcqIdx++));
  q.push(createMCQ("Which powerful Mesopotamian goddess of love, beauty, fertility, and warfare descended into the Netherworld to confront her sister Ereshkigal?", "Ishtar", "Ninhursag", "Ereshkigal", "Known as Inanna in Sumerian, Ishtar passed through seven gates of the underworld, relinquishing a garment or jewel at each gate.", mcqIdx++));
  q.push(createMCQ("In the Babylonian creation epic Enuma Elish, which patron god of Babylon defeated the primordial chaos dragon Tiamat?", "Marduk", "Enlil", "Ea", "Marduk split Tiamat's corpse in half, using one half to form the heavens and the other half to construct the earth.", mcqIdx++));
  q.push(createMCQ("Which Mesopotamian flood hero survived the global deluge by building a massive wooden ark on the advice of the god Ea?", "Utnapishtim", "Atrahasis", "Ziusudra", "Utnapishtim and his wife were granted eternal life by the gods, later meeting Gilgamesh to explain the impossibility of escaping death.", mcqIdx++));
  q.push(createMCQ("Which fierce guardian monster of the Cedar Forest was slain by Gilgamesh and Enkidu with the help of the sun god Shamash?", "Humbaba", "Gugalanna", "Anzu", "Humbaba (Huwawa) guarded the sacred pine and cedar forests of the gods until defeated in combat by the two heroes.", mcqIdx++));
  q.push(createNumber("How many cuneiform clay tablets comprised the standard canonical Babylonian edition of the Epic of Gilgamesh recorded by Sin-leqi-unninni?", 12, "tablets", "12 cuneiform tablets", "The standard Babylonian text of the Epic of Gilgamesh was inscribed across twelve large clay tablets found in Ashurbanipal's library in Nineveh."));

  // Cycle 7: Celtic & Arthurian Lore
  q.push(createMCQ("What legendary magical sword was presented to King Arthur by the mysterious Lady of the Lake?", "Excalibur", "Caladbolg", "Clarent", "Excalibur possessed a scabbard that prevented its bearer from losing blood in battle, symbolizing Arthur's rightful sovereignty.", mcqIdx++));
  q.push(createMCQ("Which enigmatic wizard, prophet, and advisor engineered the conception and reign of King Arthur in British mythology?", "Merlin", "Taliesin", "Morgause", "Merlin placed young Arthur under the care of Sir Ector and orchestrated the Sword in the Stone test of kingship.", mcqIdx++));
  q.push(createMCQ("In Irish mythology, which demigod warrior of Ulster possessed a terrifying battle-frenzy (warp spasm) and wielded the barbed spear Gae Bulg?", "Cu Chulainn", "Fionn mac Cumhaill", "Oisin", "Cu Chulainn single-handedly defended Ulster against the armies of Queen Medb of Connacht in the epic Cattle Raid of Cooley (Tain Bo Cuailnge).", mcqIdx++));
  q.push(createMCQ("Which mythological supernatural race of deities ruled ancient Ireland before retreating into fairy mounds (sidhe) upon the arrival of the Milesians?", "Tuatha De Danann", "Fomorians", "Fir Bolg", "The Tuatha De Danann (People of the Goddess Danu) possessed magical treasures including the Stone of Destiny and the Cauldron of the Dagda.", mcqIdx++));
  q.push(createMCQ("Which legendary Irish leader of the Fianna warrior band gained all the world's wisdom by accidentally tasting the Salmon of Knowledge?", "Fionn mac Cumhaill", "Diarmuid Ua Duibhne", "Cormac mac Airt", "Fionn burned his thumb on the cooking salmon and instinctively sucked it, instantly receiving all universal knowledge and foresight.", mcqIdx++));
  q.push(createNumber("How many legendary major battles against Saxon invaders was King Arthur recorded as winning in Nennius's 9th-century Historia Brittonum?", 12, "battles", "12 historic battles", "Nennius's medieval chronicle attributes exactly twelve victorious battles to Arthur as dux bellorum, culminating in Mount Badon."));

  // Cycle 8: Hindu Deities & Epics
  q.push(createMCQ("Which three supreme deities comprise the Hindu Trimurti, responsible for the cosmic creation, preservation, and destruction of the universe?", "Brahma, Vishnu, and Shiva", "Indra, Agni, and Varuna", "Rama, Krishna, and Ganesha", "In the Trimurti, Brahma functions as the Creator, Vishnu as the Preserver who incarnates to restore Dharma, and Shiva as the Destroyer/Transformer.", mcqIdx++));
  q.push(createMCQ("Which elephant-headed Hindu deity is universally revered as the remover of obstacles, patron of arts and sciences, and master of intellect?", "Ganesha", "Kartikeya", "Hanuman", "Ganesha, the son of Shiva and Parvati, is invoked at the beginning of all Hindu prayers, journeys, rituals, and new enterprises.", mcqIdx++));
  q.push(createMCQ("Which avatar of Vishnu is the hero of the ancient epic Ramayana, who rescues his devoted wife Sita from the demon king Ravana of Lanka?", "Rama", "Krishna", "Narasimha", "Lord Rama exemplifies righteous duty (dharma), assisted in the war against Ravana by the devoted monkey warrior Hanuman and his vanara army.", mcqIdx++));
  q.push(createMCQ("Which divine avatar of Vishnu serves as Prince Arjuna's charioteer and spiritual counselor on the battlefield of Kurukshetra in the Bhagavad Gita?", "Krishna", "Parashurama", "Kalki", "Krishna delivers the immortal teachings on duty, yoga, devotion (bhakti), and the eternal nature of the soul to the conflicted Arjuna.", mcqIdx++));
  q.push(createMCQ("Which fierce Hindu goddess, associated with time, destruction, and divine power, is depicted with a necklace of skulls and protruding tongue?", "Kali", "Durga", "Saraswati", "Kali represents the ultimate transformative power of time (Kala), vanquishing demonic forces that threaten cosmic balance.", mcqIdx++));
  q.push(createNumber("How many primary canonical incarnations (Dashavatara) of Lord Vishnu are recognized in mainstream Hindu tradition?", 10, "avatars", "The Dashavatara", "The Dashavatara enumerates ten major avatars of Vishnu descending to earth to restore dharma, concluding with the future avatar Kalki."));

  // Cycle 9: East Asian Mythologies
  q.push(createMCQ("Which mythological trickster hero, born from a stone egg, wields a size-shifting iron staff in the Chinese classic Journey to the West?", "Sun Wukong", "Nezha", "Erlang Shen", "Sun Wukong (The Monkey King) acquired 72 earthly transformations, somatic cloud riding, and immortality before escorting monk Tang Sanzang.", mcqIdx++));
  q.push(createMCQ("Which Japanese Shinto solar deity emerged from the heavenly rock cave to restore light to the universe after being coaxed out by a mirror?", "Amaterasu", "Tsukuyomi", "Susanoo", "Amaterasu-omikami is the supreme sun goddess of the Shinto pantheon, from whom the Japanese imperial family claims divine descent.", mcqIdx++));
  q.push(createMCQ("Who is the supreme ruler of heaven and the cosmos in Chinese folk religion and Taoist mythology, presiding over the Heavenly Court?", "The Jade Emperor", "Pangu", "Fuxi", "The Jade Emperor (Yu Huang) governs heaven, earth, and the underworld, administering a vast celestial bureaucracy of deities and immortals.", mcqIdx++));
  q.push(createMCQ("Which Chinese goddess of the moon flew to the lunar palace after consuming the elixir of immortality granted to her archer husband Hou Yi?", "Chang'e", "Nuwa", "Xiwangmu", "Chang'e resides in the Moon Palace accompanied by the Jade Rabbit who pounds herbs for the elixir of life.", mcqIdx++));
  q.push(createMCQ("In Japanese Shinto mythology, which divine creator couple stood upon the Floating Bridge of Heaven and stirred the ocean with a jeweled spear to form Japan?", "Izanagi and Izanami", "Ninigi and Konohana", "Takemikazuchi and Futsunushi", "Brine dripping from Izanagi's heavenly spear crystallized to form Onogoro Island, where the divine couple wed and birthed the Japanese archipelago.", mcqIdx++));
  q.push(createNumber("How many Earthly Transformations (Bian) did Sun Wukong master under Master Subhuti in Journey to the West?", 72, "transformations", "72 earthly transformations", "Sun Wukong mastered the 72 Earthly Transformations (72 Bian), allowing him to transform into any animal, object, or person."));

  // Cycle 10: Mesoamerican & World Creatures
  q.push(createMCQ("Which Feathered Serpent deity was worshipped across Mesoamerica by the Aztecs as a god of wind, wisdom, and the morning star?", "Quetzalcoatl", "Huitzilopochtli", "Tezcatlipoca", "Quetzalcoatl was revered as a patron of priesthood, learning, and crafts, known as Kukulkan among the Maya of Yucatan.", mcqIdx++));
  q.push(createMCQ("Which Aztec solar and war deity required daily nourishment through sacrificial hearts to ensure the sun would rise and defeat the stars?", "Huitzilopochtli", "Tlaloc", "Mictlantecuhtli", "Huitzilopochtli was the patron god of Tenochtitlan who guided the Mexica people to build their empire where an eagle perched on a nopal cactus.", mcqIdx++));
  q.push(createMCQ("What legendary immortal bird of Greek and Egyptian mythology dies in a burst of flames before resurrecting reborn from its own ashes?", "Phoenix", "Roc", "Simurgh", "The Phoenix symbolizes renewal and immortality, traditionally living for 500 years before building a nest of aromatic spices and igniting.", mcqIdx++));
  q.push(createMCQ("Which monstrous Scandinavian sea creature of myth was described as a gigantic tentacled kraken capable of dragging entire ships beneath the waves?", "Kraken", "Leviathan", "Cetus", "Norse folklore depicted the Kraken lurking off the coasts of Norway and Greenland, likely inspired by sightings of giant squid.", mcqIdx++));
  q.push(createMCQ("What ancient worldwide mythological symbol depicts a serpent or dragon eating its own tail, representing eternity and the cycle of rebirth?", "Ouroboros", "Caduceus", "Ankh", "Originating in ancient Egyptian iconography and Greek magical traditions, the Ouroboros embodies the eternal cycle of life, death, and renewal.", mcqIdx++));
  q.push(createNumber("How many cosmic suns or creation eras make up the complete cyclical history of the universe according to Aztec mythology?", 5, "suns", "The Five Suns", "Aztec cosmology details Five Suns or cosmic ages; humanity currently resides in the fifth sun, Nahui-Ollin (Four Movement), governed by Tonatiuh."));

  return {
    id: "world-mythology-legends-60",
    theme: "World Mythology: Norse, Egyptian, Greek & Celtic Pantheons",
    title: "World Mythology: Norse, Egyptian, Greek & Celtic Pantheons",
    description: "A 60-question grand master assessment exploring Greek Olympians, Heracles, Norse gods of Asgard, Ragnarok, Egyptian underworld mysteries, Gilgamesh, Celtic lore, Hindu epics, East Asian folklore, and mythical beasts.",
    category: "Arts, Music, Literature & Philosophy",
    difficulty: "moderate",
    createdAt: "2026-08-27T00:00:00Z",
    questions: q
  };
}

module.exports = {
  getClassicalMusicQuiz,
  getRockPopMusicQuiz,
  getWorldLiteratureQuiz,
  getWorldMythologyQuiz
};

if (require.main === module) {
  const quizzes = [
    getClassicalMusicQuiz(),
    getRockPopMusicQuiz(),
    getWorldLiteratureQuiz(),
    getWorldMythologyQuiz()
  ];
  
  for (const quiz of quizzes) {
    const dir = path.join('quizzes', quiz.id);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'dataset.json'), JSON.stringify(quiz, null, 2), 'utf8');
    console.log(`Wrote: ${dir}/dataset.json`);
  }
}
