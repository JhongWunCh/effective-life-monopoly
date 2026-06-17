import aliBabaArt from "../assets/characters/ali-baba-anime.png";
import atuArt from "../assets/characters/atu-farmer-anime.png";
import jinBeibeiArt from "../assets/characters/jin-beibei-anime.png";
import sunXiaomeiArt from "../assets/characters/sun-xiaomei-anime.png";

const playSteps = [
  {
    index: "01",
    title: "選一個角色",
    copy: "每個角色都有自己的責任和起點，不是每個人都從同一條線開始。"
  },
  {
    index: "02",
    title: "遇到生活事件",
    copy: "擲骰走過一天，遇到工作、家庭、健康、關係和突然冒出的狀況。"
  },
  {
    index: "03",
    title: "做選擇，看結果",
    copy: "每次選擇都會改變剩餘時間，也可能讓人生有效點上升或下降。"
  }
];

const watchMetrics = [
  {
    label: "可支配時間",
    copy: "還剩多少自己的時間。"
  },
  {
    label: "人生有效點",
    copy: "這次選擇值不值得花時間。"
  }
];

const lifeFacets = [
  {
    label: "身心能量",
    copy: "有時間不代表有力氣，身體和心情也會影響我們能不能行動。"
  },
  {
    label: "深度專注",
    copy: "注意力有限，真正重要的事通常需要留一點完整心力。"
  },
  {
    label: "身心健康",
    copy: "睡眠、壓力和恢復，會讓同一個選擇變得完全不一樣。"
  },
  {
    label: "人際關係",
    copy: "家人、朋友、同事與信任，都不是有空才經營。"
  },
  {
    label: "有效產出",
    copy: "不是忙完很多事，而是有沒有真的往重要成果前進一點。"
  },
  {
    label: "可支配時間",
    copy: "扣掉固定責任後，還剩多少時間能自己安排。"
  }
];

const characterPreviews = [
  { name: "阿里爸爸", art: aliBabaArt },
  { name: "阿吐伯", art: atuArt },
  { name: "孫小梅", art: sunXiaomeiArt },
  { name: "金被被", art: jinBeibeiArt }
];

type ActivityIntroProps = {
  onOpenCharacters: () => void;
};

export function ActivityIntro({ onOpenCharacters }: ActivityIntroProps) {
  return (
    <section className="intro-page" aria-label="活動介紹">
      <div className="intro-hero">
        <div className="intro-hero-copy">
          <p className="intro-pill">45 分鐘月會互動遊戲</p>
          <h2>用一局大富翁，聊聊時間花在哪裡</h2>
          <p className="intro-lead">這不是考核，也不是效率工具。</p>
          <p className="intro-statement">
            每個人一天都是 24 小時，但每個人的責任、精神、關係和突發狀況都不一樣。
            這場活動想讓大家在遊戲裡看看：時間有限的時候，我們會怎麼選擇。
          </p>
          <div className="intro-reassurance" aria-label="活動提醒">
            <span>沒有標準答案，也不比較誰比較有效率。</span>
            <span>重點是聊聊每次選擇背後的取捨。</span>
          </div>
          <button type="button" className="intro-primary-action" onClick={onOpenCharacters}>
            看角色
          </button>
        </div>
        <aside className="intro-cast-panel" aria-label="角色預覽">
          <div className="intro-cast-grid">
            {characterPreviews.map((character) => (
              <img key={character.name} src={character.art} alt={`${character.name} 角色預覽`} />
            ))}
          </div>
          <p>先換個人生起點，再做一天的選擇。</p>
        </aside>
      </div>

      <div className="intro-flow" aria-label="玩法流程">
        <div className="panel-heading">
          <p className="panel-kicker">怎麼玩</p>
          <h2>三步驟就能開始</h2>
        </div>
        <div className="intro-step-grid">
          {playSteps.map((step) => (
            <article key={step.title} className="intro-step-card">
              <span>{step.index}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="intro-watch-panel" aria-label="遊戲觀察重點">
        <div className="intro-host-prompt">
          <span>主持人提問</span>
          <strong>如果今天只剩 2 小時，你會把它花在哪裡？</strong>
          <p>玩到最後，請回頭看：哪些時間花得值得，哪些只是被忙碌吃掉了。</p>
        </div>
        <div className="intro-score-frame">
          <div className="panel-heading">
            <p className="panel-kicker">看兩件事</p>
            <h2>時間花掉後，有沒有變得值得</h2>
          </div>
          <div className="intro-score-grid">
            {watchMetrics.map((metric, index) => (
              <article key={metric.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{metric.label}</h3>
                <p>{metric.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="intro-facets" aria-label="遊戲裡會遇到的日常拉扯">
        <div className="panel-heading">
          <p className="panel-kicker">會遇到什麼</p>
          <h2>遊戲裡會遇到的日常拉扯</h2>
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

      <div className="intro-closeout" aria-label="活動收束">
        <article>
          <span>最後會帶走什麼</span>
          <p>
            不是找出標準答案，而是看見自己和同事在壓力、責任與期待之間，怎麼把有限的時間留給真正重要的人和事。
          </p>
        </article>
      </div>
    </section>
  );
}
