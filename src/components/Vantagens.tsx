import { Zap, HelpCircle, UserCheck, Wifi, Building2, Tv, ShieldCheck } from 'lucide-react';

export default function Vantagens() {
  const vantagens = [
    {
      titulo: 'Fibra Óptica 100% Pura',
      descricao: 'Velocidade de transmissão simétrica de dados pelo cabo óptico inteiro, evitando perdas comuns em fios de cobre tradicionais.',
      icon: Zap,
      cor: 'text-brand-neon'
    },
    {
      titulo: 'Instalação Ágil',
      descricao: 'Processo simplificado e técnicos treinados para deixar você conectado no menor tempo possível sem quebrar suas paredes.',
      icon: ShieldCheck,
      cor: 'text-brand-bright-blue'
    },
    {
      titulo: 'Suporte 100% Humanizado',
      descricao: 'Fale com pessoas reais no WhatsApp. Chega de secretárias eletrônicas chatas ou protocolos de atendimento sem resposta.',
      icon: UserCheck,
      cor: 'text-brand-purple'
    },
    {
      titulo: 'Wi-Fi Potente Dual Band',
      descricao: 'Roteadores modernos que dividem o sinal inteligente de 2.4Ghz e 5Ghz de acordo com seu ambiente de uso.',
      icon: Wifi,
      cor: 'text-[#ec4899]'
    },
    {
      titulo: 'Residencial & Corporativo',
      descricao: 'Links adequados seja para sua família assitir bender de filmes ou para redes empresariais de alto volume de tráfego.',
      icon: Building2,
      cor: 'text-[#f59e0b]'
    },
    {
      titulo: 'Ideal para Games & Streaming',
      descricao: 'Latência extremamente baixa (ping mínimo) para rodar partidas competitivas online e assistir IPTV ou filmes em 4K sem parar.',
      icon: Tv,
      cor: 'text-emerald-400'
    },
  ];

  return (
    <section id="vantagens" className="relative py-24 bg-[#0d142c]">
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b19] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 border border-slate-700 bg-slate-800/40 px-3 py-1 rounded-full text-slate-300 font-mono text-xs font-semibold uppercase mb-4">
            <span>Diferenciais Giganet</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-4">
            Por que escolher a fibra óptica da GIGANET?
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Garantimos uma das tecnologias de conexão mais avançadas do mercado, combinada com o melhor suporte técnico da região.
          </p>
        </div>

        {/* Benefits Grid */}
        <div id="vantagens-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {vantagens.map((item, idx) => {
            const IconComponent = item.icon;
            
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-[#101835] border border-slate-800 p-6 hover:border-brand-purple/40 hover:shadow-lg hover:shadow-brand-purple/10 transition-all duration-300 transform hover:-translate-y-1.5"
              >
                {/* Glow effects inside card on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Card Icon */}
                <div className={`p-4 rounded-2xl bg-slate-900 w-14 h-14 flex items-center justify-center mb-5 ${item.cor} border border-slate-800 group-hover:border-slate-700 group-hover:bg-brand-dark transition-colors`}>
                  <IconComponent size={24} />
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-brand-bright-blue transition-colors">
                  {item.titulo}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.descricao}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
