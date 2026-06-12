import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { SiteConfig } from '../types';

interface DepoimentoItem {
  nome: string;
  cargo: string;
  plano: string;
  texto: string;
  estrelas: number;
  avatar: string;
}

interface DepoimentosProps {
  config: SiteConfig;
}

export default function Depoimentos({ config }: DepoimentosProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  let avaliacoes: DepoimentoItem[] = [];
  
  try {
    if (config.depoimentos_lista_json) {
      avaliacoes = JSON.parse(config.depoimentos_lista_json);
    }
  } catch (e) {
    console.error("Error parsing Testimonials JSON:", e);
  }

  if (avaliacoes.length === 0) {
    avaliacoes = [
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
  }

  // Auto scroll/play setup
  useEffect(() => {
    if (avaliacoes.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex, avaliacoes.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? avaliacoes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === avaliacoes.length - 1 ? 0 : prev + 1));
  };

  const current = avaliacoes[activeIndex] || avaliacoes[0];

  if (!current) return null;

  return (
    <section className="relative py-28 bg-white overflow-hidden text-slate-800 border-b border-slate-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full text-[#005BFF] font-black text-xs uppercase mb-4 tracking-widest">
            <span>{config.depoimentos_titulo || 'Avaliações dos Clientes'}</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tighter mb-4 uppercase leading-none">
            {config.depoimentos_subtitulo ? (
              <span className="whitespace-pre-line">{config.depoimentos_subtitulo}</span>
            ) : (
              <>
                RECOMENDADO POR <br />
                <span className="text-[#005BFF] font-extrabold bg-gradient-to-r from-[#005BFF] to-[#0188FF] bg-clip-text text-transparent">
                  QUEM USA DE VERDADE
                </span>
              </>
            )}
          </h2>

          <p className="text-slate-650 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
            Veja a opinião de clientes reais que elevaram sua internet ao padrão máximo de ultravelocidade.
          </p>
        </div>

        {/* Carousel Slider Stage */}
        <div className="relative max-w-3xl mx-auto px-4">
          
          {/* Main Card */}
          <div className="relative rounded-[2rem] bg-white border border-blue-100 p-8 sm:p-12 shadow-md min-h-[340px] flex flex-col justify-between group overflow-hidden">
            {/* Elegant Quote Emblem */}
            <span className="absolute top-6 right-8 text-blue-105/5 pointer-events-none group-hover:scale-105 transition-transform opacity-10">
              <Quote size={80} className="stroke-current fill-current text-[#005BFF]" />
            </span>

            {/* Subtle top indicator line */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-[#005BFF]" />

            {/* Testimonial Core Body */}
            <div className="animate-fade-in" key={activeIndex}>
              
              {/* Ratings Segment */}
              <div className="flex space-x-1 mb-5">
                {[...Array(current.estrelas)].map((_, i) => (
                  <Star key={i} size={15} className="text-[#005BFF] fill-[#005BFF]" />
                ))}
              </div>

              {/* Text */}
              <blockquote className="text-slate-700 text-base sm:text-lg italic leading-relaxed font-bold mb-8">
                "{current.texto}"
              </blockquote>

              {/* Author Footer */}
              <div className="flex items-center space-x-4 border-t border-slate-100 pt-6">
                {current.avatar && (
                  <img
                    src={current.avatar}
                    alt={current.nome}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm shrink-0 bg-slate-50"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-slate-905 leading-none">{current.nome}</span>
                  <span className="text-[11px] text-slate-500 font-medium mt-1.5 leading-none">{current.cargo}</span>
                  <span className="text-[9px] font-black text-[#005BFF] uppercase tracking-widest mt-2 px-2 py-0.5 rounded bg-blue-50 border border-blue-100 self-start">
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
              className="p-3.5 rounded-full bg-white border border-slate-200 hover:border-blue-200 shadow-md text-slate-650 hover:text-[#005BFF] transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={18} className="stroke-[2.5]" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-3 sm:-right-6 -translate-y-1/2 flex">
            <button
              onClick={handleNext}
              className="p-3.5 rounded-full bg-white border border-slate-200 hover:border-blue-200 shadow-md text-slate-650 hover:text-[#005BFF] transition-all cursor-pointer hover:scale-105 active:scale-95"
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
                activeIndex === idx ? 'w-8 bg-[#005BFF]' : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
