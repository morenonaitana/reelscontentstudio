import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MarkerCircle } from "../../kit";
import { glow, tech } from "../../kit/tech/palette";
import { fonts } from "../../theme";
import { B } from "./timing";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Built lazily: module-level JSX runs before Remotion's React is ready.
const ICONS = {
  search: () => (
    <>
      <circle cx={26} cy={26} r={16} fill="none" stroke="currentColor" strokeWidth={6} />
      <path d="M38 38 L52 52" stroke="currentColor" strokeWidth={7} strokeLinecap="round" />
    </>
  ),
  code: () => <path d="M20 16 L6 30 L20 44 M40 16 L54 30 L40 44 M34 10 L26 50" fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />,
  cart: () => (
    <>
      <path d="M4 8 H14 L20 38 H48 L54 16 H17" fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={24} cy={49} r={5} fill="currentColor" />
      <circle cx={44} cy={49} r={5} fill="currentColor" />
    </>
  ),
};

const ITEMS = [
  { icon: ICONS.search, label: "Research", sub: "reads and sums it up", at: () => B.research },
  { icon: ICONS.code, label: "Write code", sub: "builds and fixes", at: () => B.code },
  { icon: ICONS.cart, label: "Fill your cart", sub: "then asks you to pay", at: () => B.cart },
];

const TOP = 380;
const GAP = 250;

// Three things agents already do, one chip per spoken item; the cart gets circled.
export const CapabilitiesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < B.already || frame > B.catch + 8) return null;
  const out = interpolate(frame, [B.catch, B.catch + 8], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      {ITEMS.map((it, i) => {
        const s = spring({ frame: frame - it.at(), fps, config: { damping: 14, stiffness: 170 } });
        if (frame < it.at()) return null;
        return (
          <div
            key={it.label}
            style={{
              position: "absolute",
              left: 110,
              right: 110,
              top: TOP + i * GAP,
              height: 190,
              transform: `translateX(${(1 - s) * 120}px)`,
              opacity: s,
              display: "flex",
              alignItems: "center",
              gap: 36,
              padding: "0 40px",
              background: tech.panel,
              border: `2px solid ${tech.cyan}55`,
              borderRadius: 26,
            }}
          >
            <svg width={96} height={96} viewBox="0 0 60 60" style={{ color: tech.cyan, filter: `drop-shadow(0 0 10px ${tech.cyan})`, flexShrink: 0 }}>
              {it.icon()}
            </svg>
            <div>
              <div style={{ fontFamily: fonts.sans, fontWeight: 800, fontSize: 60, color: tech.white, textShadow: glow(tech.cyan, 4) }}>{it.label}</div>
              <div style={{ fontFamily: fonts.mono, fontWeight: 500, fontSize: 30, color: tech.muted, marginTop: 4 }}>{it.sub}</div>
            </div>
          </div>
        );
      })}
      <MarkerCircle cx={540} cy={TOP + 2 * GAP + 95} rx={470} ry={140} start={B.cart + 10} duration={14} color={tech.violet} width={9} />
    </AbsoluteFill>
  );
};
