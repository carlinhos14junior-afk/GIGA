import { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, CheckCircle, Users, Zap, Headphones, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { SiteConfig, Banner } from '../types';

interface HeroProps {
  config: SiteConfig;
  banners?: Banner[];
}

export default function Hero({ config, banners = [] }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeBanners = banners
    .filter(b => b.status === 'ativo')
    .sort((a, b) => (Number(a.ordem) || 0) - (Number(b.ordem) || 0));

  // Auto slide timers if multiple active slides
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % activeBanners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeBanners.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % activeBanners.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  // Fallback banner if database results empty
  const currentBanner = activeBanners.length > 0 ? activeBanners[currentSlide] : {
    titulo: config.hero_titulo || 'INTERNET FIBRA ÓPTICA\nULTRARRÁPIDA',
    subtitulo: config.hero_subtitulo || 'Mais velocidade.\nMais estabilidade.\nMais tecnologia para sua casa.',
    texto_botao: config.hero_texto_botao || 'Contratar Agora',
    link_botao: config.hero_link_botao || '#planos',
    imagem_desktop: '/src/assets/images/gigatel_premium_hero_1781266310979.jpg',
    imagem_mobile: '/src/assets/images/gigatel_premium_hero_1781266310979.jpg'
  };

  const cleanWhatsapp = config.whatsapp ? config.whatsapp.replace(/\D/g, '') : '5511910050121';
  const whatsAppLink = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    `Olá GIGATEL FIBER! Quero contratar internet fibra ultraveloz agora de forma rápida.`
  )}`;

  const handleContractClick = (link: string) => {
    if (link.startsWith('#')) {
      const element = document.getElementById(link.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(link, '_blank');
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
      className="relative pt-36 pb-20 md:pt-48 md:pb-28 bg-[linear-gradient(135deg,#0A1F44,#0057FF)] overflow-hidden text-white animate-fade-in"
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
          <div className="lg:col-span-6 flex flex-col space-y-6 text-center lg:text-left min-h-[300px] justify-center">
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tighter text-white uppercase break-words whitespace-pre-line">
              {currentBanner.titulo}
            </h1>

            <p className="text-blue-100 text-base sm:text-lg lg:text-xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed font-semibold whitespace-pre-line">
              {currentBanner.subtitulo}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={() => handleContractClick(currentBanner.link_botao || '#planos')}
                className="group flex items-center justify-center space-x-2 bg-[#E53935] hover:bg-[#c62828] text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>{currentBanner.texto_botao || 'Contratar Agora'}</span>
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

          {/* Right Column: Clean Premium Image container with Slider controls */}
          <div className="lg:col-span-6 relative flex justify-center items-center mt-6 lg:mt-0">
            {/* Very soft shadow background flare */}
            <div className="absolute inset-0 bg-[#00AEEF]/20 rounded-[3rem] filter blur-3xl opacity-60 -z-10" />

            {/* Clean shadow box with navigation overlays */}
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden p-1 bg-white/10 border border-white/20 shadow-2xl transition-all duration-300 hover:scale-[1.01] group">
              <div className="w-full h-full rounded-[1.4rem] overflow-hidden bg-[#0A1F44] relative">
                
                <picture className="w-full h-full">
                  <source media="(max-width: 640px)" srcSet={currentBanner.imagem_mobile || currentBanner.imagem_desktop} />
                  <img 
                    src={currentBanner.imagem_desktop} 
                    alt={currentBanner.titulo}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-750 brightness-95"
                  />
                </picture>

                {/* Light gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

                {/* Slider pagination arrows for carrossel feel */}
                {activeBanners.length > 1 && (
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                    <button
                      onClick={prevSlide}
                      className="p-2 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/10 text-white pointer-events-auto transition-colors"
                      title="Anterior"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="p-2 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/10 text-white pointer-events-auto transition-colors"
                      title="Próximo"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}

                {/* Bullet indicator dots */}
                {activeBanners.length > 1 && (
                  <div className="absolute bottom-16 inset-x-0 flex justify-center space-x-1.5 z-20 pointer-events-auto">
                    {activeBanners.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-6 bg-[#E53935]' : 'w-2.5 bg-white/55 hover:bg-white'}`}
                      />
                    ))}
                  </div>
                )}

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
