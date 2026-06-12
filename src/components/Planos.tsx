import { Check, Star, Zap, Info } from 'lucide-react';
import { SiteConfig, Plano } from '../types';

interface PlanosProps {
  config: SiteConfig;
  planos: Plano[];
}

export default function Planos({ config, planos }: PlanosProps) {
  // If there are no plans or error occurred, we use default backups
  const activePlanos = planos.filter(p => p.ativo);

  const getWhatsAppPlanoLink = (plano: Plano) => {
    const text = `Olá, tenho interesse no plano ${plano.velocidade} (${plano.nome}) por R$ ${plano.preco.toFixed(2).replace('.', ',')}/mês da GIGANET. Pode verificar a disponibilidade para meu endereço?`;
    return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="planos" className="relative py-24 bg-[#0d142c] overflow-hidden">
      {/* Background glow visual */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-brand-bright-blue/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-brand-purple/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-brand-purple/10 border border-brand-purple/30 px-3 py-1 rounded-full text-brand-bright-blue font-mono text-xs font-semibold uppercase mb-4">
            <Zap size={12} />
            <span>Planos Sob Medida</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mb-4 tracking-tight">
            Navegue com Ultra Velocidade Sem Complicações
          </h2>
          
          <p className="text-slate-400 text-base sm:text-lg">
            Nossos planos foram criados para garantir a estabilidade máxima de conexão, seja para jogar, assistir em 4K, trabalhar em casa ou gerenciar empresas.
          </p>
        </div>

        {/* Plans Container Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:max-w-4xl lg:mx-auto gap-8 items-stretch pt-4">
          
          {activePlanos.map((plano) => {
            const isFeatured = plano.destaque;
            
            return (
              <div
                id={`plano-card-${plano.id}`}
                key={plano.id}
                className={`relative flex flex-col justify-between rounded-3xl transition-all duration-300 ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#181F3D] to-[#0A0F24] border-2 border-brand-purple shadow-xl shadow-brand-purple/20 md:scale-105 z-10'
                    : 'bg-[#101835] border border-slate-800 hover:border-slate-700 shadow-md hover:scale-102'
                } p-6 sm:p-8`}
              >
                {/* Popular Highlight Badge */}
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-purple via-brand-bright-blue to-[#7e22ce] text-white px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider flex items-center space-x-1 shadow-md shadow-brand-purple/40">
                    <Star size={12} fill="white" className="text-white fill-current animate-bounce" />
                    <span>MAIS VENDIDO ★ RECOMENDADO</span>
                  </div>
                )}

                <div>
                  {/* Card Title & Speed */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-200 tracking-tight">{plano.nome}</h3>
                      <p className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white mt-1">
                        {plano.velocidade}
                      </p>
                    </div>
                    <div className={`p-2.5 rounded-2xl ${isFeatured ? 'bg-brand-purple/30 text-brand-neon' : 'bg-slate-800 text-brand-bright-blue'}`}>
                      <Zap size={22} className="fill-current bg-transparent border-0" />
                    </div>
                  </div>

                  {/* Pricing block */}
                  <div className="mb-6 flex items-baseline border-b border-slate-800 pb-6">
                    <span className="text-slate-400 text-xs font-mono mr-1">R$</span>
                    {/* Entire integer of price formatted */}
                    <span className="text-white text-4xl sm:text-5xl font-display font-black tracking-tighter">
                      {Math.floor(plano.preco)}
                    </span>
                    <span className="text-white text-xl font-display font-bold">
                      ,{((plano.preco % 1) * 100).toFixed(0).padStart(2, '0')}
                    </span>
                    <span className="text-slate-400 text-xs ml-1.5 font-mono">/ mês</span>
                  </div>

                  {/* Core checklist */}
                  <ul className="space-y-3.5 mb-8">
                    {/* Mandantes standard items */}
                    <li className="flex items-center space-x-3 text-sm text-slate-300">
                      <div className="min-w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Check size={12} />
                      </div>
                      <span className="font-semibold text-emerald-300">100% Fibra Óptica</span>
                    </li>
                    <li className="flex items-center space-x-3 text-sm text-slate-300">
                      <div className="min-w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Check size={12} />
                      </div>
                      <span className="text-slate-200">Roteador Wi-Fi Incluso</span>
                    </li>
                    <li className="flex items-center space-x-3 text-sm text-slate-300">
                      <div className="min-w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Check size={12} />
                      </div>
                      <span className="text-slate-200">Download Ilimitado</span>
                    </li>
                    <li className="flex items-center space-x-3 text-sm text-slate-300">
                      <div className="min-w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Check size={12} />
                      </div>
                      <span className="text-slate-200">Suporte Técnico Especializado</span>
                    </li>

                    {/* Custom database benefits loaded from the plano item */}
                    {plano.beneficios && plano.beneficios.map((b, idx) => {
                      // Avoid repeating the defaults above if already loaded (such as 'wi-fi', 'fibra', etc.)
                      const lowercaseB = b.toLowerCase();
                      if (
                        lowercaseB.includes('100% fibra') || 
                        lowercaseB.includes('wi-fi incluso') || 
                        lowercaseB.includes('download ilimitado') || 
                        lowercaseB.includes('suporte técnico')
                      ) return null;

                      return (
                        <li key={idx} className="flex items-center space-x-3 text-sm text-slate-300">
                          <div className="min-w-5 h-5 rounded-full bg-brand-bright-blue/20 text-brand-bright-blue flex items-center justify-center">
                            <Check size={12} />
                          </div>
                          <span>{b}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Submit button with conversion WhatsApp */}
                <a
                  href={getWhatsAppPlanoLink(plano)}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className={`w-full py-4 px-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all duration-300 shadow-md ${
                    isFeatured
                      ? 'bg-gradient-to-r from-brand-purple to-[#7e22ce] hover:from-[#7e22ce] hover:to-brand-purple text-white hover:shadow-brand-purple/40 hover:scale-103'
                      : 'bg-slate-800 hover:bg-slate-700/80 text-slate-200 hover:text-white hover:scale-102'
                  }`}
                >
                  <span>Quero esse plano</span>
                  <Zap size={14} className={isFeatured ? 'text-brand-neon' : 'text-brand-bright-blue'} />
                </a>

              </div>
            );
          })}

        </div>

        {/* Small installation tip bar */}
        <div className="flex items-center justify-center space-x-2.5 mt-16 max-w-xl mx-auto bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-center">
          <Info size={16} className="text-brand-bright-blue shrink-0 animate-pulse" />
          <p className="text-xs text-slate-400">
            * Consulta de viabilidade gratuita. Instalação facilitada com agendamento sob medida. Consulte as condições reais com nossos especialistas no WhatsApp.
          </p>
        </div>

      </div>
    </section>
  );
}
