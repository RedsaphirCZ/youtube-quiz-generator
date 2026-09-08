import { QuizDataset } from '../../src/types';

export const ancientChinaQuiz: QuizDataset = {
  id: "ancient-china-dynasties-60",
  theme: "Imperial China: Dynasties, Inventions & The Great Wall",
  title: "Imperial China: Dynasties, Inventions & The Great Wall",
  description: "A 60-question grand master assessment on the Qin, Han, Tang, Song, Ming, and Qing dynasties, the Four Great Inventions, the Terracotta Army, and the Great Wall.",
  category: "Ancient Civilizations & Empires",
  difficulty: "moderate",
  createdAt: "2026-08-27T00:00:00Z",
  questions: [
    // Cycle 1
    {
      type: "mcq",
      question: "Which ancient Chinese dynasty, founded around 1600 BCE along the Yellow River, produced the earliest confirmed Chinese writing on oracle bones?",
      options: ["Shang Dynasty", "Zhou Dynasty", "Xia Dynasty"],
      correctIndex: 0,
      explanation: "The Shang Dynasty is the earliest archaeologically verified dynasty in China, famous for its sophisticated bronze metallurgy and oracle bone inscriptions."
    },
    {
      type: "mcq",
      question: "What animal parts were predominantly used by Shang diviners to carve oracle bone script for royal divination?",
      options: ["Deer antlers and tiger teeth", "Ox scapulae and turtle plastrons", "Elephant tusks and bird talons"],
      correctIndex: 1,
      explanation: "Diviners applied heat to turtle shells and cattle shoulder blades, interpreting the resulting thermal stress cracks to prophesy state affairs."
    },
    {
      type: "mcq",
      question: "What political and spiritual doctrine introduced during the Zhou Dynasty posited that rulers held legitimate authority only so long as they governed justly?",
      options: ["Legalist Order", "Daoist Way", "Mandate of Heaven"],
      correctIndex: 2,
      explanation: "The Mandate of Heaven held that moral failure by a ruler would cause heaven to withdraw favor, legitimizing dynastic overthrow."
    },
    {
      type: "mcq",
      question: "Which influential Eastern Zhou philosopher taught that societal harmony depends on filial piety, ritual propriety, and moral governance?",
      options: ["Confucius", "Laozi", "Han Feizi"],
      correctIndex: 0,
      explanation: "Confucius founded Confucianism during the Spring and Autumn period, emphasizing humaneness, righteousness, and filial devotion."
    },
    {
      type: "mcq",
      question: "Which classical military treatise on strategy, deception, and warfare was written by General Sun Tzu during the Eastern Zhou period?",
      options: ["The Book of Lord Shang", "The Art of War", "Records of the Grand Historian"],
      correctIndex: 1,
      explanation: "The Art of War presented thirteen chapters of pragmatic military doctrine emphasizing intelligence, swift maneuver, and winning without conflict."
    },
    {
      type: "number",
      question: "For approximately how many total years did the Zhou Dynasty rule ancient China, making it the longest-lasting dynasty in Chinese history?",
      target: 789,
      metricUnit: "years",
      imperialDisplay: "789 years (c. 1046–256 BCE)",
      explanation: "Divided into Western and Eastern periods, the Zhou Dynasty lasted roughly 789 years, spanning eight centuries of classical Chinese civilization."
    },

    // Cycle 2
    {
      type: "mcq",
      question: "Who conquered the six rival Warring States in 221 BCE to become the first Emperor of a unified China?",
      options: ["Liu Bang", "Han Wudi", "Qin Shi Huang"],
      correctIndex: 2,
      explanation: "King Zheng of Qin unified China following decades of conquest, adopting the title Qin Shi Huang meaning First Sovereign Emperor."
    },
    {
      type: "mcq",
      question: "Which authoritarian state philosophy, prioritizing strict codified laws, collective responsibility, and absolute state power, guided the Qin Dynasty?",
      options: ["Legalism", "Mohism", "Daoism"],
      correctIndex: 0,
      explanation: "Legalism, championed by Prime Minister Li Si and Shang Yang, formed the administrative and penal bedrock of the centralized Qin state."
    },
    {
      type: "mcq",
      question: "What vast underground necropolis army composed of thousands of life-sized baked-clay warriors was buried to guard Qin Shi Huang in the afterlife?",
      options: ["Imperial Bronze Cohort", "Terracotta Army", "Forbidden Clay Phalanx"],
      correctIndex: 1,
      explanation: "Discovered near Xi'an in 1974, the Terracotta Army contains thousands of individualized statues designed to defend the emperor in eternity."
    },
    {
      type: "mcq",
      question: "What drastic cultural policy did Qin Shi Huang and Li Si enact in 213 BCE to eliminate dissenting philosophical traditions and standardize history?",
      options: ["Dissolution of private guilds", "Confiscation of bronze vessels", "Burning of books and burying of scholars"],
      correctIndex: 2,
      explanation: "Qin authorities ordered the burning of unapproved philosophical texts and executed dissenting scholars to impose ideological uniformity."
    },
    {
      type: "mcq",
      question: "Which pioneering Qin Dynasty canal connected the Xiang and Li rivers, creating the first contour transport waterway linking north and south China?",
      options: ["Lingqu Canal", "Grand Canal", "Zhengfei Canal"],
      correctIndex: 0,
      explanation: "Built in 214 BCE under Qin Shi Huang, the Lingqu Canal allowed supply transport between the Yangtze and Pearl River basins."
    },
    {
      type: "number",
      question: "Approximately how many total life-sized ceramic soldiers, horses, and chariots are estimated to reside in the Terracotta Army pits of Qin Shi Huang?",
      target: 8000,
      metricUnit: "statues",
      imperialDisplay: "8,000 figures",
      explanation: "Archaeologists estimate that over 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses were interred across four main pits."
    },

    // Cycle 3
    {
      type: "mcq",
      question: "Who was the former village official and rebel leader who founded the Han Dynasty in 202 BCE as Emperor Gaozu?",
      options: ["Xiang Yu", "Liu Bang", "Cao Cao"],
      correctIndex: 1,
      explanation: "Liu Bang emerged victorious from the Chu-Han Contention against aristocrat Xiang Yu to establish the four-century Han Dynasty."
    },
    {
      type: "mcq",
      question: "Which Han Dynasty diplomat traveled westward across Central Asia in the 2nd century BCE, initiating the overland Silk Road trade routes?",
      options: ["Xuanzang", "Sima Qian", "Zhang Qian"],
      correctIndex: 2,
      explanation: "Zhang Qian returned to Chang'an with detailed intelligence on Western regions, leading Emperor Wu to open regular trade and diplomatic caravans."
    },
    {
      type: "mcq",
      question: "Which court official is traditionally credited with inventing the standardized papermaking process using plant fibers, hemp, and rags around 105 CE?",
      options: ["Cai Lun", "Bi Sheng", "Shen Kuo"],
      correctIndex: 0,
      explanation: "Cai Lun revolutionized written communication by refining pulp papermaking, replacing heavy bamboo slips and expensive silk scrolls."
    },
    {
      type: "mcq",
      question: "Which Han emperor reigned for 54 years, established state salt and iron monopolies, and elevated Confucianism to official imperial state orthodoxy?",
      options: ["Emperor Wen", "Emperor Wu of Han", "Emperor Jing"],
      correctIndex: 1,
      explanation: "Emperor Wu transformed the empire into a centralized power through territorial expansion, Confucian academies, and fiscal reforms."
    },
    {
      type: "mcq",
      question: "What foundational historical work, covering ancient mythical emperors down to Emperor Wu, was authored by Han Grand Historian Sima Qian?",
      options: ["Book of Han", "Chronicles of the Three Kingdoms", "Records of the Grand Historian"],
      correctIndex: 2,
      explanation: "Sima Qian completed the Records of the Grand Historian after enduring penal castration, setting the standard for Chinese historiography."
    },
    {
      type: "number",
      question: "What was the approximate total distance in kilometers of the primary overland Silk Road network connecting Chang'an with Mediterranean ports?",
      target: 6400,
      metricUnit: "km",
      imperialDisplay: "4,000 miles (6,400 km)",
      explanation: "The Silk Road traversed roughly 6,400 kilometers through deserts, high mountain passes, and oasis hubs like Dunhuang and Samarkand."
    },

    // Cycle 4
    {
      type: "mcq",
      question: "Which turbulent era of division followed the fall of the Han Dynasty in 220 CE, immortalized in the novel Romance of the Three Kingdoms?",
      options: ["Three Kingdoms period", "Five Dynasties period", "Northern and Southern Dynasties"],
      correctIndex: 0,
      explanation: "The Three Kingdoms era saw the rival states of Cao Wei, Shu Han, and Eastern Wu compete intensely for imperial dominance."
    },
    {
      type: "mcq",
      question: "Which dynasty reunified China in 581 CE and initiated the construction of the Grand Canal before quickly collapsing?",
      options: ["Jin Dynasty", "Sui Dynasty", "Northern Wei Dynasty"],
      correctIndex: 1,
      explanation: "The Sui Dynasty under Emperor Wen reunited China after three centuries of division, but collapsed under Emperor Yang due to overwork and failed wars."
    },
    {
      type: "mcq",
      question: "What was the cosmopolitan capital of the Tang Dynasty, which grew into the world largest city with over one million residents inside its walls?",
      options: ["Luoyang", "Kaifeng", "Chang'an"],
      correctIndex: 2,
      explanation: "Chang'an featured a strict grid layout, international markets, and religious shrines for Buddhists, Christians, and Zoroastrians."
    },
    {
      type: "mcq",
      question: "Who was the only woman in Chinese history to rule in her own right as Emperor, founding the Second Zhou Dynasty during the Tang era?",
      options: ["Wu Zetian", "Empress Dowager Cixi", "Empress Lu"],
      correctIndex: 0,
      explanation: "Empress Wu Zetian ruled as sole reigning monarch from 690 to 705 CE, expanding the merit-based civil examination system."
    },
    {
      type: "mcq",
      question: "Which legendary Tang Dynasty romantic poet was celebrated for his lyrical verses on nature, wine, and celestial themes, earning the title Poet Immortal?",
      options: ["Du Fu", "Li Bai", "Wang Wei"],
      correctIndex: 1,
      explanation: "Li Bai is revered as one of China's greatest poets, celebrated for his free-spirited imagination and Daoist sensibilities."
    },
    {
      type: "number",
      question: "Approximately how many total preserved poems by over 2,200 authors are compiled in the definitive Complete Tang Poems collection?",
      target: 48900,
      metricUnit: "poems",
      imperialDisplay: "48,900 poems",
      explanation: "Commissioned by the Qing Kangxi Emperor, the Quantangshi preserves 48,900 poems representing the golden age of classical Chinese verse."
    },

    // Cycle 5
    {
      type: "mcq",
      question: "Which devastating mid-8th-century rebellion led by a frontier general crippled the Tang Dynasty and displaced millions of citizens?",
      options: ["Taiping Rebellion", "Yellow Turban Rebellion", "An Lushan Rebellion"],
      correctIndex: 2,
      explanation: "General An Lushan rebelled in 755 CE, capturing Chang'an and Luoyang and precipitating a catastrophic demographic and political decline."
    },
    {
      type: "mcq",
      question: "During which dynasty was the world's first state-issued paper banknote currency, called Jiaozi, officially circulated in Sichuan province?",
      options: ["Song Dynasty", "Tang Dynasty", "Ming Dynasty"],
      correctIndex: 0,
      explanation: "The Northern Song government adopted Jiaozi in the early 11th century to ease commerce and replace bulky iron and bronze coinage."
    },
    {
      type: "mcq",
      question: "Which Song Dynasty artisan invented the world's first movable type printing technology around 1040 CE using baked porcelain clay?",
      options: ["Cai Lun", "Bi Sheng", "Wang Zhen"],
      correctIndex: 1,
      explanation: "Bi Sheng created individual reusable clay characters set in an iron frame with pine resin and wax, centuries before Gutenberg."
    },
    {
      type: "mcq",
      question: "Which Song Dynasty polymath and statesman wrote the Dream Pool Essays, recording the magnetic navigational compass and dry docks?",
      options: ["Zhu Xi", "Su Shi", "Shen Kuo"],
      correctIndex: 2,
      explanation: "Shen Kuo described magnetic declination, camera obscura, petroleum, and geological sedimentation in his encyclopedic scientific essays."
    },
    {
      type: "mcq",
      question: "Which refined visual art and technological craft achieved supreme artistic perfection during the Song Dynasty, celebrated for delicate Ru and Guan glazes?",
      options: ["Porcelain ceramics", "Cloisonne enamels", "Lacquer furniture"],
      correctIndex: 0,
      explanation: "Song ceramics are revered globally for their subtle celadon glazes, minimalist forms, and flawless firing techniques."
    },
    {
      type: "number",
      question: "In what year CE was the Diamond Sutra woodblock scroll printed in Dunhuang, making it the world's oldest dated complete printed book?",
      target: 868,
      metricUnit: "year CE",
      imperialDisplay: "868 CE",
      explanation: "The Dunhuang Diamond Sutra bears an explicit colophon stating it was printed on May 11, 868 CE for universal free distribution."
    },

    // Cycle 6
    {
      type: "mcq",
      question: "Which grandson of Genghis Khan proclaimed himself Emperor of China and founded the Yuan Dynasty in 1271 CE?",
      options: ["Batu Khan", "Kublai Khan", "Ogedei Khan"],
      correctIndex: 1,
      explanation: "Kublai Khan relocated his administrative capital to Khanbaliq and ruled as both Grand Khan of the Mongols and Emperor of China."
    },
    {
      type: "mcq",
      question: "Which Venetian merchant traveler journeyed across Asia and lived in China for seventeen years, serving at the court of Kublai Khan?",
      options: ["Giovanni da Pian del Carpine", "Matteo Ricci", "Marco Polo"],
      correctIndex: 2,
      explanation: "Marco Polo's travel memoirs introduced medieval Europeans to the immense wealth, postal systems, and paper money of Yuan China."
    },
    {
      type: "mcq",
      question: "What was the name of the grand Yuan Dynasty capital city founded by Kublai Khan, located on the present site of modern Beijing?",
      options: ["Dadu", "Karakorum", "Shangdu"],
      correctIndex: 0,
      explanation: "Dadu, also known in Mongolian as Khanbaliq, was planned as a symmetrical metropolis and center of the empire."
    },
    {
      type: "mcq",
      question: "Which critical infrastructure project was massively widened and rerouted during the Yuan Dynasty to transport grain directly from the south to Dadu?",
      options: ["Yellow River Dykes", "Grand Canal", "Yangtze River Pass"],
      correctIndex: 1,
      explanation: "Yuan engineers straightened the Grand Canal, eliminating detours through Luoyang and enabling direct barge delivery into Beijing."
    },
    {
      type: "mcq",
      question: "What millenarian Buddhist-led rebel group fought against the Mongol administration in the 1350s, leading directly to the founding of the Ming Dynasty?",
      options: ["Boxer Society", "Eight Trigrams", "Red Turban Movement"],
      correctIndex: 2,
      explanation: "The Red Turbans rose in rebellion across the Yangtze valley, uniting Han Chinese discontent and propelling Zhu Yuanzhang to power."
    },
    {
      type: "number",
      question: "What is the total length in kilometers of the Grand Canal of China, recognized by UNESCO as the longest artificial waterway in the world?",
      target: 1776,
      metricUnit: "km",
      imperialDisplay: "1,104 miles (1,776 km)",
      explanation: "Connecting Beijing in the north to Hangzhou in the south, the Grand Canal stretches 1,776 kilometers across six Chinese provinces."
    },

    // Cycle 7
    {
      type: "mcq",
      question: "Who was the peasant orphan and former Buddhist novice who overthrew the Yuan Dynasty and founded the Ming Dynasty as the Hongwu Emperor?",
      options: ["Zhu Yuanzhang", "Zhu Di", "Li Zicheng"],
      correctIndex: 0,
      explanation: "Zhu Yuanzhang rose from destitute poverty to become Emperor Hongwu, establishing his initial capital at Nanjing in 1368."
    },
    {
      type: "mcq",
      question: "Which Ming emperor usurped the throne in the Jingnan Campaign, rebuilt Beijing, commissioned the Forbidden City, and sponsored Zheng He's voyages?",
      options: ["Hongwu Emperor", "Yongle Emperor", "Wanli Emperor"],
      correctIndex: 1,
      explanation: "The Yongle Emperor transferred the imperial capital to Beijing and ushered in a peak era of maritime diplomacy and construction."
    },
    {
      type: "mcq",
      question: "What vast walled palace complex in Beijing containing over 8,000 rooms served as the home of 24 emperors across the Ming and Qing dynasties?",
      options: ["Summer Palace", "Imperial Villa of Chengde", "Forbidden City"],
      correctIndex: 2,
      explanation: "Constructed between 1406 and 1420, the Forbidden City was the sacred ceremonial and residential heart of Chinese imperial power."
    },
    {
      type: "mcq",
      question: "Who was the Muslim eunuch admiral who led seven massive maritime expeditions across the Indian Ocean to Arabia and East Africa between 1405 and 1433?",
      options: ["Zheng He", "Shi Lang", "Qi Jiguang"],
      correctIndex: 0,
      explanation: "Admiral Zheng He commanded fleets of over 200 vessels and 27,000 men, trading Chinese silks and porcelain for exotic goods and diplomatic tribute."
    },
    {
      type: "mcq",
      question: "What distinct type of ceramics, made using imported Persian cobalt pigment under transparent glaze, became China's most famous Ming luxury export?",
      options: ["Sancai earthenware", "Blue and white porcelain", "Longquan celadon"],
      correctIndex: 1,
      explanation: "Ming blue and white porcelain produced at Jingdezhen imperial kilns reached royal courts across Europe, the Middle East, and Asia."
    },
    {
      type: "number",
      question: "According to the official Palace Museum architectural survey, how many structural rooms and bays are preserved in the Forbidden City of Beijing?",
      target: 8707,
      metricUnit: "rooms",
      imperialDisplay: "8,707 structural rooms",
      explanation: "While folklore claims 9,999 rooms to honor heaven, an exact 1973 survey counted 8,707 distinct structural bays and rooms across 980 buildings."
    },

    // Cycle 8
    {
      type: "mcq",
      question: "What primary durable building materials did the Ming Dynasty deploy to construct the imposing stone-faced Great Wall visible today?",
      options: ["Sun-dried mudbrick and timber", "Poured concrete and gravel", "Kiln-fired bricks and cut stone blocks"],
      correctIndex: 2,
      explanation: "The Ming fortified earlier earthen mounds with kiln-fired bricks bonded by sticky rice lime mortar, creating enduring stone fortifications."
    },
    {
      type: "mcq",
      question: "Which strategic fortress pass at the eastern terminus of the Great Wall guards the corridor between the mountains and the Bohai Sea?",
      options: ["Shanhaiguan", "Jiayuguan", "Juyongguan"],
      correctIndex: 0,
      explanation: "Shanhaiguan was known as the First Pass Under Heaven, guarding the gateway into north China from Manchuria."
    },
    {
      type: "mcq",
      question: "Which outpost at the far western terminus of the Ming Great Wall in Gansu province guarded the desert oasis frontier?",
      options: ["Yumen Pass", "Jiayuguan", "Dunhuang Gate"],
      correctIndex: 1,
      explanation: "Jiayuguan was built in 1372 at the narrowest point of the Hexi Corridor in western Gansu, guarding the Silk Road route."
    },
    {
      type: "mcq",
      question: "How did Great Wall garrison towers communicate urgent tactical warnings across hundreds of kilometers along the frontier?",
      options: ["Megaphones and war drums", "Carrier pigeons exclusively", "Smoke beacons by day and signal fires by night"],
      correctIndex: 2,
      explanation: "Watchtowers burned dried wolf dung and straw to produce dark smoke columns by day and lit bonfires and fired cannons by night."
    },
    {
      type: "mcq",
      question: "Which legendary Ming general fortified the Great Wall around Beijing and designed innovative military tactics to defeat Wokou coastal pirates?",
      options: ["Qi Jiguang", "Yue Fei", "Guo Ziyi"],
      correctIndex: 0,
      explanation: "General Qi Jiguang reorganized border garrisons, built 1,200 hollow watchtowers along the Great Wall, and wrote tactical military treatises."
    },
    {
      type: "number",
      question: "What is the total length in kilometers of all historical Great Wall sections ever built across all dynasties according to Chinese state surveys?",
      target: 21196,
      metricUnit: "km",
      imperialDisplay: "13,171 miles (21,196 km)",
      explanation: "The State Administration of Cultural Heritage comprehensive 2012 survey measured all dynastic wall and trench remnants at 21,196 kilometers."
    },

    // Cycle 9
    {
      type: "mcq",
      question: "Which revolutionary invention was discovered by Tang Dynasty Daoist alchemists experimenting with sulfur, charcoal, and potassium nitrate?",
      options: ["Greek Fire", "Gunpowder", "Dynamite"],
      correctIndex: 1,
      explanation: "Originally sought as an elixir of life, black powder was adapted into fire lances, bombs, and cannons during the Song Dynasty."
    },
    {
      type: "mcq",
      question: "What naturally magnetized iron ore mineral did ancient Chinese inventors carve into spoons to create the world's earliest directional compasses?",
      options: ["Bauxite", "Pyrite", "Lodestone"],
      correctIndex: 2,
      explanation: "Han Dynasty diviners fashioned lodestone spoons that swiveled smoothly on bronze geomantic divination plates to indicate south."
    },
    {
      type: "mcq",
      question: "Which Northeast Asian semi-nomadic Tungusic people breached Shanhaiguan in 1644 and founded the Qing Dynasty?",
      options: ["Manchus", "Jurchen Jin", "Khitan Liao"],
      correctIndex: 0,
      explanation: "Unified by Nurhaci and his son Hong Taiji, the Manchus established the Qing Dynasty, ruling China until the 1912 revolution."
    },
    {
      type: "mcq",
      question: "What rigorous imperial examination system based on the Confucian Four Books and Five Classics selected imperial government officials for centuries?",
      options: ["Nine-rank system", "Keju imperial examination", "Court patronage test"],
      correctIndex: 1,
      explanation: "The Keju examination allowed scholars from varied socioeconomic backgrounds to achieve high office through rigorous academic merit."
    },
    {
      type: "mcq",
      question: "What compulsory hairstyle, featuring a shaved forehead and a long braided queue, was mandated by the Qing for all adult Han men upon pain of death?",
      options: ["Topknot", "Chonmage", "Manchu Queue"],
      correctIndex: 2,
      explanation: "The Qing queue decree enforced political submission through the slogan: Keep your hair and lose your head, or keep your head and lose your hair."
    },
    {
      type: "number",
      question: "In what year CE did the Ming Dynasty fall when rebel leader Li Zicheng entered Beijing and the Shunzhi Emperor of Qing claimed the throne?",
      target: 1644,
      metricUnit: "year CE",
      imperialDisplay: "1644 CE",
      explanation: "In 1644, Ming Emperor Chongzhen committed suicide on Jingshan Hill, and General Wu Sangui opened Shanhaiguan to the Manchu army."
    },

    // Cycle 10
    {
      type: "mcq",
      question: "Which Qing emperor ruled for 61 years, compiled the authoritative Kangxi Dictionary, and signed the Treaty of Nerchinsk with the Russian Empire?",
      options: ["Kangxi Emperor", "Qianlong Emperor", "Yongzheng Emperor"],
      correctIndex: 0,
      explanation: "The Kangxi Emperor presided over territorial expansion, economic consolidation, and intellectual patronages during his 61-year reign."
    },
    {
      type: "mcq",
      question: "In what year did China's last imperial dynasty officially end with the abdication of six-year-old Emperor Puyi following the Xinhai Revolution?",
      options: ["1900", "1912", "1949"],
      correctIndex: 1,
      explanation: "Puyi's abdication on February 12, 1912, brought a formal close to over 2,100 years of imperial dynastic governance in China."
    },
    {
      type: "mcq",
      question: "What monumental manuscript compilation, commissioned by the Yongle Emperor in 1403, was the world's largest paper encyclopedia before modern times?",
      options: ["Siku Quanshu", "Gujin Tushu Jicheng", "Yongle Encyclopedia"],
      correctIndex: 2,
      explanation: "The Yongle Encyclopedia spanned over 11,000 handwritten volumes incorporating astronomy, history, geography, arts, and sciences."
    },
    {
      type: "mcq",
      question: "Which aromatic beverage crop, cultivated in China for over three millennia, was China's most fiercely guarded export before European global propagation?",
      options: ["Tea", "Ginseng", "Coffee"],
      correctIndex: 0,
      explanation: "Tea processing and tea plant cultivation techniques were closely guarded secrets that dominated early international maritime commerce."
    },
    {
      type: "mcq",
      question: "Which Italian Jesuit mathematician and cartographer won the respect of the Ming court in Beijing by introducing Western clocks and mapping the world?",
      options: ["Francis Xavier", "Matteo Ricci", "Marco Polo"],
      correctIndex: 1,
      explanation: "Father Matteo Ricci translated Western mathematical treatises into Chinese and collaborated with scholar Xu Guangqi in Beijing."
    },
    {
      type: "number",
      question: "For how many continuous years did the Kangxi Emperor reign over China from 1661 to 1722, the longest of any Chinese monarch in history?",
      target: 61,
      metricUnit: "years",
      imperialDisplay: "61 years (1661–1722)",
      explanation: "Ascending the throne at age seven, the Kangxi Emperor ruled for 61 years, securing peace and establishing the High Qing era."
    }
  ]
};
