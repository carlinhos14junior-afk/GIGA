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

  const getWhatsAppPlanoLink = (plano: Plano) => {
    const text = `Olá GIGATEL! Quero assinar o plano ${plano.velocidade} por R$ ${plano.preco.toFixed(2).replace('.', ',')}/mês agora. Por favor, verifique minha cobertura!`;
    return `https://wa.me/5511910050121?text=${encodeURIComponent(text)}`;
  };

  // Maps exact request items to representative interactive icons
  const getFeatureIcon = (ben: string) => {
    const text = ben.toLowerCase();
    if (text.includes('streaming')) return <Tv size={15} className="text-[#00D4FF]" />;
    if (text.includes('game') || text.includes('jogo')) return <Gamepad2 size={15} className="text-[#005BFF]" />;
    if (text.includes('home') || text.includes('office') || text.includes('trabalho')) return <Briefcase size={15} className="text-[#00AEEF]" />;
    if (text.includes('rede') || text.includes('social') || text.includes('instagram')) return <Share2 size={15} className="text-[#00D4FF]" />;
    if (text.includes('instala') || text.includes('rápida')) return <Zap size={15} className="text-amber-400 fill-amber-400/20" />;
    if (text.includes('wi-fi') || text.includes('wifi') || text.includes('roteador')) return <Wifi size={15} className="text-[#25D366]" />;
    return <Check size={14} className="text-[#00D4FF]" />;
  };

  return (
    <section 
      id="planos" 
      className="relative py-28 bg-[#020617] overflow-hidden text-white border-b border-white/5"
    >
      {/* Decorative colored glow halos */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-[radial-gradient(circle_at_center,#005BFF/15,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-[radial-gradient(circle_at_center,#00D4FF/15,transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-[#005BFF]/10 border border-[#005BFF]/20 px-4 py-1.5 rounded-full text-[#00D4FF] font-black text-xs uppercase mb-4 tracking-widest">
            <Sparkles size={12} className="animate-spin-slow text-[#00D4FF]" />
            <span>Nossos Planos</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-tighter leading-none uppercase">
            CONEXÕES QUE IMPULSIONAM <br />
            <span className="bg-gradient-to-r from-[#005BFF] via-[#00AEEF] to-[#00D4FF] bg-clip-text text-transparent font-extrabold">
              O SEU DIGITAL
            </span>
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Internet 100% fibra óptica com ultraestabilidade para navegar, jogar, fazer streaming 4K e Home Office sem quedas ou lentidão.
          </p>
        </div>

        {/* Plans Container Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-5xl mx-auto">
          {activePlanos.map((plano) => {
            const isFeatured = plano.destaque;
            
            // Standardize benefits on the requested items
            const benefitsList = [
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
                className={`relative flex flex-col justify-between rounded-3xl transition-all duration-500 overflow-hidden ${
                  isFeatured
                    ? 'bg-slate-905 bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-[#00D4FF] shadow-2xl shadow-blue-500/20 md:scale-103 z-10'
                    : 'bg-slate-900/45 border border-white/5 shadow-xl hover:border-slate-800'
                } group p-8 hover:translate-y-[-6px]`}
              >
                {/* Simulated illuminated border accent */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#005BFF] via-[#00AEEF] to-[#00D4FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Popular Highlight Tag */}
                {isFeatured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#005BFF] to-[#00D4FF] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-1 shadow-lg">
                    <Star size={11} className="text-white fill-current" />
                    <span>MAIS VENDIDO</span>
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <span className="text-xs font-black text-slate-400 tracking-widest uppercase block mb-1">
                    {plano.nome || 'PLANO ULTRA'}
                  </span>
                  <p className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-2 uppercase bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                    {plano.velocidade}
                  </p>
                  <p className="text-xs text-slate-450 font-medium leading-relaxed mb-6">
                    {plano.detalhes || 'A melhor tecnologia de conexão de ponta a ponta.'}
                  </p>

                  <hr className="border-white/5 mb-6" />

                  {/* Checklist of exact items: ✓ Streaming, ✓ Games Online, ✓ Home Office, etc. */}
                  <h4 className="text-[11px] font-black text-[#00AEEF] uppercase tracking-wider mb-4">
                    O que está incluso no plano:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-8">
                    {benefitsList.map((ben, idx) => (
                      <li key={idx} className="flex items-center space-x-3 text-xs text-slate-300">
                        <div className="shrink-0 w-6 h-6 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center p-1 font-semibold">
                          {getFeatureIcon(ben)}
                        </div>
                        <span className="font-semibold text-slate-200">{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing & CTA */}
                <div className="mt-auto pt-6 border-t border-white/5">
                  <div className="flex items-baseline justify-between mb-5">
                    <div>
                      <span className="text-[10px] text-slate-450 uppercase tracking-widest font-bold block">Assinatura mensal</span>
                      <div className="flex items-baseline mt-1">
                        <span className="text-slate-200 text-sm font-black mr-1">R$</span>
                        <span className="text-5xl font-display font-black tracking-tighter text-white">
                          {Math.floor(plano.preco)}
                        </span>
                        <div className="flex flex-col ml-1 leading-none">
                          <span className="text-[#00D4FF] text-xl font-display font-black">
                            ,{String((plano.preco % 1).toFixed(2)).split('.')[1] || '90'}
                          </span>
                          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">/mês</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Taxa de adesão grátis
                    </div>
                  </div>

                  {/* Purchase CTA button */}
                  <a
                    href={getWhatsAppPlanoLink(plano)}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className={`w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest text-center transition-all duration-300 shadow-md block ${
                      isFeatured
                        ? 'bg-gradient-to-r from-[#005BFF] to-[#00D4FF] hover:from-[#005BFF] hover:to-[#00AEEF] text-white shadow-blue-500/10'
                        : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                    }`}
                  >
                    CONTRATAR AGORA
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
