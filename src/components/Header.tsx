import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Lock, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
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

  const formattedAddress = `${config.endereco || ''}${config.numero ? `, ${config.numero}` : ''}${config.bairro ? `, ${config.bairro}` : ''}${config.cidade ? `, ${config.cidade}` : ''}${config.estado ? ` - ${config.estado}` : ''}${config.cep ? ` - CEP ${config.cep}` : ''}`;
  const phoneLink = `tel:${config.telefone ? config.telefone.replace(/\D/g, '') : '11910050121'}`;
  const displayPhone = config.telefone || '(11) 91005-0121';
  const instagramUser = config.instagram ? config.instagram.replace('@', '') : '';
  const instagramLink = instagramUser ? `https://instagram.com/${instagramUser}` : '';
  const facebookUser = config.facebook || '';
  const facebookLink = facebookUser ? `https://facebook.com/${facebookUser}` : '';

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
      className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full shadow-sm animate-fade-in"
    >
      {/* 1. TOP INFORMATION BAR (TOPO DO SITE) - DINÂMICO */}
      {currentView === 'main' && (
        <div className="bg-[#0e2246] text-[10px] sm:text-[11px] text-white/90 py-1.5 px-4 relative z-50 border-b border-white/5 font-semibold">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 text-center sm:text-left">
            {/* Left: Address */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4">
              {config.endereco && (
                <span className="flex items-center">
                  <MapPin size={11} className="text-[#E53935] mr-1 shrink-0" />
                  {formattedAddress}
                </span>
              )}
            </div>

            {/* Right: Phone and Socials */}
            <div className="flex items-center justify-center gap-4">
              <a 
                href={phoneLink} 
                className="flex items-center hover:text-[#00AEEF] transition-all"
              >
                <Phone size={11} className="text-[#E53935] mr-1 shrink-0" />
                {displayPhone}
              </a>
              {instagramLink && (
                <a 
                  href={instagramLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center hover:text-[#00AEEF] transition-all"
                >
                  <Instagram size={11} className="text-[#E53935] mr-1 shrink-0" />
                  <span>Instagram</span>
                </a>
              )}
              {facebookLink && (
                <a 
                  href={facebookLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center hover:text-[#00AEEF] transition-all"
                >
                  <Facebook size={11} className="text-[#E53935] mr-1 shrink-0" />
                  <span>Facebook</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MAIN NAVIGATION MENU (HEADER WITH BLUR EFFECT) */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled || currentView === 'admin'
            ? 'bg-[rgba(10,31,68,0.95)] backdrop-blur-md border-b border-white/10 py-3 shadow-lg'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand/Logo - always white/light on dark/transparent menu over hero */}
            <div 
              onClick={() => { onNavigate('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="cursor-pointer"
            >
              <Logo size="md" lightVersion={true} logoUrl={config.logo_url} />
            </div>

            {/* Navigation - Centered and elegant */}
            {currentView === 'main' ? (
              <nav className="hidden lg:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="text-xs font-bold text-white hover:text-[#00AEEF] transition-colors uppercase tracking-widest relative py-1 group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00AEEF] group-hover:w-full transition-all duration-300" />
                  </button>
                ))}
              </nav>
            ) : (
              <div className="hidden lg:flex items-center">
                <button 
                  onClick={() => onNavigate('main')}
                  className="text-xs font-bold text-slate-300 hover:text-white transition-colors uppercase tracking-wider"
                >
                  ← Voltar ao Site Principal
                </button>
              </div>
            )}

            {/* Action Buttons (Header CTA) */}
            <div className="hidden lg:flex items-center space-x-3.5">
              {currentView === 'main' && (
                <button
                  onClick={() => onNavigate('admin')}
                  className="px-4 py-2.5 text-xs font-black text-white bg-[#22C55E] hover:bg-[#16A34A] rounded-xl shadow-md transition-all duration-300 flex items-center space-x-1.5 hover:scale-103 cursor-pointer"
                  title="Painel Administrativo"
                >
                  <Lock size={13} className="text-white shrink-0" />
                  <span>Painel Admin</span>
                </button>
              )}

              <button
                onClick={() => handleNavClick('#cobertura')}
                className="px-5 py-2.5 text-xs font-bold text-white bg-transparent hover:bg-white hover:text-[#0A1F44] border border-white/20 rounded-xl transition-all duration-300"
              >
                Consultar Cobertura
              </button>

              <a
                href={whatsAppLink}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#E53935] hover:bg-[#c62828] rounded-xl shadow-md transition-all duration-300 flex items-center space-x-2 hover:scale-103"
              >
                <MessageCircle size={14} className="fill-current text-white shrink-0" />
                <span>Conversar WhatsApp</span>
              </a>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
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
        <div className="lg:hidden bg-[rgba(10,31,68,0.98)] border-b border-white/10 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-fade-in relative z-40 text-white">
          {currentView === 'main' ? (
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left py-2.5 px-3 rounded-lg text-xs font-bold text-slate-200 hover:bg-white/10 hover:text-[#00AEEF] transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => { setIsOpen(false); onNavigate('main'); }}
              className="w-full text-left py-2.5 px-3 rounded-lg text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all uppercase"
            >
              ← Voltar ao Site Principal
            </button>
          )}

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {currentView === 'main' && (
              <button
                onClick={() => { setIsOpen(false); onNavigate('admin'); }}
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-xs font-black text-white bg-[#22C55E] hover:bg-[#16A34A] shadow-md cursor-pointer"
              >
                <Lock size={15} className="text-white shrink-0" />
                <span>Painel Admin</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('#cobertura')}
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-xs font-bold text-white bg-transparent border border-white/20 hover:bg-white/10 transition-all shadow-md"
            >
              <span>Consultar Cobertura</span>
            </button>

            <a
              href={whatsAppLink}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-xs font-bold bg-[#E53935] hover:bg-[#c62828] text-white shadow-md"
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
