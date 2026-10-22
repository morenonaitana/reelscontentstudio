import { Cue } from "../../components/Soundtrack";
import { B } from "./timing";

// Checklist ticks, matching ChatVsAgentScene's spacing.
const step = (B.goal - B.agent - 10) / 3;
const ticks = [0, 1, 2].map((i) => Math.round(B.agent + 8 + i * step));

export const CUES: Cue[] = [
  { sfx: "glitch", at: 0, volume: 0.5 },
  { sfx: "click", at: 44, volume: 0.5 },
  { sfx: "glitch", at: B.might, volume: 0.55 },
  { sfx: "whoosh", at: B.news - 4, volume: 0.45 },
  { sfx: "paper", at: B.news + 2, volume: 0.5 },
  { sfx: "highlight", at: B.racing, volume: 0.5 },
  { sfx: "highlight", at: B.agents, volume: 0.45 },
  { sfx: "whoosh-fast", at: B.chatbot - 4, volume: 0.4 },
  { sfx: "typewriter", at: B.chatbot + 6, volume: 0.25 },
  { sfx: "pop", at: B.agent, volume: 0.45 },
  ...ticks.map((at) => ({ sfx: "click", at, volume: 0.45 })),
  { sfx: "whoosh", at: B.goal - 4, volume: 0.4 },
  { sfx: "pop", at: B.plans, volume: 0.4 },
  { sfx: "pop", at: B.uses, volume: 0.4 },
  { sfx: "pop", at: B.checks, volume: 0.4 },
  { sfx: "pop", at: B.keeps, volume: 0.4 },
  { sfx: "whoosh-fast", at: B.already - 4, volume: 0.4 },
  { sfx: "pop", at: B.research, volume: 0.45 },
  { sfx: "pop", at: B.code, volume: 0.45 },
  { sfx: "pop", at: B.cart, volume: 0.45 },
  { sfx: "marker", at: B.cart + 10, volume: 0.45 },
  { sfx: "subdrop", at: B.catch, volume: 0.35 },
  { sfx: "impact", at: B.catch, volume: 0.28 },
  { sfx: "paper", at: B.one, volume: 0.5 },
  { sfx: "marker", at: B.deleted, volume: 0.45 },
  { sfx: "marker", at: B.database, volume: 0.5 },
  { sfx: "tick", at: B.nine, volume: 0.5 },
  { sfx: "whoosh", at: B.boss - 4, volume: 0.4 },
  { sfx: "click", at: B.bossWord, volume: 0.55 },
  { sfx: "ding", at: B.bossWord + 2, volume: 0.4 },
  { sfx: "shimmer", at: B.follow, volume: 0.5 },
];
