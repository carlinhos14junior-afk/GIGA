import { Phone, Mail, MapPin, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { SiteConfig } from '../types';

interface ContatoProps {
  config: SiteConfig;
}

export default function Contato({ config }: ContatoProps) {
  const whatsappNumber = config.whatsapp ? config.whatsapp.replace(/\D/g, '') : '5511910050121';
  const whatsAppLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Olá, tenho interesse nos planos de Internet Fibra da ${config.nome_empresa}. Gostaria de mais informações!`
  )}`;

  const formattedAddress = `${config.endereco}${config.bairro ? `, ${config.bairro}` : ''}${config.cidade ? `, ${config.cidade}` : ''}${config.estado ? ` - ${config.estado}` : ''}${config.cep ? ` - CEP ${config.cep}` : ''}`;

  const cleanWhatsapp = config.whatsapp ? config.whatsapp.replace(/\D/g, '') : '';
  const displayWhatsapp = cleanWhatsapp.length >= 11 
    ? `+${cleanWhatsapp.substring(0, 2)} (${cleanWhatsapp.substring(2, 4)}) ${cleanWhatsapp.substring(4, 9)}-${cleanWhatsapp.substring(9)}`
    : config.whatsapp || '(11) 91005-0121';

  const contactItems = [
    {
      title: 'WhatsApp Comercial',
      val: displayWhatsapp,
      icon: MessageSquare,
      link: whatsAppLink,
      badge: 'Atendimento Rápido'
    },
    {
      title: 'Telefone comercial',
      val: config.telefone || '(11) 91005-0121',
      icon: Phone,
      link: `tel:${config.telefone ? config.telefone.replace(/\D/g, '') : '11910050121'}`,
    },
    {
      title: 'E-mail Comercial',
      val: config.email || 'contato@gigatelfiber.com.br',
      icon: Mail,
      link: `mailto:${config.email}`
    },
    {
      title: 'Endereço Comercial',
      val: formattedAddress,
      icon: MapPin,
      link: `https://maps.google.com/?q=${encodeURIComponent(formattedAddress)}`
    }
  ];

  return (
    <section 
      id="contato" 
      className="relative py-28 bg-white overflow-hidden text-slate-800 border-b border-slate-150"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          
          {/* Left Column: text statement and details */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full text-[#005BFF] font-black text-xs uppercase self-start tracking-widest">
                <span>Canais de Atendimento</span>
              </div>

              <h2 className="font-display font-black text-4xl sm:text-5xl text-slate-900 tracking-tighter leading-none uppercase">
                FALE COM UM ESPECIALISTA <br />
                <span className="text-[#005BFF] font-extrabold bg-gradient-to-r from-[#005BFF] to-[#0188FF] bg-clip-text text-transparent font-extrabold">
                  {config.nome_empresa}
                </span>
              </h2>

              <p className="text-slate-650 text-sm sm:text-base leading-relaxed font-semibold">
                Estamos à sua inteira disposição para tirar dúvidas, realizar consultas de viabilidade avançada ou agendar a instalação rápida da sua internet fibra óptica. Conte conosco!
              </p>

              {/* Working hours section */}
              <div className="flex items-center space-x-4 p-5 rounded-3xl bg-slate-50 border border-slate-200 max-w-md">
                <div className="p-3 bg-blue-50 text-[#005BFF] rounded-xl shrink-0 border border-blue-100">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Horário Operacional</h4>
                  <p className="text-xs text-slate-600 mt-1 font-semibold">Segunda a Sexta: 08h às 20h</p>
                  <p className="text-xs text-slate-600 font-semibold">Sábado: 08h às 14h</p>
                </div>
              </div>
            </div>

            {/* Security trust badge */}
            <div className="text-[10px] text-slate-400 max-w-sm pt-4 border-t border-slate-100 lg:block hidden leading-relaxed font-medium">
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
                    className="group flex items-center justify-between p-5 rounded-3xl bg-white border border-blue-100 hover:border-[#005BFF]/30 hover:bg-[#FDFEFF]/40 transition-all duration-300 shadow-md hover:-translate-y-[2px]"
                  >
                    <div className="flex items-center space-x-4 pr-4">
                      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100/50 text-[#005BFF] group-hover:bg-[#005BFF] group-hover:text-white transition-all">
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[8px] bg-blue-50 border border-blue-100 text-[#005BFF] font-black px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm sm:text-base font-black text-slate-900 group-hover:text-[#005BFF] transition-colors mt-1.5 break-all">
                          {item.val}
                        </p>
                      </div>
                    </div>

                    <ExternalLink size={14} className="text-slate-400 group-hover:text-[#005BFF] transition-all group-hover:translate-x-0.5" />
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
