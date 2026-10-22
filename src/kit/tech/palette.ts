// Dark-tech colour system (Qubitcove). Matches the logo: midnight navy, cyan → violet glow.
export const tech = {
  bg: "#0b1020",
  bgDeep: "#060914",
  panel: "#121a33",
  line: "rgba(120,170,255,0.10)",
  cyan: "#22e4ff",
  violet: "#7c5cff",
  white: "#eef4ff",
  muted: "#8a96b8",
  alert: "#ff3b5c",
  ok: "#3dffa8",
};

export const glow = (color: string, size = 24) => `0 0 ${size}px ${color}, 0 0 ${size * 2}px ${color}55`;
