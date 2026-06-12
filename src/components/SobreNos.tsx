import { Heart, Target, Sparkles, Server } from 'lucide-react';
import { SiteConfig } from '../types';

interface SobreNosProps {
  config: SiteConfig;
}

export default function SobreNos({ config }: SobreNosProps) {
  return (
    <section 
      id="sobrenos" 
      className="relative py-28 bg-[#FFFFFF] lg:bg-[linear-gradient(to_right,#FFFFFF_50%,#F3F8FF_50%)] overflow-hidden text-slate-800 border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Dual column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Visual presentation card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 p-1.5 bg-white shadow-xl">
              <img
                src={config.sobre_imagem_url || "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"}
                alt={`Equipe Técnica ${config.nome_empresa} Conectando Clientes`}
                referrerPolicy="no-referrer"
                className="rounded-[2.2rem] w-full object-cover aspect-[4/3] brightness-95 shadow-sm"
              />
              
              {/* Floating overlay badge */}
              <div className="absolute bottom-6 right-6 bg-[#0A1F44] border border-white/10 rounded-2xl p-4.5 shadow-2xl max-w-[245px] backdrop-blur-md text-white">
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-white/10 text-[#00AEEF] border border-white/15">
                    <Server size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black tracking-widest text-[#00AEEF] block uppercase leading-none mb-1">INFRAESTRUTURA</span>
                    <span className="text-xs font-bold text-white leading-tight block">Rede Própria & Fibra</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission with key metrics */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full text-[#0057FF] font-black text-xs uppercase self-start tracking-widest">
              <Heart size={12} className="text-[#0057FF] fill-current" />
              <span>{config.sobre_titulo_tag || 'Sobre Nós'}</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl text-slate-900 tracking-tighter leading-none uppercase">
              {config.sobre_titulo ? (
                <span className="whitespace-pre-line">{config.sobre_titulo}</span>
              ) : (
                <>
                  CONECTANDO PESSOAS AO QUE <br />
                  <span className="text-[#0057FF] font-extrabold bg-gradient-to-r from-[#0057FF] to-[#00AEEF] bg-clip-text text-transparent">
                    REALMENTE IMPORTA
                  </span>
                </>
              )}
            </h2>

            <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-bold">
              {config.sobre_destaque || `A ${config.nome_empresa} nasceu para entregar internet de qualidade real, estabilidade extrema e atendimento próximo. Nosso compromisso inabalável é conectar famílias e empresas com tecnologia de ponta e suporte eficiente.`}
            </p>

            <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-semibold">
              {config.sobre_descricao || 'Trabalhamos incansavelmente para que nossos clientes tenham uma experiência de navegação livre de travamentos ou de atendimentos comerciais demorados. Acreditamos que a conectividade premium deve vir acompanhada por relações de total respeito e rapidez. Por isso, investimos em redes robustas e preparamos equipes capacitadas prontas para te responder imediatamente.'}
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              <div className="p-6 rounded-2xl bg-white border border-slate-150 flex items-start space-x-4 shadow-sm hover:shadow-md transition-all hover:border-[#0057FF]">
                <div className="p-3 rounded-lg bg-blue-50 text-[#0057FF] border border-blue-100 shrink-0">
                  <Target size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                    {config.sobre_proposito_titulo || 'Nosso Propósito'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-semibold">
                    {config.sobre_proposito_desc || 'Garantir estabilidade real que potencialize o crescimento pessoal e digital de cada usuário.'}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-150 flex items-start space-x-4 shadow-sm hover:shadow-md transition-all hover:border-[#0057FF]">
                <div className="p-3 rounded-lg bg-blue-50 text-[#0057FF] border border-blue-100 shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                    {config.sobre_valor_titulo || 'Principal Valor'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-semibold">
                    {config.sobre_valor_desc || 'Conexão 100% fibra de ponta a ponta construída sobre transparência, clareza e respeito absoluto aos prazos.'}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
