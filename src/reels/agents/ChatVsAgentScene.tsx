import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Cursor } from "../../kit";
import { glow, tech } from "../../kit/tech/palette";
import { fonts } from "../../theme";
import { B } from "./timing";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const CHAT = "Here's how you could do it: 1. Search a few stores. 2. Compare the prices. 3. Then add it to your cart yourself.";
const TASKS = ["Searched 12 stores", "Compared prices", "Added the best one to cart"];

const Panel: React.FC<{ y: number; h: number; label: string; accent: string; at: number; children: React.ReactNode }> = ({
  y,
  h,
  label,
  accent,
  at,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 18, stiffness: 160 } });
  if (frame < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        top: y,
        height: h,
        transform: `translateY(${(1 - s) * 80}px)`,
        opacity: s,
        background: tech.panel,
        border: `2px solid ${accent}55`,
        borderRadius: 28,
        boxShadow: `0 0 40px ${accent}22`,
        padding: "34px 40px",
      }}
    >
      <div style={{ fontFamily: fonts.mono, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: accent }}>{label}</div>
      {children}
    </div>
  );
};

const Check: React.FC<{ on: number }> = ({ on }) => (
  <svg width={46} height={46} viewBox="0 0 46 46" style={{ flexShrink: 0 }}>
    <circle cx={23} cy={23} r={20} fill={on > 0 ? tech.cyan : "none"} stroke={tech.cyan} strokeWidth={3} opacity={0.4 + on * 0.6} />
    <path d="M13 24 L20 31 L33 16" fill="none" stroke={tech.bg} strokeWidth={5} strokeLinecap="round" strokeDasharray={30} strokeDashoffset={30 * (1 - on)} />
  </svg>
);

// "A chatbot answers your question. An agent does the job." Chat text vs a checklist that does itself.
export const ChatVsAgentScene: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < B.chatbot || frame > B.goal + 8) return null;
  const out = interpolate(frame, [B.goal, B.goal + 8], [1, 0], clamp);
  const typed = Math.floor(interpolate(frame, [B.chatbot + 6, B.agent], [0, CHAT.length], clamp));
  const step = (B.goal - B.agent - 10) / TASKS.length;
  const tickAt = (i: number) => B.agent + 8 + i * step;
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Panel y={270} h={470} label="CHATBOT" accent={tech.muted} at={B.chatbot}>
        <div
          style={{
            marginTop: 26,
            background: "#1c2647",
            borderRadius: "24px 24px 24px 6px",
            padding: "24px 28px",
            fontFamily: fonts.sans,
            fontSize: 40,
            lineHeight: 1.3,
            color: tech.white,
            minHeight: 230,
          }}
        >
          {CHAT.slice(0, typed)}
          <span style={{ opacity: frame % 16 < 8 ? 1 : 0, color: tech.cyan }}>▍</span>
        </div>
      </Panel>
      <Panel y={800} h={520} label="AI AGENT" accent={tech.cyan} at={B.agent}>
        <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 34 }}>
          {TASKS.map((t, i) => {
            const on = interpolate(frame, [tickAt(i), tickAt(i) + 6], [0, 1], clamp);
            return (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <Check on={on} />
                <span
                  style={{
                    fontFamily: fonts.sans,
                    fontWeight: 700,
                    fontSize: 46,
                    color: on > 0.5 ? tech.white : tech.muted,
                    textShadow: on > 0.5 ? glow(tech.cyan, 6) : undefined,
                  }}
                >
                  {t}
                </span>
              </div>
            );
          })}
        </div>
      </Panel>
      {frame >= B.agent ? (
        <Cursor
          keys={[
            { at: B.agent, x: 700, y: 1250, variant: "arrow" },
            ...TASKS.flatMap((_, i) => [
              { at: tickAt(i) - 5, x: 150, y: 958 + i * 80, variant: "hand" as const },
              { at: tickAt(i), x: 150, y: 958 + i * 80, variant: "hand" as const, click: true },
            ]),
          ]}
          scale={1.1}
        />
      ) : null}
    </AbsoluteFill>
  );
};
