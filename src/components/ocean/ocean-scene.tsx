/**
 * Decorative ocean scene built entirely from SVG + CSS animations.
 * Renders fish, bubbles, plankton, light rays and optional debris.
 */

type OceanSceneProps = {
  pollution?: number;
  debris?: boolean;
  className?: string;
};

export function OceanScene({ pollution = 0, debris = false, className = "" }: OceanSceneProps) {
  const p = Math.min(100, Math.max(0, pollution));
  const desat = p / 120;
  const dark = p / 200;

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(180deg,
          oklch(${0.92 - dark} ${0.06 - desat * 0.05} 200) 0%,
          oklch(${0.78 - dark} ${0.11 - desat * 0.08} 210) 30%,
          oklch(${0.45 - dark * 0.6} ${0.15 - desat * 0.1} 225) 70%,
          oklch(${0.18 - dark * 0.3} ${0.08 - desat * 0.05} 250) 100%)`,
      }}
    >
      {/* Light rays from surface */}
      <div
        className="absolute inset-0 opacity-60 mix-blend-screen pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 30% -10%, rgba(255,255,255,.5), transparent 60%), radial-gradient(ellipse 50% 70% at 75% -10%, rgba(180,230,255,.4), transparent 60%)",
        }}
      />

      {/* Caustic shimmer */}
      <div
        className="absolute inset-x-0 top-0 h-24 opacity-50 pointer-events-none animate-wave"
        style={{
          background:
            "repeating-linear-gradient(90deg, transparent 0 30px, rgba(255,255,255,.18) 30px 32px, transparent 32px 80px)",
          maskImage: "linear-gradient(180deg, black, transparent)",
        }}
      />

      {/* Bubbles */}
      {Array.from({ length: 14 }).map((_, i) => {
        const size = 4 + (i % 5) * 3;
        const left = (i * 7.3) % 100;
        const delay = (i * 0.7) % 7;
        const dur = 6 + (i % 5);
        return (
          <span
            key={`b${i}`}
            className="absolute rounded-full bg-white/40 ring-1 ring-white/60 backdrop-blur-[1px]"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: -20,
              animation: `rise ${dur}s linear ${delay}s infinite`,
            }}
          />
        );
      })}

      {/* Plankton dust */}
      {Array.from({ length: 30 }).map((_, i) => {
        const left = (i * 13.7) % 100;
        const top = 20 + ((i * 17) % 70);
        const delay = (i * 0.3) % 5;
        return (
          <span
            key={`p${i}`}
            className="absolute h-[3px] w-[3px] rounded-full bg-aqua-glow/70"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animation: `float ${4 + (i % 4)}s ease-in-out ${delay}s infinite`,
              opacity: 0.4 + ((i % 5) / 10),
            }}
          />
        );
      })}

      {/* Fish swimming */}
      <Fish top="38%" delay={0} dur={22} color="oklch(0.7 0.14 200)" sick={p > 50} />
      <Fish top="55%" delay={4} dur={28} color="oklch(0.82 0.13 190)" sick={p > 70} />
      <Fish top="68%" delay={9} dur={26} reverse color="oklch(0.6 0.12 215)" sick={p > 40} />
      <Fish top="48%" delay={14} dur={32} reverse color="oklch(0.75 0.15 195)" sick={p > 60} />

      {/* Debris when polluted */}
      {debris &&
        Array.from({ length: Math.round(p / 8) }).map((_, i) => {
          const left = (i * 11) % 100;
          const top = 25 + ((i * 23) % 65);
          const types = ["○", "▢", "✕", "◇", "—"];
          return (
            <span
              key={`d${i}`}
              className="absolute text-white/50 text-xs select-none"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animation: `drift ${8 + (i % 6)}s ease-in-out ${i * 0.4}s infinite`,
              }}
            >
              {types[i % types.length]}
            </span>
          );
        })}

      {/* Sea floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent, oklch(0.18 0.05 245) 70%, oklch(0.12 0.04 250))",
        }}
      />
      <svg className="absolute bottom-0 inset-x-0 w-full h-20" viewBox="0 0 1200 80" preserveAspectRatio="none">
        <path d="M0 80 L0 50 C 200 20, 400 70, 600 40 S 1000 20, 1200 55 L 1200 80 Z" fill="oklch(0.14 0.04 252)" />
      </svg>
    </div>
  );
}

function Fish({
  top,
  delay,
  dur,
  reverse,
  color,
  sick,
}: {
  top: string;
  delay: number;
  dur: number;
  reverse?: boolean;
  color: string;
  sick?: boolean;
}) {
  return (
    <div
      className="absolute"
      style={{
        top,
        left: 0,
        animation: `${reverse ? "swim-rev" : "swim"} ${dur}s linear ${delay}s infinite`,
        filter: sick ? "grayscale(0.6) brightness(0.85)" : "none",
      }}
    >
      <svg width="64" height="28" viewBox="0 0 64 28">
        <defs>
          <linearGradient id={`fg${top}${delay}`} x1="0" x2="1">
            <stop offset="0" stopColor={color} stopOpacity="1" />
            <stop offset="1" stopColor="white" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M2 14 Q 12 0 32 4 Q 50 8 56 14 Q 50 20 32 24 Q 12 28 2 14 Z"
          fill={`url(#fg${top}${delay})`}
        />
        <path d="M2 14 L -8 6 L -8 22 Z" fill={color} opacity="0.7" />
        <circle cx="46" cy="12" r="1.6" fill="#0a1a2a" />
      </svg>
    </div>
  );
}
