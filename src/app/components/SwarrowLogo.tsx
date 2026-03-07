import svgPaths from "../../imports/svg-9zuledu10r";

/**
 * SwarrowCall logo mark (the "C" icon)
 */
export function SwarrowLogoMark({ color = "white", size = 32 }: { color?: string; size?: number }) {
  const width = size * (41.1219 / 44);
  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 41.1219 44"
      fill="none"
    >
      <path d={svgPaths.p3046a680} fill={color} />
      <path d={svgPaths.p30e83b40} fill={color} />
    </svg>
  );
}

/**
 * SwarrowCall logotype ("Swarrow Call" as outlined SVG text)
 */
export function SwarrowLogotype({ color = "white", height = 14 }: { color?: string; height?: number }) {
  const width = height * (200.04 / 23.904);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200.04 23.904"
      fill="none"
    >
      <path d={svgPaths.p2dcf6cc0} fill={color} />
      <path d={svgPaths.p438bc80} fill={color} />
      <path d={svgPaths.p91f7df0} fill={color} />
      <path d={svgPaths.p1471d5f0} fill={color} />
      <path d={svgPaths.p18bdc000} fill={color} />
      <path d={svgPaths.p18f1ba00} fill={color} />
      <path d={svgPaths.p347af300} fill={color} />
      <path d={svgPaths.p639b00} fill={color} />
      <path d={svgPaths.p340c9100} fill={color} />
      <path d={svgPaths.p23d4d900} fill={color} />
      <path d={svgPaths.p34ec2f80} fill={color} />
    </svg>
  );
}

interface SwarrowLogoProps {
  color?: string;
  /** Height of the mark icon in px */
  markSize?: number;
  className?: string;
}

/**
 * Full SwarrowCall logo: mark + outlined logotype
 * Proportions are based on the Figma design (mark 44px tall, logotype 23.904px tall, 16px gap)
 */
export function SwarrowLogo({ color = "white", markSize = 28, className }: SwarrowLogoProps) {
  // Scale the logotype height proportionally to the mark (Figma: 23.904 / 44)
  const logotypeHeight = markSize * (23.904 / 44);
  // Scale the gap proportionally (Figma: 16px gap at 44px mark)
  const gap = markSize * (16 / 44);

  return (
    <div className={`flex items-center ${className || ""}`} style={{ gap }}>
      <SwarrowLogoMark color={color} size={markSize} />
      <SwarrowLogotype color={color} height={logotypeHeight} />
    </div>
  );
}
