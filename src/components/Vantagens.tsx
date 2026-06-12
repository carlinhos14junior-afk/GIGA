import { Zap, Gamepad, Unlock, Wifi, Headphones, CheckCircle } from 'lucide-react';

export default function Vantagens() {
  const vantagens = [
    {
      titulo: 'Fibra Óptica de Verdade',
      descricao: '100% fibra ultra estável até dentro da sua residência, reduzindo oscilações e quedas bruscas.',
      icon: Zap,
      cor: 'text-[#0A2F8F] bg-blue-50'
    },
    {
      titulo: 'Sem Limite de Franquia',
      descricao: 'Navegue de forma ilimitada sem qualquer tipo de redução de velocidade ou cobranças surpresas.',
      icon: Unlock,
      cor: 'text-[#E30613] bg-red-50'
    },
    {
      titulo: 'Wi-Fi Inteligente Incluso',
      descricao: 'Seu roteador Dual Band de última geração incluso gratuitamente em comodato nos planos ativos.',
      icon: Wifi,
      cor: 'text-[#0A2F8F] bg-blue-50'
    },
    {
      titulo: 'Instalação Agilizada',
      descricao: 'Processo rápido ideal para você não perder tempo. Agendamento facilitado e técnicos qualificados.',
      icon: CheckCircle,
      cor: 'text-[#E30613] bg-red-50'
    },
    {
      titulo: 'Suporte Humanizado',
      descricao: 'Atendimento extremamente rápido pelo WhatsApp com nossa equipe local sem robôs chatos.',
      icon: Headphones,
      cor: 'text-[#0A2F8F] bg-blue-50'
    },
    {
      titulo: 'Ideal para Jogos & Streaming',
      descricao: 'Velocidade e conectividade com latência mínima (baixo ping) perfeito para seu 4K e games competitivos.',
      icon: Gamepad,
      cor: 'text-[#E30613] bg-red-50'
    },
  ];

  return (
    <section id="vantagens" className="relative py-20 bg-white border-b border-slate-205">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0A2F8F] tracking-tighter mb-3 uppercase">
            POR QUE ESCOLHER A <span className="text-[#E30613]">GIGATEL FIBER</span>?
          </h2>

          <p className="text-slate-650 text-sm sm:text-base font-medium">
            Combinamos uma infraestrutura de telecom moderna com suporte ao cliente dedicado e ágil bem pertinho de você.
          </p>
        </div>

        {/* Benefits Grid */}
        <div id="vantagens-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vantagens.map((item, idx) => {
            const IconComponent = item.icon;
            
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-[#F4F6F9] border border-slate-200 p-7 shadow-sm hover:shadow-md hover:bg-white transition-all duration-200"
              >
                {/* Card Icon */}
                <div className={`p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-5 ${item.cor}`}>
                  <IconComponent size={22} />
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-base text-slate-900 mb-2">
                  {item.titulo}
                </h3>
                
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
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
