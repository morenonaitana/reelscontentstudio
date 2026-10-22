import words from "../../../public/audio/agents/vo-words.json";
import type { Phrase } from "../../components/PhraseCaptions";
import { FPS } from "../../theme";
import { createVoTrack } from "../../voTrack";

export const agentsVo = createVoTrack(words, FPS, 4);
const f = agentsVo.voFrame;

export const END = agentsVo.voEndFrame() + 45;

// Beats, keyed to the narration. Repeats: "the" ×7, "a" ×3 ("A chatbot", "a goal", "a company's"), "it" ×3.
export const B = {
  might: f("might"),
  news: f("the"),
  racing: f("racing"),
  agents: f("agents"),
  chatbot: f("a"),
  agent: f("an"),
  job: f("job"),
  goal: f("give"),
  plans: f("plans"),
  uses: f("uses"),
  checks: f("checks"),
  keeps: f("keeps"),
  already: f("it", 2),
  research: f("research"),
  code: f("code"),
  cart: f("shopping"),
  catch: f("the", 3),
  one: f("one"),
  deleted: f("deleted"),
  database: f("database"),
  nine: f("nine"),
  boss: f("so"),
  ask: f("ask"),
  you: f("you"),
  bossWord: f("boss"),
  follow: f("follow"),
  brand: f("cuebitcove"),
};

// Captions show what's said, with digits and the real spelling of the brand.
// The hook has none: the headline on screen already says it.
export const PHRASES: Phrase[] = [
  { at: B.news, text: "The biggest names in tech and payments are racing to build AI agents." },
  { at: B.chatbot, text: "A chatbot answers your question." },
  { at: B.agent, text: "An agent does the job." },
  { at: B.goal, text: "Give it a goal: it plans the steps," },
  { at: B.uses, text: "uses your apps, checks its work, and keeps going." },
  { at: B.already, text: "It can already research, write code, and fill your shopping cart." },
  { at: B.catch, text: "The catch?" },
  { at: B.one, text: "One agent deleted a company's entire database in 9 seconds." },
  { at: B.boss, text: "So the smart ones ask before they act, and you stay the boss." },
];
