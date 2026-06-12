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
      badge: 'Contato Principal'
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
    <>
      <section id="contato" className="relative py-28 bg-[#F8FAFC] border-b border-slate-220">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
            
            {/* Left Column: text statement and details */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center space-x-1 border border-slate-200 bg-white px-3 py-1.5 rounded-full text-slate-500 font-bold text-xs uppercase mb-4 tracking-wider">
                  <span>Atendimento Central</span>
                </div>

                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4 leading-tight">
                  Fale com um Especialista da Giganet agora mesmo
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                  Estamos à sua inteira disposição para tirar dúvidas, realizar consultas de viabilidade avançada ou agendar a instalação da sua internet fibra óptica. Pode contar conosco!
                </p>

                {/* Working hours section */}
                <div className="flex items-center space-x-4 p-5 rounded-[1.25rem] bg-white border border-slate-202 max-w-md">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Horário de Atendimento Comercial</h4>
                    <p className="text-xs text-slate-500 mt-1">Segunda a Sexta: 08h às 20h</p>
                    <p className="text-xs text-slate-500">Sábado: 08h às 14h</p>
                  </div>
                </div>
              </div>

              {/* Security trust badge */}
              <div className="text-xs text-slate-400 max-w-sm pt-4 border-t border-slate-200 lg:block hidden">
                * Todas as suas conversações e dados de atendimento por chat e WhatsApp são resguardados de acordo com a Lei Geral de Proteção de Dados (LGPD).
              </div>
            </div>

            {/* Right Column: details list buttons */}
            <div className="lg:col-span-6">
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
                      className="group flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-350 hover:bg-slate-50 transition-all duration-200 shadow-sm"
                    >
                      <div className="flex items-center space-x-4 pr-4">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 group-hover:text-emerald-550 transition-colors">
                          <Icon size={20} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="text-[8px] bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold px-1.5 py-0.5 rounded uppercase font-mono">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm sm:text-base font-bold text-slate-800 transition-colors mt-1 break-all">
                            {item.val}
                          </p>
                        </div>
                      </div>

                      <ExternalLink size={14} className="text-slate-300 group-hover:text-emerald-500 transition-all group-hover:translate-x-0.5" />
                    </a>
                  );
                })}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Persistent Floating WhatsApp Widget */}
      <a
        id="floating-whatsapp-trigger"
        href={whatsAppLink}
        target="_blank"
        referrerPolicy="no-referrer"
        rel="noopener noreferrer"
        aria-label="Falar conosco no WhatsApp"
        className="fixed bottom-6 right-6 z-[60] flex items-center justify-center w-14 h-14 bg-emerald-500 rounded-full text-white shadow-xl hover:bg-emerald-600 hover:scale-105 transition-all group cursor-pointer"
      >
        <span className="absolute right-16 bg-slate-900 border border-slate-800 text-white font-bold text-xs py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
          Dúvidas? Fale Conosco pelo WhatsApp!
        </span>
        <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25" />
        <MessageSquare size={26} className="relative z-10 fill-current" />
      </a>
    </>
  );
}
