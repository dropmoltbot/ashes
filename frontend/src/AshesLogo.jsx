// † ASHES † — Highly detailed gothic heraldic logo
// Sword-cross + urn + skull + flame + tracery + inscription

export const AshesLogo = ({ size = 180, animated = false }) => {
  const w = size;
  const h = size * (280/240);
  return (
  <div style={{ display: 'block', width: w, height: h, overflow: 'visible', margin: '0 auto', lineHeight: 0, position: 'relative' }}>
    <svg viewBox="0 0 240 280" width={w} height={h} fill="none" style={{ display: 'block', width: w, height: h, filter: 'drop-shadow(0 0 32px rgba(139,24,24,0.7))' }}>
    <defs>
      {/* Metals */}
      <linearGradient id="bladeG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f5ecd9" />
        <stop offset="30%" stopColor="#d4c0a0" />
        <stop offset="70%" stopColor="#c44848" />
        <stop offset="100%" stopColor="#4a0e0e" />
      </linearGradient>
      <linearGradient id="goldG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffe5a0" />
        <stop offset="50%" stopColor="#d4c0a0" />
        <stop offset="100%" stopColor="#8a7050" />
      </linearGradient>
      <linearGradient id="bloodG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c44848" />
        <stop offset="100%" stopColor="#4a0e0e" />
      </linearGradient>
      {/* Urn body */}
      <linearGradient id="urnG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4a0e0e" />
        <stop offset="40%" stopColor="#2a0a0c" />
        <stop offset="100%" stopColor="#0a0508" />
      </linearGradient>
      <linearGradient id="urnHL" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#000" stopOpacity="0" />
        <stop offset="35%" stopColor="#fff" stopOpacity="0.1" />
        <stop offset="50%" stopColor="#fff" stopOpacity="0.18" />
        <stop offset="65%" stopColor="#fff" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#000" stopOpacity="0" />
      </linearGradient>
      {/* Flame */}
      <radialGradient id="flameG" cx="50%" cy="55%" r="55%">
        <stop offset="0%" stopColor="#fffae0" />
        <stop offset="25%" stopColor="#ffd680" />
        <stop offset="55%" stopColor="#ff6b1c" />
        <stop offset="90%" stopColor="#8b1818" />
        <stop offset="100%" stopColor="#4a0e0e" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="flameInner" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fffae0" />
        <stop offset="60%" stopColor="#ffe5a0" />
        <stop offset="100%" stopColor="#ff6b1c" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* === Gothic arch frame (double-layered) === */}
    <path d="M120 8 L156 30 L156 100 L182 122 L182 180 L156 202 L156 258 L84 258 L84 202 L58 180 L58 122 L84 100 L84 30 Z"
      fill="none" stroke="#c44848" strokeWidth="1.8" opacity="0.5" strokeLinejoin="round" />
    <path d="M120 14 L150 32 L150 102 L176 124 L176 176 L150 198 L150 252 L90 252 L90 198 L64 176 L64 124 L90 102 L90 32 Z"
      fill="url(#urnG)" fillOpacity="0.3" stroke="#d4c0a0" strokeWidth="0.6" opacity="0.3" strokeLinejoin="round" />
    {/* Inner thin arch — innermost */}
    <path d="M120 18 L146 34 L146 106 L171 126 L171 172 L146 192 L146 247 L94 247 L94 192 L69 172 L69 126 L94 106 L94 34 Z"
      fill="none" stroke="#d4c0a0" strokeWidth="0.3" opacity="0.2" strokeLinejoin="round" />

    {/* === Cathedral spires/pinnacles === */}
    {/* Center spire with flame */}
    <path d="M114 28 L120 10 L126 28 L120 24 Z" fill="#c44848" opacity="0.9" />
    <path d="M120 10 L117 16 L120 14 L123 16 Z" fill="#ff6b1c" />
    {/* Left spire */}
    <path d="M84 28 L80 18 L84 24 L88 18 Z" fill="#c44848" opacity="0.8" />
    {/* Right spire */}
    <path d="M156 28 L160 18 L156 24 L152 18 Z" fill="#c44848" opacity="0.8" />
    {/* Mini spires */}
    <path d="M70 122 L66 114 L70 118 L74 114 Z" fill="#c44848" opacity="0.6" />
    <path d="M170 122 L174 114 L170 118 L166 114 Z" fill="#c44848" opacity="0.6" />

    {/* === Central cross-sword (anatomy) === */}
    {/* Pommel — large jewel */}
    <circle cx="120" cy="44" r="5" fill="#c44848" stroke="url(#goldG)" strokeWidth="1" />
    <circle cx="120" cy="44" r="2.5" fill="#fffae0" opacity="0.6" />
    {/* Tiny crown around pommel */}
    <path d="M115 42 L117 39 L119 41 L121 39 L123 41 L125 42 L123 44 L125 46 L123 45 L121 47 L119 45 L117 46 L115 44 Z"
      fill="url(#goldG)" opacity="0.7" stroke="#d4c0a0" strokeWidth="0.3" />

    {/* Grip — wrapped leather */}
    <rect x="117" y="50" width="6" height="24" fill="url(#bloodG)" rx="1.5" />
    {/* Grip wrap — diagonal lines */}
    {[53, 57, 61, 65, 69, 73].map((y, i) => (
      <line key={i} x1="116" y1={y} x2="124" y2={y-2} stroke="#d4c0a0" strokeWidth="0.5" opacity="0.6" />
    ))}

    {/* Crossguard — ornate with curls */}
    <path d="M80 76 L160 76 L156 84 L84 84 Z" fill="url(#bloodG)" stroke="url(#goldG)" strokeWidth="0.7" />
    {/* Crossguard center diamond */}
    <path d="M120 73 L128 80 L120 87 L112 80 Z" fill="url(#goldG)" stroke="#c44848" strokeWidth="0.5" />
    <circle cx="120" cy="80" r="1.5" fill="#c44848" />
    {/* Crossguard ends — spiraled curls */}
    <path d="M80 76 Q70 78 72 84 Q78 82 80 82 Q76 86 80 88" fill="none" stroke="url(#goldG)" strokeWidth="0.9" strokeLinecap="round" />
    <path d="M160 76 Q170 78 168 84 Q162 82 160 82 Q164 86 160 88" fill="none" stroke="url(#goldG)" strokeWidth="0.9" strokeLinecap="round" />
    {/* Crossguard end jewels */}
    <circle cx="76" cy="82" r="2" fill="#c44848" stroke="#fffae0" strokeWidth="0.3" />
    <circle cx="164" cy="82" r="2" fill="#c44848" stroke="#fffae0" strokeWidth="0.3" />

    {/* Blade — tapering vertical */}
    <path d="M120 84 L113 175 L120 200 L127 175 Z" fill="url(#bladeG)" />
    {/* Blade fuller (center groove) */}
    <line x1="120" y1="90" x2="120" y2="190" stroke="#fffae0" strokeWidth="0.5" opacity="0.4" />
    {/* Blade edges */}
    <line x1="113" y1="95" x2="113" y2="173" stroke="#fffae0" strokeWidth="0.4" opacity="0.6" />
    <line x1="127" y1="95" x2="127" y2="173" stroke="#fffae0" strokeWidth="0.4" opacity="0.6" />
    {/* Blade tip highlight */}
    <path d="M117 185 L120 198 L123 185 Z" fill="#fffae0" opacity="0.4" />

    {/* === Flame at pommel (animated) — large detailed === */}
    {animated !== false && (
      <g style={{ transformOrigin: '120px 30px' }}>
        <animateTransform attributeName="transform" type="scale"
          values="1 1; 0.92 1.15; 1.05 0.88; 1 1"
          dur="2.4s" repeatCount="indefinite" />
        {/* Outer flame */}
        <path d="M120 20 Q108 32 112 44 Q116 38 120 40 Q124 38 128 44 Q132 32 120 20 Z"
          fill="url(#flameG)" opacity="0.9" />
        {/* Mid flame */}
        <path d="M120 28 Q114 36 117 44 Q120 40 123 44 Q126 36 120 28 Z"
          fill="url(#flameInner)" opacity="0.85" />
        {/* Inner core */}
        <ellipse cx="120" cy="38" rx="3" ry="5" fill="#fffae0" opacity="0.9" />
        {/* Halo */}
        <circle cx="120" cy="35" r="9" fill="none" stroke="#ff6b1c" strokeWidth="0.4" opacity="0.4" strokeDasharray="1.5 2" />
      </g>
    )}
    {animated === false && (
      <>
        <path d="M120 20 Q108 32 112 44 Q116 38 120 40 Q124 38 128 44 Q132 32 120 20 Z" fill="url(#flameG)" opacity="0.9" />
        <path d="M120 28 Q114 36 117 44 Q120 40 123 44 Q126 36 120 28 Z" fill="url(#flameInner)" opacity="0.85" />
        <ellipse cx="120" cy="38" rx="3" ry="5" fill="#fffae0" opacity="0.9" />
        <circle cx="120" cy="35" r="9" fill="none" stroke="#ff6b1c" strokeWidth="0.4" opacity="0.4" strokeDasharray="1.5 2" />
      </>
    )}

    {/* === Skull at blade midpoint (death motif) === */}
    <g transform="translate(106 130)">
      {/* Skull top dome */}
      <ellipse cx="14" cy="10" rx="9" ry="8" fill="#1a0a0c" stroke="url(#goldG)" strokeWidth="0.5" opacity="0.95" />
      {/* Skull forehead inscription dot */}
      <circle cx="14" cy="6" r="0.6" fill="#ff6b1c" opacity="0.7" />
      {/* Eye sockets — deep glowing */}
      <ellipse cx="10" cy="11" rx="2.2" ry="2.8" fill="#0a0508" stroke="#4a0e0e" strokeWidth="0.3" />
      <ellipse cx="18" cy="11" rx="2.2" ry="2.8" fill="#0a0508" stroke="#4a0e0e" strokeWidth="0.3" />
      {/* Glowing eyes */}
      <circle cx="10" cy="11" r="0.8" fill="#ff6b1c" opacity="0.85" />
      <circle cx="18" cy="11" r="0.8" fill="#ff6b1c" opacity="0.85" />
      {/* Nose — small triangle */}
      <path d="M14 14 L13 16 L15 16 Z" fill="#fffae0" opacity="0.7" />
      {/* Teeth grid */}
      <rect x="9" y="16" width="10" height="3" fill="#1a0a0c" stroke="url(#goldG)" strokeWidth="0.3" />
      <line x1="11" y1="16" x2="11" y2="19" stroke="#d4c0a0" strokeWidth="0.3" opacity="0.7" />
      <line x1="13" y1="16" x2="13" y2="19" stroke="#d4c0a0" strokeWidth="0.3" opacity="0.7" />
      <line x1="15" y1="16" x2="15" y2="19" stroke="#d4c0a0" strokeWidth="0.3" opacity="0.7" />
      <line x1="17" y1="16" x2="17" y2="19" stroke="#d4c0a0" strokeWidth="0.3" opacity="0.7" />
      {/* Mandible */}
      <path d="M10 19 L10 22 L18 22 L18 19" fill="none" stroke="url(#goldG)" strokeWidth="0.4" opacity="0.6" />
      {/* Cheekbone shading */}
      <path d="M5 12 Q4 16 8 18" fill="none" stroke="#4a0e0e" strokeWidth="0.3" opacity="0.5" />
      <path d="M23 12 Q24 16 20 18" fill="none" stroke="#4a0e0e" strokeWidth="0.3" opacity="0.5" />
    </g>

    {/* === Urn at blade bottom (offering vessel) === */}
    <g transform="translate(92 180)">
      {/* Urn lid — pointed */}
      <path d="M28 0 L34 -5 L34 0 Z M28 0 L22 -5 L22 0 Z" fill="url(#goldG)" opacity="0.85" />
      {/* Urn lid base */}
      <rect x="22" y="0" width="12" height="3" fill="url(#goldG)" rx="0.5" />
      {/* Urn body */}
      <path d="M16 3 Q12 10 14 18 Q12 28 18 38 L40 38 Q46 28 44 18 Q46 10 42 3 Z"
        fill="url(#urnG)" stroke="url(#goldG)" strokeWidth="0.8" />
      {/* Urn highlight — vertical gloss */}
      <path d="M16 3 Q12 10 14 18 Q12 28 18 38 L40 38 Q46 28 44 18 Q46 10 42 3 Z"
        fill="url(#urnHL)" />
      {/* Urn handles — ornamental */}
      <path d="M14 12 Q6 14 10 22 Q14 18 14 16" fill="none" stroke="url(#goldG)" strokeWidth="0.8" />
      <path d="M44 12 Q52 14 48 22 Q44 18 44 16" fill="none" stroke="url(#goldG)" strokeWidth="0.8" />
      {/* Urn decorative band */}
      <rect x="14" y="18" width="32" height="2" fill="url(#goldG)" opacity="0.6" />
      {/* Urn inscription symbol — omega or cross */}
      <g transform="translate(28 25)" opacity="0.8">
        <path d="M0 -1 L0 6 M-3 1 L3 1" stroke="#fffae0" strokeWidth="0.5" fill="none" />
        <circle cx="0" cy="-2" r="0.8" fill="#ff6b1c" />
      </g>
      {/* Urn base — pedestal */}
      <rect x="18" y="38" width="24" height="3" fill="url(#goldG)" opacity="0.85" rx="0.5" />
      <path d="M16 41 L44 41 L42 46 L18 46 Z" fill="url(#urnG)" stroke="url(#goldG)" strokeWidth="0.5" />
    </g>

    {/* === Gothic tracery — side flourishes === */}
    {/* Left side intricate curls */}
    <path d="M64 130 Q52 140 56 154 Q62 148 64 142 Q66 150 70 148"
      fill="none" stroke="#c44848" strokeWidth="0.8" opacity="0.55" strokeLinecap="round" />
    <path d="M58 150 Q52 158 56 168" fill="none" stroke="#d4c0a0" strokeWidth="0.5" opacity="0.45" strokeLinecap="round" />
    <path d="M70 165 Q60 172 64 182" fill="none" stroke="#c44848" strokeWidth="0.6" opacity="0.45" strokeLinecap="round" />
    <circle cx="55" cy="148" r="1.2" fill="#c44848" opacity="0.5" />
    <circle cx="60" cy="170" r="0.8" fill="#d4c0a0" opacity="0.4" />

    {/* Right side — mirror */}
    <path d="M176 130 Q188 140 184 154 Q178 148 176 142 Q174 150 170 148"
      fill="none" stroke="#c44848" strokeWidth="0.8" opacity="0.55" strokeLinecap="round" />
    <path d="M182 150 Q188 158 184 168" fill="none" stroke="#d4c0a0" strokeWidth="0.5" opacity="0.45" strokeLinecap="round" />
    <path d="M170 165 Q180 172 176 182" fill="none" stroke="#c44848" strokeWidth="0.6" opacity="0.45" strokeLinecap="round" />
    <circle cx="185" cy="148" r="1.2" fill="#c44848" opacity="0.5" />
    <circle cx="180" cy="170" r="0.8" fill="#d4c0a0" opacity="0.4" />

    {/* === Decorative crosses inside frame === */}
    <g opacity="0.5" stroke="url(#goldG)" strokeWidth="0.4" fill="none">
      <path d="M72 108 L72 116 M68 112 L76 112" />
      <path d="M168 108 L168 116 M164 112 L172 112" />
    </g>

    {/* === Halo behind urn — sacred circle === */}
    <circle cx="120" cy="200" r="20" fill="none" stroke="#ff6b1c" strokeWidth="0.3" opacity="0.3" strokeDasharray="2 3" />

    {/* === Ground pedestal === */}
    <path d="M100 232 L140 232 L148 240 L92 240 Z" fill="url(#urnG)" stroke="url(#goldG)" strokeWidth="0.6" />
    <path d="M92 240 L148 240 L156 248 L84 248 Z" fill="url(#urnG)" stroke="url(#goldG)" strokeWidth="0.6" opacity="0.9" />
    {/* Pedestal ornament — 3 small crosses */}
    <g opacity="0.7" stroke="url(#goldG)" strokeWidth="0.4" fill="none">
      <path d="M104 244 L104 246 M102 245 L106 245" />
      <path d="M120 244 L120 246 M118 245 L122 245" />
      <path d="M136 244 L136 246 M134 245 L138 245" />
    </g>
    {/* Floor line */}
    <line x1="68" y1="250" x2="172" y2="250" stroke="#c44848" strokeWidth="0.5" opacity="0.4" />
    {/* Floor dots */}
    <g opacity="0.3" fill="#d4c0a0">
      <circle cx="92" cy="252" r="0.5" />
      <circle cx="104" cy="252" r="0.5" />
      <circle cx="120" cy="252" r="0.5" />
      <circle cx="136" cy="252" r="0.5" />
      <circle cx="148" cy="252" r="0.5" />
    </g>

    {/* === Inscription band — Latin-style decorative text === */}
    <path d="M84 256 L156 256" stroke="#d4c0a0" strokeWidth="0.5" opacity="0.4" />
    <g opacity="0.5" fill="#d4c0a0">
      <circle cx="92" cy="262" r="0.6" />
      <circle cx="100" cy="262" r="0.6" />
      <circle cx="108" cy="262" r="0.6" />
      <circle cx="132" cy="262" r="0.6" />
      <circle cx="140" cy="262" r="0.6" />
      <circle cx="148" cy="262" r="0.6" />
      {/* Center — omega shape */}
      <path d="M116 262 Q120 266 124 262 Q120 260 120 263" stroke="#ff6b1c" strokeWidth="0.4" fill="none" opacity="0.8" />
    </g>

    {/* === Top arc inscription — gothic dots === */}
    <g opacity="0.4" fill="#d4c0a0">
      <circle cx="100" cy="36" r="0.5" />
      <circle cx="140" cy="36" r="0.5" />
      <circle cx="76" cy="62" r="0.5" />
      <circle cx="164" cy="62" r="0.5" />
    </g>
  </svg>
  </div>
  );
}
