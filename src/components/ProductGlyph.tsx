type ProductGlyphProps = {
  slug: string;
  className?: string;
};

function ForgeCoderGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="forge-coder-gradient" x1="10%" x2="90%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#55EDFF" />
          <stop offset="55%" stopColor="#00D8FF" />
          <stop offset="100%" stopColor="#2F6BFF" />
        </linearGradient>
      </defs>
      <path d="M14 46V24l12-8h28l-7 8H31v8h14l-7 8H31v14l-8 6-9-9Z" fill="url(#forge-coder-gradient)" />
      <path d="M19 44V26l9-6h23l-5 5H30v11h11l-5 5H30v11l-5 4-6-6Z" fill="rgba(9, 11, 16, 0.46)" />
      <path d="M14 26h12" fill="none" stroke="#63EFFF" strokeLinecap="round" strokeWidth="2.2" />
      <path d="M14 26V18l14-8h24" fill="none" stroke="#63EFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
      <circle cx="14" cy="26" r="2.3" fill="#9AF5FF" />
      <circle cx="30" cy="18" r="2.3" fill="#9AF5FF" />
      <circle cx="40" cy="14" r="2.3" fill="#9AF5FF" />
    </svg>
  );
}

function ForgeOpsGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="forge-ops-gradient" x1="10%" x2="90%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#49F4E0" />
          <stop offset="55%" stopColor="#00CFA3" />
          <stop offset="100%" stopColor="#0E8A7F" />
        </linearGradient>
      </defs>
      <path d="M32 7 52 15v17c0 12.6-7.4 21.5-20 25-12.6-3.5-20-12.4-20-25V15L32 7Z" fill="url(#forge-ops-gradient)" />
      <path d="M20 20h11c2.8 0 5 2.2 5 5v1h8c3.3 0 6 2.7 6 6v13l-18 11-18-11V21l6-1Z" fill="rgba(9, 11, 16, 0.56)" />
      <path d="M21 23v13l8-8v-5h7m6 8h-8v18" fill="none" stroke="#BFFFF1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
      <path d="M21 23h8m13 8h6" fill="none" stroke="#BFFFF1" strokeLinecap="round" strokeWidth="2.4" />
      <circle cx="21" cy="23" r="2.5" fill="#D9FFF7" />
      <circle cx="29" cy="23" r="2.5" fill="#D9FFF7" />
      <circle cx="42" cy="31" r="2.5" fill="#D9FFF7" />
    </svg>
  );
}

function NeuralForgeGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="neural-forge-gradient" x1="12%" x2="88%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#8A6BFF" />
          <stop offset="55%" stopColor="#7A5CFF" />
          <stop offset="100%" stopColor="#B14DFF" />
        </linearGradient>
      </defs>
      <path d="M21 14c-6.3 0-11 4.5-11 10.1 0 2.7 1 5.2 3 7.1-2.7 1.7-4.2 4.3-4.2 7.1 0 5.6 4.9 10.2 11 10.2h24.7c5.8 0 10.7-4.4 10.7-9.9 0-4-2.5-7.3-6.3-9.1.3-.9.5-1.8.5-2.9 0-6.4-5.4-11.6-12.2-11.6-2.2 0-4.2.5-6 1.5-2.4-1.8-5.7-2.5-10.2-2.5Z" fill="url(#neural-forge-gradient)" opacity="0.88" />
      <path d="M17 42V20l7-3 8 6 7-6h13l-6 8H39v7h10l-6 7H33v8H17Z" fill="rgba(44, 16, 74, 0.62)" />
      <path d="M19 40V22l5-2 8 6 6-6h11l-4 4H36v11h8l-4 4h-9v7H19Z" fill="url(#neural-forge-gradient)" />
      <circle cx="14" cy="31" r="2.4" fill="#F3DBFF" />
      <circle cx="26" cy="16" r="2.4" fill="#F3DBFF" />
      <circle cx="40" cy="14" r="2.4" fill="#F3DBFF" />
      <circle cx="50" cy="22" r="2.4" fill="#F3DBFF" />
      <circle cx="51" cy="35" r="2.4" fill="#F3DBFF" />
      <path d="M14 31l5-5 7-10 14-2 10 8 1 13" fill="none" stroke="#F3DBFF" strokeOpacity="0.58" strokeWidth="1.8" />
    </svg>
  );
}

export default function ProductGlyph({ slug, className }: ProductGlyphProps) {
  if (slug === "forgeops") {
    return <ForgeOpsGlyph className={className} />;
  }

  if (slug === "neuralforge") {
    return <NeuralForgeGlyph className={className} />;
  }

  return <ForgeCoderGlyph className={className} />;
}
