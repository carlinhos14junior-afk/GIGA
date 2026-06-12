import { Heart, Target, Sparkles, Server } from 'lucide-react';
import { SiteConfig } from '../types';

interface SobreNosProps {
  config: SiteConfig;
}

export default function SobreNos({ config }: SobreNosProps) {
  return (
    <section 
      id="sobrenos" 
      className="relative py-28 bg-slate-50 overflow-hidden text-slate-800 border-b border-slate-150"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Dual column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Visual presentation card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 p-1.5 bg-white shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
                alt="Equipe Técnica GIGATEL FIBER Conectando Clientes"
                referrerPolicy="no-referrer"
                className="rounded-[2.2rem] w-full object-cover aspect-[4/3] brightness-95 shadow-sm"
              />
              
              {/* Floating overlay badge */}
              <div className="absolute bottom-6 right-6 bg-white/95 border border-slate-150 rounded-2xl p-4.5 shadow-lg max-w-[245px] backdrop-blur-md">
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-[#005BFF] border border-blue-100">
                    <Server size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black tracking-widest text-[#005BFF] block uppercase leading-none mb-1">INFRAESTRUTURA</span>
                    <span className="text-xs font-bold text-slate-800 leading-tight block">Rede Própria & Fibra</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission with key metrics */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full text-[#005BFF] font-black text-xs uppercase self-start tracking-widest">
              <Heart size={12} className="text-[#005BFF] fill-current" />
              <span>Sobre Nós</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl text-slate-900 tracking-tighter leading-none uppercase">
              CONECTANDO PESSOAS AO QUE <br />
              <span className="text-[#005BFF] font-extrabold bg-gradient-to-r from-[#005BFF] to-[#0188FF] bg-clip-text text-transparent">
                REALMENTE IMPORTA
              </span>
            </h2>

            <p className="text-slate-650 text-base sm:text-lg leading-relaxed font-bold">
              A {config.nome_empresa} nasceu para entregar internet de qualidade real, estabilidade extrema e atendimento próximo. Nosso compromisso inabalável é conectar famílias e empresas com tecnologia de ponta e suporte eficiente.
            </p>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Trabalhamos incansavelmente para que nossos clientes tenham uma experiência de navegação livre de travamentos ou de atendimentos comerciais demorados. Acreditamos que a conectividade premium deve vir acompanhada por relações de total respeito e rapidez. Por isso, investimos em redes robustas e preparamos equipes capacitadas prontas para te responder imediatamente.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              <div className="p-6 rounded-2xl bg-white border border-slate-150 flex items-start space-x-4 shadow-sm hover:shadow-md transition-all">
                <div className="p-3 rounded-lg bg-blue-50 text-[#005BFF] border border-blue-100 shrink-0">
                  <Target size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Nosso Propósito</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Garantir estabilidade real que potencialize o crescimento pessoal e digital de cada usuário.</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-150 flex items-start space-x-4 shadow-sm hover:shadow-md transition-all">
                <div className="p-3 rounded-lg bg-blue-50 text-[#005BFF] border border-blue-100 shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Principal Valor</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Conexão 100% fibra de ponta a ponta construída sobre transparência, clareza e respeito absoluto aos prazos.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
