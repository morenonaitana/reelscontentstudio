import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { RandomLetters } from "../../kit";
import { glow, tech } from "../../kit/tech/palette";
import { SERIES } from "../../series";
import { fonts } from "../../theme";
import { B } from "./timing";

// Logo lands centre screen with the wordmark and the follow line.
export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < B.follow) return null;
  const s = spring({ frame: frame - B.follow, fps, config: { damping: 12, stiffness: 140 } });
  const line = interpolate(frame, [B.brand + 14, B.brand + 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Img
        src={staticFile(SERIES.qubitcove.logo)}
        style={{
          position: "absolute",
          left: 540 - 260,
          top: 520,
          width: 520,
          mixBlendMode: "lighten",
          transform: `scale(${0.6 + 0.4 * s}) rotate(${(1 - s) * -25}deg)`,
          opacity: s,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 1100,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: fonts.sans,
          fontWeight: 900,
          fontSize: 120,
          letterSpacing: 4,
          color: tech.white,
          textShadow: glow(tech.violet, 16),
        }}
      >
        <RandomLetters text="QUBITCOVE" start={B.brand} seed="qc" style={{ fontStyle: "normal" }} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 1270,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: fonts.mono,
          fontWeight: 700,
          fontSize: 38,
          letterSpacing: 2,
          color: tech.cyan,
          opacity: line,
        }}
      >
        Follow so you're not the last to know
      </div>
    </AbsoluteFill>
  );
};
