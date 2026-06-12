import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lightVersion?: boolean;
  logoUrl?: string;
  logoWhiteUrl?: string;
  nomeEmpresa?: string;
}

export default function Logo({ 
  className = '', 
  variant = 'full', 
  size = 'md', 
  lightVersion = false, 
  logoUrl,
  logoWhiteUrl,
  nomeEmpresa = 'GIGATEL FIBER'
}: LogoProps) {
  const activeLogo = lightVersion ? (logoWhiteUrl || logoUrl) : logoUrl;

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

  // If no logo image, just return the name in text as minimalist fallback
  return (
    <div className={`flex items-center space-x-2.5 select-none group ${className}`}>
      <div className="flex flex-col">
        <span className={`font-display font-black tracking-tighter ${lightVersion ? 'text-white' : 'text-[#005BFF]'} leading-none uppercase`}>
          {nomeEmpresa}
        </span>
      </div>
    </div>
  );
}
