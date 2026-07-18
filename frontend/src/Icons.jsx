// Custom gothic SVG components for ASHES

export const AshesLogo = ({ size = 140, animated = false }) => (
  <svg viewBox="0 0 120 140" width={size} height={size * 1.16} fill="none" style={{ filter: 'drop-shadow(0 0 24px rgba(139,24,24,0.5))' }}>
    {/* Gothic arch shape */}
    <path d="M60 0 L82 18 L82 58 L102 78 L102 112 L82 132 L38 132 L18 112 L18 78 L38 58 L38 18 Z"
      fill="none" stroke="rgb(196,72,72)" strokeWidth="1.2" opacity="0.5" strokeLinejoin="round" />
    {/* Inner ornate cross */}
    <path d="M60 22 L60 118 M48 50 L72 50 M42 88 L78 88"
      stroke="rgb(232,220,200)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Flame above cross */}
    <path d="M60 8 Q54 16 58 22 Q60 18 62 22 Q66 16 60 8 Z"
      fill="rgb(255,107,28)" opacity="0.85" />
    {/* Cross base — skull diamond */}
    <path d="M60 100 L65 110 L60 120 L55 110 Z"
      fill="none" stroke="rgb(196,72,72)" strokeWidth="1.5" opacity="0.7" />
    {/* Ornamental side flourishes */}
    <path d="M30 70 Q25 75 28 82 M90 70 Q95 75 92 82"
      stroke="rgb(196,72,72)" strokeWidth="1" strokeLinecap="round" opacity="0.5" fill="none" />
    <path d="M30 64 Q26 68 28 72 M90 64 Q94 68 92 72"
      stroke="rgb(196,72,72)" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" fill="none" />
    {/* Top decorative dot */}
    <circle cx="60" cy="0" r="1.5" fill="rgb(196,72,72)" />
  </svg>
)

export const SkullIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 2 C7.6 2 4 5.6 4 10 C4 12.8 5.4 15.3 7.6 16.7 L7.6 20 C7.6 20.6 8 21 8.6 21 L10 21 L10 19.4 L14 19.4 L14 21 L15.4 21 C16 21 16.4 20.6 16.4 20 L16.4 16.7 C18.6 15.3 20 12.8 20 10 C20 5.6 16.4 2 12 2 Z M9 8 A1.5 1.5 0 0 1 9 11 A1.5 1.5 0 0 1 9 8 Z M15 8 A1.5 1.5 0 0 1 15 11 A1.5 1.5 0 0 1 15 8 Z M11 16 L13 16 L12.5 18 L11.5 18 Z" opacity="0.85" />
  </svg>
)

export const UrnIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
    <path d="M9 3 L9 7 C9 7 6.5 9 6.5 13.5 C6.5 18.5 9 21 12 21 C15 21 17.5 18.5 17.5 13.5 C17.5 9 15 7 15 7 L15 3 Z" />
    <path d="M8 3 L16 3" />
    <path d="M10 12 Q12 14 14 12" />
    <circle cx="10" cy="14" r="0.4" fill="currentColor" stroke="none" />
    <circle cx="14" cy="14" r="0.4" fill="currentColor" stroke="none" />
  </svg>
)

export const FlameIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 2 C13 7 16 9.5 16 14 A4 4 0 0 1 8 14 C8 12 9 11 10 10 C10.5 7.5 11 5 12 2 Z" opacity="0.9" />
    <path d="M11 14 A1 1 0 0 0 13 14 A1 1 0 0 0 11 14 Z" fill="rgb(232,220,200)" opacity="0.6" />
  </svg>
)

export const CrownIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
    <path d="M3 9 L7 13 L12 6 L17 13 L21 9 L21 18 L3 18 Z" />
    <circle cx="3" cy="9" r="0.8" fill="currentColor" />
    <circle cx="21" cy="9" r="0.8" fill="currentColor" />
    <circle cx="12" cy="6" r="0.8" fill="currentColor" />
  </svg>
)

export const DividerSvg = ({ width = 180 }) => (
  <svg viewBox="0 0 180 20" width={width} height={20} fill="none">
    <line x1="0" y1="10" x2="70" y2="10" stroke="rgba(212,192,160,0.3)" strokeWidth="1" />
    <path d="M80 3 L90 10 L80 17 M100 3 L90 10 L100 17"
      stroke="rgb(196,72,72)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    <circle cx="90" cy="10" r="2" fill="rgb(232,220,200)" />
    <line x1="110" y1="10" x2="180" y2="10" stroke="rgba(212,192,160,0.3)" strokeWidth="1" />
  </svg>
)

export const MonadLogo = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M2 12 L7 3 L12 12 L17 3 L22 12 L17 21 L12 12 L7 21 Z" opacity="0.85" />
  </svg>
)
