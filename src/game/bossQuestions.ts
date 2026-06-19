import type { Card, CardOption } from "./types";

const correctAnswer = (
  id: CardOption["id"],
  label: string,
  explanation: string
): CardOption => ({
  id,
  label,
  timeDeltaHours: -1,
  effectiveMarks: 2,
  isCorrect: true,
  explanation
});

const wrongAnswer = (
  id: CardOption["id"],
  label: string,
  explanation: string
): CardOption => ({
  id,
  label,
  timeDeltaHours: -2,
  effectiveMarks: -1,
  isCorrect: false,
  explanation
});

const bossQuestion = (
  id: string,
  title: string,
  text: string,
  options: [CardOption, CardOption, CardOption]
): Card => ({
  id,
  type: "boss",
  period: "evening",
  title: `魔王題 ${title}`,
  text,
  options
});

export const bossChallengeCards: Card[] = [
  bossQuestion("boss-beyblade-chant", "戰鬥陀螺開戰口號", "最近戰鬥陀螺在國中小學生甚至大人都很風靡。遊戲開始時，玩家通常會一起喊什麼？", [
    wrongAnswer("A", "Ready Fight，Start", "這比較像一般對戰口令，不是戰鬥陀螺常見喊法。"),
    correctAnswer("B", "3、2、1，Go Shoot!", "日系戰鬥陀螺常見開戰口號是「3、2、1，Go Shoot!」。"),
    wrongAnswer("C", "Energy MAX，Launch", "這聽起來很熱血，但不是常見正式口號。")
  ]),
  bossQuestion("boss-stephen-chow-not-movie", "不是周星馳電影", "以下何者不是周星馳電影？", [
    wrongAnswer("A", "逃學威龍", "《逃學威龍》是周星馳代表作之一。"),
    wrongAnswer("B", "唐伯虎點秋香", "《唐伯虎點秋香》是周星馳經典喜劇。"),
    correctAnswer("C", "與龍共舞", "《與龍共舞》主要主演是劉德華，並不是周星馳代表作。")
  ]),
  bossQuestion("boss-kungfu-hustle-place", "功夫場景", "周星馳電影《功夫》中，主要故事場景是哪個地方？", [
    correctAnswer("A", "豬籠城寨", "《功夫》的經典場景是豬籠城寨。"),
    wrongAnswer("B", "凌凌漆基地", "凌凌漆是另一部周星馳電影的角色。"),
    wrongAnswer("C", "少林寺球場", "這是把《少林足球》和少林寺混在一起了。")
  ]),
  bossQuestion("boss-god-of-cookery-dish", "食神招牌菜", "周星馳電影《食神》中，最常被大家記住的經典料理是哪一道？", [
    wrongAnswer("A", "爆漿撒尿牛丸", "撒尿牛丸是片中重要橋段，但最後最經典的料理名稱不是它。"),
    correctAnswer("B", "黯然銷魂飯", "《食神》的經典料理就是黯然銷魂飯。"),
    wrongAnswer("C", "佛跳牆披薩", "這不是《食神》的經典料理。")
  ]),
  bossQuestion("boss-tang-bohu-love", "唐伯虎點秋香", "《唐伯虎點秋香》中，唐伯虎想接近的是哪位角色？", [
    wrongAnswer("A", "小龍女", "小龍女是金庸小說角色。"),
    correctAnswer("B", "秋香", "片名已經把答案寫得很明顯：唐伯虎點秋香。"),
    wrongAnswer("C", "如花", "如花是周星馳電影常見諧趣角色，但不是這題答案。")
  ]),
  bossQuestion("boss-shaolin-soccer", "少林足球核心", "《少林足球》最主要把少林功夫和哪一種運動結合？", [
    correctAnswer("A", "足球", "片名就是答案：少林功夫加足球。"),
    wrongAnswer("B", "籃球", "少林籃球不是這部片。"),
    wrongAnswer("C", "棒球", "電影主軸不是棒球。")
  ]),
  bossQuestion("boss-doraemon-food", "哆啦A夢最愛", "哆啦A夢最喜歡吃的點心是什麼？", [
    wrongAnswer("A", "章魚燒", "章魚燒很好吃，但不是哆啦A夢最招牌的最愛。"),
    correctAnswer("B", "銅鑼燒", "哆啦A夢最愛吃銅鑼燒。"),
    wrongAnswer("C", "鯛魚燒", "名字很像，但答案是銅鑼燒。")
  ]),
  bossQuestion("boss-conan-identity", "名偵探柯南真身", "江戶川柯南變小前的真正身分是誰？", [
    correctAnswer("A", "工藤新一", "柯南的真實身分是高中生偵探工藤新一。"),
    wrongAnswer("B", "怪盜基德", "怪盜基德是另一位角色。"),
    wrongAnswer("C", "服部平次", "服部平次是大阪的高中生偵探。")
  ]),
  bossQuestion("boss-slam-dunk-number", "湘北 10 號", "《灌籃高手》中，湘北高中 10 號球員是誰？", [
    wrongAnswer("A", "流川楓", "流川楓是湘北 11 號。"),
    correctAnswer("B", "櫻木花道", "櫻木花道穿湘北 10 號球衣。"),
    wrongAnswer("C", "三井壽", "三井壽是湘北 14 號。")
  ]),
  bossQuestion("boss-one-piece-dream", "魯夫的夢想", "《航海王》主角魯夫最常掛在嘴邊的夢想是什麼？", [
    correctAnswer("A", "成為海賊王", "魯夫的目標就是成為海賊王。"),
    wrongAnswer("B", "成為火影", "成為火影是《火影忍者》的目標。"),
    wrongAnswer("C", "成為寶可夢大師", "這是《寶可夢》的目標。")
  ]),
  bossQuestion("boss-pikachu-type", "皮卡丘屬性", "寶可夢皮卡丘最主要的屬性是什麼？", [
    wrongAnswer("A", "火", "火屬性代表如小火龍。"),
    correctAnswer("B", "電", "皮卡丘是電屬性寶可夢。"),
    wrongAnswer("C", "水", "水屬性代表如傑尼龜。")
  ]),
  bossQuestion("boss-dragon-ball-seven", "七龍珠召喚", "在《七龍珠》中，集滿幾顆龍珠可以召喚神龍？", [
    wrongAnswer("A", "5 顆", "數量不對。"),
    correctAnswer("B", "7 顆", "七龍珠就是集滿 7 顆召喚神龍。"),
    wrongAnswer("C", "9 顆", "數量不對。")
  ]),
  bossQuestion("boss-demon-slayer-sister", "鬼滅兄妹", "《鬼滅之刃》中，竈門炭治郎的妹妹叫什麼？", [
    correctAnswer("A", "禰豆子", "炭治郎的妹妹是竈門禰豆子。"),
    wrongAnswer("B", "彌豆子", "字很像，但正式常見寫法是禰豆子。"),
    wrongAnswer("C", "日向雛田", "日向雛田是《火影忍者》的角色。")
  ]),
  bossQuestion("boss-naruto-goal", "鳴人的目標", "《火影忍者》中，漩渦鳴人最想成為什麼？", [
    wrongAnswer("A", "海賊王", "這是魯夫的目標。"),
    correctAnswer("B", "火影", "鳴人的目標是成為火影。"),
    wrongAnswer("C", "死神代理", "這是另一部作品的設定。")
  ]),
  bossQuestion("boss-harry-potter-school", "哈利波特學校", "哈利波特就讀的魔法學校叫什麼？", [
    correctAnswer("A", "霍格華茲", "哈利波特就讀霍格華茲魔法與巫術學院。"),
    wrongAnswer("B", "高譚學院", "高譚是蝙蝠俠故事中的城市。"),
    wrongAnswer("C", "X 學院", "X 學院常見於 X 戰警設定。")
  ]),
  bossQuestion("boss-star-wars-force", "星際大戰祝福", "《星際大戰》中常聽到的祝福語是什麼？", [
    wrongAnswer("A", "願鑽石與你同在", "這句不是星戰經典台詞。"),
    correctAnswer("B", "願原力與你同在", "May the Force be with you，中文常譯為願原力與你同在。"),
    wrongAnswer("C", "願光劍幫你打卡", "這是亂入的上班族版本。")
  ]),
  bossQuestion("boss-iron-man-name", "鋼鐵人本名", "漫威鋼鐵人 Iron Man 的本名是什麼？", [
    correctAnswer("A", "東尼・史塔克", "鋼鐵人是東尼・史塔克。"),
    wrongAnswer("B", "彼得・帕克", "彼得・帕克是蜘蛛人。"),
    wrongAnswer("C", "布魯斯・韋恩", "布魯斯・韋恩是蝙蝠俠。")
  ]),
  bossQuestion("boss-spider-man-name", "蜘蛛人本名", "漫威蜘蛛人 Spider-Man 最知名的本名是什麼？", [
    wrongAnswer("A", "史蒂夫・羅傑斯", "史蒂夫・羅傑斯是美國隊長。"),
    correctAnswer("B", "彼得・帕克", "蜘蛛人最知名的身分是彼得・帕克。"),
    wrongAnswer("C", "克拉克・肯特", "克拉克・肯特是超人。")
  ]),
  bossQuestion("boss-batman-city", "蝙蝠俠城市", "蝙蝠俠主要守護的城市是哪一座？", [
    wrongAnswer("A", "大都會", "大都會常見於超人故事。"),
    correctAnswer("B", "高譚市", "蝙蝠俠守護高譚市。"),
    wrongAnswer("C", "中央城", "中央城更常和閃電俠故事連在一起。")
  ]),
  bossQuestion("boss-mario-brother", "瑪利歐兄弟", "瑪利歐的弟弟叫什麼？", [
    correctAnswer("A", "路易吉", "瑪利歐的弟弟是路易吉。"),
    wrongAnswer("B", "庫巴", "庫巴是瑪利歐系列的主要反派之一。"),
    wrongAnswer("C", "奇諾比奧", "奇諾比奧是蘑菇王國的角色。")
  ]),
  bossQuestion("boss-zelda-link", "薩爾達主角辨識", "《薩爾達傳說》系列中，玩家常操作的綠衣勇者通常叫什麼？", [
    wrongAnswer("A", "薩爾達", "薩爾達通常是公主，不是綠衣勇者的名字。"),
    correctAnswer("B", "林克", "綠衣勇者通常是林克。"),
    wrongAnswer("C", "卡比", "卡比是另一個任天堂角色。")
  ]),
  bossQuestion("boss-minecraft-creeper", "Minecraft 爆炸角色", "《Minecraft》中，會靠近玩家並爆炸的經典敵對生物叫什麼？", [
    wrongAnswer("A", "Enderman", "Enderman 會瞬移，但不是最經典的爆炸角色。"),
    correctAnswer("B", "Creeper", "Creeper 會靠近玩家並爆炸。"),
    wrongAnswer("C", "Villager", "Villager 是村民，不會主動爆炸。")
  ]),
  bossQuestion("boss-taiwan-highest-mountain", "台灣最高山", "台灣最高的山是哪一座？", [
    correctAnswer("A", "玉山", "玉山是台灣最高峰。"),
    wrongAnswer("B", "阿里山", "阿里山很有名，但不是台灣最高山。"),
    wrongAnswer("C", "陽明山", "陽明山位於台北近郊，不是最高山。")
  ]),
  bossQuestion("boss-taiwan-largest-lake", "台灣最大湖泊", "台灣最知名且面積最大的天然湖泊是哪一個？", [
    wrongAnswer("A", "蓮池潭", "蓮池潭在高雄，但不是台灣最大天然湖泊。"),
    correctAnswer("B", "日月潭", "日月潭是台灣最大且最知名的天然湖泊。"),
    wrongAnswer("C", "鯉魚潭", "鯉魚潭有名，但不是這題答案。")
  ]),
  bossQuestion("boss-taiwan-trash-truck", "台灣垃圾車音樂", "台灣垃圾車最常被大家聯想到的古典音樂之一是哪一首？", [
    correctAnswer("A", "少女的祈禱", "台灣垃圾車常播放《少女的祈禱》等音樂提醒居民倒垃圾。"),
    wrongAnswer("B", "命運交響曲", "這不是最典型的台灣垃圾車音樂。"),
    wrongAnswer("C", "卡農", "卡農很常見，但不是最典型答案。")
  ]),
  bossQuestion("boss-water-boiling", "水的沸點", "在標準一大氣壓下，水的沸點約是幾度 C？", [
    wrongAnswer("A", "0 度", "0 度 C 是水的凝固點附近。"),
    correctAnswer("B", "100 度", "標準一大氣壓下水約在 100 度 C 沸騰。"),
    wrongAnswer("C", "212 度", "212 是華氏度，不是攝氏度。")
  ]),
  bossQuestion("boss-largest-planet", "太陽系最大行星", "太陽系中最大的行星是哪一顆？", [
    wrongAnswer("A", "地球", "地球不是太陽系最大行星。"),
    correctAnswer("B", "木星", "木星是太陽系最大的行星。"),
    wrongAnswer("C", "火星", "火星比地球還小。")
  ]),
  bossQuestion("boss-light-year", "光年是什麼", "「光年」是用來衡量什麼的單位？", [
    correctAnswer("A", "距離", "光年是光在一年中行進的距離。"),
    wrongAnswer("B", "時間", "名字有年，但它是距離單位。"),
    wrongAnswer("C", "亮度", "光年不是亮度單位。")
  ]),
  bossQuestion("boss-human-largest-organ", "人體最大器官", "人體最大的器官通常指哪一個？", [
    wrongAnswer("A", "心臟", "心臟很重要，但不是最大器官。"),
    correctAnswer("B", "皮膚", "皮膚是人體最大的器官。"),
    wrongAnswer("C", "肺", "肺不是人體最大器官。")
  ]),
  bossQuestion("boss-red-blood-cell", "血液運氧", "血液中主要負責運送氧氣的是哪一種細胞？", [
    correctAnswer("A", "紅血球", "紅血球中的血紅素負責攜帶氧氣。"),
    wrongAnswer("B", "白血球", "白血球主要和免疫防禦有關。"),
    wrongAnswer("C", "血小板", "血小板主要和凝血有關。")
  ]),
  bossQuestion("boss-dna-shape", "DNA 結構", "DNA 最常被形容成哪一種結構？", [
    wrongAnswer("A", "單行直線", "DNA 不是單行直線結構。"),
    correctAnswer("B", "雙螺旋", "DNA 經典結構是雙螺旋。"),
    wrongAnswer("C", "三角錐", "這不是 DNA 的常見結構描述。")
  ]),
  bossQuestion("boss-zodiac-first", "十二生肖第一位", "十二生肖排序的第一個是什麼？", [
    correctAnswer("A", "鼠", "十二生肖第一位是鼠。"),
    wrongAnswer("B", "牛", "牛是第二位。"),
    wrongAnswer("C", "虎", "虎是第三位。")
  ]),
  bossQuestion("boss-excel-after-z", "Excel 欄位", "Excel 欄位從 A 到 Z 之後，下一欄是什麼？", [
    wrongAnswer("A", "Z1", "Excel 欄位不會接 Z1。"),
    correctAnswer("B", "AA", "Excel 欄位 Z 之後是 AA。"),
    wrongAnswer("C", "AB", "AB 是 AA 的下一欄。")
  ]),
  bossQuestion("boss-http-404", "網頁 404", "瀏覽網頁時看到 HTTP 404，通常代表什麼？", [
    correctAnswer("A", "找不到頁面", "HTTP 404 通常表示 Not Found，找不到資源。"),
    wrongAnswer("B", "密碼正確", "404 和密碼正確無關。"),
    wrongAnswer("C", "伺服器正在煮咖啡", "這是玩笑，不是 HTTP 404 的意思。")
  ]),
  bossQuestion("boss-ctrl-z", "鍵盤快捷鍵", "在多數文書或編輯軟體中，Ctrl + Z 通常代表什麼？", [
    wrongAnswer("A", "儲存", "常見儲存快捷鍵是 Ctrl + S。"),
    correctAnswer("B", "復原上一動", "Ctrl + Z 通常是 Undo，復原上一動。"),
    wrongAnswer("C", "列印", "常見列印快捷鍵是 Ctrl + P。")
  ]),
  bossQuestion("boss-qr-code", "QR Code", "QR Code 中的 QR 通常代表什麼？", [
    correctAnswer("A", "Quick Response", "QR 是 Quick Response 的縮寫。"),
    wrongAnswer("B", "Quality Robot", "這不是 QR Code 的原意。"),
    wrongAnswer("C", "Quiet Radio", "這不是 QR Code 的原意。")
  ]),
  bossQuestion("boss-earth-sun", "地球公轉", "地球繞著哪個天體公轉？", [
    wrongAnswer("A", "月球", "月球繞著地球公轉。"),
    correctAnswer("B", "太陽", "地球繞太陽公轉。"),
    wrongAnswer("C", "北極星", "北極星不是地球公轉中心。")
  ]),
  bossQuestion("boss-moon-earth", "月球公轉", "月球主要繞著哪個天體公轉？", [
    correctAnswer("A", "地球", "月球繞地球公轉。"),
    wrongAnswer("B", "火星", "月球不是火星的衛星。"),
    wrongAnswer("C", "木星", "月球不是木星的衛星。")
  ]),
  bossQuestion("boss-compass-north", "指南針方向", "一般指南針的 N 代表哪個方向？", [
    wrongAnswer("A", "南方", "南方是 South，通常標 S。"),
    correctAnswer("B", "北方", "N 代表 North，北方。"),
    wrongAnswer("C", "西方", "西方是 West，通常標 W。")
  ]),
  bossQuestion("boss-temperature-freezing", "水的凝固點", "在標準狀況附近，水的凝固點約是幾度 C？", [
    correctAnswer("A", "0 度", "水在標準狀況附近約 0 度 C 凝固。"),
    wrongAnswer("B", "37 度", "37 度 C 接近人體體溫。"),
    wrongAnswer("C", "100 度", "100 度 C 是水的沸點附近。")
  ]),
  bossQuestion("boss-basketball-points", "籃球三分線", "籃球比賽中，在三分線外投進通常算幾分？", [
    wrongAnswer("A", "1 分", "1 分通常是罰球。"),
    wrongAnswer("B", "2 分", "三分線內投進通常算 2 分。"),
    correctAnswer("C", "3 分", "三分線外投進通常算 3 分。")
  ]),
  bossQuestion("boss-baseball-outs", "棒球半局出局數", "棒球比賽中，一個半局通常要幾個出局數才換邊？", [
    wrongAnswer("A", "2 個", "兩出局還沒換邊。"),
    correctAnswer("B", "3 個", "半局累積三個出局數後換邊。"),
    wrongAnswer("C", "4 個", "一般棒球半局不是四出局。")
  ]),
  bossQuestion("boss-olympic-rings", "奧運五環", "奧運標誌有幾個相扣的環？", [
    wrongAnswer("A", "4 個", "奧運標誌不是四環。"),
    correctAnswer("B", "5 個", "奧運標誌是五個相扣的環。"),
    wrongAnswer("C", "6 個", "奧運標誌不是六環。")
  ]),
  bossQuestion("boss-soccer-team-size", "足球上場人數", "正式足球比賽中，每隊同時在場上通常有幾名球員？", [
    wrongAnswer("A", "9 名", "正式足球通常不是 9 人制。"),
    correctAnswer("B", "11 名", "正式足球每隊通常 11 名球員上場。"),
    wrongAnswer("C", "15 名", "15 人較常讓人想到橄欖球。")
  ]),
  bossQuestion("boss-world-map-ocean", "世界最大洋", "地球上面積最大的洋是哪一個？", [
    correctAnswer("A", "太平洋", "太平洋是世界最大洋。"),
    wrongAnswer("B", "印度洋", "印度洋不是最大洋。"),
    wrongAnswer("C", "北冰洋", "北冰洋是最小的洋。")
  ]),
  bossQuestion("boss-japan-capital", "日本首都", "日本首都是哪一座城市？", [
    wrongAnswer("A", "大阪", "大阪是日本大城市，但不是首都。"),
    correctAnswer("B", "東京", "日本首都是東京。"),
    wrongAnswer("C", "京都", "京都是古都，但目前不是日本首都。")
  ]),
  bossQuestion("boss-korea-capital", "韓國首都", "韓國首都是哪一座城市？", [
    correctAnswer("A", "首爾", "韓國首都是首爾。"),
    wrongAnswer("B", "釜山", "釜山是韓國大城市，但不是首都。"),
    wrongAnswer("C", "濟州", "濟州是知名旅遊地，不是首都。")
  ]),
  bossQuestion("boss-france-capital", "法國首都", "法國首都是哪一座城市？", [
    wrongAnswer("A", "里昂", "里昂是法國城市，但不是首都。"),
    correctAnswer("B", "巴黎", "法國首都是巴黎。"),
    wrongAnswer("C", "馬賽", "馬賽是法國港口城市，但不是首都。")
  ]),
  bossQuestion("boss-emoji-laugh", "常見表情符號", "常見的笑到哭表情符號通常最接近哪種意思？", [
    correctAnswer("A", "笑到哭", "笑到哭表情通常表示非常好笑。"),
    wrongAnswer("B", "正在睡覺", "睡覺常用 😴 類型表情。"),
    wrongAnswer("C", "正在生氣", "生氣常用 😡 類型表情。")
  ]),
  bossQuestion("boss-line-read", "LINE 已讀", "LINE 訊息旁出現「已讀」，通常代表什麼？", [
    wrongAnswer("A", "訊息沒有送出", "沒有送出通常會有不同提示。"),
    correctAnswer("B", "對方已經看過訊息", "已讀通常代表對方已看過訊息。"),
    wrongAnswer("C", "手機正在充電", "已讀和充電無關。")
  ])
];
