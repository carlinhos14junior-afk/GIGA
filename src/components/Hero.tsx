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
      className="relative pt-36 pb-24 md:pt-48 md:pb-32 bg-slate-950 overflow-hidden text-white"
    >
      {/* Immersive digital space petroleum glow backgrounds */}
      <div className="absolute top-0 right-0 w-[70%] h-[70%] bg-[radial-gradient(circle_at_top_right,#005BFF/18,#00D4FF/10,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(circle_at_bottom_left,#00AEEF/15,transparent_55%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[#005BFF]/5 blur-3xl pointer-events-none" />

      {/* Modern thin decorative techno background grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        
        {/* Dynamic header badge */}
        <div className="flex justify-center lg:justify-start mb-6">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#00D4FF]">
            <span className="flex h-2 w-2 rounded-full bg-[#00D4FF] animate-pulse"></span>
            <span>Ultraveloz & Ultraestável</span>
          </div>
        </div>

        {/* Hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Title and Core Pitch */}
          <div className="lg:col-span-6 flex flex-col space-y-6 text-center lg:text-left">
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tighter text-white uppercase">
              INTERNET FIBRA ÓPTICA<br />
              <span className="bg-gradient-to-r from-[#005BFF] via-[#00AEEF] to-[#00D4FF] bg-clip-text text-transparent font-extrabold">
                ULTRARRÁPIDA
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Mais velocidade.<br />
              Mais estabilidade.<br />
              Mais tecnologia para sua casa.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={handleContractClick}
                className="group flex items-center justify-center space-x-2 bg-[#005BFF] hover:bg-[#00D4FF] text-white hover:text-slate-950 font-extrabold text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl shadow-xl shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Contratar Agora</span>
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a
                href={whatsAppLink}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="group flex items-center justify-center space-x-2 border-2 border-white/10 bg-white/5 hover:bg-white/10 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <MessageCircle size={15} className="text-[#25D366] fill-currentColor" />
                <span>Fale pelo WhatsApp</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">
              <span className="flex items-center">
                <CheckCircle size={14} className="text-[#00D4FF] mr-2 shrink-0" /> Sem Franquia de Dados
              </span>
              <span className="flex items-center">
                <CheckCircle size={14} className="text-[#00D4FF] mr-2 shrink-0" /> Wi-Fi Dual Band Incluso
              </span>
            </div>
          </div>

          {/* Right Column: High-tech generated banner */}
          <div className="lg:col-span-6 relative flex justify-center items-center mt-6 lg:mt-0">
            {/* Ambient cyber cyan and blue background shadow flare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#005BFF]/30 to-[#00D4FF]/20 rounded-[3rem] filter blur-3xl opacity-80 -z-10" />

            {/* Beautiful visual border card with integrated glowing animation lines */}
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-[2.5rem] overflow-hidden p-1 bg-gradient-to-tr from-[#005BFF] via-white/5 to-[#00D4FF] shadow-2xl transition-all duration-300 hover:scale-[1.01] group">
              <div className="w-full h-full rounded-[2.4rem] overflow-hidden bg-slate-900 relative">
                
                {/* Generated premium high resolution image asset */}
                <img 
                  src="/src/assets/images/gigatel_premium_hero_1781266310979.jpg" 
                  alt="GIGATEL FIBER Internet Premium fibra óptica com feixes de luz neon e dispositivos inteligentes"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-90"
                />

                {/* Cyber gradient dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-[#005BFF]/10 opacity-70" />

                {/* Device badge indicator labels floating in the mockup */}
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2 pointer-events-none md:flex-row flex-col justify-between">
                  <span className="text-[9px] font-black text-white uppercase tracking-wider bg-slate-905/85 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm self-start">
                    📡 Roteador Wi-Fi 6 Inteligente
                  </span>
                  <span className="text-[9px] font-black text-white uppercase tracking-wider bg-gradient-to-r from-[#005BFF] to-[#00D4FF] px-3 py-1.5 rounded-lg border border-white/5 shadow-lg self-end">
                    ⚡ 100% FIBRA ÓPTICA SP
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. SEÇÃO DE ESTATÍSTICAS (INTEGRATED STATISTICS CARDS ROW) */}
        <div className="mt-24 pt-16 border-t border-white/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 p-6 shadow-xl transition-all duration-300 hover:scale-102"
                >
                  {/* Subtle top indicator glow */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#005BFF] to-[#00D4FF] opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />
                  
                  <div className="flex items-center space-x-4">
                    {/* Glowing Circular icon holder with gradient */}
                    <div className="p-3 rounded-lg bg-white/5 text-[#00D4FF] group-hover:text-white group-hover:bg-[#005BFF] transition-all">
                      <IconComp size={20} className="stroke-[2.2]" />
                    </div>

                    <div>
                      <h4 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                        {stat.value}
                      </h4>
                      <p className="text-xs font-bold text-[#00AEEF] uppercase tracking-wider mt-0.5">
                        {stat.label}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">
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
