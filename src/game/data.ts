import type { BoardSpace, Card, Protagonist, Team } from "./types";

export const protagonists: Protagonist[] = [
  {
    id: "ali",
    name: "阿里爸爸",
    identity: "沙巴上海島上的謎樣富翁，有很多小孩，最小的小孩只有 1 歲。",
    fixedBurdens: [
      { label: "早晚接送小孩", hours: 1, period: "morning" },
      { label: "帶小孩", hours: 2, period: "evening" },
      { label: "幫老婆洗碗", hours: 0.5, period: "evening" }
    ],
    startingDeductionHours: 3.5,
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
      { label: "去醫院看護理師拿藥", hours: 1, period: "afternoon" }
    ],
    startingDeductionHours: 3,
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
      { label: "逛百貨公司", hours: 1.5, period: "afternoon" }
    ],
    startingDeductionHours: 3.5,
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
      { label: "公園玩溜滑梯", hours: 2, period: "evening" },
      { label: "喝奶", hours: 1, period: "evening" }
    ],
    startingDeductionHours: 3,
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
    startingHours: 20.5,
    remainingHours: 20.5,
    effectiveMarks: 0,
    indicators: { ...protagonists[0]!.baseIndicators }
  },
  {
    id: "team-atu",
    name: "阿吐伯組",
    protagonistId: "atu",
    position: 0,
    startingHours: 21,
    remainingHours: 21,
    effectiveMarks: 0,
    indicators: { ...protagonists[1]!.baseIndicators }
  },
  {
    id: "team-sun",
    name: "孫小梅組",
    protagonistId: "sun",
    position: 0,
    startingHours: 20.5,
    remainingHours: 20.5,
    effectiveMarks: 0,
    indicators: { ...protagonists[2]!.baseIndicators }
  },
  {
    id: "team-baby",
    name: "金被被組",
    protagonistId: "baby",
    position: 0,
    startingHours: 21,
    remainingHours: 21,
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

export const cards: Card[] = [
  {
    id: "midnight-reflection-quiet",
    type: "reflection",
    period: "midnight",
    title: "今天真正重要的是什麼？",
    text: "在睡前回看今天，把沒有推進人生方向的活動標記出來。",
    options: [
      { id: "A", label: "記下一件可刪除的事", timeDeltaHours: 0.5, effectiveMarks: 1 },
      { id: "B", label: "照原本節奏滑手機", timeDeltaHours: -0.5, effectiveMarks: 0 },
      { id: "C", label: "列出明天三件要事", timeDeltaHours: 0, effectiveMarks: 2 }
    ]
  },
  {
    id: "midnight-fate-phone",
    type: "fate",
    period: "midnight",
    title: "深夜通知亮起",
    text: "群組冒出一串訊息，現在處理會破壞睡眠，明早處理又怕漏事。",
    options: [
      { id: "A", label: "只看標題就關閉", timeDeltaHours: 0, effectiveMarks: 1, indicatorDeltas: { focus: 1 } },
      { id: "B", label: "一路回完所有訊息", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "設定勿擾與明早提醒", timeDeltaHours: 0.5, effectiveMarks: 2, indicatorDeltas: { focus: 1, health: 1 } }
    ]
  },
  {
    id: "midnight-action-sleep",
    type: "action",
    period: "midnight",
    title: "補眠決策",
    text: "你可以立刻關燈，也可以再完成一段低效率工作。",
    options: [
      { id: "A", label: "關燈睡覺", timeDeltaHours: 1, effectiveMarks: 1 },
      { id: "B", label: "硬撐把工作做完", timeDeltaHours: -1, effectiveMarks: 1 },
      { id: "C", label: "寫下斷點後休息", timeDeltaHours: 0.5, effectiveMarks: 2 }
    ]
  },
  {
    id: "midnight-opportunity-prepare",
    type: "opportunity",
    period: "midnight",
    title: "三分鐘預備",
    text: "睡前整理明天第一步，能讓清晨少掉切換成本。",
    options: [
      { id: "A", label: "整理桌面與待辦", timeDeltaHours: 0.5, effectiveMarks: 1, indicatorDeltas: { time: 1 } },
      { id: "B", label: "先追劇放空", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "準備早晨第一個檔案", timeDeltaHours: 0.5, effectiveMarks: 2, indicatorDeltas: { focus: 1, achievement: 1 } }
    ]
  },
  {
    id: "signature-baby",
    type: "fate",
    period: "evening",
    title: "金被被：天才兒童的奶與滑梯",
    text: "商業神話仍然需要喝奶，也需要把公園溜滑梯玩夠才肯收心。",
    options: [
      { id: "A", label: "滑梯玩滿 2 小時", timeDeltaHours: -2, effectiveMarks: 2, indicatorDeltas: { health: 1 } },
      { id: "B", label: "喝奶後整理明天任務", timeDeltaHours: -1, effectiveMarks: 2, indicatorDeltas: { energy: 1, focus: 1 } },
      { id: "C", label: "硬撐商業神話不休息", timeDeltaHours: -0.5, effectiveMarks: 1 }
    ]
  },
  {
    id: "midnight-fate-emergency",
    type: "fate",
    period: "midnight",
    title: "突發照護",
    text: "有人需要立即協助，原本的休息計畫必須調整。",
    options: [
      { id: "A", label: "先處理必要安全", timeDeltaHours: -0.5, effectiveMarks: 1, indicatorDeltas: { relationship: 1 } },
      { id: "B", label: "邊抱怨邊全做", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "處理後重新排明日優先序", timeDeltaHours: 0, effectiveMarks: 2, indicatorDeltas: { focus: 1 } }
    ]
  },
  {
    id: "midnight-reflection-boundary",
    type: "reflection",
    period: "midnight",
    title: "清晨邊界",
    text: "天快亮了，決定哪些事情今天不再延伸。",
    options: [
      { id: "A", label: "劃掉一個非必要承諾", timeDeltaHours: 1, effectiveMarks: 1 },
      { id: "B", label: "把所有事都留著", timeDeltaHours: -0.5, effectiveMarks: 0 },
      { id: "C", label: "寫下今日不可被打擾時段", timeDeltaHours: 0.5, effectiveMarks: 2 }
    ]
  },
  {
    id: "morning-reflection-prioritize",
    type: "reflection",
    period: "morning",
    title: "今日排序",
    text: "早晨先決定重要順序，避免被第一個訊息牽走。",
    options: [
      { id: "A", label: "先選一件主線任務", timeDeltaHours: 0.5, effectiveMarks: 1 },
      { id: "B", label: "直接打開聊天軟體", timeDeltaHours: -0.5, effectiveMarks: 0 },
      { id: "C", label: "排三段專注時間", timeDeltaHours: 0.5, effectiveMarks: 2 }
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
      { id: "C", label: "先放著明天再說", timeDeltaHours: -0.5, effectiveMarks: 0 }
    ]
  },
  {
    id: "morning-action-deep-work",
    type: "action",
    period: "morning",
    title: "深度開局",
    text: "一天最清楚的時間可以先給最重要的輸出。",
    options: [
      { id: "A", label: "先做九十分鐘主線", timeDeltaHours: 1, effectiveMarks: 2 },
      { id: "B", label: "先清完所有小事", timeDeltaHours: -0.5, effectiveMarks: 0 },
      { id: "C", label: "設定番茄鐘再開始", timeDeltaHours: 0.5, effectiveMarks: 1 }
    ]
  },
  {
    id: "morning-opportunity-commute",
    type: "opportunity",
    period: "morning",
    title: "通勤轉換",
    text: "通勤時間可以被動消耗，也可以變成低負擔準備。",
    options: [
      { id: "A", label: "聽一段學習音訊", timeDeltaHours: 0, effectiveMarks: 1, indicatorDeltas: { achievement: 1 } },
      { id: "B", label: "無意識滑短影音", timeDeltaHours: -0.5, effectiveMarks: 0 },
      { id: "C", label: "預演第一個對話", timeDeltaHours: 0.5, effectiveMarks: 2, indicatorDeltas: { focus: 1 } }
    ]
  },
  {
    id: "morning-fate-meeting",
    type: "fate",
    period: "morning",
    title: "會議插隊",
    text: "臨時會議塞進早上，原本的專注時段被切碎。",
    options: [
      { id: "A", label: "接受並重新排時段", timeDeltaHours: -0.5, effectiveMarks: 1, indicatorDeltas: { time: 1 } },
      { id: "B", label: "會後直接被小事帶走", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "要求會議先給決策題", timeDeltaHours: 0, effectiveMarks: 2, indicatorDeltas: { focus: 1, achievement: 1 } }
    ]
  },
  {
    id: "morning-action-inbox",
    type: "action",
    period: "morning",
    title: "收件箱清理",
    text: "面對滿版通知，決定用批次處理還是即時反應。",
    options: [
      { id: "A", label: "批次回覆必要項", timeDeltaHours: 0.5, effectiveMarks: 1 },
      { id: "B", label: "每封都立刻打開", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "把可委派項標出", timeDeltaHours: 0.5, effectiveMarks: 2 }
    ]
  },
  {
    id: "morning-reflection-breakfast",
    type: "reflection",
    period: "morning",
    title: "午前補給",
    text: "你需要補充能量，避免下午靠意志力硬撐。",
    options: [
      { id: "A", label: "短暫休息與喝水", timeDeltaHours: 0.5, effectiveMarks: 1 },
      { id: "B", label: "跳過休息繼續衝", timeDeltaHours: -0.5, effectiveMarks: 0 },
      { id: "C", label: "檢查上午產出與下午主線", timeDeltaHours: 0, effectiveMarks: 2 }
    ]
  },
  {
    id: "afternoon-reflection-energy",
    type: "reflection",
    period: "afternoon",
    title: "能量盤點",
    text: "午餐後先確認狀態，再選擇合適難度的任務。",
    options: [
      { id: "A", label: "安排低阻力啟動", timeDeltaHours: 0.5, effectiveMarks: 1 },
      { id: "B", label: "硬做最難任務", timeDeltaHours: -0.5, effectiveMarks: 0 },
      { id: "C", label: "先散步十分鐘再回來", timeDeltaHours: 0.5, effectiveMarks: 2 }
    ]
  },
  {
    id: "afternoon-action-lunch",
    type: "action",
    period: "afternoon",
    title: "午休選擇",
    text: "短休息會花時間，但可能換回下午的清醒度。",
    options: [
      { id: "A", label: "小睡二十分鐘", timeDeltaHours: 0.5, effectiveMarks: 1 },
      { id: "B", label: "邊吃邊開會", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "吃飯時不看螢幕", timeDeltaHours: 0, effectiveMarks: 2 }
    ]
  },
  {
    id: "signature-atu",
    type: "opportunity",
    period: "afternoon",
    title: "阿吐伯：清晨耕田與午後拿藥",
    text: "早上耕田耗掉體力，午後去醫院拿藥又比預期更久。",
    options: [
      { id: "A", label: "照常耕滿 2 小時", timeDeltaHours: -2, effectiveMarks: 2, indicatorDeltas: { health: 1 } },
      { id: "B", label: "用工具與排程提早收工", timeDeltaHours: -1, effectiveMarks: 2, indicatorDeltas: { time: 1, energy: 1 } },
      { id: "C", label: "去醫院順便閒聊太久", timeDeltaHours: -2, effectiveMarks: 1 }
    ]
  },
  {
    id: "afternoon-opportunity-help",
    type: "opportunity",
    period: "afternoon",
    title: "互助時段",
    text: "同事卡住了，協助方式會影響你的時間與團隊效能。",
    options: [
      { id: "A", label: "直接接手完成", timeDeltaHours: -1, effectiveMarks: 1, indicatorDeltas: { relationship: 1 } },
      { id: "B", label: "給出下一步與時限", timeDeltaHours: 0, effectiveMarks: 2, indicatorDeltas: { focus: 1, relationship: 1 } },
      { id: "C", label: "約定固定答疑時段", timeDeltaHours: 0.5, effectiveMarks: 2, indicatorDeltas: { time: 1 } }
    ]
  },
  {
    id: "afternoon-fate-request",
    type: "fate",
    period: "afternoon",
    title: "突發請託",
    text: "新的請託看似急迫，但不一定真的重要。",
    options: [
      { id: "A", label: "先問截止與影響", timeDeltaHours: 0.5, effectiveMarks: 2, indicatorDeltas: { focus: 1 } },
      { id: "B", label: "立刻放下手邊工作", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "排進待辦但不承諾今天", timeDeltaHours: 0, effectiveMarks: 1, indicatorDeltas: { time: 1 } }
    ]
  },
  {
    id: "afternoon-action-review",
    type: "action",
    period: "afternoon",
    title: "成果回顧",
    text: "下午收尾前確認產出，避免晚上才發現方向錯。",
    options: [
      { id: "A", label: "對照今天主線", timeDeltaHours: 0.5, effectiveMarks: 1 },
      { id: "B", label: "繼續堆更多輸出", timeDeltaHours: -0.5, effectiveMarks: 0 },
      { id: "C", label: "請關係人快速確認", timeDeltaHours: 0.5, effectiveMarks: 2 }
    ]
  },
  {
    id: "afternoon-reflection-reset",
    type: "reflection",
    period: "afternoon",
    title: "收尾重整",
    text: "下班前把未完成的事情放回系統，不帶著混亂離開。",
    options: [
      { id: "A", label: "寫下未完成斷點", timeDeltaHours: 0.5, effectiveMarks: 1 },
      { id: "B", label: "把所有事記在腦中", timeDeltaHours: -0.5, effectiveMarks: 0 },
      { id: "C", label: "明確取消一件低價值事", timeDeltaHours: 1, effectiveMarks: 2 }
    ]
  },
  {
    id: "evening-reflection-transition",
    type: "reflection",
    period: "evening",
    title: "下班切換",
    text: "工作與生活之間需要一個清楚的轉場。",
    options: [
      { id: "A", label: "寫三行收工筆記", timeDeltaHours: 0.5, effectiveMarks: 1 },
      { id: "B", label: "帶著通知回家", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "關掉非必要通知", timeDeltaHours: 0.5, effectiveMarks: 2 }
    ]
  },
  {
    id: "evening-action-family",
    type: "action",
    period: "evening",
    title: "家庭時段",
    text: "晚上的陪伴品質，取決於你能不能把注意力留在當下。",
    options: [
      { id: "A", label: "手機放到看不見處", timeDeltaHours: 0.5, effectiveMarks: 2 },
      { id: "B", label: "邊陪伴邊回訊息", timeDeltaHours: -0.5, effectiveMarks: 0 },
      { id: "C", label: "先說明一個必要回覆窗口", timeDeltaHours: 0, effectiveMarks: 1 }
    ]
  },
  {
    id: "evening-opportunity-study",
    type: "opportunity",
    period: "evening",
    title: "自我投資",
    text: "你有一小段可用時間，決定投入長期能力還是短暫麻痺。",
    options: [
      { id: "A", label: "學習一個小單元", timeDeltaHours: 0, effectiveMarks: 2, indicatorDeltas: { achievement: 1 } },
      { id: "B", label: "無目標滑到睡前", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "整理今天學到的事", timeDeltaHours: 0.5, effectiveMarks: 2, indicatorDeltas: { focus: 1, achievement: 1 } }
    ]
  },
  {
    id: "evening-fate-overtime",
    type: "fate",
    period: "evening",
    title: "加班拉扯",
    text: "工作又追到晚上，必須判斷是真的急，還是缺少邊界。",
    options: [
      { id: "A", label: "確認是否今天必須完成", timeDeltaHours: 0.5, effectiveMarks: 2, indicatorDeltas: { time: 1, focus: 1 } },
      { id: "B", label: "直接加班到深夜", timeDeltaHours: -2, effectiveMarks: 1 },
      { id: "C", label: "交付最小可用結果", timeDeltaHours: 0, effectiveMarks: 2, indicatorDeltas: { achievement: 1 } }
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
      { id: "B", label: "快速整理，準時進入正事", timeDeltaHours: -0.5, effectiveMarks: 2 },
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
      { id: "A", label: "主動回覆一個重要關係", timeDeltaHours: 0, effectiveMarks: 1 },
      { id: "B", label: "所有訊息都先不管", timeDeltaHours: -0.5, effectiveMarks: 0 },
      { id: "C", label: "安排明確的陪伴時間", timeDeltaHours: 0.5, effectiveMarks: 2 }
    ]
  },
  {
    id: "evening-action-tomorrow",
    type: "action",
    period: "evening",
    title: "明日收束",
    text: "睡前只保留明天最重要的第一步。",
    options: [
      { id: "A", label: "寫下第一個動作", timeDeltaHours: 0.5, effectiveMarks: 1 },
      { id: "B", label: "繼續補今天沒做完的事", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "準備明早所需材料", timeDeltaHours: 0.5, effectiveMarks: 2 }
    ]
  }
];
