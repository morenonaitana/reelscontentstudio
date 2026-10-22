import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { MonoCounter, NewsCard } from "../../kit";
import { glow, tech } from "../../kit/tech/palette";
import { fonts } from "../../theme";
import { SourceChip } from "./SourceChip";
import { B } from "./timing";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// "The catch?" over a red-alert server aisle, then the real Live Science headline (Apr 29, 2026)
// underlined in red, and a 0 → 9 second counter.
export const CatchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < B.catch - 4 || frame > B.boss + 8) return null;
  const fade = interpolate(frame, [B.catch - 4, B.catch + 4, B.boss, B.boss + 8], [0, 1, 1, 0], clamp);
  const pulse = 0.55 + 0.25 * Math.sin(frame / 4);
  const slam = spring({ frame: frame - B.catch, fps, config: { damping: 10, stiffness: 240, mass: 0.7 } });
  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <Img
        src={staticFile("agents/servers-red.png")}
        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: pulse, transform: `scale(${1.05 + (frame - B.catch) * 0.0008})` }}
      />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, ${tech.bgDeep}55, ${tech.bgDeep}ee 85%)` }} />
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: fonts.sans,
          fontWeight: 900,
          fontSize: 130,
          letterSpacing: -2,
          color: tech.alert,
          textShadow: glow(tech.alert, 20),
          transform: `scale(${interpolate(slam, [0, 1], [1.8, 1])})`,
          opacity: interpolate(frame, [B.catch, B.catch + 3], [0, 1], clamp),
        }}
      >
        THE CATCH?
      </div>
      <NewsCard
        src="news/agents-livescience.png"
        imgW={1880}
        imgH={880}
        width={960}
        x={540}
        y={880}
        rotate={2}
        enter={B.one}
        marks={[
          { box: { x: 548, y: 196, w: 1200, h: 76 }, at: B.deleted, kind: "underline", color: tech.alert, duration: 10 },
          { box: { x: 272, y: 306, w: 1090, h: 76 }, at: B.database, kind: "underline", color: tech.alert, duration: 10 },
        ]}
        seed="livescience-agents"
      />
      {frame >= B.nine ? (
        <div style={{ position: "absolute", top: 1170, left: 0, right: 0, textAlign: "center", textShadow: glow(tech.alert, 12) }}>
          <MonoCounter from={0} to={9} start={B.nine} end={B.nine + 18} size={110} color={tech.white} format={(n) => `00:0${Math.round(n)}`} />
        </div>
      ) : null}
      <SourceChip text="LIVE SCIENCE · APR 2026" at={B.one + 10} until={B.boss} x={540} y={1320} />
    </AbsoluteFill>
  );
};
