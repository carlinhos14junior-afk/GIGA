import { Zap, Activity, Shield, Headphones, Cpu, CheckCircle } from 'lucide-react';
import { SiteConfig } from '../types';

interface VantagensProps {
  config: SiteConfig;
}

const icons = [Zap, CheckCircle, Shield, Activity, Headphones, Cpu];

export default function Vantagens({ config }: VantagensProps) {
  let vantagens: { titulo: string; descricao: string }[] = [];
  try {
    if (config.vantagens_lista_json) {
      vantagens = JSON.parse(config.vantagens_lista_json);
    }
  } catch (e) {
    console.error("Error parsing vantagens JSON", e);
  }

  if (!vantagens || vantagens.length === 0) {
    vantagens = [
      {
        titulo: 'Fibra Óptica de Ponta',
        descricao: 'Conexão 100% fibra óptica FTTH diretamente dentro do seu roteador, minimizando perdas de sinal e atrasos.',
      },
      {
        titulo: 'Instalação Rápida',
        descricao: 'Nossa equipe técnica qualificada realiza a implantação de forma ágil e segura sem complicações na sua casa.',
      },
      {
        titulo: 'Suporte Especializado',
        descricao: 'Central técnica qualificada com analistas prontos para monitorar e manter sua estabilidade 24 horas por dia.',
      },
      {
        titulo: 'Alta Estabilidade',
        descricao: 'Navegue sem oscilações climáticas ou gargalos de horário de pico graças à nossa rota de alta capacidade.',
      },
      {
        titulo: 'Atendimento Humanizado',
        descricao: 'Esqueça robôs chatos. Fale direto com profissionais paulistanos focados em resolver o seu problema em minutos.',
      },
      {
        titulo: 'Tecnologia de Ponta',
        descricao: 'Equipamentos de rede de última geração e roteadores dual band inteligentes inclusos na sua assinatura.',
      },
    ];
  }

  return (
    <section 
      id="vantagens" 
      className="relative py-28 bg-[#F3F8FF] overflow-hidden text-slate-800 border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full text-[#0057FF] font-black text-xs uppercase mb-4 tracking-widest">
            <span>Diferenciais Premium</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tighter mb-6 leading-none uppercase">
            {config.vantagens_titulo ? (
              <span className="whitespace-pre-line">{config.vantagens_titulo}</span>
            ) : (
              <>
                POR QUE ESCOLHER A <br />
                <span className="text-[#0057FF] font-extrabold bg-gradient-to-r from-[#0057FF] to-[#00AEEF] bg-clip-text text-transparent">
                  {config.nome_empresa}
                </span>?
              </>
            )}
          </h2>
 
          <p className="text-slate-650 text-sm sm:text-base font-semibold max-w-2xl mx-auto leading-relaxed">
            {config.vantagens_subtitulo || 'Unimos excelente infraestrutura tecnológica de fibra óptica com pós-venda humanizado de altíssima velocidade.'}
          </p>
        </div>
 
        {/* Benefits Grid */}
        <div id="vantagens-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vantagens.map((item, idx) => {
            const IconComponent = icons[idx % icons.length];
            
            return (
              <div
                key={idx}
                className="group relative rounded-3xl bg-white border border-blue-100 p-8 shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-[#0057FF] hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Card Icon */}
                <div className="p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-6 text-[#0057FF] bg-blue-50 border border-blue-100/50 shrink-0 group-hover:bg-[#0057FF] group-hover:text-white transition-all duration-300 shadow-sm">
                  <IconComponent size={24} className="stroke-[2.2]" />
                </div>
 
                {/* Content */}
                <h3 className="font-display font-black text-lg text-slate-900 mb-3 tracking-tight group-hover:text-[#0057FF] transition-colors uppercase">
                  {item.titulo}
                </h3>
                
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
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
