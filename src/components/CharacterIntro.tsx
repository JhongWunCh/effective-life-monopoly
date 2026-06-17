import { protagonists } from "../game/data";
import { indicatorKeys, indicatorLabels } from "../game/indicators";
import aliImage from "../assets/characters/ali-baba-anime.png";
import atuImage from "../assets/characters/atu-farmer-anime.png";
import babyImage from "../assets/characters/jin-beibei-anime.png";
import sunImage from "../assets/characters/sun-xiaomei-anime.png";

const formatHours = (hours: number) => `${hours.toFixed(1).replace(/\.0$/, "")}h`;

const characterFlair: Record<
  string,
  {
    title: string;
    roast: string;
    image: string;
  }
> = {
  ali: {
    title: "沙巴上海島多孩帝王",
    roast: "白天像富翁，晚上像家政部長。左手奶瓶、右手菜瓜布，人生 KPI 是孩子睡著、碗也不能臭掉。",
    image: aliImage
  },
  atu: {
    title: "台南田埂神秘地主",
    roast: "戴上斗笠就是田野傳說，放下鋤頭就去醫院拿藥。最強被動技：跟護理站聊到忘記時間。",
    image: atuImage
  },
  sun: {
    title: "信義區百貨女王",
    roast: "中國娃娃頭一甩，taxi 自動靠邊。她不是在逛百貨，是在巡視人生戰場的新品補給線。",
    image: sunImage
  },
  baby: {
    title: "兩歲商業神話寶寶",
    roast: "會開董事會，也會拖棉被。喝奶是流動性補給，溜滑梯是策略性放空，娃娃是首席幕僚。",
    image: babyImage
  }
};

export function CharacterIntro() {
  return (
    <section className="character-page" aria-label="角色介紹">
      <div className="panel-heading">
        <p className="panel-kicker">Cast</p>
        <h2>角色介紹</h2>
      </div>
      <div className="character-grid">
        {protagonists.map((protagonist) => (
          <article className="character-card" key={protagonist.id} aria-label={`${protagonist.name} 角色卡`}>
            <div className="character-art-wrap">
              <img
                alt={`${protagonist.name} 動漫造型`}
                className="character-art"
                src={characterFlair[protagonist.id]!.image}
              />
            </div>
            <div className="character-card-header">
              <div>
                <p className="character-kicker">主人翁</p>
                <h3>{protagonist.name}</h3>
                <strong className="character-title">{characterFlair[protagonist.id]!.title}</strong>
              </div>
              <span>{formatHours(24 - protagonist.startingDeductionHours)}</span>
            </div>
            <p className="character-identity">{characterFlair[protagonist.id]!.roast}</p>
            <dl className="character-indicators">
              {indicatorKeys.map((indicatorKey) => (
                <div key={indicatorKey}>
                  <dt>{indicatorLabels[indicatorKey]}</dt>
                  <dd>{protagonist.baseIndicators[indicatorKey]}</dd>
                </div>
              ))}
            </dl>
            <div className="burden-list" aria-label={`${protagonist.name} 固定時間`}>
              <span>開局扣時 {formatHours(protagonist.startingDeductionHours)}</span>
              <span>起始可支配 {formatHours(24 - protagonist.startingDeductionHours)}</span>
              {protagonist.fixedBurdens.map((burden) => (
                <span key={burden.label}>
                  {burden.label} -{formatHours(burden.hours)}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
