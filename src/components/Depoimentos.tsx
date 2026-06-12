import { Star, Quote, MessageSquare } from 'lucide-react';

export default function Depoimentos() {
  const avaliacoes = [
    {
      nome: 'Rafael Santos',
      cargo: 'Gamer & Streamer',
      plano: 'Giganet 800 Mega',
      texto: 'O ping no Valorant foi de 45ms para 4ms cravados! Assisto lives, transmito minhas partidas em Full HD e ninguém na casa reclama de lentidão. A melhor internet que já tivemos aqui na região SP.',
      estrelas: 5,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
    },
    {
      nome: 'Mariana Azevedo',
      cargo: 'Designer Freelancer (Home Office)',
      plano: 'Giganet 500 Mega',
      texto: 'Trabalho enviando arquivos pesados de vídeo todos os dias. O upload da Giganet é sensacional, super rápido. E o suporte técnico é incrível: precisei deles no sábado à noite e me atenderam em 3 minutos e resolveram pelo WhatsApp.',
      estrelas: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
    },
    {
      nome: 'Gustavo Barbosa',
      cargo: 'Proprietário da Padaria Central',
      plano: 'Link Corporativo Giganet',
      texto: 'Contratei para os caixas da padaria e para disponibilizar Wi-Fi grátis aos clientes. Nunca mais tivemos problema de maquininha perdendo conexão ou clientes reclamando. O atendimento é extremamente profissional.',
      estrelas: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    }
  ];

  return (
    <section className="relative py-24 bg-[#0d142c] overflow-hidden">
      {/* Visual neon light */}
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-brand-purple/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-brand-purple/10 border border-brand-purple/30 px-3 py-1 rounded-full text-brand-bright-blue font-mono text-xs font-semibold uppercase mb-4">
            <MessageSquare size={12} />
            <span>Depoimentos</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-4 animate-fade-in">
            Quem usa a GIGANET, recomenda de verdade
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Veja o que dizem as pessoas e empresas que mudaram para a nossa internet fibra óptica e elevaram o patamar de suas conexões.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div id="depoimentos-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {avaliacoes.map((item, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-3xl bg-[#101835] border border-slate-800 p-6 sm:p-8 hover:border-slate-700 hover:shadow-xl transition-all duration-300"
            >
              {/* Quote marks background */}
              <span className="absolute top-6 right-6 text-slate-800/60 pointer-events-none">
                <Quote size={40} className="stroke-current" />
              </span>

              <div className="relative z-10">
                {/* Visual stars feedback */}
                <div className="flex space-x-1 mb-5">
                  {[...Array(item.estrelas)].map((_, i) => (
                    <Star key={i} size={14} className="text-brand-neon fill-brand-neon" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-slate-300 text-sm italic leading-relaxed mb-6">
                  "{item.texto}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center space-x-4 border-t border-slate-800 pt-5 mt-4">
                <img
                  src={item.avatar}
                  alt={item.nome}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-brand-purple/40"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-white">{item.nome}</span>
                  <span className="text-[10px] text-slate-450 text-slate-400 block">{item.cargo}</span>
                  <span className="text-[10px] font-mono text-brand-bright-blue mt-0.5">{item.plano}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
