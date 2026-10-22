import { Img, staticFile } from "remotion";

type Props = { src?: string | null; width?: number; onDark?: boolean; opacity?: number; color?: boolean };

// Brand logo, bottom-right on every frame. The source file is white, so on light
// scenes it's rendered charcoal; pass onDark for white. src={null} renders nothing
// (series without a logo, see src/series.ts). `color` keeps a full-colour logo and
// lighten-blends it, so a dark square behind the mark disappears on equally dark scenes.
export const BrandBug: React.FC<Props> = ({
  src = "assets/Truflation_Logo_White 4.png",
  width = 230,
  onDark = false,
  opacity = 0.92,
  color = false,
}) => src === null ? null : (
  <Img
    src={staticFile(src)}
    style={{
      position: "absolute",
      right: 64,
      bottom: 70,
      width,
      opacity,
      filter: color || onDark ? undefined : "brightness(0) saturate(0) opacity(0.88)",
      mixBlendMode: color ? "lighten" : undefined,
    }}
  />
);
