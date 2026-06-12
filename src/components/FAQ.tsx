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
      pergunta: 'Como consultar disponibilidade para minha rua?',
      resposta: 'É muito simples! Basta preencher o nosso formulário de "Consulta de Cobertura" informando seu CEP e endereço. Nossa equipe comercial fará uma análise imediata nos mapas de infraestrutura e entrará em contato pelo seu WhatsApp para confirmar a viabilidade disponível para você.'
    },
    {
      pergunta: 'Os planos possuem fidelidade contratual?',
      resposta: 'Nossos planos padrão possuem fidelidade recomendada de 12 meses, o que nos permite garantir taxa de instalação totalmente gratuita na maioria das regiões. Caso prefira planos sem fidelidade, fale com nossa equipe comercial no WhatsApp para condições especiais.'
    },
    {
      pergunta: 'O roteador Wi-Fi está incluso no plano?',
      resposta: 'Sim, totalmente incluso e em regime de comodato (sem custo de aluguel). Instalamos roteadores Gigabit modernos Dual Band de excelente alcance, que gerenciam automaticamente as redes 2.4Ghz e 5.0Ghz para que seus celulares, TVs e notebooks naveguem sempre na melhor frequência.'
    },
    {
      pergunta: 'Como funciona todo o processo de instalação?',
      resposta: 'Após aprovação da sua solicitação pelo WhatsApp, agendamos o melhor horário para você. Nossos instaladores passarão o cabo de fibra óptica de alta resistência do poste até o interior de sua residência ou empresa, instalarão e configurarão o roteador, e farão os testes de velocidade na sua frente para garantir a entrega de 100% da banda contratada.'
    },
    {
      pergunta: 'Posso contratar a internet diretamente pelo WhatsApp?',
      resposta: 'Com certeza! Praticamente todo o nosso atendimento e contratação pode ser feito direto pelo WhatsApp de forma humana e sem burocracias. Basta clicar em "Falar no WhatsApp" ou selecionar o plano de sua preferência para dar início.'
    },
    {
      pergunta: 'Como funciona o suporte técnico caso eu precise?',
      resposta: 'Oferecemos suporte técnico altamente humanizado e focado em soluções ágeis. Você fala com nossa equipe de suporte no WhatsApp ou telefone. Resolvemos a grande maioria dos casos de forma remota em poucos minutos, e se for necessária uma visita técnica, agendamos com extrema rapidez.'
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 bg-[#070B19]">
      <div className="absolute top-10 right-10 w-[250px] h-[250px] bg-brand-purple/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-brand-purple/10 border border-brand-purple/30 px-3 py-1 rounded-full text-brand-bright-blue font-mono text-xs font-semibold uppercase mb-4">
            <HelpCircle size={12} />
            <span>Perguntas Frequentes</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mb-4">
            Dúvidas Frequentes sobre a GIGANET
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Encontre respostas rápidas para as principais dúvidas sobre nossos serviços de fibra óptica, roteador, instalação e contratação.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-[#0d142c] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none hover:bg-slate-800/20 group"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-200 group-hover:text-white transition-colors pr-4">
                    {faq.pergunta}
                  </span>
                  <span className="p-1.5 rounded-lg bg-[#070B19] text-brand-bright-blue shrink-0">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>

                {/* Answer panel */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] border-t border-slate-850 opacity-100 p-5 sm:p-6 pb-6' : 'max-h-0 opacity-0 pointer-events-none overflow-hidden'
                  }`}
                >
                  <p className="text-slate-350 text-sm leading-relaxed text-slate-300">
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
