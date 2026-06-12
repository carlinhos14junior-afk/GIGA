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
      plano: 'GIGATEL GIGA BLACK',
      texto: 'O ping nos jogos online caiu drasticamente! Consigo fazer lives e downloads de gigabytes terminando em poucos minutos, sem afetar o resto dos dispositivos da casa. Recomendo a Gigatel de olhos fechados!',
      estrelas: 5,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
    },
    {
      nome: 'Mariana Silva',
      cargo: 'Advogada & Mãe de Dois Filhos',
      plano: 'GIGATEL GIGA BLACK (1 Giga)',
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
    <section className="relative py-28 bg-[#020617] overflow-hidden text-white border-b border-white/5">
      {/* Background vector highlights */}
      <div className="absolute top-1/2 left-[5%] -translate-y-1/2 w-64 h-64 bg-[#005BFF]/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-64 h-64 bg-[#00D4FF]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#005BFF]/10 border border-[#005BFF]/30 px-4 py-1.5 rounded-full text-[#00D4FF] font-black text-xs uppercase mb-4 tracking-widest">
            <span>Avaliações dos Clientes</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tighter mb-4 uppercase leading-none">
            RECOMENDADO POR <br />
            <span className="bg-gradient-to-r from-[#005BFF] via-[#00AEEF] to-[#00D4FF] bg-clip-text text-transparent font-extrabold">
              QUEM USA DE VERDADE
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
            Veja a opinião de clientes reais que elevaram sua internet ao padrão máximo de ultravelocidade.
          </p>
        </div>

        {/* Carousel Slider Stage */}
        <div className="relative max-w-3xl mx-auto px-4">
          
          {/* Main Card */}
          <div className="relative rounded-[2rem] bg-slate-900/60 border border-white/10 p-8 sm:p-12 shadow-2xl min-h-[340px] flex flex-col justify-between group overflow-hidden">
            {/* Elegant Quote Emblem */}
            <span className="absolute top-6 right-8 text-[#00D4FF]/5 pointer-events-none group-hover:scale-105 transition-transform">
              <Quote size={80} className="stroke-current fill-current" />
            </span>

            {/* Subtle top indicator glow line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#005BFF] to-[#00D4FF]" />

            {/* Testimonial Core Body */}
            <div className="animate-fade-in" key={activeIndex}>
              
              {/* Ratings Segment */}
              <div className="flex space-x-1 mb-5">
                {[...Array(current.estrelas)].map((_, i) => (
                  <Star key={i} size={15} className="text-[#00D4FF] fill-[#00D4FF]" />
                ))}
              </div>

              {/* Text */}
              <blockquote className="text-slate-300 text-base sm:text-lg italic leading-relaxed font-semibold mb-8">
                "{current.texto}"
              </blockquote>

              {/* Author Footer */}
              <div className="flex items-center space-x-4 border-t border-white/5 pt-6">
                <img
                  src={current.avatar}
                  alt={current.nome}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-white/10 shadow-md shrink-0 bg-slate-950"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-white leading-none">{current.nome}</span>
                  <span className="text-[11px] text-slate-400 font-medium mt-1.5 leading-none">{current.cargo}</span>
                  <span className="text-[9px] font-black text-[#00D4FF] uppercase tracking-widest mt-2 px-2 py-0.5 rounded bg-[#00D4FF]/10 border border-[#00D4FF]/20 self-start">
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
              className="p-3.5 rounded-full bg-slate-950 border border-white/10 hover:border-[#00D4FF]/30 shadow-lg text-slate-300 hover:text-[#00D4FF] transition-all cursor-pointer hover:scale-105 active:scale-95 bg-slate-900"
            >
              <ChevronLeft size={18} className="stroke-[2.5]" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-3 sm:-right-6 -translate-y-1/2 flex">
            <button
              onClick={handleNext}
              className="p-3.5 rounded-full bg-slate-950 border border-white/10 hover:border-[#00D4FF]/30 shadow-lg text-slate-300 hover:text-[#00D4FF] transition-all cursor-pointer hover:scale-105 active:scale-95 bg-slate-900"
            >
              <ChevronRight size={18} className="stroke-[2.5]" />
            </button>
          </div>

        </div>

        {/* Carousel Jump Dots Indicators */}
        <div className="flex justify-center items-center space-x-2.5 mt-8 select-none">
          {avaliacoes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? 'w-8 bg-[#00D4FF]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
