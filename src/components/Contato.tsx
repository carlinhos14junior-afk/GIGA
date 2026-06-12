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
      title: 'Telefone residencial ou celular',
      val: config.telefone || '(11) 91005-0121',
      icon: Phone,
      link: `tel:${config.telefone ? config.telefone.replace(/\D/g, '') : '11910050121'}`,
    },
    {
      title: 'E-mail Corporativo',
      val: config.email || 'contato@gigatelfiber.com.br',
      icon: Mail,
      link: `mailto:${config.email}`
    },
    {
      title: 'Espaço Físico Oficial',
      val: formattedAddress,
      icon: MapPin,
      link: `https://maps.google.com/?q=${encodeURIComponent(formattedAddress)}`
    }
  ];

  return (
    <section 
      id="contato" 
      className="relative py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-500 overflow-hidden text-white border-b border-black/5"
    >
      {/* Visual Tech Overlays */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contato-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contato-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          
          {/* Left Column: CTA Title and details (White text) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-white font-black text-xs uppercase self-start tracking-widest">
                <span>{config.contato_subtitulo || 'CONECTE-SE AGORA'}</span>
              </div>

              <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tighter leading-none uppercase">
                {config.contato_titulo ? (
                  <span className="whitespace-pre-line">{config.contato_titulo}</span>
                ) : (
                  <>
                    PRONTO PARA NAVEGAR <br />
                    <span className="text-yellow-300 font-extrabold bg-gradient-to-r from-yellow-300 via-white to-white bg-clip-text text-transparent">
                      NA ULTRA VELOCIDADE?
                    </span>
                  </>
                )}
              </h2>

              <p className="text-blue-50 text-sm sm:text-base leading-relaxed font-bold">
                {config.contato_descricao || `Fale hoje mesmo com um consultor da ${config.nome_empresa} e garanta instalação prioritária qualificada em seu logradouro. Não sofra mais com quedas de sinal ou uploads lentos! Estabilidade real está aqui.`}
              </p>

              {/* Working hours section */}
              <div className="flex items-center space-x-4 p-5 rounded-3xl bg-white/10 border border-white/20 max-w-md">
                <div className="p-3 bg-white/10 text-white rounded-xl shrink-0 border border-white/10">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-white tracking-wider">Canais 100% Ativos</h4>
                  <div className="text-xs text-blue-50 mt-1 font-bold whitespace-pre-line">
                    {config.horario_funcionamento || 'Segunda a Sexta: 08h às 20h\nSábado: 08h às 14h'}
                  </div>
                </div>
              </div>
            </div>

            {/* Security trust badge */}
            <div className="text-[10px] text-blue-100/75 max-w-sm pt-4 border-t border-white/10 lg:block hidden leading-relaxed font-semibold">
              {config.contato_legal || '* Todas as suas conversações e simulações são confidenciais e regidas conforme a Lei Geral de Proteção de Dados (LGPD) garantindo criptografia ponta a ponta.'}
            </div>
          </div>

          {/* Right Column: Contact Channels styled as white premium buttons/cards */}
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
                    className="group flex items-center justify-between p-5 rounded-3xl bg-white border border-transparent hover:bg-slate-50 transition-all duration-300 shadow-xl hover:-translate-y-[2px]"
                  >
                    <div className="flex items-center space-x-4 pr-4">
                      {/* Brand blue or dark blue icon bubble for absolute premium contrast */}
                      <div className="p-3.5 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all border border-blue-100">
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[8px] bg-blue-50 text-blue-600 font-black px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm sm:text-base font-black text-[#0A1F44] group-hover:text-blue-600 transition-colors mt-1.5 break-all">
                          {item.val}
                        </p>
                      </div>
                    </div>

                    <ExternalLink size={14} className="text-slate-400 group-hover:text-blue-600 transition-all group-hover:translate-x-0.5" />
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
