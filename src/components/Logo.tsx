import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lightVersion?: boolean;
  logoUrl?: string;
  logoBrancaUrl?: string;
  nomeEmpresa?: string;
}

export default function Logo({ 
  className = '', 
  variant = 'full', 
  size = 'md', 
  lightVersion = false, 
  logoUrl,
  logoBrancaUrl,
  nomeEmpresa = 'GIGATEL FIBER'
}: LogoProps) {
  const activeLogo = lightVersion ? (logoBrancaUrl || logoUrl) : logoUrl;

  if (activeLogo && activeLogo.trim() !== '') {
    const heightMap = {
      sm: "h-8",
      md: "h-11",
      lg: "h-16",
      xl: "h-24"
    };
    return (
      <img 
        src={activeLogo} 
        alt={nomeEmpresa} 
        className={`${heightMap[size] || "h-11"} object-contain max-w-full ${className}`}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Split name if it has two words for the style
  const names = nomeEmpresa.toUpperCase().split(' ');
  const gigaPart = names[0] || 'GIGATEL';
  const fiberPart = names.slice(1).join(' ') || 'fiber';

  // Determine dimensional constraints
  let iconDims = "w-10 h-10";
  let textSizes = {
    giga: "text-lg sm:text-xl",
    fiber: "text-[11px]"
  };

  if (size === 'sm') {
    iconDims = "w-8 h-8";
    textSizes = {
      giga: "text-base",
      fiber: "text-[10px]"
    };
  } else if (size === 'lg') {
    iconDims = "w-16 h-16";
    textSizes = {
      giga: "text-2xl sm:text-3xl",
      fiber: "text-base"
    };
  } else if (size === 'xl') {
    iconDims = "w-28 h-28";
    textSizes = {
      giga: "text-4xl sm:text-5xl",
      fiber: "text-2xl"
    };
  }

  // Choose colors depending on light vs dark background
  const gigaColorClass = lightVersion 
    ? "text-white group-hover:text-[#00D4FF]"
    : "text-[#005BFF] bg-gradient-to-r from-[#005BFF] to-[#00AEEF] bg-clip-text text-transparent";
    
  const fiberColorClass = lightVersion
    ? "text-[#00D4FF]"
    : "text-[#00AEEF]";

  return (
    <div className={`flex items-center space-x-2.5 select-none group ${className}`}>
      {/* 3D / Wireless Globe Icon */}
      <div className={`relative shrink-0 ${iconDims}`}>
        <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Signal waves (Left) - matching GIGATEL concentric design */}
          <g stroke={lightVersion ? "#00D4FF" : "#005BFF"} strokeWidth="2.8" strokeLinecap="round" opacity="0.95">
            <path d="M 33,26 A 16,16 0 0,0 33,54" />
            <path d="M 27,20 A 23,23 0 0,0 27,60" />
            <path d="M 21,14 A 30,30 0 0,0 21,66" />
          </g>

          {/* Signal waves (Right) */}
          <g stroke={lightVersion ? "#00D4FF" : "#005BFF"} strokeWidth="2.8" strokeLinecap="round" opacity="0.95">
            <path d="M 67,26 A 16,16 0 0,1 67,54" />
            <path d="M 73,20 A 23,23 0 0,1 73,60" />
            <path d="M 79,14 A 30,30 0 0,1 79,66" />
          </g>

          {/* Globe/Sphere (Center X=50, Y=40, Radius=16) */}
          <g>
            <defs>
              <linearGradient id="silver-metallic-logo" x1="34" y1="40" x2="66" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
              <linearGradient id="royal-blue-logo" x1="34" y1="40" x2="66" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#005BFF" />
                <stop offset="50%" stopColor="#00AEEF" />
                <stop offset="100%" stopColor="#00D4FF" />
              </linearGradient>
            </defs>

            {/* Inner background shadow disk for 3D realism */}
            <circle cx="50" cy="40" r="15.5" fill="#005BFF" opacity="0.1" />

            {/* Ribbon 1: Silver Top Accent */}
            <path d="M 42,27 C 45,25 55,25 58,27 C 55,26 45,26 42,27 Z" fill="url(#silver-metallic-logo)" />

            {/* Ribbon 2: Upper Intermediate Blue Band */}
            <path d="M 38,31.5 C 42,28.5 58,28.5 62,31.5 C 57.5,30 42.5,30 38,31.5 Z" fill="url(#royal-blue-logo)" />
            <path d="M 38,31 C 42,28 58,28 62,31 L 62,31.5 C 58,28.5 42,28.5 38,31.5 Z" fill="url(#silver-metallic-logo)" />

            {/* Ribbon 3: Mid-Upper Silver Glimmer Band */}
            <path d="M 36,36 C 41,32 59,32 64,36 C 58,34 42,34 36,36 Z" fill="url(#silver-metallic-logo)" />

            {/* Ribbon 4: Main Horizontal Blue Center Hoop */}
            <path d="M 34.5,41.5 C 39.5,37 60.5,37 65.5,41.5 L 65.2,44 C 60.2,40 39.8,40 34.8,44 Z" fill="url(#royal-blue-logo)" />
            <path d="M 34.5,41.5 C 39.5,38.5 60.5,38.5 65.5,41.5 L 65.5,42.2 C 60.5,39.2 39.5,39.2 34.5,42.2 Z" fill="url(#silver-metallic-logo)" />

            {/* Ribbon 5: Mid-Lower Silver Band */}
            <path d="M 35.8,48.5 C 40.8,44 59.2,44 64.2,48.5 L 63.8,50.5 C 58.8,46.5 41.2,46.5 36.2,50.5 Z" fill="url(#silver-metallic-logo)" />

            {/* Ribbon 6: Lower Blue Band */}
            <path d="M 38.5,54.5 C 42.5,50.5 57.5,50.5 61.5,54.5 L 61,56.5 C 57,53 43,53 39,56.5 Z" fill="url(#royal-blue-logo)" />
          </g>
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col">
          {/* Bold, heavy wordmark */}
          <span className={`${textSizes.giga} font-display font-black tracking-tighter ${gigaColorClass} leading-none uppercase group-hover:scale-[1.01] transition-all origin-left`}>
            {gigaPart}
          </span>
          {/* Handwritten Cursive Satisfy font for the 'fiber' script */}
          <span 
            style={{ fontFamily: "'Satisfy', cursive" }}
            className={`${textSizes.fiber} font-normal ${fiberColorClass} italic tracking-normal self-end -mt-1 leading-none pl-6 pr-1 group-hover:translate-x-1 transition-transform duration-300 uppercase`}
          >
            {fiberPart}
          </span>
        </div>
      )}
    </div>
  );
}
