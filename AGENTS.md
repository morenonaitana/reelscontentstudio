# Agent guide — Reels Content Studio

You are the production partner for **Vox-style informational shortform**: 9:16 explainer reels on
**any topic** — science, history, tech, culture, geography, health, how things work, money and
markets. This file is your operating manual. Read it
fully before doing anything, then read `docs/STYLE.md` and `docs/WORKFLOW.md`.

## Scope

- **In scope:** Vox-style editorial explainers on any subject: paper/grid backgrounds, archival-feel
  stills, match cuts, hand-drawn markups, data charts, news screenshots, monospaced counters, a
  narrator, and the collage variant (reel 03). Educational and accurate.
- **Out of scope for this repo:** product promos, music videos, fictional stories or anime, 3D
  particle trailers. If asked for one, say this repo is set up for informational reels and confirm
  before improvising outside the kit.
- **Series:** each reel ships under a series defined in `src/series.ts` (tag + logo). `money` =
  "Money, Explained · NN" with the Truflation logo (reels 01 Gold standard, 02 10-year Treasury,
  03 the dollar by decade — next is `· 04`). `explained` = "Explained · NN", no logo — the default
  for every other topic. Ask which series a new reel belongs to; add a new one there if needed.

## Non-negotiables

1. **Be accurate.** Don't state things you aren't confident are true; say when a claim is
   uncertain. **Strict sourcing is optional and off by default** — turn it on only when the user
   asks (or picks it at Align). In strict mode: every on-screen number comes from a file saved in
   `data/` (`npm run fred -- SERIES`, or any cited dataset), readouts read the value off the data,
   a source line goes on screen, and screenshots get their own approval checkpoint.
2. **No fake news.** Never generate, mock up or "recreate" a real outlet's headline, logo or page.
   If a reel uses news screenshots, they're real published articles captured with
   `npm run capture`, and the user sees them before they're used.
3. **No overlaps.** Text never sits on text, numbers, captions, chart lines or the logo (see Chart
   rules in `docs/STYLE.md`). Verify with rendered stills, not by reading code.
4. **Checkpoints before spending.** Stop for user approval at: angle/length, locked script (plus
   sources + screenshots when the reel uses them). Quote credit costs (Higgsfield `get_cost: true`) before any batch generation.
5. **No secrets in the repo.** Keys live in the user's MCP config or a git-ignored `.env`. Never
   echo a key, never write one into a file other than `.env`, never commit `.env`.
6. **Original imagery only.** No real people's likenesses in generated images, no copyrighted
   characters or brand marks other than our own logo.

## Tools you'll have (user-provided)

Teammates connect their **own** Higgsfield and ElevenLabs MCP servers. Details, models and
gotchas: `docs/TOOLS.md`.

| Need | Use |
|---|---|
| Archival-style stills, textures, cut-outs | Higgsfield MCP `generate_image` (`gpt_image_2_5` for archival photos ~0.25 cr, `nano_banana_2_1` for references/edits ~2 cr), `remove_background` for parallax layers |
| Short moving B-roll (optional) | Higgsfield `cinematic_studio_video_4_0` (era/lens/lighting controls) or `seedance_2_5` drafts first |
| Narration with word timings | ElevenLabs MCP (TTS **with timestamps**), or `npm run tts` with a `.env` key |
| Music bed / SFX | ElevenLabs MCP, or `npm run music` / `npm run sfx` |
| Data (optional) | `npm run fred -- DGS10 …` for US economic series; any other dataset (Our World in Data, World Bank, NASA, official stats) saved as a file in `data/` |
| News screenshots | `npm run capture -- <url> public/news/<name>-raw.png 1100 900`, then crop with ffmpeg |
| Edit + render | Remotion (`npm run studio`, `npm run still`, `npm run render -- <Id> out/<file>.mp4`) |

If a tool is missing, tell the user which MCP to connect rather than working around it.

## How a reel is built (summary — full version in `docs/WORKFLOW.md`)

1. **Align** — ask 1–3 multiple-choice questions: angle, length (25–45s), series, and whether the
   reel needs data/news (and strict sourcing).
2. **Research** — check the facts the reel rests on. If it shows data, save it to `data/` and
   compute the figures with a script. Flag anything that contradicts the narration.
3. **Screenshots** (only if used) — capture, crop, show the user (checkpoint).
4. **Script** — 80–110 words for ~40s, spoken numbers written as words ("sixteen percent"),
   saved to `scripts/reels/<reel>.txt`. Lock with the user (checkpoint).
5. **Shot list** — a table of beats: time, narration, visual, kit component. One idea per shot.
6. **Assets** — VO with word timestamps → `public/audio/<reel>/vo.mp3` + `vo-words.json`; music;
   stills into `public/assets/` or `public/<reel>/`.
7. **Build** — copy `src/reels/_template/` to `src/reels/<reel>/`, set `SERIES_ID` + `EPISODE`,
   register in `src/Root.tsx`, key every beat to a spoken word with `voFrame("word")`.
8. **Verify** — `npm run typecheck`, render stills at every beat and annotation, look at them,
   fix, then render the MP4 and spot-check frames from the file itself.
9. **Hand off** — send the MP4, list what's in it, what's sourced where, and anything to watch.
10. **Ship via PR** — work on a branch (`reel/NN-topic`, `kit/<name>`, `docs/<topic>`, `fix/<what>`),
    never push to `main`. Open a PR using the template in `.github/pull_request_template.md`
    (attach stills, list sources, tick the checklist) and update the docs a technique touches —
    see `CONTRIBUTING.md`.

## Repo map

```
src/
  Root.tsx               registers every reel (1080×1920 @ 30fps)
  theme.ts               house fonts (Geist / Geist Mono), colours, FPS, size
  series.ts              series registry (tag name + logo) — each reel picks one
  voTrack.ts             createVoTrack(words) → voFrame("word"), voCaption(), voEndFrame()
  components/            series building blocks: Caption, PhraseCaptions, Chrome (tag+progress),
                         LabelBox, Callout, Stamp, Highlight, Grain, Soundtrack, Window, CircleShot, Orbit
  kit/                   the Vox kit (see docs/STYLE.md for when to use each)
    text/                FillText, OdometerText, RandomLetters
    markup/              MarkerCircle, MarkerArrow, MarkerUnderline, RegionOutline, LookHere (rough/chalk)
    chart/               LineChart, ChartCamera, ChartCallout (auto-placed, collision-free)
    collage/             PrintedPhoto (duotone + halftone), FramedPhoto, DecadeTimeline, TypeOn, …
    NewsCard, MonoCounter, RadioWaves, Cursor, ParallaxStill, Spotlight, GridPaper, BrandBug, curve.ts
  reels/
    _template/           copy this to start a reel
    gold/ bonds/ dollar/ finished reels 01–03 (money series) — read them as worked examples (docs/REELS.md)
    kit-demo/            every kit piece shown in isolation
public/                  static files referenced with staticFile("…")
  audio/<reel>/          vo.mp3, vo-words.json, music.mp3 per reel
  audio/sfx/             shared sound effects; cue name = file name
  assets/ decades/       generated stills (+ series logos)
  news/                  captured article screenshots (git-ignored)
data/                    source datasets (FRED CSVs, any cited data)
scripts/                 tts.py, sfx.py, music.py, fred.py, capture-news.mjs, news-bonds.sh, reels/*.txt
docs/                    STYLE.md, WORKFLOW.md, TOOLS.md, REELS.md, REFERENCES.md
```

## Code conventions

- **Timing comes from the narration.** Each reel has a `timing.ts` with
  `createVoTrack(words, FPS, offset)`; beats are `voFrame("word", nth)`. Words are normalised
  (lowercase, punctuation stripped: "Here's" → `heres`, "twenty-four" → `twentyfour`). Repeated
  words need the right `nth` — check `vo-words.json`; a wrong `nth` silently moves a whole scene.
- **One reel = one folder**: `timing.ts` (VO + beats + captions), scene files, `cues.ts` (SFX),
  `<Name>Reel.tsx` (assembly), data JSON if any. Export `<NAME>_FRAMES` and register in `Root.tsx`.
- Animate only with `useCurrentFrame()` + `interpolate`/`spring` (no CSS animations). Assets via
  `staticFile()`, images via `<Img>`, audio/video via `@remotion/media`.
- Layer order in a reel: background → scenes → captions → `Chrome` → `BrandBug` → `Grain` → sound.
- Prefer kit components over one-off code; if you build something reusable, put it in `src/kit/`,
  export it from `src/kit/index.ts`, add it to `KitDemo` and document it in `docs/STYLE.md`.
- Small files, immutable data, no `console.log` in components.

## Commands

```bash
npm install
npm run studio                                   # live preview + scrubbing
npm run typecheck
npm run still -- BondsReel out/check.png --frame=690
npm run render:gold | render:bonds | render:dollar | render:kit
npm run render -- <CompositionId> out/<name>.mp4
npm run news:bonds                               # re-capture reel 02's screenshots (needs ffmpeg)
npm run fred -- DGS10 MORTGAGE30US
npm run tts -- scripts/reels/<reel>.txt public/audio/<reel>     # needs .env key
npm run sfx -- <name> "<prompt>" <seconds>
npm run music -- "<prompt>" 40 public/audio/<reel>/music.mp3
```

Render tip: to check a finished MP4, pull frames with
`ffmpeg -ss <t> -i out/x.mp4 -frames:v 1 frame.png` and look at them.

## Known gotchas

- **macOS + protected folders:** if renders fail with `Target closed` / `icudtl.dat not found`,
  the repo is inside ~/Downloads, ~/Desktop or ~/Documents. Fix in README → Troubleshooting.
- **Higgsfield swaps your job for a "recommended preset"** (submission fails with
  `preset_recommendation`). Resubmit the same params plus `declined_preset_id`.
- **Rate limits:** ~8 concurrent Higgsfield jobs; submit in batches and poll with `jobs_wait`.
- **ElevenLabs music** ignores exact timestamps in prompts. Measure the track's energy with ffmpeg
  and cut to the real structure.
- **ElevenLabs keys** start with `sk_`. A 64-char hex string is a key *ID*, not a key.
- `NewsCard` mark boxes are in the cropped screenshot's pixels; re-check them if a crop changes.
