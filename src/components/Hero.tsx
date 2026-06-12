import { useState, useEffect } from 'react';
import { MessageCircle, CheckCircle, Users, Zap, Headphones, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
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
    titulo: config.hero_titulo || 'Aguardando Banners',
    subtitulo: config.hero_subtitulo || 'Adicione banners no painel admin.',
    texto_botao: config.hero_texto_botao || 'Painel Admin',
    link_botao: '#admin',
    image_url: '',
    mobile_image_url: ''
  };

  const cleanWhatsapp = config.whatsapp ? config.whatsapp.replace(/\D/g, '') : '5511910050121';
  const whatsAppLink = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    `Olá GIGATEL FIBER! Quero contratar internet fibra ultraveloz agora de forma rápida.`
  )}`;

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
      className="relative min-h-screen w-full overflow-hidden text-white flex items-center"
    >
      {/* Background Banner Slider */}
      <div className="absolute inset-0 z-0">
        <picture className="w-full h-full">
          { (currentBanner.mobile_image_url || currentBanner.image_url) && (
            <source media="(max-width: 640px)" srcSet={currentBanner.mobile_image_url || currentBanner.image_url} />
          )}
          { currentBanner.image_url && (
            <img 
              src={currentBanner.image_url} 
              alt={currentBanner.titulo}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.4] transition-all duration-1000 animate-fade-in"
            />
          )}
        </picture>
        
        {/* Deep gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/30" />
      </div>

      {/* Discrete high-tech grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-[1]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cyber-grid-hero" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyber-grid-hero)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full pt-16">
        
        {/* Hero Content */}
        <div className="max-w-3xl flex flex-col space-y-6 text-center lg:text-left">
          {/* Header badge */}
          <div className="flex justify-center lg:justify-start mb-2 group">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/90 backdrop-blur-md shadow-lg group-hover:border-[#E53935]/30 transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-[#E53935] animate-pulse"></span>
              <span>Conectividade Premium Gigatel</span>
            </div>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-white uppercase break-words whitespace-pre-line drop-shadow-2xl">
            {currentBanner.titulo}
          </h1>

          <p className="text-white/80 text-base sm:text-xl lg:text-2xl font-medium max-w-2xl mx-auto lg:mx-0 leading-tight whitespace-pre-line drop-shadow">
            {currentBanner.subtitulo}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
            <a
              href={whatsAppLink}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="group flex items-center justify-center space-x-3 border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-black text-xs sm:text-sm uppercase tracking-widest px-8 py-5 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <MessageCircle size={18} className="text-[#25D366] fill-current" />
              <span>WhatsApp Comercial</span>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 pt-10 text-[10px] sm:text-xs text-white/60 font-black uppercase tracking-[0.15em]">
            <span className="flex items-center group">
              <CheckCircle size={16} className="text-[#E53935] mr-2 transition-transform group-hover:scale-110" /> Sem Franquias
            </span>
            <span className="flex items-center group">
              <CheckCircle size={16} className="text-[#E53935] mr-2 transition-transform group-hover:scale-110" /> Wi-Fi Dual Band
            </span>
            <span className="flex items-center group">
              <CheckCircle size={16} className="text-[#E53935] mr-2 transition-transform group-hover:scale-110" /> Suporte 24h
            </span>
          </div>
        </div>
      </div>

      {/* Slider Controls (Bottom Center) */}
      {activeBanners.length > 1 && (
        <div className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center space-y-6">
          {/* Progress dots / Bullets */}
          <div className="flex justify-center space-x-3">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-12 bg-[#E53935]' : 'w-4 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>

          {/* Arrow Controls (Side-by-side) */}
          <div className="flex items-center space-x-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="h-4 w-px bg-white/10"></div>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-110 active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Network Visual Accents - Top Right */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none overflow-hidden z-[1]">
        <svg className="w-full h-full" viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 400 100 L 200 300 L 250 500 L 400 600" stroke="#0057FF" strokeWidth="2" strokeDasharray="10 10" />
          <path d="M 400 50 L 150 250 L 100 450 L 400 700" stroke="#E53935" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="200" cy="300" r="4" fill="#0057FF" />
          <circle cx="100" cy="450" r="4" fill="#E53935" />
        </svg>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-40 animate-bounce">
         <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
         </div>
      </div>
    </section>
  );
}
