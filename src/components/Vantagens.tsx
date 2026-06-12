import { Zap, HelpCircle, UserCheck, Wifi, Building2, Tv, ShieldCheck } from 'lucide-react';

export default function Vantagens() {
  const vantagens = [
    {
      titulo: 'Fibra Óptica 100% Pura',
      descricao: 'Velocidade e transmissão simétrica completa até dentro do roteador, reduzindo oscilações e quedas bruscas.',
      icon: Zap,
      cor: 'text-sky-600 bg-sky-50'
    },
    {
      titulo: 'Instalação Ágil',
      descricao: 'Processo rápido ideal para você não perder tempo. Agendamento facilitado e técnicos qualificados.',
      icon: ShieldCheck,
      cor: 'text-emerald-600 bg-emerald-50'
    },
    {
      titulo: 'Suporte Humanizado',
      descricao: 'Sem robôs chatos. Atendimento rápido por WhatsApp com técnicos locais prontos para solucionar seu caso.',
      icon: UserCheck,
      cor: 'text-pink-600 bg-pink-50'
    },
    {
      titulo: 'Wi-Fi Dual Band de Alta Performance',
      descricao: 'Equipamento inteligente Dual Band que equilibra conexões nos canais 2.4Ghz e 5Ghz de forma automática.',
      icon: Wifi,
      cor: 'text-indigo-600 bg-indigo-50'
    },
    {
      titulo: 'Residencial & Corporativo',
      descricao: 'Sinal otimizado sob medida seja para conectar as TVs da sua família ou manter redes de empresas rodando sem quedas.',
      icon: Building2,
      cor: 'text-amber-600 bg-amber-50'
    },
    {
      titulo: 'Ideal para Games & Streaming',
      descricao: 'Latência baixíssima (Ping ideal) perfeito para streaming em 4K e jogos competitivos em tempo real.',
      icon: Tv,
      cor: 'text-violet-600 bg-violet-50'
    },
  ];

  return (
    <section id="vantagens" className="relative py-28 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-1 border border-slate-200 bg-white px-3 py-1 rounded-full text-slate-500 font-bold text-xs uppercase mb-4 tracking-wider">
            <span>Diferenciais Giganet</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4 leading-tight">
            Por que escolher a internet Fibra da Giganet?
          </h2>

          <p className="text-slate-600 text-sm sm:text-base">
            Combinamos uma infraestrutura de telecom moderna com suporte ao cliente dedicado e ágil perto de você.
          </p>
        </div>

        {/* Benefits Grid */}
        <div id="vantagens-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vantagens.map((item, idx) => {
            const IconComponent = item.icon;
            
            return (
              <div
                key={idx}
                className="group relative rounded-3xl bg-white border border-slate-200/80 p-8 shadow-sm hover:shadow-md hover:border-slate-350 transition-all duration-200"
              >
                {/* Card Icon */}
                <div className={`p-3 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 ${item.cor}`}>
                  <IconComponent size={24} />
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-lg text-slate-905 mb-3">
                  {item.titulo}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed">
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
