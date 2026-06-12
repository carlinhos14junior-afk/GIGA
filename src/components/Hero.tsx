import { ArrowRight, MessageSquare, Zap, Shield, Users } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
}

export default function Hero({ config }: HeroProps) {
  const whatsAppLink = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    'Olá, tenho interesse nos planos da GIGANET. Pode me passar mais informações?'
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
      className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-[#070B19]"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-purple/20 rounded-full mix-blend-screen mix-blend-mode filter blur-3xl opacity-60 animate-glow-purple pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-brand-bright-blue/15 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-glow-blue pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-brand-neon/5 rounded-full mix-blend-screen filter blur-3xl opacity-40 pointer-events-none" />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-35" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-purple/20 to-brand-bright-blue/10 border border-brand-purple/30 px-3 py-1.5 rounded-full self-center lg:self-start shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-brand-neon animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-brand-neon uppercase">
                FIBRA ÓPTICA ULTRA VELOZ
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1] text-balance">
              Internet Fibra Óptica de{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-bright-blue via-brand-purple to-brand-neon">
                Verdade
              </span>{' '}
              para sua Casa ou Empresa
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed text-slate-300">
              Planos rápidos, estáveis e com suporte humanizado para você navegar, assistir, jogar e trabalhar sem qualquer travamento.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={handleConsultClick}
                className="group flex items-center justify-center space-x-2 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold px-7 py-4 rounded-xl shadow-lg shadow-brand-purple/20 hover:shadow-brand-purple/40 transition-all duration-300 scale-102 hover:scale-105"
              >
                <span>Consultar disponibilidade</span>
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a
                href={whatsAppLink}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="group flex items-center justify-center space-x-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 font-bold px-7 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <MessageSquare size={18} className="text-emerald-400 group-hover:rotate-12 transition-transform" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-slate-800 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col text-center lg:text-left">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-white">100%</span>
                <span className="text-xs font-mono text-slate-400 tracking-wider">FIBRA ÓPTICA</span>
              </div>
              <div className="flex flex-col text-center lg:text-left">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#39FF14]">99.8%</span>
                <span className="text-xs font-mono text-slate-400 tracking-wider">UPTIME REAL</span>
              </div>
              <div className="flex flex-col text-center lg:text-left">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-brand-bright-blue">&lt; 5m</span>
                <span className="text-xs font-mono text-slate-400 tracking-wider">SUPORTE MÉDIO</span>
              </div>
            </div>

          </div>

          {/* Right Visual Column (Gamer & Tech Fiber visual) */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-8 lg:mt-0">
            {/* Ambient Backlight Panel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/20 to-brand-bright-blue/30 rounded-3xl filter blur-2xl transform rotate-3 -z-10" />

            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl border border-slate-700/60 bg-[#0d142c]/80 overflow-hidden shadow-2xl p-6 flex flex-col justify-between">
              
              {/* Card visual header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 bg-slate-800/40 border border-slate-700/50 rounded-xl px-3 py-1.5">
                  <Zap size={14} className="text-brand-neon animate-bounce" />
                  <span className="text-xs font-mono font-extrabold tracking-wider text-slate-300">GIGANET_ROUTER_ACTIVE</span>
                </div>
                <div className="h-3 w-3 rounded-full bg-brand-neon animate-pulse" />
              </div>

              {/* Center Abstract Tech Fiber Graphic */}
              <div className="relative w-full flex-grow my-6 rounded-2xl overflow-hidden border border-slate-800 group">
                <img 
                  src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800" 
                  alt="Fibra Óptica Giganet de Altíssima Velocidade"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Visual Glassmorphic overlay cards to represent various users */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center space-x-3 shadow-lg max-w-[200px]">
                  <div className="p-2 rounded-lg bg-brand-purple/30 text-brand-bright-blue">
                    <Shield size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono tracking-wider text-slate-300">WIFI SEGURO</span>
                    <span className="text-xs font-bold text-white">Dual Band 5Ghz</span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-brand-dark/80 backdrop-blur-md rounded-xl p-3 border border-brand-neon/30 flex items-center space-x-3 shadow-lg max-w-[220px]">
                  <div className="p-2 rounded-lg bg-brand-neon/10 text-brand-neon">
                    <Users size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono tracking-wider text-slate-300">CONECTANDO</span>
                    <span className="text-xs font-bold text-white">Dispositivos llimitados</span>
                  </div>
                </div>
              </div>

              {/* Status footer with connected user badge */}
              <div className="flex justify-between items-center bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-100">Live Streaming 4K</span>
                    <span className="text-[10px] font-mono text-brand-neon">Sem Latência ou Buffer</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">PING: 2ms</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
