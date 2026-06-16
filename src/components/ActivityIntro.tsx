const lifeFacets = [
  {
    label: "身心能量",
    copy: "有時間不代表有力氣，這張卡在看能不能恢復與行動。"
  },
  {
    label: "深度專注",
    copy: "注意力有限，這張卡在看是否把心力留給重要事情。"
  },
  {
    label: "身心健康",
    copy: "睡眠、壓力與恢復，會影響一整天的選擇品質。"
  },
  {
    label: "人際關係",
    copy: "家人、朋友、同事與信任，都不是有空才經營。"
  },
  {
    label: "有效產出",
    copy: "不是忙完很多事，而是真的推進了有意義的成果。"
  },
  {
    label: "可支配時間",
    copy: "扣掉固定責任後，還剩多少時間能自己安排。"
  }
];

export function ActivityIntro() {
  return (
    <section className="intro-page" aria-label="活動介紹">
      <div className="intro-hero">
        <p className="panel-kicker">Opening</p>
        <h2>活動介紹</h2>
        <p className="intro-lead">每個人一天都是 24 小時，但起點責任不同。</p>
        <p className="intro-statement">有效人生不是把時間塞滿，而是知道哪些時間值得花。</p>
      </div>

      <div className="intro-score-frame" aria-label="核心計分">
        <div className="intro-model-note">
          <p>遊戲不把六個面向做成六種分數，現場只看兩個核心。</p>
          <p>六個面向藏在卡牌設計裡，幫助大家討論什麼叫有效。</p>
        </div>
        <div className="intro-score-grid">
          <article>
            <span>01</span>
            <h3>可支配時間</h3>
            <p>還剩多少能主動安排的時間。</p>
          </article>
          <article>
            <span>02</span>
            <h3>有效選擇</h3>
            <p>這次選擇值不值得花時間。</p>
          </article>
        </div>
      </div>

      <div className="intro-facets" aria-label="卡牌背後的六個人生面向">
        <div className="panel-heading">
          <p className="panel-kicker">Card Logic</p>
          <h2>卡牌背後的六個人生面向</h2>
        </div>
        <div className="facet-grid">
          {lifeFacets.map((facet) => (
            <article key={facet.label} className="facet-card">
              <strong>{facet.label}</strong>
              <p>{facet.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
