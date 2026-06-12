import { ArrowRight, Phone, CheckCircle, Network, Users, Zap } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
}

export default function Hero({ config }: HeroProps) {
  const whatsAppLink = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    `Olá, tenho interesse nos planos de Internet Fibra da GIGATEL FIBER. Gostaria de mais informações!`
  )}`;

  const handleConsultClick = () => {
    const element = document.getElementById('cobertura');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative pt-24 pb-16 md:pt-36 md:pb-24 bg-white overflow-hidden border-b border-brand-gray-light"
    >
      {/* Dynamic ambient background light halos (glowing fiber optic trails) */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[80%] bg-[radial-gradient(ellipse_at_top_right,#0A2F8F/12,#E30613/10,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[60%] bg-[radial-gradient(ellipse_at_bottom_left,#00A8FF/8,transparent_50%)] pointer-events-none" />

      {/* Fiber decorative path curves underlay */}
      <div className="absolute right-0 top-1/4 w-[45%] h-1/2 opacity-25 pointer-events-none z-0 hidden lg:block">
        <svg className="w-full h-full text-[#0A2F8F]" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
          <path d="M0,80 C30,85 70,15 100,20 C100,20 100,100 0,100 Z" fill="url(#fiber-gradient)" opacity="0.15" />
          <path d="M0,83 C35,82 65,22 100,20" stroke="#0A2F8F" strokeWidth="0.8" strokeDasharray="3 2" />
          <path d="M0,76 C25,79 75,10 100,15" stroke="#E30613" strokeWidth="0.5" />
          <defs>
            <linearGradient id="fiber-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A8FF" />
              <stop offset="100%" stopColor="#0A2F8F" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col space-y-6 text-center lg:text-left">
            
            {/* Title - Elegant, large dark-blue telecom style */}
            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.12] tracking-tighter text-[#0A2F8F]">
              INTERNET FIBRA ÓPTICA<br />
              DE VERDADE PARA<br />
              <span className="text-[#E30613]">SUA CASA</span> OU EMPRESA
            </h1>

            {/* Subtitle */}
            <p className="text-slate-650 text-base sm:text-lg font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Conexão rápida, estável e 100% fibra óptica para navegar, assistir, jogar e trabalhar sem travar.
            </p>

            {/* CTA Buttons - Red solid and Blue outline */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
              <button
                onClick={handleConsultClick}
                className="group flex items-center justify-center space-x-2 bg-[#E30613] hover:bg-opacity-92 text-white font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-lg shadow-md transition-all duration-200 active:scale-98"
              >
                <span>Consultar Disponibilidade</span>
                <CheckCircle size={15} />
              </button>

              <a
                href={whatsAppLink}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="group flex items-center justify-center space-x-2 border border-[#0A2F8F] hover:bg-slate-50 text-[#0A2F8F] font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-lg shadow-sm transition-all duration-200 active:scale-98"
              >
                <Phone size={15} className="text-[#0A2F8F]" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>

            {/* Quick Benefits Checkmarks Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center space-x-2.5 text-slate-755 justify-center lg:justify-start">
                <div className="p-1.5 rounded-full bg-brand-gray-light text-[#0A2F8F]">
                  <Zap size={14} className="stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-800 tracking-tight">100% Fibra Óptica</span>
              </div>
              
              <div className="flex items-center space-x-2.5 text-slate-755 justify-center lg:justify-start">
                <div className="p-1.5 rounded-full bg-brand-gray-light text-[#0A2F8F]">
                  <Users size={14} className="stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-800 tracking-tight">Suporte Humanizado</span>
              </div>

              <div className="flex items-center space-x-2.5 text-slate-755 justify-center lg:justify-start">
                <div className="p-1.5 rounded-full bg-brand-gray-light text-[#0A2F8F]">
                  <Network size={14} className="stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-800 tracking-tight">Instalação Rápida</span>
              </div>
            </div>

          </div>

          {/* Right Column - Family mockup visual */}
          <div className="lg:col-span-6 relative flex justify-center items-center mt-6 lg:mt-0">
            {/* Glowing halos */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00A8FF]/20 to-[#E30613]/15 rounded-[3rem] filter blur-2xl opacity-80 -z-10" />
            
            {/* Elegant wavy red & blue glowing border card overlay */}
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl p-1 bg-gradient-to-tr from-[#0A2F8F] via-white to-[#E30613]">
              <div className="w-full h-full rounded-[1.85rem] overflow-hidden bg-white relative">
                {/* Family photo with high resolution */}
                <img 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=900" 
                  alt="Família feliz reunida no sofá usando notebook de alta velocidade via fibra óptica"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2F8F]/40 via-transparent to-[#E30613]/10" />
                
                {/* Floating trust shield badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider bg-[#0A2F8F]/80 px-3 py-1.5 rounded-lg backdrop-blur-sm shadow">
                    FTTH Fibra Óptica 100%
                  </span>
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider bg-[#E30613]/80 px-3 py-1.5 rounded-lg backdrop-blur-sm shadow">
                    UltraVelocidade
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
