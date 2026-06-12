import { Heart, Target, Sparkles, Server } from 'lucide-react';
import { SiteConfig } from '../types';

interface SobreNosProps {
  config: SiteConfig;
}

export default function SobreNos({ config }: SobreNosProps) {
  return (
    <section id="sobre" className="relative py-24 bg-[#070B19] overflow-hidden">
      {/* Decorative vector */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-purple/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dual column bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual presentation card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-850 p-1 bg-gradient-to-tr from-brand-purple/30 to-brand-bright-blue/20">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
                alt="Equipe Técnica Giganet Conectando Clientes"
                referrerPolicy="no-referrer"
                className="rounded-[22px] w-full object-cover aspect-[4/3] brightness-90 shadow-2xl"
              />
              
              {/* Overlay telemetry badge */}
              <div className="absolute -bottom-6 -right-4 bg-[#101835] border border-slate-700/80 rounded-2xl p-4 shadow-xl max-w-[240px]">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-brand-purple text-brand-neon">
                    <Server size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-slate-400 block font-bold">INFRAESTRUTURA</span>
                    <span className="text-sm font-bold text-white">Backbone Redundante</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission with key metrics */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="inline-flex items-center space-x-1.5 bg-brand-purple/10 border border-brand-purple/30 px-3 py-1 rounded-full text-brand-bright-blue font-mono text-xs font-semibold uppercase self-start">
              <Heart size={12} className="text-rose-400 fill-rose-400/20" />
              <span>Nossa História</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Conectando o que realmente importa para você
            </h2>

            {/* MANDATORY TEXT */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              A {config.nome_empresa} nasceu para entregar internet de qualidade, estabilidade e atendimento próximo. Nosso compromisso é conectar famílias e empresas com tecnologia de ponta e suporte eficiente.
            </p>

            <p className="text-slate-400 text-sm leading-relaxed">
              Trabalhamos incansavelmente para que nossos clientes tenham uma experiência livre de travamentos ou de atendimentos frios. Acreditamos que a conectividade premium deve vir acompanhada de relações de respeito e suporte ágil. Por isso, construímos uma rede robusta e preparamos equipes humanizadas prontas para servir você.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-850 flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                  <Target size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Nosso Propósito</h4>
                  <p className="text-xs text-slate-400 mt-1">Garantir estabilidade que permite o seu crescimento digital.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-850 flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Nosso Valor Principal</h4>
                  <p className="text-xs text-slate-400 mt-1">Conexão verdadeira de fibra de ponta a ponta e respeito absoluto.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
