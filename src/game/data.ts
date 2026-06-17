import type { BoardSpace, Card, CardOption, Protagonist, Team } from "./types";

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

const baseCards: Card[] = [
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
    title: "半夜手機自己升天",
    text: "手機在枕頭邊震到像要宣布登基，群組說只是貼圖，但你的靈魂已經坐起來開會。",
    options: [
      { id: "A", label: "翻面裝死，明早再審判", timeDeltaHours: 0.5, effectiveMarks: 2, indicatorDeltas: { focus: 1, health: 1 } },
      { id: "B", label: "立刻回覆，順便把人生回到凌晨三點", timeDeltaHours: -1.5, effectiveMarks: 0 }
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
    title: "睡前桌面開光",
    text: "桌上有杯子、充電線、昨天的便利貼，像一個小型案發現場。",
    options: [
      { id: "A", label: "把桌面清到可以召喚明天", timeDeltaHours: 0.5, effectiveMarks: 2, indicatorDeltas: { time: 1, focus: 1 } },
      { id: "B", label: "把雜物推成山，假裝那叫系統", timeDeltaHours: -0.5, effectiveMarks: 0 },
      { id: "C", label: "找明天第一份檔案，找不到就拜一下滑鼠", timeDeltaHours: 0.5, effectiveMarks: 1, indicatorDeltas: { focus: 1, achievement: 1 } }
    ]
  },
  {
    id: "signature-baby",
    type: "fate",
    period: "evening",
    title: "金被被：五小時上課與奶瓶董事會",
    text: "神童早上上課 5 小時，下午還要用奶瓶主持商業決策，人生履歷比身高長。",
    options: [
      { id: "A", label: "乖乖上課，拿蠟筆畫出年度策略", timeDeltaHours: -5, effectiveMarks: 3, indicatorDeltas: { focus: 1, achievement: 1 } },
      { id: "B", label: "在教室宣布併購溜滑梯，老師請家長來", timeDeltaHours: -6, effectiveMarks: 1 }
    ]
  },
  {
    id: "midnight-fate-emergency",
    type: "fate",
    period: "midnight",
    title: "半夜求救鈴聲長腳",
    text: "有人說只有五分鐘，結果五分鐘穿西裝坐下來變成一小時。",
    options: [
      { id: "A", label: "先救火，再把火柴收走", timeDeltaHours: -0.5, effectiveMarks: 2, indicatorDeltas: { focus: 1, relationship: 1 } },
      { id: "B", label: "邊救邊碎念，把自己也燒進去", timeDeltaHours: -1.5, effectiveMarks: 0 }
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
    title: "通勤車廂修行",
    text: "捷運晃一下，手機短影音就端出人生自助餐。",
    options: [
      { id: "A", label: "聽一段學習音訊，假裝自己是移動圖書館", timeDeltaHours: 0, effectiveMarks: 1, indicatorDeltas: { achievement: 1 } },
      { id: "B", label: "滑到站名都變演算法推薦", timeDeltaHours: -0.5, effectiveMarks: 0 },
      { id: "C", label: "在腦中預演第一句話，不跟空氣吵架", timeDeltaHours: 0.5, effectiveMarks: 2, indicatorDeltas: { focus: 1 } }
    ]
  },
  {
    id: "morning-fate-meeting",
    type: "fate",
    period: "morning",
    title: "會議從天花板掉下來",
    text: "臨時會議像忍者一樣出現，還帶著沒有 agenda 的武器。",
    options: [
      { id: "A", label: "要求先說要決定什麼，不然大家一起看天花板", timeDeltaHours: 0, effectiveMarks: 2, indicatorDeltas: { focus: 1, achievement: 1 } },
      { id: "B", label: "直接坐下被投影片醃漬", timeDeltaHours: -1.5, effectiveMarks: 0 }
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
    title: "阿吐伯：田埂、拿藥與八點檔宇宙",
    text: "早上耕田、下午拿藥，晚上八點檔準時召喚淚水，人生比連續劇還會轉台。",
    options: [
      { id: "A", label: "用工具提早收工，八點檔前把藥拿好", timeDeltaHours: -2, effectiveMarks: 3, indicatorDeltas: { time: 1, energy: 1, health: 1 } },
      { id: "B", label: "在醫院聊到片頭曲響起，回家只剩主題曲", timeDeltaHours: -3, effectiveMarks: 1 }
    ]
  },
  {
    id: "afternoon-opportunity-help",
    type: "opportunity",
    period: "afternoon",
    title: "同事頭上冒煙",
    text: "同事卡住來求救，語氣像只要三分鐘，眼神像準備住進你的行事曆。",
    options: [
      { id: "A", label: "直接接手，成為人體快捷鍵", timeDeltaHours: -1, effectiveMarks: 1, indicatorDeltas: { relationship: 1 } },
      { id: "B", label: "畫下一步和截止線，讓對方自己走路", timeDeltaHours: 0, effectiveMarks: 2, indicatorDeltas: { focus: 1, relationship: 1 } },
      { id: "C", label: "開固定答疑時段，禁止問題隨地長出來", timeDeltaHours: 0.5, effectiveMarks: 2, indicatorDeltas: { time: 1 } }
    ]
  },
  {
    id: "afternoon-fate-request",
    type: "fate",
    period: "afternoon",
    title: "突發請託穿西裝",
    text: "新的請託說自己很急，但沒有證件證明它真的重要。",
    options: [
      { id: "A", label: "先問截止和影響，請它出示身分證", timeDeltaHours: 0.5, effectiveMarks: 2, indicatorDeltas: { time: 1, focus: 1 } },
      { id: "B", label: "立刻放下手邊工作，向混亂敬禮", timeDeltaHours: -1.5, effectiveMarks: 0 }
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
    title: "自我投資扭蛋機",
    text: "晚上剩一點時間，理智說學習，沙發說來嘛我很軟。",
    options: [
      { id: "A", label: "學一個小單元，抽到能力碎片", timeDeltaHours: 0, effectiveMarks: 2, indicatorDeltas: { achievement: 1 } },
      { id: "B", label: "滑到手機開始發燙，手指成為永動機", timeDeltaHours: -1, effectiveMarks: 0 },
      { id: "C", label: "整理今天學到的事，腦袋關機前存檔", timeDeltaHours: 0.5, effectiveMarks: 2, indicatorDeltas: { focus: 1, achievement: 1 } }
    ]
  },
  {
    id: "evening-fate-overtime",
    type: "fate",
    period: "evening",
    title: "加班怪獸敲門",
    text: "工作追到晚上，還戴著『我真的很急』的假鬍子。",
    options: [
      { id: "A", label: "確認今天是否必須完成，拔掉假鬍子", timeDeltaHours: 0.5, effectiveMarks: 2, indicatorDeltas: { time: 1, focus: 1 } },
      { id: "B", label: "直接加到深夜，和辦公椅建立感情", timeDeltaHours: -2, effectiveMarks: 1 }
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
        title: "神奇好結果",
        text: "宇宙突然站你這邊，事情滑順到像地板剛打蠟。你省下一點時間，也多拿一點人生有效點。",
        timeDeltaHours: option.timeDeltaHours + 0.5,
        effectiveMarks: option.effectiveMarks + 1,
        indicatorDeltas: option.indicatorDeltas
      },
      {
        id: `${option.id}-bad`,
        tone: "bad",
        title: "無厘頭壞結果",
        text: "劇情突然轉彎，連旁白都跌倒。你多耗了一點時間，人生有效點也被現場扣走。",
        timeDeltaHours: option.timeDeltaHours - 0.5,
        effectiveMarks: option.effectiveMarks - 1,
        indicatorDeltas: option.indicatorDeltas
      }
    ]
  };
}
