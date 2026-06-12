import { ArrowRight, MessageSquare, Check, Shield, Users, Network } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
}

export default function Hero({ config }: HeroProps) {
  const whatsAppLink = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    `Olá, tenho interesse nos planos de Internet Fibra da ${config.nome_empresa}. Gostaria de mais informações!`
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
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-white overflow-hidden border-b border-slate-100"
    >
      {/* Light subtle abstract decoration instead of heavy neon elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-[radial-gradient(ellipse_at_top_right,#f0f9ff,transparent_55%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[50%] bg-[radial-gradient(ellipse_at_bottom_left,#f0fdf4,transparent_55%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col space-y-8 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 bg-sky-50 border border-sky-100 px-3 py-1.5 rounded-full self-center lg:self-start">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-bold tracking-widest text-sky-700 uppercase">
                FIBRA ÓPTICA TELECOM ULTRAVELOZ
              </span>
            </div>

            {/* Title - Elegant, large dark-blue telecom style */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 leading-[1.15]">
              A melhor conexão de{' '}
              <span className="text-sky-600">
                Internet Fibra
              </span>{' '}
              para a sua residência ou empresa.
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-lg sm:text-xl font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Descubra a ultravelocidade de navegar, assistir vídeos em 4K, jogar online e trabalhar sem interferências e sem quedas. Estabilidade de ponta a ponta com suporte prioritário no WhatsApp.
            </p>

            {/* CTA Buttons - Green focus or clean sky-blue details */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={handleConsultClick}
                className="group flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-emerald-500/20 transition-all duration-200"
              >
                <span>Consultar Cobertura</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={whatsAppLink}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="group flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-bold px-8 py-4 rounded-xl transition-all duration-200"
              >
                <MessageSquare size={18} className="text-emerald-500" />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>

            {/* Quick Benefits Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-100 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center space-x-2 text-slate-700 justify-center lg:justify-start">
                <div className="p-1 rounded-full bg-emerald-50 text-emerald-600">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <span className="text-sm font-semibold">Instalação Grátis</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 justify-center lg:justify-start">
                <div className="p-1 rounded-full bg-emerald-50 text-emerald-600">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <span className="text-sm font-semibold">Roteador Wi-Fi Incluso</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 justify-center lg:justify-start">
                <div className="p-1 rounded-full bg-emerald-50 text-emerald-600">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <span className="text-sm font-semibold">Sem Limite de Dados</span>
              </div>
            </div>

          </div>

          {/* Right Column - Premium Clean Telecom Card with human connection */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
            {/* Soft decorative shadow behind */}
            <div className="absolute inset-0 bg-sky-100/50 rounded-[2.5rem] filter blur-xl transform rotate-3 -z-10" />

            {/* Clean Rounded Layout Card */}
            <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl flex flex-col">
              
              {/* Photo representation */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 mb-6 group">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" 
                  alt="Tranquilidade e velocidade navegando na internet"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                
                {/* Floating corporate trust indicator inside photo */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider bg-slate-900/45 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                    Estabilidade 99.9%
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-slate-900/40 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                    Fibra Óptica
                  </span>
                </div>
              </div>

              {/* Core Features list on the side */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest text-[#0F172A]">
                  Diferenciais do Provedor Giganet
                </h4>
                
                <div className="flex items-start space-x-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="mt-1 p-2 bg-sky-50 rounded-lg text-sky-600">
                    <Network size={18} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800 leading-none mb-1">Rede 100% Própria</h5>
                    <p className="text-xs text-slate-500">Tecnologia avançada FTTH até dentro de casa.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="mt-1 p-2 bg-emerald-50 rounded-lg text-emerald-600">
                    <Shield size={18} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800 leading-none mb-1">Garantia de Velocidades</h5>
                    <p className="text-xs text-slate-500">Download e Upload de alta performance sem oscilar.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="mt-1 p-2 bg-pink-50 rounded-lg text-pink-500">
                    <Users size={18} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800 leading-none mb-1">Atendimento Humanizado</h5>
                    <p className="text-xs text-slate-500">Canais de ajuda com técnicos dedicados e sem robôs chatos.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
