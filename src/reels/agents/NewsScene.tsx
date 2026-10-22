import { NewsCard } from "../../kit";
import { SourceChip } from "./SourceChip";
import { B } from "./timing";

const HIGHLIGHT = "#8cf3ff";

// Real CNBC headline (Dec 29, 2025): cyan highlighter on "AI agents book flights and shop for you".
export const NewsScene: React.FC = () => (
  <>
    <NewsCard
      src="news/agents-cnbc.png"
      imgW={1340}
      imgH={510}
      width={960}
      x={540}
      y={820}
      rotate={-2}
      enter={B.news}
      exit={B.chatbot - 6}
      focus={{ box: { x: 20, y: 70, w: 1300, h: 250 }, from: B.news + 10, to: B.chatbot, zoom: 1.12 }}
      marks={[
        { box: { x: 552, y: 152, w: 760, h: 82 }, at: B.racing, kind: "highlight", color: HIGHLIGHT, duration: 10 },
        { box: { x: 22, y: 236, w: 628, h: 80 }, at: B.agents, kind: "highlight", color: HIGHLIGHT, duration: 8 },
      ]}
      seed="cnbc-agents"
    />
    <SourceChip text="CNBC · DEC 2025" at={B.news + 10} until={B.chatbot - 4} x={540} y={1080} />
  </>
);
