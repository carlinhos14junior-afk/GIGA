import { Check, Wifi, ArrowDown, Headphones, Home, Star, Zap } from 'lucide-react';
import { SiteConfig, Plano } from '../types';

interface PlanosProps {
  config: SiteConfig;
  planos: Plano[];
}

export default function Planos({ config, planos }: PlanosProps) {
  const activePlanos = planos.filter(p => p.ativo);

  const getWhatsAppPlanoLink = (plano: Plano) => {
    const text = `Olá! Quero consultar cobertura e assinar o plano ${plano.velocidade} (${plano.nome}) por R$ ${plano.preco.toFixed(2).replace('.', ',')}/mês na GIGATEL FIBER. Pode me ajudar?`;
    return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  // Helper to obtain corresponding benefit icons
  const getBenefitIcon = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('wi-fi') || lower.includes('wifi')) {
      return <Wifi size={14} />;
    }
    if (lower.includes('download') || lower.includes('ilimitado')) {
      return <ArrowDown size={14} />;
    }
    if (lower.includes('suporte') || lower.includes('técnico')) {
      return <Headphones size={14} />;
    }
    if (lower.includes('casa') || lower.includes('residên') || lower.includes('empresa')) {
      return <Home size={14} />;
    }
    return <Check size={14} />;
  };

  return (
    <section id="planos" className="relative py-20 bg-[#F4F6F9] border-b border-slate-205">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 animate-fade-in">
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A2F8F] mb-3 tracking-tighter leading-tight uppercase">
            PLANOS QUE CABEM <span className="text-[#E30613]">NO SEU MUNDO</span>
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Escolha o plano ideal e conecte-se ao que realmente importa.
          </p>
        </div>

        {/* Plans Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto pt-2">
          {activePlanos.map((plano) => {
            const isFeatured = plano.destaque;
            
            return (
              <div
                id={`plano-card-${plano.id}`}
                key={plano.id}
                className={`relative flex flex-col justify-between rounded-3xl transition-all duration-300 bg-white ${
                  isFeatured
                    ? 'border-2 border-[#E30613] shadow-lg lg:scale-103 z-10'
                    : 'border border-slate-200/90 shadow-sm hover:translate-y-[-3px] hover:border-brand-blue-royal/30'
                } p-6 sm:p-8`}
              >
                {/* Popular Highlight Tag/Banner */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E30613] text-white px-8 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow-md">
                    <Star size={10} className="text-white fill-current" />
                    <span>MAIS VENDIDO</span>
                  </div>
                )}

                {/* Split internal layout inside each card on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch h-full">
                  
                  {/* Left block: speed details and custom bullets checkmarks */}
                  <div className="md:col-span-7 flex flex-col justify-between pr-0 md:pr-4">
                    <div>
                      {/* Speed */}
                      <p className={`text-4xl sm:text-5xl font-display font-black tracking-tight mb-6 mt-1 uppercase ${
                        isFeatured ? 'text-[#E30613]' : 'text-[#0A2F8F]'
                      }`}>
                        {plano.velocidade}
                      </p>

                      {/* Customized Checklist */}
                      <ul className="space-y-4">
                        {plano.beneficios && plano.beneficios.map((ben, idx) => (
                          <li key={idx} className="flex items-center space-x-3 text-xs text-slate-700">
                            <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white ${
                              isFeatured ? 'bg-[#E30613]' : 'bg-[#0A2F8F]'
                            }`}>
                              {getBenefitIcon(ben)}
                            </div>
                            <span className="font-semibold text-slate-800">{ben}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right block: standalone price and large CTA button */}
                  <div className="md:col-span-5 flex flex-col justify-between items-center md:items-stretch border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6 text-center md:text-left h-full">
                    
                    {/* Price structure */}
                    <div className="mb-4">
                      <p className="text-[10px] font-bold text-slate-450 uppercase tracking-widest text-[#0A2F8F] mb-1">
                        por apenas
                      </p>
                      
                      <div className="flex items-baseline justify-center md:justify-start">
                        <span className="text-slate-800 text-xs font-bold mr-1 self-start mt-2">R$</span>
                        <span className="text-slate-900 text-6xl font-display font-black tracking-tighter">
                          {Math.floor(plano.preco)}
                        </span>
                        
                        <div className="flex flex-col ml-1 align-bottom self-end pb-1.5 leading-none">
                          <span className="text-slate-900 text-lg font-display font-bold">
                            ,{((plano.preco % 1) * 105).toFixed(0).padStart(2, '0').substring(0, 2)}
                          </span>
                          <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-0.5">/mês</span>
                        </div>
                      </div>
                    </div>

                    {/* Standalone card submit button */}
                    <a
                      href={getWhatsAppPlanoLink(plano)}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      rel="noopener noreferrer"
                      className={`w-full py-4 px-4 rounded-lg font-black uppercase text-xs tracking-wider text-center transition-all duration-200 shadow shadow-sm active:scale-97 block ${
                        isFeatured
                          ? 'bg-[#E30613] hover:bg-opacity-92 text-white'
                          : 'bg-[#0A2F8F] hover:bg-opacity-92 text-white'
                      }`}
                    >
                      QUERO ESSE PLANO
                    </a>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
