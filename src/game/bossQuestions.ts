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
  bossQuestion("boss-beyblade-chant", "戰鬥陀螺口號陷阱", "戰鬥陀螺日系比賽常見開戰口號，下列何者最精準？", [
    wrongAnswer("A", "Ready Fight，Start", "這是一般對戰語感，不是戰鬥陀螺常見日系喊法。"),
    correctAnswer("B", "3、2、1，Go Shoot!", "常見喊法是「3、2、1，Go Shoot!」，不是單純 Start。"),
    wrongAnswer("C", "Let us battle, Spin On", "這是混合英文熱血台詞，不是常見口號。")
  ]),
  bossQuestion("boss-beyblade-battle-basic", "戰鬥陀螺對戰常識", "玩戰鬥陀螺時，下列何者最像正常對戰行為？", [
    correctAnswer("A", "用發射器把陀螺發射進對戰盤", "戰鬥陀螺核心就是用發射器讓陀螺在場地中對戰。"),
    wrongAnswer("B", "把陀螺拿在手上互敲，看誰比較痛", "這不是正常玩法，也不安全。"),
    wrongAnswer("C", "把陀螺當骰子丟，點數大的人贏", "陀螺不是骰子，對戰看旋轉與碰撞。")
  ]),
  bossQuestion("boss-labubu-blind-box", "Labubu 與盲盒", "近年很紅的 Labubu，最常和下列哪一種收藏玩法連在一起？", [
    wrongAnswer("A", "買菜送集點貼紙", "這比較像超市集點，不是 Labubu 熱潮的核心玩法。"),
    correctAnswer("B", "盲盒抽款與隱藏款收藏", "Labubu 常和 POP MART、盲盒、隱藏款收藏一起被討論。"),
    wrongAnswer("C", "只能在電影院看 3D 版", "Labubu 是收藏玩具，不是電影放映格式。")
  ]),
  bossQuestion("boss-blind-box-secret", "盲盒隱藏款陷阱", "玩盲盒時，下列何者最精準？", [
    wrongAnswer("A", "每盒都保證抽到隱藏款", "隱藏款通常是低機率，不是每盒保證。"),
    correctAnswer("B", "買到哪一款有隨機性，隱藏款通常更稀有", "盲盒的驚喜感來自隨機與稀有款設計。"),
    wrongAnswer("C", "拆盒前一定能從外盒知道內容物", "如果拆盒前完全知道，就不太像盲盒了。")
  ]),
  bossQuestion("boss-pokemon-card-basic", "寶可夢卡牌對戰", "寶可夢卡牌對戰中，下列何者最像合理的遊戲元素？", [
    wrongAnswer("A", "用卡牌刮出發票號碼決定勝負", "這不是寶可夢卡牌對戰規則。"),
    correctAnswer("B", "寶可夢、能量與招式搭配", "寶可夢卡牌常見玩法會牽涉寶可夢、能量與招式。"),
    wrongAnswer("C", "輸的人要把手機交給裁判保管一週", "這不是正常卡牌對戰規則。")
  ]),
  bossQuestion("boss-gashapon-random", "轉蛋玩法", "扭蛋或轉蛋最核心的樂趣，下列何者最精準？", [
    correctAnswer("A", "投入金額後隨機取得系列中的一款", "扭蛋的重點通常是系列收藏與隨機抽取。"),
    wrongAnswer("B", "每次都能指定拿展示櫃正中央那款", "通常不能完全指定款式。"),
    wrongAnswer("C", "按一次會印出電影票", "這不是轉蛋收藏的核心玩法。")
  ]),
  bossQuestion("boss-lego-play", "樂高玩法陷阱", "下列何者最像 LEGO 樂高的核心玩法？", [
    wrongAnswer("A", "積木一拆封就永久黏死，不能重組", "樂高的樂趣之一就是組裝與重組。"),
    correctAnswer("B", "用積木零件組裝、拆解、再創作", "樂高核心在組裝與創造。"),
    wrongAnswer("C", "只能拿來播放音樂，不能組東西", "這和樂高的主要玩法不符。")
  ]),
  bossQuestion("boss-tamagotchi", "電子雞照顧陷阱", "經典電子雞 / Tamagotchi 類玩具，下列何者最精準？", [
    correctAnswer("A", "需要定時餵食、清潔或互動照顧虛擬寵物", "電子雞的核心就是照顧虛擬寵物。"),
    wrongAnswer("B", "只能拿來遠端開公司會議", "這不是電子雞的用途。"),
    wrongAnswer("C", "按下去會自動變成戰鬥陀螺發射器", "電子雞和戰鬥陀螺是不同玩具。")
  ]),
  bossQuestion("boss-chiikawa", "吉伊卡哇辨識", "近年常出現在貼圖、娃娃與周邊的「吉伊卡哇」，下列何者最合理？", [
    wrongAnswer("A", "NBA 球隊名稱", "吉伊卡哇不是籃球隊。"),
    correctAnswer("B", "日本角色 IP，常被做成周邊收藏", "吉伊卡哇是近年很常見的角色周邊題材。"),
    wrongAnswer("C", "一種 SQL 資料庫指令", "這不是工程指令。")
  ]),
  bossQuestion("boss-collector-choice", "收藏理性題", "抽盲盒一直抽不到想要的隱藏款，下列何者最合理？", [
    wrongAnswer("A", "把生活費全押下去，因為下一盒一定中", "這是賭徒謬誤，不是理性收藏。"),
    correctAnswer("B", "先設定預算上限，必要時用交換或二手方式補齊", "收藏可以好玩，但仍要控制成本。"),
    wrongAnswer("C", "宣布自己已經是官方設計師", "抽不到隱藏款不會讓人變官方設計師。")
  ]),
  bossQuestion("boss-stephen-chow-not-movie", "何者不是周星馳電影", "以下何者不是周星馳電影？", [
    wrongAnswer("A", "逃學威龍", "《逃學威龍》是周星馳代表作品之一。"),
    wrongAnswer("B", "唐伯虎點秋香", "《唐伯虎點秋香》是周星馳經典喜劇。"),
    correctAnswer("C", "與龍共舞", "《與龍共舞》主要主演是劉德華，不是周星馳電影。")
  ]),
  bossQuestion("boss-stephen-chow-character-match", "周星馳角色配對", "下列電影與角色/身分配對，何者最不合理？", [
    wrongAnswer("A", "《食神》：失勢後重新找回料理初心", "這符合《食神》的主軸。"),
    correctAnswer("B", "《功夫》：主角一開始就是斧頭幫老大", "《功夫》主角不是斧頭幫老大，這個配對不合理。"),
    wrongAnswer("C", "《少林足球》：把少林功夫和足球結合", "這正是《少林足球》的核心設定。")
  ]),
  bossQuestion("boss-movie-title-elimination", "電影名稱排除", "下列何者最像把兩部周星馳電影概念混在一起的假片名？", [
    wrongAnswer("A", "九品芝麻官", "這是真實周星馳電影。"),
    correctAnswer("B", "少林食神足球", "這是把《少林足球》和《食神》硬湊在一起。"),
    wrongAnswer("C", "國產凌凌漆", "這是真實周星馳電影。")
  ]),
  bossQuestion("boss-stephen-chow-tang", "周星馳電影：唐伯虎", "《唐伯虎點秋香》片名中的「秋香」下列何者最合理？", [
    correctAnswer("A", "唐伯虎想接近的華府丫鬟", "秋香是片名中的關鍵人物。"),
    wrongAnswer("B", "少林足球隊的守門員", "這是把另一部電影混進來。"),
    wrongAnswer("C", "斧頭幫幫主的名字", "這和《功夫》較相關，不是秋香。")
  ]),
  bossQuestion("boss-stephen-chow-ling-ling", "周星馳電影：國產凌凌漆", "《國產凌凌漆》最像在惡搞哪一類影視題材？", [
    wrongAnswer("A", "校園考試片", "校園臥底比較接近《逃學威龍》。"),
    correctAnswer("B", "特務 / 間諜片", "片名和設定都明顯帶有特務片惡搞感。"),
    wrongAnswer("C", "美食實境節目", "美食主題比較接近《食神》。")
  ]),
  bossQuestion("boss-stephen-chow-justice", "周星馳電影：九品芝麻官", "下列何者最符合《九品芝麻官》的電影類型感？", [
    wrongAnswer("A", "太空科幻戰爭", "這不是《九品芝麻官》的類型。"),
    correctAnswer("B", "古裝喜劇加官場與申冤橋段", "這比較符合《九品芝麻官》的觀感。"),
    wrongAnswer("C", "韓團出道紀錄片", "這不是周星馳古裝喜劇。")
  ]),
  bossQuestion("boss-stephen-chow-comedy-king", "周星馳電影：喜劇之王", "《喜劇之王》主角最核心的身分追求，下列何者最合理？", [
    correctAnswer("A", "努力想成為演員", "這是《喜劇之王》的核心之一。"),
    wrongAnswer("B", "成為寶可夢訓練家", "這是寶可夢世界，不是這部電影。"),
    wrongAnswer("C", "組韓團當主唱", "這不是《喜劇之王》的主軸。")
  ]),
  bossQuestion("boss-stephen-chow-school", "周星馳電影：逃學威龍", "《逃學威龍》的基本設定，下列何者最合理？", [
    correctAnswer("A", "警察混入校園執行任務", "這是《逃學威龍》的主要設定。"),
    wrongAnswer("B", "廚師開發撒尿牛丸", "這比較接近《食神》。"),
    wrongAnswer("C", "外星人加入足球隊", "這不是《逃學威龍》的設定。")
  ]),
  bossQuestion("boss-stephen-chow-journey", "周星馳電影：大話西遊", "《大話西遊》最常被聯想到哪個角色或身分？", [
    wrongAnswer("A", "鋼鐵人", "鋼鐵人屬於 Marvel 超級英雄題材。"),
    correctAnswer("B", "至尊寶 / 孫悟空", "這是《大話西遊》核心角色線。"),
    wrongAnswer("C", "江戶川柯南", "柯南是日本推理動漫角色。")
  ]),
  bossQuestion("boss-kpop-not-group", "韓團辨識：何者不是韓團", "下列何者不是韓團或 K-pop 團體？", [
    wrongAnswer("A", "BLACKPINK", "BLACKPINK 是韓國女團。"),
    wrongAnswer("B", "BTS", "BTS 是韓國男團。"),
    correctAnswer("C", "斧頭幫", "斧頭幫是《功夫》裡的幫派，不是韓團。")
  ]),
  bossQuestion("boss-kpop-blackpink-fandom", "韓團粉絲名：BLACKPINK", "BLACKPINK 的粉絲常被稱為什麼？", [
    wrongAnswer("A", "ARMY", "ARMY 是 BTS 粉絲名。"),
    correctAnswer("B", "BLINK", "BLINK 是 BLACKPINK 常見粉絲名。"),
    wrongAnswer("C", "ONCE", "ONCE 是 TWICE 粉絲名。")
  ]),
  bossQuestion("boss-kpop-bts-fandom", "韓團粉絲名：BTS", "BTS 的粉絲常被稱為什麼？", [
    correctAnswer("A", "ARMY", "ARMY 是 BTS 的代表粉絲名。"),
    wrongAnswer("B", "BLINK", "BLINK 是 BLACKPINK 粉絲名。"),
    wrongAnswer("C", "VIP", "VIP 常和 BIGBANG 粉絲名連在一起，不是 BTS。")
  ]),
  bossQuestion("boss-kpop-twice-fandom", "韓團粉絲名：TWICE", "TWICE 的粉絲名，下列何者最精準？", [
    wrongAnswer("A", "STAY", "STAY 是 Stray Kids 粉絲名。"),
    correctAnswer("B", "ONCE", "TWICE 與 ONCE 是經典粉絲名配對。"),
    wrongAnswer("C", "BLINK", "BLINK 是 BLACKPINK 粉絲名。")
  ]),
  bossQuestion("boss-kpop-seventeen-count", "韓團陷阱：SEVENTEEN", "韓團 SEVENTEEN 的團名是 17，但成員數下列何者最合理？", [
    wrongAnswer("A", "17 人", "團名是 SEVENTEEN，但成員數不是 17。"),
    correctAnswer("B", "13 人", "SEVENTEEN 常見成員數是 13 人。"),
    wrongAnswer("C", "4 人", "4 人更像 BLACKPINK 或 aespa 的成員數。")
  ]),
  bossQuestion("boss-kpop-aespa-concept", "韓團概念：aespa", "aespa 早期最常被聯想到的概念，下列何者最合理？", [
    wrongAnswer("A", "只唱古典歌劇，完全沒有舞蹈", "這不是 aespa 的主流印象。"),
    correctAnswer("B", "avatar / 虛擬世界概念", "aespa 早期以 avatar、虛擬世界等概念受到討論。"),
    wrongAnswer("C", "專門拍周星馳續集", "這不是韓團概念。")
  ]),
  bossQuestion("boss-kpop-ive", "韓團辨識：IVE", "下列哪一組最像 IVE 相關線索？", [
    wrongAnswer("A", "少林足球、食神、唐伯虎", "這組是周星馳電影線索。"),
    correctAnswer("B", "K-pop 女團、Wonyoung、Yujin", "Wonyoung、Yujin 常和 IVE 連在一起。"),
    wrongAnswer("C", "寶可夢、能量卡、進化", "這是寶可夢卡牌線索。")
  ]),
  bossQuestion("boss-kpop-newjeans", "韓團辨識：NewJeans", "下列哪一個最像 NewJeans 相關歌曲或線索？", [
    correctAnswer("A", "Hype Boy", "Hype Boy 是 NewJeans 常被聯想到的歌曲。"),
    wrongAnswer("B", "少林食神足球", "這是假周星馳片名。"),
    wrongAnswer("C", "3、2、1，Go Shoot", "這是戰鬥陀螺口號。")
  ]),
  bossQuestion("boss-kpop-stray-kids", "韓團粉絲名：Stray Kids", "Stray Kids 的粉絲常被稱為什麼？", [
    wrongAnswer("A", "ONCE", "ONCE 是 TWICE 粉絲名。"),
    correctAnswer("B", "STAY", "STAY 是 Stray Kids 粉絲名。"),
    wrongAnswer("C", "BLINK", "BLINK 是 BLACKPINK 粉絲名。")
  ]),
  bossQuestion("boss-kpop-babymonster", "韓團辨識：BABYMONSTER", "BABYMONSTER 下列何者最合理？", [
    correctAnswer("A", "YG Entertainment 推出的 K-pop 女團", "BABYMONSTER 是 YG 推出的女團。"),
    wrongAnswer("B", "周星馳電影裡的少林足球隊名", "這不是周星馳電影隊名。"),
    wrongAnswer("C", "寶可夢卡牌裡的能量卡種類", "這不是寶可夢能量卡。")
  ]),
  bossQuestion("boss-kpop-lightstick", "韓團應援棒", "韓團演唱會常見的 light stick，中文通常最接近下列哪個說法？", [
    wrongAnswer("A", "投影機遙控器", "演唱會應援棒不是控制投影機用。"),
    correctAnswer("B", "應援棒", "light stick 常被稱為應援棒。"),
    wrongAnswer("C", "陀螺發射器", "這是戰鬥陀螺用品。")
  ]),
  bossQuestion("boss-kpop-dance-challenge", "韓團短影音挑戰", "K-pop 新歌宣傳常見 dance challenge，最常在做什麼？", [
    correctAnswer("A", "用副歌舞步或招牌動作讓大家跟拍", "短影音舞蹈挑戰常靠副歌 hook 和招牌動作擴散。"),
    wrongAnswer("B", "大家一起背 SQL 語法", "這不是 K-pop dance challenge。"),
    wrongAnswer("C", "把戰鬥陀螺發射到舞台下", "這不是正常舞台宣傳。")
  ]),
  bossQuestion("boss-kpop-lisa", "韓團成員：Lisa", "BLACKPINK 成員 Lisa 的出身背景，下列何者最常被提到？", [
    wrongAnswer("A", "加拿大渥太華市長", "這和 Lisa 無關。"),
    correctAnswer("B", "來自泰國", "Lisa 常被提到是來自泰國的 BLACKPINK 成員。"),
    wrongAnswer("C", "周星馳電影《食神》角色", "Lisa 不是《食神》角色。")
  ]),
  bossQuestion("boss-kpop-bts-count", "韓團成員數：BTS", "BTS 最常見的成員數，下列何者正確？", [
    wrongAnswer("A", "4 人", "4 人比較像 BLACKPINK。"),
    correctAnswer("B", "7 人", "BTS 常見成員數是 7 人。"),
    wrongAnswer("C", "13 人", "13 人更像 SEVENTEEN。")
  ]),
  bossQuestion("boss-squid-game", "影集：魷魚遊戲", "韓國影集《魷魚遊戲》最常被聯想到下列哪種元素？", [
    correctAnswer("A", "童年遊戲被改造成高壓生存競賽", "這是《魷魚遊戲》的代表設定。"),
    wrongAnswer("B", "四位女團成員出道實錄", "這不是《魷魚遊戲》的主軸。"),
    wrongAnswer("C", "寶可夢卡牌世界大賽", "這是卡牌遊戲題材，不是該影集。")
  ]),
  bossQuestion("boss-conan-apotoxin", "動漫：名偵探柯南", "《名偵探柯南》中，讓主角身體變小的藥物代號常被寫成哪一個？", [
    wrongAnswer("A", "AKB48", "這是日本偶像團體相關名稱，不是柯南藥物代號。"),
    correctAnswer("B", "APTX 4869", "APTX 4869 是柯南作品中的關鍵藥物代號。"),
    wrongAnswer("C", "HTTP 404", "這是網頁狀態碼，不是動漫藥物代號。")
  ]),
  bossQuestion("boss-one-piece", "動漫：海賊王", "《海賊王》主角魯夫最核心的目標，下列何者最合理？", [
    wrongAnswer("A", "成為火影", "成為火影是《火影忍者》的目標語境。"),
    correctAnswer("B", "成為海賊王", "這是魯夫的核心目標。"),
    wrongAnswer("C", "成為食神", "這是周星馳電影語境。")
  ]),
  bossQuestion("boss-slam-dunk", "動漫：灌籃高手", "《灌籃高手》最核心的運動主題是什麼？", [
    wrongAnswer("A", "棒球", "棒球不是《灌籃高手》的核心。"),
    correctAnswer("B", "籃球", "《灌籃高手》是籃球題材作品。"),
    wrongAnswer("C", "花式滑冰", "這不是作品主題。")
  ]),
  bossQuestion("boss-demon-slayer", "動漫：鬼滅之刃", "《鬼滅之刃》中獵鬼者常使用的刀，下列何者最合理？", [
    correctAnswer("A", "日輪刀", "日輪刀是作品中獵鬼者的重要武器。"),
    wrongAnswer("B", "寶可夢球", "寶可夢球屬於寶可夢世界。"),
    wrongAnswer("C", "應援棒", "應援棒是演唱會用品。")
  ]),
  bossQuestion("boss-harry-potter-house", "電影：哈利波特", "《哈利波特》中霍格華茲分院，下列何者是合理組合？", [
    wrongAnswer("A", "斧頭幫、食神幫、少林幫", "這是亂混周星馳元素。"),
    correctAnswer("B", "葛來分多、史萊哲林、雷文克勞、赫夫帕夫", "這是霍格華茲四學院。"),
    wrongAnswer("C", "ARMY、BLINK、ONCE、STAY", "這是韓團粉絲名組合。")
  ]),
  bossQuestion("boss-marvel-dc", "電影宇宙辨識", "下列角色配對，何者最合理？", [
    correctAnswer("A", "鋼鐵人：Marvel", "鋼鐵人屬於 Marvel 角色。"),
    wrongAnswer("B", "蝙蝠俠：Marvel", "蝙蝠俠通常屬於 DC。"),
    wrongAnswer("C", "孫悟空：BLACKPINK", "孫悟空不是 BLACKPINK 成員。")
  ]),
  bossQuestion("boss-frozen", "電影：冰雪奇緣", "《冰雪奇緣》中，下列哪一組姐妹最合理？", [
    correctAnswer("A", "Elsa 與 Anna", "Elsa 和 Anna 是《冰雪奇緣》的核心姐妹。"),
    wrongAnswer("B", "Lisa 與 Rosé", "這是 BLACKPINK 成員，不是冰雪奇緣姐妹。"),
    wrongAnswer("C", "唐伯虎與秋香", "這是周星馳電影人物。")
  ]),
  bossQuestion("boss-taiwan-trash-music", "台灣生活：垃圾車音樂陷阱", "台灣垃圾車常見音樂，下列何者最合理？", [
    correctAnswer("A", "常聽到《少女的祈禱》", "這是台灣垃圾車常被聯想到的音樂之一。"),
    wrongAnswer("B", "固定只播放國歌，且全台完全一致", "垃圾車音樂不只這一種，且不是全台完全一致。"),
    wrongAnswer("C", "播放音樂代表不能倒垃圾", "通常是提醒居民垃圾車來了。")
  ]),
  bossQuestion("boss-idiom-chai-qiang", "成語誤用：差強人意", "「差強人意」在傳統語義中，下列何者最精準？", [
    wrongAnswer("A", "差到讓人不能接受", "這是常見誤解。"),
    correctAnswer("B", "大致還能令人滿意", "差強人意原意偏向還算能振奮人心、勉強令人滿意。"),
    wrongAnswer("C", "完全超出期待", "它不是滿分稱讚。")
  ]),
  bossQuestion("boss-idiom-bu-kan", "成語誤用：不刊之論", "「不刊之論」下列何者最精準？", [
    wrongAnswer("A", "不能刊登的言論", "這是望文生義。"),
    correctAnswer("B", "不可磨滅、不可改動的定論", "「刊」有削改之意，不是不准出版。"),
    wrongAnswer("C", "一定會被退稿的文章", "這不是成語本義。")
  ]),
  bossQuestion("boss-timezone-taipei-london", "時區換算", "台北晚上 9 點要連線倫敦朋友，倫敦若是 UTC+0，下列何者最合理？", [
    correctAnswer("A", "倫敦同日中午 1 點", "台北 UTC+8，比倫敦快 8 小時。"),
    wrongAnswer("B", "倫敦同日晚上 9 點", "這忽略了時差。"),
    wrongAnswer("C", "倫敦隔日清晨 5 點", "這是把方向算反了。")
  ]),
  bossQuestion("boss-science-ph", "科學小題：酸鹼值", "兩杯飲料 pH 分別為 3 與 5，下列何者最精準？", [
    correctAnswer("A", "pH 3 比 pH 5 酸性強，而且約強 100 倍", "pH 每差 1 是 10 倍氫離子濃度差，差 2 約 100 倍。"),
    wrongAnswer("B", "pH 5 比 pH 3 酸性強", "pH 越低酸性越強。"),
    wrongAnswer("C", "pH 3 只比 pH 5 酸一點點，約 2 倍", "pH 是對數尺度，不是線性差距。")
  ]),
  bossQuestion("boss-astronomy-light-year", "科學小題：光年", "下列何者不是光年的正確描述？", [
    wrongAnswer("A", "它是距離單位", "光年是光一年走過的距離。"),
    correctAnswer("B", "它是時間單位，等於一年", "名字有年，但光年不是時間單位。"),
    wrongAnswer("C", "它常用於天文尺度", "這是正確用法。")
  ]),
  bossQuestion("boss-line-read-trap", "LINE 已讀陷阱", "LINE 出現已讀後，下列何者最精準？", [
    wrongAnswer("A", "代表對方一定同意你的內容", "已讀只代表看過，不代表同意。"),
    correctAnswer("B", "代表訊息通常已被對方開啟查看", "已讀的基本語意是訊息已被查看。"),
    wrongAnswer("C", "代表訊息一定沒有成功送達", "成功送達與已讀是不同狀態。")
  ])
];
