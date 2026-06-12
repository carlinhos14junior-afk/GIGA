import { Heart, Target, Sparkles, Server } from 'lucide-react';
import { SiteConfig } from '../types';

interface SobreNosProps {
  config: SiteConfig;
}

export default function SobreNos({ config }: SobreNosProps) {
  return (
    <section 
      id="sobrenos" 
      className="relative py-28 bg-[#020617] overflow-hidden text-white border-b border-white/5"
    >
      <div className="absolute top-1/2 right-[-10%] w-90 h-90 rounded-full bg-[#005BFF]/10 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Dual column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Visual presentation card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 p-1.5 bg-gradient-to-tr from-[#005BFF] to-[#00D4FF] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
                alt="Equipe Técnica GIGATEL FIBER Conectando Clientes"
                referrerPolicy="no-referrer"
                className="rounded-[2.2rem] w-full object-cover aspect-[4/3] brightness-90 shadow-md"
              />
              
              {/* Floating overlay badge */}
              <div className="absolute bottom-6 right-6 bg-slate-900/90 border border-white/15 rounded-2xl p-4.5 shadow-xl max-w-[245px] backdrop-blur-md">
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-[#005BFF]/10 text-[#00D4FF] border border-[#00D4FF]/20">
                    <Server size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black tracking-widest text-[#00D4FF] block uppercase leading-none mb-1">INFRAESTRUTURA</span>
                    <span className="text-xs font-bold text-white leading-tight block">Rede Própria & Fibra</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission with key metrics */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#005BFF]/10 border border-[#005BFF]/30 px-4 py-1.5 rounded-full text-[#00D4FF] font-black text-xs uppercase self-start tracking-widest">
              <Heart size={12} className="text-[#00D4FF] fill-current animate-pulse" />
              <span>Sobre Nós</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tighter leading-none uppercase">
              CONECTANDO PESSOAS AO QUE <br />
              <span className="bg-gradient-to-r from-[#005BFF] via-[#00AEEF] to-[#00D4FF] bg-clip-text text-transparent font-extrabold">
                REALMENTE IMPORTA
              </span>
            </h2>

            <p className="text-slate-350 text-base sm:text-lg leading-relaxed font-semibold">
              A {config.nome_empresa} nasceu para entregar internet de qualidade real, estabilidade extrema e atendimento próximo. Nosso compromisso inabalável é conectar famílias e empresas com tecnologia de ponta e suporte eficiente.
            </p>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Trabalhamos incansavelmente para que nossos clientes tenham uma experiência de navegação livre de travamentos ou de atendimentos comerciais demorados. Acreditamos que a conectividade premium deve vir acompanhada por relações de total respeito e rapidez. Por isso, investimos em redes robustas e preparamos equipes capacitadas prontas para te responder imediatamente.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              <div className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 flex items-start space-x-4 transition-all">
                <div className="p-3 rounded-lg bg-[#005BFF]/10 text-[#00D4FF] border border-[#005BFF]/20 shrink-0">
                  <Target size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight">Nosso Propósito</h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Garantir estabilidade real que potencialize o crescimento pessoal e digital de cada usuário.</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 flex items-start space-x-4 transition-all">
                <div className="p-3 rounded-lg bg-[#00AEEF]/10 text-[#00D4FF] border border-[#00AEEF]/20 shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight">Principal Valor</h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Conexão 100% fibra de ponta a ponta construída sobre transparência, clareza e respeito absoluto aos prazos.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
