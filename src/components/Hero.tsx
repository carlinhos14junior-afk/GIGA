import { ArrowRight, MessageCircle, CheckCircle, Network, Users, Zap, Shield, HelpCircle, Activity, Headphones } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
}

export default function Hero({ config }: HeroProps) {
  const whatsAppLink = `https://wa.me/5511910050121?text=${encodeURIComponent(
    `Olá GIGATEL FIBER! Quero contratar internet fibra ultraveloz agora de forma rápida.`
  )}`;

  const handleContractClick = () => {
    const element = document.getElementById('planos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    {
      value: '+5.000',
      label: 'Clientes Atendidos',
      desc: 'Navegando em alta performance',
      icon: Users,
      color: 'from-[#005BFF] to-[#00AEEF]'
    },
    {
      value: '99.9%',
      label: 'Estabilidade',
      desc: 'Garantia de UP TIME estelar',
      icon: Activity,
      color: 'from-[#00AEEF] to-[#00D4FF]'
    },
    {
      value: '100%',
      label: 'Fibra Óptica',
      desc: 'Tecnologia FTTH de ponta',
      icon: Zap,
      color: 'from-[#005BFF] to-[#00D4FF]'
    },
    {
      value: '24h',
      label: 'Suporte Especializado',
      desc: 'Pronto para te ajudar sempre',
      icon: Headphones,
      color: 'from-[#00D4FF] to-[#00AEEF]'
    }
  ];

  return (
    <section
      id="inicio"
      className="relative pt-36 pb-20 md:pt-48 md:pb-28 bg-[linear-gradient(135deg,#0A1F44,#0057FF)] overflow-hidden text-white"
    >
      {/* Discrete high-tech grid overlay */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cyber-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyber-grid)" />
        </svg>
      </div>

      {/* Modern cybernetic connection blobs */}
      <div className="absolute top-1/4 right-[-10%] w-[550px] h-[550px] bg-[radial-gradient(circle,#00AEEF_0%,transparent_65%)] opacity-[0.15] pointer-events-none filter blur-3xl" />
      <div className="absolute bottom-10 left-[-10%] w-[450px] h-[450px] bg-[radial-gradient(circle,#E53935_0%,transparent_60%)] opacity-[0.08] pointer-events-none filter blur-3xl" />

      {/* Network circuit accent paths */}
      <div className="absolute top-1/3 left-1/2 w-full h-1/2 opacity-[0.08] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 100 100 L 250 100 L 320 170 L 500 170 L 560 110 L 700 110" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 4" />
          <path d="M 150 220 L 300 220 L 350 270 L 600 270" stroke="#00AEEF" strokeWidth="1.5" />
          <circle cx="250" cy="100" r="4" fill="#E53935" />
          <circle cx="500" cy="170" r="4" fill="#00AEEF" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        
        {/* Clean, simple header badge */}
        <div className="flex justify-center lg:justify-start mb-6">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-[#E53935] animate-pulse"></span>
            <span>Ultraveloz & Ultraestável</span>
          </div>
        </div>

        {/* Hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Title and Core Pitch */}
          <div className="lg:col-span-6 flex flex-col space-y-6 text-center lg:text-left">
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tighter text-white uppercase">
              INTERNET FIBRA ÓPTICA<br />
              <span className="text-[#00AEEF] font-extrabold bg-gradient-to-r from-[#00AEEF] to-[#FFFFFF] bg-clip-text text-transparent">
                ULTRARRÁPIDA
              </span>
            </h1>

            <p className="text-blue-100 text-base sm:text-lg lg:text-xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed font-semibold">
              Mais velocidade.<br />
              Mais estabilidade.<br />
              Mais tecnologia para sua casa.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={handleContractClick}
                className="group flex items-center justify-center space-x-2 bg-[#E53935] hover:bg-[#c62828] text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Contratar Agora</span>
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a
                href={whatsAppLink}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="group flex items-center justify-center space-x-2 border border-white/20 bg-white hover:bg-slate-100 text-[#011F4A] font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <MessageCircle size={15} className="text-[#25D366] fill-current" />
                <span>Fale pelo WhatsApp</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-6 text-xs text-slate-200 font-bold uppercase tracking-wider">
              <span className="flex items-center">
                <CheckCircle size={14} className="text-[#E53935] mr-2 shrink-0" /> Sem Franquia de Dados
              </span>
              <span className="flex items-center">
                <CheckCircle size={14} className="text-[#E53935] mr-2 shrink-0" /> Wi-Fi Dual Band Incluso
              </span>
            </div>
          </div>

          {/* Right Column: Clean Premium Image container */}
          <div className="lg:col-span-6 relative flex justify-center items-center mt-6 lg:mt-0">
            {/* Very soft shadow background flare */}
            <div className="absolute inset-0 bg-[#00AEEF]/20 rounded-[3rem] filter blur-3xl opacity-60 -z-10" />

            {/* Clean shadow box with no glowing neon outlines */}
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden p-1 bg-white/10 border border-white/20 shadow-2xl transition-all duration-300 hover:scale-[1.01] group">
              <div className="w-full h-full rounded-[1.4rem] overflow-hidden bg-[#0A1F44] relative">
                
                <img 
                  src="/src/assets/images/gigatel_premium_hero_1781266310979.jpg" 
                  alt="GIGATEL FIBER Internet Premium fibra óptica"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 brightness-95"
                />

                {/* Light gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

                {/* Floating location / device badges */}
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2 pointer-events-none md:flex-row flex-col justify-between">
                  <span className="text-[10px] font-bold text-[#0A1F44] uppercase tracking-wide bg-white/95 px-3 py-1.5 rounded-lg border border-slate-100 shadow-md self-start">
                    📡 Roteador Wi-Fi Inteligente
                  </span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-wide bg-[#E53935] px-3 py-1.5 rounded-lg border border-[#E53935]/10 shadow-md self-end">
                    ⚡ 100% FIBRA ÓPTICA
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. SEÇÃO DE ESTATÍSTICAS (INTEGRATED STATISTICS CARDS ROW) */}
        <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-[#0057FF] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 z-10">
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-2xl bg-white border border-blue-100/50 p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-102"
                >
                  <div className="flex items-center space-x-4">
                    {/* Soft icon holder with red accent */}
                    <div className="p-3 rounded-xl bg-red-50 text-[#E53935] group-hover:text-white group-hover:bg-[#E53935] transition-all duration-300 border border-red-100/40">
                      <IconComp size={20} className="stroke-[2.2]" />
                    </div>

                    <div>
                      <h4 className="font-display font-black text-2xl sm:text-3xl text-[#0057FF] tracking-tight">
                        {stat.value}
                      </h4>
                      <p className="text-[10px] font-black text-slate-550 uppercase tracking-wider mt-0.5">
                        {stat.label}
                      </p>
                      <p className="text-[11px] text-slate-500 font-bold mt-1 leading-tight">
                        {stat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
