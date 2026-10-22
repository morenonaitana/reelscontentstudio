import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Cursor, RandomLetters } from "../../kit";
import { glow, tech } from "../../kit/tech/palette";
import { fonts } from "../../theme";
import { B } from "./timing";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Empty desk at night; the cursor moves and clicks on its own. "Your next coworker / might not be human."
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame > B.news + 8) return null;
  const push = interpolate(frame, [0, B.news + 8], [1.04, 1.16], { ...clamp, easing: Easing.inOut(Easing.sin) });
  const out = interpolate(frame, [B.news, B.news + 8], [1, 0], clamp);
  const flicker = frame < 10 ? (frame % 3 === 0 ? 0.4 : 1) : 1;
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <AbsoluteFill style={{ transform: `scale(${push})`, transformOrigin: "30% 38%" }}>
        <Img src={staticFile("agents/hook-desk.png")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: flicker }} />
        {/* Cursor drifts across the glowing monitor and clicks by itself. */}
        <Cursor
          keys={[
            { at: 6, x: 400, y: 620, variant: "arrow" },
            { at: 30, x: 260, y: 700, variant: "arrow" },
            { at: 44, x: 252, y: 694, variant: "hand", click: true },
            { at: 70, x: 330, y: 640, variant: "arrow" },
          ]}
          scale={0.9}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${tech.bgDeep}ee 0%, ${tech.bgDeep}66 34%, transparent 55%)` }} />
      <div style={{ position: "absolute", top: 250, left: 70, right: 70, textAlign: "center" }}>
        <div style={{ fontFamily: fonts.sans, fontWeight: 800, fontSize: 88, color: tech.white, letterSpacing: -1, lineHeight: 1.05 }}>
          <RandomLetters text="Your next coworker" start={2} seed="cow" style={{ fontStyle: "normal" }} />
        </div>
        {frame >= B.might ? (
          <div
            style={{
              marginTop: 18,
              fontFamily: fonts.sans,
              fontWeight: 900,
              fontSize: 86,
              color: tech.cyan,
              textShadow: glow(tech.cyan, 18),
              lineHeight: 1.05,
              transform: `translateX(${frame - B.might < 6 ? ((frame * 37) % 13) - 6 : 0}px)`,
            }}
          >
            might not be human.
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
