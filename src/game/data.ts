import type { BoardSpace, Card, CardOption, CardOutcome, Protagonist, Team } from "./types";

export const protagonists: Protagonist[] = [
  {
    id: "ali",
    name: "阿里爸爸",
    identity: "沙巴上海島上的謎樣富翁，有很多小孩，最小的小孩只有 1 歲。",
    fixedBurdens: [
      { label: "早晚接送小孩", hours: 1, period: "morning" },
      { label: "帶小孩", hours: 2, period: "evening" },
      { label: "幫老婆洗碗", hours: 0.5, period: "evening" },
      { label: "煮飯洗衣", hours: 2, period: "evening" }
    ],
    startingDeductionHours: 5.5,
    signatureCardId: "signature-ali",
    baseIndicators: {
      time: 2,
      energy: 2,
      focus: 3,
      health: 3,
      relationship: 5,
      achievement: 4
    }
  },
  {
    id: "atu",
    name: "阿吐伯",
    identity: "台灣台南的神秘地主。",
    fixedBurdens: [
      { label: "早上耕田", hours: 2, period: "morning" },
      { label: "去醫院看護理師拿藥", hours: 1, period: "afternoon" },
      { label: "看八點檔", hours: 1, period: "evening" }
    ],
    startingDeductionHours: 4,
    signatureCardId: "signature-atu",
    baseIndicators: {
      time: 3,
      energy: 4,
      focus: 3,
      health: 3,
      relationship: 3,
      achievement: 3
    }
  },
  {
    id: "sun",
    name: "孫小梅",
    identity: "台北信義區富家千金，出入都搭 taxi，很愛逛百貨公司也很會花錢。",
    fixedBurdens: [
      { label: "化妝治裝", hours: 2, period: "morning" },
      { label: "逛百貨公司", hours: 1.5, period: "afternoon" },
      { label: "約會", hours: 1.5, period: "evening" }
    ],
    startingDeductionHours: 5,
    signatureCardId: "signature-sun",
    baseIndicators: {
      time: 2,
      energy: 3,
      focus: 2,
      health: 4,
      relationship: 3,
      achievement: 3
    }
  },
  {
    id: "baby",
    name: "金被被",
    identity: "神秘天才兒童，2 歲即入幼兒園並直升大學，成為商業神話；但因為是嬰兒所以只能喝奶。",
    fixedBurdens: [
      { label: "上課", hours: 5, period: "morning" },
      { label: "公園玩溜滑梯", hours: 2, period: "evening" },
      { label: "喝奶", hours: 1, period: "evening" }
    ],
    startingDeductionHours: 8,
    signatureCardId: "signature-baby",
    baseIndicators: {
      time: 3,
      energy: 4,
      focus: 5,
      health: 2,
      relationship: 3,
      achievement: 5
    }
  }
];

export const teams: Team[] = [
  {
    id: "team-ali",
    name: "阿里爸爸組",
    protagonistId: "ali",
    position: 0,
    startingHours: 18.5,
    remainingHours: 18.5,
    effectiveMarks: 0,
    indicators: { ...protagonists[0]!.baseIndicators }
  },
  {
    id: "team-atu",
    name: "阿吐伯組",
    protagonistId: "atu",
    position: 0,
    startingHours: 20,
    remainingHours: 20,
    effectiveMarks: 0,
    indicators: { ...protagonists[1]!.baseIndicators }
  },
  {
    id: "team-sun",
    name: "孫小梅組",
    protagonistId: "sun",
    position: 0,
    startingHours: 19,
    remainingHours: 19,
    effectiveMarks: 0,
    indicators: { ...protagonists[2]!.baseIndicators }
  },
  {
    id: "team-baby",
    name: "金被被組",
    protagonistId: "baby",
    position: 0,
    startingHours: 16,
    remainingHours: 16,
    effectiveMarks: 0,
    indicators: { ...protagonists[3]!.baseIndicators }
  }
];

export const boardSpaces: BoardSpace[] = [
  {
    id: 0,
    hour: "00:00",
    period: "midnight",
    type: "reflection",
    title: "夜深盤點",
    cardIds: ["midnight-reflection-quiet"]
  },
  {
    id: 1,
    hour: "01:00",
    period: "midnight",
    type: "fate",
    title: "訊息震動",
    cardIds: ["midnight-fate-phone"]
  },
  {
    id: 2,
    hour: "02:00",
    period: "midnight",
    type: "action",
    title: "補眠決策",
    cardIds: ["midnight-action-sleep"]
  },
  {
    id: 3,
    hour: "03:00",
    period: "midnight",
    type: "opportunity",
    title: "明日預備",
    cardIds: ["midnight-opportunity-prepare"]
  },
  {
    id: 4,
    hour: "04:00",
    period: "midnight",
    type: "fate",
    title: "臨時照護",
    cardIds: ["midnight-fate-emergency"]
  },
  {
    id: 5,
    hour: "05:00",
    period: "midnight",
    type: "reflection",
    title: "清晨邊界",
    cardIds: ["midnight-reflection-boundary"]
  },
  {
    id: 6,
    hour: "06:00",
    period: "morning",
    type: "reflection",
    title: "今日排序",
    cardIds: ["morning-reflection-prioritize"]
  },
  {
    id: 7,
    hour: "07:00",
    period: "morning",
    type: "action",
    title: "深度開局",
    cardIds: ["morning-action-deep-work"]
  },
  {
    id: 8,
    hour: "08:00",
    period: "morning",
    type: "opportunity",
    title: "通勤轉換",
    cardIds: ["morning-opportunity-commute"]
  },
  {
    id: 9,
    hour: "09:00",
    period: "morning",
    type: "fate",
    title: "會議插隊",
    cardIds: ["morning-fate-meeting"]
  },
  {
    id: 10,
    hour: "10:00",
    period: "morning",
    type: "action",
    title: "收件箱清理",
    cardIds: ["morning-action-inbox"]
  },
  {
    id: 11,
    hour: "11:00",
    period: "morning",
    type: "reflection",
    title: "午前補給",
    cardIds: ["morning-reflection-breakfast"]
  },
  {
    id: 12,
    hour: "12:00",
    period: "afternoon",
    type: "reflection",
    title: "能量盤點",
    cardIds: ["afternoon-reflection-energy"]
  },
  {
    id: 13,
    hour: "13:00",
    period: "afternoon",
    type: "action",
    title: "午休選擇",
    cardIds: ["afternoon-action-lunch"]
  },
  {
    id: 14,
    hour: "14:00",
    period: "afternoon",
    type: "opportunity",
    title: "互助時段",
    cardIds: ["signature-atu", "afternoon-opportunity-help"]
  },
  {
    id: 15,
    hour: "15:00",
    period: "afternoon",
    type: "fate",
    title: "突發請託",
    cardIds: ["afternoon-fate-request"]
  },
  {
    id: 16,
    hour: "16:00",
    period: "afternoon",
    type: "action",
    title: "成果回顧",
    cardIds: ["afternoon-action-review"]
  },
  {
    id: 17,
    hour: "17:00",
    period: "afternoon",
    type: "reflection",
    title: "收尾重整",
    cardIds: ["signature-sun", "afternoon-reflection-reset"]
  },
  {
    id: 18,
    hour: "18:00",
    period: "evening",
    type: "reflection",
    title: "下班切換",
    cardIds: ["evening-reflection-transition"]
  },
  {
    id: 19,
    hour: "19:00",
    period: "evening",
    type: "action",
    title: "家庭時段",
    cardIds: ["signature-ali", "evening-action-family"]
  },
  {
    id: 20,
    hour: "20:00",
    period: "evening",
    type: "opportunity",
    title: "自我投資",
    cardIds: ["evening-opportunity-study"]
  },
  {
    id: 21,
    hour: "21:00",
    period: "evening",
    type: "fate",
    title: "加班拉扯",
    cardIds: ["signature-baby", "evening-fate-overtime"]
  },
  {
    id: 22,
    hour: "22:00",
    period: "evening",
    type: "reflection",
    title: "關係存款",
    cardIds: ["evening-reflection-connect"]
  },
  {
    id: 23,
    hour: "23:00",
    period: "evening",
    type: "action",
    title: "明日收束",
    cardIds: ["evening-action-tomorrow"]
  }
];

const storyOutcome = (
  id: string,
  tone: CardOutcome["tone"],
  title: string,
  text: string,
  timeDeltaHours: number,
  effectiveMarks: number,
  indicatorDeltas?: CardOutcome["indicatorDeltas"]
): CardOutcome => ({
  id,
  tone,
  title,
  text,
  timeDeltaHours,
  effectiveMarks,
  ...(indicatorDeltas ? { indicatorDeltas } : {})
});

const baseCards: Card[] = [
  {
    id: "midnight-reflection-quiet",
    type: "reflection",
    period: "midnight",
    title: "今天真正重要的是什麼？",
    text: "睡前回想今天，把與長期方向無關、卻占用時間的事情標記下來。",
    options: [
      { id: "A", label: "記下一件明天可刪減的事", timeDeltaHours: -1, effectiveMarks: 1 },
      { id: "B", label: "照原本節奏滑手機", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "列出明天最重要的三件事", timeDeltaHours: -1, effectiveMarks: 2 }
    ]
  },
  {
    id: "midnight-fate-phone",
    type: "fate",
    period: "midnight",
    title: "半夜手機震動",
    text: "手機在枕邊震動，群組只是貼圖，但睡意已經被打斷。",
    options: [
      {
        id: "A",
        label: "手機翻面，明早再處理",
        timeDeltaHours: -1,
        effectiveMarks: 2,
        indicatorDeltas: { focus: 1, health: 1 },
        outcomes: [
          storyOutcome(
            "A-good",
            "good",
            "世界沒有塌",
            "早上打開群組，原來大家只是在接龍晚安圖，你少看 47 張貼圖，腦袋保住。",
            -1,
            2,
            { focus: 1, health: 1 }
          ),
          storyOutcome(
            "A-bad",
            "bad",
            "主管已讀你的沉默",
            "其中一則真的在問明天報告，你沒回但也沒被炸，只是早餐時補了一段說明。",
            -2,
            1,
            { focus: 1 }
          )
        ]
      },
      {
        id: "B",
        label: "立刻回覆，順便看完每個紅點",
        timeDeltaHours: -2,
        effectiveMarks: 0,
        outcomes: [
          storyOutcome(
            "B-good",
            "good",
            "你成為貼圖調停委員",
            "你快速回完重點，但又被晚安貼圖包圍，睡意當場離職。",
            -2,
            0
          ),
          storyOutcome(
            "B-bad",
            "bad",
            "群組開啟第二季",
            "你回了一句，群組像續訂影集一路演到 02:17。",
            -3,
            -1
          )
        ]
      },
      {
        id: "C",
        label: "開勿擾，只留緊急電話",
        timeDeltaHours: -1,
        effectiveMarks: 2,
        indicatorDeltas: { focus: 1, health: 1 },
        outcomes: [
          storyOutcome(
            "C-good",
            "good",
            "勿擾像防火牆",
            "貼圖在門外跳舞，你睡到鬧鐘響，早上還記得自己姓什麼。",
            -1,
            2,
            { focus: 1, health: 1 }
          ),
          storyOutcome(
            "C-bad",
            "bad",
            "重要訊息走側門",
            "真正急事改打電話進來，你被叫醒一次，但至少沒有掉進群組深海。",
            -1.5,
            1,
            { focus: 1 }
          )
        ]
      }
    ]
  },
  {
    id: "midnight-action-sleep",
    type: "action",
    period: "midnight",
    title: "補眠決策",
    text: "你可以立刻關燈，也可以再完成一段低效率工作。",
    options: [
      { id: "A", label: "關燈睡覺", timeDeltaHours: -1, effectiveMarks: 1 },
      { id: "B", label: "硬撐把工作做完", timeDeltaHours: -1, effectiveMarks: 1 },
      { id: "C", label: "寫下斷點後休息", timeDeltaHours: -1, effectiveMarks: 2 }
    ]
  },
  {
    id: "midnight-opportunity-prepare",
    type: "opportunity",
    period: "midnight",
    title: "睡前報告驚魂",
    text: "你剛躺上床，棉被已經進入封印狀態，突然想起明天早上要交的報告還是空白。",
    options: [
      {
        id: "A",
        label: "爬起來把報告寫完",
        timeDeltaHours: -3,
        effectiveMarks: 1,
        indicatorDeltas: { achievement: 1 },
        outcomes: [
          storyOutcome(
            "A-good",
            "good",
            "報告出生了",
            "你把報告寫到可以交，雖然最後一頁看起來像咖啡因親自排版。",
            -3,
            1,
            { achievement: 1 }
          ),
          storyOutcome(
            "A-bad",
            "bad",
            "報告會走但你不會",
            "報告完成了，你也完成了靈魂出竅。早會時你對投影片點頭，其實是在防止自己睡倒。",
            -4,
            0,
            { achievement: 1 }
          )
        ]
      },
      {
        id: "B",
        label: "設 5:30 鬧鐘，早上衝刺",
        timeDeltaHours: -2,
        effectiveMarks: 1,
        indicatorDeltas: { focus: 1 },
        outcomes: [
          storyOutcome(
            "B-good",
            "good",
            "清晨奇蹟",
            "你真的爬起來寫完，報告有點趕，但至少不是夢遊產物。",
            -2,
            1,
            { focus: 1 }
          ),
          storyOutcome(
            "B-bad",
            "bad",
            "貪睡鍵背刺",
            "你按掉鬧鐘後和枕頭重新簽約，醒來只剩十五分鐘可以跟標題培養感情。",
            -2.5,
            0
          )
        ]
      },
      {
        id: "C",
        label: "先睡，明天的自己會處理",
        timeDeltaHours: -1,
        effectiveMarks: 0,
        outcomes: [
          storyOutcome(
            "C-good",
            "good",
            "明天的自己很能扛",
            "你睡飽後火速補完簡版，內容不華麗但方向清楚。",
            -1.5,
            1,
            { health: 1 }
          ),
          storyOutcome(
            "C-bad",
            "bad",
            "主管的眉毛先到會議室",
            "你睡過頭又遲到，進門時主管的眉毛先到會議室，你的報告還在家裡深呼吸。",
            -3,
            -1
          )
        ]
      }
    ]
  },
  {
    id: "signature-baby",
    type: "fate",
    period: "evening",
    title: "金被被：五小時上課與奶瓶董事會",
    text: "神童早上上課 5 小時，下午還要用奶瓶主持商業決策，人生履歷比身高長。",
    options: [
      {
        id: "A",
        label: "乖乖上課，拿蠟筆畫出年度策略",
        timeDeltaHours: -5,
        effectiveMarks: 3,
        indicatorDeltas: { focus: 1, achievement: 1 },
        outcomes: [
          storyOutcome(
            "A-good",
            "good",
            "蠟筆策略被收藏",
            "老師本來想收蠟筆，結果發現你畫的是年度策略地圖，全班突然進入商業簡報時間。",
            -5,
            3,
            { focus: 1, achievement: 1 }
          ),
          storyOutcome(
            "A-bad",
            "bad",
            "策略畫到牆上",
            "你太投入，把策略延伸到教室牆面。老師點頭說很有野心，然後拿出清潔海綿。",
            -6,
            1,
            { achievement: 1 }
          )
        ]
      },
      {
        id: "B",
        label: "在教室宣布併購溜滑梯",
        timeDeltaHours: -6,
        effectiveMarks: 1,
        outcomes: [
          storyOutcome(
            "B-good",
            "good",
            "溜滑梯董事會成立",
            "同學們被你說服排隊投票，雖然公司治理很幼兒園，但秩序意外變好。",
            -6,
            2,
            { relationship: 1 }
          ),
          storyOutcome(
            "B-bad",
            "bad",
            "老師請家長來開股東會",
            "你宣布併購溜滑梯後，全班開始喊董事長。老師請家長來開股東會，奶瓶也被列入證物。",
            -7,
            0
          )
        ]
      }
    ]
  },
  {
    id: "midnight-fate-emergency",
    type: "fate",
    period: "midnight",
    title: "半夜求救訊息",
    text: "有人說只要五分鐘，實際處理起來卻可能拖成一小時。",
    options: [
      {
        id: "A",
        label: "先問到底急在哪裡",
        timeDeltaHours: -1,
        effectiveMarks: 2,
        indicatorDeltas: { focus: 1, relationship: 1 },
        outcomes: [
          storyOutcome(
            "A-good",
            "good",
            "五分鐘真的五分鐘",
            "你問清楚後發現只是缺一個連結，貼上去就能睡，人生少繞一座山。",
            -1,
            2,
            { focus: 1, relationship: 1 }
          ),
          storyOutcome(
            "A-bad",
            "bad",
            "五分鐘長出尾巴",
            "對方說完第一個問題，又補一句「還有一個小小的」。五分鐘長出尾巴，你只能剪短牠。",
            -2,
            1,
            { relationship: 1 }
          )
        ]
      },
      {
        id: "B",
        label: "直接接起來全程救援",
        timeDeltaHours: -3,
        effectiveMarks: 1,
        indicatorDeltas: { relationship: 1 },
        outcomes: [
          storyOutcome(
            "B-good",
            "good",
            "夜間客服英雄",
            "你把事情救回來，對方很感謝，但你的睡眠已經送去急診。",
            -3,
            1,
            { relationship: 1 }
          ),
          storyOutcome(
            "B-bad",
            "bad",
            "別人的急事住進棉被",
            "你處理到一半才發現這不是求救，是整包專案移民到你床邊。",
            -4,
            -1
          )
        ]
      },
      {
        id: "C",
        label: "回一句明早處理，先睡",
        timeDeltaHours: -1,
        effectiveMarks: 1,
        indicatorDeltas: { health: 1 },
        outcomes: [
          storyOutcome(
            "C-good",
            "good",
            "對方自己解掉了",
            "你早上醒來發現對方已經處理完，原來世界偶爾會自己長腳。",
            -1,
            1,
            { health: 1 }
          ),
          storyOutcome(
            "C-bad",
            "bad",
            "訊息堆成小山",
            "你睡得很好，但早上手機像雪崩。你花時間把小山鏟平，還好沒有變火山。",
            -2,
            0
          )
        ]
      }
    ]
  },
  {
    id: "midnight-reflection-boundary",
    type: "reflection",
    period: "midnight",
    title: "清晨邊界",
    text: "天快亮了，決定哪些事情今天不再延伸。",
    options: [
      { id: "A", label: "劃掉一個非必要承諾", timeDeltaHours: -1, effectiveMarks: 1 },
      { id: "B", label: "把所有事都留著", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "寫下今日不可被打擾時段", timeDeltaHours: -1, effectiveMarks: 2 }
    ]
  },
  {
    id: "morning-reflection-prioritize",
    type: "reflection",
    period: "morning",
    title: "今日排序",
    text: "早晨先決定重要順序，避免被第一個訊息牽走。",
    options: [
      { id: "A", label: "先選一件主線任務", timeDeltaHours: -1, effectiveMarks: 1 },
      { id: "B", label: "直接打開聊天軟體", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "排出三段不被打斷的專注時間", timeDeltaHours: -1, effectiveMarks: 2 }
    ]
  },
  {
    id: "signature-ali",
    type: "action",
    period: "evening",
    title: "阿里爸爸：夜間洗碗與哄睡",
    text: "最小的小孩還需要照顧，碗也還沒洗，晚上的有效時間被家庭責任拉住。",
    options: [
      { id: "A", label: "自己全扛，把家裡收好", timeDeltaHours: -2, effectiveMarks: 3 },
      { id: "B", label: "跟家人協調分工", timeDeltaHours: -1, effectiveMarks: 3 },
      { id: "C", label: "先放著明天再說", timeDeltaHours: -1, effectiveMarks: 0 }
    ]
  },
  {
    id: "morning-action-deep-work",
    type: "action",
    period: "morning",
    title: "深度開局",
    text: "一天最清楚的時間可以先給最重要的輸出。",
    options: [
      { id: "A", label: "先做九十分鐘主線", timeDeltaHours: -1.5, effectiveMarks: 2 },
      { id: "B", label: "先清完所有小事", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "設定番茄鐘再開始", timeDeltaHours: -1, effectiveMarks: 1 }
    ]
  },
  {
    id: "morning-opportunity-commute",
    type: "opportunity",
    period: "morning",
    title: "通勤時間選擇",
    text: "捷運晃動之間，短影音很容易吃掉整段通勤。",
    options: [
      {
        id: "A",
        label: "聽一段學習音訊",
        timeDeltaHours: -1,
        effectiveMarks: 1,
        indicatorDeltas: { achievement: 1 },
        outcomes: [
          storyOutcome(
            "A-good",
            "good",
            "耳機變成小教練",
            "你聽到一個剛好能用的方法，抵達公司時腦袋已經暖機。",
            -1,
            2,
            { achievement: 1 }
          ),
          storyOutcome(
            "A-bad",
            "bad",
            "知識坐過站",
            "你聽得太投入，聽到站名才發現自己多坐兩站，學習有進帳，時間有扣款。",
            -2,
            0,
            { achievement: 1 }
          )
        ]
      },
      {
        id: "B",
        label: "一路滑短影音到下車",
        timeDeltaHours: -1,
        effectiveMarks: 0,
        outcomes: [
          storyOutcome(
            "B-good",
            "good",
            "演算法突然做功德",
            "你滑到一支真的有用的整理技巧，雖然前面三十支都在教人煎蛋。",
            -1,
            1,
            { achievement: 1 }
          ),
          storyOutcome(
            "B-bad",
            "bad",
            "拇指先上班了",
            "你人還沒到公司，拇指先上班了。下車時腦袋像剛被廣告洗過。",
            -2,
            -1
          )
        ]
      },
      {
        id: "C",
        label: "在腦中預演今天第一句開場",
        timeDeltaHours: -1,
        effectiveMarks: 2,
        indicatorDeltas: { focus: 1 },
        outcomes: [
          storyOutcome(
            "C-good",
            "good",
            "開場不像臨時下載",
            "你一開口就知道要講什麼，會議室少了一段尷尬空白。",
            -1,
            2,
            { focus: 1 }
          ),
          storyOutcome(
            "C-bad",
            "bad",
            "預演到忘記下車",
            "你把開場講得很順，代價是多搭一站。人生有時候連練習都會外溢。",
            -1.5,
            1,
            { focus: 1 }
          )
        ]
      }
    ]
  },
  {
    id: "morning-fate-meeting",
    type: "fate",
    period: "morning",
    title: "臨時會議插隊",
    text: "臨時會議突然出現，卻沒有清楚議程。",
    options: [
      {
        id: "A",
        label: "先確認會議要決定什麼",
        timeDeltaHours: -1,
        effectiveMarks: 2,
        indicatorDeltas: { focus: 1, achievement: 1 },
        outcomes: [
          storyOutcome(
            "A-good",
            "good",
            "議程被你救回來",
            "你問出真正要決定的事，會議從迷宮變成走廊。",
            -1,
            2,
            { focus: 1, achievement: 1 }
          ),
          storyOutcome(
            "A-bad",
            "bad",
            "你被任命成會議消防隊",
            "大家發現你會問重點，於是把所有混亂都推到你面前排隊。",
            -2,
            1,
            { focus: 1 }
          )
        ]
      },
      {
        id: "B",
        label: "直接進會議，照單全收",
        timeDeltaHours: -2,
        effectiveMarks: 0,
        outcomes: [
          storyOutcome(
            "B-good",
            "good",
            "會議奇蹟早退場",
            "主持人突然想起下一場會議，這場只留下三個決議和一點困惑。",
            -1,
            1
          ),
          storyOutcome(
            "B-bad",
            "bad",
            "會議長出三個會議",
            "你沒先問目的，會議長出三個會議，還附贈一份會後追蹤表。",
            -3,
            -1
          )
        ]
      },
      {
        id: "C",
        label: "請對方先丟三行結論",
        timeDeltaHours: -1.5,
        effectiveMarks: 2,
        indicatorDeltas: { focus: 1 },
        outcomes: [
          storyOutcome(
            "C-good",
            "good",
            "三行救全場",
            "對方真的丟三行，你用十分鐘判斷方向，上午主線保住。",
            -1.5,
            2,
            { focus: 1 }
          ),
          storyOutcome(
            "C-bad",
            "bad",
            "三行變三頁",
            "對方說三行，結果每行都像瀑布。你還是比直接開會少迷路一點。",
            -2,
            1,
            { focus: 1 }
          )
        ]
      }
    ]
  },
  {
    id: "morning-action-inbox",
    type: "action",
    period: "morning",
    title: "收件箱清理",
    text: "面對滿版通知，決定用批次處理還是即時反應。",
    options: [
      { id: "A", label: "批次回覆必要項", timeDeltaHours: -1, effectiveMarks: 1 },
      { id: "B", label: "每封都立刻打開", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "把可委派項標出", timeDeltaHours: -1, effectiveMarks: 2 }
    ]
  },
  {
    id: "morning-reflection-breakfast",
    type: "reflection",
    period: "morning",
    title: "午前補給",
    text: "你需要補充能量，避免下午靠意志力硬撐。",
    options: [
      { id: "A", label: "短暫休息與喝水", timeDeltaHours: -1, effectiveMarks: 1 },
      { id: "B", label: "跳過休息繼續衝", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "檢查上午產出與下午主線", timeDeltaHours: -1, effectiveMarks: 2 }
    ]
  },
  {
    id: "afternoon-reflection-energy",
    type: "reflection",
    period: "afternoon",
    title: "能量盤點",
    text: "午餐後先確認狀態，再選擇合適難度的任務。",
    options: [
      { id: "A", label: "安排低阻力啟動", timeDeltaHours: -1, effectiveMarks: 1 },
      { id: "B", label: "硬做最難任務", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "先散步十分鐘再回來", timeDeltaHours: -1, effectiveMarks: 2 }
    ]
  },
  {
    id: "afternoon-action-lunch",
    type: "action",
    period: "afternoon",
    title: "午休選擇",
    text: "短休息會花時間，但可能換回下午的清醒度。",
    options: [
      { id: "A", label: "小睡二十分鐘", timeDeltaHours: -1, effectiveMarks: 1 },
      { id: "B", label: "邊吃邊開會", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "吃飯時不看螢幕", timeDeltaHours: -1, effectiveMarks: 2 }
    ]
  },
  {
    id: "signature-atu",
    type: "opportunity",
    period: "afternoon",
    title: "阿吐伯：田埂、拿藥與八點檔宇宙",
    text: "早上耕田、下午拿藥，晚上八點檔準時召喚淚水，人生比連續劇還會轉台。",
    options: [
      {
        id: "A",
        label: "用工具提早收工，八點檔前把藥拿好",
        timeDeltaHours: -2,
        effectiveMarks: 3,
        indicatorDeltas: { time: 1, energy: 1, health: 1 },
        outcomes: [
          storyOutcome(
            "A-good",
            "good",
            "田埂出現省時路線",
            "工具幫你少走一趟，藥也順利拿到，八點檔片頭曲完整保留。",
            -2,
            3,
            { time: 1, energy: 1, health: 1 }
          ),
          storyOutcome(
            "A-bad",
            "bad",
            "工具卡泥巴",
            "工具有效，但先在田裡跟泥巴交流感情。你還是省到一點時間，只是鞋子很有故事。",
            -3,
            2,
            { energy: 1, health: 1 }
          )
        ]
      },
      {
        id: "B",
        label: "在醫院聊到片頭曲響起",
        timeDeltaHours: -3,
        effectiveMarks: 1,
        indicatorDeltas: { relationship: 1, health: 1 },
        outcomes: [
          storyOutcome(
            "B-good",
            "good",
            "護理師順手提醒回診",
            "你聊得久，但順便確認下次回診時間，健康行程沒有漏。",
            -3,
            2,
            { relationship: 1, health: 1 }
          ),
          storyOutcome(
            "B-bad",
            "bad",
            "八點檔只剩片尾曲",
            "你從藥聊到隔壁村的水稻價格，回家時八點檔只剩片尾曲和你的懊悔。",
            -4,
            0,
            { relationship: 1 }
          )
        ]
      },
      {
        id: "C",
        label: "先問清楚拿藥流程，下次少跑一趟",
        timeDeltaHours: -1.5,
        effectiveMarks: 3,
        indicatorDeltas: { time: 1, health: 1 },
        outcomes: [
          storyOutcome(
            "C-good",
            "good",
            "下次省下一趟路",
            "你問到固定流程和可領時間，今天花一點心力，未來少跑一趟。",
            -1.5,
            3,
            { time: 1, health: 1 }
          ),
          storyOutcome(
            "C-bad",
            "bad",
            "窗口請你先抽號碼牌",
            "流程問到了，但窗口先請你抽號碼牌。效率沒有飛起來，至少方向清楚。",
            -2.5,
            2,
            { health: 1 }
          )
        ]
      }
    ]
  },
  {
    id: "afternoon-opportunity-help",
    type: "opportunity",
    period: "afternoon",
    title: "同事臨時求助",
    text: "同事卡住來求救，說只要三分鐘，實際上可能牽動你的下午安排。",
    options: [
      {
        id: "A",
        label: "直接接手，先替對方解決",
        timeDeltaHours: -2,
        effectiveMarks: 1,
        indicatorDeltas: { relationship: 1 },
        outcomes: [
          storyOutcome(
            "A-good",
            "good",
            "你三分鐘變出答案",
            "這次真的很小，你出手後問題消失，同事看你的眼神像看到熱水器修好。",
            -2,
            2,
            { relationship: 1 }
          ),
          storyOutcome(
            "A-bad",
            "bad",
            "三分鐘變成共同作者",
            "你接手後發現坑比畫面大，三分鐘變成共同作者，下午主線被迫讓座。",
            -3,
            0,
            { relationship: 1 }
          )
        ]
      },
      {
        id: "B",
        label: "寫下下一步和截止線，讓對方自己推進",
        timeDeltaHours: -1,
        effectiveMarks: 2,
        indicatorDeltas: { focus: 1, relationship: 1 },
        outcomes: [
          storyOutcome(
            "B-good",
            "good",
            "對方自己通關",
            "你給出下一步後，對方真的自己推進，你保住主線，也保住關係。",
            -1,
            2,
            { focus: 1, relationship: 1 }
          ),
          storyOutcome(
            "B-bad",
            "bad",
            "下一題又來了",
            "對方照著你的下一步做完，立刻帶著下一題回來。至少問題被切小了。",
            -2,
            1,
            { relationship: 1 }
          )
        ]
      },
      {
        id: "C",
        label: "約定固定答疑時段，避免問題一直插隊",
        timeDeltaHours: -1.5,
        effectiveMarks: 2,
        indicatorDeltas: { time: 1, relationship: 1 },
        outcomes: [
          storyOutcome(
            "C-good",
            "good",
            "插隊問題排隊成功",
            "大家把問題集中到同一段時間，你的下午終於不再被通知切片。",
            -1.5,
            2,
            { time: 1, relationship: 1 }
          ),
          storyOutcome(
            "C-bad",
            "bad",
            "小型門診開張",
            "答疑時段被揪成小型門診，但至少病人都排同一排，沒有衝進你的主線。",
            -2,
            1,
            { relationship: 1 }
          )
        ]
      }
    ]
  },
  {
    id: "afternoon-fate-request",
    type: "fate",
    period: "afternoon",
    title: "突發請託",
    text: "新的請託看起來很急，但還需要判斷它是否真的重要。",
    options: [
      {
        id: "A",
        label: "先問截止時間與實際影響",
        timeDeltaHours: -1,
        effectiveMarks: 2,
        indicatorDeltas: { time: 1, focus: 1 },
        outcomes: [
          storyOutcome(
            "A-good",
            "good",
            "急件卸妝後不急",
            "你問完才發現它明天中午前就行，急件卸妝後只是普通件。",
            -1,
            2,
            { time: 1, focus: 1 }
          ),
          storyOutcome(
            "A-bad",
            "bad",
            "真的急，但範圍縮小",
            "它真的急，不過你問出最小交付範圍，火勢沒有燒到整片下午。",
            -2,
            1,
            { focus: 1 }
          )
        ]
      },
      {
        id: "B",
        label: "立刻放下手邊工作，先處理再說",
        timeDeltaHours: -2,
        effectiveMarks: 0,
        outcomes: [
          storyOutcome(
            "B-good",
            "good",
            "你救到一個真火警",
            "這次真的會出事，你即時處理，雖然下午被切開，但災情沒有擴大。",
            -2,
            1
          ),
          storyOutcome(
            "B-bad",
            "bad",
            "假火警燒掉下午",
            "你衝過去才發現只是對方沒看說明，假火警燒掉下午，你的主線在旁邊冒煙。",
            -3,
            -1
          )
        ]
      },
      {
        id: "C",
        label: "請對方排進今日三件事後面",
        timeDeltaHours: -1.5,
        effectiveMarks: 2,
        indicatorDeltas: { time: 1 },
        outcomes: [
          storyOutcome(
            "C-good",
            "good",
            "順序保住主線",
            "對方接受排程，你先完成主線，再回來處理請託，下午沒有被整碗端走。",
            -1.5,
            2,
            { time: 1 }
          ),
          storyOutcome(
            "C-bad",
            "bad",
            "排隊也會敲門",
            "對方每十分鐘問一次排到了嗎，你保住主線，但通知像門鈴一樣勤勞。",
            -2,
            0
          )
        ]
      }
    ]
  },
  {
    id: "afternoon-action-review",
    type: "action",
    period: "afternoon",
    title: "成果回顧",
    text: "下午收尾前確認產出，避免晚上才發現方向錯。",
    options: [
      { id: "A", label: "對照今天主線", timeDeltaHours: -1, effectiveMarks: 1 },
      { id: "B", label: "繼續堆更多輸出", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "請關係人快速確認", timeDeltaHours: -1, effectiveMarks: 2 }
    ]
  },
  {
    id: "afternoon-reflection-reset",
    type: "reflection",
    period: "afternoon",
    title: "收尾重整",
    text: "下班前把未完成的事情放回系統，不帶著混亂離開。",
    options: [
      { id: "A", label: "寫下未完成斷點", timeDeltaHours: -1, effectiveMarks: 1 },
      { id: "B", label: "把所有事記在腦中", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "明確取消一件低價值事", timeDeltaHours: -1, effectiveMarks: 2 }
    ]
  },
  {
    id: "evening-reflection-transition",
    type: "reflection",
    period: "evening",
    title: "下班切換",
    text: "工作與生活之間需要一個清楚的轉場。",
    options: [
      { id: "A", label: "寫三行收工筆記", timeDeltaHours: -1, effectiveMarks: 1 },
      { id: "B", label: "帶著通知回家", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "關掉非必要通知", timeDeltaHours: -1, effectiveMarks: 2 }
    ]
  },
  {
    id: "evening-action-family",
    type: "action",
    period: "evening",
    title: "家庭時段",
    text: "晚上的陪伴品質，取決於你能不能把注意力留在當下。",
    options: [
      { id: "A", label: "手機放到看不見處", timeDeltaHours: -1, effectiveMarks: 2 },
      { id: "B", label: "邊陪伴邊回訊息", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "先說明一個必要回覆窗口", timeDeltaHours: -1, effectiveMarks: 1 }
    ]
  },
  {
    id: "evening-opportunity-study",
    type: "opportunity",
    period: "evening",
    title: "晚間自我投資",
    text: "晚上剩下一點時間，學習與休息都在爭取你的注意力。",
    options: [
      {
        id: "A",
        label: "完成一個小單元的學習",
        timeDeltaHours: -1,
        effectiveMarks: 2,
        indicatorDeltas: { achievement: 1 },
        outcomes: [
          storyOutcome(
            "A-good",
            "good",
            "小單元真的小",
            "你完成一段剛好的學習，沒有開啟知識無底洞，明天能直接用。",
            -1,
            2,
            { achievement: 1 }
          ),
          storyOutcome(
            "A-bad",
            "bad",
            "小單元打開隱藏章節",
            "你本來只想學一節，結果課程推薦像樓梯一路往下，還好你有在中途煞車。",
            -2,
            1,
            { achievement: 1 }
          )
        ]
      },
      {
        id: "B",
        label: "一路滑手機到準備睡覺",
        timeDeltaHours: -1,
        effectiveMarks: 0,
        outcomes: [
          storyOutcome(
            "B-good",
            "good",
            "滑到一支有用教學",
            "你在短影音裡撈到一個明天可用的小技巧，雖然前面先繳了注意力門票。",
            -1,
            1,
            { achievement: 1 }
          ),
          storyOutcome(
            "B-bad",
            "bad",
            "時間黑洞把晚上收走",
            "你抬頭時已經過了一小時，時間黑洞把晚上收走，還順手留下眼睛乾澀。",
            -3,
            -1
          )
        ]
      },
      {
        id: "C",
        label: "整理今天學到的重點",
        timeDeltaHours: -1,
        effectiveMarks: 2,
        indicatorDeltas: { focus: 1, achievement: 1 },
        outcomes: [
          storyOutcome(
            "C-good",
            "good",
            "三行筆記明天可用",
            "你把今天學到的東西整理成三行，明天不用重挖記憶礦坑。",
            -1,
            2,
            { focus: 1, achievement: 1 }
          ),
          storyOutcome(
            "C-bad",
            "bad",
            "整理變成美化筆記",
            "你整理到一半開始調格式，筆記變漂亮了，重點也差點被裝潢蓋住。",
            -2,
            1,
            { achievement: 1 }
          )
        ]
      }
    ]
  },
  {
    id: "evening-fate-overtime",
    type: "fate",
    period: "evening",
    title: "加班訊息出現",
    text: "工作追到晚上，訊息寫著很急，卻未必非今天不可。",
    options: [
      {
        id: "A",
        label: "確認今天是否真的必須完成",
        timeDeltaHours: -1,
        effectiveMarks: 2,
        indicatorDeltas: { time: 1, focus: 1 },
        outcomes: [
          storyOutcome(
            "A-good",
            "good",
            "急件其實明早才要",
            "你問完才知道明早十點前即可，今晚不用把自己變成辦公室夜燈。",
            -1,
            2,
            { time: 1, focus: 1 }
          ),
          storyOutcome(
            "A-bad",
            "bad",
            "真的今晚要，但砍掉一半範圍",
            "它真的今晚要，不過你問出最小版本，至少不用把整座山搬回家。",
            -2,
            1,
            { focus: 1 }
          )
        ]
      },
      {
        id: "B",
        label: "直接加班到深夜",
        timeDeltaHours: -3,
        effectiveMarks: 1,
        outcomes: [
          storyOutcome(
            "B-good",
            "good",
            "報告交了，人也快交出去",
            "你硬是交出版本，報告交了，人也快交出去。明天的精神狀態先欠著。",
            -3,
            1,
            { achievement: 1 }
          ),
          storyOutcome(
            "B-bad",
            "bad",
            "加班訊息會繁殖",
            "你回得越快，新需求越像分裂細胞。深夜沒有結束，只是換一個檔名。",
            -4,
            -1
          )
        ]
      },
      {
        id: "C",
        label: "先回覆可交付範圍與明早補件",
        timeDeltaHours: -2,
        effectiveMarks: 2,
        indicatorDeltas: { focus: 1, relationship: 1 },
        outcomes: [
          storyOutcome(
            "C-good",
            "good",
            "主管接受半夜不要開副本",
            "你先交出可用部分，明早補完整版本。主管接受，大家都少一點午夜表演。",
            -2,
            2,
            { focus: 1, relationship: 1 }
          ),
          storyOutcome(
            "C-bad",
            "bad",
            "主管已讀，眉毛又出現",
            "主管已讀，眉毛又出現，但你有清楚交代範圍，場面沒有失控。",
            -2.5,
            1,
            { relationship: 1 }
          )
        ]
      }
    ]
  },
  {
    id: "signature-sun",
    type: "reflection",
    period: "afternoon",
    title: "孫小梅：完美出門與百貨誘惑",
    text: "完美的治裝與妝容需要時間，附近百貨公司的誘惑也正在招手。",
    options: [
      { id: "A", label: "完整化妝治裝 2 小時", timeDeltaHours: -2, effectiveMarks: 1 },
      { id: "B", label: "快速整理，準時進入正事", timeDeltaHours: -1, effectiveMarks: 2 },
      { id: "C", label: "下午百貨逛好逛滿", timeDeltaHours: -1.5, effectiveMarks: 1 }
    ]
  },
  {
    id: "evening-reflection-connect",
    type: "reflection",
    period: "evening",
    title: "關係存款",
    text: "人際關係的維護也會影響未來的有效時間。",
    options: [
      { id: "A", label: "主動回覆一個重要關係", timeDeltaHours: -1, effectiveMarks: 1 },
      { id: "B", label: "所有訊息都先不管", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "安排明確的陪伴時間", timeDeltaHours: -1, effectiveMarks: 2 }
    ]
  },
  {
    id: "evening-action-tomorrow",
    type: "action",
    period: "evening",
    title: "明日收束",
    text: "睡前只保留明天最重要的第一步。",
    options: [
      { id: "A", label: "寫下第一個動作", timeDeltaHours: -1, effectiveMarks: 1 },
      { id: "B", label: "繼續補今天沒做完的事", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "準備明早所需材料", timeDeltaHours: -1, effectiveMarks: 2 }
    ]
  }
];

export const cards: Card[] = baseCards.map((card) =>
  card.type === "opportunity" || card.type === "fate"
    ? {
        ...card,
        options: card.options.map(withDefaultRandomOutcomes)
      }
    : card
);

function withDefaultRandomOutcomes(option: CardOption): CardOption {
  if (option.outcomes?.length) {
    return option;
  }

  return {
    ...option,
    outcomes: [
      {
        id: `${option.id}-good`,
        tone: "good",
        title: "意外順利",
        text: "事情比預期順利，你把時間消耗控制得比較好，也多得到一點人生有效點。",
        timeDeltaHours: Math.min(-1, option.timeDeltaHours + 0.5),
        effectiveMarks: option.effectiveMarks + 1,
        indicatorDeltas: option.indicatorDeltas
      },
      {
        id: `${option.id}-bad`,
        tone: "bad",
        title: "情況轉折",
        text: "事情比預期多繞了一圈，你多消耗了一點時間，人生有效點也被扣走。",
        timeDeltaHours: option.timeDeltaHours - 0.5,
        effectiveMarks: option.effectiveMarks - 1,
        indicatorDeltas: option.indicatorDeltas
      }
    ]
  };
}
