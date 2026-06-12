import { Star, Quote, MessageSquare } from 'lucide-react';

export default function Depoimentos() {
  const avaliacoes = [
    {
      nome: 'Rafael Santos',
      cargo: 'Gamer & Produtor de Conteúdo',
      plano: 'Giganet 800 Mega',
      texto: 'O ping nos jogos online caiu drasticamente! Assisto transmissões, faço downloads pesados e a internet continua incrivelmente estável. Sem sombras de dúvidas, é o melhor provedor de fibra de toda a região.',
      estrelas: 5,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
    },
    {
      nome: 'Mariana Azevedo',
      cargo: 'Designer Freelancer (Home Office)',
      plano: 'Giganet 500 Mega',
      texto: 'Trabalho enviando e baixando arquivos de vídeo enormes todos os dias. O upload simétrico da Giganet é sensacional, poupa muito do meu tempo. De quebra, o atendimento é super prestativo por WhatsApp.',
      estrelas: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
    },
    {
      nome: 'Gustavo Barbosa',
      cargo: 'Proprietário de Comércio Comercial',
      plano: 'Link Corporativo Giganet',
      texto: 'Contratei para os terminais de pagamento da padaria e para prover conexões de Wi-Fi para os clientes. Nunca mais sofremos com cartões saindo do ar ou oscilações desagradáveis. Aprovadíssimo!',
      estrelas: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    }
  ];

  return (
    <section className="relative py-28 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-1.5 bg-sky-50 border border-sky-100 px-3 py-1.5 rounded-full text-sky-700 font-bold text-xs uppercase mb-4 tracking-wider">
            <MessageSquare size={12} className="text-sky-600" />
            <span>Depoimentos</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4 leading-tight">
            Quem utiliza a Giganet Fibra, recomenda!
          </h2>

          <p className="text-slate-600 text-sm sm:text-base">
            Veja a opinião sincera de clientes residenciais e corporativos que elevaram a outro patamar a sua qualidade de conexão diária.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div id="depoimentos-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
          {avaliacoes.map((item, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200/85 p-8 shadow-sm hover:shadow-md hover:border-slate-350 transition-all duration-200"
            >
              {/* Quote icon background */}
              <span className="absolute top-6 right-6 text-slate-100 pointer-events-none">
                <Quote size={40} className="stroke-current" />
              </span>

              <div className="relative z-10 w-full">
                {/* Visual stars feedback - green stars! */}
                <div className="flex space-x-1 mb-5">
                  {[...Array(item.estrelas)].map((_, i) => (
                    <Star key={i} size={14} className="text-emerald-500 fill-emerald-500" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-slate-600 text-sm italic leading-relaxed mb-6">
                  "{item.texto}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center space-x-4 border-t border-slate-100 pt-6 mt-4">
                <img
                  src={item.avatar}
                  alt={item.nome}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-slate-900 leading-none">{item.nome}</span>
                  <span className="text-[11px] text-slate-500 mt-1 leading-none">{item.cargo}</span>
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider mt-1.5 leading-none bg-sky-50 px-2 py-0.5 rounded自-lg self-start">
                    {item.plano}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
