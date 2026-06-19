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
  bossQuestion("boss-idiom-chai-qiang", "成語誤用：差強人意", "「差強人意」在傳統語義中，下列何者最精準？", [
    wrongAnswer("A", "差到讓人不能接受", "這是常見誤解。"),
    correctAnswer("B", "大致還能令人滿意", "差強人意原意偏向還算能振奮人心、勉強令人滿意。"),
    wrongAnswer("C", "完全超出期待", "它不是滿分稱讚。")
  ]),
  bossQuestion("boss-idiom-qi-yue", "成語誤用：七月流火", "「七月流火」下列何者不是正確理解？", [
    correctAnswer("A", "天氣熱到像火在流", "這是常見誤用；原意和暑熱不是同一件事。"),
    wrongAnswer("B", "可用來指天氣轉涼的時節感", "傳統語境不是形容酷熱。"),
    wrongAnswer("C", "和星象、時節變化有關", "這比直接解成很熱更接近原意。")
  ]),
  bossQuestion("boss-idiom-bu-kan", "成語誤用：不刊之論", "「不刊之論」下列何者最精準？", [
    wrongAnswer("A", "不能刊登的言論", "這是望文生義。"),
    correctAnswer("B", "不可磨滅、不可改動的定論", "「刊」有削改之意，不是不准出版。"),
    wrongAnswer("C", "一定會被退稿的文章", "這不是成語本義。")
  ]),
  bossQuestion("boss-idiom-shou-zhu", "成語情境判斷", "下列何者最適合用「守株待兔」形容？", [
    wrongAnswer("A", "每天固定練習，等待成績進步", "這是持續努力，不是守株待兔。"),
    correctAnswer("B", "一次偶然成功後，就只等同樣好運再發生", "守株待兔重點是把偶然當常態。"),
    wrongAnswer("C", "觀察市場後再決定策略", "這是等待資訊，不是盲等好運。")
  ]),
  bossQuestion("boss-logic-liars", "邏輯：誰說謊", "三人中只有一人說謊。甲說乙說謊，乙說丙說謊，丙說甲乙都說真話。下列何者最合理？", [
    correctAnswer("A", "丙說謊", "若甲乙都真，丙的話也會真，矛盾；檢查可得丙為唯一說謊者。"),
    wrongAnswer("B", "甲說謊", "若甲說謊，乙不說謊；再推會讓丙狀態不一致。"),
    wrongAnswer("C", "乙說謊", "若乙說謊，丙不說謊，會推出甲乙都真而矛盾。")
  ]),
  bossQuestion("boss-logic-syllogism", "邏輯：必然推出", "已知所有 A 都是 B，且有些 B 是 C。下列何者必然成立？", [
    wrongAnswer("A", "有些 A 一定是 C", "有些 B 是 C，不代表那些 B 來自 A。"),
    wrongAnswer("B", "所有 C 都是 A", "題目完全沒有給 C 到 A 的充分條件。"),
    correctAnswer("C", "若某物是 A，則它一定是 B", "這是第一句直接給出的必然關係。")
  ]),
  bossQuestion("boss-logic-probability-dice", "機率：兩顆骰子", "同時擲兩顆公平六面骰，下列何者是點數和為 7 的機率？", [
    wrongAnswer("A", "1/12", "和為 7 有 6 種組合，不是 3 種。"),
    correctAnswer("B", "1/6", "36 種等可能結果中有 6 種和為 7，所以是 1/6。"),
    wrongAnswer("C", "1/3", "1/3 太高，和為 7 沒有 12 種組合。")
  ]),
  bossQuestion("boss-probability-monty", "機率：換門問題", "三門選獎，一開始選一門，主持人打開另一扇沒獎的門。若主持人知道獎在哪，下列策略何者最合理？", [
    wrongAnswer("A", "堅持原門，中獎率 2/3", "原門中獎率仍是 1/3。"),
    correctAnswer("B", "換門，中獎率 2/3", "主持人排除一扇空門後，換門吃到原本 2/3 的機率。"),
    wrongAnswer("C", "換不換都一定是 1/2", "這忽略主持人知道答案並刻意開空門的條件。")
  ]),
  bossQuestion("boss-probability-compound", "複利直覺", "100 元連續兩年各成長 10%，下列何者最精準？", [
    wrongAnswer("A", "兩年後剛好 120 元", "複利第二年是以 110 為基礎再成長。"),
    correctAnswer("B", "兩年後 121 元", "100 * 1.1 * 1.1 = 121。"),
    wrongAnswer("C", "兩年後 110 元", "這只算了一年。")
  ]),
  bossQuestion("boss-bayes-test", "機率：偽陽性陷阱", "某病盛行率 1%，檢測敏感度 99%、偽陽性率 5%。若檢測陽性，下列何者最合理？", [
    correctAnswer("A", "不能直接說有 99% 機率真的有病", "低盛行率會讓偽陽性占比變高，需要用貝氏思考。"),
    wrongAnswer("B", "一定真的有病", "檢測不是完美，且偽陽性率不低。"),
    wrongAnswer("C", "一定沒有病", "陽性仍提高了罹病可能，不是零。")
  ]),
  bossQuestion("boss-timezone-taipei-london", "時區換算", "2026 年 1 月 1 日台北 09:00，倫敦採 UTC+0。下列何者最合理？", [
    correctAnswer("A", "倫敦同日 01:00", "台北 UTC+8，比倫敦快 8 小時。"),
    wrongAnswer("B", "倫敦同日 17:00", "這是把方向加反了。"),
    wrongAnswer("C", "倫敦前一日 01:00", "09:00 減 8 小時仍是同日 01:00。")
  ]),
  bossQuestion("boss-date-line", "國際換日線", "從夏威夷往西飛到日本，跨過國際換日線時，下列何者最合理？", [
    wrongAnswer("A", "日期通常往回一天", "往西跨越換日線通常日期往前加一天。"),
    correctAnswer("B", "日期通常往前一天", "往西跨越國際換日線，日期通常加一天。"),
    wrongAnswer("C", "日期完全不變，只改小時", "跨換日線會牽涉日期改變。")
  ]),
  bossQuestion("boss-leap-year", "閏年規則", "下列哪一年不是閏年？", [
    wrongAnswer("A", "2000 年", "能被 400 整除，所以 2000 年是閏年。"),
    correctAnswer("B", "1900 年", "能被 100 整除但不能被 400 整除，所以不是閏年。"),
    wrongAnswer("C", "2024 年", "2024 能被 4 整除且不是百年例外，是閏年。")
  ]),
  bossQuestion("boss-astronomy-venus", "天文：最熱行星陷阱", "下列何者最精準說明金星比水星更熱的原因？", [
    wrongAnswer("A", "金星離太陽比水星更近", "金星其實比水星離太陽遠。"),
    correctAnswer("B", "金星濃厚大氣造成強烈溫室效應", "金星高溫主因是濃厚大氣與溫室效應。"),
    wrongAnswer("C", "金星沒有自轉", "金星自轉很慢，但不是這題主因。")
  ]),
  bossQuestion("boss-astronomy-light-year", "天文：光年", "下列何者不是光年的正確描述？", [
    wrongAnswer("A", "它是距離單位", "光年是光一年走過的距離。"),
    correctAnswer("B", "它是時間單位，等於一年", "名字有年，但光年不是時間單位。"),
    wrongAnswer("C", "它常用於天文尺度", "這是正確用法。")
  ]),
  bossQuestion("boss-science-ph", "酸鹼值判斷", "兩杯溶液 pH 分別為 3 與 5，下列何者最精準？", [
    correctAnswer("A", "pH 3 比 pH 5 酸性強，而且約強 100 倍", "pH 每差 1 是 10 倍氫離子濃度差，差 2 是約 100 倍。"),
    wrongAnswer("B", "pH 5 比 pH 3 酸性強", "pH 越低酸性越強。"),
    wrongAnswer("C", "pH 3 只比 pH 5 酸一點點，約 2 倍", "pH 是對數尺度，不是線性差距。")
  ]),
  bossQuestion("boss-science-dna-rna", "生物：DNA/RNA 差異", "下列何者最精準區分 DNA 與 RNA 的常見鹼基差異？", [
    wrongAnswer("A", "DNA 有尿嘧啶 U，RNA 有胸腺嘧啶 T", "這剛好反了。"),
    correctAnswer("B", "DNA 常見 T，RNA 常見 U", "DNA 常用 T，RNA 常用 U。"),
    wrongAnswer("C", "DNA 和 RNA 鹼基完全相同", "兩者在 T/U 上有常見差異。")
  ]),
  bossQuestion("boss-science-correlation", "統計：相關不等於因果", "下列何者最精準描述「相關不等於因果」？", [
    wrongAnswer("A", "只要兩件事一起變化，就能證明前者造成後者", "一起變化不代表因果。"),
    correctAnswer("B", "兩變數相關可能來自第三因素或反向因果", "這是相關不等於因果的核心。"),
    wrongAnswer("C", "相關係數越高，樣本就一定越大", "相關係數大小不直接等於樣本量。")
  ]),
  bossQuestion("boss-stat-pvalue", "統計：p-value", "關於 p-value，下列何者最精準？", [
    wrongAnswer("A", "p=0.03 表示虛無假設有 3% 機率為真", "p-value 不是假設為真的機率。"),
    correctAnswer("B", "在虛無假設為真時，觀察到目前或更極端資料的機率", "這是 p-value 的標準解釋方向。"),
    wrongAnswer("C", "p 越小，效果量一定越大", "p-value 也受樣本數影響，不能直接等於效果量。")
  ]),
  bossQuestion("boss-web-http-method", "Web：HTTP 方法", "下列何者不是 HTTP 方法語意的常見理解？", [
    wrongAnswer("A", "GET 通常用於取得資源", "這是常見語意。"),
    wrongAnswer("B", "POST 常用於建立或提交資料", "這是常見語意。"),
    correctAnswer("C", "DELETE 通常用於查詢資料且絕不改變狀態", "DELETE 語意上是刪除資源，不是查詢。")
  ]),
  bossQuestion("boss-web-status-code", "Web：狀態碼判斷", "下列何者最精準配對 HTTP 狀態碼？", [
    correctAnswer("A", "404：找不到資源", "404 Not Found 是找不到資源。"),
    wrongAnswer("B", "500：使用者密碼錯誤", "密碼錯誤通常不是 500，500 是伺服器內部錯誤。"),
    wrongAnswer("C", "301：暫時重新導向", "301 是永久重新導向，暫時常見為 302/307。")
  ]),
  bossQuestion("boss-sql-where-having", "SQL：WHERE/HAVING", "下列何者最精準描述 SQL 的 WHERE 與 HAVING？", [
    correctAnswer("A", "WHERE 篩選分組前資料，HAVING 篩選分組後聚合結果", "這是 WHERE/HAVING 的典型差異。"),
    wrongAnswer("B", "HAVING 一定比 WHERE 先執行", "語意上 HAVING 用於分組聚合後的條件。"),
    wrongAnswer("C", "WHERE 只能用在 SELECT *，不能搭配 GROUP BY", "WHERE 可以和 GROUP BY 搭配。")
  ]),
  bossQuestion("boss-css-specificity", "CSS：優先權", "下列 CSS selector specificity 由高到低，何者最合理？", [
    wrongAnswer("A", "元素 > class > id", "id 的 specificity 高於 class 和元素。"),
    correctAnswer("B", "id > class > 元素", "一般情況下 id selector 權重高於 class，高於元素。"),
    wrongAnswer("C", "class > id > 元素", "class 不高於 id。")
  ]),
  bossQuestion("boss-git-merge-rebase", "Git：merge/rebase", "下列何者最精準描述 rebase 的風險？", [
    correctAnswer("A", "它會改寫 commit history，已共享分支需小心", "rebase 會重寫 commit，公開共享歷史要謹慎。"),
    wrongAnswer("B", "它只會新增 merge commit，永遠不改 commit hash", "這比較像 merge 的常見行為，不是 rebase。"),
    wrongAnswer("C", "它會自動刪除遠端分支", "rebase 不等於刪遠端分支。")
  ]),
  bossQuestion("boss-binary-decimal", "二進位轉換", "二進位 10110 轉成十進位，下列何者正確？", [
    wrongAnswer("A", "18", "10110 = 16 + 4 + 2，不是 18。"),
    correctAnswer("B", "22", "10110₂ = 16 + 4 + 2 = 22。"),
    wrongAnswer("C", "26", "26 會需要 16 + 8 + 2。")
  ]),
  bossQuestion("boss-excel-absolute", "Excel：絕對參照", "Excel 公式中的 `$A$1`，下列何者最精準？", [
    correctAnswer("A", "欄 A 和列 1 都被鎖定", "$ 放在欄與列前，表示欄列都絕對參照。"),
    wrongAnswer("B", "只鎖定欄 A，不鎖定列 1", "只鎖欄會寫成 `$A1`。"),
    wrongAnswer("C", "只鎖定列 1，不鎖定欄 A", "只鎖列會寫成 `A$1`。")
  ]),
  bossQuestion("boss-regex-digit", "Regex：\\d", "在多數正規表示式語境中，`\\d+` 最常表示什麼？", [
    wrongAnswer("A", "一個或多個英文字母", "英文字母通常不是用 \\d 表示。"),
    correctAnswer("B", "一個或多個數字", "\\d 表示 digit，+ 表示一個或多個。"),
    wrongAnswer("C", "剛好一個任意字元", "任意字元通常用 .，不是 \\d+。")
  ]),
  bossQuestion("boss-dns-role", "網路：DNS", "下列何者最精準描述 DNS 的主要功能？", [
    correctAnswer("A", "把網域名稱解析到對應的位址資訊", "DNS 主要負責名稱解析。"),
    wrongAnswer("B", "加密所有網頁內容", "加密主要是 TLS/HTTPS 的工作。"),
    wrongAnswer("C", "壓縮圖片讓網頁更快", "這不是 DNS 的主要功能。")
  ]),
  bossQuestion("boss-qr-error-correction", "QR Code：容錯", "QR Code 即使被遮住一小部分仍可能讀取，下列何者最合理？", [
    wrongAnswer("A", "因為 QR Code 沒有任何資料，只是圖案", "QR Code 內含編碼資料。"),
    correctAnswer("B", "因為 QR Code 有錯誤修正能力", "QR Code 支援不同等級的錯誤修正。"),
    wrongAnswer("C", "因為手機會上網猜答案", "讀取不是靠手機任意猜測內容。")
  ]),
  bossQuestion("boss-taiwan-tropic", "台灣地理：北回歸線", "下列何者最精準？北回歸線在台灣大致通過哪些區域？", [
    wrongAnswer("A", "台北與基隆一帶", "北回歸線不在北台灣。"),
    correctAnswer("B", "嘉義、花蓮一帶", "北回歸線通過台灣中南部，常見標誌在嘉義、花蓮等地。"),
    wrongAnswer("C", "屏東最南端", "北回歸線不在台灣最南端。")
  ]),
  bossQuestion("boss-taiwan-mountains", "台灣地理：山脈判斷", "下列何者最精準描述中央山脈對台灣地理的影響？", [
    correctAnswer("A", "大致形成東西部氣候與交通的天然分隔", "中央山脈是台灣重要地形骨幹。"),
    wrongAnswer("B", "它位於澎湖，主要影響離島潮汐", "中央山脈在台灣本島，不在澎湖。"),
    wrongAnswer("C", "它讓台灣完全沒有颱風雨影", "地形會造成雨影與迎風差異，不是完全沒有。")
  ]),
  bossQuestion("boss-taiwan-trash-music", "台灣生活：垃圾車音樂陷阱", "台灣垃圾車常見音樂，下列何者最合理？", [
    correctAnswer("A", "常聽到《少女的祈禱》", "這是台灣垃圾車常被聯想到的音樂之一。"),
    wrongAnswer("B", "固定只播放國歌，且全台完全一致", "垃圾車音樂不只這一種，且不是全台完全一致。"),
    wrongAnswer("C", "播放音樂代表不能倒垃圾", "通常是提醒居民垃圾車來了。")
  ]),
  bossQuestion("boss-chess-stalemate", "西洋棋：逼和", "西洋棋中，輪到某方走但沒有合法步，且國王沒有被將軍，下列何者最精準？", [
    correctAnswer("A", "stalemate，通常判和局", "沒有合法步且未被將軍是 stalemate。"),
    wrongAnswer("B", "checkmate，該方輸", "checkmate 需要國王正在被將軍且無法解除。"),
    wrongAnswer("C", "該方必須跳過一手", "西洋棋通常不能跳過回合。")
  ]),
  bossQuestion("boss-go-komi", "圍棋：貼目概念", "圍棋中的貼目，最主要是為了處理什麼？", [
    wrongAnswer("A", "讓棋盤變成 20 路", "貼目不改變棋盤大小。"),
    correctAnswer("B", "補償黑棋先手優勢", "貼目通常是給白方分數補償，平衡黑先。"),
    wrongAnswer("C", "禁止打劫", "打劫有另外的規則處理。")
  ]),
  bossQuestion("boss-basketball-free-throw", "籃球：分數判斷", "下列籃球得分配對，何者不是一般規則下的正確配對？", [
    wrongAnswer("A", "罰球進：1 分", "罰球進通常 1 分。"),
    wrongAnswer("B", "三分線外投進：3 分", "三分線外投進通常 3 分。"),
    correctAnswer("C", "三分線內投進：3 分", "三分線內一般投籃進是 2 分。")
  ]),
  bossQuestion("boss-baseball-force-play", "棒球：封殺概念", "棒球中一壘有人、打者擊出滾地球時，一壘跑者被迫往二壘，下列何者最合理？", [
    correctAnswer("A", "守備方踩二壘即可封殺該跑者", "被迫進壘時可用封殺。"),
    wrongAnswer("B", "一定要觸碰跑者本人才能出局", "封殺狀況不一定要觸殺本人。"),
    wrongAnswer("C", "一壘跑者可以選擇留在一壘不動", "打者跑向一壘時，原一壘跑者被迫前進。")
  ]),
  bossQuestion("boss-soccer-offside", "足球：越位直覺", "足球越位判定中，下列何者最精準？", [
    wrongAnswer("A", "只要站在對方半場就一定越位", "位置只是條件之一，還要看傳球時機與倒數第二名防守者等。"),
    correctAnswer("B", "傳球瞬間位置與參與進攻都很重要", "越位不是只看接球後位置，也看傳球瞬間與是否參與。"),
    wrongAnswer("C", "守門員前面有一名防守者就永遠不越位", "通常要看倒數第二名防守者，不是只看守門員。")
  ]),
  bossQuestion("boss-world-ocean-size", "地理：世界最大洋", "下列何者最精準？", [
    correctAnswer("A", "太平洋是面積最大的洋", "太平洋是世界最大洋。"),
    wrongAnswer("B", "北冰洋是面積最大的洋", "北冰洋是最小的洋。"),
    wrongAnswer("C", "印度洋比太平洋大", "印度洋不比太平洋大。")
  ]),
  bossQuestion("boss-capital-trap", "地理：首都陷阱", "下列首都配對，何者正確？", [
    wrongAnswer("A", "澳洲：雪梨", "澳洲首都是坎培拉，不是雪梨。"),
    correctAnswer("B", "加拿大：渥太華", "加拿大首都是渥太華。"),
    wrongAnswer("C", "巴西：里約熱內盧", "巴西首都是巴西利亞。")
  ]),
  bossQuestion("boss-roman-xl", "羅馬數字", "羅馬數字 XL 表示多少？", [
    wrongAnswer("A", "60", "LX 才是 60。"),
    correctAnswer("B", "40", "X 在 L 前面代表 50 - 10 = 40。"),
    wrongAnswer("C", "90", "XC 才是 90。")
  ]),
  bossQuestion("boss-order-operations", "四則運算順序", "算式 6 + 2 * 5 的結果，下列何者正確？", [
    wrongAnswer("A", "40", "這是先做 6+2 再乘 5，但一般先乘除後加減。"),
    correctAnswer("B", "16", "先算 2*5=10，再加 6 得 16。"),
    wrongAnswer("C", "30", "這不是一般運算順序結果。")
  ]),
  bossQuestion("boss-family-relationship", "親屬稱謂推理", "「媽媽的哥哥」在中文親屬稱謂中最常稱為什麼？", [
    correctAnswer("A", "舅舅", "母親的兄弟通常稱舅舅。"),
    wrongAnswer("B", "伯伯", "伯伯通常是父親的哥哥。"),
    wrongAnswer("C", "叔叔", "叔叔通常是父親的弟弟或泛稱男性長輩。")
  ]),
  bossQuestion("boss-language-loanword", "語言：外來語判斷", "下列何者最像日文外來語進入中文後的生活用法？", [
    wrongAnswer("A", "望梅止渴", "這是中文成語。"),
    correctAnswer("B", "便當", "便當常被視為由日語 bento 影響進入中文生活語彙。"),
    wrongAnswer("C", "畫蛇添足", "這是中文成語。")
  ]),
  bossQuestion("boss-memory-ranking", "排序題：朝代", "下列中國朝代先後排序，哪一組最合理？", [
    wrongAnswer("A", "唐 → 秦 → 明", "秦遠早於唐。"),
    correctAnswer("B", "秦 → 唐 → 明", "秦在前，唐居中，明較後。"),
    wrongAnswer("C", "明 → 唐 → 秦", "這是完全倒序。")
  ]),
  bossQuestion("boss-history-taiwan", "台灣史：年代排序", "下列台灣相關事件的時間先後，哪一組最合理？", [
    correctAnswer("A", "荷西時期 → 清領時期 → 日治時期", "這是大致正確的歷史階段順序。"),
    wrongAnswer("B", "日治時期 → 荷西時期 → 清領時期", "日治不會早於荷西時期。"),
    wrongAnswer("C", "清領時期 → 日治時期 → 荷西時期", "荷西時期更早。")
  ]),
  bossQuestion("boss-economics-inflation", "經濟：通膨判斷", "下列何者最精準描述通膨？", [
    wrongAnswer("A", "所有商品價格每天都必須上漲才叫通膨", "通膨看整體物價水準，不要求所有商品每天都漲。"),
    correctAnswer("B", "整體物價水準持續上升，貨幣購買力下降", "這是通膨的核心概念。"),
    wrongAnswer("C", "股票下跌就一定是通膨", "股票下跌不等於通膨。")
  ]),
  bossQuestion("boss-finance-risk", "投資：風險分散", "下列何者最精準描述分散投資？", [
    wrongAnswer("A", "買很多張同一家公司的股票就是分散", "同家公司風險仍高度集中。"),
    correctAnswer("B", "把資產分散到不同標的或類別，降低單一事件衝擊", "這是分散投資的目的。"),
    wrongAnswer("C", "分散後就一定不會虧損", "分散降低部分風險，但不能保證不虧。")
  ]),
  bossQuestion("boss-psych-sunk-cost", "心理：沉沒成本", "下列何者最像沉沒成本謬誤？", [
    correctAnswer("A", "電影很難看，但票錢已付，所以硬看到底", "已付票錢無法回收，硬看可能是沉沒成本謬誤。"),
    wrongAnswer("B", "電影好看，所以想看完", "這是基於當下效益，不是沉沒成本。"),
    wrongAnswer("C", "不知道電影好不好，先看評價", "這是蒐集資訊。")
  ]),
  bossQuestion("boss-psych-dunning", "心理：能力錯覺", "下列何者最接近鄧寧-克魯格效應的直覺描述？", [
    wrongAnswer("A", "越熟的人越不會犯錯", "熟練不代表完全不犯錯。"),
    correctAnswer("B", "能力不足者可能高估自己的能力", "這是該效應常見描述。"),
    wrongAnswer("C", "所有高手一定低估自己", "這太絕對，也不是完整描述。")
  ]),
  bossQuestion("boss-management-critical-path", "專案：關鍵路徑", "專案管理中，關鍵路徑最主要代表什麼？", [
    correctAnswer("A", "會直接影響整體完工時間的最長依賴路徑", "關鍵路徑延誤通常會推遲整體完工。"),
    wrongAnswer("B", "成本最低的一條路徑", "關鍵路徑不是成本最低路徑。"),
    wrongAnswer("C", "參與人數最多的工作項目", "人數多不一定是關鍵路徑。")
  ]),
  bossQuestion("boss-product-mvp", "產品：MVP", "產品開發中的 MVP，下列何者最精準？", [
    wrongAnswer("A", "功能越多越好，先做完整大平台", "MVP 不是一次做滿。"),
    correctAnswer("B", "用最小可行版本驗證核心假設", "MVP 目的是快速驗證核心價值與假設。"),
    wrongAnswer("C", "只能是沒有 UI 的後端程式", "MVP 形式取決於要驗證的問題。")
  ]),
  bossQuestion("boss-line-read-trap", "LINE 已讀陷阱", "LINE 出現已讀後，下列何者最精準？", [
    wrongAnswer("A", "代表對方一定同意你的內容", "已讀只代表看過，不代表同意。"),
    correctAnswer("B", "代表訊息通常已被對方開啟查看", "已讀的基本語意是訊息已被查看。"),
    wrongAnswer("C", "代表訊息一定沒有成功送達", "成功送達與已讀是不同狀態。")
  ])
];
