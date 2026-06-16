const lifeFacets = [
  {
    label: "身心能量",
    copy: "你是否還有力氣行動，而不是只有時間。"
  },
  {
    label: "深度專注",
    copy: "注意力是否留給真正重要的事。"
  },
  {
    label: "身心健康",
    copy: "睡眠、壓力與恢復會影響整天品質。"
  },
  {
    label: "人際關係",
    copy: "家人、朋友、同事與信任都需要投入。"
  },
  {
    label: "有效產出",
    copy: "今天是否推進了有意義的成果。"
  },
  {
    label: "可支配時間",
    copy: "扣掉責任後，還剩多少能主動安排。"
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
        <p>遊戲只看兩個核心：可支配時間與有效選擇。</p>
        <div className="intro-score-grid">
          <article>
            <span>01</span>
            <h3>可支配時間</h3>
            <p>每組從 24 小時開始，先扣掉角色固定責任，再面對一天中的選擇。</p>
          </article>
          <article>
            <span>02</span>
            <h3>有效選擇</h3>
            <p>時間花掉不一定浪費；只要用在責任、健康、關係或重要目標，就有價值。</p>
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
