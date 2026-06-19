import { Check, Wifi, Star, Tv, Gamepad2, Briefcase, Share2, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { SiteConfig, Plano } from '../types';

interface PlanosProps {
  config: SiteConfig;
  planos: Plano[];
}

export default function Planos({ config, planos }: PlanosProps) {
  // Use DB plans if some are active, otherwise fall back to premium default flyer plans
  const dbPlanos = planos.filter(p => p.ativo);
  
  const fallbackPlanos: Plano[] = [
    {
      id: 'f100',
      nome: 'GIGA START 100',
      velocidade: '100 MEGA',
      preco: 69.99,
      detalhes: 'Internet Fibra de alta qualidade para navegar com total economia.',
      beneficios: [
        'Canais abertos e fechados',
        'Internet 100% Fibra Óptica',
        'Roteador Wi-Fi Incluso',
        'Redes Sociais e e-mails',
        'Instalação Grátis',
        'Garantia Gigatel Fiber'
      ],
      destaque: false,
      ativo: true,
      ordem: 1,
      created_at: ''
    },
    {
      id: 'f600',
      nome: 'GIGA AJUSTADO 600',
      velocidade: '600 MEGA',
      preco: 70.00,
      detalhes: 'Promoção Marquee Flyer! Sabemos que mudanças geram gastos, por isso a Gigatel moldou este super plano para você.',
      beneficios: [
        '+ 110 Canais de TV',
        'Internet 100% Fibra Óptica',
        'Super Estabilidade & Games',
        'Roteador Gigabit Wi-Fi',
        'Instalação Residencial Grátis',
        'Suporte Próprio 24h'
      ],
      destaque: true,
      ativo: true,
      ordem: 2,
      created_at: ''
    },
    {
      id: 'f200',
      nome: 'GIGA SMART 200',
      velocidade: '200 MEGA',
      preco: 79.90,
      detalhes: 'Velocidade excelente para streaming de vídeos e consumo multidevice leve.',
      beneficios: [
        'Canais abertos e fechados',
        'Internet 100% Fibra Óptica',
        'Roteador Wi-Fi Incluso',
        'Vídeos e Playlists HD',
        'Instalação Grátis',
        'Garantia Gigatel Fiber'
      ],
      destaque: false,
      ativo: true,
      ordem: 3,
      created_at: ''
    },
    {
      id: 'f300',
      nome: 'GIGA MAIS 300',
      velocidade: '300 MEGA',
      preco: 89.90,
      detalhes: 'Conexão robusta e veloz para múltiplos dispositivos simultâneos.',
      beneficios: [
        'Canais abertos e fechados',
        'Internet 100% Fibra Óptica',
        'Roteador Gigabit Wi-Fi',
        'Jogos Online e Downloads',
        'Instalação Grátis',
        'Garantia Gigatel Fiber'
      ],
      destaque: false,
      ativo: true,
      ordem: 4,
      created_at: ''
    },
    {
      id: 'f500',
      nome: 'GIGA ULTRA 500',
      velocidade: '500 MEGA',
      preco: 99.90,
      detalhes: 'Performance profissional para trabalho, estudo e lazer em alto nível.',
      beneficios: [
        'Canais abertos e fechados',
        'Internet 100% Fibra Óptica',
        'Roteador Bi-Band Gigabit',
        'Streaming 4K e Home Office',
        'Instalação Grátis',
        'Garantia Gigatel Fiber'
      ],
      destaque: false,
      ativo: true,
      ordem: 5,
      created_at: ''
    },
    {
      id: 'f800',
      nome: 'GIGA SUPREMO 800',
      velocidade: '800 MEGA',
      preco: 109.90,
      detalhes: 'O plano topo de linha para quem deseja a menor latência e maior vazão.',
      beneficios: [
        'Canais abertos e fechados',
        'Internet 100% Fibra Óptica',
        'Roteador Premium Wi-Fi',
        'Descargas Instantâneas',
        'Instalação Premium Grátis',
        'Suporte VIP Prioritário'
      ],
      destaque: false,
      ativo: true,
      ordem: 6,
      created_at: ''
    }
  ];

  // Sort plans by order or price
  const activePlanos = dbPlanos.length > 0 
    ? [...dbPlanos].sort((a, b) => (a.ordem || 0) - (b.ordem || 0)) 
    : fallbackPlanos;

  const whatsappNumber = config.whatsapp ? config.whatsapp.replace(/\D/g, '') : '5511910050121';
  const getWhatsAppPlanoLink = (plano: Plano) => {
    const text = `Olá ${config.nome_empresa || 'GIGATEL'}! Quero assinar o plano ${plano.velocidade} por R$ ${(Number(plano.preco) || 0).toFixed(2).replace('.', ',')}/mês agora. Por favor, verifique minha cobertura!`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  // Maps exact request items to representative interactive icons
  const getFeatureIcon = (ben: string, isFeatured: boolean) => {
    const text = ben.toLowerCase();
    const color = isFeatured ? 'text-white' : 'text-[#0057FF]';
    if (text.includes('streaming') || text.includes('canal') || text.includes('tv') || text.includes('canais')) return <Tv size={15} className={color} />;
    if (text.includes('game') || text.includes('jogo')) return <Gamepad2 size={15} className={color} />;
    if (text.includes('home') || text.includes('office') || text.includes('trabalho')) return <Briefcase size={15} className={color} />;
    if (text.includes('rede') || text.includes('social') || text.includes('instagram')) return <Share2 size={15} className={color} />;
    if (text.includes('instala') || text.includes('rápida') || text.includes('grátis')) return <Zap size={15} className={color} />;
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
            <span>Nossos Planos de Internet e TV</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 tracking-tighter leading-none uppercase">
            CONEXÕES QUE IMPULSIONAM <br />
            <span className="text-[#0057FF] font-extrabold bg-gradient-to-r from-[#0057FF] to-[#0188FF] bg-clip-text text-transparent">
              O SEU DIGITAL
            </span>
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Internet 100% fibra óptica com ultraestabilidade para navegar, jogar, assistir TV Digital e fazer Home Office em altíssima qualidade.
          </p>
        </div>

        {/* Plans Container Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
          {activePlanos.map((plano) => {
            const isFeatured = plano.destaque;
            
            // Use custom benefits from the admin panel if provided, otherwise fallback to defaults
            const benefitsList = (plano.beneficios && plano.beneficios.length > 0)
              ? plano.beneficios
              : [
                'Streaming de Vídeo',
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
                    : 'bg-white border-2 border-slate-200 hover:border-[#0057FF] shadow-sm hover:shadow-lg'
                } group p-8 hover:translate-y-[-4px]`}
              >
                {/* Popular Highlight Tag */}
                {isFeatured && (
                  <div className="absolute top-4 right-4 bg-[#E53935] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-1 shadow-md">
                    <Star size={11} className="text-white fill-current animate-pulse" />
                    <span>MAIS VENDIDO / PROMO</span>
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
                  <p className={`text-xs font-medium leading-relaxed mb-6 min-h-[36px] ${isFeatured ? 'text-blue-100' : 'text-slate-500'}`}>
                    {plano.detalhes || plano.descricao || 'A melhor tecnologia de conexão de ponta a ponta.'}
                  </p>

                  <hr className={`mb-6 ${isFeatured ? 'border-white/20' : 'border-slate-100'}`} />

                  {/* Checklist of exact items */}
                  <h4 className={`text-[11px] font-black uppercase tracking-wider mb-4 ${isFeatured ? 'text-white' : 'text-[#0057FF]'}`}>
                    O que está incluso no plano:
                  </h4>
                  <ul className="flex flex-col gap-y-3 mb-8">
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

                  <a
                    href={getWhatsAppPlanoLink(plano)}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className={`w-full py-3.5 px-6 rounded-2xl font-black uppercase text-xs tracking-wider flex items-center justify-center space-x-2 transition-all ${
                      isFeatured
                        ? 'bg-white text-[#0057FF] hover:bg-slate-50 hover:scale-[1.01]'
                        : 'bg-[#0057FF] text-white hover:bg-blue-600 hover:scale-[1.01]'
                    }`}
                  >
                    <span>Contratar no WhatsApp</span>
                    <ArrowRight size={14} />
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
