import { AbsoluteFill, Sequence } from "remotion";
import { Chrome } from "../../components/Chrome";
import { Grain } from "../../components/Grain";
import { PhraseCaptions } from "../../components/PhraseCaptions";
import { Soundtrack } from "../../components/Soundtrack";
import { BrandBug } from "../../kit";
import { tech } from "../../kit/tech/palette";
import { TechGrid } from "../../kit/tech/TechGrid";
import { SERIES, seriesTag } from "../../series";
import { ApproveScene } from "./ApproveScene";
import { CapabilitiesScene } from "./CapabilitiesScene";
import { CatchScene } from "./CatchScene";
import { ChatVsAgentScene } from "./ChatVsAgentScene";
import { CUES } from "./cues";
import { HookScene } from "./HookScene";
import { LoopScene } from "./LoopScene";
import { NewsScene } from "./NewsScene";
import { OutroScene } from "./OutroScene";
import { agentsVo, B, END, PHRASES } from "./timing";

const SERIES_ID = "qubitcove";
const EPISODE = 1;

// Qubitcove · 01: "What is an AI agent?" Dark-tech look. No music bed: a platform sound is added at upload.
export const AgentsReel: React.FC = () => (
  <AbsoluteFill>
    <TechGrid />
    <HookScene />
    <NewsScene />
    <ChatVsAgentScene />
    <LoopScene />
    <CapabilitiesScene />
    <CatchScene />
    <ApproveScene />
    <OutroScene />
    <PhraseCaptions phrases={PHRASES} until={B.follow} y={1470} bg={`${tech.bgDeep}e6`} fg={tech.white} border={`${tech.cyan}88`} />
    <Soundtrack voOffset={agentsVo.offset} cues={CUES} voSrc="audio/agents/vo.mp3" />
    <Chrome cuts={[]} tag={seriesTag(SERIES_ID, EPISODE)} accent={tech.cyan} fg={tech.cyan} bg={tech.bgDeep} />
    {/* The outro shows the logo big, so the corner bug steps out there. */}
    <Sequence durationInFrames={B.follow} layout="none">
      <BrandBug src={SERIES[SERIES_ID].logo} width={150} color />
    </Sequence>
    <Grain opacity={0.1} />
  </AbsoluteFill>
);

export const AGENTS_FRAMES = END;
