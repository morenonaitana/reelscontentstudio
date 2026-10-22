import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Cursor, FillText } from "../../kit";
import { glow, tech } from "../../kit/tech/palette";
import { fonts } from "../../theme";
import { B } from "./timing";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// "The smart ones ask before they act, and you stay the boss": an approval prompt you click.
export const ApproveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < B.boss - 4 || frame > B.follow + 8) return null;
  const fade = interpolate(frame, [B.boss - 4, B.boss + 4, B.follow, B.follow + 8], [0, 1, 1, 0], clamp);
  const s = spring({ frame: frame - B.boss, fps, config: { damping: 16, stiffness: 160 } });
  const approved = frame >= B.bossWord;
  const btn = (label: string, primary: boolean) => (
    <div
      style={{
        flex: 1,
        textAlign: "center",
        fontFamily: fonts.sans,
        fontWeight: 800,
        fontSize: 46,
        padding: "26px 0",
        borderRadius: 18,
        color: primary ? tech.bg : tech.muted,
        background: primary ? (approved ? tech.ok : tech.cyan) : "transparent",
        border: primary ? "none" : `3px solid ${tech.muted}66`,
        boxShadow: primary ? glow(approved ? tech.ok : tech.cyan, 14) : undefined,
      }}
    >
      {label}
    </div>
  );
  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <div style={{ position: "absolute", top: 300, left: 0, right: 0, textAlign: "center" }}>
        {frame >= B.you ? (
          <FillText
            text="You stay the boss."
            start={B.you}
            accent={tech.cyan}
            color={tech.white}
            style={{ fontFamily: fonts.sans, fontWeight: 900, fontSize: 96, letterSpacing: -1 }}
          />
        ) : null}
      </div>
      <div
        style={{
          position: "absolute",
          left: 100,
          right: 100,
          top: 620,
          transform: `translateY(${(1 - s) * 90}px) scale(${0.94 + 0.06 * s})`,
          opacity: s,
          background: tech.panel,
          border: `2px solid ${tech.cyan}66`,
          borderRadius: 30,
          padding: "44px 46px",
          boxShadow: `0 30px 80px ${tech.bgDeep}, 0 0 50px ${tech.cyan}22`,
        }}
      >
        <div style={{ fontFamily: fonts.mono, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: tech.cyan }}>AGENT REQUEST</div>
        <div style={{ fontFamily: fonts.sans, fontWeight: 700, fontSize: 52, color: tech.white, marginTop: 22, lineHeight: 1.2 }}>
          Place order: laptop
        </div>
        <div style={{ fontFamily: fonts.mono, fontWeight: 700, fontSize: 64, color: tech.white, marginTop: 10 }}>$949.00</div>
        <div style={{ display: "flex", gap: 28, marginTop: 44 }}>
          {btn("Deny", false)}
          {btn(approved ? "Approved ✓" : "Approve", true)}
        </div>
      </div>
      <Cursor
        keys={[
          { at: B.boss + 6, x: 360, y: 1500, variant: "arrow" },
          { at: B.ask, x: 340, y: 1060, variant: "arrow" },
          { at: B.you - 2, x: 720, y: 1085, variant: "hand" },
          { at: B.bossWord, x: 720, y: 1085, variant: "hand", click: true },
        ]}
        scale={1.2}
      />
    </AbsoluteFill>
  );
};
