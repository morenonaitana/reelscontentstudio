---
name: vox-reel
description: Make a new Vox-style informational reel (9:16 explainer on any topic — science, history, tech, culture, money…) in this repo — from topic to rendered MP4. Use when the user asks for a new reel/short/explainer on a topic, or to remake/extend an existing one.
---

# New Vox-style reel

Follow `AGENTS.md` (rules, repo map) and `docs/WORKFLOW.md` (full process). This skill is the
checklist — create a task per step and stop at every ✋.

1. **Read** `docs/STYLE.md`, `docs/REELS.md`, and the code of the closest existing reel.
2. **Align ✋** — AskUserQuestion: angle, length, series (`src/series.ts`; `explained` unless it's a
   money reel), and data/news needs incl. strict sourcing (off by default). Present a beat table; get a yes.
3. **Research** — check the key facts. If the reel shows data: save it to `data/` (`npm run fred`
   or any dataset), compute figures with a script, report them; flag contradictions.
   Strict mode only: source line on screen, every number read off `data/`.
4. **Screenshots ✋** (skip if none) — `npm run capture`, crop with ffmpeg, show the user. Real articles only.
5. **Script ✋** — 80–110 words / 40s, numbers spelled as spoken, saved to `scripts/reels/<reel>.txt`.
6. **Costs** — preflight Higgsfield costs (`get_cost: true`) and state the total before generating.
7. **Assets** — VO with word timestamps → `public/audio/<reel>/`; music; stills (check each one).
8. **Build** — copy `src/reels/_template/` → `src/reels/<reel>/`; beats via `voFrame("word", nth)`;
   set `SERIES_ID` + `EPISODE` (next number in that series); register in `src/Root.tsx`.
9. **Verify** — `npm run typecheck`; stills at every beat/annotation, tiled and inspected; render;
   check frames + loudness from the MP4. Run the review checklist in WORKFLOW.md.
10. **Hand off** — send the MP4 with a beat summary, sources, credits spent, and caveats.
