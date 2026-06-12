import { Zap, HelpCircle, Activity, Heart, Shield, Headphones, Cpu, CheckCircle } from 'lucide-react';

export default function Vantagens() {
  const vantagens = [
    {
      titulo: 'Fibra Óptica de Ponta',
      descricao: 'Conexão 100% fibra óptica FTTH diretamente dentro do seu roteador, minimizando perdas de sinal e atrasos.',
      icon: Zap,
      cor: 'text-[#005BFF] bg-[#005BFF]/10'
    },
    {
      titulo: 'Instalação Rápida',
      descricao: 'Nossa equipe técnica qualificada realiza a implantação de forma ágil e segura sem complicações na sua casa.',
      icon: CheckCircle,
      cor: 'text-[#00D4FF] bg-[#00D4FF]/10'
    },
    {
      titulo: 'Suporte Especializado',
      descricao: 'Central técnica qualificada com analistas prontos para monitorar e manter sua estabilidade 24 horas por dia.',
      icon: Shield,
      cor: 'text-[#00AEEF] bg-[#00AEEF]/10'
    },
    {
      titulo: 'Alta Estabilidade',
      descricao: 'Navegue sem oscilações climáticas ou gargalos de horário de pico graças à nossa rota de alta capacidade.',
      icon: Activity,
      cor: 'text-[#005BFF] bg-[#005BFF]/10'
    },
    {
      titulo: 'Atendimento Humanizado',
      descricao: 'Esqueça robôs chatos. Fale direto com profissionais paulistanos focados em resolver o seu problema em minutos.',
      icon: Headphones,
      cor: 'text-[#00D4FF] bg-[#00D4FF]/10'
    },
    {
      titulo: 'Tecnologia de Ponta',
      descricao: 'Equipamentos de rede de última geração e roteadores dual band inteligentes inclusos na sua assinatura.',
      icon: Cpu,
      cor: 'text-[#00AEEF] bg-[#00AEEF]/10'
    },
  ];

  return (
    <section 
      id="vantagens" 
      className="relative py-28 bg-[#020617] overflow-hidden text-white border-b border-white/5"
    >
      {/* Space glow elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#005BFF]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[#00D4FF]/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-[#005BFF]/10 border border-[#005BFF]/30 px-4 py-1.5 rounded-full text-[#00D4FF] font-black text-xs uppercase mb-4 tracking-widest">
            <span>Diferenciais Premium</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tighter mb-6 leading-none uppercase">
            POR QUE ESCOLHER A <br />
            <span className="bg-gradient-to-r from-[#005BFF] via-[#00AEEF] to-[#00D4FF] bg-clip-text text-transparent font-extrabold">
              GIGATEL FIBRA
            </span>?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Unimos excelente infraestrutura tecnológica de fibra óptica com pós-venda humanizado de altíssima velocidade.
          </p>
        </div>

        {/* Benefits Grid */}
        <div id="vantagens-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vantagens.map((item, idx) => {
            const IconComponent = item.icon;
            
            return (
              <div
                key={idx}
                className="group relative rounded-3xl bg-slate-900/60 border border-white/5 p-8 shadow-xl transition-all duration-300 hover:scale-102 hover:border-[#00D4FF]/25 hover:bg-slate-900"
              >
                {/* Subtle top indicator glow line */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#005BFF] to-[#00D4FF] opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl" />

                {/* Card Icon - Circular disk holding matching color icon */}
                <div className={`p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-6 text-white bg-slate-950 border border-white/10 shrink-0 group-hover:bg-gradient-to-r group-hover:from-[#005BFF] group-hover:to-[#00D4FF] transition-all duration-300 shadow-inner`}>
                  <IconComponent size={24} className="stroke-[2.2]" />
                </div>

                {/* Content */}
                <h3 className="font-display font-black text-lg text-white mb-3 tracking-tight group-hover:text-[#00D4FF] transition-colors uppercase">
                  {item.titulo}
                </h3>
                
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold">
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
