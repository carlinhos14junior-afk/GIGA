import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Car, Instagram, MessageCircle } from 'lucide-react';
import { SiteConfig } from '../types';
import Logo from './Logo';

interface HeaderProps {
  config: SiteConfig;
  onNavigate: (view: 'main' | 'admin') => void;
  currentView: 'main' | 'admin';
}

export default function Header({ config, onNavigate, currentView }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappNumber = config.whatsapp ? config.whatsapp.replace(/\D/g, '') : '5511910050121';
  const whatsAppLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Olá ${config.nome_empresa || 'GIGATEL FIBRA'}! Quero conhecer os planos de internet fibra de alta performance.`
  )}`;

  const formattedAddress = `${config.endereco}${config.bairro ? `, ${config.bairro}` : ''}${config.cidade ? `, ${config.cidade}` : ''}${config.estado ? ` - ${config.estado}` : ''}${config.cep ? ` - CEP ${config.cep}` : ''}`;
  
  const formattedCarTime = config.tempo_carro ? (config.tempo_carro.toLowerCase().includes('carro') ? config.tempo_carro : `${config.tempo_carro} de carro`) : '15 min de carro';
  const formattedMotoTime = config.tempo_moto ? (config.tempo_moto.toLowerCase().includes('moto') ? config.tempo_moto : `${config.tempo_moto} de moto`) : '5 min de moto';

  const phoneLink = `tel:${config.telefone ? config.telefone.replace(/\D/g, '') : '11910050121'}`;
  const displayPhone = config.telefone || '(11) 91005-0121';

  const instagramUser = config.instagram ? config.instagram.replace('@', '') : 'gigatelfiberofc';
  const instagramLink = `https://instagram.com/${instagramUser}`;

  const navItems = [
    { label: 'Início', href: '#inicio' },
    { label: 'Planos', href: '#planos' },
    { label: 'Cobertura', href: '#cobertura' },
    { label: 'Sobre Nós', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    onNavigate('main');
    
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, currentView === 'admin' ? 150 : 0);
  };

  return (
    <header
      id="site-header"
      className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full shadow-lg"
    >
      {/* 1. TOP INFORMATION BAR (TOPO DO SITE) */}
      <div className="bg-slate-950 border-b border-white/5 text-[11px] text-slate-300 py-2.5 px-4 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-4 text-center lg:text-left">
          {/* Left: Address and travel info */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1">
            <span className="flex items-center text-slate-200 font-medium">
              <MapPin size={12} className="text-[#00D4FF] mr-1.5 shrink-0" />
              {formattedAddress}
            </span>
            <span className="hidden sm:inline-flex items-center text-slate-400">
              <Car size={13} className="text-[#00AEEF] mr-1.5 shrink-0" />
              Chegue em: <strong className="text-[#00D4FF] ml-1 font-semibold">{formattedCarTime} ou {formattedMotoTime}</strong>
            </span>
          </div>

          {/* Right: Phone and Instagram */}
          <div className="flex items-center justify-center gap-5">
            <a 
              href={phoneLink} 
              className="flex items-center text-white hover:text-[#00D4FF] transition-colors font-semibold"
            >
              <Phone size={12} className="text-[#005BFF] mr-1.5 shrink-0" />
              {displayPhone}
            </a>
            <a 
              href={instagramLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-slate-300 hover:text-[#00D4FF] transition-colors"
            >
              <Instagram size={12} className="text-pink-500 mr-1.5 shrink-0" />
              @{instagramUser}
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION MENU (HEADER WITH BLUR EFFECT) */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled || currentView === 'admin'
            ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-black/30'
            : 'bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand/Logo with light version for dark tech background */}
            <div 
              onClick={() => { onNavigate('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="cursor-pointer"
            >
              <Logo size="md" lightVersion={true} />
            </div>

            {/* Navigation - Centered and elegant */}
            {currentView === 'main' ? (
              <nav className="hidden lg:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="text-xs font-bold text-slate-300 hover:text-[#00D4FF] transition-colors uppercase tracking-widest relative py-1 group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#005BFF] to-[#00D4FF] group-hover:w-full transition-all duration-300" />
                  </button>
                ))}
              </nav>
            ) : (
              <div className="hidden lg:flex items-center">
                <button 
                  onClick={() => onNavigate('main')}
                  className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider"
                >
                  ← Voltar ao Site Principal
                </button>
              </div>
            )}

            {/* Action Buttons (Header CTA) */}
            <div className="hidden lg:flex items-center space-x-3.5">
              <button
                onClick={() => handleNavClick('#cobertura')}
                className="px-5 py-2.5 text-xs font-bold text-[#005BFF] bg-white hover:bg-gradient-to-r hover:from-[#005BFF] hover:to-[#00AEEF] hover:text-white border-2 border-[#005BFF] rounded-xl shadow-lg shadow-blue-500/10 transition-all duration-300 hover:scale-103"
              >
                Consultar Cobertura
              </button>

              <a
                href={whatsAppLink}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-xl shadow-md shadow-green-500/10 transition-all duration-300 flex items-center space-x-2 hover:scale-103"
              >
                <MessageCircle size={14} className="fill-current text-white shrink-0" />
                <span>Conversar WhatsApp</span>
              </a>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-200 hover:bg-white/10 transition-colors"
                id="mobile-menu-btn"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Responsive Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-lg border-b border-white/10 px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-fade-in relative z-40">
          {currentView === 'main' ? (
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left py-3 px-3 rounded-lg text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-[#00D4FF] transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => { setIsOpen(false); onNavigate('main'); }}
              className="w-full text-left py-3 px-3 rounded-lg text-xs font-bold text-slate-400 hover:bg-white/10 hover:text-white transition-all uppercase"
            >
              ← Voltar ao Site Principal
            </button>
          )}

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('#cobertura')}
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#005BFF] to-[#00AEEF] hover:opacity-90 transition-all shadow-md"
            >
              <span>Consultar Cobertura</span>
            </button>

            <a
              href={whatsAppLink}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-md"
            >
              <MessageCircle size={15} className="text-white fill-current shrink-0" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
