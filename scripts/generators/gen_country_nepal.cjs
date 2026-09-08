const fs = require('fs');
const path = require('path');
const { buildQuiz } = require('./generate_helpers.cjs');

// =========================================================================
// 4. nepal-geography-heritage-60
// =========================================================================
const nepalCycles = [
  // Cycle 1: Mount Everest (Sagarmatha) & The Roof of the World
  {
    mcqs: [
      {
        q: "What is the highest mountain peak on planet Earth, rising 8,848.86 meters above sea level on the international border between Nepal and China (Tibet)?",
        correct: "Mount Everest Sagarmatha (Chomolungma)",
        w1: "K2",
        w2: "Kangchenjunga",
        exp: "Known in Nepali as Sagarmatha (Forehead of the Sky) and in Tibetan as Chomolungma (Goddess Mother of the World), Everest is protected inside Sagarmatha National Park."
      },
      {
        q: "On what historic date did Sir Edmund Hillary of New Zealand and Tenzing Norgay Sherpa of Nepal become the first humans verified to reach the summit of Mount Everest?",
        correct: "May 29, 1953",
        w1: "June 8, 1924",
        w2: "October 14, 1978",
        exp: "Climbing via the South Col route under John Hunt British expedition, the news reached London on the morning of Queen Elizabeth II coronation."
      },
      {
        q: "What dangerous high-altitude physiological zone above 8,000 meters on Mount Everest contains only one-third of the atmospheric oxygen found at sea level?",
        correct: "The Death Zone",
        w1: "The Twilight Zone",
        w2: "The Abyssal Zone",
        exp: "In the Death Zone, human bodies cannot acclimatize and consume oxygen faster than it can be replenished, requiring bottled supplementary oxygen."
      },
      {
        q: "What terrifying labyrinth of constantly shifting giant glacial ice towers (seracs) and crevasses lies immediately above Everest Base Camp on the Khumbu Glacier?",
        correct: "The Khumbu Icefall",
        w1: "The Western Cwm",
        w2: "The Lhotse Face",
        exp: "Icefall Doctors (elite Sherpa mountaineers) set ladders and fixed safety ropes across gaping crevasses every spring climbing season."
      },
      {
        q: "What famous 12-meter near-vertical rock face on the Southeast Ridge of Everest, situated at 8,790 meters just below the summit, was named after its first conqueror?",
        correct: "The Hillary Step",
        w1: "The Geneva Spur",
        w2: "The Yellow Band",
        exp: "Altered by the 2015 Nepal earthquake, the Hillary Step was historically the most formidable technical rock-climbing obstacle on the final summit push."
      }
    ],
    number: {
      q: "What is the official surveyed summit elevation in meters above sea level of Mount Everest (Sagarmatha)?",
      target: 8849,
      unit: "meters",
      imperial: "29,031.7 feet (8,848.86 m)",
      exp: "In December 2020, Nepal and China jointly announced the official new height of Mount Everest as 8,848.86 meters (rounded to 8,849 m)."
    }
  },

  // Cycle 2: The Eight-Thousanders & Himalayan Peaks
  {
    mcqs: [
      {
        q: "How many of the world fourteen mountain peaks exceeding 8,000 meters in elevation (the Eight-Thousanders) are located entirely or partially within Nepal?",
        correct: "8 of the 14 Peaks",
        w1: "5 Peaks",
        w2: "10 Peaks",
        exp: "Nepal contains Everest, Kangchenjunga, Lhotse, Makalu, Cho Oyu, Dhaulagiri, Manaslu, and Annapurna I."
      },
      {
        q: "Which lethal 8,091-meter Himalayan peak in north-central Nepal became the very first 8,000-meter mountain ever climbed by humans in June 1950 by Maurice Herzog and Louis Lachenal?",
        correct: "Annapurna I",
        w1: "Dhaulagiri",
        w2: "Manaslu",
        exp: "Annapurna I is statistically one of the most hazardous 8,000-meter peaks on Earth due to frequent massive avalanches on its sheer South Face."
      },
      {
        q: "What iconic double-peaked sacred mountain in the Annapurna range, rising 6,993 meters above Pokhara, is named Fishtail Mountain and strictly banned from climbing?",
        correct: "Machapuchare Machhapuchhre",
        w1: "Ama Dablam",
        w2: "Hiunchuli",
        exp: "Revered by locals as the sacred abode of the Hindu god Shiva, Machapuchare has remained pristine and unclimbed to its true summit."
      },
      {
        q: "What colossal river canyon between the 8,000-meter massifs of Dhaulagiri and Annapurna is recognized as the deepest river gorge in the world?",
        correct: "Kali Gandaki Gorge",
        w1: "Yarlung Tsangpo Grand Canyon",
        w2: "Indus Gorge",
        exp: "Carved by the Kali Gandaki River, the elevation difference between the riverbed and the summit of Dhaulagiri (8,167 m) spans an astonishing 5,500 vertical meters."
      },
      {
        q: "What elegant 6,812-meter pyramid-shaped mountain in the Khumbu region, meaning 'Mother Necklace', is celebrated as the Matterhorn of the Himalayas?",
        correct: "Ama Dablam",
        w1: "Pumori",
        w2: "Nuptse",
        exp: "The hanging glacier (dablam) resembles the traditional double-pendant necklace worn by Sherpa women, featuring soaring granite ridges."
      }
    ],
    number: {
      q: "How many of the world fourteen iconic 8,000-meter mountain peaks (the Eight-Thousanders) are situated in Nepal?",
      target: 8,
      unit: "eight-thousander peaks",
      imperial: "8 of the 14 global 8,000ers",
      exp: "Nepal is home to eight of the fourteen 8,000-meter peaks on Earth, earning its title as the Mountain Kingdom."
    }
  },

  // Cycle 3: Kathmandu Valley & UNESCO Durbar Squares
  {
    mcqs: [
      {
        q: "How many distinct UNESCO World Heritage monument zones, spanning royal palaces, temples, and stupas, are collectively protected across the historic Kathmandu Valley?",
        correct: "7 Monument Zones",
        w1: "3 Monument Zones",
        w2: "10 Monument Zones",
        exp: "The inscription encompasses the three Durbar Squares (Kathmandu, Patan, Bhaktapur), two Buddhist stupas (Swayambhunath, Boudhanath), and two Hindu temples (Pashupatinath, Changu Narayan)."
      },
      {
        q: "What royal palace complex on Kathmandu Durbar Square is the historic seat of Malla and Shah kings, guarded by a stone statue of the monkey god Hanuman?",
        correct: "Hanuman Dhoka",
        w1: "Narayanhiti Palace",
        w2: "Singha Durbar",
        exp: "Hanuman Dhoka features the nine-story Basantapur Tower, the Taleju Temple, and courtyards (chowks) adorned with intricate Newar woodcarvings."
      },
      {
        q: "What unique religious tradition in Kathmandu involves selecting a young prepubescent girl from the Newar Shakya clan to live as the Living Goddess until puberty?",
        correct: "The Royal Kumari",
        w1: "The Devi",
        w2: "The Yogini",
        exp: "Venerated as the earthly incarnation of goddess Taleju (Durga), the Kumari resides inside the intricately carved wooden Kumari Ghar palace in Kathmandu Durbar Square."
      },
      {
        q: "Which ancient city in the Kathmandu Valley, known as the City of Devotees, features the 30-meter five-story Nyatapola Temple, the tallest pagoda temple in Nepal?",
        correct: "Bhaktapur Bhadgaon",
        w1: "Patan Lalitpur",
        w2: "Kirtipur",
        exp: "Bhaktapur is famous for the 55-Window Palace, Pottery Square, and traditional King Curd (Juju Dhau) sweet yogurt served in clay pots."
      },
      {
        q: "Which city in the Kathmandu Valley, known as the City of Fine Arts (Lalitpur), is celebrated for master bronze casters, stone carvers, and the Krishna Mandir stone temple?",
        correct: "Patan Lalitpur",
        w1: "Bhaktapur",
        w2: "Nagarkot",
        exp: "Patan Durbar Square is considered the finest display of Newar classical architecture, featuring the Patan Museum housed in a restored royal palace."
      }
    ],
    number: {
      q: "How many distinct architectural monument zones comprise the UNESCO World Heritage designation of the Kathmandu Valley in Nepal?",
      target: 7,
      unit: "monument zones",
      imperial: "7 UNESCO monument zones",
      exp: "The Kathmandu Valley UNESCO designation protects seven distinct monument zones across Kathmandu, Patan, and Bhaktapur."
    }
  },

  // Cycle 4: Sacred Stupas: Swayambhunath & Boudhanath
  {
    mcqs: [
      {
        q: "What ancient hilltop Buddhist stupa complex overlooking Kathmandu, nicknamed the Monkey Temple for hundreds of sacred rhesus macaques, features the all-seeing eyes of Buddha?",
        correct: "Swayambhunath",
        w1: "Boudhanath",
        w2: "Namobuddha",
        exp: "According to legend, the stupa arose spontaneously from a sacred lotus flower when the mythical hero Manjushri drained the lake that once filled the Kathmandu Valley."
      },
      {
        q: "What colossal 36-meter spherical Buddhist stupa in eastern Kathmandu is the largest stupa in Nepal and the focal heart of Tibetan Buddhism in exile?",
        correct: "Boudhanath Boudha Stupa",
        w1: "Swayambhunath",
        w2: "Charumati Stupa",
        exp: "Surrounded by over fifty Tibetan monasteries (gompas), thousands of pilgrims walk clockwise (kora) around the giant mandala base while spinning prayer wheels."
      },
      {
        q: "What sacred Hindu temple complex on the banks of the holy Bagmati River in Kathmandu is dedicated to Lord Shiva as Pashupati (Lord of Animals)?",
        correct: "Pashupatinath Temple",
        w1: "Muktinath Temple",
        w2: "Janaki Mandir",
        exp: "A major pilgrimage site during Maha Shivaratri, open-air cremation pyres operate twenty-four hours a day along the sacred river ghats."
      },
      {
        q: "What is the oldest verified Hindu temple complex in the Kathmandu Valley, dating back to the 5th-century Licchavi Dynasty on a high forested ridge?",
        correct: "Changu Narayan Temple",
        w1: "Pashupatinath",
        w2: "Dakshinkali",
        exp: "Changu Narayan houses a stone pillar inscription erected by King Manadeva in 464 CE, the oldest historical written record in Nepal."
      },
      {
        q: "What famous holy pilgrimage shrine at 3,710 meters in Mustang is sacred to both Hindus and Buddhists, featuring 108 sacred water spouts and eternal natural gas flames?",
        correct: "Muktinath Temple Chumig Gyatsa",
        w1: "Gosainkunda",
        w2: "Damodar Kunda",
        exp: "Hindus bathe under the 108 stone bull-head water spouts for liberation (moksha), while Buddhists revere it as a place where Guru Rinpoche (Padmasambhava) meditated."
      }
    ],
    number: {
      q: "In which century CE was the landmark stone inscription of King Manadeva erected at Changu Narayan Temple, the oldest written historical record in Nepal?",
      target: 5,
      unit: "century CE",
      imperial: "5th Century AD (464 CE)",
      exp: "King Manadeva inscribed the historic stone pillar at Changu Narayan in 464 CE (5th century)."
    }
  },

  // Cycle 5: Pokhara, Phewa Lake & Annapurna Sanctuary
  {
    mcqs: [
      {
        q: "What scenic lakeside city at 822 meters elevation, situated beneath the Annapurna range on Phewa Lake, is celebrated as the Tourism and Adventure Capital of Nepal?",
        correct: "Pokhara",
        w1: "Kathmandu",
        w2: "Biratnagar",
        exp: "Pokhara is the primary gateway for treks into the Annapurna region, world-renowned for paragliding over Phewa Lake from the Sarangkot hill ridge."
      },
      {
        q: "What iconic two-story Hindu pagoda temple sits on a small island in the middle of Phewa Lake in Pokhara, dedicated to the boar manifestation of goddess Durga?",
        correct: "Tal Barahi Temple Lake Temple",
        w1: "Bindhyabasini Temple",
        w2: "Bhadrakali Temple",
        exp: "Devotees travel by wooden rowboats (doonga) to the island temple, which offers reflections of the Annapurna mountain peaks in the water."
      },
      {
        q: "What massive 115-meter white Buddhist stupa perches on Anadu Hill overlooking Lake Phewa and Pokhara, built by Japanese monks of Nipponzan-Myōhōji in 1999?",
        correct: "World Peace Pagoda Shanti Stupa",
        w1: "Boudhanath",
        w2: "Lumbini Stupa",
        exp: "The Shanti Stupa is designed to inspire world peace, featuring four golden statues of the Buddha depicting his birth, enlightenment, first sermon, and parinirvana."
      },
      {
        q: "What mysterious subterranean waterfall in Pokhara plunges fifty meters into an underground sinkhole, named after a Swiss tourist swept away in 1961?",
        correct: "Davis Falls Patale Chhango",
        w1: "Seti River Gorge",
        w2: "Rupse Falls",
        exp: "Known in Nepali as Patale Chhango (Underworld Waterfall), the waters tunnel underground for 500 meters before emerging near Gupteshwor Mahadev Cave."
      },
      {
        q: "What 5,416-meter high mountain pass is the highest point and climax of the world-famous Annapurna Circuit trekking route?",
        correct: "Thorong La Pass",
        w1: "Cho La Pass",
        w2: "Renjo La Pass",
        exp: "Trekkers cross Thorong La connecting the arid Tibetan-like plateau of Manang with the sacred pilgrimage valley of Muktinath in Mustang."
      }
    ],
    number: {
      q: "In what year was the monumental World Peace Pagoda (Shanti Stupa) completed on the ridge overlooking Lake Phewa in Pokhara, Nepal?",
      target: 1999,
      unit: "year",
      imperial: "1999 AD",
      exp: "The Pokhara Shanti Stupa was formally inaugurated on October 30, 1999."
    }
  },

  // Cycle 6: Chitwan, Bardia & Terai Wildlife
  {
    mcqs: [
      {
        q: "What was the very first national park established in Nepal in 1973, covering 952 square kilometers of subtropical sal forests and tall elephant grasslands in the southern Terai?",
        correct: "Chitwan National Park",
        w1: "Bardia National Park",
        w2: "Shuklaphanta National Park",
        exp: "A UNESCO World Heritage site, Chitwan was transformed from a royal hunting reserve into one of Asia most successful conservation sanctuaries for endangered megafauna."
      },
      {
        q: "What iconic, armored-looking endangered mammal species was brought back from near extinction in Chitwan National Park, with national wild populations now exceeding 750 individuals?",
        correct: "Greater One-Horned Rhinoceros Indian Rhinoceros",
        w1: "Javan Rhinoceros",
        w2: "Sumatran Rhinoceros",
        exp: "Through zero-poaching military patrols and community anti-poaching units, Nepal has achieved consecutive years of zero rhino poaching."
      },
      {
        q: "What critically endangered fish-eating crocodilian species, characterized by an extremely long and narrow snout tipped with a bulbous growth (ghara), is bred in Chitwan?",
        correct: "Gharial Gavialis gangeticus",
        w1: "Mugger Crocodile",
        w2: "Saltwater Crocodile",
        exp: "Chitwan Gharial Breeding Centre raises hatchlings to release into the Rapti and Narayani rivers to rebuild wild riverine populations."
      },
      {
        q: "What largest national park in the western Terai of Nepal covers 968 square kilometers of wilderness, famous for high densities of wild Bengal Tigers and wild Asian elephants?",
        correct: "Bardia National Park Bardiya",
        w1: "Banke National Park",
        w2: "Parsa National Park",
        exp: "Bounded by the Karnali River (Nepal longest river), Bardia is home to the Gangetic river dolphin and swamp deer (barasingha)."
      },
      {
        q: "What indigenous ethnolinguistic group of the Terai lowlands developed natural genetic resistance to malaria and is renowned for clay-relief wall art and stick dances?",
        correct: "The Tharu People",
        w1: "The Newar",
        w2: "The Magar",
        exp: "Tharu villages feature mud and thatch houses adorned with reliefs of peacocks and elephants, historically living in harmony with the wild Terai jungles."
      }
    ],
    number: {
      q: "How many facial horns does the native Greater One-Horned Rhinoceros (Rhinoceros unicornis) of Chitwan National Park possess?",
      target: 1,
      unit: "horn",
      imperial: "1 single horn",
      exp: "Unlike African rhinos with two horns, the Greater One-horned Rhinoceros has a single keratin horn measuring twenty to sixty centimeters long."
    }
  },

  // Cycle 7: Lumbini & The Birthplace of the Buddha
  {
    mcqs: [
      {
        q: "What sacred UNESCO World Heritage pilgrimage site in Rupandehi District in southern Nepal is celebrated as the historical birthplace of Siddhartha Gautama (Lord Buddha) in 623 BCE?",
        correct: "Lumbini",
        w1: "Bodh Gaya",
        w2: "Sarnath",
        exp: "Visited by millions of Buddhist pilgrims from across the globe, Lumbini features the sacred Maya Devi Temple and an International Monastic Zone."
      },
      {
        q: "What ancient stone pillar, erected in 249 BCE by Mauryan Emperor Ashoka the Great with a Brahmi script inscription, confirmed the exact location of the Buddha birthplace?",
        correct: "The Ashoka Pillar of Lumbini",
        w1: "The Heliodorus Pillar",
        w2: "The Iron Pillar",
        exp: "The inscription reads: 'King Piyadasi, beloved of the gods, came here in person and worshipped, because here the Buddha, the sage of the Shakyas, was born.'"
      },
      {
        q: "What sacred rectangular water pond next to the Maya Devi Temple in Lumbini is where Queen Maya Devi is believed to have bathed before giving birth to infant Prince Siddhartha?",
        correct: "Pushkarini Holy Pond",
        w1: "Manasarovar",
        w2: "Gosainkunda",
        exp: "According to Buddhist scriptures, two celestial streams of warm and cold water poured from the heavens to bathe the newborn prince and his mother."
      },
      {
        q: "Under what sacred tree in Lumbini garden did Queen Maya Devi grasp a branch while giving birth to Prince Siddhartha Gautama?",
        correct: "The Bodhi Tree Sal Tree (Shorea robusta)",
        w1: "Banyan Tree",
        w2: "Peepal Tree",
        exp: "Immediately after birth, legend holds that the infant took seven steps in each cardinal direction, with lotus flowers blooming beneath his feet."
      },
      {
        q: "Which renowned Japanese modernist architect created the master plan for the Lumbini Sacred Garden and International Monastic Zone in 1978?",
        correct: "Kenzō Tange",
        w1: "Tadao Ando",
        w2: "Kengo Kuma",
        exp: "Tange designed a three-square-mile master plan centered on a central water canal, dividing East Monastic Zone (Theravada) from West Monastic Zone (Mahayana/Vajrayana)."
      }
    ],
    number: {
      q: "In what year BCE is the historical Buddha Siddhartha Gautama traditionally recorded to have been born in Lumbini, Nepal?",
      target: 623,
      unit: "BCE",
      imperial: "623 BC (over 2,600 years ago)",
      exp: "According to Buddhist tradition, Siddhartha Gautama was born in the garden of Lumbini in the year 623 BCE."
    }
  },

  // Cycle 8: Sherpa Culture, Yaks & Mountaineering Legends
  {
    mcqs: [
      {
        q: "What indigenous ethnic group of the high Himalayas in eastern Nepal, of Tibetan origin, is internationally renowned for extraordinary mountaineering endurance and guiding skills?",
        correct: "The Sherpa People",
        w1: "The Gurung",
        w2: "The Tamang",
        exp: "Centuries of living above 3,000 meters led Sherpas to evolve unique physiological genetic adaptations that burn oxygen more efficiently at extreme altitudes."
      },
      {
        q: "What long-haired domesticated bovine species is essential to high-altitude Himalayan transport, milk, wool, and fuel above 3,000 meters elevation in Nepal?",
        correct: "The Himalayan Yak Bos grunniens",
        w1: "The Water Buffalo",
        w2: "The Zebu",
        exp: "Female yaks (naks) produce rich milk for making yak butter tea (po cha) and hardened sun-dried chhurpi cheese, the hardest cheese in the world."
      },
      {
        q: "What famous Tibetan Buddhist monastery at 3,867 meters in the Khumbu region, set against the backdrop of Ama Dablam, is the spiritual center of the Sherpa people?",
        correct: "Tengboche Monastery Dawa Choling Gompa",
        w1: "Kyangjuma Monastery",
        w2: "Pangboche Monastery",
        exp: "Climbers and Sherpas routinely visit Tengboche to receive blessings from the Rinpoche lama for safe passage before ascending Mount Everest."
      },
      {
        q: "Which legendary Nepali mountaineer set a Guinness World Record by climbing Mount Everest an unprecedented twenty-eight times as of 2023?",
        correct: "Kami Rita Sherpa",
        w1: "Apa Sherpa",
        w2: "Phurba Tashi Sherpa",
        exp: "Known as the Everest Man, Kami Rita has guided international expeditions on Everest since 1994, alongside summits of K2, Cho Oyu, and Lhotse."
      },
      {
        q: "Which Nepali mountaineer and former Gurkha soldier climbed all fourteen of the world 8,000-meter peaks in a record-breaking six months and six days in 2019 (Project Possible)?",
        correct: "Nirmal Nims Purja",
        w1: "Kami Rita Sherpa",
        w2: "Mingma Gyabu Sherpa",
        exp: "Chronicled in the documentary 14 Peaks: Nothing Is Impossible, Purja smashed the previous world record of seven years, eleven months, and fourteen days."
      }
    ],
    number: {
      q: "What is the elevation in meters above sea level of the historic Tengboche Monastery in the Everest Khumbu region?",
      target: 3867,
      unit: "meters",
      imperial: "12,687 feet",
      exp: "Tengboche Monastery sits at an official elevation of 3,867 meters above sea level overlooking the Imja Khola river."
    }
  },

  // Cycle 9: The Gurkhas, Khukuri & Nepali Traditions
  {
    mcqs: [
      {
        q: "What world-renowned elite soldiers from Nepal have served with distinction in the British and Indian armies for over two centuries, carrying the motto 'Better to die than be a coward'?",
        correct: "The Gurkhas Gorkhas",
        w1: "The Rajputs",
        w2: "The Sikhs",
        exp: "Recruited from hill tribes like the Magar, Gurung, Rai, and Limbu, Gurkha soldiers have earned twenty-six Victoria Cross medals for extreme valor."
      },
      {
        q: "What iconic, heavy forward-curved steel combat knife with a notch (cho) near the handle is the traditional utility tool and combat weapon of the Gurkhas?",
        correct: "The Khukuri Kukri",
        w1: "The Kris",
        w2: "The Jambiya",
        exp: "Carried in a leather sheath with two small companion knives (karda for skinning and chakmak for sharpening and striking sparks), the khukuri is the national knife of Nepal."
      },
      {
        q: "What is the largest and most auspicious 15-day Hindu religious festival celebrated in Nepal, commemorating the victory of Goddess Durga over the demon Mahishasura?",
        correct: "Dashain Vijaya Dashami",
        w1: "Tihar",
        w2: "Holi",
        exp: "Families gather to receive red rice-and-yogurt tika blessings on their foreheads from elders and fly colorful kites across city rooftops."
      },
      {
        q: "What five-day Festival of Lights in Nepal (Tihar) dedicates an entire official day (Kukur Tihar) to worshipping and thanking dogs for their loyalty with flower garlands and treats?",
        correct: "Tihar Deepawali",
        w1: "Dashain",
        w2: "Chhath",
        exp: "During Tihar, crows (messengers of death), dogs (guardians of the afterlife), cows (prosperity), and oxen are ritually honored before Bhai Tika honors siblings."
      },
      {
        q: "What traditional Nepali culinary staple, consisting of steamed white rice served with spiced yellow lentil soup (dal) and seasonal vegetable curry (tarkari), is eaten twice daily across Nepal?",
        correct: "Dal Bhat",
        w1: "Thukpa",
        w2: "Momo",
        exp: "Popular among hikers under the slogan 'Dal Bhat Power, 24 Hour', it is accompanied by spicy pickled achar, fermented mustard greens (gundruk), and crispy papad."
      }
    ],
    number: {
      q: "For how many continuous days is the grand national Hindu festival of Dashain celebrated across Nepal?",
      target: 15,
      unit: "days",
      imperial: "15-day festival",
      exp: "Dashain is the longest and most celebrated festival in the Nepali calendar, lasting fifteen days from Ghatasthapana to Kojagrat Purnima."
    }
  },

  // Cycle 10: Extent, 7 Provinces & Nepali Superlatives
  {
    mcqs: [
      {
        q: "What distinctive geometric design makes the national flag of Nepal unique in the entire world as the only non-quadrilateral (non-rectangular) national flag?",
        correct: "Two stacked triangular pennants representing the Himalayas, Sun, and Moon",
        w1: "A circle inside a square",
        w2: "A trapezoid with a dragon",
        exp: "The crimson red color represents the national flower (rhododendron) and bravery, with the blue border symbolizing peace, and the sun and moon expressing hope Nepal will endure as long as celestial bodies."
      },
      {
        q: "Into how many first-level administrative provinces (such as Bagmati, Gandaki, Koshi, Lumbini, and Karnali) was Nepal reorganized under its 2015 Federal Democratic Constitution?",
        correct: "7 Provinces",
        w1: "5 Provinces",
        w2: "14 Provinces",
        exp: "The 2015 constitution transitioned Nepal from a unitary monarchy into a secular federal democratic republic structured into seven provinces and seventy-seven districts."
      },
      {
        q: "What is the astonishing vertical elevation span across the land territory of Nepal, rising from just sixty meters above sea level in the southern Terai plains to 8,849 meters at Mount Everest?",
        correct: "Over 8,780 Vertical Meters",
        w1: "3,000 Vertical Meters",
        w2: "5,000 Vertical Meters",
        exp: "In a horizontal distance of just 150 kilometers, Nepal transitions from tropical jungles where tigers and elephants roam to permanent Arctic alpine glaciers."
      },
      {
        q: "What vibrant national flower of Nepal, known locally as Lali Gurans (Rhododendron arboreum), covers subalpine mountain hillsides in brilliant red blooms in spring?",
        correct: "Rhododendron Lali Gurans",
        w1: "Lotus",
        w2: "Marigold",
        exp: "Rhododendron forests in the Helambu and Langtang regions form magnificent red and pink floral canopies between 2,000 and 3,500 meters altitude."
      },
      {
        q: "What is the total land area of the Federal Democratic Republic of Nepal in square kilometers, landlocked between India to the south, east, and west, and China to the north?",
        correct: "147,516 Square Kilometers",
        w1: "85,000 Square Kilometers",
        w2: "250,000 Square Kilometers",
        exp: "Nepal spans 880 kilometers from east to west and an average of 193 kilometers from north to south, home to over thirty million people and 120 ethnic groups."
      }
    ],
    number: {
      q: "How many administrative Provinces comprise the federal governance structure of Nepal?",
      target: 7,
      unit: "provinces",
      imperial: "7 federal provinces",
      exp: "Nepal is officially structured into seven federal provinces under its modern constitutional framework."
    }
  }
];

// Build Nepal Quiz
buildQuiz({
  id: 'nepal-geography-heritage-60',
  theme: 'Nepal: Geography, Mount Everest & Himalayan Sanctuaries',
  title: 'Nepal: Geography, Mount Everest & Himalayan Sanctuaries',
  description: 'A 60-question grand master assessment exploring Mount Everest (8,849 m), 8 eight-thousanders, Kathmandu Valley Durbar Squares (7 zones), Swayambhunath & Boudhanath (5th c.), Pokhara, Chitwan rhinos, Lumbini & Buddha (623 BCE), Sherpa culture, Gurkhas, and the unique 2-triangle flag.',
  category: 'Geography, Capitals & Landscapes',
  difficulty: 'moderate'
}, nepalCycles);

console.log('Nepal quiz built successfully!');
