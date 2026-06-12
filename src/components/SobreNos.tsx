import { Heart, Target, Sparkles, Server } from 'lucide-react';
import { SiteConfig } from '../types';

interface SobreNosProps {
  config: SiteConfig;
}

export default function SobreNos({ config }: SobreNosProps) {
  return (
    <section id="sobre" className="relative py-28 bg-white overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dual column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Visual presentation card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 p-1 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
                alt="Equipe Técnica Giganet Conectando Clientes"
                referrerPolicy="no-referrer"
                className="rounded-[22px] w-full object-cover aspect-[4/3] brightness-95 shadow-md animate-fade-in"
              />
              
              {/* Floating overlay badge */}
              <div className="absolute -bottom-6 -right-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-lg max-w-[240px]">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600">
                    <Server size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 block uppercase leading-none mb-1">INFRAESTRUTURA</span>
                    <span className="text-sm font-bold text-slate-800 leading-tight block">Rede Própria & Fibra</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission with key metrics */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="inline-flex items-center space-x-1.5 bg-sky-50 border border-sky-100 px-3 py-1.5 rounded-full text-sky-700 font-bold text-xs uppercase self-start tracking-wider">
              <Heart size={12} className="text-rose-500 fill-current" />
              <span>Nossa História</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Conectando pessoas ao que realmente importa
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed font-normal">
              A {config.nome_empresa} nasceu para entregar internet de qualidade real, estabilidade extrema e atendimento próximo. Nosso compromisso inabalável é conectar famílias e empresas com tecnologia de ponta e suporte eficiente.
            </p>

            <p className="text-slate-500 text-sm leading-relaxed">
              Trabalhamos incansavelmente para que nossos clientes tenham uma experiência de navegação livre de travamentos ou de atendimentos frios. Acreditamos que a conectividade premium deve vir acompanhada por relações de respeito e suporte comercial ágil. Por isso, investimos em servidores robustos e preparamos equipes humanizadas prontas para servir você.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-205 flex items-start space-x-3.5">
                <div className="p-2 rounded-xl bg-sky-50 text-sky-600 shrink-0">
                  <Target size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Nosso Propósito</h4>
                  <p className="text-xs text-slate-500 mt-1">Garantir estabilidade real que potencialize o crescimento pessoal e digital de cada usuário.</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-205 flex items-start space-x-3.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Nosso Principal Valor</h4>
                  <p className="text-xs text-slate-500 mt-1">Conexão 100% fibra de ponta a ponta construída sobre ética, clareza e respeito absoluto aos prazos.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
