import { Check, Star, Zap, Info } from 'lucide-react';
import { SiteConfig, Plano } from '../types';

interface PlanosProps {
  config: SiteConfig;
  planos: Plano[];
}

export default function Planos({ config, planos }: PlanosProps) {
  const activePlanos = planos.filter(p => p.ativo);

  const getWhatsAppPlanoLink = (plano: Plano) => {
    const text = `Olá! Quero consultar cobertura e assinar o plano ${plano.velocidade} (${plano.nome}) por R$ ${plano.preco.toFixed(2).replace('.', ',')}/mês na Giganet. Pode me ajudar?`;
    return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="planos" className="relative py-28 bg-slate-50 border-b border-slate-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-1.5 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full text-sky-700 font-bold text-xs uppercase mb-4 tracking-wider">
            <Zap size={12} className="text-sky-600 fill-current" />
            <span>Nossos Planos Fibra</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4 tracking-tight leading-tight">
            Escolha o Plano Ideal para a sua Necessidade
          </h2>
          
          <p className="text-slate-600 text-base sm:text-lg">
            Navegue com estabilidade garantida, sem pegadinhas ou limites de dados. Encontre planos perfeitos com Wi-Fi inteligente de última geração.
          </p>
        </div>

        {/* Plans Container Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto pt-2">
          {activePlanos.map((plano) => {
            const isFeatured = plano.destaque;
            
            return (
              <div
                id={`plano-card-${plano.id}`}
                key={plano.id}
                className={`relative flex flex-col justify-between rounded-3xl transition-all duration-300 ${
                  isFeatured
                    ? 'bg-white border-2 border-slate-900 shadow-xl md:scale-105 z-10'
                    : 'bg-white border border-slate-200 hover:border-slate-350 shadow-sm hover:translate-y-[-4px]'
                } p-8`}
              >
                {/* Popular Highlight Badge */}
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider flex items-center space-x-1 shadow-md">
                    <Star size={12} fill="#eab308" className="text-yellow-400 fill-current" />
                    <span>Plano Mais Vendido</span>
                  </div>
                )}

                <div>
                  {/* Card Title & Speed */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">{plano.nome}</h3>
                      <p className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900 mt-1">
                        {plano.velocidade}
                      </p>
                    </div>
                    <div className={`p-2 rounded-xl ${isFeatured ? 'bg-sky-50 text-sky-600' : 'bg-slate-100 text-slate-600'}`}>
                      <Zap size={22} className="fill-current" />
                    </div>
                  </div>

                  {/* Pricing block */}
                  <div className="mb-6 flex items-baseline border-b border-slate-100 pb-6">
                    <span className="text-slate-600 text-sm font-bold mr-1">R$</span>
                    <span className="text-slate-900 text-5xl font-display font-black tracking-tighter">
                      {Math.floor(plano.preco)}
                    </span>
                    <span className="text-slate-950 text-2xl font-display font-bold">
                      ,{((plano.preco % 1) * 100).toFixed(0).padStart(2, '0')}
                    </span>
                    <span className="text-slate-500 text-xs ml-1.5 uppercase font-bold tracking-wider">/ mês</span>
                  </div>

                  {/* Core checklist */}
                  <ul className="space-y-3.5 mb-8">
                    <li className="flex items-center space-x-3 text-sm text-slate-700">
                      <div className="min-w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                      <span className="font-bold text-slate-900">Tecnologia 100% Fibra Óptica</span>
                    </li>
                    <li className="flex items-center space-x-3 text-sm text-slate-700">
                      <div className="min-w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                      <span className="text-slate-700">Roteador Wi-Fi Incluso</span>
                    </li>
                    <li className="flex items-center space-x-3 text-sm text-slate-700">
                      <div className="min-w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                      <span className="text-slate-700">Download Ilimitado, Sem Franquia</span>
                    </li>
                    <li className="flex items-center space-x-3 text-sm text-slate-700">
                      <div className="min-w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                      <span className="text-slate-700">Instalação Facilitada / Gratuita</span>
                    </li>

                    {/* Custom database benefits */}
                    {plano.beneficios && plano.beneficios.map((b, idx) => {
                      const lowercaseB = b.toLowerCase();
                      if (
                        lowercaseB.includes('100% fibra') || 
                        lowercaseB.includes('wi-fi incluso') || 
                        lowercaseB.includes('download ilimitado') || 
                        lowercaseB.includes('suporte técnico')
                      ) return null;

                      return (
                        <li key={idx} className="flex items-center space-x-3 text-sm text-slate-700">
                          <div className="min-w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <Check size={12} className="stroke-[3]" />
                          </div>
                          <span>{b}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Submit button - Emerald green only inside button action! */}
                <a
                  href={getWhatsAppPlanoLink(plano)}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className={`w-full py-4 px-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all duration-200 text-sm shadow-sm ${
                    isFeatured
                      ? 'bg-emerald-500 hover:bg-emerald-605 text-white hover:scale-101 shadow-emerald-500/15'
                      : 'bg-slate-900 hover:bg-slate-800 text-white hover:scale-101'
                  }`}
                >
                  <span>Quero assinar</span>
                  <Zap size={14} className="text-green-200 fill-current" />
                </a>

              </div>
            );
          })}
        </div>

        {/* Small installation tip bar */}
        <div className="flex items-center justify-center space-x-2.5 mt-20 max-w-xl mx-auto bg-slate-100/70 border border-slate-200 rounded-2xl p-4 text-center">
          <Info size={16} className="text-sky-600 shrink-0" />
          <p className="text-xs text-slate-500">
            * Sujeito à análise de viabilidade técnica. Equipamentos em regime de comodato. Suporte 100% humanizado no WhatsApp com equipe local.
          </p>
        </div>

      </div>
    </section>
  );
}
