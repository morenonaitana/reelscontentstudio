import { AbsoluteFill, useCurrentFrame } from "remotion";
import { tech } from "./palette";

type Props = { cell?: number; drift?: number };

// Dark-tech backdrop: navy base, faint blue grid that drifts slowly upward, cyan/violet haze, vignette.
export const TechGrid: React.FC<Props> = ({ cell = 72, drift = 0.4 }) => {
  const frame = useCurrentFrame();
  const offset = (frame * drift) % cell;
  return (
    <AbsoluteFill style={{ backgroundColor: tech.bg }}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${tech.line} 2px, transparent 2px), linear-gradient(90deg, ${tech.line} 2px, transparent 2px)`,
          backgroundSize: `${cell}px ${cell}px`,
          backgroundPosition: `center ${-offset}px`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 20% 15%, ${tech.cyan}22, transparent 45%), radial-gradient(ellipse at 85% 80%, ${tech.violet}26, transparent 50%)`,
        }}
      />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 45%, transparent 50%, ${tech.bgDeep} 100%)` }} />
    </AbsoluteFill>
  );
};
