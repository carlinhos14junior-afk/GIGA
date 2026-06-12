import { Check, Wifi, Star, Tv, Gamepad2, Briefcase, Share2, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { SiteConfig, Plano } from '../types';

interface PlanosProps {
  config: SiteConfig;
  planos: Plano[];
}

export default function Planos({ config, planos }: PlanosProps) {
  // Use DB plans if some are active, otherwise fall back to 2 high-conversion premium default plans
  const dbPlanos = planos.filter(p => p.ativo);
  
  const fallbackPlanos: Plano[] = [
    {
      id: 'f1',
      nome: 'PREMIUM FIBRA',
      velocidade: '500 MEGA',
      preco: 99.90,
      detalhes: 'Ideal para famílias que querem navegar, assistir e jogar com velocidade premium.',
      beneficios: [
        'Streaming',
        'Games Online',
        'Home Office',
        'Redes Sociais',
        'Instalação Rápida',
        'Wi-Fi Incluso'
      ],
      destaque: false,
      ativo: true,
      created_at: ''
    },
    {
      id: 'f2',
      nome: 'GIGA BLACK',
      velocidade: '1 GIGA',
      preco: 149.90,
      detalhes: 'A velocidade máxima de conexão. Desenvolvida para múltiplos dispositivos simultâneos, gamers profissionais e streaming em 4K/8K.',
      beneficios: [
        'Streaming',
        'Games Online',
        'Home Office',
        'Redes Sociais',
        'Instalação Rápida',
        'Wi-Fi Incluso'
      ],
      destaque: true, // DESTACAR O PLANO MAIS VENDIDO
      ativo: true,
      created_at: ''
    }
  ];

  const activePlanos = dbPlanos.length > 0 ? dbPlanos : fallbackPlanos;

  const whatsappNumber = config.whatsapp ? config.whatsapp.replace(/\D/g, '') : '5511910050121';
  const getWhatsAppPlanoLink = (plano: Plano) => {
    const text = `Olá ${config.nome_empresa || 'GIGATEL'}! Quero assinar o plano ${plano.velocidade} por R$ ${(Number(plano.preco) || 0).toFixed(2).replace('.', ',')}/mês agora. Por favor, verifique minha cobertura!`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  // Maps exact request items to representative interactive icons
  const getFeatureIcon = (ben: string, isFeatured: boolean) => {
    const text = ben.toLowerCase();
    const color = isFeatured ? 'text-white' : 'text-[#0057FF]';
    if (text.includes('streaming')) return <Tv size={15} className={color} />;
    if (text.includes('game') || text.includes('jogo')) return <Gamepad2 size={15} className={color} />;
    if (text.includes('home') || text.includes('office') || text.includes('trabalho')) return <Briefcase size={15} className={color} />;
    if (text.includes('rede') || text.includes('social') || text.includes('instagram')) return <Share2 size={15} className={color} />;
    if (text.includes('instala') || text.includes('rápida')) return <Zap size={15} className={color} />;
    if (text.includes('wi-fi') || text.includes('wifi') || text.includes('roteador')) return <Wifi size={15} className={color} />;
    return <Check size={14} className={color} />;
  };

  return (
    <section 
      id="planos" 
      className="relative py-28 bg-[#F3F8FF] overflow-hidden text-slate-800 border-b border-slate-100"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full text-[#0057FF] font-black text-xs uppercase mb-4 tracking-widest">
            <Sparkles size={12} className="text-[#0057FF]" />
            <span>Nossos Planos</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 tracking-tighter leading-none uppercase">
            CONEXÕES QUE IMPULSIONAM <br />
            <span className="text-[#0057FF] font-extrabold bg-gradient-to-r from-[#0057FF] to-[#0188FF] bg-clip-text text-transparent">
              O SEU DIGITAL
            </span>
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Internet 100% fibra óptica com ultraestabilidade para navegar, jogar, fazer streaming 4K e Home Office sem quedas ou lentidão.
          </p>
        </div>

        {/* Plans Container Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-5xl mx-auto">
          {activePlanos.map((plano) => {
            const isFeatured = plano.destaque;
            
            // Use custom benefits from the admin panel if provided, otherwise fallback to defaults
            const benefitsList = (plano.beneficios && plano.beneficios.length > 0)
              ? plano.beneficios
              : [
                'Streaming',
                'Games Online',
                'Home Office',
                'Redes Sociais',
                'Instalação Rápida',
                'Wi-Fi Incluso'
              ];

            return (
              <div
                id={`plano-card-${plano.id}`}
                key={plano.id}
                className={`relative flex flex-col justify-between rounded-3xl transition-all duration-300 overflow-hidden ${
                  isFeatured
                    ? 'bg-[#0057FF] text-white border-2 border-transparent shadow-2xl md:scale-103 z-10'
                    : 'bg-white border-2 border-[#0057FF] shadow-md hover:shadow-lg'
                } group p-8 hover:translate-y-[-4px]`}
              >
                {/* Popular Highlight Tag */}
                {isFeatured && (
                  <div className="absolute top-4 right-4 bg-[#E53935] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-1 shadow-md">
                    <Star size={11} className="text-white fill-current animate-pulse" />
                    <span>MAIS VENDIDO</span>
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <span className={`text-xs font-black tracking-widest uppercase block mb-1 ${isFeatured ? 'text-blue-200' : 'text-slate-400'}`}>
                    {plano.nome || 'PLANO ULTRA'}
                  </span>
                  <p className={`text-4xl sm:text-5xl font-display font-black tracking-tight mb-2 uppercase ${isFeatured ? 'text-white' : 'text-slate-900'}`}>
                    {plano.velocidade}
                  </p>
                  <p className={`text-xs font-medium leading-relaxed mb-6 ${isFeatured ? 'text-blue-105' : 'text-slate-550'}`}>
                    {plano.detalhes || 'A melhor tecnologia de conexão de ponta a ponta.'}
                  </p>

                  <hr className={`mb-6 ${isFeatured ? 'border-white/20' : 'border-slate-100'}`} />

                  {/* Checklist of exact items */}
                  <h4 className={`text-[11px] font-black uppercase tracking-wider mb-4 ${isFeatured ? 'text-white' : 'text-[#0057FF]'}`}>
                    O que está incluso no plano:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-8">
                    {benefitsList.map((ben, idx) => (
                      <li key={idx} className="flex items-center space-x-3 text-xs">
                        <div className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center p-1 font-semibold ${isFeatured ? 'bg-white/10 border border-white/20' : 'bg-blue-50 border border-blue-100/40'}`}>
                          {getFeatureIcon(ben, isFeatured)}
                        </div>
                        <span className={`font-semibold ${isFeatured ? 'text-white/90' : 'text-slate-700'}`}>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing & CTA */}
                <div className={`mt-auto pt-6 border-t ${isFeatured ? 'border-white/20' : 'border-slate-100'}`}>
                  <div className="flex items-baseline justify-between mb-5">
                    <div>
                      <span className={`text-[10px] uppercase tracking-widest font-bold block ${isFeatured ? 'text-blue-200' : 'text-slate-400'}`}>Assinatura mensal</span>
                      <div className="flex items-baseline mt-1">
                        <span className={`text-sm font-black mr-1 ${isFeatured ? 'text-white' : 'text-slate-800'}`}>R$</span>
                        <span className={`text-5xl font-display font-black tracking-tighter ${isFeatured ? 'text-white font-extrabold' : 'text-slate-900'}`}>
                          {Math.floor(Number(plano.preco) || 0)}
                        </span>
                        <div className="flex flex-col ml-1 leading-none">
                          <span className={`text-xl font-display font-black ${isFeatured ? 'text-white' : 'text-[#0057FF]'}`}>
                            ,{String(((Number(plano.preco) || 0) % 1).toFixed(2)).split('.')[1] || '90'}
                          </span>
                          <span className={`text-[10px] uppercase font-bold tracking-widest ${isFeatured ? 'text-blue-200' : 'text-slate-500'}`}>/mês</span>
                        </div>
                      </div>
                    </div>

                    <div className={`text-right text-[10px] font-bold uppercase tracking-wider ${isFeatured ? 'text-blue-200' : 'text-slate-400'}`}>
                      Taxa de adesão grátis
                    </div>
                  </div>

                  {/* Purchase CTA button - REMOVED AS REQUESTED */}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
