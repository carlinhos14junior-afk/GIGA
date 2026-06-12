import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  pergunta: string;
  resposta: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      pergunta: 'Como consultar a disponibilidade de internet para minha rua?',
      resposta: 'É muito simples! Basta preencher o nosso formulário na seção "Cobertura" informando seu CEP e endereço. Nossa equipe comercial fará uma auditoria imediata nos mapas de rede e entrará em contato pelo seu WhatsApp para confirmar a viabilidade disponível na sua região.'
    },
    {
      pergunta: 'Os planos de fibra óptica possuem fidelidade contratual?',
      resposta: 'Nossos planos residenciais padrão possuem fidelidade recomendada de 12 meses, o que nos permite garantir taxa de instalação totalmente gratuita na maioria das regiões. Caso prefira planos sem fidelidade, faça uma consulta com nossa equipe comercial no WhatsApp para condições regulamentares específicas.'
    },
    {
      pergunta: 'O roteador Wi-Fi está incluso no valor do plano?',
      resposta: 'Sim, totalmente incluso e em regime de comodato (sem custo de locação). Instalamos roteadores Gigabit modernos Dual Band de excelente alcance, que gerenciam de modo inteligente as conexões de 2.4Ghz e 5.0Ghz para manter o melhor sinal em todos os seus dispositivos.'
    },
    {
      pergunta: 'Como funciona o processo de instalação em meu endereço?',
      resposta: 'Após aprovação da sua solicitação, agendamos o melhor dia e horário para você. Nossos técnicos certificados trazem o cabo de fibra óptica do poste até o interior de sua residência ou empresa, realizam a configuração do roteador e efetuam testes práticos na sua frente para garantir a qualidade impecável da banda contratada.'
    },
    {
      pergunta: 'Posso solicitar e agendar a instalação direto pelo WhatsApp?',
      resposta: 'Com certeza! Praticamente todo o nosso fluxo de atendimento e expedição de contratos pode ser realizado direto pelo WhatsApp. Basta clicar no botão de WhatsApp do site para dar início imediato ao atendimento com um consultor.'
    },
    {
      pergunta: 'Como funciona o suporte técnico em caso de imprevistos?',
      resposta: 'Oferecemos suporte técnico focado em soluções ágeis. Você fala com nossa equipe de especialistas de prontidão via WhatsApp ou telefone. Sanamos a maioria das oscilações de forma remota em instantes, e se for necessária uma inspeção física, agendamos visitas técnicas com extrema agilidade.'
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-28 bg-slate-50 border-b border-slate-150 overflow-hidden text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full text-[#005BFF] font-black text-xs uppercase mb-4 tracking-widest">
            <HelpCircle size={14} className="text-[#005BFF]" />
            <span>Perguntas Frequentes</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl text-slate-900 tracking-tighter leading-none uppercase">
            DÚVIDAS FREQUENTES SOBRE A <br />
            <span className="text-[#005BFF] font-extrabold bg-gradient-to-r from-[#005BFF] to-[#0188FF] bg-clip-text text-transparent">
              GIGATEL FIBRA
            </span>
          </h2>

          <p className="text-slate-650 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed mt-4">
            Encontre respostas diretas e descomplicadas para as dúvidas mais comuns sobre faturamento, roteadores, Wi-Fi e instalação de fibra na sua residência ou empresa.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <div
                key={idx}
                className="rounded-2xl border border-blue-100 bg-white overflow-hidden transition-all duration-300 hover:border-[#005BFF]/30 shadow-sm"
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none hover:bg-slate-50/50 transition-colors group"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-800 group-hover:text-[#005BFF] transition-colors pr-4">
                    {faq.pergunta}
                  </span>
                  <span className="p-2 rounded-lg bg-blue-50 border border-blue-100/50 text-[#005BFF] shrink-0 transition-colors">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>

                {/* Answer panel */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] border-t border-slate-100 opacity-100 p-5 sm:p-6 pb-6 bg-slate-50/30' : 'max-h-0 opacity-0 pointer-events-none overflow-hidden'
                  }`}
                >
                  <p className="text-slate-600 text-sm leading-relaxed font-semibold">
                    {faq.resposta}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
