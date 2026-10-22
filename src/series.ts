// Series = the brand a reel ships under: the top-left tag (`Chrome`) and the logo (`BrandBug`).
// Each reel picks one. Add a new series here (logo file in public/assets/, or null for none).
export type Series = {
  name: string;
  logo: string | null;
};

export const SERIES = {
  // Reels 01–03: finance explainers for Truflation.
  money: { name: "MONEY, EXPLAINED", logo: "assets/Truflation_Logo_White 4.png" },
  // Default for any other topic: neutral tag, no logo.
  explained: { name: "EXPLAINED", logo: null },
  // Tech & AI channel. Full-colour logo on a navy square: render it with BrandBug `color` (lighten blend).
  qubitcove: { name: "QUBITCOVE", logo: "assets/qubitcove-logo.png" },
} as const satisfies Record<string, Series>;

export type SeriesId = keyof typeof SERIES;

// seriesTag("money", 4) → "MONEY, EXPLAINED · 04"
export const seriesTag = (id: SeriesId, n: number | string): string =>
  `${SERIES[id].name} · ${typeof n === "number" ? String(n).padStart(2, "0") : n}`;
