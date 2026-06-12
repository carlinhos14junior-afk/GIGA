import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Depoimentos() {
  const [activeIndex, setActiveIndex] = useState(0);

  const avaliacoes = [
    {
      nome: 'Carla Mendes',
      cargo: 'Designer Freelancer (Home Office)',
      plano: 'GIGATEL 500 MEGA',
      texto: 'Estou chocada com a estabilidade! Trabalho em home office enviando arquivos pesados e participando de chamadas em vídeo. Tudo roda perfeitamente, sem nenhuma queda ou lentidão. O atendimento local no WhatsApp é nota 10!',
      estrelas: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
    },
    {
      nome: 'João Paulo Ramos',
      cargo: 'Gamer Competitivo & Streamer',
      plano: 'GIGATEL 800 MEGA (Ultra)',
      texto: 'O ping nos jogos online caiu drasticamente! Consigo fazer lives e downloads de gigabytes terminando em poucos minutos, sem afetar o resto dos dispositivos da casa. Recomendo a Gigatel de olhos fechados!',
      estrelas: 5,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
    },
    {
      nome: 'Mariana Silva',
      cargo: 'Advogada & Mãe de Dois Filhos',
      plano: 'GIGATEL 500 MEGA (Residencial)',
      texto: 'Finalmente um provedor que cumpre o que promete. Em casa, somos quatro pessoas conectadas simultaneamente. Assistimos filmes em 4K e jogamos ao mesmo tempo sem as irritantes telas de carregamento. Suporte nota mil!',
      estrelas: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
    }
  ];

  // Auto scroll/play setup
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? avaliacoes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === avaliacoes.length - 1 ? 0 : prev + 1));
  };

  const current = avaliacoes[activeIndex];

  return (
    <section className="relative py-20 bg-white border-b border-slate-205 overflow-hidden">
      {/* Background vector highlights */}
      <div className="absolute top-1/2 left-[5%] -translate-y-1/2 w-48 h-48 bg-[#0A2F8F]/5 rounded-full filter blur-xl pointer-events-none" />
      <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-48 h-48 bg-[#E30613]/5 rounded-full filter blur-xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0A2F8F] tracking-tighter mb-3 uppercase">
            QUEM UTILIZA A GIGATEL FIBER, <span className="text-[#E30613]">RECOMENDA</span>!
          </h2>

          <p className="text-slate-650 text-sm sm:text-base font-medium">
            Veja a opinião de clientes reais que elevaram sua internet residencial ou empresarial ao padrão FTTH de verdade.
          </p>
        </div>

        {/* Carousel Slider Stage */}
        <div className="relative max-w-3xl mx-auto px-4">
          
          {/* Main Card */}
          <div className="relative rounded-3xl bg-[#F4F6F9] border border-slate-200/90 p-8 sm:p-12 shadow-md hover:shadow-lg transition-all duration-300 min-h-[340px] flex flex-col justify-between">
            {/* Elegant Quote Emblem */}
            <span className="absolute top-6 right-8 text-brand-blue-royal/10 pointer-events-none">
              <Quote size={60} className="stroke-current fill-current" />
            </span>

            {/* Testimonial Core Body */}
            <div className="animate-fade-in" key={activeIndex}>
              
              {/* Ratings Segment */}
              <div className="flex space-x-1 mb-5">
                {[...Array(current.estrelas)].map((_, i) => (
                  <Star key={i} size={15} className="text-amber-500 fill-amber-500" />
                ))}
              </div>

              {/* Text */}
              <blockquote className="text-slate-700 text-sm sm:text-base italic leading-relaxed font-semibold mb-8">
                "{current.texto}"
              </blockquote>

              {/* Author Footer */}
              <div className="flex items-center space-x-4 border-t border-slate-200/50 pt-6">
                <img
                  src={current.avatar}
                  alt={current.nome}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md bg-white shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-slate-900 leading-none">{current.nome}</span>
                  <span className="text-[11px] text-slate-500 font-medium mt-1 leading-none">{current.cargo}</span>
                  <span className="text-[10px] font-black text-[#0A2F8F] uppercase tracking-wider mt-1.5 leading-none bg-blue-50 border border-blue-100/55 px-2.5 py-1 rounded-md self-start">
                    {current.plano}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Left/Right controls */}
          <div className="absolute top-1/2 -left-3 sm:-left-6 -translate-y-1/2 flex">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-full bg-white border border-slate-200 shadow hover:bg-slate-50 text-slate-805 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          <div className="absolute top-1/2 -right-3 sm:-right-6 -translate-y-1/2 flex">
            <button
              onClick={handleNext}
              className="p-3.5 rounded-full bg-white border border-slate-205 shadow hover:bg-slate-50 text-slate-805 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

        {/* Carousel Jump Dots Indicators */}
        <div className="flex justify-center items-center space-x-2.5 mt-8 select-none">
          {avaliacoes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? 'w-7 bg-[#E30613]' : 'w-2.5 bg-slate-350 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
