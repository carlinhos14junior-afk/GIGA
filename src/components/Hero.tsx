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
      className="relative pt-36 pb-20 md:pt-48 md:pb-28 bg-gradient-to-b from-[#F3F8FF] via-white to-white overflow-hidden text-slate-850"
    >
      {/* Soft, clean ambient light azul/branco background overlays */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(circle_at_top_right,#E0F2FE/55,transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-blue-50/50 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        
        {/* Clean, simple header badge */}
        <div className="flex justify-center lg:justify-start mb-6">
          <div className="inline-flex items-center space-x-2 bg-blue-50/80 border border-blue-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#005BFF]">
            <span className="flex h-2 w-2 rounded-full bg-[#005BFF]"></span>
            <span>Ultraveloz & Ultraestável</span>
          </div>
        </div>

        {/* Hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Title and Core Pitch */}
          <div className="lg:col-span-6 flex flex-col space-y-6 text-center lg:text-left">
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tighter text-slate-900 uppercase">
              INTERNET FIBRA ÓPTICA<br />
              <span className="text-[#005BFF] font-extrabold bg-gradient-to-r from-[#005BFF] to-[#0188FF] bg-clip-text text-transparent">
                ULTRARRÁPIDA
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg lg:text-xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Mais velocidade.<br />
              Mais estabilidade.<br />
              Mais tecnologia para sua casa.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={handleContractClick}
                className="group flex items-center justify-center space-x-2 bg-[#005BFF] hover:bg-[#004ccb] text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Contratar Agora</span>
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a
                href={whatsAppLink}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="group flex items-center justify-center space-x-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-sm transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <MessageCircle size={15} className="text-[#25D366] fill-current" />
                <span>Fale pelo WhatsApp</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-6 text-xs text-slate-500 font-bold uppercase tracking-wider">
              <span className="flex items-center">
                <CheckCircle size={14} className="text-[#005BFF] mr-2 shrink-0" /> Sem Franquia de Dados
              </span>
              <span className="flex items-center">
                <CheckCircle size={14} className="text-[#005BFF] mr-2 shrink-0" /> Wi-Fi Dual Band Incluso
              </span>
            </div>
          </div>

          {/* Right Column: Clean Premium Image container */}
          <div className="lg:col-span-6 relative flex justify-center items-center mt-6 lg:mt-0">
            {/* Very soft shadow background flare */}
            <div className="absolute inset-0 bg-blue-100/50 rounded-[3rem] filter blur-3xl opacity-60 -z-10" />

            {/* Clean shadow box with no glowing neon outlines */}
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden p-1 bg-white border border-slate-150 shadow-xl transition-all duration-300 hover:scale-[1.01] group">
              <div className="w-full h-full rounded-[1.4rem] overflow-hidden bg-slate-100 relative">
                
                <img 
                  src="/src/assets/images/gigatel_premium_hero_1781266310979.jpg" 
                  alt="GIGATEL FIBER Internet Premium fibra óptica"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 brightness-95"
                />

                {/* Light gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />

                {/* Floating location / device badges */}
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2 pointer-events-none md:flex-row flex-col justify-between">
                  <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wide bg-white/95 px-3 py-1.5 rounded-lg border border-slate-100 shadow-md self-start">
                    📡 Roteador Wi-Fi Inteligente
                  </span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-wide bg-[#005BFF] px-3 py-1.5 rounded-lg border border-[#005BFF]/10 shadow-md self-end">
                    ⚡ 100% FIBRA ÓPTICA
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. SEÇÃO DE ESTATÍSTICAS (INTEGRATED STATISTICS CARDS ROW) */}
        <div className="mt-24 pt-16 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-2xl bg-white hover:bg-slate-50/50 border border-slate-150 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-102"
                >
                  <div className="flex items-center space-x-4">
                    {/* Soft icon holder with brand blue of large telecom providers */}
                    <div className="p-3 rounded-xl bg-blue-50 text-[#005BFF] group-hover:text-white group-hover:bg-[#005BFF] transition-all">
                      <IconComp size={20} className="stroke-[2.2]" />
                    </div>

                    <div>
                      <h4 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
                        {stat.value}
                      </h4>
                      <p className="text-xs font-black text-[#005BFF] uppercase tracking-wider mt-0.5">
                        {stat.label}
                      </p>
                      <p className="text-[11px] text-slate-550 font-medium mt-1">
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
