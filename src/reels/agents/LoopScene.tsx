import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { glow, tech } from "../../kit/tech/palette";
import { fonts } from "../../theme";
import { B } from "./timing";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const CX = 540;
const CY = 920;
const R = 380;

// Plan → use apps → check → repeat, lit as each step is spoken, around the glowing core.
const STEPS = [
  { label: "PLAN", at: () => B.plans, angle: -90 },
  { label: "USE APPS", at: () => B.uses, angle: 0 },
  { label: "CHECK", at: () => B.checks, angle: 90 },
  { label: "REPEAT", at: () => B.keeps, angle: 180 },
];

const pos = (deg: number) => ({ x: CX + R * Math.cos((deg * Math.PI) / 180), y: CY + R * Math.sin((deg * Math.PI) / 180) });

export const LoopScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < B.goal - 4 || frame > B.already + 8) return null;
  const fade = interpolate(frame, [B.goal - 4, B.goal + 6, B.already, B.already + 8], [0, 1, 1, 0], clamp);
  const ring = interpolate(frame, [B.goal, B.plans], [0, 1], clamp);
  // The pulse dot runs the loop from "plans" onwards, one lap per ~1.6s.
  const lap = Math.max(0, frame - B.plans) / 48;
  const dot = pos(-90 + lap * 360);
  const goal = spring({ frame: frame - B.goal, fps, config: { damping: 16, stiffness: 150 } });
  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <Img
        src={staticFile("agents/ai-core.png")}
        style={{
          position: "absolute",
          left: CX - 540 * 0.78,
          top: CY - 960 * 0.78 - 20,
          width: 1080 * 0.78,
          height: 1920 * 0.78,
          mixBlendMode: "screen",
          transform: `scale(${1 + 0.03 * Math.sin(frame / 12)})`,
        }}
      />
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke={tech.cyan}
          strokeOpacity={0.55}
          strokeWidth={4}
          strokeDasharray={`${2 * Math.PI * R * ring} ${2 * Math.PI * R}`}
          transform={`rotate(-90 ${CX} ${CY})`}
        />
        {frame >= B.plans ? <circle cx={dot.x} cy={dot.y} r={14} fill={tech.white} style={{ filter: `drop-shadow(0 0 12px ${tech.cyan})` }} /> : null}
      </svg>
      {STEPS.map((s) => {
        const p = pos(s.angle);
        const on = spring({ frame: frame - s.at(), fps, config: { damping: 12, stiffness: 200 } });
        return (
          <div
            key={s.label}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              transform: `translate(-50%, -50%) scale(${0.85 + 0.15 * on})`,
              fontFamily: fonts.mono,
              fontWeight: 700,
              fontSize: 38,
              letterSpacing: 3,
              color: on > 0.5 ? tech.bg : tech.muted,
              background: on > 0.5 ? tech.cyan : tech.panel,
              border: `3px solid ${on > 0.5 ? tech.cyan : `${tech.muted}66`}`,
              boxShadow: on > 0.5 ? glow(tech.cyan, 14) : undefined,
              padding: "12px 22px",
              borderRadius: 14,
              whiteSpace: "nowrap",
            }}
          >
            {s.label}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: goal,
          transform: `translateY(${(1 - goal) * -30}px)`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 700,
            fontSize: 34,
            color: tech.white,
            background: `${tech.violet}33`,
            border: `2px solid ${tech.violet}`,
            padding: "10px 22px",
            borderRadius: 12,
          }}
        >
          GOAL: <span style={{ color: tech.cyan }}>find the best laptop under $1,000</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
