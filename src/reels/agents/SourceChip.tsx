import { interpolate, useCurrentFrame } from "remotion";
import { tech } from "../../kit/tech/palette";
import { fonts } from "../../theme";

// Outlet + date under a news card (the crops leave the masthead out).
export const SourceChip: React.FC<{ text: string; at: number; until: number; x: number; y: number }> = ({ text, at, until, x, y }) => {
  const frame = useCurrentFrame();
  if (frame < at || frame > until) return null;
  const p = interpolate(frame, [at, at + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, ${(1 - p) * 14}px)`,
        opacity: p,
        fontFamily: fonts.mono,
        fontWeight: 700,
        fontSize: 30,
        letterSpacing: 3,
        color: tech.cyan,
        background: tech.panel,
        border: `2px solid ${tech.cyan}66`,
        padding: "8px 18px",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};
