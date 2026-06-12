import { Phone, Mail, MapPin, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { SiteConfig } from '../types';

interface ContatoProps {
  config: SiteConfig;
}

export default function Contato({ config }: ContatoProps) {
  const whatsAppLink = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    `Olá, tenho interesse nos planos de Internet Fibra da ${config.nome_empresa}. Gostaria de mais informações!`
  )}`;

  const contactItems = [
    {
      title: 'WhatsApp Comercial',
      val: `+${config.whatsapp.substring(0,2)} (${config.whatsapp.substring(2,4)}) ${config.whatsapp.substring(4,9)}-${config.whatsapp.substring(9)}`,
      icon: MessageSquare,
      link: whatsAppLink,
      badge: 'Atendimento Rápido'
    },
    {
      title: 'Telefone comercial',
      val: config.telefone,
      icon: Phone,
      link: `tel:${config.telefone.replace(/\D/g, '')}`,
    },
    {
      title: 'E-mail Comercial',
      val: config.email,
      icon: Mail,
      link: `mailto:${config.email}`
    },
    {
      title: 'Endereço Comercial',
      val: config.endereco,
      icon: MapPin,
      link: `https://maps.google.com/?q=${encodeURIComponent(config.endereco)}`
    }
  ];

  return (
    <section 
      id="contato" 
      className="relative py-28 bg-[#030712] overflow-hidden text-white border-b border-white/5"
    >
      {/* Background decoration elements */}
      <div className="absolute top-1/2 left-[-10%] w-96 h-96 bg-[radial-gradient(circle_at_center,#005BFF/8,transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/3 right-[-10%] w-96 h-96 bg-[radial-gradient(circle_at_center,#00D4FF/8,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          
          {/* Left Column: text statement and details */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#005BFF]/10 border border-[#005BFF]/30 px-4 py-1.5 rounded-full text-[#00D4FF] font-black text-xs uppercase self-start tracking-widest">
                <span>Canais de Atendimento</span>
              </div>

              <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tighter leading-none uppercase">
                FALE COM UM ESPECIALISTA <br />
                <span className="bg-gradient-to-r from-[#005BFF] via-[#00AEEF] to-[#00D4FF] bg-clip-text text-transparent font-extrabold">
                  GIGATEL FIBRA
                </span>
              </h2>

              <p className="text-slate-355 text-sm sm:text-base leading-relaxed font-semibold">
                Estamos à sua inteira disposição para tirar dúvidas, realizar consultas de viabilidade avançada ou agendar a instalação rápida da sua internet fibra óptica. Conte conosco!
              </p>

              {/* Working hours section */}
              <div className="flex items-center space-x-4 p-5 rounded-3xl bg-slate-900 border border-white/10 max-w-md">
                <div className="p-3 bg-[#00D4FF]/10 text-[#00D4FF] rounded-xl shrink-0 border border-[#00D4FF]/20 animate-pulse">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-white tracking-wider">Horário Operacional</h4>
                  <p className="text-xs text-slate-300 mt-1 font-semibold">Segunda a Sexta: 08h às 20h</p>
                  <p className="text-xs text-slate-300 font-semibold">Sábado: 08h às 14h</p>
                </div>
              </div>
            </div>

            {/* Security trust badge */}
            <div className="text-[10px] text-slate-500 max-w-sm pt-4 border-t border-white/5 lg:block hidden leading-relaxed font-medium">
              * Todas as suas conversações e dados de atendimento por chat e WhatsApp são resguardados de acordo com as diretrizes da Lei Geral de Proteção de Dados (LGPD) garantindo sigilo absoluto.
            </div>
          </div>

          {/* Right Column: details list buttons */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="grid grid-cols-1 gap-4">
              
              {contactItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    id={`contact-item-${idx}`}
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-5 rounded-3xl bg-slate-900/60 border border-white/5 hover:border-[#00D4FF]/30 hover:bg-slate-900 transition-all duration-300 shadow-xl"
                  >
                    <div className="flex items-center space-x-4 pr-4">
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 text-slate-400 group-hover:text-[#00D4FF] group-hover:border-[#00D4FF]/30 group-hover:bg-[#005BFF]/10 transition-all">
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[8px] bg-[#00D4FF]/10 border border-[#00D4FF]/25 text-[#00D4FF] font-black px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm sm:text-base font-black text-white group-hover:text-[#00D4FF] transition-colors mt-1.5 break-all">
                          {item.val}
                        </p>
                      </div>
                    </div>

                    <ExternalLink size={14} className="text-slate-500 group-hover:text-[#00D4FF] transition-all group-hover:translate-x-0.5" />
                  </a>
                );
              })}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
