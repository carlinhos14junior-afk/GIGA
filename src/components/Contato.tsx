import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { SiteConfig } from '../types';

interface ContatoProps {
  config: SiteConfig;
}

export default function Contato({ config }: ContatoProps) {
  const whatsAppLink = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    'Olá, tenho interesse nos planos da GIGANET. Pode me passar mais informações?'
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
      title: 'Nosso Endereço',
      val: config.endereco,
      icon: MapPin,
      link: `https://maps.google.com/?q=${encodeURIComponent(config.endereco)}`
    }
  ];

  return (
    <>
      <section id="contato" className="relative py-24 bg-[#0d142c]">
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-brand-purple/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column: text statement and details */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center space-x-1 border border-slate-700 bg-slate-800/40 px-3 py-1 rounded-full text-slate-300 font-mono text-xs font-semibold uppercase mb-4">
                  <span>Atendimento Central</span>
                </div>

                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-4">
                  Fale com um Especialista da GIGANET agora mesmo
                </h2>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                  Estamos à sua inteira disposição para tirar qualquer dúvida, consultar cobertura em maior profundidade ou auxiliar na contratação do melhor plano para sua residência ou negócio. Fale conosco!
                </p>

                {/* Working hours section */}
                <div className="flex items-center space-x-4 p-4.5 rounded-2xl bg-slate-900 border border-slate-850 max-w-md mb-8">
                  <div className="p-3 bg-brand-purple/20 text-brand-bright-blue rounded-xl shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Horário de Atendimento</h4>
                    <p className="text-xs text-slate-400 mt-1">Segunda a Sexta: 08h às 20h</p>
                    <p className="text-xs text-slate-400">Sábado: 08h às 14h</p>
                  </div>
                </div>
              </div>

              {/* Security trust badge */}
              <div className="text-xs text-slate-500 max-w-sm pt-4 border-t border-slate-850 lg:block hidden">
                * Centralizada no Brasil. Todas as conversas de suporte por WhatsApp são criptografadas de ponta a ponta.
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
                      className="group flex items-center justify-between p-5 rounded-2xl bg-[#101835] border border-slate-800 hover:border-brand-purple/40 hover:bg-[#151f42] transition-all duration-300 shadow-md"
                    >
                      <div className="flex items-center space-x-4 pr-4">
                        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-brand-bright-blue group-hover:text-brand-neon group-hover:bg-brand-dark transition-colors">
                          <Icon size={20} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-bold">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="text-[8px] bg-brand-neon/15 border border-brand-neon/30 text-brand-neon font-bold font-mono px-1.5 py-0.5 rounded uppercase">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm sm:text-base font-bold text-white group-hover:text-brand-bright-blue transition-colors mt-0.5 break-all">
                            {item.val}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-slate-500 group-hover:text-brand-neon transition-colors font-mono hidden sm:inline">
                        CONECTAR →
                      </span>
                    </a>
                  );
                })}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Persistent Floating WhatsApp Widget (converted from bottom right) */}
      <a
        id="floating-whatsapp-trigger"
        href={whatsAppLink}
        target="_blank"
        referrerPolicy="no-referrer"
        rel="noopener noreferrer"
        aria-label="Falar conosco no WhatsApp"
        className="fixed bottom-6 right-6 z-45 flex items-center justify-center w-14 h-14 bg-emerald-500 rounded-full text-white shadow-2xl hover:bg-emerald-400 hover:scale-110 active:scale-95 transition-all duration-305 group cursor-pointer"
      >
        <span className="absolute right-16 bg-[#0d142c] text-white border border-slate-800 font-bold text-xs py-2 px-3.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
          Dúvidas? Fale Conosco!
        </span>
        <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25" />
        <MessageSquare size={26} className="relative z-10 fill-current bg-transparent border-0" />
      </a>
    </>
  );
}
